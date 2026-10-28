/**
 * Mastery levels in the UI (Khan Academy style): not started → attempted → familiar → proficient → mastered.
 * The formula is the shared one (platform/shared/learning/mastery.ts, the same the API uses for GET
 * /v1/me/mastery), so a guest's device progress and a member's server progress show the same level for the
 * same evidence. This module adds the words and the evidence we can build in the browser.
 */
import { chapterMastery, EMPTY_EVIDENCE, MASTERY_LEVELS, subjectMastery, type ChapterEvidence, type MasteryHint, type MasteryLevel } from '@/platform/shared/learning/mastery';

export { MASTERY_LEVELS, chapterMastery, subjectMastery };
export type { ChapterEvidence, MasteryHint, MasteryLevel };

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  not_started: 'Not started',
  attempted: 'Attempted',
  familiar: 'Familiar',
  proficient: 'Proficient',
  mastered: 'Mastered',
};

export const MASTERY_HINT_TEXT: Record<MasteryHint, string> = {
  finish_lesson: 'Finish the lesson',
  practice_more: 'Solve more practice questions',
  improve_accuracy: 'Get more right on the first try',
  take_chapter_test: 'Take the chapter test',
  improve_chapter_test: 'Score 80% or more in the chapter test',
};

export function isMasteryLevel(v: unknown): v is MasteryLevel {
  return typeof v === 'string' && (MASTERY_LEVELS as readonly string[]).includes(v);
}

/** Chapters per level, in level order (segmented bars). */
export function masteryCounts(levels: readonly MasteryLevel[]): Record<MasteryLevel, number> {
  const out = Object.fromEntries(MASTERY_LEVELS.map((l) => [l, 0])) as Record<MasteryLevel, number>;
  for (const l of levels) out[l] += 1;
  return out;
}

/**
 * Practice pool size assumed when a page does not know a chapter's real one (CONTEXT §8: about 60 questions per
 * chapter), so one right answer never reads as full coverage. Members' levels come from the API instead.
 */
export const ASSUMED_PRACTICE_POOL = 60;

/** What the browser knows about one chapter (device progress or GET /v1/me/progress). */
export interface BrowserChapterActivity {
  lessonPartsStarted: number;
  lessonPartsCompleted: number;
  /** Distinct questions answered / answered right (the latest answer per question on a device). */
  answered: number;
  correct: number;
}

/**
 * Evidence for the shared formula from browser data. Totals come from the page when it knows them (the hub
 * knows the deck parts and the practice pool); otherwise what was touched stands in. First-try accuracy is
 * approximated by the kept answers (a device stores one answer per question).
 */
export function evidenceFrom(a: BrowserChapterActivity | null | undefined, totals: { lessonParts?: number; practiceTotal?: number; chapterTestAvailable?: boolean } = {}): ChapterEvidence {
  if (!a) return { ...EMPTY_EVIDENCE, lessonParts: totals.lessonParts ?? 0, practiceTotal: totals.practiceTotal ?? 0, chapterTestAvailable: false };
  const lessonParts = totals.lessonParts ?? Math.max(a.lessonPartsStarted, a.lessonPartsCompleted);
  const practiceTotal = totals.practiceTotal ?? (a.answered > 0 ? Math.max(a.answered, ASSUMED_PRACTICE_POOL) : 0);
  return {
    lessonParts,
    lessonPartsStarted: a.lessonPartsStarted,
    lessonPartsCompleted: a.lessonPartsCompleted,
    practiceTotal,
    practiceAttempted: a.answered,
    practiceSolved: a.correct,
    firstTryChecked: a.answered,
    firstTryCorrect: a.correct,
    // The browser never knows a chapter-test score here; leaving the test out keeps the level honest.
    chapterTestAvailable: false,
    chapterTestPct: null,
  };
}
