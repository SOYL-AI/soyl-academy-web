/**
 * Plans: `platform/shared/config/plans.ts` is the only source of prices (CONTEXT §7). This module
 *
 * - mirrors it into the `plans` table (FK target of subscriptions/orders/entitlements), and
 * - `syncPlans` (`npm run billing -w @soyl/api -- sync-plans [--dry-run]`) makes sure each recurring
 *   price has a Razorpay plan and records its id in `plans.razorpay_plan_ids`.
 *
 * Idempotent: a Razorpay plan is matched by our notes (app, plan, interval) AND its amount, currency and
 * period, so re-running creates nothing, and a lost database re-links the existing plans. Razorpay plans
 * are immutable: a price change creates a new Razorpay plan for new subscribers; existing subscriptions
 * keep billing on the plan they were created with (their `razorpay_plan_id`), which is the binding
 * checked on every event (AC-09).
 */
import { eq } from 'drizzle-orm';
import { plans as plansTable, type Database } from '@soyl/db';
import { BILLING, PLANS, type BillingInterval, type Plan, type PlanId } from '@soyl/shared/config/plans';
import type { RazorpayClient, RzpPlan } from './razorpay/types';

export type PlanRow = typeof plansTable.$inferSelect;
type RecurringInterval = Extract<BillingInterval, 'monthly' | 'yearly'>;

export interface PlanSyncChange {
  kind: 'db_insert' | 'db_update' | 'razorpay_create' | 'razorpay_link';
  plan: PlanId;
  interval?: RecurringInterval;
  detail: string;
}

export interface PlanSyncResult {
  dryRun: boolean;
  changes: PlanSyncChange[];
  razorpay: 'synced' | 'skipped';
}

function desiredRow(p: Plan) {
  return {
    key: p.id,
    name: p.name,
    creditsPerDay: p.creditsPerDay,
    features: [...p.features],
    prices: p.prices.map((x) => ({ interval: x.interval, amountPaise: x.amountPaise })),
    validUntil: p.validUntil ? new Date(p.validUntil) : null,
    displayOrder: p.order,
    active: true,
  };
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

function rowDiff(row: PlanRow, want: ReturnType<typeof desiredRow>): string[] {
  const out: string[] = [];
  if (row.name !== want.name) out.push(`name ${row.name} → ${want.name}`);
  if (row.creditsPerDay !== want.creditsPerDay) out.push(`credits/day ${row.creditsPerDay} → ${want.creditsPerDay}`);
  if (!same(row.features, want.features)) out.push(`features → ${want.features.join(',')}`);
  if (!same(row.prices, want.prices)) out.push(`prices ${JSON.stringify(row.prices)} → ${JSON.stringify(want.prices)}`);
  if ((row.validUntil?.getTime() ?? null) !== (want.validUntil?.getTime() ?? null)) out.push(`validUntil → ${want.validUntil?.toISOString() ?? 'none'}`);
  if (row.displayOrder !== want.displayOrder) out.push(`order ${row.displayOrder} → ${want.displayOrder}`);
  if (row.active !== want.active) out.push(`active → ${want.active}`);
  return out;
}

export async function loadPlanRows(db: Database): Promise<Map<PlanId, PlanRow>> {
  const rows = await db.select().from(plansTable);
  return new Map(rows.map((r) => [r.key as PlanId, r]));
}

/** Brings the `plans` table in line with plans.ts (no Razorpay calls). Returns what changed. */
export async function ensurePlanRows(db: Database, opts: { dryRun?: boolean; now?: Date } = {}): Promise<PlanSyncChange[]> {
  const existing = await loadPlanRows(db);
  const changes: PlanSyncChange[] = [];
  for (const p of PLANS) {
    const want = desiredRow(p);
    const row = existing.get(p.id);
    if (!row) {
      changes.push({ kind: 'db_insert', plan: p.id, detail: `insert plan row (${p.creditsPerDay} credits/day)` });
      if (!opts.dryRun) await db.insert(plansTable).values(want).onConflictDoNothing({ target: plansTable.key });
      continue;
    }
    const diff = rowDiff(row, want);
    if (diff.length) {
      changes.push({ kind: 'db_update', plan: p.id, detail: diff.join('; ') });
      if (!opts.dryRun) await db.update(plansTable).set(want).where(eq(plansTable.id, row.id));
    }
  }
  return changes;
}

/** Plan rows, creating them on first use (purchases and grants need the FK target). */
export async function requirePlanRows(db: Database): Promise<Map<PlanId, PlanRow>> {
  let rows = await loadPlanRows(db);
  if (rows.size < PLANS.length) {
    await ensurePlanRows(db);
    rows = await loadPlanRows(db);
  }
  return rows;
}

export function razorpayPlanName(p: Plan, interval: RecurringInterval): string {
  return `${BILLING.checkoutName} ${p.name} (${interval})`;
}

function matches(rp: RzpPlan, p: Plan, interval: RecurringInterval, amount: number): boolean {
  return (
    rp.notes.app === BILLING.notesApp &&
    rp.notes.soyl_plan === p.id &&
    rp.notes.soyl_interval === interval &&
    rp.period === interval &&
    rp.interval === 1 &&
    rp.item.amount === amount &&
    rp.item.currency === BILLING.currency
  );
}

/**
 * The full sync: plan rows, then one Razorpay plan per recurring price. `dryRun` reports the diff and
 * writes nothing (neither the database nor Razorpay).
 */
export async function syncPlans(db: Database, razorpay: RazorpayClient | null, opts: { dryRun?: boolean; now?: Date } = {}): Promise<PlanSyncResult> {
  const dryRun = Boolean(opts.dryRun);
  const changes = await ensurePlanRows(db, { dryRun });
  if (!razorpay) return { dryRun, changes, razorpay: 'skipped' };

  const remote = await razorpay.listPlans();
  const rows = dryRun ? await loadPlanRows(db) : await requirePlanRows(db);
  for (const p of PLANS) {
    const ids: Record<string, string> = { ...((rows.get(p.id)?.razorpayPlanIds as Record<string, string> | undefined) ?? {}) };
    const before = JSON.stringify(ids);
    for (const price of p.prices) {
      if (price.interval !== 'monthly' && price.interval !== 'yearly') continue;
      const interval = price.interval;
      const found = remote.filter((rp) => matches(rp, p, interval, price.amountPaise)).sort((a, b) => b.created_at - a.created_at)[0];
      if (found) {
        if (ids[interval] !== found.id) {
          changes.push({ kind: 'razorpay_link', plan: p.id, interval, detail: `use existing Razorpay plan ${found.id} (${price.amountPaise} paise)` });
          ids[interval] = found.id;
        }
        continue;
      }
      changes.push({ kind: 'razorpay_create', plan: p.id, interval, detail: `create Razorpay plan ${razorpayPlanName(p, interval)} at ${price.amountPaise} paise` });
      if (dryRun) continue;
      const created = await razorpay.createPlan({
        period: interval,
        interval: 1,
        item: { name: razorpayPlanName(p, interval), amount: price.amountPaise, currency: BILLING.currency, description: `${p.creditsPerDay} AI credits a day` },
        notes: { app: BILLING.notesApp, soyl_plan: p.id, soyl_interval: interval },
      });
      ids[interval] = created.id;
    }
    if (!dryRun && JSON.stringify(ids) !== before) {
      await db.update(plansTable).set({ razorpayPlanIds: ids, syncedAt: opts.now ?? new Date() }).where(eq(plansTable.key, p.id));
    }
  }
  return { dryRun, changes, razorpay: 'synced' };
}
