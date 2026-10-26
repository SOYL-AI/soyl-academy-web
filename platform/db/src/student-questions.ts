/**
 * DB-6: keeping answers away from student-facing reads.
 *
 * - `splitQuestion` turns a contract Question (platform/shared/content/question.ts) into a
 *   `questions` row (student-safe body) and a `question_keys` row (answer, solution, marking scheme,
 *   and the same for case/source children and their internal-choice alternatives). Use it when
 *   ingesting releases. `findKeySideFields` deep-scans any value for key-side fields.
 * - `studentQuestionColumns` is the column set for any query that feeds a student DTO. Select it
 *   explicitly; never `select()` all columns into a DTO and never join `question_keys`.
 * - The `student_questions` view (schema/views.ts) applies the visibility rules as well: only
 *   published/reviewed, and live_reserved items only after their embargo (AC-11).
 * - `joinQuestion` rebuilds the full contract shape for graders, reviewers and exports.
 */
import type { Question } from '@soyl/shared/content/question';
import { questions, type QuestionPool } from '../schema/index';

/**
 * Key-side fields: answers, worked solutions, marking schemes and rubrics. They never appear in
 * `questions.body` — not at the top level, not in children, not in a child's internal-choice
 * `alternatives` (DB-6 / F-006). `KEY_SIDE_FIELDS` is what tests deep-scan for.
 */
const KEY_FIELDS = ['answer', 'solution_md', 'marking_scheme', 'rubric'] as const;
export const KEY_SIDE_FIELDS: readonly string[] = KEY_FIELDS;

type Child = Question['children'][number];
type Alternative = Child['alternatives'][number];
type StripKeys<T> = Omit<T, (typeof KEY_FIELDS)[number]>;

/** A child part in the student-safe body: no key fields, and its alternatives have none either. */
export type BodyChild = Omit<StripKeys<Child>, 'alternatives'> & { alternatives: StripKeys<Alternative>[] };

/** Student-safe projection stored in questions.body. */
export interface QuestionBody {
  stem_md: string;
  passage_md?: string;
  options: { id: string; text_md: string }[];
  match_right: { id: string; text_md: string }[];
  assets: Question['assets'];
  children: BodyChild[];
  /** Contract v2, student-facing: writing format, word limit, map id, passage origin (present only when set). */
  format?: Question['format'];
  word_limit?: Question['word_limit'];
  map_id?: Question['map_id'];
  passage_origin?: Question['passage_origin'];
}

/** The key of one gradable part (a child, or one of a child's alternatives). */
export interface PartKey {
  id: string;
  answer: Question['answer'];
  solution_md: string;
  marking_scheme: Question['marking_scheme'];
  rubric?: Question['rubric'];
}

export interface ChildKey extends PartKey {
  /** Keys of the child's internal-choice alternatives, in order (empty when it has none). */
  alternatives?: PartKey[];
}

export interface QuestionKeyValues {
  answer: Question['answer'];
  solutionMd: string;
  markingScheme: Question['marking_scheme'];
  childKeys: ChildKey[];
  /** Contract v2 writing rubric (key side: graders, and the student after submission). */
  rubric: Question['rubric'] | null;
}

function stripKeys<T extends { answer: unknown; solution_md: unknown; marking_scheme: unknown; rubric?: unknown }>(item: T): StripKeys<T> {
  const { answer: _a, solution_md: _s, marking_scheme: _m, rubric: _r, ...rest } = item;
  return rest;
}

function partKey(item: { id: string; answer: Question['answer']; solution_md: string; marking_scheme: Question['marking_scheme']; rubric?: Question['rubric'] }): PartKey {
  return { id: item.id, answer: item.answer, solution_md: item.solution_md, marking_scheme: item.marking_scheme, ...(item.rubric !== undefined ? { rubric: item.rubric } : {}) };
}

export function splitQuestion(q: Question): { body: QuestionBody; key: QuestionKeyValues } {
  const body: QuestionBody = {
    stem_md: q.stem_md,
    ...(q.passage_md !== undefined ? { passage_md: q.passage_md } : {}),
    options: q.options,
    match_right: q.match_right,
    assets: q.assets,
    children: q.children.map((c) => ({ ...stripKeys(c), alternatives: (c.alternatives ?? []).map((a) => stripKeys(a)) })),
    ...(q.format !== undefined ? { format: q.format } : {}),
    ...(q.word_limit !== undefined ? { word_limit: q.word_limit } : {}),
    ...(q.map_id !== undefined ? { map_id: q.map_id } : {}),
    ...(q.passage_origin !== undefined ? { passage_origin: q.passage_origin } : {}),
  };
  return {
    body,
    key: {
      answer: q.answer,
      solutionMd: q.solution_md,
      markingScheme: q.marking_scheme,
      childKeys: q.children.map((c) => ({ ...partKey(c), ...((c.alternatives ?? []).length ? { alternatives: c.alternatives.map(partKey) } : {}) })),
      rubric: q.rubric ?? null,
    },
  };
}

/** Paths of every key-side field found anywhere in a value (deep). Empty = student-safe. */
export function findKeySideFields(value: unknown, path = '$'): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => findKeySideFields(v, `${path}[${i}]`));
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => [...(KEY_SIDE_FIELDS.includes(k) ? [`${path}.${k}`] : []), ...findKeySideFields(v, `${path}.${k}`)]);
  return [];
}

/** Insert values for `questions` (without chapterId/academicYear/releaseId, which the caller knows). */
export function questionRow(q: Question, opts: { chapterId: string; academicYear: string; pool?: QuestionPool; embargoUntil?: Date | null }) {
  const { body } = splitQuestion(q);
  return {
    key: q.id,
    version: q.version,
    unit: q.unit,
    chapterId: opts.chapterId,
    academicYear: opts.academicYear,
    status: q.status,
    language: q.language,
    origin: q.provenance?.origin ?? 'pipeline',
    templateVersion: q.provenance?.template_version ?? null,
    model: q.provenance?.model ?? null,
    type: q.type,
    pool: opts.pool ?? 'practice',
    embargoUntil: opts.embargoUntil ?? null,
    difficulty: q.difficulty,
    competency: q.competency,
    bloom: q.bloom,
    marks: q.marks,
    expectedTimeSec: q.expected_time_sec,
    topicKeys: q.topic_ids,
    body,
  };
}

/** The only question columns a student-facing query may select. */
export const studentQuestionColumns = {
  id: questions.id,
  key: questions.key,
  version: questions.version,
  unit: questions.unit,
  chapterId: questions.chapterId,
  language: questions.language,
  type: questions.type,
  pool: questions.pool,
  difficulty: questions.difficulty,
  competency: questions.competency,
  bloom: questions.bloom,
  marks: questions.marks,
  expectedTimeSec: questions.expectedTimeSec,
  topicKeys: questions.topicKeys,
  body: questions.body,
} as const;

export const STUDENT_QUESTION_FORBIDDEN_FIELDS = ['answer', 'solution_md', 'solutionMd', 'marking_scheme', 'markingScheme', 'childKeys', 'rubric'] as const;

function withKey<T extends { id: string }>(part: T, k: PartKey) {
  return { ...part, answer: k.answer, solution_md: k.solution_md, marking_scheme: k.marking_scheme, ...(k.rubric !== undefined ? { rubric: k.rubric } : {}) };
}

/** Rebuilds the contract Question from a questions row and its key (children and their alternatives included). */
export function joinQuestion(
  row: { key: string; version: number; unit: string; type: string; status: string; language: string; difficulty: number; competency: string; bloom: string; marks: number; expectedTimeSec: number; topicKeys: string[]; body: unknown },
  key: { answer: unknown; solutionMd: string; markingScheme: unknown; childKeys: unknown; rubric?: unknown },
): Question {
  const body = row.body as QuestionBody;
  const childKeys = new Map((key.childKeys as QuestionKeyValues['childKeys']).map((c) => [c.id, c]));
  return {
    id: row.key,
    unit: row.unit,
    type: row.type as Question['type'],
    stem_md: body.stem_md,
    ...(body.passage_md !== undefined ? { passage_md: body.passage_md } : {}),
    options: body.options,
    match_right: body.match_right,
    answer: key.answer as Question['answer'],
    solution_md: key.solutionMd,
    marking_scheme: key.markingScheme as Question['marking_scheme'],
    marks: row.marks,
    difficulty: row.difficulty,
    competency: row.competency as Question['competency'],
    bloom: row.bloom as Question['bloom'],
    topic_ids: row.topicKeys,
    expected_time_sec: row.expectedTimeSec,
    assets: body.assets,
    ...(body.format !== undefined ? { format: body.format } : {}),
    ...(body.word_limit !== undefined ? { word_limit: body.word_limit } : {}),
    ...(body.map_id !== undefined ? { map_id: body.map_id } : {}),
    ...(body.passage_origin !== undefined ? { passage_origin: body.passage_origin } : {}),
    ...(key.rubric !== undefined && key.rubric !== null ? { rubric: key.rubric as Question['rubric'] } : {}),
    language: row.language,
    children: body.children.map((c) => {
      const k = childKeys.get(c.id)!;
      const altKeys = new Map((k.alternatives ?? []).map((a) => [a.id, a]));
      return {
        ...withKey(c, k),
        alternatives: (c.alternatives ?? []).map((a) => withKey(a, altKeys.get(a.id)!)),
      } as Question['children'][number];
    }),
    status: row.status as Question['status'],
    version: row.version,
  };
}
