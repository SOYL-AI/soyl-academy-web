/**
 * D-055 email reminder settings and signed email links over HTTP (notifications/routes.ts) on a real PostgreSQL:
 * the student's settings (masked), phone-only accounts, the optional parent address (own address rejected, one
 * confirmation email, rate limits, resend replaces the link, change and removal), confirm only on POST with the latest
 * unexpired link, unsubscribe (page and RFC 8058 one-click, tampering), roles and CSRF, and account deletion.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { auditLog, notificationPreferences, reminderLog, users } from '@soyl/db';
import { REMINDERS } from '@soyl/shared/config/notifications';
import { createHarness, PUBLIC_BASE, type Client, type Harness } from './helpers';

let h: Harness;
let n = 0;
const uniq = () => `${Date.now().toString(36)}${(++n).toString(36)}`;
const PREFS = '/v1/me/email-preferences';
const PARENT = '/v1/me/parent-email';

beforeAll(async () => {
  h = await createHarness();
});
afterAll(async () => {
  await h?.close();
});

async function studentClient(): Promise<{ c: Client; id: string; email: string }> {
  const c = h.client();
  const email = `asha.${uniq()}@school.soyl.in`;
  const r = await c.signInEmail(email);
  return { c, id: r.user.id, email };
}
const put = (c: Client, email: string) => c.request('PUT', PARENT, { body: { email } });
const confirmMail = (to: string) => h.email.last(to);
const tokenIn = (text: string) => /#t=([^\s]+)/.exec(text)![1]!;
const prefsRow = async (userId: string) => (await h.t.db.select().from(notificationPreferences).where(eq(notificationPreferences.userId, userId)))[0];
/** A fresh IP per parent-address request, so per-IP limits never mix tests. */
const nextIp = () => `198.51.100.${(n % 250) + 1}`;

describe('student settings', () => {
  it('GET: masked address, reminders on by default, no parent', async () => {
    const s = await studentClient();
    const res = await s.c.get(PREFS);
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ studentEmail: `a***@school.soyl.in`, reminders: true, remindersAvailable: true, parent: { email: null, status: 'none', reminders: true, unsubscribedAt: null } });
    expect(res.headers['cache-control']).toBe('no-store');
  });

  it('PATCH turns reminders off and on', async () => {
    const s = await studentClient();
    expect((await s.c.patch(PREFS, { reminders: false })).json().reminders).toBe(false);
    expect((await prefsRow(s.id))!.studentReminders).toBe(false);
    expect((await s.c.patch(PREFS, { reminders: true })).json().reminders).toBe(true);
    expect((await s.c.patch(PREFS, { reminders: true, extra: 1 })).statusCode).toBe(400);
  });

  it('a phone-only account: no reminders possible, and turning them on is refused', async () => {
    const c = h.client();
    await c.signInPhone(`+91555000${String(4000 + (n++ % 999)).padStart(4, '0')}`);
    const view = (await c.get(PREFS)).json();
    expect(view).toMatchObject({ studentEmail: null, reminders: false, remindersAvailable: false });
    const res = await c.patch(PREFS, { reminders: true });
    expect(res.statusCode).toBe(409);
    expect(res.json().code).toBe('reminders_unavailable');
  });

  it('students only, signed in, with an allowed Origin', async () => {
    expect((await h.client().get(PREFS)).statusCode).toBe(401);
    const s = await studentClient();
    await h.t.db.update(users).set({ role: 'reviewer' }).where(eq(users.id, s.id));
    expect((await s.c.get(PREFS)).statusCode).toBe(403);
    const t = await studentClient();
    const res = await t.c.request('PUT', PARENT, { body: { email: 'mum@home.soyl.in' }, origin: 'https://evil.example' });
    expect(res.statusCode).toBe(403);
    expect(res.json().code).toBe('origin_not_allowed');
  });
});

describe('parent email', () => {
  it('rejects an invalid address and the student’s own address', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    expect((await put(s.c, 'not-an-email')).json().code).toBe('validation_failed');
    const own = await put(s.c, s.email.toUpperCase());
    expect(own.statusCode).toBe(400);
    expect(own.json().errors[0].message).toMatch(/not your own/);
    expect(await prefsRow(s.id)).toBeUndefined();
  });

  it('adds it as pending and sends ONE confirmation email; GET and POST decide, a GET never confirms', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    const parent = `mum.${uniq()}@home.soyl.in`;
    const before = h.email.outbox.length;
    const res = await put(s.c, `  ${parent.toUpperCase()} `);
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ parent: { email: 'm***@home.soyl.in', status: 'pending', reminders: true }, resendAfterSeconds: REMINDERS.resendAfterSeconds });
    const sent = h.email.outbox.slice(before);
    expect(sent).toHaveLength(1);
    const m = sent[0]!;
    expect(m.to).toBe(parent);
    expect(m.tag).toBe('reminder-parent-confirm');
    expect(m.text).toContain(`${PUBLIC_BASE}/me/email/parent-confirm#t=`);
    expect(m.text).toContain('a***@school.soyl.in');
    expect(m.text).not.toContain(s.email);
    const token = tokenIn(m.text);

    // Link scanners: GET of the API path is not a route; the state stays pending.
    expect((await h.client().get(`/v1/email/parent-confirm?token=${token}`)).statusCode).toBe(404);
    expect((await prefsRow(s.id))!.parentStatus).toBe('pending');

    const guest = h.client();
    const ok = await guest.post('/v1/email/parent-confirm', { token });
    expect(ok.statusCode).toBe(200);
    expect(ok.json()).toEqual({ status: 'active', alreadyConfirmed: false });
    expect((await guest.post('/v1/email/parent-confirm', { token })).json()).toEqual({ status: 'active', alreadyConfirmed: true });
    expect((await s.c.get(PREFS)).json().parent).toMatchObject({ status: 'active', email: 'm***@home.soyl.in' });
    const audits = await h.t.db.select().from(auditLog).where(eq(auditLog.targetId, s.id));
    expect(audits.map((a) => a.action)).toContain('email.parent_confirmed');
    // Same address again while active: nothing sent.
    const again = h.email.outbox.length;
    expect((await put(s.c, parent)).json().parent.status).toBe('active');
    expect(h.email.outbox.length).toBe(again);
  });

  it('a tampered, replaced or expired link confirms nothing', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    const parent = `dad.${uniq()}@home.soyl.in`;
    await put(s.c, parent);
    const first = tokenIn(confirmMail(parent)!.text);
    const tampered = `${first.slice(0, -2)}${first.endsWith('AA') ? 'BB' : 'AA'}`;
    let res = await h.client().post('/v1/email/parent-confirm', { token: tampered });
    expect(res.statusCode).toBe(410);
    expect((await h.client().post('/v1/email/parent-confirm', { token: 'garbage-token-value' })).json().code).toBe('email_link_invalid');
    expect((await h.client().post('/v1/email/parent-confirm', { token: h.services.emailTokens.studentUnsubscribe(s.id) })).json().code).toBe('email_link_invalid');

    // Resend (after the per-account minute): the first link dies, the new one works only within the TTL.
    h.clock.advance(61_000);
    const resent = await s.c.post('/v1/me/parent-email/resend');
    expect(resent.json()).toMatchObject({ parent: { status: 'pending' }, resendAfterSeconds: REMINDERS.resendAfterSeconds });
    const second = tokenIn(confirmMail(parent)!.text);
    expect(second).not.toBe(first);
    res = await h.client().post('/v1/email/parent-confirm', { token: first });
    expect(res.json().code).toBe('email_link_expired');
    h.clock.advance(REMINDERS.parentConfirmTtlHours * 3_600_000 + 1000);
    res = await h.client().post('/v1/email/parent-confirm', { token: second });
    expect(res.json().code).toBe('email_link_expired');
    expect((await prefsRow(s.id))!.parentStatus).toBe('pending');
  });

  it('rate-limits confirmation sends per account', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    expect((await put(s.c, `a.${uniq()}@home.soyl.in`)).statusCode).toBe(200);
    const res = await put(s.c, `b.${uniq()}@home.soyl.in`);
    expect(res.statusCode).toBe(429);
    expect(res.json().code).toBe('rate_limited');
  });

  it('a failed confirmation email leaves no working link and says so', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    h.email.failing = true;
    try {
      const res = await put(s.c, `c.${uniq()}@home.soyl.in`);
      expect(res.statusCode).toBe(503);
    } finally {
      h.email.failing = false;
    }
    expect((await prefsRow(s.id))!.parentConfirmSentAt).toBeNull();
  });

  it('changing the address needs a new confirmation and kills the old parent’s links; removing erases it', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    const first = `p1.${uniq()}@home.soyl.in`;
    await put(s.c, first);
    await h.client().post('/v1/email/parent-confirm', { token: tokenIn(confirmMail(first)!.text) });
    const oldGen = (await prefsRow(s.id))!.parentGeneration;
    const oldUnsub = h.services.emailTokens.parentUnsubscribe(s.id, oldGen);

    h.clock.advance(61_000);
    const second = `p2.${uniq()}@home.soyl.in`;
    expect((await put(s.c, second)).json().parent).toMatchObject({ status: 'pending', email: 'p***@home.soyl.in' });
    expect((await prefsRow(s.id))!.parentEmail).toBe(second);
    // The first parent's unsubscribe link no longer touches the new address.
    expect((await h.client().post('/v1/email/unsubscribe', { token: oldUnsub })).json()).toEqual({ kind: 'parent', alreadyOff: true });
    expect((await prefsRow(s.id))!.parentEmail).toBe(second);

    const removed = await s.c.delete(PARENT);
    // Nothing pending: a resend sends nothing.
    const count = h.email.outbox.length;
    expect(removed.json().parent).toEqual({ email: null, status: 'none', reminders: true, unsubscribedAt: null });
    expect((await prefsRow(s.id))!.parentEmail).toBeNull();
    expect((await s.c.delete(PARENT)).statusCode).toBe(200);
    expect((await s.c.post('/v1/me/parent-email/resend')).json().resendAfterSeconds).toBe(0);
    expect(h.email.outbox.length).toBe(count);
  });
});

describe('unsubscribe', () => {
  it('the page button turns the student’s reminders off; replays are idempotent; tampering is refused', async () => {
    const s = await studentClient();
    const token = h.services.emailTokens.studentUnsubscribe(s.id);
    const bad = `${token.slice(0, -1)}${token.endsWith('x') ? 'y' : 'x'}`;
    const res = await h.client().post('/v1/email/unsubscribe', { token: bad });
    expect(res.statusCode).toBe(404);
    expect(res.json().code).toBe('email_link_invalid');
    expect((await s.c.get(PREFS)).json().reminders).toBe(true);
    expect((await h.client().post('/v1/email/unsubscribe', { token })).json()).toEqual({ kind: 'student', alreadyOff: false });
    expect((await h.client().post('/v1/email/unsubscribe', { token })).json()).toEqual({ kind: 'student', alreadyOff: true });
    expect((await s.c.get(PREFS)).json().reminders).toBe(false);
  });

  it('RFC 8058 one-click: a form POST without Origin or cookies, token in the query', async () => {
    const s = await studentClient();
    const token = h.services.emailTokens.studentUnsubscribe(s.id);
    const url = `/v1/email/unsubscribe/one-click?token=${token}`;
    const res = await h.client().request('POST', url, { rawBody: 'List-Unsubscribe=One-Click', origin: null, cookies: false, headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ kind: 'student', alreadyOff: false });
    expect((await prefsRow(s.id))!.studentReminders).toBe(false);
    // Tampered query token; and a GET (link scanners) is not a route.
    const bad = await h.client().request('POST', `/v1/email/unsubscribe/one-click?token=${token.slice(0, -1)}A`, { rawBody: 'List-Unsubscribe=One-Click', origin: null, headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    expect(bad.statusCode).toBe(404);
    expect((await h.client().get(url)).statusCode).toBe(404);
    // The JSON-only rule still holds everywhere else.
    const form = await s.c.request('PATCH', PREFS, { rawBody: 'reminders=true', headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    expect(form.statusCode).toBe(415);
  });

  it('the parent’s link erases the parent address; the student sees when', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    const parent = `gran.${uniq()}@home.soyl.in`;
    await put(s.c, parent);
    await h.client().post('/v1/email/parent-confirm', { token: tokenIn(confirmMail(parent)!.text) });
    const gen = (await prefsRow(s.id))!.parentGeneration;
    const token = h.services.emailTokens.parentUnsubscribe(s.id, gen);
    expect((await h.client().post('/v1/email/unsubscribe', { token })).json()).toEqual({ kind: 'parent', alreadyOff: false });
    const row = (await prefsRow(s.id))!;
    expect(row).toMatchObject({ parentEmail: null, parentStatus: 'none', parentGeneration: gen + 1 });
    const view = (await s.c.get(PREFS)).json();
    expect(view.parent.status).toBe('none');
    expect(view.parent.unsubscribedAt).not.toBeNull();
    expect((await h.client().post('/v1/email/unsubscribe', { token })).json()).toEqual({ kind: 'parent', alreadyOff: true });
  });
});

describe('account deletion', () => {
  it('DELETE /v1/me removes the settings and the parent address at once; the log goes with the purge', async () => {
    const s = await studentClient();
    s.c.ip = nextIp();
    await put(s.c, `x.${uniq()}@home.soyl.in`);
    await h.t.db.insert(reminderLog).values({ userId: s.id, kind: 'student', istDay: '2026-11-01', status: 'sent', claimedAt: new Date(), sentAt: new Date() });
    expect(await prefsRow(s.id)).toBeDefined();
    const res = await s.c.delete('/v1/me');
    expect(res.statusCode).toBe(200);
    expect(await prefsRow(s.id)).toBeUndefined();
    // A student link for a deleted account does nothing (and creates nothing).
    expect((await h.client().post('/v1/email/unsubscribe', { token: h.services.emailTokens.studentUnsubscribe(s.id) })).json()).toEqual({ kind: 'student', alreadyOff: true });
    expect(await prefsRow(s.id)).toBeUndefined();
    expect(await h.t.db.select().from(reminderLog).where(eq(reminderLog.userId, s.id))).toHaveLength(1);
    await h.t.db.delete(users).where(eq(users.id, s.id));
    expect(await h.t.db.select().from(reminderLog).where(eq(reminderLog.userId, s.id))).toHaveLength(0);
  });
});
