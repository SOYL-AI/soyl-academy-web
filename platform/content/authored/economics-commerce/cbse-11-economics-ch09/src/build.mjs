// Build CBSE 11 Economics ch09 Theory of Consumer Behaviour. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, check, rnd } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch09', 'economics-commerce');
const Qs = await import('./questions.mjs');
const {
  J, inr, NQ, TU, MU, PS, PS2, MUM, ratioS, eqQ, eqQ2, worth, PX, PY, INC, MX, MY, rX, rY, best, eqRatio, utilOf, uBest, uBad1, BAD1, BAD2,
  bl, B0, B_inc, B_dec, B_p1, B_p2, B_p1d, nBundles, M0, P1_0, P2_0, eqX, eqY, U, mrsAt, K, icF, IX, IY, IGIVE, IDX, MRS, mrsBD,
  BR, rohanX, rohanY, BN, PR, DA, DB, DC, DM, DM1, DMS, DMC, SH, SA, SB, SC, SUBS, COMP, EA, ES, ET, EF, EN, EP, edCase, CASES, ED2, q1Q,
} = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LET = 'ABCDEF';

// ---------------------------------------------------------------- figure helpers
const poly = (s, c, pts, o) => s.polyline(pts.map(([x, y]) => [c.X(x), c.Y(y)]), o);
const legend = (s, x, y, color, text, dash) => {
  s.line(x, y, x + 26, y, { color, sw: 2.4, dash });
  s.text(x + 34, y, text, { anchor: 'start', size: 12 });
};
check(DM[2], 11, 0, 'market demand at Rs 6 used in the figures');
check(rX[2], rY[1], 6, 'equal marginal utility per rupee at the equilibrium bundle');

// ---------------------------------------------------------------- SVG: TU and MU curves from the schedule
const vTUMU = (() => {
  const s = new Svg(640, 350);
  s.text(175, 12, 'Total utility (TU)', { size: 14, bold: true });
  s.text(495, 12, 'Marginal utility (MU)', { size: 14, bold: true });
  const a = s.chart({ x0: 0, x1: 6.5, y0: 0, y1: 110, left: 60, top: 52, width: 230, height: 230, xLabel: 'Samosas', yLabel: 'Utils' });
  poly(s, a, NQ.map((q) => [q, TU[q]]), { color: 'accent', sw: 2.8 });
  NQ.forEach((q) => a.dot([q, TU[q]], 'accent'));
  [0, 40, 70, 90, 100].forEach((y) => a.yTick(y, String(y)));
  [1, 2, 3, 4, 5, 6].forEach((q) => a.xTick(q, String(q)));
  a.label([4.5, 100], 'TU is highest', { dy: -16, size: 12, color: 'accent' });
  const b = s.chart({ x0: 0, x1: 6.5, y0: -20, y1: 50, left: 380, top: 52, width: 230, height: 230, xLabel: 'Samosas', yLabel: 'Utils' });
  poly(s, b, MU.map((m, i) => [i + 1, m]), { color: 'blue', sw: 2.8 });
  MU.forEach((m, i) => b.dot([i + 1, m], 'blue'));
  b.seg([0, 0], [6.5, 0], { color: 'muted', sw: 1.2, dash: true });
  [40, 30, 20, 10, 0, -10].forEach((y) => b.yTick(y, String(y)));
  [1, 2, 3, 4, 5, 6].forEach((q) => b.xTick(q, String(q)));
  b.label([5, 0], 'MU is zero', { dy: -16, size: 12, color: 'blue' });
  b.label([6, -10], 'MU is negative', { dy: 18, dx: -10, size: 12, color: 'red' });
  return s.visual(
    `Two curves drawn from the imagined samosa schedule of Meera: total utility rises to a maximum of ${Math.max(...TU)} utils and then falls, and marginal utility falls from ${MU[0]} through zero at the fifth samosa to ${MU[5]}`,
    `Imagined schedule. TU: ${J(TU)} utils for 0 to 6 samosas. MU: ${J(MU)}.`,
  );
})();

// ---------------------------------------------------------------- SVG: budget line and budget set
const vBudget = (() => {
  const s = new Svg(640, 380);
  const c = s.chart({ x0: 0, x1: 8, y0: 0, y1: 14, left: 70, top: 30, width: 470, height: 300, xLabel: 'Mangoes (kg)', yLabel: 'Guavas (kg)' });
  s.polygon([[c.X(0), c.Y(0)], [c.X(B0.a), c.Y(0)], [c.X(0), c.Y(B0.b)]], { fill: 'fill', fillOpacity: 0.55, stroke: false });
  c.seg([0, B0.b], [B0.a, 0], { color: 'accent', sw: 2.8 });
  c.dot([3, 6], 'accent');
  c.label([3, 6], 'On the line (3, 6)', { dx: 12, dy: -12, anchor: 'start', size: 12 });
  c.dot([2, 4], 'green');
  c.label([2, 4], 'Inside (2, 4)', { dx: -10, dy: 16, anchor: 'start', size: 12, color: 'green' });
  c.dot([5, 6], 'red');
  c.label([5, 6], 'Outside (5, 6)', { dx: 8, dy: -14, anchor: 'start', size: 12, color: 'red' });
  [B0.b].forEach((y) => c.yTick(y, String(y)));
  [B0.a].forEach((x) => c.xTick(x, String(x)));
  c.label([1.3, 11], 'Budget line', { anchor: 'start', size: 13, color: 'accent', dx: 14, dy: -4 });
  c.label([1.8, 1.3], 'Budget set', { anchor: 'start', size: 13, dx: 0 });
  check(P1_0 * 3 + P2_0 * 6, 120, 0, 'bundle (3, 6) costs the whole income');
  check(P1_0 * 2 + P2_0 * 4, 80, 0, 'bundle (2, 4) costs less than the income');
  check(P1_0 * 5 + P2_0 * 6, 160, 0, 'bundle (5, 6) costs more than the income');
  return s.visual(
    `Budget line of imagined student Meera for mangoes and guavas with intercepts ${B0.a} kg and ${B0.b} kg; the shaded triangle is the budget set, point (3, 6) lies on the line, (2, 4) inside it and (5, 6) outside it`,
    `Imagined Meera: income Rs ${M0}, mangoes Rs ${P1_0} a kg, guavas Rs ${P2_0} a kg. Whole-kilogram bundles in the budget set: ${nBundles}.`,
  );
})();

// ---------------------------------------------------------------- SVG: shifts and rotations of the budget line
const vBudgetShifts = (() => {
  const s = new Svg(640, 392);
  s.text(165, 12, 'Income changes: parallel shifts', { size: 13, bold: true });
  s.text(485, 12, 'Price changes: rotations', { size: 13, bold: true });
  const a = s.chart({ x0: 0, x1: 9, y0: 0, y1: 18, left: 50, top: 52, width: 230, height: 230, xLabel: 'Mangoes', yLabel: 'Guavas' });
  const line = (c, B, o) => c.seg([0, B.b], [B.a, 0], o);
  line(a, B0, { color: 'accent', sw: 2.6 });
  line(a, B_inc, { color: 'blue', sw: 2.4, dash: true });
  line(a, B_dec, { color: 'red', sw: 2.4, dash: true });
  [B_dec.a, B0.a, B_inc.a].forEach((x) => a.xTick(x, String(x)));
  [B_dec.b, B0.b, B_inc.b].forEach((y) => a.yTick(y, String(y)));
  legend(s, 50, 336, 'accent', `Income ${B0.M}: intercepts ${B0.a} and ${B0.b}`);
  legend(s, 50, 354, 'blue', `Income ${B_inc.M}: intercepts ${B_inc.a} and ${B_inc.b}`, true);
  legend(s, 50, 372, 'red', `Income ${B_dec.M}: intercepts ${B_dec.a} and ${B_dec.b}`, true);
  const b = s.chart({ x0: 0, x1: 9, y0: 0, y1: 18, left: 370, top: 52, width: 230, height: 230, xLabel: 'Mangoes', yLabel: 'Guavas' });
  line(b, B0, { color: 'accent', sw: 2.6 });
  line(b, B_p1, { color: 'blue', sw: 2.4, dash: true });
  line(b, B_p2, { color: 'red', sw: 2.4, dash: true });
  [B_p1.a, B_p2.a].forEach((x) => b.xTick(x, String(x)));
  [B_p2.b, B0.b].forEach((y) => b.yTick(y, String(y)));
  legend(s, 370, 336, 'accent', `Prices ${P1_0} and ${P2_0}: slope ${B0.slope}`);
  legend(s, 370, 354, 'blue', `Mango Rs ${B_p1.P1}: slope ${B_p1.slope}`, true);
  legend(s, 370, 372, 'red', `Guava Rs ${B_p2.P2}: slope ${B_p2.slope}`, true);
  return s.visual(
    `Two panels showing how the budget line of Meera changes: a rise or fall in income moves it in parallel, while a rise in the price of mangoes or of guavas rotates it about the other intercept`,
    `Imagined Meera. Income Rs ${B_dec.M}, ${B0.M} or ${B_inc.M}; mango price Rs ${P1_0} or ${B_p1.P1}; guava price Rs ${P2_0} or ${B_p2.P2}.`,
  );
})();

// ---------------------------------------------------------------- SVG: indifference map
const icRange = (k, ymax) => [k / ymax, 9];
const vICmap = (() => {
  const s = new Svg(640, 380);
  const c = s.chart({ x0: 0, x1: 9, y0: 0, y1: 14, left: 70, top: 30, width: 470, height: 300, xLabel: 'Good 1', yLabel: 'Good 2' });
  K.forEach((k, i) => { const [a, b] = icRange(k, 13.5); c.fn(icF(k), a, b, { color: ['blue', 'accent', 'green'][i], sw: 2.6 }, 60); });
  c.label([8, K[0] / 8], `Curve 1: xy = ${K[0]}`, { dx: 4, dy: 14, anchor: 'end', size: 12, color: 'blue' });
  c.label([8, K[1] / 8], `Curve 2: xy = ${K[1]}`, { dx: 4, dy: -12, anchor: 'end', size: 12, color: 'accent' });
  c.label([8, K[2] / 8], `Curve 3: xy = ${K[2]}`, { dx: 4, dy: -12, anchor: 'end', size: 12, color: 'green' });
  s.arrow(c.X(2.2), c.Y(3.2), c.X(3.4), c.Y(8.2), { sw: 1.6, color: 'muted' });
  c.label([1.2, 6], 'Higher curve,', { dx: 0, anchor: 'start', size: 12 });
  c.label([1.2, 5.2], 'more satisfaction', { dx: 0, anchor: 'start', size: 12 });
  return s.visual(
    `An indifference map of an imagined consumer: three convex curves, none crossing another, with the curve farther from the origin showing higher satisfaction`,
    `Imagined consumer whose satisfaction is the product of the quantities of good 1 and good 2: curves for ${K[0]}, ${K[1]} and ${K[2]}.`,
  );
})();

// ---------------------------------------------------------------- SVG: MRS along an indifference curve
const vMRS = (() => {
  const s = new Svg(640, 380);
  const c = s.chart({ x0: 0, x1: 7, y0: 0, y1: 14, left: 70, top: 30, width: 470, height: 300, xLabel: 'Pencils (kg)', yLabel: 'Erasers (kg)' });
  c.fn(icF(12), 12 / 13.5, 7, { color: 'accent', sw: 2.8 }, 60);
  IX.forEach((x, i) => { c.dot([x, IY[i]], 'accent'); c.label([x, IY[i]], LET[i], { dx: -10, dy: 14, bold: true }); });
  IX.slice(0, 4).forEach((x, i) => c.seg([x, IY[i]], [IX[i + 1], IY[i]], { color: 'muted', sw: 1.2, dash: true }));
  IX.slice(0, 4).forEach((x, i) => c.seg([IX[i + 1], IY[i]], [IX[i + 1], IY[i + 1]], { color: 'muted', sw: 1.2, dash: true }));
  MRS.forEach((m, i) => c.label([IX[i + 1], (IY[i] + IY[i + 1]) / 2], `MRS ${m}`, { dx: 12, anchor: 'start', size: 12, color: 'blue' }));
  [1, 2, 3, 4, 6].forEach((x) => c.xTick(x, String(x)));
  IY.forEach((y) => c.yTick(y, String(y)));
  return s.visual(
    `Convex indifference curve of imagined Meera for pencils and erasers through points A to E; the steps between points show the marginal rate of substitution falling from ${MRS[0]} to ${MRS[3]}`,
    `Imagined schedule: ${IX.map((x, i) => `${LET[i]} (${x}, ${IY[i]})`).join(', ')}. MRS: ${J(MRS)}.`,
  );
})();

// ---------------------------------------------------------------- SVG: consumer's equilibrium
const vEq = (() => {
  const s = new Svg(640, 400);
  const c = s.chart({ x0: 0, x1: 9, y0: 0, y1: 14, left: 70, top: 30, width: 470, height: 300, xLabel: 'Mangoes (kg)', yLabel: 'Guavas (kg)' });
  K.forEach((k, i) => { const [a, b] = icRange(k, 13.5); c.fn(icF(k), a, b, { color: ['blue', 'accent', 'green'][i], sw: 2.4 }, 60); });
  c.seg([0, B0.b], [B0.a, 0], { color: 'red', sw: 2.6 });
  c.dot([eqX, eqY], 'red');
  c.drop([eqX, eqY]);
  c.label([eqX, eqY], `E (${eqX}, ${eqY})`, { dx: 14, dy: -16, anchor: 'start', bold: true, size: 13 });
  c.label([8, K[0] / 8], `xy = ${K[0]}`, { dx: 4, dy: 12, anchor: 'end', size: 12, color: 'blue' });
  c.label([8, K[1] / 8], `xy = ${K[1]}`, { dx: 4, dy: -12, anchor: 'end', size: 12, color: 'accent' });
  c.label([8, K[2] / 8], `xy = ${K[2]}: out of reach`, { dx: 4, dy: -12, anchor: 'end', size: 12, color: 'green' });
  c.label([0, B0.b], 'Budget line', { dx: 20, dy: -14, anchor: 'start', size: 13, color: 'red' });
  c.xTick(eqX, String(eqX));
  c.yTick(eqY, String(eqY));
  c.xTick(B0.a, String(B0.a));
  c.yTick(B0.b, String(B0.b));
  return s.visual(
    `Consumer's equilibrium of imagined Meera: the budget line touches the middle indifference curve at point E, ${eqX} kg of mangoes and ${eqY} kg of guavas, where the slope of the curve equals the slope of the budget line; the highest curve cannot be reached`,
    `Imagined Meera: income Rs ${M0}, prices Rs ${P1_0} and Rs ${P2_0}. At E the product is ${U(eqX, eqY)}, MRS ${mrsAt(eqX, eqY)} equals the price ratio ${B0.slope}.`,
  );
})();

// ---------------------------------------------------------------- SVG: Anil's demand curve
const vDemand = (() => {
  const s = new Svg(640, 380);
  const c = s.chart({ x0: 0, x1: 9, y0: 0, y1: 12, left: 70, top: 30, width: 470, height: 300, xLabel: 'Cups of tea per day', yLabel: 'Price per cup (Rs)' });
  poly(s, c, PR.map((p, i) => [DA[i], p]), { color: 'accent', sw: 2.8 });
  PR.forEach((p, i) => { c.dot([DA[i], p], 'accent'); c.drop([DA[i], p]); });
  PR.forEach((p) => c.yTick(p, String(p)));
  DA.forEach((q) => c.xTick(q, String(q)));
  c.label([DA[4], PR[4]], "Anil's demand curve", { dx: -8, dy: -18, anchor: 'end', size: 13, color: 'accent' });
  return s.visual(
    `Demand curve of Anil at an imagined tea stall, sloping downward: he buys ${DA[0]} cups at Rs ${PR[0]} and ${DA[4]} cups at Rs ${PR[4]}`,
    `Imagined schedule: prices Rs ${J(PR)} per cup, Anil's cups ${J(DA)}.`,
  );
})();

// ---------------------------------------------------------------- SVG: movement along and shift of the demand curve
const vMoveShift = (() => {
  const s = new Svg(640, 400);
  const c = s.chart({ x0: 0, x1: 26, y0: 0, y1: 12, left: 70, top: 30, width: 470, height: 300, xLabel: 'Cups of tea per day', yLabel: 'Price per cup (Rs)' });
  poly(s, c, PR.map((p, i) => [DM[i], p]), { color: 'accent', sw: 2.8 });
  poly(s, c, PR.map((p, i) => [DM1[i], p]), { color: 'blue', sw: 2.8, dash: true });
  const A = [DM[1], PR[1]], B = [DM[2], PR[2]], C = [DM1[2], PR[2]];
  c.dot(A, 'accent'); c.dot(B, 'accent'); c.dot(C, 'blue');
  c.label(A, `A (${A[0]}, ${A[1]})`, { dx: -10, dy: -14, anchor: 'end', size: 12 });
  c.label(B, `B (${B[0]}, ${B[1]})`, { dx: -12, dy: 16, anchor: 'end', size: 12 });
  c.label(C, `C (${C[0]}, ${C[1]})`, { dx: 12, dy: 16, anchor: 'start', size: 12, color: 'blue' });
  s.arrow(c.X(A[0]) + 3, c.Y(A[1]) + 6, c.X(B[0]) - 3, c.Y(B[1]) - 6, { sw: 1.6, color: 'red' });
  s.arrow(c.X(B[0]) + 8, c.Y(B[1]), c.X(C[0]) - 8, c.Y(C[1]), { sw: 1.6, color: 'green' });
  c.label([DM[0], PR[0]], 'D0', { dx: -14, dy: -6, size: 13, bold: true, color: 'accent' });
  c.label([DM1[0], PR[0]], 'D1', { dx: 14, dy: -6, size: 13, bold: true, color: 'blue' });
  [PR[1], PR[2]].forEach((p) => c.yTick(p, String(p)));
  return s.visual(
    `Market demand curve of an imagined tea stall: a fall in price moves the stall from A to B along the first curve, while a rise in incomes shifts the whole curve to the right and takes it from B to C at the same price`,
    `Imagined stall. D0: ${J(DM)} cups at prices Rs ${J(PR)}. D1 after incomes rise: ${J(DM1)}. A to B is a movement; B to C is a shift.`,
  );
})();

// ---------------------------------------------------------------- SVG: market demand as the horizontal sum
const vMarket = (() => {
  const s = new Svg(640, 390);
  const c = s.chart({ x0: 0, x1: 22, y0: 0, y1: 12, left: 70, top: 30, width: 470, height: 300, xLabel: 'Cups of tea per day', yLabel: 'Price per cup (Rs)' });
  poly(s, c, PR.map((p, i) => [DA[i], p]), { color: 'accent', sw: 2 });
  poly(s, c, PR.map((p, i) => [DB[i], p]), { color: 'blue', sw: 2 });
  poly(s, c, PR.map((p, i) => [DC[i], p]), { color: 'green', sw: 2 });
  poly(s, c, PR.map((p, i) => [DM[i], p]), { color: 'red', sw: 3 });
  c.seg([0, PR[2]], [DM[2], PR[2]], { color: 'muted', sw: 1.2, dash: true });
  c.dot([DA[2], PR[2]], 'accent'); c.dot([DB[2], PR[2]], 'blue'); c.dot([DC[2], PR[2]], 'green'); c.dot([DM[2], PR[2]], 'red');
  c.yTick(PR[2], String(PR[2]));
  [DA[2], DM[2]].forEach((q) => c.xTick(q, String(q)));
  legend(s, c.X(12.2), c.Y(11.3), 'accent', 'Anil');
  legend(s, c.X(12.2), c.Y(10.3), 'blue', 'Bela');
  legend(s, c.X(12.2), c.Y(9.3), 'green', 'Charu');
  legend(s, c.X(12.2), c.Y(8.3), 'red', 'Market demand');
  return s.visual(
    `Market demand of an imagined tea stall as the horizontal sum of the demand curves of Anil, Bela and Charu: at Rs ${PR[2]} they buy ${DA[2]}, ${DB[2]} and ${DC[2]} cups, so the market buys ${DM[2]}`,
    `Imagined buyers. Market demand: ${J(DM)} cups at prices Rs ${J(PR)}.`,
  );
})();

// ---------------------------------------------------------------- SVG: the five cases of price elasticity
const vFive = (() => {
  const s = new Svg(640, 420);
  const panel = (left, top, title, draw) => {
    s.text(left + 70, top - 28, title, { size: 12, bold: true });
    const c = s.chart({ x0: 0, x1: 10, y0: 0, y1: 10, left, top, width: 140, height: 110, xLabel: 'Quantity', yLabel: 'Price' });
    draw(c);
  };
  panel(40, 50, 'Perfectly elastic: infinity', (c) => c.seg([0.5, 6], [9.5, 6], { color: 'accent', sw: 2.8 }));
  panel(250, 50, 'Greater than one: flat', (c) => c.seg([2, 7.5], [9, 5], { color: 'blue', sw: 2.8 }));
  panel(460, 50, 'Unitary: equal to one', (c) => c.fn((x) => 20 / x, 2, 10, { color: 'green', sw: 2.8 }, 40));
  panel(145, 250, 'Less than one: steep', (c) => c.seg([4, 9], [6, 1.5], { color: 'red', sw: 2.8 }));
  panel(355, 250, 'Perfectly inelastic: zero', (c) => c.seg([5, 1], [5, 9.5], { color: 'accent', sw: 2.8 }));
  return s.visual(
    'Five demand curves: a horizontal line for perfectly elastic demand, a flat curve for elasticity greater than one, a rectangular hyperbola for unitary elasticity, a steep curve for elasticity less than one and a vertical line for perfectly inelastic demand',
    'The five cases of the price elasticity of demand.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Utility and marginal utility', 'Consumer equilibrium', 'Budget line', 'Indifference curves', 'Tangency'], 'Route map of Part 1: utility, consumer equilibrium, the budget line, indifference curves and the tangency equilibrium', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Demand schedule', 'Determinants', 'Movement and shift', 'Market demand', 'Elasticity'], 'Route map of Part 2: the demand schedule, determinants of demand, movement and shift, market demand and price elasticity', 'Part 2 at a glance');
const tTuMu = table(
  ['Samosas', 'Total utility (utils)', 'Marginal utility (utils)'],
  NQ.map((q) => [String(q), String(TU[q]), q ? String(MU[q - 1]) : 'none']),
  `Table of the imagined samosa schedule of Meera: total utility ${J(TU)} and marginal utility ${J(MU)} for 0 to 6 samosas`,
  'Imagined student Meera. Marginal utility is the change in total utility.',
);
const tTuWork = table(
  ['Samosa', 'TU now − TU before', 'MU (utils)', 'What it shows'],
  MU.map((m, i) => [String(i + 1), `${TU[i + 1]} − ${TU[i]}`, `**${m}**`, i < 3 ? 'Falling but positive' : i === 3 ? 'Still positive, small' : i === 4 ? '**Zero: TU at its maximum**' : '**Negative: TU falls**']),
  `Worked table of the marginal utility of each samosa of Meera: ${J(MU)}, falling at every step, zero for the fifth and negative for the sixth`,
  'Imagined student Meera.',
);
const dec = (r) => (r > MUM ? 'Buy: worth more than the price' : r === MUM ? '**Equilibrium: stop here**' : r > 0 ? 'Do not buy' : 'Do not buy');
const tOne = table(
  ['Samosa', 'MU (utils)', `MU per rupee (MU ÷ ${PS})`, `Compare with ${MUM}`],
  MU.slice(0, 5).map((m, i) => [String(i + 1), String(m), String(ratioS[i]), dec(ratioS[i])]),
  `Table of the marginal utility per rupee for each of Meera's samosas at Rs ${PS}: ${J(ratioS.slice(0, 5))}, equal to the marginal utility of a rupee (${MUM}) at the third samosa`,
  `Imagined Meera: one rupee is worth ${MUM} utils.`,
);
const tEqFall = table(
  ['Price of a samosa', 'Required MU = price × MU of a rupee', 'Samosa with that MU', 'Samosas bought'],
  [
    [inr(PS), `${PS} × ${MUM} = ${PS * MUM}`, `The ${eqQ}${eqQ === 3 ? 'rd' : 'th'}`, `**${eqQ}**`],
    [inr(PS2), `${PS2} × ${MUM} = ${PS2 * MUM}`, `The ${eqQ2}th`, `**${eqQ2}**`],
  ],
  `Table of the equilibrium quantity of samosas of Meera: ${eqQ} at Rs ${PS} and ${eqQ2} at Rs ${PS2}`,
  'A lower price means a lower required marginal utility, so more is bought.',
);
const tTwo = table(
  ['Unit', 'Samosa MU', `MU per rupee (÷ ${PX})`, 'Juice MU', `MU per rupee (÷ ${PY})`],
  MX.map((m, i) => [String(i + 1), String(m), String(rX[i]), String(MY[i]), String(rY[i])]),
  `Table of the marginal utilities and marginal utility per rupee of Meera's samosas (${J(rX)}) and juice (${J(rY)})`,
  `Imagined Meera: samosa Rs ${PX}, juice Rs ${PY}, income Rs ${INC}.`,
);
const bundleRow = (x, y, note) => [`(${x}, ${y})`, String(PX * x + PY * y), String(rX[x - 1]), String(rY[y - 1]), String(utilOf(x, y)), note];
const tTwoBundle = table(
  ['Bundle (samosas, juice)', 'Cost (Rs)', 'MUx ÷ Px', 'MUy ÷ Py', 'Total utility', 'Verdict'],
  [
    bundleRow(best.x, best.y, '**Equilibrium: ratios equal, income spent**'),
    bundleRow(BAD1[0], BAD1[1], 'Juice gives more per rupee: buy less samosa, more juice'),
    bundleRow(BAD2[0], BAD2[1], 'Samosa gives more per rupee: buy more samosa, less juice'),
  ],
  `Worked comparison of three bundles of Meera: the bundle of ${best.x} samosas and ${best.y} juices has equal ratios ${eqRatio} and total utility ${uBest}; the other two have unequal ratios and lower utility`,
  `Total utility ${utilOf(...BAD1)} at (${BAD1[0]}, ${BAD1[1]}) against ${uBest} at the equilibrium bundle.`,
);
const bRow = (name, B) => [name, String(B.M), String(B.P1), String(B.P2), String(B.a), String(B.b), String(B.slope)];
const tBudgetWork = table(
  ['Case', 'Income', 'Price 1', 'Price 2', 'Intercept on good 1', 'Intercept on good 2', 'Slope (size)'],
  [
    bRow('Start', B0), bRow('Income up', B_inc), bRow('Income down', B_dec), bRow('Price 1 up', B_p1), bRow('Price 2 up', B_p2), bRow('Price 1 down', B_p1d),
  ],
  `Table of the budget line of Meera in six cases: start (${B0.a}, ${B0.b}, slope ${B0.slope}), income up (${B_inc.a}, ${B_inc.b}), income down (${B_dec.a}, ${B_dec.b}), price one up (${B_p1.a}, ${B_p1.b}, slope ${B_p1.slope}), price two up (${B_p2.a}, ${B_p2.b}, slope ${B_p2.slope}), price one down (${B_p1d.a}, ${B_p1d.b}, slope ${B_p1d.slope})`,
  'Intercepts are M ÷ P1 and M ÷ P2; the slope is P1 ÷ P2 in size.',
);
const tProps = table(
  ['Property of indifference curves', 'Reason'],
  [
    ['Slope downward', 'More of one good must be offset by less of the other to keep satisfaction equal'],
    ['Higher curve, higher satisfaction', 'It holds bundles with more of at least one good'],
    ['Never intersect', 'A shared bundle would have two satisfaction levels'],
    ['Convex to the origin', 'The marginal rate of substitution diminishes'],
  ],
  'Table of the four properties of indifference curves and the reason for each',
  'Monotonic preferences: more is preferred to less.',
);
const tMrs = table(
  ['Move', 'Erasers given up', 'Pencils gained', 'MRS'],
  MRS.map((m, i) => [`${LET[i]} to ${LET[i + 1]}`, String(IGIVE[i]), String(IDX[i]), `**${m}**`]),
  `Table of the marginal rate of substitution of Meera along one indifference curve: ${J(MRS)}, falling at every move`,
  'Imagined Meera.',
);
const tRohan = table(
  ['Step', 'Working', 'Result'],
  [
    ['Budget line', `${BR.P1}x + ${BR.P2}y = ${BR.M}`, `Intercepts ${BR.a} and ${BR.b}`],
    ['Condition', `MRS = y ÷ x = ${BR.P1} ÷ ${BR.P2}`, `y = ${BR.slope}x`],
    ['Substitute', `${BR.P1}x + ${BR.P2} × ${BR.slope}x = ${BR.P1 + BR.P2 * BR.slope}x = ${BR.M}`, `**x = ${rohanX}**`],
    ['Find y', `${BR.slope} × ${rohanX}`, `**y = ${rohanY}**`],
    ['Satisfaction', `${rohanX} × ${rohanY}`, `${U(rohanX, rohanY)}`],
  ],
  `Worked table of the equilibrium of Rohan: ${rohanX} notebooks and ${rohanY} pens, with satisfaction ${U(rohanX, rohanY)}`,
  `Imagined Rohan: income Rs ${BR.M}, notebooks Rs ${BR.P1}, pens Rs ${BR.P2}.`,
);
const tAnil = table(
  ['Price per cup (Rs)', "Anil's cups per day"],
  PR.map((p, i) => [String(p), String(DA[i])]),
  `Table of the imagined demand schedule of Anil for tea: ${J(DA)} cups at prices Rs ${J(PR)}`,
  'Imagined tea stall.',
);
const tDeterm = table(
  ['Determinant of demand', 'Effect on the demand for tea (imagined stall)'],
  [
    ['Own price of tea', 'Movement along the demand curve'],
    ['Price of a substitute (coffee)', 'Rise in its price shifts the curve right'],
    ['Price of a complement (sugar)', 'Rise in its price shifts the curve left'],
    ['Income of buyers', 'Normal good: more income shifts right; inferior good: left'],
    ['Tastes and preferences', 'Greater liking shifts right'],
    ['Expectations', 'Expecting a higher price later shifts demand right now'],
  ],
  'Table of the determinants of demand for tea and the effect of each on the demand curve',
  'Demand function: the quantity demanded depends on all of these.',
);
const tLaw = table(
  ['Reason for the law of demand', 'Meaning'],
  [
    ['Substitution effect', 'A fall in its own price makes the good cheaper than substitutes, so buyers switch to it'],
    ['Income effect', 'A lower price raises real income, so more can be bought'],
    ['Diminishing marginal utility', 'More units are bought only at a lower price, as the extra satisfaction falls'],
  ],
  'Table of the three reasons for the law of demand: substitution effect, income effect and diminishing marginal utility',
  'Law of demand: other things unchanged, price and quantity demanded move in opposite directions.',
);
const tNormInf = table(
  ['Type of good', 'When income rises', 'Imagined example'],
  [
    ['Normal good', 'Demand rises', 'Fruit juice at the stall'],
    ['Inferior good', 'Demand falls (30 kg to 22 kg of millet flour for a household whose income rose)', 'Coarse millet flour in the imagined village of Sarangpur'],
  ],
  'Table comparing a normal good, whose demand rises with income, with an inferior good, whose demand falls with income',
  'The effect of income on demand.',
);
const tRelated = table(
  ['Related good', 'Price of the related good rises', `Demand for tea at Rs ${PR[2]}`],
  [
    ['Substitute (coffee)', 'Buyers switch to tea', `Rises from ${DM[2]} to ${DMS[2]} cups`],
    ['Complement (sugar)', 'Tea with sugar becomes costlier', `Falls from ${DM[2]} to ${DMC[2]} cups`],
  ],
  `Table of the effect on tea demand of a dearer substitute (${DM[2]} to ${DMS[2]} cups at Rs ${PR[2]}) and of a dearer complement (${DM[2]} to ${DMC[2]})`,
  'Imagined tea stall.',
);
const tMoveShift = table(
  ['Price (Rs)', 'Original demand D0', 'Demand D1 after incomes rise'],
  PR.map((p, i) => [String(p), String(DM[i]), String(DM1[i])]),
  `Table of market demand before (${J(DM)}) and after (${J(DM1)}) a rise in incomes at prices Rs ${J(PR)}`,
  'Imagined tea stall.',
);
const tMoveWork = table(
  ['Change', 'Cause', 'Quantity', 'Type'],
  [
    [`Price falls from Rs ${PR[1]} to Rs ${PR[2]}`, 'Own price', `${DM[1]} to ${DM[2]} cups`, '**Movement along D0** (A to B)'],
    [`Incomes rise; price stays at Rs ${PR[2]}`, 'Income', `${DM[2]} to ${DM1[2]} cups`, '**Shift of the curve** (B to C)'],
  ],
  `Worked table of a movement along the demand curve (${DM[1]} to ${DM[2]} cups when price falls) and of a shift (${DM[2]} to ${DM1[2]} cups when incomes rise)`,
  'Own price: move along. Anything else: shift.',
);
const tMarket = table(
  ['Price (Rs)', 'Anil', 'Bela', 'Charu', 'Market demand'],
  PR.map((p, i) => [String(p), String(DA[i]), String(DB[i]), String(DC[i]), `**${DM[i]}**`]),
  `Table of the quantities demanded by Anil, Bela and Charu at prices Rs ${J(PR)} and the market demand ${J(DM)}`,
  'Imagined tea stall: market demand is the horizontal sum.',
);
const tMarketWork = table(
  ['Price (Rs)', 'Working', 'Market demand'],
  [1, 3].map((i) => [String(PR[i]), `${DA[i]} + ${DB[i]} + ${DC[i]}`, `**${DM[i]}**`]).concat([[String(PR[2]), `${DA[2]} + ${DB[2]} + ${DC[2]}`, `**${DM[2]}**`]]),
  `Worked table of market demand: ${DM[1]} cups at Rs ${PR[1]}, ${DM[3]} at Rs ${PR[3]} and ${DM[2]} at Rs ${PR[2]}`,
  'Add the quantities at the same price.',
);
const tEdFormula = table(
  ['Quantity', 'Formula'],
  [
    ['Percentage change in quantity', '(new quantity − old quantity) ÷ old quantity × 100'],
    ['Percentage change in price', '(new price − old price) ÷ old price × 100'],
    ['Price elasticity of demand', '**Percentage change in quantity ÷ percentage change in price**'],
    ['Sign', 'Negative for a normal demand curve; quoted without the sign'],
  ],
  'Table of the percentage method: change in quantity, change in price, their ratio as the elasticity, and the sign convention',
  'Compute both changes from the old values.',
);
const tEdWork = table(
  ['Good (imagined stall)', 'Change in price', 'Change in quantity', 'Elasticity', 'Case'],
  [
    ['Apples', `${EA.p0} to ${EA.p1}: ${EA.dp} per cent`, `${EA.q0} to ${EA.q1}: ${EA.dq} per cent`, `${Math.abs(EA.dq)} ÷ ${EA.dp} = **${EA.ed}**`, 'Greater than one'],
    ['Salt', `${ES.p0} to ${ES.p1}: ${ES.dp} per cent`, `${ES.q0} to ${ES.q1}: ${ES.dq} per cent`, `${Math.abs(ES.dq)} ÷ ${ES.dp} = **${ES.ed}**`, 'Less than one'],
  ],
  `Worked table of the elasticity of apples (${EA.ed}) and salt (${ES.ed}) at Meera's stall by the percentage method`,
  'Imagined stall.',
);
const tExp = table(
  ['Price and expenditure', 'Elasticity'],
  [
    ['Expenditure moves opposite to price', '**Greater than one**'],
    ['Expenditure does not change', '**Equal to one**'],
    ['Expenditure moves with price', '**Less than one**'],
  ],
  'Table of the total expenditure method: expenditure opposite to price means greater than one, unchanged means one, same direction means less than one',
  'Total expenditure = price × quantity.',
);
const tExpWork = table(
  ['Good (imagined)', 'Price', 'Quantity', 'Expenditure', 'Verdict'],
  [
    ['Tea', `${ET.p0} to ${ET.p1}`, `${ET.q0} to ${ET.q1}`, `${ET.e0} to ${ET.e1}`, 'Price down, expenditure up: **greater than one**'],
    ['Fish', `${EF.p0} to ${EF.p1}`, `${EF.q0} to ${EF.q1}`, `${EF.e0} to ${EF.e1}`, 'Both down: **less than one**'],
    ['Bus pass', `${EP.p0} to ${EP.p1}`, `${EP.q0} to ${EP.q1}`, `${EP.e0} to ${EP.e1}`, 'Unchanged: **equal to one**'],
  ],
  `Worked table of the total expenditure method: tea expenditure ${ET.e0} to ${ET.e1} (greater than one), fish ${EF.e0} to ${EF.e1} (less than one) and a bus pass ${EP.e0} to ${EP.e1} (equal to one)`,
  'Imagined goods.',
);
const tEdDet = table(
  ['Determinant', 'More elastic when', 'Less elastic when'],
  [
    ['Nature of the good', 'A luxury', 'A necessity such as salt'],
    ['Substitutes', 'Many close substitutes', 'Few or none'],
    ['Share of income', 'A large share of the budget', 'A tiny share'],
    ['Time period', 'A longer period, so buyers can adjust', 'A short period'],
  ],
  'Table of the four determinants of the price elasticity of demand: nature of the good, availability of substitutes, share of income and time period',
  'Imagined fruit stall.',
);
const tSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Marginal utility', 'Change in total utility from one more unit; it falls, reaches zero at the maximum of total utility'],
    ['One good', 'Equilibrium where MU ÷ price equals the marginal utility of a rupee'],
    ['Two goods', 'MUx ÷ Px = MUy ÷ Py = marginal utility of a rupee'],
    ['Budget line', 'P1x1 + P2x2 = M; intercepts M ÷ P1, M ÷ P2; slope P1 ÷ P2'],
    ['Indifference curve', 'Equal satisfaction; downward, convex, never crossing; higher is better'],
    ['Equilibrium', 'Tangency of the budget line with the highest curve: MRS = P1 ÷ P2'],
  ],
  'Summary table of Part 1: marginal utility, equilibrium with one and two goods, the budget line, indifference curves and the tangency equilibrium',
);
const tSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Demand', 'Quantity willing and able to buy at each price in a period'],
    ['Law of demand', 'Price and quantity move in opposite directions, other things unchanged'],
    ['Movement and shift', 'Own price moves along; other determinants shift the curve'],
    ['Market demand', 'Horizontal sum of individual demands'],
    ['Elasticity', 'Percentage change in quantity ÷ percentage change in price'],
    ['Expenditure method', 'Opposite to price: above one; unchanged: one; with price: below one'],
  ],
  'Summary table of Part 2: demand, the law of demand, movement and shift, market demand, elasticity and the expenditure method',
);

// ---------------------------------------------------------------- deck 1: utility, budget and indifference curves
const part1 = deck({
  part: 1,
  title: 'Theory of Consumer Behaviour — Part 1: Utility, Budget Line and Indifference Curves',
  goals: [
    'Compute marginal utility from total utility and state the law of diminishing marginal utility',
    'Find consumer equilibrium for one good and for two goods',
    'Draw the budget line and compute its shifts and rotations',
    'Explain indifference curves, the marginal rate of substitution and equilibrium at the tangency',
  ],
  slides: [
    sl('title', 'Utility and the Consumer', {
      b: 'Part 1: how a consumer decides what to buy, by **utility** and by **indifference curves**.',
      v: vRoute1,
      n: 'A consumer has limited income and many wants. This part shows how she decides what to buy. First we measure satisfaction as utility and find the best choice for one good and for two goods. Then we draw the budget line, introduce indifference curves, and find the equilibrium where the two touch.',
    }),
    sl('concept', 'Utility, total utility and marginal utility', {
      b: '**Utility** is the satisfaction a consumer gets from a good. **Total utility (TU)** is the satisfaction from all units consumed; **marginal utility (MU)** is the change in total utility from one more unit: MU = change in TU.',
      v: tTuMu,
      n: `Utility is the satisfaction a consumer gets from a good. Total utility is the satisfaction from all the units she has consumed. Marginal utility is the extra total utility from one more unit. Meera, an imagined student, eats samosas. Her total utility rises from ${TU[2]} to ${TU[3]} for the third samosa, so its marginal utility is ${MU[2]}.`,
    }),
    sl('concept', 'The law of diminishing marginal utility', {
      b: `As more units of a good are consumed, other things unchanged, **MU falls**. When MU reaches zero, TU is at its **maximum** (${Math.max(...TU)} utils); after that MU is **negative** and TU falls.`,
      v: vTUMU,
      n: `The left curve shows total utility rising, reaching its highest point of ${Math.max(...TU)} at the fifth samosa, and then falling. The right curve shows marginal utility falling at every step: ${MU[0]}, ${MU[1]}, ${MU[2]}, ${MU[3]}, then zero. At zero, total utility is at its maximum. After that marginal utility is negative. This is the law of diminishing marginal utility.`,
    }),
    sl('example', 'Worked example 1: from total to marginal utility', {
      b: 'Find the marginal utility of each of Meera\'s samosas.',
      bl: [
        'Step 1: **MU = TU of this unit − TU of the unit before.**',
        `Step 2: The first four give ${J(MU.slice(0, 4))} utils: falling.`,
        `Step 3: The fifth gives ${TU[5]} − ${TU[4]} = **${MU[4]}**; the sixth gives ${TU[6]} − ${TU[5]} = **${MU[5]}**.`,
      ],
      v: tTuWork,
      n: `Subtract the total utility before from the total utility after. The first four samosas give marginal utilities of ${MU[0]}, ${MU[1]}, ${MU[2]} and ${MU[3]}. The fifth samosa adds nothing, so its marginal utility is zero and total utility is at its peak. The sixth reduces total utility from ${TU[5]} to ${TU[6]}, so its marginal utility is negative ten.`,
    }),
    sl('check', 'Quick check: negative marginal utility', {
      b: 'Interpret a fall in total utility.',
      chk: 'm_neg_mu',
      n: 'Look at what happens to total utility when the extra samosa is eaten. If total utility falls, the change attributed to the extra unit is negative. Pick the option that gives the correct sign and the correct meaning.',
    }),
    sl('concept', 'Consumer equilibrium with one commodity', {
      b: `A consumer who buys one good is in equilibrium where **MU of the good ÷ its price = MU of a rupee** (MUx ÷ Px). At Rs ${PS} per samosa and ${MUM} utils per rupee this happens at the **third** samosa.`,
      v: tOne,
      n: `Meera compares each samosa with the satisfaction of the money she gives up. One rupee is worth ${MUM} utils to her. The price is ${PS} rupees. For each samosa she divides its marginal utility by the price. The second samosa gives more than ${MUM}, so she buys it. The third gives exactly ${MUM}, so she stops there. The fourth gives less.`,
    }),
    sl('example', 'Worked example 2: a fall in price', {
      b: `The price of a samosa falls from Rs ${PS} to Rs ${PS2}.`,
      bl: [
        `Step 1: Required MU = price × MU of a rupee = ${PS} × ${MUM} = **${PS * MUM}** at the old price.`,
        `Step 2: At Rs ${PS2} the required MU = ${PS2} × ${MUM} = **${PS2 * MUM}**, which is the fourth samosa.`,
        `Step 3: She buys **${eqQ2}** samosas instead of ${eqQ}.`,
      ],
      v: tEqFall,
      n: `At four rupees the required marginal utility is twenty, which belongs to the third samosa. When the price falls to ${PS2} rupees, the required marginal utility falls to ${PS2 * MUM}, which belongs to the fourth samosa. So a lower price makes Meera buy one more samosa, because marginal utility diminishes.`,
    }),
    sl('concept', 'Consumer equilibrium with two commodities', {
      b: `With two goods the consumer spends her whole income so that **MUx ÷ Px = MUy ÷ Py = MU of a rupee**. This is the law of **equi-marginal utility**: the last rupee yields the same satisfaction on each good.`,
      v: tTwo,
      n: `Meera has ${INC} rupees for samosas at ${PX} rupees and juice at ${PY} rupees. For each unit of each good she works out marginal utility per rupee. The ratios are equal at ${eqRatio} for the third samosa and the second glass of juice. Buying them costs exactly her whole income, so this is her equilibrium.`,
    }),
    sl('example', 'Worked example 3: finding the equilibrium bundle', {
      b: `Compare bundles of samosas and juice for Meera, who has Rs ${INC}.`,
      bl: [
        `Step 1: At (${BAD1[0]}, ${BAD1[1]}) the ratios are ${rX[BAD1[0] - 1]} and ${rY[BAD1[1] - 1]}: unequal, so she should buy more juice.`,
        `Step 2: At (${BAD2[0]}, ${BAD2[1]}) the ratios are ${rX[BAD2[0] - 1]} and ${rY[BAD2[1] - 1]}: she should buy more samosas.`,
        `Step 3: At (${best.x}, ${best.y}) both ratios are **${eqRatio}** and the cost is Rs ${PX * best.x + PY * best.y}: equilibrium, total utility **${uBest}**.`,
      ],
      v: tTwoBundle,
      n: `Test each bundle. With four samosas and one glass of juice, a rupee on juice gives more satisfaction than a rupee on samosas, so she should shift toward juice. With one samosa and three glasses, the reverse holds. With three samosas and two glasses both ratios are ${eqRatio}, and her total utility of ${uBest} is the highest of the three.`,
    }),
    sl('check', 'Quick check: the equilibrium condition', {
      b: 'State the condition for a single-good consumer.',
      chk: 'm_eq_one',
      n: 'Recall that a consumer buying one good compares what the last unit is worth with what she pays for it. Marginal utility divided by price is the satisfaction per rupee spent. Choose the option that equates this with the marginal utility of a rupee.',
    }),
    sl('concept', 'Budget set and budget line', {
      b: `The **budget line** shows the bundles that cost exactly the income: **P1x1 + P2x2 = M**. Intercepts are **M ÷ P1** and **M ÷ P2**; the slope is **−P1 ÷ P2**. The **budget set** is every affordable bundle, on and below the line.`,
      v: vBudget,
      n: `Meera has ${M0} rupees. Mangoes cost ${P1_0} rupees a kilogram and guavas ${P2_0}. If she spends everything on mangoes she buys ${B0.a} kilograms, and if everything on guavas, ${B0.b}. The line between these points is the budget line. Its slope is the price ratio, ${B0.slope}. Points inside the triangle are affordable and points beyond the line are not.`,
    }),
    sl('concept', 'Shifts and rotations of the budget line', {
      b: 'A change in **income** shifts the line in parallel. A change in **one price** rotates the line about the intercept of the other good.',
      v: vBudgetShifts,
      n: `If income rises to ${B_inc.M} rupees, both intercepts rise and the line moves outward, parallel to the old one. If income falls to ${B_dec.M}, it moves inward. If the price of mangoes rises to ${B_p1.P1}, the mango intercept falls to ${B_p1.a}, but the guava intercept stays at ${B_p1.b}, so the line rotates and becomes steeper.`,
    }),
    sl('example', 'Worked example 4: budget lines in six cases', {
      b: 'Compute intercepts and slope from M ÷ P1, M ÷ P2 and P1 ÷ P2.',
      bl: [
        `Step 1: Start: ${M0} ÷ ${P1_0} = ${B0.a}, ${M0} ÷ ${P2_0} = ${B0.b}, slope ${B0.slope}.`,
        `Step 2: Income to ${B_inc.M}: intercepts **${B_inc.a}** and **${B_inc.b}**, slope unchanged.`,
        `Step 3: Price 2 to ${B_p2.P2}: intercepts ${B_p2.a} and **${B_p2.b}**, slope **${B_p2.slope}**.`,
      ],
      v: tBudgetWork,
      n: `Divide income by each price to get the intercepts, and divide the first price by the second to get the slope. Raising income to ${B_inc.M} gives ${B_inc.a} and ${B_inc.b} with the same slope. Raising the guava price to ${B_p2.P2} leaves the mango intercept at ${B_p2.a} but cuts the guava intercept to ${B_p2.b}, and the slope falls to ${B_p2.slope}.`,
    }),
    sl('check', 'Quick check: an intercept', {
      b: 'Compute a horizontal intercept from income and price.',
      chk: 'n_intercept',
      n: 'Divide the income by the price of the good on the horizontal axis. This gives the most of that good the consumer can buy if she spends nothing on the other good. Give your answer in the number of units.',
    }),
    sl('concept', 'Preferences and the indifference map', {
      b: 'With **monotonic preferences** the consumer prefers more of at least one good. An **indifference curve** joins bundles of **equal satisfaction**; a set of such curves is an **indifference map**.',
      v: vICmap,
      n: 'A consumer with monotonic preferences always prefers a bundle with more of at least one good. An indifference curve joins bundles that give the same satisfaction. Together the curves form an indifference map. The curve that lies farther from the origin holds bundles with more of the goods, so it shows higher satisfaction.',
    }),
    sl('concept', 'Marginal rate of substitution', {
      b: '**MRS** is the amount of good 2 a consumer will give up for one more unit of good 1, staying on the same curve. It **diminishes**, so the curve is **convex to the origin**.',
      v: vMRS,
      n: `Meera is equally happy at each of these points. Moving from the first to the second she gives up ${IGIVE[0]} kilograms of erasers for one more kilogram of pencils. The next steps cost ${MRS[1]}, then ${MRS[2]}, then ${MRS[3]}. The rate keeps falling, because the more pencils she has, the less she will give up for another. That makes the curve convex.`,
    }),
    sl('concept', 'Properties of indifference curves', {
      b: 'Indifference curves **slope downward**, a **higher curve** means higher satisfaction, they **never intersect**, and they are **convex** to the origin.',
      v: tProps,
      n: 'Indifference curves have four properties. They slope downward, because getting more of one good must be offset by less of the other. A higher curve shows higher satisfaction. Two curves never cross, because a common bundle would have two satisfaction levels. And they are convex to the origin, because the marginal rate of substitution diminishes.',
    }),
    sl('concept', 'Equilibrium at the tangency', {
      b: `The consumer reaches the **highest indifference curve the budget allows**, where the budget line just touches it. There **MRS = P1 ÷ P2**. For Meera: ${eqX} kg of mangoes and ${eqY} kg of guavas.`,
      v: vEq,
      n: `Meera wants the highest curve she can reach. The curve with the product ${K[2]} lies out of reach. The lowest curve is reachable but leaves her worse off than she could be. The middle curve touches the budget line at ${eqX} kilograms of mangoes and ${eqY} of guavas. At that point the slope of the curve equals the slope of the budget line.`,
    }),
    sl('example', 'Worked example 5: finding the tangency bundle', {
      b: `Rohan has Rs ${BR.M}, notebooks cost Rs ${BR.P1} and pens Rs ${BR.P2}. His satisfaction is the product of the quantities, so MRS = y ÷ x.`,
      bl: [
        `Step 1: Set MRS = price ratio: y ÷ x = ${BR.P1} ÷ ${BR.P2}, so y = ${BR.slope}x.`,
        `Step 2: Put this in the budget line: ${BR.P1}x + ${BR.P2}y = ${BR.M} gives **x = ${rohanX}**.`,
        `Step 3: y = ${BR.slope} × ${rohanX} = **${rohanY}**.`,
      ],
      v: tRohan,
      n: `Rohan sets his marginal rate of substitution equal to the price ratio, which is ${BR.slope}. That gives pens equal to ${BR.slope} times notebooks. Putting this in the budget line gives ${BR.P1 + BR.P2 * BR.slope} times the number of notebooks equal to ${BR.M}. So he buys ${rohanX} notebooks and ${rohanY} pens, and spends all of his income.`,
    }),
    sl('check', 'Quick check: why the curve is convex', {
      b: 'Link the falling MRS to the shape of the curve.',
      chk: 'm_mrs_dim',
      n: 'Read the three values of the marginal rate of substitution. They fall as the consumer moves down the curve. Decide what shape of curve has a slope that becomes flatter as you move to the right, and choose the matching option.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: `To recap. Marginal utility is the change in total utility and it diminishes. A one-good consumer buys until marginal utility divided by price equals the marginal utility of a rupee. With two goods the ratios are equal. The budget line has intercepts and a slope fixed by income and prices. Indifference curves slope downward, are convex and never cross. Equilibrium is at the tangency, where the marginal rate of substitution equals the price ratio.`,
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Compute **MU = change in TU** and show every step.',
        'For equilibrium, divide MU by price and **compare with the MU of a rupee**.',
        'Write the **budget equation** before the intercepts and slope.',
        'A price change **rotates** the budget line; an income change **shifts** it.',
        'Give **MRS = P1 ÷ P2** as the equilibrium condition and state that the curve is convex.',
      ],
      n: 'Some tips. Compute marginal utility by subtracting and show each step. For equilibrium divide marginal utility by price and compare it with the marginal utility of a rupee. Write the budget equation before the intercepts and slope. Remember that a price change rotates the budget line, while an income change shifts it. State that at equilibrium the marginal rate of substitution equals the price ratio.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2: demand and elasticity
const part2 = deck({
  part: 2,
  title: 'Theory of Consumer Behaviour — Part 2: Demand and Price Elasticity of Demand',
  goals: [
    'Define demand and state the law of demand with its reasons',
    'Distinguish a movement along the demand curve from a shift',
    'Derive market demand by horizontal summation',
    'Measure price elasticity of demand by the percentage and expenditure methods',
  ],
  slides: [
    sl('title', 'Demand and Elasticity', {
      b: 'Part 2: **demand** and its determinants, **market demand**, and **price elasticity of demand**.',
      v: vRoute2,
      n: 'The first part explained how a consumer chooses. This part turns her choices into demand. We define demand, list what determines it, separate a movement along the curve from a shift, add buyers together to get market demand, and measure how strongly buyers respond to a change in price.',
    }),
    sl('concept', 'Demand and the demand schedule', {
      b: '**Demand** is the quantity of a good a consumer is **willing and able** to buy at each price over a period. A **demand schedule** lists these quantities.',
      v: tAnil,
      n: `Demand is the quantity a consumer is willing and able to buy at each price in a given period. Anil, an imagined regular at a tea stall, buys ${DA[0]} cups a day when tea costs ${PR[0]} rupees, and ${DA[4]} cups when it costs ${PR[4]}. A list of prices and quantities like this is a demand schedule.`,
    }),
    sl('concept', 'The demand curve', {
      b: 'Plotting the schedule gives a **downward-sloping demand curve**: when the price falls, the quantity demanded rises.',
      v: vDemand,
      n: `Plot the price on the vertical axis and the quantity on the horizontal axis. Each point of Anil's schedule lies on a curve that slopes downward from left to right. At ${PR[0]} rupees he buys ${DA[0]} cups. At ${PR[4]} rupees he buys ${DA[4]} cups. The downward slope shows that a lower price brings a larger quantity demanded.`,
    }),
    sl('concept', 'The demand function and its determinants', {
      b: 'The quantity demanded depends on the **own price**, the **prices of related goods**, **income**, **tastes and preferences** and **expectations**.',
      v: tDeterm,
      n: 'Quantity demanded depends on several things at once. The good\'s own price changes the quantity demanded along the same curve. The price of related goods, the income of buyers, their tastes and their expectations change the demand itself, so the whole curve moves. The table lists each determinant for the tea stall.',
    }),
    sl('concept', 'The law of demand and its reasons', {
      b: '**Law of demand:** other things unchanged, a fall in price raises the quantity demanded and a rise lowers it. Reasons: **substitution effect**, **income effect** and **diminishing marginal utility**.',
      v: tLaw,
      n: 'The law of demand says that, other things unchanged, price and quantity demanded move in opposite directions. There are three reasons. A cheaper good is more attractive than its substitutes. A lower price raises real income, so buyers can afford more. And since marginal utility diminishes, buyers take more units only if the price is lower.',
    }),
    sl('check', 'Quick check: what demand means', {
      b: 'Pick the correct meaning of demand.',
      chk: 'm_demand_def',
      n: 'Think about both parts of demand: the buyer must want the good and be able to pay for it. Demand also refers to a period of time and to several prices. Choose the option that includes all of these ideas.',
    }),
    sl('concept', 'Normal and inferior goods', {
      b: 'For a **normal good** demand rises with income. For an **inferior good** demand **falls** when income rises, because buyers switch to better goods.',
      v: tNormInf,
      n: 'Income affects demand in different ways. For a normal good, such as fruit juice, demand rises when income rises. For an inferior good, such as coarse millet flour in an imagined village, demand falls when income rises, because households move to better alternatives. Which kind a good is depends on the buyers.',
    }),
    sl('concept', 'Substitutes and complements', {
      b: `**Substitutes** are used in place of each other; a rise in the price of one raises demand for the other. **Complements** are used together; a rise in the price of one **lowers** demand for the other.`,
      v: tRelated,
      n: `Tea and coffee are substitutes. If coffee becomes dearer, buyers switch to tea, and demand for tea rises at every price. Tea and sugar are complements. If sugar becomes dearer, tea with sugar costs more, and demand for tea falls at every price. At six rupees, tea demand moves from ${DM[2]} cups to ${DMS[2]} in the first case and ${DMC[2]} in the second.`,
    }),
    sl('concept', 'Movement along and shift of the demand curve', {
      b: 'A change in the **own price** causes a **movement along** the curve. A change in any **other determinant** shifts the **whole curve**.',
      v: vMoveShift,
      n: `Look at the points. When the price falls from ${PR[1]} to ${PR[2]} rupees, the stall moves from the first point to the second along the same curve, and the quantity demanded rises from ${DM[1]} to ${DM[2]} cups. When incomes rise, the whole curve shifts to the right. At the same price of ${PR[2]} rupees demand is now ${DM1[2]} cups.`,
    }),
    sl('example', 'Worked example 1: movement or shift?', {
      b: 'Classify two changes at the imagined tea stall.',
      bl: [
        `Step 1: Price falls from ${PR[1]} to ${PR[2]}; quantity ${DM[1]} to ${DM[2]}: **movement along D0**.`,
        `Step 2: Incomes rise; at the unchanged price ${PR[2]}, quantity ${DM[2]} to ${DM1[2]}: **shift** to D1.`,
        `Step 3: Own price: move along. Any other cause: shift.`,
      ],
      v: tMoveWork,
      n: `Ask what caused the change. A fall in the price of tea itself changes the quantity from ${DM[1]} to ${DM[2]} cups, which is a movement along the same curve. A rise in incomes changes the quantity at the same price from ${DM[2]} to ${DM1[2]}, so the whole curve has shifted. Own price moves along; anything else shifts.`,
    }),
    sl('concept', 'Market demand', {
      b: '**Market demand** is the **horizontal sum** of the individual demands: at each price, add the quantities of all buyers.',
      v: vMarket,
      n: `Market demand adds up all buyers. At ${PR[2]} rupees Anil buys ${DA[2]} cups, Bela ${DB[2]} and Charu ${DC[2]}. The market therefore demands ${DM[2]} cups at that price. Repeating this at every price traces the market demand curve, which is the horizontal sum of the three individual curves.`,
    }),
    sl('example', 'Worked example 2: adding three buyers', {
      b: 'Add the quantities at each price.',
      bl: [
        `Step 1: At Rs ${PR[1]}: ${DA[1]} + ${DB[1]} + ${DC[1]} = **${DM[1]}** cups.`,
        `Step 2: At Rs ${PR[2]}: ${DA[2]} + ${DB[2]} + ${DC[2]} = **${DM[2]}** cups.`,
        `Step 3: At Rs ${PR[3]}: ${DA[3]} + ${DB[3]} + ${DC[3]} = **${DM[3]}** cups.`,
      ],
      v: tMarket,
      n: `At eight rupees the three buyers take ${DA[1]}, ${DB[1]} and ${DC[1]} cups, so the market takes ${DM[1]}. At six rupees the total is ${DM[2]}, and at four rupees it is ${DM[3]}. Bela buys nothing at ten rupees, but enters at lower prices. Market demand slopes downward just as each individual's does.`,
    }),
    sl('check', 'Quick check: market demand', {
      b: 'Add individual demands at one price.',
      chk: 'n_market_q',
      n: 'Pick out the quantity each buyer takes at the price asked about. Be careful to read the same position in each list. Then add the three quantities to get the market demand at that price.',
    }),
    sl('concept', 'Price elasticity of demand: the percentage method', {
      b: '**Price elasticity of demand (ed)** = percentage change in quantity demanded ÷ percentage change in price. The ratio is negative for a normal demand curve; it is quoted **without the sign**.',
      v: tEdFormula,
      n: 'Price elasticity of demand measures how strongly buyers respond to a change in price. Divide the percentage change in quantity demanded by the percentage change in price, both measured from the old values. Because price and quantity move in opposite directions, the number is negative, and it is usually quoted without the sign.',
    }),
    sl('example', 'Worked example 3: computing elasticity', {
      b: 'Apples and salt at Meera\'s imagined stall.',
      bl: [
        `Step 1: Apples: quantity ${EA.dq} per cent, price ${EA.dp} per cent: ed = ${Math.abs(EA.dq)} ÷ ${EA.dp} = **${EA.ed}**.`,
        `Step 2: Salt: quantity ${ES.dq} per cent, price ${ES.dp} per cent: ed = ${Math.abs(ES.dq)} ÷ ${ES.dp} = **${ES.ed}**.`,
        'Step 3: Above one: elastic. Below one: inelastic.',
      ],
      v: tEdWork,
      n: `For apples the price rises by ${EA.dp} per cent and the quantity falls by ${Math.abs(EA.dq)} per cent, so elasticity is ${EA.ed}, which is greater than one. For salt the price also rises by ${ES.dp} per cent but quantity falls by only ${Math.abs(ES.dq)} per cent, so elasticity is ${ES.ed}, less than one.`,
    }),
    sl('concept', 'The five cases of elasticity', {
      b: 'Demand is **perfectly elastic** (infinite), **greater than one**, **unitary** (one), **less than one** or **perfectly inelastic** (zero).',
      v: vFive,
      n: 'There are five cases. For perfectly elastic demand the curve is horizontal and any price rise reduces quantity to zero. If elasticity is greater than one, the curve is flat. If it is one, quantity changes by the same percentage as price. If it is less than one, the curve is steep. If demand is perfectly inelastic, the curve is vertical.',
    }),
    sl('concept', 'The total expenditure method', {
      b: 'Compare **total expenditure** (price × quantity) before and after a price change. Opposite to price: **above one**. Unchanged: **one**. With price: **below one**.',
      v: tExp,
      n: 'The total expenditure method needs only the expenditure before and after a price change. If expenditure moves opposite to price, elasticity is greater than one. If expenditure does not change, elasticity equals one. If expenditure moves in the same direction as price, elasticity is less than one.',
    }),
    sl('example', 'Worked example 4: using total expenditure', {
      b: 'Three imagined goods.',
      bl: [
        `Step 1: Tea: price ${ET.p0} to ${ET.p1}, expenditure ${ET.e0} to ${ET.e1}: opposite, so **greater than one**.`,
        `Step 2: Fish: price ${EF.p0} to ${EF.p1}, expenditure ${EF.e0} to ${EF.e1}: together, so **less than one**.`,
        `Step 3: Bus pass: price ${EP.p0} to ${EP.p1}, expenditure stays ${EP.e1}: **equal to one**.`,
      ],
      v: tExpWork,
      n: `Tea falls in price from ${ET.p0} to ${ET.p1} and expenditure rises from ${ET.e0} to ${ET.e1}. They move in opposite directions, so elasticity exceeds one. For fish, price and expenditure both fall, so elasticity is less than one. For the bus pass, expenditure stays at ${EP.e1}, so elasticity equals one.`,
    }),
    sl('concept', 'What determines elasticity', {
      b: 'Elasticity is higher for **luxuries**, goods with **many substitutes**, goods that take a **large share of income** and over a **longer period**.',
      v: tEdDet,
      n: 'Four things influence elasticity. Necessities such as salt have inelastic demand, while luxuries are more elastic. The more close substitutes a good has, the more elastic its demand. A good that takes a large share of income is more elastic than one that takes a tiny share. And demand is more elastic over a longer period, when buyers have time to adjust.',
    }),
    sl('check', 'Quick check: classify the demand', {
      b: 'Read the elasticity of salt.',
      chk: 'm_ed_class',
      n: 'Compare the percentage fall in quantity with the percentage rise in price. If quantity changes by a smaller percentage than price, the elasticity is below one and demand is inelastic. Be careful not to choose perfectly inelastic, which means no response at all.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To recap. Demand is the quantity a consumer is willing and able to buy at each price. By the law of demand, price and quantity demanded move in opposite directions. A change in own price moves us along the curve and a change in any other determinant shifts it. Market demand is the horizontal sum of individual demands. Elasticity is the percentage change in quantity divided by the percentage change in price, and it can also be read from total expenditure.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define demand with **willing and able**, a **price**, and a **period**.',
        'Say whether a change is a **movement** (own price) or a **shift** (other cause).',
        'For market demand, **add quantities at each price**, never prices.',
        'Compute both **percentage changes from the old values** and quote ed without the sign.',
        'For the expenditure method, compare **price and expenditure directions** and name the case.',
        'For a large price change the two methods can differ slightly at the borderline of one; use the method the question names.',
      ],
      n: 'Some tips. Define demand with willingness, ability, a price and a period. Always say whether a change is a movement along the curve or a shift, and name the cause. For market demand add quantities at each price. For elasticity compute both percentage changes from the old values. For the expenditure method compare the directions of price and expenditure, and name the case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Theory of Consumer Behaviour — Notes',
  sections: [
    {
      h: '1. Utility and marginal utility',
      t: 1,
      b: `**Utility** is the satisfaction a consumer gets from consuming a good or service. **Total utility (TU)** is the satisfaction from all the units consumed; **marginal utility (MU)** is the addition to total utility from one more unit, **MU = change in TU**.\n\nThe **law of diminishing marginal utility** says that, other things unchanged, MU falls as more of a good is consumed. When MU is zero, TU is at its maximum; when MU is negative, TU falls. For the imagined student Meera, samosas give TU of ${J(TU)} utils for 0 to 6 samosas, so MU is ${J(MU)}.`,
      terms: [
        ['Utility', 'The satisfaction a consumer derives from consuming a good or service.'],
        ['Total utility', 'The total satisfaction obtained from all the units of a good consumed.'],
        ['Marginal utility', 'The change in total utility from consuming one more unit of a good.'],
        ['Law of diminishing marginal utility', 'As a consumer consumes more units of a good, the marginal utility from each additional unit falls, other things unchanged.'],
      ],
      v: vTUMU,
      vs: [tTuMu, tTuWork],
    },
    {
      h: '2. Consumer\'s equilibrium by utility analysis',
      t: 1,
      b: `A consumer is in **equilibrium** when she has no reason to change her purchases. With **one good**, she buys until **MUx ÷ Px = MU of a rupee** (the marginal utility of money, taken as constant). At Rs ${PS} per samosa and ${MUM} utils per rupee, the required MU is ${PS} × ${MUM} = ${PS * MUM}, which is the third samosa; at Rs ${PS2} it is ${PS2 * MUM}, which is the fourth.\n\nWith **two goods**, equilibrium needs **MUx ÷ Px = MUy ÷ Py = MU of a rupee** (the **law of equi-marginal utility**) and the whole income spent. Meera, with Rs ${INC}, samosas at Rs ${PX} and juice at Rs ${PY}, reaches it at ${best.x} samosas and ${best.y} glasses of juice, where both ratios are ${eqRatio}.`,
      terms: [
        ['Consumer\'s equilibrium', 'The position in which a consumer, given income and prices, has no tendency to change her purchases because her satisfaction is as high as it can be.'],
        ['Law of equi-marginal utility', 'A consumer maximises satisfaction by spending so that the marginal utility per rupee is the same for every good.'],
      ],
      v: tOne,
      vs: [tTwo, tTwoBundle],
    },
    {
      h: '3. Budget set and budget line',
      t: 2,
      b: `The **budget set** is all the bundles a consumer can afford; its upper boundary is the **budget line**, **P1x1 + P2x2 = M**. The intercepts are **M ÷ P1** and **M ÷ P2**, and the slope is **−P1 ÷ P2**. For Meera (M = ${M0}, P1 = ${P1_0}, P2 = ${P2_0}) the intercepts are ${B0.a} and ${B0.b} and the slope is −${B0.slope}.\n\nA rise in income shifts the line outward in parallel (intercepts ${B_inc.a} and ${B_inc.b} at income ${B_inc.M}); a fall shifts it inward. A rise in P1 rotates the line about the intercept on good 2 (mango intercept ${B_p1.a}, slope ${B_p1.slope}); a rise in P2 rotates it about the intercept on good 1 (guava intercept ${B_p2.b}, slope ${B_p2.slope}).`,
      terms: [
        ['Budget set', 'The set of all bundles of two goods that the consumer can afford at given prices and income.'],
        ['Budget line', 'The set of bundles that cost exactly the consumer\'s income: P1x1 + P2x2 = M.'],
      ],
      v: vBudget,
      vs: [vBudgetShifts, tBudgetWork],
    },
    {
      h: '4. Indifference curves and the marginal rate of substitution',
      t: 2,
      b: `With **monotonic preferences** a consumer prefers a bundle that has more of at least one good and no less of the other. An **indifference curve** joins bundles that give equal satisfaction; an **indifference map** is a set of such curves.\n\nThe **marginal rate of substitution (MRS)** is the amount of good 2 the consumer will give up for one more unit of good 1, staying on the same curve. It diminishes (${J(MRS)} in the imagined schedule), so the curve is **convex to the origin**.\n\nProperties: the curves **slope downward**; a **higher curve** shows higher satisfaction; they **never intersect**; they are **convex**.`,
      terms: [
        ['Monotonic preferences', 'Preferences in which a bundle with more of at least one good, and no less of the other, is preferred.'],
        ['Indifference curve', 'A curve joining all bundles of two goods that give the consumer equal satisfaction.'],
        ['Marginal rate of substitution', 'The quantity of good 2 a consumer is willing to give up for one more unit of good 1 while remaining equally satisfied.'],
      ],
      v: vICmap,
      vs: [vMRS, tMrs, tProps],
    },
    {
      h: '5. Equilibrium with indifference curves',
      t: 2,
      b: `The consumer reaches the **highest indifference curve the budget line allows**. At that point the budget line **touches** the curve (tangency), so **MRS = P1 ÷ P2**. Meera's best bundle is ${eqX} kg of mangoes and ${eqY} kg of guavas: MRS = ${eqY} ÷ ${eqX} = ${mrsAt(eqX, eqY)}, equal to the price ratio ${B0.slope}. Other affordable bundles, such as (2, 8) and (4, 4), lie on a lower curve, and a higher curve cannot be reached.`,
      terms: [],
      v: vEq,
      vs: [tRohan],
    },
    {
      h: '6. Demand, its determinants and market demand',
      t: 3,
      b: `**Demand** is the quantity of a good a consumer is willing and able to buy at each price in a given period. The **demand function** relates quantity demanded to the **own price**, **prices of related goods** (substitutes, complements), **income**, **tastes and preferences** and **expectations**.\n\nThe **law of demand**: other things unchanged, price and quantity demanded move in opposite directions. Reasons: the **substitution effect**, the **income effect** and **diminishing marginal utility**. For a **normal good** demand rises with income; for an **inferior good** it falls.\n\nA change in the own price causes a **movement along** the demand curve; a change in any other determinant **shifts** it. **Market demand** is the **horizontal sum** of the individual demands: with Anil, Bela and Charu it is ${J(DM)} cups at prices Rs ${J(PR)}.`,
      terms: [
        ['Demand', 'The quantity of a good that a consumer is willing and able to buy at each price during a given period.'],
        ['Law of demand', 'Other things unchanged, the quantity demanded of a good rises when its price falls and falls when its price rises.'],
        ['Substitutes', 'Goods that can be used in place of each other; a rise in the price of one raises the demand for the other.'],
        ['Complements', 'Goods that are used together; a rise in the price of one lowers the demand for the other.'],
        ['Market demand', 'The sum of the quantities demanded by all buyers in the market at each price.'],
      ],
      v: vDemand,
      vs: [tDeterm, tLaw, vMoveShift, vMarket],
    },
    {
      h: '7. Price elasticity of demand',
      t: 4,
      b: `By the **percentage method**, **ed = (percentage change in quantity demanded) ÷ (percentage change in price)**, both measured from the old values. The ratio is negative for a normal demand curve; it is quoted without the sign. For imagined apples, quantity falls ${Math.abs(EA.dq)} per cent when price rises ${EA.dp} per cent: ed = ${EA.ed}.\n\nThe five cases: **perfectly elastic** (infinity, horizontal curve), **greater than one**, **unitary** (equal to one), **less than one**, **perfectly inelastic** (zero, vertical curve).\n\nBy the **total expenditure method**: expenditure moving **opposite** to price means ed is **greater than one**; **unchanged** means **one**; moving **with** price means **less than one**.\n\nElasticity is higher for luxuries, for goods with many close substitutes, for goods that take a large share of income and over a longer period.`,
      terms: [
        ['Price elasticity of demand', 'The responsiveness of the quantity demanded of a good to a change in its own price, measured as the percentage change in quantity demanded divided by the percentage change in price.'],
        ['Total expenditure', 'Price multiplied by the quantity bought.'],
      ],
      v: vFive,
      vs: [tEdFormula, tEdWork, tExp, tExpWork, tEdDet],
    },
  ],
  tips: '- Compute **MU = change in TU**; state that MU falls, is zero at maximum TU and negative after.\n- Equilibrium: **MUx ÷ Px = MU of a rupee** (one good); **MUx ÷ Px = MUy ÷ Py** (two goods).\n- Write the **budget equation**, intercepts **M ÷ P1**, **M ÷ P2** and slope **P1 ÷ P2**.\n- Income **shifts** the budget line; a price **rotates** it.\n- Equilibrium with curves: **tangency, MRS = P1 ÷ P2**.\n- **Movement** (own price) versus **shift** (other determinants); market demand is a **horizontal sum**.\n- Elasticity: compute **both percentage changes from the old values**; for the expenditure method compare directions.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Utility**', 'The satisfaction a consumer derives from consuming a good or service.', 'definition', 1],
  ['**Total utility**', 'The total satisfaction from all the units of a good consumed.', 'definition', 1],
  ['**Marginal utility**', 'The change in total utility from consuming one more unit: MU = change in TU.', 'formula', 1],
  ['Law of **diminishing marginal utility**', 'As more units of a good are consumed, other things unchanged, the marginal utility of each extra unit falls.', 'concept', 1],
  ['When marginal utility is **zero**', 'Total utility is at its maximum.', 'concept', 1],
  ['When marginal utility is **negative**', 'Total utility falls: the extra unit gives dissatisfaction.', 'concept', 1],
  ['Equilibrium with **one good**', 'MUx ÷ Px = marginal utility of a rupee: the last rupee spent gives the same satisfaction as a rupee kept.', 'formula', 1],
  ['Equilibrium with **two goods**', 'MUx ÷ Px = MUy ÷ Py = marginal utility of a rupee, with the whole income spent.', 'formula', 1],
  ['Law of **equi-marginal utility**', 'Spend so that the marginal utility per rupee is equal on every good.', 'concept', 1],
  ['**Budget set**', 'All bundles of two goods the consumer can afford at given prices and income.', 'definition', 2],
  ['**Budget line**', 'The bundles that cost exactly the income: P1x1 + P2x2 = M.', 'definition', 2],
  ['Intercepts and slope of the budget line', 'Intercepts M ÷ P1 and M ÷ P2; slope −P1 ÷ P2.', 'formula', 2],
  ['An **income rise** and the budget line', 'Parallel shift outward; the slope is unchanged.', 'concept', 2],
  ['A rise in **P1** and the budget line', 'Rotation about the intercept on good 2: the good 1 intercept falls and the line gets steeper.', 'concept', 2],
  ['**Monotonic preferences**', 'The consumer prefers a bundle with more of at least one good and no less of the other.', 'definition', 2],
  ['**Indifference curve**', 'A curve joining bundles of two goods that give equal satisfaction.', 'definition', 2],
  ['**Indifference map**', 'A set of indifference curves; a higher curve shows higher satisfaction.', 'definition', 2],
  ['**Marginal rate of substitution**', 'The amount of good 2 given up for one more unit of good 1, staying on the same curve.', 'definition', 2],
  ['Why is an indifference curve **convex**?', 'The marginal rate of substitution diminishes along the curve.', 'concept', 2],
  ['Properties of **indifference curves**', 'Downward sloping, higher is better, never intersect, convex to the origin.', 'concept', 2],
  ['Equilibrium with indifference curves', 'The budget line touches the highest attainable curve: MRS = P1 ÷ P2.', 'formula', 2],
  ['**Demand**', 'The quantity a consumer is willing and able to buy at each price in a given period.', 'definition', 3],
  ['**Law of demand**', 'Other things unchanged, a fall in price raises the quantity demanded.', 'concept', 3],
  ['Reasons for the **law of demand**', 'Substitution effect, income effect and diminishing marginal utility.', 'concept', 3],
  ['**Normal** and **inferior** goods', 'Normal: demand rises with income. Inferior: demand falls when income rises.', 'concept', 3],
  ['**Substitutes** and **complements**', 'Substitutes: a rise in the price of one raises demand for the other. Complements: it lowers it.', 'concept', 3],
  ['**Movement along** the demand curve', 'Caused by a change in the own price only.', 'concept', 3],
  ['**Shift** of the demand curve', 'Caused by a change in a determinant other than own price: income, related prices, tastes, expectations.', 'concept', 3],
  ['**Market demand**', 'The horizontal sum of individual demands: add quantities at each price.', 'definition', 3],
  ['**Price elasticity of demand**', 'Percentage change in quantity demanded ÷ percentage change in price, quoted without the sign.', 'formula', 4],
  ['The five cases of **elasticity**', 'Perfectly elastic, greater than one, unitary, less than one, perfectly inelastic.', 'concept', 4],
  ['**Total expenditure method**', 'Opposite to price: above one; unchanged: one; with price: below one.', 'concept', 4],
  ['Determinants of **elasticity**', 'Nature of the good, availability of substitutes, share of income, time period.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Theory of Consumer Behaviour',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_mu_zero', 'm_inc_shift', 'm_law_reason', 'ar_ed'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_dmu', 's2_move_shift', 's3_exp_method'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_eq_two', 'l_ic_eq'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_budget_ic'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Theory of Consumer Behaviour',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dmu', 'm_eq_two', 'm_price_rot', 'm_tangency', 'm_shift_vs_move', 'm_inferior', 'm_ed_cases', 'm_exp_method', 'ar_dmu', 'ar_move_shift'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_tu_mu', 's2_budget', { attempt: 1, keys: ['s2_demand_func', 's2_ed_def'] }, 's3_budget_shift', { attempt: 1, keys: ['s3_law_demand', 's3_market'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_dmu', { attempt: 1, keys: ['l_demand_shift', 'l_ed'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_samosa', 'cb_tea'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-11-economics-ch09 only (utility analysis and consumer equilibrium, budget line, indifference curves and the tangency equilibrium, demand and its determinants, market demand, price elasticity of demand by the percentage and total expenditure methods)',
    originality: 'every student, stall, shop, village and buyer is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all utilities, equilibrium bundles, budget-line intercepts and slopes, marginal rates of substitution, tangency bundles, market demand, shifts and elasticities computed from imagined data with stats.mjs or plain code and asserted with check(); every SVG is drawn from the same data and curve functions',
    facts: 'only stable textbook definitions and relations are stated: utility, TU, MU, diminishing marginal utility, equilibrium conditions, budget line, indifference curves, MRS, demand, determinants, law of demand, market demand, elasticity by the percentage and expenditure methods',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
