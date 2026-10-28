/**
 * Invoices end to end (ADR-024) with the Razorpay stub and signed webhooks: one invoice per payment
 * (duplicate webhooks), credit notes for refunds, gap-free numbering under concurrency, the financial-year
 * rollover, reconciliation and sweep backfill, PDF + email delivery with retries, owner-only download,
 * account deletion, the admin list / CSV / resend, checkout place of supply, and the GST-registered mode.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { and, asc, desc, eq } from 'drizzle-orm';
import { invoices, payments, users } from '@soyl/db';
import { base32Decode, stepAt, totpAt } from '../src/auth/mfa';
import { FIXTURE_SELLER, INVOICING, type InvoicingConfig } from '@soyl/shared/config/invoicing';
import { MemoryBlobStore } from '../src/ai/blob';
import { extractPdfText } from '../src/billing/invoices/pdf';
import { reconcile } from '../src/billing/reconcile';
import { createBillingHarness, email, type BillingHarness } from './billing-fixture';

let h: BillingHarness;
const FY_LATER = '2027-28';

const settings = (over: Partial<InvoicingConfig> = {}): InvoicingConfig => ({ ...INVOICING, seller: FIXTURE_SELLER, ...over });
const useSettings = (s: InvoicingConfig) => {
  h.config.billing.invoicing!.settings = s;
};

beforeAll(async () => {
  h = await createBillingHarness();
  h.clock.set(Date.parse('2026-11-02T06:30:00Z'));
});
afterAll(async () => {
  await h?.close();
});
beforeEach(() => {
  useSettings(settings());
  h.config.billing.invoicing!.enabled = true;
  h.email.failing = false;
  h.stub.payerEmail = 'payer@example.com';
});

const docs = (userId: string) => h.t.db.select().from(invoices).where(eq(invoices.userId, userId)).orderBy(asc(invoices.issuedAt), desc(invoices.type), asc(invoices.sequence)); // invoice before its credit notes
const drain = () => h.services.billing.invoices.drain();
const blob = () => h.services.ai.runtime.blob as MemoryBlobStore;

async function buyPass(o: { placeOfSupply?: string; buyerName?: string } = {}) {
  const s = await h.student();
  const res = await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass', ...o });
  expect(res.statusCode, res.body).toBe(201);
  return { ...s, orderId: (res.json() as { orderId: string }).orderId };
}

async function payPass(o: { placeOfSupply?: string; buyerName?: string } = {}) {
  const b = await buyPass(o);
  const events = h.stub.simulateOrderPayment(b.orderId);
  for (const r of await h.deliverAll(events)) expect(r.statusCode).toBe(200);
  await drain();
  const [pay] = await h.t.db.select().from(payments).where(eq(payments.userId, b.userId));
  return { ...b, events, paymentId: pay!.razorpayPaymentId };
}

describe('checkout details', () => {
  it('stores the optional place of supply and name; rejects bad values (API-8)', async () => {
    const s = await h.student();
    expect((await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass', placeOfSupply: 'KA' })).statusCode).toBe(400);
    expect((await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass', placeOfSupply: '25' })).statusCode).toBe(400);
    expect((await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass', buyerName: 'x@y.com' })).statusCode).toBe(400);
    expect((await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly', buyerName: '1234' })).statusCode).toBe(400);
    const ok = await s.c.post('/v1/billing/orders', { plan: 'board_exam_pass', placeOfSupply: '27', buyerName: "  Asha D'Souza " });
    expect(ok.statusCode, ok.body).toBe(201);
  });

  it('GET /v1/plans: plain prices while not GST-registered, and the default place of supply', async () => {
    const body = (await h.client().get('/v1/plans')).json();
    expect(body).toMatchObject({ pricesIncludeGst: false, defaultPlaceOfSupply: '29' });
  });
});

describe('payment → invoice', () => {
  it('issues exactly one invoice per payment, even when every webhook is delivered twice', async () => {
    const { userId, events, paymentId } = await payPass({ placeOfSupply: '27', buyerName: 'Asha Rao' });
    for (const ev of events) expect((await h.deliver(ev)).json()).toMatchObject({ duplicate: true });
    // A re-sent body under a new event id is processed again: still one invoice.
    expect((await h.deliver(events[1]!, { eventId: `${events[1]!.eventId}x` })).statusCode).toBe(200);
    await h.services.billing.refresh(userId, h.app.log);
    const rows = await docs(userId);
    expect(rows).toHaveLength(1);
    const inv = rows[0]!;
    expect(inv).toMatchObject({
      type: 'tax_invoice',
      financialYear: '2026-27',
      gstRegistered: false,
      razorpayPaymentId: paymentId,
      planKey: 'board_exam_pass',
      issueDate: '2026-11-02',
      placeOfSupply: '27',
      buyerName: 'Asha Rao',
      buyerEmail: 'payer@example.com',
      taxablePaise: 49_900,
      cgstPaise: 0,
      sgstPaise: 0,
      igstPaise: 0,
      totalPaise: 49_900,
    });
    expect(inv.number).toMatch(/^SOYL\/2026-27\/\d{6}$/);
    expect(inv.seller).toMatchObject({ legalName: FIXTURE_SELLER.legalName });
  });

  it('stores the PDF in the private invoices container and emails it to the payer with the PDF attached', async () => {
    h.stub.payerEmail = 'parent.pays@example.com';
    const { userId } = await payPass({ buyerName: 'Ravi Kumar' });
    const [inv] = await docs(userId);
    expect(inv!.pdfBlobPath).toBe(`2026-27/tax_invoice/${inv!.id}.pdf`);
    expect(blob().has('invoices', inv!.pdfBlobPath!)).toBe(true);
    expect(inv!.sentAt).not.toBeNull();
    const mail = h.email.last('parent.pays@example.com')!;
    expect(mail.subject).toBe(`Your SOYL Academy invoice ${inv!.number}`);
    expect(mail.text).toContain('https://www.soylai.test/me/invoices');
    expect(mail.attachments).toHaveLength(1);
    const pdf = mail.attachments![0]!;
    expect(pdf).toMatchObject({ contentType: 'application/pdf', name: `${inv!.number.replace(/\//g, '-')}.pdf` });
    const text = extractPdfText(pdf.content).join(' ');
    for (const s of [inv!.number, 'Invoice', FIXTURE_SELLER.legalName, 'Ravi Kumar', 'parent.pays@example.com', 'Karnataka (29)', '999293', 'Rs. 499.00', 'Rupees Four Hundred Ninety-Nine Only', INVOICING.signatureNote])
      expect(text).toContain(s);
  });

  it('falls back to the account email when Razorpay has none', async () => {
    h.stub.payerEmail = null;
    const { userId } = await payPass();
    const [u] = await h.t.db.select({ email: users.email }).from(users).where(eq(users.id, userId));
    const [inv] = await docs(userId);
    expect(inv!.buyerEmail).toBe(u!.email);
    expect(inv!.placeOfSupply).toBe('29'); // no state chosen: the seller's state
  });

  it('subscriptions: an invoice for the first charge and one per renewal', async () => {
    const s = await h.student();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly', placeOfSupply: '07' })).json() as { subscriptionId: string };
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub.subscriptionId));
    h.clock.advance(31 * 86_400_000);
    await h.deliverAll(h.stub.simulateRenewal(sub.subscriptionId));
    await drain();
    const rows = await docs(s.userId);
    expect(rows.map((r) => [r.type, r.totalPaise, r.placeOfSupply, r.razorpaySubscriptionId])).toEqual([
      ['tax_invoice', 19_900, '07', sub.subscriptionId],
      ['tax_invoice', 19_900, '07', sub.subscriptionId],
    ]);
    expect((rows[0]!.lineItems as { description: string }[])[0]!.description).toBe('SOYL Academy Plus plan, monthly subscription (AI tutor credits)');
    expect(new Set(rows.map((r) => r.razorpayPaymentId)).size).toBe(2);
    h.clock.set(Date.parse('2026-11-02T06:30:00Z'));
  });
});

describe('refunds → credit notes', () => {
  it('a full refund issues one credit note linked to the invoice; replays issue nothing more', async () => {
    const { userId, paymentId } = await payPass();
    const refund = h.stub.simulateRefund(paymentId);
    await h.deliverAll(refund);
    await h.deliver(refund[0]!, { eventId: `${refund[0]!.eventId}r` });
    await drain();
    const rows = await docs(userId);
    expect(rows).toHaveLength(2);
    const [inv, cn] = rows;
    expect(cn).toMatchObject({ type: 'credit_note', originalInvoiceId: inv!.id, creditedThroughPaise: 49_900, totalPaise: 49_900, taxablePaise: 49_900, placeOfSupply: inv!.placeOfSupply });
    expect(cn!.number).toMatch(/^SOYL\/CN\/2026-27\/\d{6}$/);
    const mail = h.email.last('payer@example.com')!;
    expect(mail.subject).toBe(`Your SOYL Academy credit note ${cn!.number}`);
    const text = extractPdfText(mail.attachments![0]!.content).join(' ');
    expect(text).toContain(`${inv!.number} dated`);
    expect(text).toContain('Total credited');
  });

  it('a refund after the account was purged is still recorded and gets its credit note (fixed gap: it was ignored)', async () => {
    const { userId, paymentId } = await payPass();
    const [inv] = await docs(userId);
    await h.t.db.update(users).set({ deletedAt: new Date(h.clock.now()) }).where(eq(users.id, userId));
    await h.t.db.delete(users).where(eq(users.id, userId)); // the 30-day purge
    const res = await h.deliverAll(h.stub.simulateRefund(paymentId));
    expect(res[0]!.json()).toMatchObject({ outcome: 'applied' });
    await drain();
    const [pay] = await h.t.db.select().from(payments).where(eq(payments.razorpayPaymentId, paymentId));
    expect(pay).toMatchObject({ userId: null, status: 'refunded', refundedPaise: 49_900 });
    const notes = await h.t.db.select().from(invoices).where(eq(invoices.originalInvoiceId, inv!.id));
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({ type: 'credit_note', userId: null, buyerName: null, buyerEmail: null, totalPaise: 49_900 });
    const [kept] = await h.t.db.select().from(invoices).where(eq(invoices.id, inv!.id));
    expect(kept).toMatchObject({ userId: null, number: inv!.number });
  });

  it('partial refunds issue one note per step; together they reverse the invoice to the paisa (GST mode)', async () => {
    useSettings(settings({ gstRegistered: true, series: { tax_invoice: { prefix: 'ST', digits: 6 }, credit_note: { prefix: 'SC', digits: 6 } } }));
    const s = await h.student();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'pro', interval: 'monthly', placeOfSupply: '29' })).json() as { subscriptionId: string };
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub.subscriptionId));
    const [pay] = await h.t.db.select().from(payments).where(eq(payments.userId, s.userId));
    await h.deliverAll(h.stub.simulateRefund(pay!.razorpayPaymentId, 10_001));
    await h.deliverAll(h.stub.simulateRefund(pay!.razorpayPaymentId));
    await drain();
    const [inv, cn1, cn2] = await docs(s.userId);
    expect(inv).toMatchObject({ gstRegistered: true, totalPaise: 29_900, taxablePaise: 25_339, cgstPaise: 2_281, sgstPaise: 2_280, igstPaise: 0 });
    expect(inv!.number).toMatch(/^ST\/2026-27\/\d{6}$/);
    expect(cn1).toMatchObject({ type: 'credit_note', creditedThroughPaise: 10_001, totalPaise: 10_001, taxablePaise: 8_475, cgstPaise: 763, sgstPaise: 763 });
    expect(cn2).toMatchObject({ type: 'credit_note', creditedThroughPaise: 29_900, totalPaise: 19_899 });
    for (const k of ['taxablePaise', 'cgstPaise', 'sgstPaise', 'igstPaise', 'totalPaise'] as const) expect(cn1![k] + cn2![k]).toBe(inv![k]);
    expect(cn2!.number).toMatch(/^SC\/2026-27\/\d{6}$/);
  });

  it('GST mode, inter-state: IGST at 18 %; the PDF is a tax invoice with the seller GSTIN', async () => {
    useSettings(settings({ gstRegistered: true, series: { tax_invoice: { prefix: 'ST', digits: 6 }, credit_note: { prefix: 'SC', digits: 6 } } }));
    h.stub.payerEmail = 'igst@example.com';
    const { userId } = await payPass({ placeOfSupply: '27' });
    const [inv] = await docs(userId);
    expect(inv).toMatchObject({ placeOfSupply: '27', taxablePaise: 42_288, igstPaise: 7_612, cgstPaise: 0, sgstPaise: 0 });
    const text = extractPdfText(h.email.last('igst@example.com')!.attachments![0]!.content).join(' ');
    for (const s of ['Tax Invoice', `GSTIN: ${FIXTURE_SELLER.gstin}`, 'IGST @ 18%', 'Rs. 76.12', 'Rs. 422.88', 'Maharashtra (27)']) expect(text).toContain(s);
  });
});

describe('numbering', () => {
  it('is gap-free and unique under 20 concurrent payments', async () => {
    const buyers = await Promise.all(Array.from({ length: 20 }, () => buyPass()));
    const before = await h.t.db.select({ seq: invoices.sequence }).from(invoices).where(and(eq(invoices.type, 'tax_invoice'), eq(invoices.financialYear, '2026-27')));
    const events = buyers.map((b) => h.stub.simulateOrderPayment(b.orderId));
    const res = await Promise.all(events.map((ev) => h.deliver(ev[0]!)));
    for (const r of res) expect(r.statusCode).toBe(200);
    await Promise.all(events.map((ev) => h.deliver(ev[1]!)));
    await drain();
    const all = await h.t.db.select({ seq: invoices.sequence, number: invoices.number }).from(invoices).where(and(eq(invoices.type, 'tax_invoice'), eq(invoices.financialYear, '2026-27')));
    expect(all.length - before.length).toBe(20);
    const seqs = all.map((r) => r.seq).sort((a, b) => a - b);
    expect(seqs).toEqual(Array.from({ length: seqs.length }, (_, i) => i + 1));
    expect(new Set(all.map((r) => r.number)).size).toBe(all.length);
  });

  it('starts a new series at 1 April 00:00 IST (financial year rollover); credit notes have their own series', async () => {
    h.clock.set(Date.parse('2027-03-31T18:29:00Z')); // 31 Mar 2027 23:59 IST (sign in now: a session does not last 5 months)
    const s = await h.student();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'yearly' })).json() as { subscriptionId: string };
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub.subscriptionId));
    h.clock.set(Date.parse('2027-03-31T18:30:00Z')); // 1 Apr 2027 00:00 IST
    const [pay] = await h.t.db.select().from(payments).where(eq(payments.userId, s.userId));
    await h.deliverAll(h.stub.simulateRefund(pay!.razorpayPaymentId));
    const s2 = await h.student();
    const sub2 = (await s2.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' })).json() as { subscriptionId: string };
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub2.subscriptionId));
    await drain();
    const [inv, cn] = await docs(s.userId);
    expect(inv).toMatchObject({ financialYear: '2026-27', issueDate: '2027-03-31' });
    expect(cn).toMatchObject({ type: 'credit_note', financialYear: FY_LATER, number: `SOYL/CN/${FY_LATER}/000001`, issueDate: '2027-04-01' });
    const [inv2] = await docs(s2.userId);
    expect(inv2).toMatchObject({ financialYear: FY_LATER, number: `SOYL/${FY_LATER}/000001`, sequence: 1 });
    h.clock.set(Date.parse('2026-11-02T06:30:00Z'));
  });
});

describe('backfill and retries', () => {
  it('reconciliation issues the invoice for a payment whose webhooks never arrived (order and subscription charge)', async () => {
    const b = await buyPass();
    h.stub.simulateOrderPayment(b.orderId); // nothing delivered
    const s = await h.student();
    const sub = (await s.c.post('/v1/billing/subscriptions', { plan: 'plus', interval: 'monthly' })).json() as { subscriptionId: string };
    await h.deliverAll(h.stub.simulateSubscriptionCheckout(sub.subscriptionId));
    h.clock.advance(31 * 86_400_000);
    h.stub.simulateRenewal(sub.subscriptionId); // renewal webhooks lost
    const issued: string[] = [];
    const deps = { db: h.t.db, razorpay: h.stub, now: new Date(h.clock.now()), invoicing: h.config.billing.invoicing, onInvoices: (ids: string[]) => void issued.push(...ids) };
    const dry = await reconcile(deps, { dryRun: true });
    const fields = dry.drift.flatMap((d) => d.changes.filter((c) => c.entity === 'invoice').map((c) => `${d.kind}:${c.field}`));
    expect(fields).toEqual(expect.arrayContaining(['order:tax_invoice', 'subscription:tax_invoice']));
    expect(dry.alerts).toBeGreaterThanOrEqual(2);
    await reconcile(deps, { dryRun: false });
    expect((await docs(b.userId)).map((r) => r.type)).toEqual(['tax_invoice']);
    expect((await docs(s.userId)).map((r) => r.type)).toEqual(['tax_invoice', 'tax_invoice']);
    expect(issued).toHaveLength(2);
    const clean = await reconcile(deps, { dryRun: true });
    expect(clean.drift.filter((d) => d.changes.some((c) => c.entity === 'invoice'))).toEqual([]);
    h.clock.set(Date.parse('2026-11-02T06:30:00Z'));
  });

  it('the sweep issues what was missed while invoicing was off, renders the PDF and retries a failed email with backoff', async () => {
    h.config.billing.invoicing!.enabled = false;
    const { userId } = await payPass();
    expect(await docs(userId)).toHaveLength(0);
    h.config.billing.invoicing!.enabled = true;
    h.email.failing = true;
    const first = await h.services.billing.invoices.sweep();
    expect(first.issued).toBeGreaterThanOrEqual(1);
    const [inv] = await docs(userId);
    expect(inv).toMatchObject({ sentAt: null, emailAttempts: 1, emailLastError: 'EmailDeliveryError' });
    expect(inv!.pdfBlobPath).not.toBeNull();
    expect(inv!.emailNextAt!.getTime()).toBe(h.clock.now() + INVOICING.email.retryBaseMinutes * 60_000);
    h.email.failing = false;
    await h.services.billing.invoices.sweep(); // not due yet
    expect((await docs(userId))[0]!.sentAt).toBeNull();
    h.clock.advance(INVOICING.email.retryBaseMinutes * 60_000 + 1);
    const later = await h.services.billing.invoices.sweep();
    expect(later.emailed).toBeGreaterThanOrEqual(1);
    expect((await docs(userId))[0]).toMatchObject({ emailAttempts: 2, emailLastError: null });
    expect((await docs(userId))[0]!.sentAt).not.toBeNull();
  });

  it('production refuses to issue while the seller street line is a placeholder (payment still applies)', async () => {
    h.config.billing.invoicing!.production = true;
    useSettings({ ...INVOICING });
    try {
      const { userId } = await payPass();
      expect(await docs(userId)).toHaveLength(0);
      expect(await h.services.billing.entitlements.planFor(userId, new Date(h.clock.now()))).toBe('board_exam_pass');
      expect(h.logs.some((l) => l.event === 'invoicing_refused' && l.alert === true)).toBe(true);
      expect((await h.services.billing.invoices.sweep()).refused).toBe(true);
    } finally {
      h.config.billing.invoicing!.production = false;
    }
  });
});

describe('access', () => {
  it('GET /v1/me/invoices lists only my documents; the PDF is owner-only (another user gets 404)', async () => {
    const a = await payPass();
    const other = await h.student();
    const list = await a.c.get('/v1/me/invoices');
    expect(list.statusCode).toBe(200);
    const mine = list.json().invoices as { id: string; number: string; title: string; totalLabel: string; type: string }[];
    expect(mine).toHaveLength(1);
    expect(mine[0]).toMatchObject({ type: 'tax_invoice', title: 'Invoice', totalLabel: '₹499.00', planName: 'Board Exam Pass', originalNumber: null, gstRegistered: false });
    expect((await other.c.get('/v1/me/invoices')).json()).toEqual({ invoices: [] });

    const pdf = await a.c.get(`/v1/me/invoices/${mine[0]!.id}/pdf`);
    expect(pdf.statusCode).toBe(200);
    expect(pdf.headers['content-type']).toBe('application/pdf');
    expect(pdf.headers['cache-control']).toBe('no-store');
    expect(pdf.rawPayload.subarray(0, 8).toString('latin1')).toBe('%PDF-1.4');
    expect(extractPdfText(pdf.rawPayload).join(' ')).toContain(mine[0]!.number);

    const theirs = await other.c.get(`/v1/me/invoices/${mine[0]!.id}/pdf`);
    expect(theirs.statusCode).toBe(404);
    expect((await other.c.get('/v1/me/invoices/0193e000-0000-7000-8000-000000000000/pdf')).statusCode).toBe(404);
    expect((await h.client().get('/v1/me/invoices')).statusCode).toBe(401);
    expect((await a.c.get('/v1/me/invoices/not-a-uuid/pdf')).statusCode).toBe(400);
  });

  it('with billing off the list is still served (empty for a new student)', async () => {
    h.config.billing.enabled = false;
    try {
      const s = await h.student();
      expect((await s.c.get('/v1/me/invoices')).json()).toEqual({ invoices: [] });
    } finally {
      h.config.billing.enabled = true;
    }
  });

  it('account deletion keeps the invoice, erases the buyer and re-renders the stored PDF without them', async () => {
    h.stub.payerEmail = 'erase.me@example.com';
    const a = await payPass({ buyerName: 'Meera Iyer' });
    const [before] = await docs(a.userId);
    h.clock.advance(60_000);
    const del = await a.c.delete('/v1/me');
    expect(del.statusCode, del.body).toBeLessThan(300);
    const [after] = await h.t.db.select().from(invoices).where(eq(invoices.id, before!.id));
    expect(after).toMatchObject({ number: before!.number, totalPaise: before!.totalPaise, userId: a.userId, buyerName: null, buyerEmail: null });
    expect(after!.buyerAnonymisedAt).not.toBeNull();
    h.clock.advance(60_000);
    const r = await h.services.billing.invoices.sweep();
    expect(r.rendered).toBeGreaterThanOrEqual(1);
    const stored = await blob().get('invoices', after!.pdfBlobPath!, 1e6);
    const text = extractPdfText(stored).join(' ');
    expect(text).toContain(before!.number);
    expect(text).not.toContain('Meera Iyer');
    expect(text).not.toContain('erase.me@example.com');
  });
});

describe('admin', () => {
  async function verifiedAdmin() {
    const c = h.client();
    const { user } = await c.signInEmail(email('admin'));
    await h.services.adapter().then((x) => x.updateUser(user.id, { role: 'admin' }));
    const { secret } = (await c.post('/v1/me/mfa/totp/enroll')).json() as { secret: string };
    const confirm = await c.post('/v1/me/mfa/totp/confirm', { code: totpAt(base32Decode(secret), stepAt(h.clock.now())) });
    expect(confirm.statusCode, confirm.body).toBe(200);
    return c;
  }

  it('lists by IST date range, exports CSV for the accountant and resends; students are refused', async () => {
    h.stub.payerEmail = 'csv@example.com';
    const { userId, c: student } = await payPass({ placeOfSupply: '27' });
    const [inv] = await docs(userId);
    const admin = await verifiedAdmin();
    const day = inv!.issueDate;

    expect((await student.get(`/v1/admin/invoices?from=${day}&to=${day}`)).statusCode).toBe(403);
    const list = await admin.get(`/v1/admin/invoices?from=${day}&to=${day}`);
    expect(list.statusCode, list.body).toBe(200);
    const row = (list.json().invoices as { number: string }[]).find((r) => r.number === inv!.number);
    expect(row).toMatchObject({ placeOfSupply: '27', placeOfSupplyName: 'Maharashtra', taxablePaise: 49_900, sac: '999293', razorpayPaymentId: inv!.razorpayPaymentId, buyerErased: false });
    expect((await admin.get(`/v1/admin/invoices?from=${day}&to=2026-01-01`)).statusCode).toBe(400);
    expect((await admin.get('/v1/admin/invoices?from=2026-01-01&to=2027-06-01')).statusCode).toBe(400);
    expect((await admin.get('/v1/admin/invoices?from=bad&to=2026-01-01')).statusCode).toBe(400);

    const csv = await admin.get(`/v1/admin/invoices/export?from=${day}&to=${day}`);
    expect(csv.statusCode).toBe(200);
    expect(csv.headers['content-type']).toBe('text/csv; charset=utf-8');
    const lines = csv.body.trim().split('\r\n');
    expect(lines[0]).toBe('Document type,Document number,Document date,Original invoice number,Original invoice date,Place of supply,Supply type,GST registered,SAC,Description,Taxable value,Rate (%),CGST,SGST,IGST,Total,Razorpay payment id');
    expect(lines.find((l) => l.includes(inv!.number))).toBe(`Invoice,${inv!.number},${day},,,27-Maharashtra,Not registered,No,999293,"SOYL Academy Board Exam Pass, valid until 31 Mar 2027 (AI tutor credits)",499.00,0,0.00,0.00,0.00,499.00,${inv!.razorpayPaymentId}`);

    const sent = h.email.outbox.filter((m) => m.to === 'csv@example.com').length;
    const resend = await admin.post(`/v1/admin/invoices/${inv!.id}/resend`, {});
    expect(resend.json()).toEqual({ status: 'sent' });
    expect(h.email.outbox.filter((m) => m.to === 'csv@example.com')).toHaveLength(sent + 1);
    expect((await admin.post('/v1/admin/invoices/0193e000-0000-7000-8000-000000000000/resend', {})).statusCode).toBe(404);
    expect((await student.post(`/v1/admin/invoices/${inv!.id}/resend`, {})).statusCode).toBe(403);
  });
});
