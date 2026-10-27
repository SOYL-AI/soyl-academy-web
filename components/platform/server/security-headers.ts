/**
 * Security headers and Content Security Policy for platform pages (WEB-3, WEB-4; ADR-011).
 * Applied by the root `proxy.ts`, whose matcher lists only platform prefixes (ARCHITECTURE §17.5).
 *
 * Two script policies:
 * - **nonce** for the logged-in, dynamically rendered routes (`/me`, later `/tests/attempt`, `/tests/result`,
 *   `/ask`, `/admin`): a fresh nonce per request + `'strict-dynamic'`. Next.js reads the nonce from the request
 *   CSP header and stamps it on its own scripts. The root layout's inline consent boot script is allowed by
 *   its SHA-256 hash.
 * - **static** for prerendered/ISR routes (`/learn/**`): no per-request nonce is possible in cached HTML, and
 *   Next's inline flight-data scripts change per page, so `script-src 'self' 'unsafe-inline'` (F-010 exception,
 *   recorded in ADR-011). Never a third-party host.
 */
import { createHash, randomBytes } from 'node:crypto';
import { CONSENT_BOOT_SCRIPT } from '@/components/legal/consent';

export const CSP_REPORT_PATH = '/api/platform/csp-report';

/** Route prefixes rendered per request with a nonce policy (WEB-3). */
export const NONCE_ROUTE_PREFIXES: readonly string[] = ['/me', '/tests/attempt', '/tests/result', '/tests/builder', '/tests/live', '/ask', '/leaderboard', '/coins', '/store', '/admin'];

/**
 * Razorpay Checkout origins, allowed on `/plans` only (WEB-1, WEB-3; billing M4 handoff §2; ADR-018 §4).
 * Verify against Razorpay test mode before launch (OA-04).
 */
export const RAZORPAY_CSP = {
  script: ['https://checkout.razorpay.com'],
  frame: ['https://api.razorpay.com', 'https://checkout.razorpay.com'],
  connect: ['https://api.razorpay.com', 'https://lumberjack.razorpay.com'],
  img: ['https://cdn.razorpay.com'],
} as const;

/** `/plans` and below: the only pages that may load Razorpay Checkout. */
export function isPlansPath(pathname: string | undefined): boolean {
  return pathname === '/plans' || (pathname?.startsWith('/plans/') ?? false);
}

/** Pages that PUT uploads straight to Blob storage (AI uploads, D-018/F-013): the upload origin joins connect-src. */
export const UPLOAD_ROUTE_PREFIXES: readonly string[] = ['/ask', '/tests/builder'];

export function usesUploads(pathname: string | undefined): boolean {
  return !!pathname && UPLOAD_ROUTE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * PLATFORM_UPLOAD_ORIGIN (server-only): the Blob account origin of the SAS upload URLs, e.g.
 * https://soylprodst.blob.core.windows.net. https only; plain http only for loopback hosts (local e2e).
 */
export function uploadOriginFrom(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol === 'https:') return u.origin;
    if (u.protocol === 'http:' && (u.hostname === '127.0.0.1' || u.hostname === 'localhost')) return u.origin;
  } catch {
    // ignore
  }
  return null;
}

export function usesNonce(pathname: string): boolean {
  return NONCE_ROUTE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function sha256Base64(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('base64');
}

/** `'sha256-…'` of the root layout's inline <head> script (components/legal/consent.ts). */
export const CONSENT_BOOT_SCRIPT_HASH = `'sha256-${sha256Base64(CONSENT_BOOT_SCRIPT)}'`;

export function createNonce(): string {
  return randomBytes(16).toString('base64');
}

export interface CspOptions {
  /** Per-request nonce → strict policy; omit for the static policy. */
  nonce?: string;
  /** `next dev` needs 'unsafe-eval' (React dev tooling). Never in production. */
  dev?: boolean;
  /** https requests get upgrade-insecure-requests (and HSTS, see securityHeaders). */
  https?: boolean;
  /** NEXT_PUBLIC_CDN_BASE_URL: images and audio may come from its origin. */
  cdnBaseUrl?: string;
  /** The page's path: `/plans` adds Razorpay Checkout, upload pages add the upload origin. */
  pathname?: string;
  /** PLATFORM_UPLOAD_ORIGIN (see uploadOriginFrom); defaults to the environment variable. */
  uploadOrigin?: string;
}

function cdnOrigin(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' ? u.origin : null;
  } catch {
    return null;
  }
}

export function buildCsp(o: CspOptions = {}): string {
  const cdn = cdnOrigin(o.cdnBaseUrl);
  const eval_ = o.dev ? " 'unsafe-eval'" : '';
  const plans = isPlansPath(o.pathname);
  const upload = usesUploads(o.pathname) ? uploadOriginFrom(o.uploadOrigin ?? process.env.PLATFORM_UPLOAD_ORIGIN) : null;
  const extra = (list: readonly string[]) => (plans ? ` ${list.join(' ')}` : '');
  const script = o.nonce
    ? `'self' 'nonce-${o.nonce}' 'strict-dynamic' ${CONSENT_BOOT_SCRIPT_HASH}${eval_}`
    : `'self' 'unsafe-inline'${eval_}${extra(RAZORPAY_CSP.script)}`;
  const directives = [
    `default-src 'self'`,
    `script-src ${script}`,
    // KaTeX and next/font emit inline styles (ADR-009).
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:${cdn ? ` ${cdn}` : ''}${extra(RAZORPAY_CSP.img)}`,
    `media-src 'self' blob:${cdn ? ` ${cdn}` : ''}`,
    `font-src 'self'`,
    `connect-src 'self'${upload ? ` ${upload}` : ''}${extra(RAZORPAY_CSP.connect)}`,
    `object-src 'none'`,
    `base-uri 'none'`,
    `form-action 'self'`,
    `frame-src ${plans ? RAZORPAY_CSP.frame.join(' ') : "'none'"}`,
    `frame-ancestors 'none'`,
    `worker-src 'self' blob:`,
    `manifest-src 'self'`,
    ...(o.https ? ['upgrade-insecure-requests'] : []),
    `report-uri ${CSP_REPORT_PATH}`,
    `report-to csp`,
  ];
  return directives.join('; ');
}

/** WEB-4 headers (plus the CSP and its reporting endpoint). */
export function securityHeaders(o: CspOptions & { origin: string }): Record<string, string> {
  const h: Record<string, string> = {
    'content-security-policy': buildCsp(o),
    'reporting-endpoints': `csp="${o.origin}${CSP_REPORT_PATH}"`,
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'permissions-policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    // Razorpay's UPI / 3-D Secure steps may open popups that must reach back (WEB-4, /plans only).
    'cross-origin-opener-policy': isPlansPath(o.pathname) ? 'same-origin-allow-popups' : 'same-origin',
    'x-frame-options': 'DENY',
  };
  if (o.https) h['strict-transport-security'] = 'max-age=63072000; includeSubDomains';
  return h;
}

export interface CspReportSummary {
  directive: string;
  /** Origin of the blocked resource, or a keyword such as `inline` / `eval`. Never a full URL. */
  blocked: string;
  /** Path of the page (no query string). */
  page: string;
}

function originOrKeyword(raw: unknown): string {
  if (typeof raw !== 'string' || raw === '') return 'unknown';
  try {
    return new URL(raw).origin;
  } catch {
    return raw.slice(0, 40).replace(/[^a-z0-9:-]/gi, '');
  }
}

function pathOnly(raw: unknown): string {
  if (typeof raw !== 'string') return 'unknown';
  try {
    return new URL(raw).pathname.slice(0, 200);
  } catch {
    return 'unknown';
  }
}

/** Reduces legacy `csp-report` and Reporting API payloads to non-personal summaries. */
export function summariseCspReport(text: string): CspReportSummary[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return [];
  }
  const out: CspReportSummary[] = [];
  const legacy = (data as { 'csp-report'?: Record<string, unknown> } | null)?.['csp-report'];
  if (legacy && typeof legacy === 'object') {
    out.push({
      directive: String(legacy['effective-directive'] ?? legacy['violated-directive'] ?? 'unknown').slice(0, 40),
      blocked: originOrKeyword(legacy['blocked-uri']),
      page: pathOnly(legacy['document-uri']),
    });
  }
  if (Array.isArray(data)) {
    for (const r of data) {
      const body = (r as { type?: string; body?: Record<string, unknown> })?.body;
      if ((r as { type?: string })?.type !== 'csp-violation' || !body) continue;
      out.push({
        directive: String(body.effectiveDirective ?? 'unknown').slice(0, 40),
        blocked: originOrKeyword(body.blockedURL),
        page: pathOnly(body.documentURL),
      });
    }
  }
  return out;
}
