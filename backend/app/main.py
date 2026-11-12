from __future__ import annotations

from datetime import UTC, datetime
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware

from .config import Settings, get_settings
from .models import ContactResponse, ContactSubmission, StoredContact
from .storage import ContactStorage, SQLiteContactStorage, VercelBlobContactStorage


async def persist_contact(
    submission: ContactSubmission,
    storage: ContactStorage,
) -> ContactResponse:
    contact = StoredContact(
        id=str(uuid4()),
        created_at=datetime.now(UTC),
        name=submission.name,
        email=str(submission.email).lower(),
        subject=submission.subject,
        message=submission.message,
    )
    storage.save(contact)
    return ContactResponse(id=contact.id)


def create_app(
    settings: Settings | None = None,
    storage: ContactStorage | None = None,
) -> FastAPI:
    active_settings = settings or get_settings()
    active_storage = storage or (
        VercelBlobContactStorage()
        if active_settings.storage_backend == "blob"
        else SQLiteContactStorage(active_settings.database_path)
    )

    application = FastAPI(
        title="Namgay D. Wangchuk Portfolio API",
        description="Validated contact submission API for the portfolio website.",
        version="1.0.0",
        docs_url="/api/docs",
        openapi_url="/api/openapi.json",
        redoc_url=None,
    )
    application.state.contact_storage = active_storage
    application.add_middleware(
        CORSMiddleware,
        allow_origins=list(active_settings.allowed_origins),
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type"],
    )

    @application.get("/api/health")
    async def health() -> dict[str, str]:
        return {
            "status": "ok",
            "service": "portfolio-contact-api",
            "storage": active_settings.storage_backend,
        }

    @application.post(
        "/api/contact",
        response_model=ContactResponse,
        status_code=status.HTTP_201_CREATED,
    )
    async def create_contact(
        submission: ContactSubmission,
        request: Request,
    ) -> ContactResponse:
        try:
            return await persist_contact(submission, request.app.state.contact_storage)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="The message service is temporarily unavailable. Please try again.",
            ) from exc
    return application


app = create_app()

