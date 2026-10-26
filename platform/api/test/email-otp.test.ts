/** Email OTP sign-up, login, logout end-to-end through HTTP (AUTH-1..5, AUTH-8, AUTH-10, AUTH-14). */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { users, verifications } from '@soyl/db';
import { authEvents, createHarness, type Harness } from './helpers';

let h: Harness;
beforeAll(async () => {
  h = await createHarness();
});
afterAll(async () => {
  await h?.close();
});

describe('email OTP', () => {
  it('signs up a new user, sets a __Host- session cookie and reports the session', async () => {
    const c = h.client();
    const sent = await c.post('/v1/auth/email/send-otp', { email: 'Asha.Rao@Example.com' });
    expect(sent.statusCode).toBe(200);
    expect(sent.json()).toEqual({ sent: true, resendAfterSeconds: 30 });
    const code = h.email.lastCode('asha.rao@example.com');
    expect(code).toMatch(/^\d{6}$/);

    // AUTH-4: the database holds no plaintext code
    const rows = await h.t.db.select().from(verifications);
    expect(rows).toHaveLength(1);
    expect(rows[0]!.value).not.toContain(code);
    expect(rows[0]!.identifier).not.toContain('asha');

    const res = await c.post('/v1/auth/email/verify', { email: 'asha.rao@example.com', code, returnTo: '/learn/cbse/10' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body).toMatchObject({ isNewUser: true, consent: 'required', returnTo: '/learn/cbse/10', user: { role: 'student', displayName: null } });
    const setCookie = String(res.headers['set-cookie']);
    expect(setCookie).toMatch(/^__Host-soyl_session=[A-Za-z0-9]+\.[A-Za-z0-9_-]+; Path=\/; Max-Age=\d+; SameSite=Lax; HttpOnly; Secure$/);
    expect(setCookie).not.toMatch(/Domain=/i);
    expect(res.headers['cache-control']).toBe('no-store');

    const session = await c.get('/v1/session');
    expect(session.statusCode).toBe(200);
    expect(session.json()).toMatchObject({ authenticated: true, consent: 'required', user: { id: body.user.id }, session: { fresh: true } });

    const [u] = await h.t.db.select().from(users).where(eq(users.id, body.user.id));
    expect(u).toMatchObject({ email: 'asha.rao@example.com', emailVerified: true, role: 'student' });
    // the code was single use
    expect(await h.t.db.select().from(verifications)).toHaveLength(0);
  });

  it('logs in an existing user (no new account) and rotates the session id', async () => {
    const c = h.client();
    const first = await c.signInEmail('repeat@example.com');
    expect(first.isNewUser).toBe(true);
    const oldCookie = c.jar.get('__Host-soyl_session')!;
    h.clock.advance(31_000);
    const second = await c.signInEmail('repeat@example.com');
    expect(second.isNewUser).toBe(false);
    expect(second.user.id).toBe(first.user.id);
    const newCookie = c.jar.get('__Host-soyl_session')!;
    expect(newCookie).not.toBe(oldCookie);
    // AUTH-10: the pre-login session is gone
    const stale = await h.client().get('/v1/session', { headers: { cookie: `__Host-soyl_session=${oldCookie}` } });
    expect(stale.json().authenticated).toBe(false);
  });

  it('logout deletes the server session and clears cookies; the old cookie is then rejected', async () => {
    const c = h.client();
    await c.signInEmail('logout@example.com');
    const cookie = c.jar.get('__Host-soyl_session')!;
    const out = await c.post('/v1/auth/sign-out');
    expect(out.statusCode).toBe(204);
    expect(out.headers['clear-site-data']).toBe('"cookies"');
    expect(String(out.headers['set-cookie'])).toContain('Max-Age=0');
    const me = await h.client().get('/v1/me', { headers: { cookie: `__Host-soyl_session=${cookie}` } });
    expect(me.statusCode).toBe(401);
    expect(me.headers['content-type']).toContain('application/problem+json');
  });

  it('rejects a wrong code, an unknown identifier and a forged cookie', async () => {
    const c = h.client();
    await c.post('/v1/auth/email/send-otp', { email: 'wrong@example.com' });
    const code = h.email.lastCode('wrong@example.com')!;
    const wrong = String((Number(code) + 1) % 1_000_000).padStart(6, '0');
    const bad = await c.post('/v1/auth/email/verify', { email: 'wrong@example.com', code: wrong });
    expect(bad.statusCode).toBe(400);
    expect(bad.json().code).toBe('otp_invalid');
    const none = await c.post('/v1/auth/email/verify', { email: 'nobody@example.com', code: '123456' });
    expect(none.json().code).toBe('otp_expired');
    const forged = await h.client().get('/v1/session', { headers: { cookie: '__Host-soyl_session=abc.def' } });
    expect(forged.json().authenticated).toBe(false);
  });

  it('refuses disposable and malformed addresses before sending anything', async () => {
    const c = h.client();
    const before = h.email.outbox.length;
    expect((await c.post('/v1/auth/email/send-otp', { email: 'x@mailinator.com' })).statusCode).toBe(400);
    expect((await c.post('/v1/auth/email/send-otp', { email: 'not-an-email' })).statusCode).toBe(400);
    expect(h.email.outbox.length).toBe(before);
  });

  it('expires email codes after 10 minutes (AUTH-2)', async () => {
    const c = h.client();
    await c.post('/v1/auth/email/send-otp', { email: 'slow@example.com' });
    const code = h.email.lastCode('slow@example.com')!;
    h.clock.advance(10 * 60_000 + 1);
    const res = await c.post('/v1/auth/email/verify', { email: 'slow@example.com', code });
    expect(res.json().code).toBe('otp_expired');
  });

  it('a new code supersedes the previous one (AUTH-2)', async () => {
    const c = h.client();
    await c.post('/v1/auth/email/send-otp', { email: 'twice@example.com' });
    const first = h.email.lastCode('twice@example.com')!;
    h.clock.advance(60_000);
    await c.post('/v1/auth/email/send-otp', { email: 'twice@example.com' });
    const second = h.email.lastCode('twice@example.com')!;
    if (first !== second) {
      const old = await c.post('/v1/auth/email/verify', { email: 'twice@example.com', code: first });
      expect(old.statusCode).toBe(400);
    }
    const ok = await c.post('/v1/auth/email/verify', { email: 'twice@example.com', code: second });
    expect(ok.statusCode).toBe(200);
  });

  it('a code for sign-in cannot be used for linking (purpose binding, AUTH-2)', async () => {
    const c = h.client();
    await c.signInEmail('purpose@example.com');
    await h.client().post('/v1/auth/email/send-otp', { email: 'purpose-other@example.com' });
    const code = h.email.lastCode('purpose-other@example.com')!;
    const link = await c.post('/v1/auth/link/email/verify', { email: 'purpose-other@example.com', code });
    expect(link.statusCode).toBe(400);
    expect(link.json().code).toBe('otp_expired');
  });

  it('logs auth events with masked identifiers and never the code (AUTH-14, API-14)', async () => {
    const c = h.client();
    await c.signInEmail('logged.person@example.com');
    const code = h.email.lastCode('logged.person@example.com')!;
    const sends = authEvents(h.logs, 'otp_send').filter((l) => l.identifier === 'l***@example.com' && l.ip === c.ip);
    expect(sends.length).toBeGreaterThan(0);
    expect(sends[0]).toMatchObject({ outcome: 'success', method: 'email', ip: c.ip });
    expect(sends[0]!.uaHash).toBeTruthy();
    const logins = authEvents(h.logs, 'login');
    expect(logins.some((l) => l.outcome === 'success' && l.method === 'email')).toBe(true);
    const all = JSON.stringify(h.logs);
    expect(all).not.toContain('logged.person@example.com');
    expect(all).not.toContain(`"${code}"`);
    expect(all).not.toContain('__Host-soyl_session=');
  });
});
