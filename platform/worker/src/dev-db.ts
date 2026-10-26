/**
 * Local development database when DATABASE_URL is unset (APP_ENV local/test only): a fresh, migrated
 * database on the embedded PostgreSQL server from @soyl/db, thrown away on exit. Never used in
 * deployed environments (config requires DATABASE_URL there, and this refuses anyway).
 *
 * To share the API's dev database instead, set DATABASE_URL to the URL the API prints.
 * findPlatformRoot is a copy of the one in @soyl/api (src/dev/dev-db.ts), not an import.
 */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Finds platform/ by walking up from a start directory (works from src/ under tsx and from dist/). */
export function findPlatformRoot(): string {
  const starts = [process.cwd(), dirname(fileURLToPath(import.meta.url))];
  for (const start of starts) {
    let dir = resolve(start);
    for (let i = 0; i < 8; i++) {
      if (existsSync(join(dir, 'db', 'migrations')) && existsSync(join(dir, 'worker'))) return dir;
      if (existsSync(join(dir, 'platform', 'db', 'migrations'))) return join(dir, 'platform');
      const up = dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  }
  throw new Error('could not find the platform/ directory (needed for migrations)');
}

export async function startDevDatabase(log: (msg: string) => void): Promise<{ url: string; close(): Promise<void> }> {
  const appEnv = process.env.APP_ENV ?? 'local';
  if (appEnv !== 'local' && appEnv !== 'test') throw new Error('the embedded development database is only for APP_ENV=local');
  const root = findPlatformRoot();
  // Set before the dynamic import so the bundled migrator finds the SQL files.
  process.env.SOYL_MIGRATIONS_DIR ??= join(root, 'db', 'migrations');
  process.env.SOYL_DB_DATA_DIR ??= join(root, 'db', '.data');
  const { createTestDb, stopTestServer } = await import('@soyl/db/testing');
  log('starting embedded PostgreSQL (first run initialises a cluster, ~15 s)…');
  const t = await createTestDb();
  return {
    url: t.url,
    close: async () => {
      await t.close();
      await stopTestServer();
    },
  };
}
