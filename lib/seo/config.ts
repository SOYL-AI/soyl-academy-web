/**
 * Single source of truth for every SEO / AEO / GEO value on the site.
 * Nothing else should hard-code the domain, brand name or address.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soylacademy.com';

/** Canonical origin, without a trailing slash. */
export const SITE_URL = rawSiteUrl.replace(/\/+$/, '');

export const SITE_NAME = 'SOYL Academy';
export const SITE_LEGAL_NAME = 'SOYL AI Private Limited';
export const SITE_EXPANSION = 'Story Of Your Life';
export const SITE_TAGLINE = 'Thinking is the work';
export const SITE_LOCALE = 'en_IN';
export const SITE_LANGUAGE = 'en-IN';

export const SITE_DESCRIPTION =
  'SOYL Academy turns teachers’ notes into interactive, teacher-approved assignments for Grades 1–10. Students learn by doing, with hints that never give the answer, and teachers see each pupil’s process.';

export const SITE_KEYWORDS = [
  'outcome-based learning',
  'AI in education',
  'homework in the age of AI',
  'AI-resistant assignments',
  'assessment design',
  'teacher tools',
  'SOYL Method',
  'school partnerships',
  'critical thinking',
  'project-based learning',
];

export const SITE_CONTACT_EMAIL = 'outreach@soyl.cloud';

export const SITE_ADDRESS = {
  streetAddress: 'Bengaluru 560043',
  postalCode: '560043',
} as const;

/**
 * Verified social profiles. Add real URLs here (or via env) once the accounts
 * exist — they are emitted as `sameAs` in the Organization schema, which is a
 * strong entity-disambiguation signal for search and AI engines.
 * Do NOT add placeholder URLs: unverifiable `sameAs` entries hurt more than
 * they help.
 */
export const SITE_SOCIAL_PROFILES: string[] = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_X_URL,
].filter((u): u is string => Boolean(u));

/** Stable @id values so JSON-LD nodes can reference each other. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Square brand mark used for schema `logo` and PWA icons. */
export const LOGO_PATH = '/brand/soyl-mark-512.png';

export function absoluteUrl(path = ''): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path === '/' ? '' : path;
  return `${SITE_URL}${clean.startsWith('/') || clean === '' ? clean : `/${clean}`}`;
}
