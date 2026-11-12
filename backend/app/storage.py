from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Protocol

from vercel import blob

from .models import StoredContact


class ContactStorage(Protocol):
    async def save(self, contact: StoredContact) -> None: ...


class SQLiteContactStorage:
    def __init__(self, database_path: str) -> None:
        self.database_path = Path(database_path)

    def save_sync(self, contact: StoredContact) -> None:
        self.database_path.parent.mkdir(parents=True, exist_ok=True)
        with sqlite3.connect(self.database_path) as connection:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id TEXT PRIMARY KEY,
                    created_at TEXT NOT NULL,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    message TEXT NOT NULL
                )
                """
            )
            connection.execute(
                """
                INSERT INTO contact_messages
                    (id, created_at, name, email, subject, message)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    contact.id,
                    contact.created_at.isoformat(),
                    contact.name,
                    contact.email,
                    contact.subject,
                    contact.message,
                ),
            )
            connection.commit()

    async def save(self, contact: StoredContact) -> None:
        # A contact write is tiny and short-lived. Keeping the operation here avoids
        # platform-specific thread-pool startup issues in serverless runtimes.
        self.save_sync(contact)


class VercelBlobContactStorage:
    async def save(self, contact: StoredContact) -> None:
        day = contact.created_at.strftime("%Y/%m/%d")
        await blob.put_blob(
            f"contact-messages/{day}/{contact.id}.json",
            json.dumps(contact.model_dump(mode="json"), separators=(",", ":")).encode(),
            access="private",
            add_random_suffix=False,
            content_type="application/json",
        )

