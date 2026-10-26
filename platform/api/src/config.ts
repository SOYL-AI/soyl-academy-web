/**
 * Configuration: read from the environment once at startup and validated with zod. The server
 * refuses to start on invalid config. Secrets come from env (Key Vault references in Azure); the
 * local/test defaults below are obviously fake development values (GEN-1) and are refused outside
 * `local`/`test`.
 */
import { z } from 'zod/v4';
import { OAUTH, OTP } from '@soyl/shared/config/security';

export const APP_ENVS = ['local', 'test', 'dev', 'stg', 'prod'] as const;
export type AppEnv = (typeof APP_ENVS)[number];

/** Development-only secrets. Public on purpose (this repo is public); rejected outside local/test. */
export const DEV_DEFAULTS = {
  edgeSecret: 'local-dev-edge-secret-not-for-deployment-000000',
  authSecret: 'local-dev-auth-secret-not-for-deployment-000000',
  otpPepper: 'local-dev-otp-pepper-not-for-deployment-0000000',
  googleClientId: 'soyl-local-mock-client',
  googleClientSecret: 'soyl-local-mock-client-secret',
} as const;

const csv = z
  .string()
  .optional()
  .transform((v) =>
    (v ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  );

const bool = z
  .string()
  .optional()
  .transform((v) => v === 'true' || v === '1');

const secret = (min: number) => z.string().min(min, `must be at least ${min} characters`);

const EnvSchema = z.object({
  APP_ENV: z.enum(APP_ENVS).default('local'),
  NODE_ENV: z.string().optional(),
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

  /** GEN-4: API routes other than health return 404 unless this is on. */
  PLATFORM_ENABLED: bool,
  NEXT_PUBLIC_PLATFORM_ENABLED: bool,

  /** API-1: the public origin. Every absolute URL the API emits is built from this, never from Host. */
  PUBLIC_BASE_URL: z.url().optional(),
  /** Path on the public origin that the web tier proxies to this API (ADR-005). */
  API_PUBLIC_PATH: z.string().regex(/^\/[a-z0-9/_-]*[a-z0-9]$/).default('/api/platform'),
  /** AUTH-12: exact Origin allowlist (comma-separated). Default: the origin of PUBLIC_BASE_URL. */
  ALLOWED_ORIGINS: csv,

  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),

  /** API-2 / D-016: one or two current edge secrets (comma-separated, rotation). */
  EDGE_SECRETS: csv,
  /** API-3: header carrying the client IP, set by the web proxy (ADR-005). Trusted only after edge auth. */
  CLIENT_IP_HEADER: z.string().default('x-soyl-client-ip'),

  AUTH_SECRET: z.string().optional(),
  OTP_PEPPER: z.string().optional(),
  SMS_GLOBAL_HOURLY_CAP: z.coerce.number().int().min(0).default(OTP.send.phone.globalHourlyCap),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  /** OIDC issuer; discovery is `${issuer}/.well-known/openid-configuration` and `iss` is checked against it. */
  GOOGLE_ISSUER: z.url().default(OAUTH.googleIssuer),
  /** AUTH-11: Google Workspace domains whose accounts may hold reviewer/admin roles. */
  ADMIN_GOOGLE_DOMAINS: csv,

  SMS_PROVIDER: z.enum(['mock', 'msg91']).default('mock'),
  SMS_PROVIDER_API_KEY: z.string().optional(),
  SMS_SENDER_ID: z.string().optional(),
  /** JSON object: { "otp": "<DLT template id>", "notice": "<DLT template id>" }. */
  SMS_DLT_TEMPLATE_IDS: z.string().optional(),
  MSG91_BASE_URL: z.url().default('https://control.msg91.com'),

  EMAIL_PROVIDER: z.enum(['mock', 'acs']).default('mock'),
  EMAIL_FROM: z.string().default('SOYL Academy <no-reply@soylai.com>'),
  ACS_EMAIL_ENDPOINT: z.url().optional(),
  ACS_EMAIL_ACCESS_KEY: z.string().optional(),

  CONSENT_PROVIDER: z.enum(['mock']).default('mock'),
  MOCK_CONSENT_DEFAULT: z.enum(['required', 'pending', 'granted', 'revoked']).default('required'),

  ACADEMIC_YEAR: z.string().regex(/^\d{4}-\d{2}$/).default('2026-27'),
  /** Local/test only: expose the mock OTP outbox for allow-listed test identifiers (ADR-002). */
  DEV_OTP_OUTBOX: bool,
});

export interface Config {
  appEnv: AppEnv;
  isProduction: boolean;
  /** local or test: development defaults and dev-only helpers are allowed. */
  isLocal: boolean;
  port: number;
  host: string;
  logLevel: string;
  platformEnabled: boolean;
  publicBaseUrl: string;
  publicOrigin: string;
  apiPublicPath: string;
  /** Public URL prefix of the API, e.g. https://www.soylai.com/api/platform. */
  apiPublicUrl: string;
  allowedOrigins: string[];
  secureCookies: boolean;
  databaseUrl: string | undefined;
  redisUrl: string | undefined;
  edgeSecrets: string[];
  clientIpHeader: string;
  authSecret: string;
  otpPepper: string;
  smsGlobalHourlyCap: number;
  google: {
    clientId: string;
    clientSecret: string;
    issuer: string;
    redirectUri: string;
    adminDomains: string[];
  };
  sms: { provider: 'mock' | 'msg91'; apiKey?: string; senderId?: string; templateIds: Record<string, string>; baseUrl: string };
  email: { provider: 'mock' | 'acs'; from: string; acsEndpoint?: string; acsAccessKey?: string };
  consent: { provider: 'mock'; mockDefault: 'required' | 'pending' | 'granted' | 'revoked' };
  academicYear: string;
  devOtpOutbox: boolean;
}

export class ConfigError extends Error {
  constructor(public readonly problems: string[]) {
    super(`Invalid configuration:\n  - ${problems.join('\n  - ')}`);
    this.name = 'ConfigError';
  }
}

export function loadConfig(env: Record<string, string | undefined> = process.env): Config {
  const parsed = EnvSchema.safeParse(env);
  if (!parsed.success) {
    throw new ConfigError(parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`));
  }
  const e = parsed.data;
  const problems: string[] = [];
  const isLocal = e.APP_ENV === 'local' || e.APP_ENV === 'test';
  const isProduction = e.APP_ENV === 'prod';

  const need = (name: string, value: string | undefined, devDefault?: string): string => {
    if (value) return value;
    if (isLocal && devDefault !== undefined) return devDefault;
    problems.push(`${name} is required when APP_ENV=${e.APP_ENV}`);
    return '';
  };

  const publicBaseUrl = (need('PUBLIC_BASE_URL', e.PUBLIC_BASE_URL, 'http://localhost:3000') || 'http://localhost:3000').replace(/\/+$/, '');
  const publicOrigin = new URL(publicBaseUrl).origin;
  const secureCookies = publicOrigin.startsWith('https://');
  if (!isLocal && !secureCookies) problems.push('PUBLIC_BASE_URL must be https outside local/test');

  const edgeSecrets = e.EDGE_SECRETS.length ? e.EDGE_SECRETS : isLocal ? [DEV_DEFAULTS.edgeSecret] : [];
  if (!edgeSecrets.length) problems.push(`EDGE_SECRETS is required when APP_ENV=${e.APP_ENV}`);
  if (edgeSecrets.length > 2) problems.push('EDGE_SECRETS accepts at most two secrets (current + next)');
  for (const s of edgeSecrets) if (s.length < 32) problems.push('each EDGE_SECRETS entry must be at least 32 characters');

  const authSecret = need('AUTH_SECRET', e.AUTH_SECRET, DEV_DEFAULTS.authSecret);
  const otpPepper = need('OTP_PEPPER', e.OTP_PEPPER, DEV_DEFAULTS.otpPepper);
  if (authSecret && !secret(32).safeParse(authSecret).success) problems.push('AUTH_SECRET must be at least 32 characters');
  if (otpPepper && !secret(32).safeParse(otpPepper).success) problems.push('OTP_PEPPER must be at least 32 characters');
  if (!isLocal) {
    for (const [name, value, dev] of [
      ['EDGE_SECRETS', edgeSecrets.join(','), DEV_DEFAULTS.edgeSecret],
      ['AUTH_SECRET', authSecret, DEV_DEFAULTS.authSecret],
      ['OTP_PEPPER', otpPepper, DEV_DEFAULTS.otpPepper],
    ] as const)
      if (value.includes(dev)) problems.push(`${name} uses the public development default; set a real secret`);
  }

  if (!e.DATABASE_URL && !isLocal) problems.push(`DATABASE_URL is required when APP_ENV=${e.APP_ENV}`);
  // A per-process memory store is wrong with more than one replica: limits and OTP state must be shared.
  if (!e.REDIS_URL && (e.APP_ENV === 'stg' || e.APP_ENV === 'prod')) problems.push(`REDIS_URL is required when APP_ENV=${e.APP_ENV}`);

  let templateIds: Record<string, string> = {};
  if (e.SMS_DLT_TEMPLATE_IDS) {
    try {
      templateIds = z.record(z.string(), z.string()).parse(JSON.parse(e.SMS_DLT_TEMPLATE_IDS));
    } catch {
      problems.push('SMS_DLT_TEMPLATE_IDS must be a JSON object of template ids');
    }
  }
  if (e.SMS_PROVIDER === 'msg91') {
    if (!e.SMS_PROVIDER_API_KEY) problems.push('SMS_PROVIDER_API_KEY is required for SMS_PROVIDER=msg91');
    if (!templateIds.otp) problems.push('SMS_DLT_TEMPLATE_IDS.otp is required for SMS_PROVIDER=msg91');
  }
  if (e.EMAIL_PROVIDER === 'acs' && (!e.ACS_EMAIL_ENDPOINT || !e.ACS_EMAIL_ACCESS_KEY))
    problems.push('ACS_EMAIL_ENDPOINT and ACS_EMAIL_ACCESS_KEY are required for EMAIL_PROVIDER=acs');

  const apiPublicUrl = `${publicBaseUrl}${e.API_PUBLIC_PATH}`;
  const allowedOrigins = e.ALLOWED_ORIGINS.length ? e.ALLOWED_ORIGINS : [publicOrigin];
  for (const o of allowedOrigins) {
    // AUTH-12: exact origins only, never wildcards such as *.vercel.app.
    if (o.includes('*') || o !== safeOrigin(o)) problems.push(`ALLOWED_ORIGINS entry "${o}" must be an exact origin like https://www.soylai.com`);
  }

  const googleClientId = need('GOOGLE_CLIENT_ID', e.GOOGLE_CLIENT_ID, DEV_DEFAULTS.googleClientId);
  const googleClientSecret = need('GOOGLE_CLIENT_SECRET', e.GOOGLE_CLIENT_SECRET, DEV_DEFAULTS.googleClientSecret);
  if (isProduction && e.GOOGLE_ISSUER !== OAUTH.googleIssuer)
    problems.push(`GOOGLE_ISSUER must be ${OAUTH.googleIssuer} in production (GEN-3: no mock OAuth)`);
  if (!isLocal && !e.GOOGLE_ISSUER.startsWith('https://')) problems.push('GOOGLE_ISSUER must be https outside local/test');

  const devOtpOutbox = e.DEV_OTP_OUTBOX && isLocal;
  if (e.DEV_OTP_OUTBOX && !isLocal) problems.push('DEV_OTP_OUTBOX is only allowed when APP_ENV is local or test');

  if (problems.length) throw new ConfigError(problems);

  return {
    appEnv: e.APP_ENV,
    isProduction,
    isLocal,
    port: e.PORT,
    host: e.HOST,
    logLevel: e.LOG_LEVEL,
    platformEnabled: e.PLATFORM_ENABLED || e.NEXT_PUBLIC_PLATFORM_ENABLED,
    publicBaseUrl,
    publicOrigin,
    apiPublicPath: e.API_PUBLIC_PATH,
    apiPublicUrl,
    allowedOrigins,
    secureCookies,
    databaseUrl: e.DATABASE_URL,
    redisUrl: e.REDIS_URL,
    edgeSecrets,
    clientIpHeader: e.CLIENT_IP_HEADER.toLowerCase(),
    authSecret,
    otpPepper,
    smsGlobalHourlyCap: e.SMS_GLOBAL_HOURLY_CAP,
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      issuer: e.GOOGLE_ISSUER.replace(/\/+$/, ''),
      // AUTH-6 / API-1: exact redirect URI built from config, never from the request.
      redirectUri: `${apiPublicUrl}/v1/auth/google/callback`,
      adminDomains: e.ADMIN_GOOGLE_DOMAINS.map((d) => d.toLowerCase()),
    },
    sms: {
      provider: e.SMS_PROVIDER,
      apiKey: e.SMS_PROVIDER_API_KEY,
      senderId: e.SMS_SENDER_ID,
      templateIds,
      baseUrl: e.MSG91_BASE_URL,
    },
    email: { provider: e.EMAIL_PROVIDER, from: e.EMAIL_FROM, acsEndpoint: e.ACS_EMAIL_ENDPOINT, acsAccessKey: e.ACS_EMAIL_ACCESS_KEY },
    consent: { provider: e.CONSENT_PROVIDER, mockDefault: e.MOCK_CONSENT_DEFAULT },
    academicYear: e.ACADEMIC_YEAR,
    devOtpOutbox,
  };
}

function safeOrigin(o: string): string | null {
  try {
    return new URL(o).origin;
  } catch {
    return null;
  }
}
