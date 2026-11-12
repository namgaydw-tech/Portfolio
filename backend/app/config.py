from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    storage_backend: str
    database_path: str
    allowed_origins: tuple[str, ...]


def get_settings() -> Settings:
    configured_backend = os.getenv("CONTACT_STORAGE", "auto").strip().lower()
    if configured_backend == "auto":
        configured_backend = "blob" if os.getenv("BLOB_READ_WRITE_TOKEN") else "sqlite"

    origins = tuple(
        origin.strip()
        for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
        if origin.strip()
    )
    return Settings(
        storage_backend=configured_backend,
        database_path=os.getenv("CONTACT_DB_PATH", "data/contact_messages.db"),
        allowed_origins=origins,
    )

