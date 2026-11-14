/**
 * Signed links in reminder emails (D-055). Keyed with OTP_PEPPER under its own label ("soyl/email/v1"), so these
 * tokens never validate as consent links or OTP hashes and vice versa.
 *
 *   unsubscribe (student)  `<userId>.s0.<mac>`          no expiry (RFC 8058 links must keep working)
 *   unsubscribe (parent)   `<userId>.p<generation>.<mac>` no expiry; dead once the parent address changes (generation)
 *   parent confirm         `<userId>.c<generation>.<mac>` mac also covers the send time: a resend replaces it; the
 *                                                         TTL (REMINDERS.parentConfirmTtlHours) is checked against it
 *
 * `<mac>` = base64url(HMAC-SHA256(key, purpose \n userId \n generation [\n sentAtMs])), 43 characters. Verification is
 * constant time. A token says nothing about the person beyond the account id; the pages carry it in the URL fragment
 * (never sent to a server), the List-Unsubscribe header in the query of a POST-only API URL.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export type EmailLinkPurpose = 'student' | 'parent' | 'confirm';

const PREFIX: Record<EmailLinkPurpose, string> = { student: 's', parent: 'p', confirm: 'c' };
const BY_PREFIX: Record<string, EmailLinkPurpose> = { s: 'student', p: 'parent', c: 'confirm' };

/** Shape check only (the web uses it before calling the API; the signature is checked here). */
export const EMAIL_TOKEN_RE = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.([spc])(\d{1,9})\.([A-Za-z0-9_-]{43})$/;

export interface ParsedEmailToken {
  userId: string;
  purpose: EmailLinkPurpose;
  generation: number;
}

export class EmailTokens {
  private readonly key: Buffer;

  constructor(pepper: string) {
    if (!pepper) throw new Error('EmailTokens needs OTP_PEPPER');
    this.key = createHmac('sha256', pepper).update('soyl/email/v1').digest();
  }

  private mac(purpose: EmailLinkPurpose, userId: string, generation: number, sentAtMs?: number): string {
    const parts = [purpose, userId, String(generation), ...(sentAtMs === undefined ? [] : [String(sentAtMs)])];
    return createHmac('sha256', this.key).update(parts.join('\n')).digest('base64url');
  }

  /** The student's own unsubscribe link (one per account, never changes). */
  studentUnsubscribe(userId: string): string {
    return `${userId}.${PREFIX.student}0.${this.mac('student', userId, 0)}`;
  }

  /** The parent's unsubscribe link for the current parent address (its generation). */
  parentUnsubscribe(userId: string, generation: number): string {
    return `${userId}.${PREFIX.parent}${generation}.${this.mac('parent', userId, generation)}`;
  }

  /** The parent's confirmation link: bound to the address generation and the send time of this email. */
  parentConfirm(userId: string, generation: number, sentAt: Date): string {
    return `${userId}.${PREFIX.confirm}${generation}.${this.mac('confirm', userId, generation, sentAt.getTime())}`;
  }

  /** Splits a token and checks its shape (not the signature: confirm tokens need the stored send time). */
  parse(token: string): (ParsedEmailToken & { mac: string }) | null {
    const m = EMAIL_TOKEN_RE.exec(token.trim());
    if (!m) return null;
    return { userId: m[1]!, purpose: BY_PREFIX[m[2]!]!, generation: Number(m[3]), mac: m[4]! };
  }

  /** Verifies an unsubscribe token (student or parent). Null when malformed or forged. */
  verifyUnsubscribe(token: string): ParsedEmailToken | null {
    const p = this.parse(token);
    if (!p || p.purpose === 'confirm') return null;
    if (p.purpose === 'student' && p.generation !== 0) return null;
    return this.equal(p.mac, this.mac(p.purpose, p.userId, p.generation)) ? { userId: p.userId, purpose: p.purpose, generation: p.generation } : null;
  }

  /** Verifies a confirm token against the stored send time of the current confirmation email. */
  verifyConfirm(p: ParsedEmailToken & { mac: string }, sentAt: Date): boolean {
    return p.purpose === 'confirm' && this.equal(p.mac, this.mac('confirm', p.userId, p.generation, sentAt.getTime()));
  }

  /** Constant-time comparison of two MACs. */
  private equal(a: string, b: string): boolean {
    const x = Buffer.from(a);
    const y = Buffer.from(b);
    return x.length === y.length && timingSafeEqual(x, y);
  }
}
