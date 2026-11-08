/**
 * Razorpay helpers for Future Builders: signatures, order notes and payment checks. Pure and
 * server-side (node:crypto); unit-tested in lib/future-builders/__tests__/razorpay.test.ts.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import type { Camp } from '@/content/future-builders';
import type { EnrollmentPayload } from '@/lib/platform-ingest';
import type { Quote } from './pricing';
import type { Registrant } from './registration';

/** Production never mocks Razorpay or the platform: Vercel production, or any `next start` build. */
export function isProductionRuntime(env: Record<string, string | undefined> = process.env): boolean {
  return env.NODE_ENV === 'production' || env.VERCEL_ENV === 'production';
}

/** Local-development mock ids (no Razorpay keys). Shaped like real ids, which the platform requires. */
export const MOCK_ORDER_PREFIX = 'order_devmock';

function hmacHex(secret: string, message: string): string {
  return createHmac('sha256', secret).update(message, 'utf8').digest('hex');
}

/** Constant-time comparison of two hex digests (false on any length or format mismatch). */
export function safeEqualHex(expected: string, received: string): boolean {
  if (!/^[0-9a-f]+$/i.test(received) || received.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(expected.toLowerCase(), 'utf8'), Buffer.from(received.toLowerCase(), 'utf8'));
}

/** Checkout handler signature: HMAC-SHA256(`${order_id}|${payment_id}`, key secret). */
export function verifyCheckoutSignature(
  { orderId, paymentId, signature }: { orderId: string; paymentId: string; signature: string },
  keySecret: string,
): boolean {
  if (!keySecret || !orderId || !paymentId || !signature) return false;
  return safeEqualHex(hmacHex(keySecret, `${orderId}|${paymentId}`), signature);
}

/** Webhook signature (X-Razorpay-Signature): HMAC-SHA256 of the raw request body with the webhook secret. */
export function verifyWebhookSignature(rawBody: string, signature: string | null | undefined, webhookSecret: string): boolean {
  if (!webhookSecret || !signature) return false;
  return safeEqualHex(hmacHex(webhookSecret, rawBody), signature.trim());
}

// ── Order notes: the registrant travels with the order ─────────────────────
export const FB_PRODUCT = 'future-builders';

/** At most 15 notes, each ≤ 256 characters (Razorpay limits); the registration schema caps lengths. */
export function orderNotes(registrant: Registrant, q: Quote, camp: Camp): Record<string, string> {
  const notes: Record<string, string> = {
    product: FB_PRODUCT,
    cohort: camp.slug,
    offer: q.offer.slug,
    parentName: registrant.parentName,
    studentName: registrant.studentName,
    email: registrant.email,
    phone: registrant.phone,
    grade: registrant.grade,
    coupon: q.coupon?.code ?? '',
    friendName: q.coupon?.needsFriendName ? (registrant.friendName ?? '') : '',
  };
  for (const [k, v] of Object.entries(notes)) notes[k] = v.slice(0, 256);
  return notes;
}

const notesSchema = z.object({
  product: z.literal(FB_PRODUCT),
  cohort: z.string().min(1),
  offer: z.enum(['diwali-2026', 'standard']),
  parentName: z.string().min(1),
  studentName: z.string().min(1),
  email: z.string().min(3),
  phone: z.string().regex(/^\+91[6-9]\d{9}$/),
  grade: z.string().min(1),
  coupon: z.string().optional().default(''),
  friendName: z.string().optional().default(''),
});
export type FbOrderNotes = z.infer<typeof notesSchema>;

/** The registrant from a Razorpay order's notes, or null when the order is not a Future Builders order. */
export function parseOrderNotes(notes: unknown): FbOrderNotes | null {
  const parsed = notesSchema.safeParse(Array.isArray(notes) ? {} : notes);
  return parsed.success ? parsed.data : null;
}

// ── Payment checks ────────────────────────────────────────────────────────
export interface OrderLike {
  id: string;
  amount: number | string;
  currency: string;
  notes?: unknown;
}

export interface PaymentLike {
  id: string;
  order_id?: string | null;
  amount: number | string;
  currency: string;
  status: string;
  /** Unix seconds. */
  created_at?: number;
}

export type PaymentCheck = { ok: true } | { ok: false; reason: string };

/** The fetched payment really pays this order, in full, in INR, and is captured. */
export function checkPayment(orderId: string, order: OrderLike, payment: PaymentLike): PaymentCheck {
  if (order.id !== orderId) return { ok: false, reason: 'order id mismatch' };
  if (payment.order_id !== orderId) return { ok: false, reason: 'payment belongs to another order' };
  if (order.currency !== 'INR' || payment.currency !== 'INR') return { ok: false, reason: 'currency is not INR' };
  if (Number(payment.amount) !== Number(order.amount)) return { ok: false, reason: 'amount differs from the order amount' };
  if (payment.status !== 'captured') return { ok: false, reason: `payment status is ${payment.status}` };
  return { ok: true };
}

/** The platform ingest body for a verified, captured payment. */
export function enrollmentPayload(
  order: OrderLike,
  payment: PaymentLike,
  notes: FbOrderNotes,
  source: EnrollmentPayload['source'],
  now: Date = new Date(),
): EnrollmentPayload {
  return {
    razorpayOrderId: order.id,
    razorpayPaymentId: payment.id,
    amountPaise: Number(payment.amount),
    currency: 'INR',
    paidAt: (payment.created_at ? new Date(payment.created_at * 1000) : now).toISOString(),
    cohort: notes.cohort,
    offer: notes.offer,
    coupon: notes.coupon || null,
    friendName: notes.friendName || null,
    parentName: notes.parentName,
    studentName: notes.studentName,
    email: notes.email,
    phone: notes.phone,
    grade: notes.grade,
    source,
  };
}
