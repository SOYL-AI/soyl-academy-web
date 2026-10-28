/**
 * GET /v1/me/mastery: Khan-style chapter mastery (not started → mastered) and subject aggregates,
 * computed on read from the caller's lesson_progress, practice_answers and graded chapter-test
 * attempts (API-7: scoped to the caller). The formula is the pure @soyl/shared/learning/mastery
 * chapterMastery, so guests (web, device progress) and members get the same levels.
 *
 * Evidence queries are bulk (one per kind for all chapters), so a subject costs the same handful
 * of queries whatever its chapter count.
 */
import { and, arrayOverlaps, asc, desc, eq, inArray, isNotNull, or, sql } from 'drizzle-orm';
import { attempts, chapters, decks, lessonProgress, practiceAnswers, studentQuestions, subjects, tests, type Database } from '@soyl/db';
import { chapterMastery, subjectMastery, type ChapterEvidence } from '@soyl/shared/learning/mastery';
import { ApiProblem } from '../../errors';
import { activeReleases, practicePool, visible } from '../content';
import { solvedAnswer } from '../practice';

export interface ChapterKeyRef {
  id: string;
  key: string;
}

const r1 = (x: number) => Math.round(x * 10) / 10;

/** First-try stats per chapter: the first auto-checked answer (correct not null) of each question. */
export async function firstTryByChapter(db: Database, userId: string, chapterIds?: string[]) {
  const first = db
    .selectDistinctOn([practiceAnswers.questionKey], { chapterId: practiceAnswers.chapterId, correct: practiceAnswers.correct })
    .from(practiceAnswers)
    .where(and(eq(practiceAnswers.userId, userId), isNotNull(practiceAnswers.correct), ...(chapterIds ? [inArray(practiceAnswers.chapterId, chapterIds)] : [])))
    .orderBy(practiceAnswers.questionKey, asc(practiceAnswers.answeredAt), asc(practiceAnswers.id))
    .as('first_try');
  const rows = await db
    .select({ chapterId: first.chapterId, checked: sql<number>`count(*)::int`, correct: sql<number>`count(*) FILTER (WHERE ${first.correct})::int` })
    .from(first)
    .groupBy(first.chapterId);
  return new Map(rows.map((r) => [r.chapterId, { checked: Number(r.checked), correct: Number(r.correct) }]));
}

/** Everything chapterMastery needs, for each chapter (chapters without any data get zeros). */
export async function chapterEvidence(db: Database, year: string, userId: string, chs: readonly ChapterKeyRef[]): Promise<Map<string, ChapterEvidence>> {
  const out = new Map<string, ChapterEvidence>();
  if (!chs.length) return out;
  const ids = chs.map((c) => c.id);
  const keys = chs.map((c) => c.key);
  const releases = await activeReleases(db, ids, year);
  const refs = chs.map((c) => ({ id: c.id, activeReleaseId: releases.get(c.id) ?? null }));

  const [pool, parts, lessons, practice, firstTry, available, graded] = await Promise.all([
    db
      .select({ chapterId: studentQuestions.chapterId, n: sql<number>`count(*)::int` })
      .from(studentQuestions)
      .where(or(...refs.map((r) => practicePool(r, year))))
      .groupBy(studentQuestions.chapterId),
    db
      .select({ chapterId: decks.chapterId, n: sql<number>`count(*)::int` })
      .from(decks)
      .where(or(...refs.map((r) => and(eq(decks.chapterId, r.id), visible(decks, 'deck', r, year)))))
      .groupBy(decks.chapterId),
    db
      .select({ chapterId: lessonProgress.chapterId, started: sql<number>`count(*)::int`, completed: sql<number>`count(${lessonProgress.completedAt})::int` })
      .from(lessonProgress)
      .where(and(eq(lessonProgress.userId, userId), inArray(lessonProgress.chapterId, ids)))
      .groupBy(lessonProgress.chapterId),
    db
      .select({
        chapterId: practiceAnswers.chapterId,
        attempted: sql<number>`count(DISTINCT ${practiceAnswers.questionKey})::int`,
        solved: sql<number>`(count(DISTINCT ${practiceAnswers.questionKey}) FILTER (WHERE ${solvedAnswer('practice_answers')}))::int`,
      })
      .from(practiceAnswers)
      .where(and(eq(practiceAnswers.userId, userId), inArray(practiceAnswers.chapterId, ids)))
      .groupBy(practiceAnswers.chapterId),
    firstTryByChapter(db, userId, ids),
    db
      .select({ keys: tests.chapterKeys })
      .from(tests)
      .where(and(eq(tests.kind, 'chapter'), eq(tests.status, 'published'), eq(tests.academicYear, year), arrayOverlaps(tests.chapterKeys, keys))),
    db
      .select({ keys: tests.chapterKeys, score: attempts.score, max: attempts.maxScore })
      .from(attempts)
      .innerJoin(tests, eq(tests.id, attempts.testId))
      .where(and(eq(attempts.userId, userId), isNotNull(attempts.gradedAt), eq(tests.kind, 'chapter'), arrayOverlaps(tests.chapterKeys, keys)))
      .orderBy(desc(attempts.submittedAt), desc(attempts.id)),
  ]);

  const testAvailable = new Set(available.flatMap((t) => t.keys));
  const latestPct = new Map<string, number>();
  for (const a of graded) {
    const max = Number(a.max ?? 0);
    if (max <= 0) continue;
    for (const k of a.keys) if (!latestPct.has(k)) latestPct.set(k, r1((Number(a.score ?? 0) / max) * 100));
  }
  const by = <T extends { chapterId: string }>(rows: T[]) => new Map(rows.map((r) => [r.chapterId, r]));
  const poolBy = by(pool);
  const partsBy = by(parts);
  const lessonsBy = by(lessons);
  const practiceBy = by(practice);
  for (const c of chs) {
    const l = lessonsBy.get(c.id);
    const p = practiceBy.get(c.id);
    const f = firstTry.get(c.id);
    out.set(c.id, {
      lessonParts: Number(partsBy.get(c.id)?.n ?? 0),
      lessonPartsStarted: Number(l?.started ?? 0),
      lessonPartsCompleted: Number(l?.completed ?? 0),
      practiceTotal: Number(poolBy.get(c.id)?.n ?? 0),
      practiceAttempted: Number(p?.attempted ?? 0),
      practiceSolved: Number(p?.solved ?? 0),
      firstTryChecked: f?.checked ?? 0,
      firstTryCorrect: f?.correct ?? 0,
      chapterTestAvailable: testAvailable.has(c.key),
      chapterTestPct: latestPct.get(c.key) ?? null,
    });
  }
  return out;
}

/** Subjects (database ids) the caller has any learning activity in. */
async function activeSubjectIds(db: Database, userId: string): Promise<string[]> {
  const res = await db.execute<{ subject_id: string }>(sql`
    SELECT c.subject_id FROM chapters c WHERE c.id IN (
      SELECT chapter_id FROM lesson_progress WHERE user_id = ${userId}
      UNION SELECT chapter_id FROM practice_answers WHERE user_id = ${userId})
    UNION SELECT t.subject_id FROM attempts a JOIN tests t ON t.id = a.test_id
    WHERE a.user_id = ${userId} AND a.graded_at IS NOT NULL AND t.kind = 'chapter'`);
  return res.rows.map((r) => r.subject_id);
}

export async function masterySummary(db: Database, year: string, userId: string, subjectKey: string | null) {
  const subjectRows = subjectKey
    ? await db.select().from(subjects).where(and(eq(subjects.key, subjectKey), eq(subjects.academicYear, year)))
    : await (async () => {
        const ids = await activeSubjectIds(db, userId);
        return ids.length ? db.select().from(subjects).where(and(inArray(subjects.id, ids), eq(subjects.academicYear, year))).orderBy(asc(subjects.key)) : [];
      })();
  if (subjectKey && !subjectRows.length) throw new ApiProblem('not_found');
  if (!subjectRows.length) return { subjects: [] };

  const chapterRows = await db
    .select({ id: chapters.id, key: chapters.key, number: chapters.number, title: chapters.title, subjectId: chapters.subjectId })
    .from(chapters)
    .where(and(inArray(chapters.subjectId, subjectRows.map((s) => s.id)), eq(chapters.academicYear, year)))
    .orderBy(asc(chapters.number));
  const evidence = await chapterEvidence(db, year, userId, chapterRows);

  return {
    subjects: subjectRows.map((s) => {
      const chs = chapterRows
        .filter((c) => c.subjectId === s.id)
        .map((c) => {
          const e = evidence.get(c.id)!;
          return { chapterId: c.key, number: c.number, title: c.title, ...chapterMastery(e), evidence: e };
        });
      return { subjectId: s.key, name: s.name, classLevel: s.classLevel, ...subjectMastery(chs), chapters: chs };
    }),
  };
}
