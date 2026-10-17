import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { priceFor } from '@/lib/future-builders/pricing';

export async function POST(req: Request) {
  try {
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
