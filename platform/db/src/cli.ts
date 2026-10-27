/**
 * `npm run db -w @soyl/db -- <command>` (from platform/).
 *
 *   migrate up [--to N]        apply pending migrations (or until N are applied)
 *   migrate down [--to N]      roll back the newest migration (or until N remain; --to 0 = all)
 *   migrate status             applied / pending / changed migrations
 *   seed catalog [--dir P]     load platform/catalog (idempotent)
 *   seed test-users            fixture users (refuses in production; GEN-2)
 *   admin bootstrap --email E  make E an admin, creating the user if needed (DB-7)
 *
 * Target database: DATABASE_URL. When it is unset, a persistent local embedded PostgreSQL server
 * (platform/db/.data/dev, port 54320) is started for the command and stopped afterwards.
 * DATABASE_AUTH=entra: DATABASE_URL has no password; each connection uses a managed-identity token.
 */
import pg from 'pg';
import { createDb, pgConnectionConfig, pgPasswordFromEnv, redactUrl } from './client';
import { migrateDown, migrateUp, migrationStatus } from './migrator';
import { startDevServer, type EmbeddedServer } from './embedded';
import { seedCatalog } from './seed/catalog';
import { seedTestUsers } from './seed/test-users';
import { bootstrapAdmin } from './seed/admin';

const USAGE = `usage:
  db migrate up [--to N] | down [--to N] | status
  db seed catalog [--dir PATH] | test-users
  db admin bootstrap --email EMAIL`;

function option(args: string[], name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return undefined;
  const v = args[i + 1];
  if (v === undefined || v.startsWith('--')) throw new Error(`--${name} needs a value`);
  return v;
}

function intOption(args: string[], name: string): number | undefined {
  const v = option(args, name);
  if (v === undefined) return undefined;
  if (!/^\d+$/.test(v)) throw new Error(`--${name} must be a non-negative integer`);
  return Number(v);
}

async function main(argv: string[]): Promise<number> {
  const [group, command, ...rest] = argv;
  if (!group || !command) {
    console.log(USAGE);
    return 1;
  }

  let server: EmbeddedServer | null = null;
  let url = process.env.DATABASE_URL;
  if (!url) {
    server = await startDevServer();
    url = server.url;
    console.log(`DATABASE_URL not set: using the local embedded server (${redactUrl(url)})`);
  } else {
    console.log(`database: ${redactUrl(url)}`);
  }
  const log = (m: string) => console.log(m);

  try {
    if (group === 'migrate') {
      // DATABASE_AUTH=entra: a fresh Entra token as the password (INFRA-2); otherwise the URL/PGPASSWORD.
      const client = new pg.Client(pgConnectionConfig(url, pgPasswordFromEnv()));
      await client.connect();
      try {
        if (command === 'up') {
          const done = await migrateUp(client, { to: intOption(rest, 'to'), log });
          console.log(done.length ? `${done.length} migration(s) applied` : 'nothing to apply');
        } else if (command === 'down') {
          const done = await migrateDown(client, { to: intOption(rest, 'to'), log });
          console.log(done.length ? `${done.length} migration(s) rolled back` : 'nothing to roll back');
        } else if (command === 'status') {
          const s = await migrationStatus(client);
          for (const a of s.applied) console.log(`  [x] ${a.name}  ${a.appliedAt.toISOString()}${s.drift.includes(a.name) ? '  CHANGED SINCE APPLIED' : ''}`);
          for (const p of s.pending) console.log(`  [ ] ${p.name}`);
          console.log(`${s.applied.length} applied, ${s.pending.length} pending${s.drift.length ? `, ${s.drift.length} changed` : ''}`);
          if (s.drift.length) return 2;
        } else throw new Error(`unknown migrate command '${command}'`);
      } finally {
        await client.end();
      }
      return 0;
    }

    const { db, close } = createDb(url, { max: 4 });
    try {
      if (group === 'seed' && command === 'catalog') {
        const report = await seedCatalog(db, { dir: option(rest, 'dir'), log });
        console.log(JSON.stringify(report, null, 2));
      } else if (group === 'seed' && command === 'test-users') {
        const report = await seedTestUsers(db);
        console.log(JSON.stringify(report, null, 2));
      } else if (group === 'admin' && command === 'bootstrap') {
        const email = option(rest, 'email');
        if (!email) throw new Error('admin bootstrap needs --email <email>');
        const r = await bootstrapAdmin(db, email);
        console.log(`${r.created ? 'created' : 'updated'} admin ${r.email} (${r.userId})`);
      } else {
        console.log(USAGE);
        return 1;
      }
    } finally {
      await close();
    }
    return 0;
  } finally {
    if (server) await server.stop();
  }
}

main(process.argv.slice(2)).then(
  (code) => process.exit(code),
  (err) => {
    console.error(`error: ${(err as Error).message}`);
    process.exit(1);
  },
);
