/**
 * Test scoring (ARCHITECTURE §9, ADR-012). Pure functions over a test structure, its keys and the
 * stored responses, shared by submit (API), auto-submit (worker) and results.
 *
 * - Each item is graded with the practice grader (`gradeQuestion`): objective parts automatically,
 *   written parts (short/long/writing/map) wait for self-evaluation. Internal-choice alternatives
 *   inside case/source items are graded as the student chose them.
 * - Choice groups ("attempt any k of n"): every answered item is graded, then the best k count —
 *   for the total (auto + self marks) and, separately, for the auto-graded score that ranks and
 *   percentiles use (AC-14: self/AI marks never feed ranks).
 * - A response the grader cannot read (wrong shape for the type) scores 0; it is never an error at
 *   submit time, because the paper must always be gradable.
 */
import type { QuestionType } from '@soyl/shared/content/question';
import { gradeQuestion, ResponseMismatchError, type PracticeResponse, type QuestionGrade, type StoredBodyPart } from '../grading';
import type { QuestionKeyRow, TestItemRow, TestStructure } from './load';

const OBJECTIVE = new Set<string>(['mcq', 'multi-select', 'assertion-reason', 'true-false', 'numerical', 'fill-blank', 'match', 'ordering', 'code-output']);
const isObjectiveType = (t: string) => OBJECTIVE.has(t);
const round1 = (x: number) => Math.round(x * 10) / 10;
const half = (x: number) => Math.round(x * 2) / 2;

/** True when a stored answer carries nothing the student entered. */
export function isEmptyAnswer(a: unknown): boolean {
  if (a === null || a === undefined) return true;
  if (typeof a !== 'object') return false;
  const o = a as Record<string, unknown>;
  if ('text' in o) return String(o.text ?? '').trim() === '';
  if ('output' in o) return String(o.output ?? '').trim() === '';
  if ('option_ids' in o) return !Array.isArray(o.option_ids) || o.option_ids.length === 0;
  if ('blanks' in o) return !Array.isArray(o.blanks) || o.blanks.every((b) => String(b ?? '').trim() === '');
  if ('pairs' in o) return !Array.isArray(o.pairs) || o.pairs.length === 0;
  if ('order' in o) return !Array.isArray(o.order) || o.order.length === 0;
  if ('value' in o) return typeof o.value !== 'number' || !Number.isFinite(o.value);
  if ('parts' in o) return !Array.isArray(o.parts) || o.parts.every((p) => isEmptyAnswer((p as { response?: unknown })?.response));
  return true;
}

/** Auto-gradable vs self-evaluated marks of an item when nothing (or the default part) is answered. */
export function itemCapacity(item: TestItemRow): { autoMax: number; selfMax: number } {
  const q = item.question;
  const f = q.marks > 0 ? item.marks / q.marks : 1;
  if (q.type !== 'case-based' && q.type !== 'source-based') return isObjectiveType(q.type) ? { autoMax: item.marks, selfMax: 0 } : { autoMax: 0, selfMax: item.marks };
  const children = ((q.body as { children?: StoredBodyPart[] }).children ?? []) as StoredBodyPart[];
  let auto = 0;
  let self = 0;
  for (const c of children) {
    if (isObjectiveType(c.type)) auto += Number(c.marks);
    else self += Number(c.marks);
  }
  return { autoMax: round1(auto * f), selfMax: round1(self * f) };
}

export interface ItemOutcome {
  itemId: string;
  answered: boolean;
  /** Auto-graded marks earned (0 when unanswered). */
  autoMarks: number;
  autoMax: number;
  /** Marks open to self-evaluation for this item (written parts). */
  selfMax: number;
  /** Self-evaluated marks, null until the student marks them (or when there is nothing to mark). */
  selfMarks: number | null;
  /** Objective-only items: fully correct? Written or mixed items: null. */
  correct: boolean | null;
  /** Grader detail for results (keys included — never sent before submission). */
  grade: QuestionGrade | null;
  /** The stored response could not be read for this question type (scored 0). */
  unreadable: boolean;
}

export function gradeItem(item: TestItemRow, key: QuestionKeyRow | undefined, answer: unknown, selfMarks: number | null = null): ItemOutcome {
  const cap = itemCapacity(item);
  const base: ItemOutcome = { itemId: item.itemId, answered: false, autoMarks: 0, autoMax: cap.autoMax, selfMax: cap.selfMax, selfMarks: null, correct: null, grade: null, unreadable: false };
  if (!key) return base;
  const q = item.question;
  const f = q.marks > 0 ? item.marks / q.marks : 1;
  const answered = !isEmptyAnswer(answer);
  try {
    const grade = gradeQuestion(
      {
        type: q.type,
        marks: q.marks,
        children: ((q.body as { children?: StoredBodyPart[] }).children ?? []) as StoredBodyPart[],
        key: { answer: key.answer as never, solutionMd: key.solutionMd, markingScheme: key.markingScheme as never, childKeys: key.childKeys, rubric: (key.rubric ?? null) as never },
      },
      // An unanswered item is graded with an empty response of the right kind, for the key reveal.
      (answered ? answer : emptyResponse(q.type, q.body)) as PracticeResponse,
    );
    const selfMax = round1(grade.selfMaxMarks * f);
    const autoMax = round1(item.marks - selfMax);
    const marks = answered ? round1((grade.marksAwarded ?? 0) * f) : 0;
    return {
      ...base,
      answered,
      autoMarks: Math.min(marks, autoMax),
      autoMax,
      selfMax,
      selfMarks: answered && selfMax > 0 && selfMarks !== null ? Math.min(selfMarks, selfMax) : null,
      correct: answered && selfMax === 0 ? grade.correct : answered ? null : selfMax === 0 ? false : null,
      grade,
    };
  } catch (err) {
    if (!(err instanceof ResponseMismatchError)) throw err;
    return { ...base, answered, unreadable: true, correct: cap.selfMax === 0 ? false : null };
  }
}

/** An empty response of the kind a question type expects (to grade an unanswered item for its key). */
export function emptyResponse(type: QuestionType, body: unknown): PracticeResponse {
  switch (type) {
    case 'mcq':
    case 'multi-select':
    case 'assertion-reason':
    case 'true-false':
      return { option_ids: [] } as unknown as PracticeResponse;
    case 'numerical':
      return { value: Number.NaN };
    case 'fill-blank':
      return { blanks: [] } as unknown as PracticeResponse;
    case 'match':
      return { pairs: [] } as unknown as PracticeResponse;
    case 'ordering':
      return { order: [] } as unknown as PracticeResponse;
    case 'code-output':
      return { output: '' };
    case 'case-based':
    case 'source-based':
      return { parts: [] } as unknown as PracticeResponse;
    default:
      void body;
      return { text: '' };
  }
}

export interface SectionScore {
  id: string;
  title: string;
  score: number;
  autoScore: number;
  maxScore: number;
}

export interface Aggregate {
  /** Counted marks: auto + self, best-of per choice group. */
  score: number;
  /** Counted auto-graded marks (ranks, percentiles). */
  autoScore: number;
  selfScore: number;
  maxScore: number;
  /** Best auto-gradable maximum over the counted slots (perfect-score rule). */
  autoMaxCounted: number;
  sections: SectionScore[];
  /** Items whose marks count toward the total. */
  counted: Set<string>;
  answeredSlots: number;
  totalSlots: number;
  /** Answered written marks still waiting for self-evaluation. */
  pendingSelfMarks: number;
  pendingSelfItems: number;
}

export function aggregate(structure: TestStructure, outcomes: Map<string, ItemOutcome>): Aggregate {
  const counted = new Set<string>();
  const sections: SectionScore[] = [];
  let answeredSlots = 0;
  let totalSlots = 0;
  let autoMaxCounted = 0;
  for (const s of structure.sections) {
    const items = structure.items.filter((i) => i.sectionId === s.id);
    const total = (i: TestItemRow) => {
      const o = outcomes.get(i.itemId);
      return (o?.autoMarks ?? 0) + (o?.selfMarks ?? 0);
    };
    const auto = (i: TestItemRow) => outcomes.get(i.itemId)?.autoMarks ?? 0;
    let score = 0;
    let autoScore = 0;
    let maxScore = 0;
    for (const i of items.filter((x) => !x.choiceGroup)) {
      counted.add(i.itemId);
      score += total(i);
      autoScore += auto(i);
      maxScore += i.marks;
      totalSlots++;
      if (outcomes.get(i.itemId)?.answered) answeredSlots++;
      autoMaxCounted += outcomes.get(i.itemId)?.autoMax ?? 0;
    }
    for (const g of s.choiceGroups) {
      const members = items.filter((i) => i.choiceGroup === g.id);
      // Best k by total marks; ties keep paper order (stable sort). Answered items first on equal marks.
      const byTotal = [...members].sort((a, b) => total(b) - total(a) || Number(!!outcomes.get(b.itemId)?.answered) - Number(!!outcomes.get(a.itemId)?.answered));
      byTotal.slice(0, g.attempt).forEach((i) => counted.add(i.itemId));
      score += byTotal.slice(0, g.attempt).reduce((n, i) => n + total(i), 0);
      const byAuto = [...members].sort((a, b) => auto(b) - auto(a));
      autoScore += byAuto.slice(0, g.attempt).reduce((n, i) => n + auto(i), 0);
      maxScore += [...members].map((i) => i.marks).sort((a, b) => b - a).slice(0, g.attempt).reduce((n, m) => n + m, 0);
      autoMaxCounted += [...members].map((i) => outcomes.get(i.itemId)?.autoMax ?? 0).sort((a, b) => b - a).slice(0, g.attempt).reduce((n, m) => n + m, 0);
      totalSlots += g.attempt;
      answeredSlots += Math.min(g.attempt, members.filter((i) => outcomes.get(i.itemId)?.answered).length);
    }
    sections.push({ id: s.id, title: s.title, score: round1(score), autoScore: round1(autoScore), maxScore: round1(maxScore) });
  }
  const score = round1(sections.reduce((n, s) => n + s.score, 0));
  const autoScore = round1(sections.reduce((n, s) => n + s.autoScore, 0));
  let pendingSelfMarks = 0;
  let pendingSelfItems = 0;
  for (const o of outcomes.values())
    if (o.answered && o.selfMax > 0 && o.selfMarks === null) {
      pendingSelfMarks += o.selfMax;
      pendingSelfItems++;
    }
  return {
    score,
    autoScore,
    selfScore: round1(Math.max(0, score - autoScore)),
    maxScore: round1(sections.reduce((n, s) => n + s.maxScore, 0)),
    autoMaxCounted: round1(autoMaxCounted),
    sections,
    counted,
    answeredSlots,
    totalSlots,
    pendingSelfMarks: round1(pendingSelfMarks),
    pendingSelfItems,
  };
}

/** Percentile bucket for an auto score (half marks). */
export const scoreBucket = (autoScore: number) => Math.max(0, Math.round(half(autoScore) * 2));
