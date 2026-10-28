/**
 * Learning insights contracts (backend-api, 2026-10-28): the activity heatmap, Khan-style mastery,
 * practice-list status/difficulty and the private player card. Numbers live in
 * @soyl/shared/config/learning; formulas in @soyl/shared/learning/{mastery,card}.
 */
import { z } from 'zod/v4';
import { ACTIVITY, CARD_ATTRIBUTES, CARD_TIERS, DIFFICULTY_BANDS, MASTERY_LEVELS } from '@soyl/shared/config/learning';
import { SubjectId } from '@soyl/shared/content/ids';
import { MASTERY_HINTS } from '@soyl/shared/learning/mastery';
import { StreakSchema } from './content-schemas';

const Int = z.number().int();
const Ratio = z.number().min(0).max(1);
const Day = z.iso.date();

/* Activity --------------------------------------------------------------------------------------- */

export const ActivityQuery = z.strictObject({
  /** Days back from today (IST), today included. */
  days: z.coerce.number().int().min(1).max(ACTIVITY.maxDays).default(ACTIVITY.defaultDays),
});

export const ActivityDaySchema = z
  .object({
    /** IST calendar day (Asia/Kolkata). */
    date: Day,
    /** Practice answers saved that day (every attempt, right or wrong). */
    answered: Int,
    /** Practice questions solved for the first time that day. */
    solved: Int,
    /** Lesson deck parts finished for the first time that day. */
    lessonsCompleted: Int,
    /** Tests submitted that day (incl. auto-submitted at the deadline). */
    testsSubmitted: Int,
    /** answered + lessonsCompleted + testsSubmitted: the heatmap intensity. */
    total: Int,
  })
  .meta({ id: 'ActivityDay' });

export const ActivityResponse = z
  .object({
    timezone: z.literal(ACTIVITY.timezone),
    /** First and last (today) IST day of the window. */
    from: Day,
    to: Day,
    days: Int,
    /** Only days with activity, oldest first (missing days are zero). */
    calendar: z.array(ActivityDaySchema),
    totals: z.object({ answered: Int, solved: Int, lessonsCompleted: Int, testsSubmitted: Int, activeDays: Int }),
    streak: StreakSchema,
    /** IST days with any learning activity, ever. */
    activeDaysAllTime: Int,
  })
  .meta({ id: 'MyActivity', description: 'Daily learning activity for a LeetCode-style heatmap. Days are IST calendar days.' });

/* Mastery ---------------------------------------------------------------------------------------- */

export const MasteryLevelSchema = z.enum(MASTERY_LEVELS).meta({ id: 'MasteryLevel' });

export const MasteryQuery = z.strictObject({
  /** One subject (every chapter, even with no activity). Omitted: every subject you have activity in. */
  subjectId: SubjectId.optional(),
});

export const ChapterEvidenceSchema = z
  .object({
    lessonParts: Int,
    lessonPartsStarted: Int,
    lessonPartsCompleted: Int,
    practiceTotal: Int,
    practiceAttempted: Int,
    practiceSolved: Int,
    firstTryChecked: Int,
    firstTryCorrect: Int,
    chapterTestAvailable: z.boolean(),
    chapterTestPct: z.number().min(0).max(100).nullable(),
  })
  .meta({ id: 'ChapterEvidence', description: 'Inputs of the mastery formula (@soyl/shared/learning/mastery chapterMastery).' });

export const ChapterMasterySchema = z
  .object({
    chapterId: z.string(),
    number: Int,
    title: z.string(),
    level: MasteryLevelSchema,
    /** 0–100. */
    score: Int,
    components: z.object({ lesson: Ratio.nullable(), coverage: Ratio.nullable(), accuracy: Ratio.nullable(), test: Ratio.nullable() }),
    firstTryAccuracy: Ratio.nullable(),
    nextLevel: MasteryLevelSchema.nullable(),
    hints: z.array(z.enum(MASTERY_HINTS)),
    evidence: ChapterEvidenceSchema,
  })
  .meta({ id: 'ChapterMastery' });

const LevelCounts = z.object(Object.fromEntries(MASTERY_LEVELS.map((l) => [l, Int])) as Record<(typeof MASTERY_LEVELS)[number], typeof Int>);

export const SubjectMasterySchema = z
  .object({
    subjectId: z.string(),
    name: z.string(),
    classLevel: Int,
    /** Mean chapter score over every chapter of the subject (untouched chapters count 0). */
    score: Int,
    chapterCount: Int,
    levels: LevelCounts,
    chapters: z.array(ChapterMasterySchema),
  })
  .meta({ id: 'SubjectMastery' });

export const MasteryResponse = z.object({ subjects: z.array(SubjectMasterySchema) }).meta({ id: 'MyMastery' });

/* Practice list additions ------------------------------------------------------------------------ */

export const DifficultyBandSchema = z.enum(DIFFICULTY_BANDS).meta({ id: 'DifficultyBand', description: 'Content difficulty 1–2 easy, 3 medium, 4–5 hard (config DIFFICULTY_BAND_LEVELS).' });
export const PRACTICE_STATUSES = ['new', 'attempted', 'solved'] as const;
export type PracticeStatus = (typeof PRACTICE_STATUSES)[number];
export const PracticeStatusSchema = z
  .enum(PRACTICE_STATUSES)
  .meta({ id: 'PracticeStatus', description: 'new: never answered; attempted: answered, never right; solved: auto-checked right or self-marked full marks at least once.' });

const BandCount = z.object({ total: Int, solved: Int.nullable() });
export const PracticeSummarySchema = z
  .object({
    /** Questions in the chapter's practice pool (filters ignored). */
    total: Int,
    byDifficulty: z.object({ easy: BandCount, medium: BandCount, hard: BandCount }),
    /** Signed in only. */
    byStatus: z.object({ new: Int, attempted: Int, solved: Int }).nullable(),
  })
  .meta({ id: 'PracticeSummary', description: 'Whole-chapter counts for a LeetCode-style header; `solved` and `byStatus` are null for guests.' });

/* Player card ------------------------------------------------------------------------------------ */

export const CardAttributeSchema = z
  .object({
    key: z.enum(CARD_ATTRIBUTES),
    label: z.string(),
    value: Int.min(0).max(99),
    raw: Ratio,
    weight: z.number(),
    explain: z.string(),
  })
  .meta({ id: 'CardAttribute' });

export const PlayerCardResponse = z
  .object({
    /** D-039 auto-generated public name (never the real name). */
    publicName: z.string(),
    level: Int,
    xp: Int,
    coins: Int,
    /** 40–99. */
    overall: Int,
    tier: z.enum(CARD_TIERS),
    provisional: z.boolean(),
    formulaVersion: Int,
    /** ACC, CON, SPD (only with timing data), BRE, MAS, TST — in that order. */
    attributes: z.array(CardAttributeSchema),
    /** IST day the card was computed for. */
    asOfDay: Day,
  })
  .meta({ id: 'MyPlayerCard', description: 'Your private player card. Deterministic from your own learning data; never shown to anyone else.' });
