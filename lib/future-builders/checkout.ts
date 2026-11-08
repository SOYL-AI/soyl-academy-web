/**
 * Confirm a Razorpay payment for a Future Builders order and record it on the platform.
 * Shared by POST /api/razorpay/verify (the browser's checkout handler) and POST /api/razorpay/webhook
 * (the safety net when the browser closes first). Dependencies are injected so it is unit-tested
 * without Razorpay or the platform (lib/future-builders/__tests__/checkout.test.ts).
 */
import type { EnrollmentPayload, EnrollmentResult } from '@/lib/platform-ingest';
import { checkPayment, enrollmentPayload, parseOrderNotes, type OrderLike, type PaymentLike } from './razorpay';

export interface RazorpayGateway {
  fetchOrder(orderId: string): Promise<OrderLike>;
  fetchPayment(paymentId: string): Promise<PaymentLike>;
  capture(paymentId: string, amountPaise: number, currency: 'INR'): Promise<PaymentLike>;
}

export type CheckoutErrorCode = 'not_future_builders' | 'payment_invalid' | 'razorpay_error' | 'record_failed';

export class CheckoutError extends Error {
  constructor(
    message: string,
    readonly code: CheckoutErrorCode,
  ) {
    super(message);
    this.name = 'CheckoutError';
  }
}

export interface ConfirmInput {
  gateway: RazorpayGateway;
  /** Records on the platform; the routes bind the parent's IP (checkout) or none (webhook). */
  record: (payload: EnrollmentPayload) => Promise<EnrollmentResult>;
  orderId: string;
  paymentId: string;
  source: EnrollmentPayload['source'];
}

export interface ConfirmResult {
  receiptNumber: string;
  enrollmentId: string;
  created: boolean;
  email: string;
  amountPaise: number;
}

async function razorpay<T>(what: string, call: () => Promise<T>): Promise<T> {
  try {
    return await call();
  } catch (err) {
    const e = err as { statusCode?: number; error?: { description?: string }; message?: string };
    throw new CheckoutError(`Razorpay ${what} failed: ${e?.error?.description ?? e?.message ?? 'unknown error'}`, 'razorpay_error');
  }
}

/**
 * 1. Fetch the order (its notes carry the registrant; non-Future-Builders orders are refused).
 * 2. Fetch the payment; if it is only authorised for this order, in full, in INR, capture it.
 * 3. Require: same order, same amount as the order, INR, captured.
 * 4. Record it on the platform (idempotent per payment) and return the receipt number.
 */
export async function confirmAndRecord({ gateway, record, orderId, paymentId, source }: ConfirmInput): Promise<ConfirmResult> {
  const order = await razorpay('order fetch', () => gateway.fetchOrder(orderId));
  const notes = parseOrderNotes(order.notes);
  if (!notes) throw new CheckoutError(`order ${orderId} is not a Future Builders order`, 'not_future_builders');

  let payment = await razorpay('payment fetch', () => gateway.fetchPayment(paymentId));
  if (
    payment.status === 'authorized' &&
    payment.order_id === orderId &&
    payment.currency === 'INR' &&
    Number(payment.amount) === Number(order.amount)
  ) {
    try {
      payment = await gateway.capture(paymentId, Number(order.amount), 'INR');
    } catch {
      // Captured meanwhile (the webhook and the checkout handler can race), or a transient error:
      // re-read the payment and let the checks below decide.
      payment = await razorpay('payment re-fetch', () => gateway.fetchPayment(paymentId));
    }
  }

  const check = checkPayment(orderId, order, payment);
  if (!check.ok) throw new CheckoutError(`payment ${paymentId} rejected: ${check.reason}`, 'payment_invalid');

  const payload = enrollmentPayload(order, payment, notes, source);
  let result: EnrollmentResult;
  try {
    result = await record(payload);
  } catch (err) {
    throw new CheckoutError(`recording payment ${paymentId} failed: ${(err as Error).message}`, 'record_failed');
  }
  return { ...result, email: notes.email, amountPaise: payload.amountPaise };
}
