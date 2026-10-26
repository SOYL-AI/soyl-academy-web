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
import { MfaService } from './auth/mfa';
import { MFA } from '@soyl/shared/config/security';

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
  const identity = new IdentityService(db, adapter, limiter, clock, providers, config.google.adminDomains);
  const google = new GoogleAuth(config, kv, clock, {
    allowInsecure: (deps.google?.allowInsecure ?? config.isLocal) && config.isLocal,
    fetch: deps.google?.fetch,
  });
  const consent = new ConsentService(db, providers.consent, clock);
  const mfa = new MfaService(db, clock, limiter, { encryptionKey: config.mfaEncryptionKey, pepper: config.otpPepper, issuer: MFA.totp.issuer });
  return { auth, adapter, limiter, sessions, otp, identity, google, consent, mfa };
}

export type Services = ReturnType<typeof createServices>;
