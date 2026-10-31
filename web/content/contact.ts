// web/content/contact.ts
// All texts of the /contact page. Dutch, informal (je/jij).
// Texts follow docs/contracts/contact.md (Frontend texts).

export const contact = {
  meta: {
    title: 'Contact | Adams corp',
    description: 'Stuur ons een bericht. We reageren zo snel mogelijk.',
  },
  backLink: { label: 'Terug naar de homepage', href: '/' },
  title: 'Neem contact op',
  intro: 'Vul je naam en bericht in. We reageren zo snel mogelijk.',
  fields: {
    name: { label: 'Naam', error: 'Vul je naam in.' },
    message: { label: 'Bericht', error: 'Vul je bericht in.' },
  },
  submit: { label: 'Versturen', sending: 'Versturen...' },
  status: {
    success: 'Bedankt! We hebben je bericht ontvangen.',
    invalid: 'Er ging iets mis. Controleer je invoer en probeer het opnieuw.',
    failed: 'Versturen is niet gelukt. Probeer het later opnieuw.',
    timeout: 'Het versturen duurt te lang. Controleer je verbinding en probeer het opnieuw.',
  },
} as const;

export type Contact = typeof contact;
