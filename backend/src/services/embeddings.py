import json
import logging
from pathlib import Path
import httpx
from src.config import settings

logger = logging.getLogger(__name__)
HF_EMBED_URL = f"https://api-inference.huggingface.co/models/{settings.embedding_model}"


def load_chunks() -> list[dict]:
    path = Path(__file__).parent.parent / "data" / "chunks.json"
    with open(path, encoding="utf-8-sig") as f:
        return json.load(f)


async def _hf_embed(texts: list[str]) -> list[list[float]] | None:
    api_key = settings.hf_api_key
    if not api_key:
        logger.warning("No HF_API_KEY configured, embeddings unavailable")
        return None

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                HF_EMBED_URL,
                headers={"Authorization": f"Bearer {api_key}"},
                json={"inputs": texts, "options": {"wait_for_model": True}},
            )
            logger.info(f"HF embed status: {response.status_code}")

            if response.status_code >= 400:
                logger.error(f"HF embed error {response.status_code}: {response.text[:200]}")
                return None

            data = response.json()

            if isinstance(data, list) and len(data) > 0:
                if isinstance(data[0], float):
                    return [data]
                if isinstance(data[0], list):
                    return data

            logger.error(f"Unexpected HF embed response shape")
            return None

    except Exception as e:
        logger.error(f"HF embed request failed: {e}")
        return None


async def embed_texts(texts: list[str]) -> list[list[float]]:
    result = await _hf_embed(texts)
    if result is not None:
        return result
    return None


async def embed_texts_with_fallback(texts: list[str]) -> list[list[float]]:
    result = await _hf_embed(texts)
    if result is not None:
        return result
    logger.warning("HF API unavailable, using deterministic fallback")
    return _fallback_embeddings(texts)


def _fallback_embeddings(texts: list[str], dim: int = 384) -> list[list[float]]:
    import hashlib
    fallback: list[list[float]] = []
    for text in texts:
        h = hashlib.sha256(text.encode()).digest()
        vec = [(h[i % len(h)] / 255.0 * 2 - 1) for i in range(dim)]
        fallback.append(vec)
    return fallback
