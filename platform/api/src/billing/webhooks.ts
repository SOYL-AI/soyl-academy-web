/**
 * POST /v1/webhooks/razorpay processing (ARCHITECTURE §11.2, AC-09, F-019, ADR-016).
 *
 *   raw bytes ─ signature (HMAC-SHA256, constant time, current+previous secret) ─ only then JSON.parse
 *     ─ one transaction:
 *         pg_advisory_xact_lock(event id)           two deliveries of one event serialise here
 *         webhook_events has (razorpay, event id)?  → duplicate: 200, nothing else
 *         dispatch → sync*() (re-fetch, bind, apply; savepoint rolled back when rejected)
 *         INSERT webhook_events (payload, outcome, entity id, processed_at)   append-only, same tx
 *       commit
 *     ─ after commit: credit top-up hook for a newly granted plan; delivery of invoices the event issued
 *
 * A Razorpay API failure (outage, timeout) aborts the transaction and answers 503, so the event is
 * not recorded and Razorpay retries it. A binding failure is recorded as `rejected` (200, so Razorpay
 * stops retrying a payload that will never bind) and logged as a security event.
 *
 * The event id header is not covered by the signature, so a captured body could be re-sent under a new
 * id. That is harmless: processing never trusts the body — it re-fetches the entity and applies
 * Razorpay's current state, which is idempotent.
 */
import { and, eq, sql } from 'drizzle-orm';
import { webhookEvents, type Database } from '@soyl/db';
import type { PlanId } from '@soyl/shared/config/plans';
import type { Clock } from '../clock';
import type { InvoicingLog, InvoicingRuntime } from './invoices/issue';
import type { PlanRow } from './plans';
import { fromUnix, RazorpayApiError, RzpWebhookEvent, type RazorpayClient } from './razorpay/types';
import { verifyWebhookSignature } from './razorpay/signature';
import { atomicSync, mergeResults, syncOrder, syncPayment, syncSubscription, type SyncDeps, type SyncResult, type Tx } from './sync';

export const HANDLED_EVENTS = [
  'subscription.authenticated',
  'subscription.activated',
  'subscription.charged',
  'subscription.pending',
  'subscription.halted',
  'subscription.cancelled',
  'subscription.completed',
  'subscription.updated',
  'subscription.paused',
  'subscription.resumed',
  'payment.authorized',
  'payment.captured',
  'payment.failed',
  'order.paid',
  'refund.created',
  'refund.processed',
  'refund.failed',
] as const;

const EVENT_ID = /^[A-Za-z0-9_.:-]{6,100}$/;

export interface WebhookLog {
  warn(obj: Record<string, unknown>, msg: string): void;
  info(obj: Record<string, unknown>, msg: string): void;
  error(obj: Record<string, unknown>, msg: string): void;
}

export type WebhookResponse =
  | { status: 200; body: { received: true; duplicate: boolean; outcome: string } }
  | { status: 400; reason: 'signature_missing' | 'signature_invalid' | 'event_id_invalid' | 'body_invalid' }
  | { status: 404; reason: 'not_configured' }
  | { status: 503; reason: 'razorpay_unavailable' };

export interface ProcessedEvent {
  duplicate: boolean;
  outcome: string;
  result: SyncResult | null;
}

export interface WebhookDeps {
  db: Database;
  razorpay: RazorpayClient | null;
  secrets: readonly string[];
  clock: Clock;
  plans: () => Promise<Map<PlanId, PlanRow>>;
  onGranted?: (granted: { userId: string; plan: PlanId }) => Promise<void>;
  /** Invoicing (ADR-024): documents are issued in the event's transaction. */
  invoicing?: () => InvoicingRuntime | null | undefined;
  /** Called after commit with the documents the event issued (delivery: PDF + email). */
  onInvoices?: (ids: string[]) => void;
  invoiceLog?: () => InvoicingLog | undefined;
  /** Called after commit with the plans whose checkout the event completed (D-045 counter). */
  onCompleted?: (plans: PlanId[]) => void;
}

/** What an event is about, and which sync applies it. */
export function dispatchTarget(ev: RzpWebhookEvent): { kind: 'subscription' | 'payment' | 'order'; id: string; paymentId?: string } | null {
  const p = ev.payload;
  if (ev.event.startsWith('subscription.') && p.subscription) return { kind: 'subscription', id: p.subscription.entity.id, paymentId: p.payment?.entity.id };
  if (ev.event.startsWith('payment.') && p.payment) return { kind: 'payment', id: p.payment.entity.id };
  if (ev.event === 'order.paid' && p.order) return { kind: 'order', id: p.order.entity.id };
  if (ev.event.startsWith('refund.') && p.refund) return { kind: 'payment', id: p.refund.entity.payment_id };
  return null;
}

export async function applyEvent(d: SyncDeps, ev: RzpWebhookEvent): Promise<SyncResult> {
  const target = (HANDLED_EVENTS as readonly string[]).includes(ev.event) ? dispatchTarget(ev) : null;
  if (!target) return { outcome: 'ignored', reason: 'unhandled_event', entityId: '', userId: null, changes: [], granted: null, invoices: [] };
  if (target.kind === 'subscription') {
    // A charge carries its payment: record it (bound through the invoice), which also syncs the subscription.
    if (target.paymentId) {
      const pay = await syncPayment(d, target.paymentId);
      if (pay.outcome !== 'ignored') return { ...pay, entityId: target.id };
      return mergeResults(await syncSubscription(d, target.id), pay);
    }
    return syncSubscription(d, target.id);
  }
  if (target.kind === 'order') return syncOrder(d, target.id);
  return syncPayment(d, target.id);
}

export class WebhookProcessor {
  constructor(private readonly deps: WebhookDeps) {}

  get configured(): boolean {
    return Boolean(this.deps.razorpay && this.deps.secrets.length);
  }

  /** Entry point for the HTTP route: verify, parse, process. Never throws for bad input. */
  async handle(rawBody: Buffer, signature: unknown, eventIdHeader: unknown, log: WebhookLog): Promise<WebhookResponse> {
    if (!this.configured) return { status: 404, reason: 'not_configured' };
    if (signature === undefined) {
      log.warn({ security: true, event: 'webhook_signature_missing' }, 'security: webhook_signature_missing');
      return { status: 400, reason: 'signature_missing' };
    }
    const matched = verifyWebhookSignature(rawBody, signature, this.deps.secrets);
    if (matched === null) {
      log.warn({ security: true, event: 'webhook_signature_invalid', bytes: rawBody.length }, 'security: webhook_signature_invalid');
      return { status: 400, reason: 'signature_invalid' };
    }
    if (typeof eventIdHeader !== 'string' || !EVENT_ID.test(eventIdHeader)) return { status: 400, reason: 'event_id_invalid' };
    let json: unknown;
    try {
      json = JSON.parse(rawBody.toString('utf8'));
    } catch {
      return { status: 400, reason: 'body_invalid' };
    }
    const parsed = RzpWebhookEvent.safeParse(json);
    if (!parsed.success) return { status: 400, reason: 'body_invalid' };

    try {
      const out = await this.process(eventIdHeader, parsed.data, json);
      const level = out.outcome === 'rejected' ? 'warn' : 'info';
      const fields = { event: out.outcome === 'rejected' ? 'webhook_binding_rejected' : 'webhook_processed', eventId: eventIdHeader, type: parsed.data.event, outcome: out.outcome, duplicate: out.duplicate, reason: out.result?.reason ?? null, entityId: out.result?.entityId ?? null, secretIndex: matched };
      if (level === 'warn') log.warn({ security: true, ...fields }, 'security: webhook_binding_rejected');
      else log.info({ billing: true, ...fields }, 'razorpay webhook');
      return { status: 200, body: { received: true, duplicate: out.duplicate, outcome: out.outcome } };
    } catch (err) {
      if (err instanceof RazorpayApiError) {
        log.error({ billing: true, event: 'webhook_refetch_failed', eventId: eventIdHeader, type: parsed.data.event, status: err.status, code: err.code }, 'razorpay re-fetch failed; Razorpay will retry');
        return { status: 503, reason: 'razorpay_unavailable' };
      }
      throw err;
    }
  }

  /**
   * Exactly-once processing of one verified event. `record: false` (replay of an already recorded
   * event) re-applies it without a second webhook_events row.
   */
  async process(eventId: string, ev: RzpWebhookEvent, payload: unknown, opts: { record?: boolean } = {}): Promise<ProcessedEvent> {
    const razorpay = this.deps.razorpay;
    if (!razorpay) throw new Error('billing provider is not configured');
    const plans = await this.deps.plans();
    const now = new Date(this.deps.clock.now());
    const record = opts.record ?? true;
    const out = await this.deps.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtextextended(${`razorpay-webhook:${eventId}`}, 0))`);
      if (record) {
        const [dupe] = await tx
          .select({ outcome: webhookEvents.outcome })
          .from(webhookEvents)
          .where(and(eq(webhookEvents.provider, 'razorpay'), eq(webhookEvents.eventId, eventId)));
        if (dupe) return { duplicate: true, outcome: dupe.outcome, result: null } satisfies ProcessedEvent;
      }
      const result = await atomicSync(tx, (sp: Tx) => applyEvent({ tx: sp, razorpay, now, plans, invoicing: this.deps.invoicing?.(), log: this.deps.invoiceLog?.() }, ev));
      if (record)
        await tx.insert(webhookEvents).values({
          provider: 'razorpay',
          eventId,
          eventType: ev.event,
          payload: payload as Record<string, unknown>,
          eventCreatedAt: fromUnix(ev.created_at),
          processedAt: now,
          outcome: result.outcome,
          entityId: result.entityId || null,
          createdAt: now,
        });
      return { duplicate: false, outcome: result.outcome, result } satisfies ProcessedEvent;
    });
    if (out.result?.granted && this.deps.onGranted) await this.deps.onGranted(out.result.granted);
    if (out.result?.invoices?.length) this.deps.onInvoices?.(out.result.invoices);
    if (out.result?.completed?.length) this.deps.onCompleted?.(out.result.completed);
    return out;
  }
}
