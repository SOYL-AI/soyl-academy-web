/**
 * Prices in a parent's units (docs/redesign-ink-and-wash.md §4, device 7): "about ₹6.60 a day" beside every paid
 * price on /plans and /parents. Every figure is computed from platform/shared/config/plans.ts, or from the same
 * amounts as GET /v1/plans returns them (the API reads that file). A hard-coded rupee figure is a bug.
 *
 * How a price is spread over days:
 * - monthly: 30 days, the way a parent divides a month (a 31-day month only makes the real figure lower);
 * - yearly: 365 days;
 * - one-time (the Board Exam Pass): the IST calendar days from today to the pass's last day, both included
 *   (bought today, it covers today), the same rule as the homepage exam clock (lib/home/numbers.ts).
 * The result is rounded to the nearest 10 paise, and to whole rupees from ₹10 a day up (`perDayLabel`).
 */
import { formatInr, PLANS, type BillingInterval, type Plan, type PlanId } from '@/platform/shared/config/plans';
import { daysUntil, formatIstDate, perDayLabel } from '@/lib/home/numbers';

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

const PERIOD: Record<BillingInterval, string> = { monthly: 'a month', yearly: 'a year', one_time: 'once' };
const INTERVAL_ORDER: readonly BillingInterval[] = ['monthly', 'yearly', 'one_time'];

export interface PriceRow {
  planId: PlanId;
  planName: string;
  interval: BillingInterval;
  /** "₹199" */
  price: string;
  /** "a month", "a year", "once" */
  period: string;
  /** "₹6.60" */
  perDay: string;
  /** "31 March 2027" for a pass with an end date; null for a recurring plan. */
  until: string | null;
}

/**
 * Every paid price in config, plans in display order and each plan's prices monthly, yearly, then one-time, with
 * the per-day figure. A price that cannot be spread over days (a pass that has ended) is left out.
 */
export function priceRows(now: Date, plans: readonly Plan[] = PLANS): PriceRow[] {
  const rows: PriceRow[] = [];
  for (const plan of [...plans].sort((a, b) => a.order - b.order)) {
    const prices = [...plan.prices].sort((a, b) => INTERVAL_ORDER.indexOf(a.interval) - INTERVAL_ORDER.indexOf(b.interval));
    for (const price of prices) {
      const perDay = perDayFor(price, plan.validUntil, now);
      if (!perDay) continue;
      rows.push({
        planId: plan.id,
        planName: plan.name,
        interval: price.interval,
        price: formatInr(price.amountPaise),
        period: PERIOD[price.interval],
        perDay,
        until: price.interval === 'one_time' && plan.validUntil ? formatIstDate(new Date(plan.validUntil)) : null,
      });
    }
  }
  return rows;
}
