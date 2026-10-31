// ISC 12 Economics, ch02 Consumer Behaviour: Cardinal Utility Analysis — question bank. Every consumer,
// schedule and scenario is imagined by SOYL; no textbook table (pizza, ice cream, oranges), ISC specimen or
// past-paper item is reused. Every number in a key, option or worked solution is computed here.
// Removed topic (ISC 2027): criticisms of the Law of Diminishing Marginal Utility — only its assumptions are taught.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [80, 120];
const L5 = [100, 130];
const L8 = [170, 230];

// ---------------------------------------------------------------- helpers (all asserted)
export function assert(cond, msg) {
  if (!cond) throw new Error(`ch02 data check failed: ${msg}`);
}
/** Marginal utilities from a total-utility schedule that starts at the first unit. */
export function muFrom(tu) {
  return tu.map((t, i) => t - (i === 0 ? 0 : tu[i - 1]));
}
/** Total utilities from marginal utilities. */
export function tuFrom(mu) {
  let s = 0;
  return mu.map((m) => (s += m));
}
/** One-commodity equilibrium: the largest quantity whose MU (in rupees) is still at least the price. */
export function eqOne(muRupees, price) {
  let q = 0;
  for (let i = 0; i < muRupees.length; i++) if (muRupees[i] >= price) q = i + 1;
  return q;
}
/**
 * Two-commodity equilibrium by the Law of Equimarginal Utility with whole units: buy, one unit at a time, the good with
 * the higher MU per rupee while income lasts. Returns { x, y, spent, ratio }; ratio is the common MU per rupee of the
 * last units when MUx/Px = MUy/Py holds there, else null.
 */
export function equi(muX, muY, px, py, income) {
  let x = 0, y = 0, spent = 0;
  for (;;) {
    const rx = x < muX.length && spent + px <= income ? muX[x] / px : -Infinity;
    const ry = y < muY.length && spent + py <= income ? muY[y] / py : -Infinity;
    if (rx <= 0 && ry <= 0) break;
    if (rx >= ry) { x++; spent += px; } else { y++; spent += py; }
  }
  return { x, y, spent, ratio: x && y && muX[x - 1] / px === muY[y - 1] / py ? muX[x - 1] / px : null };
}
const sum = (a) => a.reduce((s, v) => s + v, 0);

// ---------------------------------------------------------------- data sets (imagined)
// D1 — Arjun and plates of jalebi at an imagined Jaipur winter fair (deck and notes).
export const JALEBI_TU = [20, 36, 48, 56, 60, 60, 56];
export const JALEBI_MU = muFrom(JALEBI_TU);
assert(JALEBI_MU.join() === '20,16,12,8,4,0,-4', 'jalebi MU');
export const JALEBI_SAT = JALEBI_MU.indexOf(0) + 1;
assert(JALEBI_SAT === 6 && JALEBI_TU[5] === Math.max(...JALEBI_TU), 'satiety where TU is maximum');
// One commodity: 1 util = ₹1, a plate costs ₹8.
export const JALEBI_PRICE = 8;
export const JALEBI_EQ = eqOne(JALEBI_MU, JALEBI_PRICE);
assert(JALEBI_EQ === 4, 'jalebi equilibrium');
// D2 — Meera's cups of filter coffee in an imagined Chennai office canteen.
export const COFFEE_TU = [15, 27, 36, 42, 45, 45, 42];
export const COFFEE_MU = muFrom(COFFEE_TU);
assert(COFFEE_MU.join() === '15,12,9,6,3,0,-3', 'coffee MU');
// D3 — Kabir at an imagined village fair near Lucknow with ₹18: toffee packets (X) ₹2, balloons (Y) ₹4 (deck).
export const TOF_MU = [20, 16, 12, 10, 8, 6];
export const BAL_MU = [40, 32, 24, 16, 12, 8];
export const TOF_P = 2, BAL_P = 4, KABIR_M = 18;
export const KABIR = equi(TOF_MU, BAL_MU, TOF_P, BAL_P, KABIR_M);
assert(KABIR.x === 3 && KABIR.y === 3 && KABIR.spent === 18 && KABIR.ratio === 6, `Kabir ${JSON.stringify(KABIR)}`);
// D4 — Tanvi at an imagined Pune book fair with ₹45: comics (X) ₹5, puzzle books (Y) ₹10 (questions).
export const COMIC_MU = [50, 45, 40, 35, 30];
export const PUZ_MU = [120, 100, 80, 60];
export const COMIC_P = 5, PUZ_P = 10, TANVI_M = 45;
export const TANVI = equi(COMIC_MU, PUZ_MU, COMIC_P, PUZ_P, TANVI_M);
assert(TANVI.x === 3 && TANVI.y === 3 && TANVI.spent === 45 && TANVI.ratio === 8, `Tanvi ${JSON.stringify(TANVI)}`);
// D5 — Harpreet's glasses of lassi on a hot afternoon in an imagined Amritsar dhaba; MU in rupees, price ₹30.
export const LASSI_MU = [70, 50, 30, 10, -10];
export const LASSI_P = 30;
export const LASSI_EQ = eqOne(LASSI_MU, LASSI_P);
assert(LASSI_EQ === 3, 'lassi equilibrium');
// D6 — Nikhil's tender coconuts on an imagined Goa beach: TU in utils, 1 util = ₹2, price ₹20.
export const COCO_TU = [24, 42, 54, 60, 62];
export const COCO_MU = muFrom(COCO_TU);
assert(COCO_MU.join() === '24,18,12,6,2', 'coconut MU');
export const COCO_RUPEE = 2, COCO_P = 20;
export const COCO_MU_RS = COCO_MU.map((m) => m * COCO_RUPEE);
export const COCO_EQ = eqOne(COCO_MU_RS, COCO_P);
assert(COCO_EQ === 3, 'coconut equilibrium (MU in ₹ 48, 36, 24, 12, 4)');

// ================================================================ t01 Utility, TU and MU
Q('m_utility_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the cardinal approach, **utility** is best described as',
  opts: [
    'the want-satisfying power of a commodity, measured in imaginary units called utils',
    'the usefulness of a commodity to society as a whole',
    'the price that a consumer actually pays for a commodity',
    'the quantity of a commodity that a consumer buys in a week',
  ],
  sol: 'Utility is the capacity of a good to satisfy a want; cardinal analysis assumes it can be counted in utils. It is subjective (not social usefulness), and it is neither the price paid nor the quantity bought.',
}));
Q('m_mu_from_tu', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Meera's total utility from cups of filter coffee in an imagined Chennai canteen is ${COFFEE_TU.slice(0, 4).join(', ')} utils for the first to fourth cups. What is the marginal utility of the **fourth** cup?`,
  opts: [`${COFFEE_MU[3]} utils`, `${COFFEE_TU[3]} utils`, `${COFFEE_MU[2]} utils`, `${COFFEE_TU[3] / 4} utils`],
  sol: `MU of the 4th cup = TU(4) − TU(3) = ${COFFEE_TU[3]} − ${COFFEE_TU[2]} = ${COFFEE_MU[3]} utils. ${COFFEE_TU[3]} is total utility, ${COFFEE_MU[2]} is the MU of the third cup, and ${COFFEE_TU[3] / 4} is the average utility.`,
}));
Q('m_tu_max', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A trekker in an imagined Himachal camp keeps drinking cups of hot soup. Her total utility is at its **maximum** when the marginal utility of the next cup is',
  opts: ['zero', 'positive and rising', 'equal to total utility', 'negative'],
  sol: 'TU rises while MU is positive, stops rising when MU is zero (the point of satiety), and falls once MU turns negative. So TU is maximum where MU = 0.',
}));
Q('m_tu_falls', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'After the sixth plate of jalebi at a fair, Arjun feels uncomfortable and his total utility starts to fall. At this stage his marginal utility is',
  opts: ['negative', 'zero', 'positive but falling', 'equal to the price of a plate'],
  sol: 'TU falls only when each extra unit subtracts satisfaction, that is, when MU is negative (disutility). Zero MU keeps TU constant, and positive MU still raises it.',
}));
Q('m_tu_sum', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The marginal utilities a student in an imagined Shillong hostel gets from successive bowls of momos are ${[18, 14, 10, 6].join(', ')} utils. What is his total utility from **four** bowls?`,
  opts: [`${sum([18, 14, 10, 6])} utils`, '6 utils', `${18 + 14 + 10} utils`, `${18 * 4} utils`],
  sol: `TU is the sum of the marginal utilities of all units consumed: 18 + 14 + 10 + 6 = ${sum([18, 14, 10, 6])} utils. 6 is only the MU of the fourth bowl, 42 stops at three bowls, and 18 × 4 wrongly assumes MU stays constant.`,
}));
Q('m_util_subjective', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A cup of strong black coffee gives great satisfaction to a night-shift nurse in an imagined Bengaluru hospital but almost none to her daughter, who dislikes coffee. This shows that utility is',
  opts: ['subjective: it differs from person to person', 'the same as usefulness to health', 'fixed by the price of the good', 'objective and can be measured in money exactly'],
  sol: 'Utility depends on the consumer\'s own desire, so the same good gives different utility to different people. It is not the same as usefulness, it is not set by price, and it cannot be measured objectively.',
}));
Q('ar_tu_mu', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Total utility increases at a diminishing rate as long as marginal utility is positive and falling.',
  r: 'Each additional unit adds a smaller amount of utility than the unit before it.',
  sol: 'Both true; R explains A. TU rises because each MU is positive, but each addition is smaller than the last, so the rise slows down.',
}));
Q('tf_mu_negative_tu', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When the marginal utility of a good becomes negative, total utility also becomes negative.',
  sol: 'Negative MU makes TU fall, but TU stays positive until all the earlier utility is used up. In the jalebi example, TU falls from 60 to 56 utils when MU is −4.',
}));
Q('fb_satiety', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The point at which marginal utility becomes zero and total utility is at its maximum is called the point of ___.',
  acc: [['satiety', 'saturation']],
  sol: 'It is the point of satiety (saturation): the consumer wants no more of the good.',
}));
Q('n_mu_coffee', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: COFFEE_MU[4], unit: 'utils',
  stem: `Meera's total utility from five cups of filter coffee is ${COFFEE_TU[4]} utils and from four cups is ${COFFEE_TU[3]} utils. Find the marginal utility of the fifth cup.`,
  sol: `Step 1: MU₅ = TU₅ − TU₄.\nStep 2: ${COFFEE_TU[4]} − ${COFFEE_TU[3]} = ${COFFEE_MU[4]}. So MU = ${COFFEE_MU[4]} utils.`,
}));
Q('n_tu_coconut', num({
  t: 1, d: 2, c: 'application', marks: 1, value: COCO_TU[3], unit: 'utils',
  stem: `On an imagined Goa beach, Nikhil's marginal utilities from successive tender coconuts are ${COCO_MU.slice(0, 4).join(', ')} utils. Calculate his total utility from four coconuts.`,
  sol: `Step 1: TU = sum of MUs.\nStep 2: ${COCO_MU.slice(0, 4).join(' + ')} = ${COCO_TU[3]}. So TU = ${COCO_TU[3]} utils.`,
}));
Q('s_tu_mu_diff', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between total utility and marginal utility, with the help of a small numerical example of your own.',
  model: `**Total utility** is the sum of satisfaction from all units consumed; **marginal utility** is the change in TU from one more unit (MUₙ = TUₙ − TUₙ₋₁).\nExample: if TU from 2 cups is 27 utils and from 3 cups is 36 utils, TU(3) = **36** while MU of the 3rd cup = **9** utils.`,
  sol: 'Define both, then show with numbers that TU is a sum and MU is the change.',
  scheme: [['Both concepts defined', 1], ['Correct numerical illustration', 1]],
}));
Q('s_mu_zero_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A trekker says the fourth glass of water at a mountain stream "added nothing" to her satisfaction. What is her marginal utility of that glass, and what is happening to her total utility?',
  model: 'Her **marginal utility is zero** for the fourth glass. Her **total utility is at its maximum** and stays constant; she has reached the **point of satiety**, so a fifth glass would make TU fall.',
  sol: 'MU of the glass is zero; TU is maximum and constant at satiety.',
  scheme: [['MU is zero', 1], ['TU maximum / constant at satiety', 1]],
}));
Q('s3_tu_mu_three', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the relationship between total utility and marginal utility in three phases: when MU is positive, zero and negative. Use the jalebi example from your notes or one of your own.',
  model: `1. **MU positive (falling):** TU **rises**, but at a diminishing rate — plates 1 to 5 (MU 20 to 4), TU rises from 20 to 60.\n2. **MU zero:** TU is **maximum** and constant — the 6th plate adds 0 and TU stays 60 (point of satiety).\n3. **MU negative:** TU **falls** — the 7th plate gives −4 and TU drops to 56.`,
  sol: 'One phase per mark, each with what happens to TU and an illustration.',
  scheme: [['MU positive: TU rises at a diminishing rate', 1], ['MU zero: TU maximum (satiety)', 1], ['MU negative: TU falls', 1]],
}));
Q('s3_mu_schedule', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The total utility Meera gets from cups of filter coffee is: 1 cup ${COFFEE_TU[0]}, 2 cups ${COFFEE_TU[1]}, 3 cups ${COFFEE_TU[2]}, 4 cups ${COFFEE_TU[3]}, 5 cups ${COFFEE_TU[4]}, 6 cups ${COFFEE_TU[5]}, 7 cups ${COFFEE_TU[6]} utils. Derive the marginal utility schedule and identify the point of satiety.`,
  model: `MU = TUₙ − TUₙ₋₁: **${COFFEE_MU.join(', ')}** utils for cups 1 to 7.\nMU becomes **zero at the 6th cup**, where TU is maximum at ${COFFEE_TU[5]} utils: this is the **point of satiety**. The 7th cup has negative MU (${COFFEE_MU[6]}), so TU falls to ${COFFEE_TU[6]}.`,
  sol: 'Subtract successive TU values; satiety is where MU = 0.',
  scheme: [['MU schedule correct', 2], ['Point of satiety at the 6th cup with reason', 1]],
}));
Q('mt_terms', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each utility situation of a consumer at an imagined Mysuru food festival with what is happening to total utility.',
  pairs: [
    ['Marginal utility positive and falling', 'Total utility rises at a slower rate'],
    ['Marginal utility zero', 'Total utility is at its maximum'],
    ['Marginal utility negative', 'Total utility falls'],
    ['Marginal utility constant and positive', 'Total utility rises by equal amounts'],
  ],
  sol: 'The sign and trend of MU decide the movement of TU: positive raises it, zero holds it at the maximum, negative lowers it; a constant MU gives equal steps.',
}));

// ================================================================ t02 Law of Diminishing Marginal Utility
Q('m_ldmu_statement', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'According to the Law of Diminishing Marginal Utility, as a consumer takes more units of a good in succession,',
  opts: [
    'the utility from each additional unit falls, other things remaining the same',
    'the total utility from the good keeps falling from the first unit',
    'the price the consumer is willing to pay rises',
    'the utility from each additional unit rises until satiety',
  ],
  sol: 'The law states that marginal utility diminishes with each successive unit, ceteris paribus. TU does not fall from the first unit, willingness to pay falls (not rises), and MU does not rise.',
}));
Q('m_ldmu_assumption', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which one of these is an **assumption** of the Law of Diminishing Marginal Utility?',
  opts: [
    'Units of the good are consumed continuously, without a long time gap',
    'The consumer\'s income must rise as more units are bought',
    'Each unit must be of a different size and quality',
    'The consumer\'s tastes change after every unit',
  ],
  sol: 'The law assumes continuous consumption, standard (homogeneous) units, constant income and unchanged tastes. The other options contradict these assumptions.',
}));
Q('m_ldmu_gap', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Ravi eats one plate of idli in the morning and the next plate only in the evening, and he enjoys the evening plate just as much. Why does this **not** disprove the Law of Diminishing Marginal Utility?',
  opts: [
    'The law assumes continuous consumption; a long gap between units lets the want revive',
    'The law applies only to durable goods such as furniture',
    'The law assumes that units must be consumed at different prices',
    'The law holds only when marginal utility is negative',
  ],
  sol: 'Continuity is an assumption of the law. With a long time gap the want reappears, so equal satisfaction from the evening plate is outside the law\'s conditions.',
}));
Q('m_ldmu_curve', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Drawn with units of a good on the x-axis and marginal utility on the y-axis, the marginal utility curve under the Law of Diminishing Marginal Utility',
  opts: [
    'slopes downward from left to right and may cut the x-axis at the point of satiety',
    'slopes upward from left to right',
    'is a horizontal straight line',
    'starts at the origin and rises to a maximum',
  ],
  sol: 'MU falls with each unit, so the curve slopes downward; where MU becomes zero it meets the x-axis and below it MU is negative. The other shapes describe constant or rising MU, or a TU curve.',
}));
Q('m_ldmu_money', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Marginal utility analysis treats the marginal utility of money as **constant**. Which consumer behaviour best fits this assumption?',
  opts: [
    'A shopper spends a small part of her income on fruit, so her satisfaction from a rupee kept hardly changes',
    'A shopper spends almost all her income on one good, so each rupee left becomes far more precious',
    'A shopper refuses to use money and buys goods by barter',
    'A shopper borrows heavily each month, so money has no value to her',
  ],
  sol: 'The constant MU of money is reasonable when spending on the good is a small share of income, so a few rupees spent do not change the value of the rupees left. When most income goes on one good, the MU of the remaining money rises, which violates the assumption.',
}));
Q('ar_ldmu_homog', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'The Law of Diminishing Marginal Utility assumes that all units of the good are identical in size and quality.',
  r: 'Marginal utility is the addition to total utility from one more unit of a good.',
  sol: 'Both statements are true, but R only defines MU; it does not explain why the law needs homogeneous units (if later units were larger or better, MU could rise for that reason).',
}));
Q('ar_ldmu_hobby', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'A collector who gets more satisfaction from each extra rare stamp is an apparent exception to the law, because her tastes and the units differ.',
  r: 'The Law of Diminishing Marginal Utility applies even when tastes keep changing during consumption.',
  sol: 'A is true: rare stamps are not identical units and the hobby changes her tastes, so the law\'s assumptions do not hold. R is false: the law assumes tastes remain unchanged.',
}));
Q('tf_ldmu_units', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Law of Diminishing Marginal Utility assumes that the consumer is rational and that utility can be measured in cardinal numbers.',
  sol: 'Both are assumptions of the cardinal approach: utility is measurable in utils and the consumer behaves rationally.',
}));
Q('fb_constant_income', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The Law of Diminishing Marginal Utility assumes that the marginal utility of ___ remains constant.',
  acc: [['money']],
  sol: 'The marginal utility of money is assumed constant, so money can measure utility.',
}));
Q('ord_ldmu', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'A hungry traveller at an imagined Nagpur railway station eats plates of poha one after another. Arrange his marginal utility stages in the order in which they occur.',
  items: ['High positive marginal utility from the first plate', 'Smaller positive marginal utility from later plates', 'Zero marginal utility at the point of satiety', 'Negative marginal utility from a plate eaten beyond satiety'],
  sol: 'MU falls continuously: high, then smaller but positive, then zero at satiety, then negative.',
}));
Q('s_ldmu_two_assump', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two assumptions of the Law of Diminishing Marginal Utility.',
  model: '1. **Continuous consumption:** units are consumed one after another without a long time gap.\n2. **Homogeneous units:** every unit is of the same size, quality and taste. (Also: constant income, tastes and MU of money; cardinal measurement; rational consumer.)',
  sol: 'Any two of the standard assumptions, each briefly explained.',
  scheme: [['First assumption', 1], ['Second assumption', 1]],
}));
Q('s_ldmu_price', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A sugarcane-juice seller in an imagined Kolhapur market notices that customers who have drunk one glass will buy a second only if he lowers the price. Explain this using the Law of Diminishing Marginal Utility.',
  model: 'The second glass gives **less marginal utility** than the first. A consumer pays only up to what a unit is worth to her, so her **willingness to pay falls** with each glass. Hence the seller must **lower the price** to sell more glasses.',
  sol: 'Falling MU lowers the price a consumer is willing to pay for each extra unit.',
  scheme: [['MU of the second glass is lower', 1], ['Lower willingness to pay, so a lower price is needed', 1]],
}));
Q('s3_ldmu_explain', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State the Law of Diminishing Marginal Utility and explain it with a schedule of your own for a consumer eating plates of pani puri at an imagined Indore food street.',
  model: `**Law:** other things remaining the same, as a consumer consumes more units of a good continuously, the **marginal utility of each successive unit falls**.\nSchedule (utils): plate 1 → 16, plate 2 → 12, plate 3 → 8, plate 4 → 4, plate 5 → 0.\nEach plate satisfies the **want a little less**, because the hunger is partly met; at the 5th plate MU reaches **zero**.`,
  sol: 'Statement with ceteris paribus, a falling MU schedule, and the reason (want partly satisfied).',
  scheme: [['Correct statement of the law', 1], ['Suitable schedule with falling MU', 1], ['Explanation of why MU falls', 1]],
}));
Q('s3_ldmu_assump3', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three assumptions on which the Law of Diminishing Marginal Utility rests.',
  model: '1. **Cardinal measurability:** utility can be measured in numbers (utils) and expressed in money.\n2. **Continuity and standard units:** units are consumed without a time gap and are identical in size and quality.\n3. **Ceteris paribus:** the consumer\'s income, tastes, habits and the marginal utility of money remain constant.',
  sol: 'Three distinct assumptions, each with a one-line explanation.',
  scheme: [['First assumption explained', 1], ['Second assumption explained', 1], ['Third assumption explained', 1]],
}));
Q('l_ldmu_diagram', long({
  t: [2, 1], d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'With the help of a schedule and a diagram, explain the Law of Diminishing Marginal Utility. Show in the same answer how total utility behaves as marginal utility falls to zero and becomes negative. (2 + 3)',
  model: `**(a) Law and schedule (2):** ceteris paribus, MU of successive units falls. Arjun's plates of jalebi (utils): MU **${JALEBI_MU.join(', ')}**; TU **${JALEBI_TU.join(', ')}**.\n**(b) Diagram and TU (3):** plot units on the x-axis and MU on the y-axis: the **MU curve slopes downward**, cuts the x-axis at the **6th plate** (satiety) and goes **below** it at the 7th. In a TU diagram above it, TU **rises at a diminishing rate** for plates 1–5, is **maximum (60)** at the 6th where MU = 0, and **falls** to 56 when MU is negative.`,
  sol: 'Statement and schedule, then the MU curve and the matching TU behaviour in three phases.',
  scheme: [['Statement of the law', 1], ['Correct schedule of MU and TU', 1], ['Downward-sloping MU curve with satiety point', 1], ['TU rises at a diminishing rate while MU positive', 1], ['TU maximum at MU = 0 and falls when MU negative', 1]],
}));
Q('l_ldmu_assump_case', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Three situations from an imagined school in Kohima are given. For each, decide whether the Law of Diminishing Marginal Utility applies, naming the assumption that holds or is broken: (i) a student drinks four glasses of water after a football match; (ii) a student buys a novel today and the sequel six months later; (iii) a student eats one small and then one very large laddoo. Then state two more assumptions of the law. (3 + 2)',
  model: '**(a) (3):**\n(i) **Applies** — the glasses are drunk **continuously**, one after another, and every glass is identical, so each extra glass satisfies a thirst that is already partly met and MU falls.\n(ii) **Does not apply** — a **long time gap** of six months breaks the assumption of continuous consumption, and the sequel is in any case a different book, so its utility cannot be compared.\n(iii) **Does not apply** — the units are **not homogeneous**; the much larger laddoo can give more utility simply because it is bigger.\n**(b) (2):** the consumer\'s **income remains constant**; her **tastes and preferences**, and the **marginal utility of money**, stay unchanged while she consumes.',
  sol: 'Judge each case against continuity and homogeneity, then add two other assumptions.',
  scheme: [['Case (i) correctly judged with reason', 1], ['Case (ii) correctly judged with reason', 1], ['Case (iii) correctly judged with reason', 1], ['First further assumption', 1], ['Second further assumption', 1]],
}));
Q('s4_ldmu_isc', short({
  t: [2, 1], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: `(i) Nikhil's marginal utilities from tender coconuts on an imagined Goa beach are ${COCO_MU.join(', ')} utils. Derive his total utility schedule and say which law it illustrates. [2]\n\n(ii) A tourist argues: "Since my fifth coconut still gave me 2 utils, my total utility has stopped rising." Evaluate the claim. [2]`,
  model: `(i) TU is the running sum of MU: **${COCO_TU.join(', ')}** utils for coconuts 1 to 5. Because each coconut adds less satisfaction than the one before (MU falls from 24 to 2), the schedule illustrates the **Law of Diminishing Marginal Utility**.\n(ii) The claim is **wrong**. As long as MU is **positive** — even as small as 2 utils — **TU still rises**, here from ${COCO_TU[3]} to ${COCO_TU[4]} utils; it only rises **more slowly** than before. TU stops rising only when MU becomes **zero**, at the point of satiety, and it falls only when MU turns negative.`,
  sol: 'Cumulate MU for TU; positive MU always raises TU, however small.',
  scheme: [['TU schedule correct', 1], ['Law identified', 1], ['Claim rejected: positive MU raises TU', 1], ['Uses the figures 60 to 62', 1]],
}));

// ================================================================ t03 Consumer's equilibrium with one commodity
Q('m_eq_one_cond', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A consumer buying only one good is in equilibrium (in money terms) when',
  opts: ['the marginal utility of the good equals its price', 'total utility of the good is at its maximum', 'marginal utility of the good is zero', 'the price of the good is at its lowest'],
  sol: 'The condition is MUx = Px (MU measured in rupees, given a constant MU of money). Maximum TU (MU = 0) would mean paying for units worth nothing to the consumer.',
}));
Q('m_eq_one_sched', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Harpreet's marginal utility (in rupees) from successive glasses of lassi at an imagined Amritsar dhaba is ${LASSI_MU.map((m) => `₹${m}`).join(', ')}. If a glass costs ₹${LASSI_P}, how many glasses will she buy?`,
  opts: [`${LASSI_EQ}`, `${LASSI_EQ - 1}`, `${LASSI_EQ + 1}`, `${LASSI_MU.length}`],
  sol: `She buys while MU ≥ price: glasses 1–3 give ₹70, ₹50 and ₹30 ≥ ₹30; the 4th gives only ₹10 < ₹30. So she buys ${LASSI_EQ} glasses, where MU = P = ₹30.`,
}));
Q('m_eq_one_more', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'At his current purchase, the marginal utility (in rupees) of a consumer\'s last plate of chole bhature is greater than its price. To raise his total satisfaction he should',
  opts: ['buy more plates until marginal utility falls to the price', 'buy fewer plates until marginal utility rises to the price', 'keep buying the same number of plates', 'stop buying chole bhature altogether'],
  sol: 'When MU > P, an extra plate adds more satisfaction than the satisfaction of the money given up, so buying more raises total net gain; as he buys more, MU falls until MU = P.',
}));
Q('m_eq_price_rise', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Harpreet is in equilibrium buying ${LASSI_EQ} glasses of lassi at ₹${LASSI_P}. If the price rises to ₹50 (her marginal utilities in rupees being ${LASSI_MU.slice(0, 4).join(', ')}), she will now buy`,
  opts: [`${eqOne(LASSI_MU, 50)} glasses`, `${LASSI_EQ} glasses`, `${LASSI_EQ + 1} glasses`, 'no glasses'],
  sol: `Only glasses with MU ≥ ₹50 are worth buying: ₹70 and ₹50. So she buys ${eqOne(LASSI_MU, 50)} glasses. A higher price lowers the quantity demanded — the link between the equilibrium condition and the law of demand.`,
}));
Q('m_mum_role', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the one-commodity equilibrium MUx = Px, why must the marginal utility of money be assumed constant?',
  opts: [
    'So that money can serve as a fixed yardstick to express the utility of the good in rupees',
    'So that the price of the good never changes',
    'So that the consumer\'s income keeps rising',
    'So that total utility from the good becomes zero',
  ],
  sol: 'If each rupee always gives the same utility, utils can be converted into rupees and compared with the price. The assumption is about money\'s utility, not about prices or income.',
}));
Q('m_mu_utils_to_rs', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Nikhil's marginal utilities from tender coconuts are ${COCO_MU.join(', ')} utils, one util is worth ₹${COCO_RUPEE}, and a coconut costs ₹${COCO_P}. How many coconuts does he buy?`,
  opts: [`${COCO_EQ}`, `${COCO_EQ + 1}`, `${COCO_EQ - 1}`, `${COCO_MU.length}`],
  sol: `Convert MU to rupees: ${COCO_MU_RS.map((m) => `₹${m}`).join(', ')}. He buys while MU ≥ ₹${COCO_P}: coconuts 1–3 (₹48, ₹36, ₹24); the 4th (₹12) is not worth ₹20. So ${COCO_EQ} coconuts.`,
}));
Q('ar_eq_one', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A consumer of a single good stops buying it before total utility reaches its maximum.',
  r: 'Beyond the point where marginal utility equals price, each extra unit gives less satisfaction than the money paid for it.',
  sol: 'Both true; R explains A. Equilibrium is at MU = P, which comes before MU = 0 (maximum TU) as long as the price is positive; buying beyond it means paying more than the unit is worth to the consumer.',
}));
Q('tf_eq_tu_max', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A rational consumer of a single priced good always buys up to the point where total utility is maximum.',
  sol: 'He buys only up to MU = P. TU is maximum at MU = 0, so reaching it would mean paying a positive price for units that add (almost) nothing.',
}));
Q('n_eq_lassi_rise', num({
  t: 3, d: 2, c: 'application', marks: 1, value: eqOne(LASSI_MU, 10), unit: 'glasses',
  stem: `Harpreet's marginal utilities (in ₹) from glasses of lassi are ${LASSI_MU.join(', ')}. If the dhaba runs an offer at ₹10 a glass, how many glasses will she buy?`,
  sol: `Step 1: buy while MU ≥ ₹10: ₹70, ₹50, ₹30 and ₹10 qualify; the 5th glass (−₹10) does not.\nStep 2: so she buys ${eqOne(LASSI_MU, 10)} glasses.`,
}));
Q('n_eq_coconut', num({
  t: 3, d: 3, c: 'application', marks: 1, value: eqOne(COCO_MU_RS, 12), unit: 'coconuts',
  stem: `Nikhil's marginal utilities are ${COCO_MU.join(', ')} utils from successive coconuts and one util is worth ₹${COCO_RUPEE}. If the price falls to ₹12, how many coconuts will he buy?`,
  sol: `Step 1: MU in rupees = ${COCO_MU_RS.join(', ')}.\nStep 2: units with MU ≥ ₹12 are the first ${eqOne(COCO_MU_RS, 12)}. So he buys ${eqOne(COCO_MU_RS, 12)} coconuts.`,
}));
Q('s_eq_one_cond', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the condition of consumer\'s equilibrium when a consumer buys only one commodity, and explain why it must hold.',
  model: 'Condition: **MUx = Px** (marginal utility in rupees equals price), MU falling. If **MU > P**, buying more adds net gain; if **MU < P**, the last unit is worth less than its price, so buying less raises satisfaction. Only at equality is no change worthwhile.',
  sol: 'State MU = P and argue from the two inequalities.',
  scheme: [['Condition MUx = Px stated', 1], ['Reasoning from MU > P and MU < P', 1]],
}));
Q('s_eq_one_more_less', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: `At an imagined Amritsar dhaba, Harpreet (MU in ₹: ${LASSI_MU.slice(0, 4).join(', ')}) is persuaded to drink a fourth glass of lassi at ₹${LASSI_P}. Show why this lowers her total satisfaction.`,
  model: `The 4th glass gives MU of **₹10** but costs **₹30**, so she gives up money worth ₹30 of satisfaction for ₹10 of utility: a **net loss of ₹20**. Her best choice is **${LASSI_EQ} glasses**, where MU = P.`,
  sol: 'Compare MU of the 4th glass with its price and state the net loss.',
  scheme: [['MU of 4th glass vs price compared', 1], ['Net loss and correct equilibrium stated', 1]],
}));
Q('s3_eq_one_diagram', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Using Arjun's marginal utilities from jalebi (${JALEBI_MU.slice(0, 5).join(', ')} utils, 1 util = ₹1) and a price of ₹${JALEBI_PRICE} a plate, explain his equilibrium with the help of a diagram.`,
  model: `Draw the **MU curve** (units on x-axis, MU in ₹ on y-axis) sloping downward and a **horizontal price line at ₹${JALEBI_PRICE}**. They meet at the **${JALEBI_EQ}th plate**, where MU = P = ₹${JALEBI_PRICE}: this is equilibrium. To the left (plates 1–3) MU > P, so he gains by buying more; beyond it (5th plate, MU ₹4) MU < P, so he would lose.`,
  sol: 'Diagram with MU curve and price line; equilibrium where they cross; reasoning on both sides.',
  scheme: [['Diagram: falling MU curve and price line', 1], ['Equilibrium at the 4th plate, MU = P', 1], ['Reasoning for MU > P and MU < P', 1]],
}));
Q('s3_eq_one_demand', short({
  t: 3, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `Use Harpreet's marginal utilities from lassi (₹${LASSI_MU.slice(0, 4).join(', ₹')}) to show how the condition MU = P leads to a downward-sloping demand curve. Take prices ₹70, ₹50 and ₹30.`,
  model: `At **₹70** she buys **${eqOne(LASSI_MU, 70)}** glass (only the first has MU ≥ 70); at **₹50**, **${eqOne(LASSI_MU, 50)}** glasses; at **₹30**, **${eqOne(LASSI_MU, 30)}** glasses. Because **MU diminishes**, she buys more only when the **price falls** to the MU of the extra unit. Plotting these price–quantity pairs gives a **downward-sloping demand curve**.`,
  sol: 'Find quantity at each price from MU ≥ P, then link diminishing MU to the slope of demand.',
  scheme: [['Quantities at the three prices', 1], ['Link with diminishing MU', 1], ['Conclusion: downward-sloping demand curve', 1]],
}));
Q('l_eq_one_full', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Nikhil's marginal utilities from tender coconuts on an imagined Goa beach are ${COCO_MU.join(', ')} utils; one util is worth ₹${COCO_RUPEE} and a coconut costs ₹${COCO_P}. (a) Find his equilibrium purchase, showing your working. (b) Explain, with a diagram, why he would not buy one coconut more or one coconut less. (2 + 3)`,
  model: `**(a) (2):** MU in rupees = **${COCO_MU_RS.join(', ')}**. He buys while MU ≥ ₹${COCO_P}: coconuts 1–3 (₹48, ₹36, ₹24). The 4th is worth only ₹12. Equilibrium: **${COCO_EQ} coconuts**.\n**(b) (3):** On a diagram, the **MU curve (in ₹) slopes downward** and the **price line is horizontal at ₹${COCO_P}**. At ${COCO_EQ} coconuts MU (₹24) is closest to and not below the price — the equilibrium. **One less** (2 coconuts) would leave a unit worth ₹24 unbought although it costs ₹20: a gain of ₹4 is missed. **One more** (4 coconuts) costs ₹20 but gives ₹12: a loss of ₹8. So 3 is best.`,
  sol: 'Convert utils to rupees, apply MU ≥ P, then show the gain missed and loss incurred on either side.',
  scheme: [['MU converted to rupees', 1], ['Equilibrium of 3 coconuts', 1], ['Diagram with MU curve and price line', 1], ['One less: gain of ₹4 missed', 1], ['One more: loss of ₹8', 1]],
}));

// ================================================================ t04 Law of Equimarginal Utility
Q('m_emu_cond', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'With two goods X and Y, a consumer is in equilibrium according to the Law of Equimarginal Utility when',
  opts: ['MUx ÷ Px = MUy ÷ Py = MU of money, and the whole income is spent', 'MUx = MUy, whatever the prices', 'Px = Py', 'total utility from X equals total utility from Y'],
  sol: 'Utility per rupee must be equal across goods (and equal to the MU of money), with income exhausted. Equal MUs or equal prices are not required.',
}));
Q('m_emu_name', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The Law of Equimarginal Utility is also called the',
  opts: ['law of maximum satisfaction (law of substitution)', 'law of diminishing returns', 'law of supply', 'law of variable proportions'],
  sol: 'It explains how a consumer gets maximum satisfaction from limited income by substituting one good for another at the margin.',
}));
Q('m_emu_shift', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'A college student in an imagined Kochi hostel finds that the marginal utility per rupee of mobile data is higher than that of snacks. To raise his satisfaction from the same pocket money he should',
  opts: ['spend more on data and less on snacks until the utilities per rupee are equal', 'spend more on snacks and less on data', 'spend equal amounts on data and snacks', 'stop buying data'],
  sol: 'Moving a rupee from the good with lower MU per rupee to the good with higher MU per rupee raises total utility; as he buys more data its MU falls, and as he buys fewer snacks their MU rises, until the ratios are equal.',
}));
Q('m_emu_kabir', mcq({
  t: 4, d: 3, c: 'application',
  stem: `At an imagined village fair near Lucknow, Kabir has ₹${KABIR_M}. Toffee packets (X) cost ₹${TOF_P} and balloons (Y) cost ₹${BAL_P}. His marginal utilities are X: ${TOF_MU.join(', ')} and Y: ${BAL_MU.join(', ')} utils. Which combination puts him in equilibrium?`,
  opts: [`${KABIR.x} toffee packets and ${KABIR.y} balloons`, `5 toffee packets and 2 balloons`, `1 toffee packet and 4 balloons`, `9 toffee packets and no balloons`],
  sol: `MU per rupee: X ${TOF_MU.map((m) => m / TOF_P).join(', ')}; Y ${BAL_MU.map((m) => m / BAL_P).join(', ')}. With ${KABIR.x} X and ${KABIR.y} Y, both last ratios are ${KABIR.ratio} and spending is ${KABIR.x} × ${TOF_P} + ${KABIR.y} × ${BAL_P} = ₹${KABIR.spent}. 5 toffee packets and 2 balloons also cost ₹18 but leave unequal ratios (4 against 8); 1 toffee packet and 4 balloons cost ₹18 with ratios 10 against 4; 9 toffee packets are more than his schedule allows and give no balloons at all.`,
}));
Q('m_emu_mum', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In the condition MUx ÷ Px = MUy ÷ Py = MUm, the term MUm stands for',
  opts: ['the marginal utility of money (of a rupee kept)', 'the marginal utility of the cheaper good', 'the total utility of all money income', 'the market price of money'],
  sol: 'MUm is the utility of the last rupee — what the consumer gives up by spending it. Each good\'s utility per rupee must equal it.',
}));
Q('m_emu_price_fall', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'A consumer is in equilibrium buying tea and biscuits. The price of biscuits falls while his income and the price of tea are unchanged. Initially, his marginal utility per rupee spent on biscuits will',
  opts: ['rise above that of tea, so he buys more biscuits', 'fall below that of tea, so he buys fewer biscuits', 'stay equal to that of tea, so nothing changes', 'become zero'],
  sol: 'MU ÷ P rises when P falls, so biscuits now give more utility per rupee than tea. He shifts spending towards biscuits until diminishing MU restores equality.',
}));
Q('ar_emu', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'A consumer with limited income gains by transferring a rupee from a good with a lower marginal utility per rupee to one with a higher marginal utility per rupee.',
  r: 'The utility gained from the rupee spent on the second good exceeds the utility lost by reducing spending on the first.',
  sol: 'Both true; R explains A. The transfer increases total utility, and it continues until marginal utilities per rupee are equal.',
}));
Q('ar_emu_equalmu', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'In equilibrium a consumer must get equal marginal utility from the last unit of every good she buys.',
  r: 'The Law of Equimarginal Utility ignores the prices of goods.',
  sol: 'Both are false. Equilibrium needs equal MU **per rupee** (MU ÷ P), so goods with higher prices must have higher MUs; and prices are central to the law, not ignored.',
}));
Q('tf_emu_income', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The Law of Equimarginal Utility applies because the consumer\'s income is limited while her wants are many.',
  sol: 'With unlimited income she could satisfy every want to satiety; limited income forces her to allocate rupees where they add the most utility.',
}));
Q('n_emu_ratio', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: KABIR.ratio, unit: 'utils per rupee',
  stem: `In equilibrium Kabir buys his third balloon, whose marginal utility is ${BAL_MU[2]} utils, at ₹${BAL_P} each. What is his marginal utility of money?`,
  sol: `Step 1: in equilibrium MUy ÷ Py = MUm.\nStep 2: ${BAL_MU[2]} ÷ ${BAL_P} = ${KABIR.ratio}. So MUm = ${KABIR.ratio} utils per rupee.`,
}));
Q('n_emu_tanvi', num({
  t: 4, d: 3, c: 'application', marks: 1, value: TANVI.x, unit: 'comics',
  stem: `At an imagined Pune book fair, Tanvi has ₹${TANVI_M}. Comics cost ₹${COMIC_P} and puzzle books ₹${PUZ_P}. Her marginal utilities are comics ${COMIC_MU.join(', ')} and puzzle books ${PUZ_MU.join(', ')} utils. How many comics does she buy in equilibrium?`,
  sol: `Step 1: MU per rupee — comics ${COMIC_MU.map((m) => m / COMIC_P).join(', ')}; puzzle books ${PUZ_MU.map((m) => m / PUZ_P).join(', ')}.\nStep 2: buying in order of the highest ratio uses up ₹${TANVI_M} at ${TANVI.x} comics and ${TANVI.y} puzzle books, where both ratios equal ${TANVI.ratio} (${TANVI.x} × ${COMIC_P} + ${TANVI.y} × ${PUZ_P} = ${TANVI.spent}). So she buys ${TANVI.x} comics.`,
}));
Q('s_emu_state', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State the Law of Equimarginal Utility and write its equilibrium condition for two goods.',
  model: 'A consumer with limited income gets **maximum satisfaction** when she spends it so that the **marginal utility of the last rupee** is the **same in every use**.\nIn symbols, for goods X and Y: **MUx ÷ Px = MUy ÷ Py = MUm**, and her income must be fully used up.',
  sol: 'Statement plus the ratio condition and the budget condition.',
  scheme: [['Statement of the law', 1], ['Condition with budget spent', 1]],
}));
Q('s_emu_unequal', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A consumer finds that MUx ÷ Px = 8 and MUy ÷ Py = 5 utils per rupee. Explain how she will adjust her purchases.',
  model: 'Each rupee gives **more utility in X** (8) than in Y (5), so she **buys more X and less Y**. As she buys more X its MU **falls**, and as she buys less Y its MU **rises**, until the two ratios become **equal**.',
  sol: 'Shift spending to the good with the higher ratio; diminishing MU closes the gap.',
  scheme: [['Shift towards X, away from Y', 1], ['Ratios equalise through diminishing MU', 1]],
}));
Q('s3_emu_kabir', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Kabir (imagined fair near Lucknow) has ₹${KABIR_M}; toffee packets cost ₹${TOF_P} and balloons ₹${BAL_P}. His marginal utilities are toffee ${TOF_MU.join(', ')} and balloons ${BAL_MU.join(', ')} utils. Determine his equilibrium combination and his marginal utility of money.`,
  model: `MU per rupee: toffee **${TOF_MU.map((m) => m / TOF_P).join(', ')}**; balloons **${BAL_MU.map((m) => m / BAL_P).join(', ')}**.\nAt **${KABIR.x} toffee packets and ${KABIR.y} balloons**, both last ratios are **${KABIR.ratio}** and spending is ${KABIR.x} × ${TOF_P} + ${KABIR.y} × ${BAL_P} = **₹${KABIR.spent}** (whole income).\nSo **MUm = ${KABIR.ratio} utils per rupee**.`,
  sol: 'Compute ratios, find the equal ratio that exhausts income, read off MUm.',
  scheme: [['MU per rupee computed', 1], ['Equilibrium 3 + 3 with budget check', 1], ['MUm = 6', 1]],
}));
Q('s3_emu_why', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why a consumer who spends her whole income but has MUx ÷ Px greater than MUy ÷ Py is **not** in equilibrium, and how she reaches it.',
  model: '1. A rupee moved from Y to X **adds more utility** (MUx ÷ Px) than it **takes away** (MUy ÷ Py), so **total utility rises** — she was not at the maximum.\n2. She keeps **buying more X and less Y**.\n3. **Diminishing MU** lowers MUx and raises MUy until **MUx ÷ Px = MUy ÷ Py**; then no transfer can raise utility — equilibrium.',
  sol: 'Gain from transfer, direction of adjustment, and convergence through diminishing MU.',
  scheme: [['Transfer raises total utility', 1], ['Direction of adjustment', 1], ['Equality restored by diminishing MU', 1]],
}));
Q('s3_emu_price_effect', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `Tanvi (imagined Pune book fair) is in equilibrium with ${TANVI.x} comics at ₹${COMIC_P} and ${TANVI.y} puzzle books at ₹${PUZ_P}. If the price of comics rises to ₹10, explain, using the equimarginal condition, what happens to her purchase of comics.`,
  model: `At ₹10 the utility per rupee of her **last comic** falls from ${COMIC_MU[TANVI.x - 1] / COMIC_P} to **${COMIC_MU[TANVI.x - 1] / 10}**, below that of puzzle books (${PUZ_MU[TANVI.y - 1] / PUZ_P}). She **cuts back on comics** (whose MU then rises) and shifts spending to puzzle books until the ratios are equal again. So a **rise in price lowers the quantity of comics demanded** — the law of demand.`,
  sol: 'Higher price lowers MU per rupee, so she buys fewer comics until equality returns.',
  scheme: [['MU per rupee of comics falls below that of puzzle books', 1], ['Fewer comics, more puzzle books', 1], ['Link to the law of demand', 1]],
}));
Q('s3_emu_assump', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three assumptions on which the Law of Equimarginal Utility is based.',
  model: '1. Utility is **cardinally measurable** and the **MU of money is constant**.\n2. The consumer\'s **income is limited and given**, and **prices** of goods are given.\n3. Each good obeys the **Law of Diminishing Marginal Utility**, and the consumer is **rational**, aiming at maximum satisfaction.',
  sol: 'Any three standard assumptions.',
  scheme: [['First assumption', 1], ['Second assumption', 1], ['Third assumption', 1]],
}));
Q('l_emu_table', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Tanvi has ₹${TANVI_M} at an imagined Pune book fair. Comics cost ₹${COMIC_P} and puzzle books ₹${PUZ_P}; her marginal utilities are comics ${COMIC_MU.join(', ')} and puzzle books ${PUZ_MU.join(', ')} utils. (a) State the Law of Equimarginal Utility. (b) Find her equilibrium purchase and her marginal utility of money, showing the table of MU per rupee. (2 + 3)`,
  model: `**(a) (2):** a consumer with limited income maximises satisfaction by spending so that the **MU of the last rupee is equal in all uses**: MUx ÷ Px = MUy ÷ Py = MUm, with income fully spent.\n**(b) (3):** MU per rupee — comics **${COMIC_MU.map((m) => m / COMIC_P).join(', ')}**; puzzle books **${PUZ_MU.map((m) => m / PUZ_P).join(', ')}**. Buying in order of the highest ratio, ₹${TANVI_M} is used up at **${TANVI.x} comics and ${TANVI.y} puzzle books** (${TANVI.x} × ${COMIC_P} + ${TANVI.y} × ${PUZ_P} = ₹${TANVI.spent}), where both ratios are **${TANVI.ratio}**. So **MUm = ${TANVI.ratio} utils per rupee**.`,
  sol: 'Statement; ratio table; equal ratios with the budget exhausted; MUm.',
  scheme: [['Statement of the law', 1], ['Condition with budget', 1], ['MU per rupee table', 1], ['Equilibrium 3 comics and 3 puzzle books', 1], ['MUm = 8', 1]],
}));
Q('l_emu_explain', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A family in an imagined Bhopal colony has a fixed monthly budget for milk and vegetables. (a) Explain, with a hypothetical schedule, how the family reaches equilibrium under the Law of Equimarginal Utility. (b) Comment on whether a family that spends half its budget on each good is necessarily in equilibrium. (3 + 2)',
  model: '**(a) (3):** suppose milk costs ₹2 a unit and vegetables ₹1 (scaled units), budget ₹7; MU of milk 16, 12, 8, 4 and of vegetables 10, 8, 6, 4 utils. MU per rupee: milk 8, 6, 4, 2; vegetables 10, 8, 6, 4. Buying in order of the highest ratio gives **2 milk + 3 vegetables**, costing ₹7, where both ratios are **6**. Any other split leaves a rupee earning less utility than it could.\n**(b) (2):** **not necessarily**. Equal **spending** does not mean equal **MU per rupee**; the family is in equilibrium only if the last rupee on milk gives the same utility as the last rupee on vegetables.',
  sol: 'Worked schedule reaching equal ratios with the budget used; equal spending is not the condition.',
  scheme: [['Schedule with MU per rupee', 1], ['Equal ratios at the chosen combination', 1], ['Budget exhausted / why it maximises utility', 1], ['Equal spending is not the condition', 1], ['Correct condition restated', 1]],
}));

// ---------------------------------------------------------------- ISC paper-style items (4 and 8 marks; bank only)
Q('s4_emu_isc', short({
  t: 4, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `(i) At an imagined Lucknow village fair, Kabir's last toffee packet (₹${TOF_P}) gives ${TOF_MU[KABIR.x - 1]} utils and his last balloon (₹${BAL_P}) gives ${BAL_MU[KABIR.y - 1]} utils. Show that he is in equilibrium and find his marginal utility of money. [2]\n\n(ii) The fair organiser then halves the price of balloons. Explain the immediate effect on Kabir's equilibrium. [2]`,
  model: `(i) ${TOF_MU[KABIR.x - 1]} ÷ ${TOF_P} = **${KABIR.ratio}** and ${BAL_MU[KABIR.y - 1]} ÷ ${BAL_P} = **${KABIR.ratio}**: the utilities per rupee are equal (and he spends his whole ₹${KABIR_M}), so he is in **equilibrium** with **MUm = ${KABIR.ratio}**.\n(ii) At ₹2 a balloon, its MU per rupee becomes ${BAL_MU[KABIR.y - 1]} ÷ 2 = **${BAL_MU[KABIR.y - 1] / 2}**, now **above** that of toffee (${KABIR.ratio}). The equality breaks, so he **buys more balloons** (and adjusts toffee) until the ratios are equal again.`,
  sol: 'Equal ratios with income spent; a lower price raises the ratio and shifts purchases.',
  scheme: [['Ratios computed and equal', 1], ['MUm = 6', 1], ['New ratio for balloons computed', 1], ['More balloons bought until equality returns', 1]],
}));
Q('l8_cardinal_isc', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `(i) Using the jalebi schedule of Arjun at an imagined Jaipur fair (total utility ${JALEBI_TU.join(', ')} utils for plates 1 to 7), derive the marginal utility schedule and explain the relationship between total and marginal utility with a diagram. [4]\n\n(ii) If one util equals ₹1 and a plate costs ₹${JALEBI_PRICE}, find Arjun's equilibrium purchase and explain why the Law of Diminishing Marginal Utility makes his demand for jalebi fall as its price rises. [4]`,
  model: `(i) MU = TUₙ − TUₙ₋₁: **${JALEBI_MU.join(', ')}** utils. In a diagram with plates on the x-axis, the **TU curve rises at a diminishing rate** while MU is positive (plates 1–5), reaches its **peak of 60 at the 6th plate** where the **MU curve cuts the x-axis** (MU = 0, satiety), and **falls** at the 7th plate where MU is **negative (−4)**. The MU curve slopes downward throughout, showing the Law of Diminishing Marginal Utility.\n(ii) He buys while MU ≥ ₹${JALEBI_PRICE}: plates 1–4 (₹20, ₹16, ₹12, ₹8). Equilibrium: **${JALEBI_EQ} plates**, where **MU = P = ₹${JALEBI_PRICE}**. If the price rises to ₹12, only plates with MU ≥ ₹12 are worth buying, so he buys **${eqOne(JALEBI_MU, 12)}**; at ₹16 he buys **${eqOne(JALEBI_MU, 16)}**. Because each extra plate is worth **less** to him, he buys more only at a **lower price** — hence his **demand curve slopes downward**.`,
  sol: 'MU schedule and TU–MU relationship with the diagram; MU = P equilibrium and the price–quantity link.',
  scheme: [['MU schedule correct', 1], ['TU rises at diminishing rate while MU positive', 1], ['TU maximum at MU = 0, falls when MU negative', 1], ['Diagram correctly described', 1], ['Equilibrium of 4 plates at MU = P', 1], ['Quantities at higher prices', 1], ['Diminishing MU explains lower willingness to pay', 1], ['Conclusion: downward-sloping demand', 1]],
}));
Q('l8_emu_isc', long({
  t: [3, 4], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `(i) Distinguish between consumer's equilibrium in the case of one commodity and in the case of two commodities, stating the condition in each. [4]\n\n(ii) Tanvi (imagined Pune book fair, ₹${TANVI_M}; comics ₹${COMIC_P}, puzzle books ₹${PUZ_P}; MU comics ${COMIC_MU.join(', ')}, puzzle books ${PUZ_MU.join(', ')}) says: "I will buy 9 comics because comics are cheaper." Evaluate her plan using the Law of Equimarginal Utility. [4]`,
  model: `(i) **One commodity:** the consumer compares the MU of the good with its price: equilibrium at **MUx = Px** (MU in rupees), with MU falling. **Two commodities:** she compares **utility per rupee** across goods: **MUx ÷ Px = MUy ÷ Py = MUm**, with the **whole income spent**. The first balances a good against money; the second balances goods against each other and against money, so it also decides the **allocation of income**.\n(ii) She has only ${COMIC_MU.length} comics' worth of utility data, and the 5th comic gives just ${COMIC_MU[4] / COMIC_P} utils per rupee while the 1st puzzle book gives ${PUZ_MU[0] / PUZ_P}. Cheapness is **not** the test; **utility per rupee** is. Following the law she buys **${TANVI.x} comics and ${TANVI.y} puzzle books** (₹${TANVI.spent}), where both ratios equal **${TANVI.ratio}**. Spending everything on comics would leave rupees earning far less utility than they could in puzzle books, so her **total utility would be lower** — the plan is **not rational**.`,
  sol: 'Conditions for one and two goods with the difference; evaluate by comparing utility per rupee, not price.',
  scheme: [['One-commodity condition', 1], ['Two-commodity condition with budget', 1], ['Difference explained', 1], ['Allocation role of the two-good case', 1], ['Price alone is not the test', 1], ['Utility per rupee compared', 1], ['Correct equilibrium 3 + 3', 1], ['Judgement: plan lowers total utility', 1]],
}));

// ---------------------------------------------------------------- case-based (bank; internal choice)
Q('cb_stall', caseQ({
  t: [1, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case about a sugarcane-juice stall and answer the questions that follow. *(Imagined stall and figures, written by SOYL for practice.)*',
  passage: `**Mahesh and the sugarcane-juice stall (imagined, Kolhapur)**\n\nMahesh, a delivery rider, stops at a sugarcane-juice stall on a hot afternoon. He records how much each glass is worth to him in rupees: first ₹40, second ₹28, third ₹16, fourth ₹4, fifth −₹8. A glass costs ₹16. The stall owner offers him "three glasses for the price of two" if he buys immediately.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: eqOne([40, 28, 16, 4, -8], 16), unit: 'glasses', stem: 'At ₹16 a glass, how many glasses does Mahesh buy?', sol: `Step 1: buy while MU ≥ ₹16: ₹40, ₹28 and ₹16 qualify.\nStep 2: so he buys ${eqOne([40, 28, 16, 4, -8], 16)} glasses.` })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: 40 + 28 + 16 + 4, unit: '₹', stem: 'What is the total utility (in rupees) of four glasses?', sol: `Step 1: TU = sum of MU.\nStep 2: 40 + 28 + 16 + 4 = ${40 + 28 + 16 + 4}. So ₹${40 + 28 + 16 + 4}.` })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Should Mahesh accept the "three for the price of two" offer? Give a reason using marginal utility.', model: 'Three glasses would cost **₹32** and give **₹84** of utility (40 + 28 + 16). Paying ₹16 each he gets the same three glasses for ₹48. The offer lowers the cost and he wanted three glasses anyway, so **yes, he gains ₹16**.', sol: 'Compare utility of three glasses with the reduced cost.', scheme: [['Utility of three glasses vs the offer price', 1], ['Correct judgement with reason', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What happens to Mahesh\'s total utility if he drinks a fifth glass? Explain.', model: 'The fifth glass has **negative MU (−₹8)**, so his **total utility falls** from ₹88 to **₹80**. He has passed the point of satiety, so the extra glass causes discomfort.', sol: 'Negative MU lowers TU.', scheme: [['Negative MU of the fifth glass', 1], ['TU falls from 88 to 80', 1]] }),
    ]),
  ],
}));
Q('cb_budget', caseQ({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the canteen budget case and answer the questions that follow. *(Imagined student and figures, written by SOYL for practice.)*',
  passage: `**Riddhi's canteen budget (imagined college, Ahmedabad)**\n\nRiddhi has ${KABIR_M} canteen coupons for snacks this week. A khaman plate costs ${TOF_P} coupons and a lemonade ${BAL_P} coupons. Her marginal utilities (utils) are khaman ${TOF_MU.join(', ')} and lemonade ${BAL_MU.join(', ')}. Her friend tells her to "spend half on each".`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: KABIR.x, unit: 'plates', stem: 'How many khaman plates does Riddhi buy in equilibrium?', sol: `Step 1: MU per coupon — khaman ${TOF_MU.map((m) => m / TOF_P).join(', ')}; lemonade ${BAL_MU.map((m) => m / BAL_P).join(', ')}.\nStep 2: her ${KABIR_M} coupons are used up at ${KABIR.x} plates and ${KABIR.y} lemonades with both ratios ${KABIR.ratio}. So ${KABIR.x} plates.` })),
    child('b', num({ t: 4, d: 2, c: 'understanding', marks: 1, value: KABIR.ratio, unit: 'utils per coupon', stem: 'What is the marginal utility of a coupon to her (her marginal utility of money) in equilibrium?', sol: `Step 1: MU of a coupon = MU ÷ price in coupons of the last unit.\nStep 2: ${TOF_MU[KABIR.x - 1]} ÷ ${TOF_P} = ${KABIR.ratio}. So ${KABIR.ratio} utils per coupon.` })),
    child('c', short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate her friend\'s advice to "spend half on each".', model: `Half (9 coupons) on each cannot buy whole lemonades evenly, and the equilibrium spends **${KABIR.x * TOF_P} coupons on khaman and ${KABIR.y * BAL_P} on lemonade**. The rule is equal **MU per coupon (per rupee)**, not equal spending, so the advice would **lower** her total utility.`, sol: 'The condition is equal MU per rupee, not equal spending.', scheme: [['Equilibrium spending stated', 1], ['Advice rejected with the correct condition', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): If her budget rises, what will happen to her marginal utility of money? Explain.', model: 'With more income she buys **more of both** goods; because of diminishing MU, the MU per rupee of the last units **falls**, so her **marginal utility of money falls** at the new equilibrium.', sol: 'More units bought, lower ratios, lower MUm.', scheme: [['More of both goods bought', 1], ['MUm falls through diminishing MU', 1]] }),
    ]),
  ],
}));
Q('cb_tea_tasting', caseQ({
  t: [2, 1], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the tea-garden case and answer the questions that follow. *(Imagined garden and figures, written by SOYL for practice.)*',
  passage: `**A tasting session at an imagined Darjeeling tea garden**\n\nA group of visitors taste cups of first-flush tea one after another. A visitor, Anita, notes her satisfaction after each cup: total utility 18, 32, 42, 48, 50, 50, 46 utils for cups 1 to 7. Another visitor, a tea buyer, tastes only one cup in the morning and one in the evening and says, "The evening cup was as good as the first." A third visitor, Rahul, tastes small sips first and then a full large cup.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: 48 - 42, unit: 'utils', stem: 'What is Anita\'s marginal utility from the fourth cup?', sol: `Step 1: MU₄ = TU₄ − TU₃.\nStep 2: 48 − 42 = ${48 - 42} utils.` })),
    child('b', num({ t: 1, d: 2, c: 'understanding', marks: 1, value: 6, unit: 'cups', stem: 'After how many cups does Anita reach her point of satiety?', sol: 'Step 1: MU = 18, 14, 10, 6, 2, 0, −4.\nStep 2: MU first becomes 0 at the 6th cup, where TU is maximum (50). So 6 cups.' })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Does the tea buyer\'s experience disprove the Law of Diminishing Marginal Utility? Explain.', model: '**No.** The law assumes **continuous consumption**; a long gap between the morning and evening cups lets the want **revive**, so the assumption does not hold and the law is not tested.', sol: 'Continuity assumption broken by the time gap.', scheme: [['Law not disproved', 1], ['Time gap breaks continuity', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why can Rahul\'s experience not be used to test the law?', model: 'His units are **not homogeneous**: small sips and a full large cup differ in size. The law assumes **identical units**, so a higher utility from the large cup does not contradict it.', sol: 'Homogeneity assumption broken.', scheme: [['Units differ in size', 1], ['Law assumes identical units', 1]] }),
    ]),
  ],
}));
