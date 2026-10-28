/**
 * Identity (ARCHITECTURE §5, §6). `users`, `sessions`, `accounts`, `verifications` are the Better Auth
 * core tables (plural names: configure the Drizzle adapter with `usePlural: true`) plus the columns of
 * the `phoneNumber` and `admin` plugins (`emailOTP` adds no columns). TypeScript property names are the
 * Better Auth field names; DB columns are snake_case. Field mapping: platform/db/README.md.
 */
import { sql } from 'drizzle-orm';
import { boolean, index, integer, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { check } from 'drizzle-orm/pg-core';
import { AGE_BANDS, CONSENT_METHODS, CONSENT_REVOKERS } from '@soyl/shared/config/security';
import { SCHOOL_SOURCES } from '@soyl/shared/config/schools';
import { id, oneOf, timestamps, tstz } from './_shared';

export const ROLES = ['student', 'parent', 'reviewer', 'admin'] as const;
export type Role = (typeof ROLES)[number];

export const users = pgTable(
  'users',
  {
    id: id(),
    // Better Auth core
    name: text('name').notNull(),
    email: text('email').notNull().unique('users_email_unique'),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: text('image'),
    // Better Auth phoneNumber plugin
    phoneNumber: text('phone_number').unique('users_phone_number_unique'),
    phoneNumberVerified: boolean('phone_number_verified').notNull().default(false),
    // Better Auth admin plugin. `role` is the single source of the user's authorisation role (ARCHITECTURE §5 roles).
    // Configure the plugin with defaultRole 'student' and adminRoles ['admin']. DB-7: no row is 'admin' until `admin bootstrap`.
    role: text('role').notNull().default('student'),
    banned: boolean('banned').notNull().default(false),
    banReason: text('ban_reason'),
    banExpires: tstz('ban_expires'),
    // DB-3: normalised identifiers, computed by the database so every writer (Better Auth, seeds, admin) gets the same rule.
    emailNormalized: text('email_normalized')
      .generatedAlwaysAs(sql`soyl_normalize_email(email)`)
      .unique('users_email_normalized_unique'),
    phoneE164: text('phone_e164')
      .generatedAlwaysAs(sql`soyl_normalize_phone(phone_number)`)
      .unique('users_phone_e164_unique'),
    /** Set when DELETE /v1/me anonymises the account; the purge job hard-deletes within 30 days (PII.md). */
    deletedAt: tstz('deleted_at'),
    ...timestamps(),
  },
  (t) => [oneOf('users_role_check', t.role, ROLES), index('users_created_at_idx').on(t.createdAt)],
);

export const sessions = pgTable(
  'sessions',
  {
    id: id(),
    expiresAt: tstz('expires_at').notNull(),
    /** DB-4: Better Auth looks sessions up by this value and stores it as issued; see README "Session tokens". */
    token: text('token').notNull().unique('sessions_token_unique'),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // admin plugin
    impersonatedBy: uuid('impersonated_by').references(() => users.id, { onDelete: 'set null' }),
    /** AUTH-11 (migration 0005): when this session passed the staff second factor (TOTP or recovery code). */
    mfaVerifiedAt: tstz('mfa_verified_at'),
    ...timestamps(),
  },
  (t) => [
    index('sessions_user_id_idx').on(t.userId),
    index('sessions_impersonated_by_idx').on(t.impersonatedBy),
    index('sessions_expires_at_idx').on(t.expiresAt),
  ],
);

export const accounts = pgTable(
  'accounts',
  {
    id: id(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: tstz('access_token_expires_at'),
    refreshTokenExpiresAt: tstz('refresh_token_expires_at'),
    scope: text('scope'),
    /** Unused (no password sign-in) but part of the Better Auth core schema. */
    password: text('password'),
    ...timestamps(),
  },
  (t) => [
    // DB-2
    uniqueIndex('accounts_provider_account_unique').on(t.providerId, t.accountId),
    index('accounts_user_id_idx').on(t.userId),
  ],
);

export const verifications = pgTable(
  'verifications',
  {
    id: id(),
    identifier: text('identifier').notNull(),
    /** DB-4 / AUTH-4: OTPs must be stored hashed (emailOTP `storeOTP: 'hashed'`; phone OTP via the API's HMAC). */
    value: text('value').notNull(),
    expiresAt: tstz('expires_at').notNull(),
    ...timestamps(),
  },
  (t) => [index('verifications_identifier_idx').on(t.identifier), index('verifications_expires_at_idx').on(t.expiresAt)],
);

export const BOARDS = ['cbse', 'cisce'] as const;

export const schools = pgTable(
  'schools',
  {
    id: id(),
    name: text('name').notNull(),
    board: text('board'),
    city: text('city'),
    state: text('state'),
    /** UDISE+ school code when known. */
    udiseCode: text('udise_code').unique('schools_udise_code_unique'),
    /**
     * 0013: dedupe/search keys computed by the writer with @soyl/shared/profile/school
     * (normalizeSchoolName, normalizeCity): lower case, punctuation removed, abbreviations expanded,
     * old city names mapped. `city_normalized` is '' when the city is unknown.
     */
    nameNormalized: text('name_normalized').notNull(),
    cityNormalized: text('city_normalized').notNull().default(''),
    /** 0013: where the row came from (SCHOOL_SOURCES): `student` (added in the profile), `udise`, `cbse`. */
    source: text('source').notNull().default('student'),
    /** 0013: set when staff or an official list confirms the school; null = unverified. */
    verifiedAt: tstz('verified_at'),
    /** 0013: the account that added a `student` school; nulled at account deletion (PII.md). */
    createdByUserId: uuid('created_by_user_id').references(() => users.id, { onDelete: 'set null' }),
    ...timestamps(),
  },
  (t) => [
    index('schools_city_idx').on(t.city),
    index('schools_name_idx').on(t.name),
    // Student-added schools are stored once per normalised name + city (find-or-create). Official
    // lists may hold several schools with the same name in one city, so they are not constrained.
    uniqueIndex('schools_student_name_city_unique').on(t.nameNormalized, t.cityNormalized).where(sql`${t.source} = 'student'`),
    // GET /v1/schools: prefix of the name key, optionally within a city.
    index('schools_name_normalized_idx').on(t.nameNormalized.op('text_pattern_ops')),
    index('schools_city_name_normalized_idx').on(t.cityNormalized, t.nameNormalized.op('text_pattern_ops')),
    index('schools_created_by_user_id_idx').on(t.createdByUserId),
    oneOf('schools_source_check', t.source, SCHOOL_SOURCES),
  ],
);

export const profiles = pgTable(
  'profiles',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .unique('profiles_user_id_unique')
      .references(() => users.id, { onDelete: 'cascade' }),
    displayName: text('display_name'),
    board: text('board'),
    classLevel: smallint('class_level'),
    /**
     * D-014: school and city are only collected and shown once consent is `granted` (PATCH /v1/me school).
     * `city` mirrors the chosen school's city; both are cleared together (and when consent is withdrawn).
     */
    schoolId: uuid('school_id').references(() => schools.id, { onDelete: 'set null' }),
    city: text('city'),
    locale: text('locale').notNull().default('en-IN'),
    /**
     * D-039: seed of the public pseudonymous name ("Brave Otter 417", @soyl/shared/config/public-names).
     * Leaderboards show only that name; 0 = the account's first name, regenerating stores a new random seed.
     */
    publicNameSeed: integer('public_name_seed').notNull().default(0),
    /** Idempotency for POST /v1/me/merge-guest. */
    guestMergedAt: tstz('guest_merged_at'),
    /** 0013: dashboard weekly goal (practice questions solved per IST week); null = DASHBOARD.weeklyGoal.default. */
    weeklyGoal: smallint('weekly_goal'),
    ...timestamps(),
  },
  (t) => [
    check('profiles_weekly_goal_check', sql`${t.weeklyGoal} IS NULL OR ${t.weeklyGoal} BETWEEN 1 AND 1000`),
    oneOf('profiles_board_check', t.board, BOARDS),
    check('profiles_class_level_check', sql`${t.classLevel} BETWEEN 7 AND 12`),
    index('profiles_school_id_idx').on(t.schoolId),
  ],
);

/**
 * API-12: a parent reads a student's data only through a row with `verified_at` set. `verified_at` is
 * written only by the consent flow or an explicit student-side approval, never by a parent's claim.
 */
export const guardianLinks = pgTable(
  'guardian_links',
  {
    id: id(),
    parentUserId: uuid('parent_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    studentUserId: uuid('student_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    verifiedAt: tstz('verified_at'),
    verifiedVia: text('verified_via'),
    revokedAt: tstz('revoked_at'),
    ...timestamps(),
  },
  (t) => [
    // DB-2
    uniqueIndex('guardian_links_parent_student_unique').on(t.parentUserId, t.studentUserId),
    index('guardian_links_student_user_id_idx').on(t.studentUserId),
    check('guardian_links_not_self', sql`${t.parentUserId} <> ${t.studentUserId}`),
    oneOf('guardian_links_verified_via_check', t.verifiedVia, ['consent_flow', 'student_approval']),
    check('guardian_links_verified_pair', sql`(${t.verifiedAt} IS NULL) = (${t.verifiedVia} IS NULL)`),
  ],
);

export const CONSENT_STATES = ['required', 'pending', 'granted', 'revoked'] as const;
export type ConsentState = (typeof CONSENT_STATES)[number];

/**
 * Cached from the owner's ConsentProvider (ARCHITECTURE §5). Fetched server-to-server, never trusted
 * from the browser. D-014: anything other than `granted` keeps AI, leaderboards, school/city and
 * non-essential notifications off; `required` is the default for a new account.
 */
export const consentStatus = pgTable(
  'consent_status',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .unique('consent_status_user_id_unique')
      .references(() => users.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('required'),
    provider: text('provider').notNull(),
    providerRef: text('provider_ref'),
    grantedAt: tstz('granted_at'),
    revokedAt: tstz('revoked_at'),
    fetchedAt: tstz('fetched_at').notNull().defaultNow(),
    ...timestamps(),
  },
  (t) => [oneOf('consent_status_status_check', t.status, CONSENT_STATES)],
);

/**
 * Built-in interim consent provider (D-039, ADR-022): the provider's own record, one row per account.
 * `consent_status` above stays the gate's cache and is rewritten from this row on every change.
 *
 * Data minimisation: no date of birth (an age band only), no parent name, and the parent's email is
 * never stored: only a keyed hash (rate limits, detecting a change of parent) and a masked hint
 * ("p•••@gmail.com") so the student can see where the request went. The approval code is stored as a
 * keyed hash; the parent's withdraw link is an HMAC over (id, revoke_generation), so nothing is stored for it.
 */
export const consentRecords = pgTable(
  'consent_records',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .unique('consent_records_user_id_unique')
      .references(() => users.id, { onDelete: 'cascade' }),
    /** Self-declared: `adult` (18 or older) or `minor` (under 18). Null until declared. */
    ageBand: text('age_band'),
    status: text('status').notNull().default('required'),
    /** How the current/last consent was given: `self_declared` (18+) or `parent_email_code` (under 18). */
    method: text('method'),
    /** BUILTIN_CONSENT.policyVersion agreed to (set with the consent). */
    policyVersion: text('policy_version'),
    /** HMAC(server key, normalised parent email). Never the address itself. */
    parentEmailHash: text('parent_email_hash'),
    /** Masked parent email for the student's own status view, e.g. "p•••@gmail.com". */
    parentEmailHint: text('parent_email_hint'),
    /** HMAC of the live approval code (null when none is live). */
    codeHash: text('code_hash'),
    codeExpiresAt: tstz('code_expires_at'),
    /** Wrong entries against the live code (dead at BUILTIN_CONSENT.maxAttemptsPerCode). */
    codeAttempts: smallint('code_attempts').notNull().default(0),
    codeSentAt: tstz('code_sent_at'),
    /** Bumped when the parent email changes, so an earlier parent's withdraw link stops working. */
    revokeGeneration: integer('revoke_generation').notNull().default(0),
    declaredAt: tstz('declared_at'),
    grantedAt: tstz('granted_at'),
    revokedAt: tstz('revoked_at'),
    revokedBy: text('revoked_by'),
    ...timestamps(),
  },
  (t) => [
    oneOf('consent_records_status_check', t.status, CONSENT_STATES),
    oneOf('consent_records_age_band_check', t.ageBand, AGE_BANDS),
    oneOf('consent_records_method_check', t.method, CONSENT_METHODS),
    oneOf('consent_records_revoked_by_check', t.revokedBy, CONSENT_REVOKERS),
    check('consent_records_code_attempts_check', sql`${t.codeAttempts} >= 0`),
    check('consent_records_code_pair', sql`(${t.codeHash} IS NULL) = (${t.codeExpiresAt} IS NULL)`),
    check(
      'consent_records_granted_complete',
      sql`${t.status} <> 'granted' OR (${t.method} IS NOT NULL AND ${t.policyVersion} IS NOT NULL AND ${t.grantedAt} IS NOT NULL AND ${t.ageBand} IS NOT NULL)`,
    ),
  ],
);
