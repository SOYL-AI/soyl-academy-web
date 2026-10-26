/**
 * Unit/component tests for the platform UI kit and renderers (root script `npm run test:platform-ui`,
 * ADR-009). jsdom environment; CSS Modules resolve to their local class names.
 */
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url)).split('\\').join('/');

export default defineConfig({
  root: repoRoot,
  resolve: { alias: [{ find: /^@\//, replacement: repoRoot }] },
  oxc: { jsx: { runtime: 'automatic' } },
  css: { modules: { generateScopedName: '[local]' } },
  test: {
    environment: 'jsdom',
    include: ['components/platform/ui/**/*.test.{ts,tsx}'],
    setupFiles: ['components/platform/ui/__tests__/setup.ts'],
    css: { include: [/\.module\.css$/] },
    restoreMocks: true,
  },
});
