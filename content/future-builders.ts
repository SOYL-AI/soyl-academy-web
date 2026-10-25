/**
 * Future Builders cohort facts — the single file to edit by hand.
 *
 * Every date, seat count, price and discount code shown anywhere on the site
 * (banner, programme page, form, FAQ, payment API) reads from here.
 *
 * Registration state is derived from the dates, so nothing goes stale:
 *   open          → more than CLOSING_SOON_DAYS before registration closes
 *   closing-soon  → within CLOSING_SOON_DAYS of the close
 *   waitlist      → after the close (or when no cohort is scheduled)
 *
 * To open the next cohort: replace COHORT with its dates. That's all.
 */

export interface Cohort {
  /** Shown in headings, e.g. "January 2027 cohort". */
  name: string;
  /** ISO dates (IST). */
  orientation: string;
  classesStart: string;
  /** Registration close, ISO timestamp with offset. */
  registrationCloses: string;
  /** Week-12 Demo Day / end date, ISO. */
  ends: string;
}

/** Set to `null` when no cohort is scheduled; the site then shows the waitlist. */
export const COHORT: Cohort | null = {
  name: 'October 2026 cohort',
  orientation: '2026-10-20',
  classesStart: '2026-10-24',
  registrationCloses: '2026-10-22T23:59:00+05:30',
  ends: '2027-01-12',
};

export const CLOSING_SOON_DAYS = 5;

export type CohortState = 'open' | 'closing-soon' | 'waitlist';

/**
 * Development only: set COHORT_PREVIEW_DATE (e.g. 2026-10-10) to preview how the
 * site looks on that day. Ignored in production builds.
 */
function today(): Date {
  const preview = process.env.NODE_ENV !== 'production' ? process.env.COHORT_PREVIEW_DATE : undefined;
  return preview ? new Date(`${preview}T12:00:00+05:30`) : new Date();
}

export function getCohortState(now: Date = today()): CohortState {
  if (!COHORT) return 'waitlist';
  const closes = new Date(COHORT.registrationCloses).getTime();
  const left = closes - now.getTime();
  if (left <= 0) return 'waitlist';
  if (left <= CLOSING_SOON_DAYS * 24 * 60 * 60 * 1000) return 'closing-soon';
  return 'open';
}

/** "22 Oct" in IST, from an ISO date or timestamp. */
export function formatCohortDate(iso: string, withYear = false): string {
  const date = iso.length === 10 ? new Date(`${iso}T12:00:00+05:30`) : new Date(iso);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
    timeZone: 'Asia/Kolkata',
  });
}

// ── Cohort size ───────────────────────────────────────────────────────────
/** Maximum students per cohort (stated on the page and in the FAQ). */
export const SEATS_TOTAL: number = 10;

export const SCHEDULE = {
  days: 'Saturday evenings + Sunday mornings',
  short: 'Sat evening · Sun morning',
  hours: '~3 hrs per session, live on video (IST)',
} as const;

export const CONTACT_HOURS = 75;

// ── Price & offers ────────────────────────────────────────────────────────
export const BASE_PRICE = 5499;
/** ₹5,499 ÷ 75 h = ₹73.3, rounded up to the next ₹5 → "under ₹75/hour". */
export const PER_HOUR_UNDER = Math.ceil(BASE_PRICE / CONTACT_HOURS / 5) * 5;
export const VALUE_LINE = `₹${BASE_PRICE.toLocaleString('en-IN')} ÷ ${CONTACT_HOURS} hours = under ₹${PER_HOUR_UNDER}/hour · kit included, shipped to your door`;

/** Early-bird code. */
export const EARLY_BIRD_CODE = 'BUILDER10';
/** Referral / bring-a-friend code. Requires the friend's name at checkout. */
export const FRIEND_CODE = 'FRIEND500';
export const FRIEND_DISCOUNT = 500;

export const WHATSAPP_NUMBER = '917022509965';
export const WHATSAPP_DISPLAY = '+91 70225 09965';
export const CALLBACK_PROMISE = 'within 15 minutes (9am–9pm)';

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp's contact picker so a parent can forward the message to anyone. */
export function whatsappShareLink(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
