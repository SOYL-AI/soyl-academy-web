import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt = 'receipt#1' } = await req.json();

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

    const options = {
      amount: amount, // amount in smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
