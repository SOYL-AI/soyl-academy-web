/**
 * Progress on real content: lesson positions/completion (idempotent, XP once), chapter and overall
 * progress, IST streaks with the weekly freeze, badges, the M2 guest merge (lesson_progress +
 * practice_answers, idempotent), and that one user's progress never shows up for another (API-7).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { lessonProgress, practiceAnswers, profiles, questionKeys, questions, streaks, xpEvents } from '@soyl/db';
import { XP_AWARDS, levelForXp } from '@soyl/shared/config/gamification';
import { GUEST_MERGE } from '@soyl/shared/config/security';
import { mergeGuestProgress } from '../src/domain/guest-merge';
import { dayNumber, streakView, weekMonday } from '../src/domain/gamification';
import { createHarness, type Client, type Harness } from './helpers';
import { seedRealContent, type ReleaseFile } from './content-fixture';

let h: Harness;
let releases: ReleaseFile[];
const SCI = 'cbse-10-science-ch01';
const HINDI = 'cbse-10-hindi-a-ch10';
let n = 0;
const email = () => `progress.${Date.now().toString(36)}${++n}@example.com`;
/** 12:00 IST on a date (06:30 UTC). */
const istNoon = (d: string) => Date.parse(`${d}T06:30:00Z`);

const sci = () => releases.find((r) => r.release.unit === SCI)!.release;
const slides = (part: number) => sci().decks.find((d) => (d.part ?? 0) === part)!.slides.length;

async function correctMcq(c: Client, index = 0) {
  const q = sci().questions.filter((x) => x.type === 'mcq')[index]!;
  const res = await c.post('/v1/practice/answers', { questionId: q.id, response: { option_ids: (q.answer as { option_ids: string[] }).option_ids } });
  expect(res.statusCode).toBe(200);
  return res.json();
}

beforeAll(async () => {
  h = await createHarness();
  releases = await seedRealContent(h.t, (u) => [SCI, HINDI].includes(u));
});
afterAll(async () => {
  await h?.close();
});

describe('PUT /v1/me/lesson-progress', () => {
  it('saves positions idempotently and completes a part once (XP, streak, badge)', async () => {
    h.clock.set(istNoon('2026-11-02'));
    const c = h.client();
    const { user } = await c.signInEmail(email());
    const put = (body: unknown) => c.request('PUT', '/v1/me/lesson-progress', { body });

    const a = await put({ chapterId: SCI, part: 1, slide: 3, mode: 'listen' });
    expect(a.statusCode).toBe(200);
    expect(a.json()).toMatchObject({ chapterId: SCI, part: 1, slide: 3, slideCount: slides(1), mode: 'listen', completedAt: null, xpAwarded: 0, streak: null });
    const again = await put({ chapterId: SCI, part: 1, slide: 3, mode: 'listen' });
    expect(again.json()).toMatchObject({ slide: 3, completedAt: null });
    expect(await h.t.db.select().from(lessonProgress).where(eq(lessonProgress.userId, user.id))).toHaveLength(1);

    const last = slides(1) - 1;
    const done = await put({ chapterId: SCI, part: 1, slide: last, completed: true });
    expect(done.json()).toMatchObject({ slide: last, xpAwarded: XP_AWARDS.lessonCompleted, badgesAwarded: ['first-lesson'], streak: { current: 1 } });
    const completedAt = done.json().completedAt;
    expect(completedAt).toBeTruthy();

    h.clock.advance(60_000);
    const replay = await put({ chapterId: SCI, part: 1, slide: last });
    expect(replay.json()).toMatchObject({ completedAt, xpAwarded: 0, badgesAwarded: [] });
    const back = await put({ chapterId: SCI, part: 1, slide: 1, mode: 'read' });
    expect(back.json()).toMatchObject({ slide: 1, completedAt, mode: 'read' });

    const xp = await h.t.db.select().from(xpEvents).where(eq(xpEvents.userId, user.id));
    expect(xp.map((x) => `${x.kind}:${x.sourceType}:${x.sourceId}:${x.amount}`)).toEqual([`lesson_completed:lesson:${SCI}:1:${XP_AWARDS.lessonCompleted}`]);
    const [s] = await h.t.db.select().from(streaks).where(eq(streaks.userId, user.id));
    expect(s).toMatchObject({ totalXp: XP_AWARDS.lessonCompleted, level: levelForXp(XP_AWARDS.lessonCompleted).level, currentDays: 1 });
  });

  it('single-deck chapters use part 0; the first part is the default', async () => {
    const c = h.client();
    await c.signInEmail(email());
    const res = await c.request('PUT', '/v1/me/lesson-progress', { body: { chapterId: HINDI, slide: 2 } });
    expect(res.json()).toMatchObject({ part: 0, slide: 2, mode: 'read' });
    const sciDefault = await c.request('PUT', '/v1/me/lesson-progress', { body: { chapterId: SCI, slide: 0 } });
    expect(sciDefault.json().part).toBe(1);
  });

  it('validates positions, parts and chapters; members only', async () => {
    const c = h.client();
    await c.signInEmail(email());
    const put = (body: unknown) => c.request('PUT', '/v1/me/lesson-progress', { body });
    expect((await put({ chapterId: SCI, part: 1, slide: slides(1) })).statusCode).toBe(400);
    expect((await put({ chapterId: SCI, part: 1, slide: 0, completed: true })).statusCode).toBe(400);
    expect((await put({ chapterId: SCI, part: 9, slide: 0 })).statusCode).toBe(404);
    expect((await put({ chapterId: 'cbse-10-science-ch13', slide: 0 })).statusCode).toBe(404);
    expect((await put({ chapterId: 'cbse-10-science-ch99', slide: 0 })).statusCode).toBe(404);
    expect((await put({ chapterId: SCI, slide: 0, mode: 'watch' })).statusCode).toBe(400);
    expect((await put({ chapterId: SCI, slide: 0, userId: '0190a1b2-0000-7000-8000-000000000000' })).statusCode).toBe(400);
    expect((await h.client().request('PUT', '/v1/me/lesson-progress', { body: { chapterId: SCI, slide: 0 } })).statusCode).toBe(401);
  });
});

describe('progress reads', () => {
  it('chapter progress and the overall summary reflect lessons and practice; another user sees none of it (API-7)', async () => {
    const c = h.client();
    await c.signInEmail(email());
    await c.request('PUT', '/v1/me/lesson-progress', { body: { chapterId: SCI, part: 2, slide: 4 } });
    await correctMcq(c, 0);
    const q = sci().questions.filter((x) => x.type === 'mcq')[1]!;
    const wrong = q.options.find((o) => !(q.answer as { option_ids: string[] }).option_ids.includes(o.id))!;
    await c.post('/v1/practice/answers', { questionId: q.id, response: { option_ids: [wrong.id] } });
    await c.post('/v1/practice/answers', { questionId: sci().questions.find((x) => x.type === 'short')!.id, response: { text: '' } });

    const ch = await c.get(`/v1/me/progress/chapters/${SCI}`);
    expect(ch.statusCode).toBe(200);
    expect(ch.headers['cache-control']).toBe('no-store');
    expect(ch.json().lessons).toEqual([
      { part: 1, slideCount: slides(1), slide: null, mode: null, completedAt: null, updatedAt: null },
      expect.objectContaining({ part: 2, slideCount: slides(2), slide: 4, mode: 'read', completedAt: null }),
    ]);
    expect(ch.json().practice).toMatchObject({ attempts: 3, questionsAnswered: 3, questionsCorrect: 1, accuracy: 0.5, correctQuestionIds: [sci().questions.filter((x) => x.type === 'mcq')[0]!.id] });
    expect(ch.json().practice.answeredQuestionIds).toHaveLength(3);

    const all = (await c.get('/v1/me/progress')).json();
    expect(all.totals).toMatchObject({ xp: XP_AWARDS.practiceFirstCorrect, level: 1, lessonsCompleted: 0, practiceAttempts: 3, practiceAccuracy: 0.5 });
    expect(all.subjects).toHaveLength(1);
    expect(all.subjects[0]).toMatchObject({ subjectId: 'cbse-10-science', chapters: [{ chapterId: SCI, lessons: { partsStarted: 1, partsCompleted: 0, lastPart: 2, lastSlide: 4 }, practice: { attempts: 3, questionsAnswered: 3, questionsCorrect: 1 } }] });

    const other = h.client();
    await other.signInEmail(email());
    expect((await other.get('/v1/me/progress')).json()).toMatchObject({ totals: { xp: 0, practiceAttempts: 0, practiceAccuracy: null }, subjects: [] });
    expect((await other.get(`/v1/me/progress/chapters/${SCI}`)).json().practice.attempts).toBe(0);
    expect((await h.client().get('/v1/me/progress')).statusCode).toBe(401);
    expect((await c.get('/v1/me/progress/chapters/cbse-10-science-ch99')).statusCode).toBe(404);
  });
});

describe('streaks (IST days, one freeze per week) and badges', () => {
  it('counts IST days, covers one missed day per week, and resets otherwise', async () => {
    const c = h.client();
    h.clock.set(istNoon('2026-11-02')); // Monday
    const { user } = await c.signInEmail(email());
    const day = async (d: string, i: number) => {
      h.clock.set(istNoon(d));
      return (await correctMcq(c, i)).streak;
    };
    expect(await day('2026-11-02', 0)).toMatchObject({ current: 1, freezeAvailableThisWeek: true });
    expect(await day('2026-11-03', 1)).toMatchObject({ current: 2 });
    expect(await day('2026-11-05', 2)).toMatchObject({ current: 3, longest: 3, freezeAvailableThisWeek: false }); // Wed covered by the freeze
    expect(await day('2026-11-07', 3)).toMatchObject({ current: 1, longest: 3 }); // Fri missed, freeze already used this week
    expect(await day('2026-11-09', 4)).toMatchObject({ current: 1 }); // Sun Nov 8 belongs to the week of Nov 2
    expect(await day('2026-11-11', 5)).toMatchObject({ current: 2, freezeAvailableThisWeek: false }); // Tue Nov 10: new week's freeze

    // Two answers on one IST day count once; 23:59 IST and 00:01 IST are different days.
    h.clock.set(Date.parse('2026-11-12T18:29:00Z'));
    expect((await correctMcq(c, 6)).streak.current).toBe(3);
    h.clock.set(Date.parse('2026-11-12T18:31:00Z'));
    expect((await correctMcq(c, 7)).streak.current).toBe(4);
    expect((await correctMcq(c, 8)).streak.current).toBe(4);

    // The read view: today not yet counted → at risk; three idle days → broken (shown as 0, nothing written).
    h.clock.set(istNoon('2026-11-14'));
    expect((await c.get('/v1/me/progress')).json().totals.streak).toMatchObject({ current: 4, atRisk: true });
    h.clock.set(istNoon('2026-11-17'));
    expect((await c.get('/v1/me/progress')).json().totals.streak).toMatchObject({ current: 0, longest: 4, atRisk: false });
    const [s] = await h.t.db.select().from(streaks).where(eq(streaks.userId, user.id));
    expect(s!.currentDays).toBe(4);

    const badges = (await c.get('/v1/me/badges')).json().badges as { key: string; awarded: boolean; awardedAt: string | null }[];
    const got = badges.filter((b) => b.awarded).map((b) => b.key).sort();
    expect(got).toEqual(['first-correct', 'streak-3']);
    expect(badges.find((b) => b.key === 'streak-7')).toMatchObject({ awarded: false, awardedAt: null });
    expect((await h.client().get('/v1/me/badges')).statusCode).toBe(401);
  });

  it('streak helpers: week boundaries and the view of an empty row', () => {
    expect(weekMonday('2026-11-08')).toBe('2026-11-02');
    expect(weekMonday('2026-11-09')).toBe('2026-11-09');
    expect(dayNumber('2026-11-10') - dayNumber('2026-11-09')).toBe(1);
    expect(streakView(undefined, '2026-11-09')).toEqual({ current: 0, longest: 0, lastActiveDay: null, atRisk: false, freezeAvailableThisWeek: true });
    expect(levelForXp(0)).toEqual({ level: 1, levelStartXp: 0, nextLevelXp: 50 });
    expect(levelForXp(3000).level).toBe(10);
    expect(levelForXp(3801)).toEqual({ level: 11, levelStartXp: 3800, nextLevelXp: 4600 });
  });

  it('chapter-master needs 20 checked answers at 80% in one chapter', async () => {
    const c = h.client();
    h.clock.set(istNoon('2026-11-20'));
    await c.signInEmail(email());
    const objective = sci().questions.filter((q) => 'option_ids' in q.answer).slice(0, 20);
    let awarded: string[] = [];
    for (const q of objective) {
      const r = (await c.post('/v1/practice/answers', { questionId: q.id, response: { option_ids: (q.answer as { option_ids: string[] }).option_ids } })).json();
      awarded = awarded.concat(r.badgesAwarded);
    }
    expect(awarded).toContain('chapter-master');
    expect(awarded).toContain('first-correct');
  });
});

describe('POST /v1/me/merge-guest (M2: positions and answers stored)', () => {
  const at = '2026-10-20T10:00:00.000Z';
  async function realKey(questionKey: string) {
    const [r] = await h.t.db.select({ id: questions.id }).from(questions).where(and(eq(questions.key, questionKey), eq(questions.isCurrent, true)));
    return r!.id;
  }

  it('stores lesson positions and practice answers, keeps the further position, and is idempotent', async () => {
    const qs = sci().questions.filter((q) => q.type === 'mcq');
    const c = h.client();
    h.clock.set(istNoon('2026-11-25'));
    const { user } = await c.signInEmail(email());
    // App progress already exists on part 1 (slide 10); the guest was only at slide 3 there.
    await c.request('PUT', '/v1/me/lesson-progress', { body: { chapterId: SCI, part: 1, slide: 10 } });
    const payload = {
      v: 1,
      lessons: [
        { chapter: SCI, part: 1, slide: 3, completed: false, updatedAt: at },
        { chapter: SCI, part: 2, slide: 999, mode: 'listen', completed: true, updatedAt: at },
        { chapter: HINDI, slide: 4, completed: false, updatedAt: at },
        { chapter: SCI, part: 7, slide: 1, completed: false, updatedAt: at },
        { chapter: 'cbse-10-science-ch12', slide: 1, completed: false, updatedAt: at },
      ],
      practice: [
        { chapter: SCI, question: qs[0]!.id, correct: false, answeredAt: '2026-10-20T09:00:00.000Z' },
        { chapter: SCI, question: qs[0]!.id, correct: true, answeredAt: at },
        { chapter: SCI, question: qs[1]!.id, correct: false, answeredAt: at },
        { chapter: HINDI, question: qs[2]!.id, correct: true, answeredAt: at },
        { chapter: SCI, question: 'q_not_real_0001', correct: true, answeredAt: '2030-01-01T00:00:00.000Z' },
      ],
    };
    const res = await c.post('/v1/me/merge-guest', payload);
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({
      merged: true,
      lessonsStored: 3,
      practiceStored: 2,
      lessonsCompleted: 1,
      practiceCorrect: 1,
      xpAwarded: GUEST_MERGE.xpPerLessonCompleted + GUEST_MERGE.xpPerPracticeCorrect,
      ignored: { unknownChapters: 0, unknownQuestions: 2, positionsNotStored: 0 },
    });

    const lp = await h.t.db.select().from(lessonProgress).where(eq(lessonProgress.userId, user.id));
    const byKey = new Map(lp.map((r) => [`${r.unit}:${r.part}`, r]));
    expect(byKey.get(`${SCI}:1`)).toMatchObject({ slidePosition: 10, source: 'app', completedAt: null });
    expect(byKey.get(`${SCI}:2`)).toMatchObject({ slidePosition: slides(2) - 1, source: 'guest_merge', mode: 'listen' });
    expect(byKey.get(`${SCI}:2`)!.completedAt!.toISOString()).toBe(at);
    expect(byKey.get(`${HINDI}:0`)).toMatchObject({ slidePosition: 4, source: 'guest_merge' });

    const pa = await h.t.db.select().from(practiceAnswers).where(eq(practiceAnswers.userId, user.id));
    expect(pa.map((r) => [r.questionKey, r.correct, r.source, r.response]).sort()).toEqual(
      [
        [qs[0]!.id, true, 'guest_merge', null],
        [qs[1]!.id, false, 'guest_merge', null],
      ].sort(),
    );
    expect(pa.find((r) => r.questionKey === qs[0]!.id)!.questionId).toBe(await realKey(qs[0]!.id));

    // Replay: once per account.
    expect((await c.post('/v1/me/merge-guest', payload)).json()).toMatchObject({ merged: false, alreadyMerged: true, lessonsStored: 0, practiceStored: 0 });
    // Even without the once-per-account flag the stored rows do not duplicate (unique guest_merge index).
    await h.t.db.update(profiles).set({ guestMergedAt: null }).where(eq(profiles.userId, user.id));
    const second = await mergeGuestProgress(h.t.db, h.clock, user.id, '2026-27', { ...payload, lessons: payload.lessons, practice: payload.practice } as never);
    expect(second).toMatchObject({ merged: true, practiceStored: 0, xpAwarded: 0 });
    expect(await h.t.db.select().from(practiceAnswers).where(eq(practiceAnswers.userId, user.id))).toHaveLength(2);
    expect(await h.t.db.select().from(lessonProgress).where(eq(lessonProgress.userId, user.id))).toHaveLength(3);

    // The progress API now shows the merged state; a later in-app correct answer to a merged question earns no second XP.
    const chapter = (await c.get(`/v1/me/progress/chapters/${SCI}`)).json();
    expect(chapter.lessons[1]).toMatchObject({ part: 2, completedAt: at });
    expect(chapter.practice).toMatchObject({ questionsAnswered: 2, questionsCorrect: 1 });
    const later = await c.post('/v1/practice/answers', { questionId: qs[0]!.id, response: { option_ids: (qs[0]!.answer as { option_ids: string[] }).option_ids } });
    expect(later.json()).toMatchObject({ correct: true, xpAwarded: 0 });
    void questionKeys;
  });
});
