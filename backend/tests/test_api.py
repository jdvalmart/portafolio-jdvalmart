import json
from unittest.mock import AsyncMock, patch
import pytest
from httpx import AsyncClient


class TestHealthEndpoint:
    @pytest.mark.asyncio
    async def test_health_returns_200(self, client: AsyncClient):
        response = await client.get("/api/health")
        assert response.status_code == 200

    @pytest.mark.asyncio
    async def test_health_has_required_fields(self, client: AsyncClient):
        response = await client.get("/api/health")
        data = response.json()
        assert "status" in data
        assert data["status"] == "ok"
        assert "vector_store" in data
        assert "active_sessions" in data
        assert "cached_responses" in data

    @pytest.mark.asyncio
    async def test_health_vector_store_reflects_state(self, client: AsyncClient):
        import src.services.vector_store as vs
        vs._initialized = False
        response = await client.get("/api/health")
        data = response.json()
        assert data["vector_store"] == "initializing"


class TestChatEndpoint:
    @pytest.mark.asyncio
    async def test_chat_returns_200_with_response(self, client: AsyncClient):
        from src.services.rag_service import CACHE, SESSIONS
        CACHE.clear()
        SESSIONS.clear()

        with patch("src.services.rag_service.chat_response", AsyncMock(return_value="Mocked LLM response.")):
            with patch("src.services.rag_service.is_initialized", return_value=False):
                response = await client.post(
                    "/api/chat",
                    json={
                        "query": "What skills does Juan David have?",
                        "session_id": "test-123",
                        "lang": "en",
                    },
                )
                assert response.status_code == 200
                data = response.json()
                assert "response" in data
                assert "session_id" in data
                assert data["session_id"] == "test-123"
                assert isinstance(data["response"], str)
                assert len(data["response"]) > 0

    @pytest.mark.asyncio
    async def test_chat_uses_fallback_when_llm_unavailable(self, client: AsyncClient):
        from src.services.rag_service import CACHE, SESSIONS
        CACHE.clear()
        SESSIONS.clear()

        with patch("src.services.rag_service.chat_response", AsyncMock(return_value=None)):
            with patch("src.services.rag_service.is_initialized", return_value=False):
                response = await client.post(
                    "/api/chat",
                    json={
                        "query": "hello",
                        "session_id": "test-fb",
                        "lang": "en",
                    },
                )
                assert response.status_code == 200
                data = response.json()
                assert "Hello" in data["response"] or "hello" in data["response"].lower()

    @pytest.mark.asyncio
    async def test_chat_spanish_language(self, client: AsyncClient):
        from src.services.rag_service import CACHE, SESSIONS
        CACHE.clear()
        SESSIONS.clear()

        with patch("src.services.rag_service.chat_response", AsyncMock(return_value=None)):
            with patch("src.services.rag_service.is_initialized", return_value=False):
                response = await client.post(
                    "/api/chat",
                    json={
                        "query": "hola",
                        "session_id": "test-es",
                        "lang": "es",
                    },
                )
                assert response.status_code == 200
                data = response.json()
                assert "Hola" in data["response"] or "hola" in data["response"].lower()

    @pytest.mark.asyncio
    async def test_chat_validates_query_min_length(self, client: AsyncClient):
        response = await client.post(
            "/api/chat",
            json={
                "query": "",
                "session_id": "test-empty",
                "lang": "en",
            },
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_chat_validates_query_max_length(self, client: AsyncClient):
        response = await client.post(
            "/api/chat",
            json={
                "query": "x" * 501,
                "session_id": "test-long",
                "lang": "en",
            },
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_chat_validates_lang_pattern(self, client: AsyncClient):
        response = await client.post(
            "/api/chat",
            json={
                "query": "Hello",
                "session_id": "test-lang",
                "lang": "fr",
            },
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_chat_auto_generates_session_id(self, client: AsyncClient):
        from src.services.rag_service import CACHE, SESSIONS
        CACHE.clear()
        SESSIONS.clear()

        with patch("src.services.rag_service.chat_response", AsyncMock(return_value="Mocked.")):
            with patch("src.services.rag_service.is_initialized", return_value=False):
                response = await client.post(
                    "/api/chat",
                    json={
                        "query": "Hello",
                        "lang": "en",
                    },
                )
                assert response.status_code == 200
                data = response.json()
                assert "session_id" in data
                assert len(data["session_id"]) == 12


class TestChatStreamEndpoint:
    @pytest.mark.asyncio
    async def test_stream_returns_sse_response(self, client: AsyncClient):
        from src.services.rag_service import SESSIONS
        SESSIONS.clear()

        with patch("src.services.rag_service.is_initialized", return_value=False):
            response = await client.post(
                "/api/chat/stream",
                json={
                    "query": "Hello",
                    "session_id": "stream-test",
                    "lang": "en",
                },
            )
            assert response.status_code == 200
            assert "text/event-stream" in response.headers["content-type"]

    @pytest.mark.asyncio
    async def test_stream_returns_done_when_no_api_key(self, client: AsyncClient):
        from src.services.rag_service import SESSIONS
        SESSIONS.clear()

        with patch("src.services.rag_service.is_initialized", return_value=False):
            with patch("src.services.llm_service.settings") as mock_settings:
                mock_settings.groq_api_key = ""
                response = await client.post(
                    "/api/chat/stream",
                    json={
                        "query": "Hello",
                        "session_id": "stream-nokey",
                        "lang": "en",
                    },
                )
                content = response.text
                assert "[DONE]" in content

    @pytest.mark.asyncio
    async def test_stream_validates_input(self, client: AsyncClient):
        response = await client.post(
            "/api/chat/stream",
            json={
                "query": "",
                "lang": "en",
            },
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_stream_includes_correct_headers(self, client: AsyncClient):
        from src.services.rag_service import SESSIONS
        SESSIONS.clear()

        with patch("src.services.rag_service.is_initialized", return_value=False):
            response = await client.post(
                "/api/chat/stream",
                json={
                    "query": "Hello",
                    "session_id": "header-test",
                    "lang": "en",
                },
            )
            assert response.headers["cache-control"] == "no-cache"
            assert response.headers["connection"] == "keep-alive"
            assert response.headers["x-accel-buffering"] == "no"
