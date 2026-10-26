/**
 * Ops (ARCHITECTURE §6, §14, §15). `audit_log` is append-only for `soyl_app` (DB-1).
 * `analytics_events` is first-party and minimal (D-014): no user id, no device id, no free text —
 * aggregate counts only; per-user progress lives in the feature tables that need it.
 */
import { sql } from 'drizzle-orm';
import { boolean, date, index, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, oneOf, timestamps, tstz } from './_shared';
import { users } from './identity';
import { CONTENT_TYPES } from './content';

export const featureFlags = pgTable('feature_flags', {
  id: id(),
  key: text('key').notNull().unique('feature_flags_key_unique'),
  enabled: boolean('enabled').notNull().default(false),
  description: text('description'),
  /** Optional rollout rules, e.g. { roles: ['reviewer'] }. */
  rules: jsonb('rules').notNull().default(sql`'{}'::jsonb`),
  updatedByUserId: uuid('updated_by_user_id').references(() => users.id, { onDelete: 'set null' }),
  ...timestamps(),
}, (t) => [index('feature_flags_updated_by_user_id_idx').on(t.updatedByUserId)]);

/** Runtime-tunable config (prices stay in platform/shared/config; this holds operational values such as CONTENT_BUDGET_INR). */
export const configValues = pgTable('config_values', {
  id: id(),
  key: text('key').notNull().unique('config_values_key_unique'),
  value: jsonb('value').notNull(),
  description: text('description'),
  updatedByUserId: uuid('updated_by_user_id').references(() => users.id, { onDelete: 'set null' }),
  ...timestamps(),
}, (t) => [index('config_values_updated_by_user_id_idx').on(t.updatedByUserId)]);

/** Admin and security-relevant actions (ARCHITECTURE §15). Append-only: no updated_at. */
export const auditLog = pgTable(
  'audit_log',
  {
    id: id(),
    /** Null for system actions and after the actor's account is purged. */
    actorUserId: uuid('actor_user_id').references(() => users.id, { onDelete: 'set null' }),
    actorRole: text('actor_role'),
    action: text('action').notNull(),
    targetType: text('target_type'),
    targetId: text('target_id'),
    /** Changed fields only; never personal data beyond ids (DB-8). */
    before: jsonb('before'),
    after: jsonb('after'),
    requestId: text('request_id'),
    createdAt: createdAt(),
  },
  (t) => [
    index('audit_log_actor_created_idx').on(t.actorUserId, t.createdAt),
    index('audit_log_target_idx').on(t.targetType, t.targetId),
    index('audit_log_created_idx').on(t.createdAt),
  ],
);

export const analyticsEvents = pgTable(
  'analytics_events',
  {
    id: id(),
    name: text('name').notNull(),
    /** Low-cardinality dimensions only (board, class, subject, route group). No PII, no user/device ids. */
    props: jsonb('props').notNull().default(sql`'{}'::jsonb`),
    istDay: date('ist_day', { mode: 'string' }).notNull(),
    createdAt: createdAt(),
  },
  (t) => [index('analytics_events_name_day_idx').on(t.name, t.istDay)],
);

export const REPORT_CATEGORIES = ['wrong_answer', 'wrong_content', 'typo', 'rendering', 'audio', 'inappropriate', 'other'] as const;

/** "Report a mistake" (CONTEXT §4): Wave 1 reports are fixed within 24 hours. */
export const contentReports = pgTable(
  'content_reports',
  {
    id: id(),
    /** Null when a guest reported. */
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    contentType: text('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    unit: text('unit').notNull(),
    /** Slide id, card id or child question id inside the item. */
    itemRef: text('item_ref'),
    category: text('category').notNull(),
    message: text('message'),
    status: text('status').notNull().default('open'),
    resolvedByUserId: uuid('resolved_by_user_id').references(() => users.id, { onDelete: 'set null' }),
    resolvedAt: tstz('resolved_at'),
    resolution: text('resolution'),
    ...timestamps(),
  },
  (t) => [
    index('content_reports_status_created_idx').on(t.status, t.createdAt),
    index('content_reports_content_idx').on(t.contentType, t.contentId),
    index('content_reports_unit_idx').on(t.unit),
    index('content_reports_user_id_idx').on(t.userId),
    index('content_reports_resolved_by_user_id_idx').on(t.resolvedByUserId),
    oneOf('content_reports_type_check', t.contentType, CONTENT_TYPES),
    oneOf('content_reports_category_check', t.category, REPORT_CATEGORIES),
    oneOf('content_reports_status_check', t.status, ['open', 'triaged', 'fixed', 'rejected', 'duplicate']),
  ],
);
