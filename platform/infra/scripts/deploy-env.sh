#!/usr/bin/env bash
# Deploy one environment (dev | stg | prod). Called by .github/workflows/platform-deploy.yml after
# azure/login (OIDC, INFRA-8); also usable by an operator with `az login` (runbooks/deploy-rollback.md).
#
#   platform/infra/scripts/deploy-env.sh <env> [--what-if]
#
# Inputs (environment variables):
#   NEW_API_IMAGE, NEW_WORKER_IMAGE, NEW_MIGRATE_IMAGE  full image refs (registry/repo@sha256:...)
#                                                        built by this run; empty = not built
#   SOYL_*                                               read by params/<env>.bicepparam
#
# Order (expand/contract migrations, runbooks/deploy-rollback.md):
#   1. Bicep deployment. Apps keep their CURRENT image (if they already run a real one); the
#      migrations job gets the NEW image.
#   2. Run the migrations job and wait for it.
#   3. Roll the api and worker apps to the new images (new revision each).
#   4. Smoke test /healthz and /readyz on the API FQDN.
set -euo pipefail

ENV="${1:?usage: deploy-env.sh <dev|stg|prod> [--what-if]}"
MODE="${2:-}"
case "$ENV" in dev|stg|prod) ;; *) echo "unknown env $ENV" >&2; exit 2 ;; esac

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RG="rg-soyl-platform-${ENV}"
ACR_NAME="${SOYL_ACR_NAME:-crsoylplatform}"
export SOYL_ACR_NAME="$ACR_NAME"
LOGIN_SERVER="${ACR_NAME}.azurecr.io"
API_APP="ca-soyl-api-${ENV}"
WORKER_APP="ca-soyl-worker-${ENV}"
JOB="caj-soyl-migrate-${ENV}"
DEPLOYMENT="soyl-${ENV}-$(date -u +%Y%m%d%H%M%S)"
SUMMARY="${GITHUB_STEP_SUMMARY:-/dev/null}"

log() { echo "[deploy-env ${ENV}] $*"; }
is_real_image() { [[ "${1:-}" == "${LOGIN_SERVER}/"* ]]; }
current_app_image() { az containerapp show -g "$RG" -n "$1" --query 'properties.template.containers[0].image' -o tsv 2>/dev/null || true; }
current_job_image() { az containerapp job show -g "$RG" -n "$JOB" --query 'properties.template.containers[0].image' -o tsv 2>/dev/null || true; }

API_CUR="$(current_app_image "$API_APP")"
WORKER_CUR="$(current_app_image "$WORKER_APP")"
JOB_CUR="$(current_job_image)"

# 1. Apps keep a real current image during the infra deployment; first deploys take the new one.
if is_real_image "$API_CUR"; then export SOYL_API_IMAGE="$API_CUR"; else export SOYL_API_IMAGE="${NEW_API_IMAGE:-}"; fi
if is_real_image "$WORKER_CUR"; then export SOYL_WORKER_IMAGE="$WORKER_CUR"; else export SOYL_WORKER_IMAGE="${NEW_WORKER_IMAGE:-}"; fi
if [ -n "${NEW_MIGRATE_IMAGE:-}" ]; then export SOYL_MIGRATE_IMAGE="$NEW_MIGRATE_IMAGE"
elif is_real_image "$JOB_CUR"; then export SOYL_MIGRATE_IMAGE="$JOB_CUR"; else export SOYL_MIGRATE_IMAGE=""; fi

log "api image during infra deploy:     ${SOYL_API_IMAGE:-<placeholder>}"
log "worker image during infra deploy:  ${SOYL_WORKER_IMAGE:-<placeholder>}"
log "migrate image:                     ${SOYL_MIGRATE_IMAGE:-<placeholder>}"

if [ "$MODE" = "--what-if" ]; then
  log "what-if against $RG"
  az deployment group what-if -g "$RG" -n "$DEPLOYMENT" \
    -f "$HERE/main.bicep" -p "$HERE/params/${ENV}.bicepparam" --result-format FullResourcePayloads | tee whatif.txt
  { echo "### Bicep what-if: ${ENV}"; echo '```'; cat whatif.txt; echo '```'; } >> "$SUMMARY"
  exit 0
fi

log "az deployment group create $DEPLOYMENT -> $RG"
az deployment group create -g "$RG" -n "$DEPLOYMENT" \
  -f "$HERE/main.bicep" -p "$HERE/params/${ENV}.bicepparam" \
  --query properties.outputs -o json > outputs.json
FQDN="$(node -e 'console.log(require("./outputs.json").apiFqdn.value)')"
log "api fqdn: $FQDN"

# 2. Migrations (only when a real migrate image exists).
if is_real_image "${SOYL_MIGRATE_IMAGE:-}"; then
  log "starting migrations job $JOB"
  EXEC="$(az containerapp job start -g "$RG" -n "$JOB" --query name -o tsv)"
  status="Running"
  for _ in $(seq 1 120); do
    status="$(az containerapp job execution show -g "$RG" -n "$JOB" --job-execution-name "$EXEC" --query properties.status -o tsv)"
    case "$status" in Succeeded|Failed|Stopped|Degraded) break ;; esac
    sleep 15
  done
  log "migrations $EXEC: $status"
  echo "- migrations job \`$EXEC\`: **$status**" >> "$SUMMARY"
  if [ "$status" != "Succeeded" ]; then
    echo "::error title=Migrations failed::$JOB execution $EXEC ended $status. Apps were NOT updated. Logs: ContainerAppConsoleLogs / job execution in the portal."
    exit 1
  fi
else
  log "no migrate image yet (platform/db not present): skipping migrations"
fi

# 3. Roll the apps to the new images.
roll() {
  local app="$1" new="$2" deployed="$3"
  if [ -z "$new" ]; then log "$app: no new image built, unchanged"; return; fi
  if [ "$new" = "$deployed" ]; then log "$app: already on $new"; return; fi
  log "$app -> $new"
  az containerapp update -g "$RG" -n "$app" --image "$new" --revision-suffix "r${GITHUB_RUN_NUMBER:-manual}-$(date -u +%H%M%S)" -o none
}
roll "$API_APP" "${NEW_API_IMAGE:-}" "$SOYL_API_IMAGE"
roll "$WORKER_APP" "${NEW_WORKER_IMAGE:-}" "$SOYL_WORKER_IMAGE"

# 4. Smoke test (health endpoints are exempt from the edge secret, API-2).
FINAL_API="$(current_app_image "$API_APP")"
if is_real_image "$FINAL_API"; then
  for path in /healthz /readyz; do
    ok=""
    for _ in $(seq 1 30); do
      if curl -fsS --max-time 10 "https://${FQDN}${path}" >/dev/null; then ok=1; break; fi
      sleep 10
    done
    if [ -z "$ok" ]; then
      echo "::error title=Smoke test failed::https://${FQDN}${path} did not return 2xx. Roll back: runbooks/deploy-rollback.md"
      exit 1
    fi
    log "smoke ${path}: OK"
  done
  echo "- smoke: \`/healthz\` and \`/readyz\` OK on https://${FQDN}" >> "$SUMMARY"
else
  log "api runs the placeholder image (platform/api not built yet): smoke test skipped"
  echo "- smoke: skipped (api placeholder image; platform/api not present yet)" >> "$SUMMARY"
fi
{
  echo "- api image: \`${FINAL_API}\`"
  echo "- worker image: \`$(current_app_image "$WORKER_APP")\`"
} >> "$SUMMARY"
log "done"
