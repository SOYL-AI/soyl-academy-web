/**
 * Content pipeline state (ARCHITECTURE §8.2): resumable per unit × stage × item, budget-capped.
 * Shapes agreed with pipeline-engineer (its StateStore). `pipeline_runs.id` is the pipeline's own
 * readable run id (e.g. r-20261026-101500-ab12), not a uuid — the one deliberate exception to the
 * uuid v7 convention, so CLI output, logs and rows use the same id.
 *
 * Spend: `content_budget_ledger` is append-only (one row per metered call batch); mock-provider spend
 * is recorded with `simulated = true` and excluded from the real total. The `content_budget` view
 * (migration 0002) compares real spend with config_values['CONTENT_BUDGET_INR'].
 */
import { sql } from 'drizzle-orm';
import { boolean, check, index, integer, jsonb, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { createdAt, id, meteredPaise, oneOf, timestamps, tstz } from './_shared';

export const PIPELINE_STAGES = ['outline', 'generate', 'lint', 'verify', 'originality', 'assemble', 'tts', 'publish'] as const;
export const PIPELINE_RUN_STATUSES = ['running', 'done', 'partial', 'failed', 'paused_budget'] as const;
export const PIPELINE_ITEM_STATUSES = ['pending', 'running', 'done', 'failed', 'paused', 'needs_review'] as const;
export const PIPELINE_PROVIDERS = ['mock', 'azure'] as const;

export const pipelineRuns = pgTable(
  'pipeline_runs',
  {
    id: text('id').primaryKey(),
    command: text('command').notNull(),
    provider: text('provider').notNull(),
    /** { board, class, subject, chapter } */
    scope: jsonb('scope').notNull().default(sql`'{}'::jsonb`),
    args: jsonb('args').notNull().default(sql`'{}'::jsonb`),
    status: text('status').notNull().default('running'),
    budgetCapPaise: meteredPaise('budget_cap_paise'),
    spentPaise: meteredPaise('spent_paise').notNull().default(0),
    /** Outstanding worst-case reservations of in-flight model calls (migration 0004). Reservations are made under a row lock on the running runs, so parallel runs share one cap. */
    reservedPaise: meteredPaise('reserved_paise').notNull().default(0),
    /** Pipeline run record extras: total cap, simulated flag, Batch items, counts, message (migration 0004). */
    detail: jsonb('detail').notNull().default(sql`'{}'::jsonb`),
    batchJobId: text('batch_job_id'),
    startedAt: tstz('started_at').notNull().defaultNow(),
    finishedAt: tstz('finished_at'),
    ...timestamps(),
  },
  (t) => [
    index('pipeline_runs_started_idx').on(t.startedAt),
    oneOf('pipeline_runs_status_check', t.status, PIPELINE_RUN_STATUSES),
    oneOf('pipeline_runs_provider_check', t.provider, PIPELINE_PROVIDERS),
  ],
);

export const pipelineUnitStatus = pgTable(
  'pipeline_unit_status',
  {
    id: id(),
    /** Chapter key. */
    unit: text('unit').notNull(),
    stage: text('stage').notNull(),
    status: text('status').notNull().default('pending'),
    attempts: integer('attempts').notNull().default(0),
    lastRunId: text('last_run_id').references(() => pipelineRuns.id, { onDelete: 'set null' }),
    error: text('error'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('pipeline_unit_status_unit_stage_unique').on(t.unit, t.stage),
    index('pipeline_unit_status_last_run_id_idx').on(t.lastRunId),
    index('pipeline_unit_status_stage_status_idx').on(t.stage, t.status),
    oneOf('pipeline_unit_status_stage_check', t.stage, PIPELINE_STAGES),
    oneOf('pipeline_unit_status_status_check', t.status, PIPELINE_ITEM_STATUSES),
  ],
);

export const pipelineItems = pgTable(
  'pipeline_items',
  {
    id: id(),
    unit: text('unit').notNull(),
    stage: text('stage').notNull(),
    /** e.g. deck.p1, notes, flashcards, questions.b2, cases */
    itemKey: text('item_key').notNull(),
    status: text('status').notNull().default('pending'),
    attempts: integer('attempts').notNull().default(0),
    /** Prompt template id@version (ARCHITECTURE §8.2). */
    template: text('template'),
    model: text('model'),
    inputTokens: integer('input_tokens').notNull().default(0),
    cachedInputTokens: integer('cached_input_tokens').notNull().default(0),
    outputTokens: integer('output_tokens').notNull().default(0),
    /** Any other usage fields the provider reports. */
    usage: jsonb('usage').notNull().default(sql`'{}'::jsonb`),
    costPaise: meteredPaise('cost_paise').notNull().default(0),
    /** Blob key or path of the stage output. */
    outputRef: text('output_ref'),
    /** Stage-specific detail, e.g. lint finding counts, verify flags (migration 0004). */
    detail: jsonb('detail').notNull().default(sql`'{}'::jsonb`),
    error: text('error'),
    lastRunId: text('last_run_id').references(() => pipelineRuns.id, { onDelete: 'set null' }),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('pipeline_items_unit_stage_item_unique').on(t.unit, t.stage, t.itemKey),
    index('pipeline_items_last_run_id_idx').on(t.lastRunId),
    index('pipeline_items_status_idx').on(t.stage, t.status),
    oneOf('pipeline_items_stage_check', t.stage, PIPELINE_STAGES),
    oneOf('pipeline_items_status_check', t.status, PIPELINE_ITEM_STATUSES),
  ],
);

/** Append-only spend ledger (no updated_at). */
export const contentBudgetLedger = pgTable(
  'content_budget_ledger',
  {
    id: id(),
    runId: text('run_id')
      .notNull()
      .references(() => pipelineRuns.id, { onDelete: 'restrict' }),
    provider: text('provider').notNull(),
    tier: text('tier').notNull(),
    model: text('model'),
    unit: text('unit'),
    stage: text('stage'),
    inputTokens: integer('input_tokens').notNull().default(0),
    cachedInputTokens: integer('cached_input_tokens').notNull().default(0),
    outputTokens: integer('output_tokens').notNull().default(0),
    costPaise: meteredPaise('cost_paise').notNull(),
    simulated: boolean('simulated').notNull(),
    createdAt: createdAt(),
  },
  (t) => [
    index('content_budget_ledger_run_id_idx').on(t.runId),
    index('content_budget_ledger_created_idx').on(t.createdAt),
    oneOf('content_budget_ledger_provider_check', t.provider, PIPELINE_PROVIDERS),
    check('content_budget_ledger_cost_check', sql`${t.costPaise} >= 0`),
    check('content_budget_ledger_simulated_check', sql`${t.provider} <> 'mock' OR ${t.simulated}`),
  ],
);
