from collections.abc import Generator

from sqlmodel import Session, SQLModel, create_engine

from app.config import get_settings

_settings = get_settings()

# SQLite requires check_same_thread=False for usage across FastAPI request threads.
_connect_args: dict[str, object] = (
    {"check_same_thread": False}
    if _settings.database_url.startswith("sqlite")
    else {}
)

engine = create_engine(
    _settings.database_url,
    echo=_settings.debug,
    connect_args=_connect_args,
)


def init_db() -> None:
    """Create all tables. Called once on app startup."""
    # Import models so SQLModel metadata is populated before create_all.
    from app import models  # noqa: F401

    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
