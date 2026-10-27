/**
 * Billing jobs (ADR-016): nightly reconciliation repairs and alerts on drift; hourly expiry; the worker
 * only ever uses the real Razorpay client (never the per-process stub).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { auditLog, creditLedger, orders, plans } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { RazorpayStub } from '@soyl/api/billing/razorpay/stub';
import { RazorpayHttpClient } from '@soyl/api/billing/razorpay/http';
import { syncPlans } from '@soyl/api/billing/plans';
import { BILLING_JOB_NAMES, billingJobs } from '../src/billing-jobs';
import { allJobs, JOB_NAMES } from '../src/jobs';
import { loadConfig } from '../src/config';
import { billingClient } from '../src/worker';
import { makeUser, NOW } from './helpers';
import type { JobContext } from '../src/registry';

let t: TestDb;
const lines: { level: string; msg: string; fields?: Record<string, unknown> }[] = [];
const log = {
  info: (msg: string, fields?: Record<string, unknown>) => lines.push({ level: 'info', msg, fields }),
  warn: (msg: string, fields?: Record<string, unknown>) => lines.push({ level: 'warn', msg, fields }),
  error: (msg: string, fields?: Record<string, unknown>) => lines.push({ level: 'error', msg, fields }),
  debug: () => {},
  child: () => log,
} as unknown as JobContext['log'];

beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('billing jobs', () => {
  it('are registered with the worker (nightly reconcile at 03:30 IST, hourly expiry)', () => {
    const jobs = allJobs();
    expect(jobs.find((j) => j.name === JOB_NAMES.billingReconcile)!.cron).toBe('0 22 * * *');
    expect(jobs.find((j) => j.name === JOB_NAMES.billingExpire)!.cron).toBe('7 * * * *');
  });

  it('reconcile without a provider is skipped, not failed', async () => {
    const [job] = billingJobs({ razorpay: null });
    expect(await job!.handler({ db: t.db, now: NOW, log }, undefined)).toEqual({ skipped: 'no_provider' });
  });

  it('reconcile finds a paid order whose webhook never arrived, alerts, grants and audits', async () => {
    const stub = new RazorpayStub('rzp_test_WorkerJob0001', () => NOW.getTime());
    await syncPlans(t.db, stub, { now: NOW });
    const userId = await makeUser(t.db);
    const [bep] = await t.db.select().from(plans).where(eq(plans.key, 'board_exam_pass'));
    const rz = await stub.createOrder({ amount: 49_900, currency: 'INR', receipt: 'bep_worker_1', notes: { app: 'soyl-academy', soyl_user_id: userId, soyl_plan: 'board_exam_pass' } });
    await t.db.insert(orders).values({ userId, planId: bep!.id, razorpayOrderId: rz.id, receipt: 'bep_worker_1', amountPaise: 49_900, createdAt: NOW });
    stub.simulateOrderPayment(rz.id);

    const job = billingJobs({ razorpay: stub }).find((j) => j.name === BILLING_JOB_NAMES.reconcile)!;
    const r = await job.handler({ db: t.db, now: NOW, log }, undefined);
    expect(r).toMatchObject({ checked: 1, drift: 1, alerts: 1, repaired: 1, errors: 0 });
    expect(lines.some((l) => l.level === 'error' && l.msg === 'billing_drift' && l.fields?.alert === true)).toBe(true);
    const [o] = await t.db.select().from(orders).where(eq(orders.razorpayOrderId, rz.id));
    expect(o!.status).toBe('paid');
    expect(await t.db.select().from(auditLog).where(eq(auditLog.targetId, rz.id))).toHaveLength(1);
    // The new plan's credits apply at once (AI gateway CreditService.applyPlanChange).
    const grants = await t.db.select().from(creditLedger).where(eq(creditLedger.userId, userId));
    expect(grants.map((g) => [g.kind, g.amount, g.planId])).toEqual([['grant', 60, 'board_exam_pass']]);
    // Second night: nothing to do.
    expect(await job.handler({ db: t.db, now: NOW, log }, undefined)).toMatchObject({ drift: 0, alerts: 0 });
  });

  it('expiry marks stale unpaid orders expired even without a provider', async () => {
    const userId = await makeUser(t.db);
    const [bep] = await t.db.select().from(plans).where(eq(plans.key, 'board_exam_pass'));
    await t.db.insert(orders).values({ userId, planId: bep!.id, razorpayOrderId: 'order_StaleUnpaid01', receipt: 'bep_stale_1', amountPaise: 49_900, createdAt: new Date(NOW.getTime() - 25 * 3_600_000) });
    const job = billingJobs({ razorpay: null }).find((j) => j.name === BILLING_JOB_NAMES.expire)!;
    expect(await job.handler({ db: t.db, now: NOW, log }, undefined)).toMatchObject({ ordersExpired: 1, subscriptionsResynced: 0, errors: 0 });
    const [o] = await t.db.select().from(orders).where(eq(orders.razorpayOrderId, 'order_StaleUnpaid01'));
    expect(o!.status).toBe('expired');
  });

  it('the worker builds the real client only for RAZORPAY_PROVIDER=razorpay', () => {
    expect(billingClient(loadConfig({ APP_ENV: 'test' }))).toBeNull(); // local default is the stub: not used by the worker
    expect(billingClient(loadConfig({ APP_ENV: 'stg', DATABASE_URL: 'postgres://x', PGBOSS_MIGRATE: 'false' }))).toBeNull();
    const real = billingClient(
      loadConfig({ APP_ENV: 'stg', DATABASE_URL: 'postgres://x', PGBOSS_MIGRATE: 'false', RAZORPAY_PROVIDER: 'razorpay', RAZORPAY_KEY_ID: 'rzp_test_AbCdEf123456', RAZORPAY_KEY_SECRET: 's'.repeat(24), RAZORPAY_WEBHOOK_SECRET: 'w'.repeat(24) }),
    );
    expect(real).toBeInstanceOf(RazorpayHttpClient);
    expect(() => loadConfig({ APP_ENV: 'prod', DATABASE_URL: 'postgres://x', PGBOSS_MIGRATE: 'false', RAZORPAY_PROVIDER: 'stub' })).toThrow(/GEN-3/);
  });
});
