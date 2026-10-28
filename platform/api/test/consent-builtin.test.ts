/**
 * Built-in interim consent provider (D-039, ADR-022): the state machine, idempotency, expiry, wrong codes,
 * withdrawal by the student and by the parent's link (with AI data deletion), rate limits (account,
 * parent email, IP), the gates on AI, uploads and leaderboards, and the `unavailable`/`mock` providers
 * answering the new routes without changing.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { aiConversations, auditLog, consentRecords, consentStatus, profiles, uploads } from '@soyl/db';
import { AI_UPLOADS } from '@soyl/shared/config/ai-actions';
import { BUILTIN_CONSENT, CONSENT } from '@soyl/shared/config/security';
import { publicName } from '@soyl/shared/config/public-names';
import { BuiltinConsentProvider, maskEmail } from '../src/consent/builtin';
import { UnavailableConsentProvider } from '../src/consent/unavailable';
import { createAiHarness, type AiHarness } from './ai-fixture';
import { createHarness, type Client, type Harness } from './helpers';

let h: AiHarness;
let n = 0;
const uniq = () => `${Date.now().toString(36)}${++n}`;
const parentAddr = () => `parent.${uniq()}@example.org`;

beforeAll(async () => {
  h = await createAiHarness({ consentProvider: (t) => new BuiltinConsentProvider(t.db) });
});
afterAll(async () => {
  await h?.close();
});

async function student(): Promise<{ c: Client; id: string; email: string }> {
  const email = `kid.${uniq()}@example.com`;
  const c = h.client();
  const r = await c.signInEmail(email);
  return { c, id: r.user.id, email };
}

/** Last parent-approval email to `to`: code and withdraw token. */
function parentMail(to: string) {
  const m = h.email.last(to);
  if (!m || m.tag !== 'parent-consent') throw new Error(`no parent email to ${to}`);
  const code = m.text.match(/\b(\d{6})\b/)![1]!;
  const token = decodeURIComponent(m.text.match(/\/me\/consent\/parent#t=(\S+)/)![1]!);
  return { m, code, token };
}

async function minorWithCode(): Promise<{ c: Client; id: string; email: string; parent: string; code: string; token: string }> {
  const s = await student();
  expect((await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' })).statusCode).toBe(200);
  const parent = parentAddr();
  const sent = await s.c.post('/v1/me/consent/parent', { parentEmail: parent });
  expect(sent.statusCode, sent.body).toBe(200);
  return { ...s, parent, ...parentMail(parent) };
}

const status = async (c: Client) => (await c.get('/v1/me/consent')).json();
const cache = async (id: string) => (await h.t.db.select().from(consentStatus).where(eq(consentStatus.userId, id)))[0];

describe('built-in consent: state machine', () => {
  it('a new account is `required`, with no age band; GET says the built-in flow applies', async () => {
    const s = await student();
    expect(await status(s.c)).toMatchObject({ flow: 'builtin', status: 'required', ageBand: null, method: null, policyVersion: BUILTIN_CONSENT.policyVersion });
    const signIn = await h.client().signInEmail(s.email);
    expect(signIn.consent).toBe('required');
  });

  it('18+: needs the explicit agreement, then self-declares with an audit row; idempotent', async () => {
    const s = await student();
    const no = await s.c.post('/v1/me/consent/age-band', { ageBand: 'adult' });
    expect(no.statusCode).toBe(400);
    const res = await s.c.post('/v1/me/consent/age-band', { ageBand: 'adult', agree: true });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ status: 'granted', ageBand: 'adult', method: 'self_declared', revokedAt: null });
    expect(await cache(s.id)).toMatchObject({ status: 'granted', provider: 'builtin' });
    const [rec] = await h.t.db.select().from(consentRecords).where(eq(consentRecords.userId, s.id));
    expect(rec).toMatchObject({ policyVersion: BUILTIN_CONSENT.policyVersion, method: 'self_declared', parentEmailHash: null });
    const audit = await h.t.db.select().from(auditLog).where(and(eq(auditLog.targetId, s.id), eq(auditLog.action, 'consent.self_declared')));
    expect(audit).toHaveLength(1);
    expect(audit[0]!.after).toMatchObject({ status: 'granted', ageBand: 'adult', method: 'self_declared', policyVersion: BUILTIN_CONSENT.policyVersion });
    // Idempotent: the same declaration again changes nothing and writes no second audit row.
    const again = await s.c.post('/v1/me/consent/age-band', { ageBand: 'adult', agree: true });
    expect(again.json().grantedAt).toBe(res.json().grantedAt);
    expect(await h.t.db.select().from(auditLog).where(and(eq(auditLog.targetId, s.id), eq(auditLog.action, 'consent.self_declared')))).toHaveLength(1);
  });

  it('under 18: required → parent code → pending → right code → granted (method parent_email_code)', async () => {
    const s = await minorWithCode();
    const pending = await status(s.c);
    expect(pending).toMatchObject({ status: 'pending', ageBand: 'minor', parentEmailHint: maskEmail(s.parent) });
    expect(Date.parse(pending.codeExpiresAt) - h.clock.now()).toBe(BUILTIN_CONSENT.codeTtlSeconds * 1000);
    expect(await cache(s.id)).toMatchObject({ status: 'pending' });
    const ok = await s.c.post('/v1/me/consent/verify', { code: s.code });
    expect(ok.statusCode).toBe(200);
    expect(ok.json()).toMatchObject({ status: 'granted', method: 'parent_email_code', codeExpiresAt: null });
    expect(await cache(s.id)).toMatchObject({ status: 'granted' });
    // Single use and idempotent: replaying returns the granted state, any code.
    const replay = await s.c.post('/v1/me/consent/verify', { code: '000000' });
    expect(replay.statusCode).toBe(200);
    expect(replay.json().status).toBe('granted');
    // A further parent request after approval is a no-op (no email).
    const before = h.email.outbox.length;
    const again = await s.c.post('/v1/me/consent/parent', { parentEmail: s.parent });
    expect(again.json()).toMatchObject({ status: 'granted', resendAfterSeconds: 0 });
    expect(h.email.outbox.length).toBe(before);
    // Data minimisation: the parent email is never stored, only its keyed hash and a masked hint.
    const [rec] = await h.t.db.select().from(consentRecords).where(eq(consentRecords.userId, s.id));
    expect(JSON.stringify(rec)).not.toContain(s.parent);
    expect(rec!.parentEmailHash).toMatch(/^[0-9a-f]{64}$/);
    expect(rec!.codeHash).toBeNull();
  });

  it('wrong codes: 400 consent_code_invalid; after 5 the code is dead even for the right one', async () => {
    const s = await minorWithCode();
    const wrong = s.code === '111111' ? '222222' : '111111';
    for (let i = 0; i < BUILTIN_CONSENT.maxAttemptsPerCode; i++) {
      const r = await s.c.post('/v1/me/consent/verify', { code: wrong });
      expect(r.statusCode).toBe(400);
      expect(r.json().code).toBe('consent_code_invalid');
    }
    const dead = await s.c.post('/v1/me/consent/verify', { code: s.code });
    expect(dead.json().code).toBe('consent_code_expired');
    expect((await status(s.c)).status).toBe('pending');
  });

  it('expiry: the code is refused after 48 hours; a new request supersedes the old code', async () => {
    const s = await minorWithCode();
    h.clock.advance(BUILTIN_CONSENT.codeTtlSeconds * 1000 + 1000);
    const late = await s.c.post('/v1/me/consent/verify', { code: s.code });
    expect(late.statusCode).toBe(400);
    expect(late.json().code).toBe('consent_code_expired');
    const resend = await s.c.post('/v1/me/consent/parent', { parentEmail: s.parent });
    expect(resend.statusCode).toBe(200);
    const fresh = parentMail(s.parent);
    if (fresh.code !== s.code) expect((await s.c.post('/v1/me/consent/verify', { code: s.code })).json().code).toBe('consent_code_invalid');
    expect((await s.c.post('/v1/me/consent/verify', { code: fresh.code })).json().status).toBe('granted');
  });

  it('refuses the student’s own email as the parent’s, and the parent flow before declaring under 18', async () => {
    const s = await student();
    const early = await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() });
    expect(early.statusCode).toBe(409);
    expect(early.json().code).toBe('age_band_required');
    await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
    const own = await s.c.post('/v1/me/consent/parent', { parentEmail: s.email.toUpperCase() });
    expect(own.statusCode).toBe(400);
    expect(own.json().errors[0].path).toBe('body.parentEmail');
    expect((await s.c.post('/v1/me/consent/parent', { parentEmail: 'not-an-email' })).statusCode).toBe(400);
  });

  it('under 18 cannot switch itself to 18+; 18+ switching to under 18 withdraws the grant', async () => {
    const s = await student();
    await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
    const up = await s.c.post('/v1/me/consent/age-band', { ageBand: 'adult', agree: true });
    expect(up.statusCode).toBe(409);
    expect(up.json().code).toBe('age_band_locked');
    const a = await student();
    await a.c.post('/v1/me/consent/age-band', { ageBand: 'adult', agree: true });
    const down = await a.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
    expect(down.json()).toMatchObject({ status: 'required', ageBand: 'minor', method: null });
    expect(await cache(a.id)).toMatchObject({ status: 'required' });
  });

  it('the parent email names the student only by a masked address and explains what unlocks, data and links', async () => {
    const s = await minorWithCode();
    const { m } = parentMail(s.parent);
    expect(m.subject).toBe('Approve extra features on SOYL Academy');
    expect(m.text.startsWith(`Your approval code is ${s.code}`)).toBe(true);
    expect(m.text).not.toContain(s.email);
    expect(m.text).toContain(maskEmail(s.email));
    for (const words of ['AI tutor', 'Photo doubts', 'Leaderboards and rewards', 'Lessons, practice and tests are free', `${h.config.publicBaseUrl}/privacy`, `${h.config.publicBaseUrl}/terms`, '48 hours'])
      expect(m.text).toContain(words);
    expect(m.html).toContain(`${h.config.publicBaseUrl}/me/consent/parent#t=`);
    expect(m.html).not.toMatch(/<img|<script/i);
  });
});

describe('built-in consent: withdrawal', () => {
  it('the student withdraws: gated features off, AI conversations and uploads (with both blobs) deleted', async () => {
    const s = await minorWithCode();
    await s.c.post('/v1/me/consent/verify', { code: s.code });
    // AI data to delete.
    await h.t.db.insert(aiConversations).values({ userId: s.id, kind: 'tutor', title: 'my question' });
    const [up] = await h.t.db
      .insert(uploads)
      .values({ userId: s.id, kind: 'photo_doubt', blobKey: `q/${s.id}/1.png`, processedKey: `${s.id}/1.png`, contentType: 'image/png', status: 'ready', expiresAt: new Date(h.clock.now() + 86_400_000) })
      .returning();
    await h.blob.put(AI_UPLOADS.containers.quarantine, up!.blobKey, Buffer.from('x'), 'image/png');
    await h.blob.put(AI_UPLOADS.containers.clean, up!.processedKey!, Buffer.from('y'), 'image/png');

    const res = await s.c.post('/v1/me/consent/withdraw');
    expect(res.json()).toMatchObject({ status: 'revoked', revokedBy: 'account_holder' });
    expect(await cache(s.id)).toMatchObject({ status: 'revoked' });
    expect(await h.t.db.select().from(aiConversations).where(eq(aiConversations.userId, s.id))).toHaveLength(0);
    expect(await h.t.db.select().from(uploads).where(eq(uploads.userId, s.id))).toHaveLength(0);
    expect(h.blob.has(AI_UPLOADS.containers.quarantine, up!.blobKey)).toBe(false);
    expect(h.blob.has(AI_UPLOADS.containers.clean, up!.processedKey!)).toBe(false);
    expect((await s.c.post('/v1/ai/quick-doubt', { message: 'What is an acid?' })).json().code).toBe('consent_required');
    // Idempotent.
    expect((await s.c.post('/v1/me/consent/withdraw')).json().status).toBe('revoked');
    // The student may ask again (after the 1-a-minute send limit); the same parent approves again.
    h.clock.advance(61_000);
    await s.c.post('/v1/me/consent/parent', { parentEmail: s.parent }).then((r) => expect(r.statusCode).toBe(200));
    expect((await s.c.post('/v1/me/consent/verify', { code: parentMail(s.parent).code })).json().status).toBe('granted');
  });

  it('the parent’s link withdraws without a session (idempotent); declines a pending request; forged or stale links are refused', async () => {
    const s = await minorWithCode();
    await s.c.post('/v1/me/consent/verify', { code: s.code });
    const parentBrowser = h.client();
    const res = await parentBrowser.post('/v1/consent/parent/withdraw', { token: s.token });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'revoked', alreadyWithdrawn: false });
    expect(await status(s.c)).toMatchObject({ status: 'revoked', revokedBy: 'parent' });
    expect((await s.c.get('/v1/leagues/current')).json().code).toBe('consent_required');
    expect((await parentBrowser.post('/v1/consent/parent/withdraw', { token: s.token })).json()).toEqual({ status: 'revoked', alreadyWithdrawn: true });
    const audit = await h.t.db.select().from(auditLog).where(and(eq(auditLog.targetId, s.id), eq(auditLog.action, 'consent.revoked')));
    expect(audit.at(-1)).toMatchObject({ actorUserId: null, actorRole: 'parent' });

    // Declining a pending request.
    const p = await minorWithCode();
    expect((await h.client().post('/v1/consent/parent/withdraw', { token: p.token })).json().status).toBe('revoked');
    expect((await p.c.post('/v1/me/consent/verify', { code: p.code })).json().code).toBe('consent_code_expired');

    // Forged: a flipped signature character; a different record id with a valid shape.
    const forged = p.token.slice(0, -1) + (p.token.endsWith('a') ? 'b' : 'a');
    const bad = await h.client().post('/v1/consent/parent/withdraw', { token: forged });
    expect(bad.statusCode).toBe(404);
    expect(bad.json().code).toBe('consent_link_invalid');
    expect((await h.client().post('/v1/consent/parent/withdraw', { token: 'not-a-token-at-all' })).statusCode).toBe(404);

    // Stale: after the student switches to another parent, the first parent's link stops working.
    const q = await minorWithCode();
    const other = parentAddr();
    await q.c.post('/v1/me/consent/parent', { parentEmail: other }).then((r) => expect(r.statusCode).toBe(429)); // per-account cooldown
    h.clock.advance(61_000);
    expect((await q.c.post('/v1/me/consent/parent', { parentEmail: other })).statusCode).toBe(200);
    expect((await h.client().post('/v1/consent/parent/withdraw', { token: q.token })).json().code).toBe('consent_link_invalid');
    expect((await h.client().post('/v1/consent/parent/withdraw', { token: parentMail(other).token })).json().status).toBe('revoked');
  });
});

describe('built-in consent: rate limits', () => {
  it('per account: 1 a minute, 3 an hour', async () => {
    const s = await student();
    await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
    expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() })).statusCode).toBe(200);
    const soon = await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() });
    expect(soon.statusCode).toBe(429);
    expect(Number(soon.headers['retry-after'])).toBeGreaterThan(0);
    h.clock.advance(61_000);
    expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() })).statusCode).toBe(200);
    h.clock.advance(61_000);
    expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() })).statusCode).toBe(200);
    h.clock.advance(61_000);
    expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() })).statusCode).toBe(429);
  });

  it('per parent email: 3 an hour across students', async () => {
    const parent = parentAddr();
    for (let i = 0; i < 3; i++) {
      const s = await student();
      await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
      expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parent })).statusCode).toBe(200);
    }
    const s = await student();
    await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
    expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parent })).statusCode).toBe(429);
  });

  it('per IP: 10 an hour', async () => {
    const ip = '198.51.100.77';
    for (let i = 0; i < 10; i++) {
      const s = await student();
      await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
      s.c.ip = ip;
      expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() })).statusCode).toBe(200);
    }
    const s = await student();
    await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
    s.c.ip = ip;
    expect((await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() })).statusCode).toBe(429);
  });

  it('wrong codes per account per day lock code entry (otp_locked) across new codes', async () => {
    const s = await minorWithCode();
    const wrong = s.code === '111111' ? '222222' : '111111';
    for (let i = 0; i < 5; i++) await s.c.post('/v1/me/consent/verify', { code: wrong });
    h.clock.advance(61_000);
    await s.c.post('/v1/me/consent/parent', { parentEmail: s.parent });
    const second = parentMail(s.parent);
    const wrong2 = second.code === '111111' ? '222222' : '111111';
    for (let i = 0; i < 4; i++) expect((await s.c.post('/v1/me/consent/verify', { code: wrong2 })).statusCode).toBe(400);
    // 5 + 5 wrong entries = 10 failures in the day: locked, even for the right code.
    expect((await s.c.post('/v1/me/consent/verify', { code: wrong2 })).statusCode).toBe(400);
    const locked = await s.c.post('/v1/me/consent/verify', { code: second.code });
    expect(locked.statusCode).toBe(429);
    expect(locked.json().code).toBe('otp_locked');
  });

  it('the email provider failing kills the undelivered code (503) and does not leave the account pending', async () => {
    const s = await student();
    await s.c.post('/v1/me/consent/age-band', { ageBand: 'minor' });
    h.email.failing = true;
    try {
      const res = await s.c.post('/v1/me/consent/parent', { parentEmail: parentAddr() });
      expect(res.statusCode).toBe(503);
    } finally {
      h.email.failing = false;
    }
    const [rec] = await h.t.db.select().from(consentRecords).where(eq(consentRecords.userId, s.id));
    expect(rec).toMatchObject({ status: 'required', codeHash: null });
  });
});

describe('built-in consent: the gates (D-014: learning stays open)', () => {
  it('AI, uploads and leaderboards are refused until approval and allowed after; tests and practice never need it', async () => {
    const s = await minorWithCode();
    expect((await s.c.post('/v1/ai/quick-doubt', { message: 'What is an acid?' })).statusCode).toBe(403);
    expect((await s.c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/png', bytes: 100 })).statusCode).toBe(403);
    expect((await s.c.get('/v1/leagues/current')).statusCode).toBe(403);
    expect(h.services.consent.isGated('test_attempts')).toBe(false);
    expect((await s.c.get('/v1/credits')).statusCode).toBe(200); // balances and prices are visible without consent

    await s.c.post('/v1/me/consent/verify', { code: s.code });
    // No 15-minute cache wait: approval applies at once.
    const ai = await s.c.post('/v1/ai/quick-doubt', { message: 'What is an acid?' });
    expect(ai.statusCode).toBe(200);
    expect((await s.c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/png', bytes: 100 })).statusCode).toBe(201);
    expect((await s.c.get('/v1/leagues/current')).statusCode).toBe(200);
    // SOYL Coins rewards (D-037) and leagues read the consent_status cache: it says granted.
    expect(await cache(s.id)).toMatchObject({ status: 'granted', provider: 'builtin' });

    // A stale cache is re-read from the record (authoritative), never trusted.
    h.clock.advance(CONSENT.cacheTtlSeconds * 1000 + 1000);
    expect((await s.c.get('/v1/leagues/current')).statusCode).toBe(200);
  });
});

describe('public names (D-039)', () => {
  it('GET /v1/me returns an auto-generated public name; regenerating changes it; no school field is accepted', async () => {
    const s = await student();
    const me = (await s.c.get('/v1/me')).json();
    expect(me.publicName).toBe(publicName(s.id, 0));
    expect(me.publicName).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+ \d{3}$/);
    expect(me).not.toHaveProperty('schoolId');
    const r = await s.c.post('/v1/me/public-name');
    expect(r.statusCode).toBe(200);
    const [p] = await h.t.db.select().from(profiles).where(eq(profiles.userId, s.id));
    expect(r.json().publicName).toBe(publicName(s.id, p!.publicNameSeed));
    expect((await s.c.get('/v1/me')).json().publicName).toBe(r.json().publicName);
    const school = await s.c.patch('/v1/me', { schoolId: '01890000-0000-7000-8000-000000000000' });
    expect(school.statusCode).toBe(400);
  });
});

describe('other providers are unchanged', () => {
  let u: Harness;
  let m: Harness;
  beforeAll(async () => {
    u = await createHarness({ env: { CONSENT_PROVIDER: 'unavailable' }, consentProvider: () => new UnavailableConsentProvider() });
    m = await createHarness({ env: { CONSENT_PROVIDER: 'mock' } });
  });
  afterAll(async () => {
    await u?.close();
    await m?.close();
  });

  it('unavailable: everyone pending, GET says flow none, the built-in routes answer 409 consent_flow_unavailable', async () => {
    const c = u.client();
    const r = await c.signInEmail(`u.${uniq()}@example.com`);
    expect(r.consent).toBe('pending');
    expect((await c.get('/v1/me/consent')).json()).toMatchObject({ flow: 'none', status: 'pending' });
    for (const [path, body] of [
      ['/v1/me/consent/age-band', { ageBand: 'adult', agree: true }],
      ['/v1/me/consent/parent', { parentEmail: parentAddr() }],
      ['/v1/me/consent/verify', { code: '123456' }],
      ['/v1/me/consent/withdraw', undefined],
    ] as const) {
      const res = await c.post(path, body);
      expect(res.statusCode, path).toBe(409);
      expect(res.json().code).toBe('consent_flow_unavailable');
    }
    expect((await u.client().post('/v1/consent/parent/withdraw', { token: 'x'.repeat(20) })).json().code).toBe('consent_flow_unavailable');
    expect((await c.post('/v1/me/consent/start')).json()).toEqual({ status: 'pending', redirectUrl: null });
  });

  it('mock: GET says flow external; start behaves as before; the built-in routes answer 409', async () => {
    const c = m.client();
    const r = await c.signInEmail(`m.${uniq()}@example.com`);
    expect((await c.get('/v1/me/consent')).json()).toMatchObject({ flow: 'external', status: 'required' });
    expect((await c.post('/v1/me/consent/start')).json()).toEqual({ status: 'pending', redirectUrl: null });
    m.consent.setStatus(r.user.id, 'granted');
    await m.services.consent.refresh(r.user.id);
    expect((await c.get('/v1/me/consent')).json().status).toBe('granted');
    expect((await c.post('/v1/me/consent/age-band', { ageBand: 'minor' })).json().code).toBe('consent_flow_unavailable');
  });
});
