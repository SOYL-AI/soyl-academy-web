/**
 * DB-6: keeping answers away from student-facing reads.
 *
 * - `splitQuestion` turns a contract Question (platform/shared/content/question.ts) into a
 *   `questions` row (student-safe body) and a `question_keys` row (answer, solution, marking scheme,
 *   and the same for case/source children). Use it when ingesting releases.
 * - `studentQuestionColumns` is the column set for any query that feeds a student DTO. Select it
 *   explicitly; never `select()` all columns into a DTO and never join `question_keys`.
 * - The `student_questions` view (schema/views.ts) applies the visibility rules as well: only
 *   published/reviewed, and live_reserved items only after their embargo (AC-11).
 * - `joinQuestion` rebuilds the full contract shape for graders, reviewers and exports.
 */
import type { Question } from '@soyl/shared/content/question';
import { questions, type QuestionPool } from '../schema/index';

const KEY_FIELDS = ['answer', 'solution_md', 'marking_scheme'] as const;

/** Student-safe projection stored in questions.body. */
export interface QuestionBody {
  stem_md: string;
  passage_md?: string;
  options: { id: string; text_md: string }[];
  match_right: { id: string; text_md: string }[];
  assets: Question['assets'];
  children: Omit<Question['children'][number], (typeof KEY_FIELDS)[number]>[];
}

export interface QuestionKeyValues {
  answer: Question['answer'];
  solutionMd: string;
  markingScheme: Question['marking_scheme'];
  childKeys: { id: string; answer: Question['answer']; solution_md: string; marking_scheme: Question['marking_scheme'] }[];
}

export function splitQuestion(q: Question): { body: QuestionBody; key: QuestionKeyValues } {
  const body: QuestionBody = {
    stem_md: q.stem_md,
    ...(q.passage_md !== undefined ? { passage_md: q.passage_md } : {}),
    options: q.options,
    match_right: q.match_right,
    assets: q.assets,
    children: q.children.map(({ answer: _a, solution_md: _s, marking_scheme: _m, ...rest }) => rest),
  };
  return {
    body,
    key: {
      answer: q.answer,
      solutionMd: q.solution_md,
      markingScheme: q.marking_scheme,
      childKeys: q.children.map((c) => ({ id: c.id, answer: c.answer, solution_md: c.solution_md, marking_scheme: c.marking_scheme })),
    },
  };
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

export const STUDENT_QUESTION_FORBIDDEN_FIELDS = ['answer', 'solution_md', 'solutionMd', 'marking_scheme', 'markingScheme', 'childKeys'] as const;

/** Rebuilds the contract Question from a questions row and its key. */
export function joinQuestion(
  row: { key: string; version: number; unit: string; type: string; status: string; language: string; difficulty: number; competency: string; bloom: string; marks: number; expectedTimeSec: number; topicKeys: string[]; body: unknown },
  key: { answer: unknown; solutionMd: string; markingScheme: unknown; childKeys: unknown },
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
    language: row.language,
    children: body.children.map((c) => {
      const k = childKeys.get(c.id)!;
      return { ...c, answer: k.answer, solution_md: k.solution_md, marking_scheme: k.marking_scheme } as Question['children'][number];
    }),
    status: row.status as Question['status'],
    version: row.version,
  };
}
