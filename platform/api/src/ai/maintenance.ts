/**
 * AI maintenance work run by the worker (ADR-013). Each function is idempotent and bounded.
 *
 * - sweepReservations   refund reservations past their TTL (AC-08) and close their ai_requests rows
 * - retention           ai_messages / ai_jobs older than 30 days, emptied conversations, expired uploads
 * - costGuardrail       per action, 7-day average real cost per charged request vs its credit price;
 *                       alert above COST_ALERT_RATIO (CONTEXT §6)
 */
import { and, inArray, lt, sql } from 'drizzle-orm';
import { aiJobs, aiRequests, type Database } from '@soyl/db';
import { AI_GATEWAY, COST_ALERT_RATIO, COST_ALERT_WINDOW_DAYS, CREDIT_VALUE_PAISE } from '@soyl/shared/config/credits';
import type { CreditService } from './credits';
import type { AlertSink } from './spend';
import type { UploadService } from './uploads';

const DAY = 86_400_000;

export async function sweepReservations(db: Database, credits: CreditService, now: Date) {
  const r = await credits.sweepExpired(now);
  if (r.requestIds.length)
    await db
      .update(aiRequests)
      .set({ status: 'failed', errorCode: 'reservation_expired', creditsCharged: 0, updatedAt: now })
      .where(and(inArray(aiRequests.requestId, r.requestIds), inArray(aiRequests.status, ['pending', 'streaming'])));
  return { refunded: r.refunded };
}

export async function retention(db: Database, uploadsSvc: UploadService, now: Date, batch = 1000) {
  const cutoff = new Date(now.getTime() - AI_GATEWAY.retentionDays * DAY);
  let messages = 0;
  for (;;) {
    const res = await db.execute(sql`DELETE FROM ai_messages WHERE id IN (SELECT id FROM ai_messages WHERE created_at < ${cutoff.toISOString()}::timestamptz ORDER BY id LIMIT ${batch})`);
    messages += res.rowCount ?? 0;
    if ((res.rowCount ?? 0) < batch) break;
  }
  // Conversations whose messages are all gone: the title may quote the student (PII.md).
  const convs = await db.execute(sql`
    DELETE FROM ai_conversations c WHERE c.updated_at < ${cutoff.toISOString()}::timestamptz
      AND NOT EXISTS (SELECT 1 FROM ai_messages m WHERE m.conversation_id = c.id)`);
  const jobs = await db.delete(aiJobs).where(and(lt(aiJobs.createdAt, cutoff), inArray(aiJobs.status, ['succeeded', 'failed']))).returning({ id: aiJobs.id });
  const up = await uploadsSvc.expireDue(now);
  return { messages, conversations: convs.rowCount ?? 0, jobs: jobs.length, uploads: up.expired };
}

export interface GuardrailRow {
  action: string;
  requests: number;
  avgCostPaise: number;
  avgPricePaise: number;
  ratio: number;
  alerted: boolean;
}

/** Below this many charged requests in the window an action is reported but never alerted on (noise). */
export const GUARDRAIL_MIN_REQUESTS = 10;

export async function costGuardrail(db: Database, alerts: AlertSink, now: Date): Promise<GuardrailRow[]> {
  const since = new Date(now.getTime() - COST_ALERT_WINDOW_DAYS * DAY).toISOString();
  const rows = await db.execute<{ action: string; requests: number; cost: string; credits: number }>(sql`
    SELECT action, count(*)::int AS requests, sum(cost_inr_paise)::text AS cost, sum(credits_charged)::int AS credits
    FROM ai_requests
    WHERE created_at >= ${since}::timestamptz AND created_at < ${now.toISOString()}::timestamptz AND coalesce(credits_charged, 0) > 0
    GROUP BY action ORDER BY action`);
  const out: GuardrailRow[] = [];
  for (const r of rows.rows) {
    const avgCost = Number(r.cost) / r.requests;
    const avgPrice = (r.credits * CREDIT_VALUE_PAISE) / r.requests;
    const ratio = avgPrice > 0 ? avgCost / avgPrice : Infinity;
    const alerted = r.requests >= GUARDRAIL_MIN_REQUESTS && ratio > COST_ALERT_RATIO;
    if (alerted)
      await alerts.emit({
        kind: 'cost_guardrail',
        severity: ratio >= 1 ? 'critical' : 'warning',
        message: `AI action "${r.action}" costs ${(ratio * 100).toFixed(0)}% of its credit price on average over ${COST_ALERT_WINDOW_DAYS} days (alert above ${COST_ALERT_RATIO * 100}%). Review the price or the model tier in ai-actions.ts.`,
        data: { action: r.action, requests: r.requests, avgCostPaise: Math.round(avgCost * 100) / 100, avgPricePaise: avgPrice, ratio: Math.round(ratio * 1000) / 1000 },
      });
    out.push({ action: r.action, requests: r.requests, avgCostPaise: avgCost, avgPricePaise: avgPrice, ratio, alerted });
  }
  return out;
}
