/**
 * Server-only wiring for the Future Builders payment routes: Razorpay keys and client, and the
 * platform recorder. Never import from a client component (reads RAZORPAY_KEY_SECRET,
 * PLATFORM_EDGE_SECRET and FB_INGEST_KEY).
 *
 * Local development only (never in production, see isProductionRuntime): without Razorpay keys the
 * order is mocked, and without the ingest settings the registration is "recorded" with a dev receipt.
 */
import Razorpay from 'razorpay';
import { readIngestConfig, recordEnrollment, recordLead, type EnrollmentPayload, type EnrollmentResult, type LeadPayload, type LeadResult } from '@/lib/platform-ingest';
import type { RazorpayGateway } from './checkout';
import { isProductionRuntime, type OrderLike, type PaymentLike } from './razorpay';

type Env = Record<string, string | undefined>;

export interface RazorpayKeys {
  keyId: string;
  keySecret: string;
}

export function razorpayKeys(env: Env = process.env): RazorpayKeys | null {
  const keyId = env.RAZORPAY_KEY_ID?.trim();
  const keySecret = env.RAZORPAY_KEY_SECRET?.trim();
  return keyId && keySecret ? { keyId, keySecret } : null;
}

export function razorpayClient(keys: RazorpayKeys): Razorpay {
  return new Razorpay({ key_id: keys.keyId, key_secret: keys.keySecret });
}

export function razorpayGateway(client: Razorpay): RazorpayGateway {
  return {
    fetchOrder: async (orderId) => (await client.orders.fetch(orderId)) as unknown as OrderLike,
    fetchPayment: async (paymentId) => (await client.payments.fetch(paymentId)) as unknown as PaymentLike,
    capture: async (paymentId, amountPaise, currency) => (await client.payments.capture(paymentId, amountPaise, currency)) as unknown as PaymentLike,
  };
}

/** Dev-only stand-in so the whole flow can be clicked through locally without the platform. */
let devSeq = 0;
const devEnrollment = async (payload: EnrollmentPayload): Promise<EnrollmentResult> => {
  console.warn('[future-builders] FB_INGEST_KEY / PLATFORM_API_ORIGIN / PLATFORM_EDGE_SECRET not set: dev receipt, nothing recorded.', {
    order: payload.razorpayOrderId,
  });
  devSeq += 1;
  return { enrollmentId: `dev_${Date.now()}`, receiptNumber: `FB-DEV-${String(devSeq).padStart(6, '0')}`, created: true };
};
const devLead = async (payload: LeadPayload): Promise<LeadResult> => {
  console.warn('[future-builders] ingest not configured: dev lead, nothing recorded.', { kind: payload.kind, source: payload.source });
  return { leadId: `dev_${Date.now()}` };
};

export interface Recorders {
  /** clientIp: the parent's IP for the platform's per-IP rate limit (none for the webhook). */
  enrollment: (payload: EnrollmentPayload, clientIp?: string | null) => Promise<EnrollmentResult>;
  lead: (payload: LeadPayload, clientIp?: string | null) => Promise<LeadResult>;
}

/** Null in production when the ingest settings are missing (the routes then answer 503). */
export function platformRecorders(env: Env = process.env): Recorders | null {
  const config = readIngestConfig(env);
  if (config) {
    return { enrollment: (p, ip) => recordEnrollment(config, p, ip), lead: (p, ip) => recordLead(config, p, ip) };
  }
  if (isProductionRuntime(env)) return null;
  return { enrollment: devEnrollment, lead: devLead };
}
