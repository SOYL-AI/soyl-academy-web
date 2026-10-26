/** API-RL-1 defaults with a fake clock: 600/min per IP, 300/min per user, 60/min per IP on auth routes. */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { RATE_LIMITS } from '@soyl/shared/config/security';
import { createHarness, securityEvents, type Harness } from './helpers';

let h: Harness;
beforeAll(async () => {
  h = await createHarness();
});
afterAll(async () => {
  await h?.close();
});

describe('rate limits (API-RL-1)', () => {
  it('auth routes: 60 per minute per IP, then 429 with Retry-After; the window slides', async () => {
    const c = h.client('198.51.100.200');
    for (let i = 0; i < RATE_LIMITS['auth.ip'].limit; i++) expect((await c.post('/v1/auth/sign-out')).statusCode).toBe(204);
    const limited = await c.post('/v1/auth/sign-out');
    expect(limited.statusCode).toBe(429);
    expect(limited.json()).toMatchObject({ code: 'rate_limited', status: 429 });
    expect(Number(limited.headers['retry-after'])).toBeGreaterThan(0);
    expect(securityEvents(h.logs, 'rate_limited').length).toBeGreaterThan(0);
    // another IP is unaffected
    expect((await h.client('198.51.100.201').post('/v1/auth/sign-out')).statusCode).toBe(204);
    h.clock.advance(60_001);
    expect((await c.post('/v1/auth/sign-out')).statusCode).toBe(204);
  });

  it('every /v1 route: 600 per minute per IP', async () => {
    const c = h.client('198.51.100.210');
    for (let i = 0; i < RATE_LIMITS['api.ip'].limit; i++) await c.get('/v1/session');
    expect((await c.get('/v1/session')).statusCode).toBe(429);
    h.clock.advance(60_001);
    expect((await c.get('/v1/session')).statusCode).toBe(200);
  });

  it('signed-in users: 300 per minute per user, across IPs', async () => {
    h.clock.advance(60_001);
    const a = h.client('198.51.100.220');
    await a.signInEmail('ratelimited.user@example.com');
    const b = h.client('198.51.100.221');
    for (const [k, v] of a.jar) b.jar.set(k, v);
    let last = 200;
    for (let i = 0; i < RATE_LIMITS['api.user'].limit + 5 && last !== 429; i++) last = (await (i % 2 ? a : b).get('/v1/session')).statusCode;
    expect(last).toBe(429);
  });
});
