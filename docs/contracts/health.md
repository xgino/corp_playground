# docs/contracts/health.md
Health check (v1)

```
ENDPOINT  GET /api/health/
AUTH      none (public)
200       { "status": "ok" }
405       any other method (DRF default)
```

No database or other checks: it only proves the API process answers.
