// Shared computed figures for CBSE 11 Accountancy ch04 (special purpose books). Every amount a slide, note or item
// states for the worked cases comes from here, computed with books.mjs and acc.mjs and asserted. Imagined firms only.
import { same, check, sum, inr, rs, mdTable, journal, ledger, gst } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
import { cashBook, pettyCash, tradeBook, R, P, DEP, WD, V, T } from './books.mjs';

export { same, check, sum, inr, rs, mdTable, journal, ledger, gst, cashBook, pettyCash, tradeBook, R, P, DEP, WD, V, T };

// ---------------------------------------------------------------- Anvi Traders, June 2026: two-column cash book
export const CB = cashBook({
  open: { cash: 20000, bank: 60000 },
  openDate: 'Jun 1',
  closeDate: 'Jun 30',
  items: [
    R('Jun 2', 'Sales A/c', 15000),
    R('Jun 3', 'Rohit Gupta (cheque deposited)', 0, 24000),
    P('Jun 5', 'Rent A/c', 0, 8000),
    DEP('Jun 7', 10000),
    P('Jun 9', 'Purchases A/c', 12000),
    WD('Jun 12', 6000),
    P('Jun 15', 'Salaries A/c', 9000),
    R('Jun 18', 'Commission A/c', 3000),
    P('Jun 22', 'Sunil Stores', 0, 20000),
    P('Jun 26', 'Bank charges A/c', 0, 400),
    P('Jun 28', 'Stationery A/c', 1500),
  ],
});
same(CB.dr.cash, 44000, 'Anvi cash receipts');
same(CB.cr.cash, 32500, 'Anvi cash payments');
same(CB.cash, 11500, 'Anvi closing cash');
same(CB.dr.bank, 94000, 'Anvi bank debits');
same(CB.cr.bank, 34400, 'Anvi bank credits');
same(CB.bank, 59600, 'Anvi closing bank');
same(CB.totalCash, 44000, 'Anvi cash column total');
same(CB.totalBank, 94000, 'Anvi bank column total');
export const CBW = {
  headers: ['', 'Cash (₹)', 'Bank (₹)'],
  rows: [
    ['Total of debit side (receipts, with opening balance)', inr(CB.dr.cash), inr(CB.dr.bank)],
    ['Total of credit side (payments, before balancing)', inr(CB.cr.cash), inr(CB.cr.bank)],
    ['**Balance c/d (debit minus credit)**', `**${inr(CB.cash)}**`, `**${inr(CB.bank)}**`],
  ],
};
// contra entries of the month
export const CB_CONTRA = { dep: 10000, wd: 6000 };

// ---------------------------------------------------------------- Mehta Hardware, July 2026: bank overdraft
export const OD = cashBook({
  open: { cash: 5000, bank: -12000 },
  openDate: 'Jul 1',
  closeDate: 'Jul 31',
  items: [
    R('Jul 3', 'Sales A/c', 18000),
    R('Jul 6', 'Dinesh Rao (cheque deposited)', 0, 30000),
    DEP('Jul 9', 14000),
    P('Jul 12', 'Purchases A/c', 0, 50000),
    P('Jul 15', 'Salaries A/c', 6000),
    P('Jul 29', 'Bank charges A/c', 0, 600),
  ],
});
same(OD.cash, 3000, 'Mehta closing cash');
same(OD.bank, -18600, 'Mehta closing bank (overdraft)');
export const OD_AMT = -OD.bank;

// ---------------------------------------------------------------- Naman Printers, 8-13 June 2026: petty cash book
export const PC = pettyCash({
  imprest: 2000,
  open: 0,
  startDate: 'Jun 8',
  closeDate: 'Jun 13',
  nextDate: 'Jun 15',
  vouchers: [
    V('Jun 8', 'Postage stamps', { postage: 150 }),
    V('Jun 8', 'Pencils and paper', { stationery: 320 }),
    V('Jun 9', 'Auto fare to the bank', { conveyance: 80 }),
    V('Jun 9', 'Cartage on goods', { cartage: 250 }),
    V('Jun 10', 'Tea for visitors', { sundries: 120 }),
    V('Jun 11', 'Courier charges', { postage: 200 }),
    V('Jun 12', 'Cartage on paper reels', { cartage: 300 }),
    V('Jun 12', 'Envelopes', { stationery: 140 }),
    V('Jun 13', 'Bus fare of the peon', { conveyance: 60 }),
    V('Jun 13', 'Cleaning materials', { sundries: 90 }),
  ],
});
same(PC.byHead.postage, 350, 'Naman postage');
same(PC.byHead.stationery, 460, 'Naman stationery');
same(PC.byHead.conveyance, 140, 'Naman conveyance');
same(PC.byHead.cartage, 550, 'Naman cartage');
same(PC.byHead.sundries, 210, 'Naman sundries');
same(PC.spent, 1710, 'Naman total spent');
same(PC.closing, 290, 'Naman closing balance');
same(PC.reimburse, 1710, 'Naman reimbursement');

// ---------------------------------------------------------------- Anvi Traders, July 2026: trade books at an imagined 12%
export const RATE = 12;
export const PB = tradeBook({
  kind: 'purchases',
  rate: RATE,
  entries: [
    T('Jul 3', 'P-101', 'Kishore Suppliers', 20000, 10),
    T('Jul 8', 'P-102', 'Rathi Mills', 50000, 20),
    T('Jul 15', 'P-103', 'Kishore Suppliers', 10000, 10),
    T('Jul 21', 'P-104', 'Surat Textiles', 30000, 10, true),
  ],
});
same(PB.totals.net, 94000, 'Anvi purchases net');
same(PB.totals.cgst, 4020, 'Anvi purchases CGST');
same(PB.totals.sgst, 4020, 'Anvi purchases SGST');
same(PB.totals.igst, 3240, 'Anvi purchases IGST');
same(PB.totals.total, 105280, 'Anvi purchases invoice total');
export const SB = tradeBook({
  kind: 'sales',
  rate: RATE,
  entries: [
    T('Jul 5', 'S-31', 'Lalit Agencies', 25000, 10),
    T('Jul 12', 'S-32', 'Prakash Stores', 40000, 5),
    T('Jul 19', 'S-33', 'Rohan Retail', 16000, 0),
    T('Jul 27', 'S-34', 'Meera Garments', 60000, 10, true),
  ],
});
same(SB.totals.net, 130500, 'Anvi sales net');
same(SB.totals.cgst, 4590, 'Anvi sales CGST');
same(SB.totals.igst, 6480, 'Anvi sales IGST');
same(SB.totals.total, 130500 + 9180 + 6480, 'Anvi sales invoice total');
export const PR = tradeBook({ kind: 'purchaseReturns', rate: RATE, entries: [T('Jul 10', 'DN-1', 'Kishore Suppliers', 6000, 10)] });
same(PR.totals.net, 5400, 'Anvi purchases return net');
same(PR.totals.cgst, 324, 'Anvi purchases return CGST');
same(PR.totals.total, 6048, 'Anvi purchases return total');
export const SR = tradeBook({ kind: 'salesReturns', rate: RATE, entries: [T('Jul 14', 'CN-1', 'Lalit Agencies', 4000, 10)] });
same(SR.totals.net, 3600, 'Anvi sales return net');
same(SR.totals.cgst, 216, 'Anvi sales return CGST');
same(SR.totals.total, 4032, 'Anvi sales return total');

// net goods and services tax position of the month: output less input, after returns
export const GT = {
  outCgst: SB.totals.cgst - SR.totals.cgst,
  inCgst: PB.totals.cgst - PR.totals.cgst,
  outIgst: SB.totals.igst,
  inIgst: PB.totals.igst,
};
GT.cgstPay = same(GT.outCgst - GT.inCgst, 678, 'Anvi net CGST payable');
GT.sgstPay = GT.cgstPay;
GT.igstPay = same(GT.outIgst - GT.inIgst, 3240, 'Anvi net IGST payable');
same(SB.totals.sgst - SR.totals.sgst - (PB.totals.sgst - PR.totals.sgst), GT.sgstPay, 'Anvi net SGST payable');
GT.rows = [
  ['CGST', inr(SB.totals.cgst - SR.totals.cgst), inr(PB.totals.cgst - PR.totals.cgst), inr(GT.cgstPay)],
  ['SGST', inr(SB.totals.sgst - SR.totals.sgst), inr(PB.totals.sgst - PR.totals.sgst), inr(GT.sgstPay)],
  ['IGST', inr(GT.outIgst), inr(GT.inIgst), inr(GT.igstPay)],
];

// ---------------------------------------------------------------- journal proper: Kavya Stores, an imagined shop
export const OPEN = {
  assets: [['Cash', 25000], ['Bank', 80000], ['Stock', 60000], ['Debtors', 40000], ['Furniture', 30000]],
  liabilities: [['Creditors', 35000], ['Bank loan', 50000]],
};
OPEN.totalA = same(sum(OPEN.assets.map(([, a]) => a)), 235000, 'Kavya opening assets');
OPEN.totalL = same(sum(OPEN.liabilities.map(([, a]) => a)), 85000, 'Kavya opening liabilities');
OPEN.capital = same(OPEN.totalA - OPEN.totalL, 150000, 'Kavya opening capital');
export const OPEN_J = journal([
  {
    date: 'Apr 1',
    dr: OPEN.assets.map(([n, a]) => [`${n} A/c`, a]),
    cr: [...OPEN.liabilities.map(([n, a]) => [`${n} A/c`, a]), ['Capital A/c', OPEN.capital]],
    note: 'Being the assets, liabilities and capital brought forward at the start of the year',
  },
]);
same(OPEN_J.total, 235000, 'opening entry total');

// furniture bought on credit with imagined 12% GST (intra-state)
export const FUR = { price: 45000, rate: 12 };
FUR.gst = gst(FUR.price, FUR.rate);
same(FUR.gst.cgst, 2700, 'furniture CGST');
FUR.total = same(FUR.price + FUR.gst.tax, 50400, 'furniture invoice total');

export const JP = journal([
  { date: 'Apr 6', dr: [['Furniture A/c', FUR.price], ['Input CGST A/c', FUR.gst.cgst], ['Input SGST A/c', FUR.gst.sgst]], cr: [['Raj Furnishers', FUR.total]], note: 'Being furniture bought on credit from Raj Furnishers; tax at an imagined 12%' },
  { date: 'Apr 12', dr: [['Drawings A/c', 6000]], cr: [['Purchases A/c', 6000]], note: 'Being goods taken by the owner for personal use' },
  { date: 'Apr 18', dr: [['Charity A/c', 3500]], cr: [['Purchases A/c', 3500]], note: 'Being goods given as charity' },
  { date: 'Apr 25', dr: [['Advertisement A/c', 2000]], cr: [['Purchases A/c', 2000]], note: 'Being goods distributed as free samples' },
  { date: 'Apr 29', dr: [['Loss by Fire A/c', 18000]], cr: [['Purchases A/c', 18000]], note: 'Being goods destroyed by fire' },
]);
same(JP.total, (FUR.total + 6000 + 3500 + 2000 + 18000), 'journal proper total');
