/**
 * Unit tests for the Future Builders marketing flow (root script `npm run test:future-builders`):
 * pricing and offer dates, camp state, registrant validation, Razorpay signatures and payment
 * checks, the webhook, the confirm-and-record flow and the platform ingest client.
 * Node environment: everything here is server logic or pure.
 */
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url)).split('\\').join('/');

export default defineConfig({
  root: repoRoot,
  resolve: { alias: [{ find: /^@\//, replacement: repoRoot }] },
  test: {
    environment: 'node',
    include: ['lib/future-builders/__tests__/**/*.test.ts'],
    restoreMocks: true,
  },
});
