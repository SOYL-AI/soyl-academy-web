// Entrypoint of the migrations image (runs as the Container Apps job caj-soyl-migrate-<env>).
//
// 1. Gets an Entra access token for Azure Database for PostgreSQL from the job's managed identity
//    (INFRA-2: no database password exists) and exposes it as PGPASSWORD for `pg`.
// 2. Bootstrap (idempotent, every run): as the server's Entra administrator (the migrator identity),
//    creates the Entra principals for the api/worker identities, the NOLOGIN roles soyl_migrator and
//    soyl_app, the grants from platform/db/README.md "Roles" (DB-1), and the `vector` extension.
// 3. Runs the steps (each a separate process; the first failure stops the run, exit code = its code):
//      (no args)  db migrate up  ->  pg-boss schema install + soyl_app grants (worker `migrate`, DB-1)
//      release    db seed catalog  ->  content publish --authored (D-026: hand-authored chapters + exemplars,
//                 then the frozen test series in content/authored/series, ADR-019)
//      billing    the billing operator CLI, e.g. `billing sync-plans --dry-run` (ADR-016). Runs in the
//                 job caj-soyl-billing-<env> as the WORKER identity, so steps 1-2 are SKIPPED (the worker
//                 is not the server's Entra administrator; the CLI gets its own token, DATABASE_AUTH=entra).
//      <args>     db <args>, e.g. `migrate status`, `seed catalog`, `admin bootstrap --email E`
//    The @soyl/db CLI is $MIGRATE_CLI and the pg-boss/content CLI is $RELEASE_CLI (esbuild bundles in
//    the image); from a checkout both run through tsx. Exit 2 from `migrate status` = a changed migration.
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
    // SET ROLE NONE, not RESET ROLE: bootstrap gives the migrator a default `role = soyl_migrator`
    // (ALTER ROLE ... SET role), and RESET ROLE restores that default. Bootstrap steps such as
    // CREATE EXTENSION need the identity's own azure_pg_admin membership.
    await client.query('SET ROLE NONE');
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
    // pg-boss installs its own schema (CREATE SCHEMA pgboss), which needs CREATE on the database.
    await c.query(`GRANT CREATE ON DATABASE ${c.escapeIdentifier(appDb)} TO soyl_migrator`);
  });
  log(`bootstrap ok (app principals: ${appPrincipals.join(', ') || 'none'})`);
}

const args = process.argv.slice(2);
const billingMode = args[0] === 'billing';
const steps =
  args.length === 0
    ? [['db', 'migrate', 'up'], ['release', 'pgboss-migrate']]
    : args[0] === 'release'
      ? [['db', 'seed', 'catalog'], ['release', 'content', 'publish', '--authored', ...args.slice(1)]]
      : billingMode
        ? [['release', ...args]]
        : [['db', ...args]];

try {
  // Billing mode: no migrator token and no bootstrap (see the header).
  const token = billingMode ? null : await managedIdentityToken();
  if (token) {
    process.env.PGPASSWORD = token;
    log('using managed identity token for PostgreSQL (Entra auth)');
    await bootstrap();
  } else {
    log(billingMode ? 'billing mode: no bootstrap (the billing CLI authenticates itself)' : 'no managed identity endpoint: skipping bootstrap, using DATABASE_URL as given');
  }
} catch (err) {
  console.error(`migrate-entrypoint: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}

let tsxCli;
function viaTsx(script, cwd, rest) {
  // From a checkout: run the TypeScript CLIs through tsx (platform devDependency).
  if (!tsxCli) {
    try {
      tsxCli = fileURLToPath(import.meta.resolve('tsx/cli'));
    } catch {
      tsxCli = fileURLToPath(new URL('../../node_modules/tsx/dist/cli.mjs', import.meta.url));
    }
  }
  return spawnSync(process.execPath, [tsxCli, script, ...rest], { cwd, stdio: 'inherit', env: process.env });
}

function run([tool, ...rest]) {
  log(`running: ${tool} ${rest.join(' ')}`);
  if (tool === 'db') {
    // Container image: the CLI is a single esbuild bundle.
    if (process.env.MIGRATE_CLI) return spawnSync(process.execPath, [process.env.MIGRATE_CLI, ...rest], { stdio: 'inherit', env: process.env });
    return viaTsx('src/cli.ts', fileURLToPath(new URL('../../db/', import.meta.url)), rest);
  }
  if (process.env.RELEASE_CLI) return spawnSync(process.execPath, [process.env.RELEASE_CLI, ...rest], { stdio: 'inherit', env: process.env });
  return viaTsx('infra/docker/release-cli.ts', fileURLToPath(new URL('../../', import.meta.url)), rest);
}

for (const step of steps) {
  const r = run(step);
  if (r.status !== 0) {
    log(`step failed: ${step.join(' ')} (exit ${r.status ?? 'signal'})`);
    process.exit(r.status ?? 1);
  }
}
log('done');
process.exit(0);
