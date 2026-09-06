/**
 * Content accessor — abstracts local vs CMS content.
 * Falls back to local TypeScript data when Sanity is not configured.
 */

import { isSanityConfigured, fetchFromSanity } from '@/lib/cms/sanity';
import { journalArticles, type JournalArticle } from '@/content/journal';
import { programs, type Program } from '@/content/programs';

export async function getJournalArticles(): Promise<JournalArticle[]> {
  if (isSanityConfigured()) {
    const articles = await fetchFromSanity<JournalArticle[]>(
      '*[_type == "article"] | order(date desc)'
    );
    if (articles) return articles;
  }

  return journalArticles;
}

export async function getJournalArticle(
  slug: string
): Promise<JournalArticle | undefined> {
  if (isSanityConfigured()) {
    const article = await fetchFromSanity<JournalArticle>(
      `*[_type == "article" && slug.current == $slug][0]`,
      { slug }
    );
    if (article) return article;
  }

  return journalArticles.find((a) => a.slug === slug);
}

export async function getPrograms(): Promise<Program[]> {
  if (isSanityConfigured()) {
    const progs = await fetchFromSanity<Program[]>(
      '*[_type == "program"] | order(order asc)'
    );
    if (progs) return progs;
  }

  return programs;
}
