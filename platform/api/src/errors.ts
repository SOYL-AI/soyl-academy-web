/**
 * API-13: RFC 7807 problem+json errors. Bodies carry a generic `title`, a stable `type` and `code`,
 * and the request's trace id. Never stack traces, SQL, provider error bodies or library messages.
 */
export const PROBLEM_TYPE_BASE = 'https://www.soylai.com/problems/';

export interface ProblemBody {
  type: string;
  title: string;
  status: number;
  code: string;
  traceId: string;
  detail?: string;
  errors?: { path: string; message: string }[];
  retryAfterSeconds?: number;
  /** Extension members of specific problems (credits_exhausted, plan_required). */
  [extension: string]: unknown;
}

/** Stable codes and their generic titles. */
export const PROBLEMS = {
  bad_request: [400, 'The request is not valid.'],
  validation_failed: [400, 'Some fields are not valid.'],
  unauthenticated: [401, 'Please sign in to continue.'],
  forbidden: [403, 'You do not have access to this.'],
  edge_auth_failed: [403, 'Forbidden.'],
  origin_not_allowed: [403, 'This request was blocked for your security.'],
  consent_required: [403, 'A parent or guardian needs to give consent first.'],
  fresh_session_required: [403, 'Please sign in again to confirm it is you.'],
  mfa_required: [403, 'Two-step verification is required.'],
  staff_sign_in_requires_google: [403, 'Staff accounts sign in with Google.'],
  account_disabled: [403, 'This account cannot sign in.'],
  not_found: [404, 'Not found.'],
  method_disabled: [404, 'This sign-in method is not available.'],
  conflict: [409, 'This conflicts with the current state.'],
  /** Test engine (ADR-012): the attempt was submitted or its time (deadline + grace) is over. */
  attempt_closed: [409, 'This attempt has ended.'],
  /** Live mocks: outside the registration/start window (detail says which). */
  live_not_open: [409, 'This live test is not open right now.'],
  /** A test whose questions cannot be served yet (embargoed items) or are no longer available. */
  test_unavailable: [409, 'This test is not available right now.'],
  /** S6-H01: a live mock's solutions, marking and AI evaluation open after the event closes (extension: opensAt). */
  results_after_event: [409, 'Solutions open when the live test closes.'],
  /** Custom test builder: not enough questions match the choices. */
  bank_too_small: [422, 'Not enough questions match your choices.'],
  /** Billing (ADR-016): purchases are switched off (BILLING_ENABLED=false). Learning and tests stay free. */
  billing_disabled: [403, 'Plans cannot be bought yet. Lessons, practice and tests are free for everyone.'],
  /** Billing: the payment provider is not configured or did not answer. */
  billing_unavailable: [503, 'Payments are not available right now. Please try again shortly.'],
  /** Billing: the student already has this plan (or a subscription to cancel first). */
  already_subscribed: [409, 'You already have an active plan.'],
  /** Billing: the plan is not sold now (e.g. the Board Exam Pass after its end date). */
  plan_unavailable: [409, 'This plan cannot be bought right now.'],
  identifier_unavailable: [409, 'This cannot be linked to your account.'],
  last_sign_in_method: [409, 'You cannot remove your only way to sign in.'],
  payload_too_large: [413, 'The request is too large.'],
  unsupported_media_type: [415, 'Send JSON with Content-Type: application/json.'],
  otp_invalid: [400, 'That code is not valid. Check it and try again.'],
  otp_expired: [400, 'That code has expired or was replaced. Request a new one.'],
  rate_limited: [429, 'Too many requests. Please wait and try again.'],
  otp_locked: [429, 'Too many attempts. Please try again later.'],
  phone_otp_paused: [503, 'Phone sign-in is busy right now. Please use email or Google.'],
  service_unavailable: [503, 'This is temporarily unavailable. Please try again shortly.'],
  consent_unavailable: [503, 'We could not check consent right now. Please try again shortly.'],
  /** Built-in consent (D-039, ADR-022): this deployment uses another consent provider, so the built-in flow is off. */
  consent_flow_unavailable: [409, 'Parent approval works differently here. Please check your profile page.'],
  /** Built-in consent: declare the age group first (or the action is for the other age group). */
  age_band_required: [409, 'Tell us your age group first.'],
  /** Built-in consent: an account declared as under 18 cannot switch itself to 18 or older. */
  age_band_locked: [409, 'Your age group cannot be changed here. Please contact us if it is wrong.'],
  consent_code_invalid: [400, 'That approval code is not right. Check it and try again.'],
  consent_code_expired: [400, 'That approval code has expired or was replaced. Ask for a new one.'],
  /** The parent's withdraw link is malformed, forged or for an earlier request. */
  consent_link_invalid: [404, 'This link is not valid any more. If you need help, contact SOYL Academy.'],
  internal: [500, 'Something went wrong on our side.'],
  not_implemented: [501, 'This is not available yet.'],
  /** AI gateway (M4, ADR-013). Paywall: extension fields balance, required, resetAt, resetInSeconds, plan, plansUrl. */
  credits_exhausted: [402, 'You have used today’s AI credits.'],
  /** The action needs a paid plan (extension fields: plan, plansUrl). */
  plan_required: [403, 'This AI feature is part of a paid plan.'],
  /** Spend circuit-breaker: AI is paused until 00:00 IST (Retry-After). Learning content is unaffected. */
  ai_paused: [503, 'AI help is taking a short break. Lessons, practice and tests still work.'],
  /** Moderation, the model or storage could not be reached: refused rather than unchecked (F-027). */
  ai_unavailable: [503, 'AI help is not available right now. Please try again shortly.'],
  /** Too many AI answers streaming at once for this student. */
  ai_busy: [429, 'Please wait for your current AI answer to finish.'],
  /** AC-14: the tutor is off while the student is in a live test. */
  ai_blocked_during_test: [409, 'AI help is turned off while you are taking a live test.'],
  /** The same Idempotency-Key was already used for a finished or running request. */
  duplicate_request: [409, 'This request was already received.'],
  upload_rejected: [422, 'This file cannot be used.'],
  upload_not_ready: [409, 'This file is not ready yet.'],
  /** SOYL Coins (ADR-021): not enough coins for the item (extension fields balance, price). */
  coins_insufficient: [409, 'You do not have enough coins for this yet.'],
  /** The item is outside its limited-drop window. */
  item_unavailable: [409, 'This item cannot be redeemed right now.'],
  /** The item's limited stock is gone. */
  out_of_stock: [409, 'This item is out of stock.'],
  /** Already own the digital item / reached the per-student limit for merch. */
  redemption_limit: [409, 'You have already redeemed this item.'],
  /** The item is reserved for an achievement the student has not reached. */
  not_eligible: [403, 'This item is unlocked by an achievement.'],
  /** Merch needs a verified email or phone first. */
  verification_required: [403, 'Verify your email or phone number first.'],
  /** Physical merch redemption is switched off (COINS_PHYSICAL_REDEMPTION_ENABLED=false). */
  redemption_disabled: [403, 'Merch redemption opens soon. Keep earning coins.'],
} as const satisfies Record<string, readonly [number, string]>;

export type ProblemCode = keyof typeof PROBLEMS;

export class ApiProblem extends Error {
  readonly status: number;
  constructor(
    readonly code: ProblemCode,
    readonly extra: {
      detail?: string;
      retryAfterSeconds?: number;
      errors?: ProblemBody['errors'];
      headers?: Record<string, string>;
      /** RFC 7807 extension members (e.g. the paywall's balance and reset time). Never personal data of others. */
      fields?: Record<string, string | number | boolean | null>;
    } = {},
  ) {
    super(code);
    this.name = 'ApiProblem';
    this.status = PROBLEMS[code][0];
  }
}

export function problemBody(code: ProblemCode, traceId: string, extra: ApiProblem['extra'] = {}): ProblemBody {
  const [status, title] = PROBLEMS[code];
  return {
    ...extra.fields,
    type: `${PROBLEM_TYPE_BASE}${code.replace(/_/g, '-')}`,
    title,
    status,
    code,
    traceId,
    ...(extra.detail ? { detail: extra.detail } : {}),
    ...(extra.errors ? { errors: extra.errors } : {}),
    ...(extra.retryAfterSeconds !== undefined ? { retryAfterSeconds: extra.retryAfterSeconds } : {}),
  };
}

export const PROBLEM_CONTENT_TYPE = 'application/problem+json; charset=utf-8';
