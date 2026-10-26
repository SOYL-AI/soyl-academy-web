/**
 * Second CLI of the migrations image (bundled to /app/release-cli.mjs by bundle-migrate.sh), run by
 * migrate-entrypoint.mjs after the database bootstrap:
 *
 *   pgboss-migrate          install/upgrade the pg-boss schema and grant soyl_app (worker `migrate`, DB-1)
 *   content <args...>       the content pipeline CLI, e.g. `content publish --authored` (D-026)
 *
 * Both run as the migrator identity (it owns the schema objects through soyl_migrator).
 */
import { main as contentMain } from '../../content-pipeline/src/cli';
import { main as workerMain } from '../../worker/src/index';

const [command, ...rest] = process.argv.slice(2);
if (command === 'pgboss-migrate') {
  await workerMain(['migrate']); // exits the process with the install result
} else if (command === 'content') {
  process.exit(await contentMain(rest));
} else {
  console.error('usage: release-cli.mjs pgboss-migrate | content <command> [options]');
  process.exit(2);
}
