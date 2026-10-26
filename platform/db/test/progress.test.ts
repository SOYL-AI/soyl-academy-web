/**
 * Migration 0005 (backend-api M2): lesson_progress, practice_answers, user_mfa, sessions.mfa_verified_at.
 * Constraints that the API relies on for idempotency, plus cascades on account purge (PII.md).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import { createTestDb, type TestDb } from '../src/testing';
import { lessonProgress, practiceAnswers, sessions, userMfa, users } from '../schema/index';
import { CHECK, UNIQUE, asApp, expectPgError, insertQuestion, makeChapter, makeUser, sampleQuestion } from './helpers';

let t: TestDb;
beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('lesson_progress', () => {
  it('one row per user, chapter and part; upsert keeps the first completion', async () => {
    const { chapter } = await makeChapter(t.db);
    const user = await makeUser(t.db);
    const base = { userId: user.id, chapterId: chapter.id, unit: chapter.key, part: 1 };
    await t.db.insert(lessonProgress).values({ ...base, slidePosition: 3 });
    await expectPgError(() => t.db.insert(lessonProgress).values({ ...base, slidePosition: 4 }), { code: UNIQUE, constraint: 'lesson_progress_user_chapter_part_unique' });
    await t.db.insert(lessonProgress).values({ ...base, part: 2, slidePosition: 0 });
    await t.db.insert(lessonProgress).values({ ...base, part: 0, slidePosition: 0 });
    expect(await t.db.select().from(lessonProgress).where(eq(lessonProgress.userId, user.id))).toHaveLength(3);
  });

  it('checks mode, source, part and slide ranges', async () => {
    const { chapter } = await makeChapter(t.db);
    const user = await makeUser(t.db);
    const base = { userId: user.id, chapterId: chapter.id, unit: chapter.key };
    await expectPgError(() => t.db.insert(lessonProgress).values({ ...base, mode: 'watch' }), { code: CHECK, constraint: 'lesson_progress_mode_check' });
    await expectPgError(() => t.db.insert(lessonProgress).values({ ...base, source: 'import' }), { code: CHECK, constraint: 'lesson_progress_source_check' });
    await expectPgError(() => t.db.insert(lessonProgress).values({ ...base, part: -1 }), { code: CHECK, constraint: 'lesson_progress_part_check' });
    await expectPgError(() => t.db.insert(lessonProgress).values({ ...base, slidePosition: 1001 }), { code: CHECK, constraint: 'lesson_progress_slide_check' });
  });
});

describe('practice_answers', () => {
  it('allows many app answers per question but one guest_merge answer per user and question', async () => {
    const { chapter } = await makeChapter(t.db);
    const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key));
    const user = await makeUser(t.db);
    const base = { userId: user.id, questionId: q.id, questionKey: q.key, questionVersion: q.version, chapterId: chapter.id, maxMarks: 1, answeredAt: new Date() };
    await t.db.insert(practiceAnswers).values({ ...base, response: { option_ids: ['a'] }, correct: false, marksAwarded: 0 });
    await t.db.insert(practiceAnswers).values({ ...base, response: { option_ids: ['c'] }, correct: true, marksAwarded: 1 });
    await t.db.insert(practiceAnswers).values({ ...base, source: 'guest_merge', correct: true });
    await expectPgError(() => t.db.insert(practiceAnswers).values({ ...base, source: 'guest_merge', correct: false }), { code: UNIQUE, constraint: 'practice_answers_guest_merge_unique' });
    const inserted = await t.db.insert(practiceAnswers).values({ ...base, source: 'guest_merge', correct: false }).onConflictDoNothing().returning();
    expect(inserted).toEqual([]);
  });

  it('keeps marks within 0..max and grading/source to known values', async () => {
    const { chapter } = await makeChapter(t.db);
    const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key, { marks: 2, marking_scheme: [{ step: 'x', marks: 2 }] }));
    const user = await makeUser(t.db);
    const base = { userId: user.id, questionId: q.id, questionKey: q.key, questionVersion: 1, chapterId: chapter.id, maxMarks: 2, answeredAt: new Date() };
    await expectPgError(() => t.db.insert(practiceAnswers).values({ ...base, marksAwarded: 2.5 }), { code: CHECK, constraint: 'practice_answers_marks_check' });
    await expectPgError(() => t.db.insert(practiceAnswers).values({ ...base, marksAwarded: -1 }), { code: CHECK, constraint: 'practice_answers_marks_check' });
    await expectPgError(() => t.db.insert(practiceAnswers).values({ ...base, grading: 'ai' }), { code: CHECK, constraint: 'practice_answers_grading_check' });
    await t.db.insert(practiceAnswers).values({ ...base, marksAwarded: 1.5, grading: 'self', correct: null });
  });
});

describe('user_mfa and sessions.mfa_verified_at (AUTH-11)', () => {
  it('one enrolment per user; recovery codes default to empty; the app role can read and write it', async () => {
    const user = await makeUser(t.db, { role: 'reviewer' });
    const [row] = await t.db.insert(userMfa).values({ userId: user.id, totpSecretEnc: 'v1:a:b:c' }).returning();
    expect(row!.recoveryCodeHashes).toEqual([]);
    expect(row!.confirmedAt).toBeNull();
    await expectPgError(() => t.db.insert(userMfa).values({ userId: user.id, totpSecretEnc: 'v1:x:y:z' }), { code: UNIQUE, constraint: 'user_mfa_user_id_unique' });
    await asApp(t, async (c) => {
      await c.query('UPDATE user_mfa SET last_used_step = 123 WHERE user_id = $1', [user.id]);
      const r = await c.query('SELECT last_used_step FROM user_mfa WHERE user_id = $1', [user.id]);
      expect(Number(r.rows[0].last_used_step)).toBe(123);
    });
    const [s] = await t.db.insert(sessions).values({ userId: user.id, token: `tok-${user.id}`, expiresAt: new Date(Date.now() + 3600_000) }).returning();
    expect(s!.mfaVerifiedAt).toBeNull();
  });

  it('account purge cascades progress, answers and MFA (PII.md)', async () => {
    const { chapter } = await makeChapter(t.db);
    const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key));
    const user = await makeUser(t.db);
    await t.db.insert(lessonProgress).values({ userId: user.id, chapterId: chapter.id, unit: chapter.key });
    await t.db.insert(practiceAnswers).values({ userId: user.id, questionId: q.id, questionKey: q.key, questionVersion: 1, chapterId: chapter.id, maxMarks: 1, answeredAt: new Date() });
    await t.db.insert(userMfa).values({ userId: user.id, totpSecretEnc: 'v1:a:b:c' });
    await t.db.delete(users).where(eq(users.id, user.id));
    const counts = await t.db.execute(sql`SELECT
      (SELECT count(*) FROM lesson_progress WHERE user_id = ${user.id})::int AS l,
      (SELECT count(*) FROM practice_answers WHERE user_id = ${user.id})::int AS p,
      (SELECT count(*) FROM user_mfa WHERE user_id = ${user.id})::int AS m`);
    expect(counts.rows[0]).toEqual({ l: 0, p: 0, m: 0 });
  });
});
