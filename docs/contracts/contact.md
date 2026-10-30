# Contract: contact form

Version 1. Backend builds it, frontend consumes it.

```
ENDPOINT  POST /api/contact/
AUTH      none (public)
REQUEST   Content-Type: application/json
          { "name": "Sanne", "message": "Hallo, ik heb een vraag." }
201       { "detail": "Message received", "code": "received" }
400       { "detail": "Invalid input", "code": "invalid", "errors": { "name": ["This field may not be blank."], "message": ["This field is required."] } }
405       { "detail": "Method \"GET\" not allowed." }
NOTES     - name: required, string, trimmed, 1..100 chars
          - message: required, string, trimmed, 1..2000 chars
          - Whitespace-only counts as empty (400)
          - "errors" only contains the fields that failed; values are lists of strings
          - Nothing is stored and no email is sent (out of scope). Do not log name or message.
          - Error texts in "detail" and "errors" are English and machine-oriented;
            the frontend shows its own Dutch texts and only uses "errors" keys to mark fields.
CORS      The form page is served from a different origin than the API.
          API allows origins from env var CORS_ALLOWED_ORIGINS (comma separated), POST and OPTIONS only.
```

## Frontend texts (Dutch, informal)

| Case | Text |
|---|---|
| Success (201) | Bedankt! We hebben je bericht ontvangen. |
| name invalid | Vul je naam in. |
| message invalid | Vul je bericht in. |
| Other 400 | Er ging iets mis. Controleer je invoer en probeer het opnieuw. |
| Network error / 5xx | Versturen is niet gelukt. Probeer het later opnieuw. |
