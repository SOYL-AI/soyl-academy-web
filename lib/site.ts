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

/* ── Header mega menus and footer columns (ADR-025) ─────────────────────────────────────────────── */

/** Icons are the inline set in components/layout/NavIcon.tsx (no icon dependency). */
export type NavIconName =
  | 'school'
  | 'teacher'
  | 'parent'
  | 'student'
  | 'method'
  | 'rocket'
  | 'shapes'
  | 'book'
  | 'tests'
  | 'chat'
  | 'about'
  | 'journal'
  | 'mail'
  | 'calendar'
  | 'team'
  | 'briefcase';

export interface NavItem extends NavLink {
  /** One line under the title, written from the page's own copy. */
  description: string;
  icon: NavIconName;
}

/** The card on the right of a menu panel. */
export interface NavFeature {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  tone: 'cobalt' | 'ink' | 'paper';
}

export interface NavGroup {
  id: string;
  /** Top-bar label. */
  label: string;
  /** Small uppercase heading above the items inside the panel. */
  heading: string;
  items: NavItem[];
  /** 'latest-journal' is filled from content/journal.ts at build time (components/layout/Header.tsx). */
  feature: NavFeature | 'latest-journal';
}

const ITEMS = {
  schools: {
    label: 'For schools',
    href: '/schools',
    description: 'A ten-week pilot that rethinks homework for the age of AI.',
    icon: 'school',
  },
  teachers: {
    label: 'For teachers',
    href: '/teachers',
    description: 'Turn your notes into interactive assignments you approve.',
    icon: 'teacher',
  },
  parents: {
    label: 'For parents',
    href: '/parents',
    description: 'See your child’s progress and feedback, not just a mark.',
    icon: 'parent',
  },
  students: {
    label: 'For students',
    href: '/students',
    description: 'Solve, build, argue and explain: learn beyond the answer.',
    icon: 'student',
  },
  method: {
    label: 'The SOYL Method',
    href: '/method',
    description: 'Understand, Apply, Create, Defend, Reflect.',
    icon: 'method',
  },
  futureBuilders: {
    label: 'Future Builders',
    href: '/future-builders',
    description: 'Live online tech cohort for Grades 7–12: Python, AI and IoT.',
    icon: 'rocket',
  },
  whatWeTeach: {
    label: 'What we teach',
    href: '/what-we-teach',
    description: 'AI, making, communication and problem-solving programs.',
    icon: 'shapes',
  },
  lessons: {
    label: 'Free lessons',
    href: '/learn',
    description: 'Visual lessons, notes, flashcards and practice for Classes 7–12.',
    icon: 'book',
  },
  tests: {
    label: 'Tests',
    href: '/tests',
    description: 'Timed chapter tests and test series with instant results.',
    icon: 'tests',
  },
  ask: {
    label: 'Ask AI',
    href: '/ask',
    description: 'Ask a doubt and get a step-by-step explanation. Uses AI credits.',
    icon: 'chat',
  },
  about: {
    label: 'About SOYL',
    href: '/about',
    description: 'Our story: answers are cheap, thinking is not.',
    icon: 'about',
  },
  journal: {
    label: 'Journal',
    href: '/journal',
    description: 'Essays on learning, technology and AI.',
    icon: 'journal',
  },
  contact: {
    label: 'Contact',
    href: '/contact',
    description: 'Write to us about a pilot for your school.',
    icon: 'mail',
  },
  demo: {
    label: 'Book a demo',
    href: '/book-a-demo',
    description: 'See SOYL in action and get a pilot plan.',
    icon: 'calendar',
  },
} as const satisfies Record<string, NavItem>;

const LEARN_GROUP: NavGroup = {
  id: 'learn',
  label: 'Learn',
  heading: 'Free learning platform',
  items: [ITEMS.lessons, ITEMS.tests, ITEMS.ask],
  feature: {
    eyebrow: 'Now live: CBSE Class 10',
    title: 'Free for every student',
    description: 'Lessons, practice and tests are free. Only AI help uses credits. More classes and ICSE are on the way.',
    href: '/learn',
    cta: 'Start learning free',
    tone: 'ink',
  },
};

/**
 * Company pages that do not exist yet (Team, Careers): once the page exists with real content from the
 * owner, add ONE line to the About group's items, e.g.
 *   { label: 'Team', href: '/team', description: 'The people building SOYL Academy.', icon: 'team' },
 *   { label: 'Careers', href: '/careers', description: 'Open roles at SOYL.', icon: 'briefcase' },
 * The desktop menu, the mobile sheet and the footer's Company column all pick it up.
 * Never link a page that does not exist.
 */
const COMPANY_ITEMS: NavItem[] = [ITEMS.about, ITEMS.method, ITEMS.journal, ITEMS.contact, ITEMS.demo];

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'programs',
    label: 'Programs',
    heading: 'SOYL Academy for',
    items: [ITEMS.schools, ITEMS.teachers, ITEMS.parents, ITEMS.students, ITEMS.method],
    feature: {
      eyebrow: 'For schools',
      title: 'See SOYL in your school',
      description: 'Interactive, teacher-approved assignments for Grades 1–10, and a ten-week pilot plan.',
      href: '/book-a-demo',
      cta: 'Book a demo',
      tone: 'cobalt',
    },
  },
  {
    id: 'future-builders',
    label: 'Future Builders',
    heading: 'Programs',
    items: [ITEMS.futureBuilders, ITEMS.whatWeTeach],
    feature: {
      eyebrow: 'Live cohort · Grades 7–12',
      title: 'Build a working prototype',
      description: 'Students build with a home hardware kit and pitch their idea on Demo Day.',
      href: '/future-builders',
      cta: 'Explore Future Builders',
      tone: 'paper',
    },
  },
  ...(PLATFORM_ENABLED ? [LEARN_GROUP] : []),
  {
    id: 'about',
    label: 'About',
    heading: 'Company',
    items: COMPANY_ITEMS,
    feature: 'latest-journal',
  },
];

const footerLink = ({ label, href }: NavLink): NavLink => ({ label, href });

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Programs',
    links: [ITEMS.schools, ITEMS.teachers, ITEMS.parents, ITEMS.students, ITEMS.method].map(footerLink),
  },
  {
    heading: 'Future Builders',
    links: [ITEMS.futureBuilders, ITEMS.whatWeTeach].map(footerLink),
  },
  ...(PLATFORM_ENABLED ? [{ heading: 'Learn', links: LEARN_GROUP.items.map(footerLink) }] : []),
  {
    heading: 'Company',
    links: COMPANY_ITEMS.filter((i) => i.href !== '/method').map(footerLink),
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy & cookies', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Refund policy', href: '/refund-policy' },
      { label: 'Shipping policy', href: '/shipping-policy' },
    ],
  },
];

/** Verified profiles only; add no placeholder accounts (see SITE_SOCIAL_PROFILES in lib/seo/config.ts). */
export const SOCIAL_LINKS: { label: string; href: string; icon: 'instagram' }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/soylacademy/', icon: 'instagram' },
];
