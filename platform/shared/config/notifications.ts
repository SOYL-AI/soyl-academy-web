/**
 * Owner notifications (backend-api, 2026-11-12). Config, not code (CLAUDE.md rule 4). No imports.
 *
 * New student sign-up notice: one short email per new student account to SIGNUP_NOTIFY_EMAIL (an API app setting
 * in the Bicep params; unset = off). The flood guard caps the emails across all API instances (KV sliding window);
 * sign-ups beyond the cap are only logged (`signup_notify_suppressed`), the owner still sees them in /admin.
 */
export const SIGNUP_NOTIFY = {
  /** At most this many notice emails per rolling hour (all instances together). */
  maxPerHour: 60,
} as const;
