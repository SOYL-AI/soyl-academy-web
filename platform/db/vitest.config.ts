import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // One embedded PostgreSQL server for the whole run unless TEST_DATABASE_URL/DATABASE_URL is set.
    globalSetup: ['./src/testing-global-setup.ts'],
    testTimeout: 60_000,
    hookTimeout: 180_000,
  },
});
