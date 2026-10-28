/**
 * Billing gates: GET /v1/plans (public, GST-inclusive labels), BILLING_ENABLED=false (403
 * billing_disabled, plans and webhooks still work), consent (D-014: purchases need `granted`; with the
 * production `unavailable` consent provider nobody can buy), roles, and no provider configured.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { eq } from 'drizzle-orm';
import { orders, users } from '@soyl/db';
import { FakeClock } from '../src/clock';
import { ConsentService } from '../src/consent/service';
import { UnavailableConsentProvider } from '../src/consent/unavailable';
import { MemoryKv } from '../src/kv';
import { BillingService } from '../src/billing/service';
import { RazorpayStub } from '../src/billing/razorpay';
import { requirePlanRows, syncPlans } from '../src/billing/plans';
import { ApiProblem } from '../src/errors';
import { createHarness, securityEvents, type Harness } from './helpers';
import { createBillingHarness, email, planFor, type BillingHarness } from './billing-fixture';

describe('GET /v1/plans', () => {
  let h: BillingHarness;
  beforeAll(async () => {
    h = await createBillingHarness();
  });
  afterAll(async () => {
    await h?.close();
  });

  it('is public and lists every plan with GST-inclusive INR labels from plans.ts', async () => {
    const res = await h.client().get('/v1/plans');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toBe('public, max-age=60');
    const body = res.json();
    expect(body).toMatchObject({ billingEnabled: true, currency: 'INR', pricesIncludeGst: true });
    expect(body.plans.map((p: { id: string }) => p.id)).toEqual(['free', 'plus', 'pro', 'board_exam_pass']);
    const byId = Object.fromEntries(body.plans.map((p: { id: string }) => [p.id, p]));
    expect(byId.free).toMatchObject({ creditsPerDay: 50, prices: [], purchasable: false });
    expect(byId.plus).toMatchObject({ creditsPerDay: 100, purchasable: true, prices: [{ interval: 'monthly', amountPaise: 19_900, label: '₹199/month' }, { interval: 'yearly', amountPaise: 149_900, label: '₹1,499/year' }] });
    expect(byId.pro.prices.map((p: { label: string }) => p.label)).toEqual(['₹299/month', '₹2,499/year']);
    expect(byId.board_exam_pass).toMatchObject({ creditsPerDay: 150, validUntil: '2027-03-31T18:29:59.000Z', prices: [{ interval: 'one_time', label: '₹499 one-time' }], purchasable: true });
  });

  it('signed-in reads are not cached', async () => {
    const { c } = await h.student();
    expect((await c.get('/v1/plans')).headers['cache-control']).toBe('no-store');
  });

  it('purchases need a signed-in student', async () => {
    const guest = h.client();
    expect((await guest.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' })).statusCode).toBe(401);
    expect((await guest.post('/v1/billing/orders', { plan: 'board_exam_pass' })).statusCode).toBe(401);
    expect((await guest.get('/v1/me/subscription')).statusCode).toBe(401);
    const { c, userId } = await h.student();
    await h.t.db.update(users).set({ role: 'parent' }).where(eq(users.id, userId));
    expect((await c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).statusCode).toBe(403);
    expect((await c.get('/v1/me/subscription')).statusCode).toBe(200);
  });

  it('purchases need an allow-listed Origin (AUTH-12)', async () => {
    const { c } = await h.student();
    expect((await c.post('/v1/billing/orders', { plan: 'board_exam_pass' }, { origin: 'https://evil.example' })).statusCode).toBe(403);
  });

  it('a student with no purchases is on Free', async () => {
    const { c } = await h.student();
    expect((await c.get('/v1/me/subscription')).json()).toEqual({ plan: 'free', planName: 'Free', creditsPerDay: 50, source: 'free', validUntil: null, subscription: null, billingEnabled: true });
  });
});

describe('consent (D-014): purchases are for a parent', () => {
  let h: BillingHarness;
  beforeAll(async () => {
    h = await createBillingHarness();
  });
  afterAll(async () => {
    await h?.close();
  });

  it.each(['pending', 'required'] as const)('consent %s → 403 consent_required, nothing created at Razorpay', async (state) => {
    const { c, userId } = await h.student({ consent: state });
    const before = h.stub.orders.size + h.stub.subscriptions.size;
    for (const [url, body] of [['/v1/billing/orders', { plan: 'board_exam_pass' }], ['/v1/billing/subscriptions', { plan: 'pro', interval: 'yearly' }]] as const) {
      const res = await c.post(url, body);
      expect(res.statusCode).toBe(403);
      expect(res.json()).toMatchObject({ code: 'consent_required', detail: 'A parent or guardian needs to give consent before a purchase.' });
    }
    expect(h.stub.orders.size + h.stub.subscriptions.size).toBe(before);
    expect(securityEvents(h.logs, 'consent_denied').some((l) => l.userId === userId && l.feature === 'purchases')).toBe(true);
    // Viewing and plans still work.
    expect((await c.get('/v1/me/subscription')).statusCode).toBe(200);
    expect((await c.get('/v1/plans')).statusCode).toBe(200);
  });

  it('consent provider outage → 503 consent_unavailable (API-16 fail closed)', async () => {
    const { c, userId } = await h.student();
    h.consent.setStatus(userId, 'granted');
    // Make the cache stale, then take the provider down.
    h.clock.advance(16 * 60_000);
    h.consent.failing = true;
    try {
      const res = await c.post('/v1/billing/orders', { plan: 'board_exam_pass' });
      expect(res.statusCode).toBe(503);
      expect(res.json().code).toBe('consent_unavailable');
    } finally {
      h.consent.failing = false;
    }
  });

  it('with CONSENT_PROVIDER=unavailable (production today) nobody can buy', async () => {
    const t: TestDb = await createTestDb();
    try {
      const clock = new FakeClock();
      const stub = new RazorpayStub('rzp_test_UnavailableCon', () => clock.now());
      await syncPlans(t.db, stub);
      const consent = new ConsentService(t.db, new UnavailableConsentProvider(), clock);
      const billing = new BillingService({ db: t.db, clock, kv: new MemoryKv(), consent, razorpay: stub, config: { enabled: true, provider: 'stub', keyId: stub.keyId, keySecret: 'x'.repeat(20), webhookSecrets: ['y'.repeat(20)], apiBaseUrl: 'https://api.razorpay.com/v1' } });
      const [u] = await t.db.insert(users).values({ name: 'Learner', email: email('unavail') }).returning();
      const log = { warn: () => {}, info: () => {}, error: () => {} } as never;
      await expect(billing.createOrder(u!.id, { plan: 'board_exam_pass' }, log)).rejects.toMatchObject({ code: 'consent_required' });
      await expect(billing.createSubscription(u!.id, { plan: 'plus', interval: 'monthly' }, log)).rejects.toBeInstanceOf(ApiProblem);
      expect(stub.orders.size + stub.subscriptions.size).toBe(0);
    } finally {
      await t.close();
    }
  });
});

describe('BILLING_ENABLED=false (production default, D-003)', () => {
  let h: BillingHarness;
  beforeAll(async () => {
    h = await createBillingHarness({ env: { BILLING_ENABLED: 'false' } });
  });
  afterAll(async () => {
    await h?.close();
  });

  it('purchase endpoints answer a friendly 403 billing_disabled; plans still list', async () => {
    const { c } = await h.student();
    for (const [url, body] of [['/v1/billing/orders', { plan: 'board_exam_pass' }], ['/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' }]] as const) {
      const res = await c.post(url, body);
      expect(res.statusCode).toBe(403);
      expect(res.json()).toMatchObject({ code: 'billing_disabled', title: 'Plans cannot be bought yet. Lessons, practice and tests are free for everyone.' });
    }
    const plans = (await h.client().get('/v1/plans')).json();
    expect(plans.billingEnabled).toBe(false);
    expect(plans.plans.every((p: { purchasable: boolean }) => !p.purchasable)).toBe(true);
    expect((await c.get('/v1/me/subscription')).json()).toMatchObject({ plan: 'free', billingEnabled: false });
  });

  it('existing purchases keep working: webhooks still apply (kill switch stops new purchases only)', async () => {
    const { userId } = await h.student();
    // An order created while billing was on.
    const rows = await requirePlanRows(h.t.db);
    const rz = await h.stub.createOrder({ amount: 49_900, currency: 'INR', receipt: 'bep_killswitch_1', notes: { app: 'soyl-academy', soyl_user_id: userId, soyl_plan: 'board_exam_pass' } });
    await h.t.db.insert(orders).values({ userId, planId: rows.get('board_exam_pass')!.id, razorpayOrderId: rz.id, receipt: 'bep_killswitch_1', amountPaise: 49_900 });
    const res = await h.deliverAll(h.stub.simulateOrderPayment(rz.id));
    expect(res[0]!.json().outcome).toBe('applied');
    expect(await planFor(h, userId)).toBe('board_exam_pass');
  });
});

describe('no billing provider configured (RAZORPAY_PROVIDER=disabled)', () => {
  let h: Harness;
  beforeAll(async () => {
    h = await createHarness({ consentDefault: 'granted', env: { RAZORPAY_PROVIDER: 'disabled' } });
  });
  afterAll(async () => {
    await h?.close();
  });

  it('plans list, purchases are disabled, the webhook route is 404, cancel/refresh degrade gracefully', async () => {
    const c = h.client();
    await c.signInEmail(email('noprov'));
    expect((await c.get('/v1/plans')).json().billingEnabled).toBe(false);
    expect((await c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json().code).toBe('billing_disabled');
    expect((await c.post('/v1/billing/cancel', {})).statusCode).toBe(503);
    expect((await c.post('/v1/billing/refresh', {})).json()).toMatchObject({ plan: 'free' });
    const hook = await h.client().request('POST', '/v1/webhooks/razorpay', { rawBody: '{}', headers: { 'x-razorpay-signature': 'a'.repeat(64), 'x-razorpay-event-id': 'evt_abcdef' }, origin: null });
    expect(hook.statusCode).toBe(404);
  });
});

describe('purchase with plans not yet synced to Razorpay', () => {
  it('answers 503 billing_unavailable for subscriptions and logs the operator action', async () => {
    const h = await createHarness({ consentDefault: 'granted', env: { BILLING_ENABLED: 'true', RAZORPAY_PROVIDER: 'stub' } });
    try {
      const c = h.client();
      await c.signInEmail(email('nosync'));
      const res = await c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' });
      expect(res.statusCode).toBe(503);
      expect(res.json().code).toBe('billing_unavailable');
      expect(h.logs.some((l) => l.event === 'plans_not_synced')).toBe(true);
      // Orders need no Razorpay plan.
      expect((await c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).statusCode).toBe(201);
      // Razorpay down when creating → 503, nothing stored.
      (h.services.billing.razorpay as RazorpayStub).down = true;
      const c2 = h.client();
      await c2.signInEmail(email('nosync2'));
      expect((await c2.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json().code).toBe('billing_unavailable');
    } finally {
      await h.close();
    }
  });
});
