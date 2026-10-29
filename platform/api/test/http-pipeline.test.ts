/**
 * The request pipeline: edge auth (API-2), client IP (API-3), headers (API-4), body limits (API-5),
 * CSRF/Origin + content type (AUTH-12), flag off (GEN-4), errors (API-13), roles/fresh/MFA (API-6,
 * AUTH-9, AUTH-11), Host-header independence (API-1).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { BODY_LIMITS } from '@soyl/shared/config/security';
import { MEMBER_ROLES, STAFF_ROLES } from '../src/policy';
import { createHarness, PUBLIC_BASE, securityEvents, STAFF_EMAIL_TOTP, type Harness, type HarnessOptions } from './helpers';

let h: Harness;

/** A staff route with `policy.mfa` (enforced only when STAFF_AUTH.secondFactor is 'totp'). */
const adminOnlyProbe: NonNullable<HarnessOptions['extraRoutes']> = (app) => {
  app.get('/v1/test/admin-only', { config: { policy: { roles: [...STAFF_ROLES], csrf: true, rateLimit: { buckets: [] }, consent: false, mfa: true } } }, async () => ({ ok: true }));
};

beforeAll(async () => {
  h = await createHarness({
    extraRoutes: (app, services) => {
      // Probes for policy behaviours that M1 product routes do not exercise.
      adminOnlyProbe(app, services);
      app.get('/v1/test/parents', { config: { policy: { roles: ['parent'], csrf: true, rateLimit: { buckets: [] }, consent: false } } }, async () => ({ ok: true }));
      app.get('/v1/test/boom', { config: { policy: { roles: ['guest', ...MEMBER_ROLES], csrf: true, rateLimit: { buckets: [] }, consent: false } } }, async () => {
        const err = new Error('relation "secret_table" does not exist at character 15') as Error & { code: string };
        err.code = '42P01';
        throw err;
      });
      app.get(
        '/v1/test/bad-response',
        { config: { policy: { roles: ['guest'], csrf: true, rateLimit: { buckets: [] }, consent: false } }, schema: { response: { 200: z.object({ n: z.number() }) } } },
        async () => ({ n: 'not a number' }) as unknown as { n: number },
      );
      app.get(
        '/v1/test/strip',
        { config: { policy: { roles: ['guest'], csrf: true, rateLimit: { buckets: [] }, consent: false } }, schema: { response: { 200: z.object({ id: z.string() }) } } },
        async () => ({ id: 'x', answer: 'leak', solution_md: 'leak' }),
      );
    },
  });
});
afterAll(async () => {
  await h?.close();
});

describe('edge authentication (API-2)', () => {
  it('rejects /v1 requests without the edge secret with 403 problem+json and a security event', async () => {
    const res = await h.client().get('/v1/catalog/boards', { edge: null });
    expect(res.statusCode).toBe(403);
    expect(res.headers['content-type']).toBe('application/problem+json; charset=utf-8');
    expect(res.json()).toMatchObject({ code: 'edge_auth_failed', status: 403 });
    expect(securityEvents(h.logs, 'edge_auth_failed').length).toBeGreaterThan(0);
  });

  it('rejects a wrong secret, including one differing in a single character', async () => {
    expect((await h.client().get('/v1/session', { edge: 'nope' })).statusCode).toBe(403);
    const almost = h.edgeSecrets[0].slice(0, -1) + (h.edgeSecrets[0].endsWith('a') ? 'b' : 'a');
    expect((await h.client().get('/v1/session', { edge: almost })).statusCode).toBe(403);
  });

  it('accepts both secrets during rotation', async () => {
    expect((await h.client().get('/v1/session', { edge: h.edgeSecrets[0] })).statusCode).toBe(200);
    expect((await h.client().get('/v1/session', { edge: h.edgeSecrets[1] })).statusCode).toBe(200);
  });

  it('unknown /v1 paths are 403 without the secret and 404 with it', async () => {
    expect((await h.client().get('/v1/nowhere', { edge: null })).statusCode).toBe(403);
    expect((await h.client().get('/v1/nowhere')).statusCode).toBe(404);
  });

  it('health endpoints are exempt and reveal nothing internal', async () => {
    const live = await h.client().get('/healthz', { edge: null });
    expect(live.statusCode).toBe(200);
    expect(live.json()).toEqual({ status: 'ok' });
    const ready = await h.client().get('/readyz', { edge: null });
    expect(ready.statusCode).toBe(200);
    expect(ready.json()).toEqual({ status: 'ready' });
  });
});

describe('client IP (API-3)', () => {
  it('uses the edge-set header, never X-Forwarded-For, and only after edge auth', async () => {
    const c = h.client('198.51.100.7');
    await c.post('/v1/auth/email/send-otp', { email: 'ip-check@example.com' }, { headers: { 'x-forwarded-for': '1.2.3.4' } });
    const send = h.logs.filter((l) => l.auth === true && l.event === 'otp_send' && l.identifier === 'i***@example.com');
    expect(send.at(-1)?.ip).toBe('198.51.100.7');
    expect(JSON.stringify(h.logs)).not.toContain('1.2.3.4');
  });

  it('ignores an invalid client IP header (falls back to the socket address)', async () => {
    const c = h.client('not-an-ip');
    const res = await c.post('/v1/auth/email/send-otp', { email: 'ip-bad@example.com' });
    expect(res.statusCode).toBe(200);
    const send = h.logs.filter((l) => l.auth === true && l.event === 'otp_send' && l.identifier === 'i***@example.com').at(-1);
    expect(send?.ip).toBe('127.0.0.1');
  });
});

describe('CSRF and content type (AUTH-12)', () => {
  it('rejects a cross-origin POST carrying the victim cookie', async () => {
    const c = h.client();
    await c.signInEmail('csrf-victim@example.com');
    const res = await c.patch('/v1/me', { displayName: 'Hacked' }, { origin: 'https://evil.example' });
    expect(res.statusCode).toBe(403);
    expect(res.json().code).toBe('origin_not_allowed');
    expect(securityEvents(h.logs, 'origin_rejected').length).toBeGreaterThan(0);
  });

  it('rejects a missing Origin and lookalike origins', async () => {
    const c = h.client();
    expect((await c.post('/v1/auth/email/send-otp', { email: 'a@example.com' }, { origin: null })).statusCode).toBe(403);
    expect((await c.post('/v1/auth/email/send-otp', { email: 'a@example.com' }, { origin: `${PUBLIC_BASE}.evil.example` })).statusCode).toBe(403);
    expect((await c.post('/v1/auth/email/send-otp', { email: 'a@example.com' }, { origin: 'https://soylai-preview.vercel.app' })).statusCode).toBe(403);
    expect((await c.post('/v1/auth/email/send-otp', { email: 'a@example.com' }, { origin: 'null' })).statusCode).toBe(403);
  });

  it('form-encoded and text bodies get 415', async () => {
    const c = h.client();
    const form = await c.request('POST', '/v1/auth/email/send-otp', { rawBody: 'email=a%40example.com', headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    expect(form.statusCode).toBe(415);
    expect(form.json().code).toBe('unsupported_media_type');
    const text = await c.request('POST', '/v1/auth/email/send-otp', { rawBody: '{"email":"a@example.com"}', headers: { 'content-type': 'text/plain' } });
    expect(text.statusCode).toBe(415);
  });

  it('GET needs no Origin', async () => {
    expect((await h.client().get('/v1/session', { origin: null })).statusCode).toBe(200);
  });
});

describe('roles, MFA and fresh sessions', () => {
  it('401 for guests on member routes, 403 for the wrong role (logged as authz_denied)', async () => {
    expect((await h.client().get('/v1/me')).statusCode).toBe(401);
    const c = h.client();
    await c.signInEmail('role-student@example.com');
    const res = await c.get('/v1/test/parents');
    expect(res.statusCode).toBe(403);
    expect(securityEvents(h.logs, 'authz_denied').length).toBeGreaterThan(0);
  });

  it('staff routes need a second factor when STAFF_AUTH says totp; fails closed (AUTH-11, ADR-011)', async () => {
    const totp = await createHarness({ t: h.t, staffAuth: STAFF_EMAIL_TOTP, extraRoutes: adminOnlyProbe });
    try {
      const c = totp.client();
      const { user } = await c.signInEmail('would-be-reviewer@example.com');
      await totp.services.adapter().then((a) => a.updateUser(user.id, { role: 'reviewer' }));
      const res = await c.get('/v1/test/admin-only');
      expect(res.statusCode).toBe(403);
      expect(res.json().code).toBe('mfa_required');
    } finally {
      await totp.close();
    }
  });

  it('owner default (ADR-026, secondFactor none): the same staff route needs only the staff role', async () => {
    const c = h.client();
    const { user } = await c.signInEmail('default-reviewer@example.com');
    expect((await c.get('/v1/test/admin-only')).json().code).toBe('forbidden'); // still a student
    await h.services.adapter().then((a) => a.updateUser(user.id, { role: 'reviewer' }));
    const res = await c.get('/v1/test/admin-only');
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ ok: true });
  });

  it('fresh-session routes refuse a session older than 10 minutes (AUTH-9)', async () => {
    const c = h.client();
    await c.signInEmail('fresh@example.com');
    h.clock.advance(11 * 60_000);
    const res = await c.delete('/v1/me');
    expect(res.statusCode).toBe(403);
    expect(res.json().code).toBe('fresh_session_required');
  });
});

describe('responses (API-4, API-9, API-13)', () => {
  it('sets security headers and no CORS headers on every response', async () => {
    for (const res of [await h.client().get('/v1/session'), await h.client().get('/v1/me'), await h.client().get('/healthz', { edge: null })]) {
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['referrer-policy']).toBe('no-referrer');
      expect(res.headers['x-powered-by']).toBeUndefined();
      expect(Object.keys(res.headers).some((k) => k.startsWith('access-control-'))).toBe(false);
      expect(res.headers['x-trace-id']).toBeTruthy();
    }
    const session = await h.client().get('/v1/session');
    expect(session.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(session.headers['cache-control']).toBe('no-store');
  });

  it('a database error becomes a generic 500 with the trace id, no SQL or message', async () => {
    const res = await h.client().get('/v1/test/boom');
    expect(res.statusCode).toBe(500);
    const body = res.json();
    expect(body).toMatchObject({ code: 'internal', status: 500, title: 'Something went wrong on our side.' });
    expect(body.traceId).toBe(res.headers['x-trace-id']);
    expect(res.body).not.toContain('secret_table');
    expect(res.body).not.toContain('42P01');
    expect(res.body).not.toContain('at ');
  });

  it('a response that does not match its schema is a 500, not a leak', async () => {
    const res = await h.client().get('/v1/test/bad-response');
    expect(res.statusCode).toBe(500);
    expect(res.body).not.toContain('not a number');
  });

  it('response schemas strip unknown fields (API-9)', async () => {
    const res = await h.client().get('/v1/test/strip');
    expect(res.json()).toEqual({ id: 'x' });
  });

  it('unknown body fields are rejected (API-8) with field-level errors', async () => {
    const res = await h.client().post('/v1/auth/email/send-otp', { email: 'a@example.com', role: 'admin' });
    expect(res.statusCode).toBe(400);
    expect(res.json().code).toBe('validation_failed');
    expect(res.json().errors.length).toBeGreaterThan(0);
  });
});

describe('body limits (API-5)', () => {
  it('rejects bodies over 64 KB with 413', async () => {
    const res = await h.client().post('/v1/auth/email/send-otp', { email: 'a@example.com', pad: 'x'.repeat(BODY_LIMITS.defaultBytes) });
    expect(res.statusCode).toBe(413);
    expect(res.json().code).toBe('payload_too_large');
  });

  it('rejects JSON nested deeper than 10 before validation', async () => {
    let deep: unknown = 1;
    for (let i = 0; i < 12; i++) deep = { d: deep };
    const res = await h.client().post('/v1/auth/email/send-otp', deep);
    expect(res.statusCode).toBe(400);
    expect(res.json().detail).toContain('nesting');
  });

  it('rejects malformed JSON and prototype pollution', async () => {
    const c = h.client();
    expect((await c.request('POST', '/v1/auth/email/send-otp', { rawBody: '{"email":' })).statusCode).toBe(400);
    expect((await c.request('POST', '/v1/auth/email/send-otp', { rawBody: '{"email":"a@example.com","__proto__":{"x":1}}' })).statusCode).toBe(400);
  });
});

describe('fixed base URL (API-1)', () => {
  it('Google redirect_uri and the post-login redirect ignore Host and X-Forwarded-Host', async () => {
    const c = h.client();
    const start = await c.get('/v1/auth/google/start', { headers: { host: 'evil.example', 'x-forwarded-host': 'evil.example' } });
    expect(start.statusCode).toBe(302);
    const authorize = new URL(String(start.headers.location));
    expect(authorize.searchParams.get('redirect_uri')).toBe(`${PUBLIC_BASE}/api/platform/v1/auth/google/callback`);
    h.oidc.nextUser({ sub: 'api1-user', email: 'api1@example.com' });
    const r = await fetch(authorize, { redirect: 'manual' });
    const back = new URL(String(r.headers.get('location')));
    const cb = await c.get(`/v1/auth/google/callback?${back.searchParams}`, { headers: { host: 'evil.example', 'x-forwarded-host': 'evil.example' } });
    expect(cb.statusCode).toBe(302);
    expect(String(cb.headers.location).startsWith(`${PUBLIC_BASE}/`)).toBe(true);
  });
});

describe('flag off (GEN-4)', () => {
  it('every route except health is 404 when PLATFORM_ENABLED is false', async () => {
    const off = await createHarness({ t: h.t, env: { PLATFORM_ENABLED: 'false' } });
    try {
      for (const r of off.app.routeTable) {
        const url = r.url.replace(':board', 'cbse').replace(':class', '10').replace(':id', '00000000-0000-7000-8000-000000000000');
        const res = await off.client().request(r.method, url, { body: r.method === 'GET' || r.method === 'DELETE' ? undefined : {} });
        if (r.url === '/healthz' || r.url === '/readyz') expect(res.statusCode, url).toBe(200);
        else expect(res.statusCode, `${r.method} ${url}`).toBe(404);
      }
      // and without the edge secret too (no hint that the API exists)
      expect((await off.client().get('/v1/session', { edge: null })).statusCode).toBe(404);
    } finally {
      await off.close();
    }
  });
});
