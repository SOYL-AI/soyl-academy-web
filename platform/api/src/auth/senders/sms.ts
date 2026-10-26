/**
 * SMS delivery for phone OTPs (ARCHITECTURE §5: Indian provider with DLT-registered templates).
 *
 * - MockSmsSender: in-memory outbox. GEN-3: refused in production; in `stg` it delivers only to the
 *   reserved test range (TEST_PHONE_PREFIX), everything else is dropped.
 * - Msg91SmsSender: MSG91 Flow API v5 (`POST /api/v5/flow`, header `authkey`), one DLT template per
 *   message kind from SMS_DLT_TEMPLATE_IDS. Request shape unit-tested with a fake fetch; it has not
 *   run against a real account (owner credentials, OA list).
 */
import { TEST_PHONE_REGEX } from '@soyl/shared/config/security';

export type SmsKind = 'otp' | 'notice';

export interface SmsMessage {
  /** E.164, e.g. +919876543210. */
  to: string;
  kind: SmsKind;
  /** Template variables (DLT templates are fixed text with variables). */
  vars: Record<string, string>;
}

export interface SmsSender {
  readonly name: string;
  readonly isMock: boolean;
  send(message: SmsMessage): Promise<void>;
}

export class SmsDeliveryError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'SmsDeliveryError';
  }
}

export class MockSmsSender implements SmsSender {
  readonly name = 'mock';
  readonly isMock = true;
  readonly outbox: (SmsMessage & { at: number })[] = [];
  failing = false;

  /** `testRangeOnly` (stg): deliver only to the reserved test range (GEN-3). */
  constructor(private readonly testRangeOnly = false) {}

  async send(message: SmsMessage): Promise<void> {
    if (this.failing) throw new SmsDeliveryError('mock sms outage');
    if (this.testRangeOnly && !TEST_PHONE_REGEX.test(message.to)) return;
    this.outbox.push({ ...message, at: Date.now() });
  }

  lastCode(to: string): string | undefined {
    return [...this.outbox].reverse().find((m) => m.to === to && m.kind === 'otp')?.vars.otp;
  }
}

export interface Msg91Options {
  authKey: string;
  templateIds: Record<string, string>;
  senderId?: string;
  baseUrl?: string;
  fetch?: typeof fetch;
}

export class Msg91SmsSender implements SmsSender {
  readonly name = 'msg91';
  readonly isMock = false;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly o: Msg91Options) {
    this.fetchImpl = o.fetch ?? fetch;
  }

  buildRequest(message: SmsMessage): { url: string; init: RequestInit } {
    const templateId = this.o.templateIds[message.kind];
    if (!templateId) throw new SmsDeliveryError(`no DLT template configured for ${message.kind}`);
    const mobiles = message.to.replace(/^\+/, '');
    const body = {
      template_id: templateId,
      ...(this.o.senderId ? { sender: this.o.senderId } : {}),
      short_url: '0',
      recipients: [{ mobiles, ...message.vars }],
    };
    return {
      url: new URL('/api/v5/flow', this.o.baseUrl ?? 'https://control.msg91.com').toString(),
      init: {
        method: 'POST',
        headers: { authkey: this.o.authKey, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(body),
      },
    };
  }

  async send(message: SmsMessage): Promise<void> {
    const { url, init } = this.buildRequest(message);
    const res = await this.fetchImpl(url, { ...init, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new SmsDeliveryError(`MSG91 failed with HTTP ${res.status}`, res.status);
    // MSG91 reports some failures with HTTP 200 and {"type":"error"}.
    const data = (await res.json().catch(() => ({}))) as { type?: string };
    if (data.type === 'error') throw new SmsDeliveryError('MSG91 rejected the message', res.status);
  }
}
