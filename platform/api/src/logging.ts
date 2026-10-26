/**
 * Logging (API-14, API-15, AUTH-14, GEN-6).
 *
 * - pino JSON lines (values JSON-encoded: no log injection), UTC ISO-8601 timestamps.
 * - Request/response serializers log method, path WITHOUT query string, route, status, client IP and
 *   a hash of the user agent. Headers and bodies are never logged.
 * - `redact` + a key scrubber remove any field named otp|code|token|secret|password|key (and names
 *   ending in Token/Secret/Password/Otp), cookies, authorization, the edge secret and signatures.
 * - Security events: `securityEvent(log, event, fields)` logs at warn with `security: true` (API-15).
 * - Auth events: `authEvent(log, event, fields)` logs at info with `auth: true` and masked identifiers (AUTH-14).
 */
import { createHash } from 'node:crypto';
import type { FastifyBaseLogger, FastifyReply, FastifyRequest } from 'fastify';
import type { LoggerOptions, DestinationStream } from 'pino';
import { maskIdentifier } from '@soyl/shared/config/security';

const SENSITIVE_KEY = /^(otp|code|token|secret|password|key|cookie|authorization|set-cookie|x-soyl-edge-auth|x-razorpay-signature|pepper)$|(token|secret|password|otp|pepper)$/i;

export const REDACT_PATHS = [
  'req.headers.cookie',
  'req.headers.authorization',
  'req.headers["x-soyl-edge-auth"]',
  'req.headers["x-razorpay-signature"]',
  'res.headers["set-cookie"]',
  'headers.cookie',
  'headers.authorization',
  'headers["x-soyl-edge-auth"]',
  'body',
  'req.body',
];

/** Deep-copies `value`, replacing sensitive keys with "[redacted]". Bounded depth. */
export function scrub(value: unknown, depth = 0): unknown {
  if (depth > 6 || value === null || typeof value !== 'object') return value;
  if (value instanceof Error) return value;
  if (Array.isArray(value)) return value.slice(0, 50).map((v) => scrub(v, depth + 1));
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = SENSITIVE_KEY.test(k) ? '[redacted]' : scrub(v, depth + 1);
  }
  return out;
}

export function pathWithoutQuery(url: string | undefined): string {
  if (!url) return '';
  const i = url.search(/[?#]/);
  return i === -1 ? url : url.slice(0, i);
}

export function hashUserAgent(ua: string | undefined): string | undefined {
  if (!ua) return undefined;
  return createHash('sha256').update(ua).digest('base64url').slice(0, 16);
}

export function loggerOptions(level: string, stream?: DestinationStream): LoggerOptions & { stream?: DestinationStream } {
  return {
    level,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    messageKey: 'msg',
    base: { service: 'soyl-api' },
    redact: { paths: REDACT_PATHS, censor: '[redacted]' },
    formatters: {
      level: (label) => ({ level: label }),
      log: (obj) => scrub(obj) as Record<string, unknown>,
    },
    serializers: {
      req: (req: FastifyRequest) => ({
        method: req.method,
        url: pathWithoutQuery(req.url),
        route: req.routeOptions?.url,
        ip: (req as { clientIp?: string }).clientIp ?? req.ip,
        uaHash: hashUserAgent(req.headers?.['user-agent']),
      }),
      res: (res: FastifyReply) => ({ statusCode: res.statusCode }),
      err: (err: Error & { code?: unknown; statusCode?: number }) => ({
        type: err.name,
        // Library messages can carry SQL or provider bodies: keep them out of info-level fields but
        // useful for debugging at error level; they never reach responses (API-13).
        message: typeof err.message === 'string' ? err.message.slice(0, 500) : undefined,
        statusCode: err.statusCode,
        stack: err.stack?.split('\n').slice(0, 8).join('\n'),
      }),
    },
    ...(stream ? { stream } : {}),
  };
}

export type SecurityEventName =
  | 'edge_auth_failed'
  | 'origin_rejected'
  | 'content_type_rejected'
  | 'authz_denied'
  | 'rate_limited'
  | 'rate_limit_store_unavailable'
  | 'otp_lockout'
  | 'otp_global_cap_reached'
  | 'account_creation_ip_soft_limit'
  | 'oauth_state_mismatch'
  | 'oauth_failed'
  | 'consent_denied'
  | 'staff_sign_in_refused';

/** API-15: security events at warn with security=true. */
export function securityEvent(log: FastifyBaseLogger, event: SecurityEventName, fields: Record<string, unknown> = {}): void {
  log.warn({ security: true, event, ...fields }, `security: ${event}`);
}

export type AuthEventName =
  | 'otp_send'
  | 'otp_verify'
  | 'otp_lockout'
  | 'login'
  | 'login_failed'
  | 'logout'
  | 'session_revoked'
  | 'sessions_revoked_all'
  | 'link'
  | 'unlink'
  | 'account_created'
  | 'account_deleted'
  | 'role_change';

export interface AuthEventFields {
  outcome: 'success' | 'failure' | 'refused';
  userId?: string | null;
  identifier?: string | null;
  method?: 'phone' | 'email' | 'google';
  ip?: string;
  userAgent?: string;
  reason?: string;
  [extra: string]: unknown;
}

/** AUTH-14: every auth event with user id, masked identifier, IP, user-agent hash and outcome. */
export function authEvent(log: FastifyBaseLogger, event: AuthEventName, f: AuthEventFields): void {
  const { identifier, userAgent, ...rest } = f;
  log.info(
    {
      auth: true,
      event,
      ...rest,
      identifier: identifier ? maskIdentifier(identifier) : undefined,
      uaHash: hashUserAgent(userAgent),
    },
    `auth: ${event} ${f.outcome}`,
  );
}
