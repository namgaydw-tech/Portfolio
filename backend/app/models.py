from __future__ import annotations

import re
from datetime import datetime
from typing import Annotated

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    StringConstraints,
    field_validator,
)

PlainText = Annotated[str, StringConstraints(strip_whitespace=True)]


class ContactSubmission(BaseModel):
    name: Annotated[PlainText, Field(min_length=2, max_length=80)]
    email: EmailStr
    subject: Annotated[PlainText, Field(min_length=3, max_length=120)]
    message: Annotated[PlainText, Field(min_length=20, max_length=3000)]
    website: str = Field(default="", max_length=0, exclude=True)

    @field_validator("name", "subject", "message")
    @classmethod
    def reject_control_characters(cls, value: str) -> str:
        normalized = re.sub(r"\r\n?", "\n", value)
        if any(ord(char) < 32 and char not in "\n\t" for char in normalized):
            raise ValueError("Control characters are not allowed")
        return normalized


class StoredContact(BaseModel):
    id: str
    created_at: datetime
    name: str
    email: str
    subject: str
    message: str


class ContactResponse(BaseModel):
    id: str
    message: str = "Thanks — your message has been received."

