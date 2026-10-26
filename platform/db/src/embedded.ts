/**
 * Local PostgreSQL via the `embedded-postgres` npm package (real PostgreSQL binaries, D-008).
 * Development and tests only: never imported by production code paths, and `embedded-postgres` is a
 * devDependency, so it is loaded lazily.
 *
 * initdb takes ~15 s on Windows, so a pristine cluster is initialised once into
 * `.data/pristine-pg<major>` and copied for each test run (a second or two). Data lives under
 * platform/db/.data (gitignored by platform/.gitignore `.data/`).
 */
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DATA_DIR = process.env.SOYL_DB_DATA_DIR ?? fileURLToPath(new URL('../.data', import.meta.url));

/** Local-only superuser for throwaway clusters bound to localhost. Not a secret (GEN-1). */
const LOCAL_USER = 'postgres';
const LOCAL_PASSWORD = 'postgres';

export interface EmbeddedServer {
  /** Connection string for the `postgres` database (admin). */
  url: string;
  port: number;
  dir: string;
  stop(): Promise<void>;
}

type EmbeddedPostgresCtor = typeof import('embedded-postgres').default;

async function loadEmbedded(): Promise<EmbeddedPostgresCtor> {
  try {
    return (await import('embedded-postgres')).default;
  } catch (err) {
    throw new Error(
      'embedded-postgres is not installed (it is a devDependency of @soyl/db). Set TEST_DATABASE_URL or DATABASE_URL to use an existing server.',
      { cause: err },
    );
  }
}

export async function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();
      const port = typeof addr === 'object' && addr ? addr.port : 0;
      srv.close(() => resolve(port));
    });
  });
}

const quiet = { onLog: () => {}, onError: () => {} };

function flags(fast: boolean): string[] {
  const f = ['-c', 'timezone=UTC', '-c', 'max_connections=300', '-c', 'listen_addresses=localhost'];
  // Throwaway test clusters: durability off for speed.
  if (fast) f.push('-c', 'fsync=off', '-c', 'synchronous_commit=off', '-c', 'full_page_writes=off');
  return f;
}

async function initialiseInto(dir: string): Promise<void> {
  const EmbeddedPostgres = await loadEmbedded();
  const ep = new EmbeddedPostgres({
    databaseDir: dir,
    user: LOCAL_USER,
    password: LOCAL_PASSWORD,
    port: await freePort(),
    persistent: true,
    initdbFlags: ['--encoding=UTF8', '--no-locale'],
    ...quiet,
  });
  await ep.initialise();
}

/** Ensures a never-started, freshly initialised cluster exists to copy from. */
async function pristineCluster(): Promise<string> {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, 'pristine');
  if (fs.existsSync(path.join(target, 'PG_VERSION'))) return target;
  const tmp = path.join(DATA_DIR, `pristine-tmp-${process.pid}-${Date.now()}`);
  await initialiseInto(tmp);
  try {
    fs.renameSync(tmp, target);
  } catch {
    // Another process won the race; use its copy.
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return target;
}

async function startCluster(dir: string, opts: { persistent: boolean; fast: boolean; port?: number }): Promise<EmbeddedServer> {
  const EmbeddedPostgres = await loadEmbedded();
  const port = opts.port ?? (await freePort());
  // A crashed run can leave a stale pid file behind; postgres refuses to start with it.
  const pidFile = path.join(dir, 'postmaster.pid');
  if (fs.existsSync(pidFile)) fs.rmSync(pidFile, { force: true });
  const ep = new EmbeddedPostgres({
    databaseDir: dir,
    user: LOCAL_USER,
    password: LOCAL_PASSWORD,
    port,
    // Directory removal is done below with retries (Windows keeps files locked briefly after exit).
    persistent: true,
    postgresFlags: flags(opts.fast),
    ...quiet,
  });
  await ep.start();
  let stopped = false;
  return {
    url: `postgres://${LOCAL_USER}:${LOCAL_PASSWORD}@localhost:${port}/postgres`,
    port,
    dir,
    stop: async () => {
      if (stopped) return;
      stopped = true;
      // embedded-postgres stops with `taskkill /f` on Windows (no clean shutdown, stale pid file,
      // crash recovery next start). Prefer a clean, fast `pg_ctl stop`; fall back to its kill.
      if (await pgCtlStop(dir)) (ep as unknown as { process?: unknown }).process = undefined;
      else await ep.stop();
      if (!opts.persistent) {
        // Windows can hold file handles for a moment after the process exits.
        await new Promise((r) => setTimeout(r, 200));
        removeDir(dir);
      }
    },
  };
}

/** `pg_ctl stop -m fast -w` using the binaries embedded-postgres installed. True when it worked. */
async function pgCtlStop(dir: string): Promise<boolean> {
  const os = process.platform === 'win32' ? 'windows' : process.platform;
  try {
    const { pg_ctl } = (await import(`@embedded-postgres/${os}-${process.arch}`)) as { pg_ctl: string };
    const { execFile } = await import('node:child_process');
    await new Promise<void>((resolve, reject) =>
      execFile(pg_ctl, ['stop', '-D', dir, '-m', 'fast', '-w', '-t', '30'], (err) => (err ? reject(err) : resolve())),
    );
    return true;
  } catch {
    return false;
  }
}

function removeDir(dir: string): void {
  try {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 20, retryDelay: 250 });
  } catch (err) {
    console.warn(`could not remove ${dir} (${(err as Error).message}); it is removed by the next test run`);
  }
}

function pidAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return (err as { code?: string }).code === 'EPERM';
  }
}

/** Removes test-<pid>-* directories left by runs whose process is gone (crash, Ctrl-C, EBUSY). */
function sweepStaleRuns(): void {
  if (!fs.existsSync(DATA_DIR)) return;
  for (const name of fs.readdirSync(DATA_DIR)) {
    const m = /^(?:test|pristine-tmp)-(\d+)-/.exec(name);
    if (m && !pidAlive(Number(m[1]))) removeDir(path.join(DATA_DIR, name));
  }
}

/** A throwaway server for one test run: copy of the pristine cluster, random port, removed on stop. */
export async function startTestServer(): Promise<EmbeddedServer> {
  sweepStaleRuns();
  const pristine = await pristineCluster();
  const dir = path.join(DATA_DIR, `test-${process.pid}-${Math.random().toString(36).slice(2, 8)}`);
  fs.cpSync(pristine, dir, { recursive: true });
  return startCluster(dir, { persistent: false, fast: true });
}

/** The persistent local development server used by the CLI when DATABASE_URL is unset. */
export async function startDevServer(port = Number(process.env.SOYL_DEV_PG_PORT ?? 54320)): Promise<EmbeddedServer> {
  const dir = path.join(DATA_DIR, 'dev');
  if (!fs.existsSync(path.join(dir, 'PG_VERSION'))) fs.cpSync(await pristineCluster(), dir, { recursive: true });
  const server = await startCluster(dir, { persistent: true, fast: false, port });
  // The dev cluster's application database.
  const pg = (await import('pg')).default;
  const c = new pg.Client({ connectionString: server.url });
  await c.connect();
  const exists = await c.query(`SELECT 1 FROM pg_database WHERE datname = 'soyl_dev'`);
  if (!exists.rowCount) await c.query('CREATE DATABASE soyl_dev');
  await c.end();
  return { ...server, url: server.url.replace(/\/postgres$/, '/soyl_dev') };
}
