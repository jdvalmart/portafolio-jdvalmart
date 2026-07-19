import chromadb
from chromadb.config import Settings as ChromaSettings
from src.config import settings

_client: chromadb.ClientAPI | None = None
_collection: chromadb.Collection | None = None
_initialized: bool = False

COLLECTION_NAME = "portfolio_chunks"


def _get_client() -> chromadb.ClientAPI:
    global _client
    if _client is None:
        _client = chromadb.Client(
            ChromaSettings(
                persist_directory=settings.chroma_persist_path,
                anonymized_telemetry=False,
            )
        )
    return _client


def get_collection() -> chromadb.Collection:
    global _collection
    if _collection is None:
        client = _get_client()
        _collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )
    return _collection


def is_initialized() -> bool:
    return _initialized


def initialize_store(chunks: list[dict], embeddings: list[list[float]]) -> None:
    global _initialized
    collection = get_collection()

    existing = collection.get()["ids"]
    if len(existing) > 0:
        _initialized = True
        return

    ids: list[str] = []
    documents: list[str] = []
    metadatas: list[dict] = []

    for chunk in chunks:
        ids.append(chunk["id"])
        documents.append(chunk["content"])
        metadatas.append({"id": chunk["id"]})

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas,
    )

    _initialized = True


def search(query_embedding: list[float], top_k: int = 3) -> list[dict]:
    collection = get_collection()
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
    )

    documents: list[list[str]] = results.get("documents", [[]])
    metadatas: list[list[dict]] = results.get("metadatas", [[{}]])
    distances: list[list[float]] = results.get("distances", [[0.0]])

    output: list[dict] = []
    for i, doc in enumerate(documents[0]):
        score = 1.0 - distances[0][i] if i < len(distances[0]) else 0.0
        meta = metadatas[0][i] if i < len(metadatas[0]) else {}
        output.append({
            "content": doc,
            "id": meta.get("id", ""),
            "score": round(score, 4),
        })

    return output
