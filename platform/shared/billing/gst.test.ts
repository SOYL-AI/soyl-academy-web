import { describe, expect, it } from 'vitest';
import {
  amountInWords,
  financialYear,
  formatDocumentNumber,
  formatRupees,
  GST_STATES,
  gstinCheckChar,
  istDate,
  isValidGstin,
  numberInWordsIndian,
  splitGstInclusive,
} from './gst';

const KA = '29';
const MH = '27';
const reg = (placeOfSupply: string) => ({ ratePercent: 18, sellerStateCode: KA, placeOfSupply, gstRegistered: true });

describe('splitGstInclusive', () => {
  // Plan prices (CONTEXT §7) and the ₹1 edge case: taxable = round(total × 100/118), tax = total − taxable.
  const cases: [number, number, number, number][] = [
    // total, taxable, cgst, sgst (intra-state)
    [19_900, 16_864, 1_518, 1_518], // ₹199
    [149_900, 127_034, 11_433, 11_433], // ₹1,499
    [249_900, 211_780, 19_060, 19_060], // ₹2,499
    [29_900, 25_339, 2_281, 2_280], // ₹299: odd tax paisa goes to CGST
    [49_900, 42_288, 3_806, 3_806], // ₹499
    [100, 85, 8, 7], // ₹1
  ];

  it.each(cases)('intra-state %i paise → taxable %i, CGST %i, SGST %i', (total, taxable, cgst, sgst) => {
    const b = splitGstInclusive(total, reg(KA));
    expect(b).toEqual({ totalPaise: total, taxablePaise: taxable, cgstPaise: cgst, sgstPaise: sgst, igstPaise: 0, ratePercent: 18, supply: 'intra_state' });
    expect(b.taxablePaise + b.cgstPaise + b.sgstPaise + b.igstPaise).toBe(total);
  });

  it.each(cases)('inter-state %i paise → IGST is the whole tax', (total, taxable, cgst, sgst) => {
    const b = splitGstInclusive(total, reg(MH));
    expect(b).toEqual({ totalPaise: total, taxablePaise: taxable, cgstPaise: 0, sgstPaise: 0, igstPaise: cgst + sgst, ratePercent: 18, supply: 'inter_state' });
  });

  it('reconciles exactly to the paisa and stays within a paisa of the rate for every total up to ₹5,000', () => {
    for (let total = 0; total <= 500_000; total += total < 2_000 ? 1 : 37) {
      for (const pos of [KA, MH]) {
        const b = splitGstInclusive(total, reg(pos));
        expect(b.taxablePaise + b.cgstPaise + b.sgstPaise + b.igstPaise).toBe(total);
        const tax = b.cgstPaise + b.sgstPaise + b.igstPaise;
        expect(Math.abs(tax - (b.taxablePaise * 18) / 100)).toBeLessThanOrEqual(1);
        expect(b.cgstPaise - b.sgstPaise).toBeGreaterThanOrEqual(0);
        expect(b.cgstPaise - b.sgstPaise).toBeLessThanOrEqual(1);
      }
    }
  });

  it('bill of supply (not registered): no tax lines, taxable = total', () => {
    expect(splitGstInclusive(19_900, { ...reg(MH), gstRegistered: false })).toEqual({ totalPaise: 19_900, taxablePaise: 19_900, cgstPaise: 0, sgstPaise: 0, igstPaise: 0, ratePercent: 0, supply: 'not_registered' });
  });

  it('refuses fractional or negative amounts and odd rates', () => {
    expect(() => splitGstInclusive(10.5, reg(KA))).toThrow(RangeError);
    expect(() => splitGstInclusive(-1, reg(KA))).toThrow(RangeError);
    expect(() => splitGstInclusive(100, { ...reg(KA), ratePercent: 12.5 })).toThrow(RangeError);
  });
});

describe('dates and financial years (IST)', () => {
  it('rolls over at 1 April 00:00 IST', () => {
    expect(financialYear(new Date('2027-03-31T18:29:59.999Z'))).toBe('2026-27'); // 31 Mar 23:59:59.999 IST
    expect(financialYear(new Date('2027-03-31T18:30:00.000Z'))).toBe('2027-28'); // 1 Apr 00:00 IST
    expect(financialYear(new Date('2026-10-28T10:00:00Z'))).toBe('2026-27');
    expect(financialYear(new Date('2027-01-01T00:00:00Z'))).toBe('2026-27');
    expect(financialYear(new Date('2099-04-01T00:00:00Z'))).toBe('2099-00');
  });

  it('IST calendar date', () => {
    expect(istDate(new Date('2026-10-28T18:29:59Z'))).toBe('2026-10-28');
    expect(istDate(new Date('2026-10-28T18:30:00Z'))).toBe('2026-10-29');
  });
});

describe('document numbers', () => {
  it('formats the owner-approved series', () => {
    expect(formatDocumentNumber('SOYL', '2026-27', 1, 6)).toBe('SOYL/2026-27/000001');
    expect(formatDocumentNumber('SOYL/CN', '2026-27', 42, 6)).toBe('SOYL/CN/2026-27/000042');
  });
  it('refuses a sequence that does not fit', () => {
    expect(() => formatDocumentNumber('SOYL', '2026-27', 1_000_000, 6)).toThrow(RangeError);
    expect(() => formatDocumentNumber('SOYL', '2026-27', 0, 6)).toThrow(RangeError);
  });
});

describe('amounts', () => {
  it('formats rupees with Indian grouping', () => {
    expect(formatRupees(149_950)).toBe('1,499.50');
    expect(formatRupees(100)).toBe('1.00');
    expect(formatRupees(1_234_567_800)).toBe('1,23,45,678.00');
    expect(formatRupees(5)).toBe('0.05');
  });

  it('says amounts in words (Indian numbering)', () => {
    expect(amountInWords(19_900)).toBe('Rupees One Hundred Ninety-Nine Only');
    expect(amountInWords(149_900)).toBe('Rupees One Thousand Four Hundred Ninety-Nine Only');
    expect(amountInWords(249_900)).toBe('Rupees Two Thousand Four Hundred Ninety-Nine Only');
    expect(amountInWords(29_900)).toBe('Rupees Two Hundred Ninety-Nine Only');
    expect(amountInWords(49_900)).toBe('Rupees Four Hundred Ninety-Nine Only');
    expect(amountInWords(100)).toBe('Rupees One Only');
    expect(amountInWords(16_864)).toBe('Rupees One Hundred Sixty-Eight and Sixty-Four Paise Only');
    expect(amountInWords(5)).toBe('Rupees Zero and Five Paise Only');
    expect(numberInWordsIndian(1_00_000)).toBe('One Lakh');
    expect(numberInWordsIndian(12_34_56_789)).toBe('Twelve Crore Thirty-Four Lakh Fifty-Six Thousand Seven Hundred Eighty-Nine');
    expect(numberInWordsIndian(1_000_000_000)).toBe('One Hundred Crore');
    expect(numberInWordsIndian(110)).toBe('One Hundred Ten');
  });
});

describe('GSTIN', () => {
  it('validates shape, state code and check character', () => {
    expect(isValidGstin('27AAPFU0939F1ZV')).toBe(true);
    expect(isValidGstin('27AAPFU0939F1ZA')).toBe(false); // wrong check char
    expect(isValidGstin('99AAPFU0939F1ZV')).toBe(false); // not a state code
    expect(isValidGstin('27AAPFU0939F1Z')).toBe(false);
    expect(gstinCheckChar('29ABCDE1234F1Z')).toBe('W');
  });
  it('lists unique two-digit state codes including Karnataka', () => {
    const codes = GST_STATES.map((s) => s.code);
    expect(new Set(codes).size).toBe(codes.length);
    expect(GST_STATES.find((s) => s.code === '29')?.name).toBe('Karnataka');
  });
});
