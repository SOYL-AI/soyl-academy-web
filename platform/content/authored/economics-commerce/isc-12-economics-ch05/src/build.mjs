// Build ISC 12 Economics ch05 Theory of Supply and Elasticity of Supply. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch05/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch05', 'economics-commerce');
const { pct, es, pointEs, SAREE, SAREE_ES, sareeS1, sareeS2, ONION, ONION_Q1, MANGO_ES, BRASS, BRASS_ES, TEA_ES, HOSE, HOSE_MKT, WOOD, WOOD_HELD, FISH } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures (price on the y-axis, quantity on the x-axis)
function frame(xMax, yMax, xLabel = 'Quantity supplied', yLabel = 'Price (₹)', w = 480, h = 380) {
  const s = new Svg(w, h);
  const c = s.chart({ x1: xMax, y1: yMax, left: 70, top: 34, width: w - 150, height: h - 100, xLabel, yLabel });
  return { s, c };
}
function panels(n) {
  const s = new Svg(40 + n * 290, 330);
  const cs = Array.from({ length: n }, (_, i) => s.chart({ x1: 12, y1: 60, left: 50 + i * 290, top: 40, width: 220, height: 220, xLabel: 'Q', yLabel: 'P' }));
  const title = (i, t) => s.text(50 + i * 290 + 110, 318, t, { size: 13, bold: true });
  return { s, cs, title };
}
const sareeP = (q) => (q + 20) / 0.12; // inverse of S1: Q = 0.12P − 20
const sareeP2 = (q) => (q + 8) / 0.12; // inverse of S2: Q = 0.12P − 8

// Extension along S1 for the imagined Surat weaver.
const vExtension = (() => {
  const { s, c } = frame(80, 760, 'Sarees a week', 'Price (₹ per saree)');
  assert(sareeS1(SAREE.p0) === SAREE.q0 && sareeS1(SAREE.p1) === SAREE.q1, 'S1 points');
  c.fn(sareeP, 10, 70, { color: 'accent', sw: 2.6 });
  c.dot([SAREE.q0, SAREE.p0], 'accent').dot([SAREE.q1, SAREE.p1], 'accent');
  c.drop([SAREE.q0, SAREE.p0]).drop([SAREE.q1, SAREE.p1]);
  c.label([SAREE.q0, SAREE.p0], 'A', { dx: -12, dy: -12, bold: true }).label([SAREE.q1, SAREE.p1], 'B', { dx: -12, dy: -12, bold: true });
  c.xTick(SAREE.q0, String(SAREE.q0)).xTick(SAREE.q1, String(SAREE.q1)).yTick(SAREE.p0, String(SAREE.p0)).yTick(SAREE.p1, String(SAREE.p1));
  c.label([70, sareeP(70)], 'S1', { anchor: 'start', dx: 6, color: 'accent', bold: true });
  return s.visual(
    `Upward-sloping supply curve S1 of an imagined Surat weaver: at 500 rupees she offers 40 sarees a week (point A), and at 600 rupees 52 sarees (point B). The move from A to B up the same curve is an extension of supply; elasticity is ${SAREE_ES}`,
    'Imagined figures: a higher price, a larger quantity, the same curve.',
  );
})();

// Increase in supply: S1 to S2 after cheaper yarn (12 more sarees at every price).
const vShift = (() => {
  const { s, c } = frame(80, 760, 'Sarees a week', 'Price (₹ per saree)');
  assert(sareeS2(SAREE.p0) === 52, 'S2 point');
  c.fn(sareeP, 10, 64, { color: 'accent', sw: 2.6 });
  c.fn(sareeP2, 10, 72, { color: 'blue', sw: 2.6 });
  c.dot([SAREE.q0, SAREE.p0], 'accent').dot([sareeS2(SAREE.p0), SAREE.p0], 'blue');
  c.seg([SAREE.q0 + 2, SAREE.p0], [sareeS2(SAREE.p0) - 2, SAREE.p0], { sw: 1.4, dash: true, color: 'muted' });
  c.yTick(SAREE.p0, String(SAREE.p0)).xTick(SAREE.q0, String(SAREE.q0)).xTick(sareeS2(SAREE.p0), String(sareeS2(SAREE.p0)));
  c.label([64, sareeP(64)], 'S1', { anchor: 'end', dx: -8, color: 'accent', bold: true });
  c.label([72, sareeP2(72)], 'S2', { anchor: 'start', dx: 6, color: 'blue', bold: true });
  return s.visual(
    'Two parallel upward-sloping supply curves for an imagined Surat weaver. After silk yarn becomes cheaper the curve shifts right from S1 to S2: at the same price of 500 rupees she now offers 52 sarees a week instead of 40. This is an increase in supply',
    'Imagined figures: more offered at the same price, so the whole curve moves.',
  );
})();

// Market supply as the horizontal sum of three knitting units (linear segments through the schedule points).
const vMarket = (() => {
  const { s, c } = frame(120, 460, 'Sock packets', 'Price (₹ per packet)', 520, 400);
  const firm = (a) => (p) => Math.max(0, (p - a) / 10);
  const A = firm(0), B = firm(50), C = firm(100);
  HOSE.prices.forEach((p, i) => {
    const f = Object.values(HOSE.firms);
    assert(A(p) === f[0][i] && B(p) === f[1][i] && C(p) === f[2][i] && A(p) + B(p) + C(p) === HOSE_MKT[i], 'hosiery lines');
  });
  c.seg([0, 0], [40, 400], { color: 'muted', sw: 1.8 });
  c.seg([0, 50], [35, 400], { color: 'muted', sw: 1.8, dash: true });
  c.seg([0, 100], [30, 400], { color: 'muted', sw: 1.8 });
  s.polyline([[0, 0], [5, 50], [15, 100], [105, 400]].map(([q, p]) => [c.X(q), c.Y(p)]), { color: 'accent', sw: 2.8 });
  c.dot([75, 300], 'accent').dot([30, 300]).dot([25, 300]).dot([20, 300]);
  c.seg([20, 300], [75, 300], { sw: 1.2, dash: true, color: 'muted' });
  c.yTick(300, '300').xTick(75, '75');
  c.label([105, 400], 'Market', { anchor: 'end', dx: -6, dy: -12, color: 'accent', bold: true });
  c.label([40, 400], 'A', { anchor: 'start', dx: 4, dy: -6, size: 12 });
  c.label([35, 400], 'B', { anchor: 'end', dx: -4, dy: -6, size: 12 });
  c.label([30, 400], 'C', { anchor: 'end', dx: -12, dy: 8, size: 12 });
  return s.visual(
    'Supply lines of three imagined Ludhiana knitting units A, B and C and the market supply curve to their right. At 300 rupees a packet the units supply 30, 25 and 20 packets, and the market supplies their sum, 75 packets. The market curve is the horizontal sum of the three',
    'Imagined figures: add quantities across at each price.',
  );
})();

// Backward-bending supply of labour: hours rise with the wage up to ₹400 an hour, then fall.
const vLabour = (() => {
  const { s, c } = frame(18, 800, 'Hours worked a day', 'Wage (₹ per hour)');
  const hours = (w) => (w <= 400 ? 8 + 0.02 * (w - 100) : 14 - 0.01 * (w - 400));
  assert(hours(100) === 8 && hours(400) === 14 && hours(700) === 11, 'labour points');
  const pts = [];
  for (let w = 100; w <= 700; w += 25) pts.push([c.X(hours(w)), c.Y(w)]);
  s.polyline(pts, { color: 'accent', sw: 2.6 });
  c.dot([14, 400], 'accent').dot([11, 700], 'accent');
  c.drop([14, 400]);
  c.label([14, 400], 'K', { anchor: 'start', dx: 10, bold: true });
  c.yTick(400, '400').xTick(14, '14').xTick(8, '8');
  c.label([11, 700], 'SL', { anchor: 'end', dx: -10, color: 'accent', bold: true });
  return s.visual(
    'Supply curve of labour of an imagined translator: as the wage rises from 100 to 400 rupees an hour her hours rise from 8 to 14 a day, but beyond 400 rupees (point K) the curve bends backward and at 700 rupees she works only 11 hours, preferring more leisure',
    'Schematic, imagined figures: the backward-bending supply curve of labour.',
  );
})();

// Three special degrees: perfectly elastic, perfectly inelastic, unitary (ray from the origin).
const vDegrees = (() => {
  const { s, cs, title } = panels(3);
  cs[0].seg([0, 30], [11, 30], { color: 'accent', sw: 2.6 });
  cs[0].label([6, 30], 'S', { dy: -12, color: 'accent', bold: true });
  cs[0].yTick(30, '30');
  title(0, 'Perfectly elastic: Es = ∞');
  cs[1].seg([6, 4], [6, 56], { color: 'accent', sw: 2.6 });
  cs[1].label([6, 50], 'S', { anchor: 'start', dx: 10, color: 'accent', bold: true });
  cs[1].xTick(6, '6');
  title(1, 'Perfectly inelastic: Es = 0');
  cs[2].fn((q) => 5 * q, 0, 11, { color: 'accent', sw: 2.6 });
  for (const q of [4, 8]) { assert(pointEs(1 / 5, 5 * q, q) === 1, 'ray'); cs[2].dot([q, 5 * q], 'accent'); }
  cs[2].label([10, 50], 'S', { anchor: 'start', dx: 8, color: 'accent', bold: true });
  title(2, 'Unitary: Es = 1 (from origin)');
  return s.visual(
    'Three small supply diagrams with price on the vertical axis: a horizontal supply line for perfectly elastic supply, a vertical supply line for perfectly inelastic supply, and a straight line starting at the origin for unitary elastic supply',
    'Schematic: three special degrees of elasticity of supply.',
  );
})();

// Geometric method: three straight supply lines meeting the price axis, the origin and the quantity axis.
const vGeometric = (() => {
  const { s, c } = frame(48, 58, 'Quantity supplied', 'Price (₹)');
  c.fn((q) => 10 + q, 0, 40, { color: 'accent', sw: 2.6 });
  c.fn((q) => q, 0, 46, { color: 'blue', sw: 2.6 });
  c.fn((q) => q - 10, 10, 46, { color: 'green', sw: 2.6 });
  assert(pointEs(1, 30, 20) > 1 && pointEs(1, 20, 20) === 1 && pointEs(1, 20, 30) < 1, 'geometric');
  c.dot([0, 10], 'accent').dot([10, 0], 'green');
  c.label([40, 50], 'S1: Es > 1', { anchor: 'end', dx: -10, size: 13, color: 'accent', bold: true });
  c.label([46, 46], 'S2: Es = 1', { anchor: 'start', dx: -40, dy: 16, size: 13, color: 'blue', bold: true });
  c.label([46, 36], 'S3: Es < 1', { anchor: 'start', dx: -40, dy: 18, size: 13, color: 'green', bold: true });
  c.yTick(10, '10').xTick(10, '10');
  return s.visual(
    'Three straight supply lines: S1 starts on the price axis above the origin and has elasticity greater than one; S2 starts at the origin and has elasticity equal to one; S3 starts on the quantity axis to the right of the origin and has elasticity less than one',
    'Geometric method: read the degree from where the extended line meets the axes.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vStock = table(
  ['', 'Stock', 'Supply at today\'s price', 'Why'],
  [
    ['Kochi fisherman (imagined)', `${FISH.stock} kg`, `${FISH.supply} kg`, 'Perishable: must sell almost all today'],
    ['Saharanpur woodcraft dealer (imagined)', `${WOOD.stock} boxes`, `${WOOD.supply} boxes`, `Durable: holds back ${WOOD_HELD} for a better price`],
  ],
  `Table comparing stock and supply: an imagined Kochi fisherman has a stock of ${FISH.stock} kilograms and supplies all of it because fish is perishable; an imagined Saharanpur dealer has ${WOOD.stock} boxes but supplies ${WOOD.supply}, holding back ${WOOD_HELD} because boxes are durable`,
  'Supply can equal stock but never exceed it in the short period.',
);
const vDeterminants = table(
  ['Determinant', 'Change', 'Effect on supply'],
  [
    ['Own price (Px)', 'Rises', 'Extension (movement up the curve)'],
    ['Prices of inputs (Pf)', 'Rise', 'Decrease (shift left)'],
    ['Technology (T)', 'Improves', 'Increase (shift right)'],
    ['Taxes / subsidies (Tx)', 'Tax up / subsidy up', 'Decrease / increase'],
    ['Goal of the firm (G)', 'Sales rather than profit', 'Increase'],
    ['Prices of related goods (Pr)', 'Competing good dearer', 'Decrease'],
    ['Number of firms (N)', 'More firms', 'Increase in market supply'],
  ],
  'Table of the determinants of supply: own price, prices of inputs, technology, taxes and subsidies, the goal of the firm, prices of related goods and the number of firms, with the direction of their effect on supply',
);
const vFunction = flow(
  'LR',
  ['Own price Px', 'Input prices Pf, technology T, taxes Tx', 'Goal G, related goods Pr, firms N', 'Quantity supplied Sx'],
  'Flow showing the supply function: the own price, input prices, technology, taxes, the goal of the firm, prices of related goods and the number of firms all feed into the quantity supplied',
  'Sx = f(Px, Pf, T, Tx, G, Pr, N)',
);
const vSchedule = table(
  ['Price per packet (₹)', ...Object.keys(HOSE.firms), 'Market supply'],
  HOSE.prices.map((p, i) => [String(p), ...Object.values(HOSE.firms).map((f) => String(f[i])), `**${HOSE_MKT[i]}**`]),
  `Supply schedules of three imagined Ludhiana knitting units and their market supply: at 100, 200, 300 and 400 rupees a packet the market supplies ${HOSE_MKT.join(', ')} packets, the sums of the units' quantities at each price`,
  'Imagined figures: market supply = sum of quantities at each price.',
);
const vExceptions = table(
  ['Exception', 'Imagined example', 'Why the law fails'],
  [
    ['Labour at high wages', 'A Chennai surgeon cuts her hours after a fee rise', 'Prefers leisure at high income'],
    ['Rare goods', 'Old Mughal coins', 'Quantity cannot be increased'],
    ['Agricultural goods', 'Punjab wheat after sowing', 'Output fixed until next season'],
    ['Expected price rise', 'A Guntur chilli trader withholds stock', 'Sells less now to sell later at more'],
  ],
  'Table of four exceptions to the law of supply: labour at high wages, rare goods, agricultural goods in the short period and an expected future price rise, each with an imagined example and the reason',
);
const vMoveShift = table(
  ['', 'Movement along the curve', 'Shift of the curve'],
  [
    ['Cause', 'Change in the good\'s own price', 'Change in any other determinant'],
    ['Upward / rightward', 'Extension: more at a higher price', 'Increase: more at every price'],
    ['Downward / leftward', 'Contraction: less at a lower price', 'Decrease: less at every price'],
    ['Diagram', 'Point moves on one curve', 'Whole curve moves to S2'],
  ],
  'Table distinguishing a movement along the supply curve (extension and contraction, caused by the own price) from a shift of the curve (increase and decrease, caused by other determinants)',
);
const vShiftCauses = flow(
  'TB',
  ['Something other than the own price changes', 'Does it lower cost or raise the reward of supplying?', 'Yes: increase, curve shifts right. No: decrease, curve shifts left'],
  'Flow for deciding the direction of a shift: if a non-price change lowers cost or raises the reward of supplying, supply increases and the curve shifts right; otherwise supply decreases and it shifts left',
  'Reading a shift',
);
const vSareeWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['Percentage change in quantity', `(${SAREE.q1} − ${SAREE.q0}) ÷ ${SAREE.q0} × 100`, `${pct(SAREE.q0, SAREE.q1)} per cent`],
    ['Percentage change in price', `(${SAREE.p1} − ${SAREE.p0}) ÷ ${SAREE.p0} × 100`, `${pct(SAREE.p0, SAREE.p1)} per cent`],
    ['Es', '30 ÷ 20', String(SAREE_ES)],
    ['Degree', 'Es > 1', 'Relatively elastic'],
  ],
  `Worked example table for the imagined Surat weaver: quantity supplied rises 30 per cent, price rises 20 per cent, so elasticity of supply is ${SAREE_ES}, relatively elastic`,
  'Imagined figures: ₹500 to ₹600, 40 to 52 sarees a week.',
);
assert(es(SAREE.p0, SAREE.p1, SAREE.q0, SAREE.q1) === 1.5, 'saree es');
const vOnionWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['Percentage rise in price', `(${ONION.p1} − ${ONION.p0}) ÷ ${ONION.p0} × 100`, `${pct(ONION.p0, ONION.p1)} per cent`],
    ['Percentage rise in quantity', `${ONION.e} × 20`, '10 per cent'],
    ['Extra kilograms', '10 per cent of 1,000', '100'],
    ['New supply', '1,000 + 100', `${ONION_Q1.toLocaleString('en-IN')} kg`],
  ],
  `Worked example table for an imagined Nashik onion trader: a 20 per cent price rise with elasticity ${ONION.e} brings a 10 per cent rise in quantity, from 1,000 to ${ONION_Q1} kilograms a day`,
  'Imagined Nashik trader, Es = 0.5.',
);
const vDegreeTable = table(
  ['Degree', 'Coefficient', 'Curve', 'Imagined example'],
  [
    ['Perfectly elastic', 'Es = ∞', 'Horizontal line', 'Any quantity of printed forms at a fixed rate'],
    ['Perfectly inelastic', 'Es = 0', 'Vertical line', 'Seats for one cricket match'],
    ['Unitary elastic', 'Es = 1', 'Straight line from the origin', 'Mango boxes from a Ratnagiri orchard'],
    ['Relatively elastic', 'Es > 1', 'Line meeting the price axis', 'Sarees from a Surat weaver'],
    ['Relatively inelastic', 'Es < 1', 'Line meeting the quantity axis', 'Brass lamps from a Moradabad unit'],
  ],
  'Table of the five degrees of elasticity of supply: perfectly elastic is infinite with a horizontal curve, perfectly inelastic is zero with a vertical curve, unitary is one on a line from the origin, relatively elastic is above one on a line meeting the price axis, and relatively inelastic is below one on a line meeting the quantity axis',
);
const vEsSteps = flow(
  'LR',
  ['Change in quantity ÷ original quantity', 'Change in price ÷ original price', 'Divide the first by the second', 'Compare with 1'],
  'Flow of the percentage method for elasticity of supply: divide the change in quantity supplied by the original quantity, divide the change in price by the original price, divide the first by the second and compare with one',
  'Es = (ΔQ ÷ Q) ÷ (ΔP ÷ P)',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Supply', 'Quantity offered at a price in a period; at most the stock'],
    ['Determinants', 'Own price, input prices, technology, taxes, goals, related goods, firms'],
    ['Law of supply', 'Price and quantity supplied move together; curve slopes up'],
    ['Market supply', 'Horizontal sum of firms\' supplies; exceptions exist'],
  ],
  'Summary table of Part 1: meaning of supply and stock, the determinants, the law of supply and market supply with exceptions',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Movement', 'Own price changes: extension or contraction'],
    ['Shift', 'Other factors change: increase or decrease'],
    ['Percentage method', 'Es = (ΔQ ÷ Q) ÷ (ΔP ÷ P), original values'],
    ['Geometric method', 'Price axis: > 1; origin: = 1; quantity axis: < 1'],
  ],
  'Summary table of Part 2: movement along versus shift of the supply curve, the percentage method and the geometric method of elasticity of supply',
);
assert(MANGO_ES === 1 && BRASS_ES === 0.5 && TEA_ES === 0, 'other es values');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Theory of Supply — Part 1: Supply, its Determinants and the Law of Supply',
  goals: [
    'Distinguish stock from supply for perishable and durable goods',
    'Write the supply function and explain the determinants of supply',
    'State the law of supply, derive market supply and explain its exceptions',
  ],
  slides: [
    sl('title', 'Theory of Supply and Elasticity of Supply', {
      b: 'Part 1 — what **supply** means, how it differs from **stock**, what **determines** it, and the **law of supply**.',
      v: flow('LR', ['Supply and stock', 'Determinants', 'Supply function', 'Law of supply', 'Market supply', 'Exceptions'], 'Route map of Part 1: supply and stock, determinants, the supply function, the law of supply, market supply and its exceptions', 'Part 1 at a glance'),
      n: 'Demand tells us what buyers want. Supply is the other half of every market. A weaver in Surat, a fisherman in Kochi and a cement plant in Satna all decide how much to offer for sale. In this part we see what supply means, how it differs from the stock a seller holds, what affects it, and the law that links it to price.',
    }),
    sl('concept', 'What supply means', {
      b: '**Supply** is the quantity of a good that sellers are **willing and able to offer for sale** at a given **price** during a given **period**.\n\nIt is a **flow**: a quantity per day, week or month at a stated price.',
      v: flow('LR', ['A price', 'A period of time', 'Quantity offered for sale'], 'Flow: supply needs a price and a period, which together give the quantity offered for sale', 'Supply needs a price and a period'),
      n: 'Supply is not the same as production or the goods lying in a godown. It is the amount sellers actually offer for sale, at a particular price, during a particular period. A statement like a weaver supplies fifty sarees means nothing until we add at what price and in how much time.',
    }),
    sl('two-column', 'Stock and supply', {
      cols: [
        '**Stock** is the **total quantity** a seller **holds** at a point of time.\n\n**Supply** is the part of the stock **offered for sale** at a price.',
        'For **perishables** (fish, flowers), supply is close to stock. For **durables** (furniture, steel), sellers can **hold back** stock when they expect better prices.',
      ],
      v: vStock,
      n: 'Stock is everything the seller has. Supply is what he puts on sale at today\'s price. A fisherman without an ice box must sell nearly all his catch today, so his supply is almost his whole stock. A woodcraft dealer can wait, so he offers only part of his stock and keeps the rest for a better price.',
    }),
    sl('check', 'Quick check: a perishable catch', {
      b: 'A Kochi fisherman with no ice box must sell before evening. His supply is most likely…',
      chk: 'm_fish_stock',
      n: 'Can he keep the fish for next week? If not, how much of his stock will he offer today?',
    }),
    sl('concept', 'Determinants of supply', {
      b: 'Besides its **own price**, supply depends on **input prices**, **technology**, **taxes and subsidies**, the **goal of the firm**, **prices of related goods** and the **number of firms**.',
      v: vDeterminants,
      n: 'Many things decide how much a firm offers. Its own price matters most. But cheaper inputs, better technology or a subsidy let it offer more at every price, while a tax or dearer inputs make it offer less. A firm chasing market share offers more than one chasing only profit, and more firms mean more market supply.',
    }),
    sl('diagram', 'The supply function', {
      b: '**Sx = f(Px, Pf, T, Tx, G, Pr, N)**',
      v: vFunction,
      n: 'We can write all of this as a supply function. The quantity of X supplied depends on its own price, the prices of factors, technology, taxes, the goal of the firm, prices of related goods and the number of firms. When we draw a supply curve, we let only the own price change and hold the rest constant.',
    }),
    sl('example', 'Worked example 1: a dairy\'s choices', {
      b: 'A dairy cooperative in an imagined Anand village can make paneer or ghee. Predict its supply of paneer when (i) ghee becomes dearer, (ii) fodder becomes cheaper.',
      bl: ['Step 1 — Is the change in paneer\'s own price? No, so the curve shifts.', 'Step 2 — Ghee competes for the same milk: paneer supply decreases.', 'Step 3 — Cheaper fodder lowers cost: paneer supply increases.'],
      v: table(['Change', 'Determinant', 'Paneer supply'], [['Ghee price rises', 'Price of a related good', 'Decreases (shift left)'], ['Fodder price falls', 'Price of an input', 'Increases (shift right)']], 'Worked example table for an imagined Anand dairy: a rise in the ghee price decreases paneer supply because ghee competes for the same milk, while cheaper fodder increases paneer supply because it lowers cost'),
      n: 'Ask first whether the paneer price itself has changed. It has not, so the whole supply curve will move. Ghee uses the same milk, so when ghee pays better, milk moves to ghee and paneer supply falls. Cheaper fodder lowers the cost of milk, so the dairy can offer more paneer at every price.',
    }),
    sl('concept', 'The law of supply', {
      b: 'Other things remaining the same, the **quantity supplied rises when the price rises** and **falls when the price falls**.\n\nThe supply curve therefore **slopes upward** from left to right.',
      v: vExtension,
      n: 'The law of supply says price and quantity supplied move in the same direction, other things constant. A higher price makes extra output worth producing, even though the extra units cost more to make. So the supply curve slopes upward. Here the weaver offers forty sarees at five hundred rupees and fifty-two at six hundred.',
    }),
    sl('check', 'Quick check: more bakeries', {
      b: 'Twelve new bakeries open in a Mysuru town. Market supply of bread will…',
      chk: 'm_more_firms',
      n: 'Market supply adds up all sellers. What happens to the total when there are more sellers?',
    }),
    sl('diagram', 'Market supply: add across', {
      b: 'At each price, **add the quantities** of all firms: the **horizontal sum**.',
      v: vSchedule,
      n: 'The market supply schedule adds the quantities of all firms at the same price. At three hundred rupees a packet the three knitting units offer thirty, twenty-five and twenty packets, so the market offers seventy-five. Notice that one unit offers nothing at the lowest price, because that price does not cover its cost.',
    }),
    sl('example', 'Worked example 2: drawing the market curve', {
      b: 'Use the three imagined Ludhiana units to draw the market supply curve.',
      bl: ['Step 1 — Draw each unit\'s supply line.', 'Step 2 — At each price, add the quantities across.', 'Step 3 — Join the totals: the market curve lies to the right.'],
      v: vMarket,
      n: 'On the diagram, take any price, say three hundred rupees. Read off thirty, twenty-five and twenty packets from the three units and add them to get seventy-five. Do this at every price and join the points. The market curve lies to the right of each unit\'s line and also slopes upward.',
    }),
    sl('check', 'Quick check: adding prices?', {
      b: 'True or false: market supply adds the prices at which firms supply a given quantity.',
      chk: 'tf_market_vertical',
      n: 'Remember which way we add: across, at each price, or up, at each quantity?',
    }),
    sl('diagram', 'An exception: the supply of labour', {
      v: vLabour,
      n: 'The law of supply has exceptions. Labour is one. As the wage rises, a worker first offers more hours. But beyond a high wage, she may prefer more leisure to more income, so she works fewer hours. Her supply curve of labour bends backward. Here, above four hundred rupees an hour, the translator works less.',
    }),
    sl('concept', 'Other exceptions to the law of supply', {
      v: vExceptions,
      n: 'Rare goods such as old coins cannot be increased, however high the price. A farmer cannot raise this season\'s crop once it is sown. And a trader who expects prices to rise next month may sell less now, even if the current price has gone up. In each case quantity supplied does not rise with price.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Supply is the quantity offered for sale at a price in a period, and it can never exceed the stock. It depends on the own price and on many other factors. The law of supply says price and quantity supplied move together. Market supply is the horizontal sum of firms\' supplies, and there are some exceptions.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define supply with **price** and **period**; contrast it with **stock** using a perishable and a durable example.',
        'Write the supply function in symbols before explaining determinants.',
        'For each determinant, state the **direction** (increase or decrease) and the **reason** (cost or reward).',
        'Market supply: **add quantities at each price**; never add prices.',
        'Exceptions: give the reason why quantity does not rise with price.',
      ],
      n: 'Examiners look for a few things. Always mention price and period when you define supply. Write the supply function in symbols. For each determinant, say which way supply moves and why, usually through cost. When you build market supply, add quantities at each price. For exceptions, explain the reason, not just the name.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Theory of Supply — Part 2: Shifts and Elasticity of Supply',
  goals: [
    'Distinguish extension and contraction from increase and decrease of supply',
    'Calculate elasticity of supply by the percentage method',
    'Identify the degree of elasticity of a straight supply line by the geometric method',
  ],
  slides: [
    sl('title', 'Theory of Supply, Part 2', {
      b: 'Part 2 — **movement along** versus **shift** of the supply curve, and **elasticity of supply**.',
      v: flow('LR', ['Movement along the curve', 'Shift of the curve', 'Elasticity of supply', 'Percentage method', 'Geometric method'], 'Route map of Part 2: movement along the curve, shift of the curve, elasticity of supply, the percentage method and the geometric method', 'Part 2 at a glance'),
      n: 'In Part 2 we separate two kinds of change in supply: moving along a supply curve and moving the whole curve. Then we ask how strongly sellers respond to price, which is the elasticity of supply, and learn to measure it by the percentage method and to read it from a diagram.',
    }),
    sl('two-column', 'Movement along versus shift', {
      cols: [
        '**Movement along the curve:** only the **own price** changes.\n\n- Higher price → **extension**\n- Lower price → **contraction**',
        '**Shift of the curve:** another **determinant** changes.\n\n- More at every price → **increase**\n- Less at every price → **decrease**',
      ],
      v: vMoveShift,
      n: 'Two changes are easily confused. If only the good\'s own price changes, the seller moves along the same curve: up is an extension, down is a contraction. If anything else changes, such as costs, taxes or technology, the whole curve moves: to the right is an increase, to the left a decrease.',
    }),
    sl('diagram', 'An extension on one curve', {
      v: vExtension,
      n: 'Here is an extension. The weaver\'s curve stays where it is. When the saree price rises from five hundred to six hundred rupees, she moves from point A to point B and offers fifty-two sarees instead of forty. Nothing but the price has changed.',
    }),
    sl('diagram', 'An increase: the curve shifts', {
      v: vShift,
      n: 'Now yarn becomes cheaper. At the same price of five hundred rupees the weaver can offer fifty-two sarees instead of forty. More is offered at every price, so the whole curve moves to the right. This is an increase in supply, caused by lower costs, not by the saree price.',
    }),
    sl('check', 'Quick check: a fall in price', {
      b: 'A fall in the price of Tiruppur cotton shirts, other things constant, leads to…',
      chk: 'm_contraction',
      n: 'Only the shirt price has changed. Is that a movement along the curve or a shift?',
    }),
    sl('concept', 'Which way will it shift?', {
      v: vShiftCauses,
      n: 'To decide the direction of a shift, ask one question. Does the change make supplying cheaper or more rewarding? Cheaper inputs, better technology, a subsidy or more firms shift supply right. Dearer inputs, a tax, a more attractive competing product or fewer firms shift it left.',
    }),
    sl('check', 'Quick check: name the leftward shift', {
      b: 'Fill in: less offered at every price because of a non-price factor is a ___ in supply.',
      chk: 'fb_decrease',
      n: 'Is the change along the curve or of the whole curve, and which way?',
    }),
    sl('concept', 'Elasticity of supply', {
      b: '**Elasticity of supply (Es)** is the degree of responsiveness of **quantity supplied** to a change in the good\'s **own price**.\n\nEs = percentage change in quantity supplied ÷ percentage change in price.',
      v: vEsSteps,
      n: 'Elasticity of supply measures how strongly sellers respond to a change in price. We compare the percentage change in quantity supplied with the percentage change in price. Because both usually move in the same direction, the coefficient is normally positive. A large value means sellers respond strongly.',
    }),
    sl('diagram', 'Three special degrees', {
      v: vDegrees,
      n: 'Three cases are special. A horizontal supply line is perfectly elastic: at the given price any quantity is offered. A vertical line is perfectly inelastic: the quantity is fixed whatever the price, like seats at one match. A straight line starting at the origin always has elasticity exactly one.',
    }),
    sl('diagram', 'The five degrees', {
      v: vDegreeTable,
      n: 'Between the extremes lie two more degrees. If quantity responds more than in proportion to price, supply is relatively elastic. If it responds less than in proportion, supply is relatively inelastic. The table gives the shape of the curve and an imagined example for each of the five degrees.',
    }),
    sl('example', 'Worked example 1: the Surat weaver', {
      b: 'Price ₹500 → ₹600; sarees 40 → 52 a week. Find Es.',
      bl: ['Step 1 — Percentage change in quantity from 40.', 'Step 2 — Percentage change in price from 500.', 'Step 3 — Divide and compare with 1.'],
      v: vSareeWork,
      n: 'Quantity rises by twelve out of forty, which is thirty per cent. Price rises by one hundred out of five hundred, which is twenty per cent. Thirty divided by twenty gives one point five. That is more than one, so the weaver\'s supply is relatively elastic.',
    }),
    sl('check', 'Quick check: mango boxes', {
      b: 'Price ₹500 → ₹600; boxes 200 → 240 a week. Supply is…',
      chk: 'm_mango_unitary',
      n: 'Work out both percentage changes from the original values and compare them.',
    }),
    sl('example', 'Worked example 2: finding the new quantity', {
      b: 'An imagined Nashik onion trader supplies 1,000 kg a day at ₹20; Es = 0.5. Find his supply at ₹24.',
      bl: ['Step 1 — Percentage rise in price.', 'Step 2 — Multiply by Es to get the percentage rise in quantity.', 'Step 3 — Add that share to 1,000 kg.'],
      v: vOnionWork,
      n: 'The price rises by four rupees out of twenty, which is twenty per cent. Elasticity is zero point five, so quantity rises by ten per cent. Ten per cent of one thousand kilograms is one hundred, so he now supplies eleven hundred kilograms a day.',
    }),
    sl('diagram', 'The geometric method', {
      b: 'Extend a straight supply line to the axes: **price axis → Es > 1**, **origin → Es = 1**, **quantity axis → Es < 1**.',
      v: vGeometric,
      n: 'For straight supply lines there is a quick geometric test. Extend the line until it meets an axis. If it meets the price axis above the origin, supply is relatively elastic. If it passes through the origin, elasticity is one. If it meets the quantity axis, supply is relatively inelastic. The slope alone does not decide it.',
    }),
    sl('check', 'Quick check: a line cutting the quantity axis', {
      b: 'A straight supply line, extended, cuts the quantity axis to the right of the origin. Supply is…',
      chk: 'm_line_qty_axis',
      n: 'Use the three-way rule for where the line meets the axes.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. A change in the own price moves the seller along the curve, while any other change shifts the curve. Elasticity of supply compares the percentage change in quantity supplied with the percentage change in price. For straight lines, where the line meets the axes tells us the degree.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the change exactly: **extension, contraction, increase or decrease**, and say whether it is a movement or a shift.',
        'Percentage method: divide by the **original** price and quantity; show both percentages.',
        'Finish a numerical by naming the **degree** of elasticity.',
        'Geometric method: **price axis → > 1**, **origin → 1**, **quantity axis → < 1**; slope alone does not decide.',
        'Draw diagrams with price on the y-axis and quantity on the x-axis, and label the curves.',
      ],
      n: 'Use exact words. Extension and contraction are movements along a curve. Increase and decrease are shifts. In numericals, divide by the original values and finish by naming the degree. For the geometric method, remember the three-way rule. Always label axes and curves on your diagrams.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Theory of Supply and Elasticity of Supply — Notes',
  sections: [
    {
      h: '1. Supply and stock',
      t: 1,
      b: '**Supply** is the quantity a seller is willing and able to **offer for sale** at a given **price** in a given **period**. **Stock** is the total quantity held at a point of time.\n\n- Supply can at most **equal** stock in the short period.\n- **Perishable** goods: supply is close to stock.\n- **Durable** goods: sellers may **hold back** stock and supply less.',
      terms: [['Supply', 'Quantity offered for sale at a given price during a given period.'], ['Stock', 'Total quantity of a good held by a seller at a point of time.']],
      v: vStock,
    },
    {
      h: '2. Determinants of supply and the supply function',
      t: 2,
      b: '**Sx = f(Px, Pf, T, Tx, G, Pr, N)**: own price, prices of factors, technology, taxes and subsidies, goal of the firm, prices of related goods, number of firms.\n\nLower costs (cheaper inputs, better technology, subsidies), a sales goal and more firms **increase** supply; higher costs, taxes and dearer competing products **decrease** it.',
      terms: [['Supply function', 'The relationship between quantity supplied and its determinants.'], ['Competing good', 'Another product that uses the same resources, such as wheat and mustard on the same land.']],
      v: vDeterminants,
      vs: [vFunction],
    },
    {
      h: '3. The law of supply and market supply',
      t: 3,
      b: '**Law of supply:** other things constant, quantity supplied **rises** with price and **falls** with it; the curve slopes **upward**, because extra output usually costs more and a higher price makes it profitable.\n\n**Market supply** is the **horizontal sum** of individual supplies: add quantities at each price.',
      terms: [['Horizontal summation', 'Adding the quantities of all sellers at each price to get market supply.']],
      v: vSchedule,
      vs: [vMarket, vExtension],
    },
    {
      h: '4. Exceptions to the law of supply',
      t: 3,
      b: '- **Labour:** beyond a high wage the supply curve **bends backward** as workers prefer leisure.\n- **Rare goods:** quantity cannot be increased.\n- **Agricultural goods:** output fixed until the next season.\n- **Expectations:** a trader expecting a price rise may **withhold** stock now.',
      terms: [['Backward-bending supply curve of labour', 'A labour supply curve that turns back at high wages, as hours worked fall.']],
      v: vLabour,
      vs: [vExceptions],
    },
    {
      h: '5. Movement along versus shift of the supply curve',
      t: 4,
      b: '| | Movement | Shift |\n|---|---|---|\n| Cause | Own price | Other determinants |\n| More | Extension | Increase |\n| Less | Contraction | Decrease |\n\nOn a diagram, a movement changes the **point** on one curve; a shift moves the **whole curve**.',
      terms: [['Extension of supply', 'More supplied at a higher own price, on the same curve.'], ['Increase in supply', 'More supplied at every price because another determinant changed.']],
      v: vMoveShift,
      vs: [vShift, vShiftCauses],
    },
    {
      h: '6. Elasticity of supply',
      t: 5,
      b: '**Es = (ΔQ ÷ Q) ÷ (ΔP ÷ P)**, using the **original** values; Es is normally positive.\n\n**Degrees:** perfectly elastic (∞, horizontal), perfectly inelastic (0, vertical), unitary (1), relatively elastic (> 1), relatively inelastic (< 1).\n\n**Geometric method** for straight lines: meets the **price axis** → Es > 1; passes through the **origin** → Es = 1; meets the **quantity axis** → Es < 1.',
      terms: [['Elasticity of supply', 'Responsiveness of quantity supplied to a change in the good\'s own price.'], ['Unitary elastic supply', 'Quantity supplied changes in the same proportion as price.']],
      v: vDegreeTable,
      vs: [vSareeWork, vGeometric, vDegrees],
    },
  ],
  tips: '**Common mistakes**\n- Defining supply without a price and a period, or treating it as the same as stock.\n- Calling a change caused by the own price a shift, or a change caused by costs an extension.\n- Adding prices instead of quantities when deriving market supply.\n- Dividing by the new values instead of the original ones in the percentage method.\n- Judging elasticity of a straight supply line by its slope instead of where it meets the axes.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: definition with an example, or formula and answer.\n- 3 marks: working, answer and the degree, or three explained points.\n- 5 marks: parts answered in order, with described diagrams and reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Supply**', 'Quantity offered for sale at a given **price** during a given **period**.', 'definition', 1],
  ['**Stock**', 'Total quantity a seller holds at a point of time.', 'definition', 1],
  ['Supply and stock: perishables', 'Supply is close to stock: fish must be sold the same day.', 'example', 1],
  ['Supply and stock: durables', 'Supply may be well below stock: sellers hold back for better prices.', 'example', 1],
  ['Can supply exceed stock?', '**No**, not within the short period.', 'fact', 1],
  ['**Supply function**', 'Sx = f(Px, Pf, T, Tx, G, Pr, N).', 'formula', 2],
  ['Cheaper inputs', 'Lower cost → **increase** in supply (shift right).', 'concept', 2],
  ['A per-unit tax', 'Raises cost → **decrease** in supply (shift left).', 'concept', 2],
  ['Better technology', 'Lower cost per unit → **increase** in supply.', 'concept', 2],
  ['Competing good becomes dearer', 'Resources move to it → **decrease** in supply of our good.', 'concept', 2],
  ['Goal of sales, not profit', 'The firm offers **more** at each price.', 'concept', 2],
  ['**Law of supply**', 'Other things constant, quantity supplied **rises with price**.', 'definition', 3],
  ['Why the supply curve slopes up', 'Extra output costs more; a higher price makes it **profitable**.', 'concept', 3],
  ['**Market supply**', '**Horizontal sum**: add quantities of all firms at each price.', 'definition', 3],
  ['Ludhiana units at ₹300', `30 + 25 + 20 = **${HOSE_MKT[2]}** packets.`, 'example', 3],
  ['Backward-bending supply of labour', 'Beyond a high wage, workers prefer **leisure** and work fewer hours.', 'concept', 3],
  ['Rare goods', 'Supply **fixed** however high the price: a vertical curve.', 'example', 3],
  ['**Extension** of supply', 'More at a **higher own price**: movement **up** the same curve.', 'definition', 4],
  ['**Contraction** of supply', 'Less at a **lower own price**: movement **down** the same curve.', 'definition', 4],
  ['**Increase** in supply', 'More at **every price**: curve shifts **right**.', 'definition', 4],
  ['**Decrease** in supply', 'Less at **every price**: curve shifts **left**.', 'definition', 4],
  ['**Elasticity of supply**', 'Es = (ΔQ ÷ Q) ÷ (ΔP ÷ P), with original values.', 'formula', 5],
  ['Surat weaver: ₹500 → ₹600, 40 → 52', `Es = 30 ÷ 20 = **${SAREE_ES}**, relatively elastic.`, 'example', 5],
  ['Perfectly inelastic supply', 'Es = 0; a **vertical** supply curve.', 'definition', 5],
  ['Perfectly elastic supply', 'Es = ∞; a **horizontal** supply curve.', 'definition', 5],
  ['Straight line from the origin', 'Es = **1** at every point, whatever its slope.', 'fact', 5],
  ['Straight line meeting the price axis', 'Es **> 1** (relatively elastic).', 'fact', 5],
  ['Straight line meeting the quantity axis', 'Es **< 1** (relatively inelastic).', 'fact', 5],
  ['Finding a new quantity', 'Percentage change in quantity = Es × percentage change in price.', 'formula', 5],
  ['Onion trader: Es 0.5, ₹20 → ₹24', `Supply 1,000 → **${ONION_Q1.toLocaleString('en-IN')}** kg.`, 'example', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Theory of Supply and Elasticity of Supply',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_supply_meaning', 'm_input_cost', 'm_extension', 'm_es_vertical', 'ar_labour_bend'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_stock_supply', { attempt: 1, keys: ['s_tax_subsidy', 's_ext_vs_inc'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_market_table', { attempt: 1, keys: ['s3_es_calc', 's3_three_decrease'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_es_numericals'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Theory of Supply and Elasticity of Supply',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_wood_held', 'm_new_tech', 'm_excise', 'm_related_crop', 'm_law_supply', 'm_backward_labour', 'm_increase_cause', 'm_rightward_read', 'm_line_origin', 'm_line_price_axis', 'ar_movement_price', 'ar_origin_lines'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_supply_function', 's_market_curve', { attempt: 1, keys: ['s_labour_bend', 's_geometric'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_perishable_durable', 's3_goals_related', 's3_exceptions_three', { attempt: 1, keys: ['s3_diag_movement_shift', 's3_three_lines'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with described diagrams.', items: ['l_law_market', { attempt: 1, keys: ['l_movement_shift', 'l_determinants'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch05 only (supply and stock; determinants and the supply function; law of supply, market supply and exceptions; movement versus shift; elasticity of supply by the percentage and geometric methods)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs including tables, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every seller, firm, town, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused (the specimen\'s wheat-trader storage item is not used)',
    data: `figures computed in questions.mjs and asserted: saree Es ${SAREE_ES} on Q = 0.12P − 20 and the shifted Q = 0.12P − 8; onion supply ${ONION.q0} → ${ONION_Q1} kg; mango Es ${MANGO_ES}; brass Es ${BRASS_ES}; tea Es ${TEA_ES}; belt price, pump Es; Ludhiana market supply ${HOSE_MKT.join(', ')}; SVG curves drawn from their equations with points asserted`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
