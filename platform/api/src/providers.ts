/**
 * External providers from config (SMS, email, consent). GEN-3: every mock refuses to start when
 * APP_ENV=prod; in `stg` the mock SMS sender delivers only to the reserved test range. Mock OAuth is
 * refused by config (GOOGLE_ISSUER must be Google's in prod).
 */
import type { Config } from './config';
import { AcsEmailSender, MockEmailSender } from './auth/senders/email';
import { MockSmsSender, Msg91SmsSender } from './auth/senders/sms';
import { MockConsentProvider } from './consent/mock';
import type { Providers } from './services';

export class MockInProductionError extends Error {
  constructor(what: string) {
    super(`${what} is a mock provider and cannot run with APP_ENV=prod (GEN-3)`);
    this.name = 'MockInProductionError';
  }
}

export function createProviders(config: Config): Providers {
  const refuseMock = (what: string) => {
    if (config.isProduction) throw new MockInProductionError(what);
  };

  let sms;
  if (config.sms.provider === 'msg91') {
    sms = new Msg91SmsSender({ authKey: config.sms.apiKey!, templateIds: config.sms.templateIds, senderId: config.sms.senderId, baseUrl: config.sms.baseUrl });
  } else {
    refuseMock('SMS_PROVIDER=mock');
    sms = new MockSmsSender(config.appEnv === 'stg');
  }

  let email;
  if (config.email.provider === 'acs') {
    email = new AcsEmailSender({ endpoint: config.email.acsEndpoint!, accessKey: config.email.acsAccessKey, from: config.email.from });
  } else {
    refuseMock('EMAIL_PROVIDER=mock');
    email = new MockEmailSender();
  }

  // OA-08: the owner's consent system has no adapter yet, so the mock is the only provider. This means
  // production cannot start until the real adapter exists — intended (fail closed).
  refuseMock('CONSENT_PROVIDER=mock');
  const consent = new MockConsentProvider(config.consent.mockDefault, config.isLocal);

  return { sms, email, consent };
}
