import hashlib
import logging
import re

from src.config import settings
from src.services.embeddings import embed_texts, load_chunks
from src.services.llm_service import build_messages, chat_response
from src.services.state import get_state
from src.services.vector_store import (
    initialize_store,
    is_initialized,
    search,
)

logger = logging.getLogger(__name__)

MAX_HISTORY = settings.max_history_length


def _cache_key(query: str, lang: str) -> str:
    raw = f"{query}:{lang}"
    return hashlib.sha256(raw.encode()).hexdigest()[:16]


async def init_rag() -> None:
    if is_initialized():
        return

    chunks = load_chunks()
    contents = [chunk["content"] for chunk in chunks]

    logger.info("Computing local embeddings for %d chunks", len(contents))
    embeddings = await embed_texts(contents)

    initialize_store(chunks, embeddings)
    logger.info("Vector store ready with %d chunks", len(chunks))


async def search_context(
    query: str,
    session_id: str,
    lang: str = "en",
    top_k: int = 3,
) -> tuple[str, list[dict]]:
    state = get_state()

    if not is_initialized():
        chunks = load_chunks()
        matched = _keyword_search(query, chunks, top_k)
        context = "\n\n".join(matched) if matched else ""
        return context, await state.get_history(session_id)

    query_embedding = (await embed_texts([query]))[0]
    results = search(query_embedding, top_k)
    context = "\n\n".join(r["content"] for r in results) if results else ""
    return context, await state.get_history(session_id)


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
    await get_state().append_exchange(session_id, query, response, MAX_HISTORY)


async def run_rag(
    query: str,
    session_id: str,
    lang: str = "en",
    top_k: int = 3,
) -> str:
    state = get_state()

    ck = _cache_key(query, lang)
    cached = await state.get_cached(ck)
    if cached is not None:
        return cached

    context, history = await search_context(query, session_id, lang, top_k)
    messages = build_messages(context, history, query, lang)
    response = await chat_response(messages)

    if response is None:
        response = _fallback(query, lang)

    await record_exchange(query, response, session_id, lang)
    await state.set_cached(ck, response)

    return response


FALLBACK_EN: list[tuple[list[str], str]] = [
    (
        ["hello", "hi", "hey"],
        "Hello! I'm Juan David's AI assistant. I can tell you about his skills, projects, experience, and education. What can I help you with?",
    ),
    (
        ["projects", "project", "built", "created", "made"],
        "Juan David's highlighted projects include Orion (a personal MCP server for AI memory), Pequelectores (an AI book recommender for children), and Book-Tracker (a full-stack library manager). Which one interests you?",
    ),
    (
        ["skills", "tech", "stack", "technologies", "know", "tools"],
        "Juan David's core stack is Python, FastAPI, PostgreSQL, ChromaDB, and Docker, with React and TypeScript as secondary frontend skills. In AI engineering he works with RAG, LLMs, embeddings, vector search, and MCP.",
    ),
    (
        ["work", "job", "company", "trajectory", "employ", "trabaja", "donde"],
        "Juan David works as an AI Software Developer at Trajectory Inc. since June 2026. He is based in Bogota, Colombia, building an enterprise MCP platform that connects AI assistants to internal systems.",
    ),
    (
        ["experience", "career", "history", "background", "experiencia", "carrera"],
        "Juan David has 5+ years of experience: Technology Media Operator (Python automation) -> Full-Stack Developer Intern (SENA) -> MinTIC AI Bootcamp (20 weeks, 33 labs) -> AI Software Developer at Trajectory Inc. (since June 2026, Bogota).",
    ),
    (
        ["education", "study", "studied", "degree", "diploma", "bootcamp"],
        "He studied at Politecnico Grancolombiano and SENA. Diploma in Computer Science (2025), Software Engineering (in progress). Completed the MinTIC AI Bootcamp covering ML, Deep Learning, NLP, XAI, and MLOps.",
    ),
    (
        ["contact", "email", "hire", "reach", "linkedin"],
        "Contact him at juanvalencia9411@outlook.com or via the contact form on this site. He's open to AI engineering, RAG, LLM, and backend opportunities.",
    ),
    (
        ["ai", "machine learning", "deep learning", "nlp", "xai", "ia", "inteligencia artificial"],
        "Juan David specializes in applied AI: RAG pipelines, LLM infrastructure, embeddings, vector search, and MCP integrations. He also has a solid foundation in classical ML, deep learning, NLP, and Explainable AI (LIME, SHAP, Grad-CAM).",
    ),
    (
        ["where", "location", "based", "live", "vive", "bogota", "colombia"],
        "Juan David is based in Bogota, Colombia. He works at Trajectory Inc. since June 2026.",
    ),
    (
        ["pequelectores", "book", "children", "recommendation", "libros", "ninos"],
        "Pequelectores is a book recommendation system for children aged 6-14 using TF-IDF AI, reading streaks, badge gamification, and JWT auth. Built with React, FastAPI, Python, PostgreSQL, scikit-learn, and Docker.",
    ),
    (
        ["bootcamp", "mintic", "labs", "laboratories", "tensorflow", "cnn"],
        "The MinTIC AI Bootcamp included 33 hands-on labs across ML, Deep Learning (CNN, RNN/LSTM, GANs), NLP with Transformers, XAI (LIME, SHAP, Grad-CAM), Big Data (Spark, Hadoop), and distributed systems (Kafka).",
    ),
    (
        ["philosophy", "belief", "approach", "filosofia"],
        "His philosophy: 'There is no elevator to what's worth it. You climb the stairs, one step at a time.' Fundamentals-first learning, building solid foundations before frameworks.",
    ),
]

FALLBACK_ES: list[tuple[list[str], str]] = [
    (
        ["hello", "hi", "hey", "hola", "buenas"],
        "¡Hola! Soy el asistente IA de Juan David. Puedo contarte sobre sus habilidades, proyectos, experiencia y formacion. ¿En que puedo ayudarte?",
    ),
    (
        ["projects", "project", "proyectos", "built", "created", "creado", "hecho"],
        "Entre los proyectos destacados de Juan David estan Orion (MCP personal para memoria de IA), Pequelectores (recomendador de libros con IA para ninos) y Book-Tracker (gestion de bibliotecas full-stack). ¿Cual te interesa?",
    ),
    (
        ["skills", "tech", "stack", "tecnologias", "herramientas", "sabe", "maneja"],
        "El stack principal de Juan David es Python, FastAPI, PostgreSQL, ChromaDB y Docker, con React y TypeScript como frontend secundario. En ingenieria de IA trabaja con RAG, LLMs, embeddings, busqueda vectorial y MCP.",
    ),
    (
        [
            "work",
            "job",
            "trabajo",
            "trabaja",
            "company",
            "empresa",
            "trajectory",
            "donde",
            "empleo",
        ],
        "Juan David trabaja como AI Software Developer en Trajectory Inc. desde junio de 2026. Esta en Bogota, Colombia, construyendo una plataforma MCP empresarial que conecta asistentes de IA con sistemas internos.",
    ),
    (
        ["experience", "experiencia", "career", "carrera", "history", "trayectoria", "background"],
        "Juan David tiene mas de 5 anos de experiencia: Operador de Medios Tecnologicos (Python) -> Desarrollador Full-Stack (SENA) -> Bootcamp IA MinTIC (20 semanas, 33 labs) -> AI Software Developer en Trajectory Inc. (desde junio 2026, Bogota).",
    ),
    (
        [
            "education",
            "educacion",
            "estudio",
            "estudios",
            "formacion",
            "degree",
            "diploma",
            "bootcamp",
        ],
        "Estudio en el Politecnico Grancolombiano y el SENA. Diplomado en Ciencias de la Computacion (2025), Ingenieria de Software (en curso). Completo el Bootcamp IA de MinTIC cubriendo ML, Deep Learning, NLP, XAI y MLOps.",
    ),
    (
        ["contact", "contacto", "email", "hire", "contratar", "linkedin"],
        "Contactalo en juanvalencia9411@outlook.com o por el formulario en este sitio. Esta abierto a oportunidades de ingenieria de IA, RAG, LLM y backend.",
    ),
    (
        ["ai", "ia", "machine learning", "deep learning", "nlp", "xai", "inteligencia artificial"],
        "Juan David se especializa en IA aplicada: pipelines RAG, infraestructura de LLMs, embeddings, busqueda vectorial e integraciones MCP. Tambien tiene una base solida en ML clasico, deep learning, NLP y XAI (LIME, SHAP, Grad-CAM).",
    ),
    (
        [
            "where",
            "donde",
            "location",
            "ubicacion",
            "vive",
            "vives",
            "bogota",
            "colombia",
            "ciudad",
        ],
        "Juan David vive en Bogota, Colombia. Trabaja en Trajectory Inc. desde junio de 2026.",
    ),
    (
        ["pequelectores", "libros", "ninos", "recommendation", "recomendador", "lectura"],
        "Pequelectores es un sistema de recomendacion de libros para ninos de 6-14 usando TF-IDF, rachas de lectura, gamificacion con insignias y autenticacion JWT. Construido con React, FastAPI, Python, PostgreSQL, scikit-learn y Docker.",
    ),
    (
        ["bootcamp", "mintic", "labs", "laboratorios", "tensorflow", "cnn"],
        "El Bootcamp IA de MinTIC incluyo 33 laboratorios: ML, Deep Learning (CNN, RNN/LSTM, GANs), NLP con Transformers, XAI (LIME, SHAP, Grad-CAM), Big Data (Spark, Hadoop) y sistemas distribuidos (Kafka).",
    ),
    (
        ["philosophy", "filosofia", "belief", "approach", "enfoque", "pensamiento"],
        "Su filosofia: 'No hay ascensor hacia lo que vale la pena. Se sube por las escaleras, un escalon a la vez.' Aprender fundamentos primero, construir bases solidas antes que frameworks.",
    ),
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
