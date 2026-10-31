// Build ISC 12 Economics ch06 Market Mechanism: Equilibrium Price and its Applications. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch06/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch06', 'economics-commerce');
const Qn = await import('./questions.mjs');
const { qd, qs, eq, JD, JS, JE, J_ROWS, ED20, ES40, JD_UP, JD_DOWN, JS_UP, JS_DOWN, E_DUP, E_DDOWN, E_SUP, E_SDOWN, E_BOTH, AD, AS, AE, CEIL, SHORT25, MD, MS, ME, FLOOR, SURPLUS70, PD, PS, PE, KITE } = Qn;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// Inverse curves for drawing (price on the y-axis): demand Qd = a − bP gives P = (a − Q)/b; supply Qs = c + dP gives P = (Q − c)/d.
const dP = ([a, b]) => (q) => (a - q) / b;
const sP = ([c, d]) => (q) => (q - c) / d;

function frame(xMax, yMax, xLabel = 'Quantity', yLabel = 'Price (₹)') {
  const s = new Svg(500, 390);
  const c = s.chart({ x1: xMax, y1: yMax, left: 72, top: 36, width: 340, height: 280, xLabel, yLabel });
  return { s, c };
}

// ---------------------------------------------------------------- SVG figures
// 1. Equilibrium in the Kolhapur jaggery mandi.
const vEq = (() => {
  const { s, c } = frame(120, 60, 'Jaggery (tonnes a week)', 'Price (₹ per kg)');
  c.fn(dP(JD), 20, 110, { color: 'accent', sw: 2.6 });
  c.fn(sP(JS), 0, 110, { color: 'blue', sw: 2.6 });
  assert(dP(JD)(JE.q) === JE.p && sP(JS)(JE.q) === JE.p, 'E on both curves');
  c.dot([JE.q, JE.p], 'accent').drop([JE.q, JE.p]);
  c.label([JE.q, JE.p], 'E', { dx: 12, dy: -12, bold: true });
  c.label([110, dP(JD)(110)], 'DD', { anchor: 'end', dx: -4, dy: -14, size: 13, color: 'accent', bold: true });
  c.label([110, sP(JS)(110)], 'SS', { anchor: 'end', dx: -4, dy: -14, size: 13, color: 'blue', bold: true });
  c.xTick(JE.q, String(JE.q)).yTick(JE.p, String(JE.p));
  return s.visual(
    `Demand curve DD sloping down and supply curve SS sloping up for jaggery, crossing at E where the price is ${JE.p} rupees a kg and ${JE.q} tonnes are bought and sold each week`,
    'Imagined Kolhapur mandi: Qd = 120 − 2P, Qs = 3P − 30, so E = (60 t, ₹30).',
  );
})();

// 2. Excess demand at ₹20 and excess supply at ₹40.
const vExcess = (() => {
  const { s, c } = frame(120, 60, 'Jaggery (tonnes a week)', 'Price (₹ per kg)');
  c.fn(dP(JD), 20, 110, { color: 'accent', sw: 2.4 });
  c.fn(sP(JS), 0, 110, { color: 'blue', sw: 2.4 });
  c.seg([qs(JS, 20), 20], [qd(JD, 20), 20], { color: 'red', sw: 3 });
  c.seg([qd(JD, 40), 40], [qs(JS, 40), 40], { color: 'green', sw: 3 });
  c.dot([JE.q, JE.p], 'accent');
  c.label([JE.q, JE.p], 'E', { dx: 12, dy: -6, bold: true });
  c.label([(qs(JS, 20) + qd(JD, 20)) / 2, 20], `excess demand ${ED20}`, { dy: 16, size: 12, color: 'red' });
  c.label([(qd(JD, 40) + qs(JS, 40)) / 2, 40], `excess supply ${ES40}`, { dy: -14, size: 12, color: 'green' });
  c.yTick(20, '20').yTick(40, '40');
  c.xTick(qs(JS, 20), String(qs(JS, 20))).xTick(qd(JD, 20), String(qd(JD, 20))).xTick(qs(JS, 40), String(qs(JS, 40)));
  return s.visual(
    `The jaggery demand and supply curves with two horizontal gaps: at 20 rupees buyers want ${qd(JD, 20)} tonnes but sellers offer ${qs(JS, 20)}, an excess demand of ${ED20}; at 40 rupees sellers offer ${qs(JS, 40)} but buyers want ${qd(JD, 40)}, an excess supply of ${ES40}; both gaps close at E`,
    'Below E the price is pushed up; above E it is pushed down.',
  );
})();

// 3. Shifts of demand.
const vDShift = (() => {
  const { s, c } = frame(120, 60, 'Jaggery (tonnes a week)', 'Price (₹ per kg)');
  c.fn(sP(JS), 0, 110, { color: 'blue', sw: 2.4 });
  c.fn(dP(JD_DOWN), 15, 85, { color: 'muted', sw: 2, dash: true });
  c.fn(dP(JD), 20, 110, { sw: 2.4 });
  c.fn(dP(JD_UP), 45, 115, { color: 'accent', sw: 2.6 });
  for (const [e, col] of [[JE], [E_DUP, 'accent'], [E_DDOWN, 'muted']]) c.dot([e.q, e.p], col);
  c.label([JE.q, JE.p], 'E', { dx: 12, dy: 10, bold: true });
  c.label([E_DUP.q, E_DUP.p], 'E1', { dx: 14, dy: -6, bold: true, color: 'accent' });
  c.label([E_DDOWN.q, E_DDOWN.p], 'E2', { dx: -14, dy: -8, bold: true, muted: true });
  c.label([115, dP(JD_UP)(115)], 'D1', { anchor: 'end', dx: -2, dy: -12, size: 12, color: 'accent', bold: true });
  c.label([85, dP(JD_DOWN)(85)], 'D2', { anchor: 'end', dx: -2, dy: -12, size: 12, muted: true, bold: true });
  c.label([110, sP(JS)(110)], 'SS', { anchor: 'end', dx: -4, dy: -14, size: 12, color: 'blue', bold: true });
  c.xTick(E_DDOWN.q, String(E_DDOWN.q)).xTick(E_DUP.q, String(E_DUP.q));
  c.yTick(E_DDOWN.p, String(E_DDOWN.p)).yTick(E_DUP.p, String(E_DUP.p));
  return s.visual(
    `Supply curve SS with three demand curves. The original equilibrium E is at ${JE.q} tonnes and ${JE.p} rupees; an increase in demand to D1 gives E1 at ${E_DUP.q} tonnes and ${E_DUP.p} rupees; a decrease to D2 gives E2 at ${E_DDOWN.q} tonnes and ${E_DDOWN.p} rupees`,
    'Imagined shifts of 25 t at every price: Qd = 145 − 2P (D1) and Qd = 95 − 2P (D2).',
  );
})();

// 4. Shifts of supply.
const vSShift = (() => {
  const { s, c } = frame(120, 60, 'Jaggery (tonnes a week)', 'Price (₹ per kg)');
  c.fn(dP(JD), 20, 110, { color: 'accent', sw: 2.4 });
  c.fn(sP(JS_DOWN), 0, 115, { color: 'muted', sw: 2, dash: true });
  c.fn(sP(JS), 0, 110, { sw: 2.4 });
  c.fn(sP(JS_UP), 0, 110, { color: 'blue', sw: 2.6 });
  for (const [e, col] of [[JE], [E_SUP, 'blue'], [E_SDOWN, 'muted']]) c.dot([e.q, e.p], col);
  c.label([JE.q, JE.p], 'E', { dx: 12, dy: 8, bold: true });
  c.label([E_SUP.q, E_SUP.p], 'E1', { dx: 10, dy: 14, bold: true, color: 'blue' });
  c.label([E_SDOWN.q, E_SDOWN.p], 'E2', { dx: -16, dy: -6, bold: true, muted: true });
  c.label([110, sP(JS_UP)(110)], 'S1', { anchor: 'start', dx: 6, dy: 0, size: 12, color: 'blue', bold: true });
  c.label([115, sP(JS_DOWN)(115)], 'S2', { anchor: 'end', dx: -4, dy: -12, size: 12, muted: true, bold: true });
  c.label([20, dP(JD)(20)], 'DD', { anchor: 'start', dx: 8, dy: -4, size: 12, color: 'accent', bold: true });
  c.xTick(E_SDOWN.q, String(E_SDOWN.q)).xTick(E_SUP.q, String(E_SUP.q));
  c.yTick(E_SUP.p, String(E_SUP.p)).yTick(E_SDOWN.p, String(E_SDOWN.p));
  return s.visual(
    `Demand curve DD with three supply curves. An increase in supply to S1 moves equilibrium from E (${JE.q} tonnes, ${JE.p} rupees) to E1 (${E_SUP.q} tonnes, ${E_SUP.p} rupees); a decrease to S2 moves it to E2 (${E_SDOWN.q} tonnes, ${E_SDOWN.p} rupees)`,
    'Imagined shifts: Qs = 3P − 5 (S1) and Qs = 3P − 55 (S2).',
  );
})();

// 5. Equal increases in demand and supply.
const vBoth = (() => {
  const { s, c } = frame(130, 60, 'Jaggery (tonnes a week)', 'Price (₹ per kg)');
  c.fn(dP(JD), 20, 110, { color: 'muted', sw: 2, dash: true });
  c.fn(sP(JS), 0, 110, { color: 'muted', sw: 2, dash: true });
  c.fn(dP(JD_UP), 45, 125, { color: 'accent', sw: 2.6 });
  c.fn(sP(JS_UP), 0, 125, { color: 'blue', sw: 2.6 });
  c.dot([JE.q, JE.p]).dot([E_BOTH.q, E_BOTH.p], 'accent');
  c.seg([0, JE.p], [E_BOTH.q, JE.p], { color: 'muted', dash: true, sw: 1.2 });
  c.label([JE.q, JE.p], 'E', { dy: -14, bold: true });
  c.label([E_BOTH.q, E_BOTH.p], 'E1', { dy: -14, bold: true, color: 'accent' });
  c.label([125, dP(JD_UP)(125)], 'D1', { anchor: 'end', dx: -2, dy: -12, size: 12, color: 'accent', bold: true });
  c.label([125, sP(JS_UP)(125)], 'S1', { anchor: 'end', dx: -4, dy: 14, size: 12, color: 'blue', bold: true });
  c.xTick(JE.q, String(JE.q)).xTick(E_BOTH.q, String(E_BOTH.q)).yTick(JE.p, String(JE.p));
  return s.visual(
    `Demand and supply both shift right by the same amount. The old equilibrium E at ${JE.q} tonnes and the new equilibrium E1 at ${E_BOTH.q} tonnes lie on the same horizontal line at ${JE.p} rupees, so the price is unchanged while the quantity rises`,
    'Equal shifts: Qd = 145 − 2P and Qs = 3P − 5 meet at the old price.',
  );
})();

// 6. Price ceiling on atta.
const vCeiling = (() => {
  const { s, c } = frame(140, 50, 'Atta (tonnes a week)', 'Price (₹ per kg)');
  c.fn(dP(AD), 20, 130, { color: 'accent', sw: 2.4 });
  c.fn(sP(AS), 0, 140, { color: 'blue', sw: 2.4 });
  c.seg([0, CEIL], [135, CEIL], { color: 'red', sw: 2, dash: true });
  c.seg([qs(AS, CEIL), CEIL], [qd(AD, CEIL), CEIL], { color: 'red', sw: 3.2 });
  c.dot([AE.q, AE.p], 'accent').dot([qs(AS, CEIL), CEIL], 'blue').dot([qd(AD, CEIL), CEIL], 'accent');
  c.label([AE.q, AE.p], 'E', { dx: 12, dy: -10, bold: true });
  c.label([135, CEIL], 'ceiling ₹25', { anchor: 'end', dy: -12, size: 12, color: 'red' });
  c.label([(qs(AS, CEIL) + qd(AD, CEIL)) / 2, CEIL], `shortage ${SHORT25}`, { dy: 16, size: 12, color: 'red' });
  c.xTick(qs(AS, CEIL), String(qs(AS, CEIL))).xTick(AE.q, String(AE.q)).xTick(qd(AD, CEIL), String(qd(AD, CEIL)));
  c.yTick(AE.p, String(AE.p));
  return s.visual(
    `Atta market with equilibrium E at ${AE.q} tonnes and ${AE.p} rupees. A ceiling at ${CEIL} rupees, below E, meets supply at ${qs(AS, CEIL)} tonnes and demand at ${qd(AD, CEIL)} tonnes, leaving a shortage of ${SHORT25} tonnes`,
    'Imagined hill district: Qd = 200 − 4P, Qs = 6P − 100.',
  );
})();

// 7. Price floor (support price) for lentils.
const vFloor = (() => {
  const { s, c } = frame(300, 100, 'Lentils (thousand quintals)', 'Price (₹ hundred per quintal)');
  c.fn(dP(MD), 50, 300, { color: 'accent', sw: 2.4 });
  c.fn(sP(MS), 0, 300, { color: 'blue', sw: 2.4 });
  c.seg([0, FLOOR], [290, FLOOR], { color: 'green', sw: 2, dash: true });
  c.seg([qd(MD, FLOOR), FLOOR], [qs(MS, FLOOR), FLOOR], { color: 'green', sw: 3.2 });
  c.dot([ME.q, ME.p], 'accent').dot([qd(MD, FLOOR), FLOOR], 'accent').dot([qs(MS, FLOOR), FLOOR], 'blue');
  c.label([ME.q, ME.p], 'E', { dx: 12, dy: 12, bold: true });
  c.label([30, FLOOR], 'support price 70', { anchor: 'start', dy: -12, size: 12, color: 'green' });
  c.label([(qd(MD, FLOOR) + qs(MS, FLOOR)) / 2, FLOOR], `surplus ${SURPLUS70}`, { dy: -14, size: 12, color: 'green' });
  c.xTick(qd(MD, FLOOR), String(qd(MD, FLOOR))).xTick(ME.q, String(ME.q)).xTick(qs(MS, FLOOR), String(qs(MS, FLOOR)));
  c.yTick(ME.p, String(ME.p));
  return s.visual(
    `Lentil market with equilibrium E at ${ME.q} thousand quintals and a price of ${ME.p}. A support price of ${FLOOR}, above E, meets demand at ${qd(MD, FLOOR)} and supply at ${qs(MS, FLOOR)}, leaving a surplus of ${SURPLUS70} thousand quintals for the government to buy`,
    'Imagined district: Qd = 500 − 5P, Qs = 5P − 100 (P in ₹ hundred per quintal).',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vSchedule = table(
  ['Price (₹ per kg)', 'Quantity demanded (t)', 'Quantity supplied (t)', 'Situation'],
  J_ROWS.map(([p, d, s]) => [String(p), String(d), String(s), d > s ? `Excess demand ${d - s}` : d < s ? `Excess supply ${s - d}` : 'Equilibrium']),
  `Jaggery schedule from the imagined Kolhapur mandi: ${J_ROWS.map(([p, d, s]) => `at ${p} rupees, ${d} demanded and ${s} supplied`).join('; ')}; equilibrium at ${JE.p} rupees`,
  'Computed from Qd = 120 − 2P and Qs = 3P − 30.',
);
const vAdjust = flow(
  'TB',
  ['Price below equilibrium', 'Excess demand: buyers compete', 'Price rises: demand contracts, supply extends', 'Gap closes at E'],
  'Flow of price adjustment: a price below equilibrium creates excess demand, buyers compete, the price rises so demand contracts and supply extends, and the gap closes at equilibrium',
  'The same logic runs in reverse above E',
);
const vPulpWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['Set demand equal to supply', '90 − 3P = 2P − 10', '100 = 5P'],
    ['Solve for price', 'P = 100 ÷ 5', `P = ₹${PE.p}`],
    ['Find quantity', `Q = 90 − 3 × ${PE.p}`, `Q = ${PE.q} t`],
    ['Check with supply', `2 × ${PE.p} − 10`, `${qs(PS, PE.p)} t`],
  ],
  `Worked example table solving the imagined Ratnagiri mango-pulp market: setting 90 minus 3P equal to 2P minus 10 gives a price of ${PE.p} rupees and a quantity of ${PE.q} tonnes, checked with the supply equation`,
);
const vKite = table(
  ['Price (₹ per spool)', 'Demanded', 'Supplied'],
  KITE.map((r) => r.map(String)),
  'Kite-string schedule for an imagined Ahmedabad lane before Uttarayan: 900 and 300 at 40 rupees, 750 and 450 at 50, 600 and 600 at 60, 450 and 750 at 70',
  'Imagined schedule: equilibrium where the two columns match.',
);
const vDemandWork = table(
  ['Situation', 'Equation pair', 'Price (₹)', 'Quantity (t)'],
  [
    ['Before the festival', '120 − 2P = 3P − 30', String(JE.p), String(JE.q)],
    ['Festival demand', '145 − 2P = 3P − 30', String(E_DUP.p), String(E_DUP.q)],
    ['Health campaign', '95 − 2P = 3P − 30', String(E_DDOWN.p), String(E_DDOWN.q)],
  ],
  `Worked example table for demand shifts in the jaggery mandi: the original equilibrium at ${JE.p} rupees and ${JE.q} tonnes, festival demand giving ${E_DUP.p} rupees and ${E_DUP.q} tonnes, and a health campaign giving ${E_DDOWN.p} rupees and ${E_DDOWN.q} tonnes`,
);
const vSingle = table(
  ['Change (other side fixed)', 'Price', 'Quantity'],
  [
    ['Demand increases', 'Rises', 'Rises'],
    ['Demand decreases', 'Falls', 'Falls'],
    ['Supply increases', 'Falls', 'Rises'],
    ['Supply decreases', 'Rises', 'Falls'],
  ],
  'Table of single shifts: a demand increase raises price and quantity; a demand decrease lowers both; a supply increase lowers price and raises quantity; a supply decrease raises price and lowers quantity',
);
const vSimultaneous = table(
  ['Demand', 'Supply', 'Price', 'Quantity'],
  [
    ['Increases', 'Increases', 'Depends on relative shifts', 'Rises'],
    ['Decreases', 'Decreases', 'Depends on relative shifts', 'Falls'],
    ['Increases', 'Decreases', 'Rises', 'Depends on relative shifts'],
    ['Decreases', 'Increases', 'Falls', 'Depends on relative shifts'],
  ],
  'Table of simultaneous shifts: when demand and supply move in the same direction quantity is certain and price depends on the sizes of the shifts; when they move in opposite directions price is certain and quantity depends on the sizes',
  'Equal shifts in the same direction leave the price unchanged.',
);
const vBothWork = table(
  ['Case', 'Equation pair', 'Price (₹)', 'Quantity (t)'],
  [
    ['Original', '120 − 2P = 3P − 30', String(JE.p), String(JE.q)],
    ['Both up by 25 t', '145 − 2P = 3P − 5', String(E_BOTH.p), String(E_BOTH.q)],
  ],
  `Worked example table: when demand and supply both rise by 25 tonnes at every price, the jaggery price stays at ${E_BOTH.p} rupees and the quantity rises from ${JE.q} to ${E_BOTH.q} tonnes`,
);
const vIntervene = table(
  ['Control', 'Set where', 'Usual aim', 'Imagined example'],
  [
    ['Price ceiling (maximum)', 'Below equilibrium', 'Protect consumers', 'Atta in a cut-off hill district'],
    ['Price floor (minimum)', 'Above equilibrium', 'Protect producers', 'Support price for lentils'],
  ],
  'Two-row table: a price ceiling is a maximum set below equilibrium to protect consumers, a price floor is a minimum set above equilibrium to protect producers, each with an imagined example',
);
const vCeilWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['Free-market price', '200 − 4P = 6P − 100', `P = ₹${AE.p}, Q = ${AE.q} t`],
    ['Demand at the ceiling', '200 − 4 × 25', `${qd(AD, CEIL)} t`],
    ['Supply at the ceiling', '6 × 25 − 100', `${qs(AS, CEIL)} t`],
    ['Shortage', `${qd(AD, CEIL)} − ${qs(AS, CEIL)}`, `${SHORT25} t`],
  ],
  `Worked example table for the atta ceiling: the free market clears at ${AE.p} rupees and ${AE.q} tonnes; at the ceiling of ${CEIL} rupees demand is ${qd(AD, CEIL)} and supply ${qs(AS, CEIL)}, a shortage of ${SHORT25} tonnes`,
);
const vCeilingEffects = flow(
  'TB',
  ['Ceiling below equilibrium', 'Shortage: demand exceeds supply', 'Queues and rationing by quota', 'Black market above the legal price'],
  'Flow of the effects of a price ceiling: a ceiling below equilibrium creates a shortage, which leads to queues and rationing, and to black-market sales above the legal price',
  'Why a ceiling needs rationing',
);
const vMsp = flow(
  'LR',
  ['CACP recommends', 'Government of India announces MSP', 'Agencies buy at MSP', 'Grain stored as buffer stock', 'Ration shops and reserves'],
  'Flow of the minimum support price system: the Commission for Agricultural Costs and Prices recommends, the Government of India announces the support price, agencies buy at that price, grain is stored as buffer stock and used for ration shops and reserves',
  'How a support price is kept in force',
);
const vFloorWork = table(
  ['Step', 'Working', 'Result'],
  [
    ['Free-market price', '500 − 5P = 5P − 100', `P = ${ME.p}, Q = ${ME.q}`],
    ['Supply at the support price', '5 × 70 − 100', `${qs(MS, FLOOR)}`],
    ['Demand at the support price', '500 − 5 × 70', `${qd(MD, FLOOR)}`],
    ['Surplus to procure', `${qs(MS, FLOOR)} − ${qd(MD, FLOOR)}`, `${SURPLUS70}`],
  ],
  `Worked example table for the lentil support price: the free market clears at ${ME.p} and ${ME.q}; at a support price of ${FLOOR}, supply is ${qs(MS, FLOOR)} and demand ${qd(MD, FLOOR)}, a surplus of ${SURPLUS70} thousand quintals`,
  'Quantities in thousand quintals; price in ₹ hundred per quintal.',
);
const vFloorPros = table(
  ['Gains', 'Costs and risks'],
  [
    ['Assured, stable income for farmers', 'Public spending on procurement'],
    ['Buffer stocks for lean years', 'Storage costs and possible wastage'],
    ['Grain for ration shops', 'Consumers pay above the free-market price'],
  ],
  'Two-column table of the gains of a support price (assured farm incomes, buffer stocks, grain for ration shops) and its costs (public spending, storage and wastage, higher consumer prices)',
);
const vCompare = table(
  ['', 'Price ceiling', 'Price floor'],
  [
    ['Position', 'Below equilibrium', 'Above equilibrium'],
    ['Result', 'Shortage', 'Surplus'],
    ['Support needed', 'Rationing', 'Procurement'],
    ['Helps', 'Consumers', 'Producers'],
    ['Risk', 'Black market', 'Storage cost, wastage'],
  ],
  'Comparison table of a price ceiling and a price floor: position relative to equilibrium, market result, support needed, who is helped and the main risk',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Equilibrium', 'Quantity demanded equals quantity supplied'],
    ['Below E', 'Excess demand pushes the price up'],
    ['Above E', 'Excess supply pushes the price down'],
    ['One curve shifts', 'Demand moves price and quantity together; supply moves them apart'],
    ['Both shift', 'Same direction: quantity certain; opposite: price certain'],
  ],
  'Summary table of Part 1: equilibrium, excess demand and supply, single shifts and simultaneous shifts',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Price ceiling', 'Below E: shortage, rationing, black market'],
    ['Price floor (MSP)', 'Above E: surplus, procurement, buffer stock'],
    ['Who decides MSP', 'Government of India, on CACP recommendation'],
  ],
  'Summary table of Part 2: price ceilings, price floors and minimum support prices',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Market Mechanism — Part 1: Equilibrium and Changes in Demand and Supply',
  goals: [
    'Find the equilibrium price and quantity from schedules and from equations',
    'Explain how excess demand and excess supply restore equilibrium',
    'Show the effect of shifts in demand or in supply on equilibrium',
    'Predict the outcome when demand and supply change together',
  ],
  slides: [
    sl('title', 'Market Mechanism: Equilibrium Price', {
      b: 'Part 1 — how buyers and sellers settle on a **price**, and what happens when **demand** or **supply** changes.',
      v: flow('LR', ['Equilibrium', 'Excess demand and supply', 'Changes in demand', 'Changes in supply', 'Both together'], 'Route map of Part 1: equilibrium, excess demand and supply, changes in demand, changes in supply, and both changing together', 'Part 1 at a glance'),
      n: 'In the last chapters we studied buyers and sellers separately. Now we bring them together in one market. We will see how a price settles where buyers and sellers agree, why any other price does not last, and what happens to price and quantity when demand, supply or both of them change.',
    }),
    sl('concept', 'Where demand meets supply', {
      b: 'The **equilibrium price** is the price at which **quantity demanded = quantity supplied**. The quantity traded there is the **equilibrium quantity**.',
      v: vEq,
      n: 'Here is an imagined jaggery market in a Kolhapur mandi. The demand curve slopes down and the supply curve slopes up. They cross at one point, marked E. At thirty rupees a kilogram, buyers want sixty tonnes a week and sellers offer exactly sixty tonnes. That price clears the market, so it is the equilibrium price.',
    }),
    sl('diagram', 'The same market as a schedule', {
      v: vSchedule,
      n: 'The schedule tells the same story in numbers. At twenty and twenty-five rupees, buyers want more than sellers offer. At thirty-five and forty rupees, sellers offer more than buyers want. Only at thirty rupees do the two columns match. Always look for the row where demand equals supply.',
    }),
    sl('diagram', 'Excess demand and excess supply', {
      b: 'Below E the market has **excess demand**; above E it has **excess supply**.',
      v: vExcess,
      n: 'At twenty rupees buyers want eighty tonnes but only thirty are offered: an excess demand of fifty. At forty rupees sellers bring ninety tonnes but buyers take only forty: an excess supply of fifty. Neither situation can last, because someone in the market is left unsatisfied.',
    }),
    sl('concept', 'How the market corrects itself', {
      bl: ['Excess demand: buyers compete, the price **rises**.', 'Excess supply: sellers cut the price, the price **falls**.', 'Along the way buyers and sellers **move along** their curves; no curve shifts.'],
      v: vAdjust,
      n: 'When buyers cannot get enough at the ruling price, they offer more, and the price rises. As it rises, buyers ask for less and sellers offer more, until the gap disappears. With unsold stock the opposite happens. Notice that nothing shifts here: everyone simply moves along their own curve back to equilibrium.',
    }),
    sl('example', 'Worked example 1: solving for equilibrium', {
      b: 'An imagined Ratnagiri mango-pulp cooperative: **Qd = 90 − 3P** and **Qs = 2P − 10**.',
      v: vPulpWork,
      n: 'To find equilibrium from equations, set demand equal to supply. Ninety minus three P equals two P minus ten, so five P equals one hundred and the price is twenty rupees. Put it back into the demand equation to get thirty tonnes, and check that the supply equation gives the same thirty.',
    }),
    sl('check', 'Quick check: shortage at equilibrium?', {
      b: 'Answer true or false.',
      chk: 'tf_eq_shortage',
      n: 'Think about what equal quantities mean for a buyer who is willing to pay the market price.',
    }),
    sl('check', 'Quick check: find the price', {
      b: 'Use the method of worked example 1.',
      chk: 'n_pulp_eq',
      v: vKite,
      n: 'Set the two equations equal and solve for the price. The kite-string table beside it is another market to practise reading later.',
    }),
    sl('concept', 'When demand changes', {
      b: 'With supply fixed, an **increase in demand** raises **both** price and quantity; a **decrease** lowers both.',
      v: vDShift,
      n: 'Suppose festival buying raises the demand for jaggery at every price. The demand curve shifts right, and at the old price there is excess demand. The price rises to thirty-five rupees and seventy-five tonnes change hands. A health campaign that lowers demand does the reverse: twenty-five rupees and forty-five tonnes.',
    }),
    sl('example', 'Worked example 2: figures for demand shifts', {
      b: 'Supply stays **Qs = 3P − 30**; only the demand equation changes.',
      v: vDemandWork,
      n: 'Each row solves a new pair of equations with the same supply. When demand rises by twenty-five tonnes at every price, the quantity rises by only fifteen, because the higher price also makes buyers cut back a little. Always solve the new pair rather than adding the shift to the old quantity.',
    }),
    sl('check', 'Quick check: a dry monsoon', {
      b: 'Choose the correct effect on the umbrella market.',
      chk: 'm_demand_down_umbrella',
      n: 'Decide which curve shifts, in which direction, and then read the new intersection.',
    }),
    sl('concept', 'When supply changes', {
      b: 'With demand fixed, an **increase in supply** lowers the price and raises the quantity; a **decrease** raises the price and lowers the quantity.',
      v: vSShift,
      n: 'New storage sheds raise the supply of jaggery at every price. The supply curve shifts right, the price falls to twenty-five rupees and the quantity rises to seventy tonnes. Unseasonal rain that cuts supply pushes the price up to thirty-five rupees and the quantity down to fifty tonnes.',
    }),
    sl('diagram', 'Four single shifts at a glance', {
      v: vSingle,
      n: 'Here are the four cases side by side. A demand shift moves price and quantity in the same direction. A supply shift moves them in opposite directions. Learn this pattern and you can answer most one-mark questions on this topic quickly and correctly.',
    }),
    sl('concept', 'When both curves shift', {
      b: 'If both shift the **same way**, the change in **quantity** is certain; if they shift **opposite ways**, the change in **price** is certain.',
      v: vSimultaneous,
      n: 'When demand and supply both increase, quantity certainly rises, but the price depends on which shift is bigger. When demand rises while supply falls, the price certainly rises, but quantity depends on the sizes of the two shifts. Always say what is certain and what depends on the sizes.',
    }),
    sl('example', 'Worked example 3: equal shifts', {
      b: 'Demand rises to **Qd = 145 − 2P** and supply to **Qs = 3P − 5**: each by 25 tonnes at every price.',
      v: vBothWork,
      n: 'Solving the new pair gives a price of thirty rupees, exactly the old price, and eighty-five tonnes. Because both curves moved right by the same twenty-five tonnes, the extra demand and the extra supply cancel at the old price. So the price does not change, but the quantity rises by twenty-five tonnes.',
    }),
    sl('diagram', 'Equal shifts on a diagram', {
      v: vBoth,
      n: 'The diagram confirms it. The old and new intersections lie on the same horizontal line at thirty rupees. The new point is further right, showing the larger quantity traded. Draw both old curves dashed and both new curves solid so the examiner can follow your answer.',
    }),
    sl('check', 'Quick check: equal increases', {
      b: 'Choose the correct effect on the shirt market.',
      chk: 'm_both_equal',
      n: 'Ask whether any excess appears at the old price when both curves move by the same amount.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: equilibrium is where quantity demanded equals quantity supplied. Below it, excess demand pushes the price up; above it, excess supply pushes it down. A shift in demand moves price and quantity together, a shift in supply moves them apart, and when both shift, one result is certain and the other depends on sizes.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Label axes (quantity across, price up), curves (DD, SS) and points (E, E1).',
        'For shifts, draw the old curve, the new curve and both equilibria.',
        'With equations, solve the new pair: do not just add the shift to the old quantity.',
        'For simultaneous changes, state what is certain and what depends on sizes.',
        '2 marks: two points or a labelled diagram; 3 marks: working plus comment; 5 marks: parts in order.',
      ],
      n: 'Examiners reward clear diagrams. Label both axes, both curves and every equilibrium point. When a curve shifts, keep the old one so the change is visible. When solving equations, always solve the new pair. And for two shifts at once, say which result is certain and which depends on the sizes of the shifts.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Market Mechanism — Part 2: Price Ceilings and Price Floors',
  goals: [
    'Explain why a price ceiling below equilibrium causes a shortage, rationing and black markets',
    'Explain why a price floor above equilibrium causes a surplus, using minimum support prices',
    'Calculate shortages and surpluses from demand and supply equations',
    'Weigh the gains and costs of price controls',
  ],
  slides: [
    sl('title', 'When the Government Fixes Prices', {
      b: 'Part 2 — **price ceilings** and **price floors**, and the **minimum support price** for crops.',
      v: flow('LR', ['Why control prices', 'Price ceiling', 'Rationing and black markets', 'Price floor and MSP', 'Gains and costs'], 'Route map of Part 2: why control prices, price ceilings, rationing and black markets, price floors and minimum support prices, gains and costs', 'Part 2 at a glance'),
      n: 'Sometimes the market price is thought to be unfair, either too high for poor buyers or too low for farmers. Then the government may fix a price by law. In this part we see what happens to a market when a maximum or a minimum price is fixed, and why such controls need extra measures to work.',
    }),
    sl('concept', 'Two kinds of price control', {
      v: vIntervene,
      n: 'A price ceiling is a legal maximum. It matters only when it is below the equilibrium price and is meant to protect consumers. A price floor is a legal minimum. It matters only when it is above equilibrium and is meant to protect producers. Our examples are imagined, but the logic applies everywhere.',
    }),
    sl('diagram', 'A ceiling creates a shortage', {
      b: 'At a ceiling **below E**, quantity demanded exceeds quantity supplied.',
      v: vCeiling,
      n: 'Road blockages cut the supply of atta in an imagined hill district, and the state caps the price at twenty-five rupees, below the market-clearing thirty. At the cap, buyers want one hundred tonnes a week but sellers offer only fifty. The gap of fifty tonnes is a shortage, and only fifty tonnes are actually sold.',
    }),
    sl('example', 'Worked example 1: measuring the shortage', {
      b: 'Atta: **Qd = 200 − 4P**, **Qs = 6P − 100**, ceiling **₹25**.',
      v: vCeilWork,
      n: 'First find the free-market equilibrium: thirty rupees and eighty tonnes. Then put the ceiling price into both equations. Demand at twenty-five rupees is one hundred tonnes and supply is fifty. The shortage is the difference, fifty tonnes. Notice the quantity sold falls below the free-market eighty.',
    }),
    sl('check', 'Quick check: the hidden trade', {
      b: 'Name the illegal trade that a ceiling can create.',
      chk: 'm_black_market',
      n: 'Think about buyers who cannot get the good at the legal price but are willing to pay more.',
    }),
    sl('concept', 'Rationing and black markets', {
      bl: ['**Rationing:** the limited supply is shared by quota, for example through ration cards.', '**Black market:** some stock is sold secretly above the legal price.', 'Neither removes the shortage; only more supply or a higher price can.'],
      v: vCeilingEffects,
      n: 'Because buyers want more than is available, the government shares the limited quantity by quota, often with ration cards and fair-price shops. Some buyers who miss out pay more in secret, so a black market appears. These measures share the shortage, but they do not end it; only more supply would.',
    }),
    sl('check', 'Quick check: the name of the cap', {
      b: 'Fill in the blank.',
      chk: 'fb_ceiling_word',
      n: 'Recall the name of a legal maximum price.',
    }),
    sl('diagram', 'A floor creates a surplus', {
      b: 'At a floor **above E**, quantity supplied exceeds quantity demanded.',
      v: vFloor,
      n: 'Now an imagined lentil market. The free market clears at a price of sixty. A support price of seventy, above equilibrium, makes farmers offer two hundred and fifty thousand quintals while private buyers take only one hundred and fifty. The gap of one hundred thousand quintals is a surplus.',
    }),
    sl('concept', 'How the minimum support price works', {
      b: 'For notified crops, the **Government of India** announces MSPs on the recommendation of the **Commission for Agricultural Costs and Prices (CACP)**.',
      v: vMsp,
      n: 'In India, the Commission for Agricultural Costs and Prices recommends support prices for notified crops, and the Government of India announces them. To keep a support price in force, public agencies stand ready to buy what the market will not take, and the grain is stored as buffer stock for ration shops and lean years.',
    }),
    sl('example', 'Worked example 2: measuring the surplus', {
      b: 'Lentils: **Qd = 500 − 5P**, **Qs = 5P − 100**, support price **70**.',
      v: vFloorWork,
      n: 'The free market clears at sixty and two hundred thousand quintals. At the support price of seventy, supply rises to two hundred and fifty while demand falls to one hundred and fifty. The surplus of one hundred thousand quintals is what the government must buy to keep the floor in force.',
    }),
    sl('check', 'Quick check: who announces MSP?', {
      b: 'Choose the body whose recommendation is used.',
      chk: 'm_msp_who',
      n: 'Recall the commission that studies farm costs and recommends support prices.',
    }),
    sl('two-column', 'Gains and costs of a support price', {
      cols: ['**Gains:** steady farm incomes, buffer stocks, grain for ration shops.', '**Costs:** public spending, storage and wastage, higher prices for consumers.'],
      v: vFloorPros,
      n: 'A support price gives farmers a steady income and builds food reserves that can be released in bad years. But buying and storing the surplus costs public money, some grain may be wasted, and consumers pay more than the free-market price. A balanced answer mentions both sides.',
    }),
    sl('check', 'Quick check: keeping the floor', {
      b: 'Answer true or false.',
      chk: 'tf_floor_burden',
      n: 'Think about what would happen to unsold grain if nobody bought it at the support price.',
    }),
    sl('diagram', 'Ceiling and floor compared', {
      v: vCompare,
      n: 'Put the two controls side by side. A ceiling sits below equilibrium, creates a shortage, needs rationing, helps consumers and risks black markets. A floor sits above equilibrium, creates a surplus, needs procurement, helps producers and risks storage costs. This comparison is a favourite five-mark question.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: a ceiling below equilibrium causes a shortage, which leads to rationing and black markets. A floor above equilibrium causes a surplus that the government must buy and store. In India, support prices for notified crops are announced by the Government of India on the recommendation of the Commission for Agricultural Costs and Prices.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Draw the control line **below** E for a ceiling and **above** E for a floor.',
        'Measure the gap **along the control line**, between the two curves.',
        'A ceiling is ineffective above E; a floor is ineffective below E.',
        'Name the extra measure: rationing for a ceiling, procurement for a floor.',
        'In evaluations give one gain and one cost.',
      ],
      n: 'Place the control line correctly: below equilibrium for a ceiling and above it for a floor. Read the shortage or surplus along that line between the two curves. Remember that a control on the wrong side of equilibrium changes nothing. And when asked to evaluate, give at least one gain and one cost.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Market Mechanism: Equilibrium Price and its Applications — Notes',
  sections: [
    {
      h: '1. Market equilibrium',
      t: 1,
      b: `**Equilibrium** is the price at which **quantity demanded equals quantity supplied**. It clears the market: no unsold stock and no unmet demand.\n\nFrom equations Qd = a − bP and Qs = c + dP, set a − bP = c + dP and solve for P, then find Q. Example (imagined Kolhapur jaggery): 120 − 2P = 3P − 30 gives **₹${JE.p}** and **${JE.q} t**.`,
      terms: [['Equilibrium price', 'The price at which quantity demanded equals quantity supplied.'], ['Market-clearing', 'No surplus and no shortage at the ruling price.']],
      v: vEq,
      vs: [vSchedule],
    },
    {
      h: '2. Excess demand and excess supply',
      t: 1,
      b: `- **Excess demand** (price below E): buyers compete, the price **rises**; demand contracts and supply extends. At ₹20: ${qd(JD, 20)} − ${qs(JS, 20)} = **${ED20} t**.\n- **Excess supply** (price above E): sellers cut the price, which **falls**; demand extends and supply contracts. At ₹40: ${qs(JS, 40)} − ${qd(JD, 40)} = **${ES40} t**.\n\nDuring this adjustment no curve shifts: buyers and sellers move along their curves.`,
      terms: [['Excess demand', 'Quantity demanded minus quantity supplied at a price below equilibrium.'], ['Excess supply', 'Quantity supplied minus quantity demanded at a price above equilibrium.']],
      v: vExcess,
      vs: [vAdjust],
    },
    {
      h: '3. Changes in demand or in supply',
      t: [2, 3],
      b: '- **Demand increases:** price and quantity both rise. **Demand decreases:** both fall.\n- **Supply increases:** price falls, quantity rises. **Supply decreases:** price rises, quantity falls.\n\nTo calculate, solve the **new pair of equations**; the change in quantity is smaller than the shift because the price also changes.',
      terms: [['Shift', 'A change in a non-price determinant moves the whole curve.']],
      v: vSingle,
      vs: [vDShift, vSShift, vDemandWork],
    },
    {
      h: '4. Simultaneous changes',
      t: 3,
      b: `- **Same direction:** quantity is certain (rises if both increase); price depends on which shift is larger; **equal shifts leave the price unchanged**.\n- **Opposite directions:** price is certain (rises if demand rises and supply falls); quantity depends on the relative shifts.\n\nImagined check: Qd = 145 − 2P with Qs = 3P − 5 gives **₹${E_BOTH.p}** and **${E_BOTH.q} t**.`,
      terms: [['Simultaneous change', 'Demand and supply shifting in the same period.']],
      v: vSimultaneous,
      vs: [vBoth, vBothWork],
    },
    {
      h: '5. Price ceiling, rationing and black markets',
      t: 4,
      b: `A **price ceiling** is a legal **maximum** set **below** equilibrium to protect consumers. It creates a **shortage** (Qd > Qs). The government shares the supply by **rationing** (ration cards, fair-price shops), and some sellers sell secretly above the limit in a **black market**.\n\nImagined atta: at ₹${CEIL}, Qd = ${qd(AD, CEIL)} and Qs = ${qs(AS, CEIL)}, a shortage of **${SHORT25} t**.`,
      terms: [['Price ceiling', 'A legal maximum price below equilibrium.'], ['Rationing', 'Sharing a scarce good by quota rather than by price.'], ['Black market', 'Illegal sale of a controlled good above its legal price.']],
      v: vCeiling,
      vs: [vCeilWork, vCeilingEffects],
    },
    {
      h: '6. Price floor and minimum support price',
      t: 5,
      b: `A **price floor** is a legal **minimum** set **above** equilibrium to protect producers. It creates a **surplus** (Qs > Qd). In India, **minimum support prices** for notified crops are announced by the **Government of India** on the recommendation of the **CACP**; public agencies buy the surplus and hold it as **buffer stock**, part of which goes to ration shops.\n\nImagined lentils: at ${FLOOR}, Qs = ${qs(MS, FLOOR)} and Qd = ${qd(MD, FLOOR)}, a surplus of **${SURPLUS70}** thousand quintals.`,
      terms: [['Price floor', 'A legal minimum price above equilibrium.'], ['Minimum support price', 'The price at which the government stands ready to buy a notified crop.'], ['Buffer stock', 'Grain held by the government to steady supplies and prices.']],
      v: vFloor,
      vs: [vMsp, vFloorWork, vFloorPros, vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Placing a ceiling above equilibrium (it would have no effect) or a floor below it.\n- Saying excess demand shifts the demand curve: the adjustment is a movement along both curves.\n- Adding a shift to the old quantity instead of solving the new pair of equations.\n- Claiming a definite price change when both curves move the same way by unknown amounts.\n- Saying rationing removes a shortage: it only shares it.\n\n**How marks are usually awarded**\n- 1 mark: the correct option or a one-line answer.\n- 2 marks: two points, or a labelled diagram with one point.\n- 3 marks: working with the answer and a comment.\n- 5 marks: each part answered in order with diagrams.\n- Board papers also set 4-mark (2 + 2) and 8-mark (4 + 4) questions in parts.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Equilibrium price**', 'The price where quantity demanded equals quantity supplied.', 'definition', 1],
  ['Market-clearing price', 'Another name for the equilibrium price: no surplus, no shortage.', 'definition', 1],
  ['**Excess demand**', 'Quantity demanded minus quantity supplied, at a price below equilibrium.', 'definition', 1],
  ['**Excess supply**', 'Quantity supplied minus quantity demanded, at a price above equilibrium.', 'definition', 1],
  ['Price below equilibrium →', 'Excess demand; the price **rises** towards E.', 'concept', 1],
  ['Price above equilibrium →', 'Excess supply; the price **falls** towards E.', 'concept', 1],
  ['Equilibrium from equations', 'Set a − bP = c + dP, solve for P, then find Q.', 'formula', 1],
  [`Jaggery: 120 − 2P = 3P − 30`, `P = ₹${JE.p}, Q = ${JE.q} t.`, 'example', 1],
  ['During adjustment to E, do curves shift?', 'No: buyers and sellers move along their curves.', 'exam-tip', 1],
  ['Demand increases, supply fixed', 'Price **rises**, quantity **rises**.', 'concept', 2],
  ['Demand decreases, supply fixed', 'Price **falls**, quantity **falls**.', 'concept', 2],
  ['Festival demand Qd = 145 − 2P with Qs = 3P − 30', `₹${E_DUP.p} and ${E_DUP.q} t.`, 'example', 2],
  ['Supply increases, demand fixed', 'Price **falls**, quantity **rises**.', 'concept', 3],
  ['Supply decreases, demand fixed', 'Price **rises**, quantity **falls**.', 'concept', 3],
  ['Both increase', 'Quantity rises; price depends on which shift is larger.', 'concept', 3],
  ['Demand up, supply down', 'Price rises; quantity depends on the relative shifts.', 'concept', 3],
  ['Equal increases in demand and supply', 'Price **unchanged**, quantity **rises**.', 'concept', 3],
  ['Same-direction shifts: what is certain?', 'The change in **quantity**.', 'exam-tip', 3],
  ['Opposite-direction shifts: what is certain?', 'The change in **price**.', 'exam-tip', 3],
  ['**Price ceiling**', 'A legal maximum price, effective only below equilibrium.', 'definition', 4],
  ['Result of a ceiling', '**Shortage**: quantity demanded exceeds quantity supplied.', 'concept', 4],
  ['**Rationing**', 'Sharing a scarce good by quota, e.g. ration cards.', 'definition', 4],
  ['**Black market**', 'Illegal sale of a controlled good above the legal price.', 'definition', 4],
  [`Atta shortage at ₹${CEIL}`, `${qd(AD, CEIL)} − ${qs(AS, CEIL)} = ${SHORT25} t.`, 'example', 4],
  ['**Price floor**', 'A legal minimum price, effective only above equilibrium.', 'definition', 5],
  ['Result of a floor', '**Surplus**: quantity supplied exceeds quantity demanded.', 'concept', 5],
  ['Who announces MSP?', 'The Government of India, on the recommendation of the **CACP**.', 'fact', 5],
  ['What happens to the MSP surplus?', 'Bought by public agencies and held as **buffer stock**.', 'concept', 5],
  [`Lentil surplus at ${FLOOR}`, `${qs(MS, FLOOR)} − ${qd(MD, FLOOR)} = ${SURPLUS70} thousand quintals.`, 'example', 5],
  ['Ceiling vs floor: who is helped?', 'Ceiling: consumers. Floor: producers.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Market Mechanism: Equilibrium Price',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_eq_meaning', 'm_demand_up', 'm_supply_up', 'm_ceiling_meaning', 'ar_eq_stable'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_kite_schedule', { attempt: 1, keys: ['s_dincrease_diag', 's_supply_diag'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_pulp_full', { attempt: 1, keys: ['s3_ceiling_diag', 's3_floor_diag'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working and a described diagram.', items: ['l_eq_adjust'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Market Mechanism: Equilibrium Price',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_jaggery_read', 'm_excess_demand_def', 'm_excess_supply_tomato', 'm_adjust_signal', 'm_dshift_numbers', 'm_dshift_cause', 'm_sshift_numbers', 'm_both_opposite', 'm_ceiling_shortage', 'm_floor_surplus', 'ar_supply_up', 'ar_ceiling_bm'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_why_clears', 's_dfall_reason', { attempt: 1, keys: ['s_opp_quantity', 's_ceiling_aim'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_dup_numbers', 's3_supply_numbers', 's3_ceiling_numbers', { attempt: 1, keys: ['s3_four_cases', 's3_floor_cost'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22. Answer each in parts.', items: ['l_simultaneous', { attempt: 1, keys: ['l_ceiling_full', 'l_floor_full'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch06 only (equilibrium and disequilibrium; changes in demand; changes in supply and simultaneous changes; price ceiling, rationing and black markets; price floor and minimum support price); no removed topics for this chapter',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs incl. diagram and equation reading, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every market, town, schedule and case written for this chapter (imagined); no textbook, specimen or past-paper item reused (the specimen\'s app-cab ceiling item is not used)',
    data: `all equilibria computed in questions.mjs and asserted: jaggery E (${JE.p}, ${JE.q}), ED ${ED20} at ₹20, ES ${ES40} at ₹40, demand up (${E_DUP.p}, ${E_DUP.q}), down (${E_DDOWN.p}, ${E_DDOWN.q}), supply up (${E_SUP.p}, ${E_SUP.q}), down (${E_SDOWN.p}, ${E_SDOWN.q}), both up (${E_BOTH.p}, ${E_BOTH.q}); atta E (${AE.p}, ${AE.q}) shortage ${SHORT25} at ₹${CEIL}; lentils E (${ME.p}, ${ME.q}) surplus ${SURPLUS70} at ${FLOOR}; pulp E (${PE.p}, ${PE.q}); SVG curves drawn from the same equations`,
    facts: 'MSP for notified crops announced by the Government of India on the recommendation of the CACP; procured stock held as buffer stock and used for ration shops (stated broadly; no MSP values)',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
