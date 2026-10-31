// web/components/Showcase.tsx
import { landing } from '@/content/landing';

const { showcase } = landing;

export default function Showcase() {
  return (
    <section className="py-5" aria-labelledby="showcase-title">
      <div className="container py-4" data-reveal>
        <h2 id="showcase-title" className="h1 text-center mb-2">
          {showcase.title}
        </h2>
        <p className="text-center text-muted-ink mb-5">{showcase.intro}</p>
        <div className="row g-4">
          {showcase.cards.map((card) => (
            <div className="col-12 col-md-4" key={card.title}>
              <article className="card card-outcome lift h-100 p-4">
                <h3 className="h4 mb-2">{card.title}</h3>
                <p className="text-muted-ink mb-0">{card.text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
