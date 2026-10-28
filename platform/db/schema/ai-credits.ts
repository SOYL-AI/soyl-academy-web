/**
 * AI and credits (ARCHITECTURE §6, §10, §11.1; CONTEXT §6).
 *
 * `credit_ledger` is the source of truth for credits and is append-only: the `soyl_app` role has
 * INSERT and SELECT only (DB-1); corrections are new rows. Amounts are signed balance deltas in
 * credits (1 credit = 10 paise, platform/shared/config/credits.ts):
 *
 *   kind     amount  meaning
 *   grant    > 0     credits added (action 'daily_grant' | 'plan_topup' | 'admin_adjustment')
 *   reserve  < 0     the quoted price held when an AI action starts
 *   charge   >= 0    settles a reservation as spent; amount = unused part returned (0 = full quote spent)
 *   refund   > 0     settles a reservation as failed; returns exactly the reserved credits
 *   expire   < 0     unused credits removed at the end of an IST day (no rollover)
 *   bonus_goal   > 0  0015, D-044: bonus for meeting the daily practice goal (action 'daily_practice_goal')
 *   bonus_streak > 0  0015, D-044: bonus on a 7-day streak milestone (action 'streak_milestone')
 *
 * Today's balance = SUM(amount) WHERE user_id = ? AND ist_day = today (IST, GEN-6).
 *
 * DB-2 / AC-07 / AC-08, enforced by the database:
 * - one daily grant per user per IST day;
 * - one bonus row per rule (kind) per user per IST day (0015: idempotent under concurrent triggers);
 * - UNIQUE (kind, request_id): a reserve, charge or refund for one AI request cannot be written twice;
 * - one resolution per reservation: a request gets a charge OR a refund, never both;
 * - a charge/refund needs a reserve for the same request and user, and cannot return more than it held
 *   (trigger `soyl_credit_ledger_settlement_check`, migration 0002).
 */
import { sql } from 'drizzle-orm';
import { boolean, check, date, index, integer, jsonb, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, meteredPaise, oneOf, timestamps, tstz } from './_shared';
import { chapters } from './catalog';
import { users } from './identity';
import { CREDIT_BONUS_KINDS } from '@soyl/shared/config/credit-bonuses';

export const LEDGER_KINDS = ['grant', 'reserve', 'charge', 'refund', 'expire', ...CREDIT_BONUS_KINDS] as const;
export type LedgerKind = (typeof LEDGER_KINDS)[number];
export const GRANT_ACTIONS = ['daily_grant', 'plan_topup', 'admin_adjustment'] as const;

export const creditLedger = pgTable(
  'credit_ledger',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    amount: integer('amount').notNull(),
    /** AI action id for reserve/charge/refund; grant reason for grants; 'day_end' for expiry. */
    action: text('action').notNull(),
    /** Idempotency key shared by the reserve and its charge/refund (client Idempotency-Key → request_id). */
    requestId: text('request_id'),
    /** IST calendar day the row counts towards (for charge/refund: the reservation's day). */
    istDay: date('ist_day', { mode: 'string' }).notNull(),
    /** Reserve only: when the sweeper may refund it (RESERVATION_TTL_SECONDS). */
    reservationExpiresAt: tstz('reservation_expires_at'),
    planId: text('plan_id'),
    metadata: jsonb('metadata').notNull().default(sql`'{}'::jsonb`),
    createdAt: createdAt(),
  },
  (t) => [
    oneOf('credit_ledger_kind_check', t.kind, LEDGER_KINDS),
    check(
      'credit_ledger_amount_sign_check',
      sql`(${t.kind} = 'grant' AND ${t.amount} > 0)
       OR (${t.kind} = 'reserve' AND ${t.amount} < 0)
       OR (${t.kind} = 'charge' AND ${t.amount} >= 0)
       OR (${t.kind} = 'refund' AND ${t.amount} > 0)
       OR (${t.kind} = 'expire' AND ${t.amount} < 0)
       OR (${t.kind} IN ('bonus_goal', 'bonus_streak') AND ${t.amount} > 0)`,
    ),
    check(
      'credit_ledger_request_id_check',
      sql`${t.kind} NOT IN ('reserve', 'charge', 'refund') OR ${t.requestId} IS NOT NULL`,
    ),
    check('credit_ledger_reservation_ttl_check', sql`(${t.kind} = 'reserve') = (${t.reservationExpiresAt} IS NOT NULL)`),
    uniqueIndex('credit_ledger_kind_request_unique').on(t.kind, t.requestId),
    uniqueIndex('credit_ledger_one_daily_grant')
      .on(t.userId, t.istDay)
      .where(sql`${t.kind} = 'grant' AND ${t.action} = 'daily_grant'`),
    uniqueIndex('credit_ledger_one_expiry_per_day').on(t.userId, t.istDay).where(sql`${t.kind} = 'expire'`),
    // 0015 (D-044): at most one bonus per rule per user per IST day.
    uniqueIndex('credit_ledger_one_bonus_per_day').on(t.userId, t.istDay, t.kind).where(sql`${t.kind} IN ('bonus_goal', 'bonus_streak')`),
    uniqueIndex('credit_ledger_one_resolution').on(t.requestId).where(sql`${t.kind} IN ('charge', 'refund')`),
    // ARCHITECTURE §6 hot lookup
    index('credit_ledger_user_created_idx').on(t.userId, t.createdAt),
    index('credit_ledger_user_day_idx').on(t.userId, t.istDay),
    // 0014 (D-045 admin analytics): credits granted/spent/refunded per IST day across users.
    index('credit_ledger_day_kind_idx').on(t.istDay, t.kind),
    // Sweeper: open reservations by expiry
    index('credit_ledger_reservation_expiry_idx').on(t.reservationExpiresAt).where(sql`${t.kind} = 'reserve'`),
  ],
);

export const AI_REQUEST_STATUSES = ['pending', 'streaming', 'succeeded', 'failed', 'moderated', 'refused', 'cancelled'] as const;

export const AI_CONVERSATION_KINDS = ['tutor', 'photo_doubt', 'explain_slide', 'evaluation', 'paper_from_upload'] as const;

export const aiConversations = pgTable(
  'ai_conversations',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    chapterId: uuid('chapter_id').references(() => chapters.id, { onDelete: 'set null' }),
    title: text('title'),
    lastMessageAt: tstz('last_message_at'),
    ...timestamps(),
  },
  (t) => [
    index('ai_conversations_user_created_idx').on(t.userId, t.createdAt),
    index('ai_conversations_chapter_id_idx').on(t.chapterId),
    oneOf('ai_conversations_kind_check', t.kind, AI_CONVERSATION_KINDS),
  ],
);

export const UPLOAD_KINDS = ['sample_paper', 'photo_doubt', 'answer_sheet'] as const;
export const UPLOAD_STATUSES = ['pending_upload', 'uploaded', 'scanning', 'ready', 'rejected', 'expired', 'deleted'] as const;
export const UPLOAD_MAX_BYTES = 10 * 1024 * 1024;

/** Images/PDFs ≤ 10 MB in Blob with a 30-day expiry; never republished or added to the bank (ARCHITECTURE §10). */
export const uploads = pgTable(
  'uploads',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    blobKey: text('blob_key').notNull().unique('uploads_blob_key_unique'),
    contentType: text('content_type').notNull(),
    bytes: integer('bytes'),
    pages: integer('pages'),
    sha256: text('sha256'),
    status: text('status').notNull().default('pending_upload'),
    rejectReason: text('reject_reason'),
    expiresAt: tstz('expires_at').notNull(),
    /** Migration 0008: the cleaned derivative (re-encoded, metadata stripped) in the `uploads` container. */
    processedKey: text('processed_key'),
    processedContentType: text('processed_content_type'),
    ...timestamps(),
  },
  (t) => [
    index('uploads_user_created_idx').on(t.userId, t.createdAt),
    index('uploads_expires_at_idx').on(t.expiresAt),
    oneOf('uploads_kind_check', t.kind, UPLOAD_KINDS),
    oneOf('uploads_status_check', t.status, UPLOAD_STATUSES),
    check('uploads_bytes_check', sql`${t.bytes} IS NULL OR (${t.bytes} > 0 AND ${t.bytes} <= ${sql.raw(String(UPLOAD_MAX_BYTES))})`),
  ],
);

/** One row per model call made for a user (ARCHITECTURE §10). Prompts/outputs are not stored here. */
export const aiRequests = pgTable(
  'ai_requests',
  {
    id: id(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    /** Same value as credit_ledger.request_id for this action. */
    requestId: text('request_id').notNull().unique('ai_requests_request_id_unique'),
    action: text('action').notNull(),
    modelTier: text('model_tier').notNull(),
    model: text('model').notNull(),
    status: text('status').notNull().default('pending'),
    conversationId: uuid('conversation_id').references(() => aiConversations.id, { onDelete: 'set null' }),
    inputTokens: integer('input_tokens').notNull().default(0),
    cachedInputTokens: integer('cached_input_tokens').notNull().default(0),
    outputTokens: integer('output_tokens').notNull().default(0),
    reasoningTokens: integer('reasoning_tokens').notNull().default(0),
    /** Metered real cost in paise (4 dp). */
    costInrPaise: meteredPaise('cost_inr_paise').notNull().default(0),
    creditsQuoted: integer('credits_quoted'),
    creditsCharged: integer('credits_charged'),
    latencyMs: integer('latency_ms'),
    firstTokenMs: integer('first_token_ms'),
    /** Content Safety results for input and output: { input: {...}, output: {...} }. */
    moderationFlags: jsonb('moderation_flags').notNull().default(sql`'{}'::jsonb`),
    errorCode: text('error_code'),
    /** Migration 0008 (ai-gateway M4): the student's plan when the request ran (free-tier spend budget, D-015). */
    planId: text('plan_id'),
    /** 0008: the spend breaker moved this request to a smaller tier. */
    degraded: boolean('degraded').notNull().default(false),
    /** 0008: the mock provider answered (cost is what the call would have cost). */
    simulated: boolean('simulated').notNull().default(false),
    ...timestamps(),
  },
  (t) => [
    index('ai_requests_user_created_idx').on(t.userId, t.createdAt),
    index('ai_requests_conversation_id_idx').on(t.conversationId),
    // Spend circuit-breaker and the 7-day cost guardrail (CONTEXT §6)
    index('ai_requests_created_idx').on(t.createdAt),
    index('ai_requests_action_created_idx').on(t.action, t.createdAt),
    oneOf('ai_requests_status_check', t.status, AI_REQUEST_STATUSES),
    check('ai_requests_tokens_check', sql`${t.inputTokens} >= 0 AND ${t.cachedInputTokens} >= 0 AND ${t.outputTokens} >= 0`),
  ],
);

export const aiMessages = pgTable(
  'ai_messages',
  {
    id: id(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => aiConversations.id, { onDelete: 'cascade' }),
    role: text('role').notNull(),
    content: text('content').notNull(),
    aiRequestId: uuid('ai_request_id').references(() => aiRequests.id, { onDelete: 'set null' }),
    uploadId: uuid('upload_id').references(() => uploads.id, { onDelete: 'set null' }),
    moderationFlags: jsonb('moderation_flags').notNull().default(sql`'{}'::jsonb`),
    ...timestamps(),
  },
  (t) => [
    index('ai_messages_conversation_created_idx').on(t.conversationId, t.createdAt),
    index('ai_messages_ai_request_id_idx').on(t.aiRequestId),
    index('ai_messages_upload_id_idx').on(t.uploadId),
    // Retention purge (30 days, ARCHITECTURE §10)
    index('ai_messages_created_idx').on(t.createdAt),
    oneOf('ai_messages_role_check', t.role, ['user', 'assistant']),
  ],
);

