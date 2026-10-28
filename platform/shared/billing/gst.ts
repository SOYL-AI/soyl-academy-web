/**
 * GST and invoice arithmetic (pure functions; billing-razorpay, invoices). Money is integer paise.
 *
 * Prices are GST-inclusive when the seller is GST-registered (CONTEXT §7):
 *   taxable = round(total × 100 / (100 + rate))   (half up, integer arithmetic)
 *   tax     = total − taxable                    (so taxable + tax == total, always, to the paisa)
 * Intra-state supply (place of supply == seller state): tax is split CGST + SGST (rate/2 each); an odd
 * paisa goes to CGST. Inter-state: all of it is IGST. An unregistered seller ("bill of supply" mode)
 * charges no GST: taxable == total and every tax line is 0.
 *
 * Financial years run 1 April – 31 March in IST (Asia/Kolkata, UTC+05:30, no DST).
 */

export const IST_OFFSET_MS = 330 * 60_000;

/** GST state / union-territory codes (first two digits of a GSTIN), current list. */
export const GST_STATES = [
  { code: '01', name: 'Jammu and Kashmir' },
  { code: '02', name: 'Himachal Pradesh' },
  { code: '03', name: 'Punjab' },
  { code: '04', name: 'Chandigarh' },
  { code: '05', name: 'Uttarakhand' },
  { code: '06', name: 'Haryana' },
  { code: '07', name: 'Delhi' },
  { code: '08', name: 'Rajasthan' },
  { code: '09', name: 'Uttar Pradesh' },
  { code: '10', name: 'Bihar' },
  { code: '11', name: 'Sikkim' },
  { code: '12', name: 'Arunachal Pradesh' },
  { code: '13', name: 'Nagaland' },
  { code: '14', name: 'Manipur' },
  { code: '15', name: 'Mizoram' },
  { code: '16', name: 'Tripura' },
  { code: '17', name: 'Meghalaya' },
  { code: '18', name: 'Assam' },
  { code: '19', name: 'West Bengal' },
  { code: '20', name: 'Jharkhand' },
  { code: '21', name: 'Odisha' },
  { code: '22', name: 'Chhattisgarh' },
  { code: '23', name: 'Madhya Pradesh' },
  { code: '24', name: 'Gujarat' },
  { code: '26', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: '27', name: 'Maharashtra' },
  { code: '29', name: 'Karnataka' },
  { code: '30', name: 'Goa' },
  { code: '31', name: 'Lakshadweep' },
  { code: '32', name: 'Kerala' },
  { code: '33', name: 'Tamil Nadu' },
  { code: '34', name: 'Puducherry' },
  { code: '35', name: 'Andaman and Nicobar Islands' },
  { code: '36', name: 'Telangana' },
  { code: '37', name: 'Andhra Pradesh' },
  { code: '38', name: 'Ladakh' },
  { code: '97', name: 'Other Territory' },
] as const;

export type GstStateCode = (typeof GST_STATES)[number]['code'];
export const GST_STATE_CODES = GST_STATES.map((s) => s.code) as unknown as readonly [GstStateCode, ...GstStateCode[]];

export function isGstStateCode(v: unknown): v is GstStateCode {
  return typeof v === 'string' && GST_STATES.some((s) => s.code === v);
}

export function stateName(code: string): string | null {
  return GST_STATES.find((s) => s.code === code)?.name ?? null;
}

export interface GstBreakdown {
  totalPaise: number;
  taxablePaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  /** Rate applied (0 when the seller is not registered). */
  ratePercent: number;
  supply: 'intra_state' | 'inter_state' | 'not_registered';
}

/**
 * Splits a GST-inclusive total into taxable value and tax lines. Exact: the parts always add up to the
 * total. `ratePercent` must be a whole number (18 for SOYL's SAC).
 */
export function splitGstInclusive(totalPaise: number, o: { ratePercent: number; sellerStateCode: string; placeOfSupply: string; gstRegistered: boolean }): GstBreakdown {
  if (!Number.isSafeInteger(totalPaise) || totalPaise < 0) throw new RangeError(`total must be a non-negative integer number of paise (got ${totalPaise})`);
  if (!o.gstRegistered) return { totalPaise, taxablePaise: totalPaise, cgstPaise: 0, sgstPaise: 0, igstPaise: 0, ratePercent: 0, supply: 'not_registered' };
  if (!Number.isInteger(o.ratePercent) || o.ratePercent <= 0 || o.ratePercent >= 100) throw new RangeError(`GST rate must be a whole percentage (got ${o.ratePercent})`);
  // round(total × 100 / (100 + r)), half up, in integers: floor((2·100·total + (100 + r)) / (2·(100 + r))).
  const d = 100 + o.ratePercent;
  const taxablePaise = Math.floor((200 * totalPaise + d) / (2 * d));
  const tax = totalPaise - taxablePaise;
  if (o.placeOfSupply === o.sellerStateCode) {
    const sgstPaise = Math.floor(tax / 2);
    return { totalPaise, taxablePaise, cgstPaise: tax - sgstPaise, sgstPaise, igstPaise: 0, ratePercent: o.ratePercent, supply: 'intra_state' };
  }
  return { totalPaise, taxablePaise, cgstPaise: 0, sgstPaise: 0, igstPaise: tax, ratePercent: o.ratePercent, supply: 'inter_state' };
}

/** The IST calendar date of an instant, `YYYY-MM-DD`. */
export function istDate(at: Date): string {
  return new Date(at.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** Financial year (April–March, IST) of an instant, e.g. 2026-10-28 → "2026-27", 2027-03-31 23:59 IST → "2026-27". */
export function financialYear(at: Date): string {
  const d = new Date(at.getTime() + IST_OFFSET_MS);
  const y = d.getUTCFullYear();
  const start = d.getUTCMonth() >= 3 ? y : y - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, '0')}`;
}

/** e.g. ("SOYL", "2026-27", 1, 6) → "SOYL/2026-27/000001". */
export function formatDocumentNumber(prefix: string, fy: string, seq: number, digits: number): string {
  if (!Number.isSafeInteger(seq) || seq < 1) throw new RangeError(`sequence must be a positive integer (got ${seq})`);
  const n = String(seq);
  if (n.length > digits) throw new RangeError(`sequence ${seq} does not fit in ${digits} digits: widen the series before numbering further`);
  return `${prefix}/${fy}/${n.padStart(digits, '0')}`;
}

/** Indian digit grouping: 12345678 → "1,23,45,678". */
function groupIndian(n: number): string {
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${rest},${last3}`;
}

/** 149950 → "1,499.50" (rupees with paise, Indian grouping, no currency sign). */
export function formatRupees(paise: number): string {
  if (!Number.isSafeInteger(paise)) throw new RangeError('paise must be an integer');
  const neg = paise < 0;
  const abs = Math.abs(paise);
  return `${neg ? '-' : ''}${groupIndian(Math.floor(abs / 100))}.${String(abs % 100).padStart(2, '0')}`;
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function below100(n: number): string {
  if (n < 20) return ONES[n]!;
  const t = TENS[Math.floor(n / 10)]!;
  return n % 10 ? `${t}-${ONES[n % 10]}` : t;
}

function below1000(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return [h ? `${ONES[h]} Hundred` : '', r ? below100(r) : ''].filter(Boolean).join(' ');
}

/** Whole number in words with the Indian system (thousand, lakh, crore): 1499 → "One Thousand Four Hundred Ninety-Nine". */
export function numberInWordsIndian(n: number): string {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('n must be a non-negative integer');
  if (n === 0) return 'Zero';
  const parts: string[] = [];
  const crore = Math.floor(n / 10_000_000);
  let rest = n % 10_000_000;
  if (crore) parts.push(`${numberInWordsIndian(crore)} Crore`);
  const lakh = Math.floor(rest / 100_000);
  rest %= 100_000;
  if (lakh) parts.push(`${below100(lakh)} Lakh`);
  const thousand = Math.floor(rest / 1000);
  rest %= 1000;
  if (thousand) parts.push(`${below100(thousand)} Thousand`);
  if (rest) parts.push(below1000(rest));
  return parts.join(' ');
}

/** 149950 → "Rupees One Thousand Four Hundred Ninety-Nine and Fifty Paise Only"; 100 → "Rupees One Only". */
export function amountInWords(paise: number): string {
  if (!Number.isSafeInteger(paise) || paise < 0) throw new RangeError('paise must be a non-negative integer');
  const rupees = Math.floor(paise / 100);
  const p = paise % 100;
  const r = `Rupees ${numberInWordsIndian(rupees)}`;
  return p ? `${r} and ${below100(p)} Paise Only` : `${r} Only`;
}

const GSTIN_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GSTIN_SHAPE = /^(\d{2})([A-Z]{5}\d{4}[A-Z])([1-9A-Z])Z([0-9A-Z])$/;

/** The GSTIN check character (15th) for the first 14 characters (mod-36 Luhn variant used by GSTN). */
export function gstinCheckChar(first14: string): string {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const v = GSTIN_CHARS.indexOf(first14[i]!);
    if (v < 0) throw new RangeError('invalid GSTIN character');
    const p = v * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(p / 36) + (p % 36);
  }
  return GSTIN_CHARS[(36 - (sum % 36)) % 36]!;
}

/** Shape, state code and check character of a GSTIN. */
export function isValidGstin(gstin: string): boolean {
  const m = GSTIN_SHAPE.exec(gstin);
  if (!m) return false;
  if (!isGstStateCode(m[1])) return false;
  return gstinCheckChar(gstin.slice(0, 14)) === gstin[14];
}

export const PAN_SHAPE = /^[A-Z]{5}\d{4}[A-Z]$/;
