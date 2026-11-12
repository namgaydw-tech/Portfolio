# Namgay D. Wangchuk — Portfolio

A production-oriented personal portfolio built for university evaluation. The site presents Namgay's profile, selected work, technical capabilities, and a genuinely functional contact workflow.

## Architecture

```text
Browser
  └─ React + TypeScript + Tailwind CSS (Vite)
       └─ POST /api/contact
            └─ Python FastAPI
                 ├─ Pydantic server-side validation
                 └─ Storage adapter
                      ├─ SQLite (local development)
                      └─ Private Vercel Blob (production)
```

The public API exposes only a health endpoint and a write-only contact endpoint. Contact messages are never listed publicly. Production records are stored as private JSON blobs with UUID-based names; local records use SQLite.

## Project structure

```text
frontend/              React, TypeScript, Tailwind CSS, Vitest
backend/app/           FastAPI application, models, configuration, storage
backend/tests/         API validation and persistence tests
vercel.json            Frontend/backend service routing and security headers
.env.example           Safe local configuration template
```

## Local setup

Prerequisites: Node.js 20+, npm, and Python 3.12+.

```bash
cd frontend
npm install
npm run dev
```

In a second terminal:

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r backend/requirements-dev.txt
uvicorn app.main:app --app-dir backend --reload
```

The frontend runs at `http://localhost:5173` and proxies `/api` to FastAPI at `http://127.0.0.1:8000`.

## Environment variables

Copy `.env.example` to `.env` for local overrides. Never commit `.env` files.

| Variable | Purpose |
|---|---|
| `CONTACT_STORAGE` | `sqlite`, `blob`, or `auto` (default) |
| `CONTACT_DB_PATH` | Local SQLite database location |
| `ALLOWED_ORIGINS` | Comma-separated local CORS allowlist |
| `BLOB_READ_WRITE_TOKEN` | Injected by a connected private Vercel Blob store |

## Contact API

`POST /api/contact` accepts:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "subject": "Project enquiry",
  "message": "A message containing at least twenty characters.",
  "website": ""
}
```

The `website` value is a honeypot and must remain empty. FastAPI/Pydantic validates length, email syntax, and control characters. Successful submissions return HTTP `201` and a UUID receipt. Storage failures return `503`; invalid payloads return `422`.

## Verification

```bash
npm --prefix frontend run lint
npm --prefix frontend run test
npm --prefix frontend run build
python -m pytest backend/tests -q
python -m ruff check backend
```

## Deployment

The repository is configured as a Vercel multi-service project: Vite serves the frontend and FastAPI handles `/api/*`. Connect a private Vercel Blob store so Vercel injects `BLOB_READ_WRITE_TOKEN`; the application selects Blob automatically in production.

After deployment, verify both layers:

```bash
curl https://YOUR-SITE.vercel.app/api/health
curl -X POST https://YOUR-SITE.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Deployment Test","email":"test@example.com","subject":"Production verification","message":"End-to-end production contact API verification.","website":""}'
```

## Privacy and security

- No credentials, source research documents, or private datasets are included.
- Contact data is stored privately and has no unauthenticated read route.
- CORS, server-side validation, a bot honeypot, and baseline security headers are enabled.
- Production secrets belong in Vercel environment variables, never in Git.

## License

Copyright © 2026 Namgay D. Wangchuk. Portfolio content is provided for academic and professional evaluation.
