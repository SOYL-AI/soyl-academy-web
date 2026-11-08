import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getOpenCohort, today } from '@/content/future-builders';
import { CheckoutError, confirmAndRecord } from '@/lib/future-builders/checkout';
import { quote } from '@/lib/future-builders/pricing';
import { isProductionRuntime, orderNotes, verifyCheckoutSignature } from '@/lib/future-builders/razorpay';
import { registrantSchema } from '@/lib/future-builders/registration';
import { platformRecorders, razorpayClient, razorpayGateway, razorpayKeys } from '@/lib/future-builders/server';

export const maxDuration = 30;

const bodySchema = z.object({
  razorpay_order_id: z.string().trim().min(1).max(64),
  razorpay_payment_id: z.string().trim().min(1).max(64),
  razorpay_signature: z.string().trim().min(1).max(256),
  /** Local development mock orders only: the registrant (real orders carry it in the order notes). */
  registrant: z.unknown().optional(),
});

type Code = 'invalid_request' | 'invalid_signature' | 'not_configured' | CheckoutError['code'];

const fail = (status: number, code: Code, error: string) => NextResponse.json({ error, code }, { status });

/**
 * POST /api/razorpay/verify: the checkout handler's confirmation.
 * 1. Verify the checkout signature (HMAC-SHA256 of `order_id|payment_id` with RAZORPAY_KEY_SECRET).
 * 2. Fetch the order and payment from Razorpay: same order, full order amount, INR, captured
 *    (an authorised payment is captured here first).
 * 3. Record it on the platform (idempotent per payment), which emails the parent a confirmation.
 * Response 200: { receiptNumber, email, created }. Any error: { error, code } — the form then tells
 * the parent the payment was received and is being confirmed (never "pay again").
 */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(400, 'invalid_request', 'The payment confirmation was incomplete.');
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = parsed.data;

  const recorders = platformRecorders();
  const keys = razorpayKeys();

  // Local development without Razorpay keys: the mock order from POST /api/razorpay.
  if (!keys && !isProductionRuntime() && orderId.startsWith('mock_order_')) {
    const registrant = registrantSchema.safeParse(parsed.data.registrant);
    const camp = getOpenCohort(today());
    if (!registrant.success || !camp || !recorders) return fail(400, 'invalid_request', 'Mock confirmation needs the registrant.');
    const q = quote(registrant.data.coupon, registrant.data.friendName, today());
    const notes = orderNotes(registrant.data, q, camp);
    const result = await recorders.enrollment({
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      amountPaise: q.total * 100,
      currency: 'INR',
      paidAt: new Date().toISOString(),
      cohort: camp.slug,
      offer: q.offer.slug,
      coupon: notes.coupon || null,
      friendName: notes.friendName || null,
      parentName: registrant.data.parentName,
      studentName: registrant.data.studentName,
      email: registrant.data.email,
      phone: registrant.data.phone,
      grade: registrant.data.grade,
      source: 'checkout',
    });
    return NextResponse.json({ receiptNumber: result.receiptNumber, email: registrant.data.email, created: result.created });
  }

  if (!keys || !recorders) {
    console.error('[future-builders] verify: Razorpay keys or platform ingest settings missing.', { orderId, paymentId });
    return fail(503, 'not_configured', 'We couldn’t confirm the payment automatically.');
  }

  if (!verifyCheckoutSignature({ orderId, paymentId, signature }, keys.keySecret)) {
    console.warn('[future-builders] verify: signature mismatch.', { orderId, paymentId });
    return fail(400, 'invalid_signature', 'The payment confirmation could not be verified.');
  }

  try {
    const result = await confirmAndRecord({
      gateway: razorpayGateway(razorpayClient(keys)),
      record: recorders.enrollment,
      orderId,
      paymentId,
      source: 'checkout',
    });
    return NextResponse.json({ receiptNumber: result.receiptNumber, email: result.email, created: result.created });
  } catch (err) {
    const code = err instanceof CheckoutError ? err.code : 'record_failed';
    console.error('[future-builders] verify failed:', (err as Error).message, { orderId, paymentId, code });
    const status = code === 'payment_invalid' || code === 'not_future_builders' ? 409 : 502;
    return fail(status, code, 'We couldn’t confirm the payment automatically.');
  }
}
