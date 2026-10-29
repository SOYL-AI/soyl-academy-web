/**
 * Google sign-in against the mock OIDC provider (AUTH-6, AUTH-7, AUTH-11, AC-03): PKCE + state +
 * nonce, ID-token validation, verified-email rule, identification by `sub`, no automatic linking,
 * explicit linking with a fresh session, staff domain rules.
 * Runs with the Google staff policy (STAFF_GOOGLE_TOTP) so the Workspace-domain rules stay proven for when
 * the owner switches back; the email-only default (ADR-026) is covered in staff-sign-in.test.ts.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { accounts, users } from '@soyl/db';
import { createHarness, PUBLIC_BASE, securityEvents, STAFF_DOMAIN, STAFF_GOOGLE_TOTP, type Harness } from './helpers';

let h: Harness;
let n = 0;
const uniq = () => `${Date.now().toString(36)}${++n}`;

beforeAll(async () => {
  h = await createHarness({ staffAuth: STAFF_GOOGLE_TOTP });
});
afterAll(async () => {
  await h?.close();
});

describe('Google sign-in (AUTH-6)', () => {
  it('signs up with PKCE S256, state and nonce, then signs the same account in by sub', async () => {
    const id = uniq();
    const c = h.client();
    h.oidc.nextUser({ sub: `sub-${id}`, email: `g.${id}@example.com`, name: 'Gita Sharma' });
    const { start, callback, location } = await c.signInGoogle({ returnTo: '/learn/cbse/10/cbse-10-science' });
    const authorize = new URL(String(start.headers.location));
    expect(authorize.origin).toBe(h.oidc.issuer);
    expect(authorize.searchParams.get('code_challenge_method')).toBe('S256');
    expect(authorize.searchParams.get('code_challenge')).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(authorize.searchParams.get('state')).toBeTruthy();
    expect(authorize.searchParams.get('nonce')).toBeTruthy();
    expect(authorize.searchParams.get('scope')).toBe('openid email profile');
    expect(String(start.headers['set-cookie'])).toMatch(/__Host-soyl_oauth=.+HttpOnly; Secure/);
    expect(callback.statusCode).toBe(302);
    expect(location).toBe(`${PUBLIC_BASE}/learn/cbse/10/cbse-10-science`);
    expect(c.jar.get('__Host-soyl_session')).toBeTruthy();
    const session = (await c.get('/v1/session')).json();
    expect(session.authenticated).toBe(true);

    const [acct] = await h.t.db.select().from(accounts).where(and(eq(accounts.providerId, 'google'), eq(accounts.accountId, `sub-${id}`)));
    expect(acct!.userId).toBe(session.user.id);
    expect(acct!.accessToken).toBeNull(); // tokens are not stored
    expect(acct!.idToken).toBeNull();

    // same sub, changed email at Google → still the same account (identified by sub, never email)
    const c2 = h.client();
    h.oidc.nextUser({ sub: `sub-${id}`, email: `renamed.${id}@example.com` });
    await c2.signInGoogle();
    expect((await c2.get('/v1/session')).json().user.id).toBe(session.user.id);
  });

  it('an unsafe returnTo becomes /learn (AUTH-13)', async () => {
    const c = h.client();
    h.oidc.nextUser({ sub: `sub-${uniq()}`, email: `rt.${uniq()}@example.com` });
    const { location } = await c.signInGoogle({ returnTo: '//evil.example/x' });
    expect(location).toBe(`${PUBLIC_BASE}/learn`);
  });

  it('rejects a tampered state', async () => {
    const c = h.client();
    h.oidc.nextUser({ sub: `sub-${uniq()}`, email: `ts.${uniq()}@example.com` });
    const { location } = await c.signInGoogle({ mutateCallback: (q) => q.set('state', 'forged-state-value-0000000000000000') });
    expect(new URL(location).searchParams.get('authError')).toBe('oauth_state');
    expect(c.jar.get('__Host-soyl_session')).toBeUndefined();
    expect(securityEvents(h.logs, 'oauth_state_mismatch').length).toBeGreaterThan(0);
  });

  it('rejects a callback without the browser-binding state cookie (login CSRF)', async () => {
    const c = h.client();
    h.oidc.nextUser({ sub: `sub-${uniq()}`, email: `nc.${uniq()}@example.com` });
    const { location } = await c.signInGoogle({ dropStateCookie: true });
    expect(new URL(location).searchParams.get('authError')).toBe('oauth_state');
  });

  it('state is single use: replaying the callback fails', async () => {
    const c = h.client();
    h.oidc.nextUser({ sub: `sub-${uniq()}`, email: `rp.${uniq()}@example.com` });
    const start = await c.get('/v1/auth/google/start');
    const stateCookie = [...c.jar.entries()].find(([k]) => k.includes('soyl_oauth'))!;
    const back = new URL(String((await fetch(String(start.headers.location), { redirect: 'manual' })).headers.get('location')));
    const first = await c.get(`/v1/auth/google/callback?${back.searchParams}`);
    expect(new URL(String(first.headers.location)).searchParams.get('authError')).toBeNull();
    const replay = await h.client().get(`/v1/auth/google/callback?${back.searchParams}`, { headers: { cookie: `${stateCookie[0]}=${stateCookie[1]}` } });
    expect(new URL(String(replay.headers.location)).searchParams.get('authError')).toBe('oauth_state');
  });

  it('fails when the PKCE verifier does not match (provider rejects the code)', async () => {
    const c = h.client();
    h.oidc.nextUser({ sub: `sub-${uniq()}`, email: `pk.${uniq()}@example.com` });
    const start = await c.get('/v1/auth/google/start');
    const state = new URL(String(start.headers.location)).searchParams.get('state')!;
    const key = `oauth:${state}`;
    const rec = JSON.parse((await h.kv.get(key, h.clock.now()))!);
    rec.verifier = 'x'.repeat(64);
    await h.kv.set(key, JSON.stringify(rec), 60_000, h.clock.now());
    const back = new URL(String((await fetch(String(start.headers.location), { redirect: 'manual' })).headers.get('location')));
    const cb = await c.get(`/v1/auth/google/callback?${back.searchParams}`);
    expect(new URL(String(cb.headers.location)).searchParams.get('authError')).toBe('oauth_failed');
    expect(c.jar.get('__Host-soyl_session')).toBeUndefined();
  });

  it.each([
    ['wrong nonce', { nonce: 'not-the-nonce' }],
    ['wrong audience', { aud: 'someone-else' }],
    ['wrong issuer', { iss: 'https://accounts.evil.example' }],
    ['expired token', { expiresInSeconds: -600 }],
    ['bad signature', { wrongKey: true }],
  ])('rejects an ID token with %s', async (_label, tamper) => {
    const c = h.client();
    h.oidc.tamper = tamper;
    try {
      h.oidc.nextUser({ sub: `sub-${uniq()}`, email: `tk.${uniq()}@example.com` });
      const { location } = await c.signInGoogle();
      expect(new URL(location).searchParams.get('authError')).toBe('oauth_failed');
      expect(c.jar.get('__Host-soyl_session')).toBeUndefined();
    } finally {
      h.oidc.tamper = {};
    }
  });

  it('email_verified=false → no account, no linking', async () => {
    const id = uniq();
    const c = h.client();
    h.oidc.nextUser({ sub: `sub-${id}`, email: `unverified.${id}@example.com`, email_verified: false });
    const { location } = await c.signInGoogle();
    expect(new URL(location).searchParams.get('authError')).toBe('email_unverified');
    expect(await h.t.db.select().from(accounts).where(eq(accounts.accountId, `sub-${id}`))).toHaveLength(0);
  });
});

describe('account linking (AUTH-7, AC-03)', () => {
  it('Google with the same email as an email-OTP account is NOT attached to it', async () => {
    const id = uniq();
    const email = `owner.${id}@example.com`;
    const owner = await h.client().signInEmail(email);
    const attacker = h.client();
    h.oidc.nextUser({ sub: `attacker-${id}`, email });
    const { location } = await attacker.signInGoogle();
    expect(new URL(location).searchParams.get('authError')).toBe('account_exists_link_required');
    expect(attacker.jar.get('__Host-soyl_session')).toBeUndefined();
    expect(await h.t.db.select().from(accounts).where(eq(accounts.userId, owner.user.id))).toHaveLength(0);
  });

  it('Gmail dot/plus aliases count as the same email (DB-3)', async () => {
    const id = uniq();
    await h.client().signInEmail(`ravi.kumar${id}@gmail.com`);
    const c = h.client();
    h.oidc.nextUser({ sub: `alias-${id}`, email: `ravikumar${id}+x@gmail.com` });
    const { location } = await c.signInGoogle();
    expect(new URL(location).searchParams.get('authError')).toBe('account_exists_link_required');
  });

  it('a signed-in user with a fresh session links Google; then Google signs into that account', async () => {
    const id = uniq();
    const c = h.client();
    const me = await c.signInEmail(`linker.${id}@example.com`);
    h.oidc.nextUser({ sub: `link-${id}`, email: `linker.${id}@example.com` });
    const { location } = await c.signInGoogle({ intent: 'link', returnTo: '/me' });
    expect(location).toBe(`${PUBLIC_BASE}/me?linked=google`);
    const methods = (await c.get('/v1/me')).json().methods;
    expect(methods).toMatchObject({ google: true, email: `linker.${id}@example.com` });
    // notification to the other verified channel
    expect(h.email.last(`linker.${id}@example.com`)?.tag).toBe('account-notice');

    const other = h.client();
    h.oidc.nextUser({ sub: `link-${id}`, email: `linker.${id}@example.com` });
    await other.signInGoogle();
    expect((await other.get('/v1/session')).json().user.id).toBe(me.user.id);
  });

  it('linking needs a fresh session (≤ 10 min)', async () => {
    const c = h.client();
    await c.signInEmail(`stale.${uniq()}@example.com`);
    h.clock.advance(11 * 60_000);
    const res = await c.get('/v1/auth/google/start?intent=link');
    expect(res.statusCode).toBe(403);
    expect(res.json().code).toBe('fresh_session_required');
    expect((await h.client().get('/v1/auth/google/start?intent=link')).statusCode).toBe(401);
  });

  it('a Google account already linked elsewhere cannot be linked again', async () => {
    const id = uniq();
    h.oidc.nextUser({ sub: `taken-${id}`, email: `taken.${id}@example.com` });
    await h.client().signInGoogle();
    const c = h.client();
    await c.signInEmail(`wants.${id}@example.com`);
    h.oidc.nextUser({ sub: `taken-${id}`, email: `taken.${id}@example.com` });
    const { location } = await c.signInGoogle({ intent: 'link', returnTo: '/me' });
    expect(new URL(location).searchParams.get('authError')).toBe('identifier_unavailable');
  });

  it('links and unlinks phone and email by OTP; the last method cannot be removed', async () => {
    const id = uniq();
    const c = h.client();
    await c.signInEmail(`multi.${id}@example.com`);
    const p = `+9198${String(Date.now()).slice(-8)}`;
    expect((await c.post('/v1/auth/link/phone/send-otp', { phoneNumber: p })).statusCode).toBe(200);
    const linked = await c.post('/v1/auth/link/phone/verify', { phoneNumber: p, code: h.sms.lastCode(p)! });
    expect(linked.statusCode).toBe(200);
    expect(linked.json()).toMatchObject({ phone: p, email: `multi.${id}@example.com`, google: false });

    const unlinkEmail = await c.post('/v1/auth/unlink', { method: 'email' });
    expect(unlinkEmail.json()).toMatchObject({ phone: p, email: null });
    const last = await c.post('/v1/auth/unlink', { method: 'phone' });
    expect(last.statusCode).toBe(409);
    expect(last.json().code).toBe('last_sign_in_method');
    expect((await c.post('/v1/auth/unlink', { method: 'google' })).statusCode).toBe(404);

    // link a new email by OTP
    const newEmail = `multi2.${id}@example.com`;
    await c.post('/v1/auth/link/email/send-otp', { email: newEmail });
    const r = await c.post('/v1/auth/link/email/verify', { email: newEmail, code: h.email.lastCode(newEmail)! });
    expect(r.json()).toMatchObject({ email: newEmail, phone: p });
  });

  it('an identifier used by another account cannot be linked', async () => {
    const id = uniq();
    const taken = `+9197${String(Date.now()).slice(-8)}`;
    await h.client().signInPhone(taken);
    h.clock.advance(31_000);
    const c = h.client();
    await c.signInEmail(`dup.${id}@example.com`);
    await c.post('/v1/auth/link/phone/send-otp', { phoneNumber: taken });
    const res = await c.post('/v1/auth/link/phone/verify', { phoneNumber: taken, code: h.sms.lastCode(taken)! });
    expect(res.statusCode).toBe(409);
    expect(res.json().code).toBe('identifier_unavailable');
  });
});

describe('staff accounts (AUTH-11)', () => {
  async function makeStaff(id: string, hd?: string, emailDomain = STAFF_DOMAIN) {
    const sub = `staff-${id}`;
    h.oidc.nextUser({ sub, email: `reviewer.${id}@${emailDomain}`, hd });
    await h.client().signInGoogle();
    const [acct] = await h.t.db.select().from(accounts).where(eq(accounts.accountId, sub));
    await h.t.db.update(users).set({ role: 'reviewer' }).where(eq(users.id, acct!.userId));
    return sub;
  }

  it('a reviewer from the allow-listed Workspace domain may sign in with Google', async () => {
    const id = uniq();
    const sub = await makeStaff(id, STAFF_DOMAIN);
    const c = h.client();
    h.oidc.nextUser({ sub, email: `reviewer.${id}@${STAFF_DOMAIN}`, hd: STAFF_DOMAIN });
    const { location } = await c.signInGoogle();
    expect(new URL(location).searchParams.get('authError')).toBeNull();
    expect((await c.get('/v1/session')).json().user.role).toBe('reviewer');
  });

  it('a reviewer without the Workspace hd claim or from another domain is refused', async () => {
    const id = uniq();
    const sub = await makeStaff(id, undefined, 'gmail.com');
    const c = h.client();
    h.oidc.nextUser({ sub, email: `reviewer.${id}@gmail.com` });
    const { location } = await c.signInGoogle();
    expect(new URL(location).searchParams.get('authError')).toBe('staff_domain_not_allowed');
    expect(c.jar.get('__Host-soyl_session')).toBeUndefined();
  });

  it('staff sessions last at most 12 hours and end after 60 minutes idle (AUTH-9)', async () => {
    const id = uniq();
    const sub = await makeStaff(id, STAFF_DOMAIN);
    const c = h.client();
    h.oidc.nextUser({ sub, email: `reviewer.${id}@${STAFF_DOMAIN}`, hd: STAFF_DOMAIN });
    await c.signInGoogle();
    h.clock.advance(59 * 60_000);
    expect((await c.get('/v1/session')).json().authenticated).toBe(true); // activity rolls the expiry
    h.clock.advance(61 * 60_000);
    expect((await c.get('/v1/session')).json().authenticated).toBe(false);

    const c2 = h.client();
    h.oidc.nextUser({ sub, email: `reviewer.${id}@${STAFF_DOMAIN}`, hd: STAFF_DOMAIN });
    await c2.signInGoogle();
    for (let i = 0; i < 13; i++) {
      h.clock.advance(55 * 60_000); // 715 min of steady activity
      expect((await c2.get('/v1/session')).json().authenticated).toBe(true);
    }
    h.clock.advance(10 * 60_000); // 725 min since sign-in, 10 min idle
    expect((await c2.get('/v1/session')).json().authenticated).toBe(false); // > 12 h absolute
  });
});
