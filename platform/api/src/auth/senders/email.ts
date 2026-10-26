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

/** Escapes text for HTML element content and attribute values. */
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** SOYL brand colours (app/globals.css): paper, ink, muted, cobalt. */
const BRAND = { paper: '#F4F0E7', white: '#FFFFFF', ink: '#171717', muted: '#5E5E59', cobalt: '#3155FF', line: '#E4DED1' } as const;

/**
 * The sign-in code email: plain text plus a simple HTML part. No images, no links, no tracking pixels
 * (ACS engagement tracking is disabled per message too), no personal data beyond the address it goes
 * to. The code appears once in the text part before any other 6-digit number (the mock outbox and
 * tests read it from there).
 */
export function otpEmail(to: string, code: string, minutes: number): EmailMessage {
  const c = escapeHtml(code);
  const m = escapeHtml(String(minutes));
  const text = [
    `Your SOYL Academy sign-in code is ${code}`,
    '',
    `This code expires in ${minutes} minutes. Enter it on the sign-in screen to continue.`,
    '',
    'Never share this code with anyone. SOYL Academy staff will never ask you for it.',
    'If you did not try to sign in, you can ignore this email: nobody can sign in without the code.',
    '',
    'SOYL Academy',
  ].join('\n');
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Your SOYL Academy sign-in code</title></head>
<body style="margin:0;padding:0;background:${BRAND.paper};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:${BRAND.white};border:1px solid ${BRAND.line};border-radius:12px;">
<tr><td style="padding:28px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:${BRAND.ink};">SOYL <span style="color:${BRAND.cobalt};">Academy</span></td></tr>
<tr><td style="padding:8px 28px 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:${BRAND.ink};">Your sign-in code is</td></tr>
<tr><td style="padding:12px 28px;"><div style="font-family:'Courier New',Courier,monospace;font-size:32px;line-height:40px;font-weight:bold;letter-spacing:8px;color:${BRAND.ink};background:${BRAND.paper};border-radius:8px;padding:12px 16px;text-align:center;">${c}</div></td></tr>
<tr><td style="padding:4px 28px 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:${BRAND.ink};">This code expires in <strong>${m} minutes</strong>. Enter it on the sign-in screen to continue.</td></tr>
<tr><td style="padding:16px 28px 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:${BRAND.ink};"><strong>Never share this code with anyone.</strong> SOYL Academy staff will never ask you for it.</td></tr>
<tr><td style="padding:16px 28px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${BRAND.muted};">If you did not try to sign in, you can ignore this email: nobody can sign in without the code.</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
  return { to, tag: 'otp', subject: `${code} is your SOYL Academy sign-in code`, text, html };
}
