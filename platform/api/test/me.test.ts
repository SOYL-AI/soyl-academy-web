/**
 * /v1/me: profile read/update (API-8 allowlist, AC-18 display names, D-014 school field), sessions
 * list/revoke with IDOR checks (API-7, AUTH-10), account deletion (PII.md, AUTH-10, AC-25).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { accounts, auditLog, consentStatus, guardianLinks, profiles, schools, sessions, users, verifications } from '@soyl/db';
import { authEvents, createHarness, type Harness } from './helpers';

let h: Harness;
let n = 0;
const email = (p: string) => `${p}.${Date.now().toString(36)}${++n}@example.com`;

beforeAll(async () => {
  h = await createHarness();
});
afterAll(async () => {
  await h?.close();
});

describe('GET/PATCH /v1/me', () => {
  it('returns the profile, consent state and methods', async () => {
    const c = h.client();
    const e = email('me');
    const { user } = await c.signInEmail(e);
    const res = await c.get('/v1/me');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toBe('no-store');
    expect(res.json()).toMatchObject({ id: user.id, role: 'student', displayName: null, board: null, classLevel: null, locale: 'en-IN', consent: 'required', methods: { email: e, phone: null, google: false } });
    // D-014: no school without consent (no raw schoolId/city ever); an auto-generated public name instead of any real name.
    expect(res.json()).not.toHaveProperty('schoolId');
    expect(res.json()).not.toHaveProperty('city');
    expect(res.json()).toMatchObject({ school: null, weeklyGoal: { target: 20, isDefault: true } });
    expect(res.json().publicName).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+ [0-9]{3}$/);
  });

  it('updates board, class, display name and locale', async () => {
    const c = h.client();
    await c.signInEmail(email('patch'));
    const res = await c.patch('/v1/me', { board: 'cbse', classLevel: 10, displayName: '  Priya   S. ', locale: 'hi-IN' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ board: 'cbse', classLevel: 10, displayName: 'Priya S.', locale: 'hi-IN' });
    expect((await c.get('/v1/session')).json().user).toMatchObject({ board: 'cbse', classLevel: 10, displayName: 'Priya S.' });
  });

  it.each([['role', { role: 'admin' }], ['xp', { xp: 1000 }], ['status', { status: 'x' }], ['user_id', { user_id: 'x' }], ['email', { email: 'x@example.com' }]])(
    'refuses %s (API-8 mass assignment)',
    async (_k, body) => {
      const c = h.client();
      const { user } = await c.signInEmail(email('mass'));
      const res = await c.patch('/v1/me', body);
      expect(res.statusCode).toBe(400);
      const [u] = await h.t.db.select().from(users).where(eq(users.id, user.id));
      expect(u!.role).toBe('student');
    },
  );

  it.each(['Rahul 9876543210', 'insta @rahul_99', 'www.rahul.com', 'x', 'A very very long display name', 'Ch0tiya', 'f u c k', 'Admin', 'Bad​Name'])(
    'rejects the display name %j (AC-18)',
    async (name) => {
      const c = h.client();
      await c.signInEmail(email('dn'));
      const res = await c.patch('/v1/me', { displayName: name });
      expect(res.statusCode).toBe(400);
      expect(res.json().errors[0].path).toBe('body.displayName');
    },
  );

  it('accepts Devanagari names', async () => {
    const c = h.client();
    await c.signInEmail(email('hi'));
    const res = await c.patch('/v1/me', { displayName: 'अनन्या' });
    expect(res.statusCode).toBe(200);
    expect(res.json().displayName).toBe('अनन्या');
  });

  it('rejects an out-of-range class and an unknown board', async () => {
    const c = h.client();
    await c.signInEmail(email('range'));
    expect((await c.patch('/v1/me', { classLevel: 6 })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { board: 'ib' })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', {})).statusCode).toBe(400);
  });

  it('school is consent-gated (D-014): refused without consent and nothing stored; raw schoolId/city fields are never accepted', async () => {
    const [school] = await h.t.db.insert(schools).values({ name: 'Test School', nameNormalized: 'test school', city: 'Pune', cityNormalized: 'pune', source: 'udise', verifiedAt: new Date() }).returning();
    const c = h.client();
    const { user } = await c.signInEmail(email('school'));
    // Raw columns are not part of the allowlist (API-8), with or without consent.
    expect((await c.patch('/v1/me', { schoolId: school!.id })).json().code).toBe('validation_failed');
    expect((await c.patch('/v1/me', { city: 'Pune' })).statusCode).toBe(400);
    // `school` without consent: 403 consent_required, nothing stored, nothing created.
    const denied = await c.patch('/v1/me', { school: { schoolId: school!.id } });
    expect(denied.statusCode).toBe(403);
    expect(denied.json().code).toBe('consent_required');
    const create = await c.patch('/v1/me', { school: { name: 'Unconsented Academy', city: 'Pune' } });
    expect(create.json().code).toBe('consent_required');
    expect(await h.t.db.select().from(schools).where(eq(schools.nameNormalized, 'unconsented academy'))).toHaveLength(0);
    // Clearing is always allowed.
    expect((await c.patch('/v1/me', { school: null })).statusCode).toBe(200);
    let [p] = await h.t.db.select().from(profiles).where(eq(profiles.userId, user.id));
    expect({ schoolId: p?.schoolId ?? null, city: p?.city ?? null }).toEqual({ schoolId: null, city: null });

    h.consent.setStatus(user.id, 'granted');
    h.clock.advance(16 * 60_000); // cache TTL
    const ok = await c.patch('/v1/me', { school: { schoolId: school!.id } });
    expect(ok.statusCode, ok.body).toBe(200);
    expect(ok.json().school).toEqual({ id: school!.id, name: 'Test School', city: 'Pune', state: null, board: null, verified: true });
    [p] = await h.t.db.select().from(profiles).where(eq(profiles.userId, user.id));
    expect({ schoolId: p!.schoolId, city: p!.city }).toEqual({ schoolId: school!.id, city: 'Pune' });
    expect((await c.get('/v1/me')).json()).not.toHaveProperty('schoolId');

    // Consent no longer granted (e.g. another provider's revocation): stored, but never returned.
    h.consent.setStatus(user.id, 'revoked');
    h.clock.advance(16 * 60_000);
    const me = (await c.get('/v1/me')).json();
    expect(me.consent).toBe('revoked');
    expect(me.school).toBeNull();
    expect(JSON.stringify(me)).not.toContain('Pune');
  });

  it('weekly goal: default until set, bounds enforced, null resets', async () => {
    const c = h.client();
    await c.signInEmail(email('goal'));
    expect((await c.get('/v1/me')).json().weeklyGoal).toEqual({ target: 20, isDefault: true });
    expect((await c.patch('/v1/me', { weeklyGoal: 35 })).json().weeklyGoal).toEqual({ target: 35, isDefault: false });
    expect((await c.patch('/v1/me', { weeklyGoal: 4 })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { weeklyGoal: 301 })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { weeklyGoal: 2.5 })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { weeklyGoal: null })).json().weeklyGoal).toEqual({ target: 20, isDefault: true });
  });
});

describe('sessions (AUTH-9, AUTH-10, API-7)', () => {
  it('lists sessions and revokes one; another user\'s session id is 404', async () => {
    const e = email('sess');
    const a1 = h.client();
    const a2 = h.client();
    await a1.signInEmail(e);
    h.clock.advance(31_000);
    await a2.signInEmail(e);
    const list = (await a1.get('/v1/me/sessions')).json().sessions;
    expect(list).toHaveLength(2);
    expect(list.filter((s: { current: boolean }) => s.current)).toHaveLength(1);
    const other = list.find((s: { current: boolean }) => !s.current);

    const mallory = h.client();
    await mallory.signInEmail(email('mallory'));
    const idor = await mallory.delete(`/v1/me/sessions/${other.id}`);
    expect(idor.statusCode).toBe(404);
    expect((await a2.get('/v1/session')).json().authenticated).toBe(true);

    expect((await a1.delete(`/v1/me/sessions/${other.id}`)).statusCode).toBe(204);
    expect((await a2.get('/v1/session')).json().authenticated).toBe(false);
    expect(authEvents(h.logs, 'session_revoked').length).toBeGreaterThan(0);
  });

  it('signs out everywhere else', async () => {
    const e = email('others');
    const clients = [h.client(), h.client(), h.client()];
    for (const c of clients) {
      await c.signInEmail(e);
      h.clock.advance(31_000);
    }
    const res = await clients[0]!.delete('/v1/me/sessions');
    expect(res.json()).toEqual({ revoked: 2 });
    expect((await clients[0]!.get('/v1/session')).json().authenticated).toBe(true);
    expect((await clients[1]!.get('/v1/session')).json().authenticated).toBe(false);
  });

  it('keeps at most 5 member sessions (oldest revoked)', async () => {
    const e = email('five');
    const clients = Array.from({ length: 6 }, () => h.client());
    for (const c of clients) {
      await c.signInEmail(e);
      h.clock.advance(5 * 60_000);
      h.clock.advance(11 * 60_000); // email send cap: 3 per 15 min
    }
    expect((await clients[0]!.get('/v1/session')).json().authenticated).toBe(false);
    expect((await clients[5]!.get('/v1/session')).json().authenticated).toBe(true);
    expect((await clients[5]!.get('/v1/me/sessions')).json().sessions).toHaveLength(5);
  });

  it('member sessions: rolled at most once a day, end after 30 days idle and 90 days absolute', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email('life'));
    const [s0] = await h.t.db.select().from(sessions).where(eq(sessions.userId, user.id));
    h.clock.advance(3600_000);
    await c.get('/v1/session');
    const [s1] = await h.t.db.select().from(sessions).where(eq(sessions.userId, user.id));
    expect(s1!.expiresAt.getTime()).toBe(s0!.expiresAt.getTime()); // not rolled within 24 h
    h.clock.advance(24 * 3600_000);
    const rolled = await c.get('/v1/session');
    expect(String(rolled.headers['set-cookie'])).toContain('__Host-soyl_session=');
    const [s2] = await h.t.db.select().from(sessions).where(eq(sessions.userId, user.id));
    expect(s2!.expiresAt.getTime()).toBeGreaterThan(s0!.expiresAt.getTime());

    // 30 days idle → gone
    h.clock.advance(31 * 86400_000);
    expect((await c.get('/v1/session')).json().authenticated).toBe(false);

    // absolute 90 days even with daily activity
    const d = h.client();
    await d.signInEmail(email('abs'));
    for (let day = 0; day < 80; day += 20) { // 80 days of activity
      h.clock.advance(20 * 86400_000);
      expect((await d.get('/v1/session')).json().authenticated).toBe(true);
    }
    h.clock.advance(15 * 86400_000);
    expect((await d.get('/v1/session')).json().authenticated).toBe(false);
  });

  it('a banned user\'s session stops working', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email('ban'));
    await h.t.db.update(users).set({ banned: true }).where(eq(users.id, user.id));
    expect((await c.get('/v1/me')).statusCode).toBe(401);
  });
});

describe('DELETE /v1/me (PII.md, AC-25)', () => {
  it('anonymises the account, removes personal rows, revokes every session and allows a fresh sign-up', async () => {
    const e = email('delete');
    const c = h.client();
    const other = h.client();
    const { user } = await c.signInEmail(e);
    h.clock.advance(31_000);
    await other.signInEmail(e);
    await c.patch('/v1/me', { displayName: 'Delete Me', board: 'cbse', classLevel: 9 });
    const parent = await h.client().signInEmail(email('parent'));
    await h.t.db.insert(guardianLinks).values({ parentUserId: parent.user.id, studentUserId: user.id });
    // a pending code for this address
    h.clock.advance(31_000);
    await h.client().post('/v1/auth/email/send-otp', { email: e });

    const res = await c.delete('/v1/me');
    expect(res.statusCode).toBe(200);
    expect(res.json().deleted).toBe(true);
    expect(res.headers['clear-site-data']).toBe('"cookies"');
    const purgeAfter = new Date(res.json().purgeAfter).getTime();
    expect(purgeAfter - h.clock.now()).toBe(30 * 86400_000);

    const [u] = await h.t.db.select().from(users).where(eq(users.id, user.id));
    expect(u).toMatchObject({ name: 'Deleted user', phoneNumber: null, image: null, emailNormalized: null, phoneE164: null });
    expect(u!.email).toBe(`deleted+${user.id}@deleted.soyl.invalid`);
    expect(u!.deletedAt).toBeInstanceOf(Date);
    const [p] = await h.t.db.select().from(profiles).where(eq(profiles.userId, user.id));
    expect(p).toMatchObject({ displayName: null, board: null, classLevel: null, schoolId: null, city: null });
    expect(await h.t.db.select().from(sessions).where(eq(sessions.userId, user.id))).toHaveLength(0);
    expect(await h.t.db.select().from(accounts).where(eq(accounts.userId, user.id))).toHaveLength(0);
    expect(await h.t.db.select().from(consentStatus).where(eq(consentStatus.userId, user.id))).toHaveLength(0);
    expect(await h.t.db.select().from(guardianLinks).where(eq(guardianLinks.studentUserId, user.id))).toHaveLength(0);
    const pendingCodes = await h.t.db.select().from(verifications).where(eq(verifications.identifier, h.services.otp.verificationId('email', e, 'sign-in')));
    expect(pendingCodes).toHaveLength(0);
    const audit = await h.t.db.select().from(auditLog).where(eq(auditLog.targetId, user.id));
    expect(audit[0]).toMatchObject({ action: 'account.delete_requested', actorUserId: user.id });
    expect(JSON.stringify(audit)).not.toContain(e);

    // both sessions are dead
    expect((await c.get('/v1/me')).statusCode).toBe(401);
    expect((await other.get('/v1/me')).statusCode).toBe(401);
    // the same address can start over as a new account
    h.clock.advance(16 * 60_000);
    const again = await h.client().signInEmail(e);
    expect(again.isNewUser).toBe(true);
    expect(again.user.id).not.toBe(user.id);
  });

  it('needs a fresh session', async () => {
    const c = h.client();
    await c.signInEmail(email('notfresh'));
    h.clock.advance(10 * 60_000 + 1000);
    expect((await c.delete('/v1/me')).json().code).toBe('fresh_session_required');
  });
});

describe('consent flow start', () => {
  it('moves required → pending through the provider and caches it', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email('consent'));
    const res = await c.post('/v1/me/consent/start');
    expect(res.json()).toEqual({ status: 'pending', redirectUrl: null });
    const [row] = await h.t.db.select().from(consentStatus).where(eq(consentStatus.userId, user.id));
    expect(row!.status).toBe('pending');
    h.consent.failing = true;
    try {
      expect((await c.post('/v1/me/consent/start')).statusCode).toBe(503);
    } finally {
      h.consent.failing = false;
    }
  });
});
