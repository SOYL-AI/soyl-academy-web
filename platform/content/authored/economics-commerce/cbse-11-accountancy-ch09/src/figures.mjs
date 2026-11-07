// Computed, asserted figures for CBSE 11 Accountancy ch09 Financial Statements II. Every firm is imagined.
// One trial balance per firm; adjFinals() (adj.mjs) applies every adjustment in its two places and asserts that the
// statements agree and that every trial balance item is used exactly once.
import { adjFinals, impact, debtsCalc, commissionOn, pctOf, pcw, sum, check, same, whole, inr, rs, words, rupees, mdTable, journal, ledger, T } from './adj.mjs';
export { adjFinals, impact, debtsCalc, commissionOn, pctOf, pcw, sum, check, same, whole, inr, rs, words, rupees, mdTable, journal, ledger, T };

/** Nisha Crafts: the main example, eight adjustments, closing stock outside the trial balance. */
export const NC_SPEC = {
  firm: 'Nisha Crafts', date: '31 March 2026', closing: 90000,
  lines: [
    ['Opening stock', 60000, 'os'], ['Purchases', 520000, 'pur'], ['Sales returns', 8000, 'sret'], ['Wages', 40000, 'dexp'], ['Carriage inwards', 10000, 'dexp'],
    ['Salaries', 72000, 'iexp'], ['Insurance', 12000, 'iexp'], ['Bad debts', 3000, 'bd'], ['Drawings', 48000, 'draw'],
    ['Machinery', 200000, 'fa'], ['Furniture', 50000, 'fa'], ['Debtors', 120000, 'deb'], ['Cash at bank', 45000, 'ca'],
    ['Sales', 700000, 'sale'], ['Purchases returns', 12000, 'pret'], ['Commission received', 18000, 'inc'], ['Creditors', 70000, 'cl'],
    ['Provision for doubtful debts', 5000, 'pdd'], ['Capital', null, 'cap'],
  ],
  adj: [
    { id: 'out', k: 'out', on: 'Wages', amt: 4000 },
    { id: 'pre', k: 'pre', on: 'Insurance', amt: 3000 },
    { id: 'acc', k: 'acc', on: 'Commission received', amt: 2000 },
    { id: 'dep', k: 'dep', on: 'Machinery', pct: 10 },
    { id: 'debts', k: 'debts', further: 4000, pddPct: 5 },
    { id: 'intcap', k: 'intcap', pct: 5 },
    { id: 'goods', k: 'goods', amt: 6000 },
  ],
};
export const NC = adjFinals(NC_SPEC);
export const NC_IMPACT = impact(NC_SPEC);

/** Qadir Cycles: the manager's commission on net profit before charging it, and (same trial balance) after charging it. */
export const QC_SPEC = {
  firm: 'Qadir Cycles', date: '31 March 2026', closing: 70000,
  lines: [
    ['Opening stock', 50000, 'os'], ['Purchases', 400000, 'pur'], ['Wages', 39000, 'dexp'], ['Salaries', 60000, 'iexp'], ['Rent', 24000, 'iexp'], ['Drawings', 40000, 'draw'],
    ['Machinery', 150000, 'fa'], ['Furniture', 40000, 'fa'], ['Debtors', 90000, 'deb'], ['Cash in hand', 15000, 'ca'],
    ['Sales', 640000, 'sale'], ['Rent received', 12000, 'inc'], ['Creditors', 55000, 'cl'], ['Capital', null, 'cap'],
  ],
  adj: [
    { id: 'out', k: 'out', on: 'Salaries', amt: 5000 },
    { id: 'pre', k: 'pre', on: 'Rent', amt: 4000 },
    { id: 'adv', k: 'adv', on: 'Rent received', amt: 3000 },
    { id: 'dep', k: 'dep', on: 'Machinery', pct: 10 },
    { id: 'goods', k: 'goods', amt: 2000 },
  ],
};
export const QC0 = adjFinals(QC_SPEC);
export const QCb = adjFinals({ ...QC_SPEC, adj: [...QC_SPEC.adj, { id: 'mgr', k: 'mgr', pct: 10, basis: 'before' }] });
export const QCa = adjFinals({ ...QC_SPEC, adj: [...QC_SPEC.adj, { id: 'mgr', k: 'mgr', pct: 10, basis: 'after' }] });

/** Rani Kitchenware: abnormal loss by fire with an insurance claim, both interests, both provisions, depreciation. */
export const RK_SPEC = {
  firm: 'Rani Kitchenware', date: '31 March 2026', closing: 55000,
  lines: [
    ['Opening stock', 40000, 'os'], ['Purchases', 300000, 'pur'], ['Carriage inwards', 8000, 'dexp'], ['Salaries', 48000, 'iexp'], ['Advertising', 14000, 'iexp'], ['Drawings', 36000, 'draw'],
    ['Furniture', 60000, 'fa'], ['Plant', 120000, 'fa'], ['Debtors', 70000, 'deb'], ['Cash at bank', 25000, 'ca'],
    ['Sales', 480000, 'sale'], ['Discount received', 4000, 'inc'], ['Creditors', 40000, 'cl'], ['Capital', null, 'cap'],
  ],
  adj: [
    { id: 'out', k: 'out', on: 'Salaries', amt: 4000 },
    { id: 'dep', k: 'dep', on: 'Plant', pct: 10 },
    { id: 'debts', k: 'debts', further: 2000, pddPct: 5, discPct: 2 },
    { id: 'intcap', k: 'intcap', pct: 6 },
    { id: 'intdraw', k: 'intdraw', pct: 5 },
    { id: 'loss', k: 'loss', amt: 12000, claim: 9000 },
  ],
};
export const RK = adjFinals(RK_SPEC);

/** Suhana Stores: the trial balance was drawn up after the Trading Account, so it carries the gross profit and the closing stock. */
export const SS_SPEC = {
  firm: 'Suhana Stores', date: '31 March 2026', closing: null,
  lines: [
    ['Closing stock', 70000, 'cs'], ['Salaries', 48000, 'iexp'], ['Rent', 24000, 'iexp'], ['Bad debts', 2000, 'bd'], ['Drawings', 30000, 'draw'],
    ['Furniture', 40000, 'fa'], ['Debtors', 60000, 'deb'], ['Cash in hand', 20000, 'ca'],
    ['Gross profit', 160000, 'gp'], ['Provision for doubtful debts', 3000, 'pdd'], ['Creditors', 25000, 'cl'], ['Capital', null, 'cap'],
  ],
  adj: [
    { id: 'out', k: 'out', on: 'Salaries', amt: 6000 },
    { id: 'pre', k: 'pre', on: 'Rent', amt: 2000 },
    { id: 'dep', k: 'dep', on: 'Furniture', pct: 10 },
    { id: 'debts', k: 'debts', further: 3000, pddPct: 5 },
    { id: 'intcap', k: 'intcap', pct: 5 },
  ],
};
export const SS = adjFinals(SS_SPEC);

/** Imagined firm for the provision-account items: new provision with no old one; and old provision kept. */
export const D1 = debtsCalc({ debtors: 80000, bdTB: 2000, further: 3000, pddPct: 5 });
export const D2 = debtsCalc({ debtors: 120000, bdTB: 4000, further: 6000, oldPdd: 8000, pddPct: 5, discPct: 2 });

export const sgn = (x) => (x === 0 ? 'no change' : `${x > 0 ? '+' : '−'}${inr(Math.abs(x))}`);
export const list = (pairs) => pairs.map(([a, x]) => `${a} ${rs(x)}`).join(', ');
/** Trial balance lines as a prose list for a stem. */
export const tbText = (f) => list(f.L.map((l) => [l.name, l.amt]));
