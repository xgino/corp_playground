// web/components/Process.tsx
import { landing } from '@/content/landing';

const section = landing.process;

export default function Process() {
  return (
    <section id="stappen" className="section-surface py-5" aria-labelledby="process-title">
      <div className="container py-4" data-reveal>
        <h2 id="process-title" className="h1 text-center mb-2">
          {section.title}
        </h2>
        <p className="text-center text-muted-ink mb-5">{section.intro}</p>
        <ol className="list-unstyled row g-4 mb-0">
          {section.steps.map((step, index) => (
            <li className="col-12 col-md-6 col-lg-3" key={step.title}>
              <div className="d-flex align-items-start gap-3">
                <span className="eyebrow-number" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="h5 mb-1">
                    <span className="visually-hidden">{section.stepLabel} {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="text-muted-ink mb-0">{step.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
