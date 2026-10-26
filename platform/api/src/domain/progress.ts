/**
 * Learning progress (ARCHITECTURE §4.1 gamification row, §12): lesson positions, practice accuracy,
 * XP and streaks for the signed-in student. Every query is scoped to the caller (API-7); no route
 * here takes another user's id.
 */
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import { chapters, istDay, lessonProgress, practiceAnswers, streaks, subjects, type Database } from '@soyl/db';
import { XP_AWARDS, levelForXp } from '@soyl/shared/config/gamification';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { deckParts, type ChapterRef } from './content';
import { awardXp, evaluateBadges, recordActivity, refreshTotals, streakView, type StreakView } from './gamification';

export interface LessonProgressInput {
  /** 1-based deck part, or 0 for a single-deck chapter. Omitted = the chapter's first part. */
  part?: number;
  slide: number;
  mode: 'read' | 'listen';
  completed?: boolean;
}

export interface LessonProgressResult {
  chapterId: string;
  part: number;
  slide: number;
  slideCount: number;
  mode: 'read' | 'listen';
  completedAt: string | null;
  updatedAt: string;
  xpAwarded: number;
  badgesAwarded: string[];
  streak: StreakView | null;
}

/**
 * PUT /v1/me/lesson-progress. Idempotent: the same body twice leaves the same row. The first time the
 * last slide is reached (or `completed: true` is sent on it) the part is completed: `completed_at`
 * is set once and never cleared, lesson XP is awarded once, and the day counts for the streak.
 */
export async function saveLessonProgress(db: Database, clock: Clock, year: string, userId: string, chapter: ChapterRef, input: LessonProgressInput): Promise<LessonProgressResult> {
  const parts = await deckParts(db, chapter.id, year);
  const deck = input.part === undefined ? parts[0] : parts.find((p) => p.part === input.part);
  if (!deck) throw new ApiProblem('not_found');
  const lastSlide = Math.max(0, deck.slideCount - 1);
  if (input.slide > lastSlide) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.slide', message: `This lesson has ${deck.slideCount} slides (0–${lastSlide}).` }] });
  if (input.completed && input.slide !== lastSlide) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.completed', message: 'A lesson is completed on its last slide.' }] });
  const completesNow = input.slide === lastSlide;
  const now = new Date(clock.now());

  return db.transaction(async (tx) => {
    const [before] = await tx
      .select({ completedAt: lessonProgress.completedAt })
      .from(lessonProgress)
      .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.chapterId, chapter.id), eq(lessonProgress.part, deck.part)))
      .for('update');
    const [row] = await tx
      .insert(lessonProgress)
      .values({ userId, chapterId: chapter.id, unit: chapter.key, part: deck.part, slidePosition: input.slide, mode: input.mode, completedAt: completesNow ? now : null, source: 'app', createdAt: now, updatedAt: now })
      .onConflictDoUpdate({
        target: [lessonProgress.userId, lessonProgress.chapterId, lessonProgress.part],
        set: {
          slidePosition: input.slide,
          mode: input.mode,
          completedAt: sql`coalesce(${lessonProgress.completedAt}, excluded.completed_at)`,
          updatedAt: now,
        },
      })
      .returning();
    let xpAwarded = 0;
    let streak: StreakView | null = null;
    let badgesAwarded: string[] = [];
    if (completesNow && !before?.completedAt) {
      xpAwarded = await awardXp(tx, userId, now, [{ kind: 'lesson_completed', amount: XP_AWARDS.lessonCompleted, sourceType: 'lesson', sourceId: `${chapter.key}:${deck.part}` }]);
      if (xpAwarded) await refreshTotals(tx, userId);
      streak = await recordActivity(tx, userId, now);
      badgesAwarded = await evaluateBadges(db, tx, userId, now);
    }
    return {
      chapterId: chapter.key,
      part: deck.part,
      slide: row!.slidePosition,
      slideCount: deck.slideCount,
      mode: row!.mode as 'read' | 'listen',
      completedAt: row!.completedAt?.toISOString() ?? null,
      updatedAt: row!.updatedAt.toISOString(),
      xpAwarded,
      badgesAwarded,
      streak,
    };
  });
}

/* ---------------------------------------------------------------------------------------------- */

const accuracy = (correct: number, checked: number) => (checked ? Math.round((correct / checked) * 1000) / 1000 : null);

async function practiceStats(db: Database, userId: string, chapterIds?: string[]) {
  return db
    .select({
      chapterId: practiceAnswers.chapterId,
      attempts: sql<number>`count(*)::int`,
      checked: sql<number>`count(*) FILTER (WHERE ${practiceAnswers.correct} IS NOT NULL)::int`,
      correctAttempts: sql<number>`count(*) FILTER (WHERE ${practiceAnswers.correct})::int`,
      questionsAnswered: sql<number>`count(DISTINCT ${practiceAnswers.questionKey})::int`,
      questionsCorrect: sql<number>`count(DISTINCT ${practiceAnswers.questionKey}) FILTER (WHERE ${practiceAnswers.correct})::int`,
      lastAnsweredAt: sql<Date>`max(${practiceAnswers.answeredAt})`,
    })
    .from(practiceAnswers)
    .where(chapterIds ? and(eq(practiceAnswers.userId, userId), inArray(practiceAnswers.chapterId, chapterIds)) : eq(practiceAnswers.userId, userId))
    .groupBy(practiceAnswers.chapterId);
}

async function totals(db: Database, clock: Clock, userId: string) {
  const [s] = await db.select().from(streaks).where(eq(streaks.userId, userId));
  const xp = s?.totalXp ?? 0;
  const lvl = levelForXp(xp);
  return { xp, level: lvl.level, levelStartXp: lvl.levelStartXp, nextLevelXp: lvl.nextLevelXp, streak: streakView(s, istDay(new Date(clock.now()))) };
}

export interface ChapterSummary {
  chapterId: string;
  number: number;
  title: string;
  lessons: { partsStarted: number; partsCompleted: number; lastPart: number | null; lastSlide: number | null; lastMode: 'read' | 'listen' | null; updatedAt: string | null };
  practice: { attempts: number; questionsAnswered: number; questionsCorrect: number; accuracy: number | null; lastAnsweredAt: string | null };
}

const iso = (d: Date | string | null | undefined) => (d ? new Date(d).toISOString() : null);

/** GET /v1/me/progress: totals plus every chapter with activity, grouped by subject. */
export async function progressSummary(db: Database, clock: Clock, userId: string) {
  const [lessons, practice, t] = await Promise.all([
    db
      .select({ lp: lessonProgress })
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, userId)),
    practiceStats(db, userId),
    totals(db, clock, userId),
  ]);
  const chapterIds = [...new Set([...lessons.map((l) => l.lp.chapterId), ...practice.map((p) => p.chapterId)])];
  const meta = chapterIds.length
    ? await db
        .select({ id: chapters.id, key: chapters.key, number: chapters.number, title: chapters.title, subjectKey: subjects.key, subjectName: subjects.name })
        .from(chapters)
        .innerJoin(subjects, eq(subjects.id, chapters.subjectId))
        .where(inArray(chapters.id, chapterIds))
        .orderBy(asc(subjects.key), asc(chapters.number))
    : [];
  const bySubject = new Map<string, { subjectId: string; name: string; chapters: ChapterSummary[] }>();
  let lessonsCompleted = 0;
  let attempts = 0;
  let checked = 0;
  let correctAttempts = 0;
  for (const m of meta) {
    const ls = lessons.filter((l) => l.lp.chapterId === m.id).map((l) => l.lp);
    const p = practice.find((x) => x.chapterId === m.id);
    const completed = ls.filter((l) => l.completedAt).length;
    lessonsCompleted += completed;
    attempts += p?.attempts ?? 0;
    checked += p?.checked ?? 0;
    correctAttempts += p?.correctAttempts ?? 0;
    const latest = [...ls].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
    const subject = bySubject.get(m.subjectKey) ?? { subjectId: m.subjectKey, name: m.subjectName, chapters: [] };
    subject.chapters.push({
      chapterId: m.key,
      number: m.number,
      title: m.title,
      lessons: {
        partsStarted: ls.length,
        partsCompleted: completed,
        lastPart: latest?.part ?? null,
        lastSlide: latest?.slidePosition ?? null,
        lastMode: (latest?.mode as 'read' | 'listen' | undefined) ?? null,
        updatedAt: iso(latest?.updatedAt),
      },
      practice: {
        attempts: p?.attempts ?? 0,
        questionsAnswered: p?.questionsAnswered ?? 0,
        questionsCorrect: p?.questionsCorrect ?? 0,
        accuracy: accuracy(p?.correctAttempts ?? 0, p?.checked ?? 0),
        lastAnsweredAt: iso(p?.lastAnsweredAt),
      },
    });
    bySubject.set(m.subjectKey, subject);
  }
  return {
    totals: { ...t, lessonsCompleted, practiceAttempts: attempts, practiceAccuracy: accuracy(correctAttempts, checked) },
    subjects: [...bySubject.values()],
  };
}

/** GET /v1/me/progress/chapters/:id: the hub's private half — per-part positions and practice detail. */
export async function chapterProgress(db: Database, year: string, userId: string, chapter: ChapterRef) {
  const [parts, rows, [p], answered] = await Promise.all([
    deckParts(db, chapter.id, year),
    db.select().from(lessonProgress).where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.chapterId, chapter.id))),
    practiceStats(db, userId, [chapter.id]),
    db
      .selectDistinctOn([practiceAnswers.questionKey], { key: practiceAnswers.questionKey, correct: practiceAnswers.correct })
      .from(practiceAnswers)
      .where(and(eq(practiceAnswers.userId, userId), eq(practiceAnswers.chapterId, chapter.id)))
      .orderBy(practiceAnswers.questionKey, sql`${practiceAnswers.answeredAt} DESC`),
  ]);
  const byPart = new Map(rows.map((r) => [r.part, r]));
  const everCorrect = new Set(
    (
      await db
        .selectDistinct({ key: practiceAnswers.questionKey })
        .from(practiceAnswers)
        .where(and(eq(practiceAnswers.userId, userId), eq(practiceAnswers.chapterId, chapter.id), eq(practiceAnswers.correct, true)))
    ).map((r) => r.key),
  );
  return {
    chapterId: chapter.key,
    lessons: parts.map((d) => {
      const r = byPart.get(d.part);
      return { part: d.part, slideCount: d.slideCount, slide: r?.slidePosition ?? null, mode: (r?.mode as 'read' | 'listen' | undefined) ?? null, completedAt: iso(r?.completedAt), updatedAt: iso(r?.updatedAt) };
    }),
    practice: {
      attempts: p?.attempts ?? 0,
      questionsAnswered: p?.questionsAnswered ?? 0,
      questionsCorrect: p?.questionsCorrect ?? 0,
      accuracy: accuracy(p?.correctAttempts ?? 0, p?.checked ?? 0),
      answeredQuestionIds: answered.map((a) => a.key),
      correctQuestionIds: [...everCorrect].sort(),
    },
  };
}
