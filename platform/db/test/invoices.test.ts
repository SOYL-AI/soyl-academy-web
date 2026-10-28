/**
 * Invoices (migration *_invoices (0015 or 0016), ADR-024): constraints, immutability (soyl_invoices_guard), buyer erasure at
 * account deletion (soyl_billing_buyer_anonymise), detach at purge, and the app role's rights.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import { createTestDb, type TestDb } from '../src/testing';
import { invoices, invoiceSequences, orders, payments, plans, users } from '../schema/index';
import { CHECK, UNIQUE, asApp, expectPgError, makeUser } from './helpers';

let t: TestDb;
let planId: string;
let n = 0;

beforeAll(async () => {
  t = await createTestDb();
  const [p] = await t.db.insert(plans).values({ key: 'board_exam_pass', name: 'Board Exam Pass', creditsPerDay: 60 }).returning();
  planId = p!.id;
});
afterAll(async () => {
  await t?.close();
});

async function paidOrder(userId: string) {
  n++;
  const [o] = await t.db.insert(orders).values({ userId, planId, razorpayOrderId: `order_T${n}`, receipt: `r${n}`, amountPaise: 49_900, status: 'paid', buyerName: 'A Parent', placeOfSupply: '27' }).returning();
  const [pay] = await t.db.insert(payments).values({ userId, orderId: o!.id, razorpayPaymentId: `pay_T${n}`, amountPaise: 49_900, status: 'captured' }).returning();
  return { order: o!, payment: pay! };
}

function invoiceRow(userId: string, paymentId: string, over: Partial<typeof invoices.$inferInsert> = {}): typeof invoices.$inferInsert {
  n++;
  return {
    number: `SOYL/2026-27/${String(n).padStart(6, '0')}`,
    type: 'tax_invoice',
    financialYear: '2026-27',
    sequence: n,
    gstRegistered: false,
    userId,
    paymentId,
    razorpayPaymentId: `pay_X${n}`,
    planKey: 'board_exam_pass',
    issuedAt: new Date(),
    issueDate: '2026-10-28',
    placeOfSupply: '27',
    buyerName: 'A Parent',
    buyerEmail: 'parent@example.com',
    lineItems: [],
    taxablePaise: 49_900,
    totalPaise: 49_900,
    seller: { legalName: 'Fixture' },
    ...over,
  };
}

describe('invoices migration', () => {
  it('amounts must reconcile; one tax invoice per payment; credit notes need their invoice', async () => {
    const u = await makeUser(t.db);
    const { payment } = await paidOrder(u.id);
    await expectPgError(() => t.db.insert(invoices).values(invoiceRow(u.id, payment.id, { taxablePaise: 42_288, cgstPaise: 3_806, sgstPaise: 3_805 })), { code: CHECK, constraint: 'invoices_amounts_check' });
    const [inv] = await t.db.insert(invoices).values(invoiceRow(u.id, payment.id, { taxablePaise: 42_288, cgstPaise: 3_806, sgstPaise: 3_806, gstRegistered: true })).returning();
    await expectPgError(() => t.db.insert(invoices).values(invoiceRow(u.id, payment.id)), { code: UNIQUE, constraint: 'invoices_payment_tax_invoice_unique' });
    await expectPgError(() => t.db.insert(invoices).values(invoiceRow(u.id, payment.id, { type: 'credit_note' })), { code: CHECK, constraint: 'invoices_credit_note_check' });
    await expectPgError(() => t.db.insert(invoices).values(invoiceRow(u.id, payment.id, { placeOfSupply: 'KA' })), { code: CHECK, constraint: 'invoices_place_of_supply_check' });
    const cn = invoiceRow(u.id, payment.id, { type: 'credit_note', originalInvoiceId: inv!.id, creditedThroughPaise: 49_900, number: 'SOYL/CN/2026-27/000001' });
    await t.db.insert(invoices).values(cn);
    await expectPgError(() => t.db.insert(invoices).values({ ...cn, number: 'SOYL/CN/2026-27/000002', sequence: cn.sequence! + 1000 }), { code: UNIQUE, constraint: 'invoices_credit_note_step_unique' });
  });

  it('tax content is immutable and rows cannot be deleted, even by the owner role; delivery fields may change', async () => {
    const u = await makeUser(t.db);
    const { payment } = await paidOrder(u.id);
    const [inv] = await t.db.insert(invoices).values(invoiceRow(u.id, payment.id)).returning();
    await expectPgError(() => t.db.update(invoices).set({ totalPaise: 1, taxablePaise: 1 }).where(eq(invoices.id, inv!.id)), { message: /immutable/ });
    await expectPgError(() => t.db.update(invoices).set({ number: 'X' }).where(eq(invoices.id, inv!.id)), { message: /immutable/ });
    await expectPgError(() => t.db.update(invoices).set({ buyerEmail: 'other@example.com' }).where(eq(invoices.id, inv!.id)), { message: /immutable/ });
    await expectPgError(() => t.db.delete(invoices).where(eq(invoices.id, inv!.id)), { message: /cannot be deleted/ });
    // The app role (rolled back at the end of asApp): delivery fields and the sequence upsert are allowed.
    await asApp(t, async (c) => {
      await c.query(`UPDATE invoices SET sent_at = now(), email_attempts = 1, pdf_blob_path = 'x.pdf' WHERE id = $1`, [inv!.id]);
      expect((await c.query('SELECT pdf_blob_path FROM invoices WHERE id = $1', [inv!.id])).rows[0].pdf_blob_path).toBe('x.pdf');
      for (const want of [1, 2]) {
        const r = await c.query(`INSERT INTO invoice_sequences (series, financial_year, last_value) VALUES ('tax_invoice', '2030-31', 1)
                       ON CONFLICT (series, financial_year) DO UPDATE SET last_value = invoice_sequences.last_value + 1 RETURNING last_value`);
        expect(r.rows[0].last_value).toBe(want);
      }
    });
    expect(await t.db.select().from(invoiceSequences).where(eq(invoiceSequences.financialYear, '2030-31'))).toEqual([]); // rolled back with its transaction: no gap
  });

  it('account deletion erases the buyer name/email (invoice kept); the purge detaches it', async () => {
    const u = await makeUser(t.db);
    const { order, payment } = await paidOrder(u.id);
    const [inv] = await t.db.insert(invoices).values(invoiceRow(u.id, payment.id)).returning();
    const deletedAt = new Date();
    await t.db.update(users).set({ deletedAt, email: `deleted+${u.id}@deleted.soyl.invalid` }).where(eq(users.id, u.id));
    const [a] = await t.db.select().from(invoices).where(eq(invoices.id, inv!.id));
    expect(a).toMatchObject({ buyerName: null, buyerEmail: null, number: inv!.number, totalPaise: 49_900, userId: u.id });
    expect(a!.buyerAnonymisedAt?.getTime()).toBe(deletedAt.getTime());
    const [o] = await t.db.select().from(orders).where(eq(orders.id, order.id));
    expect(o!.buyerName).toBeNull();
    expect(o!.placeOfSupply).toBe('27');

    await t.db.execute(sql`DELETE FROM users WHERE id = ${u.id}`);
    const [b] = await t.db.select().from(invoices).where(eq(invoices.id, inv!.id));
    expect(b).toMatchObject({ userId: null, number: inv!.number, totalPaise: 49_900 });
  });
});
