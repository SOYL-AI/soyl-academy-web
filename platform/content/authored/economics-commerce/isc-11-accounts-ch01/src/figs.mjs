// Computed figures shared by the question bank and the decks of ISC 11 Accounts ch01 (Introduction to Accounting).
// Every firm and person is imagined. Every amount is computed here and pinned with same(), then interpolated into
// stems, tables, solutions and narration, so no figure is typed twice. Amounts are whole rupees.
import { sum, same, check, inr, rs } from './acc.mjs';

export const tot = (xs) => sum(xs.map((x) => x[1]));

// ---------------------------------------------------------------- Tezu Lemon Squash Works: classifying items (deck 2, t03)
// [item, amount, side (A asset, L liability), class]
export const TL = {
  rows: [
    ['Factory land on the edge of the town', 360000, 'A', 'Fixed asset, tangible'],
    ['Bottling machine', 140000, 'A', 'Fixed asset, tangible'],
    ['Registered trademark for the squash label', 45000, 'A', 'Fixed asset, intangible'],
    ['Bottles of squash ready for sale', 72000, 'A', 'Current asset'],
    ['Cash in the till', 8000, 'A', 'Current asset, liquid'],
    ['Balance in the savings account', 54000, 'A', 'Current asset, liquid'],
    ['Launch campaign cost not yet written off', 30000, 'A', 'Fictitious asset'],
    ['Loan from a cooperative bank, repayable in five years', 250000, 'L', 'External, long-term liability'],
    ['Amount due to the lemon growers', 61000, 'L', 'External, current liability'],
    ['Wages payable to workers', 9000, 'L', 'External, current liability'],
    ['Compensation claimed by a customer, court case not decided', 25000, 'C', 'Contingent liability (not counted)'],
  ],
};
TL.assets = sum(TL.rows.filter((r) => r[2] === 'A').map((r) => r[1]));
TL.ext = sum(TL.rows.filter((r) => r[2] === 'L').map((r) => r[1]));
TL.contingent = sum(TL.rows.filter((r) => r[2] === 'C').map((r) => r[1]));
TL.capital = TL.assets - TL.ext;
TL.fixed = 360000 + 140000 + 45000;
TL.liquid = 8000 + 54000;
same(TL.assets, 709000, 'TL assets');
same(TL.ext, 320000, 'TL external liabilities');
same(TL.capital, 389000, 'TL capital');
same(TL.fixed, 545000, 'TL fixed assets');

// ---------------------------------------------------------------- Bhuj Embroidery House: capital (deck 2, t03)
export const BE = {
  assets: [
    ['Workshop shed', 480000, 'Fixed, tangible'],
    ['Embroidery machines', 125000, 'Fixed, tangible'],
    ['Design software licence', 35000, 'Fixed, intangible'],
    ['Finished embroidered stock', 96000, 'Current'],
    ['Debtors', 58000, 'Current'],
    ['Cash in hand', 12000, 'Current, liquid'],
    ['Bank balance', 104000, 'Current, liquid'],
    ['Preliminary expenses not yet written off', 15000, 'Fictitious'],
  ],
  liab: [
    ['Loan repayable in eight years', 250000, 'Long-term'],
    ['Creditors', 82000, 'Current'],
    ['Outstanding rent', 9000, 'Current'],
  ],
};
BE.totalAssets = tot(BE.assets);
BE.totalLiab = tot(BE.liab);
BE.capital = BE.totalAssets - BE.totalLiab;
BE.current = 96000 + 58000 + 12000 + 104000;
BE.currentLiab = 82000 + 9000;
BE.withoutFict = BE.totalAssets - 15000;
same(BE.totalAssets, 925000, 'BE assets');
same(BE.totalLiab, 341000, 'BE liabilities');
same(BE.capital, 584000, 'BE capital');
same(BE.current, 270000, 'BE current assets');
same(BE.currentLiab, 91000, 'BE current liabilities');

// ---------------------------------------------------------------- Raichur Cotton Ginners: profit and capital (deck 1, t02)
export const RG = {
  sales: 960000, salesReturn: 30000,
  otherIncome: [['Interest received', 14000], ['Commission earned', 22000]],
  expenses: [['Cost of goods sold', 610000], ['Wages', 105000], ['Rent', 48000], ['Electricity', 21000], ['Advertisement', 12000]],
  pressBook: 40000, pressSold: 46500, theft: 8000,
  openCapital: 520000, addCapital: 50000, drawings: 72000,
};
RG.revenue = RG.sales - RG.salesReturn;
RG.otherInc = tot(RG.otherIncome);
RG.income = RG.revenue + RG.otherInc;
RG.expense = tot(RG.expenses);
RG.profit = RG.income - RG.expense;
RG.gain = RG.pressSold - RG.pressBook;
RG.netProfit = RG.profit + RG.gain - RG.theft;
RG.closeCapital = RG.openCapital + RG.addCapital + RG.netProfit - RG.drawings;
same(RG.revenue, 930000, 'RG revenue');
same(RG.otherInc, 36000, 'RG other income');
same(RG.income, 966000, 'RG income');
same(RG.expense, 796000, 'RG expenses');
same(RG.profit, 170000, 'RG profit');
same(RG.gain, 6500, 'RG gain');
same(RG.netProfit, 168500, 'RG net profit');
same(RG.closeCapital, 666500, 'RG closing capital');

// ---------------------------------------------------------------- Alwar Mustard Oil Mill: kinds of stock (deck 2, t04)
export const AM = {
  rows: [
    ['Mustard seed in the godown', 'Raw material', 240000, 285000],
    ['Seed in the crushers and oil in the settling tanks', 'Work in progress', 36000, 42000],
    ['Sealed oil tins ready for dispatch', 'Finished goods', 124000, 98000],
  ],
};
AM.open = sum(AM.rows.map((r) => r[2]));
AM.close = sum(AM.rows.map((r) => r[3]));
AM.change = AM.close - AM.open;
same(AM.open, 400000, 'AM opening stock');
same(AM.close, 425000, 'AM closing stock');

// ---------------------------------------------------------------- Pathankot Hosiery: closing stock from a flow (deck 2, t04)
export const PH = { open: 85000, purchases: 640000, purchReturn: 25000, cogs: 618000 };
PH.netPurchases = PH.purchases - PH.purchReturn;
PH.available = PH.open + PH.netPurchases;
PH.close = PH.available - PH.cogs;
same(PH.netPurchases, 615000, 'PH net purchases');
same(PH.available, 700000, 'PH goods available');
same(PH.close, 82000, 'PH closing stock');

// ---------------------------------------------------------------- Kasganj Brass Bells: debtors and creditors (deck 2, t04)
export const KG = {
  soldCredit: 80000, boughtCredit: 120000, machineCredit: 14000, cashSale: 30000, received: 50000, paid: 70000,
};
KG.debtor = KG.soldCredit - KG.received;
KG.creditor = KG.boughtCredit - KG.paid;
same(KG.debtor, 30000, 'KG debtor');
same(KG.creditor, 50000, 'KG creditor');

// ---------------------------------------------------------------- Nagaon Silk Cocoons: events and transactions (deck 1, t02)
export const NS = {
  rows: [
    ['A weaver telephones to ask the price of cocoons', 'Event only', 'No money value has been exchanged'],
    ['The owner decides to hire a supervisor from next month', 'Event only', 'Nothing has been paid or promised in money yet'],
    ['Cocoons of ₹90,000 are bought from a farm group, payment due in 30 days', 'Credit transaction', 'Value received, payment later'],
    ['Silk yarn is sold for ₹45,000 and the money is taken at once', 'Cash transaction', 'Value and payment exchanged together'],
    ['The electricity bill of ₹6,500 is paid', 'Cash transaction', 'Payment made for a service used'],
    ['A buyer gives ₹20,000 in advance for a future order', 'Cash transaction', 'Money received, goods to be sent later'],
  ],
};

// ---------------------------------------------------------------- Sirsa Handloom Stores: stages of the accounting cycle (deck 1, t01)
export const SH = {
  rows: [
    ['Her helper notes that a bulk order has been placed and that it can be written in money', 'Identifying'],
    ['Each bill is written in the day book in date order', 'Recording'],
    ['Entries are sorted into accounts such as Sales, Rent and each customer', 'Classifying'],
    ['A trial balance and the year-end statements are prepared', 'Summarising'],
    ['She finds that wages have grown faster than sales and asks why', 'Analysing and interpreting'],
    ['The statements are sent to the bank for a loan request', 'Communicating'],
  ],
};

export const CYCLE = ['Identifying and measuring', 'Recording', 'Classifying', 'Summarising', 'Analysing and interpreting', 'Communicating'];
check(CYCLE.length === 6, 'six stages');

export { inr, rs };
