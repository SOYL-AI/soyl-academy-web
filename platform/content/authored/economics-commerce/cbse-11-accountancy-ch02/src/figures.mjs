// Shared computed figures for CBSE 11 Accountancy ch02 (Theory Base of Accounting). Every amount a slide, note or
// item states for the worked cases comes from here, computed with acc.mjs and asserted. Imagined firms only.
import { same, check, sum, inr, rs, mdTable, equation, gst } from '../../cbse-11-accountancy-ch01/src/acc.mjs';

export { same, check, sum, inr, rs, mdTable, gst, equation };

// ---------------------------------------------------------------- dual aspect (Tara Stationers)
const E = { cash: 150000, furn: 40000, goods: 30000, loan: 20000, paid: 10000, drawn: 5000 };
export const EQ = equation({
  start: { assets: { Cash: E.cash, Furniture: 0, Stock: 0 }, liabilities: { Creditors: 0, 'Bank loan': 0 }, capital: E.cash },
  steps: [
    { what: 'Owner starts with cash', assets: {}, liabilities: {} },
    { what: `Bought furniture for cash ${rs(E.furn)}`, assets: { Cash: -E.furn, Furniture: E.furn } },
    { what: `Bought goods on credit ${rs(E.goods)}`, assets: { Stock: E.goods }, liabilities: { Creditors: E.goods } },
    { what: `Took a bank loan ${rs(E.loan)}`, assets: { Cash: E.loan }, liabilities: { 'Bank loan': E.loan } },
    { what: `Paid a creditor ${rs(E.paid)}`, assets: { Cash: -E.paid }, liabilities: { Creditors: -E.paid } },
    { what: `Owner took cash ${rs(E.drawn)} for personal use`, assets: { Cash: -E.drawn }, capital: -E.drawn },
  ],
});
export const EQF = EQ.final;
same(EQF.assets.Cash, 115000, 'EQ cash');
same(EQF.assets.Furniture + EQF.assets.Stock, 70000, 'EQ furniture and stock');
same(EQF.liabilities.Creditors, 20000, 'EQ creditors');
same(EQF.liabilities['Bank loan'], 20000, 'EQ loan');
same(EQF.capital, 145000, 'EQ capital');
export const EQ_ASSETS = sum(Object.values(EQF.assets));
same(EQ_ASSETS, 185000, 'EQ total assets');
export const EQ_OUTSIDE = sum(Object.values(EQF.liabilities));
same(EQ_OUTSIDE + EQF.capital, EQ_ASSETS, 'EQ both sides');

// ---------------------------------------------------------------- historical cost versus market value (Kaveri Printers)
export const HC = { cost: 1800000, market: 2700000 };
HC.gap = same(HC.market - HC.cost, 900000, 'unrecorded rise in land value');
HC.pct = same((HC.gap * 100) / HC.cost, 50, 'rise as per cent of cost');

// ---------------------------------------------------------------- matching: Anjali Tailors, October 2026
export const MT = { sales: 120000, open: 20000, purch: 62000, close: 12000, salPaid: 12000, salDue: 3000, rentPaid: 16000, rentMonths: 2, elec: 2000 };
MT.cogs = same(MT.open + MT.purch - MT.close, 70000, 'cost of goods sold');
MT.sal = same(MT.salPaid + MT.salDue, 15000, 'salary of the month');
MT.rent = same(MT.rentPaid / MT.rentMonths, 8000, 'rent of the month');
MT.prepaid = same(MT.rentPaid - MT.rent, 8000, 'rent prepaid');
MT.exp = same(MT.cogs + MT.sal + MT.rent + MT.elec, 95000, 'expenses of the month');
MT.profit = same(MT.sales - MT.exp, 25000, 'profit of the month');
MT.rows = [
  ['Revenue earned: sales of the month', inr(MT.sales)],
  [`Less: cost of goods sold (${inr(MT.open)} + ${inr(MT.purch)} − ${inr(MT.close)})`, inr(MT.cogs)],
  [`Less: salaries (paid ${inr(MT.salPaid)} + due ${inr(MT.salDue)})`, inr(MT.sal)],
  [`Less: rent of October only (${inr(MT.rentPaid)} paid for ${MT.rentMonths} months)`, inr(MT.rent)],
  ['Less: electricity', inr(MT.elec)],
  ['**Profit of the month**', `**${inr(MT.profit)}**`],
];

// ---------------------------------------------------------------- cash versus accrual: Meghna Coaching Classes, October 2026
export const CA = { recd: 90000, advance: 20000, arrears: 15000, due: 12000, rentPaid: 24000, rentMonths: 3, salPaid: 30000, salPrior: 6000, salDue: 7000, elec: 3000 };
CA.cashIn = CA.recd;
CA.cashOut = same(CA.rentPaid + CA.salPaid + CA.elec, 57000, 'cash payments');
CA.cashProfit = same(CA.cashIn - CA.cashOut, 33000, 'cash basis profit');
CA.rev = same(CA.recd - CA.advance - CA.arrears + CA.due, 67000, 'accrual revenue');
CA.rent = same(CA.rentPaid / CA.rentMonths, 8000, 'accrual rent');
CA.sal = same(CA.salPaid - CA.salPrior + CA.salDue, 31000, 'accrual salary');
CA.exp = same(CA.rent + CA.sal + CA.elec, 42000, 'accrual expenses');
CA.profit = same(CA.rev - CA.exp, 25000, 'accrual profit');
CA.diff = same(CA.cashProfit - CA.profit, 8000, 'difference between the bases');
CA.rows = [
  ['Fees', inr(CA.cashIn), inr(CA.rev)],
  ['Rent', inr(CA.rentPaid), inr(CA.rent)],
  ['Salary', inr(CA.salPaid), inr(CA.sal)],
  ['Electricity', inr(CA.elec), inr(CA.elec)],
  ['**Total expenses**', `**${inr(CA.cashOut)}**`, `**${inr(CA.exp)}**`],
  ['**Profit**', `**${inr(CA.cashProfit)}**`, `**${inr(CA.profit)}**`],
];
CA.revRows = [
  ['Fees received in cash', inr(CA.recd)],
  ['Less: advance received for November', `(${inr(CA.advance)})`],
  ['Less: arrears of September received now', `(${inr(CA.arrears)})`],
  ['Add: fees of October still to be received', inr(CA.due)],
  ['**Revenue of October**', `**${inr(CA.rev)}**`],
];
CA.expRows = [
  [`Rent: ${inr(CA.rentPaid)} paid covers ${CA.rentMonths} months`, inr(CA.rent)],
  [`Salary: ${inr(CA.salPaid)} paid, less ${inr(CA.salPrior)} of September, add ${inr(CA.salDue)} due`, inr(CA.sal)],
  ['Electricity of October', inr(CA.elec)],
  ['**Expenses of October**', `**${inr(CA.exp)}**`],
];

// ---------------------------------------------------------------- conservatism: Sagar Electricals closing stock
export function lcnrv(items) {
  const rows = items.map(([n, cost, nrv]) => [n, inr(cost), inr(nrv), inr(Math.min(cost, nrv))]);
  const costT = sum(items.map(([, c]) => c));
  const nrvT = sum(items.map(([, , v]) => v));
  const total = sum(items.map(([, c, v]) => Math.min(c, v)));
  return { rows, costT, nrvT, total, writeDown: costT - total };
}
export const LC = lcnrv([['Ceiling fans', 40000, 46000], ['Room heaters', 30000, 24000], ['Air coolers', 50000, 55000], ['Electric irons', 20000, 12000]]);
same(LC.costT, 140000, 'stock at cost');
same(LC.nrvT, 137000, 'stock at net realisable value');
same(LC.total, 126000, 'stock at lower of cost and net realisable value');
same(LC.writeDown, 14000, 'write down');
LC.rows.push(['**Total**', `**${inr(LC.costT)}**`, `**${inr(LC.nrvT)}**`, `**${inr(LC.total)}**`]);

// ---------------------------------------------------------------- GST (imagined rate 12%): Dev Hardware, Jaipur
export const GS = { rate: 12, buy: 100000, sell: 150000, interSell: 200000, interBuy: 80000 };
GS.in = gst(GS.buy, GS.rate);
GS.out = gst(GS.sell, GS.rate);
GS.inter = gst(GS.interSell, GS.rate, { interState: true });
GS.interIn = gst(GS.interBuy, GS.rate, { interState: true });
same(GS.in.tax, 12000, 'input tax');
same(GS.in.cgst, 6000, 'input CGST');
same(GS.out.tax, 18000, 'output tax');
same(GS.out.cgst, 9000, 'output CGST');
same(GS.inter.igst, 24000, 'IGST on the inter-state sale');
same(GS.interIn.igst, 9600, 'IGST on the inter-state purchase');
GS.cgstPay = same(GS.out.cgst - GS.in.cgst, 3000, 'CGST payable');
GS.sgstPay = same(GS.out.sgst - GS.in.sgst, 3000, 'SGST payable');
GS.net = same(GS.out.tax - GS.in.tax, 6000, 'net tax payable');
same(GS.cgstPay + GS.sgstPay, GS.net, 'net tax in two parts');
GS.invBuy = GS.buy + GS.in.tax;
GS.invSell = GS.sell + GS.out.tax;
GS.invInter = GS.interSell + GS.inter.igst;
same(GS.invBuy, 112000, 'purchase invoice');
same(GS.invSell, 168000, 'sale invoice');
same(GS.invInter, 224000, 'inter-state invoice');
