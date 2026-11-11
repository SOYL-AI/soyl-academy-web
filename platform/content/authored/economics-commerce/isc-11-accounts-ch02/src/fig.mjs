// Shared computed figures for ISC 11 Accounts ch02 (Accounting Concepts, Basis of Accounting and Standards).
// Every amount a slide, note or item states for the worked cases comes from here, computed with acc.mjs and
// asserted. Imagined firms only. No GST transactions anywhere (syllabus note).
import { same, check, sum, inr, rs, mdTable, equation } from './acc.mjs';

export { same, check, sum, inr, rs, mdTable, equation };

// ---------------------------------------------------------------- dual aspect: Lunglei Bamboo Works
const E = { cap: 200000, mach: 60000, goods: 45000, loan: 30000, paid: 15000, drawn: 8000, soldCost: 20000, soldFor: 26000 };
export const EQ = equation({
  start: { assets: { Cash: E.cap, Machinery: 0, Stock: 0 }, liabilities: { Creditors: 0, 'Bank loan': 0 }, capital: E.cap },
  steps: [
    { what: `Owner starts the firm with cash ${rs(E.cap)}` },
    { what: `Bought machinery for cash ${rs(E.mach)}`, assets: { Cash: -E.mach, Machinery: E.mach } },
    { what: `Bought goods on credit ${rs(E.goods)}`, assets: { Stock: E.goods }, liabilities: { Creditors: E.goods } },
    { what: `Took a bank loan in cash ${rs(E.loan)}`, assets: { Cash: E.loan }, liabilities: { 'Bank loan': E.loan } },
    { what: `Paid a creditor ${rs(E.paid)}`, assets: { Cash: -E.paid }, liabilities: { Creditors: -E.paid } },
    { what: `Owner withdrew cash ${rs(E.drawn)} for personal use`, assets: { Cash: -E.drawn }, capital: -E.drawn },
    { what: `Sold goods costing ${rs(E.soldCost)} for cash ${rs(E.soldFor)}`, assets: { Cash: E.soldFor, Stock: -E.soldCost }, capital: E.soldFor - E.soldCost },
  ],
});
export const EQF = EQ.final;
same(EQF.assets.Cash, 173000, 'EQ cash');
same(EQF.assets.Machinery, 60000, 'EQ machinery');
same(EQF.assets.Stock, 25000, 'EQ stock');
same(EQF.liabilities.Creditors, 30000, 'EQ creditors');
same(EQF.liabilities['Bank loan'], 30000, 'EQ loan');
same(EQF.capital, 198000, 'EQ capital');
export const EQ_ASSETS = same(sum(Object.values(EQF.assets)), 258000, 'EQ total assets');
export const EQ_OUTSIDE = sum(Object.values(EQF.liabilities));
same(EQ_OUTSIDE + EQF.capital, EQ_ASSETS, 'EQ both sides');
export const EQ_E = E;

// ---------------------------------------------------------------- historical cost: Kalahandi Millet Mart
export const HC = { cost: 1600000, market: 2000000 };
HC.gap = same(HC.market - HC.cost, 400000, 'unrecorded rise in building value');
HC.pct = same((HC.gap * 100) / HC.cost, 25, 'rise as per cent of cost');

// ---------------------------------------------------------------- matching: Theni Banana Chips, March 2027
export const MT = { sales: 240000, open: 40000, purch: 130000, close: 30000, wagesPaid: 22000, wagesDue: 6000, insPaid: 36000, insMonths: 12, power: 9000 };
MT.cogs = same(MT.open + MT.purch - MT.close, 140000, 'cost of goods sold');
MT.wages = same(MT.wagesPaid + MT.wagesDue, 28000, 'wages of the month');
MT.ins = same(MT.insPaid / MT.insMonths, 3000, 'insurance of the month');
MT.prepaid = same(MT.insPaid - MT.ins, 33000, 'insurance prepaid');
MT.exp = same(MT.cogs + MT.wages + MT.ins + MT.power, 180000, 'expenses of the month');
MT.profit = same(MT.sales - MT.exp, 60000, 'profit of the month');
MT.rows = [
  ['Revenue earned: sales of the month', inr(MT.sales)],
  [`Less: cost of goods sold (${inr(MT.open)} + ${inr(MT.purch)} − ${inr(MT.close)})`, inr(MT.cogs)],
  [`Less: wages (paid ${inr(MT.wagesPaid)} + due ${inr(MT.wagesDue)})`, inr(MT.wages)],
  [`Less: insurance of March only (${inr(MT.insPaid)} paid for ${MT.insMonths} months)`, inr(MT.ins)],
  ['Less: power', inr(MT.power)],
  ['**Profit of the month**', `**${inr(MT.profit)}**`],
];

// ---------------------------------------------------------------- stock at the lower of cost and net realisable value
export function lcnrv(items) {
  const rows = items.map(([n, cost, nrv]) => [n, inr(cost), inr(nrv), inr(Math.min(cost, nrv))]);
  const costT = sum(items.map(([, c]) => c));
  const nrvT = sum(items.map(([, , v]) => v));
  const total = sum(items.map(([, c, v]) => Math.min(c, v)));
  const t = { rows, costT, nrvT, total, writeDown: costT - total };
  check(t.writeDown >= 0 && total <= costT && total <= nrvT, 'lower of cost and NRV never exceeds either');
  return t;
}
export const LC = lcnrv([['Mixer grinders', 36000, 40000], ['Induction plates', 28000, 22000], ['Water purifiers', 45000, 52000], ['Hair dryers', 18000, 11000]]);
same(LC.costT, 127000, 'stock at cost');
same(LC.nrvT, 125000, 'stock at net realisable value');
same(LC.total, 114000, 'stock at lower of cost and net realisable value');
same(LC.writeDown, 13000, 'write down');
LC.rows.push(['**Total**', `**${inr(LC.costT)}**`, `**${inr(LC.nrvT)}**`, `**${inr(LC.total)}**`]);

// ---------------------------------------------------------------- cash basis and accrual basis
/**
 * One firm, one year. revenue = { name, cash, less: [[label, amt]], add: [[label, amt]] };
 * expenses = [{ name, paid, less, add }]. Accrual figure = cash figure − less + add. Returns the comparison rows,
 * the adjustment rows and every total, with the profits and their difference asserted.
 */
export function basis({ revenue, expenses }) {
  const accrual = (x) => x.base + sum((x.add ?? []).map(([, a]) => a)) - sum((x.less ?? []).map(([, a]) => a));
  const rev = { ...revenue, base: revenue.cash };
  rev.acc = accrual(rev);
  const exps = expenses.map((e) => ({ ...e, base: e.paid, acc: accrual({ ...e, base: e.paid }) }));
  const cashOut = sum(exps.map((e) => e.paid));
  const accOut = sum(exps.map((e) => e.acc));
  const cashProfit = revenue.cash - cashOut;
  const profit = rev.acc - accOut;
  check(rev.acc >= 0 && exps.every((e) => e.acc >= 0), 'accrual figures are not negative');
  // the difference between the two profits equals the net of every adjustment
  const net = (x) => sum((x.add ?? []).map(([, a]) => a)) - sum((x.less ?? []).map(([, a]) => a));
  same(profit - cashProfit, net(rev) - sum(exps.map(net)), 'profit difference equals the net of the adjustments');
  const rows = [
    [revenue.name, inr(revenue.cash), inr(rev.acc)],
    ...exps.map((e) => [e.name, inr(e.paid), inr(e.acc)]),
    ['**Total expenses**', `**${inr(cashOut)}**`, `**${inr(accOut)}**`],
    ['**Profit**', `**${inr(cashProfit)}**`, `**${inr(profit)}**`],
  ];
  const adj = (x, label) => [
    [`${label}: ${x.cash !== undefined ? 'received' : 'paid'} in cash`, inr(x.base)],
    ...(x.less ?? []).map(([l, a]) => [`Less: ${l}`, `(${inr(a)})`]),
    ...(x.add ?? []).map(([l, a]) => [`Add: ${l}`, inr(a)]),
    [`**${label} on the accrual basis**`, `**${inr(x.acc)}**`],
  ];
  const adjRows = [...adj(rev, revenue.name), ...exps.flatMap((e) => adj(e, e.name))];
  return { rev, exps, cashOut, accOut, cashProfit, profit, diff: cashProfit - profit, rows, adjRows, adjOf: (name) => [rev, ...exps].find((x) => x.name === name)?.acc };
}

// Pakyong Tuition Hub, year ended 31 March 2027
export const PT = basis({
  revenue: { name: 'Fees', cash: 540000, less: [['advance received for the next year', 40000], ['arrears of the last year received this year', 25000]], add: [['fees of this year still to be received', 30000]] },
  expenses: [
    { name: 'Rent', paid: 120000, less: [['rent paid in advance for the next year', 20000]] },
    { name: 'Salary', paid: 210000, less: [['salary of the last year paid this year', 15000]], add: [['salary of this year still unpaid', 18000]] },
    { name: 'Electricity', paid: 30000, add: [['electricity of this year still unpaid', 4000]] },
  ],
});
same(PT.cashOut, 360000, 'PT cash payments');
same(PT.cashProfit, 180000, 'PT cash profit');
same(PT.rev.acc, 505000, 'PT accrual revenue');
same(PT.adjOf('Rent'), 100000, 'PT accrual rent');
same(PT.adjOf('Salary'), 213000, 'PT accrual salary');
same(PT.adjOf('Electricity'), 34000, 'PT accrual electricity');
same(PT.accOut, 347000, 'PT accrual expenses');
same(PT.profit, 158000, 'PT accrual profit');
same(PT.diff, 22000, 'PT difference');
