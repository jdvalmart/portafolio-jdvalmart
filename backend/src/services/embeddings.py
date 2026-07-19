import json
from pathlib import Path
from sentence_transformers import SentenceTransformer
from src.config import settings

_model: SentenceTransformer | None = None


def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer(settings.embedding_model)
    return _model


def load_chunks() -> list[dict]:
    path = Path(__file__).parent.parent / "data" / "chunks.json"
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def embed_texts(texts: list[str]) -> list[list[float]]:
    model = get_model()
    embeddings = model.encode(texts, normalize_embeddings=True)
    return embeddings.tolist()
