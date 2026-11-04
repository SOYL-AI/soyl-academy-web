// Build CBSE 11 Economics ch05 Measures of Central Tendency. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, mean, median, mode } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch05', 'economics-commerce');
const Qs = await import('./questions.mjs');
const {
  S, RAIN, rainMean, rainDev, rainPos, rainNeg, RAIN_A, rainD, rainMed, RAIN_X,
  INC, incMean, incMed, incMean6,
  SHOE_X, SHOE_F, shoeN, shoeMean, shoeFX, shoeMed, shoeMode, SHOE_HR, shoeHrMode,
  WAGE, wN, wM, wFM, wMean, wA, wH, wAs, wSt, wCum, wMore, wMed, wMode, wGraph,
  QZ_X, QZ_F, qzMean, STALL, STALL_X, NG, ngMean, ngMed, ngMode,
  WT_N, WT_W, MEERA, meeraW, meeraS, BAS_N, BAS_R, BAS_W, basW,
} = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const J = (a) => a.join(', ');

// ---------------------------------------------------------------- figures (computed, never typed)
check(sum(RAIN), 110, 0, 'Dhunmarg total rainfall');
check(wN, 50, 0, 'Tarapur workers');
check(wMed.cf, 12, 0, 'Tarapur cf before the median class');
check(wMed.N / 2, 25, 0, 'Tarapur N over 2');
check(sum(WT_W), 10, 0, 'subject weights');
check(sum(MEERA.map((x, i) => x * WT_W[i])), 700, 0, 'Meera weighted total');
const wCls = (c) => `${c[0]} to ${c[1]}`;
const ord2 = (a) => [...a].sort((x, y) => x - y);

// ---------------------------------------------------------------- SVG: mean as a balance point
const vBalance = (() => {
  const s = new Svg(640, 250);
  const X = (v) => 50 + v * 25.5;
  const y0 = 128;
  s.arrow(40, y0, 620, y0, { sw: 1.8 });
  [0, 5, 10, 15, 20].forEach((v) => { s.line(X(v), y0, X(v), y0 + 6, { sw: 1.2 }); s.text(X(v), y0 + 18, String(v), { size: 12, muted: true }); });
  s.text(610, y0 + 38, 'Rainfall (mm)', { anchor: 'end', size: 13 });
  RAIN.forEach((v, i) => {
    s.dot(X(v), y0 - 14, 6, rainDev[i] < 0 ? 'red' : rainDev[i] > 0 ? 'blue' : 'green');
    s.text(X(v), y0 - 32, String(v), { size: 12 });
    s.text(X(v), y0 - 50, (rainDev[i] > 0 ? '+' : '') + S(rainDev[i]), { size: 11, color: rainDev[i] < 0 ? 'red' : rainDev[i] > 0 ? 'blue' : 'green', bold: true });
  });
  s.text(40, 36, 'Deviation of each day from the mean', { anchor: 'start', size: 12, muted: true });
  s.polygon([[X(rainMean), y0 + 2], [X(rainMean) - 15, y0 + 34], [X(rainMean) + 15, y0 + 34]], { fill: 'accent', fillOpacity: 0.5, color: 'accent', sw: 2 });
  s.text(X(rainMean), y0 + 50, `Mean ${S(rainMean)}`, { size: 13, bold: true, color: 'accent' });
  s.text(320, 206, `Below the mean: ${J(rainDev.filter((d) => d < 0).map(S))} adds to ${S(rainNeg)}`, { size: 13 });
  s.text(320, 228, `Above the mean: ${rainDev.filter((d) => d > 0).map((d) => '+' + S(d)).join(' ')} adds to +${S(rainPos)}`, { size: 13 });
  return s.visual(`Balance diagram of the imagined Dhunmarg hill station: ten daily rainfall values ${J(RAIN)} millimetres on a line, balanced on the mean ${S(rainMean)}; deviations below the mean add to ${S(rainNeg)} and above the mean to ${S(rainPos)}, so they cancel`, 'Imagined Dhunmarg rainfall: the mean is the balance point, and deviations on the two sides cancel');
})();

// ---------------------------------------------------------------- SVG: ogives meet at the median
const AX_BREAK = [[76, 280], [80, 273], [86, 287], [90, 280]];
const vOgives = (() => {
  const s = new Svg(640, 350);
  const ch = s.chart({ x0: 500, x1: 1100, y0: 0, y1: 50, left: 70, top: 40, width: 540, height: 240, xLabel: 'Weekly wage (rupees)', yLabel: 'Cumulative frequency (workers)' });
  s.polyline(AX_BREAK, { sw: 1.6 });
  for (let x = 500; x <= 1100; x += 100) ch.xTick(x, String(x));
  [0, 10, 20, 30, 40, 50].forEach((v) => ch.yTick(v, String(v)));
  const less = [[WAGE[0][0], 0], ...WAGE.map((c, i) => [c[1], wCum[i]])];
  const more = [...WAGE.map((c, i) => [c[0], wMore[i]]), [WAGE[WAGE.length - 1][1], 0]];
  s.polyline(less.map(([x, y]) => [ch.X(x), ch.Y(y)]), { color: 'accent', sw: 2.4 });
  s.polyline(more.map(([x, y]) => [ch.X(x), ch.Y(y)]), { color: 'red', sw: 2.4 });
  less.forEach(([x, y]) => s.dot(ch.X(x), ch.Y(y), 3.5, 'accent'));
  more.forEach(([x, y]) => s.dot(ch.X(x), ch.Y(y), 3.5, 'red'));
  const m = wMed.median, h = wN / 2;
  ch.drop([m, h], { color: 'muted' });
  s.dot(ch.X(m), ch.Y(h), 6, 'brown');
  s.text(ch.X(m), ch.Y(0) + 34, `Median ${S(m)}`, { size: 13, bold: true });
  s.text(ch.X(1000), ch.Y(30), 'Less than ogive', { size: 13, color: 'accent', bold: true });
  s.text(ch.X(620), ch.Y(25), 'More than ogive', { size: 13, color: 'red', bold: true });
  return s.visual(`Less than and more than ogives of the weekly wages of the ${wN} workers of the imagined Tarapur Cable Works; they cross at a cumulative frequency of ${h}, at a wage of Rs ${S(m)}, which is the median`, 'Imagined Tarapur Cable Works: the two ogives cross at half the workers, at the median');
})();

// ---------------------------------------------------------------- SVG: mode on the histogram
const vModeHist = (() => {
  const s = new Svg(640, 350);
  const ch = s.chart({ x0: 500, x1: 1100, y0: 0, y1: 16, left: 70, top: 40, width: 540, height: 240, xLabel: 'Weekly wage (rupees)', yLabel: 'Number of workers' });
  s.polyline(AX_BREAK, { sw: 1.6 });
  for (let x = 500; x <= 1100; x += 100) ch.xTick(x, String(x));
  [0, 4, 8, 12, 16].forEach((v) => ch.yTick(v, String(v)));
  WAGE.forEach((c, i) => {
    const modal = i === wMode.cls;
    s.rect(ch.X(c[0]), ch.Y(c[2]), ch.X(c[1]) - ch.X(c[0]), ch.Y(0) - ch.Y(c[2]), { rx: 0, fill: modal ? 'accent' : 'blue', fillOpacity: modal ? 0.35 : 0.2, color: modal ? 'accent' : 'blue', sw: 1.6 });
    s.text(ch.X((c[0] + c[1]) / 2), ch.Y(0) - 12, String(c[2]), { size: 12 });
  });
  const g = wGraph;
  ch.seg([g.L, g.f0], [g.U, g.f1], { color: 'red', sw: 2.2 });
  ch.seg([g.L, g.f1], [g.U, g.f2], { color: 'red', sw: 2.2 });
  ch.drop([g.x, g.y], { color: 'muted' });
  s.dot(ch.X(g.x), ch.Y(g.y), 6, 'brown');
  s.text(ch.X(g.x), ch.Y(0) + 34, `Mode ${S(g.x)}`, { size: 13, bold: true });
  return s.visual(`Histogram of the weekly wages of the ${wN} workers of the imagined Tarapur Cable Works with frequencies ${J(WAGE.map((c) => c[2]))}; two lines from the corners of the modal bar (${wCls(WAGE[wMode.cls])}) to the corners of its neighbours cross above Rs ${S(g.x)}, the mode`, 'Imagined Tarapur Cable Works: the lines from the modal bar meet above the mode');
})();

// ---------------------------------------------------------------- SVG: choose the average
const vChoose = (() => {
  const s = new Svg(700, 275);
  const box = (x, y, w, h, o) => s.rect(x, y, w, h, { rx: 10, fill: 'fill', color: 'accent', sw: 1.6, ...o });
  box(190, 8, 320, 44, {});
  s.text(350, 30, 'What do you need from the data?', { size: 14, bold: true });
  const cx = [115, 350, 585];
  cx.forEach((x) => s.arrow(350, 52, x, 108, { sw: 1.6 }));
  const cards3 = [
    ['Median', ['A typical value when a few', 'values are extreme', `Hamlet incomes: mean ${S(incMean)},`, `median ${S(incMed)} thousand`]],
    ['Mode', ['The most common item', 'Which shoe size sells most?', `Size ${shoeMode} in the Step-Up`, 'shop sales']],
    ['Arithmetic mean', ['Every value should count', 'Balanced data, no extremes', `Quiz marks of ${sum(QZ_F)} pupils:`, `mean ${S(qzMean)}`]],
  ];
  cards3.forEach(([title, lines], k) => {
    const x = cx[k] - 105;
    box(x, 110, 210, 150, {});
    s.text(cx[k], 130, title, { size: 15, bold: true });
    lines.forEach((l, i) => s.text(cx[k], 160 + i * 20 + (i > 1 ? 6 : 0), l, { size: 12, muted: i > 1 }));
  });
  return s.visual(`Flow chart for choosing an average: use the median when a few values are extreme (imagined hamlet incomes, mean ${S(incMean)}, median ${S(incMed)} thousand rupees), the mode for the most common item (shoe size ${shoeMode} sells most), and the arithmetic mean when every value should count (quiz marks, mean ${S(qzMean)})`, 'Choosing among the mean, the median and the mode');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What an average is', 'Mean of individual and discrete series', 'Mean of continuous series', 'Weighted mean', 'Properties, merits, demerits'], 'Route map of Part 1: what an average is, the mean of individual and discrete series, the mean of a continuous series, the weighted mean, and the properties, merits and demerits of the mean', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Median of individual and discrete series', 'Median of continuous series', 'Mode', 'Mode on a histogram', 'Choosing the average'], 'Route map of Part 2: median of individual and discrete series, median of a continuous series, the mode, the mode on a histogram and choosing the average', 'Part 2 at a glance');
const tAvg3 = table(
  ['Average', 'What it is', 'How it is found'],
  [
    ['Arithmetic mean', 'Sum of the values over their number', 'Add up and divide'],
    ['Median', 'Middle value of the arranged series', 'Arrange, then locate the middle item'],
    ['Mode', 'Most frequent value', 'Find the value with the highest frequency'],
  ],
  'Table of the three common averages, the arithmetic mean, the median and the mode, with what each is and how it is found',
);
const tRain = table(
  ['Day', ...RAIN.map((_, i) => String(i + 1)), 'Total'],
  [
    ['Rainfall X (mm)', ...RAIN.map(String), `**${sum(RAIN)}**`],
    [`d = X − ${RAIN_A}`, ...rainD.map(String), `**${sum(rainD)}**`],
  ],
  `Table of the daily rainfall of the imagined Dhunmarg hill station over ten days, ${J(RAIN)} millimetres with total ${sum(RAIN)}, and the deviations from an assumed mean of ${RAIN_A}, ${J(rainD)} with total ${sum(rainD)}`,
  'Imagined Dhunmarg hill station, millimetres.',
);
const tRainWork = table(
  ['Method', 'Working', 'Mean'],
  [
    ['Direct', `ΣX ÷ N = ${sum(RAIN)} ÷ ${RAIN.length}`, `**${S(rainMean)}**`],
    ['Assumed mean', `A + Σd ÷ N = ${RAIN_A} + ${sum(rainD)} ÷ ${RAIN.length}`, `**${S(RAIN_A + sum(rainD) / RAIN.length)}**`],
  ],
  `Table of the mean rainfall of the imagined Dhunmarg hill station by the direct method and by the assumed-mean method, both ${S(rainMean)} millimetres`,
  'Both methods give the same mean.',
);
const tForms = table(
  ['Series', 'Direct method', 'Assumed-mean method', 'Step-deviation method'],
  [
    ['Individual', 'ΣX ÷ N', 'A + Σd ÷ N', 'Not usually needed'],
    ['Discrete', 'ΣfX ÷ Σf', 'A + Σfd ÷ Σf', 'A + (Σfd′ ÷ Σf) × h'],
    ['Continuous', 'Σfm ÷ Σf', 'A + Σfd ÷ Σf', 'A + (Σfd′ ÷ Σf) × h'],
  ],
  'Table of the formulae for the arithmetic mean of individual, discrete and continuous series by the direct, assumed-mean and step-deviation methods',
);
const tShoe = table(
  ['Size X', 'Pairs f', 'fX'],
  [...SHOE_X.map((x, i) => [String(x), String(SHOE_F[i]), String(shoeFX[i])]), ['Total', `**${shoeN}**`, `**${sum(shoeFX)}**`]],
  `Table of the shoe sizes ${J(SHOE_X)} and the pairs sold ${J(SHOE_F)} at the imagined Step-Up Footwear, with products fX totalling ${sum(shoeFX)} and ${shoeN} pairs`,
  'Imagined Step-Up Footwear, one week.',
);
const tWageDirect = table(
  ['Class (Rs)', 'Workers f', 'Class mark m', 'fm'],
  [...WAGE.map((c, i) => [wCls(c), String(c[2]), String(wM[i]), String(wFM[i])]), ['Total', `**${wN}**`, '', `**${sum(wFM)}**`]],
  `Table of the weekly wages of ${wN} workers of the imagined Tarapur Cable Works in six classes with class marks ${J(wM)} and fm totalling ${sum(wFM)}`,
  'Imagined Tarapur Cable Works.',
);
const tWageAssumed = table(
  ['Class mark m', 'f', `d = m − ${wA}`, 'fd', `d′ = d ÷ ${wH}`, 'fd′'],
  [...WAGE.map((c, i) => [String(wM[i]), String(c[2]), String(wAs.d[i]), String(wAs.fd[i]), String(wSt.d[i]), String(wSt.fd[i])]), ['Total', `**${wN}**`, '', `**${wAs.sumFd}**`, '', `**${wSt.sumFd}**`]],
  `Table of deviations for the Tarapur wages with an assumed mean of ${wA}: Σfd is ${wAs.sumFd} and, with d′ = d ÷ ${wH}, Σfd′ is ${wSt.sumFd}`,
  'Assumed mean 850, class width 100.',
);
const tAgree = table(
  ['Method', 'Working', 'Mean (Rs)'],
  [
    ['Direct', `Σfm ÷ Σf = ${sum(wFM)} ÷ ${wN}`, `**${S(wMean)}**`],
    ['Assumed mean', `${wA} + (${wAs.sumFd}) ÷ ${wN}`, `**${S(wAs.mean)}**`],
    ['Step deviation', `${wA} + (${wSt.sumFd} ÷ ${wN}) × ${wH}`, `**${S(wSt.mean)}**`],
  ],
  `Table showing that the direct, assumed-mean and step-deviation methods all give a mean weekly wage of Rs ${S(wMean)} for the imagined Tarapur Cable Works`,
  'Three methods, one answer.',
);
const tWtdDef = table(
  ['Item', 'Simple mean', 'Weighted mean'],
  [
    ['Formula', 'ΣX ÷ N', 'ΣWX ÷ ΣW'],
    ['Treats every item as', 'Equally important', 'Important in proportion to its weight'],
    ['Suits', 'Items of equal importance', 'Subjects with different marks, items in a household basket'],
  ],
  'Table comparing the simple arithmetic mean with the weighted arithmetic mean on formula, how items are treated and when each suits',
);
const tWtd = table(
  ['Subject', 'Weight W', 'Marks X', 'WX'],
  [...WT_N.map((n, i) => [n, String(WT_W[i]), String(MEERA[i]), String(MEERA[i] * WT_W[i])]), ['Total', `**${sum(WT_W)}**`, '', `**${sum(MEERA.map((x, i) => x * WT_W[i]))}**`]],
  `Table of the marks ${J(MEERA)} of the imagined learner Meera in Mathematics, Science, English and Hindi with weights ${J(WT_W)}; ΣWX is ${sum(MEERA.map((x, i) => x * WT_W[i]))} and ΣW is ${sum(WT_W)}`,
  `Weighted mean ${S(meeraW)} against a simple mean of ${S(meeraS)}.`,
);
const tExtreme = table(
  ['Data (imagined)', 'Mean', 'Median'],
  [
    [`Dhunmarg rainfall: ${J(RAIN)}`, S(rainMean), S(rainMed)],
    [`Same, with 20 replaced by 70: ${J(RAIN_X)}`, `**${S(mean(RAIN_X))}**`, S(median(RAIN_X))],
    [`Fruit stalls: ${J(STALL)}`, S(mean(STALL)), S(median(STALL))],
    [`Same, with 60 replaced by 160: ${J(STALL_X)}`, `**${S(mean(STALL_X))}**`, S(median(STALL_X))],
  ],
  `Table showing that one extreme value changes the mean but not the median: Dhunmarg rainfall mean ${S(rainMean)} becomes ${S(mean(RAIN_X))} while the median stays ${S(rainMed)}; stall sales mean ${S(mean(STALL))} becomes ${S(mean(STALL_X))} while the median stays ${S(median(STALL))}`,
  'One extreme value moves the mean, not the median.',
);
const tMerits = table(
  ['Merits of the mean', 'Demerits of the mean'],
  [
    ['Easy to understand and calculate', 'Affected by extreme values'],
    ['Uses every observation', 'Cannot be found exactly with open-ended classes'],
    ['Basis of many further calculations', 'May not be a value that occurs in the data, such as 7.3 for shoe sizes'],
  ],
  'Table of merits and demerits of the arithmetic mean',
);
const tSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Average', 'One value that represents a whole set of data'],
    ['Mean', 'Sum of the observations over their number'],
    ['Methods', 'Direct, assumed mean, step deviation: all give the same result'],
    ['Continuous series', 'Use class marks for the values'],
    ['Weighted mean', 'ΣWX ÷ ΣW when items differ in importance'],
    ['Properties', 'Deviations from the mean add to zero; extreme values pull the mean'],
  ],
  'Summary table of Part 1: average, mean, three methods, continuous series, weighted mean and properties of the mean',
);
const tMedPos = table(
  ['Position', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th'],
  [['Income (thousand rupees)', ...INC.map((x, i) => (i === 3 ? `**${x}**` : String(x)))]],
  `Table of the seven arranged incomes ${J(INC)} thousand rupees of the imagined Chandanpur hamlet; the median is the 4th item, ${incMed}`,
  `Seven items: the median is the ${(INC.length + 1) / 2}th.`,
);
const tMedInd = table(
  ['Series', 'N', 'Median position', 'Median'],
  [
    ['Chandanpur incomes (thousand rupees)', String(INC.length), `(${INC.length} + 1) ÷ 2 = ${(INC.length + 1) / 2}th`, `**${S(incMed)}**`],
    ['Dhunmarg rainfall (mm)', String(RAIN.length), `between the ${RAIN.length / 2}th and ${RAIN.length / 2 + 1}th`, `**${S(rainMed)}**`],
  ],
  `Table of the median of an odd and an even number of items: Chandanpur incomes have a median of ${S(incMed)} at the 4th place; Dhunmarg rainfall, arranged as ${J(ord2(RAIN))}, has a median of ${S(rainMed)}`,
  'Odd N: one middle item. Even N: average of the two middle items.',
);
const tShoeCf = table(
  ['Size X', 'Pairs f', 'Cumulative frequency'],
  SHOE_X.map((x, i) => [String(x), String(SHOE_F[i]), String(shoeMed.cf[i])]),
  `Table of shoe sizes ${J(SHOE_X)} with pairs ${J(SHOE_F)} and cumulative frequencies ${J(shoeMed.cf)} for the imagined Step-Up Footwear`,
  'Imagined Step-Up Footwear.',
);
const tMedDiscWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. Total', 'Σf', String(shoeMed.N)],
    ['2. Position', `(N + 1) ÷ 2 = (${shoeMed.N} + 1) ÷ 2`, `${S(shoeMed.pos)}th item`],
    ['3. Find the size', `First cumulative frequency of ${S(shoeMed.pos)} or more is ${shoeMed.cf[2]}`, `Size **${S(shoeMed.median)}**`],
  ],
  `Table of the median shoe size of the imagined Step-Up Footwear: ${shoeMed.N} pairs, position ${S(shoeMed.pos)}, found at size ${S(shoeMed.median)}`,
  'The 30th and 31st items both lie in the same size.',
);
const tWageCf = table(
  ['Class (Rs)', 'Workers f', 'Cumulative frequency'],
  WAGE.map((c, i) => [wCls(c), String(c[2]), String(wCum[i])]),
  `Table of the Tarapur weekly wage classes ${WAGE.map(wCls).join(', ')} with frequencies ${J(WAGE.map((c) => c[2]))} and cumulative frequencies ${J(wCum)}`,
  `N = ${wN}, N ÷ 2 = ${wN / 2}.`,
);
const tWageMedWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. Half the total', `N ÷ 2 = ${wN} ÷ 2`, String(wN / 2)],
    ['2. Median class', `First class with cumulative frequency of ${wN / 2} or more`, wCls([wMed.L, wMed.L + wMed.h])],
    ['3. Values', `L = ${wMed.L}, c.f. = ${wMed.cf}, f = ${wMed.f}, h = ${wMed.h}`, ''],
    ['4. Formula', `${wMed.L} + (${wN / 2} − ${wMed.cf}) ÷ ${wMed.f} × ${wMed.h}`, `**${S(wMed.median)}**`],
  ],
  `Table of the median weekly wage of the imagined Tarapur Cable Works: half the workers is ${wN / 2}, the median class is ${wCls([wMed.L, wMed.L + wMed.h])}, and the median is Rs ${S(wMed.median)}`,
  'Median in rupees.',
);
const tRobust = table(
  ['Average', 'Depends on', 'Affected by extreme values?'],
  [
    ['Arithmetic mean', 'Every value', 'Yes'],
    ['Median', 'The middle position', 'No'],
    ['Mode', 'The most frequent value', 'No'],
  ],
  'Table showing which of the mean, median and mode depends on what and whether each is affected by extreme values',
);
const tModeCount = table(
  ['Size', ...ord2([...new Set(SHOE_HR)]).map(String)],
  [['Pairs in the hour', ...ord2([...new Set(SHOE_HR)]).map((x) => (x === shoeHrMode ? `**${SHOE_HR.filter((v) => v === x).length}**` : String(SHOE_HR.filter((v) => v === x).length)))]],
  `Table of shoe sizes sold in one hour at an imagined counter, ${J(SHOE_HR)}, counted by size; size ${shoeHrMode} occurs ${SHOE_HR.filter((v) => v === shoeHrMode).length} times and is the mode`,
  'Imagined Step-Up Footwear counter.',
);
const tModeCont = table(
  ['Class (Rs)', ...WAGE.map(wCls)],
  [['Workers', ...WAGE.map((c, i) => (i === wMode.cls ? `**${c[2]}**` : String(c[2])))]],
  `Table of the Tarapur wage classes and frequencies ${J(WAGE.map((c) => c[2]))}; the modal class is ${wCls(WAGE[wMode.cls])} with ${wMode.f1} workers, between ${wMode.f0} before it and ${wMode.f2} after it`,
  'The modal class has the highest frequency.',
);
const tModeWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. Modal class', 'Highest frequency', wCls([wMode.L, wMode.L + wMode.h])],
    ['2. Frequencies', 'f0 before, f1 modal, f2 after', `${wMode.f0}, ${wMode.f1}, ${wMode.f2}`],
    ['3. Differences', `D1 = ${wMode.f1} − ${wMode.f0}; D2 = ${wMode.f1} − ${wMode.f2}`, `${wMode.D1} and ${wMode.D2}`],
    ['4. Formula', `${wMode.L} + ${wMode.D1} ÷ (${wMode.D1} + ${wMode.D2}) × ${wMode.h}`, `**${S(wMode.mode)}**`],
  ],
  `Table of the mode of the Tarapur weekly wages: modal class ${wCls([wMode.L, wMode.L + wMode.h])}, D1 ${wMode.D1}, D2 ${wMode.D2}, mode Rs ${S(wMode.mode)}`,
  'Mode in rupees.',
);
const tCompare = table(
  ['Imagined series', 'Mean', 'Median', 'Mode'],
  [
    ['Tarapur weekly wages (Rs)', S(wMean), S(wMed.median), S(wMode.mode)],
    ['Neelgiri rainfall (mm), one very wet day', S(ngMean), S(ngMed), S(ngMode)],
  ],
  `Table comparing the mean, median and mode: Tarapur wages ${S(wMean)}, ${S(wMed.median)} and ${S(wMode.mode)}; Neelgiri rainfall ${S(ngMean)}, ${S(ngMed)} and ${S(ngMode)}`,
  'The three averages agree closely only when no value is extreme.',
);
const tNg = table(
  ['Day', ...NG.map((_, i) => String(i + 1))],
  [['Rainfall (mm)', ...NG.map((x) => (x === Math.max(...NG) ? `**${x}**` : String(x)))], ['Arranged', ...ord2(NG).map(String)]],
  `Table of the imagined Neelgiri rainfall ${J(NG)} millimetres and the same values arranged ${J(ord2(NG))}; the mean is ${S(ngMean)}, the median ${S(ngMed)} and the mode ${S(ngMode)}`,
  'Imagined Neelgiri hill station.',
);
const tSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Median', 'Middle value of the arranged series; positional, so not pulled by extremes'],
    ['Individual and discrete series', 'The ((N + 1) ÷ 2)th item; use cumulative frequency for a discrete series'],
    ['Continuous series', 'L + ((N ÷ 2 − c.f.) ÷ f) × h'],
    ['Mode', 'Most frequent value'],
    ['Continuous mode', 'L + (D1 ÷ (D1 + D2)) × h, with D1 = f1 − f0 and D2 = f1 − f2'],
    ['Choosing', 'Median for extremes, mode for most popular, mean when every value counts'],
  ],
  'Summary table of Part 2: median, median of individual and discrete series, median of a continuous series, mode, mode of a continuous series and choosing the average',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Measures of Central Tendency — Part 1: The Arithmetic Mean',
  goals: [
    'Explain what an average and central tendency mean',
    'Calculate the arithmetic mean of individual, discrete and continuous series by the direct, assumed-mean and step-deviation methods',
    'Calculate a weighted arithmetic mean',
    'State the properties, merits and demerits of the arithmetic mean',
  ],
  slides: [
    sl('title', 'The Arithmetic Mean', {
      b: 'Part 1 — one **value** that stands for a whole **series**.',
      v: vRoute1,
      n: 'A long list of figures is hard to hold in the mind. An average is a single value that stands for the whole set. In this part we learn the most common average, the arithmetic mean. We calculate it for individual, discrete and continuous series, by three methods, and then look at weighted means and the properties of the mean.',
    }),
    sl('concept', 'What is an average?', {
      b: 'An **average** is a single value that represents a whole set of data. Values tend to gather around a centre, so averages are called measures of **central tendency**.',
      v: tAvg3,
      n: 'An average is one value that represents the whole data. In most data the values gather around a centre, so averages are called measures of central tendency. We study three of them. The arithmetic mean divides the total by the number of items. The median is the middle value. The mode is the value that occurs most often.',
    }),
    sl('concept', 'Mean of an individual series', {
      b: 'The **arithmetic mean** is the sum of all observations divided by their number. Direct method: X̄ = ΣX ÷ N. Assumed-mean method: X̄ = A + Σd ÷ N, where d = X − A.',
      v: tRain,
      n: `Here are daily rainfall figures of an imagined hill station, Dhunmarg, over ten days. For the direct method, add all the values and divide by the number of days. For the assumed mean method, pick a convenient value, find how far each observation lies from it, add those deviations, and correct the assumed value by the average deviation.`,
    }),
    sl('example', 'Worked example 1: rainfall at Dhunmarg', {
      b: 'Find the mean daily rainfall of the imagined Dhunmarg hill station by both methods.',
      bl: [
        `Step 1 — Direct: ΣX = ${RAIN.join(' + ')} = ${sum(RAIN)}.`,
        `Step 2 — Mean = ${sum(RAIN)} ÷ ${RAIN.length} = **${S(rainMean)}** mm.`,
        `Step 3 — Assumed mean A = ${RAIN_A}: the deviations are ${J(rainD)}, so Σd = ${sum(rainD)}.`,
        `Step 4 — Mean = ${RAIN_A} + ${sum(rainD)} ÷ ${RAIN.length} = **${S(RAIN_A + sum(rainD) / RAIN.length)}** mm, the same.`,
      ],
      v: tRainWork,
      n: `Adding the ten rainfall figures gives ${sum(RAIN)}. Dividing by ten days gives a mean of ${S(rainMean)} millimetres. Now take ten as the assumed mean. The deviations add up to ${sum(rainD)}, and ten plus ${sum(rainD)} over ten gives the same mean, ${S(rainMean)}. Both methods must agree.`,
    }),
    sl('check', 'Quick check: mean of rainfall', {
      b: 'Find the mean daily rainfall of another imagined hill station.',
      chk: 'n_kal_mean',
      n: 'Add up all the daily rainfall figures given in the question. Then divide the total by the number of days. Give your answer in millimetres, correct to two decimal places if needed.',
    }),
    sl('concept', 'Formulae at a glance', {
      b: 'In a **discrete series** each value X occurs f times, so X̄ = ΣfX ÷ Σf.',
      v: tForms,
      n: 'In a discrete series each value occurs several times, so we multiply each value by its frequency, add the products, and divide by the total frequency. For a continuous series the class mark stands for each class. The assumed mean and step deviation methods reduce the size of the numbers, but they give exactly the same answer as the direct method.',
    }),
    sl('example', 'Worked example 2: shoe sizes', {
      b: 'The imagined shop Step-Up Footwear sold 60 pairs in a week. Find the mean shoe size.',
      bl: [
        `Step 1 — Multiply each size by its frequency: fX = ${J(shoeFX)}.`,
        `Step 2 — ΣfX = **${sum(shoeFX)}** and Σf = **${shoeN}**.`,
        `Step 3 — Mean = ${sum(shoeFX)} ÷ ${shoeN} = **${S(shoeMean)}**.`,
        'Step 4 — A mean size need not be a real size; here it is a figure for comparison.',
      ],
      v: tShoe,
      n: `Multiply each shoe size by the number of pairs sold in that size. The products add up to ${sum(shoeFX)}. The total number of pairs is ${shoeN}. So the mean size is ${sum(shoeFX)} divided by ${shoeN}, which is ${S(shoeMean)}. Notice that no one can buy a shoe of this size, which tells us the mean is not always the best guide.`,
    }),
    sl('check', 'Quick check: mean of a discrete series', {
      b: 'Marks of pupils in a quiz are given with frequencies. Find the mean mark.',
      chk: 'n_quiz_mean',
      n: 'Multiply each mark by the number of pupils who got it. Add the products, and divide by the total number of pupils. Give the answer correct to two decimal places.',
    }),
    sl('concept', 'Continuous series: direct method', {
      b: 'Take the **class mark** of each class: m = (lower limit + upper limit) ÷ 2. Then X̄ = Σfm ÷ Σf.',
      v: tWageDirect,
      n: `A factory called Tarapur Cable Works pays its fifty workers weekly wages that are grouped in classes of width one hundred. We take the middle of each class, the class mark, as the value of every worker in it. Multiply each class mark by its frequency and add. The total is ${sum(wFM)}. Divide by fifty workers.`,
    }),
    sl('concept', 'Assumed-mean and step-deviation methods', {
      b: 'Take **A** near the middle, find d = m − A, and for the step deviation divide by the class width: d′ = d ÷ h. X̄ = A + (Σfd′ ÷ Σf) × h.',
      v: tWageAssumed,
      n: `We take eight hundred and fifty as the assumed mean. The deviations of the class marks are small numbers, and when we divide them by the class width of one hundred they become tiny whole numbers. This makes the multiplication easy. Finally the average deviation must be multiplied back by the class width and added to the assumed mean.`,
    }),
    sl('example', 'Worked example 3: three methods, one answer', {
      b: 'Find the mean weekly wage at Tarapur Cable Works by all three methods.',
      bl: [
        `Step 1 — Direct: ${sum(wFM)} ÷ ${wN} = **${S(wMean)}**.`,
        `Step 2 — Assumed mean: ${wA} + (${wAs.sumFd}) ÷ ${wN} = **${S(wAs.mean)}**.`,
        `Step 3 — Step deviation: ${wA} + (${wSt.sumFd} ÷ ${wN}) × ${wH} = **${S(wSt.mean)}**.`,
        'Step 4 — The three results agree, which is a good check on the working.',
      ],
      v: tAgree,
      n: `By the direct method the mean wage is ${S(wMean)} rupees. By the assumed mean method we get the same figure. The step deviation method also gives ${S(wSt.mean)}. The three methods are only different ways of doing the same sum, so they must agree. If they do not, there is an error in the working.`,
    }),
    sl('concept', 'Weighted arithmetic mean', {
      b: 'When items differ in **importance**, give each a **weight** W. Weighted mean = ΣWX ÷ ΣW.',
      v: tWtdDef,
      n: 'The simple mean treats every item as equally important. Often that is not fair. A subject that carries more marks should count for more in an overall result, and a commodity that households buy more of should count for more in a price basket. We multiply each value by its weight, add, and divide by the total of the weights.',
    }),
    sl('example', 'Worked example 4: a learner\'s weighted marks', {
      b: 'An imagined learner, Meera, has marks in four subjects with different weights. Find her weighted mean.',
      bl: [
        `Step 1 — WX = ${MEERA.map((x, i) => `${x}×${WT_W[i]}`).join(' + ')} = ${sum(MEERA.map((x, i) => x * WT_W[i]))}.`,
        `Step 2 — ΣW = ${WT_W.join(' + ')} = ${sum(WT_W)}.`,
        `Step 3 — Weighted mean = ${sum(MEERA.map((x, i) => x * WT_W[i]))} ÷ ${sum(WT_W)} = **${S(meeraW)}**.`,
        `Step 4 — The simple mean is ${S(meeraS)}, lower, because her best marks carry more weight.`,
      ],
      v: tWtd,
      n: `Meera scored well in the subjects with higher weights. Her weighted total is ${sum(MEERA.map((x, i) => x * WT_W[i]))} and the weights add to ${sum(WT_W)}, so her weighted mean is ${S(meeraW)}. The simple mean of her four marks is only ${S(meeraS)}, because it treats every subject as equally important.`,
    }),
    sl('check', 'Quick check: weighted mean', {
      b: 'Find the weighted mean mark of another imagined learner.',
      chk: 'n_wtd_arjun',
      n: 'Multiply each mark by the weight of its subject. Add the products and divide by the total of the weights. Do not divide by the number of subjects.',
    }),
    sl('diagram', 'The mean as a balance point', {
      v: vBalance,
      n: `Imagine the rainfall values as equal weights on a beam. The mean is the point where the beam balances. The days below the mean have deviations that add up to minus ${S(Math.abs(rainNeg))}, and the days above have deviations that add up to plus ${S(rainPos)}. They cancel exactly, so the sum of deviations from the mean is always zero.`,
    }),
    sl('concept', 'Extreme values pull the mean', {
      b: 'The mean uses **every** value, so one very large or very small value moves it. The **median** does not move.',
      v: tExtreme,
      n: `When one rainy day of twenty millimetres is replaced by seventy, the mean rises from ${S(rainMean)} to ${S(mean(RAIN_X))}. The middle value does not change at all. The same happens with the sales of fruit stalls. One unusual figure pulls the mean towards it, so the mean can be a poor guide when the data have an extreme value.`,
    }),
    sl('check', 'Quick check: deviations', {
      b: 'What is the sum of the deviations of a set of values from their mean?',
      chk: 'm_dev_zero',
      n: 'Think of the balance point. Deviations below the mean are negative and those above are positive. Decide what their total must be.',
    }),
    sl('concept', 'Merits and demerits of the mean', {
      b: 'The mean is the most widely used average, but it must be used with care.',
      v: tMerits,
      n: 'The mean is easy to understand and calculate, it uses every observation, and many further calculations are built on it. But it is affected by extreme values, it cannot be found exactly when a class is open ended, and it may not be a value that actually occurs in the data, like a mean shoe size that nobody can buy.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To recap. An average is one value that represents the whole data. The arithmetic mean is the sum divided by the number of items. For discrete series multiply by frequencies, and for continuous series use class marks. The direct, assumed mean and step deviation methods agree. A weighted mean uses weights. Deviations from the mean add to zero, and extreme values pull the mean.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **formula** first, then substitute and show each step.',
        'For a continuous series, **find the class marks** before doing anything else.',
        'Use **assumed mean or step deviation** for large figures, and check one against the direct method.',
        'In a weighted mean, divide by **ΣW**, not by the number of items.',
        'Say which values are **extreme** before you trust a mean.',
      ],
      n: 'Some tips. Write the formula first, then substitute and show each step. For a continuous series, find the class marks before anything else. Use the assumed mean or step deviation method for large figures, and check against the direct method when you can. In a weighted mean divide by the total of the weights. And look for extreme values before you trust the mean.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Measures of Central Tendency — Part 2: Median, Mode and Choosing an Average',
  goals: [
    'Calculate the median of individual, discrete and continuous series',
    'Calculate the mode of individual, discrete and continuous series and locate it on a histogram',
    'Explain why the median is a positional average and is not affected by extreme values',
    'Choose among the mean, median and mode for a given situation',
  ],
  slides: [
    sl('title', 'Median and Mode', {
      b: 'Part 2 — the **middle** value, the **commonest** value, and which average to **use**.',
      v: vRoute2,
      n: 'The mean is not the only average. In this part we learn the median, which is the middle value, and the mode, which is the most common value. We calculate each for individual, discrete and continuous series, find them from graphs, and finally learn how to choose the right average for a given situation.',
    }),
    sl('concept', 'The median: the middle value', {
      b: 'The **median** is the middle value of a series arranged in order. It divides the series into **two equal parts**. For an individual series with N items it is the value of the ((N + 1) ÷ 2)th item.',
      v: tMedPos,
      n: `The median is the middle value of a series arranged in order, with half the items on each side. Here are seven incomes from an imagined hamlet, Chandanpur, arranged from lowest to highest. With seven items the middle one is the fourth, so the median income is ${S(incMed)} thousand rupees.`,
    }),
    sl('example', 'Worked example 1: odd and even numbers of items', {
      b: 'Find the median of the Chandanpur incomes and of the Dhunmarg rainfall.',
      bl: [
        `Step 1 — Incomes: N = ${INC.length}, position (${INC.length} + 1) ÷ 2 = ${(INC.length + 1) / 2}th, so the median is **${S(incMed)}**.`,
        `Step 2 — Rainfall arranged: ${J(ord2(RAIN))}.`,
        `Step 3 — N = ${RAIN.length} is even, so take the average of the ${RAIN.length / 2}th and ${RAIN.length / 2 + 1}th items.`,
        `Step 4 — (${ord2(RAIN)[RAIN.length / 2 - 1]} + ${ord2(RAIN)[RAIN.length / 2]}) ÷ 2 = **${S(rainMed)}** mm.`,
      ],
      v: tMedInd,
      n: `Always arrange the values first. With seven incomes the median is the fourth, ${S(incMed)} thousand. With ten rainfall figures there is no single middle item. The fifth and sixth items are ${ord2(RAIN)[4]} and ${ord2(RAIN)[5]}, so the median is their average, ${S(rainMed)} millimetres. The median need not be one of the observed values.`,
    }),
    sl('concept', 'Median of a discrete series', {
      b: 'Add a **cumulative frequency** column. The median is the value whose cumulative frequency first reaches ((N + 1) ÷ 2).',
      v: tShoeCf,
      n: 'In a discrete series the items are already grouped, so we cannot count down the list one by one. Instead we add up the frequencies as we go down the table. These are the cumulative frequencies. The median is the size whose cumulative frequency first reaches the position of the middle item.',
    }),
    sl('example', 'Worked example 2: median shoe size', {
      b: 'Find the median size of the 60 pairs sold by the imagined Step-Up Footwear.',
      bl: [
        `Step 1 — N = ${shoeMed.N}, so the median position is (${shoeMed.N} + 1) ÷ 2 = ${S(shoeMed.pos)}.`,
        `Step 2 — Cumulative frequencies: ${J(shoeMed.cf)}.`,
        `Step 3 — The ${Math.floor(shoeMed.pos)}th and ${Math.ceil(shoeMed.pos)}th items both fall in the group that reaches ${shoeMed.cf[2]}.`,
        `Step 4 — Median size = **${S(shoeMed.median)}**.`,
      ],
      v: tMedDiscWork,
      n: `There are ${shoeMed.N} pairs, so the middle lies between the ${Math.floor(shoeMed.pos)}th and ${Math.ceil(shoeMed.pos)}th pairs. The cumulative frequency passes ${Math.ceil(shoeMed.pos)} at size ${S(shoeMed.median)}, since the sizes before it add up to only ${shoeMed.cf[1]} pairs. So both middle pairs are of size ${S(shoeMed.median)}, and that is the median.`,
    }),
    sl('check', 'Quick check: median of a discrete series', {
      b: 'Find the median mark of the pupils in the quiz.',
      chk: 'n_quiz_median',
      n: 'First add the frequencies to get cumulative frequencies. Then find the position of the middle items. With an even number of pupils, the median is the average of two middle marks.',
    }),
    sl('concept', 'Median of a continuous series', {
      b: 'Median = L + ((N ÷ 2 − c.f.) ÷ f) × h, where the **median class** is the first class whose cumulative frequency reaches N ÷ 2.',
      v: tWageCf,
      n: `For a continuous series we use half the total, not the position plus one over two. Here the fifty Tarapur workers give a half of twenty five. The first class whose cumulative frequency reaches twenty five is the median class. The formula then places the median inside that class, in proportion to how far we must go beyond the earlier classes.`,
    }),
    sl('example', 'Worked example 3: the median weekly wage', {
      b: 'Find the median weekly wage of the 50 workers of the imagined Tarapur Cable Works.',
      bl: [
        `Step 1 — N ÷ 2 = ${wN / 2}.`,
        `Step 2 — Median class: **${wCls([wMed.L, wMed.L + wMed.h])}**, with L = ${wMed.L}, c.f. = ${wMed.cf}, f = ${wMed.f}, h = ${wMed.h}.`,
        `Step 3 — Median = ${wMed.L} + (${wN / 2} − ${wMed.cf}) ÷ ${wMed.f} × ${wMed.h}.`,
        `Step 4 — Median = **${S(wMed.median)}** rupees.`,
      ],
      v: tWageMedWork,
      n: `Half of the fifty workers is twenty five. The cumulative frequency before the median class is ${wMed.cf}, so we still need ${wN / 2 - wMed.cf} more workers out of the ${wMed.f} in the median class. That is a fraction of the class width of ${wMed.h}. Adding it to the lower limit ${wMed.L} gives a median wage of ${S(wMed.median)} rupees.`,
    }),
    sl('diagram', 'The ogives meet at the median', {
      v: vOgives,
      n: `The less than and more than ogives of the wages cross at a height of twenty five workers, half of the total. The wage directly below the crossing is the median, ${S(wMed.median)} rupees. This is the same value as the formula gives. So the median can be found either by calculation or by drawing the two ogives.`,
    }),
    sl('concept', 'The median is a positional average', {
      b: 'The median depends on the **position** of the middle item, not on how large the extreme values are.',
      v: tRobust,
      n: 'The median is called a positional average because it is fixed by the position of the middle item. If the largest value becomes ten times bigger, the middle position does not change, so the median does not change. The mean depends on every value, so it moves. The mode depends only on which value is most frequent, so extreme values do not affect it either.',
    }),
    sl('concept', 'The mode: the most frequent value', {
      b: 'The **mode** is the value that occurs most often. In a discrete series it is the value with the **highest frequency**.',
      v: tModeCount,
      n: `The mode is the value that occurs most often. At a shoe counter, the sizes sold in one hour were counted, and size ${shoeHrMode} came up ${SHOE_HR.filter((v) => v === shoeHrMode).length} times, more than any other. So the mode is ${shoeHrMode}. A shopkeeper who wants to stock the right size needs the mode, not the mean. A series may have two modes, or none.`,
    }),
    sl('check', 'Quick check: modal class', {
      b: 'Identify the modal class from a table of mango weights.',
      chk: 'm_modal_class',
      n: 'The modal class is the class with the highest frequency. Look down the frequency column, find the largest figure, and read off the class beside it.',
    }),
    sl('concept', 'Mode of a continuous series', {
      b: 'Mode = L + (D1 ÷ (D1 + D2)) × h, where D1 = f1 − f0 and D2 = f1 − f2 and f1 is the **modal frequency**.',
      v: tModeCont,
      n: `For a continuous series we first find the modal class, the one with the highest frequency, which here has ${wMode.f1} workers. Its neighbours have ${wMode.f0} and ${wMode.f2}. The formula uses the differences between the modal frequency and these two neighbours. The mode is placed inside the modal class, closer to the neighbour that is larger.`,
    }),
    sl('example', 'Worked example 4: the modal wage', {
      b: 'Find the mode of the weekly wages of the imagined Tarapur Cable Works.',
      bl: [
        `Step 1 — Modal class: **${wCls([wMode.L, wMode.L + wMode.h])}** (f1 = ${wMode.f1}).`,
        `Step 2 — f0 = ${wMode.f0} and f2 = ${wMode.f2}.`,
        `Step 3 — D1 = ${wMode.f1} − ${wMode.f0} = ${wMode.D1} and D2 = ${wMode.f1} − ${wMode.f2} = ${wMode.D2}.`,
        `Step 4 — Mode = ${wMode.L} + ${wMode.D1} ÷ (${wMode.D1} + ${wMode.D2}) × ${wMode.h} = **${S(wMode.mode)}**.`,
      ],
      v: tModeWork,
      n: `The modal class is seven hundred to eight hundred rupees. The first difference is ${wMode.D1} and the second is ${wMode.D2}. Because the class before it is much smaller than the class after it, the mode lies closer to the upper end of the class. Adding three fourths of the class width to seven hundred gives a modal wage of ${S(wMode.mode)} rupees.`,
    }),
    sl('diagram', 'The mode on a histogram', {
      v: vModeHist,
      n: `On the histogram, join the top right corner of the bar before the modal bar to the top right corner of the modal bar. Then join the top left corner of the modal bar to the top left corner of the bar after it. The two lines cross, and the wage straight below the crossing is the mode, ${S(wGraph.x)} rupees, the same as the formula.`,
    }),
    sl('concept', 'Mean, median and mode compared', {
      b: 'The three averages are close when the data are balanced, and drift apart when an **extreme** value is present.',
      v: tCompare,
      n: `For the Tarapur wages the three averages are close together, ${S(wMean)}, ${S(wMed.median)} and ${S(wMode.mode)}. For the rainfall at an imagined hill station, Neelgiri, one very wet day pushes the mean up to ${S(ngMean)} while the median and the mode stay at ${S(ngMed)} and ${S(ngMode)}. When the averages differ so much, the choice of average matters.`,
    }),
    sl('diagram', 'Choosing the average', {
      v: vChoose,
      n: 'Ask what you need from the data. When a few values are extreme, as in incomes with one very rich family, use the median. When you want the most common item, such as the shoe size to stock, use the mode. When every value should count and the data are balanced, such as the marks of a class, use the arithmetic mean.',
    }),
    sl('check', 'Quick check: which average?', {
      b: 'Match each imagined situation with the best average.',
      chk: 'mt_situation',
      n: 'For each situation, ask whether there are extreme values, whether the most popular item matters, or whether every value should count. Also remember when weights are needed.',
    }),
    sl('example', 'Worked example 5: rainfall at Neelgiri', {
      b: 'A brochure quotes the average daily rainfall of the imagined Neelgiri hill station. Which average describes a typical day?',
      bl: [
        `Step 1 — Mean = ${sum(NG)} ÷ ${NG.length} = **${S(ngMean)}** mm.`,
        `Step 2 — Arranged: ${J(ord2(NG))}; median = (${ord2(NG)[4]} + ${ord2(NG)[5]}) ÷ 2 = **${S(ngMed)}** mm.`,
        `Step 3 — Mode = **${S(ngMode)}** mm, occurring ${NG.filter((x) => x === ngMode).length} times.`,
        `Step 4 — One day of ${Math.max(...NG)} mm lifts the mean, so the median or mode describes a typical day.`,
      ],
      v: tNg,
      n: `The mean rainfall is ${S(ngMean)} millimetres, but nine of the ten days had at most seven millimetres. One very wet day lifts the mean. The median is ${S(ngMed)} and the mode is also ${S(ngMode)}, and these describe a typical day much better. So a tourist who wants to know what a normal day is like should be given the median.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To recap. The median is the middle value of the arranged series. For individual and discrete series find the item at the position given by the total plus one over two, using cumulative frequencies. For a continuous series use the formula with half the total. The mode is the most frequent value, with its own formula for classes. Use the median for extremes, the mode for the most popular, the mean when every value counts.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '**Arrange the data** in order before finding a median.',
        'For an even N, take the **average of the two middle items**.',
        'For a continuous median use **N ÷ 2**, and name the median class.',
        'Write **D1 and D2** separately before substituting in the mode formula.',
        'Give a **reason** when you choose an average: mention extreme values, popularity or weights.',
      ],
      n: 'Some tips. Arrange the data in order before finding a median. For an even number of items, take the average of the two middle items. For a continuous median use half the total and name the median class. Write the two differences separately before using the mode formula. And always give a reason when you choose an average.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Measures of Central Tendency — Notes',
  sections: [
    {
      h: '1. What an average is',
      t: 1,
      b: `An **average** is a single value that represents a whole set of data. In most data the values gather around a central value, which is why averages are called measures of **central tendency**. The three common averages are the arithmetic mean, the median and the mode.\n\nWhich average to use depends on the series. The mean uses every value, the median is the middle value of the arranged series, and the mode is the value that occurs most often.`,
      terms: [
        ['Average', 'A single value that represents a whole set of data.'],
        ['Central tendency', 'The tendency of the values of a series to gather around a central value.'],
      ],
      v: tAvg3,
    },
    {
      h: '2. Arithmetic mean: individual and discrete series',
      t: 1,
      b: `The **arithmetic mean** is the sum of all the observations divided by their number.\n\n**Individual series, direct method:** X̄ = ΣX ÷ N. **Assumed-mean method:** X̄ = A + Σd ÷ N, with d = X − A. For the imagined Dhunmarg rainfall, ΣX = ${sum(RAIN)} and N = ${RAIN.length}, so the mean is ${S(rainMean)} mm; with A = ${RAIN_A}, Σd = ${sum(rainD)} and the mean is the same.\n\n**Discrete series:** X̄ = ΣfX ÷ Σf. For the imagined Step-Up Footwear sales, ΣfX = ${sum(shoeFX)} and Σf = ${shoeN}, so the mean size is ${S(shoeMean)}.`,
      terms: [
        ['Arithmetic mean', 'The sum of all the observations divided by their number.'],
        ['Assumed mean', 'A convenient value A chosen near the middle of the data, from which deviations are measured.'],
        ['Deviation', 'The difference between an observation and a chosen value, d = X − A.'],
      ],
      v: tRain,
      vs: [tShoe, tForms],
    },
    {
      h: '3. Arithmetic mean: continuous series',
      t: 1,
      b: `In a continuous series the **class mark** m = (lower limit + upper limit) ÷ 2 stands for every item of the class.\n\n**Direct method:** X̄ = Σfm ÷ Σf. **Assumed-mean method:** X̄ = A + Σfd ÷ Σf, d = m − A. **Step-deviation method:** X̄ = A + (Σfd′ ÷ Σf) × h, d′ = (m − A) ÷ h, h the common class width.\n\nFor the imagined Tarapur Cable Works wages (${wN} workers) all three methods give ${S(wMean)} rupees: Σfm = ${sum(wFM)}; with A = ${wA}, Σfd = ${wAs.sumFd}; with h = ${wH}, Σfd′ = ${wSt.sumFd}.`,
      terms: [
        ['Class mark', 'The mid-point of a class, (lower limit + upper limit) ÷ 2.'],
        ['Step-deviation method', 'A method in which deviations are divided by the common class width to make them small whole numbers.'],
      ],
      v: tWageDirect,
      vs: [tWageAssumed, tAgree],
    },
    {
      h: '4. Weighted mean, properties, merits and demerits',
      t: 1,
      b: `The **weighted arithmetic mean** is X̄w = ΣWX ÷ ΣW, used when items differ in importance. For an imagined learner with marks ${J(MEERA)} and weights ${J(WT_W)}, the weighted mean is ${S(meeraW)} and the simple mean ${S(meeraS)}.\n\n**Properties.** (1) The sum of the deviations from the mean is zero: for the Dhunmarg rainfall the deviations below the mean add to ${S(rainNeg)} and those above to +${S(rainPos)}. (2) The mean is affected by extreme values: replacing 20 by 70 raises the Dhunmarg mean from ${S(rainMean)} to ${S(mean(RAIN_X))}.\n\n**Merits:** easy to understand and compute; uses every value; basis of further calculation. **Demerits:** affected by extreme values; cannot be found exactly with open-ended classes; may not be an actual value of the data.`,
      terms: [
        ['Weighted arithmetic mean', 'A mean in which each value is multiplied by a weight showing its importance, ΣWX ÷ ΣW.'],
        ['Extreme value', 'A value far larger or smaller than most of the others.'],
      ],
      v: vBalance,
      vs: [tWtd, tExtreme, tMerits],
    },
    {
      h: '5. Median',
      t: 2,
      b: `The **median** is the middle value of a series arranged in order, dividing it into two equal parts. It is a **positional average**.\n\n**Individual series:** the value of the ((N + 1) ÷ 2)th item; for even N take the average of the two middle items (Dhunmarg rainfall, ${RAIN.length} days: ${S(rainMed)} mm).\n\n**Discrete series:** form cumulative frequencies and find the value in which the ((N + 1) ÷ 2)th item falls (Step-Up Footwear: size ${S(shoeMed.median)}).\n\n**Continuous series:** Median = L + ((N ÷ 2 − c.f.) ÷ f) × h, where L is the lower limit of the median class, c.f. the cumulative frequency before it, f its frequency and h its width. For the Tarapur wages the median is ${S(wMed.median)} rupees. The median can also be read from the point where the less than and more than ogives meet. It is not affected by extreme values.`,
      terms: [
        ['Median', 'The middle value of a series arranged in order, which divides it into two equal parts.'],
        ['Positional average', 'An average fixed by the position of an item in the arranged series rather than by all the values.'],
        ['Median class', 'The first class whose cumulative frequency is N ÷ 2 or more.'],
      ],
      v: tMedInd,
      vs: [tMedDiscWork, tWageMedWork, vOgives],
    },
    {
      h: '6. Mode',
      t: 2,
      b: `The **mode** is the value that occurs most frequently. In an individual or discrete series it is the value with the highest frequency (shoe size ${shoeHrMode} at the imagined counter). A series may have more than one mode, or none.\n\n**Continuous series:** the modal class has the highest frequency, and Mode = L + (D1 ÷ (D1 + D2)) × h, with D1 = f1 − f0, D2 = f1 − f2, f1 the modal frequency and f0, f2 the frequencies of the classes before and after it. For the Tarapur wages D1 = ${wMode.D1}, D2 = ${wMode.D2} and the mode is ${S(wMode.mode)} rupees.\n\n**On a histogram:** join the top corners of the modal bar to the neighbouring corners as shown; the wage below the crossing is the mode (${S(wGraph.x)}).`,
      terms: [
        ['Mode', 'The value that occurs most frequently in a series.'],
        ['Modal class', 'The class with the highest frequency in a continuous series.'],
      ],
      v: tModeCount,
      vs: [tModeWork, vModeHist],
    },
    {
      h: '7. Choosing the average',
      t: 2,
      b: `Use the **median** when a few values are extreme, as in the imagined Chandanpur hamlet where one family's income pulls the mean to ${S(incMean)} thousand while the median is ${S(incMed)} thousand. Use the **mode** for the most popular item, such as the shoe size to stock. Use the **arithmetic mean** when every value should count, as for the marks of a class, and a **weighted mean** when items differ in importance.\n\nWhen the mean, median and mode are far apart, the data have an extreme value or are lopsided, and the choice must be explained.`,
      terms: [],
      v: vChoose,
      vs: [tCompare, tRobust],
    },
  ],
  tips: `- Write the **formula** first, then substitute; show every step.\n- For a continuous series find **class marks** (mean) or the **median class / modal class** first.\n- Check the assumed-mean or step-deviation answer against the direct method.\n- In a weighted mean divide by **ΣW**.\n- Arrange data in order before finding a median; for even N average the two middle items.\n- Give a **reason** whenever you choose an average.`,
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is an **average**?', 'A single value that represents a whole set of data.', 'definition', 1],
  ['What is meant by **central tendency**?', 'The tendency of the values of a series to gather around a central value.', 'definition', 1],
  ['**Arithmetic mean**', 'The sum of all the observations divided by their number.', 'definition', 1],
  ['Mean of an individual series, **direct method**', 'X̄ = ΣX ÷ N.', 'formula', 1],
  ['Mean of an individual series, **assumed-mean method**', 'X̄ = A + Σd ÷ N, where d = X − A.', 'formula', 1],
  ['Mean of a **discrete series**', 'X̄ = ΣfX ÷ Σf.', 'formula', 1],
  ['**Class mark**', 'The mid-point of a class: (lower limit + upper limit) ÷ 2.', 'definition', 1],
  ['Mean of a continuous series, **direct method**', 'X̄ = Σfm ÷ Σf, with m the class mark.', 'formula', 1],
  ['Mean of a continuous series, **assumed-mean method**', 'X̄ = A + Σfd ÷ Σf, with d = m − A.', 'formula', 1],
  ['Mean of a continuous series, **step-deviation method**', 'X̄ = A + (Σfd′ ÷ Σf) × h, with d′ = (m − A) ÷ h.', 'formula', 1],
  ['Do the **three methods** of finding the mean agree?', 'Yes. They are different ways of doing the same sum and must give the same mean.', 'concept', 1],
  ['Why is an **assumed mean** used?', 'To work with smaller numbers; the answer does not change.', 'concept', 1],
  ['**Weighted arithmetic mean**', 'ΣWX ÷ ΣW: each value is multiplied by a weight showing its importance.', 'formula', 1],
  ['When is a **weighted mean** needed?', 'When the items differ in importance, as subjects carrying different marks.', 'concept', 1],
  ['Sum of the **deviations** from the mean', 'Always zero.', 'fact', 1],
  ['The mean and **extreme values**', 'The mean is affected by extreme values, because it uses every observation.', 'fact', 1],
  ['Two **merits** of the mean', 'Easy to understand and calculate; uses every observation.', 'concept', 1],
  ['Two **demerits** of the mean', 'Affected by extreme values; cannot be found exactly with open-ended classes.', 'concept', 1],
  ['**Median**', 'The middle value of a series arranged in order, dividing it into two equal parts.', 'definition', 2],
  ['Median of an **individual series**', 'The value of the ((N + 1) ÷ 2)th item; for even N the average of the two middle items.', 'formula', 2],
  ['Median of a **discrete series**', 'Use cumulative frequencies to find the value in which the ((N + 1) ÷ 2)th item falls.', 'formula', 2],
  ['Median of a **continuous series**', 'L + ((N ÷ 2 − c.f.) ÷ f) × h.', 'formula', 2],
  ['**Median class**', 'The first class whose cumulative frequency is N ÷ 2 or more.', 'definition', 2],
  ['Why is the median a **positional average**?', 'It is fixed by the position of the middle item, so extreme values do not affect it.', 'concept', 2],
  ['Where do the **ogives** show the median?', 'At the point where the less than and more than ogives cross.', 'fact', 2],
  ['**Mode**', 'The value that occurs most frequently in a series.', 'definition', 2],
  ['**Modal class**', 'The class with the highest frequency in a continuous series.', 'definition', 2],
  ['Mode of a **continuous series**', 'L + (D1 ÷ (D1 + D2)) × h, with D1 = f1 − f0 and D2 = f1 − f2.', 'formula', 2],
  ['Locating the **mode** on a histogram', 'Join the top corners of the modal bar to the neighbouring bars across; read the value below the crossing.', 'concept', 2],
  ['Which average for a **typical income** with an extreme value?', 'The median.', 'concept', 2],
  ['Which average for the **most popular size**?', 'The mode.', 'concept', 2],
  ['Which average when **every value should count**?', 'The arithmetic mean, or a weighted mean when items differ in importance.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Measures of Central Tendency',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_avg_meaning', 'm_step_formula', 'm_median_robust', 'ar_mean_extreme'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_mean_def', 's2_median_def', 's3_assumed'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_mean3', 'l_mode_cont'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the data and answer all parts. Part (c) has an internal choice.', items: ['cb_footwear'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Measures of Central Tendency',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_mean_def', 'm_classmark', 'm_extreme_mean', 'm_weighted_when', 'm_median_pos', 'm_cf_use', 'm_mode_def', 'm_choose_income', 'ar_median_pos', 'ar_mode_cum'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_avg', 's2_zero', { attempt: 1, keys: ['s2_extreme', 's2_weighted_why'] }, 's3_discrete_mean', { attempt: 1, keys: ['s3_median_disc', 's3_modal'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_median_cont', { attempt: 1, keys: ['l_props', 'l_choose'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_hamlet', 'cb_rain'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-11-economics-ch05 only (arithmetic mean by three methods, weighted mean, properties; median and mode of individual, discrete and continuous series, graphic location, choosing an average)',
    originality: 'every hill station, hamlet, factory, shop, school, bank and passage is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all means, medians, modes, cumulative frequencies, deviations and weighted means computed with stats.mjs or plain code from imagined data and asserted with check(); every SVG is drawn from the same data',
    facts: 'only stable statistical definitions and formulae are stated: mean, assumed-mean and step-deviation methods, weighted mean, zero sum of deviations, median positions and formula, modal formula with D1 and D2, graphic median and mode',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
