/**
 * vitest global setup: one embedded PostgreSQL server per test run, shared by every test file and
 * worker. Use it from any package's vitest config:
 *
 *   export default defineConfig({ test: { globalSetup: ['@soyl/db/testing/global-setup'] } });
 *
 * Does nothing when TEST_DATABASE_URL or DATABASE_URL is set (CI provides a real server).
 */
import { startTestServer } from './embedded';

export default async function setup(): Promise<(() => Promise<void>) | void> {
  if (process.env.TEST_DATABASE_URL || process.env.DATABASE_URL) return;
  const server = await startTestServer();
  process.env.SOYL_TEST_SERVER_URL = server.url;
  return async () => {
    delete process.env.SOYL_TEST_SERVER_URL;
    await server.stop();
  };
}
