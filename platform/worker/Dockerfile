# @soyl/worker image (pg-boss background jobs on Azure Container Apps, no ingress - INFRA-7).
# Build context: platform/  (D-022)
#
#   docker build -f platform/worker/Dockerfile -t soyl-worker platform/
#
# Contract (D-022): `npm run build -w @soyl/worker` emits one esbuild bundle at worker/dist/index.js
# (workspace packages bundled, native deps external); `node dist/index.js` listens on PORT (8080) if it serves a health endpoint.
# INFRA-10: base images pinned by digest; final stage is distroless (no shell, no npm, no build
# tools), runs as the non-root `nonroot` user (uid 65532), NODE_ENV=production, no secrets
# (configuration arrives as env vars / Key Vault references at runtime, INFRA-6).

# Base images are pinned by digest (INFRA-10) directly in the FROM lines so Dependabot can bump them:
#   build:   node:24-bookworm-slim                        (digest resolved 2026-10-26)
#   runtime: gcr.io/distroless/nodejs24-debian12:nonroot  (digest resolved 2026-10-26)

# ---- build: full workspace install for @soyl/worker, then bundle ----
FROM node:24-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS build
ENV CI=true NPM_CONFIG_AUDIT=false NPM_CONFIG_FUND=false NPM_CONFIG_UPDATE_NOTIFIER=false
WORKDIR /src
COPY . .
RUN npm ci --workspace @soyl/worker --include-workspace-root=false \
 && npm run build --workspace @soyl/worker \
 && test -f worker/dist/index.js

# ---- deps: production dependencies only (the externals the bundle still requires) ----
# Workspace packages are bundled into dist/index.js, so their (dangling) links are dropped.
FROM node:24-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS deps
ENV CI=true NPM_CONFIG_AUDIT=false NPM_CONFIG_FUND=false NPM_CONFIG_UPDATE_NOTIFIER=false
WORKDIR /src
COPY . .
RUN npm ci --omit=dev --workspace @soyl/worker --include-workspace-root=false \
 && mkdir -p /out/node_modules \
 && cp -a node_modules/. /out/node_modules/ \
 && if [ -d worker/node_modules ]; then cp -a worker/node_modules/. /out/node_modules/; fi \
 && rm -rf /out/node_modules/@soyl /out/node_modules/.package-lock.json

# ---- runtime ----
FROM gcr.io/distroless/nodejs24-debian12:nonroot@sha256:14d42e2511532589a7c7e01a753667a74fcc96266e137e8125006b87b0c32d0a
ENV NODE_ENV=production PORT=8080
WORKDIR /app
COPY --from=deps --chown=nonroot:nonroot /out/node_modules ./node_modules
COPY --from=build --chown=nonroot:nonroot /src/worker/package.json ./package.json
COPY --from=build --chown=nonroot:nonroot /src/worker/dist ./dist
USER nonroot
# distroless/nodejs ENTRYPOINT is the node binary.
CMD ["dist/index.js"]
