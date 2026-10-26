/**
 * Server-side practice grading (F-006: checks happen here, answers are never shipped to the browser
 * before the student answers). Objective types are graded automatically; written types (short, long,
 * writing, map) return the model answer and marking scheme for self-evaluation.
 *
 * Objective rules (board items are all-or-nothing unless noted):
 *   mcq, assertion-reason, true-false  exactly the one correct option
 *   multi-select                       exactly the correct set of options
 *   numerical                          |given − value| ≤ tolerance (unit not compared)
 *   fill-blank                         each blank matches an accepted answer (case/space-insensitive,
 *                                      NFKC, trailing full stop/danda ignored, numbers compared as
 *                                      numbers); partial marks per blank, rounded down to 0.5
 *   match                              each left item paired correctly; partial marks per pair
 *   code-output                        shared normaliseCodeOutput comparison (grading.ts)
 *   ordering                           every item in place (shared orderingMatches); positions for feedback
 * Case/source-based items grade each part (or the chosen internal-choice alternative) and add up.
 */
import { codeOutputMatches, orderingMatches, orderingPositionsCorrect } from '@soyl/shared/content/grading';
import { isObjective, type Answer, type QuestionType } from '@soyl/shared/content/question';
import type { ChildKey, PartKey } from '@soyl/db/student-questions';

export type PartResponse =
  | { option_ids: string[] }
  | { value: number }
  | { blanks: string[] }
  | { pairs: { left_id: string; right_id: string }[] }
  | { order: string[] }
  | { output: string }
  | { text: string };

export type PracticeResponse = PartResponse | { parts: { id: string; alternative?: string; response: PartResponse }[] };

export class ResponseMismatchError extends Error {
  constructor(public readonly path: string, message: string) {
    super(message);
    this.name = 'ResponseMismatchError';
  }
}

export interface KeyReveal {
  answer: Answer;
  solution_md: string;
  marking_scheme: { step: string; marks: number }[];
  rubric?: { criterion: string; marks: number; descriptor_md?: string }[];
}

export interface PartFeedback {
  blanksCorrect?: boolean[];
  pairsCorrect?: number;
  positionsCorrect?: number;
}

export interface PartGrade {
  /** null for written parts (self-evaluated). */
  correct: boolean | null;
  /** null for written parts until the student self-marks. */
  marksAwarded: number | null;
  maxMarks: number;
  grading: 'auto' | 'self';
  feedback?: PartFeedback;
}

const half = (x: number) => Math.floor(x * 2 + 1e-9) / 2;

export function normaliseBlank(s: string): string {
  return s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/gu, ' ')
    .trim()
    .replace(/[.।。]+$/u, '')
    .trim();
}

function blankMatches(given: string, accepted: readonly string[]): boolean {
  const g = normaliseBlank(given);
  if (!g) return false;
  const gNum = /^[-+]?\d+(?:\.\d+)?$/.test(g) ? Number(g) : null;
  return accepted.some((a) => {
    const n = normaliseBlank(a);
    if (n === g) return true;
    return gNum !== null && /^[-+]?\d+(?:\.\d+)?$/.test(n) && Math.abs(Number(n) - gNum) < 1e-9;
  });
}

const KIND_FOR: Record<QuestionType, keyof PartResponseKinds | 'parts'> = {
  mcq: 'option_ids',
  'multi-select': 'option_ids',
  'assertion-reason': 'option_ids',
  'true-false': 'option_ids',
  numerical: 'value',
  'fill-blank': 'blanks',
  match: 'pairs',
  ordering: 'order',
  'code-output': 'output',
  short: 'text',
  long: 'text',
  writing: 'text',
  map: 'text',
  'case-based': 'parts',
  'source-based': 'parts',
};
type PartResponseKinds = { option_ids: 1; value: 1; blanks: 1; pairs: 1; order: 1; output: 1; text: 1 };

/** The response field a question type expects (`parts` for case/source-based). */
export const responseKindFor = (type: QuestionType) => KIND_FOR[type];

function expectKind(type: QuestionType, response: PartResponse, path: string): void {
  const kind = KIND_FOR[type];
  if (!(kind in response)) throw new ResponseMismatchError(path, `a ${type} question needs a response with "${kind}"`);
}

/** Grades one part (a whole non-case question, a child, or an alternative). */
export function gradePart(type: QuestionType, marks: number, answer: Answer, response: PartResponse | undefined, path = 'body.response'): PartGrade {
  if (response !== undefined) expectKind(type, response, path);
  if (!isObjective(type)) return { correct: null, marksAwarded: null, maxMarks: marks, grading: 'self' };
  const wrong: PartGrade = { correct: false, marksAwarded: 0, maxMarks: marks, grading: 'auto' };
  if (response === undefined) return wrong;
  const full = (ok: boolean, feedback?: PartFeedback): PartGrade => ({ correct: ok, marksAwarded: ok ? marks : 0, maxMarks: marks, grading: 'auto', ...(feedback ? { feedback } : {}) });

  switch (type) {
    case 'mcq':
    case 'assertion-reason':
    case 'true-false':
    case 'multi-select': {
      if (!('option_ids' in answer) || !('option_ids' in response)) return wrong;
      const want = new Set(answer.option_ids);
      const got = new Set(response.option_ids);
      if (type !== 'multi-select' && response.option_ids.length !== 1) return wrong;
      return full(got.size === want.size && [...got].every((id) => want.has(id)));
    }
    case 'numerical': {
      if (!('value' in answer) || !('value' in response)) return wrong;
      const tol = (answer.tolerance ?? 0) + 1e-9 * Math.max(1, Math.abs(answer.value));
      return full(Number.isFinite(response.value) && Math.abs(response.value - answer.value) <= tol);
    }
    case 'fill-blank': {
      if (!('blanks' in answer) || !('blanks' in response)) return wrong;
      const results = answer.blanks.map((b, i) => blankMatches(response.blanks[i] ?? '', b.accepted));
      const right = results.filter(Boolean).length;
      const all = right === answer.blanks.length;
      return { correct: all, marksAwarded: all ? marks : half((marks * right) / answer.blanks.length), maxMarks: marks, grading: 'auto', feedback: { blanksCorrect: results } };
    }
    case 'match': {
      if (!('pairs' in answer) || !('pairs' in response)) return wrong;
      const want = new Map(answer.pairs.map((p) => [p.left_id, p.right_id]));
      const seen = new Set<string>();
      let right = 0;
      for (const p of response.pairs) {
        if (seen.has(p.left_id)) continue;
        seen.add(p.left_id);
        if (want.get(p.left_id) === p.right_id) right++;
      }
      const all = right === want.size && response.pairs.length === want.size;
      return { correct: all, marksAwarded: all ? marks : half((marks * right) / want.size), maxMarks: marks, grading: 'auto', feedback: { pairsCorrect: right } };
    }
    case 'ordering': {
      if (!('order' in answer) || !('order' in response)) return wrong;
      return full(orderingMatches(answer.order, response.order), { positionsCorrect: orderingPositionsCorrect(answer.order, response.order) });
    }
    case 'code-output': {
      if (!('output' in answer) || !('output' in response)) return wrong;
      return full(codeOutputMatches(answer.output, response.output));
    }
    default:
      return wrong;
  }
}

/* ---------------------------------------------------------------------------------------------- */

export interface StoredBodyPart {
  id: string;
  type: string;
  marks: number;
  alternatives?: StoredBodyPart[];
}

export interface QuestionForGrading {
  type: QuestionType;
  marks: number;
  /** Children (and alternatives) from questions.body: ids, types and marks only are used. */
  children: StoredBodyPart[];
  key: { answer: Answer; solutionMd: string; markingScheme: KeyReveal['marking_scheme']; childKeys: ChildKey[]; rubric: KeyReveal['rubric'] | null };
}

export interface PartResult extends PartGrade {
  id: string;
  /** The internal-choice alternative answered, when not the part itself. */
  alternative: string | null;
  type: QuestionType;
  key: KeyReveal;
}

export interface QuestionGrade extends PartGrade {
  key: KeyReveal;
  parts: PartResult[];
  /** True when written parts wait for the student's self-mark (PATCH /v1/practice/answers/:id). */
  selfAssessmentPending: boolean;
  /** Marks available for self-assessment (written parts), 0 when fully auto-graded. */
  selfMaxMarks: number;
}

const reveal = (k: { answer: unknown; solution_md: string; marking_scheme: unknown; rubric?: unknown } | PartKey): KeyReveal => ({
  answer: k.answer as Answer,
  solution_md: k.solution_md,
  marking_scheme: k.marking_scheme as KeyReveal['marking_scheme'],
  ...(k.rubric ? { rubric: k.rubric as KeyReveal['rubric'] } : {}),
});

export function gradeQuestion(q: QuestionForGrading, response: PracticeResponse): QuestionGrade {
  const topKey = reveal({ answer: q.key.answer, solution_md: q.key.solutionMd, marking_scheme: q.key.markingScheme, ...(q.key.rubric ? { rubric: q.key.rubric } : {}) });
  if (q.type !== 'case-based' && q.type !== 'source-based') {
    if ('parts' in response) throw new ResponseMismatchError('body.response', `a ${q.type} question needs a response with "${KIND_FOR[q.type]}"`);
    const g = gradePart(q.type, q.marks, q.key.answer, response);
    return { ...g, key: topKey, parts: [], selfAssessmentPending: g.grading === 'self', selfMaxMarks: g.grading === 'self' ? q.marks : 0 };
  }
  if (!('parts' in response)) throw new ResponseMismatchError('body.response', `a ${q.type} question needs a response with "parts"`);
  const given = new Map<string, { alternative?: string; response: PartResponse }>();
  response.parts.forEach((p, i) => {
    if (given.has(p.id)) throw new ResponseMismatchError(`body.response.parts.${i}.id`, `part ${p.id} answered twice`);
    given.set(p.id, p);
  });
  const known = new Set(q.children.map((c) => c.id));
  for (const [id] of given) if (!known.has(id)) throw new ResponseMismatchError('body.response.parts', `unknown part ${id}`);

  const keys = new Map(q.key.childKeys.map((k) => [k.id, k]));
  const parts: PartResult[] = q.children.map((child, i) => {
    const g = given.get(child.id);
    let part: StoredBodyPart = child;
    let key: PartKey | undefined = keys.get(child.id);
    if (g?.alternative && g.alternative !== child.id) {
      const alt = (child.alternatives ?? []).find((a) => a.id === g.alternative);
      if (!alt) throw new ResponseMismatchError(`body.response.parts.${i}.alternative`, `part ${child.id} has no alternative ${g.alternative}`);
      part = alt;
      key = keys.get(child.id)?.alternatives?.find((a) => a.id === alt.id);
    }
    if (!key) throw new Error(`question key missing for part ${part.id}`);
    const type = part.type as QuestionType;
    const grade = gradePart(type, Number(part.marks), key.answer, g?.response, `body.response.parts.${i}.response`);
    return { ...grade, id: child.id, alternative: part.id === child.id ? null : part.id, type, key: reveal(key) };
  });

  const written = parts.filter((p) => p.grading === 'self');
  const autoMarks = parts.reduce((s, p) => s + (p.marksAwarded ?? 0), 0);
  const allObjective = written.length === 0;
  return {
    correct: allObjective ? parts.every((p) => p.correct) : null,
    marksAwarded: autoMarks,
    maxMarks: q.marks,
    grading: allObjective ? 'auto' : 'self',
    key: topKey,
    parts,
    selfAssessmentPending: !allObjective,
    selfMaxMarks: written.reduce((s, p) => s + p.maxMarks, 0),
  };
}
