from __future__ import annotations

import sqlite3
from datetime import UTC, datetime
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.config import Settings
from app.main import create_app
from app.models import ContactSubmission, StoredContact
from app.storage import SQLiteContactStorage, VercelBlobContactStorage


def valid_payload() -> dict[str, str]:
    return {
        "name": "University Evaluator",
        "email": "EVALUATOR@example.edu",
        "subject": "Portfolio review",
        "message": "This is a sufficiently detailed message for API validation.",
        "website": "",
    }


def test_app_exposes_health_and_contact_routes(tmp_path) -> None:
    settings = Settings("sqlite", str(tmp_path / "contacts.db"), ("http://localhost",))
    app = create_app(settings, SQLiteContactStorage(settings.database_path))
    paths = {route.path for route in app.routes}
    assert "/api/health" in paths
    assert "/api/contact" in paths


def test_valid_contact_is_normalized_and_persisted(tmp_path) -> None:
    database_path = str(tmp_path / "contacts.db")
    storage = SQLiteContactStorage(database_path)
    submission = ContactSubmission(**valid_payload())
    contact = StoredContact(
        id=str(uuid4()),
        created_at=datetime.now(UTC),
        name=submission.name,
        email=str(submission.email).lower(),
        subject=submission.subject,
        message=submission.message,
    )
    storage.save_sync(contact)

    assert contact.id
    with sqlite3.connect(database_path) as connection:
        saved = connection.execute(
            "SELECT name, email, subject, message FROM contact_messages"
        ).fetchone()
    assert saved == (
        "University Evaluator",
        "evaluator@example.edu",
        "Portfolio review",
        "This is a sufficiently detailed message for API validation.",
    )


@pytest.mark.parametrize(
    ("field", "value"),
    [("email", "not-an-email"), ("message", "Too short"), ("name", "X")],
)
def test_invalid_contact_is_rejected(field: str, value: str) -> None:
    payload = valid_payload()
    payload[field] = value
    with pytest.raises(ValidationError):
        ContactSubmission(**payload)


def test_honeypot_field_is_rejected() -> None:
    payload = valid_payload()
    payload["website"] = "https://spam.invalid"
    with pytest.raises(ValidationError):
        ContactSubmission(**payload)


def test_vercel_blob_storage_writes_private_json(monkeypatch) -> None:
    captured: dict[str, object] = {}

    def fake_put(path: str, body: bytes, **options) -> None:
        captured.update(path=path, body=body, options=options)

    monkeypatch.setattr("app.storage.put_blob", fake_put)
    contact = StoredContact(
        id="receipt-123",
        created_at=datetime(2026, 11, 12, 4, 45, tzinfo=UTC),
        name="Production Test",
        email="test@example.com",
        subject="Storage verification",
        message="This verifies the private Blob storage adapter.",
    )

    VercelBlobContactStorage().save(contact)

    assert captured["path"] == "contact-messages/2026/11/12/receipt-123.json"
    assert b'"id":"receipt-123"' in captured["body"]
    assert captured["options"] == {
        "access": "private",
        "add_random_suffix": False,
        "content_type": "application/json",
    }
