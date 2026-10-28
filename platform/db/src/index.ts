/**
 * @soyl/db — public API. See platform/db/README.md.
 *
 *   import { createDb, schema } from '@soyl/db';
 *   import { users, subjects } from '@soyl/db/schema';
 *   import { createTestDb } from '@soyl/db/testing';
 */
import * as schema from '../schema/index';

export { schema };
export * from '../schema/index';
export {
  createDb,
  redactUrl,
  databaseAuthMode,
  entraPassword,
  pgPasswordFromEnv,
  pgConnectionConfig,
  ENTRA_MAX_LIFETIME_SECONDS,
  type Database,
  type DbHandle,
  type Schema,
  type PgPassword,
  type DatabaseAuthMode,
} from './client';
export {
  migrateUp,
  migrateDown,
  migrateDatabase,
  migrationStatus,
  loadMigrations,
  migrationsFingerprint,
  MIGRATIONS_TABLE,
  type Migration,
  type MigrationStatus,
} from './migrator';
export { uuidv7, uuidv7Time, istDay } from './ids';
export { normalizeEmail, normalizePhone } from './normalize';
export { splitQuestion, joinQuestion, questionRow, studentQuestionColumns, findKeySideFields, KEY_SIDE_FIELDS, STUDENT_QUESTION_FORBIDDEN_FIELDS } from './student-questions';
export { seedCatalog, type CatalogSeedReport } from './seed/catalog';
export { seedTestUsers, TEST_PHONE_PREFIX, TEST_EMAIL_DOMAIN } from './seed/test-users';
export { bootstrapAdmin, BOOTSTRAP_ROLES, type BootstrapRole } from './seed/admin';
export { ingestChapterRelease, ingestTestDefinition, activateRelease, sha256Json, canonicalJson } from './content-ingest';
