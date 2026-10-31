// web/components/ScrollReveal.tsx
'use client';

import { useEffect } from 'react';

/**
 * Fades in elements marked with data-reveal when they scroll into view.
 * Renders nothing. Content stays visible if JS is off, if IntersectionObserver
 * is missing, or if the user prefers reduced motion.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const canObserve = typeof IntersectionObserver !== 'undefined';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canObserve || reduced) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.reveal = 'visible';
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => {
      // Only hide what is still below the fold; the rest stays visible.
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.dataset.reveal = 'pending';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
