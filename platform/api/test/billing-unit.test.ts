/**
 * Billing units without a database: configuration rules (GEN-1/GEN-3, live keys only in prod), the
 * webhook signature (constant-time, rotation, malformed input), the real Razorpay HTTP client against a
 * fake fetch (auth, paths, pagination, error mapping, id validation), the stub's state machines and
 * the sync result merge.
 */
import { describe, expect, it } from 'vitest';
import { BILLING_DEV_DEFAULTS, loadBillingConfig } from '../src/billing/config';
import { loadConfig, ConfigError } from '../src/config';
import {
  createRazorpayClient,
  RazorpayApiError,
  RazorpayHttpClient,
  RazorpayNotFoundError,
  RazorpayStub,
  RzpNotes,
  signWebhook,
  verifyWebhookSignature,
  webhookSignature,
} from '../src/billing/razorpay';
import { mergeResults, type SyncResult } from '../src/billing/sync';
import { dispatchTarget } from '../src/billing/webhooks';

const local = { appEnv: 'local', isLocal: true, isProduction: false };
const stg = { appEnv: 'stg', isLocal: false, isProduction: false };
const prod = { appEnv: 'prod', isLocal: false, isProduction: true };
const realKeys = { RAZORPAY_PROVIDER: 'razorpay', RAZORPAY_KEY_ID: 'rzp_test_AbCdEf123456', RAZORPAY_KEY_SECRET: 's'.repeat(24), RAZORPAY_WEBHOOK_SECRET: 'w'.repeat(24) };

describe('billing config', () => {
  it('defaults: stub with development secrets locally, disabled elsewhere, billing off', () => {
    const l = loadBillingConfig({}, local);
    expect(l.problems).toEqual([]);
    expect(l.config).toMatchObject({ enabled: false, provider: 'stub', keyId: BILLING_DEV_DEFAULTS.keyId, webhookSecrets: [BILLING_DEV_DEFAULTS.webhookSecret] });
    expect(loadBillingConfig({}, stg).config).toMatchObject({ provider: 'disabled', keyId: null, webhookSecrets: [] });
    expect(loadBillingConfig({}, prod).problems).toEqual([]);
  });

  it('real keys: all three required; live keys only in prod; current + previous webhook secret', () => {
    const ok = loadBillingConfig({ ...realKeys, RAZORPAY_WEBHOOK_SECRET_PREVIOUS: 'p'.repeat(24), BILLING_ENABLED: 'true' }, stg);
    expect(ok.problems).toEqual([]);
    expect(ok.config).toMatchObject({ enabled: true, provider: 'razorpay', webhookSecrets: ['w'.repeat(24), 'p'.repeat(24)], apiBaseUrl: 'https://api.razorpay.com/v1' });
    expect(loadBillingConfig({ RAZORPAY_PROVIDER: 'razorpay' }, stg).problems).toEqual([
      'RAZORPAY_KEY_ID is required for RAZORPAY_PROVIDER=razorpay',
      'RAZORPAY_KEY_SECRET is required for RAZORPAY_PROVIDER=razorpay',
      'RAZORPAY_WEBHOOK_SECRET is required for RAZORPAY_PROVIDER=razorpay',
    ]);
    expect(loadBillingConfig({ ...realKeys, RAZORPAY_KEY_ID: 'rzp_live_AbCdEf123456' }, stg).problems).toContain('live Razorpay keys are only allowed with APP_ENV=prod (ARCHITECTURE §11.2)');
    expect(loadBillingConfig({ ...realKeys, RAZORPAY_KEY_ID: 'rzp_live_AbCdEf123456' }, prod).problems).toEqual([]);
    expect(loadBillingConfig({ ...realKeys, RAZORPAY_KEY_ID: 'pk_live_x' }, stg).problems).toContain('RAZORPAY_KEY_ID must look like rzp_test_… or rzp_live_…');
    expect(loadBillingConfig({ ...realKeys, RAZORPAY_KEY_SECRET: 'short' }, stg).problems).toContain('RAZORPAY_KEY_SECRET looks too short');
    expect(loadBillingConfig({ ...realKeys, RAZORPAY_WEBHOOK_SECRET: 'short' }, stg).problems).toContain('each Razorpay webhook secret must be at least 16 characters');
    expect(loadBillingConfig({ ...realKeys, RAZORPAY_API_BASE_URL: 'http://localhost:9' }, stg).problems).toContain('RAZORPAY_API_BASE_URL must be https outside local/test');
  });

  it('GEN-3/GEN-1: no stub and no development secrets in production; billing needs a provider', () => {
    expect(loadBillingConfig({ RAZORPAY_PROVIDER: 'stub', RAZORPAY_WEBHOOK_SECRET: 'w'.repeat(24) }, prod).problems).toContain('RAZORPAY_PROVIDER=stub cannot run with APP_ENV=prod (GEN-3)');
    expect(loadBillingConfig({ RAZORPAY_PROVIDER: 'stub' }, stg).problems).toContain('RAZORPAY_WEBHOOK_SECRET is required for the stub when APP_ENV=stg');
    expect(loadBillingConfig({ ...realKeys, RAZORPAY_WEBHOOK_SECRET: BILLING_DEV_DEFAULTS.webhookSecret }, stg).problems).toContain('RAZORPAY_WEBHOOK_SECRET uses the public development default; set a real secret');
    expect(loadBillingConfig({ BILLING_ENABLED: 'true' }, prod).problems).toContain('BILLING_ENABLED=true needs RAZORPAY_PROVIDER=razorpay (or stub outside prod)');
    expect(loadBillingConfig({ RAZORPAY_PROVIDER: 'paypal' }, local).problems).toContain('RAZORPAY_PROVIDER must be one of stub, razorpay, disabled');
  });

  it('is part of the API config: the server refuses to start on a billing problem', () => {
    expect(loadConfig({ APP_ENV: 'test' }).billing.provider).toBe('stub');
    expect(() => loadConfig({ APP_ENV: 'test', BILLING_ENABLED: 'true', RAZORPAY_PROVIDER: 'disabled' })).toThrow(ConfigError);
  });

  it('builds the right client', () => {
    expect(createRazorpayClient(loadBillingConfig({}, stg).config)).toBeNull();
    expect(createRazorpayClient(loadBillingConfig({}, local).config)).toBeInstanceOf(RazorpayStub);
    expect(createRazorpayClient(loadBillingConfig(realKeys, stg).config)).toBeInstanceOf(RazorpayHttpClient);
  });
});

describe('webhook signature', () => {
  const body = Buffer.from('{"entity":"event","event":"payment.captured"}');
  it('matches Razorpay: hex HMAC-SHA256 of the raw body with the webhook secret', () => {
    // Standard vector: HMAC-SHA256(key="key", "abc") (same as openssl dgst -sha256 -hmac key).
    expect(webhookSignature('abc', 'key')).toBe('9c196e32dc0175f86f4b1cb89289d6619de6bee699e4c378e68309ed97a1a6ab');
    const sig = webhookSignature(body, 'secret123secret123');
    expect(verifyWebhookSignature(body, sig, ['secret123secret123'])).toBe(0);
    expect(verifyWebhookSignature(body, sig.toUpperCase(), ['secret123secret123'])).toBe(0);
  });

  it('accepts the previous secret during rotation and reports which one matched', () => {
    const sig = webhookSignature(body, 'old-secret-old-secret');
    expect(verifyWebhookSignature(body, sig, ['new-secret-new-secret', 'old-secret-old-secret'])).toBe(1);
  });

  it.each([undefined, null, 42, '', 'zz', 'a'.repeat(63), 'a'.repeat(65), ['a'.repeat(64)]])('rejects %j without throwing', (header) => {
    expect(verifyWebhookSignature(body, header, ['secret123secret123'])).toBeNull();
  });

  it('the simulator produces exactly what the verifier accepts', () => {
    const stub = new RazorpayStub('rzp_test_UnitStub00001');
    const ev = stub.event('order.paid', { order: { id: 'order_X' } });
    const signed = signWebhook(ev, 'secret123secret123');
    expect(verifyWebhookSignature(Buffer.from(signed.rawBody), signed.headers['x-razorpay-signature'], ['secret123secret123'])).toBe(0);
    expect(signed.headers['x-razorpay-event-id']).toBe(ev.eventId);
  });
});

describe('RazorpayHttpClient', () => {
  function fakeFetch(handler: (url: string, init: RequestInit) => { status?: number; body?: unknown; throws?: Error }) {
    const calls: { url: string; init: RequestInit }[] = [];
    const f = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      const r = handler(url, init);
      if (r.throws) throw r.throws;
      return new Response(r.body === undefined ? '' : typeof r.body === 'string' ? r.body : JSON.stringify(r.body), { status: r.status ?? 200 });
    }) as unknown as typeof fetch;
    return { f, calls };
  }
  const plan = (id: string) => ({ id, entity: 'plan', interval: 1, period: 'monthly', item: { name: 'x', amount: 19_900, currency: 'INR' }, notes: [], created_at: 1 });
  const order = { id: 'order_AbCdEf123456', entity: 'order', amount: 49_900, amount_paid: 0, amount_due: 49_900, currency: 'INR', receipt: 'r', status: 'created', attempts: 0, notes: { app: 'soyl-academy' }, created_at: 1 };

  it('authenticates with Basic key:secret and sends JSON', async () => {
    const { f, calls } = fakeFetch(() => ({ body: order }));
    const c = new RazorpayHttpClient({ keyId: 'rzp_test_AbCdEf123456', keySecret: 'secret-secret-secret', baseUrl: 'https://api.razorpay.test/v1', fetch: f });
    const o = await c.createOrder({ amount: 49_900, currency: 'INR', receipt: 'r', notes: {} });
    expect(o.id).toBe('order_AbCdEf123456');
    expect(calls[0]!.url).toBe('https://api.razorpay.test/v1/orders');
    expect(calls[0]!.init.method).toBe('POST');
    expect((calls[0]!.init.headers as Record<string, string>).authorization).toBe(`Basic ${Buffer.from('rzp_test_AbCdEf123456:secret-secret-secret').toString('base64')}`);
    expect(JSON.parse(String(calls[0]!.init.body))).toEqual({ amount: 49_900, currency: 'INR', receipt: 'r', notes: {} });
  });

  it('hits the documented paths for every call and normalises empty notes', async () => {
    const sub = { id: 'sub_AbCdEf123456', entity: 'subscription', plan_id: 'plan_AbCdEf123456', status: 'active', current_start: 1, current_end: 2, paid_count: 1, notes: [], created_at: 1 };
    const pay = { id: 'pay_AbCdEf123456', entity: 'payment', amount: 100, currency: 'INR', status: 'captured', order_id: null, invoice_id: 'inv_AbCdEf123456', notes: [], created_at: 1 };
    const inv = { id: 'inv_AbCdEf123456', entity: 'invoice', subscription_id: 'sub_AbCdEf123456', status: 'paid' };
    const { f, calls } = fakeFetch((url) => {
      if (url.includes('/subscriptions')) return { body: sub };
      if (url.includes('/payments/')) return { body: pay };
      if (url.includes('/invoices/')) return { body: inv };
      if (url.endsWith('/payments')) return { body: { entity: 'collection', count: 1, items: [pay] } };
      if (url.includes('/orders/')) return { body: order };
      return { body: plan('plan_AbCdEf123456') };
    });
    const c = new RazorpayHttpClient({ keyId: 'rzp_test_AbCdEf123456', keySecret: 'x'.repeat(20), baseUrl: 'https://api', fetch: f });
    expect((await c.fetchSubscription('sub_AbCdEf123456')).notes).toEqual({});
    await c.cancelSubscription('sub_AbCdEf123456', { atCycleEnd: true });
    await c.createSubscription({ plan_id: 'plan_AbCdEf123456', total_count: 12, customer_notify: 0, notes: {} });
    await c.fetchPayment('pay_AbCdEf123456');
    await c.fetchInvoice('inv_AbCdEf123456');
    await c.fetchOrder('order_AbCdEf123456');
    await c.fetchOrderPayments('order_AbCdEf123456');
    await c.createPlan({ period: 'monthly', interval: 1, item: { name: 'x', amount: 19_900, currency: 'INR' }, notes: {} });
    expect(calls.map((x) => `${x.init.method} ${x.url}`)).toEqual([
      'GET https://api/subscriptions/sub_AbCdEf123456',
      'POST https://api/subscriptions/sub_AbCdEf123456/cancel',
      'POST https://api/subscriptions',
      'GET https://api/payments/pay_AbCdEf123456',
      'GET https://api/invoices/inv_AbCdEf123456',
      'GET https://api/orders/order_AbCdEf123456',
      'GET https://api/orders/order_AbCdEf123456/payments',
      'POST https://api/plans',
    ]);
    expect(JSON.parse(String(calls[1]!.init.body))).toEqual({ cancel_at_cycle_end: 1 });
  });

  it('pages through plans 100 at a time', async () => {
    const { f, calls } = fakeFetch((url) => {
      const skip = Number(new URL(url).searchParams.get('skip'));
      const n = skip === 0 ? 100 : 3;
      return { body: { entity: 'collection', count: n, items: Array.from({ length: n }, (_, i) => plan(`plan_P${String(skip + i).padStart(8, '0')}`)) } };
    });
    const c = new RazorpayHttpClient({ keyId: 'rzp_test_AbCdEf123456', keySecret: 'x'.repeat(20), baseUrl: 'https://api', fetch: f });
    expect(await c.listPlans()).toHaveLength(103);
    expect(calls.map((x) => new URL(x.url).search)).toEqual(['?count=100&skip=0', '?count=100&skip=100']);
  });

  it('maps errors: not found, retryable 5xx/429/network, bad shapes; refuses malformed ids before any request', async () => {
    const mk = (r: Parameters<typeof fakeFetch>[0]) => {
      const { f, calls } = fakeFetch(r);
      return { c: new RazorpayHttpClient({ keyId: 'rzp_test_AbCdEf123456', keySecret: 'x'.repeat(20), baseUrl: 'https://api', fetch: f }), calls };
    };
    await expect(mk(() => ({ status: 400, body: { error: { code: 'BAD_REQUEST_ERROR', description: 'The id provided does not exist' } } })).c.fetchOrder('order_AbCdEf123456')).rejects.toBeInstanceOf(RazorpayNotFoundError);
    await expect(mk(() => ({ status: 404, body: '' })).c.fetchPayment('pay_AbCdEf123456')).rejects.toBeInstanceOf(RazorpayNotFoundError);
    const e500 = await mk(() => ({ status: 502, body: 'gateway' })).c.fetchOrder('order_AbCdEf123456').catch((e) => e);
    expect(e500).toMatchObject({ status: 502, retryable: true });
    const e429 = await mk(() => ({ status: 429, body: { error: { code: 'TOO_MANY' } } })).c.fetchOrder('order_AbCdEf123456').catch((e) => e);
    expect(e429).toMatchObject({ status: 429, code: 'TOO_MANY', retryable: true });
    const e401 = await mk(() => ({ status: 401, body: { error: { code: 'BAD_REQUEST_ERROR', description: 'Authentication failed' } } })).c.fetchOrder('order_AbCdEf123456').catch((e) => e);
    expect(e401).toMatchObject({ status: 401, retryable: false });
    expect(e401.message).not.toContain('Authentication failed');
    const net = await mk(() => ({ throws: new TypeError('fetch failed') })).c.fetchOrder('order_AbCdEf123456').catch((e) => e);
    expect(net).toBeInstanceOf(RazorpayApiError);
    expect(net).toMatchObject({ status: 0, retryable: true });
    const shape = await mk(() => ({ body: { id: 1 } })).c.fetchOrder('order_AbCdEf123456').catch((e) => e);
    expect(shape).toMatchObject({ code: 'BAD_SHAPE' });
    const bad = mk(() => ({ body: order }));
    await expect(bad.c.fetchOrder('../plans')).rejects.toBeInstanceOf(RazorpayNotFoundError);
    expect(bad.calls).toHaveLength(0);
  });
});

describe('RazorpayStub', () => {
  it('validates like Razorpay', async () => {
    const stub = new RazorpayStub('rzp_test_UnitStub00002');
    await expect(stub.fetchOrder('order_missing')).rejects.toBeInstanceOf(RazorpayNotFoundError);
    await expect(stub.createSubscription({ plan_id: 'plan_missing', total_count: 1, customer_notify: 0, notes: {} })).rejects.toBeInstanceOf(RazorpayNotFoundError);
    await expect(stub.createPlan({ period: 'monthly', interval: 1, item: { name: 'x', amount: 50, currency: 'INR' }, notes: {} })).rejects.toMatchObject({ code: 'BAD_REQUEST_ERROR' });
    await expect(stub.createOrder({ amount: 100, currency: 'INR', receipt: 'x'.repeat(41), notes: {} })).rejects.toMatchObject({ status: 400 });
    const plan = await stub.createPlan({ period: 'yearly', interval: 1, item: { name: 'y', amount: 149_900, currency: 'INR' }, notes: {} });
    const sub = await stub.createSubscription({ plan_id: plan.id, total_count: 1, customer_notify: 0, notes: {} });
    expect(() => stub.simulateRenewal('sub_missing')).toThrow(RazorpayNotFoundError);
    stub.simulateSubscriptionCheckout(sub.id);
    expect(() => stub.simulateSubscriptionCheckout(sub.id)).toThrow(/not created/);
    const s = await stub.fetchSubscription(sub.id);
    expect(new Date(s.current_end! * 1000).getUTCFullYear() - new Date(s.current_start! * 1000).getUTCFullYear()).toBe(1);
    expect(s.remaining_count).toBe(0);
    // Last cycle of a fixed-count subscription completes.
    expect(stub.simulateCycleEnd(sub.id)[0]!.body.event).toBe('subscription.completed');
    await expect(stub.cancelSubscription(sub.id, { atCycleEnd: false })).rejects.toMatchObject({ status: 400 });
    stub.down = true;
    await expect(stub.listPlans()).rejects.toMatchObject({ status: 503, retryable: true });
  });

  it('a cycle end without a scheduled cancel is a renewal', async () => {
    const stub = new RazorpayStub('rzp_test_UnitStub00003');
    const plan = await stub.createPlan({ period: 'monthly', interval: 1, item: { name: 'm', amount: 19_900, currency: 'INR' }, notes: {} });
    const sub = await stub.createSubscription({ plan_id: plan.id, total_count: 12, customer_notify: 0, notes: {} });
    stub.simulateSubscriptionCheckout(sub.id);
    expect(stub.simulateCycleEnd(sub.id).map((e) => e.body.event)).toEqual(['payment.captured', 'subscription.charged']);
    expect((await stub.fetchSubscription(sub.id)).paid_count).toBe(2);
  });
});

describe('helpers', () => {
  it('RzpNotes turns Razorpay’s empty [] into {} and stringifies values', () => {
    expect(RzpNotes.parse([])).toEqual({});
    expect(RzpNotes.parse(undefined)).toEqual({});
    expect(RzpNotes.parse({ a: 1, b: 'x', c: null })).toEqual({ a: '1', b: 'x' });
  });

  it('mergeResults: rejected beats applied beats ignored; no grant when anything was rejected', () => {
    const base: SyncResult = { outcome: 'ignored', reason: 'not_ours', entityId: 'pay_1', userId: null, changes: [], granted: null };
    const applied: SyncResult = { ...base, outcome: 'applied', reason: null, userId: 'u', granted: { userId: 'u', plan: 'plus' }, changes: [{ entity: 'order', id: 'o', field: 'status', from: 'created', to: 'paid' }] };
    const rejected: SyncResult = { ...base, outcome: 'rejected', reason: 'x' };
    expect(mergeResults(base, applied)).toMatchObject({ outcome: 'applied', entityId: 'pay_1', userId: 'u', granted: { plan: 'plus' } });
    expect(mergeResults(applied, rejected)).toMatchObject({ outcome: 'rejected', reason: 'x', granted: null });
    expect(mergeResults(base)).toMatchObject({ outcome: 'ignored' });
  });

  it('dispatchTarget routes each event family to the entity it is about', () => {
    const ev = (event: string, payload: Record<string, unknown>) => ({ entity: 'event' as const, event, payload, created_at: 1 });
    expect(dispatchTarget(ev('subscription.charged', { subscription: { entity: { id: 'sub_1' } }, payment: { entity: { id: 'pay_1' } } }))).toEqual({ kind: 'subscription', id: 'sub_1', paymentId: 'pay_1' });
    expect(dispatchTarget(ev('payment.failed', { payment: { entity: { id: 'pay_2' } } }))).toEqual({ kind: 'payment', id: 'pay_2' });
    expect(dispatchTarget(ev('order.paid', { order: { entity: { id: 'order_1' } } }))).toEqual({ kind: 'order', id: 'order_1' });
    expect(dispatchTarget(ev('refund.processed', { refund: { entity: { id: 'rfnd_1', payment_id: 'pay_3' } } }))).toEqual({ kind: 'payment', id: 'pay_3' });
    expect(dispatchTarget(ev('invoice.paid', {}))).toBeNull();
  });
});
