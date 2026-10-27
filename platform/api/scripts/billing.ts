/**
 * `npm run billing -w @soyl/api -- <command>`: entry point of the billing operator CLI
 * (src/billing/cli.ts has the commands; runbook docs/platform/runbooks/razorpay-webhook-replay.md).
 */
import { createDb, pgPasswordFromEnv } from '@soyl/db';
import { systemClock } from '../src/clock';
import { loadBillingConfig } from '../src/billing/config';
import { createRazorpayClient } from '../src/billing/razorpay';
import { runBillingCli, USAGE } from '../src/billing/cli';

const env = process.env;
const appEnv = env.APP_ENV ?? 'local';
const { config, problems } = loadBillingConfig(env, { appEnv, isLocal: appEnv === 'local' || appEnv === 'test', isProduction: appEnv === 'prod' });
if (problems.length) {
  console.error(`Invalid billing configuration:\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
if (!env.DATABASE_URL) {
  console.error('DATABASE_URL is required');
  console.error(USAGE);
  process.exit(2);
}
if (config.provider === 'stub') console.error('note: RAZORPAY_PROVIDER=stub keeps Razorpay state in memory for this process only');

const { db, close } = createDb(env.DATABASE_URL, { max: 2, password: pgPasswordFromEnv({ DATABASE_AUTH: env.DATABASE_AUTH }) });
const code = await runBillingCli(process.argv.slice(2), {
  db,
  razorpay: createRazorpayClient(config, systemClock.now),
  clock: systemClock,
  io: { out: (l) => console.log(l), err: (l) => console.error(l) },
});
await close();
process.exit(code);
