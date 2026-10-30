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
web/                 Plain static HTML/JS, no build step (frontend)
  contact.html       Form: name + message, posts to the API
  contact.js         fetch + success/error display
  config.js          API_BASE_URL setting
docs/contracts/      API contracts
  contact.md         POST /api/contact/ (v1)
```

Contract: [docs/contracts/contact.md](docs/contracts/contact.md)

| Endpoint | Auth | Request | Success | Error |
|---|---|---|---|---|
| POST /api/contact/ | none | `{ "name", "message" }` both required, non-blank | 201 `{ "detail", "code": "received" }` | 400 `{ "detail", "code": "invalid", "errors": {...} }` |

Test command: `cd api && python manage.py test`

## Work log

| Date | Ticket | Who | What | Branch |
|---|---|---|---|---|
