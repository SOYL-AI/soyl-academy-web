/**
 * Invoice / credit-note document: the stored row → the printed A4 PDF (ADR-024). Fields follow CGST Rule
 * 46 (tax invoice) and Rule 53 (credit note): number and date, the supplier's name, address, state and
 * GSTIN, the recipient (as given), place of supply with state name and code, SAC, description, taxable
 * value, rate and amount of each tax, total in figures and words, reverse-charge statement, and the note
 * that a digitally generated document needs no signature. An unregistered seller's document carries no
 * GST lines and says so.
 */
import { amountInWords, formatRupees, stateName } from '@soyl/shared/billing/gst';
import { sellerAddressLines, type InvoicingConfig, type Seller } from '@soyl/shared/config/invoicing';
import type { invoices } from '@soyl/db';
import { buildPdf, PdfPage } from './pdf';

export type InvoiceRow = typeof invoices.$inferSelect;

export interface LineItem {
  description: string;
  sac: string;
  quantity: number;
  taxablePaise: number;
  ratePercent: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  totalPaise: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2026-10-28" → "28 Oct 2026" */
export function printDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${d} ${MONTHS[m! - 1]} ${y}`;
}

export const rs = (paise: number) => `Rs. ${formatRupees(paise)}`;

export function documentTitle(row: Pick<InvoiceRow, 'type' | 'gstRegistered'>, cfg: Pick<InvoicingConfig, 'titles'>): string {
  if (row.type === 'credit_note') return cfg.titles.creditNote;
  return row.gstRegistered ? cfg.titles.registered : cfg.titles.unregistered;
}

export const placeOfSupplyLabel = (code: string) => `${stateName(code) ?? 'Unknown state'} (${code})`;

export interface RenderInput {
  row: InvoiceRow;
  /** Credit notes: the invoice they reduce. */
  original?: Pick<InvoiceRow, 'number' | 'issueDate'> | null;
  cfg: Pick<InvoicingConfig, 'titles' | 'unregisteredNote' | 'signatureNote'>;
}

/** Renders the PDF. Deterministic for a given row (the creation date is the issue time). */
export function renderInvoicePdf({ row, original, cfg }: RenderInput): Buffer {
  const seller = row.seller as Seller;
  const items = row.lineItems as LineItem[];
  const title = documentTitle(row, cfg);
  const p = new PdfPage();
  const L = 48;
  const R = 547;
  let y = 60;

  p.text(title, L, y, { size: 20, font: 'bold' });
  if (row.gstRegistered && row.type === 'tax_invoice') p.text('Original for recipient', R, y - 4, { size: 8, align: 'right', gray: 0.35 });
  y += 26;

  // Seller (left) and document details (right).
  const top = y;
  p.text(seller.legalName, L, y, { size: 11, font: 'bold' });
  y += 14;
  if (seller.tradeName && seller.tradeName !== seller.legalName) {
    p.text(`Trade name: ${seller.tradeName}`, L, y, { size: 9 });
    y += 12;
  }
  // The left column stays clear of the details column (x ≥ 340).
  for (const a of sellerAddressLines(seller)) y += p.wrap(a, L, y, 280, { size: 9, leading: 12 }) * 12;
  p.text(row.gstRegistered && seller.gstin ? `GSTIN: ${seller.gstin}` : 'Not registered under GST', L, y, { size: 9, font: 'bold' });
  y += 12;
  if (seller.pan) {
    p.text(`PAN: ${seller.pan}`, L, y, { size: 9 });
    y += 12;
  }
  if (seller.cin) {
    p.text(`CIN: ${seller.cin}`, L, y, { size: 9 });
    y += 12;
  }
  p.text(`Email: ${seller.email}`, L, y, { size: 9 });
  y += 12;

  const kv: [string, string][] = [
    [`${row.type === 'credit_note' ? 'Credit note' : 'Invoice'} no.`, row.number],
    ['Date', printDate(row.issueDate)],
    ['Place of supply', placeOfSupplyLabel(row.placeOfSupply)],
  ];
  if (row.type === 'credit_note' && original) kv.push(['Against invoice', `${original.number} dated ${printDate(original.issueDate)}`]);
  kv.push(['Payment reference', row.razorpayPaymentId]);
  if (row.gstRegistered) kv.push(['Tax payable on reverse charge', 'No']);
  let ry = top;
  // Label above value, so long values (a long state name, "… dated …") never run into the label.
  const KX = 340;
  for (const [k, v] of kv) {
    p.text(k, KX, ry, { size: 7.5, gray: 0.35 });
    ry += 10;
    ry += p.wrap(v, KX, ry, R - KX, { size: 9, font: 'bold', leading: 11 }) * 11 + 4;
  }
  y = Math.max(y, ry) + 10;

  // Buyer.
  p.line(L, y, R, y, { gray: 0.8 });
  y += 16;
  p.text(row.type === 'credit_note' ? 'Issued to' : 'Billed to', L, y, { size: 8, gray: 0.35 });
  y += 13;
  p.text(row.buyerName ?? 'Customer', L, y, { size: 10, font: 'bold' });
  y += 13;
  if (row.buyerEmail) {
    p.text(row.buyerEmail, L, y, { size: 9 });
    y += 12;
  }
  p.text(`State: ${placeOfSupplyLabel(row.placeOfSupply)}`, L, y, { size: 9 });
  y += 22;

  // Line items.
  const cols = { desc: L + 6, sac: 340, qty: 400, amt: R - 6 };
  p.rect(L, y - 12, R - L, 18, { fillGray: 0.93 });
  p.text('Description', cols.desc, y, { size: 8, font: 'bold' });
  p.text('SAC', cols.sac, y, { size: 8, font: 'bold' });
  p.text('Qty', cols.qty, y, { size: 8, font: 'bold' });
  p.text(row.gstRegistered ? 'Taxable value' : 'Amount', cols.amt, y, { size: 8, font: 'bold', align: 'right' });
  y += 20;
  for (const it of items) {
    const lines = p.wrap(it.description, cols.desc, y, cols.sac - cols.desc - 12, { size: 9 });
    p.text(it.sac, cols.sac, y, { size: 9 });
    p.text(String(it.quantity), cols.qty, y, { size: 9 });
    p.text(formatRupees(row.gstRegistered ? it.taxablePaise : it.totalPaise), cols.amt, y, { size: 9, align: 'right' });
    y += Math.max(1, lines) * 12 + 6;
  }
  p.line(L, y - 6, R, y - 6, { gray: 0.8 });
  y += 8;

  // Totals.
  const total = (label: string, value: string, bold = false) => {
    p.text(label, 380, y, { size: 9, font: bold ? 'bold' : 'regular' });
    p.text(value, cols.amt, y, { size: bold ? 11 : 9, font: bold ? 'bold' : 'regular', align: 'right' });
    y += bold ? 18 : 14;
  };
  if (row.gstRegistered) {
    const rate = items[0]?.ratePercent ?? 0;
    total('Taxable value', rs(row.taxablePaise));
    if (row.igstPaise > 0 || (row.cgstPaise === 0 && row.sgstPaise === 0)) total(`IGST @ ${rate}%`, rs(row.igstPaise));
    else {
      total(`CGST @ ${rate / 2}%`, rs(row.cgstPaise));
      total(`SGST @ ${rate / 2}%`, rs(row.sgstPaise));
    }
  }
  total(row.type === 'credit_note' ? 'Total credited' : 'Total', rs(row.totalPaise), true);
  y += 4;
  p.text('Amount in words', L, y, { size: 8, gray: 0.35 });
  y += 13;
  y += p.wrap(amountInWords(row.totalPaise), L, y, R - L, { size: 10, font: 'bold' }) * 13 + 10;

  // Notes.
  const notes: string[] = [];
  if (row.gstRegistered) notes.push('Prices include GST.');
  else notes.push(cfg.unregisteredNote);
  if (row.type === 'credit_note') notes.push('This credit note records a refund of the amount above to the original payment method.');
  notes.push('Paid online through Razorpay.');
  notes.push(cfg.signatureNote);
  for (const n of notes) y += p.wrap(n, L, y, R - L, { size: 8.5, gray: 0.25 }) * 11 + 3;

  p.line(L, 790, R, 790, { gray: 0.85 });
  p.text(`${seller.tradeName} Academy  ·  www.soylai.com  ·  ${seller.email}`, (L + R) / 2, 804, { size: 8, align: 'center', gray: 0.45 });

  return buildPdf(p, { title: `${title} ${row.number}`, createdAt: row.issuedAt });
}

/** File name for downloads and attachments, e.g. "SOYL-2026-27-000001.pdf". */
export const pdfFileName = (number: string) => `${number.replace(/[^A-Za-z0-9-]+/g, '-')}.pdf`;
