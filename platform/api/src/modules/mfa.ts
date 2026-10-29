/**
 * AUTH-11 staff second factor (ADR-011). Reviewer/admin accounts only. The routes always exist; whether
 * staff routes require a verified session is STAFF_AUTH.secondFactor (owner default 'none', ADR-026).
 *
 *   GET  /v1/me/mfa                    status: enrolled, confirmed, this session verified, recovery codes left
 *   POST /v1/me/mfa/totp/enroll        new secret + otpauth URI (fresh session; 409 when already set up)
 *   POST /v1/me/mfa/totp/confirm       first code → recovery codes (shown once); this session is verified
 *   POST /v1/me/mfa/verify             code or recovery code → this session is verified
 *   POST /v1/me/mfa/totp/disable       fresh + verified session + a current code → removed everywhere
 *
 * Wrong codes: 400 otp_invalid; after MFA.failures.limit within the window: 429 otp_locked.
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { STAFF_ROLES, type RoutePolicy } from '../policy';
import { OtpCode, withProblems } from '../schemas';
import type { Services } from '../services';
import { ApiProblem } from '../errors';
import { authEvent } from '../logging';

const staff = (extra: Partial<RoutePolicy> = {}): RoutePolicy => ({ roles: STAFF_ROLES, csrf: true, rateLimit: { buckets: ['mfa.user'], failClosed: true }, consent: false, ...extra });

const StatusResponse = z
  .object({ enrolled: z.boolean(), confirmed: z.boolean(), sessionVerified: z.boolean(), recoveryCodesRemaining: z.number().int() })
  .meta({ id: 'MfaStatus' });
const EnrollResponse = z
  .object({ secret: z.string(), otpauthUri: z.string(), digits: z.number().int(), periodSeconds: z.number().int(), algorithm: z.string(), expiresInSeconds: z.number().int() })
  .meta({ id: 'MfaEnrollment', description: 'Show the URI as a QR code (and the secret for manual entry). Nothing here is stored in the browser.' });
const ConfirmResponse = z.object({ recoveryCodes: z.array(z.string()) }).meta({ id: 'MfaRecoveryCodes', description: 'Shown once. Each code works once.' });
const VerifyBody = z
  .union([z.strictObject({ code: OtpCode }), z.strictObject({ recoveryCode: z.string().min(10).max(20).regex(/^[A-Za-z0-9-]+$/) })])
  .meta({ id: 'MfaVerifyRequest' });
const VerifyResponse = z.object({ verified: z.literal(true), method: z.enum(['totp', 'recovery_code']), recoveryCodesRemaining: z.number().int() }).meta({ id: 'MfaVerified' });

export function registerMfaRoutes(appIn: FastifyInstance, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { mfa } = services;

  app.get('/v1/me/mfa', {
    config: { policy: staff({ rateLimit: { buckets: [] } }) },
    schema: { tags: ['mfa'], summary: 'Your two-step verification status (staff)', response: withProblems({ 200: StatusResponse }) },
    handler: async (request) => mfa.status(request.auth!.user.id, request.auth!.session.id),
  });

  app.post('/v1/me/mfa/totp/enroll', {
    config: { policy: staff({ fresh: true }) },
    schema: { tags: ['mfa'], summary: 'Start setting up an authenticator app (staff; fresh sign-in)', response: withProblems({ 200: EnrollResponse }) },
    handler: async (request) => {
      const { user } = request.auth!;
      const result = await mfa.enroll(user.id, user.email || user.id);
      authEvent(request.log, 'mfa_enroll', { outcome: 'success', userId: user.id, ip: request.clientIp });
      return result;
    },
  });

  app.post('/v1/me/mfa/totp/confirm', {
    config: { policy: staff() },
    schema: { tags: ['mfa'], summary: 'Confirm the authenticator with a first code; returns one-time recovery codes', body: z.strictObject({ code: OtpCode }), response: withProblems({ 200: ConfirmResponse }) },
    handler: async (request) => {
      const { user, session } = request.auth!;
      try {
        const r = await mfa.confirm(user.id, session.id, request.body.code);
        authEvent(request.log, 'mfa_confirm', { outcome: 'success', userId: user.id, ip: request.clientIp });
        return r;
      } catch (err) {
        if (err instanceof ApiProblem) authEvent(request.log, 'mfa_confirm', { outcome: 'failure', userId: user.id, ip: request.clientIp, reason: err.code });
        throw err;
      }
    },
  });

  app.post('/v1/me/mfa/verify', {
    config: { policy: staff() },
    schema: { tags: ['mfa'], summary: 'Verify this session with an authenticator code or a recovery code', body: VerifyBody, response: withProblems({ 200: VerifyResponse }) },
    handler: async (request) => {
      const { user, session } = request.auth!;
      try {
        const r = await mfa.verify(user.id, session.id, request.body);
        authEvent(request.log, 'mfa_verify', { outcome: 'success', userId: user.id, ip: request.clientIp, factor: r.method });
        return { verified: true as const, ...r };
      } catch (err) {
        if (err instanceof ApiProblem) authEvent(request.log, 'mfa_verify', { outcome: 'failure', userId: user.id, ip: request.clientIp, reason: err.code });
        throw err;
      }
    },
  });

  app.post('/v1/me/mfa/totp/disable', {
    config: { policy: staff({ fresh: true, mfa: true }) },
    schema: { tags: ['mfa'], summary: 'Turn off the authenticator (fresh, verified session and a current code)', body: z.strictObject({ code: OtpCode }), response: withProblems({ 204: z.null() }) },
    handler: async (request, reply) => {
      const { user } = request.auth!;
      await mfa.disable(user.id, request.body.code);
      authEvent(request.log, 'mfa_disable', { outcome: 'success', userId: user.id, ip: request.clientIp });
      return reply.status(204).send(null);
    },
  });
}
