# infra-azure — M1 foundations (CI + deploy-ready IaC) — 2026-10-26

Status: **partial, by design.** Scope was cut by D-025: a later deployment agent takes over Bicep, deploys, costs and runbooks. CI and CodeQL are done and green. The IaC below validates offline but has never been deployed (no Azure credentials, OA-01).
Branch: `platform/infra-azure/m1` (origin/platform/main merged in at 0ef9daa: `@soyl/db`, pipeline M1 and the db-schema CI fix all run in CI).

## What changed

### CI (priority, done)
- **`.github/workflows/platform-ci.yml`** runs on PRs and on pushes to `platform/**`.
  - Top-level `permissions: contents: read`.
  - Every action is pinned by commit SHA. gitleaks, trivy and bicep are checksum-verified downloads. Checkov and the service-container images are pinned by digest.
  - Superseded runs are cancelled.
- Jobs:
  - **platform**: in `platform/`, `npm ci`, then `typecheck`, `lint`, `test` and `build`. Runs against service containers `pgvector/pgvector:pg17` (user and password `postgres`, superuser, TZ=UTC) and `redis:7`, with `DATABASE_URL`, `TEST_DATABASE_URL` and `REDIS_URL` set (D-008). The `@soyl/db` harness uses `TEST_DATABASE_URL`.
  - **web**: root `npm ci`, `npm run lint`, `npm run build`.
  - **marketing**: `npm run marketing:diff -w @soyl/e2e` in differential mode (REPO_MAP 9.5), with `fetch-depth: 0` and origin/main. The report is uploaded on failure.
  - **security · gitleaks** (INFRA-14): scans the diff on PRs, the merge-base diff on `platform/**` pushes, and full history on `platform/main`.
  - **security · npm audit, trivy fs, public env names**:
    - The `platform/` audit blocks.
    - The root audit is **report-only** (warning annotation) until OA-11 and OA-12 land.
    - `trivy fs` runs on platform/ for HIGH/CRITICAL vulnerabilities, secrets and Dockerfile misconfig.
    - The WEB-11 grep fails on any secret-like `NEXT_PUBLIC_` name.
  - **infra**:
    - `node platform/infra/validate.mjs --strict` runs bicep build, lint and build-params with zero warnings allowed, plus the INFRA-9 location check and the GEN-1 credential-value check.
    - Checkov (bicep) is **report-only**. Findings appear as annotations, and the step is marked failed if nothing was scanned. The deployment agent triages the findings and then makes it blocking.
  - **images** (api, worker, migrate): `docker build` runs once the service's `package.json` exists, followed by a non-root check (INFRA-10), `trivy image` failing on HIGH/CRITICAL (INFRA-15), and a CycloneDX SBOM artifact (INFRA-18). The migrate image builds now that `platform/db` exists; api and worker are skipped with a notice until those packages land.
- **`.github/workflows/platform-codeql.yml`**: `javascript-typescript`, `security-extended`, build-mode none, on platform paths (INFRA-16).
- **`.github/dependabot.yml`**: platform npm, actions and Dockerfile digests, targeting `platform/main` (INFRA-17). It only takes effect once it is on `main` (OA-10).

### Deploy (hand-over; never run)
- **`.github/workflows/platform-deploy.yml`** is a **no-op unless `vars.AZURE_DEPLOY_ENABLED == 'true'`**.
  - Only the `gate` job runs: it prints "deploy skipped: OA-01" and succeeds.
  - Every other job also checks the variable directly.
  - When enabled:
    - A push to `platform/main` deploys staging: shared registry, then build, scan and push, then Bicep, the migrations job, rolling the apps, and a `/healthz` + `/readyz` smoke test.
    - `workflow_dispatch target=dev` deploys dev.
    - `target=prod` runs a what-if, then a deploy. Both jobs run in the `production` GitHub Environment, so each needs reviewer approval.
  - OIDC uses two app registrations:
    - non-prod: subject `ref:refs/heads/platform/main`, repo secrets.
    - prod: subject `environment:production`, environment secret `AZURE_PROD_CLIENT_ID`.
- **`platform/infra/scripts/deploy-env.sh`**: the deploy logic, usable by an operator too. It keeps current app images during the Bicep run, migrates first, then rolls the apps (expand/contract).

### IaC (hand-over; validated offline only)
- **`platform/infra/main.bicep`** (resource-group scope, one per env) and `modules/`.
  - **Monitoring**: Log Analytics with 180-day retention and local auth off; App Insights keyless; action group.
  - **Identities**: managed identities `id-soyl-{api,worker,migrator,frontdoor}-<env>`.
  - **Network**: VNet with an ACA subnet and a private-endpoint subnet, NSGs, and 6 private DNS zones. Private endpoints for Postgres, Redis, Blob, Key Vault, AOAI, Speech and Content Safety.
  - **Key Vault**: RBAC mode, purge protection, public access disabled (IP allow-list param).
  - **Storage**:
    - No public blob access and no shared key.
    - Containers: `uploads-quarantine`, `uploads`, `content-releases`, `public-assets`.
    - Lifecycle rule deletes uploads after 30 days.
    - CORS for direct user-delegation-SAS uploads (D-018).
  - **PostgreSQL 17**: Entra-only auth; private; `azure.extensions` includes VECTOR; timezone UTC; HA and PITR are params; the migrator identity is the Entra admin.
  - **Azure Managed Redis**: private, TLS, access keys disabled, `NoEviction`, access-policy assignments for api and worker.
  - **AI**:
    - AOAI, Speech and Content Safety have `disableLocalAuth`.
    - Model deployments for tiers `small`, `mid`, `verify` are regional `Standard`; `batch` is `GlobalBatch`.
    - Model names are the placeholder defaults (`gpt-6-luna`, `gpt-6.1-sol`, `gpt-6-astra`). `aoaiDeployModels=false` until OA-02.
  - **Front Door Standard**: managed-identity origin auth, Blob Data Reader on `public-assets` only, `originPath /public-assets`.
  - **Container Apps**:
    - Workload-profile environment, Consumption profile only, VNet-integrated.
    - `api`: external ingress, HTTPS only, probes on `/healthz` and `/readyz`.
    - `worker`: no ingress.
    - `caj-soyl-migrate-<env>`: manual migrations job.
    - Images are pulled with AcrPull on the managed identity. A pinned placeholder image is used while services do not exist.
  - **Alerts** (ARCH 14 + INFRA-12): 10 log alerts plus 2 Postgres metric alerts.
  - **Budgets**: 50/80/100% actual and 100% forecast, per resource group, plus a separate AOAI budget.
- **`platform/infra/shared.bicep`**: the shared ACR (Standard, admin user off) in **`rg-soyl-platform-shared`**. This is a 4th resource group that OA-01 must add.
- **Params**: `params/{dev,stg,prod,shared}.bicepparam`. They contain no secrets. Images, e-mail and object ids come from `SOYL_*` environment variables.
- **Images**:
  - `platform/api/Dockerfile`, `platform/worker/Dockerfile`: `node:24-trixie-slim` build stage, `distroless/nodejs24-debian13:nonroot` runtime, both pinned by digest; D-022 contract.
  - `platform/infra/docker/migrate.Dockerfile` + `bundle-migrate.sh` + `migrate-entrypoint.mjs`: the @soyl/db CLI is an esbuild bundle, so the image ships no node_modules. The entrypoint gets an Entra token from the managed identity, idempotently bootstraps the DB-1 roles from `platform/db/README.md`, then runs `migrate up`. db-schema confirmed it is compatible with `@soyl/db`.
  - `platform/.dockerignore`.
- **`platform/docker-compose.yml`**: pgvector pg17, redis 7 and azurite, all digest-pinned and bound to 127.0.0.1, for people who have Docker. This machine uses the D-008 stand-ins instead.

## How to verify
```
node platform/infra/validate.mjs --strict      # BICEP_BIN=<path to bicep 0.48.1>
```
Real output (2026-10-26, Bicep 0.48.1):
```
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
`git diff --stat origin/platform/main -- app components content lib public package.json package-lock.json next.config.ts` is empty. gitleaks 8.30.1 on full history and on the working tree: no leaks found.

CI on GitHub: see "CI evidence" below.

## CI evidence
**platform-ci, run [40270341324](https://github.com/SOYL-AI/soyl-academy-web/actions/runs/40270341324), commit 6dc609b: success.** This commit includes origin/platform/main with @soyl/db, the db-schema CI fix, and pipeline M1 (@soyl/ai-core, @soyl/content-pipeline).

| Job | Conclusion | Notes |
|---|---|---|
| platform · typecheck, lint, test, build | success | Every workspace ran against the pgvector pg17 + redis 7 service containers, including the @soyl/db pgvector test, which only runs in CI. |
| web · lint, build | success | |
| marketing · differential regression vs main | success | Zero visual diffs against the merge-base with origin/main. |
| security · gitleaks | success | |
| security · npm audit, trivy fs, public env names | success | The platform audit is blocking and clean. The root audit is report-only: its warning annotation flags known advisories pending OA-11 and OA-12. trivy fs and WEB-11 are clean. |
| infra · bicep validate, checkov | success | validate.mjs --strict reports 0 errors and 0 warnings. Checkov is report-only and inconclusive: it found 40 resources, 4 passed, 0 failed, and 9 **parsing errors**. Its bicep parser cannot read lambdas or safe-access syntax, so an IaC scan of the compiled ARM JSON (or PSRule) is still needed. |
| images · migrate | success | The image was built, runs as non-root, and trivy found 0 fixable HIGH/CRITICAL. A CycloneDX SBOM artifact was uploaded. |
| images · api / worker | success (skipped) | Notice: the service package does not exist yet. The image builds automatically once it does. |

**platform-codeql, run [40270341224](https://github.com/SOYL-AI/soyl-academy-web/actions/runs/40270341224): success.**

**platform-deploy** has never run. It triggers only on pushes to platform/main, and even then only the gate job runs until vars.AZURE_DEPLOY_ENABLED is true.

Earlier runs on this branch, and how each failure was fixed:
- 40269479132: the catalog-seed test needed platform/db/.data. db-schema fixed it in 12922e3, now merged.
- 40270020821: the migrate image failed trivy because the Debian 12 libssl3 had fixable HIGH/CRITICAL CVEs. Fixed by moving the images to trixie / distroless debian13. The first attempt shipped dev tooling; the image is now an esbuild bundle with no node_modules.

## Known gaps / follow-ups (for the deployment agent)
1. **Nothing has been deployed.** API versions and properties come from Bicep 0.48.1 type definitions. The first real deploy may still surface RP-side validation errors. The likeliest: Front Door managed-identity origin auth on the Standard tier, Redis access-policy assignment names, and the Postgres Entra-only create with no administrator login.
2. **Checkov is report-only and inconclusive.** It reported 9 parsing errors because its bicep parser cannot read lambdas or `.?`. Scan the compiled ARM JSON (`bicep build`) with Checkov `--framework arm`, or use PSRule for Azure. Then triage the results, add justified skips to `platform/infra/.checkov.yaml`, and remove `continue-on-error`.
3. **Not written (descoped by D-025)**:
   - ADR-008: AOAI deployment type and processing geography (F-014).
   - ADRs for ACR placement, Redis tier and Front Door.
   - COSTS.md.
   - Runbooks: deploy-rollback, azure-bootstrap, secret-rotation, incident-sla (INFRA-19).
   - `platform/infra/README.md`.

   Decisions already encoded in code, for those documents:
   - Interactive AI tiers use **regional Standard** deployments in centralindia, so processing stays in India. Content generation uses **GlobalBatch** and must never receive personal data.
   - `aiLocation` is restricted to Indian regions.
   - The ACR is in `rg-soyl-platform-shared`, so images are built once and promoted by digest.
   - Storage keeps public network access **enabled but authenticated-only**. Browser SAS uploads (D-018) and Front Door Standard (no Private Link) need it.
   - Budget split: dev ₹18,000 + stg ₹29,000 + shared ₹3,000 = ₹50,000/month.
   - Stg Postgres is Burstable B2s rather than General Purpose. GP D2ds_v5 costs ₹17.6k/month in Central India (retail API, 2026-10-26) and would break the ₹50k budget. Scale it up for load tests. This deviates from ARCHITECTURE §13 ("General Purpose small").
4. **Worker scaling:**
   - Current: min/max replicas plus a CPU rule. Dev also has an IST working-hours cron window.
   - Missing: queue-depth scaling (ARCH §13). It needs a KEDA PostgreSQL scaler with managed identity, or a worker-emitted metric.
5. **App configuration contract.** Bicep sets these env vars, and backend-api / ai-gateway must honour them:
   - Core: `APP_ENV`, `PORT=8080`, `AZURE_CLIENT_ID` (managed identity), `AZURE_KEY_VAULT_URL`, `CDN_BASE_URL`, `BLOB_ACCOUNT_URL`.
   - Database: `DATABASE_URL` has no password. Set `PGPASSWORD`, or use a token callback, with an Entra token for `https://ossrdbms-aad.database.windows.net`. `DATABASE_AUTH=entra`.
   - Redis: `REDIS_URL=rediss://…:10000` with `REDIS_AUTH=entra`, `REDIS_USERNAME` = managed-identity object id, and the Entra token as password. Clustering policy is EnterpriseCluster, so multi-key Lua needs one hash tag.
   - Telemetry: `APPLICATIONINSIGHTS_CONNECTION_STRING` with **keyless ingestion**. The exporter must use the managed-identity credential.
   - AI: `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_DEPLOYMENT_{SMALL,MID,VERIFY,BATCH}`. `AZURE_SPEECH_{REGION,ENDPOINT,RESOURCE_ID}` (Entra auth). `AZURE_CONTENT_SAFETY_ENDPOINT`.
   - Key Vault secrets exposed as env vars: `EDGE_SECRET_CURRENT`, `EDGE_SECRET_PREVIOUS`, `OTP_PEPPER`, `AUTH_SECRET`.
   - Alerts query these telemetry names, so the app must emit them: log attribute `event` = `otp_sent`, `otp_verify_failed`, `edge_auth_failed`, `webhook_signature_failed`; customEvent `ai.spend.threshold` {percent}; metric `queue.depth`. App role names are `soyl-api` / `soyl-worker`.
6. CodeQL's weekly schedule and Dependabot only run once the files are on `main` (OA-10).

## Decisions made
- No ADRs written (descoped). The in-code decisions are listed in follow-up 3.
- `.github/dependabot.yml` is outside the listed owned paths. It was added because INFRA-17 requires it. It is a new file, and only platform ecosystems are listed.

## Needs from owner (for OWNER_ACTIONS.md)
- **OA-01 (amended)**:
  - Create **4** resource groups in Central India: dev, stg, prod and `rg-soyl-platform-shared`.
  - Create **two** OIDC app registrations, non-prod and prod. Contributor alone is not enough: Bicep creates role assignments, so each identity also needs **Role Based Access Control Administrator** (condition-limited to the roles used) on its resource groups. The non-prod identity also needs AcrPush on the shared ACR; the prod identity needs AcrPull on it.
  - Set repo secrets `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`, and the environment secret `AZURE_PROD_CLIENT_ID` in a `production` GitHub Environment with required reviewers.
  - Set repo variables `AZURE_DEPLOY_ENABLED=true`, `SOYL_ACR_NAME`, `SOYL_ALERT_EMAIL` and `SOYL_STG_WEB_ORIGIN`. For the very first deploy only, set `SOYL_KV_SECRET_REFS=false`.
  - Seed the Key Vault secrets `edge-secret-current`, `edge-secret-previous`, `otp-pepper` and `auth-secret`.
- **OA-02**: confirm model names and versions, regional Standard availability in Central India, and Batch quota. Then set `SOYL_AOAI_DEPLOY_MODELS=true`.
- **OA-10**: until `platform/main` reaches `main`, Dependabot and the CodeQL schedule stay inactive.
