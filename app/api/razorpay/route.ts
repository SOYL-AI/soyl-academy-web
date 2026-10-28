import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { priceFor } from '@/lib/future-builders/pricing';
import { getCohortState, getOpenCohort } from '@/content/future-builders';

export async function POST(req: Request) {
  try {
    // Payment only while a cohort is taking registrations (content/future-builders.ts), even if
    // a stale page still shows the form: refused before registration opens and after it closes.
    if (!getOpenCohort()) {
      const upcoming = getCohortState() === 'upcoming';
      return NextResponse.json(
        {
          error: upcoming
            ? 'Registration for the next cohort has not opened yet. Ask us to notify you when it does.'
            : 'Registration for this cohort has closed. Please join the waitlist instead.',
        },
        { status: 409 }
      );
    }

    const { coupon, friendName } = await req.json();

    // The charge is computed here from the coupon, never taken from the browser.
    const amount = priceFor(coupon, friendName) * 100; // paise
    const currency = 'INR';
    const receipt = `fb_${Date.now()}`;

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      // Mock mode for local testing if keys aren't provided yet
      console.warn("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Mocking Razorpay order.");
      return NextResponse.json({
        id: `mock_order_${Date.now()}`,
        amount,
        currency,
        receipt,
        status: "created"
      });
    }

    const instance = new Razorpay({ key_id, key_secret });

    const order = await instance.orders.create({ amount, currency, receipt });
    return NextResponse.json(order);
  } catch (error: unknown) {
    console.error("Razorpay error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
