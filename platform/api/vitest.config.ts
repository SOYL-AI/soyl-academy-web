import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // One embedded PostgreSQL for the run unless TEST_DATABASE_URL is set (CI).
    globalSetup: ['@soyl/db/testing/global-setup'],
    testTimeout: 60_000,
    // seedRealContent() publishes every authored chapter in beforeAll; at ~620 chapters (2026-11-07) that exceeds
    // 180 s on the dev machine, and the bank keeps growing toward ~2,000 chapters.
    hookTimeout: 900_000,
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
