/**
 * Migration 0003 (content contract v2): the new question types pass the type CHECK, the writing
 * rubric lives on the key side (DB-6), and the student-facing v2 fields round-trip through the body.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { Question } from '@soyl/shared/content/question';
import { createTestDb, type TestDb } from '../src/testing';
import { STUDENT_QUESTION_FORBIDDEN_FIELDS, joinQuestion, splitQuestion } from '../src/student-questions';
import { questionKeys, questions } from '../schema/index';
import { CHECK, expectPgError, insertQuestion, makeChapter, sampleQuestion } from './helpers';

let t: TestDb;
let chapter: { id: string; key: string };

beforeAll(async () => {
  t = await createTestDb();
  ({ chapter } = await makeChapter(t.db));
});
afterAll(async () => t?.close());

const v2 = (unit: string): Question[] => {
  const base = sampleQuestion(unit);
  const scheme = (marks: number) => [{ step: 'All', marks }];
  return [
    Question.parse({
      ...base,
      id: 'q_v2_writing',
      type: 'writing',
      options: [],
      stem_md: 'Write a notice about a book fair.',
      answer: { model_answer_md: 'NOTICE …' },
      format: 'notice',
      word_limit: { min: 50, max: 60 },
      rubric: [
        { criterion: 'Format', marks: 1 },
        { criterion: 'Content', marks: 2 },
        { criterion: 'Expression', marks: 2 },
      ],
      marks: 5,
      marking_scheme: scheme(5),
    }),
    Question.parse({
      ...base,
      id: 'q_v2_map',
      type: 'map',
      options: [],
      map_id: 'india-political',
      answer: { places: [{ id: 'A', name: 'Mormugao' }] },
    }),
    Question.parse({ ...base, id: 'q_v2_code', type: 'code-output', options: [], stem_md: '```python\nprint(2 + 3)\n```', answer: { output: '5' } }),
    Question.parse({ ...base, id: 'q_v2_order', type: 'ordering', answer: { order: ['c', 'a', 'b'] } }),
    Question.parse({
      ...base,
      id: 'q_v2_source',
      type: 'source-based',
      options: [],
      passage_md: 'A SOYL commentary paragraph.',
      passage_origin: 'soyl-commentary',
      answer: { model_answer_md: 'See parts.' },
      marks: 2,
      marking_scheme: scheme(2),
      children: [
        { ...base, id: 'i', type: 'short', options: [], answer: { model_answer_md: 'x' }, word_limit: { min: 20, max: 30 } },
        { ...base, id: 'ii' },
      ],
    }),
  ];
};

describe('contract v2 in the database (migration 0003)', () => {
  it('stores every new type and round-trips the full contract shape', async () => {
    for (const q of v2(chapter.key)) {
      const row = await insertQuestion(t.db, chapter, q);
      const [key] = await t.db.select().from(questionKeys).where(eq(questionKeys.questionId, row.id));
      expect(joinQuestion(row, key!)).toEqual(Question.parse(q));
    }
  });

  it('keeps the rubric and answers out of the student body', () => {
    for (const q of v2(chapter.key)) {
      const { body, key } = splitQuestion(q);
      const json = JSON.stringify(body);
      for (const f of STUDENT_QUESTION_FORBIDDEN_FIELDS) expect(json, `${q.id} body leaks ${f}`).not.toContain(`"${f}"`);
      if (q.type === 'writing') {
        expect(key.rubric).toHaveLength(3);
        expect(body).toMatchObject({ format: 'notice', word_limit: { min: 50, max: 60 } });
      }
      if (q.type === 'map') expect(body.map_id).toBe('india-political');
      if (q.type === 'source-based') expect(body.passage_origin).toBe('soyl-commentary');
    }
  });

  it('still rejects unknown question types', async () => {
    const q = sampleQuestion(chapter.key);
    const row = { ...(await import('../src/student-questions')).questionRow(q, { chapterId: chapter.id, academicYear: '2026-27' }), type: 'essay-ish' };
    await expectPgError(() => t.db.insert(questions).values(row), { code: CHECK, constraint: 'questions_type_check' });
  });
});
