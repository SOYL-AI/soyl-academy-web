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
export const CONTENT_LAST_MODIFIED = '2026-10-25';

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

export const HOME_TITLE = 'SOYL Academy | Interactive Assignments for Grades 1–10';

export const PAGES: Record<string, PageEntry> = {
  '/': {
    path: '/',
    title: HOME_TITLE,
    label: 'Home',
    description:
      'SOYL Academy turns teachers’ notes into interactive, teacher-approved assignments for Grades 1–10. Students learn by doing, with hints that never give the answer.',
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
  '/teachers': {
    path: '/teachers',
    title: 'For Teachers — Assignments From Your Own Notes',
    label: 'For Teachers',
    description:
      'Turn your notes into interactive assignments for Grades 1–10. You approve every question; students get hints, not answers; you see each pupil’s path.',
    type: 'WebPage',
    eyebrow: 'For Teachers',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  '/parents': {
    path: '/parents',
    title: 'For Parents — See How Your Child Learns',
    label: 'For Parents',
    description:
      'With SOYL, parents see their child’s progress and teacher feedback, not just a mark. Hints guide students without giving answers away.',
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
      'Book a demo of SOYL Academy for your school: interactive, teacher-approved assignments for Grades 1–10, and a ten-week pilot plan.',
    type: 'ContactPage',
    eyebrow: 'Book a demo',
    priority: 0.9,
    changeFrequency: 'yearly',
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
      'Get in touch with SOYL Academy at outreach@soyl.cloud to enquire about a school pilot. Based in Bengaluru 560043.',
    type: 'ContactPage',
    eyebrow: 'Contact',
    priority: 0.6,
    changeFrequency: 'yearly',
  },
  '/future-builders': {
    path: '/future-builders',
    title: 'Future Builders — Weekend Tech Cohort for Grades 7–12',
    label: 'Future Builders',
    description:
      'A 12-weekend live online cohort for Grades 7–12: software, AI, IoT robotics and entrepreneurship, with a hardware kit. Students build a working prototype and pitch it.',
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
