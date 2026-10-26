/**
 * Billing jobs (ARCHITECTURE §11.2, ADR-014). The logic lives in @soyl/api (billing/reconcile.ts) so
 * the API, the worker and the operator CLI share one implementation.
 *
 * - billing.reconcile  nightly 22:00 UTC (03:30 IST): compare Razorpay with local subscriptions/orders,
 *                      alert on drift (error log `billing_drift` alert=true + audit_log), repair it.
 *                      Skipped (logged) when no Razorpay provider is configured.
 * - billing.expire     hourly: stale unpaid orders → expired; subscriptions whose period ended without a
 *                      renewal webhook → re-synced; count of entitlements that lapsed (metric).
 *
 * The worker uses the real Razorpay client only (RAZORPAY_PROVIDER=razorpay). The in-memory stub has no
 * shared state with the API process, so reconciling against it would report everything as missing.
 */
import { expireBilling, reconcile, type ExpireReport, type ReconcileReport } from '@soyl/api/billing/reconcile';
import type { RazorpayClient } from '@soyl/api/billing/razorpay/types';
import { defineJob, type JobDefinition, type JobQueueOptions } from './registry';

export const BILLING_JOB_NAMES = {
  reconcile: 'billing.reconcile',
  expire: 'billing.expire',
} as const;

export interface BillingJobSettings {
  /** Null: no provider configured (reconcile is skipped; order expiry still runs). */
  razorpay: RazorpayClient | null;
}

const BILLING_QUEUE: JobQueueOptions = {
  policy: 'stately',
  retryLimit: 3,
  retryDelay: 300,
  retryBackoff: true,
  retryDelayMax: 3600,
  expireInSeconds: 30 * 60,
  deleteAfterSeconds: 14 * 86_400,
};

export type ReconcileJobResult = Pick<ReconcileReport, 'checked' | 'alerts' | 'repaired'> & { drift: number; errors: number } | { skipped: 'no_provider' };

export function billingJobs(settings: BillingJobSettings): JobDefinition[] {
  return [
    defineJob<unknown, ReconcileJobResult>({
      name: BILLING_JOB_NAMES.reconcile,
      description: 'Compare Razorpay with local subscriptions/orders, alert on drift and repair it (ARCHITECTURE §11.2)',
      cron: '0 22 * * *',
      options: BILLING_QUEUE,
      handler: async (ctx) => {
        if (!settings.razorpay) {
          ctx.log.info('billing reconciliation skipped: no Razorpay provider configured');
          return { skipped: 'no_provider' };
        }
        const r = await reconcile({ db: ctx.db, razorpay: settings.razorpay, now: ctx.now, log: ctx.log }, { dryRun: false });
        return { checked: r.checked, drift: r.drift.length, alerts: r.alerts, repaired: r.repaired, errors: r.errors.length };
      },
    }),
    defineJob<unknown, ExpireReport>({
      name: BILLING_JOB_NAMES.expire,
      description: 'Expire stale unpaid orders; re-sync subscriptions whose renewal webhook is overdue',
      cron: '7 * * * *',
      options: { ...BILLING_QUEUE, expireInSeconds: 10 * 60, deleteAfterSeconds: 2 * 86_400 },
      handler: (ctx) => expireBilling({ db: ctx.db, razorpay: settings.razorpay, now: ctx.now, log: ctx.log }),
    }),
  ] as JobDefinition[];
}
