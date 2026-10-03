import type { Metadata } from 'next';
import {
  SITE_NAME,
  SITE_LOCALE,
  SITE_KEYWORDS,
  absoluteUrl,
} from './config';
import { getPage, HOME_TITLE } from './pages';

/** URL of the generated social card for a given page path. */
export function ogImageUrl(path: string): string {
  return absoluteUrl(`/og?path=${encodeURIComponent(path)}`);
}

interface CreateMetadataOptions {
  /** Page title without the brand suffix. Ignored when `path` is in the registry. */
  title?: string;
  description?: string;
  /** Route path, e.g. `/method`. Looks up title + description in the page registry. */
  path: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
  /** Article-only fields */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}

/**
 * Build complete per-page metadata: title, description, canonical URL,
 * Open Graph + Twitter cards (with a generated 1200×630 card) and robots.
 *
 * Pass only `path` for pages listed in `lib/seo/pages.ts`; pass `title` and
 * `description` for dynamic routes such as journal articles.
 */
export function createMetadata(options: CreateMetadataOptions): Metadata {
  const entry = getPage(options.path);
  const isHome = options.path === '/';
  const title = options.title ?? entry.title;
  const description = options.description ?? entry.description;
  const url = absoluteUrl(options.path);
  const fullTitle = isHome || title === HOME_TITLE ? title : `${title} | ${SITE_NAME}`;
  const image = ogImageUrl(options.path);
  const type = options.type ?? 'website';

  return {
    title: isHome ? { absolute: title } : title,
    description,
    keywords: options.keywords ?? SITE_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      ...(type === 'article'
        ? {
            publishedTime: options.publishedTime,
            modifiedTime: options.modifiedTime ?? options.publishedTime,
            authors: options.authors,
            section: options.section,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: image, alt: fullTitle }],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
  };
}
