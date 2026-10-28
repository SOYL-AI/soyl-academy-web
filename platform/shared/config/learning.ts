/**
 * Learning insights numbers (backend-api, 2026-10-28): practice difficulty bands, Khan-style chapter
 * mastery and the private FIFA-style player card. Config, not code (CLAUDE.md rule 4): the formulas in
 * platform/shared/learning/*.ts read only these values. No imports: the web imports this file too.
 *
 * Children's product: everything here is deterministic and explainable. No randomness, no packs, no
 * purchases, nothing gambling-like; the card is private to its owner (never public, D-014/D-039).
 * F-016: streaks are not an input to any rating (no streak pressure); consistency counts active days.
 */

/* Practice difficulty bands ------------------------------------------------------------------------ */

export const DIFFICULTY_BANDS = ['easy', 'medium', 'hard'] as const;
export type DifficultyBand = (typeof DIFFICULTY_BANDS)[number];

/** Content difficulty is an integer 1–5 (content contract); each maps to one band. */
export const DIFFICULTY_BAND_LEVELS: Readonly<Record<DifficultyBand, readonly number[]>> = {
  easy: [1, 2],
  medium: [3],
  hard: [4, 5],
};

/* Mastery (Khan-style chapter levels) -------------------------------------------------------------- */

export const MASTERY_LEVELS = ['not_started', 'attempted', 'familiar', 'proficient', 'mastered'] as const;
export type MasteryLevel = (typeof MASTERY_LEVELS)[number];

export const MASTERY = {
  /**
   * The 0–100 chapter score is the weighted mean of the components a chapter has (0–1 each):
   * lesson parts completed, practice coverage (questions solved / questions in the pool), first-try
   * accuracy (shrunk while there are few answers) and the latest chapter-test percentage. A component
   * the chapter cannot have (no lesson, no practice pool, no chapter test published) is left out and
   * the other weights scale up.
   */
  weights: { lesson: 0.15, coverage: 0.25, accuracy: 0.3, test: 0.3 },
  /** First-try accuracy counts fully once this many questions have a checked first answer (less → scaled down). */
  accuracyFullConfidenceAt: 10,
  /** Gates per level (a level needs all of its gates; levels are checked from the top). */
  levels: {
    familiar: { minScore: 30 },
    /** `minAttempted` is capped at the chapter's practice pool size. */
    proficient: { minScore: 60, minFirstTryAccuracy: 0.7, minAttempted: 10 },
    /** `minTestPct` applies only when the chapter has a published chapter test. */
    mastered: { minScore: 85, minFirstTryAccuracy: 0.8, minCoverage: 0.6, minAttempted: 15, minTestPct: 80 },
  },
} as const;

/* Player card (private, FIFA-Ultimate-Team-inspired) ----------------------------------------------- */

export const CARD_ATTRIBUTES = ['ACC', 'CON', 'SPD', 'BRE', 'MAS', 'TST'] as const;
export type CardAttributeKey = (typeof CARD_ATTRIBUTES)[number];

export const CARD_TIERS = ['bronze', 'silver', 'gold', 'elite'] as const;
export type CardTier = (typeof CARD_TIERS)[number];

export const PLAYER_CARD = {
  /** Bumped whenever a number below changes meaning, so the UI can say "ratings were recalculated". */
  formulaVersion: 1,
  /** Every attribute and the overall rating lie in [floor, ceiling]: value = floor + (ceiling − floor) × raw. */
  floor: 40,
  ceiling: 99,
  attributes: {
    /** Accuracy: first-try accuracy on auto-checked practice questions × confidence (full at `fullConfidenceAt` questions). */
    ACC: { label: 'Accuracy', weight: 0.25, fullConfidenceAt: 30 },
    /** Consistency: IST days with learning activity in the last `windowDays` days, full at `targetActiveDays`. */
    CON: { label: 'Consistency', weight: 0.15, windowDays: 28, targetActiveDays: 16 },
    /**
     * Speed: on test questions answered fully right (auto-graded), expected time ÷ time spent. Rushing
     * is not rewarded past `fastRatio`; `slowRatio` and below rate 0. Omitted below `minItems` items.
     */
    SPD: { label: 'Speed', weight: 0.1, minItems: 10, slowRatio: 0.25, fastRatio: 1.25 },
    /** Breadth: chapters touched (a lesson started or a practice answer), full at `targetChapters`. */
    BRE: { label: 'Breadth', weight: 0.15, targetChapters: 20 },
    /** Mastery: chapter mastery scores summed over touched chapters ÷ max(touched, `minChapters`). */
    MAS: { label: 'Mastery', weight: 0.2, minChapters: 5 },
    /** Tests: mean percentage of the latest graded attempt of each test × confidence (full at `fullConfidenceAt` tests). */
    TST: { label: 'Tests', weight: 0.15, fullConfidenceAt: 3 },
  },
  /** Highest first: the first tier whose `min` the overall reaches. */
  tiers: [
    { tier: 'elite', min: 87 },
    { tier: 'gold', min: 75 },
    { tier: 'silver', min: 60 },
    { tier: 'bronze', min: 0 },
  ],
  /** The card is "provisional" (the UI says "keep learning to settle your rating") below this evidence. */
  provisional: { minCheckedQuestions: 10, minActiveDays: 3 },
} as const satisfies {
  formulaVersion: number;
  floor: number;
  ceiling: number;
  attributes: Record<CardAttributeKey, { label: string; weight: number; [setting: string]: string | number }>;
  tiers: readonly { tier: CardTier; min: number }[];
  provisional: { minCheckedQuestions: number; minActiveDays: number };
};

/* Activity heatmap ------------------------------------------------------------------------------- */

export const ACTIVITY = {
  /** GET /v1/me/activity?days=: default and maximum window (53 weeks fits a full year grid). */
  defaultDays: 365,
  maxDays: 371,
  timezone: 'Asia/Kolkata',
} as const;
