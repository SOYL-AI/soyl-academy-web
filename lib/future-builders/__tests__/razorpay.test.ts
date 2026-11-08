import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { CAMP, type Camp } from '@/content/future-builders';
import { quote } from '../pricing';
import {
  checkPayment,
  enrollmentPayload,
  isProductionRuntime,
  orderNotes,
  parseOrderNotes,
  safeEqualHex,
  verifyCheckoutSignature,
  verifyWebhookSignature,
} from '../razorpay';
import { normalizeIndianPhone, registrantSchema } from '../registration';
import { paymentRef, parseWebhookEvent } from '../webhook';

// Generated per run so no secret-shaped literal lives in git (gitleaks).
const KEY_SECRET = `ks-${crypto.randomUUID()}`;
const WEBHOOK_SECRET = `wh-${crypto.randomUUID()}`;
const hmac = (secret: string, msg: string) => createHmac('sha256', secret).update(msg).digest('hex');

describe('verifyCheckoutSignature: HMAC-SHA256(order_id|payment_id, key secret)', () => {
  const orderId = 'order_ABC123';
  const paymentId = 'pay_XYZ789';
  const good = hmac(KEY_SECRET, `${orderId}|${paymentId}`);

  it('accepts the genuine signature (any hex case)', () => {
    expect(verifyCheckoutSignature({ orderId, paymentId, signature: good }, KEY_SECRET)).toBe(true);
    expect(verifyCheckoutSignature({ orderId, paymentId, signature: good.toUpperCase() }, KEY_SECRET)).toBe(true);
  });
  it('rejects a signature for another payment, order or secret', () => {
    expect(verifyCheckoutSignature({ orderId, paymentId: 'pay_OTHER', signature: good }, KEY_SECRET)).toBe(false);
    expect(verifyCheckoutSignature({ orderId: 'order_OTHER', paymentId, signature: good }, KEY_SECRET)).toBe(false);
    expect(verifyCheckoutSignature({ orderId, paymentId, signature: good }, `${KEY_SECRET}x`)).toBe(false);
    // order|payment swapped
    expect(verifyCheckoutSignature({ orderId, paymentId, signature: hmac(KEY_SECRET, `${paymentId}|${orderId}`) }, KEY_SECRET)).toBe(false);
  });
  it('rejects malformed, truncated, padded or empty signatures without throwing', () => {
    for (const signature of ['', 'mock', good.slice(0, -1), `${good}0`, `${good.slice(0, -1)}g`, ' '.repeat(64)]) {
      expect(verifyCheckoutSignature({ orderId, paymentId, signature }, KEY_SECRET)).toBe(false);
    }
  });
  it('rejects everything when the secret is empty', () => {
    expect(verifyCheckoutSignature({ orderId, paymentId, signature: hmac('', `${orderId}|${paymentId}`) }, '')).toBe(false);
  });
  it('safeEqualHex compares only equal-length hex', () => {
    expect(safeEqualHex('abcd', 'ABCD')).toBe(true);
    expect(safeEqualHex('abcd', 'abc')).toBe(false);
    expect(safeEqualHex('abcd', 'abcz')).toBe(false);
  });
});

describe('verifyWebhookSignature: HMAC-SHA256(raw body, webhook secret)', () => {
  const body = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_1', order_id: 'order_1' } } } });
  const sig = hmac(WEBHOOK_SECRET, body);
  it('accepts the genuine signature over the exact raw body', () => {
    expect(verifyWebhookSignature(body, sig, WEBHOOK_SECRET)).toBe(true);
    expect(verifyWebhookSignature(body, ` ${sig} `, WEBHOOK_SECRET)).toBe(true);
  });
  it('rejects a re-serialised or tampered body, a wrong secret, or a missing header', () => {
    expect(verifyWebhookSignature(`${body} `, sig, WEBHOOK_SECRET)).toBe(false);
    expect(verifyWebhookSignature(body.replace('pay_1', 'pay_2'), sig, WEBHOOK_SECRET)).toBe(false);
    expect(verifyWebhookSignature(body, sig, KEY_SECRET)).toBe(false);
    expect(verifyWebhookSignature(body, null, WEBHOOK_SECRET)).toBe(false);
    expect(verifyWebhookSignature(body, undefined, WEBHOOK_SECRET)).toBe(false);
    expect(verifyWebhookSignature(body, sig, '')).toBe(false);
  });
});

describe('webhook events', () => {
  it('payment.captured: the payment and its order', () => {
    const e = parseWebhookEvent({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_1', order_id: 'order_1', amount: 329900 } } } });
    expect(e && paymentRef(e)).toEqual({ orderId: 'order_1', paymentId: 'pay_1' });
  });
  it('order.paid: the order entity wins', () => {
    const e = parseWebhookEvent({ event: 'order.paid', payload: { order: { entity: { id: 'order_2' } }, payment: { entity: { id: 'pay_2', order_id: 'order_2' } } } });
    expect(e && paymentRef(e)).toEqual({ orderId: 'order_2', paymentId: 'pay_2' });
  });
  it('other events, or a payment without an order, are not acted on', () => {
    const failed = parseWebhookEvent({ event: 'payment.failed', payload: { payment: { entity: { id: 'pay_3', order_id: 'order_3' } } } });
    expect(failed && paymentRef(failed)).toBeNull();
    const orphan = parseWebhookEvent({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_4', order_id: null } } } });
    expect(orphan && paymentRef(orphan)).toBeNull();
  });
  it('rejects bodies that are not events', () => {
    expect(parseWebhookEvent(null)).toBeNull();
    expect(parseWebhookEvent({ payload: {} })).toBeNull();
  });
});

describe('normalizeIndianPhone → E.164', () => {
  it.each([
    ['9876543210', '+919876543210'],
    ['98765 43210', '+919876543210'],
    ['+91 98765-43210', '+919876543210'],
    ['(+91) 9876543210', '+919876543210'],
    ['919876543210', '+919876543210'],
    ['09876543210', '+919876543210'],
    ['091-98765 43210', '+919876543210'],
    ['6000000000', '+916000000000'],
  ])('%s → %s', (raw, e164) => expect(normalizeIndianPhone(raw)).toBe(e164));
  it.each(['', '12345', '5876543210', '+1 415 555 0100', '98765432101', 'call me', '+44 7700 900123'])('rejects %s', (raw) => {
    expect(normalizeIndianPhone(raw)).toBeNull();
  });
});

const VALID = { parentName: ' Priya Sharma ', studentName: 'Arjun', email: ' Priya@Example.com ', phone: '98765 43210', grade: '9', coupon: 'friend500', friendName: 'Asha' };

describe('registrantSchema', () => {
  it('trims, lowercases the email, normalises the phone and upper-cases the code', () => {
    expect(registrantSchema.parse(VALID)).toEqual({
      parentName: 'Priya Sharma',
      studentName: 'Arjun',
      email: 'priya@example.com',
      phone: '+919876543210',
      grade: '9',
      coupon: 'FRIEND500',
      friendName: 'Asha',
    });
  });
  it('empty code and friend name become null', () => {
    expect(registrantSchema.parse({ ...VALID, coupon: '', friendName: undefined })).toMatchObject({ coupon: null, friendName: null });
  });
  it.each([
    ['parentName', 'P'],
    ['studentName', ''],
    ['email', 'not-an-email'],
    ['phone', '12345'],
    ['grade', '6'],
    ['grade', '13'],
    ['parentName', '<script>'],
    ['parentName', 'x'.repeat(101)],
  ])('rejects %s = %j', (field, value) => {
    expect(registrantSchema.safeParse({ ...VALID, [field]: value }).success).toBe(false);
  });
  it('rejects a missing body', () => {
    expect(registrantSchema.safeParse(null).success).toBe(false);
  });
});

describe('order notes', () => {
  const camp = CAMP as Camp;
  const registrant = registrantSchema.parse(VALID);
  const diwali = new Date('2026-11-10T12:00:00+05:30');

  it('carry the registrant, offer and camp within Razorpay limits (≤ 15 notes, ≤ 256 chars)', () => {
    const notes = orderNotes(registrant, quote(registrant.coupon, registrant.friendName, diwali), camp);
    expect(Object.keys(notes).length).toBeLessThanOrEqual(15);
    for (const v of Object.values(notes)) expect(v.length).toBeLessThanOrEqual(256);
    expect(notes).toMatchObject({ product: 'future-builders', cohort: 'summer-2027', offer: 'diwali-2026', coupon: 'FRIEND500', friendName: 'Asha', phone: '+919876543210' });
  });
  it('drop the code and friend name when the code did not count', () => {
    const r = registrantSchema.parse({ ...VALID, coupon: 'BUILDER10' });
    const notes = orderNotes(r, quote(r.coupon, r.friendName, diwali), camp);
    expect(notes).toMatchObject({ coupon: '', friendName: '' });
  });
  it('round-trip through parseOrderNotes; other products are refused', () => {
    const notes = orderNotes(registrant, quote(registrant.coupon, registrant.friendName, new Date('2026-12-01T00:00:00Z')), camp);
    expect(parseOrderNotes(notes)).toMatchObject({ offer: 'standard', email: 'priya@example.com' });
    expect(parseOrderNotes({ ...notes, product: 'platform-plan' })).toBeNull();
    expect(parseOrderNotes([])).toBeNull();
    expect(parseOrderNotes(undefined)).toBeNull();
  });
});

describe('checkPayment', () => {
  const order = { id: 'order_1', amount: 279900, currency: 'INR' };
  const payment = { id: 'pay_1', order_id: 'order_1', amount: 279900, currency: 'INR', status: 'captured' };
  it('passes a captured, full, INR payment for this order', () => {
    expect(checkPayment('order_1', order, payment)).toEqual({ ok: true });
    expect(checkPayment('order_1', { ...order, amount: '279900' }, payment)).toEqual({ ok: true });
  });
  it.each([
    ['another order', { order_id: 'order_2' }],
    ['a different amount', { amount: 100 }],
    ['another currency', { currency: 'USD' }],
    ['an authorised (uncaptured) payment', { status: 'authorized' }],
    ['a failed payment', { status: 'failed' }],
    ['a refunded payment', { status: 'refunded' }],
  ])('rejects %s', (_label, change) => {
    expect(checkPayment('order_1', order, { ...payment, ...change }).ok).toBe(false);
  });
  it('rejects when the fetched order is not the one asked about', () => {
    expect(checkPayment('order_9', order, { ...payment, order_id: 'order_9' }).ok).toBe(false);
  });
});

describe('enrollmentPayload (platform ingest contract)', () => {
  it('maps order, payment and notes to the contract', () => {
    const notes = parseOrderNotes(orderNotes(registrantSchema.parse(VALID), quote('FRIEND500', 'Asha', new Date('2026-11-10T12:00:00+05:30')), CAMP as Camp))!;
    const payload = enrollmentPayload(
      { id: 'order_1', amount: 279900, currency: 'INR' },
      { id: 'pay_1', order_id: 'order_1', amount: 279900, currency: 'INR', status: 'captured', created_at: 1_794_000_000 },
      notes,
      'checkout',
    );
    expect(payload).toEqual({
      razorpayOrderId: 'order_1',
      razorpayPaymentId: 'pay_1',
      amountPaise: 279900,
      currency: 'INR',
      paidAt: new Date(1_794_000_000_000).toISOString(),
      cohort: 'summer-2027',
      offer: 'diwali-2026',
      coupon: 'FRIEND500',
      friendName: 'Asha',
      parentName: 'Priya Sharma',
      studentName: 'Arjun',
      email: 'priya@example.com',
      phone: '+919876543210',
      grade: '9',
      source: 'checkout',
    });
  });
  it('sends null coupon and friend name when none was used', () => {
    const notes = parseOrderNotes(orderNotes(registrantSchema.parse({ ...VALID, coupon: '' }), quote(null, null), CAMP as Camp))!;
    const payload = enrollmentPayload({ id: 'o', amount: 1, currency: 'INR' }, { id: 'p', order_id: 'o', amount: 1, currency: 'INR', status: 'captured' }, notes, 'webhook');
    expect(payload).toMatchObject({ coupon: null, friendName: null, source: 'webhook' });
  });
});

describe('isProductionRuntime: never mock in production', () => {
  it('is true for NODE_ENV=production or VERCEL_ENV=production', () => {
    expect(isProductionRuntime({ NODE_ENV: 'production' })).toBe(true);
    expect(isProductionRuntime({ NODE_ENV: 'development', VERCEL_ENV: 'production' })).toBe(true);
    expect(isProductionRuntime({ NODE_ENV: 'development' })).toBe(false);
    expect(isProductionRuntime({ NODE_ENV: 'test', VERCEL_ENV: 'preview' })).toBe(false);
  });
});
