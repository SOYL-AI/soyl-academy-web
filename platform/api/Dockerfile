# @soyl/api image (Fastify API on Azure Container Apps).
# Build context: platform/  (D-022)
#
#   docker build -f platform/api/Dockerfile -t soyl-api platform/
#
# Contract (D-022): `npm run build -w @soyl/api` emits one esbuild bundle at api/dist/index.js
# (workspace packages bundled, native deps external); `node dist/index.js` listens on PORT (8080).
# INFRA-10: base images pinned by digest; final stage is distroless (no shell, no npm, no build
# tools), runs as the non-root `nonroot` user (uid 65532), NODE_ENV=production, no secrets
# (configuration arrives as env vars / Key Vault references at runtime, INFRA-6).

# Base images are pinned by digest (INFRA-10) directly in the FROM lines so Dependabot can bump them:
#   build:   node:24-trixie-slim                          (digest resolved 2026-10-26)
#   runtime: gcr.io/distroless/nodejs24-debian13:nonroot  (digest resolved 2026-10-26; debian12 digest shipped libssl3 with open HIGH/CRITICAL fixes)

# ---- build: full workspace install for @soyl/api, then bundle ----
FROM node:24-trixie-slim@sha256:43b9ba1142b8dcf33fa8f922ca1be85714adc444e0586c7cf7726daaeabc1bea AS build
ENV CI=true NPM_CONFIG_AUDIT=false NPM_CONFIG_FUND=false NPM_CONFIG_UPDATE_NOTIFIER=false
WORKDIR /src
COPY . .
RUN npm ci --workspace @soyl/api --include-workspace-root=false \
 && npm run build --workspace @soyl/api \
 && test -f api/dist/index.js

# ---- deps: production dependencies only (the externals the bundle still requires) ----
# Workspace packages are bundled into dist/index.js, so their (dangling) links are dropped.
FROM node:24-trixie-slim@sha256:43b9ba1142b8dcf33fa8f922ca1be85714adc444e0586c7cf7726daaeabc1bea AS deps
ENV CI=true NPM_CONFIG_AUDIT=false NPM_CONFIG_FUND=false NPM_CONFIG_UPDATE_NOTIFIER=false
WORKDIR /src
COPY . .
RUN npm ci --omit=dev --workspace @soyl/api --include-workspace-root=false \
 && mkdir -p /out/node_modules \
 && cp -a node_modules/. /out/node_modules/ \
 && if [ -d api/node_modules ]; then cp -a api/node_modules/. /out/node_modules/; fi \
 && rm -rf /out/node_modules/@soyl /out/node_modules/.package-lock.json

# ---- runtime ----
FROM gcr.io/distroless/nodejs24-debian13:nonroot@sha256:cb606325b7ec4af55462cb0b424a53b452a5b4a894ffe841fcf1048d216fb9f8
ENV NODE_ENV=production PORT=8080
WORKDIR /app
COPY --from=deps --chown=nonroot:nonroot /out/node_modules ./node_modules
COPY --from=build --chown=nonroot:nonroot /src/api/package.json ./package.json
COPY --from=build --chown=nonroot:nonroot /src/api/dist ./dist
USER nonroot
EXPOSE 8080
# Container Apps uses its own probes (/healthz, /readyz in containerApps.bicep); this HEALTHCHECK
# serves `docker run` / docker compose users. No shell in distroless, so node does the request.
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD ["/nodejs/bin/node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||8080)+'/healthz').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
# distroless/nodejs ENTRYPOINT is the node binary.
CMD ["dist/index.js"]
