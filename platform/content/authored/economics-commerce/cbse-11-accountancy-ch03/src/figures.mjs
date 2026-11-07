// Shared computed figures for CBSE 11 Accountancy ch03 (Recording of Transactions I). Every amount a slide, note or
// item states for the worked cases comes from here or is computed beside the item with acc.mjs and asserted.
// Imagined firms only.
import { same, check, sum, inr, rs, mdTable, equation, journal, ledger, post, trialFromLedgers, gst, words, rupees } from '../../cbse-11-accountancy-ch01/src/acc.mjs';

export { same, check, sum, inr, rs, mdTable, equation, journal, ledger, post, trialFromLedgers, gst, words, rupees };

// ---------------------------------------------------------------- journal and ledger views with dates and folios
/** Journal with a ledger-folio column. entries as for journal(); folio = { account: page }. Balance is asserted by journal(). */
export function jrnl(entries, folio) {
  const j = journal(entries);
  const rows = [];
  for (const e of entries) {
    const f = (a) => {
      check(folio[a] !== undefined, `no ledger folio for ${a}`);
      return String(folio[a]);
    };
    e.dr.forEach(([a, m], i) => rows.push([i ? '' : e.date ?? '', `${a} Dr.`, f(a), inr(m), '']));
    for (const [a, m] of e.cr) rows.push(['', `To ${a}`, f(a), '', inr(m)]);
    rows.push(['', `*(${e.note})*`, '', '', '']);
  }
  rows.push(['', '**Total**', '', `**${inr(j.total)}**`, `**${inr(j.total)}**`]);
  const headers = ['Date', 'Particulars', 'L.F.', 'Dr (₹)', 'Cr (₹)'];
  return { headers, rows, md: mdTable(headers, rows), total: j.total };
}
/** Posts dated journal entries (page jf) to ledger accounts; balances agree with acc.mjs post(). */
export function postD(entries, { openings = {}, jf = 1 } = {}) {
  const acc = {};
  const get = (k) => (acc[k] ??= { dr: [], cr: [] });
  for (const e of entries) {
    const crName = e.cr.length === 1 ? e.cr[0][0] : 'Sundries';
    const drName = e.dr.length === 1 ? e.dr[0][0] : 'Sundries';
    for (const [a, m] of e.dr) get(a).dr.push([`${e.date} To ${crName} (J.F. ${jf})`, m]);
    for (const [a, m] of e.cr) get(a).cr.push([`${e.date} By ${drName} (J.F. ${jf})`, m]);
  }
  for (const k of Object.keys(openings)) get(k);
  const out = {};
  for (const [k, v] of Object.entries(acc)) out[k] = ledger({ name: k, opening: openings[k], ...v });
  const plain = post(entries, openings);
  for (const k of Object.keys(plain)) same(out[k].balance, plain[k].balance, `ledger balance of ${k} agrees with post()`);
  return out;
}
const withBal = (l) => ({ ...l, ...{ side: l.balance >= 0 ? 'debit' : 'credit', bal: Math.abs(l.balance) } });
export const bal = (l) => withBal(l);

// ---------------------------------------------------------------- Kavya Stores, April 2027 (10 transactions, GST at an imagined 12%)
export const RATE = 12;
export const FOLIO = { 'Cash A/c': 1, 'Furniture A/c': 2, 'Capital A/c': 3, 'Purchases A/c': 4, 'Input CGST A/c': 5, 'Input SGST A/c': 6, 'Mehta Paper Mart A/c': 7, 'Rent A/c': 8, 'Sales A/c': 9, 'Output CGST A/c': 10, 'Output SGST A/c': 11, 'Sunita Gupta A/c': 12, 'Drawings A/c': 13, 'Salaries A/c': 14, 'Commission Received A/c': 15 };
export const KV = {
  cash0: 150000, furn: 50000, purch: 60000, rent: 8000, cashSale: 40000, cashSaleCost: 30000, creditSale: 30000, creditSaleCost: 22000,
  paidMehta: 30000, recd: 20000, drawn: 5000, sal: 12000, comm: 3000,
};
KV.cap = KV.cash0 + KV.furn;
KV.pg = gst(KV.purch, RATE);
KV.s1g = gst(KV.cashSale, RATE);
KV.s2g = gst(KV.creditSale, RATE);
KV.purchTotal = KV.purch + KV.pg.tax;
KV.s1Total = KV.cashSale + KV.s1g.tax;
KV.s2Total = KV.creditSale + KV.s2g.tax;
same(KV.cap, 200000, 'Kavya capital');
same(KV.pg.tax, 7200, 'Kavya input tax');
same(KV.purchTotal, 67200, 'Kavya purchase invoice');
same(KV.s1g.tax, 4800, 'Kavya cash sale tax');
same(KV.s1Total, 44800, 'Kavya cash sale total');
same(KV.s2g.tax, 3600, 'Kavya credit sale tax');
same(KV.s2Total, 33600, 'Kavya credit sale total');
export const KV_E = [
  { date: '1 Apr', dr: [['Cash A/c', KV.cash0], ['Furniture A/c', KV.furn]], cr: [['Capital A/c', KV.cap]], note: 'Being the business started with cash and furniture' },
  { date: '3 Apr', dr: [['Purchases A/c', KV.purch], ['Input CGST A/c', KV.pg.cgst], ['Input SGST A/c', KV.pg.sgst]], cr: [['Mehta Paper Mart A/c', KV.purchTotal]], note: `Being goods bought on credit from Mehta Paper Mart, tax at an imagined ${RATE}%` },
  { date: '5 Apr', dr: [['Rent A/c', KV.rent]], cr: [['Cash A/c', KV.rent]], note: 'Being rent of the shop paid for April' },
  { date: '8 Apr', dr: [['Cash A/c', KV.s1Total]], cr: [['Sales A/c', KV.cashSale], ['Output CGST A/c', KV.s1g.cgst], ['Output SGST A/c', KV.s1g.sgst]], note: 'Being goods sold for cash, tax collected' },
  { date: '10 Apr', dr: [['Sunita Gupta A/c', KV.s2Total]], cr: [['Sales A/c', KV.creditSale], ['Output CGST A/c', KV.s2g.cgst], ['Output SGST A/c', KV.s2g.sgst]], note: 'Being goods sold on credit to Sunita Gupta, tax charged' },
  { date: '12 Apr', dr: [['Mehta Paper Mart A/c', KV.paidMehta]], cr: [['Cash A/c', KV.paidMehta]], note: 'Being part payment made to Mehta Paper Mart' },
  { date: '15 Apr', dr: [['Cash A/c', KV.recd]], cr: [['Sunita Gupta A/c', KV.recd]], note: 'Being cash received from Sunita Gupta' },
  { date: '20 Apr', dr: [['Drawings A/c', KV.drawn]], cr: [['Cash A/c', KV.drawn]], note: 'Being cash taken by the proprietor for personal use' },
  { date: '24 Apr', dr: [['Salaries A/c', KV.sal]], cr: [['Cash A/c', KV.sal]], note: 'Being salary paid for April' },
  { date: '28 Apr', dr: [['Cash A/c', KV.comm]], cr: [['Commission Received A/c', KV.comm]], note: 'Being commission received in cash' },
];
export const KV_J = jrnl(KV_E, FOLIO);
same(KV_J.total, 200000 + 67200 + 8000 + 44800 + 33600 + 30000 + 20000 + 5000 + 12000 + 3000, 'Kavya journal total');
export const KV_L = postD(KV_E, { jf: 1 });
export const KV_TB = trialFromLedgers(KV_L);
same(KV_L['Cash A/c'].balance, 162800, 'Kavya cash balance');
same(KV_L['Mehta Paper Mart A/c'].balance, -37200, 'Kavya creditor balance');
same(KV_L['Sunita Gupta A/c'].balance, 13600, 'Kavya debtor balance');
same(KV_L['Sales A/c'].balance, -70000, 'Kavya sales');
same(KV_L['Output CGST A/c'].balance, -4200, 'Kavya output CGST');
same(KV_L['Input CGST A/c'].balance, 3600, 'Kavya input CGST');
same(KV_TB.dr, 318600, 'Kavya trial balance total');
// the accounting equation after every transaction (the sale is shown at its profit: stock goes out at cost)
export const KV_Q = equation({
  steps: [
    { what: '1 Started business', assets: { Cash: KV.cash0, Furniture: KV.furn }, capital: KV.cap },
    { what: '2 Bought goods on credit', assets: { Stock: KV.purch, 'Input GST': KV.pg.tax }, liabilities: { Creditors: KV.purchTotal } },
    { what: '3 Paid rent', assets: { Cash: -KV.rent }, capital: -KV.rent },
    { what: '4 Cash sale', assets: { Cash: KV.s1Total, Stock: -KV.cashSaleCost }, liabilities: { 'GST payable': KV.s1g.tax }, capital: KV.cashSale - KV.cashSaleCost },
    { what: '5 Credit sale', assets: { Debtors: KV.s2Total, Stock: -KV.creditSaleCost }, liabilities: { 'GST payable': KV.s2g.tax }, capital: KV.creditSale - KV.creditSaleCost },
    { what: '6 Paid supplier', assets: { Cash: -KV.paidMehta }, liabilities: { Creditors: -KV.paidMehta } },
    { what: '7 Cash from debtor', assets: { Cash: KV.recd, Debtors: -KV.recd } },
    { what: '8 Drawings', assets: { Cash: -KV.drawn }, capital: -KV.drawn },
    { what: '9 Paid salary', assets: { Cash: -KV.sal }, capital: -KV.sal },
    { what: '10 Commission', assets: { Cash: KV.comm }, capital: KV.comm },
  ],
});
export const KVF = KV_Q.final;
export const KV_ASSETS = sum(Object.values(KVF.assets));
same(KVF.assets.Cash, KV_L['Cash A/c'].balance, 'equation cash equals ledger cash');
same(KVF.assets.Stock, 8000, 'Kavya closing stock by equation');
same(KVF.liabilities.Creditors, 37200, 'Kavya creditors by equation');
same(KVF.liabilities['GST payable'], 8400, 'Kavya GST payable by equation');
same(KVF.capital, 196000, 'Kavya capital by equation');
same(KV_ASSETS, 241600, 'Kavya total assets');

// ---------------------------------------------------------------- Rohan Electricals: accounting equation (t02)
export const RO = { cap: 300000, buy: 80000, loan: 50000, saleCost: 20000, salePrice: 26000, exp: 7000, drawn: 4000, repay: 20000 };
RO.profit = same(RO.salePrice - RO.saleCost, 6000, 'Rohan profit on sale');
export const RO_Q = equation({
  steps: [
    { what: '1 Capital introduced in cash', assets: { Cash: RO.cap }, capital: RO.cap },
    { what: '2 Goods bought on credit', assets: { Stock: RO.buy }, liabilities: { Creditors: RO.buy } },
    { what: '3 Bank loan received', assets: { Cash: RO.loan }, liabilities: { 'Bank loan': RO.loan } },
    { what: '4 Cash sale at a profit', assets: { Cash: RO.salePrice, Stock: -RO.saleCost }, capital: RO.profit },
    { what: '5 Expense paid', assets: { Cash: -RO.exp }, capital: -RO.exp },
    { what: '6 Drawings', assets: { Cash: -RO.drawn }, capital: -RO.drawn },
    { what: '7 Loan repaid in part', assets: { Cash: -RO.repay }, liabilities: { 'Bank loan': -RO.repay } },
  ],
});
export const ROF = RO_Q.final;
export const RO_ASSETS = sum(Object.values(ROF.assets));
same(ROF.assets.Cash, 345000, 'Rohan cash');
same(ROF.assets.Stock, 60000, 'Rohan stock');
same(ROF.liabilities['Bank loan'], 30000, 'Rohan loan');
same(ROF.capital, 295000, 'Rohan capital');
same(RO_ASSETS, 405000, 'Rohan assets');
same(sum(Object.values(ROF.liabilities)) + ROF.capital, 405000, 'Rohan liabilities plus capital');

// ---------------------------------------------------------------- the imagined payment voucher (t01)
export const VC = { no: 14, amount: KV.rent };
export const VCH_ROWS = [
  ['Voucher type', 'Debit voucher (cash payment)'],
  ['Voucher number', String(VC.no)],
  ['Date', '5 April 2027'],
  ['Account debited', `Rent A/c: ${rs(VC.amount)}`],
  ['Account credited', `Cash A/c: ${rs(VC.amount)}`],
  ['Narration', 'Rent of the shop paid for April to the landlord, receipt number 112 attached'],
  ['Source document', 'Rent receipt number 112'],
  ['Prepared by / Checked by / Authorised by', 'Signatures of the accountant, the cashier and the proprietor'],
];

// ---------------------------------------------------------------- helper for items: markdown of a ledger account
export const acct = (l) => `**${l.name}**\n\n${l.md}`;
