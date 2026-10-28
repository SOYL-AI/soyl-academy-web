# @soyl/api

The SOYL Academy Learning Platform API: Fastify + TypeScript + zod, Better Auth identity core,
PostgreSQL via `@soyl/db`, Redis (or in-memory) KV. Design: `docs/platform/ARCHITECTURE.md` §4–5;
decisions: ADR-002 (auth), ADR-005 (proxy contract); contract: [`openapi.json`](openapi.json).

```
src/
  app.ts            buildApp(deps): hooks (flag, edge auth, route policy), errors, routes
  config.ts         env → validated Config (refuses unsafe prod config)
  policy.ts         route policy framework (API-6)
  auth/             Better Auth instance, sessions, OTP, Google OIDC, identity/linking, senders
  consent/          ConsentProvider interface, mock, cache + gate
  modules/          routes: auth, session, me, catalog, content, practice, progress, reports, mfa, admin,
                    health, dev (local only)
  domain/           content reads (active release, student-safe DTOs), grading, practice, progress,
                    gamification (XP, IST streaks, badges), reports, guest merge, account deletion, profile
  auth/mfa.ts       AUTH-11 staff TOTP (ADR-011)
  http/cache.ts     ETag + Cache-Control for public content reads (ADR-010)
  contract/guest.ts guest-progress schema shared with the web (zod/v4 only)
  kv/               KeyValueStore: memory + ioredis
  dev/              mock OIDC provider, embedded dev database
scripts/            dev.ts (+ dev-content.ts: publishes authored content at start), openapi.ts, build.mjs
test/               vitest suites against real PostgreSQL
```

## Run locally

```
cd platform && npm ci
npm run dev -w @soyl/api
```

This serves `http://localhost:8787` with no external services: embedded PostgreSQL (migrated, full catalog, fixture users, and every authored/exemplar chapter published through the pipeline's publish stage — `DEV_CONTENT=off` skips that), in-memory KV, mock SMS/email/consent, a mock Google OIDC provider on `http://127.0.0.1:8090`, and `GET /v1/dev/otp-outbox?to=<test identifier>`. Every `/v1` call needs `x-soyl-edge-auth: local-dev-edge-secret-not-for-deployment-000000`, which the web proxy adds (ADR-005).

Tests (M3, ADR-012): start-up also runs the pipeline's `assemble --series` for CBSE 10 Science and Maths (the unit/mock papers the bank allows) and schedules the live mocks: the two Wave 1 sittings and a "Dev live mock" starting `DEV_LIVE_IN` minutes after start-up (default 10, `off` to skip), with papers filled from the practice pool (local only). `MOCK_OIDC_PORT` moves the mock Google provider when 8090 is taken.

```
S=local-dev-edge-secret-not-for-deployment-000000
curl localhost:8787/healthz
curl -H "x-soyl-edge-auth: $S" localhost:8787/v1/catalog/boards
curl -H "x-soyl-edge-auth: $S" -H "origin: http://localhost:3000" -H "content-type: application/json" \
     -d '{"email":"student.cbse10@example.com"}' localhost:8787/v1/auth/email/send-otp
curl -H "x-soyl-edge-auth: $S" "localhost:8787/v1/dev/otp-outbox?to=student.cbse10@example.com"
```

Production-style: `npm run build -w @soyl/api` → `node api/dist/index.js` (D-022; `PORT` default 8080).
Without `DATABASE_URL` and with `APP_ENV=local` it starts the embedded database itself.

## Commands (from `platform/`)

```
npm run dev -w @soyl/api            local server (above)
npm run build -w @soyl/api          esbuild bundle → api/dist/index.js
npm run openapi -w @soyl/api        regenerate api/openapi.json (a test fails when it is stale)
npm run live -w @soyl/api -- schedule|list    live mocks (Wave 1 sittings; see scripts/live.ts, ADR-012)
npm run attempts -w @soyl/load -- …  test-engine load harness (platform/load/README.md)
npm run typecheck -w @soyl/api
npm test -w @soyl/api               integration + unit tests on real PostgreSQL
npx vitest run --coverage           (inside api/) coverage summary
```

Tests use `@soyl/db/testing` (one embedded PostgreSQL per run, a fresh database per file). In CI, set `TEST_DATABASE_URL` (Postgres service) and `REDIS_URL` (redis:7). With `REDIS_URL`, the harness and the KV contract test use ioredis. Locally, `TEST_KV=redis-mock` runs the whole suite on the Redis store over ioredis-mock (each test app gets its own key namespace). Content tests ingest the real authored releases (`test/content-fixture.ts`).

## Environment

| Variable | Default | Notes |
|---|---|---|
| `APP_ENV` | `local` | `local`, `test`, `dev`, `stg`, `prod`. Dev defaults and mocks only in `local`/`test`; mocks refused in `prod` (GEN-3). |
| `PORT`, `HOST` | `8080`, `0.0.0.0` | |
| `LOG_LEVEL` | `info` | |
| `PLATFORM_ENABLED` | off | GEN-4: off → everything except health is 404. |
| `PUBLIC_BASE_URL` | `http://localhost:3000` (local) | API-1: the only origin used in absolute URLs. https required outside local/test. |
| `API_PUBLIC_PATH` | `/api/platform` | Proxy path on the web origin. |
| `ALLOWED_ORIGINS` | origin of `PUBLIC_BASE_URL` | AUTH-12 exact Origin allowlist (comma-separated, no wildcards). |
| `DATABASE_URL` | — | Required outside local/test. |
| `DATABASE_AUTH` | `password` | `entra`: the URL has no password; each new connection uses a managed-identity token for `https://ossrdbms-aad.database.windows.net` (INFRA-2). |
| `DATABASE_POOL_MAX` | 10 | Connections per API replica (§16 capacity; replicas × pool ≤ the server's limit). |
| `REDIS_URL` | — | Required in `stg`/`prod`; memory store otherwise. |
| `REDIS_AUTH`, `REDIS_USERNAME` | `none` | `entra`: Azure Managed Redis; username = managed identity object id, password = token for `https://redis.azure.com`, re-AUTH before expiry; `rediss://` required (INFRA-3). |
| `AZURE_CLIENT_ID` (+ `IDENTITY_ENDPOINT`, `IDENTITY_HEADER` set by Container Apps) | — | User-assigned managed identity for all tokens (`@soyl/shared/azure/identity`). Without the endpoint, local dev uses `az account get-access-token`; never in prod. |
| `EDGE_SECRETS` | dev value in local/test | API-2: one or two secrets (≥ 32 chars), current first. Or `EDGE_SECRET_CURRENT` + `EDGE_SECRET_PREVIOUS` (Key Vault refs; equal values are de-duplicated). |
| `AUTH_METHODS` | `email,phone,google` | AUTH-1: enabled sign-in methods. Others answer 404 `method_disabled`; their settings (Google, SMS) are then not required. `GET /v1/auth/methods` reports them. Production: `email` (D-031). |
| `CLIENT_IP_HEADER` | `x-soyl-client-ip` | API-3; trusted only after edge auth. |
| `AUTH_SECRET` | dev value in local/test | Signs session and OAuth-state cookies (≥ 32 chars). |
| `OTP_PEPPER` | dev value in local/test | AUTH-4 HMAC key (≥ 32 chars). |
| `MFA_ENCRYPTION_KEY` | dev value in local/test | AUTH-11: 32 bytes, base64; encrypts staff TOTP secrets at rest (ADR-011). |
| `SMS_GLOBAL_HOURLY_CAP` | `1000` | AUTH-5 global phone-OTP cap. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | dev values in local/test | Required only while `google` is in `AUTH_METHODS`. |
| `GOOGLE_ISSUER` | `https://accounts.google.com` | Must be Google in prod; the dev script points it at the mock. |
| `ADMIN_GOOGLE_DOMAINS` | — | AUTH-11 Workspace domains allowed for reviewer/admin. |
| `SMS_PROVIDER` | `mock` | `msg91` needs `SMS_PROVIDER_API_KEY`, `SMS_DLT_TEMPLATE_IDS` (`{"otp":"…","notice":"…"}`), optional `SMS_SENDER_ID`, `MSG91_BASE_URL`. |
| `EMAIL_PROVIDER` | `mock` | `acs` needs `ACS_ENDPOINT` (alias `ACS_EMAIL_ENDPOINT`); sends with the managed identity (token for `https://communication.azure.com`). `ACS_EMAIL_ACCESS_KEY` only outside prod. `EMAIL_FROM` default `SOYL Academy <noreply@soylai.com>`. |
| `CONSENT_PROVIDER`, `MOCK_CONSENT_DEFAULT` | `mock`, `required` | `builtin` (D-039, ADR-022; intended for prod): age band, 18+ self-declares, under 18 needs a parent's emailed approval code; needs `EMAIL_PROVIDER=acs` in prod; no new secret (keys derive from `OTP_PEPPER`). `unavailable` (D-031): everyone `pending`, cannot be granted, so every consent-gated feature (D-014) answers 403 `consent_required`; learning and tests work. `mock` is refused in prod. Set the same value on the worker (AUTH-15 purge stays off under `auto` for `builtin` and `unavailable`). |
| `ACADEMIC_YEAR` | `2026-27` | Catalog year served. |
| `DEV_OTP_OUTBOX` | off | Local/test only. |
| `DEV_CONTENT` | on | `npm run dev` only: `off` skips publishing authored content at start-up. |

Security numbers (OTP limits, session lifetimes, rate limits, consent-gated features) are in `platform/shared/config/security.ts`.

## Adding a route

Every route must declare `config.policy` (see `src/policy.ts`); without one the server does not start. Use `.strict()` (`z.strictObject`) request schemas, give every response a zod schema, and never spread DB rows into responses. Scope every by-id query to the caller and return 404 for anyone else's id (API-7). Then run `npm run openapi -w @soyl/api` and update the route-policy snapshot (`npx vitest run test/route-policy.test.ts -u`), and review the diff.
