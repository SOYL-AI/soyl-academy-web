/**
 * Which pages render the platform app shell instead of the marketing header and footer (ADR-023).
 * Imported by the marketing Header and Footer (client), so: no server-only imports, and the flag is read as the
 * literal `process.env.NEXT_PUBLIC_PLATFORM_ENABLED` so Next inlines it into client bundles (as lib/site.ts does).
 * With the flag off every platform URL is the marketing 404, which keeps the marketing chrome.
 */
import { isPlatformPath } from '@/platform/shared/config/platform-routes';

export function platformChromeActive(pathname: string | null | undefined, enabled = process.env.NEXT_PUBLIC_PLATFORM_ENABLED === 'true'): boolean {
  if (!enabled || !pathname) return false;
  return isPlatformPath(pathname) || pathname === '/dev/ui' || pathname.startsWith('/dev/ui/');
}

/** Immersive pages hide the mobile tab bar: their own controls dock to the bottom of the screen. */
export function isFocusRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return /\/learn\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/(lesson|flashcards)(\/|$)/.test(pathname) || /^\/tests\/(attempt|live)\//.test(pathname);
}
