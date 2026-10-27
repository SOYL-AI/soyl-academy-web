# Operations: environments, deploys, CI, monitoring, costs, rollback

> As built: 2026-10-28, from `platform/main` @ 2d76ef0 and the deployment evidence in [STATUS.md](STATUS.md). Infrastructure code: `platform/infra/` (Bicep). Workflows: `.github/workflows/platform-*.yml`.
> Decisions: D-025 (deployment deferred), D-029 (Lead may merge, incl. `main`), D-030 (no Vercel builds for `platform/**`), D-031 (production backend deployed dark), D-033 (two models). Runbooks: [runbooks/](#runbooks).

## 1. What runs where

| Piece | Host | State on 2026-10-28 |
|---|---|---|
| Marketing site (www.soylai.com) | Vercel, production branch `main` | **Live.** `main` @ a2c76a5 (editorial redesign, owner-requested) on Next.js 16.4.3. The homepage serves the redesign; `/learn` returns 404. |
| Platform web pages (`app/(platform)/**`) | Vercel, same Next.js app | **Not deployed.** They exist only on `platform/main`, which has not been merged into `main` (OA-10). Even after the merge they stay dark until `NEXT_PUBLIC_PLATFORM_ENABLED`/`PLATFORM_ENABLED` are set. |
| API, worker, database, Redis, Blob, email | Azure, Central India, resource group `rg-soyl-platform-prod` | **Deployed dark** on 2026-10-27 (D-031). `/healthz` ok, `/readyz` ready; every `/v1` route answers 404 (`PLATFORM_ENABLED=false`). |
| Container registry | Azure, `rg-soyl-platform-shared` | `crsoylplatform` (Standard, admin user off) |
| Staging, dev | — | **Not created.** Bicep params exist (`params/{dev,stg}.bicepparam`); OA-01 for CI-driven deploys is still open. |
| AI (Azure OpenAI, Speech, Content Safety), Front Door | — | **Not deployed** (`deployAi=false`, `deployFrontDoor=false` in prod). |

## 2. Production (dark) in Azure

How it was deployed: by the Lead from a workstation with a portable Azure CLI and Bicep 0.48.1, signed in by the owner via device code, following [runbooks/prod-first-deploy.md](runbooks/prod-first-deploy.md). Bicep passes p1 (77 resources, placeholder images), p2–p2d (migrate image + Key Vault references), p3 (api/worker images), p4 (`soylai.com` linked to ACS after DNS verification), p5 (Key Vault public access disabled). No GitHub Actions deploy has run (`platform-deploy.yml` is a guarded no-op until OA-01).

Images were built in Azure with `az acr build` from commit `0dee08c` (api, worker); the migrate image was rebuilt from `9f5926e` (hotfix: bootstrap grants CREATE on the database to `soyl_migrator` for pg-boss). Three Azure-specific fixes were needed on first deploy: `SET ROLE NONE` in the bootstrap, create `vector` only when missing, CREATE on the database for pg-boss.

| Resource | Name (prod) | Setting (dark start) |
|---|---|---|
| Resource groups | `rg-soyl-platform-prod`, `rg-soyl-platform-shared` | centralindia |
| Container Apps environment | `cae-soyl-prod` | Consumption profile, VNet-integrated, zone-redundant |
| API app | `ca-soyl-api-prod` | 0.5 vCPU / 1 GiB, 1–5 replicas, external HTTPS ingress, probes `/healthz` `/readyz` |
| Worker app | `ca-soyl-worker-prod` | 0.25 vCPU / 0.5 GiB, exactly 1 replica, no ingress |
| Migrations job | `caj-soyl-migrate-prod` | No args: Entra bootstrap → `db migrate up` → pg-boss schema |
| Release job | `caj-soyl-release-prod` | `release`: bootstrap → `db seed catalog` → `content publish --authored` (1 vCPU, 2 GiB, 1 h timeout) |
| Managed identities | `id-soyl-api-prod`, `id-soyl-worker-prod`, `id-soyl-migrator-prod` (+ `id-soyl-frontdoor-prod` when Front Door is on) | AcrPull on the shared registry; Key Vault, Blob, Redis, ACS roles |
| PostgreSQL Flexible Server 17 | `psql-soyl-prod-<suffix>`, database `soyl` | **Burstable Standard_B2s**, 32 GB, HA off, PITR 14 days, geo-backup to South India; **Entra-only auth**, private endpoint, `sslmode=verify-full` |
| Azure Managed Redis | `redis-soyl-prod-<suffix>` | **Balanced_B0**, no HA, no AOF; **Entra-only** (access keys disabled), TLS port 10000 |
| Storage | `stsoylprod<suffix>` | ZRS; containers `uploads-quarantine`, `uploads`, `content-releases`, `public-assets`; no shared key, no public blob access |
| Key Vault | `kv-soyl-prod-<suffix>` | RBAC mode, purge protection, **public network access disabled** (pass 5). Secrets: `edge-secret-current`, `edge-secret-previous`, `otp-pepper`, `auth-secret`, `mfa-encryption-key` (values never displayed) |
| Communication Services | `acs-soyl-prod-<suffix>`, `ecs-soyl-prod-<suffix>` | Email from `noreply@soylai.com`, data location India, user-engagement tracking off |
| Monitoring | `log-soyl-prod`, `appi-soyl-prod`, `ag-soyl-prod` | Log Analytics 180 days; App Insights keyless; action group → owner email |
| Network | `vnet-soyl-prod`, `nsg-soyl-aca-prod`, `nsg-soyl-pe-prod` | Private endpoints for Postgres, Redis, Blob, Key Vault |
| Budget | `budget-soyl-platform-prod` | ₹25,000/month (estimate ₹15–20k) |

What production does today: migrations 0000–0007 applied; catalog seeded; **41 chapters published** (82 chapter tests, no frozen series); sign-in method email only (`AUTH_METHODS=email`); consent `unavailable` (everyone `pending`, so AI, leaderboards and purchases are off even when lit); `UNCONSENTED_PURGE=auto` (off); `AI_DAILY_SPEND_CAP_INR=0`, `CONTENT_BUDGET_INR=0`. Production is behind `platform/main` (no AI gateway, billing, M3 web or the last 58 chapters); see [update-dark-backend](runbooks/update-dark-backend.md).

**Keyless by design.** No connection string holds a password. API, worker and jobs get Entra tokens from the Container Apps managed-identity endpoint (`IDENTITY_ENDPOINT` + `X-IDENTITY-HEADER`) through `platform/shared/azure/identity.ts` (no `@azure/identity` dependency): Postgres (`DATABASE_AUTH=entra`), Redis (`REDIS_AUTH=entra`), ACS email, Blob. See the [prod-readiness handoff](handoffs/2026-10-27-prod-readiness.md).

**Edge secret.** `/v1/*` requires the `x-soyl-edge-auth` header. Only the Vercel proxy route adds it (`PLATFORM_EDGE_SECRET`, server-only), so direct calls to the Container Apps hostname are refused (D-016, ADR-005). Two secrets are valid at once for rotation.

**Email (OA-17, done 2026-10-27).** `soylai.com` is verified (Domain, SPF, DKIM, DKIM2) and linked to ACS; a test email from `noreply@soylai.com` to the owner inbox succeeded. SPF ends in `-all`. The full OTP flow is tested when the platform is lit.

### Before launch (scale-up)

From [prod-first-deploy §13](runbooks/prod-first-deploy.md#13-scale-up-before-launch-owner-go-ahead): Postgres General Purpose (D2ds_v5 or larger) with zone-redundant HA; Redis Balanced_B1+ with HA (AOF once credits use Redis); API min 2 replicas / 1 vCPU; `deployFrontDoor=true` when audio/diagram assets exist; `deployAi=true` after OA-02; Vercel env `PLATFORM_API_ORIGIN`, `PLATFORM_EDGE_SECRET`, flags (OA-09); consent adapter (OA-08); AUTH-15 decision (OA-14); Google for staff sign-in (OA-05). Plus the security "must-fix before launch" list (S6-H01, S6-M01..M04).

## 3. Vercel (marketing site and, later, platform pages)

| Topic | As built |
|---|---|
| Project | Vercel project `soyl-academy-web`, Git integration with `SOYL-AI/soyl-academy-web`; production branch `main`; canonical domain `www.soylai.com` (SOYL does not own `soylacademy.com`). Build settings live in the Vercel dashboard. |
| `vercel.json` | Only `{"git": {"deploymentEnabled": {"platform/**": false}}}` (D-030): agent pushes to `platform/**` never build. Other branches and `main` still deploy. |
| Hobby plan limits seen | (1) Build quota: platform-branch previews exhausted it on 2026-10-26, and the production deploy of the Next.js hotfix was refused ("Deployment rate limited — retry in 24 hours"); the live site kept serving the previous deployment. (2) A CLI deploy carrying git metadata was blocked because the commit author email was not linked to the Vercel account. |
| Workaround used | Deploy a clean `git archive` of the exact `main` commit with the Vercel CLI as the account owner (owner-approved): OA-11 hotfix `cd33ca7` → deployment `soyl-academy-izudgre7e`, aliased to www.soylai.com. Steps: [runbooks/deploy-marketing-site.md](runbooks/deploy-marketing-site.md). |
| Platform env vars (when lit, OA-09) | Server: `PLATFORM_API_ORIGIN=https://<ca-soyl-api-prod FQDN>`, `PLATFORM_EDGE_SECRET` (= Key Vault `edge-secret-current`), `PLATFORM_UPLOAD_ORIGIN` (Blob) once uploads run. Public: `NEXT_PUBLIC_PLATFORM_ENABLED`, optional `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_CDN_BASE_URL`. Flags stay unset (off) in production until launch. |
| Marketing protection | Platform code ships in the same build but is inert with the flag off: the platform layout calls `notFound()` and flag-off marketing HTML/CSS is byte-identical to the base (checked by `flag-off-html.mjs` and the CI differential regression). |

Merging `platform/main` into `main` (OA-10) is allowed under D-029 once platform CI is green, the marketing regression shows zero diffs and flag-off HTML is byte-identical, with the flags unset in Vercel production. Because `main` now carries the editorial redesign, `platform/main` must first merge `main`, and the committed Windows marketing baseline needs an owner-approved re-capture (`npm run marketing:baseline -w @soyl/e2e`).

## 4. CI (GitHub Actions)

`platform-ci.yml` runs on pull requests and on pushes to `platform/**`. It never deploys and never touches `main`. Every action is pinned by SHA; tool downloads are checksum-verified.

| Job | What it runs | What a green result means |
|---|---|---|
| `platform · typecheck, lint, test, build` | In `platform/`: `npm ci`, `typecheck`, `lint`, `test`, `build` against service containers `pgvector/pgvector:pg17` and `redis:7` | All platform packages compile; every unit and integration test passes on **real Postgres with pgvector and real Redis** (the D-008 evidence for "real Postgres/Redis" gates) |
| `web · lint, build` | Root `npm ci`, `npm run lint`, `npm run build` | The marketing app plus `app/(platform)` builds |
| `marketing · differential regression vs main` | `npm run marketing:diff -w @soyl/e2e`: builds the merge-base with `main` and HEAD, compares every marketing page pixel by pixel and checks route status | The branch renders the marketing site identically to its merge-base |
| `security · gitleaks` | Diff scan on PRs and pushes; HEAD history on `platform/main` | No secrets committed (allowlist only for test-id patterns and reviewed placeholders) |
| `security · npm audit, trivy fs, public env names` | `platform/` audit (blocking), root audit (report-only until OA-12), Trivy fs, WEB-11 grep for secret-like `NEXT_PUBLIC_*` | No known high/critical in platform dependencies; no secret exposed to the browser |
| `infra · bicep validate, checkov` | `node platform/infra/validate.mjs --strict` (build, lint, build-params, zero warnings, location and credential checks); Checkov report-only | Bicep compiles cleanly for every environment |
| `images · build, trivy, SBOM` | Docker build of api, worker, migrate; non-root check; Trivy image (fails on HIGH/CRITICAL); CycloneDX SBOM artifact | Images are deployable and scanned |

Also: `platform-codeql.yml` (CodeQL `security-extended` on platform paths) and `platform-deploy.yml` (guarded: only a `gate` job runs until `vars.AZURE_DEPLOY_ENABLED == 'true'`; when enabled, a push to `platform/main` deploys staging and `workflow_dispatch target=prod` runs what-if then deploy, each behind the `production` environment's reviewers). Dependabot and the CodeQL schedule take effect only once the files are on `main` (OA-10).

Process: after every integration the Lead checks the `platform-ci` run for the new `platform/main` head before the next merge. Recent runs are listed in [STATUS.md](STATUS.md#ci-evidence-github-actions-real-postgrespgvector--redis).

## 5. Releasing content

Content reaches production only through the **release job** (`caj-soyl-release-prod`), which runs from the **migrate image**. The image bundles `platform/catalog`, `platform/content/authored` (incl. frozen series) and the exemplars at the commit it was built from, so publishing new content means: build a new migrate image, point the job at it, run migrations, run the release. The release is idempotent (unchanged chapters report `unchanged`; changed items get version + 1; frozen series are re-ingested only if changed). Step by step: [runbooks/publish-content.md](runbooks/publish-content.md).

Rollback of content: re-run the release with the previous migrate image digest, or `npm run content -- rollback --unit <chapter> --to <version>` against the database (operator access needed).

## 6. Monitoring and alerts (as defined in Bicep)

`platform/infra/modules/alerts.bicep` defines 10 log alerts (evaluated every 5 min in stg/prod) and 2 metric alerts, all to the action group `ag-soyl-<env>` (owner email):

| Alert | Fires when | Severity |
|---|---|---|
| `http-5xx-rate` | API 5xx > 1 % of ≥ 20 requests in 5 min | 1 |
| `http-p95-latency` | API p95 > 1 s (AI routes excluded) | 2 |
| `ai-spend-50` / `-80` / `-100` | `ai.spend.threshold` event at 50 / 80 / 100 % of `AI_DAILY_SPEND_CAP_INR` | 3 / 2 / 1 |
| `webhook-failures` | Razorpay signature failures or 5xx on `/v1/webhooks/` | 1 |
| `queue-backlog` | `queue.depth` metric > 500 | 2 |
| `otp-sends-per-hour` | `otp_sent` events > 200/h (SMS/email pumping) | 1 |
| `otp-verify-failures-per-hour` | `otp_verify_failed` > 100/h (brute force) | 2 |
| `edge-auth-failures` | `edge_auth_failed` > 50 per 15 min (traffic bypassing Vercel) | 2 |
| `db-cpu` (metric) | PostgreSQL CPU > 80 % | 2 |
| `db-storage` (metric) | PostgreSQL storage > 85 % | 3 |

Budgets (`budget.bicep`): 50 / 80 / 100 % actual and 100 % forecast per resource group, plus a separate Azure OpenAI budget when AI is deployed. The AI gateway also logs alert traces (`spend_threshold`, `cost_guardrail`, `invariant`, `self_harm_signal`) that need an App Insights log alert once AI is on (ai-gateway handoff).

Not built yet: dashboards (ARCHITECTURE §14), OpenTelemetry tracing beyond App Insights request logs, queue-depth autoscaling of the worker.

## 7. Costs

| Item | Figure | Source |
|---|---|---|
| Production (dark) | Budget ₹25,000/month; estimate ₹15–20k/month at dark-start sizing | [prod-readiness handoff](handoffs/2026-10-27-prod-readiness.md#production-sizing-platforminfraparamsprodbicepparam) |
| Dev + staging + shared (when created) | Budget split ₹18,000 + ₹29,000 + ₹3,000 = ₹50,000/month; staging Postgres kept Burstable because General Purpose D2ds_v5 alone is ≈ ₹17.6k/month in Central India | [infra-azure M1 handoff](handoffs/2026-10-26-infra-azure-m1.md) |
| AI spend | Daily cap `AI_DAILY_SPEND_CAP_INR` (default ₹2,000; 0 in prod while dark); free tier ≤ 60 % of it (D-015) | `platform/shared/config/ai-actions.ts` |
| Content generation (when a model exists) | CBSE 10 Science dry run ≈ ₹449 (Batch); full catalog ≈ ₹1.15 lakh (Batch), on placeholder prices; caps `CONTENT_BUDGET_INR` ₹25,000 per run, `CONTENT_BUDGET_TOTAL_INR` ₹3,00,000 | [pipeline-engineer M1 handoff](handoffs/2026-10-26-pipeline-engineer-m1.md) |

`COSTS.md` (referenced by the first-deploy runbook) was descoped in D-025 and has not been written; model token prices remain unverified until OA-02.

## 8. Rollback paths

| What broke | Roll back by | Notes |
|---|---|---|
| Marketing site | Vercel dashboard: promote the previous production deployment ("Instant Rollback"), or redeploy the previous `main` commit ([runbook](runbooks/deploy-marketing-site.md)) | Revert the commit on `main` afterwards so the next deploy does not bring it back |
| API or worker revision | `az containerapp update -g rg-soyl-platform-prod -n ca-soyl-api-prod --image <previous digest>` (single-revision mode) | Set `SOYL_API_IMAGE` to the same digest for the next Bicep run |
| Migration | `migrate down` of the newest migration only, via the migrate job with args (`migrate-entrypoint.mjs migrate down`) | Migrations are expand/contract; every one has a tested down |
| Content | Re-run the release job with the previous migrate image, or `content rollback --unit … --to …` | Attempts keep pointing at the question versions they used (D-023) |
| Data | Point-in-time restore to a new server (`az postgres flexible-server restore`, 14 days) | Restore drill not yet done (release gate) |
| Infrastructure | Re-run `az deployment group create` from the previous commit with the same `SOYL_*` variables | Deployments are idempotent |
| Razorpay webhooks | [runbooks/razorpay-webhook-replay.md](runbooks/razorpay-webhook-replay.md) | Replay, resync, reconcile, secret rotation |

Full detail: [prod-first-deploy §12](runbooks/prod-first-deploy.md#12-rollback).

## Runbooks

| Runbook | Use it to |
|---|---|
| [prod-first-deploy.md](runbooks/prod-first-deploy.md) | Build production from nothing (dark start); also the reference for every `az` command, rollback and scale-up |
| [update-dark-backend.md](runbooks/update-dark-backend.md) | Move the dark production backend to a newer `platform/main` (images, migrations, release, apps) |
| [publish-content.md](runbooks/publish-content.md) | Get newly merged chapters and frozen series into production |
| [deploy-marketing-site.md](runbooks/deploy-marketing-site.md) | Deploy `main` to www.soylai.com, including the Hobby-plan workaround |
| [razorpay-webhook-replay.md](runbooks/razorpay-webhook-replay.md) | Billing incidents: replay, resync, reconcile, rotate the webhook secret |

Still to write (ARCHITECTURE §14, INFRA-19): AI spend spike, DB restore drill, live-mock incident, secret rotation (edge secret, OTP pepper), incident SLA.
