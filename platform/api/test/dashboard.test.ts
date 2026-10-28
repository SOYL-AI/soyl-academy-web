/**
 * GET /v1/me/dashboard on real content (CBSE 10 Maths ch01: two-part lesson, practice pool, chapter tests):
 * members only (401 guests), rate limited, an empty new account, and a fixture student whose practice,
 * lessons and chapter test straddle the IST week boundary (Sunday 23:59 / Monday 00:01 IST), so every
 * total, the accuracy windows, difficulty counts, mastery levels (same formula as GET /v1/me/mastery),
 * test history, focus areas, recent activity, badges and the weekly goal are checked against known
 * numbers. No answer keys or solutions in the response (DB-6); scoped to the caller (API-7).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { questionKeys, questions } from '@soyl/db';
import { BADGES } from '@soyl/shared/config/gamification';
import { DASHBOARD } from '@soyl/shared/config/learning';
import { RATE_LIMITS } from '@soyl/shared/config/security';
import { difficultyBand } from '@soyl/shared/learning/mastery';
import { createHarness, type Client, type Harness } from './helpers';
import { seedRealContent, type ReleaseFile } from './content-fixture';
import { itemKeys, responseFor, type ItemKey } from './tests-fixture';

let h: Harness;
let releases: ReleaseFile[];
const CH = 'cbse-10-mathematics-ch01';
const SUBJECT = 'cbse-10-mathematics';
const SHORT = 't_cbse10math_ch01_short';
let n = 0;
const email = () => `dash.${Date.now().toString(36)}${++n}@example.com`;
/** An instant given as IST wall-clock time. */
const ist = (local: string) => Date.parse(`${local}+05:30`);

/** Keys that only exist on the answer side (DB-6, API-9) — same list as content.test.ts and insights.test.ts. */
const FORBIDDEN_KEYS = new Set(['answer', 'answers', 'solution', 'solution_md', 'solutionMd', 'marking_scheme', 'markingScheme', 'rubric', 'childKeys', 'child_keys', 'model_answer_md', 'accepted', 'option_ids', 'correct', 'explanation']);
function forbiddenKeyPaths(value: unknown, path = '$'): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => forbiddenKeyPaths(v, `${path}[${i}]`));
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => [...(FORBIDDEN_KEYS.has(k) ? [`${path}.${k}`] : []), ...forbiddenKeyPaths(v, `${path}.${k}`)]);
  return [];
}

type PracticeKey = Pick<ItemKey, 'type' | 'answer' | 'children' | 'childKeys'> & { key: string; difficulty: number; solution: string };
let practiceKeys: PracticeKey[] = [];
let lessonParts: { part: number; slides: number }[] = [];
const objective = (k: PracticeKey) => !['short', 'long', 'case-based', 'source-based', 'writing', 'map'].includes(k.type);

async function member(): Promise<{ c: Client; id: string }> {
  const c = h.client();
  const r = await c.signInEmail(email());
  return { c, id: r.user.id };
}

/** Answers one practice question at exactly `at` (the helper used to stay under practice.answer.user). */
async function answerAt(c: Client, at: number, k: PracticeKey, right: boolean) {
  h.clock.set(at);
  const res = await c.post('/v1/practice/answers', { questionId: k.key, response: responseFor(k as unknown as ItemKey, right) });
  expect(res.statusCode, res.body).toBe(200);
  return res.json() as { correct: boolean | null };
}

async function finishLesson(c: Client, part: number) {
  const l = lessonParts.find((x) => x.part === part)!;
  const res = await c.request('PUT', '/v1/me/lesson-progress', { body: { chapterId: CH, part, slide: l.slides - 1, completed: true } });
  expect(res.statusCode, res.body).toBe(200);
}

/** Takes the short chapter test with every item right; written items self-evaluated in full. */
async function takeChapterTest(c: Client) {
  const keys = await itemKeys(h.t, SHORT);
  const started = await c.post(`/v1/tests/${SHORT}/attempts`);
  expect([200, 201]).toContain(started.statusCode);
  const attemptId = started.json().attempt.id as string;
  const save = await c.request('PUT', `/v1/attempts/${attemptId}/responses`, { body: { items: keys.map((k) => ({ itemId: k.itemId, seq: 1, response: responseFor(k, true), timeSpentSec: 30 })) } });
  expect(save.statusCode, save.body).toBe(200);
  h.clock.advance(5 * 60_000);
  expect((await c.post(`/v1/attempts/${attemptId}/submit`)).statusCode).toBe(200);
  const result = (await c.get(`/v1/attempts/${attemptId}/result`)).json() as { items: { itemId: string; counted: boolean; selfMax: number }[] };
  const selfItems = result.items.filter((i) => i.counted && i.selfMax > 0).map((i) => ({ itemId: i.itemId, marks: i.selfMax }));
  if (selfItems.length) {
    const ev = await c.post(`/v1/attempts/${attemptId}/self-evaluation`, { items: selfItems });
    expect(ev.statusCode, ev.body).toBe(200);
  }
  const final = (await c.get(`/v1/attempts/${attemptId}/result`)).json() as { attempt: { submittedAt: string }; score: { total: number; max: number; auto: number; self: number } };
  return { attemptId, selfMarked: selfItems.length > 0, ...final };
}

beforeAll(async () => {
  h = await createHarness();
  releases = await seedRealContent(h.t, (u) => u === CH);
  const rel = releases[0]!.release;
  lessonParts = rel.decks.map((d) => ({ part: d.part ?? 0, slides: d.slides.length }));
  const rows = await h.t.db
    .select({ q: questions, k: questionKeys })
    .from(questions)
    .innerJoin(questionKeys, eq(questionKeys.questionId, questions.id))
    .where(and(eq(questions.pool, 'practice'), eq(questions.isCurrent, true)));
  practiceKeys = rows
    .filter((r) => rel.questions.some((x) => x.id === r.q.key))
    .map((r) => ({
      key: r.q.key,
      type: r.q.type,
      difficulty: r.q.difficulty,
      answer: r.k.answer as Record<string, unknown>,
      children: ((r.q.body as { children?: unknown[] }).children ?? []) as ItemKey['children'],
      childKeys: (r.k.childKeys ?? []) as ItemKey['childKeys'],
      solution: r.k.solutionMd,
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
  expect(practiceKeys.filter(objective).length).toBeGreaterThan(4);
});
afterAll(async () => {
  await h?.close();
});

describe('access', () => {
  it('guests get 401; members are rate limited by dashboard.read.user', async () => {
    expect((await h.client().get('/v1/me/dashboard')).statusCode).toBe(401);
    h.clock.set(ist('2026-11-01T10:00:00'));
    const { c } = await member();
    const limit = RATE_LIMITS['dashboard.read.user'].limit;
    for (let i = 0; i < limit; i++) expect((await c.get('/v1/me/dashboard')).statusCode).toBe(200);
    expect((await c.get('/v1/me/dashboard')).statusCode).toBe(429);
  });
});

describe('a brand-new account', () => {
  it('gets zeros, no scope, the first badge next, the default goal, and prompts for board and class', async () => {
    h.clock.set(ist('2026-11-04T12:00:00')); // a Wednesday
    const { c } = await member();
    const res = await c.get('/v1/me/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toContain('no-store');
    const zero = { allTime: 0, thisWeek: 0, lastWeek: 0 };
    const none = { solved: 0, total: 0 };
    expect(res.json()).toEqual({
      timezone: 'Asia/Kolkata',
      today: '2026-11-04',
      thisWeek: { from: '2026-11-02', to: '2026-11-08' },
      lastWeek: { from: '2026-10-26', to: '2026-11-01' },
      profile: { board: null, classLevel: null, school: null, schoolStatus: 'consent_required', missing: ['board', 'classLevel'] },
      totals: {
        solved: zero,
        answered: zero,
        accuracy: {
          recent: { from: '2026-10-29', to: '2026-11-04', checked: 0, right: 0, accuracy: null },
          previous: { from: '2026-10-22', to: '2026-10-28', checked: 0, right: 0, accuracy: null },
        },
        lessonsCompleted: zero,
        tests: { submitted: zero, distinctTests: 0, averagePct: null, bestPct: null },
        activeDays: { thisWeek: 0, lastWeek: 0, allTime: 0 },
      },
      scope: { kind: 'none', board: null, classLevel: null, subjectCount: 0, chapterCount: 0 },
      solvedByDifficulty: { all: none, easy: none, medium: none, hard: none },
      mastery: { score: 0, chapterCount: 0, levels: { not_started: 0, attempted: 0, familiar: 0, proficient: 0, mastered: 0 } },
      testHistory: [],
      focus: { weakest: [], strongest: [] },
      recent: [],
      badges: { earned: 0, total: BADGES.length, next: { key: BADGES[0]!.key, name: BADGES[0]!.name, description: BADGES[0]!.description, icon: BADGES[0]!.icon, current: 0, target: 1, progress: 0 } },
      weeklyGoal: { metric: 'questions_solved', target: DASHBOARD.weeklyGoal.default, isDefault: true, progress: 0, remaining: DASHBOARD.weeklyGoal.default, met: false, weekStart: '2026-11-02', weekEnd: '2026-11-08', daysLeft: 5 },
    });

    // With board and class: the class scope covers every chapter of the class's subjects, all not started.
    expect((await c.patch('/v1/me', { board: 'cbse', classLevel: 10 })).statusCode).toBe(200);
    const d = (await c.get('/v1/me/dashboard')).json();
    expect(d.profile.missing).toEqual([]);
    expect(d.scope).toMatchObject({ kind: 'class', board: 'cbse', classLevel: 10, subjectCount: 1 });
    expect(d.scope.chapterCount).toBeGreaterThan(1);
    expect(d.mastery).toEqual({ score: 0, chapterCount: d.scope.chapterCount, levels: { not_started: d.scope.chapterCount, attempted: 0, familiar: 0, proficient: 0, mastered: 0 } });
    expect(d.solvedByDifficulty.all).toEqual({ solved: 0, total: practiceKeys.length });
    for (const band of ['easy', 'medium', 'hard'] as const)
      expect(d.solvedByDifficulty[band]).toEqual({ solved: 0, total: practiceKeys.filter((k) => difficultyBand(k.difficulty) === band).length });
  });
});

describe('a fixture student across the IST week boundary', () => {
  it('reports totals, accuracy windows, difficulty, mastery, tests, focus, recent activity, badges and the goal', async () => {
    h.clock.set(ist('2026-11-13T09:00:00'));
    const { c } = await member();
    expect((await c.patch('/v1/me', { board: 'cbse', classLevel: 10, weeklyGoal: 5 })).statusCode).toBe(200);
    const [k1, k2, k3, k4] = practiceKeys.filter(objective);

    // Previous accuracy window and last IST week (Tue 17 Nov): k4 wrong.
    await answerAt(c, ist('2026-11-17T12:00:00'), k4!, false);
    // Sunday 22 Nov 23:58 / 23:59 IST (last week): k1 right (solved), k2 wrong.
    await answerAt(c, ist('2026-11-22T23:58:00'), k1!, true);
    await answerAt(c, ist('2026-11-22T23:59:00'), k2!, false);
    // Monday 23 Nov 00:01 IST (this week; still Sunday in UTC): k2 right (solved now), k3 right; a lesson part.
    await answerAt(c, ist('2026-11-23T00:01:00'), k2!, true);
    await answerAt(c, ist('2026-11-23T00:02:00'), k3!, true);
    h.clock.set(ist('2026-11-23T00:05:00'));
    await finishLesson(c, lessonParts[0]!.part);
    // Wednesday 25 Nov: the chapter test, every item right.
    h.clock.set(ist('2026-11-25T10:00:00'));
    const test = await takeChapterTest(c);
    const pct = Math.round((test.score.total / test.score.max) * 1000) / 10;

    h.clock.set(ist('2026-11-25T18:00:00'));
    const res = await c.get('/v1/me/dashboard');
    expect(res.statusCode, res.body).toBe(200);
    const d = res.json();

    expect(d).toMatchObject({ today: '2026-11-25', thisWeek: { from: '2026-11-23', to: '2026-11-29' }, lastWeek: { from: '2026-11-16', to: '2026-11-22' } });
    expect(d.totals).toEqual({
      solved: { allTime: 3, thisWeek: 2, lastWeek: 1 },
      answered: { allTime: 5, thisWeek: 2, lastWeek: 3 },
      accuracy: {
        // 19–25 Nov: k1 right, k2 wrong (22 Nov), k2 right, k3 right (23 Nov).
        recent: { from: '2026-11-19', to: '2026-11-25', checked: 4, right: 3, accuracy: 0.75 },
        // 12–18 Nov: k4 wrong.
        previous: { from: '2026-11-12', to: '2026-11-18', checked: 1, right: 0, accuracy: 0 },
      },
      lessonsCompleted: { allTime: 1, thisWeek: 1, lastWeek: 0 },
      tests: { submitted: { allTime: 1, thisWeek: 1, lastWeek: 0 }, distinctTests: 1, averagePct: pct, bestPct: pct },
      // This week: 23 and 25 Nov; last week: 17 and 22 Nov.
      activeDays: { thisWeek: 2, lastWeek: 2, allTime: 4 },
    });

    // Solved by difficulty over the class scope (CBSE 10: Maths only in this fixture).
    const solvedKeys = [k1!, k2!, k3!];
    expect(d.solvedByDifficulty.all).toEqual({ solved: 3, total: practiceKeys.length });
    for (const band of ['easy', 'medium', 'hard'] as const)
      expect(d.solvedByDifficulty[band]).toEqual({
        solved: solvedKeys.filter((k) => difficultyBand(k.difficulty) === band).length,
        total: practiceKeys.filter((k) => difficultyBand(k.difficulty) === band).length,
      });

    // Mastery level counts: the same numbers as GET /v1/me/mastery for the (only) subject in scope.
    const m = (await c.get(`/v1/me/mastery?subjectId=${SUBJECT}`)).json() as { subjects: { score: number; chapterCount: number; levels: Record<string, number>; chapters: { chapterId: string; level: string; score: number; firstTryAccuracy: number | null; evidence: { practiceAttempted: number; practiceTotal: number; chapterTestPct: number | null } }[] }[] };
    const subject = m.subjects[0]!;
    expect(d.mastery).toEqual({ score: subject.score, chapterCount: subject.chapterCount, levels: subject.levels });
    expect(d.scope).toMatchObject({ kind: 'class', subjectCount: 1, chapterCount: subject.chapterCount });

    // Test history.
    expect(d.testHistory).toEqual([
      {
        attemptId: test.attemptId,
        testId: SHORT,
        title: expect.any(String),
        kind: 'chapter',
        subjectId: SUBJECT,
        subjectName: expect.any(String),
        submittedAt: test.attempt.submittedAt,
        day: '2026-11-25',
        autoSubmitted: false,
        score: test.score.total,
        maxScore: test.score.max,
        percentage: pct,
        autoScore: test.score.auto,
        selfScore: test.score.self,
        marking: test.selfMarked ? 'self' : 'auto',
        liveEventId: null,
      },
    ]);

    // Focus: ch01 is really attempted (4 questions + a chapter test); its side follows its level.
    const ch = subject.chapters.find((x) => x.chapterId === CH)!;
    const focus = {
      chapterId: CH,
      number: 1,
      title: expect.any(String),
      subjectId: SUBJECT,
      subjectName: expect.any(String),
      level: ch.level,
      score: ch.score,
      firstTryAccuracy: ch.firstTryAccuracy,
      practiceAttempted: 4,
      practiceTotal: practiceKeys.length,
      chapterTestPct: ch.evidence.chapterTestPct,
      link: { board: 'cbse', classLevel: 10, subjectId: SUBJECT, subjectSlug: 'mathematics', chapterId: CH, chapterSlug: 'ch01' },
    };
    if ((DASHBOARD.focus.strongLevels as readonly string[]).includes(ch.level)) expect(d.focus).toEqual({ weakest: [], strongest: [focus] });
    else expect(d.focus).toEqual({ weakest: [focus], strongest: [] });

    // Recent activity: newest first, practice grouped by chapter and IST day.
    const ats = d.recent.map((e: { at: string }) => e.at);
    expect([...ats].sort().reverse()).toEqual(ats);
    expect(d.recent.length).toBeLessThanOrEqual(DASHBOARD.recentLimit);
    const practice = d.recent.filter((e: { kind: string }) => e.kind === 'practice');
    expect(practice.map((e: { day: string; answered: number; solved: number }) => [e.day, e.answered, e.solved])).toEqual([
      ['2026-11-23', 2, 2],
      ['2026-11-22', 2, 1],
      ['2026-11-17', 1, 0],
    ]);
    expect(practice[0].chapter).toMatchObject({ chapterId: CH, subjectId: SUBJECT, link: { chapterSlug: 'ch01' } });
    expect(d.recent.find((e: { kind: string }) => e.kind === 'lesson')).toMatchObject({ day: '2026-11-23', part: lessonParts[0]!.part, chapter: { chapterId: CH } });
    expect(d.recent.find((e: { kind: string }) => e.kind === 'test')).toMatchObject({ attemptId: test.attemptId, testId: SHORT, testKind: 'chapter', percentage: pct, day: '2026-11-25' });
    const badgeKeys = d.recent.filter((e: { kind: string }) => e.kind === 'badge').map((e: { badgeKey: string }) => e.badgeKey);
    expect(badgeKeys).toEqual(expect.arrayContaining(['first-lesson', 'first-correct', 'first-test']));

    // Badges: earned matches GET /v1/me/badges; the next one is unearned with honest progress.
    const all = (await c.get('/v1/me/badges')).json().badges as { key: string; awarded: boolean }[];
    expect(d.badges.earned).toBe(all.filter((b) => b.awarded).length);
    expect(d.badges.total).toBe(all.length);
    expect(d.badges.next).not.toBeNull();
    expect(all.find((b) => b.key === d.badges.next.key)!.awarded).toBe(false);
    expect(d.badges.next.progress).toBeLessThan(1);
    expect(d.badges.next.progress).toBeCloseTo(d.badges.next.current / d.badges.next.target, 3);

    // Weekly goal: 5 questions; 2 first solved this IST week (the Sunday 23:58 solve was last week).
    expect(d.weeklyGoal).toEqual({ metric: 'questions_solved', target: 5, isDefault: false, progress: 2, remaining: 3, met: false, weekStart: '2026-11-23', weekEnd: '2026-11-29', daysLeft: 5 });

    // DB-6: no answer keys or solution text anywhere.
    expect(forbiddenKeyPaths(d)).toEqual([]);
    for (const k of practiceKeys) if (k.solution.length > 20) expect(res.body.includes(k.solution), 'solution text leaked').toBe(false);

    // API-7: another member sees none of it.
    const other = await member();
    const o = (await other.c.get('/v1/me/dashboard')).json();
    expect(o.totals.answered.allTime).toBe(0);
    expect(o.testHistory).toEqual([]);
    expect(o.recent).toEqual([]);
  });
});
