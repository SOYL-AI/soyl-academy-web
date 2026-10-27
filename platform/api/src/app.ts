/**
 * The Fastify application. `buildApp(deps)` is used by the server entry point, the tests and the
 * OpenAPI generator. Request pipeline (all before the body is parsed):
 *
 *   onRequest #1  flag (GEN-4) → edge auth for /v1/* (API-2) → trusted client IP (API-3)
 *   onRequest #2  route policy (API-6): CSRF Origin (AUTH-12) → IP limits → session → user limits
 *                 → roles → MFA → fresh session → consent (API-11)
 *   parsing       JSON only (415 otherwise), 64 KB default (API-5), depth/array checks
 *   validation    zod `.strict()` request schemas (API-8)
 *   serialisation zod response schemas strip unknown fields (API-9)
 *   onSend        security headers (API-4)
 *   errors        RFC 7807 problem+json with trace id (API-13)
 */
import { randomUUID } from 'node:crypto';
import Fastify, { type FastifyError, type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import swagger from '@fastify/swagger';
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  jsonSchemaTransform,
  jsonSchemaTransformObject,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import type { DestinationStream } from 'pino';
import { BODY_LIMITS, RATE_LIMITS, type RateLimitBucketName } from '@soyl/shared/config/security';
import './types';
import { ApiProblem, PROBLEM_CONTENT_TYPE, problemBody, type ProblemCode } from './errors';
import { EDGE_HEADER, matchEdgeSecret, trustedClientIp } from './http/edge';
import { registerJsonParser } from './http/json';
import { KvUnavailableError } from './kv';
import { loggerOptions, pathWithoutQuery, securityEvent } from './logging';
import { assertPolicy, type RoutePolicy } from './policy';
import { createServices, type AppDeps, type Services } from './services';
import { registerAuthRoutes } from './modules/auth';
import { registerSessionRoutes } from './modules/session';
import { registerMeRoutes } from './modules/me';
import { registerCatalogRoutes } from './modules/catalog';
import { registerHealthRoutes } from './modules/health';
import { CONTENT_PRIVATE_CACHE_CONTROL } from './http/cache';
import { registerDevRoutes } from './modules/dev';
import { registerContentRoutes } from './modules/content';
import { registerPracticeRoutes } from './modules/practice';
import { registerProgressRoutes } from './modules/progress';
import { registerReportRoutes } from './modules/reports';
import { registerMfaRoutes } from './modules/mfa';
import { registerAdminRoutes } from './modules/admin';
import { registerTestRoutes } from './modules/tests';
import { registerAiRoutes } from './ai/routes';

export const HEALTH_PATHS = new Set(['/healthz', '/readyz']);
const STATE_CHANGING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export interface BuildAppOptions {
  logStream?: DestinationStream;
  /** Tests register extra routes (e.g. an MFA-protected probe) before the app is sealed. */
  extraRoutes?: (app: FastifyInstance, services: Services) => void;
}

export interface RouteEntry {
  method: string;
  url: string;
  policy: RoutePolicy;
  hidden: boolean;
}

export type App = FastifyInstance & { services: Services; deps: AppDeps };

declare module 'fastify' {
  interface FastifyInstance {
    services: Services;
    deps: AppDeps;
    /** Every registered route and its policy (route-policy test, API-6). */
    routeTable: RouteEntry[];
  }
}

function sendProblem(request: FastifyRequest, reply: FastifyReply, code: ProblemCode, extra: ApiProblem['extra'] = {}) {
  const body = problemBody(code, String(request.id), extra);
  if (extra.headers) reply.headers(extra.headers);
  return reply.status(body.status).type(PROBLEM_CONTENT_TYPE).send(JSON.stringify(body));
}

export async function buildApp(deps: AppDeps, opts: BuildAppOptions = {}): Promise<App> {
  const { config } = deps;
  const app = Fastify({
    logger: loggerOptions(config.logLevel, opts.logStream),
    bodyLimit: BODY_LIMITS.defaultBytes,
    trustProxy: false, // API-3: X-Forwarded-* is never trusted
    genReqId: () => randomUUID(),
    requestIdHeader: false,
    exposeHeadRoutes: false,
    return503OnClosing: true,
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  registerJsonParser(app);

  const services = createServices(deps);
  app.decorate('services', services);
  app.decorate('deps', deps);
  app.decorateRequest('clientIp', '');
  app.decorateRequest('edgeSecretIndex', null);
  app.decorateRequest('auth', null);

  // API-6: no route without a valid policy. Throws during registration → the server cannot start.
  const routeTable: RouteEntry[] = [];
  app.decorate('routeTable', routeTable);
  app.addHook('onRoute', (route) => {
    const policy = assertPolicy(route.method, route.url, route.config?.policy);
    for (const method of [route.method].flat())
      routeTable.push({ method, url: route.url, policy, hidden: Boolean((route.schema as { hide?: boolean } | undefined)?.hide) });
  });

  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'SOYL Academy Learning Platform API',
        version: '1.0.0',
        description:
          'Called by the web tier through the same-origin proxy at /api/platform (ADR-005). Errors are RFC 7807 problem+json. Auth is a session cookie (__Host-soyl_session). State-changing requests need an allow-listed Origin and Content-Type: application/json.',
      },
      servers: [{ url: config.apiPublicPath, description: 'Same-origin proxy path on the web host' }],
      components: {
        securitySchemes: { session: { type: 'apiKey', in: 'cookie', name: '__Host-soyl_session' } },
      },
    },
    transform: jsonSchemaTransform,
    transformObject: jsonSchemaTransformObject,
  });

  // ---- onRequest #1: flag, edge auth, client IP -------------------------------------------------
  app.addHook('onRequest', async (request) => {
    request.clientIp = request.ip;
    const path = pathWithoutQuery(request.url);
    if (HEALTH_PATHS.has(path)) return;
    // GEN-4: with the flag off, everything except health is 404 (before revealing edge auth).
    if (!config.platformEnabled) throw new ApiProblem('not_found');
    if (path === '/v1' || path.startsWith('/v1/')) {
      const index = matchEdgeSecret(request.headers[EDGE_HEADER], config.edgeSecrets);
      if (index === null) {
        securityEvent(request.log, 'edge_auth_failed', { present: typeof request.headers[EDGE_HEADER] === 'string', ip: request.ip });
        throw new ApiProblem('edge_auth_failed');
      }
      request.edgeSecretIndex = index;
      // API-3: only after edge auth.
      request.clientIp = trustedClientIp(request.headers[config.clientIpHeader]) ?? request.ip;
    }
  });

  // ---- onRequest #2: route policy -----------------------------------------------------------------
  app.addHook('onRequest', async (request, reply) => {
    const policy = request.routeOptions.config?.policy as RoutePolicy | undefined;
    const path = pathWithoutQuery(request.url);
    if (!policy || HEALTH_PATHS.has(path)) return;

    // AUTH-12: exact Origin on state-changing methods.
    if (policy.csrf && STATE_CHANGING.has(request.method)) {
      const origin = request.headers.origin;
      if (typeof origin !== 'string' || !config.allowedOrigins.includes(origin)) {
        securityEvent(request.log, 'origin_rejected', { origin: typeof origin === 'string' ? origin.slice(0, 200) : null, route: request.routeOptions.url });
        throw new ApiProblem('origin_not_allowed');
      }
    }

    const limits = policy.rateLimit;
    const failClosed = limits !== false && Boolean(limits.failClosed);
    const runLimits = async (keyKind: 'ip' | 'user', subject: string) => {
      if (limits === false) return;
      const names = [keyKind === 'ip' ? 'api.ip' : 'api.user', ...(limits.buckets ?? [])] as RateLimitBucketName[];
      for (const name of names) {
        const bucket = RATE_LIMITS[name];
        if (bucket.key !== keyKind) continue;
        let r;
        try {
          r = await services.limiter.bucket(name, subject);
        } catch (err) {
          // API-16: auth/OTP fail closed; learning reads keep working.
          securityEvent(request.log, 'rate_limit_store_unavailable', { bucket: name, failClosed });
          if (failClosed) throw new ApiProblem('service_unavailable');
          if (err instanceof KvUnavailableError) return;
          return;
        }
        if (!r.allowed && !('soft' in bucket && bucket.soft)) {
          securityEvent(request.log, 'rate_limited', { bucket: name, ip: request.clientIp });
          const seconds = Math.max(1, Math.ceil(r.retryAfterMs / 1000));
          throw new ApiProblem('rate_limited', { retryAfterSeconds: seconds, headers: { 'retry-after': String(seconds) } });
        }
      }
    };

    await runLimits('ip', request.clientIp);
    request.auth = await services.sessions.resolve(request, reply);
    if (request.auth) await runLimits('user', request.auth.user.id);

    const auth = request.auth;
    if (!auth) {
      if (!policy.roles.includes('guest')) throw new ApiProblem('unauthenticated');
      return;
    }
    if (!policy.roles.includes(auth.user.role)) {
      securityEvent(request.log, 'authz_denied', { userId: auth.user.id, role: auth.user.role, route: request.routeOptions.url });
      throw new ApiProblem('forbidden');
    }
    // AUTH-11 (ADR-011): staff routes need a confirmed TOTP enrolment and a session that passed it.
    if (policy.mfa && !(await services.mfa.sessionVerified(auth.user.id, auth.session.id))) {
      securityEvent(request.log, 'authz_denied', { userId: auth.user.id, reason: 'mfa_required', route: request.routeOptions.url });
      throw new ApiProblem('mfa_required');
    }
    if (policy.fresh && !services.sessions.isFresh(auth.session)) throw new ApiProblem('fresh_session_required');
    if (policy.consent) {
      try {
        await services.consent.assertAllowed(auth.user.id, policy.consent);
      } catch (err) {
        if (err instanceof ApiProblem && err.code === 'consent_required')
          securityEvent(request.log, 'consent_denied', { userId: auth.user.id, feature: policy.consent });
        throw err;
      }
    }
  });

  // ---- onSend: API-4 headers ----------------------------------------------------------------------
  app.addHook('onSend', async (request, reply, payload) => {
    reply.header('x-content-type-options', 'nosniff');
    reply.header('referrer-policy', 'no-referrer');
    reply.header('content-security-policy', "default-src 'none'; frame-ancestors 'none'");
    reply.header('cross-origin-resource-policy', 'same-origin');
    reply.header('x-trace-id', String(request.id));
    // API-4: personal and error responses are never stored; only explicitly public reads (catalog, content) are cacheable.
    // Content reads are identical for everyone (ADR-010), so a signed-in reader may keep a private copy — unless
    // this response also refreshes the session cookie.
    const okStatus = reply.statusCode < 300 || reply.statusCode === 304;
    if (request.auth && okStatus && request.routeOptions.config?.cache === 'content' && reply.hasHeader('cache-control') && !reply.hasHeader('set-cookie'))
      reply.header('cache-control', CONTENT_PRIVATE_CACHE_CONTROL);
    else if (request.auth || !reply.hasHeader('cache-control') || !okStatus) reply.header('cache-control', 'no-store');
    return payload;
  });

  // ---- errors: API-13 ------------------------------------------------------------------------------
  app.setErrorHandler((error: FastifyError | ApiProblem | Error, request, reply) => {
    if (error instanceof ApiProblem) {
      if (error.status >= 500) request.log.warn({ problem: error.code }, 'request refused');
      return sendProblem(request, reply, error.code, error.extra);
    }
    if (hasZodFastifySchemaValidationErrors(error)) {
      const errors = error.validation.map((v) => ({
        path: [error.validationContext, ...String(v.instancePath ?? '').split('/').filter(Boolean)].join('.'),
        message: v.message ?? 'invalid',
      }));
      return sendProblem(request, reply, 'validation_failed', { errors: errors.slice(0, 20) });
    }
    const fe = error as FastifyError;
    if (fe.code === 'FST_ERR_CTP_BODY_TOO_LARGE' || fe.statusCode === 413) return sendProblem(request, reply, 'payload_too_large');
    if (fe.code === 'FST_ERR_CTP_INVALID_MEDIA_TYPE' || fe.statusCode === 415) {
      securityEvent(request.log, 'content_type_rejected', { contentType: String(request.headers['content-type'] ?? '').slice(0, 100) });
      return sendProblem(request, reply, 'unsupported_media_type');
    }
    if (error instanceof KvUnavailableError) {
      request.log.error({ err: error }, 'key-value store unavailable');
      return sendProblem(request, reply, 'service_unavailable');
    }
    if (isResponseSerializationError(error)) {
      request.log.error({ err: error }, 'response did not match its schema');
      return sendProblem(request, reply, 'internal');
    }
    if (fe.statusCode && fe.statusCode >= 400 && fe.statusCode < 500) return sendProblem(request, reply, 'bad_request');
    request.log.error({ err: error }, 'unhandled error');
    return sendProblem(request, reply, 'internal');
  });

  app.setNotFoundHandler((request, reply) => sendProblem(request, reply, 'not_found'));

  // ---- routes ---------------------------------------------------------------------------------------
  registerHealthRoutes(app, deps);
  registerAuthRoutes(app, services, deps);
  registerSessionRoutes(app, services);
  registerMeRoutes(app, services, deps);
  registerCatalogRoutes(app, deps);
  registerContentRoutes(app, deps);
  registerPracticeRoutes(app, deps);
  registerProgressRoutes(app, deps);
  registerReportRoutes(app, deps);
  registerMfaRoutes(app, services);
  registerAdminRoutes(app, deps);
  registerTestRoutes(app, deps, services);
  registerAiRoutes(app, deps, services);
  if (config.devOtpOutbox) registerDevRoutes(app, deps);
  opts.extraRoutes?.(app, services);

  await app.ready();
  return app as unknown as App;
}
