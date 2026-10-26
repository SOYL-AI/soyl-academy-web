/**
 * Attempt finalisation (ARCHITECTURE §9, §12; ADR-012): submit (student), lazy auto-submit (API
 * reads after deadline + grace) and the worker's auto-submit sweep all end here.
 *
 *   in_progress ──submit, received ≤ deadline + grace──▶ submitted
 *   in_progress ──deadline + grace passed (any path)───▶ auto_submitted (submitted_at = deadline)
 *
 * One transaction with the attempt row locked (`FOR UPDATE`): a second submit, a racing autosave
 * (which holds `FOR SHARE`) or the worker waits and then sees the final state, so finalisation is
 * idempotent and nothing is saved after grading. Grading writes `evaluations` (mode auto) per
 * answered item, the attempt's score split, the percentile bucket (first graded attempt per user and
 * test version), XP, streak and badges. Live attempts are ranked after commit (`onLiveGraded`).
 */
import { and, eq, inArray, ne, sql } from 'drizzle-orm';
import { attempts, evaluations, responses, testScoreBuckets, type Database } from '@soyl/db';
import { TEST_XP_RULES, XP_AWARDS } from '@soyl/shared/config/gamification';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import { awardXp, evaluateBadges, recordActivity, refreshTotals, type StreakView } from '../gamification';
import { loadKeys, loadStructure, testById, type TestStructure } from './load';
import { aggregate, gradeItem, scoreBucket, type Aggregate, type ItemOutcome } from './score';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];

export const FINAL_STATUSES = ['submitted', 'auto_submitted'] as const;
export const isFinal = (status: string) => status === 'submitted' || status === 'auto_submitted';

export const graceMs = (liveEventId: string | null) => (liveEventId ? TEST_ENGINE.graceSeconds.live : TEST_ENGINE.graceSeconds.normal) * 1000;

/** True once deadline + grace has passed: the attempt can only be auto-submitted now. */
export const pastGrace = (a: { deadlineAt: Date | null; liveEventId: string | null }, now: number) => !!a.deadlineAt && now > a.deadlineAt.getTime() + graceMs(a.liveEventId);

export interface FinalizeContext {
  db: Database;
  now: Date;
  /** Live attempts: provisional rank update after commit (API: KV sorted set; the worker has none). */
  onLiveGraded?: (liveEventId: string, userId: string, autoScore: number, timeTakenSec: number) => Promise<void>;
}

export interface FinalizeResult {
  attemptId: string;
  status: 'submitted' | 'auto_submitted';
  alreadyFinal: boolean;
  submittedAt: Date;
  score: number;
  maxScore: number;
  autoScore: number;
  pendingSelfEvaluation: { items: number; marks: number };
  xpAwarded: number;
  badgesAwarded: string[];
  streak: StreakView | null;
}

/** Grades every item of an attempt from its stored responses and self-evaluations. */
export async function gradeAttempt(db: Database | Tx, structure: TestStructure, keysDb: Database, attemptId: string): Promise<{ outcomes: Map<string, ItemOutcome>; agg: Aggregate; responseIds: Map<string, string> }> {
  const keys = await loadKeys(keysDb, structure);
  const rows = await db.select({ id: responses.id, itemId: responses.testItemId, answer: responses.answer }).from(responses).where(eq(responses.attemptId, attemptId));
  const self = rows.length
    ? await db
        .select({ responseId: evaluations.responseId, marks: evaluations.marks })
        .from(evaluations)
        .where(and(inArray(evaluations.responseId, rows.map((r) => r.id)), eq(evaluations.mode, 'self')))
    : [];
  const selfBy = new Map(self.map((s) => [s.responseId, s.marks === null ? null : Number(s.marks)]));
  const byItem = new Map(rows.map((r) => [r.itemId, r]));
  const outcomes = new Map<string, ItemOutcome>();
  for (const item of structure.items) {
    const r = byItem.get(item.itemId);
    outcomes.set(item.itemId, gradeItem(item, keys.get(item.question.id), r?.answer ?? null, r ? (selfBy.get(r.id) ?? null) : null));
  }
  return { outcomes, agg: aggregate(structure, outcomes), responseIds: new Map(rows.map((r) => [r.itemId, r.id])) };
}

export async function finalizeAttempt(ctx: FinalizeContext, attemptId: string, mode: 'submit' | 'auto'): Promise<FinalizeResult> {
  const { db, now } = ctx;
  let live: { eventId: string; userId: string; autoScore: number; timeTakenSec: number } | null = null;
  const result = await db.transaction(async (tx) => {
    const [a] = await tx.select().from(attempts).where(eq(attempts.id, attemptId)).for('update');
    if (!a) throw new Error(`attempt ${attemptId} not found`);
    if (isFinal(a.status)) return summaryOf(a, true);
    if (a.status !== 'in_progress' || !a.startedAt || !a.deadlineAt) throw new Error(`attempt ${attemptId} has not started`);

    const late = pastGrace(a, now.getTime());
    const status = mode === 'submit' && !late ? 'submitted' : 'auto_submitted';
    const submittedAt = status === 'submitted' ? now : a.deadlineAt;
    const test = await testById(db, a.testId);
    if (!test) throw new Error(`test ${a.testId} not found`);
    const structure = await loadStructure(db, test);
    const { outcomes, agg, responseIds } = await gradeAttempt(tx, structure, db, a.id);

    // Auto evaluations for answered items with an auto-graded part (idempotent per response and mode).
    const autoRows = [...outcomes.values()]
      .filter((o) => o.answered && o.autoMax > 0 && responseIds.has(o.itemId))
      .map((o) => ({
        responseId: responseIds.get(o.itemId)!,
        mode: 'auto',
        status: 'done',
        marks: o.autoMarks,
        maxMarks: o.autoMax,
        feedback: (o.grade?.parts.length ? o.grade.parts : o.grade ? [o.grade] : []).map((p) => ({ part: 'id' in p ? p.id : null, correct: p.correct, awarded: p.marksAwarded, max: p.maxMarks, grading: p.grading })),
        createdAt: now,
        updatedAt: now,
      }));
    if (autoRows.length) await tx.insert(evaluations).values(autoRows).onConflictDoNothing();

    const timeTakenSec = Math.max(0, Math.min(test.durationMin * 60, Math.round((submittedAt.getTime() - a.startedAt.getTime()) / 1000)));
    const [earlier] = await tx
      .select({ id: attempts.id })
      .from(attempts)
      .where(and(eq(attempts.userId, a.userId), eq(attempts.testId, a.testId), eq(attempts.countsForStats, true), ne(attempts.id, a.id)))
      .limit(1);
    const countsForStats = !earlier;
    const [updated] = await tx
      .update(attempts)
      .set({
        status,
        submittedAt,
        score: agg.score,
        maxScore: agg.maxScore,
        autoScore: agg.autoScore,
        selfScore: agg.selfScore,
        sectionScores: agg.sections,
        timeTakenSec,
        countsForStats,
        gradedAt: now,
        updatedAt: now,
      })
      .where(eq(attempts.id, a.id))
      .returning();
    if (countsForStats)
      await tx
        .insert(testScoreBuckets)
        .values({ testId: a.testId, bucket: scoreBucket(agg.autoScore), attempts: 1, createdAt: now, updatedAt: now })
        .onConflictDoUpdate({ target: [testScoreBuckets.testId, testScoreBuckets.bucket], set: { attempts: sql`${testScoreBuckets.attempts} + 1`, updatedAt: now } });

    // XP (ARCHITECTURE §12): once per test (key) / live event, only for a paper at least half answered.
    const awards: Parameters<typeof awardXp>[3] = [];
    const answeredShare = agg.totalSlots ? agg.answeredSlots / agg.totalSlots : 0;
    if (answeredShare >= TEST_XP_RULES.testMinAnsweredShare) {
      if (a.liveEventId) awards.push({ kind: 'live_event', amount: XP_AWARDS.liveTestSubmitted, sourceType: 'live_event', sourceId: a.liveEventId });
      else if (test.kind === 'custom') awards.push({ kind: 'test_submitted', amount: XP_AWARDS.customTestSubmitted, sourceType: 'custom_test', sourceId: test.key });
      else awards.push({ kind: 'test_submitted', amount: XP_AWARDS.testSubmitted, sourceType: 'test', sourceId: test.key });
    }
    if (agg.autoMaxCounted >= TEST_XP_RULES.perfectMinAutoMarks && Math.abs(agg.autoScore - agg.autoMaxCounted) < 1e-9 && test.kind !== 'custom')
      awards.push({ kind: 'test_submitted', amount: XP_AWARDS.testPerfectBonus, sourceType: 'test_perfect', sourceId: test.key });
    const xpAwarded = await awardXp(tx, a.userId, now, awards);
    const streak = await recordActivity(tx, a.userId, now);
    if (xpAwarded) await refreshTotals(tx, a.userId);
    const badgesAwarded = await evaluateBadges(db, tx, a.userId, now);

    if (a.liveEventId) live = { eventId: a.liveEventId, userId: a.userId, autoScore: agg.autoScore, timeTakenSec };
    return { ...summaryOf(updated!, false, agg), xpAwarded, badgesAwarded, streak };
  });
  if (live && ctx.onLiveGraded) {
    const l = live as { eventId: string; userId: string; autoScore: number; timeTakenSec: number };
    await ctx.onLiveGraded(l.eventId, l.userId, l.autoScore, l.timeTakenSec);
  }
  return result;
}

function summaryOf(a: typeof attempts.$inferSelect, alreadyFinal: boolean, agg?: Aggregate): FinalizeResult {
  return {
    attemptId: a.id,
    status: a.status as 'submitted' | 'auto_submitted',
    alreadyFinal,
    submittedAt: a.submittedAt!,
    score: Number(a.score ?? 0),
    maxScore: Number(a.maxScore ?? 0),
    autoScore: Number(a.autoScore ?? 0),
    pendingSelfEvaluation: agg ? { items: agg.pendingSelfItems, marks: agg.pendingSelfMarks } : { items: 0, marks: 0 },
    xpAwarded: 0,
    badgesAwarded: [],
    streak: null,
  };
}

/**
 * Worker sweep (and tests): auto-submits every in-progress attempt whose deadline + grace has passed.
 * Each attempt is finalised in its own transaction; rows another process holds are skipped.
 */
export async function autoSubmitExpired(ctx: FinalizeContext, opts: { batchSize?: number; liveEventId?: string } = {}): Promise<{ submitted: number; failed: number }> {
  const batch = opts.batchSize ?? TEST_ENGINE.autoSubmit.batchSize;
  let submitted = 0;
  let failed = 0;
  const seen = new Set<string>();
  const now = ctx.now.toISOString();
  for (;;) {
    const res = await ctx.db.execute<{ id: string }>(sql`
      SELECT id FROM ${attempts}
      WHERE status = 'in_progress'
        AND deadline_at + make_interval(secs => CASE WHEN live_event_id IS NULL THEN ${TEST_ENGINE.graceSeconds.normal} ELSE ${TEST_ENGINE.graceSeconds.live} END) < ${now}::timestamptz
        ${opts.liveEventId ? sql`AND live_event_id = ${opts.liveEventId}` : sql``}
      ORDER BY deadline_at
      LIMIT ${batch}
      FOR UPDATE SKIP LOCKED`);
    // The SELECT above only peeks (autocommit releases the locks); each attempt is locked again in finalizeAttempt.
    const ids = res.rows.map((r) => r.id).filter((id) => !seen.has(id));
    if (!ids.length) break;
    ids.forEach((id) => seen.add(id));
    for (const id of ids) {
      try {
        await finalizeAttempt(ctx, id, 'auto');
        submitted++;
      } catch {
        failed++;
      }
    }
    if (res.rows.length < batch) break;
  }
  return { submitted, failed };
}
