/**
 * Same-domain API proxy, web side of ADR-005 (D-016, D-018, WEB-2, WEB-11).
 *
 * `app/(platform)/api/platform/[...path]/route.ts` calls `proxyRequest` for every method. Pure functions
 * here are unit-tested in `components/platform/__tests__/api-proxy.test.ts`. Server only: reads
 * PLATFORM_EDGE_SECRET (never NEXT_PUBLIC_, WEB-11).
 */
import { readFlags } from '@/platform/shared/config/flags';

type Env = Record<string, string | undefined>;

export interface ProxyConfig {
  /** e.g. https://api-soyl.example (no trailing slash). */
  origin: string;
  /** Edge secret sent as x-soyl-edge-auth (D-016). */
  edgeSecret: string;
  /** Default upstream timeout (ADR-005 item 6: 30 s). */
  timeoutMs: number;
  /** Request bodies above this are refused here (the API enforces tighter per-route limits, API-5). */
  maxBodyBytes: number;
}

export const PROXY_PREFIX = '/api/platform/';
export const EDGE_AUTH_HEADER = 'x-soyl-edge-auth';
export const CLIENT_IP_HEADER = 'x-soyl-client-ip';

/** ADR-005 item 2. Percent signs are not allowed, so encoded slashes/backslashes/dots can never pass. */
export const UPSTREAM_PATH_RE = /^v1\/[A-Za-z0-9/_\-.:]*$/;

/** ADR-005 item 4: the only request headers forwarded from the browser. */
export const FORWARDED_REQUEST_HEADERS = ['accept', 'accept-language', 'content-type', 'content-length', 'cookie', 'origin', 'user-agent', 'if-none-match'] as const;

/** ADR-005 item 7: the only response headers passed back (plus every set-cookie). */
export const PASSED_RESPONSE_HEADERS = ['content-type', 'cache-control', 'etag', 'location', 'retry-after', 'clear-site-data', 'x-trace-id'] as const;

export const PROXY_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;

/** Largest JSON body any API route accepts (merge-guest / autosave, 256 KB) plus headroom. */
export const DEFAULT_MAX_BODY_BYTES = 256 * 1024 + 1024;

/**
 * Returns null when the proxy must act as if it does not exist (ADR-005 item 1, GEN-4): platform flag
 * off, PLATFORM_API_ORIGIN unset, or no edge secret configured.
 */
export function readProxyConfig(env: Env = process.env): ProxyConfig | null {
  if (!readFlags(env).platformEnabled) return null;
  const origin = env.PLATFORM_API_ORIGIN?.trim().replace(/\/+$/, '');
  const edgeSecret = env.PLATFORM_EDGE_SECRET?.trim();
  if (!origin || !edgeSecret) return null;
  if (!/^https?:\/\/[^/?#]+$/i.test(origin)) return null;
  const timeout = Number(env.PLATFORM_API_TIMEOUT_MS);
  return {
    origin,
    edgeSecret,
    timeoutMs: Number.isFinite(timeout) && timeout > 0 ? timeout : 30_000,
    maxBodyBytes: DEFAULT_MAX_BODY_BYTES,
  };
}

/**
 * `/api/platform/v1/catalog/boards` → `v1/catalog/boards`. Null for anything outside the allowlist:
 * other prefixes, `..` / `.` / empty segments, percent-encoding, backslashes, health endpoints.
 * Works on the raw (still percent-encoded) pathname.
 */
export function upstreamPath(rawPathname: string): string | null {
  if (!rawPathname.startsWith(PROXY_PREFIX)) return null;
  const path = rawPathname.slice(PROXY_PREFIX.length);
  if (!UPSTREAM_PATH_RE.test(path)) return null;
  const segments = path.split('/');
  if (segments.some((s, i) => s === '..' || s === '.' || (s === '' && i !== segments.length - 1))) return null;
  return path;
}

/** Accepts only a plain IPv4/IPv6 literal (what Vercel puts in x-real-ip); anything else is dropped. */
export function clientIpFrom(incoming: Headers): string | null {
  const raw = incoming.get('x-real-ip')?.trim();
  if (!raw || raw.length > 45) return null;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(raw)) return raw;
  if (/^[0-9a-f:.]+$/i.test(raw) && raw.includes(':')) return raw;
  return null;
}

/**
 * ADR-005 item 4: a fresh header set with only the allowlist, then the edge secret and client IP
 * **set** (overwriting anything the browser sent: host, x-forwarded-*, forwarded, x-real-ip, x-soyl-* are
 * never copied).
 */
export function buildUpstreamHeaders(incoming: Headers, cfg: Pick<ProxyConfig, 'edgeSecret'>): Headers {
  const out = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = incoming.get(name);
    if (value !== null) out.set(name, value);
  }
  const length = out.get('content-length');
  if (length !== null && !/^\d{1,9}$/.test(length)) out.delete('content-length');
  out.set(EDGE_AUTH_HEADER, cfg.edgeSecret);
  const ip = clientIpFrom(incoming);
  if (ip) out.set(CLIENT_IP_HEADER, ip);
  return out;
}

/**
 * ADR-005 items 7 and 9: pass only the allowlisted headers and every set-cookie (attributes untouched);
 * never let a response that sets a cookie, or one without explicit caching, be cached.
 */
export function buildResponseHeaders(upstream: Headers): Headers {
  const out = new Headers();
  for (const name of PASSED_RESPONSE_HEADERS) {
    const value = upstream.get(name);
    if (value !== null) out.set(name, value);
  }
  const cookies = typeof upstream.getSetCookie === 'function' ? upstream.getSetCookie() : [];
  for (const cookie of cookies) out.append('set-cookie', cookie);
  if (cookies.length > 0 || !out.has('cache-control')) out.set('cache-control', 'no-store');
  out.set('x-content-type-options', 'nosniff');
  out.set('referrer-policy', 'no-referrer');
  return out;
}

/** Small RFC 7807 body. Never includes upstream error text (ADR-005 item 8). */
export function problemResponse(status: number, code: string, title: string, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify({ type: 'about:blank', title, status, code }), {
    status,
    headers: {
      'content-type': 'application/problem+json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...extraHeaders,
    },
  });
}

/** Upstream timeout per path: the default, longer for streaming AI routes (M4). */
export function timeoutFor(path: string, cfg: Pick<ProxyConfig, 'timeoutMs'>): number {
  return path.startsWith('v1/ai/') ? Math.max(cfg.timeoutMs, 120_000) : cfg.timeoutMs;
}

class BodyTooLarge extends Error {}

/** Streams the request body through, erroring once more than `max` bytes have passed. */
function limitBody(body: ReadableStream<Uint8Array>, max: number, onTooLarge: () => void): ReadableStream<Uint8Array> {
  let seen = 0;
  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        seen += chunk.byteLength;
        if (seen > max) {
          onTooLarge();
          controller.error(new BodyTooLarge('body too large'));
          return;
        }
        controller.enqueue(chunk);
      },
    }),
  );
}

const NULL_BODY_STATUS = new Set([101, 204, 205, 304]);

/** The whole proxy. `fetchImpl` is injectable for tests. */
export async function proxyRequest(request: Request, cfg: ProxyConfig, fetchImpl: typeof fetch = fetch): Promise<Response> {
  const method = request.method.toUpperCase();
  if (!(PROXY_METHODS as readonly string[]).includes(method)) {
    return problemResponse(405, 'method_not_allowed', 'Method not allowed', { allow: PROXY_METHODS.join(', ') });
  }
  const url = new URL(request.url);
  const path = upstreamPath(url.pathname);
  if (!path) return problemResponse(404, 'not_found', 'Not found');

  const headers = buildUpstreamHeaders(request.headers, cfg);
  const declared = Number(headers.get('content-length') ?? '0');
  if (declared > cfg.maxBodyBytes) return problemResponse(413, 'payload_too_large', 'Request body too large');

  let tooLarge = false;
  const hasBody = method !== 'GET' && request.body !== null;
  const init: RequestInit & { duplex?: 'half' } = {
    method,
    headers,
    redirect: 'manual',
    cache: 'no-store',
    signal: AbortSignal.any([request.signal, AbortSignal.timeout(timeoutFor(path, cfg))]),
  };
  if (hasBody) {
    init.body = limitBody(request.body as ReadableStream<Uint8Array>, cfg.maxBodyBytes, () => {
      tooLarge = true;
    });
    init.duplex = 'half';
  }

  let upstream: Response;
  try {
    upstream = await fetchImpl(`${cfg.origin}/${path}${url.search}`, init);
  } catch (err) {
    if (tooLarge) return problemResponse(413, 'payload_too_large', 'Request body too large');
    const name = (err as { name?: string } | null)?.name;
    if (name === 'TimeoutError') return problemResponse(504, 'upstream_timeout', 'The service took too long to respond');
    if (name === 'AbortError' && request.signal.aborted) return new Response(null, { status: 499 });
    return problemResponse(502, 'upstream_unavailable', 'The service is unavailable. Please try again.');
  }

  const body = NULL_BODY_STATUS.has(upstream.status) ? null : upstream.body;
  return new Response(body, { status: upstream.status, headers: buildResponseHeaders(upstream.headers) });
}
