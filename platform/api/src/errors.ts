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
  conflict: [409, 'This conflicts with the current state.'],
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
  internal: [500, 'Something went wrong on our side.'],
} as const satisfies Record<string, readonly [number, string]>;

export type ProblemCode = keyof typeof PROBLEMS;

export class ApiProblem extends Error {
  readonly status: number;
  constructor(
    readonly code: ProblemCode,
    readonly extra: { detail?: string; retryAfterSeconds?: number; errors?: ProblemBody['errors']; headers?: Record<string, string> } = {},
  ) {
    super(code);
    this.name = 'ApiProblem';
    this.status = PROBLEMS[code][0];
  }
}

export function problemBody(code: ProblemCode, traceId: string, extra: ApiProblem['extra'] = {}): ProblemBody {
  const [status, title] = PROBLEMS[code];
  return {
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
