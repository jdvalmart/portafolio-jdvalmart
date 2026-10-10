from unittest.mock import AsyncMock, patch

from src.services.rag_service import (
    _cache_key,
    _fallback,
    _keyword_search,
    record_exchange,
    run_rag,
    search_context,
)
from src.services.state import get_state


class TestCacheKey:
    def test_same_input_produces_same_key(self):
        assert _cache_key("hello", "en") == _cache_key("hello", "en")

    def test_different_query_produces_different_key(self):
        assert _cache_key("hello", "en") != _cache_key("world", "en")

    def test_different_lang_produces_different_key(self):
        assert _cache_key("hello", "en") != _cache_key("hello", "es")

    def test_returns_string_of_length_16(self):
        key = _cache_key("any query text", "en")
        assert isinstance(key, str)
        assert len(key) == 16

    def test_is_hexadecimal(self):
        key = _cache_key("test", "en")
        assert all(c in "0123456789abcdef" for c in key)


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
        assert _keyword_search("quantum physics", chunks) == []

    def test_respects_top_k_limit(self):
        chunks = [{"id": f"c{i}", "content": f"Python content {i}"} for i in range(10)]
        assert len(_keyword_search("Python", chunks, top_k=3)) == 3

    def test_ignores_single_char_words(self):
        chunks = [{"id": "c1", "content": "A simple test for AI development."}]
        assert _keyword_search("a I", chunks) == []


class TestFallback:
    def test_english_greeting(self):
        assert "Hello" in _fallback("hello", "en")

    def test_spanish_greeting(self):
        assert "Hola" in _fallback("hola", "es")

    def test_english_skills(self):
        result = _fallback("what skills does he have?", "en")
        assert "Python" in result

    def test_spanish_projects(self):
        result = _fallback("proyectos", "es")
        assert "proyectos" in result.lower() or "Pequelectores" in result

    def test_returns_default_for_unknown_query(self):
        result = _fallback("zz_xyzabc_nomatch_possible_12345", "en")
        assert "don't have that specific" in result.lower()

    def test_default_spanish_for_unknown(self):
        result = _fallback("tema desconocido abc", "es")
        assert "No tengo esa" in result or "preguntarme" in result

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
    async def test_creates_session_if_not_exists(self):
        await record_exchange("query", "response", "new-session", "en")
        history = await get_state().get_history("new-session")
        assert len(history) == 2

    async def test_appends_to_existing_session(self):
        await record_exchange("q1", "r1", "s1", "en")
        await record_exchange("q2", "r2", "s1", "en")
        assert len(await get_state().get_history("s1")) == 4

    async def test_truncates_history_at_max_length(self):
        from src.services.rag_service import MAX_HISTORY

        for i in range(MAX_HISTORY + 5):
            await record_exchange(f"q{i}", f"r{i}", "s1", "en")
        assert len(await get_state().get_history("s1")) == MAX_HISTORY * 2


class TestSearchContext:
    async def test_uses_keyword_search_when_store_not_initialized(self):
        with patch("src.services.rag_service.is_initialized", return_value=False):
            context, history = await search_context(
                query="Python AI", session_id="test-session", lang="en", top_k=3
            )
            assert isinstance(context, str)
            assert history == []

    async def test_returns_empty_context_for_no_match(self):
        with patch("src.services.rag_service.is_initialized", return_value=False):
            context, _ = await search_context(
                query="xyzabc_nonexistent_123", session_id="test-session", lang="en"
            )
            assert context == ""

    async def test_does_not_crash_with_new_session(self):
        with patch("src.services.rag_service.is_initialized", return_value=False):
            context, history = await search_context(
                query="test", session_id="brand-new-session", lang="en"
            )
            assert isinstance(context, str)
            assert history == []


class TestRunRag:
    async def test_returns_cached_response(self):
        await get_state().set_cached(_cache_key("cached query", "en"), "Cached response!")
        result = await run_rag(query="cached query", session_id="test-session", lang="en")
        assert result == "Cached response!"

    async def test_uses_fallback_when_llm_fails(self):
        with patch("src.services.rag_service.chat_response", AsyncMock(return_value=None)):
            with patch("src.services.rag_service.is_initialized", return_value=False):
                result = await run_rag(
                    query="what skills does juan david have",
                    session_id="test-session",
                    lang="en",
                )
                assert isinstance(result, str)
                assert len(result) > 0
                assert "Python" in result or "FastAPI" in result
