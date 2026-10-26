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
 * Learning platform entry point (D-019, ADR-001 §4): only when NEXT_PUBLIC_PLATFORM_ENABLED is 'true'
 * (inlined at build time). With the flag off MAIN_NAV is exactly the list below, so the rendered
 * header is byte-identical to the site without the platform.
 */
const PLATFORM_NAV: NavLink[] =
  process.env.NEXT_PUBLIC_PLATFORM_ENABLED === 'true' ? [{ label: 'Learn', href: '/learn' }] : [];

export const MAIN_NAV: NavLink[] = [
  ...PLATFORM_NAV,
  { label: 'For schools', href: '/schools' },
  { label: 'For teachers', href: '/teachers' },
  { label: 'For parents', href: '/parents' },
  { label: 'Future Builders', href: '/future-builders' },
  { label: 'About', href: '/about' },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'SOYL Academy',
    links: [
      { label: 'For schools', href: '/schools' },
      { label: 'For teachers', href: '/teachers' },
      { label: 'For parents', href: '/parents' },
      { label: 'For students', href: '/students' },
      { label: 'The SOYL Method', href: '/method' },
    ],
  },
  {
    heading: 'Programmes',
    links: [
      { label: 'Future Builders', href: '/future-builders' },
      { label: 'What we teach', href: '/what-we-teach' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book a demo', href: '/book-a-demo' },
    ],
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

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/soylacademy/' },
];
