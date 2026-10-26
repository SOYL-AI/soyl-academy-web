#!/bin/sh
# Bundles the @soyl/db CLI and the migrations entrypoint into <out>/ (used by migrate.Dockerfile;
# also runnable from platform/ after `npm ci` to test the bundle without Docker).
#   sh infra/docker/bundle-migrate.sh <out-dir>
set -eu
OUT="${1:?usage: bundle-migrate.sh <out-dir>}"
ESBUILD=node_modules/.bin/esbuild
BANNER="import { createRequire as __soylCreateRequire } from 'node:module'; const require = __soylCreateRequire(import.meta.url);"
mkdir -p "$OUT/db"

"$ESBUILD" db/src/cli.ts --bundle --platform=node --format=esm --target=node24 --log-level=warning \
  --external:embedded-postgres '--external:@embedded-postgres/*' --external:pg-native \
  "--banner:js=$BANNER" --outfile="$OUT/migrate-cli.mjs"

"$ESBUILD" infra/docker/migrate-entrypoint.mjs --bundle --platform=node --format=esm --target=node24 --log-level=warning \
  --external:pg-native "--banner:js=$BANNER" --outfile="$OUT/migrate-entrypoint.mjs"

rm -rf "$OUT/db/migrations" "$OUT/catalog"
cp -R db/migrations "$OUT/db/migrations"
cp -R catalog "$OUT/catalog"
rm -rf "$OUT/catalog/sources"
echo "bundled: $OUT/migrate-cli.mjs, $OUT/migrate-entrypoint.mjs, $OUT/db/migrations, $OUT/catalog"
