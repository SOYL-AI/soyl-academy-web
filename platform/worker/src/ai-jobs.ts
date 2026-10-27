/**
 * AI gateway jobs (ai-gateway M4, ADR-013). Same code as the API (`@soyl/api/ai/*`), run on a schedule:
 *
 * - ai.jobs                    every minute: queued or abandoned AI jobs (evaluation, paper-from-upload,
 *                              upload processing). The API starts jobs at once; this is the safety net.
 * - credits.sweep-reservations every 5 minutes: refund reservations past their TTL (AC-08); close their
 *                              ai_requests rows.
 * - ai.index-content           hourly: (re)index published content for tutor retrieval (chunks + FTS,
 *                              embeddings where pgvector and an embedder exist). Unchanged items are skipped.
 * - ai.retention               daily 02:30 IST: ai_messages/ai_jobs older than 30 days, emptied conversations,
 *                              expired uploads and their blobs (ARCHITECTURE §10, §15).
 * - ai.cost-guardrail          daily 09:00 IST: 7-day real cost per action vs credit price (CONTEXT §6) and
 *                              the ledger invariants (no negative balance, every reserve resolved).
 *
 * Crons are UTC (GEN-6).
 */
import { chaptersToIndex, indexChapter } from '@soyl/api/ai/retrieval';
import { costGuardrail, retention, sweepReservations, type GuardrailRow } from '@soyl/api/ai/maintenance';
import { ledgerInvariants } from '@soyl/api/ai/credits';
import { createAiWorker, type AiWorkerSettings } from '@soyl/api/ai/worker';
import type { MinimalLogger } from '@soyl/api/ai/spend';
import { defineJob, type JobContext, type JobDefinition, type JobQueueOptions } from './registry';
import type { Logger } from './logger';

export const AI_JOB_NAMES = {
  jobs: 'ai.jobs',
  sweepReservations: 'credits.sweep-reservations',
  indexContent: 'ai.index-content',
  retention: 'ai.retention',
  costGuardrail: 'ai.cost-guardrail',
} as const;

/** Frequent, short sweeps: one at a time, never piling up. */
const SWEEP: JobQueueOptions = { policy: 'stately', retryLimit: 2, retryDelay: 15, retryBackoff: false, expireInSeconds: 10 * 60, deleteAfterSeconds: 86_400 };
const DAILY: JobQueueOptions = { policy: 'stately', retryLimit: 3, retryDelay: 60, retryBackoff: true, retryDelayMax: 3600, expireInSeconds: 30 * 60, deleteAfterSeconds: 7 * 86_400 };

/** The worker's logger (msg first) as the API's (object first). */
export function asMinimalLogger(log: Logger): MinimalLogger {
  return {
    info: (o, m) => log.info(m ?? 'ai', o as Record<string, unknown>),
    warn: (o, m) => log.warn(m ?? 'ai', o as Record<string, unknown>),
    error: (o, m) => log.error(m ?? 'ai', o as Record<string, unknown>),
  };
}

export function aiJobs(settings: AiWorkerSettings = {}): JobDefinition[] {
  const ai = createAiWorker(settings);
  const services = async (ctx: JobContext) => {
    await ai.init();
    return ai.services(ctx.db, ctx.now, asMinimalLogger(ctx.log));
  };
  const year = settings.academicYear ?? (settings.env ?? process.env).ACADEMIC_YEAR ?? '2026-27';
  return [
    defineJob<unknown, { ran: number }>({
      name: AI_JOB_NAMES.jobs,
      description: 'Run queued or abandoned AI jobs (evaluation, paper-from-upload, upload processing)',
      cron: '* * * * *',
      options: SWEEP,
      handler: async (ctx) => (await services(ctx)).jobs.runDue(50),
    }),
    defineJob<unknown, { refunded: number }>({
      name: AI_JOB_NAMES.sweepReservations,
      description: 'Refund AI credit reservations past their TTL (AC-08)',
      cron: '*/5 * * * *',
      options: SWEEP,
      handler: async (ctx) => sweepReservations(ctx.db, (await services(ctx)).credits, ctx.now),
    }),
    defineJob<unknown, { chapters: number; inserted: number; removed: number; embedded: number; failed: number }>({
      name: AI_JOB_NAMES.indexContent,
      description: 'Index published content for tutor retrieval (FTS; embeddings where pgvector exists)',
      cron: '20 * * * *',
      options: { ...DAILY, expireInSeconds: 50 * 60 },
      handler: async (ctx) => indexAll(ctx, (await services(ctx)).runtime.embedder, year),
    }),
    defineJob<unknown, Awaited<ReturnType<typeof retention>>>({
      name: AI_JOB_NAMES.retention,
      description: 'Delete AI messages, jobs and uploads older than 30 days',
      cron: '0 21 * * *',
      options: DAILY,
      handler: async (ctx) => retention(ctx.db, (await services(ctx)).uploads, ctx.now),
    }),
    defineJob<unknown, { actions: GuardrailRow[]; alerts: number; invariants: Awaited<ReturnType<typeof ledgerInvariants>> }>({
      name: AI_JOB_NAMES.costGuardrail,
      description: '7-day AI cost per action vs its credit price (CONTEXT §6) and ledger invariants',
      cron: '30 3 * * *',
      options: DAILY,
      handler: async (ctx) => guardrail(ctx, await services(ctx)),
    }),
  ] as JobDefinition[];
}

export async function indexAll(ctx: JobContext, embedder: Parameters<typeof indexChapter>[3], year: string) {
  const keys = await chaptersToIndex(ctx.db, year);
  const out = { chapters: keys.length, inserted: 0, removed: 0, embedded: 0, failed: 0 };
  for (const key of keys) {
    ctx.signal?.throwIfAborted();
    try {
      const r = await indexChapter(ctx.db, key, year, embedder);
      out.inserted += r.inserted;
      out.removed += r.removed;
      out.embedded += r.embedded;
    } catch (err) {
      out.failed++;
      ctx.log.warn('indexing a chapter failed', { chapter: key, err: (err as Error).message });
    }
  }
  return out;
}

async function guardrail(ctx: JobContext, s: Awaited<ReturnType<ReturnType<typeof createAiWorker>['services']>>) {
  const actions = await costGuardrail(ctx.db, { emit: (a) => s.runtime.alerts.emit(a) }, ctx.now);
  // Reservations get 2 h (longest action TTL) + one sweep interval before they count as unresolved.
  const invariants = await ledgerInvariants(ctx.db, ctx.now, 2 * 3600 + 600);
  if (invariants.negativeBalances.length || invariants.unresolvedExpired || invariants.doubleResolved)
    await s.runtime.alerts.emit({
      kind: 'invariant',
      severity: 'critical',
      message: 'Credit ledger invariant violated (negative balance, unresolved reservation or double settlement).',
      data: { negative: invariants.negativeBalances.length, unresolved: invariants.unresolvedExpired, doubleResolved: invariants.doubleResolved },
    });
  return { actions, alerts: actions.filter((a) => a.alerted).length, invariants };
}
