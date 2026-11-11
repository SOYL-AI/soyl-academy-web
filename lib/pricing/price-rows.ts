/**
 * Every paid price in platform/shared/config/plans.ts with its per-day figure (lib/pricing/per-day.ts), for the
 * price list on /parents (components/ink/PerDay `PriceList`). Server-side: it reads config, which carries zod.
 */
import { formatIstDate } from '@/lib/home/numbers';
import { formatInr, PLANS, type BillingInterval, type Plan, type PlanId } from '@/platform/shared/config/plans';
import { perDayFor } from './per-day';

const PERIOD: Record<BillingInterval, string> = { monthly: 'a month', yearly: 'a year', one_time: 'once' };
const INTERVAL_ORDER: readonly BillingInterval[] = ['monthly', 'yearly', 'one_time'];

export interface PriceRow {
  planId: PlanId;
  planName: string;
  /** The plan's AI credits a day. */
  creditsPerDay: number;
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
 * Plans in display order, each plan's prices monthly, yearly, then one-time. A price that cannot be spread over
 * days (free, or a pass that has ended) is left out.
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
        creditsPerDay: plan.creditsPerDay,
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
