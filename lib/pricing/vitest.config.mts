/**
 * Unit tests for the prices, credits and sample report that /plans and /parents show (root script
 * `npm run test:pricing`): every number is computed from platform/shared/config and tested here. Node
 * environment: pure logic.
 */
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url)).split('\\').join('/');

export default defineConfig({
  root: repoRoot,
  resolve: { alias: [{ find: /^@\//, replacement: repoRoot }] },
  test: {
    environment: 'node',
    include: ['lib/pricing/**/*.test.ts'],
    restoreMocks: true,
  },
});
