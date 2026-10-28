/**
 * Marketing-site route inventory (source: `npm run build` route table + app/ file system,
 * see docs/platform/REPO_MAP.md section 4). The status suite cross-checks this list against
 * the build's app-path-routes manifest and the live sitemap, so a new marketing route that is
 * not listed here fails the regression instead of slipping through unchecked.
 */

export interface MarketingPage {
  /** Screenshot file name (no extension). */
  name: string;
  path: string;
  /** Expected HTTP status. */
  status: number;
}

/** Every HTML page the marketing site serves, including each prerendered journal article. */
export const MARKETING_PAGES: MarketingPage[] = [
  { name: 'home', path: '/', status: 200 },
  { name: 'about', path: '/about', status: 200 },
  { name: 'book-a-demo', path: '/book-a-demo', status: 200 },
  { name: 'contact', path: '/contact', status: 200 },
  { name: 'future-builders', path: '/future-builders', status: 200 },
  { name: 'journal', path: '/journal', status: 200 },
  { name: 'journal-homework-after-chatgpt', path: '/journal/homework-after-chatgpt', status: 200 },
  { name: 'journal-why-outcomes-matter', path: '/journal/why-outcomes-matter', status: 200 },
  { name: 'journal-should-schools-ban-ai', path: '/journal/should-schools-ban-ai', status: 200 },
  { name: 'journal-learning-to-defend-an-idea', path: '/journal/learning-to-defend-an-idea', status: 200 },
  { name: 'method', path: '/method', status: 200 },
  { name: 'parents', path: '/parents', status: 200 },
  { name: 'privacy', path: '/privacy', status: 200 },
  { name: 'refund-policy', path: '/refund-policy', status: 200 },
  { name: 'schools', path: '/schools', status: 200 },
  { name: 'shipping-policy', path: '/shipping-policy', status: 200 },
  { name: 'students', path: '/students', status: 200 },
  { name: 'teachers', path: '/teachers', status: 200 },
  { name: 'terms', path: '/terms', status: 200 },
  { name: 'what-we-teach', path: '/what-we-teach', status: 200 },
  // The marketing 404 page (app/not-found.tsx). Platform pages that call notFound() render it too.
  { name: 'not-found', path: '/this-page-does-not-exist', status: 404 },
];

export interface MarketingEndpoint {
  path: string;
  method: 'GET';
  status: number;
  /** Substring the Content-Type header must contain. */
  contentType?: string;
  note?: string;
}

/** Non-HTML routes: metadata routes, feeds, OG images and the two POST-only API routes. */
export const MARKETING_ENDPOINTS: MarketingEndpoint[] = [
  { path: '/sitemap.xml', method: 'GET', status: 200, contentType: 'xml' },
  { path: '/robots.txt', method: 'GET', status: 200, contentType: 'text/plain' },
  { path: '/manifest.webmanifest', method: 'GET', status: 200, contentType: 'manifest' },
  { path: '/icon.png', method: 'GET', status: 200, contentType: 'image/png' },
  { path: '/apple-icon.png', method: 'GET', status: 200, contentType: 'image/png' },
  { path: '/favicon.ico', method: 'GET', status: 200, contentType: 'image/' },
  { path: '/feed.xml', method: 'GET', status: 200, contentType: 'rss' },
  { path: '/llms.txt', method: 'GET', status: 200, contentType: 'text/plain' },
  { path: '/llms-full.txt', method: 'GET', status: 200, contentType: 'text/plain' },
  { path: '/og?path=%2F', method: 'GET', status: 200, contentType: 'image/png' },
  {
    path: '/api/razorpay',
    method: 'GET',
    status: 405,
    note: 'POST-only (Future Builders order creation). Not POSTed by the suite: with live keys it would create a Razorpay order. Expected POST behaviour: 409 while the cohort is closed (waitlist), else 200 with an order (mock order when RAZORPAY_KEY_* are unset).',
  },
  {
    path: '/api/enroll',
    method: 'GET',
    status: 405,
    note: 'POST-only (Future Builders enrolment to the Google Sheets webhook). Not POSTed by the suite: with GOOGLE_SHEETS_WEBHOOK_URL set it would write a row. Expected POST behaviour: 200 {success:true} (simulated when the webhook is unset), 500 on invalid JSON.',
  },
];

/** Pages scored by Lighthouse (mobile + desktop presets). */
export const LIGHTHOUSE_PATHS = [
  '/',
  '/schools',
  '/students',
  '/parents',
  '/future-builders',
  '/journal',
  '/about',
  '/contact',
];

/**
 * URL prefixes owned by the learning platform (ARCHITECTURE §3.1). Build-manifest entries
 * under these, or under the `(platform)` route group, are not marketing routes.
 */
export const PLATFORM_PREFIXES = ['/learn', '/tests', '/ask', '/plans', '/me', '/leaderboard', '/coins', '/store', '/admin', '/dashboard', '/api/platform'];
