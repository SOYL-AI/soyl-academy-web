#!/bin/sh
# Bundles the migrations image contents into <out>/ (used by migrate.Dockerfile; also runnable from
# platform/ after `npm ci` to test the bundle without Docker).
#   sh infra/docker/bundle-migrate.sh <out-dir>
#
#   migrate-cli.mjs         @soyl/db CLI (migrate, seed catalog, admin bootstrap)
#   migrate-entrypoint.mjs  Entra token + role bootstrap, then runs the steps (see that file)
#   release-cli.mjs         pg-boss schema install (worker `migrate`) + content pipeline CLI
#   db/migrations, catalog, content/authored, content-templates/exemplars   data read at runtime
set -eu
OUT="${1:?usage: bundle-migrate.sh <out-dir>}"
ESBUILD=node_modules/.bin/esbuild
BANNER="import { createRequire as __soylCreateRequire } from 'node:module'; const require = __soylCreateRequire(import.meta.url);"
# Optional/native modules never needed in the image (@azure/identity: the managed identity is called
# directly, shared/azure/identity.ts).
EXTERNALS="--external:embedded-postgres --external:@embedded-postgres/* --external:pg-native --external:@azure/identity"
mkdir -p "$OUT/db"

# shellcheck disable=SC2086
"$ESBUILD" db/src/cli.ts --bundle --platform=node --format=esm --target=node24 --log-level=warning \
  $EXTERNALS "--banner:js=$BANNER" --outfile="$OUT/migrate-cli.mjs"

# shellcheck disable=SC2086
"$ESBUILD" infra/docker/migrate-entrypoint.mjs --bundle --platform=node --format=esm --target=node24 --log-level=warning \
  $EXTERNALS "--banner:js=$BANNER" --outfile="$OUT/migrate-entrypoint.mjs"

# shellcheck disable=SC2086
"$ESBUILD" infra/docker/release-cli.ts --bundle --platform=node --format=esm --target=node24 --log-level=warning \
  $EXTERNALS "--banner:js=$BANNER" --outfile="$OUT/release-cli.mjs"

rm -rf "$OUT/db/migrations" "$OUT/catalog" "$OUT/content" "$OUT/content-templates"
cp -R db/migrations "$OUT/db/migrations"
cp -R catalog "$OUT/catalog"
rm -rf "$OUT/catalog/sources"
mkdir -p "$OUT/content" "$OUT/content-templates"
cp -R content/authored "$OUT/content/authored"
cp -R content-templates/exemplars "$OUT/content-templates/exemplars"
echo "bundled: $OUT/migrate-cli.mjs, $OUT/migrate-entrypoint.mjs, $OUT/release-cli.mjs, db/migrations, catalog, content/authored, content-templates/exemplars"
