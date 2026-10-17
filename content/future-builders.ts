/**
 * Future Builders cohort facts — the single file to edit by hand.
 *
 * Every date, seat count, price and discount code shown anywhere on the site
 * (top bar, popup, home feature, programme page, form, payment API) reads
 * from here. Change a value, push, and the whole site updates.
 */

// ── Cohort size ───────────────────────────────────────────────────────────
/** Maximum students per cohort (stated on the page and in the FAQ). */
export const SEATS_TOTAL: number = 10;

/**
 * Sponsored / scholarship seats to advertise. Keep at 0 to hold them in
 * reserve; set to 1 or 2 (e.g. if you're at 8–9 on registration close) and a
 * "need-based scholarship seats" line appears next to the seat counter.
 */
export const SCHOLARSHIP_SEATS: number = 0;

// ── Cohort dates ──────────────────────────────────────────────────────────
export const ORIENTATION_DATE = 'Oct 20';
export const CLASSES_START_DATE = 'Oct 24';
export const REGISTRATION_CLOSES = 'Oct 22';
/** Registration close, 11:59 pm IST — drives the countdown. */
export const REGISTRATION_CLOSES_AT = '2026-10-22T23:59:00+05:30';

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

/** Early-bird code advertised in the top bar and popup. */
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

// ── Derived ───────────────────────────────────────────────────────────────

export const DATES_LINE = `Orientation ${ORIENTATION_DATE} · Classes from ${CLASSES_START_DATE} · Registration closes ${REGISTRATION_CLOSES}`;
export const STATUS_BADGE = `Registrations open · closes ${REGISTRATION_CLOSES}`;
