/**
 * Site-wide configuration that is not SEO (see lib/seo/config.ts for that).
 */

/**
 * The product app. "Sign in" links here. Set NEXT_PUBLIC_APP_URL once the app
 * has a custom domain; nothing else needs to change.
 */
export const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL ||
  'https://soylacad-web.bravesmoke-98c7316a.centralindia.azurecontainerapps.io'
).replace(/\/+$/, '');

/**
 * Content placeholders (missing screenshots, photos, quotes, numbers) render as
 * clearly labelled TODO frames in development and on Vercel preview deploys, and
 * are hidden on the live site. NEXT_PUBLIC_SHOW_CONTENT_TODOS=true|false overrides.
 */
const todoOverride = process.env.NEXT_PUBLIC_SHOW_CONTENT_TODOS;
export const SHOW_CONTENT_TODOS =
  todoOverride === 'true' ||
  (todoOverride !== 'false' &&
    (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'));

export const PRIMARY_CTA = { label: 'Book a demo', href: '/book-a-demo' } as const;

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Learning platform entry points (D-019, ADR-001 §4): only when NEXT_PUBLIC_PLATFORM_ENABLED is 'true'
 * (read as the literal so Next inlines it at build time). With the flag off the header, mobile menu and
 * footer contain no platform link at all (GEN-4).
 */
export const PLATFORM_ENABLED = process.env.NEXT_PUBLIC_PLATFORM_ENABLED === 'true';

/** The platform's log-in entry: /me shows the log-in sheet to guests and the profile to members. */
export const PLATFORM_LOGIN_HREF = '/me';

/* ── Header, site index and footer (ADR-025, redrawn in ADR-033) ─────────────────────────────────────────── */

export interface NavItem extends NavLink {
  /** One line under the title in the site index, written from the page's own copy. */
  description: string;
}

const ITEMS = {
  method: {
    label: 'How missions work',
    href: '/method',
    description: 'Spark, Build, Defend, Fix, Reflect: one hour, five stages.',
  },
  schools: {
    label: 'For schools',
    href: '/schools',
    description: 'A ten-week pilot of missions, planned with your teachers.',
  },
  teachers: {
    label: 'For teachers',
    href: '/teachers',
    description: 'Set outcomes, approve the mission, and get Monday sorted.',
  },
  parents: {
    label: 'For parents',
    href: '/parents',
    description: 'A Thoughtprint after every mission, not just a mark.',
  },
  students: {
    label: 'For pupils',
    href: '/students',
    description: 'Your own path through every mission. Hints never give the answer.',
  },
  futureBuilders: {
    label: 'Future Builders',
    href: '/future-builders',
    description: 'Live online tech camp for Grades 7–12: Python, AI and IoT.',
  },
  whatWeTeach: {
    label: 'What we teach',
    href: '/what-we-teach',
    description: 'AI, making, communication and problem-solving.',
  },
  lessons: {
    label: 'Free lessons',
    href: '/learn',
    description: 'Visual lessons, notes, flashcards and practice for Classes 7–12.',
  },
  tests: {
    label: 'Tests',
    href: '/tests',
    description: 'Chapter tests and test series with instant results.',
  },
  ask: {
    label: 'Ask AI',
    href: '/ask',
    description: 'Ask a doubt, get a step-by-step explanation. Uses AI credits.',
  },
  about: {
    label: 'About SOYL',
    href: '/about',
    description: 'Story of Your Life: answers are cheap, thinking is not.',
  },
  journal: {
    label: 'Journal',
    href: '/journal',
    description: 'Essays on learning, technology and AI.',
  },
  contact: {
    label: 'Contact',
    href: '/contact',
    description: 'Write to us about missions for your school.',
  },
  demo: {
    label: 'Book a demo',
    href: '/book-a-demo',
    description: 'See a mission from both sides, and get a pilot plan.',
  },
} as const satisfies Record<string, NavItem>;

/** The links in the top bar on wide screens. Everything else lives in the site index. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Missions', href: '/method' },
  { label: 'Schools', href: '/schools' },
  { label: 'Teachers', href: '/teachers' },
  { label: 'Parents', href: '/parents' },
  { label: 'Future Builders', href: '/future-builders' },
];

export interface IndexChapter {
  heading: string;
  items: NavItem[];
}

/**
 * The site index: the full-page table of contents behind the header's "Index" button, and the footer's columns.
 * Company pages that do not exist yet (Team, Careers): add ONE item to the SOYL chapter once the page exists.
 * Never link a page that does not exist.
 */
export const SITE_INDEX: IndexChapter[] = [
  { heading: 'Missions', items: [ITEMS.method, ITEMS.schools, ITEMS.teachers, ITEMS.parents, ITEMS.students] },
  { heading: 'Programmes', items: [ITEMS.futureBuilders, ITEMS.whatWeTeach] },
  ...(PLATFORM_ENABLED ? [{ heading: 'Learn free', items: [ITEMS.lessons, ITEMS.tests, ITEMS.ask] }] : []),
  { heading: 'SOYL', items: [ITEMS.about, ITEMS.journal, ITEMS.contact, ITEMS.demo] },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy & cookies', href: '/privacy' },
  { label: 'Terms of service', href: '/terms' },
  { label: 'Refund policy', href: '/refund-policy' },
  { label: 'Shipping policy', href: '/shipping-policy' },
];

const footerLink = ({ label, href }: NavLink): NavLink => ({ label, href });

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  ...SITE_INDEX.map((c) => ({ heading: c.heading, links: c.items.map(footerLink) })),
  { heading: 'Legal', links: LEGAL_LINKS },
];

/** Verified profiles only; add no placeholder accounts (see SITE_SOCIAL_PROFILES in lib/seo/config.ts). */
export const SOCIAL_LINKS: { label: string; href: string; icon: 'instagram' }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/soylacademy/', icon: 'instagram' },
];
