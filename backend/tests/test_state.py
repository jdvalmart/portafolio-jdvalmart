import time

import fakeredis.aioredis
import pytest

from src.services.state import InMemoryState, RedisState, get_state, reset_state

SESSION_TTL = 1800
CACHE_TTL = 300
MAX_HISTORY = 10


def make_memory() -> InMemoryState:
    return InMemoryState(session_ttl=SESSION_TTL, cache_ttl=CACHE_TTL)


def make_redis() -> RedisState:
    state = RedisState(url="redis://localhost", session_ttl=SESSION_TTL, cache_ttl=CACHE_TTL)
    state._redis = fakeredis.aioredis.FakeRedis(decode_responses=True)
    return state


@pytest.fixture(params=[make_memory, make_redis], ids=["memory", "redis"])
def store(request):
    return request.param()


class TestHistory:
    async def test_empty_for_unknown_session(self, store):
        assert await store.get_history("missing") == []

    async def test_appends_exchange(self, store):
        await store.append_exchange("s1", "q", "r", MAX_HISTORY)
        history = await store.get_history("s1")
        assert history == [
            {"role": "user", "content": "q"},
            {"role": "assistant", "content": "r"},
        ]

    async def test_truncates_to_max_history(self, store):
        for i in range(MAX_HISTORY + 5):
            await store.append_exchange("s1", f"q{i}", f"r{i}", MAX_HISTORY)
        history = await store.get_history("s1")
        assert len(history) == MAX_HISTORY * 2

    async def test_sessions_are_isolated(self, store):
        await store.append_exchange("a", "qa", "ra", MAX_HISTORY)
        await store.append_exchange("b", "qb", "rb", MAX_HISTORY)
        assert (await store.get_history("a"))[0]["content"] == "qa"
        assert (await store.get_history("b"))[0]["content"] == "qb"


class TestCache:
    async def test_miss_returns_none(self, store):
        assert await store.get_cached("nope") is None

    async def test_set_and_get(self, store):
        await store.set_cached("k", "value")
        assert await store.get_cached("k") == "value"

    async def test_counts(self, store):
        await store.append_exchange("s1", "q", "r", MAX_HISTORY)
        await store.set_cached("k", "value")
        assert await store.session_count() == 1
        assert await store.cache_count() == 1

    async def test_clear_removes_everything(self, store):
        await store.append_exchange("s1", "q", "r", MAX_HISTORY)
        await store.set_cached("k", "value")
        await store.clear()
        assert await store.session_count() == 0
        assert await store.cache_count() == 0


class TestInMemoryTtl:
    async def test_expired_session_is_pruned_on_read(self):
        state = InMemoryState(session_ttl=0, cache_ttl=0)
        await state.append_exchange("s1", "q", "r", MAX_HISTORY)
        state._sessions["s1"]["last_active"] = time.time() - 10
        assert await state.get_history("s1") == []

    async def test_expired_cache_is_pruned_on_read(self):
        state = InMemoryState(session_ttl=SESSION_TTL, cache_ttl=0)
        await state.set_cached("k", "value")
        state._cache["k"] = ("value", time.time() - 10)
        assert await state.get_cached("k") is None


class TestPing:
    async def test_memory_is_always_reachable(self):
        assert await make_memory().ping() is True

    async def test_redis_ping(self):
        assert await make_redis().ping() is True


class TestFactory:
    def setup_method(self):
        reset_state()

    def teardown_method(self):
        reset_state()

    def test_defaults_to_memory_without_redis_url(self):
        assert isinstance(get_state(), InMemoryState)

    def test_singleton_is_reused(self):
        assert get_state() is get_state()
