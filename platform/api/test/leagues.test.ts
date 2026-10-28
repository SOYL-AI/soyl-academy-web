/**
 * Weekly leagues (backend-api M5; ARCHITECTURE §12, CONTEXT §11, D-014, F-017): IST weeks, class
 * cohorts, divisions of at most LEAGUES.size, week XP from xp_events, promotion and relegation zones,
 * lazy close + placement on the first visit of a week, the weekly formation job's logic, consent gate,
 * names (auto-generated public names only, D-039) and account deletion.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { consentStatus, leagueMemberships, leagues, profiles, users, xpEvents } from '@soyl/db';
import { LEAGUE_TIERS, LEAGUES, leagueZones } from '@soyl/shared/config/gamification';
import { publicName } from '@soyl/shared/config/public-names';
import { defaultAvatar } from '@soyl/shared/config/avatars';
import { createHarness, type Client, type Harness } from './helpers';
import {
  closeEndedLeagues,
  cohortKey,
  divisionSizes,
  formWeek,
  joinLeague,
  leagueStandings,
  leagueWeek,
  nextTier,
  previousWeekStart,
  rankStandings,
  runLeagueWeek,
  shuffleKey,
  tierDto,
  weekOf,
  zoneFor,
} from '../src/domain/leagues/leagues';

let h: Harness;
const DAY = 86_400_000;
/** Wednesday 28 Oct 2026, 12:00 IST. The league week is Mon 26 Oct – Sun 1 Nov (IST). */
const WED = Date.UTC(2026, 9, 28, 6, 30);
const WEEK = '2026-10-26';
const PREV = '2026-10-19';
let n = 0;

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'granted' });
  h.clock.set(WED);
});
afterAll(async () => {
  await h?.close();
});

async function student(displayName: string | null, board: 'cbse' | 'cisce' | null = 'cbse', classLevel: number | null = 10): Promise<{ c: Client; id: string; email: string }> {
  const c = h.client();
  const email = `league.${Date.now().toString(36)}${++n}@example.com`;
  const r = await c.signInEmail(email);
  const patch: Record<string, unknown> = {};
  if (displayName) patch.displayName = displayName;
  if (board) patch.board = board;
  if (classLevel) patch.classLevel = classLevel;
  if (Object.keys(patch).length) expect((await c.patch('/v1/me', patch)).statusCode).toBe(200);
  return { c, id: r.user.id, email };
}

/** A student made directly in the database (fast; for division sizes and the formation job). */
async function dbStudent(o: { board?: string | null; classLevel?: number | null; consent?: string | null; role?: 'student' | 'parent'; deleted?: boolean; name?: string } = {}) {
  const tag = `${Date.now().toString(36)}${++n}`;
  const [u] = await h.t.db
    .insert(users)
    .values({ name: `Db ${tag}`, email: `db.${tag}@example.com`, role: o.role ?? 'student', deletedAt: o.deleted ? new Date(WED) : null })
    .returning({ id: users.id });
  await h.t.db.insert(profiles).values({ userId: u!.id, displayName: o.name ?? 'Meera Rao', board: o.board === undefined ? 'cbse' : o.board, classLevel: o.classLevel === undefined ? 10 : o.classLevel });
  if (o.consent !== null) await h.t.db.insert(consentStatus).values({ userId: u!.id, status: o.consent ?? 'granted', provider: 'mock' });
  return u!.id;
}

let src = 0;
async function xp(userId: string, amount: number, at: number) {
  const d = new Date(at);
  const istDay = new Date(at + 330 * 60_000).toISOString().slice(0, 10);
  await h.t.db.insert(xpEvents).values({ userId, kind: 'practice', amount, sourceType: 'test', sourceId: `s${++src}`, istDay, createdAt: d, updatedAt: d });
}

describe('league rules (pure)', () => {
  it('weeks are IST Monday 00:00 to the next Monday 00:00', () => {
    const w = leagueWeek(WED);
    expect(w).toEqual({ start: WEEK, end: '2026-11-01', startsAt: new Date('2026-10-25T18:30:00.000Z'), endsAt: new Date('2026-11-01T18:30:00.000Z') });
    expect(leagueWeek(Date.parse('2026-11-01T18:29:59.999Z')).start).toBe(WEEK);
    expect(leagueWeek(Date.parse('2026-11-01T18:30:00.000Z')).start).toBe('2026-11-02');
    expect(leagueWeek(Date.parse('2026-10-25T18:30:00.000Z')).start).toBe(WEEK);
    expect(weekOf(WEEK)).toEqual(w);
    expect(previousWeekStart(WEEK)).toBe(PREV);
    expect(cohortKey('cisce', 9)).toBe('cisce-9');
  });

  it('zones, tiers and division sizes', () => {
    expect(leagueZones(30, 2)).toEqual({ promote: 5, relegate: 5 });
    expect(leagueZones(30, 1)).toEqual({ promote: 5, relegate: 0 });
    expect(leagueZones(30, LEAGUE_TIERS.length)).toEqual({ promote: 0, relegate: 5 });
    expect(leagueZones(5, 3)).toEqual({ promote: 1, relegate: 0 });
    expect(leagueZones(1, 3)).toEqual({ promote: 0, relegate: 0 });
    expect(leagueZones(6, 3)).toEqual({ promote: 1, relegate: 1 });
    expect(zoneFor(1, 12, 2, 50)).toBe('promotion');
    expect(zoneFor(2, 12, 2, 50)).toBe('promotion');
    expect(zoneFor(1, 12, 2, 0)).toBe('safe'); // never promoted with 0 XP
    expect(zoneFor(3, 12, 2, 50)).toBe('safe');
    expect(zoneFor(11, 12, 2, 0)).toBe('relegation');
    expect(zoneFor(12, 12, 1, 0)).toBe('safe'); // bottom tier
    expect(nextTier(null)).toBe(1);
    expect(nextTier({ tier: 2, outcome: 'promoted' })).toBe(3);
    expect(nextTier({ tier: 2, outcome: 'relegated' })).toBe(1);
    expect(nextTier({ tier: 1, outcome: 'relegated' })).toBe(1);
    expect(nextTier({ tier: LEAGUE_TIERS.length, outcome: 'promoted' })).toBe(LEAGUE_TIERS.length);
    expect(nextTier({ tier: 3, outcome: null })).toBe(3);
    expect(tierDto(1)).toEqual({ level: 1, key: 'bronze', name: 'Bronze', icon: 'shield' });
    expect(tierDto(99).level).toBe(LEAGUE_TIERS.length);
    expect(divisionSizes(0)).toEqual([]);
    expect(divisionSizes(30)).toEqual([30]);
    expect(divisionSizes(31)).toEqual([16, 15]);
    expect(divisionSizes(65)).toEqual([22, 22, 21]);
    expect(divisionSizes(65).every((s) => s <= LEAGUES.size)).toBe(true);
    expect(shuffleKey('a', WEEK)).not.toBe(shuffleKey('a', PREV));
  });

  it('ranks by XP, then who reached it first, then who joined first', () => {
    const t = (m: number) => new Date(WED + m * 60_000);
    const ranked = rankStandings([
      { membershipId: 'm1', userId: 'a', xp: 10, lastXpAt: t(5), joinedAt: t(0) },
      { membershipId: 'm2', userId: 'b', xp: 10, lastXpAt: t(3), joinedAt: t(1) },
      { membershipId: 'm3', userId: 'c', xp: 30, lastXpAt: t(9), joinedAt: t(2) },
      { membershipId: 'm4', userId: 'd', xp: 0, lastXpAt: null, joinedAt: t(4) },
      { membershipId: 'm5', userId: 'e', xp: 0, lastXpAt: null, joinedAt: t(3) },
    ]);
    expect(ranked.map((r) => [r.userId, r.rank])).toEqual([
      ['c', 1],
      ['b', 2],
      ['a', 3],
      ['e', 4],
      ['d', 5],
    ]);
  });
});

describe('GET /v1/leagues/current', () => {
  it('needs a session and consent (D-014); school/city are not available; class and role are required', async () => {
    expect((await h.client().get('/v1/leagues/current')).statusCode).toBe(401);
    const s = await student('Kabir Mehta');
    h.consent.setStatus(s.id, 'pending');
    await h.t.db.update(consentStatus).set({ status: 'pending' }).where(eq(consentStatus.userId, s.id));
    const denied = await s.c.get('/v1/leagues/current');
    expect(denied.statusCode).toBe(403);
    expect(denied.json().code).toBe('consent_required');
    h.consent.setStatus(s.id, 'granted');
    await h.t.db.update(consentStatus).set({ status: 'granted' }).where(eq(consentStatus.userId, s.id));

    const school = await s.c.get('/v1/leagues/current?scope=school');
    expect(school.statusCode).toBe(501);
    expect(school.json().code).toBe('not_implemented');
    expect((await s.c.get('/v1/leagues/current?scope=galaxy')).statusCode).toBe(400);
    expect((await s.c.get('/v1/leagues/current?extra=1')).statusCode).toBe(400);

    const noClass = await student('Isha Verma', null, null);
    const r = await noClass.c.get('/v1/leagues/current');
    expect(r.statusCode).toBe(200);
    expect(r.json()).toMatchObject({ status: 'class_required', cohort: null, league: null, standings: [], me: null, lastWeek: null, week: { start: WEEK } });

    const parent = await student('Anil Gupta');
    await h.t.db.update(users).set({ role: 'parent' }).where(eq(users.id, parent.id));
    const p = await parent.c.get('/v1/leagues/current');
    expect(p.json()).toMatchObject({ status: 'students_only', league: null });
    expect(await h.t.db.select().from(leagueMemberships).where(eq(leagueMemberships.userId, parent.id))).toEqual([]);
  });

  it('places the student on the first visit; standings use this week XP, auto-generated public names (D-039) and zones', async () => {
    const a = await student('Priya Sharma', 'cisce', 9);
    const b = await student('Aarav Kumar', 'cisce', 9);
    const c = await student('Zoya', 'cisce', 9);
    const other = await student('Dev Patel', 'cisce', 8);
    await xp(a.id, 30, WED - DAY); // Tuesday: counts
    await xp(b.id, 50, WED);
    await xp(a.id, 500, Date.parse('2026-10-25T18:00:00Z')); // Sunday 23:30 IST of last week: does not count
    await xp(b.id, 5, Date.parse('2026-11-01T18:30:00Z')); // next week: does not count

    const first = await a.c.get('/v1/leagues/current');
    expect(first.statusCode).toBe(200);
    expect(first.headers['cache-control']).toBe('no-store');
    expect(first.json()).toMatchObject({ status: 'active', scope: 'class', cohort: { key: 'cisce-9', board: 'cisce', classLevel: 9 }, standings: [{ rank: 1, name: publicName(a.id), xp: 30, isMe: true }] });
    for (const s of [b, c, other]) expect((await s.c.get('/v1/leagues/current')).statusCode).toBe(200);

    // Avatars next to the public names: a picked one, or the public-name animal by default.
    expect((await a.c.patch('/v1/me', { avatar: { id: 'owl', bg: 'coral' } })).statusCode).toBe(200);
    const res = await c.c.get('/v1/leagues/current');
    const body = res.json();
    expect(body.league).toMatchObject({ tier: { level: 1, key: 'bronze' }, division: 1, size: 3, capacity: LEAGUES.size, promotionPlaces: 1, relegationPlaces: 0, isBottomTier: true, isTopTier: false, minXpToPromote: 1 });
    expect(body.week).toEqual({ start: WEEK, end: '2026-11-01', startsAt: '2026-10-25T18:30:00.000Z', endsAt: '2026-11-01T18:30:00.000Z' });
    expect(body.standings).toEqual([
      { rank: 1, name: publicName(b.id), avatar: defaultAvatar(b.id), xp: 50, zone: 'promotion', isMe: false },
      { rank: 2, name: publicName(a.id), avatar: { id: 'owl', bg: 'coral' }, xp: 30, zone: 'safe', isMe: false },
      { rank: 3, name: publicName(c.id), avatar: defaultAvatar(c.id), xp: 0, zone: 'safe', isMe: true },
    ]);
    expect(body.me).toEqual({ rank: 3, xp: 0, zone: 'safe' });
    expect(body.lastWeek).toBeNull();
    // F-017 / D-014 / D-039: no ids, emails or real names (not even first names); the other class plays elsewhere.
    expect(res.body).not.toMatch(/Priya|Aarav|Zoya|Sharma|Kumar|@example\.com/);
    for (const s of [a, b, c, other]) expect(res.body).not.toContain(s.id);
    expect(res.body).not.toContain('Dev');
    // Idempotent: a second visit does not move anyone.
    expect((await a.c.get('/v1/leagues/current')).json().league.id).toBe(body.league.id);
    expect(await h.t.db.select().from(leagueMemberships).where(eq(leagueMemberships.userId, a.id))).toHaveLength(1);

    // Consent revoked later: still ranked, but unnamed; the student can no longer open leagues.
    await h.t.db.update(consentStatus).set({ status: 'revoked' }).where(eq(consentStatus.userId, b.id));
    h.consent.setStatus(b.id, 'revoked');
    const after = (await c.c.get('/v1/leagues/current')).json();
    expect(after.standings[0]).toEqual({ rank: 1, name: null, avatar: null, xp: 50, zone: 'promotion', isMe: false });
    expect((await b.c.get('/v1/leagues/current')).statusCode).toBe(403);

    // Account deletion: the student leaves the standings.
    await a.c.signInEmail(a.email);
    expect((await a.c.delete('/v1/me')).statusCode).toBe(200);
    const gone = (await c.c.get('/v1/leagues/current')).json();
    expect(gone.standings.map((s: { xp: number }) => s.xp)).toEqual([50, 0]);
    expect(gone.league.size).toBe(2);
  });

  it('closes last week on the first visit, carries the tier and reports last week', async () => {
    // Last week's tier-2 division of 12 in cbse-11: me ranks 1st (promoted), b 12th with 0 XP (relegated).
    const me = await student('Rohan Iyer', 'cbse', 11);
    const prevWeek = weekOf(PREV);
    const [l] = await h.t.db.insert(leagues).values({ weekStart: PREV, scope: 'class', scopeKey: 'cbse-11', tier: 2, division: 1 }).returning();
    await h.t.db.insert(leagueMemberships).values({ userId: me.id, weekStart: PREV, scope: 'class', scopeKey: 'cbse-11', tier: 2, leagueId: l!.id, createdAt: prevWeek.startsAt });
    await xp(me.id, 200, prevWeek.startsAt.getTime() + DAY);
    const others: string[] = [];
    for (let i = 0; i < 11; i++) {
      const id = await dbStudent({ board: 'cbse', classLevel: 11 });
      others.push(id);
      await h.t.db.insert(leagueMemberships).values({ userId: id, weekStart: PREV, scope: 'class', scopeKey: 'cbse-11', tier: 2, leagueId: l!.id, createdAt: new Date(prevWeek.startsAt.getTime() + i * 1000) });
      if (i < 10) await xp(id, 100 - i * 5, prevWeek.startsAt.getTime() + 2 * DAY);
    }
    const res = (await me.c.get('/v1/leagues/current')).json();
    expect(res.lastWeek).toEqual({ weekStart: PREV, tier: tierDto(2), finalRank: 1, xp: 200, outcome: 'promoted' });
    expect(res.league.tier.level).toBe(3);
    const [closed] = await h.t.db.select().from(leagues).where(eq(leagues.id, l!.id));
    expect(closed!.status).toBe('closed');
    expect(closed!.closedAt).not.toBeNull();
    const rows = await h.t.db.select().from(leagueMemberships).where(eq(leagueMemberships.leagueId, l!.id));
    const outcome = (id: string) => rows.find((r) => r.userId === id)!;
    expect(outcome(others[0]!)).toMatchObject({ finalRank: 2, xp: 100, outcome: 'promoted' });
    expect(outcome(others[1]!)).toMatchObject({ finalRank: 3, outcome: 'stayed' });
    expect(outcome(others[9]!)).toMatchObject({ finalRank: 11, outcome: 'relegated' });
    expect(outcome(others[10]!)).toMatchObject({ finalRank: 12, xp: 0, outcome: 'relegated' });
    // Closing again is a no-op.
    expect(await closeEndedLeagues(h.t.db, WED)).toBe(0);
  });

  it('fills divisions up to LEAGUES.size under concurrent first visits, then opens the next division', async () => {
    const ids = await Promise.all(Array.from({ length: LEAGUES.size + 2 }, () => dbStudent({ board: 'cbse', classLevel: 7 })));
    await Promise.all(ids.map((id) => joinLeague(h.t.db, id, { scope: 'class', scopeKey: 'cbse-7' }, WEEK, 1, WED)));
    const ls = await h.t.db.select().from(leagues).where(and(eq(leagues.weekStart, WEEK), eq(leagues.scopeKey, 'cbse-7')));
    expect(ls.map((l) => l.division).sort()).toEqual([1, 2]);
    const counts = await Promise.all(ls.map(async (l) => (await h.t.db.select().from(leagueMemberships).where(eq(leagueMemberships.leagueId, l.id))).length));
    expect(counts.sort((x, y) => y - x)).toEqual([LEAGUES.size, 2]);
    // Rejoining returns the same league.
    const again = await joinLeague(h.t.db, ids[0]!, { scope: 'class', scopeKey: 'cbse-7' }, WEEK, 1, WED);
    expect((await h.t.db.select().from(leagueMemberships).where(eq(leagueMemberships.userId, ids[0]!)))[0]!.leagueId).toBe(again);
  });
});

describe('weekly formation (worker job logic)', () => {
  it('closes ended leagues and forms balanced divisions for eligible returning students only; idempotent', async () => {
    const NEXT_MON = Date.parse('2026-11-01T18:35:00.000Z'); // Monday 2 Nov, 00:05 IST
    const NEXT = '2026-11-02';
    // This week's cbse-12 tier-1 division of 3 + a second cohort; eligible and ineligible returning students.
    const [l] = await h.t.db.insert(leagues).values({ weekStart: WEEK, scope: 'class', scopeKey: 'cbse-12', tier: 1, division: 1 }).returning();
    const ok = [await dbStudent({ board: 'cbse', classLevel: 12 }), await dbStudent({ board: 'cbse', classLevel: 12 }), await dbStudent({ board: 'cbse', classLevel: 12 })];
    const notConsented = await dbStudent({ board: 'cbse', classLevel: 12, consent: 'revoked' });
    const deleted = await dbStudent({ board: 'cbse', classLevel: 12, deleted: true });
    const noClass = await dbStudent({ board: 'cbse', classLevel: null });
    const movedClass = await dbStudent({ board: 'cisce', classLevel: 11 });
    for (const id of [...ok, notConsented, deleted, noClass, movedClass]) await h.t.db.insert(leagueMemberships).values({ userId: id, weekStart: WEEK, scope: 'class', scopeKey: 'cbse-12', tier: 1, leagueId: l!.id });
    await xp(ok[0]!, 40, WED);

    const result = await runLeagueWeek(h.t.db, NEXT_MON);
    expect(result.week).toBe(NEXT);
    expect(result.closed).toBeGreaterThanOrEqual(1);
    const [closed] = await h.t.db.select().from(leagues).where(eq(leagues.id, l!.id));
    expect(closed!.status).toBe('closed');
    const mine = async (id: string) => (await h.t.db.select().from(leagueMemberships).where(and(eq(leagueMemberships.userId, id), eq(leagueMemberships.weekStart, NEXT))))[0];
    expect(await mine(ok[0]!)).toMatchObject({ tier: 2, scopeKey: 'cbse-12' }); // promoted
    expect(await mine(ok[1]!)).toMatchObject({ tier: 1, scopeKey: 'cbse-12' });
    expect(await mine(movedClass)).toMatchObject({ tier: 1, scopeKey: 'cisce-11' }); // cohort from the current profile
    for (const id of [notConsented, deleted, noClass]) expect(await mine(id)).toBeUndefined();

    const again = await runLeagueWeek(h.t.db, NEXT_MON + 3_600_000);
    expect(again).toMatchObject({ closed: 0, students: 0, leaguesCreated: 0 });
    // Standings of a formed league work like any other.
    const [formed] = await h.t.db.select().from(leagues).where(and(eq(leagues.weekStart, NEXT), eq(leagues.scopeKey, 'cbse-12'), eq(leagues.tier, 1)));
    expect((await leagueStandings(h.t.db, formed!)).map((s) => s.userId).sort()).toEqual([ok[1]!, ok[2]!].sort());
  });

  it('a group that already has a division is filled instead of re-formed', async () => {
    const MON = Date.parse('2026-11-08T18:35:00.000Z'); // Monday 9 Nov, 00:05 IST
    const W = '2026-11-09';
    const PW = '2026-11-02';
    const [l] = await h.t.db.insert(leagues).values({ weekStart: PW, scope: 'class', scopeKey: 'cisce-12', tier: 1, division: 1, status: 'closed' }).returning();
    const a = await dbStudent({ board: 'cisce', classLevel: 12 });
    const b = await dbStudent({ board: 'cisce', classLevel: 12 });
    for (const id of [a, b]) await h.t.db.insert(leagueMemberships).values({ userId: id, weekStart: PW, scope: 'class', scopeKey: 'cisce-12', tier: 1, leagueId: l!.id, outcome: 'stayed' });
    // An early visitor already opened division 1 of this week.
    const early = await dbStudent({ board: 'cisce', classLevel: 12 });
    const div1 = await joinLeague(h.t.db, early, { scope: 'class', scopeKey: 'cisce-12' }, W, 1, MON - 60_000);
    const r = await formWeek(h.t.db, MON);
    // (Other cohorts in this shared database roll forward too; only cisce-12 matters here.)
    expect(r.week).toBe(W);
    expect(r.students).toBeGreaterThanOrEqual(2);
    expect(await h.t.db.select().from(leagues).where(and(eq(leagues.weekStart, W), eq(leagues.scopeKey, 'cisce-12')))).toHaveLength(1);
    const rows = await h.t.db.select().from(leagueMemberships).where(eq(leagueMemberships.weekStart, W));
    expect(rows.filter((m) => [a, b, early].includes(m.userId)).every((m) => m.leagueId === div1)).toBe(true);
  });
});
