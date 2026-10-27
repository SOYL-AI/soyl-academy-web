// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { buildResponseHeaders, buildUpstreamHeaders, proxyRequest, type ProxyConfig } from '../server/api-proxy';
import { buildCsp, isPlansPath, securityHeaders, uploadOriginFrom, usesNonce } from '../server/security-headers';

const SECRET = `test-${crypto.randomUUID()}`;
const cfg: ProxyConfig = { origin: 'http://api.test', edgeSecret: SECRET, timeoutMs: 1000, maxBodyBytes: 300 * 1024 };

describe('CSP per page (WEB-1, WEB-3, ADR-018 §4)', () => {
  it('Razorpay Checkout origins only on /plans; COOP allows its popups there only', () => {
    const plans = buildCsp({ pathname: '/plans' });
    expect(plans).toContain("script-src 'self' 'unsafe-inline' https://checkout.razorpay.com");
    expect(plans).toContain('frame-src https://api.razorpay.com https://checkout.razorpay.com');
    expect(plans).toContain("connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com");
    expect(plans).toContain('https://cdn.razorpay.com');
    for (const path of ['/learn', '/tests', '/tests/series/cbse/10/science', '/ask', '/me', '/plansx', '/leaderboard', '/coins', '/store']) {
      const csp = buildCsp({ pathname: path, nonce: usesNonce(path) ? 'n' : undefined });
      expect(csp, path).not.toContain('razorpay');
      expect(csp, path).toContain("frame-src 'none'");
    }
    expect(isPlansPath('/plans/x')).toBe(true);
    expect(securityHeaders({ origin: 'https://x', pathname: '/plans' })['cross-origin-opener-policy']).toBe('same-origin-allow-popups');
    expect(securityHeaders({ origin: 'https://x', pathname: '/ask' })['cross-origin-opener-policy']).toBe('same-origin');
  });

  it('the upload origin joins connect-src only on upload pages; https (or loopback http) only', () => {
    const blob = 'https://soylprodst.blob.core.windows.net';
    expect(buildCsp({ pathname: '/ask', nonce: 'n', uploadOrigin: `${blob}/uploads-quarantine` })).toContain(`connect-src 'self' ${blob};`);
    expect(buildCsp({ pathname: '/tests/builder', nonce: 'n', uploadOrigin: blob })).toContain(`connect-src 'self' ${blob};`);
    expect(buildCsp({ pathname: '/learn', uploadOrigin: blob })).toContain("connect-src 'self';");
    expect(buildCsp({ pathname: '/store', nonce: 'n', uploadOrigin: blob })).toContain("connect-src 'self';");
    expect(uploadOriginFrom('http://evil.example')).toBeNull();
    expect(uploadOriginFrom('http://127.0.0.1:8799/x')).toBe('http://127.0.0.1:8799');
    expect(uploadOriginFrom('not a url')).toBeNull();
  });

  it('logged-in M3/M4 pages use the nonce policy', () => {
    for (const p of ['/tests/attempt/x', '/tests/result/x', '/tests/builder', '/tests/live/e', '/ask', '/leaderboard', '/coins', '/store']) expect(usesNonce(p), p).toBe(true);
    for (const p of ['/tests', '/tests/series/cbse/10/science', '/plans']) expect(usesNonce(p), p).toBe(false);
  });
});

describe('proxy: path-scoped headers and SSE (ADR-018 §2)', () => {
  const incoming = new Headers({
    'content-type': 'application/json',
    'idempotency-key': 'abc-12345678', // gitleaks:allow (placeholder idempotency key)
    'x-razorpay-signature': 'a'.repeat(64),
    'x-razorpay-event-id': 'evt_123',
  });
  it('Idempotency-Key only to AI routes; Razorpay headers only to the webhook', () => {
    const ai = buildUpstreamHeaders(incoming, cfg, 'v1/ai/quick-doubt');
    expect(ai.get('idempotency-key')).toBe('abc-12345678');
    expect(ai.get('x-razorpay-signature')).toBeNull();
    expect(buildUpstreamHeaders(incoming, cfg, 'v1/attempts/x/ai-evaluation').get('idempotency-key')).toBe('abc-12345678');
    const hook = buildUpstreamHeaders(incoming, cfg, 'v1/webhooks/razorpay');
    expect(hook.get('x-razorpay-signature')).toBe('a'.repeat(64));
    expect(hook.get('x-razorpay-event-id')).toBe('evt_123');
    expect(hook.get('idempotency-key')).toBeNull();
    const other = buildUpstreamHeaders(incoming, cfg, 'v1/session');
    expect(other.get('idempotency-key')).toBeNull();
    expect(other.get('x-razorpay-signature')).toBeNull();
    expect(buildUpstreamHeaders(new Headers({ 'idempotency-key': 'bad key <x>' }), cfg, 'v1/ai/quick-doubt').get('idempotency-key')).toBeNull();
  });

  it('the webhook body reaches the API byte for byte (HMAC still valid)', async () => {
    const raw = '{"entity":"event",  "event":"subscription.activated","payload":{"a":1}}\n';
    let seen: { body: string; headers: Headers } | null = null;
    const fetchImpl = (async (_url: string, init: RequestInit) => {
      seen = { body: await new Response(init.body as BodyInit).text(), headers: init.headers as Headers };
      return new Response('{"received":true}', { status: 200, headers: { 'content-type': 'application/json' } });
    }) as unknown as typeof fetch;
    const req = new Request('http://web.test/api/platform/v1/webhooks/razorpay', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-razorpay-signature': 'f'.repeat(64), 'x-razorpay-event-id': 'evt_1' },
      body: raw,
    });
    const res = await proxyRequest(req, cfg, fetchImpl);
    expect(res.status).toBe(200);
    expect(seen!.body).toBe(raw);
    expect(seen!.headers.get('x-razorpay-signature')).toBe('f'.repeat(64));
    expect(seen!.headers.get('cookie')).toBeNull();
  });

  it('event streams are not buffered by compression (no-transform)', () => {
    const h = buildResponseHeaders(new Headers({ 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-store' }));
    expect(h.get('cache-control')).toBe('no-store, no-transform');
    expect(h.get('x-accel-buffering')).toBe('no');
    expect(buildResponseHeaders(new Headers({ 'content-type': 'application/json' })).get('x-accel-buffering')).toBeNull();
  });
});
