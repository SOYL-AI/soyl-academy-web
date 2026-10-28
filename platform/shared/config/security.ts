/**
 * Security numbers for the platform (docs/platform/security/requirements-for-m1.md). Values marked
 * *(config)* in the requirements live here so they can be tuned without touching logic. No imports:
 * the Next.js platform pages may import this file (ADR-001), e.g. `safeReturnTo` (AUTH-13).
 *
 * Owner: backend-api. Every block cites the requirement id it implements.
 */

/* ------------------------------------------------------------------------------------------------
 * Identifiers (AUTH-1, AUTH-5, GEN-2, GEN-3)
 * ---------------------------------------------------------------------------------------------- */

/** AUTH-1 / AC-02: Indian mobile numbers only. */
export const INDIA_MOBILE_REGEX = /^\+91[6-9]\d{9}$/;

/**
 * GEN-2 / GEN-3: reserved test range. A +91 number starting with 5 is never an Indian mobile
 * subscriber, so test fixtures cannot reach a real person. Accepted for OTP only outside production;
 * in `stg` the mock SMS sender delivers only to this range. (Moved here from @soyl/db's seed.)
 */
export const TEST_PHONE_PREFIX = '+91555000';
export const TEST_PHONE_REGEX = /^\+91555000\d{4}$/;
/** GEN-2: fixture emails use the RFC 2606 reserved domain only. */
export const TEST_EMAIL_DOMAIN = 'example.com';

/**
 * AUTH-5: disposable-email domains refused for email OTP (D-015 farming control). A starter list;
 * extend it from config without code changes. Compared against the lower-cased domain and its parents.
 */
export const DISPOSABLE_EMAIL_DOMAINS: readonly string[] = [
  '10minutemail.com',
  'dispostable.com',
  'emailondeck.com',
  'fakeinbox.com',
  'getnada.com',
  'guerrillamail.com',
  'guerrillamail.info',
  'maildrop.cc',
  'mailinator.com',
  'mailnesia.com',
  'mintemail.com',
  'mohmal.com',
  'sharklasers.com',
  'temp-mail.org',
  'tempmail.com',
  'tempmail.dev',
  'tempmailo.com',
  'throwawaymail.com',
  'trashmail.com',
  'yopmail.com',
];

/* ------------------------------------------------------------------------------------------------
 * OTP (AUTH-2 .. AUTH-5)
 * ---------------------------------------------------------------------------------------------- */

export interface WindowLimit {
  limit: number;
  windowSeconds: number;
}

export const OTP = {
  /** AUTH-2: 6 digits from crypto.randomInt. */
  length: 6,
  /** AUTH-2: lifetime per channel. */
  ttlSeconds: { phone: 5 * 60, email: 10 * 60 },
  /** AUTH-3: wrong attempts per code before the code is dead. */
  maxAttemptsPerCode: 5,
  /** AUTH-3: failed verifies per identifier per rolling hour → identifier locked (no sends, no verifies). */
  identifierFailures: { limit: 10, windowSeconds: 3600, lockSeconds: 3600 },
  /** AUTH-3: failed verifies per IP per hour. */
  ipFailures: { limit: 30, windowSeconds: 3600 },
  /** AUTH-5 send limits. */
  send: {
    phone: {
      perIdentifier: [
        { limit: 1, windowSeconds: 30 },
        { limit: 3, windowSeconds: 15 * 60 },
        { limit: 6, windowSeconds: 24 * 3600 },
      ] as readonly WindowLimit[],
      perIp: [
        { limit: 10, windowSeconds: 3600 },
        { limit: 30, windowSeconds: 24 * 3600 },
      ] as readonly WindowLimit[],
      /** SMS_GLOBAL_HOURLY_CAP default; env SMS_GLOBAL_HOURLY_CAP overrides. Beyond it phone OTP pauses. */
      globalHourlyCap: 1000,
    },
    email: {
      perIdentifier: [
        { limit: 3, windowSeconds: 15 * 60 },
        { limit: 6, windowSeconds: 24 * 3600 },
      ] as readonly WindowLimit[],
      perIp: [{ limit: 10, windowSeconds: 3600 }] as readonly WindowLimit[],
    },
  },
  /** AUTH-5: UI resend cooldowns (server enforces the limits above regardless). */
  resendCooldownSeconds: [30, 60, 120] as readonly number[],
} as const;

/* ------------------------------------------------------------------------------------------------
 * Sessions (AUTH-8 .. AUTH-10)
 * ---------------------------------------------------------------------------------------------- */

export interface SessionLifetime {
  /** Hard cap from sign-in. */
  absoluteSeconds: number;
  /** Session ends after this long without activity. */
  inactivitySeconds: number;
  /** Expiry is rolled forward at most this often (0 = on every request). */
  rollSeconds: number;
}

export const SESSION = {
  /** AUTH-8: `__Host-` prefix in secure contexts; plain name only on http://localhost development. */
  cookieName: '__Host-soyl_session',
  insecureCookieName: 'soyl_session',
  /** AUTH-9 lifetimes. */
  lifetimes: {
    member: { absoluteSeconds: 90 * 86400, inactivitySeconds: 30 * 86400, rollSeconds: 86400 } as SessionLifetime,
    staff: { absoluteSeconds: 12 * 3600, inactivitySeconds: 60 * 60, rollSeconds: 0 } as SessionLifetime,
  },
  /** AUTH-9: fresh-session window for sensitive actions (link/unlink, delete account, role change, admin writes). */
  freshSeconds: 10 * 60,
  /** AUTH-9: max concurrent sessions per student account (oldest revoked). */
  maxConcurrentMemberSessions: 5,
} as const;

/* ------------------------------------------------------------------------------------------------
 * OAuth (AUTH-6, AUTH-11)
 * ---------------------------------------------------------------------------------------------- */

export const OAUTH = {
  /** AUTH-6: scopes are exactly these. */
  googleScopes: 'openid email profile',
  /** State/PKCE/nonce record lifetime. */
  stateTtlSeconds: 10 * 60,
  stateCookieName: '__Host-soyl_oauth',
  insecureStateCookieName: 'soyl_oauth',
  googleIssuer: 'https://accounts.google.com',
  googleDiscoveryUrl: 'https://accounts.google.com/.well-known/openid-configuration',
} as const;

/* ------------------------------------------------------------------------------------------------
 * Rate limits (API-RL-1, API-RL-2) — sliding windows on the KV store
 * ---------------------------------------------------------------------------------------------- */

export type RateLimitKey = 'user' | 'ip' | 'device' | 'attempt';

export interface RateLimitBucket extends WindowLimit {
  key: RateLimitKey;
  /** Soft limits log an alert but let the request through (API-RL-2 account creation per IP). */
  soft?: boolean;
}

export const RATE_LIMITS = {
  /** API-RL-1 defaults applied to every /v1 route. */
  'api.user': { key: 'user', limit: 300, windowSeconds: 60 },
  'api.ip': { key: 'ip', limit: 600, windowSeconds: 60 },
  /** API-RL-1: auth routes per IP. */
  'auth.ip': { key: 'ip', limit: 60, windowSeconds: 60 },
  /** API-RL-2: declared now, enforced when the routes land. */
  'ai.user': { key: 'user', limit: 10, windowSeconds: 60 },
  'uploads.user.hour': { key: 'user', limit: 5, windowSeconds: 3600 },
  'uploads.user.day': { key: 'user', limit: 20, windowSeconds: 86400 },
  'attempt.start.user': { key: 'user', limit: 30, windowSeconds: 3600 },
  /**
   * Autosave per attempt (M3, ADR-012): the player saves every 10 s plus page-hide flushes and offline
   * replays, and two tabs may save the same attempt, so 8 per 15 s leaves room without allowing floods.
   */
  'attempt.autosave': { key: 'attempt', limit: 8, windowSeconds: 15 },
  'attempt.submit': { key: 'attempt', limit: 5, windowSeconds: 60 },
  /** Attempt reads (resume, result) per user: a reload storm must not reach the database unbounded. */
  'attempt.read.user': { key: 'user', limit: 120, windowSeconds: 60 },
  /** Self-evaluation saves per user. */
  'attempt.evaluate.user': { key: 'user', limit: 60, windowSeconds: 60 },
  /** Custom test builds per user (each build assembles a paper). */
  'tests.custom.user': { key: 'user', limit: 20, windowSeconds: 3600 },
  /** Live-mock registrations per user. */
  'live.register.user': { key: 'user', limit: 30, windowSeconds: 3600 },
  /** Weekly league reads per user (M5): the first visit of a week may also place the student in a league. */
  'leagues.read.user': { key: 'user', limit: 60, windowSeconds: 60 },
  'reports.user': { key: 'user', limit: 20, windowSeconds: 86400 },
  'reports.ip': { key: 'ip', limit: 50, windowSeconds: 86400 },
  'account.create.ip': { key: 'ip', limit: 20, windowSeconds: 86400, soft: true },
  'account.create.device': { key: 'device', limit: 3, windowSeconds: 86400 },
  /** Profile writes per user (abuse of display-name moderation). */
  'me.write.user': { key: 'user', limit: 30, windowSeconds: 3600 },
  /** Practice answer checks (M2). Per IP is generous because schools share one address. */
  'practice.answer.user': { key: 'user', limit: 60, windowSeconds: 60 },
  'practice.answer.ip': { key: 'ip', limit: 300, windowSeconds: 60 },
  /** Lesson-position saves (M2): the player saves on slide changes, debounced. */
  'progress.write.user': { key: 'user', limit: 120, windowSeconds: 60 },
  /** Learning insights reads (activity heatmap, mastery, player card): aggregate queries, so tighter than api.user. */
  'insights.read.user': { key: 'user', limit: 60, windowSeconds: 60 },
  /** The student dashboard (GET /v1/me/dashboard): one call runs every aggregate, so tighter than the insights reads. */
  'dashboard.read.user': { key: 'user', limit: 30, windowSeconds: 60 },
  /** D-044 credit guide and per-day credit history (GET /v1/me/credits/guide, /history): small aggregates, like the insights reads. */
  'credits.read.user': { key: 'user', limit: 60, windowSeconds: 60 },
  /** Avatar picker (GET /v1/me/avatars): reads the learner state behind the unlocks. */
  'avatars.read.user': { key: 'user', limit: 60, windowSeconds: 60 },
  /** School search for the profile picker (GET /v1/schools); the web debounces typing. */
  'schools.search.user': { key: 'user', limit: 60, windowSeconds: 60 },
  /** AUTH-11: TOTP enrol/confirm/verify/disable calls per user (wrong codes also lock, see MFA.failures). */
  'mfa.user': { key: 'user', limit: 20, windowSeconds: 15 * 60 },
  /** SOYL Coins writes (check-in, equip, address, cancel) and redemptions per user (ADR-021). */
  'coins.write.user': { key: 'user', limit: 30, windowSeconds: 3600 },
  'coins.redeem.user': { key: 'user', limit: 10, windowSeconds: 3600 },
  /** Built-in consent (D-039): age band, parent email, code entry, withdraw per user (sends have their own limits). */
  'consent.write.user': { key: 'user', limit: 30, windowSeconds: 3600 },
  /** Built-in consent: the parent's withdraw link (no session) per IP. */
  'consent.parent.ip': { key: 'ip', limit: 20, windowSeconds: 3600 },
  /** Regenerating the public leaderboard name (D-039). */
  'public-name.user': { key: 'user', limit: 10, windowSeconds: 24 * 3600 },
  /** Super-admin dashboard reads (D-045): each call runs several aggregate queries. */
  'admin.analytics.user': { key: 'user', limit: 60, windowSeconds: 60 },
  /** Super-admin user lookup: search, reveal and summary (each audited). */
  'admin.users.user': { key: 'user', limit: 60, windowSeconds: 15 * 60 },
  /** Super-admin invoice list, CSV export and resend (ADR-024; resend sends an email). */
  'admin.invoices.user': { key: 'user', limit: 30, windowSeconds: 60 },
  /** POST /v1/events (D-045 interest counters): strict per IP; the IP is a rate-limit key only, never stored. */
  'events.ip': { key: 'ip', limit: 30, windowSeconds: 60 },
} as const satisfies Record<string, RateLimitBucket>;

export type RateLimitBucketName = keyof typeof RATE_LIMITS;

/** API-RL-2: maximum concurrent AI streams per user (ai-gateway, M4). */
export const AI_MAX_CONCURRENT_STREAMS = 2;

/* ------------------------------------------------------------------------------------------------
 * Staff second factor (AUTH-11)
 * ---------------------------------------------------------------------------------------------- */

export const MFA = {
  /** RFC 6238 TOTP: SHA-1, 6 digits, 30 s steps (what authenticator apps support). */
  totp: { digits: 6, periodSeconds: 30, algorithm: 'SHA1', secretBytes: 20, issuer: 'SOYL Academy' },
  /** Accept the previous and next step as well (clock drift); a step is never accepted twice. */
  driftSteps: 1,
  /** Wrong codes per user within the window before verification locks (until the window frees up). */
  failures: { limit: 5, windowSeconds: 15 * 60 },
  /** One-time recovery codes issued when enrolment is confirmed (shown once). */
  recoveryCodes: 10,
  /** An unconfirmed enrolment expires; enrolling again issues a new secret. */
  pendingEnrolmentSeconds: 15 * 60,
} as const;

/* ------------------------------------------------------------------------------------------------
 * Content reports (CONTEXT §4 "Report a mistake")
 * ---------------------------------------------------------------------------------------------- */

export const CONTENT_REPORTS = {
  maxCommentChars: 1000,
} as const;

/* ------------------------------------------------------------------------------------------------
 * Request bodies (API-5)
 * ---------------------------------------------------------------------------------------------- */

export const BODY_LIMITS = {
  defaultBytes: 64 * 1024,
  mergeGuestBytes: 256 * 1024,
  attemptResponsesBytes: 256 * 1024,
  aiActionBytes: 16 * 1024,
  contentReportBytes: 8 * 1024,
  /** POST /v1/events (D-045): a few counter names, nothing else. */
  eventsBytes: 1024,
  /** API-5: JSON nesting deeper than this is rejected before schema validation. */
  maxJsonDepth: 10,
  /** API-5: no array in any body may be longer than this (schemas set tighter limits). */
  maxJsonArrayLength: 5000,
} as const;

/* ------------------------------------------------------------------------------------------------
 * Consent (API-11, D-014, AUTH-15)
 * ---------------------------------------------------------------------------------------------- */

export const CONSENT_STATES = ['required', 'pending', 'granted', 'revoked'] as const;
export type ConsentState = (typeof CONSENT_STATES)[number];

/** Features a route can declare in `policy.consent`. */
export const CONSENT_FEATURES = [
  'ai',
  'uploads',
  'leaderboards',
  'rank_cards',
  'profile_school_city',
  'notifications',
  'merge_guest',
  'test_attempts',
  /** SOYL Coins physical merch (D-037): a child's shipping address is collected only after consent. */
  'physical_rewards',
] as const;
export type ConsentFeature = (typeof CONSENT_FEATURES)[number];

export const CONSENT = {
  /**
   * D-014 (binding until the owner's consent rules arrive, OA-08/OA-14): these need `granted`.
   * Learning, practice, tests and guest-progress merge stay available (CONTEXT §5 "learning is free").
   * API-11 lists test attempts and merge-guest as consent-gated by default; D-014 is the later,
   * more specific decision, so they are declared but not gated. Add them here to gate them.
   */
  gatedFeatures: ['ai', 'uploads', 'leaderboards', 'rank_cards', 'profile_school_city', 'notifications', 'physical_rewards'] as readonly ConsentFeature[],
  /** API-11: cached status is refreshed after this long (and on every sign-in). */
  cacheTtlSeconds: 15 * 60,
  /** AUTH-15: accounts that never reach `granted` are deleted after this many days (owner to confirm). */
  unconsentedAccountTtlDays: 30,
} as const;

/**
 * CONSENT_PROVIDER values (API env):
 * - `builtin`     interim built-in provider (D-039, ADR-022): age-band self-declaration; 18+ self-consents,
 *                 under-18 needs a parent's one-time approval code sent by email. Real, not a mock: allowed in prod.
 * - `unavailable` no consent system at all (D-031): everyone is `pending`, every gated feature is off.
 * - `mock`        tests/local only (GEN-3: refused in prod); states are set by the test.
 * The owner's external system (OA-08) becomes a fourth value behind the same ConsentProvider interface.
 */
export const CONSENT_PROVIDERS = ['mock', 'unavailable', 'builtin'] as const;
export type ConsentProviderName = (typeof CONSENT_PROVIDERS)[number];

/** D-039: the only age information collected — a self-declared band, never a date of birth. */
export const AGE_BANDS = ['adult', 'minor'] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

/** How a built-in consent was given. */
export const CONSENT_METHODS = ['self_declared', 'parent_email_code'] as const;
export type ConsentMethod = (typeof CONSENT_METHODS)[number];

/** Who withdrew a consent. */
export const CONSENT_REVOKERS = ['parent', 'account_holder', 'admin'] as const;
export type ConsentRevoker = (typeof CONSENT_REVOKERS)[number];

/** The built-in provider (D-039, ADR-022). Tunable without code changes. */
export const BUILTIN_CONSENT = {
  /**
   * Version of the notice the parent / adult agrees to (privacy notice + what the gated features do).
   * Recorded on every consent. Bump it when the notice changes materially.
   */
  policyVersion: '2026-10-28',
  /** The parent's approval code: digits from crypto.randomInt. */
  codeLength: 6,
  /** Parents do not always read email at once; the code stays valid for two days. */
  codeTtlSeconds: 48 * 3600,
  /** Wrong entries per code before it is dead (a new code must be sent). */
  maxAttemptsPerCode: 5,
  /** Wrong codes per account per rolling day across all codes (then entry locks until the window frees up). */
  verifyFailures: { limit: 10, windowSeconds: 24 * 3600 },
  /** Code sends: per student account, per parent email address, per IP. */
  send: {
    perUser: [
      { limit: 1, windowSeconds: 60 },
      { limit: 3, windowSeconds: 3600 },
      { limit: 5, windowSeconds: 24 * 3600 },
    ] as readonly WindowLimit[],
    perParentEmail: [
      { limit: 3, windowSeconds: 3600 },
      { limit: 5, windowSeconds: 24 * 3600 },
    ] as readonly WindowLimit[],
    perIp: [
      { limit: 10, windowSeconds: 3600 },
      { limit: 30, windowSeconds: 24 * 3600 },
    ] as readonly WindowLimit[],
  },
  /** UI resend cooldown after a send (the server limits above apply regardless). */
  resendAfterSeconds: 60,
} as const;

/* ------------------------------------------------------------------------------------------------
 * Accounts (PII.md, AC-03, AC-18, AC-23)
 * ---------------------------------------------------------------------------------------------- */

export const ACCOUNT = {
  /** PII.md: anonymised accounts are hard-deleted by the worker after this many days. */
  purgeAfterDays: 30,
  /** Name stored on `users.name` for OTP sign-ups (no personal data collected). */
  placeholderName: 'SOYL learner',
  /** Phone sign-ups get a non-deliverable placeholder email (`.invalid`, so email_normalized stays NULL). */
  phoneTempEmailDomain: 'phone.soyl.invalid',
} as const;

/** AC-18 / F-017: display names. */
export const DISPLAY_NAME = {
  minLength: 2,
  maxLength: 20,
  /** No runs of this many digits (phone numbers, roll numbers). */
  maxDigitRun: 4,
  /**
   * Lower-case substrings refused in display names. A starter list (English and romanised Hindi);
   * the admin moderation queue catches the rest. Matching ignores spaces, dots and repeated letters.
   */
  blockedWords: [
    'fuck', 'shit', 'bitch', 'bastard', 'asshole', 'cunt', 'slut', 'whore', 'porn', 'sex', 'nude',
    'rape', 'nazi', 'chutiya', 'chutia', 'madarchod', 'behenchod', 'bhenchod', 'bhosdi', 'gandu', 'randi',
    'harami', 'kamina', 'admin', 'soyl', 'moderator',
  ] as readonly string[],
} as const;

/** AC-23: merged guest progress restores completion state; XP from it is small and capped. */
export const GUEST_MERGE = {
  maxLessons: 500,
  maxPracticeAnswers: 3000,
  xpPerLessonCompleted: 2,
  xpPerPracticeCorrect: 1,
  maxTotalXp: 200,
} as const;

/* ------------------------------------------------------------------------------------------------
 * Return-to URLs (AUTH-13, WEB-8)
 * ---------------------------------------------------------------------------------------------- */

export const RETURN_TO_FALLBACK = '/learn';
/** Platform route prefixes a login may return to (ARCHITECTURE §3.1). */
export const RETURN_TO_PREFIXES: readonly string[] = ['/learn', '/tests', '/ask', '/plans', '/me', '/leaderboard', '/coins', '/store', '/admin'];

/**
 * AUTH-13: accept a login return target only if it is a relative path that starts with a single `/`
 * (not `//` or `/\`), has no scheme, no control characters or backslashes anywhere, and starts with a
 * platform route prefix. Anything else returns `/learn`. Use on the server and in the browser (WEB-8).
 */
export function safeReturnTo(raw: unknown): string {
  if (typeof raw !== 'string' || raw.length === 0 || raw.length > 2048) return RETURN_TO_FALLBACK;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f\\]/.test(raw)) return RETURN_TO_FALLBACK;
  if (!raw.startsWith('/') || raw.startsWith('//')) return RETURN_TO_FALLBACK;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return RETURN_TO_FALLBACK;
  }
  // Encoded tricks: %2F%2F, %5C, encoded schemes or control characters.
  // eslint-disable-next-line no-control-regex
  if (decoded.startsWith('//') || /[\u0000-\u001f\u007f\\]/.test(decoded) || /^\/*[a-z][a-z0-9+.-]*:/i.test(decoded.slice(1)))
    return RETURN_TO_FALLBACK;
  const path = raw.split(/[?#]/, 1)[0]!;
  const ok = RETURN_TO_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
  return ok ? raw : RETURN_TO_FALLBACK;
}

/* ------------------------------------------------------------------------------------------------
 * Masking for logs (AUTH-14, API-14)
 * ---------------------------------------------------------------------------------------------- */

/** `+919876543210` → `+91******3210`. */
export function maskPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.length < 7) return '***';
  return `${digits.slice(0, 3)}${'*'.repeat(Math.max(0, digits.length - 7))}${digits.slice(-4)}`;
}

/** `arjun@gmail.com` → `a***@gmail.com`. */
export function maskEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  const at = email.lastIndexOf('@');
  if (at < 1) return '***';
  return `${email[0]}***${email.slice(at)}`;
}

/** Masks an identifier that may be a phone or an email. */
export function maskIdentifier(identifier: string | null | undefined): string | null {
  if (!identifier) return null;
  return identifier.includes('@') ? maskEmail(identifier) : maskPhone(identifier);
}
