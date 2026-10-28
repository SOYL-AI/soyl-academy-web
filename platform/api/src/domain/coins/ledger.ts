/**
 * SOYL Coins ledger (D-037, ADR-021). Every coin movement is one append-only `coin_ledger` row with a
 * natural idempotency key; the database refuses duplicates and anything that would make a balance
 * negative (migration 0011, trigger `soyl_coin_ledger_guard`).
 *
 * Every write first locks the student's `coin_wallets` row (`FOR UPDATE`), so one student's awards,
 * check-ins and redemptions serialise (the daily cap and balance checks are exact) while different
 * students never contend. Callers pass their transaction: awards ride in the same transaction as the
 * learning event that earned them (practice answer, test grading, league close).
 */
import { and, desc, eq, inArray, lt, or, sql } from 'drizzle-orm';
import { coinLedger, coinWallets, istDay, type Database } from '@soyl/db';
import { CAPPED_SOURCES, COIN_DAILY_CAP, cappedAmount, type CoinEarnSource, type CoinLedgerSource } from '@soyl/shared/config/coins';

export type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
export type Db = Database | Tx;
export type WalletRow = typeof coinWallets.$inferSelect;
export type LedgerMeta = Record<string, string | number | boolean | null>;

export interface CoinAward {
  source: CoinEarnSource;
  amount: number;
  /** Natural idempotency key, e.g. `checkin:<user>:<istDay>`. Must include the user id. */
  key: string;
  metadata?: LedgerMeta;
}

export interface AwardOutcome {
  source: CoinEarnSource;
  key: string;
  /** What the rule pays. */
  requested: number;
  /** What was paid (less when the daily cap cut it). */
  amount: number;
  cappedOut: boolean;
}

/** Creates (if needed) and locks the student's wallet row for the rest of the transaction. */
export async function lockWallet(tx: Tx, userId: string): Promise<WalletRow> {
  await tx.insert(coinWallets).values({ userId }).onConflictDoNothing();
  const [w] = await tx.select().from(coinWallets).where(eq(coinWallets.userId, userId)).for('update');
  return w!;
}

export async function balanceOf(db: Db, userId: string): Promise<number> {
  const [r] = await db.select({ b: sql<number>`coalesce(sum(${coinLedger.amount}), 0)::int` }).from(coinLedger).where(eq(coinLedger.userId, userId));
  return Number(r?.b ?? 0);
}

/** Coins earned today from capped sources (what COIN_DAILY_CAP limits). */
export async function cappedEarnedOn(db: Db, userId: string, day: string): Promise<number> {
  const [r] = await db
    .select({ s: sql<number>`coalesce(sum(${coinLedger.amount}), 0)::int` })
    .from(coinLedger)
    .where(and(eq(coinLedger.userId, userId), eq(coinLedger.istDay, day), eq(coinLedger.capped, true)));
  return Number(r?.s ?? 0);
}

/**
 * Pays awards (idempotent per key). Capped sources share the IST day's COIN_DAILY_CAP: an award past it
 * is cut to what is left, possibly 0 — and still recorded, so the same event is not paid on a later day.
 * Keys already in the ledger are skipped before the cap is applied.
 */
export async function awardCoins(tx: Tx, userId: string, now: Date, awards: CoinAward[], opts: { cap?: number } = {}): Promise<AwardOutcome[]> {
  const wanted = awards.filter((a) => a.amount > 0);
  if (!wanted.length) return [];
  await lockWallet(tx, userId);
  const existing = new Set(
    (await tx.select({ key: coinLedger.idempotencyKey }).from(coinLedger).where(inArray(coinLedger.idempotencyKey, wanted.map((a) => a.key)))).map((r) => r.key),
  );
  const fresh = wanted.filter((a, i) => !existing.has(a.key) && wanted.findIndex((b) => b.key === a.key) === i);
  if (!fresh.length) return [];
  const day = istDay(now);
  const cap = opts.cap ?? COIN_DAILY_CAP;
  let earnedCapped = fresh.some((a) => CAPPED_SOURCES.includes(a.source)) ? await cappedEarnedOn(tx, userId, day) : 0;
  const out: AwardOutcome[] = [];
  for (const a of fresh) {
    const capped = CAPPED_SOURCES.includes(a.source);
    const amount = capped ? cappedAmount(a.amount, earnedCapped, cap) : a.amount;
    const inserted = await tx
      .insert(coinLedger)
      .values({
        userId,
        kind: 'earn',
        source: a.source,
        amount,
        idempotencyKey: a.key,
        istDay: day,
        capped,
        metadata: { ...(a.metadata ?? {}), ...(amount < a.amount ? { requested: a.amount, cappedOut: true } : {}) },
        createdAt: now,
      })
      .onConflictDoNothing()
      .returning({ id: coinLedger.id });
    if (!inserted.length) continue;
    if (capped) earnedCapped += amount;
    out.push({ source: a.source, key: a.key, requested: a.amount, amount, cappedOut: amount < a.amount });
  }
  return out;
}

/** Sum of what a list of outcomes paid. */
export const coinsPaid = (outcomes: AwardOutcome[]) => outcomes.reduce((s, o) => s + o.amount, 0);

/** Does a ledger row with this key exist? */
export async function hasKey(db: Db, key: string): Promise<boolean> {
  const [r] = await db.select({ id: coinLedger.id }).from(coinLedger).where(eq(coinLedger.idempotencyKey, key)).limit(1);
  return !!r;
}

/* History ---------------------------------------------------------------------------------------- */

export interface HistoryCursor {
  t: string;
  id: string;
}
const encode = (c: HistoryCursor) => Buffer.from(JSON.stringify(c)).toString('base64url');
function decode(raw: string | undefined): HistoryCursor | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as HistoryCursor;
    if (typeof c.t === 'string' && !Number.isNaN(Date.parse(c.t)) && typeof c.id === 'string' && /^[0-9a-f-]{36}$/.test(c.id)) return c;
  } catch {
    /* fall through */
  }
  return null;
}

export interface HistoryEntry {
  id: string;
  kind: 'earn' | 'redeem' | 'refund' | 'adjust';
  source: CoinLedgerSource;
  amount: number;
  balanceAfter: number;
  istDay: string;
  cappedOut: boolean;
  redemptionId: string | null;
  /** Safe display fields only (milestone, rank, item key…). */
  detail: LedgerMeta;
  createdAt: string;
}

const DETAIL_FIELDS = ['milestone', 'rank', 'itemKey', 'testKey', 'chapterId', 'subjectId', 'streakDays', 'everyDays', 'tier'] as const;

export async function history(db: Database, userId: string, opts: { cursor?: string; limit: number }): Promise<{ entries: HistoryEntry[]; nextCursor: string | null }> {
  const c = decode(opts.cursor);
  const rows = await db
    .select()
    .from(coinLedger)
    .where(
      and(
        eq(coinLedger.userId, userId),
        c ? or(lt(coinLedger.createdAt, new Date(c.t)), and(eq(coinLedger.createdAt, new Date(c.t)), lt(coinLedger.id, c.id))) : undefined,
      ),
    )
    .orderBy(desc(coinLedger.createdAt), desc(coinLedger.id))
    .limit(opts.limit + 1);
  const page = rows.slice(0, opts.limit);
  const last = page[page.length - 1];
  return {
    entries: page.map((r) => {
      const meta = (r.metadata ?? {}) as LedgerMeta;
      const detail: LedgerMeta = {};
      for (const f of DETAIL_FIELDS) if (meta[f] !== undefined) detail[f] = meta[f]!;
      return {
        id: r.id,
        kind: r.kind as HistoryEntry['kind'],
        source: r.source as CoinLedgerSource,
        amount: r.amount,
        balanceAfter: r.balanceAfter,
        istDay: r.istDay,
        cappedOut: meta.cappedOut === true,
        redemptionId: r.redemptionId,
        detail,
        createdAt: r.createdAt.toISOString(),
      };
    }),
    nextCursor: rows.length > opts.limit && last ? encode({ t: last.createdAt.toISOString(), id: last.id }) : null,
  };
}
