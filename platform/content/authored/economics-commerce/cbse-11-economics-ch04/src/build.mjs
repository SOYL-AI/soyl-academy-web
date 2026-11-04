// Build CBSE 11 Economics ch04 Presentation of Data. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch04', 'economics-commerce');
const Qs = await import('./questions.mjs');
const {
  S, inr, CROPS, BLOCKS, CT, rowTot, colTot, grand, share, BUD, budTot, budAng, budPct,
  FACT, factN, factCum, factMore, factMed, factMarks, factLessAtMed, factMoreAtMed,
  UN, unW, unStd, unAdj, YEARS, SALES, salesChg, salesGrowth, CL, clN, clCum, CAFE, cafeTot, cafeAng,
} = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
check(factN, 80, 0, 'factory days');
check(sum(factMarks.slice(0, 1)), 55, 0, 'first class mark');
check(factMed.median, 85, 2, 'factory median');
check(sum(UN.map((c) => c[2])), 100, 0, 'kiln labourers');
check(SALES[7] - SALES[0], 30, 0, 'sales rise in seven years');
const ptsPoly = [[FACT[0][0] - 5, 0], ...FACT.map((c, i) => [factMarks[i], c[2]]), [FACT[FACT.length - 1][1] + 5, 0]];
check(ptsPoly[0][0], 45, 0, 'left imaginary class mark');
check(ptsPoly[ptsPoly.length - 1][0], 125, 0, 'right imaginary class mark');
const COL = ['blue', 'green', 'yellow', 'brown', 'red', 'accent'];
const deg = (a) => `${S(a)}°`;

// ---------------------------------------------------------------- SVG helpers
function legend(s, x, y, items, gap = 120) {
  items.forEach(([lab, col], i) => {
    s.rect(x + i * gap, y - 6, 12, 12, { rx: 2, fill: col, fillOpacity: 0.55, color: col, sw: 1.4 });
    s.text(x + i * gap + 18, y, lab, { anchor: 'start', size: 12 });
  });
}
const bar = (s, ch, xc, w, y0v, y1v, col, o = {}) => {
  const x0 = ch.X(xc - w / 2), x1 = ch.X(xc + w / 2);
  s.rect(x0, ch.Y(y1v), x1 - x0, ch.Y(y0v) - ch.Y(y1v), { rx: 0, fill: col, fillOpacity: 0.55, color: col, sw: 1.6, ...o });
};

const vSimple = (() => {
  const s = new Svg(600, 330);
  const ch = s.chart({ x0: 0, x1: 4, y0: 0, y1: 120, left: 70, top: 40, width: 480, height: 220, xLabel: 'Crop', yLabel: 'Output (thousand tonnes)' });
  CROPS.forEach((c, i) => {
    bar(s, ch, i + 0.5, 0.5, 0, rowTot[i], 'blue');
    s.text(ch.X(i + 0.5), ch.Y(rowTot[i]) - 10, String(rowTot[i]), { size: 13, bold: true });
    s.text(ch.X(i + 0.5), ch.Y(0) + 16, c, { size: 12 });
  });
  [0, 20, 40, 60, 80, 100, 120].forEach((v) => ch.yTick(v, String(v)));
  return s.visual(`Simple bar diagram of the total output of four crops in the imagined district of Devgarh, in thousand tonnes: ${CROPS.map((c, i) => `${c.toLowerCase()} ${rowTot[i]}`).join(', ')}`, 'Imagined Devgarh district: total output of each crop. Equal widths, equal gaps; only height carries meaning.');
})();

const vMulti = (() => {
  const s = new Svg(640, 340);
  const ch = s.chart({ x0: 0, x1: 4, y0: 0, y1: 60, left: 70, top: 50, width: 520, height: 220, xLabel: 'Crop', yLabel: 'Output (thousand tonnes)' });
  CROPS.forEach((c, i) => {
    BLOCKS.forEach((b, j) => {
      const xc = i + 0.5 + (j - 1) * 0.24;
      bar(s, ch, xc, 0.24, 0, CT[i][j], COL[j], { sw: 1.2 });
      s.text(ch.X(xc), ch.Y(CT[i][j]) - 9, String(CT[i][j]), { size: 11 });
    });
    s.text(ch.X(i + 0.5), ch.Y(0) + 16, c, { size: 12 });
  });
  [0, 10, 20, 30, 40, 50, 60].forEach((v) => ch.yTick(v, String(v)));
  legend(s, 250, 18, BLOCKS.map((b, j) => [b, COL[j]]), 125);
  return s.visual(`Multiple bar diagram of crop output by block in the imagined district of Devgarh, in thousand tonnes. Wheat: ${CT[0].join(', ')}; rice: ${CT[1].join(', ')}; pulses: ${CT[2].join(', ')}; oilseeds: ${CT[3].join(', ')} for the North, Central and South blocks`, 'Imagined Devgarh district: three bars for each crop, one for each block');
})();

const vComp = (() => {
  const s = new Svg(640, 340);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 130, left: 70, top: 50, width: 520, height: 220, xLabel: 'Block', yLabel: 'Output (thousand tonnes)' });
  BLOCKS.forEach((b, j) => {
    let base = 0;
    CROPS.forEach((c, i) => {
      const v = CT[i][j];
      bar(s, ch, j + 0.5, 0.5, base, base + v, COL[i], { sw: 1.2 });
      if (ch.Y(base) - ch.Y(base + v) >= 13) s.text(ch.X(j + 0.5), ch.Y(base + v / 2), String(v), { size: 11 });
      base += v;
    });
    s.text(ch.X(j + 0.5), ch.Y(colTot[j]) - 10, `Total ${colTot[j]}`, { size: 13, bold: true });
    s.text(ch.X(j + 0.5), ch.Y(0) + 16, b, { size: 12 });
  });
  [0, 20, 40, 60, 80, 100, 120].forEach((v) => ch.yTick(v, String(v)));
  legend(s, 150, 18, CROPS.map((c, i) => [c, COL[i]]), 100);
  return s.visual(`Component bar diagram of crop output in the imagined district of Devgarh. Block totals: ${BLOCKS.map((b, j) => `${b.toLowerCase()} ${colTot[j]}`).join(', ')} thousand tonnes, each bar divided into wheat, rice, pulses and oilseeds`, 'Imagined Devgarh district: each bar is a block total divided into its crops');
})();

const vPct = (() => {
  const s = new Svg(640, 340);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 100, left: 70, top: 50, width: 520, height: 220, xLabel: 'Block', yLabel: 'Share of block output (per cent)' });
  BLOCKS.forEach((b, j) => {
    let base = 0;
    CROPS.forEach((c, i) => {
      const v = share[j][i];
      bar(s, ch, j + 0.5, 0.5, base, base + v, COL[i], { sw: 1.2 });
      s.text(ch.X(j + 0.5), ch.Y(base + v / 2), `${S(v)}%`, { size: 11 });
      base += v;
    });
    s.text(ch.X(j + 0.5), ch.Y(0) + 16, b, { size: 12 });
  });
  [0, 25, 50, 75, 100].forEach((v) => ch.yTick(v, String(v)));
  legend(s, 150, 18, CROPS.map((c, i) => [c, COL[i]]), 100);
  return s.visual(`Percentage component bar diagram of the three blocks of the imagined district of Devgarh; every bar is 100 per cent. Rice share: ${BLOCKS.map((b, j) => `${b.toLowerCase()} ${S(share[j][1])} per cent`).join(', ')}`, 'Imagined Devgarh district: every bar is 100 per cent, so the make-up of unequal totals can be compared');
})();

function pieSvg(items, angles, total, unitLabel, alt, caption, centre = 'Rs') {
  const s = new Svg(560, 390);
  const cx = 280, cy = 195, r = 112;
  const pt = (a, rr) => [cx + rr * Math.sin((a * Math.PI) / 180), cy - rr * Math.cos((a * Math.PI) / 180)];
  let a0 = 0;
  items.forEach((it, i) => {
    const a1 = a0 + angles[i];
    const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r);
    const big = angles[i] > 180 ? 1 : 0;
    s.path(`M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${big} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`, { fill: COL[i], fillOpacity: 0.5, color: COL[i], sw: 2 });
    const mid = a0 + angles[i] / 2;
    const [lx, ly] = pt(mid, r + 26);
    s.text(lx, ly, `${it[0]} ${S(angles[i])}°`, { size: 13, anchor: lx >= cx ? 'start' : 'end' });
    a0 = a1;
  });
  s.text(cx, 372, `Total ${unitLabel === 'Rs' ? 'Rs ' : ''}${total.toLocaleString('en-IN')} = 360°`, { size: 13, muted: true });
  return s.visual(alt, caption);
}
const vPie = pieSvg(BUD, budAng, budTot, 'Rs',
  `Pie diagram of the imagined Rao family monthly budget of ${inr(budTot)}: ${BUD.map((b, i) => `${b[0].toLowerCase()} ${S(budAng[i])} degrees`).join(', ')}, which add up to 360 degrees`,
  'Imagined Rao family budget: each sector angle is the share of the total times 360 degrees');

const vTableParts = (() => {
  const s = new Svg(700, 320);
  const x0 = 20, cw = [100, 92, 92, 92, 84];
  const xs = cw.reduce((a, w, i) => (a.push(a[i] + w), a), [x0]);
  const hy = 62, rh = 30;
  s.text(x0, 18, 'Table 1. Crop output of the imagined Devgarh district, by block', { anchor: 'start', size: 13, bold: true });
  s.text(x0, 38, '(in thousand tonnes)', { anchor: 'start', size: 12, muted: true });
  const heads = ['Crop', ...BLOCKS.map((b, j) => (j === 2 ? `${b}*` : b)), 'Total'];
  heads.forEach((h, k) => { s.rect(xs[k], hy, cw[k], rh, { rx: 0, fill: 'fill', color: 'accent', sw: 1.4 }); s.text(xs[k] + cw[k] / 2, hy + rh / 2, h, { size: 12, bold: true }); });
  CROPS.forEach((c, i) => {
    const row = [c, ...CT[i], rowTot[i]];
    row.forEach((v, k) => { s.rect(xs[k], hy + rh * (i + 1), cw[k], rh, { rx: 0, color: 'muted', sw: 1 }); s.text(xs[k] + cw[k] / 2, hy + rh * (i + 1) + rh / 2, String(v), { size: 12, bold: k === 0 }); });
  });
  const tr = ['Total', ...colTot, grand];
  tr.forEach((v, k) => { s.rect(xs[k], hy + rh * 5, cw[k], rh, { rx: 0, fill: 'fill', color: 'accent', sw: 1.4 }); s.text(xs[k] + cw[k] / 2, hy + rh * 5 + rh / 2, String(v), { size: 12, bold: true }); });
  s.text(x0, hy + rh * 6 + 22, 'Source: Devgarh district agriculture register (imagined)', { anchor: 'start', size: 12 });
  s.text(x0, hy + rh * 6 + 44, '* Figures of the South block are provisional (imagined).', { anchor: 'start', size: 12 });
  const xe = xs[5] + 20;
  const call = (txt, yy, tx, ty) => { s.line(xe, yy, xe + 22, yy, { sw: 1, color: 'muted' }); s.text(xe + 28, yy, txt, { anchor: 'start', size: 12, color: 'accent' }); };
  call('Title and table number', 14);
  call('Unit of measurement', 38);
  call('Captions (column headings)', hy + rh / 2);
  call('Stubs (row headings)', hy + rh * 2.5);
  call('Body (the figures)', hy + rh * 3.5);
  call('Totals', hy + rh * 5.5);
  call('Source note', hy + rh * 6 + 22);
  call('Footnote', hy + rh * 6 + 44);
  return s.visual(`A labelled table of crop output of the imagined Devgarh district with the table number and title, unit of measurement, captions, stubs, body, totals (grand total ${grand}), source note and footnote marked`, 'The parts of a table');
})();

function histChart(s, o = {}) {
  const ch = s.chart({ x0: 40, x1: 130, y0: 0, y1: 28, left: 70, top: 40, width: 540, height: 240, xLabel: 'Daily output (crates)', yLabel: 'Number of days' });
  s.polyline([[76, 280], [80, 273], [86, 287], [90, 280]], { sw: 1.6 }); // axis break: the horizontal axis does not start at zero
  for (let x = 40; x <= 130; x += 10) ch.xTick(x, String(x));
  [0, 4, 8, 12, 16, 20, 24, 28].forEach((v) => ch.yTick(v, String(v)));
  FACT.forEach((c) => {
    s.rect(ch.X(c[0]), ch.Y(c[2]), ch.X(c[1]) - ch.X(c[0]), ch.Y(0) - ch.Y(c[2]), { rx: 0, fill: 'blue', fillOpacity: 0.3, color: 'blue', sw: 1.6 });
    if (o.labels) s.text(ch.X((c[0] + c[1]) / 2), ch.Y(c[2]) + 14, String(c[2]), { size: 12 });
  });
  return ch;
}
const vHistPoly = (() => {
  const s = new Svg(640, 340);
  const ch = histChart(s, { labels: true });
  s.polyline(ptsPoly.map(([x, y]) => [ch.X(x), ch.Y(y)]), { color: 'red', sw: 2.4 });
  ptsPoly.forEach(([x, y]) => s.dot(ch.X(x), ch.Y(y), 4, 'red'));
  return s.visual(`Histogram of the daily output of the imagined Anand Bolt Works over ${factN} days with seven touching rectangles of frequencies ${FACT.map((c) => c[2]).join(', ')}, and a frequency polygon through the class marks ${ptsPoly.map((p) => p[0]).join(', ')}, closed at the class marks 45 and 125 of imaginary classes`, 'Imagined Anand Bolt Works: histogram with its frequency polygon');
})();
const vCurve = (() => {
  const s = new Svg(640, 340);
  const ch = histChart(s, {});
  const P = ptsPoly.map(([x, y]) => [ch.X(x), ch.Y(y)]);
  s.polyline(P, { color: 'muted', sw: 1.2, dash: true });
  let d = `M ${P[0][0].toFixed(2)} ${P[0][1].toFixed(2)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  s.path(d, { color: 'red', sw: 2.6 });
  P.forEach(([x, y]) => s.dot(x, y, 3.5, 'red'));
  return s.visual('Frequency curve for the daily output of the imagined Anand Bolt Works: a smooth curve drawn through the points of the frequency polygon, shown dashed, over the touching rectangles of the histogram', 'The frequency curve smooths the polygon');
})();

const vUneq = (() => {
  const s = new Svg(640, 350);
  const ch = s.chart({ x0: 300, x1: 1100, y0: 0, y1: 40, left: 70, top: 40, width: 540, height: 240, xLabel: 'Daily wage (rupees)', yLabel: 'Height (adjusted frequency)' });
  s.polyline([[76, 280], [80, 273], [86, 287], [90, 280]], { sw: 1.6 }); // axis break: the horizontal axis does not start at zero
  [300, 400, 500, 700, 1100].forEach((x) => ch.xTick(x, String(x)));
  [0, 10, 20, 30, 40].forEach((v) => ch.yTick(v, String(v)));
  UN.forEach((c, i) => {
    s.rect(ch.X(c[0]), ch.Y(unAdj[i]), ch.X(c[1]) - ch.X(c[0]), ch.Y(0) - ch.Y(unAdj[i]), { rx: 0, fill: 'blue', fillOpacity: 0.3, color: 'blue', sw: 1.6 });
    s.text(ch.X((c[0] + c[1]) / 2), ch.Y(unAdj[i]) + 14, String(unAdj[i]), { size: 12, bold: true });
    if (unW[i] > unStd) {
      s.rect(ch.X(c[0]), ch.Y(c[2]), ch.X(c[1]) - ch.X(c[0]), ch.Y(0) - ch.Y(c[2]), { rx: 0, color: 'muted', sw: 1.2, dash: true });
      s.text(ch.X((c[0] + c[1]) / 2), ch.Y(c[2]) - 10, `raw ${c[2]}`, { size: 12, muted: true });
    }
  });
  return s.visual(`Histogram of daily wages of 100 labourers at the imagined Kishan Brick Kiln with unequal classes; solid rectangle heights are the adjusted frequencies ${unAdj.join(', ')}, and dashed outlines show the raw frequencies ${UN[2][2]} and ${UN[3][2]} that would exaggerate the wide classes`, 'Unequal classes: heights are adjusted so that area stays proportional to frequency');
})();

const vOgives = (() => {
  const s = new Svg(640, 350);
  const ch = s.chart({ x0: 40, x1: 130, y0: 0, y1: 90, left: 70, top: 40, width: 540, height: 240, xLabel: 'Daily output (crates)', yLabel: 'Cumulative frequency (days)' });
  s.polyline([[76, 280], [80, 273], [86, 287], [90, 280]], { sw: 1.6 }); // axis break: the horizontal axis does not start at zero
  for (let x = 40; x <= 130; x += 10) ch.xTick(x, String(x));
  [0, 20, 40, 60, 80].forEach((v) => ch.yTick(v, String(v)));
  const less = [[FACT[0][0], 0], ...FACT.map((c, i) => [c[1], factCum[i]])];
  const more = [...FACT.map((c, i) => [c[0], factMore[i]]), [FACT[FACT.length - 1][1], 0]];
  s.polyline(less.map(([x, y]) => [ch.X(x), ch.Y(y)]), { color: 'accent', sw: 2.4 });
  s.polyline(more.map(([x, y]) => [ch.X(x), ch.Y(y)]), { color: 'red', sw: 2.4 });
  less.forEach(([x, y]) => s.dot(ch.X(x), ch.Y(y), 3.5, 'accent'));
  more.forEach(([x, y]) => s.dot(ch.X(x), ch.Y(y), 3.5, 'red'));
  const m = factMed.median, h = factMed.N / 2;
  ch.drop([m, h], { color: 'muted' });
  s.dot(ch.X(m), ch.Y(h), 6, 'brown');
  s.text(ch.X(m) + 14, ch.Y(h) - 14, `Median ${S(m)} at ${h}`, { anchor: 'start', size: 13, bold: true });
  s.text(ch.X(112), ch.Y(86), 'Less than ogive', { size: 13, color: 'accent', bold: true });
  s.text(ch.X(66), ch.Y(86), 'More than ogive', { size: 13, color: 'red', bold: true });
  return s.visual(`Less than and more than ogives of the daily output of the imagined Anand Bolt Works over ${factN} days; they cross at a cumulative frequency of ${h}, at a daily output of ${S(m)} crates, which is the median`, 'Imagined Anand Bolt Works: the two ogives cross at the median');
})();

const vLine = (() => {
  const s = new Svg(640, 340);
  const ch = s.chart({ x0: 2016, x1: 2025, y0: 0, y1: 80, left: 70, top: 40, width: 520, height: 230, xLabel: 'Year', yLabel: 'Sales (Rs lakh)' });
  YEARS.forEach((y) => ch.xTick(y, String(y)));
  [0, 20, 40, 60, 80].forEach((v) => ch.yTick(v, String(v)));
  const P = YEARS.map((y, i) => [ch.X(y), ch.Y(SALES[i])]);
  s.polyline(P, { color: 'accent', sw: 2.6 });
  P.forEach(([x, y], i) => { s.dot(x, y, 4, 'accent'); s.text(x, y - 13, String(SALES[i]), { size: 12 }); });
  return s.visual(`Arithmetic line graph of yearly sales of the imagined Kaveri Looms in rupees lakh from ${YEARS[0]} to ${YEARS[7]}: ${YEARS.map((y, i) => `${y} ${SALES[i]}`).join(', ')}`, 'Imagined Kaveri Looms: time on the horizontal axis, sales on the vertical axis');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Forms of presentation', 'Tables and their parts', 'Classification', 'Bar diagrams', 'Pie diagrams'], 'Route map of Part 1: forms of presentation, tables and their parts, classification of data, bar diagrams and pie diagrams', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Histogram', 'Frequency polygon and curve', 'Ogives', 'Arithmetic line graph', 'Choosing a diagram'], 'Route map of Part 2: histogram, frequency polygon and curve, ogives, arithmetic line graph and choosing a diagram', 'Part 2 at a glance');
const vForms = table(
  ['Form', 'What it is', 'Merit', 'Limit'],
  [
    ['Textual', 'Facts written in sentences', 'Suits a few figures; can explain', 'Many figures are hard to follow'],
    ['Tabular', 'Figures in rows and columns', 'Exact figures, easy comparison and totals', 'A long table tires the eye'],
    ['Diagrammatic', 'Bars, pies and graphs', 'Pattern is clear at a glance', 'Exact values are hard to read'],
  ],
  'Table comparing textual, tabular and diagrammatic presentation on what each is, its merit and its limit',
);
const vPartsDef = table(
  ['Part', 'What it is'],
  [
    ['Table number', 'A serial number that lets the text refer to the table'],
    ['Title', 'A short statement of what the data are, where and when'],
    ['Captions', 'Headings of the columns'],
    ['Stubs', 'Headings of the rows'],
    ['Body', 'The figures themselves'],
    ['Unit of measurement', 'The unit in which the figures are expressed'],
    ['Source note', 'A line saying where the figures were obtained'],
    ['Footnote', 'A note explaining a particular entry or exception'],
  ],
  'Table of the eight parts of a table with the standard meaning of each: table number, title, captions, stubs, body, unit of measurement, source note and footnote',
);
const vClassif = table(
  ['Basis of classification', 'Kind', 'Imagined example'],
  [
    ['An attribute that cannot be measured', 'Qualitative', 'Workers of a mill grouped by trade'],
    ['A measurable variable', 'Quantitative', 'Workers grouped by monthly wage class'],
    ['Time', 'Temporal', 'Mill output for each year from 2018 to 2024'],
    ['Place', 'Spatial', 'Mill output in each of three towns'],
  ],
  'Table of four kinds of classification of tabulated data, qualitative, quantitative, temporal and spatial, each with an imagined example from a mill',
);
const vTotals = table(
  ['Crop', ...BLOCKS, 'Total'],
  [...CROPS.map((c, i) => [c, ...CT[i].map(String), `**${rowTot[i]}**`]), ['Total', ...colTot.map((v) => `**${v}**`), `**${grand}**`]],
  `Table of crop output of the imagined district of Devgarh in thousand tonnes with row totals ${rowTot.join(', ')}, column totals ${colTot.join(', ')} and grand total ${grand}`,
  'Imagined Devgarh district, thousand tonnes: the row totals and column totals both add to the grand total.',
);
const vPctWork = table(
  ['Block', 'Block total', 'Rice share working', 'Rice share'],
  BLOCKS.map((b, j) => [b, String(colTot[j]), `${CT[1][j]} ÷ ${colTot[j]} × 100`, `**${S(share[j][1])}%**`]),
  `Table of the rice share in each block of the imagined district of Devgarh: ${BLOCKS.map((b, j) => `${b.toLowerCase()} ${S(share[j][1])} per cent`).join(', ')}`,
  'Imagined Devgarh district: shares are worked out as a part of its own block total.',
);
const vAngles = table(
  ['Component', 'Amount', 'Working', 'Angle', 'Per cent'],
  [...BUD.map((b, i) => [b[0], inr(b[1]), `${b[1]} ÷ ${budTot} × 360`, `**${S(budAng[i])}°**`, `${S(budPct[i])}%`]), ['Total', inr(budTot), '', `**${S(sum(budAng))}°**`, `${S(sum(budPct))}%`]],
  `Table of the sector angles of the imagined Rao family budget: ${BUD.map((b, i) => `${b[0].toLowerCase()} ${S(budAng[i])} degrees`).join(', ')}, total ${S(sum(budAng))} degrees`,
  'Imagined Rao family monthly budget.',
);
const vPick1 = table(
  ['Task (imagined)', 'Diagram'],
  [
    ['Total output of each of four crops in one district', 'Simple bar'],
    ['Output of each crop in three blocks, block by block', 'Multiple bar'],
    ['Block totals divided into crops', 'Component bar'],
    ['Make-up of blocks with very different totals', 'Percentage component bar'],
    ['Five heads of one family budget', 'Pie'],
  ],
  'Table choosing a diagram for five imagined tasks: simple bar, multiple bar, component bar, percentage component bar and pie',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Forms', 'Textual, tabular, diagrammatic'],
    ['Parts of a table', 'Number, title, captions, stubs, body, unit, source note, footnote'],
    ['Classification', 'Qualitative, quantitative, temporal, spatial'],
    ['Bar diagrams', 'Equal width and gaps; only height matters; simple, multiple, component'],
    ['Percentage component bar', 'Every bar 100 per cent'],
    ['Pie diagram', 'Angle is value over total times 360 degrees; angles add to 360'],
  ],
  'Summary table of Part 1: forms of presentation, parts of a table, classification, bar diagrams, percentage component bar and pie diagram',
);
const vHistBar = table(
  ['Point', 'Bar diagram', 'Histogram'],
  [
    ['Data', 'Separate items or categories', 'Continuous classes'],
    ['Gaps', 'Equal gaps between bars', 'No gaps; rectangles touch'],
    ['What carries the value', 'Height only', 'Area, and so height when classes are equal'],
    ['Width', 'Equal, with no meaning', 'Class width, which has meaning'],
  ],
  'Table comparing a bar diagram with a histogram on data, gaps, what carries the value and width',
);
const vAdj = table(
  ['Class (Rs)', 'Frequency', 'Width', 'Adjusted frequency working', 'Height'],
  UN.map((c, i) => [`${c[0]} to ${c[1]}`, String(c[2]), String(unW[i]), `${c[2]} ÷ ${unW[i]} × ${unStd}`, `**${unAdj[i]}**`]),
  `Table of the adjusted frequencies for the unequal wage classes of the imagined Kishan Brick Kiln: ${unAdj.join(', ')}`,
  'Imagined Kishan Brick Kiln: 100 labourers, standard width taken as the lowest width.',
);
const vMarks = table(
  ['Class (crates)', 'Class mark', 'Frequency'],
  [[`${FACT[0][0] - 10} to ${FACT[0][0]} (imaginary)`, String(ptsPoly[0][0]), '0'], ...FACT.map((c, i) => [`${c[0]} to ${c[1]}`, String(factMarks[i]), String(c[2])]), [`${FACT[6][1]} to ${FACT[6][1] + 10} (imaginary)`, String(ptsPoly[ptsPoly.length - 1][0]), '0']],
  'Table of class marks and frequencies for the polygon of the imagined Anand Bolt Works, with two imaginary classes of zero frequency at the ends',
  'Imagined Anand Bolt Works: points of the frequency polygon.',
);
const vCurvePoly = table(
  ['Figure', 'How it is drawn'],
  [
    ['Frequency polygon', 'Straight lines joining the points (class mark, frequency), closed at both ends'],
    ['Frequency curve', 'A smooth curve through the same points, drawn freehand'],
  ],
  'Table comparing a frequency polygon, drawn with straight lines through the points, with a frequency curve, drawn as a smooth curve through the same points',
);
const vCum = table(
  ['Class (crates)', 'f', 'Upper limit', 'Less than cf', 'Lower limit', 'More than cf'],
  FACT.map((c, i) => [`${c[0]} to ${c[1]}`, String(c[2]), String(c[1]), String(factCum[i]), String(c[0]), String(factMore[i])]),
  `Table of less than and more than cumulative frequencies for the imagined Anand Bolt Works: less than ${factCum.join(', ')}, more than ${factMore.join(', ')}`,
  'Imagined Anand Bolt Works, 80 days.',
);
const vMedianWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. Half the total', `${factN} ÷ 2`, `${factN / 2}`],
    ['2. Median class', `First class with cf of ${factN / 2} or more`, `${factMed.L} to ${factMed.L + factMed.h}`],
    ['3. Median by formula', `${factMed.L} + (${factN / 2} − ${factMed.cf}) ÷ ${factMed.f} × ${factMed.h}`, `**${S(factMed.median)}**`],
    ['4. Less than ogive at the median', 'Read from the graph', `${S(factLessAtMed)}`],
    ['5. More than ogive at the median', 'Read from the graph', `${S(factMoreAtMed)}`],
  ],
  `Table of the median of the imagined Anand Bolt Works from the ogives: half the total is ${factN / 2}, the median is ${S(factMed.median)} crates, and both ogives read ${S(factLessAtMed)} at that value`,
  'Imagined Anand Bolt Works.',
);
const vChanges = table(
  ['Year', 'Sales (Rs lakh)', 'Change from the previous year'],
  YEARS.map((y, i) => [String(y), String(SALES[i]), i ? `${salesChg[i - 1] > 0 ? '+' : ''}${salesChg[i - 1]}` : '-']),
  `Table of yearly sales of the imagined Kaveri Looms with the change from year to year; total rise over seven years ${SALES[7] - SALES[0]} lakh`,
  'Imagined Kaveri Looms, rupees lakh.',
);
const vPick2 = table(
  ['Task (imagined)', 'Diagram'],
  [
    ['Daily output of a factory in classes of equal width', 'Histogram, with polygon if wanted'],
    ['How many days had output below 90 crates', 'Less than ogive'],
    ['Median of a grouped series by graph', 'Two ogives'],
    ['Sales of a firm over eight years', 'Arithmetic line graph'],
  ],
  'Table choosing a diagram for four imagined tasks: histogram, less than ogive, two ogives and arithmetic line graph',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Histogram', 'Touching rectangles; area carries frequency; adjust heights for unequal classes'],
    ['Frequency polygon', 'Class marks against frequencies; close with imaginary classes'],
    ['Frequency curve', 'Smooth curve through the polygon points'],
    ['Less than ogive', 'Cumulative frequency against upper limits'],
    ['More than ogive', 'Cumulative frequency against lower limits'],
    ['Intersection of ogives', 'Gives the median'],
    ['Arithmetic line graph', 'Time on the horizontal axis; points joined in time order'],
  ],
  'Summary table of Part 2: histogram, frequency polygon, frequency curve, less than and more than ogives, their intersection and the arithmetic line graph',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Presentation of Data — Part 1: Tables, Bar Diagrams and Pie Diagrams',
  goals: [
    'Name the forms of presentation and the parts of a table, and classify tabulated data',
    'Build a table with row and column totals',
    'Draw and read simple, multiple, component and percentage component bar diagrams',
    'Compute the angles of a pie diagram and check that they add up to 360 degrees',
  ],
  slides: [
    sl('title', 'Presentation of Data', {
      b: 'Part 1 — how to **arrange** collected data in a **table** and draw them as **bars** and **pies**.',
      v: vRoute1,
      n: 'Collected data are easy to lose in a heap of numbers. Presentation arranges them so that a reader can see the story quickly. In this part we learn the forms of presentation, the parts of a table, how data are classified, and how bar diagrams and pie diagrams are drawn from figures that we compute ourselves.',
    }),
    sl('concept', 'Forms of presentation', {
      b: 'Data can be presented in **words**, in a **table** or in a **diagram**.',
      v: vForms,
      n: 'There are three forms of presentation. Textual presentation writes the facts in sentences, and it suits a handful of figures. Tabular presentation puts the figures in rows and columns, which gives exact values and easy totals. Diagrammatic presentation draws bars, pies and graphs, so the pattern is clear at a glance, though exact values are harder to read.',
    }),
    sl('diagram', 'The parts of a table', {
      v: vTableParts,
      n: 'Here is an imagined table of crop output in a district called Devgarh. At the top are the table number and the title. Then comes the unit of measurement. The headings across the top are the captions, and the headings down the left side are the stubs. The figures form the body. Below the table sit the source note and a footnote.',
    }),
    sl('concept', 'Parts of a table: standard meanings', {
      b: 'Learn the eight parts and the job of each.',
      v: vPartsDef,
      n: 'The table number lets the text refer to the table. The title says what the data are, where and when. Captions head the columns, and stubs head the rows. The body holds the figures. The unit tells us how the figures are measured. The source note says where the figures came from. A footnote explains a particular entry or an exception.',
    }),
    sl('check', 'Quick check: rows and columns', {
      b: 'Fill in the blanks about the headings of a table.',
      chk: 'fb_stub_caption',
      n: 'Think about which headings run across the top and which run down the left side. Each has its own name. Write the name for row headings first, then the name for column headings.',
    }),
    sl('concept', 'Classification of tabulated data', {
      b: 'A table can group data by an **attribute**, a **measured variable**, **time** or **place**.',
      v: vClassif,
      n: 'Tabulated data are classified in four ways. Qualitative classification uses an attribute that cannot be measured, such as the trade of a worker. Quantitative classification uses a measurable variable, such as wage classes. Temporal classification arranges data by time, such as year by year. Spatial classification arranges them by place, such as town by town.',
    }),
    sl('check', 'Quick check: which classification?', {
      b: 'Households grouped by units of electricity used each month. Which classification is this?',
      chk: 'm_classif_quant',
      n: 'Ask what the households are being grouped by. Is it an attribute, a measured quantity, a period of time or a place? Choose the matching kind of classification.',
    }),
    sl('example', 'Worked example 1: totals of a table', {
      b: 'An imagined district, Devgarh, has three blocks. Build the row and column totals of its crop table.',
      bl: [
        `Step 1 — Add each **row**: wheat ${CT[0].join(' + ')} = ${rowTot[0]}; rice ${CT[1].join(' + ')} = ${rowTot[1]}.`,
        `Step 2 — Add each **column**: North block ${CT.map((r) => r[0]).join(' + ')} = ${colTot[0]}.`,
        `Step 3 — The **grand total** from the row totals is ${rowTot.join(' + ')} = ${grand}.`,
        `Step 4 — Check: the column totals ${colTot.join(' + ')} also give **${grand}**.`,
      ],
      v: vTotals,
      n: `Add each row to get its total, for example the wheat row adds to ${rowTot[0]}. Add each column too, for example the first block adds to ${colTot[0]}. The row totals give a grand total of ${grand}. As a check, the column totals must give the same grand total. If they differ, there is an arithmetic slip somewhere.`,
    }),
    sl('concept', 'Bar diagrams: the rules', {
      b: 'In a **bar diagram** the bars have **equal width** and **equal gaps**, so only the **height** carries meaning.',
      v: vSimple,
      n: 'A simple bar diagram draws one bar for each item. The bars are equally wide and equally spaced, so the only thing that changes from bar to bar is the height, and the height shows the value. Here the bars show the total output of four crops in the imagined district. Bars start from a common zero line.',
    }),
    sl('concept', 'Multiple bar diagram', {
      b: 'A **multiple (grouped) bar diagram** puts two or more related bars **side by side** for each item.',
      v: vMulti,
      n: 'When we want to compare several related series, we use a multiple bar diagram. For each crop there are three bars, one for each block, standing side by side. We can compare the blocks within a crop, and the crops across the district. Different shades tell the series apart, and a key explains them.',
    }),
    sl('concept', 'Component bar diagram', {
      b: 'A **component (sub-divided) bar diagram** divides each bar into parts that show how the **total** is made up.',
      v: vComp,
      n: `Here each bar is the total output of one block, divided into crops. The North block totals ${colTot[0]} thousand tonnes, the Central block ${colTot[1]} and the South block ${colTot[2]}. The segments show how much of each total comes from wheat, rice, pulses and oilseeds. One bar shows the total and its make-up together.`,
    }),
    sl('concept', 'Percentage component bar diagram', {
      b: 'Make **every bar 100 per cent** so that the **shares** of unequal totals can be compared.',
      v: vPct,
      n: `In the percentage form every bar has the same height, standing for one hundred per cent of its block. The parts show shares. Rice makes up ${S(share[0][1])} per cent of the first block, ${S(share[1][1])} per cent of the second and ${S(share[2][1])} per cent of the third. The size of the totals no longer matters, only the make-up.`,
    }),
    sl('check', 'Quick check: percentage component bars', {
      b: 'How does a percentage component bar diagram differ from an ordinary component bar diagram?',
      chk: 'm_pct_comp',
      n: 'Remember what each bar stands for in the percentage form. Think about the height of the bars and what the parts of a bar show, then pick the option that describes that difference.',
    }),
    sl('example', 'Worked example 2: shares for a percentage bar', {
      b: 'Find the rice share of each block of the imagined Devgarh district.',
      bl: [
        `Step 1 — Block totals are ${colTot.join(', ')} thousand tonnes.`,
        `Step 2 — Rice output is ${CT[1].join(', ')} thousand tonnes.`,
        `Step 3 — Share = rice ÷ block total × 100, for the Central block ${CT[1][1]} ÷ ${colTot[1]} × 100 = ${S(share[1][1])} per cent.`,
        'Step 4 — Check that the four shares of each block add to **100**.',
      ],
      v: vPctWork,
      n: `Each share is a part divided by its own block total, times one hundred. For the Central block, rice is ${CT[1][1]} out of ${colTot[1]}, which is ${S(share[1][1])} per cent. Always check that the shares of one block add to one hundred. If they do not, recheck the block total.`,
    }),
    sl('concept', 'The pie diagram', {
      b: 'A **pie diagram** is a circle divided into **sectors** whose angles are **proportional** to the shares of the components.',
      bl: ['Angle of a sector = (value ÷ total) × 360°.', 'All the sector angles add up to **360°**.'],
      v: vPie,
      n: `A pie diagram is a circle cut into sectors. The angle of each sector is the value divided by the total, times three hundred and sixty degrees. In this imagined family budget of ${budTot} rupees, food gets ${S(budAng[0])} degrees. All the angles together always fill the whole circle of three hundred and sixty degrees.`,
    }),
    sl('example', 'Worked example 3: angles of a pie', {
      b: `The imagined Rao family spends ${inr(budTot)} a month. Find the sector angles.`,
      bl: [
        `Step 1 — Total = ${BUD.map((b) => b[1]).join(' + ')} = ${budTot}.`,
        `Step 2 — Food angle = ${BUD[0][1]} ÷ ${budTot} × 360 = ${S(budAng[0])}°.`,
        'Step 3 — Repeat for every component, as the table shows.',
        `Step 4 — Check: the angles add to **${S(sum(budAng))}°**.`,
      ],
      v: vAngles,
      n: `First find the total, which is ${budTot} rupees. Then each angle is the amount divided by the total, times three hundred and sixty. Food gives ${S(budAng[0])} degrees. Do the same for every component. Finally add the angles. They must come to three hundred and sixty. If not, a calculation has gone wrong.`,
    }),
    sl('check', 'Quick check: a sector angle', {
      b: `The imagined Sunrise Cafe spends ${inr(cafeTot)} a month, of which wages are ${inr(CAFE[1][1])}. Find the angle of the wages sector.`,
      chk: 'n_angle_cafe',
      n: 'Divide the amount spent on wages by the total monthly cost, then multiply by three hundred and sixty to change that share into an angle.',
    }),
    sl('diagram', 'Choosing a diagram', {
      v: vPick1,
      n: 'Match the diagram to the task. A simple bar shows the total of each item. A multiple bar compares related series side by side. A component bar shows totals and their parts. A percentage component bar compares the make-up of unequal totals. A pie suits a few parts of one total. With many small parts, a pie becomes crowded.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To recap. Data can be presented in words, in tables and in diagrams. A table has a number, title, captions, stubs, body, unit, source note and footnote. Data are classified as qualitative, quantitative, temporal or spatial. Bar diagrams have equal widths and gaps, and only the height matters. In a pie, each angle is the share of the total times three hundred and sixty degrees.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the **parts of a table** and say what each one shows.',
        'For a pie, write the formula first, then work out every angle, and **check that they add to 360°**.',
        'Say why bars need **equal width and equal gaps**.',
        'For a percentage bar, divide by the **bar\'s own total**.',
        'Always give a **title, labelled axes and units** to a diagram.',
      ],
      n: 'A few tips. When asked about a table, name its parts and say what each does. For a pie, write the formula, compute each angle, and check that they add to three hundred and sixty. Explain that bars have equal width and gaps so that only height matters. In a percentage bar, divide by that bar’s own total. And always give a title, labelled axes and units.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Presentation of Data — Part 2: Histogram, Polygon, Ogives and Line Graphs',
  goals: [
    'Draw a histogram, including the adjustment of heights for unequal class widths',
    'Draw a frequency polygon and a frequency curve from a histogram',
    'Construct less than and more than ogives and read the median where they cross',
    'Draw and read an arithmetic line graph of a time series',
  ],
  slides: [
    sl('title', 'Frequency Diagrams and Line Graphs', {
      b: 'Part 2 — **picturing** a frequency distribution, and **time** series.',
      v: vRoute2,
      n: 'In this part we draw pictures of a frequency distribution. We start with the histogram, add the frequency polygon and curve, then build ogives that give the median without any formula. We finish with the arithmetic line graph, which shows how a quantity changes over time. All the figures come from imagined data.',
    }),
    sl('concept', 'Histogram or bar diagram?', {
      b: 'A **histogram** is a set of **adjacent rectangles** for a **continuous** series: no gaps, and **area** proportional to frequency.',
      v: vHistBar,
      n: 'A histogram is drawn for a continuous series, where one class ends exactly where the next begins. So the rectangles touch, with no gaps. In a histogram the width means something, because it is the class width, and the area of each rectangle is proportional to its frequency. A bar diagram has none of these features.',
    }),
    sl('diagram', 'A histogram and its frequency polygon', {
      v: vHistPoly,
      n: `This is the daily output of an imagined factory, the Anand Bolt Works, over ${factN} days. The classes are of equal width, so each rectangle's height is simply its frequency. The tallest rectangle is for ${FACT[3][0]} to ${FACT[3][1]} crates, with ${FACT[3][2]} days. The red line is the frequency polygon, and it is explained in a moment.`,
    }),
    sl('example', 'Worked example 1: unequal classes', {
      b: 'The wages of 100 labourers at an imagined brick kiln are grouped in classes of unequal width. Find the heights of the rectangles.',
      bl: [
        `Step 1 — Class widths are ${unW.join(', ')}; the standard width is the lowest, **${unStd}**.`,
        `Step 2 — Adjusted frequency = frequency ÷ class width × ${unStd}.`,
        `Step 3 — For 500 to 700: ${UN[2][2]} ÷ ${unW[2]} × ${unStd} = **${unAdj[2]}**.`,
        `Step 4 — For 700 to 1100: ${UN[3][2]} ÷ ${unW[3]} × ${unStd} = **${unAdj[3]}**.`,
      ],
      v: vAdj,
      n: `When class widths differ, the heights must be adjusted so that area stays proportional to frequency. Take the lowest width, ${unStd}, as the standard. Divide each frequency by its class width and multiply by the standard. The class from five hundred to seven hundred gets a height of ${unAdj[2]}, and the last class gets ${unAdj[3]}.`,
    }),
    sl('diagram', 'Histogram with unequal classes', {
      v: vUneq,
      n: `The solid rectangles use the adjusted heights, so their areas match the frequencies. The dashed outlines show what would happen if we used raw frequencies. The wide classes would tower over the others and suggest far more labourers than there are. The adjusted heights remove this false impression.`,
    }),
    sl('check', 'Quick check: heights for unequal widths', {
      b: 'A class is twice as wide as the lowest class. What must its rectangle height be?',
      chk: 'm_hist_unequal',
      n: 'Remember that the area of a rectangle, not its height alone, stands for frequency. A wider class needs a smaller height for the same frequency. Choose the option that gives that adjustment.',
    }),
    sl('concept', 'The frequency polygon', {
      b: 'Plot **class marks** against **frequencies** and join the points with **straight lines**; this is the same as joining the **mid-points of the tops** of the rectangles.',
      v: vMarks,
      n: 'To draw a frequency polygon, plot each class mark against its frequency and join the points with straight lines. This is the same as joining the mid-points of the tops of the rectangles. To close the figure, add an imaginary class with zero frequency at each end, and bring the line down to the axis at their class marks.',
    }),
    sl('concept', 'The frequency curve', {
      b: 'A **frequency curve** is a **smooth** curve drawn through the points of the polygon.',
      v: vCurve,
      n: 'If the straight lines of the polygon are replaced by a smooth curve through the same points, we get a frequency curve. The dashed line here is the polygon, and the red curve is drawn smoothly through its points. The curve shows the general shape of the distribution without the sharp corners.',
    }),
    sl('check', 'Quick check: cumulative frequency', {
      b: 'Read the table of waiting times in the question. How many patients waited less than 15 minutes?',
      chk: 'n_cum_clinic',
      n: 'A less than cumulative frequency adds up all the classes that lie below the limit. Add the frequencies of the classes below fifteen minutes, starting from the first class.',
    }),
    sl('concept', 'Ogives: cumulative frequency curves', {
      b: 'A **less than ogive** plots cumulative frequencies against **upper limits**; a **more than ogive** plots them against **lower limits**.',
      v: vCum,
      n: `An ogive is a cumulative frequency curve. For the less than ogive we add frequencies from the top of the table and plot each total against the upper limit of its class. For the more than ogive we plot against lower limits, where each value counts all items at or above that limit. Here the less than values end at ${factCum[6]}.`,
    }),
    sl('diagram', 'The two ogives and the median', {
      v: vOgives,
      n: `Draw both ogives on one graph. The less than curve rises, and the more than curve falls. They cross at a height of ${factN / 2}, which is half of the ${factN} days, and the value across from that point is ${S(factMed.median)} crates. This is the median, because half the days lie below it and half above.`,
    }),
    sl('example', 'Worked example 2: the median from the ogives', {
      b: 'Check the reading from the ogives against the formula for the imagined Anand Bolt Works.',
      bl: [
        `Step 1 — Half the total: ${factN} ÷ 2 = **${factN / 2}**.`,
        `Step 2 — Median class: ${factMed.L} to ${factMed.L + factMed.h}, with cf before it ${factMed.cf} and frequency ${factMed.f}.`,
        `Step 3 — Median = ${factMed.L} + (${factN / 2} − ${factMed.cf}) ÷ ${factMed.f} × ${factMed.h} = **${S(factMed.median)}**.`,
        `Step 4 — Both ogives read ${S(factLessAtMed)} at this value, as expected.`,
      ],
      v: vMedianWork,
      n: `First take half the total, which is ${factN / 2}. The median class is the first class whose cumulative frequency reaches that figure. Apply the formula to get ${S(factMed.median)} crates. Then read both ogives at that value, and each gives ${S(factLessAtMed)}. So the intersection of the ogives and the formula agree.`,
    }),
    sl('check', 'Quick check: draw an ogive', {
      b: 'Put the steps of drawing a less than ogive in order.',
      chk: 'ord_ogive',
      n: 'Think about what must exist before each step. You cannot plot cumulative frequencies before you have found them, and you cannot find them without the table of frequencies.',
    }),
    sl('concept', 'The arithmetic line graph', {
      b: 'A **time series graph** has **time** on the horizontal axis and the **variable** on the vertical axis; points are joined in time order.',
      v: vLine,
      n: `An arithmetic line graph shows how a quantity changes with time. Time goes along the horizontal axis and the variable goes up the vertical axis. Here are the yearly sales of an imagined firm, Kaveri Looms, over eight years. Join the points in the order of time, and the rises and falls of the line show the trend.`,
    }),
    sl('example', 'Worked example 3: reading a line graph', {
      b: 'Read the imagined Kaveri Looms graph in figures.',
      bl: [
        `Step 1 — Rise over seven years: ${SALES[7]} − ${SALES[0]} = **${SALES[7] - SALES[0]}** lakh.`,
        `Step 2 — Percentage growth: ${SALES[7] - SALES[0]} ÷ ${SALES[0]} × 100 = **${S(salesGrowth)}%**.`,
        `Step 3 — Years of fall: ${YEARS.filter((y, i) => i && salesChg[i - 1] < 0).join(' and ')}.`,
        `Step 4 — Largest yearly rise: **${Math.max(...salesChg)}** lakh, in ${YEARS[1 + salesChg.indexOf(Math.max(...salesChg))]}.`,
      ],
      v: vChanges,
      n: `From the graph, sales rose by ${SALES[7] - SALES[0]} lakh rupees over seven years, which is a growth of ${S(salesGrowth)} per cent. The line sloped downward in two years, when sales fell. The largest rise in a single year was ${Math.max(...salesChg)} lakh. Reading changes year by year is the heart of a time series graph.`,
    }),
    sl('check', 'Quick check: the axes', {
      b: 'Which arrangement of axes is used in a time series graph?',
      chk: 'm_ts_axes',
      n: 'Think about which quantity changes along the line. Time is the quantity that moves forward, and the variable being measured changes with it. Decide which goes on which axis.',
    }),
    sl('diagram', 'Choosing a frequency diagram', {
      v: vPick2,
      n: 'Pick the diagram that fits the task. A histogram, with a polygon if wanted, shows a distribution in classes. A less than ogive answers how many items lie below a limit. Two ogives together give the median. A line graph shows how a quantity moves over time.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To recap. A histogram has touching rectangles and its area carries the frequency. With unequal classes the heights are adjusted frequencies. A frequency polygon joins class marks and frequencies, and is closed with imaginary classes. A frequency curve is a smooth version. Less than and more than ogives cross at the median. A line graph puts time on the horizontal axis.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For unequal classes, **adjust the heights** and show the working.',
        'Close the polygon with **two imaginary classes of zero frequency**.',
        'Plot a **less than** ogive against **upper limits** and a **more than** ogive against **lower limits**.',
        'Mark the **intersection** and drop a dotted line to read the median.',
        'Label **both axes**, give the **unit** and write a **title** for every graph.',
      ],
      n: 'Some tips. For unequal classes, adjust the heights and show the working. Close the polygon with two imaginary classes of zero frequency. Plot less than ogives against upper limits and more than ogives against lower limits. Mark the crossing point and drop a dotted line to read the median. Label both axes, state the unit, and give every graph a title.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Presentation of Data — Notes',
  sections: [
    {
      h: '1. Forms of presentation and the table',
      t: 1,
      b: `Collected data can be presented in three forms: **textual** (in sentences), **tabular** (in rows and columns) and **diagrammatic** (in pictures and graphs). A few figures can be written in words; many figures are best put in a table; a pattern is best shown in a diagram.\n\nA good table has eight parts. The **table number** and **title** identify it; the **unit of measurement** says how the figures are expressed; **captions** head the columns and **stubs** head the rows; the **body** holds the figures; the **source note** says where they came from; a **footnote** explains an entry or exception.\n\nWorked case (imagined district of Devgarh, thousand tonnes): the row totals are ${rowTot.join(', ')}, the column totals are ${colTot.join(', ')} and the grand total is ${grand} both ways.`,
      terms: [
        ['Tabulation', 'The arrangement of data in rows and columns.'],
        ['Caption', 'The heading of a column of a table.'],
        ['Stub', 'The heading of a row of a table.'],
        ['Body', 'The part of a table that holds the figures.'],
        ['Source note', 'A line below a table saying where its figures were obtained.'],
        ['Footnote', 'A note below a table that explains a particular entry or exception.'],
      ],
      v: vTableParts,
      vs: [vForms, vTotals],
    },
    {
      h: '2. Classification of tabulated data',
      t: 1,
      b: `Tabulated data are classified in four ways. **Qualitative** classification groups items by an attribute that cannot be measured in numbers (trade, gender). **Quantitative** classification groups them by a measurable variable, usually in class intervals (wage classes). **Temporal** classification arranges data by time (year by year). **Spatial** classification arranges them by place (town by town). One table can use more than one: a table of output by year and by town is both temporal and spatial.`,
      terms: [
        ['Qualitative classification', 'Grouping by an attribute that cannot be measured numerically.'],
        ['Quantitative classification', 'Grouping by the size of a measurable variable.'],
        ['Temporal classification', 'Grouping by time periods.'],
        ['Spatial classification', 'Grouping by places or regions.'],
      ],
      v: vClassif,
    },
    {
      h: '3. Bar diagrams',
      t: 2,
      b: `In a **bar diagram** the bars have **equal width** and **equal gaps** and start from a common zero line, so only the **height** carries meaning. A **simple bar diagram** shows one series. A **multiple (grouped) bar diagram** shows two or more related series side by side. A **component (sub-divided) bar diagram** divides each bar into parts that make up its total. In the **percentage component bar diagram** every bar is 100 per cent, so the shares of unequal totals can be compared.\n\nImagined Devgarh: block totals ${colTot.join(', ')}; rice share = rice ÷ block total × 100, which is ${BLOCKS.map((b, j) => `${S(share[j][1])}%`).join(', ')} for the three blocks.`,
      terms: [
        ['Simple bar diagram', 'A diagram with one bar for each item of a single series.'],
        ['Multiple bar diagram', 'A diagram with grouped bars, one for each of several related series.'],
        ['Component bar diagram', 'A diagram whose bars are divided into the parts of each total.'],
        ['Percentage component bar diagram', 'A component bar diagram in which every bar stands for 100 per cent.'],
      ],
      v: vSimple,
      vs: [vMulti, vComp, vPct],
    },
    {
      h: '4. Pie diagrams',
      t: 2,
      b: `A **pie diagram** is a circle divided into sectors whose angles are proportional to the shares of the components.\n\n**Angle of a sector = (value of the component ÷ total) × 360°.** The angles add up to **360°**. In the imagined Rao family budget of ${inr(budTot)} the angles are ${BUD.map((b, i) => `${b[0].toLowerCase()} ${S(budAng[i])}°`).join(', ')}, and their sum is ${S(sum(budAng))}°.\n\nA pie suits a few components of one total. With many small sectors, or when two totals are to be compared, a bar diagram is easier to read.`,
      terms: [
        ['Pie diagram', 'A circle divided into sectors with angles proportional to the shares of the components.'],
        ['Sector', 'The part of a circle between two radii.'],
      ],
      v: vPie,
      vs: [vAngles],
    },
    {
      h: '5. Histogram, frequency polygon and frequency curve',
      t: 3,
      b: `A **histogram** shows a continuous frequency distribution as **adjacent rectangles with no gaps**; the **area** of each rectangle is proportional to its frequency. If the classes have equal widths the heights are the frequencies. If the widths are unequal use the **adjusted frequency = (frequency ÷ class width) × standard width**, taking the lowest width as the standard: for the imagined Kishan Brick Kiln the adjusted frequencies are ${unAdj.join(', ')}.\n\nA **frequency polygon** is drawn by plotting **class marks against frequencies** and joining them with straight lines (the mid-points of the tops of the rectangles), closed at both ends at the class marks of an imaginary class of zero frequency. A **frequency curve** is a smooth curve through the same points.`,
      terms: [
        ['Histogram', 'A diagram of adjacent rectangles whose areas are proportional to the frequencies of a continuous series.'],
        ['Adjusted frequency', 'The frequency of a class divided by its width and multiplied by a standard width.'],
        ['Frequency polygon', 'A figure obtained by joining the points of class marks and frequencies by straight lines.'],
        ['Frequency curve', 'A smooth curve drawn through the points of a frequency polygon.'],
      ],
      v: vHistPoly,
      vs: [vUneq, vCurve, vAdj],
    },
    {
      h: '6. Ogives',
      t: 3,
      b: `An **ogive** is a cumulative frequency curve. The **less than ogive** plots less than cumulative frequencies against the **upper limits**; the **more than ogive** plots more than cumulative frequencies against the **lower limits**. The two curves cross at the **median**: for the imagined Anand Bolt Works (${factN} days) they meet at a cumulative frequency of ${factN / 2} and a daily output of ${S(factMed.median)} crates, which is the same as the formula L + ((N/2 − cf) ÷ f) × h.`,
      terms: [
        ['Ogive', 'A curve of cumulative frequencies plotted against class limits.'],
        ['Less than ogive', 'An ogive of less than cumulative frequencies, plotted against upper limits.'],
        ['More than ogive', 'An ogive of more than cumulative frequencies, plotted against lower limits.'],
      ],
      v: vOgives,
      vs: [vCum, vMedianWork],
    },
    {
      h: '7. Arithmetic line graph',
      t: 3,
      b: `An **arithmetic line graph** (time series graph) puts **time on the horizontal axis** and the variable on the vertical axis; the points are joined in time order. For the imagined Kaveri Looms the sales rose from ${SALES[0]} to ${SALES[7]} lakh rupees in seven years, a growth of ${S(salesGrowth)} per cent, with falls in two years.`,
      terms: [
        ['Time series', 'Values of a variable recorded at successive points or periods of time.'],
        ['Arithmetic line graph', 'A graph of a time series with equal spacing for equal time periods and an ordinary scale on both axes.'],
      ],
      v: vLine,
      vs: [vChanges],
    },
  ],
  tips: `- Name the **parts of a table** and give the job of each.\n- For a pie, show **value ÷ total × 360°** for each component and check that the angles add to **360°**.\n- Draw bars of **equal width and equal gaps**.\n- For unequal classes, show the **adjusted frequency** working before drawing a histogram.\n- Close a polygon with imaginary classes; plot a less than ogive against **upper limits**, a more than ogive against **lower limits**; the ogives cross at the **median**.\n- Give every diagram a **title, labelled axes and units**.`,
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three **forms of presentation**', 'Textual, tabular and diagrammatic.', 'fact', 1],
  ['**Textual presentation**: when suitable?', 'When only a few figures are to be presented and some explanation is useful.', 'concept', 1],
  ['**Caption** of a table', 'The heading of a column.', 'definition', 1],
  ['**Stub** of a table', 'The heading of a row.', 'definition', 1],
  ['**Body** of a table', 'The part that holds the figures.', 'definition', 1],
  ['**Title** of a table', 'A short statement of what the data are, where and when they apply.', 'definition', 1],
  ['**Unit of measurement**', 'The unit in which the figures of a table are expressed, such as thousand tonnes.', 'definition', 1],
  ['**Source note**', 'A line below a table saying where the figures were obtained.', 'definition', 1],
  ['**Footnote**', 'A note that explains a particular entry or exception in a table.', 'definition', 1],
  ['**Qualitative classification**', 'Grouping by an attribute that cannot be measured numerically.', 'definition', 1],
  ['**Quantitative classification**', 'Grouping by the size of a measurable variable.', 'definition', 1],
  ['**Temporal** and **spatial** classification', 'By time periods, and by places.', 'concept', 1],
  ['Rule for the **bars** of a bar diagram', 'Equal width and equal gaps; only height carries meaning.', 'concept', 2],
  ['**Multiple bar diagram**', 'Grouped bars that compare two or more related series for each item.', 'definition', 2],
  ['**Component bar diagram**', 'Each bar is divided into the parts that make up its total.', 'definition', 2],
  ['**Percentage component bar diagram**', 'Every bar stands for 100 per cent, so the make-up of unequal totals can be compared.', 'definition', 2],
  ['**Pie diagram**', 'A circle divided into sectors with angles proportional to the shares of the components.', 'definition', 2],
  ['Angle of a pie **sector**', '(Value of the component ÷ total) × 360°.', 'formula', 2],
  ['Sum of the sector angles', 'Always 360°.', 'fact', 2],
  ['**Histogram**', 'Adjacent rectangles for a continuous series with no gaps; area is proportional to frequency.', 'definition', 3],
  ['**Adjusted frequency**', '(Frequency ÷ class width) × the lowest, or a standard, width.', 'formula', 3],
  ['**Frequency polygon**', 'Class marks plotted against frequencies and joined by straight lines.', 'definition', 3],
  ['Closing a frequency polygon', 'Extend to the class marks of an imaginary class of zero frequency at each end.', 'concept', 3],
  ['**Frequency curve**', 'A smooth curve drawn through the points of the polygon.', 'definition', 3],
  ['**Less than ogive**', 'Less than cumulative frequencies plotted against upper limits.', 'definition', 3],
  ['**More than ogive**', 'More than cumulative frequencies plotted against lower limits.', 'definition', 3],
  ['Where the two ogives intersect', 'At the median of the series.', 'fact', 3],
  ['**Arithmetic line graph**', 'A time series graph with time on the horizontal axis and the variable on the vertical axis.', 'definition', 3],
  ['Percentage growth between two years', '(Later value − earlier value) ÷ earlier value × 100.', 'formula', 3],
  ['Pie diagram: a limitation', 'Many small sectors are hard to read and compare.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Presentation of Data',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_title', 'm_bar_equal', 'm_ogive_cross', 'ar_pct_comp'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_caption_stub', 's2_bar_rules', 's3_table_parts'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_bars', 'l_hist_poly'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_budget'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Presentation of Data',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_classif_temporal', 'm_classif_spatial', 'm_source', 'm_multi_when', 'm_component', 'm_hist_gaps', 'm_polygon_join', 'm_ogive_less', 'ar_ogive_median', 'ar_ts_line'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_forms', 's2_classif', { attempt: 1, keys: ['s2_multi_comp', 's2_polygon_close'] }, 's3_bar_pie', { attempt: 1, keys: ['s3_adjusted', 's3_ts'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_table', { attempt: 1, keys: ['l_ogive', 'l_forms'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_sales', 'cb_clinic'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-11-economics-ch04 only (tabular presentation; bar and pie diagrams; histogram, polygon, curve, ogives and arithmetic line graph)',
    originality: 'every district, family, factory, clinic, firm and passage is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all totals, shares, pie angles, adjusted frequencies, cumulative frequencies, medians and growth rates computed with stats.mjs or plain code from imagined data and asserted with check(); every SVG is drawn from the same data',
    facts: 'only stable statistical conventions are stated: parts of a table, four classifications, equal width and gaps for bars, angle = value over total times 360, adjusted frequency, polygon closed with imaginary classes, ogives cross at the median',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
