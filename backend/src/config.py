from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}

    port: int = 8000
    hf_api_key: str = ""
    allowed_origins: str = "http://localhost:5173,https://jdvalmartdev.netlify.app"
    embedding_model: str = "all-MiniLM-L6-v2"
    chroma_persist_path: str = "./chroma_db"
    max_history_length: int = 10
    hf_model: str = "mistralai/Mistral-7B-Instruct-v0.3"
    rate_limit: str = "20/minute"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()
