/**
 * Migration 0015 (D-044 bonus credits, student avatars): the database enforces one bonus per rule per user
 * per IST day and positive bonus amounts; avatars must come from the config lists and be set together;
 * 0015 goes down and back up on a seeded database with bonus rows and avatars present.
 */
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq, sql } from 'drizzle-orm';
import { createTestDb, type TestDb } from '../src/testing';
import { loadMigrations, migrateDown, migrateUp, migrationStatus } from '../src/migrator';
import { creditLedger, profiles } from '../schema/index';
import { CHECK, DENIED, UNIQUE, asApp, expectPgError, makeUser } from './helpers';

const log = () => {};
let t: TestDb;
beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('bonus credit rows (0015, D-044)', () => {
  it('allow one bonus per rule per user per IST day, positive amounts only, append-only for the app', async () => {
    const u = await makeUser(t.db);
    const day = '2026-11-02';
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'bonus_goal', amount: 10, action: 'daily_practice_goal', istDay: day });
    await expectPgError(() => t.db.insert(creditLedger).values({ userId: u.id, kind: 'bonus_goal', amount: 10, action: 'daily_practice_goal', istDay: day }), {
      code: UNIQUE,
      constraint: 'credit_ledger_one_bonus_per_day',
    });
    // The other rule the same day, and the same rule the next day, are fine.
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'bonus_streak', amount: 5, action: 'streak_milestone', istDay: day });
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'bonus_goal', amount: 10, action: 'daily_practice_goal', istDay: '2026-11-03' });
    await expectPgError(() => t.db.insert(creditLedger).values({ userId: u.id, kind: 'bonus_streak', amount: 0, action: 'streak_milestone', istDay: '2026-11-04' }), {
      code: CHECK,
      constraint: 'credit_ledger_amount_sign_check',
    });
    // An unknown kind fails both the kind and the amount-sign check; Postgres may report either.
    await expectPgError(() => t.db.insert(creditLedger).values({ userId: u.id, kind: 'bonus_coins', amount: 5, action: 'x', istDay: day }), {
      code: CHECK,
      message: /credit_ledger_(kind|amount_sign)_check/,
    });
    // Another user's bonus the same day is independent.
    const v = await makeUser(t.db);
    await t.db.insert(creditLedger).values({ userId: v.id, kind: 'bonus_goal', amount: 10, action: 'daily_practice_goal', istDay: day });
    // DB-1: the app role can insert but not edit or delete bonus rows.
    await asApp(t, (c) => expectPgError(() => c.query(`UPDATE credit_ledger SET amount = 50 WHERE user_id = $1 AND kind = 'bonus_goal'`, [u.id]), { code: DENIED }));
    await asApp(t, (c) => expectPgError(() => c.query(`DELETE FROM credit_ledger WHERE user_id = $1`, [u.id]), { code: DENIED }));
    // ...but may insert one (the API writes them as soyl_app).
    await asApp(t, (c) => c.query(`INSERT INTO credit_ledger (user_id, kind, amount, action, ist_day) VALUES ($1, 'bonus_streak', 5, 'streak_milestone', '2026-11-03')`, [u.id]));
    const [sum] = await t.db
      .select({ n: sql<number>`sum(${creditLedger.amount})::int` })
      .from(creditLedger)
      .where(and(eq(creditLedger.userId, u.id), eq(creditLedger.istDay, day)));
    expect(sum!.n).toBe(15);
  });
});

describe('profile avatars (0015)', () => {
  it('accept only config ids and backgrounds, set or cleared together', async () => {
    const u = await makeUser(t.db);
    await t.db.insert(profiles).values({ userId: u.id, avatarId: 'giraffe', avatarBg: 'mint' });
    await t.db.update(profiles).set({ avatarId: null, avatarBg: null }).where(eq(profiles.userId, u.id));
    await expectPgError(() => t.db.update(profiles).set({ avatarId: 'unicorn', avatarBg: 'mint' }).where(eq(profiles.userId, u.id)), {
      code: CHECK,
      constraint: 'profiles_avatar_id_check',
    });
    await expectPgError(() => t.db.update(profiles).set({ avatarId: 'tiger', avatarBg: '#ff0000' }).where(eq(profiles.userId, u.id)), {
      code: CHECK,
      constraint: 'profiles_avatar_bg_check',
    });
    await expectPgError(() => t.db.update(profiles).set({ avatarId: 'tiger', avatarBg: null }).where(eq(profiles.userId, u.id)), {
      code: CHECK,
      constraint: 'profiles_avatar_pair_check',
    });
  });
});

describe('0015 down and up on a seeded database', () => {
  it('drops bonus rows and avatar columns, keeps every other ledger row, and comes back identical', async () => {
    const u = await makeUser(t.db);
    await t.db.insert(profiles).values({ userId: u.id, avatarId: 'owl', avatarBg: 'sky' });
    await t.db.insert(creditLedger).values([
      { userId: u.id, kind: 'grant', amount: 50, action: 'daily_grant', istDay: '2026-11-05' },
      { userId: u.id, kind: 'bonus_goal', amount: 10, action: 'daily_practice_goal', istDay: '2026-11-05' },
      { userId: u.id, kind: 'bonus_streak', amount: 5, action: 'streak_milestone', istDay: '2026-11-05' },
    ]);
    // Later migrations (0016_invoices, …) are rolled back first, then 0015 itself.
    const all = loadMigrations();
    const idx = all.findIndex((m) => m.name === '0015_avatars_credit_bonus');
    expect(idx).toBeGreaterThan(-1);
    const later = all.slice(idx + 1).map((m) => m.name).reverse();
    const c = new pg.Client({ connectionString: t.url });
    await c.connect();
    const defs = async () =>
      (await c.query(`SELECT conname, pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conrelid IN ('credit_ledger'::regclass, 'profiles'::regclass) ORDER BY conname`)).rows;
    const indexes = async () => (await c.query(`SELECT indexname, indexdef FROM pg_indexes WHERE tablename IN ('credit_ledger', 'profiles') ORDER BY indexname`)).rows;
    try {
      const before = { defs: await defs(), indexes: await indexes() };
      expect(await migrateDown(c, { to: idx, log })).toEqual([...later, '0015_avatars_credit_bonus']);
      const rows = (await c.query(`SELECT kind, amount FROM credit_ledger WHERE user_id = $1 ORDER BY kind`, [u.id])).rows;
      expect(rows).toEqual([{ kind: 'grant', amount: 50 }]);
      const cols = (await c.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles' AND column_name LIKE 'avatar%'`)).rows;
      expect(cols).toEqual([]);
      await expect(c.query(`INSERT INTO credit_ledger (user_id, kind, amount, action, ist_day) VALUES ($1, 'bonus_goal', 10, 'x', '2026-11-06')`, [u.id])).rejects.toThrow(/credit_ledger_(kind|amount_sign)_check/);

      await migrateUp(c, { log });
      expect({ defs: await defs(), indexes: await indexes() }).toEqual(before);
      expect((await migrationStatus(c)).pending).toEqual([]);
      const back = (await c.query(`SELECT avatar_id, avatar_bg FROM profiles WHERE user_id = $1`, [u.id])).rows;
      expect(back).toEqual([{ avatar_id: null, avatar_bg: null }]);
    } finally {
      await c.end();
    }
  });
});
