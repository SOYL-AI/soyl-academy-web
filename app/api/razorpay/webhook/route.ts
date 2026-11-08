import { NextResponse } from 'next/server';
import { CheckoutError, confirmAndRecord } from '@/lib/future-builders/checkout';
import { verifyWebhookSignature } from '@/lib/future-builders/razorpay';
import { platformRecorders, razorpayClient, razorpayGateway, razorpayKeys } from '@/lib/future-builders/server';
import { parseWebhookEvent, paymentRef } from '@/lib/future-builders/webhook';

export const maxDuration = 30;

/**
 * POST /api/razorpay/webhook: safety net when the browser closes before /api/razorpay/verify.
 * Configure in the Razorpay dashboard with events payment.captured and order.paid, and put the secret
 * in RAZORPAY_WEBHOOK_SECRET. The signature (X-Razorpay-Signature, HMAC-SHA256 of the raw body) is
 * checked first; the payment is then re-fetched from Razorpay and recorded exactly like the checkout
 * path (the platform is idempotent per payment, so both paths reporting one payment is fine).
 * Orders that aren't Future Builders orders (same Razorpay account) are acknowledged and ignored.
 * Non-2xx only for failures worth a Razorpay retry.
 */
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();
  if (!secret) {
    console.error('[future-builders] webhook: RAZORPAY_WEBHOOK_SECRET is not set; event refused.');
    return NextResponse.json({ error: 'webhook not configured' }, { status: 503 });
  }

  const raw = await req.text();
  if (!verifyWebhookSignature(raw, req.headers.get('x-razorpay-signature'), secret)) {
    console.warn('[future-builders] webhook: bad signature.');
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  const event = parseWebhookEvent(json);
  if (!event) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

  const ref = paymentRef(event);
  if (!ref) return NextResponse.json({ ok: true, ignored: event.event });

  const keys = razorpayKeys();
  const recorders = platformRecorders();
  if (!keys || !recorders) {
    console.error('[future-builders] webhook: Razorpay keys or platform ingest settings missing.', ref);
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }

  try {
    const result = await confirmAndRecord({
      gateway: razorpayGateway(razorpayClient(keys)),
      // No client IP: the caller is Razorpay, not a parent's browser.
      record: (payload) => recorders.enrollment(payload),
      ...ref,
      source: 'webhook',
    });
    return NextResponse.json({ ok: true, receiptNumber: result.receiptNumber, created: result.created });
  } catch (err) {
    const code = err instanceof CheckoutError ? err.code : 'record_failed';
    if (code === 'not_future_builders') return NextResponse.json({ ok: true, ignored: 'not a Future Builders order' });
    console.error('[future-builders] webhook failed:', (err as Error).message, { ...ref, code });
    // A payment that doesn't match its order won't fix itself on retry: acknowledge, keep the log.
    if (code === 'payment_invalid') return NextResponse.json({ ok: false, code });
    return NextResponse.json({ error: 'temporarily unable to record' }, { status: 502 });
  }
}
