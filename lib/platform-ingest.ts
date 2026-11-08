/**
 * Server-only client for the platform's Future Builders ingest API (replaces the Google Sheet).
 *
 *   POST {PLATFORM_API_ORIGIN}/v1/ingest/future-builders/enrollments  → 200 {enrollmentId, receiptNumber, created}
 *   POST {PLATFORM_API_ORIGIN}/v1/ingest/future-builders/leads        → 201 {leadId}
 *
 * Headers: x-soyl-edge-auth (PLATFORM_EDGE_SECRET) and x-soyl-ingest-key (FB_INGEST_KEY). Never import
 * this from a client component: both values must stay on the server (neither is NEXT_PUBLIC_).
 *
 * One timeout per attempt and one retry on network errors, timeouts, 429 and 5xx. Enrollments are
 * idempotent per Razorpay payment on the platform side, so a retry can never double-record (repeat
 * leads within 24 h return the first leadId).
 *
 * The platform rate-limits ingest per client IP (60/min), so calls made for a parent's browser request
 * forward that parent's IP as x-soyl-client-ip (see clientIpFrom); the Razorpay webhook sends none.
 * Platform errors: 401 ingest_auth_failed (bad FB_INGEST_KEY), 403 (no edge secret), 400 (validation):
 * none of these is retried.
 */
import { z } from 'zod';

type Env = Record<string, string | undefined>;
type FetchLike = (input: string, init: RequestInit) => Promise<Response>;

export const EDGE_AUTH_HEADER = 'x-soyl-edge-auth';
export const INGEST_KEY_HEADER = 'x-soyl-ingest-key';
export const CLIENT_IP_HEADER = 'x-soyl-client-ip';
export const ENROLLMENTS_PATH = '/v1/ingest/future-builders/enrollments';
export const LEADS_PATH = '/v1/ingest/future-builders/leads';

export interface IngestConfig {
  /** e.g. https://api.example (no trailing slash). */
  origin: string;
  edgeSecret: string;
  ingestKey: string;
  /** Per attempt. */
  timeoutMs: number;
  /** Pause before the single retry. */
  retryDelayMs: number;
  fetch: FetchLike;
}

/** Null when any of PLATFORM_API_ORIGIN, PLATFORM_EDGE_SECRET or FB_INGEST_KEY is missing or malformed. */
export function readIngestConfig(env: Env = process.env, fetchImpl: FetchLike = fetch): IngestConfig | null {
  const origin = env.PLATFORM_API_ORIGIN?.trim().replace(/\/+$/, '');
  const edgeSecret = env.PLATFORM_EDGE_SECRET?.trim();
  const ingestKey = env.FB_INGEST_KEY?.trim();
  if (!origin || !edgeSecret || !ingestKey) return null;
  if (!/^https?:\/\/[^/?#]+$/i.test(origin)) return null;
  return { origin, edgeSecret, ingestKey, timeoutMs: 8_000, retryDelayMs: 400, fetch: fetchImpl };
}

export class IngestError extends Error {
  constructor(
    message: string,
    /** HTTP status from the platform, if it answered. */
    readonly status?: number,
  ) {
    super(message);
    this.name = 'IngestError';
  }
}

const IPV4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
const IPV6 = /^[0-9a-f:.]{2,45}$/i;

/** A plain IPv4/IPv6 literal, or null. */
function ipLiteral(raw: string | null | undefined): string | null {
  const v = raw?.trim();
  if (!v || v.length > 45) return null;
  if (IPV4.test(v)) return v;
  return IPV6.test(v) && v.includes(':') ? v.toLowerCase() : null;
}

/**
 * The browser's IP from an incoming request on Vercel: the first x-forwarded-for hop, else x-real-ip.
 * Anything that isn't a plain IP literal is dropped (the header is then not sent).
 */
export function clientIpFrom(headers: Headers): string | null {
  const first = headers.get('x-forwarded-for')?.split(',')[0];
  return ipLiteral(first) ?? ipLiteral(headers.get('x-real-ip'));
}

const retryable = (status: number) => status === 429 || status >= 500;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function post<T>(config: IngestConfig, path: string, body: unknown, schema: z.ZodType<T>, clientIp?: string | null): Promise<T> {
  let lastError: IngestError | null = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    if (attempt > 1) await sleep(config.retryDelayMs);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);
    let res: Response;
    try {
      res = await config.fetch(`${config.origin}${path}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          [EDGE_AUTH_HEADER]: config.edgeSecret,
          [INGEST_KEY_HEADER]: config.ingestKey,
          ...(clientIp ? { [CLIENT_IP_HEADER]: clientIp } : {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
        cache: 'no-store',
      });
    } catch (err) {
      lastError = new IngestError(controller.signal.aborted ? `ingest timed out after ${config.timeoutMs} ms` : `ingest unreachable: ${(err as Error).message}`);
      continue;
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      lastError = new IngestError(`ingest answered ${res.status}`, res.status);
      if (retryable(res.status)) continue;
      throw lastError;
    }
    const json: unknown = await res.json().catch(() => null);
    const parsed = schema.safeParse(json);
    if (!parsed.success) throw new IngestError('ingest returned an unexpected body', res.status);
    return parsed.data;
  }
  throw lastError ?? new IngestError('ingest failed');
}

// ── Enrollments ───────────────────────────────────────────────────────────
export interface EnrollmentPayload {
  /** order_… */
  razorpayOrderId: string;
  /** pay_… */
  razorpayPaymentId: string;
  amountPaise: number;
  currency: 'INR';
  /** ISO timestamp. */
  paidAt: string;
  cohort: string;
  offer: 'diwali-2026' | 'standard';
  coupon: string | null;
  friendName: string | null;
  parentName: string;
  studentName: string;
  email: string;
  /** E.164: +91 and 10 digits starting 6–9. */
  phone: string;
  grade: string;
  source: 'checkout' | 'webhook';
}

const enrollmentResponse = z.object({
  enrollmentId: z.string().min(1),
  /** e.g. FB-2027-000001 */
  receiptNumber: z.string().min(1),
  created: z.boolean(),
});
export type EnrollmentResult = z.infer<typeof enrollmentResponse>;

export function recordEnrollment(config: IngestConfig, payload: EnrollmentPayload, clientIp?: string | null): Promise<EnrollmentResult> {
  return post(config, ENROLLMENTS_PATH, payload, enrollmentResponse, clientIp);
}

// ── Leads (call requests, notify-me, waitlist) ────────────────────────────
export interface LeadPayload {
  kind: 'callback' | 'notify' | 'waitlist';
  parentName: string;
  studentName?: string;
  email?: string;
  /** E.164, +91… */
  phone: string;
  grade?: string;
  /** Short slug of the form, e.g. fb_summer_2027. */
  source: string;
}

const leadResponse = z.object({ leadId: z.string().min(1) });
export type LeadResult = z.infer<typeof leadResponse>;

export function recordLead(config: IngestConfig, payload: LeadPayload, clientIp?: string | null): Promise<LeadResult> {
  return post(config, LEADS_PATH, payload, leadResponse, clientIp);
}
