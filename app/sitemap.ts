import { MetadataRoute } from 'next';
import { journalArticles } from '@/content/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soyl.academy';
  const lastModified = new Date();

  const staticRoutes = [
    '',
    '/method',
    '/what-we-teach',
    '/schools',
    '/students',
    '/journal',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const journalRoutes = (journalArticles || []).map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(article.date || lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...journalRoutes];
}
