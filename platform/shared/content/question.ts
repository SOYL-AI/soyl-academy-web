/**
 * Questions (ARCHITECTURE §7.2, CONTEXT §8): every question has a correct answer, step-by-step
 * solution, marking scheme with step marks, topic tags, difficulty 1–5, competency, marks and
 * expected time. Case/source-based questions carry a shared passage and child questions.
 *
 * Contract v2 (M2, all additions optional and backwards compatible):
 * - types `writing` (letters, notices, essays… with a format, word limit and rubric), `map`
 *   (map work: locate/identify named places on an outline map), `code-output` (predict the exact
 *   output of a fenced code block; auto-graded) and `ordering` (put items in order; auto-graded);
 * - `word_limit` on writing (required), short and long; `passage_origin` on case/source items;
 * - the underline marker `++text++` for language items (common.ts).
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
  // Contract v2 (M2)
  'writing',
  'map',
  'code-output',
  'ordering',
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
  'code-output',
  'ordering',
];

export const Competency = z.enum(['recall', 'understanding', 'application', 'analysis', 'evaluation']);
export const Bloom = z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']);

export const Option = z.object({ id: z.string().min(1), text_md: Markdown });

export const MarkingStep = z.object({
  step: z.string().min(1),
  marks: z.number().positive().multipleOf(0.5),
});

/** Writing-task formats (CBSE/ICSE English and Hindi writing sections, précis, translation). */
export const WRITING_FORMATS = [
  'letter-formal',
  'letter-informal',
  'email',
  'notice',
  'message',
  'advertisement',
  'article',
  'report',
  'speech',
  'essay',
  'paragraph',
  'story',
  'diary',
  'resume',
  'precis',
  'translation',
  'other',
] as const;
export const WritingFormat = z.enum(WRITING_FORMATS);
export type WritingFormat = z.infer<typeof WritingFormat>;

/** Word limit for a written answer, inclusive ("in 100–120 words" → { min: 100, max: 120 }). */
export const WordLimit = z
  .object({ min: z.number().int().nonnegative(), max: z.number().int().positive() })
  .refine((w) => w.min <= w.max, { message: 'word_limit.min must not exceed word_limit.max' });
export type WordLimit = z.infer<typeof WordLimit>;

/** One criterion of a writing rubric (e.g. Format 1, Content 2, Expression 2). Criteria sum to the marks. */
export const RubricCriterion = z.object({
  criterion: z.string().min(1),
  marks: z.number().positive().multipleOf(0.5),
  /** What earns the marks; shown to graders and, after submission, to the student. */
  descriptor_md: Markdown.optional(),
});
export type RubricCriterion = z.infer<typeof RubricCriterion>;

/** Where a case/source passage comes from. Only SOYL-written passages are allowed until licensing exists (CONTEXT §8). */
export const PassageOrigin = z.enum(['soyl-original', 'soyl-commentary', 'licensed-excerpt']);
export type PassageOrigin = z.infer<typeof PassageOrigin>;

/** Languages a code-output stem may fence (```python … ```). */
export const CODE_LANGUAGES = ['python', 'java', 'c', 'cpp', 'javascript', 'sql', 'html', 'css', 'bash', 'pseudocode', 'text'] as const;
export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

/** Fenced code blocks: ```lang\n…\n``` (or ~~~). Group 1 = info string (language), group 2 = code. */
export const CODE_FENCE_RE = /(?:^|\n)[ \t]*(```|~~~)[ \t]*([A-Za-z0-9+#-]*)[^\n]*\n([\s\S]*?)\n[ \t]*\1[ \t]*(?=\n|$)/g;

/** The fenced code blocks of a Markdown string. */
export function codeBlocks(md: string): { language: string; code: string }[] {
  return [...md.matchAll(CODE_FENCE_RE)].map((m) => ({ language: (m[2] ?? '').toLowerCase(), code: m[3] ?? '' }));
}

/** One place or feature in a map question's key. */
export const MapPlace = z.object({
  /** Label used in the stem ("A", "i", "1"). */
  id: z.string().min(1),
  /** The expected place/feature name. */
  name: z.string().min(1),
  /** Other accepted names or spellings. */
  accepted: z.array(z.string().min(1)).default([]),
  /** Free tag: city, state, river, port, dam, site, mountain-range, soil, crop-area… */
  kind: z.string().optional(),
});

export const Answer = z.union([
  /** mcq, assertion-reason, true-false (one id) and multi-select (one or more). */
  z.object({ option_ids: z.array(z.string()).min(1) }),
  z.object({ value: z.number(), tolerance: z.number().nonnegative().default(0), unit: z.string().nullable().default(null) }),
  /** fill-blank: accepted answers per blank, compared case- and whitespace-insensitively. */
  z.object({ blanks: z.array(z.object({ accepted: z.array(z.string().min(1)).min(1) })).min(1) }),
  z.object({ pairs: z.array(z.object({ left_id: z.string(), right_id: z.string() })).min(2) }),
  /** short, long, writing, and case/source parents: the model answer students compare against. */
  z.object({ model_answer_md: Markdown }),
  /** ordering: every option id, in the correct order. */
  z.object({ order: z.array(z.string().min(1)).min(2) }),
  /** code-output: the exact expected output; graded after whitespace normalisation (grading.ts). */
  z.object({ output: z.string().min(1) }),
  /** map: the places/features to be located or identified (self- or AI-evaluated). */
  z.object({ places: z.array(MapPlace).min(1) }),
]);
export type Answer = z.infer<typeof Answer>;

const QuestionFields = {
  id: z.string().regex(/^q_[a-z0-9_-]+$/),
  type: QuestionType,
  stem_md: Markdown.min(1),
  /** Choices (mcq…), left-hand items (match), or the items to put in order (ordering). */
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
  /** writing only (required there). */
  format: WritingFormat.optional(),
  /** writing (required), short and long (optional). */
  word_limit: WordLimit.optional(),
  /** writing only (required there): criteria whose marks sum to `marks`. */
  rubric: z.array(RubricCriterion).optional(),
  /** map only: which outline map to show (e.g. "india-political", "world-physical"); renderer-defined ids. */
  map_id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
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
    /** Case/source-based: who wrote the passage (CONTEXT §8). Lint refuses licensed-excerpt until licensing exists. */
    passage_origin: PassageOrigin.optional(),
    children: z.array(ChildQuestion).default([]),
    status: ContentStatus.default('draft'),
    version: z.number().int().positive().default(1),
    provenance: Provenance.optional(),
  })
  .superRefine((q, ctx) => checkQuestion(q, ctx, []));
export type Question = z.infer<typeof Question>;

type Issue = { code: 'custom'; path: (string | number)[]; message: string };
type Ctx = { addIssue: (issue: Issue) => void };

const WORD_LIMIT_TYPES: readonly QuestionType[] = ['writing', 'short', 'long'];

function checkQuestion(
  q: AlternativeQuestion & { passage_md?: string; passage_origin?: PassageOrigin; children?: ChildQuestion[] },
  ctx: Ctx,
  path: (string | number)[],
) {
  const add = (message: string, sub: (string | number)[] = []) => ctx.addIssue({ code: 'custom', path: [...path, ...sub], message });

  const schemeTotal = q.marking_scheme.reduce((sum, s) => sum + s.marks, 0);
  if (Math.abs(schemeTotal - q.marks) > 1e-9) add(`marking scheme totals ${schemeTotal}, question is worth ${q.marks}`, ['marking_scheme']);

  const optionIds = new Set(q.options.map((o) => o.id));
  if (optionIds.size !== q.options.length) add('duplicate option ids', ['options']);
  const a = q.answer;

  // v2 fields belong to specific types.
  if (q.type !== 'writing') {
    if (q.format !== undefined) add('format is only for writing questions', ['format']);
    if (q.rubric !== undefined) add('rubric is only for writing questions', ['rubric']);
  }
  if (q.word_limit !== undefined && !WORD_LIMIT_TYPES.includes(q.type)) add(`word_limit is only for ${WORD_LIMIT_TYPES.join(', ')} questions`, ['word_limit']);
  if (q.map_id !== undefined && q.type !== 'map') add('map_id is only for map questions', ['map_id']);
  if (q.passage_origin !== undefined && q.type !== 'case-based' && q.type !== 'source-based') add('passage_origin is only for case/source-based questions', ['passage_origin']);

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
    case 'writing': {
      if (!('model_answer_md' in a)) add('writing answer must have model_answer_md', ['answer']);
      if (!q.format) add('writing needs a format (letter-formal, notice, essay, …)', ['format']);
      if (!q.word_limit) add('writing needs word_limit {min, max}', ['word_limit']);
      if (!q.rubric?.length) add('writing needs a rubric (criteria with marks)', ['rubric']);
      else {
        const total = q.rubric.reduce((s, r) => s + r.marks, 0);
        if (Math.abs(total - q.marks) > 1e-9) add(`rubric totals ${total}, question is worth ${q.marks}`, ['rubric']);
        const names = new Set(q.rubric.map((r) => r.criterion.trim().toLowerCase()));
        if (names.size !== q.rubric.length) add('duplicate rubric criteria', ['rubric']);
      }
      break;
    }
    case 'map':
      if (!('places' in a)) return add('map answer must have places', ['answer']);
      if (new Set(a.places.map((p) => p.id)).size !== a.places.length) add('duplicate place ids', ['answer']);
      break;
    case 'code-output': {
      if (!('output' in a)) add('code-output answer must have output', ['answer']);
      const blocks = codeBlocks(q.stem_md);
      if (!blocks.length) add('code-output stem needs a fenced code block (```python … ```)', ['stem_md']);
      for (const b of blocks)
        if (!(CODE_LANGUAGES as readonly string[]).includes(b.language))
          add(`code block language "${b.language || '(none)'}" must be one of ${CODE_LANGUAGES.join(', ')}`, ['stem_md']);
      break;
    }
    case 'ordering': {
      if (q.options.length < 3) add('ordering needs at least 3 items (options)', ['options']);
      if (!('order' in a)) return add('ordering answer must have order', ['answer']);
      const order = new Set(a.order);
      if (order.size !== a.order.length) add('order repeats an item', ['answer']);
      if (order.size !== optionIds.size || [...optionIds].some((id) => !order.has(id))) add('order must list every option id exactly once', ['answer']);
      break;
    }
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
