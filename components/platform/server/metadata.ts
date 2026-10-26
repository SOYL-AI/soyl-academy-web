/**
 * Metadata for public platform pages (ARCHITECTURE §3.2 SEO): title (the root layout appends
 * "| SOYL Academy"), description, canonical URL (metadataBase is the site origin, lib/seo/config.ts),
 * Open Graph and Twitter text so shares never show the marketing home title.
 */
import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo/config';

export function platformMetadata({ title, description, path, index = true }: { title: string; description: string; path: string; index?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: SITE_NAME, title: `${title} | ${SITE_NAME}`, description, url: path, locale: 'en_IN' },
    twitter: { card: 'summary', title: `${title} | ${SITE_NAME}`, description },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
  };
}
