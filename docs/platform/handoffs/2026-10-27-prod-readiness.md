# backend-api + infra-azure: production readiness for the first Azure deployment (D-031): 2026-10-27

**Status:** done locally (code, Bicep and runbook). Nothing was deployed by this agent; the Lead runs the deployment with [`docs/platform/runbooks/prod-first-deploy.md`](../runbooks/prod-first-deploy.md).

**Branch:** `platform/backend-api/prod-auth` (worktree `C:/Users/Prabhu/soyl-wt/prod-auth`). It includes `origin/platform/main` with backend-api M3 merged (commit `071fe09`). The conflicts were in `api/src/config.ts`, `index.ts`, `kv/redis.ts` and the README; they are resolved, and the results are under "Verification".

## Decisions

**D-031 is already in DECISIONS.md** (Lead, from the same owner instruction). This work implements it.

Implementation choices the Lead may want to append to D-031, or record as a new D-0xx:

| Topic | Choice | Why |
|---|---|---|
| Consent | **`CONSENT_PROVIDER=unavailable`** in production until OA-08. Everyone is `pending` and consent cannot be granted, so every D-014 consent-gated feature answers 403 `consent_required`. Learning, practice and tests work. | The provider is not a mock, so GEN-3 allows it in prod. |
| AUTH-15 purge | **OFF while consent is unavailable** (`UNCONSENTED_PURGE=auto`). | With no consent system, the purge would delete every student account 30 days after sign-up. The owner and counsel must decide before launch (OA-14). |
| Sign-in methods | **`AUTH_METHODS` switches sign-in methods.** Disabled methods answer 404 `method_disabled`. `GET /v1/auth/methods` tells the web which methods to show. | |
| Keyless auth | **No `@azure/identity`.** Managed-identity tokens come from `@soyl/shared/azure/identity` (Container Apps endpoint), for Postgres, Redis, ACS and Blob. | |
| Production start sizing | Postgres Burstable B2s without HA; Redis Balanced_B0; api 1–5 replicas; worker fixed at 1; no AI; no Front Door; budget ₹25k. | Scale up before launch per the runbook §13. |
| ACS sender role | **Communication and Email Service Owner** if the tenant has it; otherwise **Contributor** scoped to the single ACS resource. | |

## What changed

| Path | What |
|---|---|
| `platform/shared/azure/identity.ts` (+ test) | `ManagedIdentityTokenProvider` (see "Token provider" below), `AzureCliTokenProvider` dev fallback (refused when `APP_ENV=prod`), `StaticTokenProvider` for tests, `createTokenProvider` / `defaultTokenProvider`. No dependencies. |
| `platform/db/src/client.ts`, `cli.ts`, `index.ts`, `package.json` | Postgres Entra auth (see "Postgres Entra auth" below). `pg-connection-string` 2.14.1 is pinned as a direct dependency. |
| `platform/worker/src/{config,index,worker,migrate,jobs}.ts` | `DATABASE_AUTH=entra` for the app pool, pg-boss's pool and `worker migrate`. AUTH-15 purge guard: `UNCONSENTED_PURGE=on\|off\|auto`. `auto` skips `account.purge-unconsented` when `CONSENT_PROVIDER=unavailable` (otherwise every student would be deleted 30 days after sign-up). |
| `platform/api/src/config.ts` | New settings (see "API configuration" below). |
| `platform/api/src/providers.ts`, `auth/senders/disabled.ts`, `consent/unavailable.ts` | Providers per method (see "Providers" below). |
| `platform/api/src/auth/senders/email.ts` | Branded OTP email: plain text plus simple HTML in SOYL colours. It shows the code, "expires in N minutes" and "never share this code". It has no images, links, scripts or tracking, and the code is HTML-escaped. |
| `platform/api/src/kv/redis.ts`, `kv/index.ts` | `REDIS_AUTH=entra` (see "Redis Entra auth" below). |
| `platform/api/src/modules/auth.ts`, `errors.ts` | Disabled methods: `method_disabled` gate and `GET /v1/auth/methods` (see "Sign-in methods" below). |
| `platform/api/src/index.ts` | Wires the database and Redis token auth. The start-up log shows `authMethods`, `databaseAuth` and `redisAuth`. |
| `platform/api/openapi.json`, `shared/api-client/schema.gen.ts`, `test/__snapshots__/route-policy.test.ts.snap`, `test/route-policy.test.ts` | Regenerated after the merge with M3. The only new row is `GET /v1/auth/methods` (publicRead). The AUTH-1 list notes that this route is read-only. |
| `platform/api/test/prod-auth.test.ts`, `unit.test.ts`; `worker/test/prod-auth.test.ts`; `db/test/entra-auth.test.ts` | New and updated tests (see "Verification"). |
| `platform/content-pipeline/src/blob.ts` | `defaultAzureCredential()` uses the managed-identity endpoint directly when `IDENTITY_ENDPOINT` is set. This is a three-line branch; the pipeline-engineer owns this file. |
| `platform/infra/docker/{migrate-entrypoint.mjs,bundle-migrate.sh,release-cli.ts,migrate.Dockerfile}` | The migrations image now does everything a database release needs (see "Migrations image" below). |
| `platform/.gitattributes` | `*.sh` and Dockerfiles are kept LF. `az acr build` uploads the Windows working tree as it is, and a CRLF `sh` script breaks the build. The Dockerfile also strips CRs. |
| `platform/infra/modules/communication.bicep` (new) | ACS Email resources (see "ACS Email in Bicep" below). |
| `platform/infra/main.bicep` | New params and env (see "main.bicep" below). |
| `platform/infra/modules/containerApps.bicep`, `storage.bicep` | Release job `caj-soyl-release-<env>` (see "Migrations image" below). `apiExtraEnv` and `blobAccountUrl` params. The migrate job env is shared with the release job. The migrator gets Storage Blob Data Contributor on `content-releases`. |
| `platform/infra/params/prod.bicepparam` | Dark-start sizing; the decisions are in "Production sizing" below. |
| `platform/infra/params/{dev,stg}.bicepparam` | New params (AzureManaged email, `deployAi`/`deployFrontDoor` = true, `mfa-encryption-key`, `EMAIL_PROVIDER=acs`). |
| `docs/platform/runbooks/prod-first-deploy.md` (new) | The ordered az commands, with rights marked per step. |
| `platform/api/README.md` | Environment table updated. |

### Token provider (`platform/shared/azure/identity.ts`)

`ManagedIdentityTokenProvider` works as follows:
- It calls the Container Apps endpoint: `IDENTITY_ENDPOINT` + `X-IDENTITY-HEADER`, `api-version=2019-08-01`, `resource`, and `client_id` from `AZURE_CLIENT_ID`.
- It caches one token per resource until 5 minutes before expiry.
- Concurrent callers share a single request.
- It retries network errors, 404 (identity not attached yet), 408, 429 and 5xx with backoff of 0.5, 1, 2 and 4 seconds, up to 5 attempts.
- It never surfaces the endpoint's response body.

### Postgres Entra auth (`platform/db/src/client.ts`)

- With `DATABASE_AUTH=entra`, `createDb()` gives node-postgres an async `password` function. Every new connection gets a fresh token for `https://ossrdbms-aad.database.windows.net`.
- The URL is parsed into fields, because pg overrides a password function with the URL's empty password. This is a real bug that the test catches.
- Pool connections are recycled every 30 minutes.
- The DATABASE_URL must not contain a password.
- New exports: `pgConnectionConfig`, `pgPasswordFromEnv`, `entraPassword`, `databaseAuthMode`.
- The `db` CLI migrate client uses the same mechanism.

### API configuration (`platform/api/src/config.ts`)

- **`AUTH_METHODS`**: comma list of `email|phone|google`, default all.
  - Google and SMS settings are required only while those methods are enabled.
  - GEN-3 mock refusals apply to enabled methods only. Config now fails first, before the provider factory.
- **Infrastructure auth:** `DATABASE_AUTH`, `REDIS_AUTH`, `REDIS_USERNAME`.
- **Edge secret:** `EDGE_SECRET_CURRENT` and `EDGE_SECRET_PREVIOUS` are accepted as an alternative to `EDGE_SECRETS`, and identical values are de-duplicated. This is the Key Vault form Bicep already used.
- **Email:**
  - `ACS_ENDPOINT` is the new name (`ACS_EMAIL_ENDPOINT` remains as an alias). ACS no longer needs an access key, and a key is **refused in prod**.
  - `EMAIL_FROM` defaults to `SOYL Academy <noreply@soylai.com>`.
- **Consent:**
  - `CONSENT_PROVIDER=unavailable` is a new value.
  - `CONSENT_PROVIDER=mock` is refused in prod by config.

### Providers (`platform/api/src/providers.ts`)

- **Disabled methods** get a non-delivering sender, `DisabledSmsSender` or `DisabledEmailSender`. These are not mocks, so they are allowed in prod.
- **ACS email** uses a bearer token for `https://communication.azure.com` from the managed identity.
- **`UnavailableConsentProvider`** works as follows:
  - It is authoritative and always answers `pending`.
  - `startFlow` returns `{status: 'pending', redirectUrl: null}`.
  - `isMock` is false, so it is allowed in prod.

### Redis Entra auth (`platform/api/src/kv/redis.ts`)

`REDIS_AUTH=entra` works as follows:
- The username is the identity's object id; the password is a token for `https://redis.azure.com`.
- `rediss://` with SNI is required.
- The first command waits for the token.
- Just inside the refresh window, a new token is fetched. It is sent with `AUTH` on the live connection and stored in the client options so reconnects use it.
- A failed refresh is reported and retried every 30 seconds.

### Sign-in methods (`platform/api/src/modules/auth.ts`, `errors.ts`)

- A disabled method's routes (send, verify, link, and Google start/callback) answer **404 `method_disabled`**. The check runs after the edge secret, CSRF and rate limits, and before the body is parsed. Unlink stays available.
- New route **`GET /v1/auth/methods`**: public, `Cache-Control: public, max-age=300, s-maxage=300`. Response: `{methods: ['email'], email: true, phone: false, google: false}`.

### Migrations image (`platform/infra/docker/`)

The image now does everything a database release needs:
- **No args:** bootstrap, then `db migrate up`, then the **pg-boss schema install** (`worker migrate`, DB-1). Before this change nothing installed pg-boss in Azure, so the worker could not start.
- **`release`:** bootstrap, then `db seed catalog`, then **`content publish --authored`** (D-026). This step writes to Postgres and to Blob `content-releases` with the migrator identity.
- **Other args:** `db <args>`.

`release-cli.mjs` bundles the worker CLI and the content CLI with esbuild. The image ships `content/authored` and `content-templates/exemplars`.

The `caj-soyl-release-<env>` Container Apps job runs `migrate-entrypoint.mjs release` with the migrate image (1 vCPU, 2 GiB, 1 h timeout).

### ACS Email in Bicep (`platform/infra/modules/communication.bicep`)

- **Resources:** the Email Communication Service, and the `soylai.com` domain as CustomerManaged with user-engagement tracking **disabled**.
- **Sender:** username `noreply`, display name "SOYL Academy".
- **ACS resource:** `dataLocation: 'India'`, linked to the domain only when `linkDomain` is true. Linking an unverified domain fails.
- **API identity role:** the sender role on the ACS resource.
- **Outputs:** `endpoint`, `senderAddress`, `dnsRecords` (verificationRecords: Domain, SPF, DKIM, DKIM2, DMARC) and `domainVerificationStates`.
- **Dev/stg:** use an AzureManaged domain (sender DoNotReply).

### main.bicep (`platform/infra/main.bicep`)

- **New params:**
  - Flags: `deployAi`, `deployFrontDoor`. These make the `ai`, `frontDoor` and `aiBudget` modules conditional; the related env vars are empty when off.
  - Email: `emailDomainManagement`, `emailDomain`, `emailSenderUsername`, `emailSenderDisplayName`.
  - ACS: `acsDataLocation`, `acsSenderRoleId`, `acsLinkDomain`.
- **API env:** gets `ACS_ENDPOINT` and `EMAIL_FROM` from the ACS module.
- **Postgres TLS:** `sslmode=verify-full`, and `PGSSLMODE=verify-full`. pg already treats `require` as verify-full and warns about it.
- **New outputs:** `acsEndpoint`, `emailDnsRecords`, `emailDomainVerification`, `emailServiceName`, `releaseJobName`.

### Production sizing (`platform/infra/params/prod.bicepparam`)

| Resource | Setting | Why |
|---|---|---|
| Postgres | **Burstable Standard_B2s**, 32 GB, HA Disabled, PITR 14 days, geo-backup Enabled | Geo-backup goes to the South India pair and can only be chosen at creation. |
| Redis | **Balanced_B0**, no HA, no AOF | |
| api | 0.5 vCPU / 1 GiB, 1 to 5 replicas | |
| worker | 0.25 vCPU / 0.5 GiB, **min = max = 1** | Within the 0–1 range: cron jobs need a running worker, and a CPU rule cannot scale from zero. |
| AI | `deployAi=false` | |
| Front Door | `deployFrontDoor=false` | No public assets yet. |
| ACA environment | zone-redundant: on | Free on the Consumption profile, and immutable. |
| Budget | ₹25,000/month | Estimate ₹15–20k. |
| Alerts | on | |

Header comment and runbook §13: "scale to GP + zone-redundant HA before launch". The app settings are in "Environment variables" below.

## Key Vault secrets (names only; the runbook generates the values with Node `crypto.randomBytes`)

| Secret | Env var | Format |
|---|---|---|
| `edge-secret-current` | `EDGE_SECRET_CURRENT` | 48 bytes base64url |
| `edge-secret-previous` | `EDGE_SECRET_PREVIOUS` | starts equal to current |
| `otp-pepper` | `OTP_PEPPER` | 48 bytes base64url |
| `auth-secret` | `AUTH_SECRET` | 48 bytes base64url |
| `mfa-encryption-key` | `MFA_ENCRYPTION_KEY` | 32 bytes base64 (**new**; the API would not start without it) |

## Environment variables (production API; the worker gets the same common set)

| Group | Variables |
|---|---|
| Bicep, common | `APP_ENV=prod`, `NODE_ENV=production`, `DATABASE_AUTH=entra`, `PGHOST`/`PGPORT`/`PGDATABASE`, `PGSSLMODE=verify-full`, `REDIS_URL=rediss://<amr>:10000`, `REDIS_AUTH=entra`, `BLOB_ACCOUNT_URL`, `CDN_BASE_URL` (empty), `AZURE_KEY_VAULT_URL`, `APPLICATIONINSIGHTS_*`, `AZURE_OPENAI_*`/`AZURE_SPEECH_*`/`AZURE_CONTENT_SAFETY_ENDPOINT` (empty while `deployAi=false`) |
| App settings (params) | `PLATFORM_ENABLED=false`, `BILLING_ENABLED=false`, `PUBLIC_BASE_URL=https://www.soylai.com`, `WEB_ORIGIN`, `AUTH_METHODS=email`, `EMAIL_PROVIDER=acs`, `CONSENT_PROVIDER=unavailable`, `UNCONSENTED_PURGE=auto`, `AI_DAILY_SPEND_CAP_INR=0`, `CONTENT_BUDGET_INR=0`, `LOG_LEVEL=info` |
| Per app | `PORT=8080`, `AZURE_CLIENT_ID` (user-assigned MI), `PGUSER`, `DATABASE_URL=postgresql://id-soyl-<app>-prod@<host>:5432/soyl?sslmode=verify-full` (no password), `REDIS_USERNAME=<MI object id>` |
| api only | `ACS_ENDPOINT` (from the ACS resource), `EMAIL_FROM=noreply@soylai.com`, plus the five Key Vault secret refs |

## For web-platform (do not change app/ or components/ in this task)

- `GET /api/platform/v1/auth/methods` returns `{ methods: ('email'|'phone'|'google')[], email, phone, google }`. The login sheet should show only the enabled methods. Production: email only. The typed client is regenerated in `shared/api-client/schema.gen.ts` as `AuthMethods`.
- Disabled methods answer 404 problem `method_disabled` ("This sign-in method is not available.").
- Consent is `pending` for everyone in production until OA-08. Consent-gated UI (AI, leaderboards, rank cards, school) gets 403 `consent_required` and should show the parent-consent message. `POST /v1/me/consent/start` returns `{status:'pending', redirectUrl:null}`, so the UI must not offer a consent link.
- Vercel, when lit (OA-09): `PLATFORM_API_ORIGIN=https://<apiFqdn>` and `PLATFORM_EDGE_SECRET` = the `edge-secret-current` value.

## Verification

All output below is real. It was taken on Windows 11 / Node 24 on the merged branch (`071fe09` + docs), using embedded Postgres and the in-memory KV.

From `platform/`:

```
npm run typecheck   -> TYPECHECK_EXIT=0   (api, content-pipeline, db, e2e, shared, worker)
npm run lint        -> LINT_EXIT=0
npm test -w @soyl/api -w @soyl/worker -w @soyl/db -w @soyl/shared
> @soyl/api@0.0.0 test      Test Files  20 passed (20)   Tests  335 passed | 1 skipped (336)
> @soyl/worker@0.0.0 test   Test Files  8 passed (8)     Tests  51 passed (51)
> @soyl/db@0.0.0 test       Test Files  14 passed (14)   Tests  109 passed | 1 skipped (110)
> @soyl/shared@0.0.0 test   Test Files  6 passed (6)     Tests  76 passed (76)
TEST_EXIT=0
```

The new tests:

| Test file | Count | What it covers |
|---|---|---|
| `shared/azure/identity.test.ts` | 10 | Request shape (api-version, resource, client_id, header); cache plus the 5-minute refresh; single-flight; retry and backoff on network, 404, 429 and 503; no retry on 400, and the response body is not leaked; prod refuses the CLI fallback. |
| `db/test/entra-auth.test.ts` | 5 | Embedded Postgres with password auth enforced (`password auth enforced by this server: true`). A LOGIN role stands in for the managed identity, and rotating its password emulates token expiry. |
| `worker/test/prod-auth.test.ts` | 4 | pg-boss options with the token function; the purge guard. |
| `api/test/prod-auth.test.ts` | 21 | See below. |

`db/test/entra-auth.test.ts` proves four things:
1. Tokens have the postgres audience.
2. A held connection survives a token rotation.
3. A new connection fetches a new token inside the refresh window.
4. A wrong token is refused, and the URL parsing keeps the password function.

`api/test/prod-auth.test.ts` covers:
- the production config loads with email only and no Google or SMS settings;
- edge current and previous secrets are de-duplicated;
- GEN-3 applies only to enabled methods;
- ACS sends with the bearer token for `communication.azure.com` (fake fetch), and phone is disabled;
- the OTP email has text and HTML, with no links or images, and escapes the code;
- Redis Entra auth: username and password, re-AUTH before expiry, retry after a failed refresh, fail-closed and recovery when the first token fails (ioredis-mock, fake timers);
- the app with `AUTH_METHODS=email` + `CONSENT_PROVIDER=unavailable`:
  - `/v1/auth/methods`;
  - 404 `method_disabled` on phone, Google and link-phone (even with an invalid body), after the edge, Origin and CSRF checks;
  - email sign-in works, consent stays `pending`, and `consent/start` stays pending;
  - AI-like and leaderboard routes, and PATCH `schoolId`, return 403 `consent_required` ("A parent or guardian needs to give consent first.");
  - a `test_attempts` route returns 200.

Bicep (Bicep 0.48.1):

```
node platform/infra/validate.mjs --strict   (BICEP_BIN=C:/Users/Prabhu/soyl-wt/_tools/bicep.exe)
| build | main.bicep | 0 | 0 |
| lint | main.bicep | 0 | 0 |
| build | shared.bicep | 0 | 0 |
| lint | shared.bicep | 0 | 0 |
| build-params | params/dev.bicepparam | 0 | 0 |
| build-params | params/prod.bicepparam | 0 | 0 |
| build-params | params/shared.bicepparam | 0 | 0 |
| build-params | params/stg.bicepparam | 0 | 0 |
Total: 0 error(s), 0 warning(s) (strict: warnings fail)
```

Migrations image, without Docker. The bundles from `sh infra/docker/bundle-migrate.sh <out>` ran against a fresh embedded database through `migrate-entrypoint.mjs`:

```
running: db migrate up                      -> 8 migration(s) applied
running: release pgboss-migrate             -> pg-boss schema ready {schemaVersion: 46, granted: true, role: soyl_app}
== step "default" exit 0 in 5s
running: db seed catalog                    -> "errors": []
running: release content publish --authored -> publish: 41 published, 0 unchanged, 0 refused/failed
== step "release" exit 0 in 94s
```

Root marketing files: `git diff --stat origin/platform/main -- app components content lib public package.json package-lock.json next.config.ts vercel.json` is empty.

## Risks / open items

1. **Not run against Azure.**
   - These are offline-validated only: ACS `dataLocation: 'India'` (both resources), the sender role, Burstable with geo-backup, Key Vault references through a closed vault firewall (`bypass: None`), and the AMR B0 SKU in Central India.
   - The runbook's "Known first-deploy risks" gives the fallback for each.
2. **ACS sender role.**
   - Docs name the built-in **Communication and Email Service Owner** role, but no source gave its GUID. The runbook looks it up (`az role definition list --name ...`) and passes it as `SOYL_ACS_SENDER_ROLE_ID`.
   - The fallback is **Contributor** on the single ACS resource. That is broader: it includes listKeys.
3. **Email cannot be sent until the owner adds the DNS records** and the domain is verified and linked (runbook §9, `SOYL_ACS_LINK_DOMAIN=true`).
4. **AUTH-15 vs no consent system.** The purge is OFF in prod (`UNCONSENTED_PURGE=auto` with `CONSENT_PROVIDER=unavailable`). Before launch the owner must choose:
   - keep unconsented student accounts, which D-014 allows for learning; or
   - delete them after 30 days, which would wipe every student.

   This needs counsel (OA-14).
5. **Staff and admin sign-in is impossible** while Google is off. AUTH-11 requires Google plus TOTP. This is fine while dark; OA-05 is needed before staff tooling is used.
6. **Merge-conflict surface.** Expect conflicts in `openapi.json`, `schema.gen.ts`, the route-policy snapshot and `worker/src/jobs.ts` if more API routes land before this branch merges. Regenerate with `npm run openapi -w @soyl/api`, `npm run generate:api-client -w @soyl/shared`, and `vitest -u` on the snapshot after review.
7. **The `deploy-env.sh` / `platform-deploy.yml` CI path** does not know about the release job yet. It still runs only the migrations job, which now also installs pg-boss. Add `az containerapp job start ... caj-soyl-release-<env>` when CI deploys are enabled (OA-01).
8. **The content pipeline's `blob.ts`** belongs to the pipeline-engineer. The change is an additive branch.
