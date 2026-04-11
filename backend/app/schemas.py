from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Language = Literal["KR", "JP"]


class ApplicationCreate(BaseModel):
    """Incoming payload for a new ambassador application."""

    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=100)
    sns_handle: str = Field(min_length=1, max_length=200)
    reason: str = Field(min_length=10, max_length=4000)
    language: Language


class ApplicationRead(BaseModel):
    """Public-safe view of a stored application (never returns `reason`)."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    sns_handle: str
    language: Language
    created_at: datetime
