import { describe, expect, it } from 'vitest';
import { FIXTURE_SELLER, GST_MAX_NUMBER_LENGTH, INVOICING, invoicingProblems, OWNER_TO_PROVIDE, pricesIncludeGst, sellerAddressLines, seriesNumberLength, type InvoicingConfig } from './invoicing';

const ready = (over: Partial<InvoicingConfig> = {}): InvoicingConfig => ({ ...INVOICING, seller: FIXTURE_SELLER, ...over });

describe('invoicing config', () => {
  it('owner decisions (2026-10-28): not GST-registered, Karnataka, approved series, prices without "incl. GST"', () => {
    expect(INVOICING.gstRegistered).toBe(false);
    expect(pricesIncludeGst()).toBe(false);
    expect(INVOICING.seller).toMatchObject({ legalName: 'SOYL AI Private Limited', tradeName: 'SOYL', city: 'Bengaluru', pincode: '560043', stateCode: '29', gstin: null, email: 'outreach@soyl.cloud' });
    expect(INVOICING.series.tax_invoice.prefix).toBe('SOYL');
    expect(INVOICING.series.credit_note.prefix).toBe('SOYL/CN');
  });

  it('owner decision (2026-10-29): no street line, the real config is ready, and prints "Bengaluru 560043" + "Karnataka (State code 29)"', () => {
    expect(INVOICING.seller.addressLine1).toBeNull();
    expect(INVOICING.seller.addressLine2).toBeNull();
    expect(invoicingProblems(INVOICING)).toEqual([]);
    expect(sellerAddressLines(INVOICING.seller)).toEqual(['Bengaluru 560043', 'Karnataka (State code 29)']);
    // PAN and CIN stay optional.
    expect(INVOICING.seller.pan).toBeNull();
    expect(INVOICING.seller.cin).toBeNull();
  });

  it('production stays refused while any seller field is a placeholder; a street line, when set, is printed', () => {
    const placeholder = { ...INVOICING, seller: { ...INVOICING.seller, addressLine1: `${OWNER_TO_PROVIDE}: street line` } };
    expect(invoicingProblems(placeholder)).toEqual(['seller.addressLine1 is a placeholder (OA-22)']);
    const legal = { ...INVOICING, seller: { ...INVOICING.seller, legalName: OWNER_TO_PROVIDE } };
    expect(invoicingProblems(legal)).toEqual(['seller.legalName is a placeholder (OA-22)']);
    const filled = { ...INVOICING, seller: { ...INVOICING.seller, addressLine1: '12 Some Road' } };
    expect(invoicingProblems(filled)).toEqual([]);
    expect(sellerAddressLines(filled.seller)).toEqual(['12 Some Road', 'Bengaluru 560043', 'Karnataka (State code 29)']);
    // Required fields stay required.
    expect(invoicingProblems({ ...INVOICING, seller: { ...INVOICING.seller, city: ' ' } })).toContain('seller.city is required');
  });

  it('the fixture seller is ready in both modes (with a GST-compliant series when registered)', () => {
    expect(invoicingProblems(ready())).toEqual([]);
    const shortSeries = { tax_invoice: { prefix: 'S', digits: 6 }, credit_note: { prefix: 'SCN', digits: 4 } };
    expect(invoicingProblems(ready({ gstRegistered: true, series: shortSeries }))).toEqual([]);
  });

  it('switching to GST-registered needs a valid GSTIN and ≤ 16-character numbers', () => {
    expect(seriesNumberLength(INVOICING.series.tax_invoice)).toBe(19);
    expect(seriesNumberLength(INVOICING.series.credit_note)).toBe(22);
    const p = invoicingProblems(ready({ gstRegistered: true }));
    expect(p.filter((x) => x.includes(`at most ${GST_MAX_NUMBER_LENGTH}`))).toHaveLength(2);
    const noGstin = invoicingProblems(ready({ gstRegistered: true, seller: { ...FIXTURE_SELLER, gstin: null } }));
    expect(noGstin).toContain('seller.gstin must be a valid GSTIN when gstRegistered is true');
    const wrongState = invoicingProblems(ready({ gstRegistered: true, seller: { ...FIXTURE_SELLER, stateCode: '27' } }));
    expect(wrongState).toContain('seller.gstin must start with seller.stateCode');
  });

  it('rejects malformed optional identifiers and shared prefixes', () => {
    expect(invoicingProblems(ready({ seller: { ...FIXTURE_SELLER, pan: 'abc' } }))).toContain('seller.pan must look like ABCDE1234F (or be null)');
    expect(invoicingProblems(ready({ seller: { ...FIXTURE_SELLER, cin: 'X1' } }))).toContain('seller.cin must be a 21-character CIN (or be null)');
    expect(invoicingProblems(ready({ series: { tax_invoice: { prefix: 'A', digits: 6 }, credit_note: { prefix: 'A', digits: 6 } } }))).toContain('tax invoices and credit notes need different series prefixes');
  });
});
