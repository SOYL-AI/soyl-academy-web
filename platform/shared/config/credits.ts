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
