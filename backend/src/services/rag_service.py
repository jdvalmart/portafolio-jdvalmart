import hashlib
import time
from src.services.embeddings import embed_texts, load_chunks
from src.services.vector_store import (
    initialize_store,
    is_initialized,
    search,
)
from src.services.llm_service import build_prompt, chat_response

SESSIONS: dict[str, dict] = {}
CACHE: dict[str, tuple[str, float]] = {}
CACHE_TTL = 300
SESSION_TTL = 1800
MAX_HISTORY = 10


def _prune_cache() -> None:
    now = time.time()
    expired = [k for k, (_, ts) in CACHE.items() if now - ts > CACHE_TTL]
    for k in expired:
        del CACHE[k]


def _prune_sessions() -> None:
    now = time.time()
    expired = [k for k, v in SESSIONS.items() if now - v["last_active"] > SESSION_TTL]
    for k in expired:
        del SESSIONS[k]


def _cache_key(query: str, lang: str) -> str:
    raw = f"{query}:{lang}"
    return hashlib.sha256(raw.encode()).hexdigest()[:16]


async def init_rag() -> None:
    """Call once at startup to populate vector store with real embeddings."""
    if is_initialized():
        return

    chunks = load_chunks()
    contents = [c["content"] for c in chunks]

    import logging
    logger = logging.getLogger(__name__)

    logger.info("Generating embeddings via HF API...")
    embeddings = await embed_texts(contents)

    if embeddings is None or len(embeddings) != len(chunks):
        logger.warning("Embedding generation failed, retrying on next request")
        return

    initialize_store(chunks, embeddings)
    logger.info(f"Vector store ready with {len(chunks)} chunks")


async def search_context(
    query: str,
    session_id: str,
    lang: str = "en",
    top_k: int = 3,
) -> tuple[str, list[dict]]:
    _prune_sessions()

    query_embedding = (await embed_texts([query]))[0]
    results = search(query_embedding, top_k)
    context = "\n\n".join(r["content"] for r in results) if results else ""

    session = SESSIONS.get(session_id, {"history": [], "last_active": 0})

    return context, session.get("history", [])


def build_chat_prompt(
    context: str,
    history: list[dict],
    query: str,
    lang: str,
) -> str:
    return build_prompt(context, history, query, lang)


def record_exchange(
    query: str,
    response: str,
    session_id: str,
    lang: str,
) -> None:
    if not response:
        response = _fallback(query, lang)

    session = SESSIONS.get(session_id, {"history": [], "last_active": 0})
    session["history"].append({"role": "user", "content": query})
    session["history"].append({"role": "assistant", "content": response})
    if len(session["history"]) > MAX_HISTORY * 2:
        session["history"] = session["history"][-MAX_HISTORY * 2:]
    session["last_active"] = time.time()
    SESSIONS[session_id] = session


async def run_rag(
    query: str,
    session_id: str,
    lang: str = "en",
    top_k: int = 3,
    hf_api_key: str | None = None,
) -> str:
    _prune_cache()
    _prune_sessions()

    ck = _cache_key(query, lang)
    if ck in CACHE:
        return CACHE[ck][0]

    context, history = await search_context(query, session_id, lang, top_k)
    prompt = build_prompt(context, history, query, lang)
    response = await chat_response(prompt, hf_api_key=hf_api_key)

    if response is None:
        response = _fallback(query, lang)

    record_exchange(query, response, session_id, lang)
    CACHE[ck] = (response, time.time())

    return response


FALLBACK_EN: list[tuple[list[str], str]] = [
    (["hello", "hi", "hey", "hola"], "Hello! I'm Juan David's AI assistant. I can tell you about his skills, projects, experience, and education. What can I help you with?"),
    (["projects", "proyectos"], "Juan David has 3 main projects: Pequelectores (AI book recommendation for children), Bootcamp IA (33 ML labs with XAI), and Book-Tracker (full-stack library manager). Which one interests you?"),
    (["skills", "tech", "stack", "habilidades"], "Juan David works with React, TypeScript, Tailwind, FastAPI, Python, PostgreSQL, Docker. In AI/ML: TensorFlow, HuggingFace, scikit-learn, NLTK, spaCy, LIME, SHAP, Grad-CAM."),
    (["experience", "experiencia", "career"], "Juan David has 5+ years of experience. Technology Media Operator → Full-Stack Developer Intern → MinTIC AI Bootcamp → AI Engineer & ML Engineer."),
    (["education", "educación", "studies"], "He studied at Politecnico Grancolombiano and SENA. Diploma in Computer Science (2025) and MinTIC AI Bootcamp graduate."),
    (["contact", "contacto", "email", "hire"], "You can reach him through the contact form on this site, or at juanvalencia9411@outlook.com. He's open to AI/ML and full-stack opportunities."),
]

FALLBACK_ES: list[tuple[list[str], str]] = [
    (["hello", "hi", "hey", "hola"], "¡Hola! Soy el asistente IA de Juan David. Puedo contarte sobre sus habilidades, proyectos, experiencia y formación. ¿En qué puedo ayudarte?"),
    (["projects", "proyectos"], "Juan David tiene 3 proyectos: Pequelectores (recomendador de libros con IA para niños), Bootcamp IA (33 labs de ML con XAI), y Book-Tracker (gestión de bibliotecas full-stack). ¿Cuál te interesa?"),
    (["skills", "tech", "stack", "habilidades"], "Juan David maneja React, TypeScript, Tailwind, FastAPI, Python, PostgreSQL, Docker. En IA/ML: TensorFlow, HuggingFace, scikit-learn, NLTK, spaCy, LIME, SHAP, Grad-CAM."),
    (["experience", "experiencia", "career"], "Juan David tiene más de 5 años de experiencia. Operador de Medios Tecnológicos → Desarrollador Full-Stack → Bootcamp IA MinTIC → AI Engineer & ML Engineer."),
    (["education", "educación", "studies"], "Estudió en el Politécnico Grancolombiano y el SENA. Diplomado en Ciencias de la Computación (2025) y graduado del Bootcamp IA de MinTIC."),
    (["contact", "contacto", "email", "hire"], "Puedes contactarlo por el formulario en este sitio o en juanvalencia9411@outlook.com. Está abierto a oportunidades en AI/ML y desarrollo full-stack."),
]


def _fallback(query: str, lang: str) -> str:
    lower = query.lower()
    entries = FALLBACK_ES if lang == "es" else FALLBACK_EN
    default = (
        "I don't have specific information about that, but feel free to ask about Juan David's skills, projects, experience, or education."
        if lang == "en"
        else "No tengo informacion especifica sobre eso, pero puedes preguntarme sobre las habilidades, proyectos, experiencia o educacion de Juan David."
    )

    for patterns, response in entries:
        for p in patterns:
            if p in lower:
                return response

    return default
