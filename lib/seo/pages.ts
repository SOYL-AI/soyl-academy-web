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
export const CONTENT_LAST_MODIFIED = '2026-10-28';

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

export const HOME_TITLE = 'SOYL Academy | Missions, Not Assignments';

export const PAGES: Record<string, PageEntry> = {
  '/': {
    path: '/',
    title: HOME_TITLE,
    label: 'Home',
    description:
      'SOYL Academy replaces assignments with missions: one scene, a different path for every pupil, and a Thoughtprint instead of a mark. Teachers approve every mission.',
    type: 'WebPage',
    eyebrow: 'SOYL Academy',
    priority: 1,
    changeFrequency: 'weekly',
  },
  '/method': {
    path: '/method',
    title: 'How Missions Work — Spark, Build, Defend, Fix, Reflect',
    label: 'How missions work',
    description:
      'A SOYL mission is one hour at most, in five stages: Spark, Build, Defend, Fix and Reflect. It adapts to each pupil and ends when the evidence is in.',
    type: 'WebPage',
    eyebrow: 'How missions work',
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
    title: 'For Schools — Bring Missions to Your School',
    label: 'For Schools',
    description:
      'Replace assignments with missions in a ten-week pilot that fits your curriculum, with teachers approving every mission and seeing each pupil’s thinking.',
    type: 'WebPage',
    eyebrow: 'For Schools',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  '/teachers': {
    path: '/teachers',
    title: 'For Teachers — Set Outcomes, Approve the Mission',
    label: 'For Teachers',
    description:
      'Set the outcomes, read a short mission brief and approve it. Afterwards, see your class grouped by misconception, with evidence and a suggested next move.',
    type: 'WebPage',
    eyebrow: 'For Teachers',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  '/parents': {
    path: '/parents',
    title: 'For Parents — A Thoughtprint, Not Just a Mark',
    label: 'For Parents',
    description:
      'After every SOYL mission your child gets a Thoughtprint: what they can now do and how they got there. Never more than 60 minutes, never a mark as the headline.',
    type: 'WebPage',
    eyebrow: 'For Parents',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  '/book-a-demo': {
    path: '/book-a-demo',
    title: 'Book a Demo of SOYL Academy',
    label: 'Book a demo',
    description:
      'Book a demo of SOYL Academy: see a mission from the pupil’s side and the teacher’s, and get a ten-week pilot plan for your school.',
    type: 'ContactPage',
    eyebrow: 'Book a demo',
    priority: 0.9,
    changeFrequency: 'yearly',
  },
  '/students': {
    path: '/students',
    title: 'For Pupils — Your Path Through Every Mission',
    label: 'For pupils',
    description:
      'One scene, your own path, and a guide that never gives the answer. Say it, type it or snap your notebook, and leave with a Thoughtprint.',
    type: 'WebPage',
    eyebrow: 'For pupils',
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
      'SOYL stands for Story of Your Life. Answers are cheap now; thinking is not. Why we are replacing assignments with missions, and keeping teachers at the centre.',
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
      'Get in touch with SOYL Academy at outreach@soyl.cloud about missions for your school. Based in Bengaluru 560043.',
    type: 'ContactPage',
    eyebrow: 'Contact',
    priority: 0.6,
    changeFrequency: 'yearly',
  },
  '/future-builders': {
    path: '/future-builders',
    title: 'Future Builders — Live Tech Summer Camp for Grades 7–12',
    label: 'Future Builders',
    description:
      'Live online summer camp for Grades 7–12, April–May 2027: Python, AI, IoT and entrepreneurship. Students build a working prototype with a home hardware kit and pitch it on Demo Day.',
    type: 'WebPage',
    eyebrow: 'Future Builders',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy & Cookie Policy | SOYL Academy',
    label: 'Privacy Policy',
    description: 'Privacy Policy and Cookie Notice of SOYL Academy under India DPDP Act 2023 and GDPR.',
    type: 'WebPage',
    eyebrow: 'Legal Notice',
    priority: 0.4,
    changeFrequency: 'monthly',
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Service | SOYL Academy',
    label: 'Terms of Service',
    description: 'Terms of Service, enrollment conditions, and student IP ownership for SOYL Academy.',
    type: 'WebPage',
    eyebrow: 'Terms of Service',
    priority: 0.4,
    changeFrequency: 'monthly',
  },
  '/refund-policy': {
    path: '/refund-policy',
    title: 'Cancellation & Refund Policy | SOYL Academy',
    label: 'Refund Policy',
    description: 'Cancellation and refund terms of SOYL Academy, including the 100% Session 1 Money-Back Guarantee.',
    type: 'WebPage',
    eyebrow: 'Refund Policy',
    priority: 0.4,
    changeFrequency: 'monthly',
  },
  '/shipping-policy': {
    path: '/shipping-policy',
    title: 'Shipping & Delivery Policy | SOYL Academy',
    label: 'Shipping Policy',
    description: 'Doorstep hardware kit delivery timelines and policy across India for Future Builders.',
    type: 'WebPage',
    eyebrow: 'Shipping Policy',
    priority: 0.4,
    changeFrequency: 'monthly',
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
