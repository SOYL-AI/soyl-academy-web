// Shared computed figures for ISC 11 Accounts ch03 (Accounting Equation and Journal). Every amount a slide, note or
// item states for the worked cases comes from here, computed with acc.mjs and asserted. Imagined firms only. No GST
// transactions anywhere (the syllabus removes journal entries for GST; GST is theory only).
import { same, check, sum, inr, rs, mdTable, equation, journal, words, rupees } from './acc.mjs';

export { same, check, sum, inr, rs, mdTable, equation, journal, words, rupees };

/** A dated journal entry. dr and cr are [[account, amount]]. */
export const E = (date, dr, cr, note) => ({ date, dr, cr, note });
/** The journal table (Markdown) of a list of entries; every entry balances (asserted by journal()). */
export const jm = (entries) => journal(entries).md;

// ---------------------------------------------------------------- accounting equation, worked example 1: Tezpur Tea Stall
const T = { cash: 150000, furn: 30000, cashBuy: 40000, credBuy: 25000, soldCost: 30000, soldFor: 38000, paid: 15000, drawn: 10000, credCost: 12000, credFor: 14500, rent: 5000 };
export const EQ1 = equation({
  start: { assets: { Cash: 0, Stock: 0, Debtors: 0, Furniture: 0 }, liabilities: { Creditors: 0 }, capital: 0 },
  steps: [
    { what: `Owner starts with cash ${rs(T.cash)} and furniture ${rs(T.furn)}`, assets: { Cash: T.cash, Furniture: T.furn }, capital: T.cash + T.furn },
    { what: `Bought goods for cash ${rs(T.cashBuy)}`, assets: { Cash: -T.cashBuy, Stock: T.cashBuy } },
    { what: `Bought goods on credit ${rs(T.credBuy)}`, assets: { Stock: T.credBuy }, liabilities: { Creditors: T.credBuy } },
    { what: `Sold goods costing ${rs(T.soldCost)} for cash ${rs(T.soldFor)}`, assets: { Cash: T.soldFor, Stock: -T.soldCost }, capital: T.soldFor - T.soldCost },
    { what: `Paid creditors ${rs(T.paid)}`, assets: { Cash: -T.paid }, liabilities: { Creditors: -T.paid } },
    { what: `Owner withdrew cash ${rs(T.drawn)}`, assets: { Cash: -T.drawn }, capital: -T.drawn },
    { what: `Sold goods costing ${rs(T.credCost)} on credit for ${rs(T.credFor)}`, assets: { Debtors: T.credFor, Stock: -T.credCost }, capital: T.credFor - T.credCost },
    { what: `Paid rent ${rs(T.rent)}`, assets: { Cash: -T.rent }, capital: -T.rent },
  ],
});
export const EQ1F = EQ1.final;
same(EQ1F.assets.Cash, 118000, 'EQ1 cash');
same(EQ1F.assets.Stock, 23000, 'EQ1 stock');
same(EQ1F.assets.Debtors, 14500, 'EQ1 debtors');
same(EQ1F.liabilities.Creditors, 10000, 'EQ1 creditors');
same(EQ1F.capital, 175500, 'EQ1 capital');
export const EQ1_ASSETS = same(sum(Object.values(EQ1F.assets)), 185500, 'EQ1 total assets');
export const EQ1_T = T;

// ---------------------------------------------------------------- accounting equation, worked example 3: Ongole Bakery
const G = { cash: 80000, stock: 60000, mach: 120000, cred: 40000, loan: 50000, newMach: 35000, comm: 6000, wages: 9000, own: 7000, saleCost: 18000, saleFor: 23000, recd: 10000 };
export const EQ3 = equation({
  start: { assets: { Cash: G.cash, Stock: G.stock, Debtors: 0, Machinery: G.mach }, liabilities: { Creditors: G.cred, 'Bank loan': 0 }, capital: G.cash + G.stock + G.mach - G.cred },
  steps: [
    { what: 'Position at the start', },
    { what: `Took a bank loan ${rs(G.loan)} into cash`, assets: { Cash: G.loan }, liabilities: { 'Bank loan': G.loan } },
    { what: `Bought machinery for cash ${rs(G.newMach)}`, assets: { Cash: -G.newMach, Machinery: G.newMach } },
    { what: `Received commission ${rs(G.comm)} in cash`, assets: { Cash: G.comm }, capital: G.comm },
    { what: `Paid wages ${rs(G.wages)}`, assets: { Cash: -G.wages }, capital: -G.wages },
    { what: `Owner took goods costing ${rs(G.own)} for personal use`, assets: { Stock: -G.own }, capital: -G.own },
    { what: `Sold goods costing ${rs(G.saleCost)} on credit for ${rs(G.saleFor)}`, assets: { Debtors: G.saleFor, Stock: -G.saleCost }, capital: G.saleFor - G.saleCost },
    { what: `Debtors paid ${rs(G.recd)}`, assets: { Cash: G.recd, Debtors: -G.recd } },
  ],
});
export const EQ3F = EQ3.final;
same(EQ3F.assets.Cash, 102000, 'EQ3 cash');
same(EQ3F.assets.Stock, 35000, 'EQ3 stock');
same(EQ3F.assets.Machinery, 155000, 'EQ3 machinery');
same(EQ3F.assets.Debtors, 13000, 'EQ3 debtors');
same(EQ3F.capital, 215000, 'EQ3 capital');
export const EQ3_ASSETS = same(sum(Object.values(EQ3F.assets)), 305000, 'EQ3 total assets');
export const EQ3_CAP0 = same(G.cash + G.stock + G.mach - G.cred, 220000, 'EQ3 opening capital');
export const EQ3_G = G;

// ---------------------------------------------------------------- missing figure and profit by capital
export const MISS = [
  { name: 'Case A', assets: 640000, liab: 210000, cap: null },
  { name: 'Case B', assets: null, liab: 125000, cap: 375000 },
  { name: 'Case C', assets: 290000, liab: null, cap: 170000 },
].map((c) => {
  const assets = c.assets ?? c.liab + c.cap;
  const liab = c.liab ?? assets - c.cap;
  const cap = c.cap ?? assets - c.liab;
  same(assets, liab + cap, `missing figure ${c.name}`);
  return { ...c, a: assets, l: liab, c: cap, found: c.assets === null ? 'Assets' : c.liab === null ? 'Liabilities' : 'Capital', value: c.assets === null ? assets : c.liab === null ? liab : cap };
});
same(MISS[0].value, 430000, 'case A capital');
same(MISS[1].value, 500000, 'case B assets');
same(MISS[2].value, 120000, 'case C liabilities');
export const PROFIT = { open: 430000, close: 505000, drawings: 36000, fresh: 20000 };
PROFIT.value = same(PROFIT.close - PROFIT.open + PROFIT.drawings - PROFIT.fresh, 91000, 'profit by the capital method');

// ---------------------------------------------------------------- classification of accounts
/** account -> [traditional class, modern class]. Bank A/c and Purchases/Sales are deliberately left out of classification items (textbooks differ). */
export const ACC = {
  'Cash A/c': ['Real (tangible)', 'Asset'],
  'Machinery A/c': ['Real (tangible)', 'Asset'],
  'Furniture A/c': ['Real (tangible)', 'Asset'],
  'Goodwill A/c': ['Real (intangible)', 'Asset'],
  'Patents A/c': ['Real (intangible)', 'Asset'],
  'Meena Kapoor A/c (debtor)': ['Personal (natural)', 'Asset'],
  'Rao Brothers A/c (creditor)': ['Personal (natural)', 'Liability'],
  'Loan from Vindhya Bank A/c': ['Personal (artificial)', 'Liability'],
  'Capital A/c': ['Personal (owner)', 'Capital'],
  'Drawings A/c': ['Personal (owner)', 'Capital'],
  'Outstanding Rent A/c': ['Personal (representative)', 'Liability'],
  'Prepaid Insurance A/c': ['Personal (representative)', 'Asset'],
  'Accrued Interest A/c': ['Personal (representative)', 'Asset'],
  'Rent Received in Advance A/c': ['Personal (representative)', 'Liability'],
  'Salaries A/c': ['Nominal', 'Expense'],
  'Rent A/c': ['Nominal', 'Expense'],
  'Bad Debts A/c': ['Nominal', 'Expense'],
  'Loss by Fire A/c': ['Nominal', 'Expense'],
  'Commission Received A/c': ['Nominal', 'Income'],
  'Interest Received A/c': ['Nominal', 'Income'],
};
/** The side that increases an account of each modern class. */
export const INCREASE = { Asset: 'Dr', Expense: 'Dr', Liability: 'Cr', Capital: 'Cr', Income: 'Cr' };
export const otherSide = (s) => (s === 'Dr' ? 'Cr' : 'Dr');
/** Side to be used for an account that increases ('inc') or decreases ('dec') in a transaction. */
export function sideOf(account, effect) {
  const info = ACC[account];
  check(info, `account not classified: ${account}`);
  // Drawings reduce capital and are debited: it is held as an owner's account that increases on the debit side.
  if (account === 'Drawings A/c') return effect === 'inc' ? 'Dr' : 'Cr';
  const inc = INCREASE[info[1]];
  return effect === 'inc' ? inc : otherSide(inc);
}
/** Analysis rows for a transaction given as [[account, 'inc'|'dec']]: account, traditional, modern, effect, side. One debit and one credit at least. */
export function analyse(lines) {
  const rows = lines.map(([a, eff]) => ({ a, trad: ACC[a][0], mod: ACC[a][1], eff, side: sideOf(a, eff) }));
  check(rows.some((r) => r.side === 'Dr') && rows.some((r) => r.side === 'Cr'), `transaction needs a debit and a credit: ${lines.map((l) => l[0]).join(', ')}`);
  return rows;
}
export const TXN = [
  { t: 'Bought machinery for cash', lines: [['Machinery A/c', 'inc'], ['Cash A/c', 'dec']] },
  { t: 'Paid salaries in cash', lines: [['Salaries A/c', 'inc'], ['Cash A/c', 'dec']] },
  { t: 'Took a loan from Vindhya Bank into cash', lines: [['Cash A/c', 'inc'], ['Loan from Vindhya Bank A/c', 'inc']] },
  { t: 'Paid Rao Brothers, a creditor, in cash', lines: [['Rao Brothers A/c (creditor)', 'dec'], ['Cash A/c', 'dec']] },
  { t: 'Rent of the month is due but not yet paid', lines: [['Rent A/c', 'inc'], ['Outstanding Rent A/c', 'inc']] },
  { t: 'Owner brought more cash into the business', lines: [['Cash A/c', 'inc'], ['Capital A/c', 'inc']] },
];
export const TXN_ROWS = TXN.map((x) => {
  const r = analyse(x.lines);
  const dr = r.filter((y) => y.side === 'Dr');
  const cr = r.filter((y) => y.side === 'Cr');
  const d = (y) => `${y.a} (${y.trad}; ${y.mod})`;
  return [x.t, dr.map(d).join('; '), cr.map(d).join('; ')];
});
same(analyse(TXN[0].lines).find((r) => r.a === 'Machinery A/c').side === 'Dr' ? 1 : 0, 1, 'machinery is debited');
same(analyse(TXN[3].lines).find((r) => r.a.startsWith('Rao')).side === 'Dr' ? 1 : 0, 1, 'a creditor paid is debited');
same(analyse(TXN[4].lines).find((r) => r.a.startsWith('Outstanding')).side === 'Cr' ? 1 : 0, 1, 'outstanding rent is credited');

// ---------------------------------------------------------------- journal sets
// J1: Kolar Spice Traders, January 2027
export const J1 = [
  E('1 Jan 2027', [['Cash A/c', 300000], ['Furniture A/c', 40000]], [['Capital A/c', 340000]], 'Being business started with cash and furniture'),
  E('3 Jan', [['Purchases A/c', 60000]], [['Cash A/c', 60000]], 'Being goods purchased for cash'),
  E('5 Jan', [['Purchases A/c', 90000]], [['Dhruv Provision Stores A/c', 90000]], 'Being goods purchased on credit from Dhruv Provision Stores'),
  E('8 Jan', [['Cash A/c', 45000]], [['Sales A/c', 45000]], 'Being goods sold for cash'),
  E('10 Jan', [['Chitra Retail A/c', 70000]], [['Sales A/c', 70000]], 'Being goods sold on credit to Chitra Retail'),
  E('12 Jan', [['Dhruv Provision Stores A/c', 6000]], [['Purchases Return A/c', 6000]], 'Being goods returned to Dhruv Provision Stores'),
  E('15 Jan', [['Sales Return A/c', 4000]], [['Chitra Retail A/c', 4000]], 'Being goods returned by Chitra Retail'),
];
export const J1_TOTAL = same(journal(J1).total, 340000 + 60000 + 90000 + 45000 + 70000 + 6000 + 4000, 'J1 total');

// J2: Nilgiri Gift House, March 2027: discounts, drawings, loss by fire, charity
export const J2 = [
  E('4 Mar 2027', [['Cash A/c', 19200], ['Discount Allowed A/c', 800]], [['Rajan Menon A/c', 20000]], 'Being cash received from Rajan Menon in full settlement of his account of ₹20,000'),
  E('9 Mar', [['Salma Khatoon A/c', 37500]], [['Cash A/c', 36000], ['Discount Received A/c', 1500]], 'Being cash paid to Salma Khatoon in full settlement of her account of ₹37,500'),
  E('14 Mar', [['Drawings A/c', 15000]], [['Cash A/c', 15000]], 'Being cash withdrawn by the proprietor for personal use'),
  E('18 Mar', [['Drawings A/c', 6000]], [['Purchases A/c', 6000]], 'Being goods costing ₹6,000 taken by the proprietor for personal use'),
  E('22 Mar', [['Loss by Fire A/c', 12000]], [['Purchases A/c', 12000]], 'Being goods costing ₹12,000 destroyed by fire'),
  E('27 Mar', [['Charity A/c', 2500]], [['Purchases A/c', 2500]], 'Being goods costing ₹2,500 given as charity'),
];
export const J2_TOTAL = same(journal(J2).total, 20000 + 37500 + 15000 + 6000 + 12000 + 2500, 'J2 total');

// J3: Palakkad Pottery, 31 March 2027: bad debts, depreciation, interest, outstanding and prepaid items
export const J3 = [
  E('31 Mar 2027', [['Bad Debts A/c', 3800]], [['Hari Nair A/c', 3800]], 'Being the account of Hari Nair written off as bad'),
  E('31 Mar', [['Depreciation A/c', 9000]], [['Machinery A/c', 9000]], 'Being depreciation charged on machinery'),
  E('31 Mar', [['Interest A/c', 4200]], [['Cash A/c', 4200]], 'Being interest paid on the loan'),
  E('31 Mar', [['Bank A/c', 1800]], [['Interest Received A/c', 1800]], 'Being interest received in the bank'),
  E('31 Mar', [['Wages A/c', 5000]], [['Outstanding Wages A/c', 5000]], 'Being wages of March outstanding'),
  E('31 Mar', [['Prepaid Insurance A/c', 2400]], [['Insurance A/c', 2400]], 'Being insurance paid in advance for the next year'),
];
export const J3_TOTAL = same(journal(J3).total, 3800 + 9000 + 4200 + 1800 + 5000 + 2400, 'J3 total');

// Opening entry: Tiruchi Dairy Mart, 1 April 2026
export const OPEN = {
  assets: [['Cash A/c', 25000], ['Bank A/c', 145000], ['Stock A/c', 80000], ['Gopal Rao A/c', 30000], ['Hema Iyer A/c', 20000], ['Furniture A/c', 55000], ['Machinery A/c', 240000]],
  liabilities: [['Ishwar Das A/c', 60000], ['Bank Loan A/c', 150000]],
};
OPEN.ta = sum(OPEN.assets.map(([, a]) => a));
OPEN.tl = sum(OPEN.liabilities.map(([, a]) => a));
OPEN.cap = same(OPEN.ta - OPEN.tl, 385000, 'opening capital as the balancing figure');
export const OPEN_ENTRY = [E('1 Apr 2026', OPEN.assets, [...OPEN.liabilities, ['Capital A/c', OPEN.cap]], 'Being assets, liabilities and capital brought forward at the start of the year')];
same(journal(OPEN_ENTRY).total, OPEN.ta, 'opening entry total');
export const OPEN_LIST = mdTable(['Item', 'Amount (₹)'], [
  ...OPEN.assets.map(([a, v]) => [a.replace(' A/c', '') + ' (asset)', inr(v)]),
  ...OPEN.liabilities.map(([a, v]) => [a.replace(' A/c', '') + ' (liability)', inr(v)]),
]);
