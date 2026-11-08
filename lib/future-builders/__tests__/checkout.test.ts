import { describe, expect, it, vi } from 'vitest';
import { CAMP, type Camp } from '@/content/future-builders';
import type { EnrollmentPayload } from '@/lib/platform-ingest';
import { CheckoutError, confirmAndRecord, type RazorpayGateway } from '../checkout';
import { quote } from '../pricing';
import { orderNotes, type OrderLike, type PaymentLike } from '../razorpay';
import { registrantSchema } from '../registration';

const registrant = registrantSchema.parse({ parentName: 'Priya Sharma', studentName: 'Arjun', email: 'priya@example.com', phone: '9876543210', grade: '9' });
const notes = orderNotes(registrant, quote(null, null, new Date('2026-11-10T12:00:00+05:30')), CAMP as Camp);
const ORDER: OrderLike = { id: 'order_1', amount: 329900, currency: 'INR', notes };
const CAPTURED: PaymentLike = { id: 'pay_1', order_id: 'order_1', amount: 329900, currency: 'INR', status: 'captured', created_at: 1_794_000_000 };

function gateway(payments: PaymentLike[], order: OrderLike = ORDER, capture?: RazorpayGateway['capture']) {
  const queue = [...payments];
  return {
    fetchOrder: vi.fn(async () => order),
    fetchPayment: vi.fn(async () => queue.shift() ?? payments[payments.length - 1]),
    capture: vi.fn(capture ?? (async () => ({ ...CAPTURED }))),
  } satisfies RazorpayGateway;
}

const recorder = () => vi.fn(async (p: EnrollmentPayload) => ({ enrollmentId: 'enr_1', receiptNumber: 'FB-2027-000001', created: p.source === 'checkout' }));

async function rejectionCode(p: Promise<unknown>) {
  try {
    await p;
  } catch (e) {
    expect(e).toBeInstanceOf(CheckoutError);
    return (e as CheckoutError).code;
  }
  throw new Error('expected a rejection');
}

describe('confirmAndRecord', () => {
  it('records a captured payment and returns the receipt and the email it went to', async () => {
    const g = gateway([CAPTURED]);
    const record = recorder();
    const result = await confirmAndRecord({ gateway: g, record, orderId: 'order_1', paymentId: 'pay_1', source: 'checkout' });
    expect(result).toEqual({ enrollmentId: 'enr_1', receiptNumber: 'FB-2027-000001', created: true, email: 'priya@example.com', amountPaise: 329900 });
    expect(g.capture).not.toHaveBeenCalled();
    expect(record).toHaveBeenCalledWith(expect.objectContaining({ razorpayPaymentId: 'pay_1', amountPaise: 329900, offer: 'diwali-2026', cohort: 'summer-2027', source: 'checkout' }));
  });

  it('captures an authorised payment for the order amount, then records it', async () => {
    const g = gateway([{ ...CAPTURED, status: 'authorized' }]);
    const record = recorder();
    await confirmAndRecord({ gateway: g, record, orderId: 'order_1', paymentId: 'pay_1', source: 'webhook' });
    expect(g.capture).toHaveBeenCalledWith('pay_1', 329900, 'INR');
    expect(record).toHaveBeenCalledOnce();
  });

  it('if capture fails because it was captured meanwhile, re-reads the payment and records it', async () => {
    const g = gateway([{ ...CAPTURED, status: 'authorized' }, CAPTURED], ORDER, async () => {
      throw new Error('payment already captured');
    });
    const record = recorder();
    await confirmAndRecord({ gateway: g, record, orderId: 'order_1', paymentId: 'pay_1', source: 'checkout' });
    expect(g.fetchPayment).toHaveBeenCalledTimes(2);
    expect(record).toHaveBeenCalledOnce();
  });

  it('never captures, and refuses, an authorised payment for a different amount', async () => {
    const g = gateway([{ ...CAPTURED, status: 'authorized', amount: 100 }]);
    const record = recorder();
    expect(await rejectionCode(confirmAndRecord({ gateway: g, record, orderId: 'order_1', paymentId: 'pay_1', source: 'checkout' }))).toBe('payment_invalid');
    expect(g.capture).not.toHaveBeenCalled();
    expect(record).not.toHaveBeenCalled();
  });

  it.each([
    ['a payment for another order', { order_id: 'order_2' }],
    ['a short payment', { amount: 1000 }],
    ['a non-INR payment', { currency: 'USD' }],
    ['a failed payment', { status: 'failed' }],
  ])('refuses %s without recording it', async (_label, change) => {
    const record = recorder();
    expect(await rejectionCode(confirmAndRecord({ gateway: gateway([{ ...CAPTURED, ...change }]), record, orderId: 'order_1', paymentId: 'pay_1', source: 'checkout' }))).toBe('payment_invalid');
    expect(record).not.toHaveBeenCalled();
  });

  it('refuses orders that are not Future Builders orders (other products on the same account)', async () => {
    const g = gateway([CAPTURED], { ...ORDER, notes: { product: 'platform-plan' } });
    expect(await rejectionCode(confirmAndRecord({ gateway: g, record: recorder(), orderId: 'order_1', paymentId: 'pay_1', source: 'webhook' }))).toBe('not_future_builders');
    expect(g.fetchPayment).not.toHaveBeenCalled();
  });

  it('reports Razorpay API failures as razorpay_error', async () => {
    const g = gateway([CAPTURED]);
    g.fetchOrder.mockRejectedValueOnce({ statusCode: 401, error: { description: 'Authentication failed' } });
    expect(await rejectionCode(confirmAndRecord({ gateway: g, record: recorder(), orderId: 'order_1', paymentId: 'pay_1', source: 'checkout' }))).toBe('razorpay_error');
  });

  it('reports a platform failure as record_failed (the payment itself was fine)', async () => {
    const record = vi.fn(async () => {
      throw new Error('ingest answered 503');
    });
    expect(await rejectionCode(confirmAndRecord({ gateway: gateway([CAPTURED]), record, orderId: 'order_1', paymentId: 'pay_1', source: 'checkout' }))).toBe('record_failed');
  });
});
