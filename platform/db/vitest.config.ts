import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // One embedded PostgreSQL server for the whole run unless TEST_DATABASE_URL/DATABASE_URL is set.
    globalSetup: ['./src/testing-global-setup.ts'],
    // The full catalog seed (5,400+ chapters) takes ~15 s alone and several times that when test files run in parallel.
    testTimeout: 240_000,
    hookTimeout: 180_000,
    teardownTimeout: 60_000,
  },
});
