/**
 * `npm run billing -w @soyl/api -- <command>` (from platform/). Operator tool for billing (ADR-016,
 * runbook docs/platform/runbooks/razorpay-webhook-replay.md). Needs DATABASE_URL (DATABASE_AUTH=entra
 * for managed identity) and the RAZORPAY_* settings of the environment (billing/config.ts).
 *
 *   sync-plans [--dry-run]                       plans.ts → plans table → Razorpay plans (idempotent)
 *   reconcile [--dry-run] [--days N]             compare Razorpay with our records; repair unless --dry-run
 *   expire                                       the hourly expiry job, once
 *   resync (--order ID | --subscription ID | --payment ID) [--dry-run]
 *                                                re-fetch one entity from Razorpay and apply it
 *   events [--entity ID] [--outcome O] [--type T] [--limit N]
 *                                                recorded webhook events (no payloads printed)
 *   replay --event-id ID [--dry-run]             re-apply a recorded event (no second webhook_events row)
 *   replay --file PAYLOAD.json --event-id ID [--dry-run]
 *                                                process an event body exported from the Razorpay dashboard
 *                                                (state is re-fetched, never taken from the file)
 *
 * Every non-dry-run replay/resync writes an audit_log row (action billing.*). Output: one JSON object
 * per line on stdout; exit 0 ok, 1 error, 2 usage, 3 drift found (reconcile) or rejected (replay/resync).
 */
import { readFileSync } from 'node:fs';
import { and, desc, eq, type SQL } from 'drizzle-orm';
import { auditLog, webhookEvents, type Database } from '@soyl/db';
import type { Clock } from '../clock';
import { syncPlans, requirePlanRows } from './plans';
import { expireBilling, reconcile, type ReconcileLog } from './reconcile';
import { RzpWebhookEvent, type RazorpayClient } from './razorpay/types';
import { atomicSync, syncOrder, syncPayment, syncSubscription, type SyncResult } from './sync';
import { applyEvent, WebhookProcessor } from './webhooks';

export interface CliIo {
  out(line: string): void;
  err(line: string): void;
}

export interface CliDeps {
  db: Database;
  razorpay: RazorpayClient | null;
  clock: Clock;
  io: CliIo;
  /** For `replay --file` (tests pass the file contents directly). */
  readFile?: (path: string) => string;
}

export const USAGE = `usage: npm run billing -w @soyl/api -- <command>
  sync-plans [--dry-run]
  reconcile [--dry-run] [--days N]
  expire
  resync (--order ID | --subscription ID | --payment ID) [--dry-run]
  events [--entity ID] [--outcome applied|ignored|rejected] [--type EVENT] [--limit N]
  replay --event-id ID [--dry-run]
  replay --file PAYLOAD.json --event-id ID [--dry-run]`;

function parseArgs(argv: string[]): { command: string | undefined; flags: Map<string, string | true> } {
  const [command, ...rest] = argv;
  const flags = new Map<string, string | true>();
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i]!;
    if (!a.startsWith('--')) throw new UsageError(`unexpected argument ${a}`);
    const next = rest[i + 1];
    if (next !== undefined && !next.startsWith('--')) {
      flags.set(a.slice(2), next);
      i++;
    } else flags.set(a.slice(2), true);
  }
  return { command, flags };
}

class UsageError extends Error {}

const json = (v: unknown) => JSON.stringify(v, (_k, x) => (x instanceof Date ? x.toISOString() : x));

function str(flags: Map<string, string | true>, name: string): string | undefined {
  const v = flags.get(name);
  if (v === true) throw new UsageError(`--${name} needs a value`);
  return v;
}

function needRazorpay(d: CliDeps): RazorpayClient {
  if (!d.razorpay) throw new UsageError('no billing provider configured (set RAZORPAY_PROVIDER=razorpay and the RAZORPAY_* keys)');
  return d.razorpay;
}

function reconcileLog(io: CliIo): ReconcileLog {
  return {
    info: (msg, f) => io.err(json({ level: 'info', msg, ...f })),
    warn: (msg, f) => io.err(json({ level: 'warn', msg, ...f })),
    error: (msg, f) => io.err(json({ level: 'error', msg, ...f })),
  };
}

async function audit(db: Database, now: Date, action: string, targetType: string, targetId: string, after: Record<string, unknown>) {
  await db.insert(auditLog).values({ actorUserId: null, actorRole: 'operator-cli', action, targetType, targetId, after, createdAt: now });
}

function summary(r: SyncResult) {
  return { outcome: r.outcome, reason: r.reason, entityId: r.entityId, changes: r.changes };
}

export async function runBillingCli(argv: string[], d: CliDeps): Promise<number> {
  const { io } = d;
  let parsed;
  try {
    parsed = parseArgs(argv);
  } catch (err) {
    io.err((err as Error).message);
    io.err(USAGE);
    return 2;
  }
  const { command, flags } = parsed;
  const dryRun = flags.has('dry-run');
  const now = new Date(d.clock.now());
  try {
    switch (command) {
      case 'sync-plans': {
        const r = await syncPlans(d.db, d.razorpay, { dryRun, now });
        for (const c of r.changes) io.out(json({ ...c, dryRun }));
        io.out(json({ summary: true, dryRun, razorpay: r.razorpay, changes: r.changes.length, message: r.changes.length ? (dryRun ? 'changes pending (dry run)' : 'synced') : 'no changes' }));
        return 0;
      }
      case 'reconcile': {
        const days = str(flags, 'days');
        const r = await reconcile({ db: d.db, razorpay: needRazorpay(d), now, log: reconcileLog(io) }, { dryRun, lookbackDays: days ? Number(days) : undefined });
        for (const item of r.drift) io.out(json(item));
        io.out(json({ summary: true, dryRun, checked: r.checked, drift: r.drift.length, alerts: r.alerts, repaired: r.repaired, errors: r.errors }));
        return r.alerts ? 3 : r.errors.length ? 1 : 0;
      }
      case 'expire': {
        const r = await expireBilling({ db: d.db, razorpay: d.razorpay, now, log: reconcileLog(io) });
        io.out(json({ summary: true, ...r }));
        return r.errors ? 1 : 0;
      }
      case 'resync': {
        const razorpay = needRazorpay(d);
        const target = (['order', 'subscription', 'payment'] as const).find((k) => flags.has(k));
        const id = target ? str(flags, target) : undefined;
        if (!target || !id) throw new UsageError('resync needs --order, --subscription or --payment with an id');
        const plans = await requirePlanRows(d.db);
        const r = await atomicSync(d.db, (tx) => {
          const sd = { tx, razorpay, now, plans, dryRun };
          return target === 'order' ? syncOrder(sd, id) : target === 'subscription' ? syncSubscription(sd, id) : syncPayment(sd, id);
        });
        if (!dryRun) await audit(d.db, now, 'billing.resync', target, id, { outcome: r.outcome, reason: r.reason, changes: r.changes.length });
        io.out(json({ ...summary(r), dryRun }));
        return r.outcome === 'rejected' ? 3 : 0;
      }
      case 'events': {
        const conds: SQL[] = [eq(webhookEvents.provider, 'razorpay')];
        const entity = str(flags, 'entity');
        const outcome = str(flags, 'outcome');
        const type = str(flags, 'type');
        if (entity) conds.push(eq(webhookEvents.entityId, entity));
        if (outcome) conds.push(eq(webhookEvents.outcome, outcome));
        if (type) conds.push(eq(webhookEvents.eventType, type));
        const rows = await d.db
          .select({ eventId: webhookEvents.eventId, type: webhookEvents.eventType, outcome: webhookEvents.outcome, entityId: webhookEvents.entityId, eventCreatedAt: webhookEvents.eventCreatedAt, processedAt: webhookEvents.processedAt })
          .from(webhookEvents)
          .where(and(...conds))
          .orderBy(desc(webhookEvents.processedAt))
          .limit(Math.min(1000, Number(str(flags, 'limit') ?? 50)));
        for (const r of rows) io.out(json(r));
        io.out(json({ summary: true, events: rows.length }));
        return 0;
      }
      case 'replay': {
        const razorpay = needRazorpay(d);
        const eventId = str(flags, 'event-id');
        if (!eventId) throw new UsageError('replay needs --event-id');
        const file = str(flags, 'file');
        let payload: unknown;
        let recorded = false;
        if (file) {
          payload = JSON.parse((d.readFile ?? ((p) => readFileSync(p, 'utf8')))(file));
          const [row] = await d.db.select({ id: webhookEvents.id }).from(webhookEvents).where(and(eq(webhookEvents.provider, 'razorpay'), eq(webhookEvents.eventId, eventId)));
          recorded = Boolean(row);
        } else {
          const [row] = await d.db.select().from(webhookEvents).where(and(eq(webhookEvents.provider, 'razorpay'), eq(webhookEvents.eventId, eventId)));
          if (!row) throw new UsageError(`event ${eventId} is not recorded; use --file with the payload from the Razorpay dashboard`);
          payload = row.payload;
          recorded = true;
        }
        const ev = RzpWebhookEvent.safeParse(payload);
        if (!ev.success) throw new UsageError('the payload is not a Razorpay webhook event');
        if (dryRun) {
          const plans = await requirePlanRows(d.db);
          const r = await atomicSync(d.db, (tx) => applyEvent({ tx, razorpay, now, plans, dryRun: true }, ev.data));
          io.out(json({ ...summary(r), eventId, type: ev.data.event, dryRun, recorded }));
          return r.outcome === 'rejected' ? 3 : 0;
        }
        const processor = new WebhookProcessor({ db: d.db, razorpay, secrets: [], clock: d.clock, plans: () => requirePlanRows(d.db) });
        // A recorded event is re-applied without a second row (UNIQUE event id); a new one is recorded.
        const out = await processor.process(eventId, ev.data, payload, { record: !recorded });
        await audit(d.db, now, recorded ? 'billing.webhook.replay' : 'billing.webhook.replay_import', 'webhook_event', eventId, { type: ev.data.event, outcome: out.outcome, reason: out.result?.reason ?? null, changes: out.result?.changes.length ?? 0 });
        io.out(json({ eventId, type: ev.data.event, outcome: out.outcome, reason: out.result?.reason ?? null, changes: out.result?.changes ?? [], recordedBefore: recorded }));
        return out.outcome === 'rejected' ? 3 : 0;
      }
      default:
        io.err(command ? `unknown command ${command}` : 'missing command');
        io.err(USAGE);
        return 2;
    }
  } catch (err) {
    if (err instanceof UsageError) {
      io.err(err.message);
      io.err(USAGE);
      return 2;
    }
    io.err(json({ level: 'error', msg: 'billing command failed', error: (err as Error).message }));
    return 1;
  }
}
