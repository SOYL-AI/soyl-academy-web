# infra-azure — production AI infrastructure (D-038) — 2026-10-28

Status: done (ready for the Lead to deploy; nothing was changed in Azure, I ran only read-only `az` commands and `what-if`)
Branch: `platform/infra-azure/ai-prod`

## What changed

| File | Change |
|---|---|
| `platform/infra/modules/ai.bicep` | One region per service: `openAiLocation`, `speechLocation`, `contentSafetyLocation`. No Indian region offers all three (see below). Outputs `speechRegion`. |
| `platform/infra/main.bicep` | New params `speechLocation` and `contentSafetyLocation` (India only). Deployment-name env vars are empty unless `deployAi && aoaiDeployModels`. New env vars `AZURE_OPENAI_DEPLOYMENT_EMBEDDING`, `AZURE_OPENAI_DEPLOYMENT_SMALL_BATCH` and `AZURE_OPENAI_DEPLOYMENT_MID_BATCH`; the latter two are the names `models.ts` reads. Removed `AZURE_OPENAI_DEPLOYMENT_BATCH`, which no code read. `AZURE_SPEECH_REGION` now comes from the Speech account's region. |
| `platform/infra/params/prod.bicepparam` | `var aiOn = true` drives `deployAi`, `aoaiDeployModels` and the provider app settings. Regions: OpenAI `southindia`, Speech `centralindia`, Content Safety `southindia`. Deployments: small = gpt-6-luna 2026-09-22 GlobalStandard 50; mid = gpt-6.1-sol 2026-09-29 GlobalStandard 50 (verify reuses it, D-033); embedding = text-embedding-3-small 1 DataZoneStandard 100. No Batch. App settings: `AI_PROVIDER`, `AI_EMBEDDINGS`, `CONTENT_SAFETY_PROVIDER` and `BLOB_PROVIDER` set to `azure`; `AI_DAILY_SPEND_CAP_INR=2000`; `CONTENT_BUDGET_INR=300000`. `aiAllowedIps` comes from `SOYL_AI_ALLOWED_IP`. AI budget is 1,00,000/month; the RG budget is 25,000 + 1,00,000. |
| `platform/infra/params/{dev,stg}.bicepparam` | Same region split and real model names/versions. Models stay off (`SOYL_AOAI_DEPLOY_MODELS`): there is no quota left for them. |
| `platform/infra/validate.mjs` | All three AI locations must be in India. `aoaiDeployments` must use a known tier, an ADR-008 sku, Batch skus only for `*-batch` tiers, and a real version when models are deployed. |
| `platform/shared/config/models.ts` | Prices verified against the Azure Retail Prices API on 2026-10-28 (INR, South India); `price_status: 'verified'`. |
| `platform/ai-core/src/providers/azure.ts` | `batch` exists only when a Batch deployment is configured. A Batch job for a tier without one is refused before anything is uploaded. **This fixes a bug:** with no Batch deployment, `--batch` used to submit to the Batch API with a standard deployment, which Azure rejects, instead of falling back to sync. |
| `platform/ai-core/src/ai-core.test.ts` | Two new tests: no Batch deployment → `supportsBatch` false and no HTTP calls; a mixed-tier Batch job is refused. Price tests updated to the verified values. |
| `docs/platform/adr/008-ai-data-location.md` | **New ADR-008** on AI data location (F-014). |
| `docs/platform/runbooks/prod-first-deploy.md` | New §14 "AI go-live": deploy, verify and roll back. §13 table updated. |

The `platform/ai-core` changes are in ai-gateway's area. They are kept minimal and tested; ai-gateway, please review.

## Facts verified (read-only, 2026-10-28)

- p4 parameters (`az deployment group show -n soyl-prod-p4`) match the Lead's env vars. While I worked, the Lead deployed `soyl-prod-fe404f0-a` and `-b` (the S6 merge). Their parameters differ from p4 only in the three image digests, so the final what-if and the deploy command below use the **live digests from fe404f0-b**.
- Model availability: Luna and Sol are **not in Central India**. In South India: Luna 2026-09-22 is GlobalStandard only. Sol 2026-09-29 is GlobalStandard, DataZoneStandard and GlobalProvisionedManaged (not "ProvisionedManaged"). text-embedding-3-small 1 is GlobalStandard and DataZoneStandard. **No GlobalBatch or DataZoneBatch.** The models report `area: APAC`, so the Data Zone is APAC.
- Service availability (`Microsoft.CognitiveServices/skus`): Azure OpenAI account and Content Safety are **South India only**; Speech is **Central India only**. Hence the three-way split.
- Quota in South India: GlobalStandard Luna 200/250 and Sol 200/250; **DataZoneStandard Sol 100/100 (full)**; embeddings GlobalStandard 150/1000 and DataZoneStandard 0/1000.

## Prices (models.ts), INR per 1M tokens, South India, GlobalStandard, short context

| Model | Input | Cached input | Output | Was (placeholder) |
|---|---|---|---|---|
| GPT-6 Luna (`6-luna ShortCo ... Std Gl`, effective 2026-09-01) | 9.5989 | 0.9599 | 47.9947 | 22 / 2.2 / 176 |
| GPT-6.1 Sol (`6.1-sol ShortCo ... Std Gl`, effective 2026-10-01) | 191.9788 | 9.5989 | 959.894 | 110 / 11 / 880 |
| text-embedding-3-small DZ (2026-06-01) | 2.30 | — | — | 1.76 |

Not modelled (both make real cost higher): cache writes at 1.25× input, and long-context meters (2× input, 1.5× output).
The meters also show a **Flex** tier (`flexTierSkus: GlobalStandard`) at 50% of the price on the same deployment. That is a possible Batch substitute for the pipeline; follow-up for pipeline-engineer and ai-gateway.

**Credit guardrail impact (owner decision).** At CONTEXT §6 token sizes:

| Action | Credit price | Real cost |
|---|---|---|
| quick doubt | ₹0.10 | ≈ ₹0.011 |
| hard doubt | ₹0.60 | ≈ ₹0.67 (112%) |
| evaluate-answer | ₹0.60 | ≈ ₹0.72 |
| photo doubt | ₹1.00 | ≈ ₹1.15+ |
| paper-from-upload | ₹6.00 | ≈ ₹7.68 (128%) |

**Every Sol action costs more than its credit price.** The 7-day cost guardrail (`COST_ALERT_RATIO` 0.8) will alert once real costs flow. Prompt caching (cached input at 5%) will lower the real numbers somewhat. Options: raise mid-tier credit prices about 30–40%, cap tokens, or lower reasoning effort. The `ai-actions.ts` `estCostPaise` values still hold CONTEXT's estimates; I left them unchanged (ai-gateway's file).

## What-if (soyl-prod-p6, read-only; final run on the merged branch with fe404f0-b's images): 16 create, 45 modify, 32 no change, 25 unsupported, 4 ignore

**Real changes**
- Create the accounts `oai-soyl-prod-tek7mx` (OpenAI, southindia), `cs-soyl-prod-tek7mx` (ContentSafety, southindia) and `spch-soyl-prod-tek7mx` (SpeechServices, centralindia). All three have public access Disabled, ACL Deny, local auth disabled and S0.
- Create the deployments small, mid and embedding (values above), with `Microsoft.DefaultV2` and `NoAutoUpgrade`.
- Create three private endpoints with DNS zone groups in the Central India PE subnet, and three diagnostic settings (audit plus metrics only, no request bodies).
- Create the budget `budget-soyl-platform-prod-openai` (1,00,000, filtered to the OpenAI account).
- Modify the RG budget: amount 25,000 → 1,25,000.
- Change the api and worker env (the only real container change; images are unchanged):
  - `AZURE_OPENAI_ENDPOINT`, `AZURE_SPEECH_ENDPOINT/REGION(centralindia)/RESOURCE_ID` and `AZURE_CONTENT_SAFETY_ENDPOINT` are set.
  - `AZURE_OPENAI_DEPLOYMENT_EMBEDDING=embedding` is added; `*_SMALL_BATCH` and `*_MID_BATCH` are added as empty.
  - `AZURE_OPENAI_DEPLOYMENT_BATCH` is removed. `AZURE_OPENAI_MODELS_DEPLOYED` changes False → True. `VERIFY` is already `mid` live.
  - `AI_PROVIDER`, `AI_EMBEDDINGS`, `CONTENT_SAFETY_PROVIDER` and `BLOB_PROVIDER` are added as `azure`.
  - `AI_DAILY_SPEND_CAP_INR` changes 0 → 2000 and `CONTENT_BUDGET_INR` 0 → 300000.
- Six AI role assignments (OpenAI User, Speech User and Cognitive Services User for the api and worker identities). They appear under "Unsupported" because their principal ids are `reference()` expressions.

**Noise**
- Unresolved `reference()` values: app settings for the App Insights connection string, PGHOST, REDIS_URL, BLOB/KV/ACS endpoints, DATABASE_URL, AZURE_CLIENT_ID and REDIS_USERNAME; the ACR login server; Key Vault secret URLs; PE subnet ids; Redis access-policy object ids; migrate/release job env.
- Server-populated defaults shown as removals: `exposedPort`, scale cooldown and polling, mTLS, Redis kind and redundancy, Postgres storage, replica and encryption, identity `isolationScope`, DNS-link `resolutionPolicy`, PE `ipVersionType`, DNS zone-config etags, container encryption scope, diagnostic `retentionPolicy` and disabled category groups, VNet PE policies.
- Postgres configuration `source` system-default → user-override.
- App Insights `Flow_Type` and `Request_Source`.
- The budget `startDate` expression (it resolves to 2026-10-01) and the budget `endDate`.
- The probe order (Liveness, Readiness, Startup ↔ Startup, Liveness, Readiness).
- The other 19 "Unsupported" entries are existing role assignments (KV, storage, App Insights, ACR, ACS) and the Postgres admin.

**Unexpected:** none.

## Deploy (Lead)

See runbook §14. In Git Bash:

```bash
az() { "C:/Users/Prabhu/soyl-wt/_tools/azcli/bin/az.cmd" "$@"; }
export PATH="/c/Users/Prabhu/soyl-wt/_tools:$PATH" MSYS_NO_PATHCONV=1   # bicep.exe on PATH (az uses binary from PATH)
RG=rg-soyl-platform-prod
export SOYL_ACR_NAME=crsoylplatform SOYL_ALERT_EMAIL=outreach@soyl.cloud SOYL_KV_SECRET_REFS=true \
  SOYL_ACS_SENDER_ROLE_ID=09976791-48a7-449e-bb21-39d1a415f350 SOYL_ACS_LINK_DOMAIN=true \
  SOYL_API_IMAGE=crsoylplatform.azurecr.io/soyl-api@sha256:f656f55c9496876e92c1eeae602f73d8ca05394e7f1a0a6b3f68765ba60cb029 \
  SOYL_WORKER_IMAGE=crsoylplatform.azurecr.io/soyl-worker@sha256:b1e45450e39f900ba73878ef607922c584dd0f93ec3eb7ed3a33ea32b836c73a \
  SOYL_MIGRATE_IMAGE=crsoylplatform.azurecr.io/soyl-migrate@sha256:15127a92cc3e7948b7fa83048e710393b89c37530779119ec55e9aa99bfc35ad
unset SOYL_KV_ALLOWED_IP SOYL_AI_ALLOWED_IP SOYL_PG_ADMIN_GROUP_ID SOYL_PG_ADMIN_GROUP_NAME
az deployment group what-if -g $RG -n soyl-prod-p6 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam
az deployment group create  -g $RG -n soyl-prod-p6 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
```

The deploy needs rights to create role assignments (Owner, User Access Administrator or RBAC Administrator). These are the digests live after `soyl-prod-fe404f0-b`. If anything is deployed later, use the digests that are live at deploy time (runbook §14 reads them with `az containerapp show`).

## AI budget choice

`AI_DAILY_SPEND_CAP_INR` 2,000/day allows at most about ₹62k in a 31-day month of interactive AI. `CONTENT_BUDGET_INR` ₹3,00,000 is the whole content programme, enforced by the pipeline. About ₹38k/month of headroom covers a steady content wave (roughly 8 months to spend that cap).

- The OpenAI budget is ₹1,00,000/month: the 50% alert is normal late in a busy month; 80% and 100% mean "investigate".
- Azure budgets only alert; the hard stops are in the app.
- The RG budget includes the AI accounts, so it is 25k + 100k.

## Quota and capacity

- **50K TPM each for Luna and Sol is all the quota left** in the subscription. Azure counts prompt tokens plus `max_completion_tokens` against TPM up front:
  - Students: hard doubt about 3K, paper-from-upload about 19K. Sol handles roughly 15 hard doubts a minute, or about 2 paper uploads a minute.
  - Pipeline templates cap output at 5K–28K, so a single Sol pipeline request can use most of a minute.
- **Pipeline runs and students share one deployment.** Run content at quiet hours until quota grows.
- dev and stg have no Luna/Sol quota at all.
- **Owner action:** request more GlobalStandard TPM for gpt-6-luna and gpt-6.1-sol in **South India** (Azure AI Foundry → Quotas → South India → GlobalStandard → Request quota increase, or aka.ms/oai/quotaincrease). Suggested: Sol 300K, Luna 200K for launch and content waves. Then raise `capacity` in prod.bicepparam and redeploy.

## Data location (ADR-008)

- Data at rest stays in India: the accounts are in South/Central India, and our Postgres and Blob are in Central India. No Files, Batch or stored completions are used.
- Luna and Sol prompts are **processed in any Azure region** (GlobalStandard). Embeddings stay in the **APAC** data zone. Content Safety stays in South India, and Speech in Central India (lesson text only).
- What we send is minimised: no names, emails, phones, account ids or `user` field; uploads are stripped of metadata.
- Abuse monitoring may keep prompts and completions for up to 30 days in the resource geography, with human review of flagged samples.
- **Owner actions:** apply for modified abuse monitoring, and agree the privacy-notice wording with counsel (F-014, OA-14).

## S6-L02 overlap

security-fixes-m6 was merged to platform/main (`fe404f0`), and the Lead has already deployed it (`soyl-prod-fe404f0-a/-b`). I merged it into this branch:

- `validate.mjs` auto-merged: their blob-write-contract check sits at the top, my AI checks in the per-params loop. It passes: S6-L02 contract OK, 0 errors, 0 warnings.
- I did not touch `storage.bicep`.
- The API's write role on `uploads` is therefore live, so `BLOB_PROVIDER=azure` set here has what it needs. The what-if shows no storage role change because it is already deployed.

## Gate results (2026-10-28, this machine)

- `node validate.mjs --strict` (bicep 0.48.1, after merging fe404f0): build, lint and build-params for all 4 params files; INFRA-9, ADR-008 and S6-L02 checks; **Total: 0 error(s), 0 warning(s)**.
- `npm run typecheck` (platform): exit 0.
- `npm test -w @soyl/ai-core`: 38 passed. `-w @soyl/shared`: 80 passed. `-w @soyl/content-pipeline`: 280 passed. In the parallel run, `lint-rules` timed out once at 60 s on a loaded machine; rerun alone it gave 132/132.
- api `test/ai-unit.test.ts` + `test/ai-spend.test.ts`: 37 passed. worker `test/ai-jobs.test.ts`: 6 passed.
- what-if `soyl-prod-p6`: see above.

## How to verify

```bash
# from platform/infra
BICEP_BIN=C:/Users/Prabhu/soyl-wt/_tools/bicep.exe node validate.mjs --strict   # Total: 0 error(s), 0 warning(s)
# from platform/
npm run typecheck
npm test -w @soyl/ai-core -w @soyl/shared -w @soyl/content-pipeline
```

## Tests added

- ai-core: "offers no Batch without a Batch deployment, so callers fall back to synchronous calls"
- ai-core: "refuses a Batch job with a tier that has no Batch deployment, before uploading anything"
- ai-core: price tests updated to the verified values

## Known gaps / follow-ups

- **ai-gateway / owner:** credit prices for mid-tier actions (above); `estCostPaise` documentation values; the cache-write surcharge is not metered.
- **pipeline-engineer:** consider the Flex tier (50%) instead of Batch. `plan` still prints a "with --batch" estimate that cannot apply in prod.
- **Operator access:** the content pipeline against prod needs `SOYL_AI_ALLOWED_IP` plus an OpenAI User role for the operator, assigned manually (runbook §14).
- Checkov: CI runs a pinned Docker image in report-only mode. Locally I ran checkov 3.3.30 (pip). It crashes inside its own CKV_AZURE_189 Key Vault check on the untouched keyvault.bicep, so that check was skipped. Result: 4 passed, 0 failed, 9 parse errors (checkov cannot parse newer Bicep syntax), identical to the branch base. No new findings.

## Decisions made

ADR-008 (new).

## Needs from owner

- TPM quota increase (South India, GlobalStandard, Luna and Sol).
- Modified abuse monitoring application.
- Privacy-notice processor and location wording (F-014, OA-14).
- Decision on mid-tier credit prices.
