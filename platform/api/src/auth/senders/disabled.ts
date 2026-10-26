/**
 * Senders for sign-in methods that are switched off (AUTH_METHODS, D-031). Their routes answer 404
 * method_disabled, so these are only reached by best-effort account notices (AUTH-7), which ignore
 * the failure. Not mocks: nothing is delivered, so they are allowed in production.
 */
import { EmailDeliveryError, type EmailSender } from './email';
import { SmsDeliveryError, type SmsSender } from './sms';

export class DisabledSmsSender implements SmsSender {
  readonly name = 'disabled';
  readonly isMock = false;
  async send(): Promise<void> {
    throw new SmsDeliveryError('phone sign-in is disabled (AUTH_METHODS)');
  }
}

export class DisabledEmailSender implements EmailSender {
  readonly name = 'disabled';
  readonly isMock = false;
  async send(): Promise<void> {
    throw new EmailDeliveryError('email sign-in is disabled (AUTH_METHODS)');
  }
}
