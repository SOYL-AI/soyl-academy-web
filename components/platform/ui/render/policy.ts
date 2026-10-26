/**
 * URL policy for rendered content (WEB-7). Pure functions, shared by Markdown and tests.
 *
 * Links: same-site absolute paths (/learn/...), in-page fragments (#id), mailto:, and https: to an
 * allow-listed host. Everything else (javascript:, data:, vbscript:, file:, http:, protocol-relative
 * //host, backslash tricks, unknown hosts) renders as plain text.
 * Images: only https URLs under the CDN base (NEXT_PUBLIC_CDN_BASE_URL); none for AI output.
 */

/** Hosts content may link to. Official board sites are the only third parties. */
export const DEFAULT_LINK_HOSTS: readonly string[] = [
  'www.soylai.com',
  'soylai.com',
  'cbseacademic.nic.in',
  'www.cbse.gov.in',
  'cbse.gov.in',
  'cisce.org',
  'www.cisce.org',
];

export interface SafeLink {
  href: string;
  external: boolean;
}

// C0 controls, DEL, whitespace and backslashes never appear in a URL we accept.
// eslint-disable-next-line no-control-regex
const UNSAFE_CHARS = /[\u0000- \u007f-\u009f\\]/;

export function safeLink(raw: unknown, hosts: readonly string[] = DEFAULT_LINK_HOSTS): SafeLink | null {
  if (typeof raw !== 'string') return null;
  const url = raw.trim();
  if (!url || url.length > 2048 || UNSAFE_CHARS.test(url)) return null;

  if (url.startsWith('#')) return /^#[A-Za-z0-9][\w-]*$/.test(url) ? { href: url, external: false } : null;

  if (url.startsWith('/')) {
    if (url.startsWith('//')) return null; // protocol-relative → another origin
    // Resolve against a dummy origin to normalise /./ and /../ and reject anything that escapes it.
    try {
      const parsed = new URL(url, 'https://same-site.invalid');
      if (parsed.origin !== 'https://same-site.invalid') return null;
      return { href: parsed.pathname + parsed.search + parsed.hash, external: false };
    } catch {
      return null;
    }
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null; // relative paths without a leading slash are ambiguous: refused
  }
  if (parsed.protocol === 'mailto:') {
    return /^mailto:[^@\s<>"]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\?[^<>"]*)?$/.test(parsed.href) ? { href: parsed.href, external: true } : null;
  }
  if (parsed.protocol !== 'https:') return null;
  if (parsed.username || parsed.password || parsed.port) return null;
  const host = parsed.hostname.toLowerCase();
  if (!hosts.includes(host)) return null;
  return { href: parsed.href, external: host !== 'www.soylai.com' && host !== 'soylai.com' };
}

/** The CDN base from the environment (public by design, WEB-11). Empty when unset → no images. */
export function cdnBaseFromEnv(): string {
  return process.env.NEXT_PUBLIC_CDN_BASE_URL ?? '';
}

export function safeImageSrc(raw: unknown, cdnBase: string): string | null {
  if (typeof raw !== 'string' || !cdnBase) return null;
  const src = raw.trim();
  if (!src || src.length > 2048 || UNSAFE_CHARS.test(src)) return null;
  let base: URL;
  let parsed: URL;
  try {
    base = new URL(cdnBase);
    parsed = new URL(src);
  } catch {
    return null;
  }
  if (base.protocol !== 'https:' || parsed.protocol !== 'https:') return null;
  if (parsed.username || parsed.password) return null;
  if (parsed.origin !== base.origin) return null;
  const basePath = base.pathname.endsWith('/') ? base.pathname : base.pathname + '/';
  if (!parsed.pathname.startsWith(basePath)) return null;
  return parsed.href;
}
