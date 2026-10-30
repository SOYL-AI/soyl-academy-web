// Build CBSE 12 Accountancy ch09 Analysis of Financial Statements. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch09', 'economics-commerce');
const { fig, rs, rupees, sum, check, hundredths, pc, pcs, pctWords, plStatement, bsStatement, comparative, commonSize, headShare } = await import('./acc.mjs');
const { FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const Y = ['2024-25', '2025-26'];
const D = ['31 March 2025', '31 March 2026'];
const T = (t, alt, caption) => table(t.headers, t.rows, alt, caption);
const lakh = (n) => `₹${Number.isInteger(n / 1e5) ? n / 1e5 : (n / 1e5).toFixed(2)} lakh`;

// ---------------------------------------------------------------- SVG charts (bar heights computed from the values)
/** Grouped bars: cats = category labels, series = [[name, values per category]] (two series), fmt = value label. */
function groupedBars({ cats, series, fmt, alt, caption, w = 600, h = 280 }) {
  check(series.length === 2 && series.every(([, vs]) => vs.length === cats.length && vs.every((v) => v >= 0)), 'grouped bars');
  const s = new Svg(w, h);
  const top = 50;
  const base = h - 50;
  const max = Math.max(...series.flatMap(([, vs]) => vs));
  const slot = (w - 60) / cats.length;
  const bw = Math.min(54, slot / 3);
  const colours = ['muted', 'accent'];
  s.line(30, base, w - 20, base, { sw: 1.4 });
  series.forEach(([name, vs], k) => {
    s.rect(40 + k * 190, 14, 16, 14, { fill: colours[k], stroke: false, rx: 2 });
    s.text(62 + k * 190, 21, name, { anchor: 'start', size: 13 });
    vs.forEach((v, i) => {
      const bh = ((base - top) * v) / max;
      const x = 30 + slot * i + slot / 2 - bw + k * bw;
      s.rect(x, base - bh, bw - 4, bh, { fill: colours[k], stroke: false, rx: 2 });
      s.text(x + (bw - 4) / 2, base - bh - 9, fmt(v), { size: 11 });
    });
  });
  cats.forEach((c, i) => s.text(30 + slot * i + slot / 2, base + 18, c, { size: 12 }));
  return s.visual(alt, caption);
}
/** 100% stacked bars: cols = bar labels, segs = [[name, hundredths per column]]; each column must total 100.00. */
function stacked100({ cols, segs, alt, caption, w = 600, h = 300 }) {
  cols.forEach((_, i) => check(sum(segs.map(([, hs]) => hs[i])) === 10000, `stacked column ${i} totals 100.00`));
  const s = new Svg(w, h);
  const top = 30;
  const H = h - 80;
  const colours = ['blue', 'green', 'yellow', 'brown'];
  const bw = 110;
  cols.forEach((c, i) => {
    const x = 70 + i * 200;
    let y = top;
    segs.forEach(([, hs], k) => {
      const sh = (H * hs[i]) / 10000;
      s.rect(x, y, bw, sh, { fill: colours[k], stroke: false, rx: 0 });
      s.line(x + bw, y + sh / 2, x + bw + 12, y + sh / 2, { sw: 1 });
      s.text(x + bw + 16, y + sh / 2, `${pc(hs[i])}%`, { anchor: 'start', size: 12 });
      y += sh;
    });
    s.rect(x, top, bw, H, { stroke: true, sw: 1.2, rx: 0 });
    s.text(x + bw / 2, top + H + 18, c, { size: 13, bold: true });
  });
  segs.forEach(([name], k) => {
    s.rect(w - 150, 40 + k * 26, 14, 14, { fill: colours[k], stroke: false, rx: 2 });
    s.text(w - 130, 47 + k * 26, name, { anchor: 'start', size: 12 });
  });
  return s.visual(alt, caption);
}

// ---------------------------------------------------------------- worked example 1: Sone Valley Biscuits Ltd (imagined, Dehri)
const SV = { rev: [4000000, 6250000], pat: [400000, 500000] };
const SV_rev = hundredths(SV.rev[1] - SV.rev[0], SV.rev[0]);
const SV_pat = hundredths(SV.pat[1] - SV.pat[0], SV.pat[0]);
const SV_m = SV.rev.map((r, i) => hundredths(SV.pat[i], r));
check(SV_rev === 5625 && SV_pat === 2500 && SV_m[0] === 1000 && SV_m[1] === 800, 'Sone Valley');

// ---------------------------------------------------------------- worked example 2: Shipra Fabrics Ltd (imagined, Ujjain)
const SF = plStatement({ cols: Y, taxRate: 30, v: { rev: [5000000, 6500000], oi: [200000, 150000], com: [2400000, 3300000], emp: [600000, 720000], fin: [100000, 160000], dep: [200000, 240000], oth: [400000, 460000] } });
const SFc = comparative(SF);
check(SF.val('pat')[0] === 1050000 && SF.val('pat')[1] === 1239000 && SFc.ch.rev.h === 3000 && SFc.ch.te.h === 3189 && SFc.ch.ti.h === 2788 && SFc.ch.pbt.h === 1800 && SFc.ch.pat.h === 1800 && SFc.ch.fin.h === 6000 && SFc.ch.com.h === 3750, 'Shipra');

// ---------------------------------------------------------------- worked example 3: Zuari Agro Tools Ltd (imagined, Margao)
const ZA = bsStatement({ cols: D, v: { sc: [2000000, 2500000], rs: [500000, 700000], ltb: [1000000, 1200000], tp: [400000, 300000], stp: [100000, 150000], ppe: [2400000, 3000000], intang: [200000, 150000], nci: [400000, 500000], inv: [400000, 500000], tr: [400000, 450000], cce: [200000, 250000] } });
const ZAc = comparative(ZA);
check(ZA.part.el[1] === 4850000 && ZAc.ch.elT.h === 2125 && ZAc.ch.sc.h === 2500 && ZAc.ch.tp.h === -2500 && ZAc.ch.tr.h === 1250, 'Zuari'); // narration: "rose by a quarter", "fell by a quarter"
const headCh = (st, h) => st.head[h][1] - st.head[h][0];
const ZA_SRC = [["Shareholders' funds", headCh(ZA, 'sf')], ['Long-term borrowings', headCh(ZA, 'ncl')], ['Current liabilities', headCh(ZA, 'cl')]];
const ZA_USE = [['Non-current assets', headCh(ZA, 'nca')], ['Current assets', headCh(ZA, 'ca')]];
check(sum(ZA_SRC.map((x) => x[1])) === ZAc.ch.elT.abs && sum(ZA_USE.map((x) => x[1])) === ZAc.ch.asT.abs && headCh(ZA, 'sf') === 700000 && headCh(ZA, 'cl') === -50000 && headCh(ZA, 'nca') === 650000, 'Zuari sources and uses');

// ---------------------------------------------------------------- worked example 4: Kabini Coffee Curing Ltd (imagined, Mysuru)
const KC = plStatement({ cols: Y, taxRate: 25, v: { rev: [8000000, 10000000], oi: [400000, 300000], com: [4000000, 5400000], emp: [1200000, 1400000], fin: [200000, 150000], dep: [400000, 450000], oth: [600000, 700000] } });
const KCc = commonSize(KC);
check(KCc.p.ti[0] === 10500 && KCc.p.te[0] === 8000 && KCc.p.te[1] === 8100 && KCc.p.pat[0] === 1875 && KCc.p.pat[1] === 1650 && KCc.p.com[1] === 5400 && KC.val('pat')[1] === 1650000 && KCc.rounded === 0, 'Kabini');

// ---------------------------------------------------------------- worked example 5: Barak Bamboo Crafts Ltd (imagined, Silchar)
const BB = bsStatement({ cols: D, v: { sc: [2500000, 4400000], rs: [750000, 1600000], ltb: [1000000, 1000000], tp: [500000, 640000], stp: [250000, 360000], ppe: [3000000, 5200000], nci: [500000, 600000], inv: [750000, 1000000], tr: [500000, 800000], cce: [250000, 400000] } });
const BBc = commonSize(BB);
const BB_SF = headShare(BBc, 'sf');
const BB_NCL = headShare(BBc, 'ncl');
const BB_CL = headShare(BBc, 'cl');
check(BB.part.el[1] === 8000000 && BB_SF[0] === 6500 && BB_SF[1] === 7500 && BB_NCL[1] === 1250 && BB_CL[1] === 1250 && BBc.adjusted.length === 0 && BBc.rounded === 0, 'Barak');

// ---------------------------------------------------------------- rounding demonstration: Vellar Traders Ltd (imagined)
const VT = bsStatement({ cols: D, v: { sc: [400000, 500000], tp: [200000, 300000], ppe: [400000, 500000], inv: [100000, 150000], cce: [100000, 150000] } });
const VTc = commonSize(VT);
check(VTc.adjusted.length === 1 && VTc.adjusted[0].key === 'ppe' && VTc.p.ppe[0] === 6666 && VTc.p.inv[0] === 1667 && VTc.p.ppe[1] === 6250, 'Vellar rounding');

// ---------------------------------------------------------------- worked example 6: Rapti Dairy Ltd and Gomti Dairy Ltd (imagined)
const RG = plStatement({ cols: ['Rapti Dairy', 'Gomti Dairy'], taxRate: 25, v: { rev: [4000000, 16000000], com: [2400000, 8800000], emp: [480000, 1600000], fin: [0, 320000], dep: [160000, 480000], oth: [320000, 1440000] } });
const RGc = commonSize(RG);
check(RGc.p.pat[0] === 1200 && RGc.p.pat[1] === 1575 && RGc.p.com[1] === 5500 && RGc.p.te[1] === 7900 && RG.val('pat')[0] === 480000 && RG.val('pat')[1] === 2520000 && RG.val('rev')[1] === 4 * RG.val('rev')[0], 'Rapti Gomti'); // narration: "four times bigger"

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['Meaning and users', 'Objectives', 'Tools', 'Limitations', 'Comparative profit and loss', 'Comparative balance sheet'], 'Route map of Part 1: meaning and users, objectives, tools, limitations, then the comparative statement of profit and loss and the comparative balance sheet', 'Part 1 at a glance');
const vProcess = flow('LR', ['Balance sheet and statement of profit and loss', 'Rearrange and group the items', 'Compare across years, firms or a base', 'Interpret: strengths and weak spots', 'Decisions'], 'Flow of financial statement analysis: the published statements are rearranged and grouped, compared across years, firms or a common base, interpreted for strengths and weaknesses, and used for decisions', 'Analysis turns finished statements into judgements.');
const vUsers = table(
  ['Who analyses', 'What they want to judge'],
  [
    ['Management', 'Where costs are rising, how efficiently resources are used, what to plan next'],
    ['Investors (present and future shareholders)', 'Profitability, growth and the safety of their money'],
    ['Trade payables (suppliers)', 'Ability to pay within the credit period: short-term solvency'],
    ['Lenders and debenture holders', 'Ability to pay interest and repay over years: long-term solvency'],
    ['Employees and unions', 'Capacity to pay wages and bonus; job security'],
    ['Government and researchers', 'Tax, regulation, industry trends'],
  ],
  'Table of users of financial analysis and what each wants to judge: management, investors, suppliers, lenders, employees and government',
);
const vObjectives = table(
  ['Objective', 'Question it answers'],
  [
    ['Assess profitability and earning capacity', 'Is the company earning enough, and will it continue?'],
    ['Assess short-term solvency', 'Can it pay its current liabilities on time?'],
    ['Assess long-term solvency', 'Can it service and repay its long-term debt?'],
    ['Compare (intra-firm and inter-firm)', 'Better or worse than last year, and than other firms?'],
    ['Find reasons for change', 'Why did profit or the financial position change?'],
    ['Forecast and plan', 'What is likely next year, and what should be done?'],
  ],
  'Table of objectives of financial analysis with the question each answers: profitability, short-term and long-term solvency, comparison, reasons for change, forecasting',
);
const vTools = table(
  ['Tool', 'What it shows', 'Kind of analysis'],
  [
    ['Comparative statements', 'Each item for two or more years, with absolute and percentage change', 'Horizontal (over time)'],
    ['Common-size statements', 'Each item as a percentage of a base of the same year', 'Vertical (within a year)'],
    ['Ratio analysis', 'Relationships between related items', 'Chapter 10'],
    ['Cash flow statement', 'Inflows and outflows of cash by activity', 'Chapter 11'],
  ],
  'Table of the four tools of financial analysis: comparative statements, common-size statements, ratio analysis and the cash flow statement, with what each shows',
  'This chapter covers the first two tools.',
);
const vLimits = table(
  ['Limitation', 'Why it matters'],
  [
    ['Built on past figures', 'The future may differ from the trend'],
    ['Price-level changes ignored', 'Growth in rupees may only be inflation'],
    ['Qualitative factors left out', 'Management quality, morale and reputation do not appear'],
    ['Different accounting policies', 'Firms using different methods are hard to compare'],
    ['Window dressing', 'The statements analysed may look better than reality'],
    ['Analyst’s judgement', 'Two analysts may read the same figures differently'],
  ],
  'Table of limitations of financial analysis: past figures, inflation ignored, qualitative factors left out, different accounting policies, window dressing and the analyst’s judgement',
);
const vWE1 = table(
  ['Sone Valley Biscuits Ltd', `${Y[0]}`, `${Y[1]}`, 'Change'],
  [
    ['Revenue from operations (₹)', fig(SV.rev[0]), fig(SV.rev[1]), pcs(SV_rev)],
    ['Profit after tax (₹)', fig(SV.pat[0]), fig(SV.pat[1]), pcs(SV_pat)],
    ['**Profit after tax as % of revenue**', `**${pcs(SV_m[0])}**`, `**${pcs(SV_m[1])}**`, `**down ${pc(SV_m[0] - SV_m[1])} points**`],
  ],
  `Table for worked example 1: revenue rose from ${fig(SV.rev[0])} to ${fig(SV.rev[1])}, up ${pc(SV_rev)} per cent; profit after tax rose from ${fig(SV.pat[0])} to ${fig(SV.pat[1])}, up ${pc(SV_pat)} per cent; but profit as a share of revenue fell from ${pc(SV_m[0])} to ${pc(SV_m[1])} per cent`,
  'Related figures tell a different story from a single figure.',
);
const vCmpFormat = table(
  ['Column', 'What goes in it'],
  [
    ['Particulars', 'Items in Schedule III order (profit and loss or balance sheet)'],
    ['Previous year (₹)', 'Amounts of the earlier year: the base'],
    ['Current year (₹)', 'Amounts of the later year'],
    ['Absolute change (₹)', 'Current year − previous year (a fall in brackets)'],
    ['Percentage change (%)', 'Absolute change ÷ previous year × 100, to two decimals'],
  ],
  'Table of the five columns of a comparative statement: particulars, previous year, current year, absolute change, and percentage change on the previous year',
);
const vSteps = flow('LR', ['Write both years in Schedule III order', 'Absolute change = current − previous', 'Percentage change = change ÷ previous × 100', 'Round to two decimals', 'Check that the totals’ changes re-add'], 'Flow of steps for a comparative statement: list both years in Schedule Three order, find the absolute change, divide by the previous year and multiply by one hundred, round to two decimals, and check that the changes of the totals re-add', 'Percentages of totals are worked out from the total amounts, never by adding percentages.');
const vSF = T(SFc, `Comparative statement of profit and loss of Shipra Fabrics for two years: revenue up ${pc(SFc.ch.rev.h)} per cent, total expenses up ${pc(SFc.ch.te.h)} per cent, profit after tax up ${pc(SFc.ch.pat.h)} per cent`, `${pc(SFc.ch.ti.h)} and ${pc(SFc.ch.te.h)} are rounded to two decimals.`);
const vSFbars = groupedBars({
  cats: ['Revenue from operations', 'Total expenses', 'Profit after tax'],
  series: [[Y[0], [SF.val('rev')[0], SF.val('te')[0], SF.val('pat')[0]]], [Y[1], [SF.val('rev')[1], SF.val('te')[1], SF.val('pat')[1]]]],
  fmt: lakh,
  alt: `Grouped bar chart for Shipra Fabrics comparing two years: revenue ${lakh(SF.val('rev')[0])} and ${lakh(SF.val('rev')[1])}, total expenses ${lakh(SF.val('te')[0])} and ${lakh(SF.val('te')[1])}, profit after tax ${lakh(SF.val('pat')[0])} and ${lakh(SF.val('pat')[1])}`,
  caption: `Revenue +${pc(SFc.ch.rev.h)}%, expenses +${pc(SFc.ch.te.h)}%, profit after tax +${pc(SFc.ch.pat.h)}%. Bar heights are drawn from the figures.`,
});
const vCbsFlow = flow('LR', ['Both balance sheets, Schedule III order', 'Change in each sub-head', 'Percentage on the earlier date', 'Both totals change by the same amount', 'Read sources against uses'], 'Flow for a comparative balance sheet: copy both balance sheets in Schedule Three order, find the change in each sub-head and its percentage on the earlier date, confirm both totals change by the same amount, then read sources against uses', 'A comparative balance sheet shows where new funds came from and where they went.');
const vZA = T(ZAc, `Comparative balance sheet of Zuari Agro Tools on two dates; both totals rise by ${fig(ZAc.ch.elT.abs)}, that is ${pc(ZAc.ch.elT.h)} per cent`);
const vZAsu = table(
  ['Where the extra funds came from', '₹', 'Where they went', '₹'],
  [
    [ZA_SRC[0][0], fig(ZA_SRC[0][1]), ZA_USE[0][0], fig(ZA_USE[0][1])],
    [ZA_SRC[1][0], fig(ZA_SRC[1][1]), ZA_USE[1][0], fig(ZA_USE[1][1])],
    [ZA_SRC[2][0], fig(ZA_SRC[2][1]), '', ''],
    ['**Total increase**', `**${fig(ZAc.ch.elT.abs)}**`, '**Total increase**', `**${fig(ZAc.ch.asT.abs)}**`],
  ],
  `Sources and uses for Zuari Agro Tools: shareholders' funds up ${fig(ZA_SRC[0][1])}, long-term borrowings up ${fig(ZA_SRC[1][1])}, current liabilities down ${fig(-ZA_SRC[2][1])}; non-current assets up ${fig(ZA_USE[0][1])} and current assets up ${fig(ZA_USE[1][1])}`,
  'Head totals are computed from the comparative balance sheet; both sides re-add.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Analysis', 'Relating figures to judge profitability, solvency and efficiency'],
    ['Users', 'Each reads the statements for its own decision'],
    ['Tools', 'Comparative, common-size, ratios, cash flow'],
    ['Limitations', 'Past figures, inflation, no qualitative facts, policies, window dressing, judgement'],
    ['Comparative statement', 'Two years, absolute change, percentage change on the earlier year'],
    ['Check', 'Changes of totals re-add; both balance sheet totals change equally'],
  ],
  'Summary table of Part 1: meaning of analysis, users, tools, limitations, the comparative statement and its checks',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Meaning and base', 'Common-size profit and loss', 'Common-size balance sheet', 'Rounding to 100.00', 'Comparing firms', 'Reading the results'], 'Route map of Part 2: meaning and base, common-size statement of profit and loss, common-size balance sheet, rounding so columns total one hundred, comparing firms and reading the results', 'Part 2 at a glance');
const vBase = table(
  ['Statement', 'Base taken as 100', 'Each item shown as'],
  [
    ['Common-size statement of profit and loss', 'Revenue from operations of the year', 'Item ÷ revenue from operations × 100'],
    ['Common-size balance sheet', 'Balance sheet total (assets = equity and liabilities)', 'Item ÷ balance sheet total × 100'],
  ],
  'Table of the base for common-size statements: revenue from operations for the statement of profit and loss, and the balance sheet total for the balance sheet',
  'Percentages are rounded to two decimals.',
);
const vCsFormat = table(
  ['Particulars', 'Amount: earlier year', 'Amount: later year', '% of revenue: earlier', '% of revenue: later'],
  [
    ['I. Revenue from Operations', '…', '…', '100.00', '100.00'],
    ['II. Add: Other Income', '…', '…', 'share', 'share'],
    ['III. Total Income', '…', '…', 'above 100 if there is other income', '…'],
    ['IV. Expenses (each head and total)', '…', '…', 'share of revenue', 'share of revenue'],
    ['V. Profit before Tax, VI. Tax, VII. Profit after Tax', '…', '…', 'share of revenue', 'share of revenue'],
  ],
  'Format of a common-size statement of profit and loss: amounts for both years and each line as a percentage of revenue from operations, with revenue at one hundred and total income above one hundred when there is other income',
);
const vKC = T(KCc, `Common-size statement of profit and loss of Kabini Coffee Curing: profit after tax ${pc(KCc.p.pat[0])} per cent of revenue in the earlier year and ${pc(KCc.p.pat[1])} per cent in the later year; materials ${pc(KCc.p.com[0])} and ${pc(KCc.p.com[1])} per cent`, 'Base: revenue from operations of each year = 100.');
const vKCbars = groupedBars({
  cats: ['Materials', 'Employee benefits', 'Profit before tax', 'Profit after tax'],
  series: [[Y[0], [KCc.p.com[0], KCc.p.emp[0], KCc.p.pbt[0], KCc.p.pat[0]]], [Y[1], [KCc.p.com[1], KCc.p.emp[1], KCc.p.pbt[1], KCc.p.pat[1]]]],
  fmt: (v) => `${pc(v)}%`,
  alt: `Grouped bar chart of common-size percentages for Kabini Coffee Curing: materials ${pc(KCc.p.com[0])} and ${pc(KCc.p.com[1])}, employee benefits ${pc(KCc.p.emp[0])} and ${pc(KCc.p.emp[1])}, profit before tax ${pc(KCc.p.pbt[0])} and ${pc(KCc.p.pbt[1])}, profit after tax ${pc(KCc.p.pat[0])} and ${pc(KCc.p.pat[1])} per cent of revenue`,
  caption: 'Shares of revenue from operations; bar heights are drawn from the computed percentages.',
});
const vCsBsFormat = flow('TB', ['Total of the balance sheet = 100', 'Equity and liabilities: each sub-head ÷ total × 100', 'Assets: each sub-head ÷ total × 100', 'Each part adds to 100.00'], 'Flow for a common-size balance sheet: the balance sheet total is one hundred; each sub-head of equity and liabilities and of assets is divided by the total and multiplied by one hundred; each part adds to one hundred', 'One base for both parts, because the two totals are equal.');
const vBB = T(BBc, `Common-size balance sheet of Barak Bamboo Crafts on two dates: share capital ${pc(BBc.p.sc[0])} and ${pc(BBc.p.sc[1])} per cent, long-term borrowings ${pc(BBc.p.ltb[0])} and ${pc(BBc.p.ltb[1])} per cent, property, plant and equipment ${pc(BBc.p.ppe[0])} and ${pc(BBc.p.ppe[1])} per cent`, 'Base: the balance sheet total of each date = 100.');
const vBBstack = stacked100({
  cols: D,
  segs: [["Shareholders' funds", BB_SF], ['Non-current liabilities', BB_NCL], ['Current liabilities', BB_CL]],
  alt: `Stacked bars for Barak Bamboo Crafts showing how each hundred rupees of funds was raised: shareholders' funds ${pc(BB_SF[0])} and ${pc(BB_SF[1])}, non-current liabilities ${pc(BB_NCL[0])} and ${pc(BB_NCL[1])}, current liabilities ${pc(BB_CL[0])} and ${pc(BB_CL[1])} per cent`,
  caption: 'Each bar is 100.00: segment heights are drawn from the computed percentages.',
});
const vVT = T(VTc, `Common-size balance sheet of Vellar Traders: on the earlier date the assets lines round to sixty-six point six seven, sixteen point six seven and sixteen point six seven, adding to one hundred point zero one, so property, plant and equipment is shown at ${pc(VTc.p.ppe[0])}`, VTc.adjNote);
const vCmpCs = table(
  ['Point', 'Comparative statement', 'Common-size statement'],
  [
    ['Reads', 'Across the years (horizontal)', 'Down one year (vertical)'],
    ['Percentage base', 'Same item, earlier year', 'Revenue, or balance sheet total'],
    ['Best for', 'Direction and speed of change', 'Make-up of a statement; firms of different size'],
  ],
  'Table contrasting comparative statements, which read across years with the earlier year as base, and common-size statements, which read down one year with revenue or the balance sheet total as base',
);
const vRG = T(RGc, `Common-size statements of profit and loss of Rapti Dairy and Gomti Dairy for one year: materials ${pc(RGc.p.com[0])} and ${pc(RGc.p.com[1])} per cent, profit after tax ${pc(RGc.p.pat[0])} and ${pc(RGc.p.pat[1])} per cent of revenue`, 'Inter-firm comparison: percentages remove the effect of size.');
const vSignals = table(
  ['What you see', 'What it may mean'],
  [
    ['An expense grows faster than revenue (comparative)', 'Margin under pressure: check prices, wastage or new costs'],
    ['Materials share of revenue rises (common-size)', 'Input costs up, or selling prices not raised'],
    ['Finance costs rise sharply', 'More borrowing or a higher interest rate'],
    ['Borrowings share of the balance sheet rises', 'More reliance on debt; higher financial risk'],
    ['Fixed assets grow with long-term funds', 'Expansion financed soundly'],
    ['Profit up in rupees, down as a share of revenue', 'Bigger, but less efficient'],
  ],
  'Table of signals in comparative and common-size statements and what each may mean: expenses growing faster than revenue, a rising materials share, rising finance costs, a rising share of borrowings, fixed assets financed by long-term funds, and profit rising in rupees but falling as a share of revenue',
  'A signal shows where to look; the cause still has to be found.',
);
const vSummary2 = table(
  ['Topic', 'Key rule'],
  [
    ['Common-size profit and loss', 'Every line ÷ revenue from operations × 100'],
    ['Common-size balance sheet', 'Every line ÷ balance sheet total × 100; each part = 100.00'],
    ['Rounding', 'Two decimals; if a part comes to 99.99 or 100.01, move the line with the largest rounding error by 0.01'],
    ['Comparing firms', 'Use percentages, not rupees'],
    ['Interpreting', 'Link each change in a share to the change in profit or in the financing'],
  ],
  'Summary table of Part 2: the base for each common-size statement, the rounding rule, comparing firms and interpreting the results',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Analysis of Financial Statements — Part 1: Meaning, Objectives, Tools, Limitations and Comparative Statements',
  goals: [
    'Explain the meaning, significance and objectives of financial statement analysis',
    'Name the tools of analysis and state the limitations of analysis',
    'Prepare a comparative statement of profit and loss with absolute and percentage changes',
    'Prepare and read a comparative balance sheet',
  ],
  slides: [
    sl('title', 'Analysis of Financial Statements', {
      b: 'Part 1 — what analysis is, who needs it, its **tools** and **limits**, and the **comparative statement**.',
      v: vRoute1,
      n: 'A balance sheet and a statement of profit and loss are full of figures, but figures alone do not tell you whether a company is doing well. In this part we learn what financial analysis is, who uses it and why, which tools it uses and where it falls short. Then we prepare comparative statements, which set two years side by side.',
    }),
    sl('concept', 'What is financial statement analysis?', {
      v: vProcess,
      bl: ['It **relates** figures to each other, to earlier years and to other firms.', 'The aim: judge **profitability, solvency and efficiency**, and support decisions.'],
      n: 'Analysis starts after the accounts are finished. The analyst rearranges the items into meaningful groups, compares them with earlier years, with other firms or with a common base, and then interprets what the comparisons show. The result is a judgement about how profitable, how solvent and how efficient the company is, which people can act on.',
    }),
    sl('concept', 'Significance: who analyses, and why', {
      v: vUsers,
      n: 'Many people read the same statements for different reasons. Management looks for rising costs and plans ahead. Investors want profit, growth and safety. Suppliers worry about being paid within the credit period, while lenders think about interest and repayment over many years. Employees think about wages and job security, and the government about tax and regulation.',
    }),
    sl('check', 'Quick check: which is analysis?', {
      b: 'Pick the activity that analyses the statements rather than prepares them.',
      chk: 'm_meaning',
      n: 'Ask whether the activity comes before the statements exist, or after them.',
    }),
    sl('concept', 'Objectives of analysis', {
      v: vObjectives,
      n: 'Analysis sets out to answer a few clear questions. Is the company earning enough, and will it continue? Can it pay what it owes soon, and what it owes over many years? Is it doing better than last year, and than its rivals? Why did profit change? And what is likely to happen next, so that plans can be made?',
    }),
    sl('concept', 'The tools of analysis', {
      v: vTools,
      bl: ['**Horizontal** analysis: the same item over time. **Vertical** analysis: items against a base within one year.'],
      n: 'There are four common tools. Comparative statements set two or more years side by side and show the change. Common-size statements express every item as a percentage of a base. Ratio analysis relates one item to another, and the cash flow statement shows where cash came from and went. This chapter covers the first two; ratios and cash flow follow in the next chapters.',
    }),
    sl('check', 'Quick check: match the tools', {
      b: 'Match each tool with what it does.',
      chk: 'mt_tools',
      n: 'Think of the key idea behind each tool: change over time, share of a base, a relationship, or the movement of cash.',
    }),
    sl('concept', 'Limitations of analysis', {
      v: vLimits,
      n: 'Analysis is only as good as the figures it uses. Those figures describe the past and ignore inflation, so growth in rupees can mislead. Qualities such as good management never appear. Firms using different accounting methods are hard to compare, statements can be window-dressed, and in the end the analyst still has to use judgement.',
    }),
    sl('example', 'Worked example 1: one figure is not enough', {
      b: `An imagined company, **Sone Valley Biscuits Ltd**, Dehri, proudly reports that its profit after tax rose from ${rs(SV.pat[0])} to ${rs(SV.pat[1])}. Its revenue from operations rose from ${rs(SV.rev[0])} to ${rs(SV.rev[1])}. Did it really do better?`,
      v: vWE1,
      n: `Profit rose by ${pctWords(SV_pat)}, which sounds good. But revenue rose by ${pctWords(SV_rev)}, much faster. As a share of revenue, profit fell from ${pctWords(SV_m[0])} to ${pctWords(SV_m[1])}. The company is bigger, but it keeps less of each rupee it earns. That is why analysts relate figures instead of reading one in isolation.`,
    }),
    sl('check', 'Quick check: what the figures missed', {
      b: 'A company with excellent figures loses its key team. Why did analysis not warn of it?',
      chk: 'm_limit_qual',
      n: 'Can loyalty and skill be written in the books as an amount of money?',
    }),
    sl('concept', 'Comparative statements: the format', {
      v: vCmpFormat,
      bl: ['**Absolute change** = current year − previous year.', '**Percentage change** = absolute change ÷ previous year × 100 (two decimals).'],
      n: 'A comparative statement has five columns: the particulars, the earlier year, the later year, the absolute change in rupees and the percentage change. The earlier year is always the base. A fall is shown in brackets or with a minus sign, and percentages are rounded to two decimal places.',
    }),
    sl('concept', 'Working out the changes', {
      v: vSteps,
      bl: ['Work the **totals** from the rupee figures; never add or subtract percentages.', 'Show a fall in brackets: (25,000) and (12.50).'],
      n: 'Work line by line. First write both years in Schedule Three order and finish every total. Then take the earlier figure away from the later one, divide by the earlier figure and multiply by one hundred. For a total, divide its own change by its own earlier amount; adding the percentages of the items would give the wrong answer.',
    }),
    sl('example', 'Worked example 2: comparative statement of profit and loss', {
      b: `An imagined textile company, **Shipra Fabrics Ltd**, Ujjain, pays tax at 30%. Its comparative statement of profit and loss:`,
      v: vSF,
      n: `Revenue rose by ${pctWords(SFc.ch.rev.h)}, but total expenses rose faster, by ${pctWords(SFc.ch.te.h)}, because materials went up by ${pctWords(SFc.ch.com.h)} and finance costs by ${pctWords(SFc.ch.fin.h)}. Other income fell. So profit before tax, and profit after tax, rose by only ${pctWords(SFc.ch.pat.h)}.`,
    }),
    sl('example', 'Worked example 2 (continued): reading the changes', {
      v: vSFbars,
      bl: [`Revenue up ${pcs(SFc.ch.rev.h)}, total expenses up ${pcs(SFc.ch.te.h)}: costs are outrunning sales.`, `Profit after tax up only ${pcs(SFc.ch.pat.h)} (${rs(SFc.ch.pat.abs)}).`, 'Next step for management: find out why materials and finance costs rose so fast.'],
      n: `The chart shows the story at a glance. Revenue and expenses both grew, but expenses grew faster, so the gap between them, the profit, grew much more slowly than sales. Profit after tax went up by ${rupees(SFc.ch.pat.abs)}. Management should now ask why material and finance costs jumped.`,
    }),
    sl('concept', 'The comparative balance sheet', {
      v: vCbsFlow,
      n: 'A comparative balance sheet works the same way. Write both balance sheets in Schedule Three order, find the change in each sub-head and its percentage on the earlier date, and check that the two totals changed by the same amount. Then read it as a story: where did new funds come from, and where were they used?',
    }),
    sl('example', 'Worked example 3: comparative balance sheet', {
      b: `An imagined maker of farm tools, **Zuari Agro Tools Ltd**, Margao, on ${D[0]} and ${D[1]}:`,
      v: vZA,
      n: `Both totals rise by ${rupees(ZAc.ch.elT.abs)}, that is ${pctWords(ZAc.ch.elT.h)}. Share capital rose by a quarter and reserves by ${pctWords(ZAc.ch.rs.h)}, while trade payables fell by a quarter. On the assets side, property, plant and equipment rose by ${rupees(ZAc.ch.ppe.abs)}.`,
    }),
    sl('example', 'Worked example 3 (continued): sources and uses', {
      v: vZAsu,
      bl: ['Long-term funds (owners and lenders) paid for the new fixed assets.', 'Trade payables were reduced: suppliers are being paid faster.'],
      n: `Grouping the changes by head makes the picture clear. Owners put in ${rupees(ZA_SRC[0][1])} more and lenders ${rupees(ZA_SRC[1][1])}, while current liabilities fell. Most of the money went into non-current assets. Financing long-lived assets with long-term funds is a sound policy.`,
    }),
    sl('check', 'Quick check: a percentage change', {
      b: 'Work it out to two decimals.',
      chk: 'n_rev_pct',
      n: 'Divide the change by the earlier year, not the later one.',
    }),
    sl('check', 'Quick check: assertion and reason', {
      b: 'Is a big percentage always a big amount?',
      chk: 'ar_pct_base',
      n: 'Think of a small earlier figure. What does a large percentage of it amount to?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: analysis relates figures to judge profitability, solvency and efficiency, and different users read it for different decisions. Its tools are comparative and common-size statements, ratios and the cash flow statement. It has limits, from inflation to accounting policies. A comparative statement shows two years with the absolute and percentage change, worked on the earlier year.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **heading** with the company name and both years or dates.',
        'Keep the **Schedule III order** and the five columns; show falls in **brackets**.',
        'Compute the percentage on the **previous year**, to **two decimals**.',
        'Work the **totals from rupees**; never add the percentages of items.',
        'For theory, give a **heading and a line** of explanation for each point.',
      ],
      n: 'In the exam, give a proper heading with the company name and both years. Keep the Schedule Three order and all five columns, and put a fall in brackets. Always divide by the previous year and round to two decimals. Work out the totals from the rupee figures. And for theory answers, give each point a heading and a line of explanation.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Analysis of Financial Statements — Part 2: Common-size Statements and Interpretation',
  goals: [
    'Explain common-size statements and the base used in each',
    'Prepare a common-size statement of profit and loss and a common-size balance sheet',
    'Round to two decimals so that every column totals 100.00',
    'Interpret comparative and common-size statements, including comparisons between firms',
  ],
  slides: [
    sl('title', 'Common-size statements', {
      b: 'Part 2 — every item as a **percentage of a base**: the **common-size statement of profit and loss** and the **common-size balance sheet**.',
      v: vRoute2,
      n: 'In part one we compared the same item across two years. Now we look down a single statement and ask what share each item takes of a base. These are common-size statements. We prepare them for the statement of profit and loss and the balance sheet, learn how to round so the columns total one hundred, and use them to compare firms of different sizes.',
    }),
    sl('concept', 'What is a common-size statement?', {
      v: vBase,
      bl: ['Also called **vertical** (static) analysis.', 'Shows the **make-up** of a statement and allows comparison of firms of different sizes.'],
      n: 'A common-size statement shows every item as a percentage of a common base. In the statement of profit and loss the base is revenue from operations; in the balance sheet it is the balance sheet total. Because everything becomes a share of one hundred, you can see the make-up of the statement and compare firms of any size.',
    }),
    sl('concept', 'Format: common-size statement of profit and loss', {
      v: vCsFormat,
      bl: ['Other income is also a percentage **of revenue from operations**, so total income can exceed 100.'],
      n: 'The statement keeps the rupee columns for both years and adds a percentage column for each. Revenue from operations is one hundred. Other income is shown as a percentage of revenue too, so total income goes above one hundred. Each expense, the total expenses, profit before tax, tax and profit after tax are all shares of revenue.',
    }),
    sl('example', 'Worked example 4: common-size statement of profit and loss', {
      b: `An imagined coffee processor, **Kabini Coffee Curing Ltd**, Mysuru, pays tax at 25%:`,
      v: vKC,
      n: `Revenue is one hundred in each year. In the earlier year, total expenses take ${pctWords(KCc.p.te[0])} of revenue and profit after tax is ${pctWords(KCc.p.pat[0])}. In the later year, expenses take ${pctWords(KCc.p.te[1])} and profit after tax falls to ${pctWords(KCc.p.pat[1])}, even though profit in rupees went up.`,
    }),
    sl('example', 'Worked example 4 (continued): reading it', {
      v: vKCbars,
      bl: [`Materials: ${pcs(KCc.p.com[0])} → ${pcs(KCc.p.com[1])} of revenue — the main squeeze.`, `Employee benefits: ${pcs(KCc.p.emp[0])} → ${pcs(KCc.p.emp[1])} — slightly better.`, `Profit after tax: ${pcs(KCc.p.pat[0])} → ${pcs(KCc.p.pat[1])} — each rupee of sales now earns less.`],
      n: `The bars show where the margin went. Materials rose from ${pctWords(KCc.p.com[0])} to ${pctWords(KCc.p.com[1])} of revenue. Employee costs took a slightly smaller share, but not enough to make up. So profit before tax and profit after tax both took a smaller share of every rupee of sales.`,
    }),
    sl('check', 'Quick check: above one hundred', {
      b: 'Why can total income exceed 100 in a common-size statement of profit and loss?',
      chk: 'm_cs_total_income',
      n: 'Which single line is the base of one hundred?',
    }),
    sl('concept', 'The common-size balance sheet', {
      v: vCsBsFormat,
      n: 'In a common-size balance sheet the base is the balance sheet total. Every sub-head of equity and liabilities, and every sub-head of assets, is divided by that total and multiplied by one hundred. Since the two parts have the same total, each part adds up to one hundred.',
    }),
    sl('example', 'Worked example 5: common-size balance sheet', {
      b: `An imagined handicraft company, **Barak Bamboo Crafts Ltd**, Silchar, on ${D[0]} and ${D[1]}:`,
      v: vBB,
      n: `Share capital rose from ${pctWords(BBc.p.sc[0])} to ${pctWords(BBc.p.sc[1])} of the total, while long-term borrowings, unchanged in rupees, fell from ${pctWords(BBc.p.ltb[0])} to ${pctWords(BBc.p.ltb[1])}. On the assets side, property, plant and equipment rose to ${pctWords(BBc.p.ppe[1])}.`,
    }),
    sl('example', 'Worked example 5 (continued): how the company is financed', {
      v: vBBstack,
      bl: [`Owners now provide ${pcs(BB_SF[1])} of every rupee of funds, up from ${pcs(BB_SF[0])}.`, 'Less reliance on borrowed funds: lower financial risk.'],
      n: `Grouping the sub-heads by head shows the financing pattern. Shareholders' funds rose from ${pctWords(BB_SF[0])} to ${pctWords(BB_SF[1])} of total funds, and non-current liabilities fell to ${pctWords(BB_NCL[1])}. The company grew mainly with owners' money, so it depends less on lenders.`,
    }),
    sl('check', 'Quick check: a common-size percentage', {
      b: 'Work out one line of a common-size balance sheet.',
      chk: 'n_cs_bs',
      n: 'Divide by the balance sheet total and multiply by one hundred.',
    }),
    sl('concept', 'Rounding: two decimals, columns total 100.00', {
      v: vVT,
      bl: ['Round each percentage to **two decimals**.', 'If a part comes to **99.99 or 100.01**, move the line with the **largest rounding error** by 0.01 and say so.'],
      n: 'Rounding can upset the total. In this imagined firm, each of the three asset lines rounds up a little, so together they come to one hundred point zero one. The fix is to move the line with the largest rounding error by one hundredth and to say so in a note. Then every part of every column totals exactly one hundred.',
    }),
    sl('concept', 'Comparative or common-size?', {
      v: vCmpCs,
      n: 'The two tools answer different questions. A comparative statement reads across the years and shows how fast each item grew or shrank, using the earlier year as the base. A common-size statement reads down one year and shows what share each item takes, using revenue or the balance sheet total. Good analysis uses both.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide the base of a common-size statement of profit and loss.',
      chk: 'tf_cs_pat',
      n: 'Is the base the total income, or a different line?',
    }),
    sl('example', 'Worked example 6: comparing two dairies', {
      b: `Two imagined dairies, **Rapti Dairy Ltd** (revenue ${rs(RG.val('rev')[0])}) and **Gomti Dairy Ltd** (revenue ${rs(RG.val('rev')[1])}), for the same year, tax at 25%:`,
      v: vRG,
      n: `Gomti is four times bigger, so its rupee figures are not comparable with Rapti's. As shares of revenue they are. Gomti spends ${pctWords(RGc.p.com[1])} on materials against ${pctWords(RGc.p.com[0])} for Rapti, perhaps from buying milk in bulk, and keeps ${pctWords(RGc.p.pat[1])} as profit after tax against ${pctWords(RGc.p.pat[0])}.`,
    }),
    sl('concept', 'Reading the results', {
      v: vSignals,
      n: 'Here are signals to look for. Expenses growing faster than revenue, or a rising share for materials, put pressure on the margin. Rising finance costs and a rising share of borrowings mean more debt and more risk. Fixed assets paid for with long-term funds is a healthy sign. Each signal tells you where to look; the cause still has to be found.',
    }),
    sl('check', 'Quick check: firms of different sizes', {
      b: 'Why do common-size statements help when comparing a small and a large firm?',
      chk: 'm_cs_interfirm',
      n: 'What happens to the size of each firm once every item becomes a share of one hundred?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: a common-size statement shows every item as a percentage of a base, revenue from operations for profit and loss and the balance sheet total for the balance sheet. Round to two decimals and make each part total one hundred. Use percentages to compare firms of different sizes, and link each change in a share to profit or to the financing.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'State the **base** in the heading of the percentage columns.',
        'Show **both** the rupee columns and the percentage columns.',
        'Check that each part of a common-size balance sheet totals **100.00**.',
        'In profit and loss, total income may exceed 100: that is **correct**.',
        'In interpretation, quote the **figures** from your statement, then give the **reason** and the **effect**.',
      ],
      n: 'In the exam, name the base in the column heading and show both the rupee and the percentage columns. Check that each part of a common-size balance sheet totals one hundred. Do not worry if total income is above one hundred. And when you interpret, quote the figures, then give the reason and the effect.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Analysis of Financial Statements — Notes',
  sections: [
    {
      h: '1. Meaning and kinds of financial analysis',
      t: 1,
      b: '**Analysis of financial statements** means studying the published statements critically: grouping related items, comparing them over time, with other firms or with a base, and interpreting the results to judge the **profitability, solvency and efficiency** of the business.\n\n**Kinds of analysis**\n- **Horizontal (dynamic):** the same item over two or more periods. Tool: comparative statements.\n- **Vertical (static):** items of one period against a base of the same period. Tool: common-size statements.\n- **Intra-firm** comparison: one firm against its own past. **Inter-firm** comparison: one firm against others in the industry.\n- **External** analysis (by outsiders with published statements) and **internal** analysis (by management with full records).',
      terms: [
        ['Financial analysis', 'Critical study of financial statements to judge profitability, solvency and efficiency.'],
        ['Horizontal analysis', 'Comparison of the same item across periods.'],
        ['Vertical analysis', 'Comparison of items with a base within one period.'],
      ],
      v: vProcess,
    },
    {
      h: '2. Significance and objectives',
      t: 1,
      b: "**Significance (users):** management (planning, cost control, efficiency); investors (profitability, growth, safety); trade payables (payment within the credit period); lenders and debenture holders (interest and repayment over years); employees and unions (wages, bonus, job security); government and researchers (tax, regulation, industry studies).\n\n**Objectives**\n1. Assess profitability and earning capacity.\n2. Assess short-term solvency (liquidity).\n3. Assess long-term solvency.\n4. Make intra-firm and inter-firm comparisons.\n5. Find the reasons for changes in profit and financial position.\n6. Help forecasting, budgeting and planning.",
      terms: [
        ['Short-term solvency', 'Ability to pay current liabilities out of current assets.'],
        ['Long-term solvency', 'Ability to pay interest and repay long-term debt.'],
        ['Inter-firm comparison', 'Comparing a firm with other firms of the same industry for the same period.'],
      ],
      v: vUsers,
      vs: [vObjectives],
    },
    {
      h: '3. Tools of analysis',
      t: 1,
      b: '- **Comparative statements:** two or more years side by side with absolute and percentage changes.\n- **Common-size statements:** every item as a percentage of a common base of the same period.\n- **Ratio analysis:** relationships between related items (Chapter 10).\n- **Cash flow statement:** inflows and outflows of cash from operating, investing and financing activities (Chapter 11).',
      terms: [
        ['Comparative statement', 'Statement showing figures of two or more periods with the change in each item.'],
        ['Common-size statement', 'Statement showing each item as a percentage of a common base.'],
      ],
      v: vTools,
    },
    {
      h: '4. Limitations of analysis',
      t: 1,
      b: '- **Historical:** based on past figures; the future may be different.\n- **Price-level changes ignored:** figures of different years are compared in rupees of different value.\n- **Qualitative aspects ignored:** quality of management, industrial relations, reputation.\n- **Different accounting policies:** methods of depreciation and inventory valuation differ between firms, which spoils inter-firm comparison.\n- **Window dressing:** statements may present a better picture than the real one.\n- **Analyst’s bias and skill:** analysis indicates symptoms; diagnosis needs judgement.\n\nA single figure means little: relate it to others (worked example 1).',
      terms: [
        ['Window dressing', 'Presenting the financial position better than it really is.'],
        ['Qualitative factor', 'A factor that cannot be measured in money, such as morale or reputation.'],
      ],
      v: vLimits,
      vs: [vWE1],
    },
    {
      h: '5. Comparative statement of profit and loss',
      t: 2,
      b: '**Columns:** Particulars | previous year (₹) | current year (₹) | absolute change (₹) | percentage change (%).\n\n**Formulas**\n- Absolute change = current year − previous year.\n- Percentage change = absolute change ÷ previous year × 100, **rounded to two decimals**.\n- A fall is shown in brackets (or with a minus sign).\n\n**Order (2026–27 format):** I. Revenue from operations; II. Other income; III. Total income; IV. Expenses (cost of materials consumed, purchases of stock-in-trade, change in inventories, employee benefits, finance costs, depreciation and amortisation, other expenses) and total expenses; V. Profit before tax; VI. Tax; VII. Profit after tax.\n\nWork every total from rupees; the percentage change of a total is its own change ÷ its own previous figure. *Exceptional and extraordinary items and discontinued operations are not in the 2026–27 syllabus.*',
      terms: [
        ['Absolute change', 'Current-year amount minus previous-year amount.'],
        ['Percentage change', 'Absolute change as a percentage of the previous-year amount.'],
      ],
      v: vSF,
      vs: [vCmpFormat, vSteps, vSFbars],
    },
    {
      h: '6. Comparative balance sheet',
      t: 2,
      b: '**Columns** as for the statement of profit and loss, with the two balance sheet dates.\n\n**Steps:** write both balance sheets in Schedule III order (heads and sub-heads); compute the absolute and percentage change of every sub-head and of the totals; check that total equity and liabilities and total assets change by the **same amount**.\n\n**Reading it:** group the changes into **sources** (shareholders’ funds, borrowings, current liabilities) and **uses** (non-current and current assets). Long-term assets financed by long-term funds is a sound sign; a rise in current liabilities that outpaces current assets weakens liquidity.',
      terms: [
        ['Sources of funds', 'Increases in shareholders’ funds and liabilities between two dates.'],
        ['Uses of funds', 'Increases in assets between two dates.'],
      ],
      v: vZA,
      vs: [vCbsFlow, vZAsu],
    },
    {
      h: '7. Common-size statements and rounding',
      t: 3,
      b: '**Common-size statement of profit and loss:** every item ÷ **revenue from operations** × 100. Revenue = 100.00; other income is also on this base, so total income may exceed 100.\n\n**Common-size balance sheet:** every item ÷ **balance sheet total** × 100. Each part (equity and liabilities; assets) = 100.00.\n\n**Rounding rule (SOYL practice):** round each percentage to two decimals (halves away from zero). If the rounded lines of a part come to 99.99 or 100.01, move the line with the largest rounding error by 0.01 and add a note, so every part of every column totals 100.00. Subtotals in a profit and loss statement are worked from rupees, not by adding rounded percentages.\n\n**Uses:** shows the make-up of each statement; compares years by share; compares firms of different sizes (inter-firm).',
      terms: [
        ['Base (common-size)', 'The figure taken as 100: revenue from operations, or the balance sheet total.'],
        ['Rounding error', 'The gap between a rounded percentage and its exact value.'],
      ],
      v: vKC,
      vs: [vBase, vCsFormat, vKCbars, vBB, vBBstack, vVT, vRG],
    },
    {
      h: '8. Interpreting comparative and common-size statements',
      t: [2, 3],
      b: '- Compare the **growth of each expense** with the growth of revenue: costs growing faster squeeze profit.\n- Track the **share** of each cost in revenue: a rising materials share means higher input costs or prices not raised.\n- Watch **finance costs** and the **share of borrowings**: more debt, more risk.\n- Check how **fixed assets** were financed: long-term funds are the sound source.\n- Remember that a falling **share** does not mean a falling **amount**, and a large **percentage** change may be a small **rupee** change.\n- Use **both** tools: comparative shows speed of change; common-size shows structure.',
      terms: [
        ['Margin', 'Profit as a percentage of revenue from operations.'],
        ['Financial risk', 'Risk arising from reliance on borrowed funds with fixed interest.'],
      ],
      v: vSignals,
      vs: [vCmpCs],
    },
  ],
  tips: '**Common mistakes**\n- Dividing the change by the **current** year instead of the previous year.\n- Adding the percentage changes of items to get the percentage change of a total.\n- Using **total income** as the base of a common-size statement of profit and loss (the base is revenue from operations).\n- Leaving a common-size balance sheet column at 99.99 or 100.01 without adjusting and noting it.\n- Forgetting brackets for a fall, or forgetting the heading with both years.\n- In interpretation, describing the numbers without giving the **reason** and the **effect**.\n\n**How marks are usually awarded**\n- 1 mark: a concept, a base, a single percentage, or an assertion-reason item.\n- 3 marks: three objectives or limitations; a short comparative or common-size statement (format, absolute change, percentages).\n- 4 marks: a full comparative or common-size statement of profit and loss or balance sheet.\n- 6 marks: a statement with interpretation, or theory with meaning, objectives and limitations.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Analysis of financial statements', 'Critical study of the statements to judge **profitability, solvency and efficiency**.', 'definition', 1],
  ['Horizontal analysis', 'The same item across years; tool: **comparative statements**.', 'definition', 1],
  ['Vertical analysis', 'Items against a base of the same year; tool: **common-size statements**.', 'definition', 1],
  ['Intra-firm vs inter-firm comparison', 'Intra: a firm against its own past. Inter: against other firms.', 'concept', 1],
  ['What a supplier looks for', '**Short-term solvency**: payment within the credit period.', 'concept', 1],
  ['What a debenture holder looks for', '**Long-term solvency**: interest and repayment over years.', 'concept', 1],
  ['Four tools of analysis', 'Comparative statements, common-size statements, ratio analysis, cash flow statement.', 'fact', 1],
  ['Why inflation is a limitation', 'Rupees of different years are compared as if equal; growth may only be price rise.', 'exam-tip', 1],
  ['Why different accounting policies matter', 'Different depreciation or inventory methods spoil inter-firm comparison.', 'concept', 1],
  ['Qualitative factors', 'Management quality, morale, reputation: **not captured** by analysis.', 'concept', 1],
  ['Columns of a comparative statement', 'Particulars, previous year, current year, absolute change, percentage change.', 'fact', 2],
  ['Absolute change', 'Current year − previous year.', 'fact', 2],
  ['Percentage change', 'Absolute change ÷ **previous year** × 100.', 'fact', 2],
  ['Showing a fall', 'In **brackets** (or with a minus sign), in both change columns.', 'exam-tip', 2],
  ['Percentage change of a total', 'Its own change ÷ its own previous figure; **never** add item percentages.', 'exam-tip', 2],
  ['Expenses grow faster than revenue', 'Profit grows **more slowly** than revenue, and may even fall.', 'concept', 2],
  ['Comparative balance sheet check', 'Total equity and liabilities and total assets change by the **same amount**.', 'fact', 2],
  ['Sources and uses', 'Rise in funds (equity, borrowings) against rise in assets.', 'concept', 2],
  ['Large percentage, small amount', 'A big percentage on a small base may be few rupees: read both columns.', 'exam-tip', 2],
  ['Base: common-size statement of profit and loss', '**Revenue from operations** = 100.', 'fact', 3],
  ['Base: common-size balance sheet', '**Balance sheet total** = 100 (each part).', 'fact', 3],
  ['Why total income can exceed 100', 'Other income is added on top of revenue, the base.', 'concept', 3],
  ['Rounding rule', 'Two decimals; if a part is 99.99 or 100.01, move the line with the largest rounding error by 0.01.', 'exam-tip', 3],
  ['Common-size helps compare…', 'Firms of **different sizes** (percentages remove size).', 'concept', 3],
  ['Falling share, rising amount?', 'Yes, if revenue (the base) grows faster than the item.', 'concept', 3],
  ["An expense's share of revenue rises", 'More of each rupee of sales goes on it: the margin is squeezed.', 'concept', 3],
  ['Borrowings share of the balance sheet rises', 'More reliance on debt: higher financial risk.', 'concept', 3],
  ['Profit up in rupees, margin down', 'The firm is bigger but less efficient.', 'concept', 3],
  ['Comparative vs common-size', 'Comparative: speed of change across years. Common-size: structure within a year.', 'fact', 3],
  ['Interpretation answer pattern', 'Figure → reason → effect.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Analysis of Financial Statements',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_lender', 'm_pct_calc', 'm_cs_base_pl', 'ar_horizontal'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer both questions. Round percentages to two decimal places.', items: ['s3_cpl_kalindi', 's3_cmp_vs_cs'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l4_cbs_betwa', 'l4_cspl_ghaghara'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l6_cpl_subarnarekha', 'l6_csbs_gandak'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Analysis of Financial Statements',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_interfirm', 'm_limit_policy', 'm_pct_decrease', 'm_pbt_growth', 'm_cs_calc', 'm_cs_interpret', 'ar_judgement', 'ar_size'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice. Round percentages to two decimal places.', items: ['s3_objectives', 's3_cbs_tons', 's3_cspl_rihand', { attempt: 1, keys: ['s3_interpret_girna', 's3_interpret_alaknanda'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_cpl_hemavati', { attempt: 1, keys: ['l4_csbs_penna', 'l4_evaluate_bhadra'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l6_cbs_teesta', { attempt: 1, keys: ['l6_cspl_hasdeo', 'l6_interfirm_tiles'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-accountancy-ch09 only (meaning, significance, objectives, limitations and tools of analysis; comparative statement of profit and loss and comparative balance sheet; common-size statement of profit and loss and common-size balance sheet with interpretation). Ratios and the cash flow statement are named as tools only (chapters 10 and 11). Exceptional and extraordinary items and discontinued operations (removed for 2026-27) appear only as one "not in the syllabus" line in the notes',
    originality: 'every company, scenario and figure written for this chapter (imagined companies in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `every statement built in acc.mjs from its givens and re-added (total income, total expenses, profit before tax, whole-rupee tax, profit after tax; head and part totals; equity and liabilities = assets on every date); every absolute and percentage change computed and asserted (changes of totals re-add; both balance sheet totals change equally); every common-size percentage computed in integer hundredths, rounded to two decimals half away from zero, with each balance sheet part re-adding to 100.00 (one explicit † adjustment, Penna, and one in the deck, Vellar) and every profit and loss relation holding in the rounded figures. Pinned results: Shipra profit after tax +${pc(SFc.ch.pat.h)}%, Zuari total +${pc(ZAc.ch.elT.h)}%, Kabini margin ${pc(KCc.p.pat[0])} to ${pc(KCc.p.pat[1])}, Barak shareholders' funds ${pc(BB_SF[0])} to ${pc(BB_SF[1])}; ${FACTS.join('; ')}`,
    facts: 'base of the common-size statement of profit and loss is revenue from operations; of the common-size balance sheet, the balance sheet total; percentage change is on the previous year; the four tools are comparative statements, common-size statements, ratio analysis and the cash flow statement',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
