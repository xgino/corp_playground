// web/lib/contactApi.ts
// Client for POST /api/contact/ (contract v1: docs/contracts/contact.md).
// Never throws: every outcome is returned as a ContactResult.

export type ContactPayload = { name: string; message: string };
export type ContactField = keyof ContactPayload;

export type ContactResult =
  | { kind: 'success' }
  | { kind: 'invalid'; fields: ContactField[] } // 400; empty list = no known field named
  | { kind: 'timeout' }
  | { kind: 'failed' }; // network error, 5xx or any other status

const FIELDS: ContactField[] = ['name', 'message'];
const TIMEOUT_MS = 15000;

// Set in web/.env.local (see .env.example). Inlined at build time.
// Empty means same origin (for example behind a reverse proxy).
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');

function failedFields(data: unknown): ContactField[] {
  const errors = (data as { errors?: unknown } | null)?.errors;
  if (!errors || typeof errors !== 'object') return [];
  return FIELDS.filter((field) => field in (errors as Record<string, unknown>));
}

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: payload.name, message: payload.message }),
      signal: controller.signal,
    });
    if (response.status === 201) return { kind: 'success' };
    if (response.status === 400) {
      const data = await response.json().catch(() => null);
      return { kind: 'invalid', fields: failedFields(data) };
    }
    return { kind: 'failed' };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { kind: 'timeout' };
    }
    return { kind: 'failed' };
  } finally {
    clearTimeout(timer);
  }
}
