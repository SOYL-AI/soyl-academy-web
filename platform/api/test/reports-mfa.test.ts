/**
 * "Report a mistake" (guests and members, sanitised, rate-limited) and AUTH-11 staff TOTP (enrol,
 * confirm, verify with code or recovery code, replay, lockout, disable) gating the admin report queue.
 * Runs with STAFF_AUTH.secondFactor 'totp' (ADR-011); the owner default 'none' is covered in staff-sign-in.test.ts.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { aiConversations, aiMessages, aiRequests, chapters, contentReports, decks, sessions, userMfa } from '@soyl/db';
import { base32Decode, base32Encode, decryptSecret, encryptSecret, matchTotp, stepAt, totpAt } from '../src/auth/mfa';
import { sanitiseComment } from '../src/domain/reports';
import { createHarness, STAFF_EMAIL_TOTP, type Client, type Harness } from './helpers';
import { seedRealContent } from './content-fixture';

let h: Harness;
const SCI = 'cbse-10-science-ch01';
let n = 0;
const email = () => `rm.${Date.now().toString(36)}${++n}@example.com`;

beforeAll(async () => {
  h = await createHarness({ staffAuth: STAFF_EMAIL_TOTP });
  await seedRealContent(h.t, (u) => u === SCI);
});
afterAll(async () => {
  await h?.close();
});

describe('POST /v1/content-reports', () => {
  it('guests report a slide; the row points at the current deck part', async () => {
    const res = await h.client().post('/v1/content-reports', { chapterId: SCI, contentType: 'deck', part: 2, itemRef: 's03', reason: 'typo' });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toMatchObject({ status: 'open' });
    const [row] = await h.t.db.select().from(contentReports).where(eq(contentReports.id, res.json().id));
    const [deck] = await h.t.db.select().from(decks).where(eq(decks.id, row!.contentId));
    expect(row).toMatchObject({ userId: null, contentType: 'deck', unit: SCI, itemRef: 's03', category: 'typo', message: null, status: 'open' });
    expect(deck).toMatchObject({ unit: SCI, part: 2 });
  });

  it('members report a question; the comment is sanitised and stored as plain text', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email());
    const comment = 'The answer​ should be (b)‮.\r\n\r\n\r\n\r\nThanks\u0007  \n';
    const res = await c.post('/v1/content-reports', { chapterId: SCI, contentType: 'question', questionId: 'q_cbse10sci_ch01_001', itemRef: 'b', reason: 'wrong_answer', comment });
    expect(res.statusCode).toBe(201);
    const [row] = await h.t.db.select().from(contentReports).where(eq(contentReports.id, res.json().id));
    expect(row).toMatchObject({ userId: user.id, contentType: 'question', itemRef: 'q_cbse10sci_ch01_001#b', category: 'wrong_answer', message: 'The answer should be (b).\n\nThanks' });
    for (const contentType of ['notes', 'flashcard_set'] as const)
      expect((await c.post('/v1/content-reports', { chapterId: SCI, contentType, itemRef: '2', reason: 'wrong_content' })).statusCode).toBe(201);
  });

  it('validates the target, reason and comment', async () => {
    const c = h.client();
    const post = (body: Record<string, unknown>) => c.post('/v1/content-reports', { chapterId: SCI, contentType: 'question', questionId: 'q_cbse10sci_ch01_001', reason: 'typo', ...body });
    expect((await post({ questionId: undefined })).statusCode).toBe(400);
    expect((await post({ questionId: 'q_cbse10sci_ch01_999' })).statusCode).toBe(404);
    expect((await post({ chapterId: 'cbse-10-science-ch99' })).statusCode).toBe(404);
    expect((await post({ chapterId: 'cbse-10-science-ch13', contentType: 'deck' })).statusCode).toBe(404);
    expect((await post({ reason: 'meh' })).statusCode).toBe(400);
    expect((await post({ userId: '0190a1b2-0000-7000-8000-000000000000' })).statusCode).toBe(400);
    expect((await post({ itemRef: '<script>' })).statusCode).toBe(400);
    expect((await post({ comment: 'x'.repeat(1001) })).json()).toMatchObject({ code: 'validation_failed', errors: [{ path: 'body.comment' }] });
    expect((await post({ comment: 'x'.repeat(1000) })).statusCode).toBe(201);
    expect((await post({ comment: '  ​\n ' })).statusCode).toBe(201);
    expect((await c.post('/v1/content-reports', { chapterId: SCI, contentType: 'notes', reason: 'typo' }, { origin: null })).statusCode).toBe(403);
    expect(sanitiseComment(undefined)).toBeNull();
    expect(sanitiseComment('é')).toBe('é');
  });

  it('rate-limits per user (20/day) and per IP (50/day)', async () => {
    const member = h.client('198.51.100.7');
    await member.signInEmail(email());
    const body = { chapterId: SCI, contentType: 'notes', reason: 'typo' };
    const codes: number[] = [];
    for (let i = 0; i < 21; i++) codes.push((await member.post('/v1/content-reports', body)).statusCode);
    expect(codes.slice(0, 20).every((s) => s === 201)).toBe(true);
    expect(codes[20]).toBe(429);
    const guest = h.client('198.51.100.8');
    const guestCodes: number[] = [];
    for (let i = 0; i < 51; i++) guestCodes.push((await guest.post('/v1/content-reports', body)).statusCode);
    expect(guestCodes.filter((s) => s === 201)).toHaveLength(50);
    expect(guestCodes[50]).toBe(429);
  });
});

describe('POST /v1/content-reports: AI answers (ai_answer, AC-15)', () => {
  /** A conversation of `userId` with one user turn and one assistant answer (as the gateway stores them). */
  async function conversation(userId: string, chapterKey: string | null = SCI) {
    const [ch] = chapterKey ? await h.t.db.select({ id: chapters.id }).from(chapters).where(eq(chapters.key, chapterKey)) : [];
    const [conv] = await h.t.db.insert(aiConversations).values({ userId, kind: 'tutor', chapterId: ch?.id ?? null }).returning();
    const requestId = `req_${Date.now().toString(36)}${++n}`;
    const [req] = await h.t.db.insert(aiRequests).values({ userId, requestId, action: 'doubt_quick', modelTier: 'small', model: 'mock', status: 'succeeded', conversationId: conv!.id }).returning();
    const t0 = Date.now();
    const [question] = await h.t.db.insert(aiMessages).values({ conversationId: conv!.id, role: 'user', content: 'Why is the sky blue?', createdAt: new Date(t0) }).returning();
    const [answer] = await h.t.db.insert(aiMessages).values({ conversationId: conv!.id, role: 'assistant', content: 'Scattering.', aiRequestId: req!.id, createdAt: new Date(t0 + 1) }).returning();
    return { conversationId: conv!.id, requestId, answerId: answer!.id, questionId: question!.id };
  }

  it('members report their own AI answer by messageId or by the stream requestId; the row keeps ids, not the text', async () => {
    const c = h.client();
    const me = await c.signInEmail(email());
    const conv = await conversation(me.user.id);
    const byMessage = await c.post('/v1/content-reports', { contentType: 'ai_answer', conversationId: conv.conversationId, messageId: conv.answerId, reason: 'wrong_answer', comment: 'The answer skips the reason.' });
    expect(byMessage.statusCode).toBe(201);
    const [row] = await h.t.db.select().from(contentReports).where(eq(contentReports.id, byMessage.json().id));
    expect(row).toMatchObject({ contentType: 'ai_answer', contentId: conv.answerId, unit: SCI, itemRef: `conv:${conv.conversationId}`, category: 'wrong_answer', status: 'open', userId: me.user.id, message: 'The answer skips the reason.' });
    expect(JSON.stringify(row)).not.toContain('Scattering');
    // Same answer again (double click, or by requestId): the open report comes back with 200.
    const again = await c.post('/v1/content-reports', { contentType: 'ai_answer', conversationId: conv.conversationId, requestId: conv.requestId, reason: 'other' });
    expect(again.statusCode).toBe(200);
    expect(again.json().id).toBe(byMessage.json().id);
    // A conversation without a chapter files under unit "ai"; "inappropriate" raises an ops alert without content.
    const free = await conversation(me.user.id, null);
    const bad = await c.post('/v1/content-reports', { contentType: 'ai_answer', conversationId: free.conversationId, requestId: free.requestId, reason: 'inappropriate' });
    expect(bad.statusCode).toBe(201);
    expect((await h.t.db.select().from(contentReports).where(eq(contentReports.id, bad.json().id)))[0]!.unit).toBe('ai');
    const alert = h.logs.find((l) => l.alertKind === 'ai_answer_reported_inappropriate');
    expect(alert).toMatchObject({ alert: true, reportId: bad.json().id, messageId: free.answerId });
    expect(JSON.stringify(alert)).not.toContain('Scattering');
  });

  it("refuses guests, other students' conversations, user turns and malformed bodies", async () => {
    const owner = h.client();
    const o = await owner.signInEmail(email());
    const conv = await conversation(o.user.id);
    const body = { contentType: 'ai_answer', conversationId: conv.conversationId, messageId: conv.answerId, reason: 'wrong_answer' };
    expect((await h.client().post('/v1/content-reports', body)).statusCode).toBe(401);
    const other = h.client();
    await other.signInEmail(email());
    expect((await other.post('/v1/content-reports', body)).statusCode).toBe(404); // IDOR: not yours
    expect((await owner.post('/v1/content-reports', { ...body, messageId: conv.questionId })).statusCode).toBe(404); // a user turn is not an AI answer
    expect((await owner.post('/v1/content-reports', { ...body, messageId: undefined, requestId: 'req_unknown_123' })).statusCode).toBe(404);
    const invalid = async (b: Record<string, unknown>, path: string) => {
      const r = await owner.post('/v1/content-reports', { ...body, ...b });
      expect(r.statusCode).toBe(400);
      expect(r.json().errors[0].path).toBe(path);
    };
    await invalid({ conversationId: undefined }, 'body.conversationId');
    await invalid({ requestId: conv.requestId }, 'body.messageId'); // both
    await invalid({ messageId: undefined }, 'body.messageId'); // neither
    await invalid({ reason: 'audio' }, 'body.reason');
    await invalid({ questionId: 'q_cbse10sci_ch01_001' }, 'body.questionId');
    await invalid({ comment: 'x'.repeat(1001) }, 'body.comment');
    expect((await owner.post('/v1/content-reports', { ...body, requestId: 'bad id!' , messageId: undefined })).statusCode).toBe(400);
    // Content reports still need their chapter, and must not carry AI fields.
    const content = await owner.post('/v1/content-reports', { contentType: 'notes', reason: 'typo' });
    expect(content.json()).toMatchObject({ code: 'validation_failed', errors: [{ path: 'body.chapterId' }] });
    const mixed = await owner.post('/v1/content-reports', { chapterId: SCI, contentType: 'notes', reason: 'typo', conversationId: conv.conversationId });
    expect(mixed.json()).toMatchObject({ code: 'validation_failed', errors: [{ path: 'body.conversationId' }] });
  });
});

describe('TOTP primitives', () => {
  it('matches the RFC 6238 SHA-1 test vector and round-trips base32', () => {
    const secret = Buffer.from('12345678901234567890');
    expect(totpAt(secret, 1, 8)).toBe('94287082');
    expect(totpAt(secret, Math.floor(1111111109 / 30), 8)).toBe('07081804');
    expect(base32Encode(secret)).toBe('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');
    expect(base32Decode('gezd gnbv-gy3tqojqgezdgnbvgy3tqojq')).toEqual(secret);
    expect(() => base32Decode('1!')).toThrow();
    expect(matchTotp(secret, totpAt(secret, stepAt(1_000_000_000_000) - 1), 1_000_000_000_000)).toBe(stepAt(1_000_000_000_000) - 1);
    expect(matchTotp(secret, totpAt(secret, stepAt(1_000_000_000_000) - 2), 1_000_000_000_000)).toBeNull();
    expect(matchTotp(secret, 'abcdef', 0)).toBeNull();
  });

  it('encrypts secrets bound to the user id', () => {
    const key = Buffer.alloc(32, 9);
    const enc = encryptSecret(key, 'user-a', Buffer.from('s3cret'));
    expect(decryptSecret(key, 'user-a', enc).toString()).toBe('s3cret');
    expect(() => decryptSecret(key, 'user-b', enc)).toThrow();
    expect(() => decryptSecret(Buffer.alloc(32, 1), 'user-a', enc)).toThrow();
    expect(() => decryptSecret(key, 'user-a', 'v2:x:y:z')).toThrow(/format/);
  });
});

describe('AUTH-11 staff TOTP', () => {
  const codeFor = (secret: string, offsetSteps = 0) => totpAt(base32Decode(secret), stepAt(h.clock.now()) + offsetSteps);
  async function staffPair(role: 'reviewer' | 'admin' = 'reviewer'): Promise<[Client, Client, string]> {
    const e = email();
    const a = h.client();
    const b = h.client();
    const { user } = await a.signInEmail(e);
    await b.signInEmail(e);
    await h.services.adapter().then((x) => x.updateUser(user.id, { role }));
    return [a, b, user.id];
  }

  it('students cannot use MFA routes; staff routes fail closed until enrolled and verified', async () => {
    const s = h.client();
    await s.signInEmail(email());
    expect((await s.get('/v1/me/mfa')).statusCode).toBe(403);
    expect((await s.get('/v1/admin/reports')).json().code).toBe('forbidden');
    const [a] = await staffPair();
    expect((await a.get('/v1/me/mfa')).json()).toEqual({ enrolled: false, confirmed: false, sessionVerified: false, recoveryCodesRemaining: 0 });
    expect((await a.get('/v1/admin/reports')).json().code).toBe('mfa_required');
    expect((await a.post('/v1/me/mfa/verify', { code: '123456' })).statusCode).toBe(409);
  });

  it('enrol → confirm → verified session reaches the admin queue; other sessions verify separately; replays fail', async () => {
    const [a, b, userId] = await staffPair('admin');
    const enrol = await a.post('/v1/me/mfa/totp/enroll');
    expect(enrol.statusCode).toBe(200);
    const { secret, otpauthUri } = enrol.json();
    expect(otpauthUri).toMatch(/^otpauth:\/\/totp\/SOYL%20Academy:.+\?secret=[A-Z2-7]+&issuer=SOYL%20Academy&algorithm=SHA1&digits=6&period=30$/);
    expect(enrol.headers['cache-control']).toBe('no-store');
    const [stored] = await h.t.db.select().from(userMfa).where(eq(userMfa.userId, userId));
    expect(stored!.totpSecretEnc).toMatch(/^v1:/);
    expect(stored!.totpSecretEnc).not.toContain(secret);
    // Enrolling again before confirming issues a new secret.
    const enrol2 = (await a.post('/v1/me/mfa/totp/enroll')).json();
    expect(enrol2.secret).not.toBe(secret);

    expect((await a.post('/v1/me/mfa/totp/confirm', { code: codeFor(secret) === codeFor(enrol2.secret) ? '000000' : codeFor(secret) })).json().code).toBe('otp_invalid');
    const confirmed = await a.post('/v1/me/mfa/totp/confirm', { code: codeFor(enrol2.secret) });
    expect(confirmed.statusCode).toBe(200);
    const { recoveryCodes } = confirmed.json();
    expect(recoveryCodes).toHaveLength(10);
    expect(new Set(recoveryCodes).size).toBe(10);
    expect((await a.post('/v1/me/mfa/totp/enroll')).statusCode).toBe(409);

    // Session a is verified; session b is not.
    await h.t.db.insert(contentReports).values({ contentType: 'notes', contentId: stored!.id, unit: SCI, category: 'typo', message: 'from test' });
    const queue = await a.get('/v1/admin/reports?limit=1');
    expect(queue.statusCode).toBe(200);
    expect(queue.json().reports[0]).toMatchObject({ status: 'open' });
    expect(queue.json().nextCursor).toBeTruthy();
    const page2 = await a.get(`/v1/admin/reports?limit=1&cursor=${queue.json().nextCursor}`);
    expect(page2.json().reports[0].id).not.toBe(queue.json().reports[0].id);
    expect((await a.get('/v1/admin/reports?cursor=bad')).statusCode).toBe(400);
    expect((await b.get('/v1/admin/reports')).json().code).toBe('mfa_required');

    // The code used to confirm cannot be replayed (same step); the next step works.
    expect((await b.post('/v1/me/mfa/verify', { code: codeFor(enrol2.secret) })).json().code).toBe('otp_invalid');
    h.clock.advance(30_000);
    const ok = await b.post('/v1/me/mfa/verify', { code: codeFor(enrol2.secret) });
    expect(ok.json()).toMatchObject({ verified: true, method: 'totp', recoveryCodesRemaining: 10 });
    expect((await b.get('/v1/admin/reports')).statusCode).toBe(200);
    expect((await b.get('/v1/me/mfa')).json()).toEqual({ enrolled: true, confirmed: true, sessionVerified: true, recoveryCodesRemaining: 10 });
  });

  it('recovery codes work once; wrong codes lock verification (otp_locked)', async () => {
    const [a, b] = await staffPair();
    const { secret } = (await a.post('/v1/me/mfa/totp/enroll')).json();
    const { recoveryCodes } = (await a.post('/v1/me/mfa/totp/confirm', { code: codeFor(secret) })).json();
    const used = await b.post('/v1/me/mfa/verify', { recoveryCode: recoveryCodes[0].toUpperCase() });
    expect(used.json()).toMatchObject({ verified: true, method: 'recovery_code', recoveryCodesRemaining: 9 });
    expect((await b.post('/v1/me/mfa/verify', { recoveryCode: recoveryCodes[0] })).json().code).toBe('otp_invalid');
    // The reused recovery code was failure 1; four wrong codes make five (MFA.failures.limit).
    for (let i = 0; i < 4; i++) expect((await b.post('/v1/me/mfa/verify', { code: '000000' })).statusCode).toBe(400);
    h.clock.advance(30_000);
    const locked = await b.post('/v1/me/mfa/verify', { code: codeFor(secret) });
    expect(locked.statusCode).toBe(429);
    expect(locked.json().code).toBe('otp_locked');
    h.clock.advance(16 * 60_000);
    expect((await b.post('/v1/me/mfa/verify', { code: codeFor(secret) })).statusCode).toBe(200);
    expect((await b.post('/v1/me/mfa/verify', { code: 'abc' })).statusCode).toBe(400);
  });

  it('an unconfirmed enrolment expires', async () => {
    const [a] = await staffPair();
    const { secret } = (await a.post('/v1/me/mfa/totp/enroll')).json();
    h.clock.advance(16 * 60_000);
    expect((await a.post('/v1/me/mfa/totp/confirm', { code: codeFor(secret) })).json().code).toBe('otp_expired');
  });

  it('disable needs a fresh, verified session and a code; it clears every session', async () => {
    const [a, b, userId] = await staffPair();
    const { secret } = (await a.post('/v1/me/mfa/totp/enroll')).json();
    await a.post('/v1/me/mfa/totp/confirm', { code: codeFor(secret) });
    h.clock.advance(30_000);
    await b.post('/v1/me/mfa/verify', { code: codeFor(secret) });
    h.clock.advance(30_000);
    expect((await a.post('/v1/me/mfa/totp/disable', { code: '000000' })).json().code).toBe('otp_invalid');
    const off = await a.post('/v1/me/mfa/totp/disable', { code: codeFor(secret) });
    expect(off.statusCode).toBe(204);
    expect(await h.t.db.select().from(userMfa).where(eq(userMfa.userId, userId))).toEqual([]);
    expect((await h.t.db.select({ at: sessions.mfaVerifiedAt }).from(sessions).where(eq(sessions.userId, userId))).every((s) => s.at === null)).toBe(true);
    expect((await b.get('/v1/admin/reports')).json().code).toBe('mfa_required');

    const [c] = await staffPair();
    const s2 = (await c.post('/v1/me/mfa/totp/enroll')).json().secret;
    await c.post('/v1/me/mfa/totp/confirm', { code: codeFor(s2) });
    h.clock.advance(11 * 60_000);
    expect((await c.post('/v1/me/mfa/totp/disable', { code: codeFor(s2) })).json().code).toBe('fresh_session_required');
    expect((await c.post('/v1/me/mfa/totp/enroll')).json().code).toBe('fresh_session_required');
  });
});
