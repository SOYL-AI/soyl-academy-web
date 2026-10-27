/**
 * Migration 0010 (backend-api M5): weekly leagues (`leagues`, `league_memberships.league_id/tier/
 * outcome`) and the `ai_answer` report type on content_reports. Constraints the API relies on, plus
 * cascades on league and account removal (PII.md: memberships cascade with the account).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { createTestDb, type TestDb } from '../src/testing';
import { contentReports, leagueMemberships, leagues, users } from '../schema/index';
import { CHECK, UNIQUE, asApp, expectPgError, makeUser } from './helpers';

let t: TestDb;
beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

const WEEK = '2026-10-26';
const league = (over: Partial<typeof leagues.$inferInsert> = {}) =>
  t.db
    .insert(leagues)
    .values({ weekStart: WEEK, scope: 'class', scopeKey: 'cbse-10', tier: 1, division: 1, ...over })
    .returning()
    .then((r) => r[0]!);

describe('leagues', () => {
  it('defaults to open; one division number per (week, cohort, tier); scope, status, tier and division are checked', async () => {
    const l = await league();
    expect(l.status).toBe('open');
    expect(l.closedAt).toBeNull();
    await expectPgError(() => league(), { code: UNIQUE, constraint: 'leagues_cohort_unique' });
    // Same division number in another tier, cohort or week is fine.
    await league({ tier: 2 });
    await league({ scopeKey: 'cbse-9' });
    await league({ weekStart: '2026-11-02' });
    await expectPgError(() => league({ division: 9, scope: 'planet' }), { code: CHECK, constraint: 'leagues_scope_check' });
    await expectPgError(() => league({ division: 9, status: 'paused' }), { code: CHECK, constraint: 'leagues_status_check' });
    await expectPgError(() => league({ division: 9, tier: 0 }), { code: CHECK, constraint: 'leagues_tier_check' });
    await expectPgError(() => league({ division: 0 }), { code: CHECK, constraint: 'leagues_division_check' });
  });

  it('memberships point at a league, carry tier and outcome; deleting the league or the account cascades', async () => {
    const l = await league({ scopeKey: 'cbse-12' });
    const u = await makeUser(t.db);
    const [m] = await t.db.insert(leagueMemberships).values({ userId: u.id, weekStart: WEEK, scope: 'class', scopeKey: 'cbse-12', leagueId: l.id }).returning();
    expect(m).toMatchObject({ tier: 1, outcome: null, xp: 0, finalRank: null });
    await expectPgError(() => t.db.update(leagueMemberships).set({ outcome: 'won' }).where(eq(leagueMemberships.id, m!.id)), { code: CHECK, constraint: 'league_memberships_outcome_check' });
    await expectPgError(() => t.db.update(leagueMemberships).set({ tier: 0 }).where(eq(leagueMemberships.id, m!.id)), { code: CHECK, constraint: 'league_memberships_tier_check' });
    for (const outcome of ['promoted', 'stayed', 'relegated'] as const) await t.db.update(leagueMemberships).set({ outcome }).where(eq(leagueMemberships.id, m!.id));
    // One membership per user, week and scope.
    await expectPgError(() => t.db.insert(leagueMemberships).values({ userId: u.id, weekStart: WEEK, scope: 'class', scopeKey: 'cbse-12', leagueId: l.id }), {
      code: UNIQUE,
      constraint: 'league_memberships_user_week_scope_unique',
    });

    await t.db.delete(leagues).where(eq(leagues.id, l.id));
    expect(await t.db.select().from(leagueMemberships).where(eq(leagueMemberships.id, m!.id))).toEqual([]);

    const l2 = await league({ scopeKey: 'cbse-11' });
    const u2 = await makeUser(t.db);
    await t.db.insert(leagueMemberships).values({ userId: u2.id, weekStart: WEEK, scope: 'class', scopeKey: 'cbse-11', leagueId: l2.id, tier: 3 });
    await t.db.delete(users).where(eq(users.id, u2.id));
    expect(await t.db.select().from(leagueMemberships).where(eq(leagueMemberships.leagueId, l2.id))).toEqual([]);
    expect((await t.db.select().from(leagues).where(eq(leagues.id, l2.id))).length).toBe(1);
  });

  it('the app role can read and write leagues (conventions applied to the new table)', async () => {
    const n = await asApp(t, async (c) => {
      await c.query(`INSERT INTO leagues (week_start, scope, scope_key, tier, division) VALUES ('2026-10-26', 'class', 'cisce-10', 1, 1)`);
      const r = await c.query(`UPDATE leagues SET status = 'closed', closed_at = now() WHERE scope_key = 'cisce-10' RETURNING updated_at >= created_at AS ok`);
      return r.rows[0]?.ok;
    });
    expect(n).toBe(true);
  });
});

describe('content_reports ai_answer', () => {
  it('accepts the ai_answer content type and still rejects unknown types', async () => {
    const u = await makeUser(t.db);
    const contentId = '01900000-0000-7000-8000-000000000001';
    const [r] = await t.db.insert(contentReports).values({ userId: u.id, contentType: 'ai_answer', contentId, unit: 'ai', itemRef: 'conv:x', category: 'wrong_answer' }).returning();
    expect(r!.contentType).toBe('ai_answer');
    await expectPgError(() => t.db.insert(contentReports).values({ contentType: 'chat', contentId, unit: 'ai', category: 'other' }), { code: CHECK, constraint: 'content_reports_type_check' });
  });
});
