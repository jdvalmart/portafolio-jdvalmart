# 0004 — Use local ONNX embeddings for RAG

- Status: Accepted
- Date: 2026-10-08

## Context

Embeddings are currently requested from the HuggingFace Inference API at runtime.
When that API is unavailable, the code falls back to a deterministic SHA-256
hashing function that produces vectors with no semantic meaning. This degrades
retrieval silently: the chatbot still answers, but over irrelevant context.

## Decision

Run the embedding model (`all-MiniLM-L6-v2`) locally using ONNX Runtime instead
of calling the HuggingFace API. Precompute document embeddings at build/seed time
and remove the SHA-256 fallback entirely.

## Consequences

- Retrieval works without any external embedding dependency and never silently
  degrades.
- Faster startup and lower per-request latency (no network round trip).
- The container image grows to include the model and ONNX runtime.
- The same approach already used in the author's Orion project, keeping the
  engineering story consistent.
