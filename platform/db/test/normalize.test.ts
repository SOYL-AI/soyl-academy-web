/** DB-3: identifier normalisers, and agreement between the TypeScript and SQL implementations. */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { sql } from 'drizzle-orm';
import { normalizeEmail, normalizePhone } from '../src/normalize';
import { istDay, uuidv7, uuidv7Time } from '../src/ids';
import { createTestDb, type TestDb } from '../src/testing';

const EMAILS: [string, string | null][] = [
  ['Asha@Example.com', 'asha@example.com'],
  ['  asha@example.com  ', 'asha@example.com'],
  ['a.s.h.a+maths@gmail.com', 'asha@gmail.com'],
  ['Asha.Rao@GoogleMail.com', 'asharao@gmail.com'],
  ['asha.rao+x@example.com', 'asha.rao+x@example.com'],
  ['asha.rao+x@outlook.com', 'asha.rao+x@outlook.com'],
  ['919000000001@phone.soyl.invalid', null],
  ['x@invalid', null],
  ['not-an-email', null],
  ['two@@example.com', null],
  ['', null],
];

const PHONES: [string, string | null][] = [
  ['9876543210', '+919876543210'],
  ['09876543210', '+919876543210'],
  ['919876543210', '+919876543210'],
  ['+91 98765 43210', '+919876543210'],
  ['+91-98765-43210', '+919876543210'],
  ['(0) 98765.43210', '+919876543210'],
  ['0091 98765 43210', '+919876543210'],
  ['+14155550123', '+14155550123'],
  ['5876543210', null],
  ['12345', null],
  ['phone', null],
  ['', null],
];

describe('normalizeEmail / normalizePhone', () => {
  it.each(EMAILS)('email %j → %j', (input, out) => expect(normalizeEmail(input)).toBe(out));
  it.each(PHONES)('phone %j → %j', (input, out) => expect(normalizePhone(input)).toBe(out));
  it('passes null through', () => {
    expect(normalizeEmail(null)).toBeNull();
    expect(normalizePhone(undefined)).toBeNull();
  });
});

describe('SQL twins agree with TypeScript', () => {
  let t: TestDb;
  beforeAll(async () => {
    t = await createTestDb();
  });
  afterAll(async () => {
    await t?.close();
  });

  it('soyl_normalize_email', async () => {
    for (const [input] of EMAILS) {
      const r = await t.db.execute<{ v: string | null }>(sql`SELECT soyl_normalize_email(${input}) AS v`);
      expect(r.rows[0]!.v, input).toBe(normalizeEmail(input));
    }
  });

  it('soyl_normalize_phone', async () => {
    for (const [input] of PHONES) {
      const r = await t.db.execute<{ v: string | null }>(sql`SELECT soyl_normalize_phone(${input}) AS v`);
      expect(r.rows[0]!.v, input).toBe(normalizePhone(input));
    }
  });
});

describe('ids and IST days', () => {
  it('uuidv7 is a sortable RFC 9562 v7 id', () => {
    const a = uuidv7(1_700_000_000_000);
    const b = uuidv7(1_700_000_000_001);
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(uuidv7Time(a)).toBe(1_700_000_000_000);
    expect(a < b).toBe(true);
    expect(new Set(Array.from({ length: 1000 }, () => uuidv7())).size).toBe(1000);
  });

  it('istDay rolls over at 00:00 IST, not UTC (GEN-6)', () => {
    expect(istDay(new Date('2026-10-26T18:29:59Z'))).toBe('2026-10-26');
    expect(istDay(new Date('2026-10-26T18:30:00Z'))).toBe('2026-10-27');
  });
});
