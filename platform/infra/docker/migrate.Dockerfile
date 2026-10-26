# Migrations image for the Container Apps job caj-soyl-migrate-<env> (ARCHITECTURE 4: migrations run
# as a pre-deploy job; DB-8). Build context: platform/  (D-022)
#
#   docker build -f platform/infra/docker/migrate.Dockerfile -t soyl-migrate platform/
#
# Runs `npm run db -w @soyl/db -- migrate up` equivalent through infra/docker/migrate-entrypoint.mjs,
# which first obtains an Entra token with the job's managed identity (INFRA-2) and bootstraps the
# database roles (DB-1). INFRA-10: base images pinned by digest, non-root, no build tools or secrets
# in the final stage, NODE_ENV=production.

# Base images are pinned by digest (INFRA-10) directly in the FROM lines so Dependabot can bump them:
#   build:   node:24-bookworm-slim                        (digest resolved 2026-10-26)
#   runtime: gcr.io/distroless/nodejs24-debian12:nonroot  (digest resolved 2026-10-26)

FROM node:24-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS build
ENV CI=true NPM_CONFIG_AUDIT=false NPM_CONFIG_FUND=false NPM_CONFIG_UPDATE_NOTIFIER=false
WORKDIR /src
COPY . .
# tsx runs the TypeScript migrator directly, so @soyl/db's dev dependencies are needed at runtime.
# The embedded-postgres server binaries (local stand-in only, D-008) are removed.
RUN test -f db/package.json || (echo "platform/db does not exist yet" && exit 1) \
 && npm ci --workspace @soyl/db --include-workspace-root=false \
 && rm -rf node_modules/@embedded-postgres \
 && mkdir -p /out \
 && cp -a node_modules package.json /out/ \
 && cp -a db /out/db \
 && cp -a shared /out/shared \
 && cp -a catalog /out/catalog \
 && cp infra/docker/migrate-entrypoint.mjs /out/migrate-entrypoint.mjs \
 && rm -rf /out/db/node_modules/.cache /out/db/.data

FROM gcr.io/distroless/nodejs24-debian12:nonroot@sha256:14d42e2511532589a7c7e01a753667a74fcc96266e137e8125006b87b0c32d0a
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=nonroot:nonroot /out/ /app/
USER nonroot
# distroless/nodejs ENTRYPOINT is the node binary.
CMD ["/app/migrate-entrypoint.mjs"]
