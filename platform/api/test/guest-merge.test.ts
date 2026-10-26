/** POST /v1/me/merge-guest: schema, size cap, known-id filtering, capped XP, idempotency (AC-23, API-RL-2). */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { contentReleases, profiles, questions, xpEvents } from '@soyl/db';
import { GUEST_MERGE } from '@soyl/shared/config/security';
import { GuestProgress } from '../src/contract/guest';
import { createHarness, seedMiniCatalog, type Harness } from './helpers';

let h: Harness;
let cat: Awaited<ReturnType<typeof seedMiniCatalog>>;
let n = 0;
const email = () => `merge.${Date.now().toString(36)}${++n}@example.com`;
const at = '2026-10-20T10:00:00.000Z';

async function addQuestion(key: string, opts: { pool?: string; status?: string } = {}) {
  await h.t.db.insert(questions).values({
    unit: 'cbse-10-science-ch01',
    chapterId: cat.ch1.id,
    academicYear: '2026-27',
    version: 1,
    status: opts.status ?? 'published',
    key,
    type: 'mcq',
    pool: opts.pool ?? 'practice',
    difficulty: 2,
    competency: 'application',
    bloom: 'apply',
    marks: 1,
    expectedTimeSec: 60,
    body: { stem_md: 'Q' },
  });
}

beforeAll(async () => {
  h = await createHarness();
  cat = await seedMiniCatalog(h.t);
  void contentReleases;
  await addQuestion('q_cbse10sci_ch01_0001');
  await addQuestion('q_cbse10sci_ch01_0002');
  await addQuestion('q_cbse10sci_ch01_0003', { pool: 'test' });
  await addQuestion('q_cbse10sci_ch01_0004', { status: 'draft' });
});
afterAll(async () => {
  await h?.close();
});

const payload = {
  v: 1,
  board: 'cbse',
  classLevel: 10,
  lessons: [
    { chapter: 'cbse-10-science-ch01', slide: 12, completed: true, updatedAt: at },
    { chapter: 'cbse-10-science-ch02', slide: 3, completed: false, updatedAt: at },
    { chapter: 'cbse-10-science-ch09', slide: 1, completed: true, updatedAt: at },
  ],
  practice: [
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_0001', correct: true, answeredAt: at },
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_0001', correct: true, answeredAt: at },
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_0002', correct: false, answeredAt: at },
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_0003', correct: true, answeredAt: at },
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_0004', correct: true, answeredAt: at },
    { chapter: 'cbse-10-science-ch01', question: 'q_unknown_9999', correct: true, answeredAt: at },
  ],
};

describe('merge-guest', () => {
  it('merges known completions as capped XP, applies board/class, and is idempotent', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email());
    const res = await c.post('/v1/me/merge-guest', payload);
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({
      merged: true,
      alreadyMerged: false,
      lessonsCompleted: 1,
      practiceCorrect: 1,
      xpAwarded: GUEST_MERGE.xpPerLessonCompleted + GUEST_MERGE.xpPerPracticeCorrect,
      ignored: { unknownChapters: 1, unknownQuestions: 3, positionsNotStored: 1 },
      profileUpdated: true,
    });
    const xp = await h.t.db.select().from(xpEvents).where(eq(xpEvents.userId, user.id));
    expect(xp.map((x) => `${x.kind}:${x.sourceType}:${x.sourceId}`).sort()).toEqual([
      'lesson_completed:guest:chapter:cbse-10-science-ch01',
      'practice:guest:question:q_cbse10sci_ch01_0001',
    ]);
    const [p] = await h.t.db.select().from(profiles).where(eq(profiles.userId, user.id));
    expect(p).toMatchObject({ board: 'cbse', classLevel: 10 });
    expect(p!.guestMergedAt).toBeInstanceOf(Date);

    const replay = await c.post('/v1/me/merge-guest', payload);
    expect(replay.statusCode).toBe(200);
    expect(replay.json()).toMatchObject({ merged: false, alreadyMerged: true, xpAwarded: 0 });
    expect(await h.t.db.select().from(xpEvents).where(eq(xpEvents.userId, user.id))).toHaveLength(2);
  });

  it('parallel merges award once', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email());
    const results = await Promise.all(Array.from({ length: 5 }, () => c.post('/v1/me/merge-guest', payload)));
    expect(results.filter((r) => r.json().merged)).toHaveLength(1);
    expect(await h.t.db.select().from(xpEvents).where(eq(xpEvents.userId, user.id))).toHaveLength(2);
  });

  it('does not overwrite a profile board/class the user already chose', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email());
    await c.patch('/v1/me', { board: 'cisce', classLevel: 9 });
    const res = await c.post('/v1/me/merge-guest', { ...payload, lessons: [], practice: [] });
    expect(res.json().profileUpdated).toBe(false);
    const [p] = await h.t.db.select().from(profiles).where(eq(profiles.userId, user.id));
    expect(p).toMatchObject({ board: 'cisce', classLevel: 9 });
  });

  it('caps total XP (AC-23)', async () => {
    const many = Array.from({ length: 400 }, (_, i) => `q_cap_${i}`);
    for (const k of many.slice(0, 250)) await addQuestion(k);
    const c = h.client();
    const { user } = await c.signInEmail(email());
    const res = await c.post('/v1/me/merge-guest', {
      v: 1,
      lessons: [],
      practice: many.map((q) => ({ chapter: 'cbse-10-science-ch01', question: q, correct: true, answeredAt: at })),
    });
    expect(res.json().xpAwarded).toBe(GUEST_MERGE.maxTotalXp);
    const rows = await h.t.db.select().from(xpEvents).where(and(eq(xpEvents.userId, user.id), eq(xpEvents.kind, 'practice')));
    expect(rows.reduce((s, r) => s + r.amount, 0)).toBe(GUEST_MERGE.maxTotalXp);
  });

  it('rejects free text and unknown keys (WEB-5, API-8)', async () => {
    const c = h.client();
    await c.signInEmail(email());
    expect((await c.post('/v1/me/merge-guest', { ...payload, name: 'Riya' })).statusCode).toBe(400);
    expect((await c.post('/v1/me/merge-guest', { ...payload, v: 2 })).statusCode).toBe(400);
    expect((await c.post('/v1/me/merge-guest', { ...payload, lessons: [{ ...payload.lessons[0], note: 'hi' }] })).statusCode).toBe(400);
    expect((await c.post('/v1/me/merge-guest', { ...payload, practice: [{ ...payload.practice[0], question: 'DROP TABLE' }] })).statusCode).toBe(400);
  });

  it('accepts bodies up to 256 KB and rejects larger ones (API-5)', async () => {
    const c = h.client();
    await c.signInEmail(email());
    const big = { v: 1, lessons: [], practice: Array.from({ length: 1500 }, (_, i) => ({ chapter: 'cbse-10-science-ch01', question: `q_size_${i}`, correct: false, answeredAt: at })) };
    const size = JSON.stringify(big).length;
    expect(size).toBeGreaterThan(64 * 1024);
    expect(size).toBeLessThan(256 * 1024);
    expect((await c.post('/v1/me/merge-guest', big)).statusCode).toBe(200);
    const huge = { v: 1, lessons: [], practice: [], pad: 'x'.repeat(300 * 1024) };
    expect((await c.post('/v1/me/merge-guest', huge)).statusCode).toBe(413);
  });

  it('needs a signed-in user', async () => {
    expect((await h.client().post('/v1/me/merge-guest', payload)).statusCode).toBe(401);
  });

  it('the exported contract parses what the web stores', () => {
    expect(GuestProgress.parse({ v: 1 })).toEqual({ v: 1, lessons: [], practice: [] });
    expect(GuestProgress.safeParse(payload).success).toBe(true);
  });
});
