/**
 * Mastery levels (Khan Academy style): not started → attempted → familiar → proficient → mastered.
 * Pure and deterministic, so the same rules show a guest's device progress and a member's server progress.
 * When the API sends a level (GET /v1/me/progress, learning-insights), the UI shows the API's level; this
 * function is the guest fallback and must stay equivalent to the shared one in platform/shared.
 */
export const MASTERY_LEVELS = ['not_started', 'attempted', 'familiar', 'proficient', 'mastered'] as const;
export type MasteryLevel = (typeof MASTERY_LEVELS)[number];

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  not_started: 'Not started',
  attempted: 'Attempted',
  familiar: 'Familiar',
  proficient: 'Proficient',
  mastered: 'Mastered',
};

/** Mastery points per level (subject percentage = average over its chapters). */
export const MASTERY_POINTS: Record<MasteryLevel, number> = { not_started: 0, attempted: 10, familiar: 50, proficient: 80, mastered: 100 };

export interface ChapterActivity {
  /** Lesson parts started / completed (0 when the chapter has no lesson). */
  lessonPartsStarted: number;
  lessonPartsCompleted: number;
  lessonParts: number;
  /** Distinct practice questions answered / answered correctly, and the chapter's practice total (0 = unknown). */
  answered: number;
  correct: number;
  practiceTotal: number;
}

export function masteryLevel(a: ChapterActivity): MasteryLevel {
  const any = a.lessonPartsStarted > 0 || a.lessonPartsCompleted > 0 || a.answered > 0;
  if (!any) return 'not_started';
  const accuracy = a.answered > 0 ? a.correct / a.answered : 0;
  const total = a.practiceTotal > 0 ? a.practiceTotal : Math.max(a.answered, 1);
  const coverage = a.correct / total;
  const lessonDone = a.lessonParts === 0 || a.lessonPartsCompleted >= a.lessonParts;
  if (coverage >= 0.7 && accuracy >= 0.85 && lessonDone) return 'mastered';
  if (coverage >= 0.4 && accuracy >= 0.7) return 'proficient';
  if (a.correct >= 3 && accuracy >= 0.5) return 'familiar';
  if (lessonDone && a.lessonParts > 0 && a.answered === 0) return 'familiar';
  return 'attempted';
}

export function isMasteryLevel(v: unknown): v is MasteryLevel {
  return typeof v === 'string' && (MASTERY_LEVELS as readonly string[]).includes(v);
}

/** Count of chapters per level, in level order (for segmented bars). */
export function masteryCounts(levels: readonly MasteryLevel[]): Record<MasteryLevel, number> {
  const out = { not_started: 0, attempted: 0, familiar: 0, proficient: 0, mastered: 0 } as Record<MasteryLevel, number>;
  for (const l of levels) out[l] += 1;
  return out;
}

/** 0–100: average mastery points over chapters. */
export function masteryPercent(levels: readonly MasteryLevel[]): number {
  if (levels.length === 0) return 0;
  return Math.round(levels.reduce((n, l) => n + MASTERY_POINTS[l], 0) / levels.length);
}
