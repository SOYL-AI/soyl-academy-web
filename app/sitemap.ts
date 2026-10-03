import type { MetadataRoute } from 'next';
import { journalArticles } from '@/content/journal';
import { absoluteUrl } from '@/lib/seo/config';
import { CONTENT_LAST_MODIFIED, PAGES } from '@/lib/seo/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = Object.values(PAGES).map((page) => ({
    url: absoluteUrl(page.path),
    // Real, deliberate dates — not `new Date()` — so lastmod stays trustworthy.
    lastModified:
      page.path === '/journal'
        ? new Date(
            [...journalArticles].map((a) => a.date).sort().at(-1) ?? CONTENT_LAST_MODIFIED
          )
        : new Date(CONTENT_LAST_MODIFIED),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: [absoluteUrl(`/og?path=${encodeURIComponent(page.path)}`)],
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalArticles.map((article) => ({
    url: absoluteUrl(`/journal/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [absoluteUrl(`/og?path=${encodeURIComponent(`/journal/${article.slug}`)}`)],
  }));

  return [...staticRoutes, ...journalRoutes];
}
