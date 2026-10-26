/**
 * Email delivery for OTPs and account notices (ARCHITECTURE §5).
 *
 * - MockEmailSender: in-memory outbox (tests, local dev). GEN-3: refused in production.
 * - AcsEmailSender: Azure Communication Services Email REST API (`POST {endpoint}/emails:send`),
 *   chosen for Central India data residency (AC-24). Auth: HMAC-SHA256 access-key signing as
 *   documented by Azure, or a bearer token from a managed-identity token provider. The request shape
 *   is unit-tested with a fake fetch; it has not run against a real resource (OA: owner credentials).
 */
import { createHash, createHmac } from 'node:crypto';

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  /** For logs/metrics only, e.g. 'otp', 'link-notice'. */
  tag: string;
}

export interface EmailSender {
  readonly name: string;
  readonly isMock: boolean;
  send(message: EmailMessage): Promise<void>;
}

export class EmailDeliveryError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'EmailDeliveryError';
  }
}

export class MockEmailSender implements EmailSender {
  readonly name = 'mock';
  readonly isMock = true;
  readonly outbox: (EmailMessage & { at: number })[] = [];
  failing = false;

  async send(message: EmailMessage): Promise<void> {
    if (this.failing) throw new EmailDeliveryError('mock email outage');
    this.outbox.push({ ...message, at: Date.now() });
  }

  /** Last message to `to` (tests and the local dev outbox). */
  last(to: string): (EmailMessage & { at: number }) | undefined {
    const t = to.toLowerCase();
    return [...this.outbox].reverse().find((m) => m.to.toLowerCase() === t);
  }

  /** The 6-digit code from the last OTP email to `to`. */
  lastCode(to: string): string | undefined {
    return this.last(to)?.text.match(/\b(\d{6})\b/)?.[1];
  }
}

export interface AcsOptions {
  endpoint: string;
  from: string;
  /** Access-key auth (base64 key). */
  accessKey?: string;
  /** Managed identity: returns an Entra access token for https://communication.azure.com. */
  getToken?: () => Promise<string>;
  fetch?: typeof fetch;
  apiVersion?: string;
  now?: () => Date;
}

/** Extracts `addr@x` from `Name <addr@x>`. */
function senderAddress(from: string): string {
  return from.match(/<([^>]+)>/)?.[1] ?? from;
}

export class AcsEmailSender implements EmailSender {
  readonly name = 'acs';
  readonly isMock = false;
  private readonly fetchImpl: typeof fetch;
  private readonly apiVersion: string;

  constructor(private readonly o: AcsOptions) {
    if (!o.accessKey && !o.getToken) throw new Error('AcsEmailSender needs accessKey or getToken');
    this.fetchImpl = o.fetch ?? fetch;
    this.apiVersion = o.apiVersion ?? '2023-03-31';
  }

  /** The request without sending it (exported for the unit test). */
  async buildRequest(message: EmailMessage): Promise<{ url: string; init: RequestInit }> {
    const url = new URL(`/emails:send?api-version=${this.apiVersion}`, this.o.endpoint);
    const body = JSON.stringify({
      senderAddress: senderAddress(this.o.from),
      recipients: { to: [{ address: message.to }] },
      content: { subject: message.subject, plainText: message.text, ...(message.html ? { html: message.html } : {}) },
      userEngagementTrackingDisabled: true,
    });
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    if (this.o.getToken) {
      headers.authorization = `Bearer ${await this.o.getToken()}`;
    } else {
      const date = (this.o.now?.() ?? new Date()).toUTCString();
      const contentHash = createHash('sha256').update(body).digest('base64');
      const pathAndQuery = `${url.pathname}${url.search}`;
      const stringToSign = `POST\n${pathAndQuery}\n${date};${url.host};${contentHash}`;
      const signature = createHmac('sha256', Buffer.from(this.o.accessKey!, 'base64')).update(stringToSign).digest('base64');
      headers['x-ms-date'] = date;
      headers['x-ms-content-sha256'] = contentHash;
      headers.authorization = `HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=${signature}`;
    }
    return { url: url.toString(), init: { method: 'POST', headers, body } };
  }

  async send(message: EmailMessage): Promise<void> {
    const { url, init } = await this.buildRequest(message);
    const res = await this.fetchImpl(url, { ...init, signal: AbortSignal.timeout(10_000) });
    // 202 Accepted: queued. The body may describe the failure; it is never passed on (API-13).
    if (res.status !== 202 && !res.ok) throw new EmailDeliveryError(`ACS email failed with HTTP ${res.status}`, res.status);
  }
}

export function otpEmail(to: string, code: string, minutes: number): EmailMessage {
  return {
    to,
    tag: 'otp',
    subject: `${code} is your SOYL Academy sign-in code`,
    text: `Your SOYL Academy sign-in code is ${code}. It expires in ${minutes} minutes.\n\nIf you did not ask for this code, you can ignore this email. Never share this code with anyone.`,
  };
}
