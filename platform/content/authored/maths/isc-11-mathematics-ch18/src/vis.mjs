// Visuals for ISC 11 Mathematics ch18 (measures of dispersion). Every number in a table, caption or alt text is taken from
// the verified data sets in data.mjs (exact rationals); each visual asserts what it claims.
import { plot, table, flow, r } from './lib.mjs';
import { T, fr, tex, Dist, cls, dirTable, shortTable, stepTable, mdTable, asTable, sums, sdTex, sdRound, cvRound, combine, checkCombine, correct, checkCorrect, surdOk } from './stat2.mjs';
import * as D from './data.mjs';

export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
export const V = {};
const M = (t) => `$${t}$`;
const XB = r`\bar{x}`;

// ---------------------------------------------------------------- plot helpers
export function strips(rows, alt, caption, meanX = null) {
  const all = rows.flatMap((x) => x.d.x.map((v) => v.num()));
  const lo = Math.min(...all), hi = Math.max(...all), pad = Math.max(5, Math.round((hi - lo) / 8));
  const p = plot({ x: [Math.floor((lo - pad) / 5) * 5, Math.ceil((hi + pad) / 5) * 5], y: [0, rows.length + 1], xl: 'value', yl: 'data set', series: rows.map((x, i) => ({ label: x.name, points: x.d.x.map((v) => [v.num(), rows.length - i]), kind: 'scatter' })) }, alt, caption);
  if (meanX !== null) p.spec.vlines = [{ x: meanX, label: `mean ${meanX}`, dashed: true }];
  return p;
}
export function hist(d, xl, alt, caption, markX = null) {
  const lo = d.classes[0][0].num(), hi = d.classes[d.count - 1][1].num();
  const top = Math.ceil((Math.max(...d.f.map((f) => f.num())) * 1.25) / 2) * 2;
  const p = plot({ x: [lo, hi], y: [0, top], xl, yl: 'frequency', series: [{ label: 'frequency', points: d.x.map((x, i) => [x.num(), d.f[i].num()]), kind: 'bar' }] }, alt, caption);
  if (markX !== null) p.spec.vlines = [{ x: markX, label: `mean ${markX}`, dashed: true }];
  return p;
}
export function bars(d, xl, alt, caption) {
  const xs = d.x.map((x) => x.num()), step = xs[1] - xs[0];
  const top = Math.ceil((Math.max(...d.f.map((f) => f.num())) * 1.25) / 2) * 2;
  return plot({ x: [xs[0] - step, xs[xs.length - 1] + step], y: [0, top], xl, yl: 'frequency', series: [{ label: 'frequency', points: xs.map((x, i) => [x, d.f[i].num()]), kind: 'bar' }] }, alt, caption);
}
const sdLine = (d) => `$${sdTex(d.variance)}$`;

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Why the mean is not enough'], ['b', 'Range and coefficient of range'], ['c', 'Mean deviation: raw, discrete, grouped'], ['d', 'Variance and standard deviation: direct method']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Route map of Part 1: why the mean is not enough, the range and coefficient of range, the mean deviation about the mean for raw, discrete and grouped data, and the variance and standard deviation by the direct method.', 'Part 1 at a glance.');
V.goals1 = table(['You will be able to', 'Using', 'Key result'], [
  ['Measure the spread of a data set quickly', 'range', M(r`R = L - S, \quad \dfrac{L - S}{L + S}`)],
  ['Use every observation', 'mean deviation about the mean', M(r`\dfrac{\sum f\lvert x - \bar{x}\rvert}{n}`)],
  ['Handle grouped data', 'class marks', M(r`x = \dfrac{\text{lower} + \text{upper}}{2}`)],
  ['Square the deviations', 'variance and standard deviation', M(r`\sigma^2 = \dfrac{\sum f(x - \bar{x})^2}{n}`)],
], 'Table of goals for Part 1: the range and its coefficient, the mean deviation about the mean, class marks for grouped data, and the variance and standard deviation by the direct method.', 'What Part 1 covers.');

// why the mean is not enough: PA vs PB
{
  must(D.PA.mean.eq(50) && D.PB.mean.eq(50) && D.PA.mdMean.eq(6) && D.PB.mdMean.eq(18) && D.PA.range.eq(20) && D.PB.range.eq(60), 'PA/PB headline numbers');
  V.spread = strips([{ name: 'Meera', d: D.PA }, { name: 'Tara', d: D.PB }], 'Dot plot of the runs of two imagined cricketers over five innings each. Meera scored 40, 45, 50, 55 and 60; Tara scored 20, 35, 50, 65 and 80. Both have mean 50, shown by a dashed line, but Tara is far more spread out.', 'Same mean $50$, very different spread.', 50);
  V.cmpTbl = table(['', 'Meera', 'Tara'], [
    ['Innings', T(D.PA.x[0]) + ', ' + D.PA.x.slice(1).map((x) => T(x)).join(', '), D.PB.x.map((x) => T(x)).join(', ')],
    ['Mean', M(T(D.PA.mean)), M(T(D.PB.mean))],
    ['Range', M(T(D.PA.range)), M(T(D.PB.range))],
    ['Mean deviation', M(T(D.PA.mdMean)), M(T(D.PB.mdMean))],
    ['Standard deviation', sdLine(D.PA), sdLine(D.PB)],
  ], 'Table comparing Meera and Tara: both have mean 50; Meera has range 20, mean deviation 6 and standard deviation 5 root 2; Tara has range 60, mean deviation 18 and standard deviation 15 root 2.', 'Equal means; Tara is three times as spread.');
  must(surdOk(D.PA.variance) && sdTex(D.PA.variance) === r`5\sqrt{2}` && sdTex(D.PB.variance) === r`15\sqrt{2}`, 'PA/PB sd surds');
}
// range
{
  const S = D.SCORE, xs = S.x.map((x) => x.num()), lo = Math.min(...xs), hi = Math.max(...xs);
  must(lo === 25 && hi === 67 && S.range.eq(42) && fr(hi - lo).div(hi + lo).eq(fr('21/46')), 'range of SCORE');
  V.rangeStrip = plot({ x: [15, 77], y: [0, 2], xl: 'runs', yl: '', series: [{ label: 'innings', points: xs.map((x) => [x, 1]), kind: 'scatter' }] }, 'Dot plot of the runs 34, 58, 41, 67, 25 and 52 scored by an imagined cricketer, with the least value 25 and the greatest value 67 marked by dashed lines; the distance between them is the range 42.', 'The range is the distance from $25$ to $67$.');
  V.rangeStrip.spec.vlines = [{ x: lo, label: 'least 25', dashed: true }, { x: hi, label: 'greatest 67', dashed: true }];
  V.rangeConcept = table(['Measure', 'Formula', 'Remark'], [
    ['Range', M(r`R = L - S`), 'uses only the two extreme values'],
    ['Coefficient of range', M(r`\dfrac{L - S}{L + S}`), 'a pure number, so data in different units can be compared'],
    ['Grouped data', M(r`R = \text{upper limit of last class} - \text{lower limit of first class}`), 'taken from the class limits'],
  ], 'Table of the range, the coefficient of range and the range of grouped data, with a remark for each.', '$L$ is the greatest and $S$ the least observation.');
  V.rangeEx = table(['Step', 'Work'], [
    ['Greatest and least', M(`L = ${hi}, \\; S = ${lo}`)],
    ['Range', M(`R = ${hi} - ${lo} = ${hi - lo}`)],
    ['Coefficient of range', M(`\\dfrac{${hi} - ${lo}}{${hi} + ${lo}} = \\dfrac{${hi - lo}}{${hi + lo}} = \\dfrac{21}{46}`)],
    ['As a decimal', M(`\\approx ${fr('21/46').round(3)}`)],
  ], 'Worked example table: for the runs 34, 58, 41, 67, 25 and 52 the greatest is 67 and the least 25, so the range is 42 and the coefficient of range is 42 over 92, which is 21 over 46, about 0.457.', 'Range and coefficient of range of the six scores.');
  must(fr('21/46').round(3) === '0.457', 'coefficient of range 0.457');
}
// mean deviation concept
V.mdConcept = table(['Data', 'Mean deviation about the mean'], [
  ['Raw data $x_1, \\dots, x_n$', M(r`\dfrac{\sum \lvert x_i - \bar{x}\rvert}{n}`)],
  ['Discrete frequency distribution', M(r`\dfrac{\sum f_i\lvert x_i - \bar{x}\rvert}{n}, \quad n = \sum f_i`)],
  ['Grouped data (class marks $x_i$)', M(r`\dfrac{\sum f_i\lvert x_i - \bar{x}\rvert}{n}, \quad \bar{x} = \dfrac{\sum f_ix_i}{n}`)],
], 'Table of the three forms of the mean deviation about the mean: raw data, a discrete frequency distribution and grouped data using class marks.', 'Find $\\bar{x}$ first, then average the absolute deviations.');
V.md1 = asTable(mdTable(D.RAIN, D.RAIN.mean, XB), 'Working table for the mean deviation of the eight rainfall readings: the mean is 18, the absolute deviations add to 40, so the mean deviation is 40 over 8, which is 5.', 'Mean $18$; absolute deviations total $40$; mean deviation $5$.');
{
  const t = mdTable(D.RAIN, D.RAIN.mean, XB), last = t.rows[t.rows.length - 1];
  must(D.RAIN.mean.eq(18) && last[last.length - 1] === '40' && D.RAIN.mdMean.eq(5) && D.RAIN.sumFx.eq(144), 'RAIN md');
}
V.mdDisc = asTable(mdTable(D.BOOKS, D.BOOKS.mean, XB), 'Working table for the pages read per night by 40 pupils: n is 40, the sum of f x is 1040, the mean is 26, the sum of f times the absolute deviation is 496, so the mean deviation is 12.4.', 'Mean $26$; $\\sum f\\lvert x - \\bar{x}\\rvert = 496$; mean deviation $12.4$.');
{
  must(D.BOOKS.n.eq(40) && D.BOOKS.sumFx.eq(1040) && D.BOOKS.mean.eq(26) && D.BOOKS.sumF((x) => x.sub(26).abs()).eq(496) && T(D.BOOKS.mdMean) === '12.4', 'BOOKS md');
}
V.classMarks = table(['Class', 'Frequency $f$', 'Class mark $x$'], D.MARKS.x.map((x, i) => [cls(D.MARKS, i), T(D.MARKS.f[i]), T(x)]), 'Table of the five classes 0 to 10 up to 40 to 50 of the marks of 50 pupils with frequencies 8, 13, 8, 13 and 8 and class marks 5, 15, 25, 35 and 45.', 'The class mark is the midpoint of the class.');
must(D.MARKS.x.map((x) => T(x)).join() === '5,15,25,35,45' && D.MARKS.n.eq(50), 'class marks');
V.mdGrp = asTable(mdTable(D.MARKS, D.MARKS.mean, XB), 'Working table for the grouped marks of 50 pupils: the mean is 25, the sum of f times the absolute deviation is 580, so the mean deviation is 11.6.', 'Mean $25$; $\\sum f\\lvert x - \\bar{x}\\rvert = 580$; mean deviation $11.6$.');
must(D.MARKS.sumFx.eq(1250) && D.MARKS.sumF((x) => x.sub(25).abs()).eq(580) && T(D.MARKS.mdMean) === '11.6', 'MARKS md');
V.histMarks = hist(D.MARKS, 'marks', 'Histogram of the marks of 50 pupils in the classes 0 to 50 with frequencies 8, 13, 8, 13 and 8, drawn at the class marks, with the mean 25 marked by a dashed line.', 'The histogram is symmetric about the mean $25$.', 25);
V.mdForms = table(['Quantity', 'Raw data', 'Frequency data'], [
  ['Mean', M(r`\bar{x} = \dfrac{\sum x}{n}`), M(r`\bar{x} = \dfrac{\sum fx}{n}`)],
  ['Mean deviation', M(r`\dfrac{\sum\lvert x - \bar{x}\rvert}{n}`), M(r`\dfrac{\sum f\lvert x - \bar{x}\rvert}{n}`)],
  ['Variance', M(r`\dfrac{\sum(x - \bar{x})^2}{n}`), M(r`\dfrac{\sum f(x - \bar{x})^2}{n}`)],
  ['Standard deviation', M(r`\sigma = \sqrt{\text{variance}}`), M(r`\sigma = \sqrt{\text{variance}}`)],
], 'Table of formulas for the mean, the mean deviation about the mean, the variance and the standard deviation, for raw data and for frequency data.', 'The same four ideas for raw and frequency data.');
// comparing spread
V.cmpStrips = V.spread;
V.cmpMD = table(['Innings $x$', r`$\lvert x - 50\rvert$ (Meera)`, 'Innings $x$', r`$\lvert x - 50\rvert$ (Tara)`], D.PA.x.map((x, i) => [T(x), T(x.sub(50).abs()), T(D.PB.x[i]), T(D.PB.x[i].sub(50).abs())]).concat([['Sum', T(D.PA.sumF((x) => x.sub(50).abs())), 'Sum', T(D.PB.sumF((x) => x.sub(50).abs()))], ['Mean deviation', T(D.PA.mdMean), 'Mean deviation', T(D.PB.mdMean)]]), 'Working table for the two cricketers: the absolute deviations from the common mean 50 add to 30 for Meera and 90 for Tara, so the mean deviations are 6 and 18.', 'Larger mean deviation, larger spread.');
must(D.PA.sumF((x) => x.sub(50).abs()).eq(30) && D.PB.sumF((x) => x.sub(50).abs()).eq(90), 'PA PB sums');
// variance direct
V.varConcept = table(['Quantity', 'Formula', 'Unit'], [
  ['Variance', M(r`\sigma^2 = \dfrac{\sum f(x - \bar{x})^2}{n}`), 'square of the unit of the data'],
  ['Standard deviation', M(r`\sigma = \sqrt{\dfrac{\sum f(x - \bar{x})^2}{n}}`), 'same unit as the data'],
  ['Equivalent form', M(r`\sigma^2 = \dfrac{\sum fx^2}{n} - \bar{x}^2`), 'handy when the mean is awkward'],
], 'Table of the variance, the standard deviation and the equivalent form of the variance, with the unit of each.', 'Squaring removes the signs; the root restores the unit.');
V.dir1 = asTable(dirTable(D.BOX), 'Working table for the masses of five parcels 18, 7, 10, 6 and 14 kilograms: mean 11, deviations 7, minus 4, minus 1, minus 5 and 3, squared deviations adding to 100, so the variance is 20.', 'Mean $11$; $\\sum(x - \\bar{x})^2 = 100$; variance $20$.');
{
  must(D.BOX.mean.eq(11) && D.BOX.sumF((x) => x.sub(11).pow(2)).eq(100) && D.BOX.variance.eq(20) && sdTex(D.BOX.variance) === r`2\sqrt{5}` && sdRound(D.BOX.variance, 2) === '4.47' && D.BOX.varianceShortcut.eq(20), 'BOX');
}
{
  const sq = D.BOX.sumF((x) => x.pow(2)), ms = sq.div(5);
  must(sq.eq(705) && ms.eq(141) && ms.sub(121).eq(20) && D.BOX.varianceShortcut.eq(20) && D.BOX.sumFx.eq(55), 'BOX alt numbers');
  V.varAlt = table(['Step', 'Work'], [
    ['Sum of squares', M(`\\sum x^2 = ${T(sq)}`)],
    ['Mean of squares', M(`\\dfrac{\\sum x^2}{n} = \\dfrac{${T(sq)}}{5} = ${T(ms)}`)],
    ['Variance', M(`${T(ms)} - 11^2 = ${T(D.BOX.varianceShortcut)}`)],
    ['Standard deviation', M(r`\sqrt{20} = 2\sqrt{5} \approx 4.47`)],
  ], 'Table that checks the parcel variance by the equivalent form: the sum of squares is 705, so 705 over 5 is 141, and 141 minus 11 squared is 20; the standard deviation is the square root of 20, which is 2 root 5, about 4.47.', 'Both routes give the same variance.');
}
V.dirDisc = asTable(dirTable(D.MINS), 'Working table for the practice minutes of 40 players: n is 40, the mean is 36, the sum of f times the squared deviation is 6760, so the variance is 169 and the standard deviation is 13.', 'Mean $36$; $\\sum f(x - \\bar{x})^2 = 6760$; variance $169$; $\\sigma = 13$.');
must(D.MINS.n.eq(40) && D.MINS.mean.eq(36) && D.MINS.sumF((x) => x.sub(36).pow(2)).eq(6760) && D.MINS.variance.eq(169) && D.MINS.variance.sqrt().eq(13), 'MINS');
