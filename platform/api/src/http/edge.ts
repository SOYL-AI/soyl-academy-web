/**
 * Edge authentication (API-2, D-016, ADR-005) and trusted client IP (API-3).
 *
 * Every request to /v1/* must carry `x-soyl-edge-auth` equal to one of the configured secrets (one,
 * or two during rotation). The comparison hashes both sides to equal length and uses
 * crypto.timingSafeEqual, and checks every configured secret so timing does not reveal which one
 * matched. Failure: 403 problem+json plus a security log event. Health endpoints are exempt.
 *
 * The client IP header (default `x-soyl-client-ip`, set by the web proxy) is trusted only after edge
 * auth passed; Fastify's trustProxy is off, so X-Forwarded-For is never used.
 */
import { createHash, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';

export const EDGE_HEADER = 'x-soyl-edge-auth';

function digest(v: string): Buffer {
  return createHash('sha256').update(v, 'utf8').digest();
}

/** Index of the matching secret, or null. Constant time with respect to the secret values. */
export function matchEdgeSecret(presented: string | string[] | undefined, secrets: readonly string[]): number | null {
  if (typeof presented !== 'string' || presented.length === 0 || presented.length > 512) return null;
  const p = digest(presented);
  let match: number | null = null;
  secrets.forEach((s, i) => {
    if (timingSafeEqual(p, digest(s)) && match === null) match = i;
  });
  return match;
}

/** The trusted client IP from the edge header, if it is a valid IP literal. */
export function trustedClientIp(value: string | string[] | undefined): string | null {
  if (typeof value !== 'string') return null;
  const ip = value.trim();
  return isIP(ip) ? ip : null;
}
