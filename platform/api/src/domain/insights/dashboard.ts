/**
 * GET /v1/me/dashboard: the student's progress dashboard, computed on read from the caller's own stored
 * progress (API-7: every query is scoped to the caller and uses a user_id-leading index). Formulas are
 * the pure @soyl/shared/learning/{dashboard,mastery}; numbers are DASHBOARD in
 * @soyl/shared/config/learning. Definitions match the other insights routes:
 *
 * - solved (D-042) = auto-checked right or self-marked full marks, counted on the IST day first solved;
 * - active day = an IST day with a practice answer, a lesson part finished or a test submitted;
 * - mastery = chapterMastery over chapterEvidence (same as GET /v1/me/mastery).
 *
 * Nothing here reads question content or keys: only counts, ids and titles (DB-6).
 */
import { and, desc, eq, inArray, isNotNull, sql } from 'drizzle-orm';
import { attempts, badges, boards, chapters, istDay, lessonProgress, liveEvents, practiceAnswers, streaks, studentQuestions, subjects, tests, userBadges, type Database } from '@soyl/db';
import { BADGES } from '@soyl/shared/config/gamification';
import { DASHBOARD, DIFFICULTY_BANDS, type DifficultyBand } from '@soyl/shared/config/learning';
import { dashboardWindows, dayRuns, latestEvents, nextBadge, percentOf, pickFocus, testPercentSummary, weeklyGoalView, accuracy, type BadgeStats } from '@soyl/shared/learning/dashboard';
import { chapterMastery, difficultyBand, subjectMastery, type ChapterEvidence } from '@soyl/shared/learning/mastery';
import type { TestKind } from '@soyl/shared/content/test';
import type { ConsentState } from '@soyl/shared/config/security';
import type { Clock } from '../../clock';
import { activeReleases, practicePool } from '../content';
import { chaptersMastered, ensureBadges, learnerStats, streakView, testStats } from '../gamification';
import { practiceStatusExpr, solvedAnswer } from '../practice';
import { loadProfile } from '../profile';
import { visibleSchool, type SchoolDto } from '../schools';
import { activeDays, istDayStart } from './activity';
import { activeSubjectIds, chapterEvidence } from './mastery';

type Board = 'cbse' | 'cisce';

/** One chapter with what the dashboard shows about it and how to link to it. */
interface ChapterMeta {
  id: string;
  key: string;
  number: number;
  title: string;
  subjectKey: string;
  subjectName: string;
  board: Board;
  classLevel: number;
}

const asBoard = (b: string | null | undefined): Board | null => (b === 'cbse' || b === 'cisce' ? b : null);
const iso = (d: Date) => d.toISOString();

function link(c: ChapterMeta) {
  return {
    board: c.board,
    classLevel: c.classLevel,
    subjectId: c.subjectKey,
    subjectSlug: c.subjectKey.replace(/^(?:cbse|icse|isc)-(?:7|8|9|10|11|12)-/, ''),
    chapterId: c.key,
    chapterSlug: /-(ch\d{2})$/.exec(c.key)?.[1] ?? c.key,
  };
}

const chapterRef = (c: ChapterMeta) => ({ chapterId: c.key, title: c.title, subjectId: c.subjectKey, subjectName: c.subjectName, link: link(c) });

async function chapterMeta(db: Database, ids: readonly string[]): Promise<Map<string, ChapterMeta>> {
  if (!ids.length) return new Map();
  const rows = await db
    .select({
      id: chapters.id,
      key: chapters.key,
      number: chapters.number,
      title: chapters.title,
      subjectKey: subjects.key,
      subjectName: subjects.name,
      board: boards.code,
      classLevel: subjects.classLevel,
    })
    .from(chapters)
    .innerJoin(subjects, eq(subjects.id, chapters.subjectId))
    .innerJoin(boards, eq(boards.id, subjects.boardId))
    .where(inArray(chapters.id, [...new Set(ids)]));
  return new Map(rows.map((r) => [r.id, { ...r, board: asBoard(r.board) ?? 'cbse' }]));
}

/* Totals ------------------------------------------------------------------------------------------ */

async function totals(db: Database, userId: string, w: ReturnType<typeof dashboardWindows>) {
  const thisWeek = istDayStart(w.thisWeek.from);
  const lastWeek = istDayStart(w.lastWeek.from);
  const recent = istDayStart(w.recent.from);
  const previous = istDayStart(w.previous.from);
  const inLastWeek = (col: string) => sql.raw(`${col} >= '${lastWeek}'::timestamptz AND ${col} < '${thisWeek}'::timestamptz`);
  const inThisWeek = (col: string) => sql.raw(`${col} >= '${thisWeek}'::timestamptz`);

  const [answers, solved, lessons, testRows, distinct, active] = await Promise.all([
    db.execute<{ all: number; tw: number; lw: number; rc: number; rr: number; pc: number; pr: number }>(sql`
      SELECT count(*)::int AS all,
        (count(*) FILTER (WHERE ${inThisWeek('answered_at')}))::int AS tw,
        (count(*) FILTER (WHERE ${inLastWeek('answered_at')}))::int AS lw,
        (count(*) FILTER (WHERE correct IS NOT NULL AND answered_at >= ${recent}::timestamptz))::int AS rc,
        (count(*) FILTER (WHERE correct AND answered_at >= ${recent}::timestamptz))::int AS rr,
        (count(*) FILTER (WHERE correct IS NOT NULL AND answered_at >= ${previous}::timestamptz AND answered_at < ${recent}::timestamptz))::int AS pc,
        (count(*) FILTER (WHERE correct AND answered_at >= ${previous}::timestamptz AND answered_at < ${recent}::timestamptz))::int AS pr
      FROM practice_answers WHERE user_id = ${userId}`),
    db.execute<{ all: number; tw: number; lw: number }>(sql`
      SELECT count(first_solved)::int AS all,
        (count(*) FILTER (WHERE ${inThisWeek('first_solved')}))::int AS tw,
        (count(*) FILTER (WHERE ${inLastWeek('first_solved')}))::int AS lw
      FROM (SELECT min(answered_at) FILTER (WHERE ${solvedAnswer('practice_answers')}) AS first_solved FROM practice_answers
            WHERE user_id = ${userId} GROUP BY question_key) f`),
    db.execute<{ all: number; tw: number; lw: number }>(sql`
      SELECT count(*)::int AS all,
        (count(*) FILTER (WHERE ${inThisWeek('completed_at')}))::int AS tw,
        (count(*) FILTER (WHERE ${inLastWeek('completed_at')}))::int AS lw
      FROM lesson_progress WHERE user_id = ${userId} AND completed_at IS NOT NULL`),
    db.execute<{ all: number; tw: number; lw: number; tests: number }>(sql`
      SELECT count(*)::int AS all,
        (count(*) FILTER (WHERE ${inThisWeek('submitted_at')}))::int AS tw,
        (count(*) FILTER (WHERE ${inLastWeek('submitted_at')}))::int AS lw,
        count(DISTINCT test_id)::int AS tests
      FROM attempts WHERE user_id = ${userId} AND submitted_at IS NOT NULL`),
    db
      .select({ score: attempts.score, max: attempts.maxScore })
      .from(attempts)
      .where(and(eq(attempts.userId, userId), isNotNull(attempts.gradedAt), sql`${attempts.maxScore} > 0`)),
    Promise.all([activeDays(db, userId, w.thisWeek.from), activeDays(db, userId, w.lastWeek.from), activeDays(db, userId, null)]),
  ]);
  const a = answers.rows[0]!;
  const s = solved.rows[0]!;
  const l = lessons.rows[0]!;
  const t = testRows.rows[0]!;
  const n = (x: unknown) => Number(x ?? 0);
  const pcts = distinct.map((r) => percentOf(Number(r.score ?? 0), Number(r.max))).filter((p): p is number => p !== null);
  const { average, best } = testPercentSummary(pcts);
  const [activeThis, activeSinceLast, activeAll] = active;
  return {
    solved: { allTime: n(s.all), thisWeek: n(s.tw), lastWeek: n(s.lw) },
    answered: { allTime: n(a.all), thisWeek: n(a.tw), lastWeek: n(a.lw) },
    accuracy: {
      recent: { ...w.recent, checked: n(a.rc), right: n(a.rr), accuracy: accuracy(n(a.rr), n(a.rc)) },
      previous: { ...w.previous, checked: n(a.pc), right: n(a.pr), accuracy: accuracy(n(a.pr), n(a.pc)) },
    },
    lessonsCompleted: { allTime: n(l.all), thisWeek: n(l.tw), lastWeek: n(l.lw) },
    tests: { submitted: { allTime: n(t.all), thisWeek: n(t.tw), lastWeek: n(t.lw) }, distinctTests: n(t.tests), averagePct: average, bestPct: best },
    activeDays: { thisWeek: activeThis, lastWeek: Math.max(0, activeSinceLast - activeThis), allTime: activeAll },
  };
}

/* Scope ------------------------------------------------------------------------------------------- */

/**
 * class: the subjects of the student's board and class that have published lessons or practice (a class
 * lists every language and elective, most of which a student does not take or that have no content yet),
 * plus any subject of that class the student has activity in. activity: board or class not set.
 */
async function scopeSubjects(db: Database, year: string, userId: string, board: Board | null, classLevel: number | null) {
  if (board && classLevel) {
    const res = await db.execute<{ id: string }>(sql`
      SELECT s.id FROM subjects s JOIN boards b ON b.id = s.board_id
      WHERE b.code = ${board} AND s.class_level = ${classLevel} AND s.academic_year = ${year} AND (
        EXISTS (SELECT 1 FROM student_questions q JOIN chapters c ON c.id = q.chapter_id
                WHERE c.subject_id = s.id AND q.academic_year = ${year} AND q.pool = 'practice')
        OR EXISTS (SELECT 1 FROM decks d JOIN chapters c ON c.id = d.chapter_id
                   WHERE c.subject_id = s.id AND d.academic_year = ${year} AND d.status IN ('published', 'reviewed'))
        OR s.id IN (SELECT c.subject_id FROM chapters c WHERE c.id IN (
              SELECT chapter_id FROM lesson_progress WHERE user_id = ${userId}
              UNION SELECT chapter_id FROM practice_answers WHERE user_id = ${userId})))`);
    return { kind: 'class' as const, ids: res.rows.map((r) => r.id) };
  }
  const ids = await activeSubjectIds(db, userId);
  if (!ids.length) return { kind: 'none' as const, ids: [] };
  const rows = await db.select({ id: subjects.id }).from(subjects).where(and(inArray(subjects.id, ids), eq(subjects.academicYear, year)));
  return { kind: rows.length ? ('activity' as const) : ('none' as const), ids: rows.map((r) => r.id) };
}

/** Chapters with a lesson started, a practice answer or a graded chapter test (any subject, this year). */
async function attemptedChapters(db: Database, year: string, userId: string): Promise<{ id: string; key: string }[]> {
  const res = await db.execute<{ id: string; key: string }>(sql`
    SELECT c.id, c.key FROM chapters c WHERE c.academic_year = ${year} AND (
      c.id IN (SELECT chapter_id FROM lesson_progress WHERE user_id = ${userId}
               UNION SELECT chapter_id FROM practice_answers WHERE user_id = ${userId})
      OR c.key IN (SELECT unnest(t.chapter_keys) FROM attempts a JOIN tests t ON t.id = a.test_id
                   WHERE a.user_id = ${userId} AND a.graded_at IS NOT NULL AND t.kind = 'chapter'))`);
  return res.rows;
}

/** Solved / total per difficulty band over the published practice pools of these chapters. */
async function solvedByDifficulty(db: Database, year: string, userId: string, chs: readonly { id: string }[]) {
  const out = Object.fromEntries(['all', ...DIFFICULTY_BANDS].map((b) => [b, { solved: 0, total: 0 }])) as Record<'all' | DifficultyBand, { solved: number; total: number }>;
  if (!chs.length) return out;
  const releases = await activeReleases(db, chs.map((c) => c.id), year);
  const refs = chs.map((c) => ({ id: c.id, activeReleaseId: releases.get(c.id) ?? null }));
  // GROUP BY output positions: the status expression carries a bound parameter, so it cannot be repeated.
  const rows = await db
    .select({ difficulty: studentQuestions.difficulty, status: practiceStatusExpr(userId), n: sql<number>`count(*)::int` })
    .from(studentQuestions)
    .where(sql`(${sql.join(refs.map((r) => practicePool(r, year)), sql` OR `)})`)
    .groupBy(sql`1, 2`);
  for (const r of rows) {
    const k = Number(r.n);
    const band = out[difficultyBand(Number(r.difficulty))];
    band.total += k;
    out.all.total += k;
    if (r.status === 'solved') {
      band.solved += k;
      out.all.solved += k;
    }
  }
  return out;
}

/* Tests ------------------------------------------------------------------------------------------- */

async function testHistory(db: Database, userId: string) {
  const rows = await db
    .select({
      id: attempts.id,
      status: attempts.status,
      submittedAt: attempts.submittedAt,
      score: attempts.score,
      maxScore: attempts.maxScore,
      autoScore: attempts.autoScore,
      selfScore: attempts.selfScore,
      testKey: tests.key,
      title: tests.title,
      kind: tests.kind,
      subjectKey: subjects.key,
      subjectName: subjects.name,
      eventKey: liveEvents.key,
      selfMarked: sql<boolean>`EXISTS (SELECT 1 FROM responses r JOIN evaluations e ON e.response_id = r.id AND e.mode = 'self' WHERE r.attempt_id = ${attempts.id})`,
    })
    .from(attempts)
    .innerJoin(tests, eq(tests.id, attempts.testId))
    .innerJoin(subjects, eq(subjects.id, tests.subjectId))
    .leftJoin(liveEvents, eq(liveEvents.id, attempts.liveEventId))
    .where(and(eq(attempts.userId, userId), isNotNull(attempts.submittedAt)))
    .orderBy(desc(attempts.submittedAt), desc(attempts.id))
    .limit(DASHBOARD.testHistoryLimit);
  return rows.map((r) => {
    const score = Number(r.score ?? 0);
    const max = Number(r.maxScore ?? 0);
    return {
      attemptId: r.id,
      testId: r.testKey,
      title: r.title,
      kind: r.kind as TestKind,
      subjectId: r.subjectKey,
      subjectName: r.subjectName,
      submittedAt: iso(r.submittedAt!),
      day: istDay(r.submittedAt!),
      autoSubmitted: r.status === 'auto_submitted',
      score,
      maxScore: max,
      percentage: percentOf(score, max),
      autoScore: Number(r.autoScore ?? 0),
      selfScore: Number(r.selfScore ?? 0),
      marking: r.selfMarked || Number(r.selfScore ?? 0) > 0 ? ('self' as const) : ('auto' as const),
      liveEventId: r.eventKey ?? null,
    };
  });
}

/* Recent activity --------------------------------------------------------------------------------- */

async function recentRaw(db: Database, userId: string) {
  const limit = DASHBOARD.recentLimit;
  const [lessons, practice, earned] = await Promise.all([
    db
      .select({ id: lessonProgress.id, chapterId: lessonProgress.chapterId, part: lessonProgress.part, at: lessonProgress.completedAt })
      .from(lessonProgress)
      .where(and(eq(lessonProgress.userId, userId), isNotNull(lessonProgress.completedAt)))
      .orderBy(desc(lessonProgress.completedAt), desc(lessonProgress.id))
      .limit(limit),
    db
      .select({
        chapterId: practiceAnswers.chapterId,
        day: sql<string>`to_char((${practiceAnswers.answeredAt} AT TIME ZONE ${DASHBOARD.timezone})::date, 'YYYY-MM-DD')`,
        answered: sql<number>`count(*)::int`,
        solved: sql<number>`(count(DISTINCT ${practiceAnswers.questionKey}) FILTER (WHERE ${solvedAnswer('practice_answers')}))::int`,
        at: sql<Date>`max(${practiceAnswers.answeredAt})`.mapWith(practiceAnswers.answeredAt),
      })
      .from(practiceAnswers)
      .where(eq(practiceAnswers.userId, userId))
      .groupBy(sql`1, 2`)
      .orderBy(sql`5 DESC`, sql`1`)
      .limit(limit),
    db
      .select({ id: userBadges.id, at: userBadges.awardedAt, key: badges.key, name: badges.name, icon: badges.icon })
      .from(userBadges)
      .innerJoin(badges, eq(badges.id, userBadges.badgeId))
      .where(eq(userBadges.userId, userId))
      .orderBy(desc(userBadges.awardedAt), desc(userBadges.id))
      .limit(limit),
  ]);
  return { lessons, practice, earned };
}

/* Badges ------------------------------------------------------------------------------------------ */

async function badgeSummary(db: Database, userId: string, today: string) {
  const ids = await ensureBadges(db);
  const configured = new Map([...ids.entries()].map(([key, id]) => [id, key]));
  const [have, stats, tStats, testDays, [s]] = await Promise.all([
    db.select({ badgeId: userBadges.badgeId }).from(userBadges).where(eq(userBadges.userId, userId)),
    learnerStats(db, userId),
    testStats(db, userId),
    db.execute<{ day: string }>(sql`
      SELECT DISTINCT to_char((submitted_at AT TIME ZONE ${DASHBOARD.timezone})::date, 'YYYY-MM-DD') AS day
      FROM attempts WHERE user_id = ${userId} AND graded_at IS NOT NULL AND submitted_at IS NOT NULL`),
    db.select().from(streaks).where(eq(streaks.userId, userId)),
  ]);
  const earned = new Set(have.map((h) => configured.get(h.badgeId)).filter((k): k is string => !!k));
  const mastery = BADGES.find((b) => b.criteria.kind === 'chapters_mastered');
  const needsMastery = mastery && !earned.has(mastery.key);
  const badgeStats: BadgeStats = {
    lessonsCompleted: Number(stats.lessons),
    practiceCorrect: Number(stats.correct),
    currentStreak: streakView(s, today).current,
    testsGraded: Number(tStats.tests),
    perfectScores: Number(tStats.perfect),
    testDayRun: dayRuns(testDays.rows.map((r) => r.day), today).current,
    chaptersMastered: needsMastery && mastery.criteria.kind === 'chapters_mastered' ? await chaptersMastered(db, userId, mastery.criteria) : 0,
  };
  return { earned: earned.size, total: BADGES.length, next: nextBadge(earned, badgeStats) };
}

/* The dashboard ----------------------------------------------------------------------------------- */

export async function dashboardFor(db: Database, clock: Clock, year: string, userId: string, consent: ConsentState) {
  const today = istDay(new Date(clock.now()));
  const w = dashboardWindows(today);
  const profile = await loadProfile(db, userId);
  const board = asBoard(profile?.board);
  const classLevel = profile?.classLevel ?? null;
  const granted = consent === 'granted';

  const [school, total, scope, attempted, history, recent, badgeInfo] = await Promise.all([
    visibleSchool(db, profile?.schoolId, granted),
    totals(db, userId, w),
    scopeSubjects(db, year, userId, board, classLevel),
    attemptedChapters(db, year, userId),
    testHistory(db, userId),
    recentRaw(db, userId),
    badgeSummary(db, userId, today),
  ]);

  const scopeChapters = scope.ids.length
    ? await db
        .select({ id: chapters.id, key: chapters.key })
        .from(chapters)
        .where(and(inArray(chapters.subjectId, scope.ids), eq(chapters.academicYear, year)))
    : [];
  const evidenceFor = new Map([...scopeChapters, ...attempted].map((c) => [c.id, c]));
  const [evidence, byDifficulty, meta] = await Promise.all([
    chapterEvidence(db, year, userId, [...evidenceFor.values()]),
    solvedByDifficulty(db, year, userId, scopeChapters),
    chapterMeta(db, [...attempted.map((c) => c.id), ...recent.lessons.map((l) => l.chapterId), ...recent.practice.map((p) => p.chapterId)]),
  ]);
  const ev = (id: string): ChapterEvidence => evidence.get(id)!;

  // Mastery level counts over the scope (untouched chapters count as not started, score 0).
  const scopeMastery = subjectMastery(scopeChapters.map((c) => chapterMastery(ev(c.id))));

  // Focus areas over the chapters really attempted (any subject).
  const candidates = attempted
    .filter((c) => meta.has(c.id))
    .map((c) => {
      const e = ev(c.id);
      const m = chapterMastery(e);
      return { chapterId: c.key, id: c.id, level: m.level, score: m.score, firstTryAccuracy: m.firstTryAccuracy, practiceAttempted: e.practiceAttempted, practiceTotal: e.practiceTotal, chapterTestPct: e.chapterTestPct };
    });
  const picked = pickFocus(candidates);
  const focusDto = (c: (typeof candidates)[number]) => {
    const m = meta.get(c.id)!;
    return {
      chapterId: m.key,
      number: m.number,
      title: m.title,
      subjectId: m.subjectKey,
      subjectName: m.subjectName,
      level: c.level,
      score: c.score,
      firstTryAccuracy: c.firstTryAccuracy,
      practiceAttempted: c.practiceAttempted,
      practiceTotal: c.practiceTotal,
      chapterTestPct: c.chapterTestPct,
      link: link(m),
    };
  };

  // Recent activity: lessons, practice sessions (chapter × IST day), tests, badges — newest first.
  const events = [
    ...recent.lessons
      .filter((l) => meta.has(l.chapterId))
      .map((l) => ({ kind: 'lesson' as const, id: l.id, at: iso(l.at!), day: istDay(l.at!), chapter: chapterRef(meta.get(l.chapterId)!), part: l.part })),
    ...recent.practice
      .filter((p) => meta.has(p.chapterId))
      .map((p) => {
        const m = meta.get(p.chapterId)!;
        return { kind: 'practice' as const, id: `${m.key}:${p.day}`, at: iso(p.at), day: p.day, chapter: chapterRef(m), answered: Number(p.answered), solved: Number(p.solved) };
      }),
    ...history
      .slice(0, DASHBOARD.recentLimit)
      .map((t) => ({ kind: 'test' as const, id: t.attemptId, at: t.submittedAt, day: t.day, attemptId: t.attemptId, testId: t.testId, title: t.title, testKind: t.kind, percentage: t.percentage })),
    ...recent.earned.map((b) => ({ kind: 'badge' as const, id: b.id, at: iso(b.at), day: istDay(b.at), badgeKey: b.key, name: b.name, icon: b.icon ?? 'star' })),
  ];

  const schoolStatus = !granted ? ('consent_required' as const) : school ? ('set' as const) : ('not_set' as const);
  const missing: ('board' | 'classLevel' | 'school')[] = [];
  if (!board) missing.push('board');
  if (!classLevel) missing.push('classLevel');
  if (schoolStatus === 'not_set') missing.push('school');

  return {
    timezone: DASHBOARD.timezone,
    today,
    thisWeek: w.thisWeek,
    lastWeek: w.lastWeek,
    profile: { board, classLevel, school: school as SchoolDto | null, schoolStatus, missing },
    totals: total,
    scope: { kind: scope.kind, board: scope.kind === 'class' ? board : null, classLevel: scope.kind === 'class' ? classLevel : null, subjectCount: scope.ids.length, chapterCount: scopeChapters.length },
    solvedByDifficulty: byDifficulty,
    mastery: scopeMastery,
    testHistory: history,
    focus: { weakest: picked.weakest.map(focusDto), strongest: picked.strongest.map(focusDto) },
    recent: latestEvents(events),
    badges: badgeInfo,
    weeklyGoal: weeklyGoalView(profile?.weeklyGoal, total.solved.thisWeek, today),
  };
}
