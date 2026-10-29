/**
 * Invoicing (billing-razorpay, ADR-024). Every captured payment for a plan gets a numbered invoice (PDF,
 * emailed to the payer, downloadable at /me/invoices); every refund gets a credit note linked to it.
 * Config, not code (CLAUDE.md rule 4): the owner changes seller details, the GST mode and the series here.
 *
 * GST mode (owner, 2026-10-28): SOYL AI Private Limited is **not GST-registered yet**, so documents are
 * issued in "bill of supply" mode: no GST lines, prices are plain amounts ("₹199/month", not "incl. GST").
 * When the company registers: set `gstRegistered: true` and `seller.gstin`, and choose a series whose
 * numbers fit in 16 characters (CGST Rules 46(b), 49(b) and 53(1A)(b)); `invoicingProblems` enforces
 * all of that before production generates a single tax invoice.
 *
 * Production refuses to generate anything (and the API refuses to start with INVOICING_ENABLED=true)
 * while `invoicingProblems(INVOICING, …)` is not empty: no field may hold an OWNER_TO_PROVIDE placeholder.
 * Tests use a fixture seller (FIXTURE_SELLER), never these values.
 */
import { GST_STATE_CODES, isGstStateCode, isValidGstin, PAN_SHAPE, stateName } from '../billing/gst';

/** Marker for a required seller field the owner has not provided yet. */
export const OWNER_TO_PROVIDE = 'OWNER_TO_PROVIDE';

export interface Seller {
  legalName: string;
  tradeName: string;
  /**
   * Street line of the registered office. Optional: null prints no street line (owner, 2026-10-29: the
   * address on documents is "Bengaluru 560043, Karnataka" only). A placeholder is still refused.
   */
  addressLine1: string | null;
  addressLine2: string | null;
  city: string;
  pincode: string;
  /** GST state code of the registered office (also the default place of supply). */
  stateCode: string;
  /** Required only when `gstRegistered` is true. */
  gstin: string | null;
  /** Optional: printed when set. */
  pan: string | null;
  /** Optional (Corporate Identity Number): printed when set. */
  cin: string | null;
  /** Contact address printed on every document (the site's contact address, lib/seo/config.ts). */
  email: string;
}

export interface SeriesConfig {
  /** e.g. "SOYL" → "SOYL/2026-27/000001". Letters, digits, "/" and "-" only. */
  prefix: string;
  digits: number;
}

export interface InvoicingConfig {
  /** false: "bill of supply" mode (no GST lines; prices shown without "incl. GST"). */
  gstRegistered: boolean;
  seller: Seller;
  /** Services Accounting Code printed on each line (CA to confirm; see OA-22). */
  sac: string;
  /** GST rate when registered (whole percent). */
  gstRatePercent: number;
  series: { tax_invoice: SeriesConfig; credit_note: SeriesConfig };
  /** Document titles. Unregistered: "Bill of Supply" (D-046); the CA may prefer plain "Invoice" (OA-22), a config change. */
  titles: { registered: string; unregistered: string; creditNote: string };
  /** Printed when not registered. */
  unregisteredNote: string;
  /** Printed on every document (CBIC: no signature needed on digitally generated invoices). */
  signatureNote: string;
  /** Private Blob container for PDFs (Bicep: storage.bicep). */
  blobContainer: string;
  /** Signed PDF download URLs live this long. */
  downloadUrlSeconds: number;
  /** Email delivery: attempts before giving up (the admin can still resend), base retry delay. */
  email: { maxAttempts: number; retryBaseMinutes: number; claimMinutes: number };
  /** Worker sweep: at most this many invoices per run. */
  sweepBatch: number;
}

export const INVOICING: InvoicingConfig = {
  gstRegistered: false,
  seller: {
    legalName: 'SOYL AI Private Limited',
    tradeName: 'SOYL',
    // Owner (2026-10-29, OA-22): no street line; documents print "Bengaluru 560043" and "Karnataka (State code 29)".
    addressLine1: null,
    addressLine2: null,
    city: 'Bengaluru',
    pincode: '560043',
    stateCode: '29', // Karnataka
    gstin: null,
    pan: null,
    cin: null,
    email: 'outreach@soyl.cloud',
  },
  // Recommended for the CA's review (OA-22): 999293 "Commercial training and coaching services" (18 %).
  // Alternative if the CA treats the AI tutor as an online information service: 998431/998439.
  sac: '999293',
  gstRatePercent: 18,
  // Owner-approved numbering (2026-10-28). NOTE: 19 and 22 characters; fine while unregistered, but
  // a registered supplier's serial must be ≤ 16 characters, so switching to gstRegistered: true also
  // needs a shorter series (e.g. prefix "SOYL" with a compact year), which invoicingProblems enforces.
  series: {
    tax_invoice: { prefix: 'SOYL', digits: 6 },
    credit_note: { prefix: 'SOYL/CN', digits: 6 },
  },
  titles: { registered: 'Tax Invoice', unregistered: 'Bill of Supply', creditNote: 'Credit Note' },
  unregisteredNote: 'The supplier is not registered under GST. No GST is charged on this supply.',
  signatureNote: 'This is a computer-generated document; no signature is required.',
  blobContainer: 'invoices',
  downloadUrlSeconds: 300,
  email: { maxAttempts: 8, retryBaseMinutes: 10, claimMinutes: 5 },
  sweepBatch: 50,
};

/** A syntactically valid fixture seller for tests and local development (never production). */
export const FIXTURE_SELLER: Seller = {
  legalName: 'Fixture Learning Private Limited',
  tradeName: 'SOYL',
  addressLine1: '1 Test Street, Fixture Layout',
  addressLine2: null,
  city: 'Bengaluru',
  pincode: '560001',
  stateCode: '29',
  gstin: '29ABCDE1234F1ZW',
  pan: 'ABCDE1234F',
  cin: 'U85499KA2026PTC000001',
  email: 'billing@example.com',
};

const CIN_SHAPE = /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;
const PREFIX_SHAPE = /^[A-Z0-9][A-Z0-9/-]*$/;
/** CGST Rules 46(b) / 49(b) / 53(1A)(b): serial numbers of at most 16 characters (GST-registered suppliers). */
export const GST_MAX_NUMBER_LENGTH = 16;
/** Longest number a series produces ("YYYY-YY" financial year). */
export const seriesNumberLength = (s: SeriesConfig) => `${s.prefix}/2026-27/`.length + s.digits;

/**
 * Everything that must be fixed before production may issue a document. Empty = ready.
 * Placeholders are listed by field name only (no values).
 */
export function invoicingProblems(c: InvoicingConfig): string[] {
  const p: string[] = [];
  const s = c.seller;
  for (const [k, v] of Object.entries(s)) if (typeof v === 'string' && v.includes(OWNER_TO_PROVIDE)) p.push(`seller.${k} is a placeholder (OA-22)`);
  for (const k of ['legalName', 'tradeName', 'city', 'pincode', 'email'] as const) if (!s[k]?.trim()) p.push(`seller.${k} is required`);
  if (!isGstStateCode(s.stateCode)) p.push('seller.stateCode must be a GST state code');
  if (!/^\d{6}$/.test(s.pincode)) p.push('seller.pincode must be 6 digits');
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(s.email)) p.push('seller.email must be an email address');
  if (s.pan !== null && !PAN_SHAPE.test(s.pan)) p.push('seller.pan must look like ABCDE1234F (or be null)');
  if (s.cin !== null && !CIN_SHAPE.test(s.cin)) p.push('seller.cin must be a 21-character CIN (or be null)');
  if (!/^\d{6}$/.test(c.sac)) p.push('sac must be a 6-digit SAC');
  for (const [k, ser] of Object.entries(c.series)) {
    if (!PREFIX_SHAPE.test(ser.prefix)) p.push(`series.${k}.prefix may use A–Z, 0–9, "/" and "-" only`);
    if (!Number.isInteger(ser.digits) || ser.digits < 3 || ser.digits > 9) p.push(`series.${k}.digits must be 3–9`);
  }
  if (c.series.tax_invoice.prefix === c.series.credit_note.prefix) p.push('tax invoices and credit notes need different series prefixes');
  if (c.gstRegistered) {
    if (!s.gstin || !isValidGstin(s.gstin)) p.push('seller.gstin must be a valid GSTIN when gstRegistered is true');
    else {
      if (s.gstin.slice(0, 2) !== s.stateCode) p.push('seller.gstin must start with seller.stateCode');
      if (s.pan && s.gstin.slice(2, 12) !== s.pan) p.push('seller.pan must match characters 3–12 of the GSTIN');
    }
    if (!Number.isInteger(c.gstRatePercent) || c.gstRatePercent <= 0 || c.gstRatePercent >= 100) p.push('gstRatePercent must be a whole percentage');
    for (const [k, ser] of Object.entries(c.series))
      if (seriesNumberLength(ser) > GST_MAX_NUMBER_LENGTH) p.push(`series.${k} produces ${seriesNumberLength(ser)}-character numbers; a GST-registered supplier may use at most ${GST_MAX_NUMBER_LENGTH} (CGST Rules 46(b), 53(1A)(b))`);
  }
  return p;
}

/** Whether plan prices include GST (drives "incl. GST" on /plans and the API's `pricesIncludeGst`). */
export const pricesIncludeGst = (c: InvoicingConfig = INVOICING): boolean => c.gstRegistered;

/** The seller's full address lines for print. */
export function sellerAddressLines(s: Seller): string[] {
  return [s.addressLine1, s.addressLine2, `${s.city} ${s.pincode}`, `${stateName(s.stateCode) ?? s.stateCode} (State code ${s.stateCode})`].filter((x): x is string => Boolean(x));
}

export { GST_STATE_CODES };
