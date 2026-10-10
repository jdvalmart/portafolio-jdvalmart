"""Embedding utilities backed by a local ONNX MiniLM model.

Document and query embeddings are computed locally with ChromaDB's
ONNXMiniLM_L6_V2 embedding function. Retrieval therefore never depends on an
external embedding API and never silently degrades to meaningless vectors.
"""

import asyncio
import json
import logging
from functools import lru_cache
from pathlib import Path

from chromadb.utils.embedding_functions import ONNXMiniLM_L6_V2

logger = logging.getLogger(__name__)

CHUNKS_PATH = Path(__file__).parent.parent / "data" / "chunks.json"


def load_chunks() -> list[dict]:
    """Load the RAG corpus from the bundled JSON file."""
    with open(CHUNKS_PATH, encoding="utf-8") as f:
        return json.load(f)


@lru_cache(maxsize=1)
def _embedding_function() -> ONNXMiniLM_L6_V2:
    logger.info("Initializing local ONNX embedding function (all-MiniLM-L6-v2)")
    return ONNXMiniLM_L6_V2()


def _embed_sync(texts: list[str]) -> list[list[float]]:
    vectors = _embedding_function()(texts)
    return [[float(value) for value in vector] for vector in vectors]


async def embed_texts(texts: list[str]) -> list[list[float]]:
    """Compute embeddings for a batch of texts off the event loop."""
    if not texts:
        return []
    return await asyncio.to_thread(_embed_sync, texts)
