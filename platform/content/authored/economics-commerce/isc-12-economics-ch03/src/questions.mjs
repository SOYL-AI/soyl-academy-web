// ISC 12 Economics, ch03 Consumer Behaviour: Indifference Curve Analysis — question bank. Every consumer, schedule,
// budget and scenario is imagined by SOYL; no textbook schedule, ISC specimen item (for example its two-bundle
// burger-and-juice question) or past-paper item is reused. Every number in a key, option or worked solution is
// computed here and asserted.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [80, 120];
const L5 = [100, 130];
const L8 = [170, 230];

// ---------------------------------------------------------------- helpers (all asserted)
export function assert(cond, msg) {
  if (!cond) throw new Error(`ch03 data check failed: ${msg}`);
}
/** MRS of X for Y between successive combinations [x, y]: units of Y given up per extra unit of X. */
export function mrs(combos) {
  return combos.slice(1).map(([x, y], i) => (combos[i][1] - y) / (x - combos[i][0]));
}
/** Budget line Px·X + Py·Y = M: intercepts and the absolute slope Px/Py. */
export function budget(M, px, py) {
  return { xi: M / px, yi: M / py, slope: px / py };
}
/** Cost of a bundle. */
export const cost = (x, y, px, py) => x * px + y * py;
/**
 * Equilibrium on indifference curves of the form X·Y = constant (used for all smooth curves in this chapter): the
 * tangency MRS = Y/X = Px/Py on the budget line gives X = M/(2Px), Y = M/(2Py).
 */
export function eqXY(M, px, py) {
  const x = M / (2 * px), y = M / (2 * py);
  assert(Math.abs(y / x - px / py) < 1e-12 && Math.abs(cost(x, y, px, py) - M) < 1e-9, 'tangency and budget');
  return { x, y, level: x * y };
}
/** Is a bundle affordable? 'inside' | 'on' | 'outside' the budget line. */
export function where(x, y, M, px, py) {
  const c = cost(x, y, px, py);
  return c < M ? 'inside' : c === M ? 'on' : 'outside';
}

// ---------------------------------------------------------------- data sets (imagined)
// D1 — Ira's indifference schedule, imagined Dehradun: apples (X, kg) and bananas (Y, dozen).
export const IRA = [[1, 15], [2, 10], [3, 6], [4, 3], [5, 1]];
export const IRA_MRS = mrs(IRA);
assert(IRA_MRS.join() === '5,4,3,2', 'Ira MRS');
// D2 — Suresh's schedule, imagined Patna: cups of tea (X) and biscuits packets (Y).
export const SURESH = [[1, 20], [2, 14], [3, 10], [4, 8], [5, 7]];
export const SURESH_MRS = mrs(SURESH);
assert(SURESH_MRS.join() === '6,4,2,1', 'Suresh MRS');
// D3 — Main budget and equilibrium, imagined Indore: Meenal, ₹240; notebooks (X) ₹20, pens (Y) ₹10.
export const MEENAL = { M: 240, px: 20, py: 10 };
export const MEENAL_B = budget(MEENAL.M, MEENAL.px, MEENAL.py);
assert(MEENAL_B.xi === 12 && MEENAL_B.yi === 24 && MEENAL_B.slope === 2, 'Meenal budget');
export const MEENAL_EQ = eqXY(MEENAL.M, MEENAL.px, MEENAL.py);
assert(MEENAL_EQ.x === 6 && MEENAL_EQ.y === 12 && MEENAL_EQ.level === 72, 'Meenal equilibrium');
// The lower curve X·Y = 32 cuts her budget line at two points R and S (not equilibrium points).
export const LOW_K = 32;
const disc = Math.sqrt(144 - 4 * 16); // x² − 12x + 16 = 0 from x(24 − 2x) = 32
export const R_X = 6 - disc / 2, S_X = 6 + disc / 2;
assert(Math.abs(R_X * (24 - 2 * R_X) - LOW_K) < 1e-9 && Math.abs(S_X * (24 - 2 * S_X) - LOW_K) < 1e-9, 'R and S on both curves');
export const HIGH_K = 128;
assert(Math.max(...Array.from({ length: 1201 }, (_, i) => (i / 100) * (24 - 2 * (i / 100)))) < HIGH_K, 'higher curve unattainable');
// D4 — Kunal, imagined Guwahati: metro rides (X) ₹30, snack packets (Y) ₹15, income ₹300; changes.
export const KUNAL = { M: 300, px: 30, py: 15 };
export const KUNAL_B = budget(KUNAL.M, KUNAL.px, KUNAL.py);
assert(KUNAL_B.xi === 10 && KUNAL_B.yi === 20 && KUNAL_B.slope === 2, 'Kunal budget');
export const KUNAL_INC = budget(450, 30, 15);
assert(KUNAL_INC.xi === 15 && KUNAL_INC.yi === 30 && KUNAL_INC.slope === 2, 'Kunal income rise: parallel');
export const KUNAL_PXFALL = budget(300, 20, 15);
assert(KUNAL_PXFALL.xi === 15 && KUNAL_PXFALL.yi === 20, 'Kunal Px falls: rotation on X-axis');
export const KUNAL_PYRISE = budget(300, 30, 20);
assert(KUNAL_PYRISE.xi === 10 && KUNAL_PYRISE.yi === 15, 'Kunal Py rises: rotation on Y-axis');
// D5 — Equilibria for numericals (X·Y curves).
export const TANYA = { M: 180, px: 15, py: 10 };
export const TANYA_EQ = eqXY(TANYA.M, TANYA.px, TANYA.py);
assert(TANYA_EQ.x === 6 && TANYA_EQ.y === 9, 'Tanya equilibrium');
export const FARHAN = { M: 200, px: 5, py: 20 };
export const FARHAN_EQ = eqXY(FARHAN.M, FARHAN.px, FARHAN.py);
assert(FARHAN_EQ.x === 20 && FARHAN_EQ.y === 5, 'Farhan equilibrium');
// D6 — Ira's equilibrium on her schedule: prices make Px/Py = 3 (apples ₹60 a kg, bananas ₹20 a dozen).
export const IRA_PX = 60, IRA_PY = 20;
export const IRA_RATIO = IRA_PX / IRA_PY;
assert(IRA_RATIO === 3 && IRA_MRS[2] === 3, 'Ira: MRS between C and D equals Px/Py');
// D6b — Rohit, imagined Ranchi: ₹360, net sessions (X) ₹30, pool tickets (Y) ₹20.
export const ROHIT = { M: 360, px: 30, py: 20 };
export const ROHIT_EQ = eqXY(ROHIT.M, ROHIT.px, ROHIT.py);
assert(ROHIT_EQ.x === 6 && ROHIT_EQ.y === 9, 'Rohit equilibrium');
// D7 — Sameer, imagined Bhopal canteen: MRS of samosa for jalebi at his bundle 4, price ratio 2.
export const SAMEER_MRS = 4, SAMEER_RATIO = 2;
assert(SAMEER_MRS > SAMEER_RATIO, 'Sameer buys more samosas');

// ================================================================ t01 Ordinal utility, indifference schedule, curve and map
Q('m_ordinal_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the indifference curve approach, a consumer is assumed to be able to',
  opts: [
    'rank combinations of goods in order of preference without measuring utility in numbers',
    'measure the utility of each unit in utils',
    'express the utility of every good in rupees exactly',
    'buy unlimited quantities of every good',
  ],
  sol: 'The approach is ordinal: the consumer only says whether she prefers one bundle, the other, or is indifferent. Counting utils and pricing utility in rupees belong to the cardinal approach, and income is always limited.',
}));
Q('m_ind_schedule', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'An indifference schedule lists',
  opts: [
    'combinations of two goods that give a consumer the same level of satisfaction',
    'the quantities of a good bought at different prices',
    'combinations of two goods that cost the same amount of money',
    'the marginal utility of each unit of a single good',
  ],
  sol: 'Each row of an indifference schedule is a bundle among which the consumer is indifferent. Price–quantity pairs form a demand schedule, equal-cost bundles lie on a budget line, and MU per unit belongs to cardinal analysis.',
}));
Q('m_map_higher', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On an indifference map drawn for a student in an imagined Kochi hostel, a curve lying further from the origin shows',
  opts: [
    'a higher level of satisfaction',
    'a lower level of satisfaction',
    'the same level of satisfaction as every other curve',
    'a higher level of income but the same satisfaction',
  ],
  sol: 'A higher curve contains bundles with more of at least one good and no less of the other, so (more being preferred to less) it represents a higher level of satisfaction. It says nothing about income; the map shows tastes only.',
}));
Q('m_map_meaning', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'An indifference map is best described as',
  opts: [
    'a set of indifference curves, each showing a different level of satisfaction for the same consumer',
    'a single indifference curve with all its points labelled',
    'a diagram of the prices of two goods over time',
    'a chart of the consumer\'s income and expenditure',
  ],
  sol: 'The map is a family of non-intersecting indifference curves for one consumer, ranked by satisfaction. A single curve shows only one level; prices and income are shown by the budget line, not the map.',
}));
Q('m_ordinal_why', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A Class 12 student in an imagined Shillong school says: "I cannot tell you how many utils a plate of momos gives me, but I know I prefer two plates of momos and one bowl of thukpa to one plate of momos and two bowls of thukpa." Which approach to consumer behaviour does her statement suit?',
  opts: [
    'The ordinal (indifference curve) approach, because she only ranks bundles',
    'The cardinal approach, because she names quantities of each good',
    'The law of demand, because she mentions two goods',
    'Neither approach, because preferences cannot be ranked',
  ],
  sol: 'She cannot measure utility but can rank bundles, which is exactly what the ordinal approach assumes. Naming quantities does not make her statement cardinal; cardinal analysis needs utility in numbers.',
}));
Q('ar_ordinal', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Indifference curve analysis does not require utility to be measured in utils.',
  r: 'A consumer only needs to rank combinations of goods as preferred, less preferred or equally preferred.',
  sol: 'Both true; R explains A. Ranking (ordinal comparison) is enough to draw indifference curves, so no cardinal measurement is needed.',
}));
Q('tf_ic_same_cost', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? All the combinations on one indifference curve of a shopper at an imagined Surat textile market cost the same amount of money.',
  sol: 'An indifference curve joins bundles of equal satisfaction, not equal cost. Bundles of equal cost lie on a budget line; the bundles on one indifference curve usually cost different amounts.',
}));
Q('fb_ic_def', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A curve joining all combinations of two goods that give a consumer equal satisfaction is called an ___ curve.',
  acc: [['indifference', 'iso-utility']],
  sol: 'It is an indifference (iso-utility) curve: the consumer is indifferent among its combinations.',
}));
Q('s_card_ord', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the cardinal and the ordinal measurement of utility, with one illustration of each from a consumer buying fruit at an imagined Nashik market.',
  model: '**Cardinal:** utility is **counted in numbers** (utils), e.g. "a kilo of grapes gives me 30 utils and a kilo of guavas 20 utils".\n**Ordinal:** utility is only **ranked**, e.g. "I prefer a kilo of grapes to a kilo of guavas" without saying by how much.',
  sol: 'Contrast counting with ranking, with an example of each.',
  scheme: [['Cardinal meaning with example', 1], ['Ordinal meaning with example', 1]],
}));
Q('s_ic_from_schedule', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `Ira's indifference schedule for apples (kg) and bananas (dozen) at an imagined Dehradun market is: ${IRA.map(([x, y]) => `(${x}, ${y})`).join(', ')}. Explain how you would draw her indifference curve from it.`,
  model: 'Plot **apples on the x-axis** and **bananas on the y-axis**; mark each combination as a point (1, 15), (2, 10) … (5, 1); **join the points** with a smooth curve. The curve slopes **downward** and is **convex** because she gives up fewer bananas for each extra kilo of apples.',
  sol: 'Plot the combinations and join them; note the shape.',
  scheme: [['Axes and points plotted', 1], ['Curve joined; downward and convex', 1]],
}));
Q('s3_ic_map', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the meaning of an indifference curve and an indifference map, and state what the map tells us about a consumer that a single curve cannot.',
  model: '1. An **indifference curve** joins all combinations of two goods that give the consumer the **same satisfaction**.\n2. An **indifference map** is a **set of such curves**, each at a different level of satisfaction, with higher curves showing **more satisfaction**.\n3. A single curve shows only one level, while the map shows the consumer\'s **complete scale of preferences**, so we can rank any two bundles.',
  sol: 'Define both and say what the map adds: a ranking of all bundles.',
  scheme: [['Indifference curve defined', 1], ['Indifference map defined', 1], ['What the map adds', 1]],
}));
Q('s3_ordinal_assump', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three assumptions on which indifference curve analysis is based.',
  model: '1. **Ordinal utility:** the consumer can rank bundles but need not measure utility.\n2. **Rationality and consistency:** if she prefers A to B and B to C, she prefers A to C (**transitivity**).\n3. **Non-satiety and diminishing MRS:** more of a good is preferred to less, and the rate at which she substitutes one good for the other falls as she has more of it.',
  sol: 'Any three of the standard assumptions, each briefly explained.',
  scheme: [['First assumption', 1], ['Second assumption', 1], ['Third assumption', 1]],
}));
Q('l_ic_schedule_map', long({
  t: [1, 2], d: 3, c: 'application', marks: 5, wl: L5,
  stem: `(a) Using Ira's schedule for apples and bananas, ${IRA.map(([x, y]) => `(${x}, ${y})`).join(', ')}, describe her indifference curve and explain why she is indifferent among these bundles. (b) Draw (describe) an indifference map with three curves and explain how her satisfaction changes as she moves from one curve to another. (2 + 3)`,
  model: `**(a) (2):** plotting the five bundles with apples on the x-axis and bananas on the y-axis gives a **downward-sloping, convex** curve. She is indifferent because each extra kilo of apples exactly **compensates** her for the bananas given up (${IRA_MRS.join(', ')} dozen in turn), so every bundle gives the **same satisfaction**.\n**(b) (3):** an indifference map has three curves, IC₁ nearest the origin, then IC₂ and IC₃. Every point on **IC₂** has **more of at least one good** than a matching point on IC₁, so it gives **higher satisfaction**; IC₃ is higher still. Moving **outward** from IC₁ to IC₃ means **rising satisfaction**; moving along a curve leaves satisfaction **unchanged**. The curves **never cross**.`,
  sol: 'Describe the curve and indifference; then the map with ranking by distance from the origin.',
  scheme: [['Curve described: downward, convex', 1], ['Reason for indifference', 1], ['Map with three curves', 1], ['Higher curve, higher satisfaction', 1], ['Same satisfaction along a curve; no crossing', 1]],
}));

// ================================================================ t02 Marginal rate of substitution
Q('m_mrs_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The marginal rate of substitution of X for Y (MRSxy) is the',
  opts: [
    'amount of Y the consumer is willing to give up for one more unit of X while staying equally satisfied',
    'amount of money the consumer pays for one more unit of X',
    'ratio of the price of X to the price of Y set by the market',
    'extra satisfaction from one more unit of X',
  ],
  sol: 'MRSxy = ΔY ÷ ΔX along an indifference curve: the Y sacrificed per extra X at constant satisfaction. The price ratio is a market rate shown by the budget line, and extra satisfaction is marginal utility.',
}));
Q('m_mrs_calc', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Suresh, a clerk in an imagined Patna office, is indifferent between ${SURESH.slice(0, 3).map(([x, y]) => `${x} cups of tea with ${y} packets of biscuits`).join(', ')}. What is his MRS of tea for biscuits when he moves from 2 to 3 cups of tea?`,
  opts: [`${SURESH_MRS[1]}`, `${SURESH_MRS[0]}`, `${SURESH[2][1]}`, `${SURESH_MRS[1] / 2}`],
  sol: `MRS = ΔY ÷ ΔX = (${SURESH[1][1]} − ${SURESH[2][1]}) ÷ (3 − 2) = ${SURESH_MRS[1]} packets per cup. ${SURESH_MRS[0]} is the MRS of the previous step, ${SURESH[2][1]} is the number of packets he keeps, and ${SURESH_MRS[1] / 2} halves the correct value.`,
}));
Q('m_mrs_falls', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why does the MRS of X for Y fall as a consumer gets more X and less Y along an indifference curve?',
  opts: [
    'X becomes less important to her and Y more precious, so she gives up less Y for each extra X',
    'The price of X falls as she buys more of it',
    'Her income rises along the curve',
    'Y becomes less important to her as she has less of it',
  ],
  sol: 'With more X its marginal significance falls, and with less Y each remaining unit matters more, so she will part with less Y for each extra X. Prices and income are constant along an indifference curve, and scarcer Y becomes more (not less) important.',
}));
Q('m_mrs_slope', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On an indifference curve, the MRS of X for Y at a point is measured by',
  opts: [
    'the absolute value of the slope of the curve at that point',
    'the distance of the point from the origin',
    'the area under the curve up to that point',
    'the ratio of income to the price of X',
  ],
  sol: 'MRSxy = −ΔY/ΔX, the (absolute) slope of the curve. Distance from the origin indicates the level of satisfaction, and income divided by price gives a budget-line intercept.',
}));
Q('ar_mrs_convex', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'An indifference curve with a diminishing MRS is convex to the origin.',
  r: 'Along such a curve the consumer gives up smaller and smaller amounts of Y for each additional unit of X, so the curve becomes flatter.',
  sol: 'Both true; R explains A. A falling MRS means a falling slope (in absolute terms), which makes the curve bow towards the origin.',
}));
Q('fb_mrs', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The rate at which a consumer is willing to substitute one good for another while remaining equally satisfied is called the marginal rate of ___.',
  acc: [['substitution']],
  sol: 'It is the marginal rate of substitution (MRS).',
}));
Q('n_mrs_ira', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: IRA_MRS[0], unit: 'dozen per kg',
  stem: `On Ira's indifference curve at an imagined Dehradun fruit market, bundle A has 1 kg of apples and 15 dozen bananas and bundle B has 2 kg of apples and 10 dozen bananas. Find her MRS of apples for bananas between A and B.`,
  sol: `Step 1: MRS = ΔY ÷ ΔX.\nStep 2: (15 − 10) ÷ (2 − 1) = ${IRA_MRS[0]}. So she gives up ${IRA_MRS[0]} dozen bananas for one more kilo of apples.`,
}));
Q('n_mrs_suresh', num({
  t: 2, d: 2, c: 'application', marks: 1, value: SURESH_MRS[3], unit: 'packets per cup',
  stem: `Suresh's indifference schedule for tea (cups) and biscuits (packets) at an imagined Patna office ends with the bundles (4, ${SURESH[3][1]}) and (5, ${SURESH[4][1]}). What is his MRS of tea for biscuits over this last step?`,
  sol: `Step 1: MRS = ΔY ÷ ΔX.\nStep 2: (${SURESH[3][1]} − ${SURESH[4][1]}) ÷ (5 − 4) = ${SURESH_MRS[3]}. So ${SURESH_MRS[3]} packet per cup.`,
}));
Q('s_mrs_meaning', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the marginal rate of substitution? Illustrate it with one step of a schedule you construct for a consumer choosing between kites and marbles at an imagined Ahmedabad Uttarayan fair.',
  model: '**MRSxy** is the amount of **Y given up** to get **one more unit of X** while staying on the **same indifference curve**: ΔY ÷ ΔX.\nExample: moving from (2 kites, 12 marbles) to (3 kites, 8 marbles), MRS of kites for marbles = **4 marbles per kite**.',
  sol: 'Define MRS with the formula and give one numerical step.',
  scheme: [['Meaning of MRS', 1], ['Correct numerical step', 1]],
}));
Q('s_mrs_reason', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why the marginal rate of substitution of X for Y diminishes as a consumer moves down an indifference curve.',
  model: '1. As she gets **more X**, the **intensity of her want for X falls**, so each extra unit of X is worth less to her.\n2. As she has **less Y**, each remaining unit of **Y becomes more precious**, so she is willing to give up fewer units of it.',
  sol: 'Falling importance of X and rising importance of Y.',
  scheme: [['More X: lower intensity of want', 1], ['Less Y: Y more valuable', 1]],
}));
Q('s3_mrs_schedule', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `From Suresh's indifference schedule (tea, biscuits) = ${SURESH.map(([x, y]) => `(${x}, ${y})`).join(', ')} at an imagined Patna office, calculate the MRS at each step and comment on the shape of his indifference curve.`,
  model: `MRS = ΔY ÷ ΔX at each step: **${SURESH_MRS.join(', ')}** packets of biscuits per extra cup of tea.\nThe MRS **diminishes** steadily. Because the slope of the curve falls in absolute value as tea increases, the curve becomes **flatter** and is **convex to the origin**.`,
  sol: 'Compute four MRS values; diminishing MRS gives a convex curve.',
  scheme: [['MRS values correct', 2], ['Diminishing MRS linked to convexity', 1]],
}));
Q('s3_mrs_ira_table', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `Ira's schedule at an imagined Dehradun market gives the bundles (apples, bananas) ${IRA.map(([x, y]) => `(${x}, ${y})`).join(', ')}. Prepare an MRS column and explain what it shows about her preferences.`,
  model: `MRS of apples for bananas: A→B **${IRA_MRS[0]}**, B→C **${IRA_MRS[1]}**, C→D **${IRA_MRS[2]}**, D→E **${IRA_MRS[3]}** dozen per kg.\nIt shows that as Ira gets **more apples** she is willing to give up **fewer bananas** for each extra kilo: apples matter less and bananas more to her — the principle of **diminishing MRS**.`,
  sol: 'Successive differences in Y over unit changes in X; interpret as diminishing MRS.',
  scheme: [['MRS column correct', 2], ['Interpretation as diminishing MRS', 1]],
}));
Q('l_mrs_full', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: '(a) Define the marginal rate of substitution and explain the principle of diminishing MRS with a schedule of your own. (b) Explain why a diminishing MRS makes an indifference curve convex, and what shape the curve would have if the MRS were constant. (3 + 2)',
  model: '**(a) (3):** MRSxy is the amount of Y a consumer gives up for one more unit of X while remaining equally satisfied (ΔY ÷ ΔX). Schedule for a student choosing between **notebooks (X)** and **pens (Y)**: (1, 14), (2, 9), (3, 5), (4, 2) — MRS **5, 4, 3**. As notebooks increase, they matter less and pens matter more, so she gives up **fewer pens** per extra notebook: the MRS **diminishes**.\n**(b) (2):** MRS is the absolute **slope** of the curve. A falling slope means the curve gets **flatter** as we move right, so it bows towards the origin: **convex**. If the MRS were **constant**, the slope would not change and the curve would be a **straight downward line** (the goods being perfect substitutes).',
  sol: 'Definition, schedule with falling MRS and reason; slope link to convexity and the constant-MRS case.',
  scheme: [['MRS defined with formula', 1], ['Schedule with diminishing MRS', 1], ['Reason for diminishing MRS', 1], ['Slope falls, curve convex', 1], ['Constant MRS gives a straight line', 1]],
}));

// ================================================================ t03 Properties of indifference curves
Q('m_prop_slope', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'An indifference curve slopes downward from left to right because',
  opts: [
    'to get more of one good the consumer must give up some of the other to stay equally satisfied',
    'the price of both goods falls along the curve',
    'the consumer\'s income falls along the curve',
    'both goods become less useful as the consumer gets more of them',
  ],
  sol: 'With more X, the consumer can stay at the same satisfaction only if she has less Y, which makes the slope negative. Prices and income do not enter an indifference curve.',
}));
Q('m_prop_cross', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Two indifference curves of the same consumer cannot intersect because the point of intersection would',
  opts: [
    'have to give two different levels of satisfaction at once, which is a contradiction',
    'lie outside the budget line',
    'make the MRS equal to the price ratio',
    'show that the two goods are complements',
  ],
  sol: 'Each curve stands for one level of satisfaction; a common point would belong to both levels, and with transitivity this implies a bundle with more goods is only as good as one with fewer — a contradiction.',
}));
Q('m_prop_axis', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A consumer\'s indifference curve does not touch either axis when she buys tea and coffee at an imagined Coonoor estate shop. Which assumption explains this?',
  opts: [
    'She always wants some quantity of both goods, so no bundle with zero of one good is on the curve',
    'Tea and coffee have the same price',
    'Her income is large enough to buy both',
    'Her MRS is constant along the curve',
  ],
  sol: 'A curve touching an axis would include a bundle with none of one good; the usual assumption is that the consumer wants some of both. Prices and income do not shape the indifference curve, and a constant MRS would make it a straight line.',
}));
Q('m_prop_higher', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Bundle P has 6 kg of rice and 4 kg of dal; bundle Q has 6 kg of rice and 5 kg of dal, for a family in an imagined Varanasi colony. If more is preferred to less, Q must lie',
  opts: [
    'on a higher indifference curve than P',
    'on the same indifference curve as P',
    'on a lower indifference curve than P',
    'on the budget line, while P lies inside it',
  ],
  sol: 'Q has the same rice and one more kilo of dal, so (non-satiety) it is preferred to P and lies on a higher indifference curve. Nothing is said about prices or income, so the budget line cannot be judged.',
}));
Q('m_prop_not_parallel', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which statement about indifference curves on the same map is correct?',
  opts: [
    'They need not be parallel, but they never intersect',
    'They must be parallel to one another',
    'They intersect at the point of equilibrium',
    'They must all meet the x-axis at the same point',
  ],
  sol: 'The curves only have to be non-intersecting; their slopes at a given quantity of X may differ, so they need not be parallel. Equilibrium involves one curve and the budget line, and the curves do not meet the axes.',
}));
Q('ar_prop_convex', ar({
  t: 3, d: 2, c: 'analysis', key: 'b',
  a: 'An indifference curve slopes downward from left to right.',
  r: 'Indifference curves on the same map never intersect each other.',
  sol: 'Both statements are true properties, but R does not explain A. The downward slope comes from the need to give up one good to get more of the other at constant satisfaction.',
}));
Q('ar_prop_higher', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'A higher indifference curve represents a higher level of satisfaction.',
  r: 'Every bundle on a higher indifference curve costs more money than every bundle on a lower curve.',
  sol: 'A is true (more of at least one good, no less of the other). R is false: cost depends on prices, which the indifference map does not show; a bundle on a higher curve can even cost less than one on a lower curve.',
}));
Q('tf_parallel', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Indifference curves must be parallel to one another because they never intersect.',
  sol: 'Non-intersection does not require parallel curves: the curves may come closer or move apart as long as they never cross.',
}));
Q('mt_properties', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each property of indifference curves, as drawn for a consumer buying kurtas and dupattas at an imagined Lucknow chikan market, with its reason.',
  pairs: [
    ['Slopes downward', 'More of one good must be offset by less of the other'],
    ['Convex to the origin', 'The marginal rate of substitution diminishes'],
    ['Higher curve, higher satisfaction', 'More of at least one good is preferred'],
    ['Two curves never intersect', 'One bundle cannot give two levels of satisfaction'],
  ],
  sol: 'Each property follows from an assumption: equal satisfaction (slope), diminishing MRS (convexity), non-satiety (higher curve) and consistency of preferences (no intersection).',
}));
Q('s_prop_two', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two properties of indifference curves and give the reason for each in one line.',
  model: '1. **Downward sloping** — to have more of one good and stay equally satisfied, the consumer must have less of the other.\n2. **Convex to the origin** — the MRS of X for Y diminishes as more X is consumed. (Also: never intersect; higher curve, higher satisfaction.)',
  sol: 'Any two properties, each with its reason.',
  scheme: [['First property with reason', 1], ['Second property with reason', 1]],
}));
Q('s_prop_higher', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A student at an imagined Pune coaching centre compares bundle P (4 sandwiches, 3 juices) with bundle Q (5 sandwiches, 3 juices). Which bundle lies on a higher indifference curve? Give the reason.',
  model: '**Q** lies on a **higher** indifference curve. It has the **same juices** and **one more sandwich**, and since **more is preferred to less**, Q gives **greater satisfaction** than P, so it cannot be on the same or a lower curve.',
  sol: 'Same Y, more X: higher satisfaction by non-satiety.',
  scheme: [['Q identified', 1], ['Reason: more of one, same of other', 1]],
}));
Q('s3_prop_intersect', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'With the help of a diagram, prove that two indifference curves of the same consumer cannot intersect.',
  model: 'Suppose **IC₁** and **IC₂** cross at **A**. Take **B** on IC₁ and **C** on IC₂ vertically above B, so C has the same X but **more Y** than B.\n- A ~ B (both on IC₁) and A ~ C (both on IC₂), so by **transitivity B ~ C**.\n- But C has **more Y** than B, so C must be **preferred** to B.\nThis **contradiction** shows the curves cannot intersect.',
  sol: 'Assume an intersection, use transitivity and non-satiety to reach a contradiction.',
  scheme: [['Diagram with A, B, C described', 1], ['Transitivity gives B indifferent to C', 1], ['Contradiction with more Y in C', 1]],
}));
Q('s3_prop_convex_axis', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain why an indifference curve is (i) convex to the origin and (ii) does not usually touch either axis. Use the example of a family choosing between milk and curd at an imagined Anand dairy outlet.',
  model: '(i) **Convex:** as the family gets **more milk**, it gives up **less curd** for each extra litre of milk — the **MRS diminishes** — so the curve becomes flatter and bows towards the origin.\n(ii) **Does not touch an axis:** a point on an axis means **zero curd** (or zero milk). The family wants **some of both** goods, so a bundle with none of one good is not on the same curve as bundles with both.',
  sol: 'Diminishing MRS gives convexity; wanting both goods keeps the curve off the axes.',
  scheme: [['Convexity explained by diminishing MRS', 2], ['Reason for not touching the axes', 1]],
}));
Q('l_properties', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any four properties of indifference curves. Support one of them with a diagram-based proof. (4 + 1)',
  model: '1. **Slopes downward:** more of X must be matched by less of Y to keep satisfaction constant.\n2. **Convex to the origin:** the **MRS of X for Y diminishes**, so the curve flattens as X increases.\n3. **Higher curve, higher satisfaction:** a higher curve has bundles with **more of at least one good** and no less of the other.\n4. **Never intersect:** a common point would make two different satisfaction levels equal.\n**Proof (1):** if IC₁ and IC₂ met at A, a point C on IC₂ directly above B on IC₁ would be **indifferent** to B through A (transitivity) though C has **more Y** — a contradiction.',
  sol: 'Four properties with reasons, and one proof.',
  scheme: [['Downward slope', 1], ['Convexity', 1], ['Higher curve, higher satisfaction', 1], ['Non-intersection', 1], ['Proof of one property', 1]],
}));

// ================================================================ t04 Budget line
Q('m_bl_eq', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'With income M and prices Px and Py, the budget line of a consumer is the set of bundles for which',
  opts: ['Px·X + Py·Y = M', 'Px·X + Py·Y is less than M', 'X + Y = M', 'Px ÷ Py = X ÷ Y'],
  sol: 'The budget line shows bundles that cost exactly the whole income. Bundles costing less lie inside it, X + Y = M ignores prices, and the price ratio equals the slope, not X ÷ Y.',
}));
Q('m_bl_slope', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Meenal in an imagined Indore stationery shop has ₹${MEENAL.M}; notebooks (X) cost ₹${MEENAL.px} each and pens (Y) ₹${MEENAL.py} each. What is the slope of her budget line (absolute value)?`,
  opts: [`${MEENAL_B.slope}`, `${MEENAL.py / MEENAL.px}`, `${MEENAL_B.xi}`, `${MEENAL_B.yi}`],
  sol: `Slope = Px ÷ Py = ${MEENAL.px} ÷ ${MEENAL.py} = ${MEENAL_B.slope} (pens given up per notebook). ${MEENAL.py / MEENAL.px} inverts the ratio, and ${MEENAL_B.xi} and ${MEENAL_B.yi} are the intercepts.`,
}));
Q('m_bl_income', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'If a consumer\'s income rises while the prices of both goods stay the same, her budget line',
  opts: ['shifts outward parallel to itself', 'rotates outward on the x-axis only', 'shifts inward parallel to itself', 'becomes steeper'],
  sol: 'Both intercepts (M ÷ Px and M ÷ Py) rise in the same proportion and the slope Px ÷ Py is unchanged, so the line shifts outward parallel to the old one.',
}));
Q('m_bl_pxfall', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Kunal in an imagined Guwahati has ₹${KUNAL.M} for metro rides (X, ₹${KUNAL.px}) and snack packets (Y, ₹${KUNAL.py}). If the metro fare falls to ₹20, his budget line`,
  opts: [
    `rotates outward on the x-axis, from ${KUNAL_B.xi} to ${KUNAL_PXFALL.xi} rides, with the y-intercept unchanged at ${KUNAL_B.yi}`,
    `shifts outward parallel, to ${KUNAL_PXFALL.xi} rides and 30 packets`,
    `rotates inward on the y-axis, from ${KUNAL_B.yi} to 15 packets`,
    'does not change, because income is the same',
  ],
  sol: `The x-intercept M ÷ Px rises from 300 ÷ 30 = ${KUNAL_B.xi} to 300 ÷ 20 = ${KUNAL_PXFALL.xi}; M ÷ Py stays ${KUNAL_B.yi}. So the line pivots on the y-axis and becomes flatter (slope 20 ÷ 15). A parallel shift would need a change in income, and the y-intercept depends only on the snack price.`,
}));
Q('m_bl_inside', mcq({
  t: 4, d: 2, c: 'application',
  stem: `With ₹${MEENAL.M}, notebooks at ₹${MEENAL.px} and pens at ₹${MEENAL.py}, which bundle lies **inside** Meenal's budget line?`,
  opts: ['5 notebooks and 10 pens', '6 notebooks and 12 pens', '8 notebooks and 10 pens', '12 notebooks and 2 pens'],
  sol: `Costs: (5, 10) = ₹${cost(5, 10, 20, 10)} (inside); (6, 12) = ₹${cost(6, 12, 20, 10)} (on the line); (8, 10) = ₹${cost(8, 10, 20, 10)} and (12, 2) = ₹${cost(12, 2, 20, 10)} (outside, unaffordable).`,
}));
assert(where(5, 10, 240, 20, 10) === 'inside' && where(6, 12, 240, 20, 10) === 'on' && where(8, 10, 240, 20, 10) === 'outside' && where(12, 2, 240, 20, 10) === 'outside', 'm_bl_inside bundles');
Q('ar_bl_slope', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'When a consumer\'s income rises and both prices stay the same, her budget line becomes steeper.',
  r: 'A change in income alters the price ratio Px ÷ Py.',
  sol: 'Both statements are false. A rise in income raises both intercepts in proportion, so the line shifts outward parallel with the same slope; the price ratio Px ÷ Py depends only on the two prices, not on income.',
}));
Q('n_bl_xint', num({
  t: 4, d: 1, c: 'understanding', marks: 1, value: KUNAL_B.yi, unit: 'packets',
  stem: `Kunal has ₹${KUNAL.M} and a snack packet costs ₹${KUNAL.py}. How many snack packets can he buy if he spends nothing on metro rides?`,
  sol: `Step 1: y-intercept = M ÷ Py.\nStep 2: ${KUNAL.M} ÷ ${KUNAL.py} = ${KUNAL_B.yi}. So ${KUNAL_B.yi} packets.`,
}));
Q('n_bl_income', num({
  t: 4, d: 2, c: 'application', marks: 1, value: 450, unit: '₹',
  stem: `Kunal's budget line meets the x-axis at ${KUNAL_INC.xi} metro rides; a ride costs ₹${KUNAL.px}. What is his income?`,
  sol: `Step 1: x-intercept = M ÷ Px, so M = x-intercept × Px.\nStep 2: ${KUNAL_INC.xi} × ${KUNAL.px} = 450. So ₹450.`,
}));
Q('n_bl_price', num({
  t: 4, d: 3, c: 'application', marks: 1, value: 20, unit: '₹',
  stem: `A budget line for an imagined Jaipur student has intercepts of 15 movie tickets (X) and 30 ice-cream cones (Y), and her income is ₹300. What is the price of a movie ticket?`,
  sol: 'Step 1: Px = M ÷ x-intercept.\nStep 2: 300 ÷ 15 = 20. So ₹20.',
}));
assert(budget(300, 20, 10).xi === 15 && budget(300, 20, 10).yi === 30, 'n_bl_price data');
Q('ord_bl_draw', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps for drawing the budget line of a consumer with given income and prices, in the right order.',
  items: [
    'Write the budget equation Px·X + Py·Y = M',
    'Find the x-intercept M ÷ Px (all income on X)',
    'Find the y-intercept M ÷ Py (all income on Y)',
    'Join the two intercepts with a straight line',
  ],
  sol: 'Start from the equation, find both intercepts by spending all income on one good, then join them with a straight line.',
}));
Q('s_bl_meaning', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a budget line? Write its equation and state what its slope measures.',
  model: 'A **budget line** shows all **combinations of two goods** a consumer can buy by spending her **whole income** at given prices. Equation: **Px·X + Py·Y = M**. Its slope (absolute) **Px ÷ Py** measures the **rate at which the market lets her exchange** Y for X.',
  sol: 'Meaning, equation and the meaning of the slope.',
  scheme: [['Meaning with equation', 1], ['Slope as price ratio / market rate of exchange', 1]],
}));
Q('s_bl_rotate', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `Show the effect on Kunal's budget line (₹${KUNAL.M}; metro rides ₹${KUNAL.px}, snack packets ₹${KUNAL.py}) if the price of a snack packet rises to ₹20.`,
  model: `The **x-intercept stays at ${KUNAL_B.xi} rides** (300 ÷ 30). The **y-intercept falls** from **${KUNAL_B.yi}** to **${KUNAL_PYRISE.yi}** packets (300 ÷ 20). The line **rotates inward on the x-axis** and becomes **flatter** (slope 30 ÷ 20 = 1.5).`,
  sol: 'Only the y-intercept changes; the line pivots on the x-axis.',
  scheme: [['Intercepts recalculated', 1], ['Inward rotation on the x-axis described', 1]],
}));
assert(30 / 20 === 1.5, 'flatter slope');
Q('s3_bl_draw', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `Meenal at an imagined Indore stationery shop has ₹${MEENAL.M}; notebooks cost ₹${MEENAL.px} and pens ₹${MEENAL.py}. Write her budget equation, find the intercepts and the slope, and classify the bundle (8 notebooks, 10 pens).`,
  model: `Equation: **${MEENAL.px}X + ${MEENAL.py}Y = ${MEENAL.M}**. Intercepts: **${MEENAL_B.xi} notebooks** (240 ÷ 20) and **${MEENAL_B.yi} pens** (240 ÷ 10). Slope = 20 ÷ 10 = **${MEENAL_B.slope}** pens per notebook.\n(8, 10) costs 8 × 20 + 10 × 10 = **₹${cost(8, 10, 20, 10)}**, more than ₹240, so it lies **outside** the budget line and is **unaffordable**.`,
  sol: 'Equation, intercepts, slope, then cost of the bundle against income.',
  scheme: [['Equation and intercepts', 1], ['Slope', 1], ['Bundle classified with its cost', 1]],
}));
Q('s3_bl_changes', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, with the help of diagrams, how a budget line changes when (i) income falls, prices unchanged; (ii) the price of X falls, income and Py unchanged; (iii) income and both prices double together.',
  model: '(i) **Income falls:** both intercepts fall in proportion; the line **shifts inward, parallel** to itself (slope unchanged).\n(ii) **Px falls:** the x-intercept M ÷ Px rises, the y-intercept is unchanged; the line **rotates outward on the y-axis** and becomes **flatter**.\n(iii) **All double:** M ÷ Px, M ÷ Py and Px ÷ Py are all **unchanged**, so the budget line **does not change**.',
  sol: 'Track both intercepts and the slope in each case.',
  scheme: [['Parallel inward shift', 1], ['Outward rotation on the y-axis', 1], ['No change when all double', 1]],
}));
Q('l_bl_full', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Kunal in an imagined Guwahati has ₹${KUNAL.M}; metro rides (X) cost ₹${KUNAL.px} and snack packets (Y) ₹${KUNAL.py}. (a) Write his budget equation and describe his budget line and budget set. (b) Show how the line changes if his income rises to ₹450, and separately if the metro fare falls to ₹20. (2 + 3)`,
  model: `**(a) (2):** **${KUNAL.px}X + ${KUNAL.py}Y = ${KUNAL.M}**. The line joins **${KUNAL_B.xi} rides** on the x-axis and **${KUNAL_B.yi} packets** on the y-axis, slope **${KUNAL_B.slope}**. The **budget set** is the triangle formed by the line and the two axes: all bundles costing **₹300 or less**.\n**(b) (3):** **Income ₹450:** intercepts become **${KUNAL_INC.xi} rides** and **${KUNAL_INC.yi} packets**, slope still ${KUNAL_INC.slope}: a **parallel outward shift**. **Fare ₹20:** the x-intercept rises to **${KUNAL_PXFALL.xi} rides**, the y-intercept stays **${KUNAL_PXFALL.yi}**: the line **rotates outward on the y-axis** and becomes **flatter** (slope 20 ÷ 15). In both cases his **budget set enlarges**.`,
  sol: 'Equation, intercepts and budget set; then recompute intercepts for each change.',
  scheme: [['Budget equation and intercepts', 1], ['Budget set explained', 1], ['Income rise: parallel outward shift with intercepts', 1], ['Fare fall: rotation with new x-intercept', 1], ['Budget set enlarges / slope change', 1]],
}));

// ================================================================ t05 Consumer's equilibrium
Q('m_eq_cond', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'In indifference curve analysis, the consumer is in equilibrium where',
  opts: [
    'the budget line is tangent to the highest attainable indifference curve, so MRSxy = Px ÷ Py',
    'the budget line cuts an indifference curve at two points',
    'the indifference curve meets the x-axis',
    'MRSxy is greater than Px ÷ Py',
  ],
  sol: 'Equilibrium is the tangency of the budget line with the highest reachable indifference curve, where the slopes are equal (MRS = Px ÷ Py) and the curve is convex. Points where the line cuts a curve are on a lower curve.',
}));
Q('m_eq_mrs_greater', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: `At his present bundle in an imagined Bhopal college canteen, Sameer is willing to give up ${SAMEER_MRS} jalebis for one more samosa, but the market price ratio lets him get a samosa for only ${SAMEER_RATIO} jalebis. To raise his satisfaction he should`,
  opts: [
    'buy more samosas and fewer jalebis until MRS falls to the price ratio',
    'buy fewer samosas and more jalebis',
    'keep his bundle unchanged',
    'spend less money on both goods',
  ],
  sol: `MRS (${SAMEER_MRS}) > Px ÷ Py (${SAMEER_RATIO}): he values a samosa more than the market charges, so swapping jalebis for samosas raises satisfaction. As he gets more samosas, his MRS falls until it equals ${SAMEER_RATIO}.`,
}));
Q('m_eq_bundle', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Tanya at an imagined Nagpur book fair has ₹${TANYA.M}; a novel (X) costs ₹${TANYA.px} and a magazine (Y) ₹${TANYA.py}. Her indifference curves are of the form X × Y = constant, so her MRS of novels for magazines is Y ÷ X. Which bundle is her equilibrium?`,
  opts: [`${TANYA_EQ.x} novels and ${TANYA_EQ.y} magazines`, '8 novels and 6 magazines', '4 novels and 12 magazines', '12 novels and no magazines'],
  sol: `Equilibrium needs MRS = Px ÷ Py = ${TANYA.px} ÷ ${TANYA.py} = 1.5 and the full budget. At (${TANYA_EQ.x}, ${TANYA_EQ.y}): Y ÷ X = ${TANYA_EQ.y} ÷ ${TANYA_EQ.x} = 1.5 and cost = ${cost(TANYA_EQ.x, TANYA_EQ.y, 15, 10)}. (8, 6) costs ₹180 but MRS = 0.75; (4, 12) costs ₹180 but MRS = 3; (12, 0) is on the axis, outside her curves.`,
}));
assert(cost(8, 6, 15, 10) === 180 && cost(4, 12, 15, 10) === 180 && cost(12, 0, 15, 10) === 180, 'm_eq_bundle distractors on the budget line');
Q('m_eq_cut_points', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Points where a budget line cuts an indifference curve are not equilibrium points because',
  opts: [
    'the consumer can reach a higher indifference curve by moving along the budget line',
    'those bundles are unaffordable',
    'the MRS equals the price ratio there',
    'the consumer is spending less than her income there',
  ],
  sol: 'At a cutting point MRS ≠ Px ÷ Py, so moving along the budget line towards the tangency raises satisfaction without extra spending. The cutting points are affordable and on the line (full income spent).',
}));
Q('m_eq_second', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Besides MRSxy = Px ÷ Py, the second condition for consumer\'s equilibrium is that',
  opts: [
    'the indifference curve is convex to the origin at the point of tangency, so MRS is diminishing there',
    'the budget line is convex to the origin',
    'the consumer buys equal quantities of the two goods',
    'the prices of the two goods are equal',
  ],
  sol: 'Tangency alone is not enough: if the curve were concave at the point, the tangency would give minimum, not maximum, satisfaction. The budget line is straight, and equal quantities or prices are not required.',
}));
Q('ar_eq_tangent', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'At the point of consumer\'s equilibrium the slope of the indifference curve equals the slope of the budget line.',
  r: 'The consumer\'s willingness to substitute one good for the other (MRS) must equal the rate at which the market allows her to substitute them (Px ÷ Py).',
  sol: 'Both true; R explains A. The slope of the indifference curve is MRS and the slope of the budget line is Px ÷ Py; equilibrium needs the two rates to be equal.',
}));
Q('tf_eq_spend', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? At the equilibrium point in indifference curve analysis, the consumer spends her entire income.',
  sol: 'The equilibrium lies on the budget line, where Px·X + Py·Y = M, so the whole income is spent.',
}));
Q('n_eq_x', num({
  t: 5, d: 3, c: 'application', marks: 1, value: FARHAN_EQ.x, unit: 'bus rides',
  stem: `Farhan in an imagined Hyderabad spends ₹${FARHAN.M} on bus rides (X, ₹${FARHAN.px}) and cinema tickets (Y, ₹${FARHAN.py}). His indifference curves are X × Y = constant, so MRS = Y ÷ X. How many bus rides does he buy in equilibrium?`,
  sol: `Step 1: MRS = Px ÷ Py gives Y ÷ X = ${FARHAN.px} ÷ ${FARHAN.py} = 0.25, so X = 4Y.\nStep 2: 5X + 20Y = 200 with X = 4Y gives 40Y = 200, Y = ${FARHAN_EQ.y} and X = ${FARHAN_EQ.x}. So ${FARHAN_EQ.x} bus rides.`,
}));
assert(4 * FARHAN_EQ.y === FARHAN_EQ.x && 40 * FARHAN_EQ.y === 200, 'Farhan steps');
Q('n_eq_y', num({
  t: 5, d: 3, c: 'application', marks: 1, value: ROHIT_EQ.y, unit: 'tickets',
  stem: `Rohit in an imagined Ranchi spends ₹${ROHIT.M} on cricket-net sessions (X, ₹${ROHIT.px}) and swimming-pool tickets (Y, ₹${ROHIT.py}). His indifference curves are X × Y = constant, so his MRS is Y ÷ X. How many swimming-pool tickets does he buy in equilibrium?`,
  sol: `Step 1: MRS = Px ÷ Py gives Y ÷ X = ${ROHIT.px} ÷ ${ROHIT.py} = 1.5, so Y = 1.5X.\nStep 2: 30X + 20(1.5X) = 360 gives 60X = 360, X = ${ROHIT_EQ.x} and Y = ${ROHIT_EQ.y}. So ${ROHIT_EQ.y} tickets.`,
}));
assert(60 * ROHIT_EQ.x === 360 && 1.5 * ROHIT_EQ.x === ROHIT_EQ.y, 'Rohit steps');
Q('s_eq_two_cond', short({
  t: 5, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two conditions of consumer\'s equilibrium in indifference curve analysis.',
  model: '1. **MRSxy = Px ÷ Py:** the budget line is **tangent** to an indifference curve, so the slopes are equal.\n2. **MRS diminishing at that point:** the indifference curve is **convex to the origin** at the point of tangency, so the tangency gives the **highest** attainable satisfaction.',
  sol: 'Tangency (slopes equal) and convexity.',
  scheme: [['MRS = price ratio (tangency)', 1], ['Convexity / diminishing MRS at the point', 1]],
}));
Q('s_eq_mrs_less', short({
  t: 5, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'A shopper at an imagined Kolkata New Market finds that her MRS of shirts for trousers is less than the ratio of the price of shirts to the price of trousers. How should she change her purchases, and why?',
  model: 'She values a shirt at **fewer trousers than the market charges** for it, so she should **buy fewer shirts and more trousers**. As she gives up shirts, her **MRS of shirts for trousers rises** until it **equals the price ratio**, where she is in equilibrium.',
  sol: 'MRS less than the price ratio: substitute away from X until equality.',
  scheme: [['Buy fewer X, more Y', 1], ['MRS rises to the price ratio', 1]],
}));
Q('s3_eq_diagram', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'With the help of a diagram, explain consumer\'s equilibrium in indifference curve analysis. Show why the points where the budget line cuts a lower indifference curve are not equilibrium points.',
  model: 'Draw an **indifference map** (IC₁, IC₂, IC₃) and a **budget line AB**. AB is **tangent to IC₂ at E**: here **MRS = Px ÷ Py** and IC₂ is **convex**, so E is the equilibrium.\nAB **cuts IC₁** at R and S. At **R**, MRS > Px ÷ Py, so moving down the line towards E raises satisfaction; at **S**, MRS is below the price ratio, so moving up towards E helps. IC₃ is **unattainable**.',
  sol: 'Tangency at E with both conditions; cutting points can be improved; higher curve out of reach.',
  scheme: [['Diagram with map, budget line and tangency E', 1], ['Conditions at E', 1], ['R and S not equilibrium; IC₃ unattainable', 1]],
}));
Q('s3_eq_numerical', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Meenal at an imagined Indore stationery shop has ₹${MEENAL.M}; notebooks (X) cost ₹${MEENAL.px} and pens (Y) ₹${MEENAL.py}. Her indifference curves are X × Y = constant, so MRS = Y ÷ X. Find her equilibrium bundle and check both conditions.`,
  model: `Tangency: **Y ÷ X = ${MEENAL.px} ÷ ${MEENAL.py} = ${MEENAL_B.slope}**, so Y = 2X. Budget: 20X + 10(2X) = 240 gives **X = ${MEENAL_EQ.x}**, **Y = ${MEENAL_EQ.y}**.\nCheck: cost = 6 × 20 + 12 × 10 = **₹240** (whole income); MRS = 12 ÷ 6 = **2** = price ratio; the curves X × Y = constant are **convex**, so (6, 12) is the equilibrium on the curve X × Y = ${MEENAL_EQ.level}.`,
  sol: 'Set MRS equal to the price ratio, combine with the budget, then verify.',
  scheme: [['Tangency condition used', 1], ['Bundle (6, 12) found', 1], ['Both conditions verified', 1]],
}));
Q('s3_eq_adjust', short({
  t: 5, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: `Sameer, at an imagined Bhopal college canteen, would give up ${SAMEER_MRS} jalebis for one more samosa, while the price ratio of samosa to jalebi is ${SAMEER_RATIO}. His friend says he is "in equilibrium because he is spending all his pocket money". Evaluate the friend's claim.`,
  model: `The claim is **wrong**. Spending all income only puts Sameer **on the budget line**; it is **one** requirement, not the equilibrium itself. Here **MRS (${SAMEER_MRS}) > Px ÷ Py (${SAMEER_RATIO})**: he values a samosa more than it costs in jalebis, so swapping jalebis for samosas would put him on a **higher indifference curve**. He should buy **more samosas** until his MRS falls to ${SAMEER_RATIO}.`,
  sol: 'Being on the budget line is necessary but not sufficient; the MRS must equal the price ratio.',
  scheme: [['Claim rejected', 1], ['MRS compared with price ratio', 1], ['Correct adjustment and reason', 1]],
}));
Q('l_eq_full', long({
  t: [5, 4], d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Explain consumer\'s equilibrium in indifference curve analysis with the help of a diagram, stating both conditions. (b) Explain what happens to the equilibrium when the consumer\'s income increases, prices remaining the same. (3 + 2)',
  model: '**(a) (3):** combine the **indifference map** with the **budget line AB**. The consumer reaches the **highest attainable curve, IC₂**, at the point **E** where AB is **tangent** to it. Conditions: (i) **MRSxy = Px ÷ Py** — the slope of IC₂ equals the slope of AB; (ii) **MRS diminishing** — IC₂ is **convex** at E. Points like R and S, where AB **cuts** a lower curve, give less satisfaction, and a higher curve such as IC₃ is **beyond reach**.\n**(b) (2):** a rise in income **shifts the budget line outward, parallel** to AB. It now touches a **higher indifference curve** at a new point **E′**, so the consumer reaches **higher satisfaction**; for normal goods she buys **more of both** goods.',
  sol: 'Diagram, both conditions and why other points fail; then the income effect on the equilibrium.',
  scheme: [['Diagram with tangency at E', 1], ['MRS = Px ÷ Py', 1], ['Convexity condition; other points rejected', 1], ['Parallel outward shift of the budget line', 1], ['New equilibrium on a higher curve', 1]],
}));
Q('l_eq_price_fall', long({
  t: [5, 4], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Kunal in an imagined Guwahati spends ₹${KUNAL.M} on metro rides (X, ₹${KUNAL.px}) and snack packets (Y, ₹${KUNAL.py}); his indifference curves are X × Y = constant, so MRS = Y ÷ X. (a) Find his equilibrium bundle. (b) The metro fare falls to ₹20. Find the new equilibrium and explain the change with a diagram. (2 + 3)`,
  model: `**(a) (2):** MRS = Px ÷ Py gives Y ÷ X = 30 ÷ 15 = 2, so Y = 2X; 30X + 15(2X) = 300 gives **X = ${eqXY(300, 30, 15).x}, Y = ${eqXY(300, 30, 15).y}**.\n**(b) (3):** the budget line **rotates outward on the y-axis**: the x-intercept rises from **10 to 15** rides, the y-intercept stays **20**. New tangency: Y ÷ X = 20 ÷ 15, so Y = (4 ÷ 3)X; 20X + 15 × (4 ÷ 3)X = 300 gives **X = ${eqXY(300, 20, 15).x}, Y = ${eqXY(300, 20, 15).y}**. In the diagram the flatter line touches a **higher indifference curve** at the new point. He takes **more metro rides** (5 → 7.5) while snacks stay at 10: a lower price raises the quantity demanded.`,
  sol: 'Tangency with the budget for each set of prices; describe the rotation and the new point.',
  scheme: [['Initial equilibrium (5, 10)', 1], ['Rotation of the budget line described', 1], ['New tangency condition', 1], ['New equilibrium (7.5, 10)', 1], ['Higher curve; more X demanded', 1]],
}));
assert(eqXY(300, 30, 15).x === 5 && eqXY(300, 30, 15).y === 10 && eqXY(300, 20, 15).x === 7.5 && eqXY(300, 20, 15).y === 10, 'l_eq_price_fall values');

// ---------------------------------------------------------------- ISC paper-style items (4 and 8 marks; bank only)
Q('s4_mrs_isc', short({
  t: [2, 3], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: `(i) Neha at an imagined Mysuru silk emporium is indifferent between (1 saree, 9 stoles), (2 sarees, 5 stoles) and (3 sarees, 2 stoles). Calculate her MRS of sarees for stoles at each step and say what shape her indifference curve has. [2]\n\n(ii) Her cousin's schedule shows an MRS that stays at 3 stoles per saree throughout. Explain how the cousin's indifference curve differs and why. [2]`,
  model: `(i) MRS = ΔY ÷ ΔX: from the first to the second bundle **${mrs([[1, 9], [2, 5], [3, 2]])[0]}** stoles per saree, then **${mrs([[1, 9], [2, 5], [3, 2]])[1]}**. The MRS **diminishes**, so the curve slopes **downward** and is **convex to the origin**.\n(ii) A **constant MRS** means the slope of the curve **never changes**, so the cousin's indifference curve is a **straight downward-sloping line**, not convex. It implies she treats sarees and stoles as **perfect substitutes** at a fixed rate of 3 to 1, which breaks the usual assumption of diminishing MRS.`,
  sol: 'Successive ΔY ÷ ΔX and shape; constant MRS gives a straight line.',
  scheme: [['MRS values 4 and 3', 1], ['Diminishing MRS: convex curve', 1], ['Constant MRS: straight line', 1], ['Reason: constant slope / perfect substitutes', 1]],
}));
assert(mrs([[1, 9], [2, 5], [3, 2]]).join() === '4,3', 's4_mrs_isc');
Q('s4_bl_isc', short({
  t: [4, 5], d: 3, c: 'application', marks: 4, wl: S4,
  stem: `(i) Aarav in an imagined Chandigarh has ₹${ROHIT.M} for badminton court hours (X, ₹${ROHIT.px}) and shuttlecock boxes (Y, ₹${ROHIT.py}). Write his budget equation and find both intercepts and the slope. [2]\n\n(ii) Explain why a bundle inside his budget line cannot be his equilibrium, even if it lies on a convex indifference curve. [2]`,
  model: `(i) **${ROHIT.px}X + ${ROHIT.py}Y = ${ROHIT.M}**. Intercepts: **${budget(ROHIT.M, ROHIT.px, ROHIT.py).xi} court hours** and **${budget(ROHIT.M, ROHIT.px, ROHIT.py).yi} boxes**; slope (absolute) = 30 ÷ 20 = **${budget(ROHIT.M, ROHIT.px, ROHIT.py).slope}**.\n(ii) A bundle **inside** the line leaves **part of his income unspent**. With more of a good preferred to less, he could buy **more of one or both goods** and reach a **higher indifference curve** without exceeding his income. So satisfaction is **not maximised** there; equilibrium must lie **on** the budget line, at its tangency with the highest attainable curve.`,
  sol: 'Equation, intercepts and slope; unspent income means a higher curve is reachable.',
  scheme: [['Budget equation', 1], ['Intercepts and slope', 1], ['Income unspent inside the line', 1], ['Higher curve reachable; equilibrium on the line', 1]],
}));
assert(budget(360, 30, 20).xi === 12 && budget(360, 30, 20).yi === 18 && budget(360, 30, 20).slope === 1.5, 's4_bl_isc');
Q('l8_ic_isc', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `(i) Using Suresh's indifference schedule at an imagined Patna office — ${SURESH.map(([x, y]) => `(${x} cups of tea, ${y} packets of biscuits)`).join('; ')} — calculate the MRS at each step and explain the principle of diminishing MRS and its link with the shape of the curve. [4]\n\n(ii) Explain why indifference curves slope downward and why two indifference curves can never intersect. Use a diagram for the second property. [4]`,
  model: `(i) MRS of tea for biscuits = ΔY ÷ ΔX: **${SURESH_MRS.join(', ')}** packets per cup. As Suresh drinks **more tea**, each extra cup matters **less** to him while each remaining packet of biscuits matters **more**, so he gives up **fewer packets** for each extra cup: the **MRS diminishes**. The MRS is the absolute **slope** of the indifference curve, so a falling MRS makes the curve **flatter** as tea increases — the curve is **convex to the origin**.\n(ii) **Downward slope:** to keep satisfaction **unchanged**, more tea must be offset by **fewer biscuits**; a rising curve would give more of both goods at the same satisfaction, contradicting non-satiety. **No intersection:** suppose IC₁ and IC₂ cross at **A**. Take **B** on IC₁ and **C** on IC₂ with the **same tea but more biscuits** than B. Since A is indifferent to both B and C, **B and C** must be indifferent (**transitivity**), yet C has **more biscuits**, so C is **preferred** to B. This **contradiction** proves the curves cannot intersect.`,
  sol: 'MRS values with the reason and convexity; slope and non-intersection with a diagram-based proof.',
  scheme: [['MRS values 6, 4, 2, 1', 1], ['Reason for diminishing MRS', 1], ['MRS as slope', 1], ['Convexity', 1], ['Downward slope explained', 1], ['Diagram with A, B, C', 1], ['Transitivity step', 1], ['Contradiction with non-satiety', 1]],
}));
Q('l8_eq_isc', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `(i) Tanya at an imagined Nagpur book fair has ₹${TANYA.M}; novels (X) cost ₹${TANYA.px} and magazines (Y) ₹${TANYA.py}. Draw (describe) her budget line, and explain how it would change if both prices doubled while her income also doubled. [4]\n\n(ii) Her indifference curves are X × Y = constant (MRS = Y ÷ X). Find her equilibrium bundle and evaluate the suggestion of a friend that she should "buy 8 novels and 6 magazines because that also uses the whole ₹${TANYA.M}". [4]`,
  model: `(i) Budget equation **${TANYA.px}X + ${TANYA.py}Y = ${TANYA.M}**; intercepts **${budget(TANYA.M, TANYA.px, TANYA.py).xi} novels** and **${budget(TANYA.M, TANYA.px, TANYA.py).yi} magazines**; slope 15 ÷ 10 = **1.5**. The **budget set** is the triangle under the line. If **income and both prices double**, the intercepts are 360 ÷ 30 = **12** and 360 ÷ 20 = **18** again, and the slope stays **1.5**: the budget line **does not change**, so her choices are unaffected.\n(ii) Tangency: **Y ÷ X = 1.5**, so Y = 1.5X; 15X + 10(1.5X) = 180 gives **X = ${TANYA_EQ.x}, Y = ${TANYA_EQ.y}**. The friend's bundle (8, 6) does cost **₹180**, so it lies **on** the budget line, but there **MRS = 6 ÷ 8 = 0.75**, which is **below 1.5**: Tanya would gain by giving up novels for magazines. So (8, 6) is a **cutting point** on a **lower** indifference curve (X × Y = 48 against **${TANYA_EQ.x * TANYA_EQ.y}** at the equilibrium). The suggestion is **not optimal**: spending all income is necessary but not sufficient.`,
  sol: 'Budget line and the all-double case; tangency bundle; compare MRS and satisfaction levels at the friend\'s bundle.',
  scheme: [['Budget equation, intercepts and slope', 1], ['Budget set', 1], ['All double: intercepts recomputed', 1], ['Line unchanged', 1], ['Tangency condition', 1], ['Equilibrium (6, 9)', 1], ['Friend\'s bundle: MRS 0.75 vs 1.5', 1], ['Lower curve; judgement', 1]],
}));
assert(TANYA_EQ.x * TANYA_EQ.y === 54 && 8 * 6 === 48 && budget(TANYA.M, TANYA.px, TANYA.py).xi === 12 && budget(TANYA.M, TANYA.px, TANYA.py).yi === 18, 'l8_eq_isc');

// ---------------------------------------------------------------- case-based (bank; internal choice)
Q('cb_stationery', caseQ({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case about Meenal\'s term shopping at an Indore stationery shop and answer the questions that follow. *(Imagined shop and figures, written by SOYL for practice.)*',
  passage: `**Meenal plans her term purchases (imagined, Indore)**\n\nMeenal has ₹${MEENAL.M} for the term. Notebooks cost ₹${MEENAL.px} each and pens ₹${MEENAL.py} each. Her indifference curves between notebooks (X) and pens (Y) have the form X × Y = constant, so the number of pens she would give up for one more notebook equals Y ÷ X. She first thinks of buying 4 notebooks and 16 pens.`,
  parts: [
    child('a', num({ t: 4, d: 1, c: 'understanding', marks: 1, value: MEENAL_B.xi, unit: 'notebooks', stem: 'What is the largest number of notebooks Meenal can buy?', sol: `Step 1: x-intercept = M ÷ Px.\nStep 2: ${MEENAL.M} ÷ ${MEENAL.px} = ${MEENAL_B.xi} notebooks.` })),
    child('b', num({ t: 5, d: 2, c: 'application', marks: 1, value: 16 / 4, unit: 'pens per notebook', stem: 'What is her MRS of notebooks for pens at her first plan (4 notebooks, 16 pens)?', sol: 'Step 1: MRS = Y ÷ X on these curves.\nStep 2: 16 ÷ 4 = 4 pens per notebook.' })),
    child('c', short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Is her first plan an equilibrium? If not, how should she change it?', model: `The plan costs 4 × 20 + 16 × 10 = **₹${cost(4, 16, 20, 10)}**, so it is on the budget line, but **MRS = 4 > Px ÷ Py = 2**. She should **buy more notebooks and fewer pens**, reaching **(${MEENAL_EQ.x}, ${MEENAL_EQ.y})** where MRS = 2.`, sol: 'On the line but MRS exceeds the price ratio.', scheme: [['MRS compared with price ratio', 1], ['Adjustment to (6, 12)', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): If the shop raises the price of pens to ₹20, what happens to her budget line?', model: 'The **x-intercept stays at 12 notebooks**, but the **y-intercept falls** from 24 to **12 pens**. The line **rotates inward on the x-axis** and its slope falls from 2 to **1**.', sol: 'Only the pen intercept and the slope change.', scheme: [['Intercepts recomputed', 1], ['Inward rotation, slope 1', 1]] }),
    ]),
  ],
}));
assert(cost(4, 16, 20, 10) === 240 && budget(240, 20, 20).yi === 12 && budget(240, 20, 20).slope === 1, 'cb_stationery');
Q('cb_survey', caseQ({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the preference survey from an imagined Thrissur school canteen and answer the questions that follow. *(Imagined survey, written by SOYL for practice.)*',
  passage: '**Canteen preference survey (imagined, Thrissur)**\n\nA student, Anjali, was asked to compare snack bundles of banana chips packets (X) and lime-juice glasses (Y). She said: "I am equally happy with P (2 packets, 6 glasses) and Q (4 packets, 3 glasses). I prefer R (4 packets, 4 glasses) to Q. I am also equally happy with P and R." Her teacher circled the last sentence and wrote "inconsistent".',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Which pair of bundles lies on the same indifference curve according to her first statement?', opts: ['P and Q', 'Q and R', 'P only', 'R only'], sol: 'She is equally happy with P and Q, so they lie on one indifference curve.' })),
    child('b', mcq({ t: 3, d: 2, c: 'application', stem: 'Compared with Q, bundle R lies on', opts: ['a higher indifference curve, because it has one more glass and the same packets', 'the same indifference curve', 'a lower indifference curve', 'the budget line'], sol: 'R has the same packets and one more glass than Q, so by non-satiety it is on a higher curve.' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the teacher called the last sentence "inconsistent".', model: 'P ~ Q and P ~ R would give **Q ~ R** by **transitivity**. But R has **more** than Q and is **preferred** to it. So P could not be on the curve of both Q and R: that would make **two indifference curves meet** at P, which is impossible.', sol: 'Transitivity with non-satiety gives a contradiction.', scheme: [['Transitivity gives Q indifferent to R', 1], ['Contradiction with R preferred: curves would intersect', 1]] }), [
      short({ t: 1, d: 2, c: 'understanding', marks: 2, stem: '**Or** (ii): What does the survey tell us about the ordinal approach to utility?', model: 'Anjali only **ranks** bundles (preferred, indifferent) without giving numbers. The **ordinal approach** needs exactly this information, provided her rankings are **consistent** (transitive).', sol: 'Ranking without numbers, needing consistency.', scheme: [['Ranking without measurement', 1], ['Consistency requirement', 1]] }),
    ]),
  ],
}));
