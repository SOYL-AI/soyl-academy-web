/**
 * +91 mobile input (AUTH-1). The user types 10 digits after a fixed +91 prefix; pasted numbers with
 * +91 / 91 / 0 prefixes, spaces or dashes are accepted. The API re-validates (it is authoritative) and
 * refuses the reserved test range in production (GEN-3).
 */
import { INDIA_MOBILE_REGEX, TEST_PHONE_REGEX } from '@/platform/shared/config/security';

/** Digits only, without a leading +91 / 91 / 0 country or trunk prefix. */
export function nationalDigits(input: string): string {
  let d = input.replace(/[^\d+]/g, '');
  if (d.startsWith('+91')) d = d.slice(3);
  else if (d.startsWith('+')) return '';
  else if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.replace(/\D/g, '');
}

/** `+91XXXXXXXXXX` or null. */
export function toE164India(input: string): string | null {
  const digits = nationalDigits(input);
  if (digits.length !== 10) return null;
  const e164 = `+91${digits}`;
  return INDIA_MOBILE_REGEX.test(e164) || TEST_PHONE_REGEX.test(e164) ? e164 : null;
}

export function phoneError(input: string): string | null {
  const digits = nationalDigits(input);
  if (digits.length === 0) return 'Enter your 10-digit mobile number.';
  if (digits.length !== 10) return 'A mobile number has 10 digits.';
  if (!toE164India(input)) return 'Enter an Indian mobile number (it starts with 6, 7, 8 or 9).';
  return null;
}

/** `+919876543210` → `+91 ******3210` for display. */
export function maskedPhone(e164: string): string {
  return `+91 ${'*'.repeat(6)}${e164.slice(-4)}`;
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/;

export function emailError(input: string): string | null {
  const v = input.trim();
  if (!v) return 'Enter your email address.';
  if (v.length > 254 || !EMAIL_RE.test(v)) return 'Enter a valid email address, like name@example.com.';
  return null;
}
