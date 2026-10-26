/** Server-side grading of every objective type, written types, and case/source items with alternatives. */
import { describe, expect, it } from 'vitest';
import { gradePart, gradeQuestion, normaliseBlank, ResponseMismatchError, type QuestionForGrading } from '../src/domain/grading';

describe('gradePart: objective types', () => {
  it('mcq / assertion-reason / true-false: exactly the one correct option', () => {
    for (const type of ['mcq', 'assertion-reason', 'true-false'] as const) {
      expect(gradePart(type, 1, { option_ids: ['b'] }, { option_ids: ['b'] })).toMatchObject({ correct: true, marksAwarded: 1, grading: 'auto' });
      expect(gradePart(type, 1, { option_ids: ['b'] }, { option_ids: ['a'] })).toMatchObject({ correct: false, marksAwarded: 0 });
      expect(gradePart(type, 1, { option_ids: ['b'] }, { option_ids: ['a', 'b'] })).toMatchObject({ correct: false, marksAwarded: 0 });
    }
  });

  it('multi-select: exactly the correct set, any order', () => {
    const a = { option_ids: ['a', 'c'] };
    expect(gradePart('multi-select', 2, a, { option_ids: ['c', 'a'] })).toMatchObject({ correct: true, marksAwarded: 2 });
    expect(gradePart('multi-select', 2, a, { option_ids: ['a'] }).correct).toBe(false);
    expect(gradePart('multi-select', 2, a, { option_ids: ['a', 'b', 'c'] }).correct).toBe(false);
    expect(gradePart('multi-select', 2, a, { option_ids: ['a', 'a'] }).correct).toBe(false);
  });

  it('numerical: within tolerance; unit ignored; non-finite never right', () => {
    const a = { value: 9.8, tolerance: 0.05, unit: 'm/s^2' };
    expect(gradePart('numerical', 1, a, { value: 9.84 }).correct).toBe(true);
    expect(gradePart('numerical', 1, a, { value: 9.75 }).correct).toBe(true);
    expect(gradePart('numerical', 1, a, { value: 9.9 }).correct).toBe(false);
    expect(gradePart('numerical', 1, { value: 0.3, tolerance: 0, unit: null }, { value: 0.1 + 0.2 }).correct).toBe(true);
    expect(gradePart('numerical', 1, a, { value: Number.NaN }).correct).toBe(false);
  });

  it('fill-blank: case/space/NFKC-insensitive, trailing full stop or danda ignored, numbers compared as numbers, partial marks', () => {
    const a = { blanks: [{ accepted: ['Carbon dioxide', 'CO2'] }, { accepted: ['7'] }] };
    expect(gradePart('fill-blank', 2, a, { blanks: ['  carbon   DIOXIDE. ', '7.0'] })).toMatchObject({ correct: true, marksAwarded: 2, feedback: { blanksCorrect: [true, true] } });
    expect(gradePart('fill-blank', 2, a, { blanks: ['ＣＯ2', '8'] })).toMatchObject({ correct: false, marksAwarded: 1, feedback: { blanksCorrect: [true, false] } });
    expect(gradePart('fill-blank', 1, a, { blanks: ['oxygen'] })).toMatchObject({ correct: false, marksAwarded: 0 });
    expect(gradePart('fill-blank', 1, { blanks: [{ accepted: ['संज्ञा'] }] }, { blanks: ['संज्ञा।'] }).correct).toBe(true);
    expect(gradePart('fill-blank', 1, { blanks: [{ accepted: ['x'] }] }, { blanks: ['   '] }).correct).toBe(false);
    expect(normaliseBlank(' A\tB ')).toBe('a b');
  });

  it('match: every pair; partial marks rounded down to 0.5; duplicates count once', () => {
    const a = { pairs: [ { left_id: 'a', right_id: 'p' }, { left_id: 'b', right_id: 'q' }, { left_id: 'c', right_id: 'r' } ] };
    expect(gradePart('match', 3, a, { pairs: [ { left_id: 'c', right_id: 'r' }, { left_id: 'a', right_id: 'p' }, { left_id: 'b', right_id: 'q' } ] })).toMatchObject({ correct: true, marksAwarded: 3 });
    expect(gradePart('match', 1, a, { pairs: [ { left_id: 'a', right_id: 'p' }, { left_id: 'b', right_id: 'r' }, { left_id: 'c', right_id: 'q' } ] })).toMatchObject({ correct: false, marksAwarded: 0, feedback: { pairsCorrect: 1 } });
    expect(gradePart('match', 3, a, { pairs: [ { left_id: 'a', right_id: 'p' }, { left_id: 'a', right_id: 'p' }, { left_id: 'b', right_id: 'q' } ] })).toMatchObject({ correct: false, marksAwarded: 2 });
  });

  it('ordering: all-or-nothing with positions for feedback', () => {
    const a = { order: ['s1', 's2', 's3', 's4'] };
    expect(gradePart('ordering', 2, a, { order: ['s1', 's2', 's3', 's4'] })).toMatchObject({ correct: true, marksAwarded: 2, feedback: { positionsCorrect: 4 } });
    expect(gradePart('ordering', 2, a, { order: ['s1', 's3', 's2', 's4'] })).toMatchObject({ correct: false, marksAwarded: 0, feedback: { positionsCorrect: 2 } });
    expect(gradePart('ordering', 2, a, { order: ['s1', 's2'] }).correct).toBe(false);
  });

  it('code-output: shared whitespace normalisation', () => {
    const a = { output: 'Hello\n  World' };
    expect(gradePart('code-output', 1, a, { output: '\r\nHello  \r\n  World\n\n' }).correct).toBe(true);
    expect(gradePart('code-output', 1, a, { output: 'Hello\nWorld' }).correct).toBe(false);
  });

  it('written types are self-evaluated', () => {
    for (const type of ['short', 'long', 'writing', 'map'] as const)
      expect(gradePart(type, 3, { model_answer_md: 'x' }, { text: 'my answer' })).toEqual({ correct: null, marksAwarded: null, maxMarks: 3, grading: 'self' });
  });

  it('a response of the wrong shape is a mismatch; a missing response is wrong', () => {
    expect(() => gradePart('mcq', 1, { option_ids: ['a'] }, { value: 1 })).toThrow(ResponseMismatchError);
    expect(() => gradePart('short', 1, { model_answer_md: 'x' }, { option_ids: ['a'] })).toThrow(/needs a response with "text"/);
    expect(gradePart('mcq', 1, { option_ids: ['a'] }, undefined)).toMatchObject({ correct: false, marksAwarded: 0 });
    // A key of an unexpected shape never grades as correct.
    expect(gradePart('mcq', 1, { model_answer_md: 'x' }, { option_ids: ['a'] }).correct).toBe(false);
    expect(gradePart('numerical', 1, { option_ids: ['a'] }, { value: 1 }).correct).toBe(false);
    expect(gradePart('fill-blank', 1, { option_ids: ['a'] }, { blanks: ['a'] }).correct).toBe(false);
    expect(gradePart('match', 1, { option_ids: ['a'] }, { pairs: [{ left_id: 'a', right_id: 'b' }] }).correct).toBe(false);
    expect(gradePart('ordering', 1, { option_ids: ['a'] }, { order: ['a', 'b'] }).correct).toBe(false);
    expect(gradePart('code-output', 1, { option_ids: ['a'] }, { output: 'a' }).correct).toBe(false);
  });
});

const ms = (marks: number) => [{ step: 's', marks }];
const caseQuestion: QuestionForGrading = {
  type: 'case-based',
  marks: 4,
  children: [
    { id: 'a', type: 'mcq', marks: 1 },
    { id: 'b', type: 'numerical', marks: 1 },
    { id: 'c', type: 'short', marks: 2, alternatives: [{ id: 'c-alt', type: 'fill-blank', marks: 2 }] },
  ],
  key: {
    answer: { model_answer_md: 'parts' },
    solutionMd: 'see parts',
    markingScheme: ms(4),
    rubric: null,
    childKeys: [
      { id: 'a', answer: { option_ids: ['x'] }, solution_md: 'A sol', marking_scheme: ms(1) },
      { id: 'b', answer: { value: 3, tolerance: 0, unit: null }, solution_md: 'B sol', marking_scheme: ms(1) },
      { id: 'c', answer: { model_answer_md: 'C model' }, solution_md: 'C sol', marking_scheme: ms(2), alternatives: [{ id: 'c-alt', answer: { blanks: [{ accepted: ['ok'] }, { accepted: ['fine'] }] }, solution_md: 'Alt sol', marking_scheme: ms(2) }] },
    ],
  },
};

describe('gradeQuestion: case/source items', () => {
  it('grades objective parts and leaves the written part for self-assessment', () => {
    const g = gradeQuestion(caseQuestion, { parts: [ { id: 'a', response: { option_ids: ['x'] } }, { id: 'b', response: { value: 4 } }, { id: 'c', response: { text: 'mine' } } ] });
    expect(g).toMatchObject({ correct: null, marksAwarded: 1, maxMarks: 4, grading: 'self', selfAssessmentPending: true, selfMaxMarks: 2 });
    expect(g.parts.map((p) => [p.id, p.correct, p.marksAwarded])).toEqual([ ['a', true, 1], ['b', false, 0], ['c', null, null] ]);
    expect(g.parts[2]!.key.solution_md).toBe('C sol');
    expect(g.key.solution_md).toBe('see parts');
  });

  it('grades an internal-choice alternative from its own key', () => {
    const g = gradeQuestion(caseQuestion, { parts: [ { id: 'a', response: { option_ids: ['x'] } }, { id: 'b', response: { value: 3 } }, { id: 'c', alternative: 'c-alt', response: { blanks: ['OK', 'nope'] } } ] });
    expect(g).toMatchObject({ correct: false, marksAwarded: 3, grading: 'auto', selfAssessmentPending: false });
    expect(g.parts[2]).toMatchObject({ id: 'c', alternative: 'c-alt', type: 'fill-blank', marksAwarded: 1, key: { solution_md: 'Alt sol' } });
    const all = gradeQuestion(caseQuestion, { parts: [ { id: 'a', response: { option_ids: ['x'] } }, { id: 'b', response: { value: 3 } }, { id: 'c', alternative: 'c-alt', response: { blanks: ['ok', 'fine'] } } ] });
    expect(all).toMatchObject({ correct: true, marksAwarded: 4 });
    // Naming the part itself as the "alternative" answers the part.
    expect(gradeQuestion(caseQuestion, { parts: [{ id: 'c', alternative: 'c', response: { text: '' } }] }).parts[2]!.alternative).toBeNull();
  });

  it('unanswered parts score zero; malformed part responses are rejected', () => {
    expect(gradeQuestion(caseQuestion, { parts: [{ id: 'a', response: { option_ids: ['x'] } }] }).marksAwarded).toBe(1);
    expect(() => gradeQuestion(caseQuestion, { parts: [{ id: 'z', response: { text: '' } }] })).toThrow(/unknown part/);
    expect(() => gradeQuestion(caseQuestion, { parts: [ { id: 'a', response: { option_ids: ['x'] } }, { id: 'a', response: { option_ids: ['x'] } } ] })).toThrow(/twice/);
    expect(() => gradeQuestion(caseQuestion, { parts: [{ id: 'c', alternative: 'nope', response: { text: '' } }] })).toThrow(/no alternative/);
    expect(() => gradeQuestion(caseQuestion, { option_ids: ['x'] })).toThrow(/parts/);
    expect(() => gradeQuestion({ ...caseQuestion, type: 'mcq', children: [] }, { parts: [] })).toThrow(/option_ids/);
  });

  it('a missing key row for a part is a server error, not a free pass', () => {
    const broken = { ...caseQuestion, key: { ...caseQuestion.key, childKeys: caseQuestion.key.childKeys.slice(0, 2) } };
    expect(() => gradeQuestion(broken, { parts: [{ id: 'c', response: { text: '' } }] })).toThrow(/question key missing/);
  });
});
