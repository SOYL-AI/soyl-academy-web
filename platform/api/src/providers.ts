/**
 * External providers from config (SMS, email, consent). GEN-3: every mock for an ENABLED sign-in
 * method refuses to start when APP_ENV=prod; in `stg` the mock SMS sender delivers only to the
 * reserved test range. Disabled methods (AUTH_METHODS) get a non-delivering sender instead. Mock OAuth
 * is refused by config (GOOGLE_ISSUER must be Google's in prod while Google is enabled).
 *
 * ACS email authenticates with the API's managed identity (token for https://communication.azure.com)
 * unless an access key is configured (local only; config refuses a key in production).
 */
import { AZURE_RESOURCES, defaultTokenProvider, type TokenProvider } from '@soyl/shared/azure/identity';
import type { Config } from './config';
import { AcsEmailSender, MockEmailSender, type EmailSender } from './auth/senders/email';
import { DisabledEmailSender, DisabledSmsSender } from './auth/senders/disabled';
import { MockSmsSender, Msg91SmsSender, type SmsSender } from './auth/senders/sms';
import { MockConsentProvider } from './consent/mock';
import { UnavailableConsentProvider } from './consent/unavailable';
import { BuiltinConsentProvider } from './consent/builtin';
import type { Database } from '@soyl/db';
import type { ConsentProvider } from './consent/provider';
import type { Providers } from './services';

export class MockInProductionError extends Error {
  constructor(what: string) {
    super(`${what} is a mock provider and cannot run with APP_ENV=prod (GEN-3)`);
    this.name = 'MockInProductionError';
  }
}

export interface ProviderOptions {
  /** Managed-identity token provider (tests inject a fake). Default: one per process. */
  tokens?: TokenProvider;
  fetch?: typeof fetch;
  /** CONSENT_PROVIDER=builtin keeps its records in the platform database (D-039). */
  db?: Database;
}

export function createProviders(config: Config, opts: ProviderOptions = {}): Providers {
  const refuseMock = (what: string) => {
    if (config.isProduction) throw new MockInProductionError(what);
  };
  const enabled = (m: Config['authMethods'][number]) => config.authMethods.includes(m);

  let sms: SmsSender;
  if (!enabled('phone')) {
    sms = new DisabledSmsSender();
  } else if (config.sms.provider === 'msg91') {
    sms = new Msg91SmsSender({ authKey: config.sms.apiKey!, templateIds: config.sms.templateIds, senderId: config.sms.senderId, baseUrl: config.sms.baseUrl });
  } else {
    refuseMock('SMS_PROVIDER=mock');
    sms = new MockSmsSender(config.appEnv === 'stg');
  }

  let email: EmailSender;
  if (config.email.provider === 'acs') {
    const tokens = config.email.acsAccessKey ? undefined : (opts.tokens ?? defaultTokenProvider());
    email = new AcsEmailSender({
      endpoint: config.email.acsEndpoint!,
      from: config.email.from,
      accessKey: config.email.acsAccessKey,
      getToken: tokens ? async () => (await tokens.getToken(AZURE_RESOURCES.communication)).token : undefined,
      fetch: opts.fetch,
    });
  } else if (!enabled('email')) {
    email = new DisabledEmailSender();
  } else {
    refuseMock('EMAIL_PROVIDER=mock');
    email = new MockEmailSender();
  }

  let consent: ConsentProvider;
  if (config.consent.provider === 'unavailable') {
    // OA-08 still open: fail-closed provider, allowed in production (D-031).
    consent = new UnavailableConsentProvider();
  } else if (config.consent.provider === 'builtin') {
    // D-039 / ADR-022: the interim built-in provider (not a mock; allowed in production).
    if (!opts.db) throw new Error('CONSENT_PROVIDER=builtin needs the database (createProviders(config, { db }))');
    consent = new BuiltinConsentProvider(opts.db);
  } else {
    refuseMock('CONSENT_PROVIDER=mock');
    consent = new MockConsentProvider(config.consent.mockDefault, config.isLocal);
  }

  return { sms, email, consent };
}
