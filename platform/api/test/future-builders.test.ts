/**
 * Future Builders registrations and enquiries (ADR-027) on a real PostgreSQL: ingest auth (edge secret + ingest
 * key), validation, idempotency on the Razorpay payment id (one row, one email, also under concurrency), gap-free
 * receipt numbers, the confirmation email (Bill of Supply wording, IST date, ₹ amount, reply-to, escaping), the
 * email-failure path and resend, enquiries with duplicate suppression and the per-IP limit, and the superadmin
 * admin API (role enforcement, filters, summary, paging, CSV with formula-injection guard, audit).
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { and, eq, like } from 'drizzle-orm';
import { auditLog, fbEnrollments, fbLeads, staffCapabilities } from '@soyl/db';
import { INVOICING } from '@soyl/shared/config/invoicing';
import { DEV_DEFAULTS } from '../src/config';
import { confirmationEmail, displayPhone, gradeLabel, istDateTime } from '../src/future-builders/email';
import { csvCell, receiptYear } from '../src/future-builders/service';
import { createHarness, securityEvents, type Client, type Harness } from './helpers';

const NOTIFY = 'fb-staff@example.com';
const KEY = DEV_DEFAULTS.fbIngestKey;
const ENROL = '/v1/ingest/future-builders/enrollments';
const LEADS = '/v1/ingest/future-builders/leads';

let h: Harness;
let server: Client;
let superadmin: Client;
let n = 0;
const uniq = () => `${Date.now().toString(36)}${(++n).toString(36)}`.replace(/[^A-Za-z0-9]/g, '');

beforeAll(async () => {
  h = await createHarness({ env: { FB_NOTIFY_EMAIL: NOTIFY } });
  // The marketing server: edge secret, its own IP, no browser Origin.
  server = h.client('198.51.100.7');
  superadmin = await staff({ superadmin: true });
});
afterAll(async () => {
  await h?.close();
});
beforeEach(() => {
  h.email.failing = false;
});

const drain = () => h.services.futureBuilders.drain();

function body(over: Record<string, unknown> = {}) {
  const id = uniq();
  return {
    razorpayOrderId: `order_${id}`,
    razorpayPaymentId: `pay_${id}`,
    amountPaise: 499_900,
    currency: 'INR',
    paidAt: '2026-11-08T10:12:00Z',
    cohort: 'summer-2027',
    offer: 'diwali-2026',
    coupon: 'FRIEND500',
    friendName: null,
    parentName: 'Meera Rao',
    studentName: 'Arjun Rao',
    email: `parent.${id.toLowerCase()}@example.com`,
    phone: '+919876543210',
    grade: '8',
    source: 'checkout',
    ...over,
  };
}

// Each call from its own client IP (as each parent's request is), so the per-IP ingest limit never trips here.
const ingest = (b: unknown, o: { key?: string | null; edge?: string | null; client?: Client } = {}) =>
  (o.client ?? h.client()).post(ENROL, b, { origin: null, edge: o.edge, headers: { 'x-soyl-ingest-key': o.key === null ? undefined : (o.key ?? KEY) } });
const lead = (b: unknown, o: { key?: string | null; client?: Client } = {}) =>
  (o.client ?? h.client()).post(LEADS, b, { origin: null, headers: { 'x-soyl-ingest-key': o.key === null ? undefined : (o.key ?? KEY) } });

async function staff(o: { superadmin?: boolean; role?: 'admin' | 'reviewer' } = {}): Promise<Client> {
  const c = h.client();
  const { user } = await c.signInEmail(`fb.staff.${uniq().toLowerCase()}@example.com`);
  await h.services.adapter().then((x) => x.updateUser(user.id, { role: o.role ?? 'admin' }));
  if (o.superadmin) await h.t.db.insert(staffCapabilities).values({ userId: user.id, capability: 'superadmin' });
  return c;
}

const rowsFor = (paymentId: string) => h.t.db.select().from(fbEnrollments).where(eq(fbEnrollments.razorpayPaymentId, paymentId));
const mailsTo = (to: string) => h.email.outbox.filter((m) => m.to === to);

describe('ingest auth', () => {
  it('refuses without the edge secret (403), and without or with a wrong ingest key (401); nothing is stored', async () => {
    const b = body();
    const noEdge = await ingest(b, { edge: null });
    expect(noEdge.statusCode).toBe(403);
    expect(noEdge.json()).toMatchObject({ code: 'edge_auth_failed' });

    const noKey = await ingest(b, { key: null });
    expect(noKey.statusCode).toBe(401);
    expect(noKey.json()).toMatchObject({ code: 'ingest_auth_failed', status: 401 });

    const wrongKey = await ingest(b, { key: `${KEY}x` });
    expect(wrongKey.statusCode).toBe(401);
    // The edge secret is not an ingest key.
    expect((await ingest(b, { key: h.edgeSecrets[0] })).statusCode).toBe(401);
    expect((await lead({ kind: 'callback', parentName: 'A', phone: '+919876543210', source: 'fb_summer_2027' }, { key: null })).statusCode).toBe(401);

    expect(await rowsFor(b.razorpayPaymentId)).toHaveLength(0);
    const events = securityEvents(h.logs, 'ingest_auth_failed');
    expect(events.length).toBeGreaterThanOrEqual(3);
    expect(JSON.stringify(events)).not.toContain(KEY);
  });

  it('accepts the previous key while rotating (FB_INGEST_KEY_PREVIOUS)', async () => {
    const previous = 'previous-fb-ingest-key-for-rotation-test-0001';
    const current = 'current-fb-ingest-key-for-rotation-test-00001';
    const h2 = await createHarness({ t: h.t, env: { FB_INGEST_KEY: current, FB_INGEST_KEY_PREVIOUS: previous } });
    try {
      const c = h2.client('198.51.100.9');
      const post = (key: string) => c.post(LEADS, { kind: 'notify', parentName: 'Rotation', phone: '+919811111111', source: `rot_${uniq().toLowerCase()}` }, { origin: null, headers: { 'x-soyl-ingest-key': key } });
      expect((await post(current)).statusCode).toBe(201);
      expect((await post(previous)).statusCode).toBe(201);
      expect((await post(KEY)).statusCode).toBe(401); // the dev default is not accepted once keys are configured
    } finally {
      await h2.close();
    }
  });
});

describe('registration ingest', () => {
  it('validates the body (API-8)', async () => {
    const bad: Record<string, unknown>[] = [
      { phone: '9876543210' },
      { phone: '+14155550100' },
      { amountPaise: 0 },
      { amountPaise: 12.5 },
      { currency: 'USD' },
      { offer: 'black-friday' },
      { source: 'admin' },
      { email: 'not-an-email' },
      { paidAt: 'yesterday' },
      { razorpayPaymentId: 'abc' },
      { cohort: 'Summer 2027' },
      { parentName: '' },
      { parentName: 'x'.repeat(101) },
      { studentName: 'a\u0000b' },
      { unexpected: true },
    ];
    for (const over of bad) {
      const res = await ingest(body(over));
      expect(res.statusCode, JSON.stringify(over)).toBe(400);
      expect(res.json().code).toBe('validation_failed');
    }
    const { grade: _g, ...missing } = body();
    expect((await ingest(missing)).statusCode).toBe(400);
  });

  it('stores the registration, numbers the receipt and emails the parent (and staff) once', async () => {
    const b = body({ parentName: 'Meera <b>Rao</b>', friendName: 'Kabir', coupon: 'FRIEND500' });
    const res = await ingest(b);
    expect(res.statusCode, res.body).toBe(200);
    const out = res.json() as { enrollmentId: string; receiptNumber: string; created: boolean };
    expect(out.created).toBe(true);
    expect(out.receiptNumber).toMatch(/^FB-2027-\d{6}$/);
    await drain();

    const [row] = await rowsFor(b.razorpayPaymentId);
    expect(row).toMatchObject({
      id: out.enrollmentId,
      receiptNumber: out.receiptNumber,
      amountPaise: 499_900,
      currency: 'INR',
      offer: 'diwali-2026',
      coupon: 'FRIEND500',
      friendName: 'Kabir',
      phone: '+919876543210',
      grade: '8',
      source: 'checkout',
      emailStatus: 'sent',
      emailAttempts: 1,
      emailLastError: null,
    });
    expect(row!.paidAt.toISOString()).toBe('2026-11-08T10:12:00.000Z');
    expect(row!.emailSentAt).not.toBeNull();
    expect(row!.staffNotifiedAt).not.toBeNull();

    const mails = mailsTo(b.email);
    expect(mails).toHaveLength(1);
    const m = mails[0]!;
    expect(m.subject).toBe(`Payment received — you're registered for Future Builders Summer Camp 2027 (${out.receiptNumber})`);
    expect(m.replyTo).toBe(INVOICING.seller.email);
    for (const s of [
      'Meera <b>Rao</b>',
      'Arjun Rao (Grade 8)',
      out.receiptNumber,
      b.razorpayPaymentId,
      '₹4,999.00',
      '8 Nov 2026, 3:42 pm IST',
      'Bill of Supply',
      INVOICING.unregisteredNote,
      'April–May 2027',
      'exact dates and the timetable are shared after registration',
      'WhatsApp you on +91 98765 43210 within 24 hours',
      'Joining instructions',
      'ESP32-C3',
      '+91 70225 09965',
      'https://www.soylai.com/refund-policy',
      'Diwali 2026 offer, code FRIEND500',
    ])
      expect(m.text, s).toContain(s);
    // HTML: every value escaped, the brand, the links.
    expect(m.html).toContain('Meera &lt;b&gt;Rao&lt;/b&gt;');
    expect(m.html).not.toContain('<b>Rao</b>');
    expect(m.html).toContain('href="https://wa.me/917022509965"');
    expect(m.html).toContain('href="https://www.soylai.com/refund-policy"');
    expect(m.html).toContain('Bill of Supply');

    const staffMail = mailsTo(NOTIFY).find((x) => x.subject.includes(out.receiptNumber));
    expect(staffMail?.text).toContain('Parent confirmation email: sent');
    expect(staffMail?.text).toContain('https://www.soylai.test/admin');
  });

  it('is idempotent on razorpayPaymentId: same record, created false, no second email (also when reported concurrently)', async () => {
    const b = body();
    const first = (await ingest(b)).json();
    await drain();
    const again = await ingest({ ...b, source: 'webhook' });
    expect(again.statusCode).toBe(200);
    expect(again.json()).toEqual({ ...first, created: false });
    await drain();
    expect(await rowsFor(b.razorpayPaymentId)).toHaveLength(1);
    expect(mailsTo(b.email)).toHaveLength(1);
    expect(mailsTo(NOTIFY).filter((x) => x.subject.includes(first.receiptNumber))).toHaveLength(1);

    // Checkout callback and webhook racing: one row, one email.
    const c = body();
    const results = await Promise.all([ingest(c), ingest({ ...c, source: 'webhook' }), ingest(c)]);
    for (const r of results) expect(r.statusCode).toBe(200);
    const bodies = results.map((r) => r.json());
    expect(new Set(bodies.map((x) => x.enrollmentId)).size).toBe(1);
    expect(bodies.filter((x) => x.created)).toHaveLength(1);
    await drain();
    expect(await rowsFor(c.razorpayPaymentId)).toHaveLength(1);
    expect(mailsTo(c.email)).toHaveLength(1);
  });

  it('logs (without personal data) a repeat report whose order or amount differs, and keeps the first', async () => {
    const b = body();
    await ingest(b);
    const res = await ingest({ ...b, amountPaise: 100 });
    expect(res.json().created).toBe(false);
    const [row] = await rowsFor(b.razorpayPaymentId);
    expect(row!.amountPaise).toBe(499_900);
    const ev = h.logs.find((l) => l.event === 'fb_enrollment_mismatch' && l.enrollmentId === row!.id);
    expect(ev).toBeTruthy();
    expect(JSON.stringify(ev)).not.toContain(b.email);
    await drain();
  });

  it('gives gap-free receipt numbers per cohort year under concurrency', async () => {
    const before = await h.t.db.select({ seq: fbEnrollments.receiptSeq }).from(fbEnrollments).where(eq(fbEnrollments.receiptYear, 2031));
    expect(before).toHaveLength(0);
    const res = await Promise.all(Array.from({ length: 6 }, () => ingest(body({ cohort: 'summer-2031' }))));
    for (const r of res) expect(r.statusCode).toBe(200);
    const numbers = res.map((r) => r.json().receiptNumber as string).sort();
    expect(numbers).toEqual(['FB-2031-000001', 'FB-2031-000002', 'FB-2031-000003', 'FB-2031-000004', 'FB-2031-000005', 'FB-2031-000006']);
    await drain();
  });

  it('an email failure never fails the ingest: recorded as failed, alert logged, staff resend later', async () => {
    h.email.failing = true;
    const b = body();
    const res = await ingest(b);
    expect(res.statusCode).toBe(200);
    expect(res.json().created).toBe(true);
    await drain();
    const [row] = await rowsFor(b.razorpayPaymentId);
    expect(row).toMatchObject({ emailStatus: 'failed', emailAttempts: 1, emailLastError: 'EmailDeliveryError', emailSentAt: null });
    const alert = h.logs.find((l) => l.event === 'fb_confirmation_email_failed' && l.enrollmentId === row!.id);
    expect(alert).toMatchObject({ alert: true });
    expect(JSON.stringify(alert)).not.toContain(b.email);
    // A repeat report does not retry the email by itself (no second email from ingest).
    h.email.failing = false;
    await ingest(b);
    await drain();
    expect(mailsTo(b.email)).toHaveLength(0);

    const resend = await superadmin.post(`/v1/admin/future-builders/enrollments/${row!.id}/resend`, {});
    expect(resend.statusCode, resend.body).toBe(200);
    expect(resend.json()).toEqual({ emailStatus: 'sent' });
    expect(mailsTo(b.email)).toHaveLength(1);
    const [after] = await rowsFor(b.razorpayPaymentId);
    expect(after).toMatchObject({ emailStatus: 'sent', emailAttempts: 2, emailLastError: null });
    const audits = await h.t.db.select().from(auditLog).where(and(eq(auditLog.action, 'admin.fb.enrollment.resend'), eq(auditLog.targetId, row!.id)));
    expect(audits).toHaveLength(1);
    expect(audits[0]!.after).toEqual({ emailStatus: 'sent' });

    // A failed resend of an email that was delivered before keeps status sent (the parent has it).
    h.email.failing = true;
    expect((await superadmin.post(`/v1/admin/future-builders/enrollments/${row!.id}/resend`, {})).json()).toEqual({ emailStatus: 'failed' });
    const [kept] = await rowsFor(b.razorpayPaymentId);
    expect(kept).toMatchObject({ emailStatus: 'sent', emailLastError: 'EmailDeliveryError' });
    expect((await superadmin.post('/v1/admin/future-builders/enrollments/0193e000-0000-7000-8000-000000000000/resend', {})).statusCode).toBe(404);
  });
});

describe('enquiry ingest', () => {
  it('creates a lead (201), validates, and treats the same phone + kind + form within a day as one', async () => {
    const phone = '+919900011122';
    const source = `fb_summer_${uniq().toLowerCase()}`;
    const res = await lead({ kind: 'callback', parentName: 'Ravi Kumar', studentName: 'Isha', email: 'ravi@example.com', phone, grade: '10', source });
    expect(res.statusCode, res.body).toBe(201);
    const { leadId } = res.json() as { leadId: string };
    const [row] = await h.t.db.select().from(fbLeads).where(eq(fbLeads.id, leadId));
    expect(row).toMatchObject({ kind: 'callback', parentName: 'Ravi Kumar', studentName: 'Isha', email: 'ravi@example.com', phone, grade: '10', source });

    // Optional fields may be omitted or empty.
    const minimal = await lead({ kind: 'waitlist', parentName: 'Only Parent', phone, source, email: '' });
    expect(minimal.statusCode).toBe(201);
    const [m] = await h.t.db.select().from(fbLeads).where(eq(fbLeads.id, minimal.json().leadId));
    expect(m).toMatchObject({ studentName: null, email: null, grade: null });

    const dup = await lead({ kind: 'callback', parentName: 'Ravi K', phone, source });
    expect(dup.statusCode).toBe(201);
    expect(dup.json()).toEqual({ leadId });
    expect(await h.t.db.select().from(fbLeads).where(and(eq(fbLeads.phone, phone), eq(fbLeads.source, source)))).toHaveLength(2);

    for (const bad of [{ kind: 'spam' }, { phone: '12345' }, { parentName: '' }, { source: 'Has Spaces' }, { email: 'x@' }, { extra: 1 }])
      expect((await lead({ kind: 'notify', parentName: 'P', phone, source, ...bad })).statusCode, JSON.stringify(bad)).toBe(400);
    expect((await lead({ kind: 'notify', parentName: 'P', source })).statusCode).toBe(400);

    await drain();
    expect(mailsTo(NOTIFY).some((x) => x.subject === 'FB enquiry (callback): Ravi Kumar')).toBe(true);
  });

  it('applies the per-IP ingest limit (fb.ingest.ip) before the key check', async () => {
    const c = h.client('198.51.100.200');
    let last = 0;
    for (let i = 0; i < 61; i++) last = (await c.post(LEADS, {}, { origin: null, headers: { 'x-soyl-ingest-key': 'wrong' } })).statusCode;
    expect(last).toBe(429);
  });
});

describe('admin', () => {
  it('is superadmin only: guests 401, students 403, reviewers 403, plain admins 403', async () => {
    const urls = ['/v1/admin/future-builders/enrollments', '/v1/admin/future-builders/enrollments/export', '/v1/admin/future-builders/leads', '/v1/admin/future-builders/leads/export'];
    const student = h.client();
    await student.signInEmail(`fb.student.${uniq().toLowerCase()}@example.com`);
    const reviewer = await staff({ role: 'reviewer' });
    const plainAdmin = await staff();
    for (const url of urls) {
      expect((await h.client().get(url)).statusCode, url).toBe(401);
      expect((await student.get(url)).statusCode, url).toBe(403);
      expect((await reviewer.get(url)).statusCode, url).toBe(403);
      expect((await plainAdmin.get(url)).statusCode, url).toBe(403);
      expect((await superadmin.get(url)).statusCode, url).toBe(200);
    }
    expect((await plainAdmin.post('/v1/admin/future-builders/enrollments/0193e000-0000-7000-8000-000000000000/resend', {})).statusCode).toBe(403);
    // Ingest keys do not open admin routes, and admin sessions do not open ingest without the key.
    expect((await server.get('/v1/admin/future-builders/enrollments', { headers: { 'x-soyl-ingest-key': KEY } })).statusCode).toBe(401);
    expect((await superadmin.post(ENROL, body())).statusCode).toBe(401);
    expect((await superadmin.get('/v1/admin/me')).json().sections).toEqual(['analytics', 'users', 'future_builders', 'reports']);
    expect((await reviewer.get('/v1/admin/me')).json().sections).toEqual(['reports']);
  });

  it('lists with filters, totals and paging; exports CSV (formula-guarded); every call audited', async () => {
    // A fresh cohort year and IST day so the numbers are exact.
    const day = '2030-01-15';
    const a = body({ paidAt: '2030-01-15T00:10:00+05:30', cohort: 'summer-2030', amountPaise: 400_000 });
    const b2 = body({ paidAt: '2030-01-15T23:50:00+05:30', cohort: 'summer-2030', amountPaise: 499_900, parentName: '=HYPERLINK("http://x")', offer: 'standard', coupon: null });
    const outside = body({ paidAt: '2030-01-15T18:40:00Z', cohort: 'summer-2030' }); // 2030-01-16 00:10 IST
    await ingest(a);
    await drain(); // a's email goes out before the outage starts
    h.email.failing = true;
    await ingest(b2);
    await drain();
    h.email.failing = false;
    await ingest(outside);
    await drain();

    const list = await superadmin.get(`/v1/admin/future-builders/enrollments?from=${day}&to=${day}`);
    expect(list.statusCode, list.body).toBe(200);
    const page = list.json();
    expect(page.summary).toEqual({ count: 2, totalPaise: 899_900, emailFailed: 1 });
    expect(page.enrollments.map((e: { razorpayPaymentId: string }) => e.razorpayPaymentId)).toEqual([b2.razorpayPaymentId, a.razorpayPaymentId]);
    expect(page.enrollments[0]).toMatchObject({ emailStatus: 'failed', offer: 'standard', coupon: null, amountPaise: 499_900, currency: 'INR', phone: '+919876543210' });

    const failed = (await superadmin.get(`/v1/admin/future-builders/enrollments?from=${day}&to=${day}&emailStatus=failed`)).json();
    expect(failed.enrollments.map((e: { razorpayPaymentId: string }) => e.razorpayPaymentId)).toEqual([b2.razorpayPaymentId]);

    const p1 = (await superadmin.get(`/v1/admin/future-builders/enrollments?from=${day}&to=2030-01-16&limit=2`)).json();
    expect(p1.summary.count).toBe(3);
    expect(p1.enrollments).toHaveLength(2);
    expect(p1.nextCursor).toBeTruthy();
    const p2 = (await superadmin.get(`/v1/admin/future-builders/enrollments?from=${day}&to=2030-01-16&limit=2&cursor=${p1.nextCursor}`)).json();
    expect(p2.enrollments.map((e: { razorpayPaymentId: string }) => e.razorpayPaymentId)).toEqual([a.razorpayPaymentId]);
    expect(p2.nextCursor).toBeNull();

    expect((await superadmin.get('/v1/admin/future-builders/enrollments?from=2030-01-16&to=2030-01-15')).statusCode).toBe(400);
    expect((await superadmin.get('/v1/admin/future-builders/enrollments?cursor=bogus')).statusCode).toBe(400);
    expect((await superadmin.get('/v1/admin/future-builders/enrollments?emailStatus=lost')).statusCode).toBe(400);

    const csv = await superadmin.get(`/v1/admin/future-builders/enrollments/export?from=${day}&to=${day}`);
    expect(csv.statusCode).toBe(200);
    expect(csv.headers['content-type']).toBe('text/csv; charset=utf-8');
    expect(csv.headers['cache-control']).toBe('no-store');
    const lines = csv.body.trim().split('\r\n');
    expect(lines[0]).toBe('Receipt number,Paid at (IST),Parent name,Student name,Email,Phone,Grade,Amount (INR),Offer,Coupon,Friend name,Cohort,Razorpay payment id,Razorpay order id,Source,Email status');
    expect(lines).toHaveLength(3);
    const [r1] = await rowsFor(b2.razorpayPaymentId);
    expect(lines[1]).toBe(
      `${r1!.receiptNumber},2030-01-15 23:50,"'=HYPERLINK(""http://x"")",Arjun Rao,${b2.email},'+919876543210,8,4999.00,standard,,,summer-2030,${b2.razorpayPaymentId},${b2.razorpayOrderId},checkout,failed`,
    );

    const audits = await h.t.db.select().from(auditLog).where(like(auditLog.action, 'admin.fb.%'));
    const actions = audits.map((x) => x.action);
    expect(actions).toEqual(expect.arrayContaining(['admin.fb.enrollments.list', 'admin.fb.enrollments.export']));
    const exp = audits.find((x) => x.action === 'admin.fb.enrollments.export' && (x.after as { filters: { from?: string } }).filters.from === day);
    expect(exp?.after).toEqual({ filters: { from: day, to: day }, rows: 2 });
    // Audit rows hold ids, filters and counts only (DB-8).
    expect(JSON.stringify(audits)).not.toContain('example.com');
  });

  it('lists and exports enquiries by kind and IST day', async () => {
    const source = `fb_admin_${uniq().toLowerCase()}`;
    h.clock.set(Date.parse('2029-03-10T12:00:00+05:30'));
    try {
      await lead({ kind: 'callback', parentName: 'Lead One', phone: '+919700000001', source });
      await lead({ kind: 'waitlist', parentName: 'Lead Two', phone: '+919700000002', source, studentName: 'Kid', grade: '9', email: 'two@example.com' });
    } finally {
      h.clock.set(Date.now());
    }
    const q = '?from=2029-03-10&to=2029-03-10';
    const all = (await superadmin.get(`/v1/admin/future-builders/leads${q}`)).json();
    expect(all.summary).toEqual({ count: 2 });
    expect(all.leads.map((l: { parentName: string }) => l.parentName)).toEqual(['Lead Two', 'Lead One']);
    const wait = (await superadmin.get(`/v1/admin/future-builders/leads${q}&kind=waitlist`)).json();
    expect(wait.leads).toHaveLength(1);
    expect(wait.leads[0]).toMatchObject({ kind: 'waitlist', studentName: 'Kid', grade: '9', email: 'two@example.com', phone: '+919700000002', source });

    const csv = await superadmin.get(`/v1/admin/future-builders/leads/export${q}&kind=callback`);
    expect(csv.statusCode).toBe(200);
    const lines = csv.body.trim().split('\r\n');
    expect(lines).toEqual(['Created at (IST),Kind,Parent name,Student name,Email,Phone,Grade,Form', `2029-03-10 12:00,callback,Lead One,,,'+919700000001,,${source}`]);
    const audits = await h.t.db.select().from(auditLog).where(eq(auditLog.action, 'admin.fb.leads.export'));
    expect(audits.at(-1)).toMatchObject({ targetType: 'fb_lead', after: { filters: { from: '2029-03-10', to: '2029-03-10', kind: 'callback' }, rows: 1 } });
  });
});

describe('units', () => {
  it('receipt year from the cohort, else the IST year of the payment', () => {
    expect(receiptYear('summer-2027', new Date('2026-11-08T00:00:00Z'))).toBe(2027);
    expect(receiptYear('winter', new Date('2026-12-31T19:00:00Z'))).toBe(2027); // 1 Jan 2027 00:30 IST
    expect(receiptYear('winter', new Date('2026-12-31T18:00:00Z'))).toBe(2026);
  });

  it('formats IST times, grades and CSV cells', () => {
    expect(istDateTime(new Date('2026-11-08T10:12:00Z'))).toBe('8 Nov 2026, 3:42 pm IST');
    expect(gradeLabel('8')).toBe('Grade 8');
    expect(displayPhone('+919876543210')).toBe('+91 98765 43210');
    expect(gradeLabel('Class 9')).toBe('Class 9');
    expect(csvCell('@SUM(A1)')).toBe("'@SUM(A1)");
    expect(csvCell('a,b')).toBe('"a,b"');
    expect(csvCell(null)).toBe('');
  });

  it('the confirmation follows the GST mode: Bill of Supply while unregistered, no such wording once registered', () => {
    const e = { receiptNumber: 'FB-2027-000001', razorpayPaymentId: 'pay_X', amountPaise: 123_456_700, paidAt: new Date('2026-11-08T10:12:00Z'), cohort: 'unknown-cohort', offer: 'standard', coupon: null, parentName: 'P', studentName: 'S', email: 'p@example.com', phone: '+919876543210', grade: 'Grade 11' };
    const unreg = confirmationEmail(e, { replyTo: 'help@example.com' });
    expect(unreg.text).toContain('Receipt / Bill of Supply no.: FB-2027-000001');
    expect(unreg.text).toContain('₹12,34,567.00');
    expect(unreg.text).toContain(`Supplier: ${INVOICING.seller.legalName}`);
    expect(unreg.text).toContain(INVOICING.signatureNote);
    expect(unreg.subject).toContain('registered for Future Builders (FB-2027-000001)');
    expect(unreg.replyTo).toBe('help@example.com');
    const reg = confirmationEmail(e, { replyTo: 'help@example.com', invoicing: { ...INVOICING, gstRegistered: true } });
    expect(reg.text).not.toContain('Bill of Supply');
    expect(reg.text).not.toContain(INVOICING.unregisteredNote);
    expect(reg.text).toContain('Receipt no.: FB-2027-000001');
  });
});
