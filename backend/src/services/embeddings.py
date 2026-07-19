import json
from pathlib import Path
import httpx
from src.config import settings

HF_EMBED_URL = f"https://api-inference.huggingface.co/models/{settings.embedding_model}"


def load_chunks() -> list[dict]:
    path = Path(__file__).parent.parent / "data" / "chunks.json"
    with open(path, encoding="utf-8-sig") as f:
        return json.load(f)


def _hf_embed(texts: list[str]) -> list[list[float]] | None:
    api_key = settings.hf_api_key
    if not api_key:
        return None

    try:
        response = httpx.post(
            HF_EMBED_URL,
            headers={"Authorization": f"Bearer {api_key}"},
            json={"inputs": texts, "options": {"wait_for_model": True}},
            timeout=30.0,
        )
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and all(isinstance(v, float) for v in data[0]):
                return [data]
            return data
    except Exception:
        pass

    return None


def embed_texts(texts: list[str]) -> list[list[float]]:
    embeddings = _hf_embed(texts)
    if embeddings is not None:
        return embeddings

    dim = 384
    import hashlib
    fallback: list[list[float]] = []
    for text in texts:
        h = hashlib.sha256(text.encode()).digest()
        vec = [(h[i] / 255.0 * 2 - 1) for i in range(min(len(h), dim))]
        if len(vec) < dim:
            vec.extend([0.0] * (dim - len(vec)))
        fallback.append(vec)
    return fallback
