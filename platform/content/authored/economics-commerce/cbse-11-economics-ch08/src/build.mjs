// Build CBSE 11 Economics ch08 Introduction to Microeconomics. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, check } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch08', 'economics-commerce');
const Qs = await import('./questions.mjs');
const {
  J, LET, P1, f1, fOut, fIn, fRotC, fRotW, OUTX, UX, UY, OX, OY, idle, over, gainOut, gainRot, tvAvg, tvBD,
  P5, FARM, farmOC, LAB_N, LAB_D, LAB_W, HV_D, HV_R, labCost, hvCost, techDiff, inr,
} = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
check(P1.X.length, 5, 0, 'five combinations A to E');
check(fOut(1), 192, 6, 'growth frontier cloth at 1 lakh tonnes of wheat');
check(fOut(3), 128, 6, 'growth frontier cloth at 3 lakh tonnes of wheat');
check(fOut(4), 72, 6, 'growth frontier cloth at 4 lakh tonnes of wheat');
check(P1.mrt[3] - P1.mrt[0], 60, 6, 'rise of the marginal rate from the first to the last move');
const wh = P1.X;
const gains = wh.map((x) => fOut(x) - f1(x));
check(gains[2], 48, 6, 'growth gain at 2 lakh tonnes of wheat');

// ---------------------------------------------------------------- SVG: PPF drawn from the schedule
const vPPF = (() => {
  const s = new Svg(640, 400);
  const c = s.chart({ x0: 0, x1: 5, y0: 0, y1: 180, left: 80, top: 30, width: 470, height: 300, xLabel: 'Wheat (lakh tonnes)', yLabel: 'Cloth (thousand metres)' });
  c.fn(f1, 0, 4, { color: 'accent', sw: 2.8 }, 60);
  P1.X.forEach((x, i) => {
    c.dot([x, P1.Y[i]], 'accent');
  });
  c.label([0, P1.Y[0]], 'A', { dx: 14, dy: -8, bold: true });
  c.label([1, P1.Y[1]], 'B', { dx: 12, dy: -12, bold: true });
  c.label([2, P1.Y[2]], 'C', { dx: 12, dy: -12, bold: true });
  c.label([3, P1.Y[3]], 'D', { dx: 12, dy: -12, bold: true });
  c.label([4, P1.Y[4]], 'E', { dx: 0, dy: -14, bold: true });
  c.dot([UX, UY], 'red');
  c.label([UX, UY], 'U inside', { dx: 0, dy: 16, color: 'red', size: 12 });
  c.dot([OX, OY], 'green');
  c.label([OX, OY], 'W outside', { dx: 14, dy: -10, color: 'green', size: 12, anchor: 'start' });
  c.drop([2, 120]);
  P1.Y.slice(1, 4).forEach((y) => c.yTick(y, String(y)));
  c.yTick(P1.Y[0], String(P1.Y[0]));
  [1, 2, 3, 4].forEach((x) => c.xTick(x, String(x)));
  return s.visual(
    `Production possibility frontier of the imagined economy of Tarvania drawn from the schedule of wheat and cloth: combinations A to E lie on a curve bowed away from the origin, point U lies inside the curve and point W lies outside it`,
    `Imagined Tarvania. On the curve: A ${P1.X[0]}, ${P1.Y[0]}; B ${P1.X[1]}, ${P1.Y[1]}; C ${P1.X[2]}, ${P1.Y[2]}; D ${P1.X[3]}, ${P1.Y[3]}; E ${P1.X[4]}, ${P1.Y[4]}. U (${UX}, ${UY}) is inside; W (${OX}, ${OY}) is outside.`,
  );
})();

// ---------------------------------------------------------------- SVG: shifts (outward and inward) and rotation
function frame(xmax, ymax) {
  const s = new Svg(640, 380);
  const c = s.chart({ x0: 0, x1: xmax, y0: 0, y1: ymax, left: 80, top: 30, width: 470, height: 290, xLabel: 'Wheat (lakh tonnes)', yLabel: 'Cloth (thousand metres)' });
  return { s, c };
}
const vShifts = (() => {
  const { s, c } = frame(6, 220);
  c.fn(f1, 0, 4, { color: 'accent', sw: 2.8 }, 60);
  c.fn(fOut, 0, OUTX, { color: 'blue', sw: 2.4, dash: true }, 60);
  c.fn(fIn, 0, 3, { color: 'red', sw: 2.4, dash: true }, 60);
  c.label([0, 200], '200', { dx: -30, size: 12, anchor: 'end' });
  c.label([OUTX, 0], `${OUTX}`, { dy: 16, size: 12 });
  c.yTick(160, '160');
  c.yTick(120, '120');
  c.xTick(3, '3');
  c.xTick(4, '4');
  c.label([3.4, 150], 'Rightward: growth', { color: 'blue', size: 12, anchor: 'start', dx: 8 });
  c.label([1.4, 100], 'Old frontier', { color: 'accent', size: 12, anchor: 'start', dx: 0 });
  c.label([0.15, 55], 'Leftward: destruction', { color: 'red', size: 12, anchor: 'start', dx: 0 });
  return s.visual(
    'Shifts of the production possibility frontier of the imagined economy of Tarvania: the original curve, a dashed curve to the right after growth of resources or better technology, and a dashed curve to the left after destruction of resources',
    `Imagined Tarvania. Old frontier: ${f1(0)} thousand metres of cloth or ${P1.X[4]} lakh tonnes of wheat. After growth: ${fOut(0)} or ${OUTX}. After an earthquake: ${fIn(0)} or 3.`,
  );
})();
const vRot = (() => {
  const { s, c } = frame(6, 220);
  c.fn(f1, 0, 4, { color: 'accent', sw: 2.8 }, 60);
  c.fn(fRotC, 0, 4, { color: 'blue', sw: 2.4, dash: true }, 60);
  c.yTick(160, '160');
  c.yTick(200, '200');
  c.xTick(4, '4');
  c.label([1.6, 140], 'Old frontier', { color: 'accent', size: 12, anchor: 'start', dx: 0, dy: 22 });
  c.label([0.3, 215], 'New: cloth technology improves', { color: 'blue', size: 12, anchor: 'start', dx: 0 });
  return s.visual(
    'Rotation of the production possibility frontier of the imagined economy of Tarvania: after better technology for cloth only, the dashed curve starts higher on the cloth axis and meets the wheat axis at the same point as the old curve',
    `Imagined Tarvania. Cloth intercept ${f1(0)} to ${fRotC(0)}; wheat intercept unchanged at ${P1.X[4]}.`,
  );
})();

// ---------------------------------------------------------------- SVG: marginal rate of transformation bars
const vMRT = (() => {
  const s = new Svg(640, 340);
  const c = s.chart({ x0: 0, x1: 4, y0: 0, y1: 80, left: 80, top: 30, width: 470, height: 250, xLabel: 'Move along the frontier', yLabel: 'MRT (cloth per lakh tonnes of wheat)' });
  P1.mrt.forEach((m, i) => {
    const x0 = c.X(i + 0.2), x1 = c.X(i + 0.8);
    s.rect(x0, c.Y(m), x1 - x0, c.Y(0) - c.Y(m), { fill: 'accent', fillOpacity: 0.35, rx: 3, color: 'accent', sw: 1.6 });
    s.text((x0 + x1) / 2, c.Y(m) - 10, String(m), { size: 13, bold: true });
    s.text((x0 + x1) / 2, c.Y(0) + 16, `${LET[i]} to ${LET[i + 1]}`, { size: 12 });
  });
  return s.visual(
    `Bar chart of the marginal rate of transformation for each move along the Tarvania frontier: ${J(P1.mrt)} thousand metres of cloth per lakh tonnes of wheat, rising at every move`,
    'Imagined Tarvania: the marginal rate rises at every move, so the frontier is concave to the origin.',
  );
})();

// ---------------------------------------------------------------- SVG: micro versus macro
const vMM = (() => {
  const s = new Svg(640, 330);
  s.rect(210, 14, 220, 44, { fill: 'fill', rx: 8 });
  s.text(320, 36, 'Economics', { size: 16, bold: true });
  s.arrow(250, 58, 160, 100, { sw: 1.6 });
  s.arrow(390, 58, 480, 100, { sw: 1.6 });
  s.rect(20, 100, 280, 210, { fill: 'fill', rx: 10 });
  s.text(160, 124, 'Microeconomics', { size: 16, bold: true, color: 'accent' });
  s.text(160, 148, 'Individual units', { size: 13, muted: true });
  ['A consumer or household', 'A producer or firm', 'A single market', 'Price of one product', 'Demand for tea in a town'].forEach((t, i) => s.text(40, 178 + i * 24, t, { anchor: 'start', size: 13 }));
  s.rect(340, 100, 280, 210, { fill: 'fill', rx: 10 });
  s.text(480, 124, 'Macroeconomics', { size: 16, bold: true, color: 'blue' });
  s.text(480, 148, 'The economy as a whole', { size: 13, muted: true });
  ['National income', 'Total employment', 'General price level', 'Total savings', 'Total output of the economy'].forEach((t, i) => s.text(360, 178 + i * 24, t, { anchor: 'start', size: 13 }));
  return s.visual(
    'Chart comparing microeconomics, which studies individual units such as a consumer, a producer, a single market and the price of one product, with macroeconomics, which studies the economy as a whole: national income, total employment, the general price level, total savings and total output',
    'Microeconomics and macroeconomics.',
  );
})();

// ---------------------------------------------------------------- SVG: central problems flow
const vCentral = (() => {
  const s = new Svg(640, 350);
  s.rect(150, 10, 340, 44, { fill: 'fill', rx: 8 });
  s.text(320, 32, 'Scarce resources, many wants', { size: 15, bold: true });
  s.arrow(320, 54, 320, 84, { sw: 1.8 });
  s.rect(190, 84, 260, 40, { fill: 'fill', rx: 8 });
  s.text(320, 104, 'Choices must be made', { size: 15, bold: true });
  s.arrow(250, 124, 110, 168, { sw: 1.8 });
  s.arrow(320, 124, 320, 168, { sw: 1.8 });
  s.arrow(390, 124, 530, 168, { sw: 1.8 });
  const box = (cx, title, l1, l2, col) => {
    s.rect(cx - 100, 168, 200, 150, { fill: 'fill', rx: 10 });
    s.text(cx, 192, title, { size: 15, bold: true, color: col });
    s.text(cx, 228, l1, { size: 13 });
    s.text(cx, 252, l2, { size: 13 });
  };
  box(110, 'What to produce', 'Which goods', 'and how much', 'accent');
  box(320, 'How to produce', 'Choice of technique:', 'labour or capital', 'blue');
  box(530, 'For whom to produce', 'Who receives', 'the output', 'red');
  return s.visual(
    'Flow chart: scarce resources and many wants force choices, which give rise to three central problems: what to produce, how to produce and for whom to produce',
    'The three central problems of an economy.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Scarcity and choice', 'Micro and macro', 'Positive and normative', 'Types of economy'], 'Route map of Part 1: scarcity and choice, micro and macro, positive and normative economics, types of economy', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Central problems', 'Opportunity cost', 'The frontier', 'Marginal rate', 'Shifts'], 'Route map of Part 2: the central problems, opportunity cost, the production possibility frontier, the marginal rate of transformation and shifts', 'Part 2 at a glance');
const vChoice = flow('LR', ['Wants are many', 'Resources are limited', 'Resources have other uses', 'A choice must be made', 'The next best use is given up'], 'Flow from many wants and limited resources with alternative uses to choice and the opportunity cost of the next best use', 'Scarcity leads to choice');
const tHalsey = table(
  ['Use of the plot', 'Benefit to Halsey', 'Chosen?'],
  [
    ['School', 'Education for the town\'s children', 'Yes'],
    ['Hospital', 'Health care for the town', 'No: this is the opportunity cost'],
  ],
  'Table of the choice of the imagined town of Halsey between a school and a hospital on one plot, the hospital being the opportunity cost of the school',
  'Imagined town of Halsey, one plot.',
);
const tMMtopics = table(
  ['Topic in the imagined economy of Kelvaria', 'Level'],
  [
    ['Weekly demand of one household for apples', 'Micro'],
    ['Price of tablets in one market', 'Micro'],
    ['Output decision of one tablet factory', 'Micro'],
    ['General price level of Kelvaria', 'Macro'],
    ['Total employment in Kelvaria', 'Macro'],
    ['National income of Kelvaria', 'Macro'],
  ],
  'Table of six imagined topics of Kelvaria and whether each is micro or macro',
  'Imagined Kelvaria.',
);
const tMMwork = table(
  ['Topic', 'Individual unit or whole economy?', 'Level'],
  [
    ['Price of one brand of tea in a Halsey shop', 'One product in one market', '**Micro**'],
    ['Total output of all goods in Halsey', 'Whole economy', '**Macro**'],
    ['Wage paid by one bakery', 'One producer', '**Micro**'],
    ['Total employment in Halsey', 'Whole economy', '**Macro**'],
  ],
  'Worked classification of four imagined topics of Halsey into micro and macro',
  'Imagined town of Halsey.',
);
const tPos = table(
  ['Imagined positive statement', 'How it can be tested'],
  [
    ['Apple output in Kelvaria fell after the frost', 'Compare output figures before and after'],
    ['The price of cloth in Tarvania is higher than the price of wheat per kilogram', 'Compare market prices'],
    ['Unemployment in Orlin rose last year', 'Compare employment records'],
  ],
  'Table of three imagined positive statements and how each can be tested with facts',
  'Positive statements can be true or false.',
);
const tNorm = table(
  ['Imagined normative statement', 'Why it is normative'],
  [
    ['Kelvaria ought to give every school a tablet', 'Value judgement about what should be done'],
    ['It is unfair that a few families own most orchards', 'Judgement about fairness'],
    ['Tarvania should tax luxury cloth heavily', 'Judgement about policy'],
  ],
  'Table of three imagined normative statements and why each rests on a value judgement',
  'Normative statements express what ought to be.',
);
const tClass2 = table(
  ['Imagined statement', 'Key word', 'Type'],
  [
    ['Cloth output in Tarvania rose last year', 'rose: a fact', '**Positive**'],
    ['Tarvania should reduce its cloth imports', 'should: a judgement', '**Normative**'],
    ['The price of rice in Belmora is lower in autumn', 'is lower: testable', '**Positive**'],
    ['Belmora ought to subsidise rice farmers', 'ought: a judgement', '**Normative**'],
  ],
  'Worked classification of four imagined statements about Tarvania and Belmora as positive or normative',
  'Look for facts that can be tested, or for words such as should and ought.',
);
const vBoth = flow('LR', ['Positive: find the facts', 'Normative: judge what ought to be done', 'A policy decision uses both'], 'Flow from positive facts to normative judgement to a policy decision that uses both', 'Facts and values together');
const vPlanned = flow('LR', ['Central authority', 'Plan for what, how and for whom', 'Resources allocated by the plan', 'Output shared by the plan'], 'Flow of decisions in a centrally planned economy from the central authority to its plan, allocation of resources and sharing of output', 'Centrally planned economy');
const vMarket = flow('LR', ['Households with incomes', 'Demand in markets', 'Prices and profits send signals', 'Firms decide what and how'], 'Flow of decisions in a market economy from household incomes and demand to price and profit signals and the decisions of firms', 'Market economy');
const tTypes = table(
  ['Type of economy', 'Who takes the central decisions', 'Imagined example'],
  [
    ['Centrally planned', 'Government or central authority, through a plan', 'Orlin'],
    ['Market', 'Buyers and sellers, through markets and prices', 'Quillon'],
    ['Mixed', 'Both: private firms through markets and the government', 'Dunmere'],
  ],
  'Table of the three types of economy, who takes the central decisions in each and an imagined example',
  'Three imagined economies.',
);
const tScen = table(
  ['Imagined situation', 'Type of economy', 'Reason'],
  [
    ['A state agency tells every farm and factory in Orlin what to produce', 'Centrally planned', 'Authority decides'],
    ['Firms in Quillon produce whatever earns profit at market prices', 'Market', 'Prices decide'],
    ['Dunmere has private shops and a state-run railway', 'Mixed', 'Both sectors work'],
  ],
  'Worked classification of three imagined situations into centrally planned, market and mixed economies',
  'Who decides?',
);
const tSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Scarcity', 'Limited resources, many wants: choice is unavoidable'],
    ['Micro and macro', 'Individual units and the economy as a whole'],
    ['Positive and normative', 'What is, which can be tested, and what ought to be, a value judgement'],
    ['Types of economy', 'Centrally planned, market and mixed'],
  ],
  'Summary table of Part 1: scarcity, micro and macro, positive and normative, types of economy',
);
const tHow = table(
  ['Technique', 'Uses more of', 'Imagined example'],
  [
    ['Labour-intensive', 'Labour', `Harvesting a field with ${LAB_N} hired workers`],
    ['Capital-intensive', 'Machines and other capital', 'Harvesting the same field with a rented machine'],
  ],
  'Table of the labour-intensive and capital-intensive techniques with an imagined harvesting example',
  'The choice of technique.',
);
const tTech = table(
  ['Technique', 'Working', 'Cost'],
  [
    ['Labour-intensive', `${LAB_N} workers × ${LAB_D} days × ${inr(LAB_W)}`, `**${inr(labCost)}**`],
    ['Capital-intensive', `${HV_D} days × ${inr(HV_R)}`, `**${inr(hvCost)}**`],
    ['Difference', `${labCost} − ${hvCost}`, `**${inr(techDiff)}**`],
  ],
  `Table of the cost of harvesting the imagined field of Dilbag with workers, ${inr(labCost)}, and with a machine, ${inr(hvCost)}, a difference of ${inr(techDiff)}`,
  'Imagined farmer Dilbag of Bhavpur.',
);
const vWhom = flow('LR', ['Output is produced', 'Incomes are earned', 'Incomes decide who can buy', 'Output is distributed'], 'Flow from production of output to incomes earned, to who can buy and to the distribution of output', 'For whom to produce');
const tFarm = table(
  ['Use of the two hectares', 'Income (Rs)', 'Position'],
  [
    ['Sugarcane', String(FARM[0][1]), 'Chosen'],
    ['Paddy', String(FARM[1][1]), `**Next best: opportunity cost ${farmOC}**`],
    ['Vegetables', String(FARM[2][1]), 'Third'],
  ],
  `Table of the incomes from three uses of Dilbag's land: sugarcane ${FARM[0][1]} chosen, paddy ${FARM[1][1]} as the next best and so the opportunity cost, vegetables ${FARM[2][1]}`,
  'Opportunity cost is the next best alternative, not the sum of all alternatives.',
);
const tAssump = table(
  ['Assumption of the frontier', 'Meaning'],
  [
    ['Fixed resources', 'The quantity of resources does not change'],
    ['Given technology', 'The methods of production do not change'],
    ['Full and efficient use', 'No resource is idle or wasted'],
    ['Resources not equally efficient in both goods', 'Some suit one good better than the other'],
  ],
  'Table of the four assumptions behind the production possibility frontier',
  'Production possibility frontier: combinations of two goods producible with given resources and technology.',
);
const tSched = table(
  ['Combination', 'Wheat (lakh tonnes)', 'Cloth (thousand metres)'],
  P1.X.map((x, i) => [LET[i], String(x), String(P1.Y[i])]),
  `Table of the imagined production possibilities of Tarvania: wheat ${J(P1.X)} lakh tonnes with cloth ${J(P1.Y)} thousand metres at combinations A to E`,
  'Imagined Tarvania.',
);
const tPoints = table(
  ['Point', 'Wheat', 'Cloth', 'Frontier cloth at that wheat', 'Position'],
  [
    ['C', String(P1.X[2]), String(P1.Y[2]), String(f1(2)), '**On** the frontier: efficient'],
    ['U', String(UX), String(UY), String(f1(UX)), `**Inside**: ${idle} thousand metres idle`],
    ['W', String(OX), String(OY), String(f1(OX)), `**Outside**: ${over} beyond, unattainable`],
  ],
  `Table of three points of Tarvania against the frontier: C on it, U inside it by ${idle} and W outside it by ${over}`,
  'Imagined Tarvania.',
);
const tMRTwork = table(
  ['Move', 'Fall in cloth ΔY', 'Rise in wheat ΔX', 'MRT = ΔY ÷ ΔX'],
  P1.mrt.map((m, i) => [`${LET[i]} to ${LET[i + 1]}`, String(P1.give[i]), String(P1.dX[i]), `**${m}**`]),
  `Table of the marginal rate of transformation of Tarvania for each move from A to E: ${J(P1.mrt)}, rising at every move`,
  'Imagined Tarvania.',
);
const tGain = table(
  ['Wheat (lakh tonnes)', 'Old cloth', 'New cloth', 'Gain'],
  wh.map((x, i) => [String(x), String(f1(x)), String(fOut(x)), `**${gains[i]}**`]),
  `Table of the cloth Tarvania can make at each wheat output before and after growth, with gains ${J(gains)} thousand metres; at 2 lakh tonnes of wheat the gain is ${gainOut}`,
  'Imagined growth of resources and technology.',
);
const tCentralPPF = table(
  ['What the frontier shows', 'Central problem or idea'],
  [
    ['Choice of one point among the many on the curve', 'What to produce, and in what quantities'],
    ['Point inside: unemployed or wasted resources', 'Efficient use of resources'],
    ['Movement along the curve', 'Opportunity cost: giving up one good for the other'],
    ['Shift of the curve outward', 'Growth of productive capacity'],
  ],
  'Table of what the production possibility frontier shows and the central problem or idea each relates to',
);
const tSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Central problems', 'What, how and for whom to produce'],
    ['Opportunity cost', 'Value of the next best alternative given up'],
    ['Frontier', 'Combinations producible with given resources and technology, fully and efficiently used'],
    ['MRT', 'ΔY ÷ ΔX; rises along the frontier, so the curve is concave'],
    ['Position', 'On: efficient; inside: underuse; outside: unattainable'],
    ['Shifts', 'Right: growth; left: destruction; rotation: technology for one good'],
  ],
  'Summary table of Part 2: central problems, opportunity cost, frontier, marginal rate of transformation, position of points and shifts',
);

// ---------------------------------------------------------------- deck 1: micro, macro, positive and normative, types of economy
const part1 = deck({
  part: 1,
  title: 'Introduction to Microeconomics — Part 1: Scarcity, Micro and Macro, Types of Economy',
  goals: [
    'Explain scarcity and choice',
    'Distinguish microeconomics from macroeconomics',
    'Distinguish positive from normative statements',
    'Describe centrally planned, market and mixed economies',
  ],
  slides: [
    sl('title', 'Economics: Scarcity and Choice', {
      b: 'Part 1 — how society chooses among **alternative uses** of scarce resources.',
      v: vRoute1,
      n: 'Every society wants more goods and services than it can produce. This part explains why that forces choices. We then separate the study of single units from the study of the whole economy, and statements of fact from statements of value. Finally we describe three types of economy: centrally planned, market and mixed.',
    }),
    sl('concept', 'Scarcity and choice', {
      b: '**Economics** is the study of how society allocates **scarce** resources among alternative uses to satisfy wants. Resources are limited, wants are many and resources have other uses, so a **choice** must be made.',
      v: vChoice,
      n: 'Economics studies how a society uses scarce resources among alternative uses to satisfy its wants. Scarcity means that resources are limited compared with wants. Because the same land, labour or funds can serve more than one purpose, using them in one way means giving up another. That is why every society has to choose.',
    }),
    sl('concept', 'Opportunity cost of a choice', {
      b: 'The **opportunity cost** of a choice is the value of the next best alternative given up. The imagined town of Halsey has one plot: building the school means that the hospital cannot be built there.',
      v: tHalsey,
      n: 'The town of Halsey has one empty plot. It could hold a school or a hospital, but not both. If the town builds the school, the hospital is the next best use that is given up. This forgone alternative is the opportunity cost of the choice. Scarcity makes the cost unavoidable.',
    }),
    sl('concept', 'Microeconomics', {
      b: '**Microeconomics** studies the behaviour of individual units such as a consumer, a producer or a single market.',
      v: vMM,
      n: 'Microeconomics studies individual units. These are a single consumer, a single producer, or one market. A typical question is how the price of tablets is set in one market, or how much of a good one household buys. Macroeconomics, shown on the right of the chart, instead looks at the economy as a whole.',
    }),
    sl('concept', 'Macroeconomics', {
      b: '**Macroeconomics** studies the economy as a whole: national income, total employment and the general price level.',
      v: tMMtopics,
      n: 'Macroeconomics deals with totals and averages for the whole economy. Examples are national income, total employment and the general price level. In this table of imagined topics for Kelvaria, the demand of one household and the price of one product are micro topics. National income and the general price level are macro topics.',
    }),
    sl('example', 'Worked example 1: micro or macro?', {
      b: 'Classify each imagined topic of the town of Halsey.',
      bl: [
        'Step 1 — Ask whether the topic is about **one unit** or about the **whole economy**.',
        'Step 2 — The price of one brand of tea and the wage of one bakery concern single units: **micro**.',
        'Step 3 — Total output and total employment of Halsey concern the whole economy: **macro**.',
      ],
      v: tMMwork,
      n: 'To classify a topic, ask whether it concerns one unit or the whole economy. The price of one brand of tea in a shop and the wage paid by one bakery concern single units, so they are micro topics. Total output and total employment of the whole town describe the entire economy, so they are macro topics.',
    }),
    sl('check', 'Quick check: micro topic', {
      b: 'Pick the microeconomics topic from an imagined list.',
      chk: 'm_micro_ex',
      n: 'Look at each option and ask whether it concerns a single market, firm or household, or the economy as a whole. Choose the option that concerns a single unit. Remember that national income, total employment and the general price level belong to the other branch.',
    }),
    sl('concept', 'Positive economics', {
      b: '**Positive economics** deals with what **is**: statements that can be tested against facts. A positive statement may be true or false.',
      v: tPos,
      n: 'Positive economics describes what is. A positive statement can be tested against facts, such as output figures, prices or employment records. It may turn out to be true or false, but it can always be checked. The table gives imagined examples and the data that would test each of them.',
    }),
    sl('concept', 'Normative economics', {
      b: '**Normative economics** deals with what **ought to be**. A normative statement rests on a value judgement, so facts alone cannot settle it.',
      v: tNorm,
      n: 'Normative economics deals with what ought to be. Its statements contain value judgements, often with words such as should, ought or unfair. Facts can inform the debate, but they cannot by themselves decide it, because people differ in what they value. The table gives imagined normative statements and the reason each is normative.',
    }),
    sl('example', 'Worked example 2: positive or normative?', {
      b: 'Classify four imagined statements about Tarvania and Belmora.',
      bl: [
        'Step 1 — Ask whether the statement can be **tested** with facts.',
        'Step 2 — Look for judgement words such as **should** and **ought**.',
        'Step 3 — Facts about output or prices: positive. Judgements about policy: normative.',
      ],
      v: tClass2,
      n: 'To classify a statement, ask whether facts can test it. A claim that cloth output rose, or that rice is cheaper in autumn, can be checked, so it is positive. A claim that a country should cut imports or ought to help farmers contains a value judgement, so it is normative.',
    }),
    sl('check', 'Quick check: positive statement', {
      b: 'Pick the positive statement from an imagined list.',
      chk: 'm_pos_class',
      n: 'Read each statement and ask whether it can be tested against facts. Statements with words like should, ought or unfair express judgements. The positive statement describes something that happened or exists and can be checked against data.',
    }),
    sl('concept', 'Using both kinds of statement', {
      b: 'A sound policy decision uses **positive** analysis to find the facts and **normative** judgement to decide what ought to be done.',
      v: vBoth,
      n: 'In practice both kinds of statement are needed. Positive analysis finds out what is happening and what a policy would do. Normative judgement then decides whether that outcome is desirable. A policy decision uses the two together: the facts come first, and the values decide what to do about them.',
    }),
    sl('concept', 'Centrally planned economy', {
      b: 'In a **centrally planned economy** the government or a central authority decides what, how and for whom to produce, through a plan.',
      v: vPlanned,
      n: 'In a centrally planned economy, a central authority takes the main decisions. It prepares a plan that says what to produce, how to produce it and for whom. Resources are allocated according to the plan, and the output is shared according to the plan as well. Prices play a limited role in these decisions.',
    }),
    sl('concept', 'Market economy', {
      b: 'In a **market economy** decisions are taken by buyers and sellers through **markets and prices**: firms follow profit, consumers follow their incomes.',
      v: vMarket,
      n: 'In a market economy, households and firms take the decisions. Households with incomes show their wants through demand in markets. Prices and profits send signals to firms, which decide what to produce and how. No central authority prepares a plan; markets guide the allocation of resources.',
    }),
    sl('concept', 'Mixed economy', {
      b: 'A **mixed economy** combines the two: private firms work through markets while the government also produces and regulates.',
      v: tTypes,
      n: 'A mixed economy has both a private sector and a public sector. Private firms respond to markets and prices, while the government provides services, runs some enterprises and regulates the rest. This table compares who takes the central decisions in each of the three types, with an imagined example of each.',
    }),
    sl('example', 'Worked example 3: which type of economy?', {
      b: 'Identify the type of each imagined economy.',
      bl: [
        'Step 1 — Ask **who decides** what, how and for whom to produce.',
        'Step 2 — A state agency issues orders for every farm and factory: **centrally planned**.',
        'Step 3 — Firms follow profit at market prices: **market**. Private shops with a state-run railway: **mixed**.',
      ],
      v: tScen,
      n: 'To identify an economy, ask who takes the central decisions. In Orlin a state agency tells every farm and factory what to produce, so it is centrally planned. In Quillon firms follow profit at market prices, so it is a market economy. Dunmere has private shops and a state railway, so it is mixed.',
    }),
    sl('check', 'Quick check: types of economy', {
      b: 'Match each term with its description.',
      chk: 'mt_economy',
      n: 'Match the planned economy with the central authority taking decisions, the market economy with decisions through prices, the mixed economy with both sectors working, and scarcity with limited resources compared with wants. Take each description in turn.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To recap. Scarcity means limited resources and many wants, so every society must choose, and the next best alternative given up is the opportunity cost. Microeconomics studies individual units and macroeconomics the whole economy. Positive statements describe what is and can be tested. Normative statements express what ought to be. Economies are centrally planned, market or mixed.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define **scarcity**, **opportunity cost** and **economics** in the standard words.',
        'For micro and macro, give an **example of each** and say whether it concerns a unit or the whole.',
        'To classify a statement, say **testable** or **value judgement**, and give the reason.',
        'Describe each type of economy by **who takes the central decisions**.',
        'A positive statement can be **false**; it is still positive.',
      ],
      n: 'Some tips. Define scarcity and opportunity cost in the standard words. For micro and macro, always give an example and say whether it concerns a single unit or the whole economy. When you classify a statement, name the reason: testable or value judgement. Describe each type of economy by who takes the central decisions. Remember that a positive statement can be false.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2: central problems, PPF, opportunity cost
const part2 = deck({
  part: 2,
  title: 'Introduction to Microeconomics — Part 2: Central Problems and the Production Possibility Frontier',
  goals: [
    'State the three central problems of an economy',
    'Define opportunity cost and the production possibility frontier',
    'Compute the marginal rate of transformation from a schedule and explain the concave shape',
    'Explain points inside and outside the frontier and shifts of the frontier',
  ],
  slides: [
    sl('title', 'Central Problems and the Frontier', {
      b: 'Part 2 — **what, how and for whom**, and the **production possibility frontier**.',
      v: vRoute2,
      n: 'Because resources are scarce, every economy must solve the same central problems. In this part we name them, and then study a simple picture that shows the choice: the production possibility frontier. We compute the cost of one good in terms of another from a schedule, and see what shifts the frontier.',
    }),
    sl('concept', 'The three central problems', {
      b: 'Scarcity forces every economy to decide **what** to produce and in what quantities, **how** to produce it, and **for whom** to produce.',
      v: vCentral,
      n: 'Scarce resources and many wants create choices. The first problem is what to produce, meaning which goods and how much of each. The second is how to produce, meaning the choice of technique. The third is for whom to produce, meaning how the output is shared among the people of the economy.',
    }),
    sl('concept', 'How to produce: choice of technique', {
      b: 'A good can be made with different mixes of inputs. A **labour-intensive** technique uses more labour; a **capital-intensive** technique uses more machines.',
      v: tHow,
      n: 'The second central problem is how to produce. The same good can be produced with a technique that uses more labour or one that uses more machines. A labour-intensive technique relies mainly on workers. A capital-intensive technique relies mainly on machines. The producer chooses the technique that suits the cost and the output.',
    }),
    sl('example', 'Worked example 1: choosing a technique', {
      b: `Farmer Dilbag of the imagined village of Bhavpur can harvest his field with workers or with a rented machine.`,
      bl: [
        `Step 1 — Labour-intensive: ${LAB_N} × ${LAB_D} × ${LAB_W} = **${inr(labCost)}**.`,
        `Step 2 — Capital-intensive: ${HV_D} × ${HV_R} = **${inr(hvCost)}**.`,
        `Step 3 — The machine is cheaper by ${labCost} − ${hvCost} = **${inr(techDiff)}**.`,
      ],
      v: tTech,
      n: 'Dilbag compares the cost of two techniques. Forty workers for five days at four hundred rupees a day cost eighty thousand rupees. A machine hired for two days at thirty thousand rupees a day costs sixty thousand. The capital-intensive technique is cheaper by twenty thousand rupees, so cost points to the machine.',
    }),
    sl('concept', 'For whom to produce', {
      b: '**For whom to produce** is the problem of how the output is **distributed** among the members of the economy.',
      v: vWhom,
      n: 'The third central problem is for whom to produce. Once output is produced, it must be shared among people. Those with higher incomes can buy more of it. So how incomes are earned and distributed decides who receives the goods and services, which is the distribution of output.',
    }),
    sl('check', 'Quick check: how to produce', {
      b: 'Identify the central problem in an imagined harvesting choice.',
      chk: 'm_how',
      n: 'Read the situation carefully. The farmer must choose between workers and a machine for the same task. Decide whether this is about which goods to make, about the method of making them, or about who receives the output. Pick the matching central problem.',
    }),
    sl('concept', 'Opportunity cost', {
      b: '**Opportunity cost** is the value of the **next best alternative** forgone when a choice is made.',
      v: tFarm,
      n: 'Opportunity cost is the value of the next best alternative that is given up. Dilbag has two hectares and can grow sugarcane, paddy or vegetables. He chooses sugarcane. The best alternative he gives up is paddy, so the opportunity cost is the income from paddy. It is not the total of all other uses.',
    }),
    sl('concept', 'The production possibility frontier', {
      b: 'The **production possibility frontier** (production possibility curve) shows the combinations of two goods an economy can produce with **given resources and technology**, fully and efficiently used.',
      v: tAssump,
      n: 'The production possibility frontier shows the combinations of two goods that an economy can produce when its resources and technology are given and are used fully and efficiently. It rests on four assumptions: fixed resources, given technology, full and efficient use, and resources that are not equally efficient in producing both goods.',
    }),
    sl('concept', 'A production possibility schedule', {
      b: 'Imagine Tarvania, which uses all its resources to make wheat and cloth. Each combination uses resources fully.',
      v: tSched,
      n: 'This is an imagined schedule for Tarvania. At combination A the economy makes only cloth. As it moves to B, C, D and E, it makes more wheat and less cloth. At E it makes only wheat. Every combination uses all resources fully and efficiently, so each one lies on the frontier.',
    }),
    sl('concept', 'Drawing the frontier', {
      b: 'Plot wheat on the horizontal axis and cloth on the vertical axis. Points **on** the curve are efficient; **inside** means underuse; **outside** is unattainable.',
      v: vPPF,
      n: 'Plot the schedule with wheat on the horizontal axis and cloth on the vertical axis, then join the points. The curve bows away from the origin. Points on the curve use resources fully. Point U lies inside, so some resources are idle. Point W lies outside, so it cannot be produced with present resources and technology.',
    }),
    sl('concept', 'On, inside and outside the frontier', {
      b: `At ${UX} lakh tonnes of wheat the frontier gives ${f1(UX)} thousand metres of cloth.`,
      v: tPoints,
      n: 'At two lakh tonnes of wheat the frontier gives one hundred and twenty thousand metres of cloth. A point at ninety thousand metres is inside, with thirty thousand metres of cloth idle. A point at three lakh tonnes of wheat and one hundred thousand metres of cloth is outside, because the frontier allows only seventy. Inside means unemployment or waste.',
    }),
    sl('example', 'Worked example 2: marginal rate of transformation', {
      b: 'The **marginal rate of transformation (MRT)**, or marginal opportunity cost, is the units of one good given up to produce one more unit of the other: MRT = ΔY ÷ ΔX.',
      bl: [
        `Step 1 — A to B: cloth falls by ${P1.give[0]}, wheat rises by ${P1.dX[0]}: MRT = ${P1.give[0]} ÷ ${P1.dX[0]} = **${P1.mrt[0]}**.`,
        `Step 2 — B to C: ${P1.give[1]} ÷ ${P1.dX[1]} = **${P1.mrt[1]}**; C to D: ${P1.give[2]} ÷ ${P1.dX[2]} = **${P1.mrt[2]}**; D to E: ${P1.give[3]} ÷ ${P1.dX[3]} = **${P1.mrt[3]}**.`,
        `Step 3 — The marginal rate rises at every move: ${J(P1.mrt)}.`,
      ],
      v: tMRTwork,
      n: 'Divide the cloth given up by the wheat gained for each move. From A to B, ten thousand metres of cloth are given up for one lakh tonnes of wheat. Then the rate is thirty, then fifty, then seventy. The marginal rate of transformation rises at every move, so each extra lakh tonnes of wheat costs more cloth.',
    }),
    sl('concept', 'Why the frontier is concave', {
      b: 'The marginal rate rises because resources are **not equally efficient** in producing both goods. Increasing marginal opportunity cost makes the frontier **concave to the origin**.',
      v: vMRT,
      n: 'The bars show the marginal rate rising at each move. Resources are not equally efficient in making both goods. The first lakh tonnes of wheat use resources best suited to wheat. Later ones must draw in resources better suited to cloth, so more cloth is given up each time. That rising cost is what bends the frontier so that it is concave to the origin.',
    }),
    sl('check', 'Quick check: marginal rate', {
      b: 'Compute the marginal rate of transformation from an imagined schedule.',
      chk: 'n_p1_mrt_bc',
      n: 'Find the fall in cloth between the two combinations, and the rise in wheat. Divide the fall in cloth by the rise in wheat. Give the answer in thousand metres of cloth per lakh tonnes of wheat.',
    }),
    sl('concept', 'Shifts of the frontier', {
      b: 'More resources or better technology shift the frontier **rightward**: growth. Destruction of resources shifts it **leftward**.',
      v: vShifts,
      n: 'The frontier shifts when resources or technology change. If resources increase or technology improves, the frontier shifts to the right, and the economy can produce more of both goods. When a flood or earthquake wipes out resources, the frontier moves to the left. These shifts show growth and loss of capacity.',
    }),
    sl('concept', 'Rotation of the frontier', {
      b: 'When technology improves for **one good only**, the frontier **rotates**: that good\'s intercept moves out, and the other stays the same.',
      v: vRot,
      n: 'If technology improves only for cloth, the economy can make more cloth when it makes no wheat. But it can still make the same amount of wheat when it makes no cloth. So the frontier swings outward on the cloth axis, and the wheat end stays where it was. This is a rotation, not a parallel shift.',
    }),
    sl('example', 'Worked example 3: gain from growth', {
      b: `After growth, Tarvania's frontier is farther out. Find the gain in cloth capacity at ${UX} lakh tonnes of wheat.`,
      bl: [
        `Step 1 — New frontier at ${UX} lakh tonnes of wheat: **${fOut(UX)}** thousand metres.`,
        `Step 2 — Old frontier at ${UX} lakh tonnes of wheat: **${f1(UX)}** thousand metres.`,
        `Step 3 — Gain = ${fOut(UX)} − ${f1(UX)} = **${gainOut}** thousand metres.`,
      ],
      v: tGain,
      n: 'At two lakh tonnes of wheat, the new frontier allows one hundred sixty eight thousand metres of cloth, while the old one allowed one hundred twenty. The gain is forty eight thousand metres. The table shows that the gain differs at each level of wheat, because the new frontier lies farther out everywhere.',
    }),
    sl('check', 'Quick check: inside the frontier', {
      b: 'Decide where an imagined combination lies.',
      chk: 'm_inside',
      n: 'Find the cloth that the frontier allows at the given wheat output. Compare it with the cloth actually produced. If the economy makes less than the frontier allows, the point lies inside. If it makes more, the point lies outside.',
    }),
    sl('concept', 'The frontier and the central problems', {
      b: 'The frontier shows **what to produce** as a choice of point, **efficiency** as a point on the curve, **opportunity cost** as a move along it, and **growth** as a shift outward.',
      v: tCentralPPF,
      n: 'The frontier puts the central ideas into one picture. Choosing a point on the curve is the problem of what to produce. Being inside the curve shows wasted resources. Moving along the curve shows opportunity cost. A shift outward shows growth. How to produce and for whom to produce are not shown directly.',
    }),
    sl('check', 'Quick check: shift of the frontier', {
      b: 'Decide how an earthquake affects the frontier.',
      chk: 'm_shift_in',
      n: 'Think about what the disaster does to the resources of the economy. Does it add to them, leave them as they are or reduce them? Then decide whether the maximum possible output of both goods rises or falls, and choose the shift that matches.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To recap. The central problems are what, how and for whom to produce. Opportunity cost is the next best alternative given up. The frontier shows the combinations of two goods producible with given resources and technology. The marginal rate of transformation rises, so the frontier is concave. Points on it are efficient, inside is underuse and outside is unattainable. Shifts show growth or loss.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'State the **three central problems** with one example of each.',
        'Compute **MRT = ΔY ÷ ΔX** step by step, and say whether it **rises**.',
        'Explain concavity with **increasing marginal opportunity cost**, not just the shape.',
        'For a point, compare it with the frontier: **on, inside or outside**.',
        'Name the cause of each shift: **growth, destruction or one-sided technology**.',
      ],
      n: 'Some tips. State the three central problems and give an example of each. When you compute the marginal rate of transformation, divide the fall in one good by the rise in the other and show each step, then say whether it rises. Explain the concave shape using increasing marginal opportunity cost. For a point, compare it with the frontier. Name the cause of each shift.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Introduction to Microeconomics — Notes',
  sections: [
    {
      h: '1. Scarcity and choice',
      t: 1,
      b: `**Economics** studies how society allocates scarce resources among alternative uses to satisfy wants. **Scarcity** means that resources are limited relative to wants. Because resources have alternative uses, using them in one way means giving up another use, so a **choice** must be made.\n\nThe value of the next best alternative given up is the **opportunity cost** of a choice. For the imagined farmer Dilbag of Bhavpur, who grows sugarcane worth ${inr(FARM[0][1])} when paddy would give ${inr(FARM[1][1])} and vegetables ${inr(FARM[2][1])}, the opportunity cost is ${inr(farmOC)}, the income from paddy.`,
      terms: [
        ['Economics', 'The study of how society allocates scarce resources among alternative uses to satisfy wants.'],
        ['Scarcity', 'The limited availability of resources compared with the wants to be satisfied.'],
        ['Opportunity cost', 'The value of the next best alternative forgone when a choice is made.'],
      ],
      v: vChoice,
      vs: [tFarm],
    },
    {
      h: '2. Microeconomics and macroeconomics',
      t: 1,
      b: '**Microeconomics** studies the behaviour of individual units: a consumer, a producer or a single market, for example how the price of one product is determined. **Macroeconomics** studies the economy as a whole: national income, total employment, total output and the general price level.',
      terms: [
        ['Microeconomics', 'The branch of economics that studies individual economic units such as a consumer, a producer or a market.'],
        ['Macroeconomics', 'The branch of economics that studies the economy as a whole, through aggregates such as national income, total employment and the general price level.'],
      ],
      v: vMM,
      vs: [tMMtopics],
    },
    {
      h: '3. Positive and normative economics',
      t: 1,
      b: '**Positive economics** deals with what is. Its statements can be tested against facts and may be true or false. **Normative economics** deals with what ought to be. Its statements rest on value judgements and cannot be settled by facts alone. A sound policy decision uses both: positive analysis for the facts and normative judgement for the goals.',
      terms: [
        ['Positive economics', 'The part of economics that deals with what is, through statements that can be tested against facts.'],
        ['Normative economics', 'The part of economics that deals with what ought to be, through statements that rest on value judgements.'],
      ],
      v: tPos,
      vs: [tNorm, tClass2],
    },
    {
      h: '4. Types of economy',
      t: 1,
      b: 'In a **centrally planned economy** the government or central authority decides what, how and for whom to produce, through a plan. In a **market economy** these decisions are taken by buyers and sellers through markets and prices. A **mixed economy** combines the two: private firms and the government both take part in production. Every economy must solve the same central problems; the types differ in who takes the decisions.',
      terms: [
        ['Centrally planned economy', 'An economy in which a central authority takes the main decisions on production and distribution through a plan.'],
        ['Market economy', 'An economy in which production and distribution are decided by buyers and sellers through markets and prices.'],
        ['Mixed economy', 'An economy in which both the private sector and the government take part in economic activity.'],
      ],
      v: tTypes,
      vs: [tScen],
    },
    {
      h: '5. Central problems of an economy',
      t: 2,
      b: `Scarcity gives rise to three central problems.\n\n**What to produce, and in what quantities:** the choice of goods and how much of each.\n\n**How to produce:** the choice of technique, **labour-intensive** (more labour) or **capital-intensive** (more machines). The imagined harvest of Dilbag costs ${inr(labCost)} with workers and ${inr(hvCost)} with a machine.\n\n**For whom to produce:** the distribution of output among the members of the economy.`,
      terms: [
        ['Labour-intensive technique', 'A technique of production that uses relatively more labour than capital.'],
        ['Capital-intensive technique', 'A technique of production that uses relatively more capital than labour.'],
      ],
      v: vCentral,
      vs: [tHow, tTech],
    },
    {
      h: '6. The production possibility frontier',
      t: 2,
      b: `The **production possibility frontier** (also called the production possibility curve) shows the combinations of two goods that an economy can produce with given resources and technology, when the resources are fully and efficiently used. It assumes fixed resources, given technology, full and efficient use, and resources that are not equally efficient in producing both goods.\n\nPoints **on** the curve are efficient. Points **inside** show unemployment or inefficient use of resources: at ${UX} lakh tonnes of wheat the imagined Tarvania frontier gives ${f1(UX)} thousand metres of cloth, so ${UY} is inside by ${idle}. Points **outside** are unattainable.`,
      terms: [
        ['Production possibility frontier', 'The curve showing the combinations of two goods that an economy can produce with given resources and technology, using them fully and efficiently.'],
      ],
      v: vPPF,
      vs: [tSched, tPoints],
    },
    {
      h: '7. Marginal rate of transformation and shifts',
      t: 2,
      b: `The **marginal rate of transformation (MRT)**, or marginal opportunity cost, is the units of one good given up to produce one more unit of the other: **MRT = ΔY ÷ ΔX**. For Tarvania the rates are ${J(P1.mrt)}, rising along the frontier. The frontier is **concave to the origin** because the marginal opportunity cost rises: resources are not equally efficient in producing both goods.\n\nThe frontier shifts **right** with more resources or better technology (growth), **left** with destruction of resources such as an earthquake or flood, and **rotates** when technology improves for one good only. The frontier can also illustrate unemployment (a point inside), growth (a shift) and the central problems.`,
      terms: [
        ['Marginal rate of transformation', 'The units of one good that must be given up to produce one more unit of the other good, ΔY ÷ ΔX.'],
        ['Marginal opportunity cost', 'Another name for the marginal rate of transformation.'],
      ],
      v: vMRT,
      vs: [tMRTwork, vShifts, vRot],
    },
  ],
  tips: '- Define **scarcity**, **opportunity cost** and the **production possibility frontier** in standard words.\n- Give an **example** of each branch (micro, macro) and of each statement type (positive, normative).\n- A positive statement can be **false**; a normative statement uses a **value judgement**.\n- Describe each type of economy by **who decides**.\n- Compute **MRT = ΔY ÷ ΔX** with every step, and state that it **rises**.\n- Explain concavity by **increasing marginal opportunity cost**.\n- For a shift, name the **cause** and the **direction**.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Economics**', 'The study of how society allocates scarce resources among alternative uses to satisfy wants.', 'definition', 1],
  ['**Scarcity**', 'The limited availability of resources compared with the wants to be satisfied.', 'definition', 1],
  ['Why is **choice** unavoidable?', 'Resources are limited, wants are many and resources have alternative uses.', 'concept', 1],
  ['**Opportunity cost**', 'The value of the next best alternative forgone when a choice is made.', 'definition', 2],
  ['**Microeconomics**', 'The study of individual economic units such as a consumer, a producer or a market.', 'definition', 1],
  ['**Macroeconomics**', 'The study of the economy as a whole: national income, total employment and the general price level.', 'definition', 1],
  ['Two **micro** topics', 'The price of one product in a market; the demand of one household.', 'concept', 1],
  ['Two **macro** topics', 'National income; the general price level (or total employment).', 'concept', 1],
  ['**Positive economics**', 'Deals with what is; statements can be tested against facts.', 'definition', 1],
  ['**Normative economics**', 'Deals with what ought to be; statements rest on value judgements.', 'definition', 1],
  ['Can a **positive** statement be false?', 'Yes. It is positive because it can be tested, not because it is true.', 'concept', 1],
  ['Words that mark a **normative** statement', 'Should, ought, unfair, better: they express a judgement.', 'concept', 1],
  ['**Centrally planned economy**', 'The government or a central authority takes the main decisions through a plan.', 'definition', 1],
  ['**Market economy**', 'Decisions are taken by buyers and sellers through markets and prices.', 'definition', 1],
  ['**Mixed economy**', 'Private firms and the government both take part in economic activity.', 'definition', 1],
  ['The **three central problems**', 'What to produce, how to produce, for whom to produce.', 'concept', 2],
  ['**What to produce**', 'The choice of goods and services and the quantity of each.', 'concept', 2],
  ['**How to produce**', 'The choice of technique: labour-intensive or capital-intensive.', 'concept', 2],
  ['**For whom to produce**', 'The distribution of output among the members of the economy.', 'concept', 2],
  ['**Labour-intensive** technique', 'A technique that uses relatively more labour than capital.', 'definition', 2],
  ['**Capital-intensive** technique', 'A technique that uses relatively more capital than labour.', 'definition', 2],
  ['**Production possibility frontier**', 'The combinations of two goods an economy can produce with given resources and technology, fully and efficiently used.', 'definition', 2],
  ['Assumptions of the **frontier**', 'Fixed resources, given technology, full and efficient use, resources not equally efficient in both goods.', 'concept', 2],
  ['A point **on** the frontier', 'Efficient: resources are fully used.', 'concept', 2],
  ['A point **inside** the frontier', 'Attainable but resources are unemployed or used inefficiently.', 'concept', 2],
  ['A point **outside** the frontier', 'Unattainable with the given resources and technology.', 'concept', 2],
  ['**Marginal rate of transformation**', 'The units of one good given up to produce one more unit of the other: ΔY ÷ ΔX.', 'formula', 2],
  ['Why is the frontier **concave** to the origin?', 'The marginal opportunity cost rises because resources are not equally efficient in both goods.', 'concept', 2],
  ['When is the frontier a **straight line**?', 'When the marginal opportunity cost is constant, as if resources were equally efficient in both goods.', 'concept', 2],
  ['Frontier shifts **right** when', 'Resources increase or technology improves: economic growth.', 'concept', 2],
  ['Frontier shifts **left** when', 'Resources are destroyed, for example by an earthquake or flood.', 'concept', 2],
  ['Frontier **rotates** when', 'Technology improves for one good only: one intercept moves, the other stays.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Introduction to Microeconomics',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_scarcity', 'm_ppf_def', 'm_oc_farmer', 'ar_concave'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_mm', 's2_oc', 's3_types'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_ppf', 'l_shifts'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_kelvaria'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Introduction to Microeconomics',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_econ_def', 'm_macro_ex', 'm_norm_class', 'm_planned', 'm_forwhom', 'm_concave', 'm_mrt_rise', 'm_rotation', 'ar_shift', 'ar_positive'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_scarcity', 's2_pos_norm', { attempt: 1, keys: ['s2_ppf_def', 's2_assump'] }, 's3_mrt_calc', { attempt: 1, keys: ['s3_concave', 's3_shift'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_econ_types', { attempt: 1, keys: ['l_central', 'l_ppf_points'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_lumeria', 'cb_bhavpur'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-11-economics-ch08 only (scarcity and choice, micro and macro, positive and normative, types of economy, central problems, opportunity cost, production possibility frontier, marginal rate of transformation, shifts)',
    originality: 'every economy, town, farmer, firm and statement is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all opportunity costs, marginal rates, idle capacity, growth gains and technique costs computed from imagined schedules with stats.mjs or plain code and asserted with check(); every SVG is drawn from the same schedules and functions',
    facts: 'only stable textbook definitions are stated: scarcity, opportunity cost, micro and macro, positive and normative, the three types of economy, the three central problems, the frontier and its assumptions, MRT = ΔY ÷ ΔX, concavity from rising marginal opportunity cost, shifts and rotation',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
