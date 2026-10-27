/**
 * Live All-India mocks (ARCHITECTURE §9, CONTEXT §10, AC-11/AC-12, F-017, D-014; ADR-012).
 *
 * Window: registration from `registration_opens_at`; a registered student starts between `starts_at`
 * and `starts_at + late_start_minutes`; the deadline is start + duration, capped at
 * `ends_at + late_start_minutes` (= window start + duration + 15 min for a paper that fills the
 * window); saves are accepted until the deadline + 60 s (F-007). Questions exist in an attempt only
 * once it has started, so nobody sees them before `starts_at` (and live_reserved items additionally
 * carry `embargo_until`). While the window is open nobody can start an unranked copy.
 *
 * Ranks: provisional ranks are a KV sorted set per event (member = user id, score = auto-graded marks
 * with a time tie-break), written when an attempt is graded by the API. The worker's live.finalize job
 * computes final ranks in Postgres after the window (`live_registrations.final_rank/percentile/score`)
 * and publishes them; the leaderboard then reads Postgres. Only auto-graded marks rank (AC-14).
 *
 * Leaderboard rows show first name + last initial from the validated display name (F-017, AC-18) of
 * students whose consent is granted; everyone else is ranked but unnamed (D-014).
 */
import { and, asc, eq, inArray, isNotNull, sql } from 'drizzle-orm';
import { attempts, consentStatus, liveEvents, liveRegistrations, profiles, subjects, tests, users, type Database } from '@soyl/db';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import type { KeyValueStore } from '../../kv';
import { ApiProblem } from '../../errors';

export interface LiveEventRow {
  id: string;
  key: string;
  academicYear: string;
  testId: string;
  title: string;
  registrationOpensAt: Date;
  startsAt: Date;
  lateStartMinutes: number;
  endsAt: Date;
  status: string;
  resultsPublishedAt: Date | null;
}

export type LivePhase = 'cancelled' | 'upcoming' | 'registration_open' | 'live' | 'writing' | 'closed' | 'results_published';

const MIN = 60_000;

/** The last moment an attempt of this event can be writing (deadline cap). */
export const deadlineCap = (ev: Pick<LiveEventRow, 'endsAt' | 'lateStartMinutes'>) => new Date(ev.endsAt.getTime() + ev.lateStartMinutes * MIN);
/** Starts are allowed until this moment. */
export const startCutoff = (ev: Pick<LiveEventRow, 'startsAt' | 'lateStartMinutes'>) => new Date(ev.startsAt.getTime() + ev.lateStartMinutes * MIN);
/** After this, no save can be accepted any more (deadline cap + live grace). */
export const closesAt = (ev: Pick<LiveEventRow, 'endsAt' | 'lateStartMinutes'>) => new Date(deadlineCap(ev).getTime() + TEST_ENGINE.graceSeconds.live * 1000);

export function livePhase(ev: LiveEventRow, now: number): LivePhase {
  if (ev.status === 'cancelled') return 'cancelled';
  if (ev.status === 'results_published') return 'results_published';
  if (now < ev.registrationOpensAt.getTime()) return 'upcoming';
  if (now < ev.startsAt.getTime()) return 'registration_open';
  if (now < startCutoff(ev).getTime()) return 'live';
  if (now < closesAt(ev).getTime()) return 'writing';
  return 'closed';
}

const eventColumns = {
  id: liveEvents.id,
  key: liveEvents.key,
  academicYear: liveEvents.academicYear,
  testId: liveEvents.testId,
  title: liveEvents.title,
  registrationOpensAt: liveEvents.registrationOpensAt,
  startsAt: liveEvents.startsAt,
  lateStartMinutes: liveEvents.lateStartMinutes,
  endsAt: liveEvents.endsAt,
  status: liveEvents.status,
  resultsPublishedAt: liveEvents.resultsPublishedAt,
};

export async function liveEventByKey(db: Database, key: string, year: string): Promise<LiveEventRow> {
  const [ev] = await db.select(eventColumns).from(liveEvents).where(and(eq(liveEvents.key, key), eq(liveEvents.academicYear, year)));
  if (!ev) throw new ApiProblem('not_found');
  return ev;
}

export async function liveEventForTest(db: Database, testId: string): Promise<LiveEventRow | null> {
  const [ev] = await db.select(eventColumns).from(liveEvents).where(eq(liveEvents.testId, testId)).orderBy(asc(liveEvents.startsAt)).limit(1);
  return ev ?? null;
}

export async function liveEventById(db: Database, id: string): Promise<LiveEventRow | null> {
  const [ev] = await db.select(eventColumns).from(liveEvents).where(eq(liveEvents.id, id));
  return ev ?? null;
}

/* ---------------------------------------------------------------------------------------------- */
/* Provisional ranks (KV sorted sets)                                                             */
/* ---------------------------------------------------------------------------------------------- */

const SCALE = 1_000_000;
/** Higher auto score first; on equal marks, less time first. Exact for half marks up to 2,000 marks. */
export const compositeScore = (autoScore: number, timeTakenSec: number) => Math.round(autoScore * 2) * SCALE + (SCALE - 1 - Math.min(SCALE - 1, Math.max(0, Math.round(timeTakenSec))));
export const decodeComposite = (c: number) => ({ score: Math.floor(c / SCALE) / 2, timeTakenSec: SCALE - 1 - (c % SCALE) });

export class LiveRanks {
  constructor(private readonly kv: KeyValueStore) {}

  static key(eventId: string) {
    return `lb:live:${eventId}`;
  }

  async record(eventId: string, userId: string, autoScore: number, timeTakenSec: number): Promise<void> {
    await this.kv.zAdd(LiveRanks.key(eventId), userId, compositeScore(autoScore, timeTakenSec), TEST_ENGINE.live.leaderboardTtlDays * 86_400_000);
  }

  async rankOf(eventId: string, userId: string): Promise<{ rank: number; total: number; score: number; timeTakenSec: number } | null> {
    const key = LiveRanks.key(eventId);
    const c = await this.kv.zScore(key, userId);
    if (c === null) return null;
    const [above, total] = await Promise.all([this.kv.zCountAbove(key, c), this.kv.zCard(key)]);
    return { rank: above + 1, total, ...decodeComposite(c) };
  }

  async top(eventId: string, n: number) {
    const key = LiveRanks.key(eventId);
    const rows = await this.kv.zRevRange(key, 0, n - 1);
    // Competition ranks: equal composite scores share a rank.
    const out: { userId: string; rank: number; score: number; timeTakenSec: number }[] = [];
    rows.forEach((r, i) => {
      const prev = out[i - 1];
      const rank = prev && rows[i - 1]!.score === r.score ? prev.rank : i + 1;
      out.push({ userId: r.member, rank, ...decodeComposite(r.score) });
    });
    return { entries: out, total: await this.kv.zCard(key) };
  }

  async total(eventId: string) {
    return this.kv.zCard(LiveRanks.key(eventId));
  }

  /** Account deletion: drop the user from every provisional board they are on. */
  async remove(eventIds: string[], userId: string): Promise<void> {
    for (const id of eventIds) await this.kv.zRem(LiveRanks.key(id), userId);
  }
}

/** DELETE /v1/me: provisional live ranks are KV entries keyed by user id (PII.md). */
export async function removeFromLiveBoards(db: Database, kv: KeyValueStore, userId: string): Promise<number> {
  const rows = await db.select({ id: liveRegistrations.liveEventId }).from(liveRegistrations).where(eq(liveRegistrations.userId, userId));
  await new LiveRanks(kv).remove(rows.map((r) => r.id), userId);
  return rows.length;
}

/* ---------------------------------------------------------------------------------------------- */
/* Names (F-017)                                                                                   */
/* ---------------------------------------------------------------------------------------------- */

/** "Priya Sharma" → "Priya S."; "Priya" → "Priya". Display names are validated letters only (AC-18). */
export function firstNameLastInitial(displayName: string | null | undefined): string | null {
  const parts = (displayName ?? '').normalize('NFKC').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return null;
  const first = parts[0]!;
  if (parts.length === 1) return first;
  const initial = [...parts[parts.length - 1]!][0]!.toLocaleUpperCase('en-IN');
  return `${first} ${initial}.`;
}

/** Leaderboard names for user ids: only consented, non-deleted students with a display name. */
export async function leaderboardNames(db: Database, userIds: string[]): Promise<Map<string, string | null>> {
  if (!userIds.length) return new Map();
  const rows = await db
    .select({ id: users.id, deletedAt: users.deletedAt, displayName: profiles.displayName, consent: consentStatus.status })
    .from(users)
    .leftJoin(profiles, eq(profiles.userId, users.id))
    .leftJoin(consentStatus, eq(consentStatus.userId, users.id))
    .where(inArray(users.id, userIds));
  return new Map(rows.map((r) => [r.id, !r.deletedAt && r.consent === 'granted' ? firstNameLastInitial(r.displayName) : null]));
}

/* ---------------------------------------------------------------------------------------------- */
/* Endpoints                                                                                       */
/* ---------------------------------------------------------------------------------------------- */

export function eventDto(ev: LiveEventRow, test: { key: string; durationMin: number; totalMarks: number; subjectKey: string; subjectName: string }, now: number, mine: { registered: boolean; attemptId: string | null; attemptStatus: string | null } | null) {
  return {
    id: ev.key,
    title: ev.title,
    phase: livePhase(ev, now),
    subject: { id: test.subjectKey, name: test.subjectName },
    testId: test.key,
    durationMin: test.durationMin,
    totalMarks: test.totalMarks,
    registrationOpensAt: ev.registrationOpensAt.toISOString(),
    startsAt: ev.startsAt.toISOString(),
    lateStartUntil: startCutoff(ev).toISOString(),
    endsAt: ev.endsAt.toISOString(),
    resultsPublishedAt: ev.resultsPublishedAt?.toISOString() ?? null,
    /** Ranks are beta (AC-11): labelled as such until anomaly review exists. */
    ranksBeta: true,
    me: mine,
  };
}

export async function listLiveEvents(db: Database, year: string, now: number, userId: string | null, filter: { subjectKey?: string; board?: string; classLevel?: number }) {
  const conds = [eq(liveEvents.academicYear, year)];
  if (filter.subjectKey) conds.push(eq(subjects.key, filter.subjectKey));
  if (filter.classLevel) conds.push(eq(subjects.classLevel, filter.classLevel));
  const rows = await db
    .select({ ev: eventColumns, key: tests.key, durationMin: tests.durationMin, totalMarks: tests.totalMarks, subjectKey: subjects.key, subjectName: subjects.name, exam: subjects.exam })
    .from(liveEvents)
    .innerJoin(tests, eq(tests.id, liveEvents.testId))
    .innerJoin(subjects, eq(subjects.id, tests.subjectId))
    .where(and(...conds))
    .orderBy(asc(liveEvents.startsAt), asc(subjects.key));
  const filtered = filter.board ? rows.filter((r) => (filter.board === 'cbse' ? r.exam === 'cbse' : r.exam !== 'cbse')) : rows;
  const mine = new Map<string, { registered: boolean; attemptId: string | null; attemptStatus: string | null }>();
  if (userId && filtered.length) {
    const ids = filtered.map((r) => r.ev.id);
    const [regs, atts] = await Promise.all([
      db.select({ id: liveRegistrations.liveEventId }).from(liveRegistrations).where(and(eq(liveRegistrations.userId, userId), inArray(liveRegistrations.liveEventId, ids))),
      db.select({ ev: attempts.liveEventId, id: attempts.id, status: attempts.status }).from(attempts).where(and(eq(attempts.userId, userId), inArray(attempts.liveEventId, ids))),
    ]);
    const reg = new Set(regs.map((r) => r.id));
    const att = new Map(atts.map((a) => [a.ev!, a]));
    for (const id of ids) mine.set(id, { registered: reg.has(id), attemptId: att.get(id)?.id ?? null, attemptStatus: att.get(id)?.status ?? null });
  }
  return {
    events: filtered.map((r) => eventDto(r.ev, { key: r.key, durationMin: r.durationMin, totalMarks: Number(r.totalMarks), subjectKey: r.subjectKey, subjectName: r.subjectName }, now, userId ? (mine.get(r.ev.id) ?? null) : null)),
  };
}

async function eventWithTest(db: Database, key: string, year: string) {
  const ev = await liveEventByKey(db, key, year);
  const [t] = await db
    .select({ key: tests.key, durationMin: tests.durationMin, totalMarks: tests.totalMarks, subjectKey: subjects.key, subjectName: subjects.name })
    .from(tests)
    .innerJoin(subjects, eq(subjects.id, tests.subjectId))
    .where(eq(tests.id, ev.testId));
  return { ev, test: { ...t!, totalMarks: Number(t!.totalMarks) } };
}

/** POST /v1/live-events/:id/register — idempotent; open from registration until the late-start cutoff. */
export async function registerForLive(db: Database, year: string, now: number, userId: string, key: string) {
  const { ev, test } = await eventWithTest(db, key, year);
  const phase = livePhase(ev, now);
  if (phase !== 'registration_open' && phase !== 'live') throw new ApiProblem('live_not_open', { detail: phase === 'upcoming' ? `Registration opens at ${ev.registrationOpensAt.toISOString()}.` : 'Registration for this live test is closed.' });
  const at = new Date(now);
  await db.insert(liveRegistrations).values({ liveEventId: ev.id, userId, createdAt: at, updatedAt: at }).onConflictDoNothing();
  const [att] = await db.select({ id: attempts.id, status: attempts.status }).from(attempts).where(and(eq(attempts.userId, userId), eq(attempts.liveEventId, ev.id)));
  return eventDto(ev, test, now, { registered: true, attemptId: att?.id ?? null, attemptStatus: att?.status ?? null });
}

export async function liveLeaderboard(db: Database, kv: KeyValueStore, year: string, now: number, userId: string, key: string, limit: number) {
  const { ev, test } = await eventWithTest(db, key, year);
  const phase = livePhase(ev, now);
  const base = { event: eventDto(ev, test, now, null), maxScore: test.totalMarks };
  if (phase === 'upcoming' || phase === 'registration_open' || phase === 'cancelled') return { ...base, status: 'not_started' as const, total: 0, entries: [], me: null };

  if (phase === 'results_published') {
    const rows = await db
      .select({ userId: liveRegistrations.userId, rank: liveRegistrations.finalRank, score: liveRegistrations.score, percentile: liveRegistrations.percentile })
      .from(liveRegistrations)
      .where(and(eq(liveRegistrations.liveEventId, ev.id), isNotNull(liveRegistrations.finalRank)))
      .orderBy(asc(liveRegistrations.finalRank), asc(liveRegistrations.id))
      .limit(limit);
    const [count] = await db.select({ n: sql<number>`count(*)::int` }).from(liveRegistrations).where(and(eq(liveRegistrations.liveEventId, ev.id), isNotNull(liveRegistrations.finalRank)));
    const [me] = await db
      .select({ rank: liveRegistrations.finalRank, score: liveRegistrations.score, percentile: liveRegistrations.percentile })
      .from(liveRegistrations)
      .where(and(eq(liveRegistrations.liveEventId, ev.id), eq(liveRegistrations.userId, userId)));
    const names = await leaderboardNames(db, rows.map((r) => r.userId));
    return {
      ...base,
      status: 'final' as const,
      total: count?.n ?? 0,
      entries: rows.map((r) => ({ rank: r.rank!, name: names.get(r.userId) ?? null, score: Number(r.score ?? 0), isMe: r.userId === userId })),
      me: me?.rank ? { rank: me.rank, score: Number(me.score ?? 0), percentile: me.percentile === null ? null : Number(me.percentile) } : null,
    };
  }

  const ranks = new LiveRanks(kv);
  const [top, mine] = await Promise.all([ranks.top(ev.id, limit), ranks.rankOf(ev.id, userId)]);
  const names = await leaderboardNames(db, top.entries.map((e) => e.userId));
  return {
    ...base,
    status: 'provisional' as const,
    total: top.total,
    entries: top.entries.map((e) => ({ rank: e.rank, name: names.get(e.userId) ?? null, score: e.score, isMe: e.userId === userId })),
    me: mine ? { rank: mine.rank, score: mine.score, percentile: mine.total > 1 ? Math.round((1000 * (mine.total - mine.rank)) / (mine.total - 1)) / 10 : null } : null,
  };
}

/* ---------------------------------------------------------------------------------------------- */
/* GET /v1/live-events/:id (M5)                                                                    */
/* ---------------------------------------------------------------------------------------------- */

/**
 * One event with everything the live page needs: the phase timeline, registration window, your
 * registration/attempt (members), and whether ranks exist yet and whether you may see them (consent,
 * D-014). `consentGranted` is null for guests. Ranks themselves stay behind the consent-gated
 * leaderboard route.
 */
export async function liveEventDetail(db: Database, year: string, now: number, userId: string | null, key: string, consentGranted: boolean | null) {
  const { ev, test } = await eventWithTest(db, key, year);
  const phase = livePhase(ev, now);
  const cutoff = startCutoff(ev);
  const latestDeadline = deadlineCap(ev);
  const writingUntil = closesAt(ev);
  let mine: {
    registered: boolean;
    attemptId: string | null;
    attemptStatus: string | null;
    deadlineAt: string | null;
    canRegister: boolean;
    canStart: boolean;
    canResume: boolean;
    result: { rank: number; score: number; percentile: number | null } | null;
  } | null = null;
  if (userId) {
    const [[reg], [att]] = await Promise.all([
      db
        .select({ rank: liveRegistrations.finalRank, score: liveRegistrations.score, percentile: liveRegistrations.percentile })
        .from(liveRegistrations)
        .where(and(eq(liveRegistrations.liveEventId, ev.id), eq(liveRegistrations.userId, userId))),
      db.select({ id: attempts.id, status: attempts.status, deadlineAt: attempts.deadlineAt }).from(attempts).where(and(eq(attempts.userId, userId), eq(attempts.liveEventId, ev.id))),
    ]);
    const writing = att?.status === 'in_progress';
    const notStarted = !att || att.status === 'created';
    mine = {
      registered: !!reg,
      attemptId: att?.id ?? null,
      attemptStatus: att?.status ?? null,
      deadlineAt: att?.deadlineAt?.toISOString() ?? null,
      canRegister: !reg && (phase === 'registration_open' || phase === 'live'),
      canStart: notStarted && phase === 'live',
      canResume: writing && (phase === 'live' || phase === 'writing'),
      result: phase === 'results_published' && reg?.rank ? { rank: reg.rank, score: Number(reg.score ?? 0), percentile: reg.percentile === null ? null : Number(reg.percentile) } : null,
    };
  }
  const iso = (d: Date) => d.toISOString();
  const rankStatus: 'not_started' | 'provisional' | 'final' | 'unavailable' = phase === 'cancelled' ? 'unavailable' : phase === 'results_published' ? 'final' : phase === 'upcoming' || phase === 'registration_open' ? 'not_started' : 'provisional';
  return {
    ...eventDto(ev, test, now, null),
    me: mine,
    serverNow: iso(new Date(now)),
    lateStartMinutes: ev.lateStartMinutes,
    /** Saves are accepted until this instant (latest deadline + grace); then the event closes. */
    writingUntil: iso(writingUntil),
    latestDeadlineAt: iso(latestDeadline),
    graceSeconds: TEST_ENGINE.graceSeconds.live,
    timeline: [
      { phase: 'upcoming' as const, from: null, until: iso(ev.registrationOpensAt) },
      { phase: 'registration_open' as const, from: iso(ev.registrationOpensAt), until: iso(ev.startsAt) },
      { phase: 'live' as const, from: iso(ev.startsAt), until: iso(cutoff) },
      { phase: 'writing' as const, from: iso(cutoff), until: iso(writingUntil) },
      { phase: 'closed' as const, from: iso(writingUntil), until: ev.resultsPublishedAt ? iso(ev.resultsPublishedAt) : null },
      { phase: 'results_published' as const, from: ev.resultsPublishedAt ? iso(ev.resultsPublishedAt) : null, until: null },
    ],
    registration: { open: phase === 'registration_open' || phase === 'live', opensAt: iso(ev.registrationOpensAt), closesAt: iso(cutoff) },
    ranks: {
      status: rankStatus,
      beta: true,
      /** The leaderboard needs consent (D-014): GET /v1/live-events/:id/leaderboard answers 403 consent_required otherwise. */
      requiresConsent: true,
      consentGranted,
      canView: consentGranted === true && (rankStatus === 'provisional' || rankStatus === 'final'),
    },
  };
}
