from unittest.mock import patch

import pytest

from src.services.embeddings import embed_texts, load_chunks


class TestLoadChunks:
    def test_returns_list_of_dicts(self):
        chunks = load_chunks()
        assert isinstance(chunks, list)
        assert len(chunks) > 0
        assert all(isinstance(chunk, dict) for chunk in chunks)
        assert all("id" in chunk and "content" in chunk for chunk in chunks)

    def test_chunks_have_non_empty_content(self):
        chunks = load_chunks()
        for chunk in chunks:
            assert isinstance(chunk["id"], str) and len(chunk["id"]) > 0
            assert isinstance(chunk["content"], str) and len(chunk["content"]) > 0


class TestEmbedTexts:
    @pytest.mark.asyncio
    async def test_returns_empty_for_empty_input(self):
        assert await embed_texts([]) == []

    @pytest.mark.asyncio
    async def test_returns_float_vectors(self):
        fake = [[[1], [2]], [[3], [4]]]
        with patch("src.services.embeddings._embed_sync", return_value=fake):
            result = await embed_texts(["a", "b"])
            assert result == fake

    @pytest.mark.asyncio
    async def test_batches_all_texts_together(self):
        with patch("src.services.embeddings._embed_sync") as mock_embed:
            mock_embed.return_value = [[0.0], [0.0], [0.0]]
            await embed_texts(["one", "two", "three"])
            mock_embed.assert_called_once_with(["one", "two", "three"])
