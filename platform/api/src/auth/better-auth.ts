/**
 * Better Auth (ADR-002) as the identity core: users, accounts and sessions through its Drizzle
 * adapter on the @soyl/db tables (plural names, uuid v7 ids), with the configuration proven in
 * platform/db/test/better-auth.test.ts.
 *
 * What is deliberately NOT used (ADR-002 has the reasons):
 * - Better Auth's HTTP handler. Every auth pathway is an explicit Fastify route with a declared
 *   policy, zod schemas and an OpenAPI entry (API-6, AUTH-1). Nothing else is mounted.
 * - the emailOTP / phoneNumber plugins (replaced by OtpService: HMAC storage AUTH-4, atomic attempt
 *   counting AC-01, one code path for both channels), the admin plugin (role changes only via audited
 *   admin action or bootstrap CLI, API-10; no impersonation), the bearer plugin (DB-4: session tokens
 *   are stored unhashed, so raw-token auth must never exist), Better Auth's rate limiter (ours runs on
 *   Redis with trusted IPs) and telemetry.
 * - its social providers / genericOAuth: Google uses openid-client so PKCE + state + nonce + ID-token
 *   validation and the AUTH-7 no-auto-link rule are explicit (auth/google.ts).
 */
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { schema, uuidv7, type Database } from '@soyl/db';
import { SESSION } from '@soyl/shared/config/security';
import type { Config } from '../config';

export function createBetterAuth(db: Database, config: Pick<Config, 'authSecret' | 'apiPublicUrl' | 'allowedOrigins' | 'secureCookies'>) {
  return betterAuth({
    appName: 'SOYL Academy',
    secret: config.authSecret,
    baseURL: config.apiPublicUrl,
    basePath: '/v1/auth',
    trustedOrigins: config.allowedOrigins,
    database: drizzleAdapter(db, { provider: 'pg', schema, usePlural: true }),
    telemetry: { enabled: false },
    rateLimit: { enabled: false },
    emailAndPassword: { enabled: false },
    session: {
      expiresIn: SESSION.lifetimes.member.inactivitySeconds,
      updateAge: SESSION.lifetimes.member.rollSeconds,
      // AUTH-8: no signed cookie cache; every request re-reads the session row (revocation is immediate).
      cookieCache: { enabled: false },
    },
    user: {
      additionalFields: {
        phoneNumber: { type: 'string', required: false, input: false },
        phoneNumberVerified: { type: 'boolean', required: false, defaultValue: false, input: false },
        role: { type: 'string', required: false, defaultValue: 'student', input: false },
        banned: { type: 'boolean', required: false, defaultValue: false, input: false },
        banReason: { type: 'string', required: false, input: false },
        banExpires: { type: 'date', required: false, input: false },
        deletedAt: { type: 'date', required: false, input: false },
      },
    },
    advanced: {
      database: { generateId: () => uuidv7() },
      useSecureCookies: config.secureCookies,
    },
  });
}

export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;
export type InternalAdapter = Awaited<BetterAuthInstance['$context']>['internalAdapter'];
