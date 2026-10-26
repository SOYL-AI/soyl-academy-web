/**
 * First-party CSP violation reports for platform pages (WEB-3 `report-to csp`; ADR-011). Accepts the
 * legacy `application/csp-report` and the Reporting API `application/reports+json` formats, keeps only
 * the directive and the blocked origin (no full URLs, no query strings: they could hold personal data),
 * logs one JSON line and answers 204. 404 when the platform is off.
 */
import { readFlags } from '@/platform/shared/config/flags';
import { summariseCspReport } from '@/components/platform/server/security-headers';

export const dynamic = 'force-dynamic';

const MAX_BYTES = 16 * 1024;

export async function POST(request: Request): Promise<Response> {
  if (!readFlags().platformEnabled) return new Response(null, { status: 404 });
  const type = request.headers.get('content-type') ?? '';
  if (!/application\/(csp-report|reports\+json|json)/i.test(type)) return new Response(null, { status: 415 });
  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > MAX_BYTES) return new Response(null, { status: 413 });
  let text = '';
  try {
    text = await request.text();
  } catch {
    return new Response(null, { status: 400 });
  }
  if (text.length > MAX_BYTES) return new Response(null, { status: 413 });
  for (const entry of summariseCspReport(text).slice(0, 10)) {
    console.warn(JSON.stringify({ event: 'csp_violation', security: true, ...entry }));
  }
  return new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
}
