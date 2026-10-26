/**
 * `/api/platform/*` → `${PLATFORM_API_ORIGIN}/*` (ADR-005 web side, D-018). Adds the edge secret and the
 * trusted client IP, strips everything else, streams both ways, 404 when the platform is off (GEN-4).
 * Uploads never come through here (D-018, F-013). Logic: components/platform/server/api-proxy.ts.
 */
import { PROXY_METHODS, problemResponse, proxyRequest, readProxyConfig } from '@/components/platform/server/api-proxy';

export const dynamic = 'force-dynamic';

const notFound = () => new Response(null, { status: 404, headers: { 'cache-control': 'no-store' } });

async function handle(request: Request): Promise<Response> {
  const cfg = readProxyConfig();
  if (!cfg) return notFound();
  return proxyRequest(request, cfg);
}

/** ADR-005 item 3: no HEAD, no CORS preflight (same origin only). */
function notAllowed(): Response {
  if (!readProxyConfig()) return notFound();
  return problemResponse(405, 'method_not_allowed', 'Method not allowed', { allow: PROXY_METHODS.join(', ') });
}

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE, notAllowed as HEAD, notAllowed as OPTIONS };
