# Runbook: update the dark production backend to a newer `platform/main`

Use this to move `rg-soyl-platform-prod` (deployed dark on 2026-10-27, D-031) to a newer commit of `platform/main`: new API/worker code, new migrations and new content. The platform stays dark (`PLATFORM_ENABLED=false`) throughout.

Reference for every command and right: [prod-first-deploy.md](prod-first-deploy.md). This runbook reuses its variables and helpers (§0) and differs in three ways: the infrastructure already exists, the email domain is already linked, and the Key Vault firewall is closed.

**Current gap (2026-10-28):** production runs images from `0dee08c` (migrate image from `9f5926e`): migrations 0000–0007 and 41 chapters. `platform/main` @ 49aa8a4 adds migrations `0008_ai_gateway`, `0009_billing` and `0010_leagues`; the AI gateway and billing code (both off by default in prod); weekly leagues, the live-event detail route and AI-answer reports; 58 more chapters; and the frozen Science, Maths and SST series (41 papers).

## 0. Before you start

- [ ] `platform-ci` is green for the target commit on GitHub.
- [ ] Read the handoffs merged since the last deploy for **new required settings**. A missing required setting stops the API from starting (`Invalid configuration:` in the console log). For 0dee08c → 49aa8a4 none are required: AI (`AI_PROVIDER`, `CONTENT_SAFETY_PROVIDER`, `BLOB_PROVIDER`) and billing (`RAZORPAY_PROVIDER`) default to `disabled` outside local/test, and the stand-ins are refused in prod (GEN-3).
- [ ] The owner is reachable for the device-code sign-in, and you have Owner or User Access Administrator on `rg-soyl-platform-prod` (Bicep re-asserts role assignments).

```bash
git fetch origin && git checkout --detach origin/platform/main
# §0 of prod-first-deploy.md: az() wrapper, PATH for bicep, extensions, az login, az account set
export SOYL_ACR_NAME=crsoylplatform RG=rg-soyl-platform-prod LOC=centralindia
export SOYL_ALERT_EMAIL="<alert inbox>"
export TAG=$(git rev-parse --short=12 HEAD)
out() { az deployment group show -g $RG -n "$1" --query "properties.outputs.$2.value" -o tsv; }
export MIGRATE_JOB=caj-soyl-migrate-prod RELEASE_JOB=caj-soyl-release-prod
```

Record the images currently running, for rollback:

```bash
az containerapp show -g $RG -n ca-soyl-api-prod    --query "properties.template.containers[0].image" -o tsv
az containerapp show -g $RG -n ca-soyl-worker-prod --query "properties.template.containers[0].image" -o tsv
az containerapp job show -g $RG -n $MIGRATE_JOB    --query "properties.template.containers[0].image" -o tsv
```

## 1. Build the three images in Azure 🛠

From the repository root (context `platform/`), exactly as prod-first-deploy §3:

```bash
az acr build -r $SOYL_ACR_NAME -t soyl-api:$TAG     -f api/Dockerfile                 platform
az acr build -r $SOYL_ACR_NAME -t soyl-worker:$TAG  -f worker/Dockerfile              platform
az acr build -r $SOYL_ACR_NAME -t soyl-migrate:$TAG -f infra/docker/migrate.Dockerfile platform
digest() { az acr repository show -n $SOYL_ACR_NAME --image "$1:$TAG" --query digest -o tsv; }
export SOYL_API_IMAGE="$SOYL_ACR_NAME.azurecr.io/soyl-api@$(digest soyl-api)"
export SOYL_WORKER_IMAGE="$SOYL_ACR_NAME.azurecr.io/soyl-worker@$(digest soyl-worker)"
export SOYL_MIGRATE_IMAGE="$SOYL_ACR_NAME.azurecr.io/soyl-migrate@$(digest soyl-migrate)"
```

## 2. Point the migrations and release jobs at the new migrate image 🔑

Deploy Bicep with the **new migrate image** and the **current** api/worker images, so the apps do not roll before the schema is migrated (expand/contract):

```bash
export SOYL_KV_SECRET_REFS=true SOYL_ACS_LINK_DOMAIN=true    # both already true in production; keep them
unset SOYL_KV_ALLOWED_IP                                       # keep the Key Vault closed
API_NOW=$(az containerapp show -g $RG -n ca-soyl-api-prod --query "properties.template.containers[0].image" -o tsv)
WORKER_NOW=$(az containerapp show -g $RG -n ca-soyl-worker-prod --query "properties.template.containers[0].image" -o tsv)
SOYL_API_IMAGE=$API_NOW SOYL_WORKER_IMAGE=$WORKER_NOW \
  az deployment group what-if -g $RG -n soyl-prod-$TAG-a -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam
SOYL_API_IMAGE=$API_NOW SOYL_WORKER_IMAGE=$WORKER_NOW \
  az deployment group create  -g $RG -n soyl-prod-$TAG-a -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
```

Read the what-if before creating: expect image changes on the two jobs and any new Bicep resources from the merged commits. Stop and investigate anything that deletes or replaces a stateful resource.

## 3. Migrate 🛠

```bash
EXEC=$(az containerapp job start -g $RG -n $MIGRATE_JOB --query name -o tsv)
until s=$(az containerapp job execution show -g $RG -n $MIGRATE_JOB --job-execution-name $EXEC --query properties.status -o tsv); \
      [ "$s" = Succeeded ] || [ "$s" = Failed ]; do echo "$s"; sleep 15; done; echo "migrations: $s"
```

Expect the log to show the new migrations applied (for 49aa8a4: `0008_ai_gateway`, `0009_billing`, `0010_leagues`; "11 applied, 0 pending" on a status check) and the pg-boss schema ready. Logs: prod-first-deploy §6.

## 4. Release content 🛠

```bash
EXEC=$(az containerapp job start -g $RG -n $RELEASE_JOB --query name -o tsv)
until s=$(az containerapp job execution show -g $RG -n $RELEASE_JOB --job-execution-name $EXEC --query properties.status -o tsv); \
      [ "$s" = Succeeded ] || [ "$s" = Failed ]; do echo "$s"; sleep 15; done; echo "release: $s"
```

Expect `publish: N published, M unchanged, 0 refused/failed` and the frozen series ingested. Details: [publish-content.md](publish-content.md).

## 5. Roll the api and worker 🔑

```bash
az deployment group create -g $RG -n soyl-prod-$TAG-b -f platform/infra/main.bicep -p platform/infra/params/prod.bicepparam -o none
az containerapp revision list -g $RG -n ca-soyl-api-prod    --query "[].{rev:name, active:properties.active, health:properties.healthState}" -o table
az containerapp revision list -g $RG -n ca-soyl-worker-prod --query "[].{rev:name, active:properties.active, running:properties.runningState}" -o table
```

(`SOYL_API_IMAGE`, `SOYL_WORKER_IMAGE` and `SOYL_MIGRATE_IMAGE` from step 1 are still exported.)

## 6. Smoke test 🛠

```bash
API_FQDN=$(az containerapp show -g $RG -n ca-soyl-api-prod --query properties.configuration.ingress.fqdn -o tsv)
curl -fsS https://$API_FQDN/healthz; echo    # {"status":"ok"}
curl -fsS https://$API_FQDN/readyz;  echo    # {"status":"ready"}  (Entra tokens to Postgres and Redis work)
curl -s -o /dev/null -w "%{http_code}\n" https://$API_FQDN/v1/catalog/boards   # 404 while dark (GEN-4 is checked before edge auth)
```

The Key Vault is closed (pass 5), so the operator cannot read the edge secret. The private verification window of prod-first-deploy §10 (flag on briefly, calls with the edge secret) needs a temporary operator IP rule (`SOYL_KV_ALLOWED_IP`, then redeploy without it). Do it only with the owner's OK.

## 7. Record it

Update [STATUS.md](../STATUS.md) "Production deployment" with the commit, image digests, migrations applied and the release counts.

## Rollback

- Apps: `az containerapp update -g $RG -n ca-soyl-api-prod --image <previous digest>` (and the worker); export the same digests as `SOYL_*_IMAGE` for the next Bicep run.
- Migration: only the newest, only if safe: `az containerapp job start -g $RG -n $MIGRATE_JOB --image $SOYL_MIGRATE_IMAGE --container-name migrate --args "/app/migrate-entrypoint.mjs" "migrate" "down"`. Roll the apps back first.
- Content: re-run the release job with the previous migrate image (`--image <old migrate digest>`).
- More: prod-first-deploy §12.
