/**
 * Unit tests for the homepage (root script `npm run test:home`): the numbers computed from config
 * (credits, the Board Exam Pass per day, exam days) and the taste snapshot. Node environment: pure logic.
 */
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url)).split('\\').join('/');

export default defineConfig({
  root: repoRoot,
  resolve: { alias: [{ find: /^@\//, replacement: repoRoot }] },
  test: {
    environment: 'node',
    include: ['lib/home/**/*.test.ts'],
    restoreMocks: true,
  },
});
