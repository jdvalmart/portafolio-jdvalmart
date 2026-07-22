import asyncio
import hashlib
import logging
import re
import time
from src.services.embeddings import embed_texts, embed_texts_with_fallback, load_chunks
from src.services.vector_store import (
    initialize_store,
    is_initialized,
    search,
)
from src.services.llm_service import build_messages, chat_response

logger = logging.getLogger(__name__)

SESSIONS: dict[str, dict] = {}
CACHE: dict[str, tuple[str, float]] = {}
CACHE_TTL = 300
SESSION_TTL = 1800
MAX_HISTORY = 10

_lock = asyncio.Lock()


async def _prune_cache() -> None:
    now = time.time()
    async with _lock:
        expired = [k for k, (_, ts) in CACHE.items() if now - ts > CACHE_TTL]
        for k in expired:
            del CACHE[k]


async def _prune_sessions() -> None:
    now = time.time()
    async with _lock:
        expired = [k for k, v in SESSIONS.items() if now - v["last_active"] > SESSION_TTL]
        for k in expired:
            del SESSIONS[k]


def _cache_key(query: str, lang: str) -> str:
    raw = f"{query}:{lang}"
    return hashlib.sha256(raw.encode()).hexdigest()[:16]


async def init_rag() -> None:
    if is_initialized():
        return

    chunks = load_chunks()
    contents = [c["content"] for c in chunks]

    logger.info("Generating embeddings via HF API...")
    embeddings = await embed_texts(contents)

    if embeddings is None:
        logger.warning("HF embedding API unavailable, store will remain uninitialized")
        return

    initialize_store(chunks, embeddings)
    logger.info("Vector store ready with %d chunks", len(chunks))


async def search_context(
    query: str,
    session_id: str,
    lang: str = "en",
    top_k: int = 3,
) -> tuple[str, list[dict]]:
    await _prune_sessions()

    if not is_initialized():
        chunks = load_chunks()
        matched = _keyword_search(query, chunks, top_k)
        context = "\n\n".join(matched) if matched else ""
        async with _lock:
            session = SESSIONS.get(session_id, {"history": [], "last_active": 0})
            return context, session.get("history", [])

    query_embedding = (await embed_texts_with_fallback([query]))[0]
    results = search(query_embedding, top_k)
    context = "\n\n".join(r["content"] for r in results) if results else ""

    async with _lock:
        session = SESSIONS.get(session_id, {"history": [], "last_active": 0})
        return context, session.get("history", [])


def _keyword_search(query: str, chunks: list[dict], top_k: int = 3) -> list[str]:
    lower = query.lower()
    scored = []
    for c in chunks:
        content = c.get("content", "")
        score = sum(1 for word in lower.split() if len(word) > 1 and word in content.lower())
        if score > 0:
            scored.append((score, content))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [c for _, c in scored[:top_k]]


async def record_exchange(
    query: str,
    response: str,
    session_id: str,
    lang: str,
) -> None:
    async with _lock:
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
) -> str:
    await _prune_cache()
    await _prune_sessions()

    ck = _cache_key(query, lang)
    async with _lock:
        if ck in CACHE:
            return CACHE[ck][0]

    context, history = await search_context(query, session_id, lang, top_k)
    messages = build_messages(context, history, query, lang)
    response = await chat_response(messages)

    if response is None:
        response = _fallback(query, lang)

    await record_exchange(query, response, session_id, lang)

    async with _lock:
        CACHE[ck] = (response, time.time())

    return response


FALLBACK_EN: list[tuple[list[str], str]] = [
    (["hello", "hi", "hey"], "Hello! I'm Juan David's AI assistant. I can tell you about his skills, projects, experience, and education. What can I help you with?"),
    (["projects", "project", "built", "created", "made"], "Juan David has 3 main projects: Pequeletores (AI book recommendation for children), Bootcamp IA (33 ML labs with XAI), and Book-Tracker (full-stack library manager). Which one interests you?"),
    (["skills", "tech", "stack", "technologies", "know", "tools"], "Juan David works with React, TypeScript, Tailwind, FastAPI, Python, PostgreSQL, Docker. In AI/ML: TensorFlow, HuggingFace, scikit-learn, NLTK, spaCy, LIME, SHAP, Grad-CAM."),
    (["work", "job", "company", "trajectory", "employ", "trabaja", "donde"], "Juan David works as an AI Developer at Trajectory Inc. since June 2025. He is based in Bogota, Colombia, working in-person building production AI solutions for enterprise clients."),
    (["experience", "career", "history", "background", "experiencia", "carrera"], "Juan David has 5+ years of experience. Technology Media Operator (Python automation) → Full-Stack Developer Intern (SENA) → MinTIC AI Bootcamp (20 weeks, 33 labs) → AI Developer at Trajectory Inc. (since June 2025, Bogota)."),
    (["education", "study", "studied", "degree", "diploma", "bootcamp"], "He studied at Politecnico Grancolombiano and SENA. Diploma in Computer Science (2025). Completed MinTIC AI Bootcamp covering ML, Deep Learning, NLP, XAI, and MLOps."),
    (["contact", "email", "hire", "reach", "linkedin"], "Contact him at juanvalencia9411@outlook.com or via the contact form on this site. He's open to AI/ML and full-stack opportunities."),
    (["ai", "machine learning", "deep learning", "nlp", "xai", "ia", "inteligencia artificial"], "Juan David specializes in NLP, Transformers, and XAI. He works with LLMs, TensorFlow, scikit-learn, HuggingFace. Covers sentiment analysis, NER, text classification, and model interpretability with LIME, SHAP, and Grad-CAM."),
    (["where", "location", "based", "live", "vive", "bogota", "colombia"], "Juan David is based in Bogota, Colombia. He works in-person at Trajectory Inc. since June 2025."),
    (["pequelectores", "book", "children", "recommendation", "libros", "ninos"], "Pequelectores is a book recommendation system for children aged 6-14 using TF-IDF AI, reading streaks, badge gamification, and JWT auth. Built with React, FastAPI, Python, PostgreSQL, scikit-learn, and Docker."),
    (["bootcamp", "mintic", "labs", "laboratories", "tensorflow", "cnn"], "Bootcamp IA - MinTIC has 33 hands-on labs: ML, Deep Learning (CNN 87.14%, RNN/LSTM, GANs), NLP with Transformers, XAI (LIME, SHAP, Grad-CAM), Big Data (Spark, Hadoop), distributed systems (Kafka)."),
    (["philosophy", "belief", "approach", "filosofia"], "His philosophy: 'There is no elevator to what's worth it. You climb the stairs, one step at a time.' Fundamentals-first learning, building solid foundations before frameworks."),
]

FALLBACK_ES: list[tuple[list[str], str]] = [
    (["hello", "hi", "hey", "hola", "buenas"], "¡Hola! Soy el asistente IA de Juan David. Puedo contarte sobre sus habilidades, proyectos, experiencia y formacion. ¿En que puedo ayudarte?"),
    (["projects", "project", "proyectos", "built", "created", "creado", "hecho"], "Juan David tiene 3 proyectos: Pequeletores (recomendador de libros con IA para ninos), Bootcamp IA (33 labs de ML con XAI), y Book-Tracker (gestion de bibliotecas full-stack). ¿Cual te interesa?"),
    (["skills", "tech", "stack", "tecnologias", "herramientas", "sabe", "maneja"], "Juan David maneja React, TypeScript, Tailwind, FastAPI, Python, PostgreSQL, Docker. En IA/ML: TensorFlow, HuggingFace, scikit-learn, NLTK, spaCy, LIME, SHAP, Grad-CAM."),
    (["work", "job", "trabajo", "trabaja", "company", "empresa", "trajectory", "donde", "empleo"], "Juan David trabaja como AI Developer en Trajectory Inc. desde junio de 2025. Esta en Bogota, Colombia, trabajando presencialmente construyendo soluciones de IA para clientes empresariales."),
    (["experience", "experiencia", "career", "carrera", "history", "trayectoria", "background"], "Juan David tiene mas de 5 anos de experiencia. Operador de Medios Tecnologicos (Python) → Desarrollador Full-Stack (SENA) → Bootcamp IA MinTIC (20 semanas, 33 labs) → AI Developer en Trajectory Inc. (desde junio 2025, Bogota)."),
    (["education", "educacion", "estudio", "estudios", "formacion", "degree", "diploma", "bootcamp"], "Estudio en el Politecnico Grancolombiano y el SENA. Diplomado en Ciencias de la Computacion (2025). Completo el Bootcamp IA de MinTIC cubriendo ML, Deep Learning, NLP, XAI y MLOps."),
    (["contact", "contacto", "email", "hire", "contratar", "linkedin"], "Contactalo en juanvalencia9411@outlook.com o por el formulario en este sitio. Esta abierto a oportunidades en AI/ML y desarrollo full-stack."),
    (["ai", "ia", "machine learning", "deep learning", "nlp", "xai", "inteligencia artificial"], "Juan David se especializa en NLP, Transformers y XAI. Trabaja con LLMs, TensorFlow, scikit-learn, HuggingFace. Cubre analisis de sentimiento, NER, clasificacion de texto e interpretabilidad con LIME, SHAP y Grad-CAM."),
    (["where", "donde", "location", "ubicacion", "vive", "vives", "bogota", "colombia", "ciudad"], "Juan David vive en Bogota, Colombia. Trabaja presencialmente en Trajectory Inc. desde junio de 2025."),
    (["pequelectores", "libros", "ninos", "recommendation", "recomendador", "lectura"], "Pequelectores es un sistema de recomendacion de libros para ninos de 6-14 usando TF-IDF, rachas de lectura, gamificacion con insignias y autenticacion JWT. Construido con React, FastAPI, Python, PostgreSQL, scikit-learn y Docker."),
    (["bootcamp", "mintic", "labs", "laboratorios", "tensorflow", "cnn"], "Bootcamp IA - MinTIC tiene 33 laboratorios: ML, Deep Learning (CNN 87.14%, RNN/LSTM, GANs), NLP con Transformers, XAI (LIME, SHAP, Grad-CAM), Big Data (Spark, Hadoop), sistemas distribuidos (Kafka)."),
    (["philosophy", "filosofia", "belief", "approach", "enfoque", "pensamiento"], "Su filosofia: 'No hay ascensor hacia lo que vale la pena. Se sube por las escaleras, un escalon a la vez.' Aprender fundamentos primero, construir bases solidas antes que frameworks."),
]


def _fallback(query: str, lang: str) -> str:
    lower = query.lower()
    entries = FALLBACK_ES if lang == "es" else FALLBACK_EN
    default = (
        "I don't have that specific information, but feel free to ask about Juan David's skills, projects, experience, or education."
        if lang == "en"
        else "No tengo esa informacion especifica, pero puedes preguntarme sobre las habilidades, proyectos, experiencia o educacion de Juan David."
    )

    for patterns, response in entries:
        for p in patterns:
            if re.search(r"\b" + re.escape(p) + r"\b", lower):
                return response

    return default
