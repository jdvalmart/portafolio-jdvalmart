"""Session, cache, and rate-limit state for the RAG service.

When ``REDIS_URL`` is configured the state lives in Redis so the API process
is stateless and can scale horizontally. Otherwise an in-memory store is used,
which is enough for local development and tests.
"""

from __future__ import annotations

import json
import logging
import time
from typing import Any, Protocol

from src.config import settings

logger = logging.getLogger(__name__)


class StateStore(Protocol):
    async def get_history(self, session_id: str) -> list[dict]: ...

    async def append_exchange(
        self, session_id: str, query: str, response: str, max_history: int
    ) -> None: ...

    async def get_cached(self, key: str) -> str | None: ...

    async def set_cached(self, key: str, value: str) -> None: ...

    async def session_count(self) -> int: ...

    async def cache_count(self) -> int: ...

    async def clear(self) -> None: ...

    async def ping(self) -> bool: ...


class InMemoryState:
    """Single-process state store used when Redis is not configured."""

    def __init__(self, session_ttl: int, cache_ttl: int) -> None:
        self._session_ttl = session_ttl
        self._cache_ttl = cache_ttl
        self._sessions: dict[str, dict[str, Any]] = {}
        self._cache: dict[str, tuple[str, float]] = {}

    async def get_history(self, session_id: str) -> list[dict]:
        session = self._sessions.get(session_id)
        if session is None:
            return []
        if time.time() - session["last_active"] > self._session_ttl:
            self._sessions.pop(session_id, None)
            return []
        return list(session["history"])

    async def append_exchange(
        self, session_id: str, query: str, response: str, max_history: int
    ) -> None:
        session = self._sessions.setdefault(session_id, {"history": [], "last_active": 0.0})
        session["history"].append({"role": "user", "content": query})
        session["history"].append({"role": "assistant", "content": response})
        if len(session["history"]) > max_history * 2:
            session["history"] = session["history"][-max_history * 2 :]
        session["last_active"] = time.time()

    async def get_cached(self, key: str) -> str | None:
        entry = self._cache.get(key)
        if entry is None:
            return None
        value, timestamp = entry
        if time.time() - timestamp > self._cache_ttl:
            self._cache.pop(key, None)
            return None
        return value

    async def set_cached(self, key: str, value: str) -> None:
        self._cache[key] = (value, time.time())

    async def session_count(self) -> int:
        return len(self._sessions)

    async def cache_count(self) -> int:
        return len(self._cache)

    async def clear(self) -> None:
        self._sessions.clear()
        self._cache.clear()

    async def ping(self) -> bool:
        return True


class RedisState:
    """Shared state store backed by Redis, used in production."""

    def __init__(self, url: str, session_ttl: int, cache_ttl: int) -> None:
        import redis.asyncio as aioredis

        self._redis = aioredis.from_url(url, decode_responses=True)
        self._session_ttl = session_ttl
        self._cache_ttl = cache_ttl

    @staticmethod
    def _history_key(session_id: str) -> str:
        return f"session:{session_id}:history"

    @staticmethod
    def _cache_key(key: str) -> str:
        return f"cache:{key}"

    async def get_history(self, session_id: str) -> list[dict]:
        raw = await self._redis.lrange(self._history_key(session_id), 0, -1)
        return [json.loads(item) for item in raw]

    async def append_exchange(
        self, session_id: str, query: str, response: str, max_history: int
    ) -> None:
        key = self._history_key(session_id)
        pipe = self._redis.pipeline()
        pipe.rpush(
            key,
            json.dumps({"role": "user", "content": query}),
            json.dumps({"role": "assistant", "content": response}),
        )
        pipe.ltrim(key, -max_history * 2, -1)
        pipe.expire(key, self._session_ttl)
        await pipe.execute()

    async def get_cached(self, key: str) -> str | None:
        value = await self._redis.get(self._cache_key(key))
        return value.decode() if isinstance(value, bytes) else value

    async def set_cached(self, key: str, value: str) -> None:
        await self._redis.set(self._cache_key(key), value, ex=self._cache_ttl)

    async def _count(self, pattern: str) -> int:
        count = 0
        async for _ in self._redis.scan_iter(match=pattern):
            count += 1
        return count

    async def session_count(self) -> int:
        return await self._count("session:*:history")

    async def cache_count(self) -> int:
        return await self._count("cache:*")

    async def clear(self) -> None:
        keys = [key async for key in self._redis.scan_iter(match="session:*")]
        keys += [key async for key in self._redis.scan_iter(match="cache:*")]
        if keys:
            await self._redis.delete(*keys)

    async def ping(self) -> bool:
        try:
            return bool(await self._redis.ping())
        except Exception:  # noqa: BLE001 - any failure means "not reachable"
            return False


_state: StateStore | None = None


def get_state() -> StateStore:
    global _state
    if _state is None:
        if settings.redis_url:
            try:
                _state = RedisState(settings.redis_url, settings.session_ttl, settings.cache_ttl)
                logger.info("Using Redis-backed state store")
            except Exception:  # noqa: BLE001 - fall back to in-memory if Redis is unreachable
                logger.exception("Redis state store unavailable, using in-memory store")
                _state = InMemoryState(settings.session_ttl, settings.cache_ttl)
        else:
            _state = InMemoryState(settings.session_ttl, settings.cache_ttl)
    return _state


def reset_state() -> None:
    """Reset the cached singleton. Used by tests."""
    global _state
    _state = None
