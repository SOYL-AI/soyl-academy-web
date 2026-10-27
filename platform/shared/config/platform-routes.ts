/**
 * Platform URL prefixes (ARCHITECTURE §3.1, ADR-001 §8). The one list used by:
 * - `components/legal/ConsentedAnalytics.tsx`: Vercel Analytics / Speed Insights never run on these paths
 *   (WEB-1, F-004, D-014);
 * - `proxy.ts`: platform security headers and CSP apply only here (ADR-011, ARCHITECTURE §17.5);
 * - the marketing regression's route inventory (`platform/e2e/marketing/routes.ts`).
 *
 * No imports: the marketing app's client bundle imports this file.
 */
export const PLATFORM_PREFIXES: readonly string[] = ['/learn', '/tests', '/ask', '/plans', '/me', '/leaderboard', '/coins', '/store', '/admin', '/api/platform'];

/** True for `/learn`, `/learn/...`, `/me?x=1` etc.; false for `/learning`, `/` and every marketing path. */
export function isPlatformPath(pathnameOrUrl: string | null | undefined): boolean {
  if (!pathnameOrUrl) return false;
  let path = pathnameOrUrl;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      return false;
    }
  }
  path = path.split(/[?#]/, 1)[0] ?? '';
  return PLATFORM_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}
