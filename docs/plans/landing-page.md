# docs/plans/landing-page.md

## Goal
A modern, business-style landing page in Next.js with calm, minimal motion. Flow: strong
headline, what we do and what the client achieves, the steps we help with, a closing call to action.

## In scope
- Next.js (App Router, TypeScript) app in `web/`, Bootstrap for styling (company default).
- One page `/` with 4 sections, in this order:
  1. Hero: strong headline, one-line promise, primary button (to the final CTA) and a secondary link (to the steps).
  2. Showcase: 3 to 4 outcome cards ("what you achieve"), short numbers or benefit lines.
  3. Scope / process: numbered steps (e.g. 4) that show how we help, in order.
  4. Final CTA: closing message and a button to the contact page, then a small footer.
- Motion, minimal: fade and slight rise when a section scrolls into view (CSS + IntersectionObserver), soft hover lift on cards and buttons, hero fade-in on load. No animation library. Respects `prefers-reduced-motion`.
- Responsive (mobile first), accessible (semantic headings, contrast, focus states), basic SEO metadata.
- All page text in one content file (`web/content/landing.ts`), Dutch informal (je/jij), so it is easy to edit.
- Tests for the page by QA.

## Out of scope
- New backend or API changes. No analytics, no cookie banner, no blog, no multi-language.
- Logo, photos and brand colours: placeholders only (neutral palette, one accent colour set in one variable).
- Deployment (owner publishes).
- Real company claims, numbers and testimonials: none invented. Placeholder copy is marked.

## Contract
None. The final CTA links to `/contact`. The existing contract `docs/contracts/contact.md` stays unchanged.

## Tickets
- [ ] frontend-developer #A: Next.js landing page in `web/`
  - `npm run build` succeeds; `/` renders the 4 sections in the order above.
  - Text comes only from `web/content/landing.ts`; API URL (if used) from env, not hardcoded.
  - Scroll reveal and hover effects work; with reduced motion on, nothing moves.
  - Layout works at 375px, 768px and 1280px wide, no horizontal scroll.
  - One `h1`, headings in order, all buttons/links keyboard reachable with visible focus.
  - Existing `web/contact.*` files are not broken (see open question 1).
- [ ] frontend-developer #B (only if the owner picks option 1 below): port the contact form to a Next.js `/contact` route, same contract v1, remove the old static files.
  - Name + message required; 201 shows success text, 400 shows field errors from `errors`.
- [ ] qa-engineer: tests + review for #A (and #B), from these criteria. Depends on #A (and #B).

Order: #A, then #B, then QA.

## Risks and open questions
1. **Architecture change (needs your OK).** `web/` today is plain static HTML with no build step. Next.js adds Node, a build step and a new major dependency.
   - Option 1 (my pick): one Next.js app in `web/`, contact form ported into it (ticket #B). One clean frontend.
   - Option 2: Next.js app in `web/landing/`, old static contact page stays as is. Less work, two frontends side by side.
2. **Content.** I have no business name, offer, audience or proof points. Without them the copy is placeholder. Please give: company name, what you sell, who for, 3 outcomes, 4 steps, preferred accent colour. Or approve placeholder copy to edit later.
3. **Hosting.** Next.js needs a Node server (or static export). Static export is enough for this page and fits the existing Hetzner setup. Deploy is not part of this plan.
4. The contact page needs the API (CORS origin) to allow the Next.js dev origin; that is a settings change for the backend, only needed for #B.

## Work log

| Date | Ticket | Who | What | Branch |
|---|---|---|---|---|
| 2026-10-31 | #9 | frontend-developer | Next.js landing page in web/ (#A) (unfinished) | ticket-9-next-js-landing-page-in-web-a |
| 2026-10-31 | #10 | frontend-developer | Next.js landing page in web/ (#A) - continue (unfinished) | ticket-9-next-js-landing-page-in-web-a |
| 2026-10-31 | #12 | frontend-developer | Port contact form to Next.js /contact (#B) (unfinished) | ticket-12-port-contact-form-to-next-js-contact-b |
| 2026-10-31 | #13 | frontend-developer | Contact port (#B) - close out, keep legacy files | ticket-12-port-contact-form-to-next-js-contact-b |
