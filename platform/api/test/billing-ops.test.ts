/**
 * Billing operations: `npm run billing -- sync-plans` idempotency and dry run, nightly reconciliation
 * (drift detection, alerting, repair), the hourly expiry job, and the replay/resync/events commands
 * from the incident runbook.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { auditLog, orders, plans, subscriptions, webhookEvents } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { FakeClock } from '../src/clock';
import { runBillingCli } from '../src/billing/cli';
import { RazorpayStub } from '../src/billing/razorpay';
import { expireBilling, reconcile } from '../src/billing/reconcile';
import { createBillingHarness, eventRows, planFor, type BillingHarness } from './billing-fixture';

function cli(db: TestDb['db'], razorpay: RazorpayStub | null, clock: FakeClock, files: Record<string, string> = {}) {
  const out: string[] = [];
  const err: string[] = [];
  return {
    out,
    err,
    run: (...argv: string[]) => runBillingCli(argv, { db, razorpay, clock, io: { out: (l) => out.push(l), err: (l) => err.push(l) }, readFile: (p) => files[p] ?? '' }),
    json: () => out.map((l) => JSON.parse(l)),
  };
}

describe('billing sync-plans', () => {
  let t: TestDb;
  beforeAll(async () => {
    t = await createTestDb();
  });
  afterAll(async () => {
    await t?.close();
  });

  it('dry run prints the diff and writes nothing; the real run creates; a re-run changes nothing', async () => {
    const clock = new FakeClock();
    const stub = new RazorpayStub('rzp_test_SyncPlans0001', () => clock.now());
    const dry = cli(t.db, stub, clock);
    expect(await dry.run('sync-plans', '--dry-run')).toBe(0);
    const diff = dry.json();
    expect(diff.filter((c) => c.kind === 'db_insert')).toHaveLength(4);
    expect(diff.filter((c) => c.kind === 'razorpay_create').map((c) => `${c.plan}/${c.interval}`).sort()).toEqual(['plus/monthly', 'plus/yearly', 'pro/monthly', 'pro/yearly']);
    expect(diff.at(-1)).toMatchObject({ summary: true, dryRun: true, changes: 8, message: 'changes pending (dry run)' });
    expect(await t.db.select().from(plans)).toHaveLength(0);
    expect(stub.plans.size).toBe(0);

    const first = cli(t.db, stub, clock);
    expect(await first.run('sync-plans')).toBe(0);
    expect(first.json().at(-1)).toMatchObject({ summary: true, changes: 8, message: 'synced' });
    expect(stub.plans.size).toBe(4);
    const rows = await t.db.select().from(plans);
    expect(rows).toHaveLength(4);
    const plus = rows.find((r) => r.key === 'plus')!;
    expect(Object.keys(plus.razorpayPlanIds as object).sort()).toEqual(['monthly', 'yearly']);
    expect(stub.plans.get((plus.razorpayPlanIds as Record<string, string>).monthly!)).toMatchObject({ period: 'monthly', interval: 1, item: { amount: 19_900, currency: 'INR', name: 'SOYL Academy Plus (monthly)' }, notes: { app: 'soyl-academy', soyl_plan: 'plus', soyl_interval: 'monthly' } });
    expect(rows.find((r) => r.key === 'board_exam_pass')!.validUntil!.toISOString()).toBe('2027-03-31T18:29:59.000Z');

    const again = cli(t.db, stub, clock);
    expect(await again.run('sync-plans')).toBe(0);
    expect(again.json()).toEqual([{ summary: true, dryRun: false, razorpay: 'synced', changes: 0, message: 'no changes' }]);
    expect(stub.plans.size).toBe(4);
  });

  it('re-links existing Razorpay plans when the database lost them (no duplicates at Razorpay)', async () => {
    const clock = new FakeClock();
    const stub = new RazorpayStub('rzp_test_SyncPlans0002', () => clock.now());
    await cli(t.db, stub, clock).run('sync-plans');
    const created = stub.plans.size;
    await t.db.update(plans).set({ razorpayPlanIds: {} });
    const relink = cli(t.db, stub, clock);
    await relink.run('sync-plans');
    expect(relink.json().filter((c) => c.kind === 'razorpay_link')).toHaveLength(4);
    expect(stub.plans.size).toBe(created);
    // A drifted plan row (e.g. edited by hand) is put back from plans.ts.
    await t.db.update(plans).set({ creditsPerDay: 1 }).where(eq(plans.key, 'pro'));
    const fix = cli(t.db, stub, clock);
    await fix.run('sync-plans');
    expect(fix.json()[0]).toMatchObject({ kind: 'db_update', plan: 'pro', detail: 'credits/day 1 → 60' });
  });

  it('without a provider only the database rows are synced', async () => {
    const clock = new FakeClock();
    const c = cli(t.db, null, clock);
    expect(await c.run('sync-plans')).toBe(0);
    expect(c.json().at(-1)).toMatchObject({ razorpay: 'skipped' });
  });
});

describe('reconciliation, expiry and incident commands', () => {
  let h: BillingHarness;
  const START = Date.parse('2026-10-27T06:30:00Z');
  beforeAll(async () => {
    h = await createBillingHarness();
  });
  afterAll(async () => {
    await h?.close();
  });
  beforeEach(() => {
    h.clock.set(START);
  });

  /** Drops every pending drift so each test starts clean. */
  async function settle() {
    await reconcile({ db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()) }, { dryRun: false });
  }

  it('detects a payment whose webhook never arrived (alert), reports it in dry run, repairs it otherwise', async () => {
    await settle();
    const s = await h.student();
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    h.stub.simulateOrderPayment(order.orderId); // webhooks lost

    const logs: { level: string; msg: string; fields?: Record<string, unknown> }[] = [];
    const log = { info: (msg: string, fields?: Record<string, unknown>) => logs.push({ level: 'info', msg, fields }), warn: (msg: string, fields?: Record<string, unknown>) => logs.push({ level: 'warn', msg, fields }), error: (msg: string, fields?: Record<string, unknown>) => logs.push({ level: 'error', msg, fields }) };
    const dry = await reconcile({ db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()), log }, { dryRun: true });
    const item = dry.drift.find((d) => d.id === order.orderId)!;
    expect(item).toMatchObject({ kind: 'order', severity: 'alert', outcome: 'applied', userId: s.userId });
    expect(item.changes.map((c) => `${c.entity}.${c.field}`).sort()).toEqual(['entitlement.granted', 'order.status', 'payment.created']);
    expect(dry.repaired).toBe(0);
    expect(await planFor(h, s.userId)).toBe('free');
    const alert = logs.find((l) => l.level === 'error' && l.msg === 'billing_drift')!;
    expect(alert.fields).toMatchObject({ alert: true, event: 'billing_drift', dryRun: true });

    const granted: string[] = [];
    const fix = await reconcile({ db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()), onGranted: async (g) => void granted.push(g.plan) }, { dryRun: false });
    expect(fix.repaired).toBeGreaterThanOrEqual(1);
    expect(granted).toContain('board_exam_pass');
    expect(await planFor(h, s.userId)).toBe('board_exam_pass');
    const audit = await h.t.db.select().from(auditLog).where(eq(auditLog.targetId, order.orderId));
    expect(audit[0]).toMatchObject({ action: 'billing.reconcile.repaired', actorRole: 'system', targetType: 'order' });

    const clean = await reconcile({ db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()) }, { dryRun: true });
    expect(clean.drift.find((d) => d.id === order.orderId)).toBeUndefined();
  });

  it('detects a halt or cancellation that happened at Razorpay without a webhook, and revokes', async () => {
    await settle();
    const s = await h.student();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'pro', interval: 'monthly' })).json();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub.subscriptionId));
    expect(await planFor(h, s.userId)).toBe('pro');
    h.stub.simulateHalt(sub.subscriptionId); // webhook lost
    const r = await reconcile({ db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()) }, { dryRun: false });
    const item = r.drift.find((d) => d.id === sub.subscriptionId)!;
    expect(item.severity).toBe('alert');
    expect(item.changes.some((c) => c.entity === 'entitlement' && c.field === 'revokedAt')).toBe(true);
    expect(await planFor(h, s.userId)).toBe('free');
  });

  it('flags records that no longer bind as alerts and never repairs them', async () => {
    await settle();
    const s = await h.student();
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    h.stub.orders.get(order.orderId)!.amount = 1_00;
    const c = cli(h.t.db, h.stub, h.clock);
    expect(await c.run('reconcile')).toBe(3);
    const item = c.json().find((x) => x.id === order.orderId);
    expect(item).toMatchObject({ outcome: 'rejected', reason: 'order_amount_mismatch', severity: 'alert' });
    expect(c.err.some((l) => l.includes('billing_drift'))).toBe(true);
    const audit = await h.t.db.select().from(auditLog).where(eq(auditLog.targetId, order.orderId));
    expect(audit[0]!.action).toBe('billing.reconcile.rejected');
    h.stub.orders.get(order.orderId)!.amount = 49_900;
  });

  it('an abandoned checkout that Razorpay expired is informational drift', async () => {
    await settle();
    const s = await h.student();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'yearly' })).json();
    h.stub.subscriptions.get(sub.subscriptionId)!.status = 'expired';
    const r = await reconcile({ db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()) }, { dryRun: true });
    expect(r.drift.find((d) => d.id === sub.subscriptionId)).toMatchObject({ severity: 'info' });
  });

  it('reports Razorpay errors per entity without stopping the run', async () => {
    await settle();
    const s = await h.student();
    await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' });
    h.stub.down = true;
    try {
      const c = cli(h.t.db, h.stub, h.clock);
      expect(await c.run('reconcile', '--dry-run')).toBe(1);
      expect(c.json().at(-1).errors.length).toBeGreaterThan(0);
    } finally {
      h.stub.down = false;
    }
  });

  it('expiry: stale unpaid orders expire; a renewal whose webhook was missed is picked up', async () => {
    await settle();
    const s = await h.student();
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' })).json();
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub.subscriptionId));
    const end = h.stub.subscriptions.get(sub.subscriptionId)!.current_end! * 1000;
    h.clock.set(end + 60_000);
    h.stub.simulateRenewal(sub.subscriptionId); // charged at Razorpay, webhook lost
    const r = await expireBilling({ db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()) });
    expect(r.ordersExpired).toBeGreaterThanOrEqual(1);
    expect(r.subscriptionsResynced).toBe(1);
    const [o] = await h.t.db.select().from(orders).where(eq(orders.razorpayOrderId, order.orderId));
    expect(o!.status).toBe('expired');
    const [row] = await h.t.db.select().from(subscriptions).where(eq(subscriptions.razorpaySubscriptionId, sub.subscriptionId));
    expect(row!.paidCount).toBe(2);
    expect(await planFor(h, s.userId, end + 72 * 3_600_000)).toBe('plus');
    // A late payment on an expired order still applies (Razorpay is the source of truth).
    await h.deliverAll(h.stub.simulateOrderPayment(order.orderId));
    const [paid] = await h.t.db.select().from(orders).where(eq(orders.razorpayOrderId, order.orderId));
    expect(paid!.status).toBe('paid');
    const viaCli = cli(h.t.db, h.stub, h.clock);
    expect(await viaCli.run('expire')).toBe(0);
    expect(viaCli.json()[0]).toMatchObject({ summary: true });
  });

  it('replay --event-id re-applies a recorded event without a second row, with an audit entry', async () => {
    const s = await h.student();
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    const [captured] = h.stub.simulateOrderPayment(order.orderId);
    await h.deliver(captured!);
    const c = cli(h.t.db, h.stub, h.clock);
    expect(await c.run('replay', '--event-id', captured!.eventId, '--dry-run')).toBe(0);
    expect(c.json()[0]).toMatchObject({ eventId: captured!.eventId, outcome: 'applied', dryRun: true, recorded: true, changes: [] });
    const real = cli(h.t.db, h.stub, h.clock);
    expect(await real.run('replay', '--event-id', captured!.eventId)).toBe(0);
    expect(real.json()[0]).toMatchObject({ outcome: 'applied', recordedBefore: true });
    expect(await eventRows(h, captured!.eventId)).toHaveLength(1);
    const audit = await h.t.db.select().from(auditLog).where(eq(auditLog.targetId, captured!.eventId));
    expect(audit[0]).toMatchObject({ action: 'billing.webhook.replay', actorRole: 'operator-cli', targetType: 'webhook_event' });
  });

  it('replay --file imports an event that never arrived (state re-fetched from Razorpay, recorded once)', async () => {
    const s = await h.student();
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    const [, paid] = h.stub.simulateOrderPayment(order.orderId);
    // Even an edited export cannot grant anything: the amount in the file is ignored, Razorpay's is used.
    const exported = JSON.parse(JSON.stringify(paid!.body));
    exported.payload.order.entity.amount = 1;
    const c = cli(h.t.db, h.stub, h.clock, { 'event.json': JSON.stringify(exported) });
    expect(await c.run('replay', '--file', 'event.json', '--event-id', paid!.eventId)).toBe(0);
    expect(c.json()[0]).toMatchObject({ outcome: 'applied', recordedBefore: false });
    expect(await planFor(h, s.userId)).toBe('board_exam_pass');
    const [row] = await eventRows(h, paid!.eventId);
    expect(row!.outcome).toBe('applied');
    expect((await h.t.db.select().from(auditLog).where(eq(auditLog.targetId, paid!.eventId)))[0]!.action).toBe('billing.webhook.replay_import');
    // Delivering the real webhook afterwards is a duplicate.
    expect((await h.deliver(paid!)).json().duplicate).toBe(true);
  });

  it('resync and events commands', async () => {
    const s = await h.student();
    const order = (await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass' })).json();
    const [captured] = h.stub.simulateOrderPayment(order.orderId);
    const dry = cli(h.t.db, h.stub, h.clock);
    expect(await dry.run('resync', '--order', order.orderId, '--dry-run')).toBe(0);
    expect(dry.json()[0].changes.length).toBeGreaterThan(0);
    expect(await planFor(h, s.userId)).toBe('free');
    const real = cli(h.t.db, h.stub, h.clock);
    expect(await real.run('resync', '--order', order.orderId)).toBe(0);
    expect(await planFor(h, s.userId)).toBe('board_exam_pass');
    const payId = (captured!.body.payload.payment!.entity as { id: string }).id;
    expect(await cli(h.t.db, h.stub, h.clock).run('resync', '--payment', payId)).toBe(0);

    await h.deliver(captured!);
    const ev = cli(h.t.db, h.stub, h.clock);
    expect(await ev.run('events', '--entity', payId)).toBe(0);
    const listed = ev.json();
    expect(listed[0]).toMatchObject({ eventId: captured!.eventId, type: 'payment.captured', outcome: 'applied', entityId: payId });
    expect(listed[0].payload).toBeUndefined();
    const rejected = cli(h.t.db, h.stub, h.clock);
    await rejected.run('events', '--outcome', 'rejected', '--limit', '5');
    expect(rejected.json().at(-1).summary).toBe(true);
    expect((await h.t.db.select().from(webhookEvents)).length).toBeGreaterThan(0);
  });

  it('usage errors exit 2', async () => {
    const c = cli(h.t.db, h.stub, h.clock);
    expect(await c.run()).toBe(2);
    expect(await c.run('nope')).toBe(2);
    expect(await c.run('resync')).toBe(2);
    expect(await c.run('replay')).toBe(2);
    expect(await c.run('replay', '--event-id', 'evt_NotRecorded1')).toBe(2);
    expect(await c.run('replay', '--event-id')).toBe(2);
    expect(await c.run('events', 'stray')).toBe(2);
    expect(await cli(h.t.db, null, h.clock).run('reconcile')).toBe(2);
    expect(c.err.some((l) => l.startsWith('usage:'))).toBe(true);
  });
});
