/**
 * DB-1, DB-2, DB-3, AC-07, AC-08, AC-09, AC-12: the database itself rejects double-spend, duplicate
 * events, parallel attempts and edits of append-only history.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import { createTestDb, type TestDb } from '../src/testing';
import { istDay, uuidv7 } from '../src/ids';
import {
  accounts,
  attempts,
  auditLog,
  creditLedger,
  guardianLinks,
  liveEvents,
  users,
  webhookEvents,
} from '../schema/index';
import { CHECK, DENIED, UNIQUE, asApp, expectPgError, insertQuestion, makeChapter, makeTest, makeUser, sampleQuestion } from './helpers';

let t: TestDb;
beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('attempts (DB-2, AC-12)', () => {
  it('allows one active attempt per user and test, and a new one after submit', async () => {
    const { subject, chapter } = await makeChapter(t.db);
    const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key));
    const { test } = await makeTest(t.db, subject.id, chapter.key, [q.id]);
    const user = await makeUser(t.db);

    const [first] = await t.db.insert(attempts).values({ userId: user.id, testId: test.id }).returning();
    await expectPgError(() => t.db.insert(attempts).values({ userId: user.id, testId: test.id }), {
      code: UNIQUE,
      constraint: 'attempts_one_active_per_user_test',
    });

    const now = new Date();
    await t.db
      .update(attempts)
      .set({ status: 'in_progress', startedAt: now, deadlineAt: new Date(now.getTime() + 30 * 60_000) })
      .where(eq(attempts.id, first!.id));
    await expectPgError(() => t.db.insert(attempts).values({ userId: user.id, testId: test.id }), { code: UNIQUE });

    await t.db.update(attempts).set({ status: 'submitted', submittedAt: new Date() }).where(eq(attempts.id, first!.id));
    await t.db.insert(attempts).values({ userId: user.id, testId: test.id });

    // another user is unaffected
    const other = await makeUser(t.db);
    await t.db.insert(attempts).values({ userId: other.id, testId: test.id });
  });

  it('allows one attempt per live event, ever', async () => {
    const { subject, chapter } = await makeChapter(t.db);
    const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key));
    const { test } = await makeTest(t.db, subject.id, chapter.key, [q.id]);
    const start = new Date(Date.now() + 3600_000);
    const [ev] = await t.db
      .insert(liveEvents)
      .values({
        key: `live-${uuidv7()}`,
        academicYear: '2026-27',
        testId: test.id,
        title: 'All-India Mock 1',
        registrationOpensAt: new Date(),
        startsAt: start,
        endsAt: new Date(start.getTime() + 3 * 3600_000),
      })
      .returning();
    const user = await makeUser(t.db);
    const [a] = await t.db.insert(attempts).values({ userId: user.id, testId: test.id, liveEventId: ev!.id }).returning();
    await t.db.update(attempts).set({ status: 'auto_submitted', startedAt: start, deadlineAt: new Date(start.getTime() + 1), submittedAt: start }).where(eq(attempts.id, a!.id));
    await expectPgError(() => t.db.insert(attempts).values({ userId: user.id, testId: test.id, liveEventId: ev!.id }), {
      code: UNIQUE,
      constraint: 'attempts_one_per_live_event',
    });
  });

  it('requires deadline_at once started and submitted_at once submitted', async () => {
    const { subject, chapter } = await makeChapter(t.db);
    const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key));
    const { test } = await makeTest(t.db, subject.id, chapter.key, [q.id]);
    const user = await makeUser(t.db);
    await expectPgError(() => t.db.insert(attempts).values({ userId: user.id, testId: test.id, status: 'in_progress' }), { code: CHECK });
    await expectPgError(
      () => t.db.insert(attempts).values({ userId: user.id, testId: test.id, status: 'submitted', startedAt: new Date(), deadlineAt: new Date(Date.now() + 1000) }),
      { code: CHECK, constraint: 'attempts_submitted_check' },
    );
  });
});

describe('credit ledger (DB-1, DB-2, AC-07, AC-08)', () => {
  const day = istDay();

  it('allows one daily grant per user per IST day', async () => {
    const u = await makeUser(t.db);
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'grant', amount: 25, action: 'daily_grant', istDay: day });
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: u.id, kind: 'grant', amount: 25, action: 'daily_grant', istDay: day }),
      { code: UNIQUE, constraint: 'credit_ledger_one_daily_grant' },
    );
    // a plan top-up on the same day is a different grant, idempotent by request_id
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'grant', amount: 35, action: 'plan_topup', requestId: 'topup:ent1', istDay: day });
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: u.id, kind: 'grant', amount: 35, action: 'plan_topup', requestId: 'topup:ent1', istDay: day }),
      { code: UNIQUE, constraint: 'credit_ledger_kind_request_unique' },
    );
  });

  it('rejects a second reserve, charge or refund for the same request', async () => {
    const u = await makeUser(t.db);
    const req = uuidv7();
    const reserve = { userId: u.id, kind: 'reserve', amount: -6, action: 'hard_doubt', requestId: req, istDay: day, reservationExpiresAt: new Date(Date.now() + 900_000) };
    await t.db.insert(creditLedger).values(reserve);
    await expectPgError(() => t.db.insert(creditLedger).values(reserve), { code: UNIQUE, constraint: 'credit_ledger_kind_request_unique' });

    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'charge', amount: 0, action: 'hard_doubt', requestId: req, istDay: day });
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: u.id, kind: 'charge', amount: 0, action: 'hard_doubt', requestId: req, istDay: day }),
      { code: UNIQUE },
    );
    // AC-08: a refund after the charge (sweeper race) cannot also land
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: u.id, kind: 'refund', amount: 6, action: 'hard_doubt', requestId: req, istDay: day }),
      { code: UNIQUE, constraint: 'credit_ledger_one_resolution' },
    );
  });

  it('rejects double refunds, refunds without a reserve and refunds of the wrong size', async () => {
    const u = await makeUser(t.db);
    const req = uuidv7();
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'reserve', amount: -10, action: 'photo_doubt', requestId: req, istDay: day, reservationExpiresAt: new Date() });
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: u.id, kind: 'refund', amount: 11, action: 'photo_doubt', requestId: req, istDay: day }),
      { code: CHECK, message: /must return exactly/ },
    );
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'refund', amount: 10, action: 'photo_doubt', requestId: req, istDay: day });
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: u.id, kind: 'refund', amount: 10, action: 'photo_doubt', requestId: req, istDay: day }),
      { code: UNIQUE },
    );
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: u.id, kind: 'refund', amount: 5, action: 'quick_doubt', requestId: uuidv7(), istDay: day }),
      { code: CHECK, message: /no matching reserve/ },
    );
    // another user's reservation cannot be settled
    const other = await makeUser(t.db);
    const req2 = uuidv7();
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'reserve', amount: -1, action: 'quick_doubt', requestId: req2, istDay: day, reservationExpiresAt: new Date() });
    await expectPgError(
      () => t.db.insert(creditLedger).values({ userId: other.id, kind: 'charge', amount: 0, action: 'quick_doubt', requestId: req2, istDay: day }),
      { code: CHECK },
    );
  });

  it('enforces the amount sign per kind', async () => {
    const u = await makeUser(t.db);
    const bad = [
      { kind: 'grant', amount: -1, action: 'admin_adjustment' },
      { kind: 'reserve', amount: 5, action: 'quick_doubt', requestId: uuidv7(), reservationExpiresAt: new Date() },
      { kind: 'expire', amount: 3, action: 'day_end' },
      { kind: 'reserve', amount: -1, action: 'quick_doubt' }, // no request id
    ];
    for (const row of bad)
      await expectPgError(() => t.db.insert(creditLedger).values({ userId: u.id, istDay: day, ...row }), { code: CHECK });
  });

  it('stays append-only for the app role (DB-1)', async () => {
    const u = await makeUser(t.db);
    const [row] = await t.db.insert(creditLedger).values({ userId: u.id, kind: 'grant', amount: 25, action: 'daily_grant', istDay: '2026-01-01' }).returning();

    await asApp(t, async (c) => {
      // the app can append and read
      await c.query(`INSERT INTO credit_ledger (user_id, kind, amount, action, ist_day) VALUES ($1, 'grant', 5, 'admin_adjustment', '2026-01-02')`, [u.id]);
      const r = await c.query('SELECT count(*)::int AS n FROM credit_ledger WHERE user_id = $1', [u.id]);
      expect(r.rows[0].n).toBe(2);
    });
    for (const stmt of [
      ['UPDATE credit_ledger SET amount = 1000 WHERE id = $1', [row!.id]],
      ['DELETE FROM credit_ledger WHERE id = $1', [row!.id]],
      ['TRUNCATE credit_ledger', []],
      ['UPDATE audit_log SET action = $1', ['x']],
      ['DELETE FROM audit_log', []],
      ['UPDATE webhook_events SET event_type = $1', ['x']],
      ['DELETE FROM webhook_events', []],
      ['DELETE FROM content_budget_ledger', []],
      ['DELETE FROM soyl_schema_migrations', []],
      ['CREATE TABLE app_made_this (id int)', []],
    ] as const)
      await asApp(t, (c) => expectPgError(() => c.query(stmt[0], [...stmt[1]]), { code: DENIED }));
  });

  it('lets the app delete a user, cascading through append-only rows as the table owner', async () => {
    const u = await makeUser(t.db);
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'grant', amount: 25, action: 'daily_grant', istDay: day });
    await t.db.insert(auditLog).values({ actorUserId: u.id, action: 'test.action' });
    const c = await t.pool.connect();
    try {
      await c.query('SET ROLE soyl_app');
      await c.query('DELETE FROM users WHERE id = $1', [u.id]);
      await c.query('RESET ROLE');
    } finally {
      c.release();
    }
    const left = await t.db.select().from(creditLedger).where(eq(creditLedger.userId, u.id));
    expect(left).toHaveLength(0);
    const audit = await t.db.select().from(auditLog).where(eq(auditLog.action, 'test.action'));
    expect(audit[0]!.actorUserId).toBeNull();
  });
});

describe('webhook events (DB-2, AC-09)', () => {
  it('rejects a duplicate provider event id', async () => {
    const ev = { provider: 'razorpay', eventId: `evt_${uuidv7()}`, eventType: 'payment.captured', payload: { a: 1 } };
    await t.db.insert(webhookEvents).values(ev);
    await expectPgError(() => t.db.insert(webhookEvents).values(ev), { code: UNIQUE, constraint: 'webhook_events_provider_event_unique' });
    await t.db.insert(webhookEvents).values({ ...ev, provider: 'other' });
  });

  it('can be inserted by the app role', async () => {
    await asApp(t, (c) =>
      c.query(`INSERT INTO webhook_events (event_id, event_type, payload) VALUES ($1, 'order.paid', '{}')`, [`evt_${uuidv7()}`]),
    );
  });
});

describe('identity (DB-2, DB-3, API-12)', () => {
  it('normalises email in the database and rejects duplicates by normalised form', async () => {
    const u = await makeUser(t.db, { email: 'Asha.Rao+school@GoogleMail.com' });
    const [row] = await t.db.select({ n: users.emailNormalized }).from(users).where(eq(users.id, u.id));
    expect(row!.n).toBe('asharao@gmail.com');
    await expectPgError(() => makeUser(t.db, { email: 'asharao@gmail.com' }), { code: UNIQUE, constraint: 'users_email_normalized_unique' });
    await expectPgError(() => makeUser(t.db, { email: 'a.s.h.a.rao@gmail.com' }), { code: UNIQUE });
    // other domains keep dots and tags
    await makeUser(t.db, { email: 'asha.rao+x@example.com' });
    await makeUser(t.db, { email: 'asharao+x@example.com' });
  });

  it('normalises phone numbers to E.164 and rejects duplicates', async () => {
    const u = await makeUser(t.db, { phoneNumber: '098765 43210' });
    const [row] = await t.db.select({ p: users.phoneE164 }).from(users).where(eq(users.id, u.id));
    expect(row!.p).toBe('+919876543210');
    await expectPgError(() => makeUser(t.db, { phoneNumber: '+91 98765-43210' }), { code: UNIQUE, constraint: 'users_phone_e164_unique' });
  });

  it('gives placeholder .invalid emails no normalised form', async () => {
    const a = await makeUser(t.db, { email: '919000000001@phone.soyl.invalid' });
    const [row] = await t.db.select({ n: users.emailNormalized }).from(users).where(eq(users.id, a.id));
    expect(row!.n).toBeNull();
  });

  it('rejects unknown roles and duplicate provider accounts', async () => {
    await expectPgError(() => makeUser(t.db, { role: 'superuser' }), { code: CHECK, constraint: 'users_role_check' });
    const u = await makeUser(t.db);
    await t.db.insert(accounts).values({ userId: u.id, providerId: 'google', accountId: 'g-123' });
    const v = await makeUser(t.db);
    await expectPgError(() => t.db.insert(accounts).values({ userId: v.id, providerId: 'google', accountId: 'g-123' }), {
      code: UNIQUE,
      constraint: 'accounts_provider_account_unique',
    });
  });

  it('keeps guardian links unique and verification consistent', async () => {
    const parent = await makeUser(t.db, { role: 'parent' });
    const student = await makeUser(t.db);
    await t.db.insert(guardianLinks).values({ parentUserId: parent.id, studentUserId: student.id });
    await expectPgError(() => t.db.insert(guardianLinks).values({ parentUserId: parent.id, studentUserId: student.id }), { code: UNIQUE });
    const s2 = await makeUser(t.db);
    await expectPgError(() => t.db.insert(guardianLinks).values({ parentUserId: parent.id, studentUserId: s2.id, verifiedAt: new Date() }), {
      code: CHECK,
      constraint: 'guardian_links_verified_pair',
    });
    await expectPgError(() => t.db.insert(guardianLinks).values({ parentUserId: parent.id, studentUserId: parent.id }), { code: CHECK });
  });
});

describe('conventions', () => {
  it('maintains updated_at on raw SQL updates', async () => {
    const u = await makeUser(t.db);
    await t.db.execute(sql`UPDATE users SET updated_at = '2000-01-01' , name = 'x' WHERE id = ${u.id}`);
    const [row] = await t.db.select({ updatedAt: users.updatedAt }).from(users).where(eq(users.id, u.id));
    expect(row!.updatedAt.getUTCFullYear()).toBeGreaterThan(2000);
  });

  it('generates uuid v7 ids in the database too', async () => {
    const r = await t.db.execute<{ id: string }>(sql`SELECT uuid_generate_v7()::text AS id`);
    const id = r.rows[0]!.id;
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    const ms = parseInt(id.replace(/-/g, '').slice(0, 12), 16);
    expect(Math.abs(ms - Date.now())).toBeLessThan(60_000);
  });
});
