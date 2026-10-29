/**
 * Staff sign-in policy (AUTH-11 as amended by ADR-026; owner decision 2026-10-29).
 *
 * Default STAFF_AUTH = { signInMethods: ['email'], secondFactor: 'none' }:
 *   - reviewer/admin/superadmin sign in with the email one-time code and reach /admin without TOTP;
 *   - phone OTP and Google stay refused for staff;
 *   - everything else is unchanged: superadmin capability checked on every request, staff session
 *     lifetimes, fresh session for writes, audited PII reveal, role grants via bootstrap (sessions revoked).
 * Other modes (a config change only): email + TOTP, and the original Google-only + TOTP policy.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { accounts, auditLog, bootstrapAdmin, sessions, staffCapabilities, users } from '@soyl/db';
import { ADMIN_AUDIT_ACTIONS } from '@soyl/shared/config/analytics';
import { SESSION, STAFF_AUTH } from '@soyl/shared/config/security';
import { base32Decode, stepAt, totpAt } from '../src/auth/mfa';
import { loadConfig } from '../src/config';
import { createHarness, securityEvents, STAFF_DOMAIN, STAFF_EMAIL_TOTP, STAFF_GOOGLE_TOTP, type Client, type Harness } from './helpers';

let h: Harness;
let n = 0;
const uniq = () => `${Date.now().toString(36)}${++n}`;
const email = () => `staff.${uniq()}@example.com`;
const phone = () => `+91555000${String(1000 + (n++ % 9000)).padStart(4, '0')}`;
const RANGE = '?from=2026-09-01&to=2026-09-30';
const SESSION_COOKIE = '__Host-soyl_session';

/** A member account (signed up by email) promoted to staff directly in the database. */
async function promote(userId: string, role: 'reviewer' | 'admin', superadmin = false) {
  await h.t.db.update(users).set({ role }).where(eq(users.id, userId));
  if (superadmin) await h.t.db.insert(staffCapabilities).values({ userId, capability: 'superadmin' });
}

beforeAll(async () => {
  h = await createHarness();
});
afterAll(async () => {
  await h?.close();
});

describe('owner default: email one-time code, no second factor (ADR-026)', () => {
  it('the harness runs the real default policy', () => {
    expect(STAFF_AUTH).toEqual({ signInMethods: ['email'], secondFactor: 'none' });
    expect(h.config.staffAuth).toEqual(STAFF_AUTH);
  });

  it('an admin signs in with the email code and reaches /admin without TOTP', async () => {
    const mail = email();
    const { user } = await h.client().signInEmail(mail);
    await promote(user.id, 'admin');
    const c = h.client();
    const res = await c.signInEmail(mail);
    expect(res.user).toMatchObject({ id: user.id, role: 'admin' });
    expect(c.jar.get(SESSION_COOKIE)).toBeTruthy();
    expect((await c.get('/v1/admin/me')).json()).toEqual({ userId: user.id, role: 'admin', capabilities: [], sections: ['reports'] });
    expect((await c.get('/v1/admin/reports')).statusCode).toBe(200);
    // Nothing was enrolled: the TOTP routes still exist and report no enrolment.
    expect((await c.get('/v1/me/mfa')).json()).toEqual({ enrolled: false, confirmed: false, sessionVerified: false, recoveryCodesRemaining: 0 });
  });

  it('a reviewer signs in with the email code (reports only)', async () => {
    const mail = email();
    const { user } = await h.client().signInEmail(mail);
    await promote(user.id, 'reviewer');
    const c = h.client();
    await c.signInEmail(mail);
    expect((await c.get('/v1/admin/me')).json()).toEqual({ userId: user.id, role: 'reviewer', capabilities: [], sections: ['reports'] });
    expect((await c.get(`/v1/admin/analytics/overview${RANGE}`)).json().code).toBe('forbidden');
  });

  it('phone OTP stays refused for staff (no session; security event)', async () => {
    const p = phone();
    const { user } = await h.client().signInPhone(p);
    await promote(user.id, 'reviewer');
    h.clock.advance(60_000);
    const c = h.client();
    await c.post('/v1/auth/phone/send-otp', { phoneNumber: p });
    const res = await c.post('/v1/auth/phone/verify', { phoneNumber: p, code: h.sms.lastCode(p)! });
    expect(res.statusCode).toBe(403);
    expect(res.json().code).toBe('staff_sign_in_method_not_allowed');
    expect(c.jar.get(SESSION_COOKIE)).toBeUndefined();
    expect(securityEvents(h.logs, 'staff_sign_in_refused').some((l) => l.userId === user.id && l.reason === 'method' && l.method === 'phone')).toBe(true);
  });

  it('Google is not a staff method by default, even from the allow-listed Workspace domain', async () => {
    const id = uniq();
    const sub = `staff-g-${id}`;
    const mail = `reviewer.${id}@${STAFF_DOMAIN}`;
    h.oidc.nextUser({ sub, email: mail, hd: STAFF_DOMAIN });
    await h.client().signInGoogle();
    const [acct] = await h.t.db.select().from(accounts).where(and(eq(accounts.providerId, 'google'), eq(accounts.accountId, sub)));
    await promote(acct!.userId, 'reviewer');
    const c = h.client();
    h.oidc.nextUser({ sub, email: mail, hd: STAFF_DOMAIN });
    const { location } = await c.signInGoogle();
    expect(new URL(location).searchParams.get('authError')).toBe('staff_sign_in_method_not_allowed');
    expect(c.jar.get(SESSION_COOKIE)).toBeUndefined();
  });

  it('staff email sessions keep the staff lifetimes: 60 minutes idle, 12 hours at most (AUTH-9)', async () => {
    const mail = email();
    const { user } = await h.client().signInEmail(mail);
    await promote(user.id, 'admin');
    const c = h.client();
    await c.signInEmail(mail);
    h.clock.advance(59 * 60_000);
    expect((await c.get('/v1/session')).json().authenticated).toBe(true);
    h.clock.advance(61 * 60_000);
    expect((await c.get('/v1/session')).json().authenticated).toBe(false);

    const c2 = h.client();
    await c2.signInEmail(mail);
    // Active every 55 minutes: still signed in just before 12 hours, signed out after.
    const step = 55 * 60;
    let elapsed = 0;
    while (elapsed + step < SESSION.lifetimes.staff.absoluteSeconds) {
      h.clock.advance(step * 1000);
      elapsed += step;
      expect((await c2.get('/v1/session')).json().authenticated, `after ${elapsed / 60} min`).toBe(true);
    }
    h.clock.advance(step * 1000);
    expect((await c2.get('/v1/session')).json().authenticated).toBe(false);
  });

  it('staff writes still need a fresh session (AUTH-9)', async () => {
    const mail = email();
    const { user } = await h.client().signInEmail(mail);
    await promote(user.id, 'admin');
    const c = h.client();
    await c.signInEmail(mail);
    h.clock.advance(11 * 60_000);
    const res = await c.post('/v1/admin/coins/redemptions/00000000-0000-7000-8000-000000000000/approve', {});
    expect(res.json().code).toBe('fresh_session_required');
  });
});

describe('superadmin under the default policy', () => {
  let sa: Client;
  let saId: string;
  let target: string;

  beforeAll(async () => {
    const mail = email();
    const { user } = await h.client().signInEmail(mail);
    await promote(user.id, 'admin', true);
    saId = user.id;
    sa = h.client();
    await sa.signInEmail(mail);
    target = (await h.client().signInEmail(email())).user.id;
  });

  it('reaches the dashboard and the audited PII reveal without TOTP', async () => {
    expect((await sa.get('/v1/admin/me')).json()).toEqual({ userId: saId, role: 'admin', capabilities: ['superadmin'], sections: ['analytics', 'users', 'reports'] });
    expect((await sa.get(`/v1/admin/analytics/overview${RANGE}`)).statusCode).toBe(200);
    const reveal = await sa.post(`/v1/admin/users/${target}/reveal`, {});
    expect(reveal.statusCode).toBe(200);
    expect(reveal.json()).toMatchObject({ id: target, audited: true });
    const rows = await h.t.db.select().from(auditLog).where(and(eq(auditLog.action, ADMIN_AUDIT_ACTIONS.revealEmail), eq(auditLog.targetId, target)));
    expect(rows).toHaveLength(1);
    expect(rows[0]!.actorUserId).toBe(saId);
  });

  it('the superadmin capability is checked on every request: removing it closes the dashboard at once', async () => {
    await h.t.db.delete(staffCapabilities).where(eq(staffCapabilities.userId, saId));
    expect((await sa.get(`/v1/admin/analytics/overview${RANGE}`)).json().code).toBe('forbidden');
    expect((await sa.get('/v1/admin/me')).json()).toMatchObject({ capabilities: [], sections: ['reports'] });
    await h.t.db.insert(staffCapabilities).values({ userId: saId, capability: 'superadmin' });
    expect((await sa.get(`/v1/admin/analytics/overview${RANGE}`)).statusCode).toBe(200);
  });
});

describe('admin bootstrap CLI + first email sign-in (runbook: admin-dashboard.md)', () => {
  it('bootstrap --role superadmin for a new email: the first email sign-in lands as a superadmin', async () => {
    const mail = email();
    const r = await bootstrapAdmin(h.t.db, mail, 'superadmin');
    expect(r).toMatchObject({ created: true, changed: true, role: 'superadmin' });
    const c = h.client();
    const res = await c.signInEmail(mail);
    expect(res.user).toMatchObject({ id: r.userId, role: 'admin' });
    expect(res.isNewUser).toBe(false);
    const [u] = await h.t.db.select().from(users).where(eq(users.id, r.userId));
    expect(u!.emailVerified).toBe(true);
    expect((await c.get('/v1/admin/me')).json()).toEqual({ userId: r.userId, role: 'admin', capabilities: ['superadmin'], sections: ['analytics', 'users', 'reports'] });
    expect((await c.get(`/v1/admin/analytics/overview${RANGE}`)).statusCode).toBe(200);
  });

  it('bootstrap of an account that signed up by email revokes its sessions; the next email sign-in is staff', async () => {
    const mail = email();
    const member = h.client();
    const { user } = await member.signInEmail(mail);
    const r = await bootstrapAdmin(h.t.db, mail.toUpperCase(), 'superadmin');
    expect(r).toMatchObject({ userId: user.id, created: false, changed: true, sessionsRevoked: 1 });
    expect(await h.t.db.select().from(sessions).where(eq(sessions.userId, user.id))).toHaveLength(0);
    expect((await member.get('/v1/session')).json().authenticated).toBe(false);
    const c = h.client();
    expect((await c.signInEmail(mail)).user.role).toBe('admin');
    expect((await c.get(`/v1/admin/analytics/overview${RANGE}`)).statusCode).toBe(200);
  });
});

describe('switching back is a config change (other STAFF_AUTH modes)', () => {
  it("email + TOTP (ADR-011): staff sign in by email, staff routes need a verified session", async () => {
    const t = await createHarness({ t: h.t, staffAuth: STAFF_EMAIL_TOTP });
    try {
      const mail = email();
      const { user } = await t.client().signInEmail(mail);
      await promote(user.id, 'admin');
      const c = t.client();
      await c.signInEmail(mail);
      expect((await c.get('/v1/admin/me')).json().code).toBe('mfa_required');
      const { secret } = (await c.post('/v1/me/mfa/totp/enroll')).json() as { secret: string };
      const ok = await c.post('/v1/me/mfa/totp/confirm', { code: totpAt(base32Decode(secret), stepAt(t.clock.now())) });
      expect(ok.statusCode).toBe(200);
      expect((await c.get('/v1/admin/me')).statusCode).toBe(200);
      // A new session of the same account must verify again.
      const c2 = t.client();
      await c2.signInEmail(mail);
      expect((await c2.get('/v1/admin/reports')).json().code).toBe('mfa_required');
    } finally {
      await t.close();
    }
  });

  it('Google only + TOTP (original AUTH-11): staff OTP sign-in is refused with staff_sign_in_requires_google', async () => {
    const t = await createHarness({ t: h.t, staffAuth: STAFF_GOOGLE_TOTP });
    try {
      const mail = email();
      const { user } = await t.client().signInEmail(mail);
      await promote(user.id, 'reviewer');
      const c = t.client();
      await c.post('/v1/auth/email/send-otp', { email: mail });
      const res = await c.post('/v1/auth/email/verify', { email: mail, code: t.email.lastCode(mail)! });
      expect(res.statusCode).toBe(403);
      expect(res.json().code).toBe('staff_sign_in_requires_google');
      expect(c.jar.get(SESSION_COOKIE)).toBeUndefined();
    } finally {
      await t.close();
    }
  });

  it('the API refuses to start with an invalid staff policy', () => {
    expect(() => loadConfig({ APP_ENV: 'test' }, { staffAuth: { signInMethods: [], secondFactor: 'none' } })).toThrow(/STAFF_AUTH\.signInMethods must list at least one method/);
    expect(loadConfig({ APP_ENV: 'test' }).staffAuth).toEqual(STAFF_AUTH);
    expect(loadConfig({ APP_ENV: 'test' }, { staffAuth: STAFF_GOOGLE_TOTP }).staffAuth).toEqual(STAFF_GOOGLE_TOTP);
  });
});
