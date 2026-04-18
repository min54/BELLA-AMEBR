from datetime import UTC, datetime

from sqlmodel import Field, SQLModel


class Application(SQLModel, table=True):
    """Persisted ambassador application record."""

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=100)
    sns_handle: str = Field(max_length=200)
    email: str = Field(max_length=254, default="")
    reason: str = Field(max_length=4000)
    language: str = Field(max_length=2, description="KR or JP")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        nullable=False,
    )
