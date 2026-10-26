/**
 * Attempts (ARCHITECTURE §9, AC-11, AC-12, F-007, API-7, API-9; ADR-012).
 *
 *   POST /v1/tests/:id/attempts     create or resume the caller's single active attempt; `start`
 *                                   (default) moves created → in_progress and sets deadline_at
 *   GET  /v1/attempts/:id           resume state: paper (student-safe), saved responses, server clock
 *   PUT  /v1/attempts/:id/responses batched autosave with per-item client sequence numbers
 *   POST /v1/attempts/:id/submit    idempotent submit (finalize.ts)
 *
 * Every attempt is loaded scoped to the caller (`WHERE id = $1 AND user_id = $2`): anyone else's id
 * is a 404 (API-7). An in-progress attempt whose deadline + grace has passed is auto-submitted the
 * moment any of these routes touches it (lazy check), besides the worker's sweep.
 */
import { randomBytes } from 'node:crypto';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { attempts, liveRegistrations, responses, tests, type Database } from '@soyl/db';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import type { Clock } from '../../clock';
import { ApiProblem } from '../../errors';
import type { KeyValueStore } from '../../kv';
import { responseKindFor, type PracticeResponse } from '../grading';
import { deliverPaper, outlineSections } from './delivery';
import { finalizeAttempt, graceMs, isFinal, pastGrace, type FinalizeResult } from './finalize';
import { loadStructure, publishedTestByKey, testById, type TestRow, type TestStructure } from './load';
import { closesAt, deadlineCap, LiveRanks, liveEventById, liveEventForTest, livePhase, startCutoff, type LiveEventRow } from './live';

export interface EngineContext {
  db: Database;
  kv: KeyValueStore;
  clock: Clock;
  year: string;
}

type AttemptRow = typeof attempts.$inferSelect;

export const finalizeCtx = (ctx: EngineContext) => ({
  db: ctx.db,
  now: new Date(ctx.clock.now()),
  onLiveGraded: (eventId: string, userId: string, autoScore: number, timeTakenSec: number) => new LiveRanks(ctx.kv).record(eventId, userId, autoScore, timeTakenSec),
});

/** The caller's attempt or 404 (API-7). Auto-submits it first when its time is over. */
export async function ownAttempt(ctx: EngineContext, userId: string, attemptId: string): Promise<AttemptRow> {
  const [a] = await ctx.db.select().from(attempts).where(and(eq(attempts.id, attemptId), eq(attempts.userId, userId)));
  if (!a) throw new ApiProblem('not_found');
  if (a.status === 'in_progress' && pastGrace(a, ctx.clock.now())) {
    await finalizeAttempt(finalizeCtx(ctx), a.id, 'auto');
    const [b] = await ctx.db.select().from(attempts).where(eq(attempts.id, a.id));
    return b!;
  }
  return a;
}

/** A published test the caller may use: custom tests only by their creator (404 otherwise). */
export async function accessibleTest(ctx: EngineContext, key: string, userId: string | null): Promise<TestRow> {
  const test = await publishedTestByKey(ctx.db, key, ctx.year);
  if (!test || (test.createdByUserId && test.createdByUserId !== userId)) throw new ApiProblem('not_found');
  return test;
}

/* ---------------------------------------------------------------------------------------------- */
/* State DTO                                                                                       */
/* ---------------------------------------------------------------------------------------------- */

export async function attemptState(ctx: EngineContext, a: AttemptRow, test?: TestRow) {
  const t = test ?? (await testById(ctx.db, a.testId));
  if (!t) throw new ApiProblem('not_found');
  const structure = await loadStructure(ctx.db, t);
  const ev = a.liveEventId ? await liveEventById(ctx.db, a.liveEventId) : null;
  const now = ctx.clock.now();
  const started = a.status !== 'created';
  const paper = started ? deliverPaper(structure, a.shuffleSeed) : null;
  const saved = started
    ? await ctx.db
        .select({ itemId: responses.testItemId, answer: responses.answer, markedForReview: responses.markedForReview, timeSpentSec: responses.timeSpentSec, seq: responses.clientSeq, savedAt: responses.autosavedAt })
        .from(responses)
        .where(eq(responses.attemptId, a.id))
    : [];
  return {
    attempt: {
      id: a.id,
      status: a.status as 'created' | 'in_progress' | 'submitted' | 'auto_submitted',
      testId: t.key,
      testVersion: t.version,
      liveEventId: ev?.key ?? null,
      ranked: !!ev,
      startedAt: a.startedAt?.toISOString() ?? null,
      deadlineAt: a.deadlineAt?.toISOString() ?? null,
      submittedAt: a.submittedAt?.toISOString() ?? null,
      /** Server clock: the player's timer is display only; compute an offset from this (AC-12). */
      serverNow: new Date(now).toISOString(),
      remainingSec: a.status === 'in_progress' && a.deadlineAt ? Math.max(0, Math.floor((a.deadlineAt.getTime() - now) / 1000)) : null,
      /** F-007: saves whose changes claim a time ≤ deadline are accepted until deadline + grace. */
      graceSeconds: graceMs(a.liveEventId) / 1000,
      tabSwitchCount: a.tabSwitchCount,
    },
    test: testHeader(t, structure),
    sections: paper?.sections ?? outlineSections(structure).map((s) => ({ ...s, itemIds: [] as string[], choiceGroups: s.choiceGroups.map((g) => ({ ...g, itemIds: [] as string[] })) })),
    items: paper?.items ?? [],
    responses: saved.map((r) => ({
      itemId: r.itemId,
      response: (r.answer ?? null) as PracticeResponse | null,
      markedForReview: r.markedForReview,
      timeSpentSec: r.timeSpentSec,
      seq: r.seq,
      savedAt: r.savedAt.toISOString(),
    })),
  };
}

export function testHeader(t: TestRow, structure: TestStructure) {
  return {
    id: t.key,
    version: t.version,
    title: t.title,
    kind: t.kind,
    paperType: t.paperType,
    subject: { id: t.subject.key, name: t.subject.name, board: t.subject.board, classLevel: t.subject.classLevel },
    chapterIds: [...t.chapterKeys],
    durationMin: t.durationMin,
    totalMarks: t.totalMarks,
    questionCount: structure.items.length,
    shuffle: t.shuffle,
  };
}

/* ---------------------------------------------------------------------------------------------- */
/* Create / resume / start                                                                         */
/* ---------------------------------------------------------------------------------------------- */

function assertDeliverable(structure: TestStructure, now: number) {
  // AC-11: an item still under embargo can never be served, even if the event was mis-scheduled.
  const embargoed = structure.items.some((i) => i.question.pool === 'live_reserved' && (!i.question.embargoUntil || i.question.embargoUntil.getTime() > now));
  if (embargoed) throw new ApiProblem('test_unavailable', { detail: 'The questions of this test are not released yet.' });
  if (!structure.items.length) throw new ApiProblem('test_unavailable');
}

function deadlineFor(test: TestRow, now: number, ev: LiveEventRow | null): Date {
  const end = now + test.durationMin * 60_000;
  return new Date(ev ? Math.min(end, deadlineCap(ev).getTime()) : end);
}

export async function startOrResume(ctx: EngineContext, userId: string, testKey: string, opts: { start: boolean }) {
  const now = ctx.clock.now();
  const test = await accessibleTest(ctx, testKey, userId);
  const structure = await loadStructure(ctx.db, test);

  // Live tests: ranked inside the window, unranked once the event is over (AC-11 (e): never while it runs).
  let ev: LiveEventRow | null = null;
  if (test.kind === 'live') {
    const event = await liveEventForTest(ctx.db, test.id);
    if (event) {
      const phase = livePhase(event, now);
      if (phase === 'cancelled') throw new ApiProblem('test_unavailable');
      if (phase === 'writing') {
        const [own] = await ctx.db.select().from(attempts).where(and(eq(attempts.userId, userId), eq(attempts.liveEventId, event.id)));
        if (!own) throw new ApiProblem('live_not_open', { detail: 'The late-start window has closed.' });
      } else if (phase === 'upcoming') throw new ApiProblem('live_not_open', { detail: `Registration opens at ${event.registrationOpensAt.toISOString()}.` });
      if (phase !== 'closed' && phase !== 'results_published') ev = event;
      // After the event a waiting-room attempt that never started is dropped, so an unranked attempt can begin.
      else await ctx.db.delete(attempts).where(and(eq(attempts.userId, userId), eq(attempts.liveEventId, event.id), eq(attempts.status, 'created')));
    }
  }

  // An existing active attempt (any version of this test key) is resumed, never duplicated (AC-12).
  const active = await ctx.db
    .select({ a: attempts })
    .from(attempts)
    .innerJoin(tests, eq(tests.id, attempts.testId))
    .where(and(eq(attempts.userId, userId), eq(tests.key, test.key), eq(tests.academicYear, ctx.year), inArray(attempts.status, ['created', 'in_progress']), ev ? eq(attempts.liveEventId, ev.id) : sql`${attempts.liveEventId} IS NULL`));
  let row = active[0]?.a ?? null;
  if (row && row.status === 'in_progress' && pastGrace(row, now)) {
    await finalizeAttempt(finalizeCtx(ctx), row.id, 'auto');
    row = null;
  }
  if (ev && !row) {
    const [done] = await ctx.db.select({ id: attempts.id }).from(attempts).where(and(eq(attempts.userId, userId), eq(attempts.liveEventId, ev.id)));
    if (done) throw new ApiProblem('attempt_closed', { detail: 'You have already taken this live test.' });
  }

  const wantStart = opts.start;
  const canStartLive = !ev || (now >= ev.startsAt.getTime() && now < startCutoff(ev).getTime());
  if (row) {
    const rowTest = row.testId === test.id ? test : ((await testById(ctx.db, row.testId)) ?? test);
    if (row.status === 'created' && wantStart) {
      if (!canStartLive) throw liveWindowProblem(ev!, now);
      const rowStructure = rowTest === test ? structure : await loadStructure(ctx.db, rowTest);
      assertDeliverable(rowStructure, now);
      const [started] = await ctx.db
        .update(attempts)
        .set({ status: 'in_progress', startedAt: new Date(now), deadlineAt: deadlineFor(rowTest, now, ev), updatedAt: new Date(now) })
        .where(and(eq(attempts.id, row.id), eq(attempts.status, 'created')))
        .returning();
      row = started ?? (await ctx.db.select().from(attempts).where(eq(attempts.id, row.id)))[0]!;
    }
    return { created: false, state: await attemptState(ctx, row, rowTest) };
  }

  if (wantStart) {
    if (!canStartLive) throw liveWindowProblem(ev!, now);
    assertDeliverable(structure, now);
  } else if (ev && now >= startCutoff(ev).getTime()) throw liveWindowProblem(ev, now);
  if (ev) {
    // Starting (or entering the waiting room) registers the student (ADR-012).
    await ctx.db.insert(liveRegistrations).values({ liveEventId: ev.id, userId, createdAt: new Date(now), updatedAt: new Date(now) }).onConflictDoNothing();
  }
  const at = new Date(now);
  try {
    const [created] = await ctx.db
      .insert(attempts)
      .values({
        userId,
        testId: test.id,
        liveEventId: ev?.id ?? null,
        status: wantStart ? 'in_progress' : 'created',
        startedAt: wantStart ? at : null,
        deadlineAt: wantStart ? deadlineFor(test, now, ev) : null,
        shuffleSeed: randomBytes(12).toString('base64url'),
        createdAt: at,
        updatedAt: at,
      })
      .returning();
    return { created: true, state: await attemptState(ctx, created!, test) };
  } catch (err) {
    // A parallel request (second tab) created it first: resume that one (DB-2 partial unique index).
    if ((err as { cause?: { code?: string } }).cause?.code === '23505' || (err as { code?: string }).code === '23505') {
      const [again] = await ctx.db
        .select()
        .from(attempts)
        .where(and(eq(attempts.userId, userId), eq(attempts.testId, test.id), ev ? eq(attempts.liveEventId, ev.id) : inArray(attempts.status, ['created', 'in_progress'])));
      if (again && !isFinal(again.status)) return { created: false, state: await attemptState(ctx, again, test) };
      if (again) throw new ApiProblem('attempt_closed', { detail: 'You have already taken this live test.' });
    }
    throw err;
  }
}

function liveWindowProblem(ev: LiveEventRow, now: number): ApiProblem {
  if (now < ev.startsAt.getTime()) return new ApiProblem('live_not_open', { detail: `The test starts at ${ev.startsAt.toISOString()}.` });
  return new ApiProblem('live_not_open', { detail: 'The late-start window has closed.' });
}

/* ---------------------------------------------------------------------------------------------- */
/* Autosave                                                                                        */
/* ---------------------------------------------------------------------------------------------- */

export interface SaveEntry {
  itemId: string;
  seq: number;
  /** The student's response (PracticeResponse shape); null clears it. */
  response: PracticeResponse | null;
  markedForReview?: boolean;
  timeSpentSec?: number;
  /** Advisory client time of this change (F-007). */
  changedAt?: string;
}

export interface SaveBatch {
  items: SaveEntry[];
  tabSwitchCount?: number;
}

export interface SaveResult {
  status: string;
  serverNow: string;
  deadlineAt: string | null;
  /** Applied now (stored seq = this seq). */
  applied: { itemId: string; seq: number }[];
  /** Already have this or a newer state: the client can drop the entry (stored seq ≥ sent). */
  stale: { itemId: string; seq: number; storedSeq: number }[];
  /** Refused: changes claimed after the deadline, received in the grace window (F-007). Drop them. */
  rejected: { itemId: string; seq: number; reason: 'after_deadline' }[];
}

function validateEntries(structure: TestStructure, entries: SaveEntry[]) {
  const errors: { path: string; message: string }[] = [];
  const seen = new Map<string, number>();
  entries.forEach((e, i) => {
    const item = structure.byItemId.get(e.itemId);
    if (!item) return errors.push({ path: `body.items.${i}.itemId`, message: 'Not an item of this test.' });
    if (seen.has(e.itemId) && seen.get(e.itemId)! >= e.seq) return; // duplicates: the highest seq wins below
    seen.set(e.itemId, e.seq);
    if (e.response !== null) {
      const kind = responseKindFor(item.question.type);
      if (!(kind in e.response)) errors.push({ path: `body.items.${i}.response`, message: `A ${item.question.type} question needs an answer with "${kind}".` });
    }
  });
  if (errors.length) throw new ApiProblem('validation_failed', { errors: errors.slice(0, 20) });
}

export async function saveResponses(ctx: EngineContext, userId: string, attemptId: string, batch: SaveBatch): Promise<SaveResult> {
  const a = await ownAttempt(ctx, userId, attemptId);
  if (a.status !== 'in_progress') throw new ApiProblem(a.status === 'created' ? 'conflict' : 'attempt_closed', { detail: a.status === 'created' ? 'Start the attempt first.' : 'This attempt has been submitted.' });
  const now = ctx.clock.now();
  const test = await testById(ctx.db, a.testId);
  const structure = await loadStructure(ctx.db, test!);
  validateEntries(structure, batch.items);

  // One state per item: the highest sequence in this batch.
  const latest = new Map<string, SaveEntry>();
  for (const e of batch.items) if (!latest.has(e.itemId) || latest.get(e.itemId)!.seq < e.seq) latest.set(e.itemId, e);
  const deadline = a.deadlineAt!.getTime();
  const inGrace = now > deadline;
  const rejected: SaveResult['rejected'] = [];
  const toSave: SaveEntry[] = [];
  for (const e of latest.values()) {
    // F-007: after the deadline only changes that claim to predate it are accepted (offline queue flush).
    const claimed = e.changedAt ? Date.parse(e.changedAt) : Number.NaN;
    if (inGrace && !(Number.isFinite(claimed) && claimed <= deadline)) rejected.push({ itemId: e.itemId, seq: e.seq, reason: 'after_deadline' });
    else toSave.push(e);
  }

  const at = new Date(now);
  // One statement, no explicit transaction (the hot path under load, §16): the CTE takes FOR SHARE on
  // the attempt row, so a concurrent submit (FOR UPDATE) waits for this save, or this save finds the
  // attempt closed and inserts nothing. Only a higher sequence replaces a stored state.
  let applied: { itemId: string; seq: number }[] = [];
  if (toSave.length) {
    const rows = toSave.map(
      (e) =>
        sql`(${e.itemId}::uuid, ${e.response === null ? null : JSON.stringify(e.response)}::jsonb, ${e.markedForReview ?? false}::boolean, ${Math.max(0, Math.min(Math.round(e.timeSpentSec ?? 0), 24 * 3600))}::int, ${e.changedAt && Number.isFinite(Date.parse(e.changedAt)) ? new Date(e.changedAt).toISOString() : null}::timestamptz, ${e.seq}::bigint)`,
    );
    const res = await ctx.db.execute<{ test_item_id: string; client_seq: string | number }>(sql`
      WITH open AS (SELECT id FROM ${attempts} WHERE id = ${a.id} AND status = 'in_progress' FOR SHARE)
      INSERT INTO ${responses} (attempt_id, test_item_id, answer, marked_for_review, time_spent_sec, client_saved_at, autosaved_at, client_seq, created_at, updated_at)
      SELECT open.id, v.item, v.answer, v.mfr, v.tss, v.csa, ${at.toISOString()}::timestamptz, v.seq, ${at.toISOString()}::timestamptz, ${at.toISOString()}::timestamptz
      FROM open, (VALUES ${sql.join(rows, sql`, `)}) AS v(item, answer, mfr, tss, csa, seq)
      ON CONFLICT (attempt_id, test_item_id) DO UPDATE SET
        answer = excluded.answer,
        marked_for_review = excluded.marked_for_review,
        time_spent_sec = GREATEST(responses.time_spent_sec, excluded.time_spent_sec),
        client_saved_at = excluded.client_saved_at,
        autosaved_at = excluded.autosaved_at,
        client_seq = excluded.client_seq,
        updated_at = excluded.updated_at
      WHERE responses.client_seq < excluded.client_seq
      RETURNING test_item_id, client_seq`);
    applied = res.rows.map((r) => ({ itemId: r.test_item_id, seq: Number(r.client_seq) }));
  }
  const appliedIds = new Set(applied.map((r) => r.itemId));
  const staleEntries = toSave.filter((e) => !appliedIds.has(e.itemId));
  let stale: SaveResult['stale'] = [];
  if (staleEntries.length) {
    // Nothing applied for these: either a newer state is stored, or the attempt closed meanwhile.
    const [cur] = await ctx.db.select({ status: attempts.status }).from(attempts).where(eq(attempts.id, a.id));
    if (cur?.status !== 'in_progress') throw new ApiProblem('attempt_closed', { detail: 'This attempt has been submitted.' });
    const stored = await ctx.db
      .select({ itemId: responses.testItemId, seq: responses.clientSeq })
      .from(responses)
      .where(and(eq(responses.attemptId, a.id), inArray(responses.testItemId, staleEntries.map((e) => e.itemId))));
    const by = new Map(stored.map((s) => [s.itemId, Number(s.seq)]));
    stale = staleEntries.map((e) => ({ itemId: e.itemId, seq: e.seq, storedSeq: by.get(e.itemId) ?? 0 }));
  }
  if (batch.tabSwitchCount !== undefined && batch.tabSwitchCount > a.tabSwitchCount)
    await ctx.db
      .update(attempts)
      .set({ tabSwitchCount: Math.min(batch.tabSwitchCount, 10_000), updatedAt: at })
      .where(and(eq(attempts.id, a.id), eq(attempts.status, 'in_progress'), sql`${attempts.tabSwitchCount} < ${Math.min(batch.tabSwitchCount, 10_000)}`));
  return { status: 'in_progress', serverNow: at.toISOString(), deadlineAt: a.deadlineAt!.toISOString(), applied, stale, rejected };
}

/* ---------------------------------------------------------------------------------------------- */
/* Submit                                                                                          */
/* ---------------------------------------------------------------------------------------------- */

export async function submitAttempt(ctx: EngineContext, userId: string, attemptId: string, finalBatch?: SaveBatch): Promise<FinalizeResult & { saved: SaveResult | null }> {
  const a = await ownAttempt(ctx, userId, attemptId);
  if (a.status === 'created') throw new ApiProblem('conflict', { detail: 'Start the attempt first.' });
  let saved: SaveResult | null = null;
  if (a.status === 'in_progress' && finalBatch?.items.length) {
    try {
      saved = await saveResponses(ctx, userId, attemptId, finalBatch);
    } catch (err) {
      // A racing submit already closed it: fall through to the idempotent result.
      if (!(err instanceof ApiProblem && err.code === 'attempt_closed')) throw err;
    }
  }
  const r = await finalizeAttempt(finalizeCtx(ctx), a.id, 'submit');
  return { ...r, saved };
}

/** Live attempts: the hard close for an event (used by the worker and tests). */
export { closesAt };
