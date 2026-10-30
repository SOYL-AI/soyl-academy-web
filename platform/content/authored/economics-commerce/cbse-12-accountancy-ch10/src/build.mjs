// Build CBSE 12 Accountancy ch10 Accounting Ratios. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch10', 'economics-commerce');
const { fig, rs, rupees, words, spoken, check, avg, pctOf, ratio, times, pct, show, pin, effects, delta, EFFECT_WORD, position, positionRows, posRatios, trading, results, resultRows, F } = await import('./acc.mjs');
const { FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- the case company: Narmada Agro Foods Ltd (imagined, Jabalpur)
const NA = position({ sc: 1000000, rs: 500000, ltb: 500000, ltp: 100000, tp: 240000, ocl: 60000, stp: 100000, ppe: 1500000, intang: 100000, nci: 100000, inv: 320000, tr: 280000, cce: 160000, prepaid: 40000, lab: { ltb: '10% Debentures', ltp: 'Long-term provisions (gratuity)' } });
check(NA.total === 2500000 && NA.ce === 2100000 && NA.nca + NA.wc === NA.ce && NA.quick === 440000, 'Narmada position');
const R = posRatios(NA);
pin(R.current, 2, 'Narmada current'); pin(R.quick, 1.1, 'Narmada quick'); pin(R.de, 0.4, 'Narmada debt-equity'); pin(R.tad, 4.17, 'Narmada total assets to debt'); pin(R.prop, 0.6, 'Narmada proprietary');
const NA_T = trading({ rev: 4000000, open: 280000, purchases: 2920000, direct: 120000, close: 320000 });
check(NA_T.close === NA.inv && NA_T.cost === 3000000, 'Narmada trading');
const NA_X = results({ rev: NA_T.rev, cost: NA_T.cost, opex: [['Employee benefits expense', 240000], ['Depreciation and amortisation', 120000], ['Other operating expenses', 240000]], oi: [['Interest received on investments', 20000]], nonop: [['Loss on sale of machinery', 20000]], interest: pctOf(10, NA.ltb), taxRate: 30 });
check(NA_X.pbit === 400000 && NA_X.pat === 245000, 'Narmada results');
const NA_C = { rev: 3200000, pur: 2400000, trOpen: 260000, tpOpen: 260000 };
const avgTR = avg(NA_C.trOpen, NA.tr);
const avgTP = avg(NA_C.tpOpen, NA.tp);
const NA_icr = pin(times(NA_X.pbit, NA_X.interest), 8, 'Narmada interest coverage');
const NA_itr = pin(times(NA_T.cost, NA_T.avgInv), 10, 'Narmada inventory turnover');
const NA_trt = pin(times(NA_C.rev, avgTR), 11.85, 'Narmada receivables turnover');
const NA_tpt = pin(times(NA_C.pur, avgTP), 9.6, 'Narmada payables turnover');
const NA_fat = pin(times(NA_T.rev, NA.fixed), 2.5, 'Narmada fixed asset turnover');
const NA_nat = pin(times(NA_T.rev, NA.ce), 1.9, 'Narmada net asset turnover');
const NA_wct = pin(times(NA_T.rev, NA.wc), 10, 'Narmada working capital turnover');
const NA_gp = pin(pct(NA_X.gp, NA_X.rev), 25, 'Narmada gross profit');
const NA_or = pin(pct(NA_X.opCost, NA_X.rev), 90, 'Narmada operating ratio');
const NA_opr = pin(pct(NA_X.opProfit, NA_X.rev), 10, 'Narmada operating profit ratio');
const NA_npr = pin(pct(NA_X.pat, NA_X.rev), 6.13, 'Narmada net profit after tax');
const NA_nprb = pin(pct(NA_X.pbt, NA_X.rev), 8.75, 'Narmada net profit before tax');
const NA_roi = pin(pct(NA_X.pbit, NA.ce), 19.05, 'Narmada return on investment');
check(NA_or.v + NA_opr.v === 100 && !NA_trt.exact && !NA_nat.exact && !R.tad.exact, 'Narmada checks');
// Per hundred rupees of revenue (for the bar chart).
const per100 = { cost: (NA_X.cost * 100) / NA_X.rev, opex: (NA_X.opexT * 100) / NA_X.rev, op: (NA_X.opProfit * 100) / NA_X.rev };
check(Object.values(per100).every(Number.isInteger) && per100.cost + per100.opex + per100.op === 100, 'per hundred');

// Effects of transactions on Narmada's current ratio.
const NA_EFF = effects('ratio', [NA.ca, NA.cl], [
  [`Pays trade payables ${rs(100000)}`, -100000, -100000, 'increase'],
  [`Buys goods on credit for ${rs(100000)}`, 100000, 100000, 'decrease'],
  [`Collects ${rs(50000)} from customers`, 0, 0, 'no change'],
  [`Buys a machine for ${rs(80000)} in cash`, -80000, 0, 'decrease'],
  [`Issues equity shares for ${rs(200000)} in cash`, 200000, 0, 'increase'],
]);

// Worked example 3: missing figures for Dudhganga Dairy Ltd (imagined, Kolhapur).
const DD = { crT: 26, qrT: 14, inv: 180000 };
DD.cl = (DD.inv * 10) / (DD.crT - DD.qrT);
check(Number.isInteger(DD.cl), 'Dudhganga CL');
DD.ca = (DD.cl * DD.crT) / 10;
DD.qa = (DD.cl * DD.qrT) / 10;
check(DD.ca - DD.qa === DD.inv && DD.cl === 150000, 'Dudhganga figures');
const DD_cr = pin(ratio(DD.ca, DD.cl), 2.6, 'Dudhganga CR');
const DD_qr = pin(ratio(DD.qa, DD.cl), 1.4, 'Dudhganga QR');

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['What a ratio is', 'Why and how ratios are grouped', 'Current and quick ratios', 'Effects of transactions', 'Solvency ratios', 'Missing figures'], 'Route map of Part 1: what a ratio is, why and how ratios are grouped, current and quick ratios, effects of transactions, solvency ratios and finding missing figures', 'Part 1 at a glance');
const vForms = table(
  ['Form', 'Example', 'Used mainly for'],
  [
    ['Pure ratio (x : 1)', `Current ratio ${R.current.s}`, 'Liquidity and solvency ratios'],
    ['Times', `Inventory turnover ${NA_itr.s}`, 'Activity (turnover) ratios, interest coverage'],
    ['Percentage', `Gross profit ratio ${NA_gp.s}`, 'Profitability ratios'],
  ],
  'Table of the three forms of expressing a ratio: a pure ratio such as two to one for liquidity and solvency, times such as ten times for turnover ratios, and a percentage such as twenty-five per cent for profitability ratios',
  'Rounding rule in this chapter: two decimal places, rounded half up.',
);
const vObjectives = table(
  ['Ratio analysis helps to…', 'Because…'],
  [
    ['Judge liquidity', 'it compares what can be turned into cash soon with what must be paid soon'],
    ['Judge solvency', 'it compares long-term debt with owners’ funds and assets'],
    ['Measure efficiency', 'it shows how many times resources are turned into revenue'],
    ['Measure profitability', 'it relates profit to revenue and to capital employed'],
    ['Compare and plan', 'ratios of different years and firms can be set side by side'],
    ['Locate weak spots', 'an unusual ratio points to the figure that needs attention'],
  ],
  'Table of objectives and advantages of ratio analysis: judge liquidity, judge solvency, measure efficiency, measure profitability, compare and plan, and locate weak spots',
);
const vFamilies = table(
  ['Family', 'Question it answers', 'Ratios', 'Reader most interested'],
  [
    ['Liquidity', 'Can short-term dues be paid?', 'Current ratio; quick ratio', 'Trade creditors, short-term lenders'],
    ['Solvency', 'Is the long-term structure safe?', 'Debt-equity; total assets to debt; proprietary; interest coverage', 'Debenture holders, long-term lenders'],
    ['Activity (turnover)', 'How hard are resources working?', 'Inventory, trade receivables, trade payables, fixed asset, net asset and working capital turnover', 'Management'],
    ['Profitability', 'How much does the business earn?', 'Gross profit, operating, operating profit and net profit ratios; return on investment', 'Shareholders, investors, management'],
  ],
  'Table of the four families of ratios: liquidity, solvency, activity and profitability, with the question each answers, the ratios in it and the reader most interested',
);
const vNarmadaBS = table(positionRows(NA).headers, positionRows(NA).rows, `Condensed balance sheet of Narmada Agro Foods as at 31 March 2026: shareholders' funds ${fig(NA.sf)}, non-current liabilities ${fig(NA.ncl)}, current liabilities ${fig(NA.cl)}; non-current assets ${fig(NA.nca)}, current assets ${fig(NA.ca)}; total ${fig(NA.total)}`, 'An imagined company; sub-head totals only.');
const vCurrent = table(
  ['Current assets (numerator)', 'Current liabilities (denominator)'],
  [
    ['Inventories', 'Short-term borrowings (overdraft, cash credit)'],
    ['Trade receivables (debtors + bills receivable)', 'Trade payables (creditors + bills payable)'],
    ['Cash and cash equivalents', 'Other current liabilities (outstanding expenses, unpaid dividend)'],
    ['Current investments; short-term loans and advances', 'Short-term provisions (provision for tax)'],
    ['Prepaid expenses and other current assets', ''],
  ],
  'Table of what goes into the current ratio: inventories, trade receivables, cash, current investments, short-term advances and prepaid expenses over short-term borrowings, trade payables, other current liabilities and short-term provisions',
  'Current ratio = current assets ÷ current liabilities; conventional level 2 : 1.',
);
const vQuick = table(
  ['Kept in quick assets', 'Taken out'],
  [
    ['Cash and cash equivalents', 'Inventories: must be sold first, perhaps on credit'],
    ['Trade receivables', 'Prepaid expenses: will never come back as cash'],
    ['Current investments (marketable securities)', ''],
    ['Short-term loans and advances, other current assets', ''],
  ],
  'Table of quick assets: cash, trade receivables, current investments and short-term advances are kept; inventories and prepaid expenses are taken out',
  'Quick ratio = quick assets ÷ current liabilities; conventional level 1 : 1.',
);
const vWE1 = table(
  ['Ratio', 'Working', 'Result'],
  [
    ['Current assets', `${fig(NA.inv)} + ${fig(NA.tr)} + ${fig(NA.cce)} + ${fig(NA.prepaid)}`, rs(NA.ca)],
    ['Quick assets', `${fig(NA.ca)} − ${fig(NA.inv)} − ${fig(NA.prepaid)}`, rs(NA.quick)],
    ['Current ratio', show(R.current), `**${R.current.s}**`],
    ['Quick ratio', show(R.quick), `**${R.quick.s}**`],
  ],
  `Working for the liquidity ratios of Narmada: current assets ${fig(NA.ca)}, quick assets ${fig(NA.quick)}, current liabilities ${fig(NA.cl)}; current ratio ${R.current.said}, quick ratio ${R.quick.said}`,
);
const vEffects = table(
  ['Transaction', 'Current assets', 'Current liabilities', 'New current ratio', 'Effect'],
  NA_EFF.rows.map((r) => [r.label, delta(r.dn), delta(r.dd), `${fig(r.n)} ÷ ${fig(r.d)} ${r.after.eq} ${r.after.s}`, EFFECT_WORD[r.e]]),
  `Table of the effect of five separate transactions on Narmada's current ratio of two to one: paying creditors raises it, buying goods on credit lowers it, collecting from customers leaves it unchanged, buying a machine for cash lowers it and issuing shares for cash raises it`,
  'Each transaction is taken separately, starting from 8,00,000 ÷ 4,00,000 = 2 : 1.',
);
check(NA.ca === 800000 && NA.cl === 400000, 'effects caption base');
const vSolvency = table(
  ['Ratio', 'Formula', 'A higher figure means…'],
  [
    ['Debt-equity', F.de, 'more reliance on borrowed long-term funds: riskier for lenders'],
    ['Total assets to debt', F.tad, 'more assets behind each rupee of debt: safer for lenders'],
    ['Proprietary', F.prop, 'owners finance more of the assets: safer for outsiders'],
    ['Interest coverage', F.icr, 'interest is easier to pay out of profit'],
  ],
  'Table of the four solvency ratios with their formulas and what a higher figure means: debt-equity, total assets to debt, proprietary and interest coverage',
  "Debt = long-term borrowings + long-term provisions; equity = shareholders' funds.",
);
const vICR = table(
  ['Narmada, year ended 31 March 2026', '₹'],
  [['Profit before interest and tax', fig(NA_X.pbit)], [`Interest on 10% debentures of ${fig(NA.ltb)}`, fig(NA_X.interest)], ['Interest coverage', `**${show(NA_icr)}**`]],
  `Working for interest coverage of Narmada: profit before interest and tax ${fig(NA_X.pbit)} divided by interest ${fig(NA_X.interest)} gives ${NA_icr.said}`,
);
const vWE2 = table(
  ['Ratio', 'Working', 'Result'],
  [
    ['Debt', `${fig(NA.ltb)} + ${fig(NA.ltp)}`, rs(NA.debt)],
    ["Equity (shareholders' funds)", `${fig(NA.sc)} + ${fig(NA.rs)}`, rs(NA.sf)],
    ['Debt-equity', show(R.de), `**${R.de.s}**`],
    ['Total assets to debt', show(R.tad), `**${R.tad.s}**`],
    ['Proprietary', show(R.prop), `**${R.prop.s}**`],
  ],
  `Working for the solvency ratios of Narmada: debt ${fig(NA.debt)}, equity ${fig(NA.sf)}, total assets ${fig(NA.total)}; debt-equity ${R.de.said}, total assets to debt ${R.tad.said}, proprietary ${R.prop.said}`,
);
const vMissing = table(
  ['Step', 'Working', 'Result'],
  [
    ['Gap between the ratios is caused by inventory', `${DD_cr.v} − ${DD_qr.v} = ${(DD.crT - DD.qrT) / 10}`, '—'],
    ['Current liabilities', `${fig(DD.inv)} ÷ ${(DD.crT - DD.qrT) / 10}`, rs(DD.cl)],
    ['Current assets', `${DD_cr.v} × ${fig(DD.cl)}`, rs(DD.ca)],
    ['Quick assets', `${DD_qr.v} × ${fig(DD.cl)}`, rs(DD.qa)],
    ['Check', `${show(DD_cr)}; ${show(DD_qr)}`, 'Both given ratios recovered'],
  ],
  `Steps for worked example 3: the gap of one point two between the current and quick ratios is caused by inventory of ${fig(DD.inv)}, so current liabilities are ${fig(DD.cl)}, current assets ${fig(DD.ca)} and quick assets ${fig(DD.qa)}`,
);
const vSummary1 = table(
  ['Ratio', 'Formula', 'Narmada'],
  [
    ['Current', F.current, R.current.s],
    ['Quick', F.quick, R.quick.s],
    ['Debt-equity', F.de, R.de.s],
    ['Total assets to debt', F.tad, R.tad.s],
    ['Proprietary', F.prop, R.prop.s],
    ['Interest coverage', F.icr, NA_icr.s],
  ],
  'Summary table of Part 1: formulas of the current, quick, debt-equity, total assets to debt, proprietary and interest coverage ratios with the values for Narmada',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Turnover ratios', 'Cost of revenue and averages', 'Capital employed both ways', 'Profitability ratios', 'Reading ratios together', 'Limitations'], 'Route map of Part 2: turnover ratios, cost of revenue and averages, capital employed both ways, profitability ratios, reading ratios together and limitations', 'Part 2 at a glance');
const vActivity = table(
  ['Turnover ratio', 'Flow of the year (numerator)', 'Resource (denominator)'],
  [
    ['Inventory', 'Cost of revenue from operations', 'Average inventory'],
    ['Trade receivables', 'Credit revenue from operations', 'Average trade receivables'],
    ['Trade payables', 'Net credit purchases', 'Average trade payables'],
    ['Fixed asset', 'Revenue from operations', 'Net fixed assets'],
    ['Net asset (capital employed)', 'Revenue from operations', 'Capital employed'],
    ['Working capital', 'Revenue from operations', 'Working capital'],
  ],
  'Table of the six turnover ratios, each a flow of the year over a resource: inventory, trade receivables, trade payables, fixed asset, net asset and working capital turnover',
  'All are expressed in times. Average = (opening + closing) ÷ 2.',
);
const vCost = table(
  ['Narmada, year ended 31 March 2026', '₹'],
  [
    ['Opening inventory', fig(NA_T.open)],
    ['Add: Purchases', fig(NA_T.purchases)],
    ['Add: Direct expenses (wages, carriage inwards)', fig(NA_T.direct)],
    ['Less: Closing inventory', fig(-NA_T.close)],
    ['**Cost of revenue from operations**', `**${fig(NA_T.cost)}**`],
    ['Check: revenue − gross profit', `${fig(NA_T.rev)} − ${fig(NA_T.gp)} = ${fig(NA_T.cost)}`],
    ['Average inventory', `(${fig(NA_T.open)} + ${fig(NA_T.close)}) ÷ 2 = ${fig(NA_T.avgInv)}`],
  ],
  `Working of the cost of revenue from operations of Narmada: opening inventory plus purchases plus direct expenses less closing inventory equals ${fig(NA_T.cost)}, which is also revenue less gross profit; average inventory ${fig(NA_T.avgInv)}`,
);
const vWE4 = table(
  ['Ratio', 'Working', 'Result'],
  [
    ['Inventory turnover', show(NA_itr), `**${NA_itr.s}**`],
    ['Trade receivables turnover', `${show(NA_trt)} (average of ${fig(NA_C.trOpen)} and ${fig(NA.tr)})`, `**${NA_trt.s}**`],
    ['Trade payables turnover', `${show(NA_tpt)} (average of ${fig(NA_C.tpOpen)} and ${fig(NA.tp)})`, `**${NA_tpt.s}**`],
  ],
  `Working for the inventory, trade receivables and trade payables turnover of Narmada: ${NA_itr.said}, ${NA_trt.said} and ${NA_tpt.said}`,
  `Credit revenue ${rs(NA_C.rev)}; credit purchases ${rs(NA_C.pur)}.`,
);
const vCE = table(
  ['From the liabilities side', '₹', 'From the assets side', '₹'],
  [
    ["Shareholders' funds", fig(NA.sf), 'Non-current assets', fig(NA.nca)],
    ['Add: Non-current liabilities', fig(NA.ncl), 'Add: Working capital (current assets − current liabilities)', fig(NA.wc)],
    ['**Capital employed**', `**${fig(NA.ce)}**`, '**Capital employed**', `**${fig(NA.nca + NA.wc)}**`],
  ],
  `Capital employed of Narmada worked out two ways: shareholders' funds plus non-current liabilities, and non-current assets plus working capital, both give ${fig(NA.ce)}`,
  'The two routes must agree; if they do not, an item has been misplaced.',
);
const vWE5 = table(
  ['Ratio', 'Working', 'Result'],
  [
    ['Fixed asset turnover', `${show(NA_fat)} (net fixed assets ${fig(NA.ppe)} + ${fig(NA.intang)})`, `**${NA_fat.s}**`],
    ['Net asset turnover', show(NA_nat), `**${NA_nat.s}**`],
    ['Working capital turnover', show(NA_wct), `**${NA_wct.s}**`],
  ],
  `Working for the fixed asset, net asset and working capital turnover of Narmada: ${NA_fat.said}, ${NA_nat.said} and ${NA_wct.said}`,
);
const vOpStmt = table(resultRows(NA_X).headers, resultRows(NA_X).rows, `Operating statement of Narmada: revenue ${fig(NA_X.rev)}, gross profit ${fig(NA_X.gp)}, operating profit ${fig(NA_X.opProfit)}, profit before interest and tax ${fig(NA_X.pbit)}, profit before tax ${fig(NA_X.pbt)} and profit after tax ${fig(NA_X.pat)}`, 'Interest received and the loss on sale of machinery are non-operating.');
const vBar = (() => {
  const s = new Svg(600, 200);
  const X0 = 40;
  const W = 520;
  const segs = [['Cost of revenue from operations', per100.cost, 'blue'], ['Operating expenses', per100.opex, 'yellow'], ['Operating profit', per100.op, 'green']];
  let x = X0;
  for (const [label, v, c] of segs) {
    const w = (W * v) / 100;
    s.rect(x, 60, w, 56, { fill: c, color: c, sw: 1, rx: 2, fillOpacity: 0.35 });
    s.text(x + w / 2, 88, `₹${v}`, { size: 15, bold: true });
    s.text(x + w / 2, x === X0 ? 40 : 136 + (label === 'Operating profit' ? 18 : 0), label, { size: 12 });
    x += w;
  }
  check(Math.abs(x - (X0 + W)) < 1e-9, 'bar segments fill the width');
  s.line(X0 + (W * (per100.cost + per100.opex)) / 100, 52, X0 + (W * (per100.cost + per100.opex)) / 100, 124, { sw: 2, dash: true, color: 'red' });
  s.text(300, 186, `Operating ratio ${NA_or.s} + operating profit ratio ${NA_opr.s} = 100%`, { size: 13, bold: true });
  return s.visual(
    `Bar showing what happens to every hundred rupees of Narmada's revenue: ${words(per100.cost)} rupees cost of revenue from operations, ${words(per100.opex)} rupees operating expenses and ${words(per100.op)} rupees operating profit, so the operating ratio is ${NA_or.said} and the operating profit ratio ${NA_opr.said}`,
    'Segment widths are computed from the operating statement.',
  );
})();
const vWE6 = table(
  ['Ratio', 'Working', 'Result'],
  [
    ['Gross profit ratio', show(NA_gp), `**${NA_gp.s}**`],
    ['Operating ratio', show(NA_or), `**${NA_or.s}**`],
    ['Operating profit ratio', show(NA_opr), `**${NA_opr.s}**`],
    ['Net profit ratio (after tax)', show(NA_npr), `**${NA_npr.s}**`],
    ['Net profit ratio (before tax)', show(NA_nprb), `**${NA_nprb.s}**`],
    ['Return on investment', show(NA_roi), `**${NA_roi.s}**`],
  ],
  `Working for the profitability ratios of Narmada: gross profit ${NA_gp.said}, operating ratio ${NA_or.said}, operating profit ratio ${NA_opr.said}, net profit after tax ${NA_npr.said}, before tax ${NA_nprb.said}, return on investment ${NA_roi.said}`,
);
const vInterpret = table(
  ['Ratio', 'Narmada', 'Compared with', 'Reading'],
  [
    ['Current ratio', R.current.s, '2 : 1 (convention)', 'Comfortable short-term position'],
    ['Quick ratio', R.quick.s, '1 : 1 (convention)', 'Can pay current dues without selling stock'],
    ['Debt-equity', R.de.s, 'Industry practice; lower is safer', 'Modest borrowing'],
    ['Interest coverage', NA_icr.s, 'The higher the safer', 'Interest well covered'],
    ['Inventory turnover', NA_itr.s, 'Last year; similar firms', 'Stock sold about every five weeks'],
    ['Return on investment', NA_roi.s, 'Cost of borrowing (10%)', 'Long-term funds earn more than they cost'],
  ],
  'Interpretation table for Narmada: current and quick ratios meet the conventions, borrowing is modest and interest well covered, inventory turns over ten times a year, and return on investment is above the cost of borrowing',
  'A ratio is read against a benchmark, a past year or similar firms.',
);
check(Math.round(52 / NA_itr.v) === 5, 'five weeks');
const vLimits = table(
  ['Limitation', 'Why it matters'],
  [
    ['Past figures', 'Ratios describe what has happened, not what will happen'],
    ['Inflation ignored', 'Old assets at cost make turnover and returns look higher'],
    ['Qualitative factors left out', 'Skill of managers, morale and brand do not show in ratios'],
    ['Different accounting policies', 'Depreciation or inventory methods differ between firms'],
    ['Window dressing', 'Year-end figures can be tidied up to flatter the ratios'],
    ['No universal standard', 'A healthy figure for one industry may be weak for another'],
  ],
  'Table of limitations of ratio analysis: past figures, inflation ignored, qualitative factors left out, different accounting policies, window dressing and no universal standard',
);
const vSummary2 = table(
  ['Ratio', 'Formula', 'Narmada'],
  [
    ['Inventory turnover', F.itr, NA_itr.s],
    ['Trade receivables turnover', F.trt, NA_trt.s],
    ['Trade payables turnover', F.tpt, NA_tpt.s],
    ['Fixed asset turnover', F.fat, NA_fat.s],
    ['Net asset turnover', F.nat, NA_nat.s],
    ['Working capital turnover', F.wct, NA_wct.s],
    ['Gross profit', F.gp, NA_gp.s],
    ['Operating ratio', F.or, NA_or.s],
    ['Operating profit', F.opr, NA_opr.s],
    ['Net profit (after tax)', F.npr, NA_npr.s],
    ['Return on investment', F.roi, NA_roi.s],
  ],
  'Summary table of Part 2: formulas of the six turnover ratios and the five profitability ratios with the values for Narmada',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Accounting Ratios — Part 1: Meaning, Classification, Liquidity and Solvency Ratios',
  goals: [
    'Explain what accounting ratios are, how they are expressed and why they are used',
    'Classify ratios into liquidity, solvency, activity and profitability ratios',
    'Compute and interpret the current ratio and the quick ratio, and the effect of transactions on them',
    'Compute and interpret the debt-equity, total assets to debt, proprietary and interest coverage ratios',
  ],
  slides: [
    sl('title', 'Accounting Ratios', {
      b: 'Part 1 — what ratios are, how they are grouped, and the **liquidity** and **solvency** ratios of an imagined company.',
      v: vRoute1,
      n: 'A figure in a balance sheet means little on its own. Are current liabilities of four lakh rupees large or small? It depends on what the company holds to pay them. Accounting ratios set two related figures side by side. In this part we learn what ratios are and why we use them, and then work out the liquidity and solvency ratios of an imagined company, Narmada Agro Foods.',
    }),
    sl('concept', 'What is an accounting ratio?', {
      v: vForms,
      bl: ['A ratio relates **two figures** from the financial statements.', '**Ratio analysis**: computing, comparing and interpreting ratios.'],
      n: `An accounting ratio is a relationship between two figures taken from the financial statements. It can be written in three ways: as a pure ratio, such as ${R.current.said} for a current ratio; as a number of times, such as ${NA_itr.said} for inventory turnover; or as a percentage, such as ${NA_gp.said} for a gross profit ratio. In this chapter every ratio is worked to two decimal places.`,
    }),
    sl('concept', 'Why analyse ratios?', {
      v: vObjectives,
      n: 'Why take the trouble? Ratios turn pages of figures into a few clear signals. They tell us whether a company can pay its short-term debts, whether its long-term structure is safe, how hard its resources are working and how much it earns. They let us compare years and firms, and they point management to weak spots. But they rest on past figures and cannot remove the effect of inflation.',
    }),
    sl('check', 'Quick check: what ratios cannot do', {
      b: 'One claim on the finance manager’s list goes too far.',
      chk: 'm_objective_ratio',
      n: 'Read the four claims. Which one asks the ratios to do something the figures behind them cannot do?',
    }),
    sl('concept', 'Four families of ratios', {
      v: vFamilies,
      n: 'Ratios fall into four families. Liquidity ratios ask whether short-term debts can be paid. Solvency ratios ask whether the long-term structure is safe. Activity ratios, also called turnover ratios, ask how efficiently resources are used. Profitability ratios ask how much the business earns. Each family speaks most to a different reader: creditors, lenders, management and shareholders.',
    }),
    sl('concept', 'Our case company: Narmada Agro Foods Ltd', {
      v: vNarmadaBS,
      n: `Meet Narmada Agro Foods, an imagined company in Jabalpur. Its balance sheet totals ${rupees(NA.total)}. Shareholders' funds are ${rupees(NA.sf)}, long-term debt is ${rupees(NA.debt)} and current liabilities are ${rupees(NA.cl)}. Non-current assets are ${rupees(NA.nca)} and current assets ${rupees(NA.ca)}. We will compute all its ratios from these figures and its statement of profit and loss.`,
    }),
    sl('concept', 'Liquidity: the current ratio', {
      v: vCurrent,
      bl: ['Around **2 : 1** is the traditional comfort level.', 'Too low: dues may not be met. Too high: idle cash, slow stock or poor collection.'],
      n: 'The current ratio divides current assets by current liabilities. Current assets are inventories, trade receivables, cash, current investments, short-term advances and prepaid expenses. Current liabilities are short-term borrowings, trade payables, other current liabilities and short-term provisions. Two to one is the traditional comfort level. Much lower may mean trouble paying bills; much higher may mean idle cash or unsold stock.',
    }),
    sl('concept', 'Liquidity: the quick (liquid) ratio', {
      v: vQuick,
      n: 'The quick ratio is a sharper test. It keeps only the assets that can become cash almost at once. So we take current assets and remove inventories, which must first be sold, and prepaid expenses, which will never come back as cash. The result, quick assets, is divided by current liabilities. A quick ratio of one to one is the usual benchmark.',
    }),
    sl('example', 'Worked example 1: liquidity ratios of Narmada', {
      b: `Narmada (imagined): current assets ${rs(NA.ca)}, of which inventories ${rs(NA.inv)} and prepaid expenses ${rs(NA.prepaid)}; current liabilities ${rs(NA.cl)}.`,
      v: vWE1,
      n: `For Narmada, current assets of ${rupees(NA.ca)} divided by current liabilities of ${rupees(NA.cl)} give a current ratio of ${R.current.said}. Quick assets are current assets less inventories and prepaid expenses, which leaves ${rupees(NA.quick)}. Divided by current liabilities, that gives a quick ratio of ${R.quick.said}. Both meet the usual benchmarks, so Narmada can comfortably pay its short-term debts.`,
    }),
    sl('check', 'Quick check: the quick ratio', {
      b: 'Fill in the blank.',
      chk: 'fb_quick',
      n: 'Complete the formula. Quick assets are compared with which group of liabilities?',
    }),
    sl('concept', 'How a transaction moves the current ratio', {
      v: vEffects,
      bl: ['Recompute with the **new** figures; never guess.', 'With the ratio above 1, an equal rise in both parts lowers it and an equal fall raises it.'],
      n: `Transactions move ratios. Start from Narmada's current ratio of ${R.current.said}. Paying a creditor lowers both parts by the same amount, and with the ratio above one, that raises it. Buying goods on credit raises both parts and lowers it. Collecting cash from a customer swaps one current asset for another, so nothing changes. Buying a machine for cash takes money out of current assets.`,
    }),
    sl('check', 'Quick check: paying the suppliers', {
      b: 'Work out the new current ratio after the payment.',
      chk: 'm_cr_effect',
      n: 'Work out the new current assets and the new current liabilities after the payment, then divide.',
    }),
    sl('concept', 'Solvency: debt, equity and total assets', {
      v: vSolvency,
      n: "Solvency ratios look at the long term. Debt means long-term borrowings plus long-term provisions. Equity means shareholders' funds. The debt-equity ratio divides debt by equity; a lower figure means lenders are safer. The total assets to debt ratio shows how many rupees of assets stand behind each rupee of debt. The proprietary ratio shows what share of total assets the owners have financed.",
    }),
    sl('concept', 'Solvency: interest coverage', {
      v: vICR,
      n: `The interest coverage ratio asks how many times the profit before interest and tax covers the interest on long-term debt. Narmada earns ${rupees(NA_X.pbit)} before interest and tax and pays ${rupees(NA_X.interest)} of interest on its debentures, so interest is covered ${NA_icr.said}. The higher the figure, the more easily the company can keep paying its lenders even if profits fall.`,
    }),
    sl('example', 'Worked example 2: solvency ratios of Narmada', {
      b: `Narmada (imagined): share capital ${rs(NA.sc)}, reserves and surplus ${rs(NA.rs)}, 10% debentures ${rs(NA.ltb)}, long-term provisions ${rs(NA.ltp)}, total assets ${rs(NA.total)}.`,
      v: vWE2,
      n: `Narmada's debt is ${rupees(NA.debt)} and its equity ${rupees(NA.sf)}, so the debt-equity ratio is ${R.de.said}. Total assets of ${rupees(NA.total)} divided by debt give ${R.tad.said}, after rounding. Equity divided by total assets gives a proprietary ratio of ${R.prop.said}. Owners have financed most of the assets, so the long-term position is strong.`,
    }),
    sl('check', 'Quick check: what counts as debt?', {
      b: 'Choose the definition used in this chapter.',
      chk: 'm_debt_def',
      n: 'Think about which liabilities run for more than a year.',
    }),
    sl('example', 'Worked example 3: finding missing figures', {
      b: `An imagined company, **Dudhganga Dairy Ltd**, Kolhapur, has a current ratio of ${DD_cr.s}, a quick ratio of ${DD_qr.s}, inventories of ${rs(DD.inv)} and no prepaid expenses. Find its current liabilities, current assets and quick assets.`,
      v: vMissing,
      n: `Sometimes the ratios are given and a figure is missing. Dudhganga has a current ratio of ${DD_cr.said} and a quick ratio of ${DD_qr.said}, inventories of ${rupees(DD.inv)} and no prepaid expenses. The gap between the two ratios, ${spoken((DD.crT - DD.qrT) / 10)}, comes only from inventory. So current liabilities are ${rupees(DD.cl)}, current assets ${rupees(DD.ca)} and quick assets ${rupees(DD.qa)}. Recomputing both ratios confirms it.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: ratios relate two figures and are written as a proportion, in times or as a percentage. Liquidity ratios compare current or quick assets with current liabilities. Solvency ratios compare debt with equity and with total assets, equity with total assets, and profit before interest and tax with interest. Always see how a transaction changes both parts of a ratio before deciding whether it rises or falls.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **formula → working → answer**; each carries marks.',
        'State the result in the right form: **x : 1**, **times** or **%**, to two decimal places.',
        'Show **quick assets** and **debt** as separate workings.',
        'For a transaction, **recompute** the ratio with the new figures and compare.',
        'Missing figures: build equations from the ratios, then **recompute** the given ratios as a check.',
      ],
      n: 'In the exam, write the formula first, then the working, then the answer. State the result in the right form, to one, times or per cent, rounded to two decimal places. Show quick assets and debt as separate workings, because they carry marks. For a transaction question, recompute the ratio with the new figures rather than guessing, and check any missing figure by recomputing the given ratios.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Accounting Ratios — Part 2: Activity and Profitability Ratios, Interpretation and Limitations',
  goals: [
    'Compute inventory, trade receivables, trade payables, fixed asset, net asset and working capital turnover ratios',
    'Work out capital employed in two ways and check that they agree',
    'Compute the gross profit, operating, operating profit and net profit ratios and the return on investment',
    'Interpret a set of ratios and state the limitations of ratio analysis',
  ],
  slides: [
    sl('title', 'Activity and profitability ratios', {
      b: 'Part 2 — **turnover** ratios, **profitability** ratios, reading ratios together, and their **limitations**.',
      v: vRoute2,
      n: 'In part one we asked whether a company can pay its debts. Now we ask how well it uses its resources and how much it earns. Activity ratios measure how many times inventory, receivables, payables and assets are turned over in a year. Profitability ratios measure profit against revenue and against capital employed. We continue with Narmada Agro Foods, and end with how to read ratios and where they fall short.',
    }),
    sl('concept', 'Activity ratios: how hard do resources work?', {
      v: vActivity,
      n: 'Every activity ratio sets a flow of the year against the resource behind it. Inventory turnover sets the cost of revenue from operations against average inventory. Receivables turnover sets credit revenue against average trade receivables. Payables turnover sets credit purchases against average trade payables. Fixed asset, net asset and working capital turnover set revenue from operations against those resources. Each is expressed in times.',
    }),
    sl('concept', 'Cost of revenue from operations and average inventory', {
      v: vCost,
      n: `Inventory is valued at cost, so inventory turnover uses the cost of revenue from operations, not revenue. For Narmada, opening inventory plus purchases plus direct expenses, less closing inventory, gives a cost of ${rupees(NA_T.cost)}. That also equals revenue less gross profit. Average inventory is the opening and closing figures added together and halved, which gives ${rupees(NA_T.avgInv)}.`,
    }),
    sl('example', 'Worked example 4: inventory, receivables and payables turnover', {
      b: `Narmada (imagined): credit revenue ${rs(NA_C.rev)}; credit purchases ${rs(NA_C.pur)}; trade receivables ${rs(NA_C.trOpen)} at the start and ${rs(NA.tr)} at the end of the year; trade payables ${rs(NA_C.tpOpen)} and ${rs(NA.tp)}.`,
      v: vWE4,
      n: `Narmada's inventory turned over ${NA_itr.said} in the year. Credit revenue of ${rupees(NA_C.rev)} against average trade receivables of ${rupees(avgTR)} gives ${NA_trt.said}, after rounding. Credit purchases of ${rupees(NA_C.pur)} against average trade payables of ${rupees(avgTP)} give ${NA_tpt.said}. Customers pay Narmada a little faster than Narmada pays its suppliers, which is a comfortable position.`,
    }),
    sl('check', 'Quick check: the cost of revenue', {
      b: 'Choose how the cost of revenue from operations is found.',
      chk: 'm_cost_rev',
      n: 'Gross profit is what is left of revenue after one particular cost. Which one?',
    }),
    sl('concept', 'Capital employed: two routes, one answer', {
      v: vCE,
      n: `Capital employed is the long-term money in the business. From the liabilities side it is shareholders' funds plus non-current liabilities: for Narmada, ${rupees(NA.ce)}. From the assets side it is non-current assets plus working capital, and that gives exactly the same figure. If your two answers differ, an item has been put in the wrong place.`,
    }),
    sl('example', 'Worked example 5: fixed asset, net asset and working capital turnover', {
      b: `Narmada (imagined): revenue from operations ${rs(NA_T.rev)}; net fixed assets ${rs(NA.fixed)}; capital employed ${rs(NA.ce)}; working capital ${rs(NA.wc)}.`,
      v: vWE5,
      n: `Revenue from operations of ${rupees(NA_T.rev)} is ${NA_fat.said} the net fixed assets of ${rupees(NA.fixed)}, ${NA_nat.said} the capital employed after rounding, and ${NA_wct.said} the working capital of ${rupees(NA.wc)}. A higher turnover means the same resources are producing more revenue, so these ratios are best compared with earlier years and with similar firms.`,
    }),
    sl('check', 'Quick check: match the formulas', {
      b: 'Match each turnover ratio with its formula.',
      chk: 'mt_turnover',
      n: 'For each ratio, ask which flow of the year and which resource are being compared.',
    }),
    sl('concept', 'Profitability: the operating statement', {
      v: vOpStmt,
      n: `Profitability ratios are measured on revenue from operations. Narmada's gross profit is ${rupees(NA_X.gp)}. Taking away operating expenses, that is employee benefits, depreciation and other operating costs, leaves an operating profit of ${rupees(NA_X.opProfit)}. Non-operating items, such as interest received and a loss on selling a machine, come next, giving profit before interest and tax. Then interest and tax leave the profit after tax.`,
    }),
    sl('concept', 'Operating ratio and operating profit ratio', {
      v: vBar,
      n: `Think of every hundred rupees of revenue. For Narmada, ${words(per100.cost)} rupees go on the cost of revenue from operations and ${words(per100.opex)} rupees on operating expenses. That makes an operating ratio of ${NA_or.said}. What is left, ${words(per100.op)} rupees, is operating profit, so the operating profit ratio is ${NA_opr.said}. The two always add up to one hundred.`,
    }),
    sl('example', 'Worked example 6: profitability ratios of Narmada', {
      b: `Narmada (imagined): revenue from operations ${rs(NA_X.rev)}; gross profit ${rs(NA_X.gp)}; operating profit ${rs(NA_X.opProfit)}; profit before interest and tax ${rs(NA_X.pbit)}; profit before tax ${rs(NA_X.pbt)}; profit after tax ${rs(NA_X.pat)}; capital employed ${rs(NA.ce)}.`,
      v: vWE6,
      n: `Narmada's gross profit ratio is ${NA_gp.said}. Its net profit ratio after tax is ${NA_npr.said} after rounding, and before tax it is ${NA_nprb.said}. Return on investment divides profit before interest and tax by capital employed: ${rupees(NA_X.pbit)} on ${rupees(NA.ce)}, which is ${NA_roi.said}. That is well above the ${words(10)} per cent interest it pays on its debentures.`,
    }),
    sl('check', 'Quick check: operating profit ratio', {
      b: 'Use the link between the two operating ratios.',
      chk: 'm_op_ratio_link',
      n: 'Operating cost and operating profit together make up the whole of revenue from operations.',
    }),
    sl('concept', 'Reading the ratios together', {
      v: vInterpret,
      n: `A ratio means something only when it is compared: with a benchmark, with last year, or with similar firms. Narmada's liquidity meets the usual benchmarks, its debt is modest and well covered, its stock turns over ${NA_itr.said} a year, and it earns a healthy return on capital employed. A single figure is never the whole story, so read the four families together.`,
    }),
    sl('concept', 'Limitations of ratio analysis', {
      v: vLimits,
      n: 'Ratios have limits. They come from past figures and ignore inflation. They leave out quality, such as the skill of managers. Firms use different accounting policies, so their ratios are not always comparable. Year-end figures can be dressed up. And there is no single correct value for most ratios: what is healthy for a retailer may be poor for a steel plant.',
    }),
    sl('check', 'Quick check: a tidy year end', {
      b: 'True or false?',
      chk: 'tf_window',
      n: 'Think about what happens if a company tidies up its figures just before the balance sheet date.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: "To sum up: activity ratios divide a flow of the year by the resource behind it and are expressed in times, using averages for inventory, receivables and payables. Capital employed is shareholders' funds plus non-current liabilities, and must equal non-current assets plus working capital. Profitability ratios are percentages of revenue from operations, except return on investment, which relates profit before interest and tax to capital employed.",
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Inventory turnover uses **cost** of revenue from operations and **average** inventory.',
        'Use **credit** revenue and **credit** purchases for receivables and payables turnover (total, if credit is not given).',
        'Leave **non-operating** items out of the operating ratio.',
        'Add back **interest and tax** to reach profit before interest and tax.',
        'Compute **capital employed both ways** as a check.',
      ],
      n: 'Use the cost of revenue from operations for inventory turnover, credit figures for receivables and payables, and averages wherever opening and closing figures are given. Leave non-operating items out of the operating ratio. Add back interest and tax to reach profit before interest and tax. Compute capital employed both ways as a check. And when you interpret, compare with a benchmark or with last year.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const vDefs = table(
  ['Term', 'Definition used in this chapter'],
  [
    ['Quick assets', 'Current assets − inventories − prepaid expenses'],
    ['Debt', 'Long-term borrowings + long-term provisions (non-current liabilities)'],
    ['Equity', "Shareholders' funds = share capital + reserves and surplus"],
    ['Total assets', 'Non-current assets + current assets'],
    ['Working capital', 'Current assets − current liabilities'],
    ['Capital employed', "Shareholders' funds + non-current liabilities = non-current assets + working capital"],
    ['Net fixed assets', 'Property, plant and equipment and intangible assets, after depreciation'],
    ['Cost of revenue from operations', 'Opening inventory + purchases + direct expenses − closing inventory (= revenue − gross profit)'],
    ['Average (inventory, receivables, payables)', '(Opening + closing) ÷ 2'],
    ['Trade receivables / payables', 'Debtors + bills receivable / creditors + bills payable'],
    ['Operating expenses', 'Employee benefits, depreciation and amortisation, other operating (office, selling) expenses'],
    ['Profit before interest and tax', 'Operating profit + non-operating income − non-operating expenses (= profit before tax + interest)'],
  ],
  'Table of the definitions used throughout the chapter: quick assets, debt, equity, total assets, working capital, capital employed, net fixed assets, cost of revenue from operations, averages, trade receivables and payables, operating expenses and profit before interest and tax',
  'One set of definitions; every ratio in this chapter follows it.',
);
const vFormulas = table(['Ratio', 'Formula'], Object.entries({
  'Current ratio': F.current, 'Quick ratio': F.quick, 'Debt-equity ratio': F.de, 'Total assets to debt ratio': F.tad, 'Proprietary ratio': F.prop, 'Interest coverage ratio': F.icr,
  'Inventory turnover': F.itr, 'Trade receivables turnover': F.trt, 'Trade payables turnover': F.tpt, 'Fixed asset turnover': F.fat, 'Net asset turnover': F.nat, 'Working capital turnover': F.wct,
  'Gross profit ratio': F.gp, 'Operating ratio': F.or, 'Operating profit ratio': F.opr, 'Net profit ratio': F.npr, 'Return on investment': F.roi,
}), 'Formula table of all seventeen ratios in the chapter: two liquidity, four solvency, six activity and five profitability ratios');
check(vFormulas.spec.rows.length === 17, 'seventeen formulas');

const N = notes({
  title: 'Accounting Ratios — Notes',
  sections: [
    {
      h: '1. Accounting ratios and ratio analysis',
      t: [1, 2, 3, 4],
      b: 'An **accounting ratio** expresses the relationship between two related figures from the financial statements (for example current assets and current liabilities). **Ratio analysis** means computing such ratios, comparing them (with past years, with other firms, with accepted standards) and interpreting them.\n\n**Forms:** pure ratio (2 : 1), times (10 times), percentage (25%).\n\n**Objectives and advantages:**\n- to judge **liquidity** (short-term paying capacity) and **solvency** (long-term soundness);\n- to measure **efficiency** in using inventory, receivables and assets, and **profitability**;\n- to summarise many figures in a few relationships that are easy to communicate;\n- to make **inter-period** and **inter-firm** comparison possible and to help in planning and forecasting;\n- to point out weak areas that need management action.\n\n**Classification (by purpose):** liquidity, solvency, activity (turnover) and profitability ratios.',
      terms: [
        ['Accounting ratio', 'A mathematical relationship between two related figures in the financial statements.'],
        ['Ratio analysis', 'Computing, comparing and interpreting accounting ratios to judge a business.'],
        ['Inter-firm comparison', 'Comparing the ratios of one firm with those of similar firms.'],
      ],
      v: vFamilies,
      vs: [vForms, vObjectives],
    },
    {
      h: '2. One set of definitions and the rounding rule',
      t: [1, 2, 3, 4],
      b: '**Definitions.** The table sets out what each base means in this chapter, and the second table gives all seventeen formulas. Note especially:\n- **Debt** is the non-current liabilities only; current liabilities never enter solvency ratios.\n- **Capital employed** can be worked out from either side of the balance sheet; the two answers must be equal, which is a useful check.\n- **Operating expenses** do not include finance costs or non-operating losses (loss on sale of a fixed asset, loss by fire); non-operating income (interest or dividend received, profit on sale of an asset) is also left out of operating profit.\n- When credit revenue or credit purchases are not given, the total figure is used; when only closing figures are given, they replace the average.\n\n**Rounding rule.** Ratios are worked to **two decimal places**, rounded half up (1.2667 → 1.27; 6.125 → 6.13). An exact result is written as it is (2.5 : 1, 25%). Write liquidity and solvency ratios as "x : 1", turnover ratios and interest coverage in "times", and profitability ratios as percentages.',
      terms: [
        ['Capital employed', "Shareholders' funds + non-current liabilities, equal to non-current assets + working capital."],
        ['Working capital', 'Current assets minus current liabilities.'],
        ['Cost of revenue from operations', 'Cost of the goods sold: revenue from operations less gross profit.'],
      ],
      v: vDefs,
      vs: [vFormulas],
    },
    {
      h: '3. Liquidity ratios',
      t: 1,
      b: '**Current ratio = current assets ÷ current liabilities.** Conventional level **2 : 1**. A low ratio warns of difficulty in paying dues; a very high one suggests idle cash, excess stock or slow collection.\n\n**Quick (liquid) ratio = quick assets ÷ current liabilities**, where quick assets = current assets − inventories − prepaid expenses. Conventional level **1 : 1**. It tests whether dues can be met without depending on the sale of stock.\n\n**Effect of a transaction:** recompute both parts. Rules that follow from the arithmetic (check them on the table):\n- an equal **rise** in both parts **lowers** a ratio above 1 and **raises** a ratio below 1;\n- an equal **fall** in both parts **raises** a ratio above 1 and **lowers** a ratio below 1;\n- an exchange of one current asset for another leaves the current ratio unchanged (but cash for inventory lowers the quick ratio).',
      terms: [
        ['Current ratio', 'Current assets ÷ current liabilities; a test of short-term solvency.'],
        ['Quick assets', 'Current assets other than inventories and prepaid expenses.'],
        ['Liquidity', 'Ability to meet obligations falling due within the operating cycle or twelve months.'],
      ],
      v: vWE1,
      vs: [vCurrent, vQuick, vEffects],
    },
    {
      h: '4. Solvency ratios',
      t: 2,
      b: "**Debt-equity ratio = debt ÷ equity** (debt = long-term borrowings + long-term provisions; equity = shareholders' funds). A low ratio means a larger safety margin for lenders; a high ratio means heavy dependence on borrowed funds and a larger fixed interest burden.\n\n**Total assets to debt ratio = total assets ÷ debt.** The higher it is, the better covered the long-term lenders are.\n\n**Proprietary ratio = shareholders' funds ÷ total assets.** It shows the share of assets financed by owners; a higher ratio means greater long-term safety for creditors.\n\n**Interest coverage ratio = profit before interest and tax ÷ interest on long-term debt** (in times). It shows how many times interest is earned; a high figure reassures lenders that interest will be paid even if profits fall.",
      terms: [
        ['Debt', 'Long-term borrowings plus long-term provisions.'],
        ['Proprietary ratio', "Shareholders' funds as a proportion of total assets."],
        ['Interest coverage', 'Times the interest on long-term debt is covered by profit before interest and tax.'],
      ],
      v: vWE2,
      vs: [vSolvency, vICR],
    },
    {
      h: '5. Activity (turnover) ratios',
      t: 3,
      b: '- **Inventory turnover = cost of revenue from operations ÷ average inventory.** A higher figure means faster-moving stock; a very high one can mean stock too thin to meet demand.\n- **Trade receivables turnover = credit revenue from operations ÷ average trade receivables.** Higher means quicker collection.\n- **Trade payables turnover = net credit purchases ÷ average trade payables.** Higher means suppliers are paid quickly; lower means the firm takes longer credit.\n- **Fixed asset turnover = revenue from operations ÷ net fixed assets.**\n- **Net asset (capital employed) turnover = revenue from operations ÷ capital employed.**\n- **Working capital turnover = revenue from operations ÷ working capital.**\n\nAll are in **times**. Revenue from operations is net of sales returns; credit purchases are net of purchases returns.',
      terms: [
        ['Inventory turnover', 'Times the average inventory is sold and replaced in a year.'],
        ['Trade receivables turnover', 'Times the average receivables are collected in a year.'],
        ['Net asset turnover', 'Revenue from operations generated per rupee of capital employed.'],
      ],
      v: vWE4,
      vs: [vActivity, vCost, vCE, vWE5],
    },
    {
      h: '6. Profitability ratios',
      t: 4,
      b: '- **Gross profit ratio = gross profit ÷ revenue from operations × 100.**\n- **Operating ratio = (cost of revenue from operations + operating expenses) ÷ revenue from operations × 100.**\n- **Operating profit ratio = operating profit ÷ revenue from operations × 100 = 100 − operating ratio.**\n- **Net profit ratio = net profit ÷ revenue from operations × 100**, computed on profit before tax or on profit after tax as the question asks.\n- **Return on investment (return on capital employed) = profit before interest and tax ÷ capital employed × 100.**\n\nGross and operating ratios ignore non-operating items; the net profit ratio includes them. Return on investment uses profit before interest because capital employed includes the lenders’ money.',
      terms: [
        ['Operating ratio', 'Operating cost as a percentage of revenue from operations.'],
        ['Operating profit', 'Gross profit minus operating expenses.'],
        ['Return on investment', 'Profit before interest and tax as a percentage of capital employed.'],
      ],
      v: vOpStmt,
      vs: [vBar, vWE6],
    },
    {
      h: '7. Missing figures, interpretation and limitations',
      t: [1, 2, 3, 4],
      b: '**Missing figures.** Turn each given ratio into an equation (for example, current assets = 2.6 × current liabilities), solve in a chain, and finish by recomputing every given ratio from your answers.\n\n**Interpretation.** Compare each ratio with a benchmark (2 : 1, 1 : 1), with earlier years and with similar firms; read the families together (a rising gross profit ratio with a falling net profit ratio points to expenses below gross profit).\n\n**Limitations of ratio analysis:**\n- based on past, historical-cost figures; price-level changes are ignored;\n- qualitative factors are left out;\n- firms may use different accounting policies, so comparisons can mislead;\n- year-end figures can be window-dressed;\n- there is no universally correct value for most ratios, and a ratio is only as reliable as the statements behind it.',
      terms: [
        ['Benchmark', 'A standard such as a conventional level, an industry average or last year’s figure.'],
        ['Window dressing', 'Making the year-end position look better than it usually is.'],
      ],
      v: vMissing,
      vs: [vInterpret, vLimits],
    },
  ],
  tips: '**Common mistakes**\n- Using **revenue** instead of **cost of revenue from operations** in inventory turnover, or closing instead of **average** inventory.\n- Leaving **bills receivable / bills payable** out of trade receivables and trade payables, or using total instead of **credit** figures when credit figures are given.\n- Taking **current liabilities** into debt in the debt-equity ratio.\n- Forgetting to remove **prepaid expenses** (as well as inventories) from quick assets.\n- Including **non-operating** items (loss on sale of an asset, interest received) in the operating ratio.\n- Using profit after tax in **return on investment** or **interest coverage**: both need profit before interest and tax.\n- Writing the answer in the wrong form (25 instead of 25%, 2 instead of 2 : 1) or not rounding to two decimal places.\n\n**How marks are usually awarded**\n- 1 mark: one formula, one effect of a transaction, or one ratio in an MCQ.\n- 3 marks: two or three ratios, about 1 mark each (formula and working ½, answer ½), or a missing-figure chain.\n- 4 marks: four ratios, or the effect of four transactions (1 mark each with the reason).\n- 6 marks: five or six ratios from a balance sheet and statement of profit and loss, or a missing-figure problem; bases such as capital employed carry their own marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Accounting ratio', 'A relationship between two related figures from the financial statements.', 'definition', 1],
  ['Three forms of expressing a ratio', 'Pure ratio (2 : 1), times (10 times), percentage (25%).', 'fact', 1],
  ['Four families of ratios', 'Liquidity, solvency, activity (turnover), profitability.', 'fact', 1],
  ['Current ratio', 'Current assets ÷ current liabilities; convention **2 : 1**.', 'definition', 1],
  ['Quick assets', 'Current assets − **inventories** − **prepaid expenses**.', 'definition', 1],
  ['Quick ratio', 'Quick assets ÷ current liabilities; convention **1 : 1**.', 'definition', 1],
  ['Paying a creditor when the current ratio is above 1', 'Both parts fall equally, so the ratio **rises**.', 'exam-tip', 1],
  ['Buying inventory for cash: effect on the quick ratio', '**Falls**: cash (quick) becomes inventory (not quick).', 'exam-tip', 1],
  ['Debt (for solvency ratios)', 'Long-term borrowings + long-term provisions.', 'definition', 2],
  ['Debt-equity ratio', "Debt ÷ shareholders' funds; lower is safer for lenders.", 'definition', 2],
  ['Total assets to debt ratio', 'Total assets ÷ debt; higher is safer for lenders.', 'definition', 2],
  ['Proprietary ratio', "Shareholders' funds ÷ total assets.", 'definition', 2],
  ['Interest coverage ratio', 'Profit before interest and tax ÷ interest on long-term debt (times).', 'definition', 2],
  ['Issue of equity shares for cash: effect on debt-equity', '**Decreases** (equity rises, debt unchanged).', 'exam-tip', 2],
  ['Cost of revenue from operations', 'Opening inventory + purchases + direct expenses − closing inventory = revenue − gross profit.', 'fact', 3],
  ['Inventory turnover ratio', 'Cost of revenue from operations ÷ **average** inventory.', 'definition', 3],
  ['Trade receivables turnover ratio', 'Credit revenue ÷ average (debtors + bills receivable).', 'definition', 3],
  ['Trade payables turnover ratio', 'Net credit purchases ÷ average (creditors + bills payable).', 'definition', 3],
  ['Fixed asset turnover ratio', 'Revenue from operations ÷ net fixed assets.', 'definition', 3],
  ['Net asset turnover ratio', 'Revenue from operations ÷ capital employed.', 'definition', 3],
  ['Working capital turnover ratio', 'Revenue from operations ÷ (current assets − current liabilities).', 'definition', 3],
  ['Capital employed: two ways', "Shareholders' funds + non-current liabilities = non-current assets + working capital.", 'exam-tip', 3],
  ['Gross profit ratio', 'Gross profit ÷ revenue from operations × 100.', 'definition', 4],
  ['Operating ratio', '(Cost of revenue + operating expenses) ÷ revenue from operations × 100.', 'definition', 4],
  ['Operating profit ratio', 'Operating profit ÷ revenue × 100 = **100 − operating ratio**.', 'definition', 4],
  ['Net profit ratio', 'Net profit (before or after tax) ÷ revenue from operations × 100.', 'definition', 4],
  ['Return on investment', 'Profit **before interest and tax** ÷ capital employed × 100.', 'definition', 4],
  ['Left out of the operating ratio', 'Non-operating items: loss on sale of assets, interest and dividend received, finance costs.', 'exam-tip', 4],
  ['Rounding rule in this chapter', 'Two decimal places, rounded half up; exact results written as they are.', 'exam-tip', 1],
  ['Three limitations of ratio analysis', 'Past figures; inflation ignored; qualitative factors left out (also: different policies, window dressing).', 'concept', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Accounting Ratios',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_quick_assets', 'm_icr', 'm_gp_ratio', 'ar_itr'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer both questions. Round ratios to two decimal places.', items: ['s3_liquidity', 's3_roi_ce'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l4_de_effects', 'l4_classification'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show your workings.', items: [{ attempt: 1, keys: ['l6_activity', 'l6_missing'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Accounting Ratios',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_cr_benchmark', 'm_de_effect', 'm_inv_avg', 'm_trt_credit', 'm_nonop', 'm_np_after_tax', 'ar_icr', 'ar_roi'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice. Round ratios to two decimal places.', items: ['s3_solvency', 's3_missing_itr', 's3_gp_op', { attempt: 1, keys: ['s3_icr', 's3_limitations'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_cr_effects', { attempt: 1, keys: ['l4_trt_tpt', 'l4_interpret'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18. Show your workings.', items: ['l6_comprehensive', { attempt: 1, keys: ['l6_solvency', 'l6_profit_all'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-accountancy-ch10 only (liquidity, solvency, activity and profitability ratios as listed in the 2026-27 syllabus), with meaning, objectives, classification, effects of transactions, missing figures, interpretation and limitations; no topic of this chapter is removed for 2026-27',
    originality: 'every company, scenario and figure written for this chapter (imagined companies in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `one set of definitions (acc.mjs) and two-decimal rounding; every balance sheet balances and capital employed is asserted equal both ways; every ratio computed from the givens and pinned to a hand-checked value; effects of transactions computed before and after; missing figures recomputed to the given ratios (Narmada ${fig(NA.total)}, return on investment ${NA_roi.s}; ${FACTS.join('; ')})`,
    facts: 'debt = long-term borrowings + long-term provisions; quick assets exclude inventories and prepaid expenses; return on investment and interest coverage on profit before interest and tax; operating profit ratio = 100 − operating ratio',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
