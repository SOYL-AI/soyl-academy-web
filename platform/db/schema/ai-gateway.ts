/**
 * AI gateway state (ai-gateway M4, migration 0008; ARCHITECTURE §10–11.1, ADR-013).
 *
 * - `credit_wallets`: one row per student, the row every credit operation locks (`SELECT … FOR
 *   UPDATE`) so the lazy daily grant, the balance check and the reserve are one serialised step
 *   (AC-07). The ledger stays the source of truth; the wallet holds no balance.
 * - `ai_spend_daily`: metered INR spend per IST day for the spend circuit-breaker: scope `all` (the
 *   global AI_DAILY_SPEND_CAP_INR) and `free` (the free-tier sub-budget, D-015). `alert_level` is the
 *   number of alert thresholds already announced that day, so each fires once.
 * - `ai_jobs`: queued AI work that is not a live stream (answer/paper evaluation, paper-from-upload,
 *   upload processing). The API starts a job at once; the worker's `ai.jobs` sweep picks up anything
 *   queued or abandoned (expired lock). Payloads and results are deleted after 30 days.
 */
import { sql } from 'drizzle-orm';
import { check, date, index, integer, jsonb, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, meteredPaise, oneOf, timestamps, tstz } from './_shared';
import { users } from './identity';

export const creditWallets = pgTable(
  'credit_wallets',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    /** Plan used for the most recent daily grant (diagnostics; entitlements decide the plan). */
    planId: text('plan_id').notNull().default('free'),
    /** IST day of the most recent daily grant. */
    lastGrantDay: date('last_grant_day', { mode: 'string' }),
    ...timestamps(),
  },
  (t) => [uniqueIndex('credit_wallets_user_unique').on(t.userId)],
);

export const AI_SPEND_SCOPES = ['all', 'free'] as const;
export type AiSpendScope = (typeof AI_SPEND_SCOPES)[number];

export const aiSpendDaily = pgTable(
  'ai_spend_daily',
  {
    id: id(),
    istDay: date('ist_day', { mode: 'string' }).notNull(),
    scope: text('scope').notNull(),
    spentPaise: meteredPaise('spent_paise').notNull().default(0),
    requests: integer('requests').notNull().default(0),
    /** How many of AI_SPEND.alertThresholds were already announced for this day and scope. */
    alertLevel: smallint('alert_level').notNull().default(0),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('ai_spend_daily_day_scope_unique').on(t.istDay, t.scope),
    oneOf('ai_spend_daily_scope_check', t.scope, AI_SPEND_SCOPES),
    check('ai_spend_daily_values_check', sql`${t.spentPaise} >= 0 AND ${t.requests} >= 0 AND ${t.alertLevel} >= 0`),
  ],
);

export const AI_JOB_KINDS = ['evaluation', 'paper_from_upload', 'upload_process'] as const;
export type AiJobKind = (typeof AI_JOB_KINDS)[number];
export const AI_JOB_STATUSES = ['queued', 'running', 'succeeded', 'failed'] as const;
export type AiJobStatus = (typeof AI_JOB_STATUSES)[number];

export const aiJobs = pgTable(
  'ai_jobs',
  {
    id: id(),
    kind: text('kind').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    /** The credit request (credit_ledger.request_id) this job settles; null for free work (upload processing). */
    requestId: text('request_id'),
    action: text('action'),
    status: text('status').notNull().default('queued'),
    /** Ids and parameters only (attempt, items, upload, subject); no student text. */
    payload: jsonb('payload').notNull().default(sql`'{}'::jsonb`),
    result: jsonb('result'),
    errorCode: text('error_code'),
    attempts: integer('attempts').notNull().default(0),
    /** A running job whose lock expired is picked up again by the sweep. */
    lockedUntil: tstz('locked_until'),
    runAfter: tstz('run_after').notNull().defaultNow(),
    finishedAt: tstz('finished_at'),
    ...timestamps(),
  },
  (t) => [
    index('ai_jobs_user_created_idx').on(t.userId, t.createdAt),
    index('ai_jobs_status_run_after_idx').on(t.status, t.runAfter),
    uniqueIndex('ai_jobs_request_id_unique').on(t.requestId),
    oneOf('ai_jobs_kind_check', t.kind, AI_JOB_KINDS),
    oneOf('ai_jobs_status_check', t.status, AI_JOB_STATUSES),
    check('ai_jobs_attempts_check', sql`${t.attempts} >= 0`),
  ],
);
