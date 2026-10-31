// web/components/FinalCta.tsx
import { landing } from '@/content/landing';

const { cta, footer } = landing;

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
        <div className="container text-center small text-muted-ink">{footer.text}</div>
      </footer>
    </>
  );
}
