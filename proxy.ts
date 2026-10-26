/**
 * Platform security headers (WEB-3, WEB-4). ADR-011.
 *
 * Runs ONLY on platform page prefixes (matcher below; ARCHITECTURE §17.5): no marketing route ever reaches
 * this function. With the platform flag off it does nothing at all (the platform pages 404 anyway, GEN-4).
 * It never rewrites, redirects or reads cookies: it only adds response headers and, on the logged-in
 * dynamic routes, a per-request CSP nonce that Next.js applies to its own scripts.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { isPlatformPath } from '@/platform/shared/config/platform-routes';
import { readFlags } from '@/platform/shared/config/flags';
import { createNonce, securityHeaders, usesNonce } from '@/components/platform/server/security-headers';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!readFlags().platformEnabled || !isPlatformPath(pathname)) return NextResponse.next();

  const forwardedProto = request.headers.get('x-forwarded-proto');
  const https = request.nextUrl.protocol === 'https:' || forwardedProto === 'https';
  const nonce = usesNonce(pathname) ? createNonce() : undefined;
  const headers = securityHeaders({
    nonce,
    https,
    dev: process.env.NODE_ENV === 'development',
    cdnBaseUrl: process.env.NEXT_PUBLIC_CDN_BASE_URL,
    origin: request.nextUrl.origin,
  });

  let response: NextResponse;
  if (nonce) {
    // Next.js extracts the nonce from the request's CSP header during rendering.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('content-security-policy', headers['content-security-policy']!);
    response = NextResponse.next({ request: { headers: requestHeaders } });
  } else {
    response = NextResponse.next();
  }
  for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
  return response;
}

export const config = {
  // Platform page prefixes only (keep in sync with platform/shared/config/platform-routes.ts;
  // the matcher must be a literal). /api/platform/* is a route handler with its own headers.
  matcher: [
    '/learn',
    '/learn/:path*',
    '/me',
    '/me/:path*',
    '/tests',
    '/tests/:path*',
    '/ask',
    '/ask/:path*',
    '/plans',
    '/plans/:path*',
    '/leaderboard',
    '/leaderboard/:path*',
    '/admin',
    '/admin/:path*',
  ],
};
