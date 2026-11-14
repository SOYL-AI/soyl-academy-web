/**
 * API-6 route-policy test: every registered route has an explicit, valid policy; the table is
 * snapshotted so any change shows up in review (AUTH-1: no other auth pathway exists).
 * Also: a route without a policy stops the server from starting. A declared consent feature that the
 * config does not gate (CONSENT_REQUIRED, D-052) shows as `consent=<feature>(open)`.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isGated } from '../src/consent/service';
import { assertPolicy, MissingPolicyError, RoutePolicySchema } from '../src/policy';
import { createHarness, type Harness } from './helpers';

let h: Harness;

beforeAll(async () => {
  // DEV_OTP_OUTBOX on, so the local-only route is in the table too (it must also have a policy).
  h = await createHarness({ env: { DEV_OTP_OUTBOX: 'true' } });
});
afterAll(async () => {
  await h?.close();
});

describe('route policy (API-6)', () => {
  it('every registered route declares a valid policy', () => {
    const list = h.app.routeTable;
    expect(list.length).toBeGreaterThanOrEqual(25);
    for (const r of list) expect(RoutePolicySchema.safeParse(r.policy).success, `${r.method} ${r.url}`).toBe(true);
  });

  it('matches the reviewed policy table (snapshot)', () => {
    const table = h.app.routeTable
      .map((r) => {
        const p = r.policy;
        const rl = p.rateLimit === false ? 'none' : `${['default', ...(p.rateLimit.buckets ?? [])].join('+')}${p.rateLimit.failClosed ? ' (fail-closed)' : ''}`;
        return `${r.method.padEnd(6)} ${r.url.padEnd(38)} roles=${p.roles.join('|')} csrf=${p.csrf} rl=${rl} consent=${p.consent ? (isGated(p.consent) ? p.consent : `${p.consent}(open)`) : 'no'}${p.fresh ? ' fresh' : ''}${p.mfa ? ' mfa' : ''}${p.capability ? ` cap=${p.capability}` : ''}${r.hidden ? ' (dev-only, hidden)' : ''}`;
      })
      .sort();
    expect(table.join('\n')).toMatchSnapshot();
  });

  it('auth pathways are exactly the documented ones (AUTH-1)', () => {
    const auth = h.app.routeTable
      .filter((r) => r.url.startsWith('/v1/auth/'))
      .map((r) => `${r.method} ${r.url}`)
      .sort();
    expect(auth).toEqual(
      [
        'GET /v1/auth/google/callback',
        'GET /v1/auth/google/start',
        'GET /v1/auth/methods', // read-only: which methods are enabled (signs nobody in)
        'POST /v1/auth/email/send-otp',
        'POST /v1/auth/email/verify',
        'POST /v1/auth/link/email/send-otp',
        'POST /v1/auth/link/email/verify',
        'POST /v1/auth/link/phone/send-otp',
        'POST /v1/auth/link/phone/verify',
        'POST /v1/auth/phone/send-otp',
        'POST /v1/auth/phone/verify',
        'POST /v1/auth/sign-out',
        'POST /v1/auth/unlink',
      ].sort(),
    );
  });

  it('only health is outside /v1 (edge auth covers everything else)', () => {
    const outside = h.app.routeTable.filter((r) => !r.url.startsWith('/v1/')).map((r) => r.url);
    expect(outside.sort()).toEqual(['/healthz', '/readyz']);
  });

  // Exempt: the HMAC-verified Razorpay webhook, the server-to-server Future Builders ingest routes, which need a
  // server secret no browser holds (x-soyl-ingest-key, ADR-027; the web proxy never forwards that header), and the RFC 8058
  // one-click unsubscribe (D-055): mailbox providers POST without an Origin; an HMAC token authorises it and it can only
  // switch email off.
  const CSRF_EXEMPT = ['POST /v1/webhooks/razorpay', 'POST /v1/ingest/future-builders/enrollments', 'POST /v1/ingest/future-builders/leads', 'POST /v1/email/unsubscribe/one-click'];

  it('every state-changing route has csrf=true, except the HMAC-verified Razorpay webhook, the key-authenticated ingest routes and the token-authenticated one-click unsubscribe (AUTH-12)', () => {
    const exempt = h.app.routeTable.filter((r) => !r.policy.csrf).map((r) => `${r.method} ${r.url}`);
    expect(exempt.sort()).toEqual([...CSRF_EXEMPT].sort());
    for (const r of h.app.routeTable.filter((r) => ['POST', 'PUT', 'PATCH', 'DELETE'].includes(r.method) && !CSRF_EXEMPT.includes(`${r.method} ${r.url}`)))
      expect(r.policy.csrf, `${r.method} ${r.url}`).toBe(true);
  });

  it('the ingest routes refuse a call without the ingest key, even with the edge secret (ADR-027)', async () => {
    for (const url of ['/v1/ingest/future-builders/enrollments', '/v1/ingest/future-builders/leads']) {
      const res = await h.client().post(url, {}, { origin: null });
      expect(res.statusCode, url).toBe(401);
      expect(res.json().code).toBe('ingest_auth_failed');
    }
  });

  it('the local-only OTP outbox answers only for reserved test identifiers', async () => {
    const c = h.client();
    await c.post('/v1/auth/email/send-otp', { email: 'outbox@example.com' });
    const ok = await c.get('/v1/dev/otp-outbox?to=outbox@example.com');
    expect(ok.json().code).toBe(h.email.lastCode('outbox@example.com'));
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: '+915550009999' });
    expect((await c.get('/v1/dev/otp-outbox?to=%2B915550009999')).json().code).toBe(h.sms.lastCode('+915550009999'));
    expect((await c.get('/v1/dev/otp-outbox?to=someone@gmail.com')).statusCode).toBe(404);
    expect((await c.get('/v1/dev/otp-outbox?to=outbox@example.com', { edge: null })).statusCode).toBe(403);
  });

  it('a route without a policy prevents start-up', async () => {
    await expect(
      createHarness({
        t: h.t,
        extraRoutes: (app) => {
          app.get('/v1/no-policy', async () => ({ ok: true }));
        },
      }),
    ).rejects.toThrow(MissingPolicyError);
  });

  it('a malformed policy is rejected too', () => {
    expect(() => assertPolicy('GET', '/x', undefined)).toThrow(MissingPolicyError);
    expect(() => assertPolicy('GET', '/x', { roles: [], csrf: true, rateLimit: false, consent: false })).toThrow(MissingPolicyError);
    expect(() => assertPolicy('GET', '/x', { roles: ['root'], csrf: true, rateLimit: false, consent: false })).toThrow(MissingPolicyError);
    expect(() => assertPolicy('GET', '/x', { roles: ['guest'], csrf: true, rateLimit: false, consent: 'everything' })).toThrow(MissingPolicyError);
    expect(() => assertPolicy('GET', '/x', { roles: ['guest'], csrf: true, rateLimit: { buckets: ['nope'] }, consent: false })).toThrow(MissingPolicyError);
    expect(assertPolicy('GET', '/x', { roles: ['guest'], csrf: true, rateLimit: false, consent: false })).toBeTruthy();
  });
});
