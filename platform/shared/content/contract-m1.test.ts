/** Contract extensions made by pipeline-engineer in M1 (all optional and backwards compatible). */
import { describe, expect, it } from 'vitest';
import { ChapterOutline, Notes, Provenance, Question, QuestionBank } from './index';
import { SVG_RULES } from './svg-allowlist';

const unit = 'cbse-10-science-ch01';
const topic = 'cbse-10-science-ch01-t01';
const part = (id: string, marks: number, extra: Record<string, unknown> = {}) => ({
  id,
  type: 'short',
  stem_md: 'Explain.',
  answer: { model_answer_md: 'Because…' },
  solution_md: 'Step 1 …',
  marking_scheme: [{ step: 'Reason', marks }],
  marks,
  difficulty: 3,
  competency: 'application',
  bloom: 'apply',
  topic_ids: [topic],
  expected_time_sec: 120,
  ...extra,
});
const caseQ = (children: unknown[]) => ({
  ...part('q_case_1', 4),
  unit,
  type: 'case-based',
  passage_md: 'A student heats lead nitrate…',
  answer: { model_answer_md: 'See parts.' },
  marking_scheme: [{ step: 'Parts', marks: 4 }],
  children,
});

describe('ChildQuestion.alternatives (either/or inside a case part)', () => {
  it('accepts a part with an alternative of equal marks', () => {
    const q = Question.parse(caseQ([part('a', 1), part('b', 1), part('c', 2, { alternatives: [part('c2', 2)] })]));
    expect(q.children[2]!.alternatives).toHaveLength(1);
    expect(q.children[0]!.alternatives).toEqual([]);
  });
  it('rejects alternatives with different marks or invalid content', () => {
    expect(Question.safeParse(caseQ([part('a', 1), part('b', 1), part('c', 2, { alternatives: [part('c2', 1, { marking_scheme: [{ step: 'x', marks: 1 }] })] })])).success).toBe(false);
    expect(Question.safeParse(caseQ([part('a', 1), part('b', 1), part('c', 2, { alternatives: [part('c2', 2, { marking_scheme: [{ step: 'x', marks: 1 }] })] })])).success).toBe(false);
  });
});

describe('NotesSection.visuals and Provenance.author', () => {
  it('keeps visual working and allows more visuals', () => {
    const table = { kind: 'table', spec: { headers: ['a'], rows: [['1']] }, alt: 'a small table' };
    const n = Notes.parse({ unit, title: 'N', sections: [{ heading: 'H', body_md: 'B', visual: table, visuals: [table, table] }] });
    expect(n.sections[0]!.visuals).toHaveLength(2);
    expect(Notes.parse({ unit, title: 'N', sections: [{ heading: 'H', body_md: 'B' }] }).sections[0]!.visuals).toEqual([]);
  });
  it('records a human or agent author', () => {
    expect(Provenance.parse({ origin: 'exemplar', author: 'exemplar-author (science)' }).author).toBe('exemplar-author (science)');
    expect(Provenance.parse({ origin: 'pipeline' }).author).toBeUndefined();
  });
});

describe('ChapterOutline and QuestionBank', () => {
  const outline = {
    unit,
    title: 'Chemical Reactions',
    family: 'science',
    goals: ['Balance equations'],
    parts: [{ part: 1, title: 'P1', topic_ids: [topic], slides: [{ layout: 'title', heading: 'Intro' }] }],
    question_plan: { total: 1, by_type: [{ type: 'mcq', count: 1, marks: 1 }], by_difficulty: [{ difficulty: 2, count: 1 }], by_competency: [{ competency: 'recall', count: 1 }] },
  };
  it('validates an outline', () => {
    expect(ChapterOutline.parse(outline).parts[0]!.slides[0]!.visual).toBeNull();
    expect(ChapterOutline.safeParse({ ...outline, unit: 'nope' }).success).toBe(false);
  });
  it('rejects duplicate ids and foreign questions in a bank', () => {
    const q = { ...part('q_x_001', 1), unit, type: 'short' };
    expect(QuestionBank.safeParse({ unit, questions: [q] }).success).toBe(true);
    expect(QuestionBank.safeParse({ unit, questions: [q, q] }).success).toBe(false);
    expect(QuestionBank.safeParse({ unit, questions: [{ ...q, unit: 'cbse-10-science-ch02' }] }).success).toBe(false);
  });
  it('exposes the SVG class rule shared with the renderer', () => {
    expect(new RegExp(SVG_RULES.classPattern).test('diagram-accent')).toBe(true);
    expect(new RegExp(SVG_RULES.classPattern).test('fixed')).toBe(false);
  });
});
