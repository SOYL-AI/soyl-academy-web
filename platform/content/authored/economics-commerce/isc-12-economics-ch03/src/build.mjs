// Build ISC 12 Economics ch03 Consumer Behaviour: Indifference Curve Analysis. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch03', 'economics-commerce');
const Qm = await import('./questions.mjs');
const {
  assert, mrs, budget, cost, eqXY, where, IRA, IRA_MRS, SURESH, SURESH_MRS, MEENAL, MEENAL_B, MEENAL_EQ, LOW_K, HIGH_K, R_X, S_X,
  KUNAL, KUNAL_B, KUNAL_INC, KUNAL_PXFALL, KUNAL_PYRISE,
} = Qm;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Narration below quotes these numbers; stop the build if the data change.
assert(IRA_MRS.join() === '5,4,3,2' && IRA[0][1] === 15 && IRA[4][1] === 1, 'deck Ira narration');
assert(MEENAL.M === 240 && MEENAL_B.xi === 12 && MEENAL_B.yi === 24 && MEENAL_EQ.x === 6 && MEENAL_EQ.y === 12, 'deck Meenal narration');
assert(KUNAL_B.xi === 10 && KUNAL_B.yi === 20 && KUNAL_INC.xi === 15 && KUNAL_INC.yi === 30 && KUNAL_PXFALL.xi === 15, 'deck Kunal narration');
const KE1 = eqXY(300, 30, 15), KE2 = eqXY(300, 20, 15);
assert(KE1.x === 5 && KE1.y === 10 && KE2.x === 7.5 && KE2.y === 10, 'deck Kunal equilibria');

// ---------------------------------------------------------------- SVG figures (plotted from equations and schedules)
const frame = (o) => {
  const s = new Svg(480, 340);
  const c = s.chart({ left: 64, top: 34, width: 340, height: 250, ...o });
  return { s, c };
};
const vIraIC = (() => {
  const { s, c } = frame({ x1: 6, y1: 17, xLabel: 'Apples (kg)', yLabel: 'Bananas (dozen)' });
  s.polyline(IRA.map(([x, y]) => [c.X(x), c.Y(y)]), { color: 'accent', sw: 2.6 });
  IRA.forEach(([x, y], i) => { c.dot([x, y], 'accent'); c.label([x, y], 'ABCDE'[i], { anchor: 'start', dx: 8, dy: -10, size: 13, bold: true }); });
  c.label([5, 1], 'IC', { anchor: 'start', dx: 12, dy: 6, size: 13, color: 'accent' });
  [1, 3, 5].forEach((x) => c.xTick(x, String(x)));
  [5, 10, 15].forEach((y) => c.yTick(y, String(y)));
  return s.visual(
    "Ira's indifference curve through five bundles A (1, 15), B (2, 10), C (3, 6), D (4, 3) and E (5, 1) of apples and bananas; it slopes downward and becomes flatter, convex to the origin",
    'Imagined Dehradun market: every bundle gives Ira the same satisfaction.',
  );
})();
const vMap = (() => {
  const { s, c } = frame({ x1: 10, y1: 12, xLabel: 'Good X', yLabel: 'Good Y' });
  [[8, 0.8, 'IC1'], [18, 1.6, 'IC2'], [32, 2.8, 'IC3']].forEach(([k, a, name], i) => {
    c.fn((x) => k / x, a, 9.4, { color: i === 1 ? 'accent' : i === 2 ? 'blue' : undefined, sw: 2.4 }, 60);
    c.label([9.4, k / 9.4], name, { anchor: 'start', dx: 6, size: 13 });
  });
  [2, 4, 6, 8].forEach((x) => c.xTick(x, String(x)));
  [4, 8].forEach((y) => c.yTick(y, String(y)));
  return s.visual(
    'Indifference map with three convex curves of the form X times Y equals 8, 18 and 32, labelled IC1, IC2 and IC3 outward from the origin; the curves never meet, and a higher curve shows more satisfaction',
    'Higher curve = higher satisfaction. The curves need not be parallel but never intersect.',
  );
})();
const vSteps = (() => {
  const { s, c } = frame({ x1: 6, y1: 17, xLabel: 'Apples (kg)', yLabel: 'Bananas (dozen)' });
  s.polyline(IRA.map(([x, y]) => [c.X(x), c.Y(y)]), { color: 'accent', sw: 2.4 });
  IRA.forEach(([x, y]) => c.dot([x, y], 'accent'));
  IRA.slice(1).forEach(([x, y], i) => {
    const [px, py] = IRA[i];
    c.seg([px, py], [px, y], { color: 'muted', dash: true, sw: 1.4 });
    c.seg([px, y], [x, y], { color: 'muted', dash: true, sw: 1.4 });
    c.label([px, (py + y) / 2], `−${IRA_MRS[i]}`, { anchor: 'end', dx: -6, size: 12 });
  });
  [1, 3, 5].forEach((x) => c.xTick(x, String(x)));
  [5, 10, 15].forEach((y) => c.yTick(y, String(y)));
  return s.visual(
    "Ira's indifference curve with steps drawn under it: for each extra kilo of apples she gives up 5, then 4, then 3, then 2 dozen bananas, so the steps shrink and the curve flattens",
    'Diminishing MRS: the vertical steps shrink as apples increase.',
  );
})();
const vCross = (() => {
  const { s, c } = frame({ x1: 10, y1: 16, xLabel: 'Good X', yLabel: 'Good Y' });
  c.fn((x) => 24 / x, 1.6, 9.6, { color: 'accent', sw: 2.4 }, 60);
  c.fn((x) => 48 / x - 4, 2.6, 9.6, { color: 'blue', sw: 2.4 }, 60);
  c.label([9.6, 24 / 9.6], 'IC1', { anchor: 'start', dx: 6, size: 13, color: 'accent' });
  c.label([9.6, 48 / 9.6 - 4], 'IC2', { anchor: 'start', dx: 6, dy: 4, size: 13, color: 'blue' });
  [[6, 4, 'A', 8, -12], [3, 8, 'B', 8, 12], [3, 12, 'C', 8, -6]].forEach(([x, y, n, dx, dy]) => { c.dot([x, y]); c.label([x, y], n, { anchor: 'start', dx, dy, size: 14, bold: true }); });
  assert(24 / 6 === 4 && 48 / 6 - 4 === 4 && 24 / 3 === 8 && 48 / 3 - 4 === 12, 'crossing figure points');
  c.xTick(3, '3').xTick(6, '6');
  return s.visual(
    'Two indifference curves drawn crossing at point A (6, 4); point B (3, 8) lies on IC1 and point C (3, 12) on IC2 directly above B. C has more of Y than B, yet both would be as good as A, a contradiction',
    'Proof by contradiction: this picture cannot describe consistent preferences.',
  );
})();
const vBudget = (() => {
  const { s, c } = frame({ x1: 14, y1: 26, xLabel: 'Notebooks (X)', yLabel: 'Pens (Y)' });
  s.polygon([[c.X(0), c.Y(0)], [c.X(0), c.Y(24)], [c.X(12), c.Y(0)]], { fill: 'fill', fillOpacity: 0.35, stroke: false });
  c.seg([0, 24], [12, 0], { color: 'accent', sw: 2.6 });
  [[5, 10, 'P (inside)', 'start', 8, 12], [6, 12, 'Q (on)', 'start', 8, -10], [8, 10, 'R (outside)', 'start', 8, -10]].forEach(([x, y, n, anchor, dx, dy]) => { c.dot([x, y]); c.label([x, y], n, { anchor, dx, dy, size: 12 }); });
  assert(where(5, 10, 240, 20, 10) === 'inside' && where(6, 12, 240, 20, 10) === 'on' && where(8, 10, 240, 20, 10) === 'outside', 'budget figure points');
  c.xTick(6, '6').xTick(12, '12').yTick(12, '12').yTick(24, '24');
  return s.visual(
    "Meenal's budget line from 24 pens on the y-axis to 12 notebooks on the x-axis, with the shaded budget set below it; P (5, 10) lies inside, Q (6, 12) on the line and R (8, 10) outside",
    'Imagined Indore shop: 20X + 10Y = 240. The shaded triangle is the budget set.',
  );
})();
const vShift = (() => {
  const { s, c } = frame({ x1: 17, y1: 33, xLabel: 'Metro rides (X)', yLabel: 'Snack packets (Y)' });
  c.seg([0, KUNAL_B.yi], [KUNAL_B.xi, 0], { color: 'accent', sw: 2.6 });
  c.seg([0, KUNAL_INC.yi], [KUNAL_INC.xi, 0], { color: 'blue', sw: 2.2, dash: true });
  c.seg([0, KUNAL_PXFALL.yi], [KUNAL_PXFALL.xi, 0], { color: 'green', sw: 2.2 });
  c.label([KUNAL_B.xi / 2, KUNAL_B.yi / 2], 'Original', { anchor: 'end', dx: -8, dy: -4, size: 12, color: 'accent' });
  c.label([KUNAL_INC.xi * 0.62, KUNAL_INC.yi * 0.38], 'Income ₹450', { anchor: 'start', dx: 8, dy: -8, size: 12, color: 'blue' });
  c.label([KUNAL_PXFALL.xi * 0.8, KUNAL_PXFALL.yi * 0.2], 'Fare ₹20', { anchor: 'start', dx: 8, dy: 6, size: 12, color: 'green' });
  c.xTick(10, '10').xTick(15, '15').yTick(20, '20').yTick(30, '30');
  return s.visual(
    "Kunal's budget lines: the original joins 20 snack packets and 10 metro rides; a rise in income to 450 rupees shifts it out parallel to 30 packets and 15 rides; a fall in the metro fare to 20 rupees rotates it outward on the y-axis to 15 rides",
    'Imagined Guwahati: income changes shift the line; a price change rotates it.',
  );
})();
const vEq = (() => {
  const { s, c } = frame({ x1: 14, y1: 26, xLabel: 'Notebooks (X)', yLabel: 'Pens (Y)' });
  c.seg([0, 24], [12, 0], { sw: 2.2 });
  c.fn((x) => LOW_K / x, 1.3, 13.6, { color: 'muted', sw: 2 }, 80);
  c.fn((x) => 72 / x, 2.8, 13.6, { color: 'accent', sw: 2.6 }, 80);
  c.fn((x) => HIGH_K / x, 5, 13.6, { color: 'blue', sw: 2 }, 80);
  c.label([13.6, LOW_K / 13.6], 'IC1', { anchor: 'start', dx: 4, dy: 6, size: 12 });
  c.label([13.6, 72 / 13.6], 'IC2', { anchor: 'start', dx: 4, size: 12, color: 'accent' });
  c.label([13.6, HIGH_K / 13.6], 'IC3', { anchor: 'start', dx: 4, size: 12, color: 'blue' });
  c.dot([MEENAL_EQ.x, MEENAL_EQ.y], 'accent');
  c.label([MEENAL_EQ.x, MEENAL_EQ.y], 'E', { anchor: 'start', dx: 8, dy: -10, size: 14, bold: true });
  c.dot([R_X, 24 - 2 * R_X]);
  c.label([R_X, 24 - 2 * R_X], 'R', { anchor: 'start', dx: 8, size: 13, bold: true });
  c.dot([S_X, 24 - 2 * S_X]);
  c.label([S_X, 24 - 2 * S_X], 'S', { anchor: 'start', dx: 6, dy: -12, size: 13, bold: true });
  c.drop([MEENAL_EQ.x, MEENAL_EQ.y]);
  c.xTick(6, '6').xTick(12, '12').yTick(12, '12').yTick(24, '24');
  return s.visual(
    "Consumer's equilibrium: Meenal's budget line from 24 pens to 12 notebooks is tangent to IC2 (X times Y equals 72) at E, 6 notebooks and 12 pens; it cuts the lower curve IC1 at R and S, and the higher curve IC3 lies wholly beyond it",
    'E: MRS = Px ÷ Py = 2 and IC2 is convex. R and S are on a lower curve; IC3 is unattainable.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const tCardOrd = table(['Point', 'Cardinal approach', 'Ordinal approach'], [
  ['Measurement', 'Utility counted in utils', 'Bundles only ranked'],
  ['Tool', 'Marginal utility schedule', 'Indifference curve and map'],
  ['Money', 'MU of money constant', 'Not needed'],
  ['Statement', '"30 utils from grapes"', '"Grapes preferred to guavas"'],
], 'Table comparing the cardinal approach, which counts utility in utils with a marginal utility schedule, and the ordinal approach, which only ranks bundles using indifference curves', null);
const tIra = table(['Bundle', 'Apples (kg)', 'Bananas (dozen)'], IRA.map(([x, y], i) => ['ABCDE'[i], String(x), String(y)]),
  "Ira's indifference schedule: A 1 kg apples and 15 dozen bananas, B 2 and 10, C 3 and 6, D 4 and 3, E 5 and 1", 'Imagined Dehradun market. Every row gives the same satisfaction.');
const tIraMRS = table(['Move', 'ΔApples', 'ΔBananas', 'MRS (dozen per kg)'], IRA_MRS.map((m, i) => [`${'ABCD'[i]} → ${'BCDE'[i]}`, '+1', `−${m}`, String(m)]),
  "Worked example table of Ira's marginal rate of substitution: 5, 4, 3 and 2 dozen bananas per extra kilo of apples", 'MRS = ΔY ÷ ΔX: it falls at each step.');
const tAssump = table(['Assumption', 'Meaning'], [
  ['Ordinal utility', 'The consumer can rank bundles'],
  ['Consistency (transitivity)', 'A over B and B over C means A over C'],
  ['Non-satiety', 'More of a good is preferred to less'],
  ['Diminishing MRS', 'She gives up less Y for each extra X'],
  ['Two goods, given tastes', 'Preferences do not change'],
], 'Table of five assumptions of indifference curve analysis: ordinal utility, transitivity, non-satiety, diminishing marginal rate of substitution and given tastes for two goods', null);
const tProps = table(['Property', 'Reason'], [
  ['Slopes downward', 'More X must be offset by less Y'],
  ['Convex to the origin', 'MRS diminishes'],
  ['Higher curve, higher satisfaction', 'More of at least one good'],
  ['Never intersect', 'One bundle cannot give two levels'],
  ['Need not be parallel', 'Only non-intersection is required'],
], 'Table of five properties of indifference curves with reasons: downward slope, convexity from diminishing marginal rate of substitution, higher curve higher satisfaction, no intersection, and not necessarily parallel', null);
const tRank = table(['Bundle (rice kg, dal kg)', 'Compared with P (6, 4)', 'Curve'], [
  ['Q (6, 5)', 'Same rice, more dal', 'Higher than P'],
  ['T (7, 4)', 'More rice, same dal', 'Higher than P'],
  ['U (5, 4)', 'Less rice, same dal', 'Lower than P'],
  ['V (7, 3)', 'More rice, less dal', 'Cannot tell without the map'],
], 'Worked example table ranking bundles against P with 6 kg rice and 4 kg dal: more of one good and no less of the other is higher; less of one and no more of the other is lower; more of one and less of the other needs the indifference map', 'Imagined Varanasi family. Non-satiety ranks only some pairs.');
const tSuresh = table(['Cups of tea', ...SURESH.map(([x]) => String(x))], [['Biscuit packets', ...SURESH.map(([, y]) => String(y))], ['MRS', '—', ...SURESH_MRS.map(String)]],
  "Suresh's indifference schedule of tea and biscuits with marginal rates of substitution 6, 4, 2 and 1", 'Imagined Patna office.');
const tMeenalB = table(['Notebooks (X)', '0', '3', '6', '9', '12'], [['Pens (Y) on the line', ...[0, 3, 6, 9, 12].map((x) => String((240 - 20 * x) / 10))]],
  "Worked example table of Meenal's budget line: with 0, 3, 6, 9 and 12 notebooks she can buy 24, 18, 12, 6 and 0 pens", 'Imagined Indore shop: 20X + 10Y = 240, slope 2.');
assert([0, 3, 6, 9, 12].every((x) => where(x, (240 - 20 * x) / 10, 240, 20, 10) === 'on'), 'Meenal budget table');
const tChanges = table(['Change', 'x-intercept M ÷ Px', 'y-intercept M ÷ Py', 'Budget line'], [
  ['Income rises', 'Rises', 'Rises', 'Parallel outward shift'],
  ['Income falls', 'Falls', 'Falls', 'Parallel inward shift'],
  ['Px falls', 'Rises', 'Same', 'Rotates outward on Y-axis, flatter'],
  ['Py rises', 'Same', 'Falls', 'Rotates inward on X-axis, flatter'],
  ['M, Px, Py all double', 'Same', 'Same', 'No change'],
], 'Table of budget line changes: income changes shift it parallel; a change in the price of X or Y rotates it on the other axis; doubling income and both prices leaves it unchanged', null);
const tKunal = table(['Situation', 'Budget line', 'Equilibrium (X, Y)'], [
  [`₹${KUNAL.M}; fare ₹${KUNAL.px}; snack ₹${KUNAL.py}`, `${KUNAL_B.xi} rides, ${KUNAL_B.yi} packets`, `(${KE1.x}, ${KE1.y})`],
  ['Fare falls to ₹20', `${KUNAL_PXFALL.xi} rides, ${KUNAL_PXFALL.yi} packets`, `(${KE2.x}, ${KE2.y})`],
], "Worked example table for Kunal: with the fare at 30 rupees his equilibrium is 5 rides and 10 packets; when the fare falls to 20 rupees the line rotates to 15 rides and the equilibrium becomes 7.5 rides and 10 packets", 'Imagined Guwahati; curves X × Y = constant, MRS = Y ÷ X.');
const tMeenalEq = table(['Step', 'Working'], [
  ['Tangency', 'Y ÷ X = 20 ÷ 10 = 2, so Y = 2X'],
  ['Budget', '20X + 10(2X) = 240, so X = 6'],
  ['Bundle', '6 notebooks, 12 pens'],
  ['Check', 'Cost 240; MRS 12 ÷ 6 = 2; curve convex'],
], "Worked example table for Meenal's equilibrium: tangency gives Y equal to 2X, the budget gives X equal to 6, so she buys 6 notebooks and 12 pens, costing 240 rupees", 'Imagined Indore shop; curves X × Y = constant.');
assert(cost(6, 12, 20, 10) === 240, 'Meenal eq table');
const tSum1 = table(['Idea', 'Key point'], [
  ['Ordinal utility', 'Rank bundles; no utils needed'],
  ['Indifference curve', 'Bundles of equal satisfaction'],
  ['MRSxy', 'ΔY ÷ ΔX; diminishes'],
  ['Properties', 'Downward, convex, higher is better, never intersect'],
], 'Summary table of part 1: ordinal utility, indifference curve, marginal rate of substitution and the properties of indifference curves', null);
const tSum2 = table(['Idea', 'Key point'], [
  ['Budget line', 'Px·X + Py·Y = M; slope Px ÷ Py'],
  ['Shifts', 'Income: parallel; one price: rotation'],
  ['Equilibrium', 'Tangency: MRS = Px ÷ Py, curve convex'],
  ['Cutting points', 'On a lower curve: not equilibrium'],
], 'Summary table of part 2: budget line and its slope, shifts and rotations, the two equilibrium conditions, and why cutting points are not equilibrium', null);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Indifference Curve Analysis — Part 1: Indifference Curves and MRS',
  goals: [
    'Distinguish ordinal from cardinal utility and draw an indifference curve and map from a schedule',
    'Calculate the marginal rate of substitution and explain why it diminishes',
    'Explain the properties of indifference curves, including why they never intersect',
  ],
  slides: [
    sl('title', 'Consumer Behaviour: Indifference Curve Analysis', {
      b: 'Part 1 — **ordinal utility**, **indifference curves and maps**, the **marginal rate of substitution** and the **properties** of indifference curves.',
      v: flow('LR', ['Ranking, not counting', 'Indifference schedule', 'Indifference curve and map', 'Marginal rate of substitution', 'Properties'], 'Route map of part 1: ranking instead of counting, the indifference schedule, curve and map, the marginal rate of substitution and the properties', 'Part 1 at a glance'),
      n: 'Can you say exactly how many units of satisfaction a mango gives you? Probably not. But you can easily say whether you prefer two mangoes and one banana to one mango and two bananas. This chapter builds a theory of consumer choice on that simple ability to rank. Part one introduces indifference curves and their properties.',
    }),
    sl('two-column', 'Cardinal and ordinal utility', {
      cols: ['**Cardinal:** utility is counted in **utils** (chapter 2).', '**Ordinal:** utility is only **ranked** — preferred, less preferred or equally preferred.'],
      v: tCardOrd,
      n: 'In the cardinal approach we counted utility in utils. The ordinal approach asks for less. The consumer only needs to rank bundles: this one is better, that one is worse, or these two are equally good. Because ranking is more realistic than counting, the indifference curve approach is built on ordinal utility.',
    }),
    sl('concept', 'The indifference schedule', {
      b: 'An **indifference schedule** lists combinations of two goods that give the consumer the **same satisfaction**.',
      v: tIra,
      n: 'Meet Ira at a Dehradun fruit market. She is equally happy with any of these five bundles: one kilo of apples with fifteen dozen bananas, two kilos with ten dozen, and so on down to five kilos with one dozen. She does not prefer any bundle to another. A list like this is an indifference schedule.',
    }),
    sl('diagram', 'The indifference curve', {
      v: vIraIC,
      n: 'Plot Ira\'s bundles with apples on the horizontal axis and bananas on the vertical axis, and join them. The result is an indifference curve. Every point on it gives Ira the same satisfaction. Notice two things about its shape: it slopes downward, and it gets flatter as we move to the right.',
    }),
    sl('check', 'Quick check: what is an indifference map?', { b: 'Choose the best description of an indifference map.', chk: 'm_map_meaning', n: 'Remember that one curve shows one level of satisfaction.' }),
    sl('diagram', 'The indifference map', {
      v: vMap,
      n: 'A consumer has a whole family of indifference curves, one for each level of satisfaction. Together they form an indifference map. A curve further from the origin contains bundles with more of at least one good, so it shows higher satisfaction. The curves never meet, although they need not be parallel.',
    }),
    sl('concept', 'Assumptions of the analysis', {
      b: 'Indifference curve analysis rests on these assumptions:',
      v: tAssump,
      n: 'The analysis needs a few assumptions. The consumer can rank bundles. Her rankings are consistent, so if she prefers A to B and B to C, she prefers A to C. She prefers more of a good to less. She gives up less of one good for each extra unit of the other. And her tastes do not change.',
    }),
    sl('example', 'Worked example 1: calculating MRS', {
      b: 'Find Ira\'s marginal rate of substitution of apples for bananas at each step.',
      bl: ['Step 1 — **MRSxy = ΔY ÷ ΔX**: bananas given up per extra kilo of apples.', 'Step 2 — A to B: (15 − 10) ÷ 1 = **5**; then **4**, **3**, **2**.', 'Step 3 — The MRS **falls**: this is diminishing MRS.'],
      v: tIraMRS,
      n: 'The marginal rate of substitution measures how many bananas Ira will give up for one more kilo of apples while staying equally happy. From A to B she gives up five dozen. Then four, then three, then two. Each extra kilo of apples is worth fewer bananas to her. This is the principle of diminishing marginal rate of substitution.',
    }),
    sl('diagram', 'Diminishing MRS on the curve', {
      v: vSteps,
      n: 'Here the same numbers appear as steps under Ira\'s curve. Each step across is one kilo of apples. The steps down are five, four, three and two dozen bananas. Because the steps down keep shrinking, the curve gets flatter. That is why a diminishing marginal rate of substitution makes an indifference curve convex to the origin.',
    }),
    sl('check', 'Quick check: MRS from two bundles', { b: "Calculate Ira's MRS between A and B.", chk: 'n_mrs_ira', n: 'Divide the bananas given up by the extra kilo of apples.' }),
    sl('concept', 'Why the MRS diminishes', {
      b: 'As the consumer gets **more X and less Y**, X matters less and Y matters more.',
      v: flow('LR', ['More apples', 'Want for apples weaker', 'Fewer bananas left', 'Bananas more precious', 'Gives up fewer bananas per kilo'], 'Flow of why the marginal rate of substitution diminishes: more apples weaken the want for apples while scarcer bananas become more precious, so fewer bananas are given up per kilo', 'Diminishing MRS'),
      n: 'Why does the rate fall? As Ira gets more apples, her want for apples becomes weaker. At the same time she has fewer bananas, so each remaining dozen matters more to her. Both forces work together, so she is willing to part with fewer and fewer bananas for each extra kilo of apples.',
    }),
    sl('concept', 'Properties of indifference curves', {
      b: 'Every indifference curve on a normal map has these properties:',
      v: tProps,
      n: 'From the assumptions we get the properties. Indifference curves slope downward, because more of one good must be offset by less of the other. They are convex, because the marginal rate of substitution diminishes. A higher curve means more satisfaction. Two curves never intersect. And they need not be parallel.',
    }),
    sl('diagram', 'Why two indifference curves cannot intersect', {
      v: vCross,
      n: 'Suppose two curves did cross at A. B is on the first curve and C on the second, directly above B, so C has more of good Y. Ira would be indifferent between A and B, and between A and C, so she would have to be indifferent between B and C. But C has more, so she must prefer it. That contradiction shows the curves cannot cross.',
    }),
    sl('check', 'Quick check: parallel curves?', { b: 'Must indifference curves be parallel?', chk: 'tf_parallel', n: 'Think about what non-intersection actually requires.' }),
    sl('example', 'Worked example 2: ranking bundles without a map', {
      b: 'A family in an imagined Varanasi colony compares bundles of rice and dal with P (6 kg, 4 kg).',
      bl: ['Step 1 — More of one good and **no less** of the other → **higher** curve.', 'Step 2 — Less of one and **no more** of the other → **lower** curve.', 'Step 3 — More of one and **less** of the other → need the **map** to decide.'],
      v: tRank,
      n: 'Non-satiety lets us rank some bundles without drawing anything. Q has the same rice and more dal than P, so it is on a higher curve. T has more rice and the same dal: also higher. U has less rice and the same dal: lower. But V has more rice and less dal, so only the family\'s indifference map can tell us.',
    }),
    sl('check', 'Quick check: a higher curve', { b: 'Where does bundle Q lie compared with P?', chk: 'm_prop_higher', n: 'Use the idea that more of a good is preferred to less.' }),
    sl('summary', 'Part 1 summary', {
      bl: ['Ordinal utility: bundles are ranked, not counted.', 'An indifference curve joins bundles of equal satisfaction; a map is a set of curves.', 'MRSxy = ΔY ÷ ΔX and it diminishes, so curves are convex.', 'Curves slope downward, higher is better, and they never intersect.'],
      v: tSum1,
      n: 'To sum up part one. The ordinal approach only ranks bundles. An indifference curve joins bundles that give equal satisfaction, and a map is a whole set of such curves. The marginal rate of substitution diminishes, which makes the curves convex. Indifference curves slope downward, higher curves are better, and two curves never intersect.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define MRS with **ΔY ÷ ΔX** and say "at the same level of satisfaction".', 'Link **diminishing MRS** to **convexity** in every answer on shape.', 'For non-intersection, draw **A, B, C** and use **transitivity** plus "more is preferred".', 'Do not say indifference curves must be **parallel** or that their bundles **cost the same**.'],
      n: 'Some exam tips. When you define the marginal rate of substitution, mention that satisfaction stays the same. Always connect diminishing marginal rate of substitution with convexity. For the proof that curves cannot cross, label three points and use transitivity with the idea that more is preferred. And remember: the curves need not be parallel, and their bundles need not cost the same.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: "Indifference Curve Analysis — Part 2: Budget Line and Consumer's Equilibrium",
  goals: [
    'Write the budget equation, draw the budget line and find its intercepts and slope',
    'Show how the budget line shifts or rotates when income or one price changes',
    "Explain consumer's equilibrium with indifference curves using both conditions",
  ],
  slides: [
    sl('title', "Budget Line and Consumer's Equilibrium", {
      b: 'Part 2 — the **budget line**, its **shifts and rotations**, and **consumer\'s equilibrium**.',
      v: flow('LR', ['What she can afford', 'Budget line and slope', 'Changes in income and prices', 'Equilibrium by tangency', 'Using the conditions'], 'Route map of part 2: what the consumer can afford, the budget line and its slope, changes in income and prices, equilibrium by tangency and using the conditions', 'Part 2 at a glance'),
      n: 'Indifference curves tell us what a consumer would like. But what she can actually buy depends on her income and on prices. In part two we draw the budget line, see how it moves, and then bring the two together to find the consumer\'s equilibrium: the best bundle she can afford.',
    }),
    sl('concept', 'The budget line', {
      b: 'The **budget line** shows all bundles of two goods that cost exactly the consumer\'s **whole income**:\n\n**Px·X + Py·Y = M**\n\nIts slope (absolute) is **Px ÷ Py**, the rate at which the market exchanges Y for X.',
      v: tMeenalB,
      n: 'Meenal has two hundred and forty rupees for notebooks at twenty rupees and pens at ten rupees. If she buys no notebooks she can buy twenty four pens. With three notebooks, eighteen pens. With six, twelve. Every such combination costs exactly her whole income, and together they form her budget line.',
    }),
    sl('diagram', 'Budget line and budget set', {
      v: vBudget,
      n: 'Here is Meenal\'s budget line, from twenty four pens down to twelve notebooks. The shaded triangle below it is her budget set: all the bundles she can afford. Point P is inside, so it leaves money unspent. Point Q is on the line and uses all her money. Point R is outside, so she cannot afford it.',
    }),
    sl('example', 'Worked example 1: drawing a budget line', {
      b: 'Meenal: ₹240, notebooks ₹20, pens ₹10.',
      bl: ['Step 1 — Equation: **20X + 10Y = 240**.', 'Step 2 — Intercepts: **240 ÷ 20 = 12** notebooks; **240 ÷ 10 = 24** pens.', 'Step 3 — Join them. Slope = 20 ÷ 10 = **2** pens per notebook.'],
      v: tMeenalEq,
      n: 'To draw a budget line, write the equation first. Then find where it meets each axis by spending all income on one good: twelve notebooks or twenty four pens. Join the two points. The slope is the price of a notebook divided by the price of a pen, so the market asks Meenal to give up two pens for every extra notebook.',
    }),
    sl('check', 'Quick check: inside, on or outside?', { b: 'Which bundle lies inside Meenal\'s budget line?', chk: 'm_bl_inside', n: 'Work out the cost of each bundle and compare it with two hundred and forty rupees.' }),
    sl('concept', 'Shifts and rotations', {
      b: 'Track the two intercepts **M ÷ Px** and **M ÷ Py**:',
      v: tChanges,
      n: 'The budget line moves when income or prices change. A change in income moves both intercepts in proportion, so the line shifts parallel. A change in one price moves only that good\'s intercept, so the line rotates around the other one. And if income and both prices double together, nothing changes at all.',
    }),
    sl('diagram', 'Kunal\'s budget line moves', {
      v: vShift,
      n: 'Kunal in Guwahati has three hundred rupees for metro rides at thirty rupees and snacks at fifteen. His original line joins ten rides and twenty packets. If his income rises to four hundred and fifty, the line shifts out parallel to fifteen rides and thirty packets. If instead the fare falls to twenty, the line rotates out to fifteen rides while the snack end stays at twenty.',
    }),
    sl('check', 'Quick check: an intercept', { b: 'How many snack packets can Kunal buy with all his money?', chk: 'n_bl_xint', n: 'Divide income by the price of a snack packet.' }),
    sl('concept', "Conditions of consumer's equilibrium", {
      b: 'The consumer reaches the **highest indifference curve she can afford** where:\n\n1. **MRSxy = Px ÷ Py** — the budget line is **tangent** to the curve;\n2. the curve is **convex** there (MRS diminishing).',
      v: flow('LR', ['Indifference map: what she wants', 'Budget line: what she can afford', 'Move along the line to higher curves', 'Tangency: MRS equals price ratio', 'Equilibrium if the curve is convex'], 'Flow of how the consumer reaches equilibrium: she moves along her budget line to higher indifference curves until the line is tangent to a curve and the curve is convex', 'Two conditions'),
      n: 'Put the map and the budget line together. The consumer wants to reach the highest curve she can afford. She keeps moving along her budget line to higher curves until the line just touches a curve. There the slope of the curve, her marginal rate of substitution, equals the slope of the line, the price ratio. And the curve must be convex at that point.',
    }),
    sl('diagram', "Consumer's equilibrium", {
      v: vEq,
      n: 'Here is Meenal\'s equilibrium. Her budget line just touches the middle curve at E, six notebooks and twelve pens. At E her marginal rate of substitution equals two, the price ratio, and the curve is convex. The line cuts the lowest curve at R and S, so those bundles give less satisfaction. The highest curve lies beyond her budget.',
    }),
    sl('two-column', 'Why R and S are not equilibrium points', {
      cols: ['At **R**, MRS **>** Px ÷ Py: she values X more than the market charges — buy **more X**, move down towards E.', 'At **S**, MRS is **below** Px ÷ Py: she values X less than it costs — buy **less X**, move up towards E.'],
      v: tSum2,
      n: 'At R, Meenal values a notebook at more pens than the market asks, so swapping pens for notebooks makes her better off: she moves down the line towards E. At S it is the other way round, so she moves up towards E. Only at E are the two rates equal, and no further swap can raise her satisfaction.',
    }),
    sl('check', 'Quick check: cutting points', { b: 'Why are cutting points not equilibrium points?', chk: 'm_eq_cut_points', n: 'Ask whether she could reach a higher curve without spending more.' }),
    sl('example', "Worked example 2: Meenal's equilibrium by calculation", {
      b: 'Meenal\'s curves are X × Y = constant, so her MRS = Y ÷ X.',
      bl: ['Step 1 — Tangency: Y ÷ X = 20 ÷ 10 = 2, so **Y = 2X**.', 'Step 2 — Budget: 20X + 10(2X) = 240, so **X = 6**, **Y = 12**.', 'Step 3 — Check: cost ₹240; MRS = 12 ÷ 6 = 2; the curve is convex.'],
      v: tMeenalEq,
      n: 'We can also find the equilibrium by calculation. For curves like Meenal\'s, the marginal rate of substitution equals pens divided by notebooks. Setting it equal to the price ratio of two gives pens equal to twice notebooks. Putting that into the budget gives six notebooks and twelve pens. Check the cost, check the ratio, and you are done.',
    }),
    sl('example', 'Worked example 3: when the metro fare falls', {
      b: 'Kunal: ₹300; fare falls from ₹30 to ₹20; snacks ₹15. His curves are X × Y = constant.',
      bl: ['Step 1 — Before: Y ÷ X = 2 → **(5 rides, 10 packets)**.', 'Step 2 — The line rotates out to **15 rides**.', 'Step 3 — After: Y ÷ X = 20 ÷ 15 → **(7.5 rides, 10 packets)**, on a higher curve.'],
      v: tKunal,
      n: 'When the fare falls, Kunal\'s budget line rotates outward. Before, his best bundle was five rides and ten packets. After, the tangency condition gives seven and a half rides and still ten packets. He reaches a higher indifference curve and buys more metro rides. A lower price raises the quantity demanded, just as the law of demand says.',
    }),
    sl('concept', 'Reaching equilibrium step by step', {
      b: 'Compare the consumer\'s rate with the market\'s rate:',
      v: flow('TB', ['MRS greater than price ratio', 'Buy more X, less Y', 'MRS equals price ratio: stop', 'MRS less than price ratio', 'Buy less X, more Y'], 'Flow of adjustment: if the marginal rate of substitution is greater than the price ratio buy more X; if it is less, buy less X; stop where they are equal', 'Adjusting towards E', [{ from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n3' }]),
      n: 'Here is the rule in one picture. If the consumer\'s marginal rate of substitution is greater than the price ratio, she should buy more of X and less of Y. If it is smaller, she should buy less of X. As she adjusts, her marginal rate of substitution changes until it equals the price ratio, and there she stops.',
    }),
    sl('check', 'Quick check: spending all income', { b: 'Does the consumer spend her whole income at equilibrium?', chk: 'tf_eq_spend', n: 'Think about where the equilibrium point lies.' }),
    sl('summary', 'Part 2 summary', {
      bl: ['Budget line: Px·X + Py·Y = M; slope Px ÷ Py.', 'Income change: parallel shift. One price change: rotation.', 'Equilibrium: tangency, MRS = Px ÷ Py, with a convex curve.', 'Cutting points lie on a lower curve; higher curves are unaffordable.'],
      v: tSum2,
      n: 'To sum up part two. The budget line shows the bundles that use all income, and its slope is the price ratio. Income changes shift it parallel, and a change in one price rotates it. The consumer is in equilibrium where the budget line touches the highest attainable indifference curve, with the marginal rate of substitution equal to the price ratio and the curve convex.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always label the **intercepts** M ÷ Px and M ÷ Py on a budget line diagram.', 'State **both** equilibrium conditions; tangency alone is not enough.', 'Explain **why** cutting points are not equilibrium (MRS ≠ Px ÷ Py).', 'A **price** change **rotates** the line; an **income** change **shifts** it.'],
      n: 'Exam tips for part two. Label both intercepts whenever you draw a budget line. In equilibrium answers, write both conditions: tangency and convexity. Explain why the points where the line cuts a curve are not equilibrium. And remember that a price change rotates the budget line while an income change shifts it.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Consumer Behaviour: Indifference Curve Analysis — notes',
  sections: [
    {
      h: '1. Ordinal utility, indifference curve and map', t: 1,
      b: '**Ordinal utility:** the consumer **ranks** bundles (preferred, less preferred, indifferent) without measuring utility.\n\n**Indifference schedule:** combinations of two goods giving the **same satisfaction**. **Indifference curve:** the graph of such a schedule. **Indifference map:** a **set of indifference curves**, a higher curve showing **higher satisfaction**.\n\n**Assumptions:** ordinal utility; consistency (transitivity); non-satiety; diminishing MRS; given tastes.',
      terms: [['Ordinal utility', 'Utility that can be ranked but not measured in numbers.'], ['Indifference curve', 'A curve joining combinations of two goods that give equal satisfaction.'], ['Indifference map', 'A set of indifference curves of one consumer, ranked by satisfaction.']],
      v: vIraIC, vs: [tCardOrd, vMap],
    },
    {
      h: '2. Marginal rate of substitution', t: 2,
      b: '**MRSxy** = amount of Y the consumer gives up for one more unit of X, staying on the **same** indifference curve: **MRSxy = ΔY ÷ ΔX** (absolute slope of the curve).\n\n**Diminishing MRS:** as X increases and Y decreases, X matters less and Y more, so MRS **falls**. This makes the indifference curve **convex to the origin**. A constant MRS would give a straight-line curve.',
      terms: [['Marginal rate of substitution', 'The rate at which a consumer substitutes one good for another at constant satisfaction.'], ['Diminishing MRS', 'The fall in MRS as more of one good replaces the other.']],
      v: tIraMRS, vs: [vSteps, tSuresh],
    },
    {
      h: '3. Properties of indifference curves', t: 3,
      b: '1. **Slope downward** — more X must be offset by less Y.\n2. **Convex to the origin** — diminishing MRS.\n3. **Higher curve, higher satisfaction** — more of at least one good (non-satiety).\n4. **Never intersect** — an intersection would make two satisfaction levels equal (proof with points A, B, C and transitivity).\n5. **Need not be parallel**, and usually do **not touch the axes** (the consumer wants some of both goods).',
      terms: [['Non-satiety', 'The assumption that more of a good is preferred to less.'], ['Transitivity', 'If A is preferred to B and B to C, then A is preferred to C.']],
      v: tProps, vs: [vCross, tRank],
    },
    {
      h: '4. The budget line', t: 4,
      b: '**Budget line:** all bundles that cost exactly the consumer\'s income: **Px·X + Py·Y = M**. Intercepts **M ÷ Px** and **M ÷ Py**; absolute slope **Px ÷ Py** (the market rate of exchange).\n\n**Budget set:** all bundles costing **M or less** (the triangle under the line). A bundle **inside** leaves income unspent; one **outside** is unaffordable.',
      terms: [['Budget line', 'The set of bundles that use up the whole income at given prices.'], ['Budget set', 'All bundles that cost no more than the income.']],
      v: vBudget, vs: [tMeenalB],
    },
    {
      h: '5. Changes in the budget line', t: 4,
      b: '- **Income rises (falls):** both intercepts rise (fall) — **parallel** outward (inward) **shift**.\n- **Px falls (rises):** x-intercept rises (falls) — line **rotates** on the Y-axis, becoming flatter (steeper).\n- **Py rises (falls):** y-intercept falls (rises) — line **rotates** on the X-axis, becoming flatter (steeper).\n- **Income and both prices change in the same proportion:** no change.',
      terms: [['Parallel shift', 'Movement of the budget line caused by a change in income, slope unchanged.'], ['Rotation', 'Movement of the budget line caused by a change in one price, pivoting on the other axis.']],
      v: vShift, vs: [tChanges],
    },
    {
      h: "6. Consumer's equilibrium", t: 5,
      b: '**Conditions:** (1) **MRSxy = Px ÷ Py** — the budget line is **tangent** to an indifference curve; (2) the curve is **convex** at that point (MRS diminishing).\n\n**Why not elsewhere:** where the line **cuts** a curve, MRS ≠ Px ÷ Py and a move along the line reaches a **higher** curve; curves above the tangency are **unaffordable**. If MRS > Px ÷ Py buy more X; if MRS is below Px ÷ Py buy less X.\n\nThe whole income is spent at equilibrium.',
      terms: [["Consumer's equilibrium", 'The affordable bundle on the highest attainable indifference curve.'], ['Tangency', 'The point where the budget line just touches an indifference curve, so their slopes are equal.']],
      v: vEq, vs: [tMeenalEq, tKunal],
    },
  ],
  tips: '**Common mistakes**\n- Saying the bundles on an indifference curve cost the same — that describes a **budget line**.\n- Writing MRS as ΔX ÷ ΔY, or forgetting "at the same satisfaction".\n- Claiming indifference curves must be **parallel**.\n- Stating only the tangency condition and leaving out **convexity**.\n- Treating a point where the budget line **cuts** a curve as equilibrium.\n- Shifting the budget line parallel when only **one price** changes (it rotates).\n\n**How marks are usually awarded**\n- 1-mark MCQ / assertion-reason: one correct option.\n- 2 marks: a definition or condition plus a reason or step.\n- 3 marks: three points, or a numerical with formula, working and answer.\n- 5 marks (and the ISC paper\'s 4- and 8-mark parts): a labelled diagram with a full explanation of each part.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Ordinal utility**', 'Utility that is **ranked**, not measured in utils.', 'definition', 1],
  ['**Indifference schedule**', 'Combinations of two goods giving the **same satisfaction**.', 'definition', 1],
  ['**Indifference curve**', 'Graph of an indifference schedule: bundles of equal satisfaction.', 'definition', 1],
  ['**Indifference map**', 'A set of indifference curves; a higher curve = higher satisfaction.', 'definition', 1],
  ['Cardinal vs ordinal in one line', 'Cardinal **counts** utils; ordinal only **ranks** bundles.', 'concept', 1],
  ['Do bundles on one indifference curve cost the same?', '**No** — equal satisfaction, not equal cost.', 'exam-tip', 1],
  ['**MRSxy**', 'Y given up for one more X at constant satisfaction: **ΔY ÷ ΔX**.', 'formula', 2],
  ['Ira: (1, 15) → (2, 10). MRS?', '**5** dozen bananas per kilo of apples.', 'example', 2],
  ['Why does MRS diminish?', 'More X makes X less important; less Y makes Y more precious.', 'concept', 2],
  ['MRS and the shape of the curve', 'Diminishing MRS → **convex** curve; constant MRS → straight line.', 'concept', 2],
  ['MRS on a diagram', 'The **absolute slope** of the indifference curve.', 'diagram', 2],
  ['Property 1', 'Indifference curves **slope downward**.', 'fact', 3],
  ['Property 2', 'They are **convex to the origin** (diminishing MRS).', 'fact', 3],
  ['Property 3', '**Higher curve, higher satisfaction** (non-satiety).', 'fact', 3],
  ['Property 4', 'Two indifference curves **never intersect**.', 'fact', 3],
  ['Proof that curves do not cross', 'A on both curves; B and C indifferent by transitivity, yet C has more — contradiction.', 'concept', 3],
  ['Must indifference curves be parallel?', '**No** — they only must not intersect.', 'exam-tip', 3],
  ['P (6, 4) vs Q (6, 5)?', 'Q is on a **higher** curve: same X, more Y.', 'example', 3],
  ['**Budget line** equation', '**Px·X + Py·Y = M**.', 'formula', 4],
  ['Budget line intercepts', '**M ÷ Px** on the X-axis, **M ÷ Py** on the Y-axis.', 'formula', 4],
  ['Slope of the budget line', '**Px ÷ Py** (absolute): the market rate of exchange.', 'formula', 4],
  ['**Budget set**', 'All bundles costing **M or less**.', 'definition', 4],
  ['Income rises: budget line?', '**Parallel outward shift**.', 'diagram', 4],
  ['Price of X falls: budget line?', '**Rotates outward** on the Y-axis; becomes flatter.', 'diagram', 4],
  ['M, Px and Py all double?', 'The budget line does **not change**.', 'exam-tip', 4],
  ["**Consumer's equilibrium** (ICA)", 'Tangency of the budget line with the highest attainable indifference curve.', 'definition', 5],
  ['Condition 1', '**MRSxy = Px ÷ Py**.', 'formula', 5],
  ['Condition 2', 'The indifference curve is **convex** at the tangency.', 'formula', 5],
  ['MRS greater than Px ÷ Py?', 'Buy **more X**, less Y.', 'concept', 5],
  ['Why is a cutting point not equilibrium?', 'MRS ≠ Px ÷ Py; a higher curve is reachable on the same line.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Consumer Behaviour: Indifference Curve Analysis',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_map_higher', 'm_mrs_falls', 'm_bl_income', 'm_eq_cond', 'ar_mrs_convex'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions; the second has an internal choice. About 30–50 words each.', items: ['s_mrs_meaning', { attempt: 1, keys: ['s_prop_two', 's_bl_meaning'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions; the second has an internal choice. About 50–80 words each; show working in numericals.', items: ['s3_eq_numerical', { attempt: 1, keys: ['s3_prop_intersect', 's3_bl_changes'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question. It is set in parts; draw and label the diagram.', items: ['l_eq_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Consumer Behaviour: Indifference Curve Analysis',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_ordinal_meaning', 'm_ind_schedule', 'm_mrs_calc', 'm_mrs_slope', 'm_prop_cross', 'm_prop_axis', 'm_bl_slope', 'm_bl_pxfall', 'm_eq_mrs_greater', 'm_eq_bundle', 'ar_prop_higher', 'ar_eq_tangent'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions; the last has an internal choice. About 30–50 words each.', items: ['s_card_ord', 's_mrs_reason', { attempt: 1, keys: ['s_prop_higher', 's_eq_two_cond'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions; the last has an internal choice. About 50–80 words each; show working in numericals.', items: ['s3_ic_map', 's3_mrs_schedule', 's3_bl_draw', { attempt: 1, keys: ['s3_eq_diagram', 's3_eq_adjust'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer both questions; the second has an internal choice. Each is set in parts; draw and label diagrams.', items: ['l_bl_full', { attempt: 1, keys: ['l_properties', 'l_eq_price_fall'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch03 only (ordinal utility and indifference curves and map; MRS; properties; budget line and its changes; consumer\'s equilibrium); no removed topics for this chapter',
    originality: 'every consumer, schedule, budget and case is imagined and written by SOYL (Ira, Suresh, Meenal, Kunal, Tanya, Farhan, Rohit, Sameer, Neha, Aarav, Anjali); no textbook schedule, ISC specimen item (two-bundle burger and juice) or past-paper item reused',
    data: `schedules and budgets computed and asserted in questions.mjs: Ira MRS ${IRA_MRS.join('/')}; Suresh MRS ${SURESH_MRS.join('/')}; Meenal 20X + 10Y = 240 with equilibrium (${MEENAL_EQ.x}, ${MEENAL_EQ.y}) on X·Y = ${MEENAL_EQ.level}, cutting points R and S on X·Y = ${LOW_K}, X·Y = ${HIGH_K} unattainable; Kunal (5, 10) → (7.5, 10) when the fare falls; Tanya (6, 9); Farhan (20, 5); Rohit (6, 9); every SVG curve plotted from the same equations`,
    pattern: 'ISC 2027 specimen 856 style: 1-mark MCQ and assertion-reason (option (d) "Both Assertion and Reason are false"); 2-, 3- and 5-mark items for the isc-12-default blueprints, plus 4-mark (2 + 2) and 8-mark (4 + 4) paper-style items in the bank',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify, word limits, answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
