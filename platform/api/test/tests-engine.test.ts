/**
 * Test engine on real content (CBSE 10 Maths ch01 + Science ch02 chapter tests, with choice groups and
 * case items): catalogue, metadata, attempt lifecycle created → in_progress → submitted |
 * auto_submitted, autosave sequence semantics (retries, out of order, two tabs), F-007 deadline +
 * grace, double submit, grading with best-of choice groups, results with keys revealed only after
 * submission (API-9 contract scan), self-evaluation, percentile, XP/badges, auto-submit (worker
 * function and lazy), IDOR (API-7), limits (API-5, rate limits).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq, sql } from 'drizzle-orm';
import { attempts, evaluations, responses, testScoreBuckets, tests, userBadges, xpEvents } from '@soyl/db';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import { XP_AWARDS } from '@soyl/shared/config/gamification';
import { createHarness, type Client, type Harness } from './helpers';
import { seedRealContent } from './content-fixture';
import { forbiddenKeys, isObjective, itemKeys, responseFor, type ItemKey } from './tests-fixture';
import { autoSubmitExpired, finalizeAttempt } from '../src/domain/tests/finalize';
import { createDb } from '@soyl/db';
import { percentileFor } from '../src/domain/tests/results';

let h: Harness;
const SHORT = 't_cbse10math_ch01_short';
const LONG = 't_cbse10math_ch01_long';
let n = 0;
const email = () => `engine.${Date.now().toString(36)}${++n}@example.com`;

async function member(): Promise<{ c: Client; id: string }> {
  const c = h.client();
  const r = await c.signInEmail(email());
  return { c, id: r.user.id };
}

type State = {
  attempt: { id: string; status: string; deadlineAt: string | null; startedAt: string | null; serverNow: string; remainingSec: number | null; graceSeconds: number; tabSwitchCount: number };
  items: { itemId: string; number: number; question: { type: string } }[];
  sections: { id: string; itemIds: string[]; choiceGroups: { id: string; itemIds: string[] }[] }[];
  responses: { itemId: string; response: unknown; seq: number; timeSpentSec: number; markedForReview: boolean }[];
};

async function start(c: Client, testKey = SHORT, body?: unknown) {
  const res = await c.post(`/v1/tests/${testKey}/attempts`, body);
  if (res.statusCode !== 201 && res.statusCode !== 200) throw new Error(`start ${res.statusCode} ${res.body}`);
  return res.json() as State;
}

const save = (c: Client, attemptId: string, items: unknown[], extra: Record<string, unknown> = {}) => c.request('PUT', `/v1/attempts/${attemptId}/responses`, { body: { items, ...extra } });

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'granted' });
  await seedRealContent(h.t, (u) => ['cbse-10-mathematics-ch01', 'cbse-10-science-ch02'].includes(u));
});
afterAll(async () => {
  await h?.close();
});

describe('catalogue', () => {
  it('lists a subject’s series (guest: cacheable, no personal data; member: status per test)', async () => {
    const guest = h.client();
    const res = await guest.get('/v1/test-series?board=cbse&class=10&subject=mathematics');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toContain('public');
    const body = res.json() as { subject: { id: string }; series: { id: string; kind: string; tests: { id: string; me: unknown; chapter: { number: number } | null; questionCount: number }[] }[] };
    expect(body.subject.id).toBe('cbse-10-mathematics');
    const chapter = body.series.find((s) => s.kind === 'chapter')!;
    expect(chapter.tests.map((t) => t.id)).toEqual(expect.arrayContaining([SHORT, LONG]));
    expect(chapter.tests.every((t) => t.me === null && t.chapter?.number === 1 && t.questionCount > 0)).toBe(true);
    const again = await guest.get('/v1/test-series?board=cbse&class=10&subject=mathematics', { headers: { 'if-none-match': String(res.headers.etag) } });
    expect(again.statusCode).toBe(304);

    const { c } = await member();
    const mine = await c.get('/v1/test-series?subject=cbse-10-mathematics');
    expect(mine.statusCode).toBe(200);
    expect(mine.headers['cache-control']).toBe('no-store');
    const t = (mine.json() as typeof body).series.find((s) => s.kind === 'chapter')!.tests.find((x) => x.id === SHORT)!;
    expect(t.me).toEqual({ attempts: 0, bestScore: null, lastScore: null, maxScore: null, activeAttemptId: null, lastAttemptId: null });
  });

  it('rejects unknown subjects and bad queries', async () => {
    const c = h.client();
    expect((await c.get('/v1/test-series?subject=astrology')).statusCode).toBe(404);
    expect((await c.get('/v1/test-series')).statusCode).toBe(400);
    expect((await c.get('/v1/test-series?subject=x;drop')).statusCode).toBe(400);
  });

  it('GET /v1/tests/:id is metadata only — no questions, no keys', async () => {
    const res = await h.client().get(`/v1/tests/${SHORT}`);
    expect(res.statusCode).toBe(200);
    const meta = res.json() as { questionCount: number; totalMarks: number; durationMin: number; sections: { id: string; maxMarks: number; choiceGroups: unknown[] }[] };
    expect(meta).toMatchObject({ totalMarks: 20, durationMin: 40, questionCount: 10 });
    expect(meta.sections.map((s) => s.id)).toEqual(['A', 'B', 'C', 'D']);
    expect(meta.sections.find((s) => s.id === 'C')).toMatchObject({ maxMarks: 5, choiceGroups: [{ id: 'C1', attempt: 1, of: 2 }] });
    expect(res.body).not.toMatch(/stem_md|"question"/);
    expect(forbiddenKeys(res.json())).toEqual([]);
    expect((await h.client().get('/v1/tests/t_nope_ch01')).statusCode).toBe(404);
  });
});

describe('attempt lifecycle', () => {
  it('guests must sign in', async () => {
    expect((await h.client().post(`/v1/tests/${SHORT}/attempts`)).statusCode).toBe(401);
  });

  it('created → in_progress: start:false waits without a clock and without questions; starting sets the deadline', async () => {
    const { c } = await member();
    const created = await c.post(`/v1/tests/${SHORT}/attempts`, { start: false });
    expect(created.statusCode).toBe(201);
    const s0 = created.json() as State;
    expect(s0.attempt).toMatchObject({ status: 'created', startedAt: null, deadlineAt: null });
    expect(s0.items).toEqual([]);
    // Saving or submitting before the start is refused.
    expect((await save(c, s0.attempt.id, [])).statusCode).toBe(409);
    expect((await c.post(`/v1/attempts/${s0.attempt.id}/submit`)).statusCode).toBe(409);

    const started = await c.post(`/v1/tests/${SHORT}/attempts`);
    expect(started.statusCode).toBe(200);
    const s1 = started.json() as State;
    expect(s1.attempt.id).toBe(s0.attempt.id);
    expect(s1.attempt.status).toBe('in_progress');
    expect(Date.parse(s1.attempt.deadlineAt!) - Date.parse(s1.attempt.startedAt!)).toBe(40 * 60_000);
    expect(s1.attempt.remainingSec).toBe(40 * 60);
    expect(s1.attempt.graceSeconds).toBe(TEST_ENGINE.graceSeconds.normal);
    expect(s1.items).toHaveLength(10);
    // Choice-group members share a number; numbers run 1..9 for 10 items.
    expect(new Set(s1.items.map((i) => i.number)).size).toBe(9);
    // API-9: before submission the paper carries no answers, solutions, schemes, rubrics or correctness.
    expect(forbiddenKeys(s1)).toEqual([]);
    // Resuming returns the same attempt (no second attempt, AC-12).
    const again = await start(c);
    expect(again.attempt.id).toBe(s0.attempt.id);
    const get = await c.get(`/v1/attempts/${s0.attempt.id}`);
    expect(get.statusCode).toBe(200);
    expect(forbiddenKeys(get.json())).toEqual([]);
  });

  it('two tabs starting at once get one attempt (DB-2)', async () => {
    const { c, id } = await member();
    const [a, b] = await Promise.all([c.post(`/v1/tests/${LONG}/attempts`), c.post(`/v1/tests/${LONG}/attempts`)]);
    expect([a.statusCode, b.statusCode].sort()).toEqual([200, 201]);
    expect((a.json() as State).attempt.id).toBe((b.json() as State).attempt.id);
    const rows = await h.t.db.select().from(attempts).where(eq(attempts.userId, id));
    expect(rows).toHaveLength(1);
  });

  it('IDOR: another student gets 404 on every attempt route (API-7)', async () => {
    const owner = await member();
    const s = await start(owner.c);
    const other = await member();
    const id = s.attempt.id;
    expect((await other.c.get(`/v1/attempts/${id}`)).statusCode).toBe(404);
    expect((await save(other.c, id, [])).statusCode).toBe(404);
    expect((await other.c.post(`/v1/attempts/${id}/submit`)).statusCode).toBe(404);
    await owner.c.post(`/v1/attempts/${id}/submit`);
    expect((await other.c.get(`/v1/attempts/${id}/result`)).statusCode).toBe(404);
    expect((await other.c.post(`/v1/attempts/${id}/self-evaluation`, { items: [{ itemId: s.items[0]!.itemId, marks: 1 }] })).statusCode).toBe(404);
    expect((await other.c.post(`/v1/attempts/${id}/ai-evaluation`)).statusCode).toBe(404);
    expect((await owner.c.get(`/v1/attempts/${id}/result`)).statusCode).toBe(200);
  });
});

describe('autosave', () => {
  let keys: ItemKey[];
  beforeAll(async () => {
    keys = await itemKeys(h.t, SHORT);
  });
  const mcq = () => keys.find((k) => k.type === 'mcq')!;

  it('applies higher sequences only: retries and out-of-order batches never regress an answer', async () => {
    const { c } = await member();
    const s = await start(c);
    const k = mcq();
    const opt = (id: string) => ({ option_ids: [id] });
    const r1 = await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 10, response: opt('a'), timeSpentSec: 5 }]);
    expect(r1.statusCode).toBe(200);
    expect(r1.json()).toMatchObject({ applied: [{ itemId: k.itemId, seq: 10 }], stale: [], rejected: [] });
    // Retry of the same batch: stale.
    expect((await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 10, response: opt('a'), timeSpentSec: 5 }])).json()).toMatchObject({ applied: [], stale: [{ itemId: k.itemId, seq: 10, storedSeq: 10 }] });
    // Newer change, then an older batch arriving late.
    await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 30, response: opt('c'), timeSpentSec: 20 }]);
    const late = await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 20, response: opt('b'), timeSpentSec: 12 }]);
    expect(late.json()).toMatchObject({ applied: [], stale: [{ seq: 20, storedSeq: 30 }] });
    // In one batch, the highest sequence per item wins.
    await save(c, s.attempt.id, [
      { itemId: k.itemId, seq: 41, response: opt('d'), timeSpentSec: 25 },
      { itemId: k.itemId, seq: 40, response: opt('a'), timeSpentSec: 24 },
    ]);
    const state = (await c.get(`/v1/attempts/${s.attempt.id}`)).json() as State;
    expect(state.responses).toEqual([expect.objectContaining({ itemId: k.itemId, response: opt('d'), seq: 41, timeSpentSec: 25 })]);
    // Clearing an answer is a newer state too.
    await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 50, response: null, markedForReview: true }]);
    const cleared = (await c.get(`/v1/attempts/${s.attempt.id}`)).json() as State;
    expect(cleared.responses[0]).toMatchObject({ response: null, markedForReview: true, seq: 50, timeSpentSec: 25 });
  });

  it('two tabs saving concurrently converge on the highest sequence per item', async () => {
    const { c } = await member();
    const s = await start(c);
    const objective = keys.filter((k) => k.type === 'mcq').slice(0, 3);
    const tabA = Array.from({ length: 6 }, (_, i) => save(c, s.attempt.id, objective.map((k) => ({ itemId: k.itemId, seq: 100 + 2 * i, response: { option_ids: [`a${i}`] } }))));
    const tabB = Array.from({ length: 6 }, (_, i) => save(c, s.attempt.id, objective.map((k) => ({ itemId: k.itemId, seq: 101 + 2 * i, response: { option_ids: [`b${i}`] } }))));
    const all = await Promise.all([...tabA, ...tabB]);
    expect(all.every((r) => r.statusCode === 200 || r.statusCode === 429)).toBe(true);
    const ok = all.filter((r) => r.statusCode === 200).map((r) => r.json() as { applied: { seq: number }[] });
    const maxApplied = Math.max(...ok.flatMap((r) => r.applied.map((a) => a.seq)));
    const rows = await h.t.db.select().from(responses).where(eq(responses.attemptId, s.attempt.id));
    expect(rows).toHaveLength(3);
    for (const r of rows) expect(Number(r.clientSeq)).toBe(maxApplied);
  });

  it('validates items and shapes; records tab switches upward only', async () => {
    const { c } = await member();
    const s = await start(c);
    const k = mcq();
    const bad = await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 1, response: { value: 3 } }]);
    expect(bad.statusCode).toBe(400);
    expect(bad.json().errors[0].path).toBe('body.items.0.response');
    expect((await save(c, s.attempt.id, [{ itemId: '01890000-0000-7000-8000-000000000000', seq: 1, response: null }])).statusCode).toBe(400);
    expect((await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 0, response: null }])).statusCode).toBe(400);
    expect((await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 1, response: null, score: 5 }])).statusCode).toBe(400); // API-8
    await save(c, s.attempt.id, [], { tabSwitchCount: 4 });
    await save(c, s.attempt.id, [], { tabSwitchCount: 2 });
    const st = (await c.get(`/v1/attempts/${s.attempt.id}`)).json() as State;
    expect(st.attempt.tabSwitchCount).toBe(4);
  });

  it('API-5: bodies over 256 KB are refused; the per-attempt autosave limit applies', async () => {
    const { c } = await member();
    const s = await start(c);
    const k = keys.find((x) => x.type === 'short')!;
    const huge = await save(c, s.attempt.id, [{ itemId: k.itemId, seq: 1, response: { text: 'x'.repeat(5000) } }], { pad: 'y'.repeat(270 * 1024) });
    expect(huge.statusCode).toBe(413);
    const results = [];
    for (let i = 0; i < 9; i++) results.push((await save(c, s.attempt.id, [])).statusCode);
    expect(results.slice(0, 8).every((x) => x === 200)).toBe(true);
    expect(results[8]).toBe(429);
    h.clock.advance(16_000);
    expect((await save(c, s.attempt.id, [])).statusCode).toBe(200);
  });

  it('F-007: after the deadline only changes claimed before it are accepted, and only within the grace', async () => {
    const { c } = await member();
    const s = await start(c);
    const [k1, k2, k3] = keys.filter((k) => k.type === 'mcq');
    const deadline = Date.parse(s.attempt.deadlineAt!);
    h.clock.set(deadline + 60_000); // inside the 120 s grace
    const r = await save(c, s.attempt.id, [
      { itemId: k1!.itemId, seq: 1, response: { option_ids: ['a'] }, changedAt: new Date(deadline - 5000).toISOString() },
      { itemId: k2!.itemId, seq: 1, response: { option_ids: ['a'] }, changedAt: new Date(deadline + 1000).toISOString() },
      { itemId: k3!.itemId, seq: 1, response: { option_ids: ['a'] } },
    ]);
    expect(r.statusCode).toBe(200);
    const body = r.json() as { applied: { itemId: string }[]; rejected: { itemId: string; reason: string }[] };
    expect(body.applied.map((a) => a.itemId)).toEqual([k1!.itemId]);
    expect(body.rejected.map((x) => x.itemId).sort()).toEqual([k2!.itemId, k3!.itemId].sort());
    expect(body.rejected.every((x) => x.reason === 'after_deadline')).toBe(true);
    // Exactly at deadline + grace it is still accepted; one millisecond later the attempt is closed and auto-submitted.
    h.clock.set(deadline + TEST_ENGINE.graceSeconds.normal * 1000);
    expect((await save(c, s.attempt.id, [{ itemId: k2!.itemId, seq: 2, response: { option_ids: ['b'] }, changedAt: new Date(deadline).toISOString() }])).statusCode).toBe(200);
    h.clock.set(deadline + TEST_ENGINE.graceSeconds.normal * 1000 + 1);
    const closed = await save(c, s.attempt.id, [{ itemId: k3!.itemId, seq: 2, response: { option_ids: ['b'] }, changedAt: new Date(deadline - 1).toISOString() }]);
    expect(closed.statusCode).toBe(409);
    expect(closed.json().code).toBe('attempt_closed');
    const [row] = await h.t.db.select().from(attempts).where(eq(attempts.id, s.attempt.id));
    expect(row!.status).toBe('auto_submitted');
    expect(row!.submittedAt!.getTime()).toBe(deadline);
    h.clock.set(Date.now());
  });
});

describe('submit, grading and results', () => {
  let keys: ItemKey[];
  beforeAll(async () => {
    keys = await itemKeys(h.t, SHORT);
  });

  it('grades objective parts, leaves written parts for self-evaluation, best-of choice groups, idempotent double submit', async () => {
    const { c, id } = await member();
    const s = await start(c);
    const group = keys.filter((k) => k.choiceGroup === 'C1');
    expect(group).toHaveLength(2);
    // Everything right; both long answers in the choice group are written answers.
    const items = keys.map((k) => ({ itemId: k.itemId, seq: 1, response: responseFor(k, true), timeSpentSec: 30 }));
    expect((await save(c, s.attempt.id, items)).statusCode).toBe(200);
    // Two submits at once: one grades, the other gets the same result (FOR UPDATE).
    const [a, b] = await Promise.all([c.post(`/v1/attempts/${s.attempt.id}/submit`), c.post(`/v1/attempts/${s.attempt.id}/submit`)]);
    expect([a.statusCode, b.statusCode]).toEqual([200, 200]);
    const ra = a.json() as { score: number; autoScore: number; maxScore: number; alreadySubmitted: boolean; status: string; pendingSelfEvaluation: { items: number; marks: number }; xpAwarded: number; badgesAwarded: string[] };
    const rb = b.json() as typeof ra;
    expect([ra.alreadySubmitted, rb.alreadySubmitted].sort()).toEqual([false, true]);
    const first = ra.alreadySubmitted ? rb : ra;
    expect(first.status).toBe('submitted');
    // Auto marks: 4 one-mark objective items + case parts (mcq 1 + numerical 1) = 6; written parts wait.
    expect(first).toMatchObject({ autoScore: 6, score: 6, maxScore: 20 });
    expect(first.pendingSelfEvaluation.items).toBeGreaterThanOrEqual(5);
    expect(first.xpAwarded).toBe(XP_AWARDS.testSubmitted);
    expect(first.badgesAwarded).toContain('first-test');
    const evals = await h.t.db.select({ n: sql<number>`count(*)::int` }).from(evaluations).innerJoin(responses, eq(responses.id, evaluations.responseId)).where(eq(responses.attemptId, s.attempt.id));
    expect(evals[0]!.n).toBe(5); // 4 objective items + 1 case item with an auto part; no duplicates
    // Saving after submission is refused.
    const after = await save(c, s.attempt.id, [{ itemId: keys[0]!.itemId, seq: 99, response: null }]);
    expect(after.statusCode).toBe(409);
    expect(after.json().code).toBe('attempt_closed');
    // XP is per test, once.
    const xp = await h.t.db.select().from(xpEvents).where(and(eq(xpEvents.userId, id), eq(xpEvents.sourceType, 'test')));
    expect(xp).toHaveLength(1);
  });

  it('result reveals keys only after submission; self-evaluation within maxima updates the total, not the auto score', async () => {
    const { c } = await member();
    const s = await start(c);
    const notYet = await c.get(`/v1/attempts/${s.attempt.id}/result`);
    expect(notYet.statusCode).toBe(409);
    const right = keys.filter((k) => k.choiceGroup !== 'C1' || k === keys.find((x) => x.choiceGroup === 'C1'));
    await save(c, s.attempt.id, right.map((k) => ({ itemId: k.itemId, seq: 1, response: responseFor(k, k.type !== 'assertion-reason'), timeSpentSec: 40 })));
    await c.post(`/v1/attempts/${s.attempt.id}/submit`);
    const res = await c.get(`/v1/attempts/${s.attempt.id}/result`);
    expect(res.statusCode).toBe(200);
    const r = res.json() as {
      score: { total: number; auto: number; self: number; max: number; pendingSelfEvaluation: { items: number } };
      sections: { id: string; score: number; maxScore: number }[];
      byDifficulty: { accuracy: number | null }[];
      topics: { id: string; mastery: number | null }[];
      percentile: { value: number | null; attempts: number; minAttempts: number };
      items: { itemId: string; status: string; key: { solution_md: string; marking_scheme: unknown[] } | null; counted: boolean; selfMax: number; parts: { id: string; grading: string; maxMarks: number }[] }[];
    };
    expect(r.score).toMatchObject({ auto: 5, total: 5, max: 20 });
    expect(r.items.every((i) => i.key && i.key.solution_md.length > 0)).toBe(true);
    expect(r.items.find((i) => i.itemId === keys.find((k) => k.type === 'assertion-reason')!.itemId)!.status).toBe('wrong');
    expect(r.sections.map((x) => x.maxScore)).toEqual([4, 7, 5, 4]);
    expect(r.byDifficulty.length).toBeGreaterThan(0);
    expect(r.topics.length).toBeGreaterThan(0);
    expect(r.percentile).toEqual({ value: null, attempts: expect.any(Number), minAttempts: 50 });
    // The unanswered choice-group member does not count; the answered one does.
    const [g1, g2] = keys.filter((k) => k.choiceGroup === 'C1');
    expect(r.items.find((i) => i.itemId === g1!.itemId)!.counted).toBe(true);
    expect(r.items.find((i) => i.itemId === g2!.itemId)!).toMatchObject({ status: 'unanswered' });

    // Self-evaluation: total marks, per-step marks and case parts.
    const shortItem = keys.find((k) => k.type === 'short' && k.markingScheme.length > 1)!;
    const caseItem = keys.find((k) => k.type === 'case-based')!;
    const casePart = r.items.find((i) => i.itemId === caseItem.itemId)!.parts.find((p) => p.grading === 'self')!;
    const tooMuch = await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, { items: [{ itemId: g1!.itemId, marks: 5.5 }] });
    expect(tooMuch.statusCode).toBe(400);
    const stepTooMuch = await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, { items: [{ itemId: shortItem.itemId, steps: shortItem.markingScheme.map((st) => st.marks + 1) }] });
    expect(stepTooMuch.statusCode).toBe(400);
    const both = await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, { items: [{ itemId: shortItem.itemId, marks: 1, steps: [1] }] });
    expect(both.statusCode).toBe(400);
    const unanswered = await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, { items: [{ itemId: g2!.itemId, marks: 1 }] });
    expect(unanswered.statusCode).toBe(409);
    const objective = await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, { items: [{ itemId: keys.find((k) => k.type === 'mcq')!.itemId, marks: 1 }] });
    expect(objective.statusCode).toBe(409);
    const ok = await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, {
      items: [
        { itemId: g1!.itemId, marks: 4.5 },
        { itemId: shortItem.itemId, steps: shortItem.markingScheme.map((st) => st.marks) },
        { itemId: caseItem.itemId, parts: [{ id: casePart.id, marks: casePart.maxMarks }] },
      ],
    });
    expect(ok.statusCode).toBe(200);
    const after = ok.json() as typeof r;
    const stepTotal = shortItem.markingScheme.reduce((n, st) => n + st.marks, 0);
    expect(after.score.auto).toBe(5);
    expect(after.score.total).toBe(5 + 4.5 + stepTotal + casePart.maxMarks);
    expect(after.items.find((i) => i.itemId === g1!.itemId)!.status).toBe('evaluated');
    const [row] = await h.t.db.select().from(attempts).where(eq(attempts.id, s.attempt.id));
    expect(Number(row!.autoScore)).toBe(5);
    expect(Number(row!.score)).toBe(after.score.total);
    // Re-evaluating replaces the earlier marks.
    const again = (await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, { items: [{ itemId: g1!.itemId, marks: 2 }] })).json() as typeof r;
    expect(again.score.total).toBe(after.score.total - 2.5);
  });

  it('best-of: answering both choice-group items counts the better one', async () => {
    const { c } = await member();
    const s = await start(c, LONG);
    const lk = await itemKeys(h.t, LONG);
    const group = lk.filter((k) => k.choiceGroup === 'B3');
    expect(group.every((k) => k.type === 'short')).toBe(true);
    await save(c, s.attempt.id, group.map((k) => ({ itemId: k.itemId, seq: 1, response: { text: 'answer' } })));
    await c.post(`/v1/attempts/${s.attempt.id}/submit`);
    const r1 = (await c.post(`/v1/attempts/${s.attempt.id}/self-evaluation`, { items: [{ itemId: group[0]!.itemId, marks: 0.5 }, { itemId: group[1]!.itemId, marks: 2 }] })).json() as { score: { total: number }; items: { itemId: string; counted: boolean }[] };
    expect(r1.score.total).toBe(2);
    expect(r1.items.find((i) => i.itemId === group[1]!.itemId)!.counted).toBe(true);
    expect(r1.items.find((i) => i.itemId === group[0]!.itemId)!.counted).toBe(false);
  });

  it('a perfect long test earns the perfect bonus and the perfect-score badge', async () => {
    const { c, id } = await member();
    const s = await start(c, LONG);
    const lk = await itemKeys(h.t, LONG);
    await save(c, s.attempt.id, lk.map((k) => ({ itemId: k.itemId, seq: 1, response: responseFor(k, true) })));
    const r = (await c.post(`/v1/attempts/${s.attempt.id}/submit`)).json() as { autoScore: number; xpAwarded: number; badgesAwarded: string[] };
    expect(r.autoScore).toBe(14);
    expect(r.xpAwarded).toBe(XP_AWARDS.testSubmitted + XP_AWARDS.testPerfectBonus);
    expect(r.badgesAwarded).toEqual(expect.arrayContaining(['first-test', 'perfect-score']));
    const badges = await h.t.db.select().from(userBadges).where(eq(userBadges.userId, id));
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it('an empty paper earns no XP; a new attempt can start after submission and the status lists both', async () => {
    const { c } = await member();
    const s = await start(c);
    const r = (await c.post(`/v1/attempts/${s.attempt.id}/submit`)).json() as { xpAwarded: number; score: number };
    expect(r).toMatchObject({ xpAwarded: 0, score: 0 });
    const s2 = await start(c);
    expect(s2.attempt.id).not.toBe(s.attempt.id);
    const meta = (await c.get(`/v1/tests/${SHORT}`)).json() as { me: { attempts: number; activeAttemptId: string; lastAttemptId: string } };
    expect(meta.me).toMatchObject({ attempts: 1, activeAttemptId: s2.attempt.id, lastAttemptId: s.attempt.id });
    const mine = (await c.get('/v1/me/attempts?limit=1')).json() as { attempts: { id: string }[]; nextCursor: string };
    expect(mine.attempts[0]!.id).toBe(s2.attempt.id);
    const next = (await c.get(`/v1/me/attempts?limit=5&cursor=${mine.nextCursor}`)).json() as { attempts: { id: string }[]; nextCursor: null };
    expect(next.attempts.map((a) => a.id)).toEqual([s.attempt.id]);
  });

  it('test-streak badge: tests submitted on 3 consecutive IST days', async () => {
    const { c } = await member();
    const base = Date.now();
    let badges: string[] = [];
    for (let d = 0; d < 3; d++) {
      h.clock.set(base + d * 86_400_000);
      const s = await start(c, d === 1 ? LONG : SHORT);
      badges = ((await c.post(`/v1/attempts/${s.attempt.id}/submit`)).json() as { badgesAwarded: string[] }).badgesAwarded;
    }
    expect(badges).toContain('test-streak-3');
    h.clock.set(Date.now());
  });

  it('AI evaluation (M4) needs a submitted attempt (full flow: ai-evaluation.test.ts)', async () => {
    const { c } = await member();
    const s = await start(c);
    const r = await c.post(`/v1/attempts/${s.attempt.id}/ai-evaluation`);
    expect(r.statusCode).toBe(409);
    expect(r.json().code).toBe('conflict');
  });
});

describe('auto-submit', () => {
  it('the worker sweep auto-submits expired attempts and grades what was saved; lazy reads do the same', async () => {
    const keys = await itemKeys(h.t, SHORT);
    const one = await member();
    const two = await member();
    const s1 = await start(one.c);
    const s2 = await start(two.c);
    await save(one.c, s1.attempt.id, [{ itemId: keys[0]!.itemId, seq: 1, response: responseFor(keys[0]!, true) }]);
    const deadline = Date.parse(s1.attempt.deadlineAt!);
    // Not yet: inside the grace.
    expect(await autoSubmitExpired({ db: h.t.db, now: new Date(deadline + 60_000) })).toEqual({ submitted: 0, failed: 0 });
    const r = await autoSubmitExpired({ db: h.t.db, now: new Date(Date.parse(s2.attempt.deadlineAt!) + 121_000) });
    expect(r.submitted).toBeGreaterThanOrEqual(2);
    const [row] = await h.t.db.select().from(attempts).where(eq(attempts.id, s1.attempt.id));
    expect(row).toMatchObject({ status: 'auto_submitted', autoScore: 1 });
    expect(row!.submittedAt!.getTime()).toBe(deadline);
    // A result is available; a further submit is idempotent and reports the auto submission.
    const sub = (await one.c.post(`/v1/attempts/${s1.attempt.id}/submit`)).json() as { status: string; alreadySubmitted: boolean };
    expect(sub).toMatchObject({ status: 'auto_submitted', alreadySubmitted: true });

    const three = await member();
    const s3 = await start(three.c);
    h.clock.set(Date.parse(s3.attempt.deadlineAt!) + 200_000);
    const lazy = (await three.c.get(`/v1/attempts/${s3.attempt.id}`)).json() as State;
    expect(lazy.attempt.status).toBe('auto_submitted');
    // Starting the test again now begins a fresh attempt.
    const fresh = await start(three.c);
    expect(fresh.attempt.id).not.toBe(s3.attempt.id);
    h.clock.set(Date.now());
  });

  it('a submit received after deadline + grace is recorded as auto_submitted', async () => {
    const { c } = await member();
    const s = await start(c);
    h.clock.set(Date.parse(s.attempt.deadlineAt!) + 125_000);
    const r = (await c.post(`/v1/attempts/${s.attempt.id}/submit`)).json() as { status: string };
    expect(r.status).toBe('auto_submitted');
    h.clock.set(Date.now());
  });
});

describe('pool safety', () => {
  it('concurrent submits never wait for a second pooled connection inside a transaction (load-test regression)', async () => {
    const started = await Promise.all(Array.from({ length: 6 }, async () => {
      const { c } = await member();
      return (await start(c, LONG)).attempt.id;
    }));
    // A fresh client (cold caches) with a pool of 2: before the fix, two transactions each held a
    // connection and waited for another one forever.
    const small = createDb(h.t.url, { max: 2 });
    try {
      const all = Promise.all(started.map((id) => finalizeAttempt({ db: small.db, now: new Date(h.clock.now()) }, id, 'submit')));
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('pool starvation: submits did not finish')), 20_000));
      const results = (await Promise.race([all, timeout])) as { status: string }[];
      expect(results.map((r) => r.status)).toEqual(Array(6).fill('submitted'));
    } finally {
      await small.close();
    }
  });
});

describe('percentile', () => {
  it('appears once 50 first attempts are graded, from the score buckets', async () => {
    const [t] = await h.t.db.select({ id: tests.id }).from(tests).where(eq(tests.key, 't_cbse10sci_ch02_short'));
    expect(t).toBeDefined();
    expect((await percentileFor(h.t.db, t!.id, 5)).value).toBeNull();
    // 49 synthetic graded first attempts: 20 below 5 marks, 9 at 5, 20 above.
    await h.t.db.insert(testScoreBuckets).values([
      { testId: t!.id, bucket: 4, attempts: 20 },
      { testId: t!.id, bucket: 10, attempts: 9 },
      { testId: t!.id, bucket: 30, attempts: 20 },
    ]);
    expect((await percentileFor(h.t.db, t!.id, 5)).value).toBeNull();
    const { c } = await member();
    const s = await start(c, 't_cbse10sci_ch02_short');
    await c.post(`/v1/attempts/${s.attempt.id}/submit`); // 0 marks: bucket 0, the 50th attempt
    const res = (await c.get(`/v1/attempts/${s.attempt.id}/result`)).json() as { percentile: { value: number; attempts: number } };
    expect(res.percentile.attempts).toBe(50);
    expect(res.percentile.value).toBe(1); // (0 below + 0.5 × 1 equal) / 50
    expect((await percentileFor(h.t.db, t!.id, 5)).value).toBe(51); // (21 + 4.5) / 50
    // A second attempt by the same student does not count again.
    const s2 = await start(c, 't_cbse10sci_ch02_short');
    await c.post(`/v1/attempts/${s2.attempt.id}/submit`);
    expect((await percentileFor(h.t.db, t!.id, 0)).attempts).toBe(50);
  });
});

describe('objective helper sanity', () => {
  it('fixture keys cover every item', async () => {
    const keys = await itemKeys(h.t, SHORT);
    expect(keys).toHaveLength(10);
    expect(keys.filter((k) => isObjective(k.type)).length).toBe(4);
  });
});
