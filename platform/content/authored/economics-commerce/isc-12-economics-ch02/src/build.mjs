// Build ISC 12 Economics ch02 Consumer Behaviour: Cardinal Utility Analysis. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch02/src/build.mjs
// Removed topic (ISC 2027): criticisms of the Law of Diminishing Marginal Utility — only its assumptions are taught.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch02', 'economics-commerce');
const Qm = await import('./questions.mjs');
const {
  assert, JALEBI_TU, JALEBI_MU, JALEBI_SAT, JALEBI_PRICE, JALEBI_EQ, COFFEE_TU, COFFEE_MU, TOF_MU, BAL_MU, TOF_P, BAL_P, KABIR_M, KABIR,
  COMIC_MU, PUZ_MU, COMIC_P, PUZ_P, TANVI_M, TANVI, LASSI_MU, LASSI_P, LASSI_EQ, COCO_MU, COCO_TU, COCO_MU_RS, COCO_P, COCO_RUPEE, COCO_EQ, eqOne, equi,
} = Qm;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const units = JALEBI_TU.map((_, i) => i + 1);

// Narration below quotes these numbers; stop the build if the data change.
assert(JALEBI_TU[4] === 60 && JALEBI_TU[6] === 56 && JALEBI_MU[0] === 20 && JALEBI_PRICE === 8 && JALEBI_EQ === 4 && JALEBI_SAT === 6, 'deck jalebi narration');
assert(KABIR.x === 3 && KABIR.y === 3 && KABIR.ratio === 6 && KABIR_M === 18, 'deck Kabir narration');
assert(LASSI_EQ === 3 && COCO_EQ === 3, 'deck examples');

// ---------------------------------------------------------------- SVG figures (data plotted from the schedules)
/** Frame whose x-axis is drawn at zero, so negative marginal utility shows below it. */
function zeroFrame(xmax, ymin, ymax, xLabel, yLabel) {
  const s = new Svg(470, 340);
  const left = 64, top = 34, width = 330, height = 250;
  const X = (x) => left + (x / xmax) * width;
  const Y = (y) => top + height - ((y - ymin) / (ymax - ymin)) * height;
  s.arrow(X(0), Y(0), X(xmax) + 14, Y(0), { sw: 1.6 });
  s.line(X(0), top + height, X(0), Y(0), { sw: 1.6 });
  s.arrow(X(0), Y(0), X(0), top - 10, { sw: 1.6 });
  s.text(X(0) - 10, Y(0) + 14, 'O', { size: 13 });
  s.text(X(xmax) + 10, Y(0) - 14, xLabel, { anchor: 'end', size: 13 });
  s.text(X(0) + 8, top - 12, yLabel, { anchor: 'start', size: 13 });
  return { s, X, Y };
}

const vTU = (() => {
  const s = new Svg(470, 330);
  const c = s.chart({ x1: 7.6, y1: 72, left: 64, top: 34, width: 330, height: 240, xLabel: 'Plates of jalebi', yLabel: 'Total utility (utils)' });
  const pts = [[0, 0], ...units.map((q) => [q, JALEBI_TU[q - 1]])];
  s.polyline(pts.map(([x, y]) => [c.X(x), c.Y(y)]), { color: 'accent', sw: 2.6 });
  units.forEach((q) => c.dot([q, JALEBI_TU[q - 1]], 'accent'));
  c.drop([JALEBI_SAT, JALEBI_TU[JALEBI_SAT - 1]]);
  c.label([JALEBI_SAT, JALEBI_TU[JALEBI_SAT - 1]], 'Maximum TU (satiety)', { anchor: 'end', dx: -8, dy: -14, size: 12 });
  c.label([2.2, JALEBI_TU[1]], 'TU', { anchor: 'end', dx: -8, size: 13, color: 'accent' });
  [2, 4, 6].forEach((q) => c.xTick(q, String(q)));
  [20, 40, 60].forEach((u) => c.yTick(u, String(u)));
  return s.visual(
    `Total utility curve of Arjun's plates of jalebi: it rises from 20 utils at the first plate to 60 at the fifth and sixth plates, at a diminishing rate, then falls to 56 at the seventh plate`,
    'Imagined figures — TU rises at a diminishing rate, peaks at satiety, then falls.',
  );
})();
const vMU = (() => {
  const { s, X, Y } = zeroFrame(7.6, -8, 24, 'Plates of jalebi', 'Marginal utility (utils)');
  const pts = units.map((q) => [X(q), Y(JALEBI_MU[q - 1])]);
  s.polyline(pts, { color: 'accent', sw: 2.6 });
  units.forEach((q) => s.dot(X(q), Y(JALEBI_MU[q - 1]), 4, 'accent'));
  s.text(X(1) + 10, Y(JALEBI_MU[0]) - 10, 'MU', { anchor: 'start', size: 13, color: 'accent' });
  s.text(X(JALEBI_SAT), Y(0) + 18, 'Satiety (MU = 0)', { size: 12 });
  s.text(X(7), Y(JALEBI_MU[6]) + 18, 'MU negative', { anchor: 'end', size: 12, muted: true });
  [2, 4].forEach((q) => { s.line(X(q), Y(0), X(q), Y(0) + 5, { sw: 1.2 }); s.text(X(q), Y(0) + 16, String(q), { size: 12 }); });
  [8, 16].forEach((u) => { s.line(X(0) - 5, Y(u), X(0), Y(u), { sw: 1.2 }); s.text(X(0) - 8, Y(u), String(u), { size: 12, anchor: 'end' }); });
  return s.visual(
    'Marginal utility curve of Arjun: it slopes downward from 20 utils at the first plate, cuts the x-axis at the sixth plate where marginal utility is zero, and falls below the axis to minus 4 at the seventh plate',
    'The MU curve slopes downward and cuts the x-axis at satiety.',
  );
})();
const vEqOne = (() => {
  const s = new Svg(470, 330);
  const c = s.chart({ x1: 5.8, y1: 24, left: 64, top: 34, width: 330, height: 240, xLabel: 'Plates of jalebi', yLabel: 'MU and price (₹)' });
  const q5 = [1, 2, 3, 4, 5];
  s.polyline(q5.map((q) => [c.X(q), c.Y(JALEBI_MU[q - 1])]), { color: 'accent', sw: 2.6 });
  q5.forEach((q) => c.dot([q, JALEBI_MU[q - 1]], 'accent'));
  c.seg([0, JALEBI_PRICE], [5.6, JALEBI_PRICE], { color: 'blue', sw: 2, dash: true });
  c.label([5.6, JALEBI_PRICE], 'Price line', { anchor: 'end', dy: -12, size: 12, color: 'blue' });
  c.label([1, JALEBI_MU[0]], 'MU in ₹', { anchor: 'start', dx: 10, size: 13, color: 'accent' });
  c.drop([JALEBI_EQ, JALEBI_PRICE]);
  c.label([JALEBI_EQ, JALEBI_PRICE], 'E', { anchor: 'start', dx: 8, dy: 14, size: 14, bold: true });
  c.xTick(JALEBI_EQ, String(JALEBI_EQ)).yTick(JALEBI_PRICE, String(JALEBI_PRICE)).yTick(20, '20');
  return s.visual(
    `One-commodity equilibrium: Arjun's marginal utility in rupees falls from 20 to 4 over five plates; the horizontal price line at 8 rupees meets it at point E at the fourth plate, where marginal utility equals price`,
    'Imagined data, 1 util = ₹1: equilibrium where MU = P.',
  );
})();
const vEqui = (() => {
  const s = new Svg(560, 320);
  const rx = TOF_MU.map((m) => m / TOF_P), ry = BAL_MU.map((m) => m / BAL_P);
  const panel = (left, ratios, name, color) => {
    const c = s.chart({ x1: 6.6, y1: 11, left, top: 40, width: 190, height: 220, xLabel: `Units of ${name}`, yLabel: 'MU per ₹' });
    s.polyline(ratios.map((r, i) => [c.X(i + 1), c.Y(r)]), { color, sw: 2.4 });
    ratios.forEach((r, i) => c.dot([i + 1, r], color));
    c.seg([0, KABIR.ratio], [6.4, KABIR.ratio], { color: 'muted', dash: true, sw: 1.4 });
    c.label([3, KABIR.ratio], 'E', { anchor: 'start', dx: 8, dy: -12, size: 14, bold: true });
    c.xTick(3, '3').yTick(KABIR.ratio, String(KABIR.ratio)).yTick(10, '10');
    return c;
  };
  panel(50, rx, 'toffee', 'accent');
  panel(330, ry, 'balloons', 'blue');
  return s.visual(
    `Two panels for Kabir: marginal utility per rupee of toffee packets falls 10, 8, 6, 5, 4, 3 and of balloons 10, 8, 6, 4, 3, 2; a dashed line at 6 utils per rupee meets both at the third unit, marked E; 3 toffee packets and 3 balloons cost 18 rupees`,
    'Imagined figures — both ratios equal 6 at the last unit bought, and the whole ₹18 is spent.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const tJalebi = table(['Plates', ...units.map(String)], [['TU (utils)', ...JALEBI_TU.map(String)], ['MU (utils)', ...JALEBI_MU.map(String)]],
  "Arjun's jalebi schedule: total utility 20, 36, 48, 56, 60, 60, 56 and marginal utility 20, 16, 12, 8, 4, 0, minus 4 for plates 1 to 7", 'Imagined Jaipur winter fair. MU = TUₙ − TUₙ₋₁.');
const tPhases = table(['Marginal utility', 'Total utility', 'Jalebi plates'], [['Positive, falling', 'Rises at a diminishing rate', '1 to 5'], ['Zero', 'Maximum (60), constant', '6 (satiety)'], ['Negative', 'Falls', '7']],
  'Table of the three phases: positive and falling marginal utility makes total utility rise more slowly; zero marginal utility gives maximum total utility; negative marginal utility makes total utility fall', 'The sign of MU decides the direction of TU.');
const tCoffee = table(['Cups', ...COFFEE_TU.map((_, i) => String(i + 1))], [['TU (utils)', ...COFFEE_TU.map(String)], ['MU = TUₙ − TUₙ₋₁', ...COFFEE_MU.map(String)]],
  "Worked example table for Meera's coffee: total utility 15, 27, 36, 42, 45, 45, 42 gives marginal utility 15, 12, 9, 6, 3, 0, minus 3", 'Imagined Chennai office canteen.');
const tAssump = table(['Assumption', 'Meaning'], [
  ['Cardinal measurement', 'Utility can be counted in utils and expressed in money'],
  ['Continuous consumption', 'Units are taken one after another without a long gap'],
  ['Homogeneous units', 'Every unit is identical in size, quality and taste'],
  ['Ceteris paribus', 'Income, tastes, habits and the MU of money stay constant'],
  ['Rational consumer', 'The consumer aims at maximum satisfaction'],
], 'Table of five assumptions of the Law of Diminishing Marginal Utility: cardinal measurement, continuous consumption, homogeneous units, other things constant including the marginal utility of money, and a rational consumer', 'Only the assumptions are in the ISC 2027 syllabus.');
const tCases = table(['Situation (imagined Kohima school)', 'Law applies?', 'Assumption'], [
  ['Four glasses of water after a match', 'Yes', 'Continuous, identical units'],
  ['A novel today, the sequel in six months', 'No', 'Time gap; units differ'],
  ['A small laddoo, then a very large one', 'No', 'Units not homogeneous'],
], 'Worked example table: drinking four glasses of water continuously follows the law; a novel and its sequel months apart and a small then a large laddoo break the assumptions of continuity and homogeneity', 'Check the assumptions before applying the law.');
const tCoco = table(['Coconut', '1', '2', '3', '4', '5'], [['MU (utils)', ...COCO_MU.map(String)], ['TU (utils)', ...COCO_TU.map(String)]],
  "Worked example table for Nikhil's coconuts: marginal utility 24, 18, 12, 6, 2 gives total utility 24, 42, 54, 60, 62", 'Imagined Goa beach. TU = running sum of MU.');
const tMoney = table(['Coconut', '1', '2', '3', '4', '5'], [['MU (utils)', ...COCO_MU.map(String)], [`MU in ₹ (1 util = ₹${COCO_RUPEE})`, ...COCO_MU_RS.map(String)]],
  `Table converting Nikhil's marginal utility into rupees at 2 rupees per util: 48, 36, 24, 12, 4`, 'Money measures utility when the MU of money is constant.');
const tLassi = table(['Glass', '1', '2', '3', '4', '5'], [['MU (₹)', ...LASSI_MU.map(String)], [`Buy at ₹${LASSI_P}?`, ...LASSI_MU.map((m) => (m >= LASSI_P ? 'Yes' : 'No'))]],
  `Worked example table for Harpreet's lassi at 30 rupees: marginal utilities 70, 50, 30, 10, minus 10 rupees, so she buys three glasses`, 'Imagined Amritsar dhaba: buy while MU ≥ P.');
const tDemand = table(['Price of lassi (₹)', '70', '50', '30', '10'], [['Glasses bought', ...[70, 50, 30, 10].map((p) => String(eqOne(LASSI_MU, p)))]],
  'Table deriving demand from marginal utility: at 70 rupees she buys 1 glass, at 50 rupees 2, at 30 rupees 3 and at 10 rupees 4', 'Lower price, more glasses: a downward-sloping demand curve.');
const tEmuAssump = table(['Assumption', 'Meaning'], [
  ['Limited income', 'A fixed sum to spend on many wants'],
  ['Given prices', 'Prices of goods do not change during the choice'],
  ['Constant MU of money', 'Each rupee has the same utility'],
  ['Diminishing MU', 'Each good obeys the Law of Diminishing Marginal Utility'],
  ['Rational consumer', 'Aims at maximum satisfaction'],
], 'Table of five assumptions of the Law of Equimarginal Utility: limited income, given prices, constant marginal utility of money, diminishing marginal utility of each good and a rational consumer', 'Assumptions of the two-good model.');
const tKabir = table(['Unit', '1', '2', '3', '4', '5', '6'], [
  [`Toffee MU (₹${TOF_P} each)`, ...TOF_MU.map(String)], ['Toffee MU ÷ P', ...TOF_MU.map((m) => String(m / TOF_P))],
  [`Balloon MU (₹${BAL_P} each)`, ...BAL_MU.map(String)], ['Balloon MU ÷ P', ...BAL_MU.map((m) => String(m / BAL_P))],
], `Worked example table for Kabir with 18 rupees: marginal utility per rupee of toffee packets 10, 8, 6, 5, 4, 3 and of balloons 10, 8, 6, 4, 3, 2; equilibrium at 3 of each`, 'Imagined village fair near Lucknow.');
const tTanvi = table(['', 'Comics (₹5)', 'Puzzle books (₹10)'], [
  ['MU ÷ P of units 1 to 4', COMIC_MU.slice(0, 4).map((m) => m / COMIC_P).join(', '), PUZ_MU.map((m) => m / PUZ_P).join(', ')],
  [`Equilibrium with ₹${TANVI_M}`, String(TANVI.x), String(TANVI.y)],
  ['If comics cost ₹10: MU ÷ P of the 3rd comic', String(COMIC_MU[TANVI.x - 1] / 10), `${PUZ_MU[TANVI.y - 1] / PUZ_P} (3rd book)`],
], 'Worked example table for Tanvi: equilibrium at 3 comics and 3 puzzle books with 8 utils per rupee; if comics cost 10 rupees the third comic gives only 4 utils per rupee, so she buys fewer comics', 'Imagined Pune book fair: a price rise lowers MU per rupee.');
const tSummary1 = table(['Idea', 'Key point'], [
  ['Utility', 'Want-satisfying power; subjective; counted in utils'],
  ['TU and MU', 'TU = sum of MU; MUₙ = TUₙ − TUₙ₋₁'],
  ['Satiety', 'MU = 0, TU maximum'],
  ['Law of DMU', 'MU of successive units falls, ceteris paribus'],
], 'Summary table of part 1: utility, total and marginal utility, satiety and the Law of Diminishing Marginal Utility', null);
const tSummary2 = table(['Case', 'Equilibrium condition'], [
  ['One good', 'MUx = Px (MU in ₹)'],
  ['Two goods', 'MUx ÷ Px = MUy ÷ Py = MUm, income fully spent'],
  ['Price rises', 'MU per ₹ falls: buy less of that good'],
], 'Summary table of part 2: one-good equilibrium where marginal utility equals price, two-good equilibrium where marginal utility per rupee is equal, and the effect of a price rise', null);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Cardinal Utility Analysis — Part 1: Utility and the Law of Diminishing Marginal Utility',
  goals: [
    'Explain utility, total utility and marginal utility, and calculate MU from TU',
    'Explain the relationship between TU and MU with diagrams',
    'State the Law of Diminishing Marginal Utility with its assumptions, schedule and diagram',
  ],
  slides: [
    sl('title', 'Consumer Behaviour: Cardinal Utility Analysis', {
      b: 'Part 1 — **utility**, **total and marginal utility**, and the **Law of Diminishing Marginal Utility**.',
      v: flow('LR', ['What is utility?', 'Total and marginal utility', 'How they are related', 'Law of Diminishing Marginal Utility', 'Assumptions'], 'Route map of part 1: what utility is, total and marginal utility, how they are related, the law and its assumptions', 'Part 1 at a glance'),
      n: 'Why does the first plate of jalebi at a fair taste wonderful and the sixth feel like too much? In this chapter we study how a consumer gets satisfaction from goods and how she decides how much to buy. Part one builds the basic ideas: utility, total utility, marginal utility, and an important law about how satisfaction changes as we consume more.',
    }),
    sl('concept', 'Utility: the want-satisfying power of a good', {
      b: '**Utility** is the capacity of a good to satisfy a want. In the **cardinal** approach it is counted in imaginary units called **utils**.',
      bl: ['**Subjective:** the same good gives different utility to different people.', '**Not the same as usefulness:** a cigarette has utility for a smoker though it harms health.', '**Varies with time and place:** a woollen shawl has more utility in a Shimla winter than in a Chennai summer.'],
      v: table(['Feature', 'Example (imagined)'], [['Subjective', 'Black coffee pleases a night-shift nurse, not her daughter'], ['Ethically neutral', 'A good need not be useful to have utility'], ['Depends on time and place', 'A shawl in Shimla in January vs Chennai in May']], 'Table of features of utility with imagined examples: subjective, ethically neutral, and dependent on time and place', null),
      n: 'Utility means the power of a good to satisfy a want. It is subjective, so black coffee may delight a night-shift nurse and mean nothing to her daughter. It is ethically neutral: a good need not be healthy to have utility. And it changes with time and place, like a woollen shawl in a Shimla winter compared with a Chennai summer. Cardinal analysis assumes we can count utility in units called utils.',
    }),
    sl('concept', 'Total utility and marginal utility', {
      b: '**Total utility (TU):** satisfaction from all units consumed. **Marginal utility (MU):** the addition to TU from one more unit.\n\nMUₙ = TUₙ − TUₙ₋₁, and TU = sum of the MUs.',
      v: tJalebi,
      n: 'Total utility is the whole satisfaction from all the units you have consumed. Marginal utility is the extra satisfaction from one more unit, found by subtracting the total utility of one unit less. Look at Arjun at a Jaipur fair. His first plate of jalebi gives twenty utils. Two plates give thirty six, so the second plate adds sixteen. Notice that adding up the marginal utilities gives back the total.',
    }),
    sl('diagram', 'The total utility curve', {
      v: vTU,
      n: 'Here is Arjun\'s total utility curve. It rises from the first plate to the fifth, but each rise is smaller than the one before, so the curve gets flatter. At the sixth plate it reaches its peak of sixty utils: this is the point of satiety. If he eats a seventh plate, total utility falls to fifty six, because the extra plate causes discomfort.',
    }),
    sl('check', 'Quick check: adding up marginal utility', { b: 'Find total utility from four bowls of momos.', chk: 'm_tu_sum', n: 'Remember that total utility is the sum of the marginal utilities of all the units consumed so far.' }),
    sl('diagram', 'The marginal utility curve', {
      v: vMU,
      n: 'Now plot marginal utility for each plate. The curve slopes downward from twenty utils. At the sixth plate it touches the x-axis: marginal utility is zero exactly where total utility was at its peak. Beyond that it goes below the axis, because the seventh plate takes away satisfaction. Negative marginal utility is also called disutility.',
    }),
    sl('two-column', 'How total utility depends on marginal utility', {
      cols: ['**MU positive and falling →** TU rises, at a diminishing rate.\n\n**MU zero →** TU is maximum and constant (satiety).', '**MU negative →** TU falls.\n\nTU never needs to become negative for MU to be negative.'],
      v: tPhases,
      n: 'Put the two curves together and you get three phases. While marginal utility is positive but falling, total utility keeps rising, only more slowly. When marginal utility is zero, total utility is at its maximum. When marginal utility turns negative, total utility falls. Remember: negative marginal utility does not make total utility negative; it only makes it smaller.',
    }),
    sl('example', 'Worked example 1: deriving marginal utility from total utility', {
      b: "Meera's total utility from cups of filter coffee in an imagined Chennai canteen is given. Find MU and the point of satiety.",
      bl: ['Step 1 — Subtract each TU from the next: MU₂ = 27 − 15 = 12, and so on.', 'Step 2 — MU becomes **zero at the 6th cup**: that is satiety.', 'Step 3 — The 7th cup has MU of −3, so TU falls to 42.'],
      v: tCoffee,
      n: 'Let us practise with Meera\'s coffee. Subtract each total from the next one. Twenty seven minus fifteen gives twelve for the second cup, then nine, six and three. At the sixth cup the total stays at forty five, so marginal utility is zero: that is her point of satiety. The seventh cup has a marginal utility of minus three, and her total falls to forty two.',
    }),
    sl('check', 'Quick check: negative marginal utility', { b: 'Does negative MU make TU negative?', chk: 'tf_mu_negative_tu', n: 'Think about what happened to Arjun\'s total utility when the seventh plate had negative marginal utility.' }),
    sl('concept', 'The Law of Diminishing Marginal Utility', {
      b: '**Statement:** other things remaining the same, as a consumer consumes more units of a good one after another, the **marginal utility of each successive unit diminishes**.',
      v: flow('LR', ['A strong want', 'First unit satisfies much of it', 'Want is partly met', 'Each later unit adds less', 'MU falls'], 'Flow explaining the law: a strong want is largely satisfied by the first unit, so later units add less satisfaction and marginal utility falls', 'Why MU diminishes'),
      n: 'The Law of Diminishing Marginal Utility says that, other things remaining the same, the satisfaction from each additional unit of a good falls as you consume more of it in succession. The reason is simple. A want is strong at first, the first unit satisfies a large part of it, and each later unit has less of the want left to satisfy.',
    }),
    sl('concept', 'Assumptions of the law', {
      b: 'The law holds only under these conditions:',
      v: tAssump,
      n: 'The law rests on assumptions. Utility can be measured in cardinal numbers. Units are consumed continuously, without a long gap. Every unit is identical. Income, tastes and the marginal utility of money do not change. And the consumer is rational. In the ISC syllabus you study these assumptions; the criticisms of the law are not part of the course.',
    }),
    sl('check', 'Quick check: the shape of the MU curve', { b: 'Which statement describes the MU curve under the law?', chk: 'm_ldmu_curve', n: 'Picture Arjun\'s marginal utility curve before you choose.' }),
    sl('example', 'Worked example 2: does the law apply?', {
      b: 'Three situations at an imagined school in Kohima. Decide whether the law applies and name the assumption.',
      bl: ['Step 1 — Check **continuity**: is there a long gap?', 'Step 2 — Check **homogeneity**: are the units identical?', 'Step 3 — Only if both hold can falling or rising satisfaction test the law.'],
      v: tCases,
      n: 'Here is how examiners test the assumptions. Four glasses of water after a match are consumed continuously and are identical, so the law applies. A novel today and its sequel in six months break continuity, and the books are different. A small laddoo followed by a very large one breaks homogeneity. Always check the assumptions before you apply the law.',
    }),
    sl('example', 'Worked example 3: from marginal to total utility', {
      b: "Nikhil's marginal utilities from tender coconuts on an imagined Goa beach are given. Build his TU schedule.",
      bl: ['Step 1 — TU of 1 coconut = 24.', 'Step 2 — Add each MU to the previous TU: 24 + 18 = 42, then 54, 60, 62.', 'Step 3 — MU is still positive at the 5th coconut, so TU still rises.'],
      v: tCoco,
      n: 'Going the other way, add up marginal utilities to get total utility. Twenty four, then twenty four plus eighteen is forty two, then fifty four, sixty and sixty two. Notice that the fifth coconut adds only two utils, but because that is still positive, total utility still rises. It stops rising only when marginal utility reaches zero.',
    }),
    sl('check', 'Quick check: marginal utility of the fifth cup', { b: "Find Meera's MU from her fifth cup of coffee.", chk: 'n_mu_coffee', n: 'Subtract total utility from four cups from total utility from five cups.' }),
    sl('summary', 'Part 1 summary', {
      bl: ['Utility is subjective satisfaction, counted in utils.', 'MUₙ = TUₙ − TUₙ₋₁; TU is the sum of MUs.', 'TU rises while MU is positive, peaks when MU = 0, falls when MU is negative.', 'Law of DMU: MU of successive units falls, under its assumptions.'],
      v: tSummary1,
      n: 'To sum up part one. Utility is the subjective satisfaction from a good. Marginal utility is the change in total utility from one more unit, and total utility is the sum of marginal utilities. Total utility rises while marginal utility is positive, peaks when it is zero and falls when it is negative. And the law says marginal utility diminishes, under its assumptions.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always write **MUₙ = TUₙ − TUₙ₋₁** before calculating.', 'In diagrams, draw the MU curve **cutting the x-axis** at the same quantity where TU **peaks**.', 'Positive but small MU still **raises** TU — a common trap.', 'For the law, state **ceteris paribus** and list assumptions; do not write criticisms (not in the ISC 2027 syllabus).'],
      n: 'A few exam tips. Write the formula for marginal utility before you calculate. In diagrams, make the marginal utility curve cut the axis exactly where total utility peaks. Remember that a small positive marginal utility still raises total utility. When stating the law, include other things remaining the same, and list the assumptions. Criticisms of the law are not in your syllabus.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: "Cardinal Utility Analysis — Part 2: Consumer's Equilibrium",
  goals: [
    "Explain consumer's equilibrium with one commodity (MUx = Px) from a schedule and a diagram",
    'Explain why buying more or less than the equilibrium quantity lowers satisfaction',
    'State the Law of Equimarginal Utility and find the equilibrium of two goods from a schedule',
  ],
  slides: [
    sl('title', "Consumer's Equilibrium", {
      b: 'Part 2 — **one-commodity equilibrium**, the **Law of Equimarginal Utility** and two-commodity equilibrium.',
      v: flow('LR', ['Measuring utility in money', 'One good: MU equals price', 'From equilibrium to demand', 'Two goods: equal MU per rupee', 'Price changes'], 'Route map of part 2: measuring utility in money, one-good equilibrium, the link to demand, two-good equilibrium and price changes', 'Part 2 at a glance'),
      n: 'A consumer is in equilibrium when she gets the most satisfaction possible from her money and has no reason to change her purchases. In part two we find that point, first for a single good and then for two goods, using a famous rule called the Law of Equimarginal Utility.',
    }),
    sl('concept', 'Measuring utility in money', {
      b: 'If the **marginal utility of money (MUm)** is constant, utils can be turned into rupees: MU in ₹ = MU in utils × value of one util.',
      v: tMoney,
      n: 'To compare satisfaction with a price, we need utility in rupees. If every rupee always gives the consumer the same satisfaction, we can turn utils into rupees at a fixed rate. Suppose one util is worth two rupees to Nikhil. Then his coconuts are worth forty eight, thirty six, twenty four, twelve and four rupees to him.',
    }),
    sl('concept', 'One-commodity equilibrium: MUx = Px', {
      b: 'A consumer buying one good is in equilibrium when **MU (in ₹) = price**, with MU falling.',
      v: flow('TB', ['MU greater than price', 'Buying more raises net gain', 'MU equals price: equilibrium', 'MU less than price', 'Buying less raises net gain'], 'Flow of the one-commodity rule: if marginal utility exceeds price, buy more; if it is less than price, buy less; equilibrium is where marginal utility equals price', 'Why MU = P is the best point', [{ from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n3' }]),
      n: 'With one good, the rule is to buy until marginal utility in rupees equals the price. If the next unit is worth more than its price, buying it adds to your gain, so buy more. If the last unit is worth less than its price, you would be better off without it, so buy less. Only where marginal utility equals price is there no reason to change.',
    }),
    sl('diagram', 'One-commodity equilibrium on a diagram', {
      v: vEqOne,
      n: 'Here Arjun values jalebi at one rupee per util and a plate costs eight rupees. The falling line is his marginal utility in rupees; the dashed line is the price. They meet at point E, at the fourth plate, where marginal utility equals price. To the left, plates are worth more than eight rupees, so he buys them. The fifth plate is worth only four, so he stops.',
    }),
    sl('check', 'Quick check: utils into rupees', { b: 'How many coconuts does Nikhil buy at ₹20?', chk: 'm_mu_utils_to_rs', n: 'Convert his marginal utilities into rupees first, then compare each one with the price.' }),
    sl('example', 'Worked example 1: lassi at an Amritsar dhaba', {
      b: "Harpreet's MU in rupees from glasses of lassi is given; a glass costs ₹30.",
      bl: ['Step 1 — Buy while MU ≥ P: ₹70, ₹50, ₹30 qualify.', 'Step 2 — The 4th glass is worth ₹10 < ₹30: stop.', 'Step 3 — Equilibrium: **3 glasses**, where MU = P = ₹30.'],
      v: tLassi,
      n: 'Harpreet values her glasses of lassi at seventy, fifty, thirty, ten and minus ten rupees, and a glass costs thirty. She buys the first three, because each is worth at least thirty rupees. The fourth is worth only ten, so buying it would lose twenty rupees of satisfaction. She stops at three glasses, where marginal utility equals price.',
    }),
    sl('concept', 'From equilibrium to the demand curve', {
      b: 'Because MU diminishes, a consumer buys more units **only at a lower price**. Each price gives a quantity from MU = P.',
      v: tDemand,
      n: 'This rule explains the law of demand. At seventy rupees Harpreet buys one glass, at fifty two, at thirty three, and at ten four. Because each extra glass is worth less to her, she buys it only if the price falls to its marginal utility. Plot these pairs and you get a downward-sloping demand curve.',
    }),
    sl('check', 'Quick check: maximum total utility', { b: 'Does a rational consumer buy up to maximum TU?', chk: 'tf_eq_tu_max', n: 'Compare the condition for equilibrium with the condition for maximum total utility.' }),
    sl('concept', 'The Law of Equimarginal Utility', {
      b: 'With limited income and two goods, a consumer gets **maximum satisfaction** when the **utility from the last rupee is the same in every use**:\n\n**MUx ÷ Px = MUy ÷ Py = MUm**, with the whole income spent.',
      v: flow('LR', ['Limited income', 'Many wants', 'Compare MU per rupee', 'Shift rupees to higher MU per rupee', 'Ratios equal: maximum satisfaction'], 'Flow of the Law of Equimarginal Utility: limited income and many wants lead the consumer to compare marginal utility per rupee and shift spending until the ratios are equal', 'Law of maximum satisfaction'),
      n: 'With two goods and limited income, the question becomes how to divide the money. The Law of Equimarginal Utility says you get the most satisfaction when the last rupee spent on each good gives the same marginal utility, and that equals the marginal utility of money. It is also called the law of maximum satisfaction or the law of substitution.',
    }),
    sl('concept', 'Assumptions of the Law of Equimarginal Utility', {
      b: 'The two-good model assumes:',
      v: tEmuAssump,
      n: 'This law rests on assumptions too. Income is limited and prices are given. The marginal utility of money is constant. Each good obeys the Law of Diminishing Marginal Utility, which is what makes the ratios fall as you buy more. And the consumer is rational and aims at maximum satisfaction.',
    }),
    sl('example', 'Worked example 2: Kabir at the village fair', {
      b: 'Kabir has ₹18; toffee packets cost ₹2, balloons ₹4.',
      bl: ['Step 1 — Divide each MU by its price.', 'Step 2 — Buy in order of the highest MU per rupee.', 'Step 3 — At **3 toffee packets and 3 balloons**, both ratios are **6** and 3 × 2 + 3 × 4 = ₹18.', 'Step 4 — So **MUm = 6 utils per rupee**.'],
      v: tKabir,
      n: 'Kabir has eighteen rupees at a village fair near Lucknow. Divide each marginal utility by the price to get utility per rupee. Buying in order of the highest value, he reaches three toffee packets and three balloons. The last unit of each gives six utils per rupee, and he has spent exactly eighteen rupees. So he is in equilibrium, and his marginal utility of money is six.',
    }),
    sl('diagram', 'Equal marginal utility per rupee', {
      v: vEqui,
      n: 'This picture shows the same result. Each panel plots marginal utility per rupee for one good, falling as Kabir buys more. The dashed line at six is his marginal utility of money. Both curves reach it at the third unit, marked E. Buying a fourth unit of either would give less than six utils per rupee, so the rupees would be better used elsewhere.',
    }),
    sl('check', 'Quick check: what is MUm?', { b: 'What does MUm stand for?', chk: 'm_emu_mum', n: 'Think of what the consumer gives up when she spends the last rupee.' }),
    sl('two-column', 'When the ratios are not equal', {
      cols: ['**MUx ÷ Px > MUy ÷ Py:** move rupees from Y to X. MUx falls, MUy rises.', '**MUx ÷ Px < MUy ÷ Py:** move rupees from X to Y. Continue until the ratios are equal.'],
      v: flow('TB', ['Ratios unequal', 'Transfer a rupee to the good with the higher ratio', 'Total utility rises', 'Diminishing MU narrows the gap', 'Ratios equal'], 'Flow of adjustment: when ratios are unequal, transferring a rupee to the good with the higher ratio raises total utility, and diminishing marginal utility narrows the gap until the ratios are equal', 'Adjustment towards equilibrium'),
      n: 'If the ratios are unequal, the consumer is not yet in equilibrium. A rupee moved from the good with the lower ratio to the good with the higher ratio adds more satisfaction than it takes away. As she buys more of one good its marginal utility falls, and as she buys less of the other its marginal utility rises, until the ratios are equal.',
    }),
    sl('example', 'Worked example 3: a price rise for comics', {
      b: 'Tanvi (imagined Pune book fair, ₹45) is in equilibrium with 3 comics at ₹5 and 3 puzzle books at ₹10, both at 8 utils per rupee.',
      bl: ['Step 1 — Comics rise to ₹10: the 3rd comic now gives 40 ÷ 10 = **4** utils per rupee.', 'Step 2 — Puzzle books still give **8**: the ratios are unequal.', 'Step 3 — She **buys fewer comics** and shifts spending to puzzle books — the law of demand again.'],
      v: tTanvi,
      n: 'Tanvi is in equilibrium with three comics and three puzzle books, both at eight utils per rupee. Now comics double in price to ten rupees. Her third comic gives only four utils per rupee, half of what a rupee earns in puzzle books. So she buys fewer comics and more puzzle books until the ratios match again. A higher price means a smaller quantity demanded.',
    }),
    sl('check', 'Quick check: marginal utility of money', { b: "Find Kabir's MUm from his last balloon.", chk: 'n_emu_ratio', n: 'Divide the marginal utility of his last balloon by its price.' }),
    sl('summary', 'Part 2 summary', {
      bl: ['One good: equilibrium at MUx = Px (MU in ₹).', 'Two goods: MUx ÷ Px = MUy ÷ Py = MUm, with income spent.', 'Unequal ratios: shift rupees to the higher ratio.', 'Diminishing MU makes demand curves slope downward.'],
      v: tSummary2,
      n: 'To sum up part two. With one good, the consumer buys until marginal utility in rupees equals the price. With two goods, she spends so that the marginal utility per rupee is the same for both and equal to the marginal utility of money, using her whole income. And because marginal utility diminishes, a price rise lowers the quantity she buys.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Write the condition **in full**: MUx ÷ Px = MUy ÷ Py = MUm **and** income fully spent.', 'Equal **spending** or equal **MU** is not the condition — equal **MU per rupee** is.', 'In schedule questions, show a column of **MU ÷ P** and check the budget.', 'For one good, show both cases: MU > P (buy more) and MU < P (buy less).'],
      n: 'Exam tips for part two. Always write the full condition, including that income is fully spent. Many students write equal marginal utilities or equal spending: both are wrong. In schedule questions, add a column of marginal utility divided by price and check the budget. And for one good, explain both sides of the equilibrium.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Consumer Behaviour: Cardinal Utility Analysis — notes',
  sections: [
    {
      h: '1. Utility', t: 1,
      b: '**Utility** is the want-satisfying power of a good. In the **cardinal approach** it is assumed measurable in **utils**, and in money when the MU of money is constant.\n\n- **Subjective:** depends on the consumer\'s desire.\n- **Ethically neutral:** a good need not be useful or healthy to have utility.\n- **Relative:** varies with time, place and person.',
      terms: [['Utility', 'The capacity of a good to satisfy a human want.'], ['Util', 'An imaginary unit used to count utility in the cardinal approach.']],
    },
    {
      h: '2. Total and marginal utility', t: 1,
      b: '**TU** = satisfaction from all units consumed = sum of MUs. **MU** = change in TU from one more unit: **MUₙ = TUₙ − TUₙ₋₁**.\n\n**Relationship:** MU positive and falling → TU rises at a diminishing rate; MU = 0 → TU maximum (**point of satiety**); MU negative → TU falls. In a diagram the **MU curve cuts the x-axis** at the quantity where the **TU curve peaks**.',
      terms: [['Total utility', 'The sum of satisfaction from all units of a good consumed.'], ['Marginal utility', 'The addition to total utility from one more unit.'], ['Point of satiety', 'The quantity at which MU is zero and TU is maximum.']],
      v: tJalebi, vs: [vTU, vMU],
    },
    {
      h: '3. Law of Diminishing Marginal Utility', t: 2,
      b: '**Statement:** other things remaining the same, as a consumer consumes more and more units of a good in succession, the **marginal utility of each successive unit diminishes**.\n\n**Why:** a want is limited in intensity; the first unit satisfies much of it, so later units add less.\n\n**Assumptions:** cardinal measurement; continuous consumption; homogeneous units; constant income, tastes and MU of money; a rational consumer. *(Criticisms of the law are not in the ISC 2027 syllabus.)*',
      terms: [['Ceteris paribus', 'Other things (income, tastes, prices of other goods) remaining the same.'], ['Homogeneous units', 'Units identical in size, quality and taste.']],
      v: tAssump, vs: [tCases],
    },
    {
      h: '4. Consumer\'s equilibrium: one commodity', t: 3,
      b: '**Condition:** **MUx = Px** (MU in rupees), with MU falling.\n\n- If **MU > P**: buying more adds more satisfaction than the money given up — buy more.\n- If **MU < P**: the last unit is worth less than its price — buy less.\n\nAs the price falls, the consumer buys more units (because MU diminishes): this is how the condition explains the **downward-sloping demand curve**.',
      terms: [['Consumer\'s equilibrium', 'The position in which a consumer gets maximum satisfaction from her money and has no reason to change her purchases.'], ['Marginal utility of money', 'The utility of the last rupee held; assumed constant.']],
      v: vEqOne, vs: [tLassi, tDemand],
    },
    {
      h: '5. Law of Equimarginal Utility (two commodities)', t: 4,
      b: '**Statement:** a consumer with limited income gets **maximum satisfaction** when she spends it so that the **marginal utility of the last rupee is equal in all uses**.\n\n**Condition:** **MUx ÷ Px = MUy ÷ Py = MUm**, with the **whole income spent**.\n\n**Adjustment:** if MUx ÷ Px > MUy ÷ Py, transfer rupees from Y to X; diminishing MU then lowers MUx and raises MUy until the ratios are equal.\n\nAlso called the **law of maximum satisfaction** or the **law of substitution**.',
      terms: [['Law of Equimarginal Utility', 'Maximum satisfaction is reached when the marginal utility per rupee is equal in every use of income.'], ['MU per rupee', 'Marginal utility of a good divided by its price.']],
      v: tKabir, vs: [vEqui, tEmuAssump],
    },
    {
      h: '6. Price changes and demand', t: [3, 4],
      b: 'A **rise in the price** of X lowers **MUx ÷ Px**, so the consumer **buys less X** (and more Y) until the ratios are equal again; a **fall in price** does the opposite. Both the one-good and the two-good conditions therefore explain the **law of demand**.',
      terms: [['Law of demand', 'Other things remaining the same, quantity demanded falls as price rises.']],
      v: tTanvi,
    },
  ],
  tips: '**Common mistakes**\n- Writing MU = TU ÷ quantity (that is average utility).\n- Saying TU falls whenever MU falls — TU falls only when MU is **negative**.\n- Stating the two-good condition as MUx = MUy, or as equal spending on each good.\n- Leaving out "income fully spent" from the condition.\n- Writing criticisms of the Law of Diminishing Marginal Utility — only its **assumptions** are in the ISC 2027 syllabus.\n\n**How marks are usually awarded**\n- 1-mark MCQ / assertion-reason: one correct option.\n- 2 marks: a definition or condition plus a reason or example.\n- 3 marks: three steps or points; numericals show the formula, working and answer.\n- 5 marks (and the ISC paper\'s 4- and 8-mark parts): a schedule or diagram with a full explanation, each part answered separately.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Utility**', 'The want-satisfying power of a good; subjective and ethically neutral.', 'definition', 1],
  ['**Util**', 'An imaginary unit used to count utility in the cardinal approach.', 'definition', 1],
  ['**Total utility (TU)**', 'Satisfaction from all units consumed; the sum of the MUs.', 'definition', 1],
  ['**Marginal utility (MU)**', 'Addition to TU from one more unit: MUₙ = TUₙ − TUₙ₋₁.', 'formula', 1],
  ['TU = 36 from 2 cups, 48 from 3 cups. MU of the 3rd cup?', '**12 utils** (48 − 36).', 'example', 1],
  ['MU positive and falling → TU?', 'Rises at a **diminishing** rate.', 'concept', 1],
  ['MU = 0 → TU?', '**Maximum**: the point of satiety.', 'concept', 1],
  ['MU negative → TU?', '**Falls** (but need not be negative).', 'concept', 1],
  ['Where does the MU curve cut the x-axis?', 'At the quantity where the **TU curve peaks**.', 'diagram', 1],
  ['Utility varies with…', 'Person, time and place (a shawl in Shimla vs Chennai).', 'concept', 1],
  ['**Law of Diminishing Marginal Utility**', 'Ceteris paribus, the MU of successive units of a good falls.', 'definition', 2],
  ['Why does MU diminish?', 'A want is limited; earlier units satisfy much of it.', 'concept', 2],
  ['Assumption: continuity', 'Units consumed one after another, **without a long gap**.', 'fact', 2],
  ['Assumption: homogeneity', 'All units **identical** in size, quality and taste.', 'fact', 2],
  ['Other assumptions of the law', 'Cardinal measurement; constant income, tastes and MU of money; rational consumer.', 'fact', 2],
  ['A novel now, its sequel in 6 months: does the law apply?', '**No** — time gap and different units.', 'exam-tip', 2],
  ['Criticisms of the Law of DMU in ISC 2027?', '**Not in the syllabus** — learn only the assumptions.', 'exam-tip', 2],
  ['One-good equilibrium condition', '**MUx = Px** (MU in rupees), MU falling.', 'formula', 3],
  ['MU > P: what should the consumer do?', '**Buy more** — the unit is worth more than its price.', 'concept', 3],
  ['MU < P: what should the consumer do?', '**Buy less** — the last unit is worth less than its price.', 'concept', 3],
  ['Why assume constant MU of money?', 'So money is a fixed yardstick for converting utils into rupees.', 'concept', 3],
  ['MU in ₹ of glasses: 70, 50, 30, 10; price ₹30. Glasses bought?', '**3** (MU = P at the 3rd).', 'example', 3],
  ['How does MU = P explain the demand curve?', 'More units are bought only at lower prices because MU falls.', 'concept', 3],
  ['**Law of Equimarginal Utility**', 'Max satisfaction when MU of the last rupee is equal in all uses.', 'definition', 4],
  ['Two-good equilibrium condition', '**MUx ÷ Px = MUy ÷ Py = MUm**, income fully spent.', 'formula', 4],
  ['Other names for the equimarginal law', 'Law of maximum satisfaction; law of substitution.', 'fact', 4],
  ['MUx ÷ Px = 8, MUy ÷ Py = 5: adjust how?', 'Buy **more X, less Y** until the ratios are equal.', 'example', 4],
  ['Equal spending on two goods = equilibrium?', '**No** — the test is equal **MU per rupee**.', 'exam-tip', 4],
  ['Price of X rises: effect on MUx ÷ Px?', 'It **falls**, so the consumer buys less X.', 'concept', 4],
  ['MU of last balloon 24, price ₹4: MUm?', '**6 utils per rupee**.', 'example', 4],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Consumer Behaviour: Cardinal Utility Analysis',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_tu_max', 'm_ldmu_statement', 'm_eq_one_sched', 'm_emu_cond', 'ar_eq_one'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions; the second has an internal choice. About 30–50 words each.', items: ['s_eq_one_cond', { attempt: 1, keys: ['s_tu_mu_diff', 's_ldmu_two_assump'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions; the second has an internal choice. About 50–80 words each; show working in numericals.', items: ['s3_emu_kabir', { attempt: 1, keys: ['s3_tu_mu_three', 's3_ldmu_assump3'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question. It is set in parts; show every step and draw the diagram.', items: ['l_eq_one_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Consumer Behaviour: Cardinal Utility Analysis',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_utility_meaning', 'm_mu_from_tu', 'm_tu_falls', 'm_ldmu_assumption', 'm_ldmu_gap', 'm_eq_one_more', 'm_eq_price_rise', 'm_emu_shift', 'm_emu_kabir', 'm_emu_price_fall', 'ar_tu_mu', 'ar_emu_equalmu'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions; the last has an internal choice. About 30–50 words each.', items: ['s_mu_zero_meaning', 's_ldmu_price', { attempt: 1, keys: ['s_emu_state', 's_emu_unequal'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions; the last has an internal choice. About 50–80 words each; show working in numericals.', items: ['s3_mu_schedule', 's3_ldmu_explain', 's3_eq_one_diagram', { attempt: 1, keys: ['s3_emu_why', 's3_emu_price_effect'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer both questions; the second has an internal choice. Each is set in parts.', items: ['l_emu_table', { attempt: 1, keys: ['l_ldmu_diagram', 'l_emu_explain'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-economics-ch02 only (utility, TU and MU; Law of Diminishing Marginal Utility with assumptions; one-commodity equilibrium; Law of Equimarginal Utility and two-commodity equilibrium); the removed topic (criticisms of the law) appears nowhere except as a syllabus note',
    originality: 'every consumer, schedule and case is imagined and written by SOYL (jalebi, filter coffee, lassi, coconuts, toffee and balloons, comics and puzzle books, coupons); no textbook pizza, ice-cream or orange table and no ISC specimen or past-paper item reused',
    data: `all schedules computed and asserted in questions.mjs: jalebi MU ${JALEBI_MU.join('/')} with satiety at plate ${JALEBI_SAT} and equilibrium ${JALEBI_EQ} plates at ₹${JALEBI_PRICE}; Kabir ${KABIR.x} + ${KABIR.y} at MUm ${KABIR.ratio} with ₹${KABIR_M}; Tanvi ${TANVI.x} + ${TANVI.y} at MUm ${TANVI.ratio} with ₹${TANVI_M}; lassi ${LASSI_EQ} glasses at ₹${LASSI_P}; coconuts ${COCO_EQ} at ₹${COCO_P}; SVG curves plotted from the same arrays`,
    pattern: 'ISC 2027 specimen 856 style: 1-mark MCQ and assertion-reason (option (d) "Both Assertion and Reason are false"); 2-, 3- and 5-mark items for the isc-12-default blueprints, plus 4-mark (2 + 2) and 8-mark (4 + 4) paper-style items in the bank',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify, word limits, answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
