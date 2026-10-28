/** Wires services from dependencies. One instance per app. */
import type { Database } from '@soyl/db';
import type { Clock } from './clock';
import type { Config } from './config';
import type { KeyValueStore } from './kv';
import { RateLimiter } from './rate-limit';
import { createBetterAuth, type InternalAdapter } from './auth/better-auth';
import { SessionService } from './auth/sessions';
import { OtpService } from './auth/otp';
import { IdentityService } from './auth/identity';
import { GoogleAuth } from './auth/google';
import type { EmailSender } from './auth/senders/email';
import type { SmsSender } from './auth/senders/sms';
import type { ConsentProvider } from './consent/provider';
import { ConsentService } from './consent/service';
import { BuiltinConsentFlow, isBuiltinProvider } from './consent/builtin';
import { MfaService } from './auth/mfa';
import { MFA } from '@soyl/shared/config/security';
import type { StoreItem } from '@soyl/shared/config/coins';
import { BillingService } from './billing/service';
import { createRazorpayClient, type RazorpayClient } from './billing/razorpay';
import { AiServices, type AiDeps } from './ai/services';
import { StaffService } from './domain/admin/staff';
import { InterestCounters } from './domain/admin/counters';

export interface Providers {
  sms: SmsSender;
  email: EmailSender;
  consent: ConsentProvider;
}

export interface AppDeps {
  config: Config;
  db: Database;
  kv: KeyValueStore;
  clock: Clock;
  providers: Providers;
  /** Google OIDC options (tests point fetch at the mock provider). */
  google?: { allowInsecure?: boolean; fetch?: typeof fetch };
  /** Billing (ADR-016): inject a Razorpay client (scripts, tests). Default: from config.billing (stub/real/none). */
  billing?: { razorpay?: RazorpayClient | null };
  /** SOYL Coins (ADR-021): store items override (tests); default STORE_ITEMS from config. */
  coins?: { items?: readonly StoreItem[] };
  /** AI gateway runtime (ai/runtime.ts). Omitted: local stand-ins (refused in production). */
  ai?: AiDeps;
}

export function createServices(deps: AppDeps) {
  const { config, db, kv, clock, providers } = deps;
  const auth = createBetterAuth(db, config);
  let adapterPromise: Promise<InternalAdapter> | null = null;
  const adapter = () => (adapterPromise ??= auth.$context.then((c) => c.internalAdapter));
  const limiter = new RateLimiter(kv, clock, config.otpPepper);
  const sessions = new SessionService(adapter, db, config, clock);
  const otp = new OtpService(db, kv, limiter, clock, providers, {
    pepper: config.otpPepper,
    allowTestPhones: !config.isProduction,
    smsGlobalHourlyCap: config.smsGlobalHourlyCap,
  });
  const google = new GoogleAuth(config, kv, clock, {
    allowInsecure: (deps.google?.allowInsecure ?? config.isLocal) && config.isLocal,
    fetch: deps.google?.fetch,
  });
  const consent = new ConsentService(db, providers.consent, clock);
  // D-045: staff capabilities (superadmin) and the aggregate interest counters.
  const staff = new StaffService(db);
  const counters = new InterestCounters(db, clock);
  const identity = new IdentityService(db, adapter, limiter, clock, providers, config.google.adminDomains, counters);
  const mfa = new MfaService(db, clock, limiter, { encryptionKey: config.mfaEncryptionKey, pepper: config.otpPepper, issuer: MFA.totp.issuer });
  const razorpay = deps.billing && 'razorpay' in deps.billing ? (deps.billing.razorpay ?? null) : createRazorpayClient(config.billing, () => clock.now());
  const billing = new BillingService({ db, clock, kv, config: config.billing, razorpay, consent });
  // AI gateway: plans come from billing's entitlements (AiServices defaults to BillingEntitlementService over the same
  // database; tests may inject a StaticEntitlementService); a newly granted plan tops today's credits up at once.
  const ai = new AiServices({ config, db, kv, clock, ai: deps.ai });
  billing.setCreditHook(ai.credits);
  // D-039 / ADR-022: the interactive flow exists only with CONSENT_PROVIDER=builtin (routes answer 409 otherwise).
  const consentFlow = isBuiltinProvider(providers.consent)
    ? new BuiltinConsentFlow({ db, clock, limiter, email: providers.email, consent, pepper: config.otpPepper, publicBaseUrl: config.publicBaseUrl, uploads: () => ai.uploads })
    : null;
  return { auth, adapter, limiter, sessions, otp, identity, google, consent, consentFlow, mfa, billing, ai, staff, counters };
}

export type Services = ReturnType<typeof createServices>;
