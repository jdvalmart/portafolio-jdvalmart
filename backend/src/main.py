from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from src.config import settings
from src.routers import chat
from src.services.rag_service import init_rag

limiter = Limiter(key_func=get_remote_address, default_limits=[settings.rate_limit])


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_rag()
    yield


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

app.include_router(chat.router)


@app.get("/api/health")
async def health():
    from src.services.vector_store import is_initialized as store_initialized
    from src.services.rag_service import SESSIONS, CACHE

    return {
        "status": "ok",
        "vector_store": "ready" if store_initialized() else "initializing",
        "active_sessions": len(SESSIONS),
        "cached_responses": len(CACHE),
    }
