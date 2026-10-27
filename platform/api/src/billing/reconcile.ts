/**
 * Nightly reconciliation and hourly expiry (ARCHITECTURE §11.2, ADR-016). Run by the worker
 * (`billing.reconcile`, `billing.expire`) and by the CLI (`npm run billing -w @soyl/api -- reconcile`).
 *
 * Reconciliation compares Razorpay with our records by running each sync in dry-run mode: any change
 * it would make is drift. Drift that touches money or entitlements (payments, refunds, paid periods,
 * grants/revocations) or fails a binding check is an ALERT (error log `billing_drift` with alert=true,
 * which the Log Analytics alert rule watches, plus an audit_log row per entity); other drift (an
 * abandoned checkout Razorpay expired) is informational. Unless `dryRun`, the drift is then repaired by
 * applying Razorpay's state — Razorpay is the source of truth for payments.
 */
import { and, gt, gte, inArray, lt, lte, notInArray, or, sql } from 'drizzle-orm';
import { auditLog, entitlements, orders, subscriptions, type Database } from '@soyl/db';
import { BILLING, type PlanId } from '@soyl/shared/config/plans';
import { requirePlanRows, type PlanRow } from './plans';
import { RazorpayApiError, type RazorpayClient } from './razorpay/types';
import { atomicSync, syncOrder, syncSubscription, type Change, type SyncResult } from './sync';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

export interface ReconcileLog {
  info(msg: string, fields?: Record<string, unknown>): void;
  warn(msg: string, fields?: Record<string, unknown>): void;
  error(msg: string, fields?: Record<string, unknown>): void;
}

export interface DriftItem {
  kind: 'subscription' | 'order';
  id: string;
  userId: string | null;
  severity: 'alert' | 'info';
  outcome: SyncResult['outcome'];
  reason: string | null;
  changes: Change[];
}

export interface ReconcileReport {
  dryRun: boolean;
  checked: number;
  drift: DriftItem[];
  alerts: number;
  repaired: number;
  errors: { kind: string; id: string; message: string }[];
}

export interface ReconcileDeps {
  db: Database;
  razorpay: RazorpayClient;
  now: Date;
  log?: ReconcileLog;
  onGranted?: (g: { userId: string; plan: PlanId }) => Promise<void>;
}

const MONEY_FIELDS = new Set(['paidCount', 'currentPeriodEnd', 'refundedPaise', 'status:paid']);

function severity(kind: DriftItem['kind'], r: SyncResult): DriftItem['severity'] {
  if (r.outcome === 'rejected') return 'alert';
  for (const c of r.changes) {
    if (c.entity === 'payment' || c.entity === 'entitlement') return 'alert';
    if (MONEY_FIELDS.has(c.field)) return 'alert';
    if (kind === 'order' && c.field === 'status' && c.to === 'paid') return 'alert';
    if (kind === 'subscription' && c.field === 'status' && ['active', 'halted', 'cancelled', 'pending'].includes(String(c.to))) return 'alert';
  }
  return 'info';
}

async function syncOne(deps: ReconcileDeps, plans: Map<PlanId, PlanRow>, kind: DriftItem['kind'], id: string, dryRun: boolean): Promise<SyncResult> {
  return atomicSync(deps.db, (tx) => {
    const d = { tx, razorpay: deps.razorpay, now: deps.now, plans, dryRun };
    return kind === 'order' ? syncOrder(d, id) : syncSubscription(d, id);
  });
}

/** Which local records are worth comparing tonight. */
async function candidates(db: Database, now: Date, lookbackDays: number) {
  const since = new Date(now.getTime() - lookbackDays * DAY);
  const subs = await db
    .select({ id: subscriptions.razorpaySubscriptionId })
    .from(subscriptions)
    .where(or(notInArray(subscriptions.status, ['expired', 'completed', 'cancelled']), gt(subscriptions.updatedAt, since)))
    .orderBy(subscriptions.createdAt);
  const ords = await db
    .select({ id: orders.razorpayOrderId })
    .from(orders)
    .where(gt(orders.createdAt, since))
    .orderBy(orders.createdAt);
  return { subs: subs.map((s) => s.id), ords: ords.map((o) => o.id) };
}

export async function reconcile(deps: ReconcileDeps, opts: { dryRun?: boolean; lookbackDays?: number } = {}): Promise<ReconcileReport> {
  const dryRun = Boolean(opts.dryRun);
  const plans = await requirePlanRows(deps.db);
  const { subs, ords } = await candidates(deps.db, deps.now, opts.lookbackDays ?? 40);
  const report: ReconcileReport = { dryRun, checked: 0, drift: [], alerts: 0, repaired: 0, errors: [] };
  const work: [DriftItem['kind'], string][] = [...subs.map((id) => ['subscription', id] as [DriftItem['kind'], string]), ...ords.map((id) => ['order', id] as [DriftItem['kind'], string])];

  for (const [kind, id] of work) {
    report.checked++;
    try {
      const probe = await syncOne(deps, plans, kind, id, true);
      if (probe.outcome === 'ignored' || (probe.outcome === 'applied' && probe.changes.length === 0)) continue;
      const item: DriftItem = { kind, id, userId: probe.userId, severity: severity(kind, probe), outcome: probe.outcome, reason: probe.reason, changes: probe.changes };
      report.drift.push(item);
      if (item.severity === 'alert') report.alerts++;
      if (!dryRun && probe.outcome === 'applied') {
        const applied = await syncOne(deps, plans, kind, id, false);
        if (applied.changes.length) report.repaired++;
        if (applied.granted && deps.onGranted) await deps.onGranted(applied.granted);
      }
    } catch (err) {
      report.errors.push({ kind, id, message: err instanceof RazorpayApiError ? `razorpay ${err.status} ${err.code ?? ''}`.trim() : (err as Error).name });
    }
  }

  if (!dryRun && report.drift.length) {
    // Append-only audit trail of what reconciliation found and repaired (no personal data: ids and fields).
    await deps.db.insert(auditLog).values(
      report.drift.map((d) => ({
        actorUserId: null,
        actorRole: 'system',
        action: d.outcome === 'rejected' ? 'billing.reconcile.rejected' : 'billing.reconcile.repaired',
        targetType: d.kind,
        targetId: d.id,
        before: { changes: d.changes.map((c) => ({ entity: c.entity, field: c.field, value: c.from })) },
        after: { severity: d.severity, reason: d.reason, changes: d.changes.map((c) => ({ entity: c.entity, field: c.field, value: c.to })) },
        createdAt: deps.now,
      })),
    );
  }
  const summary = { checked: report.checked, drift: report.drift.length, alerts: report.alerts, repaired: report.repaired, errors: report.errors.length, dryRun };
  if (report.alerts) deps.log?.error('billing_drift', { alert: true, event: 'billing_drift', ...summary, items: report.drift.filter((d) => d.severity === 'alert').map((d) => ({ kind: d.kind, id: d.id, reason: d.reason, fields: d.changes.map((c) => `${c.entity}.${c.field}`) })) });
  else if (report.errors.length) deps.log?.warn('billing reconciliation had errors', { event: 'billing_reconcile_errors', ...summary });
  else deps.log?.info('billing reconciliation', { event: 'billing_reconcile', ...summary });
  return report;
}

export interface ExpireReport {
  ordersExpired: number;
  subscriptionsResynced: number;
  entitlementsLapsed: number;
  errors: number;
}

/**
 * Hourly: (1) unpaid orders older than BILLING.orderExpiryHours → `expired`; (2) subscriptions whose
 * period ended without a renewal webhook → re-synced from Razorpay (a missed `subscription.charged`
 * would otherwise let a paid renewal lapse after the grace period); (3) count entitlements that lapsed
 * in the last hour (metric). Entitlements themselves need no write: planFor honours valid_until.
 */
export async function expireBilling(deps: { db: Database; razorpay: RazorpayClient | null; now: Date; log?: ReconcileLog; onGranted?: ReconcileDeps['onGranted'] }, opts: { batch?: number } = {}): Promise<ExpireReport> {
  const { db, now } = deps;
  const expired = await db
    .update(orders)
    .set({ status: 'expired', updatedAt: now })
    .where(and(inArray(orders.status, ['created', 'attempted']), lt(orders.createdAt, new Date(now.getTime() - BILLING.orderExpiryHours * HOUR))))
    .returning({ id: orders.id });

  let resynced = 0;
  let errors = 0;
  if (deps.razorpay) {
    const overdue = await db
      .select({ id: subscriptions.razorpaySubscriptionId })
      .from(subscriptions)
      .where(and(inArray(subscriptions.status, ['active', 'pending']), lte(subscriptions.currentPeriodEnd, now)))
      .limit(opts.batch ?? 200);
    if (overdue.length) {
      const plans = await requirePlanRows(db);
      for (const s of overdue) {
        try {
          const r = await syncOne({ db, razorpay: deps.razorpay, now }, plans, 'subscription', s.id, false);
          if (r.changes.length) resynced++;
          if (r.granted && deps.onGranted) await deps.onGranted(r.granted);
        } catch {
          errors++;
        }
      }
    }
  }
  const [lapsed] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(entitlements)
    .where(and(gte(entitlements.validUntil, new Date(now.getTime() - HOUR)), lt(entitlements.validUntil, now)));
  const report = { ordersExpired: expired.length, subscriptionsResynced: resynced, entitlementsLapsed: lapsed?.n ?? 0, errors };
  deps.log?.info('billing expiry', { event: 'billing_expire', ...report });
  return report;
}
