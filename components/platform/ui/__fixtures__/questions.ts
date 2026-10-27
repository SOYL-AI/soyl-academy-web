/**
 * Student-side question fixtures (StudentQuestion: no answers, DB-6) for every contract-v2 type, plus
 * matching graded results. Used by the question renderer tests and reusable by the M3 test player.
 */
import type { AnswerKey, PracticeAnswerResult, StudentQuestion } from '@/platform/shared/api-client';

const base = { marks: 1, assets: [], match_right: [], options: [], version: 3, difficulty: 2, expected_time_sec: 60, topic_ids: ['cbse-10-science-ch01-t01'], children: [] };

function q(id: string, type: StudentQuestion['type'], stem: string, extra: Partial<StudentQuestion> = {}): StudentQuestion {
  const objective = ['mcq', 'multi-select', 'assertion-reason', 'numerical', 'fill-blank', 'match', 'true-false', 'code-output', 'ordering'].includes(type);
  return { ...base, id, type, objective, stem_md: stem, ...extra } as StudentQuestion;
}

const opts = (...texts: string[]) => texts.map((t, i) => ({ id: String.fromCharCode(97 + i), text_md: t }));

export const Q = {
  mcq: q('q_fx_mcq', 'mcq', 'Which is a **chemical** change? $\\ce{2H2 + O2 -> 2H2O}$', { options: opts('Melting ice', 'Curd from milk', 'Dissolving sugar', 'Boiling water') }),
  multi: q('q_fx_multi', 'multi-select', 'Select **all** exothermic processes.', { options: opts('Burning LPG', 'Respiration', 'Photosynthesis', 'Quicklime + water') }),
  ar: q('q_fx_ar', 'assertion-reason', '**Assertion (A):** Iron rusts.\n\n**Reason (R):** Iron reacts with oxygen and water.', {
    options: opts('Both true, R explains A', 'Both true, R does not explain A', 'A true, R false', 'A false, R true'),
  }),
  tf: q('q_fx_tf', 'true-false', 'Photosynthesis is endothermic.', { options: opts('True', 'False') }),
  numerical: q('q_fx_num', 'numerical', 'What mass of MgO forms from 2.4 g Mg and 1.6 g O (in g)?', { marks: 2 }),
  fill: q('q_fx_fill', 'fill-blank', 'Hydrogen is collected at the ___ and oxygen at the ___.'),
  match: q('q_fx_match', 'match', 'Match each reaction with its type.', {
    marks: 2,
    options: [
      { id: '1', text_md: '$\\ce{CaO + H2O -> Ca(OH)2}$' },
      { id: '2', text_md: '$\\ce{Zn + CuSO4 -> ZnSO4 + Cu}$' },
    ],
    match_right: [
      { id: 'p', text_md: 'Displacement' },
      { id: 'q', text_md: 'Combination' },
    ],
  }),
  ordering: q('q_fx_order', 'ordering', 'Put the steps of balancing in order.', { options: opts('Count atoms', 'Write formulae', 'Add coefficients') }),
  code: q('q_fx_code', 'code-output', 'What does this print?\n\n```python\nfor i in range(2):\n    print(i)\n```'),
  short: q('q_fx_short', 'short', 'Why is ++respiration++ exothermic?', { objective: false, marks: 2, word_limit: { min: 30, max: 50 } }),
  long: q('q_fx_long', 'long', 'Explain corrosion with an example.', { objective: false, marks: 5 }),
  writing: q('q_fx_writing', 'writing', 'Write a notice for your school about a science fair.', { objective: false, marks: 5, format: 'notice', word_limit: { min: 50, max: 80 } }),
  map: q('q_fx_map', 'map', 'Identify the places marked A, B and C on the outline map of India.', { objective: false, marks: 3, map_id: 'india-political' }),
  caseBased: q('q_fx_case', 'case-based', 'Read the passage and answer the questions that follow.', {
    objective: false,
    marks: 4,
    passage_md: 'A painter adds water to **quicklime**; the bucket gets hot.',
    passage_origin: 'soyl-commentary',
    children: [
      { id: 'c1', type: 'mcq', objective: true, stem_md: 'The reaction is:', options: opts('Endothermic', 'Exothermic'), match_right: [], marks: 1, assets: [], alternatives: [] },
      {
        id: 'c2',
        type: 'short',
        objective: false,
        stem_md: 'Name the product.',
        options: [],
        match_right: [],
        marks: 3,
        assets: [],
        alternatives: [{ id: 'c2b', type: 'short', objective: false, stem_md: 'Write the balanced equation.', options: [], match_right: [], marks: 3, assets: [] }],
      },
    ],
  }),
} satisfies Record<string, StudentQuestion>;

export function key(answer: unknown, extra: Partial<AnswerKey> = {}): AnswerKey {
  return { answer, solution_md: 'Step 1: think. $x^2$', marking_scheme: [{ step: 'Correct idea', marks: 1 }], ...extra };
}

export function result(question: StudentQuestion, over: Partial<PracticeAnswerResult> = {}): PracticeAnswerResult {
  return {
    questionId: question.id,
    version: question.version,
    type: question.type,
    correct: true,
    marksAwarded: question.marks,
    maxMarks: question.marks,
    grading: 'auto',
    key: key({ option_ids: ['b'] }),
    parts: [],
    selfAssessmentPending: false,
    selfMaxMarks: 0,
    stored: false,
    answerId: null,
    xpAwarded: 0,
    badgesAwarded: [],
    streak: null,
    ...over,
  };
}
