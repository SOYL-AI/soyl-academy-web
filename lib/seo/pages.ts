/**
 * Page registry — the one place that describes every indexable page.
 *
 * It drives: per-page <title>/description/canonical, Open Graph card text,
 * the XML sitemap, llms.txt, and JSON-LD WebPage nodes. Add a new page here
 * and it is picked up everywhere.
 */

import { journalArticles } from '@/content/journal';

/**
 * Bump this when site-wide content is meaningfully updated. It feeds the
 * sitemap `lastmod` for static pages. Do not replace it with `new Date()`:
 * search engines learn to ignore `lastmod` when it changes on every build.
 */
export const CONTENT_LAST_MODIFIED = '2026-10-03';

export type PageType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage';

export interface PageEntry {
  path: string;
  /** Short page title. The root layout appends " | SOYL Academy". */
  title: string;
  /** Meta description: aim for 120–160 characters, answer-first. */
  description: string;
  /** Breadcrumb / llms.txt label. */
  label: string;
  /** Schema.org page type. */
  type: PageType;
  /** Eyebrow text on the generated social card. */
  eyebrow: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const HOME_TITLE = 'SOYL Academy | Outcome-Based Learning in the Age of AI';

export const PAGES: Record<string, PageEntry> = {
  '/': {
    path: '/',
    title: HOME_TITLE,
    label: 'Home',
    description:
      'SOYL Academy helps teachers create outcome-based learning experiences that ask students to think, apply, create, explain and defend — not simply submit.',
    type: 'WebPage',
    eyebrow: 'SOYL Academy',
    priority: 1,
    changeFrequency: 'weekly',
  },
  '/method': {
    path: '/method',
    title: 'The SOYL Method — Outcome-Based Learning',
    label: 'The SOYL Method',
    description:
      'An outcome-based framework with five pillars — Understand, Apply, Create, Defend, Reflect — that makes student thinking visible in the age of AI.',
    type: 'WebPage',
    eyebrow: 'The SOYL Method',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  '/what-we-teach': {
    path: '/what-we-teach',
    title: 'What We Teach — Programs & Workshops',
    label: 'What We Teach',
    description:
      'Programs in AI & technology, building & making, communication and problem solving: Applied Intelligence, Digital Craftsmanship, The Art of Argument, Systems Thinking.',
    type: 'CollectionPage',
    eyebrow: 'What We Teach',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  '/schools': {
    path: '/schools',
    title: 'For Schools — Rethink Homework in the AI Era',
    label: 'For Schools',
    description:
      'Partner with SOYL Academy to redesign assignments for the age of AI. A ten-week pilot that fits Common Core, IB, IGCSE or local curricula, with teachers in control.',
    type: 'WebPage',
    eyebrow: 'For Schools',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  '/students': {
    path: '/students',
    title: 'For Students — Learn Beyond the Answer',
    label: 'For Students',
    description:
      'Solve, build, argue, explain and reflect. SOYL Academy assignments let you use AI — and ask you to explain your process and defend your ideas.',
    type: 'WebPage',
    eyebrow: 'For Students',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  '/journal': {
    path: '/journal',
    title: 'The SOYL Journal — Ideas on Learning and AI',
    label: 'Journal',
    description:
      'Essays on learning, technology and the school that’s coming next: AI and homework, outcome-based learning, assessment and teaching from SOYL Academy.',
    type: 'CollectionPage',
    eyebrow: 'The SOYL Journal',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  '/about': {
    path: '/about',
    title: 'About SOYL Academy — Why School Has to Change',
    label: 'About',
    description:
      'Answers changed, so school has to change too. The thesis behind SOYL Academy: assess the process, not the product, and keep teachers at the centre of learning.',
    type: 'AboutPage',
    eyebrow: 'About',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact — Bring SOYL to Your School',
    label: 'Contact',
    description:
      'Get in touch with SOYL Academy to enquire about a school pilot. Based in Indiranagar, Bengaluru, India.',
    type: 'ContactPage',
    eyebrow: 'Contact',
    priority: 0.6,
    changeFrequency: 'yearly',
  },
};

export function getPage(path: string): PageEntry {
  return PAGES[path] ?? PAGES['/'];
}

/**
 * Resolve the text shown on a generated social card for any indexable path,
 * including journal articles. Unknown paths fall back to the home card, so
 * the /og endpoint can never be used to render arbitrary text.
 */
export function getOgContent(path: string): { eyebrow: string; title: string; description: string } {
  const articleMatch = path.match(/^\/journal\/([a-z0-9-]+)$/);
  if (articleMatch) {
    const article = journalArticles.find((a) => a.slug === articleMatch[1]);
    if (article) {
      return {
        eyebrow: `The SOYL Journal · ${article.category}`,
        title: article.title,
        description: article.excerpt,
      };
    }
  }

  const page = PAGES[path];
  if (page && path !== '/') {
    return {
      eyebrow: page.eyebrow,
      title: page.title.split(' — ')[0].split(' | ')[0],
      description: page.description,
    };
  }

  return {
    eyebrow: 'SOYL Academy',
    title: 'Homework was built for a world before AI.',
    description: PAGES['/'].description,
  };
}
