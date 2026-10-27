/**
 * Future Builders cohort facts — the single file to edit by hand.
 *
 * Every date, seat count, price and discount code shown anywhere on the site
 * (banner, programme page, form, FAQ, payment API) reads from here.
 *
 * Registration state is derived from the dates, so nothing goes stale:
 *   open          → a cohort is taking registrations, more than CLOSING_SOON_DAYS before the close
 *   closing-soon  → within CLOSING_SOON_DAYS of the close
 *   upcoming      → NEXT_COHORT is announced but registration hasn't opened yet
 *                   (the page collects "notify me" sign-ups; payment is refused)
 *   waitlist      → nothing open and nothing announced
 *
 * To open the next cohort, either:
 *   - set NEXT_COHORT.registrationOpens AND NEXT_COHORT.dates: the site switches
 *     from "upcoming" to "open" by itself at that moment; or
 *   - replace COHORT with the new cohort's dates (and set NEXT_COHORT to null).
 */

export interface Cohort {
  /** Shown in headings, e.g. "January 2027 cohort". */
  name: string;
  /** ISO dates (IST). */
  orientation: string;
  classesStart: string;
  /** Registration close, ISO timestamp with offset. */
  registrationCloses: string;
  /** Demo Day / end date, ISO. */
  ends: string;
}

/** The most recent cohort with full dates. Open from now until `registrationCloses`. */
export const COHORT: Cohort | null = {
  name: 'October 2026 cohort',
  orientation: '2026-10-20',
  classesStart: '2026-10-24',
  registrationCloses: '2026-10-22T23:59:00+05:30',
  ends: '2027-01-12',
};

/** An announced cohort whose registration has not opened yet. */
export interface UpcomingCohort {
  /** Shown in headings, e.g. "Summer 2027 cohort". */
  name: string;
  /** When it runs, in words. No exact dates until they are set. */
  window: string;
  /** When registration opens, in words, e.g. "mid-November 2026". */
  registrationOpensLabel: string;
  /**
   * Optional exact opening, ISO timestamp with offset (e.g. "2026-11-15T10:00:00+05:30").
   * Once it has passed AND `dates` is filled in, the state becomes open automatically.
   */
  registrationOpens?: string;
  /** The cohort's dates; required before it can take payments. */
  dates?: Omit<Cohort, 'name'>;
  /** Tag stored with "notify me" and call requests in the Google Sheet. */
  sourceTag: string;
}

/**
 * D-038 (owner, 28 Oct 2026): the next cohort runs in the summer break, April–May 2027;
 * registration opens mid-November 2026. Exact dates, timetable and price are not set yet,
 * so none are stated: the page shows the current BASE_PRICE and "timetable announced at registration".
 * Set to `null` when nothing is announced; the site then shows the plain waitlist.
 */
export const NEXT_COHORT: UpcomingCohort | null = {
  name: 'Summer 2027 cohort',
  window: 'April–May 2027, during the summer break',
  registrationOpensLabel: 'mid-November 2026',
  sourceTag: 'fb_summer_2027',
};

export const CLOSING_SOON_DAYS = 5;

export type CohortState = 'open' | 'closing-soon' | 'upcoming' | 'waitlist';

/**
 * Development only, ignored in production builds:
 * - COHORT_PREVIEW_DATE (e.g. 2026-10-10) previews the site on that day;
 * - COHORT_PREVIEW_NEXT=none previews it as if no next cohort were announced.
 */
const DEV = process.env.NODE_ENV !== 'production';

function today(): Date {
  const preview = DEV ? process.env.COHORT_PREVIEW_DATE : undefined;
  return preview ? new Date(`${preview}T12:00:00+05:30`) : new Date();
}

function announcedNext(): UpcomingCohort | null {
  return DEV && process.env.COHORT_PREVIEW_NEXT === 'none' ? null : NEXT_COHORT;
}

const ms = (iso: string) => new Date(iso).getTime();

interface Schedule {
  current: Cohort | null;
  next: UpcomingCohort | null;
}

/** The cohort taking registrations right now, if any. Payment is allowed only when this is not null. */
export function getOpenCohort(now: Date = today(), { current, next }: Schedule = { current: COHORT, next: announcedNext() }): Cohort | null {
  const t = now.getTime();
  if (current && t < ms(current.registrationCloses)) return current;
  if (next?.registrationOpens && next.dates && t >= ms(next.registrationOpens) && t < ms(next.dates.registrationCloses)) {
    return { name: next.name, ...next.dates };
  }
  return null;
}

/** The announced cohort, while its registration has not opened yet. */
export function getUpcomingCohort(now: Date = today(), schedule: Schedule = { current: COHORT, next: announcedNext() }): UpcomingCohort | null {
  const { next } = schedule;
  if (!next || getOpenCohort(now, schedule)) return null;
  // Its registration has already closed: it is no longer "upcoming".
  if (next.dates && now.getTime() >= ms(next.dates.registrationCloses)) return null;
  return next;
}

export function getCohortState(now: Date = today(), schedule: Schedule = { current: COHORT, next: announcedNext() }): CohortState {
  const open = getOpenCohort(now, schedule);
  if (open) {
    const left = ms(open.registrationCloses) - now.getTime();
    return left <= CLOSING_SOON_DAYS * 24 * 60 * 60 * 1000 ? 'closing-soon' : 'open';
  }
  return getUpcomingCohort(now, schedule) ? 'upcoming' : 'waitlist';
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
