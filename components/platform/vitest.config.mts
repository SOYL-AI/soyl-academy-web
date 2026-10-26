/**
 * Unit tests for the platform web app (root script `npm run test:platform-web`, ADR-011): API proxy header
 * logic, security headers, guest storage, return-to, auth helpers. The UI kit has its own config
 * (components/platform/ui/vitest.config.mts, ADR-009). jsdom by default; server tests opt into node.
 */
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url)).split('\\').join('/');

export default defineConfig({
  root: repoRoot,
  resolve: { alias: [{ find: /^@\//, replacement: repoRoot }] },
  oxc: { jsx: { runtime: 'automatic' } },
  css: { modules: { generateScopedName: '[local]' } },
  test: {
    environment: 'jsdom',
    include: ['components/platform/**/*.test.{ts,tsx}', 'app/(platform)/**/*.test.{ts,tsx}'],
    exclude: ['components/platform/ui/**', '**/node_modules/**'],
    css: { include: [/\.module\.css$/] },
    restoreMocks: true,
  },
});
