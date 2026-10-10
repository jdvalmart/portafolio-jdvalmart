import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from src.config import settings
from src.logging_config import configure_logging, new_request_id, request_id_var
from src.routers import chat
from src.services.rag_service import init_rag
from src.services.state import get_state

configure_logging(settings.log_level)
logger = logging.getLogger(__name__)

if settings.sentry_dsn:
    try:
        import sentry_sdk

        sentry_sdk.init(
            dsn=settings.sentry_dsn,
            environment=settings.environment,
            traces_sample_rate=0.1,
        )
        logger.info("Sentry error tracking enabled")
    except ImportError:
        logger.warning("SENTRY_DSN is set but sentry-sdk is not installed")

limiter = Limiter(key_func=get_remote_address, default_limits=[settings.rate_limit])


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing RAG vector store...")
    await init_rag()
    logger.info("RAG backend ready")
    yield
    logger.info("RAG backend shutting down")


app = FastAPI(
    title="jdvalmart-dev RAG Backend",
    description="RAG chatbot API for Juan David Valencia's portfolio",
    version="0.1.0",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or new_request_id()
    token = request_id_var.set(request_id)
    try:
        response = await call_next(request)
    finally:
        request_id_var.reset(token)
    response.headers["x-request-id"] = request_id
    return response


app.include_router(chat.router)


@app.get("/api/health")
async def health():
    from src.services.vector_store import is_initialized as store_initialized

    state = get_state()
    return {
        "status": "ok",
        "vector_store": "ready" if store_initialized() else "initializing",
        "active_sessions": await state.session_count(),
        "cached_responses": await state.cache_count(),
    }


@app.get("/api/ready")
async def ready():
    from src.services.vector_store import is_initialized as store_initialized

    store_ready = store_initialized()
    state_ready = await get_state().ping()
    is_ready = store_ready and state_ready
    return {
        "status": "ready" if is_ready else "not_ready",
        "vector_store": store_ready,
        "state_store": state_ready,
    }
