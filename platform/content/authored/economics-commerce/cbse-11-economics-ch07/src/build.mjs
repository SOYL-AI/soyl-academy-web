// Build CBSE 11 Economics ch07 Introduction to Index Numbers. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch07/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, inflation } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch07', 'economics-commerce');
const Qs = await import('./questions.mjs');
const {
  S, J, HH, HH_N, BK, BK_N, BKU, BKU_N, ST, ST_N, CN, JB, FB_N, FB_P0, FB_P1, FB_W, FB_R, FB_RW, fbCPI,
  ML_N, ML_R, ML_W, ML_RW, mlCPI, IP_N, IP_Q0, IP_Q1, IP_W, IP_R, ipI, YR, CP, INF, WG, RW, KP, KPr, kpNom, kpReal, PP,
} = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rs = (x) => `Rs ${S(x)}`;

// ---------------------------------------------------------------- figures (computed, never typed)
check(HH.aggI, 125, 2, 'household aggregative');
check(BK.aggI, 120, 2, 'bakery aggregative');
check(BKU.aggI, 115.6, 2, 'bakery aggregative, other units');
check(BK.relI, 118.75, 2, 'bakery relatives');
check(ST.L, 123.2, 2, 'stationers Laspeyres');
check(ST.P, 121.2, 2, 'stationers Paasche');
check(fbCPI, 119.5, 2, 'family budget index');
check(mlCPI, 124.5, 2, 'mill colony index');
check(ipI, 121, 2, 'estate output index');
check(kpNom, 37.28, 2, 'nominal growth of sales');
check(kpReal, 20, 2, 'real growth of sales');
// One imagined item: a notebook (Rs 40 in the base year, Rs 50 and Rs 36 later).
const NB = [40, 50, 36];
const NB_I = NB.map((p) => (p / NB[0]) * 100);
assert.deepEqual(NB_I, [100, 125, 90]);
// Purchasing power of Rs 100 in each of years 1 to 3, in base-year rupees.
const PPY = CP.slice(1, 4).map((i) => (100 / i) * 100);
check(PPY[0], PP, 2, 'purchasing power at index 125');

// ---------------------------------------------------------------- SVG figures
const vLine = (() => {
  const s = new Svg(640, 330);
  const ch = s.chart({ x0: 0, x1: 5.4, y0: 80, y1: 180, left: 70, top: 40, width: 500, height: 230, xLabel: 'Year', yLabel: 'Consumer price index (Year 0 = 100)' });
  YR.forEach((y) => ch.xTick(y, String(y)));
  [100, 125, 150, 175].forEach((v) => ch.yTick(v, String(v)));
  s.line(ch.X(0), ch.Y(100), ch.X(5.4), ch.Y(100), { sw: 1.2, dash: true, color: 'muted' });
  s.polyline(YR.map((y, i) => [ch.X(y), ch.Y(CP[i])]), { sw: 2.2, color: 'accent' });
  YR.forEach((y, i) => {
    s.dot(ch.X(y), ch.Y(CP[i]), 5, 'accent');
    s.text(ch.X(y), ch.Y(CP[i]) - 14, String(CP[i]), { size: 13, bold: true });
  });
  s.text(ch.X(5.4) - 4, ch.Y(100) + 14, 'base level 100', { anchor: 'end', size: 12, muted: true });
  return s.visual(`Line graph of the imagined consumer price index of Bhavnagar Colony over six years, with Year 0 as the base at 100: ${YR.map((y, i) => `Year ${y} ${CP[i]}`).join(', ')}; the line rises each year, and a dashed line marks the base level of 100`, 'Imagined Bhavnagar Colony index. The vertical axis starts at 80.');
})();
const vBars = (() => {
  const s = new Svg(640, 330);
  const ch = s.chart({ x0: 0, x1: 4.6, y0: 0, y1: 140, left: 70, top: 40, width: 500, height: 230, xLabel: 'Input', yLabel: 'Price relative' });
  [0, 50, 100, 140].forEach((v) => (v === 0 ? null : ch.yTick(v, String(v))));
  const nm = ['Flour', 'Sugar', 'Butter', 'Eggs'];
  BK.rel.forEach((r, i) => {
    const cx = ch.X(0.6 + i);
    s.rect(cx - 30, ch.Y(r), 60, ch.Y(0) - ch.Y(r), { rx: 3, fill: 'accent', fillOpacity: 0.45, color: 'accent', sw: 1.5 });
    s.text(cx, ch.Y(r) - 12, String(S(r)), { size: 13, bold: true });
    s.text(cx, ch.Y(0) + 16, nm[i], { size: 12 });
  });
  s.line(ch.X(0), ch.Y(100), ch.X(4.6), ch.Y(100), { sw: 1.2, dash: true, color: 'muted' });
  s.line(ch.X(0), ch.Y(BK.relI), ch.X(4.6), ch.Y(BK.relI), { sw: 1.4, dash: true, color: 'accent' });
  s.text(ch.X(4.6) - 4, ch.Y(BK.relI) - 12, `mean ${S(BK.relI)}`, { anchor: 'end', size: 12, bold: true });
  s.text(ch.X(4.6) - 4, ch.Y(100) + 12, 'base 100', { anchor: 'end', size: 12, muted: true });
  return s.visual(`Bar chart of the price relatives of four inputs of the imagined Sunrise Bakery: ${BK_N.map((n, i) => `${n} ${S(BK.rel[i])}`).join(', ')}, with a dashed line at the base value 100 and another at the mean of the relatives, ${S(BK.relI)}`, 'Imagined Sunrise Bakery. Each bar is the current price as a percentage of the base price.');
})();
const vCpiSvg = (() => {
  const rows = FB_N.length;
  const rh = 32, top = 20, W = 660;
  const H = top + (rows + 2) * rh + 30;
  const s = new Svg(W, H);
  const cols = [20, 270, 420, 510, 590];
  const head = ['Item', 'Base → now (Rs)', 'Relative R', 'Weight W', 'R × W'];
  s.rect(10, top, W - 20, rh, { rx: 4, fill: 'fill', fillOpacity: 0.5, color: 'muted', sw: 1 });
  head.forEach((h, i) => s.text(cols[i], top + rh / 2, h, { anchor: i === 0 ? 'start' : 'start', size: 13, bold: true }));
  FB_N.forEach((n, k) => {
    const y = top + (k + 1) * rh;
    s.line(10, y, W - 10, y, { sw: 1, color: 'muted' });
    const cells = [n, `${FB_P0[k]} → ${FB_P1[k]}`, S(FB_R[k]), String(FB_W[k]), String(FB_RW[k])];
    cells.forEach((c, i) => s.text(cols[i], y + rh / 2, c, { anchor: 'start', size: 13 }));
  });
  const yt = top + (rows + 1) * rh;
  s.line(10, yt, W - 10, yt, { sw: 1.6 });
  s.rect(10, top, W - 20, (rows + 2) * rh, { rx: 4, color: 'muted', sw: 1.2 });
  [`Total`, '', '', String(sum(FB_W)), String(sum(FB_RW))].forEach((c, i) => c && s.text(cols[i], yt + rh / 2, c, { anchor: 'start', size: 13, bold: true }));
  s.text(W / 2, yt + rh + 18, `Index = ${sum(FB_RW)} ÷ ${sum(FB_W)} = ${S(fbCPI)}`, { size: 14, bold: true });
  return s.visual(`Table drawn as a figure showing how an imagined family-budget consumer price index is built: for each of ${rows} items the base and current prices, the price relative R, the weight W and the product R times W; the weights total ${sum(FB_W)}, the products total ${sum(FB_RW)}, and the index is ${sum(FB_RW)} divided by ${sum(FB_W)}, which is ${S(fbCPI)}`, 'Imagined Bhavnagar Colony family budget.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What an index number is', 'The base period', 'WPI, CPI and IIP', 'Uses', 'Issues in construction'], 'Route map of Part 1: what an index number is, the base period, the wholesale price index, the consumer price index and the index of industrial production, uses, and issues in construction', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Simple aggregative', 'Price relatives', 'Laspeyres and Paasche', 'Consumer price index', 'Inflation and real wage'], 'Route map of Part 2: simple aggregative method, price relatives, Laspeyres and Paasche, the consumer price index, and inflation and the real wage', 'Part 2 at a glance');
const vWhat = table(
  ['Year', 'Price of a notebook (Rs)', 'Index (Year 0 = 100)'],
  NB.map((p, i) => [`Year ${i}`, String(p), `**${S(NB_I[i])}**`]),
  `Table of an imagined notebook price in Bhavnagar Colony, ${NB.map((p, i) => `Year ${i} Rs ${p}`).join(', ')}, and its index with Year 0 as the base: ${NB_I.map(S).join(', ')}`,
  'Imagined notebook price. Index = price ÷ base price × 100.',
);
const vBaseRead = table(
  ['Index value', 'Meaning'],
  [
    ['Exactly 100', 'The same as the base period'],
    [`Above 100, such as ${S(NB_I[1])}`, `Higher than the base: ${S(NB_I[1] - 100)} per cent higher`],
    [`Below 100, such as ${S(NB_I[2])}`, `Lower than the base: ${S(100 - NB_I[2])} per cent lower`],
  ],
  `Table reading index values against the base of 100: exactly 100 is the same as the base, ${S(NB_I[1])} is ${S(NB_I[1] - 100)} per cent higher, ${S(NB_I[2])} is ${S(100 - NB_I[2])} per cent lower`,
  'Imagined notebook price from the previous table.',
);
const vWpi = table(
  ['Feature', 'Wholesale price index'],
  [
    ['Measures', 'Change in the general price level of goods traded in bulk'],
    ['Prices used', 'Wholesale prices, not retail prices'],
    ['Compiled by (as commonly taught)', 'Office of the Economic Adviser, Ministry of Commerce and Industry'],
    ['Used to', 'Follow price movements in bulk markets and in the cost of inputs'],
  ],
  'Table of the wholesale price index: what it measures, the prices used, who compiles it as commonly taught, and what it is used for',
);
const vCpi = table(
  ['Kind of consumer price index', 'Group whose basket it follows', 'Compiled by (as commonly taught)'],
  [
    ['For industrial workers', 'Families of industrial workers', 'Labour Bureau'],
    ['For agricultural labourers', 'Families of agricultural labourers', 'Labour Bureau'],
    ['Rural, urban and combined', 'Rural households, urban households, and both together', 'National Statistical Office'],
  ],
  'Table of the kinds of consumer price index: for industrial workers, for agricultural labourers, and rural, urban and combined, with the group each follows and the compiler as commonly taught',
  'Each follows the retail prices of a fixed basket consumed by its own group.',
);
const vCpiWork = flow('LR', ['Retail prices of the basket rise', 'The consumer price index rises', 'Cost of living of the group is higher', 'Dearness allowance is revised', 'Real wage is protected'], 'Flow showing how a consumer price index is used: retail prices of the basket rise, the index rises, the cost of living of the group is higher, the dearness allowance is revised, and the real wage is protected', 'The consumer price index at work');
const vIip = table(
  ['Feature', 'Index of industrial production'],
  [
    ['Measures', 'Change in the volume of industrial output'],
    ['Covers', 'Mining, manufacturing and electricity'],
    ['Kind of index', 'A quantity index, not a price index'],
    ['Compiled by (as commonly taught)', 'The national statistical office, Ministry of Statistics and Programme Implementation'],
  ],
  'Table of the index of industrial production: what it measures, what it covers, that it is a quantity index, and who compiles it as commonly taught',
);
const vIipEx = table(
  ['Output', 'Base output', 'Output now', 'Relative R', 'Weight W', 'R × W'],
  [
    ...IP_N.map((n, i) => [n, String(IP_Q0[i]), String(IP_Q1[i]), S(IP_R[i]), String(IP_W[i]), String(IP_R[i] * IP_W[i])]),
    ['**Total**', '', '', '', `**${sum(IP_W)}**`, `**${sum(IP_R.map((r, i) => r * IP_W[i]))}**`],
  ],
  `Working table for the imagined Rivergate Industrial Estate: relatives ${J(IP_R)}, weights ${J(IP_W)}, products total ${sum(IP_R.map((r, i) => r * IP_W[i]))}, index ${S(ipI)}`,
  'Imagined Rivergate Industrial Estate. Units of output are imagined.',
);
const vCompare = table(
  ['Index', 'What it measures', 'Kind'],
  [
    ['Wholesale price index', 'Prices of goods traded in bulk', 'Price index'],
    ['Consumer price index', 'Retail prices of a fixed basket of a defined group', 'Price index'],
    ['Index of industrial production', 'Volume of output of mining, manufacturing and electricity', 'Quantity index'],
    ['Sensex', 'Share prices of thirty companies on the Bombay Stock Exchange', 'Stock market index'],
  ],
  'Table comparing the wholesale price index, the consumer price index, the index of industrial production and the Sensex by what each measures and its kind',
);
const vUses = table(
  ['Use', 'Imagined illustration'],
  [
    ['Measuring inflation', 'The colony index rises from one year to the next'],
    ['Adjusting wages and allowances', 'A mill revises dearness allowance when the index rises'],
    ['Deflating values to real terms', 'A printer compares sales at base-year prices'],
    ['Policy-making', 'Planners watch price and output indices'],
    ['Comparing performance over time', 'An output index shows whether an estate has grown'],
  ],
  'Table of the uses of index numbers: measuring inflation, adjusting wages and allowances, deflating values to real terms, policy-making, and comparing performance over time, each with an imagined illustration',
);
const vDeflate = table(
  ['Year', 'Sales (Rs lakh)', 'Index', 'Real sales (Rs lakh)'],
  KP.map((v, i) => [`Year ${i + 1}`, S(v), String(CP[i + 1]), `**${S(KPr[i])}**`]),
  `Working table for the imagined Kaushal Printers: sales ${J(KP.map(S))} deflated by the index ${J(CP.slice(1, 4))} give real sales ${J(KPr.map(S))}`,
  'Imagined Kaushal Printers. Real sales = sales ÷ index × 100.',
);
const vIssues = table(
  ['Issue', 'The question to settle'],
  [
    ['Purpose', 'What is to be measured, and for whom?'],
    ['Base year', 'Is it a normal year, free of abnormal events?'],
    ['Items', 'Which goods and services should be included?'],
    ['Price quotations', 'Are wholesale or retail prices to be used?'],
    ['Weights', 'How important is each item?'],
    ['Formula', 'Which method of combining the prices is suitable?'],
  ],
  'Table of the six issues in constructing an index number: purpose, base year, items, price quotations, weights and formula, each with the question to settle',
);
const vChoose = table(
  ['Job', 'Suitable index'],
  [
    ['Revise the dearness allowance of a mill', 'Consumer price index'],
    ['Study the price movement of bulk grain', 'Wholesale price index'],
    ['Check whether a factory\'s output has risen', 'Index of industrial production'],
    ['Follow the general movement of share prices', 'Sensex'],
  ],
  'Table pairing four jobs with the suitable index: dearness allowance with the consumer price index, bulk grain prices with the wholesale price index, factory output with the index of industrial production, and share prices with the Sensex',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Index number', 'Measures relative change over time against a base period taken as 100'],
    ['Wholesale price index', 'Prices of goods traded in bulk'],
    ['Consumer price index', 'Retail prices of a fixed basket of a defined group'],
    ['Index of industrial production', 'Volume of industrial output'],
    ['Sensex', 'Bombay Stock Exchange, thirty companies'],
    ['Issues', 'Purpose, base year, items, price quotations, weights, formula'],
  ],
  'Summary table of Part 1: index number, wholesale price index, consumer price index, index of industrial production, Sensex and the issues in construction',
);
// ---- part 2
const vMethods = flow('TB', ['Methods of a price index', 'Simple aggregative', 'Simple average of price relatives', 'Weighted aggregative: Laspeyres and Paasche', 'Weighted average of price relatives'], 'Tree of the methods of constructing a price index: simple aggregative, simple average of price relatives, weighted aggregative with Laspeyres and Paasche, and weighted average of price relatives', 'Four methods', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' }]);
const vFormulas = table(
  ['Method', 'Formula'],
  [
    ['Simple aggregative', 'Σp1 ÷ Σp0 × 100'],
    ['Simple average of relatives', 'Σ(p1 ÷ p0 × 100) ÷ n'],
    ['Laspeyres', 'Σp1q0 ÷ Σp0q0 × 100'],
    ['Paasche', 'Σp1q1 ÷ Σp0q1 × 100'],
    ['Weighted average of relatives', 'ΣRW ÷ ΣW'],
  ],
  'Table of the formulas: simple aggregative, simple average of relatives, Laspeyres, Paasche and weighted average of relatives',
  'p0 is the base price, p1 the current price, q0 the base quantity, q1 the current quantity, R the relative and W the weight.',
);
const vBkAgg = table(
  ['Input', 'Base price p0', 'Price now p1'],
  [
    ...BK_N.map((n, i) => [n, String(BK.p0[i]), String(BK.p1[i])]),
    ['**Total**', `**${BK.sp0}**`, `**${BK.sp1}**`],
  ],
  `Table of the input prices of the imagined Sunrise Bakery: base prices ${J(BK.p0)} total ${BK.sp0}, current prices ${J(BK.p1)} total ${BK.sp1}, index ${S(BK.aggI)}`,
  'Imagined Sunrise Bakery, prices in rupees.',
);
const vUnits = table(
  ['Way the prices are quoted', 'Σp0', 'Σp1', 'Index'],
  [
    ['Butter per kg, eggs per dozen', String(BK.sp0), String(BK.sp1), `**${S(BK.aggI)}**`],
    ['Butter per 100 g, eggs per piece', String(BKU.sp0), S(BKU.sp1), `**${S(BKU.aggI)}**`],
    ['Average of relatives, either way', '', '', `**${S(BK.relI)}**`],
  ],
  `Table comparing the imagined Sunrise Bakery index under two ways of quoting the prices: ${S(BK.aggI)} and ${S(BKU.aggI)} by the simple aggregative method, but ${S(BK.relI)} by the average of relatives in both cases`,
  'The same price movements, quoted in different units.',
);
const vBkRel = table(
  ['Input', 'p0', 'p1', 'Relative p1 ÷ p0 × 100'],
  [
    ...BK_N.map((n, i) => [n, String(BK.p0[i]), String(BK.p1[i]), S(BK.rel[i])]),
    ['**Total**', '', '', `**${S(sum(BK.rel))}**`],
  ],
  `Working table for the imagined Sunrise Bakery: relatives ${J(BK.rel)} total ${S(sum(BK.rel))}, so the index is ${S(sum(BK.rel))} divided by ${BK.rel.length}, which is ${S(BK.relI)}`,
  'Imagined Sunrise Bakery.',
);
const vLpMeaning = table(
  ['Method', 'Weights', 'Question it answers'],
  [
    ['Laspeyres', 'Quantities of the base year', 'What does the base-year basket cost now, compared with then?'],
    ['Paasche', 'Quantities of the current year', 'What does the current basket cost now, compared with its cost at base prices?'],
  ],
  'Table comparing the Laspeyres and Paasche methods by their weights and the question each answers',
);
const vStTable = table(
  ['Item', 'p0', 'p1', 'q0', 'q1', 'p0q0', 'p1q0', 'p0q1', 'p1q1'],
  [
    ...ST_N.map((n, i) => [n, String(ST.p0[i]), String(ST.p1[i]), String(ST.q0[i]), String(ST.q1[i]), String(ST.p0[i] * ST.q0[i]), String(ST.p1[i] * ST.q0[i]), String(ST.p0[i] * ST.q1[i]), String(ST.p1[i] * ST.q1[i])]),
    ['**Total**', '', '', '', '', `**${ST.p0q0}**`, `**${ST.p1q0}**`, `**${ST.p0q1}**`, `**${ST.p1q1}**`],
  ],
  `Working table for the imagined Pinecrest Stationers: Σp0q0 ${ST.p0q0}, Σp1q0 ${ST.p1q0}, Σp0q1 ${ST.p0q1}, Σp1q1 ${ST.p1q1}; Laspeyres ${S(ST.L)} and Paasche ${S(ST.P)}`,
  'Imagined Pinecrest Stationers. Prices in rupees, quantities in units sold.',
);
const vGap = table(
  ['Imagined data set', 'Laspeyres', 'Paasche'],
  [
    ['Pinecrest Stationers', S(ST.L), S(ST.P)],
    ['Shanti Canteen', S(CN.L), S(CN.P)],
    ['Bhavnagar Colony household', S(HH.L), S(HH.P)],
    ['Tulsi Juice Bar', S(JB.L), S(JB.P)],
  ],
  `Table of Laspeyres and Paasche indices for four imagined data sets: stationers ${S(ST.L)} and ${S(ST.P)}, canteen ${S(CN.L)} and ${S(CN.P)}, household ${S(HH.L)} and ${S(HH.P)}, juice bar ${S(JB.L)} and ${S(JB.P)}`,
  'In each imagined set buyers bought less of the items that became dearer, so the Paasche value is lower.',
);
const vCpiFlow = flow('LR', ['Find the relative R of each item', 'Multiply each R by its weight W', 'Add to get ΣRW', 'Divide by ΣW'], 'Flow of the steps of the weighted average of price relatives: find the relative of each item, multiply each by its weight, add the products, and divide by the total of the weights', 'Steps of the weighted relatives method');
const vMlTable = table(
  ['Group', 'Relative R', 'Weight W (Rs)', 'R × W'],
  [
    ...ML_N.map((n, i) => [n, String(ML_R[i]), String(ML_W[i]), String(ML_RW[i])]),
    ['**Total**', '', `**${sum(ML_W)}**`, `**${sum(ML_RW)}**`],
  ],
  `Working table for the imagined Madhupur Mill Colony: relatives ${J(ML_R)}, weights ${J(ML_W)}, products total ${sum(ML_RW)}, index ${S(mlCPI)}`,
  'Imagined Madhupur Mill Colony. Weights are base-year monthly spending of a worker family.',
);
const vInfl = table(
  ['Year', 'Index', 'Change', 'Rate of inflation (per cent)'],
  INF.map((r, i) => [`Year ${i + 1}`, String(CP[i + 1]), String(CP[i + 1] - CP[i]), `**${S(r)}**`]),
  `Table of the imagined Bhavnagar Colony index ${J(CP)} for Years 0 to 5 with the changes ${J(CP.slice(1).map((v, i) => v - CP[i]))} and the rates of inflation ${J(INF.map(S))} per cent`,
  'Imagined Bhavnagar Colony. Rate = change ÷ earlier index × 100.',
);
const vReal = table(
  ['Year', 'Money wage (Rs)', 'Index', 'Real wage (Rs)', 'Rs 100 buys (base-year Rs)'],
  WG.map((w, i) => [`Year ${i + 1}`, String(w), String(CP[i + 1]), `**${S(RW[i])}**`, S(PPY[i])]),
  `Working table for an imagined clerk of Bhavnagar Colony: money wages ${J(WG)}, index ${J(CP.slice(1, 4))}, real wages ${J(RW.map(S))}`,
  'Imagined clerk. Real wage = money wage ÷ index × 100.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Simple aggregative', 'Σp1 ÷ Σp0 × 100; depends on units'],
    ['Price relatives', 'p1 ÷ p0 × 100; free of units; simple average gives equal importance'],
    ['Laspeyres and Paasche', 'Weights are base-year and current-year quantities'],
    ['Consumer price index', 'ΣRW ÷ ΣW with family-budget weights'],
    ['Inflation rate', '(later index − earlier index) ÷ earlier index × 100'],
    ['Real wage', 'Money wage ÷ index × 100'],
  ],
  'Summary table of Part 2: simple aggregative, price relatives, Laspeyres and Paasche, the consumer price index, the inflation rate and the real wage',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Index Numbers — Part 1: Meaning, Types and Uses',
  goals: [
    'Define an index number and the base period',
    'Explain the wholesale price index, the consumer price index, the index of industrial production and the Sensex',
    'State the uses of index numbers and the issues in constructing one',
    'Read an index and deflate a money value to real terms',
  ],
  slides: [
    sl('title', 'Index Numbers', {
      b: 'Part 1 — how we **measure change** in prices and output against a **base period**.',
      v: vRoute1,
      n: 'Prices change, output changes, and we want one number that shows how much. That number is an index. In this part we learn what an index number is, why a base period matters, and what the wholesale price index, the consumer price index and the index of industrial production measure. All the data are imagined.',
    }),
    sl('concept', 'What is an index number?', {
      b: 'An **index number** is a statistical device that measures the **relative change** in a variable, or a group of related variables, over time, compared with a **base period** taken as **100**.',
      v: vWhat,
      n: `An index number measures how much something has changed compared with a starting period called the base. Look at an imagined notebook in Bhavnagar Colony. In the base year it costs ${NB[0]} rupees, and the index is 100. When the price becomes ${NB[1]} rupees, the index is ${S(NB_I[1])}. When it falls to ${NB[2]} rupees, the index is ${S(NB_I[2])}.`,
    }),
    sl('concept', 'The base period', {
      b: 'The base period is the **reference** for comparison. It should be a **normal year**, free of abnormal events.',
      v: vBaseRead,
      n: `The base period is the yardstick. Its index is always 100. An index above 100 means higher than the base, and an index below 100 means lower. An index of ${S(NB_I[1])} shows a rise of ${S(NB_I[1] - 100)} per cent, and ${S(NB_I[2])} shows a fall of ${S(100 - NB_I[2])} per cent. A good base year is a normal one, without a shortage or a flood.`,
    }),
    sl('diagram', 'An index over the years', {
      v: vLine,
      n: `Here is an imagined consumer price index for Bhavnagar Colony over six years. Year zero is the base, so its value is 100. The line climbs to ${CP[1]}, ${CP[2]}, ${CP[3]}, ${CP[4]} and ${CP[5]}. Every point is compared with the same base, so we can see the rise at a glance and compare any two years.`,
    }),
    sl('check', 'Quick check: reading an index', {
      b: 'A retail price index is 125 against a base of 100. What does this show?',
      chk: 'm_index_125',
      n: 'Remember that the base is 100. Ask by how many points the index is above the base, and what share of the base that is. Then choose the option that states the rise correctly as a per cent.',
    }),
    sl('concept', 'Wholesale price index', {
      b: 'The **wholesale price index** measures the change in the general price level of goods **traded in bulk**.',
      v: vWpi,
      n: 'The wholesale price index follows the prices at which goods are traded in bulk, not the prices in a shop. As commonly taught, it is compiled by the Office of the Economic Adviser in the Ministry of Commerce and Industry. It helps us follow price movements in bulk markets and in the cost of inputs.',
    }),
    sl('concept', 'Consumer price index', {
      b: 'The **consumer price index**, or **cost-of-living index**, measures the change in the **retail prices** of a **fixed basket** of goods and services consumed by a **defined group**.',
      v: vCpi,
      n: 'The consumer price index follows the retail prices of a fixed basket of goods and services bought by a defined group. As commonly taught, there are indices for industrial workers, for agricultural labourers, and for rural, urban and combined households. The first two are compiled by the Labour Bureau and the last by the national statistical office.',
    }),
    sl('concept', 'The consumer price index at work', {
      b: 'Because it follows what a group pays in shops, it is used to **adjust wages and dearness allowance**.',
      v: vCpiWork,
      n: 'When retail prices of the basket rise, the consumer price index rises. The cost of living of the group is then higher. An employer can revise the dearness allowance in line with the index, so that the real wage of workers is protected. This is one of the most important uses of the consumer price index.',
    }),
    sl('check', 'Quick check: which prices?', {
      b: 'Decide whether the statement about the wholesale price index is true or false.',
      chk: 'tf_wpi_retail',
      n: 'Think about the word wholesale. Does it mean goods sold in bulk to traders, or goods sold one at a time to households at a corner shop? Then decide whether the statement is true or false.',
    }),
    sl('concept', 'Index of industrial production', {
      b: 'The **index of industrial production** measures the change in the **volume of industrial output**: mining, manufacturing and electricity.',
      v: vIip,
      n: 'The index of industrial production is different. It does not follow prices. It follows the volume of what industries produce, such as mining, manufacturing and electricity. It is therefore a quantity index. As commonly taught, it is compiled by the national statistical office under the Ministry of Statistics and Programme Implementation.',
    }),
    sl('example', 'Worked example 1: an output index', {
      b: 'The imagined Rivergate Industrial Estate has three kinds of output. Find its output index.',
      bl: [
        `**Step 1 —** Output relatives: ${J(IP_R.map(S))}.`,
        `**Step 2 —** Multiply by the weights ${J(IP_W)} and add: ΣRW = **${sum(IP_R.map((r, i) => r * IP_W[i]))}**.`,
        `**Step 3 —** Divide by ΣW = ${sum(IP_W)}: index = **${S(ipI)}**.`,
      ],
      v: vIipEx,
      n: `For each kind of output we divide this year's volume by the base volume, which gives relatives of ${J(IP_R)}. We multiply each by its weight and add, which gives ${sum(IP_R.map((r, i) => r * IP_W[i]))}. Dividing by the total weight of ${sum(IP_W)} gives an index of ${S(ipI)}. Output is ${S(ipI - 100)} per cent above the base.`,
    }),
    sl('concept', 'The Sensex and the four indices compared', {
      b: 'The **Sensex** is the stock market index of the **Bombay Stock Exchange**, based on the share prices of **30 companies**.',
      v: vCompare,
      n: 'The Sensex is the stock market index of the Bombay Stock Exchange. It follows the share prices of thirty companies. So we now have four indices. The wholesale price index follows bulk prices. The consumer price index follows retail prices of a basket. The index of industrial production follows volume. The Sensex follows share prices.',
    }),
    sl('check', 'Quick check: match the index', {
      b: 'Match each index with what it measures.',
      chk: 'mt_indices',
      n: 'Go through each index one at a time. Ask whether it follows bulk prices, retail prices of a basket, the volume of output, or share prices. Then pair it with the matching description.',
    }),
    sl('concept', 'Uses of index numbers', {
      b: 'Index numbers help us **measure inflation**, **adjust wages**, **deflate values**, **make policy** and **compare performance**.',
      v: vUses,
      n: 'Index numbers have many uses. They measure inflation. They adjust wages and allowances. They deflate money values to real terms. Policy makers watch them, and they let us compare performance over time. In each case the index gives one clear number for a change that would otherwise be hard to describe.',
    }),
    sl('example', 'Worked example 2: deflating to real terms', {
      b: 'The imagined Kaushal Printers had rising sales. Remove the effect of rising prices.',
      bl: [
        '**Rule —** real value = money value ÷ index × 100.',
        `**Year 1 —** ${S(KP[0])} ÷ ${CP[1]} × 100 = **${S(KPr[0])}** Rs lakh.`,
        `**Year 3 —** ${S(KP[2])} ÷ ${CP[3]} × 100 = **${S(KPr[2])}** Rs lakh.`,
        `Sales grew by **${S(kpNom)}** per cent in money terms but only **${S(kpReal)}** per cent in real terms.`,
      ],
      v: vDeflate,
      n: `Money sales rose from ${S(KP[0])} to ${S(KP[2])} lakh rupees, which looks like growth of ${S(kpNom)} per cent. But prices also rose. Dividing each sale by the index and multiplying by 100 gives real sales of ${S(KPr[0])}, ${S(KPr[1])} and ${S(KPr[2])}. The real growth is only ${S(kpReal)} per cent. Deflating shows how much of the rise was real.`,
    }),
    sl('concept', 'Issues in constructing an index', {
      b: 'Six questions must be settled before an index is built.',
      v: vIssues,
      n: 'Before building an index we settle six issues. What is the purpose? Which base year? Which items? Are prices wholesale or retail? What weights should the items carry? And which formula will combine the prices? A weak answer to any of these can make the index misleading for its purpose.',
    }),
    sl('concept', 'Choosing the right index for the job', {
      b: 'The **purpose** decides the index: match the job to what the index measures.',
      v: vChoose,
      n: 'The purpose decides the index. To revise the dearness allowance of a mill we use the consumer price index. To study bulk grain prices we use the wholesale price index. To check whether a factory has produced more we use the index of industrial production. To follow the share market we use the Sensex.',
    }),
    sl('check', 'Quick check: which is a use?', {
      b: 'Which of these is not a use of index numbers?',
      chk: 'm_uses',
      n: 'Recall the standard uses: measuring inflation, adjusting wages, deflating values, policy and comparison. An index shows change over time. Find the option that asks an index to do something else.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To recap. An index number measures relative change against a base period taken as 100. The wholesale price index follows bulk prices, the consumer price index follows retail prices of a fixed basket, and the index of industrial production follows output volume. The Sensex follows thirty shares. Remember the six issues in construction.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define an index number with the **base period taken as 100**.',
        'Say clearly whether an index measures **prices or volume**.',
        'Name the **group** whose basket a consumer price index follows.',
        'List the issues: **purpose, base year, items, price quotations, weights, formula**.',
        'When deflating, **divide by the index and multiply by 100**.',
      ],
      n: 'Some tips. Define an index number with the base period taken as one hundred. Say clearly whether an index measures prices or volume. Name the group whose basket a consumer price index follows. List the six issues in construction. And when you deflate a money value, divide by the index and multiply by one hundred.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Index Numbers — Part 2: Methods and Inflation',
  goals: [
    'Calculate a simple aggregative index and a simple average of price relatives',
    'Calculate Laspeyres and Paasche indices and say what each means',
    'Construct a consumer price index as a weighted average of price relatives',
    'Find the rate of inflation, the real wage and the purchasing power',
  ],
  slides: [
    sl('title', 'Methods and Inflation', {
      b: 'Part 2 — **building** an index, and using it to find **inflation** and the **real wage**.',
      v: vRoute2,
      n: 'In this part we build price indices by different methods. We begin with the simple aggregative method, then price relatives, then the weighted methods of Laspeyres and Paasche. Next we construct a consumer price index from a family budget. Finally we use an index to find the rate of inflation and the real wage. All data are imagined.',
    }),
    sl('concept', 'Four methods at a glance', {
      b: 'Methods differ in whether they use **weights** and whether they use **prices** or **relatives**.',
      v: vMethods,
      n: 'There are four methods to learn. The simple aggregative method adds up prices. The simple average of price relatives averages the relatives. The weighted aggregative methods, named after Laspeyres and Paasche, use quantities as weights. And the weighted average of price relatives uses budget weights, which is how a consumer price index is built.',
    }),
    sl('concept', 'Simple aggregative method', {
      b: 'Add the current prices and the base prices separately: **index = Σp1 ÷ Σp0 × 100**.',
      v: vFormulas,
      n: 'In the simple aggregative method we add up the current prices of all items, add up their base prices, divide the first total by the second and multiply by one hundred. The formulas for all the methods in this part are shown together in the table, with the symbols explained below it.',
    }),
    sl('example', 'Worked example 1: bakery inputs', {
      b: 'The imagined Sunrise Bakery bought four inputs. Find the simple aggregative price index.',
      bl: [
        `**Step 1 —** Σp0 = ${J(BK.p0)} added = **${BK.sp0}**.`,
        `**Step 2 —** Σp1 = ${J(BK.p1)} added = **${BK.sp1}**.`,
        `**Step 3 —** Index = ${BK.sp1} ÷ ${BK.sp0} × 100 = **${S(BK.aggI)}**.`,
      ],
      v: vBkAgg,
      n: `The base prices of the four inputs add up to ${BK.sp0} rupees. The current prices add up to ${BK.sp1} rupees. Dividing ${BK.sp1} by ${BK.sp0} and multiplying by one hundred gives an index of ${S(BK.aggI)}. So the prices of the bakery's inputs are, on this measure, ${S(BK.aggI - 100)} per cent higher than in the base year.`,
    }),
    sl('check', 'Quick check: a simple index', {
      b: 'Find the simple aggregative price index for another set of prices.',
      chk: 'n_bakery_agg',
      n: 'Add the base prices, add the current prices, divide the second total by the first, and multiply by one hundred. Keep your working in two lines, one for each total.',
    }),
    sl('concept', 'The limitation: units', {
      b: 'The sum of prices **depends on the units** in which each item is quoted. Price relatives do not.',
      v: vUnits,
      n: `Suppose the bakery quotes butter per hundred grams and eggs per piece instead of per kilogram and per dozen. The price movements are the same, yet the simple aggregative index changes from ${S(BK.aggI)} to ${S(BKU.aggI)}. The average of price relatives stays at ${S(BK.relI)} either way, because each relative is a pure ratio.`,
    }),
    sl('concept', 'Price relatives', {
      b: 'A **price relative** is **p1 ÷ p0 × 100**. The simple average of the relatives is **Σ(p1 ÷ p0 × 100) ÷ n**.',
      v: vBars,
      n: `Each bar shows how much dearer one input has become, compared with a base of one hundred. Flour is at ${S(BK.rel[0])}, sugar at ${S(BK.rel[1])}, butter at ${S(BK.rel[2])} and eggs at ${S(BK.rel[3])}. The simple average of these four relatives is ${S(BK.relI)}. Because relatives are ratios, they do not depend on units.`,
    }),
    sl('example', 'Worked example 2: average of relatives', {
      b: 'Find the index for the Sunrise Bakery by the simple average of price relatives.',
      bl: [
        `**Step 1 —** Relatives: ${J(BK.rel.map(S))}.`,
        `**Step 2 —** Sum = **${S(sum(BK.rel))}**.`,
        `**Step 3 —** Index = ${S(sum(BK.rel))} ÷ ${BK.rel.length} = **${S(BK.relI)}**.`,
      ],
      v: vBkRel,
      n: `For each input we divide the current price by the base price and multiply by one hundred. The relatives are ${J(BK.rel.map(S))}. They add up to ${S(sum(BK.rel))}. Dividing by the number of items, which is ${BK.rel.length}, gives ${S(BK.relI)}. This treats every input as equally important, which is a limitation.`,
    }),
    sl('concept', 'Weighted aggregative methods', {
      b: 'Quantities act as **weights**. **Laspeyres** uses **base-year** quantities; **Paasche** uses **current-year** quantities.',
      v: vLpMeaning,
      n: 'Weighted methods give each item an importance based on the quantity bought. The Laspeyres index uses the quantities of the base year. It asks what the old basket costs now compared with what it cost then. The Paasche index uses the quantities of the current year. It asks what the current basket costs now compared with its cost at base prices.',
    }),
    sl('example', 'Worked example 3: stationers', {
      b: 'The imagined Pinecrest Stationers sold four items in two terms. Find the Laspeyres and Paasche indices.',
      bl: [
        `**Laspeyres —** Σp1q0 ÷ Σp0q0 × 100 = ${ST.p1q0} ÷ ${ST.p0q0} × 100 = **${S(ST.L)}**.`,
        `**Paasche —** Σp1q1 ÷ Σp0q1 × 100 = ${ST.p1q1} ÷ ${ST.p0q1} × 100 = **${S(ST.P)}**.`,
      ],
      v: vStTable,
      n: `We find the cost of each basket at each set of prices. The base term basket costs ${ST.p0q0} rupees at base prices and ${ST.p1q0} rupees at current prices, which gives a Laspeyres index of ${S(ST.L)}. The current term basket costs ${ST.p0q1} at base prices and ${ST.p1q1} at current prices, which gives a Paasche index of ${S(ST.P)}.`,
    }),
    sl('check', 'Quick check: Paasche weights', {
      b: 'True or false: the Paasche index uses the quantities of the current year as weights.',
      chk: 'tf_paasche',
      n: 'Recall which year supplies the quantities in each method. One of the two weighted methods uses base year quantities and the other uses current year quantities. Decide whether the statement matches the Paasche method.',
    }),
    sl('concept', 'Why Laspeyres and Paasche differ', {
      b: 'When buyers shift away from items that became **dearer**, the **Paasche** value tends to be **lower**.',
      v: vGap,
      n: 'The two methods usually give different answers because the quantities differ. In each of these imagined sets, buyers bought less of the items that became dearer. The base year weights keep the old buying pattern, so Laspeyres is higher. The current year weights reflect the shift, so Paasche is lower. Laspeyres needs quantities only once, but Paasche needs them every year.',
    }),
    sl('concept', 'Consumer price index: weighted relatives', {
      b: 'The **consumer price index** is a **weighted average of price relatives**: **ΣRW ÷ ΣW**, with weights from the **family budget**.',
      v: vCpiFlow,
      n: 'A consumer price index is built as a weighted average of price relatives. First find the relative of each item. Then multiply each relative by its weight, taken from the family budget, which shows how much the family spends on that item. Add the products, and divide by the total of the weights.',
    }),
    sl('diagram', 'A consumer price index table', {
      v: vCpiSvg,
      n: `Here is the construction for an imagined family of Bhavnagar Colony. Each item has base and current prices, a relative, and a weight. The relatives, such as ${S(FB_R[0])} for flour and ${S(FB_R[4])} for the bus fare, are multiplied by the weights. The products add up to ${sum(FB_RW)} and the weights to ${sum(FB_W)}, so the index is ${S(fbCPI)}.`,
    }),
    sl('example', 'Worked example 4: a mill colony index', {
      b: 'The imagined Madhupur Mill Colony has five groups, weighted by base-year spending. Find the index.',
      bl: [
        `**Step 1 —** Relatives R: ${J(ML_R)}; weights W: ${J(ML_W)}.`,
        `**Step 2 —** ΣRW = **${sum(ML_RW)}** and ΣW = **${sum(ML_W)}**.`,
        `**Step 3 —** Index = ${sum(ML_RW)} ÷ ${sum(ML_W)} = **${S(mlCPI)}**.`,
      ],
      v: vMlTable,
      n: `Food carries the largest weight, since a worker family spends most on it. Multiplying each relative by its weight and adding gives ${sum(ML_RW)}. The weights add up to ${sum(ML_W)}. Dividing gives a consumer price index of ${S(mlCPI)}. The cost of living for these families is ${S(mlCPI - 100)} per cent above the base.`,
    }),
    sl('check', 'Quick check: steps of the method', {
      b: 'Put the steps of constructing a consumer price index in order.',
      chk: 'ord_cpi',
      n: 'Think about what each step needs. You cannot weight a relative before you have found it, and you cannot divide by the total weight before the weighted values are added. The division comes last.',
    }),
    sl('concept', 'Inflation from an index', {
      b: '**Inflation** is a **sustained rise in the general price level**. Rate = **(I1 − I0) ÷ I0 × 100**.',
      v: vInfl,
      n: `Inflation is a sustained rise in the general price level. From an index, the rate is the change in the index divided by the earlier index, times one hundred. In our imagined colony the rates are ${J(INF.map(S))} per cent over the five years. Notice that a lower rate, such as ${S(INF[3])} per cent, still means prices are rising, only more slowly.`,
    }),
    sl('example', 'Worked example 5: finding inflation', {
      b: 'Use the imagined Bhavnagar Colony index: Year 2 = 130, Year 3 = 143.',
      bl: [
        `**Step 1 —** Change = ${CP[3]} − ${CP[2]} = **${CP[3] - CP[2]}**.`,
        `**Step 2 —** Rate = ${CP[3] - CP[2]} ÷ ${CP[2]} × 100 = **${S(INF[2])}** per cent.`,
        `**Step 3 —** Year 3 to Year 4: ${CP[4] - CP[3]} ÷ ${CP[3]} × 100 = **${S(INF[3])}** per cent.`,
      ],
      v: vInfl,
      n: `From Year 2 to Year 3 the index rises from ${CP[2]} to ${CP[3]}, a change of ${CP[3] - CP[2]}. Dividing by the earlier index of ${CP[2]} and multiplying by one hundred gives ${S(INF[2])} per cent. From Year 3 to Year 4 the change is ${CP[4] - CP[3]}, so the rate is ${S(INF[3])} per cent, which is lower.`,
    }),
    sl('check', 'Quick check: a rate of inflation', {
      b: 'Find the rate of inflation between two years from the index.',
      chk: 'n_infl_y3',
      n: 'Subtract the earlier index from the later one. Divide the change by the earlier index, and multiply by one hundred. Give the answer as a per cent.',
    }),
    sl('example', 'Worked example 6: real wage and purchasing power', {
      b: 'A clerk of the imagined Bhavnagar Colony Cooperative Society earns a rising money wage. Is he better off?',
      bl: [
        '**Rule —** real wage = money wage ÷ index × 100.',
        `**Year 1 —** ${WG[0]} ÷ ${CP[1]} × 100 = **${S(RW[0])}** rupees.`,
        `**Year 2 —** ${WG[1]} ÷ ${CP[2]} × 100 = **${S(RW[1])}** rupees.`,
        `**Year 3 —** ${WG[2]} ÷ ${CP[3]} × 100 = **${S(RW[2])}** rupees: no better off than in Year 1.`,
      ],
      v: vReal,
      n: `The money wage rises every year, from ${WG[0]} to ${WG[2]} rupees. But the real wage, which is the money wage divided by the index times one hundred, is ${S(RW[0])}, then ${S(RW[1])}, then ${S(RW[2])}. In Year 3 the clerk is no better off than in Year 1. As the index rises, a rupee buys less, so purchasing power falls.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To recap. The simple aggregative index adds up prices and depends on units. Price relatives are free of units. Laspeyres uses base year quantities and Paasche uses current year quantities. The consumer price index is a weighted average of relatives with family budget weights. Inflation is the change in the index over the earlier index, and the real wage is the money wage divided by the index times one hundred.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **formula first**, then substitute and show each total.',
        'For Laspeyres use **base-year quantities**; for Paasche **current-year quantities**.',
        'For a consumer price index, show **R, W and RW** in a table, then divide by **ΣW**.',
        'For inflation, divide the change by the **earlier** index.',
        'Finish with a **sentence**: prices rose by so many per cent, or the real wage fell.',
      ],
      n: 'Some tips. Write the formula first, then substitute and show each total. For Laspeyres use base year quantities, and for Paasche use current year quantities. For a consumer price index, show relatives, weights and their products in a table, then divide by the total weight. For inflation, divide the change by the earlier index. And finish with a sentence that says what the answer means.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Introduction to Index Numbers — Notes',
  sections: [
    {
      h: '1. Meaning of an index number and the base period',
      t: 1,
      b: `An **index number** is a statistical device that measures the **relative change** in a variable, or a group of related variables, over time, compared with a **base period** taken as **100**. An index above 100 shows a rise over the base and an index below 100 a fall.\n\nThe **base period** should be a **normal** one, free of abnormal events such as a long shortage. Imagined example: a notebook costs Rs ${NB[0]} in the base year, Rs ${NB[1]} in Year 1 and Rs ${NB[2]} in Year 2, so its index is ${S(NB_I[0])}, ${S(NB_I[1])} and ${S(NB_I[2])}.`,
      terms: [
        ['Index number', 'A statistical device that measures the relative change in a variable or a group of related variables over time, compared with a base period.'],
        ['Base period', 'The normal period with which other periods are compared; its index is taken as 100.'],
      ],
      v: vWhat,
      vs: [vBaseRead, vLine],
    },
    {
      h: '2. Wholesale price index, consumer price index and index of industrial production',
      t: 1,
      b: `The **wholesale price index** measures the change in the general price level of goods traded in **bulk**. As commonly taught, it is compiled by the Office of the Economic Adviser, Ministry of Commerce and Industry.\n\nThe **consumer price index**, or **cost-of-living index**, measures the change in the **retail prices** of a **fixed basket** of goods and services consumed by a **defined group**. As commonly taught, there are indices for industrial workers, for agricultural labourers, and for rural, urban and combined households. It is used to adjust dearness allowance and wages.\n\nThe **index of industrial production** measures the change in the **volume** of industrial output (mining, manufacturing and electricity), so it is a quantity index. The **Sensex** is the stock market index of the Bombay Stock Exchange, based on thirty companies.`,
      terms: [
        ['Wholesale price index', 'An index of the change in the general price level of goods traded in bulk.'],
        ['Consumer price index', 'An index of the change in the retail prices of a fixed basket of goods and services consumed by a defined group; also called the cost-of-living index.'],
        ['Index of industrial production', 'An index of the change in the volume of output of mining, manufacturing and electricity.'],
        ['Sensex', 'The stock market index of the Bombay Stock Exchange, based on thirty companies.'],
      ],
      v: vCompare,
      vs: [vWpi, vCpi, vIip, vCpiWork],
    },
    {
      h: '3. Uses of index numbers and issues in construction',
      t: 1,
      b: `**Uses:** measuring inflation; adjusting wages and allowances; deflating money values to real terms; policy-making; comparing performance over time.\n\n**Deflating:** real value = money value ÷ index × 100. For the imagined Kaushal Printers, sales rise from Rs ${S(KP[0])} lakh to Rs ${S(KP[2])} lakh in money terms (${S(kpNom)} per cent) but from Rs ${S(KPr[0])} lakh to Rs ${S(KPr[2])} lakh in real terms (${S(kpReal)} per cent).\n\n**Issues in construction:** purpose; choice of base year; choice of items; price quotations (wholesale or retail); choice of weights; choice of formula.`,
      terms: [
        ['Deflating', 'Converting a money value into real terms by dividing it by a price index and multiplying by 100.'],
        ['Weights', 'Numbers that show the relative importance of the items in an index.'],
      ],
      v: vUses,
      vs: [vDeflate, vIssues, vChoose, vIipEx],
    },
    {
      h: '4. Simple methods: aggregative and price relatives',
      t: 2,
      b: `**Simple aggregative method:** P01 = Σp1 ÷ Σp0 × 100. Its limitation is that it is affected by the **units** in which the items are quoted.\n\n**Simple average of price relatives:** Σ(p1 ÷ p0 × 100) ÷ n. A price relative is a pure ratio, so this method is free of units, though every item has equal importance.\n\nFor the imagined Sunrise Bakery, Σp0 = ${BK.sp0} and Σp1 = ${BK.sp1}, so the aggregative index is ${S(BK.aggI)}; the relatives are ${J(BK.rel.map(S))}, so their average is ${S(BK.relI)}. If butter is quoted per 100 g and eggs per piece, the aggregative index becomes ${S(BKU.aggI)} but the average of relatives stays ${S(BK.relI)}.`,
      terms: [
        ['Simple aggregative method', 'A method that divides the total of current prices by the total of base-year prices and multiplies by 100.'],
        ['Price relative', 'The price of the current year as a percentage of the price of the base year, p1 ÷ p0 × 100.'],
      ],
      v: vBkAgg,
      vs: [vFormulas, vUnits, vBars, vBkRel],
    },
    {
      h: '5. Weighted aggregative methods: Laspeyres and Paasche',
      t: 2,
      b: `**Laspeyres:** Σp1q0 ÷ Σp0q0 × 100, with the **base-year** quantities as weights. It compares the cost of the base-year basket at current and at base prices.\n\n**Paasche:** Σp1q1 ÷ Σp0q1 × 100, with the **current-year** quantities as weights. It compares the cost of the current-year basket at current and at base prices.\n\nFor the imagined Pinecrest Stationers, Σp0q0 = ${ST.p0q0}, Σp1q0 = ${ST.p1q0}, Σp0q1 = ${ST.p0q1} and Σp1q1 = ${ST.p1q1}, so Laspeyres = ${S(ST.L)} and Paasche = ${S(ST.P)}.`,
      terms: [
        ['Laspeyres index', 'A weighted aggregative price index that uses the quantities of the base year as weights.'],
        ['Paasche index', 'A weighted aggregative price index that uses the quantities of the current year as weights.'],
      ],
      v: vLpMeaning,
      vs: [vStTable, vGap],
    },
    {
      h: '6. Consumer price index: weighted average of price relatives',
      t: 2,
      b: `**Index = ΣRW ÷ ΣW**, where R is the price relative of an item (or group) and W its weight from the **family budget**. Steps: find R; multiply by W; add the products; divide by ΣW.\n\nFor an imagined family budget of Bhavnagar Colony, ΣRW = ${sum(FB_RW)} and ΣW = ${sum(FB_W)}, so the index is ${S(fbCPI)}. For the imagined Madhupur Mill Colony, ΣRW = ${sum(ML_RW)} and ΣW = ${sum(ML_W)}, so the index is ${S(mlCPI)}.`,
      terms: [
        ['Family budget', 'A record of how a family spends its income on different items; it supplies the weights of a consumer price index.'],
        ['Weighted average of price relatives', 'The total of price relatives multiplied by their weights, divided by the total of the weights.'],
      ],
      v: vCpiSvg,
      vs: [vCpiFlow, vMlTable],
    },
    {
      h: '7. Inflation, real wage and purchasing power',
      t: 2,
      b: `**Inflation** is a sustained rise in the general price level. Its rate between two years is **(I1 − I0) ÷ I0 × 100**, where I is a price index. A lower rate of inflation still means that prices are rising, only more slowly.\n\n**Real wage = money wage ÷ consumer price index × 100.** When prices rise faster than the money wage, the real wage and the purchasing power fall. In the imagined Bhavnagar Colony the index is ${J(CP)}; the rates of inflation are ${J(INF.map(S))} per cent. A clerk's money wage of Rs ${J(WG)} gives real wages of Rs ${J(RW.map(S))}.`,
      terms: [
        ['Inflation', 'A sustained rise in the general price level.'],
        ['Real wage', 'The money wage adjusted for price changes, equal to the money wage divided by the consumer price index and multiplied by 100.'],
        ['Purchasing power', 'The quantity of goods and services that a unit of money can buy.'],
      ],
      v: vInfl,
      vs: [vReal],
    },
  ],
  tips: `- Define an index number with the **base period taken as 100**.\n- Say whether an index measures **prices** (wholesale, consumer) or **volume** (industrial production).\n- Write the **formula** first, then substitute; show each total (Σp0, Σp1, Σp1q0 and so on).\n- Laspeyres uses **base-year** quantities; Paasche uses **current-year** quantities.\n- For a consumer price index: relatives, weights, products, **ΣRW ÷ ΣW**.\n- Inflation rate: change in the index ÷ **earlier** index × 100. Real wage: money wage ÷ index × 100.`,
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Index number**', 'A statistical device that measures the relative change in a variable or group of related variables over time, compared with a base period.', 'definition', 1],
  ['**Base period**', 'The normal period with which other periods are compared; its index is taken as 100.', 'definition', 1],
  ['A good base year', 'A normal year, free of abnormal events.', 'fact', 1],
  ['An index of 125 against a base of 100', 'The variable is 25 per cent higher than in the base period.', 'concept', 1],
  ['An index below 100', 'The variable is lower than in the base period.', 'concept', 1],
  ['**Wholesale price index**', 'Measures the change in the general price level of goods traded in bulk.', 'definition', 1],
  ['Compiler of the wholesale price index (as commonly taught)', 'The Office of the Economic Adviser, Ministry of Commerce and Industry.', 'fact', 1],
  ['**Consumer price index**', 'Measures the change in the retail prices of a fixed basket of goods and services consumed by a defined group; also called the cost-of-living index.', 'definition', 1],
  ['Kinds of consumer price index (as commonly taught)', 'For industrial workers, for agricultural labourers, and rural, urban and combined.', 'fact', 1],
  ['Use of the consumer price index', 'Adjusting dearness allowance and wages to protect purchasing power.', 'concept', 1],
  ['**Index of industrial production**', 'Measures the change in the volume of industrial output: mining, manufacturing and electricity.', 'definition', 1],
  ['Price index or quantity index?', 'Wholesale and consumer indices are price indices; industrial production is a quantity index.', 'concept', 1],
  ['**Sensex**', 'The stock market index of the Bombay Stock Exchange, based on thirty companies.', 'definition', 1],
  ['Uses of index numbers', 'Measuring inflation, adjusting wages, deflating values, policy-making, comparing performance over time.', 'fact', 1],
  ['Issues in constructing an index', 'Purpose, base year, items, price quotations, weights, formula.', 'fact', 1],
  ['**Deflating** a money value', 'Real value = money value ÷ price index × 100.', 'formula', 1],
  ['**Simple aggregative method**', 'Index = Σp1 ÷ Σp0 × 100.', 'formula', 2],
  ['Limitation of the simple aggregative method', 'The index depends on the units in which prices are quoted.', 'concept', 2],
  ['**Price relative**', 'p1 ÷ p0 × 100: the current price as a percentage of the base price.', 'formula', 2],
  ['Simple average of price relatives', 'Index = Σ(p1 ÷ p0 × 100) ÷ n; free of units but treats every item as equally important.', 'formula', 2],
  ['**Laspeyres index**', 'Σp1q0 ÷ Σp0q0 × 100: weights are the quantities of the base year.', 'formula', 2],
  ['**Paasche index**', 'Σp1q1 ÷ Σp0q1 × 100: weights are the quantities of the current year.', 'formula', 2],
  ['Laspeyres or Paasche: which year\'s quantities?', 'Laspeyres, the base year; Paasche, the current year.', 'concept', 2],
  ['**Weighted average of price relatives**', 'Index = ΣRW ÷ ΣW, with R the relative and W the weight.', 'formula', 2],
  ['Source of the weights of a consumer price index', 'The family budget.', 'fact', 2],
  ['**Inflation**', 'A sustained rise in the general price level.', 'definition', 2],
  ['Rate of inflation from an index', '(I1 − I0) ÷ I0 × 100, with I0 the earlier index.', 'formula', 2],
  ['A falling rate of inflation', 'Prices still rise, only more slowly; they fall only if the index falls.', 'concept', 2],
  ['**Real wage**', 'Money wage ÷ consumer price index × 100.', 'formula', 2],
  ['Money wage rises 6 per cent, index rises 9 per cent', 'The real wage falls, since prices rose faster than the wage.', 'concept', 2],
  ['Purchasing power and the index', 'As the consumer price index rises, a unit of money buys less.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Introduction to Index Numbers',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_index_def', 'm_cpi_use', 'm_laspeyres', 'ar_base'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_def', 's2_unit', 's3_lp'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_types', 'l_methods'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_hh'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Introduction to Index Numbers',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_base_choice', 'm_wpi', 'm_cpi_what', 'm_iip_vs', 'm_weights', 'm_unit_flaw', 'm_relative', 'm_infl_formula', 'ar_iip', 'ar_cpi_wpi'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_wpi', 's2_infl', { attempt: 1, keys: ['s2_cpi_use', 's2_real'] }, 's3_issues', { attempt: 1, keys: ['s3_cpi_steps', 's3_real'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_issues', { attempt: 1, keys: ['l_juice', 'l_cpi'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_factory', 'cb_wage'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-11-economics-ch07 only (types and uses of index numbers, wholesale price index, consumer price index, index of industrial production, Sensex, issues in construction; simple aggregative method, price relatives, Laspeyres and Paasche, weighted relatives, inflation, real wage)',
    originality: 'every household, bakery, stationer, canteen, juice bar, factory, mill colony, clerk and town is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all price relatives, product sums, Laspeyres, Paasche, weighted-relative indices, inflation rates, real wages and deflated values computed with stats.mjs or plain code from imagined data and asserted with check(); every SVG is drawn from the same data',
    facts: 'only stable ideas are stated: definition of an index number and base period, what WPI, CPI and IIP measure and who compiles them in general terms, Sensex as the Bombay Stock Exchange index of thirty companies, uses, issues, formulas of the four methods, inflation rate and real wage; no actual index value, rate or base year is quoted',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
