import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // One embedded PostgreSQL for the run unless TEST_DATABASE_URL is set (CI, D-008).
    globalSetup: ['@soyl/db/testing/global-setup'],
    testTimeout: 60_000,
    hookTimeout: 180_000,
    teardownTimeout: 60_000,
    env: { APP_ENV: 'test' },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      // Entry point and the local-only embedded database bootstrap (same exclusions as @soyl/api).
      exclude: ['src/index.ts', 'src/dev-db.ts'],
      reporter: ['text-summary', 'text', 'json-summary'],
    },
  },
});
