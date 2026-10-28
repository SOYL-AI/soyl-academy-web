/**
 * Weekly leagues (ARCHITECTURE §12, CONTEXT §11, D-014; backend-api M5). Numbers and tiers:
 * platform/shared/config/gamification.ts (LEAGUES, LEAGUE_TIERS, leagueZones).
 *
 * - **Week.** An IST week, Monday 00:00 to Sunday 23:59:59 IST (GEN-6). League XP is the XP the
 *   student earned in that week (`xp_events.ist_day`), computed live while the league is open, so no
 *   XP-awarding code path has to know about leagues.
 * - **Cohort.** Class leagues group students by board + class (`cbse-10`). School and city leagues are
 *   opt-in and need school/city fields (consent-gated), so they are not served yet.
 * - **Divisions.** Inside a cohort, students play in their tier, in divisions of at most LEAGUES.size.
 *   The weekly job forms balanced divisions for returning students (last week's members), leaving
 *   room; anyone else joins on their first visit of the week, filling the lowest open division.
 * - **Close.** After the week, the job (or the student's next visit, lazily) ranks each division:
 *   XP desc, then whoever reached their total first, then whoever joined first. The top places are
 *   promoted (never with 0 XP, never from the top tier), the bottom places relegated (never from the
 *   bottom tier). Final XP, rank and outcome stay on `league_memberships` (cascade on account purge).
 * - **Privacy (D-014, F-017, AC-18).** Only students with consent `granted` are placed in a league,
 *   and the route itself needs consent. Standings carry rank, XP and the auto-generated public name (D-039); the
 *   name is null when that student's consent is no longer granted. Deleted accounts are left out.
 *
 * Concurrency: joins and division formation for one (week, cohort, tier) take a transaction-scoped
 * advisory lock, so two first visits never overfill a division; every query inside a transaction
 * uses the transaction's connection (pool safety, see ADR-012 "Load test").
 */
import { and, asc, desc, eq, isNull, lt, sql } from 'drizzle-orm';
import { createHash } from 'node:crypto';
import { consentStatus, istDay, leagueMemberships, leagues, profiles, users, type Database } from '@soyl/db';
import { LEAGUE_TIERS, LEAGUES, leagueZones } from '@soyl/shared/config/gamification';
import { dayNumber, dayString, weekMonday } from '../gamification';
import { leaderboardIdentities } from '../tests/live';
import { onLeagueClosed } from '../coins/awards';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
type Db = Database | Tx;

const DAY_MS = 86_400_000;
const IST_OFFSET_MS = 330 * 60_000;

export type LeagueScope = 'class' | 'school' | 'city';
export type LeagueZone = 'promotion' | 'safe' | 'relegation';
export type LeagueOutcome = 'promoted' | 'stayed' | 'relegated';

/* ---------------------------------------------------------------------------------------------- */
/* Weeks, tiers, zones (pure)                                                                      */
/* ---------------------------------------------------------------------------------------------- */

export interface LeagueWeek {
  /** IST Monday, YYYY-MM-DD. */
  start: string;
  /** IST Sunday, YYYY-MM-DD. */
  end: string;
  startsAt: Date;
  endsAt: Date;
}

export function leagueWeek(now: number): LeagueWeek {
  const start = weekMonday(istDay(new Date(now)));
  const startsAt = new Date(dayNumber(start) * DAY_MS - IST_OFFSET_MS);
  return { start, end: dayString(dayNumber(start) + 6), startsAt, endsAt: new Date(startsAt.getTime() + 7 * DAY_MS) };
}

export function weekOf(start: string): LeagueWeek {
  return leagueWeek(dayNumber(start) * DAY_MS - IST_OFFSET_MS);
}

export const previousWeekStart = (start: string) => dayString(dayNumber(start) - 7);

export const cohortKey = (board: string, classLevel: number) => `${board}-${classLevel}`;

export const MAX_TIER = LEAGUE_TIERS.length;
export const clampTier = (tier: number) => Math.min(MAX_TIER, Math.max(1, Math.round(tier)));

/** Next week's tier from a closed membership. */
export function nextTier(prev: { tier: number; outcome: string | null } | null | undefined): number {
  if (!prev) return 1;
  return clampTier(prev.tier + (prev.outcome === 'promoted' ? 1 : prev.outcome === 'relegated' ? -1 : 0));
}

export function tierDto(tier: number) {
  const t = clampTier(tier);
  const def = LEAGUE_TIERS[t - 1]!;
  return { level: t, key: def.key, name: def.name, icon: def.icon };
}

export interface StandingRow {
  membershipId: string;
  userId: string;
  xp: number;
  lastXpAt: Date | null;
  joinedAt: Date;
}

/** Strict order: XP desc, then who reached their total first, then who joined first, then id. */
export function rankStandings<T extends StandingRow>(rows: T[]): (T & { rank: number })[] {
  const t = (d: Date | null) => (d ? d.getTime() : Number.MAX_SAFE_INTEGER);
  return [...rows]
    .sort((a, b) => b.xp - a.xp || t(a.lastXpAt) - t(b.lastXpAt) || a.joinedAt.getTime() - b.joinedAt.getTime() || (a.membershipId < b.membershipId ? -1 : 1))
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

/** The zone of `rank` (1-based) in a division of `n` in tier `tier`, with `xp` this week. */
export function zoneFor(rank: number, n: number, tier: number, xp: number): LeagueZone {
  const { promote, relegate } = leagueZones(n, tier);
  if (rank <= promote && xp >= LEAGUES.minXpToPromote) return 'promotion';
  if (relegate > 0 && rank > n - relegate) return 'relegation';
  return 'safe';
}

export const outcomeFor = (zone: LeagueZone): LeagueOutcome => (zone === 'promotion' ? 'promoted' : zone === 'relegation' ? 'relegated' : 'stayed');

/** Splits `n` students into ceil(n / size) divisions whose sizes differ by at most one. */
export function divisionSizes(n: number, size: number = LEAGUES.size): number[] {
  if (n <= 0) return [];
  const k = Math.ceil(n / size);
  const base = Math.floor(n / k);
  return Array.from({ length: k }, (_, i) => base + (i < n % k ? 1 : 0));
}

/** Deterministic weekly shuffle, so divisions mix differently every week. */
export const shuffleKey = (userId: string, week: string) => createHash('sha256').update(`${week}:${userId}`).digest('hex');

/* ---------------------------------------------------------------------------------------------- */
/* Standings and closing                                                                           */
/* ---------------------------------------------------------------------------------------------- */

type LeagueRow = typeof leagues.$inferSelect;

/** Members of a league (deleted accounts left out) with their XP in the league's week. */
export async function leagueStandings(db: Db, league: Pick<LeagueRow, 'id' | 'weekStart' | 'tier'>) {
  const week = weekOf(league.weekStart);
  const res = await db.execute(sql`
    SELECT m.id AS membership_id, m.user_id, m.created_at AS joined_at,
           coalesce(sum(x.amount), 0)::int AS xp, max(x.created_at) AS last_xp_at
    FROM league_memberships m
    JOIN users u ON u.id = m.user_id AND u.deleted_at IS NULL
    LEFT JOIN xp_events x ON x.user_id = m.user_id AND x.ist_day >= ${week.start}::date AND x.ist_day <= ${week.end}::date
    WHERE m.league_id = ${league.id}
    GROUP BY m.id, m.user_id, m.created_at`);
  const rows = (res.rows as { membership_id: string; user_id: string; joined_at: Date | string; xp: number; last_xp_at: Date | string | null }[]).map((r) => ({
    membershipId: r.membership_id,
    userId: r.user_id,
    xp: Number(r.xp),
    lastXpAt: r.last_xp_at === null ? null : new Date(r.last_xp_at),
    joinedAt: new Date(r.joined_at),
  }));
  const ranked = rankStandings(rows);
  return ranked.map((r) => ({ ...r, zone: zoneFor(r.rank, ranked.length, league.tier, r.xp) }));
}

/** Closes one league if its week has ended (idempotent): final XP, rank and outcome per member. */
export async function closeLeague(db: Database, leagueId: string, now: number): Promise<boolean> {
  return db.transaction(async (tx) => {
    const [league] = await tx.select().from(leagues).where(eq(leagues.id, leagueId)).for('update');
    if (!league || league.status === 'closed') return false;
    if (weekOf(league.weekStart).endsAt.getTime() > now) return false;
    const at = new Date(now);
    const standings = await leagueStandings(tx, league);
    for (const s of standings)
      await tx.update(leagueMemberships).set({ xp: s.xp, finalRank: s.rank, outcome: outcomeFor(s.zone), updatedAt: at }).where(eq(leagueMemberships.id, s.membershipId));
    // SOYL Coins (ADR-021): promotion and top-finish coins, consent-gated, idempotent per league.
    await onLeagueClosed(tx, league.id, at, standings.map((s) => ({ userId: s.userId, rank: s.rank, xp: s.xp, outcome: outcomeFor(s.zone) })));
    await tx.update(leagues).set({ status: 'closed', closedAt: at, updatedAt: at }).where(eq(leagues.id, leagueId));
    return true;
  });
}

/** Closes every open league whose week has ended. */
export async function closeEndedLeagues(db: Database, now: number, opts: { limit?: number } = {}): Promise<number> {
  const current = leagueWeek(now).start;
  const open = await db
    .select({ id: leagues.id })
    .from(leagues)
    .where(and(eq(leagues.status, 'open'), lt(leagues.weekStart, current)))
    .orderBy(asc(leagues.weekStart), asc(leagues.id))
    .limit(opts.limit ?? 10_000);
  let closed = 0;
  for (const l of open) if (await closeLeague(db, l.id, now)) closed++;
  return closed;
}

/* ---------------------------------------------------------------------------------------------- */
/* Joining and forming                                                                             */
/* ---------------------------------------------------------------------------------------------- */

interface Cohort {
  scope: LeagueScope;
  scopeKey: string;
}

const lockGroup = (tx: Tx, week: string, c: Cohort, tier: number) => tx.execute(sql`SELECT pg_advisory_xact_lock(hashtext(${`league:${week}:${c.scope}:${c.scopeKey}:${tier}`}))`);

async function openDivisions(tx: Tx, week: string, c: Cohort, tier: number) {
  return tx
    .select({ id: leagues.id, division: leagues.division, members: sql<number>`count(${leagueMemberships.id})::int` })
    .from(leagues)
    .leftJoin(leagueMemberships, eq(leagueMemberships.leagueId, leagues.id))
    .where(and(eq(leagues.weekStart, week), eq(leagues.scope, c.scope), eq(leagues.scopeKey, c.scopeKey), eq(leagues.tier, tier)))
    .groupBy(leagues.id, leagues.division)
    .orderBy(asc(leagues.division));
}

/** Places one student (idempotent): the lowest division of their tier with room, or a new one. */
export async function joinLeague(db: Database, userId: string, c: Cohort, week: string, tier: number, now: number): Promise<string> {
  return db.transaction(async (tx) => {
    await lockGroup(tx, week, c, tier);
    const [existing] = await tx
      .select({ leagueId: leagueMemberships.leagueId })
      .from(leagueMemberships)
      .where(and(eq(leagueMemberships.userId, userId), eq(leagueMemberships.weekStart, week), eq(leagueMemberships.scope, c.scope)));
    if (existing?.leagueId) return existing.leagueId;
    const divisions = await openDivisions(tx, week, c, tier);
    let leagueId = divisions.find((d) => d.members < LEAGUES.size)?.id;
    const at = new Date(now);
    if (!leagueId) {
      const division = (divisions[divisions.length - 1]?.division ?? 0) + 1;
      const [l] = await tx.insert(leagues).values({ weekStart: week, scope: c.scope, scopeKey: c.scopeKey, tier, division, createdAt: at, updatedAt: at }).returning({ id: leagues.id });
      leagueId = l!.id;
    }
    await tx
      .insert(leagueMemberships)
      .values({ userId, weekStart: week, scope: c.scope, scopeKey: c.scopeKey, tier, leagueId, createdAt: at, updatedAt: at })
      .onConflictDoUpdate({ target: [leagueMemberships.userId, leagueMemberships.weekStart, leagueMemberships.scope], set: { leagueId, tier, scopeKey: c.scopeKey, updatedAt: at } });
    return leagueId;
  });
}

/** Students who may play: role student, not deleted, consent granted, board and class set. */
const eligible = () => and(eq(users.role, 'student'), isNull(users.deletedAt), eq(consentStatus.status, 'granted'), sql`${profiles.board} IS NOT NULL`, sql`${profiles.classLevel} IS NOT NULL`);

export interface FormResult {
  week: string;
  students: number;
  leaguesCreated: number;
}

/**
 * Forms the current week's class leagues for last week's members who are still eligible (tier from
 * last week's outcome, cohort from their current profile). Groups that already have divisions (a
 * re-run, or students who joined first) are filled one by one instead. Idempotent.
 */
export async function formWeek(db: Database, now: number): Promise<FormResult> {
  const week = leagueWeek(now).start;
  const prev = previousWeekStart(week);
  const rows = await db
    .select({ userId: leagueMemberships.userId, tier: leagueMemberships.tier, outcome: leagueMemberships.outcome, board: profiles.board, classLevel: profiles.classLevel })
    .from(leagueMemberships)
    .innerJoin(users, eq(users.id, leagueMemberships.userId))
    .innerJoin(profiles, eq(profiles.userId, users.id))
    .innerJoin(consentStatus, eq(consentStatus.userId, users.id))
    .where(
      and(
        eq(leagueMemberships.weekStart, prev),
        eq(leagueMemberships.scope, 'class'),
        eligible(),
        sql`NOT EXISTS (SELECT 1 FROM league_memberships cur WHERE cur.user_id = ${leagueMemberships.userId} AND cur.week_start = ${week}::date AND cur.scope = 'class')`,
      ),
    );
  const groups = new Map<string, { cohort: Cohort; tier: number; userIds: string[] }>();
  for (const r of rows) {
    const cohort: Cohort = { scope: 'class', scopeKey: cohortKey(r.board!, r.classLevel!) };
    const tier = nextTier(r);
    const k = `${cohort.scopeKey}|${tier}`;
    const g = groups.get(k) ?? { cohort, tier, userIds: [] };
    g.userIds.push(r.userId);
    groups.set(k, g);
  }
  let leaguesCreated = 0;
  let students = 0;
  const at = new Date(now);
  for (const g of groups.values()) {
    const ordered = [...g.userIds].sort((a, b) => (shuffleKey(a, week) < shuffleKey(b, week) ? -1 : 1));
    const placedAll = await db.transaction(async (tx) => {
      await lockGroup(tx, week, g.cohort, g.tier);
      if ((await openDivisions(tx, week, g.cohort, g.tier)).length) return false;
      let i = 0;
      for (const [d, n] of divisionSizes(ordered.length).entries()) {
        const [l] = await tx
          .insert(leagues)
          .values({ weekStart: week, scope: 'class', scopeKey: g.cohort.scopeKey, tier: g.tier, division: d + 1, createdAt: at, updatedAt: at })
          .returning({ id: leagues.id });
        leaguesCreated++;
        const members = ordered.slice(i, i + n);
        i += n;
        await tx
          .insert(leagueMemberships)
          .values(members.map((userId) => ({ userId, weekStart: week, scope: 'class', scopeKey: g.cohort.scopeKey, tier: g.tier, leagueId: l!.id, createdAt: at, updatedAt: at })))
          .onConflictDoNothing();
      }
      return true;
    });
    if (!placedAll) for (const userId of ordered) await joinLeague(db, userId, g.cohort, week, g.tier, now);
    students += ordered.length;
  }
  return { week, students, leaguesCreated };
}

/** The worker job: close ended leagues, then form the current week. */
export async function runLeagueWeek(db: Database, now: number): Promise<{ closed: number } & FormResult> {
  const closed = await closeEndedLeagues(db, now);
  return { closed, ...(await formWeek(db, now)) };
}

/* ---------------------------------------------------------------------------------------------- */
/* GET /v1/leagues/current                                                                         */
/* ---------------------------------------------------------------------------------------------- */

export type LeagueStatus = 'active' | 'class_required' | 'students_only';

/**
 * The caller's league this week. The route has already checked consent (D-014). On the first visit
 * of a week this closes the student's ended league (if the job has not yet) and places them.
 */
export async function currentLeague(db: Database, now: number, userId: string, scope: LeagueScope) {
  const week = leagueWeek(now);
  const base = {
    scope,
    serverNow: new Date(now).toISOString(),
    week: { start: week.start, end: week.end, startsAt: week.startsAt.toISOString(), endsAt: week.endsAt.toISOString() },
  };
  const empty = (status: LeagueStatus, cohort: { key: string; board: 'cbse' | 'cisce'; classLevel: number } | null = null) => ({
    ...base,
    status,
    cohort,
    league: null,
    standings: [],
    me: null,
    lastWeek: null,
  });

  const [u] = await db
    .select({ role: users.role, board: profiles.board, classLevel: profiles.classLevel })
    .from(users)
    .leftJoin(profiles, eq(profiles.userId, users.id))
    .where(eq(users.id, userId));
  if (!u || u.role !== 'student') return empty('students_only');
  if (!u.board || !u.classLevel) return empty('class_required');
  const cohort = { key: cohortKey(u.board, u.classLevel), board: u.board as 'cbse' | 'cisce', classLevel: u.classLevel };

  // Last week (or earlier): close it lazily if the job has not run yet, so the tier carries over.
  const [prev] = await db
    .select({ m: leagueMemberships, status: leagues.status })
    .from(leagueMemberships)
    .leftJoin(leagues, eq(leagues.id, leagueMemberships.leagueId))
    .where(and(eq(leagueMemberships.userId, userId), eq(leagueMemberships.scope, scope), lt(leagueMemberships.weekStart, week.start)))
    .orderBy(desc(leagueMemberships.weekStart))
    .limit(1);
  let last = prev?.m;
  if (prev?.m.leagueId && prev.status === 'open' && (await closeLeague(db, prev.m.leagueId, now)))
    [last] = await db.select().from(leagueMemberships).where(eq(leagueMemberships.id, prev.m.id));

  const leagueId = await joinLeague(db, userId, { scope, scopeKey: cohort.key }, week.start, nextTier(last), now);
  const [league] = await db.select().from(leagues).where(eq(leagues.id, leagueId));
  const standings = await leagueStandings(db, league!);
  const ids = await leaderboardIdentities(db, standings.map((s) => s.userId));
  const zones = leagueZones(standings.length, league!.tier);
  const mine = standings.find((s) => s.userId === userId);
  return {
    ...base,
    status: 'active' as const,
    cohort,
    league: {
      id: league!.id,
      tier: tierDto(league!.tier),
      division: league!.division,
      size: standings.length,
      capacity: LEAGUES.size,
      promotionPlaces: zones.promote,
      relegationPlaces: zones.relegate,
      minXpToPromote: LEAGUES.minXpToPromote,
      isTopTier: league!.tier >= MAX_TIER,
      isBottomTier: league!.tier <= 1,
    },
    standings: standings.map((s) => ({ rank: s.rank, name: ids.get(s.userId)?.name ?? null, avatar: ids.get(s.userId)?.avatar ?? null, xp: s.xp, zone: s.zone, isMe: s.userId === userId })),
    me: mine ? { rank: mine.rank, xp: mine.xp, zone: mine.zone } : null,
    lastWeek: last
      ? {
          weekStart: last.weekStart,
          tier: tierDto(last.tier),
          finalRank: last.finalRank,
          xp: last.xp,
          outcome: (last.outcome as LeagueOutcome | null) ?? null,
        }
      : null,
  };
}

