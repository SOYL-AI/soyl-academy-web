# Runbook: first production deployment (dark start)

Owner decisions D-031 (2026-10-27): production only, **dark** (`PLATFORM_ENABLED=false`, `BILLING_ENABLED=false`), email OTP only through Azure Communication Services Email from `noreply@soylai.com`, no SMS, no Google sign-in yet, no consent system yet (`CONSENT_PROVIDER=unavailable`), no AI.

What "dark" means here: the API and worker run in Azure with a migrated, seeded database and published content. Every API route except `/healthz` and `/readyz` answers 404 (GEN-4). The live site (Vercel) keeps `PLATFORM_ENABLED` unset, so no visitor can reach the platform.

Progress already recorded in STATUS.md (2026-10-27): owner sign-in, providers registered, both resource groups created, and `crsoylplatform` deployed (`soyl-shared-1`). Steps 0 (variables and extensions only), 1 and 2 can be skipped up to that point.

Everything below is run by the operator (the Lead) from `C:/Users/Prabhu/soyl-wt/prod-auth` (or any checkout of the branch) in **Git Bash**. Nothing needs Docker: images are built in Azure with `az acr build`.

**Rights legend** (who can run a step):
- 🔑 **Owner / User Access Administrator**: the step creates role assignments. Owner, User Access Administrator, or Role Based Access Control Administrator also works, on the scopes named in the step.
- 🛠 **Contributor**: Contributor on the subscription or resource group is enough.

---

## 0. Prerequisites and variables

```bash
# Azure CLI (bundled copy on this machine) and Bicep
az() { "C:/Users/Prabhu/soyl-wt/_tools/azcli/bin/az.cmd" "$@"; }
export PATH="$PATH:/c/Users/Prabhu/soyl-wt/_tools"       # bicep.exe 0.48.1 (the version validate.mjs uses)
az config set bicep.use_binary_from_path=true
az extension add -n containerapp --upgrade -y
az extension add -n communication --upgrade -y

az login                       # the operator's account
az account set -s "<subscription id>"
az account show --query "{sub:id, tenant:tenantId, user:user.name}" -o table

# Names (the ACR name must be globally unique; change it if taken: az acr check-name -n <name>)
export SOYL_ACR_NAME=crsoylplatform
export SOYL_ALERT_EMAIL="<alert inbox, e.g. outreach@soyl.cloud>"
export RG=rg-soyl-platform-prod
export RG_SHARED=rg-soyl-platform-shared
export LOC=centralindia
export TAG=$(git rev-parse --short=12 HEAD)
```

Look up the ACS sender role. The **Communication and Email Service Owner** built-in role is the documented role for sending with Microsoft Entra ID. If the lookup returns nothing, leave the variable unset: the params fall back to **Contributor**, scoped to the single ACS resource.

```bash
ROLE=$(az role definition list --name "Communication and Email Service Owner" --query "[0].name" -o tsv)
[ -n "$ROLE" ] && export SOYL_ACS_SENDER_ROLE_ID=$ROLE
echo "ACS sender role: ${SOYL_ACS_SENDER_ROLE_ID:-<not found: Contributor fallback>}"
```

Register the resource providers once per subscription 🛠. Registration is idempotent and takes a few minutes.

```bash
for ns in Microsoft.App Microsoft.ContainerRegistry Microsoft.DBforPostgreSQL Microsoft.Cache Microsoft.Communication \
          Microsoft.KeyVault Microsoft.Storage Microsoft.Network Microsoft.OperationalInsights Microsoft.Insights \
          Microsoft.ManagedIdentity Microsoft.Consumption Microsoft.AlertsManagement; do
  az provider register --namespace "$ns" -o none
done
az provider list --query "[?namespace=='Microsoft.App' || namespace=='Microsoft.Communication' || namespace=='Microsoft.Cache'].{ns:namespace, state:registrationState}" -o table
```

Check that the SKUs are offered in Central India (the first command must print Standard_B2s):

```bash
az postgres flexible-server list-skus -l $LOC --query "[0].supportedServerEditions[?name=='Burstable'].supportedServerSkus[].name" -o tsv | tr '\t' '\n' | grep -x Standard_B2s
# Azure Managed Redis: portal > Azure Managed Redis > Create > Region Central India must offer "Balanced B0".
```

## 1. Resource groups 🛠 (subscription Contributor)

```bash
az group create -n $RG_SHARED -l $LOC --tags app=soyl-platform env=shared managedBy=bicep -o none
az group create -n $RG        -l $LOC --tags app=soyl-platform env=prod   managedBy=bicep -o none
```

## 2. Shared registry (shared.bicep) 🛠

```bash
az deployment group what-if  -g $RG_SHARED -f platform/infra/shared.bicep -p platform/infra/params/shared.bicepparam
az deployment group create   -g $RG_SHARED -n soyl-shared-$TAG -f platform/infra/shared.bicep -p platform/infra/params/shared.bicepparam -o none
az acr show -n $SOYL_ACR_NAME --query loginServer -o tsv
```

The operator also needs to push images. `az acr build` runs as the signed-in user, which needs **AcrPush** (or Contributor) on the registry. Contributor on `rg-soyl-platform-shared` covers it.

## 3. Build the images in Azure (no local Docker) 🛠

Run these from the **repository root**. The build context is `platform/`, `-f` is relative to that context, and `platform/.dockerignore` keeps `node_modules`, `.data` and secrets out of the upload. Each build takes about 3 to 8 minutes.

```bash
az acr build -r $SOYL_ACR_NAME -t soyl-api:$TAG     -f api/Dockerfile                 platform
az acr build -r $SOYL_ACR_NAME -t soyl-worker:$TAG  -f worker/Dockerfile              platform
az acr build -r $SOYL_ACR_NAME -t soyl-migrate:$TAG -f infra/docker/migrate.Dockerfile platform

# Pin by digest (what the deployment uses):
digest() { az acr repository show -n $SOYL_ACR_NAME --image "$1:$TAG" --query digest -o tsv; }
export API_IMAGE="$SOYL_ACR_NAME.azurecr.io/soyl-api@$(digest soyl-api)"
export WORKER_IMAGE="$SOYL_ACR_NAME.azurecr.io/soyl-worker@$(digest soyl-worker)"
export MIGRATE_IMAGE="$SOYL_ACR_NAME.azurecr.io/soyl-migrate@$(digest soyl-migrate)"
echo "$API_IMAGE"; echo "$WORKER_IMAGE"; echo "$MIGRATE_IMAGE"
```

The migrate image contains:
- the `@soyl/db` CLI (migrations, catalog seed);
- the pg-boss schema install (`worker migrate`);
- the content pipeline (`content publish --authored`);
- the data those three read: `db/migrations`, `catalog`, `content/authored` and `content-templates/exemplars`.

## 4. Infrastructure, pass 1: placeholders, no secret references 🔑

This pass creates everything: VNet, Key Vault, Postgres, Redis, Storage, Communication Services, Container Apps environment, identities, alerts and budgets. The apps run a pinned public placeholder image, so no secret has to exist yet.

**Rights:** Owner or User Access Administrator on `rg-soyl-platform-prod` **and** on `rg-soyl-platform-shared`. The template assigns AcrPull on the shared registry, plus Key Vault, Blob, Redis, ACS and monitoring roles to the managed identities.

```bash
export SOYL_KV_SECRET_REFS=false
export SOYL_KV_ALLOWED_IP=$(curl -s https://api.ipify.org)     # operator IP: lets you write secrets in step 5
unset SOYL_API_IMAGE SOYL_WORKER_IMAGE SOYL_MIGRATE_IMAGE SOYL_ACS_LINK_DOMAIN

az deployment group what-if -g $RG -n soyl-prod-p1 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam
az deployment group create  -g $RG -n soyl-prod-p1 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
```

Expect 15 to 30 minutes. Postgres and Azure Managed Redis are the slow parts. Then read the outputs:

```bash
out() { az deployment group show -g $RG -n "$1" --query "properties.outputs.$2.value" -o tsv; }
export KV=$(out soyl-prod-p1 keyVaultName)
export API_FQDN=$(out soyl-prod-p1 apiFqdn)
export MIGRATE_JOB=$(out soyl-prod-p1 migrateJobName)       # caj-soyl-migrate-prod
export RELEASE_JOB=$(out soyl-prod-p1 releaseJobName)       # caj-soyl-release-prod
echo "$KV $API_FQDN $MIGRATE_JOB $RELEASE_JOB"
```

If the RP rejects something, see "Known first-deploy risks" at the end. Fix it, then re-run the same command: Bicep deployments are idempotent.

## 5. Key Vault secrets 🔑 (role assignment) then 🛠

Give yourself permission to write secrets. The vault uses RBAC mode, so this needs Owner or User Access Administrator on the vault or the resource group:

```bash
az role assignment create --assignee "$(az ad signed-in-user show --query id -o tsv)" \
  --role "Key Vault Secrets Officer" --scope "$(az keyvault show -n $KV --query id -o tsv)" -o none
sleep 60   # RBAC propagation
```

Create the five secrets with cryptographically random values. **No value is printed or written to disk.** The values exist only inside the command substitution.

```bash
rand() { node -e "process.stdout.write(require('crypto').randomBytes($1).toString('$2'))"; }
az keyvault secret set --vault-name $KV -n edge-secret-current --value "$(rand 48 base64url)" -o none
# Rotation slot: starts equal to the current secret (the API de-duplicates); used when rotating (D-016).
az keyvault secret set --vault-name $KV -n edge-secret-previous \
  --value "$(az keyvault secret show --vault-name $KV -n edge-secret-current --query value -o tsv)" -o none
az keyvault secret set --vault-name $KV -n otp-pepper          --value "$(rand 48 base64url)" -o none
az keyvault secret set --vault-name $KV -n auth-secret         --value "$(rand 48 base64url)" -o none
az keyvault secret set --vault-name $KV -n mfa-encryption-key  --value "$(rand 32 base64)" -o none   # exactly 32 bytes (AUTH-11)
az keyvault secret list --vault-name $KV --query "[].name" -o tsv
```

| Key Vault secret | App env var | Used by | Format |
|---|---|---|---|
| `edge-secret-current` | `EDGE_SECRET_CURRENT` | api (D-016) | 48 random bytes, base64url (64 chars) |
| `edge-secret-previous` | `EDGE_SECRET_PREVIOUS` | api (rotation) | same as current until a rotation |
| `otp-pepper` | `OTP_PEPPER` | api (AUTH-4) | 48 random bytes, base64url |
| `auth-secret` | `AUTH_SECRET` | api (sessions, OAuth state) | 48 random bytes, base64url |
| `mfa-encryption-key` | `MFA_ENCRYPTION_KEY` | api (AUTH-11, staff TOTP) | 32 random bytes, base64 |

The same edge secret value must be set as `PLATFORM_EDGE_SECRET` in Vercel, but only when the platform is lit (OA-09). It is not needed for the dark start.

## 6. Pass 2: the migrations image + secret references, then migrate 🔑

```bash
export SOYL_KV_SECRET_REFS=true
export SOYL_MIGRATE_IMAGE=$MIGRATE_IMAGE        # api/worker stay on the placeholder for now
az deployment group what-if -g $RG -n soyl-prod-p2 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam
az deployment group create  -g $RG -n soyl-prod-p2 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
```

Run the migrations job. With no arguments the migrate image does five things:
1. Gets a managed-identity token for Postgres.
2. Bootstraps the Entra principals for `id-soyl-api-prod` and `id-soyl-worker-prod`.
3. Bootstraps the roles `soyl_migrator` / `soyl_app` and the `vector` extension.
4. Runs `db migrate up`.
5. Installs the pg-boss schema and grants it to `soyl_app`.

```bash
EXEC=$(az containerapp job start -g $RG -n $MIGRATE_JOB --query name -o tsv); echo $EXEC
# wait for Succeeded (about 1-3 min)
until s=$(az containerapp job execution show -g $RG -n $MIGRATE_JOB --job-execution-name $EXEC --query properties.status -o tsv); \
      [ "$s" = Succeeded ] || [ "$s" = Failed ]; do echo "$s"; sleep 15; done; echo "migrations: $s"
```

To read the logs, open the portal: Container Apps job, then Execution history, then Logs. You can also query Log Analytics:

```bash
LAW=$(out soyl-prod-p1 logAnalyticsWorkspaceName)
az monitor log-analytics query -w "$(az monitor log-analytics workspace show -g $RG -n $LAW --query customerId -o tsv)" \
  --analytics-query "ContainerAppConsoleLogs | where TimeGenerated > ago(30m) | where ContainerJobName == '$MIGRATE_JOB' or ContainerAppName == '$MIGRATE_JOB' | project TimeGenerated, Log | order by TimeGenerated asc" -o table
```

## 7. Seed the catalog and publish the authored content (release job) 🛠

The release job runs `migrate-entrypoint.mjs release`. It does three things:
1. Runs the bootstrap again.
2. Runs `db seed catalog` (boards, classes, subjects and chapters from `platform/catalog`; about 5,400 chapters).
3. Runs `content publish --authored`. This publishes every hand-authored chapter and exemplar (D-026) into Postgres, and writes release JSON to the `content-releases` container with the migrator identity.

Locally the same bundles published 28 chapters, with 2 tests each, in about 80 seconds.

```bash
EXEC=$(az containerapp job start -g $RG -n $RELEASE_JOB --query name -o tsv)
until s=$(az containerapp job execution show -g $RG -n $RELEASE_JOB --job-execution-name $EXEC --query properties.status -o tsv); \
      [ "$s" = Succeeded ] || [ "$s" = Failed ]; do echo "$s"; sleep 15; done; echo "release: $s"
```

The job is safe to re-run: the seed is idempotent and publish reports `unchanged`. Other one-off DB commands use the migrate job with argument overrides, for example the status check or the DB-7 admin bootstrap:

```bash
az containerapp job start -g $RG -n $MIGRATE_JOB --image $MIGRATE_IMAGE --container-name migrate \
  --args "/app/migrate-entrypoint.mjs" "migrate" "status"
```

## 8. Pass 3: the api and worker images 🔑

```bash
export SOYL_API_IMAGE=$API_IMAGE SOYL_WORKER_IMAGE=$WORKER_IMAGE SOYL_MIGRATE_IMAGE=$MIGRATE_IMAGE
az deployment group what-if -g $RG -n soyl-prod-p3 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam
az deployment group create  -g $RG -n soyl-prod-p3 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
az containerapp revision list -g $RG -n ca-soyl-api-prod    --query "[].{rev:name, active:properties.active, health:properties.healthState, running:properties.runningState}" -o table
az containerapp revision list -g $RG -n ca-soyl-worker-prod --query "[].{rev:name, active:properties.active, running:properties.runningState}" -o table
```

The API refuses to start on invalid configuration. If a revision stays unhealthy, look in the console log for `Invalid configuration:` followed by a list of problems.

## 9. Email domain: DNS records for the owner, verification, link 🛠

Fetch the records and give them to the owner. They go at the DNS host of `soylai.com`.

```bash
az deployment group show -g $RG -n soyl-prod-p1 --query properties.outputs.emailDnsRecords.value -o json
# or, any time:
ECS=$(out soyl-prod-p1 emailServiceName)
az communication email domain show -g $RG --email-service-name $ECS -n soylai.com --query verificationRecords -o json
```

Use the exact values from the output; the table shows what to expect.

| Record | Type | Purpose |
|---|---|---|
| `Domain` | TXT at `soylai.com` | ownership (verify this one first) |
| `SPF` | TXT at `soylai.com` | `v=spf1 include:spf.protection.outlook.com -all` (merge with an existing SPF record, do not add a second one) |
| `DKIM` | CNAME `selector1-azurecomm-prod-net._domainkey` | signing key 1 |
| `DKIM2` | CNAME `selector2-azurecomm-prod-net._domainkey` | signing key 2 |
| `DMARC` (advisory) | TXT at `_dmarc.soylai.com` | recommended: `v=DMARC1; p=quarantine; rua=mailto:<owner inbox>` |

After the owner has added the records, start the verification and wait until every record shows `Verified`:

```bash
for t in Domain SPF DKIM DKIM2; do
  az communication email domain initiate-verification -g $RG --email-service-name $ECS --domain-name soylai.com --verification-type $t -o none
done
az communication email domain show -g $RG --email-service-name $ECS -n soylai.com --query verificationStates -o json
```

Then link the domain to the Communication Services resource. This is pass 4, with the same images:

```bash
export SOYL_ACS_LINK_DOMAIN=true
az deployment group create -g $RG -n soyl-prod-p4 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
```

Until the domain is linked, any sign-in email fails with an ACS error (`otp_sent` is never logged). Because of the dark flag, no user can request one anyway.

## 10. Smoke tests 🛠

```bash
curl -fsS https://$API_FQDN/healthz; echo     # {"status":"ok"}
curl -fsS https://$API_FQDN/readyz;  echo     # {"status":"ready"}  (Postgres via Entra token + Redis via Entra token)
EDGE=$(az keyvault secret show --vault-name $KV -n edge-secret-current --query value -o tsv)   # needs the KV IP rule from step 4
curl -s -o /dev/null -w "%{http_code}\n" -H "x-soyl-edge-auth: $EDGE" https://$API_FQDN/v1/catalog/boards   # 404 while dark (GEN-4)
curl -s -o /dev/null -w "%{http_code}\n" -H "x-soyl-edge-auth: $EDGE" https://$API_FQDN/v1/auth/methods     # 404 while dark
```

`/readyz` = 200 is the end-to-end proof that the managed identities work: the api got a Postgres token (`id-soyl-api-prod` → `soyl_app`) and a Redis token, and authenticated with both.

**Optional private verification window.** Do this only with the owner's OK, because it briefly turns the API's flag on. Vercel stays dark, and `/v1/*` still requires the edge secret, so only the operator can reach it.

```bash
az containerapp update -g $RG -n ca-soyl-api-prod --set-env-vars PLATFORM_ENABLED=true -o none
curl -s -H "x-soyl-edge-auth: $EDGE" https://$API_FQDN/v1/catalog/boards | head -c 300; echo   # 200, CBSE / CISCE
curl -s -H "x-soyl-edge-auth: $EDGE" https://$API_FQDN/v1/auth/methods; echo                    # {"methods":["email"],"email":true,"phone":false,"google":false}
curl -s -o /dev/null -w "%{http_code}\n" -H "x-soyl-edge-auth: $EDGE" -H "origin: https://www.soylai.com" \
  -H "content-type: application/json" -d '{"phoneNumber":"+919876543210"}' https://$API_FQDN/v1/auth/phone/send-otp   # 404 method_disabled
# After step 9 only: a real code to the operator's inbox (ACS + managed identity end to end)
curl -s -H "x-soyl-edge-auth: $EDGE" -H "origin: https://www.soylai.com" -H "content-type: application/json" \
  -d '{"email":"<operator inbox>"}' https://$API_FQDN/v1/auth/email/send-otp; echo                # {"sent":true,...}
az containerapp update -g $RG -n ca-soyl-api-prod --set-env-vars PLATFORM_ENABLED=false -o none   # back to dark
```

## 11. Close the Key Vault firewall 🛠

Redeploy with no operator IP, which sets public network access to Disabled:

```bash
unset SOYL_KV_ALLOWED_IP
az deployment group create -g $RG -n soyl-prod-p5 -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
```

## 12. Rollback

- **App revision** (bad image or config): `activeRevisionsMode` is Single, so roll back by pointing the app at the previous digest:
  ```bash
  az containerapp revision list -g $RG -n ca-soyl-api-prod --query "[].{rev:name, image:properties.template.containers[0].image, created:properties.createdTime}" -o table
  az containerapp update -g $RG -n ca-soyl-api-prod --image <previous image@sha256:...> -o none
  ```
  Set `SOYL_API_IMAGE` to the same digest for the next Bicep run, so that run does not undo the rollback.
- **Migration**: migrations are expand/contract. Roll back only the newest one, and only if it is safe:
  ```bash
  az containerapp job start -g $RG -n $MIGRATE_JOB --image $MIGRATE_IMAGE --container-name migrate --args "/app/migrate-entrypoint.mjs" "migrate" "down"
  ```
- **Data**: point-in-time restore to a new server. PITR is kept 14 days, and geo-redundant backups go to South India.
  ```bash
  az postgres flexible-server restore -g $RG --name psql-soyl-prod-restore --source-server <psql name> --restore-time "<UTC ISO time>"
  ```
- **Infrastructure**: re-run `az deployment group create` from the previous commit, with the same `SOYL_*` variables.
- **Content**: re-run the release job with the previous commit's migrate image (`--image <old migrate digest>`); publish re-activates that content.
- **Full teardown** (should never be needed): `az group delete -n $RG`. Key Vault has purge protection: the vault name stays reserved for 90 days, and the soft-deleted vault cannot be purged.

## 13. Scale up before launch (owner go-ahead)

Change `platform/infra/params/prod.bicepparam`, then redeploy:

| Setting | Dark start | Launch |
|---|---|---|
| `pgTier` / `pgSkuName` | Burstable / Standard_B2s | GeneralPurpose / Standard_D2ds_v5 (or larger after load test) |
| `pgHaMode` | Disabled | ZoneRedundant |
| `redisSku` / `redisHighAvailability` | Balanced_B0 / false | Balanced_B1+ / true (`redisAofPersistence` true once credits use Redis) |
| `apiMinReplicas` / CPU | 1 / 0.5 | 2+ / 1.0 |
| `deployFrontDoor` | false | true when public assets exist |
| `deployAi` | false | true at M4 (OA-02) |
| `budgetAmount` | 25,000 | per COSTS.md |
| Vercel | flags unset | `PLATFORM_API_ORIGIN=https://<apiFqdn>`, `PLATFORM_EDGE_SECRET` (= `edge-secret-current`), flags on (OA-09) |

Also needed before launch:
- the consent adapter (OA-08), which replaces `CONSENT_PROVIDER=unavailable`;
- a decision on the AUTH-15 purge (`UNCONSENTED_PURGE`);
- Google and staff sign-in (OA-05, AUTH-11): admin and reviewer accounts cannot sign in without Google.

## Known first-deploy risks (not yet seen against a live Azure)

1. **Key Vault references with the vault firewall closed** (`bypass: None`, private endpoint only). Container Apps resolves secrets with the app identity from inside the VNet-integrated environment. If a revision fails with a secret-fetch error, temporarily allow the Azure-services bypass, or keep the operator IP rule until it is fixed.
2. **ACS**:
   - `dataLocation: 'India'` must be offered for both Communication and Email services. If the RP rejects it, use `'Asia Pacific'` and record the residency change.
   - The domain can only be linked after verification (step 9).
   - Sender role: if `Communication and Email Service Owner` is missing in the tenant, the fallback is Contributor on the ACS resource only.
3. **Burstable + geo-redundant backup**: if the Postgres create rejects `geoRedundantBackup: Enabled` for Burstable, set `pgGeoRedundantBackup = 'Disabled'`. This is a one-time choice, so record it.
4. **Postgres Entra-only create with no admin login**, and the Redis access-policy assignment names: carried over from infra-azure M1 follow-up 1.
5. **Worker scale rule**: a CPU rule with min = max = 1 is accepted. Do not set min 0 with only a CPU rule, because it would never start.
