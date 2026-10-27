/**
 * In-memory Razorpay stand-in (OA-04: no keys yet). GEN-3: refused in production (config). It keeps
 * Razorpay's entity shapes, id prefixes and state machines so the billing code cannot tell it from the
 * real API, and it plays Razorpay's side of a purchase: the `simulate*` methods do what Razorpay does
 * when the payer completes Checkout, a renewal is charged or fails, a subscription halts or ends, or a
 * refund is processed — and return the webhook events Razorpay would send. `WebhookSimulator` signs and
 * delivers them (webhook-simulator.ts).
 *
 * Tests can tamper with stored entities (e.g. `stub.orders.get(id)!.amount = 100`) to model a
 * compromised or mismatched account, and set `down = true` to model an outage.
 */
import { randomBytes } from 'node:crypto';
import {
  RazorpayApiError,
  RazorpayNotFoundError,
  toUnix,
  type CreateOrderInput,
  type CreatePlanInput,
  type CreateSubscriptionInput,
  type RazorpayClient,
  type RzpInvoice,
  type RzpOrder,
  type RzpPayment,
  type RzpPlan,
  type RzpRefund,
  type RzpSubscription,
} from './types';

const ALNUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export function rzpId(prefix: string): string {
  const bytes = randomBytes(14);
  let s = '';
  for (const b of bytes) s += ALNUM[b % ALNUM.length];
  return `${prefix}_${s}`;
}

/** A webhook Razorpay would send: the unique event id (X-Razorpay-Event-Id) and the JSON body. */
export interface SimEvent {
  eventId: string;
  body: {
    entity: 'event';
    account_id: string;
    event: string;
    contains: string[];
    payload: Record<string, { entity: Record<string, unknown> }>;
    created_at: number;
  };
}

const clone = <T,>(v: T): T => structuredClone(v);

function addPeriod(at: Date, period: RzpPlan['period'], interval: number): Date {
  const d = new Date(at.getTime());
  if (period === 'monthly') d.setUTCMonth(d.getUTCMonth() + interval);
  else if (period === 'yearly') d.setUTCFullYear(d.getUTCFullYear() + interval);
  else if (period === 'quarterly') d.setUTCMonth(d.getUTCMonth() + 3 * interval);
  else if (period === 'weekly') d.setUTCDate(d.getUTCDate() + 7 * interval);
  else d.setUTCDate(d.getUTCDate() + interval);
  return d;
}

export class RazorpayStub implements RazorpayClient {
  readonly mode = 'stub' as const;
  readonly accountId = 'acc_SoylStubAcct01';
  readonly plans = new Map<string, RzpPlan>();
  readonly subscriptions = new Map<string, RzpSubscription>();
  readonly orders = new Map<string, RzpOrder>();
  readonly payments = new Map<string, RzpPayment>();
  readonly invoices = new Map<string, RzpInvoice>();
  readonly refunds = new Map<string, RzpRefund>();
  /** Subscriptions cancelled with cancel_at_cycle_end=1 (Razorpay keeps them active until the period ends). */
  readonly scheduledCancel = new Set<string>();
  /** Every API call, e.g. "fetchPayment pay_X": tests assert that state was re-fetched (AC-09). */
  readonly calls: string[] = [];
  /** Outage: every API call fails with a retryable 503. */
  down = false;

  constructor(
    readonly keyId: string,
    private readonly now: () => number = Date.now,
  ) {}

  private seconds(): number {
    return toUnix(this.now());
  }

  private api(name: string): void {
    this.calls.push(name);
    if (this.down) throw new RazorpayApiError(`stub outage: ${name.split(' ')[0]}`, 503, 'SERVER_ERROR');
  }

  private get<T>(map: Map<string, T>, id: string, what: string): T {
    const v = map.get(id);
    if (!v) throw new RazorpayNotFoundError(what);
    return v;
  }

  /* ---- API ---------------------------------------------------------------------------------- */

  async listPlans() {
    this.api('listPlans');
    return [...this.plans.values()].map(clone);
  }

  async createPlan(input: CreatePlanInput) {
    this.api('createPlan');
    if (!Number.isInteger(input.item.amount) || input.item.amount < 100) throw new RazorpayApiError('amount must be at least 100 paise', 400, 'BAD_REQUEST_ERROR');
    const plan: RzpPlan = {
      id: rzpId('plan'),
      entity: 'plan',
      interval: input.interval,
      period: input.period,
      item: { name: input.item.name, amount: input.item.amount, currency: input.item.currency, description: input.item.description ?? null },
      notes: { ...input.notes },
      created_at: this.seconds(),
    };
    this.plans.set(plan.id, plan);
    return clone(plan);
  }

  async createSubscription(input: CreateSubscriptionInput) {
    this.api('createSubscription');
    this.get(this.plans, input.plan_id, 'plan');
    const sub: RzpSubscription = {
      id: rzpId('sub'),
      entity: 'subscription',
      plan_id: input.plan_id,
      status: 'created',
      current_start: null,
      current_end: null,
      ended_at: null,
      charge_at: null,
      start_at: null,
      end_at: null,
      expire_by: input.expire_by ?? null,
      quantity: input.quantity ?? 1,
      total_count: input.total_count,
      paid_count: 0,
      remaining_count: input.total_count,
      customer_notify: input.customer_notify === 1,
      short_url: `https://rzp.io/i/${rzpId('x').slice(2, 12)}`,
      notes: { ...input.notes },
      created_at: this.seconds(),
    };
    this.subscriptions.set(sub.id, sub);
    return clone(sub);
  }

  async fetchSubscription(id: string) {
    this.api(`fetchSubscription ${id}`);
    return clone(this.get(this.subscriptions, id, 'subscription'));
  }

  async cancelSubscription(id: string, opts: { atCycleEnd: boolean }) {
    this.api(`cancelSubscription ${id}`);
    const sub = this.get(this.subscriptions, id, 'subscription');
    if (['cancelled', 'completed', 'expired'].includes(sub.status))
      throw new RazorpayApiError('Subscription is not cancellable in cancelled status.', 400, 'BAD_REQUEST_ERROR');
    if (opts.atCycleEnd && sub.status === 'active') this.scheduledCancel.add(id);
    else {
      sub.status = 'cancelled';
      sub.ended_at = this.seconds();
    }
    return clone(sub);
  }

  async createOrder(input: CreateOrderInput) {
    this.api('createOrder');
    if (input.receipt.length > 40) throw new RazorpayApiError('receipt must be at most 40 characters', 400, 'BAD_REQUEST_ERROR');
    const order: RzpOrder = {
      id: rzpId('order'),
      entity: 'order',
      amount: input.amount,
      amount_paid: 0,
      amount_due: input.amount,
      currency: input.currency,
      receipt: input.receipt,
      status: 'created',
      attempts: 0,
      notes: { ...input.notes },
      created_at: this.seconds(),
    };
    this.orders.set(order.id, order);
    return clone(order);
  }

  async fetchOrder(id: string) {
    this.api(`fetchOrder ${id}`);
    return clone(this.get(this.orders, id, 'order'));
  }

  async fetchOrderPayments(id: string) {
    this.api(`fetchOrderPayments ${id}`);
    this.get(this.orders, id, 'order');
    return [...this.payments.values()].filter((p) => p.order_id === id).map(clone);
  }

  async fetchPayment(id: string) {
    this.api(`fetchPayment ${id}`);
    return clone(this.get(this.payments, id, 'payment'));
  }

  async fetchInvoice(id: string) {
    this.api(`fetchInvoice ${id}`);
    return clone(this.get(this.invoices, id, 'invoice'));
  }

  /* ---- Razorpay's side (payer actions, scheduled charges) → webhook events ------------------- */

  event(name: string, entities: Record<string, Record<string, unknown>>): SimEvent {
    return {
      eventId: rzpId('evt').slice(4),
      body: {
        entity: 'event',
        account_id: this.accountId,
        event: name,
        contains: Object.keys(entities),
        payload: Object.fromEntries(Object.entries(entities).map(([k, v]) => [k, { entity: clone(v) }])),
        created_at: this.seconds(),
      },
    };
  }

  private newPayment(amount: number, opts: { orderId: string | null; invoiceId?: string | null; method?: string; status: RzpPayment['status']; notes?: Record<string, string> }): RzpPayment {
    const p: RzpPayment = {
      id: rzpId('pay'),
      entity: 'payment',
      amount,
      currency: 'INR',
      status: opts.status,
      order_id: opts.orderId,
      invoice_id: opts.invoiceId ?? null,
      method: opts.method ?? 'upi',
      amount_refunded: 0,
      refund_status: null,
      captured: opts.status === 'captured',
      error_code: opts.status === 'failed' ? 'BAD_REQUEST_ERROR' : null,
      error_reason: opts.status === 'failed' ? 'payment_failed' : null,
      notes: { ...(opts.notes ?? {}) },
      created_at: this.seconds(),
    };
    this.payments.set(p.id, p);
    return p;
  }

  /** One subscription charge: an invoice + a payment (on Razorpay's own auto-created order). */
  private charge(sub: RzpSubscription, status: 'captured' | 'failed', method: string): RzpPayment {
    const plan = this.get(this.plans, sub.plan_id, 'plan');
    const invoiceId = rzpId('inv');
    const pay = this.newPayment(plan.item.amount, { orderId: rzpId('order'), invoiceId, method, status });
    this.invoices.set(invoiceId, { id: invoiceId, entity: 'invoice', subscription_id: sub.id, payment_id: pay.id, order_id: pay.order_id, status: status === 'captured' ? 'paid' : 'issued', amount: plan.item.amount });
    return pay;
  }

  private advance(sub: RzpSubscription): void {
    const plan = this.get(this.plans, sub.plan_id, 'plan');
    const start = sub.current_end !== null ? new Date(sub.current_end * 1000) : new Date(this.now());
    const end = addPeriod(start, plan.period, plan.interval);
    sub.current_start = toUnix(start);
    sub.current_end = toUnix(end);
    sub.charge_at = sub.current_end;
    sub.paid_count += 1;
    if (typeof sub.total_count === 'number') sub.remaining_count = Math.max(0, sub.total_count - sub.paid_count);
  }

  /**
   * The payer completes Checkout for a subscription that starts now: the mandate is authenticated and
   * the first period is charged. Events: subscription.authenticated, payment.captured,
   * subscription.activated, subscription.charged.
   */
  simulateSubscriptionCheckout(subId: string, opts: { method?: string } = {}): SimEvent[] {
    const sub = this.get(this.subscriptions, subId, 'subscription');
    if (sub.status !== 'created') throw new Error(`stub: subscription ${subId} is ${sub.status}, not created`);
    sub.status = 'authenticated';
    const authenticated = this.event('subscription.authenticated', { subscription: sub });
    const pay = this.charge(sub, 'captured', opts.method ?? 'upi');
    this.advance(sub);
    sub.status = 'active';
    return [
      authenticated,
      this.event('payment.captured', { payment: pay }),
      this.event('subscription.activated', { subscription: sub }),
      this.event('subscription.charged', { subscription: sub, payment: pay }),
    ];
  }

  /** The next period is charged successfully. Events: payment.captured, subscription.charged. */
  simulateRenewal(subId: string): SimEvent[] {
    const sub = this.get(this.subscriptions, subId, 'subscription');
    const pay = this.charge(sub, 'captured', 'upi');
    this.advance(sub);
    sub.status = 'active';
    return [this.event('payment.captured', { payment: pay }), this.event('subscription.charged', { subscription: sub, payment: pay })];
  }

  /** A renewal charge fails; Razorpay will retry. Events: payment.failed, subscription.pending. */
  simulateRenewalFailure(subId: string): SimEvent[] {
    const sub = this.get(this.subscriptions, subId, 'subscription');
    const pay = this.charge(sub, 'failed', 'upi');
    sub.status = 'pending';
    return [this.event('payment.failed', { payment: pay }), this.event('subscription.pending', { subscription: sub })];
  }

  /** All retries failed. Event: subscription.halted. */
  simulateHalt(subId: string): SimEvent[] {
    const sub = this.get(this.subscriptions, subId, 'subscription');
    sub.status = 'halted';
    return [this.event('subscription.halted', { subscription: sub })];
  }

  /** The current period ends: a scheduled cancellation takes effect (subscription.cancelled), or the last cycle completes. */
  simulateCycleEnd(subId: string): SimEvent[] {
    const sub = this.get(this.subscriptions, subId, 'subscription');
    if (this.scheduledCancel.delete(subId)) {
      sub.status = 'cancelled';
      sub.ended_at = sub.current_end;
      return [this.event('subscription.cancelled', { subscription: sub })];
    }
    if (sub.remaining_count === 0) {
      sub.status = 'completed';
      sub.ended_at = sub.current_end;
      return [this.event('subscription.completed', { subscription: sub })];
    }
    return this.simulateRenewal(subId);
  }

  /** Cancelled immediately at Razorpay (dashboard or API). Event: subscription.cancelled. */
  simulateCancelNow(subId: string): SimEvent[] {
    const sub = this.get(this.subscriptions, subId, 'subscription');
    sub.status = 'cancelled';
    sub.ended_at = this.seconds();
    this.scheduledCancel.delete(subId);
    return [this.event('subscription.cancelled', { subscription: sub })];
  }

  /** The payer pays an order in Checkout. Events: payment.captured, order.paid. */
  simulateOrderPayment(orderId: string, opts: { method?: string; amount?: number } = {}): SimEvent[] {
    const order = this.get(this.orders, orderId, 'order');
    const pay = this.newPayment(opts.amount ?? order.amount, { orderId, method: opts.method ?? 'upi', status: 'captured' });
    order.attempts += 1;
    order.amount_paid = pay.amount;
    order.amount_due = Math.max(0, order.amount - pay.amount);
    order.status = 'paid';
    return [this.event('payment.captured', { payment: pay, order }), this.event('order.paid', { payment: pay, order })];
  }

  /** A payment attempt on an order fails. Event: payment.failed (the order becomes `attempted`). */
  simulateOrderPaymentFailure(orderId: string): SimEvent[] {
    const order = this.get(this.orders, orderId, 'order');
    const pay = this.newPayment(order.amount, { orderId, status: 'failed' });
    order.attempts += 1;
    order.status = 'attempted';
    return [this.event('payment.failed', { payment: pay })];
  }

  /** A refund (full by default) is processed. Event: refund.processed. */
  simulateRefund(paymentId: string, amount?: number): SimEvent[] {
    const pay = this.get(this.payments, paymentId, 'payment');
    const amt = amount ?? pay.amount - pay.amount_refunded;
    pay.amount_refunded += amt;
    pay.refund_status = pay.amount_refunded >= pay.amount ? 'full' : 'partial';
    if (pay.amount_refunded >= pay.amount) pay.status = 'refunded';
    const refund: RzpRefund = { id: rzpId('rfnd'), entity: 'refund', payment_id: pay.id, amount: amt, status: 'processed', created_at: this.seconds() };
    this.refunds.set(refund.id, refund);
    return [this.event('refund.processed', { refund, payment: pay })];
  }
}
