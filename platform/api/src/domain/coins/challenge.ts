/**
 * Daily challenge (D-037, ADR-020): one practice question per board × class × subject per IST day,
 * chosen deterministically from the subject's published practice pool (never test or live-reserved
 * items, F-006), auto-gradable types only. Everyone in the subject gets the same question that day:
 *
 *   pick = the practice question whose md5(key || ':' || istDay) is smallest
 *
 * The student answers it through the normal practice endpoint; a correct answer that day pays
 * COIN_EARN.dailyChallenge (at most `dailyChallengeAwardsPerDay` per day, inside the daily cap).
 */
import { and, asc, eq, inArray, or, sql } from 'drizzle-orm';
import { boards, chapters, coinLedger, studentQuestions, subjects, type Database } from '@soyl/db';
import { COIN_EARN } from '@soyl/shared/config/coins';
import { OBJECTIVE_TYPES } from '@soyl/shared/content/question';
import { activeReleases, inScope, studentQuestion, studentQuestionSelect, type StudentQuestion } from '../content';

export interface ChallengePick {
  subjectKey: string;
  questionKey: string;
  chapterId: string;
  chapterKey: string;
}

/** Small per-database cache: the pick for (subject, year, day) cannot change during the day except on a release switch. */
const cache = new WeakMap<object, Map<string, { pick: ChallengePick | null; at: number }>>();
const CACHE_MS = 10 * 60_000;

/** Today's challenge for one subject (by subject id), or null when the subject has no practice questions. */
export async function challengeForSubject(db: Database, year: string, subject: { id: string; key: string }, day: string, nowMs: number): Promise<ChallengePick | null> {
  let m = cache.get(db);
  if (!m) cache.set(db, (m = new Map()));
  const ck = `${subject.id}:${year}:${day}`;
  const hit = m.get(ck);
  if (hit && nowMs - hit.at < CACHE_MS) return hit.pick;

  const chs = await db.select({ id: chapters.id, key: chapters.key }).from(chapters).where(and(eq(chapters.subjectId, subject.id), eq(chapters.academicYear, year)));
  let pick: ChallengePick | null = null;
  if (chs.length) {
    const releases = await activeReleases(db, chs.map((c) => c.id), year);
    const scope = or(...chs.map((c) => and(eq(studentQuestions.chapterId, c.id), inScope(studentQuestions, 'question', releases.get(c.id) ?? null))))!;
    const [row] = await db
      .select({ key: studentQuestions.key, chapterId: studentQuestions.chapterId })
      .from(studentQuestions)
      .where(and(scope, eq(studentQuestions.academicYear, year), eq(studentQuestions.pool, 'practice'), inArray(studentQuestions.type, [...OBJECTIVE_TYPES])))
      .orderBy(sql`md5(${studentQuestions.key} || ':' || ${day})`, asc(studentQuestions.key))
      .limit(1);
    if (row) pick = { subjectKey: subject.key, questionKey: row.key, chapterId: row.chapterId, chapterKey: chs.find((c) => c.id === row.chapterId)!.key };
  }
  if (m.size > 5000) m.clear();
  m.set(ck, { pick, at: nowMs });
  return pick;
}

/** The challenge question key for a chapter's subject today (practice hook; read before the transaction). */
export async function challengeKeyForChapter(db: Database, year: string, chapterId: string, day: string, nowMs: number): Promise<{ subjectKey: string; challengeKey: string | null } | null> {
  const [s] = await db.select({ id: subjects.id, key: subjects.key }).from(chapters).innerJoin(subjects, eq(subjects.id, chapters.subjectId)).where(eq(chapters.id, chapterId));
  if (!s) return null;
  const pick = await challengeForSubject(db, year, s, day, nowMs);
  return { subjectKey: s.key, challengeKey: pick?.questionKey ?? null };
}

export interface DailyChallengeEntry {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  question: StudentQuestion;
  /** Signed-in only: you already earned today's challenge coins for this subject. */
  solved: boolean | null;
}

/** Challenges for every subject of a board and class that has practice questions. */
export async function dailyChallenges(db: Database, year: string, board: string, classLevel: number, day: string, nowMs: number, userId: string | null) {
  const subs = await db
    .select({ id: subjects.id, key: subjects.key, name: subjects.name })
    .from(subjects)
    .innerJoin(boards, eq(boards.id, subjects.boardId))
    .where(and(eq(boards.code, board), eq(subjects.classLevel, classLevel), eq(subjects.academicYear, year)))
    .orderBy(asc(subjects.priority), asc(subjects.tier), asc(subjects.name));
  const picks: { s: (typeof subs)[number]; p: ChallengePick }[] = [];
  for (const s of subs) {
    const p = await challengeForSubject(db, year, s, day, nowMs);
    if (p) picks.push({ s, p });
  }
  if (!picks.length) return { entries: [] as DailyChallengeEntry[], earnedToday: 0 };
  const releases = await activeReleases(db, [...new Set(picks.map(({ p }) => p.chapterId))], year);
  // One version per key: the one in the chapter's active release, else the current row (ADR-006).
  const rows = await db
    .select({ ...studentQuestionSelect, chapterId: studentQuestions.chapterId })
    .from(studentQuestions)
    .where(
      and(
        eq(studentQuestions.academicYear, year),
        eq(studentQuestions.pool, 'practice'),
        or(...picks.map(({ p }) => and(eq(studentQuestions.key, p.questionKey), eq(studentQuestions.chapterId, p.chapterId), inScope(studentQuestions, 'question', releases.get(p.chapterId) ?? null)))),
      ),
    );
  const titles = new Map(
    (await db.select({ id: chapters.id, title: chapters.title }).from(chapters).where(inArray(chapters.id, [...new Set(picks.map(({ p }) => p.chapterId))]))).map((c) => [c.id, c.title]),
  );
  let solvedSubjects = new Set<string>();
  let earnedToday = 0;
  if (userId) {
    const done = await db
      .select({ key: coinLedger.idempotencyKey })
      .from(coinLedger)
      .where(and(eq(coinLedger.userId, userId), eq(coinLedger.istDay, day), eq(coinLedger.source, 'daily_challenge')));
    earnedToday = done.length;
    solvedSubjects = new Set(done.map((d) => d.key.split(':').slice(3).join(':')));
  }
  const entries: DailyChallengeEntry[] = [];
  for (const { s, p } of picks) {
    const row = rows.find((r) => r.key === p.questionKey);
    if (!row) continue;
    entries.push({ subjectId: s.key, subjectName: s.name, chapterId: p.chapterKey, chapterTitle: titles.get(p.chapterId) ?? '', question: studentQuestion(row), solved: userId ? solvedSubjects.has(s.key) : null });
  }
  return { entries, earnedToday };
}

export const challengeCoins = () => ({ coins: COIN_EARN.dailyChallenge, awardsPerDay: COIN_EARN.dailyChallengeAwardsPerDay });
