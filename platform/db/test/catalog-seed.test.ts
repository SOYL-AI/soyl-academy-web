/**
 * Catalog seed loads every current catalog file and is idempotent; test-user seed follows GEN-2;
 * admin bootstrap follows DB-7.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { count, eq, sql } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import { createTestDb, type TestDb } from '../src/testing';
import { DEFAULT_CATALOG_DIR, seedCatalog } from '../src/seed/catalog';
import { TEST_PHONE_PREFIX, seedTestUsers } from '../src/seed/test-users';
import { bootstrapAdmin } from '../src/seed/admin';
import { auditLog, chapters, guardianLinks, learningOutcomes, sessions, staffCapabilities, subjects, syllabusVersions, topics, users } from '../schema/index';

function walk(dir: string, name: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'sources') walk(full, name, out);
    else if (e.name === name) out.push(full);
  }
  return out;
}

/** Expected counts straight from the YAML files, independent of the seed code. */
function expectedFromFiles() {
  let subjectCount = 0;
  for (const board of fs.readdirSync(DEFAULT_CATALOG_DIR)) {
    const f = path.join(DEFAULT_CATALOG_DIR, board, 'subjects.yaml');
    if (fs.existsSync(f)) subjectCount += (yaml.load(fs.readFileSync(f, 'utf8')) as { subjects: unknown[] }).subjects.length;
  }
  let chapterCount = 0;
  let topicCount = 0;
  const syllabi = walk(DEFAULT_CATALOG_DIR, 'syllabus.yaml');
  for (const f of syllabi) {
    const s = yaml.load(fs.readFileSync(f, 'utf8')) as { chapters: { topics: unknown[] }[] };
    chapterCount += s.chapters.length;
    topicCount += s.chapters.reduce((n, c) => n + c.topics.length, 0);
  }
  return { subjectCount, syllabusCount: syllabi.length, chapterCount, topicCount };
}

async function counts(t: TestDb) {
  const c = async (table: PgTable) =>
    Number((await t.db.select({ n: count() }).from(table))[0]!.n);
  return {
    subjects: await c(subjects),
    syllabi: await c(syllabusVersions),
    chapters: await c(chapters),
    topics: await c(topics),
    outcomes: await c(learningOutcomes),
  };
}

describe('seed catalog', () => {
  let t: TestDb;
  beforeAll(async () => {
    t = await createTestDb();
  });
  afterAll(async () => {
    await t?.close();
  });

  it('loads every subject and syllabus file in platform/catalog, and a second run changes nothing', async () => {
    const expected = expectedFromFiles();
    expect(expected.subjectCount).toBeGreaterThanOrEqual(448); // 448 CBSE subjects + any CISCE

    const first = await seedCatalog(t.db);
    expect(first.errors).toEqual([]);
    expect(first.subjects).toBe(expected.subjectCount);
    expect(first.syllabi.loaded).toBe(expected.syllabusCount);
    expect(first.chapters).toBe(expected.chapterCount);
    expect(first.topics).toBe(expected.topicCount);
    const after1 = await counts(t);
    expect(after1).toMatchObject({
      subjects: expected.subjectCount,
      syllabi: expected.syllabusCount,
      chapters: expected.chapterCount,
      topics: expected.topicCount,
    });

    const updatedAt1 = await t.db.select({ m: sql<string>`max(updated_at)::text` }).from(chapters);
    const second = await seedCatalog(t.db);
    expect(second.syllabi).toEqual({ loaded: 0, unchanged: expected.syllabusCount });
    expect(await counts(t)).toEqual(after1);
    const updatedAt2 = await t.db.select({ m: sql<string>`max(updated_at)::text` }).from(chapters);
    expect(updatedAt2).toEqual(updatedAt1);
  });

  it('versions rows by academic year and wires subjects to boards and classes', async () => {
    const [row] = await t.db.select().from(subjects).where(eq(subjects.key, 'cbse-10-science'));
    expect(row).toMatchObject({ academicYear: '2026-27', exam: 'cbse', classLevel: 10, wave: 1, tier: 'core' });
    const ch = await t.db.select().from(chapters).where(eq(chapters.subjectId, row!.id));
    if (ch.length) expect(ch.every((c) => c.key.startsWith('cbse-10-science-ch') && c.academicYear === '2026-27')).toBe(true);
  });

  it('stores board_assessed (formative / school-only) for chapters and topics exactly as the files say (M5)', async () => {
    const falseIn = { chapters: new Set<string>(), topics: new Set<string>() };
    for (const f of walk(DEFAULT_CATALOG_DIR, 'syllabus.yaml')) {
      const y = yaml.load(fs.readFileSync(f, 'utf8')) as { chapters: { id: string; board_assessed?: boolean; topics: { id: string; board_assessed?: boolean }[] }[] };
      for (const c of y.chapters) {
        if (c.board_assessed === false) falseIn.chapters.add(c.id);
        for (const tp of c.topics) if (tp.board_assessed === false) falseIn.topics.add(tp.id);
      }
    }
    expect(falseIn.chapters.size).toBeGreaterThan(0);
    expect(falseIn.topics.size).toBeGreaterThan(0);
    const chRows = await t.db.select({ key: chapters.key }).from(chapters).where(eq(chapters.boardAssessed, false));
    const tpRows = await t.db.select({ key: topics.key }).from(topics).where(eq(topics.boardAssessed, false));
    expect(new Set(chRows.map((r) => r.key))).toEqual(falseIn.chapters);
    expect(new Set(tpRows.map((r) => r.key))).toEqual(falseIn.topics);
    // Known examples: CBSE 10 Science ch12 topic 6 (formative only) and the periodic-only SST history chapter.
    expect(falseIn.topics.has('cbse-10-science-ch12-t06')).toBe(true);
    const [sst] = await t.db.select().from(chapters).where(sql`${chapters.title} LIKE 'The Age of Industrialisation%'`);
    expect(sst).toMatchObject({ boardAssessed: false });
  });

  it('fails without writing anything when a catalog file is invalid', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'soyl-bad-catalog-'));
    try {
      fs.mkdirSync(path.join(dir, 'cbse', '10', 'x'), { recursive: true });
      fs.writeFileSync(
        path.join(dir, 'cbse', 'subjects.yaml'),
        yaml.dump({ academic_year: '2027-28', board: 'cbse', subjects: [{ id: 'cbse-10-x', board: 'cbse' }] }),
      );
      await expect(seedCatalog(t.db, { dir })).rejects.toThrow(/invalid file/);
      const n = await t.db.select({ n: count() }).from(subjects).where(eq(subjects.academicYear, '2027-28'));
      expect(Number(n[0]!.n)).toBe(0);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('seed test-users (GEN-2) and admin bootstrap (DB-7)', () => {
  let t: TestDb;
  beforeAll(async () => {
    t = await createTestDb();
  });
  afterAll(async () => {
    await t?.close();
  });

  it('creates only example.com users with reserved phone numbers and no admin, idempotently', async () => {
    const r1 = await seedTestUsers(t.db);
    const r2 = await seedTestUsers(t.db);
    expect(r2.users.map((u) => u.id)).toEqual(r1.users.map((u) => u.id));
    const all = await t.db.select().from(users);
    expect(all.length).toBe(r1.users.length);
    for (const u of all) {
      expect(u.email).toMatch(/@example\.com$/);
      expect(u.phoneE164?.startsWith(TEST_PHONE_PREFIX)).toBe(true);
      expect(u.role).not.toBe('admin');
    }
    const links = await t.db.select().from(guardianLinks);
    expect(links).toHaveLength(2);
    expect(links.filter((l) => l.verifiedAt !== null)).toHaveLength(1);
  });

  it('refuses to run in production', async () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    try {
      await expect(seedTestUsers(t.db)).rejects.toThrow(/production/);
    } finally {
      process.env.NODE_ENV = prev;
    }
  });

  it('has zero admins until admin bootstrap runs for an explicit email', async () => {
    const admins = async () => Number((await t.db.select({ n: count() }).from(users).where(eq(users.role, 'admin')))[0]!.n);
    expect(await admins()).toBe(0);
    await expect(bootstrapAdmin(t.db, 'not-an-email')).rejects.toThrow();
    const created = await bootstrapAdmin(t.db, 'Owner@Example.com');
    expect(created.created).toBe(true);
    expect(await admins()).toBe(1);
    // existing user is promoted, matched by normalised email
    const promoted = await bootstrapAdmin(t.db, 'reviewer@example.com');
    expect(promoted.created).toBe(false);
    expect(await admins()).toBe(2);
    const audit = await t.db.select().from(auditLog).where(eq(auditLog.action, 'admin.bootstrap'));
    expect(audit).toHaveLength(2);
    expect(audit.find((a) => a.targetId === promoted.userId)?.before).toEqual({ role: 'reviewer' });
  });

  it('--role superadmin (D-045): admin + the superadmin capability, idempotent, revokes sessions on change, --role admin removes it', async () => {
    const email = 'Super.Owner@Example.com';
    const caps = async (userId: string) => (await t.db.select().from(staffCapabilities).where(eq(staffCapabilities.userId, userId))).map((c) => c.capability);
    const audits = async (userId: string) => t.db.select().from(auditLog).where(eq(auditLog.targetId, userId));
    // An existing student with a live session (signed up with email OTP first).
    const [student] = await t.db.insert(users).values({ name: 'Owner', email: 'super.owner@example.com', emailVerified: true }).returning();
    await t.db.insert(sessions).values({ userId: student!.id, token: 'tok-super-1', expiresAt: new Date(Date.now() + 3_600_000) });
    const first = await bootstrapAdmin(t.db, email, 'superadmin');
    expect(first).toMatchObject({ userId: student!.id, created: false, changed: true, role: 'superadmin', sessionsRevoked: 1 });
    expect((await t.db.select().from(users).where(eq(users.id, student!.id)))[0]!.role).toBe('admin');
    expect(await caps(student!.id)).toEqual(['superadmin']);
    expect((await audits(student!.id)).map((a) => [a.before, a.after])).toEqual([[{ role: 'student' }, { role: 'admin', capabilities: ['superadmin'] }]]);
    // Running the same step again changes nothing (no audit row, no revocation).
    await t.db.insert(sessions).values({ userId: student!.id, token: 'tok-super-2', expiresAt: new Date(Date.now() + 3_600_000) });
    expect(await bootstrapAdmin(t.db, email, 'superadmin')).toMatchObject({ changed: false, sessionsRevoked: 0 });
    expect(await audits(student!.id)).toHaveLength(1);
    expect(await t.db.select().from(sessions).where(eq(sessions.userId, student!.id))).toHaveLength(1);
    // Back to plain admin: the capability goes, sessions are revoked, the change is audited.
    expect(await bootstrapAdmin(t.db, email, 'admin')).toMatchObject({ changed: true, sessionsRevoked: 1 });
    expect(await caps(student!.id)).toEqual([]);
    // A missing account is created as a superadmin in one step.
    const fresh = await bootstrapAdmin(t.db, 'new.super@example.com', 'superadmin');
    expect(fresh).toMatchObject({ created: true, changed: true });
    expect(await caps(fresh.userId)).toEqual(['superadmin']);
    await expect(bootstrapAdmin(t.db, email, 'root' as never)).rejects.toThrow(/--role/);
  });
});
