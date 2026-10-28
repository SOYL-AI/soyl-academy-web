/**
 * Invoice delivery and access (ADR-024): render the PDF into the private `invoices` Blob container,
 * email it to the payer (attachment + link to /me/invoices), list and download for the student, list,
 * export (CSV for the accountant) and resend for admins, and the worker's sweep.
 *
 * Issuing happens inside the billing transactions (issue.ts). Delivery happens after commit and is
 * idempotent and retryable: the PDF is re-rendered whenever it is missing or older than the buyer's
 * erasure; an email is claimed with a conditional UPDATE (one sender at a time), marked sent on success,
 * and retried with exponential backoff up to INVOICING.email.maxAttempts by the worker's
 * `billing.invoices` sweep (or at once by an admin's resend).
 */
import { and, asc, desc, eq, gte, inArray, lt, sql } from 'drizzle-orm';
import { auditLog, invoices, type Database } from '@soyl/db';
import { formatRupees, stateName } from '@soyl/shared/billing/gst';
import { getPlan, type PlanId } from '@soyl/shared/config/plans';
import type { BlobStore } from '../../ai/blob';
import type { EmailMessage, EmailSender } from '../../auth/senders/email';
import type { Clock } from '../../clock';
import { documentTitle, pdfFileName, printDate, renderInvoicePdf, rs, type InvoiceRow } from './document';
import { ensureDocuments, invoicesDueForEmail, invoicesNeedingPdf, paymentsMissingDocuments, type InvoicingRuntime } from './issue';

const MIN = 60_000;
const MAX_PDF_BYTES = 2 * 1024 * 1024;

export interface InvoiceLog {
  info(obj: Record<string, unknown>, msg: string): void;
  warn(obj: Record<string, unknown>, msg: string): void;
  error(obj: Record<string, unknown>, msg: string): void;
}

export interface InvoiceServiceDeps {
  db: Database;
  clock: Clock;
  runtime: () => InvoicingRuntime;
  blob: () => BlobStore;
  /** Null: this process cannot send email (e.g. a worker without ACS settings); emails wait for one that can. */
  email: EmailSender | null;
  publicBaseUrl: string;
  log?: InvoiceLog;
}

export interface InvoiceView {
  id: string;
  number: string;
  type: 'tax_invoice' | 'credit_note';
  title: string;
  issueDate: string;
  totalPaise: number;
  totalLabel: string;
  description: string;
  planName: string;
  originalNumber: string | null;
  gstRegistered: boolean;
}

export interface AdminInvoiceView extends InvoiceView {
  placeOfSupply: string;
  placeOfSupplyName: string;
  taxablePaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  ratePercent: number;
  sac: string;
  razorpayPaymentId: string;
  sentAt: string | null;
  emailAttempts: number;
  buyerErased: boolean;
  originalIssueDate: string | null;
}

export interface SweepReport {
  issued: number;
  rendered: number;
  emailed: number;
  emailFailed: number;
  refused: boolean;
}

/** GSTR-1 style columns for the accountant (amounts in rupees with 2 decimals). */
export const CSV_COLUMNS = [
  'Document type',
  'Document number',
  'Document date',
  'Original invoice number',
  'Original invoice date',
  'Place of supply',
  'Supply type',
  'GST registered',
  'SAC',
  'Description',
  'Taxable value',
  'Rate (%)',
  'CGST',
  'SGST',
  'IGST',
  'Total',
  'Razorpay payment id',
] as const;

function csvCell(v: string): string {
  // Spreadsheet formula injection (F-021 class): prefix cells starting with = + - @ with an apostrophe.
  const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export class InvoiceService {
  private readonly pending = new Set<Promise<unknown>>();

  constructor(private readonly d: InvoiceServiceDeps) {}

  useLog(log: InvoiceLog): void {
    this.d.log = log;
  }

  get runtime(): InvoicingRuntime {
    return this.d.runtime();
  }

  private now(): Date {
    return new Date(this.d.clock.now());
  }

  private blobKey(row: InvoiceRow): string {
    return `${row.financialYear}/${row.type}/${row.id}.pdf`;
  }

  /* ---- delivery ------------------------------------------------------------------------------ */

  /** After a billing transaction committed: deliver what it issued, in the background (never throws). */
  schedule(ids: readonly string[]): void {
    if (!ids.length) return;
    const p = this.deliver(ids)
      .catch((err) => this.d.log?.error({ billing: true, event: 'invoice_delivery_failed', err: (err as Error).name }, 'invoice delivery failed; the worker sweep retries'))
      .finally(() => this.pending.delete(p));
    this.pending.add(p);
  }

  /** Waits for scheduled deliveries (tests, graceful shutdown). */
  async drain(): Promise<void> {
    while (this.pending.size) await Promise.allSettled([...this.pending]);
  }

  async deliver(ids: readonly string[]): Promise<void> {
    for (const id of ids) {
      const [row] = await this.d.db.select().from(invoices).where(eq(invoices.id, id));
      if (!row) continue;
      const pdf = await this.ensurePdf(row);
      if (!row.sentAt && row.buyerEmail) await this.sendEmail(row.id, { pdf });
    }
  }

  private async original(row: InvoiceRow): Promise<Pick<InvoiceRow, 'number' | 'issueDate'> | null> {
    if (!row.originalInvoiceId) return null;
    const [o] = await this.d.db.select({ number: invoices.number, issueDate: invoices.issueDate }).from(invoices).where(eq(invoices.id, row.originalInvoiceId));
    return o ?? null;
  }

  async render(row: InvoiceRow): Promise<Buffer> {
    return renderInvoicePdf({ row, original: await this.original(row), cfg: this.d.runtime().settings });
  }

  /** The stored PDF, (re)rendering and storing it when missing or older than the buyer's erasure. */
  async ensurePdf(row: InvoiceRow): Promise<Buffer> {
    const container = this.d.runtime().settings.blobContainer;
    const stale = !row.pdfBlobPath || !row.pdfRenderedAt || (row.buyerAnonymisedAt !== null && row.pdfRenderedAt < row.buyerAnonymisedAt);
    if (!stale) {
      try {
        return await this.d.blob().get(container, row.pdfBlobPath!, MAX_PDF_BYTES);
      } catch (err) {
        this.d.log?.warn({ billing: true, event: 'invoice_pdf_missing', invoiceId: row.id, err: (err as Error).name }, 'stored invoice PDF unreadable; re-rendering');
      }
    }
    const pdf = await this.render(row);
    const key = this.blobKey(row);
    await this.d.blob().put(container, key, pdf, 'application/pdf');
    await this.d.db.update(invoices).set({ pdfBlobPath: key, pdfRenderedAt: this.now() }).where(eq(invoices.id, row.id));
    return pdf;
  }

  emailFor(row: InvoiceRow, pdf: Buffer): EmailMessage {
    const cfg = this.d.runtime().settings;
    const title = documentTitle(row, cfg);
    const link = `${this.d.publicBaseUrl}/me/invoices`;
    const plan = getPlan(row.planKey as PlanId).name;
    const text =
      row.type === 'credit_note'
        ? [
            `Your refund of ${rs(row.totalPaise)} for SOYL Academy ${plan} has been recorded.`,
            '',
            `Credit note ${row.number} (${printDate(row.issueDate)}) is attached as a PDF.`,
            `You can also download it any time at ${link} after signing in.`,
            '',
            'SOYL Academy',
          ]
        : [
            `Thank you for your payment of ${rs(row.totalPaise)} for SOYL Academy ${plan}.`,
            '',
            `${title} ${row.number} (${printDate(row.issueDate)}) is attached as a PDF.`,
            `You can also download it any time at ${link} after signing in.`,
            '',
            'Lessons, practice and tests stay free for everyone; your plan adds AI credits.',
            '',
            'SOYL Academy',
          ];
    return {
      to: row.buyerEmail!,
      subject: `Your SOYL Academy ${title.toLowerCase()} ${row.number}`,
      text: text.join('\n'),
      tag: row.type === 'credit_note' ? 'credit-note' : 'invoice',
      attachments: [{ name: pdfFileName(row.number), contentType: 'application/pdf', content: pdf }],
    };
  }

  /**
   * Sends one invoice email. Claims the row first (one sender at a time, idempotent): an invoice already
   * sent is skipped unless `force` (admin resend). Failures are recorded with a backoff.
   */
  async sendEmail(id: string, o: { pdf?: Buffer; force?: boolean } = {}): Promise<'sent' | 'skipped' | 'failed'> {
    if (!this.d.email) return 'skipped';
    const cfg = this.d.runtime().settings.email;
    const now = this.now();
    const claimed = await this.d.db
      .update(invoices)
      .set({ emailAttempts: sql`${invoices.emailAttempts} + 1`, emailClaimedUntil: new Date(now.getTime() + cfg.claimMinutes * MIN) })
      .where(
        and(
          eq(invoices.id, id),
          sql`${invoices.buyerEmail} IS NOT NULL`,
          sql`(${invoices.emailClaimedUntil} IS NULL OR ${invoices.emailClaimedUntil} < ${now})`,
          o.force ? sql`true` : and(sql`${invoices.sentAt} IS NULL`, sql`${invoices.emailAttempts} < ${cfg.maxAttempts}`),
        ),
      )
      .returning();
    const row = claimed[0];
    if (!row) return 'skipped';
    try {
      const pdf = o.pdf ?? (await this.ensurePdf(row));
      await this.d.email.send(this.emailFor(row, pdf));
      await this.d.db.update(invoices).set({ sentAt: this.now(), emailClaimedUntil: null, emailLastError: null, emailNextAt: null }).where(eq(invoices.id, id));
      this.d.log?.info({ billing: true, event: 'invoice_emailed', invoiceId: id, number: row.number, attempt: row.emailAttempts }, 'invoice emailed');
      return 'sent';
    } catch (err) {
      const backoff = cfg.retryBaseMinutes * 2 ** Math.max(0, row.emailAttempts - 1);
      await this.d.db
        .update(invoices)
        .set({ emailClaimedUntil: null, emailLastError: (err as Error).name.slice(0, 60), emailNextAt: new Date(now.getTime() + backoff * MIN) })
        .where(eq(invoices.id, id));
      const level = row.emailAttempts >= cfg.maxAttempts ? 'error' : 'warn';
      this.d.log?.[level]({ billing: true, event: 'invoice_email_failed', invoiceId: id, attempt: row.emailAttempts, err: (err as Error).name, alert: level === 'error' }, 'invoice email failed');
      return 'failed';
    }
  }

  /**
   * The worker's sweep: issue documents missing for captured/refunded payments (database state only),
   * render missing/stale PDFs, send due emails.
   */
  async sweep(limit = this.d.runtime().settings.sweepBatch): Promise<SweepReport> {
    const report: SweepReport = { issued: 0, rendered: 0, emailed: 0, emailFailed: 0, refused: false };
    const rt = this.d.runtime();
    if (rt.enabled) {
      for (const paymentId of await paymentsMissingDocuments(this.d.db, limit)) {
        const r = await this.d.db.transaction((tx) => ensureDocuments(tx, rt, paymentId, { now: this.now(), log: this.d.log }));
        if (r.refused) {
          report.refused = true;
          break;
        }
        report.issued += r.issued.length;
      }
    }
    for (const id of await invoicesNeedingPdf(this.d.db, limit)) {
      const [row] = await this.d.db.select().from(invoices).where(eq(invoices.id, id));
      if (!row) continue;
      try {
        await this.ensurePdf(row);
        report.rendered++;
      } catch (err) {
        this.d.log?.warn({ billing: true, event: 'invoice_pdf_failed', invoiceId: id, err: (err as Error).name }, 'invoice PDF could not be stored');
      }
    }
    if (this.d.email) {
      for (const id of await invoicesDueForEmail(this.d.db, this.now(), rt.settings.email.maxAttempts, limit)) {
        const r = await this.sendEmail(id);
        if (r === 'sent') report.emailed++;
        else if (r === 'failed') report.emailFailed++;
      }
    }
    return report;
  }

  /* ---- reads ----------------------------------------------------------------------------------- */

  private view(row: InvoiceRow, originals: Map<string, { number: string; issueDate: string }>): InvoiceView {
    const cfg = this.d.runtime().settings;
    const items = row.lineItems as { description: string }[];
    return {
      id: row.id,
      number: row.number,
      type: row.type as InvoiceView['type'],
      title: documentTitle(row, cfg),
      issueDate: row.issueDate,
      totalPaise: row.totalPaise,
      totalLabel: `₹${formatRupees(row.totalPaise)}`,
      description: items[0]?.description ?? '',
      planName: getPlan(row.planKey as PlanId).name,
      originalNumber: row.originalInvoiceId ? (originals.get(row.originalInvoiceId)?.number ?? null) : null,
      gstRegistered: row.gstRegistered,
    };
  }

  private async originals(rows: InvoiceRow[]): Promise<Map<string, { number: string; issueDate: string }>> {
    const ids = [...new Set(rows.map((r) => r.originalInvoiceId).filter((x): x is string => Boolean(x)))];
    if (!ids.length) return new Map();
    const found = await this.d.db.select({ id: invoices.id, number: invoices.number, issueDate: invoices.issueDate }).from(invoices).where(inArray(invoices.id, ids));
    return new Map(found.map((f) => [f.id, { number: f.number, issueDate: f.issueDate }]));
  }

  async listForUser(userId: string): Promise<InvoiceView[]> {
    const rows = await this.d.db.select().from(invoices).where(eq(invoices.userId, userId)).orderBy(desc(invoices.issuedAt), desc(invoices.sequence)).limit(500);
    const originals = await this.originals(rows);
    return rows.map((r) => this.view(r, originals));
  }

  /** The PDF of the user's own invoice; null for anyone else's (the route answers 404). */
  async pdfForUser(userId: string, id: string): Promise<{ pdf: Buffer; fileName: string } | null> {
    const [row] = await this.d.db.select().from(invoices).where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
    if (!row) return null;
    return { pdf: await this.ensurePdf(row), fileName: pdfFileName(row.number) };
  }

  /** Admin list: documents issued on IST dates from..to (inclusive), oldest first. */
  async adminList(range: { from: string; to: string }): Promise<AdminInvoiceView[]> {
    const rows = await this.d.db
      .select()
      .from(invoices)
      .where(and(gte(invoices.issueDate, range.from), lt(invoices.issueDate, nextDay(range.to))))
      .orderBy(asc(invoices.issuedAt), asc(invoices.type), asc(invoices.sequence))
      .limit(50_000);
    const originals = await this.originals(rows);
    return rows.map((r) => {
      const items = r.lineItems as { sac: string; ratePercent: number }[];
      return {
        ...this.view(r, originals),
        originalIssueDate: r.originalInvoiceId ? (originals.get(r.originalInvoiceId)?.issueDate ?? null) : null,
        placeOfSupply: r.placeOfSupply,
        placeOfSupplyName: stateName(r.placeOfSupply) ?? '',
        taxablePaise: r.taxablePaise,
        cgstPaise: r.cgstPaise,
        sgstPaise: r.sgstPaise,
        igstPaise: r.igstPaise,
        ratePercent: items[0]?.ratePercent ?? 0,
        sac: items[0]?.sac ?? '',
        razorpayPaymentId: r.razorpayPaymentId,
        sentAt: r.sentAt?.toISOString() ?? null,
        emailAttempts: r.emailAttempts,
        buyerErased: r.buyerAnonymisedAt !== null,
      };
    });
  }

  async adminCsv(range: { from: string; to: string }): Promise<string> {
    const list = await this.adminList(range);
    const r2 = (p: number) => formatRupees(p).replace(/,/g, '');
    const lines = [CSV_COLUMNS.join(',')];
    for (const v of list) {
      const supply = !v.gstRegistered ? 'Not registered' : v.igstPaise > 0 ? 'B2C inter-state' : 'B2C intra-state';
      lines.push(
        [
          v.type === 'credit_note' ? 'Credit note' : v.title,
          v.number,
          v.issueDate,
          v.originalNumber ?? '',
          v.originalIssueDate ?? '',
          `${v.placeOfSupply}-${v.placeOfSupplyName}`,
          supply,
          v.gstRegistered ? 'Yes' : 'No',
          v.sac,
          v.description,
          r2(v.taxablePaise),
          String(v.ratePercent),
          r2(v.cgstPaise),
          r2(v.sgstPaise),
          r2(v.igstPaise),
          r2(v.totalPaise),
          v.razorpayPaymentId,
        ]
          .map(csvCell)
          .join(','),
      );
    }
    return `${lines.join('\r\n')}\r\n`;
  }

  /** Admin: send the invoice email again now (also after the automatic attempts ran out). */
  async resend(id: string, actor: { userId: string; role: string; requestId: string }): Promise<{ status: 'sent' | 'failed' | 'no_email' } | null> {
    const [row] = await this.d.db.select({ id: invoices.id, buyerEmail: invoices.buyerEmail }).from(invoices).where(eq(invoices.id, id));
    if (!row) return null;
    let status: 'sent' | 'failed' | 'no_email';
    if (!row.buyerEmail || !this.d.email) status = 'no_email';
    else {
      const r = await this.sendEmail(id, { force: true });
      status = r === 'sent' ? 'sent' : 'failed';
    }
    await this.d.db.insert(auditLog).values({ actorUserId: actor.userId, actorRole: actor.role, action: 'billing.invoice.resend', targetType: 'invoice', targetId: id, after: { status }, requestId: actor.requestId, createdAt: this.now() });
    return { status };
  }
}

/** "2026-10-31" → "2026-11-01" (calendar arithmetic on IST dates). */
export function nextDay(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
