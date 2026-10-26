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
