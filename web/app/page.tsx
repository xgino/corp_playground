// web/app/page.tsx
import FinalCta from '@/components/FinalCta';
import Hero from '@/components/Hero';
import Process from '@/components/Process';
import ScrollReveal from '@/components/ScrollReveal';
import Showcase from '@/components/Showcase';
import { landing } from '@/content/landing';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        {landing.nav.skipLink}
      </a>
      <main id="main">
        <Hero />
        <Showcase />
        <Process />
        <FinalCta />
      </main>
      <ScrollReveal />
    </>
  );
}
