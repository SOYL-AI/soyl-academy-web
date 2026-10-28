/**
 * First-party analytics for the super-admin dashboard (D-045). Config, not code (CLAUDE.md rule 4).
 *
 * D-014 / D-045 privacy design:
 * - Product interest is measured with **aggregate counters only**: one row per (IST day, event,
 *   dimension) holding a count (`analytics_counters`, migration 0014). No user id, IP address, session
 *   id, device id or user agent is ever stored with a counter, so no per-child behavioural profile can
 *   be built from them.
 * - Only the events and dimension values listed here are accepted; anything else is refused with 400.
 * - `client: true` events come from POST /v1/events, which the web sends **only after the visitor
 *   accepted analytics** in the cookie bar (the same signal as marketing's ConsentedAnalytics). The IP
 *   is used for rate limiting only (an HMAC'd key in the rate-limit store, never in the database).
 * - `client: false` events are observed by the API itself where they happen (sign-up, paywall,
 *   checkout); a client can never send them, so the browser cannot inflate them.
 *
 * Everything else on the dashboard is computed from the feature tables the platform already keeps
 * (users, progress, attempts, the credit ledger, billing), aggregated in SQL; per-user rows never leave
 * the database except through the audited user lookup.
 */
import { AI_ACTION_IDS } from './ai-actions';
import { PlanId } from './plans';
import { STORE_ITEMS } from './coins';

/** Allowed values per dimension kind. `none` = the event has no dimension (stored as ''). */
export const ANALYTICS_DIMENSIONS = {
  none: [] as readonly string[],
  /** Paid plans a student can look at or buy. */
  plan: PlanId.options.filter((p) => p !== 'free') as readonly string[],
  /** AI action ids (the paywall dimension). */
  action: AI_ACTION_IDS as readonly string[],
  /** SOYL Coins store items. */
  storeItem: STORE_ITEMS.map((i) => i.key) as readonly string[],
  /** Sign-up method (server-observed). */
  method: ['email', 'phone', 'google'] as readonly string[],
  /** Where on a platform page a prompt or link was clicked (fixed labels, never a URL). */
  source: ['header', 'dashboard', 'lesson', 'practice', 'test', 'ask', 'plans', 'store', 'menu', 'footer', 'other'] as readonly string[],
} as const;
export type AnalyticsDimensionKind = keyof typeof ANALYTICS_DIMENSIONS;

export interface AnalyticsEventConfig {
  /** Shown on the dashboard's Interest tab. */
  label: string;
  dimension: AnalyticsDimensionKind;
  /** true: the web may send it (POST /v1/events, after analytics consent). false: API-observed only. */
  client: boolean;
}

export const ANALYTICS_EVENTS = {
  // ---- server-observed (the API increments these where they happen) --------------------------------
  signup: { label: 'Sign-ups', dimension: 'method', client: false },
  paywall_shown: { label: 'Paywall shown (credits used up)', dimension: 'action', client: false },
  ai_paused: { label: 'AI refused: daily spend cap reached', dimension: 'none', client: false },
  checkout_start: { label: 'Checkout started', dimension: 'plan', client: false },
  checkout_complete: { label: 'Checkout completed', dimension: 'plan', client: false },
  // ---- client events (sent only after the visitor accepted analytics) ------------------------------
  plans_view: { label: 'Plans page views', dimension: 'none', client: true },
  plan_select: { label: 'Plan selected', dimension: 'plan', client: true },
  store_view: { label: 'Coins store views', dimension: 'none', client: true },
  store_item_view: { label: 'Store item opened', dimension: 'storeItem', client: true },
  ask_ai_open: { label: 'Ask AI opened', dimension: 'none', client: true },
  dashboard_view: { label: 'Student dashboard views', dimension: 'none', client: true },
  notes_open: { label: 'Notes opened', dimension: 'none', client: true },
  flashcards_open: { label: 'Flashcards opened', dimension: 'none', client: true },
  signup_prompt_click: { label: 'Sign-up prompt clicked', dimension: 'source', client: true },
  /** Platform pages only; marketing pages are untouched (D-045). */
  future_builders_click: { label: 'Future Builders link clicked (platform pages)', dimension: 'source', client: true },
} as const satisfies Record<string, AnalyticsEventConfig>;

export type AnalyticsEventName = keyof typeof ANALYTICS_EVENTS;
export const ANALYTICS_EVENT_NAMES = Object.keys(ANALYTICS_EVENTS) as [AnalyticsEventName, ...AnalyticsEventName[]];
export const CLIENT_EVENT_NAMES = ANALYTICS_EVENT_NAMES.filter((n) => ANALYTICS_EVENTS[n].client) as AnalyticsEventName[];

/**
 * Validates an (event, dimension) pair against the allowlist. Returns the stored dimension ('' for
 * events without one) or null when the pair is not allowed.
 */
export function allowedCounter(name: string, dimension: string | null | undefined, opts: { client: boolean }): string | null {
  if (!Object.hasOwn(ANALYTICS_EVENTS, name)) return null;
  const ev: AnalyticsEventConfig = ANALYTICS_EVENTS[name as AnalyticsEventName];
  if (opts.client && !ev.client) return null;
  const dim = dimension ?? '';
  if (ev.dimension === 'none') return dim === '' ? '' : null;
  return ANALYTICS_DIMENSIONS[ev.dimension].includes(dim) ? dim : null;
}

export const ANALYTICS = {
  timezone: 'Asia/Kolkata',
  /** Dashboard ranges: at most 180 IST days per query (cheap reads without a replica). */
  maxRangeDays: 180,
  defaultRangeDays: 30,
  /** Preset ranges in the date picker. */
  presets: [7, 30, 90] as const,
  /** Retention cohorts: share of a sign-up week active exactly N days after signing up. */
  retentionDays: [1, 7, 30] as const,
  /** Streak distribution buckets (current streak in days; inclusive lower bounds). */
  streakBuckets: [0, 1, 2, 4, 8, 15, 31] as const,
  /** Open "report a mistake" items by age (hours; inclusive lower bounds). */
  reportAgeBucketsHours: [0, 24, 72, 168] as const,
  /** Top chapters/subjects lists. */
  topN: 10,
  /** Recent sign-ups page size (max). */
  recentUsersMax: 100,
  /** POST /v1/events: events per request and body size. */
  events: { maxPerRequest: 10, maxBodyBytes: 1024 },
  /** Web: identical (event, dimension) pairs within this window are sent once (debounce). */
  clientDebounceMs: 30 * 60 * 1000,
} as const;

/** Staff capabilities on top of a role (migration 0014). `superadmin` = analytics + user lookup. */
export const STAFF_CAPABILITIES = ['superadmin'] as const;
export type StaffCapability = (typeof STAFF_CAPABILITIES)[number];

/** Admin audit actions written by the dashboard (audit_log.action). */
export const ADMIN_AUDIT_ACTIONS = {
  revealEmail: 'admin.user.reveal_email',
  viewSummary: 'admin.user.view_summary',
  search: 'admin.user.search',
} as const;
