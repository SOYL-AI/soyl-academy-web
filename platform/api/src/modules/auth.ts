/**
 * /v1/auth/* — every sign-in pathway (AUTH-1). Nothing else signs anyone in:
 *
 *   POST /v1/auth/phone/send-otp        POST /v1/auth/phone/verify         phone OTP (+91 mobiles)
 *   POST /v1/auth/email/send-otp        POST /v1/auth/email/verify         email OTP
 *   GET  /v1/auth/google/start          GET  /v1/auth/google/callback      Google OIDC (PKCE+state+nonce)
 *   POST /v1/auth/sign-out
 *   POST /v1/auth/link/{phone,email}/send-otp, /verify, POST /v1/auth/unlink   (signed in, fresh session)
 *
 * Auth bodies are never logged (API-14). Send responses do not reveal whether an account exists (AUTH-5).
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { OAUTH, safeReturnTo } from '@soyl/shared/config/security';
import { ApiProblem } from '../errors';
import { appendSetCookie, clearCookie, readCookie, serializeCookie } from '../http/cookies';
import { authEvent, securityEvent } from '../logging';
import { EVERYONE, MEMBER_ROLES, policies, type RoutePolicy } from '../policy';
import { OtpCode, OtpSentResponse, SignInResponse, withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import type { AuthUser } from '../types';
import { sessionUser } from '../domain/profile';
import { SignInRefused, type SignInMethod } from '../auth/identity';
import { OAuthFlowError } from '../auth/google';
import type { OtpChannel } from '../auth/otp';

const PhoneSendBody = z.strictObject({ phoneNumber: z.string().min(8).max(20) });
const PhoneVerifyBody = z.strictObject({ phoneNumber: z.string().min(8).max(20), code: OtpCode, returnTo: z.string().max(2048).optional() });
const EmailSendBody = z.strictObject({ email: z.string().min(3).max(254) });
const EmailVerifyBody = z.strictObject({ email: z.string().min(3).max(254), code: OtpCode, returnTo: z.string().max(2048).optional() });
const LinkVerifyPhone = z.strictObject({ phoneNumber: z.string().min(8).max(20), code: OtpCode });
const LinkVerifyEmail = z.strictObject({ email: z.string().min(3).max(254), code: OtpCode });
const UnlinkBody = z.strictObject({ method: z.enum(['phone', 'email', 'google']) });
const GoogleStartQuery = z.strictObject({
  returnTo: z.string().max(2048).optional(),
  intent: z.enum(['signin', 'link']).default('signin'),
});
const GoogleCallbackQuery = z.object({
  state: z.string().max(512).optional(),
  code: z.string().max(4096).optional(),
  error: z.string().max(200).optional(),
});
const MethodsResponse = z.object({ phone: z.string().nullable(), email: z.string().nullable(), google: z.boolean() }).meta({ id: 'SignInMethods' });

const linkPolicy = (): RoutePolicy => ({ ...policies.member(), rateLimit: { buckets: ['auth.ip'], failClosed: true }, fresh: true });

function ctxOf(request: FastifyRequest) {
  return { ip: request.clientIp, userAgent: request.headers['user-agent'], log: request.log, userId: request.auth?.user.id ?? null };
}

export function registerAuthRoutes(appIn: FastifyInstance, services: Services, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { config, db } = deps;

  async function completeSignIn(user: AuthUser, method: SignInMethod, created: boolean, request: FastifyRequest, reply: FastifyReply) {
    const session = await services.sessions.create(user, request, reply);
    request.auth = { user, session };
    const consent = await services.consent.refreshOnLogin(user.id);
    authEvent(request.log, 'login', { outcome: 'success', userId: user.id, method, ip: request.clientIp, userAgent: request.headers['user-agent'], created });
    return { user: await sessionUser(db, user), isNewUser: created, consent };
  }

  // ---- phone OTP ----------------------------------------------------------------------------------
  const otpSend = (channel: OtpChannel, purpose: 'sign-in' | 'link') => async (request: FastifyRequest, raw: string) => {
    const { resendAfterSeconds } = await services.otp.send(channel, raw, purpose, ctxOf(request));
    return { sent: true as const, resendAfterSeconds };
  };

  app.post('/v1/auth/phone/send-otp', {
    config: { policy: policies.auth() },
    schema: { tags: ['auth'], summary: 'Send a sign-in code by SMS (+91 mobiles only)', body: PhoneSendBody, response: withProblems({ 200: OtpSentResponse }) },
    handler: async (request) => otpSend('phone', 'sign-in')(request, request.body.phoneNumber),
  });

  app.post('/v1/auth/phone/verify', {
    config: { policy: policies.auth() },
    schema: { tags: ['auth'], summary: 'Verify an SMS code and sign in (creates the account on first use)', body: PhoneVerifyBody, response: withProblems({ 200: SignInResponse }) },
    handler: async (request, reply) => {
      const phone = await services.otp.verify('phone', request.body.phoneNumber, 'sign-in', request.body.code, ctxOf(request));
      const { user, created } = await services.identity.signInWithPhone(phone, ctxOf(request)).catch((err) => {
        authEvent(request.log, 'login_failed', { outcome: 'refused', method: 'phone', identifier: phone, ip: request.clientIp, userAgent: request.headers['user-agent'], reason: err instanceof ApiProblem ? err.code : 'error' });
        throw err;
      });
      return { ...(await completeSignIn(user, 'phone', created, request, reply)), returnTo: safeReturnTo(request.body.returnTo) };
    },
  });

  // ---- email OTP ----------------------------------------------------------------------------------
  app.post('/v1/auth/email/send-otp', {
    config: { policy: policies.auth() },
    schema: { tags: ['auth'], summary: 'Send a sign-in code by email', body: EmailSendBody, response: withProblems({ 200: OtpSentResponse }) },
    handler: async (request) => otpSend('email', 'sign-in')(request, request.body.email),
  });

  app.post('/v1/auth/email/verify', {
    config: { policy: policies.auth() },
    schema: { tags: ['auth'], summary: 'Verify an email code and sign in (creates the account on first use)', body: EmailVerifyBody, response: withProblems({ 200: SignInResponse }) },
    handler: async (request, reply) => {
      const email = await services.otp.verify('email', request.body.email, 'sign-in', request.body.code, ctxOf(request));
      const { user, created } = await services.identity.signInWithEmail(email, ctxOf(request)).catch((err) => {
        authEvent(request.log, 'login_failed', { outcome: 'refused', method: 'email', identifier: email, ip: request.clientIp, userAgent: request.headers['user-agent'], reason: err instanceof ApiProblem ? err.code : 'error' });
        throw err;
      });
      return { ...(await completeSignIn(user, 'email', created, request, reply)), returnTo: safeReturnTo(request.body.returnTo) };
    },
  });

  // ---- Google -------------------------------------------------------------------------------------
  const redirectTo = (reply: FastifyReply, returnTo: string, params: Record<string, string> = {}) => {
    const url = new URL(safeReturnTo(returnTo), config.publicBaseUrl); // API-1: configured origin only
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    return reply.redirect(url.toString(), 302);
  };

  app.get('/v1/auth/google/start', {
    config: { policy: policies.auth() },
    schema: {
      tags: ['auth'],
      summary: 'Start Google sign-in (302 to Google). intent=link adds Google to the signed-in account (fresh session).',
      querystring: GoogleStartQuery,
      response: withProblems({ 302: z.null().describe('Redirect to the Google authorization endpoint') }),
    },
    handler: async (request, reply) => {
      const { intent } = request.query;
      const returnTo = safeReturnTo(request.query.returnTo);
      if (intent === 'link') {
        if (!request.auth) throw new ApiProblem('unauthenticated');
        if (!services.sessions.isFresh(request.auth.session)) throw new ApiProblem('fresh_session_required');
      }
      const { url, state } = await services.google.start({ returnTo, intent, userId: intent === 'link' ? request.auth!.user.id : null });
      appendSetCookie(
        reply,
        serializeCookie(services.google.stateCookieName, services.google.signState(state), { maxAgeSeconds: OAUTH.stateTtlSeconds, secure: config.secureCookies }),
      );
      return reply.redirect(url, 302);
    },
  });

  app.get('/v1/auth/google/callback', {
    // OAuth callback: a GET that signs in. Protected by single-use state bound to a signed cookie, PKCE and nonce (AUTH-6, ADR-002).
    config: { policy: policies.auth() },
    schema: {
      tags: ['auth'],
      summary: 'Google redirect target. Signs in (or links) and 302s to the validated returnTo; failures add ?authError=<reason>.',
      querystring: GoogleCallbackQuery,
      response: withProblems({ 302: z.null().describe('Redirect back to the web app') }),
    },
    handler: async (request, reply) => {
      const cookieState = services.google.verifyStateCookie(readCookie(request, services.google.stateCookieName));
      clearCookie(reply, services.google.stateCookieName, config.secureCookies);
      const query = request.url.includes('?') ? request.url.slice(request.url.indexOf('?') + 1) : '';
      let result;
      try {
        result = await services.google.callback(query, cookieState);
      } catch (err) {
        const reason = err instanceof OAuthFlowError ? err.reason : 'provider_error';
        securityEvent(request.log, reason === 'state_mismatch' || reason === 'state_expired' ? 'oauth_state_mismatch' : 'oauth_failed', { reason });
        authEvent(request.log, 'login_failed', { outcome: 'failure', method: 'google', ip: request.clientIp, userAgent: request.headers['user-agent'], reason });
        return redirectTo(reply, '/learn', { authError: reason === 'state_mismatch' || reason === 'state_expired' ? 'oauth_state' : 'oauth_failed' });
      }
      const { profile, record } = result;
      const ctx = ctxOf(request);
      try {
        if (record.intent === 'link') {
          const auth = request.auth;
          if (!auth || auth.user.id !== record.userId || !services.sessions.isFresh(auth.session)) {
            authEvent(request.log, 'link', { outcome: 'refused', method: 'google', userId: record.userId, ip: request.clientIp, reason: 'session_changed' });
            return redirectTo(reply, record.returnTo, { authError: 'link_requires_fresh_session' });
          }
          await services.identity.linkGoogle(auth.user.id, profile, ctx);
          return redirectTo(reply, record.returnTo, { linked: 'google' });
        }
        const { user, created } = await services.identity.signInWithGoogle(profile, ctx);
        await completeSignIn(user, 'google', created, request, reply);
        return redirectTo(reply, record.returnTo);
      } catch (err) {
        const reason = err instanceof SignInRefused ? err.reason : err instanceof ApiProblem ? err.code : 'oauth_failed';
        authEvent(request.log, record.intent === 'link' ? 'link' : 'login_failed', { outcome: 'refused', method: 'google', identifier: profile.email, ip: request.clientIp, userAgent: request.headers['user-agent'], reason });
        if (!(err instanceof SignInRefused) && !(err instanceof ApiProblem)) request.log.error({ err }, 'google sign-in failed');
        return redirectTo(reply, record.returnTo, { authError: reason });
      }
    },
  });

  // ---- sign out -----------------------------------------------------------------------------------
  app.post('/v1/auth/sign-out', {
    config: { policy: { roles: EVERYONE, csrf: true, rateLimit: { buckets: ['auth.ip'] }, consent: false } },
    schema: { tags: ['auth'], summary: 'Sign out: deletes the session and sends Clear-Site-Data: "cookies"', response: withProblems({ 204: z.null() }) },
    handler: async (request, reply) => {
      const auth = request.auth;
      await services.sessions.signOut(auth, request, reply);
      if (auth) authEvent(request.log, 'logout', { outcome: 'success', userId: auth.user.id, ip: request.clientIp, userAgent: request.headers['user-agent'] });
      return reply.status(204).send(null);
    },
  });

  // ---- linking (AUTH-7) ---------------------------------------------------------------------------
  app.post('/v1/auth/link/phone/send-otp', {
    config: { policy: linkPolicy() },
    schema: { tags: ['auth'], summary: 'Send a code to a phone number to add it to your account', body: PhoneSendBody, response: withProblems({ 200: OtpSentResponse }) },
    handler: async (request) => otpSend('phone', 'link')(request, request.body.phoneNumber),
  });

  app.post('/v1/auth/link/phone/verify', {
    config: { policy: linkPolicy() },
    schema: { tags: ['auth'], summary: 'Verify the code and add the phone number to your account', body: LinkVerifyPhone, response: withProblems({ 200: MethodsResponse }) },
    handler: async (request) => {
      const auth = request.auth!;
      const phone = await services.otp.verify('phone', request.body.phoneNumber, 'link', request.body.code, ctxOf(request));
      await services.identity.linkPhone(auth.user, phone, ctxOf(request));
      return services.identity.methods(auth.user.id);
    },
  });

  app.post('/v1/auth/link/email/send-otp', {
    config: { policy: linkPolicy() },
    schema: { tags: ['auth'], summary: 'Send a code to an email address to add it to your account', body: EmailSendBody, response: withProblems({ 200: OtpSentResponse }) },
    handler: async (request) => otpSend('email', 'link')(request, request.body.email),
  });

  app.post('/v1/auth/link/email/verify', {
    config: { policy: linkPolicy() },
    schema: { tags: ['auth'], summary: 'Verify the code and add the email address to your account', body: LinkVerifyEmail, response: withProblems({ 200: MethodsResponse }) },
    handler: async (request) => {
      const auth = request.auth!;
      const email = await services.otp.verify('email', request.body.email, 'link', request.body.code, ctxOf(request));
      await services.identity.linkEmail(auth.user, email, ctxOf(request));
      return services.identity.methods(auth.user.id);
    },
  });

  app.post('/v1/auth/unlink', {
    config: { policy: { ...linkPolicy(), roles: MEMBER_ROLES } },
    schema: { tags: ['auth'], summary: 'Remove a sign-in method (never the last one)', body: UnlinkBody, response: withProblems({ 200: MethodsResponse }) },
    handler: async (request) => {
      const auth = request.auth!;
      await services.identity.unlink(auth.user, request.body.method, ctxOf(request));
      return services.identity.methods(auth.user.id);
    },
  });
}
