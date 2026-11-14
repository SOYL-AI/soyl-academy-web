/**
 * URLs in reminder emails (D-055). Pages live under /me (proxy.ts already serves /me/* with the platform's nonce CSP,
 * so no shared middleware changes): the signed token travels in the URL fragment, which browsers never send to a
 * server. Only the RFC 8058 one-click URL carries the token in the query, because mailbox providers POST to it; that
 * route can only switch emails off and the API logs paths without the query (logging.ts pathWithoutQuery).
 */
import type { EmailTokens } from './tokens';
import type { UnsubscribeLinks } from './emails';

export interface EmailLinkConfig {
  /** PUBLIC_BASE_URL without a trailing slash, e.g. https://www.soylai.com. */
  publicBaseUrl: string;
  /** API_PUBLIC_PATH, the same-origin proxy prefix (ADR-005), e.g. /api/platform. */
  apiPublicPath: string;
}

export const EMAIL_PAGES = {
  unsubscribe: '/me/email/unsubscribe',
  parentConfirm: '/me/email/parent-confirm',
  /** The "Email reminders" card on /me. */
  settings: '/me#email-reminders',
  /** Weekly goal and the daily challenge. */
  dashboard: '/dashboard',
} as const;

export class EmailLinks {
  private readonly base: string;
  private readonly api: string;

  constructor(
    cfg: EmailLinkConfig,
    private readonly tokens: EmailTokens,
  ) {
    this.base = cfg.publicBaseUrl.replace(/\/+$/, '');
    this.api = `${this.base}${cfg.apiPublicPath.replace(/\/+$/, '')}`;
  }

  private unsubscribe(token: string): UnsubscribeLinks {
    return { page: `${this.base}${EMAIL_PAGES.unsubscribe}#t=${token}`, oneClick: `${this.api}/v1/email/unsubscribe/one-click?token=${token}` };
  }

  student(userId: string): UnsubscribeLinks {
    return this.unsubscribe(this.tokens.studentUnsubscribe(userId));
  }

  parent(userId: string, generation: number): UnsubscribeLinks {
    return this.unsubscribe(this.tokens.parentUnsubscribe(userId, generation));
  }

  parentConfirm(userId: string, generation: number, sentAt: Date): string {
    return `${this.base}${EMAIL_PAGES.parentConfirm}#t=${this.tokens.parentConfirm(userId, generation, sentAt)}`;
  }

  page(path: string): string {
    return `${this.base}${path}`;
  }
}

/**
 * The lesson URL for a chapter key and deck part, as the web builds it (components/platform/learn/links.ts):
 * cbse-10-science-ch01 → /learn/cbse/10/science/ch01/lesson (part ≥ 1 → ?part=N, the canonical form, ADR-017).
 * CISCE keys (icse-/isc-) live under /learn/cisce. Null for a key of another shape.
 */
export function lessonPath(chapterKey: string, part: number): string | null {
  const m = /^(cbse|icse|isc)-(\d{1,2})-([a-z0-9-]+)-(ch\d{2})$/.exec(chapterKey);
  if (!m) return null;
  const board = m[1] === 'cbse' ? 'cbse' : 'cisce';
  const path = `/learn/${board}/${m[2]}/${m[3]}/${m[4]}/lesson`;
  return part >= 1 ? `${path}?part=${part}` : path;
}
