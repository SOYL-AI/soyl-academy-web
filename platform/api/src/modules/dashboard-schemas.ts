/**
 * Student dashboard contract (backend-api, 2026-10-28): GET /v1/me/dashboard. Everything a progress
 * dashboard needs that GET /v1/me/activity (heatmap, streak), /v1/me/mastery (per-subject chapter
 * levels) and /v1/me/card (level, XP, coins, rating) do not already return. Computed on read from
 * stored progress; numbers in @soyl/shared/config/learning (DASHBOARD); formulas in
 * @soyl/shared/learning/{dashboard,mastery}. No answer keys or question content (DB-6): only counts,
 * titles and ids.
 */
import { z } from 'zod/v4';
import { DASHBOARD, MASTERY_LEVELS, WEEKLY_GOAL_METRICS } from '@soyl/shared/config/learning';
import { TestKind } from '@soyl/shared/content/test';
import { BoardSchema, ClassLevelSchema } from '../schemas';
import { MasteryLevelSchema } from './insights-schemas';
import { SchoolSchema, SchoolStatusSchema } from './schools-schemas';

const Int = z.number().int();
const Count = Int.min(0);
const Day = z.iso.date();
const Pct = z.number().min(0).max(100);
const Ratio = z.number().min(0).max(1);

const DayRangeSchema = z.object({ from: Day, to: Day }).meta({ id: 'DayRange', description: 'IST calendar days, both inclusive.' });

/* Profile ----------------------------------------------------------------------------------------- */

export const PROFILE_FIELDS = ['board', 'classLevel', 'school'] as const;

export const DashboardProfileSchema = z
  .object({
    board: BoardSchema.nullable(),
    classLevel: ClassLevelSchema.nullable(),
    /** Null unless consent is granted and a school is saved (D-014). */
    school: SchoolSchema.nullable(),
    schoolStatus: SchoolStatusSchema,
    /** Fields the UI can prompt for, in this order. `school` is listed only when consent is granted. */
    missing: z.array(z.enum(PROFILE_FIELDS)),
  })
  .meta({ id: 'DashboardProfile' });

/* Totals ----------------------------------------------------------------------------------------- */

const WeekCounts = z.object({ allTime: Count, thisWeek: Count, lastWeek: Count });

const AccuracyWindow = z
  .object({
    from: Day,
    to: Day,
    /** Auto-checked practice answers in the window (every attempt, right or wrong). */
    checked: Count,
    /** Of those, answered right. (Not named `correct`: the DB-6 leak scan reserves that key for answer keys.) */
    right: Count,
    /** right ÷ checked, null when nothing was checked. */
    accuracy: Ratio.nullable(),
  })
  .meta({ id: 'AccuracyWindow' });

export const DashboardTotalsSchema = z
  .object({
    /** Practice questions solved (D-042: auto-checked right or self-marked full marks), counted on the IST day first solved. */
    solved: WeekCounts,
    /** Practice answers saved (every attempt). */
    answered: WeekCounts,
    /** The last 7 IST days (today included) and the 7 before. */
    accuracy: z.object({ recent: AccuracyWindow, previous: AccuracyWindow }),
    /** Lesson deck parts finished for the first time. */
    lessonsCompleted: WeekCounts,
    tests: z.object({
      /** Attempts submitted (incl. auto-submitted at the deadline). */
      submitted: WeekCounts,
      /** Different tests with a submitted attempt. */
      distinctTests: Count,
      /** Mean and best score ÷ max over every graded attempt (0–100, 1 decimal); null before any. */
      averagePct: Pct.nullable(),
      bestPct: Pct.nullable(),
    }),
    /** IST days with a practice answer, a lesson part finished or a test submitted (same as the heatmap). */
    activeDays: z.object({ thisWeek: Count, lastWeek: Count, allTime: Count }),
  })
  .meta({ id: 'DashboardTotals' });

/* Scope: which chapters the difficulty and mastery counts cover ------------------------------------ */

export const DashboardScopeSchema = z
  .object({
    /**
     * class: the subjects of the student's board and class that have published lessons or practice, plus
     * any subject of that class the student has activity in (every chapter of them; untouched chapters
     * count as not started); activity: board or class not set, so the subjects the student has activity
     * in; none: neither.
     */
    kind: z.enum(['class', 'activity', 'none']),
    board: BoardSchema.nullable(),
    classLevel: ClassLevelSchema.nullable(),
    subjectCount: Count,
    chapterCount: Count,
  })
  .meta({ id: 'DashboardScope' });

const SolvedOfTotal = z.object({ solved: Count, total: Count });

export const SolvedByDifficultySchema = z
  .object({
    /** Practice questions in the scope's published practice pools, and how many of them you have solved. */
    all: SolvedOfTotal,
    easy: SolvedOfTotal,
    medium: SolvedOfTotal,
    hard: SolvedOfTotal,
  })
  .meta({ id: 'SolvedByDifficulty', description: 'LeetCode-style solved / total per difficulty band (1–2 easy, 3 medium, 4–5 hard).' });

const LevelCounts = z.object(Object.fromEntries(MASTERY_LEVELS.map((l) => [l, Count])) as Record<(typeof MASTERY_LEVELS)[number], typeof Count>);

export const DashboardMasterySchema = z
  .object({
    /** Mean chapter mastery score over the scope (untouched chapters count 0), 0–100. */
    score: Int.min(0).max(100),
    chapterCount: Count,
    /** Khan-style level counts over the scope's chapters (shared formula, same as GET /v1/me/mastery). */
    levels: LevelCounts,
  })
  .meta({ id: 'DashboardMastery' });

/* Test history ----------------------------------------------------------------------------------- */

export const TestHistoryItemSchema = z
  .object({
    attemptId: z.uuid(),
    /** Test key (e.g. t_cbse10math_ch01_short). */
    testId: z.string(),
    title: z.string(),
    kind: TestKind,
    subjectId: z.string(),
    subjectName: z.string(),
    submittedAt: z.iso.datetime(),
    /** IST day of submission. */
    day: Day,
    autoSubmitted: z.boolean(),
    /** Counted marks (auto + self), the paper's maximum and the percentage (null for a paper without marks). */
    score: z.number().min(0),
    maxScore: z.number().min(0),
    percentage: Pct.nullable(),
    autoScore: z.number().min(0),
    selfScore: z.number().min(0),
    /** auto: only auto-checked marks; self: includes marks you gave yourself against the marking scheme. */
    marking: z.enum(['auto', 'self']),
    /** Set for an All-India live mock attempt. */
    liveEventId: z.string().nullable(),
  })
  .meta({ id: 'TestHistoryItem' });

/* Focus areas ------------------------------------------------------------------------------------ */

export const ChapterLinkSchema = z
  .object({
    board: BoardSchema,
    classLevel: ClassLevelSchema,
    subjectId: z.string(),
    /** Subject id without the exam/class prefix (cbse-10-science → science). */
    subjectSlug: z.string(),
    chapterId: z.string(),
    /** ch01 */
    chapterSlug: z.string(),
  })
  .meta({ id: 'ChapterLink', description: 'Route parts for /learn/{board}/{classLevel}/{subjectSlug}/{chapterSlug}.' });

export const FocusChapterSchema = z
  .object({
    chapterId: z.string(),
    number: Int,
    title: z.string(),
    subjectId: z.string(),
    subjectName: z.string(),
    level: MasteryLevelSchema,
    score: Int.min(0).max(100),
    firstTryAccuracy: Ratio.nullable(),
    practiceAttempted: Count,
    practiceTotal: Count,
    chapterTestPct: Pct.nullable(),
    link: ChapterLinkSchema,
  })
  .meta({ id: 'FocusChapter' });

/* Recent activity -------------------------------------------------------------------------------- */

const ChapterRefSchema = z.object({ chapterId: z.string(), title: z.string(), subjectId: z.string(), subjectName: z.string(), link: ChapterLinkSchema });

const EventBase = { id: z.string(), at: z.iso.datetime(), day: Day };

export const RecentEventSchema = z
  .discriminatedUnion('kind', [
    z.object({ kind: z.literal('lesson'), ...EventBase, chapter: ChapterRefSchema, part: Int }).meta({ id: 'RecentLessonEvent' }),
    z
      .object({
        kind: z.literal('practice'),
        ...EventBase,
        chapter: ChapterRefSchema,
        /** Practice answers saved in this chapter on this IST day, and distinct questions solved among them. */
        answered: Count,
        solved: Count,
      })
      .meta({ id: 'RecentPracticeEvent' }),
    z.object({ kind: z.literal('test'), ...EventBase, attemptId: z.uuid(), testId: z.string(), title: z.string(), testKind: TestKind, percentage: Pct.nullable() }).meta({ id: 'RecentTestEvent' }),
    z.object({ kind: z.literal('badge'), ...EventBase, badgeKey: z.string(), name: z.string(), icon: z.string() }).meta({ id: 'RecentBadgeEvent' }),
  ])
  .meta({ id: 'RecentEvent', description: 'A practice event groups one chapter’s answers on one IST day (`at` = the last answer).' });

/* Badges and goal -------------------------------------------------------------------------------- */

export const NextBadgeSchema = z
  .object({ key: z.string(), name: z.string(), description: z.string(), icon: z.string(), current: Count, target: Int.min(1), progress: Ratio })
  .meta({ id: 'NextBadge', description: 'The unearned badge closest to being earned (streak badges count the current streak).' });

export const WeeklyGoalSchema = z
  .object({
    metric: z.enum(WEEKLY_GOAL_METRICS),
    target: Int.min(DASHBOARD.weeklyGoal.min).max(DASHBOARD.weeklyGoal.max),
    /** True until the student picks a goal (PATCH /v1/me weeklyGoal). */
    isDefault: z.boolean(),
    progress: Count,
    remaining: Count,
    met: z.boolean(),
    weekStart: Day,
    weekEnd: Day,
    /** Days left in the IST week, today included. */
    daysLeft: Int.min(1).max(7),
  })
  .meta({ id: 'WeeklyGoal', description: 'questions_solved: practice questions first solved this IST week (Monday–Sunday).' });

/* Response --------------------------------------------------------------------------------------- */

export const DashboardResponse = z
  .object({
    timezone: z.literal(DASHBOARD.timezone),
    /** IST day the dashboard was computed for, and the windows used. */
    today: Day,
    thisWeek: DayRangeSchema,
    lastWeek: DayRangeSchema,
    profile: DashboardProfileSchema,
    totals: DashboardTotalsSchema,
    scope: DashboardScopeSchema,
    solvedByDifficulty: SolvedByDifficultySchema,
    mastery: DashboardMasterySchema,
    /** Newest first, at most DASHBOARD.testHistoryLimit submitted attempts. The full paged list: GET /v1/me/attempts. */
    testHistory: z.array(TestHistoryItemSchema).max(DASHBOARD.testHistoryLimit),
    /** Up to DASHBOARD.focus.perSide chapters each, among chapters really attempted (any subject). */
    focus: z.object({ weakest: z.array(FocusChapterSchema), strongest: z.array(FocusChapterSchema) }),
    /** Newest first, at most DASHBOARD.recentLimit. */
    recent: z.array(RecentEventSchema).max(DASHBOARD.recentLimit),
    badges: z.object({ earned: Count, total: Count, next: NextBadgeSchema.nullable() }),
    weeklyGoal: WeeklyGoalSchema,
  })
  .meta({
    id: 'MyDashboard',
    description:
      'Your progress dashboard. Days and weeks are IST (Monday start). Level, XP and coins: GET /v1/me/card; streak and heatmap: GET /v1/me/activity; per-subject chapter levels: GET /v1/me/mastery.',
  });
