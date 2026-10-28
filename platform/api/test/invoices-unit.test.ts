/**
 * Invoice PDF writer and document layout (ADR-024): a structurally valid PDF (xref offsets), text read
 * back, CGST Rule 46 / Rule 53 fields present, the bill-of-supply ("not registered") variant, CSV
 * escaping, and the production refusal of the invoicing runtime.
 */
import { describe, expect, it } from 'vitest';
import { FIXTURE_SELLER, INVOICING } from '@soyl/shared/config/invoicing';
import { buildPdf, extractPdfText, PdfPage, textWidth, toWinAnsi } from '../src/billing/invoices/pdf';
import { pdfFileName, printDate, renderInvoicePdf, type InvoiceRow } from '../src/billing/invoices/document';
import { issueRefusal, lineDescription } from '../src/billing/invoices/issue';
import { nextDay } from '../src/billing/invoices/service';
import { loadBillingConfig } from '../src/billing/config';

function row(over: Partial<InvoiceRow> = {}): InvoiceRow {
  const issuedAt = new Date('2026-10-28T06:30:00Z');
  return {
    id: '0193e000-0000-7000-8000-000000000001',
    number: 'SOYL/2026-27/000001',
    type: 'tax_invoice',
    financialYear: '2026-27',
    sequence: 1,
    gstRegistered: false,
    userId: null,
    paymentId: '0193e000-0000-7000-8000-000000000002',
    razorpayPaymentId: 'pay_Test0000000001',
    razorpayOrderId: 'order_Test000000001',
    razorpaySubscriptionId: null,
    originalInvoiceId: null,
    creditedThroughPaise: null,
    planKey: 'board_exam_pass',
    issuedAt,
    issueDate: '2026-10-28',
    placeOfSupply: '27',
    buyerName: 'Asha (Parent)',
    buyerEmail: 'parent@example.com',
    buyerAnonymisedAt: null,
    lineItems: [{ description: lineDescription('board_exam_pass', null), sac: '999293', quantity: 1, taxablePaise: 49_900, ratePercent: 0, cgstPaise: 0, sgstPaise: 0, igstPaise: 0, totalPaise: 49_900 }],
    taxablePaise: 49_900,
    cgstPaise: 0,
    sgstPaise: 0,
    igstPaise: 0,
    totalPaise: 49_900,
    currency: 'INR',
    seller: FIXTURE_SELLER,
    pdfBlobPath: null,
    pdfRenderedAt: null,
    sentAt: null,
    emailAttempts: 0,
    emailNextAt: null,
    emailClaimedUntil: null,
    emailLastError: null,
    createdAt: issuedAt,
    updatedAt: issuedAt,
    ...over,
  };
}

describe('PDF writer', () => {
  it('writes a structurally valid PDF whose xref offsets point at each object', () => {
    const p = new PdfPage();
    p.text('Hello (world) \\ – ₹1', 50, 50);
    const pdf = buildPdf(p, { title: 'T', createdAt: new Date('2026-10-28T00:00:00Z') });
    const src = pdf.toString('latin1');
    expect(src.startsWith('%PDF-1.4')).toBe(true);
    expect(src.trimEnd().endsWith('%%EOF')).toBe(true);
    const startxref = Number(/startxref\n(\d+)/.exec(src)![1]);
    expect(src.slice(startxref, startxref + 4)).toBe('xref');
    const offsets = [...src.slice(startxref).matchAll(/^(\d{10}) 00000 n $/gm)].map((m) => Number(m[1]));
    expect(offsets).toHaveLength(7);
    offsets.forEach((o, i) => expect(src.slice(o, o + `${i + 1} 0 obj`.length)).toBe(`${i + 1} 0 obj`));
    expect(extractPdfText(pdf)).toEqual(['Hello (world) \\ – Rs.1']);
  });

  it('maps text to WinAnsi and measures Helvetica', () => {
    expect(toWinAnsi('A₹–अ')).toEqual([65, 82, 115, 46, 0x96, 0x3f]);
    expect(textWidth('0', 10)).toBeCloseTo(5.56);
    expect(textWidth('W', 10, 'bold')).toBeCloseTo(9.44);
  });
});

describe('invoice document', () => {
  const cfg = INVOICING;

  it('bill-of-supply mode (not GST-registered): the required fields, no tax lines', () => {
    // Joined with spaces: a long description wraps onto two lines.
    const text = extractPdfText(renderInvoicePdf({ row: row(), cfg })).join(' ');
    for (const s of [
      cfg.titles.unregistered, // D-046: Bill of Supply
      'SOYL/2026-27/000001',
      '28 Oct 2026',
      FIXTURE_SELLER.legalName,
      'Trade name: SOYL',
      FIXTURE_SELLER.addressLine1,
      'Bengaluru 560001',
      'Karnataka (State code 29)',
      'Not registered under GST',
      `PAN: ${FIXTURE_SELLER.pan}`,
      `CIN: ${FIXTURE_SELLER.cin}`,
      'Place of supply',
      'Maharashtra (27)',
      'Asha (Parent)',
      'parent@example.com',
      '999293',
      'SOYL Academy Board Exam Pass, valid until 31 Mar 2027 (AI tutor credits)',
      'Rs. 499.00',
      'Rupees Four Hundred Ninety-Nine Only',
      cfg.unregisteredNote,
      cfg.signatureNote,
      'pay_Test0000000001',
    ])
      expect(text).toContain(s);
    expect(text).not.toMatch(/GSTIN|CGST|SGST|IGST|Tax Invoice/);
  });

  it('GST-registered: tax invoice with GSTIN, taxable value and CGST/SGST (intra) or IGST (inter)', () => {
    const intra = row({
      gstRegistered: true,
      placeOfSupply: '29',
      taxablePaise: 16_864,
      cgstPaise: 1_518,
      sgstPaise: 1_518,
      totalPaise: 19_900,
      lineItems: [{ description: 'Plus', sac: '999293', quantity: 1, taxablePaise: 16_864, ratePercent: 18, cgstPaise: 1_518, sgstPaise: 1_518, igstPaise: 0, totalPaise: 19_900 }],
    });
    const t = extractPdfText(renderInvoicePdf({ row: intra, cfg })).join('\n');
    for (const s of ['Tax Invoice', 'Original for recipient', `GSTIN: ${FIXTURE_SELLER.gstin}`, 'Taxable value', 'Rs. 168.64', 'CGST @ 9%', 'SGST @ 9%', 'Rs. 15.18', 'Rs. 199.00', 'Tax payable on reverse charge', 'Prices include GST.', 'Karnataka (29)'])
      expect(t).toContain(s);
    expect(t).not.toContain('IGST');
    const inter = row({ gstRegistered: true, placeOfSupply: '27', taxablePaise: 16_864, igstPaise: 3_036, totalPaise: 19_900, lineItems: [{ description: 'Plus', sac: '999293', quantity: 1, taxablePaise: 16_864, ratePercent: 18, cgstPaise: 0, sgstPaise: 0, igstPaise: 3_036, totalPaise: 19_900 }] });
    const t2 = extractPdfText(renderInvoicePdf({ row: inter, cfg })).join('\n');
    expect(t2).toContain('IGST @ 18%');
    expect(t2).toContain('Rs. 30.36');
    expect(t2).not.toContain('CGST');
  });

  it('credit note: title, link to the original invoice, total credited', () => {
    const cn = row({ type: 'credit_note', number: 'SOYL/CN/2026-27/000001', originalInvoiceId: 'x', creditedThroughPaise: 49_900 });
    const t = extractPdfText(renderInvoicePdf({ row: cn, original: { number: 'SOYL/2026-27/000001', issueDate: '2026-10-28' }, cfg })).join(' ');
    expect(t).toContain('Credit Note');
    expect(t).toContain('Against invoice');
    expect(t).toContain('SOYL/2026-27/000001 dated 28 Oct 2026');
    expect(t).toContain('Total credited');
    expect(t).toContain('Issued to');
  });

  it('an erased buyer prints as "Customer" with no email', () => {
    const t = extractPdfText(renderInvoicePdf({ row: row({ buyerName: null, buyerEmail: null, buyerAnonymisedAt: new Date() }), cfg })).join('\n');
    expect(t).toContain('Customer');
    expect(t).not.toContain('parent@example.com');
  });

  it('helpers', () => {
    expect(printDate('2027-04-01')).toBe('1 Apr 2027');
    expect(pdfFileName('SOYL/CN/2026-27/000001')).toBe('SOYL-CN-2026-27-000001.pdf');
    expect(nextDay('2026-12-31')).toBe('2027-01-01');
    expect(lineDescription('plus', 'monthly')).toBe('SOYL Academy Plus plan, monthly subscription (AI tutor credits)');
  });
});

describe('invoicing runtime (production refusal)', () => {
  const ctx = (appEnv: string) => ({ appEnv, isLocal: appEnv === 'local' || appEnv === 'test', isProduction: appEnv === 'prod' });

  it('is on in local/test, off elsewhere unless INVOICING_ENABLED=true', () => {
    expect(loadBillingConfig({}, ctx('test')).config.invoicing?.enabled).toBe(true);
    expect(loadBillingConfig({}, ctx('stg')).config.invoicing?.enabled).toBe(false);
    expect(loadBillingConfig({ INVOICING_ENABLED: 'true' }, ctx('stg')).config.invoicing?.enabled).toBe(true);
    expect(loadBillingConfig({ INVOICING_ENABLED: 'yes' }, ctx('stg')).problems).toContain('INVOICING_ENABLED must be true or false');
  });

  it('production refuses to start with INVOICING_ENABLED=true while a placeholder remains, and refuses to issue', () => {
    const { config, problems } = loadBillingConfig({ INVOICING_ENABLED: 'true' }, ctx('prod'));
    expect(problems.join('\n')).toMatch(/INVOICING_ENABLED=true but platform\/shared\/config\/invoicing\.ts is not ready \(OA-22\): seller\.addressLine1 is a placeholder/);
    expect(issueRefusal(config.invoicing)).toEqual({ refused: ['seller.addressLine1 is a placeholder (OA-22)'] });
    expect(loadBillingConfig({}, ctx('prod')).problems).toEqual([]);
    expect(issueRefusal(loadBillingConfig({}, ctx('prod')).config.invoicing)).toEqual({ off: true });
    expect(issueRefusal({ enabled: true, production: true, settings: { ...INVOICING, seller: FIXTURE_SELLER } })).toBeNull();
  });
});
