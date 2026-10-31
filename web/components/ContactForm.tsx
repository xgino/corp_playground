// web/components/ContactForm.tsx
'use client';

import { useRef, useState, type FormEvent } from 'react';
import { contact } from '@/content/contact';
import { sendContact, type ContactField, type ContactPayload } from '@/lib/contactApi';

const { fields, submit, status: texts } = contact;

const EMPTY: ContactPayload = { name: '', message: '' };
const FIELD_ORDER: ContactField[] = ['name', 'message'];

type Status = { kind: 'success' | 'danger'; text: string } | null;

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const busy = useRef(false); // blocks a second submit before state has re-rendered
  const refs = {
    name: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  function update(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setInvalid((current) => current.filter((f) => f !== field));
  }

  function showInvalid(list: ContactField[]) {
    setInvalid(list);
    const first = FIELD_ORDER.find((f) => list.includes(f));
    if (first) refs[first].current?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    setStatus(null);

    const missing = FIELD_ORDER.filter((f) => !values[f].trim());
    if (missing.length > 0) {
      showInvalid(missing);
      return;
    }
    setInvalid([]);

    busy.current = true;
    setSending(true);
    const result = await sendContact(values);
    busy.current = false;
    setSending(false);

    switch (result.kind) {
      case 'success':
        setValues(EMPTY);
        setStatus({ kind: 'success', text: texts.success });
        break;
      case 'invalid':
        if (result.fields.length > 0) showInvalid(result.fields);
        else setStatus({ kind: 'danger', text: texts.invalid });
        break;
      case 'timeout':
        setStatus({ kind: 'danger', text: texts.timeout });
        break;
      default:
        setStatus({ kind: 'danger', text: texts.failed });
    }
  }

  function describedBy(field: ContactField) {
    return invalid.includes(field) ? `${field}-error` : undefined;
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          {fields.name.label}
        </label>
        <input
          ref={refs.name}
          type="text"
          id="name"
          name="name"
          className={`form-control${invalid.includes('name') ? ' is-invalid' : ''}`}
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          maxLength={100}
          required
          autoComplete="name"
          aria-invalid={invalid.includes('name')}
          aria-describedby={describedBy('name')}
        />
        {invalid.includes('name') && (
          <div id="name-error" className="invalid-feedback" role="alert">
            {fields.name.error}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          {fields.message.label}
        </label>
        <textarea
          ref={refs.message}
          id="message"
          name="message"
          className={`form-control${invalid.includes('message') ? ' is-invalid' : ''}`}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          rows={6}
          maxLength={2000}
          required
          aria-invalid={invalid.includes('message')}
          aria-describedby={describedBy('message')}
        />
        {invalid.includes('message') && (
          <div id="message-error" className="invalid-feedback" role="alert">
            {fields.message.error}
          </div>
        )}
      </div>

      <div role="status" aria-live="polite" className="mb-3">
        {status && <div className={`alert alert-${status.kind} mb-0`}>{status.text}</div>}
      </div>

      <button type="submit" className="btn btn-accent btn-lg lift" disabled={sending}>
        {sending ? submit.sending : submit.label}
      </button>
    </form>
  );
}
