/**
 * Billing configuration (ARCHITECTURE §11.2, §19; ADR-016). Read with the rest of the API config
 * (config.ts calls loadBillingConfig) and by the worker for the reconciliation job.
 *
 *   BILLING_ENABLED              purchases open (CONTEXT §7). Off in production until the owner says so (D-003).
 *   RAZORPAY_PROVIDER            stub (local/test default; refused in prod, GEN-3) | razorpay | disabled
 *                                (default outside local/test). Webhooks, cancel and reconciliation work
 *                                whenever a provider is configured, even with BILLING_ENABLED=false (kill
 *                                switch: renewals and cancellations must keep flowing).
 *   RAZORPAY_KEY_ID              rzp_test_… outside prod (live keys only in prod Key Vault, ARCHITECTURE §11.2)
 *   RAZORPAY_KEY_SECRET          Key Vault `razorpay-key-secret`
 *   RAZORPAY_WEBHOOK_SECRET      Key Vault `razorpay-webhook-secret`
 *   RAZORPAY_WEBHOOK_SECRET_PREVIOUS  optional, during rotation (two valid at a time, AC-22)
 *   RAZORPAY_API_BASE_URL        default https://api.razorpay.com/v1
 */
import { readFlags } from '@soyl/shared/config/flags';

export const RAZORPAY_PROVIDERS = ['stub', 'razorpay', 'disabled'] as const;
export type RazorpayProviderName = (typeof RAZORPAY_PROVIDERS)[number];

/** Public development placeholders for the stub (this repo is public). Refused outside local/test. */
export const BILLING_DEV_DEFAULTS = {
  keyId: 'rzp_test_SoylLocalStub01', // gitleaks:allow (stub key id, not a Razorpay credential)
  keySecret: 'local-dev-razorpay-key-secret-not-for-deployment', // gitleaks:allow (public dev placeholder, refused outside local/test)
  webhookSecret: 'local-dev-razorpay-webhook-secret-not-for-deployment', // gitleaks:allow (public dev placeholder, refused outside local/test)
} as const;

export const RAZORPAY_API_BASE_URL = 'https://api.razorpay.com/v1';

export interface BillingConfig {
  /** BILLING_ENABLED: purchase endpoints accept new purchases. */
  enabled: boolean;
  provider: RazorpayProviderName;
  /** Public key id for Checkout (also NEXT_PUBLIC_RAZORPAY_KEY_ID on the web). Null when disabled. */
  keyId: string | null;
  keySecret: string | null;
  /** Current first, then the previous one during rotation. Empty when disabled. */
  webhookSecrets: string[];
  apiBaseUrl: string;
}

export interface BillingEnvContext {
  appEnv: string;
  isLocal: boolean;
  isProduction: boolean;
}

const KEY_ID = /^rzp_(test|live)_[A-Za-z0-9]{6,32}$/;

export function loadBillingConfig(env: Record<string, string | undefined>, ctx: BillingEnvContext): { config: BillingConfig; problems: string[] } {
  const problems: string[] = [];
  const val = (name: string) => {
    const v = env[name]?.trim();
    return v ? v : undefined;
  };
  const rawProvider = val('RAZORPAY_PROVIDER') ?? (ctx.isLocal ? 'stub' : 'disabled');
  let provider: RazorpayProviderName = 'disabled';
  if ((RAZORPAY_PROVIDERS as readonly string[]).includes(rawProvider)) provider = rawProvider as RazorpayProviderName;
  else problems.push(`RAZORPAY_PROVIDER must be one of ${RAZORPAY_PROVIDERS.join(', ')}`);

  const enabled = readFlags(env).billingEnabled;
  let keyId: string | null = null;
  let keySecret: string | null = null;
  let webhookSecrets: string[] = [];
  const apiBaseUrl = (val('RAZORPAY_API_BASE_URL') ?? RAZORPAY_API_BASE_URL).replace(/\/+$/, '');
  if (!ctx.isLocal && !apiBaseUrl.startsWith('https://')) problems.push('RAZORPAY_API_BASE_URL must be https outside local/test');

  const secrets = () => [val('RAZORPAY_WEBHOOK_SECRET'), val('RAZORPAY_WEBHOOK_SECRET_PREVIOUS')].filter((s): s is string => Boolean(s));

  if (provider === 'stub') {
    // GEN-3: the stub never runs in production.
    if (ctx.isProduction) problems.push('RAZORPAY_PROVIDER=stub cannot run with APP_ENV=prod (GEN-3)');
    keyId = val('RAZORPAY_KEY_ID') ?? BILLING_DEV_DEFAULTS.keyId;
    keySecret = val('RAZORPAY_KEY_SECRET') ?? BILLING_DEV_DEFAULTS.keySecret;
    webhookSecrets = secrets();
    if (!webhookSecrets.length) {
      if (ctx.isLocal) webhookSecrets = [BILLING_DEV_DEFAULTS.webhookSecret];
      else problems.push(`RAZORPAY_WEBHOOK_SECRET is required for the stub when APP_ENV=${ctx.appEnv}`);
    }
  } else if (provider === 'razorpay') {
    keyId = val('RAZORPAY_KEY_ID') ?? null;
    keySecret = val('RAZORPAY_KEY_SECRET') ?? null;
    webhookSecrets = secrets();
    if (!keyId) problems.push('RAZORPAY_KEY_ID is required for RAZORPAY_PROVIDER=razorpay');
    else if (!KEY_ID.test(keyId)) problems.push('RAZORPAY_KEY_ID must look like rzp_test_… or rzp_live_…');
    else if (keyId.startsWith('rzp_live_') && !ctx.isProduction) problems.push('live Razorpay keys are only allowed with APP_ENV=prod (ARCHITECTURE §11.2)');
    if (!keySecret) problems.push('RAZORPAY_KEY_SECRET is required for RAZORPAY_PROVIDER=razorpay');
    else if (keySecret.length < 16) problems.push('RAZORPAY_KEY_SECRET looks too short');
    if (!webhookSecrets.length) problems.push('RAZORPAY_WEBHOOK_SECRET is required for RAZORPAY_PROVIDER=razorpay');
  }
  for (const s of webhookSecrets) if (s.length < 16) problems.push('each Razorpay webhook secret must be at least 16 characters');
  if (webhookSecrets.length > 2) problems.push('at most two Razorpay webhook secrets (current + previous)');

  // GEN-1: no public development default outside local/test.
  if (!ctx.isLocal) {
    for (const [name, value, dev] of [
      ['RAZORPAY_KEY_SECRET', keySecret, BILLING_DEV_DEFAULTS.keySecret],
      ['RAZORPAY_WEBHOOK_SECRET', webhookSecrets.join(','), BILLING_DEV_DEFAULTS.webhookSecret],
    ] as const)
      if (value && value.includes(dev)) problems.push(`${name} uses the public development default; set a real secret`);
  }

  if (enabled && provider === 'disabled') problems.push('BILLING_ENABLED=true needs RAZORPAY_PROVIDER=razorpay (or stub outside prod)');

  return { config: { enabled, provider, keyId, keySecret, webhookSecrets, apiBaseUrl }, problems };
}
