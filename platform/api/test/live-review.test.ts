/**
 * S6-H01 (High, AC-11): a live-mock participant who submits early must not learn the answer keys,
 * solutions, marking schemes or per-item correctness while others are still writing. Until the event
 * closes (deadline cap + live grace) or its results are published, the result is score + provisional
 * rank only, and self-evaluation, AI evaluation (start, quote, view) answer 409 results_after_event.
 * Reproduces the reviewer's PoC-1: A submits blank at +2 min; B starts at +14 min and must not be
 * able to score from A's view.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { chapters, ingestTestDefinition, liveEvents, questionKeys, questionRow, questions, splitQuestion } from '@soyl/db';
import { Question } from '@soyl/shared/content/question';
import { TestDefinition } from '@soyl/shared/content/test';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import { createHarness, type Client, type Harness } from './helpers';
import { realReleases, seedRealContent } from './content-fixture';
import { forbiddenKeys } from './tests-fixture';
import { closesAt } from '../src/domain/tests/live';
import { liveReviewOpen } from '../src/domain/tests/live-review';
import { evaluationUnits } from '../src/ai/evaluation';
import { ApiProblem } from '../src/errors';

let h: Harness;
const MATHS = 'cbse-10-mathematics-ch01';
const YEAR = '2026-27';
const MIN = 60_000;
let n = 0;

async function member(): Promise<{ c: Client; id: string }> {
  const c = h.client();
  const r = await c.signInEmail(`review.${Date.now().toString(36)}${++n}@example.com`);
  return { c, id: r.user.id };
}

async function makeLive(tag: string, startsAt: number, count = 6, durationMin = 60) {
  const src = realReleases((u) => u === MATHS)[0]!.release.questions.filter((q) => q.type === 'mcq' && !q.children.length).slice(0, count);
  const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, MATHS));
  const ids: string[] = [];
  for (const [i, q] of src.entries()) {
    const copy = Question.parse({ ...q, id: `q_review_${tag}_${i}`, status: 'published', version: 1 });
    const [row] = await h.t.db.insert(questions).values(questionRow(copy, { chapterId: ch!.id, academicYear: YEAR, pool: 'live_reserved', embargoUntil: new Date(startsAt) })).returning();
    await h.t.db.insert(questionKeys).values({ questionId: row!.id, ...splitQuestion(copy).key });
    ids.push(copy.id);
  }
  const def = TestDefinition.parse({
    id: `t_cbse10math_live_rv${tag}`,
    kind: 'live',
    paper_type: 'board',
    blueprint_id: null,
    title: `Live review ${tag}`,
    subject_id: 'cbse-10-mathematics',
    chapter_ids: [MATHS],
    duration_min: durationMin,
    total_marks: count,
    shuffle: true,
    sections: [{ id: 'A', title: 'Section A', instructions: '', items: ids.map((id) => ({ question_id: id, question_version: 1, marks: 1, choice_group: null })), choice_groups: [] }],
  });
  const { testId } = await ingestTestDefinition(h.t.db, def, { academicYear: YEAR, status: 'published' });
  const [ev] = await h.t.db
    .insert(liveEvents)
    .values({ key: `live_cbse10math_rv${tag}`, academicYear: YEAR, testId, title: `Review ${tag}`, registrationOpensAt: new Date(startsAt - 86_400_000), startsAt: new Date(startsAt), lateStartMinutes: 15, endsAt: new Date(startsAt + durationMin * MIN) })
    .returning();
  return { testKey: def.id, eventId: ev!.id, ev: ev!, startsAt };
}

type ResultBody = {
  review: { status: string; opensAt: string | null };
  score: { total: number; max: number };
  live: { status: string; rank: number | null } | null;
  items: { key: { answer: unknown } | null; correct: boolean | null }[];
  sections: unknown[];
  topics: unknown[];
  byDifficulty: unknown[];
  sectionsLayout: unknown[];
};

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'granted' });
  await seedRealContent(h.t, (u) => u === MATHS);
});
afterAll(async () => {
  await h?.close();
});

describe('S6-H01 live review window', () => {
  it('a live result is score-only until the event closes; self/AI evaluation wait too; the full review opens after', async () => {
    const L = await makeLive('h01', h.clock.now() + 5 * MIN);
    const a = await member();
    const b = await member();

    // A starts at +1 min and submits a blank paper at +2 min (PoC-1).
    h.clock.set(L.startsAt + MIN);
    const sa = (await a.c.post(`/v1/tests/${L.testKey}/attempts`)).json() as { attempt: { id: string }; items: { itemId: string }[] };
    expect(sa.items).toHaveLength(6);
    h.clock.set(L.startsAt + 2 * MIN);
    expect((await a.c.post(`/v1/attempts/${sa.attempt.id}/submit`)).statusCode).toBe(200);

    const during = await a.c.get(`/v1/attempts/${sa.attempt.id}/result`);
    expect(during.statusCode).toBe(200);
    const d = during.json() as ResultBody;
    expect(d.review).toEqual({ status: 'after_event', opensAt: closesAt(L.ev).toISOString() });
    expect(d.score).toMatchObject({ total: 0, max: 6 });
    expect(d.live).toMatchObject({ status: 'provisional', rank: 1 });
    expect(d.items).toEqual([]);
    expect(d.sections).toEqual([]);
    expect(d.topics).toEqual([]);
    expect(d.byDifficulty).toEqual([]);
    expect(d.sectionsLayout).toEqual([]);
    // No answer, solution, marking scheme, rubric or correctness anywhere in the body.
    expect(forbiddenKeys(d)).toEqual([]);
    expect(during.body).not.toMatch(/option_ids|solution_md|marking_scheme/);

    // Self-evaluation and AI evaluation (start, quote, view) refuse while the event runs.
    const self = await a.c.post(`/v1/attempts/${sa.attempt.id}/self-evaluation`, { items: [{ itemId: sa.items[0]!.itemId, marks: 1 }] });
    expect(self.statusCode).toBe(409);
    expect(self.json()).toMatchObject({ code: 'results_after_event', opensAt: closesAt(L.ev).toISOString() });
    const aiStart = await a.c.post(`/v1/attempts/${sa.attempt.id}/ai-evaluation`, {});
    expect(aiStart.statusCode).toBe(409);
    expect(aiStart.json().code).toBe('results_after_event');
    const aiView = await a.c.get(`/v1/attempts/${sa.attempt.id}/ai-evaluation`);
    expect(aiView.statusCode).toBe(409);
    expect(aiView.json().code).toBe('results_after_event');
    const quote = await a.c.get(`/v1/ai/quote/evaluate-paper?attemptId=${sa.attempt.id}`);
    expect(quote.statusCode).toBe(409);
    expect(quote.json().code).toBe('results_after_event');
    // The job runner shares the same gate.
    await expect(evaluationUnits({ db: h.t.db, kv: h.kv, clock: h.clock, year: YEAR }, a.id, sa.attempt.id)).rejects.toSatisfy((e: unknown) => e instanceof ApiProblem && e.code === 'results_after_event');

    // B starts late (+14 min) and is still writing: A's view gave B nothing to copy.
    h.clock.set(L.startsAt + 14 * MIN);
    const sb = await b.c.post(`/v1/tests/${L.testKey}/attempts`);
    expect(sb.statusCode).toBe(201);
    expect(((await a.c.get(`/v1/attempts/${sa.attempt.id}/result`)).json() as ResultBody).items).toEqual([]);

    // Still closed one millisecond before closesAt (deadline cap + live grace), open from closesAt.
    const close = closesAt(L.ev).getTime();
    expect(close).toBe(L.startsAt + 75 * MIN + TEST_ENGINE.graceSeconds.live * 1000);
    h.clock.set(close - 1);
    expect(((await a.c.get(`/v1/attempts/${sa.attempt.id}/result`)).json() as ResultBody).review.status).toBe('after_event');
    h.clock.set(close);
    const after = (await a.c.get(`/v1/attempts/${sa.attempt.id}/result`)).json() as ResultBody;
    expect(after.review).toEqual({ status: 'open', opensAt: null });
    expect(after.items).toHaveLength(6);
    expect(after.items.every((i) => i.key !== null && i.correct === false)).toBe(true);
    expect(forbiddenKeys(after).length).toBeGreaterThan(0);
    expect((await a.c.get(`/v1/attempts/${sa.attempt.id}/ai-evaluation`)).statusCode).toBe(200);
    h.clock.set(Date.now());
  });

  it('opens early once results are published; ordinary attempts are always open', async () => {
    const L = await makeLive('pub', h.clock.now() + 5 * MIN, 3);
    expect(liveReviewOpen({ ...L.ev, status: 'scheduled' } as never, L.startsAt + 20 * MIN)).toBe(false);
    expect(liveReviewOpen({ ...L.ev, status: 'results_published' } as never, L.startsAt + 20 * MIN)).toBe(true);
    expect(liveReviewOpen({ ...L.ev, status: 'cancelled' } as never, L.startsAt + 20 * MIN)).toBe(false);
    expect(liveReviewOpen({ ...L.ev, status: 'cancelled' } as never, closesAt(L.ev).getTime())).toBe(true);

    const a = await member();
    h.clock.set(L.startsAt + MIN);
    const sa = (await a.c.post(`/v1/tests/${L.testKey}/attempts`)).json() as { attempt: { id: string } };
    await a.c.post(`/v1/attempts/${sa.attempt.id}/submit`);
    expect(((await a.c.get(`/v1/attempts/${sa.attempt.id}/result`)).json() as ResultBody).review.status).toBe('after_event');
    await h.t.db.update(liveEvents).set({ status: 'results_published', resultsPublishedAt: new Date(h.clock.now()) }).where(eq(liveEvents.id, L.eventId));
    const r = (await a.c.get(`/v1/attempts/${sa.attempt.id}/result`)).json() as ResultBody;
    expect(r.review.status).toBe('open');
    expect(r.items).toHaveLength(3);

    // A practice test (no live event) reviews immediately.
    const p = await a.c.post('/v1/tests/t_cbse10math_ch01_short/attempts');
    expect(p.statusCode).toBe(201);
    const id = (p.json() as { attempt: { id: string } }).attempt.id;
    expect((await a.c.post(`/v1/attempts/${id}/submit`)).statusCode).toBe(200);
    const plain = (await a.c.get(`/v1/attempts/${id}/result`)).json() as ResultBody;
    expect(plain.review).toEqual({ status: 'open', opensAt: null });
    expect(plain.items.length).toBeGreaterThan(0);
    h.clock.set(Date.now());
  });
});
