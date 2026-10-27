/**
 * Consent flow routes (D-039, ADR-022). The gate itself is unchanged (policy `consent`, ConsentService);
 * these routes drive the interim built-in provider (CONSENT_PROVIDER=builtin). With any other provider
 * the write routes answer 409 consent_flow_unavailable and GET says which UI applies.
 *
 *   GET  /v1/me/consent                  status, age band, masked parent email, which flow applies
 *   POST /v1/me/consent/age-band         { ageBand: adult, agree: true } → granted (self-declared) | { ageBand: minor }
 *   POST /v1/me/consent/parent           { parentEmail } → approval code emailed to the parent (rate-limited)
 *   POST /v1/me/consent/verify           { code } → granted (single use, 5 tries per code)
 *   POST /v1/me/consent/withdraw         the account holder withdraws (or cancels a pending request)
 *   POST /v1/consent/parent/withdraw     { token } from the parent's email link; no session; can only switch OFF
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { AGE_BANDS, CONSENT_METHODS, CONSENT_REVOKERS } from '@soyl/shared/config/security';
import { ApiProblem } from '../errors';
import { EVERYONE, policies } from '../policy';
import { ConsentStateSchema, withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import type { BuiltinConsentFlow, ConsentRequestContext, ConsentView } from '../consent/builtin';

export const ConsentViewSchema = z
  .object({
    flow: z.enum(['builtin', 'external', 'none']).meta({ description: 'builtin = age band + parent code here; external = POST /v1/me/consent/start; none = no consent system yet.' }),
    status: ConsentStateSchema,
    ageBand: z.enum(AGE_BANDS).nullable().meta({ description: 'adult = 18 or older; minor = under 18 (self-declared).' }),
    method: z.enum(CONSENT_METHODS).nullable(),
    parentEmailHint: z.string().nullable().meta({ description: 'Masked parent email, e.g. p•••@gmail.com.' }),
    codeExpiresAt: z.iso.datetime().nullable(),
    grantedAt: z.iso.datetime().nullable(),
    revokedAt: z.iso.datetime().nullable(),
    revokedBy: z.enum(CONSENT_REVOKERS).nullable(),
    policyVersion: z.string(),
  })
  .meta({ id: 'ConsentView' });

const AgeBandBody = z
  .strictObject({
    ageBand: z.enum(AGE_BANDS),
    /** 18+: "I am 18 or older and agree to the privacy notice" (self-declared consent). */
    agree: z.boolean().optional(),
  })
  .meta({ id: 'ConsentAgeBandBody' });

const ParentBody = z.strictObject({ parentEmail: z.string().min(3).max(254) }).meta({ id: 'ConsentParentBody' });
const ParentResponse = ConsentViewSchema.extend({ resendAfterSeconds: z.number().int().min(0) }).meta({ id: 'ConsentParentResponse' });
const VerifyBody = z.strictObject({ code: z.string().min(1).max(12) }).meta({ id: 'ConsentVerifyBody' });
const ParentWithdrawBody = z.strictObject({ token: z.string().min(10).max(200) }).meta({ id: 'ConsentParentWithdrawBody' });
const ParentWithdrawResponse = z.object({ status: ConsentStateSchema, alreadyWithdrawn: z.boolean() }).meta({ id: 'ConsentParentWithdrawResponse' });

export function registerConsentRoutes(appIn: FastifyInstance, services: Services, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const write = () => policies.member({ rateLimit: { buckets: ['consent.write.user'], failClosed: true } });
  const ctx = (request: FastifyRequest): ConsentRequestContext => ({ ip: request.clientIp, log: request.log, requestId: String(request.id) });
  const flow = (): BuiltinConsentFlow => {
    if (!services.consentFlow) throw new ApiProblem('consent_flow_unavailable');
    return services.consentFlow;
  };

  app.get('/v1/me/consent', {
    config: { policy: policies.member() },
    schema: { tags: ['me'], summary: 'Your consent state and which consent flow applies (D-039)', response: withProblems({ 200: ConsentViewSchema }) },
    handler: async (request): Promise<ConsentView> => {
      const userId = request.auth!.user.id;
      if (services.consentFlow) return services.consentFlow.view(userId);
      return {
        flow: deps.config.consent.provider === 'unavailable' ? 'none' : 'external',
        status: await services.consent.getStatus(userId),
        ageBand: null,
        method: null,
        parentEmailHint: null,
        codeExpiresAt: null,
        grantedAt: null,
        revokedAt: null,
        revokedBy: null,
        policyVersion: '',
      };
    },
  });

  app.post('/v1/me/consent/age-band', {
    config: { policy: write() },
    schema: {
      tags: ['me'],
      summary: 'Declare your age group. 18 or older (with agree: true) turns consent-gated features on; under 18 needs a parent.',
      body: AgeBandBody,
      response: withProblems({ 200: ConsentViewSchema }),
    },
    handler: async (request) => {
      const f = flow();
      if (request.body.ageBand === 'adult' && request.body.agree !== true)
        throw new ApiProblem('validation_failed', { errors: [{ path: 'body.agree', message: 'Confirm that you are 18 or older and agree to the privacy notice.' }] });
      return f.declareAgeBand(request.auth!.user, request.body.ageBand, ctx(request));
    },
  });

  app.post('/v1/me/consent/parent', {
    config: { policy: write() },
    schema: {
      tags: ['me'],
      summary: 'Under 18: email a one-time approval code to your parent or guardian (rate-limited per account, parent email and IP).',
      body: ParentBody,
      response: withProblems({ 200: ParentResponse }),
    },
    handler: async (request) => flow().requestParentApproval(request.auth!.user, request.body.parentEmail, ctx(request)),
  });

  app.post('/v1/me/consent/verify', {
    config: { policy: write() },
    schema: { tags: ['me'], summary: 'Enter the approval code your parent gave you. Single use; replays after approval return the granted state.', body: VerifyBody, response: withProblems({ 200: ConsentViewSchema }) },
    handler: async (request) => flow().verifyCode(request.auth!.user, request.body.code.trim(), ctx(request)),
  });

  app.post('/v1/me/consent/withdraw', {
    config: { policy: write() },
    schema: { tags: ['me'], summary: 'Withdraw consent (or cancel a pending request). Gated features switch off and AI conversations and uploads are deleted.', response: withProblems({ 200: ConsentViewSchema }) },
    handler: async (request) => flow().withdraw(request.auth!.user, ctx(request)),
  });

  app.post('/v1/consent/parent/withdraw', {
    config: { policy: { roles: EVERYONE, csrf: true, rateLimit: { buckets: ['consent.parent.ip'], failClosed: true }, consent: false } },
    schema: {
      tags: ['consent'],
      summary: "The parent's link: withdraw approval, or decline a pending request. No sign-in; it can only switch features off. Idempotent.",
      body: ParentWithdrawBody,
      response: withProblems({ 200: ParentWithdrawResponse }),
    },
    handler: async (request) => flow().withdrawByParent(request.body.token, ctx(request)),
  });
}
