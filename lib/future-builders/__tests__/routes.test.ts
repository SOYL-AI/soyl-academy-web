import { createHmac } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST as createOrder } from '@/app/api/razorpay/route';
import { POST as verify } from '@/app/api/razorpay/verify/route';
import { POST as webhook } from '@/app/api/razorpay/webhook/route';
import { POST as enroll } from '@/app/api/enroll/route';

// Generated per run so no secret-shaped literal lives in git (gitleaks).
const WEBHOOK_SECRET = `wh-${crypto.randomUUID()}`;
const KEY_SECRET = `ks-${crypto.randomUUID()}`;

const post = (url: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`http://localhost${url}`, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });

const REGISTRANT = { parentName: 'Priya Sharma', studentName: 'Arjun', email: 'priya@example.com', phone: '98765 43210', grade: '9' };

beforeEach(() => {
  // A clean slate: no keys, no ingest, no preview date (each test opts in).
  for (const name of ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_WEBHOOK_SECRET', 'PLATFORM_API_ORIGIN', 'PLATFORM_EDGE_SECRET', 'FB_INGEST_KEY', 'COHORT_PREVIEW_DATE', 'VERCEL_ENV']) {
    vi.stubEnv(name, '');
  }
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => vi.unstubAllEnvs());

describe('POST /api/razorpay (order)', () => {
  it('prices a mock order server-side in development: Diwali ₹3,299, FRIEND500 ₹2,799', async () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', '2026-11-10');
    const plain = await (await createOrder(post('/api/razorpay', REGISTRANT))).json();
    expect(plain).toMatchObject({ amount: 329900, currency: 'INR', offer: 'diwali-2026', mock: true, coupon: null });
    const friend = await (await createOrder(post('/api/razorpay', { ...REGISTRANT, coupon: 'FRIEND500', friendName: 'Asha' }))).json();
    expect(friend).toMatchObject({ amount: 279900, coupon: 'FRIEND500' });
    // An amount from the browser is ignored.
    const tampered = await (await createOrder(post('/api/razorpay', { ...REGISTRANT, amount: 100 }))).json();
    expect(tampered.amount).toBe(329900);
  });
  it('charges ₹9,999 after the Diwali offer', async () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', '2026-11-16T00:00:00+05:30');
    expect(await (await createOrder(post('/api/razorpay', REGISTRANT))).json()).toMatchObject({ amount: 999900, offer: 'standard' });
  });
  it('refuses payment once registration has closed (409)', async () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', '2027-04-02');
    expect((await createOrder(post('/api/razorpay', REGISTRANT))).status).toBe(409);
  });
  it('validates the registrant (400)', async () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', '2026-11-10');
    expect((await createOrder(post('/api/razorpay', { ...REGISTRANT, phone: '123' }))).status).toBe(400);
    expect((await createOrder(post('/api/razorpay', 'not json'))).status).toBe(400);
  });
  it('never mocks in production: 503 without keys', async () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', '2026-11-10');
    vi.stubEnv('VERCEL_ENV', 'production');
    const res = await createOrder(post('/api/razorpay', REGISTRANT));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toMatch(/temporarily unavailable/);
  });
});

describe('POST /api/razorpay/verify', () => {
  const body = { razorpay_order_id: 'order_1', razorpay_payment_id: 'pay_1', razorpay_signature: 'a'.repeat(64) };
  it('400 on an incomplete body', async () => {
    expect((await verify(post('/api/razorpay/verify', { razorpay_order_id: 'order_1' }))).status).toBe(400);
  });
  it('503 in production without keys or ingest settings', async () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    const res = await verify(post('/api/razorpay/verify', body));
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ code: 'not_configured' });
  });
  it('400 invalid_signature before any network call', async () => {
    vi.stubEnv('RAZORPAY_KEY_ID', 'rzp_test_x');
    vi.stubEnv('RAZORPAY_KEY_SECRET', KEY_SECRET);
    vi.stubEnv('PLATFORM_API_ORIGIN', 'https://api.test');
    vi.stubEnv('PLATFORM_EDGE_SECRET', 'e');
    vi.stubEnv('FB_INGEST_KEY', 'k');
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const res = await verify(post('/api/razorpay/verify', body));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ code: 'invalid_signature' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
  it('confirms a development mock order with a dev receipt', async () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', '2026-11-10');
    const res = await verify(post('/api/razorpay/verify', { razorpay_order_id: 'mock_order_1', razorpay_payment_id: 'mock_pay_1', razorpay_signature: 'mock', registrant: REGISTRANT }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ receiptNumber: expect.stringMatching(/^FB-DEV-\d{6}$/), email: 'priya@example.com' });
  });
  it('never accepts a mock order in production', async () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    const res = await verify(post('/api/razorpay/verify', { razorpay_order_id: 'mock_order_1', razorpay_payment_id: 'mock_pay_1', razorpay_signature: 'mock', registrant: REGISTRANT }));
    expect(res.status).toBe(503);
  });
});

describe('POST /api/razorpay/webhook', () => {
  const event = JSON.stringify({ event: 'payment.failed', payload: { payment: { entity: { id: 'pay_1', order_id: 'order_1' } } } });
  const sign = (raw: string) => createHmac('sha256', WEBHOOK_SECRET).update(raw).digest('hex');

  it('503 when RAZORPAY_WEBHOOK_SECRET is not set', async () => {
    expect((await webhook(post('/api/razorpay/webhook', event, { 'x-razorpay-signature': sign(event) }))).status).toBe(503);
  });
  it('400 on a missing or wrong signature', async () => {
    vi.stubEnv('RAZORPAY_WEBHOOK_SECRET', WEBHOOK_SECRET);
    expect((await webhook(post('/api/razorpay/webhook', event))).status).toBe(400);
    expect((await webhook(post('/api/razorpay/webhook', event, { 'x-razorpay-signature': sign(`${event} `) }))).status).toBe(400);
  });
  it('acknowledges events it does not act on', async () => {
    vi.stubEnv('RAZORPAY_WEBHOOK_SECRET', WEBHOOK_SECRET);
    const res = await webhook(post('/api/razorpay/webhook', event, { 'x-razorpay-signature': sign(event) }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ignored: 'payment.failed' });
  });
  it('503 (so Razorpay retries) for a captured payment while keys are missing', async () => {
    vi.stubEnv('RAZORPAY_WEBHOOK_SECRET', WEBHOOK_SECRET);
    const captured = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_1', order_id: 'order_1' } } } });
    expect((await webhook(post('/api/razorpay/webhook', captured, { 'x-razorpay-signature': sign(captured) }))).status).toBe(503);
  });
});

describe('POST /api/enroll (leads)', () => {
  it('records a call request on the platform with an E.164 phone', async () => {
    vi.stubEnv('PLATFORM_API_ORIGIN', 'https://api.test');
    vi.stubEnv('PLATFORM_EDGE_SECRET', 'e');
    vi.stubEnv('FB_INGEST_KEY', 'k');
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ leadId: 'lead_1' }), { status: 201 }));
    const res = await enroll(post('/api/enroll', { mode: 'callback', parentName: 'Priya', phone: '98765 43210', grade: '9', source: 'fb_summer_2027', email: '' }));
    expect(res.status).toBe(201);
    const [url, init] = fetchSpy.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.test/v1/ingest/future-builders/leads');
    expect(JSON.parse(init.body as string)).toEqual({ kind: 'callback', parentName: 'Priya', phone: '+919876543210', grade: '9', source: 'fb_summer_2027' });
  });
  it('400 without a valid phone; an unknown source becomes future_builders', async () => {
    expect((await enroll(post('/api/enroll', { mode: 'callback', parentName: 'Priya', phone: '' }))).status).toBe(400);
    vi.stubEnv('PLATFORM_API_ORIGIN', 'https://api.test');
    vi.stubEnv('PLATFORM_EDGE_SECRET', 'e');
    vi.stubEnv('FB_INGEST_KEY', 'k');
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ leadId: 'lead_2' }), { status: 201 }));
    await enroll(post('/api/enroll', { mode: 'notify', parentName: 'Priya', phone: '9876543210', email: 'p@example.com', source: 'DROP TABLE' }));
    expect(JSON.parse((fetchSpy.mock.calls[0] as unknown as [string, RequestInit])[1].body as string)).toMatchObject({ kind: 'notify', source: 'future_builders', email: 'p@example.com' });
  });
  it('502 when the platform refuses, 503 in production without settings', async () => {
    vi.stubEnv('PLATFORM_API_ORIGIN', 'https://api.test');
    vi.stubEnv('PLATFORM_EDGE_SECRET', 'e');
    vi.stubEnv('FB_INGEST_KEY', 'k');
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 401 }));
    expect((await enroll(post('/api/enroll', { mode: 'callback', parentName: 'Priya', phone: '9876543210' }))).status).toBe(502);
    vi.stubEnv('PLATFORM_API_ORIGIN', '');
    vi.stubEnv('VERCEL_ENV', 'production');
    expect((await enroll(post('/api/enroll', { mode: 'callback', parentName: 'Priya', phone: '9876543210' }))).status).toBe(503);
  });
});
