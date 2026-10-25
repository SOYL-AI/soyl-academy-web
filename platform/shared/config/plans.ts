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
    features: ['ai_credits', 'paper_from_upload'],
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
