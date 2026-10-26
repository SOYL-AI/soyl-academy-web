/** Shared zod schemas for routes (request schemas are .strict(): API-8; responses strip: API-9). */
import { z } from 'zod/v4';
import { CONSENT_STATES } from '@soyl/shared/config/security';

export const Problem = z
  .object({
    type: z.string(),
    title: z.string(),
    status: z.number().int(),
    code: z.string(),
    traceId: z.string(),
    detail: z.string().optional(),
    errors: z.array(z.object({ path: z.string(), message: z.string() })).optional(),
    retryAfterSeconds: z.number().int().optional(),
    /** credits_exhausted (paywall): today's balance and the credits the action needs. */
    balance: z.number().int().optional(),
    required: z.number().int().optional(),
    /** credits_exhausted: next 00:00 IST (credits reset) and the countdown in seconds. */
    resetAt: z.iso.datetime().optional(),
    resetInSeconds: z.number().int().optional(),
    /** credits_exhausted / plan_required: the student's plan and where to see the plans. */
    plan: z.string().optional(),
    plansUrl: z.string().optional(),
  })
  .meta({ id: 'Problem', description: 'RFC 7807 problem details (application/problem+json).' });

/** Adds the problem responses to a route's response map (documentation; errors are sent pre-serialised). */
export function withProblems<T extends Record<number, z.ZodType>>(responses: T) {
  return { ...responses, '4XX': Problem, '5XX': Problem } as T & { '4XX': typeof Problem; '5XX': typeof Problem };
}

export const ConsentStateSchema = z.enum(CONSENT_STATES).meta({ id: 'ConsentState' });
export const RoleSchema = z.enum(['student', 'parent', 'reviewer', 'admin']).meta({ id: 'Role' });
export const BoardSchema = z.enum(['cbse', 'cisce']).meta({ id: 'Board' });
export const ClassLevelSchema = z.number().int().min(7).max(12);
export const LocaleSchema = z.enum(['en-IN', 'hi-IN']).meta({ id: 'Locale' });

export const SessionUser = z
  .object({
    id: z.uuid(),
    role: RoleSchema,
    displayName: z.string().nullable(),
    board: BoardSchema.nullable(),
    classLevel: ClassLevelSchema.nullable(),
    locale: z.string(),
  })
  .meta({ id: 'SessionUser' });

export const SessionResponse = z
  .object({
    authenticated: z.boolean(),
    user: SessionUser.nullable(),
    consent: ConsentStateSchema.nullable(),
    session: z.object({ id: z.uuid(), expiresAt: z.iso.datetime(), fresh: z.boolean() }).nullable(),
  })
  .meta({ id: 'SessionResponse' });

export const SignInResponse = z
  .object({
    user: SessionUser,
    isNewUser: z.boolean(),
    consent: ConsentStateSchema,
    /** AUTH-13-validated place to go next. */
    returnTo: z.string(),
  })
  .meta({ id: 'SignInResponse' });

export const OtpSentResponse = z
  .object({
    sent: z.literal(true),
    /** UI cooldown before offering "resend" (AUTH-5: 30 s, 60 s, 120 s). */
    resendAfterSeconds: z.number().int(),
  })
  .meta({ id: 'OtpSentResponse' });

export const OtpCode = z.string().regex(/^\d{6}$/, 'a 6-digit code');
