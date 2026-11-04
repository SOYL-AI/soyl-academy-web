// Build CBSE 11 Economics ch06 Correlation. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch06/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch06', 'economics-commerce');
const Qs = await import('./questions.mjs');
const {
  S, R, L, st, stRaw, stU, stV, stT, stX2, stY2, stT2, stNeg, stShift, stHalf, ST_X, ST_Y,
  fr, FR_X, FR_Y, rn, RN_X, RN_Y, ut, UT_X, UT_Y, SC_X, SC, scR, jg5, JG5, t1, T1, BT, btRanks,
  cfEach, EX, ex, exSp, se, SE,
} = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const neg = (x) => (x < 0 ? `negative ${S(-x)}` : S(x));
const f2 = (v) => String(rnd(v, 2));

// ---------------------------------------------------------------- figures (computed, never typed)
check(st.r, 0.8, 2, 'study r');
check(rn.r, 0.86, 2, 'rain r');
check(fr.r, -0.6, 2, 'fruit r');
check(ut.r, 0, 2, 'U-shape r');
check(t1.rs, 0.8, 2, 'two-test rs');
check(jg5.rs, 0.8, 2, 'debate rs');
check(ex.r, 0.75, 2, 'extreme r');
// The dashed U-curve drawn through the Himgiri points is y = 8 + 2((x - 24) / 4)^2; every data point lies on it.
const uCurve = (x) => 8 + 2 * ((x - 24) / 4) ** 2;
UT_X.forEach((x, i) => assert.equal(uCurve(x), UT_Y[i], `U-curve passes through point ${i}`));

// ---------------------------------------------------------------- SVG helpers
function scatter(s, o) {
  const ch = s.chart({ x0: o.x0, x1: o.x1, y0: o.y0, y1: o.y1, left: o.left, top: o.top, width: o.width, height: o.height, xLabel: o.xLabel, yLabel: o.yLabel });
  (o.xTicks ?? []).forEach((v) => ch.xTick(v, String(v)));
  (o.yTicks ?? []).forEach((v) => ch.yTick(v, String(v)));
  if (o.mx !== undefined) s.line(ch.X(o.mx), ch.Y(o.y0), ch.X(o.mx), ch.Y(o.y1), { sw: 1.2, dash: true, color: 'muted' });
  if (o.my !== undefined) s.line(ch.X(o.x0), ch.Y(o.my), ch.X(o.x1), ch.Y(o.my), { sw: 1.2, dash: true, color: 'muted' });
  o.xs.forEach((x, i) => s.dot(ch.X(x), ch.Y(o.ys[i]), o.dot ?? 5, o.colors ? o.colors[i] : (o.color ?? 'accent')));
  return ch;
}
function panel(s, left, top, xs, ys, title, rr) {
  const ymax = Math.ceil(Math.max(...ys) * 1.15);
  scatter(s, { x0: 0, x1: 8, y0: 0, y1: ymax, left, top, width: 170, height: 150, xLabel: 'x', yLabel: 'y', xs, ys, dot: 4.5 });
  s.text(left + 85, top - 34, title, { size: 13, bold: true });
  s.text(left + 85, top + 192, `r = ${R(rr)}`, { size: 13 });
}
const vScat3 = (() => {
  const s = new Svg(690, 290);
  panel(s, 50, 60, SC_X, SC.highPos, 'High positive', scR.highPos);
  panel(s, 270, 60, SC_X, SC.highNeg, 'High negative', scR.highNeg);
  panel(s, 490, 60, SC_X, SC.none, 'No correlation', scR.none);
  return s.visual(`Three scatter diagrams of seven imagined pairs of values: dots rising and close to a line, r ${R(scR.highPos)}; dots falling and close to a line, r ${R(scR.highNeg)}; dots with no direction, r ${R(scR.none)}`, 'Imagined pairs of values: positive, negative and no correlation');
})();
const vScatDeg = (() => {
  const s = new Svg(690, 290);
  panel(s, 50, 60, SC_X, SC.perfectPos, 'Perfect positive', scR.perfectPos);
  panel(s, 270, 60, SC_X, SC.perfectNeg, 'Perfect negative', scR.perfectNeg);
  panel(s, 490, 60, SC_X, SC.lowPos, 'Low positive', scR.lowPos);
  return s.visual(`Three scatter diagrams of seven imagined pairs of values: all dots on a rising line, r ${R(scR.perfectPos)}; all dots on a falling line, r ${R(scR.perfectNeg)}; widely spread dots with a slight rise, r ${R(scR.lowPos)}`, 'Imagined pairs of values: perfect positive, perfect negative and low correlation');
})();
const vStudy = (() => {
  const s = new Svg(640, 340);
  const ch = scatter(s, { x0: 3, x1: 9, y0: 40, y1: 70, left: 70, top: 40, width: 500, height: 230, xLabel: 'Hours of study a day', yLabel: 'Marks', xTicks: [4, 5, 6, 7, 8], yTicks: [40, 50, 60, 70], xs: ST_X, ys: ST_Y, mx: st.mx, my: st.my, dot: 6 });
  s.text(ch.X(st.mx) + 6, ch.Y(70) + 10, `mean ${S(st.mx)} hours`, { anchor: 'start', size: 12, muted: true });
  s.text(ch.X(9) - 4, ch.Y(st.my) - 10, `mean ${S(st.my)} marks`, { anchor: 'end', size: 12, muted: true });
  s.text(ch.X(8.4), ch.Y(66), '+', { size: 18, bold: true });
  s.text(ch.X(3.6), ch.Y(44), '+', { size: 18, bold: true });
  s.text(ch.X(3.6), ch.Y(66), '−', { size: 18, bold: true });
  s.text(ch.X(8.4), ch.Y(44), '−', { size: 18, bold: true });
  return s.visual(`Scatter diagram of the daily hours of study and marks of five imagined students of Lotus Valley School: ${ST_X.map((x, i) => `${x} hours and ${ST_Y[i]} marks`).join(', ')}, with dashed lines at the means ${S(st.mx)} hours and ${S(st.my)} marks; the dots lie in the lower left and upper right sections, where the product of the deviations is positive`, 'Imagined Lotus Valley School students: the means divide the graph into four sections. Axes start at 3 and 40.');
})();
const vRain = (() => {
  const s = new Svg(640, 340);
  scatter(s, { x0: 30, x1: 110, y0: 8, y1: 26, left: 70, top: 40, width: 500, height: 230, xLabel: 'Rainfall (cm)', yLabel: 'Paddy yield (quintals per hectare)', xTicks: [40, 60, 80, 100], yTicks: [10, 15, 20, 25], xs: RN_X, ys: RN_Y, dot: 6 });
  return s.visual(`Scatter diagram of rainfall in cm and paddy yield in quintals per hectare over seven years in the imagined district of Kaveripur: ${RN_X.map((x, i) => `${x} and ${RN_Y[i]}`).join(', ')}; the dots rise from lower left to upper right, coefficient ${S(rn.r)}`, 'Imagined Kaveripur district: wetter years go with higher yields. Axes start at 30 and 8.');
})();
const vFruitScatter = (() => {
  const s = new Svg(640, 340);
  scatter(s, { x0: 110, x1: 170, y0: 20, y1: 60, left: 70, top: 40, width: 500, height: 230, xLabel: 'Price (Rs per kg)', yLabel: 'Quantity sold (kg)', xTicks: [120, 130, 140, 150, 160], yTicks: [20, 30, 40, 50, 60], xs: FR_X, ys: FR_Y, mx: fr.mx, my: fr.my, dot: 6 });
  return s.visual(`Scatter diagram of the price of apples and the quantity sold on five days at the imagined Mango Mart: ${FR_X.map((x, i) => `Rs ${x} and ${FR_Y[i]} kg`).join(', ')}; the dots fall from upper left to lower right, coefficient ${R(fr.r)}`, 'Imagined Mango Mart: higher prices go with smaller quantities. Axes start at 110 and 20.');
})();
const vU = (() => {
  const s = new Svg(640, 340);
  const ch = scatter(s, { x0: 8, x1: 40, y0: 0, y1: 30, left: 70, top: 40, width: 500, height: 230, xLabel: 'Temperature (degrees)', yLabel: 'Electricity use (units a day)', xTicks: [12, 16, 20, 24, 28, 32, 36], yTicks: [0, 10, 20, 30], xs: UT_X, ys: UT_Y, dot: 6 });
  const pts = [];
  for (let i = 0; i <= 56; i++) { const x = 12 + (24 * i) / 56; pts.push([ch.X(x), ch.Y(uCurve(x))]); }
  s.polyline(pts, { sw: 1.4, dash: true, color: 'muted' });
  s.text(ch.X(24), ch.Y(8) + 18, `coefficient ${S(ut.r)}`, { size: 13, bold: true });
  return s.visual(`Scatter diagram of daily temperature and electricity use over seven days in the imagined hill town of Himgiri: ${UT_X.map((x, i) => `${x} and ${UT_Y[i]}`).join(', ')}; the dots follow a U-shaped curve, shown dashed, and the coefficient of correlation is ${S(ut.r)}`, 'Imagined hill town: a strong curved relation with a coefficient of zero. Axes start at 8 and 0.');
})();
const vExt = (() => {
  const s = new Svg(640, 340);
  scatter(s, { x0: 0, x1: 220, y0: 2, y1: 8, left: 70, top: 40, width: 500, height: 230, xLabel: 'Sales (Rs thousand)', yLabel: 'Customer rating', xTicks: [20, 60, 100, 140, 180, 220], yTicks: [2, 3, 4, 5, 6, 7, 8], xs: EX.x, ys: EX.y, colors: EX.x.map((x) => (x === Math.max(...EX.x) ? 'red' : 'accent')), dot: 6 });
  s.text(300, 90, `Karl Pearson ${S(ex.r)}`, { size: 14, bold: true });
  s.text(300, 112, `rank correlation ${S(exSp.rs)}`, { size: 14, bold: true });
  return s.visual(`Scatter diagram of monthly sales in Rs thousand and customer ratings of five imagined shops: ${EX.x.map((x, i) => `${x} and ${EX.y[i]}`).join(', ')}; the shop with sales of ${Math.max(...EX.x)} is far from the rest; Karl Pearson's coefficient is ${S(ex.r)} but the rank correlation is ${S(exSp.rs)}`, 'Imagined shops: one extreme value lowers Karl Pearson\'s coefficient but not the rank correlation. Axes start at 0 and 2.');
})();

// ---------------------------------------------------------------- tables and flows
const workTable = (xs, ys, p, xh, yh, alt, cap) => table(
  [xh, yh, 'x minus mean', 'y minus mean', 'Product of deviations', 'Square of x', 'Square of y'],
  [
    ...xs.map((x, i) => [String(x), String(ys[i]), f2(p.dx[i]), f2(p.dy[i]), `**${f2(p.dx[i] * p.dy[i])}**`, f2(p.dx[i] ** 2), f2(p.dy[i] ** 2)]),
    [`**${f2(sum(xs))}**`, `**${f2(sum(ys))}**`, `**${f2(sum(p.dx))}**`, `**${f2(sum(p.dy))}**`, `**${f2(p.sxy)}**`, `**${f2(p.sxx)}**`, `**${f2(p.syy)}**`],
  ],
  alt, cap,
);
const vRoute1 = flow('LR', ['Meaning of correlation', 'Scatter diagram', 'Causation caution', 'Properties of the coefficient', 'The non-linear case'], 'Route map of Part 1: meaning of correlation, scatter diagram, causation caution, properties of the coefficient and the non-linear case', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Karl Pearson coefficient', 'Working table', 'Reading the value', 'Rank correlation', 'Ties and choice of measure'], 'Route map of Part 2: Karl Pearson coefficient, working table, reading the value, rank correlation, ties and the choice of measure', 'Part 2 at a glance');
const vTypes = table(
  ['Kind', 'Meaning', 'Imagined example'],
  [
    ['Positive', 'The variables rise and fall together', 'Temperature and cold drink sales at a juice corner'],
    ['Negative', 'One rises while the other falls', 'Temperature and hot soup sales at a hill stall'],
    ['Linear', 'The dots lie around a straight line', 'Hours of study and marks of a class'],
    ['Non-linear', 'The dots follow a curve', 'Temperature and electricity use in a hill town'],
    ['None', 'The dots show no pattern', 'Shoe size and marks of students'],
  ],
  'Table of kinds of correlation, positive, negative, linear, non-linear and none, each with its meaning and an imagined example',
);
const vDegrees = table(
  ['Degree', 'The dots', 'Coefficient'],
  [
    ['Perfect positive', 'All on one rising straight line', `**${R(scR.perfectPos)}**`],
    ['High positive', 'Close to a rising line', `**${R(scR.highPos)}**`],
    ['Low positive', 'Widely spread, rising a little', `**${R(scR.lowPos)}**`],
    ['No correlation', 'No direction at all', `**${R(scR.none)}**`],
    ['High negative', 'Close to a falling line', `**${R(scR.highNeg)}**`],
    ['Perfect negative', 'All on one falling straight line', `**${R(scR.perfectNeg)}**`],
  ],
  `Table of the degrees of correlation with the shape of the dots and the coefficient of each imagined set: ${R(scR.perfectPos)}, ${R(scR.highPos)}, ${R(scR.lowPos)}, ${R(scR.none)}, ${R(scR.highNeg)}, ${R(scR.perfectNeg)}`,
  'Imagined sets of seven dots, as drawn in the figures.',
);
const vRainRead = table(
  ['Question about the dots', 'Answer for Kaveripur'],
  [
    ['Do they rise or fall?', 'They rise: positive'],
    ['Are they close to a line?', 'Fairly close: high'],
    ['Mean rainfall and mean yield', `${S(rn.mx)} cm and ${S(rn.my)} quintals`],
    ['Coefficient of correlation', `**${S(rn.r)}**`],
  ],
  `Table reading the scatter diagram of rainfall and paddy yield of the imagined district of Kaveripur: rising dots, fairly close to a line, means ${S(rn.mx)} and ${S(rn.my)}, coefficient ${S(rn.r)}`,
  'Imagined Kaveripur district, seven years.',
);
const vCause = flow('LR', ['Hot sunny weather', 'More ice cream sold', 'More sunburn cases'], 'Flow diagram in which hot sunny weather leads to more ice cream sold and also leads to more sunburn cases, so the two moves together without one causing the other', 'A third variable moves both', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }]);
const vMislead = table(
  ['Reason', 'Imagined case'],
  [
    ['A third variable', 'Hot weather raises both ice cream sales and sunburn in a seaside town'],
    ['Chance', 'Two unrelated series that happen to rise together over a few years'],
    ['Reverse direction', 'Do firms advertise more because sales are high, or are sales high because of advertising?'],
  ],
  'Table of three reasons why a strong correlation may not show cause: a third variable, chance and reverse direction, each with an imagined case',
);
const vProps = table(
  ['Property', 'What it means'],
  [
    ['Limits', 'It always lies between −1 and +1'],
    ['No unit', 'It is a pure number, because the units of the two variables cancel'],
    ['Origin', 'Adding or subtracting the same number from every value does not change it'],
    ['Scale', 'Multiplying or dividing every value by a positive number does not change it'],
    ['Sign and size', 'The sign shows direction; the distance from zero shows strength'],
  ],
  'Table of the properties of the coefficient of correlation: limits, no unit, change of origin, change of scale, and sign and size',
);
const vOrigin = table(
  ['Version of the data', 'Coefficient'],
  [
    ['Original hours and marks', `**${S(st.r)}**`],
    ['Hours increased by 2', `${S(stShift.r)}`],
    ['Marks divided by 5', `${S(stHalf.r)}`],
    ['x = 10 × hours + 3 and y = marks ÷ 5', `${S(stT2.r)}`],
    [`u = hours − ${S(st.mx)} and v = (marks − ${S(st.my)}) ÷ 5`, `${S(stT.r)}`],
    ['Hours multiplied by −1', `${R(stNeg.r)}`],
  ],
  `Table of the coefficient for the imagined Lotus Valley data under changes of origin and scale: original ${S(st.r)}, hours plus 2 ${S(stShift.r)}, marks divided by 5 ${S(stHalf.r)}, two transformed versions ${S(stT2.r)} and ${S(stT.r)}, and hours multiplied by negative 1 ${R(stNeg.r)}`,
  'Imagined Lotus Valley School students. Only a negative multiplier reverses the sign.',
);
const vUTable = workTable(UT_X, UT_Y, ut, 'Temperature', 'Use (units)', `Working table for the imagined hill town of Himgiri: the products of the deviations are ${L(ut.dx.map((a, i) => a * ut.dy[i]))}, so the total is ${S(ut.sxy)} and the coefficient is ${S(ut.r)}`, 'Imagined Himgiri figures: positive and negative products cancel.');
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Correlation', 'Degree and direction of the linear relationship between two variables'],
    ['Scatter diagram', 'One dot for each pair of values; shows direction and closeness'],
    ['Perfect and none', 'Perfect: dots on a line, coefficient −1 or +1; none: no pattern, near 0'],
    ['Causation', 'Correlation does not prove cause; look for a third variable'],
    ['Properties', 'Between −1 and +1; no unit; unaffected by change of origin and scale'],
    ['Zero coefficient', 'No linear relation, but a curved relation may exist'],
  ],
  'Summary table of Part 1: correlation, scatter diagram, perfect and no correlation, causation, properties and the zero coefficient',
);
const vForm = table(
  ['Symbol', 'Meaning'],
  [
    ['x', 'A value of the first variable minus the mean of the first variable'],
    ['y', 'A value of the second variable minus the mean of the second variable'],
    ['Σxy', 'The sum of the products of the paired deviations'],
    ['Σx² and Σy²', 'The sums of the squared deviations of each variable'],
    ['r', 'Σxy divided by the square root of Σx² times Σy²'],
  ],
  'Table of the symbols in Karl Pearson\'s formula: deviations x and y, the sum of products Σxy, the sums of squares Σx² and Σy², and the coefficient r',
);
const vSteps = flow('LR', ['Find both means', 'Find deviations x and y', 'Products and squares', 'Add the columns', 'Divide Σxy by the root'], 'Flow of the steps for Karl Pearson\'s coefficient: find both means, find deviations, form products and squares, add the columns, then divide the sum of products by the square root of the product of the sums of squares', 'Steps of the working');
const vPearsonTable = workTable(ST_X, ST_Y, st, 'Hours (x)', 'Marks (y)', `Working table for the imagined Lotus Valley students: Σxy ${S(st.sxy)}, Σx² ${S(st.sxx)}, Σy² ${S(st.syy)}, coefficient ${S(st.r)}`, 'Imagined Lotus Valley School students: means 6 and 55.');
const vRaw = table(
  ['Quantity', 'Working', 'Value'],
  [
    ['n', 'Number of pairs', String(stRaw.n)],
    ['Σx and Σy', `${L(ST_X)} and ${L(ST_Y)} added`, `${stRaw.sx} and ${stRaw.sy}`],
    ['Σxy', 'Sum of each hours value times its marks value', String(stRaw.sxy)],
    ['Σx² and Σy²', 'Sums of squares of the actual values', `${stRaw.sxx} and ${stRaw.syy}`],
    ['n Σxy − Σx Σy', `${stRaw.n} × ${stRaw.sxy} − ${stRaw.sx} × ${stRaw.sy}`, `**${stRaw.top}**`],
    ['n Σx² − (Σx)²', `${stRaw.n} × ${stRaw.sxx} − ${stRaw.sx}²`, `**${stRaw.dx}**`],
    ['n Σy² − (Σy)²', `${stRaw.n} × ${stRaw.syy} − ${stRaw.sy}²`, `**${stRaw.dy}**`],
    ['Coefficient', `${stRaw.top} ÷ √(${stRaw.dx} × ${stRaw.dy})`, `**${S(stRaw.r)}**`],
  ],
  `Table of the actual-value working for the imagined Lotus Valley students: numerator ${stRaw.top}, the two parts ${stRaw.dx} and ${stRaw.dy}, coefficient ${S(stRaw.r)}, the same as the deviation method`,
  'Imagined Lotus Valley School students: the actual-value form gives the same coefficient.',
);
const vFruitTable = workTable(FR_X, FR_Y, fr, 'Price (Rs)', 'Quantity (kg)', `Working table for the imagined Mango Mart: Σxy ${R(fr.sxy)}, Σx² ${S(fr.sxx)}, Σy² ${S(fr.syy)}, coefficient ${R(fr.r)}`, 'Imagined Mango Mart: means Rs 140 and 40 kg.');
const vInterp = table(
  ['Value', 'A common reading'],
  [
    ['+1', 'Perfect positive'],
    ['+0.9', 'Very strong positive'],
    ['+0.3', 'Weak positive'],
    ['0', 'No linear relation'],
    ['−0.7', 'Fairly strong negative'],
    ['−1', 'Perfect negative'],
  ],
  'Table of values of a coefficient of correlation with a common rough reading: +1 perfect positive, +0.9 very strong positive, +0.3 weak positive, 0 no linear relation, −0.7 fairly strong negative, −1 perfect negative',
  'A rough guide; the bands are not fixed rules. Neither sign nor size proves cause.',
);
const vRankFlow = flow('LR', ['Rank each series, 1 for the highest', 'Tied values share the average rank', 'Find D and square it', 'Add the correction factors', 'Put the total in the formula'], 'Flow of the steps for rank correlation: rank each series from the highest, give tied values the average rank, find the differences and square them, add the correction factor for ties, then use the formula', 'The rank correlation route');
const vRankTie = table(
  ['Player', 'Score', 'Place in order', 'Rank'],
  BT.map((b, i) => [`Player ${i + 1}`, String(b), [...BT].sort((a, c) => c - a).indexOf(b) + 1 + (BT.filter((x) => x === b).length > 1 ? `–${[...BT].sort((a, c) => c - a).indexOf(b) + BT.filter((x) => x === b).length}` : ''), `**${btRanks[i]}**`]),
  `Table of the scores of six imagined players with their ranks ${L(btRanks)}; the three tied scores share ranks 3 to 5 and each gets ${btRanks[1]}`,
  'Imagined batters: the tied score of 35 takes places 3, 4 and 5, so each gets 4.',
);
const vJudge = table(
  ['Contestant', 'First judge', 'Second judge', 'D', 'D squared'],
  [
    ...JG5.names.map((n, i) => [n, String(JG5.j1[i]), String(JG5.j2[i]), String(jg5.D[i]), String(jg5.D[i] ** 2)]),
    ['**Total**', '', '', `**${f2(sum(jg5.D))}**`, `**${f2(jg5.D2)}**`],
  ],
  `Working table for two imagined judges of a school debate: the differences ${L(jg5.D)} add to ${sum(jg5.D)} and the squares add to ${f2(jg5.D2)}, so the rank correlation is ${S(jg5.rs)}`,
  'Imagined debate contestants. The differences always add to zero.',
);
const vCf = table(
  ['Tied group of m items', 'm cubed minus m', 'Correction factor'],
  [2, 3, 4].map((m) => [String(m), String(m ** 3 - m), `**${f2((m ** 3 - m) / 12)}**`]),
  `Table of the correction factor for groups of 2, 3 and 4 tied items: ${[2, 3, 4].map((m) => f2((m ** 3 - m) / 12)).join(', ')}`,
  'The factor is added to ΣD² once for every tied group.',
);
check((2 ** 3 - 2) / 12, cfEach[0], 6, 'pair factor');
check((3 ** 3 - 3) / 12, cfEach[1], 6, 'triple factor');
const vTie = table(
  ['Student', 'Monday', 'Friday', 'Rank Monday', 'Rank Friday', 'D', 'D squared'],
  T1.a.map((a, i) => [String(i + 1), String(a), String(T1.b[i]), String(t1.r1[i]), String(t1.r2[i]), f2(t1.D[i]), f2(t1.D[i] ** 2)]).concat([['**Total**', '', '', '', '', '', `**${f2(t1.D2)}**`]]),
  `Working table for six imagined students: tied Monday scores share rank ${t1.r1[1]}; ΣD² is ${f2(t1.D2)}, the correction factor is ${f2(t1.cf)}, and the rank correlation is ${S(t1.rs)}`,
  'Imagined Sagar Coaching Institute students. One pair of equal Monday scores shares ranks 3 and 4.',
);
const vCompare = table(
  ['Point', 'Karl Pearson\'s coefficient', 'Rank correlation'],
  [
    ['Data', 'Measured values', 'Ranks, or qualitative data'],
    ['Uses', 'Deviations from the means', 'Differences of ranks'],
    ['Extreme values', 'Affects it strongly', 'Affects it little'],
    ['Imagined shops', `**${S(ex.r)}**`, `**${S(exSp.rs)}**`],
  ],
  `Table comparing Karl Pearson's coefficient and rank correlation on data, quantities used and extreme values, with the values ${S(ex.r)} and ${S(exSp.rs)} for the imagined shops`,
  'Imagined shops with one very large sales figure.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Karl Pearson', 'r = Σxy ÷ √(Σx² × Σy²), with deviations from the means'],
    ['Actual-value form', 'Gives the same value; uses n Σxy − Σx Σy over the two root terms'],
    ['Sign and size', 'Sign of Σxy is the sign of r; stay between −1 and +1'],
    ['Rank correlation', 'rs = 1 − 6ΣD² ÷ (n³ − n); rank 1 is the highest'],
    ['Ties', 'Average ranks; add (m³ − m) ÷ 12 for each tied group to ΣD²'],
    ['Choice', 'Rank correlation for ranks, qualitative data and extreme values'],
  ],
  'Summary table of Part 2: Karl Pearson formula, actual-value form, sign and size, rank correlation, ties and the choice of measure',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Correlation — Part 1: Meaning, Scatter Diagram and Properties',
  goals: [
    'Define correlation and distinguish positive, negative, linear and non-linear relations',
    'Draw and read a scatter diagram for perfect, high, low and no correlation',
    'Explain why correlation does not prove causation, using a third variable and spurious correlation',
    'State the properties of the coefficient and show that it is unaffected by a change of origin and scale',
  ],
  slides: [
    sl('title', 'Correlation', {
      b: 'Part 1 — how two variables **move together**, and how a **scatter diagram** shows it.',
      v: vRoute1,
      n: 'Do students who study longer score higher marks? Do higher prices mean fewer sales? Correlation is the tool for such questions about two variables. In this part we learn what correlation means, how a scatter diagram shows it, why correlation is not cause, and what properties its coefficient has. All the data are imagined.',
    }),
    sl('concept', 'What is correlation?', {
      b: '**Correlation** is the degree and direction of the **linear** relationship between two variables.',
      v: vTypes,
      n: 'Correlation tells us how closely two variables are related along a straight line, and in which direction. If both rise and fall together, the correlation is positive. If one rises while the other falls, it is negative. A relation is linear when the points lie around a straight line, and non linear when they follow a curve.',
    }),
    sl('diagram', 'Scatter diagrams: positive, negative and none', {
      v: vScat3,
      n: `Each dot is one pair of values. In the first picture the dots rise and lie close to a line, so the correlation is high and positive, with a coefficient of ${S(scR.highPos)}. In the second they fall, giving ${neg(scR.highNeg)}. In the third there is no direction at all, and the coefficient is ${S(scR.none)}.`,
    }),
    sl('check', 'Quick check: the meaning', {
      b: 'Which statement best defines correlation?',
      chk: 'm_def',
      n: 'Think about what correlation measures. It is about how two variables move together, in a straight line pattern. Choose the option that mentions both the degree and the direction of that relationship.',
    }),
    sl('concept', 'Drawing a scatter diagram', {
      b: 'Put one variable on each axis and mark a **dot** for every pair of values.',
      bl: ['The dashed lines mark the **means** of the two variables.', 'Dots in the upper right and lower left sections give positive products of deviations.'],
      v: vStudy,
      n: `Here are five imagined students of Lotus Valley School. Hours of study go along the horizontal axis and marks go up the vertical axis. The dashed lines mark the two means, ${S(st.mx)} hours and ${S(st.my)} marks. The dots lie in the lower left and upper right sections, which tells us at once that the correlation is positive.`,
    }),
    sl('diagram', 'Perfect, perfect and low correlation', {
      v: vScatDeg,
      n: `When all dots lie exactly on a rising straight line, the correlation is perfect positive and the coefficient is ${S(scR.perfectPos)}. On a falling straight line it is perfect negative, with ${neg(scR.perfectNeg)}. When the dots are widely spread with only a slight rise, the correlation is low and positive, here ${S(scR.lowPos)}.`,
    }),
    sl('concept', 'Degrees of correlation', {
      b: 'The closer the dots are to a straight line, the **higher** the correlation; the direction gives the **sign**.',
      v: vDegrees,
      n: 'Here are the six cases side by side. Perfect correlation means all the dots lie on one straight line. High correlation means they lie close to a line. Low correlation means they are widely spread. No correlation means no pattern at all. A rising line gives a positive sign and a falling line gives a negative sign.',
    }),
    sl('example', 'Worked example 1: reading a scatter diagram', {
      b: 'An officer of the imagined district of Kaveripur plotted rainfall against paddy yield for seven years. Read the diagram.',
      bl: [
        '**Direction:** the dots rise from lower left to upper right, so the correlation is positive.',
        '**Closeness:** the dots lie fairly close to a rising line, so it is high.',
        `**Figures:** the mean rainfall is ${S(rn.mx)} cm and the mean yield is ${S(rn.my)} quintals.`,
        `**Coefficient:** it works out to **${S(rn.r)}**, a high positive value.`,
      ],
      v: vRain,
      n: `The dots rise from lower left to upper right, so the correlation is positive, and they lie fairly close to a line, so it is high. The mean rainfall is ${S(rn.mx)} centimetres and the mean yield is ${S(rn.my)} quintals. The coefficient of correlation is ${S(rn.r)}. Wetter years in this imagined district go with higher yields.`,
    }),
    sl('check', 'Quick check: does it prove cause?', {
      b: 'A high coefficient between study hours and marks. Does it prove that studying longer causes higher marks?',
      chk: 'tf_cause',
      n: 'A coefficient describes how two variables move together. Ask yourself whether anything else could be affecting both of them, such as ability or sleep, before you decide if it proves cause.',
    }),
    sl('concept', 'Correlation is not causation', {
      b: 'Two variables can move together because a **third variable** affects both.',
      v: vCause,
      n: 'In an imagined seaside town, ice cream sales and sunburn cases rise together. Ice cream does not cause sunburn. Hot sunny weather, a third variable, raises both. So a high coefficient shows that variables move together, but it does not show that one causes the other.',
    }),
    sl('concept', 'Why a strong correlation may mislead', {
      b: 'A link produced by chance or by a third variable, and not by a real connection, is a **spurious correlation**.',
      v: vMislead,
      n: 'There are three common reasons for caution. A third variable may drive both. The link may be pure chance, especially over a few years. Or the direction of influence may be the opposite of what we assume. A link made by chance or a third variable is called a spurious correlation.',
    }),
    sl('concept', 'Properties of the coefficient', {
      b: 'The coefficient lies between **−1 and +1**, has **no unit**, and ignores a change of **origin** and **scale**.',
      v: vProps,
      n: 'The coefficient always lies between negative one and positive one. It has no unit, since the two units cancel out. Adding the same number to every value, or multiplying every value by a positive number, does not change it. Its sign shows the direction and its distance from zero shows the strength.',
    }),
    sl('example', 'Worked example 2: origin and scale', {
      b: `The coefficient for the Lotus Valley data is ${S(st.r)}. Change the data and see what happens.`,
      bl: [
        `Add 2 to every hours value: the coefficient stays **${S(stShift.r)}**.`,
        `Divide every mark by 5: it stays **${S(stHalf.r)}**.`,
        `Use u = hours − ${S(st.mx)} and v = (marks − ${S(st.my)}) ÷ 5: the new values are small, and it is still **${S(stT.r)}**.`,
        `Multiply hours by −1: only the sign turns, to **${R(stNeg.r)}**.`,
      ],
      v: vOrigin,
      n: `We changed the imagined Lotus Valley data in several ways. Adding two to the hours leaves the coefficient at ${S(stShift.r)}. Dividing the marks by five leaves it at ${S(stHalf.r)}. A shift of origin together with a change of scale also leaves it at ${S(stT.r)}. Only multiplying one variable by a negative number reverses the sign.`,
    }),
    sl('check', 'Quick check: a change of origin', {
      b: 'Every student studies 2 hours more, while marks stay the same. What happens to the coefficient?',
      chk: 'm_origin',
      n: 'Adding the same number to every value moves each value and its mean by the same amount. Think about what that does to the deviations from the mean, and so to the coefficient.',
    }),
    sl('concept', 'When the coefficient is zero', {
      b: 'A coefficient of zero means **no linear** relation. A **curved** relation may still exist.',
      v: vU,
      n: `In an imagined hill town, electricity use is high on very cold days because of heaters and on very hot days because of fans. The dots form a U shape. The coefficient is ${S(ut.r)}, yet use depends strongly on temperature. The coefficient measures only straight line relations, so zero does not mean no relation of any kind.`,
    }),
    sl('example', 'Worked example 3: a U-shaped relation', {
      b: 'Find the coefficient for the imagined hill town of Himgiri.',
      bl: [
        `Step 1 — Means: ${S(ut.mx)} degrees and ${S(ut.my)} units.`,
        `Step 2 — Products of deviations: ${L(ut.dx.map((a, i) => a * ut.dy[i]))}.`,
        `Step 3 — The positive and negative products cancel, so Σxy = **${S(ut.sxy)}**.`,
        `Step 4 — The coefficient is ${S(ut.sxy)} divided by the root of ${S(ut.sxx)} times ${S(ut.syy)}, which is **${S(ut.r)}**.`,
      ],
      v: vUTable,
      n: `We find the deviations of temperature and of electricity use from their means. The products of the deviations are positive at both ends and negative in the middle, and they cancel exactly, so the sum is ${S(ut.sxy)}. The coefficient is therefore ${S(ut.r)}, even though the curve is strong.`,
    }),
    sl('check', 'Quick check: patterns of dots', {
      b: 'Match each pattern of dots with the kind of correlation it shows.',
      chk: 'mt_scatter',
      n: 'For each pattern, ask whether the dots lie on a line, in which direction the line slopes, or whether there is no pattern at all. Then pair it with the kind of correlation.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To recap. Correlation is the degree and direction of the linear relationship between two variables. A scatter diagram shows it with one dot for each pair. Perfect correlation puts all dots on a line. Correlation does not prove cause, because a third variable may be at work. The coefficient lies between negative one and one, has no unit, and ignores a change of origin and scale.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define correlation as the **degree and direction of the linear relationship**.',
        'Read a scatter diagram for **direction** and **closeness** before naming the degree.',
        'Never say that a high coefficient **proves cause**; name a possible third variable.',
        'State the three properties: **limits, no unit, origin and scale**.',
        'Remember that **zero** means no linear relation, not no relation at all.',
      ],
      n: 'A few tips. Define correlation as the degree and direction of the linear relationship. When you read a scatter diagram, look at the direction and the closeness of the dots. Never say that a high coefficient proves cause, and name a possible third variable. State the properties of the coefficient. And remember that zero means no straight line relation, not no relation at all.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Correlation — Part 2: Karl Pearson and Spearman',
  goals: [
    'Calculate Karl Pearson\'s coefficient from deviations and from actual values',
    'Interpret the sign and size of a coefficient',
    'Calculate Spearman\'s rank correlation, from given ranks and from values',
    'Apply the correction factor for repeated ranks and choose the right measure',
  ],
  slides: [
    sl('title', 'Karl Pearson and Spearman', {
      b: 'Part 2 — **measuring** the relationship with a number, from values and from ranks.',
      v: vRoute2,
      n: 'In this part we turn the picture into a number. First Karl Pearson\'s coefficient, worked out from deviations, and its actual value form. Then we learn how to read its sign and size. After that comes Spearman\'s rank correlation, including repeated ranks, and finally a rule for choosing between the two. All data are imagined.',
    }),
    sl('concept', 'Karl Pearson\'s coefficient', {
      b: 'With x and y as **deviations from the means**: **r = Σxy ÷ √(Σx² × Σy²)**.',
      v: vForm,
      n: 'Karl Pearson\'s coefficient uses deviations from the means. For each pair we multiply the deviation of the first variable by the deviation of the second, and add these products. We also add the squares of the deviations of each variable. The coefficient is the sum of products divided by the square root of the two sums of squares multiplied together.',
    }),
    sl('concept', 'Steps of the working', {
      b: 'Work in a table, one column for each quantity, and add each column at the end.',
      v: vSteps,
      n: 'The working follows five steps. Find the mean of each variable. Find the deviation of every value from its mean. Form the products of the paired deviations and the squares of each deviation. Add each column. Finally divide the sum of products by the square root of the product of the two sums of squares.',
    }),
    sl('example', 'Worked example 1: study hours and marks', {
      b: 'Five imagined students of Lotus Valley School: find the coefficient from the deviations.',
      bl: [
        `Step 1 — Means: ${S(st.mx)} hours and ${S(st.my)} marks.`,
        `Step 2 — Totals of the columns: Σxy = ${S(st.sxy)}, Σx² = ${S(st.sxx)}, Σy² = ${S(st.syy)}.`,
        `Step 3 — The root of ${S(st.sxx)} × ${S(st.syy)} is ${S(Math.sqrt(st.sxx * st.syy))}.`,
        `Step 4 — Divide: **r = ${S(st.r)}**, a high positive value.`,
      ],
      v: vPearsonTable,
      n: `The deviations of hours from the mean are in the third column and those of marks in the fourth. The products add up to ${S(st.sxy)}, the squares of the hours deviations to ${S(st.sxx)}, and the squares of the marks deviations to ${S(st.syy)}. The coefficient is ${S(st.sxy)} divided by ${S(Math.sqrt(st.sxx * st.syy))}, which is ${S(st.r)}.`,
    }),
    sl('check', 'Quick check: order of the steps', {
      b: 'Put the steps of working out the coefficient in order.',
      chk: 'ord_pearson',
      n: 'Think about what each step needs. You cannot find deviations before you know the means, and you cannot add the columns before the products and squares are formed. The division comes last.',
    }),
    sl('concept', 'The actual-value form', {
      b: 'Without deviations: **r = (nΣxy − ΣxΣy) ÷ √[(nΣx² − (Σx)²)(nΣy² − (Σy)²)]**.',
      v: vRaw,
      n: `The same coefficient can be found from the actual values, without deviations. We need the number of pairs, the sums of the two variables, the sum of products, and the sums of squares. For the Lotus Valley data the parts are ${stRaw.top}, ${stRaw.dx} and ${stRaw.dy}, and the coefficient is again ${S(stRaw.r)}. Both forms always agree.`,
    }),
    sl('example', 'Worked example 2: a negative coefficient', {
      b: 'The imagined Mango Mart noted the price of apples and the quantity sold on five days.',
      bl: [
        `Step 1 — Means: Rs ${S(fr.mx)} and ${S(fr.my)} kg.`,
        `Step 2 — Totals: Σxy = ${R(fr.sxy)}, Σx² = ${S(fr.sxx)}, Σy² = ${S(fr.syy)}.`,
        `Step 3 — The root of ${S(fr.sxx)} × ${S(fr.syy)} is ${S(Math.sqrt(fr.sxx * fr.syy))}.`,
        `Step 4 — **r = ${R(fr.r)}**: the sign of Σxy decides the sign of r.`,
      ],
      v: vFruitTable,
      n: `Here the products of deviations are mostly negative, so the sum of products is negative ${S(-fr.sxy)}. The sums of squares are always positive, so the sign of the coefficient is the sign of the sum of products. The coefficient is negative ${S(-fr.r)}. On days when the price was higher, the quantity sold tended to be smaller.`,
    }),
    sl('diagram', 'Price and quantity on the scatter diagram', {
      v: vFruitScatter,
      n: `Here are the same five days as dots. They fall from upper left to lower right, which is what a negative coefficient looks like. They do not lie exactly on a line, so the relation is moderate, not perfect, and the coefficient of negative ${S(-fr.r)} is a fair summary of it.`,
    }),
    sl('concept', 'Interpreting the size and the sign', {
      b: 'The **sign** gives the direction; the **distance from zero** gives the strength.',
      v: vInterp,
      n: 'A value near one, positive or negative, shows a very strong relation. A value near zero shows a weak one. The sign tells us the direction. So positive point nine is very strong and positive, positive point three is weak and positive, and negative point seven is fairly strong and negative. These bands are only a rough guide, and none of them proves cause.',
    }),
    sl('check', 'Quick check: reading a rank correlation', {
      b: 'Two critics\' rankings of films give a coefficient of 0.9. What does it mean?',
      chk: 'm_sp_interp',
      n: 'A rank correlation is read just like the other coefficient. Think about how close the value is to one, and what that says about the agreement between the two rankings.',
    }),
    sl('concept', 'Spearman\'s rank correlation', {
      b: 'For ranks: **rs = 1 − 6ΣD² ÷ (n³ − n)**, where D is the difference between the two ranks of an item.',
      bl: ['Use it for **qualitative** data that can only be ranked.', 'Use it when **extreme values** would distort Karl Pearson\'s coefficient.'],
      v: vRankFlow,
      n: 'Spearman\'s rank correlation works with ranks. Rank each series, giving rank one to the highest value. Find the difference between the two ranks of each item and square it. Add the squares and put the total in the formula, which is one minus six times that total divided by n cubed minus n. Use it for qualitative data and for data with extreme values.',
    }),
    sl('concept', 'Assigning ranks, with ties', {
      b: 'Rank from the **highest** value. Tied values share the places they cover and each gets the **average** rank.',
      v: vRankTie,
      n: `Look at the scores of six imagined players. The highest score gets rank one and the next gets rank two. Three players share the same score, and between them they cover places three, four and five. Each gets the average of these, which is ${btRanks[1]}. The lowest score then takes rank six.`,
    }),
    sl('example', 'Worked example 3: ranks given by two judges', {
      b: 'Two imagined judges ranked five contestants of a school debate.',
      bl: [
        `Step 1 — Differences D: ${L(jg5.D)}; they add to ${sum(jg5.D)}.`,
        `Step 2 — Squares add to ΣD² = **${f2(jg5.D2)}**.`,
        `Step 3 — n³ − n = ${jg5.n ** 3} − ${jg5.n} = ${jg5.n ** 3 - jg5.n}.`,
        `Step 4 — **rs = 1 − 6 × ${f2(jg5.D2)} ÷ ${jg5.n ** 3 - jg5.n} = ${S(jg5.rs)}**.`,
      ],
      v: vJudge,
      n: `The differences between the two judges\' ranks add up to zero, which is a good check. Their squares add up to ${f2(jg5.D2)}. With five contestants, n cubed minus n is ${jg5.n ** 3 - jg5.n}. So the rank correlation is one minus six times ${f2(jg5.D2)} divided by ${jg5.n ** 3 - jg5.n}, which is ${S(jg5.rs)}. The judges largely agree.`,
    }),
    sl('check', 'Quick check: a correction factor', {
      b: 'Two students share one score and three others share another. What total correction factor is added?',
      chk: 'n_tie_cf',
      n: 'For each group of tied values the factor is m cubed minus m, divided by twelve, where m is the size of the group. Work out the factor for the group of two, then for the group of three, and add them.',
    }),
    sl('concept', 'Repeated ranks: the correction factor', {
      b: 'For each group of **m** tied items add **(m³ − m) ÷ 12** to ΣD², then use **rs = 1 − 6(ΣD² + correction) ÷ (n³ − n)**.',
      v: vCf,
      n: `When values are tied, the rank correlation formula needs a correction. For each group of m tied items we add m cubed minus m, divided by twelve, to the sum of squared differences. A tied pair adds ${f2(cfEach[0])}, a tied group of three adds ${f2(cfEach[1])}, and a group of four adds five. If there are several groups, add all the factors.`,
    }),
    sl('example', 'Worked example 4: ranks from values, with a tie', {
      b: 'Six imagined students took a Monday test and a Friday test. Two Monday scores are equal.',
      bl: [
        `Step 1 — Ranks, Monday: ${L(t1.r1)}; Friday: ${L(t1.r2)}.`,
        `Step 2 — D = ${L(t1.D)}, so ΣD² = **${f2(t1.D2)}**.`,
        `Step 3 — One tied pair: correction factor = **${f2(t1.cf)}**.`,
        `Step 4 — **rs = 1 − 6 × ${f2(t1.D2 + t1.cf)} ÷ ${t1.n ** 3 - t1.n} = ${S(t1.rs)}**.`,
      ],
      v: vTie,
      n: `The two equal Monday scores cover places three and four, so each gets rank ${t1.r1[1]}. The squared differences add up to ${f2(t1.D2)}, and one tied pair adds a correction of ${f2(t1.cf)}. The total ${f2(t1.D2 + t1.cf)} is put in the formula with six times that total divided by ${t1.n ** 3 - t1.n}. The rank correlation is ${S(t1.rs)}.`,
    }),
    sl('concept', 'Pearson or Spearman?', {
      b: 'Choose by the **type of data** and by the presence of **extreme values**.',
      v: vCompare,
      n: `Use Karl Pearson\'s coefficient for exactly measured values without extreme ones. Use rank correlation for qualitative data that can only be ranked, and when extreme values are present. For five imagined shops, one with very large sales, Karl Pearson\'s coefficient is only ${S(ex.r)}, while the rank correlation is ${S(exSp.rs)}, since the ranks agree exactly.`,
    }),
    sl('diagram', 'An extreme value', {
      v: vExt,
      n: `Four shops have sales between twenty and thirty two thousand and one has two hundred thousand. Ratings rise with sales at every step, so the ranks agree perfectly and the rank correlation is ${S(exSp.rs)}. The very large figure stretches the scale, and Karl Pearson\'s coefficient falls to ${S(ex.r)}.`,
    }),
    sl('check', 'Quick check: n cubed minus n', {
      b: 'Five paintings are ranked by two teachers. Find n cubed minus n.',
      chk: 'fb_n3n',
      n: 'Count the paintings to get the value of n. Then cube it and subtract n. This number goes in the denominator of the rank correlation formula.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To recap. Karl Pearson\'s coefficient is the sum of products of deviations divided by the square root of the product of the sums of squares. The actual value form gives the same number. The sign of the sum of products gives the sign of the coefficient. Rank correlation uses ranks, with rank one for the highest, and adds a correction factor for each tied group. Use it for ranks, qualitative data and extreme values.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **formula first**, then show a table of deviations, products and squares.',
        'Check that the **deviations of each series add to zero**, and that the **rank differences add to zero**.',
        'Give **tied values the average rank**, then add **(m³ − m) ÷ 12** for each tied group.',
        'Rank from the **highest** value, and do the same in both series.',
        'Finish with a sentence: say whether the relation is **positive or negative, strong or weak**.',
      ],
      n: 'Some tips. Write the formula first, then show a table of deviations, products and squares. Check that the deviations of each series add to zero and that the rank differences add to zero. Give tied values the average rank and add the correction for each tied group. Rank from the highest value in both series. Finish with a sentence saying whether the relation is positive or negative, strong or weak.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Correlation — Notes',
  sections: [
    {
      h: '1. Meaning and types of correlation',
      t: 1,
      b: `**Correlation** is the degree and direction of the **linear** relationship between two variables. It is **positive** when the variables move in the same direction (both rise and fall together) and **negative** when they move in opposite directions. It is **linear** when the dots of a scatter diagram lie around a straight line and **non-linear** when they follow a curve.\n\nImagined examples: temperature and cold drink sales at a juice corner (positive); temperature and hot soup sales at a hill stall (negative); shoe size and marks of students (no correlation).`,
      terms: [
        ['Correlation', 'The degree and direction of the linear relationship between two variables.'],
        ['Positive correlation', 'A relation in which the variables rise and fall together.'],
        ['Negative correlation', 'A relation in which one variable rises as the other falls.'],
        ['Linear correlation', 'A relation in which the paired values lie around a straight line.'],
      ],
      v: vTypes,
    },
    {
      h: '2. Scatter diagram',
      t: 1,
      b: `A **scatter diagram** plots one dot for each pair of values, with one variable on each axis. It shows the **direction** of the relation (rising or falling) and its **closeness** (how near the dots lie to a line).\n\nPerfect positive correlation puts all dots on a rising line (coefficient ${S(scR.perfectPos)}); perfect negative on a falling line (${R(scR.perfectNeg)}); high correlation puts the dots close to a line; low correlation spreads them; no correlation shows no pattern (about ${S(scR.none)}). In the imagined sets of seven dots drawn here the coefficients are ${R(scR.highPos)}, ${R(scR.highNeg)}, ${R(scR.lowPos)} and ${S(scR.none)}.`,
      terms: [
        ['Scatter diagram', 'A graph with one dot for each pair of values of two variables.'],
        ['Perfect correlation', 'A relation in which all dots lie exactly on one straight line, giving a coefficient of +1 or −1.'],
      ],
      v: vScat3,
      vs: [vScatDeg, vDegrees, vRain],
    },
    {
      h: '3. Correlation and causation',
      t: 1,
      b: `A high correlation does **not** prove that one variable **causes** the other. A **third variable** may affect both (in an imagined seaside town, hot weather raises both ice cream sales and sunburn: the coefficient for the imagined five months is ${S(se.r)}), the link may be **chance**, or the direction of influence may be the reverse. A link caused by chance or by a third variable is a **spurious correlation**.`,
      terms: [
        ['Causation', 'A relation in which a change in one variable produces a change in the other.'],
        ['Spurious correlation', 'A correlation between variables that arises from chance or from a common third factor and not from a real connection between them.'],
      ],
      v: vCause,
      vs: [vMislead],
    },
    {
      h: '4. Properties of the coefficient',
      t: 1,
      b: `1. It lies between **−1 and +1**.\n2. It has **no unit**.\n3. It is **not affected by a change of origin or scale**: adding the same number to every value, or multiplying or dividing every value by the same positive number, leaves it unchanged. Multiplying one variable by a negative number reverses its sign.\n4. A coefficient of **0** shows no **linear** relation; a curved relation may still exist (for the imagined temperature and electricity use of Himgiri the coefficient is ${S(ut.r)} although the dots form a U).\n\nFor the imagined Lotus Valley data the coefficient is ${S(st.r)}; after adding 2 to the hours it is ${S(stShift.r)}, and after dividing the marks by 5 it is ${S(stHalf.r)}.`,
      terms: [
        ['Change of origin', 'Adding or subtracting the same number from every value of a variable.'],
        ['Change of scale', 'Multiplying or dividing every value of a variable by the same number.'],
        ['Non-linear relation', 'A relation in which the paired values follow a curve and not a straight line.'],
      ],
      v: vProps,
      vs: [vOrigin, vU, vUTable],
    },
    {
      h: '5. Karl Pearson\'s coefficient',
      t: 2,
      b: `**r = Σxy ÷ √(Σx² × Σy²)**, where x and y are the deviations of the two series from their means. Work in a table of deviations, products and squares.\n\nFor the imagined Lotus Valley students: Σxy = ${S(st.sxy)}, Σx² = ${S(st.sxx)}, Σy² = ${S(st.syy)}, so r = ${S(st.sxy)} ÷ ${S(Math.sqrt(st.sxx * st.syy))} = ${S(st.r)}.\n\nThe **actual-value form** is **r = (nΣxy − ΣxΣy) ÷ √[(nΣx² − (Σx)²)(nΣy² − (Σy)²)]**; for the same data it gives ${stRaw.top} ÷ √(${stRaw.dx} × ${stRaw.dy}) = ${S(stRaw.r)}. The sign of Σxy is the sign of r.`,
      terms: [
        ['Karl Pearson\'s coefficient', 'A measure of the degree and direction of the linear relationship between two variables, equal to Σxy divided by the square root of Σx² times Σy², with deviations from the means.'],
        ['Deviation', 'The difference between a value and the arithmetic mean of its series.'],
      ],
      v: vPearsonTable,
      vs: [vForm, vRaw, vFruitTable, vFruitScatter],
    },
    {
      h: '6. Spearman\'s rank correlation',
      t: 2,
      b: `**rs = 1 − 6ΣD² ÷ (n³ − n)**, where D is the difference between the two ranks of an item and n is the number of items. Rank 1 is given to the **highest** value. It is used for **qualitative** data that can only be ranked and when **extreme values** are present. The differences D always add up to zero.\n\n**Repeated ranks:** tied values get the average of the ranks they cover, and for each group of m tied items **(m³ − m) ÷ 12** is added to ΣD²: **rs = 1 − 6[ΣD² + Σ(m³ − m) ÷ 12] ÷ (n³ − n)**. Imagined examples: two judges of a debate give rs = ${S(jg5.rs)}; six students with one tied pair give ΣD² = ${f2(t1.D2)}, correction ${f2(t1.cf)} and rs = ${S(t1.rs)}.`,
      terms: [
        ['Rank correlation coefficient', 'A measure of the agreement between two rankings of the same items.'],
        ['Correction factor', 'The amount (m³ − m) ÷ 12 added to ΣD² for each group of m items with repeated ranks.'],
      ],
      v: vRankFlow,
      vs: [vRankTie, vJudge, vCf, vTie],
    },
    {
      h: '7. Interpretation and choice of measure',
      t: 2,
      b: `As a rough guide, a value near +1 shows a very strong positive relation (for example +0.9), a value of about +0.3 a weak positive one, a value near 0 no linear relation, and a value such as −0.7 a fairly strong negative one. These bands are not fixed rules, and no value alone proves cause.\n\nUse **Karl Pearson's coefficient** for exactly measured values and **rank correlation** for ranks, qualitative data and data with extreme values. For five imagined shops, one with very large sales, Karl Pearson's coefficient is ${S(ex.r)} and rank correlation is ${S(exSp.rs)}.`,
      terms: [
        ['Extreme value', 'A value far from the others in a series, which can distort a measure based on deviations from the mean.'],
      ],
      v: vInterp,
      vs: [vCompare, vExt],
    },
  ],
  tips: `- Define correlation as the **degree and direction of the linear relationship** between two variables.\n- Read a scatter diagram for **direction and closeness**; never claim that correlation **proves cause**.\n- The coefficient lies between **−1 and +1**, has **no unit** and ignores a change of **origin and scale**.\n- For Karl Pearson: formula first, then a table of **deviations, products and squares**, with column totals.\n- For rank correlation: rank from the **highest**, check that **ΣD = 0**, add **(m³ − m) ÷ 12** for each tied group.\n- Finish every computation with a sentence on **sign and strength**.`,
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Correlation**', 'The degree and direction of the linear relationship between two variables.', 'definition', 1],
  ['**Positive correlation**', 'The variables rise and fall together.', 'definition', 1],
  ['**Negative correlation**', 'One variable rises as the other falls.', 'definition', 1],
  ['**Linear** and **non-linear** correlation', 'Linear: dots around a straight line. Non-linear: dots follow a curve.', 'concept', 1],
  ['**Scatter diagram**', 'A graph with one dot for each pair of values of two variables.', 'definition', 1],
  ['Dots rise from lower left to upper right', 'Positive correlation.', 'fact', 1],
  ['Dots fall from upper left to lower right', 'Negative correlation.', 'fact', 1],
  ['All dots on one rising straight line', 'Perfect positive correlation, coefficient +1.', 'fact', 1],
  ['All dots on one falling straight line', 'Perfect negative correlation, coefficient −1.', 'fact', 1],
  ['Dots with no pattern', 'No correlation: the coefficient is close to 0.', 'fact', 1],
  ['**Correlation and causation**', 'A high correlation does not prove that one variable causes the other.', 'concept', 1],
  ['**Spurious correlation**', 'A link due to chance or to a third variable, not to a real connection.', 'definition', 1],
  ['Limits of the coefficient', 'Always between −1 and +1.', 'fact', 1],
  ['Unit of the coefficient', 'None: it is a pure number.', 'fact', 1],
  ['**Change of origin**', 'Adding or subtracting the same number from every value; the coefficient is unchanged.', 'concept', 1],
  ['**Change of scale**', 'Multiplying or dividing every value by the same positive number; the coefficient is unchanged.', 'concept', 1],
  ['A coefficient of **zero**', 'No linear relation; a non-linear relation may still exist.', 'concept', 1],
  ['**Karl Pearson\'s coefficient**', 'r = Σxy ÷ √(Σx² × Σy²), with x and y as deviations from the means.', 'formula', 2],
  ['**Actual-value form** of r', 'r = (nΣxy − ΣxΣy) ÷ √[(nΣx² − (Σx)²)(nΣy² − (Σy)²)].', 'formula', 2],
  ['Sign of Karl Pearson\'s coefficient', 'The same as the sign of Σxy, since the denominator is positive.', 'fact', 2],
  ['**Spearman\'s rank correlation**', 'rs = 1 − 6ΣD² ÷ (n³ − n), with D the difference between the two ranks.', 'formula', 2],
  ['Ranking convention', 'Rank 1 is given to the highest value, in both series.', 'fact', 2],
  ['Sum of the rank differences', 'Always zero; use it as a check.', 'fact', 2],
  ['**Tied values**', 'Each gets the average of the ranks they would cover.', 'concept', 2],
  ['**Correction factor** for a tied group', '(m³ − m) ÷ 12 for a group of m items, added to ΣD².', 'formula', 2],
  ['Rank correlation with ties', 'rs = 1 − 6[ΣD² + Σ(m³ − m) ÷ 12] ÷ (n³ − n).', 'formula', 2],
  ['When to use rank correlation', 'For qualitative data that can be ranked, and when extreme values are present.', 'concept', 2],
  ['When to use Karl Pearson\'s coefficient', 'For exactly measured values without distorting extreme values.', 'concept', 2],
  ['A coefficient of about +0.9', 'A very strong positive relation (a rough guide).', 'fact', 2],
  ['A coefficient of about −0.7', 'A fairly strong negative relation (a rough guide).', 'fact', 2],
  ['A coefficient of −0.8 against +0.5', 'The −0.8 is the stronger relation: strength is the distance from zero.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Correlation',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_range', 'm_pos_ex', 'm_sp_when', 'ar_cause'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_types', 's2_rank_tie', 's3_props'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_props', 'l_spearman_ties'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_rain'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Correlation',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_scat_pos', 'm_perfect_neg', 'm_unit', 'm_nonlin', 'm_sign_sxy', 'm_sp_form', 'm_cf_value', 'm_neg07', 'ar_u', 'ar_ties'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_def', 's2_cf', { attempt: 1, keys: ['s2_range', 's2_origin'] }, 's3_ushape', { attempt: 1, keys: ['s3_rank_basic', 's3_compare'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_pearson', { attempt: 1, keys: ['l_compare', 'l_causation'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_cause', 'cb_fruit'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-11-economics-ch06 only (meaning, types, scatter diagram and properties of correlation; Karl Pearson\'s coefficient and Spearman\'s rank correlation including repeated ranks)',
    originality: 'every student, school, stall, village, shop, judge, firm and passage is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all means, deviations, Σxy, Σx², Σy², coefficients, ranks, rank differences, ΣD² and correction factors computed with stats.mjs or plain code from imagined data and asserted with check(); origin and scale invariance and the equality of the deviation and actual-value forms asserted in code; every SVG is drawn from the same data',
    facts: 'only stable statistical conventions are stated: definition of correlation, positive and negative, linear and non-linear, scatter diagram patterns, limits of r, no unit, change of origin and scale, zero means no linear relation, Karl Pearson formula, Spearman formula with rank 1 for the highest value, correction factor (m cubed minus m) over 12 for tied groups',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
