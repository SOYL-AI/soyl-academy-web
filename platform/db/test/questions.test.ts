/**
 * DB-6 / AC-11 / F-006: answer keys are unreachable through the student-facing view and query helper;
 * live_reserved items are embargoed; versions are immutable rows.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq, sql } from 'drizzle-orm';
import { Question } from '@soyl/shared/content/question';
import { createTestDb, type TestDb } from '../src/testing';
import { STUDENT_QUESTION_FORBIDDEN_FIELDS, joinQuestion, splitQuestion, studentQuestionColumns } from '../src/student-questions';
import { questionKeys, questions, studentQuestions } from '../schema/index';
import { UNIQUE, CHECK, expectPgError, insertQuestion, makeChapter, sampleQuestion } from './helpers';

const caseQuestion = (unit: string) =>
  Question.parse({
    id: 'q_case_photosynthesis',
    unit,
    type: 'case-based',
    passage_md: 'Riya kept a potted plant in a dark cupboard for two days ...',
    stem_md: 'Read the passage and answer the questions.',
    answer: { model_answer_md: 'See parts.' },
    solution_md: 'Parts (i) and (ii).',
    marking_scheme: [
      { step: 'Part (i)', marks: 1 },
      { step: 'Part (ii)', marks: 2 },
    ],
    marks: 3,
    difficulty: 3,
    competency: 'application',
    bloom: 'apply',
    topic_ids: [`${unit}-t01`],
    expected_time_sec: 300,
    status: 'published',
    children: [
      {
        id: 'i',
        type: 'mcq',
        stem_md: 'Why was the plant kept in the dark?',
        options: [
          { id: 'a', text_md: 'To destarch the leaves' },
          { id: 'b', text_md: 'To water it' },
          { id: 'c', text_md: 'To cool it' },
        ],
        answer: { option_ids: ['a'] },
        solution_md: 'Destarching removes stored starch.',
        marking_scheme: [{ step: 'Correct option', marks: 1 }],
        marks: 1,
        difficulty: 2,
        competency: 'understanding',
        bloom: 'understand',
        topic_ids: [`${unit}-t01`],
        expected_time_sec: 60,
      },
      {
        id: 'ii',
        type: 'short',
        stem_md: 'Name the test used for starch and its result.',
        answer: { model_answer_md: 'Iodine test; blue-black colour.' },
        solution_md: 'Iodine turns blue-black with starch.',
        marking_scheme: [
          { step: 'Iodine test', marks: 1 },
          { step: 'Blue-black colour', marks: 1 },
        ],
        marks: 2,
        difficulty: 2,
        competency: 'recall',
        bloom: 'remember',
        topic_ids: [`${unit}-t01`],
        expected_time_sec: 120,
      },
    ],
  });

function deepKeys(v: unknown, out = new Set<string>()): Set<string> {
  if (Array.isArray(v)) v.forEach((x) => deepKeys(x, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) (out.add(k), deepKeys(x, out));
  return out;
}

let t: TestDb;
let chapter: { id: string; key: string };
beforeAll(async () => {
  t = await createTestDb();
  ({ chapter } = await makeChapter(t.db));
});
afterAll(async () => {
  await t?.close();
});

describe('DB-6 answer separation', () => {
  it('splits a case-based question so no answer field remains in the student body', () => {
    const q = caseQuestion('cbse-10-science-ch06');
    const { body, key } = splitQuestion(q);
    const keys = deepKeys(body);
    for (const f of ['answer', 'solution_md', 'marking_scheme']) expect(keys.has(f)).toBe(false);
    expect(key.childKeys.map((c) => c.id)).toEqual(['i', 'ii']);
    // round trip
    expect(joinQuestion({ ...q, key: q.id, topicKeys: q.topic_ids, expectedTimeSec: q.expected_time_sec, body }, { ...key })).toEqual(
      Question.parse(q),
    );
  });

  it('the student_questions view has no key columns and student DTO columns exclude them', async () => {
    const cols = await t.db.execute<{ column_name: string }>(
      sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'student_questions'`,
    );
    const names = cols.rows.map((r) => r.column_name);
    for (const f of ['answer', 'solution_md', 'marking_scheme', 'child_keys']) expect(names).not.toContain(f);
    for (const f of STUDENT_QUESTION_FORBIDDEN_FIELDS) expect(Object.keys(studentQuestionColumns)).not.toContain(f);
    // and the questions table itself cannot hold them
    const qcols = await t.db.execute<{ column_name: string }>(
      sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'questions'`,
    );
    for (const f of ['answer', 'solution_md', 'marking_scheme']) expect(qcols.rows.map((r) => r.column_name)).not.toContain(f);
  });

  it('student reads return the stem but never the answer, solution or scheme', async () => {
    const q = caseQuestion(chapter.key);
    const row = await insertQuestion(t.db, chapter, { ...q, id: 'q_case_view', topic_ids: [`${chapter.key}-t01`], children: q.children.map((c) => ({ ...c, topic_ids: [`${chapter.key}-t01`] })) });
    const viaView = await t.db.select().from(studentQuestions).where(eq(studentQuestions.id, row.id));
    const viaHelper = await t.db.select(studentQuestionColumns).from(questions).where(eq(questions.id, row.id));
    for (const r of [viaView[0], viaHelper[0]]) {
      expect(r).toBeDefined();
      const keys = deepKeys(r);
      for (const f of ['answer', 'solution_md', 'marking_scheme', 'solutionMd', 'markingScheme', 'childKeys']) expect(keys.has(f)).toBe(false);
      expect(JSON.stringify(r)).not.toContain('Iodine turns blue-black');
    }
    // graders read the key explicitly
    const [k] = await t.db.select().from(questionKeys).where(eq(questionKeys.questionId, row.id));
    expect(k!.solutionMd).toBe('Parts (i) and (ii).');
  });

  it('hides drafts and embargoed live items from the view', async () => {
    const draft = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key, { status: 'draft' }));
    const future = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key), {
      pool: 'live_reserved',
      embargoUntil: new Date(Date.now() + 86_400_000),
    });
    const past = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key), {
      pool: 'live_reserved',
      embargoUntil: new Date(Date.now() - 1000),
    });
    const visible = new Set((await t.db.select({ id: studentQuestions.id }).from(studentQuestions)).map((r) => r.id));
    expect(visible.has(draft.id)).toBe(false);
    expect(visible.has(future.id)).toBe(false);
    expect(visible.has(past.id)).toBe(true);
    // a live item must carry an embargo
    await expectPgError(() => insertQuestion(t.db, chapter, sampleQuestion(chapter.key), { pool: 'live_reserved' }), {
      code: CHECK,
      constraint: 'questions_live_embargo',
    });
  });

  it('keeps one row per question version and one current version', async () => {
    const q = sampleQuestion(chapter.key);
    const v1 = await insertQuestion(t.db, chapter, q);
    await expectPgError(() => insertQuestion(t.db, chapter, q), { code: UNIQUE, constraint: 'questions_key_version_unique' });
    // a new version: mark the old one not current, then insert
    await expectPgError(() => insertQuestion(t.db, chapter, { ...q, version: 2 }), { code: UNIQUE, constraint: 'questions_current_unique' });
    await t.db.update(questions).set({ isCurrent: false }).where(eq(questions.id, v1.id));
    const v2 = await insertQuestion(t.db, chapter, { ...q, version: 2, stem_md: 'Edited stem' });
    const rows = await t.db.select().from(questions).where(and(eq(questions.key, q.id)));
    expect(rows.map((r) => [r.version, r.isCurrent]).sort()).toEqual([
      [1, false],
      [2, true],
    ]);
    expect(v2.id).not.toBe(v1.id);
  });
});
