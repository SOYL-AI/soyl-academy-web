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
  modules/          routes: auth, session, me, catalog, health, dev (local only)
  domain/           guest merge, account deletion, display names, profile
  contract/guest.ts guest-progress schema shared with the web (zod/v4 only)
  kv/               KeyValueStore: memory + ioredis
  dev/              mock OIDC provider, embedded dev database
scripts/            dev.ts, openapi.ts, build.mjs
test/               vitest suites against real PostgreSQL
```

## Run locally

```
cd platform && npm ci
npm run dev -w @soyl/api
```

This serves `http://localhost:8787` with no external services: embedded PostgreSQL (migrated, full catalog, fixture users), in-memory KV, mock SMS/email/consent, a mock Google OIDC provider on `http://127.0.0.1:8090`, and `GET /v1/dev/otp-outbox?to=<test identifier>`. Every `/v1` call needs `x-soyl-edge-auth: local-dev-edge-secret-not-for-deployment-000000`, which the web proxy adds (ADR-005).

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
npm run typecheck -w @soyl/api
npm test -w @soyl/api               integration + unit tests on real PostgreSQL
npx vitest run --coverage           (inside api/) coverage summary
```

Tests use `@soyl/db/testing` (one embedded PostgreSQL per run, a fresh database per file). In CI, set `TEST_DATABASE_URL` (Postgres service) and `REDIS_URL` (redis:7). With `REDIS_URL`, the harness and the KV contract test use ioredis.

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
| `REDIS_URL` | — | Required in `stg`/`prod`; memory store otherwise. |
| `EDGE_SECRETS` | dev value in local/test | API-2: one or two secrets (≥ 32 chars), current first. |
| `CLIENT_IP_HEADER` | `x-soyl-client-ip` | API-3; trusted only after edge auth. |
| `AUTH_SECRET` | dev value in local/test | Signs session and OAuth-state cookies (≥ 32 chars). |
| `OTP_PEPPER` | dev value in local/test | AUTH-4 HMAC key (≥ 32 chars). |
| `SMS_GLOBAL_HOURLY_CAP` | `1000` | AUTH-5 global phone-OTP cap. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | dev values in local/test | |
| `GOOGLE_ISSUER` | `https://accounts.google.com` | Must be Google in prod; the dev script points it at the mock. |
| `ADMIN_GOOGLE_DOMAINS` | — | AUTH-11 Workspace domains allowed for reviewer/admin. |
| `SMS_PROVIDER` | `mock` | `msg91` needs `SMS_PROVIDER_API_KEY`, `SMS_DLT_TEMPLATE_IDS` (`{"otp":"…","notice":"…"}`), optional `SMS_SENDER_ID`, `MSG91_BASE_URL`. |
| `EMAIL_PROVIDER` | `mock` | `acs` needs `ACS_EMAIL_ENDPOINT`, `ACS_EMAIL_ACCESS_KEY`; `EMAIL_FROM`. |
| `CONSENT_PROVIDER`, `MOCK_CONSENT_DEFAULT` | `mock`, `required` | Only the mock exists (OA-08). |
| `ACADEMIC_YEAR` | `2026-27` | Catalog year served. |
| `DEV_OTP_OUTBOX` | off | Local/test only. |

Security numbers (OTP limits, session lifetimes, rate limits, consent-gated features) are in `platform/shared/config/security.ts`.

## Adding a route

Every route must declare `config.policy` (see `src/policy.ts`); without one the server does not start. Use `.strict()` (`z.strictObject`) request schemas, give every response a zod schema, and never spread DB rows into responses. Scope every by-id query to the caller and return 404 for anyone else's id (API-7). Then run `npm run openapi -w @soyl/api` and update the route-policy snapshot (`npx vitest run test/route-policy.test.ts -u`), and review the diff.
