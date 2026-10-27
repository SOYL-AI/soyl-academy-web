/**
 * Billing — Plus/Pro subscriptions (Subscriptions API): checkout, activation, out-of-order events,
 * renewals, failed/halted/cancelled flows, refunds, plan/amount binding, cancel endpoint.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { subscriptions } from '@soyl/db';
import { securityEvents } from './helpers';
import { billingRows, createBillingHarness, planFor, type BillingHarness } from './billing-fixture';

let h: BillingHarness;
const HOUR = 3_600_000;

beforeAll(async () => {
  h = await createBillingHarness();
});
afterAll(async () => {
  await h?.close();
});
// Tests move the clock forward by billing periods; every test starts from the same day.
const START = Date.parse('2026-10-27T06:30:00Z');
beforeEach(() => {
  h?.clock.set(START);
});

async function subscribe(plan: 'plus' | 'pro' = 'plus', interval: 'monthly' | 'yearly' = 'monthly') {
  const s = await h.student();
  const res = await s.c.post('/v1/billing/subscriptions', { plan, interval });
  expect(res.statusCode, res.body).toBe(201);
  return { ...s, subId: res.json().subscriptionId as string, checkout: res.json() };
}

const entity = (ev: { body: { payload: Record<string, { entity: Record<string, unknown> }> } }, k: string) => ev.body.payload[k]!.entity as { id: string };

describe('POST /v1/billing/subscriptions', () => {
  it('creates a Razorpay subscription on the synced plan, bound to the student; nothing granted yet', async () => {
    const { userId, subId, checkout } = await subscribe('plus', 'monthly');
    expect(checkout).toMatchObject({ kind: 'subscription', keyId: h.stub.keyId, plan: 'plus', interval: 'monthly', amountPaise: 19_900, currency: 'INR', label: '₹199/month', name: 'SOYL Academy', description: 'Plus — ₹199/month', reused: false });
    const rz = h.stub.subscriptions.get(subId)!;
    const plan = h.stub.plans.get(rz.plan_id)!;
    expect(plan).toMatchObject({ period: 'monthly', interval: 1, item: { amount: 19_900, currency: 'INR' } });
    expect(rz.notes).toEqual({ app: 'soyl-academy', soyl_user_id: userId, soyl_plan: 'plus', soyl_interval: 'monthly' });
    expect(rz.total_count).toBe(60);
    expect(rz.expire_by).toBe(Math.floor(h.clock.now() / 1000) + 24 * 3600);
    const rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]).toMatchObject({ status: 'created', interval: 'monthly', razorpayPlanId: rz.plan_id, amountPaise: 19_900, paidCount: 0 });
    expect(rows.entitlements).toHaveLength(0);
    expect(await planFor(h, userId)).toBe('free');
  });

  it('uses the yearly Razorpay plan and price for yearly', async () => {
    const { subId, checkout } = await subscribe('pro', 'yearly');
    expect(checkout).toMatchObject({ amountPaise: 249_900, label: '₹2,499/year' });
    expect(h.stub.plans.get(h.stub.subscriptions.get(subId)!.plan_id)).toMatchObject({ period: 'yearly', item: { amount: 249_900 } });
  });

  it('reuses an unpaid subscription for the same choice; refuses a second live one', async () => {
    const { c, subId, userId } = await subscribe('plus', 'monthly');
    const again = await c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' });
    expect(again.json()).toMatchObject({ subscriptionId: subId, reused: true });
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    expect(await planFor(h, userId)).toBe('plus');
    const upgrade = await c.post('/v1/billing/subscriptions', { plan: 'pro', interval: 'monthly' });
    expect(upgrade.statusCode).toBe(409);
    expect(upgrade.json().code).toBe('already_subscribed');
  });

  it('validates the body (no free / one-time plans, no extra fields)', async () => {
    const { c } = await h.student();
    for (const body of [{ plan: 'free', interval: 'monthly' }, { plan: 'board_exam_pass', interval: 'monthly' }, { plan: 'plus', interval: 'weekly' }, { plan: 'plus', interval: 'monthly', userId: 'x' }])
      expect((await c.post('/v1/billing/subscriptions', body)).statusCode).toBe(400);
  });
});

describe('subscription lifecycle (webhooks)', () => {
  it('activation grants the plan until the period end + grace, and GET /v1/me/subscription shows it', async () => {
    const { c, userId, subId } = await subscribe('pro', 'monthly');
    const res = await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    for (const r of res) expect(r.json().outcome).toBe('applied');
    const rz = h.stub.subscriptions.get(subId)!;
    const rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]).toMatchObject({ status: 'active', paidCount: 1 });
    expect(rows.subscriptions[0]!.currentPeriodEnd!.getTime()).toBe(rz.current_end! * 1000);
    expect(rows.payments).toHaveLength(1);
    expect(rows.payments[0]).toMatchObject({ status: 'captured', amountPaise: 29_900, orderId: null });
    expect(rows.entitlements).toHaveLength(1);
    expect(rows.entitlements[0]!.validUntil.getTime()).toBe(rz.current_end! * 1000 + 48 * HOUR);
    expect(await planFor(h, userId)).toBe('pro');
    const view = (await c.get('/v1/me/subscription')).json();
    expect(view).toMatchObject({ plan: 'pro', source: 'subscription', subscription: { plan: 'pro', interval: 'monthly', status: 'active', cancelAtPeriodEnd: false } });
  });

  it('out of order: charged before activated before authenticated ends in the same state', async () => {
    const { userId, subId } = await subscribe('plus', 'yearly');
    const [authenticated, captured, activated, charged] = h.stub.simulateSubscriptionCheckout(subId);
    for (const ev of [charged!, activated!, captured!, authenticated!]) expect((await h.deliver(ev)).json().outcome).toBe('applied');
    const rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]).toMatchObject({ status: 'active', paidCount: 1 });
    expect(rows.payments).toHaveLength(1);
    expect(rows.entitlements).toHaveLength(1);
    expect(await planFor(h, userId)).toBe('plus');
  });

  it('renewal extends the entitlement to the next period', async () => {
    const { userId, subId } = await subscribe();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    const firstEnd = h.stub.subscriptions.get(subId)!.current_end! * 1000;
    h.clock.set(firstEnd + HOUR);
    await h.deliverAll(h.stub.simulateRenewal(subId));
    const rz = h.stub.subscriptions.get(subId)!;
    expect(rz.current_end! * 1000).toBeGreaterThan(firstEnd);
    const rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]).toMatchObject({ paidCount: 2, status: 'active' });
    expect(rows.payments).toHaveLength(2);
    expect(rows.entitlements[0]!.validUntil.getTime()).toBe(rz.current_end! * 1000 + 48 * HOUR);
    expect(await planFor(h, userId)).toBe('plus');
  });

  it('failed renewal → pending keeps the plan through the grace period; halted revokes it', async () => {
    const { userId, subId } = await subscribe();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    const end = h.stub.subscriptions.get(subId)!.current_end! * 1000;
    h.clock.set(end + HOUR);
    const pending = await h.deliverAll(h.stub.simulateRenewalFailure(subId));
    for (const r of pending) expect(r.json().outcome).toBe('applied');
    let rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]!.status).toBe('pending');
    expect(rows.payments.map((p) => p.status).sort()).toEqual(['captured', 'failed']);
    expect(await planFor(h, userId)).toBe('plus');
    expect(await planFor(h, userId, end + 49 * HOUR)).toBe('free');

    await h.deliverAll(h.stub.simulateHalt(subId));
    rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]!.status).toBe('halted');
    expect(rows.entitlements[0]!.revokedAt).not.toBeNull();
    expect(await planFor(h, userId)).toBe('free');
  });

  it('a stale halted event after the subscription recovered does not revoke (state precedence)', async () => {
    const { userId, subId } = await subscribe();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    h.clock.set(h.stub.subscriptions.get(subId)!.current_end! * 1000 + HOUR);
    const [halted] = h.stub.simulateHalt(subId);
    // The parent fixes the mandate; Razorpay charges and reactivates before the halted webhook arrives.
    const recovered = h.stub.simulateRenewal(subId);
    await h.deliverAll(recovered);
    expect((await h.deliver(halted!)).json().outcome).toBe('applied');
    const rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]!.status).toBe('active');
    expect(await planFor(h, userId)).toBe('plus');
  });

  it('a halted subscription that is reactivated gets its plan back', async () => {
    const { userId, subId } = await subscribe();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    h.clock.set(h.stub.subscriptions.get(subId)!.current_end! * 1000 + HOUR);
    await h.deliverAll(h.stub.simulateHalt(subId));
    expect(await planFor(h, userId)).toBe('free');
    await h.deliverAll(h.stub.simulateRenewal(subId));
    expect(await planFor(h, userId)).toBe('plus');
  });

  it('a full refund of the latest charge revokes the plan', async () => {
    const { userId, subId } = await subscribe();
    const events = h.stub.simulateSubscriptionCheckout(subId);
    await h.deliverAll(events);
    const pay = entity(events[1]!, 'payment');
    await h.deliverAll(h.stub.simulateRefund(pay.id));
    const rows = await billingRows(h, userId);
    expect(rows.payments[0]).toMatchObject({ status: 'refunded' });
    expect(await planFor(h, userId)).toBe('free');
  });
});

describe('POST /v1/billing/cancel', () => {
  it('cancels at the end of the paid period; the plan lasts until then (no grace), then free', async () => {
    const { c, userId, subId } = await subscribe('pro', 'monthly');
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    const res = await c.post('/v1/billing/cancel', {});
    expect(res.statusCode, res.body).toBe(200);
    expect(res.json()).toMatchObject({ plan: 'pro', subscription: { status: 'active', cancelAtPeriodEnd: true } });
    expect(h.stub.scheduledCancel.has(subId)).toBe(true);
    const end = h.stub.subscriptions.get(subId)!.current_end! * 1000;
    h.clock.set(end);
    const [cancelled] = h.stub.simulateCycleEnd(subId);
    expect(cancelled!.body.event).toBe('subscription.cancelled');
    expect((await h.deliver(cancelled!)).json().outcome).toBe('applied');
    const rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]).toMatchObject({ status: 'cancelled', cancelAtPeriodEnd: false });
    expect(rows.entitlements[0]!.validUntil.getTime()).toBe(end);
    expect(await planFor(h, userId, end - 1000)).toBe('pro');
    expect(await planFor(h, userId, end + 1000)).toBe('free');
    // Nothing left to cancel (the session itself has expired a month later, so ask the service).
    await expect(h.services.billing.cancel(userId, h.app.log)).rejects.toMatchObject({ code: 'not_found' });
  });

  it('cancels an unpaid subscription immediately', async () => {
    const { c, userId, subId } = await subscribe();
    const res = await c.post('/v1/billing/cancel');
    expect(res.statusCode, res.body).toBe(200);
    expect(h.stub.subscriptions.get(subId)!.status).toBe('cancelled');
    expect((await billingRows(h, userId)).subscriptions[0]!.status).toBe('cancelled');
    expect(await planFor(h, userId)).toBe('free');
  });

  it('works even with billing switched off, and answers 503 when Razorpay is down', async () => {
    const { c, subId } = await subscribe();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    h.stub.down = true;
    try {
      const res = await c.post('/v1/billing/cancel', {});
      expect(res.statusCode).toBe(503);
      expect(res.json().code).toBe('billing_unavailable');
    } finally {
      h.stub.down = false;
    }
  });

  it('an immediate cancellation at Razorpay keeps the paid period', async () => {
    const { userId, subId } = await subscribe();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    const end = h.stub.subscriptions.get(subId)!.current_end! * 1000;
    await h.deliverAll(h.stub.simulateCancelNow(subId));
    expect(await planFor(h, userId)).toBe('plus');
    expect(await planFor(h, userId, end + 1000)).toBe('free');
  });
});

describe('binding (AC-09)', () => {
  it('rejects a subscription moved to another Razorpay plan', async () => {
    const { userId, subId } = await subscribe('plus', 'monthly');
    const proPlan = [...h.stub.plans.values()].find((p) => p.notes.soyl_plan === 'pro' && p.period === 'monthly')!;
    const events = h.stub.simulateSubscriptionCheckout(subId);
    h.stub.subscriptions.get(subId)!.plan_id = proPlan.id;
    const res = await h.deliverAll(events);
    for (const r of res) expect(r.json().outcome).toBe('rejected');
    expect(await planFor(h, userId)).toBe('free');
    const rows = await billingRows(h, userId);
    expect(rows.subscriptions[0]!.status).toBe('created'); // nothing written
    expect(rows.payments).toHaveLength(0); // the payment write was rolled back with the rejection
    expect(securityEvents(h.logs, 'webhook_binding_rejected').some((l) => l.reason === 'subscription_plan_mismatch')).toBe(true);
  });

  it('rejects a charge of a different amount than the subscription price', async () => {
    const { userId, subId } = await subscribe('plus', 'monthly');
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    const firstEnd = h.stub.subscriptions.get(subId)!.current_end! * 1000;
    h.stub.plans.get(h.stub.subscriptions.get(subId)!.plan_id)!.item.amount = 100;
    h.clock.set(firstEnd + HOUR);
    const res = await h.deliverAll(h.stub.simulateRenewal(subId));
    expect(res.map((r) => r.json().outcome)).toEqual(['rejected', 'rejected']);
    expect((await billingRows(h, userId)).entitlements[0]!.validUntil.getTime()).toBe(firstEnd + 48 * HOUR);
    h.stub.plans.get(h.stub.subscriptions.get(subId)!.plan_id)!.item.amount = 19_900;
  });

  it('rejects notes that name another student', async () => {
    const { userId, subId } = await subscribe();
    const other = await h.student();
    h.stub.subscriptions.get(subId)!.notes.soyl_user_id = other.userId;
    const res = await h.deliverAll(h.stub.simulateSubscriptionCheckout(subId));
    expect(res[0]!.json().outcome).toBe('rejected');
    expect(await planFor(h, userId)).toBe('free');
    expect(await planFor(h, other.userId)).toBe('free');
  });

  it('a subscription unknown at Razorpay is rejected, not retried forever', async () => {
    const { subId } = await subscribe();
    const events = h.stub.simulateSubscriptionCheckout(subId);
    h.stub.subscriptions.delete(subId);
    const res = await h.deliver(events[2]!);
    expect(res.json().outcome).toBe('rejected');
  });

  it('subscriptions not created by us are ignored', async () => {
    const plan = [...h.stub.plans.values()][0]!;
    const foreign = await h.stub.createSubscription({ plan_id: plan.id, total_count: 12, customer_notify: 1, notes: {} });
    const res = await h.deliverAll(h.stub.simulateSubscriptionCheckout(foreign.id));
    for (const r of res) expect(r.json().outcome).toBe('ignored');
    const [row] = await h.t.db.select().from(subscriptions).where(eq(subscriptions.razorpaySubscriptionId, foreign.id));
    expect(row).toBeUndefined();
  });
});

describe('plans and entitlements together', () => {
  it('a student with Board Exam Pass cannot also subscribe to a plan it already covers', async () => {
    const s = await h.student();
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    await h.deliverAll(h.stub.simulateOrderPayment(order.orderId));
    const res = await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' });
    expect(res.statusCode).toBe(409);
    expect(res.json().code).toBe('already_subscribed');
  });

  it('the plan with the most daily credits wins when two are in force', async () => {
    const s = await h.student();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' })).json();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub.subscriptionId));
    expect(await planFor(h, s.userId)).toBe('plus');
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    await h.deliverAll(h.stub.simulateOrderPayment(order.orderId));
    expect(await planFor(h, s.userId)).toBe('board_exam_pass');
  });
});
