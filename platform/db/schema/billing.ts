/**
 * Billing (ARCHITECTURE §11.2, CONTEXT §7). Amounts in integer paise. The client never decides
 * entitlement (AC-10): `entitlements` are written only by the webhook path or a server-side verified
 * payment. `webhook_events` is append-only for `soyl_app` (DB-1): insert the event in the same
 * transaction that applies its effects, so a failed processing rolls back and Razorpay retries.
 */
import { sql } from 'drizzle-orm';
import { boolean, check, index, integer, jsonb, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { PlanId } from '@soyl/shared/config/plans';
import { createdAt, id, oneOf, timestamps, tstz } from './_shared';
import { users } from './identity';

export const plans = pgTable(
  'plans',
  {
    id: id(),
    /** PlanId from platform/shared/config/plans.ts. */
    key: text('key').notNull().unique('plans_key_unique'),
    name: text('name').notNull(),
    creditsPerDay: integer('credits_per_day').notNull(),
    features: text('features').array().notNull().default(sql`'{}'::text[]`),
    /** [{ interval, amountPaise }] as in plans.ts. */
    prices: jsonb('prices').notNull().default(sql`'[]'::jsonb`),
    validUntil: tstz('valid_until'),
    displayOrder: integer('display_order').notNull().default(0),
    /** { monthly?: 'plan_...', yearly?: 'plan_...' } written by `billing sync-plans`. */
    razorpayPlanIds: jsonb('razorpay_plan_ids').notNull().default(sql`'{}'::jsonb`),
    active: boolean('active').notNull().default(true),
    syncedAt: tstz('synced_at'),
    ...timestamps(),
  },
  (t) => [oneOf('plans_key_check', t.key, PlanId.options), check('plans_credits_check', sql`${t.creditsPerDay} > 0`)],
);

export const SUBSCRIPTION_STATUSES = ['created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'completed', 'expired'] as const;

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: id(),
    /** Retained after account purge for tax records (PII.md): set null, not deleted. */
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    planId: uuid('plan_id')
      .notNull()
      .references(() => plans.id, { onDelete: 'restrict' }),
    interval: text('interval').notNull(),
    razorpaySubscriptionId: text('razorpay_subscription_id').notNull().unique('subscriptions_razorpay_id_unique'),
    /** The Razorpay plan the subscription was created on (binding check, AC-09; plans are immutable). Migration 0008_billing. */
    razorpayPlanId: text('razorpay_plan_id'),
    /** GST-inclusive price per period at creation, paise: every charge must equal it (AC-09). */
    amountPaise: integer('amount_paise'),
    /** Razorpay paid_count: successful charges so far. */
    paidCount: integer('paid_count').notNull().default(0),
    /** When Razorpay ended the subscription (cancelled/completed/halted→cancelled). */
    endedAt: tstz('ended_at'),
    status: text('status').notNull().default('created'),
    currentPeriodStart: tstz('current_period_start'),
    currentPeriodEnd: tstz('current_period_end'),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
    /** Entity timestamp of the last applied event: state precedence, not arrival order (AC-09). */
    lastEventAt: tstz('last_event_at'),
    ...timestamps(),
  },
  (t) => [
    index('subscriptions_user_id_idx').on(t.userId),
    index('subscriptions_plan_id_idx').on(t.planId),
    oneOf('subscriptions_status_check', t.status, SUBSCRIPTION_STATUSES),
    oneOf('subscriptions_interval_check', t.interval, ['monthly', 'yearly']),
    check('subscriptions_amount_check', sql`${t.amountPaise} IS NULL OR ${t.amountPaise} > 0`),
  ],
);

export const orders = pgTable(
  'orders',
  {
    id: id(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    planId: uuid('plan_id')
      .notNull()
      .references(() => plans.id, { onDelete: 'restrict' }),
    razorpayOrderId: text('razorpay_order_id').notNull().unique('orders_razorpay_id_unique'),
    receipt: text('receipt').notNull().unique('orders_receipt_unique'),
    amountPaise: integer('amount_paise').notNull(),
    currency: text('currency').notNull().default('INR'),
    status: text('status').notNull().default('created'),
    ...timestamps(),
  },
  (t) => [
    index('orders_user_id_idx').on(t.userId),
    index('orders_plan_id_idx').on(t.planId),
    oneOf('orders_status_check', t.status, ['created', 'attempted', 'paid', 'failed', 'expired']),
    check('orders_amount_check', sql`${t.amountPaise} > 0`),
  ],
);

export const payments = pgTable(
  'payments',
  {
    id: id(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    orderId: uuid('order_id').references(() => orders.id, { onDelete: 'restrict' }),
    subscriptionId: uuid('subscription_id').references(() => subscriptions.id, { onDelete: 'restrict' }),
    razorpayPaymentId: text('razorpay_payment_id').notNull().unique('payments_razorpay_id_unique'),
    amountPaise: integer('amount_paise').notNull(),
    currency: text('currency').notNull().default('INR'),
    status: text('status').notNull(),
    method: text('method'),
    capturedAt: tstz('captured_at'),
    refundedPaise: integer('refunded_paise').notNull().default(0),
    failureReason: text('failure_reason'),
    ...timestamps(),
  },
  (t) => [
    index('payments_user_id_idx').on(t.userId),
    index('payments_order_id_idx').on(t.orderId),
    index('payments_subscription_id_idx').on(t.subscriptionId),
    oneOf('payments_status_check', t.status, ['created', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded']),
    check('payments_amount_check', sql`${t.amountPaise} > 0 AND ${t.refundedPaise} >= 0 AND ${t.refundedPaise} <= ${t.amountPaise}`),
    check('payments_parent_check', sql`${t.orderId} IS NOT NULL OR ${t.subscriptionId} IS NOT NULL`),
  ],
);

export const ENTITLEMENT_SOURCES = ['subscription', 'order', 'admin', 'promo'] as const;

export const entitlements = pgTable(
  'entitlements',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    planId: uuid('plan_id')
      .notNull()
      .references(() => plans.id, { onDelete: 'restrict' }),
    source: text('source').notNull(),
    subscriptionId: uuid('subscription_id').references(() => subscriptions.id, { onDelete: 'set null' }),
    orderId: uuid('order_id').references(() => orders.id, { onDelete: 'set null' }),
    validFrom: tstz('valid_from').notNull(),
    validUntil: tstz('valid_until').notNull(),
    revokedAt: tstz('revoked_at'),
    ...timestamps(),
  },
  (t) => [
    index('entitlements_user_valid_idx').on(t.userId, t.validUntil),
    index('entitlements_plan_id_idx').on(t.planId),
    // One entitlement per subscription (extended each period) and per one-time order.
    uniqueIndex('entitlements_subscription_unique').on(t.subscriptionId),
    uniqueIndex('entitlements_order_unique').on(t.orderId),
    oneOf('entitlements_source_check', t.source, ENTITLEMENT_SOURCES),
    check('entitlements_window_check', sql`${t.validUntil} > ${t.validFrom}`),
    check(
      'entitlements_source_ref_check',
      sql`(${t.source} <> 'subscription' OR ${t.subscriptionId} IS NOT NULL) AND (${t.source} <> 'order' OR ${t.orderId} IS NOT NULL)`,
    ),
  ],
);

export const WEBHOOK_OUTCOMES = ['applied', 'ignored', 'rejected'] as const;
export type WebhookOutcome = (typeof WEBHOOK_OUTCOMES)[number];

/** DB-1 append-only; DB-2 UNIQUE (provider, event_id) (AC-09). */
export const webhookEvents = pgTable(
  'webhook_events',
  {
    id: id(),
    provider: text('provider').notNull().default('razorpay'),
    /** x-razorpay-event-id */
    eventId: text('event_id').notNull(),
    eventType: text('event_type').notNull(),
    payload: jsonb('payload').notNull(),
    /** Entity timestamp from the payload (state precedence). */
    eventCreatedAt: tstz('event_created_at'),
    processedAt: tstz('processed_at').notNull().defaultNow(),
    /**
     * What processing did (migration 0008_billing): applied (state written), ignored (not ours / no-op
     * event type), rejected (failed a binding check: security event). Written with processed_at in the
     * one INSERT at the end of the processing transaction, because the row is append-only (DB-1).
     */
    outcome: text('outcome').notNull().default('applied'),
    /** The Razorpay entity the event was about (sub_…, order_…, pay_…, rfnd_…): replay and incident lookups. */
    entityId: text('entity_id'),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex('webhook_events_provider_event_unique').on(t.provider, t.eventId),
    index('webhook_events_type_created_idx').on(t.eventType, t.createdAt),
    index('webhook_events_entity_idx').on(t.entityId),
    oneOf('webhook_events_outcome_check', t.outcome, WEBHOOK_OUTCOMES),
  ],
);

