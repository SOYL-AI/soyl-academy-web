/**
 * Pipeline settings. Tune here (config, not code). Editorial targets live in
 * platform/shared/config/content-targets.ts; model tiers and prices in platform/shared/config/models.ts.
 */
import type { QuestionType } from '@soyl/shared/content/index';
import type { Family } from './families';

export const BUDGET = {
  /** CONTENT_BUDGET_INR: cap per pipeline run (ARCHITECTURE §8.2). */
  runEnv: 'CONTENT_BUDGET_INR',
  runDefaultInr: 25_000,
  /** CONTENT_BUDGET_TOTAL_INR: cap across all runs (real spend only; mock spend is simulated and tracked apart). */
  totalEnv: 'CONTENT_BUDGET_TOTAL_INR',
  totalDefaultInr: 300_000,
} as const;

export const RETRIES = {
  /** Automatic retries of a failed item within a run; after that the item is needs_review (AGENTS §5.3). */
  maxAutoRetries: 2,
} as const;

export const GENERATION = {
  /** Practice questions per model call. */
  questionsPerBatch: 15,
  /** Case/source passages per model call. */
  casesPerBatch: 4,
  /** Default concurrency for model calls (units × items). */
  concurrency: 4,
  /** Slide budget per part; chapters whose plan exceeds this are split into parts. */
  slidesPerPartMax: 22,
  /** Fixed slides per deck part besides concept slides: title, 2 examples, 3 checks, summary, exam tips. */
  fixedSlidesPerPart: 8,
  /** Concept/diagram slides per topic. */
  slidesPerTopic: 2,
  /** Few-shot JSON included in a prompt is truncated to this many characters. */
  fewShotMaxChars: 24_000,
} as const;

/**
 * Expected output tokens per generated unit of content, for dry-run estimates. Reasoning tokens
 * are billed as output; `reasoningOverhead` adds them as a fraction of visible output.
 */
export const OUTPUT_TOKENS = {
  outlinePerSlide: 45,
  outlineBase: 400,
  deckPerSlide: 230,
  deckBase: 300,
  checkQuestion: 260,
  notesPerTopic: 520,
  notesBase: 500,
  flashcard: 70,
  question: { default: 330, long: 650, 'case-based': 1_100, 'source-based': 1_100 } as Partial<Record<QuestionType | 'default', number>>,
  reasoningOverhead: 0.35,
} as const;

/** Practice mix used when a subject has no blueprint yet (shares of the practice total). */
export const DEFAULT_TYPE_MIX: Record<'stem' | 'humanities' | 'language' | 'computing', { type: QuestionType; share: number; marks: number }[]> = {
  stem: [
    { type: 'mcq', share: 0.3, marks: 1 },
    { type: 'assertion-reason', share: 0.1, marks: 1 },
    { type: 'fill-blank', share: 0.05, marks: 1 },
    { type: 'true-false', share: 0.05, marks: 1 },
    { type: 'numerical', share: 0.1, marks: 2 },
    { type: 'short', share: 0.2, marks: 3 },
    { type: 'long', share: 0.1, marks: 5 },
    { type: 'case-based', share: 0.1, marks: 4 },
  ],
  humanities: [
    { type: 'mcq', share: 0.3, marks: 1 },
    { type: 'assertion-reason', share: 0.1, marks: 1 },
    { type: 'match', share: 0.05, marks: 1 },
    { type: 'fill-blank', share: 0.05, marks: 1 },
    { type: 'short', share: 0.25, marks: 3 },
    { type: 'long', share: 0.1, marks: 5 },
    { type: 'source-based', share: 0.075, marks: 4 },
    { type: 'case-based', share: 0.075, marks: 4 },
  ],
  language: [
    { type: 'mcq', share: 0.3, marks: 1 },
    { type: 'fill-blank', share: 0.15, marks: 1 },
    { type: 'match', share: 0.05, marks: 1 },
    { type: 'true-false', share: 0.05, marks: 1 },
    { type: 'short', share: 0.25, marks: 3 },
    { type: 'long', share: 0.1, marks: 5 },
    { type: 'source-based', share: 0.1, marks: 4 },
  ],
  computing: [
    { type: 'mcq', share: 0.3, marks: 1 },
    { type: 'assertion-reason', share: 0.1, marks: 1 },
    { type: 'fill-blank', share: 0.1, marks: 1 },
    { type: 'true-false', share: 0.05, marks: 1 },
    { type: 'short', share: 0.25, marks: 2 },
    { type: 'long', share: 0.1, marks: 4 },
    { type: 'case-based', share: 0.1, marks: 4 },
  ],
};

export function mixKindFor(family: Family): keyof typeof DEFAULT_TYPE_MIX {
  switch (family) {
    case 'maths':
    case 'physics':
    case 'chemistry':
    case 'biology':
    case 'science':
      return 'stem';
    case 'computer-science':
      return 'computing';
    case 'english-language':
    case 'english-literature':
    case 'hindi-language':
    case 'hindi-literature':
      return 'language';
    default:
      return 'humanities';
  }
}

/** Shares of the practice total by difficulty 1–5 and by competency. */
export const DIFFICULTY_MIX = [0.15, 0.25, 0.3, 0.2, 0.1] as const;
export const COMPETENCY_MIX = { recall: 0.2, understanding: 0.3, application: 0.3, analysis: 0.15, evaluation: 0.05 } as const;

/** Banned-content settings for lint (student-facing text). */
export const BANNED = {
  /** Extra words can be added via the CONTENT_PROFANITY_LIST env var (path to a newline-separated file). */
  profanity: ['fuck', 'shit', 'bitch', 'bastard', 'asshole', 'chutiya', 'madarchod', 'behenchod', 'bhosdi', 'randi'],
  profanityEnv: 'CONTENT_PROFANITY_LIST',
} as const;

/** Literature reproduction heuristic (CONTEXT §8: never reproduce poems, stories or play text). */
export const LITERATURE = {
  maxQuotedWords: 25,
  /** More than this many consecutive short lines looks like reproduced verse. */
  maxVerseLines: 4,
  verseLineMaxWords: 9,
} as const;
