/**
 * Razorpay API surface the platform uses (ADR-016), as an interface with two implementations:
 * `RazorpayHttpClient` (real API, test or live keys) and `RazorpayStub` (in-memory, faithful to the
 * entity shapes and state machines; local/test only, GEN-3). Entities keep Razorpay's snake_case field
 * names so the stub, the webhook payloads and the real API look the same to the billing code.
 *
 * Docs: https://razorpay.com/docs/api/ (plans, subscriptions, orders, payments, invoices, webhooks).
 */
import { z } from 'zod/v4';

/** Razorpay sends `notes: []` when empty, an object otherwise; values are strings (numbers tolerated). */
export const RzpNotes = z
  .union([z.record(z.string(), z.union([z.string(), z.number(), z.null()])), z.array(z.unknown())])
  .optional()
  .transform((v): Record<string, string> => {
    if (!v || Array.isArray(v)) return {};
    const out: Record<string, string> = {};
    for (const [k, x] of Object.entries(v)) if (x !== null) out[k] = String(x);
    return out;
  });
export type RzpNotes = Record<string, string>;

const unixSeconds = z.number().int().nullable().optional().transform((v) => v ?? null);

export const RzpPlan = z.looseObject({
  id: z.string(),
  entity: z.literal('plan'),
  interval: z.number().int(),
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  item: z.looseObject({ name: z.string(), amount: z.number().int(), currency: z.string(), description: z.string().nullable().optional() }),
  notes: RzpNotes,
  created_at: z.number().int(),
});
export type RzpPlan = z.infer<typeof RzpPlan>;

export const RZP_SUBSCRIPTION_STATUSES = ['created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'completed', 'expired', 'paused'] as const;
export type RzpSubscriptionStatus = (typeof RZP_SUBSCRIPTION_STATUSES)[number];

export const RzpSubscription = z.looseObject({
  id: z.string(),
  entity: z.literal('subscription'),
  plan_id: z.string(),
  status: z.enum(RZP_SUBSCRIPTION_STATUSES),
  current_start: unixSeconds,
  current_end: unixSeconds,
  ended_at: unixSeconds,
  charge_at: unixSeconds,
  start_at: unixSeconds,
  end_at: unixSeconds,
  expire_by: unixSeconds,
  quantity: z.number().int().optional(),
  total_count: z.number().int().optional(),
  paid_count: z.number().int().default(0),
  remaining_count: z.union([z.number().int(), z.string()]).nullable().optional(),
  customer_notify: z.union([z.boolean(), z.number()]).optional(),
  short_url: z.string().nullable().optional(),
  notes: RzpNotes,
  created_at: z.number().int(),
});
export type RzpSubscription = z.infer<typeof RzpSubscription>;

export const RzpOrder = z.looseObject({
  id: z.string(),
  entity: z.literal('order'),
  amount: z.number().int(),
  amount_paid: z.number().int().default(0),
  amount_due: z.number().int().default(0),
  currency: z.string(),
  receipt: z.string().nullable().optional().transform((v) => v ?? null),
  status: z.enum(['created', 'attempted', 'paid']),
  attempts: z.number().int().default(0),
  notes: RzpNotes,
  created_at: z.number().int(),
});
export type RzpOrder = z.infer<typeof RzpOrder>;

export const RZP_PAYMENT_STATUSES = ['created', 'authorized', 'captured', 'refunded', 'failed'] as const;

export const RzpPayment = z.looseObject({
  id: z.string(),
  entity: z.literal('payment'),
  amount: z.number().int(),
  currency: z.string(),
  status: z.enum(RZP_PAYMENT_STATUSES),
  order_id: z.string().nullable().optional().transform((v) => v ?? null),
  invoice_id: z.string().nullable().optional().transform((v) => v ?? null),
  method: z.string().nullable().optional().transform((v) => v ?? null),
  amount_refunded: z.number().int().default(0),
  refund_status: z.enum(['partial', 'full']).nullable().optional().transform((v) => v ?? null),
  captured: z.boolean().default(false),
  error_code: z.string().nullable().optional().transform((v) => v ?? null),
  error_reason: z.string().nullable().optional().transform((v) => v ?? null),
  /** Payer's email as entered in Checkout (the invoice is emailed there, ADR-024). */
  email: z.string().nullable().optional().transform((v) => v ?? null),
  notes: RzpNotes,
  created_at: z.number().int(),
});
export type RzpPayment = z.infer<typeof RzpPayment>;

export const RzpInvoice = z.looseObject({
  id: z.string(),
  entity: z.literal('invoice'),
  subscription_id: z.string().nullable().optional().transform((v) => v ?? null),
  payment_id: z.string().nullable().optional().transform((v) => v ?? null),
  order_id: z.string().nullable().optional().transform((v) => v ?? null),
  status: z.string(),
  amount: z.number().int().optional(),
});
export type RzpInvoice = z.infer<typeof RzpInvoice>;

export const RzpRefund = z.looseObject({
  id: z.string(),
  entity: z.literal('refund'),
  payment_id: z.string(),
  amount: z.number().int(),
  status: z.string(),
  created_at: z.number().int(),
});
export type RzpRefund = z.infer<typeof RzpRefund>;

/** Webhook envelope. Entities inside are re-fetched before anything is granted (AC-09). */
export const RzpWebhookEvent = z.looseObject({
  entity: z.literal('event'),
  account_id: z.string().optional(),
  event: z.string().min(1).max(100),
  contains: z.array(z.string()).optional(),
  payload: z.looseObject({
    subscription: z.looseObject({ entity: z.looseObject({ id: z.string() }) }).optional(),
    payment: z.looseObject({ entity: z.looseObject({ id: z.string(), order_id: z.string().nullable().optional(), invoice_id: z.string().nullable().optional() }) }).optional(),
    order: z.looseObject({ entity: z.looseObject({ id: z.string() }) }).optional(),
    refund: z.looseObject({ entity: z.looseObject({ id: z.string(), payment_id: z.string() }) }).optional(),
  }),
  created_at: z.number().int(),
});
export type RzpWebhookEvent = z.infer<typeof RzpWebhookEvent>;

export interface CreatePlanInput {
  period: 'monthly' | 'yearly';
  interval: number;
  item: { name: string; amount: number; currency: string; description?: string };
  notes: RzpNotes;
}

export interface CreateSubscriptionInput {
  plan_id: string;
  total_count: number;
  quantity?: number;
  /** 0: we (and Checkout) handle communication; Razorpay does not email/SMS the payer. */
  customer_notify: 0 | 1;
  /** Unix seconds: the subscription expires if not authorised by then. */
  expire_by?: number;
  notes: RzpNotes;
}

export interface CreateOrderInput {
  amount: number;
  currency: string;
  receipt: string;
  notes: RzpNotes;
}

export interface RazorpayClient {
  readonly mode: 'stub' | 'razorpay';
  /** Public key id for Checkout. */
  readonly keyId: string;
  listPlans(): Promise<RzpPlan[]>;
  createPlan(input: CreatePlanInput): Promise<RzpPlan>;
  createSubscription(input: CreateSubscriptionInput): Promise<RzpSubscription>;
  fetchSubscription(id: string): Promise<RzpSubscription>;
  cancelSubscription(id: string, opts: { atCycleEnd: boolean }): Promise<RzpSubscription>;
  createOrder(input: CreateOrderInput): Promise<RzpOrder>;
  fetchOrder(id: string): Promise<RzpOrder>;
  fetchOrderPayments(id: string): Promise<RzpPayment[]>;
  fetchPayment(id: string): Promise<RzpPayment>;
  fetchInvoice(id: string): Promise<RzpInvoice>;
  /** Razorpay invoices (one per charge) of a subscription: reconciliation finds payments a missed webhook never recorded. */
  fetchSubscriptionInvoices(id: string): Promise<RzpInvoice[]>;
}

/** A Razorpay API failure. Never shown to clients (API-13): routes answer billing_unavailable. */
export class RazorpayApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string | null = null,
    /** Network errors, timeouts, 429 and 5xx: the caller may retry (webhooks answer 503 so Razorpay retries). */
    readonly retryable: boolean = status === 0 || status === 429 || status >= 500,
  ) {
    super(message);
    this.name = 'RazorpayApiError';
  }
}

/** The id does not exist at Razorpay (Razorpay answers 400 BAD_REQUEST_ERROR "…does not exist"). */
export class RazorpayNotFoundError extends RazorpayApiError {
  constructor(what: string) {
    super(`${what} does not exist`, 404, 'NOT_FOUND', false);
    this.name = 'RazorpayNotFoundError';
  }
}

/** Unix seconds → Date (null stays null). */
export function fromUnix(s: number | null | undefined): Date | null {
  return s === null || s === undefined ? null : new Date(s * 1000);
}

export function toUnix(d: Date | number): number {
  return Math.floor((typeof d === 'number' ? d : d.getTime()) / 1000);
}
