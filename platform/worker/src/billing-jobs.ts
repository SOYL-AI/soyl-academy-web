/**
 * Billing jobs (ARCHITECTURE §11.2, ADR-016). The logic lives in @soyl/api (billing/reconcile.ts) so
 * the API, the worker and the operator CLI share one implementation.
 *
 * - billing.reconcile  nightly 22:00 UTC (03:30 IST): compare Razorpay with local subscriptions/orders,
 *                      alert on drift (error log `billing_drift` alert=true + audit_log), repair it.
 *                      Skipped (logged) when no Razorpay provider is configured.
 * - billing.expire     hourly: stale unpaid orders → expired; subscriptions whose period ended without a
 *                      renewal webhook → re-synced; count of entitlements that lapsed (metric).
 * - billing.invoices   every 10 minutes (ADR-024): issue invoices / credit notes missing for recorded
 *                      payments, render missing or stale PDFs into Blob, send due invoice emails (retries
 *                      with backoff). Issuing needs INVOICING_ENABLED; sending needs ACS settings.
 *
 * The worker uses the real Razorpay client only (RAZORPAY_PROVIDER=razorpay). The in-memory stub has no
 * shared state with the API process, so reconciling against it would report everything as missing.
 */
import { expireBilling, reconcile, type ExpireReport, type ReconcileReport } from '@soyl/api/billing/reconcile';
import type { RazorpayClient } from '@soyl/api/billing/razorpay/types';
import { BillingEntitlementService } from '@soyl/api/billing/entitlements';
import { CreditService } from '@soyl/api/ai/credits';
import type { PlanId } from '@soyl/shared/config/plans';
import { InvoiceService, type SweepReport } from '@soyl/api/billing/invoices/service';
import type { InvoicingRuntime } from '@soyl/api/billing/invoices/issue';
import type { BlobStore } from '@soyl/api/ai/blob';
import type { EmailSender } from '@soyl/api/billing/invoices/delivery';
import { defineJob, type JobContext, type JobDefinition, type JobQueueOptions } from './registry';

export const BILLING_JOB_NAMES = {
  reconcile: 'billing.reconcile',
  expire: 'billing.expire',
  invoices: 'billing.invoices',
} as const;

export interface BillingJobSettings {
  /** Null: no provider configured (reconcile is skipped; order expiry still runs). */
  razorpay: RazorpayClient | null;
  /** Invoicing (ADR-024). Absent: the invoices job is a no-op and reconciliation issues no documents. */
  invoices?: { runtime: InvoicingRuntime; blob: () => BlobStore; email: EmailSender | null; publicBaseUrl: string } | null;
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

/** A plan made newly in force by a job tops today's AI credits up at once (ARCHITECTURE §11.2); never fails the job. */
function creditTopUp(ctx: JobContext) {
  return async (g: { userId: string; plan: PlanId }) => {
    try {
      const credits = new CreditService(ctx.db, { now: () => ctx.now.getTime() }, new BillingEntitlementService(ctx.db));
      await credits.applyPlanChange(g.userId, g.plan);
    } catch (err) {
      ctx.log.warn('credit top-up failed', { userId: g.userId, plan: g.plan, err: (err as Error).name });
    }
  };
}

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
        const r = await reconcile({ db: ctx.db, razorpay: settings.razorpay, now: ctx.now, log: ctx.log, onGranted: creditTopUp(ctx), invoicing: settings.invoices?.runtime }, { dryRun: false });
        return { checked: r.checked, drift: r.drift.length, alerts: r.alerts, repaired: r.repaired, errors: r.errors.length };
      },
    }),
    defineJob<unknown, ExpireReport>({
      name: BILLING_JOB_NAMES.expire,
      description: 'Expire stale unpaid orders; re-sync subscriptions whose renewal webhook is overdue',
      cron: '7 * * * *',
      options: { ...BILLING_QUEUE, expireInSeconds: 10 * 60, deleteAfterSeconds: 2 * 86_400 },
      handler: (ctx) => expireBilling({ db: ctx.db, razorpay: settings.razorpay, now: ctx.now, log: ctx.log, onGranted: creditTopUp(ctx), invoicing: settings.invoices?.runtime }),
    }),
    defineJob<unknown, SweepReport | { skipped: 'not_configured' }>({
      name: BILLING_JOB_NAMES.invoices,
      description: 'Issue missing invoices / credit notes, store their PDFs, email them (ADR-024)',
      cron: '*/10 * * * *',
      options: { ...BILLING_QUEUE, expireInSeconds: 9 * 60, deleteAfterSeconds: 2 * 86_400 },
      handler: async (ctx) => {
        const inv = settings.invoices;
        if (!inv) return { skipped: 'not_configured' };
        const service = new InvoiceService({
          db: ctx.db,
          clock: { now: () => ctx.now.getTime() },
          runtime: () => inv.runtime,
          blob: inv.blob,
          email: inv.email,
          publicBaseUrl: inv.publicBaseUrl,
          log: { info: (o, m) => ctx.log.info(m, o), warn: (o, m) => ctx.log.warn(m, o), error: (o, m) => ctx.log.error(m, o) },
        });
        const r = await service.sweep();
        if (r.refused) ctx.log.error('invoicing refused: invoicing config is not ready (OA-22)', { alert: true, event: 'invoicing_refused' });
        return r;
      },
    }),
  ] as JobDefinition[];
}
