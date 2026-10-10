from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}

    port: int = 8000
    environment: str = "development"
    log_level: str = "INFO"

    groq_api_key: str = ""
    llm_model: str = "llama-3.1-8b-instant"

    allowed_origins: str = "http://localhost:5173,https://jdvalmartdev.netlify.app"

    chroma_persist_path: str = "./chroma_db"

    # External state (sessions, cache, rate limiting). When empty the service
    # falls back to an in-memory store, which is fine for local development.
    redis_url: str = ""

    # Optional error tracking.
    sentry_dsn: str = ""

    session_ttl: int = 1800
    cache_ttl: int = 300
    max_history_length: int = 10
    rate_limit: str = "20/minute"

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()
