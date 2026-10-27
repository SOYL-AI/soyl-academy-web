/**
 * Credits (CONTEXT §6, ARCHITECTURE §11.1, AC-07, AC-08, F-008; ADR-013).
 *
 * The append-only `credit_ledger` is the only source of truth (D-008: credits are authoritative in
 * Postgres; no Redis balance). Today's balance = SUM(amount) of the user's rows for today's IST day,
 * so there is no rollover and no midnight job: the new day simply has no rows until the lazy grant.
 *
 *   reserve   one transaction under the user's `credit_wallets` row lock (SELECT … FOR UPDATE):
 *             lazy daily grant (unique per user per IST day) → top-up if the plan's daily credits went
 *             up → balance check → `reserve` row (−price, TTL). N parallel reserves serialise on the
 *             lock, so they can never overspend (balance ≥ 0 after every reserve).
 *   charge    `charge` row (+unused credits returned, usually 0) — once output has started (F-008).
 *   refund    `refund` row (+reserved) — failures before output, moderation blocks, our errors.
 *
 * A reservation resolves exactly once: the partial unique index `credit_ledger_one_resolution` makes
 * the second of a charge/refund/sweeper race insert nothing (ON CONFLICT DO NOTHING), and the
 * settlement trigger (0002) refuses a resolution without a reserve or returning more than it held.
 */
import { and, desc, eq, inArray, lt, sql } from 'drizzle-orm';
import { creditLedger, creditWallets, type Database } from '@soyl/db';
import { getPlan, type PlanId } from '@soyl/shared/config/plans';
import { RESERVATION_TTL_SECONDS } from '@soyl/shared/config/credits';
import type { Clock } from '../clock';
import type { EntitlementService } from './entitlements';
import { istDay, nextIstMidnight, secondsUntil } from './time';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
type Exec = Database | Tx;

export class InsufficientCreditsError extends Error {
  constructor(
    readonly balance: number,
    readonly required: number,
    readonly resetAt: Date,
    readonly plan: PlanId,
  ) {
    super(`insufficient credits: ${balance} < ${required}`);
    this.name = 'InsufficientCreditsError';
  }
}

export interface ReserveInput {
  userId: string;
  requestId: string;
  action: string;
  credits: number;
  plan: PlanId;
  ttlSeconds?: number;
  metadata?: Record<string, unknown>;
}

export type ReservationState = 'open' | 'charged' | 'refunded';

export interface ReserveResult {
  /** False when a reserve for this request id already existed (idempotent retry). */
  created: boolean;
  state: ReservationState;
  credits: number;
  /** Balance after the reserve. */
  balance: number;
  istDay: string;
  expiresAt: Date;
}

export type SettleOutcome = 'charged' | 'refunded' | 'already_charged' | 'already_refunded';

export interface BalanceView {
  plan: PlanId;
  planName: string;
  dailyCredits: number;
  balance: number;
  grantedToday: number;
  reservedNow: number;
  spentToday: number;
  day: string;
  resetAt: Date;
  resetInSeconds: number;
}

export class CreditService {
  constructor(
    private readonly db: Database,
    private readonly clock: Clock,
    private readonly entitlements: EntitlementService,
  ) {}

  private now(): Date {
    return new Date(this.clock.now());
  }

  /** The user's lock row (created on first use). Must run inside a transaction. */
  private async lockWallet(tx: Tx, userId: string, now: Date) {
    await tx.insert(creditWallets).values({ userId, createdAt: now, updatedAt: now }).onConflictDoNothing({ target: creditWallets.userId });
    await tx.select({ id: creditWallets.id }).from(creditWallets).where(eq(creditWallets.userId, userId)).for('update');
  }

  /**
   * Lazy daily grant, then a top-up when the plan's daily credits are higher than what was granted
   * today (plan bought mid-day). Never claws back on a downgrade. Inside the wallet lock.
   */
  private async ensureGrant(tx: Tx, userId: string, plan: PlanId, day: string, now: Date): Promise<void> {
    const daily = getPlan(plan).creditsPerDay;
    const inserted = await tx
      .insert(creditLedger)
      .values({ userId, kind: 'grant', amount: daily, action: 'daily_grant', istDay: day, planId: plan, metadata: { plan }, createdAt: now })
      .onConflictDoNothing()
      .returning({ id: creditLedger.id });
    if (inserted.length) {
      await tx.update(creditWallets).set({ planId: plan, lastGrantDay: day, updatedAt: now }).where(eq(creditWallets.userId, userId));
      return;
    }
    const [g] = await tx
      .select({ granted: sql<number>`coalesce(sum(${creditLedger.amount}), 0)::int` })
      .from(creditLedger)
      .where(and(eq(creditLedger.userId, userId), eq(creditLedger.istDay, day), eq(creditLedger.kind, 'grant'), inArray(creditLedger.action, ['daily_grant', 'plan_topup'])));
    const missing = daily - (g?.granted ?? 0);
    if (missing > 0) {
      await tx.insert(creditLedger).values({ userId, kind: 'grant', amount: missing, action: 'plan_topup', istDay: day, planId: plan, metadata: { plan }, createdAt: now });
      await tx.update(creditWallets).set({ planId: plan, updatedAt: now }).where(eq(creditWallets.userId, userId));
    }
  }

  private async daySummary(db: Exec, userId: string, day: string) {
    const [r] = await db
      .select({
        balance: sql<number>`coalesce(sum(${creditLedger.amount}), 0)::int`,
        granted: sql<number>`coalesce(sum(${creditLedger.amount}) FILTER (WHERE ${creditLedger.kind} = 'grant'), 0)::int`,
        reserved: sql<number>`coalesce(sum(-${creditLedger.amount}) FILTER (WHERE ${creditLedger.kind} = 'reserve'), 0)::int`,
        returned: sql<number>`coalesce(sum(${creditLedger.amount}) FILTER (WHERE ${creditLedger.kind} IN ('charge', 'refund')), 0)::int`,
        open: sql<number>`coalesce(sum(-${creditLedger.amount}) FILTER (WHERE ${creditLedger.kind} = 'reserve' AND NOT EXISTS (
          SELECT 1 FROM credit_ledger s WHERE s.request_id = "credit_ledger"."request_id" AND s.kind IN ('charge', 'refund'))), 0)::int`,
      })
      .from(creditLedger)
      .where(and(eq(creditLedger.userId, userId), eq(creditLedger.istDay, day)));
    const reserved = r?.reserved ?? 0;
    const open = r?.open ?? 0;
    return { balance: r?.balance ?? 0, granted: r?.granted ?? 0, open, spent: reserved - open - (r?.returned ?? 0) };
  }

  /** GET /v1/credits: writes today's lazy grant if needed, then the balance (never blocks on anything else). */
  async balance(userId: string, plan?: PlanId): Promise<BalanceView> {
    const now = this.now();
    const day = istDay(now);
    const p = plan ?? (await this.entitlements.planFor(userId, now));
    await this.db.transaction(async (tx) => {
      await this.lockWallet(tx, userId, now);
      await this.ensureGrant(tx, userId, p, day, now);
    });
    const s = await this.daySummary(this.db, userId, day);
    const resetAt = nextIstMidnight(now);
    const planCfg = getPlan(p);
    return {
      plan: p,
      planName: planCfg.name,
      dailyCredits: planCfg.creditsPerDay,
      balance: s.balance,
      grantedToday: s.granted,
      reservedNow: s.open,
      spentToday: s.spent,
      day,
      resetAt,
      resetInSeconds: secondsUntil(resetAt, now),
    };
  }

  /** Reserves `credits` for a request (idempotent per request id). Throws InsufficientCreditsError. */
  async reserve(input: ReserveInput): Promise<ReserveResult> {
    if (!Number.isInteger(input.credits) || input.credits <= 0) throw new Error(`invalid credit amount ${input.credits}`);
    const now = this.now();
    const day = istDay(now);
    const ttl = input.ttlSeconds ?? RESERVATION_TTL_SECONDS;
    const outcome = await this.db.transaction(async (tx) => {
      await this.lockWallet(tx, input.userId, now);
      await this.ensureGrant(tx, input.userId, input.plan, day, now);
      const [existing] = await tx
        .select()
        .from(creditLedger)
        .where(and(eq(creditLedger.kind, 'reserve'), eq(creditLedger.requestId, input.requestId)));
      if (existing) {
        if (existing.userId !== input.userId) throw new Error('credit request id belongs to another user');
        const state = await this.stateOf(tx, input.requestId);
        const s = await this.daySummary(tx, input.userId, day);
        return { ok: true as const, result: { created: false, state, credits: -existing.amount, balance: s.balance, istDay: existing.istDay, expiresAt: existing.reservationExpiresAt! } };
      }
      const s = await this.daySummary(tx, input.userId, day);
      if (s.balance < input.credits) return { ok: false as const, balance: s.balance };
      const expiresAt = new Date(now.getTime() + ttl * 1000);
      await tx.insert(creditLedger).values({
        userId: input.userId,
        kind: 'reserve',
        amount: -input.credits,
        action: input.action,
        requestId: input.requestId,
        istDay: day,
        reservationExpiresAt: expiresAt,
        planId: input.plan,
        metadata: input.metadata ?? {},
        createdAt: now,
      });
      return { ok: true as const, result: { created: true, state: 'open' as const, credits: input.credits, balance: s.balance - input.credits, istDay: day, expiresAt } };
    });
    // The grant (if this was the day's first touch) is committed even when the balance is too low.
    if (!outcome.ok) throw new InsufficientCreditsError(outcome.balance, input.credits, nextIstMidnight(now), input.plan);
    return outcome.result;
  }

  private async stateOf(db: Exec, requestId: string): Promise<ReservationState> {
    const [r] = await db
      .select({ kind: creditLedger.kind })
      .from(creditLedger)
      .where(and(eq(creditLedger.requestId, requestId), inArray(creditLedger.kind, ['charge', 'refund'])));
    return !r ? 'open' : r.kind === 'charge' ? 'charged' : 'refunded';
  }

  async reservationState(requestId: string): Promise<ReservationState | null> {
    const [res] = await this.db.select({ id: creditLedger.id }).from(creditLedger).where(and(eq(creditLedger.kind, 'reserve'), eq(creditLedger.requestId, requestId)));
    return res ? this.stateOf(this.db, requestId) : null;
  }

  private async reservation(userId: string, requestId: string) {
    const [res] = await this.db
      .select()
      .from(creditLedger)
      .where(and(eq(creditLedger.kind, 'reserve'), eq(creditLedger.requestId, requestId), eq(creditLedger.userId, userId)));
    if (!res) throw new Error(`no reservation ${requestId}`);
    return res;
  }

  /**
   * Settles a reservation as spent. `usedCredits` (default: all) lets per-answer actions return the
   * unused part; 0 used is a refund. Exactly one of charge/refund wins (unique index).
   */
  async charge(userId: string, requestId: string, opts: { usedCredits?: number; metadata?: Record<string, unknown> } = {}): Promise<SettleOutcome> {
    const res = await this.reservation(userId, requestId);
    const reserved = -res.amount;
    const used = Math.max(0, Math.min(reserved, Math.round(opts.usedCredits ?? reserved)));
    if (used === 0) return this.refund(userId, requestId, 'nothing_used');
    const inserted = await this.db
      .insert(creditLedger)
      .values({ userId, kind: 'charge', amount: reserved - used, action: res.action, requestId, istDay: res.istDay, planId: res.planId, metadata: { used, ...opts.metadata }, createdAt: this.now() })
      .onConflictDoNothing()
      .returning({ id: creditLedger.id });
    if (inserted.length) return 'charged';
    return (await this.stateOf(this.db, requestId)) === 'charged' ? 'already_charged' : 'already_refunded';
  }

  /** Returns the reserved credits (failure before output, moderation block, our error, sweeper). */
  async refund(userId: string, requestId: string, reason: string): Promise<SettleOutcome> {
    const res = await this.reservation(userId, requestId);
    const inserted = await this.db
      .insert(creditLedger)
      .values({ userId, kind: 'refund', amount: -res.amount, action: res.action, requestId, istDay: res.istDay, planId: res.planId, metadata: { reason }, createdAt: this.now() })
      .onConflictDoNothing()
      .returning({ id: creditLedger.id });
    if (inserted.length) return 'refunded';
    return (await this.stateOf(this.db, requestId)) === 'charged' ? 'already_charged' : 'already_refunded';
  }

  /** Billing hook: today's grant is topped up to the new plan's daily credits (no change on a downgrade). */
  async applyPlanChange(userId: string, plan: PlanId): Promise<BalanceView> {
    return this.balance(userId, plan);
  }

  /** Ledger history, newest first (cursor = last id of the previous page; ids are time-ordered uuid v7). */
  async ledger(userId: string, opts: { cursor?: string; limit: number }) {
    const rows = await this.db
      .select({
        id: creditLedger.id,
        kind: creditLedger.kind,
        amount: creditLedger.amount,
        action: creditLedger.action,
        istDay: creditLedger.istDay,
        createdAt: creditLedger.createdAt,
        metadata: creditLedger.metadata,
      })
      .from(creditLedger)
      .where(and(eq(creditLedger.userId, userId), opts.cursor ? lt(creditLedger.id, opts.cursor) : undefined))
      .orderBy(desc(creditLedger.id))
      .limit(opts.limit + 1);
    const page = rows.slice(0, opts.limit);
    return { entries: page, nextCursor: rows.length > opts.limit ? page[page.length - 1]!.id : null };
  }

  /**
   * Sweeper (worker `credits.sweep-reservations`): refunds reservations whose TTL passed without a
   * charge or refund. Idempotent; a charge racing the sweeper loses or wins cleanly (AC-08).
   */
  async sweepExpired(now: Date = this.now(), limit = 500): Promise<{ refunded: number; requestIds: string[] }> {
    const since = new Date(now.getTime() - 30 * 86_400_000);
    const rows = await this.db
      .select({ userId: creditLedger.userId, requestId: creditLedger.requestId })
      .from(creditLedger)
      .where(
        and(
          eq(creditLedger.kind, 'reserve'),
          lt(creditLedger.reservationExpiresAt, now),
          sql`${creditLedger.reservationExpiresAt} > ${since.toISOString()}::timestamptz`,
          sql`NOT EXISTS (SELECT 1 FROM credit_ledger s WHERE s.request_id = "credit_ledger"."request_id" AND s.kind IN ('charge', 'refund'))`,
        ),
      )
      .orderBy(creditLedger.reservationExpiresAt)
      .limit(limit);
    const requestIds: string[] = [];
    for (const r of rows) {
      if ((await this.refund(r.userId, r.requestId!, 'reservation_expired')) === 'refunded') requestIds.push(r.requestId!);
    }
    return { refunded: requestIds.length, requestIds };
  }
}

/**
 * Ledger invariants (AGENTS §6, AC-07): no user-day with a negative balance; no expired reservation
 * left unresolved (beyond `graceSeconds` for the sweeper to run). Used by tests and the guardrail job.
 */
export async function ledgerInvariants(db: Database, now: Date, graceSeconds = 0) {
  const negative = await db.execute<{ user_id: string; ist_day: string; balance: number }>(sql`
    SELECT user_id, ist_day::text, sum(amount)::int AS balance FROM credit_ledger
    GROUP BY user_id, ist_day HAVING sum(amount) < 0`);
  const cutoff = new Date(now.getTime() - graceSeconds * 1000).toISOString();
  const unresolved = await db.execute<{ n: number }>(sql`
    SELECT count(*)::int AS n FROM credit_ledger r
    WHERE r.kind = 'reserve' AND r.reservation_expires_at < ${cutoff}::timestamptz
      AND NOT EXISTS (SELECT 1 FROM credit_ledger s WHERE s.request_id = r.request_id AND s.kind IN ('charge', 'refund'))`);
  const doubled = await db.execute<{ n: number }>(sql`
    SELECT count(*)::int AS n FROM (
      SELECT request_id FROM credit_ledger WHERE kind IN ('charge', 'refund') GROUP BY request_id HAVING count(*) > 1) d`);
  return {
    negativeBalances: negative.rows,
    unresolvedExpired: unresolved.rows[0]?.n ?? 0,
    doubleResolved: doubled.rows[0]?.n ?? 0,
  };
}
