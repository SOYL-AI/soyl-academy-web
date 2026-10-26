/**
 * Identifier normalisation (DB-3, D-015). These functions are the TypeScript twins of the SQL
 * functions `soyl_normalize_email` and `soyl_normalize_phone` (migration 0000), which compute the
 * generated columns `users.email_normalized` and `users.phone_e164`. The database therefore enforces
 * uniqueness whatever code path writes the user; the API uses these to look users up and to apply
 * abuse limits before a write. test/normalize.test.ts checks both implementations agree.
 */

const GMAIL_DOMAINS = new Set(['gmail.com', 'googlemail.com']);

/**
 * Lower-case and trim. For gmail.com / googlemail.com also strip dots and a `+tag` from the local
 * part and map googlemail.com to gmail.com. Returns null for strings that are not an address and for
 * placeholder addresses on `.invalid` domains (Better Auth's temporary email for phone-only sign-up
 * should use such a domain so it never takes part in email uniqueness).
 */
export function normalizeEmail(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const email = raw.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+$/.test(email)) return null;
  const [local, domain] = email.split('@') as [string, string];
  if (domain === 'invalid' || domain.endsWith('.invalid')) return null;
  if (GMAIL_DOMAINS.has(domain)) return `${local.split('+')[0]!.replace(/\./g, '')}@gmail.com`;
  return email;
}

/**
 * E.164. Indian numbers given nationally (10 digits starting 6–9, optionally with a leading 0 or 91)
 * become +91XXXXXXXXXX; numbers already in international form (+ or 00 prefix) are kept.
 * Spaces, dots, dashes and brackets are ignored. Returns null when the input is not a phone number.
 */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const p = raw.replace(/[\s().-]/g, '').replace(/^00/, '+');
  if (/^\+[1-9][0-9]{7,14}$/.test(p)) return p;
  if (/^0?[6-9][0-9]{9}$/.test(p)) return `+91${p.slice(-10)}`;
  if (/^91[6-9][0-9]{9}$/.test(p)) return `+${p}`;
  return null;
}
