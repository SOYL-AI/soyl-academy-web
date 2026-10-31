// Build ISC 12 Accounts ch10 Financial Statement Analysis: Comparative and Common Size Statements.
// Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { fig, rs, rw, words, sum, check, hundredths, pc, pcs, pctWords, plStatement, bsStatement, comparative, commonSize, PL_GIVEN, SUBS, HEADS } from './acc.mjs';

setUnit('isc-12-accounts-ch10', 'economics-commerce');
const { RULE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const Y = ['2024-25', '2025-26'];
const D = ['31 March 2025', '31 March 2026'];
const tab = (x, alt, caption) => table(x.headers, x.rows, alt, caption);

// ---------------------------------------------------------------- Part 1 running figures (computed, never typed)
// Shivneri Fruit Pulp Ltd, Narayangaon (imagined): two years of results and two balance sheets.
const SP = plStatement({ cols: Y, taxRate: 30, v: { rev: [5000000, 6000000], oi: [100000, 90000], com: [2800000, 3480000], emp: [600000, 660000], fin: [100000, 150000], dep: [200000, 240000], oth: [400000, 420000] } });
const SPc = comparative(SP);
eq([SP.val('ti'), SP.val('te'), SP.val('pbt'), SP.val('tax'), SP.val('pat')], [[5100000, 6090000], [4100000, 4950000], [1000000, 1140000], [300000, 342000], [700000, 798000]], 'Shivneri profit and loss');
eq(['rev', 'oi', 'ti', 'com', 'emp', 'fin', 'dep', 'oth', 'te', 'pbt', 'pat'].map((k) => SPc.ch[k].h), [2000, -1000, 1941, 2429, 1000, 5000, 2000, 500, 2073, 1400, 1400], 'Shivneri percentage changes');
const SB = bsStatement({ cols: D, v: { sc: [2000000, 2500000], rs: [600000, 800000], ltb: [1000000, 800000], tp: [300000, 420000], ocl: [100000, 80000], stp: [200000, 240000], ppe: [2500000, 3000000], intang: [200000, 160000], nci: [300000, 300000], inv: [500000, 640000], tr: [400000, 460000], cce: [300000, 280000] } });
const SBc = comparative(SB);
eq([SB.part.el, SBc.ch.elT.abs, SBc.ch.elT.h, SBc.ch.rs.h, SBc.ch.cce.h, SBc.ch.nci.h], [[4200000, 4840000], 640000, 1524, 3333, -667, 0], 'Shivneri balance sheet');
eq(['sf', 'ncl', 'cl', 'nca', 'ca'].map((h) => SBc.headCh[h].h), [2692, -2000, 2333, 1533, 1500], 'Shivneri head changes');
// Jaigarh and Kumbhalgarh Brassware (imagined): inter-firm comparison, 2025-26, Jaigarh the base.
const JK = plStatement({ cols: ['Jaigarh Brassware', 'Kumbhalgarh Brassware'], taxRate: 25, v: { rev: [4000000, 5000000], com: [2400000, 3250000], emp: [400000, 450000], oth: [400000, 550000] } });
const JKc = comparative(JK, { interfirm: true });
eq([JK.val('pat'), JKc.ch.rev.h, JKc.ch.com.h, JKc.ch.te.h, JKc.ch.pat.h], [[600000, 562500], 2500, 3542, 3281, -625], 'Jaigarh Kumbhalgarh');

// ---------------------------------------------------------------- Part 2 running figures
// Panhala Jaggery Ltd, Kodoli (imagined).
const PP = plStatement({ cols: Y, taxRate: 30, v: { rev: [4000000, 5000000], oi: [80000, 50000], com: [2200000, 2900000], emp: [400000, 450000], fin: [80000, 100000], dep: [120000, 150000], oth: [360000, 400000] } });
const PPs = commonSize(PP);
eq(['oi', 'ti', 'com', 'emp', 'fin', 'dep', 'oth', 'te', 'pbt', 'tax', 'pat'].map((k) => PPs.p[k]), [[200, 100], [10200, 10100], [5500, 5800], [1000, 900], [200, 200], [300, 300], [900, 800], [7900, 8000], [2300, 2100], [690, 630], [1610, 1470]], 'Panhala common-size profit and loss');
eq([PP.val('pat'), PPs.rounded], [[644000, 735000], 0], 'Panhala rupees');
const PB = bsStatement({ cols: D, v: { sc: [1500000, 1500000], rs: [300000, 500000], ltb: [600000, 700000], tp: [450000, 450000], stp: [150000, 150000], ppe: [1800000, 2100000], nci: [150000, 150000], inv: [450000, 500000], tr: [360000, 330000], cce: [240000, 220000] } });
const PBs = commonSize(PB);
eq([PB.part.el, PBs.adjusted.map((a) => [a.key, a.col, a.by]), PBs.p.nci, PBs.p.ppe, PBs.p.cce, PBs.p.sc, PBs.p.tp], [[3000000, 3300000], [['nci', 1, -1]], [500, 454], [6000, 6364], [800, 667], [5000, 4545], [1500, 1364]], 'Panhala common-size balance sheet');
eq(['sf', 'ncl', 'cl', 'nca', 'ca'].map((h) => PBs.headP[h]), [[6000, 6061], [2000, 2121], [2000, 1818], [6500, 6818], [3500, 3182]], 'Panhala head shares');
// Sindhudurg and Vijaydurg Fish Foods (imagined): inter-firm common-size, 2025-26.
const SV = plStatement({ cols: ['Sindhudurg Fish Foods', 'Vijaydurg Fish Foods'], taxRate: 25, v: { rev: [2000000, 8000000], com: [1100000, 4800000], emp: [240000, 640000], fin: [40000, 320000], dep: [60000, 240000], oth: [160000, 480000] } });
const SVs = commonSize(SV);
eq(['com', 'emp', 'fin', 'dep', 'oth', 'te', 'pbt', 'tax', 'pat'].map((k) => SVs.p[k]), [[5500, 6000], [1200, 800], [200, 400], [300, 300], [800, 600], [8000, 8100], [2000, 1900], [500, 475], [1500, 1425]], 'Sindhudurg Vijaydurg');
eq(SV.val('pat'), [300000, 1140000], 'Sindhudurg Vijaydurg rupees');

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Why analyse financial statements', 'Two tools: comparative and common-size', 'Significance and limitations', 'Comparative Statement of Profit and Loss', 'Comparative Balance Sheet', 'Inter-firm comparison'], 'Route map of Part one: why statements are analysed, the two tools of this chapter, their significance and limitations, the comparative statement of profit and loss, the comparative balance sheet, and comparison between two firms', 'Part 1 at a glance');
const vTools = table(
  ['Tool', 'What it shows', 'Kind of analysis'],
  [
    ['Comparative statements', 'The same items for two or more years (or two firms) side by side, with the absolute and percentage change', 'Horizontal (dynamic)'],
    ['Common-size statements', 'Every item as a percentage of a common base of the same statement', 'Vertical (static)'],
    ['Cash flow statement (Chapter 11)', 'Inflows and outflows of cash by activity', 'Movement of cash'],
    ['Ratio analysis (Chapter 12)', 'One figure related to another, such as current assets to current liabilities', 'Relationships'],
  ],
  'Table of the tools of financial statement analysis: comparative statements show change over years or between firms, which is horizontal analysis; common-size statements show each item as a percentage of a base, which is vertical analysis; the cash flow statement and ratio analysis follow in the next chapters',
  'This chapter covers the first two tools.',
);
const vHV = table(
  ['Basis', 'Horizontal (dynamic) analysis', 'Vertical (static) analysis'],
  [
    ['Periods studied', 'Two or more years (or firms)', 'One statement of one year'],
    ['Question asked', 'How far has each item moved?', 'What share of the base is each item?'],
    ['Base of the percentage', 'The same item in the earlier year', 'Revenue from operations, or the balance sheet total'],
    ['Usual tool', 'Comparative statement', 'Common-size statement'],
  ],
  'Table contrasting horizontal and vertical analysis: horizontal analysis studies how each item moved across years with the earlier year as base, using comparative statements; vertical analysis studies the share of each item in a base of the same year, using common-size statements',
);
const vUsers = table(
  ['Reader', 'What the statements tell them'],
  [
    ['Management', 'Which costs grow faster than revenue; where control and planning are needed'],
    ['Shareholders', 'Whether profit and the profit margin are rising'],
    ['Banks and lenders', 'Changes in current assets and liabilities (short-term) and in borrowings and owners’ funds (long-term)'],
    ['Suppliers', 'Whether the company can pay its trade payables on time'],
    ['Analysts', 'How the company compares with others of different size (inter-firm)'],
  ],
  'Table of readers and what the statements tell them: management sees which costs outgrow revenue, shareholders see profit and margin, lenders see short-term and long-term solvency, suppliers see the ability to pay, and analysts compare firms of different sizes',
);
const vLimits = table(
  ['Limitation', 'Why it matters'],
  [
    ['Historical figures', 'They describe the past; decisions are about the future'],
    ['Price changes ignored', 'A rise in rupees may be only inflation'],
    ['Qualitative factors left out', 'Skill, morale, reputation and competition have no rupee figure'],
    ['Accounting policies differ', 'Firms using different methods are not strictly comparable'],
    ['Window dressing', 'Figures can be made to look better on the balance sheet date'],
    ['Symptoms, not causes', 'A change shows where to look, not why it happened'],
  ],
  'Table of six limitations: figures are historical, price changes are ignored, qualitative factors are left out, accounting policies differ between firms, figures can be window dressed, and the statements show symptoms rather than causes',
);
const vFormat = table(
  ['Column', 'What goes in it'],
  [
    ['Particulars', 'The heads and sub-heads in Schedule III order (no notes column)'],
    [`${Y[0]} (₹)`, 'The earlier year: the base'],
    [`${Y[1]} (₹)`, 'The later year'],
    ['Absolute change (₹)', 'Later year − earlier year; a decrease in brackets'],
    ['Percentage change (%)', 'Absolute change ÷ earlier year × 100, to two decimals; a dash if the earlier figure is nil'],
  ],
  'Table of the five columns of a comparative statement: particulars in schedule order, the earlier year as the base, the later year, the absolute change as later minus earlier, and the percentage change as absolute change divided by the earlier year times one hundred, rounded to two decimals',
  RULE,
);
const vWE1a = table(['Particulars', `${Y[0]} (₹)`, `${Y[1]} (₹)`], ['rev', 'oi', ...SP.exps].map((k) => [PL_GIVEN[k], ...SP.val(k).map(fig)]),`Givens of Shivneri Fruit Pulp: revenue from operations ${rw(SP.val('rev')[0])} and ${rw(SP.val('rev')[1])}, other income, cost of materials, employee benefits, finance costs, depreciation and other expenses for the two years`, 'Shivneri Fruit Pulp Ltd, Narayangaon (imagined). Tax: 30% of profit before tax.');
const vWE1b = tab(SPc, `Comparative statement of profit and loss of Shivneri: revenue up ${pctWords(SPc.ch.rev.h)}, total expenses up ${pctWords(SPc.ch.te.h)}, profit before tax and profit after tax up ${pctWords(SPc.ch.pat.h)}`, `Comparative Statement of Profit and Loss of Shivneri Fruit Pulp Ltd (imagined) for the years ended ${D[0]} and ${D[1]}.`);
const BAR_KEYS = [['rev', 'Revenue from operations'], ['oi', 'Other income'], ['com', 'Materials consumed'], ['emp', 'Employee benefits'], ['fin', 'Finance costs'], ['dep', 'Depreciation'], ['oth', 'Other expenses'], ['te', 'Total expenses'], ['pat', 'Profit after tax']];
const vBars = (() => {
  const s = new Svg(640, 380);
  const lo = -1500, hi = 5500, left = 210, right = 600, top = 50, bh = 24, gap = 10;
  const X = (v) => left + ((v - lo) / (hi - lo)) * (right - left);
  s.text(320, 22, 'Shivneri Fruit Pulp: percentage change, 2024-25 to 2025-26', { size: 14, bold: true });
  BAR_KEYS.forEach(([k, label], i) => {
    const h = SPc.ch[k].h;
    const y = top + i * (bh + gap);
    const x0 = X(0), x1 = X(h);
    s.rect(Math.min(x0, x1), y, Math.abs(x1 - x0), bh, { fill: h < 0 ? 'red' : k === 'pat' || k === 'rev' ? 'green' : 'blue', color: 'accent', sw: 1, rx: 2 });
    s.text(left - 10, y + bh / 2, label, { size: 12, anchor: 'end' });
    s.text(h < 0 ? x1 - 6 : x1 + 6, y + bh / 2, pcs(h), { size: 12, anchor: h < 0 ? 'end' : 'start', bold: true });
  });
  const yEnd = top + BAR_KEYS.length * (bh + gap);
  s.line(X(0), top - 8, X(0), yEnd, { sw: 1.5 });
  s.text(X(0), yEnd + 14, '0', { size: 11, muted: true });
  return s.visual(`Bar chart of Shivneri's percentage changes: revenue ${pctWords(SPc.ch.rev.h)} up, other income ${pctWords(SPc.ch.oi.h)} down, materials ${pctWords(SPc.ch.com.h)} up, employee benefits ${pctWords(SPc.ch.emp.h)}, finance costs ${pctWords(SPc.ch.fin.h)}, depreciation ${pctWords(SPc.ch.dep.h)}, other expenses ${pctWords(SPc.ch.oth.h)}, total expenses ${pctWords(SPc.ch.te.h)} and profit after tax ${pctWords(SPc.ch.pat.h)} up`, 'Bar lengths are computed from the comparative statement.');
})();
const vRead = table(
  ['If the comparative statement shows…', 'It suggests…'],
  [
    ['Expenses rising faster than revenue', 'Profit growing more slowly than sales; costs need control'],
    ['Revenue rising faster than expenses', 'Profit growing faster than sales (some costs are fixed)'],
    ['Finance costs rising sharply', 'More borrowing or a higher rate of interest'],
    ['Inventories or receivables rising faster than revenue', 'Slow-moving stock or slow collection from customers'],
    ['Assets growing with owners’ funds, borrowings cut', 'A safer, less debt-dependent business'],
  ],
  'Table on reading a comparative statement: expenses outgrowing revenue squeezes profit; revenue outgrowing expenses widens it; sharply rising finance costs point to more borrowing; stock or receivables outgrowing revenue point to slow sales or collection; growth financed by owners with borrowings cut is safer',
);
const vWE2 = tab(SBc, `Comparative balance sheet of Shivneri: total ${rw(SB.part.el[0])} rising to ${rw(SB.part.el[1])}, a change of ${pctWords(SBc.ch.elT.h)} on both sides`, `Comparative Balance Sheet of Shivneri Fruit Pulp Ltd (imagined) as at ${D[0]} and ${D[1]}.`);
const HEAD_ROWS = ['sf', 'ncl', 'cl', 'nca', 'ca'].map((h) => [HEADS[h][1], fig(SBc.headCh[h].a), fig(SBc.headCh[h].b), fig(SBc.headCh[h].abs), pc(SBc.headCh[h].h)]);
const vWE2b = table(['Major head', `${D[0]} (₹)`, `${D[1]} (₹)`, 'Absolute change (₹)', 'Percentage change (%)'], HEAD_ROWS, `Head totals of Shivneri: shareholders funds up ${pctWords(SBc.headCh.sf.h)}, non-current liabilities down ${pctWords(SBc.headCh.ncl.h)}, current liabilities up ${pctWords(SBc.headCh.cl.h)}, non-current assets up ${pctWords(SBc.headCh.nca.h)} and current assets up ${pctWords(SBc.headCh.ca.h)}`, 'Each head is added from its sub-heads first; its percentage is worked on its own earlier total.');
const vIntraInter = table(
  ['Basis', 'Intra-firm comparison', 'Inter-firm comparison'],
  [
    ['What changes', 'The period (same firm, two or more years)', 'The firm (same period, two or more firms)'],
    ['Columns', 'Earlier year, later year', 'Base firm, other firm'],
    ['Change columns', 'Absolute change; % change on the earlier year', 'Difference; % difference on the base firm'],
    ['Question answered', 'Is the firm doing better than last year?', 'Is the firm doing better than its rival?'],
  ],
  'Table contrasting intra-firm and inter-firm comparison: intra-firm keeps the firm and changes the year, with percentages on the earlier year; inter-firm keeps the year and changes the firm, with percentages on the base firm',
);
const vWE3 = tab(JKc, `Inter-firm comparative statement: Kumbhalgarh's revenue is ${pctWords(JKc.ch.rev.h)} higher than Jaigarh's, its total expenses ${pctWords(JKc.ch.te.h)} higher, and its profit after tax ${pctWords(JKc.ch.pat.h)} lower`, `Inter-firm Comparative Statement of Profit and Loss of Jaigarh Brassware Ltd (base) and Kumbhalgarh Brassware Ltd (both imagined), year ended ${D[1]}. Tax 25% for both.`);
const vSpecial = table(
  ['Situation', 'Absolute change', 'Percentage change'],
  [
    ['Item falls', 'In brackets, e.g. (20,000)', 'In brackets, e.g. (6.67)'],
    ['Item unchanged', '0', '0.00'],
    ['Earlier figure nil', 'The full later amount', '— (no base to divide by)'],
    ['A total or a head', 'Added from its lines', 'Worked on its own earlier total, never an average of the line percentages'],
    ['Decimals', 'Whole rupees', 'Two decimals; 0.005 rounds up in size'],
  ],
  'Table of special cases: a fall is shown in brackets in both columns; an unchanged item shows zero; when the earlier figure is nil only the rupee change is shown and the percentage is a dash; a total has its own percentage on its own earlier total; percentages are rounded to two decimals',
);
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Comparative statement', 'Two years (or firms) side by side with absolute and percentage change'],
    ['Absolute change', 'Later − earlier (or other firm − base firm)'],
    ['Percentage change', 'Absolute change ÷ earlier year (or base firm) × 100, two decimals'],
    ['Balance sheet check', 'Both totals change by the same amount and percentage'],
    ['Significance', 'Trend, strengths and weaknesses, solvency, comparison with rivals'],
    ['Limitations', 'Historical, price changes ignored, qualitative factors left out, policies differ'],
  ],
  'Summary table of Part one: the comparative statement, the formulas for absolute and percentage change, the balance sheet check, and the significance and limitations of the tool',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Common-size: meaning and base', 'Common-size Statement of Profit and Loss', 'Common-size Balance Sheet', 'Rounding to 100.00', 'Inter-firm common-size', 'Comparative or common-size?'], 'Route map of Part two: the meaning and base of common-size statements, the common-size statement of profit and loss, the common-size balance sheet, rounding so each part totals one hundred, inter-firm common-size comparison, and choosing between the two tools', 'Part 2 at a glance');
const vCSMeaning = table(
  ['Statement', 'Base taken as 100', 'Every other line'],
  [
    ['Common-size Statement of Profit and Loss', 'Revenue from operations of that year', 'Item ÷ revenue from operations × 100 (other income too, so total income may exceed 100)'],
    ['Common-size Balance Sheet', 'Total of the balance sheet on that date', 'Item ÷ total × 100; each part (equity and liabilities, assets) adds to 100'],
  ],
  'Table of the base for each common-size statement: revenue from operations for the statement of profit and loss, where other income is also divided by revenue so total income may exceed one hundred; the balance sheet total for the balance sheet, where each part adds to one hundred',
);
const vCSFormat = table(
  ['Column', 'What goes in it'],
  [
    ['Particulars', 'Heads and sub-heads in Schedule III order'],
    [`${Y[0]} (₹) and ${Y[1]} (₹)`, 'The rupee amounts (usually shown)'],
    [`${Y[0]} (%) and ${Y[1]} (%)`, 'Each amount ÷ the base of its own year × 100, two decimals'],
  ],
  'Table of the columns of a common-size statement: particulars in schedule order, the rupee amounts of both years, and each amount as a percentage of its own year base, to two decimals',
  'The base of each year is that year’s own revenue or total; never divide a later-year figure by an earlier-year base.',
);
const vWE4 = tab(PPs, `Common-size statement of profit and loss of Panhala Jaggery: materials ${pctWords(PPs.p.com[0])} then ${pctWords(PPs.p.com[1])} of revenue; profit after tax ${pctWords(PPs.p.pat[0])} then ${pctWords(PPs.p.pat[1])}`, `Common-size Statement of Profit and Loss of Panhala Jaggery Ltd, Kodoli (imagined), for the years ended ${D[0]} and ${D[1]}. Tax: 30% of profit before tax.`);
const RUPEE = [['com', 'Materials', 'red'], ['emp', 'Staff', 'yellow'], ['fin', 'Interest', 'brown'], ['dep', 'Dep.', 'muted'], ['oth', 'Other', 'fill'], ['tax', 'Tax', 'blue'], ['pat', 'Profit', 'green']];
const vRupee = (() => {
  const s = new Svg(640, 260);
  const left = 90, W = 500, top = 60, bh = 46, gap = 50, max = 10500;
  const X = (v) => left + (W * v) / max;
  s.text(320, 22, 'Panhala Jaggery: where each 100 of revenue (plus other income) went', { size: 14, bold: true });
  [0, 1].forEach((i) => {
    const y = top + i * (bh + gap);
    let at = 0;
    for (const [k, label, color] of RUPEE) {
      const v = PPs.p[k][i];
      s.rect(X(at), y, X(at + v) - X(at), bh, { fill: color, color: 'accent', sw: 1, rx: 0 });
      if (X(at + v) - X(at) > 34) {
        s.text((X(at) + X(at + v)) / 2, y + 15, label, { size: 11 });
        s.text((X(at) + X(at + v)) / 2, y + 32, pc(v), { size: 11, bold: true });
      }
      at += v;
    }
    check(at === PPs.p.ti[i], `rupee bar ${i} adds to total income ${PPs.p.ti[i]}`);
    s.text(left - 10, y + bh / 2, Y[i], { size: 13, anchor: 'end', bold: true });
    s.text(X(at) + 6, y + bh / 2, pc(at), { size: 11, anchor: 'start', muted: true });
  });
  s.line(X(10000), top - 12, X(10000), top + 2 * bh + gap + 12, { sw: 1.4, dash: true, color: 'muted' });
  s.text(X(10000), top - 20, '100 = revenue', { size: 11, muted: true });
  return s.visual(`Two stacked bars for Panhala Jaggery. In the earlier year materials take ${pctWords(PPs.p.com[0])} and profit after tax ${pctWords(PPs.p.pat[0])}; in the later year materials take ${pctWords(PPs.p.com[1])} and profit ${pctWords(PPs.p.pat[1])}. Each bar runs a little past one hundred because other income is added`, 'Segment widths are the common-size percentages; each bar adds to total income.');
})();
const vReadPL = table(
  ['If the common-size statement shows…', 'It suggests…'],
  [
    ['Materials take a larger share of revenue', 'Dearer inputs not passed on, or more wastage'],
    ['Employee or other expenses take a smaller share', 'Better control of those costs (or costs fixed while sales grew)'],
    ['Finance costs take a larger share', 'Heavier borrowing'],
    ['Profit after tax takes a smaller share', 'Each rupee of sales earns less, even if rupee profit rose'],
  ],
  'Table on reading a common-size statement of profit and loss: a rising materials share means dearer inputs or wastage, a falling staff or other share means better control, a rising finance share means more borrowing, and a falling profit share means each rupee of sales earns less',
  'A share can fall while the rupee amount rises, if revenue grows faster.',
);
const vWE5 = tab(PBs, `Common-size balance sheet of Panhala: shareholders funds ${pctWords(PBs.headP.sf[0])} then ${pctWords(PBs.headP.sf[1])} of the total; property, plant and equipment ${pctWords(PBs.p.ppe[0])} then ${pctWords(PBs.p.ppe[1])}; one line marked with a dagger after rounding`, `Common-size Balance Sheet of Panhala Jaggery Ltd (imagined) as at ${D[0]} and ${D[1]}. ${PBs.adjNote}`);
const ROUND_KEYS = ['ppe', 'nci', 'inv', 'tr', 'cce'];
const exact4 = (x, base) => ((x * 100) / base).toFixed(4);
const roundRows = ROUND_KEYS.map((k) => {
  const x = PB.val(k)[1];
  const raw = hundredths(x, PB.part.as[1]);
  return [SUBS[k][1], fig(x), exact4(x, PB.part.as[1]), pc(raw), `${pc(PBs.p[k][1])}${PBs.p[k][1] !== raw ? ' †' : ''}`];
});
const rawSum = sum(ROUND_KEYS.map((k) => hundredths(PB.val(k)[1], PB.part.as[1])));
eq([rawSum, sum(ROUND_KEYS.map((k) => PBs.p[k][1]))], [10001, 10000], 'Panhala rounding');
const vRound = table(['Asset (31 March 2026)', '₹', 'Exact %', 'Rounded', 'Shown'], [...roundRows, [bold('Total'), bold(fig(PB.part.as[1])), '100.0000', bold(pc(rawSum)), bold('100.00')]], `Table of the rounding of Panhala's assets on the later date: the rounded percentages add to ${pc(rawSum).replace('.', ' point ')}, so non-current investments, the line with the largest rounding error, is lowered by one hundredth and the column totals one hundred`, 'The line rounded up by the most is moved by 0.01 and marked †.');
function bold(s) {
  return `**${s}**`;
}
const vColumns = (() => {
  const s = new Svg(640, 330);
  const top = 50, H = 220, W = 90;
  const cols = [
    [`E and L ${Y[0].slice(0, 4)}`, 0, [['sf', 'blue'], ['ncl', 'yellow'], ['cl', 'red']]],
    [`E and L ${Y[1].slice(0, 4)}`, 1, [['sf', 'blue'], ['ncl', 'yellow'], ['cl', 'red']]],
    [`Assets ${Y[0].slice(0, 4)}`, 0, [['nca', 'green'], ['ca', 'fill']]],
    [`Assets ${Y[1].slice(0, 4)}`, 1, [['nca', 'green'], ['ca', 'fill']]],
  ];
  const short = { sf: "Owners' funds", ncl: 'Long-term debt', cl: 'Current liab.', nca: 'Non-current', ca: 'Current' };
  cols.forEach(([label, i, parts], c) => {
    const x = 40 + c * 150;
    let y = top;
    check(sum(parts.map(([h]) => PBs.headP[h][i])) === 10000, `${label} column adds to 100.00`);
    for (const [h, color] of parts) {
      const hh = (H * PBs.headP[h][i]) / 10000;
      s.rect(x, y, W, hh, { fill: color, color: 'accent', sw: 1.2, rx: 1 });
      s.text(x + W / 2, y + hh / 2 - 8, short[h], { size: 11 });
      s.text(x + W / 2, y + hh / 2 + 8, pc(PBs.headP[h][i]), { size: 12, bold: true });
      y += hh;
    }
    check(Math.abs(y - top - H) < 1e-9, `${label} height`);
    s.text(x + W / 2, top + H + 18, label, { size: 12, bold: true });
  });
  s.text(320, 24, 'Panhala Jaggery: each part as 100 (by major head)', { size: 14, bold: true });
  return s.visual(`Four columns of equal height for Panhala's balance sheet. Owners funds ${pctWords(PBs.headP.sf[0])} and then ${pctWords(PBs.headP.sf[1])} of the total; long-term debt ${pctWords(PBs.headP.ncl[0])} and then ${pctWords(PBs.headP.ncl[1])}; current liabilities ${pctWords(PBs.headP.cl[0])} and then ${pctWords(PBs.headP.cl[1])}. Non-current assets rise from ${pctWords(PBs.headP.nca[0])} to ${pctWords(PBs.headP.nca[1])}`, 'Heights are the head percentages; every column is 100.');
})();
const vWE5b = table(
  ['Major head', `${D[0]} (%)`, `${D[1]} (%)`, 'Reading'],
  [
    ["Shareholders' Funds", pc(PBs.headP.sf[0]), pc(PBs.headP.sf[1]), 'Owners still provide about three-fifths; retained profit added'],
    ['Non-current Liabilities', pc(PBs.headP.ncl[0]), pc(PBs.headP.ncl[1]), 'A little more long-term borrowing'],
    ['Current Liabilities', pc(PBs.headP.cl[0]), pc(PBs.headP.cl[1]), 'Smaller share: suppliers financed less of the growth'],
    ['Non-current Assets', pc(PBs.headP.nca[0]), pc(PBs.headP.nca[1]), 'More funds locked in the plant (new crushers)'],
    ['Current Assets', pc(PBs.headP.ca[0]), pc(PBs.headP.ca[1]), 'Smaller share: watch liquidity'],
  ],
  `Table of Panhala's head shares: shareholders funds ${pctWords(PBs.headP.sf[0])} and ${pctWords(PBs.headP.sf[1])}, non-current liabilities ${pctWords(PBs.headP.ncl[0])} and ${pctWords(PBs.headP.ncl[1])}, current liabilities ${pctWords(PBs.headP.cl[0])} and ${pctWords(PBs.headP.cl[1])}, non-current assets ${pctWords(PBs.headP.nca[0])} and ${pctWords(PBs.headP.nca[1])}, current assets ${pctWords(PBs.headP.ca[0])} and ${pctWords(PBs.headP.ca[1])}`,
  'Head shares are each head total ÷ the balance sheet total, rounded on their own.',
);
const vSize = flow('LR', ['Two firms of very different size', 'Rupee figures cannot be compared directly', 'Divide each item by the firm’s own revenue or total', 'Shares of 100 can be compared line by line'], 'Flow showing why common-size statements suit inter-firm comparison: two firms of different size have rupee figures that cannot be compared, so each item is divided by the firm’s own base, and the resulting shares of one hundred can be compared line by line', 'Size is removed; the structure of costs and funds remains.');
const vWE6 = tab(SVs, `Inter-firm common-size statement: materials ${pctWords(SVs.p.com[0])} at Sindhudurg against ${pctWords(SVs.p.com[1])} at Vijaydurg; profit after tax ${pctWords(SVs.p.pat[0])} against ${pctWords(SVs.p.pat[1])}`, `Common-size Statement of Profit and Loss of Sindhudurg Fish Foods Ltd, Vengurla, and Vijaydurg Fish Foods Ltd, Devgad (both imagined), year ended ${D[1]}. Tax 25% for both.`);
const vWE6b = table(
  ['Line', 'Sindhudurg (%)', 'Vijaydurg (%)', 'Who does better, and why'],
  [
    ['Materials (fish, salt, packing)', pc(SVs.p.com[0]), pc(SVs.p.com[1]), 'Sindhudurg: cheaper catch or less waste'],
    ['Employee benefits', pc(SVs.p.emp[0]), pc(SVs.p.emp[1]), 'Vijaydurg: larger plant, fewer workers per rupee'],
    ['Finance costs', pc(SVs.p.fin[0]), pc(SVs.p.fin[1]), 'Sindhudurg: less borrowing'],
    ['Profit after tax', pc(SVs.p.pat[0]), pc(SVs.p.pat[1]), 'Sindhudurg is more profitable per rupee of revenue'],
  ],
  `Table reading the inter-firm common-size statement: Sindhudurg spends less of each rupee on materials and finance, Vijaydurg less on employees, and Sindhudurg keeps ${pctWords(SVs.p.pat[0])} as profit against ${pctWords(SVs.p.pat[1])}`,
  `In rupees Vijaydurg earns far more (${rs(SV.val('pat')[1])} against ${rs(SV.val('pat')[0])}) only because it is four times larger.`,
);
const vCmpVsCs = table(
  ['Basis', 'Comparative statement', 'Common-size statement'],
  [
    ['Analysis', 'Horizontal (dynamic)', 'Vertical (static)'],
    ['Percentages on', 'The same item in the earlier year (or base firm)', 'Revenue from operations, or the balance sheet total'],
    ['Shows', 'Direction and rate of change', 'Structure: the share of each item'],
    ['Best for', 'Trend of one firm', 'Firms of different sizes; changes in the mix'],
    ['Weakness', 'Large % on a tiny base can mislead', 'A falling share can hide a rising rupee amount'],
  ],
  'Table contrasting the two tools: comparative statements are horizontal, with percentages on the earlier year, and show the direction and rate of change; common-size statements are vertical, with percentages on revenue or the total, and show structure; each has its own weakness',
);
const vSummary2 = table(
  ['Idea', 'Rule'],
  [
    ['Common-size Statement of Profit and Loss', 'Every line ÷ revenue from operations × 100'],
    ['Common-size Balance Sheet', 'Every line ÷ balance sheet total × 100; each part = 100.00'],
    ['Rounding', 'Two decimals; if a part adds to 100.01 or 99.99, move the line with the largest rounding error by 0.01 (†)'],
    ['Reading', 'Compare shares across years or firms; convert back to rupees before judging amounts'],
    ['Inter-firm', 'Removes the effect of size; compares structure and margins'],
    ['Limits', 'No standard share; read with rupee figures; same limits as all analysis'],
  ],
  'Summary table of Part two: the base of each common-size statement, the rounding rule, how to read shares, the use in inter-firm comparison and the limits',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Comparative and Common Size Statements — Part 1: Meaning, Significance, Limitations and Comparative Statements',
  goals: [
    'Explain the purpose of comparative and common-size statements as tools of financial statement analysis',
    'State their significance to different readers and their limitations',
    'Prepare a Comparative Statement of Profit and Loss and a Comparative Balance Sheet with absolute and percentage change',
    'Prepare and read an inter-firm comparative statement',
  ],
  slides: [
    sl('title', 'Financial Statement Analysis: Comparative Statements', {
      b: 'Part 1 — what **comparative** and **common-size** statements are for, why they matter, where they fall short, and how to prepare **comparative statements** of one firm over two years and of two firms in one year. Every company and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'Financial statements tell us what happened in one year. Analysis asks what the figures mean: is the business growing, are its costs under control, is it safe to lend to it? In this part we meet two tools of analysis and prepare comparative statements. Our running company is Shivneri Fruit Pulp of Narayangaon, a maker of mango and guava pulp.',
    }),
    sl('concept', 'Tools of financial statement analysis', {
      v: vTools,
      b: 'Your syllabus pairs **comparative** and **common-size** statements in this chapter; the cash flow statement and ratios follow.',
      n: 'Analysts use several tools. Comparative statements put two years, or two firms, side by side and show how far each item has changed. Common-size statements turn every item into a share of a common base. The cash flow statement and ratio analysis are the next two chapters of the same section of your paper.',
    }),
    sl('concept', 'Horizontal and vertical analysis', {
      v: vHV,
      b: 'Comparative statements read **across** the years; common-size statements read **down** one statement.',
      n: 'Horizontal analysis follows one item across the years, so it is also called dynamic analysis. Its percentages are worked on the earlier year. Vertical analysis studies the make-up of one statement, so it is called static analysis, and its percentages are worked on a base of the same year, such as revenue from operations or the balance sheet total.',
    }),
    sl('concept', 'Significance: who uses them and why', {
      v: vUsers,
      bl: ['They show the **trend** and the **speed** of change.', 'They point to **strengths and weak spots** that need action.', 'Common-size figures make firms of **different sizes** comparable.'],
      n: 'Comparative and common-size statements matter because they turn a mass of figures into a few clear signals. Management sees which costs outgrow revenue. Shareholders see whether the margin is rising. Banks and suppliers judge whether they will be paid. Analysts compare a firm with rivals of a very different size.',
    }),
    sl('concept', 'Limitations', {
      v: vLimits,
      b: 'The statements show **what** changed; the analyst must still find out **why**.',
      n: 'These tools have limits. They work on past figures, which are not adjusted for changes in prices. They leave out things that have no rupee value, such as the skill of the staff. Different accounting policies make firms hard to compare, figures can be window dressed, and a change only tells the analyst where to look.',
    }),
    sl('check', 'Quick check: which statement shows what?', {
      b: 'Match each statement with what it shows.',
      chk: 'mt_tools',
      n: 'Ask of each statement whether it measures change or measures shares of a base, and whether it compares years or firms.',
    }),
    sl('concept', 'The comparative statement: format and formulas', {
      v: vFormat,
      b: 'Absolute change = later − earlier.  Percentage change = absolute change ÷ earlier × 100.',
      n: 'A comparative statement has five columns: the particulars, the earlier year, the later year, the absolute change and the percentage change. The absolute change is the later figure minus the earlier one. The percentage change divides that change by the earlier figure and multiplies by one hundred. Round every percentage to two decimals and show a fall in brackets.',
    }),
    sl('example', 'Worked example 1: Shivneri’s two years of results', {
      b: 'Shivneri Fruit Pulp Ltd, Narayangaon (imagined). Prepare a Comparative Statement of Profit and Loss. Tax is 30% of profit before tax.',
      v: vWE1a,
      n: `Here are Shivneri's figures for two years. Revenue from operations rose from ${rw(SP.val('rev')[0])} to ${rw(SP.val('rev')[1])}. Before any change is worked out, complete both years: total income, total expenses, profit before tax, tax at thirty per cent, and profit after tax.`,
    }),
    sl('example', 'Worked example 1 (continued): the comparative statement', {
      b: `Revenue rose by **${pcs(SPc.ch.rev.h)}**, total expenses by **${pcs(SPc.ch.te.h)}**, profit after tax by **${pcs(SPc.ch.pat.h)}**.`,
      v: vWE1b,
      n: `Total income rose by ${pctWords(SPc.ch.ti.h)}, but total expenses rose faster, by ${pctWords(SPc.ch.te.h)}. So profit before tax grew by only ${pctWords(SPc.ch.pbt.h)}, and with the same tax rate profit after tax grew by the same ${pctWords(SPc.ch.pat.h)}, to ${rw(SP.val('pat')[1])}. Note that the percentage for each total is worked on that total, not averaged.`,
    }),
    sl('diagram', 'Which lines moved most?', {
      v: vBars,
      b: 'Finance costs and materials grew faster than revenue; other income fell.',
      n: `The bars show each percentage change. Finance costs jumped by ${pctWords(SPc.ch.fin.h)} and materials by ${pctWords(SPc.ch.com.h)}, both faster than revenue. Other income fell. That is why profit, though higher, grew more slowly than sales. A chart like this tells management where to look first.`,
    }),
    sl('check', 'Quick check: the base of a percentage change', {
      b: 'Fill in the missing word.',
      chk: 'fb_base_year',
      n: 'Recall which year’s figure the absolute change is divided by.',
    }),
    sl('concept', 'Reading a comparative statement', {
      v: vRead,
      b: 'Always compare the growth of each cost with the growth of **revenue**.',
      n: 'A comparative statement is read by comparing rates of change. If expenses grow faster than revenue, profit grows more slowly than sales. Sharply rising finance costs point to more borrowing. Stock or receivables growing faster than sales point to slow-moving goods or slow collection. Growth financed by owners, with borrowings cut, makes a business safer.',
    }),
    sl('example', 'Worked example 2: Shivneri’s Comparative Balance Sheet', {
      b: `Both totals rise by ${rs(SBc.ch.elT.abs)}, that is **${pcs(SBc.ch.elT.h)}**.`,
      v: vWE2,
      n: `Each sub-head of the two balance sheets is set side by side in Schedule Three order. Reserves rose by ${pctWords(SBc.ch.rs.h)}, long-term borrowings fell by ${pctWords(SBc.ch.ltb.h)} and cash fell by ${pctWords(SBc.ch.cce.h)}. Both totals rise by ${rw(SBc.ch.elT.abs)}: the change on one side must equal the change on the other.`,
    }),
    sl('example', 'Worked example 2 (continued): reading the heads', {
      v: vWE2b,
      bl: [`Owners' funds up **${pcs(SBc.headCh.sf.h)}**; long-term debt down **${pc(-SBc.headCh.ncl.h)}%**: growth was financed by owners.`, `Non-current assets up **${pcs(SBc.headCh.nca.h)}**: new pulping machinery.`, `Current liabilities (${pcs(SBc.headCh.cl.h)}) grew faster than current assets (${pcs(SBc.headCh.ca.h)}): watch liquidity.`],
      n: `Adding the sub-heads gives the major heads. Shareholders funds grew by ${pctWords(SBc.headCh.sf.h)} while long-term borrowings were cut, so the company is less dependent on debt. But current liabilities grew faster than current assets, and cash fell, so its short-term position needs watching.`,
    }),
    sl('check', 'Quick check: a fall in cash', {
      b: 'True or false?',
      chk: 'tf_cash_fall',
      n: 'Work out the change, divide it by the earlier figure, and remember how a decrease is shown.',
    }),
    sl('concept', 'Intra-firm and inter-firm comparison', {
      v: vIntraInter,
      b: 'In an inter-firm statement the **base firm** takes the place of the earlier year.',
      n: 'Comparing a firm with its own past is intra-firm comparison. Comparing two firms for the same year is inter-firm comparison. The layout is the same, but the columns are the two firms, and the differences are worked on the firm chosen as the base.',
    }),
    sl('example', 'Worked example 3: two brassware makers', {
      b: 'Jaigarh Brassware Ltd (base) and Kumbhalgarh Brassware Ltd, both imagined, for 2025-26. Tax 25% of profit before tax.',
      v: vWE3,
      n: `Kumbhalgarh sells ${pctWords(JKc.ch.rev.h)} more than Jaigarh, yet earns ${pctWords(JKc.ch.pat.h)} less profit after tax. Its materials cost ${pctWords(JKc.ch.com.h)} more and its other expenses are much higher, so its total expenses are ${pctWords(JKc.ch.te.h)} above Jaigarh's. Bigger is not always more profitable.`,
    }),
    sl('check', 'Quick check: a percentage change', {
      b: 'Work it out.',
      chk: 'n_pct_change',
      n: 'Subtract the earlier figure from the later one, then divide by the earlier figure and multiply by one hundred.',
    }),
    sl('concept', 'Special cases', {
      v: vSpecial,
      b: 'A head or total gets its **own** percentage, worked on its own earlier total.',
      n: 'A few cases need care. A fall is shown in brackets in both change columns. An unchanged item shows zero. When the earlier figure is nil there is nothing to divide by, so only the rupee change is shown. And never average the percentages of the lines to get the percentage of a total.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: comparative statements set two years, or two firms, side by side. The absolute change is later minus earlier, and the percentage change divides it by the earlier figure. Both balance sheet totals change by the same amount. The statements show trends and weak spots, but they rest on past, unadjusted figures and leave out qualitative factors.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Complete **both years** (totals, profit before tax, tax, profit after tax) before the change columns.',
        'Divide by the **earlier year** (or the base firm), never by the later year.',
        'Show decreases in **brackets** in both change columns; a dash when the earlier figure is nil.',
        'Round to **two decimals** and say so; work each total’s percentage on that total.',
        'Check that both balance sheet totals change by the **same** amount and percentage.',
      ],
      n: 'In the exam, finish both years before working out any change. Always divide by the earlier year or the base firm. Put decreases in brackets in both change columns. Round to two decimals and state the rule. Work out the percentage of every total on that total, and check that both sides of a balance sheet change by the same amount.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Comparative and Common Size Statements — Part 2: Common Size Statements',
  goals: [
    'State the base of a common-size Statement of Profit and Loss and of a common-size Balance Sheet',
    'Prepare both common-size statements for two years, rounding so that each part totals 100.00',
    'Read a common-size statement to explain changes in cost structure, profitability and financing',
    'Use common-size statements to compare firms of different sizes and distinguish them from comparative statements',
  ],
  slides: [
    sl('title', 'Common Size Statements', {
      b: 'Part 2 — every item as a **share of a common base**: the common-size **Statement of Profit and Loss**, the common-size **Balance Sheet**, rounding to **100.00**, and comparison of firms of **different sizes**.',
      v: vRoute2,
      n: `A rupee figure on its own says little about structure. Is a materials bill of ${rw(PP.val('com')[1])} large? Only when we see what share of revenue it takes. In this part we turn statements into shares of one hundred. Our running company is Panhala Jaggery of Kodoli, which crushes sugarcane into jaggery blocks and powder.`,
    }),
    sl('concept', 'Meaning and the base', {
      v: vCSMeaning,
      b: 'Revenue from operations = **100** for profit and loss; the balance sheet total = **100** for each part of the balance sheet.',
      n: 'A common-size statement shows every item as a percentage of a common base of the same statement. In the statement of profit and loss, revenue from operations is the base, so even other income is divided by it, and total income can exceed one hundred. In the balance sheet, the total is the base, and each part adds to one hundred.',
    }),
    sl('concept', 'Format of a common-size statement', {
      v: vCSFormat,
      b: 'Each year is divided by **its own** base.',
      n: 'The usual layout shows the rupee amounts of both years and then the percentages of both years. Each year is divided by its own revenue or its own total. Percentages are rounded to two decimals. The heads and sub-heads stay in Schedule Three order.',
    }),
    sl('example', 'Worked example 4: Panhala’s common-size Statement of Profit and Loss', {
      b: 'Panhala Jaggery Ltd, Kodoli (imagined). Tax is 30% of profit before tax.',
      v: vWE4,
      n: `Every line is divided by revenue from operations of its own year. Other income was ${pctWords(PPs.p.oi[0])} of revenue and then ${pctWords(PPs.p.oi[1])}, so total income is just above one hundred. Materials rose from ${pctWords(PPs.p.com[0])} to ${pctWords(PPs.p.com[1])}, and profit after tax fell from ${pctWords(PPs.p.pat[0])} to ${pctWords(PPs.p.pat[1])} of revenue.`,
    }),
    sl('diagram', 'Where each hundred of revenue went', {
      v: vRupee,
      b: 'Cane took a bigger slice; staff and other costs took smaller ones; profit’s slice shrank.',
      n: `Each bar is one year, split into the shares of materials, staff, interest, depreciation, other expenses, tax and profit. In the later year the materials slice is wider and the profit slice narrower. Staff and other costs shrank a little, but not enough to offset the dearer cane.`,
    }),
    sl('check', 'Quick check: the base of a common-size statement of profit and loss', {
      b: 'Fill in the base.',
      chk: 'fb_cs_pl_base',
      n: 'Recall which figure is taken as one hundred in a common-size statement of profit and loss.',
    }),
    sl('concept', 'Reading a common-size Statement of Profit and Loss', {
      v: vReadPL,
      b: `Panhala: profit after tax rose in rupees (${rs(PP.val('pat')[0])} to ${rs(PP.val('pat')[1])}) although its share of revenue fell.`,
      n: `Read the shares across the two years. A larger materials share means dearer inputs or waste. A smaller staff share means better control. A falling profit share means each rupee of sales earns less. But a share can fall while the rupee amount rises: Panhala's profit after tax still rose to ${rw(PP.val('pat')[1])}, because revenue grew.`,
    }),
    sl('example', 'Worked example 5: Panhala’s common-size Balance Sheet', {
      b: 'Each item ÷ the total of its own date × 100; each part of each column totals 100.00.',
      v: vWE5,
      n: `The totals are ${rw(PB.part.el[0])} and ${rw(PB.part.el[1])}. On the earlier date every share is exact. On the later date the shares need rounding, and the rounded assets add to one hundred point zero one, so one line is lowered by one hundredth and marked with a dagger.`,
    }),
    sl('concept', 'Rounding so each part totals 100.00', {
      v: vRound,
      bl: ['Round each line to **two decimals** (0.005 rounds up in size).', 'If a part adds to **100.01** or **99.99**, move the line whose rounding error is largest in that direction by **0.01** and mark it **†**.'],
      n: 'Rounding each line can leave a column at one hundred point zero one or ninety-nine point nine nine. Then the line that was rounded the most in that direction is moved by one hundredth, and a note says so. Here non-current investments was rounded up the most, so it is shown one hundredth lower. No line moves more than one hundredth from its exact value.',
    }),
    sl('check', 'Quick check: a common-size share', {
      b: 'Work it out.',
      chk: 'n_cs_bs',
      n: 'Divide the item by the balance sheet total of the same date and multiply by one hundred.',
    }),
    sl('diagram', 'Panhala’s balance sheet in shares of 100', {
      v: vColumns,
      b: 'Owners still provide about three-fifths; more funds now sit in non-current assets.',
      n: `The four columns are all one hundred. On the funding side, owners funds moved from ${pctWords(PBs.headP.sf[0])} to ${pctWords(PBs.headP.sf[1])} and long-term debt rose a little. On the assets side, non-current assets grew from ${pctWords(PBs.headP.nca[0])} to ${pctWords(PBs.headP.nca[1])} of the total, so current assets now form a smaller share.`,
    }),
    sl('example', 'Worked example 5 (continued): reading the balance sheet', {
      v: vWE5b,
      b: 'Read the top half for **how the business is financed**, the bottom half for **how the money is used**.',
      n: 'The head shares tell a simple story. Panhala added new crushers, so non-current assets take a bigger share. It paid for them from retained profit and a little more long-term borrowing, not from suppliers. Current assets now form a smaller share, so the company should keep an eye on its liquidity.',
    }),
    sl('check', 'Quick check: the base for liabilities', {
      b: 'True or false?',
      chk: 'tf_cs_bs_base',
      n: 'Decide whether shareholders funds are part of the base on the equity and liabilities side.',
    }),
    sl('concept', 'Comparing firms of different sizes', {
      v: vSize,
      b: 'Common-size statements are the natural tool of **inter-firm** comparison.',
      n: 'Two firms of very different size cannot be compared rupee for rupee. A large firm will always have larger costs and larger profit. Dividing each item by the firm’s own revenue or total removes the effect of size, so the structure of costs, the margin and the way funds are raised can be compared line by line.',
    }),
    sl('example', 'Worked example 6: two fish processors', {
      b: 'Sindhudurg Fish Foods Ltd and Vijaydurg Fish Foods Ltd (both imagined), 2025-26. Vijaydurg is four times larger.',
      v: vWE6,
      n: `Each column is divided by that company's own revenue. Sindhudurg spends ${pctWords(SVs.p.com[0])} of revenue on fish and packing against ${pctWords(SVs.p.com[1])} at Vijaydurg. Its total expenses take ${pctWords(SVs.p.te[0])} against ${pctWords(SVs.p.te[1])}, so its profit after tax is ${pctWords(SVs.p.pat[0])} of revenue against ${pctWords(SVs.p.pat[1])}.`,
    }),
    sl('example', 'Worked example 6 (continued): who is more profitable?', {
      v: vWE6b,
      b: 'Larger rupee profit ≠ higher profitability.',
      n: `Vijaydurg earns ${rw(SV.val('pat')[1])} against Sindhudurg's ${rw(SV.val('pat')[0])}, but only because it is four times the size. Per rupee of revenue, Sindhudurg is more profitable: its materials and finance costs take smaller shares. Vijaydurg does better only on employee cost, where its larger plant helps.`,
    }),
    sl('check', 'Quick check: profit after tax as a share', {
      b: 'Work it out.',
      chk: 'n_cs_pat',
      n: 'Take the tax rate of the profit before tax share, and subtract it.',
    }),
    sl('concept', 'Comparative or common-size?', {
      v: vCmpVsCs,
      b: 'Use them **together**: one shows the change, the other the structure.',
      n: 'The two tools answer different questions. A comparative statement shows the direction and speed of change in each item. A common-size statement shows the structure of a statement and suits firms of different sizes. Each can mislead alone: a big percentage on a tiny base, or a falling share that hides a rising amount. So read them together.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: a common-size statement of profit and loss divides every line by revenue from operations, and a common-size balance sheet divides every line by the total, so each part adds to one hundred. Round to two decimals and adjust one line if a part misses one hundred. Read shares across years or firms, and convert back to rupees before judging amounts.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the base in your heading: **% of revenue from operations** or **% of total**.',
        'Divide each year by **its own** base; total income may exceed 100, a balance sheet part never does.',
        'Make each part of each balance sheet column total **100.00**; mark any adjusted line † and say why.',
        'In comments, compare **shares** and give the figures; do not confuse a falling share with a falling amount.',
        'For two firms, judge profitability by the **profit share**, not by rupee profit.',
      ],
      n: 'In the exam, name the base in the column heading. Divide each year by its own base. Make every part of every balance sheet column total one hundred, and explain any adjusted line. When you comment, quote the shares and do not confuse a falling share with a falling amount. For two firms, judge by the profit share, not by rupees.',
    }),
  ],
});

// Narration house rules on top of lib.mjs: no digits, rupee sign, slashes, ampersands, per-cent signs or capitals runs.
for (const d of [part1, part2])
  for (const s of d.slides) {
    const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
    check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
  }

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Comparative and Common Size Statements — Notes',
  sections: [
    {
      h: '1. Financial statement analysis and its tools',
      t: 1,
      b: "**Financial statement analysis** is the study of the Statement of Profit and Loss and the Balance Sheet to judge a company's profitability, solvency and efficiency, by comparing items over time, with other firms, and with each other.\n\n**Tools:** comparative statements and common-size statements (this chapter), the cash flow statement (Chapter 11) and ratio analysis (Chapter 12).\n\n- **Horizontal (dynamic) analysis:** the same item across two or more periods; tool: comparative statements.\n- **Vertical (static) analysis:** each item against a base of the same period; tool: common-size statements.\n\n*Not in the ISC 2027 syllabus:* notes to accounts. The statements in this chapter are prepared at head and sub-head level only, without a Note No. column.",
      terms: [
        ['Financial statement analysis', 'Studying the financial statements, by comparison over time, between firms and between items, to judge profitability, solvency and efficiency.'],
        ['Horizontal analysis', 'Analysis of the change in each item over two or more periods; also called dynamic analysis.'],
        ['Vertical analysis', 'Analysis of each item as a share of a base of the same period; also called static analysis.'],
      ],
      v: vTools,
      vs: [vHV],
    },
    {
      h: '2. Significance and limitations',
      t: 1,
      b: "**Significance**\n1. Show the **trend** of revenue, costs, profit, assets and liabilities, and the speed of each change.\n2. Point to **strengths and weaknesses** (costs outgrowing revenue, rising borrowing, slow-moving stock) so management can act.\n3. Help judge **profitability and solvency** for shareholders, lenders and suppliers.\n4. Make **inter-firm comparison** possible; common-size figures remove the effect of size.\n5. Support **planning and forecasting**.\n\n**Limitations**\n1. Based on **historical** figures; decisions concern the future.\n2. **Price-level changes** are ignored; a rise in rupees may be inflation.\n3. **Qualitative factors** (management, labour relations, competition) are left out.\n4. Different **accounting policies** make firms hard to compare.\n5. Figures may be **window-dressed**.\n6. They show **symptoms, not causes**; interpretation needs judgement. Common-size statements have no accepted standard share for each item.",
      terms: [
        ['Intra-firm comparison', 'Comparing the same firm over two or more periods.'],
        ['Inter-firm comparison', 'Comparing two or more firms for the same period.'],
        ['Window dressing', 'Presenting the financial position as better than it is on the balance sheet date.'],
      ],
      v: vUsers,
      vs: [vLimits],
    },
    {
      h: '3. Comparative statements: format and formulas',
      t: 2,
      b: `A **comparative statement** shows the Statement of Profit and Loss or the Balance Sheet of two (or more) years, or of two firms, side by side, with the change in each item.\n\n| Column | Content |\n|---|---|\n| Particulars | Heads and sub-heads in Schedule III order |\n| Earlier year (₹) | The base |\n| Later year (₹) | |\n| Absolute change (₹) | Later year − earlier year |\n| Percentage change (%) | Absolute change ÷ earlier year × 100 |\n\n**${RULE}** A decrease is shown in brackets in both change columns. If the earlier figure is nil, the percentage change is shown as a dash. A total or a head gets its own percentage on its own earlier total.`,
      terms: [
        ['Absolute change', 'The later-year figure minus the earlier-year figure, in rupees.'],
        ['Percentage change', 'The absolute change as a percentage of the earlier-year figure.'],
        ['Base year', 'The earlier year, whose figures are the denominators of the percentage changes.'],
      ],
      v: vFormat,
      vs: [vSpecial],
    },
    {
      h: '4. Comparative Statement of Profit and Loss',
      t: 2,
      b: `**Layout (Schedule III Part II heads):** I. Revenue from Operations; II. Other Income; III. Total Income (I + II); IV. Expenses (cost of materials consumed, purchases of stock-in-trade, changes in inventories, employee benefits expense, finance costs, depreciation and amortisation expense, other expenses) and Total Expenses; V. Profit before Tax (III − IV); VI. Tax; VII. Profit after Tax (V − VI).\n\n**Steps:** (1) complete both years in rupees; (2) absolute change for every line; (3) percentage change for every line, totals included, on the earlier year.\n\n**Shivneri Fruit Pulp Ltd (imagined):** revenue ${pcs(SPc.ch.rev.h)}, total expenses ${pcs(SPc.ch.te.h)}, profit after tax ${pcs(SPc.ch.pat.h)} (${rs(SP.val('pat')[0])} to ${rs(SP.val('pat')[1])}). Because expenses grew faster than revenue, profit grew more slowly than sales.`,
      terms: [
        ['Revenue from operations', 'Income from the main business activity: sale of goods and services.'],
        ['Total income', 'Revenue from operations plus other income.'],
      ],
      v: vWE1b,
      vs: [vWE1a, vBars, vRead],
    },
    {
      h: '5. Comparative Balance Sheet and inter-firm comparison',
      t: 2,
      b: `**Comparative Balance Sheet:** both dates side by side in the Schedule III Part I order (I. Equity and Liabilities: Shareholders' Funds, Non-current Liabilities, Current Liabilities; II. Assets: Non-current Assets, Current Assets), with the absolute and percentage change of every sub-head and of the totals.\n\n**Check:** both totals change by the same amount and the same percentage.\n\n**Reading:** sources of funds (the top half) against their uses (the bottom half); current assets against current liabilities for liquidity.\n\n**Inter-firm comparative statement:** the two firms' figures for the same year side by side; difference = other firm − base firm; percentage difference = difference ÷ base firm × 100.\n\n**Shivneri (imagined):** total ${rs(SB.part.el[0])} to ${rs(SB.part.el[1])} (${pcs(SBc.ch.elT.h)}); shareholders' funds ${pcs(SBc.headCh.sf.h)}, long-term borrowings ${pcs(SBc.ch.ltb.h)}.`,
      terms: [
        ['Comparative balance sheet', 'Balance sheets of two dates side by side with the absolute and percentage change in each item.'],
        ['Base firm', 'In an inter-firm statement, the firm whose figures are the denominators of the percentage differences.'],
      ],
      v: vWE2,
      vs: [vWE2b, vIntraInter, vWE3],
    },
    {
      h: '6. Common-size Statement of Profit and Loss',
      t: 3,
      b: `**Base:** revenue from operations of the same year = 100.\n\n**Each line %** = amount ÷ revenue from operations × 100 (two decimals). Other income is also divided by revenue, so total income may exceed 100.00; profit before tax = total income % − total expenses %.\n\n**Steps:** complete both years in rupees; divide every line of each year by that year's revenue; check that the rounded lines re-add (total expenses, profit before tax, profit after tax).\n\n**Panhala Jaggery Ltd (imagined):** materials ${pcs(PPs.p.com[0])} → ${pcs(PPs.p.com[1])}; profit after tax ${pcs(PPs.p.pat[0])} → ${pcs(PPs.p.pat[1])} of revenue, though in rupees it rose from ${rs(PP.val('pat')[0])} to ${rs(PP.val('pat')[1])}.`,
      terms: [
        ['Common-size statement', 'A statement in which every item is shown as a percentage of a common base of the same statement.'],
        ['Common-size percentage (profit and loss)', 'An item divided by revenue from operations of that year, times 100.'],
      ],
      v: vCSMeaning,
      vs: [vCSFormat, vWE4, vRupee, vReadPL],
    },
    {
      h: '7. Common-size Balance Sheet and rounding',
      t: 3,
      b: `**Base:** the balance sheet total on that date (total equity and liabilities = total assets) = 100.\n\n**Each line %** = amount ÷ total × 100. Each part of each column must total 100.00.\n\n**${RULE}** If the rounded lines of a part add to 100.01 or 99.99, the line whose rounding error lies furthest in that direction is moved by 0.01 and marked †, with a note. No line is then more than 0.01 from its exact value.\n\n**Panhala (imagined), 31 March 2026:** the rounded assets add to ${pc(rawSum)}; non-current investments (about ${exact4(PB.val('nci')[1], PB.part.as[1])}%) is shown as ${pc(PBs.p.nci[1])} †. Owners' funds ${pcs(PBs.headP.sf[0])} → ${pcs(PBs.headP.sf[1])}; non-current assets ${pcs(PBs.headP.nca[0])} → ${pcs(PBs.headP.nca[1])}.`,
      terms: [
        ['Common-size balance sheet', 'A balance sheet in which every item is shown as a percentage of the balance sheet total of that date.'],
        ['Rounding adjustment (†)', 'Moving the most over- or under-rounded line by 0.01 so that a part totals exactly 100.00.'],
      ],
      v: vWE5,
      vs: [vRound, vColumns, vWE5b],
    },
    {
      h: '8. Inter-firm common-size statements and interpretation',
      t: [1, 2, 3],
      b: `**Inter-firm common-size statement:** each firm's items divided by that firm's own revenue or total; the effect of size disappears, so cost structure, margins and financing can be compared.\n\n**Sindhudurg and Vijaydurg Fish Foods (imagined):** profit after tax ${pcs(SVs.p.pat[0])} against ${pcs(SVs.p.pat[1])} of revenue, although Vijaydurg's rupee profit (${rs(SV.val('pat')[1])}) is far larger.\n\n**Interpreting both tools together:** a comparative statement shows how far each item moved; a common-size statement shows whether its share grew. A large percentage change on a tiny base, or a falling share that hides a rising amount, misleads when one tool is read alone.`,
      terms: [
        ['Inter-firm common-size comparison', 'Comparing firms through items expressed as percentages of each firm’s own base.'],
        ['Profit margin (common-size)', 'Profit after tax as a percentage of revenue from operations.'],
      ],
      v: vWE6,
      vs: [vSize, vWE6b, vCmpVsCs],
    },
  ],
  tips: "**Common mistakes**\n- Dividing the change by the later year (or by the other firm) instead of the earlier year (or the base firm).\n- Working a total's percentage as the average of its lines' percentages.\n- Forgetting brackets for decreases, or showing a percentage when the earlier figure is nil.\n- In a common-size statement of profit and loss, dividing by total income instead of revenue from operations; in a balance sheet, dividing liabilities by total liabilities only.\n- Dividing a later-year item by the earlier year's base.\n- Leaving a common-size balance sheet part at 100.01 or 99.99 without adjusting and explaining one line.\n- Judging profitability by rupee profit when firms differ in size; reading a falling share as a falling amount.\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: two changes or two common-size shares worked out; two differences or two limitations.\n- 3 marks: a short comparative or common-size statement (both years completed 1, first set of figures 1, second set 1), or interpretation of a given statement.\n- 5 marks in parts, e.g. (a) 3 + (b) 2: a full statement and two observations.\n- Full practice problem (8 marks): both statements for the same company plus one observation. The ISC 2027 weightage for Financial Statement Analysis in Paper I Section B is 4 marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Comparative statement**', 'Statements of two or more years (or firms) side by side with the absolute and percentage change in each item.', 'definition', 2],
  ['**Common-size statement**', 'A statement in which every item is a percentage of a common base of the same statement.', 'definition', 3],
  ['Horizontal analysis is also called…', 'Dynamic analysis: the change in each item over time (comparative statements).', 'fact', 1],
  ['Vertical analysis is also called…', 'Static analysis: each item as a share of a base of the same period (common-size statements).', 'fact', 1],
  ['Absolute change', 'Later-year figure − earlier-year figure.', 'formula', 2],
  ['Percentage change', 'Absolute change ÷ earlier-year figure × 100.', 'formula', 2],
  ['Percentage change when the earlier figure is nil', 'Not calculated: shown as a dash; only the rupee change is given.', 'exam-tip', 2],
  ['How is a decrease shown in a comparative statement?', 'In brackets (or with a minus sign) in both change columns.', 'exam-tip', 2],
  ['Percentage change of a total', 'Worked on the total itself, never as an average of its lines.', 'exam-tip', 2],
  ['Check in a comparative balance sheet', 'Both totals change by the same amount and the same percentage.', 'concept', 2],
  ['Intra-firm comparison', 'Same firm, two or more periods.', 'definition', 2],
  ['Inter-firm comparison', 'Two or more firms, same period; percentages on the base firm.', 'definition', 2],
  ['Base of a common-size Statement of Profit and Loss', 'Revenue from operations of the same year = 100.', 'fact', 3],
  ['Base of a common-size Balance Sheet', 'The balance sheet total of that date = 100 (each part adds to 100).', 'fact', 3],
  ['Why can total income exceed 100 in a common-size statement?', 'Other income is also divided by revenue from operations and added to it.', 'concept', 3],
  ['Rounding rule used in SOYL answers', 'Two decimals; a third decimal of 5 or more rounds the second up (in size).', 'exam-tip', 2],
  ['A common-size balance sheet part adds to 100.01', 'Lower the line rounded up the most by 0.01, mark it † and say why.', 'exam-tip', 3],
  ['A falling common-size share means the rupee amount fell?', 'Not necessarily: if the base grew faster, the amount may have risen.', 'concept', 3],
  ['Why use common-size statements for inter-firm comparison?', 'Percentages of each firm’s own base remove the effect of size.', 'concept', 3],
  ['More profitable of two firms of different size?', 'The one with the higher profit after tax as a % of revenue, not the larger rupee profit.', 'concept', 3],
  ['Significance: trend', 'Comparative statements show the direction and speed of change in each item.', 'concept', 1],
  ['Significance: weak spots', 'Costs outgrowing revenue, rising borrowing or slow stock stand out for action.', 'concept', 1],
  ['Limitation: price changes', 'Rupee figures are not adjusted for inflation; growth may be only higher prices.', 'concept', 1],
  ['Limitation: qualitative factors', 'Skill, morale, reputation and competition have no rupee figure.', 'concept', 1],
  ['Limitation: accounting policies', 'Different depreciation or inventory methods make firms hard to compare.', 'concept', 1],
  ['Expenses up faster than revenue', 'Profit grows more slowly than sales (or falls).', 'concept', 2],
  ['Finance costs rising sharply', 'More borrowing or a higher rate of interest.', 'concept', 2],
  ['Notes to accounts in ISC 2027 analysed statements?', 'Not required: statements are prepared at head and sub-head level only.', 'exam-tip', 1],
  ['Comparative or common-size: which shows structure?', 'Common-size; comparative shows change.', 'fact', 3],
  ['Two tools of analysis in this chapter', 'Comparative statements and common-size statements (cash flow and ratios follow).', 'fact', 1],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Comparative and Common Size Statements',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_tool_cmp', 'm_pct_calc', 'm_cs_base_pl', 'm_cs_bs_calc', 'ar_cs_size'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_pct_two', { attempt: 1, keys: ['s2_meaning_cs', 's2_cs_two'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_cpl_torna', { attempt: 1, keys: ['s3_csbs_vasota', 's3_limits_case'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (3 + 2 marks); show your working.', items: ['l5_cspl_raisen'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Comparative and Common Size Statements',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_horizontal', 'm_vertical', 'm_inflation', 'm_policy', 'm_pct_decrease', 'm_total_change', 'm_equal_growth', 'm_nil_base', 'm_cs_total_income', 'm_cs_rupee_up', 'ar_cmp_trend', 'ar_share_fall'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_intra_inter', 's2_head_change', { attempt: 1, keys: ['s2_two_limits', 's2_missing_py'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_cbs_rajgad', 's3_cspl_ajinkyatara', 's3_interfirm_tiles', { attempt: 1, keys: ['s3_objectives', 's3_interpret_asirgarh'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts; show your working.', items: ['l5_cpl_daulatabad', { attempt: 1, keys: ['l5_csbs_chittorgarh', 'l5_interfirm_coconut'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);
check(words(SP.val('pat')[1]) === 'seven lakh ninety-eight thousand', 'words');

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of isc-12-accounts-ch10 only (comparative and common-size statements: meaning, significance and limitations; comparative Balance Sheet and comparative Statement of Profit and Loss, intra-firm and inter-firm; common-size Balance Sheet and common-size Statement of Profit and Loss). ISC 2027: statements are prepared without notes to accounts, at head and sub-head level; this appears as one note.',
    originality: 'every company and figure is imagined and labelled as such (companies named after Indian forts); no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; companies, people and set-ups differ from the CBSE 12 Accountancy chapters and ISC ch01–ch09 and ch11',
    data: 'every statement is built by acc.mjs from its givens: totals, profit before tax, tax and profit after tax re-added; both balance sheet parts agree; every absolute and percentage change computed in integer hundredths (two decimals, half away from zero) and cross-checked; changes of totals re-add and both balance sheet totals change equally; common-size bases are 100.00, every balance sheet part of every column totals 100.00 after the stated † adjustment, and rounded profit and loss lines re-add; key results pinned to hand-checked values',
    accounting: 'ISC 2027 Section B: comparative and common-size statements in the Schedule III order at head and sub-head level, without notes to accounts; percentages on the earlier year (or base firm) and on revenue from operations or the balance sheet total; rounding rule stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
