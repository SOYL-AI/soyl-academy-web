/**
 * Questions (ARCHITECTURE §7.2, CONTEXT §8): every question has a correct answer, step-by-step
 * solution, marking scheme with step marks, topic tags, difficulty 1–5, competency, marks and
 * expected time. Case/source-based questions carry a shared passage and child questions.
 */
import { z } from 'zod/v4';
import { ChapterId, TopicId } from './ids';
import { ContentStatus, Markdown, Provenance } from './common';
import { Visual } from './visual';

export const QUESTION_TYPES = [
  'mcq',
  'multi-select',
  'assertion-reason',
  'case-based',
  'source-based',
  'short',
  'long',
  'numerical',
  'fill-blank',
  'match',
  'true-false',
] as const;
export const QuestionType = z.enum(QUESTION_TYPES);
export type QuestionType = z.infer<typeof QuestionType>;

/** Auto-gradable on submit; the rest are self- or AI-evaluated against the marking scheme. */
export const OBJECTIVE_TYPES: readonly QuestionType[] = [
  'mcq',
  'multi-select',
  'assertion-reason',
  'numerical',
  'fill-blank',
  'match',
  'true-false',
];

export const Competency = z.enum(['recall', 'understanding', 'application', 'analysis', 'evaluation']);
export const Bloom = z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']);

export const Option = z.object({ id: z.string().min(1), text_md: Markdown });

export const MarkingStep = z.object({
  step: z.string().min(1),
  marks: z.number().positive().multipleOf(0.5),
});

export const Answer = z.union([
  /** mcq, assertion-reason, true-false (one id) and multi-select (one or more). */
  z.object({ option_ids: z.array(z.string()).min(1) }),
  z.object({ value: z.number(), tolerance: z.number().nonnegative().default(0), unit: z.string().nullable().default(null) }),
  /** fill-blank: accepted answers per blank, compared case- and whitespace-insensitively. */
  z.object({ blanks: z.array(z.object({ accepted: z.array(z.string().min(1)).min(1) })).min(1) }),
  z.object({ pairs: z.array(z.object({ left_id: z.string(), right_id: z.string() })).min(2) }),
  /** short, long, and case/source parents: the model answer students compare against. */
  z.object({ model_answer_md: Markdown }),
]);
export type Answer = z.infer<typeof Answer>;

const QuestionFields = {
  id: z.string().regex(/^q_[a-z0-9_-]+$/),
  type: QuestionType,
  stem_md: Markdown.min(1),
  options: z.array(Option).default([]),
  /** For match questions: right-hand column. Left-hand items are `options`. */
  match_right: z.array(Option).default([]),
  answer: Answer,
  solution_md: Markdown.min(1),
  marking_scheme: z.array(MarkingStep).min(1),
  marks: z.number().positive().multipleOf(0.5),
  difficulty: z.number().int().min(1).max(5),
  competency: Competency,
  bloom: Bloom,
  topic_ids: z.array(TopicId).min(1),
  expected_time_sec: z.number().int().positive(),
  assets: z.array(Visual).default([]),
};

/** One alternative of an internal choice inside a case/source part ("(c) either (i) or (ii)"). */
export const AlternativeQuestion = z.object(QuestionFields).omit({ id: true }).extend({ id: z.string().min(1) });
export type AlternativeQuestion = z.infer<typeof AlternativeQuestion>;

export const ChildQuestion = AlternativeQuestion.extend({
  /**
   * Internal choice within this part: the student answers this part OR one of the alternatives.
   * Graded as one choice; every alternative carries the same marks as the part.
   */
  alternatives: z.array(AlternativeQuestion).default([]),
});
export type ChildQuestion = z.infer<typeof ChildQuestion>;

export const Question = z
  .object({
    ...QuestionFields,
    unit: ChapterId,
    language: z.string().default('en'),
    /** Case/source-based: the shared passage. The children are the gradable parts. */
    passage_md: Markdown.optional(),
    children: z.array(ChildQuestion).default([]),
    status: ContentStatus.default('draft'),
    version: z.number().int().positive().default(1),
    provenance: Provenance.optional(),
  })
  .superRefine((q, ctx) => checkQuestion(q, ctx, []));
export type Question = z.infer<typeof Question>;

type Issue = { code: 'custom'; path: (string | number)[]; message: string };
type Ctx = { addIssue: (issue: Issue) => void };

function checkQuestion(q: AlternativeQuestion & { passage_md?: string; children?: ChildQuestion[] }, ctx: Ctx, path: (string | number)[]) {
  const add = (message: string, sub: (string | number)[] = []) => ctx.addIssue({ code: 'custom', path: [...path, ...sub], message });

  const schemeTotal = q.marking_scheme.reduce((sum, s) => sum + s.marks, 0);
  if (Math.abs(schemeTotal - q.marks) > 1e-9) add(`marking scheme totals ${schemeTotal}, question is worth ${q.marks}`, ['marking_scheme']);

  const optionIds = new Set(q.options.map((o) => o.id));
  if (optionIds.size !== q.options.length) add('duplicate option ids', ['options']);
  const a = q.answer;

  switch (q.type) {
    case 'mcq':
    case 'assertion-reason':
    case 'true-false':
    case 'multi-select': {
      const min = q.type === 'true-false' ? 2 : 3;
      if (q.options.length < min) add(`${q.type} needs at least ${min} options`, ['options']);
      if (!('option_ids' in a)) return add(`${q.type} answer must be option_ids`, ['answer']);
      if (q.type !== 'multi-select' && a.option_ids.length !== 1) add(`${q.type} has exactly one correct option`, ['answer']);
      for (const id of a.option_ids) if (!optionIds.has(id)) add(`answer references unknown option ${id}`, ['answer']);
      break;
    }
    case 'numerical':
      if (!('value' in a)) add('numerical answer must have value', ['answer']);
      break;
    case 'fill-blank': {
      if (!('blanks' in a)) return add('fill-blank answer must have blanks', ['answer']);
      const blanks = (q.stem_md.match(/_{3,}/g) ?? []).length;
      if (blanks !== a.blanks.length) add(`stem has ${blanks} blanks (___) but answer has ${a.blanks.length}`, ['answer']);
      break;
    }
    case 'match': {
      if (!('pairs' in a)) return add('match answer must have pairs', ['answer']);
      const right = new Set(q.match_right.map((o) => o.id));
      for (const p of a.pairs) {
        if (!optionIds.has(p.left_id)) add(`unknown left item ${p.left_id}`, ['answer']);
        if (!right.has(p.right_id)) add(`unknown right item ${p.right_id}`, ['answer']);
      }
      break;
    }
    case 'short':
    case 'long':
      if (!('model_answer_md' in a)) add(`${q.type} answer must have model_answer_md`, ['answer']);
      break;
    case 'case-based':
    case 'source-based': {
      if (!q.passage_md) add(`${q.type} needs passage_md`, ['passage_md']);
      const children = q.children ?? [];
      if (children.length < 2) add(`${q.type} needs at least 2 child questions`, ['children']);
      const childMarks = children.reduce((sum, c) => sum + c.marks, 0);
      if (children.length && Math.abs(childMarks - q.marks) > 1e-9) add(`children total ${childMarks} marks, question is worth ${q.marks}`, ['children']);
      children.forEach((c, i) => {
        if (c.type === 'case-based' || c.type === 'source-based') add('children cannot nest passages', ['children', i, 'type']);
        checkQuestion(c, ctx, [...path, 'children', i]);
        (c.alternatives ?? []).forEach((alt, k) => {
          if (Math.abs(alt.marks - c.marks) > 1e-9) add(`alternative ${alt.id} is worth ${alt.marks}, the part is worth ${c.marks}`, ['children', i, 'alternatives', k, 'marks']);
          if (alt.type === 'case-based' || alt.type === 'source-based') add('alternatives cannot nest passages', ['children', i, 'alternatives', k, 'type']);
          checkQuestion(alt, ctx, [...path, 'children', i, 'alternatives', k]);
        });
      });
      break;
    }
  }
}

export function isObjective(type: QuestionType): boolean {
  return OBJECTIVE_TYPES.includes(type);
}
