/**
 * Column conventions (ARCHITECTURE §6, ADR-004):
 * - `id` uuid v7: generated in app code (`$defaultFn`), DB default `uuid_generate_v7()` for raw SQL.
 * - `created_at` / `updated_at` timestamptz, UTC (GEN-6). `updated_at` is also maintained by the
 *   `soyl_set_updated_at` trigger, so raw SQL updates keep it right.
 * - snake_case column names; TypeScript property names are camelCase (Better Auth reads property names).
 * - Money in integer paise. Metered model costs, which are fractions of a paisa per call, use
 *   numeric(14,4) paise (`meteredPaise`).
 */
import { sql } from 'drizzle-orm';
import { check, numeric, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { PgColumn } from 'drizzle-orm/pg-core';
import { uuidv7 } from '../src/ids';

export const id = () =>
  uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v7()`)
    .$defaultFn(() => uuidv7());

export const createdAt = () => timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow();

export const updatedAt = () =>
  timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());

export const timestamps = () => ({ createdAt: createdAt(), updatedAt: updatedAt() });

export const tstz = (name: string) => timestamp(name, { withTimezone: true, mode: 'date' });

/** Metered cost in paise with 4 decimal places (AI and pipeline token costs). */
export const meteredPaise = (name: string) => numeric(name, { precision: 14, scale: 4, mode: 'number' });

/** Marks: halves allowed (MarkingStep.marks multipleOf 0.5). */
export const marks = (name: string) => numeric(name, { precision: 6, scale: 1, mode: 'number' });

/** CHECK (col IN (...)) for a text enum. Text + CHECK instead of pg enums keeps migrations reversible and cheap to extend. */
export function oneOf(name: string, column: PgColumn, values: readonly string[]) {
  return check(name, sql`${column} IN (${sql.raw(values.map((v) => `'${v.replace(/'/g, "''")}'`).join(', '))})`);
}

export const ACADEMIC_YEAR_CHECK = /^\d{4}-\d{2}$/;

/** Ratios and percentiles (0..1 or 0..100) with 4 decimal places. */
export const ratio = (name: string) => numeric(name, { precision: 8, scale: 4, mode: 'number' });
