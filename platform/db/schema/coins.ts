/**
 * SOYL Coins (D-037, ADR-021): an earn-only reward currency. Numbers and the store live in
 * platform/shared/config/coins.ts.
 *
 * `coin_ledger` is the source of truth and is append-only (soyl_app: SELECT, INSERT only; DB-1).
 * Amounts are signed balance deltas in coins:
 *
 *   kind     amount  meaning
 *   earn     >= 0    an award (0 = cut to nothing by the daily cap; still recorded so it is not paid again)
 *   redeem   < 0     coins held/spent for a store redemption
 *   refund   > 0     a cancelled or rejected redemption: returns exactly what its redeem took
 *   adjust   != 0    staff correction (audit-logged)
 *
 * Enforced by the database (migration 0011):
 * - UNIQUE idempotency_key: every award has a natural key (`checkin:<user>:<istDay>`,
 *   `milestone:<user>:solved_200`, `test:<user>:<testKey>`…) so retries and races never pay twice;
 * - balance never negative: trigger `soyl_coin_ledger_guard` locks the user's `coin_wallets` row,
 *   sums the ledger, refuses a row that would take it below 0 and writes `balance_after`;
 * - one redeem and at most one refund per redemption, and a refund returns exactly the redeem.
 */
import { sql } from 'drizzle-orm';
import { boolean, check, date, index, integer, jsonb, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { COIN_LEDGER_SOURCES, REDEMPTION_STATUSES } from '@soyl/shared/config/coins';
import { createdAt, id, oneOf, timestamps, tstz } from './_shared';
import { users } from './identity';

export const COIN_LEDGER_KINDS = ['earn', 'redeem', 'refund', 'adjust'] as const;
export type CoinLedgerKind = (typeof COIN_LEDGER_KINDS)[number];

/** Why a redemption ended without fulfilment (no free text: nothing personal). */
export const REDEMPTION_REASONS = ['student_cancelled', 'staff_rejected', 'address_timeout', 'account_deleted', 'out_of_stock'] as const;

/**
 * One row per student: the lock that serialises their coin writes (like credit_wallets), the daily
 * check-in streak and the equipped digital items. The balance is not stored here; it is the ledger sum.
 */
export const coinWallets = pgTable(
  'coin_wallets',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    checkinStreak: integer('checkin_streak').notNull().default(0),
    checkinLongest: integer('checkin_longest').notNull().default(0),
    lastCheckinIstDay: date('last_checkin_ist_day', { mode: 'string' }),
    /** Store item keys of the equipped digital items (must be owned; checked by the API). */
    equippedFrame: text('equipped_frame'),
    equippedTheme: text('equipped_theme'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('coin_wallets_user_unique').on(t.userId),
    check('coin_wallets_streak_check', sql`${t.checkinStreak} >= 0 AND ${t.checkinLongest} >= ${t.checkinStreak}`),
  ],
);

/**
 * Store redemptions. Digital: created `fulfilled`. Physical: requested → parent_approval_pending
 * (address received) → approved (staff review) → fulfilled (shipped), or cancelled / refunded.
 * The shipping address is AES-256-GCM encrypted (API key, never in the database), erased on
 * cancel/refund/account deletion and `COIN_STORE.addressRetentionDaysAfterFulfilment` after fulfilment.
 * `user_id` is detached (SET NULL) at the account purge so stock counts survive without personal data.
 */
export const coinRedemptions = pgTable(
  'coin_redemptions',
  {
    id: id(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    itemKey: text('item_key').notNull(),
    itemType: text('item_type').notNull(),
    priceCoins: integer('price_coins').notNull(),
    status: text('status').notNull(),
    statusReason: text('status_reason'),
    /** Encrypted shipping address (base64url iv.ciphertext.tag; associated data = redemption id). */
    addressEnc: text('address_enc'),
    addressSubmittedAt: tstz('address_submitted_at'),
    addressErasedAt: tstz('address_erased_at'),
    /** Staff who approved / fulfilled / rejected (detached when their account is purged). */
    reviewedBy: uuid('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
    approvedAt: tstz('approved_at'),
    fulfilledAt: tstz('fulfilled_at'),
    /** Courier tracking reference for a shipped item. */
    trackingRef: text('tracking_ref'),
    closedAt: tstz('closed_at'),
    ...timestamps(),
  },
  (t) => [
    index('coin_redemptions_user_created_idx').on(t.userId, t.createdAt),
    index('coin_redemptions_item_status_idx').on(t.itemKey, t.status),
    index('coin_redemptions_status_created_idx').on(t.status, t.createdAt),
    index('coin_redemptions_reviewed_by_idx').on(t.reviewedBy),
    oneOf('coin_redemptions_status_check', t.status, REDEMPTION_STATUSES),
    oneOf('coin_redemptions_item_type_check', t.itemType, ['digital', 'physical']),
    check('coin_redemptions_reason_check', sql`${t.statusReason} IS NULL OR ${t.statusReason} IN (${sql.raw(REDEMPTION_REASONS.map((r) => `'${r}'`).join(', '))})`),
    check('coin_redemptions_price_check', sql`${t.priceCoins} > 0`),
    check('coin_redemptions_digital_check', sql`${t.itemType} = 'physical' OR (${t.status} = 'fulfilled' AND ${t.addressEnc} IS NULL)`),
    check('coin_redemptions_tracking_check', sql`${t.trackingRef} IS NULL OR ${t.status} = 'fulfilled'`),
  ],
);

export const coinLedger = pgTable(
  'coin_ledger',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    source: text('source').notNull(),
    amount: integer('amount').notNull(),
    /** Natural key of the award or movement; unique, so nothing is written twice. */
    idempotencyKey: text('idempotency_key').notNull(),
    /** IST calendar day the row counts towards (daily cap, history). */
    istDay: date('ist_day', { mode: 'string' }).notNull(),
    /** Counts towards COIN_DAILY_CAP. */
    capped: boolean('capped').notNull().default(false),
    redemptionId: uuid('redemption_id').references(() => coinRedemptions.id),
    /** Written by the guard trigger: the balance after this row. */
    balanceAfter: integer('balance_after').notNull().default(0),
    /** Ids and numbers only (question key, test key, rank…), never personal data. */
    metadata: jsonb('metadata').notNull().default(sql`'{}'::jsonb`),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex('coin_ledger_idempotency_unique').on(t.idempotencyKey),
    uniqueIndex('coin_ledger_one_redeem').on(t.redemptionId).where(sql`${t.kind} = 'redeem'`),
    uniqueIndex('coin_ledger_one_refund').on(t.redemptionId).where(sql`${t.kind} = 'refund'`),
    index('coin_ledger_user_created_idx').on(t.userId, t.createdAt),
    index('coin_ledger_user_day_idx').on(t.userId, t.istDay),
    index('coin_ledger_user_source_idx').on(t.userId, t.source),
    oneOf('coin_ledger_kind_check', t.kind, COIN_LEDGER_KINDS),
    oneOf('coin_ledger_source_check', t.source, COIN_LEDGER_SOURCES),
    check(
      'coin_ledger_amount_sign_check',
      sql`(${t.kind} = 'earn' AND ${t.amount} >= 0)
       OR (${t.kind} = 'redeem' AND ${t.amount} < 0)
       OR (${t.kind} = 'refund' AND ${t.amount} > 0)
       OR (${t.kind} = 'adjust' AND ${t.amount} <> 0)`,
    ),
    check('coin_ledger_redemption_check', sql`(${t.kind} IN ('redeem', 'refund')) = (${t.redemptionId} IS NOT NULL)`),
    check('coin_ledger_source_kind_check', sql`(${t.kind} IN ('redeem', 'refund')) = (${t.source} = 'redemption') AND (${t.kind} = 'adjust') = (${t.source} = 'admin')`),
    check('coin_ledger_balance_after_check', sql`${t.balanceAfter} >= 0`),
  ],
);
