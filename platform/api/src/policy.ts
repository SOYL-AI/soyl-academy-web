/**
 * Route policy framework (API-6). Every route declares
 *
 *   config: { policy: { roles, csrf, rateLimit, consent, fresh?, mfa?, capability? } }
 *
 * and the server refuses to start if any route lacks a valid one (default deny). The policy is
 * enforced in one onRequest hook, before the body is parsed:
 *
 *   CSRF Origin check (AUTH-12) → IP rate limits → session → user rate limits → roles → staff
 *   capability (D-045) → MFA (AUTH-11) → fresh session (AUTH-9) → consent (API-11)
 *
 * test/route-policy.test.ts enumerates every registered route and snapshots the policy table.
 */
import { z } from 'zod/v4';
import { CONSENT_FEATURES, RATE_LIMITS, type ConsentFeature, type RateLimitBucketName } from '@soyl/shared/config/security';
import { STAFF_CAPABILITIES, type StaffCapability } from '@soyl/shared/config/analytics';

export const POLICY_ROLES = ['guest', 'student', 'parent', 'reviewer', 'admin'] as const;
export type PolicyRole = (typeof POLICY_ROLES)[number];

export const MEMBER_ROLES = ['student', 'parent', 'reviewer', 'admin'] as const satisfies readonly PolicyRole[];
export const EVERYONE = ['guest', ...MEMBER_ROLES] as const satisfies readonly PolicyRole[];
export const STAFF_ROLES = ['reviewer', 'admin'] as const;
/** D-045: superadmin = role `admin` + the `superadmin` staff capability (staff_capabilities, migration 0014). */
export const SUPERADMIN_ROLES = ['admin'] as const;

const bucketNames = Object.keys(RATE_LIMITS) as [RateLimitBucketName, ...RateLimitBucketName[]];

export const RoutePolicySchema = z.strictObject({
  /** Who may call the route. `guest` = no session needed. */
  roles: z.array(z.enum(POLICY_ROLES)).min(1),
  /** AUTH-12: exact Origin + JSON content type on state-changing methods. Only HMAC-verified webhooks may set false. */
  csrf: z.boolean(),
  /**
   * Rate limits in addition to the API-RL-1 defaults (`api.ip`, `api.user`) that apply to every /v1
   * route. `false` = defaults only (health routes are outside /v1 and have none).
   * `failClosed` (API-16): refuse with 503 when the store is down. Auth and OTP routes set it.
   */
  rateLimit: z.union([
    z.literal(false),
    z.strictObject({ buckets: z.array(z.enum(bucketNames)).default([]), failClosed: z.boolean().default(false) }),
  ]),
  /** API-11: a feature from CONSENT_FEATURES (gated if listed in CONSENT.gatedFeatures) or false. */
  consent: z.union([z.literal(false), z.enum(CONSENT_FEATURES)]),
  /** AUTH-9: the session must be at most SESSION.freshSeconds old. */
  fresh: z.boolean().optional(),
  /** AUTH-11: staff second factor required (admin/reviewer routes). Enforced only when STAFF_AUTH.secondFactor is 'totp' (ADR-026). */
  mfa: z.boolean().optional(),
  /** D-045: a staff capability the caller must hold on top of the role (e.g. `superadmin`). */
  capability: z.enum(STAFF_CAPABILITIES).optional(),
});

export type RoutePolicy = {
  roles: readonly PolicyRole[];
  csrf: boolean;
  rateLimit: false | { buckets?: readonly RateLimitBucketName[]; failClosed?: boolean };
  consent: false | ConsentFeature;
  fresh?: boolean;
  mfa?: boolean;
  capability?: StaffCapability;
};

export class MissingPolicyError extends Error {
  constructor(method: string | string[], url: string, detail?: string) {
    super(`Route ${String(method)} ${url} has no valid config.policy (API-6)${detail ? `: ${detail}` : ''}`);
    this.name = 'MissingPolicyError';
  }
}

/** Validates a route's policy at registration time; throws so the server cannot start without one. */
export function assertPolicy(method: string | string[], url: string, policy: unknown): RoutePolicy {
  if (policy === undefined || policy === null) throw new MissingPolicyError(method, url);
  const parsed = RoutePolicySchema.safeParse(policy);
  if (!parsed.success) throw new MissingPolicyError(method, url, parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
  return policy as RoutePolicy;
}

/** Convenience builders so routes read clearly. */
export const policies = {
  /** Public read (catalog): guests allowed, default limits, no consent, GET only. */
  publicRead: (): RoutePolicy => ({ roles: EVERYONE, csrf: true, rateLimit: { buckets: [] }, consent: false }),
  /** Auth flow endpoints: guests allowed, auth IP bucket, fail closed. */
  auth: (): RoutePolicy => ({ roles: EVERYONE, csrf: true, rateLimit: { buckets: ['auth.ip'], failClosed: true }, consent: false }),
  /** Signed-in member routes. */
  /**
   * D-045 super-admin routes (analytics, user lookup): role admin + `superadmin` capability (checked on
   * every request) + `mfa` (staff TOTP on the session when STAFF_AUTH.secondFactor is 'totp'; ADR-026),
   * with their own per-user bucket on top of the defaults.
   */
  superadmin: (bucket: RateLimitBucketName): RoutePolicy => ({
    roles: SUPERADMIN_ROLES,
    csrf: true,
    rateLimit: { buckets: [bucket] },
    consent: false,
    mfa: true,
    capability: 'superadmin',
  }),
  member: (extra: Partial<RoutePolicy> = {}): RoutePolicy => ({
    roles: MEMBER_ROLES,
    csrf: true,
    rateLimit: { buckets: [] },
    consent: false,
    ...extra,
  }),
};
