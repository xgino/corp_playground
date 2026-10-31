// web/app/contact/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { contact } from '@/content/contact';

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
};

export default function ContactPage() {
  return (
    <main className="container py-5 contact-page">
      <p className="mb-4">
        <Link href={contact.backLink.href}>{contact.backLink.label}</Link>
      </p>
      <h1 className="h2 mb-2">{contact.title}</h1>
      <p className="text-muted-ink mb-4">{contact.intro}</p>
      <ContactForm />
    </main>
  );
}
