# ADR-003: Background jobs on pg-boss (same PostgreSQL, own schema)

- **Status:** Accepted
- **Date:** 2026-10-26
- **Author:** backend-api
- **Related:** ARCHITECTURE §1, §4, §13, §15; DECISIONS D-008, D-022, D-025; security requirements DB-1,
  AUTH-15, GEN-3, GEN-5, GEN-6, INFRA-7; `platform/db/PII.md` (account deletion); ADR-004 (Drizzle, roles)

## Context

ARCHITECTURE §4 names **pg-boss** (a Postgres-backed queue) for background work: content jobs, TTS,
PDF export, evaluations, emails, reconciliation, and "revisit with an ADR if throughput demands Azure
Service Bus". §15 and `PII.md` need scheduled data-retention work now: anonymised accounts must be
hard-deleted within 30 days, expired OTP rows swept, and AUTH-15 asks for unconsented accounts to be
deleted after `UNCONSENTED_ACCOUNT_TTL_DAYS` by a worker job.

Facts that shape the choice:

- PostgreSQL is already the system of record (ADR-004) and runs everywhere we test: embedded locally
  (D-008, no Docker), a service container in CI, Flexible Server in Azure.
- Redis exists for rate limits and OTP state, but it is cache-like (eviction, no durability promise);
  we do not want job durability to depend on it.
- The app role `soyl_app` has DML only (DB-1). Anything that needs DDL at run time is a problem.
- Volumes for M1 are tiny (a handful of maintenance jobs per day). Later content/TTS/PDF jobs are
  minutes-long and low-rate, not high-throughput messaging.
- The worker is a Container App with **no ingress** (INFRA-7); it is probed directly.

## Options considered

1. **pg-boss 12 on the same PostgreSQL** — jobs are rows (`SKIP LOCKED`), so a job can be enqueued in
   the same transaction as the data it is about (pg-boss has a Drizzle adapter). Cron scheduling,
   retries with backoff, expiry, dead-letter queues, singleton/stately policies, multi-instance safe.
   One more schema in a database we already back up, monitor and restore. No new infrastructure.
2. **BullMQ on Redis** — fast and mature, but makes Redis a durable store (AOF, no eviction, HA tier
   becomes mandatory), cannot share a transaction with Postgres writes (outbox needed), and adds a
   second failure domain for every job.
3. **Azure Service Bus** — managed, scales far beyond our needs, dead-lettering built in. But: no
   local emulator without Docker (D-008), no cron (we would still need a scheduler), no transactional
   enqueue with our data, extra cost and identity wiring, and not testable in CI without Azure.
4. **Graphile Worker** — also Postgres-backed and good. Uses its own migration and `LISTEN/NOTIFY`
   model; smaller ecosystem for cron/policies/dead-lettering than pg-boss, and ARCHITECTURE already
   names pg-boss. No decisive advantage for our workload.

## Decision

### 1. pg-boss 12.38.0 on the application database, schema `pgboss`

`@soyl/worker` (`platform/worker/`) runs pg-boss with its own small pool (`max: 4`,
`application_name = soyl-worker`) against `DATABASE_URL`, schema `PGBOSS_SCHEMA` (default `pgboss`).
Handlers use the app pool through `@soyl/db` (Drizzle over `pg`, the same driver). Producers (the API,
later) call `send()` on a pg-boss instance started with `migrate: false, supervise: false,
schedule: false`, or enqueue inside a Drizzle transaction with pg-boss's `fromDrizzle` adapter.

### 2. Schema lifecycle and least privilege (DB-1)

- **Local/test:** the worker self-installs (`PGBOSS_MIGRATE` defaults to `true` only for
  `APP_ENV=local|test`).
- **dev/stg/prod:** the pre-deploy migrations job runs, as the migrator identity, after
  `@soyl/db migrate up`:

  ```
  node dist/index.js migrate      # in the worker image; exit 0 ok, 3 = background index builds outstanding
  ```

  It installs or upgrades the pg-boss schema, waits (≤ 10 min) for pg-boss's background index builds
  ("BAM", `CREATE INDEX CONCURRENTLY`, which need the table owner and only run on a `migrate: true`
  instance), then grants the app role. The running worker starts pg-boss with `migrate: false`
  (start-up fails with "pg-boss is not installed" / "requires migrations" if the job has not run).
  The config **refuses `PGBOSS_MIGRATE=true` when `APP_ENV` is `stg` or `prod`**.
- To keep the app role DML-only, the worker never uses features that run DDL at run time:
  no `partition: true` queues (excluded from the registry's types; `create_queue()` would
  `CREATE TABLE`), `persistQueueStats` off (it creates daily partitions), and `reindex: false` when not
  migrating (`REINDEX` needs the owner). `deleteAllJobs()` (TRUNCATE) is not used.

**What infra must apply** (Azure Flexible Server, Entra roles as in `platform/db/README.md` "Roles";
`id-soyl-worker-<env>` is already a member of `soyl_app`, and the migrator identity runs with
`role = soyl_migrator`, so pg-boss objects are owned by `soyl_migrator`):

```sql
-- once per database, as the server admin: let the migrator create the pg-boss schema …
GRANT CREATE ON DATABASE <appdb> TO soyl_migrator;
-- … or pre-create it instead (the migrate command then skips CREATE SCHEMA):
-- CREATE SCHEMA pgboss AUTHORIZATION soyl_migrator;
```

The `migrate` command then applies, on every run (idempotent; `src/migrate.ts` `appRoleGrants`):

```sql
GRANT USAGE ON SCHEMA "pgboss" TO "soyl_app";
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "pgboss" TO "soyl_app";
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA "pgboss" TO "soyl_app";
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA "pgboss" TO "soyl_app";   -- create_queue(), job_now(), …
ALTER DEFAULT PRIVILEGES IN SCHEMA "pgboss" GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO "soyl_app";
ALTER DEFAULT PRIVILEGES IN SCHEMA "pgboss" GRANT USAGE, SELECT ON SEQUENCES TO "soyl_app";
ALTER DEFAULT PRIVILEGES IN SCHEMA "pgboss" GRANT EXECUTE ON FUNCTIONS TO "soyl_app";
```

No `CREATE`, `TRUNCATE`, `REFERENCES`, `TRIGGER` or ownership for `soyl_app`. If `soyl_app` does not
exist (e.g. a server where the migrator lacked `CREATEROLE`), the command logs a warning and skips the
grants. `test/worker.test.ts` proves the split: after `migrate`, a worker whose pools connect with
`-c role=soyl_app` processes jobs end-to-end, and `CREATE TABLE pgboss.…` as `soyl_app` is denied.

Server parameter `timezone = UTC` (GEN-6) also applies to pg-boss's clock (`job_now()`).

### 3. Jobs (registry: `platform/worker/src/jobs.ts`)

Crons are 5-field expressions evaluated in **UTC** (`tz: 'UTC'`, GEN-6); 20:30 UTC = 02:00 IST.

| Queue | Cron (UTC) | What | Requirement |
|---|---|---|---|
| `account.purge` | `30 20 * * *` | `DELETE` users with `deleted_at < now − ACCOUNT.purgeAfterDays` (30); FK cascades remove per-user rows, `SET NULL` detaches retained rows | PII.md step 2, §15 |
| `account.purge-unconsented` | `45 20 * * *` | `DELETE` students not deleted, created before `now − UNCONSENTED_ACCOUNT_TTL_DAYS` (default 30), with consent `required`/`pending` or no consent row | AUTH-15 (see §7) |
| `auth.sweep-verifications` | `15 * * * *` | `DELETE` verifications with `expires_at < now` | PII.md ("swept daily"; hourly is stricter) |
| `auth.sweep-sessions` | `0 21 * * *` | `DELETE` sessions with `expires_at < now` | AUTH-9 hygiene |

A heartbeat timer (every 60 s) does a round trip through pg-boss's pool, logs a `heartbeat` line and
records the last success; it is a timer, not a queue, so it costs no job rows.

All four use queue options: policy **`stately`** (at most one queued and one active job per queue, so
crons missed while the worker was down do not pile up), `retryLimit: 3`, `retryDelay: 60` s with
`retryBackoff` (capped at 1 h), `expireInSeconds: 1800` (600 for the verification sweep),
`deleteAfterSeconds: 7 days` (1 day for the hourly sweep). Schedules use pg-boss's default
`missed: 'skip'`: a run missed during an outage happens at the next occurrence, which is harmless for
retention jobs. Registration runs on every start of every replica and is idempotent (queues created or
updated, schedules upserted, a cron removed from the registry is unscheduled).

### 4. Idempotency rule (binding for every handler)

pg-boss delivers **at least once** (retries, expiry, a crash between the work and the completion).
Every handler must therefore be safe to run again with the same input: express it as "make the
database satisfy X" (`DELETE … WHERE <condition>`), never "do X once" (no counters, no
"send email" without a dedupe key). Work is done in bounded batches (`DELETE … WHERE id IN (SELECT …
LIMIT 500 FOR UPDATE SKIP LOCKED)`), each its own short transaction, so a retry resumes where the last
attempt stopped and long locks on `users`/`sessions` never happen. Handlers take
`{ db, now, log, signal }` so tests pin `now`; they log counts only, never personal data (DB-8).
Jobs that must also write somewhere else (emails, blobs) will use a dedupe key or pg-boss's
`transactional: true` workers.

### 5. Process model, health and shutdown

- `node dist/index.js` (D-022 bundle). Probe server on `WORKER_HEALTH_PORT` (default 8081):
  `GET /healthz` → 200 once pg-boss started; `GET /readyz` → 200 if `SELECT 1` on the app pool answers
  within 2 s, else 503. Bodies are `{"status":…}` only. Container Apps probes hit the container
  directly; the app keeps **no ingress** (INFRA-7).
- SIGTERM/SIGINT: stop fetching, wait up to `WORKER_SHUTDOWN_TIMEOUT_MS` (default 20 s) for running
  jobs (`boss.stop({ graceful: true, timeout })`), fail any still running back to `retry`, close the
  probe server and pools, exit 0. Set the Container App's termination grace period ≥ 30 s.
- No `LISTEN/NOTIFY` (works through PgBouncer transaction pooling and needs no pinned connection);
  queues poll every 10 s, which is plenty for maintenance work. Latency-sensitive queues later can
  opt in per queue.

### 6. Scaling and when to revisit

- One replica is enough for M1; pg-boss is multi-instance safe (`SKIP LOCKED`, cron evaluation is
  coordinated in the database), so `min 1` in stg/prod and more replicas are fine.
- ARCHITECTURE §13 "worker scale on queue depth": later, a KEDA PostgreSQL scaler on
  `SELECT count(*) FROM pgboss.job WHERE state IN ('created','retry') AND start_after <= now()`
  (read-only role), once content/TTS/PDF jobs exist.
- Revisit with Azure Service Bus (new ADR) if sustained throughput exceeds what one Postgres comfortably
  carries next to OLTP traffic (order of 100 jobs/s, or job-table churn visibly hurting the database),
  or if we need cross-service fan-out outside this database.

### 7. AUTH-15 role assumption (pending the owner, OA-08 / OA-14)

AUTH-15 says accounts that never reach `consent=granted` are deleted after the TTL. Until the owner's
consent contract (OA-08) and counsel (OA-14) say otherwise, the job assumes:

- **Students only.** Parental consent concerns children's data (D-014, DPDP s.9). `parent`,
  `reviewer` and `admin` accounts are never deleted by this job, whatever their consent row says.
- **"Never reached granted"** = consent status `required` or `pending`, or no `consent_status` row.
  `revoked` is **not** purged by this job: the account did reach `granted`, and what revocation
  should trigger (deletion, or freezing gated features as D-014 already does) is an open question for
  OA-08/OA-14.
- The TTL counts from `users.created_at`; exactly at the TTL is kept (strict `<`).
- Accounts already anonymised (`deleted_at` set) are left to `account.purge`.
- Verification rows keyed by the deleted account's email/phone are not linked by FK; they expire
  within minutes and the hourly sweep removes them. Uploads are consent-gated (D-014), so an
  unconsented account has no blobs; if that changes, this job must delete blobs first.

Change `UNCONSENTED_PURGE_ROLES` / `CONSENT_REACHED` in `src/jobs.ts` (and the tests) when the owner
answers.

## Configuration

| Env var | Default | Notes |
|---|---|---|
| `APP_ENV` | `local` | `local`, `test`, `dev`, `stg`, `prod` |
| `DATABASE_URL` | — | required outside local/test; local without it starts the embedded dev DB |
| `WORKER_HEALTH_PORT` / `WORKER_HEALTH_HOST` | `8081` / `0.0.0.0` | probe server |
| `PGBOSS_SCHEMA` | `pgboss` | lower-case identifier |
| `PGBOSS_MIGRATE` | `true` for local/test, else `false` | refused as `true` in stg/prod |
| `PGBOSS_APP_ROLE` | `soyl_app` | role the `migrate` command grants |
| `UNCONSENTED_ACCOUNT_TTL_DAYS` | `CONSENT.unconsentedAccountTtlDays` (30) | AUTH-15, owner to set |
| `WORKER_SHUTDOWN_TIMEOUT_MS` | `20000` | graceful stop budget |
| `LOG_LEVEL` | `info` | JSON lines, UTC ISO timestamps (GEN-6) |

GEN-3: the worker has no mock providers; the embedded dev database refuses any `APP_ENV` other than
`local`/`test`, and `DATABASE_URL` is mandatory elsewhere.

## Dependencies (GEN-5)

Pinned exactly in `platform/worker/package.json` and `platform/package-lock.json`.

| Package | Version | Kind | Why |
|---|---|---|---|
| `pg-boss` | 12.38.0 | runtime | job queue (ARCHITECTURE §4); MIT; Node ≥ 22.12, PostgreSQL ≥ 13 |
| ↳ `cron-parser` (+ `luxon` 3.7.2) | 5.10.2 | runtime (transitive) | cron evaluation |
| ↳ `rrule-temporal` (+ `temporal-spec`) | 2.2.8 | runtime (transitive) | RRULE schedules (unused by us) |
| ↳ `serialize-error` (+ `non-error`) | 13.0.2 | runtime (transitive) | stores job errors as JSON |
| ↳ `@opentelemetry/api` (peer) | 1.9.1 | runtime (transitive) | no-op until an OTel SDK is registered (ARCHITECTURE §14 will); already in the tree via drizzle-orm and better-auth |
| `pg` | 8.23.1 | runtime | shared with `@soyl/db` |
| `@soyl/db`, `@soyl/shared`, `drizzle-orm` | workspace / 0.45.4 | runtime | schema, client, security config |
| `zod` | 4.6.7 (hoisted via `@soyl/shared`) | runtime | config validation (`zod/v4`); should be declared in the worker's package.json |
| `esbuild`, `tsx`, `typescript`, `vitest`, `@vitest/coverage-v8`, `@types/*` | pinned | dev | build (D-022), dev runner, typecheck, tests |

`npm audit --omit=dev` (platform/, 2026-10-26): **0 high, 0 critical**; the same 4 moderate findings
recorded in ADR-004 (drizzle-kit's legacy `@esbuild-kit` loader, a dev tool), none in pg-boss or its
dependencies.

## Consequences

- One datastore to operate, back up and restore; job state is covered by PITR with everything else.
  A restore rolls jobs back with the data they describe, which is what we want.
- Jobs can be enqueued atomically with the data that triggers them (no outbox).
- Queue load lands on the application database. The maintenance jobs are cheap; heavy content jobs
  later must keep batches small and may need their own queue options or, eventually, Service Bus.
- The deploy order is fixed: `@soyl/db migrate up` → `worker migrate` → roll out API and worker.
  A worker deployed before its pg-boss upgrade fails start-up loudly instead of running half-migrated.
- pg-boss index rebuilds (`REINDEX CONCURRENTLY`) do not run under the app role. If bloat warnings
  appear, run the statements from `boss.getReindexCommands()` as the migrator (follow-up for ops).
- With a daily run and a strict `< now − 30 days`, an anonymised account is purged 30–31 days after
  deletion. If "within 30 days" (§15) must be read strictly, set `ACCOUNT.purgeAfterDays` to 29.
- Tests run against real PostgreSQL (embedded locally, the CI service container via
  `TEST_DATABASE_URL`): handler boundary cases, cascades, registration, an end-to-end job through a
  real pg-boss, the migrate/grant split as `soyl_app`, probes and graceful stop.
