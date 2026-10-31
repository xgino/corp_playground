// web/components/Hero.tsx
import { landing } from '@/content/landing';

const { hero } = landing;

export default function Hero() {
  return (
    <section className="hero py-5">
      <div className="container py-5 text-center hero-fade">
        <h1 className="display-4 fw-bold measure-headline mx-auto mb-3">
          {hero.headline}
        </h1>
        <p className="lead text-muted-ink measure-text mx-auto mb-4">
          {hero.promise}
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <a className="btn btn-accent btn-lg lift" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn-outline-secondary btn-lg lift" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
