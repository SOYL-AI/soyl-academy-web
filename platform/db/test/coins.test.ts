/**
 * SOYL Coins ledger (ADR-021, migration 0011): balance_after and the never-negative guard, unique
 * idempotency keys, refund = redeem, kind/sign/source checks, append-only for the app role, and the
 * account purge (ledger and wallet cascade; redemptions are detached).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { createTestDb, type TestDb } from '../src/testing';
import { istDay, uuidv7 } from '../src/ids';
import { coinLedger, coinRedemptions, coinWallets, users } from '../schema/index';
import { CHECK, DENIED, UNIQUE, asApp, expectPgError, makeUser } from './helpers';

let t: TestDb;
const day = istDay();

beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

const earn = (userId: string, key: string, amount = 5) => ({ userId, kind: 'earn', source: 'checkin', amount, idempotencyKey: key, istDay: day });
const redemption = (userId: string, priceCoins: number) =>
  t.db.insert(coinRedemptions).values({ userId, itemKey: 'frame-x', itemType: 'digital', priceCoins, status: 'fulfilled' }).returning();

describe('coin ledger (ADR-021)', () => {
  it('writes balance_after, refuses a negative balance and duplicate keys, and creates the wallet lock row', async () => {
    const u = await makeUser(t.db);
    const [a] = await t.db.insert(coinLedger).values(earn(u.id, `k1:${u.id}`, 5)).returning();
    expect(a!.balanceAfter).toBe(5);
    expect(await t.db.select().from(coinWallets).where(eq(coinWallets.userId, u.id))).toHaveLength(1);
    await expectPgError(() => t.db.insert(coinLedger).values(earn(u.id, `k1:${u.id}`, 5)), { code: UNIQUE, constraint: 'coin_ledger_idempotency_unique' });

    const [r] = await redemption(u.id, 6);
    const redeem = (amount: number, key: string) => t.db.insert(coinLedger).values({ userId: u.id, kind: 'redeem', source: 'redemption', amount, idempotencyKey: key, istDay: day, redemptionId: r!.id });
    await expectPgError(() => redeem(-6, `redeem:${r!.id}`), { code: CHECK });
    const [b] = await redeem(-5, `redeem:${r!.id}`).returning();
    expect(b!.balanceAfter).toBe(0);

    const refund = (amount: number, key: string) => t.db.insert(coinLedger).values({ userId: u.id, kind: 'refund', source: 'redemption', amount, idempotencyKey: key, istDay: day, redemptionId: r!.id });
    await expectPgError(() => refund(4, `refund-a:${r!.id}`), { code: CHECK });
    await refund(5, `refund:${r!.id}`);
    await expectPgError(() => refund(5, `refund-b:${r!.id}`), { code: UNIQUE });
  });

  it('a refund needs a redeem of the same redemption', async () => {
    const u = await makeUser(t.db);
    await t.db.insert(coinLedger).values(earn(u.id, `k2:${u.id}`, 5));
    const [r] = await redemption(u.id, 5);
    await expectPgError(
      () => t.db.insert(coinLedger).values({ userId: u.id, kind: 'refund', source: 'redemption', amount: 5, idempotencyKey: `refund:${r!.id}`, istDay: day, redemptionId: r!.id }),
      { code: CHECK },
    );
  });

  it('checks kinds, signs and sources', async () => {
    const u = await makeUser(t.db);
    for (const row of [
      { kind: 'earn', source: 'checkin', amount: -1 },
      { kind: 'earn', source: 'bought', amount: 1 },
      { kind: 'adjust', source: 'checkin', amount: 1 },
      { kind: 'adjust', source: 'admin', amount: 0 },
      { kind: 'gift', source: 'admin', amount: 1 },
      { kind: 'earn', source: 'redemption', amount: 1 },
    ])
      await expectPgError(() => t.db.insert(coinLedger).values({ userId: u.id, istDay: day, idempotencyKey: uuidv7(), ...row }), { code: CHECK });
  });

  it('is append-only for the app role, which can still append through the guard', async () => {
    const u = await makeUser(t.db);
    const [row] = await t.db.insert(coinLedger).values(earn(u.id, `app:${u.id}`, 3)).returning();
    await asApp(t, async (c) => {
      await c.query(`INSERT INTO coin_ledger (user_id, kind, source, amount, idempotency_key, ist_day) VALUES ($1, 'earn', 'checkin', 1, $2, '2026-01-02')`, [u.id, `app2:${u.id}`]);
      const r = await c.query('SELECT max(balance_after)::int AS b FROM coin_ledger WHERE user_id = $1', [u.id]);
      expect(r.rows[0].b).toBe(4);
    });
    for (const [stmt, params] of [
      ['UPDATE coin_ledger SET amount = 1000 WHERE id = $1', [row!.id]],
      ['DELETE FROM coin_ledger WHERE id = $1', [row!.id]],
      ['TRUNCATE coin_ledger', []],
    ] as const)
      await asApp(t, (c) => expectPgError(() => c.query(stmt, [...params]), { code: DENIED }));
  });

  it('the account purge cascades the ledger and wallet and detaches redemptions', async () => {
    const u = await makeUser(t.db);
    await t.db.insert(coinLedger).values(earn(u.id, `purge:${u.id}`, 3));
    const [r] = await redemption(u.id, 1);
    await t.db.delete(users).where(eq(users.id, u.id));
    expect(await t.db.select().from(coinLedger).where(eq(coinLedger.userId, u.id))).toHaveLength(0);
    expect(await t.db.select().from(coinWallets).where(eq(coinWallets.userId, u.id))).toHaveLength(0);
    expect((await t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, r!.id)))[0]!.userId).toBeNull();
  });
});
