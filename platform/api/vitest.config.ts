import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // One embedded PostgreSQL for the run unless TEST_DATABASE_URL is set (CI).
    globalSetup: ['@soyl/db/testing/global-setup'],
    testTimeout: 60_000,
    hookTimeout: 180_000,
    teardownTimeout: 60_000,
    env: { APP_ENV: 'test' },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts', 'src/dev/dev-db.ts', 'src/types.ts'],
      reporter: ['text-summary', 'text', 'json-summary'],
    },
  },
});
