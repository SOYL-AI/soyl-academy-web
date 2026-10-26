import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // The real catalog (771 subjects) is parsed once per file; end-to-end tests run the whole pipeline.
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
