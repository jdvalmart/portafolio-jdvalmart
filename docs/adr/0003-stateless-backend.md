# 0003 — Keep the backend stateless with external session state

- Status: Accepted
- Date: 2026-10-08

## Context

Conversation history and response caching are currently held in process memory
(`SESSIONS` and `CACHE` dicts). This ties a conversation to a single instance:
restarts lose history, and horizontal scaling breaks because a follow-up request
may land on a different instance. Rate limiting is also per-process.

## Decision

Move conversation state, response cache, and rate-limit counters to an external
store (Redis, e.g. Upstash). The API process becomes stateless: any instance can
serve any request.

## Consequences

- Safe horizontal scaling and rolling restarts without losing sessions.
- Rate limiting becomes global instead of per-process.
- One more infrastructure dependency to provision and monitor (mitigated by
  using a managed service).
- Local development can fall back to an in-memory adapter behind the same
  interface.
