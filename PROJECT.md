# corp_playground

Shared overview for everyone who works on this repo, people and AI employees.
Read this first. The Structure section is kept current by the CTO; the Work log is
added to automatically when a ticket is finished.

## Structure

Planned layout (default stack, built by ticket #3 sub-tickets):

```
api/                 Django + DRF, JSON only (backend)
  manage.py
  config/            settings, urls
  contact/           contact app: POST /api/contact/ (validate only, no storage)
  .env.example       DJANGO_SECRET_KEY, DJANGO_DEBUG, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS
web/                 Next.js 15 (App Router, TypeScript, Bootstrap), static export (frontend)
  app/               routes: / (landing page), /contact (form)
  components/        Hero, Showcase, Process, FinalCta, ScrollReveal, ContactForm
  content/           all page text: landing.ts, contact.ts (Dutch)
  lib/contactApi.ts  only place that calls the API
  .env.example       NEXT_PUBLIC_API_BASE_URL
  contact.html, contact.js, config.js   legacy, unused, to be deleted by a human
docs/plans/          approved plans (landing-page.md)
docs/contracts/      API contracts
  contact.md         POST /api/contact/ (v1)
  health.md          GET /api/health/ (v1): {"status": "ok"}
```

Contract: [docs/contracts/contact.md](docs/contracts/contact.md)

| Endpoint | Auth | Request | Success | Error |
|---|---|---|---|---|
| POST /api/contact/ | none | `{ "name", "message" }` both required, non-blank | 201 `{ "detail", "code": "received" }` | 400 `{ "detail", "code": "invalid", "errors": {...} }` |

Test command: `cd api && python manage.py test`
Web build check: `cd web && npm install && npm run build` (output in `web/out/`)
CORS: api/.env `CORS_ALLOWED_ORIGINS` must include the Next.js origin (e.g. http://localhost:3000).
