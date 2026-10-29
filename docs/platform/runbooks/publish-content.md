# Runbook: publish content to production

Content (chapters, chapter tests, frozen test series, the catalog) reaches production only through the **release job** `caj-soyl-release-<env>`. There is no admin upload and no content API that writes. This keeps every published item reviewed in git first (D-026, ADR-019).

## How it works

1. Authored content is merged to `platform/main` (`platform/content/authored/**`, `platform/catalog/**`). See [content.md §3](../content.md#3-authoring-workflow-hand-authored-d-025d-026).
2. The **migrate image** is built from that commit. `platform/infra/docker/bundle-migrate.sh` copies `db/migrations`, `catalog`, `content/authored` (including `series/`) and `content-templates/exemplars` into it.
3. The release job runs `migrate-entrypoint.mjs release`: Entra bootstrap → `db seed catalog` (idempotent) → `content publish --authored`. Publish writes each `ChapterRelease` to Blob (`content-releases/content/releases/<unit>/<version>.json`), ingests and activates it in Postgres with its chapter tests, then ingests every frozen series with question versions remapped to the published ones.
4. Re-running is safe: unchanged chapters report `unchanged`, changed items get version + 1, an unchanged frozen paper is left alone. A frozen series that references an unpublished question is refused whole (exit 1).

## Before you publish

From `platform/` on the commit you will ship (all must pass; see [content.md §5](../content.md#5-gates-and-how-to-run-them)):

```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 10 --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
npx vitest run --root content-pipeline test/series.test.ts
```

Optional local rehearsal of the exact release against a fresh embedded database:

```
npm run db -w @soyl/db -- migrate up
npm run db -w @soyl/db -- seed catalog
npm run content -- publish --authored          # "N published, 0 unchanged, 0 refused/failed"
npm run content -- coverage
```

## Publish to production (dark)

Content changes ride on a new migrate image. If the code changed too, follow [update-dark-backend.md](update-dark-backend.md) (it includes this). For a content-only update:

```bash
# prod-first-deploy.md §0 variables and helpers, then:
export TAG=$(git rev-parse --short=12 HEAD) RG=rg-soyl-platform-prod
az acr build -r $SOYL_ACR_NAME -t soyl-migrate:$TAG -f infra/docker/migrate.Dockerfile platform
NEW=$SOYL_ACR_NAME.azurecr.io/soyl-migrate@$(az acr repository show -n $SOYL_ACR_NAME --image soyl-migrate:$TAG --query digest -o tsv)

# one-off run with the new image (no Bicep change needed for a single release).
# Start it through REST with the job's full container and only the image swapped:
# `az containerapp job start --image ... --args ...` sends a container without the job's env and secrets,
# and the execution fails within a minute with no logs (2026-10-29).
az containerapp job show -g $RG -n caj-soyl-release-prod -o json > job.json
NEW=$NEW node -e '
const fs = require("fs"); const j = require("./job.json"); const c = { ...j.properties.template.containers[0] };
c.image = process.env.NEW; c.args = ["/app/migrate-entrypoint.mjs", "release"];
fs.writeFileSync("start.json", JSON.stringify({ containers: [c] }));'
EXEC=$(az rest --method post --url "https://management.azure.com$(node -p 'require("./job.json").id')/start?api-version=2024-03-01" \
         --body @start.json --query name -o tsv); rm job.json start.json
until s=$(az containerapp job execution show -g $RG -n caj-soyl-release-prod --job-execution-name $EXEC --query properties.status -o tsv); \
      [ "$s" = Succeeded ] || [ "$s" = Failed ]; do echo "$s"; sleep 15; done; echo "release: $s"
```

The container is named `release` in this job and `migrate` in `caj-soyl-migrate-prod` (`platform/infra/modules/containerApps.bicep`). Then set `SOYL_MIGRATE_IMAGE=$NEW` for the next Bicep run so the job definition matches what ran. If the new content needs a migration (a new question type, for example), run the migrations job with the same image first.

Expected log lines: `db seed catalog` with `"errors": []`, then `publish: N published, M unchanged, 0 refused/failed` and the frozen series per subject.

## After publishing

- Record the commit, the migrate digest and the publish counts in [STATUS.md](../STATUS.md).
- CDN purge is not wired (no Front Door yet); when it exists, edge copies of content responses age out within about 70 minutes (backend-api M2).
- The web chapter pages are ISR with `revalidate = 600`: a page that was rendered as 404 before the publish stays 404 until the first request more than 10 minutes after its render (a query string does not bypass it). Check new chapters about 10 minutes after the release, requesting each page twice.

## Roll back

- Re-run the release job with the previous migrate image digest: publish re-activates that content.
- Or, with database access, `npm run content -- rollback --unit <chapter id> --to <version>` (re-activates an earlier release of one chapter).
- Attempts already taken keep pointing at the question versions they used (D-023); nothing is rewritten.

## Re-freezing a series

Only in a reviewed commit, and only before students use the series (ADR-019). After launch, add papers (mock 7, …) instead.

```
npm run content -- assemble --board cbse --class 10 --subject <subject> --series --source files --freeze --refreeze mocks,may
npx vitest run --root content-pipeline test/series.test.ts
```
