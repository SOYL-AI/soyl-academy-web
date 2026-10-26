/**
 * Question model for the practice page, lesson check slides and (M3) the test player: what the student has
 * entered so far (a `Draft`), whether it can be submitted, and the API response shape it becomes
 * (`PracticeResponse`, backend-api M2: option_ids / value / blanks / pairs / order / output / text, and
 * `parts` for case/source items).
 *
 * Pure and dependency-free (no zod: this ships to the browser). The browser never grades: answers come
 * from the server after submission (F-006, DB-6).
 */
import type { PracticePartResponse, PracticeResponse, QuestionType, StudentQuestion, StudentQuestionPart } from '@/platform/shared/api-client';

/** A question or one of its parts (case/source children, internal-choice alternatives). */
export type QuestionPart = StudentQuestionPart | StudentQuestion;

export type Draft =
  | { kind: 'choice'; ids: string[] }
  | { kind: 'value'; text: string }
  | { kind: 'blanks'; values: string[] }
  | { kind: 'pairs'; pairs: Record<string, string> }
  | { kind: 'order'; ids: string[] }
  | { kind: 'output'; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'parts'; parts: Record<string, PartDraft> };

export interface PartDraft {
  /** Internal choice: the alternative's id, or undefined for the part itself. */
  alternative?: string;
  draft: Draft;
}

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  mcq: 'Multiple choice',
  'multi-select': 'Select all that apply',
  'assertion-reason': 'Assertion and reason',
  'case-based': 'Case-based',
  'source-based': 'Source-based',
  short: 'Short answer',
  long: 'Long answer',
  numerical: 'Numerical',
  'fill-blank': 'Fill in the blanks',
  match: 'Match the columns',
  'true-false': 'True or false',
  writing: 'Writing',
  map: 'Map work',
  'code-output': 'Predict the output',
  ordering: 'Put in order',
};

/** Writing formats (platform/shared/content/question.ts WRITING_FORMATS) → badge text. */
export const WRITING_FORMAT_LABELS: Record<string, string> = {
  'letter-formal': 'Formal letter',
  'letter-informal': 'Informal letter',
  email: 'Email',
  notice: 'Notice',
  message: 'Message',
  advertisement: 'Advertisement',
  article: 'Article',
  report: 'Report',
  speech: 'Speech',
  essay: 'Essay',
  paragraph: 'Paragraph',
  story: 'Story',
  diary: 'Diary entry',
  resume: 'Résumé',
  precis: 'Précis',
  translation: 'Translation',
  other: 'Writing task',
};

/** passage_origin (CONTEXT §8) → the label shown above a passage. */
export const PASSAGE_ORIGIN_LABELS: Record<string, string> = {
  'soyl-original': 'Passage written by SOYL Academy',
  'soyl-commentary': 'SOYL commentary — not from the textbook',
  'licensed-excerpt': 'Excerpt used with permission',
};

export const WRITTEN_TYPES: readonly QuestionType[] = ['short', 'long', 'writing', 'map'];
export const CHOICE_TYPES: readonly QuestionType[] = ['mcq', 'multi-select', 'assertion-reason', 'true-false'];

export function isCaseType(type: QuestionType): boolean {
  return type === 'case-based' || type === 'source-based';
}

export function isWritten(type: QuestionType): boolean {
  return WRITTEN_TYPES.includes(type);
}

/** Blanks in a fill-blank stem: runs of 3+ underscores (contract: question.ts fill-blank rule). */
export const BLANK_RE = /_{3,}/g;

export function blankCount(stem: string): number {
  return (stem.match(BLANK_RE) ?? []).length;
}

/** The stem with each blank replaced by a visible numbered gap the inputs below refer to. */
export function numberBlanks(stem: string): string {
  let n = 0;
  return stem.replace(BLANK_RE, () => `**(${++n})** \\_\\_\\_\\_\\_`);
}

/** Words in a written answer (same rule as platform/shared/content/common.ts wordCount). */
export function wordCount(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

/**
 * A numerical answer: digits with an optional sign and decimal point; a Unicode minus, spaces and
 * thousands commas are accepted ("1,200", "− 3.5"). Units or words → null (the field says "number only").
 */
export function parseNumber(raw: string): number | null {
  const t = raw
    .trim()
    .replace(/[−–]/g, '-')
    .replace(/(\d),(?=\d{3}\b)/g, '$1') // no lookbehind: older iOS Safari
    .replace(/\s+/g, '');
  if (!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/.test(t)) return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}

/** "A", "B", … for option labels; "(i)", "(ii)" for parts. */
export function letter(i: number): string {
  return String.fromCharCode(65 + (i % 26));
}

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii'];
export function roman(i: number): string {
  return ROMAN[i] ?? String(i + 1);
}

export function initialDraft(q: QuestionPart & { children?: StudentQuestion['children'] }): Draft {
  switch (q.type) {
    case 'mcq':
    case 'multi-select':
    case 'assertion-reason':
    case 'true-false':
      return { kind: 'choice', ids: [] };
    case 'numerical':
      return { kind: 'value', text: '' };
    case 'fill-blank':
      return { kind: 'blanks', values: Array.from({ length: Math.max(1, blankCount(q.stem_md)) }, () => '') };
    case 'match':
      return { kind: 'pairs', pairs: {} };
    case 'ordering':
      // The API serves ordering items shuffled (ADR-010 §5); the starting order is the served order.
      return { kind: 'order', ids: q.options.map((o) => o.id) };
    case 'code-output':
      return { kind: 'output', text: '' };
    case 'case-based':
    case 'source-based':
      return { kind: 'parts', parts: Object.fromEntries((q.children ?? []).map((c) => [c.id, { draft: initialDraft(c) }])) };
    default:
      return { kind: 'text', text: '' };
  }
}

/** The part a student answers for a case child: the child itself or the chosen alternative. */
export function chosenPart(child: StudentQuestion['children'][number], alternative: string | undefined): QuestionPart {
  return (alternative && child.alternatives.find((a) => a.id === alternative)) || child;
}

/** Has the student entered anything for this part? */
export function hasInput(draft: Draft): boolean {
  switch (draft.kind) {
    case 'choice':
      return draft.ids.length > 0;
    case 'value':
    case 'output':
    case 'text':
      return draft.text.trim().length > 0;
    case 'blanks':
      return draft.values.some((v) => v.trim().length > 0);
    case 'pairs':
      return Object.values(draft.pairs).some(Boolean);
    case 'order':
      return draft.ids.length > 0;
    case 'parts':
      return Object.values(draft.parts).some((p) => hasInput(p.draft));
  }
}

/** Why the draft cannot be submitted yet, or null when it can. */
export function submitBlocker(q: QuestionPart & { children?: StudentQuestion['children'] }, draft: Draft): string | null {
  switch (draft.kind) {
    case 'choice':
      return draft.ids.length ? null : q.type === 'multi-select' ? 'Select at least one option.' : 'Choose an option.';
    case 'value':
      if (!draft.text.trim()) return 'Enter your answer.';
      return parseNumber(draft.text) === null ? 'Enter a number only, without units.' : null;
    case 'blanks':
      return draft.values.every((v) => v.trim()) ? null : draft.values.length > 1 ? 'Fill in every blank.' : 'Fill in the blank.';
    case 'pairs':
      return q.options.every((o) => draft.pairs[o.id]) ? null : 'Match every item.';
    case 'order':
      return null;
    case 'output':
    case 'text':
      return draft.text.trim() ? null : 'Write your answer.';
    case 'parts':
      return hasInput(draft) ? null : 'Answer at least one part.';
  }
}

function partResponse(draft: Draft): PracticePartResponse | null {
  switch (draft.kind) {
    case 'choice':
      return draft.ids.length ? { option_ids: [...draft.ids] } : null;
    case 'value': {
      const v = parseNumber(draft.text);
      return v === null ? null : { value: v };
    }
    case 'blanks':
      return { blanks: draft.values.map((v) => v.trim()) };
    case 'pairs':
      return { pairs: Object.entries(draft.pairs).filter(([, r]) => r).map(([left_id, right_id]) => ({ left_id, right_id })) };
    case 'order':
      return { order: [...draft.ids] };
    case 'output':
      // Kept as typed (inner spacing matters); the server normalises line endings and trailing spaces.
      return { output: draft.text };
    case 'text':
      return { text: draft.text.trim() };
    case 'parts':
      return null;
  }
}

/** The API request `response` for a draft. Unanswered case parts are left out (graded as not answered). */
export function toResponse(draft: Draft): PracticeResponse {
  if (draft.kind === 'parts') {
    const parts = Object.entries(draft.parts)
      .filter(([, p]) => hasInput(p.draft))
      .map(([id, p]) => {
        const response = partResponse(p.draft);
        return response ? { id, ...(p.alternative ? { alternative: p.alternative } : {}), response } : null;
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);
    return { parts };
  }
  const r = partResponse(draft);
  if (!r) throw new Error('Draft is not ready to submit');
  return r;
}

/** Fisher–Yates with an injectable random source (flashcards shuffle; tests pass a seeded one). */
export function shuffled<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** Moves one item of a list (ordering questions; keyboard and drag share it). */
export function moveItem<T>(list: readonly T[], from: number, to: number): T[] {
  const out = [...list];
  if (from < 0 || from >= out.length) return out;
  const clamped = Math.max(0, Math.min(out.length - 1, to));
  const [item] = out.splice(from, 1);
  out.splice(clamped, 0, item!);
  return out;
}

/** Allowed self-marks: 0 … max in 0.5 steps (PATCH /v1/practice/answers/:id). */
export function selfMarkSteps(max: number): number[] {
  const steps: number[] = [];
  for (let m = 0; m <= max + 1e-9; m += 0.5) steps.push(Math.round(m * 2) / 2);
  return steps;
}
