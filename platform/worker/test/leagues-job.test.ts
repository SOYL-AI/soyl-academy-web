/**
 * leagues.weekly (backend-api M5): hourly, first run Monday 00:05 IST. Closes last week's leagues
 * (final rank, XP, promotion/relegation) and forms this week's divisions for eligible returning
 * students. Called directly with a fixed `now`, as pg-boss would.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { leagueMemberships, leagues, profiles, xpEvents } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { LEAGUES } from '@soyl/shared/config/gamification';
import { allJobs, JOB_NAMES, runLeagues } from '../src/jobs';
import { memoryLogger } from '../src/logger';
import { makeUser } from './helpers';

let t: TestDb;
const log = memoryLogger();
/** Monday 2 Nov 2026, 00:05 IST. */
const MONDAY = new Date('2026-11-01T18:35:00.000Z');
const LAST = '2026-10-26';
const THIS = '2026-11-02';

beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

async function player(classLevel: number, consent: 'granted' | 'revoked' = 'granted') {
  const id = await makeUser(t.db, { consent });
  await t.db.insert(profiles).values({ userId: id, displayName: 'Asha Nair', board: 'cbse', classLevel });
  return id;
}

describe('leagues.weekly', () => {
  it('closes last week with outcomes and forms this week by tier; a second run is a no-op', async () => {
    const [l] = await t.db.insert(leagues).values({ weekStart: LAST, scope: 'class', scopeKey: 'cbse-10', tier: 2, division: 1 }).returning();
    const ids: string[] = [];
    for (let i = 0; i < 7; i++) {
      const id = await player(10);
      ids.push(id);
      await t.db.insert(leagueMemberships).values({ userId: id, weekStart: LAST, scope: 'class', scopeKey: 'cbse-10', tier: 2, leagueId: l!.id, createdAt: new Date(Date.parse('2026-10-26T00:00:00Z') + i * 1000) });
      // ids[0] earns most; ids[6] earns nothing.
      if (i < 6) await t.db.insert(xpEvents).values({ userId: id, kind: 'practice', amount: 70 - i * 10, sourceType: 't', sourceId: `x${i}`, istDay: '2026-10-28' });
    }
    const revoked = await player(10, 'revoked');
    await t.db.insert(leagueMemberships).values({ userId: revoked, weekStart: LAST, scope: 'class', scopeKey: 'cbse-10', tier: 2, leagueId: l!.id });

    const r = await runLeagues({ db: t.db, now: MONDAY, log });
    expect(r).toEqual({ closed: 1, week: THIS, students: 7, leaguesCreated: 2 });
    const last = await t.db.select().from(leagueMemberships).where(eq(leagueMemberships.leagueId, l!.id));
    const of = (id: string) => last.find((m) => m.userId === id)!;
    expect(of(ids[0]!)).toMatchObject({ finalRank: 1, xp: 70, outcome: 'promoted' });
    expect(of(ids[1]!)).toMatchObject({ finalRank: 2, outcome: 'stayed' });
    // 8 players: 1 up, 1 down. ids[6] and the revoked student tie on 0 XP; the later joiner (revoked) goes down.
    expect(of(ids[6]!)).toMatchObject({ finalRank: 7, xp: 0, outcome: 'stayed' });
    expect(of(revoked)).toMatchObject({ finalRank: 8, xp: 0, outcome: 'relegated' });
    expect((await t.db.select().from(leagues).where(eq(leagues.id, l!.id)))[0]!.status).toBe('closed');

    const now = await t.db.select().from(leagueMemberships).where(eq(leagueMemberships.weekStart, THIS));
    expect(now.find((m) => m.userId === ids[0])!.tier).toBe(3);
    expect(now.find((m) => m.userId === ids[1])!.tier).toBe(2);
    expect(now.find((m) => m.userId === ids[6])!.tier).toBe(2);
    expect(now.find((m) => m.userId === revoked)).toBeUndefined(); // consent no longer granted
    expect(now.every((m) => m.leagueId && m.scopeKey === 'cbse-10')).toBe(true);
    const formed = await t.db.select().from(leagues).where(and(eq(leagues.weekStart, THIS), eq(leagues.scopeKey, 'cbse-10')));
    expect(formed.map((f) => f.tier).sort()).toEqual([2, 3]);
    expect(formed.every((f) => f.status === 'open' && f.division === 1)).toBe(true);

    expect(await runLeagues({ db: t.db, now: new Date(MONDAY.getTime() + 3_600_000), log })).toEqual({ closed: 0, week: THIS, students: 0, leaguesCreated: 0 });
  });

  it('is registered hourly at :35 UTC (first run Monday 00:05 IST)', () => {
    const job = allJobs().find((j) => j.name === JOB_NAMES.leaguesWeekly)!;
    expect(job.cron).toBe(LEAGUES.cron);
    expect(job.cron).toBe('35 * * * *');
    expect(job.options.policy).toBe('stately');
  });
});
