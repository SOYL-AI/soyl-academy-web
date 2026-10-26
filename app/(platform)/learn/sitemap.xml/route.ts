/**
 * Platform sitemap (ARCHITECTURE §3.2 SEO, ADR-001 §10): /learn, every board × class page and every subject
 * page, from the catalog API. Separate from the marketing app/sitemap.ts, which is unchanged. Listing it in
 * robots.txt / a sitemap index is a later, flag-on change (ADR-011 follow-up). Chapter URLs join when the API
 * offers a bulk chapter listing (one call per subject is too many for a sitemap request).
 * 404 while the platform flag is off (GEN-4).
 */
import { readFlags } from '@/platform/shared/config/flags';
import { SITE_URL } from '@/lib/seo/config';
import { getSubjects } from '@/components/platform/server/catalog';
import { BOARDS, CLASS_LEVELS, learnPath } from '@/components/platform/lib/catalog';

export const dynamic = 'force-dynamic';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(): Promise<Response> {
  if (!readFlags().platformEnabled) return new Response(null, { status: 404 });
  const paths: string[] = ['/learn'];
  try {
    for (const board of BOARDS) {
      for (const c of CLASS_LEVELS) {
        const data = await getSubjects(board, c);
        if (!data) continue;
        paths.push(learnPath(board, c));
        for (const s of data.subjects) paths.push(learnPath(board, c, s.id));
      }
    }
  } catch {
    return new Response(null, { status: 503, headers: { 'retry-after': '600', 'cache-control': 'no-store' } });
  }
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${esc(SITE_URL + p)}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400' },
  });
}
