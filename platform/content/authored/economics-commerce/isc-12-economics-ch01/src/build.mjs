// Build ISC 12 Economics ch01 Theory of Demand. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch01/src/build.mjs
// This chapter's src/lib.mjs is the shared ISC 12 Economics lib; later chapters import it from here.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-economics-ch01', 'economics-commerce');
const { mangoQ, MANGO_ROWS, qA, qB, qMkt, CHIPS_ROWS, SAMOSA, samosaMkt, bagQ } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures (price on the y-axis, quantity on the x-axis)
function frame(xMax, yMax, xLabel = 'Quantity demanded', yLabel = 'Price (₹)') {
  const s = new Svg(480, 380);
  const c = s.chart({ x1: xMax, y1: yMax, left: 70, top: 34, width: 330, height: 280, xLabel, yLabel });
  return { s, c };
}

// Riya's mango demand: Q = 7 − P/20, so P = 20(7 − Q).
const vMango = (() => {
  const { s, c } = frame(7, 160, 'Mangoes (kg a week)', 'Price (₹ per kg)');
  const P = (q) => 20 * (7 - q);
  c.fn(P, 0.5, 6, { color: 'accent', sw: 2.6 });
  for (const [p, q] of MANGO_ROWS) { assert(P(q) === p, 'mango point'); c.dot([q, p], 'accent'); }
  c.label([6, P(6)], 'DD', { anchor: 'start', dx: 8, dy: -6, size: 13, color: 'accent', bold: true });
  for (const [p, q] of MANGO_ROWS) c.xTick(q, String(q));
  for (const p of [40, 80, 120]) c.yTick(p, String(p));
  c.drop([3, 80]);
  return s.visual(
    'Downward-sloping demand curve DD for Riya\'s mangoes, drawn from her schedule: 1 kg at 120 rupees, 2 at 100, 3 at 80, 4 at 60 and 5 at 40 rupees per kg; the point at 80 rupees and 3 kg is marked with dashed guide lines',
    'Imagined schedule: Q = 7 − P/20. Each fall in price is matched by a larger purchase.',
  );
})();

// Kochi banana chips: A from (0, 80) to (8, 0); B from (0, 120) to (6, 0); market kinked at (2, 80).
const vMarket = (() => {
  const { s, c } = frame(15, 135, 'Packets a week', 'Price (₹ per packet)');
  c.fn((q) => 80 - 10 * q, 0, 8, { color: 'muted', sw: 2 });
  c.fn((q) => 120 - 20 * q, 0, 6, { color: 'blue', sw: 2 });
  c.seg([0, 120], [2, 80], { color: 'accent', sw: 3 });
  c.seg([2, 80], [14, 0], { color: 'accent', sw: 3 });
  assert(qMkt(80) === 2 && qA(80) === 0 && qB(80) === 2, 'kink');
  c.dot([2, 80], 'accent').label([2, 80], 'kink at ₹80', { anchor: 'start', dx: 10, dy: -10, size: 12 });
  c.label([7.2, 8], 'A', { anchor: 'start', dx: 4, dy: -14, size: 13, muted: true, bold: true });
  c.label([1.6, 88], 'B', { anchor: 'end', dx: -18, dy: 2, size: 13, color: 'blue', bold: true });
  c.label([11, 20], 'Market = A + B', { anchor: 'start', dx: 6, dy: -16, size: 13, color: 'accent', bold: true });
  c.dot([qMkt(40), 40], 'accent').label([qMkt(40), 40], `${qA(40)} + ${qB(40)} = ${qMkt(40)} at ₹40`, { anchor: 'start', dx: 10, dy: 2, size: 12 });
  for (const q of [2, 8, 14]) c.xTick(q, String(q));
  for (const p of [40, 80, 120]) c.yTick(p, String(p));
  return s.visual(
    `Two individual demand curves for banana chips and their horizontal sum. Household A buys nothing at 80 rupees or more; household B buys nothing at 120 rupees. The market curve follows B above 80 rupees and becomes flatter below it, with a kink at 80 rupees and 2 packets; at 40 rupees the market buys ${qA(40)} plus ${qB(40)}, that is ${qMkt(40)} packets`,
    'Imagined Kochi households: A: Q = 8 − 0.1P, B: Q = 6 − 0.05P. Quantities are added at each price.',
  );
})();

// Movement along one curve: D: P = 50 − 5Q; A (4, 30), B (6, 20).
const vMovement = (() => {
  const { s, c } = frame(10, 55, 'Quantity demanded', 'Price (₹)');
  c.fn((q) => 50 - 5 * q, 1, 9, { color: 'accent', sw: 2.6 });
  c.dot([4, 30], 'accent').dot([6, 20], 'accent');
  c.drop([4, 30]).drop([6, 20]);
  c.label([4, 30], 'A', { dx: 10, dy: -12, bold: true }).label([6, 20], 'B', { dx: 10, dy: -12, bold: true });
  c.label([9, 5], 'D', { anchor: 'start', dx: 6, dy: -8, size: 13, color: 'accent', bold: true });
  c.label([5, 36], 'A to B: extension (price falls)', { anchor: 'start', size: 12 });
  c.label([5, 31], 'B to A: contraction (price rises)', { anchor: 'start', size: 12 });
  c.xTick(4, '4').xTick(6, '6').yTick(30, '30').yTick(20, '20');
  return s.visual(
    'One demand curve D with two points: A at price 30 and quantity 4, B at price 20 and quantity 6. Moving from A to B down the curve is an extension of demand; moving from B to A up the curve is a contraction',
    'Only the good\'s own price changes, so the buyer moves along the same curve.',
  );
})();

// Shifts at an unchanged price of 25: D₀ (decrease) gives 3, D₁ gives 5, D₂ (increase) gives 7.
const vShift = (() => {
  const { s, c } = frame(12, 55, 'Quantity demanded', 'Price (₹)');
  const D = (k) => (q) => 50 - 5 * (q - k);
  c.fn(D(-2), 0, 8, { color: 'muted', sw: 2, dash: true });
  c.fn(D(0), 1, 10, { sw: 2.4 });
  c.fn(D(2), 3, 12, { color: 'accent', sw: 2.6 });
  for (const [k, q] of [[-2, 3], [0, 5], [2, 7]]) { assert(D(k)(q) === 25, 'shift points'); c.dot([q, 25], k === 2 ? 'accent' : undefined); c.xTick(q, String(q)); }
  c.seg([0, 25], [7, 25], { color: 'muted', dash: true, sw: 1.2 });
  c.yTick(25, '25');
  c.label([8, 0], 'D₀', { anchor: 'start', dx: 6, dy: -12, size: 13, muted: true, bold: true });
  c.label([10, 0], 'D₁', { anchor: 'start', dx: 6, dy: -12, size: 13, bold: true });
  c.label([12, 0], 'D₂', { anchor: 'end', dx: -4, dy: -26, size: 13, color: 'accent', bold: true });
  c.label([7.6, 44], 'D₁ to D₂: increase', { anchor: 'start', size: 12, color: 'accent' });
  c.label([7.6, 39], 'D₁ to D₀: decrease', { anchor: 'start', size: 12, muted: true });
  return s.visual(
    'Three parallel demand curves. At an unchanged price of 25, the original curve D1 gives a quantity of 5; after an increase in demand the curve D2 to the right gives 7; after a decrease the curve D0 to the left gives 3',
    'A change in income, tastes, related prices or expectations shifts the whole curve.',
  );
})();

// Exception: an upward-sloping demand curve, P = 5 + 5Q.
const vUpward = (() => {
  const { s, c } = frame(9, 55, 'Quantity demanded', 'Price (₹)');
  c.fn((q) => 5 + 5 * q, 1, 8.5, { color: 'red', sw: 2.6 });
  c.dot([3, 20], 'red').dot([6, 35], 'red');
  c.drop([3, 20]).drop([6, 35]);
  c.xTick(3, '3').xTick(6, '6').yTick(20, '20').yTick(35, '35');
  c.label([8.5, 47.5], 'DD (exception)', { anchor: 'end', dx: -10, dy: -10, size: 13, color: 'red', bold: true });
  c.label([3.6, 12], 'higher price, more bought', { anchor: 'start', size: 12 });
  return s.visual(
    'An exceptional demand curve sloping upward: at a price of 20 the quantity is 3 and at a price of 35 the quantity is 6, so more is bought at the higher price, as with Giffen or prestige goods',
    'Schematic, imagined figures: an exception to the Law of Demand.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vTypes = table(
  ['Kind of demand', 'Meaning', 'Imagined Indian example'],
  [
    ['Individual', 'Quantity one buyer wants at each price', 'One family\'s weekly milk purchase in Ludhiana'],
    ['Market', 'Total of all buyers\' quantities at each price', 'All milk bought in the town at ₹56 a litre'],
    ['Joint', 'Two goods wanted together for one use', 'Gas stove and LPG cylinder'],
    ['Composite', 'One good wanted for several uses', 'Sugarcane for sugar, jaggery and ethanol'],
    ['Derived', 'A good or factor wanted for what it helps make', 'Masons wanted because flats are wanted'],
  ],
  'Table of five kinds of demand: individual, market, joint, composite and derived, each with its meaning and an imagined Indian example such as a gas stove with a cylinder for joint demand',
);
const vDeterminants = table(
  ['Determinant (symbol)', 'Change', 'Effect on demand for X'],
  [
    ['Price of a substitute (Py)', 'Rises', 'Increases'],
    ['Price of a complement (Py)', 'Rises', 'Decreases'],
    ['Income (Y), normal good', 'Rises', 'Increases'],
    ['Income (Y), inferior good', 'Rises', 'Decreases'],
    ['Tastes (T)', 'Turn in favour', 'Increases'],
    ['Expected future price (E)', 'Expected to rise', 'Increases now'],
  ],
  'Table of the non-price determinants in the demand function: a rise in the price of a substitute increases demand, of a complement decreases it; a rise in income increases demand for a normal good and decreases it for an inferior good; favourable tastes and an expected price rise increase demand',
  'Dx = f(Px, Py, Y, T, E): Px moves the buyer along the curve; every other term shifts it.',
);
const vBagExample = table(
  ['Situation', 'Working', 'Quantity (bags)', 'Change shown as'],
  [
    ['Start: P = 10, Y = 600', '500 − 200 + 300', String(bagQ(10, 600)), '—'],
    ['Price rises to 12', '500 − 240 + 300', String(bagQ(12, 600)), 'Contraction (movement up)'],
    ['Income rises to 700', '500 − 200 + 350', String(bagQ(10, 700)), 'Increase (shift right)'],
  ],
  `Worked example table for the imagined demand function Q = 500 − 20P + 0.5Y: at P 10 and Y 600 the quantity is ${bagQ(10, 600)} bags; at P 12 it falls to ${bagQ(12, 600)}, a contraction; at Y 700 it rises to ${bagQ(10, 700)}, an increase`,
  'Imagined school-bag market in Indore; P and Y in ₹ hundred.',
);
const vAssumptions = table(
  ['Held constant (ceteris paribus)', 'Why it matters'],
  [
    ['Income of the consumer', 'A change in income would shift the curve'],
    ['Tastes and preferences', 'A new fashion would change demand at every price'],
    ['Prices of related goods', 'Substitutes and complements change demand'],
    ['Expectations of future prices', 'Expected rises make people buy now'],
    ['Size of the population', 'More buyers raise market demand'],
  ],
  'Table of the assumptions of the Law of Demand: income, tastes, prices of related goods, expectations and population are held constant, each with the reason it matters',
);
const vReasons = flow(
  'TB',
  ['Price of the good falls', 'Substitution effect: it is cheaper than its substitutes', 'Income effect: real income rises', 'Diminishing marginal utility and new buyers', 'More is demanded: the curve slopes downward'],
  'Flow showing the reasons for the downward slope: a fall in price works through the substitution effect, the income effect, diminishing marginal utility and new buyers, so more is demanded',
  'Why the demand curve slopes downward',
);
const vEffects = table(
  ['Effect', 'What changes', 'Imagined example (price of guavas falls)'],
  [
    ['Substitution effect', 'Relative price of the good', 'Guavas replace some apples in the fruit basket'],
    ['Income effect', 'Real income (purchasing power)', 'The same budget now buys more fruit'],
  ],
  'Two-row table contrasting the substitution effect, which works through the relative price, and the income effect, which works through real income, with a guava example',
);
const vSamosa = table(
  ['Price (₹)', 'Asha', 'Bilal', 'Charu', 'Market'],
  SAMOSA.prices.map((p, i) => [String(p), String(SAMOSA.a[i]), String(SAMOSA.b[i]), String(SAMOSA.c[i]), String(samosaMkt[i])]),
  `Worked example: three students\' daily samosa demand and the market total at each price: ${SAMOSA.prices.map((p, i) => `${samosaMkt[i]} at ${p} rupees`).join(', ')}`,
  'Imagined Nagpur college canteen. Market = sum across each row.',
);
const vMoveShift = table(
  ['', 'Movement along the curve', 'Shift of the curve'],
  [
    ['Cause', 'Own price of the good', 'Income, tastes, related prices, expectations'],
    ['Names', 'Extension (price falls), contraction (price rises)', 'Increase (right), decrease (left)'],
    ['Number of curves', 'One', 'Two (old and new)'],
  ],
  'Table contrasting a movement along the demand curve, caused by the own price and called extension or contraction on one curve, with a shift of the curve, caused by other determinants and called increase or decrease',
);
const vClassifyEvents = table(
  ['Imagined event (Bengaluru juice market)', 'Cause', 'Change'],
  [
    ['Juice price cut by the shop', 'Own price', 'Extension'],
    ['A heatwave', 'Tastes / seasonal need', 'Increase'],
    ['Juice price raised', 'Own price', 'Contraction'],
    ['A cheaper soft drink launched', 'Price of a substitute', 'Decrease'],
  ],
  'Worked example table classifying four events in a juice market: a price cut is an extension, a heatwave an increase, a price rise a contraction, and a cheaper substitute a decrease',
);
const vExceptions = table(
  ['Exception', 'Why more is bought at a higher price', 'Imagined example'],
  [
    ['Giffen good', 'Strong negative income effect on an inferior staple', 'Poorest families and a cheap staple grain'],
    ['Veblen good', 'Status: a higher price raises its appeal', 'Designer watches in Mumbai'],
    ['Expectations', 'Buyers expect the price to rise further', 'Gold before a predicted price jump'],
    ['Emergencies', 'Essentials bought whatever the price', 'Candles and water before a flood'],
  ],
  'Table of four exceptions to the Law of Demand: Giffen goods, Veblen goods, expectations of a further price rise and emergencies, with the reason and an imagined example of each',
);
const vGiffenVeblen = table(
  ['', 'Giffen good', 'Veblen good'],
  [
    ['Who buys it', 'Very poor households', 'Rich households'],
    ['Kind of good', 'Inferior necessity', 'Luxury status good'],
    ['Reason', 'Income effect outweighs substitution effect', 'Higher price signals status'],
  ],
  'Comparison table of Giffen and Veblen goods: buyers, kind of good and the reason the demand curve can slope upward',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Demand', 'Desire + ability + willingness, at a price, over a period'],
    ['Kinds', 'Individual, market, joint, composite, derived'],
    ['Demand function', 'Dx = f(Px, Py, Y, T, E)'],
    ['Law of Demand', 'Inverse price–quantity relation, ceteris paribus'],
    ['Slope', 'Substitution, income, diminishing MU, new buyers'],
  ],
  'Summary table of Part 1: meaning and kinds of demand, the demand function, the Law of Demand and the reasons for its downward slope',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Market demand', 'Horizontal sum of individual quantities'],
    ['Movement', 'Own price changes: extension or contraction'],
    ['Shift', 'Other determinants: increase or decrease'],
    ['Exceptions', 'Giffen, Veblen, expectations, emergencies'],
  ],
  'Summary table of Part 2: market demand by horizontal summation, movements and shifts, and the exceptions to the Law of Demand',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Theory of Demand — Part 1: Meaning, Determinants and the Law of Demand',
  goals: [
    'Distinguish demand from desire and classify individual, market, joint, composite and derived demand',
    'Write the demand function and explain the effect of each determinant',
    'State the Law of Demand with its assumptions and draw a demand curve from a schedule',
    'Explain why the demand curve slopes downward',
  ],
  slides: [
    sl('title', 'Theory of Demand', {
      b: 'Part 1 — what demand means, its **kinds**, its **determinants** and the **Law of Demand**.',
      v: flow('LR', ['Meaning of demand', 'Kinds of demand', 'Determinants', 'Law of Demand', 'Why the curve slopes down'], 'Route map of Part 1: meaning of demand, kinds of demand, determinants, the Law of Demand, and why the curve slopes down', 'Part 1 at a glance'),
      n: 'Every market you visit, from a vegetable cart to an online store, runs on two forces, demand and supply. In this chapter we study the buyer\'s side. We will see what economists mean by demand, the different kinds of demand, what decides how much people buy, and the most famous rule in microeconomics, the Law of Demand.',
    }),
    sl('concept', 'Demand is more than a wish', {
      b: 'In economics, **demand** is the quantity of a good that buyers are **willing and able** to buy at a **given price** during a **period of time**.',
      v: flow('LR', ['Desire (a wish)', 'Ability to pay', 'Willingness to spend', 'At a price, in a period', 'Demand'], 'Flow from desire through ability to pay and willingness to spend, stated at a price and over a period, to demand', 'Three elements plus price and time'),
      n: 'Wanting something is not enough. A student may wish for an expensive laptop, but unless she can pay for it and is willing to spend that money, there is no demand in the economic sense. Demand also needs a price and a time period: we say how many kilograms a family buys at forty rupees a kilogram in a week, not just how many it buys.',
    }),
    sl('diagram', 'Kinds of demand', {
      v: vTypes,
      n: 'Economists classify demand in several ways. Individual demand is one buyer, market demand is the total for all buyers. Joint demand is for goods used together, like a stove and a gas cylinder. Composite demand is one good with many uses, like sugarcane. Derived demand arises because another product is wanted, like masons for new flats.',
    }),
    sl('check', 'Quick check: which kind of demand?', {
      b: 'Milk is used for tea, curd, paneer and sweets. Which kind of demand is this?',
      chk: 'm_milk_uses',
      n: 'Ask yourself: is it one good with several uses, two goods used together, or a good wanted for what it helps to make?',
    }),
    sl('diagram', 'What decides demand? The demand function', {
      b: 'Dx = f(Px, Py, Y, T, E)',
      v: vDeterminants,
      n: 'Many things decide how much of a good a household buys. Economists write them as a demand function: the demand for good X depends on its own price, the prices of related goods, income, tastes and expectations. A dearer substitute raises demand, a dearer complement lowers it, and higher income raises demand for normal goods but lowers it for inferior goods.',
    }),
    sl('two-column', 'Related goods and income', {
      cols: [
        '**Substitutes** can replace each other: tea and coffee, ragi and jowar flour. A dearer one raises demand for the other.\n\n**Complements** are used together: cars and petrol, bats and balls. A dearer one lowers demand for the other.',
        '**Normal goods:** demand rises with income (branded shoes, fine rice).\n\n**Inferior goods:** demand falls as income rises, because buyers move to better options (coarse broken rice for some families).',
      ],
      v: table(['Pair', 'Relationship'], [['Tea and coffee', 'Substitutes'], ['Printer and ink', 'Complements'], ['Fine rice (most families)', 'Normal good']], 'Small table: tea and coffee are substitutes, printer and ink are complements, fine rice is a normal good for most families'),
      n: 'Two relationships between goods matter. Substitutes compete with each other, so when one becomes dearer people switch to the other. Complements go together, so when one becomes dearer people buy less of both. Income matters too. For most goods demand rises with income, but for some inferior goods it falls, because better-off families switch to better options.',
    }),
    sl('example', 'Worked example 1: using a demand function', {
      b: 'Imagined school bags, Indore: Q = 500 − 20P + 0.5Y (P and Y in ₹ hundred).',
      bl: ['Step 1 — Substitute P = 10 and Y = 600 to get the starting quantity.', 'Step 2 — Change only P: the answer moves along the curve.', 'Step 3 — Change only Y: the whole curve shifts.'],
      v: vBagExample,
      n: 'Let us use a demand function. Start with a price of ten and an income of six hundred: the quantity is six hundred bags. If the price rises to twelve, quantity falls to five hundred and sixty, a movement up the same curve. If instead income rises to seven hundred, quantity rises to six hundred and fifty at the old price, so the whole curve has shifted.',
    }),
    sl('check', 'Quick check: reading the function', {
      b: 'In Dx = f(Px, Py, Y, T, E), what does T stand for?',
      chk: 'm_func_symbol',
      n: 'Recall the five letters: own price, related prices, income, tastes and expectations.',
    }),
    sl('concept', 'The Law of Demand', {
      b: 'Other things remaining the same (**ceteris paribus**), the quantity demanded of a good **rises when its price falls** and **falls when its price rises**.',
      v: vAssumptions,
      n: 'Now the central rule. The Law of Demand says that, other things remaining the same, price and quantity demanded move in opposite directions. The phrase other things remaining the same is vital. Income, tastes, related prices, expectations and population must stay fixed, otherwise the curve itself would move and we could not see the effect of price alone.',
    }),
    sl('diagram', 'From schedule to curve', {
      v: vMango,
      n: 'Here is Riya\'s weekly demand for mangoes, an imagined schedule. At one hundred and twenty rupees a kilogram she buys one kilogram; at forty rupees she buys five. Plotting each pair, with quantity across and price up, gives a curve that slopes downward from left to right. Every point on it answers one question: at this price, how much does she buy?',
    }),
    sl('example', 'Worked example 2: drawing Riya\'s demand curve', {
      b: 'Schedule: ₹120 → 1 kg, ₹100 → 2 kg, ₹80 → 3 kg, ₹60 → 4 kg, ₹40 → 5 kg.',
      bl: ['Step 1 — Quantity on the x-axis, price on the y-axis.', 'Step 2 — Plot the five pairs.', 'Step 3 — Join them: a downward-sloping straight line, Q = 7 − P/20.', 'Step 4 — Label it DD and name the law it shows.'],
      v: table(['Price (₹ per kg)', 'Quantity (kg)'], MANGO_ROWS.map(([p, q]) => [String(p), String(q)]), 'Riya\'s imagined mango schedule: 1 kg at 120 rupees, 2 at 100, 3 at 80, 4 at 60 and 5 at 40'),
      n: 'Examiners often give a schedule and ask for the curve. Put quantity on the horizontal axis and price on the vertical axis, plot each pair, and join them. Riya\'s points lie on a straight line, because every twenty-rupee fall adds one kilogram. Label the curve and say which law it illustrates. Neat labels on both axes carry marks.',
    }),
    sl('diagram', 'Why does the curve slope downward?', {
      v: vReasons,
      n: 'Why do people buy more when the price falls? First, the substitution effect: the good is now cheaper than its substitutes. Second, the income effect: the same money buys more, so real income rises. Third, diminishing marginal utility: extra units are worth less, so people buy them only at a lower price. Fourth, new buyers who could not afford it before now enter the market.',
    }),
    sl('check', 'Quick check: which effect?', {
      b: 'Guavas become cheaper while apples cost the same, and a family buys more guavas and fewer apples. Which effect is this?',
      chk: 'm_subst_effect',
      n: 'Is it about the relative price of two goods, or about how far the family\'s money now goes?',
    }),
    sl('diagram', 'Income effect versus substitution effect', {
      v: vEffects,
      n: 'These two effects are easy to mix up. The substitution effect works through relative prices: guavas replace apples because they are cheaper by comparison. The income effect works through purchasing power: the same budget now stretches further. For normal goods both push in the same direction, which is why the demand curve slopes downward so reliably.',
    }),
    sl('check', 'Quick check: reading the schedule', {
      b: 'Using Riya\'s schedule, by how many kilograms does her purchase rise when the price falls from ₹100 to ₹60?',
      chk: 'num_mango_change',
      n: 'Read the two quantities from the schedule and subtract.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Demand is desire backed by ability and willingness to pay, at a price and over a period. It can be individual, market, joint, composite or derived. Its determinants are written as a demand function. The Law of Demand states an inverse relation between price and quantity demanded, other things equal, and four reasons explain the downward slope.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always write "other things remaining the same" when stating the law.',
        'Put **quantity on the x-axis** and **price on the y-axis**; label the curve DD.',
        'Classify related goods first (substitute or complement), then predict the direction.',
        'For inferior goods a higher income **lowers** demand; do not assume all goods are normal.',
        '2 marks: two clear points; 3 marks: three points or a point with a diagram; 5 marks: parts answered in order.',
      ],
      n: 'A few habits earn marks in this chapter. Always state the law with the phrase other things remaining the same. Put quantity on the horizontal axis and price on the vertical axis, and label every curve. Decide whether goods are substitutes or complements before predicting a change. And remember that inferior goods behave differently when income rises.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Theory of Demand — Part 2: Market Demand, Movements and Shifts, and Exceptions',
  goals: [
    'Derive a market demand schedule and curve by horizontal summation',
    'Distinguish extension and contraction from increase and decrease in demand, with diagrams',
    'Predict the shift of the demand curve for a given change in income, tastes or related prices',
    'Explain why the demand curve may slope upward for Giffen and prestige goods',
  ],
  slides: [
    sl('title', 'Theory of Demand — Part 2', {
      b: 'Part 2 — **market demand**, **movements versus shifts**, and **exceptions** to the law.',
      v: flow('LR', ['Market demand', 'Movement along the curve', 'Shift of the curve', 'Exceptions'], 'Route map of Part 2: market demand, movement along the curve, shift of the curve, and exceptions to the law', 'Part 2 at a glance'),
      n: 'In Part 2 we build the market demand curve from individual buyers, learn the most tested distinction in this chapter, between moving along a demand curve and shifting it, and finally meet the cases where people buy more of a good at a higher price.',
    }),
    sl('concept', 'Market demand: add quantities at each price', {
      b: 'Market demand at a price = **sum of the quantities** all buyers want at that price (**horizontal summation**).',
      v: vSamosa,
      n: 'A market is many buyers. To get market demand, take one price at a time, read what each buyer wants at that price, and add the quantities. In this imagined canteen, at ten rupees Asha wants five samosas, Bilal four and Charu six, so the market wants fifteen. Repeating this at every price gives the market schedule.',
    }),
    sl('diagram', 'The market demand curve', {
      v: vMarket,
      n: 'Graphically, we add the individual curves sideways, which is why it is called horizontal summation. In this imagined Kochi example, household A stops buying at eighty rupees, so above that price the market curve is the same as household B\'s. Below eighty both households buy, the market curve becomes flatter, and there is a kink at eighty rupees.',
    }),
    sl('example', 'Worked example 3: building a market schedule', {
      b: 'Add across each row of the canteen schedules.',
      bl: [`₹10: 5 + 4 + 6 = ${samosaMkt[0]}`, `₹15: 4 + 3 + 4 = ${samosaMkt[1]}`, `₹20: 3 + 2 + 3 = ${samosaMkt[2]}`, `₹25: 2 + 1 + 1 = ${samosaMkt[3]}`],
      v: table(['Price (₹)', 'Market quantity'], SAMOSA.prices.map((p, i) => [String(p), String(samosaMkt[i])]), `Market samosa schedule: ${SAMOSA.prices.map((p, i) => `${samosaMkt[i]} at ${p} rupees`).join(', ')}`),
      n: 'Let us finish the canteen example. At each price, add the three students\' quantities. The market schedule is fifteen samosas at ten rupees, eleven at fifteen, eight at twenty and four at twenty-five. The market curve drawn from these figures lies to the right of every individual curve and still slopes downward.',
    }),
    sl('check', 'Quick check: how is market demand formed?', {
      b: 'True or false: market demand is found by adding the prices different buyers will pay for the same quantity.',
      chk: 'tf_vertical_add',
      n: 'Think about what you added in the canteen example: prices or quantities?',
    }),
    sl('diagram', 'Movement along versus shift', {
      v: vMoveShift,
      n: 'This is the distinction examiners love. If only the good\'s own price changes, the buyer moves along the same demand curve: down for an extension, up for a contraction. If anything else changes, such as income, tastes or the price of a related good, the whole curve shifts: right for an increase, left for a decrease.',
    }),
    sl('diagram', 'Extension and contraction', {
      v: vMovement,
      n: 'On a single curve, a fall in price from thirty to twenty rupees takes the buyer from point A to point B, and quantity rises from four to six. That is an extension of demand. A rise in price takes the buyer back from B to A, a contraction. Notice that there is only one curve in this diagram.',
    }),
    sl('diagram', 'Increase and decrease', {
      v: vShift,
      n: 'Now hold the price fixed at twenty-five rupees. If income rises or tastes turn in favour of the good, buyers want seven units instead of five: the curve has shifted to the right, an increase in demand. If a cheaper substitute appears, they want only three: the curve shifts left, a decrease. Shifts always need two curves in the diagram.',
    }),
    sl('example', 'Worked example 4: classify the change', {
      b: 'For each event, ask: did the **own price** change, or **something else**?',
      v: vClassifyEvents,
      n: 'Here is a quick method for any event. First ask whether the good\'s own price changed. If yes, it is a movement: extension if the price fell, contraction if it rose. If no, find the determinant that changed and decide its direction. A heatwave raises demand for juice; a cheaper soft drink, a substitute, lowers it.',
    }),
    sl('check', 'Quick check: the word for it', {
      b: 'A change in demand caused by a factor other than the good\'s own price is shown by a ___ of the demand curve.',
      chk: 'fb_shift_word',
      n: 'One word: what happens to the whole curve when income or tastes change?',
    }),
    sl('check', 'Quick check: four events', {
      b: 'Match each juice-market event with the change it causes.',
      chk: 'mt_four_changes',
      n: 'Sort the events into own-price changes and other changes first.',
    }),
    sl('diagram', 'Exceptions to the Law of Demand', {
      v: vExceptions,
      n: 'The Law of Demand describes ordinary goods, but there are exceptions. Very poor families may buy more of a cheap staple when its price rises. Rich buyers may want a luxury more because it is expensive. People who expect prices to keep rising buy more now. And in emergencies, essentials are bought whatever the price.',
    }),
    sl('diagram', 'An upward-sloping demand curve', {
      v: vUpward,
      n: 'In these exceptional cases the demand curve can slope upward over some range: at a higher price, more is bought. Remember that the expectations and emergency cases arise because an assumption of the law, such as constant expectations, has broken down, while Giffen and prestige goods are genuine exceptions for particular goods.',
    }),
    sl('two-column', 'Giffen goods versus Veblen goods', {
      cols: [
        '**Giffen good:** an inferior necessity taking a large share of a poor family\'s budget. A price rise cuts real income so sharply that the family buys **more** of it and less of costlier food.',
        '**Veblen good:** a luxury bought partly for **status**. A higher price makes it more exclusive and so more desirable to rich buyers.',
      ],
      v: vGiffenVeblen,
      n: 'Do not confuse the two upward-sloping cases. A Giffen good is an inferior necessity of very poor households; its strong income effect outweighs the substitution effect. A Veblen good is a luxury of rich households; its price itself signals status. Every Giffen good is inferior, but most inferior goods still obey the law.',
    }),
    sl('check', 'Quick check: Giffen and inferior goods', {
      b: 'True or false: every Giffen good is an inferior good, but not every inferior good is a Giffen good.',
      chk: 'tf_giffen_inferior',
      n: 'Think about which effect must win for an inferior good to become a Giffen good.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Market demand is the horizontal sum of individual demands. A change in the good\'s own price moves buyers along the curve, an extension or a contraction. A change in any other determinant shifts the curve, an increase or a decrease. Giffen goods, Veblen goods, expectations and emergencies are exceptions to the law.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Movement = one curve, two points; shift = two curves, one price.',
        'Use the words **extension/contraction** for movements and **increase/decrease** for shifts.',
        'Market demand: add **quantities**, never prices; watch for buyers who drop out above some price.',
        'Giffen: poor households, inferior staple, income effect dominates; Veblen: rich households, status.',
        'Numericals are set on schedules: show the addition at each price.',
      ],
      n: 'Common slips cost marks here. Do not call a price-led change an increase in demand; call it an extension. Draw one curve for a movement and two curves for a shift. When building market demand, add quantities at each price and note when a buyer drops out. And keep Giffen and Veblen goods apart: who buys, what kind of good, and why.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Theory of Demand — Notes',
  sections: [
    {
      h: '1. Meaning and kinds of demand',
      t: 1,
      b: '**Demand** is the quantity of a good that buyers are **willing and able** to purchase at a **given price** during a **given period**. A wish without the means to pay is only a desire.\n\n- **Individual demand:** one buyer\'s quantities at different prices.\n- **Market demand:** the total of all buyers\' quantities at each price.\n- **Joint demand:** goods wanted together (stove and LPG cylinder).\n- **Composite demand:** one good with several uses (electricity for lighting, cooking and pumps).\n- **Derived demand:** wanted for what it helps to produce (labour for construction).',
      terms: [['Demand', 'Desire backed by ability and willingness to pay, at a price, over a period.'], ['Derived demand', 'Demand for a good or factor that arises from the demand for another product.']],
      v: vTypes,
    },
    {
      h: '2. Determinants and the demand function',
      t: 2,
      b: '**Dx = f(Px, Py, Y, T, E)** — own price, prices of related goods, income, tastes and expectations (population matters for market demand).\n\n- A dearer **substitute** raises demand; a dearer **complement** lowers it.\n- Higher income raises demand for a **normal** good and lowers it for an **inferior** good.\n- A shift of **tastes** towards the good, or an **expected** price rise, raises demand now.\n\nThe own price causes movements along the curve; every other determinant shifts it.',
      terms: [['Substitutes', 'Goods that can replace each other, such as tea and coffee.'], ['Complements', 'Goods used together, such as cars and petrol.'], ['Inferior good', 'A good whose demand falls as income rises.']],
      v: vDeterminants,
      vs: [vBagExample],
    },
    {
      h: '3. The Law of Demand',
      t: 3,
      b: '**Statement:** ceteris paribus, quantity demanded varies **inversely** with price.\n\n**Assumptions:** income, tastes, prices of related goods, expectations and population stay constant.\n\nA **demand schedule** lists price–quantity pairs; plotting them (quantity on the x-axis, price on the y-axis) gives the **demand curve**, which slopes downward.\n\n**Reasons for the downward slope:** substitution effect; income effect; diminishing marginal utility; new buyers entering; more uses found for a cheaper good.',
      terms: [['Ceteris paribus', 'Other things remaining the same.'], ['Substitution effect', 'Buying more of a good because it has become relatively cheaper.'], ['Income effect', 'Buying more because a lower price raises real income.']],
      v: vMango,
      vs: [vReasons, vAssumptions],
    },
    {
      h: '4. Market demand',
      t: 4,
      b: 'Market demand is found by **horizontal summation**: at each price, add the quantities of all buyers. If a buyer stops buying above some price, the market curve above that price is made of the remaining buyers only, which can create a **kink**.\n\nThe market curve lies to the right of every individual curve and slopes downward.',
      terms: [['Horizontal summation', 'Adding quantities demanded by all buyers at each price.']],
      v: vMarket,
      vs: [vSamosa],
    },
    {
      h: '5. Movement along and shift of the demand curve',
      t: 5,
      b: '- **Change in quantity demanded** (own price): **extension** when the price falls, **contraction** when it rises — a movement along one curve.\n- **Change in demand** (other determinants): **increase** (rightward shift) or **decrease** (leftward shift) — two curves.\n\nTo classify any event, first check whether the own price changed.',
      terms: [['Extension', 'More bought because the own price fell.'], ['Increase in demand', 'More bought at the same price because another determinant changed.']],
      v: vMoveShift,
      vs: [vMovement, vShift],
    },
    {
      h: '6. Exceptions to the Law of Demand',
      t: 6,
      b: '- **Giffen goods:** inferior necessities of the very poor; a strong negative income effect outweighs the substitution effect.\n- **Veblen goods:** status goods whose appeal rises with their price.\n- **Expectations:** buyers who expect further rises buy more now.\n- **Emergencies:** essentials bought whatever the price.\n\nIn these cases the demand curve may slope upward over some range.',
      terms: [['Giffen good', 'An inferior good whose quantity demanded rises with its price.'], ['Veblen good', 'A prestige good demanded more at a higher price.']],
      v: vExceptions,
      vs: [vUpward, vGiffenVeblen],
    },
  ],
  tips: '**Common mistakes**\n- Writing "increase in demand" for a price-led change (it is an **extension**).\n- Drawing one curve for a shift, or two curves for a movement.\n- Adding prices instead of quantities when building market demand.\n- Treating every good as normal: for an inferior good a higher income lowers demand.\n- Confusing Giffen goods (poor households, inferior staple) with Veblen goods (rich households, status).\n\n**How marks are usually awarded**\n- 1-mark items: the correct option or a one-line answer.\n- 2 marks: two clear points, or a point with a labelled diagram.\n- 3 marks: three points, or a calculation with its interpretation.\n- 5 marks: each part answered in order, with labelled diagrams where asked.\n- Board papers also set 4-mark (2 + 2) and 8-mark (4 + 4) questions in parts: answer each part separately.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Demand** (economics)', 'Desire backed by **ability and willingness to pay**, at a given price, over a period.', 'definition', 1],
  ['Desire versus demand', 'A desire lacks the means or willingness to pay; demand has both.', 'concept', 1],
  ['**Joint demand**', 'Two goods wanted together for one use, e.g. a stove and an LPG cylinder.', 'definition', 1],
  ['**Composite demand**', 'One good wanted for several uses, e.g. electricity.', 'definition', 1],
  ['**Derived demand**', 'Demand that arises from the demand for another product, e.g. masons for new flats.', 'definition', 1],
  ['Individual vs market demand', 'One buyer\'s quantities vs the total of all buyers at each price.', 'concept', 1],
  ['The demand function', 'Dx = f(Px, Py, Y, T, E).', 'formula', 2],
  ['Dearer substitute →', 'Demand for the good **increases** (shift right).', 'concept', 2],
  ['Dearer complement →', 'Demand for the good **decreases** (shift left).', 'concept', 2],
  ['**Normal good**', 'Demand rises as income rises.', 'definition', 2],
  ['**Inferior good**', 'Demand falls as income rises.', 'definition', 2],
  ['Expected price rise →', 'Demand **increases now**.', 'concept', 2],
  ['**Law of Demand**', 'Ceteris paribus, quantity demanded varies **inversely** with price.', 'definition', 3],
  ['Ceteris paribus', 'Other things remaining the same.', 'definition', 3],
  ['Assumptions of the law', 'Constant income, tastes, related prices, expectations and population.', 'fact', 3],
  ['Axes of a demand curve', 'Quantity on the x-axis, price on the y-axis.', 'exam-tip', 3],
  ['**Substitution effect**', 'Buying more because the good is relatively cheaper than its substitutes.', 'definition', 3],
  ['**Income effect**', 'Buying more because a lower price raises real income.', 'definition', 3],
  ['Four reasons for the downward slope', 'Substitution effect, income effect, diminishing MU, new buyers.', 'concept', 3],
  ['Riya pays ₹60 a kg (Q = 7 − P/20)', `She buys ${mangoQ(60)} kg a week.`, 'example', 3],
  ['**Horizontal summation**', 'Adding the quantities of all buyers at each price to get market demand.', 'definition', 4],
  ['Why the market curve can kink', 'A buyer drops out above some price, so fewer curves are added there.', 'concept', 4],
  ['**Extension of demand**', 'More bought because the own price **fell**: movement down the curve.', 'definition', 5],
  ['**Contraction of demand**', 'Less bought because the own price **rose**: movement up the curve.', 'definition', 5],
  ['**Increase in demand**', 'More bought at the **same price**: rightward shift.', 'definition', 5],
  ['**Decrease in demand**', 'Less bought at the **same price**: leftward shift.', 'definition', 5],
  ['Movement or shift? The test', 'Own price changed → movement; anything else → shift.', 'exam-tip', 5],
  ['**Giffen good**', 'Inferior staple of the very poor; income effect outweighs substitution effect.', 'definition', 6],
  ['**Veblen good**', 'Status good demanded more at a higher price.', 'definition', 6],
  ['Four exceptions to the law', 'Giffen goods, Veblen goods, expectations, emergencies.', 'fact', 6],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Theory of Demand',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_laptop_wish', 'm_tea_coffee', 'm_extension', 'm_veblen_watch', 'ar_dmu_link'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_desire_demand', { attempt: 1, keys: ['s_subs_comp', 's_two_reasons'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_three_determinants', { attempt: 1, keys: ['s3_predict_three', 's3_giffen_case'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, with a schedule and a described diagram.', items: ['l_law_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Theory of Demand',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_bread_butter', 'm_masons', 'm_petrol_bikes', 'm_inferior_rice', 'm_expect_now', 'm_not_assumption', 'm_chips_market', 'm_decrease_complement', 'm_shift_cause', 'm_shares_rise', 'ar_ceteris_income', 'ar_shift_own'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_joint_composite', 's_market_steps', { attempt: 1, keys: ['s_change_qd_vs_d', 's_extension_increase'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_classify_three', 's3_bag_change', 's3_samosa_schedule', { attempt: 1, keys: ['s3_income_subst', 's3_contraction_decrease'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22. Answer each in parts.', items: ['l_market_curve', { attempt: 1, keys: ['l_movement_shift', 'l_four_exceptions'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of isc-12-economics-ch01 only (meaning and kinds of demand; determinants and the demand function; the Law of Demand and its slope; market demand by horizontal summation; movement versus shift; exceptions); no removed topics for this chapter',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs on tables and described diagrams, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every buyer, shop, town, schedule and case written for this chapter (imagined); no textbook, specimen or past-paper item reused',
    data: `schedules and functions computed in questions.mjs and asserted: mango Q = 7 − P/20; Kochi chips A 8 − 0.1P, B 6 − 0.05P, market ${CHIPS_ROWS.map((r) => `${r[3]} at ₹${r[0]}`).join(', ')}; samosa market ${samosaMkt.join(', ')}; bag Q = 500 − 20P + 0.5Y (${bagQ(10, 600)}, ${bagQ(12, 600)}, ${bagQ(10, 700)}); SVG curves plotted from the same equations`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
