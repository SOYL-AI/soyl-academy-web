# ADR-004: ORM, migrations and the local database (Drizzle, hand-written downs, embedded PostgreSQL)

- **Status:** Accepted
- **Date:** 2026-10-26
- **Author:** db-schema
- **Related:** ARCHITECTURE §4, §5, §6, §10, §15; DECISIONS D-005, D-008, D-010, D-012, D-014, D-021; security requirements DB-1..DB-8, GEN-2, GEN-5, GEN-6; threat model AC-07..AC-12

## Context

ARCHITECTURE §4 names Drizzle with drizzle-kit migrations, run as a pre-deploy job. AGENTS §6 requires
every DB change to migrate **up and down** on a fresh and a seeded database. The build machine has no
Docker (D-008), so local tests need a real PostgreSQL without containers, while CI runs PostgreSQL with
pgvector as a service container. Better Auth (ARCHITECTURE §5) must use our tables directly. The
security review asks for database-enforced invariants (DB-1, DB-2, DB-6) rather than code-only checks.

## Options considered

**ORM / query layer**
1. **Drizzle ORM + drizzle-kit** — TypeScript schema, SQL-shaped queries, parameterised by default,
   first-class Better Auth adapter, no runtime engine. Generated migrations are plain SQL we can edit.
2. Prisma — heavier runtime (query engine), schema in its own language, weaker fit for raw SQL
   features we need (partial unique indexes, generated columns, triggers, views).
3. Kysely — good query builder, but no schema-to-migration generation; more hand-written DDL.

**Migrations**
1. drizzle-kit `migrate` / drizzle-orm migrator — up only, no rollback, no detection of edited files.
2. **drizzle-kit `generate` for up SQL + hand-written `.down.sql` + a small runner of our own.**
3. A third-party migration tool (node-pg-migrate, graphile-migrate) — another DSL beside Drizzle's.

**Local PostgreSQL**
1. Docker / Testcontainers — not available on the build machine (D-008).
2. **`embedded-postgres`** — real PostgreSQL 18 binaries from npm, Windows and Linux.
3. pglite (WASM) — not real PostgreSQL; roles, grants and extensions behave differently.

## Decision

1. **Drizzle ORM 0.45 + drizzle-kit 0.31** (latest stable; 1.0 is still RC), driver **node-postgres
   (`pg`)** — the same driver pg-boss uses, so one driver in the stack.
2. **Migrations:** drizzle-kit generates the up SQL from `platform/db/schema/*.ts`; hand-written SQL
   files (`drizzle-kit generate --custom`) hold functions, triggers, views and conditional DDL; every
   migration has a hand-written `NNNN_name.down.sql`. Our runner (`src/migrator.ts`) applies each file
   in its own transaction under an advisory lock, records name + sha256 (line endings normalised) in
   `soyl_schema_migrations`, refuses a migration without a down file, reports drift, supports
   `up|down [--to N]|status`, and re-applies `soyl_apply_conventions()` (grants, `updated_at`
   triggers) after every up. drizzle-kit's `meta/` snapshots stay committed so the next `generate`
   diffs correctly.
3. **Ids: uuid v7 generated in app code** (`uuidv7()` in `src/ids.ts`, used as Drizzle `$defaultFn`
   and as Better Auth's `generateId`), with a **portable SQL `uuid_generate_v7()`** as the column
   default for raw SQL. Not PostgreSQL 18's native `uuidv7()`: CI images and Azure Flexible Server
   versions may be older than 18, and app-side ids are known before insert (useful for idempotency
   and Better Auth). v7 ids are time-ordered (good B-tree locality) and are not secrets (F-026).
4. **Local and test database: `embedded-postgres` 18.4** (devDependency only). A pristine cluster is
   initialised once into `platform/db/.data/pristine` and copied per test run; each test database is a
   `CREATE DATABASE … TEMPLATE` of a migrated template named after the migrations' fingerprint. CI sets
   `TEST_DATABASE_URL` to its PostgreSQL + pgvector service and the same harness creates databases there.
5. **pgvector local gap:** embedded PostgreSQL has no pgvector. Migration 0002 creates the extension,
   `content_chunks.embedding vector(1536)` and its HNSW index only when `pg_available_extensions` lists
   `vector`, and otherwise raises a NOTICE. The vector path is therefore exercised **only in CI and
   Azure** (`test/schema.test.ts` checks the column type and index there and skips locally). Locally,
   select explicit columns from `content_chunks`. Changing `EMBEDDING_DIMENSIONS` needs a migration.
6. **Enumerations are `text` + `CHECK`**, not PostgreSQL enums: adding a value is a one-line,
   reversible migration, and values come from `@soyl/shared` where they exist.
7. **Least privilege in the database (DB-1):** NOLOGIN group roles `soyl_migrator` and `soyl_app`;
   `soyl_app` has DML only, and only INSERT/SELECT on `credit_ledger`, `audit_log`, `webhook_events`,
   `content_budget_ledger`. Role creation is tolerant (NOTICE when the migrating user lacks
   CREATEROLE); Azure Entra mapping is in `platform/db/README.md` "Roles".
8. **Normalised identifiers as generated columns (DB-3):** `users.email_normalized` and
   `users.phone_e164` are computed by immutable SQL functions, with TypeScript twins tested for
   agreement, so uniqueness holds whichever code path (Better Auth, seeds, admin) writes a user.

## Dependencies (GEN-5)

Pinned exactly in `platform/db/package.json` and `platform/package-lock.json`.

| Package | Version | Kind | Why |
|---|---|---|---|
| `drizzle-orm` | 0.45.4 | runtime | ORM (ARCHITECTURE §4) |
| `pg` | 8.23.1 | runtime | PostgreSQL driver; shared with pg-boss |
| `js-yaml` | 4.3.2 | runtime | catalog seed reads YAML (already in the tree via content-templates) |
| `@soyl/shared` | workspace | runtime | zod schemas for catalog/blueprint validation and enum values |
| `drizzle-kit` | 0.31.11 | dev | migration generation |
| `embedded-postgres` | 18.4.0-beta.17 | dev | local/test PostgreSQL without Docker (D-008); platform binaries via optional deps |
| `better-auth` | 1.7.13 | dev | adapter compatibility test only; backend-api owns the runtime dependency |
| `tsx`, `typescript`, `vitest`, `@types/*` | pinned | dev | CLI runner, typecheck, tests |

`npm audit` (platform/): **0 high, 0 critical**; 4 moderate, all from drizzle-kit's bundled legacy
loader (`@esbuild-kit/esm-loader` → `esbuild ≤ 0.24.2`, GHSA-67mh-4wv8-2f99, a CORS issue in esbuild's
dev **server**). drizzle-kit is a dev tool that never starts esbuild's server; the only fix offered is
a downgrade to drizzle-kit 0.18. Accepted; re-check when drizzle-kit 1.0 is stable. Not shipped in images
(`npm ci --omit=dev`).

## Consequences

- Every schema change is two files (generated up, hand-written down) plus a test run; the runner and
  `test/migrations.test.ts` (up → down to 0 → up on fresh and seeded databases, schema snapshots equal)
  make a missing or wrong down file fail CI.
- Never edit an applied migration; `migrate status` exits 2 on drift.
- Better Auth uses the plural tables with `usePlural: true` and our uuid v7 `generateId`; `role` lives on
  `users` (admin plugin column), not `profiles` — a deviation from ARCHITECTURE §6 recorded in the handoff.
- Local tests cannot cover pgvector; CI must run the suite with `TEST_DATABASE_URL` on a pgvector image.
- Roles are cluster-wide and survive `down` (other databases on the server may use them).
- The test server user must be a superuser (or hold CREATEDB, CREATEROLE and `SET ROLE soyl_app`).
