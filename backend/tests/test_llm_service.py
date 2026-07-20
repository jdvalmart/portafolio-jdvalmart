from unittest.mock import AsyncMock, patch
import pytest
from src.services.llm_service import build_messages, chat_response, chat_response_stream


class TestBuildMessages:
    def test_english_system_prompt(self):
        messages = build_messages(
            context="Sample context.",
            history=[],
            query="Who is Juan David?",
            lang="en",
        )
        assert len(messages) == 2
        assert messages[0]["role"] == "system"
        assert "Juan David Valencia" in messages[0]["content"]
        assert "English" in messages[0]["content"]

    def test_spanish_system_prompt(self):
        messages = build_messages(
            context="Contexto de prueba.",
            history=[],
            query="¿Quién es Juan David?",
            lang="es",
        )
        assert len(messages) == 2
        assert messages[0]["role"] == "system"
        assert "Juan David Valencia" in messages[0]["content"]
        assert "español" in messages[0]["content"]

    def test_includes_context_in_user_message(self):
        messages = build_messages(
            context="Important context about skills.",
            history=[],
            query="What are his skills?",
            lang="en",
        )
        user_msg = messages[1]["content"]
        assert "Context:" in user_msg
        assert "Important context about skills" in user_msg
        assert "Question:" in user_msg
        assert "What are his skills?" in user_msg

    def test_no_context_keyword_when_empty(self):
        messages = build_messages(
            context="",
            history=[],
            query="Hello",
            lang="en",
        )
        user_msg = messages[1]["content"]
        assert "Context:" not in user_msg
        assert user_msg == "Hello"

    def test_includes_history_messages(self):
        history = [
            {"role": "user", "content": "Previous question"},
            {"role": "assistant", "content": "Previous answer"},
        ]
        messages = build_messages(
            context="Context.",
            history=history,
            query="New question",
            lang="en",
        )
        assert len(messages) == 4
        assert messages[1]["role"] == "user"
        assert messages[1]["content"] == "Previous question"
        assert messages[2]["role"] == "assistant"
        assert messages[2]["content"] == "Previous answer"

    def test_truncates_history_to_last_six(self):
        history = [{"role": "user", "content": f"msg{i}"} for i in range(10)]
        messages = build_messages(
            context="Context.",
            history=history,
            query="Query",
            lang="en",
        )
        history_msgs = [m for m in messages if m["role"] in ("user", "assistant")]
        assert len(history_msgs) == 6 + 1


class TestChatResponse:
    @pytest.mark.asyncio
    async def test_returns_none_without_api_key(self):
        with patch("src.services.llm_service.settings") as mock_settings:
            mock_settings.groq_api_key = ""
            result = await chat_response([{"role": "user", "content": "Hi"}])
            assert result is None

    @pytest.mark.asyncio
    async def test_returns_content_on_success(self):
        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.json = lambda: {
            "choices": [{"message": {"content": "Hello! I am the assistant."}}]
        }

        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.post = AsyncMock(return_value=mock_response)

        with patch("src.services.llm_service.httpx.AsyncClient", return_value=mock_client):
            with patch("src.services.llm_service.settings") as mock_settings:
                mock_settings.groq_api_key = "fake_key"
                result = await chat_response([{"role": "user", "content": "Hi"}])
                assert result == "Hello! I am the assistant."

    @pytest.mark.asyncio
    async def test_returns_none_on_non_200(self):
        mock_response = AsyncMock()
        mock_response.status_code = 500

        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.post = AsyncMock(return_value=mock_response)

        with patch("src.services.llm_service.httpx.AsyncClient", return_value=mock_client):
            with patch("src.services.llm_service.settings") as mock_settings:
                mock_settings.groq_api_key = "fake_key"
                result = await chat_response([{"role": "user", "content": "Hi"}])
                assert result is None

    @pytest.mark.asyncio
    async def test_returns_none_on_network_error(self):
        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.post = AsyncMock(side_effect=Exception("Network error"))

        with patch("src.services.llm_service.httpx.AsyncClient", return_value=mock_client):
            with patch("src.services.llm_service.settings") as mock_settings:
                mock_settings.groq_api_key = "fake_key"
                result = await chat_response([{"role": "user", "content": "Hi"}])
                assert result is None

    @pytest.mark.asyncio
    async def test_returns_none_with_empty_choices(self):
        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.json = lambda: {"choices": []}

        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.post = AsyncMock(return_value=mock_response)

        with patch("src.services.llm_service.httpx.AsyncClient", return_value=mock_client):
            with patch("src.services.llm_service.settings") as mock_settings:
                mock_settings.groq_api_key = "fake_key"
                result = await chat_response([{"role": "user", "content": "Hi"}])
                assert result is None

    @pytest.mark.asyncio
    async def test_strips_response_content(self):
        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.json = lambda: {
            "choices": [{"message": {"content": "  Hello world!  "}}]
        }

        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.post = AsyncMock(return_value=mock_response)

        with patch("src.services.llm_service.httpx.AsyncClient", return_value=mock_client):
            with patch("src.services.llm_service.settings") as mock_settings:
                mock_settings.groq_api_key = "fake_key"
                result = await chat_response([{"role": "user", "content": "Hi"}])
                assert result == "Hello world!"
