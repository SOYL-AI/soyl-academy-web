/**
 * Age stages (design language v3, ADR-032): ONE design system with a quiet knob for the student's age.
 *
 * - junior: Classes 7–8. Warmer and roomier: bigger tiles, rounder cards, a larger greeting, more avatar and
 *   playful (never childish) microcopy.
 * - middle: Classes 9–10 (default). Balanced, board-exam aware.
 * - senior: Classes 11–12. Denser and calmer: exam and stream focus, fewer flourishes.
 *
 * The shell puts `data-stage` on its root (tokens.css retunes the --p-stage-* tokens) and exposes the stage through
 * useStage() (StageProvider.tsx). Server components that know the class (URL params) call stageForClass().
 * No imports: server, client and tests share this module.
 */
export type Stage = 'junior' | 'middle' | 'senior';
export const STAGES: readonly Stage[] = ['junior', 'middle', 'senior'];
export const DEFAULT_STAGE: Stage = 'middle';

/** Class (7–12) → stage; anything else (null, out of range) → the default (middle). */
export function stageForClass(classLevel: number | null | undefined): Stage {
  if (typeof classLevel !== 'number' || !Number.isInteger(classLevel)) return DEFAULT_STAGE;
  if (classLevel >= 7 && classLevel <= 8) return 'junior';
  if (classLevel >= 11 && classLevel <= 12) return 'senior';
  if (classLevel >= 9 && classLevel <= 10) return 'middle';
  return DEFAULT_STAGE;
}

/**
 * The class a course URL is about: /learn/{board}/{class}/… and /tests/series/{board}/{class}/…; null elsewhere.
 * Only 7–12 count (ignores /learn/cbse/ch01-style mistakes).
 */
export function classFromPath(pathname: string | null | undefined): number | null {
  if (!pathname) return null;
  const m = /^\/(?:learn|tests\/series)\/[a-z]+\/(\d{1,2})(?:\/|$)/.exec(pathname);
  if (!m) return null;
  const n = Number(m[1]);
  return n >= 7 && n <= 12 ? n : null;
}

/**
 * The stage for a page: a member's own class wins (the student's age sets the tone on every page, also when they
 * browse another class), then the class in a course URL (guests on /learn/{board}/{class}/…), then middle.
 */
export function resolveStage({ pathname, memberClass }: { pathname?: string | null; memberClass?: number | null }): { stage: Stage; classLevel: number | null; source: 'url' | 'profile' | 'default' } {
  if (typeof memberClass === 'number' && memberClass >= 7 && memberClass <= 12) return { stage: stageForClass(memberClass), classLevel: memberClass, source: 'profile' };
  const fromUrl = classFromPath(pathname);
  if (fromUrl !== null) return { stage: stageForClass(fromUrl), classLevel: fromUrl, source: 'url' };
  return { stage: DEFAULT_STAGE, classLevel: null, source: 'default' };
}

/** Pick a value per stage (copy, sizes, counts): `byStage(stage, { junior: 'Nice one!', middle: 'Good work', senior: 'Done' })`. */
export function byStage<T>(stage: Stage, values: { junior: T; middle: T; senior: T }): T {
  return values[stage];
}
