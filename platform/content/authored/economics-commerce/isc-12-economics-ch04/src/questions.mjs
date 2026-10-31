// ISC 12 Economics, ch04 Elasticity of Demand — question bank. Every buyer, shop, town and figure is imagined by
// SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a stem,
// key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Removed topic (ISC 2027): numericals are set on the PERCENTAGE method only. The total-expenditure and point
// (geometric) methods appear conceptually: directions of change, segment ratios described in words, no calculations.
// Convention used throughout: Ed = (percentage change in quantity demanded) ÷ (percentage change in price), with
// changes measured from the INITIAL price and quantity; the minus sign that the inverse relation gives is dropped,
// so Ed is reported as a positive number (stated in every numerical solution).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

export const r3 = (x) => Math.round(x * 1000) / 1000;
const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
/** Percentage change from the initial value, rounded to 3 decimals. */
export const pct = (a, b) => r3(((b - a) / a) * 100);
/** Price elasticity by the percentage method (absolute value). */
export const ed = (p0, p1, q0, q1) => r3(Math.abs(pct(q0, q1) / pct(p0, p1)));
const fmtIN = (n) => n.toLocaleString('en-IN');

// ---------------------------------------------------------------- shared imagined data (all asserted)
// Idli plates at an imagined Chennai tiffin centre: price ₹40 → ₹32, plates 200 → 260 a morning.
export const IDLI = { p0: 40, p1: 32, q0: 200, q1: 260 };
export const IDLI_ED = ed(IDLI.p0, IDLI.p1, IDLI.q0, IDLI.q1);
assert(pct(IDLI.p0, IDLI.p1) === -20 && pct(IDLI.q0, IDLI.q1) === 30 && IDLI_ED === 1.5, 'idli');

// Kites before Uttarayan in an imagined Ahmedabad pol: Ed 0.8, price ₹50 → ₹55, initial 500 kites a day.
export const KITE = { p0: 50, p1: 55, q0: 500, e: 0.8 };
export const KITE_Q1 = r3(KITE.q0 * (1 - (KITE.e * pct(KITE.p0, KITE.p1)) / 100));
assert(pct(KITE.p0, KITE.p1) === 10 && KITE_Q1 === 460, 'kite');

// Tender coconuts on an imagined Goa beach: Ed 2, sales 400 → 480 a day after a price cut from ₹30.
export const COCO = { p0: 30, q0: 400, q1: 480, e: 2 };
export const COCO_P1 = r3(COCO.p0 * (1 - pct(COCO.q0, COCO.q1) / COCO.e / 100));
assert(pct(COCO.q0, COCO.q1) === 20 && COCO_P1 === 27, 'coconut');

// Rosogolla boxes at an imagined Kolkata sweet shop: ₹200 → ₹160, boxes 150 → 180 a day (unitary).
export const ROSO = { p0: 200, p1: 160, q0: 150, q1: 180 };
export const ROSO_ED = ed(ROSO.p0, ROSO.p1, ROSO.q0, ROSO.q1);
assert(ROSO_ED === 1, 'rosogolla');

// Iodised salt in an imagined Kanpur kirana store: ₹20 → ₹25 a kg, 400 kg → 380 kg a week.
export const SALT = { p0: 20, p1: 25, q0: 400, q1: 380 };
export const SALT_ED = ed(SALT.p0, SALT.p1, SALT.q0, SALT.q1);
assert(pct(SALT.p0, SALT.p1) === 25 && pct(SALT.q0, SALT.q1) === -5 && SALT_ED === 0.2, 'salt');

// Cinema tickets in an imagined Indore multiplex: Ed 1.25; a price cut of 8 per cent → quantity rises 10 per cent.
export const CINEMA = { e: 1.25, dp: -8 };
export const CINEMA_DQ = r3(CINEMA.e * -CINEMA.dp);
assert(CINEMA_DQ === 10, 'cinema');

// Paneer at an imagined Ludhiana dairy: Ed 0.6, quantity 250 → 235 kg a day after a price rise from ₹80.
export const PANEER = { p0: 80, q0: 250, q1: 235, e: 0.6 };
export const PANEER_DP = r3(-pct(PANEER.q0, PANEER.q1) / PANEER.e);
export const PANEER_P1 = r3(PANEER.p0 * (1 + PANEER_DP / 100));
assert(pct(PANEER.q0, PANEER.q1) === -6 && PANEER_DP === 10 && PANEER_P1 === 88, 'paneer');

// Insulin vials at an imagined Bhopal chemist: price ₹300 → ₹360, 30 vials a month both times (Ed 0).
export const INSULIN = { p0: 300, p1: 360, q0: 30, q1: 30 };
export const INSULIN_ED = ed(INSULIN.p0, INSULIN.p1, INSULIN.q0, INSULIN.q1);
assert(INSULIN_ED === 0, 'insulin');

// Auto-rickshaw rides in an imagined Jaipur colony: price ₹60 → ₹66 a ride, rides 1,200 → 1,020 a week.
export const AUTO = { p0: 60, p1: 66, q0: 1200, q1: 1020 };
export const AUTO_ED = ed(AUTO.p0, AUTO.p1, AUTO.q0, AUTO.q1);
assert(pct(AUTO.p0, AUTO.p1) === 10 && pct(AUTO.q0, AUTO.q1) === -15 && AUTO_ED === 1.5, 'auto');

// Notebooks at an imagined Patna stationery shop: Ed 0.5, price ₹40 → ₹50, initial 600 notebooks a week.
export const NOTE = { p0: 40, p1: 50, q0: 600, e: 0.5 };
export const NOTE_Q1 = r3(NOTE.q0 * (1 - (NOTE.e * pct(NOTE.p0, NOTE.p1)) / 100));
assert(pct(NOTE.p0, NOTE.p1) === 25 && NOTE_Q1 === 525, 'notebook');

// Mobile data packs in an imagined Shillong store: Ed 3, price falls 5 per cent; quantity rises 15 per cent.
export const DATA = { e: 3, dp: -5 };
export const DATA_DQ = r3(DATA.e * -DATA.dp);
assert(DATA_DQ === 15, 'data packs');

// Two traders compared in a case: Lucknow chikan kurtas (₹800 → ₹720, 50 → 60 a week) and
// Lucknow lemons (₹100 → ₹90 a kg, 200 → 206 kg a week).
export const KURTA = { p0: 800, p1: 720, q0: 50, q1: 60 };
export const LEMON = { p0: 100, p1: 90, q0: 200, q1: 206 };
export const KURTA_ED = ed(KURTA.p0, KURTA.p1, KURTA.q0, KURTA.q1);
export const LEMON_ED = ed(LEMON.p0, LEMON.p1, LEMON.q0, LEMON.q1);
assert(KURTA_ED === 2 && LEMON_ED === 0.3, 'kurta lemon');

const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ================================================================ t01 Meaning and degrees of price elasticity
Q('m_ed_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Price elasticity of demand for a good measures',
  opts: [
    'how strongly the quantity demanded responds to a change in the good\'s own price',
    'how strongly the price responds to a change in the quantity supplied',
    'the change in demand caused by a change in consumers\' income',
    'the total amount buyers spend on the good in a year',
  ],
  sol: 'It is the degree of responsiveness of quantity demanded to a change in the good\'s own price. Income responses are income elasticity; spending totals and supply responses are different ideas.',
}));
Q('m_horizontal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A government milk booth in an imagined Bhubaneswar ward sells any quantity at a fixed ₹54 a litre, and at even a paisa more nobody buys from it. The demand curve facing the booth is',
  opts: ['a horizontal straight line (perfectly elastic)', 'a vertical straight line (perfectly inelastic)', 'a rectangular hyperbola (unitary elastic)', 'a steep downward line (relatively inelastic)'],
  sol: 'Any quantity is bought at one price and none at a slightly higher price: elasticity is infinite and the demand curve is horizontal. A vertical line would mean quantity never changes.',
}));
Q('m_vertical', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A patient in an imagined Bhopal hospital needs exactly 30 insulin vials a month whatever their price. Her demand curve for insulin is best drawn as',
  opts: ['a vertical line at 30 vials', 'a horizontal line at the current price', 'a curve on which price × quantity is constant', 'a gently sloping downward line'],
  sol: 'Quantity does not change at all when price changes, so Ed = 0 and the curve is vertical at 30 vials.',
}));
Q('m_unitary_shape', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On a demand curve that has unitary elasticity at every point, the product of price and quantity',
  opts: ['stays the same at every point, so the curve is a rectangular hyperbola', 'doubles whenever the price is halved', 'is zero where the curve meets the price axis', 'rises as we move down the curve'],
  sol: 'With Ed = 1 everywhere, a given percentage fall in price is matched by an equal percentage rise in quantity, so spending P × Q is constant: the curve is a rectangular hyperbola.',
}));
Q('m_flat_steep', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Two straight demand curves for paper kites in an imagined Ahmedabad pol pass through the same point. Curve K is much flatter than curve M. At that common point,',
  opts: ['demand on K is more elastic than on M', 'demand on M is more elastic than on K', 'both have unitary elasticity', 'elasticity cannot be compared at a common point'],
  sol: 'Through a common point, Ed = (ΔQ/ΔP) × (P/Q) has the same P/Q, so the flatter curve (larger ΔQ for a given ΔP) is more elastic.',
}));
Q('m_relatively_elastic', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Demand is called relatively elastic when',
  opts: ['the percentage change in quantity demanded is greater than the percentage change in price', 'quantity demanded does not change at all when price changes', 'the percentage changes in quantity and price are equal', 'quantity demanded becomes infinite at a given price'],
  sol: 'Relatively elastic means Ed > 1: quantity responds more than in proportion to price. The other options describe Ed = 0, Ed = 1 and Ed = ∞.',
}));
Q('tf_unit_free', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Price elasticity of demand is a pure number, so the elasticity for rice in kilograms is the same as in quintals.',
  sol: 'It compares two percentage changes, so the units cancel; measuring rice in kilograms or quintals leaves the coefficient unchanged.',
}));
Q('fb_perfectly_inelastic', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'When quantity demanded does not change at all as price changes, demand is perfectly ___ and the coefficient of elasticity is ___.',
  acc: [['inelastic'], ['zero', '0']],
  sol: 'An unchanged quantity means demand is perfectly inelastic with a coefficient of zero (0).',
}));
Q('mt_degrees', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each value of the price elasticity coefficient with the shape of the demand curve that shows it.',
  pairs: [
    ['Ed = 0', 'Vertical straight line'],
    ['Ed = ∞', 'Horizontal straight line'],
    ['Ed = 1 at every point', 'Rectangular hyperbola'],
    ['Ed greater than 1 through a point', 'Flatter downward-sloping line'],
  ],
  sol: 'Zero response gives a vertical line, infinite response a horizontal line, constant spending a rectangular hyperbola, and a strong response a flatter curve.',
}));
Q('ar_slope_vs_ed', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Two demand curves drawn through the same point can have different elasticities at that point.',
  r: 'Price elasticity of demand depends only on the slope of the demand curve.',
  sol: 'A is true: through a common point the flatter curve is more elastic. R is false: elasticity depends on the slope and on the ratio P/Q (Ed = (ΔQ/ΔP) × (P/Q)), not on slope alone.',
}));
Q('s_five_degrees', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the five degrees of price elasticity of demand and state the value or range of the coefficient for each.',
  model: '1. **Perfectly elastic:** Ed = ∞. 2. **Perfectly inelastic:** Ed = 0. 3. **Unitary elastic:** Ed = 1. 4. **Relatively elastic:** Ed > 1. 5. **Relatively inelastic:** Ed lies between 0 and 1.',
  sol: 'Five names, each with its coefficient.',
  scheme: [['Three degrees correct with values', 1], ['Remaining two degrees correct', 1]],
}));
Q('s_unitary_spend', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A family in an imagined Kolkata neighbourhood always spends exactly ₹600 a month on sweets, whatever their price. What is its price elasticity of demand for sweets? Explain.',
  model: 'The family keeps **total spending constant**, so any percentage rise in price is matched by an equal percentage fall in quantity. Its demand is **unitary elastic (Ed = 1)**, and its demand curve is a **rectangular hyperbola**.',
  sol: 'Constant outlay implies Ed = 1.',
  scheme: [['Constant spending linked to equal percentage changes', 1], ['Unitary elasticity identified', 1]],
}));
Q('s3_flat_vs_steep', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Rohan says, "A flatter demand curve is always more elastic than a steeper one." Comment on his statement with reference to two straight-line demand curves for bus passes in an imagined Nagpur depot.',
  model: 'Rohan is right only **at a common point**. Ed = (ΔQ/ΔP) × (P/Q): where two lines cross, **P/Q is the same**, so the **flatter** line (larger ΔQ for each rupee) has the higher elasticity. But **at different points** the P/Q ratios differ, so a flatter line at a low price can be **less elastic** than a steeper line at a high price. Slope alone does not decide elasticity.',
  sol: 'Correct at a common point; not in general, because elasticity also depends on P/Q.',
  scheme: [['Formula with slope and P/Q', 1], ['True at a common point', 1], ['Not true in general, with reason', 1]],
}));
Q('s3_draw_three', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the diagrams of perfectly elastic, perfectly inelastic and unitary elastic demand, naming the axes and the shape of each curve.',
  model: 'In each diagram **quantity** is on the x-axis and **price** on the y-axis. **Perfectly elastic:** a **horizontal line** at one price; any quantity is sold there. **Perfectly inelastic:** a **vertical line** at one quantity; it does not change with price. **Unitary elastic:** a **rectangular hyperbola**, where price times quantity is the same at every point.',
  sol: 'Axes plus three shapes.',
  scheme: [['Horizontal line for perfectly elastic', 1], ['Vertical line for perfectly inelastic', 1], ['Rectangular hyperbola for unitary', 1]],
}));
Q('l_degrees', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the five degrees of price elasticity of demand, describing the demand curve for each, and give an imagined Indian example of a good that might show each degree.',
  model: '1. **Perfectly elastic (Ed = ∞):** a **horizontal** curve; any quantity at one price — a government booth selling milk at a fixed price.\n2. **Perfectly inelastic (Ed = 0):** a **vertical** curve — insulin for a diabetic patient.\n3. **Unitary elastic (Ed = 1):** a **rectangular hyperbola**; spending stays the same — a family with a fixed sweets budget.\n4. **Relatively elastic (Ed > 1):** a **flatter** curve; quantity responds strongly — restaurant meals or branded clothes.\n5. **Relatively inelastic (Ed between 0 and 1):** a **steeper** curve; quantity responds weakly — salt or matchboxes.',
  sol: 'Five degrees, each with value, curve and example.',
  scheme: [['Perfectly elastic with curve and example', 1], ['Perfectly inelastic with curve and example', 1], ['Unitary with curve and example', 1], ['Relatively elastic with curve and example', 1], ['Relatively inelastic with curve and example', 1]],
}));

// ================================================================ t02 Percentage method (numericals)
Q('n_idli', num({
  t: 2, d: 2, c: 'application', marks: 2, value: IDLI_ED,
  stem: `An imagined Chennai tiffin centre cuts the price of an idli plate from ₹${IDLI.p0} to ₹${IDLI.p1}, and morning sales rise from ${IDLI.q0} to ${IDLI.q1} plates. Calculate the price elasticity of demand by the percentage method.`,
  sol: `Step 1: Percentage change in quantity = (${IDLI.q1} − ${IDLI.q0}) ÷ ${IDLI.q0} × 100 = ${pct(IDLI.q0, IDLI.q1)}.\nStep 2: Percentage change in price = (${IDLI.p1} − ${IDLI.p0}) ÷ ${IDLI.p0} × 100 = ${pct(IDLI.p0, IDLI.p1)}.\nStep 3: Ed = ${pct(IDLI.q0, IDLI.q1)} ÷ 20 = ${IDLI_ED} (minus sign dropped). Demand is relatively elastic.`,
  scheme: [['Both percentage changes correct', 1], [`Ed = ${IDLI_ED}`, 1]],
}));
Q('n_kite', num({
  t: 2, d: 3, c: 'application', marks: 2, value: KITE_Q1, unit: 'kites',
  stem: `In an imagined Ahmedabad pol a kite seller sells ${KITE.q0} kites a day at ₹${KITE.p0} each. Her price elasticity of demand is ${KITE.e}. How many kites a day will she sell if she raises the price to ₹${KITE.p1}?`,
  sol: `Step 1: Percentage rise in price = 5 ÷ 50 × 100 = ${pct(KITE.p0, KITE.p1)}.\nStep 2: Percentage fall in quantity = ${KITE.e} × 10 = 8.\nStep 3: New quantity = ${KITE.q0} − 8 per cent of ${KITE.q0} = ${KITE.q0} − 40 = ${KITE_Q1} kites.`,
  scheme: [['Percentage change in price and quantity', 1], [`New quantity ${KITE_Q1}`, 1]],
}));
Q('n_coconut', num({
  t: 2, d: 3, c: 'application', marks: 2, value: COCO_P1, unit: '₹',
  stem: `A tender-coconut seller on an imagined Goa beach sells ${COCO.q0} coconuts a day at ₹${COCO.p0} each. Her price elasticity of demand is ${COCO.e}. To what price must she cut her coconuts to sell ${COCO.q1} a day?`,
  sol: `Step 1: Percentage rise in quantity = 80 ÷ 400 × 100 = ${pct(COCO.q0, COCO.q1)}.\nStep 2: Required percentage fall in price = 20 ÷ ${COCO.e} = 10.\nStep 3: New price = ${COCO.p0} − 10 per cent of ${COCO.p0} = ₹${COCO_P1}.`,
  scheme: [['Percentage change in quantity and required price change', 1], [`New price ₹${COCO_P1}`, 1]],
}));
Q('n_paneer', num({
  t: 2, d: 3, c: 'application', marks: 2, value: PANEER_P1, unit: '₹',
  stem: `An imagined Ludhiana dairy raised the price of paneer from ₹${PANEER.p0} a kg, and daily sales fell from ${PANEER.q0} kg to ${PANEER.q1} kg. If its price elasticity of demand is ${PANEER.e}, what is the new price of paneer?`,
  sol: `Step 1: Percentage fall in quantity = 15 ÷ 250 × 100 = 6.\nStep 2: Percentage rise in price = 6 ÷ ${PANEER.e} = ${PANEER_DP}.\nStep 3: New price = ${PANEER.p0} + 10 per cent of ${PANEER.p0} = ₹${PANEER_P1}.`,
  scheme: [['Percentage changes', 1], [`New price ₹${PANEER_P1}`, 1]],
}));
Q('n_cinema', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: CINEMA_DQ, unit: '%',
  stem: `The price elasticity of demand for tickets at an imagined Indore multiplex is ${CINEMA.e}. By what percentage will the number of tickets sold rise if the multiplex cuts its ticket price by 8 per cent?`,
  sol: `Percentage change in quantity = Ed × percentage change in price = ${CINEMA.e} × 8 = ${CINEMA_DQ} per cent rise.`,
}));
Q('m_salt_value', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A kirana store in an imagined Kanpur market raises iodised salt from ₹${SALT.p0} to ₹${SALT.p1} a kg, and its weekly sales fall from ${SALT.q0} kg to ${SALT.q1} kg. The price elasticity of demand for salt here is`,
  opts: [String(SALT_ED), '5', '0.25', '1.25'],
  sol: `Quantity falls 20 ÷ 400 = 5 per cent; price rises 5 ÷ 20 = 25 per cent; Ed = 5 ÷ 25 = ${SALT_ED} (relatively inelastic). 5 inverts the ratio; 0.25 and 1.25 use wrong bases.`,
}));
Q('m_rosogolla_degree', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `An imagined Kolkata sweet shop cuts the price of a rosogolla box from ₹${ROSO.p0} to ₹${ROSO.p1}, and sales rise from ${ROSO.q0} to ${ROSO.q1} boxes a day. Demand for the boxes is`,
  opts: ['unitary elastic', 'relatively elastic', 'relatively inelastic', 'perfectly elastic'],
  sol: `Price falls 40 ÷ 200 = 20 per cent and quantity rises 30 ÷ 150 = 20 per cent, so Ed = ${ROSO_ED}: unitary elastic.`,
}));
Q('m_auto_value', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Auto-rickshaw drivers in an imagined Jaipur colony raise the fare from ₹${AUTO.p0} to ₹${AUTO.p1} a ride, and weekly rides fall from ${fmtIN(AUTO.q0)} to ${fmtIN(AUTO.q1)}. The price elasticity of demand for these rides is`,
  opts: [String(AUTO_ED), '0.67', '1', '15'],
  sol: `Quantity falls 180 ÷ 1200 = 15 per cent; price rises 6 ÷ 60 = 10 per cent; Ed = 15 ÷ 10 = ${AUTO_ED}, relatively elastic. 0.67 inverts the ratio and 15 forgets to divide.`,
}));
Q('m_base_values', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the ISC percentage (proportionate) method used in this chapter, the percentage changes in price and quantity are calculated from',
  opts: ['the initial (original) price and quantity', 'the new price and quantity', 'the average of the old and new values', 'the highest price on the demand schedule'],
  sol: 'The proportionate method divides each change by its original value: ΔQ/Q and ΔP/P with Q and P the initial values.',
}));
Q('m_insulin_zero', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: `A chemist in an imagined Bhopal market raises the price of a vial of insulin from ₹${INSULIN.p0} to ₹${INSULIN.p1}; a regular patient still buys ${INSULIN.q0} vials a month. Her price elasticity of demand is`,
  opts: [String(INSULIN_ED), '1', '0.2', 'infinite'],
  sol: `The quantity does not change, so the percentage change in quantity is zero and Ed = ${INSULIN_ED} (perfectly inelastic) whatever the price change.`,
}));
Q('ar_sign', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'The price elasticity coefficient worked out from a normal demand schedule comes out negative before its sign is dropped.',
  r: 'Price and quantity demanded change in opposite directions along a normal demand curve.',
  sol: 'Both are true and R explains A: because price and quantity move in opposite directions, the ratio of their percentage changes is negative; by convention the minus sign is dropped and Ed is reported as a positive number.',
}));
Q('s_formula', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Write the formula for price elasticity of demand by the percentage method and explain each symbol in it.',
  model: '**Ed = (ΔQ ÷ Q) ÷ (ΔP ÷ P) = (ΔQ ÷ ΔP) × (P ÷ Q)**, where **ΔQ** is the change in quantity demanded, **Q** the original quantity, **ΔP** the change in price and **P** the original price.',
  sol: 'Formula with symbols defined.',
  scheme: [['Correct formula', 1], ['Symbols explained', 1]],
}));
Q('s_notebook', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `A stationery shop in an imagined Patna lane sells ${NOTE.q0} notebooks a week at ₹${NOTE.p0}. The price elasticity of demand is ${NOTE.e}. Find the weekly sales if the price rises to ₹${NOTE.p1}.`,
  model: `Price rises **10 ÷ 40 × 100 = 25 per cent**. Quantity falls **${NOTE.e} × 25 = 12.5 per cent**, that is 75 notebooks. New sales = **${NOTE.q0} − 75 = ${NOTE_Q1} notebooks** a week.`,
  sol: 'Percentage price change, percentage quantity change, new quantity.',
  scheme: [['Percentage changes', 1], [`New sales ${NOTE_Q1}`, 1]],
}));
Q('s3_auto_judge', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: `The auto-rickshaw union of an imagined Jaipur colony raised fares from ₹${AUTO.p0} to ₹${AUTO.p1}, and weekly rides fell from ${fmtIN(AUTO.q0)} to ${fmtIN(AUTO.q1)}. Calculate the price elasticity of demand and judge whether the fare rise was wise for the drivers' total earnings.`,
  model: `Quantity falls **180 ÷ 1200 = 15 per cent**; price rises **6 ÷ 60 = 10 per cent**; **Ed = 15 ÷ 10 = ${AUTO_ED}**, so demand is **relatively elastic**. When demand is elastic, a **higher fare lowers total earnings**, because the proportionate fall in rides outweighs the higher fare per ride. The rise was **not wise** for the drivers.`,
  sol: 'Compute Ed, classify, and link elasticity to total earnings.',
  scheme: [['Ed calculated correctly', 1], ['Classified as elastic', 1], ['Judgement on earnings with reason', 1]],
}));
Q('s3_data_packs', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `A mobile store in an imagined Shillong market finds that the price elasticity of demand for its data packs is ${DATA.e}. It cuts the price of a pack by 5 per cent. By what percentage will sales rise, and what does this tell the store about its pricing?`,
  model: `Percentage rise in sales = **Ed × percentage fall in price = ${DATA.e} × 5 = ${DATA_DQ} per cent**. Demand is **highly elastic**: a small price cut brings a much larger rise in sales, so **total spending on its packs rises**. The store gains customers and revenue by keeping its prices **low**, as long as its costs allow.`,
  sol: 'Percentage change in quantity and its pricing meaning.',
  scheme: [[`Rise of ${DATA_DQ} per cent`, 1], ['Elastic demand recognised', 1], ['Pricing implication', 1]],
}));
Q('l_numericals', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts. [2 + 3]\n\n(a) An imagined Chennai tiffin centre cuts the price of an idli plate from ₹${IDLI.p0} to ₹${IDLI.p1}, and sales rise from ${IDLI.q0} to ${IDLI.q1} plates a morning. Calculate the price elasticity of demand.\n(b) A tender-coconut seller in an imagined Goa beach sells ${COCO.q0} coconuts a day at ₹${COCO.p0}; her Ed is ${COCO.e}. Find the price at which she will sell ${COCO.q1} a day, and state whether her takings are likely to rise.`,
  model: `(a) Quantity rises **60 ÷ 200 = 30 per cent**; price falls **8 ÷ 40 = 20 per cent**; **Ed = 30 ÷ 20 = ${IDLI_ED}** (minus sign dropped), so demand is **relatively elastic**.\n(b) Quantity must rise **80 ÷ 400 = 20 per cent**. With Ed = ${COCO.e}, the price must fall **20 ÷ 2 = 10 per cent**, so the new price is **₹${COCO_P1}**. As demand is **elastic**, the proportionate rise in sales exceeds the fall in price, so her **takings rise**.`,
  sol: 'Percentage method in (a); unknown price and takings in (b).',
  scheme: [['(a) percentage changes', 1], ['(a) Ed and degree', 1], ['(b) required percentage price change', 1], ['(b) new price', 1], ['(b) takings compared', 1]],
}));

// ================================================================ t03 Total expenditure (outlay) method — conceptual only
Q('m_te_elastic', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under the total expenditure method, demand for a good is elastic (Ed > 1) when',
  opts: ['a fall in price raises total spending on it and a rise in price lowers it', 'total spending stays the same whatever the price', 'a fall in price lowers total spending on it', 'total spending moves in the same direction as price'],
  sol: 'With elastic demand quantity changes proportionately more than price, so spending moves opposite to price. Unchanged spending means unitary; spending moving with price means inelastic.',
}));
Q('m_te_inelastic', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'After a cooking-gas cylinder became dearer, households in an imagined Kanpur colony bought slightly fewer refills, yet their total spending on gas rose. Using the outlay method, their demand for gas is',
  opts: ['relatively inelastic', 'relatively elastic', 'unitary elastic', 'perfectly elastic'],
  sol: 'Price rose and total spending also rose (same direction), so quantity fell proportionately less than price: demand is relatively inelastic.',
}));
Q('m_te_unchanged', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Readers of an imagined Mysuru newspaper spend the same total amount on it before and after its cover price changes. By the outlay method, their demand is',
  opts: ['unitary elastic', 'perfectly elastic', 'perfectly inelastic', 'relatively elastic'],
  sol: 'Unchanged total spending when price changes indicates Ed = 1.',
}));
Q('tf_te_limit', tf({
  t: 3, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? The total expenditure method gives the exact numerical value of price elasticity, such as 1.6 or 0.4.',
  sol: 'False. It only tells whether demand is elastic, unitary or inelastic, from the direction of change in spending; it cannot give an exact coefficient.',
}));
Q('ar_te', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'If the price of a good falls and buyers\' total expenditure on it also falls, demand is relatively inelastic.',
  r: 'With inelastic demand, the percentage rise in quantity is smaller than the percentage fall in price.',
  sol: 'Both are true and R explains A: the small rise in quantity cannot make up for the lower price, so spending falls with price, which marks inelastic demand.',
}));
Q('s_te_table', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State how total expenditure changes when price falls in each of the three cases of the outlay method: elastic, unitary and inelastic demand.',
  model: 'When price **falls**: with **elastic** demand total expenditure **rises**; with **unitary** demand it **stays the same**; with **inelastic** demand it **falls**. (A price rise reverses the first and last results.)',
  sol: 'Three cases with direction of spending.',
  scheme: [['Elastic and inelastic cases', 1], ['Unitary case', 1]],
}));
Q('s3_te_shopkeeper', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A textile shop in an imagined Surat market cut the prices of its sarees during a sale. The owner noticed that the money customers spent on sarees went up sharply. What can he conclude about the elasticity of demand, and should he repeat the sale for this good? Explain using the outlay method.',
  model: 'Price **fell** and total spending **rose**: spending moved **opposite** to price, so by the outlay method demand for his sarees is **elastic (Ed > 1)**. Buyers responded with a proportionately larger rise in purchases. A repeat sale should again **raise his revenue**, provided the extra sarees do not cost him more than they bring in.',
  sol: 'Opposite movement implies elastic; implication for revenue.',
  scheme: [['Direction of price and spending', 1], ['Elastic demand concluded', 1], ['Advice with reason', 1]],
}));

// ================================================================ t04 Point (geometric) method — conceptual only
Q('m_point_formula', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'By the point (geometric) method, price elasticity of demand at a point on a straight-line demand curve is equal to',
  opts: ['the lower segment divided by the upper segment', 'the upper segment divided by the lower segment', 'the slope of the line multiplied by the price', 'the length of the whole line'],
  sol: 'Ed at a point = lower segment (from the point to the quantity axis) ÷ upper segment (from the point to the price axis).',
}));
Q('m_point_mid', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'On a straight-line demand curve that meets both axes, elasticity equals one at',
  opts: ['the mid-point of the line', 'the point where it meets the price axis', 'the point where it meets the quantity axis', 'every point, because the line is straight'],
  sol: 'At the mid-point the lower and upper segments are equal, so Ed = 1. At the price axis Ed is infinite; at the quantity axis it is zero.',
}));
Q('m_point_upper', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'A point lies on the upper half of a straight-line demand curve for gym memberships in an imagined Pune suburb, closer to the price axis. At that point demand is',
  opts: ['relatively elastic, because the lower segment is longer than the upper segment', 'relatively inelastic, because the lower segment is shorter', 'unitary elastic, because the line is straight', 'perfectly inelastic, because the price is high'],
  sol: 'Above the mid-point the lower segment exceeds the upper one, so their ratio is greater than 1: relatively elastic.',
}));
Q('fb_axis_ends', fb({
  t: 4, d: 2, c: 'understanding',
  stem: 'On a straight-line demand curve, elasticity is ___ at the point where the line meets the price axis and ___ where it meets the quantity axis.',
  acc: [['infinite', 'infinity'], ['zero', '0']],
  sol: 'At the price axis the upper segment is zero, so Ed is infinite; at the quantity axis the lower segment is zero, so Ed is zero (0).',
}));
Q('s_point_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why elasticity is different at different points of the same straight-line demand curve.',
  model: 'On a straight line the **slope is constant**, but **P ÷ Q changes**: high at the top, low at the bottom. So the **lower-to-upper segment ratio** falls down the line, from very elastic near the price axis to very inelastic near the quantity axis.',
  sol: 'Constant slope but changing P/Q, so changing segment ratio.',
  scheme: [['Constant slope, changing P/Q', 1], ['Segment ratio falls down the line', 1]],
}));
Q('s3_point_five', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A straight-line demand curve for cycle repairs in an imagined Ludhiana market meets both axes. Using the point method, describe the elasticity at five positions on it: at the price axis, above the mid-point, at the mid-point, below the mid-point and at the quantity axis.',
  model: 'With **Ed = lower segment ÷ upper segment**: at the **price axis** the upper segment is zero, so **Ed = ∞**; **above the mid-point** the lower segment is longer, so **Ed > 1**; at the **mid-point** the segments are equal, so **Ed = 1**; **below the mid-point** **Ed < 1**; at the **quantity axis** the lower segment is zero, so **Ed = 0**.',
  sol: 'Five positions with reasons.',
  scheme: [['Two axis ends', 1], ['Mid-point', 1], ['Above and below the mid-point', 1]],
}));
Q('l_point_method', long({
  t: [4, 1], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Answer both parts. [2 + 3]\n\n(a) Explain the point (geometric) method of measuring price elasticity of demand on a straight-line demand curve.\n(b) For a non-linear (curved) demand curve, explain how elasticity at a point is found, and show that a straight line cannot have the same elasticity at every point.',
  model: '(a) Take a point on the line and split the line there. Elasticity at the point is the **lower segment** (from the point to the quantity axis) **divided by the upper segment** (from the point to the price axis). At the mid-point the two are equal, so Ed = 1.\n(b) For a curve, draw a **tangent** at the point and extend it to both axes; elasticity is the **lower segment of the tangent divided by its upper segment**. A straight line has a constant slope, but **P ÷ Q falls** as we move down it, so the segment ratio falls from **infinity at the price axis** to **zero at the quantity axis**. Only a **rectangular hyperbola** keeps Ed = 1 everywhere.',
  sol: 'Segment ratio on a line; tangent for a curve; changing ratio along a line.',
  scheme: [['(a) lower ÷ upper segment', 1], ['(a) mid-point result', 1], ['(b) tangent method', 1], ['(b) why a line\'s elasticity changes', 1], ['(b) end values or hyperbola contrast', 1]],
}));

// ================================================================ t05 Factors affecting price elasticity
Q('m_substitutes_factor', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Demand for one brand of bathing soap in an imagined Coimbatore supermarket is highly elastic mainly because',
  opts: ['many close substitutes are available on the same shelf', 'soap takes a large share of a family\'s income', 'soap has only one use', 'buyers cannot postpone buying soap'],
  sol: 'A single brand faces many close substitutes, so a small price rise sends buyers to other brands. A small budget share and urgency would make demand less elastic.',
}));
Q('m_share_income', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A family in an imagined Varanasi colony hardly changes its purchase of matchboxes when their price rises by half. The best explanation is that',
  opts: ['matchboxes take a tiny share of the family\'s income', 'matchboxes have many substitutes', 'matchboxes are a luxury', 'the family expects their price to fall'],
  sol: 'Goods on which only a tiny part of income is spent have inelastic demand: even a large percentage price rise barely affects the budget.',
}));
Q('m_time_period', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'When petrol prices rose, commuters in an imagined Hyderabad suburb first kept driving as before, but over the next two years many shifted to the metro and electric scooters. This shows that demand for petrol is',
  opts: ['more elastic in the long run than in the short run', 'more elastic in the short run than in the long run', 'perfectly inelastic in both periods', 'unaffected by the availability of substitutes'],
  sol: 'Over time buyers find and adopt substitutes and change habits, so demand becomes more elastic in the long run.',
}));
Q('m_many_uses', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Electricity in an imagined Nashik town is used for lighting, cooking, pumping water and running workshops. Compared with a good that has a single use, its demand tends to be',
  opts: ['more elastic, because a fall in price lets it spread into more uses', 'perfectly inelastic, because it is essential', 'less elastic, because it has many uses', 'unrelated to its number of uses'],
  sol: 'A good with many uses can be switched into or out of several of them as its price changes, so its demand tends to be more elastic.',
}));
Q('tf_necessity', tf({
  t: 5, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Demand for necessities such as salt is usually more elastic than demand for luxuries such as air-conditioned holidays.',
  sol: 'False. Necessities have inelastic demand because they must be bought; luxuries can be postponed or dropped, so their demand is more elastic.',
}));
Q('ar_habit', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'A lifelong tea drinker in an imagined Darjeeling town keeps buying the same amount of tea after its price rises.',
  r: 'Demand for goods consumed out of habit tends to be inelastic.',
  sol: 'Both are true and R explains A: tea is part of his daily routine, a habit, so he does not cut back when its price rises; habit-forming goods have inelastic demand.',
}));
Q('s_two_factors', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do the nature of a good and the possibility of postponing its purchase affect its price elasticity of demand?',
  model: '**Nature:** necessities (rice, medicines) have **inelastic** demand, while luxuries (jewellery, foreign trips) have **elastic** demand. **Postponement:** if buying can be **delayed**, as with a new sofa, demand is **elastic**; if it is **urgent**, as with medicine, it is **inelastic**.',
  sol: 'Two factors with direction and example.',
  scheme: [['Nature of the good', 1], ['Postponement', 1]],
}));
Q('s_price_level', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Why is the demand for very cheap goods, such as a pencil, and very costly goods, such as a luxury car, both relatively inelastic for the buyers in an imagined Delhi colony?',
  model: '**Very cheap goods** take a negligible part of income, so price changes hardly matter. **Very costly goods** are bought by **rich buyers** for whom a price change makes little difference. Elasticity is highest for **medium-priced goods** bought by middle-income families.',
  sol: 'Price level and the buyers\' income.',
  scheme: [['Cheap goods explained', 1], ['Costly goods explained', 1]],
}));
Q('s3_compare_goods', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the likely price elasticity of demand for (a) a particular brand of biscuits and (b) wheat flour, for families in an imagined Indore market, giving three reasons.',
  model: 'Demand for **one brand of biscuits** is **elastic**, while demand for **wheat flour** is **inelastic**. **Substitutes:** many other biscuit brands exist; staple flour has few close substitutes. **Nature:** biscuits are a snack that can be skipped; flour is a **necessity**. **Postponement:** biscuit purchases can be **delayed**, but families cannot postpone buying flour for daily rotis.',
  sol: 'Conclusion plus three reasons.',
  scheme: [['Substitutes', 1], ['Nature of the good', 1], ['Postponement, with conclusion', 1]],
}));
Q('s3_long_run', short({
  t: 5, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A state electricity board in an imagined hill state plans to raise power tariffs and claims that "demand will hardly fall". Evaluate this claim for the short run and the long run.',
  model: 'In the **short run** the claim is largely **correct**: homes and workshops depend on electricity and cannot quickly change appliances, so demand is **inelastic**. In the **long run** it is **weaker**: users install **solar panels**, buy **energy-efficient** appliances and change habits, so demand becomes **more elastic** and consumption falls more. The board should not assume today\'s response will last.',
  sol: 'Short-run inelastic, long-run more elastic, with judgement.',
  scheme: [['Short run: inelastic, with reason', 1], ['Long run: more elastic, with reason', 1], ['Balanced evaluation', 1]],
}));
Q('l_factors', long({
  t: 5, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five factors that affect the price elasticity of demand for a good, illustrating each with an imagined Indian example.',
  model: '1. **Availability of substitutes:** close substitutes make demand **elastic** — one brand of toothpaste.\n2. **Nature of the good:** necessities are **inelastic** (salt), luxuries **elastic** (designer watches).\n3. **Share of income spent:** a tiny share gives **inelastic** demand (matchboxes); a large share gives **elastic** demand (a new refrigerator).\n4. **Number of uses:** goods with many uses, such as **electricity**, have more **elastic** demand.\n5. **Time period:** demand is more **elastic in the long run**, when buyers find substitutes — commuters switching from petrol scooters to the metro.',
  sol: 'Five factors, each with direction and example.',
  scheme: [['Substitutes', 1], ['Nature of the good', 1], ['Share of income', 1], ['Number of uses', 1], ['Time period', 1]],
}));

// ================================================================ t06 Income and cross elasticity (conceptual)
Q('m_income_positive', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Families in an imagined Kochi suburb buy more packaged juice as their incomes rise. The income elasticity of demand for packaged juice is',
  opts: ['positive, so juice is a normal good for them', 'negative, so juice is an inferior good for them', 'zero, so income has no effect', 'infinite, because juice is a luxury'],
  sol: 'Quantity moves in the same direction as income, so income elasticity is positive: a normal good.',
}));
Q('m_income_negative', mcq({
  t: 6, d: 2, c: 'application',
  stem: 'As incomes rose in an imagined Bihar village, families bought less coarse grain and more fine rice. The income elasticity of demand for coarse grain is',
  opts: ['negative', 'positive and greater than one', 'positive and less than one', 'zero'],
  sol: 'Demand falls as income rises, so income elasticity is negative: coarse grain is an inferior good for these families.',
}));
Q('m_cross_sub', mcq({
  t: 6, d: 2, c: 'application',
  stem: 'When the fare of app-based cabs rose in an imagined Bengaluru suburb, the number of auto-rickshaw rides increased. The cross elasticity of demand for auto rides with respect to cab fares is',
  opts: ['positive, because the two are substitutes', 'negative, because the two are complements', 'zero, because they are unrelated', 'equal to the price elasticity of cabs'],
  sol: 'A rise in the price of cabs raised the demand for autos: the variables move together, so cross elasticity is positive and the goods are substitutes.',
}));
Q('m_cross_comp', mcq({
  t: 6, d: 3, c: 'analysis',
  stem: 'After the price of printers rose sharply at an imagined Nagpur electronics market, sales of printer ink cartridges fell. The cross elasticity of demand for cartridges with respect to printer prices is',
  opts: ['negative, showing that the goods are complements', 'positive, showing that the goods are substitutes', 'zero, showing that the goods are unrelated', 'positive, showing that cartridges are inferior goods'],
  sol: 'A higher printer price reduced cartridge demand: opposite directions give a negative cross elasticity, which marks complements.',
}));
Q('ord_income_values', ord({
  t: 6, d: 3, c: 'analysis', marks: 1,
  stem: 'For families in an imagined Pune suburb, arrange these goods from the lowest to the highest likely income elasticity of demand.',
  items: [
    'Cheap coarse grain (inferior good: negative)',
    'Salt (necessity: positive but close to zero)',
    'Milk (necessity: positive, less than one)',
    'Foreign holidays (luxury: positive, greater than one)',
  ],
  sol: 'Inferior goods have negative income elasticity, necessities between zero and one (salt nearest zero), and luxuries above one.',
}));
Q('ar_cross_unrelated', ar({
  t: 6, d: 2, c: 'analysis', key: 'd',
  a: 'The cross elasticity of demand between two complementary goods is positive.',
  r: 'Complementary goods are goods that can be used in place of each other.',
  sol: 'Both are false: complements have a negative cross elasticity (a dearer printer reduces ink demand), and goods used in place of each other are substitutes, not complements.',
}));
Q('s_income_types', short({
  t: 6, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does the sign and size of income elasticity of demand tell us about a good? Explain with the three cases.',
  model: '**Negative:** demand falls as income rises — an **inferior** good. **Positive but less than one:** demand rises less than proportionately — a **necessity**. **Positive and greater than one:** demand rises more than proportionately — a **luxury**.',
  sol: 'Three cases with interpretation.',
  scheme: [['Inferior and necessity cases', 1], ['Luxury case', 1]],
}));
Q('s3_cross_cases', short({
  t: 6, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'For an imagined Guwahati household, state the likely sign of cross elasticity of demand in each pair and give the reason: (a) tea and coffee, (b) cars and petrol, (c) umbrellas and school bags.',
  model: '(a) **Positive:** tea and coffee are **substitutes**; a dearer coffee raises the demand for tea. (b) **Negative:** cars and petrol are **complements**; dearer petrol lowers the demand for cars. (c) **Zero:** umbrellas and school bags are **unrelated**, so a change in the price of one does not affect demand for the other.',
  sol: 'Sign plus relationship for each pair.',
  scheme: [['Substitutes positive', 1], ['Complements negative', 1], ['Unrelated zero', 1]],
}));
Q('s3_income_policy', short({
  t: 6, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A retail chain plans new stores in an imagined fast-growing town where incomes are rising quickly. Advise it which kinds of goods to stock more of, using the idea of income elasticity of demand.',
  model: 'Goods with **high positive income elasticity** (luxuries such as branded clothes, electronics, eating out) will see demand **grow faster than incomes**, so the chain should expand them. **Necessities** with low positive elasticity grow slowly, so keep steady stocks. **Inferior goods** with **negative** income elasticity will see falling demand, so it should **reduce** them as the town grows richer.',
  sol: 'Three categories with stocking advice.',
  scheme: [['Luxuries: expand, with reason', 1], ['Necessities: steady', 1], ['Inferior goods: reduce', 1]],
}));
Q('l_income_cross', long({
  t: 6, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Answer both parts. [2 + 3]\n\n(a) Distinguish between price elasticity, income elasticity and cross elasticity of demand.\n(b) Explain how the signs of income elasticity and cross elasticity help a business in an imagined Indian city to classify the goods it sells.',
  model: '(a) **Price elasticity** measures the response of quantity demanded to the good\'s **own price**; **income elasticity** measures the response to **consumers\' income**; **cross elasticity** measures the response to the **price of a related good**.\n(b) A **positive income elasticity** marks a **normal good** (greater than one a **luxury**, less than one a **necessity**); a **negative** one marks an **inferior good**. A **positive cross elasticity** marks **substitutes**, a **negative** one **complements**, and **zero** unrelated goods. The business can expect luxuries to grow as incomes rise, watch rival substitutes\' prices, and price complements together.',
  sol: 'Three definitions; signs and their business use.',
  scheme: [['(a) price and income elasticity distinguished', 1], ['(a) cross elasticity distinguished', 1], ['(b) income elasticity signs', 1], ['(b) cross elasticity signs', 1], ['(b) business use', 1]],
}));
Q('l_te_full', long({
  t: [3, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Answer both parts. [2 + 3]\n\n(a) Explain the total expenditure (outlay) method of judging price elasticity of demand.\n(b) A farmers\' group in an imagined Nashik district wants to raise its onion income by selling less and charging more. Using the outlay method, evaluate when this plan works.',
  model: '(a) Compare buyers\' **total spending** before and after a price change. If spending moves **opposite** to price, demand is **elastic**; if it is **unchanged**, demand is **unitary**; if it moves in the **same direction** as price, demand is **inelastic**. It shows the degree but not an exact value.\n(b) The plan works only if demand for their onions is **inelastic**: then a higher price with smaller sales still **raises total spending** on onions, and so their income. If buyers have **close substitutes**, such as onions from other districts, demand for **this group\'s** onions is **elastic**, and spending would **fall**. So the group must act together and supply a large share of the market.',
  sol: 'Method in three cases; condition of inelastic demand and its limits.',
  scheme: [['(a) three cases of the outlay method', 2], ['(b) works if demand is inelastic', 1], ['(b) fails with close substitutes', 1], ['(b) judgement', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('q4_two_sellers', short({
  t: [2, 5], d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about two imagined traders in a Lucknow market. [2 + 2]\n\n(i) A chikan kurta seller cut her price from ₹${KURTA.p0} to ₹${KURTA.p1}, and weekly sales rose from ${KURTA.q0} to ${KURTA.q1} kurtas. A lemon seller cut his price from ₹${LEMON.p0} to ₹${LEMON.p1} a kg, and sales rose from ${LEMON.q0} to ${LEMON.q1} kg. Calculate the price elasticity of demand for each.\n(ii) Give one reason each for the difference in their elasticities.`,
  model: `(i) Kurtas: quantity rises **10 ÷ 50 = 20 per cent**, price falls **80 ÷ 800 = 10 per cent**, so **Ed = ${KURTA_ED}**. Lemons: quantity rises **6 ÷ 200 = 3 per cent**, price falls **10 ÷ 100 = 10 per cent**, so **Ed = ${LEMON_ED}**.\n(ii) Kurtas are a **semi-luxury** with many **substitutes** (other designs and shops), so buyers respond strongly. Lemons are a cheap **daily necessity** taking a **tiny share of income**, so buyers hardly change their purchases.`,
  sol: 'Two percentage-method results, then factors.',
  scheme: [['(i) kurta Ed', 1], ['(i) lemon Ed', 1], ['(ii) reason for elastic kurtas', 1], ['(ii) reason for inelastic lemons', 1]],
}));
Q('q4_fare_policy', short({
  t: [3, 1], d: 4, c: 'evaluation', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) A city bus service in an imagined Kanpur finds that when it raised fares, its total collection fell. What does this indicate about the elasticity of demand for its rides? Explain.\n(ii) Suggest, with a reason, one change the service could make to its fares, and describe the diagram that shows demand of this kind.',
  model: '(i) The fare **rose** and total collection **fell**: spending moved **opposite** to price, so by the outlay method demand for the rides is **elastic (Ed > 1)**; riders switched to autos, cycles or walking.\n(ii) The service should **lower fares** (or roll back the rise): with elastic demand, a lower fare raises ridership more than proportionately and so **raises collection**. Diagram: a **relatively flat** downward-sloping demand curve, with quantity on the x-axis and fare on the y-axis.',
  sol: 'Outlay method conclusion; fare advice and flat-curve diagram.',
  scheme: [['(i) direction of fare and collection', 1], ['(i) elastic demand concluded', 1], ['(ii) fare cut advised with reason', 1], ['(ii) flat demand curve described', 1]],
}));
Q('q4_point_tangent', short({
  t: 4, d: 3, c: 'understanding', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) State the point method of measuring price elasticity on a straight-line demand curve and name the point where Ed = 1.\n(ii) Explain how the method is applied to a curved demand curve.',
  model: '(i) Price elasticity at a point = **lower segment ÷ upper segment**, the lower segment running from the point to the **quantity axis** and the upper segment to the **price axis**. At the **mid-point** the two are equal, so **Ed = 1**.\n(ii) For a curve, draw a **tangent** that touches the curve at the point and extend it to both axes. Elasticity is then the **lower segment of the tangent** divided by its **upper segment**, measured from the point of contact.',
  sol: 'Point method on a line; tangent method on a curve.',
  scheme: [['(i) segment formula', 1], ['(i) mid-point', 1], ['(ii) tangent drawn', 1], ['(ii) ratio of tangent segments', 1]],
}));
Q('l8_measure', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) An imagined Jaipur auto-rickshaw union raised fares from ₹${AUTO.p0} to ₹${AUTO.p1} a ride, and weekly rides fell from ${fmtIN(AUTO.q0)} to ${fmtIN(AUTO.q1)}. Calculate the price elasticity of demand by the percentage method and classify it.\n(ii) Explain how the same conclusion can be reached by the total expenditure method, and state one advantage of the percentage method over it.`,
  model: `(i) Quantity falls **180 ÷ 1200 × 100 = 15 per cent**; price rises **6 ÷ 60 × 100 = 10 per cent**; **Ed = 15 ÷ 10 = ${AUTO_ED}** after dropping the minus sign. As Ed is **greater than one**, demand for the rides is **relatively elastic**: riders respond more than in proportion to the fare.\n(ii) By the **outlay method** we compare riders' **total spending**: with a higher fare and proportionately fewer rides, spending **falls** as the price **rises**. Spending moving **opposite** to price marks **elastic** demand, the same conclusion. The percentage method is better because it gives an **exact coefficient** (${AUTO_ED}), which allows comparison between goods and forecasts of revenue, while the outlay method only gives the **direction** (elastic, unitary or inelastic).`,
  sol: 'Percentage method calculation; outlay method reasoning; advantage.',
  scheme: [['Percentage change in quantity', 1], ['Percentage change in price', 1], [`Ed = ${AUTO_ED}`, 1], ['Classified as relatively elastic', 1], ['Outlay method: spending falls as fare rises', 1], ['Same conclusion stated', 1], ['Advantage: exact coefficient', 1], ['Limitation of outlay method', 1]],
}));
Q('l8_factors_policy', long({
  t: [5, 6], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) Explain any four factors that make the demand for a good elastic or inelastic, with an imagined Indian example of each.\n(ii) A state government in an imagined coastal state wants to raise more revenue by taxing goods whose consumption will not fall much. Using price and income elasticity, evaluate which kinds of goods it should choose and the risks involved.',
  model: '(i) **Substitutes:** close substitutes make demand **elastic** — one brand of shampoo. **Nature:** **necessities** such as salt are **inelastic**, luxuries such as cruise tickets **elastic**. **Share of income:** goods taking a tiny share, such as matchboxes, are **inelastic**. **Time:** demand grows more **elastic in the long run**, as when commuters slowly move from petrol to the metro.\n(ii) A tax raises price; revenue holds up only if quantity does not fall much, so the state should tax goods with **inelastic price demand**: necessities with few substitutes, or habit-forming goods. But taxing **necessities** with **low income elasticity** falls most heavily on **poor households**, which spend a larger share of income on them. Taxing luxuries with **high income elasticity** is fairer but their demand is more **elastic**, so revenue is less certain. The state must balance **revenue** against **equity**.',
  sol: 'Four factors; tax choice by elasticity with risks.',
  scheme: [['Substitutes', 1], ['Nature of the good', 1], ['Share of income', 1], ['Time period', 1], ['Inelastic goods keep revenue', 1], ['Burden on the poor', 1], ['Luxuries: fairer but elastic', 1], ['Balanced evaluation', 1]],
}));

// ================================================================ case-based
Q('cb_tiffin', caseQ({
  t: [2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined case about a Chennai tiffin centre and answer the questions that follow. *(Imagined business and figures, written by SOYL for practice.)*',
  passage: `**Morning sales at Annapoorna Tiffin Centre, Mylapore (imagined)**\n\n${md([[`₹${IDLI.p0}`, String(IDLI.q0)], [`₹${IDLI.p1}`, String(IDLI.q1)]], ['Price of an idli plate', 'Plates sold'])}\n\nThe owner says that after the price cut the queue grew longer, many office workers who used to eat at a nearby canteen came to her instead, and her cash box was fuller at the end of each morning.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: IDLI_ED, stem: 'Calculate the price elasticity of demand for idli plates.', sol: `Quantity rises 60 ÷ 200 = 30 per cent; price falls 8 ÷ 40 = 20 per cent; Ed = 30 ÷ 20 = ${IDLI_ED}.` })),
    child('b', short({ t: 5, d: 2, c: 'understanding', marks: 1, stem: 'Which factor affecting elasticity is suggested by the office workers who switched from the nearby canteen?', model: 'The **availability of substitutes**: the canteen is a close substitute, so buyers move between them as relative prices change.', sol: 'Substitutes make demand elastic.', scheme: [['Availability of substitutes', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Use the total expenditure method to explain why her cash box was fuller.', model: 'The price **fell** and the money buyers spent with her **rose** (her cash box was fuller): spending moved **opposite** to price, which by the outlay method marks **elastic** demand.', sol: 'Spending moved opposite to price.', scheme: [['Direction of price and spending', 1], ['Elastic demand concluded', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Describe the shape of a demand curve that shows this degree of elasticity and explain why.', model: 'A **relatively flat** downward-sloping curve: quantity changes **proportionately more** than price (Ed > 1), so a small fall in price brings a large move along the quantity axis.', sol: 'Flat curve for Ed > 1.', scheme: [['Relatively flat curve', 1], ['Reason linked to Ed > 1', 1]] }),
    ]),
  ],
}));
Q('cb_market_town', caseQ({
  t: [5, 6], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined report from a market town in Odisha and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Notes from the weekly market, Sundargarh town (imagined)**\n\nWhen the price of kerosene rose, the poorest families still bought almost the same amount for their lamps. Over two years, as solar lanterns spread through the villages, kerosene sales dropped steeply. Meanwhile, as farm incomes improved, families bought fewer cheap broken-rice sacks and more packed atta and biscuits. When the price of mobile phones fell, the stall selling phone covers became busier.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'understanding', marks: 1, stem: 'Which factor explains the steep fall in kerosene sales over two years?', model: 'The **time period**: in the long run a **substitute** (solar lanterns) became available, so demand became more **elastic**.', sol: 'Time and substitutes.', scheme: [['Time period with substitutes', 1]] })),
    child('b', short({ t: 6, d: 2, c: 'application', marks: 1, stem: 'What is the sign of the income elasticity of demand for broken rice for these families?', model: '**Negative**: they buy less as income rises, so broken rice is an **inferior good** for them.', sol: 'Demand falls as income rises.', scheme: [['Negative, inferior good', 1]] })),
    child('c', short({ t: 6, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the relationship between mobile phones and phone covers using cross elasticity.', model: 'A **fall** in the price of phones **raised** the demand for covers: the variables move in **opposite** directions, so cross elasticity is **negative**, showing the goods are **complements**.', sol: 'Negative cross elasticity, complements.', scheme: [['Negative sign', 1], ['Complements', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the poorest families\' demand for kerosene was inelastic when its price first rose.', model: 'Kerosene was a **necessity** for light with **no substitute** at first, and buying could **not be postponed**; so a higher price barely reduced the quantity bought.', sol: 'Necessity, no substitute, no postponement.', scheme: [['Necessity or no substitute', 1], ['Cannot postpone', 1]] }),
    ]),
  ],
}));
Q('cb_two_shops', caseQ({
  t: [2, 5], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the imagined comparison of two Lucknow traders and answer the questions that follow. *(Imagined traders and figures, written by SOYL for practice.)*',
  passage: `**Festival-week price cuts in an imagined Aminabad market**\n\n${md([['Chikan kurtas', `₹${KURTA.p0} → ₹${KURTA.p1}`, `${KURTA.q0} → ${KURTA.q1}`], ['Lemons (per kg)', `₹${LEMON.p0} → ₹${LEMON.p1}`, `${LEMON.q0} → ${LEMON.q1}`]], ['Good', 'Price', 'Weekly quantity'])}\n\nBoth traders cut prices by the same percentage. The kurta seller was delighted with the week; the lemon seller said the cut "was not worth it".`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: KURTA_ED, stem: 'Calculate the price elasticity of demand for kurtas.', sol: `Quantity rises 10 ÷ 50 = 20 per cent; price falls 80 ÷ 800 = 10 per cent; Ed = 20 ÷ 10 = ${KURTA_ED}.` })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: LEMON_ED, stem: 'Calculate the price elasticity of demand for lemons.', sol: `Quantity rises 6 ÷ 200 = 3 per cent; price falls 10 ÷ 100 = 10 per cent; Ed = 3 ÷ 10 = ${LEMON_ED}.` })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the lemon seller\'s remark that the cut "was not worth it".', model: `He is **right**: demand for lemons is **inelastic** (Ed = ${LEMON_ED}), so the proportionately small rise in sales could not make up for the lower price, and his takings **fell**.`, sol: 'Inelastic demand, so takings fell.', scheme: [['Inelastic demand', 1], ['Takings fell, so remark justified', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Give two reasons why the two goods show such different elasticities.', model: 'Kurtas have many **substitutes** and are a **semi-luxury** that can be postponed; lemons are a cheap **necessity** taking a **tiny share of income**, with few substitutes in daily cooking.', sol: 'Substitutes/nature and share of income.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
