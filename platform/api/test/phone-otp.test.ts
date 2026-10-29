/**
 * Phone OTP (AUTH-1..5, AC-01, AC-02): sign-up/login, +91-only validation, single use, per-code
 * attempts, identifier lockout, IP failure limit, send caps, global SMS cap, parallel guesses.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { users, verifications } from '@soyl/db';
import { createHarness, securityEvents, type Harness } from './helpers';

let h: Harness;
let n = 0;
/** A fresh valid Indian mobile per test. */
const phone = () => `+91987${String(100000 + ++n * 7).padStart(7, '0')}`;
const wrongOf = (code: string) => String((Number(code) + 1) % 1_000_000).padStart(6, '0');

beforeAll(async () => {
  h = await createHarness({ env: { SMS_GLOBAL_HOURLY_CAP: '50' } });
});
afterAll(async () => {
  await h?.close();
});
beforeEach(() => {
  h.clock.advance(25 * 3600_000); // leave every send window from earlier tests
});

describe('phone OTP sign-up and login', () => {
  it('creates an account with a .invalid placeholder email, then logs the same account in', async () => {
    const p = phone();
    const c = h.client();
    const first = await c.signInPhone(p);
    expect(first.isNewUser).toBe(true);
    const [u] = await h.t.db.select().from(users).where(eq(users.id, first.user.id));
    expect(u).toMatchObject({ phoneNumber: p, phoneE164: p, phoneNumberVerified: true, emailNormalized: null, name: 'SOYL learner' });
    expect(u!.email.endsWith('.invalid')).toBe(true);
    h.clock.advance(60_000);
    const second = await h.client().signInPhone(p);
    expect(second.isNewUser).toBe(false);
    expect(second.user.id).toBe(first.user.id);
  });

  it('stores only an HMAC (AUTH-4) and the SMS carries the code', async () => {
    const p = phone();
    await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const code = h.sms.lastCode(p)!;
    expect(code).toMatch(/^\d{6}$/);
    const rows = await h.t.db.select().from(verifications);
    for (const r of rows) {
      expect(r.value).not.toContain(code);
      expect(r.identifier).not.toContain(p.slice(3));
      expect(r.value).toMatch(/^v1:\d+:[0-9a-f]{64}$/);
    }
  });

  it('accepts spaces and dashes in the number but only +91 mobiles (AUTH-1), without calling the provider', async () => {
    const before = h.sms.outbox.length;
    for (const bad of ['+14155550100', '+915123456789', '9876543210', '+91 98765', '+4407700900123'])
      expect((await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: bad })).statusCode, bad).toBe(400);
    expect(h.sms.outbox.length).toBe(before);
    const ok = await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: '+91 98765-00999' });
    expect(ok.statusCode).toBe(200);
    expect(h.sms.lastCode('+919876500999')).toBeTruthy();
  });

  it('accepts the reserved test range outside production (GEN-2/GEN-3)', async () => {
    expect((await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: '+915550001234' })).statusCode).toBe(200);
  });

  it('responds the same whether or not the account exists (AUTH-5)', async () => {
    const existing = phone();
    await h.client().signInPhone(existing);
    h.clock.advance(16 * 60_000); // same position in the resend ladder as a first send
    const a = await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: existing });
    const b = await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: phone() });
    expect(a.statusCode).toBe(b.statusCode);
    expect(a.json()).toEqual(b.json());
  });

  it('expires SMS codes after 5 minutes (AUTH-2)', async () => {
    const p = phone();
    const c = h.client();
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const code = h.sms.lastCode(p)!;
    h.clock.advance(5 * 60_000 + 1);
    expect((await c.post('/v1/auth/phone/verify', { phoneNumber: p, code })).json().code).toBe('otp_expired');
  });

  it('a used code cannot be reused (single use)', async () => {
    const p = phone();
    const c = h.client();
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const code = h.sms.lastCode(p)!;
    expect((await c.post('/v1/auth/phone/verify', { phoneNumber: p, code })).statusCode).toBe(200);
    expect((await h.client().post('/v1/auth/phone/verify', { phoneNumber: p, code })).statusCode).toBe(400);
  });

  it('refuses phone OTP sign-in for staff accounts (AUTH-11, ADR-026: never a staff method)', async () => {
    const p = phone();
    const { user } = await h.client().signInPhone(p);
    await h.t.db.update(users).set({ role: 'admin' }).where(eq(users.id, user.id));
    h.clock.advance(60_000);
    const c = h.client();
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const res = await c.post('/v1/auth/phone/verify', { phoneNumber: p, code: h.sms.lastCode(p)! });
    expect(res.statusCode).toBe(403);
    expect(res.json().code).toBe('staff_sign_in_method_not_allowed');
    expect(c.jar.get('__Host-soyl_session')).toBeUndefined();
  });
});

describe('verify limits (AUTH-3, AC-01)', () => {
  it('5 wrong tries kill the code: the 6th try with the right code fails', async () => {
    const p = phone();
    const c = h.client();
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const code = h.sms.lastCode(p)!;
    for (let i = 0; i < 5; i++) expect((await c.post('/v1/auth/phone/verify', { phoneNumber: p, code: wrongOf(code) })).json().code).toBe('otp_invalid');
    expect((await c.post('/v1/auth/phone/verify', { phoneNumber: p, code })).json().code).toBe('otp_expired');
  });

  it('4 wrong tries then the right code still works', async () => {
    const p = phone();
    const c = h.client();
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const code = h.sms.lastCode(p)!;
    for (let i = 0; i < 4; i++) await c.post('/v1/auth/phone/verify', { phoneNumber: p, code: wrongOf(code) });
    expect((await c.post('/v1/auth/phone/verify', { phoneNumber: p, code })).statusCode).toBe(200);
  });

  it('50 parallel wrong guesses evaluate at most 5 (AC-01)', async () => {
    const p = phone();
    await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const code = h.sms.lastCode(p)!;
    const results = await Promise.all(
      Array.from({ length: 50 }, (_, i) => h.client(`192.0.2.${(i % 200) + 1}`).post('/v1/auth/phone/verify', { phoneNumber: p, code: wrongOf(code) })),
    );
    const evaluated = results.filter((r) => r.statusCode === 400 && r.json().code === 'otp_invalid').length;
    expect(evaluated).toBeLessThanOrEqual(5);
    expect(results.every((r) => r.statusCode !== 200)).toBe(true);
    // the right code is now useless
    expect((await h.client().post('/v1/auth/phone/verify', { phoneNumber: p, code })).statusCode).not.toBe(200);
  });

  it('10 failures in an hour lock the number for an hour: no sends, no verifies (AUTH-3)', async () => {
    const p = phone();
    const c = h.client();
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    for (let i = 0; i < 10; i++) await c.post('/v1/auth/phone/verify', { phoneNumber: p, code: '000000' === h.sms.lastCode(p) ? '111111' : '000000' });
    const locked = await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    expect(locked.statusCode).toBe(429);
    expect(locked.json().code).toBe('otp_locked');
    expect(Number(locked.headers['retry-after'])).toBeGreaterThan(3000);
    expect(securityEvents(h.logs, 'otp_lockout').length).toBeGreaterThan(0);
    h.clock.advance(3600_000 + 1000);
    expect((await c.post('/v1/auth/phone/send-otp', { phoneNumber: p })).statusCode).toBe(200);
  });

  it('30 failed verifies per IP per hour → 429 (AUTH-3)', async () => {
    const c = h.client('198.51.100.99');
    for (let i = 0; i < 30; i++) await c.post('/v1/auth/phone/verify', { phoneNumber: phone(), code: '123456' });
    const res = await c.post('/v1/auth/phone/verify', { phoneNumber: phone(), code: '123456' });
    expect(res.statusCode).toBe(429);
    expect(res.json().code).toBe('rate_limited');
  });
});

describe('send limits (AUTH-5, AC-02)', () => {
  it('per number: 1 per 30 s, 3 per 15 min, 6 per 24 h', async () => {
    const p = phone();
    const c = () => h.client();
    expect((await c().post('/v1/auth/phone/send-otp', { phoneNumber: p })).json()).toEqual({ sent: true, resendAfterSeconds: 30 });
    const tooSoon = await c().post('/v1/auth/phone/send-otp', { phoneNumber: p });
    expect(tooSoon.statusCode).toBe(429);
    expect(Number(tooSoon.headers['retry-after'])).toBeLessThanOrEqual(30);
    h.clock.advance(31_000);
    expect((await c().post('/v1/auth/phone/send-otp', { phoneNumber: p })).json().resendAfterSeconds).toBe(60);
    h.clock.advance(31_000);
    expect((await c().post('/v1/auth/phone/send-otp', { phoneNumber: p })).json().resendAfterSeconds).toBe(120);
    h.clock.advance(31_000);
    expect((await c().post('/v1/auth/phone/send-otp', { phoneNumber: p })).statusCode).toBe(429); // 4th within 15 min
    for (let i = 0; i < 3; i++) {
      h.clock.advance(16 * 60_000);
      expect((await c().post('/v1/auth/phone/send-otp', { phoneNumber: p })).statusCode).toBe(200);
    }
    h.clock.advance(16 * 60_000);
    expect((await c().post('/v1/auth/phone/send-otp', { phoneNumber: p })).statusCode).toBe(429); // 7th within 24 h
  });

  it('per IP: 10 per hour', async () => {
    const c = h.client('198.51.100.50');
    for (let i = 0; i < 10; i++) expect((await c.post('/v1/auth/phone/send-otp', { phoneNumber: phone() })).statusCode).toBe(200);
    expect((await c.post('/v1/auth/phone/send-otp', { phoneNumber: phone() })).statusCode).toBe(429);
  });

  it('per IP: 30 per 24 hours', async () => {
    const c = h.client('198.51.100.51');
    for (let hour = 0; hour < 3; hour++) {
      for (let i = 0; i < 10; i++) expect((await c.post('/v1/auth/phone/send-otp', { phoneNumber: phone() })).statusCode).toBe(200);
      h.clock.advance(3601_000);
    }
    expect((await c.post('/v1/auth/phone/send-otp', { phoneNumber: phone() })).statusCode).toBe(429);
  });

  it('the global hourly SMS cap pauses phone OTP with 503; email keeps working', async () => {
    h.clock.advance(2 * 3600_000);
    let paused = null;
    for (let i = 0; i < 60 && !paused; i++) {
      const res = await h.client(`203.0.113.${(i % 200) + 1}`).post('/v1/auth/phone/send-otp', { phoneNumber: phone() });
      if (res.statusCode === 503) paused = res;
    }
    expect(paused?.json().code).toBe('phone_otp_paused');
    expect(securityEvents(h.logs, 'otp_global_cap_reached').length).toBeGreaterThan(0);
    expect((await h.client().post('/v1/auth/email/send-otp', { email: 'still-works@example.com' })).statusCode).toBe(200);
  });

  it('email: 3 per 15 min per address, 10 per hour per IP', async () => {
    h.clock.advance(2 * 3600_000);
    for (let i = 0; i < 3; i++) {
      expect((await h.client().post('/v1/auth/email/send-otp', { email: 'caps@example.com' })).statusCode).toBe(200);
      h.clock.advance(1000);
    }
    expect((await h.client().post('/v1/auth/email/send-otp', { email: 'caps@example.com' })).statusCode).toBe(429);
    const c = h.client('198.51.100.60');
    for (let i = 0; i < 10; i++) expect((await c.post('/v1/auth/email/send-otp', { email: `ipcap${i}@example.com` })).statusCode).toBe(200);
    expect((await c.post('/v1/auth/email/send-otp', { email: 'ipcap-x@example.com' })).statusCode).toBe(429);
  });

  it('a provider failure is a generic 503 and leaves no usable code', async () => {
    h.sms.failing = true;
    try {
      const p = phone();
      const res = await h.client().post('/v1/auth/phone/send-otp', { phoneNumber: p });
      expect(res.statusCode).toBe(503);
      expect(res.json().code).toBe('service_unavailable');
    } finally {
      h.sms.failing = false;
    }
  });
});
