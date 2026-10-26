/**
 * Maintenance jobs (ADR-003). Every handler deletes in bounded batches and is safe to re-run.
 *
 * - account.purge              PII.md step 2: hard-delete accounts anonymised more than
 *                              ACCOUNT.purgeAfterDays ago (`users.deleted_at`); FK cascades do the rest.
 * - account.purge-unconsented  AUTH-15: hard-delete student accounts that never reached consent
 *                              `granted` within UNCONSENTED_ACCOUNT_TTL_DAYS. Students only, see ADR-003.
 * - auth.sweep-verifications   PII.md: expired OTP/verification rows.
 * - auth.sweep-sessions        expired sessions (Better Auth also ignores them; this removes the rows).
 *
 * Cron expressions are UTC (GEN-6): 20:30 UTC = 02:00 IST, the quietest hour.
 */
import { sql, type SQL } from 'drizzle-orm';
import type { ConsentState, Database, Role } from '@soyl/db';
import { ACCOUNT, CONSENT } from '@soyl/shared/config/security';
import { defineJob, type JobContext, type JobDefinition, type JobQueueOptions } from './registry';

const DAY_MS = 86_400_000;

export const PURGE_BATCH_SIZE = 500;
export const SWEEP_BATCH_SIZE = 1000;

export interface DeleteResult {
  deleted: number;
}

/** `now - days`, exactly (no calendar arithmetic; timestamps are UTC instants). */
export function daysBefore(now: Date, days: number): Date {
  return new Date(now.getTime() - days * DAY_MS);
}

/**
 * Runs a `DELETE ... WHERE id IN (SELECT ... LIMIT n)` statement until a batch comes back short.
 * Each batch is its own statement (autocommit), so locks are short and progress survives a retry.
 */
export async function deleteInBatches(
  db: Database,
  batch: (limit: number) => SQL,
  batchSize: number,
  signal?: AbortSignal,
): Promise<number> {
  if (!Number.isInteger(batchSize) || batchSize < 1) throw new Error('batchSize must be a positive integer');
  let total = 0;
  for (;;) {
    signal?.throwIfAborted();
    const res = await db.execute(batch(batchSize));
    const n = res.rowCount ?? 0;
    total += n;
    if (n < batchSize) return total;
  }
}

/** Retries with backoff; one run at a time and at most one queued (`stately`), so missed crons don't pile up. */
const MAINTENANCE: JobQueueOptions = {
  policy: 'stately',
  retryLimit: 3,
  retryDelay: 60,
  retryBackoff: true,
  retryDelayMax: 3600,
  expireInSeconds: 30 * 60,
  // Keep finished jobs a week for diagnosis (job data is empty; output is a count).
  deleteAfterSeconds: 7 * 86_400,
};

/* ------------------------------------------------------------------------------------------------ */

export async function purgeDeletedAccounts(
  ctx: JobContext,
  opts: { purgeAfterDays?: number; batchSize?: number } = {},
): Promise<DeleteResult> {
  const cutoff = daysBefore(ctx.now, opts.purgeAfterDays ?? ACCOUNT.purgeAfterDays).toISOString();
  const deleted = await deleteInBatches(
    ctx.db,
    (limit) => sql`
      DELETE FROM users WHERE id IN (
        SELECT id FROM users
        WHERE deleted_at IS NOT NULL AND deleted_at < ${cutoff}::timestamptz
        ORDER BY id LIMIT ${limit}
        FOR UPDATE SKIP LOCKED)`,
    opts.batchSize ?? PURGE_BATCH_SIZE,
    ctx.signal,
  );
  return { deleted };
}

/** Consent states that mean the account reached `granted` at some point (AUTH-15 "never reach"). */
export const CONSENT_REACHED: readonly ConsentState[] = ['granted', 'revoked'];
/** AUTH-15 applies to these roles only (assumption pending OA-08/OA-14, ADR-003). */
export const UNCONSENTED_PURGE_ROLES: readonly Role[] = ['student'];

export async function purgeUnconsentedAccounts(
  ctx: JobContext,
  opts: { ttlDays?: number; batchSize?: number } = {},
): Promise<DeleteResult> {
  const cutoff = daysBefore(ctx.now, opts.ttlDays ?? CONSENT.unconsentedAccountTtlDays).toISOString();
  const roles = sql.join(UNCONSENTED_PURGE_ROLES.map((r) => sql`${r}`), sql`, `);
  const reached = sql.join(CONSENT_REACHED.map((s) => sql`${s}`), sql`, `);
  const deleted = await deleteInBatches(
    ctx.db,
    (limit) => sql`
      DELETE FROM users WHERE id IN (
        SELECT u.id FROM users u
        WHERE u.role IN (${roles})
          AND u.deleted_at IS NULL
          AND u.created_at < ${cutoff}::timestamptz
          AND NOT EXISTS (
            SELECT 1 FROM consent_status c WHERE c.user_id = u.id AND c.status IN (${reached}))
        ORDER BY u.id LIMIT ${limit}
        FOR UPDATE OF u SKIP LOCKED)`,
    opts.batchSize ?? PURGE_BATCH_SIZE,
    ctx.signal,
  );
  return { deleted };
}

export async function sweepExpiredVerifications(ctx: JobContext, opts: { batchSize?: number } = {}): Promise<DeleteResult> {
  const now = ctx.now.toISOString();
  const deleted = await deleteInBatches(
    ctx.db,
    (limit) => sql`
      DELETE FROM verifications WHERE id IN (
        SELECT id FROM verifications WHERE expires_at < ${now}::timestamptz
        ORDER BY id LIMIT ${limit} FOR UPDATE SKIP LOCKED)`,
    opts.batchSize ?? SWEEP_BATCH_SIZE,
    ctx.signal,
  );
  return { deleted };
}

export async function sweepExpiredSessions(ctx: JobContext, opts: { batchSize?: number } = {}): Promise<DeleteResult> {
  const now = ctx.now.toISOString();
  const deleted = await deleteInBatches(
    ctx.db,
    (limit) => sql`
      DELETE FROM sessions WHERE id IN (
        SELECT id FROM sessions WHERE expires_at < ${now}::timestamptz
        ORDER BY id LIMIT ${limit} FOR UPDATE SKIP LOCKED)`,
    opts.batchSize ?? SWEEP_BATCH_SIZE,
    ctx.signal,
  );
  return { deleted };
}

/* ------------------------------------------------------------------------------------------------ */

export const JOB_NAMES = {
  accountPurge: 'account.purge',
  accountPurgeUnconsented: 'account.purge-unconsented',
  sweepVerifications: 'auth.sweep-verifications',
  sweepSessions: 'auth.sweep-sessions',
} as const;

export interface JobSettings {
  unconsentedAccountTtlDays?: number;
}

/** Every job the worker runs. */
export function allJobs(settings: JobSettings = {}): JobDefinition[] {
  return [
    defineJob<unknown, DeleteResult>({
      name: JOB_NAMES.accountPurge,
      description: `Hard-delete accounts anonymised more than ${ACCOUNT.purgeAfterDays} days ago (PII.md)`,
      cron: '30 20 * * *',
      options: MAINTENANCE,
      handler: (ctx) => purgeDeletedAccounts(ctx),
    }),
    defineJob<unknown, DeleteResult>({
      name: JOB_NAMES.accountPurgeUnconsented,
      description: 'Hard-delete student accounts that never reached consent granted (AUTH-15)',
      cron: '45 20 * * *',
      options: MAINTENANCE,
      handler: (ctx) => purgeUnconsentedAccounts(ctx, { ttlDays: settings.unconsentedAccountTtlDays }),
    }),
    defineJob<unknown, DeleteResult>({
      name: JOB_NAMES.sweepVerifications,
      description: 'Delete expired verification (OTP) rows',
      cron: '15 * * * *',
      options: { ...MAINTENANCE, expireInSeconds: 10 * 60, deleteAfterSeconds: 86_400 },
      handler: (ctx) => sweepExpiredVerifications(ctx),
    }),
    defineJob<unknown, DeleteResult>({
      name: JOB_NAMES.sweepSessions,
      description: 'Delete expired sessions',
      cron: '0 21 * * *',
      options: MAINTENANCE,
      handler: (ctx) => sweepExpiredSessions(ctx),
    }),
  ] as JobDefinition[];
}
