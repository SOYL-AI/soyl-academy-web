/** Consent gate (API-11, D-014, API-16) with the mock provider in every state. */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { consentStatus } from '@soyl/db';
import { CONSENT } from '@soyl/shared/config/security';
import { MEMBER_ROLES } from '../src/policy';
import { isGated } from '../src/consent/service';
import { createHarness, securityEvents, type Harness } from './helpers';

let h: Harness;
let n = 0;
const email = () => `consent.${Date.now().toString(36)}${++n}@example.com`;

beforeAll(async () => {
  h = await createHarness({
    extraRoutes: (app) => {
      // An AI-like route (consent: 'ai') and a test-attempt-like route (consent: 'test_attempts').
      app.post('/v1/test/ai', { config: { policy: { roles: [...MEMBER_ROLES], csrf: true, rateLimit: { buckets: [] }, consent: 'ai' } } }, async () => ({ ok: true }));
      app.post('/v1/test/attempt', { config: { policy: { roles: [...MEMBER_ROLES], csrf: true, rateLimit: { buckets: [] }, consent: 'test_attempts' } } }, async () => ({ ok: true }));
    },
  });
});
afterAll(async () => {
  await h?.close();
});

describe('consent gate', () => {
  it.each([
    ['required', 403],
    ['pending', 403],
    ['granted', 200],
    ['revoked', 403],
  ] as const)('state %s → %i on a gated feature', async (state, status) => {
    const c = h.client();
    const { user } = await c.signInEmail(email());
    h.consent.setStatus(user.id, state);
    h.clock.advance(CONSENT.cacheTtlSeconds * 1000 + 1000);
    const res = await c.post('/v1/test/ai');
    expect(res.statusCode).toBe(status);
    if (status === 403) {
      expect(res.json().code).toBe('consent_required');
      expect(securityEvents(h.logs, 'consent_denied').length).toBeGreaterThan(0);
    }
  });

  it('D-014: tests and guest merge are not gated', async () => {
    expect(isGated('test_attempts')).toBe(false);
    expect(isGated('merge_guest')).toBe(false);
    expect(isGated('ai')).toBe(true);
    const c = h.client();
    await c.signInEmail(email());
    expect((await c.post('/v1/test/attempt')).statusCode).toBe(200);
  });

  it('sign-in refreshes the cache from the provider', async () => {
    const e = email();
    const c = h.client();
    const { user } = await c.signInEmail(e);
    h.consent.setStatus(user.id, 'granted');
    h.clock.advance(31_000);
    const again = await h.client().signInEmail(e);
    expect(again.consent).toBe('granted');
    const [row] = await h.t.db.select().from(consentStatus).where(eq(consentStatus.userId, user.id));
    expect(row).toMatchObject({ status: 'granted', provider: 'mock' });
    expect(row!.grantedAt).toBeInstanceOf(Date);
  });

  it('uses the fresh cache when the provider is down, and fails closed (503) when the cache is stale', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email());
    h.consent.setStatus(user.id, 'granted');
    h.clock.advance(CONSENT.cacheTtlSeconds * 1000 + 1000);
    expect((await c.post('/v1/test/ai')).statusCode).toBe(200); // refreshes the cache
    h.consent.failing = true;
    try {
      expect((await c.post('/v1/test/ai')).statusCode).toBe(200); // cache still fresh
      h.clock.advance(CONSENT.cacheTtlSeconds * 1000 + 1000);
      const res = await c.post('/v1/test/ai');
      expect(res.statusCode).toBe(503);
      expect(res.json().code).toBe('consent_unavailable');
      // learning-type routes keep working
      expect((await c.get('/v1/session')).statusCode).toBe(200);
    } finally {
      h.consent.failing = false;
    }
  });

  it('sign-in still works when the provider is down (state stays as cached / required)', async () => {
    h.consent.failing = true;
    try {
      const res = await h.client().signInEmail(email());
      expect(res.consent).toBe('required');
    } finally {
      h.consent.failing = false;
    }
  });
});
