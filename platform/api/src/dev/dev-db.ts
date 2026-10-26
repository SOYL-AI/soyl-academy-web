/**
 * Local development database when DATABASE_URL is unset (APP_ENV local only): a fresh, migrated
 * database on the embedded PostgreSQL test server from @soyl/db, seeded with the catalog and the
 * fixture users. Data is thrown away on exit. Never imported in production (DATABASE_URL is required
 * there and this module refuses anyway).
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
      if (existsSync(join(dir, 'db', 'migrations')) && existsSync(join(dir, 'catalog'))) return dir;
      if (existsSync(join(dir, 'platform', 'db', 'migrations'))) return join(dir, 'platform');
      const up = dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  }
  throw new Error('could not find the platform/ directory (needed for migrations and the catalog)');
}

export async function startDevDatabase(log: (msg: string) => void): Promise<{ url: string; close(): Promise<void> }> {
  const appEnv = process.env.APP_ENV ?? 'local';
  if (appEnv !== 'local' && appEnv !== 'test') throw new Error('the embedded development database is only for APP_ENV=local');
  const root = findPlatformRoot();
  process.env.SOYL_MIGRATIONS_DIR ??= join(root, 'db', 'migrations');
  process.env.SOYL_DB_DATA_DIR ??= join(root, 'db', '.data');
  const { createTestDb, stopTestServer } = await import('@soyl/db/testing');
  const { seedCatalog, seedTestUsers } = await import('@soyl/db');
  log('starting embedded PostgreSQL (first run initialises a cluster, ~15 s)…');
  const t = await createTestDb();
  log('seeding catalog and fixture users…');
  const report = await seedCatalog(t.db, { dir: join(root, 'catalog'), log: () => {} });
  await seedTestUsers(t.db);
  log(`catalog seeded (${JSON.stringify(report).slice(0, 200)})`);
  return {
    url: t.url,
    close: async () => {
      await t.close();
      await stopTestServer();
    },
  };
}
