// Build ISC 12 Accounts ch12 Ratio Analysis. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, qid, Svg } from './lib.mjs';

setUnit('isc-12-accounts-ch12', 'economics-commerce');
const { fig, rs, rupees, words, spoken, check, avg, pctOf, ratio, times, pct, eps, pe, show, pin, effects, labelled, delta, EFFECT_WORD, position, positionRows, posRatios, trading, results, resultRows, F } = await import('./acc.mjs');
const { FACTS, BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- the case company: Mohiniyattam Coir Ltd (imagined, Vaikom)
const MO = position({
  sc: 1350000, rs: 450000, ltb: 600000, ltp: 120000, tp: 300000, ocl: 60000, stp: 140000,
  ppe: 1720000, intang: 100000, nci: 200000, ci: 40000, inv: 400000, tr: 440000, cce: 100000, prepaid: 20000,
  lab: { sc: 'Share capital (equity ₹12,00,000; 10% preference ₹1,50,000)', ltb: '10% Debentures', ltp: 'Long-term provisions (gratuity)', nci: '10% Non-current investments' },
});
check(MO.total === 3020000 && MO.ca === 1000000 && MO.cl === 500000 && MO.quick === 580000 && MO.ce === 2520000 && MO.nca + MO.wc === MO.ce && MO.total - MO.cl === MO.ce, 'Mohiniyattam position');
const R = posRatios(MO);
pin(R.current, 2, 'Mohiniyattam current'); pin(R.quick, 1.16, 'Mohiniyattam quick'); pin(R.de, 0.4, 'Mohiniyattam debt-equity'); pin(R.dta, 0.24, 'Mohiniyattam debt to total assets'); pin(R.prop, 0.6, 'Mohiniyattam proprietary');
check(!R.dta.exact && !R.prop.exact, 'rounded solvency examples');
const MO_T = trading({ rev: 5000000, open: 350000, purchases: 3600000, direct: 200000, close: 400000 });
check(MO_T.close === MO.inv && MO_T.cost === 3750000, 'Mohiniyattam trading');
const MO_X = results({ rev: MO_T.rev, cost: MO_T.cost, opex: [['Employee benefits expense', 300000], ['Depreciation and amortisation', 150000], ['Other operating expenses', 250000]], oi: [['Interest on non-current investments', pctOf(10, MO.nci)]], nonop: [['Loss on sale of furniture', 10000]], interest: pctOf(10, MO.ltb), taxRate: 25 });
check(MO_X.pbit === 560000 && MO_X.pbt === 500000 && MO_X.pat === 375000, 'Mohiniyattam results');
const MO_C = { credit: 4200000, trOpen: 360000, crPur: 3000000, tpOpen: 200000, shares: 120000, prefCap: 150000, mps: 36 };
check(MO_C.shares * 10 + MO_C.prefCap === MO.sc, 'Mohiniyattam share capital');
const avgTR = avg(MO_C.trOpen, MO.tr);
const avgTP = avg(MO_C.tpOpen, MO.tp);
const MO_pd = pctOf(10, MO_C.prefCap);
const MO_icr = pin(times(MO_X.pbit, MO_X.interest), 9.33, 'Mohiniyattam interest coverage');
const MO_itr = pin(times(MO_T.cost, MO_T.avgInv), 10, 'Mohiniyattam inventory turnover');
const MO_trt = pin(times(MO_C.credit, avgTR), 10.5, 'Mohiniyattam receivables turnover');
const MO_tpt = pin(times(MO_C.crPur, avgTP), 12, 'Mohiniyattam payables turnover');
const MO_wct = pin(times(MO_T.rev, MO.wc), 10, 'Mohiniyattam working capital turnover');
const MO_gp = pin(pct(MO_X.gp, MO_X.rev), 25, 'Mohiniyattam gross profit');
const MO_or = pin(pct(MO_X.opCost, MO_X.rev), 89, 'Mohiniyattam operating ratio');
const MO_opr = pin(pct(MO_X.opProfit, MO_X.rev), 11, 'Mohiniyattam operating profit ratio');
const MO_npr = pin(pct(MO_X.pat, MO_X.rev), 7.5, 'Mohiniyattam net profit ratio');
const MO_eps = pin(eps(MO_X.pat - MO_pd, MO_C.shares), 3, 'Mohiniyattam earnings per share');
const MO_pe = pin(pe(MO_C.mps, MO_eps), 12, 'Mohiniyattam price-earnings');
const MO_roi = pin(pct(MO_X.pbit, MO.ce), 22.22, 'Mohiniyattam return on investment');
check(MO_or.v + MO_opr.v === 100 && !MO_icr.exact && !MO_roi.exact, 'Mohiniyattam checks');
const per100 = { cost: (MO_X.cost * 100) / MO_X.rev, opex: (MO_X.opexT * 100) / MO_X.rev, op: (MO_X.opProfit * 100) / MO_X.rev };
check(Object.values(per100).every(Number.isInteger) && per100.cost + per100.opex + per100.op === 100, 'per hundred');

// Effects of five transactions on Mohiniyattam's current and quick ratios (each taken separately).
const T5 = [
  [`(i) Pays trade payables ${rs(100000)}`, -100000, -100000, -100000, 'increase', 'increase'],
  [`(ii) Buys coir yarn for ${rs(50000)} in cash`, 0, -50000, 0, 'no change', 'decrease'],
  [`(iii) Buys coir yarn on credit for ${rs(100000)}`, 100000, 0, 100000, 'decrease', 'decrease'],
  [`(iv) Sells mats costing ₹40,000 for ${rs(50000)} in cash`, 10000, 50000, 0, 'increase', 'increase'],
  [`(v) Raises a long-term loan of ${rs(200000)}`, 200000, 200000, 0, 'increase', 'increase'],
];
const EFF_C = labelled(effects('ratio', [MO.ca, MO.cl], T5.map(([l, dca, , dcl, e]) => [l, dca, dcl, e])), [100000, 50000, 100000, 50000, 200000]);
const EFF_Q = effects('ratio', [MO.quick, MO.cl], T5.map(([l, , dqa, dcl, , e]) => [l, dqa, dcl, e]));
pin(EFF_C.rows[0].after, 2.25, 'eff C i'); pin(EFF_C.rows[2].after, 1.83, 'eff C iii'); pin(EFF_C.rows[3].after, 2.02, 'eff C iv'); pin(EFF_C.rows[4].after, 2.4, 'eff C v');
pin(EFF_Q.rows[0].after, 1.2, 'eff Q i'); pin(EFF_Q.rows[1].after, 1.06, 'eff Q ii'); pin(EFF_Q.rows[2].after, 0.97, 'eff Q iii'); pin(EFF_Q.rows[3].after, 1.26, 'eff Q iv'); pin(EFF_Q.rows[4].after, 1.56, 'eff Q v');
// Effects on the debt-equity ratio.
const EFF_D = labelled(effects('ratio', [MO.debt, MO.sf], [
  [`(i) Issues equity shares for ${rs(200000)} in cash`, 0, 200000, 'decrease'],
  [`(ii) Raises a long-term loan of ${rs(180000)}`, 180000, 0, 'increase'],
  [`(iii) Redeems debentures of ${rs(120000)} in cash`, -120000, 0, 'decrease'],
  [`(iv) Issues bonus shares of ${rs(300000)} from the general reserve`, 0, 0, 'no change'],
  [`(v) Pays a dividend of ${rs(150000)}`, 0, -150000, 'increase'],
]), [200000, 180000, 120000, 0, 150000]);
pin(EFF_D.rows[0].after, 0.36, 'eff D i'); pin(EFF_D.rows[1].after, 0.5, 'eff D ii'); pin(EFF_D.rows[2].after, 0.33, 'eff D iii'); pin(EFF_D.rows[4].after, 0.44, 'eff D v');

// Worked example 4: missing liquidity figures for Gotipua Brassware Ltd (imagined, Pipili).
const GO = { crT: 3, qrT: 18, wc: 400000, prepaid: 20000 };
GO.cl = GO.wc / (GO.crT - 1);
GO.ca = GO.cl * GO.crT;
GO.qa = (GO.cl * GO.qrT) / 10;
GO.inv = GO.ca - GO.qa - GO.prepaid;
check([GO.cl, GO.ca, GO.qa, GO.inv].every(Number.isInteger) && GO.cl === 200000 && GO.inv === 220000, 'Gotipua figures');
const GO_cr = pin(ratio(GO.ca, GO.cl), 3, 'Gotipua current');
const GO_qr = pin(ratio(GO.qa, GO.cl), 1.8, 'Gotipua quick');

// Worked example 9: missing profitability figures for Kathak Attar Ltd (imagined, Jaunpur).
const KA = { pe: 15, mps: 45, shares: 200000, pd: 40000, npPct: 8 };
KA.eps = KA.mps / KA.pe;
KA.earn = KA.eps * KA.shares;
KA.pat = KA.earn + KA.pd;
KA.rev = (KA.pat * 100) / KA.npPct;
check([KA.eps, KA.earn, KA.pat, KA.rev].every(Number.isInteger) && KA.rev === 8000000, 'Kathak figures');
const KA_eps = pin(eps(KA.earn, KA.shares), 3, 'Kathak EPS');
pin(pe(KA.mps, KA_eps), KA.pe, 'Kathak P/E recomputed');
pin(pct(KA.pat, KA.rev), KA.npPct, 'Kathak net profit recomputed');

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['What a ratio is', 'The four ISC groups', 'Current and quick ratios', 'Effects on liquidity', 'Solvency ratios', 'Effects on debt-equity', 'Missing figures'], 'Route map of Part 1: what a ratio is, the four groups, current and quick ratios, effects of transactions on them, solvency ratios, effects on the debt-equity ratio and missing figures', 'Part 1 at a glance');
const vForms = table(
  ['Form', 'Example (Mohiniyattam Coir)', 'Used for'],
  [
    ['Pure ratio (x : 1)', `Current ratio ${R.current.s}`, 'Liquidity and solvency ratios'],
    ['Times', `Inventory turnover ${MO_itr.s}`, 'Activity ratios, interest coverage, price-earnings'],
    ['Percentage', `Gross profit ratio ${MO_gp.s}`, 'Profitability ratios'],
    ['Rupees per share', `Earnings per share ${MO_eps.s}`, 'Earnings per share'],
  ],
  'Table of the forms in which ratios are expressed: a pure ratio such as two to one, times such as ten times, a percentage such as twenty-five per cent, and rupees per share such as three rupees of earnings per share',
  'Rounding rule in this chapter: two decimal places, rounded half up.',
);
const vGroups = table(
  ['ISC group', 'Question it answers', 'Ratios in the syllabus'],
  [
    ['Liquidity', 'Can short-term dues be paid on time?', 'Current ratio; quick (liquid, acid-test) ratio'],
    ['Solvency', 'Is the long-term financial structure safe?', 'Debt to equity; proprietary; debt to total assets; interest coverage'],
    ['Activity (turnover)', 'How efficiently are resources used?', 'Trade receivables, trade payables, inventory and working capital turnover'],
    ['Profitability', 'How much does the business earn?', 'Gross profit, net profit, operating, operating profit ratios; earnings per share; price-earnings; return on investment'],
  ],
  'Table of the four groups of ratios in the syllabus: liquidity, solvency, activity and profitability, with the question each answers and the ratios in each',
);
const vBS = table(positionRows(MO).headers, positionRows(MO).rows, `Condensed balance sheet of Mohiniyattam Coir as at 31 March 2026 in the Schedule Three order: shareholders' funds ${fig(MO.sf)}, non-current liabilities ${fig(MO.ncl)}, current liabilities ${fig(MO.cl)}; non-current assets ${fig(MO.nca)}, current assets ${fig(MO.ca)}; total ${fig(MO.total)}`, 'An imagined company; sub-head totals only.');
const vCurrent = table(
  ['Current assets (numerator)', 'Current liabilities (denominator)'],
  [
    ['Current investments', 'Short-term borrowings (bank overdraft, cash credit)'],
    ['Inventories', 'Trade payables (creditors + bills payable)'],
    ['Trade receivables (debtors + bills receivable)', 'Other current liabilities (outstanding expenses, unpaid dividends)'],
    ['Cash and cash equivalents', 'Short-term provisions (provision for tax)'],
    ['Short-term loans and advances; prepaid expenses and other current assets', ''],
  ],
  'Table of what goes into the current ratio under the Schedule Three heads: current investments, inventories, trade receivables, cash, short-term loans and advances and prepaid expenses, over short-term borrowings, trade payables, other current liabilities and short-term provisions',
  'Current ratio = current assets ÷ current liabilities; conventional level 2 : 1.',
);
const vQuick = table(
  ['Kept in quick assets', 'Taken out, and why'],
  [
    ['Cash and cash equivalents', 'Inventories: must be sold first, and perhaps on credit'],
    ['Trade receivables', 'Prepaid expenses: never come back as cash'],
    ['Current investments', ''],
    ['Short-term loans and advances', ''],
  ],
  'Table of quick assets: cash, trade receivables, current investments and short-term loans are kept; inventories and prepaid expenses are taken out',
  'Quick ratio = quick assets ÷ current liabilities; conventional level 1 : 1.',
);
const vWE1 = table(
  ['Item', 'Working', 'Result'],
  [
    ['Current assets', `${fig(MO.ci)} + ${fig(MO.inv)} + ${fig(MO.tr)} + ${fig(MO.cce)} + ${fig(MO.prepaid)}`, rs(MO.ca)],
    ['Quick assets', `${fig(MO.ca)} − ${fig(MO.inv)} − ${fig(MO.prepaid)}`, rs(MO.quick)],
    ['Current ratio', show(R.current), `**${R.current.s}**`],
    ['Quick ratio', show(R.quick), `**${R.quick.s}**`],
  ],
  `Working for the liquidity ratios of Mohiniyattam Coir: current assets ${fig(MO.ca)}, quick assets ${fig(MO.quick)}, current liabilities ${fig(MO.cl)}; current ratio ${R.current.said}, quick ratio ${R.quick.said}`,
);
const vRules = table(
  ['What the transaction does', 'Ratio above 1', 'Ratio below 1'],
  [
    ['Raises both parts by the same amount', 'Falls', 'Rises'],
    ['Lowers both parts by the same amount', 'Rises', 'Falls'],
    ['Raises only the numerator, or lowers only the denominator', 'Rises', 'Rises'],
    ['Lowers only the numerator, or raises only the denominator', 'Falls', 'Falls'],
    ['Swaps one item for another inside the same part', 'No change', 'No change'],
  ],
  'Table of rules for the effect of a transaction on a ratio: an equal rise in both parts lowers a ratio above one, an equal fall raises it, a change in one part moves the ratio in that direction, and a swap within one part changes nothing',
  'Rules follow from the arithmetic; always recompute to confirm.',
);
const vEffCQ = table(
  ['Transaction', 'Current ratio (from 2 : 1)', 'Quick ratio (from 1.16 : 1)'],
  T5.map((t, i) => [t[0], `${fig(EFF_C.rows[i].n)} ÷ ${fig(EFF_C.rows[i].d)} ${EFF_C.rows[i].after.eq} ${EFF_C.rows[i].after.s}: **${EFF_WORD(EFF_C.rows[i].e)}**`, `${fig(EFF_Q.rows[i].n)} ÷ ${fig(EFF_Q.rows[i].d)} ${EFF_Q.rows[i].after.eq} ${EFF_Q.rows[i].after.s}: **${EFF_WORD(EFF_Q.rows[i].e)}**`]),
  'Table of five separate transactions of Mohiniyattam Coir and their effect on its current and quick ratios: paying creditors raises both, buying yarn for cash leaves the current ratio unchanged but lowers the quick ratio, buying yarn on credit lowers both, selling mats at a profit for cash raises both, and a long-term loan raises both',
  'Each transaction is taken separately from the starting figures.',
);
function EFF_WORD(e) { return EFFECT_WORD[e]; }
check(R.current.s === '2 : 1' && R.quick.s === '1.16 : 1', 'effects caption base');
const vSolv = table(
  ['Ratio', 'Formula', 'A higher figure means…'],
  [
    ['Debt to equity', F.de, 'more reliance on borrowed long-term funds: riskier for lenders'],
    ['Proprietary', F.prop, 'owners finance more of the assets: safer for outsiders'],
    ['Debt to total assets', F.dta, 'more of the assets financed by long-term debt: riskier'],
    ['Interest coverage', F.icr, 'interest is easier to pay out of profit'],
  ],
  'Table of the four solvency ratios with their formulas and what a higher figure means: debt to equity, proprietary, debt to total assets and interest coverage',
  "Debt = long-term borrowings + long-term provisions; equity = shareholders' funds.",
);
const vWE3 = table(
  ['Item', 'Working', 'Result'],
  [
    ['Debt', `${fig(MO.ltb)} + ${fig(MO.ltp)}`, rs(MO.debt)],
    ["Equity (shareholders' funds)", `${fig(MO.sc)} + ${fig(MO.rs)}`, rs(MO.sf)],
    ['Debt to equity', show(R.de), `**${R.de.s}**`],
    ['Debt to total assets', show(R.dta), `**${R.dta.s}**`],
    ['Proprietary', show(R.prop), `**${R.prop.s}**`],
    ['Interest coverage', `${show(MO_icr)} (profit before interest and tax over interest on debentures)`, `**${MO_icr.s}**`],
  ],
  `Working for the solvency ratios of Mohiniyattam Coir: debt ${fig(MO.debt)}, equity ${fig(MO.sf)}, total assets ${fig(MO.total)}; debt to equity ${R.de.said}, debt to total assets ${R.dta.said}, proprietary ${R.prop.said}, interest coverage ${MO_icr.said}`,
);
const vEffDE = table(
  ['Transaction', 'Change in debt', 'Change in equity', 'New ratio', 'Effect'],
  EFF_D.rows.map((r) => [r.label, delta(r.dn), delta(r.dd), `${fig(r.n)} ÷ ${fig(r.d)} ${r.after.eq} ${r.after.s}`, EFFECT_WORD[r.e]]),
  'Table of five separate transactions of Mohiniyattam Coir and their effect on its debt to equity ratio of zero point four to one: a share issue lowers it, a long-term loan raises it, redeeming debentures lowers it, a bonus issue leaves it unchanged and paying a dividend raises it',
  `Starting point: ${show(R.de)}.`,
);
const vMissing = table(
  ['Step', 'Working', 'Result'],
  [
    ['Working capital is (3 − 1) times the current liabilities', `${fig(GO.wc)} ÷ 2`, `Current liabilities ${rs(GO.cl)}`],
    ['Current assets', `3 × ${fig(GO.cl)}`, rs(GO.ca)],
    ['Quick assets', `1.8 × ${fig(GO.cl)}`, rs(GO.qa)],
    ['Inventories = current assets − quick assets − prepaid expenses', `${fig(GO.ca)} − ${fig(GO.qa)} − ${fig(GO.prepaid)}`, rs(GO.inv)],
    ['Check', `${show(GO_cr)}; ${show(GO_qr)}`, 'Both given ratios recovered'],
  ],
  `Steps for worked example four: working capital of ${fig(GO.wc)} is twice the current liabilities, so current liabilities are ${fig(GO.cl)}, current assets ${fig(GO.ca)}, quick assets ${fig(GO.qa)} and inventories ${fig(GO.inv)}`,
);
const vSummary1 = table(
  ['Ratio', 'Formula', 'Mohiniyattam'],
  [
    ['Current', F.current, R.current.s],
    ['Quick', F.quick, R.quick.s],
    ['Debt to equity', F.de, R.de.s],
    ['Debt to total assets', F.dta, R.dta.s],
    ['Proprietary', F.prop, R.prop.s],
    ['Interest coverage', F.icr, MO_icr.s],
  ],
  'Summary table of Part 1: formulas of the current, quick, debt to equity, debt to total assets, proprietary and interest coverage ratios with the values for Mohiniyattam Coir',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Turnover ratios', 'Cost of revenue and averages', 'Operating statement', 'Earnings per share and price-earnings', 'Capital employed and return', 'Missing figures and reading'], 'Route map of Part 2: turnover ratios, cost of revenue and averages, the operating statement and its ratios, earnings per share and price-earnings, capital employed and return on investment, missing figures and reading ratios together', 'Part 2 at a glance');
const vActivity = table(
  ['Turnover ratio', 'Flow of the year (numerator)', 'Resource (denominator)'],
  [
    ['Trade receivables', 'Credit revenue from operations', 'Average trade receivables (debtors + bills receivable)'],
    ['Trade payables', 'Net credit purchases', 'Average trade payables (creditors + bills payable)'],
    ['Inventory', 'Cost of revenue from operations', 'Average inventory'],
    ['Working capital', 'Revenue from operations', 'Working capital (current assets − current liabilities)'],
  ],
  'Table of the four turnover ratios in the syllabus, each a flow of the year over a resource: trade receivables, trade payables, inventory and working capital turnover',
  'All in times. Average = (opening + closing) ÷ 2.',
);
const vCost = table(
  ['Mohiniyattam Coir, year ended 31 March 2026', '₹'],
  [
    ['Opening inventory', fig(MO_T.open)],
    ['Add: Purchases', fig(MO_T.purchases)],
    ['Add: Direct expenses (wages, carriage inwards)', fig(MO_T.direct)],
    ['Less: Closing inventory', fig(-MO_T.close)],
    ['**Cost of revenue from operations**', `**${fig(MO_T.cost)}**`],
    ['Check: revenue − gross profit', `${fig(MO_T.rev)} − ${fig(MO_T.gp)} = ${fig(MO_T.cost)}`],
    ['Average inventory', `(${fig(MO_T.open)} + ${fig(MO_T.close)}) ÷ 2 = ${fig(MO_T.avgInv)}`],
  ],
  `Working of the cost of revenue from operations of Mohiniyattam Coir: opening inventory plus purchases plus direct expenses less closing inventory gives ${fig(MO_T.cost)}, which is also revenue less gross profit; average inventory ${fig(MO_T.avgInv)}`,
);
const vWE5 = table(
  ['Ratio', 'Working', 'Result'],
  [
    ['Inventory turnover', show(MO_itr), `**${MO_itr.s}**`],
    ['Trade receivables turnover', `${show(MO_trt)} (average of ${fig(MO_C.trOpen)} and ${fig(MO.tr)})`, `**${MO_trt.s}**`],
    ['Trade payables turnover', `${show(MO_tpt)} (average of ${fig(MO_C.tpOpen)} and ${fig(MO.tp)})`, `**${MO_tpt.s}**`],
  ],
  `Working for the inventory, trade receivables and trade payables turnover of Mohiniyattam Coir: ${MO_itr.said}, ${MO_trt.said} and ${MO_tpt.said}`,
  `Credit revenue ${rs(MO_C.credit)}; credit purchases ${rs(MO_C.crPur)}.`,
);
const vWCT = table(
  ['Mohiniyattam Coir', 'Working', 'Result'],
  [
    ['Working capital', `${fig(MO.ca)} − ${fig(MO.cl)}`, rs(MO.wc)],
    ['Working capital turnover', show(MO_wct), `**${MO_wct.s}**`],
    ['Reading', 'Each rupee of working capital supports ten rupees of revenue', 'Compare with last year and with similar firms'],
  ],
  `Working capital turnover of Mohiniyattam Coir: working capital ${fig(MO.wc)}, revenue ${fig(MO_T.rev)}, turnover ${MO_wct.said}`,
);
check(MO_wct.v === 10, 'ten rupees reading');
const vOpStmt = table(resultRows(MO_X).headers, resultRows(MO_X).rows, `Operating statement of Mohiniyattam Coir: revenue ${fig(MO_X.rev)}, gross profit ${fig(MO_X.gp)}, operating profit ${fig(MO_X.opProfit)}, profit before interest and tax ${fig(MO_X.pbit)}, profit before tax ${fig(MO_X.pbt)} and profit after tax ${fig(MO_X.pat)}`, 'Interest received and the loss on sale of furniture are non-operating.');
const vBar = (() => {
  const s = new Svg(600, 210);
  const X0 = 40;
  const W = 520;
  const segs = [['Cost of revenue from operations', per100.cost, 'blue'], ['Operating expenses', per100.opex, 'yellow'], ['Operating profit', per100.op, 'green']];
  let x = X0;
  segs.forEach(([label, v, c], i) => {
    const w = (W * v) / 100;
    s.rect(x, 64, w, 56, { fill: c, color: c, sw: 1, rx: 2, fillOpacity: 0.35 });
    s.text(x + w / 2, 92, `₹${v}`, { size: 15, bold: true });
    // Labels: above the long first segment; below the two short ones, the last right-aligned inside the frame.
    if (i === 0) s.text(x + w / 2, 44, label, { size: 12 });
    else if (i === 1) s.text(x + w / 2 - 20, 140, label, { size: 12 });
    else s.text(X0 + W + 30, 160, label, { size: 12, anchor: 'end' });
    x += w;
  });
  check(Math.abs(x - (X0 + W)) < 1e-9, 'bar segments fill the width');
  s.line(X0 + (W * (per100.cost + per100.opex)) / 100, 56, X0 + (W * (per100.cost + per100.opex)) / 100, 128, { sw: 2, dash: true, color: 'red' });
  s.text(300, 194, `Operating ratio ${MO_or.s} + operating profit ratio ${MO_opr.s} = 100%`, { size: 13, bold: true });
  return s.visual(
    `Bar showing what happens to every hundred rupees of Mohiniyattam Coir's revenue: ${words(per100.cost)} rupees cost of revenue from operations, ${words(per100.opex)} rupees operating expenses and ${words(per100.op)} rupees operating profit, so the operating ratio is ${MO_or.said} and the operating profit ratio ${MO_opr.said}`,
    'Segment widths are computed from the operating statement.',
  );
})();
const vWE6 = table(
  ['Ratio', 'Working', 'Result'],
  [
    ['Gross profit ratio', show(MO_gp), `**${MO_gp.s}**`],
    ['Operating ratio', `(${fig(MO_X.cost)} + ${fig(MO_X.opexT)}) ÷ ${fig(MO_X.rev)} × 100 = ${MO_or.s}`, `**${MO_or.s}**`],
    ['Operating profit ratio', show(MO_opr), `**${MO_opr.s}**`],
    ['Net profit ratio (after tax)', show(MO_npr), `**${MO_npr.s}**`],
  ],
  `Working for the profitability ratios of Mohiniyattam Coir: gross profit ${MO_gp.said}, operating ratio ${MO_or.said}, operating profit ratio ${MO_opr.said}, net profit ratio ${MO_npr.said}`,
);
check(MO_X.cost + MO_X.opexT === MO_X.opCost, 'operating cost working');
const vEPSfmt = table(
  ['Step', 'Rule'],
  [
    ['1. Profit after tax', 'From the Statement of Profit and Loss (after interest and tax)'],
    ['2. Less: preference dividend', 'Rate × preference share capital, for the year'],
    ['3. Earnings for equity shareholders', 'Step 1 − step 2'],
    ['4. Number of equity shares', 'Equity share capital ÷ face value of one share'],
    ['5. Earnings per share', 'Step 3 ÷ step 4, in rupees'],
    ['6. Price-earnings ratio', 'Market price per equity share ÷ earnings per share, in times'],
  ],
  'Table of the steps for earnings per share and the price-earnings ratio: profit after tax, less preference dividend, divided by the number of equity shares, then market price divided by earnings per share',
);
const vWE7 = table(
  ['Mohiniyattam Coir', 'Working', 'Result'],
  [
    ['Profit after tax', 'From the operating statement', rs(MO_X.pat)],
    ['Less: preference dividend', `10% of ${fig(MO_C.prefCap)}`, rs(MO_pd)],
    ['Earnings for equity shareholders', `${fig(MO_X.pat)} − ${fig(MO_pd)}`, rs(MO_X.pat - MO_pd)],
    ['Number of equity shares', `${fig(MO_C.shares * 10)} ÷ ₹10`, fig(MO_C.shares)],
    ['Earnings per share', show(MO_eps), `**${MO_eps.s}**`],
    ['Price-earnings ratio', show(MO_pe), `**${MO_pe.s}**`],
  ],
  `Working for the earnings per share and price-earnings ratio of Mohiniyattam Coir: earnings for equity shareholders ${fig(MO_X.pat - MO_pd)} over ${fig(MO_C.shares)} shares gives ${MO_eps.said}; a market price of ${words(MO_C.mps)} rupees gives a price-earnings ratio of ${MO_pe.said}`,
);
const vCE = table(
  ['Route', 'Working', 'Capital employed'],
  [
    ['Liabilities side', `Shareholders' funds ${fig(MO.sf)} + non-current liabilities ${fig(MO.ncl)}`, `**${rs(MO.ce)}**`],
    ['Assets side', `Non-current assets ${fig(MO.nca)} + working capital ${fig(MO.wc)}`, `**${rs(MO.nca + MO.wc)}**`],
    ['Total assets route', `Total assets ${fig(MO.total)} − current liabilities ${fig(MO.cl)}`, `**${rs(MO.total - MO.cl)}**`],
  ],
  `Capital employed of Mohiniyattam Coir worked out three ways: shareholders' funds plus non-current liabilities, non-current assets plus working capital, and total assets less current liabilities, all give ${fig(MO.ce)}`,
  'The routes must agree; if they do not, an item has been misplaced.',
);
const vWE8 = table(
  ['Mohiniyattam Coir', 'Working', 'Result'],
  [
    ['Profit before interest and tax', `Profit before tax ${fig(MO_X.pbt)} + debenture interest ${fig(MO_X.interest)}`, rs(MO_X.pbit)],
    ['Capital employed', "Shareholders' funds + non-current liabilities", rs(MO.ce)],
    ['Return on investment', show(MO_roi), `**${MO_roi.s}**`],
    ['Compared with', 'Interest rate on its debentures', '10%'],
  ],
  `Working for the return on investment of Mohiniyattam Coir: profit before interest and tax ${fig(MO_X.pbit)} on capital employed ${fig(MO.ce)} gives ${MO_roi.said}, well above the ten per cent it pays on its debentures`,
);
const vMissing2 = table(
  ['Step', 'Working', 'Result'],
  [
    ['Earnings per share = market price ÷ price-earnings ratio', `₹${KA.mps} ÷ ${KA.pe}`, `₹${KA.eps}.00`],
    ['Earnings for equity shareholders', `₹${KA.eps} × ${fig(KA.shares)}`, rs(KA.earn)],
    ['Profit after tax = earnings + preference dividend', `${fig(KA.earn)} + ${fig(KA.pd)}`, rs(KA.pat)],
    ['Revenue from operations = profit after tax ÷ net profit ratio', `${fig(KA.pat)} × 100 ÷ ${KA.npPct}`, rs(KA.rev)],
    ['Check', `${show(pe(KA.mps, KA_eps))}; ${show(pct(KA.pat, KA.rev))}`, 'Both given ratios recovered'],
  ],
  `Steps for worked example nine: a market price of ${words(KA.mps)} rupees and a price-earnings ratio of ${words(KA.pe)} give earnings per share of ${words(KA.eps)} rupees, earnings of ${fig(KA.earn)}, profit after tax of ${fig(KA.pat)} and revenue of ${fig(KA.rev)}`,
);
const vInterpret = table(
  ['Ratio', 'Mohiniyattam', 'Compared with', 'Reading'],
  [
    ['Current ratio', R.current.s, '2 : 1 (convention)', 'Comfortable short-term position'],
    ['Quick ratio', R.quick.s, '1 : 1 (convention)', 'Can pay current dues without selling stock'],
    ['Debt to equity', R.de.s, 'Lower is safer for lenders', 'Modest long-term borrowing'],
    ['Interest coverage', MO_icr.s, 'The higher the safer', 'Interest comfortably covered'],
    ['Trade receivables turnover', MO_trt.s, 'Trade payables turnover ' + MO_tpt.s, 'Pays suppliers a little faster than customers pay it'],
    ['Return on investment', MO_roi.s, 'Debenture interest 10%', 'Long-term funds earn more than they cost'],
  ],
  'Interpretation table for Mohiniyattam Coir: liquidity meets the conventions, borrowing is modest and interest well covered, customers pay a little more slowly than the company pays suppliers, and return on investment is well above the cost of its debentures',
  'A ratio means something only against a benchmark, a past year or similar firms.',
);
const vSummary2 = table(
  ['Ratio', 'Formula', 'Mohiniyattam'],
  [
    ['Trade receivables turnover', F.trt, MO_trt.s],
    ['Trade payables turnover', F.tpt, MO_tpt.s],
    ['Inventory turnover', F.itr, MO_itr.s],
    ['Working capital turnover', F.wct, MO_wct.s],
    ['Gross profit', F.gp, MO_gp.s],
    ['Net profit', F.npr, MO_npr.s],
    ['Operating ratio', F.or, MO_or.s],
    ['Operating profit', F.opr, MO_opr.s],
    ['Earnings per share', F.eps, MO_eps.s],
    ['Price-earnings', F.pe, MO_pe.s],
    ['Return on investment', F.roi, MO_roi.s],
  ],
  'Summary table of Part 2: formulas of the four turnover ratios and the seven profitability measures with the values for Mohiniyattam Coir',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Ratio Analysis — Part 1: Liquidity and Solvency Ratios, and Effects of Transactions',
  goals: [
    'State how ratios are expressed and name the four groups of ratios in the ISC syllabus',
    'Compute and interpret the current ratio and the quick ratio using the Schedule III heads',
    'Compute and interpret the debt to equity, proprietary, debt to total assets and interest coverage ratios',
    'Work out whether a transaction increases, decreases or leaves unchanged the current, quick or debt-equity ratio',
    'Find missing figures from given liquidity ratios',
  ],
  slides: [
    sl('title', 'Ratio Analysis', {
      b: 'Part 1 — what ratios are, the **liquidity** and **solvency** ratios of an imagined company, and how transactions move them.',
      v: vRoute1,
      n: 'A balance sheet tells us that current liabilities are five lakh rupees. Is that a lot? We cannot say until we set it against what the company holds to pay them. Ratio analysis sets related figures side by side. In this part we meet the four groups of ratios, work out the liquidity and solvency ratios of an imagined company, Mohiniyattam Coir, and see how single transactions move three key ratios.',
    }),
    sl('concept', 'What is a ratio?', {
      v: vForms,
      bl: ['A ratio relates **two figures** from the financial statements.', '**Ratio analysis**: computing, comparing and interpreting ratios.'],
      n: `A ratio is a relationship between two related figures from the financial statements. It may be written as a pure ratio, such as a current ratio of ${R.current.said}; in times, such as inventory turnover of ${MO_itr.said}; as a percentage, such as a gross profit ratio of ${MO_gp.said}; or in rupees per share, such as earnings per share of ${MO_eps.said}. We round every ratio to two decimal places.`,
    }),
    sl('concept', 'The four groups in the syllabus', {
      v: vGroups,
      n: 'Your syllabus groups ratios into four families. Liquidity ratios ask whether short-term dues can be paid. Solvency ratios ask whether the long-term structure is safe. Activity, or turnover, ratios ask how efficiently resources are used. Profitability ratios ask how much the business earns, and they include earnings per share, the price-earnings ratio and return on investment.',
    }),
    sl('check', 'Quick check: sort the ratios', {
      b: 'Match each ratio with its group.',
      chk: 'mt_groups',
      n: 'For each ratio, ask which question it answers: paying short-term dues, long-term safety, efficiency, or earnings.',
    }),
    sl('concept', 'Our case company: Mohiniyattam Coir Ltd', {
      v: vBS,
      n: `Meet Mohiniyattam Coir, an imagined company in Vaikom. Its balance sheet, in the Schedule Three order, totals ${rupees(MO.total)}. Shareholders' funds are ${rupees(MO.sf)}, long-term debt ${rupees(MO.debt)} and current liabilities ${rupees(MO.cl)}. Current assets are ${rupees(MO.ca)}. We will work out every ratio in this chapter from these figures and its statement of profit and loss.`,
    }),
    sl('concept', 'Liquidity: the current ratio', {
      v: vCurrent,
      bl: ['Around **2 : 1** is the traditional comfort level.', 'Too low: dues may not be met. Too high: idle cash, slow stock or slow collection.'],
      n: 'The current ratio divides current assets by current liabilities, taken from the Schedule Three heads. Current assets are current investments, inventories, trade receivables, cash, short-term loans and advances and prepaid expenses. Current liabilities are short-term borrowings, trade payables, other current liabilities and short-term provisions. Two to one is the traditional comfort level, but very high is not always good.',
    }),
    sl('concept', 'Liquidity: the quick ratio', {
      v: vQuick,
      n: 'The quick ratio, also called the liquid or acid-test ratio, is a sharper test. From current assets we remove inventories, which must first be sold, and prepaid expenses, which never come back as cash. What remains, quick assets, is divided by current liabilities. One to one is the usual benchmark: every rupee due soon is covered by a rupee that is almost cash.',
    }),
    sl('example', 'Worked example 1: liquidity of Mohiniyattam Coir', {
      b: `Mohiniyattam Coir (imagined): current assets ${rs(MO.ca)}, of which inventories ${rs(MO.inv)} and prepaid expenses ${rs(MO.prepaid)}; current liabilities ${rs(MO.cl)}.`,
      v: vWE1,
      n: `Current assets of ${rupees(MO.ca)} over current liabilities of ${rupees(MO.cl)} give a current ratio of ${R.current.said}. Taking out inventories and prepaid expenses leaves quick assets of ${rupees(MO.quick)}, so the quick ratio is ${R.quick.said}. Both meet the usual benchmarks: Mohiniyattam can pay its short-term dues without waiting to sell its coir stock.`,
    }),
    sl('check', 'Quick check: quick assets', {
      b: 'Fill in the blank.',
      chk: 'fb_quick',
      n: 'Besides inventories, which current asset will never turn back into cash?',
    }),
    sl('concept', 'How a transaction moves a ratio', {
      v: vRules,
      bl: ['Recompute with the **new** figures; never guess.', 'The rules depend on whether the ratio is above or below 1.'],
      n: 'A transaction can change the numerator, the denominator, both or neither. When both parts rise by the same amount, a ratio above one falls, and when both fall by the same amount, it rises. A change in one part alone moves the ratio the same way. A swap inside one part, such as collecting cash from a debtor, changes nothing. Always confirm by recomputing.',
    }),
    sl('example', 'Worked example 2: five transactions, two ratios', {
      b: 'Mohiniyattam Coir (imagined): each transaction is taken separately, starting from current assets ₹10,00,000, quick assets ₹5,80,000 and current liabilities ₹5,00,000.',
      v: vEffCQ,
      n: `Paying creditors lowers both parts and raises both ratios. Buying yarn for cash leaves the current ratio at ${R.current.said} but lowers the quick ratio, because cash becomes stock. Buying yarn on credit lowers both. Selling mats at a profit for cash raises both. A long-term loan brings cash in with no current liability, so both ratios rise.`,
    }),
    sl('check', 'Quick check: which leaves it unchanged?', {
      b: 'Choose the transaction that leaves the current ratio as it is.',
      chk: 'm_eff_none',
      n: 'Look for a transaction that swaps one current asset for another.',
    }),
    sl('concept', 'Solvency ratios', {
      v: vSolv,
      n: "Solvency ratios look at the long term. Debt means long-term borrowings plus long-term provisions; equity means shareholders' funds. The debt to equity ratio compares the two. The proprietary ratio shows the share of total assets financed by owners, and debt to total assets the share financed by long-term debt. Interest coverage asks how many times profit before interest and tax covers the interest on long-term debt.",
    }),
    sl('example', 'Worked example 3: solvency of Mohiniyattam Coir', {
      b: `Mohiniyattam Coir (imagined): share capital ${rs(MO.sc)}, reserves and surplus ${rs(MO.rs)}, 10% debentures ${rs(MO.ltb)}, long-term provisions ${rs(MO.ltp)}, total assets ${rs(MO.total)}; profit before interest and tax ${rs(MO_X.pbit)}.`,
      v: vWE3,
      n: `Debt of ${rupees(MO.debt)} against equity of ${rupees(MO.sf)} gives a debt to equity ratio of ${R.de.said}. Measured against total assets, debt gives ${R.dta.said} and equity gives ${R.prop.said}, after rounding. Profit before interest and tax of ${rupees(MO_X.pbit)} covers the debenture interest of ${rupees(MO_X.interest)} about ${MO_icr.said}. Lenders are well protected.`,
    }),
    sl('concept', 'How a transaction moves the debt-equity ratio', {
      v: vEffDE,
      n: `Start from Mohiniyattam's debt to equity ratio of ${R.de.said}. A share issue for cash raises equity, so the ratio falls. A new long-term loan raises debt, so it rises. Redeeming debentures lowers debt. A bonus issue moves money from a reserve to share capital, both inside shareholders' funds, so nothing changes. Paying a dividend reduces equity, so the ratio rises.`,
    }),
    sl('check', 'Quick check: a share issue', {
      b: 'True or false?',
      chk: 'tf_de_issue',
      n: 'Ask which part of the debt to equity ratio a share issue changes.',
    }),
    sl('example', 'Worked example 4: missing liquidity figures', {
      b: `An imagined company, **Gotipua Brassware Ltd**, Pipili, has a current ratio of ${GO_cr.s}, a quick ratio of ${GO_qr.s}, working capital of ${rs(GO.wc)} and prepaid expenses of ${rs(GO.prepaid)}. Find its current liabilities, current assets, quick assets and inventories.`,
      v: vMissing,
      n: `Sometimes the ratios are given and the figures are missing. With a current ratio of ${GO_cr.said}, working capital is twice the current liabilities, so current liabilities are ${rupees(GO.cl)} and current assets ${rupees(GO.ca)}. The quick ratio gives quick assets of ${rupees(GO.qa)}. Inventories are what is left after quick assets and prepaid expenses: ${rupees(GO.inv)}. Recomputing both ratios confirms the answers.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: ratios relate two figures and are written as a proportion, in times, as a percentage or in rupees per share. Liquidity ratios compare current or quick assets with current liabilities. Solvency ratios compare long-term debt with equity and with total assets, equity with total assets, and profit before interest and tax with interest. Recompute both parts to see how a transaction moves a ratio.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **formula → working → answer**; each carries marks.',
        'State the result in the right form: **x : 1**, **times**, **%** or **₹ per share**, to two decimal places.',
        'Show **quick assets**, **debt** and **equity** as separate workings.',
        'For a transaction, write the **new figures** and the **new ratio**, then say increase, decrease or no change.',
        'Missing figures: build each step from a ratio, then **recompute** the given ratios as a check.',
      ],
      n: 'In the examination, write the formula, then the working, then the answer in the right form, rounded to two decimal places. Show quick assets, debt and equity as separate workings. For a transaction, write the new figures and the new ratio before you say whether it rises or falls. When you find missing figures, recompute the given ratios to check.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Ratio Analysis — Part 2: Activity and Profitability Ratios',
  goals: [
    'Compute trade receivables, trade payables, inventory and working capital turnover ratios using averages and credit figures',
    'Find the cost of revenue from operations and average inventory from given figures',
    'Compute the gross profit, net profit, operating and operating profit ratios, separating operating from non-operating items',
    'Compute earnings per share, the price-earnings ratio, capital employed and return on investment',
    'Find missing figures from given ratios and read a set of ratios together',
  ],
  slides: [
    sl('title', 'Activity and profitability ratios', {
      b: 'Part 2 — **turnover** ratios, **profitability** ratios including earnings per share and price-earnings, and **return on investment**.',
      v: vRoute2,
      n: 'In part one we asked whether a company can pay its debts. Now we ask how well it uses its resources and how much it earns. Turnover ratios count how many times receivables, payables, inventory and working capital turn over in a year. Profitability ratios measure profit against revenue, per share and against capital employed. We continue with Mohiniyattam Coir.',
    }),
    sl('concept', 'Activity ratios in the syllabus', {
      v: vActivity,
      n: 'Each activity ratio sets a flow of the year against the resource behind it. Trade receivables turnover uses credit revenue over average receivables, which include bills receivable. Trade payables turnover uses net credit purchases over average payables. Inventory turnover uses the cost of revenue from operations over average inventory. Working capital turnover uses revenue from operations over working capital. Each is stated in times.',
    }),
    sl('concept', 'Cost of revenue from operations and average inventory', {
      v: vCost,
      n: `Inventory is valued at cost, so inventory turnover uses the cost of revenue from operations. For Mohiniyattam, opening inventory plus purchases plus direct expenses, less closing inventory, gives ${rupees(MO_T.cost)}, which equals revenue less gross profit. Average inventory is the opening and closing figures added and halved: ${rupees(MO_T.avgInv)}.`,
    }),
    sl('example', 'Worked example 5: three turnover ratios', {
      b: `Mohiniyattam Coir (imagined): credit revenue ${rs(MO_C.credit)}; net credit purchases ${rs(MO_C.crPur)}; trade receivables ${rs(MO_C.trOpen)} at the start and ${rs(MO.tr)} at the end of the year; trade payables ${rs(MO_C.tpOpen)} and ${rs(MO.tp)}.`,
      v: vWE5,
      n: `Mohiniyattam's inventory turned over ${MO_itr.said}. Credit revenue of ${rupees(MO_C.credit)} against average receivables of ${rupees(avgTR)} gives ${MO_trt.said}. Credit purchases of ${rupees(MO_C.crPur)} against average payables of ${rupees(avgTP)} give ${MO_tpt.said}. So it pays its suppliers a little faster than its customers pay it, which is worth watching.`,
    }),
    sl('check', 'Quick check: inventory turnover', {
      b: 'Work out the ratio.',
      chk: 'n_itr',
      n: 'Average the two inventory figures first, then divide the cost of revenue by that average.',
    }),
    sl('concept', 'Working capital turnover', {
      v: vWCT,
      n: `Working capital is current assets less current liabilities: for Mohiniyattam, ${rupees(MO.wc)}. Revenue from operations of ${rupees(MO_T.rev)} is ${MO_wct.said} that working capital. A rising figure means each rupee of working capital is supporting more revenue, but a very high one may mean working capital is too thin for safety.`,
    }),
    sl('concept', 'Profitability: the operating statement', {
      v: vOpStmt,
      n: `Profitability ratios are measured on revenue from operations. Mohiniyattam's gross profit is ${rupees(MO_X.gp)}. Taking away operating expenses leaves an operating profit of ${rupees(MO_X.opProfit)}. Non-operating items, such as interest received and a loss on selling furniture, come next, giving profit before interest and tax. Then debenture interest and tax leave a profit after tax of ${rupees(MO_X.pat)}.`,
    }),
    sl('concept', 'Operating ratio and operating profit ratio', {
      v: vBar,
      n: `Think of every hundred rupees of revenue. For Mohiniyattam, ${words(per100.cost)} rupees go on the cost of revenue and ${words(per100.opex)} rupees on operating expenses, an operating ratio of ${MO_or.said}. The ${words(per100.op)} rupees left are operating profit, so the operating profit ratio is ${MO_opr.said}. The two always add up to one hundred.`,
    }),
    sl('example', 'Worked example 6: gross, operating and net profit ratios', {
      b: `Mohiniyattam Coir (imagined): revenue from operations ${rs(MO_X.rev)}; gross profit ${rs(MO_X.gp)}; operating cost ${rs(MO_X.opCost)}; operating profit ${rs(MO_X.opProfit)}; profit after tax ${rs(MO_X.pat)}.`,
      v: vWE6,
      n: `Mohiniyattam's gross profit ratio is ${MO_gp.said}. Its operating ratio is ${MO_or.said} and its operating profit ratio ${MO_opr.said}. The net profit ratio, on profit after tax, is ${MO_npr.said}. The gap between operating profit and net profit is made up of non-operating items, debenture interest and tax.`,
    }),
    sl('check', 'Quick check: operating ratio', {
      b: 'Work out the ratio.',
      chk: 'n_or',
      n: 'Add the operating expenses to the cost of revenue, then divide by revenue and multiply by one hundred.',
    }),
    sl('concept', 'Earnings per share and the price-earnings ratio', {
      v: vEPSfmt,
      n: 'Earnings per share shows the profit earned for each equity share. Start from profit after tax, take out the preference dividend, and divide by the number of equity shares. The price-earnings ratio then divides the market price of a share by its earnings per share. It tells us how many rupees investors are paying for each rupee of yearly earnings.',
    }),
    sl('example', 'Worked example 7: earnings per share and price-earnings', {
      b: `Mohiniyattam Coir (imagined): profit after tax ${rs(MO_X.pat)}; 10% preference shares ${rs(MO_C.prefCap)}; ${fig(MO_C.shares)} equity shares of ₹10 each; market price ₹${MO_C.mps}.`,
      v: vWE7,
      n: `Mohiniyattam's preference dividend is ${rupees(MO_pd)}, leaving ${rupees(MO_X.pat - MO_pd)} for equity shareholders. Spread over ${words(MO_C.shares)} shares, that is earnings per share of ${MO_eps.said}. With the share selling at ${words(MO_C.mps)} rupees, the price-earnings ratio is ${MO_pe.said}.`,
    }),
    sl('check', 'Quick check: earnings per share', {
      b: 'Fill in the blank.',
      chk: 'fb_eps',
      n: 'Earnings per share is worked out for one kind of share only. Which?',
    }),
    sl('concept', 'Capital employed: three routes, one answer', {
      v: vCE,
      n: `Capital employed is the long-term money in the business. From the liabilities side it is shareholders' funds plus non-current liabilities: for Mohiniyattam, ${rupees(MO.ce)}. From the assets side it is non-current assets plus working capital, and total assets less current liabilities gives it a third time. All three must agree.`,
    }),
    sl('example', 'Worked example 8: return on investment', {
      b: `Mohiniyattam Coir (imagined): profit before tax ${rs(MO_X.pbt)} after debenture interest of ${rs(MO_X.interest)}; capital employed ${rs(MO.ce)}.`,
      v: vWE8,
      n: `Return on investment uses profit before interest and tax, because capital employed includes the lenders' money. For Mohiniyattam that profit is ${rupees(MO_X.pbit)}. Divided by capital employed of ${rupees(MO.ce)}, it gives ${MO_roi.said}, well above the ten per cent it pays on its debentures.`,
    }),
    sl('check', 'Quick check: capital employed', {
      b: 'Fill in the blank.',
      chk: 'fb_ce',
      n: 'From the assets side, what is added to the non-current assets?',
    }),
    sl('example', 'Worked example 9: missing profitability figures', {
      b: `An imagined company, **Kathak Attar Ltd**, Jaunpur, has a price-earnings ratio of ${KA.pe}, a share price of ₹${KA.mps}, ${fig(KA.shares)} equity shares, a preference dividend of ${rs(KA.pd)} and a net profit ratio of ${KA.npPct}%. Find its earnings per share, profit after tax and revenue from operations.`,
      v: vMissing2,
      n: `Work backwards. Earnings per share is the price, ${words(KA.mps)} rupees, divided by the price-earnings ratio of ${words(KA.pe)}: ${words(KA.eps)} rupees. Times ${words(KA.shares)} shares, earnings are ${rupees(KA.earn)}; adding the preference dividend gives a profit after tax of ${rupees(KA.pat)}. At a net profit ratio of ${words(KA.npPct)} per cent, revenue is ${rupees(KA.rev)}.`,
    }),
    sl('concept', 'Reading the ratios together', {
      v: vInterpret,
      n: 'A ratio means something only when it is compared: with a benchmark, a past year or similar firms. Mohiniyattam meets the liquidity benchmarks, borrows modestly and covers its interest comfortably. Its customers pay a little more slowly than it pays its suppliers, and its long-term funds earn more than they cost. Read the four groups together before you judge.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: "To sum up: turnover ratios divide a flow of the year by the resource behind it, using averages and credit figures, and are stated in times. Profitability ratios are percentages of revenue from operations, except earnings per share, in rupees, the price-earnings ratio, in times, and return on investment, which relates profit before interest and tax to capital employed.",
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Inventory turnover uses **cost** of revenue from operations and **average** inventory.',
        'Use **credit** revenue and **credit** purchases; include **bills** receivable and payable.',
        'Leave **non-operating** items out of the operating ratios.',
        'Earnings per share: take out the **preference dividend**; count **equity shares**, not rupees of capital.',
        'Return on investment: profit **before interest and tax**; compute capital employed **both ways**.',
      ],
      n: 'Use the cost of revenue and average inventory for inventory turnover, and credit figures, including bills, for receivables and payables. Leave non-operating items out of the operating ratios. For earnings per share, take out the preference dividend and count equity shares, not rupees of capital. For return on investment, add back interest and tax and check capital employed both ways.',
    }),
  ],
});

// Narration is spoken by text to speech: no digits, rupee sign, slash, ampersand, per-cent sign or capitals runs.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
  check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
}

// ---------------------------------------------------------------- notes
const vDefs = table(
  ['Term', 'Definition used in this chapter'],
  [
    ['Current assets', 'Current investments + inventories + trade receivables + cash and cash equivalents + short-term loans and advances + prepaid and other current assets'],
    ['Current liabilities', 'Short-term borrowings + trade payables + other current liabilities + short-term provisions'],
    ['Quick assets', 'Current assets − inventories − prepaid expenses'],
    ['Debt', 'Long-term borrowings + long-term provisions (non-current liabilities)'],
    ['Equity', "Shareholders' funds = share capital + reserves and surplus"],
    ['Total assets', 'Non-current assets + current assets'],
    ['Working capital', 'Current assets − current liabilities (at the year end)'],
    ['Capital employed', "Shareholders' funds + non-current liabilities = non-current assets + working capital = total assets − current liabilities"],
    ['Cost of revenue from operations', 'Opening inventory + net purchases + direct expenses − closing inventory (= revenue − gross profit)'],
    ['Average inventory, receivables, payables', '(Opening + closing) ÷ 2'],
    ['Operating expenses', 'Employee benefits, depreciation and amortisation, other operating (office, selling) expenses; not finance costs or non-operating items'],
    ['Profit before interest and tax', 'Operating profit + non-operating income − non-operating expenses (= profit before tax + interest)'],
    ['Net profit (for the net profit ratio)', 'Profit after tax'],
    ['Earnings for equity shareholders', 'Profit after tax − preference dividend'],
  ],
  'Table of the definitions used throughout the chapter: current assets, current liabilities, quick assets, debt, equity, total assets, working capital, capital employed, cost of revenue from operations, averages, operating expenses, profit before interest and tax, net profit and earnings for equity shareholders',
  'One set of definitions; every ratio in this chapter follows it.',
);
const FORMULAS = {
  'Current ratio': F.current, 'Quick ratio': F.quick,
  'Debt to equity ratio': F.de, 'Proprietary ratio': F.prop, 'Debt to total assets ratio': F.dta, 'Interest coverage ratio': F.icr,
  'Trade receivables turnover': F.trt, 'Trade payables turnover': F.tpt, 'Inventory turnover': F.itr, 'Working capital turnover': F.wct,
  'Gross profit ratio': F.gp, 'Net profit ratio': F.npr, 'Operating ratio': F.or, 'Operating profit ratio': F.opr, 'Earnings per share': F.eps, 'Price-earnings ratio': F.pe, 'Return on investment': F.roi,
};
const vFormulas = table(['Ratio', 'Formula'], Object.entries(FORMULAS), 'Formula table of all seventeen measures in the chapter: two liquidity, four solvency, four activity and seven profitability measures');
check(vFormulas.spec.rows.length === 17, 'seventeen formulas');

const N = notes({
  title: 'Ratio Analysis — Notes',
  sections: [
    {
      h: '1. Ratio analysis and the four ISC groups',
      t: [1, 2, 3, 4],
      b: 'An **accounting ratio** expresses the relationship between two related figures in the financial statements, for example current assets and current liabilities. **Ratio analysis** means computing such ratios, comparing them (with past years, other firms or accepted standards) and interpreting them.\n\n**Forms:** pure ratio (2 : 1); times (10 times); percentage (25%); rupees per share (₹3.00).\n\n**The ISC syllabus lists four groups:**\n- **Liquidity:** current ratio; quick (liquid or acid-test) ratio.\n- **Solvency:** debt to equity; proprietary; debt to total assets; interest coverage.\n- **Activity:** trade receivables, trade payables, inventory and working capital turnover.\n- **Profitability:** gross profit, net profit, operating and operating profit ratios; earnings per share; price-earnings ratio; return on investment.\n\nRatios are read by comparison: with a convention (2 : 1, 1 : 1), with the same firm last year, or with similar firms.',
      terms: [
        ['Accounting ratio', 'A mathematical relationship between two related figures in the financial statements.'],
        ['Ratio analysis', 'Computing, comparing and interpreting accounting ratios to judge a business.'],
        ['Benchmark', 'A standard for comparison: a convention, an industry figure or last year’s ratio.'],
      ],
      v: vGroups,
      vs: [vForms],
    },
    {
      h: '2. One set of definitions and the rounding rule',
      t: [1, 2, 3, 4],
      b: '**Definitions.** The first table fixes every base used in the chapter; the second lists all seventeen formulas. Points to note:\n- Current assets and current liabilities follow the **Schedule III** heads of the balance sheet.\n- **Debt** means non-current liabilities only; current liabilities never enter the solvency ratios.\n- **Capital employed** can be reached three ways (liabilities side, assets side, total assets − current liabilities); the answers must agree.\n- Inventory, receivables and payables turnover use **averages** of opening and closing figures; working capital turnover uses the **year-end** working capital. If only closing figures are given, use them; if credit figures are not given, use the totals.\n- The **net profit ratio** is on profit after tax unless a question asks for profit before tax.\n\n**Rounding rule.** Work every ratio to **two decimal places**, rounded half up (0.9625 → 0.96; 10.125 → 10.13); an exact result is written as it is (2.5 : 1, 25%). Earnings per share is written in rupees and paise (₹2.30).',
      terms: [
        ['Capital employed', "Long-term funds: shareholders' funds + non-current liabilities."],
        ['Working capital', 'Current assets minus current liabilities.'],
        ['Cost of revenue from operations', 'Cost of the goods sold: revenue from operations less gross profit.'],
      ],
      v: vDefs,
      vs: [vFormulas],
    },
    {
      h: '3. Liquidity ratios',
      t: 1,
      b: '**Current ratio = current assets ÷ current liabilities.** Conventional level **2 : 1**. Below 1 : 1, current liabilities exceed current assets and dues may not be met; a very high ratio suggests idle cash, excess stock or slow collection.\n\n**Quick (liquid or acid-test) ratio = quick assets ÷ current liabilities**, where quick assets = current assets − inventories − prepaid expenses. Conventional level **1 : 1**. It tests whether short-term dues can be paid without selling stock, which is why a banker often prefers it when much of the current assets is slow-moving inventory.\n\n**Watch the items:** bills receivable belong to trade receivables; a bank overdraft is a short-term borrowing (current liability); debentures, long-term loans and long-term provisions are non-current.',
      terms: [
        ['Current ratio', 'Current assets ÷ current liabilities; a test of short-term solvency.'],
        ['Quick assets', 'Current assets other than inventories and prepaid expenses.'],
        ['Liquidity', 'Ability to meet obligations falling due within twelve months or the operating cycle.'],
      ],
      v: vWE1,
      vs: [vCurrent, vQuick],
    },
    {
      h: '4. Solvency ratios',
      t: 2,
      b: "**Debt to equity ratio = debt ÷ equity** (debt = long-term borrowings + long-term provisions; equity = shareholders' funds). Lower means a larger safety margin for lenders and a smaller fixed interest burden.\n\n**Proprietary ratio = shareholders' funds ÷ total assets.** The share of the assets financed by owners; higher is safer for outsiders.\n\n**Debt to total assets ratio = debt ÷ total assets.** The share of the assets financed by long-term debt; lower is safer.\n\n**Interest coverage ratio = profit before interest and tax ÷ interest on long-term debt** (times). How many times the interest is earned; a high figure means interest will be paid even if profit falls. Work back to profit before interest and tax: profit after tax → add tax → add interest.",
      terms: [
        ['Debt', 'Long-term borrowings plus long-term provisions.'],
        ['Proprietary ratio', "Shareholders' funds as a proportion of total assets."],
        ['Interest coverage', 'Times the interest on long-term debt is covered by profit before interest and tax.'],
      ],
      v: vWE3,
      vs: [vSolv],
    },
    {
      h: '5. Effects of transactions on the current, quick and debt-equity ratios',
      t: 5,
      b: '**Method.** For each transaction (taken separately): (1) write the change in the numerator and the denominator; (2) recompute the ratio; (3) compare with the original and state **increase, decrease or no change**.\n\n**Rules that follow from the arithmetic** (see the table):\n- an equal **rise** in both parts **lowers** a ratio above 1; an equal **fall** **raises** it (the opposite for a ratio below 1);\n- a change in one part only moves the ratio in that direction;\n- a swap inside one part changes nothing (collecting a debtor: current ratio unchanged).\n\n**Typical cases.** Buying inventory for cash: current ratio unchanged, quick ratio falls. Buying inventory on credit: both fall (when above 1). Issuing shares for cash: liquidity ratios rise, debt-equity falls. Redeeming debentures in cash: debt-equity falls. Bonus shares from reserves: debt-equity unchanged. Paying a dividend: debt-equity rises.\n\n*Not in the ISC 2027 syllabus:* effect-of-transaction problems on ratios other than the current, quick and debt-equity ratios.',
      terms: [
        ['Numerator', 'The figure on top of a ratio, such as current assets in the current ratio.'],
        ['Denominator', 'The figure below, such as current liabilities in the current ratio.'],
        ['Bonus issue', 'Capitalising reserves into shares: equity as a whole does not change.'],
      ],
      v: vEffCQ,
      vs: [vRules, vEffDE],
    },
    {
      h: '6. Activity (turnover) ratios',
      t: 3,
      b: '- **Trade receivables turnover = credit revenue from operations ÷ average trade receivables** (debtors + bills receivable). Higher means faster collection.\n- **Trade payables turnover = net credit purchases ÷ average trade payables** (creditors + bills payable). Lower means the firm takes longer to pay; a sudden fall may signal a cash strain.\n- **Inventory turnover = cost of revenue from operations ÷ average inventory.** Higher means faster-moving stock; very high may mean too little stock.\n- **Working capital turnover = revenue from operations ÷ working capital.**\n\n**Finding cost of revenue:** opening inventory + net purchases + direct expenses (wages, carriage inwards) − closing inventory; or revenue − gross profit. If gross profit is a percentage **on cost**, cost = revenue × 100 ÷ (100 + rate). Revenue from operations is net of sales returns; purchases are net of purchases returns.',
      terms: [
        ['Inventory turnover', 'Times the average inventory is sold and replaced in a year.'],
        ['Trade receivables turnover', 'Times the average receivables are collected in a year.'],
        ['Working capital turnover', 'Revenue from operations generated per rupee of working capital.'],
      ],
      v: vWE5,
      vs: [vActivity, vCost, vWCT],
    },
    {
      h: '7. Profitability ratios, earnings per share and return on investment',
      t: 4,
      b: '- **Gross profit ratio = gross profit ÷ revenue from operations × 100.**\n- **Net profit ratio = profit after tax ÷ revenue from operations × 100.**\n- **Operating ratio = (cost of revenue from operations + operating expenses) ÷ revenue from operations × 100.**\n- **Operating profit ratio = operating profit ÷ revenue from operations × 100 = 100 − operating ratio.**\n- **Earnings per share = (profit after tax − preference dividend) ÷ number of equity shares.** Number of shares = equity share capital ÷ face value.\n- **Price-earnings ratio = market price per equity share ÷ earnings per share** (times).\n- **Return on investment = profit before interest and tax ÷ capital employed × 100.**\n\nOperating ratios ignore non-operating items (interest or dividend received, profit or loss on sale of assets, loss by fire) and finance costs; the net profit ratio includes them. Return on investment uses profit **before** interest because capital employed includes the lenders’ money; compare it with the rate of interest the company pays.',
      terms: [
        ['Operating profit', 'Gross profit minus operating expenses.'],
        ['Earnings per share', 'Profit for equity shareholders divided by the number of equity shares.'],
        ['Price-earnings ratio', 'Market price per share as a multiple of earnings per share.'],
      ],
      v: vWE6,
      vs: [vOpStmt, vBar, vEPSfmt, vWE7, vCE, vWE8],
    },
    {
      h: '8. Finding missing figures and reading ratios together',
      t: [1, 3, 4],
      b: '**Missing figures.** Turn each given ratio into a statement about one unknown and solve in a chain:\n- working capital and the current ratio give current liabilities (working capital ÷ (current ratio − 1)) and current assets;\n- the quick ratio gives quick assets, and the gap to current assets gives inventories (after prepaid expenses);\n- inventory turnover × average inventory gives cost of revenue; a gross profit rate then gives revenue;\n- a net profit ratio gives profit after tax; less preference dividend, ÷ shares, gives earnings per share; × price-earnings ratio gives the market price.\n\nAlways finish by **recomputing every given ratio** from your answers.\n\n**Reading ratios together.** Compare each ratio with a benchmark, last year and similar firms, and read the groups together (for example, receivables turnover against payables turnover; return on investment against the interest rate).',
      terms: [
        ['Chain method', 'Solving missing figures step by step, each answer feeding the next.'],
        ['Inter-firm comparison', 'Setting a firm’s ratios beside those of similar firms.'],
      ],
      v: vMissing,
      vs: [vMissing2, vInterpret],
    },
  ],
  tips: '**Common mistakes**\n- Using **revenue** instead of **cost of revenue from operations** in inventory turnover, or closing instead of **average** inventory.\n- Leaving **bills receivable / bills payable** out of trade receivables and payables, or using total instead of **credit** figures.\n- Putting **current liabilities** into debt, or forgetting **long-term provisions**.\n- Forgetting **prepaid expenses** when working out quick assets.\n- Including **non-operating** items or interest in the operating ratio.\n- Using profit after tax in **return on investment** or **interest coverage** (both need profit before interest and tax).\n- In earnings per share, ignoring the **preference dividend** or dividing by rupees of capital instead of the **number** of equity shares.\n- Guessing the effect of a transaction instead of **recomputing** the ratio.\n- Writing the answer in the wrong form (25 instead of 25%, 2 instead of 2 : 1) or not rounding to two decimal places.\n\n**How marks are usually split (Ratio Analysis carries 8 marks in Section B)**\n- 1 mark: one ratio, one formula or one effect in an objective item.\n- 2 marks: a pair of ratios, or two transaction effects (1 mark each).\n- 3 marks: three ratios (about 1 mark each, formula and working counted), or a short missing-figure chain.\n- 5 marks: a question in parts, for example bases and ratios 2 + ratios and comment 3.\n- 8 marks: a full problem of six to eight ratios from the statements, or a long missing-figure chain.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Four ISC groups of ratios', 'Liquidity, solvency, activity, profitability.', 'fact', 1],
  ['Four forms of expressing a ratio', 'Pure ratio (2 : 1), times (10 times), percentage (25%), rupees per share (₹3.00).', 'fact', 1],
  ['Current ratio', 'Current assets ÷ current liabilities; convention **2 : 1**.', 'definition', 1],
  ['Quick assets', 'Current assets − **inventories** − **prepaid expenses**.', 'definition', 1],
  ['Quick ratio', 'Quick assets ÷ current liabilities; convention **1 : 1**. Also called liquid or acid-test ratio.', 'definition', 1],
  ['Is a bank overdraft current?', 'Yes: a short-term borrowing, so a current liability.', 'fact', 1],
  ['Debt (for solvency ratios)', 'Long-term borrowings + long-term provisions.', 'definition', 2],
  ['Debt to equity ratio', "Debt ÷ shareholders' funds; lower is safer for lenders.", 'definition', 2],
  ['Proprietary ratio', "Shareholders' funds ÷ total assets.", 'definition', 2],
  ['Debt to total assets ratio', 'Debt ÷ total assets.', 'definition', 2],
  ['Interest coverage ratio', 'Profit before interest and tax ÷ interest on long-term debt (times).', 'definition', 2],
  ['Trade receivables turnover', 'Credit revenue from operations ÷ average (debtors + bills receivable).', 'definition', 3],
  ['Trade payables turnover', 'Net credit purchases ÷ average (creditors + bills payable).', 'definition', 3],
  ['Inventory turnover', 'Cost of revenue from operations ÷ **average** inventory.', 'definition', 3],
  ['Working capital turnover', 'Revenue from operations ÷ (current assets − current liabilities).', 'definition', 3],
  ['Cost of revenue from operations', 'Opening inventory + purchases + direct expenses − closing inventory = revenue − gross profit.', 'fact', 3],
  ['Gross profit 25% on cost: find cost', 'Cost = revenue × 100 ÷ 125.', 'exam-tip', 3],
  ['Gross profit ratio', 'Gross profit ÷ revenue from operations × 100.', 'definition', 4],
  ['Net profit ratio', 'Profit after tax ÷ revenue from operations × 100.', 'definition', 4],
  ['Operating ratio', '(Cost of revenue + operating expenses) ÷ revenue from operations × 100.', 'definition', 4],
  ['Operating profit ratio', 'Operating profit ÷ revenue × 100 = **100 − operating ratio**.', 'definition', 4],
  ['Earnings per share', '(Profit after tax − preference dividend) ÷ number of equity shares.', 'definition', 4],
  ['Price-earnings ratio', 'Market price per equity share ÷ earnings per share (times).', 'definition', 4],
  ['Return on investment', 'Profit **before interest and tax** ÷ capital employed × 100.', 'definition', 4],
  ['Capital employed: three ways', "Shareholders' funds + non-current liabilities = non-current assets + working capital = total assets − current liabilities.", 'exam-tip', 4],
  ['Left out of the operating ratio', 'Non-operating items (profit or loss on sale of assets, interest and dividend received, loss by fire) and finance costs.', 'exam-tip', 4],
  ['Buying inventory for cash', 'Current ratio **no change**; quick ratio **falls**.', 'exam-tip', 5],
  ['Paying creditors when the current ratio is above 1', 'Both parts fall equally, so the ratio **rises**.', 'exam-tip', 5],
  ['Issue of equity shares for cash: debt-equity', '**Decreases** (equity rises, debt unchanged).', 'exam-tip', 5],
  ['Bonus shares from reserves: debt-equity', '**No change**: both items are inside shareholders’ funds.', 'exam-tip', 5],
  ['Rounding rule in this chapter', 'Two decimal places, rounded half up; exact results written as they are.', 'exam-tip', 1],
  ['Checking missing figures', 'Recompute every given ratio from your answers.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Ratio Analysis',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_quick_excl', 'm_dta_compute', 'm_itr_cost', 'm_eps_compute', 'ar_de_safety'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question. Round ratios to two decimal places.', items: ['s2_liquidity_pair', { attempt: 1, keys: ['s2_eff_de2', 's2_trt'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_op_ratios', { attempt: 1, keys: ['s3_eff_qr3', 's3_solvency_meaning'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts; show every step and check your answers against the given ratios.', items: ['l5_missing'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Ratio Analysis',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_cl_item', 'm_cr_low', 'm_qr_compute', 'm_de_def', 'm_icr_compute', 'm_trt_compute', 'm_gp_compute', 'm_pe_compute', 'm_roi_pbit', 'm_eff_qr', 'ar_icr', 'ar_eff_qr'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question. Round ratios to two decimal places.', items: ['s2_missing_cl', 's2_icr', { attempt: 1, keys: ['s2_eps_pe', 's2_qr_vs_cr'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_liquidity', 's3_solvency3', 's3_turnover3', { attempt: 1, keys: ['s3_roi_ce', 's3_eff_all'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts; show your working.', items: ['l5_profit', { attempt: 1, keys: ['l5_solvency', 'l5_de_effects'] }] },
  ],
});
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, 'test totals');

// Every marking scheme uses whole-number step marks that add up to the item's marks.
for (const [id, q] of BANK) {
  check(q.marking_scheme.every((x) => Number.isInteger(x.marks) && x.marks > 0), `${id}: step marks must be whole numbers`);
  check(q.marking_scheme.reduce((a, x) => a + x.marks, 0) === q.marks, `${id}: scheme adds to ${q.marking_scheme.reduce((a, x) => a + x.marks, 0)}, item has ${q.marks}`);
}

// Blueprint fit: every section matches the YAML item for item (type, marks, choice groups).
const BP = {
  short: { A: [['mcq', 1, 4], ['assertion-reason', 1, 1]], B: [['short', 2, 1], ['short', 2, 2, 1]], C: [['short', 3, 1], ['short', 3, 2, 1]], D: [['long', 5, 1]] },
  long: { A: [['mcq', 1, 10], ['assertion-reason', 1, 2]], B: [['short', 2, 2], ['short', 2, 2, 1]], C: [['short', 3, 3], ['short', 3, 2, 1]], D: [['long', 5, 1], ['long', 5, 2, 1]] },
};
function fitCheck(t, bp, qs) {
  check(Object.keys(bp).join() === t.sections.map((s) => s.id).join(), `${t.id}: sections`);
  for (const s of t.sections) {
    const want = bp[s.id];
    check(want, `${t.id}: unexpected section ${s.id}`);
    const free = s.items.filter((i) => !i.choice_group);
    const grouped = s.items.filter((i) => i.choice_group);
    const plain = want.filter((w) => w.length === 3);
    const choice = want.filter((w) => w.length === 4);
    for (const [type, marks, count] of plain) {
      const got = free.filter((i) => qs.get(i.question_id).type === type && i.marks === marks).length;
      check(got === count, `${t.id} ${s.id}: ${got} free ${type}-${marks}, blueprint ${count}`);
    }
    check(free.length === plain.reduce((a, w) => a + w[2], 0), `${t.id} ${s.id}: free item count`);
    for (const [type, marks, of, attempt] of choice) {
      check(s.choice_groups.length === 1 && s.choice_groups[0].attempt === attempt, `${t.id} ${s.id}: choice group`);
      check(grouped.length === of && grouped.every((i) => qs.get(i.question_id).type === type && i.marks === marks), `${t.id} ${s.id}: choice items`);
    }
    if (!choice.length) check(!grouped.length && !s.choice_groups.length, `${t.id} ${s.id}: no choice expected`);
  }
}
fitCheck(T_SHORT, BP.short, BANK);
fitCheck(T_LONG, BP.long, BANK);
// Deck checks never appear in the tests; the tests share no question.
const inShort = new Set(T_SHORT.sections.flatMap((s) => s.items.map((i) => i.question_id)));
const inLong = new Set(T_LONG.sections.flatMap((s) => s.items.map((i) => i.question_id)));
check([...inShort].every((x) => !inLong.has(x)), 'tests are disjoint');
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inShort.has(s.check_question_id) && !inLong.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-accounts-ch12 only, with exactly the ratios the ISC 2027 syllabus lists: liquidity (current, quick), solvency (debt to equity, proprietary, debt to total assets, interest coverage), activity (trade receivables, trade payables, inventory, working capital turnover), profitability (gross profit, net profit, operating, operating profit, earnings per share, price-earnings, return on investment), and effects of transactions on the current, quick and debt-equity ratios only. Removed for ISC 2027 (effect-of-transaction problems on other ratios) appears only as one note in notes section 5',
    originality: 'every company, scenario and figure written for this chapter (imagined companies named after Indian dance forms); no textbook illustration or exercise and no CISCE specimen or past-paper item reused; companies and stems differ from the CBSE 12 Accountancy chapters and ISC ch01–ch11',
    accounts: `one set of definitions (acc.mjs) and two-decimal rounding; every balance sheet balances and capital employed is asserted equal three ways; every ratio computed from the givens and pinned to a hand-checked value; effects of transactions computed before and after as exact fractions; missing figures recomputed to the given ratios (Mohiniyattam ${fig(MO.total)}, capital employed ${fig(MO.ce)}, return on investment ${MO_roi.s}, earnings per share ${MO_eps.s}; ${FACTS.join('; ')})`,
    facts: 'debt = long-term borrowings + long-term provisions; quick assets exclude inventories and prepaid expenses; return on investment and interest coverage on profit before interest and tax; net profit ratio on profit after tax; earnings per share after preference dividend, per equity share; operating profit ratio = 100 − operating ratio',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
