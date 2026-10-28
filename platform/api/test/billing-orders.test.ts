/**
 * Billing — Board Exam Pass (Orders API) and the webhook endpoint's security (AC-09, AC-10, F-019,
 * F-020): signature checks over the raw body, exactly-once processing, concurrency, re-fetch +
 * binding, refunds, failures, outages, the 60-second entitlement target and the pass's end date.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { auditLog, creditLedger, entitlements, orders, payments, webhookEvents } from '@soyl/db';
import { signWebhook } from '../src/billing/razorpay';
import { securityEvents } from './helpers';
import { billingRows, createBillingHarness, eventRows, planFor, type BillingHarness } from './billing-fixture';

let h: BillingHarness;

beforeAll(async () => {
  h = await createBillingHarness();
});
afterAll(async () => {
  await h?.close();
});

async function buyPass() {
  const s = await h.student();
  const res = await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' });
  expect(res.statusCode, res.body).toBe(201);
  return { ...s, checkout: res.json() as { orderId: string; keyId: string; amountPaise: number; reused: boolean } };
}

describe('POST /v1/billing/orders (Board Exam Pass)', () => {
  it('creates a Razorpay order bound to the student and grants nothing yet', async () => {
    const { userId, checkout } = await buyPass();
    expect(checkout).toMatchObject({ kind: 'order', keyId: h.stub.keyId, amountPaise: 49_900, currency: 'INR', label: '₹499 one-time', plan: 'board_exam_pass', reused: false, validUntil: '2027-03-31T18:29:59.000Z' });
    const rz = h.stub.orders.get(checkout.orderId)!;
    expect(rz.amount).toBe(49_900);
    expect(rz.notes).toEqual({ app: 'soyl-academy', soyl_user_id: userId, soyl_plan: 'board_exam_pass' });
    const rows = await billingRows(h, userId);
    expect(rows.orders).toHaveLength(1);
    expect(rows.orders[0]).toMatchObject({ status: 'created', amountPaise: 49_900, receipt: rz.receipt });
    expect(rows.entitlements).toHaveLength(0);
    expect(await planFor(h, userId)).toBe('free');
  });

  it('returns the same open order on a second click instead of creating another', async () => {
    const { c, checkout } = await buyPass();
    const again = await c.post('/v1/billing/orders', { plan: 'board_exam_pass' });
    expect(again.statusCode).toBe(201);
    expect(again.json()).toMatchObject({ orderId: checkout.orderId, reused: true });
  });

  it('rejects other plans and unknown fields (API-8)', async () => {
    const { c } = await h.student();
    expect((await c.post('/v1/billing/orders', { plan: 'pro' })).statusCode).toBe(400);
    expect((await c.post('/v1/billing/orders', { plan: 'board_exam_pass', amountPaise: 1 })).statusCode).toBe(400);
  });
});

describe('payment → entitlement (webhook)', () => {
  it('grants the pass within 60 s of the captured payment, after re-fetching the order from Razorpay', async () => {
    const { userId, checkout } = await buyPass();
    const paidAt = h.clock.now();
    const events = h.stub.simulateOrderPayment(checkout.orderId);
    h.clock.advance(5_000); // webhook delivery latency
    h.stub.calls.length = 0;
    const [captured, paid] = await h.deliverAll(events);
    expect(captured!.statusCode).toBe(200);
    expect(captured!.json()).toEqual({ received: true, duplicate: false, outcome: 'applied' });
    expect(paid!.json()).toMatchObject({ outcome: 'applied' });
    expect(h.stub.calls).toContain(`fetchOrder ${checkout.orderId}`);
    expect(h.stub.calls).toContain(`fetchOrderPayments ${checkout.orderId}`);

    const rows = await billingRows(h, userId);
    expect(rows.orders[0]!.status).toBe('paid');
    expect(rows.payments).toHaveLength(1);
    expect(rows.payments[0]).toMatchObject({ status: 'captured', amountPaise: 49_900, method: 'upi' });
    expect(rows.entitlements).toHaveLength(1);
    const ent = rows.entitlements[0]!;
    expect(ent).toMatchObject({ source: 'order', revokedAt: null });
    expect(ent.validUntil.toISOString()).toBe('2027-03-31T18:29:59.000Z');
    expect(ent.createdAt.getTime() - paidAt).toBeLessThanOrEqual(60_000);
    expect(await planFor(h, userId, paidAt + 60_000)).toBe('board_exam_pass');

    const view = await (await h.student()).c.get('/v1/me/subscription');
    expect(view.json().plan).toBe('free'); // other students unaffected
  });

  it('GET /v1/me/subscription shows the pass and its end', async () => {
    const { c, checkout } = await buyPass();
    await h.deliverAll(h.stub.simulateOrderPayment(checkout.orderId));
    const res = await c.get('/v1/me/subscription');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toBe('no-store');
    expect(res.json()).toMatchObject({ plan: 'board_exam_pass', planName: 'Board Exam Pass', creditsPerDay: 150, source: 'order', validUntil: '2027-03-31T18:29:59.000Z', subscription: null, billingEnabled: true });
  });

  it('a second webhook delivery of the same event is a no-op (exactly once)', async () => {
    const { userId, checkout } = await buyPass();
    const [captured] = h.stub.simulateOrderPayment(checkout.orderId);
    const first = await h.deliver(captured!);
    const second = await h.deliver(captured!);
    expect(first.json()).toMatchObject({ duplicate: false, outcome: 'applied' });
    expect(second.statusCode).toBe(200);
    expect(second.json()).toEqual({ received: true, duplicate: true, outcome: 'applied' });
    expect(await eventRows(h, captured!.eventId)).toHaveLength(1);
    const rows = await billingRows(h, userId);
    expect(rows.payments).toHaveLength(1);
    expect(rows.entitlements).toHaveLength(1);
  });

  it('two concurrent deliveries of one event: one is processed, the other sees the duplicate', async () => {
    const { userId, checkout } = await buyPass();
    const [captured, paid] = h.stub.simulateOrderPayment(checkout.orderId);
    const res = await Promise.all([h.deliver(captured!), h.deliver(captured!), h.deliver(paid!), h.deliver(paid!)]);
    for (const r of res) expect(r.statusCode).toBe(200);
    expect(res.map((r) => r.json().duplicate).filter(Boolean)).toHaveLength(2);
    expect(await eventRows(h, captured!.eventId)).toHaveLength(1);
    expect(await eventRows(h, paid!.eventId)).toHaveLength(1);
    const rows = await billingRows(h, userId);
    expect(rows.payments).toHaveLength(1);
    expect(rows.entitlements).toHaveLength(1);
  });

  it('records the event payload, outcome, entity and processed_at in webhook_events', async () => {
    const { checkout } = await buyPass();
    const [captured] = h.stub.simulateOrderPayment(checkout.orderId);
    await h.deliver(captured!);
    const [row] = await eventRows(h, captured!.eventId);
    expect(row).toMatchObject({ provider: 'razorpay', eventType: 'payment.captured', outcome: 'applied', entityId: (captured!.body.payload.payment!.entity as { id: string }).id });
    expect(row!.processedAt).toBeInstanceOf(Date);
    expect(row!.eventCreatedAt).toBeInstanceOf(Date);
    expect(row!.payload).toEqual(captured!.body);
  });

  it('a failed payment is recorded and grants nothing', async () => {
    const { userId, checkout } = await buyPass();
    const [failed] = h.stub.simulateOrderPaymentFailure(checkout.orderId);
    expect((await h.deliver(failed!)).json()).toMatchObject({ outcome: 'applied' });
    const rows = await billingRows(h, userId);
    expect(rows.orders[0]!.status).toBe('attempted');
    expect(rows.payments[0]).toMatchObject({ status: 'failed', failureReason: 'payment_failed' });
    expect(rows.entitlements).toHaveLength(0);
    // The payer retries and succeeds.
    await h.deliverAll(h.stub.simulateOrderPayment(checkout.orderId));
    expect(await planFor(h, userId)).toBe('board_exam_pass');
    expect((await billingRows(h, userId)).payments).toHaveLength(2);
  });

  it('a full refund revokes the pass; a partial refund keeps it', async () => {
    const full = await buyPass();
    const [captured] = h.stub.simulateOrderPayment(full.checkout.orderId);
    await h.deliver(captured!);
    const payId = (captured!.body.payload.payment!.entity as { id: string }).id;
    expect(await planFor(h, full.userId)).toBe('board_exam_pass');
    const [refund] = h.stub.simulateRefund(payId);
    expect((await h.deliver(refund!)).json()).toMatchObject({ outcome: 'applied' });
    let rows = await billingRows(h, full.userId);
    expect(rows.payments[0]).toMatchObject({ status: 'refunded', refundedPaise: 49_900 });
    expect(rows.entitlements[0]!.revokedAt).not.toBeNull();
    expect(await planFor(h, full.userId)).toBe('free');

    const partial = await buyPass();
    const [cap2] = h.stub.simulateOrderPayment(partial.checkout.orderId);
    await h.deliver(cap2!);
    const [refund2] = h.stub.simulateRefund((cap2!.body.payload.payment!.entity as { id: string }).id, 10_000);
    await h.deliver(refund2!);
    rows = await billingRows(h, partial.userId);
    expect(rows.payments[0]).toMatchObject({ status: 'partially_refunded', refundedPaise: 10_000 });
    expect(await planFor(h, partial.userId)).toBe('board_exam_pass');
  });
});

describe('binding and tampering (AC-09)', () => {
  it('rejects a payment whose amount differs from the order we created', async () => {
    const { userId, checkout } = await buyPass();
    // Someone changed the order at Razorpay (or forged one with our id) to ₹1.
    h.stub.orders.get(checkout.orderId)!.amount = 100;
    const events = h.stub.simulateOrderPayment(checkout.orderId, { amount: 100 });
    const res = await h.deliverAll(events);
    for (const r of res) expect(r.json()).toMatchObject({ outcome: 'rejected' });
    expect((await billingRows(h, userId)).entitlements).toHaveLength(0);
    expect((await billingRows(h, userId)).payments).toHaveLength(0);
    const [row] = await eventRows(h, events[0]!.eventId);
    expect(row!.outcome).toBe('rejected');
    expect(securityEvents(h.logs, 'webhook_binding_rejected').some((l) => l.reason === 'order_amount_mismatch')).toBe(true);
  });

  it('rejects an order whose notes name another user (tampered notes)', async () => {
    const victim = await buyPass();
    const attacker = await h.student();
    h.stub.orders.get(victim.checkout.orderId)!.notes.soyl_user_id = attacker.userId;
    const res = await h.deliverAll(h.stub.simulateOrderPayment(victim.checkout.orderId));
    expect(res[0]!.json().outcome).toBe('rejected');
    expect(securityEvents(h.logs, 'webhook_binding_rejected').some((l) => l.reason === 'notes_soyl_user_id_mismatch')).toBe(true);
    expect(await planFor(h, victim.userId)).toBe('free');
    expect(await planFor(h, attacker.userId)).toBe('free');
  });

  it('rejects a captured payment of the wrong amount on a correct order', async () => {
    const { userId, checkout } = await buyPass();
    const res = await h.deliverAll(h.stub.simulateOrderPayment(checkout.orderId, { amount: 4_900 }));
    expect(res[0]!.json().outcome).toBe('rejected');
    expect(await planFor(h, userId)).toBe('free');
  });

  it('ignores Razorpay objects that are not ours (other products on the account)', async () => {
    const foreign = await h.stub.createOrder({ amount: 99_900, currency: 'INR', receipt: 'future-builders-1', notes: { course: 'fb' } });
    const res = await h.deliverAll(h.stub.simulateOrderPayment(foreign.id));
    for (const r of res) expect(r.json()).toMatchObject({ outcome: 'ignored' });
  });

  it('unhandled event types are recorded and ignored', async () => {
    const ev = h.stub.event('invoice.paid', { invoice: { id: 'inv_Unhandled0001' } });
    expect((await h.deliver(ev)).json()).toEqual({ received: true, duplicate: false, outcome: 'ignored' });
    expect((await eventRows(h, ev.eventId))[0]!.outcome).toBe('ignored');
  });
});

describe('webhook signature (AC-09, F-019)', () => {
  async function event() {
    const { checkout } = await buyPass();
    return h.stub.simulateOrderPayment(checkout.orderId)[0]!;
  }

  it('refuses a missing signature header', async () => {
    const ev = await event();
    const res = await h.deliver(ev, { headers: { 'x-razorpay-signature': undefined } });
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toContain('application/problem+json');
    expect(securityEvents(h.logs, 'webhook_signature_missing').length).toBeGreaterThan(0);
    expect(await eventRows(h, ev.eventId)).toHaveLength(0);
  });

  it('refuses a signature made with another secret', async () => {
    const ev = await event();
    const res = await h.deliver(ev, { secret: 'not-the-webhook-secret-0000000' });
    expect(res.statusCode).toBe(400);
    expect(securityEvents(h.logs, 'webhook_signature_invalid').length).toBeGreaterThan(0);
    expect(await eventRows(h, ev.eventId)).toHaveLength(0);
  });

  it('refuses a tampered body (signature over the original bytes)', async () => {
    const ev = await event();
    const signed = signWebhook(ev, h.webhookSecret);
    const tampered = signed.rawBody.replace('"payment.captured"', '"order.paid"');
    expect(tampered).not.toBe(signed.rawBody);
    const res = await h.client('198.51.100.8').request('POST', '/v1/webhooks/razorpay', { rawBody: tampered, headers: signed.headers, origin: null, cookies: false });
    expect(res.statusCode).toBe(400);
    // Whitespace changes are tampering too: the HMAC is over the raw bytes, not the parsed JSON.
    const reformatted = JSON.stringify(JSON.parse(signed.rawBody), null, 1);
    expect((await h.client('198.51.100.8').request('POST', '/v1/webhooks/razorpay', { rawBody: reformatted, headers: signed.headers, origin: null, cookies: false })).statusCode).toBe(400);
    expect(await eventRows(h, ev.eventId)).toHaveLength(0);
  });

  it('refuses malformed signatures, a missing event id and non-JSON bodies', async () => {
    const ev = await event();
    expect((await h.deliver(ev, { headers: { 'x-razorpay-signature': 'zz' } })).statusCode).toBe(400);
    expect((await h.deliver(ev, { headers: { 'x-razorpay-event-id': undefined } })).statusCode).toBe(400);
    expect((await h.deliver(ev, { headers: { 'x-razorpay-event-id': 'bad id with spaces' } })).statusCode).toBe(400);
    // Signed, but not a Razorpay event.
    expect((await h.deliver(ev, { rawBody: '{"hello":"world"}' })).statusCode).toBe(400);
    expect((await h.deliver(ev, { rawBody: 'not json' })).statusCode).toBe(400);
    // Only JSON is accepted (AUTH-12 content type).
    expect((await h.deliver(ev, { headers: { 'content-type': 'text/plain' } })).statusCode).toBe(415);
  });

  it('is reachable only through the edge proxy (API-2)', async () => {
    const ev = await event();
    const signed = signWebhook(ev, h.webhookSecret);
    const res = await h.client().request('POST', '/v1/webhooks/razorpay', { rawBody: signed.rawBody, headers: signed.headers, origin: null, edge: null });
    expect(res.statusCode).toBe(403);
  });

  it('needs no Origin header (HMAC instead of CSRF) and never a session', async () => {
    const ev = await event();
    const res = await h.deliver(ev);
    expect(res.statusCode).toBe(200);
  });
});

describe('Razorpay outage while processing', () => {
  it('answers 503 without recording the event, so Razorpay retries; the retry applies it', async () => {
    const { userId, checkout } = await buyPass();
    const [captured] = h.stub.simulateOrderPayment(checkout.orderId);
    h.stub.down = true;
    try {
      const res = await h.deliver(captured!);
      expect(res.statusCode).toBe(503);
      expect(res.json().code).toBe('billing_unavailable');
    } finally {
      h.stub.down = false;
    }
    expect(await eventRows(h, captured!.eventId)).toHaveLength(0);
    expect(await planFor(h, userId)).toBe('free');
    expect((await h.deliver(captured!)).json()).toMatchObject({ duplicate: false, outcome: 'applied' });
    expect(await planFor(h, userId)).toBe('board_exam_pass');
  });
});

describe('the browser is never trusted (AC-10, F-020)', () => {
  it('Checkout success data cannot be submitted, and refresh grants only what Razorpay confirms', async () => {
    const { c, userId, checkout } = await buyPass();
    // The Checkout handler's fields are rejected outright (API-8 strict body).
    const forged = await c.post('/v1/billing/refresh', { razorpay_payment_id: 'pay_Forged000000001', razorpay_order_id: checkout.orderId, razorpay_signature: 'f'.repeat(64) });
    expect(forged.statusCode).toBe(400);
    // Refresh before paying: Razorpay says the order is unpaid → still free.
    const before = await c.post('/v1/billing/refresh', {});
    expect(before.statusCode).toBe(200);
    expect(before.json().plan).toBe('free');
    expect(await planFor(h, userId)).toBe('free');
  });

  it('refresh applies a real payment even when the webhook has not arrived', async () => {
    const { c, userId, checkout } = await buyPass();
    h.stub.simulateOrderPayment(checkout.orderId); // events not delivered
    const res = await c.post('/v1/billing/refresh', {});
    expect(res.json()).toMatchObject({ plan: 'board_exam_pass', source: 'order' });
    expect(await planFor(h, userId)).toBe('board_exam_pass');
  });

  it('refresh is rate-limited per student', async () => {
    const { c } = await h.student();
    let last;
    for (let i = 0; i < 13; i++) last = await c.post('/v1/billing/refresh', {});
    expect(last!.statusCode).toBe(429);
  });
});

describe('Board Exam Pass end date (2027-03-31 23:59:59 IST)', () => {
  it('is in force until the last second and free after', async () => {
    const { userId, checkout } = await buyPass();
    await h.deliverAll(h.stub.simulateOrderPayment(checkout.orderId));
    expect(await planFor(h, userId, Date.parse('2027-03-31T23:59:59+05:30'))).toBe('board_exam_pass');
    expect(await planFor(h, userId, Date.parse('2027-03-31T18:29:59.000Z'))).toBe('board_exam_pass');
    expect(await planFor(h, userId, Date.parse('2027-04-01T00:00:00+05:30'))).toBe('free');
  });

  it('cannot be bought twice, nor after it ends', async () => {
    const { c, checkout } = await buyPass();
    await h.deliverAll(h.stub.simulateOrderPayment(checkout.orderId));
    const again = await c.post('/v1/billing/orders', { plan: 'board_exam_pass' });
    expect(again.statusCode).toBe(409);
    expect(again.json().code).toBe('already_subscribed');

    const saved = h.clock.now();
    h.clock.set(Date.parse('2027-04-01T00:00:00+05:30'));
    try {
      const late = await h.student(); // signed in after the jump (sessions expire over five months)
      const res = await late.c.post('/v1/billing/orders', { plan: 'board_exam_pass' });
      expect(res.statusCode).toBe(409);
      expect(res.json().code).toBe('plan_unavailable');
      const plans = (await late.c.get('/v1/plans')).json();
      expect(plans.plans.find((p: { id: string }) => p.id === 'board_exam_pass').purchasable).toBe(false);
    } finally {
      h.clock.set(saved);
    }
  });
});

describe('credit top-up hook (ARCHITECTURE §11.2)', () => {
  it('tells the credits service when a plan starts, after the transaction commits', async () => {
    const calls: [string, string][] = [];
    h.services.billing.setCreditHook({ applyPlanChange: async (u, p) => void calls.push([u, p]) });
    try {
      const { userId, checkout } = await buyPass();
      await h.deliverAll(h.stub.simulateOrderPayment(checkout.orderId));
      expect(calls).toEqual([[userId, 'board_exam_pass']]);
      // A failing hook never fails the payment path (the credits service also tops up lazily).
      h.services.billing.setCreditHook({ applyPlanChange: async () => Promise.reject(new Error('credits down')) });
      const other = await buyPass();
      const res = await h.deliverAll(h.stub.simulateOrderPayment(other.checkout.orderId));
      expect(res[0]!.statusCode).toBe(200);
      expect(await planFor(h, other.userId)).toBe('board_exam_pass');
    } finally {
      h.services.billing.setCreditHook(h.services.ai.credits);
    }
  });

  it('is wired to the AI gateway: credits read before the purchase are topped up to the pass at once', async () => {
    const { c, userId, checkout } = await buyPass();
    const before = (await c.get('/v1/credits')).json();
    expect(before).toMatchObject({ plan: 'free', dailyCredits: 50, grantedToday: 50 });
    await h.deliverAll(h.stub.simulateOrderPayment(checkout.orderId));
    // The top-up row exists before the student's next request (hook after commit, not the lazy path).
    const rows = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.userId, userId), eq(creditLedger.kind, 'grant')));
    expect(rows.map((r) => [r.action, r.amount]).sort()).toEqual([['daily_grant', 50], ['plan_topup', 100]]);
    expect(await h.services.ai.credits.balance(userId)).toMatchObject({ plan: 'board_exam_pass', dailyCredits: 150, grantedToday: 150 });
    expect((await c.get('/v1/credits')).json()).toMatchObject({ plan: 'board_exam_pass', dailyCredits: 150, balance: 150 });
  });
});

describe('database invariants', () => {
  it('webhook_events is append-only for the app role (DB-1)', async () => {
    const { checkout } = await buyPass();
    const [captured] = h.stub.simulateOrderPayment(checkout.orderId);
    await h.deliver(captured!);
    const client = await h.t.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('SET LOCAL ROLE soyl_app');
      await expect(client.query(`UPDATE webhook_events SET outcome = 'ignored' WHERE event_id = $1`, [captured!.eventId])).rejects.toThrow(/permission denied/);
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
    // Nothing else wrote to the audit log for a normal webhook.
    const audit = await h.t.db.select().from(auditLog).where(and(eq(auditLog.targetId, captured!.eventId)));
    expect(audit).toHaveLength(0);
    expect(await h.t.db.select().from(orders).where(eq(orders.razorpayOrderId, checkout.orderId))).toHaveLength(1);
    expect((await h.t.db.select().from(payments)).length).toBeGreaterThan(0);
    expect((await h.t.db.select().from(entitlements)).length).toBeGreaterThan(0);
    expect((await h.t.db.select().from(webhookEvents)).length).toBeGreaterThan(0);
  });
});
