# 0001 — Monorepo with separate frontend and backend

- Status: Accepted
- Date: 2026-10-08

## Context

The portfolio combines a static marketing site with an interactive RAG chatbot.
The chatbot needs a Python runtime (FastAPI, ChromaDB, embeddings), while the
site is a JavaScript application. Mixing them in a single deployable would
force a heavy runtime on every page request and blur ownership boundaries.

## Decision

Maintain a single repository with two independently deployable applications:

- `frontend/` — the user-facing site.
- `backend/` — the FastAPI RAG service.
- `docs/` — architecture and process documentation.

Each side has its own dependency manifest, tests, and CI job.

## Consequences

- Independent deploy targets (frontend and backend) and independent release
  cadence.
- Shared knowledge (the RAG corpus) lives with its only runtime consumer
  (the backend), so the backend image is self-contained.
- Cross-cutting changes require touching both sides, but CI runs both jobs in
  parallel so feedback stays fast.
