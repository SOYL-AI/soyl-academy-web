/**
 * Return-to handling on the client (AUTH-13, WEB-8). Every redirect target goes through `safeReturnTo`
 * from platform/shared/config/security.ts, the same check the API applies.
 */
import { safeReturnTo } from '@/platform/shared/config/security';

export { safeReturnTo };

/** Query parameters the API adds after Google sign-in; removed from the address bar once read. */
export const AUTH_RESULT_PARAMS = ['authError', 'linked'] as const;

/** The current page as a return target (path + query, auth result params removed). */
export function currentReturnTo(loc: Pick<Location, 'pathname' | 'search'> = window.location): string {
  const params = new URLSearchParams(loc.search);
  for (const p of AUTH_RESULT_PARAMS) params.delete(p);
  const qs = params.toString();
  return safeReturnTo(`${loc.pathname}${qs ? `?${qs}` : ''}`);
}

/** The signed-in student's dashboard (D-043). Under /me: nonce CSP and an allowed return target. */
export const DASHBOARD_PATH = '/me/dashboard';

/**
 * Pages with nothing to come back to after logging in: the platform home (`/learn`, the board/class picker
 * that guests land on). A login opened there without an explicit `returnTo` lands on the dashboard; every
 * other page is returned to exactly (CONTEXT §5, AUTH-13), and an explicit `returnTo` always wins.
 */
const LANDING_PAGES: readonly string[] = ['/learn'];

/** Default return target of a login opened without an explicit `returnTo`. */
export function defaultLoginReturnTo(loc: Pick<Location, 'pathname' | 'search'> = window.location): string {
  return LANDING_PAGES.includes(loc.pathname) ? DASHBOARD_PATH : currentReturnTo(loc);
}

/** Browser URL for Google sign-in (a top-level navigation, not fetch). */
export function googleStartUrl(returnTo: string, intent: 'signin' | 'link' = 'signin'): string {
  const qs = new URLSearchParams({ returnTo: safeReturnTo(returnTo) });
  if (intent === 'link') qs.set('intent', 'link');
  return `/api/platform/v1/auth/google/start?${qs.toString()}`;
}

/** Reads and strips `authError` / `linked` from a URL. `cleaned` is the relative URL without them. */
export function takeAuthResult(href: string): { authError: string | null; linked: string | null; cleaned: string | null } {
  const url = new URL(href, 'http://local.invalid');
  const rawError = url.searchParams.get('authError');
  const rawLinked = url.searchParams.get('linked');
  if (rawError === null && rawLinked === null) return { authError: null, linked: null, cleaned: null };
  for (const p of AUTH_RESULT_PARAMS) url.searchParams.delete(p);
  const qs = url.searchParams.toString();
  let authError: string | null = null;
  if (rawError !== null) authError = /^[a-z_]{1,40}$/.test(rawError) ? rawError : 'oauth_failed';
  return {
    authError,
    linked: rawLinked && /^[a-z]{1,20}$/.test(rawLinked) ? rawLinked : null,
    cleaned: `${url.pathname}${qs ? `?${qs}` : ''}${url.hash}`,
  };
}
