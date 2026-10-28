/**
 * Credit economics (CONTEXT.md §6). Per-action prices live in ai-actions.ts.
 */

/** 1 credit = ₹0.10 of AI budget = 10 paise. */
export const CREDIT_VALUE_PAISE = 10;

/** Daily credits reset at 00:00 in this time zone. No rollover. */
export const CREDIT_RESET_TIME_ZONE = 'Asia/Kolkata';

/** A reservation that is neither charged nor refunded within this time is refunded by the sweeper. */
export const RESERVATION_TTL_SECONDS = 15 * 60;

/**
 * Cost guardrail: alert the owner when an action's 7-day average real cost
 * exceeds this share of its credit price.
 */
export const COST_ALERT_RATIO = 0.8;
export const COST_ALERT_WINDOW_DAYS = 7;

/** Global AI spend circuit-breaker alert thresholds, as shares of AI_DAILY_SPEND_CAP_INR. */
export const SPEND_ALERT_THRESHOLDS = [0.5, 0.8, 1.0] as const;

/**
 * Spend circuit-breaker (ARCHITECTURE §10, D-015, F-009, AC-06). Real (metered) INR spend per IST day:
 *
 * - `all`: every AI request. Cap = AI_DAILY_SPEND_CAP_INR (env; default below).
 * - `free`: requests by free-plan students. Cap = `freeTierShare` × the global cap (D-015), so free-tier
 *   abuse cannot pause AI for subscribers.
 *
 * A budget at or above `degradeAtShare` is "degraded": actions with `degradeTo` run on that tier, the
 * others pause. At 100 % the budget is "paused": AI answers with a friendly message until 00:00 IST.
 * Alerts fire once per threshold per day per budget.
 */
export const AI_SPEND = {
  /** D-044: ₹3,000 a day (was ₹2,000); the free tier keeps ≤ 60 % = ₹1,800 (D-015). Production sets AI_DAILY_SPEND_CAP_INR. */
  dailyCapInrDefault: 3_000,
  freeTierShare: 0.6,
  degradeAtShare: 0.8,
  alertThresholds: SPEND_ALERT_THRESHOLDS,
} as const;

/** Gateway limits (AC-08, API-RL-2). */
export const AI_GATEWAY = {
  /** A stream is cut after this long; must stay below RESERVATION_TTL_SECONDS. */
  maxStreamSeconds: 120,
  /** Per-user concurrent stream slots expire after this long even if a process dies mid-stream. */
  streamSlotTtlSeconds: 180,
  /** Prompts and outputs (ai_messages) and job payloads are kept this long, then only metrics (ARCHITECTURE §10). */
  retentionDays: 30,
  /** Conversation history sent back to the model (most recent messages). */
  historyMessages: 6,
  /** Client Idempotency-Key header. */
  idempotencyHeader: 'idempotency-key',
  /** Where the paywall sends students. */
  plansPath: '/plans',
} as const;
