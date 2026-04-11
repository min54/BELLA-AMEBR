from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables or a .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Core
    app_name: str = "Bella Korea Ambassador API"
    debug: bool = False

    # Database
    database_url: str = "sqlite:///./bella.db"

    # CORS (comma-separated list of allowed origins)
    cors_origins: str = "http://localhost:3000"

    # SMTP — all optional. If any of host/user/password is missing, mail is skipped.
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_use_tls: bool = True
    mail_from: str | None = None
    # Comma-separated list of recipient emails
    mail_to: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def mail_to_list(self) -> list[str]:
        if not self.mail_to:
            return []
        return [addr.strip() for addr in self.mail_to.split(",") if addr.strip()]

    @property
    def mail_enabled(self) -> bool:
        return bool(
            self.smtp_host
            and self.smtp_user
            and self.smtp_password
            and self.mail_from
            and self.mail_to_list
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
