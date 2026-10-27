/**
 * Local/test-only helper for end-to-end tests (ADR-002 "Dev OTP outbox"): returns the last OTP the
 * MOCK senders delivered to an allow-listed test identifier (TEST_PHONE_PREFIX numbers or
 * @example.com addresses). Registered only when DEV_OTP_OUTBOX=true, which config refuses unless
 * APP_ENV is local or test, and only with mock senders. Hidden from OpenAPI. Edge auth applies.
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { TEST_EMAIL_DOMAIN, TEST_PHONE_REGEX } from '@soyl/shared/config/security';
import { ApiProblem } from '../errors';
import { MockEmailSender } from '../auth/senders/email';
import { MockSmsSender } from '../auth/senders/sms';
import { EVERYONE } from '../policy';
import type { AppDeps } from '../services';

export function registerDevRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  if (!deps.config.isLocal) throw new Error('dev routes are only for APP_ENV local/test');
  const { sms, email } = deps.providers;
  if (!(sms instanceof MockSmsSender) || !(email instanceof MockEmailSender)) return;
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  app.get('/v1/dev/otp-outbox', {
    config: { policy: { roles: EVERYONE, csrf: true, rateLimit: { buckets: ['auth.ip'] }, consent: false } },
    schema: {
      hide: true,
      querystring: z.strictObject({ to: z.string().max(254) }),
      // `link`: the parent's consent withdraw link from the last parent-approval email (D-039 e2e).
      response: { 200: z.object({ code: z.string().nullable(), link: z.string().nullable() }) },
    },
    handler: async (request) => {
      const to = request.query.to.trim().toLowerCase();
      const allowed = TEST_PHONE_REGEX.test(to) || to.endsWith(`@${TEST_EMAIL_DOMAIN}`);
      if (!allowed) throw new ApiProblem('not_found');
      if (!to.includes('@')) return { code: sms.lastCode(to) ?? null, link: null };
      const last = email.last(to);
      return { code: email.lastCode(to) ?? null, link: last?.tag === 'parent-consent' ? (last.text.match(/https?:\/\/\S+\/me\/consent\/parent#t=\S+/)?.[0] ?? null) : null };
    },
  });
}
