/**
 * JSON-LD builders. Every node carries a stable `@id` so the graph is
 * connected: WebPage → isPartOf WebSite → publisher Organization.
 * That connected entity graph is what search engines and AI assistants use
 * to decide "who is this site, and can I trust it?".
 */

import type { FaqItem } from '@/content/faqs';
import type { JournalArticle } from '@/content/journal';
import {
  ORGANIZATION_ID,
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_EXPANSION,
  SITE_LANGUAGE,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_SOCIAL_PROFILES,
  SITE_TAGLINE,
  SITE_URL,
  WEBSITE_ID,
  LOGO_PATH,
  absoluteUrl,
} from './config';
import { CONTENT_LAST_MODIFIED, getPage } from './pages';
import { ogImageUrl } from './metadata';

type JsonLdNode = Record<string, unknown>;

export function graph(...nodes: Array<JsonLdNode | null | undefined | false>): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

const orgRef = { '@id': ORGANIZATION_ID };

export function organizationNode(): JsonLdNode {
  return {
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: ['SOYL', SITE_EXPANSION],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: absoluteUrl(LOGO_PATH),
      contentUrl: absoluteUrl(LOGO_PATH),
      width: 512,
      height: 512,
      caption: SITE_NAME,
    },
    image: absoluteUrl(LOGO_PATH),
    address: {
      '@type': 'PostalAddress',
      ...SITE_ADDRESS,
    },
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_LEGAL_NAME,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'school partnerships',
      url: absoluteUrl('/contact'),
      availableLanguage: ['English'],
    },
    knowsAbout: [
      'Outcome-based learning',
      'Artificial intelligence in education',
      'Assessment design',
      'Critical thinking',
      'Project-based learning',
      'Teacher professional development',
    ],
    ...(SITE_SOCIAL_PROFILES.length ? { sameAs: SITE_SOCIAL_PROFILES } : {}),
  };
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: orgRef,
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(path: string, crumbs: Crumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Home → page breadcrumb trail for a top-level page. */
export function topLevelCrumbs(path: string): Crumb[] {
  return [
    { name: 'Home', path: '/' },
    { name: getPage(path).label, path },
  ];
}

interface WebPageOptions {
  path: string;
  type?: string;
  name?: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  mainEntityId?: string;
}

export function webPageNode({
  path,
  type,
  name,
  description,
  datePublished,
  dateModified,
  mainEntityId,
}: WebPageOptions): JsonLdNode {
  const entry = getPage(path);
  const url = absoluteUrl(path);
  return {
    '@type': type ?? entry.type,
    '@id': `${url}#webpage`,
    url,
    name: name ?? entry.title,
    description: description ?? entry.description,
    inLanguage: SITE_LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    about: orgRef,
    publisher: orgRef,
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImageUrl(path) },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    ...(datePublished ? { datePublished } : {}),
    dateModified: dateModified ?? CONTENT_LAST_MODIFIED,
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
  };
}

export function faqNode(path: string, faqs: FaqItem[]): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    isPartOf: { '@id': `${absoluteUrl(path)}#webpage` },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function articleNode(article: JournalArticle): JsonLdNode {
  const path = `/journal/${article.slug}`;
  const url = absoluteUrl(path);
  const wordCount = article.content.trim().split(/\s+/).length;
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: { '@id': `${absoluteUrl('/journal')}#webpage` },
    image: [article.image ? absoluteUrl(article.image) : ogImageUrl(path)],
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    inLanguage: SITE_LANGUAGE,
    wordCount,
    timeRequired: `PT${article.readingTime}M`,
    author: article.author === SITE_NAME
      ? orgRef
      : { '@type': 'Person', name: article.author },
    publisher: orgRef,
  };
}

export function journalListNode(articles: JournalArticle[]): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/journal')}#list`,
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/journal/${article.slug}`),
      name: article.title,
    })),
  };
}

export function methodTermSetNode(
  pillars: Array<{ name: string; tagline: string }>
): JsonLdNode {
  const url = absoluteUrl('/method');
  return {
    '@type': 'DefinedTermSet',
    '@id': `${url}#method`,
    name: 'The SOYL Method',
    description:
      'An outcome-based learning framework that makes student thinking visible through five demonstrations of learning.',
    url,
    inLanguage: SITE_LANGUAGE,
    hasDefinedTerm: pillars.map((pillar, index) => ({
      '@type': 'DefinedTerm',
      name: pillar.name,
      description: pillar.tagline,
      termCode: String(index + 1).padStart(2, '0'),
      inDefinedTermSet: { '@id': `${url}#method` },
    })),
  };
}

export function howToNode(
  name: string,
  description: string,
  steps: Array<{ title: string; desc: string }>
): JsonLdNode {
  const url = absoluteUrl('/schools');
  return {
    '@type': 'HowTo',
    '@id': `${url}#workflow`,
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.desc,
      url: `${url}#workflow`,
    })),
  };
}

export function programListNode(
  programs: Array<{ title: string; description: string; category: string }>
): JsonLdNode {
  const url = absoluteUrl('/what-we-teach');
  return {
    '@type': 'ItemList',
    '@id': `${url}#programs`,
    name: 'SOYL Academy programs',
    itemListElement: programs.map((program, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: program.title,
      description: program.description,
      item: {
        '@type': 'Thing',
        name: program.title,
        description: program.description,
        additionalType: program.category,
      },
    })),
  };
}
