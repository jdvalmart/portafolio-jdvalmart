import os

import pytest
from httpx import ASGITransport, AsyncClient

os.environ["GROQ_API_KEY"] = "test_groq_key"
os.environ["ALLOWED_ORIGINS"] = "http://localhost:5173"
os.environ["CHROMA_PERSIST_PATH"] = ":memory:"

from src.main import app  # noqa: E402


@pytest.fixture(autouse=True)
async def clear_module_state():
    import src.services.state as state_module
    import src.services.vector_store as vs

    state_module.reset_state()
    await state_module.get_state().clear()

    vs._client = None
    vs._collection = None
    vs._initialized = False

    yield

    await state_module.get_state().clear()
    state_module.reset_state()
    vs._client = None
    vs._collection = None
    vs._initialized = False


@pytest.fixture
def sample_chunks():
    return [
        {"id": "c1", "content": "Juan David is an AI Developer at Trajectory Inc."},
        {"id": "c2", "content": "He specializes in NLP and Transformers."},
        {"id": "c3", "content": "Pequelectores is a children book recommendation app."},
        {"id": "c4", "content": "Book-Tracker is a full-stack library manager."},
        {"id": "c5", "content": "He works with React, FastAPI, Python, and Docker."},
    ]


@pytest.fixture
def sample_embeddings():
    return [
        [0.1, 0.2, 0.3],
        [0.4, 0.5, 0.6],
        [0.7, 0.8, 0.9],
        [0.2, 0.3, 0.4],
        [0.5, 0.6, 0.7],
    ]


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
