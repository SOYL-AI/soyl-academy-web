# @soyl/db

PostgreSQL schema (Drizzle ORM), reversible migrations, a migrator CLI, seeds, and the test-database
harness for the SOYL Academy Learning Platform. Design: `docs/platform/ARCHITECTURE.md` §6;
decisions: `docs/platform/adr/004-orm-drizzle.md`; personal data: [PII.md](PII.md).

```
platform/db/
  schema/          Drizzle tables by group: identity, catalog, content, assessment, gamification,
                   ai-credits, billing, ops, pipeline, views  (60 tables, 2 views)
  migrations/      NNNN_name.sql (drizzle-kit, up) + NNNN_name.down.sql (hand-written) + meta/
  src/             client, migrator, CLI, seeds, test harness, normalisers, DB-6 helpers
  test/            vitest suites against real PostgreSQL
  PII.md           DB-5 personal-data inventory (enforced by test/schema.test.ts)
```

## Using it from another package

Add `"@soyl/db": "*"` to the package's dependencies (workspace link). Packages consume TypeScript
source (like `@soyl/shared`), so run under tsx/vitest or bundle with esbuild (D-022).

```ts
import { createDb, schema } from '@soyl/db';             // client + everything below
import { users, questions, creditLedger } from '@soyl/db/schema';
import { normalizeEmail, normalizePhone } from '@soyl/db/normalize';
import { uuidv7, istDay } from '@soyl/db/ids';
import { studentQuestionColumns, splitQuestion, questionRow } from '@soyl/db/student-questions';

const { db, pool, close } = createDb();                   // DATABASE_URL; or createDb(url) / createDb(pool)
const rows = await db.select().from(users).where(eq(users.emailNormalized, normalizeEmail(input)));
```

`db` is `NodePgDatabase<typeof schema>` over a `pg.Pool` (node-postgres, the driver pg-boss uses too),
so relational queries (`db.query.users.findFirst`) work. Close the pool on shutdown.

### Tests

```ts
// vitest.config.ts of your package
export default defineConfig({ test: { globalSetup: ['@soyl/db/testing/global-setup'], hookTimeout: 180_000 } });

// a test
import { createTestDb } from '@soyl/db/testing';
const t = await createTestDb();          // { url, name, db, pool, close }
// ... t.db is a migrated, empty database of its own
await t.close();                         // drops it
```

- With `TEST_DATABASE_URL` (CI) or `DATABASE_URL` set, databases are created on that server (never
  when `NODE_ENV=production`/`APP_ENV=prod`). Otherwise the global setup starts **one** embedded
  PostgreSQL 18 per test run (random port, data under `platform/db/.data/`, removed afterwards).
  Without the global setup, `createTestDb()` starts one lazily per process.
- Migrations run once per server into a template database; each `createTestDb()` is a
  `CREATE DATABASE … TEMPLATE` (~0.1–0.3 s), so give every test file its own database.
- `createTestDb({ migrate: false })` gives an empty database.
- The server user must be a superuser (or able to `CREATE DATABASE`, `CREATE ROLE` and `SET ROLE soyl_app`).
  The CI service container's `postgres` user is.
- First run on a machine initialises a pristine cluster (~15 s on Windows); later runs copy it.

## Commands (from `platform/`)

```
npm run db -w @soyl/db -- migrate up [--to N]        apply pending migrations (or until N are applied)
npm run db -w @soyl/db -- migrate down [--to N]      roll back one (or until N remain; --to 0 = everything)
npm run db -w @soyl/db -- migrate status             applied / pending / changed-since-applied (exit 2 on drift)
npm run db -w @soyl/db -- seed catalog [--dir PATH]  load platform/catalog (idempotent)
npm run db -w @soyl/db -- seed test-users            fixture users; refuses in production (GEN-2)
npm run db -w @soyl/db -- admin bootstrap --email E  create/promote the admin for E (DB-7)
npm run generate -w @soyl/db -- --name <name>        drizzle-kit: next up migration from schema changes
npm run typecheck -w @soyl/db
npm test -w @soyl/db
```

Target: `DATABASE_URL`. If unset, the CLI starts a **persistent local dev server** (embedded
PostgreSQL in `platform/db/.data/dev`, port `SOYL_DEV_PG_PORT` or 54320, database `soyl_dev`) for the
command and stops it afterwards — nothing keeps running.

## Migrations

- Change `schema/*.ts`, run `npm run generate -w @soyl/db -- --name <what>`, review the SQL, then write
  `migrations/NNNN_<what>.down.sql` by hand. The runner refuses a migration without a down file (DB-8).
- Hand-written SQL (functions, triggers, views, conditional DDL):
  `npx drizzle-kit generate --custom --name <what>` (inside `platform/db`) creates an empty numbered file.
- Never edit an applied migration: the runner stores a hash of each up file and `migrate status`
  reports drift. Write a new migration instead.
- Each migration runs in its own transaction under an advisory lock, recorded in `soyl_schema_migrations`.
  After every `up`, `soyl_apply_conventions()` re-applies grants and `updated_at` triggers to all tables,
  so new tables get them automatically. A new **append-only** table must be added to the list in that
  function (migration 0000 → write a new migration that replaces the function).
- No data migration may copy personal data into logs or audit rows (DB-8).
- Deploy: the pre-deploy Container Apps job runs `migrate up` as the migrator identity (below).
  For a bundled job image, the CLI is `src/cli.ts`; ship `migrations/` beside it or set `SOYL_MIGRATIONS_DIR`.

Current migrations: `0000_foundations` (roles, uuid v7, normalisers, conventions function),
`0001_schema` (all tables; generated), `0002_policies` (pgvector column, ledger settlement trigger,
`student_questions` and `content_budget` views, first grants).

## Roles (DB-1) and Azure mapping

Migration 0000 creates two NOLOGIN group roles if the migrating user may (`CREATEROLE`):

| Role | Gets | Used by |
|---|---|---|
| `soyl_migrator` | owns schema objects; DDL | pre-deploy migrations job |
| `soyl_app` | `SELECT, INSERT, UPDATE, DELETE` on all tables; **only `SELECT, INSERT`** on `credit_ledger`, `audit_log`, `webhook_events`, `content_budget_ledger`; nothing on `soyl_schema_migrations`; no DDL | API and worker |

Azure Database for PostgreSQL Flexible Server with Entra auth (for infra-azure):

```sql
-- once per server, as the Entra admin (connected to the `postgres` database):
SELECT * FROM pgaadauth_create_principal('id-soyl-migrator-<env>', false, false);
SELECT * FROM pgaadauth_create_principal('id-soyl-api-<env>', false, false);
SELECT * FROM pgaadauth_create_principal('id-soyl-worker-<env>', false, false);
CREATE ROLE soyl_migrator NOLOGIN;  CREATE ROLE soyl_app NOLOGIN;
GRANT soyl_migrator TO "id-soyl-migrator-<env>";
ALTER ROLE "id-soyl-migrator-<env>" SET role = 'soyl_migrator';   -- objects are owned by soyl_migrator
GRANT soyl_app TO "id-soyl-api-<env>", "id-soyl-worker-<env>";
-- in the application database:
GRANT CREATE, USAGE ON SCHEMA public TO soyl_migrator;
-- pgvector: allow-list `vector` in the server parameter azure.extensions; CREATE EXTENSION needs
-- azure_pg_admin, so either run `CREATE EXTENSION vector;` once as the admin, or grant the migrator it.
```

Set the server parameter `timezone = UTC` (GEN-6). Locally (embedded superuser) and in CI everything
runs as one superuser; the roles still exist so the DB-1 tests can `SET ROLE soyl_app`.

## Better Auth (backend-api)

The identity tables are the Better Auth core schema plus the `phoneNumber` and `admin` plugin
columns (`emailOTP` adds none), with plural table names. `test/better-auth.test.ts` signs up by email,
email OTP and phone OTP through the adapter.

```ts
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { phoneNumber, emailOTP, admin } from 'better-auth/plugins';
import { schema, uuidv7 } from '@soyl/db';

betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema, usePlural: true }),
  advanced: { database: { generateId: () => uuidv7() } },          // uuid v7 ids
  plugins: [
    phoneNumber({ sendOTP, verifyOTP /* AUTH-4, see below */, signUpOnVerification: {
      getTempEmail: (p) => `${p.replace(/\D/g, '')}@phone.soyl.invalid`,   // .invalid → email_normalized NULL
    } }),
    emailOTP({ sendVerificationOTP, storeOTP: 'hashed' }),           // DB-4
    admin({ defaultRole: 'student', adminRoles: ['admin'] }),
  ],
});
```

| Better Auth model.field | Table.column | Notes |
|---|---|---|
| user.id | users.id | uuid v7 |
| user.name / email / emailVerified / image | users.name / email / email_verified / image | email UNIQUE |
| user.createdAt / updatedAt | users.created_at / updated_at | timestamptz |
| user.phoneNumber / phoneNumberVerified (phoneNumber) | users.phone_number / phone_number_verified | phone_number UNIQUE |
| user.role / banned / banReason / banExpires (admin) | users.role / banned / ban_reason / ban_expires | role ∈ student, parent, reviewer, admin (CHECK) |
| — (ours, generated) | users.email_normalized, users.phone_e164 | DB-3, UNIQUE |
| — (ours) | users.deleted_at | account deletion |
| session.id / token / expiresAt / ipAddress / userAgent / userId | sessions.id / token / expires_at / ip_address / user_agent / user_id | token UNIQUE |
| session.impersonatedBy (admin) | sessions.impersonated_by | FK users, SET NULL |
| account.id / accountId / providerId / userId | accounts.id / account_id / provider_id / user_id | UNIQUE (provider_id, account_id) |
| account.accessToken / refreshToken / idToken / accessTokenExpiresAt / refreshTokenExpiresAt / scope / password | accounts.access_token / refresh_token / id_token / access_token_expires_at / refresh_token_expires_at / scope / password | |
| verification.id / identifier / value / expiresAt | verifications.id / identifier / value / expires_at | identifier indexed |

`role` lives on `users` (the admin plugin's column), not on `profiles`, so there is one source of truth
for authorisation. `profiles` holds display name, board, class, school, city, locale.

**OTP storage (DB-4 / AUTH-4).** `emailOTP` with `storeOTP: 'hashed'` stores a hash (tested). The
`phoneNumber` plugin stores `"<code>:<attempts>"` in plain text in `verifications.value` unless you
supply `verifyOTP`; backend-api must provide `sendOTP` + `verifyOTP` that keep
`HMAC-SHA256(otp_pepper, phone || purpose || code)` instead (AUTH-4).

**Session tokens (DB-4).** Better Auth looks sessions up by `sessions.token` and stores the token as
issued; it has no option to store a hash. Why this is acceptable for now: the session cookie carries
the token plus an HMAC signature made with `AUTH_SECRET` (Key Vault), so someone who reads the
database still cannot build a valid cookie without the secret. That stops being true if the `bearer`
plugin is enabled (it accepts the raw token), so backend-api must not enable it. Database access is
private-network and Entra-only (INFRA-1/2), and sessions expire. Revisit if Better Auth adds hashed
session storage.

## Conventions

- `id` uuid v7, generated in app code (`uuidv7()`); DB default `uuid_generate_v7()` for raw SQL.
  Exception: `pipeline_runs.id` is the pipeline's readable run id (text).
- `created_at`, `updated_at` timestamptz (UTC); a trigger keeps `updated_at` right. Append-only tables
  (`credit_ledger`, `audit_log`, `webhook_events`, `content_budget_ledger`, `analytics_events`) have no `updated_at`.
- IST calendar days (`ist_day`, `date`) for credits, streaks, XP: compute with `istDay()` (GEN-6).
- Money in integer paise. Metered model cost per call is `numeric(14,4)` paise (`cost_inr_paise`, `cost_paise`).
- Enumerations are `text` + `CHECK (col IN (...))`, values imported from `@soyl/shared` where they exist.
- Catalog and content tables carry `academic_year`; natural keys are `(key, academic_year)`.
- Every foreign key is indexed (tested).

## Data rules worth knowing

- **Credits (DB-2, AC-07/08).** `credit_ledger.amount` is a signed balance delta: grant > 0, reserve < 0,
  charge ≥ 0 (unused part of the reservation returned), refund > 0 (exactly the reserved amount),
  expire < 0. One `daily_grant` per user per IST day; `(kind, request_id)` unique; one charge **or**
  refund per request; a charge/refund without a matching reserve of the same user is rejected by a
  trigger. Today's balance = `SUM(amount) WHERE user_id = ? AND ist_day = today`.
- **Questions (DB-6).** `questions.body` is the student-safe projection; answers, solutions and marking
  schemes are only in `question_keys`. Student reads use `student_questions` (view) or
  `studentQuestionColumns`; ingest with `questionRow()` + `splitQuestion()`. `pool` is
  `practice | test | live_reserved`; live items need `embargo_until` and stay out of the view until then.
  Every edit is a new `(key, version)` row; `is_current` marks the latest.
- **Attempts (AC-12).** One `created|in_progress` attempt per (user, test); one attempt per (user, live event) ever.
- **Webhooks (AC-09).** `webhook_events (provider, event_id)` unique; insert it in the same transaction
  as the effects (the app cannot update it afterwards).
- **Guardian links (API-12).** Unique per (parent, student); usable only when `verified_at` is set,
  which the consent flow or a student approval writes (`verified_via`).
- **Consent (D-014).** `consent_status.status` ∈ required | pending | granted | revoked, cached with
  `fetched_at`; a new account is `required`.

## Seeds

- `seed catalog` reads `platform/catalog/<board>/subjects.yaml` (D-020), every `syllabus.yaml`, and
  every `blueprints/*.yaml`, validates with `@soyl/shared/content/{catalog,blueprint}`, and upserts by
  `(key, academic_year)`. Unchanged syllabus files are skipped by content hash. Invalid files fail the
  run before any write. Rows removed from YAML are not deleted.
- `seed test-users` creates six fixture users (`*@example.com`, phones `+91555000xxxx`, which cannot be
  Indian mobile subscribers), profiles, consent states and two guardian links (one verified). No admin,
  no password. Refuses when `NODE_ENV=production` or `APP_ENV=prod`.
- `admin bootstrap --email E` promotes the user with that (normalised) email or creates one, and
  writes an `audit_log` row. A fresh database has no admin until this runs (DB-7).
