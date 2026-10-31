# web/

What this folder is for, how it is organised, and what has been done here.
Read this before working here. The people who work in this area keep About and Structure
current; the Work log is added to automatically when a ticket ends.

## About

The public website. A Next.js (App Router, TypeScript) app with Bootstrap, exported as
static files (`output: 'export'`). `/` is a calm landing page with four sections: hero,
showcase, process, final call to action. Motion is minimal (CSS plus a small
IntersectionObserver component) and disabled for `prefers-reduced-motion`.

Run: `cd web && npm install && npm run dev` (dev), `npm run build` (static site in `out/`).
No environment variables are used yet.

The old `contact.html`, `contact.js` and `config.js` are still plain files in this folder.
They are not part of the Next.js build and are ported later (ticket #B).

## Structure

- `app/layout.tsx`: html shell (lang="nl"), SEO metadata, Bootstrap and global CSS.
- `app/page.tsx`: the landing page, composes the sections.
- `app/globals.css`: accent colour (`--accent`, one place), motion and focus styles.
- `components/`: `Hero`, `Showcase`, `Process`, `FinalCta` (with footer), `ScrollReveal` (client).
- `content/landing.ts`: ALL page copy and metadata. Currently placeholder Dutch text.
- `contact.html`, `contact.js`, `config.js`: legacy contact page, untouched.
- `next.config.mjs`, `tsconfig.json`, `package.json`, `.gitignore`: tooling.

## Work log

| Date | Ticket | Who | What | Branch |
|---|---|---|---|---|
| 2026-10-31 | #9 | frontend-developer | Next.js landing page in web/ (#A) (unfinished) | ticket-9-next-js-landing-page-in-web-a |
