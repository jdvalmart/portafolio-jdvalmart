from unittest.mock import patch, MagicMock
from src.services.vector_store import (
    _get_client,
    get_collection,
    is_initialized,
    initialize_store,
    search,
)


class TestGetClient:
    def setup_method(self):
        import src.services.vector_store as vs
        vs._client = None

    def test_creates_client_with_correct_config(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._initialized = False

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = MagicMock()
        mock_client.get_or_create_collection.return_value.get.return_value = {"ids": []}

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            client = _get_client()
            assert client is not None

    def test_caches_client_instance(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._initialized = False

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = MagicMock()
        mock_client.get_or_create_collection.return_value.get.return_value = {"ids": []}

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            client1 = _get_client()
            client2 = _get_client()
            assert client1 is client2


class TestIsInitialized:
    def test_returns_false_initially(self):
        import src.services.vector_store as vs
        vs._initialized = False
        assert is_initialized() is False

    def test_returns_true_after_init(self):
        import src.services.vector_store as vs
        vs._initialized = True
        assert is_initialized() is True


class TestInitializeStore:
    def setup_method(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = False

    def test_adds_chunks_to_collection(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = False

        mock_collection = MagicMock()
        mock_collection.get.return_value = {"ids": []}

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = mock_collection

        chunks = [
            {"id": "c1", "content": "First chunk content."},
            {"id": "c2", "content": "Second chunk content."},
        ]
        embeddings = [[0.1, 0.2], [0.3, 0.4]]

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            initialize_store(chunks, embeddings)
            mock_collection.add.assert_called_once()
            assert vs._initialized is True

    def test_skips_if_already_populated(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = False

        mock_collection = MagicMock()
        mock_collection.get.return_value = {"ids": ["existing-id"]}

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = mock_collection

        chunks = [{"id": "c1", "content": "Content."}]
        embeddings = [[0.1, 0.2]]

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            initialize_store(chunks, embeddings)
            mock_collection.add.assert_not_called()
            assert vs._initialized is True

    def test_sets_correct_metadata(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = False

        mock_collection = MagicMock()
        mock_collection.get.return_value = {"ids": []}

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = mock_collection

        chunks = [{"id": "test-id-1", "content": "Some content."}]
        embeddings = [[0.5, 0.5]]

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            initialize_store(chunks, embeddings)
            call_args = mock_collection.add.call_args[1]
            assert call_args["ids"] == ["test-id-1"]
            assert call_args["documents"] == ["Some content."]
            assert "metadatas" in call_args


class TestSearch:
    def setup_method(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = False

    def test_returns_results_with_correct_shape(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = True

        mock_collection = MagicMock()
        mock_collection.query.return_value = {
            "documents": [["Result 1", "Result 2"]],
            "metadatas": [[{"id": "r1"}, {"id": "r2"}]],
            "distances": [[0.1, 0.3]],
        }

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = mock_collection

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            results = search([0.1, 0.2, 0.3], top_k=2)
            assert len(results) == 2
            assert results[0]["content"] == "Result 1"
            assert results[0]["id"] == "r1"
            assert "score" in results[0]

    def test_calculates_score_from_distance(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = True

        mock_collection = MagicMock()
        mock_collection.query.return_value = {
            "documents": [["Perfect match"]],
            "metadatas": [[{"id": "pm"}]],
            "distances": [[0.0]],
        }

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = mock_collection

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            results = search([0.1, 0.2, 0.3], top_k=1)
            assert results[0]["score"] == 1.0

    def test_handles_missing_distances(self):
        import src.services.vector_store as vs
        vs._client = None
        vs._collection = None
        vs._initialized = True

        mock_collection = MagicMock()
        mock_collection.query.return_value = {
            "documents": [["Some doc"]],
            "metadatas": [[{"id": "sd"}]],
            "distances": [[]],
        }

        mock_client = MagicMock()
        mock_client.get_or_create_collection.return_value = mock_collection

        with patch("src.services.vector_store.chromadb.Client", return_value=mock_client):
            results = search([0.1, 0.2, 0.3], top_k=1)
            assert len(results) == 1
