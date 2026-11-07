// Special purpose books for CBSE 11 Accountancy ch04: two-column cash book, analytical petty cash book (imprest
// system), and the purchases, sales, purchases return and sales return books with trade discount and GST at an
// imagined rate stated in the problem. The shared acc.mjs has none of these, so they are written here with asserts:
// columns total correctly, cash is never a credit balance, bank balances are carried down correctly, the petty cash
// imprest is restored, and every book total agrees with the sum of its entries. Self-checks run on import.
import { sum, check, same, whole, inr, mdTable, gst } from '../../cbse-11-accountancy-ch01/src/acc.mjs';

const bold = (s) => `**${s}**`;
const cell = (n) => (n ? inr(n) : '');

// ================================================================ two-column cash book
/** Receipt: a debit line (To ...) with amounts in the cash and bank columns. */
export const R = (date, who, cash = 0, bank = 0) => ({ k: 'R', date, who, cash, bank });
/** Payment: a credit line (By ...) with amounts in the cash and bank columns. */
export const P = (date, who, cash = 0, bank = 0) => ({ k: 'P', date, who, cash, bank });
/** Contra: cash deposited into the bank (cash column credit, bank column debit), marked C. */
export const DEP = (date, amt) => ({ k: 'DEP', date, amt });
/** Contra: cash withdrawn from the bank for office use (bank column credit, cash column debit), marked C. */
export const WD = (date, amt) => ({ k: 'WD', date, amt });

/**
 * Two-column cash book. open = { cash, bank } (bank negative = overdraft, a credit balance). items are R, P, DEP, WD.
 * Returns { headers, rows, md, cash, bank, dr, cr } where cash and bank are the closing balances (bank < 0 means
 * overdraft) and dr/cr are the column totals after balancing. Asserts: cash never credit, totals agree per column,
 * contra entries appear on both sides, balances equal the independent arithmetic.
 */
export function cashBook({ open = { cash: 0, bank: 0 }, items, openDate = '', closeDate = '' }) {
  check(open.cash >= 0, 'opening cash cannot be a credit balance');
  const L = [];
  const Rt = [];
  const first = { date: openDate, who: 'To Balance b/d', cash: open.cash, bank: Math.max(open.bank, 0) };
  if (first.cash || first.bank) L.push(first);
  if (open.bank < 0) Rt.push({ date: openDate, who: 'By Balance b/d', cash: 0, bank: -open.bank });
  let contraDrBank = 0, contraCrCash = 0, contraDrCash = 0, contraCrBank = 0;
  for (const it of items) {
    if (it.k === 'R') L.push({ date: it.date, who: `To ${it.who}`, cash: it.cash, bank: it.bank });
    else if (it.k === 'P') Rt.push({ date: it.date, who: `By ${it.who}`, cash: it.cash, bank: it.bank });
    else if (it.k === 'DEP') {
      L.push({ date: it.date, who: 'To Cash A/c (C)', cash: 0, bank: it.amt });
      Rt.push({ date: it.date, who: 'By Bank A/c (C)', cash: it.amt, bank: 0 });
      contraDrBank += it.amt; contraCrCash += it.amt;
    } else if (it.k === 'WD') {
      L.push({ date: it.date, who: 'To Bank A/c (C)', cash: it.amt, bank: 0 });
      Rt.push({ date: it.date, who: 'By Cash A/c (C)', cash: 0, bank: it.amt });
      contraDrCash += it.amt; contraCrBank += it.amt;
    } else throw new Error(`unknown cash book item ${it.k}`);
  }
  same(contraDrBank, contraCrCash, 'deposit contra entries agree on both sides');
  same(contraDrCash, contraCrBank, 'withdrawal contra entries agree on both sides');
  const dCash = sum(L.map((x) => x.cash)), cCash = sum(Rt.map((x) => x.cash));
  const dBank = sum(L.map((x) => x.bank)), cBank = sum(Rt.map((x) => x.bank));
  const cash = dCash - cCash;
  const bank = dBank - cBank;
  check(cash >= 0, `cash balance is credit (${cash}); cash cannot be negative`);
  // independent arithmetic
  const sumOf = (k, f) => sum(items.filter((i) => i.k === k).map(f));
  same(cash, open.cash + sumOf('R', (i) => i.cash) - sumOf('P', (i) => i.cash) + sumOf('WD', (i) => i.amt) - sumOf('DEP', (i) => i.amt), 'cash balance by independent sum');
  same(bank, open.bank + sumOf('R', (i) => i.bank) - sumOf('P', (i) => i.bank) + sumOf('DEP', (i) => i.amt) - sumOf('WD', (i) => i.amt), 'bank balance by independent sum');
  const n = Math.max(L.length, Rt.length);
  while (L.length < n) L.push(null);
  while (Rt.length < n) Rt.push(null);
  // balance carried down: cash is always a credit-side line; the bank is a credit-side line when favourable and a
  // debit-side line when overdrawn.
  const lc = { date: closeDate, who: 'To Balance c/d', cash: 0, bank: bank < 0 ? -bank : 0 };
  const rc = { date: closeDate, who: 'By Balance c/d', cash, bank: bank > 0 ? bank : 0 };
  if (lc.cash || lc.bank) L.push(lc);
  if (rc.cash || rc.bank) Rt.push(rc);
  const m = Math.max(L.length, Rt.length);
  while (L.length < m) L.push(null);
  while (Rt.length < m) Rt.push(null);
  const tCash = sum(L.map((x) => x?.cash ?? 0)), tBank = sum(L.map((x) => x?.bank ?? 0));
  same(tCash, sum(Rt.map((x) => x?.cash ?? 0)), 'cash column totals agree');
  same(tBank, sum(Rt.map((x) => x?.bank ?? 0)), 'bank column totals agree');
  const rows = [];
  for (let i = 0; i < m; i++) {
    const a = L[i], b = Rt[i];
    rows.push([a?.date ?? '', a?.who ?? '', a ? cell(a.cash) : '', a ? cell(a.bank) : '', b?.date ?? '', b?.who ?? '', b ? cell(b.cash) : '', b ? cell(b.bank) : '']);
  }
  rows.push(['', '', bold(inr(tCash)), bold(inr(tBank)), '', '', bold(inr(tCash)), bold(inr(tBank))]);
  const headers = ['Date', 'Dr: Particulars', 'Cash (₹)', 'Bank (₹)', 'Date', 'Cr: Particulars', 'Cash (₹)', 'Bank (₹)'];
  return { headers, rows, md: mdTable(headers, rows), cash, bank, totalCash: tCash, totalBank: tBank, dr: { cash: dCash, bank: dBank }, cr: { cash: cCash, bank: cBank } };
}

// ================================================================ analytical petty cash book
export const HEADS = ['postage', 'stationery', 'conveyance', 'cartage', 'sundries'];
const HEAD_NAMES = ['Postage (₹)', 'Stationery (₹)', 'Conveyance (₹)', 'Cartage (₹)', 'Sundries (₹)'];
/** Petty voucher: date, what, and the amounts under the heads it belongs to. */
export const V = (date, what, heads) => ({ date, what, ...heads });

/**
 * Analytical petty cash book on the imprest system. imprest = the fixed amount; open = balance in hand at the start;
 * the head cashier gives imprest − open so that the petty cashier starts with the full imprest. Returns
 * { headers, rows, md, spent, closing, reimburse, byHead, total } with asserts: heads add up to the total payments,
 * receipts equal payments plus balance, and the reimbursement restores the imprest.
 */
export function pettyCash({ imprest, open = 0, vouchers, startDate = '', closeDate = '', nextDate = '', receivedText = 'To Cash A/c (imprest)' }) {
  check(open >= 0 && open <= imprest, 'opening petty cash balance outside 0..imprest');
  const received = imprest - open;
  const lines = vouchers.map((v) => {
    const tot = sum(HEADS.map((h) => v[h] ?? 0));
    check(tot > 0, `voucher "${v.what}" has no amount`);
    return { ...v, total: tot };
  });
  const byHead = Object.fromEntries(HEADS.map((h) => [h, sum(lines.map((l) => l[h] ?? 0))]));
  const spent = sum(lines.map((l) => l.total));
  same(sum(HEADS.map((h) => byHead[h])), spent, 'analysis columns add up to the total payments');
  const closing = imprest - spent;
  check(closing >= 0, 'petty cash overspent: payments exceed the imprest');
  const rows = [];
  if (open) rows.push([cell(open), startDate, 'To Balance b/d', '', '', '', '', '', '']);
  rows.push([cell(received), startDate, receivedText, '', '', '', '', '', '']);
  for (const l of lines) rows.push(['', l.date, l.what, inr(l.total), ...HEADS.map((h) => cell(l[h] ?? 0))]);
  rows.push(['', '', bold('Total payments'), bold(inr(spent)), ...HEADS.map((h) => bold(inr(byHead[h])))]);
  rows.push(['', closeDate, 'By Balance c/d', inr(closing), '', '', '', '', '']);
  rows.push([bold(inr(open + received)), '', '', bold(inr(spent + closing)), '', '', '', '', '']);
  same(open + received, spent + closing, 'petty cash receipts equal payments plus balance');
  const reimburse = spent;
  same(closing + reimburse, imprest, 'reimbursement restores the imprest');
  rows.push([inr(closing), nextDate, 'To Balance b/d', '', '', '', '', '', '']);
  rows.push([inr(reimburse), nextDate, 'To Cash A/c (reimbursement)', '', '', '', '', '', '']);
  const headers = ['Receipts (₹)', 'Date', 'Particulars', 'Total (₹)', ...HEAD_NAMES];
  return { headers, rows, md: mdTable(headers, rows), spent, closing, reimburse, byHead, total: spent, lines, received };
}

// ================================================================ purchases, sales and returns books
const KINDS = {
  purchases: { no: 'Invoice no.', who: 'Name of supplier', book: 'Purchases', goods: 'Purchases A/c', tax: 'Input' },
  sales: { no: 'Invoice no.', who: 'Name of customer', book: 'Sales', goods: 'Sales A/c', tax: 'Output' },
  purchaseReturns: { no: 'Debit note no.', who: 'Name of supplier', book: 'Purchases Return', goods: 'Purchases Return A/c', tax: 'Input' },
  salesReturns: { no: 'Credit note no.', who: 'Name of customer', book: 'Sales Return', goods: 'Sales Return A/c', tax: 'Output' },
};
/** Entry of a trade book: list price, trade discount per cent, and whether the supply is inter-state (IGST). */
export const T = (date, no, party, list, td = 0, inter = false) => ({ date, no, party, list, td, inter });

/**
 * Subsidiary book for goods. Only the NET amount (list price less trade discount) is recorded in the goods column;
 * GST at the imagined rate is computed on that net amount with gst(). rate 0 gives a book with no tax columns.
 * Returns { headers, rows, md, work, workMd, entries, totals, posting } where posting = { dr, cr } is the journal-style
 * summary used to post the totals to the ledger (debits equal credits).
 */
export function tradeBook({ kind, rate = 0, entries }) {
  const K = KINDS[kind];
  check(K, `unknown kind ${kind}`);
  const es = entries.map((e) => {
    const tdAmt = whole((e.list * e.td) / 100, 'trade discount');
    const net = e.list - tdAmt;
    const tax = rate ? gst(net, rate, { interState: e.inter }) : { tax: 0, cgst: 0, sgst: 0, igst: 0 };
    same(net + tax.tax, net + tax.cgst + tax.sgst + tax.igst, 'tax parts add to the tax');
    return { ...e, tdAmt, net, ...tax, total: net + tax.tax };
  });
  const tot = (f) => sum(es.map(f));
  const totals = { list: tot((e) => e.list), td: tot((e) => e.tdAmt), net: tot((e) => e.net), cgst: tot((e) => e.cgst), sgst: tot((e) => e.sgst), igst: tot((e) => e.igst), tax: tot((e) => e.tax), total: tot((e) => e.total) };
  same(totals.list - totals.td, totals.net, 'list price less trade discount equals net');
  same(totals.net + totals.tax, totals.total, 'invoice totals equal net plus tax');
  same(totals.cgst + totals.sgst + totals.igst, totals.tax, 'tax columns add up');
  const hasIntra = es.some((e) => !e.inter), hasInter = es.some((e) => e.inter);
  const taxCols = rate ? [...(hasIntra ? ['CGST', 'SGST'] : []), ...(hasInter ? ['IGST'] : [])] : [];
  const headers = ['Date', K.no, K.who, 'L.F.', rate ? 'Net amount (₹)' : 'Amount (₹)', ...taxCols.map((c) => `${c} (₹)`), ...(rate ? ['Total (₹)'] : [])];
  const rows = es.map((e) => [e.date, e.no, e.party, '', inr(e.net), ...(rate ? [...(hasIntra ? [cell(e.cgst), cell(e.sgst)] : []), ...(hasInter ? [cell(e.igst)] : []), inr(e.total)] : [])]);
  rows.push(['', '', bold('Total'), '', bold(inr(totals.net)), ...(rate ? [...(hasIntra ? [bold(inr(totals.cgst)), bold(inr(totals.sgst))] : []), ...(hasInter ? [bold(inr(totals.igst))] : []), bold(inr(totals.total))] : [])]);
  const work = es.map((e) => [e.no, e.party, inr(e.list), cell(e.tdAmt), inr(e.net), ...(rate ? [inr(e.tax), inr(e.total)] : [])]);
  const workHeaders = [K.no, K.who, 'List price (₹)', 'Trade discount (₹)', 'Net (₹)', ...(rate ? ['GST (₹)', 'Total (₹)'] : [])];
  work.push([bold('Total'), '', bold(inr(totals.list)), bold(inr(totals.td)), bold(inr(totals.net)), ...(rate ? [bold(inr(totals.tax)), bold(inr(totals.total))] : [])]);
  // posting summary
  const parties = [...new Set(es.map((e) => e.party))].map((p) => [`${p} A/c`, sum(es.filter((e) => e.party === p).map((e) => e.total))]);
  const taxAcc = (name) => [[`${K.tax} CGST A/c`, totals.cgst], [`${K.tax} SGST A/c`, totals.sgst], [`${K.tax} IGST A/c`, totals.igst]].filter(([, a]) => a).map(([n, a]) => [n, a]);
  void taxAcc;
  const taxLines = [[`${K.tax} CGST A/c`, totals.cgst], [`${K.tax} SGST A/c`, totals.sgst], [`${K.tax} IGST A/c`, totals.igst]].filter(([, a]) => a);
  let dr, cr;
  if (kind === 'purchases') { dr = [[K.goods, totals.net], ...taxLines]; cr = parties; }
  else if (kind === 'sales') { dr = parties; cr = [[K.goods, totals.net], ...taxLines]; }
  else if (kind === 'purchaseReturns') { dr = parties; cr = [[K.goods, totals.net], ...taxLines]; }
  else { dr = [[K.goods, totals.net], ...taxLines]; cr = parties; }
  same(sum(dr.map(([, a]) => a)), sum(cr.map(([, a]) => a)), `${kind} posting summary balances`);
  same(sum(parties.map(([, a]) => a)), totals.total, `${kind} party totals agree with the book total`);
  return { headers, rows, md: mdTable(headers, rows), workHeaders, work, workMd: mdTable(workHeaders, work), entries: es, totals, posting: { dr, cr }, taxCols };
}

// ================================================================ self-checks (run on import)
{
  const cb = cashBook({
    open: { cash: 1000, bank: -2000 },
    items: [R('1', 'Sales A/c', 5000), R('2', 'Debtor', 0, 7000), DEP('3', 2000), P('4', 'Rent', 0, 1500), WD('5', 1000), P('6', 'Wages', 3000)],
  });
  same(cb.cash, 1000 + 5000 + 1000 - 2000 - 3000, 'self-check cash');
  same(cb.bank, -2000 + 7000 + 2000 - 1500 - 1000, 'self-check bank');
  let threw = false;
  try { cashBook({ open: { cash: 0, bank: 0 }, items: [P('1', 'X', 10, 0)] }); } catch { threw = true; }
  check(threw, 'a cash book must reject a negative cash balance');
  const pc = pettyCash({ imprest: 1000, vouchers: [V('1', 'Stamps', { postage: 100 }), V('2', 'Fare', { conveyance: 150 })] });
  same(pc.spent, 250, 'self-check petty spent');
  same(pc.closing, 750, 'self-check petty closing');
  same(pc.reimburse, 250, 'self-check reimbursement');
  const pb = tradeBook({ kind: 'purchases', rate: 12, entries: [T('1', '1', 'A', 10000, 10), T('2', '2', 'B', 5000, 0, true)] });
  same(pb.totals.net, 14000, 'self-check net');
  same(pb.totals.cgst, 540, 'self-check CGST');
  same(pb.totals.igst, 600, 'self-check IGST');
  same(pb.totals.total, 15680, 'self-check total');
}
