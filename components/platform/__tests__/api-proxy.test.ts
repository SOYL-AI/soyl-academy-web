// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  buildResponseHeaders,
  buildUpstreamHeaders,
  clientIpFrom,
  proxyRequest,
  readProxyConfig,
  timeoutFor,
  upstreamPath,
  type ProxyConfig,
} from '../server/api-proxy';

// Generated per run so no secret-shaped literal lives in git (gitleaks).
const SECRET = `test-${crypto.randomUUID()}`;
const cfg: ProxyConfig = { origin: 'http://api.test', edgeSecret: SECRET, timeoutMs: 1000, maxBodyBytes: 1024 };

describe('readProxyConfig (ADR-005 item 1, GEN-4)', () => {
  const on = { NEXT_PUBLIC_PLATFORM_ENABLED: 'true', PLATFORM_API_ORIGIN: 'http://api.test/', PLATFORM_EDGE_SECRET: SECRET };
  it('is null when the flag is off, the origin is unset, or the secret is missing', () => {
    expect(readProxyConfig({ ...on, NEXT_PUBLIC_PLATFORM_ENABLED: 'false' })).toBeNull();
    expect(readProxyConfig({ ...on, PLATFORM_API_ORIGIN: undefined })).toBeNull();
    expect(readProxyConfig({ ...on, PLATFORM_EDGE_SECRET: '' })).toBeNull();
    expect(readProxyConfig({ ...on, PLATFORM_API_ORIGIN: 'http://api.test/some/path' })).toBeNull();
  });
  it('strips trailing slashes and defaults the timeout to 30 s', () => {
    expect(readProxyConfig(on)).toMatchObject({ origin: 'http://api.test', timeoutMs: 30_000 });
  });
  it('never reads a NEXT_PUBLIC_ secret (WEB-11)', () => {
    expect(readProxyConfig({ ...on, PLATFORM_EDGE_SECRET: undefined, NEXT_PUBLIC_PLATFORM_EDGE_SECRET: SECRET })).toBeNull();
  });
});

describe('upstreamPath (ADR-005 item 2)', () => {
  it.each([
    ['/api/platform/v1/session', 'v1/session'],
    ['/api/platform/v1/catalog/cbse/10/subjects', 'v1/catalog/cbse/10/subjects'],
    ['/api/platform/v1/catalog/subjects/cbse-10-science/chapters', 'v1/catalog/subjects/cbse-10-science/chapters'],
    ['/api/platform/v1/me/', 'v1/me/'],
  ])('allows %s', (input, expected) => {
    expect(upstreamPath(input)).toBe(expected);
  });
  it.each([
    '/api/platform/healthz',
    '/api/platform/readyz',
    '/api/platform/v2/session',
    '/api/platform/v1/../healthz',
    '/api/platform/v1/./me',
    '/api/platform/v1//me',
    '/api/platform/v1/%2e%2e/healthz',
    '/api/platform/v1/me%2Fsessions',
    '/api/platform/v1/me%5Csessions',
    '/api/platform/v1/me\\sessions',
    '/api/platformv1/session',
    '/api/enroll',
    '/api/platform/',
  ])('rejects %s', (input) => {
    expect(upstreamPath(input)).toBeNull();
  });
});

describe('buildUpstreamHeaders (ADR-005 item 4, WEB-2)', () => {
  const incoming = new Headers({
    accept: 'application/json',
    'accept-language': 'en-IN',
    'content-type': 'application/json',
    'content-length': '17',
    cookie: 'soyl_session=abc',
    origin: 'http://localhost:3000',
    'user-agent': 'UA',
    'if-none-match': 'W/"1"',
    host: 'evil.example',
    'x-forwarded-for': '6.6.6.6',
    'x-forwarded-host': 'evil.example',
    forwarded: 'for=6.6.6.6',
    'x-real-ip': '203.0.113.7',
    'x-soyl-edge-auth': 'attacker',
    'x-soyl-client-ip': '6.6.6.6',
    authorization: 'Bearer x',
    referer: 'http://localhost:3000/learn',
  });
  const out = buildUpstreamHeaders(incoming, { edgeSecret: SECRET });

  it('overwrites a client-supplied edge secret with the server secret', () => {
    expect(out.get('x-soyl-edge-auth')).toBe(SECRET);
  });
  it('sets the client IP from x-real-ip only, overwriting a client-supplied value', () => {
    expect(out.get('x-soyl-client-ip')).toBe('203.0.113.7');
  });
  it('forwards exactly the allowlist', () => {
    expect([...out.keys()].sort()).toEqual(
      ['accept', 'accept-language', 'content-length', 'content-type', 'cookie', 'if-none-match', 'origin', 'user-agent', 'x-soyl-client-ip', 'x-soyl-edge-auth'].sort(),
    );
    expect(out.get('origin')).toBe('http://localhost:3000');
    expect(out.get('cookie')).toBe('soyl_session=abc');
  });
  it('drops a malformed content-length and an x-real-ip that is not an IP literal', () => {
    const h = buildUpstreamHeaders(new Headers({ 'content-length': '1e3', 'x-real-ip': '1.2.3.4, 5.6.7.8' }), { edgeSecret: SECRET });
    expect(h.has('content-length')).toBe(false);
    expect(h.has('x-soyl-client-ip')).toBe(false);
  });
  it('accepts IPv6 literals', () => {
    expect(clientIpFrom(new Headers({ 'x-real-ip': '2001:db8::1' }))).toBe('2001:db8::1');
    expect(clientIpFrom(new Headers({ 'x-real-ip': '<script>' }))).toBeNull();
  });
});

describe('buildResponseHeaders (ADR-005 items 7, 9)', () => {
  it('passes the allowlist and every set-cookie, nothing else', () => {
    const up = new Headers();
    up.set('content-type', 'application/json; charset=utf-8');
    up.set('etag', 'W/"x"');
    up.set('x-trace-id', 't-1');
    up.set('location', 'http://localhost:3000/learn');
    up.set('clear-site-data', '"cookies"');
    up.set('retry-after', '30');
    up.set('server', 'fastify');
    up.set('x-powered-by', 'x');
    up.set('content-security-policy', "default-src 'none'");
    up.set('access-control-allow-origin', '*');
    up.set('content-encoding', 'gzip');
    up.append('set-cookie', 'soyl_session=a; Path=/; HttpOnly; SameSite=Lax');
    up.append('set-cookie', 'soyl_oauth=; Path=/; Max-Age=0');
    const out = buildResponseHeaders(up);
    expect(out.getSetCookie()).toEqual(['soyl_session=a; Path=/; HttpOnly; SameSite=Lax', 'soyl_oauth=; Path=/; Max-Age=0']);
    for (const dropped of ['server', 'x-powered-by', 'content-security-policy', 'access-control-allow-origin', 'content-encoding']) {
      expect(out.has(dropped), dropped).toBe(false);
    }
    expect(out.get('etag')).toBe('W/"x"');
    expect(out.get('location')).toBe('http://localhost:3000/learn');
    expect(out.get('clear-site-data')).toBe('"cookies"');
  });
  it('never lets a cookie-setting response be cached', () => {
    const up = new Headers({ 'cache-control': 'public, max-age=300' });
    up.append('set-cookie', 'a=b');
    expect(buildResponseHeaders(up).get('cache-control')).toBe('no-store');
  });
  it('keeps public catalog caching and defaults to no-store', () => {
    const pub = 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400';
    expect(buildResponseHeaders(new Headers({ 'cache-control': pub })).get('cache-control')).toBe(pub);
    expect(buildResponseHeaders(new Headers()).get('cache-control')).toBe('no-store');
  });
});

describe('timeoutFor', () => {
  it('gives streaming AI routes longer', () => {
    expect(timeoutFor('v1/session', cfg)).toBe(1000);
    expect(timeoutFor('v1/ai/tutor', cfg)).toBe(120_000);
  });
});

type Captured = { url: string; init: RequestInit & { duplex?: string } };

function upstream(response: Response | (() => Promise<Response>), captured: Captured[] = []): typeof fetch {
  return (async (url: string, init: RequestInit) => {
    captured.push({ url, init });
    if (init.body instanceof ReadableStream) {
      // Drain like a real server so the size limiter runs.
      const reader = (init.body as ReadableStream<Uint8Array>).getReader();
      for (;;) {
        const { done } = await reader.read();
        if (done) break;
      }
    }
    return typeof response === 'function' ? response() : response;
  }) as unknown as typeof fetch;
}

describe('proxyRequest', () => {
  it('forwards method, path, query, body and returns the upstream status and body', async () => {
    const captured: Captured[] = [];
    const res = await proxyRequest(
      new Request('http://localhost:3000/api/platform/v1/auth/email/send-otp?x=1', {
        method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'http://localhost:3000', 'x-soyl-edge-auth': 'x' },
        body: JSON.stringify({ email: 'a@example.com' }),
      }),
      cfg,
      upstream(new Response('{"sent":true,"resendAfterSeconds":30}', { status: 200, headers: { 'content-type': 'application/json' } }), captured),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ sent: true, resendAfterSeconds: 30 });
    expect(captured[0]!.url).toBe('http://api.test/v1/auth/email/send-otp?x=1');
    expect(captured[0]!.init.method).toBe('POST');
    expect(captured[0]!.init.redirect).toBe('manual');
    expect(captured[0]!.init.duplex).toBe('half');
    expect((captured[0]!.init.headers as Headers).get('x-soyl-edge-auth')).toBe(SECRET);
  });

  it('passes 302 redirects through (Google start/callback)', async () => {
    const res = await proxyRequest(
      new Request('http://localhost:3000/api/platform/v1/auth/google/start?returnTo=%2Flearn'),
      cfg,
      upstream(new Response(null, { status: 302, headers: { location: 'http://127.0.0.1:8090/authorize?x=1' } })),
    );
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('http://127.0.0.1:8090/authorize?x=1');
  });

  it('handles 204 and 304 without a body', async () => {
    const r204 = await proxyRequest(new Request('http://l/api/platform/v1/auth/sign-out', { method: 'POST' }), cfg, upstream(new Response(null, { status: 204 })));
    expect(r204.status).toBe(204);
    const r304 = await proxyRequest(new Request('http://l/api/platform/v1/catalog/boards'), cfg, upstream(new Response(null, { status: 304, headers: { etag: 'W/"1"' } })));
    expect(r304.status).toBe(304);
    expect(r304.headers.get('etag')).toBe('W/"1"');
  });

  it('streams the response body (SSE-ready)', async () => {
    const enc = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(enc.encode('data: 1\n\n'));
        c.enqueue(enc.encode('data: 2\n\n'));
        c.close();
      },
    });
    const res = await proxyRequest(new Request('http://l/api/platform/v1/ai/tutor', { method: 'POST', body: '{}' }), cfg, upstream(new Response(stream, { headers: { 'content-type': 'text/event-stream', 'cache-control': 'no-store' } })));
    expect(res.headers.get('content-type')).toBe('text/event-stream');
    expect(await res.text()).toBe('data: 1\n\ndata: 2\n\n');
  });

  it('returns 404 problem+json for paths outside the allowlist without calling upstream', async () => {
    const captured: Captured[] = [];
    const res = await proxyRequest(new Request('http://l/api/platform/healthz'), cfg, upstream(new Response('x'), captured));
    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toContain('application/problem+json');
    expect(captured).toHaveLength(0);
  });

  it('405 for HEAD and OPTIONS', async () => {
    for (const method of ['HEAD', 'OPTIONS']) {
      const res = await proxyRequest(new Request('http://l/api/platform/v1/session', { method }), cfg, upstream(new Response('x')));
      expect(res.status).toBe(405);
    }
  });

  it('413 when the declared or streamed body is too large', async () => {
    const big = 'x'.repeat(2048);
    const declared = await proxyRequest(new Request('http://l/api/platform/v1/me/merge-guest', { method: 'POST', body: big, headers: { 'content-length': '2048' } }), cfg, upstream(new Response('{}')));
    expect(declared.status).toBe(413);
    const streamed = await proxyRequest(
      new Request('http://l/api/platform/v1/me/merge-guest', {
        method: 'POST',
        body: new ReadableStream({
          start(c) {
            c.enqueue(new TextEncoder().encode(big));
            c.close();
          },
        }),
        duplex: 'half',
      } as RequestInit),
      cfg,
      upstream(new Response('{}')),
    );
    expect(streamed.status).toBe(413);
  });

  it('502 problem+json when the API is unreachable, without leaking the error', async () => {
    const res = await proxyRequest(
      new Request('http://l/api/platform/v1/session'),
      cfg,
      (async () => {
        throw new TypeError('connect ECONNREFUSED 10.0.0.5:8080');
      }) as unknown as typeof fetch,
    );
    expect(res.status).toBe(502);
    const text = await res.text();
    expect(JSON.parse(text)).toMatchObject({ status: 502, code: 'upstream_unavailable' });
    expect(text).not.toContain('ECONNREFUSED');
  });

  it('504 on upstream timeout', async () => {
    const res = await proxyRequest(
      new Request('http://l/api/platform/v1/session'),
      { ...cfg, timeoutMs: 20 },
      ((_: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(init.signal?.reason));
        })) as unknown as typeof fetch,
    );
    expect(res.status).toBe(504);
  });
});
