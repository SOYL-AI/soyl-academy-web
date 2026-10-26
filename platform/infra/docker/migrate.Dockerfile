# Migrations image for the Container Apps job caj-soyl-migrate-<env> (ARCHITECTURE 4: migrations run
# as a pre-deploy job; DB-8). Build context: platform/  (D-022)
#
#   docker build -f platform/infra/docker/migrate.Dockerfile -t soyl-migrate platform/
#
# Equivalent of `npm run db -w @soyl/db -- migrate up`, run through infra/docker/migrate-entrypoint.mjs,
# which first obtains an Entra token with the job's managed identity (INFRA-2) and bootstraps the
# database roles (DB-1). INFRA-10: base images pinned by digest, non-root, no build tools or secrets
# in the final stage, NODE_ENV=production.

# Base images are pinned by digest (INFRA-10) directly in the FROM lines so Dependabot can bump them:
#   build:   node:24-trixie-slim                          (digest resolved 2026-10-26)
#   runtime: gcr.io/distroless/nodejs24-debian13:nonroot  (digest resolved 2026-10-26; debian12 digest shipped libssl3 with open HIGH/CRITICAL fixes)

FROM node:24-trixie-slim@sha256:43b9ba1142b8dcf33fa8f922ca1be85714adc444e0586c7cf7726daaeabc1bea AS build
ENV CI=true NPM_CONFIG_AUDIT=false NPM_CONFIG_FUND=false NPM_CONFIG_UPDATE_NOTIFIER=false
WORKDIR /src
COPY . .
# The @soyl/db CLI and the entrypoint are bundled with esbuild (workspace + npm deps inlined), so the
# final image ships no node_modules at all: no dev tooling, no esbuild/Go binaries, no
# embedded-postgres server (local stand-in only, D-008). Migration SQL and the catalog are copied
# next to the bundles and located through SOYL_MIGRATIONS_DIR / SOYL_CATALOG_DIR.
RUN test -f db/package.json || (echo "platform/db does not exist yet" && exit 1)
RUN npm ci --workspace @soyl/db --include-workspace-root=false
RUN sh infra/docker/bundle-migrate.sh /out

FROM gcr.io/distroless/nodejs24-debian13:nonroot@sha256:cb606325b7ec4af55462cb0b424a53b452a5b4a894ffe841fcf1048d216fb9f8
ENV NODE_ENV=production \
    MIGRATE_CLI=/app/migrate-cli.mjs \
    SOYL_MIGRATIONS_DIR=/app/db/migrations \
    SOYL_CATALOG_DIR=/app/catalog
WORKDIR /app
COPY --from=build --chown=nonroot:nonroot /out/ /app/
USER nonroot
# distroless/nodejs ENTRYPOINT is the node binary.
CMD ["/app/migrate-entrypoint.mjs"]
