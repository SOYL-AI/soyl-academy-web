/**
 * Prices in a parent's units (docs/redesign-ink-and-wash.md §4, device 7): "about ₹6.60 a day" beside every paid
 * price on /plans and /parents. The amounts come from platform/shared/config/plans.ts, or from GET /v1/plans
 * (the API reads that file); a hard-coded rupee figure is a bug.
 *
 * How a price is spread over days:
 * - monthly: 30 days, the way a parent divides a month (a 31-day month only makes the real figure lower);
 * - yearly: 365 days;
 * - one-time (the Board Exam Pass): the IST calendar days from today to the pass's last day, both included
 *   (bought today, it covers today), the same rule as the homepage exam clock (lib/home/numbers.ts).
 * The result is rounded to the nearest 10 paise, and to whole rupees from ₹10 a day up (`perDayLabel`).
 *
 * DEPENDENCY-FREE (type-only imports): the /plans cards (PlansClient) import this in the browser, and plans.ts
 * carries zod. Everything that reads config lives in price-rows.ts. A test checks this file's imports.
 */
import type { BillingInterval } from '@/platform/shared/config/plans';

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** The IST calendar day of an instant, as a day number (days since 1970-01-01 in IST). */
export function istDay(at: Date): number {
  return Math.floor((at.getTime() + IST_OFFSET_MS) / DAY_MS);
}

/** IST calendar days from `now` to the day of `target` (0 on the day itself, negative once it has passed). */
export function daysUntil(target: Date, now: Date): number {
  return istDay(target) - istDay(now);
}

/**
 * Price per day, rounded to the nearest 10 paise, as a label: "₹3.50". From ₹10 a day up, whole rupees ("₹10",
 * never "₹10.00"; Indian digit grouping, as formatInr). "About" belongs in the sentence, not here.
 */
export function perDayLabel(amountPaise: number, days: number): string {
  if (days <= 0) throw new Error('perDayLabel needs at least one day');
  const perDayPaise = amountPaise / days;
  const tenPaise = Math.max(10, Math.round(perDayPaise / 10) * 10);
  if (tenPaise >= 1000) return `₹${Math.round(perDayPaise / 100).toLocaleString('en-IN')}`;
  return `₹${(tenPaise / 100).toFixed(2)}`;
}

/** Days a recurring price is spread over. */
export const DAYS_PER_PERIOD = { monthly: 30, yearly: 365 } as const satisfies Partial<Record<BillingInterval, number>>;

export interface PriceLike {
  interval: BillingInterval;
  /** As in plans.ts and GET /v1/plans: integer paise. */
  amountPaise: number;
}

/**
 * The days a price covers from `now`: 30 for a month, 365 for a year, and for a one-time pass the IST days left
 * until its end, today included. Null for a pass without an end date, or one that has ended.
 */
export function daysCovered(interval: BillingInterval, validUntil: string | null, now: Date): number | null {
  if (interval === 'monthly' || interval === 'yearly') return DAYS_PER_PERIOD[interval];
  if (!validUntil) return null;
  const end = new Date(validUntil);
  if (Number.isNaN(end.getTime())) return null;
  const days = daysUntil(end, now) + 1;
  return days > 0 ? days : null;
}

/** "₹6.60": the price spread over the days it covers, or null when it cannot be (free, or a pass that ended). */
export function perDayFor(price: PriceLike, validUntil: string | null, now: Date): string | null {
  if (!Number.isFinite(price.amountPaise) || price.amountPaise <= 0) return null;
  const days = daysCovered(price.interval, validUntil, now);
  return days ? perDayLabel(price.amountPaise, days) : null;
}
