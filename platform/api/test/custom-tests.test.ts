/**
 * Custom test builder (POST /v1/tests/custom): assembled by the pipeline engine from the published
 * practice bank; never test-pool or live-reserved items (F-006, AC-11); filters; bank too small;
 * ownership (API-7); the built test runs through the normal attempt flow. Plus pure unit tests of
 * the engine helpers (scoring with choice groups, empty answers, delivery shuffle, allocation).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, inArray } from 'drizzle-orm';
import { chapters, questionKeys, questionRow, questions, splitQuestion, testItems, tests } from '@soyl/db';
import { Question } from '@soyl/shared/content/question';
import { createHarness, type Client, type Harness } from './helpers';
import { seedRealContent } from './content-fixture';
import { allocate } from '../src/domain/tests/custom';
import { aggregate, emptyResponse, gradeItem, isEmptyAnswer, itemCapacity, scoreBucket, type ItemOutcome } from '../src/domain/tests/score';
import { canShuffleOptions, deliverPaper, seededShuffle } from '../src/domain/tests/delivery';
import type { TestItemRow, TestStructure } from '../src/domain/tests/load';

let h: Harness;
const CH1 = 'cbse-10-mathematics-ch01';
const CH2 = 'cbse-10-mathematics-ch02';
let n = 0;

async function member(): Promise<{ c: Client; id: string }> {
  const c = h.client();
  const r = await c.signInEmail(`custom.${Date.now().toString(36)}${++n}@example.com`);
  return { c, id: r.user.id };
}

async function addPooled(chapterKey: string, id: string, pool: 'test' | 'live_reserved') {
  const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, chapterKey));
  const q = Question.parse({
    id,
    unit: chapterKey,
    type: 'mcq',
    stem_md: `Reserved ${pool} item`,
    options: [ { id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }, { id: 'c', text_md: 'C' } ],
    match_right: [],
    answer: { option_ids: ['a'] },
    solution_md: 'Because.',
    marking_scheme: [{ step: 'option', marks: 1 }],
    marks: 1,
    difficulty: 1,
    competency: 'recall',
    bloom: 'remember',
    topic_ids: [`${chapterKey}-t01`],
    expected_time_sec: 30,
    assets: [],
    language: 'en',
    children: [],
    status: 'published',
    version: 1,
  });
  const [row] = await h.t.db.insert(questions).values(questionRow(q, { chapterId: ch!.id, academicYear: '2026-27', pool, embargoUntil: pool === 'live_reserved' ? new Date(Date.now() - 1000) : null })).returning();
  await h.t.db.insert(questionKeys).values({ questionId: row!.id, ...splitQuestion(q).key });
}

async function poolsOf(testKey: string) {
  const [t] = await h.t.db.select({ id: tests.id }).from(tests).where(eq(tests.key, testKey));
  const rows = await h.t.db.select({ pool: questions.pool, type: questions.type, difficulty: questions.difficulty, unit: questions.unit }).from(testItems).innerJoin(questions, eq(questions.id, testItems.questionId)).where(eq(testItems.testId, t!.id));
  return rows;
}

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'granted' });
  await seedRealContent(h.t, (u) => [CH1, CH2].includes(u));
  // Many reserved one-mark MCQs: if the bank query let them in, they would be picked.
  for (let i = 0; i < 40; i++) {
    await addPooled(CH1, `q_reserved_test_${i}`, 'test');
    await addPooled(CH1, `q_reserved_live_${i}`, 'live_reserved');
  }
});
afterAll(async () => {
  await h?.close();
});

describe('POST /v1/tests/custom', () => {
  it('builds a paper of the requested size from practice items only, owned by the builder', async () => {
    const { c } = await member();
    const guest = await h.client().post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1], questionCount: 10 });
    expect(guest.statusCode).toBe(401);
    for (let i = 0; i < 5; i++) {
      const res = await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1, CH2], questionCount: 30, types: ['mcq', 'short', 'assertion-reason'] });
      expect(res.statusCode).toBe(201);
      const t = res.json() as { id: string; custom: boolean; kind: string; questionCount: number; totalMarks: number; durationMin: number; skippedChapters: string[] };
      expect(t).toMatchObject({ custom: true, kind: 'custom', questionCount: 30, skippedChapters: [] });
      expect(t.id).toMatch(/^t_custom_[0-9a-f]{32}$/);
      const rows = await poolsOf(t.id);
      expect(rows).toHaveLength(30);
      expect(rows.every((r) => r.pool === 'practice')).toBe(true);
      expect(rows.every((r) => ['mcq', 'short', 'assertion-reason', 'numerical'].includes(r.type))).toBe(true);
    }
    const [any] = await h.t.db.select({ seed: tests.seed }).from(tests).where(eq(tests.kind, 'custom')).limit(1);
    expect(any!.seed).toMatch(/^custom:[0-9a-f-]+:[0-9a-f]{16}:\d+$/);
  });

  it('respects the difficulty range and skips chapters without matches', async () => {
    const { c } = await member();
    const res = await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1, CH2], questionCount: 5, difficulty: { min: 1, max: 2 }, durationMin: 15, title: 'Warm-up' });
    expect(res.statusCode).toBe(201);
    const t = res.json() as { id: string; title: string; durationMin: number };
    expect(t).toMatchObject({ title: 'Warm-up', durationMin: 15 });
    expect((await poolsOf(t.id)).every((r) => r.difficulty <= 2)).toBe(true);
  });

  it('refuses impossible requests clearly', async () => {
    const { c } = await member();
    const tooMany = await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1], questionCount: 60, types: ['ordering'] });
    expect(tooMany.statusCode).toBe(422);
    expect(tooMany.json().code).toBe('bank_too_small');
    const foreign = await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: ['cbse-10-science-ch01'], questionCount: 5 });
    expect(foreign.statusCode).toBe(400);
    expect((await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1], questionCount: 4 })).statusCode).toBe(400);
    expect((await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1], questionCount: 5, difficulty: { min: 4, max: 2 } })).statusCode).toBe(400);
    expect((await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1], questionCount: 5, createdByUserId: 'x' })).statusCode).toBe(400);
  });

  it('only the builder can see or take it; it runs through the normal attempt flow and never lists in the series', async () => {
    const owner = await member();
    const t = (await owner.c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1], questionCount: 6, types: ['mcq'] })).json() as { id: string };
    const other = await member();
    expect((await other.c.get(`/v1/tests/${t.id}`)).statusCode).toBe(404);
    expect((await h.client().get(`/v1/tests/${t.id}`)).statusCode).toBe(404);
    expect((await other.c.post(`/v1/tests/${t.id}/attempts`)).statusCode).toBe(404);
    const s = (await owner.c.post(`/v1/tests/${t.id}/attempts`)).json() as { attempt: { id: string }; items: unknown[] };
    expect(s.items).toHaveLength(6);
    const sub = (await owner.c.post(`/v1/attempts/${s.attempt.id}/submit`)).json() as { status: string };
    expect(sub.status).toBe('submitted');
    const series = await owner.c.get('/v1/test-series?subject=cbse-10-mathematics');
    expect(series.body).not.toContain(t.id);
  });

  it('the custom-build rate limit applies', async () => {
    const { c } = await member();
    const codes: number[] = [];
    for (let i = 0; i < 21; i++) codes.push((await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [CH1], questionCount: 5, types: ['mcq'] })).statusCode);
    expect(codes.slice(0, 20).every((x) => x === 201)).toBe(true);
    expect(codes[20]).toBe(429);
  });
});

/* ---------------------------------------------------------------------------------------------- */
/* Pure helpers                                                                                    */
/* ---------------------------------------------------------------------------------------------- */

function item(id: string, over: Partial<TestItemRow> & { type?: string; qmarks?: number; children?: unknown[] } = {}): TestItemRow {
  return {
    itemId: id,
    sectionId: over.sectionId ?? 'A',
    position: 1,
    marks: over.marks ?? 1,
    choiceGroup: over.choiceGroup ?? null,
    question: { id: `row-${id}`, key: `q_${id}`, version: 1, type: (over.type ?? 'mcq') as never, marks: over.qmarks ?? over.marks ?? 1, difficulty: 2, expectedTimeSec: 60, topicKeys: ['t1'], body: { stem_md: 's', options: [ { id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }, { id: 'c', text_md: 'C' } ], match_right: [], assets: [], children: over.children ?? [] }, pool: 'practice', embargoUntil: null },
  };
}

function structure(items: TestItemRow[], groups: { section: string; id: string; attempt: number }[] = [], shuffle = false): TestStructure {
  const sections = [...new Set(items.map((i) => i.sectionId))].map((s) => ({ id: s, title: s, instructions: '', choiceGroups: groups.filter((g) => g.section === s).map((g) => ({ id: g.id, attempt: g.attempt, of: items.filter((i) => i.choiceGroup === g.id).length })) }));
  return { test: { shuffle } as never, items, sections, byItemId: new Map(items.map((i) => [i.itemId, i])) };
}

const out = (id: string, auto: number, autoMax: number, self: number | null = null, selfMax = 0, answered = true): ItemOutcome => ({ itemId: id, answered, autoMarks: auto, autoMax, selfMax, selfMarks: self, correct: null, grade: null, unreadable: false });

describe('scoring', () => {
  it('best k of a choice group count, separately for total and auto score', () => {
    const items = [item('a', { marks: 2 }), item('g1', { marks: 3, choiceGroup: 'G', type: 'short' }), item('g2', { marks: 3, choiceGroup: 'G', type: 'short' }), item('g3', { marks: 3, choiceGroup: 'G', type: 'short' })];
    const s = structure(items, [{ section: 'A', id: 'G', attempt: 2 }]);
    const agg = aggregate(s, new Map([
      ['a', out('a', 2, 2)],
      ['g1', out('g1', 0, 0, 1, 3)],
      ['g2', out('g2', 0, 0, 3, 3)],
      ['g3', out('g3', 0, 0, null, 3)],
    ]));
    expect(agg).toMatchObject({ score: 6, autoScore: 2, selfScore: 4, maxScore: 8, answeredSlots: 3, totalSlots: 3, pendingSelfItems: 1, pendingSelfMarks: 3 });
    expect([...agg.counted].sort()).toEqual(['a', 'g1', 'g2']);
  });

  it('empty answers, capacities and buckets', () => {
    expect(isEmptyAnswer(null)).toBe(true);
    expect(isEmptyAnswer({ text: '   ' })).toBe(true);
    expect(isEmptyAnswer({ option_ids: [] })).toBe(true);
    expect(isEmptyAnswer({ blanks: ['', ' '] })).toBe(true);
    expect(isEmptyAnswer({ value: 0 })).toBe(false);
    expect(isEmptyAnswer({ parts: [{ id: 'x', response: { text: '' } }] })).toBe(true);
    expect(isEmptyAnswer({ parts: [{ id: 'x', response: { option_ids: ['a'] } }] })).toBe(false);
    expect(isEmptyAnswer({ pairs: [] })).toBe(true);
    expect(isEmptyAnswer({ order: ['a'] })).toBe(false);
    expect(isEmptyAnswer({ output: '' })).toBe(true);
    expect(isEmptyAnswer({ other: 1 })).toBe(true);
    expect(itemCapacity(item('x', { marks: 4, type: 'case-based', children: [{ id: 'p1', type: 'mcq', marks: 1 }, { id: 'p2', type: 'short', marks: 3 }] }))).toEqual({ autoMax: 1, selfMax: 3 });
    expect(itemCapacity(item('y', { marks: 5, type: 'long' }))).toEqual({ autoMax: 0, selfMax: 5 });
    expect(scoreBucket(12.5)).toBe(25);
    expect(scoreBucket(-1)).toBe(0);
    for (const t of ['mcq', 'numerical', 'fill-blank', 'match', 'ordering', 'code-output', 'case-based', 'long'] as const) expect(emptyResponse(t, {})).toBeDefined();
  });

  it('an unreadable stored response scores 0 instead of failing the submit; a missing key grades as unanswered', () => {
    const it1 = item('m');
    const key = { answer: { option_ids: ['a'] }, solutionMd: 's', markingScheme: [{ step: 'x', marks: 1 }], childKeys: [], rubric: null };
    expect(gradeItem(it1, key, { text: 'oops' })).toMatchObject({ answered: true, unreadable: true, autoMarks: 0, correct: false });
    expect(gradeItem(it1, key, { option_ids: ['a'] })).toMatchObject({ answered: true, autoMarks: 1, correct: true });
    expect(gradeItem(it1, undefined, { option_ids: ['a'] })).toMatchObject({ answered: false, autoMarks: 0 });
    // Item marks scale question marks (a 1-mark question placed as 2 marks).
    expect(gradeItem(item('s', { marks: 2, qmarks: 1 }), key, { option_ids: ['a'] })).toMatchObject({ autoMarks: 2, autoMax: 2 });
  });
});

describe('delivery', () => {
  it('keeps the paper order without shuffle; per-attempt deterministic shuffle keeps choice groups together', () => {
    const items = ['1', '2', '3', '4', '5', '6'].map((x, i) => item(x, { choiceGroup: i >= 4 ? 'G' : null }));
    const plain = deliverPaper(structure(items, [{ section: 'A', id: 'G', attempt: 1 }]), 'seed');
    expect(plain.items.map((i) => i.itemId)).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(plain.items.map((i) => i.number)).toEqual([1, 2, 3, 4, 5, 5]);
    const s = structure(items, [{ section: 'A', id: 'G', attempt: 1 }], true);
    const a = deliverPaper(s, 'seed-a');
    expect(deliverPaper(s, 'seed-a').items.map((i) => i.itemId)).toEqual(a.items.map((i) => i.itemId));
    const ids = a.items.map((i) => i.itemId);
    expect(Math.abs(ids.indexOf('5') - ids.indexOf('6'))).toBe(1);
    const orders = new Set(['s1', 's2', 's3', 's4', 's5', 's6'].map((x) => deliverPaper(s, x).items.map((i) => i.itemId).join()));
    expect(orders.size).toBeGreaterThan(1);
    expect(seededShuffle([1, 2, 3, 4, 5], 'x')).toEqual(seededShuffle([1, 2, 3, 4, 5], 'x'));
  });

  it('never shuffles options that refer to other options', () => {
    const q = (texts: string[], type = 'mcq') => ({ type, options: texts.map((t, i) => ({ id: String(i), text_md: t })) }) as never;
    expect(canShuffleOptions(q(['2', '3', '5', '7']))).toBe(true);
    expect(canShuffleOptions(q(['2', '3', 'All of the above', '7']))).toBe(false);
    expect(canShuffleOptions(q(['x', 'y', 'Both (a) and (b)', 'z']))).toBe(false);
    expect(canShuffleOptions(q(['क', 'ख', 'उपर्युक्त सभी', 'घ']))).toBe(false);
    expect(canShuffleOptions(q(['a', 'b', 'c', 'd'], 'assertion-reason'))).toBe(false);
    expect(canShuffleOptions(q(['a', 'b']))).toBe(false);
  });
});

describe('allocation', () => {
  it('splits by size with largest remainders, never over a group size', () => {
    expect(allocate([10, 10, 10], 6)).toEqual([2, 2, 2]);
    expect(allocate([50, 30, 20], 10)).toEqual([5, 3, 2]);
    expect(allocate([1, 100], 10)).toEqual([0, 10]);
    expect(allocate([3, 3, 3], 9)).toEqual([3, 3, 3]);
    expect(() => allocate([1, 1], 3)).toThrow();
    const r = allocate([7, 5, 1, 13], 11);
    expect(r.reduce((a, b) => a + b, 0)).toBe(11);
  });
});

describe('guard: reserved pools exist in the fixture', () => {
  it('has test and live items the builder must skip', async () => {
    const rows = await h.t.db.select({ pool: questions.pool }).from(questions).where(inArray(questions.pool, ['test', 'live_reserved']));
    expect(rows.length).toBe(80);
  });
});
