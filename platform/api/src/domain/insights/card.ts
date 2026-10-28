/**
 * GET /v1/me/card: the private player card (FIFA-Ultimate-Team-inspired). Evidence is read from the
 * caller's own data (API-7) and fed to the pure, deterministic @soyl/shared/learning/card playerCard.
 * The card carries the D-039 public name, never the real name, and is shown only to its owner.
 */
import { eq, sql } from 'drizzle-orm';
import { istDay, streaks, type Database } from '@soyl/db';
import { PLAYER_CARD } from '@soyl/shared/config/learning';
import { levelForXp } from '@soyl/shared/config/gamification';
import { publicName } from '@soyl/shared/config/public-names';
import { playerCard, type CardEvidence } from '@soyl/shared/learning/card';
import { chapterMastery } from '@soyl/shared/learning/mastery';
import type { Clock } from '../../clock';
import { balanceOf } from '../coins/ledger';
import { loadProfile } from '../profile';
import { activeDays, windowStart } from './activity';
import { chapterEvidence, firstTryByChapter } from './mastery';

/** Test questions answered fully right (auto-graded) with a recorded time: expected vs spent seconds. */
async function speedEvidence(db: Database, userId: string): Promise<CardEvidence['speed']> {
  const res = await db.execute<{ items: number; expected: number; spent: number }>(sql`
    SELECT count(*)::int AS items, coalesce(sum(q.expected_time_sec), 0)::int AS expected, coalesce(sum(r.time_spent_sec), 0)::int AS spent
    FROM attempts a
    JOIN responses r ON r.attempt_id = a.id
    JOIN test_items ti ON ti.id = r.test_item_id
    JOIN questions q ON q.id = ti.question_id
    JOIN evaluations e ON e.response_id = r.id AND e.mode = 'auto'
    WHERE a.user_id = ${userId} AND a.graded_at IS NOT NULL AND r.time_spent_sec > 0 AND q.expected_time_sec > 0
      AND e.max_marks > 0 AND e.marks IS NOT NULL AND e.marks >= e.max_marks`);
  const r = res.rows[0];
  return r && Number(r.items) > 0 ? { items: Number(r.items), expectedSec: Number(r.expected), spentSec: Number(r.spent) } : null;
}

/** Distinct tests with a graded attempt, and the mean percentage of each test's latest graded attempt. */
async function testEvidence(db: Database, userId: string): Promise<{ n: number; mean: number | null }> {
  const res = await db.execute<{ n: number; mean: number | null }>(sql`
    SELECT count(*)::int AS n, avg(pct)::float8 AS mean FROM (
      SELECT DISTINCT ON (test_id) (score / max_score * 100)::float8 AS pct FROM attempts
      WHERE user_id = ${userId} AND graded_at IS NOT NULL AND max_score > 0
      ORDER BY test_id, submitted_at DESC, id DESC) t`);
  const r = res.rows[0];
  return { n: Number(r?.n ?? 0), mean: r?.mean === null || r?.mean === undefined ? null : Number(r.mean) };
}

/** Chapters with a lesson started or a practice answer. */
async function touchedChapters(db: Database, userId: string): Promise<{ id: string; key: string }[]> {
  const res = await db.execute<{ id: string; key: string }>(sql`
    SELECT c.id, c.key FROM chapters c WHERE c.id IN (
      SELECT chapter_id FROM lesson_progress WHERE user_id = ${userId}
      UNION SELECT chapter_id FROM practice_answers WHERE user_id = ${userId})`);
  return res.rows;
}

export async function cardEvidence(db: Database, today: string, year: string, userId: string): Promise<CardEvidence> {
  const [firstTry, active, speed, touched, testsTaken] = await Promise.all([
    firstTryByChapter(db, userId),
    activeDays(db, userId, windowStart(today, PLAYER_CARD.attributes.CON.windowDays)),
    speedEvidence(db, userId),
    touchedChapters(db, userId),
    testEvidence(db, userId),
  ]);
  const evidence = await chapterEvidence(db, year, userId, touched);
  let checked = 0;
  let correct = 0;
  for (const f of firstTry.values()) {
    checked += f.checked;
    correct += f.correct;
  }
  return {
    firstTryChecked: checked,
    firstTryCorrect: correct,
    activeDaysInWindow: active,
    speed,
    chaptersTouched: touched.length,
    masteryScores: [...evidence.values()].map((e) => chapterMastery(e).score),
    testsTaken: testsTaken.n,
    testsMeanPct: testsTaken.mean,
  };
}

export async function playerCardFor(db: Database, clock: Clock, year: string, userId: string) {
  const today = istDay(new Date(clock.now()));
  const [evidence, profile, [s], coins] = await Promise.all([
    cardEvidence(db, today, year, userId),
    loadProfile(db, userId),
    db.select({ totalXp: streaks.totalXp }).from(streaks).where(eq(streaks.userId, userId)),
    balanceOf(db, userId),
  ]);
  const xp = s?.totalXp ?? 0;
  return {
    publicName: publicName(userId, profile?.publicNameSeed ?? 0),
    level: levelForXp(xp).level,
    xp,
    coins,
    ...playerCard(evidence),
    asOfDay: today,
  };
}
