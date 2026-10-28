/**
 * Practice on real content: paging/filters, unanswered-first for members, server-side checking of
 * every objective type through the endpoint, written self-assessment (+ IDOR), guests checked but not
 * stored, F-006 pools/embargo, version pinning, rate limits.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { chapters, practiceAnswers, questionKeys, questionRow, questions, splitQuestion, xpEvents } from '@soyl/db';
import { Question } from '@soyl/shared/content/question';
import { XP_AWARDS } from '@soyl/shared/config/gamification';
import { createHarness, type Client, type Harness } from './helpers';
import { seedRealContent, type ReleaseFile } from './content-fixture';

let h: Harness;
let releases: ReleaseFile[];
const SCI = 'cbse-10-science-ch01';
let n = 0;
const email = () => `practice.${Date.now().toString(36)}${++n}@example.com`;

async function keyOf(questionKey: string) {
  const [r] = await h.t.db
    .select({ k: questionKeys, q: questions })
    .from(questionKeys)
    .innerJoin(questions, eq(questions.id, questionKeys.questionId))
    .where(and(eq(questions.key, questionKey), eq(questions.isCurrent, true)));
  return r!;
}

const sciQuestions = () => releases.find((r) => r.release.unit === SCI)!.release.questions;
const firstOf = (type: string) => sciQuestions().find((q) => q.type === type && !q.children.length)!;

/** A correct response for a contract question. */
function correctResponse(q: Question) {
  const a = q.answer;
  if ('option_ids' in a) return { option_ids: a.option_ids };
  if ('value' in a) return { value: a.value };
  if ('blanks' in a) return { blanks: a.blanks.map((b) => b.accepted[0]!) };
  if ('pairs' in a) return { pairs: a.pairs };
  if ('order' in a) return { order: a.order };
  if ('output' in a) return { output: a.output };
  return { text: '' };
}

async function addSynthetic(chapterKey: string, q: Record<string, unknown>, opts: { pool?: 'practice' | 'test' | 'live_reserved'; embargoUntil?: Date | null; status?: string } = {}) {
  const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, chapterKey));
  const parsed = Question.parse({
    unit: chapterKey,
    solution_md: 'Worked solution for a synthetic question.',
    marking_scheme: [{ step: 'all', marks: 1 }],
    marks: 1,
    difficulty: 2,
    competency: 'application',
    bloom: 'apply',
    topic_ids: [`${chapterKey}-t01`],
    expected_time_sec: 60,
    status: opts.status ?? 'published',
    ...q,
  });
  const [row] = await h.t.db
    .insert(questions)
    .values(questionRow(parsed, { chapterId: ch!.id, academicYear: '2026-27', pool: opts.pool ?? 'practice', embargoUntil: opts.embargoUntil ?? null }))
    .returning();
  await h.t.db.insert(questionKeys).values({ questionId: row!.id, ...splitQuestion(parsed).key });
  return parsed;
}

beforeAll(async () => {
  h = await createHarness();
  releases = await seedRealContent(h.t, (u) => [SCI, 'cbse-10-mathematics-ch01', 'cbse-10-hindi-a-ch10'].includes(u));
  await addSynthetic('cbse-10-science-ch13', {
    id: 'q_syn_order_0001',
    type: 'ordering',
    stem_md: 'Put the steps of the experiment in order.',
    options: [ { id: 's1', text_md: 'Collect' }, { id: 's2', text_md: 'Heat' }, { id: 's3', text_md: 'Observe' } ],
    answer: { order: ['s1', 's2', 's3'] },
  });
  await addSynthetic('cbse-10-science-ch13', { id: 'q_syn_code_0001', type: 'code-output', stem_md: 'What does this print?\n\n```python\nprint(2 + 3)\n```', answer: { output: '5' } });
  await addSynthetic('cbse-10-science-ch13', { id: 'q_syn_test_0001', type: 'mcq', stem_md: 'Test-pool item', options: [ { id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }, { id: 'c', text_md: 'C' } ], answer: { option_ids: ['a'] } }, { pool: 'test' });
  await addSynthetic('cbse-10-science-ch13', { id: 'q_syn_live_0001', type: 'mcq', stem_md: 'Live item', options: [ { id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }, { id: 'c', text_md: 'C' } ], answer: { option_ids: ['a'] } }, { pool: 'live_reserved', embargoUntil: new Date(Date.now() + 7 * 86400_000) });
  await addSynthetic('cbse-10-science-ch13', { id: 'q_syn_live_0002', type: 'mcq', stem_md: 'Past live item', options: [ { id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }, { id: 'c', text_md: 'C' } ], answer: { option_ids: ['a'] } }, { pool: 'live_reserved', embargoUntil: new Date(Date.now() - 86400_000) });
  await addSynthetic('cbse-10-science-ch13', { id: 'q_syn_draft_0001', type: 'mcq', stem_md: 'Draft item', options: [ { id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }, { id: 'c', text_md: 'C' } ], answer: { option_ids: ['a'] } }, { status: 'draft' });
});
afterAll(async () => {
  await h?.close();
});

const answer = (c: Client, body: unknown) => c.post('/v1/practice/answers', body);

describe('GET /v1/chapters/:id/practice', () => {
  it('pages through every practice question once (guest), with filters and a public cache policy', async () => {
    const c = h.client();
    const seen: string[] = [];
    let cursor: string | null = null;
    do {
      const res = await c.get(`/v1/chapters/${SCI}/practice?limit=10${cursor ? `&cursor=${cursor}` : ''}`);
      expect(res.statusCode).toBe(200);
      expect(res.headers['cache-control']).toContain('public');
      const page = res.json();
      expect(page.total).toBe(sciQuestions().length);
      for (const it of page.items) {
        expect(it.answered).toBeNull();
        expect(it.lastCorrect).toBeNull();
        seen.push(it.question.id);
      }
      cursor = page.nextCursor;
    } while (cursor);
    expect(seen).toEqual([...sciQuestions().map((q) => q.id)].sort());

    const mcq = (await c.get(`/v1/chapters/${SCI}/practice?type=mcq,true-false&limit=25`)).json();
    expect(mcq.total).toBe(sciQuestions().filter((q) => q.type === 'mcq' || q.type === 'true-false').length);
    expect(new Set(mcq.items.map((i: { question: { type: string } }) => i.question.type))).toEqual(new Set(['mcq', 'true-false']));
    const easy = (await c.get(`/v1/chapters/${SCI}/practice?difficulty=1&limit=25`)).json();
    expect(easy.total).toBe(sciQuestions().filter((q) => q.difficulty === 1).length);
    expect((await c.get(`/v1/chapters/${SCI}/practice?type=essay`)).statusCode).toBe(400);
    expect((await c.get(`/v1/chapters/${SCI}/practice?cursor=garbage`)).statusCode).toBe(400);
    expect((await c.get(`/v1/chapters/${SCI}/practice?limit=26`)).statusCode).toBe(400);
  });

  it('never lists test-pool, live-reserved (even after embargo) or draft items (F-006)', async () => {
    const ids = (await h.client().get('/v1/chapters/cbse-10-science-ch13/practice?limit=25')).json().items.map((i: { question: { id: string } }) => i.question.id);
    expect(ids.sort()).toEqual(['q_syn_code_0001', 'q_syn_order_0001']);
  });

  it('members see unanswered questions first, with their own answered/lastCorrect flags, no-store', async () => {
    const c = h.client();
    await c.signInEmail(email());
    const all = sciQuestions().map((q) => q.id).sort();
    const q0 = sciQuestions().find((q) => q.id === all[0])!;
    const res = await answer(c, { questionId: q0.id, response: correctResponse(q0) });
    expect(res.statusCode).toBe(200);
    const page = await c.get(`/v1/chapters/${SCI}/practice?limit=25`);
    expect(page.headers['cache-control']).toBe('no-store');
    expect(page.json().items[0].question.id).toBe(all[1]);
    expect(page.json().items[0]).toMatchObject({ answered: false, lastCorrect: null });
    let cursor: string | null = page.json().nextCursor;
    let last: { question: { id: string }; answered: boolean; lastCorrect: boolean | null } | undefined;
    while (cursor) {
      const p = (await c.get(`/v1/chapters/${SCI}/practice?limit=25&cursor=${cursor}`)).json();
      last = p.items[p.items.length - 1] ?? last;
      cursor = p.nextCursor;
    }
    expect(last).toMatchObject({ question: { id: q0.id }, answered: true });
    expect(typeof last!.lastCorrect).toBe('boolean');
  });
});

describe('POST /v1/practice/answers', () => {
  it('checks every objective type on the server and reveals the key only now', async () => {
    const c = h.client();
    const { user } = await c.signInEmail(email());
    const types = ['mcq', 'multi-select', 'assertion-reason', 'true-false', 'numerical', 'fill-blank', 'match'];
    for (const type of types) {
      const q = firstOf(type);
      const k = await keyOf(q.id);
      const ok = await answer(c, { questionId: q.id, version: q.version, response: correctResponse(q) });
      expect(ok.statusCode, type).toBe(200);
      expect(ok.json(), type).toMatchObject({ questionId: q.id, type, correct: true, marksAwarded: q.marks, grading: 'auto', stored: true, selfAssessmentPending: false });
      expect(ok.json().key.solution_md).toBe(k.k.solutionMd);
      expect(ok.json().key.answer).toEqual(k.k.answer);
      expect(ok.json().xpAwarded).toBe(XP_AWARDS.practiceFirstCorrect);
    }
    for (const id of ['q_syn_order_0001', 'q_syn_code_0001']) {
      const r = await answer(c, { questionId: id, response: id.includes('order') ? { order: ['s1', 's2', 's3'] } : { output: '5\n' } });
      expect(r.json()).toMatchObject({ correct: true, marksAwarded: 1 });
      const wrong = await answer(c, { questionId: id, response: id.includes('order') ? { order: ['s2', 's1', 's3'] } : { output: '23' } });
      expect(wrong.json()).toMatchObject({ correct: false, marksAwarded: 0, xpAwarded: 0 });
    }
    const mcq = firstOf('mcq');
    const wrongOption = mcq.options.find((o) => !('option_ids' in mcq.answer) || !mcq.answer.option_ids.includes(o.id))!;
    const wrong = await answer(c, { questionId: mcq.id, response: { option_ids: [wrongOption.id] } });
    expect(wrong.json()).toMatchObject({ correct: false, marksAwarded: 0, xpAwarded: 0, stored: true });
    const again = await answer(c, { questionId: mcq.id, response: correctResponse(mcq) });
    expect(again.json()).toMatchObject({ correct: true, xpAwarded: 0 });

    const rows = await h.t.db.select().from(practiceAnswers).where(eq(practiceAnswers.userId, user.id));
    expect(rows).toHaveLength(types.length + 4 + 2);
    expect(rows.every((r) => r.source === 'app' && r.grading === 'auto')).toBe(true);
    const xp = await h.t.db.select().from(xpEvents).where(eq(xpEvents.userId, user.id));
    expect(xp.reduce((s, x) => s + x.amount, 0)).toBe((types.length + 2) * XP_AWARDS.practiceFirstCorrect);
  });

  it('guests are checked but nothing is stored', async () => {
    const q = firstOf('mcq');
    const before = (await h.t.db.select().from(practiceAnswers)).length;
    const res = await answer(h.client(), { questionId: q.id, response: correctResponse(q) });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ correct: true, stored: false, answerId: null, xpAwarded: 0, streak: null });
    expect(res.json().key.solution_md.length).toBeGreaterThan(0);
    expect((await h.t.db.select().from(practiceAnswers)).length).toBe(before);
  });

  it('case-based items: per-part grading, internal-choice alternatives graded from question_keys', async () => {
    const maths = releases.find((r) => r.release.unit === 'cbse-10-mathematics-ch01')!.release;
    const q = maths.questions.find((x) => x.children.some((c) => c.alternatives.length))!;
    const k = await keyOf(q.id);
    const childKeys = k.k.childKeys as { id: string; alternatives?: { id: string; solution_md: string }[] }[];
    const altChild = q.children.find((c) => c.alternatives.length)!;
    const alt = altChild.alternatives[0]!;
    const parts = q.children.map((c) => (c.id === altChild.id ? { id: c.id, alternative: alt.id, response: correctResponse(alt as unknown as Question) } : { id: c.id, response: correctResponse(c as unknown as Question) }));
    const c = h.client();
    await c.signInEmail(email());
    const res = await answer(c, { questionId: q.id, response: { parts } });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    const part = body.parts.find((p: { id: string }) => p.id === altChild.id);
    expect(part).toMatchObject({ alternative: alt.id, type: alt.type });
    expect(part.key.solution_md).toBe(childKeys.find((x) => x.id === altChild.id)!.alternatives![0]!.solution_md);
    for (const p of body.parts) if (p.grading === 'auto') expect(p.correct, p.id).toBe(true);
    expect(body.maxMarks).toBe(q.marks);
    expect((await answer(c, { questionId: q.id, response: { option_ids: ['a'] } })).statusCode).toBe(400);
    expect((await answer(c, { questionId: q.id, response: { parts: [{ id: 'nope', response: { text: '' } }] } })).statusCode).toBe(400);
  });

  it('written answers: model answer + marking scheme now, self-assessed marks later (own answers only)', async () => {
    const q = firstOf('short');
    const c = h.client();
    await c.signInEmail(email());
    const res = await answer(c, { questionId: q.id, response: { text: 'Because the reaction gives off heat.' } });
    expect(res.json()).toMatchObject({ correct: null, marksAwarded: null, grading: 'self', selfAssessmentPending: true, selfMaxMarks: q.marks, stored: true, xpAwarded: 0 });
    expect(res.json().key.answer).toHaveProperty('model_answer_md');
    expect(res.json().key.marking_scheme.length).toBeGreaterThan(0);
    const id = res.json().answerId;
    const [row] = await h.t.db.select().from(practiceAnswers).where(eq(practiceAnswers.id, id));
    expect(row).toMatchObject({ grading: 'none', marksAwarded: null, correct: null });

    expect((await c.patch(`/v1/practice/answers/${id}`, { marks: q.marks + 1 })).statusCode).toBe(400);
    expect((await c.patch(`/v1/practice/answers/${id}`, { marks: 0.25 })).statusCode).toBe(400);
    const ok = await c.patch(`/v1/practice/answers/${id}`, { marks: q.marks });
    expect(ok.json()).toEqual({ answerId: id, marksAwarded: q.marks, maxMarks: q.marks, grading: 'self', creditBonuses: [] });

    // API-7: someone else's answer is 404; guests need to sign in.
    const other = h.client();
    await other.signInEmail(email());
    expect((await other.patch(`/v1/practice/answers/${id}`, { marks: 0 })).statusCode).toBe(404);
    expect((await h.client().patch(`/v1/practice/answers/${id}`, { marks: 0 })).statusCode).toBe(401);
    expect((await c.patch('/v1/practice/answers/0190a1b2-0000-7000-8000-000000000000', { marks: 0 })).statusCode).toBe(404);

    const auto = await answer(c, { questionId: firstOf('mcq').id, response: correctResponse(firstOf('mcq')) });
    expect((await c.patch(`/v1/practice/answers/${auto.json().answerId}`, { marks: 1 })).statusCode).toBe(409);
  });

  it('F-006: test-pool, live-reserved and draft items are never checked (404)', async () => {
    const c = h.client();
    for (const id of ['q_syn_test_0001', 'q_syn_live_0001', 'q_syn_live_0002', 'q_syn_draft_0001', 'q_unknown_0001'])
      expect((await answer(c, { questionId: id, response: { option_ids: ['a'] } })).statusCode, id).toBe(404);
  });

  it('pins the version shown; an unknown version is 404', async () => {
    const q = firstOf('mcq');
    expect((await answer(h.client(), { questionId: q.id, version: q.version, response: correctResponse(q) })).json().version).toBe(q.version);
    expect((await answer(h.client(), { questionId: q.id, version: q.version + 5, response: correctResponse(q) })).statusCode).toBe(404);
  });

  it('rejects malformed bodies and responses of the wrong shape (API-8)', async () => {
    const q = firstOf('mcq');
    const c = h.client();
    expect((await answer(c, { questionId: q.id, response: { value: 1 } })).json()).toMatchObject({ code: 'validation_failed' });
    expect((await answer(c, { questionId: q.id, response: { option_ids: ['a'] }, correct: true })).statusCode).toBe(400);
    expect((await answer(c, { questionId: q.id, response: { option_ids: ['a'], extra: 1 } })).statusCode).toBe(400);
    expect((await answer(c, { questionId: 'DROP TABLE', response: { option_ids: ['a'] } })).statusCode).toBe(400);
    expect((await c.post('/v1/practice/answers', { questionId: q.id, response: { option_ids: ['a'] } }, { origin: 'https://evil.example' })).statusCode).toBe(403);
  });

  it('rate-limits answer checks per user (practice.answer.user)', async () => {
    const c = h.client();
    await c.signInEmail(email());
    const q = firstOf('true-false');
    let limited = 0;
    for (let i = 0; i < 62; i++) if ((await answer(c, { questionId: q.id, response: correctResponse(q) })).statusCode === 429) limited++;
    expect(limited).toBe(2);
  });
});
