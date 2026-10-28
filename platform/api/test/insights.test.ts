/**
 * Learning insights on real content (CBSE 10 Maths ch01: two-part lesson, practice pool, chapter tests):
 * GET /v1/me/activity (IST-day heatmap, midnight boundaries), GET /v1/me/mastery (levels match the pure
 * shared formula), practice-list status/difficulty/summary (no answer leakage, DB-6), GET /v1/me/card
 * (private, D-039 public name only, deterministic), members only and scoped to the caller (API-7).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { questionKeys, questions } from '@soyl/db';
import { ACTIVITY, PLAYER_CARD } from '@soyl/shared/config/learning';
import { chapterMastery, difficultyBand, subjectMastery, type ChapterEvidence } from '@soyl/shared/learning/mastery';
import { RATE_LIMITS } from '@soyl/shared/config/security';
import { createHarness, type Client, type Harness } from './helpers';
import { seedRealContent, type ReleaseFile } from './content-fixture';
import { itemKeys, responseFor, type ItemKey } from './tests-fixture';

let h: Harness;
let releases: ReleaseFile[];
const CH = 'cbse-10-mathematics-ch01';
const SUBJECT = 'cbse-10-mathematics';
const SHORT = 't_cbse10math_ch01_short';
let n = 0;
const email = () => `insights.${Date.now().toString(36)}${++n}@example.com`;
/** An instant given as IST wall-clock time. */
const ist = (local: string) => Date.parse(`${local}+05:30`);

/** Keys that only exist on the answer side (DB-6, API-9) — same list as content.test.ts. */
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

async function member(): Promise<{ c: Client; id: string }> {
  const c = h.client();
  const r = await c.signInEmail(email());
  return { c, id: r.user.id };
}

/** Answers one practice question right or wrong; written parts are self-marked in full when `right`. */
async function answer(c: Client, k: PracticeKey, right: boolean) {
  h.clock.advance(1100); // stays under practice.answer.user (60/min)
  const res = await c.post('/v1/practice/answers', { questionId: k.key, response: responseFor(k as unknown as ItemKey, right) });
  expect(res.statusCode, res.body).toBe(200);
  const body = res.json() as { answerId: string; selfAssessmentPending: boolean; selfMaxMarks: number; correct: boolean | null };
  if (right && body.selfAssessmentPending) {
    h.clock.advance(1100);
    const p = await c.request('PATCH', `/v1/practice/answers/${body.answerId}`, { body: { marks: body.selfMaxMarks } });
    expect(p.statusCode, p.body).toBe(200);
  }
  return body;
}

async function finishLesson(c: Client, part: number) {
  const l = lessonParts.find((x) => x.part === part)!;
  const res = await c.request('PUT', '/v1/me/lesson-progress', { body: { chapterId: CH, part, slide: l.slides - 1, completed: true } });
  expect(res.statusCode, res.body).toBe(200);
}

const objective = (k: PracticeKey) => !['short', 'long', 'case-based', 'source-based', 'writing', 'map'].includes(k.type);

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'granted' });
  releases = await seedRealContent(h.t, (u) => u === CH);
  const rel = releases[0]!.release;
  lessonParts = rel.decks.map((d) => ({ part: d.part ?? 0, slides: d.slides.length }));
  const rows = await h.t.db
    .select({ q: questions, k: questionKeys })
    .from(questions)
    .innerJoin(questionKeys, eq(questionKeys.questionId, questions.id))
    .where(and(eq(questions.pool, 'practice'), eq(questions.isCurrent, true)));
  practiceKeys = rows
    .filter((r) => r.q.key.includes('cbse10math') || rel.questions.some((x) => x.id === r.q.key))
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
  expect(practiceKeys.length).toBeGreaterThan(20);
});
afterAll(async () => {
  await h?.close();
});

describe('members only', () => {
  it('guests get 401 on the insights routes; a guest practice page has bands, null status and a summary without solved counts', async () => {
    const guest = h.client();
    for (const path of ['/v1/me/activity', '/v1/me/mastery', '/v1/me/card']) expect((await guest.get(path)).statusCode, path).toBe(401);
    const page = await guest.get(`/v1/chapters/${CH}/practice?limit=25`);
    expect(page.statusCode).toBe(200);
    const body = page.json() as { total: number; items: { status: unknown; difficulty: string; question: { difficulty: number } }[]; summary: { total: number; byDifficulty: Record<string, { total: number; solved: number | null }>; byStatus: unknown } };
    expect(body.items.every((i) => i.status === null && i.difficulty === difficultyBand(i.question.difficulty))).toBe(true);
    expect(body.summary.total).toBe(practiceKeys.length);
    expect(body.summary.byStatus).toBeNull();
    expect(Object.values(body.summary.byDifficulty).every((b) => b.solved === null)).toBe(true);
    expect(Object.values(body.summary.byDifficulty).reduce((s, b) => s + b.total, 0)).toBe(practiceKeys.length);
  });

  it('validates the query strings', async () => {
    h.clock.set(ist('2026-11-01T10:00:00'));
    const { c } = await member();
    expect((await c.get('/v1/me/activity?days=0')).statusCode).toBe(400);
    expect((await c.get(`/v1/me/activity?days=${ACTIVITY.maxDays + 1}`)).statusCode).toBe(400);
    expect((await c.get('/v1/me/activity?days=7&x=1')).statusCode).toBe(400);
    expect((await c.get('/v1/me/mastery?subjectId=not%20a%20subject')).statusCode).toBe(400);
    expect((await c.get('/v1/me/mastery?subjectId=cbse-10-astrology')).statusCode).toBe(404);
    expect((await c.get(`/v1/chapters/${CH}/practice?status=done`)).statusCode).toBe(400);
    expect((await c.get(`/v1/chapters/${CH}/practice?difficulty=extreme`)).statusCode).toBe(400);
  });
});

describe('a brand-new member', () => {
  it('gets empty activity, not-started mastery and a floor-rated provisional card with the public name', async () => {
    h.clock.set(ist('2026-11-01T12:00:00'));
    const { c } = await member();
    const act = await c.get('/v1/me/activity');
    expect(act.statusCode).toBe(200);
    expect(act.headers['cache-control']).toContain('no-store');
    expect(act.json()).toEqual({
      timezone: 'Asia/Kolkata',
      from: '2025-11-02',
      to: '2026-11-01',
      days: ACTIVITY.defaultDays,
      calendar: [],
      totals: { answered: 0, solved: 0, lessonsCompleted: 0, testsSubmitted: 0, activeDays: 0 },
      streak: { current: 0, longest: 0, lastActiveDay: null, atRisk: false, freezeAvailableThisWeek: true },
      activeDaysAllTime: 0,
    });
    expect((await c.get('/v1/me/mastery')).json()).toEqual({ subjects: [] });
    const subject = (await c.get(`/v1/me/mastery?subjectId=${SUBJECT}`)).json() as { subjects: { chapterCount: number; score: number; levels: Record<string, number>; chapters: { level: string; score: number; evidence: ChapterEvidence }[] }[] };
    expect(subject.subjects).toHaveLength(1);
    const s = subject.subjects[0]!;
    expect(s.chapterCount).toBeGreaterThan(1);
    expect(s.levels.not_started).toBe(s.chapterCount);
    expect(s.score).toBe(0);
    const ch1 = s.chapters[0]!;
    expect(ch1.evidence).toMatchObject({ lessonParts: lessonParts.length, practiceTotal: practiceKeys.length, chapterTestAvailable: true, chapterTestPct: null, practiceAttempted: 0 });
    // Chapters without published content have nothing to show and no hints.
    expect(s.chapters.slice(1).every((x) => x.evidence.practiceTotal === 0 && x.level === 'not_started')).toBe(true);

    const card = (await c.get('/v1/me/card')).json() as Record<string, unknown> & { attributes: { key: string }[] };
    const me = (await c.get('/v1/me')).json() as { publicName: string };
    expect(card).toMatchObject({ publicName: me.publicName, level: 1, xp: 0, coins: 0, overall: PLAYER_CARD.floor, tier: 'bronze', provisional: true, asOfDay: '2026-11-01' });
    expect(card.attributes.map((a) => a.key)).toEqual(['ACC', 'CON', 'BRE', 'MAS', 'TST']);
  });
});

describe('GET /v1/me/activity', () => {
  it('buckets by IST calendar day across midnight; solved counts on the first-solved day only', async () => {
    h.clock.set(ist('2026-11-02T08:00:00'));
    const { c } = await member();
    const [k1, k2] = practiceKeys.filter(objective);
    // 23:59 IST on 2 Nov (18:29 UTC): wrong. 00:01 IST on 3 Nov (still 2 Nov in UTC): right.
    h.clock.set(ist('2026-11-02T23:59:00') - 1100);
    await answer(c, k1!, false);
    h.clock.set(ist('2026-11-03T00:01:00') - 1100);
    await answer(c, k1!, true);
    await finishLesson(c, lessonParts[0]!.part);
    // 4 Nov: k1 right again (not newly solved), k2 wrong.
    h.clock.set(ist('2026-11-04T09:00:00'));
    await answer(c, k1!, true);
    await answer(c, k2!, false);

    const res = await c.get('/v1/me/activity?days=7');
    expect(res.statusCode).toBe(200);
    const a = res.json();
    expect(a).toMatchObject({ from: '2026-10-29', to: '2026-11-04', days: 7, activeDaysAllTime: 3 });
    expect(a.calendar).toEqual([
      { date: '2026-11-02', answered: 1, solved: 0, lessonsCompleted: 0, testsSubmitted: 0, total: 1 },
      { date: '2026-11-03', answered: 1, solved: 1, lessonsCompleted: 1, testsSubmitted: 0, total: 2 },
      { date: '2026-11-04', answered: 2, solved: 0, lessonsCompleted: 0, testsSubmitted: 0, total: 2 },
    ]);
    expect(a.totals).toEqual({ answered: 4, solved: 1, lessonsCompleted: 1, testsSubmitted: 0, activeDays: 3 });
    expect(a.streak).toMatchObject({ current: 3, longest: 3, lastActiveDay: '2026-11-04' });

    // The window starts at 00:00 IST of its first day.
    const two = (await c.get('/v1/me/activity?days=2')).json();
    expect(two).toMatchObject({ from: '2026-11-03', to: '2026-11-04', activeDaysAllTime: 3 });
    expect(two.calendar.map((d: { date: string }) => d.date)).toEqual(['2026-11-03', '2026-11-04']);
    expect(two.totals.activeDays).toBe(2);

    // Another member sees none of it (API-7).
    const other = await member();
    expect((await other.c.get('/v1/me/activity?days=7')).json().calendar).toEqual([]);
  });

  it('is rate limited per user (insights.read.user)', async () => {
    h.clock.set(ist('2026-11-05T10:00:00'));
    const { c } = await member();
    const limit = RATE_LIMITS['insights.read.user'].limit;
    for (let i = 0; i < limit; i++) expect((await c.get('/v1/me/activity?days=1')).statusCode).toBe(200);
    expect((await c.get('/v1/me/card')).statusCode).toBe(429);
  });
});

describe('practice list status, difficulty and summary', () => {
  it('marks new / attempted / solved, counts per band and status, filters, and never leaks answers', async () => {
    h.clock.set(ist('2026-11-06T10:00:00'));
    const { c } = await member();
    const obj = practiceKeys.filter(objective);
    const written = practiceKeys.find((k) => !objective(k) && k.type !== 'case-based')!;
    const solved = [obj[0]!, obj[1]!, written];
    const attempted = [obj[2]!];
    for (const k of solved) await answer(c, k, true);
    await answer(c, attempted[0]!, false);

    const pages: string[] = [];
    const items: { question: { id: string; difficulty: number }; status: string; difficulty: string }[] = [];
    let cursor: string | null = null;
    let summary: { total: number; byDifficulty: Record<string, { total: number; solved: number }>; byStatus: Record<string, number> } | null = null;
    do {
      const res = await c.get(`/v1/chapters/${CH}/practice?limit=25${cursor ? `&cursor=${cursor}` : ''}`);
      expect(res.statusCode).toBe(200);
      expect(res.headers['cache-control']).toContain('no-store');
      pages.push(res.body);
      const page = res.json();
      items.push(...page.items);
      summary = page.summary;
      cursor = page.nextCursor;
    } while (cursor);
    expect(items).toHaveLength(practiceKeys.length);
    const status = new Map(items.map((i) => [i.question.id, i.status]));
    for (const k of solved) expect(status.get(k.key), k.key).toBe('solved');
    expect(status.get(attempted[0]!.key)).toBe('attempted');
    expect([...status.values()].filter((s) => s === 'new')).toHaveLength(practiceKeys.length - 4);
    expect(items.every((i) => i.difficulty === difficultyBand(i.question.difficulty))).toBe(true);
    expect(summary!.byStatus).toEqual({ new: practiceKeys.length - 4, attempted: 1, solved: 3 });
    expect(summary!.total).toBe(practiceKeys.length);
    for (const band of ['easy', 'medium', 'hard']) {
      expect(summary!.byDifficulty[band]!.total).toBe(practiceKeys.filter((k) => difficultyBand(k.difficulty) === band).length);
      expect(summary!.byDifficulty[band]!.solved).toBe(solved.filter((k) => difficultyBand(k.difficulty) === band).length);
    }

    // Filters: by status, by band (and the summary ignores filters).
    const onlySolved = (await c.get(`/v1/chapters/${CH}/practice?status=solved&limit=25`)).json();
    expect(onlySolved.items.map((i: { question: { id: string } }) => i.question.id).sort()).toEqual(solved.map((k) => k.key).sort());
    expect(onlySolved.total).toBe(3);
    expect(onlySolved.summary.total).toBe(practiceKeys.length);
    const notSolved = (await c.get(`/v1/chapters/${CH}/practice?status=new,attempted&limit=1`)).json();
    expect(notSolved.total).toBe(practiceKeys.length - 3);
    const easy = (await c.get(`/v1/chapters/${CH}/practice?difficulty=easy&limit=25`)).json();
    expect(easy.total).toBe(practiceKeys.filter((k) => difficultyBand(k.difficulty) === 'easy').length);
    expect(easy.items.every((i: { difficulty: string }) => i.difficulty === 'easy')).toBe(true);
    const mixed = (await c.get(`/v1/chapters/${CH}/practice?difficulty=hard,3&limit=1`)).json();
    expect(mixed.total).toBe(practiceKeys.filter((k) => k.difficulty >= 3).length);
    // Guests: everything is new.
    expect((await h.client().get(`/v1/chapters/${CH}/practice?status=solved`)).json().total).toBe(0);
    expect((await h.client().get(`/v1/chapters/${CH}/practice?status=new`)).json().total).toBe(practiceKeys.length);

    // DB-6 / F-006: a member who has answered still gets stems only.
    for (const body of pages) {
      expect(forbiddenKeyPaths(JSON.parse(body))).toEqual([]);
      for (const k of solved) if (k.solution.length > 20) expect(body.includes(k.solution), 'solution text leaked').toBe(false);
    }
  });
});

describe('mastery and the player card', () => {
  it('a full chapter (lesson, every practice question, chapter test) is mastered; levels match the shared formula', async () => {
    h.clock.set(ist('2026-11-07T09:00:00'));
    const { c } = await member();
    await c.request('PATCH', '/v1/me', { body: { displayName: 'Riya Sharma' } });
    for (const p of lessonParts) await finishLesson(c, p.part);
    // One question wrong first, then right: solved, but not first-try right.
    const obj = practiceKeys.filter(objective);
    await answer(c, obj[0]!, false);
    for (const k of practiceKeys) await answer(c, k, true);

    // Chapter test: every item right with a time, written items self-evaluated in full.
    h.clock.advance(60_000);
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
    const final = (await c.get(`/v1/attempts/${attemptId}/result`)).json() as { score: { total: number; max: number } };

    const t0 = Date.now();
    const res = await c.get('/v1/me/mastery');
    const elapsed = Date.now() - t0;
    expect(res.statusCode).toBe(200);
    expect(elapsed).toBeLessThan(3000); // performance sanity on a fully practised chapter
    const body = res.json() as { subjects: { subjectId: string; score: number; chapterCount: number; levels: Record<string, number>; chapters: { chapterId: string; level: string; score: number; components: unknown; hints: string[]; nextLevel: string | null; evidence: ChapterEvidence }[] }[] };
    expect(body.subjects.map((s) => s.subjectId)).toEqual([SUBJECT]);
    const s = body.subjects[0]!;
    const ch = s.chapters.find((x) => x.chapterId === CH)!;
    expect(ch.evidence).toEqual({
      lessonParts: lessonParts.length,
      lessonPartsStarted: lessonParts.length,
      lessonPartsCompleted: lessonParts.length,
      practiceTotal: practiceKeys.length,
      practiceAttempted: practiceKeys.length,
      practiceSolved: practiceKeys.length,
      firstTryChecked: expect.any(Number),
      firstTryCorrect: expect.any(Number),
      chapterTestAvailable: true,
      chapterTestPct: Math.round((final.score.total / final.score.max) * 1000) / 10,
    });
    expect(ch.evidence.firstTryCorrect).toBe(ch.evidence.firstTryChecked - 1);
    const expected = chapterMastery(ch.evidence);
    expect({ level: ch.level, score: ch.score, components: ch.components, hints: ch.hints, nextLevel: ch.nextLevel }).toEqual({
      level: expected.level,
      score: expected.score,
      components: expected.components,
      hints: expected.hints,
      nextLevel: expected.nextLevel,
    });
    expect(ch.level).toBe('mastered');
    expect({ score: s.score, chapterCount: s.chapterCount, levels: s.levels }).toEqual(subjectMastery(s.chapters as never));
    expect(s.levels.mastered).toBe(1);
    // ?subjectId= gives the same subject.
    expect((await c.get(`/v1/me/mastery?subjectId=${SUBJECT}`)).json()).toEqual(body);

    // The player card: private, public name only, deterministic, explained.
    const cardRes = await c.get('/v1/me/card');
    expect(cardRes.statusCode).toBe(200);
    expect(cardRes.headers['cache-control']).toContain('no-store');
    expect(cardRes.body).not.toContain('Riya');
    const card = cardRes.json() as { publicName: string; overall: number; tier: string; provisional: boolean; xp: number; coins: number; attributes: { key: string; value: number; raw: number; explain: string }[] };
    expect(card.publicName).toBe(((await c.get('/v1/me')).json() as { publicName: string }).publicName);
    expect(card.xp).toBeGreaterThan(0);
    expect(card.coins).toBe(((await c.get('/v1/coins')).json() as { balance: number }).balance);
    const keysOnCard = card.attributes.map((a) => a.key);
    expect(keysOnCard).toEqual(expect.arrayContaining(['ACC', 'CON', 'BRE', 'MAS', 'TST']));
    const objectiveRight = keys.filter((k) => ['mcq', 'assertion-reason', 'true-false', 'numerical', 'fill-blank'].includes(k.type)).length;
    if (objectiveRight >= PLAYER_CARD.attributes.SPD.minItems) expect(keysOnCard).toContain('SPD');
    for (const a of card.attributes) {
      expect(a.value).toBeGreaterThanOrEqual(PLAYER_CARD.floor);
      expect(a.value).toBeLessThanOrEqual(PLAYER_CARD.ceiling);
      expect(a.explain.length).toBeGreaterThan(5);
    }
    const mas = card.attributes.find((a) => a.key === 'MAS')!;
    expect(mas.raw).toBeCloseTo(ch.score / 100 / PLAYER_CARD.attributes.MAS.minChapters, 2);
    expect(card.attributes.find((a) => a.key === 'BRE')!.explain).toContain('1 chapter');
    expect(card.overall).toBeGreaterThan(PLAYER_CARD.floor);
    expect((await c.get('/v1/me/card')).json()).toEqual(card);

    // The activity heatmap shows the day (test submitted counted).
    const act = (await c.get('/v1/me/activity?days=1')).json();
    expect(act.calendar).toHaveLength(1);
    expect(act.calendar[0]).toMatchObject({ date: '2026-11-07', lessonsCompleted: lessonParts.length, testsSubmitted: 1, solved: practiceKeys.length });
  });
});

describe('guest-merged progress', () => {
  it('counts on the guest’s own IST days and feeds mastery like app answers', async () => {
    h.clock.set(ist('2026-11-10T12:00:00'));
    const { c } = await member();
    const [k1, k2] = practiceKeys.filter(objective);
    const merge = await c.post('/v1/me/merge-guest', {
      v: 1,
      lessons: [{ chapter: CH, part: lessonParts[0]!.part, slide: 999, completed: true, updatedAt: '2026-11-08T10:00:00.000Z' }],
      practice: [
        // 00:15 IST on 9 Nov is still 8 Nov in UTC.
        { chapter: CH, question: k1!.key, correct: true, answeredAt: '2026-11-08T18:45:00.000Z' },
        { chapter: CH, question: k2!.key, correct: false, answeredAt: '2026-11-08T10:00:00.000Z' },
      ],
    });
    expect(merge.statusCode, merge.body).toBe(200);
    const act = (await c.get('/v1/me/activity?days=7')).json();
    expect(act.calendar).toEqual([
      { date: '2026-11-08', answered: 1, solved: 0, lessonsCompleted: 1, testsSubmitted: 0, total: 2 },
      { date: '2026-11-09', answered: 1, solved: 1, lessonsCompleted: 0, testsSubmitted: 0, total: 1 },
    ]);
    // The app answer on 10 Nov solves k2; its first try (merged, wrong) still counts as the first try.
    await answer(c, k2!, true);
    const m = (await c.get(`/v1/me/mastery?subjectId=${SUBJECT}`)).json() as { subjects: { chapters: { chapterId: string; level: string; evidence: ChapterEvidence }[] }[] };
    const ch = m.subjects[0]!.chapters.find((x) => x.chapterId === CH)!;
    expect(ch.evidence).toMatchObject({ lessonPartsCompleted: 1, practiceAttempted: 2, practiceSolved: 2, firstTryChecked: 2, firstTryCorrect: 1 });
    expect(ch.level).toBe(chapterMastery(ch.evidence).level);
    const statuses = (await c.get(`/v1/chapters/${CH}/practice?status=solved&limit=25`)).json();
    expect(statuses.items.map((i: { question: { id: string } }) => i.question.id).sort()).toEqual([k1!.key, k2!.key].sort());
  });
});

describe('IST window helpers', () => {
  it('windows start at 00:00 IST and count today', async () => {
    const { istDayStart, windowStart } = await import('../src/domain/insights/activity');
    expect(istDayStart('2026-11-03')).toBe('2026-11-02T18:30:00.000Z');
    expect(windowStart('2026-11-04', 1)).toBe('2026-11-04');
    expect(windowStart('2026-03-01', 2)).toBe('2026-02-28');
    expect(windowStart('2028-03-01', 2)).toBe('2028-02-29');
    expect(windowStart('2026-11-01', ACTIVITY.defaultDays)).toBe('2025-11-02');
  });
});
