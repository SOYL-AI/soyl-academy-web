/**
 * Gamification numbers (ARCHITECTURE §12, CONTEXT §11). No imports: the web may show the same values.
 * Owner: backend-api. XP is written by the API on lesson completion and correct practice; streaks are
 * counted in IST calendar days (GEN-6) with one streak freeze per IST week (Monday–Sunday).
 *
 * D-014: XP, streaks and badges are part of the learning feature itself (not consent-gated);
 * leaderboards, leagues and rank cards are consent-gated and arrive in M3+.
 * F-016: no streak-anxiety notifications for under-18s without owner sign-off (none exist yet).
 */

export const XP_AWARDS = {
  /** First completion of a lesson deck part (a chapter with two parts can earn this twice). */
  lessonCompleted: 10,
  /** First correct auto-graded answer to a practice question (per question, ever). */
  practiceFirstCorrect: 2,
  /**
   * First graded submission of a test (per test, ever), when at least `testMinAnsweredShare` of the
   * items were answered (an empty paper earns nothing). Custom tests earn less: they can be built at will.
   */
  testSubmitted: 20,
  customTestSubmitted: 5,
  /** Live All-India mock participation (per event). */
  liveTestSubmitted: 40,
  /** Every auto-graded item fully correct, with at least `perfectMinAutoMarks` auto-graded marks (per test, ever). */
  testPerfectBonus: 20,
} as const;

/** Share of a test's items that must be answered for test XP; minimum auto-graded marks for "perfect". */
export const TEST_XP_RULES = { testMinAnsweredShare: 0.5, perfectMinAutoMarks: 10 } as const;

/**
 * Level thresholds: level n (1-based) starts at LEVEL_THRESHOLDS[n - 1] total XP. Past the last
 * threshold, each further level needs LEVEL_STEP_AFTER_LAST more XP.
 */
export const LEVEL_THRESHOLDS: readonly number[] = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000];
export const LEVEL_STEP_AFTER_LAST = 800;

export function levelForXp(totalXp: number): { level: number; levelStartXp: number; nextLevelXp: number } {
  const xp = Math.max(0, Math.floor(totalXp));
  let i = 0;
  while (i + 1 < LEVEL_THRESHOLDS.length && xp >= LEVEL_THRESHOLDS[i + 1]!) i++;
  if (i + 1 < LEVEL_THRESHOLDS.length) return { level: i + 1, levelStartXp: LEVEL_THRESHOLDS[i]!, nextLevelXp: LEVEL_THRESHOLDS[i + 1]! };
  const last = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]!;
  const extra = Math.floor((xp - last) / LEVEL_STEP_AFTER_LAST);
  const start = last + extra * LEVEL_STEP_AFTER_LAST;
  return { level: LEVEL_THRESHOLDS.length + extra, levelStartXp: start, nextLevelXp: start + LEVEL_STEP_AFTER_LAST };
}

export const STREAK = {
  /** A missed IST day is covered automatically by a freeze, at most this many per IST week. */
  freezesPerWeek: 1,
} as const;

export type BadgeCriterion =
  | { kind: 'lessons_completed'; count: number }
  | { kind: 'practice_correct'; count: number }
  | { kind: 'streak_days'; count: number }
  | { kind: 'chapters_mastered'; count: number; accuracy: number; minAnswered: number }
  /** Different tests submitted and graded (M3). */
  | { kind: 'tests_submitted'; count: number }
  /** Tests with every auto-graded item correct (TEST_XP_RULES.perfectMinAutoMarks or more auto marks). */
  | { kind: 'perfect_scores'; count: number }
  /** Consecutive IST days with a submitted test. */
  | { kind: 'test_day_streak'; count: number };

export interface BadgeDefinition {
  key: string;
  name: string;
  description: string;
  /** Icon name from the platform UI kit. */
  icon: string;
  criteria: BadgeCriterion;
}

/** Evaluated after XP-earning events: by the API, and by the worker for attempts it auto-submits (M3). */
export const BADGES: readonly BadgeDefinition[] = [
  { key: 'first-lesson', name: 'First lesson', description: 'Finish your first lesson.', icon: 'book-open', criteria: { kind: 'lessons_completed', count: 1 } },
  { key: 'lessons-10', name: 'Bookworm', description: 'Finish 10 lessons.', icon: 'books', criteria: { kind: 'lessons_completed', count: 10 } },
  { key: 'first-correct', name: 'Off the mark', description: 'Get your first practice question right.', icon: 'check', criteria: { kind: 'practice_correct', count: 1 } },
  { key: 'practice-50', name: 'Practice makes progress', description: 'Get 50 different practice questions right.', icon: 'target', criteria: { kind: 'practice_correct', count: 50 } },
  { key: 'practice-250', name: 'Question crusher', description: 'Get 250 different practice questions right.', icon: 'trophy', criteria: { kind: 'practice_correct', count: 250 } },
  { key: 'streak-3', name: 'On a roll', description: 'Learn on 3 days in a row.', icon: 'flame', criteria: { kind: 'streak_days', count: 3 } },
  { key: 'streak-7', name: 'Week warrior', description: 'Learn on 7 days in a row.', icon: 'flame', criteria: { kind: 'streak_days', count: 7 } },
  {
    key: 'chapter-master',
    name: 'Chapter master',
    description: 'Answer at least 20 practice questions in a chapter with 80% accuracy.',
    icon: 'star',
    criteria: { kind: 'chapters_mastered', count: 1, accuracy: 0.8, minAnswered: 20 },
  },
  { key: 'first-test', name: 'Test taker', description: 'Submit your first test.', icon: 'clipboard-check', criteria: { kind: 'tests_submitted', count: 1 } },
  { key: 'tests-10', name: 'Exam ready', description: 'Submit 10 different tests.', icon: 'clipboard-list', criteria: { kind: 'tests_submitted', count: 10 } },
  { key: 'perfect-score', name: 'Perfect paper', description: 'Get every auto-marked question in a test right.', icon: 'medal', criteria: { kind: 'perfect_scores', count: 1 } },
  { key: 'test-streak-3', name: 'Test streak', description: 'Submit a test on 3 days in a row.', icon: 'calendar-check', criteria: { kind: 'test_day_streak', count: 3 } },
];

/* ------------------------------------------------------------------------------------------------
 * Weekly leagues (ARCHITECTURE §12, CONTEXT §11; backend-api M5). Consent-gated (D-014): only students
 * whose consent is `granted` play, and standings show the auto-generated public name only (D-039, F-017, AC-18).
 *
 * A league week is an IST week (Monday 00:00 – Sunday 23:59:59 IST). Students are grouped by cohort
 * (class leagues: board + class, e.g. `cbse-10`), then by tier, into divisions of at most `size`.
 * League XP is the XP earned in that IST week (xp_events). When the week ends, the top `promoteShare`
 * of a division move up a tier and the bottom `relegateShare` move down (no promotion from the top
 * tier, no relegation from the bottom tier); nobody is promoted with 0 XP.
 * ---------------------------------------------------------------------------------------------- */

export interface LeagueTier {
  key: string;
  name: string;
  /** Icon name from the platform UI kit. */
  icon: string;
}

/** Lowest first. Tier numbers in the API are 1-based positions in this list. */
export const LEAGUE_TIERS: readonly LeagueTier[] = [
  { key: 'bronze', name: 'Bronze', icon: 'shield' },
  { key: 'silver', name: 'Silver', icon: 'shield' },
  { key: 'gold', name: 'Gold', icon: 'shield' },
  { key: 'sapphire', name: 'Sapphire', icon: 'gem' },
  { key: 'diamond', name: 'Diamond', icon: 'gem' },
];

export const LEAGUES = {
  /** Most students in one division. Divisions formed by the weekly job are balanced and leave room for late joiners. */
  size: 30,
  /** Share of a division promoted / relegated at the end of the week (30 → 5 up, 5 down). */
  promoteShare: 1 / 6,
  relegateShare: 1 / 6,
  /** Smaller divisions keep at least one promotion place; relegation needs at least this many students. */
  minSizeForRelegation: 6,
  /** Promotion needs at least this much XP in the week. */
  minXpToPromote: 1,
  /** Scopes the API serves now; school and city leagues are opt-in and arrive later (D-014). */
  liveScopes: ['class'] as readonly string[],
  /**
   * The worker job `leagues.weekly` runs hourly at :35 UTC (= :05 IST, so the first run of a week is Monday
   * 00:05 IST). It closes ended leagues and forms the current week for returning students; once the
   * week is formed a run is a no-op, so the hourly runs are catch-ups after an outage.
   */
  cron: '35 * * * *',
} as const;

/** Promotion / relegation places for a division of `n` students in tier `tier` (1-based). */
export function leagueZones(n: number, tier: number): { promote: number; relegate: number } {
  const top = tier >= LEAGUE_TIERS.length;
  const bottom = tier <= 1;
  const promote = top || n < 2 ? 0 : Math.max(1, Math.floor(n * LEAGUES.promoteShare));
  const relegate = bottom || n < LEAGUES.minSizeForRelegation ? 0 : Math.max(1, Math.floor(n * LEAGUES.relegateShare));
  return { promote, relegate };
}
