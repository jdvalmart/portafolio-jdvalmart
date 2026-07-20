import time
from unittest.mock import AsyncMock, patch
import pytest
from src.services.rag_service import (
    _cache_key,
    _prune_cache,
    _prune_sessions,
    _keyword_search,
    _fallback,
    run_rag,
    search_context,
    SESSIONS,
    CACHE,
)


class TestCacheKey:
    def test_same_input_produces_same_key(self):
        key1 = _cache_key("hello", "en")
        key2 = _cache_key("hello", "en")
        assert key1 == key2

    def test_different_query_produces_different_key(self):
        key1 = _cache_key("hello", "en")
        key2 = _cache_key("world", "en")
        assert key1 != key2

    def test_different_lang_produces_different_key(self):
        key1 = _cache_key("hello", "en")
        key2 = _cache_key("hello", "es")
        assert key1 != key2

    def test_returns_string_of_length_16(self):
        key = _cache_key("any query text", "en")
        assert isinstance(key, str)
        assert len(key) == 16

    def test_is_hexadecimal(self):
        key = _cache_key("test", "en")
        assert all(c in "0123456789abcdef" for c in key)


class TestPruneCache:
    @pytest.mark.asyncio
    async def test_removes_expired_entries(self):
        CACHE.clear()
        CACHE["fresh"] = ("response1", time.time())
        CACHE["stale"] = ("response2", time.time() - 600)

        await _prune_cache()
        assert "fresh" in CACHE
        assert "stale" not in CACHE

    @pytest.mark.asyncio
    async def test_keeps_recent_entries(self):
        CACHE.clear()
        now = time.time()
        CACHE["a"] = ("r1", now)
        CACHE["b"] = ("r2", now - 100)

        await _prune_cache()
        assert "a" in CACHE
        assert "b" in CACHE


class TestPruneSessions:
    @pytest.mark.asyncio
    async def test_removes_expired_sessions(self):
        SESSIONS.clear()
        SESSIONS["active"] = {"history": [], "last_active": time.time()}
        SESSIONS["stale"] = {"history": [], "last_active": time.time() - 3600}

        await _prune_sessions()
        assert "active" in SESSIONS
        assert "stale" not in SESSIONS

    @pytest.mark.asyncio
    async def test_keeps_recent_sessions(self):
        SESSIONS.clear()
        SESSIONS["s1"] = {"history": [], "last_active": time.time()}

        await _prune_sessions()
        assert "s1" in SESSIONS


class TestKeywordSearch:
    def test_returns_matching_chunks(self):
        chunks = [
            {"id": "c1", "content": "Juan David is an AI Developer."},
            {"id": "c2", "content": "He uses Python and FastAPI."},
            {"id": "c3", "content": "React is his frontend framework."},
        ]
        results = _keyword_search("Python FastAPI", chunks, top_k=3)
        assert len(results) >= 1
        assert any("Python" in r for r in results)

    def test_sorts_by_relevance(self):
        chunks = [
            {"id": "c1", "content": "Python data science machine learning"},
            {"id": "c2", "content": "Python programming basics"},
            {"id": "c3", "content": "Java and Kotlin development"},
        ]
        results = _keyword_search("Python machine learning", chunks, top_k=3)
        assert len(results) == 2
        assert "Python data science" in results[0]

    def test_returns_empty_for_no_match(self):
        chunks = [
            {"id": "c1", "content": "React and TypeScript development."},
            {"id": "c2", "content": "FastAPI backend services."},
        ]
        results = _keyword_search("quantum physics", chunks)
        assert results == []

    def test_respects_top_k_limit(self):
        chunks = [
            {"id": f"c{i}", "content": f"Python content {i}"} for i in range(10)
        ]
        results = _keyword_search("Python", chunks, top_k=3)
        assert len(results) == 3

    def test_ignores_single_char_words(self):
        chunks = [
            {"id": "c1", "content": "A simple test for AI development."},
        ]
        results = _keyword_search("a I", chunks)
        assert results == []


class TestFallback:
    def test_english_greeting(self):
        result = _fallback("hello", "en")
        assert "Hello" in result

    def test_spanish_greeting(self):
        result = _fallback("hola", "es")
        assert "Hola" in result

    def test_english_skills(self):
        result = _fallback("what skills does he have?", "en")
        assert "React" in result
        assert "TypeScript" in result

    def test_spanish_projects(self):
        result = _fallback("proyectos", "es")
        assert "proyectos" in result.lower() or "Pequeletores" in result

    def test_returns_default_for_unknown_query(self):
        result = _fallback("zz_xyzabc_nomatch_possible_12345", "en")
        assert "don't have that specific" in result.lower()

    def test_default_spanish_for_unknown(self):
        result = _fallback("tema desconocido abc", "es")
        assert "No tengo esa" in result or "preguntarme" in result

    def test_partial_word_matching(self):
        result = _fallback("email address", "en")
        assert "contact" in result.lower() or "juanvalencia" in result.lower()

    def test_all_english_entries_return_strings(self):
        from src.services.rag_service import FALLBACK_EN
        for _, response in FALLBACK_EN:
            assert isinstance(response, str)
            assert len(response) > 20

    def test_all_spanish_entries_return_strings(self):
        from src.services.rag_service import FALLBACK_ES
        for _, response in FALLBACK_ES:
            assert isinstance(response, str)
            assert len(response) > 20


class TestRecordExchange:
    @pytest.mark.asyncio
    async def test_creates_session_if_not_exists(self):
        SESSIONS.clear()
        from src.services.rag_service import record_exchange as async_record
        await async_record("query", "response", "new-session", "en")
        assert "new-session" in SESSIONS
        assert len(SESSIONS["new-session"]["history"]) == 2

    @pytest.mark.asyncio
    async def test_appends_to_existing_session(self):
        SESSIONS.clear()
        from src.services.rag_service import record_exchange as async_record
        await async_record("q1", "r1", "s1", "en")
        await async_record("q2", "r2", "s1", "en")
        assert len(SESSIONS["s1"]["history"]) == 4

    @pytest.mark.asyncio
    async def test_truncates_history_at_max_length(self):
        from src.services.rag_service import MAX_HISTORY, record_exchange as async_record
        SESSIONS.clear()
        for i in range(MAX_HISTORY + 5):
            await async_record(f"q{i}", f"r{i}", "s1", "en")
        assert len(SESSIONS["s1"]["history"]) <= MAX_HISTORY * 2
        assert len(SESSIONS["s1"]["history"]) == MAX_HISTORY * 2

    @pytest.mark.asyncio
    async def test_updates_last_active(self):
        SESSIONS.clear()
        old_time = time.time() - 100
        SESSIONS["s1"] = {"history": [], "last_active": old_time}
        from src.services.rag_service import record_exchange as async_record
        await async_record("q", "r", "s1", "en")
        assert SESSIONS["s1"]["last_active"] > old_time


class TestSearchContext:
    @pytest.mark.asyncio
    async def test_uses_keyword_search_when_store_not_initialized(self):
        SESSIONS.clear()
        with patch("src.services.rag_service.is_initialized", return_value=False):
            context, history = await search_context(
                query="Python AI",
                session_id="test-session",
                lang="en",
                top_k=3,
            )
            assert isinstance(context, str)
            assert isinstance(history, list)

    @pytest.mark.asyncio
    async def test_returns_empty_context_for_no_match(self):
        SESSIONS.clear()
        with patch("src.services.rag_service.is_initialized", return_value=False):
            context, history = await search_context(
                query="xyzabc_nonexistent_123",
                session_id="test-session",
                lang="en",
            )
            assert context == ""

    @pytest.mark.asyncio
    async def test_does_not_crash_with_new_session(self):
        SESSIONS.clear()
        session_id = "brand-new-session"
        with patch("src.services.rag_service.is_initialized", return_value=False):
            context, history = await search_context(query="test", session_id=session_id, lang="en")
            assert isinstance(context, str)
            assert isinstance(history, list)
            assert history == []


class TestRunRag:
    @pytest.mark.asyncio
    async def test_returns_cached_response(self):
        CACHE.clear()
        SESSIONS.clear()
        ck = _cache_key("cached query", "en")
        CACHE[ck] = ("Cached response!", time.time())

        result = await run_rag(
            query="cached query",
            session_id="test-session",
            lang="en",
        )
        assert result == "Cached response!"

    @pytest.mark.asyncio
    async def test_uses_fallback_when_llm_fails(self):
        CACHE.clear()
        SESSIONS.clear()

        with patch("src.services.rag_service.chat_response", AsyncMock(return_value=None)):
            with patch("src.services.rag_service.is_initialized", return_value=False):
                result = await run_rag(
                    query="what skills does juan david have",
                    session_id="test-session",
                    lang="en",
                )
                assert isinstance(result, str)
                assert len(result) > 0
                assert "React" in result or "TypeScript" in result or "TensorFlow" in result
