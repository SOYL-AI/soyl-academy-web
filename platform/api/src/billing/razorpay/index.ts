/** Razorpay client from billing config: the real API, the stub (local/test; GEN-3), or none. */
import type { BillingConfig } from '../config';
import { RazorpayHttpClient } from './http';
import { RazorpayStub } from './stub';
import type { RazorpayClient } from './types';

export * from './types';
export { RazorpayHttpClient } from './http';
export { RazorpayStub, rzpId, type SimEvent } from './stub';
export { signWebhook, type SignedWebhook } from './webhook-simulator';
export { EVENT_ID_HEADER, SIGNATURE_HEADER, verifyWebhookSignature, webhookSignature } from './signature';

export function createRazorpayClient(config: BillingConfig, now: () => number = Date.now, opts: { fetch?: typeof fetch } = {}): RazorpayClient | null {
  if (config.provider === 'razorpay') return new RazorpayHttpClient({ keyId: config.keyId!, keySecret: config.keySecret!, baseUrl: config.apiBaseUrl, fetch: opts.fetch });
  if (config.provider === 'stub') return new RazorpayStub(config.keyId!, now);
  return null;
}
