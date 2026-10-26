/**
 * API-6 route-policy test: every registered route has an explicit, valid policy; the table is
 * snapshotted so any change shows up in review (AUTH-1: no other auth pathway exists).
 * Also: a route without a policy stops the server from starting.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
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
        return `${r.method.padEnd(6)} ${r.url.padEnd(38)} roles=${p.roles.join('|')} csrf=${p.csrf} rl=${rl} consent=${p.consent || 'no'}${p.fresh ? ' fresh' : ''}${p.mfa ? ' mfa' : ''}${r.hidden ? ' (dev-only, hidden)' : ''}`;
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

  it('every state-changing route has csrf=true', () => {
    for (const r of h.app.routeTable.filter((r) => ['POST', 'PUT', 'PATCH', 'DELETE'].includes(r.method)))
      expect(r.policy.csrf, `${r.method} ${r.url}`).toBe(true);
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
