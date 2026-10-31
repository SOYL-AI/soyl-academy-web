// Build ISC 12 Economics ch04 Elasticity of Demand. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch04/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
// Removed topic honoured: numericals only on the percentage method; the outlay and point methods are conceptual.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch04', 'economics-commerce');
const { pct, ed, IDLI, IDLI_ED, KITE, KITE_Q1, ROSO, ROSO_ED, SALT_ED } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures (price on the y-axis, quantity on the x-axis)
function frame(xMax, yMax, xLabel = 'Quantity demanded', yLabel = 'Price (₹)') {
  const s = new Svg(480, 380);
  const c = s.chart({ x1: xMax, y1: yMax, left: 70, top: 34, width: 330, height: 280, xLabel, yLabel });
  return { s, c };
}
/** Several small panels side by side; each panel gets its own axes. */
function panels(n) {
  const s = new Svg(40 + n * 290, 330);
  const cs = Array.from({ length: n }, (_, i) => s.chart({ x1: 12, y1: 60, left: 50 + i * 290, top: 40, width: 220, height: 220, xLabel: 'Q', yLabel: 'P' }));
  const title = (i, t) => s.text(50 + i * 290 + 110, 318, t, { size: 13, bold: true });
  return { s, cs, title };
}

// Three special degrees: perfectly elastic (horizontal at P = 40), perfectly inelastic (vertical at Q = 5),
// unitary (rectangular hyperbola P × Q = 120).
const vDegreesA = (() => {
  const { s, cs, title } = panels(3);
  cs[0].seg([0, 40], [11, 40], { color: 'accent', sw: 2.6 });
  cs[0].label([6, 40], 'D', { dy: -12, color: 'accent', bold: true });
  cs[0].yTick(40, '40');
  title(0, 'Perfectly elastic: Ed = ∞');
  cs[1].seg([5, 6], [5, 56], { color: 'accent', sw: 2.6 });
  cs[1].label([5, 50], 'D', { anchor: 'start', dx: 10, color: 'accent', bold: true });
  cs[1].xTick(5, '5');
  title(1, 'Perfectly inelastic: Ed = 0');
  const H = (q) => 120 / q;
  for (const [q, p] of [[3, 40], [6, 20], [10, 12]]) { assert(H(q) === p, 'hyperbola'); cs[2].dot([q, p], 'accent'); }
  cs[2].fn(H, 2.4, 11.5, { color: 'accent', sw: 2.6 }, 60);
  cs[2].label([10, 12], 'D', { anchor: 'start', dx: 8, dy: -12, color: 'accent', bold: true });
  title(2, 'Unitary: Ed = 1 (P × Q constant)');
  return s.visual(
    'Three small diagrams with price on the vertical axis and quantity on the horizontal axis: a horizontal demand line for perfectly elastic demand, a vertical demand line for perfectly inelastic demand, and a rectangular hyperbola for unitary elastic demand, on which price times quantity is the same at every point',
    'Schematic, imagined figures: the three special degrees of price elasticity.',
  );
})();

// Relatively elastic (flat line P = 36 − 1.2Q) and relatively inelastic (steep line P = 56 − 8Q).
const vDegreesB = (() => {
  const { s, cs, title } = panels(2);
  cs[0].fn((q) => 36 - 1.2 * q, 0.5, 11.5, { color: 'accent', sw: 2.6 });
  cs[0].label([11, 22.8], 'D', { anchor: 'start', dx: 4, dy: -14, color: 'accent', bold: true });
  title(0, 'Relatively elastic: Ed > 1');
  cs[1].fn((q) => 56 - 8 * q, 0.4, 6.5, { color: 'blue', sw: 2.6 });
  cs[1].label([6.5, 4], 'D', { anchor: 'start', dx: 10, dy: -6, color: 'blue', bold: true });
  title(1, 'Relatively inelastic: 0 < Ed < 1');
  return s.visual(
    'Two small diagrams: a flat downward-sloping demand line, on which quantity responds strongly to price, for relatively elastic demand; and a steep downward-sloping demand line, on which quantity responds weakly, for relatively inelastic demand',
    'Schematic: through the same point, the flatter line is the more elastic one.',
  );
})();

// The idli price cut on a demand line through (200, 40) and (260, 32).
const vIdli = (() => {
  const { s, c } = frame(320, 52, 'Idli plates a morning', 'Price (₹ per plate)');
  const P = (q) => 40 - (2 / 15) * (q - 200);
  assert(P(IDLI.q0) === IDLI.p0 && P(IDLI.q1) === IDLI.p1, 'idli line');
  c.fn(P, 130, 310, { color: 'accent', sw: 2.6 });
  c.dot([IDLI.q0, IDLI.p0], 'accent').dot([IDLI.q1, IDLI.p1], 'accent');
  c.drop([IDLI.q0, IDLI.p0]).drop([IDLI.q1, IDLI.p1]);
  c.label([IDLI.q0, IDLI.p0], 'A', { dx: 10, dy: -12, bold: true }).label([IDLI.q1, IDLI.p1], 'B', { dx: 10, dy: -12, bold: true });
  c.xTick(IDLI.q0, String(IDLI.q0)).xTick(IDLI.q1, String(IDLI.q1)).yTick(IDLI.p0, String(IDLI.p0)).yTick(IDLI.p1, String(IDLI.p1));
  c.label([300, P(300)], 'D', { anchor: 'start', dx: 6, dy: -12, color: 'accent', bold: true });
  return s.visual(
    `Demand line for idli plates at an imagined Chennai tiffin centre: at 40 rupees 200 plates are sold (point A), and at 32 rupees 260 plates (point B). Price falls by 20 per cent while quantity rises by 30 per cent, so elasticity is ${IDLI_ED}`,
    'Imagined figures: a 20 per cent price cut brings a 30 per cent rise in plates sold.',
  );
})();

// Point method: straight line P = 100 − 2Q from (0, 100) to (50, 0); A above, M at the mid-point, B below.
const vPoint = (() => {
  const { s, c } = frame(58, 115, 'Quantity demanded', 'Price (₹)');
  const P = (q) => 100 - 2 * q;
  c.fn(P, 0, 50, { color: 'accent', sw: 2.6 });
  for (const [q, p] of [[10, 80], [25, 50], [40, 20]]) { assert(P(q) === p, 'point line'); c.dot([q, p], 'accent'); }
  c.label([10, 80], 'A: Ed > 1', { anchor: 'start', dx: 10, dy: -6, size: 13 });
  c.label([25, 50], 'M (mid-point): Ed = 1', { anchor: 'start', dx: 10, dy: -6, size: 13 });
  c.label([40, 20], 'B: Ed < 1', { anchor: 'start', dx: 10, dy: -6, size: 13 });
  c.label([0, 100], 'Ed = ∞', { anchor: 'start', dx: 10, dy: -4, size: 12, muted: true });
  c.label([50, 0], 'Ed = 0', { anchor: 'start', dx: 8, dy: -14, size: 12, muted: true });
  c.dot([0, 100]).dot([50, 0]);
  return s.visual(
    'A straight-line demand curve meeting the price axis and the quantity axis. Elasticity is infinite where it meets the price axis, greater than one at point A above the mid-point, equal to one at the mid-point M, less than one at point B below it, and zero where it meets the quantity axis',
    'Point method: Ed = lower segment ÷ upper segment. Schematic, no measurements.',
  );
})();

// Tangent method on a curve: P = 3600/(Q + 30) − 20; at T (30, 40) the tangent is P = 70 − Q.
const vTangent = (() => {
  const { s, c } = frame(160, 110, 'Quantity demanded', 'Price (₹)');
  const P = (q) => 3600 / (q + 30) - 20;
  assert(P(30) === 40 && Math.abs((P(30.001) - P(29.999)) / 0.002 + 1) < 1e-6, 'tangent slope');
  c.fn(P, 0, 150, { color: 'accent', sw: 2.6 }, 80);
  c.seg([0, 70], [70, 0], { color: 'blue', sw: 2, dash: true });
  c.dot([30, 40], 'accent').label([30, 40], 'T', { dx: 10, dy: -12, bold: true });
  c.label([12, 62], 'upper segment', { anchor: 'start', dx: 12, size: 12, color: 'blue' });
  c.label([52, 18], 'lower segment', { anchor: 'start', dx: 10, size: 12, color: 'blue' });
  c.label([140, P(140)], 'D', { dy: -14, color: 'accent', bold: true });
  return s.visual(
    'A curved demand curve with a dashed tangent touching it at point T and extended to both axes. The part of the tangent between T and the quantity axis is the lower segment, and the part between T and the price axis is the upper segment; elasticity at T is the lower segment divided by the upper segment',
    'Schematic: for a curve, measure along the tangent at the point.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vDegreeTable = table(
  ['Degree', 'Coefficient', 'Curve', 'Imagined example'],
  [
    ['Perfectly elastic', 'Ed = ∞', 'Horizontal line', 'A booth selling milk only at a fixed price'],
    ['Perfectly inelastic', 'Ed = 0', 'Vertical line', 'Insulin for a diabetic patient'],
    ['Unitary elastic', 'Ed = 1', 'Rectangular hyperbola', 'A fixed monthly budget for sweets'],
    ['Relatively elastic', 'Ed > 1', 'Flatter line', 'Restaurant meals, branded clothes'],
    ['Relatively inelastic', '0 < Ed < 1', 'Steeper line', 'Salt, matchboxes, rice'],
  ],
  'Table of the five degrees of price elasticity of demand: perfectly elastic is infinite with a horizontal curve, perfectly inelastic is zero with a vertical curve, unitary is one with a rectangular hyperbola, relatively elastic is above one with a flatter curve, and relatively inelastic lies between zero and one with a steeper curve, each with an imagined example',
);
const vSteps = flow(
  'LR',
  ['Change in quantity ÷ original quantity', 'Change in price ÷ original price', 'Divide the first by the second', 'Drop the minus sign', 'Compare with 1'],
  'Flow of the percentage method: divide the change in quantity by the original quantity, divide the change in price by the original price, divide the first result by the second, drop the minus sign, and compare the answer with one',
  'Percentage (proportionate) method, step by step',
);
const vIdliWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['Percentage change in quantity', `(${IDLI.q1} − ${IDLI.q0}) ÷ ${IDLI.q0} × 100`, `${pct(IDLI.q0, IDLI.q1)} per cent`],
    ['Percentage change in price', `(${IDLI.p1} − ${IDLI.p0}) ÷ ${IDLI.p0} × 100`, `${pct(IDLI.p0, IDLI.p1)} per cent`],
    ['Ed (minus sign dropped)', '30 ÷ 20', String(IDLI_ED)],
    ['Degree', 'Ed > 1', 'Relatively elastic'],
  ],
  `Worked example table for idli plates: quantity rises 30 per cent, price falls 20 per cent, elasticity is ${IDLI_ED}, so demand is relatively elastic`,
  'Imagined Chennai tiffin centre: price ₹40 to ₹32, plates 200 to 260.',
);
assert(ed(IDLI.p0, IDLI.p1, IDLI.q0, IDLI.q1) === 1.5, 'idli ed');
const vKiteWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['Percentage rise in price', `(${KITE.p1} − ${KITE.p0}) ÷ ${KITE.p0} × 100`, `${pct(KITE.p0, KITE.p1)} per cent`],
    ['Percentage fall in quantity', `${KITE.e} × 10`, '8 per cent'],
    ['Fall in kites', `8 per cent of ${KITE.q0}`, '40'],
    ['New daily sales', `${KITE.q0} − 40`, `${KITE_Q1} kites`],
  ],
  `Worked example table for kites: a 10 per cent price rise with elasticity ${KITE.e} gives an 8 per cent fall in quantity, so daily sales fall from ${KITE.q0} to ${KITE_Q1} kites`,
  'Imagined Ahmedabad kite seller before Uttarayan.',
);
const vTE = table(
  ['When price', 'Total spending', 'Demand is'],
  [
    ['Falls', 'Rises', 'Elastic (Ed > 1)'],
    ['Falls', 'Stays the same', 'Unitary (Ed = 1)'],
    ['Falls', 'Falls', 'Inelastic (Ed < 1)'],
    ['Rises', 'Falls', 'Elastic (Ed > 1)'],
    ['Rises', 'Rises', 'Inelastic (Ed < 1)'],
  ],
  'Table for the total expenditure method: if spending moves opposite to price demand is elastic, if spending is unchanged it is unitary, and if spending moves in the same direction as price it is inelastic',
  'Outlay method: read the direction of total spending, not exact values.',
);
const vTEFlow = flow(
  'TB',
  ['Price changes', 'Did total spending move opposite to price?', 'Yes: elastic. Unchanged: unitary. Same direction: inelastic'],
  'Flow for the outlay method: when price changes, check whether total spending moved opposite to price (elastic), stayed the same (unitary) or moved in the same direction (inelastic)',
  'The outlay test in one question',
);
const vRoso = table(
  ['', 'Before', 'After', 'Percentage change'],
  [
    ['Price of a box (₹)', String(ROSO.p0), String(ROSO.p1), `${pct(ROSO.p0, ROSO.p1)}`],
    ['Boxes a day', String(ROSO.q0), String(ROSO.q1), `${pct(ROSO.q0, ROSO.q1)}`],
  ],
  `Small table for an imagined Kolkata sweet shop: the price of a rosogolla box falls 20 per cent and boxes sold rise 20 per cent, so elasticity is ${ROSO_ED}`,
);
const vPointTable = table(
  ['Position on a straight line', 'Lower vs upper segment', 'Ed'],
  [
    ['Meets the price axis', 'Upper segment is zero', '∞'],
    ['Above the mid-point', 'Lower longer than upper', 'Greater than 1'],
    ['Mid-point', 'Equal', '1'],
    ['Below the mid-point', 'Lower shorter than upper', 'Less than 1'],
    ['Meets the quantity axis', 'Lower segment is zero', '0'],
  ],
  'Table of elasticity at five positions on a straight-line demand curve: infinite at the price axis, greater than one above the mid-point, one at the mid-point, less than one below it, and zero at the quantity axis',
);
const vFactors = table(
  ['Factor', 'Makes demand more elastic when…', 'Imagined example'],
  [
    ['Substitutes', 'Many close substitutes exist', 'One brand of soap'],
    ['Nature of the good', 'It is a luxury', 'Air-conditioned holidays'],
    ['Share of income', 'It takes a large share of income', 'A new refrigerator'],
    ['Number of uses', 'It has many uses', 'Electricity'],
    ['Postponement', 'Buying can be delayed', 'A new sofa'],
    ['Time period', 'The period is long', 'Petrol over two years'],
    ['Habit', 'It is not habit-forming', 'Tea is the opposite case'],
  ],
  'Table of seven factors affecting price elasticity: substitutes, nature of the good, share of income, number of uses, postponement, time period and habit, with when each makes demand more elastic and an imagined example',
);
const vCompare = table(
  ['Reason', 'One brand of biscuits', 'Wheat flour'],
  [
    ['Substitutes', 'Many other brands', 'Few close substitutes'],
    ['Nature', 'Snack, can be skipped', 'Daily necessity'],
    ['Postponement', 'Easy', 'Not possible'],
    ['Conclusion', 'Elastic', 'Inelastic'],
  ],
  'Worked example table comparing one brand of biscuits with wheat flour: biscuits have many substitutes, are a snack and can be postponed, so demand is elastic; flour has few substitutes, is a necessity and cannot be postponed, so demand is inelastic',
);
const vTime = flow(
  'LR',
  ['Petrol price rises', 'Short run: few choices, demand inelastic', 'Over time: metro, e-scooters, car pools', 'Long run: demand more elastic'],
  'Flow showing that when petrol becomes dearer, demand is inelastic in the short run but becomes more elastic in the long run as buyers adopt the metro, electric scooters and car pools',
  'Time makes demand more elastic',
);
const vIncome = table(
  ['Income elasticity', 'Meaning', 'Imagined example'],
  [
    ['Negative', 'Inferior good: bought less as income rises', 'Coarse broken rice'],
    ['Zero', 'Demand does not change with income', 'Salt (nearly)'],
    ['Between 0 and 1', 'Necessity: rises less than income', 'Milk'],
    ['Greater than 1', 'Luxury: rises more than income', 'Foreign holidays'],
  ],
  'Table of income elasticity: negative for inferior goods, zero when income has no effect, between zero and one for necessities, and above one for luxuries, with imagined examples',
);
const vCross = table(
  ['Pair of goods', 'Relationship', 'Sign of cross elasticity'],
  [
    ['Tea and coffee', 'Substitutes', 'Positive'],
    ['Cars and petrol', 'Complements', 'Negative'],
    ['Umbrellas and school bags', 'Unrelated', 'Zero'],
  ],
  'Table of cross elasticity: substitutes such as tea and coffee have a positive sign, complements such as cars and petrol a negative sign, and unrelated goods zero',
);
const vThree = table(
  ['Elasticity', 'Responds to', 'Formula in words'],
  [
    ['Price elasticity', 'The good\'s own price', '% change in quantity ÷ % change in own price'],
    ['Income elasticity', 'Consumers\' income', '% change in quantity ÷ % change in income'],
    ['Cross elasticity', 'Price of a related good', '% change in quantity of X ÷ % change in price of Y'],
  ],
  'Table comparing price, income and cross elasticity: what each responds to and its formula in words',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Price elasticity', 'Responsiveness of quantity demanded to own price'],
    ['Five degrees', 'Infinite, zero, one, greater than one, between zero and one'],
    ['Percentage method', 'Ed = (ΔQ ÷ Q) ÷ (ΔP ÷ P), initial values, sign dropped'],
    ['Outlay method', 'Spending opposite to price: elastic; same direction: inelastic'],
  ],
  'Summary table of Part 1: meaning of price elasticity, the five degrees, the percentage method and the total expenditure method',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Point method', 'Lower segment ÷ upper segment; tangent for a curve'],
    ['Factors', 'Substitutes, nature, income share, uses, postponement, time, habit'],
    ['Income elasticity', 'Negative: inferior; 0 to 1: necessity; above 1: luxury'],
    ['Cross elasticity', 'Positive: substitutes; negative: complements; zero: unrelated'],
  ],
  'Summary table of Part 2: the point method, the factors affecting elasticity, income elasticity and cross elasticity',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Elasticity of Demand — Part 1: Meaning, Degrees and Measurement',
  goals: [
    'Define price elasticity of demand and draw the five degrees',
    'Calculate price elasticity by the percentage method and find an unknown price or quantity',
    'Judge whether demand is elastic, unitary or inelastic from changes in total expenditure',
  ],
  slides: [
    sl('title', 'Elasticity of Demand', {
      b: 'Part 1 — **how much** buyers respond to a price change, the **five degrees**, the **percentage method** and the **total expenditure method**.',
      v: flow('LR', ['Meaning', 'Five degrees', 'Percentage method', 'Unknown price or quantity', 'Outlay method'], 'Route map of Part 1: meaning, five degrees, the percentage method, finding an unknown price or quantity, and the outlay method', 'Part 1 at a glance'),
      n: 'The Law of Demand tells us the direction in which buyers react to a price change. But a shopkeeper also wants to know how much they react. Will a small price cut bring a flood of customers, or hardly any? That size of response is called elasticity of demand. In this part we define it, see its five degrees, and learn two ways to measure it.',
    }),
    sl('concept', 'What price elasticity measures', {
      b: '**Price elasticity of demand (Ed)** is the degree of responsiveness of the quantity demanded of a good to a change in **its own price**.\n\nEd = percentage change in quantity demanded ÷ percentage change in price.',
      v: flow('LR', ['Own price changes', 'Quantity demanded responds', 'Size of response compared', 'Ed'], 'Flow: a change in the good\'s own price leads to a response in quantity demanded, and comparing the two percentage changes gives the elasticity', 'A ratio of two percentage changes'),
      n: 'Elasticity compares two percentage changes: how much the quantity bought changes, against how much the price changed. Because both are percentages, the answer has no units. It does not matter whether we count rice in kilograms or quintals. A big number means buyers are very sensitive to price; a small number means they hardly react.',
    }),
    sl('diagram', 'Three special cases', {
      v: vDegreesA,
      n: 'Three cases are special. If buyers will take any amount at one price but nothing at a slightly higher price, demand is perfectly elastic and the curve is horizontal. If they buy exactly the same amount whatever the price, demand is perfectly inelastic and the curve is vertical. If total spending never changes, demand is unitary elastic and the curve is a rectangular hyperbola.',
    }),
    sl('diagram', 'Relatively elastic and relatively inelastic', {
      v: vDegreesB,
      n: 'Most real goods fall between the extremes. When quantity responds more than in proportion to price, demand is relatively elastic, and we draw a flatter curve. When quantity responds less than in proportion, demand is relatively inelastic, and we draw a steeper curve. Remember that comparing flat and steep only works where two curves pass through the same point.',
    }),
    sl('check', 'Quick check: the vertical curve', {
      b: 'A patient needs exactly 30 insulin vials a month whatever their price. How is her demand curve drawn?',
      chk: 'm_vertical',
      n: 'Ask whether the quantity changes at all when the price changes. If it never changes, think about which line shows that.',
    }),
    sl('diagram', 'The five degrees at a glance', {
      v: vDegreeTable,
      n: 'Here are all five degrees together, with the value of the coefficient, the shape of the curve and an imagined example. Infinite and zero are the two extremes. One is the dividing line. Above one, buyers are sensitive; between zero and one, they are not very sensitive. Learn this table well: one-mark questions often test it.',
    }),
    sl('concept', 'The percentage (proportionate) method', {
      b: '**Ed = (ΔQ ÷ Q) ÷ (ΔP ÷ P) = (ΔQ ÷ ΔP) × (P ÷ Q)**\n\nQ and P are the **original** quantity and price. The answer is negative because price and quantity move in opposite directions; we **drop the minus sign** and report Ed as a positive number.',
      v: vSteps,
      n: 'To measure elasticity exactly we use the percentage method. Find the change in quantity as a fraction of the original quantity, and the change in price as a fraction of the original price. Divide the first by the second. The result comes out negative for a normal good, so we drop the minus sign. Then compare the number with one.',
    }),
    sl('example', 'Worked example 1: idli plates in Chennai', {
      b: 'An imagined tiffin centre cuts the idli price from ₹40 to ₹32; plates sold rise from 200 to 260.',
      bl: ['Step 1 — Change in quantity as a share of 200.', 'Step 2 — Change in price as a share of 40.', 'Step 3 — Divide, drop the sign, compare with 1.'],
      v: vIdliWork,
      n: 'Sales rise by sixty plates out of two hundred, which is thirty per cent. The price falls by eight rupees out of forty, which is twenty per cent. Thirty divided by twenty gives one point five. That is more than one, so demand for idli plates at this centre is relatively elastic.',
    }),
    sl('diagram', 'The idli price cut on a demand curve', {
      v: vIdli,
      n: 'On a diagram, the price cut is a movement down the demand curve from point A to point B. The price falls from forty to thirty-two rupees, and the plates sold rise from two hundred to two hundred and sixty. The proportionate change in quantity is bigger than the proportionate change in price.',
    }),
    sl('example', 'Worked example 2: finding the new quantity', {
      b: 'An imagined Ahmedabad kite seller sells 500 kites a day at ₹50; Ed = 0.8. She raises the price to ₹55.',
      bl: ['Step 1 — Percentage rise in price.', 'Step 2 — Multiply by Ed to get the percentage fall in quantity.', 'Step 3 — Subtract that share from 500.'],
      v: vKiteWork,
      n: 'Sometimes we know the elasticity and must find the new quantity. The price rises by five rupees out of fifty, which is ten per cent. Elasticity is zero point eight, so quantity falls by eight per cent. Eight per cent of five hundred is forty kites, so she now sells four hundred and sixty kites a day.',
    }),
    sl('two-column', 'Finding an unknown price', {
      cols: [
        '**Known:** Ed, the original price and the change in quantity.\n\n**Step 1:** percentage change in quantity.\n\n**Step 2:** divide by Ed to get the percentage change in price.',
        '**Step 3:** apply that percentage to the original price.\n\n**Check:** a price cut should go with a rise in quantity, and a price rise with a fall.',
      ],
      v: vRoso,
      n: 'We can also work backwards to a price. First find the percentage change in quantity. Divide it by the elasticity to get the percentage change in price, then apply it to the original price. The small table shows a sweet shop where a twenty per cent price cut brought a twenty per cent rise in boxes sold, so elasticity is exactly one.',
    }),
    sl('check', 'Quick check: rosogolla boxes', {
      b: 'Price ₹200 → ₹160; boxes 150 → 180. What is the degree of elasticity?',
      chk: 'm_rosogolla_degree',
      n: 'Work out both percentage changes from the original values and compare them.',
    }),
    sl('concept', 'The total expenditure (outlay) method', {
      b: 'Compare buyers\' **total spending** on the good (price × quantity) before and after a price change.\n\n- Spending moves **opposite** to price → **elastic**\n- Spending **unchanged** → **unitary**\n- Spending moves in the **same direction** as price → **inelastic**',
      v: vTE,
      n: 'A second way to judge elasticity looks at how much buyers spend in total. If a price cut makes total spending rise, buyers responded strongly, so demand is elastic. If spending stays the same, demand is unitary. If spending falls with the price, demand is inelastic. This method tells us the degree, not an exact number.',
    }),
    sl('diagram', 'The outlay test in one question', {
      v: vTEFlow,
      n: 'You can reduce the outlay method to one question. After the price changed, did total spending move the opposite way, stay the same, or move the same way? Opposite means elastic, unchanged means unitary, and the same way means inelastic.',
    }),
    sl('check', 'Quick check: spending stays the same', {
      b: 'Readers spend the same total on a newspaper after its price changes. Their demand is…',
      chk: 'm_te_unchanged',
      n: 'Unchanged spending points to one particular degree. Which one?',
    }),
    sl('concept', 'Limits of the outlay method', {
      b: '- It shows only **three categories**, not the exact coefficient.\n- It cannot separate perfectly elastic or perfectly inelastic cases from the others.\n- In the ISC syllabus, numericals are set on the **percentage method** only.',
      n: 'The outlay method is quick and practical for a shopkeeper who watches her takings, but it has limits. It cannot tell us whether elasticity is one point two or three, only that it is above one. For exact values, and for every numerical question in your examination, use the percentage method.',
    }),
    sl('check', 'Quick check: perfectly inelastic', {
      b: 'Fill in: when quantity does not change at all, demand is perfectly ___ and Ed is ___.',
      chk: 'fb_perfectly_inelastic',
      n: 'Think of the insulin example and the vertical line.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Price elasticity measures how strongly quantity demanded responds to the good\'s own price. It has five degrees, from infinite to zero. The percentage method gives an exact value from the original price and quantity, with the minus sign dropped. The outlay method judges the degree from the direction of total spending.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always divide by the **original** price and quantity; write the formula first.',
        'Drop the minus sign and **say so**; then state the degree (elastic, unitary or inelastic).',
        'Numericals in the ISC paper are set on the **percentage method** only.',
        'For the outlay method, write the **direction** of spending, then the conclusion.',
        '2 marks: formula and answer; 3 marks: working, answer and the degree with a reason.',
      ],
      n: 'A few habits earn marks. Write the formula before substituting. Divide by the original values, and state clearly that you have dropped the minus sign. Always finish a numerical by naming the degree of elasticity. In outlay method questions, say which way spending moved before you give your conclusion.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Elasticity of Demand — Part 2: Point Method, Factors, Income and Cross Elasticity',
  goals: [
    'Explain the point method on straight and curved demand curves',
    'Explain how substitutes, nature, income share, uses, postponement, time and habit affect elasticity',
    'Interpret the signs of income elasticity and cross elasticity',
  ],
  slides: [
    sl('title', 'Elasticity of Demand, Part 2', {
      b: 'Part 2 — the **point method**, the **factors** that make demand elastic or inelastic, and **income** and **cross** elasticity.',
      v: flow('LR', ['Point method', 'Curved demand curves', 'Factors', 'Income elasticity', 'Cross elasticity'], 'Route map of Part 2: the point method, curved demand curves, the factors affecting elasticity, income elasticity and cross elasticity', 'Part 2 at a glance'),
      n: 'In Part 2 we see that elasticity can differ from point to point on the same demand curve, learn what makes some goods elastic and others inelastic, and meet two more elasticities, which measure how demand responds to income and to the prices of related goods.',
    }),
    sl('diagram', 'The point (geometric) method', {
      b: '**Ed at a point = lower segment ÷ upper segment**',
      v: vPoint,
      n: 'On a straight-line demand curve, pick a point and split the line there. The lower segment runs from the point down to the quantity axis; the upper segment runs up to the price axis. Elasticity at the point is the lower segment divided by the upper one. At the mid-point they are equal, so elasticity is one.',
    }),
    sl('diagram', 'Five positions on one straight line', {
      v: vPointTable,
      n: 'As we slide down the line the lower segment shrinks and the upper segment grows. So elasticity falls from infinity where the line touches the price axis, through values above one, to exactly one at the mid-point, then below one, and finally zero at the quantity axis. A straight line does not have the same elasticity everywhere.',
    }),
    sl('check', 'Quick check: where is Ed equal to one?', {
      b: 'On a straight-line demand curve meeting both axes, where is elasticity equal to one?',
      chk: 'm_point_mid',
      n: 'Think about when the lower segment and the upper segment are equal.',
    }),
    sl('diagram', 'Curved demand curves: use a tangent', {
      v: vTangent,
      n: 'If the demand curve is curved, draw a tangent that just touches it at the point and extend the tangent to both axes. Elasticity at the point is the lower part of the tangent divided by the upper part. The idea is the same as for a straight line, applied to the tangent.',
    }),
    sl('example', 'Worked example 1: reading elasticity off a line', {
      b: 'A straight demand line for gym memberships in an imagined Pune suburb meets both axes. Describe Ed at the top end, above the middle, at the middle, below it and at the bottom end.',
      bl: ['Step 1 — Write Ed = lower ÷ upper.', 'Step 2 — Compare the two segments at each position.', 'Step 3 — State the degree at each position.'],
      v: vPointTable,
      n: 'Let us reason it out. At the top end the upper segment is zero, so elasticity is infinite. Above the middle the lower segment is longer, so elasticity is more than one. In the middle they match, so it is one. Below the middle it is less than one, and at the bottom end the lower segment vanishes, so elasticity is zero.',
    }),
    sl('concept', 'What makes demand elastic or inelastic?', {
      v: vFactors,
      n: 'Why are some goods elastic and others not? Close substitutes, luxury status, a large share of income, many uses, purchases that can be postponed and a long time to adjust all make demand more elastic. Necessities, tiny budget shares, urgent purchases and habits make it less elastic.',
    }),
    sl('two-column', 'Price level and habit', {
      cols: [
        '**Very cheap goods** (a pencil) and **very costly goods** bought by the rich (a luxury car) both have **inelastic** demand: price changes hardly affect these buyers.',
        '**Habit-forming goods** (a daily cup of tea) keep being bought after a price rise, so their demand is **inelastic**.',
      ],
      v: table(['Good', 'Why demand is inelastic'], [['A pencil', 'Tiny share of income'], ['A luxury car', 'Rich buyers barely notice the price'], ['Daily tea', 'Habit']], 'Small table: a pencil, a luxury car and daily tea all have inelastic demand, because of a tiny budget share, rich buyers and habit respectively'),
      n: 'Two more factors are worth noting. Goods at the very bottom or the very top of the price range tend to have inelastic demand, because buyers either do not notice the cost or can easily afford it. Habits, like a morning cup of tea, also keep demand steady when prices rise.',
    }),
    sl('example', 'Worked example 2: biscuits versus wheat flour', {
      b: 'Compare the elasticity of demand for one brand of biscuits and for wheat flour, for families in an imagined Indore market.',
      bl: ['Step 1 — Check substitutes.', 'Step 2 — Check the nature of the good.', 'Step 3 — Check postponement, then conclude.'],
      v: vCompare,
      n: 'Take each factor in turn. One biscuit brand has many rivals on the shelf, it is a snack and it can be skipped, so its demand is elastic. Wheat flour has few close substitutes, it is a daily necessity and buying cannot wait, so its demand is inelastic. Three reasons, one clear conclusion.',
    }),
    sl('check', 'Quick check: goods with many uses', {
      b: 'Electricity is used for lighting, cooking, water pumps and workshops. Its demand tends to be…',
      chk: 'm_many_uses',
      n: 'If a good can move into more uses when it is cheaper, how strongly does its demand respond?',
    }),
    sl('diagram', 'Time makes demand more elastic', {
      v: vTime,
      n: 'Time matters a great deal. When petrol becomes dearer, most commuters cannot change their travel at once, so demand is inelastic. Over months and years they take the metro, buy electric scooters or share cars. In the long run demand becomes more elastic.',
    }),
    sl('concept', 'Income elasticity of demand', {
      b: '**Income elasticity** = percentage change in quantity demanded ÷ percentage change in income.',
      v: vIncome,
      n: 'Income elasticity measures how demand responds to a change in income rather than price. Its sign matters. A negative value marks an inferior good, bought less as people get richer. A value between zero and one marks a necessity, and a value above one marks a luxury, whose demand grows faster than income.',
    }),
    sl('check', 'Quick check: packaged juice', {
      b: 'Families buy more packaged juice as incomes rise. Income elasticity is…',
      chk: 'm_income_positive',
      n: 'Do quantity and income move in the same direction or opposite directions?',
    }),
    sl('concept', 'Cross elasticity of demand', {
      b: '**Cross elasticity** = percentage change in quantity of X ÷ percentage change in the price of Y.',
      v: vCross,
      n: 'Cross elasticity measures how demand for one good responds to the price of another. If a dearer coffee makes people buy more tea, the sign is positive and the goods are substitutes. If dearer petrol makes people buy fewer cars, the sign is negative and they are complements. Unrelated goods give zero.',
    }),
    sl('example', 'Worked example 3: three kinds of elasticity', {
      b: 'Match each response to the right elasticity.',
      bl: ['Own price changes → price elasticity.', 'Income changes → income elasticity.', 'A related good\'s price changes → cross elasticity.'],
      v: vThree,
      n: 'All three elasticities share one pattern: a percentage change in quantity divided by a percentage change in something else. Ask what changed. If it is the good\'s own price, use price elasticity. If it is income, use income elasticity. If it is the price of another good, use cross elasticity.',
    }),
    sl('check', 'Quick check: cabs and autos', {
      b: 'Dearer cab fares lead to more auto-rickshaw rides. The cross elasticity is…',
      chk: 'm_cross_sub',
      n: 'Do the cab fare and auto rides move together or in opposite directions?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The point method divides the lower segment by the upper segment, using a tangent for curves, so elasticity changes along a straight line. Substitutes, the nature of the good, income share, uses, postponement, time and habit decide how elastic demand is. Income and cross elasticity are read mainly from their signs.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Point method: **lower ÷ upper**; mid-point gives Ed = 1. No numericals on this method in ISC.',
        'For a factor question, name the factor, give its **direction** and an **example**.',
        'Income elasticity: **negative = inferior**, **0 to 1 = necessity**, **above 1 = luxury**.',
        'Cross elasticity: **positive = substitutes**, **negative = complements**, **zero = unrelated**.',
        'In comparisons, end with a clear conclusion: which good is more elastic and why.',
      ],
      n: 'For the point method, remember lower over upper and that the mid-point gives one. For factor questions, always name the factor, say which way it pushes elasticity, and add an example. For income and cross elasticity, the sign is the key: learn the three meanings of each sign.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Elasticity of Demand — Notes',
  sections: [
    {
      h: '1. Meaning and degrees of price elasticity',
      t: 1,
      b: '**Price elasticity of demand** is the responsiveness of quantity demanded to a change in the good\'s **own price**. It is a ratio of two percentage changes, so it has **no units**.\n\n| Degree | Ed | Curve |\n|---|---|---|\n| Perfectly elastic | ∞ | Horizontal |\n| Perfectly inelastic | 0 | Vertical |\n| Unitary | 1 | Rectangular hyperbola |\n| Relatively elastic | > 1 | Flatter |\n| Relatively inelastic | between 0 and 1 | Steeper |\n\nFlat-versus-steep comparisons are valid only **at a common point**, because Ed also depends on P ÷ Q.',
      terms: [['Price elasticity of demand', 'Percentage change in quantity demanded divided by percentage change in own price.'], ['Unitary elasticity', 'Equal percentage changes in price and quantity; total spending unchanged.']],
      v: vDegreesA,
      vs: [vDegreesB],
    },
    {
      h: '2. The percentage (proportionate) method',
      t: 2,
      b: '**Ed = (ΔQ ÷ Q) ÷ (ΔP ÷ P) = (ΔQ ÷ ΔP) × (P ÷ Q)**, where Q and P are the **original** values. The ratio is negative for a normal demand curve; by convention the **minus sign is dropped**.\n\n**Unknown quantity:** percentage change in quantity = Ed × percentage change in price.\n**Unknown price:** percentage change in price = percentage change in quantity ÷ Ed.\n\nIn ISC 2027, **all numericals** on price elasticity use this method.',
      terms: [['Proportionate method', 'Another name for the percentage method, using changes divided by original values.']],
      v: vIdliWork,
      vs: [vIdli, vKiteWork],
    },
    {
      h: '3. The total expenditure (outlay) method',
      t: 3,
      b: 'Compare **total spending** (price × quantity) before and after a price change:\n\n- spending moves **opposite** to price → **elastic**;\n- spending **unchanged** → **unitary**;\n- spending moves the **same way** as price → **inelastic**.\n\nIt gives only the category, not an exact value, and ISC sets no numericals on it.',
      terms: [['Total expenditure (outlay)', 'Price multiplied by quantity bought: what buyers spend on the good.']],
      v: vTE,
      vs: [vTEFlow],
    },
    {
      h: '4. The point (geometric) method',
      t: 4,
      b: '**Ed at a point = lower segment ÷ upper segment** of a straight-line demand curve. It is **∞** at the price axis, **> 1** above the mid-point, **1** at the mid-point, **< 1** below it and **0** at the quantity axis. On a **curved** demand curve, draw a **tangent** at the point and use its segments. ISC sets no numericals on this method.',
      terms: [['Lower segment', 'Part of the demand line from the point to the quantity axis.'], ['Upper segment', 'Part of the demand line from the point to the price axis.']],
      v: vPoint,
      vs: [vTangent, vPointTable],
    },
    {
      h: '5. Factors affecting price elasticity',
      t: 5,
      b: '- **Substitutes:** more and closer substitutes → more elastic.\n- **Nature:** necessities inelastic, luxuries elastic.\n- **Share of income:** tiny share → inelastic.\n- **Number of uses:** many uses → more elastic.\n- **Postponement:** purchases that can wait → elastic.\n- **Time period:** more elastic in the long run.\n- **Habits** and **price level** (very cheap or very costly goods) → inelastic.',
      terms: [['Necessity', 'A good bought regularly whatever its price; its demand is inelastic.']],
      v: vFactors,
      vs: [vCompare, vTime],
    },
    {
      h: '6. Income and cross elasticity',
      t: 6,
      b: '**Income elasticity** = % change in quantity ÷ % change in income: **negative** for inferior goods, **0 to 1** for necessities, **above 1** for luxuries.\n\n**Cross elasticity** = % change in quantity of X ÷ % change in price of Y: **positive** for substitutes, **negative** for complements, **zero** for unrelated goods.',
      terms: [['Income elasticity', 'Responsiveness of demand to a change in consumers\' income.'], ['Cross elasticity', 'Responsiveness of demand for one good to the price of another.']],
      v: vIncome,
      vs: [vCross, vThree],
    },
  ],
  tips: '**Common mistakes**\n- Dividing by the **new** price or quantity instead of the original values.\n- Forgetting to drop the minus sign, or dropping it without saying so.\n- Calling a flatter curve more elastic without noting that the comparison holds at a common point.\n- Attempting numericals on the outlay or point method (ISC sets them on the percentage method only).\n- Mixing up signs: substitutes have a positive cross elasticity, complements a negative one.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: formula and answer, or two clear points.\n- 3 marks: working, answer and degree, or three points.\n- 5 marks: parts answered in order with working and reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Price elasticity of demand**', 'Responsiveness of quantity demanded to a change in the good\'s **own price**.', 'definition', 1],
  ['Why Ed has no units', 'It divides one percentage change by another.', 'concept', 1],
  ['**Perfectly elastic** demand', 'Ed = ∞; a **horizontal** demand curve.', 'definition', 1],
  ['**Perfectly inelastic** demand', 'Ed = 0; a **vertical** demand curve.', 'definition', 1],
  ['**Unitary elastic** demand', 'Ed = 1; a **rectangular hyperbola**; spending unchanged.', 'definition', 1],
  ['**Relatively elastic** demand', 'Ed > 1; quantity responds more than price.', 'definition', 1],
  ['**Relatively inelastic** demand', 'Ed between 0 and 1; quantity responds less than price.', 'definition', 1],
  ['Flatter means more elastic?', 'Only **at a common point**; Ed also depends on P ÷ Q.', 'exam-tip', 1],
  ['Percentage method formula', 'Ed = (ΔQ ÷ Q) ÷ (ΔP ÷ P), with the original values.', 'formula', 2],
  ['The minus sign', 'Ed comes out negative; drop the sign and say so.', 'exam-tip', 2],
  ['Idli: ₹40 → ₹32, 200 → 260 plates', `Ed = 30 ÷ 20 = ${IDLI_ED}, relatively elastic.`, 'example', 2],
  ['Finding a new quantity', 'Percentage change in quantity = Ed × percentage change in price.', 'formula', 2],
  ['Finding a new price', 'Percentage change in price = percentage change in quantity ÷ Ed.', 'formula', 2],
  ['Salt: price up 25 per cent, quantity down 5 per cent', `Ed = ${SALT_ED}, relatively inelastic.`, 'example', 2],
  ['**Outlay method**: elastic', 'Total spending moves **opposite** to price.', 'concept', 3],
  ['**Outlay method**: inelastic', 'Total spending moves in the **same direction** as price.', 'concept', 3],
  ['**Outlay method**: unitary', 'Total spending **unchanged** when price changes.', 'concept', 3],
  ['Limit of the outlay method', 'Gives only the category, not an exact coefficient.', 'fact', 3],
  ['**Point method**', 'Ed = **lower segment ÷ upper segment**.', 'formula', 4],
  ['Ed at the mid-point of a straight line', '**1**, because the segments are equal.', 'fact', 4],
  ['Ed at the two ends of a straight line', '**∞** at the price axis, **0** at the quantity axis.', 'fact', 4],
  ['Point method on a curve', 'Draw a **tangent** at the point and use its segments.', 'concept', 4],
  ['Substitutes and elasticity', 'More close substitutes → **more elastic** demand.', 'concept', 5],
  ['Necessities vs luxuries', 'Necessities **inelastic**; luxuries **elastic**.', 'concept', 5],
  ['Share of income and elasticity', 'A tiny share (matchboxes) → **inelastic**.', 'concept', 5],
  ['Time and elasticity', 'Demand is **more elastic in the long run**.', 'concept', 5],
  ['**Income elasticity** signs', 'Negative: inferior; 0 to 1: necessity; above 1: luxury.', 'definition', 6],
  ['**Cross elasticity** signs', 'Positive: substitutes; negative: complements; zero: unrelated.', 'definition', 6],
  ['Cars and petrol', 'Complements: **negative** cross elasticity.', 'example', 6],
  ['Tea and coffee', 'Substitutes: **positive** cross elasticity.', 'example', 6],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Elasticity of Demand',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_ed_meaning', 'm_salt_value', 'm_te_elastic', 'm_substitutes_factor', 'ar_sign'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_formula', { attempt: 1, keys: ['s_five_degrees', 's_te_table'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_compare_goods', { attempt: 1, keys: ['s3_auto_judge', 's3_cross_cases'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question, with described diagrams where they help.', items: ['l_degrees'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Elasticity of Demand',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_horizontal', 'm_unitary_shape', 'm_flat_steep', 'm_auto_value', 'm_te_inelastic', 'm_point_upper', 'm_share_income', 'm_time_period', 'm_income_negative', 'm_cross_comp', 'ar_te', 'ar_cross_unrelated'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_notebook', 's_point_meaning', { attempt: 1, keys: ['s_two_factors', 's_income_types'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_flat_vs_steep', 's3_point_five', 's3_long_run', { attempt: 1, keys: ['s3_te_shopkeeper', 's3_income_policy'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22. Answer each in parts with working.', items: ['l_numericals', { attempt: 1, keys: ['l_factors', 'l_income_cross'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of isc-12-economics-ch04 only (meaning and five degrees; percentage method with numericals; total expenditure method; point method; factors; income and cross elasticity). Removed topic honoured: numericals only on the percentage method; the outlay and point methods are taught conceptually.',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs including tables, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every buyer, shop, town, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused',
    data: `percentage-method figures computed in questions.mjs and asserted: idli Ed ${IDLI_ED}; kites ${KITE.q0} → ${KITE_Q1}; rosogolla Ed ${ROSO_ED}; salt Ed ${SALT_ED}; coconut, paneer, notebook, cinema, data-pack, auto, kurta and lemon figures; SVG curves drawn from their equations with points asserted on the curves`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
