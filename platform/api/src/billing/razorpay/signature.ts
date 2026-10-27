/**
 * Razorpay webhook signatures (AC-09, F-019): `X-Razorpay-Signature` is hex HMAC-SHA256 of the RAW
 * request body with the webhook secret. Verified over the exact bytes received, before parsing, in
 * constant time, against the current and (during rotation) previous secret.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const SIGNATURE_HEADER = 'x-razorpay-signature';
export const EVENT_ID_HEADER = 'x-razorpay-event-id';

const HEX_SHA256 = /^[0-9a-f]{64}$/i;

export function webhookSignature(rawBody: Buffer | string, secret: string): string {
  return createHmac('sha256', secret).update(rawBody).digest('hex');
}

/** Index of the matching secret (0 = current, 1 = previous), or null. Never throws on bad input. */
export function verifyWebhookSignature(rawBody: Buffer, header: unknown, secrets: readonly string[]): number | null {
  if (typeof header !== 'string' || !HEX_SHA256.test(header)) return null;
  const given = Buffer.from(header, 'hex');
  let match: number | null = null;
  // Compare against every secret (no early exit) so timing does not reveal which one matched.
  secrets.forEach((secret, i) => {
    const expected = Buffer.from(webhookSignature(rawBody, secret), 'hex');
    if (expected.length === given.length && timingSafeEqual(expected, given) && match === null) match = i;
  });
  return match;
}
