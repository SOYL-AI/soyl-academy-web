/**
 * Second CLI of the migrations image (bundled to /app/release-cli.mjs by bundle-migrate.sh), run by
 * migrate-entrypoint.mjs:
 *
 *   pgboss-migrate          install/upgrade the pg-boss schema and grant soyl_app (worker `migrate`, DB-1)
 *   content <args...>       the content pipeline CLI, e.g. `content publish --authored` (D-026)
 *   billing <args...>       the billing operator CLI (@soyl/api billing/cli.ts, ADR-016), e.g.
 *                           `billing sync-plans --dry-run`. Runs in the job caj-soyl-billing-<env> as the
 *                           WORKER identity (reader of the Razorpay Key Vault secrets, soyl_app in the
 *                           database), never as the migrator (runbooks/billing-go-live.md).
 *
 * pgboss-migrate and content run as the migrator identity (it owns the schema objects through soyl_migrator).
 */
import { createDb, pgPasswordFromEnv } from '@soyl/db';
import { runBillingCli, USAGE as BILLING_USAGE } from '@soyl/api/billing/cli';
import { loadBillingConfig } from '@soyl/api/billing/config';
import { RazorpayHttpClient } from '@soyl/api/billing/razorpay/http';
import { main as contentMain } from '../../content-pipeline/src/cli';
import { main as workerMain } from '../../worker/src/index';

/** Same contract as api/scripts/billing.ts, but with the real Razorpay client only (never the in-memory stub). */
async function billingMain(argv: string[]): Promise<number> {
  const env = process.env;
  const appEnv = env.APP_ENV ?? 'local';
  const isLocal = appEnv === 'local' || appEnv === 'test';
  const { config, problems } = loadBillingConfig(env, { appEnv, isLocal, isProduction: appEnv === 'prod' });
  if (config.provider === 'stub') problems.push('the billing job talks to Razorpay only (RAZORPAY_PROVIDER=razorpay); the stub keeps no shared state');
  if (problems.length) {
    // billing/config.ts names settings only; it never puts a value in a problem message.
    console.error(`Invalid billing configuration:\n  - ${problems.join('\n  - ')}`);
    return 1;
  }
  if (!env.DATABASE_URL) {
    console.error('DATABASE_URL is required');
    console.error(BILLING_USAGE);
    return 2;
  }
  const razorpay = config.provider === 'razorpay' ? new RazorpayHttpClient({ keyId: config.keyId!, keySecret: config.keySecret!, baseUrl: config.apiBaseUrl }) : null;
  // Which kind of key is configured (live/test), never the key itself.
  const keyMode = config.keyId?.startsWith('rzp_live_') ? 'live' : config.keyId ? 'test' : 'none';
  console.error(JSON.stringify({ level: 'info', msg: 'billing job', appEnv, provider: config.provider, keyMode, command: argv[0] ?? null }));
  // INFRA-2: DATABASE_AUTH=entra -> a managed-identity token per connection (shared/azure/identity.ts).
  const { db, close } = createDb(env.DATABASE_URL, { max: 2, password: pgPasswordFromEnv({ DATABASE_AUTH: env.DATABASE_AUTH }) });
  try {
    return await runBillingCli(argv, {
      db,
      razorpay,
      clock: { now: () => Date.now() },
      io: { out: (l) => console.log(l), err: (l) => console.error(l) },
    });
  } finally {
    await close();
  }
}

const [command, ...rest] = process.argv.slice(2);
if (command === 'pgboss-migrate') {
  await workerMain(['migrate']); // exits the process with the install result
} else if (command === 'content') {
  process.exit(await contentMain(rest));
} else if (command === 'billing') {
  // exitCode, not process.exit(): exiting while Razorpay's keep-alive sockets close aborted the process
  // (libuv assertion, seen on Windows) after a successful run. The pool is closed, so node exits when idle.
  process.exitCode = await billingMain(rest);
} else {
  console.error('usage: release-cli.mjs pgboss-migrate | content <command> [options] | billing <command> [options]');
  process.exit(2);
}
