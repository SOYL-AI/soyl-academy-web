/**
 * Signed-webhook simulator (OA-04 stand-in): turns a stub event into the exact HTTP request Razorpay
 * sends — raw JSON body, `X-Razorpay-Signature` (hex HMAC-SHA256 of the body with the webhook secret)
 * and `X-Razorpay-Event-Id`. Used by tests, local development and the replay runbook's dry runs.
 */
import { EVENT_ID_HEADER, SIGNATURE_HEADER, webhookSignature } from './signature';
import type { SimEvent } from './stub';

export interface SignedWebhook {
  rawBody: string;
  headers: Record<string, string>;
}

export function signWebhook(ev: SimEvent, secret: string, opts: { rawBody?: string; eventId?: string } = {}): SignedWebhook {
  const rawBody = opts.rawBody ?? JSON.stringify(ev.body);
  return {
    rawBody,
    headers: {
      'content-type': 'application/json',
      [SIGNATURE_HEADER]: webhookSignature(rawBody, secret),
      [EVENT_ID_HEADER]: opts.eventId ?? ev.eventId,
    },
  };
}
