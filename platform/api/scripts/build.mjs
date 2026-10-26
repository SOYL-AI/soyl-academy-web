// D-022: one esbuild bundle at dist/index.js (workspace packages bundled, native/optional deps external).
// Run from platform/api: `npm run build` → `node dist/index.js`.
import { build } from 'esbuild';
import { rmSync } from 'node:fs';

rmSync(new URL('../dist', import.meta.url), { recursive: true, force: true });

await build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  target: 'node24',
  format: 'esm',
  sourcemap: true,
  legalComments: 'none',
  // Native or optional modules resolved from node_modules at runtime. embedded-postgres is only
  // loaded by the local dev database (APP_ENV=local without DATABASE_URL).
  external: ['pg-native', 'embedded-postgres', '@embedded-postgres/*'],
  // CommonJS dependencies inside an ESM bundle need require().
  banner: {
    js: "import { createRequire as __soylCreateRequire } from 'node:module'; const require = __soylCreateRequire(import.meta.url);",
  },
  logLevel: 'info',
});
