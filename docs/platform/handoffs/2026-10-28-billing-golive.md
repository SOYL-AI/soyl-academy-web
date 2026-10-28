# infra-azure + billing-razorpay — production billing go-live wiring (D-038) — 2026-10-28

Status: done (ready for the owner's steps and the Lead's deploy). Nothing was changed in Azure. I ran only read-only `az` commands (`show`, `list`, ARM GET of secret metadata) and `what-if`. I did not read, print or copy any secret value.

## What changed

| File | Change |
|---|---|
| `platform/infra/params/prod.bicepparam` | **One switch:** `var billingOn = false` → `param deployBilling = billingOn`. `BILLING_ENABLED` stays `'false'`, with a comment that it is the separate launch switch. |
| `platform/infra/main.bicep` | New `param deployBilling bool = false` (dev/stg unchanged). `var razorpaySecrets` holds the secret **names** `razorpay-key-id` / `razorpay-key-secret` / `razorpay-webhook-secret` → `RAZORPAY_KEY_ID` / `_KEY_SECRET` / `_WEBHOOK_SECRET`, for apps `api`, `worker` and `billing`. `billingWired = deployBilling && kvSecretRefs` drives everything together: the Razorpay secret refs are appended to `secretRefs`, `billingEnv` = `RAZORPAY_PROVIDER=razorpay`, `deployBillingJob`, and the Key Vault existence gate. New output `billingJobName`. |
| `platform/infra/modules/keyvault.bicep` | **Existence gate:** `requiredSecretNames` (default `[]`) becomes `existing` `vaults/secrets` references, and output `requiredSecretUris` calls `reference(...).secretUri`. With billing wired, a missing secret fails the Key Vault module with `ResourceNotFound`. The Container Apps module depends on that module, so it is never applied. The metadata is read through ARM, which the vault firewall does not block. Bicep never creates a secret. |
| `platform/infra/modules/containerApps.bicep` | New params `deployBillingJob` and `billingEnv`. `billingEnv` is appended **last** to the api and worker env, so existing entries keep their indexes. New job **`caj-soyl-billing-<env>`**: migrations image, **worker** identity (already a Key Vault Secrets User and `soyl_app` in the database, so no new role assignment), AcrPull with that identity, the 3 Key Vault refs, env (APP_ENV, AZURE_CLIENT_ID, DATABASE_AUTH=entra, PG*, DATABASE_URL as the worker, RAZORPAY_PROVIDER, 3 secretRefs), Manual trigger, timeout 900 s, retry 0. Default args `/app/migrate-entrypoint.mjs billing sync-plans --dry-run`. The job is created only when billing is wired and a real migrate image is set. |
| `platform/infra/docker/release-cli.ts` | New `billing <args>` command: `loadBillingConfig` + `runBillingCli` from `@soyl/api/billing/*`. It uses the real `RazorpayHttpClient` only and refuses the stub. It logs `keyMode` (live/test/none), never the key. It sets `process.exitCode` instead of calling `process.exit()`, because exiting while fetch keep-alive sockets close aborted the process on Windows (libuv assertion). |
| `platform/infra/docker/migrate-entrypoint.mjs` | `billing` mode: no migrator token and **no bootstrap** (the worker is not the Postgres Entra admin). Steps = `release billing …`. |
| `platform/infra/docker/{migrate.Dockerfile,bundle-migrate.sh}` | Comments only. The image build is unchanged: the bundle already pulls `@soyl/api` in through `@soyl/worker`. |
| `platform/infra/validate.mjs` | **Billing contract.** Source checks: `razorpaySecrets` names exactly the three secrets with the right env names, each for api, worker and billing; main.bicep feeds them to the existence gate; no Bicep file sets a `RAZORPAY_*` credential as a plain env entry, contains an `rzp_` key id, or declares (rather than references) a Key Vault secret. Per params file: no `RAZORPAY_*` app setting, no Razorpay entry in `appSecrets`, no `rzp_…` string anywhere, and `deployBilling=true` requires `kvSecretRefs=true`. |
| `docs/platform/runbooks/billing-go-live.md` | **New owner runbook:** steps 0–7 (prechecks; open the Key Vault to the owner's IP via portal, CLI or Bicep, then close it; secrets from Vercel through a hidden prompt or the portal; owner-generated webhook secret; Lead deploy; plans sync dry run, real run, re-check; verify; launch with OA-21 + `BILLING_ENABLED` + smoke purchase; rollback). |
| `docs/platform/runbooks/razorpay-webhook-replay.md` | A "Production" note: run the CLI through `caj-soyl-billing-prod`. §6 event list completed with `subscription.paused` / `subscription.resumed` (it now matches `HANDLED_EVENTS`). |
| `docs/platform/OWNER_ACTIONS.md` | OA-21 rewritten. The keys and the webhook secret go into Key Vault now, and the owner generates the webhook secret (the Lead never sees it). Register the webhook only at launch. |

No API, worker or web code changed.

## Switch design (safe order)

1. `billingOn = false` (committed now). The apps have no Razorpay env and no refs, and there is no job. Deploys need none of the secrets. What-if = no change.
2. The owner opens the vault to their IP, sets the three secrets and closes the vault (runbook steps 1–2).
3. The Lead sets `billingOn = true`, commits it, and deploys with a migrate image built from this branch. If a secret is still missing, the existence gate fails the Key Vault module before the apps module runs, so the apps are untouched. The `kvSecretRefs=false` first-deploy mode also turns billing off (`billingWired`), so an app never selects Razorpay without its keys.
4. `BILLING_ENABLED` is a separate, later switch (launch, runbook step 6). With the provider wired, webhooks, cancellations and reconciliation work even while purchases are closed (the kill-switch design in `billing/config.ts`).

## How to verify

```bash
cd platform && BICEP_BIN=C:/Users/Prabhu/soyl-wt/_tools/bicep.exe node infra/validate.mjs --strict   # Total: 0 error(s), 0 warning(s)
npm run typecheck -w @soyl/api -w @soyl/worker            # also shared, db, ai-core, content-pipeline, e2e: all exit 0
```

Negative checks of the new validate rules, run on temporary param copies that were deleted afterwards:
- a `RAZORPAY_KEY_SECRET` app setting → `BILLING: appSettings.RAZORPAY_KEY_SECRET: … never as app settings`;
- `SOYL_KV_SECRET_REFS=false` with billing on → `deployBilling=true needs kvSecretRefs=true`;
- the billing-on copy alone → 0 problems.

Bundle smoke test, using the image contents built locally with `sh infra/docker/bundle-migrate.sh <out>`:
- `APP_ENV=prod RAZORPAY_PROVIDER=razorpay` with no keys → `billing mode: no bootstrap`, then `Invalid billing configuration: RAZORPAY_KEY_ID is required …` (names only), exit 1. The stub provider is refused, exit 1.
- Embedded Postgres plus a fake Razorpay plans API (fake `rzp_test_` key), `migrate-entrypoint.mjs billing sync-plans` (two full passes):
  - `--dry-run`: 4 `db_insert` + 4 `razorpay_create` (Plus 19900/149900, Pro 29900/249900 paise), 0 plans created, exit 0;
  - real run: the same 8 changes, 4 plans created, exit 0;
  - re-run: `no changes`, exit 0.

### What-if A: `billingOn=false` (p6 env vars, live images = p6 digests: api `f656f55c…`, worker `b1e45450…`, migrate `15127a92…`)

`Modify 61, NoChange 32, Ignore 7, Unsupported 25`; **0 Create, 0 Delete.** After filtering the known noise, nothing remains except pre-existing server-side noise. The noise: `reference()` values, Key Vault URLs and env values shown as expressions, probe order, `exposedPort`/`cooldownPeriod`/`pollingInterval` server defaults, env index positions. The remaining pre-existing noise: Postgres `configurations/*` `source: system-default → user-override` (4) and App Insights `Flow_Type`/`Request_Source`. Compared as name→value sets, the env of api, worker, migrate and release is identical, and the secrets are unchanged. **No change**, as expected.

### What-if B: `billingOn=true` (same env vars; temporary param copy, deleted)

`Modify 61, Create 1, NoChange 32, Ignore 7, Unsupported 25`. Beyond the same noise:
- `ca-soyl-api-prod`: `configuration.secrets` +3 (Key Vault URLs `…/secrets/razorpay-key-id`, `razorpay-key-secret`, `razorpay-webhook-secret`, identity `id-soyl-api-prod`, no `value`); env +4 = `RAZORPAY_KEY_ID→secretRef razorpay-key-id`, `RAZORPAY_KEY_SECRET→secretRef razorpay-key-secret`, `RAZORPAY_WEBHOOK_SECRET→secretRef razorpay-webhook-secret`, `RAZORPAY_PROVIDER=razorpay` (indexes 55–58, appended).
- `ca-soyl-worker-prod`: `configuration.secrets` created (the 3 refs, worker identity); env +4 (indexes 48–51). ARM masks the names as `*******` because the app had no secrets before; the job, built from the same arrays, shows `RAZORPAY_PROVIDER=razorpay` as a plain value.
- **Create `caj-soyl-billing-prod`**: identity `id-soyl-worker-prod` (registry and Key Vault refs too); 3 Key Vault refs; image = the migrate image; args `/app/migrate-entrypoint.mjs billing sync-plans --dry-run`; 0.25 vCPU / 0.5 Gi; Manual, timeout 900, retry 0; env APP_ENV, NODE_ENV, AZURE_CLIENT_ID, DATABASE_AUTH=entra, PGHOST/PORT/DATABASE, PGUSER=id-soyl-worker-prod, PGSSLMODE, DATABASE_URL, RAZORPAY_PROVIDER, 3 secretRefs.
- What-if does not evaluate the existence gate: it passed although the secrets do not exist yet. A real deployment evaluates `reference()` and stops. The ARM GET of `secrets/razorpay-key-id` returns `ResourceNotFound` today, which is what the gate will see.

Read-only facts gathered: the vault `kv-soyl-prod-tek7mx` has `publicNetworkAccess=Disabled`, no IP rules and RBAC mode. Key Vault Secrets User is held by the api and worker identities, and Key Vault Secrets Officer by the owner's signed-in account. 5 secrets exist; there are no Razorpay secrets yet.

## Webhook route (confirmed, ADR-018 §2)

`POST https://www.soylai.com/api/platform/v1/webhooks/razorpay` → `components/platform/server/api-proxy.ts` `upstreamPath` → `${PLATFORM_API_ORIGIN}/v1/webhooks/razorpay`.
- The body is streamed unchanged.
- `x-razorpay-signature` / `x-razorpay-event-id` are forwarded on that path only.
- The API route has a raw-Buffer parser, HMAC over the exact bytes, and is AUTH-12 exempt.
- Tests: `components/platform/__tests__/m3m4-server.test.ts` (byte-for-byte) and `platform/e2e/tests/platform/web/plans.spec.ts` (one byte changed → 400).
- While dark, both the proxy and the API answer 404 (`flag-off.spec.ts`), so OA-21 is registered at launch.
- Events: the 17 `HANDLED_EVENTS` (runbook §6a).
- Future Builders payments reaching the same webhook → 200 `ignored` / `not_ours`.

## Tests added

None in a workspace (no product code changed). The new validate.mjs rules and the bundle smoke test are above. The scratch harness was not committed.

## Known gaps / follow-ups

- **Webhook secret rotation without a gap:** `RAZORPAY_WEBHOOK_SECRET_PREVIOUS` (`razorpay-webhook-secret-previous`) is supported by the code but not wired; adding it would make it a fourth required secret. The runbook gives the short-gap procedure.
- `platform/api/scripts/billing.ts` (local operator CLI) still calls `process.exit()` right after network use. On Windows it can abort with the same libuv assertion after a successful run. It is cosmetic for local use; backend-api could switch it to `process.exitCode`.
- `release-cli.ts` is not type-checked by any workspace (it was before this change too). I checked it with a temporary tsconfig (exit 0, file removed). Adding `infra/docker` to a typecheck would close that gap.
- An incremental deploy with `billingOn=false` after it was `true` does not delete `caj-soyl-billing-prod` (runbook §7).
- STATUS.md was not edited (the Lead's board).

## Decisions made

No ADR: no shared or marketing file changed, the new job reuses an existing identity and image, and no new runtime dependency was added. Choices:
- The billing job runs the **migrations image with the worker identity** rather than the migrator. This avoids giving the migrator read access to every Key Vault secret (vault-scope RBAC).
- The **existence gate** is ARM `existing` references, not a deployment script.
- `billingOn` is a **committed literal**, like `aiOn`, not an env var: a later deploy from another shell cannot silently unwire billing.

## Needs from owner

Runbook steps 0–2 (Subscriptions enabled on the live account, the keys from Vercel, generate the webhook secret, confirm the prices), then OA-21 at launch (step 6a) and the choice of smoke test (6c).
