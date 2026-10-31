// web/components/FinalCta.tsx
import { landing } from '@/content/landing';

const { cta, footer } = landing;

// Set in web/.env.local (see .env.example). Inlined at build time.
// Empty means same origin (for example behind a reverse proxy).
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');
const healthHref = `${API_BASE_URL}${footer.health.path}`;

export default function FinalCta() {
  return (
    <>
      <section id={cta.id} className="py-5" aria-labelledby="cta-title">
        <div className="container py-4 text-center" data-reveal>
          <h2 id="cta-title" className="h1 mb-3">
            {cta.title}
          </h2>
          <p className="text-muted-ink measure-text mx-auto mb-4">
            {cta.text}
          </p>
          <a className="btn btn-accent btn-lg lift" href={cta.button.href}>
            {cta.button.label}
          </a>
        </div>
      </section>
      <footer className="border-top py-4">
        <div className="container text-center small text-muted-ink">
          {footer.text}
          {' · '}
          <a href={healthHref} className="text-muted-ink">
            {footer.health.label}
          </a>
        </div>
      </footer>
    </>
  );
}
