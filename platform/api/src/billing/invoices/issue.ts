/**
 * Issuing invoices and credit notes (ADR-024) — inside the billing transaction that recorded the payment
 * (webhook, refresh, reconciliation, CLI) or by the worker's sweep from database state alone.
 *
 * Exactly once, gap-free:
 *   - an advisory lock per payment serialises everything that could issue for it;
 *   - one tax invoice per payment (checked under the lock; UNIQUE index as the backstop);
 *   - credit notes cover the payment's refunded amount in steps: a note is issued for
 *     refunded − already credited, keyed by the cumulative amount (UNIQUE (invoice, credited_through));
 *   - the number comes from invoice_sequences in the same transaction (row lock), so a rolled-back
 *     transaction rolls its number back too.
 * Nothing is written with `dryRun` (reconciliation probes): the would-be documents are reported as changes.
 */
import { and, desc, eq, inArray, isNull, sql } from 'drizzle-orm';
import { invoices, invoiceSequences, orders, payments, plans, subscriptions, users, type Database } from '@soyl/db';
import { financialYear, formatDocumentNumber, isGstStateCode, istDate, splitGstInclusive } from '@soyl/shared/billing/gst';
import { invoicingProblems, type InvoicingConfig } from '@soyl/shared/config/invoicing';
import { getPlan, type PlanId } from '@soyl/shared/config/plans';
import type { InvoiceRow, LineItem } from './document';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
type Exec = Database | Tx;

export interface InvoicingLog {
  error(obj: Record<string, unknown>, msg: string): void;
}

/** Invoicing as configured for this process (billing/config.ts). */
export interface InvoicingRuntime {
  /** INVOICING_ENABLED (default: on in local/test, off elsewhere). */
  enabled: boolean;
  /** APP_ENV=prod: refuse to issue while invoicingProblems() is not empty. */
  production: boolean;
  settings: InvoicingConfig;
}

export interface InvoiceChange {
  entity: 'invoice';
  id: string;
  field: 'tax_invoice' | 'credit_note';
  from: unknown;
  to: unknown;
}

export interface IssueOutcome {
  issued: string[];
  changes: InvoiceChange[];
  /** Production refused (placeholders): the reasons, for an alert log. */
  refused: string[] | null;
}

const NONE: IssueOutcome = { issued: [], changes: [], refused: null };
export const CAPTURED_STATUSES = ['captured', 'partially_refunded', 'refunded'] as const;
const EMAIL = /^[^@\s]{1,64}@[^@\s]{1,255}\.[A-Za-z]{2,}$/;

/** Why this process may not issue documents now (null: it may). */
export function issueRefusal(rt: InvoicingRuntime | null | undefined): { off: true } | { refused: string[] } | null {
  if (!rt?.enabled) return { off: true };
  if (rt.production) {
    const p = invoicingProblems(rt.settings);
    if (p.length) return { refused: p };
  }
  return null;
}

interface Facts {
  payment: typeof payments.$inferSelect;
  planKey: PlanId;
  interval: string | null;
  razorpayOrderId: string | null;
  razorpaySubscriptionId: string | null;
  placeOfSupply: string | null;
  buyerName: string | null;
  user: { email: string; deletedAt: Date | null } | null;
}

async function loadFacts(tx: Exec, paymentId: string): Promise<Facts | null> {
  const [payment] = await tx.select().from(payments).where(eq(payments.id, paymentId));
  if (!payment) return null;
  let planId: string;
  let base: Pick<Facts, 'interval' | 'razorpayOrderId' | 'razorpaySubscriptionId' | 'placeOfSupply' | 'buyerName'>;
  if (payment.subscriptionId) {
    const [s] = await tx.select().from(subscriptions).where(eq(subscriptions.id, payment.subscriptionId));
    if (!s) return null;
    planId = s.planId;
    base = { interval: s.interval, razorpayOrderId: null, razorpaySubscriptionId: s.razorpaySubscriptionId, placeOfSupply: s.placeOfSupply, buyerName: s.buyerName };
  } else if (payment.orderId) {
    const [o] = await tx.select().from(orders).where(eq(orders.id, payment.orderId));
    if (!o) return null;
    planId = o.planId;
    base = { interval: null, razorpayOrderId: o.razorpayOrderId, razorpaySubscriptionId: null, placeOfSupply: o.placeOfSupply, buyerName: o.buyerName };
  } else return null;
  const [plan] = await tx.select({ key: plans.key }).from(plans).where(eq(plans.id, planId));
  const [user] = payment.userId ? await tx.select({ email: users.email, deletedAt: users.deletedAt }).from(users).where(eq(users.id, payment.userId)) : [];
  return { payment, planKey: plan!.key as PlanId, ...base, user: user ?? null };
}

export function lineDescription(planKey: PlanId, interval: string | null): string {
  const plan = getPlan(planKey);
  if (interval === 'monthly' || interval === 'yearly') return `SOYL Academy ${plan.name} plan, ${interval} subscription (AI tutor credits)`;
  if (plan.validUntil) {
    const until = istDate(new Date(plan.validUntil));
    const [y, m, d] = until.split('-').map(Number);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m! - 1];
    return `SOYL Academy ${plan.name}, valid until ${d} ${month} ${y} (AI tutor credits)`;
  }
  return `SOYL Academy ${plan.name} (AI tutor credits)`;
}

/** Next number of a series in the current transaction (row-locked until commit; rolled back with it). */
export async function allocateNumber(tx: Exec, type: 'tax_invoice' | 'credit_note', fy: string): Promise<number> {
  const [row] = await tx
    .insert(invoiceSequences)
    .values({ series: type, financialYear: fy, lastValue: 1 })
    .onConflictDoUpdate({ target: [invoiceSequences.series, invoiceSequences.financialYear], set: { lastValue: sql`${invoiceSequences.lastValue} + 1` } })
    .returning({ value: invoiceSequences.lastValue });
  return row!.value;
}

function buyer(f: Facts, payerEmail: string | null | undefined, now: Date) {
  if (!f.user || f.user.deletedAt) return { buyerName: null, buyerEmail: null, buyerAnonymisedAt: now };
  const email = payerEmail && EMAIL.test(payerEmail) ? payerEmail : f.user.email && !f.user.email.endsWith('.invalid') && EMAIL.test(f.user.email) ? f.user.email : null;
  return { buyerName: f.buyerName?.trim() || null, buyerEmail: email, buyerAnonymisedAt: null };
}

/**
 * Makes sure a captured payment has its invoice and that every refunded paisa is covered by credit notes.
 * Call inside the transaction that wrote the payment row (or any transaction: it locks the payment).
 */
export async function ensureDocuments(
  tx: Exec,
  rt: InvoicingRuntime | null | undefined,
  paymentId: string,
  o: { now: Date; payerEmail?: string | null; dryRun?: boolean; log?: InvoicingLog },
): Promise<IssueOutcome> {
  const why = issueRefusal(rt);
  if (why && 'off' in why) return NONE;
  if (why) {
    o.log?.error({ alert: true, billing: true, event: 'invoicing_refused', paymentId, problems: why.refused }, 'invoicing refused in production: invoicing config is not ready (OA-22)');
    return { ...NONE, refused: why.refused };
  }
  const cfg = rt!.settings;
  await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtextextended(${`invoice:payment:${paymentId}`}, 0))`);
  const f = await loadFacts(tx, paymentId);
  if (!f || !(CAPTURED_STATUSES as readonly string[]).includes(f.payment.status)) return NONE;

  const out: IssueOutcome = { issued: [], changes: [], refused: null };
  const now = o.now;
  let [inv] = await tx.select().from(invoices).where(and(eq(invoices.paymentId, paymentId), eq(invoices.type, 'tax_invoice')));
  if (!inv) {
    const total = f.payment.amountPaise;
    const placeOfSupply = f.placeOfSupply && isGstStateCode(f.placeOfSupply) ? f.placeOfSupply : cfg.seller.stateCode;
    const gst = splitGstInclusive(total, { ratePercent: cfg.gstRatePercent, sellerStateCode: cfg.seller.stateCode, placeOfSupply, gstRegistered: cfg.gstRegistered });
    out.changes.push({ entity: 'invoice', id: f.payment.razorpayPaymentId, field: 'tax_invoice', from: null, to: { totalPaise: total } });
    if (o.dryRun) {
      if (f.payment.refundedPaise > 0) out.changes.push({ entity: 'invoice', id: f.payment.razorpayPaymentId, field: 'credit_note', from: 0, to: f.payment.refundedPaise });
      return out;
    }
    const fy = financialYear(now);
    const seq = await allocateNumber(tx, 'tax_invoice', fy);
    const item: LineItem = {
      description: lineDescription(f.planKey, f.interval),
      sac: cfg.sac,
      quantity: 1,
      taxablePaise: gst.taxablePaise,
      ratePercent: gst.ratePercent,
      cgstPaise: gst.cgstPaise,
      sgstPaise: gst.sgstPaise,
      igstPaise: gst.igstPaise,
      totalPaise: total,
    };
    [inv] = await tx
      .insert(invoices)
      .values({
        number: formatDocumentNumber(cfg.series.tax_invoice.prefix, fy, seq, cfg.series.tax_invoice.digits),
        type: 'tax_invoice',
        financialYear: fy,
        sequence: seq,
        gstRegistered: cfg.gstRegistered,
        userId: f.payment.userId,
        paymentId,
        razorpayPaymentId: f.payment.razorpayPaymentId,
        razorpayOrderId: f.razorpayOrderId,
        razorpaySubscriptionId: f.razorpaySubscriptionId,
        planKey: f.planKey,
        issuedAt: now,
        issueDate: istDate(now),
        placeOfSupply,
        ...buyer(f, o.payerEmail, now),
        lineItems: [item],
        taxablePaise: gst.taxablePaise,
        cgstPaise: gst.cgstPaise,
        sgstPaise: gst.sgstPaise,
        igstPaise: gst.igstPaise,
        totalPaise: total,
        seller: { ...cfg.seller },
        emailNextAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    out.issued.push(inv!.id);
  }

  const refunded = Math.min(f.payment.refundedPaise, inv!.totalPaise);
  if (refunded <= 0) return out;
  const notes = await tx.select().from(invoices).where(and(eq(invoices.originalInvoiceId, inv!.id), eq(invoices.type, 'credit_note'))).orderBy(desc(invoices.creditedThroughPaise));
  const credited = notes[0]?.creditedThroughPaise ?? 0;
  if (refunded <= credited) return out;
  const amount = refunded - credited;
  out.changes.push({ entity: 'invoice', id: f.payment.razorpayPaymentId, field: 'credit_note', from: credited, to: refunded });
  if (o.dryRun) return out;

  // The note mirrors the invoice's tax treatment. The last step takes exactly what is left of each line,
  // so a fully refunded invoice is fully reversed to the paisa.
  let parts: { taxablePaise: number; cgstPaise: number; sgstPaise: number; igstPaise: number };
  if (refunded === inv!.totalPaise) {
    const sum = (k: 'taxablePaise' | 'cgstPaise' | 'sgstPaise' | 'igstPaise') => notes.reduce((a, n) => a + n[k], 0);
    parts = { taxablePaise: inv!.taxablePaise - sum('taxablePaise'), cgstPaise: inv!.cgstPaise - sum('cgstPaise'), sgstPaise: inv!.sgstPaise - sum('sgstPaise'), igstPaise: inv!.igstPaise - sum('igstPaise') };
  } else {
    const rate = (inv!.lineItems as LineItem[])[0]?.ratePercent || cfg.gstRatePercent;
    const sellerState = (inv!.seller as { stateCode: string }).stateCode;
    parts = splitGstInclusive(amount, { ratePercent: rate, sellerStateCode: sellerState, placeOfSupply: inv!.placeOfSupply, gstRegistered: inv!.gstRegistered });
  }
  const original = (inv!.lineItems as LineItem[])[0];
  const fy = financialYear(now);
  const seq = await allocateNumber(tx, 'credit_note', fy);
  const [cn] = await tx
    .insert(invoices)
    .values({
      number: formatDocumentNumber(cfg.series.credit_note.prefix, fy, seq, cfg.series.credit_note.digits),
      type: 'credit_note',
      financialYear: fy,
      sequence: seq,
      gstRegistered: inv!.gstRegistered,
      userId: f.payment.userId,
      paymentId,
      razorpayPaymentId: f.payment.razorpayPaymentId,
      razorpayOrderId: f.razorpayOrderId,
      razorpaySubscriptionId: f.razorpaySubscriptionId,
      originalInvoiceId: inv!.id,
      creditedThroughPaise: refunded,
      planKey: f.planKey,
      issuedAt: now,
      issueDate: istDate(now),
      placeOfSupply: inv!.placeOfSupply,
      ...buyer(f, inv!.buyerEmail ?? o.payerEmail, now),
      lineItems: [
        {
          description: `Refund against ${inv!.number}: ${original?.description ?? lineDescription(f.planKey, f.interval)}`,
          sac: original?.sac ?? cfg.sac,
          quantity: 1,
          ratePercent: inv!.gstRegistered ? (original?.ratePercent ?? cfg.gstRatePercent) : 0,
          ...parts,
          totalPaise: amount,
        } satisfies LineItem,
      ],
      ...parts,
      totalPaise: amount,
      seller: { ...cfg.seller },
      emailNextAt: now,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: invoices.id });
  out.issued.push(cn!.id);
  return out;
}

/**
 * Payments that are missing documents: captured without a tax invoice, or refunded beyond what their
 * credit notes cover (worker sweep, from database state only).
 */
export async function paymentsMissingDocuments(db: Exec, limit: number): Promise<string[]> {
  const rows = await db.execute<{ id: string }>(sql`
    SELECT p.id FROM ${payments} p
    LEFT JOIN ${invoices} i ON i.payment_id = p.id AND i.type = 'tax_invoice'
    WHERE p.status IN ('captured', 'partially_refunded', 'refunded')
      AND (i.id IS NULL OR p.refunded_paise > COALESCE(
            (SELECT max(cn.credited_through_paise) FROM ${invoices} cn WHERE cn.original_invoice_id = i.id), 0))
    ORDER BY p.created_at
    LIMIT ${limit}`);
  return rows.rows.map((r) => r.id);
}

/** Invoices whose PDF must be (re)rendered: never rendered, or the buyer was erased after rendering. */
export async function invoicesNeedingPdf(db: Exec, limit: number): Promise<string[]> {
  const rows = await db.execute<{ id: string }>(sql`
    SELECT id FROM ${invoices}
    WHERE pdf_rendered_at IS NULL OR (buyer_anonymised_at IS NOT NULL AND pdf_rendered_at < buyer_anonymised_at)
    ORDER BY issued_at LIMIT ${limit}`);
  return rows.rows.map((r) => r.id);
}

/** Invoices whose email is due (not sent, address known, attempts left, retry time reached, not claimed). */
export async function invoicesDueForEmail(db: Exec, now: Date, maxAttempts: number, limit: number): Promise<string[]> {
  const rows = await db
    .select({ id: invoices.id })
    .from(invoices)
    .where(
      and(
        isNull(invoices.sentAt),
        sql`${invoices.buyerEmail} IS NOT NULL`,
        sql`${invoices.emailAttempts} < ${maxAttempts}`,
        sql`(${invoices.emailNextAt} IS NULL OR ${invoices.emailNextAt} <= ${now})`,
        sql`(${invoices.emailClaimedUntil} IS NULL OR ${invoices.emailClaimedUntil} < ${now})`,
      ),
    )
    .orderBy(invoices.issuedAt)
    .limit(limit);
  return rows.map((r) => r.id);
}

export async function loadInvoices(db: Exec, ids: string[]): Promise<InvoiceRow[]> {
  if (!ids.length) return [];
  return db.select().from(invoices).where(inArray(invoices.id, ids));
}
