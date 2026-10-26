/**
 * Identity (ARCHITECTURE §5, §6). `users`, `sessions`, `accounts`, `verifications` are the Better Auth
 * core tables (plural names: configure the Drizzle adapter with `usePlural: true`) plus the columns of
 * the `phoneNumber` and `admin` plugins (`emailOTP` adds no columns). TypeScript property names are the
 * Better Auth field names; DB columns are snake_case. Field mapping: platform/db/README.md.
 */
import { sql } from 'drizzle-orm';
import { boolean, index, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { check } from 'drizzle-orm/pg-core';
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
    ...timestamps(),
  },
  (t) => [index('schools_city_idx').on(t.city), index('schools_name_idx').on(t.name)],
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
    /** D-014: school and city are only collected once consent is `granted`. */
    schoolId: uuid('school_id').references(() => schools.id, { onDelete: 'set null' }),
    city: text('city'),
    locale: text('locale').notNull().default('en-IN'),
    /** Idempotency for POST /v1/me/merge-guest. */
    guestMergedAt: tstz('guest_merged_at'),
    ...timestamps(),
  },
  (t) => [
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
