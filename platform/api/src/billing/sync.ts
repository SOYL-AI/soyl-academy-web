/**
 * Applying Razorpay state to our records (ADR-014). Every path that changes billing state — webhooks,
 * the server-side refresh after Checkout, the cancel endpoint, nightly reconciliation and the replay
 * CLI — goes through these functions, and they never trust the caller's copy of an entity:
 *
 *   1. lock our row (orders / subscriptions FOR UPDATE) so concurrent events for one entity serialise;
 *   2. RE-FETCH the entity from the Razorpay API (AC-09, F-019);
 *   3. BIND it to the record we created for that user: amount, currency, receipt/plan id, and the
 *      notes we set (app, soyl_user_id, soyl_plan, soyl_interval). Any mismatch → `rejected`, nothing
 *      written, security event (the caller logs it);
 *   4. write Razorpay's CURRENT state (status, period, refunds) and derive the entitlement from it.
 *
 * Because step 4 applies the state Razorpay has now, not the state carried by the event, events can
 * arrive in any order (charged before activated, a stale halted after a recovery) and duplicates or
 * replays are harmless. Every function is idempotent and returns the field-level changes it made (or,
 * with `dryRun`, would make) — reconciliation reports those as drift.
 */
import { and, desc, eq, inArray } from 'drizzle-orm';
import { entitlements, orders, payments, subscriptions, type Database } from '@soyl/db';
import { BILLING, getPlan, type PlanId } from '@soyl/shared/config/plans';
import type { PlanRow } from './plans';
import { fromUnix, RazorpayNotFoundError, type RazorpayClient, type RzpOrder, type RzpPayment, type RzpSubscription } from './razorpay/types';

export type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
export type Exec = Database | Tx;

export type SyncOutcome = 'applied' | 'ignored' | 'rejected';

export interface Change {
  entity: 'order' | 'subscription' | 'payment' | 'entitlement';
  id: string;
  field: string;
  from: unknown;
  to: unknown;
}

export interface SyncResult {
  outcome: SyncOutcome;
  /** Why ignored/rejected (stable code), null when applied. */
  reason: string | null;
  /** The Razorpay entity id the sync was about. */
  entityId: string;
  userId: string | null;
  changes: Change[];
  /** A plan that became in force for a user now (credit top-up hook). */
  granted: { userId: string; plan: PlanId } | null;
}

export interface SyncDeps {
  tx: Exec;
  razorpay: RazorpayClient;
  now: Date;
  plans: Map<PlanId, PlanRow>;
  dryRun?: boolean;
}

const HOUR = 3_600_000;

function result(entityId: string, outcome: SyncOutcome, reason: string | null, extra: Partial<SyncResult> = {}): SyncResult {
  return { outcome, reason, entityId, userId: null, changes: [], granted: null, ...extra };
}

/** Combines the results of several syncs for one event: rejected > applied > ignored. */
export function mergeResults(primary: SyncResult, ...rest: SyncResult[]): SyncResult {
  const all = [primary, ...rest];
  const rejected = all.find((r) => r.outcome === 'rejected');
  const applied = all.find((r) => r.outcome === 'applied');
  const pick = rejected ?? applied ?? primary;
  return {
    outcome: pick.outcome,
    reason: pick.reason,
    entityId: primary.entityId,
    userId: all.find((r) => r.userId)?.userId ?? null,
    changes: all.flatMap((r) => r.changes),
    granted: rejected ? null : (all.find((r) => r.granted)?.granted ?? null),
  };
}

const norm = (v: unknown) => (v instanceof Date ? v.toISOString() : JSON.stringify(v ?? null));

function track(changes: Change[], entity: Change['entity'], id: string, before: Record<string, unknown>, after: Record<string, unknown>): Record<string, unknown> {
  const changed: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(after)) {
    if (norm(before[k]) !== norm(v)) {
      changes.push({ entity, id, field: k, from: before[k] ?? null, to: v ?? null });
      changed[k] = v;
    }
  }
  return changed;
}

function planKeyOf(plans: Map<PlanId, PlanRow>, planId: string): PlanId {
  for (const [k, row] of plans) if (row.id === planId) return k;
  throw new Error(`plan row ${planId} is not in plans.ts`);
}

function notesMismatch(notes: Record<string, string>, want: Record<string, string | null>): string | null {
  for (const [k, v] of Object.entries(want)) if ((notes[k] ?? null) !== v) return `notes_${k}_mismatch`;
  return null;
}

function inForce(e: { validFrom: Date; validUntil: Date; revokedAt: Date | null } | undefined, at: Date): boolean {
  return Boolean(e && e.validFrom <= at && e.validUntil >= at && (!e.revokedAt || e.revokedAt > at));
}

class RejectedRollback extends Error {
  constructor(readonly result: SyncResult) {
    super('rejected');
  }
}

/**
 * Runs a sync in its own transaction (or a savepoint inside the caller's): when the outcome is
 * `rejected`, everything it wrote is rolled back, so a binding failure found late (e.g. the
 * subscription after its payment) never leaves partial state.
 */
export async function atomicSync(db: Exec, fn: (tx: Tx) => Promise<SyncResult>): Promise<SyncResult> {
  try {
    return await db.transaction(async (tx) => {
      const r = await fn(tx);
      if (r.outcome === 'rejected') throw new RejectedRollback(r);
      return r;
    });
  } catch (err) {
    if (err instanceof RejectedRollback) return { ...err.result, changes: [], granted: null };
    throw err;
  }
}

/* ---- payments ------------------------------------------------------------------------------- */

function paymentStatus(p: RzpPayment): string {
  if (p.status === 'refunded' || (p.amount_refunded > 0 && p.amount_refunded >= p.amount)) return 'refunded';
  if (p.status === 'captured' && p.amount_refunded > 0) return 'partially_refunded';
  return p.status;
}

/** Writes Razorpay's current view of a payment under its parent (order or subscription) of ours. */
async function upsertPayment(d: SyncDeps, changes: Change[], parent: { userId: string | null; orderId: string | null; subscriptionId: string | null }, p: RzpPayment): Promise<string | null> {
  const [row] = await d.tx.select().from(payments).where(eq(payments.razorpayPaymentId, p.id));
  if (row && ((row.orderId ?? null) !== parent.orderId || (row.subscriptionId ?? null) !== parent.subscriptionId)) return 'payment_parent_mismatch';
  const status = paymentStatus(p);
  const captured = status === 'captured' || status === 'partially_refunded' || status === 'refunded';
  const after = {
    status,
    amountPaise: p.amount,
    currency: p.currency,
    method: p.method,
    refundedPaise: Math.min(p.amount_refunded, p.amount),
    failureReason: p.status === 'failed' ? (p.error_reason ?? p.error_code ?? 'failed') : null,
    capturedAt: captured ? (row?.capturedAt ?? d.now) : null,
  };
  if (!row) {
    changes.push({ entity: 'payment', id: p.id, field: 'created', from: null, to: status });
    if (!d.dryRun)
      await d.tx
        .insert(payments)
        .values({ ...after, userId: parent.userId, orderId: parent.orderId, subscriptionId: parent.subscriptionId, razorpayPaymentId: p.id, createdAt: d.now, updatedAt: d.now })
        .onConflictDoNothing({ target: payments.razorpayPaymentId });
    return null;
  }
  const changed = track(changes, 'payment', p.id, row as unknown as Record<string, unknown>, after);
  if (Object.keys(changed).length && !d.dryRun) await d.tx.update(payments).set({ ...changed, updatedAt: d.now }).where(eq(payments.id, row.id));
  return null;
}

/* ---- orders (Board Exam Pass) ------------------------------------------------------------------ */

function bindOrder(local: typeof orders.$inferSelect, planKey: PlanId, rz: RzpOrder): string | null {
  if (rz.amount !== local.amountPaise) return 'order_amount_mismatch';
  if (rz.currency !== local.currency) return 'order_currency_mismatch';
  if (rz.receipt !== local.receipt) return 'order_receipt_mismatch';
  return notesMismatch(rz.notes, { app: BILLING.notesApp, soyl_user_id: local.userId, soyl_plan: planKey });
}

export async function syncOrder(d: SyncDeps, razorpayOrderId: string): Promise<SyncResult> {
  const [local] = await d.tx.select().from(orders).where(eq(orders.razorpayOrderId, razorpayOrderId)).for('update');
  if (!local) return result(razorpayOrderId, 'ignored', 'not_ours');
  const planKey = planKeyOf(d.plans, local.planId);
  const base = { userId: local.userId };
  if (!local.userId) return result(razorpayOrderId, 'ignored', 'account_deleted');

  let rz: RzpOrder;
  let pays: RzpPayment[];
  try {
    rz = await d.razorpay.fetchOrder(razorpayOrderId);
    pays = await d.razorpay.fetchOrderPayments(razorpayOrderId);
  } catch (err) {
    if (err instanceof RazorpayNotFoundError) return result(razorpayOrderId, 'rejected', 'not_found_at_razorpay', base);
    throw err;
  }
  const why = bindOrder(local, planKey, rz);
  if (why) return result(razorpayOrderId, 'rejected', why, base);
  for (const p of pays) {
    if (p.order_id !== razorpayOrderId) return result(razorpayOrderId, 'rejected', 'payment_order_mismatch', base);
    if (p.currency !== local.currency) return result(razorpayOrderId, 'rejected', 'payment_currency_mismatch', base);
    if (p.status !== 'failed' && p.status !== 'created' && p.amount !== local.amountPaise) return result(razorpayOrderId, 'rejected', 'payment_amount_mismatch', base);
  }

  const changes: Change[] = [];
  for (const p of pays) {
    const bad = await upsertPayment(d, changes, { userId: local.userId, orderId: local.id, subscriptionId: null }, p);
    if (bad) return result(razorpayOrderId, 'rejected', bad, base);
  }

  const status = rz.status === 'paid' ? 'paid' : rz.status === 'attempted' ? 'attempted' : local.status === 'expired' ? 'expired' : 'created';
  const changed = track(changes, 'order', razorpayOrderId, { status: local.status }, { status });
  if (Object.keys(changed).length && !d.dryRun) await d.tx.update(orders).set({ status, updatedAt: d.now }).where(eq(orders.id, local.id));

  // Entitlement: a captured, not fully refunded payment of exactly the order amount on a paid order.
  const good = pays.find((p) => p.status === 'captured' && p.amount === local.amountPaise && p.amount_refunded < p.amount);
  const refunded = !good && pays.some((p) => paymentStatus(p) === 'refunded');
  const [ent] = await d.tx.select().from(entitlements).where(eq(entitlements.orderId, local.id));
  let granted: SyncResult['granted'] = null;
  if (rz.status === 'paid' && good) {
    const validUntilIso = getPlan(planKey).validUntil;
    const validUntil = validUntilIso ? new Date(validUntilIso) : null;
    if (!validUntil || validUntil <= d.now) {
      // Paid after the pass ended (should be impossible: orders are refused then). Needs a refund.
      return result(razorpayOrderId, 'applied', 'paid_after_plan_end', { ...base, changes });
    }
    if (!ent) {
      changes.push({ entity: 'entitlement', id: `order:${razorpayOrderId}`, field: 'granted', from: null, to: { plan: planKey, validUntil: validUntil.toISOString() } });
      if (!d.dryRun) {
        const inserted = await d.tx
          .insert(entitlements)
          .values({ userId: local.userId, planId: local.planId, source: 'order', orderId: local.id, validFrom: d.now, validUntil, createdAt: d.now, updatedAt: d.now })
          .onConflictDoNothing({ target: entitlements.orderId })
          .returning({ id: entitlements.id });
        if (inserted.length) granted = { userId: local.userId, plan: planKey };
      }
    }
  } else if (refunded && ent && !ent.revokedAt) {
    changes.push({ entity: 'entitlement', id: `order:${razorpayOrderId}`, field: 'revokedAt', from: null, to: d.now.toISOString() });
    if (!d.dryRun) await d.tx.update(entitlements).set({ revokedAt: d.now, updatedAt: d.now }).where(eq(entitlements.id, ent.id));
  }
  return result(razorpayOrderId, 'applied', null, { ...base, changes, granted });
}

/* ---- subscriptions (Plus / Pro monthly / yearly) ---------------------------------------------- */

function bindSubscription(local: typeof subscriptions.$inferSelect, planKey: PlanId, rz: RzpSubscription): string | null {
  if (!local.razorpayPlanId || rz.plan_id !== local.razorpayPlanId) return 'subscription_plan_mismatch';
  return notesMismatch(rz.notes, { app: BILLING.notesApp, soyl_user_id: local.userId, soyl_plan: planKey, soyl_interval: local.interval });
}

/** Razorpay → our status (the schema has no `paused`; we never pause, so treat it like halted: not entitled). */
function subscriptionStatus(s: RzpSubscription['status']): string {
  return s === 'paused' ? 'halted' : s;
}

export async function syncSubscription(d: SyncDeps, razorpaySubscriptionId: string): Promise<SyncResult> {
  const [local] = await d.tx.select().from(subscriptions).where(eq(subscriptions.razorpaySubscriptionId, razorpaySubscriptionId)).for('update');
  if (!local) return result(razorpaySubscriptionId, 'ignored', 'not_ours');
  const planKey = planKeyOf(d.plans, local.planId);
  const base = { userId: local.userId };
  if (!local.userId) return result(razorpaySubscriptionId, 'ignored', 'account_deleted');

  let rz: RzpSubscription;
  try {
    rz = await d.razorpay.fetchSubscription(razorpaySubscriptionId);
  } catch (err) {
    if (err instanceof RazorpayNotFoundError) return result(razorpaySubscriptionId, 'rejected', 'not_found_at_razorpay', base);
    throw err;
  }
  const why = bindSubscription(local, planKey, rz);
  if (why) return result(razorpaySubscriptionId, 'rejected', why, base);

  const changes: Change[] = [];
  const status = subscriptionStatus(rz.status);
  const terminal = ['cancelled', 'completed', 'expired'].includes(status);
  const after = {
    status,
    currentPeriodStart: fromUnix(rz.current_start),
    currentPeriodEnd: fromUnix(rz.current_end),
    paidCount: rz.paid_count,
    endedAt: fromUnix(rz.ended_at),
    cancelAtPeriodEnd: terminal ? false : local.cancelAtPeriodEnd,
  };
  const changed = track(changes, 'subscription', razorpaySubscriptionId, local as unknown as Record<string, unknown>, after);
  if (!d.dryRun && Object.keys(changed).length) await d.tx.update(subscriptions).set({ ...changed, lastEventAt: d.now, updatedAt: d.now }).where(eq(subscriptions.id, local.id));

  // Entitlement from Razorpay's current state. A fully refunded latest charge ends it.
  const [latest] = await d.tx
    .select({ status: payments.status })
    .from(payments)
    .where(and(eq(payments.subscriptionId, local.id), inArray(payments.status, ['captured', 'partially_refunded', 'refunded'])))
    .orderBy(desc(payments.createdAt))
    .limit(1);
  const end = after.currentPeriodEnd;
  const start = after.currentPeriodStart ?? d.now;
  const paid = rz.paid_count > 0 && end !== null && latest?.status !== 'refunded';
  let until: Date | null = null;
  if (paid && (status === 'active' || status === 'pending')) until = new Date(end!.getTime() + BILLING.renewalGraceHours * HOUR);
  else if (paid && (status === 'cancelled' || status === 'completed')) until = end;

  const [ent] = await d.tx.select().from(entitlements).where(eq(entitlements.subscriptionId, local.id));
  const id = `subscription:${razorpaySubscriptionId}`;
  let granted: SyncResult['granted'] = null;
  if (until && until > start) {
    if (!ent) {
      changes.push({ entity: 'entitlement', id, field: 'granted', from: null, to: { plan: planKey, validUntil: until.toISOString() } });
      if (!d.dryRun) {
        await d.tx
          .insert(entitlements)
          .values({ userId: local.userId, planId: local.planId, source: 'subscription', subscriptionId: local.id, validFrom: start, validUntil: until, createdAt: d.now, updatedAt: d.now })
          .onConflictDoUpdate({ target: entitlements.subscriptionId, set: { validUntil: until, planId: local.planId, revokedAt: null, updatedAt: d.now } });
        if (inForce({ validFrom: start, validUntil: until, revokedAt: null }, d.now)) granted = { userId: local.userId, plan: planKey };
      }
    } else {
      const wasInForce = inForce(ent, d.now);
      const ch = track(changes, 'entitlement', id, { validUntil: ent.validUntil, revokedAt: ent.revokedAt, planId: ent.planId }, { validUntil: until, revokedAt: null, planId: local.planId });
      if (Object.keys(ch).length && !d.dryRun) {
        await d.tx.update(entitlements).set({ ...ch, updatedAt: d.now }).where(eq(entitlements.id, ent.id));
        if (!wasInForce && inForce({ validFrom: ent.validFrom, validUntil: until, revokedAt: null }, d.now)) granted = { userId: local.userId, plan: planKey };
      }
    }
  } else if (ent && !ent.revokedAt && inForce(ent, d.now)) {
    changes.push({ entity: 'entitlement', id, field: 'revokedAt', from: null, to: d.now.toISOString() });
    if (!d.dryRun) await d.tx.update(entitlements).set({ revokedAt: d.now, updatedAt: d.now }).where(eq(entitlements.id, ent.id));
  }
  return result(razorpaySubscriptionId, 'applied', null, { ...base, changes, granted });
}

/* ---- payments (captured / failed / refunds) ----------------------------------------------------- */

/**
 * A payment event: re-fetch the payment; a subscription charge (it has an invoice) is bound to our
 * subscription through the invoice and recorded, then the subscription is synced; an order payment
 * syncs the order (which re-fetches all its payments).
 */
export async function syncPayment(d: SyncDeps, paymentId: string): Promise<SyncResult> {
  let p: RzpPayment;
  try {
    p = await d.razorpay.fetchPayment(paymentId);
  } catch (err) {
    if (err instanceof RazorpayNotFoundError) return result(paymentId, 'rejected', 'not_found_at_razorpay');
    throw err;
  }
  if (p.invoice_id) {
    let subId: string | null;
    try {
      subId = (await d.razorpay.fetchInvoice(p.invoice_id)).subscription_id;
    } catch (err) {
      if (err instanceof RazorpayNotFoundError) return result(paymentId, 'rejected', 'not_found_at_razorpay');
      throw err;
    }
    if (!subId) return result(paymentId, 'ignored', 'not_ours');
    const [local] = await d.tx.select().from(subscriptions).where(eq(subscriptions.razorpaySubscriptionId, subId)).for('update');
    if (!local) return result(paymentId, 'ignored', 'not_ours');
    const base = { userId: local.userId };
    if (!local.userId) return result(paymentId, 'ignored', 'account_deleted');
    if (p.currency !== BILLING.currency) return result(paymentId, 'rejected', 'payment_currency_mismatch', base);
    if (p.status !== 'failed' && p.status !== 'created' && p.amount !== local.amountPaise) return result(paymentId, 'rejected', 'payment_amount_mismatch', base);
    const changes: Change[] = [];
    const bad = await upsertPayment(d, changes, { userId: local.userId, orderId: null, subscriptionId: local.id }, p);
    if (bad) return result(paymentId, 'rejected', bad, base);
    const sub = await syncSubscription(d, subId);
    return mergeResults(result(paymentId, 'applied', null, { ...base, changes }), sub);
  }
  if (p.order_id) {
    const order = await syncOrder(d, p.order_id);
    return { ...order, entityId: paymentId };
  }
  return result(paymentId, 'ignored', 'not_ours');
}
