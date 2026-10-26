// Entrypoint of the migrations image (runs as the Container Apps job caj-soyl-migrate-<env>).
//
// 1. Gets an Entra access token for Azure Database for PostgreSQL from the job's managed identity
//    (INFRA-2: no database password exists) and exposes it as PGPASSWORD for `pg`.
// 2. Bootstrap (idempotent, every run): as the server's Entra administrator (the migrator identity),
//    creates the Entra principals for the api/worker identities, the NOLOGIN roles soyl_migrator and
//    soyl_app, the grants from platform/db/README.md "Roles" (DB-1), and the `vector` extension.
// 3. Runs `db migrate up` (or the command given as arguments, e.g. `migrate status`, `seed catalog`)
//    with the @soyl/db CLI ($MIGRATE_CLI bundle in the image, tsx from a checkout). Exit code is the
//    CLI's exit code (0 ok, 1 error, 2 = `migrate status` found a changed migration).
//
// Locally / in CI there is no IDENTITY_ENDPOINT: steps 1-2 are skipped and DATABASE_URL is used as is.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const OSSRDBMS_RESOURCE = 'https://ossrdbms-aad.database.windows.net';
const log = (msg) => console.log(`${new Date().toISOString()} migrate-entrypoint: ${msg}`);

async function managedIdentityToken() {
  const endpoint = process.env.IDENTITY_ENDPOINT;
  const header = process.env.IDENTITY_HEADER;
  if (!endpoint || !header) return null;
  const url = new URL(endpoint);
  url.searchParams.set('resource', OSSRDBMS_RESOURCE);
  url.searchParams.set('api-version', '2019-08-01');
  if (process.env.AZURE_CLIENT_ID) url.searchParams.set('client_id', process.env.AZURE_CLIENT_ID);
  const res = await fetch(url, { headers: { 'X-IDENTITY-HEADER': header } });
  if (!res.ok) throw new Error(`managed identity token request failed: HTTP ${res.status}`);
  const body = await res.json();
  if (!body.access_token) throw new Error('managed identity token response had no access_token');
  return body.access_token;
}

async function withClient(database, fn) {
  const client = new pg.Client({ database, ssl: { rejectUnauthorized: true } });
  await client.connect();
  try {
    await client.query('RESET ROLE');
    return await fn(client);
  } finally {
    await client.end();
  }
}

async function bootstrap() {
  const migrator = process.env.PGUSER;
  const appPrincipals = (process.env.PG_APP_PRINCIPALS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const appDb = process.env.PGDATABASE;
  if (!migrator || !appDb) throw new Error('PGUSER and PGDATABASE must be set');

  await withClient('postgres', async (c) => {
    const id = (n) => c.escapeIdentifier(n);
    for (const p of appPrincipals) {
      const { rowCount } = await c.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [p]);
      if (!rowCount) {
        await c.query('SELECT * FROM pgaadauth_create_principal($1, false, false)', [p]);
        log(`created Entra principal ${p}`);
      }
    }
    for (const role of ['soyl_migrator', 'soyl_app']) {
      const { rowCount } = await c.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [role]);
      if (!rowCount) {
        await c.query(`CREATE ROLE ${id(role)} NOLOGIN`);
        log(`created role ${role}`);
      }
    }
    await c.query(`GRANT soyl_migrator TO ${id(migrator)}`);
    // Objects created by migrations are owned by soyl_migrator, not by the identity (README "Roles").
    await c.query(`ALTER ROLE ${id(migrator)} SET role = 'soyl_migrator'`);
    for (const p of appPrincipals) await c.query(`GRANT soyl_app TO ${id(p)}`);
  });

  await withClient(appDb, async (c) => {
    // CREATE EXTENSION needs azure_pg_admin; the migrations' own IF NOT EXISTS then succeeds as soyl_migrator.
    await c.query('CREATE EXTENSION IF NOT EXISTS vector');
    await c.query('GRANT CREATE, USAGE ON SCHEMA public TO soyl_migrator');
  });
  log(`bootstrap ok (app principals: ${appPrincipals.join(', ') || 'none'})`);
}

const args = process.argv.slice(2);
const command = args.length ? args : ['migrate', 'up'];

try {
  const token = await managedIdentityToken();
  if (token) {
    process.env.PGPASSWORD = token;
    log('using managed identity token for PostgreSQL (Entra auth)');
    await bootstrap();
  } else {
    log('no managed identity endpoint: skipping bootstrap, using DATABASE_URL as given');
  }
} catch (err) {
  console.error(`migrate-entrypoint: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}

log(`running: db ${command.join(' ')}`);
let r;
if (process.env.MIGRATE_CLI) {
  // Container image: the CLI is a single esbuild bundle.
  r = spawnSync(process.execPath, [process.env.MIGRATE_CLI, ...command], { stdio: 'inherit', env: process.env });
} else {
  // From a checkout: run the TypeScript CLI through tsx (platform/db devDependency).
  let tsxCli;
  try {
    tsxCli = fileURLToPath(import.meta.resolve('tsx/cli'));
  } catch {
    tsxCli = fileURLToPath(new URL('../../node_modules/tsx/dist/cli.mjs', import.meta.url));
  }
  const dbDir = fileURLToPath(new URL('../../db/', import.meta.url));
  r = spawnSync(process.execPath, [tsxCli, 'src/cli.ts', ...command], { cwd: dbDir, stdio: 'inherit', env: process.env });
}
process.exit(r.status ?? 1);
