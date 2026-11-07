// Computed figures shared by the question bank and the decks of CBSE 11 Accountancy ch01. Every firm and person is
// imagined; every amount is computed here with acc.mjs and pinned with same(), then interpolated into text.
import { sum, same, check, inr, rs, whole, equation, mdTable, onSale } from './acc.mjs';

export const tot = (xs) => sum(xs.map((x) => x[1]));
export const pct = (amount, p, what) => whole((amount * p) / 100, what);

// ---------------------------------------------------------------- Meera Traders (imagined stationery business, Ranipur)
export const MT = {
  tangible: [['Land and building', 400000], ['Furniture', 60000], ['Computer', 40000]],
  intangible: [['Goodwill', 50000]],
  current: [['Stock', 80000], ['Debtors', 70000], ['Cash in hand', 30000], ['Cash at bank', 40000]],
  ncl: [['Bank loan repayable in five years', 200000]],
  cl: [['Creditors', 60000], ['Outstanding rent', 10000]],
};
MT.ncAssets = tot(MT.tangible) + tot(MT.intangible);
MT.cAssets = tot(MT.current);
MT.assets = MT.ncAssets + MT.cAssets;
MT.liabilities = tot(MT.ncl) + tot(MT.cl);
MT.capital = MT.assets - MT.liabilities;
same(tot(MT.tangible), 500000, 'MT tangible');
same(MT.ncAssets, 550000, 'MT non-current assets');
same(MT.cAssets, 220000, 'MT current assets');
same(MT.assets, 770000, 'MT assets');
same(tot(MT.cl), 70000, 'MT current liabilities');
same(MT.liabilities, 270000, 'MT liabilities');
same(MT.capital, 500000, 'MT capital');
export const mtRows = [
  ...MT.tangible.map(([n, a]) => [n, 'Non-current asset (tangible)', inr(a)]),
  ...MT.intangible.map(([n, a]) => [n, 'Non-current asset (intangible)', inr(a)]),
  ...MT.current.map(([n, a]) => [n, 'Current asset', inr(a)]),
  ...MT.ncl.map(([n, a]) => [n, 'Non-current liability', inr(a)]),
  ...MT.cl.map(([n, a]) => [n, 'Current liability', inr(a)]),
];

// Purchases and sales for the year (Meera Traders)
export const PS = { purchCash: 60000, purchCredit: 90000, purchReturn: 12000, saleCash: 100000, saleCredit: 140000, saleReturn: 15000, openStock: 25000, closeStock: 31000 };
PS.purchases = PS.purchCash + PS.purchCredit;
PS.netPurchases = PS.purchases - PS.purchReturn;
PS.sales = PS.saleCash + PS.saleCredit;
PS.netSales = PS.sales - PS.saleReturn;
same(PS.purchases, 150000, 'purchases');
same(PS.netPurchases, 138000, 'net purchases');
same(PS.sales, 240000, 'sales');
same(PS.netSales, 225000, 'net sales');
same(PS.closeStock - PS.openStock, 6000, 'stock increase');

// ---------------------------------------------------------------- Kaveri Bakery (imagined, Dhanpur)
export const KB = {
  items: [
    ['An oven bought for ' + rs(90000) + ' and meant to serve for ten years', 'Non-current asset (tangible)', 90000, 'A'],
    ['Rights to a recipe brand bought for ' + rs(60000), 'Non-current asset (intangible)', 60000, 'A'],
    ['Flour and sugar lying in the store room, worth ' + rs(25000), 'Current asset (stock)', 25000, 'A'],
    ['A bank loan of ' + rs(150000) + ' repayable after four years', 'Non-current liability', 150000, 'L'],
    ['Wages of ' + rs(8000) + ' due to staff and payable next week', 'Current liability', 8000, 'L'],
    ['A hotel owes ' + rs(12000) + ' for cakes bought on credit', 'Current asset (debtor)', 12000, 'A'],
    ['Cash of ' + rs(5000) + ' in the till', 'Current asset (cash)', 5000, 'A'],
  ],
};
KB.assets = sum(KB.items.filter((x) => x[3] === 'A').map((x) => x[2]));
KB.liabilities = sum(KB.items.filter((x) => x[3] === 'L').map((x) => x[2]));
KB.capital = KB.assets - KB.liabilities;
same(KB.assets, 192000, 'KB assets');
same(KB.liabilities, 158000, 'KB liabilities');
same(KB.capital, 34000, 'KB capital');

// Kaveri Bakery: one month's income and expenses, and the capital account for the month
export const KP = {
  income: [['Sale of cakes and bread', 180000], ['Commission received from a tea stall', 5000]],
  expense: [['Flour, sugar and butter used', 95000], ['Wages of bakers', 30000], ['Shop rent', 12000], ['Electricity', 8000]],
  openCapital: 300000, addCapital: 50000, drawings: 25000,
};
KP.income_ = tot(KP.income);
KP.expense_ = tot(KP.expense);
KP.profit = KP.income_ - KP.expense_;
KP.closeCapital = KP.openCapital + KP.addCapital + KP.profit - KP.drawings;
same(KP.income_, 185000, 'KP income');
same(KP.expense_, 145000, 'KP expense');
same(KP.profit, 40000, 'KP profit');
same(KP.closeCapital, 365000, 'KP closing capital');

// Capital and revenue expenditure (Kaveri Bakery)
export const CR = [
  ['Buying a delivery van for ' + rs(450000), 'Capital', 450000],
  ['Painting the shop walls, done every year, ' + rs(8000), 'Revenue', 8000],
  ['Repairs to the oven, ' + rs(3000), 'Revenue', 3000],
  ['Paying ' + rs(12000) + ' to install and fix a new mixing machine', 'Capital', 12000],
  ['Buying flour for the month, ' + rs(30000), 'Revenue', 30000],
  ['Buying a display counter for ' + rs(35000), 'Capital', 35000],
];
export const crRows = CR.map(([a, k]) => [a, k + ' expenditure']);
export const capSpend = sum(CR.filter((x) => x[1] === 'Capital').map((x) => x[2]));
export const revSpend = sum(CR.filter((x) => x[1] === 'Revenue').map((x) => x[2]));
same(capSpend, 497000, 'capital spend');
same(revSpend, 41000, 'revenue spend');

// ---------------------------------------------------------------- discounts
function bill(list, tradePct, cashPct) {
  const trade = pct(list, tradePct, 'trade discount');
  const invoice = list - trade;
  const cash = pct(invoice, cashPct, 'cash discount');
  return { list, tradePct, cashPct, trade, invoice, cash, paid: invoice - cash };
}
export const B1 = bill(50000, 10, 2); // Anand Sports
export const B2 = bill(80000, 15, 5); // Kiran Stores
export const B3 = bill(60000, 20, 3); // Hiral Electronics
same(B1.trade, 5000, 'B1 trade'); same(B1.invoice, 45000, 'B1 invoice'); same(B1.cash, 900, 'B1 cash'); same(B1.paid, 44100, 'B1 paid');
same(B2.trade, 12000, 'B2 trade'); same(B2.invoice, 68000, 'B2 invoice'); same(B2.cash, 3400, 'B2 cash'); same(B2.paid, 64600, 'B2 paid');
same(B3.trade, 12000, 'B3 trade'); same(B3.invoice, 48000, 'B3 invoice'); same(B3.cash, 1440, 'B3 cash'); same(B3.paid, 46560, 'B3 paid');
export const billRows = (b) => [
  ['List (catalogue) price', inr(b.list)],
  [`Less: trade discount at ${b.tradePct}%`, inr(b.trade)],
  ['Invoice amount (recorded in the books)', inr(b.invoice)],
  [`Less: cash discount at ${b.cashPct}% for prompt payment`, inr(b.cash)],
  ['Amount actually paid', inr(b.paid)],
];

// ---------------------------------------------------------------- debtors and creditors
export const DB = { sold: 18000, received: 6000 };
DB.owes = DB.sold - DB.received;
same(DB.owes, 12000, 'debtor balance');
export const CD = { bought: 40000, paid: 25000 };
CD.owes = CD.bought - CD.paid;
same(CD.owes, 15000, 'creditor balance');

// ---------------------------------------------------------------- gain and loss on sale of an asset
export const GL = { gain: onSale(12000, 15000), loss: onSale(20000, 14000) };
same(GL.gain, 3000, 'gain on computer');
same(GL.loss, -6000, 'loss on furniture');

// ---------------------------------------------------------------- Ishaan Cycles: capital, liabilities and drawings through the accounting equation
export const IC = equation({
  start: { assets: { Cash: 200000 }, liabilities: {}, capital: 200000 },
  steps: [
    { what: 'Bought furniture for cash', assets: { Cash: -50000, Furniture: 50000 } },
    { what: 'Bought goods on credit', assets: { Stock: 30000 }, liabilities: { Creditors: 30000 } },
    { what: 'Took a bank loan', assets: { Cash: 80000 }, liabilities: { Loan: 80000 } },
    { what: 'Owner withdrew cash', assets: { Cash: -10000 }, capital: -10000 },
  ],
});
same(IC.final.capital, 190000, 'IC capital');
same(IC.final.assets.Cash, 220000, 'IC cash');
same(sum(Object.values(IC.final.assets)), 300000, 'IC assets');
same(sum(Object.values(IC.final.liabilities)), 110000, 'IC liabilities');

export { sum, same, check, inr, rs, whole, mdTable };
