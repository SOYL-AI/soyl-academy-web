/**
 * Gamification (ARCHITECTURE §12, CONTEXT §11). Days are IST calendar days (GEN-6). Live leaderboards
 * are Redis sorted sets; `leaderboard_snapshots` keeps the weekly snapshot with opaque per-week
 * handles, never user ids (AC-18). D-014: leagues/leaderboards are off until consent is `granted`.
 */
import { sql } from 'drizzle-orm';
import { check, date, index, integer, jsonb, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, oneOf, timestamps, tstz } from './_shared';
import { users } from './identity';

export const XP_KINDS = ['lesson_completed', 'practice', 'test_submitted', 'streak_bonus', 'badge', 'live_event'] as const;
export const LEAGUE_SCOPES = ['class', 'school', 'city'] as const;

export const xpEvents = pgTable(
  'xp_events',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    amount: integer('amount').notNull(),
    /** What earned it (e.g. 'deck', deck id): makes awarding idempotent. */
    sourceType: text('source_type').notNull(),
    sourceId: text('source_id').notNull(),
    istDay: date('ist_day', { mode: 'string' }).notNull(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('xp_events_idempotency_unique').on(t.userId, t.kind, t.sourceType, t.sourceId),
    index('xp_events_user_created_idx').on(t.userId, t.createdAt),
    index('xp_events_user_day_idx').on(t.userId, t.istDay),
    oneOf('xp_events_kind_check', t.kind, XP_KINDS),
    check('xp_events_amount_check', sql`${t.amount} > 0`),
  ],
);

export const streaks = pgTable(
  'streaks',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .unique('streaks_user_id_unique')
      .references(() => users.id, { onDelete: 'cascade' }),
    currentDays: integer('current_days').notNull().default(0),
    longestDays: integer('longest_days').notNull().default(0),
    lastActiveIstDay: date('last_active_ist_day', { mode: 'string' }),
    /** One streak freeze per week (ARCHITECTURE §12): IST Monday of the week the freeze was used. */
    freezeUsedWeek: date('freeze_used_week', { mode: 'string' }),
    totalXp: integer('total_xp').notNull().default(0),
    level: integer('level').notNull().default(1),
    ...timestamps(),
  },
  (t) => [check('streaks_days_check', sql`${t.currentDays} >= 0 AND ${t.longestDays} >= ${t.currentDays}`)],
);

export const badges = pgTable('badges', {
  id: id(),
  key: text('key').notNull().unique('badges_key_unique'),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon'),
  criteria: jsonb('criteria').notNull().default(sql`'{}'::jsonb`),
  ...timestamps(),
});

export const userBadges = pgTable(
  'user_badges',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    badgeId: uuid('badge_id')
      .notNull()
      .references(() => badges.id, { onDelete: 'cascade' }),
    awardedAt: tstz('awarded_at').notNull().defaultNow(),
    ...timestamps(),
  },
  (t) => [uniqueIndex('user_badges_user_badge_unique').on(t.userId, t.badgeId), index('user_badges_badge_id_idx').on(t.badgeId)],
);

export const leagueMemberships = pgTable(
  'league_memberships',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    /** IST Monday of the league week. */
    weekStart: date('week_start', { mode: 'string' }).notNull(),
    scope: text('scope').notNull(),
    /** e.g. 'cbse-10' for class, school id, city slug. School/city leagues are opt-in. */
    scopeKey: text('scope_key').notNull(),
    xp: integer('xp').notNull().default(0),
    finalRank: integer('final_rank'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('league_memberships_user_week_scope_unique').on(t.userId, t.weekStart, t.scope),
    index('league_memberships_league_idx').on(t.weekStart, t.scope, t.scopeKey),
    oneOf('league_memberships_scope_check', t.scope, LEAGUE_SCOPES),
  ],
);

export const leaderboardSnapshots = pgTable(
  'leaderboard_snapshots',
  {
    id: id(),
    weekStart: date('week_start', { mode: 'string' }).notNull(),
    scope: text('scope').notNull(),
    scopeKey: text('scope_key').notNull(),
    /** [{ handle, display (first name + last initial), xp, rank }] — opaque handles, no user ids. */
    entries: jsonb('entries').notNull(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('leaderboard_snapshots_unique').on(t.weekStart, t.scope, t.scopeKey),
    oneOf('leaderboard_snapshots_scope_check', t.scope, LEAGUE_SCOPES),
  ],
);
