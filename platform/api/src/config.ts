/**
 * Configuration: read from the environment once at startup and validated with zod. The server
 * refuses to start on invalid config. Secrets come from env (Key Vault references in Azure); the
 * local/test defaults below are obviously fake development values (GEN-1) and are refused outside
 * `local`/`test`.
 */
import { z } from 'zod/v4';
import { CONSENT_PROVIDERS, OAUTH, OTP, type ConsentProviderName } from '@soyl/shared/config/security';
import { COIN_STORE } from '@soyl/shared/config/coins';
import { loadBillingConfig, type BillingConfig } from './billing/config';

export const APP_ENVS = ['local', 'test', 'dev', 'stg', 'prod'] as const;
export type AppEnv = (typeof APP_ENVS)[number];

/** AUTH-1 sign-in methods. AUTH_METHODS turns them on (D-031: production starts with email only). */
export const AUTH_METHODS = ['email', 'phone', 'google'] as const;
export type AuthMethod = (typeof AUTH_METHODS)[number];

/** Development-only secrets. Public on purpose (this repo is public); rejected outside local/test. */
export const DEV_DEFAULTS = {
  edgeSecret: 'local-dev-edge-secret-not-for-deployment-000000', // gitleaks:allow (public dev placeholder, refused outside local/test)
  authSecret: 'local-dev-auth-secret-not-for-deployment-000000', // gitleaks:allow (public dev placeholder, refused outside local/test)
  otpPepper: 'local-dev-otp-pepper-not-for-deployment-0000000', // gitleaks:allow (public dev placeholder, refused outside local/test)
  googleClientId: 'soyl-local-mock-client', // gitleaks:allow (mock OIDC client id, refused outside local/test)
  googleClientSecret: 'soyl-local-mock-client-secret', // gitleaks:allow (mock OIDC client secret, refused outside local/test)
  /** 32 bytes, base64url of "local-dev-mfa-key-not-for-deploy". AUTH-11 TOTP secret encryption key (development only). */
  mfaEncryptionKey: 'bG9jYWwtZGV2LW1mYS1rZXktbm90LWZvci1kZXBsb3k', // gitleaks:allow (public dev placeholder, refused outside local/test)
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
  /** INFRA-2: `entra` = DATABASE_URL has no password; each new connection uses a managed-identity token. */
  DATABASE_AUTH: z.enum(['password', 'entra']).default('password'),
  /** API connection pool size (§16 capacity; one API replica). */
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(200).default(10),
  REDIS_URL: z.string().optional(),
  /** INFRA-3: `entra` = Azure Managed Redis with a managed-identity token as the AUTH password. */
  REDIS_AUTH: z.enum(['none', 'entra']).default('none'),
  /** REDIS_AUTH=entra: the managed identity's object (principal) id, the Redis ACL username. */
  REDIS_USERNAME: z.string().optional(),

  /** API-2 / D-016: one or two current edge secrets (comma-separated, rotation). */
  EDGE_SECRETS: csv,
  /** Key Vault form of EDGE_SECRETS (Container Apps secret refs): current + previous during rotation. */
  EDGE_SECRET_CURRENT: z.string().optional(),
  EDGE_SECRET_PREVIOUS: z.string().optional(),
  /** API-3: header carrying the client IP, set by the web proxy (ADR-005). Trusted only after edge auth. */
  CLIENT_IP_HEADER: z.string().default('x-soyl-client-ip'),

  /** AUTH-1: enabled sign-in methods, comma-separated (email,phone,google). Others answer 404 method_disabled. */
  AUTH_METHODS: z.string().default('email,phone,google'),

  AUTH_SECRET: z.string().optional(),
  OTP_PEPPER: z.string().optional(),
  /** AUTH-11: 32-byte key (base64 or base64url) that encrypts staff TOTP secrets at rest (Key Vault). */
  MFA_ENCRYPTION_KEY: z.string().optional(),
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
  /** Sender address; must be a sender username of the ACS domain (D-031: noreply@soylai.com). */
  EMAIL_FROM: z.string().default('SOYL Academy <noreply@soylai.com>'),
  /** ACS resource endpoint, e.g. https://acs-soyl-prod-xxxxxx.india.communication.azure.com */
  ACS_ENDPOINT: z.url().optional(),
  /** Deprecated alias of ACS_ENDPOINT. */
  ACS_EMAIL_ENDPOINT: z.url().optional(),
  /** Access-key auth (local tests against a real resource only). Production uses the managed identity. */
  ACS_EMAIL_ACCESS_KEY: z.string().optional(),

  /**
   * CONSENT_PROVIDERS (@soyl/shared/config/security):
   * - `builtin`: the interim built-in provider (D-039, ADR-022): age band; 18+ self-declares; under 18 needs a
   *   parent's emailed approval code. Allowed in prod (needs EMAIL_PROVIDER=acs there).
   * - `unavailable`: no consent system yet (D-031): every account stays `pending`, every consent-gated
   *   feature (D-014) is off.
   * - `mock`: local/test/stg only (refused in prod, GEN-3).
   */
  CONSENT_PROVIDER: z.enum(CONSENT_PROVIDERS).default('mock'),
  MOCK_CONSENT_DEFAULT: z.enum(['required', 'pending', 'granted', 'revoked']).default('required'),

  ACADEMIC_YEAR: z.string().regex(/^\d{4}-\d{2}$/).default('2026-27'),
  /** Local/test only: expose the mock OTP outbox for allow-listed test identifiers (ADR-002). */
  DEV_OTP_OUTBOX: bool,
  /** SOYL Coins (ADR-021): physical merch redemption. Default COIN_STORE.physicalRedemptionEnabled (off until OA-19). */
  COINS_PHYSICAL_REDEMPTION_ENABLED: z.enum(['true', 'false', '1', '0']).optional(),
  /** SOYL Coins (D-038): master switch for every redemption. Default COIN_STORE.redemptionEnabled (off at launch). */
  COINS_REDEMPTION_ENABLED: z.enum(['true', 'false', '1', '0']).optional(),
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
  databaseAuth: 'password' | 'entra';
  databasePoolMax: number;
  redisUrl: string | undefined;
  redis: { auth: 'none' | 'entra'; username?: string };
  /** AUTH-1: enabled sign-in methods. */
  authMethods: AuthMethod[];
  edgeSecrets: string[];
  clientIpHeader: string;
  authSecret: string;
  otpPepper: string;
  /** AUTH-11: AES-256-GCM key for user_mfa.totp_secret_enc. */
  mfaEncryptionKey: Buffer;
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
  consent: { provider: ConsentProviderName; mockDefault: 'required' | 'pending' | 'granted' | 'revoked' };
  academicYear: string;
  devOtpOutbox: boolean;
  /** Razorpay billing (billing/config.ts, ADR-016). */
  billing: BillingConfig;
  /** SOYL Coins (ADR-021). */
  coins: { redemptionEnabled: boolean; physicalRedemptionEnabled: boolean };
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

  const authMethods: AuthMethod[] = [];
  for (const m of e.AUTH_METHODS.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)) {
    if (!(AUTH_METHODS as readonly string[]).includes(m)) problems.push(`AUTH_METHODS: unknown method "${m}" (allowed: ${AUTH_METHODS.join(', ')})`);
    else if (!authMethods.includes(m as AuthMethod)) authMethods.push(m as AuthMethod);
  }
  if (!authMethods.length) problems.push('AUTH_METHODS must enable at least one sign-in method');
  const enabled = (m: AuthMethod) => authMethods.includes(m);

  // EDGE_SECRETS, or the Key Vault pair EDGE_SECRET_CURRENT (+ EDGE_SECRET_PREVIOUS while rotating).
  const edgeFromPair = [...new Set([e.EDGE_SECRET_CURRENT, e.EDGE_SECRET_PREVIOUS].map((s) => s?.trim()).filter((s): s is string => Boolean(s)))];
  const configuredEdge = e.EDGE_SECRETS.length ? e.EDGE_SECRETS : edgeFromPair;
  const edgeSecrets = configuredEdge.length ? configuredEdge : isLocal ? [DEV_DEFAULTS.edgeSecret] : [];
  if (!edgeSecrets.length) problems.push(`EDGE_SECRETS is required when APP_ENV=${e.APP_ENV} (or EDGE_SECRET_CURRENT from Key Vault)`);
  if (edgeSecrets.length > 2) problems.push('EDGE_SECRETS accepts at most two secrets (current + next)');
  for (const s of edgeSecrets) if (s.length < 32) problems.push('each EDGE_SECRETS entry must be at least 32 characters');

  const authSecret = need('AUTH_SECRET', e.AUTH_SECRET, DEV_DEFAULTS.authSecret);
  const otpPepper = need('OTP_PEPPER', e.OTP_PEPPER, DEV_DEFAULTS.otpPepper);
  if (authSecret && !secret(32).safeParse(authSecret).success) problems.push('AUTH_SECRET must be at least 32 characters');
  if (otpPepper && !secret(32).safeParse(otpPepper).success) problems.push('OTP_PEPPER must be at least 32 characters');
  const mfaKeyRaw = need('MFA_ENCRYPTION_KEY', e.MFA_ENCRYPTION_KEY, DEV_DEFAULTS.mfaEncryptionKey);
  const mfaEncryptionKey = Buffer.from(mfaKeyRaw.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  if (mfaKeyRaw && mfaEncryptionKey.length !== 32) problems.push('MFA_ENCRYPTION_KEY must be 32 bytes, base64-encoded');
  // Google settings are only required while Google sign-in is enabled (D-031: not configured yet).
  const googleClientId = enabled('google') ? need('GOOGLE_CLIENT_ID', e.GOOGLE_CLIENT_ID, DEV_DEFAULTS.googleClientId) : (e.GOOGLE_CLIENT_ID ?? '');
  const googleClientSecret = enabled('google') ? need('GOOGLE_CLIENT_SECRET', e.GOOGLE_CLIENT_SECRET, DEV_DEFAULTS.googleClientSecret) : (e.GOOGLE_CLIENT_SECRET ?? '');
  // GEN-1/GEN-3: outside local/test no value may be (or contain) a public development default.
  if (!isLocal) {
    for (const [name, value, dev] of [
      ['EDGE_SECRETS', edgeSecrets.join(','), DEV_DEFAULTS.edgeSecret],
      ['AUTH_SECRET', authSecret, DEV_DEFAULTS.authSecret],
      ['OTP_PEPPER', otpPepper, DEV_DEFAULTS.otpPepper],
      ['MFA_ENCRYPTION_KEY', mfaKeyRaw, DEV_DEFAULTS.mfaEncryptionKey],
      ['GOOGLE_CLIENT_ID', googleClientId, DEV_DEFAULTS.googleClientId],
      ['GOOGLE_CLIENT_SECRET', googleClientSecret, DEV_DEFAULTS.googleClientSecret],
    ] as const)
      if (value && value.includes(dev)) problems.push(`${name} uses the public development default; set a real secret`);
  }

  if (!e.DATABASE_URL && !isLocal) problems.push(`DATABASE_URL is required when APP_ENV=${e.APP_ENV}`);
  // A per-process memory store is wrong with more than one replica: limits and OTP state must be shared.
  if (!e.REDIS_URL && (e.APP_ENV === 'stg' || e.APP_ENV === 'prod')) problems.push(`REDIS_URL is required when APP_ENV=${e.APP_ENV}`);
  if (e.REDIS_AUTH === 'entra') {
    if (!e.REDIS_USERNAME) problems.push('REDIS_USERNAME (the managed identity object id) is required for REDIS_AUTH=entra');
    if (e.REDIS_URL && !e.REDIS_URL.startsWith('rediss://')) problems.push('REDIS_URL must use rediss:// (TLS) with REDIS_AUTH=entra');
  }

  let templateIds: Record<string, string> = {};
  if (e.SMS_DLT_TEMPLATE_IDS) {
    try {
      templateIds = z.record(z.string(), z.string()).parse(JSON.parse(e.SMS_DLT_TEMPLATE_IDS));
    } catch {
      problems.push('SMS_DLT_TEMPLATE_IDS must be a JSON object of template ids');
    }
  }
  if (e.SMS_PROVIDER === 'msg91' && enabled('phone')) {
    if (!e.SMS_PROVIDER_API_KEY) problems.push('SMS_PROVIDER_API_KEY is required for SMS_PROVIDER=msg91');
    if (!templateIds.otp) problems.push('SMS_DLT_TEMPLATE_IDS.otp is required for SMS_PROVIDER=msg91');
  }
  const acsEndpoint = e.ACS_ENDPOINT ?? e.ACS_EMAIL_ENDPOINT;
  if (e.EMAIL_PROVIDER === 'acs') {
    if (!acsEndpoint) problems.push('ACS_ENDPOINT is required for EMAIL_PROVIDER=acs');
    else if (!acsEndpoint.startsWith('https://')) problems.push('ACS_ENDPOINT must be https');
    // Keyless (D-031): production sends with the managed identity, never an access key.
    if (isProduction && e.ACS_EMAIL_ACCESS_KEY) problems.push('ACS_EMAIL_ACCESS_KEY is not allowed in production; the API sends with its managed identity');
  }
  // GEN-3 for ENABLED methods (providers.ts refuses the mocks too; checked here so config fails first).
  if (isProduction && enabled('email') && e.EMAIL_PROVIDER === 'mock') problems.push('EMAIL_PROVIDER=mock cannot run with APP_ENV=prod while email sign-in is enabled (GEN-3)');
  if (isProduction && enabled('phone') && e.SMS_PROVIDER === 'mock') problems.push('SMS_PROVIDER=mock cannot run with APP_ENV=prod while phone sign-in is enabled (GEN-3)');
  if (isProduction && e.CONSENT_PROVIDER === 'mock')
    problems.push('CONSENT_PROVIDER=mock cannot run with APP_ENV=prod (GEN-3); use CONSENT_PROVIDER=builtin (D-039) or unavailable until the consent adapter exists (OA-08)');
  // The built-in provider emails parents: in production that must be a real sender (GEN-3).
  if (isProduction && e.CONSENT_PROVIDER === 'builtin' && e.EMAIL_PROVIDER !== 'acs')
    problems.push('CONSENT_PROVIDER=builtin needs EMAIL_PROVIDER=acs in production (it emails the parent approval code)');

  const apiPublicUrl = `${publicBaseUrl}${e.API_PUBLIC_PATH}`;
  const allowedOrigins = e.ALLOWED_ORIGINS.length ? e.ALLOWED_ORIGINS : [publicOrigin];
  for (const o of allowedOrigins) {
    // AUTH-12: exact origins only, never wildcards such as *.vercel.app.
    if (o.includes('*') || o !== safeOrigin(o)) problems.push(`ALLOWED_ORIGINS entry "${o}" must be an exact origin like https://www.soylai.com`);
  }

  if (isProduction && enabled('google') && e.GOOGLE_ISSUER !== OAUTH.googleIssuer)
    problems.push(`GOOGLE_ISSUER must be ${OAUTH.googleIssuer} in production (GEN-3: no mock OAuth)`);
  if (!isLocal && !e.GOOGLE_ISSUER.startsWith('https://')) problems.push('GOOGLE_ISSUER must be https outside local/test');

  const devOtpOutbox = e.DEV_OTP_OUTBOX && isLocal;
  if (e.DEV_OTP_OUTBOX && !isLocal) problems.push('DEV_OTP_OUTBOX is only allowed when APP_ENV is local or test');

  const billing = loadBillingConfig(env, { appEnv: e.APP_ENV, isLocal, isProduction });
  problems.push(...billing.problems);

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
    databaseAuth: e.DATABASE_AUTH,
    databasePoolMax: e.DATABASE_POOL_MAX,
    redisUrl: e.REDIS_URL,
    redis: { auth: e.REDIS_AUTH, username: e.REDIS_USERNAME },
    authMethods,
    edgeSecrets,
    clientIpHeader: e.CLIENT_IP_HEADER.toLowerCase(),
    authSecret,
    otpPepper,
    mfaEncryptionKey,
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
    email: { provider: e.EMAIL_PROVIDER, from: e.EMAIL_FROM, acsEndpoint, acsAccessKey: e.ACS_EMAIL_ACCESS_KEY },
    consent: { provider: e.CONSENT_PROVIDER, mockDefault: e.MOCK_CONSENT_DEFAULT },
    academicYear: e.ACADEMIC_YEAR,
    devOtpOutbox,
    billing: billing.config,
    coins: {
      redemptionEnabled:
        e.COINS_REDEMPTION_ENABLED === undefined ? COIN_STORE.redemptionEnabled : e.COINS_REDEMPTION_ENABLED === 'true' || e.COINS_REDEMPTION_ENABLED === '1',
      physicalRedemptionEnabled:
        e.COINS_PHYSICAL_REDEMPTION_ENABLED === undefined
          ? COIN_STORE.physicalRedemptionEnabled
          : e.COINS_PHYSICAL_REDEMPTION_ENABLED === 'true' || e.COINS_PHYSICAL_REDEMPTION_ENABLED === '1',
    },
  };
}

function safeOrigin(o: string): string | null {
  try {
    return new URL(o).origin;
  } catch {
    return null;
  }
}
