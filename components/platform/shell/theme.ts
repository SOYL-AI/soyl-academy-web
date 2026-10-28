/**
 * Light / Dark / System theme for the learning platform (ADR-023).
 *
 * - The preference lives in a first-party cookie (`soyl_theme`, not HttpOnly, one year, SameSite=Lax): a UI
 *   preference the student sets, so it is an essential (functional) cookie, and never in localStorage (WEB-5).
 * - Static /learn pages cannot read cookies on the server, so a tiny constant inline script
 *   (THEME_BOOT_SCRIPT, the first child of the platform root) resolves the theme before the page paints. It is
 *   allowed by its SHA-256 hash on the nonce-CSP routes (security-headers.ts) and by the static policy on /learn.
 * - The resolved theme goes on the platform root as `data-theme="light|dark"` (tokens.css) and on <html> as
 *   `data-platform-theme` (page background, overscroll, cookie bar; platform-global.css). Marketing pages never
 *   carry either attribute.
 *
 * No imports: the server (CSP hash) and the client both use this module.
 */
export type ThemePref = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_PREFS: readonly ThemePref[] = ['light', 'dark', 'system'];
export const THEME_COOKIE = 'soyl_theme';
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
/** id of the platform root element (app/(platform)/layout.tsx). */
export const PLATFORM_ROOT_ID = 'soyl-platform-root';
/** Attribute on <html> while a platform page is open (platform-global.css). */
export const HTML_THEME_ATTR = 'data-platform-theme';

export const THEME_LABELS: Record<ThemePref, string> = { light: 'Light', dark: 'Dark', system: 'System' };

export function parseThemePref(raw: string | null | undefined): ThemePref {
  return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'system';
}

/** The preference stored in a `document.cookie` string; `system` when absent or invalid. */
export function readThemeCookie(cookieString: string | null | undefined): ThemePref {
  const m = /(?:^|;\s*)soyl_theme=([^;]*)/.exec(cookieString ?? '');
  return parseThemePref(m ? decodeURIComponent(m[1]!.trim()) : null);
}

/** `Set-Cookie`-style string for `document.cookie`. */
export function themeCookie(pref: ThemePref, secure: boolean): string {
  return `${THEME_COOKIE}=${pref}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax${secure ? '; Secure' : ''}`;
}

export function resolveTheme(pref: ThemePref, systemDark: boolean): ResolvedTheme {
  if (pref === 'system') return systemDark ? 'dark' : 'light';
  return pref;
}

/**
 * Runs while the HTML is parsed, before the first paint (no flash). Constant text: its hash is part of the CSP.
 * Keep it in sync with readThemeCookie / resolveTheme (a unit test runs it against a fake DOM).
 */
export const THEME_BOOT_SCRIPT =
  "(function(){try{var r=document.getElementById('soyl-platform-root');if(!r)return;" +
  "var m=/(?:^|;\\s*)soyl_theme=(light|dark|system)(?:;|$)/.exec(document.cookie);var p=m?m[1]:'system';" +
  "var d=p==='dark'||(p==='system'&&!!window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);" +
  "var t=d?'dark':'light';r.setAttribute('data-theme',t);r.setAttribute('data-theme-pref',p);" +
  "document.documentElement.setAttribute('data-platform-theme',t);}catch(e){}})();";
