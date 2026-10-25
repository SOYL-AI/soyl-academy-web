import { journalArticles } from '@/content/journal';
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/lib/seo/config';

export const dynamic = 'force-static';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** RSS 2.0 feed of the SOYL Journal (linked from the root layout). */
export function GET() {
  const items = [...journalArticles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((a) => {
      const url = absoluteUrl(`/journal/${a.slug}`);
      return `<item><title>${escape(a.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${escape(a.excerpt)}</description></item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(`${SITE_NAME} Journal`)}</title><link>${absoluteUrl('/journal')}</link><description>${escape(SITE_DESCRIPTION)}</description><language>en-IN</language>${items}</channel></rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
