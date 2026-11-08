/**
 * Future Builders summer camp facts: the single file to edit by hand.
 *
 * Every date, price, offer and discount code shown anywhere on the site (homepage tab and
 * feature, programme page, form, FAQ, JSON-LD, payment API) reads from here.
 *
 * Owner decisions, 8 Nov 2026 (binding):
 * - The programme is a 2-month SUMMER CAMP, April–May 2027, during the summer break. Same
 *   curriculum as before. Never call it a "12-week cohort"; state no cohort size or seat count,
 *   no session count and no contact hours. Timing copy: "April–May 2027 · exact dates and
 *   timetable shared after registration".
 * - Prices in rupees only: list price ₹11,999 (shown struck through). Diwali early-bird ₹3,299
 *   until 15 Nov 2026, 23:59 IST; after that ₹9,999. Only FRIEND500 (₹500 off, with the friend's
 *   name) is accepted, during and after the offer.
 * - Registration is open from the relaunch until 31 Mar 2027, 23:59 IST.
 *
 * Registration state is derived from the dates, so nothing goes stale:
 *   upcoming      → before `registrationOpens` (the page collects "notify me" sign-ups; payment is refused)
 *   open          → taking registrations, more than CLOSING_SOON_DAYS before the close
 *   closing-soon  → within CLOSING_SOON_DAYS of the close
 *   waitlist      → registration has closed (or no camp is set)
 *
 * The offer (Diwali early-bird or the standard fee) is derived from the date the same way.
 *
 * To run the next camp: replace CAMP with its facts (slug, months, registration window) and
 * add or replace the offers below. A camp can have month-level timing only; exact `dates` are
 * optional and are shown only once set.
 */

export interface Camp {
  /** Stable id sent to the platform with each registration, e.g. "summer-2027". */
  slug: string;
  /** Shown in headings, e.g. "Summer 2027 camp". */
  name: string;
  /** When it runs, month-level, e.g. "April–May 2027". */
  months: string;
  /** The same, as ISO year-months for structured data, e.g. "2027-04" and "2027-05". */
  startMonth: string;
  endMonth: string;
  /** e.g. "a 2-month camp during the summer break". */
  format: string;
  /** e.g. "exact dates and timetable shared after registration". */
  timingNote: string;
  /** Registration opens, ISO timestamp with offset. */
  registrationOpens: string;
  /** In words, for "upcoming" copy, e.g. "8 November 2026". */
  registrationOpensLabel: string;
  /** Registration closes, ISO timestamp with offset (the last moment payment is accepted). */
  registrationCloses: string;
  /** Exact dates (ISO, IST), only once the owner has fixed them. Optional; shown only when set. */
  dates?: { orientation?: string; classesStart?: string; ends?: string };
  /** Tag stored with "notify me", waitlist and call requests. */
  sourceTag: string;
}

export const CAMP: Camp | null = {
  slug: 'summer-2027',
  name: 'Summer 2027 camp',
  months: 'April–May 2027',
  startMonth: '2027-04',
  endMonth: '2027-05',
  format: 'a 2-month camp during the summer break',
  timingNote: 'exact dates and timetable shared after registration',
  // Open from the 8 Nov 2026 relaunch until 31 Mar 2027, 23:59 IST.
  registrationOpens: '2026-11-08T00:00:00+05:30',
  registrationOpensLabel: '8 November 2026',
  registrationCloses: '2027-03-31T23:59:59+05:30',
  sourceTag: 'fb_summer_2027',
};

/** "April–May 2027 · exact dates and timetable shared after registration" */
export function campTimingLine(camp: Camp): string {
  return `${camp.months} · ${camp.timingNote}`;
}

export const CLOSING_SOON_DAYS = 5;

export type CohortState = 'open' | 'closing-soon' | 'upcoming' | 'waitlist';

/**
 * Development only, ignored in production builds:
 * COHORT_PREVIEW_DATE previews the site at that moment: a day ("2026-11-20", read as noon IST)
 * or a full timestamp ("2026-11-15T23:58:00+05:30"). It drives the camp state AND the offer,
 * in the pages and in the payment API alike.
 *   Diwali offer on:                 COHORT_PREVIEW_DATE=2026-11-10
 *   Diwali offer over (₹9,999):      COHORT_PREVIEW_DATE=2026-11-20
 *   Registration closed (waitlist):  COHORT_PREVIEW_DATE=2027-04-02
 */
const DEV = process.env.NODE_ENV !== 'production';

export function previewNow(): Date | null {
  const preview = DEV ? process.env.COHORT_PREVIEW_DATE?.trim() : undefined;
  if (!preview) return null;
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(preview) ? `${preview}T12:00:00+05:30` : preview);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Now, or the dev preview moment. Every date rule on the site goes through this. */
export function today(): Date {
  return previewNow() ?? new Date();
}

const ms = (iso: string) => new Date(iso).getTime();

/** The camp taking registrations right now, if any. Payment is allowed only when this is not null. */
export function getOpenCohort(now: Date = today(), camp: Camp | null = CAMP): Camp | null {
  if (!camp) return null;
  const t = now.getTime();
  return t >= ms(camp.registrationOpens) && t <= ms(camp.registrationCloses) ? camp : null;
}

/** The announced camp, while its registration has not opened yet. */
export function getUpcomingCohort(now: Date = today(), camp: Camp | null = CAMP): Camp | null {
  if (!camp) return null;
  return now.getTime() < ms(camp.registrationOpens) ? camp : null;
}

export function getCohortState(now: Date = today(), camp: Camp | null = CAMP): CohortState {
  const open = getOpenCohort(now, camp);
  if (open) {
    const left = ms(open.registrationCloses) - now.getTime();
    return left <= CLOSING_SOON_DAYS * 24 * 60 * 60 * 1000 ? 'closing-soon' : 'open';
  }
  return getUpcomingCohort(now, camp) ? 'upcoming' : 'waitlist';
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

// ── Price & offers (rupees; the payment API converts to paise) ────────────
/** The list price, always shown struck through next to the price actually charged. */
export const LIST_PRICE = 11999;

export type OfferSlug = 'diwali-2026' | 'standard';

export interface Offer {
  /** Sent to the platform with each registration. */
  slug: OfferSlug;
  /** e.g. "Diwali early-bird". */
  name: string;
  /** What is charged before any discount code, in rupees. */
  price: number;
  /** Exclusive end, ISO timestamp with offset. Absent = no end (the standard fee). */
  endsAt?: string;
  /** The end in words, e.g. "15 Nov, 11:59 pm". */
  endsLabel?: string;
  /** Page theme while this offer runs. */
  theme?: 'diwali';
}

/** Diwali early-bird: ₹3,299 until 15 Nov 2026, 23:59 IST (the offer ends at midnight IST). */
export const DIWALI_OFFER: Offer = {
  slug: 'diwali-2026',
  name: 'Diwali early-bird',
  price: 3299,
  endsAt: '2026-11-16T00:00:00+05:30',
  endsLabel: '15 Nov, 11:59 pm',
  theme: 'diwali',
};

/** After the Diwali offer: ₹11,999 struck → ₹9,999, no theme. */
export const STANDARD_OFFER: Offer = {
  slug: 'standard',
  name: 'Summer camp fee',
  price: 9999,
};

/** The offer in force at `now`: Diwali until its end, then the standard fee. */
export function getActiveOffer(now: Date = today()): Offer {
  return DIWALI_OFFER.endsAt && now.getTime() < ms(DIWALI_OFFER.endsAt) ? DIWALI_OFFER : STANDARD_OFFER;
}

/** "₹3,299" */
export function rupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Referral / bring-a-friend code: the only code accepted. Requires the friend's name at checkout. */
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
