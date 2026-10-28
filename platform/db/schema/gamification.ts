/**
 * Gamification (ARCHITECTURE §12, CONTEXT §11). Days are IST calendar days (GEN-6). Live leaderboards
 * are Redis sorted sets; `leaderboard_snapshots` keeps the weekly snapshot with opaque per-week
 * handles, never user ids (AC-18). D-014: leagues/leaderboards are off until consent is `granted`.
 */
import { sql } from 'drizzle-orm';
import { check, date, index, integer, jsonb, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, oneOf, timestamps, tstz } from './_shared';
import { users } from './identity';

export const XP_KINDS = ['lesson_completed', 'practice', 'test_submitted', 'streak_bonus', 'badge', 'live_event'] as const;
export const LEAGUE_SCOPES = ['class', 'school', 'city'] as const;
export const LEAGUE_STATUSES = ['open', 'closed'] as const;
export const LEAGUE_OUTCOMES = ['promoted', 'stayed', 'relegated'] as const;

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

/**
 * Weekly leagues (migration 0010, backend-api M5; ARCHITECTURE §12, CONTEXT §11). One row per league:
 * an IST week (Monday), a cohort (scope + scope key, e.g. class / `cbse-10`), a tier (1 = the lowest;
 * names in the LEAGUES config) and a division number inside that tier, about LEAGUES.size students each.
 * The worker's `leagues.weekly` job closes last week's leagues (final ranks, promotion/relegation) and
 * forms this week's for returning students; others join on their first visit (filling open divisions).
 */
export const leagues = pgTable(
  'leagues',
  {
    id: id(),
    /** IST Monday of the league week. */
    weekStart: date('week_start', { mode: 'string' }).notNull(),
    scope: text('scope').notNull(),
    scopeKey: text('scope_key').notNull(),
    tier: smallint('tier').notNull(),
    division: smallint('division').notNull(),
    status: text('status').notNull().default('open'),
    closedAt: tstz('closed_at'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('leagues_cohort_unique').on(t.weekStart, t.scope, t.scopeKey, t.tier, t.division),
    index('leagues_status_week_idx').on(t.status, t.weekStart),
    oneOf('leagues_scope_check', t.scope, LEAGUE_SCOPES),
    oneOf('leagues_status_check', t.status, LEAGUE_STATUSES),
    check('leagues_tier_check', sql`${t.tier} >= 1`),
    check('leagues_division_check', sql`${t.division} >= 1`),
  ],
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
    /** Week XP: computed live from xp_events while the league is open; written when it closes. */
    xp: integer('xp').notNull().default(0),
    finalRank: integer('final_rank'),
    /** 0010: the league (division) the student plays in this week. */
    leagueId: uuid('league_id').references(() => leagues.id, { onDelete: 'cascade' }),
    /** 0010: the student's tier this week (the league's tier; next week's tier follows `outcome`). */
    tier: smallint('tier').notNull().default(1),
    /** 0010: promoted / stayed / relegated, set when the league closes. */
    outcome: text('outcome'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('league_memberships_user_week_scope_unique').on(t.userId, t.weekStart, t.scope),
    index('league_memberships_league_idx').on(t.weekStart, t.scope, t.scopeKey),
    index('league_memberships_league_id_idx').on(t.leagueId),
    oneOf('league_memberships_scope_check', t.scope, LEAGUE_SCOPES),
    oneOf('league_memberships_outcome_check', t.outcome, LEAGUE_OUTCOMES),
    check('league_memberships_tier_check', sql`${t.tier} >= 1`),
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
