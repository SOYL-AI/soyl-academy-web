/**
 * AI plans and prices (CONTEXT.md §7). Prices are INR, GST-inclusive, stored in integer paise.
 * The owner changes prices here, never in code. `npm run billing -- sync-plans` pushes them to Razorpay.
 */
import { z } from 'zod/v4';

export const PlanId = z.enum(['free', 'plus', 'pro', 'board_exam_pass']);
export type PlanId = z.infer<typeof PlanId>;

export const BillingInterval = z.enum(['monthly', 'yearly', 'one_time']);
export type BillingInterval = z.infer<typeof BillingInterval>;

export const PlanFeature = z.enum([
  'ai_credits',
  'paper_from_upload',
  'priority_ai_evaluation',
  'parent_weekly_report',
]);
export type PlanFeature = z.infer<typeof PlanFeature>;

export const PlanPrice = z.object({
  interval: BillingInterval,
  /** GST-inclusive amount in paise. */
  amountPaise: z.number().int().nonnegative(),
});
export type PlanPrice = z.infer<typeof PlanPrice>;

export const Plan = z.object({
  id: PlanId,
  name: z.string(),
  creditsPerDay: z.number().int().positive(),
  features: z.array(PlanFeature),
  prices: z.array(PlanPrice),
  /** Fixed end date for one-time passes (ISO 8601 with offset). Null for recurring plans. */
  validUntil: z.string().nullable(),
  /** Display order on /plans. */
  order: z.number().int(),
});
export type Plan = z.infer<typeof Plan>;

export const PLANS: readonly Plan[] = [
  {
    id: 'free',
    name: 'Free',
    creditsPerDay: 25,
    features: ['ai_credits'],
    prices: [],
    validUntil: null,
    order: 0,
  },
  {
    id: 'plus',
    name: 'Plus',
    creditsPerDay: 40,
    // Not paper_from_upload: it costs 60 credits, more than Plus grants in a day (D-034).
    features: ['ai_credits'],
    prices: [
      { interval: 'monthly', amountPaise: 19_900 },
      { interval: 'yearly', amountPaise: 149_900 },
    ],
    validUntil: null,
    order: 1,
  },
  {
    id: 'pro',
    name: 'Pro',
    creditsPerDay: 60,
    features: ['ai_credits', 'paper_from_upload', 'priority_ai_evaluation', 'parent_weekly_report'],
    prices: [
      { interval: 'monthly', amountPaise: 29_900 },
      { interval: 'yearly', amountPaise: 249_900 },
    ],
    validUntil: null,
    order: 2,
  },
  {
    id: 'board_exam_pass',
    name: 'Board Exam Pass',
    creditsPerDay: 60,
    features: ['ai_credits', 'paper_from_upload', 'priority_ai_evaluation', 'parent_weekly_report'],
    prices: [{ interval: 'one_time', amountPaise: 49_900 }],
    validUntil: '2027-03-31T23:59:59+05:30',
    order: 3,
  },
] as const;

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

/** Formats paise as a GST-inclusive INR label, e.g. 19900 → "₹199". */
export function formatInr(amountPaise: number): string {
  const rupees = amountPaise / 100;
  const text = Number.isInteger(rupees)
    ? rupees.toLocaleString('en-IN')
    : rupees.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `₹${text}`;
}

/** The price of a plan for an interval, or null when the plan is not sold that way. */
export function planPrice(id: PlanId, interval: BillingInterval): PlanPrice | null {
  return getPlan(id).prices.find((p) => p.interval === interval) ?? null;
}

const INTERVAL_SUFFIX: Record<BillingInterval, string> = { monthly: '/month', yearly: '/year', one_time: ' one-time' };

/** GST-inclusive price label for /plans, e.g. "₹199/month", "₹1,499/year", "₹499 one-time". */
export function priceLabel(price: PlanPrice): string {
  return `${formatInr(price.amountPaise)}${INTERVAL_SUFFIX[price.interval]}`;
}

/**
 * Billing behaviour (ARCHITECTURE §11.2, ADR-016). Owner-tunable values only; prices live in PLANS.
 */
export const BILLING = {
  currency: 'INR',
  /** Brand shown in Razorpay Checkout. */
  checkoutName: 'SOYL Academy',
  /**
   * A paid-up subscription stays entitled this long past `current_end`: Razorpay charges at the period
   * boundary and the `subscription.charged` webhook arrives after it. A halted subscription is revoked
   * at once regardless.
   */
  renewalGraceHours: 48,
  /** A created-but-unpaid order or subscription younger than this is returned again instead of a new one. */
  reusePendingMinutes: 30,
  /** Unpaid local orders older than this are marked `expired` by the worker. */
  orderExpiryHours: 24,
  /** Razorpay `expire_by`: a subscription not authorised within this many hours expires at Razorpay. */
  subscriptionAuthWindowHours: 24,
  /** Razorpay `total_count` (billing cycles) per interval. */
  subscriptionTotalCount: { monthly: 60, yearly: 5 },
  /** `POST /v1/billing/refresh`: at most this many server-side re-syncs per user per minute. */
  refreshPerMinute: 12,
  /** Value of `notes.app` on every Razorpay object we create (other Razorpay products on the account are ignored). */
  notesApp: 'soyl-academy',
} as const;
