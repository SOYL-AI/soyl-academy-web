import { defineConfig } from 'drizzle-kit';

// `npm run generate -w @soyl/db -- --name <name>` writes the next up migration from the schema.
// Every migration also needs a hand-written `<file>.down.sql` (README "Migrations").
export default defineConfig({
  dialect: 'postgresql',
  schema: './schema/index.ts',
  out: './migrations',
  strict: true,
  verbose: true,
});
