import { NextResponse } from 'next/server';
import { getCohortState, getOpenCohort, today } from '@/content/future-builders';
import { quote } from '@/lib/future-builders/pricing';
import { firstIssue, registrantSchema } from '@/lib/future-builders/registration';
import { MOCK_ORDER_PREFIX, isProductionRuntime, orderNotes } from '@/lib/future-builders/razorpay';
import { razorpayClient, razorpayKeys } from '@/lib/future-builders/server';

/**
 * POST /api/razorpay: create the Razorpay order for a Future Builders registration.
 * Body: { parentName, studentName, email, phone, grade, coupon?, friendName? }.
 * The amount is computed here (offer by the server clock, FRIEND500 rule), never taken from the
 * browser. The registrant travels in the order notes, so /api/razorpay/verify and the webhook record
 * the payment from Razorpay's own copy of the order.
 * Response: { id, amount, currency, keyId, offer, coupon, mock? }.
 */
export async function POST(req: Request) {
  // Payment only while registration is open (content/future-builders.ts), even if a stale page still
  // shows the form.
  const now = today();
  const camp = getOpenCohort(now);
  if (!camp) {
    const upcoming = getCohortState(now) === 'upcoming';
    return NextResponse.json(
      {
        error: upcoming
          ? 'Registration has not opened yet. Ask us to notify you when it does.'
          : 'Registration for this camp has closed. Please join the waitlist instead.',
      },
      { status: 409 },
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const parsed = registrantSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 });
  const registrant = parsed.data;

  const q = quote(registrant.coupon, registrant.friendName, now);
  const amount = q.total * 100; // paise
  const currency = 'INR';
  const receipt = `fb_${camp.slug}_${Date.now()}`.slice(0, 40);
  const notes = orderNotes(registrant, q, camp);
  const priced = { amount, currency, offer: q.offer.slug, coupon: q.coupon?.code ?? null };

  const keys = razorpayKeys();
  if (!keys) {
    if (isProductionRuntime()) {
      console.error('[future-builders] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET missing in production: payment refused.');
      return NextResponse.json(
        { error: 'Online payment is temporarily unavailable. Please try again shortly, or message us on WhatsApp and we will help you register.' },
        { status: 503 },
      );
    }
    console.warn('[future-builders] Razorpay keys missing: mock order (local development only).');
    return NextResponse.json({ id: `${MOCK_ORDER_PREFIX}${Date.now()}`, keyId: 'rzp_test_mock', mock: true, ...priced });
  }

  try {
    const order = await razorpayClient(keys).orders.create({ amount, currency, receipt, notes });
    return NextResponse.json({ ...priced, id: order.id, keyId: keys.keyId, amount: Number(order.amount) });
  } catch (err) {
    const e = err as { error?: { description?: string }; message?: string };
    console.error('[future-builders] Razorpay order failed:', e?.error?.description ?? e?.message);
    return NextResponse.json({ error: 'We couldn’t start the payment just now. Please try again in a minute.' }, { status: 502 });
  }
}
