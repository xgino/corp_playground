// web/content/landing.ts
// PLACEHOLDER COPY: all text below is a draft in Dutch (je/jij) and must be replaced
// with real text from the owner/marketing. No real claims, numbers or testimonials.

export const landing = {
  meta: {
    title: 'Adams corp | [bedrijfsnaam en belofte]',
    description:
      'Placeholder: kort vertel je hier wat we doen en wat jij ermee bereikt.',
    siteName: 'Adams corp',
    locale: 'nl_NL',
  },
  nav: {
    skipLink: 'Ga naar de inhoud',
  },
  hero: {
    headline: 'Een heldere koers voor jouw volgende stap',
    promise: 'Wij helpen je van idee naar resultaat, zonder gedoe.',
    primaryCta: { label: 'Neem contact op', href: '#contact' },
    secondaryCta: { label: 'Bekijk hoe het werkt', href: '#stappen' },
  },
  showcase: {
    title: 'Wat jij bereikt',
    intro: 'Drie resultaten waar je op kunt rekenen.',
    cards: [
      {
        title: 'Meer overzicht',
        text: 'Je weet precies waar je staat en wat de volgende stap is.',
      },
      {
        title: 'Sneller vooruit',
        text: 'Minder losse eindjes, meer tijd voor wat echt telt.',
      },
      {
        title: 'Rust in je werk',
        text: 'Duidelijke afspraken en een vast aanspreekpunt.',
      },
    ],
  },
  process: {
    title: 'Zo helpen we je',
    intro: 'Vier stappen, in deze volgorde.',
    stepLabel: 'Stap',
    steps: [
      { title: 'Kennismaken', text: 'We luisteren naar je situatie en je doel.' },
      { title: 'Plan maken', text: 'Samen kiezen we een aanpak die past.' },
      { title: 'Uitvoeren', text: 'We gaan aan de slag en houden je op de hoogte.' },
      { title: 'Afronden', text: 'We kijken terug en zorgen dat het blijft werken.' },
    ],
  },
  cta: {
    id: 'contact',
    title: 'Klaar om te beginnen?',
    text: 'Stuur ons een bericht. We reageren zo snel mogelijk.',
    button: { label: 'Naar het contactformulier', href: '/contact' },
  },
  footer: {
    text: 'Adams corp. Alle rechten voorbehouden.',
  },
} as const;

export type Landing = typeof landing;
