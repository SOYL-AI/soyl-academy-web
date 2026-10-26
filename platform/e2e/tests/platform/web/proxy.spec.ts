import { expect, test } from './fixtures';

/**
 * The same-domain proxy against the real API (ADR-005 web side, WEB-2). Header logic itself is unit-tested
 * (components/platform/__tests__/api-proxy.test.ts).
 */
test('a client-supplied edge secret is overwritten (the API accepts the request)', async ({ request }) => {
  const res = await request.get('/api/platform/v1/session', { headers: { 'x-soyl-edge-auth': 'attacker', 'x-forwarded-for': '6.6.6.6' } });
  expect(res.status()).toBe(200);
  expect((await res.json()).authenticated).toBe(false);
  expect(res.headers()['cache-control']).toBe('no-store');
  expect(res.headers()['x-trace-id']).toBeTruthy();
  expect(res.headers()['server']).toBeUndefined();
  expect(res.headers()['access-control-allow-origin']).toBeUndefined();
});

test('catalog responses keep their public caching and ETag; If-None-Match → 304', async ({ request }) => {
  const res = await request.get('/api/platform/v1/catalog/boards');
  expect(res.status()).toBe(200);
  expect(res.headers()['cache-control']).toContain('public');
  const etag = res.headers()['etag']!;
  expect(etag).toBeTruthy();
  const again = await request.get('/api/platform/v1/catalog/boards', { headers: { 'if-none-match': etag } });
  expect(again.status()).toBe(304);
});

test('path allowlist, methods, problem+json', async ({ request }) => {
  for (const path of ['/api/platform/healthz', '/api/platform/readyz', '/api/platform/v1/%2e%2e/healthz', '/api/platform/v2/session', '/api/platform/v1/me%2Fsessions']) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(404);
  }
  expect((await request.head('/api/platform/v1/session')).status()).toBe(405);
  expect((await request.fetch('/api/platform/v1/session', { method: 'OPTIONS' })).status()).toBe(405);
  const unauth = await request.get('/api/platform/v1/me');
  expect(unauth.status()).toBe(401);
  expect(unauth.headers()['content-type']).toContain('application/problem+json');
});

test('CSRF: the browser Origin is forwarded unchanged and checked by the API (AUTH-12)', async ({ request, baseURL }) => {
  const evil = await request.post('/api/platform/v1/auth/email/send-otp', { headers: { origin: 'https://evil.example', 'content-type': 'application/json' }, data: { email: 'x@example.com' } });
  expect(evil.status()).toBe(403);
  const ok = await request.post('/api/platform/v1/auth/email/send-otp', { headers: { origin: new URL(baseURL!).origin, 'content-type': 'application/json' }, data: { email: `csrf-${Date.now()}@example.com` } });
  expect(ok.status()).toBe(200);
});

test('oversized bodies are refused before reaching the API', async ({ request, baseURL }) => {
  const res = await request.post('/api/platform/v1/me/merge-guest', {
    headers: { origin: new URL(baseURL!).origin, 'content-type': 'application/json' },
    data: 'x'.repeat(300 * 1024),
  });
  expect(res.status()).toBe(413);
});

test('CSP report endpoint accepts reports and answers 204', async ({ request }) => {
  const res = await request.post('/api/platform/csp-report', {
    headers: { 'content-type': 'application/csp-report' },
    data: JSON.stringify({ 'csp-report': { 'document-uri': 'http://localhost/learn', 'effective-directive': 'script-src', 'blocked-uri': 'inline' } }),
  });
  expect(res.status()).toBe(204);
});
