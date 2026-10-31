# web/

What this folder is for, how it is organised, and what has been done here.
Read this before working here. The people who work in this area keep About and Structure
current; the Work log is added to automatically when a ticket ends.

## About

The public website. A Next.js (App Router, TypeScript) app with Bootstrap, exported as
static files (`output: 'export'`). `/` is a calm landing page with four sections: hero,
showcase, process, final call to action. Motion is minimal (CSS plus a small
IntersectionObserver component) and disabled for `prefers-reduced-motion`.
`/contact` is the contact form (name + message), posting to `POST /api/contact/`
(contract v1: `docs/contracts/contact.md`).

Run: `cd web && npm install && npm run dev` (dev), `npm run build` (static site in `out/`).
Environment: copy `.env.example` to `.env.local`. `NEXT_PUBLIC_API_BASE_URL` is the API
base URL (inlined at build time, public). The API must allow the site origin in
`CORS_ALLOWED_ORIGINS` (`api/.env`), for example `http://localhost:3000`.

## Structure

- `app/layout.tsx`: html shell (lang="nl"), SEO metadata, Bootstrap and global CSS.
- `app/page.tsx`: the landing page, composes the sections.
- `app/globals.css`: accent colour (`--accent`, one place), motion and focus styles.
- `app/contact/page.tsx`: the `/contact` page (server component, metadata, link back to `/`).
- `components/`: `Hero`, `Showcase`, `Process`, `FinalCta` (with footer), `ScrollReveal` (client),
  `ContactForm` (client: validation, states, field errors).
- `content/landing.ts`: ALL landing copy and metadata. Currently placeholder Dutch text.
- `content/contact.ts`: ALL contact page texts (labels, errors, success).
- `lib/contactApi.ts`: `sendContact()`, the only place that calls the API (timeout 15s).
- `.env.example`: `NEXT_PUBLIC_API_BASE_URL`.
- `next.config.mjs`, `tsconfig.json`, `package.json`, `.gitignore`: tooling.

## Work log

| Date | Ticket | Who | What | Branch |
|---|---|---|---|---|
| 2026-10-31 | #9 | frontend-developer | Next.js landing page in web/ (#A) (unfinished) | ticket-9-next-js-landing-page-in-web-a |
| 2026-10-31 | #10 | frontend-developer | Next.js landing page in web/ (#A) - continue (unfinished) | ticket-9-next-js-landing-page-in-web-a |
