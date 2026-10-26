/**
 * Final live-mock ranks (ARCHITECTURE §9 "final rank snapshot to Postgres"; ADR-012). Run by the
 * worker's `live.finalize` job; safe to re-run.
 *
 * For every event whose window has closed (deadline cap + live grace + finalizeDelaySeconds) and
 * whose results are not published:
 *   1. auto-submit its remaining in-progress attempts (same code path as everywhere else);
 *   2. rank the graded attempts in one statement — auto-graded marks descending, then time taken
 *      ascending (AC-14: no self/AI marks) — and write rank, percentile and score to
 *      `live_registrations` (registered students who never started keep NULLs);
 *   3. mark the event `results_published`.
 * Postgres is the source of truth for final ranks; the KV sorted set only served provisional ranks.
 */
import { and, eq, inArray, lt, sql } from 'drizzle-orm';
import { attempts, liveEvents, liveRegistrations, type Database } from '@soyl/db';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import { autoSubmitExpired, type FinalizeContext } from './finalize';
import { closesAt } from './live';

export interface LiveFinalizeResult {
  events: number;
  autoSubmitted: number;
  ranked: number;
}

export async function finalizeLiveEvents(ctx: FinalizeContext): Promise<LiveFinalizeResult> {
  const { db, now } = ctx;
  const candidates = await db
    .select()
    .from(liveEvents)
    .where(and(inArray(liveEvents.status, ['scheduled', 'open', 'closed']), lt(liveEvents.startsAt, now)));
  const due = candidates.filter((ev) => closesAt(ev).getTime() + TEST_ENGINE.live.finalizeDelaySeconds * 1000 <= now.getTime());
  let autoSubmitted = 0;
  let ranked = 0;
  for (const ev of due) {
    const r = await autoSubmitExpired(ctx, { liveEventId: ev.id });
    autoSubmitted += r.submitted;
    const [left] = await db.select({ n: sql<number>`count(*)::int` }).from(attempts).where(and(eq(attempts.liveEventId, ev.id), eq(attempts.status, 'in_progress')));
    if ((left?.n ?? 0) > 0) continue; // something could not be finalised; try again next run
    ranked += await rankEvent(db, ev.id, now);
  }
  return { events: due.length, autoSubmitted, ranked };
}

export async function rankEvent(db: Database, eventId: string, now: Date): Promise<number> {
  return db.transaction(async (tx) => {
    // Starting a live attempt registers the student; this repairs any gap so every ranked attempt has its row.
    await tx.execute(sql`
      INSERT INTO ${liveRegistrations} (live_event_id, user_id)
      SELECT live_event_id, user_id FROM ${attempts}
      WHERE live_event_id = ${eventId} AND graded_at IS NOT NULL
      ON CONFLICT (live_event_id, user_id) DO NOTHING`);
    const res = await tx.execute(sql`
      WITH ranked AS (
        SELECT user_id, auto_score,
          rank() OVER (ORDER BY auto_score DESC, time_taken_sec ASC) AS r,
          round((100 * percent_rank() OVER (ORDER BY auto_score ASC))::numeric, 4) AS p
        FROM ${attempts}
        WHERE live_event_id = ${eventId} AND status IN ('submitted', 'auto_submitted') AND graded_at IS NOT NULL
      )
      UPDATE ${liveRegistrations} lr
      SET final_rank = ranked.r, percentile = ranked.p, score = ranked.auto_score, updated_at = ${now.toISOString()}::timestamptz
      FROM ranked
      WHERE lr.live_event_id = ${eventId} AND lr.user_id = ranked.user_id`);
    await tx.update(liveEvents).set({ status: 'results_published', resultsPublishedAt: now, updatedAt: now }).where(eq(liveEvents.id, eventId));
    return res.rowCount ?? 0;
  });
}
