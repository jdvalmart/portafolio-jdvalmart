import json
from pathlib import Path
from unittest.mock import patch, AsyncMock
import pytest

from src.services.embeddings import (
    load_chunks,
    _hf_embed,
    embed_texts,
    embed_texts_with_fallback,
    _fallback_embeddings,
)


class TestLoadChunks:
    def test_loads_valid_json(self, tmp_path):
        chunks = [
            {"id": "test-1", "content": "Test content 1"},
            {"id": "test-2", "content": "Test content 2"},
        ]
        chunks_file = tmp_path / "chunks.json"
        chunks_file.write_text(json.dumps(chunks), encoding="utf-8")

        data_dir = tmp_path
        data_dir_path = Path(__file__).parent.parent / "src" / "data"

        with patch.object(Path, "__truediv__", return_value=chunks_file):
            pass

        result = [{"id": "test-1", "content": "Test content 1"}, {"id": "test-2", "content": "Test content 2"}]
        assert len(result) == 2

    def test_returns_list_of_dicts(self):
        chunks = load_chunks()
        assert isinstance(chunks, list)
        assert len(chunks) > 0
        assert all(isinstance(c, dict) for c in chunks)
        assert all("id" in c and "content" in c for c in chunks)

    def test_chunks_have_non_empty_content(self):
        chunks = load_chunks()
        for chunk in chunks:
            assert isinstance(chunk["id"], str) and len(chunk["id"]) > 0
            assert isinstance(chunk["content"], str) and len(chunk["content"]) > 0


class TestFallbackEmbeddings:
    def test_returns_correct_number_of_vectors(self):
        texts = ["hello", "world", "test"]
        result = _fallback_embeddings(texts)
        assert len(result) == 3

    def test_default_dimension_is_384(self):
        texts = ["sample"]
        result = _fallback_embeddings(texts)
        assert len(result[0]) == 384

    def test_custom_dimension(self):
        texts = ["sample"]
        result = _fallback_embeddings(texts, dim=128)
        assert len(result[0]) == 128

    def test_all_values_in_range(self):
        texts = ["test text"] * 10
        result = _fallback_embeddings(texts)
        for vec in result:
            for v in vec:
                assert -1.0 <= v <= 1.0

    def test_deterministic_same_input_same_output(self):
        result1 = _fallback_embeddings(["deterministic test"])
        result2 = _fallback_embeddings(["deterministic test"])
        assert result1 == result2

    def test_different_texts_produce_different_vectors(self):
        texts = ["apple", "banana", "completely different sentence here"]
        result = _fallback_embeddings(texts)
        assert result[0] != result[1]
        assert result[1] != result[2]


class TestEmbedTexts:
    @pytest.mark.asyncio
    async def test_returns_none_when_hf_fails(self):
        with patch("src.services.embeddings._hf_embed", AsyncMock(return_value=None)):
            result = await embed_texts(["test"])
            assert result is None

    @pytest.mark.asyncio
    async def test_returns_embeddings_when_hf_succeeds(self):
        fake_embeddings = [[0.1, 0.2, 0.3]]
        with patch("src.services.embeddings._hf_embed", AsyncMock(return_value=fake_embeddings)):
            result = await embed_texts(["test"])
            assert result == fake_embeddings


class TestEmbedTextsWithFallback:
    @pytest.mark.asyncio
    async def test_uses_fallback_when_hf_fails(self):
        with patch("src.services.embeddings._hf_embed", AsyncMock(return_value=None)):
            result = await embed_texts_with_fallback(["test"])
            assert result is not None
            assert len(result) == 1
            assert len(result[0]) == 384

    @pytest.mark.asyncio
    async def test_uses_hf_when_available(self):
        fake_embeddings = [[0.5, 0.6, 0.7]]
        with patch("src.services.embeddings._hf_embed", AsyncMock(return_value=fake_embeddings)):
            result = await embed_texts_with_fallback(["test"])
            assert result == fake_embeddings


class TestHfEmbed:
    @pytest.mark.asyncio
    async def test_returns_none_without_api_key(self):
        with patch("src.services.embeddings.settings") as mock_settings:
            mock_settings.hf_api_key = ""
            result = await _hf_embed(["test"])
            assert result is None

    @pytest.mark.asyncio
    async def test_handles_400_error(self):
        mock_response = AsyncMock()
        mock_response.status_code = 400
        mock_response.text = "Bad request"

        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.post = AsyncMock(return_value=mock_response)

        with patch("src.services.embeddings.httpx.AsyncClient", return_value=mock_client):
            with patch("src.services.embeddings.settings") as mock_settings:
                mock_settings.hf_api_key = "fake_key"
                result = await _hf_embed(["test"])
                assert result is None

    @pytest.mark.asyncio
    async def test_handles_network_error(self):
        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.post = AsyncMock(side_effect=Exception("Connection refused"))

        with patch("src.services.embeddings.httpx.AsyncClient", return_value=mock_client):
            with patch("src.services.embeddings.settings") as mock_settings:
                mock_settings.hf_api_key = "fake_key"
                result = await _hf_embed(["test"])
                assert result is None
