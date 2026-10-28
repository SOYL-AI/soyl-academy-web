/**
 * Khan-style chapter mastery (pure; no I/O). The API computes it from stored progress for members
 * (GET /v1/me/mastery); the web computes it from the device's guest progress with the same function,
 * so a guest and a member with the same evidence see the same level. Numbers: ../config/learning.ts.
 */
import { DIFFICULTY_BAND_LEVELS, DIFFICULTY_BANDS, MASTERY, MASTERY_LEVELS, type DifficultyBand, type MasteryLevel } from '../config/learning';

export type { DifficultyBand, MasteryLevel };
export { MASTERY_LEVELS, DIFFICULTY_BANDS };

/** What we know about one student in one chapter. Counts are distinct questions / deck parts. */
export interface ChapterEvidence {
  /** Deck parts the chapter has (0 = no lesson published). */
  lessonParts: number;
  lessonPartsStarted: number;
  lessonPartsCompleted: number;
  /** Questions in the chapter's practice pool (0 = none published). */
  practiceTotal: number;
  /** Questions answered at least once. */
  practiceAttempted: number;
  /** Questions answered right at least once (auto-checked right, or self-marked full marks). */
  practiceSolved: number;
  /** Questions whose first auto-checked answer exists, and how many of those first answers were right. */
  firstTryChecked: number;
  firstTryCorrect: number;
  /** Whether the chapter has a published chapter test, and the latest graded chapter-test percentage (0–100). */
  chapterTestAvailable: boolean;
  chapterTestPct: number | null;
}

export const EMPTY_EVIDENCE: Readonly<ChapterEvidence> = Object.freeze({
  lessonParts: 0,
  lessonPartsStarted: 0,
  lessonPartsCompleted: 0,
  practiceTotal: 0,
  practiceAttempted: 0,
  practiceSolved: 0,
  firstTryChecked: 0,
  firstTryCorrect: 0,
  chapterTestAvailable: false,
  chapterTestPct: null,
});

/** What to do next to reach the next level (machine codes; the UI writes the words). */
export const MASTERY_HINTS = ['finish_lesson', 'practice_more', 'improve_accuracy', 'take_chapter_test', 'improve_chapter_test'] as const;
export type MasteryHint = (typeof MASTERY_HINTS)[number];

export interface MasteryComponents {
  /** Each 0–1 (3 decimals), or null when the chapter cannot have it. */
  lesson: number | null;
  coverage: number | null;
  accuracy: number | null;
  test: number | null;
}

export interface ChapterMastery {
  level: MasteryLevel;
  /** 0–100. */
  score: number;
  components: MasteryComponents;
  /** Raw first-try accuracy (0–1), null before any checked answer. */
  firstTryAccuracy: number | null;
  nextLevel: MasteryLevel | null;
  /** Empty at `mastered`. */
  hints: MasteryHint[];
}

const clamp01 = (x: number) => (Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0);
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const nonNeg = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 0);

/** Clamps inconsistent evidence (e.g. content retired after it was solved) instead of trusting it. */
export function normalizeEvidence(e: ChapterEvidence): ChapterEvidence {
  const lessonParts = nonNeg(e.lessonParts);
  const practiceTotal = nonNeg(e.practiceTotal);
  const practiceAttempted = nonNeg(e.practiceAttempted);
  const firstTryChecked = nonNeg(e.firstTryChecked);
  const pct = e.chapterTestPct === null || !Number.isFinite(e.chapterTestPct) ? null : Math.min(100, Math.max(0, e.chapterTestPct));
  return {
    lessonParts,
    lessonPartsStarted: nonNeg(e.lessonPartsStarted),
    lessonPartsCompleted: nonNeg(e.lessonPartsCompleted),
    practiceTotal,
    practiceAttempted,
    practiceSolved: Math.min(nonNeg(e.practiceSolved), practiceAttempted),
    firstTryChecked,
    firstTryCorrect: Math.min(nonNeg(e.firstTryCorrect), firstTryChecked),
    // A graded chapter test proves one exists even if it has since been retired.
    chapterTestAvailable: e.chapterTestAvailable || pct !== null,
    chapterTestPct: pct,
  };
}

export function hasAnyEvidence(e: ChapterEvidence): boolean {
  return e.lessonPartsStarted > 0 || e.lessonPartsCompleted > 0 || e.practiceAttempted > 0 || e.chapterTestPct !== null;
}

export function masteryComponents(e: ChapterEvidence): MasteryComponents {
  const conf = clamp01(e.firstTryChecked / MASTERY.accuracyFullConfidenceAt);
  return {
    lesson: e.lessonParts > 0 ? r3(clamp01(e.lessonPartsCompleted / e.lessonParts)) : null,
    coverage: e.practiceTotal > 0 ? r3(clamp01(e.practiceSolved / e.practiceTotal)) : null,
    // Shrunk toward 0 while there are few answers: 1 right out of 1 is not yet proof.
    accuracy: e.practiceTotal > 0 ? r3(e.firstTryChecked ? clamp01(e.firstTryCorrect / e.firstTryChecked) * conf : 0) : null,
    test: e.chapterTestAvailable ? r3(clamp01((e.chapterTestPct ?? 0) / 100)) : null,
  };
}

/** Weighted mean of the components the chapter has, 0–100 (0 when it has none). */
export function masteryScore(c: MasteryComponents): number {
  let sum = 0;
  let weights = 0;
  for (const k of ['lesson', 'coverage', 'accuracy', 'test'] as const) {
    const v = c[k];
    if (v === null) continue;
    sum += MASTERY.weights[k] * v;
    weights += MASTERY.weights[k];
  }
  return weights ? Math.round((100 * sum) / weights) : 0;
}

interface Ctx {
  e: ChapterEvidence;
  c: MasteryComponents;
  score: number;
  acc: number | null;
}

/** Hints for the gates of `level` that are not met yet (empty = reached). */
function missing(level: Exclude<MasteryLevel, 'not_started'>, x: Ctx): MasteryHint[] {
  const { e, c, score, acc } = x;
  const hints = new Set<MasteryHint>();
  const hasPool = e.practiceTotal > 0;
  /** Which components would raise the score. */
  const scoreHints = () => {
    if (c.lesson !== null && c.lesson < 1) hints.add('finish_lesson');
    if (c.coverage !== null && c.coverage < 1) hints.add('practice_more');
    if (c.test !== null && e.chapterTestPct === null) hints.add('take_chapter_test');
    else if (c.test !== null && c.test < 1) hints.add('improve_chapter_test');
  };
  if (level === 'attempted') {
    if (!hasAnyEvidence(e)) {
      if (e.lessonParts > 0) hints.add('finish_lesson');
      if (hasPool) hints.add('practice_more');
      if (e.chapterTestAvailable) hints.add('take_chapter_test');
    }
    return [...hints];
  }
  const g = MASTERY.levels[level];
  if (score < g.minScore) scoreHints();
  if ('minAttempted' in g && hasPool && e.practiceAttempted < Math.min(g.minAttempted, e.practiceTotal)) hints.add('practice_more');
  if ('minFirstTryAccuracy' in g && hasPool && (acc === null || acc < g.minFirstTryAccuracy)) hints.add(acc === null ? 'practice_more' : 'improve_accuracy');
  if ('minCoverage' in g && hasPool && (c.coverage ?? 0) < g.minCoverage) hints.add('practice_more');
  if ('minTestPct' in g && e.chapterTestAvailable && (e.chapterTestPct ?? -1) < g.minTestPct) hints.add(e.chapterTestPct === null ? 'take_chapter_test' : 'improve_chapter_test');
  // A failing score gate with nothing left to improve cannot happen (all components at 1 → 100).
  if (score < g.minScore && hints.size === 0) hints.add('practice_more');
  return [...hints].sort((a, b) => MASTERY_HINTS.indexOf(a) - MASTERY_HINTS.indexOf(b));
}

/**
 * The chapter's level, score and what to do next.
 * - not_started: no lesson opened, no practice answer, no graded chapter test.
 * - attempted: some evidence, below familiar.
 * - familiar / proficient / mastered: every gate of MASTERY.levels[level] met (checked from the top).
 */
export function chapterMastery(evidence: ChapterEvidence): ChapterMastery {
  const e = normalizeEvidence(evidence);
  const c = masteryComponents(e);
  const score = masteryScore(c);
  const acc = e.firstTryChecked ? r3(e.firstTryCorrect / e.firstTryChecked) : null;
  const ctx: Ctx = { e, c, score, acc };
  let level: MasteryLevel = 'not_started';
  if (hasAnyEvidence(e)) {
    level = 'attempted';
    for (const l of ['mastered', 'proficient', 'familiar'] as const)
      if (missing(l, ctx).length === 0) {
        level = l;
        break;
      }
  }
  const idx = MASTERY_LEVELS.indexOf(level);
  const nextLevel = idx < MASTERY_LEVELS.length - 1 ? MASTERY_LEVELS[idx + 1]! : null;
  return { level, score: hasAnyEvidence(e) ? score : 0, components: c, firstTryAccuracy: acc, nextLevel, hints: nextLevel ? missing(nextLevel as Exclude<MasteryLevel, 'not_started'>, ctx) : [] };
}

export interface SubjectMastery {
  /** Mean chapter score over every chapter of the subject (untouched chapters count 0), 0–100. */
  score: number;
  chapterCount: number;
  levels: Record<MasteryLevel, number>;
}

/** Subject aggregate over all of its chapters (pass every catalog chapter, untouched ones included). */
export function subjectMastery(chapters: readonly Pick<ChapterMastery, 'level' | 'score'>[]): SubjectMastery {
  const levels = Object.fromEntries(MASTERY_LEVELS.map((l) => [l, 0])) as Record<MasteryLevel, number>;
  let sum = 0;
  for (const ch of chapters) {
    levels[ch.level]++;
    sum += ch.score;
  }
  return { score: chapters.length ? Math.round(sum / chapters.length) : 0, chapterCount: chapters.length, levels };
}

/** Practice difficulty (content 1–5) → band; out-of-range values fall into the nearest band. */
export function difficultyBand(difficulty: number): DifficultyBand {
  const d = Math.min(5, Math.max(1, Math.round(Number.isFinite(difficulty) ? difficulty : 3)));
  return DIFFICULTY_BANDS.find((b) => DIFFICULTY_BAND_LEVELS[b].includes(d)) ?? 'medium';
}

/** Content difficulty levels (1–5) in a band. */
export const difficultiesIn = (band: DifficultyBand): readonly number[] => DIFFICULTY_BAND_LEVELS[band];
