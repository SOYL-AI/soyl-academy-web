// Build ISC 12 Economics ch08 Concepts of Cost. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch08/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
// Removed topic (ISC 2027): derivation of long-run and short-run cost curves — taught here as concepts only.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch08', 'economics-commerce');
const {
  MUG, mugMC, mugAVC, mugAC, mugAFC, MUG_SCHED, MUG_ACMIN_Q, PICKLE, PICKLE_TC, BELL, BELL_SCHED, KITE_SCHED,
  BAKERY, BAKERY_ACC, BAKERY_IMPLICIT, BAKERY_ECON, CROP, CROP_OC_COTTON, DYE, DYE_SOCIAL,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };
const fmtIN = (n) => n.toLocaleString('en-IN');
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- SVG figures (cost on the y-axis, output on the x-axis)
function frame(xMax, yMax, xLabel, yLabel, w = 500, h = 390) {
  const s = new Svg(w, h);
  const c = s.chart({ x1: xMax, y1: yMax, left: 70, top: 34, width: w - 160, height: h - 100, xLabel, yLabel });
  return { s, c };
}

// Total cost curves of the imagined Khurja mug unit.
const vTotals = (() => {
  const { s, c } = frame(10, 540, 'Output (hundred mugs)', 'Cost (₹ hundred)');
  c.seg([0, MUG.tfc], [10, MUG.tfc], { color: 'muted', sw: 2.2 });
  c.fn(MUG.tvc, 0, 10, { color: 'blue', sw: 2.6 });
  c.fn((q) => MUG.tvc(q) + MUG.tfc, 0, 10, { color: 'accent', sw: 2.6 });
  assert(MUG.tvc(10) === 400 && MUG.tvc(10) + MUG.tfc === 520, 'totals end points');
  c.dot([0, MUG.tfc], 'accent');
  c.yTick(MUG.tfc, String(MUG.tfc));
  c.label([10, MUG.tfc], 'TFC', { anchor: 'end', dy: -12, color: 'muted', bold: true });
  c.label([10, 400], 'TVC', { anchor: 'start', dx: 8, color: 'blue', bold: true });
  c.label([10, 520], 'TC', { anchor: 'start', dx: 8, color: 'accent', bold: true });
  return s.visual(
    'Total cost curves of an imagined Khurja mug unit: total fixed cost is a horizontal line at 120; total variable cost starts at the origin, rises at a falling rate and then at a rising rate, reaching 400 at an output of 10; total cost has the same shape but starts at 120 on the cost axis and stays 120 above total variable cost',
    'Imagined figures: TC = TFC + TVC, so TC runs parallel to TVC, TFC above it.',
  );
})();

// Average and marginal cost curves: MC cuts AVC at its minimum (6, 24) and AC at its minimum near 7.2.
const MUG_ACMIN = mugAC(MUG_ACMIN_Q);
const vAverages = (() => {
  const { s, c } = frame(10, 110, 'Output (hundred mugs)', 'Cost per unit (₹ hundred)', 520, 400);
  c.fn(mugAFC, 1.3, 10, { color: 'muted', sw: 2.2 });
  c.fn(mugAVC, 1, 10, { color: 'blue', sw: 2.6 });
  c.fn(mugAC, 2.2, 10, { color: 'accent', sw: 2.6 });
  c.fn(mugMC, 1.4, 9.1, { color: 'green', sw: 2.6 });
  assert(mugAVC(6) === 24 && mugMC(6) === 24 && Math.abs(mugMC(MUG_ACMIN_Q) - MUG_ACMIN) < 1e-9, 'average minima');
  c.dot([6, 24], 'blue').dot([MUG_ACMIN_Q, MUG_ACMIN], 'accent');
  c.label([6, 24], 'A', { dx: 0, dy: 16, bold: true });
  c.label([MUG_ACMIN_Q, MUG_ACMIN], 'B', { dx: -14, dy: -10, bold: true });
  c.xTick(4, '4').xTick(6, '6');
  c.label([9.1, mugMC(9.1)], 'MC', { anchor: 'start', dx: 8, color: 'green', bold: true });
  c.label([10, mugAC(10)], 'AC', { anchor: 'start', dx: 8, dy: -6, color: 'accent', bold: true });
  c.label([10, mugAVC(10)], 'AVC', { anchor: 'start', dx: 8, dy: 8, color: 'blue', bold: true });
  c.label([10, mugAFC(10)], 'AFC', { anchor: 'start', dx: 8, color: 'muted', bold: true });
  return s.visual(
    `Average and marginal cost curves of an imagined Khurja mug unit: average fixed cost falls continuously; marginal cost falls to its lowest point at an output of 4 and then rises; it cuts average variable cost at its lowest point A (output 6, cost 24) and average cost at its lowest point B (output about ${r1(MUG_ACMIN_Q)}, cost about ${r1(MUG_ACMIN)}). The gap between average cost and average variable cost narrows as output rises`,
    'Imagined figures: MC turns up first, then cuts AVC and AC at their lowest points.',
  );
})();

// AFC as a rectangular hyperbola: AFC × Q = 120 at every point.
const vAFC = (() => {
  const { s, c } = frame(10, 130, 'Output (hundred mugs)', 'AFC (₹ hundred)');
  c.fn(mugAFC, 1, 10, { color: 'accent', sw: 2.6 });
  for (const q of [2, 4, 8]) {
    assert(q * mugAFC(q) === MUG.tfc, 'afc area');
    c.dot([q, mugAFC(q)], 'accent');
    c.drop([q, mugAFC(q)]);
    c.yTick(mugAFC(q), String(mugAFC(q)));
    c.xTick(q, String(q));
  }
  c.label([10, mugAFC(10)], 'AFC', { anchor: 'start', dx: 8, dy: -6, color: 'accent', bold: true });
  return s.visual(
    'Average fixed cost curve of an imagined Khurja mug unit with a fixed cost of 120: at outputs 2, 4 and 8 it is 60, 30 and 15, so each rectangle under the curve has the same area of 120. The curve keeps falling towards the output axis but never touches it',
    'AFC × output = TFC at every point: a rectangular hyperbola.',
  );
})();

// Long-run AC as the envelope of three short-run AC curves (schematic; concepts only, no derivation).
const lac = (q) => 20 + 0.08 * (q - 10) ** 2;
const sac = (q0) => (q) => lac(q) + 0.5 * (q - q0) ** 2;
const vEnvelope = (() => {
  const { s, c } = frame(20, 42, 'Output', 'Average cost (₹)', 520, 400);
  const plants = [[4, 1.4, 7.2], [10, 6.4, 13.6], [16, 12.8, 18.8]];
  plants.forEach(([q0, a, b], i) => {
    assert(Math.abs(sac(q0)(q0) - lac(q0)) < 1e-12 && sac(q0)(a) <= 42 && sac(q0)(b) <= 42, 'sac in view');
    c.fn(sac(q0), a, b, { color: 'blue', sw: 2.2 });
    c.dot([q0, lac(q0)], 'accent');
    c.label([b, sac(q0)(b)], `SAC${i + 1}`, { anchor: 'start', dx: 4, size: 12, color: 'blue', bold: true });
  });
  c.fn(lac, 0.5, 19.5, { color: 'accent', sw: 2.8 });
  c.label([19.5, lac(19.5)], 'LAC', { anchor: 'end', dy: 14, color: 'accent', bold: true });
  return s.visual(
    'Schematic diagram of three U-shaped short-run average cost curves, one for each plant size, and a flatter U-shaped long-run average cost curve below them that touches each short-run curve at one point. The long-run curve wraps around the short-run curves like an envelope',
    'Concept only (no derivation): the LAC is the envelope of the SACs.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vExplicitImplicit = table(
  ['', 'Explicit cost', 'Implicit cost'],
  [
    ['Meaning', 'Actual payment to outsiders', 'Imputed value of the owner\'s own factors'],
    ['Imagined Bhopal tailor', 'Cloth, thread, assistant\'s wage', 'Rent of her own shop, her forgone salary'],
    ['In the account books?', 'Yes', 'No'],
    ['Counted by economists?', 'Yes', 'Yes'],
  ],
  'Table comparing explicit and implicit costs: explicit costs are payments to outsiders and appear in the books; implicit costs are the imputed value of the owner\'s own factors and are counted by economists but not by accountants',
);
const vSocial = flow(
  'LR',
  ['Private cost borne by the firm', 'External cost borne by others (pollution, noise, congestion)', 'Social cost to society as a whole'],
  'Flow showing social cost as the private cost borne by the firm plus the external cost it imposes on others such as pollution, noise or congestion',
  `Imagined Pali dyeing unit: ₹${fmtIN(DYE.privateCost)} + ₹${fmtIN(DYE.damage)} = ₹${fmtIN(DYE_SOCIAL)}`,
);
const vMoneyReal = table(
  ['Concept', 'What it measures', 'Imagined Kolhapur jaggery unit'],
  [
    ['Money cost', 'Rupee spending on inputs and hired factors', 'Cane, fuel, helpers\' wages'],
    ['Real cost', 'Toil, risk and sacrifice of factor owners', 'The family\'s nights at the boiling pans'],
    ['Economic cost', 'Explicit plus implicit costs', 'Payments plus the family\'s forgone income'],
  ],
  'Table of money cost, real cost and economic cost with examples from an imagined jaggery unit: rupee spending, the toil and sacrifice of the people involved, and explicit plus implicit costs',
);
const vBakeryWork = table(
  ['Step', 'Working (₹ a month)', 'Result'],
  [
    ['Accounting profit', `${fmtIN(BAKERY.revenue)} − ${fmtIN(BAKERY.explicit)}`, fmtIN(BAKERY_ACC)],
    ['Implicit costs', `${fmtIN(BAKERY.forgoneSalary)} salary + ${fmtIN(BAKERY.forgoneRent)} rent`, fmtIN(BAKERY_IMPLICIT)],
    ['Economic profit', `${fmtIN(BAKERY_ACC)} − ${fmtIN(BAKERY_IMPLICIT)}`, fmtIN(BAKERY_ECON)],
  ],
  `Worked example for an imagined Kozhikode bakery: accounting profit ${fmtIN(BAKERY_ACC)} rupees, implicit costs ${fmtIN(BAKERY_IMPLICIT)}, economic profit ${fmtIN(BAKERY_ECON)}`,
  'Imagined figures: economic profit = accounting profit − implicit costs.',
);
assert(BAKERY_ACC - BAKERY_IMPLICIT === BAKERY_ECON, 'bakery work');
const vCropWork = table(
  ['Use of the land for one season', 'Income (₹)', 'Rank'],
  [['Cotton', fmtIN(CROP.cotton), 'Chosen'], ['Soybean', fmtIN(CROP.soybean), 'Next best'], ['Lease to a neighbour', fmtIN(CROP.lease), 'Third']],
  `Worked example: an imagined Vidarbha farmer can earn ${fmtIN(CROP.cotton)} rupees from cotton, ${fmtIN(CROP.soybean)} from soybean or ${fmtIN(CROP.lease)} from leasing; the opportunity cost of cotton is the next best alternative, ${fmtIN(CROP_OC_COTTON)}`,
  `Opportunity cost of cotton = next best alternative = ₹${fmtIN(CROP_OC_COTTON)}`,
);
const vFixedVariable = table(
  ['', 'Fixed cost', 'Variable cost'],
  [
    ['Changes with output?', 'No', 'Yes'],
    ['At zero output', 'Still paid', 'Zero'],
    ['Imagined Haldwani juice plant', 'Shed rent, loan interest, manager\'s salary', 'Fruit, bottles, power, daily wages'],
    ['Exists in the long run?', 'No', 'Yes (all costs)'],
  ],
  'Table comparing fixed and variable costs: fixed costs do not change with output and are paid even at zero output; variable costs change with output and are zero when nothing is produced; in the long run all costs are variable',
);
const vFormulas = table(
  ['Cost', 'Formula', 'Shape'],
  [
    ['TC', 'TFC + TVC', 'Starts at TFC; parallel to TVC'],
    ['AFC', 'TFC ÷ Q', 'Rectangular hyperbola'],
    ['AVC', 'TVC ÷ Q', 'U-shaped'],
    ['AC', 'TC ÷ Q = AFC + AVC', 'U-shaped, minimum to the right of AVC'],
    ['MC', 'TCn − TCn−1 = TVCn − TVCn−1', 'U-shaped, turns up first'],
  ],
  'Table of short-run cost formulas and shapes: total cost is fixed plus variable cost; average fixed cost is fixed cost over output; average variable cost is variable cost over output; average cost is total cost over output; marginal cost is the change in total cost from one more unit',
);
const vPickleSched = table(
  ['Jars', 'TC', 'TVC', 'AFC', 'AVC', 'AC', 'MC'],
  PICKLE.map((row) => [String(row.q), String(row.tc), String(row.tvc), row.afc ?? '—', row.avc ?? '—', row.ac ?? '—', row.mc ?? '—'].map(String)),
  `Completed cost schedule of an imagined Guntur pickle kitchen with a fixed cost of 60 rupees: total costs ${PICKLE_TC.join(', ')} for 0 to 5 jars, with total variable, average fixed, average variable, average and marginal costs worked out`,
  'Imagined figures, ₹ a day.',
);
const vBellSched = table(
  ['Bells', 'AVC', 'TVC = AVC × Q', 'TC', 'MC'],
  BELL_SCHED.slice(1).map((row) => [String(row.q), String(row.avc), String(row.tvc), String(row.tc), String(row.mc)]),
  `Cost schedule of an imagined Moradabad bell workshop with a fixed cost of ${BELL.tfc} rupees: from average variable costs ${BELL.avc.join(', ')} the variable costs, total costs and marginal costs follow`,
  'Imagined figures: TVC from AVC × Q, then MC.',
);
const vRules = table(
  ['When…', 'Then the average…'],
  [['MC is below it', 'falls'], ['MC equals it', 'is at its minimum'], ['MC is above it', 'rises']],
  'Table of the marginal–average rule: when marginal cost is below an average, the average falls; when equal, the average is at its minimum; when above, the average rises',
  'The rule holds for both AVC and AC.',
);
const vSRLR = table(
  ['', 'Short run', 'Long run'],
  [
    ['Factors', 'At least one fixed (plant)', 'All variable'],
    ['Costs', 'Fixed and variable', 'All variable'],
    ['AC curve', 'SAC: steeper U', 'LAC: flatter U, envelope of SACs'],
    ['Reason for U-shape', 'Law of variable proportions', 'Economies, then diseconomies of scale'],
  ],
  'Table comparing the short run and the long run: in the short run at least one factor and some costs are fixed and the average cost curve is a steeper U because of the law of variable proportions; in the long run all costs are variable and the long-run average cost curve is a flatter U, the envelope of short-run curves, because of economies and diseconomies of scale',
);
const vMugSched = table(
  ['Output', 'TVC', 'AVC', 'MC'],
  MUG_SCHED.slice(3, 9).map((row) => [String(row.q), String(row.tvc), String(row.avc), String(row.mc)]),
  'Part of the cost schedule of an imagined Khurja mug unit for outputs 3 to 8 hundred mugs: average variable cost falls to 24 at output 6 and then rises, while marginal cost is below it before output 6 and above it after',
  'Imagined figures, ₹ hundred.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Explicit vs implicit', 'Payments made vs value of own factors'],
    ['Private vs social', 'Social = private + external cost'],
    ['Opportunity cost', 'Value of the next best alternative'],
    ['Fixed vs variable', 'Fixed at zero output; variable changes with output'],
    ['Total costs', 'TC = TFC + TVC; TFC flat, TVC from the origin'],
  ],
  'Summary table of Part 1: explicit and implicit costs, private and social costs, opportunity cost, fixed and variable costs, and the total cost curves',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Averages', 'AFC falls; AVC and AC U-shaped'],
    ['Marginal cost', 'Change in TC from one more unit'],
    ['MC and averages', 'MC cuts AVC and AC at their minima'],
    ['AC − AVC', 'Equals AFC; narrows, never closes'],
    ['Long run', 'All costs variable; LAC envelopes SACs'],
  ],
  'Summary table of Part 2: average costs, marginal cost, the rule linking marginal and average cost, the gap between average cost and average variable cost, and long-run costs',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Concepts of Cost — Part 1: Kinds of Cost and Total Costs',
  goals: [
    'Distinguish explicit and implicit, private and social, money and real costs',
    'Explain opportunity cost and compare accounting and economic profit',
    'Distinguish fixed and variable costs and describe the total cost curves',
  ],
  slides: [
    sl('title', 'Concepts of Cost', {
      b: 'Part 1 — the **kinds of cost** an economist counts, **opportunity cost**, and the **total cost curves** of the short run.',
      v: flow('LR', ['Explicit and implicit', 'Private and social', 'Money, real, economic', 'Opportunity cost', 'Fixed and variable', 'Total cost curves'], 'Route map of Part 1: explicit and implicit cost, private and social cost, money, real and economic cost, opportunity cost, fixed and variable cost, and the total cost curves', 'Part 1 at a glance'),
      n: 'A bakery, a dyeing unit and a farmer all face costs. But an accountant and an economist do not count cost in the same way. In this part we sort costs into kinds, meet the idea of opportunity cost, and then look at how total cost changes with output in the short run.',
    }),
    sl('two-column', 'Explicit and implicit costs', {
      cols: [
        '**Explicit costs** are **actual payments** to outsiders: wages, raw materials, rent paid to a landlord.',
        '**Implicit costs** are the **imputed value** of the owner\'s **own** factors: her own shop, savings and time.',
      ],
      v: vExplicitImplicit,
      n: 'Some costs are paid out in money to other people. These are explicit costs, and they appear in the account books. Others are the value of things the owner supplies herself, such as her own shop or her own time. No payment is made, so accountants leave them out, but economists count them as implicit costs.',
    }),
    sl('check', 'Quick check: what counts as economic cost?', {
      b: 'For an economist judging an imagined Indore sweet shop, economic cost equals…',
      chk: 'm_economic_cost',
      n: 'Think about both kinds of cost you have just met. Does the economist leave either of them out?',
    }),
    sl('diagram', 'Private and social cost', {
      b: '**Social cost = private cost + external cost** borne by others who are not paid for it.',
      v: vSocial,
      n: 'A firm counts only the costs it bears itself: its private cost. But its production may harm others, for example through polluted water or smoke. That harm is an external cost. Add it to the private cost and you get the social cost, the full cost to society of producing the good.',
    }),
    sl('concept', 'Money, real and economic cost', {
      v: vMoneyReal,
      n: 'Money cost is what is spent in rupees. Real cost is the effort, risk and sacrifice of the people who supply the factors, like a family working through the night at a jaggery unit. Economic cost adds together the payments made and the value of the owners\' own factors, the explicit and implicit costs.',
    }),
    sl('concept', 'Opportunity cost', {
      b: '**Opportunity cost** is the value of the **next best alternative given up**.\n\n- Only the **best** forgone use counts, not all of them added up.\n- If a resource has **no other use**, its opportunity cost is **zero**.',
      v: flow('LR', ['Scarce resource', 'Several possible uses', 'Choose one', 'Next best use given up is the opportunity cost'], 'Flow showing that a scarce resource has several possible uses; choosing one means giving up the next best use, which is the opportunity cost', 'Every choice has a forgone alternative'),
      n: 'Resources are scarce, so using them one way means not using them another way. The opportunity cost of a choice is the value of the best alternative you give up. Notice the word best. We do not add up every alternative. And if something truly has no other use, choosing it costs nothing in this sense.',
    }),
    sl('example', 'Worked example 1: a farmer\'s choice', {
      b: 'An imagined Vidarbha farmer can grow **cotton**, grow **soybean** or **lease** his land for the season. What is the opportunity cost of growing cotton?',
      bl: ['Step 1 — List the alternatives and their incomes.', 'Step 2 — Leave out the chosen one (cotton).', 'Step 3 — Pick the highest remaining income: soybean.'],
      v: vCropWork,
      n: 'Write down every use of the land and what it would earn. Cotton is the choice, so set it aside. Of the remaining two, soybean pays more than leasing. So the opportunity cost of cotton is the soybean income of sixty-five thousand rupees, not the two alternatives added together.',
    }),
    sl('check', 'Quick check: is opportunity cost always money?', {
      b: 'True or false: opportunity cost exists only when the alternative given up can be measured in money.',
      chk: 'tf_oc_money',
      n: 'Think of a student who gives up an afternoon of rest. Is anything given up even if no money changes hands?',
    }),
    sl('example', 'Worked example 2: accounting and economic profit', {
      b: 'An imagined Kozhikode bakery: does the owner really profit after counting what she gives up?',
      bl: ['Step 1 — Accounting profit = revenue − explicit costs.', 'Step 2 — Add up implicit costs: forgone salary and rent.', 'Step 3 — Economic profit = accounting profit − implicit costs.'],
      v: vBakeryWork,
      n: 'The bakery takes in two lakh forty thousand rupees a month and pays out one lakh eighty-five thousand, so the accountant sees a profit of fifty-five thousand. But the owner gives up a salary and the rent of her own shop, fifty thousand together. Her economic profit is only five thousand rupees: still positive, but small.',
    }),
    sl('two-column', 'Fixed and variable costs', {
      cols: [
        '**Fixed costs** do **not change** with output and must be paid even at **zero** output: rent, loan interest, salaried staff.',
        '**Variable costs** **change** with output and are zero when nothing is produced: raw materials, power, daily wages.',
      ],
      v: vFixedVariable,
      n: 'In the short run some factors cannot be changed quickly, such as the plant itself. Their costs are fixed: they stay the same whatever the output and must be paid even if the plant stands idle. Other costs rise and fall with output. These are variable costs, and they are zero when nothing is produced.',
    }),
    sl('diagram', 'Total fixed, variable and total cost', {
      b: '**TC = TFC + TVC**. TFC is flat; TVC starts at the **origin**; TC starts at the **TFC level** and runs **parallel** to TVC.',
      v: vTotals,
      n: 'Here are the total costs of an imagined mug unit. Fixed cost is a flat line at one hundred and twenty. Variable cost starts at zero and rises, first at a falling rate and then at a rising rate. Total cost is the two added together, so it has the same shape as variable cost but sits one hundred and twenty higher.',
    }),
    sl('check', 'Quick check: the average fixed cost curve', {
      b: 'The average fixed cost curve of an imagined Bikaner bhujia unit falls continuously but never touches the output axis. This shape is called…',
      chk: 'm_afc_shape',
      n: 'Fixed cost divided by output: what happens to this as output grows, and can it ever reach zero?',
    }),
    sl('diagram', 'Average fixed cost: spreading the fixed cost', {
      b: 'AFC = TFC ÷ Q. As output grows the same fixed cost is **spread** over more units.',
      v: vAFC,
      n: 'Average fixed cost is fixed cost per unit. With a fixed cost of one hundred and twenty, it is sixty at an output of two, thirty at four and fifteen at eight. It keeps falling, but since the fixed cost never disappears, it never reaches zero. Such a curve is called a rectangular hyperbola.',
    }),
    sl('check', 'Quick check: reading a cost table', {
      b: 'From the Guntur pickle kitchen\'s total costs (fixed cost ₹60), what is the average variable cost of 5 jars?',
      chk: 'm_avc_read',
      n: 'First remove the fixed cost from total cost, then share what is left among the jars.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Explicit costs are payments made; implicit costs are the value of the owner\'s own factors. Social cost adds external harm to private cost. Opportunity cost is the best alternative given up. In the short run, fixed costs stay the same and variable costs change with output, and total cost is their sum.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always give an **example** with each cost concept; tie it to the firm named in the question.',
        'Opportunity cost = **next best** alternative only, never the sum of all alternatives.',
        'Economic profit = accounting profit − **implicit costs**; show both figures.',
        'TFC is **horizontal**, TVC starts at the **origin**, TC starts at **TFC** and stays parallel to TVC.',
        'AFC is a **rectangular hyperbola**: it never touches the output axis.',
      ],
      n: 'Examiners reward examples, so attach one to every concept. In opportunity cost questions, pick only the best alternative. When asked about profit, show the accounting figure and then subtract the implicit costs. When you draw total cost curves, check where each one starts. And remember that average fixed cost never reaches zero.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Concepts of Cost — Part 2: Average and Marginal Costs, Short Run and Long Run',
  goals: [
    'Calculate AFC, AVC, AC and MC from a cost schedule',
    'Explain the relationships among MC, AVC and AC and the narrowing gap between AC and AVC',
    'Describe the long-run average cost curve as an envelope of short-run curves (concepts only)',
  ],
  slides: [
    sl('title', 'Concepts of Cost, Part 2', {
      b: 'Part 2 — **average** and **marginal** costs, how they are related, and **short-run** versus **long-run** cost curves.',
      v: flow('LR', ['Average costs', 'Marginal cost', 'Completing a schedule', 'Marginal and average', 'U-shapes', 'Long-run costs'], 'Route map of Part 2: average costs, marginal cost, completing a schedule, the link between marginal and average cost, the U-shapes, and long-run costs', 'Part 2 at a glance'),
      n: 'Total cost tells us how much a whole batch costs. Firms also want to know the cost per unit and the cost of one more unit. In this part we work out average and marginal costs, see how they are linked, and then compare costs in the short run with costs in the long run.',
    }),
    sl('concept', 'Average and marginal costs', {
      v: vFormulas,
      n: 'Average fixed cost is fixed cost per unit. Average variable cost is variable cost per unit, and average cost is total cost per unit, which equals the two averages added. Marginal cost is different: it is the extra cost of producing one more unit, found as the change in total cost, or equally the change in variable cost.',
    }),
    sl('check', 'Quick check: meaning of marginal cost', {
      b: 'Marginal cost is the…',
      chk: 'm_mc_def',
      n: 'Is it a cost per unit of all units, or the cost of just one extra unit?',
    }),
    sl('example', 'Worked example 1: completing a schedule', {
      b: 'An imagined Guntur pickle kitchen has a fixed cost of ₹60 a day. Complete its schedule from total cost.',
      bl: ['Step 1 — TVC = TC − 60.', 'Step 2 — AFC = 60 ÷ Q, AVC = TVC ÷ Q, AC = TC ÷ Q.', 'Step 3 — MC = TC of this output − TC of the previous output.'],
      v: vPickleSched,
      n: 'Start by removing the fixed cost of sixty from each total cost to get variable cost. Divide by output to get the averages. For marginal cost, subtract the previous total cost. Notice that marginal cost falls to twenty at the third jar, equals average variable cost at the fourth, and then jumps to fifty.',
    }),
    sl('diagram', 'The average and marginal cost curves', {
      v: vAverages,
      n: 'Here are the four curves for the mug unit. Average fixed cost falls all the way. Marginal cost falls first and turns up at an output of four. It then cuts average variable cost at its lowest point, A, at six, and later cuts average cost at its lowest point, B, a little beyond seven.',
    }),
    sl('concept', 'The marginal–average rule', {
      b: 'An average is pulled **towards** the marginal value.',
      v: vRules,
      n: 'Think of a batting average. If your next score is below your average, the average falls. If it is above, the average rises. If it is equal, the average stays the same. Costs follow the same rule. So marginal cost must pass through the lowest point of average variable cost and of average cost.',
    }),
    sl('check', 'Quick check: can AC fall while MC rises?', {
      b: 'True or false: average cost can be falling at an output where marginal cost has already started rising.',
      chk: 'tf_mc_falling_ac',
      n: 'Remember the rule: what matters is whether marginal cost is below or above the average, not whether it is rising.',
    }),
    sl('example', 'Worked example 2: costs from average variable cost', {
      b: 'An imagined Moradabad bell workshop has a fixed cost of ₹90. From AVC, find TVC, TC and MC.',
      bl: ['Step 1 — TVC = AVC × Q.', 'Step 2 — TC = 90 + TVC.', 'Step 3 — MC = change in TVC.', 'Step 4 — Check: MC below AVC as AVC falls, above it as AVC rises.'],
      v: vBellSched,
      n: 'Multiply each average variable cost by output to get variable cost: thirty, fifty, sixty-six and ninety-six. Add the fixed cost of ninety to get total cost. Marginal cost is the change in variable cost. The fourth bell costs thirty, more than the average of twenty-two, which is why average variable cost rises at four bells.',
    }),
    sl('concept', 'Why AC and AVC come closer', {
      b: 'AC − AVC = **AFC**. As AFC falls, the two curves **approach** each other, but they **never meet**.',
      v: vMugSched,
      n: 'The vertical gap between average cost and average variable cost is average fixed cost. Since average fixed cost keeps falling as output rises, the two curves come closer and closer. But fixed cost never vanishes in the short run, so the gap never closes and the curves never meet.',
    }),
    sl('check', 'Quick check: which minimum comes first?', {
      b: 'For the Khurja mug unit, MC is lowest at Q = 4, AVC at Q = 6 and AC at about Q = 7.2. Which statement explains this order?',
      chk: 'm_mc_min_first',
      n: 'An average keeps falling as long as the marginal value stays below it. Which curve must turn up first?',
    }),
    sl('concept', 'Why the short-run curves are U-shaped', {
      bl: [
        '**AVC and MC** fall at first because of **increasing returns** to the variable factor, then rise because of **diminishing returns**: the **law of variable proportions**.',
        '**AC = AFC + AVC** falls while both fall, and rises once the **rise in AVC outweighs the fall in AFC**.',
      ],
      v: vMugSched,
      n: 'With the plant fixed, adding workers at first raises output fast, so each unit costs less. Later, crowding sets in and each extra unit costs more. This is the law of variable proportions, and it gives average variable cost and marginal cost their U-shape. Average cost turns up later, because falling fixed cost per unit holds it down for a while.',
    }),
    sl('two-column', 'Short run and long run', {
      cols: [
        '**Short run:** at least one factor, usually the **plant**, is **fixed**; costs are fixed and variable.',
        '**Long run:** **every** factor can change; **all costs are variable**; the firm chooses its plant size.',
      ],
      v: vSRLR,
      n: 'The short run is too short to change the size of the plant, so some costs stay fixed. In the long run the firm can build a larger or smaller plant, so every cost becomes variable and there is no fixed cost at all. The reasons for the shapes of the curves are different in each period.',
    }),
    sl('diagram', 'The long-run average cost curve: an envelope', {
      b: 'Each plant size has its own **SAC**. The **LAC** touches each SAC from **below** and wraps around them: the **envelope** or **planning** curve. (Concept only; no derivation.)',
      v: vEnvelope,
      n: 'Each plant size gives its own short-run average cost curve. In the long run the firm picks, for each output it plans, the plant that gives the lowest cost. The long-run curve joins these lowest costs and touches each short-run curve from below, like an envelope around them. It is flatter than any single short-run curve.',
    }),
    sl('check', 'Quick check: costs in long-run planning', {
      b: 'An imagined Haryana dairy can change its plant, land and staff over five years. In this long-run planning…',
      chk: 'm_lr_no_fixed',
      n: 'If every factor can be changed, is any cost still fixed?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Average fixed cost always falls, while average variable cost, average cost and marginal cost are U-shaped. Marginal cost turns up first and cuts both averages at their lowest points. The gap between average cost and average variable cost is average fixed cost. In the long run every cost is variable, and the long-run curve envelopes the short-run curves.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In schedules, write the **formula** before each column; MC uses the **previous** total cost.',
        'Given AVC, find TVC = AVC × Q first; given MC, add MCs to get TVC.',
        'Say **why** MC cuts AVC and AC at their minima, not only that it does.',
        'AC and AVC **never meet**: their gap is AFC.',
        'Long-run curves: **concepts only**; give economies and diseconomies of scale as the reason, not fixed costs.',
      ],
      n: 'In numerical questions, show the formula for each column so method marks are safe, and remember that marginal cost uses the previous total. If you are given averages or marginals, rebuild total variable cost first. For diagrams, explain the marginal and average rule. And for the long run, describe the envelope idea without trying to derive it.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Concepts of Cost — Notes',
  sections: [
    {
      h: '1. Kinds of cost',
      t: 1,
      b: '- **Explicit cost:** payment to outsiders (wages, materials, rent paid).\n- **Implicit cost:** imputed value of the owner\'s own factors (own shop, savings, time); not in the books.\n- **Economic cost** = explicit + implicit.\n- **Money cost:** rupee spending. **Real cost:** toil, risk and sacrifice of factor owners.\n- **Private cost:** cost borne by the firm. **Social cost** = private cost + **external cost** imposed on others.',
      terms: [['Implicit cost', 'The imputed value of factors owned and supplied by the firm\'s owner, for which no payment is made.'], ['Social cost', 'The total cost to society of producing a good: private cost plus external cost.']],
      v: vExplicitImplicit,
      vs: [vSocial, vMoneyReal],
    },
    {
      h: '2. Opportunity cost; accounting and economic profit',
      t: 2,
      b: '**Opportunity cost** = value of the **next best alternative** forgone. A resource with no alternative use has zero opportunity cost.\n\n**Accounting profit** = revenue − explicit costs. **Economic profit** = accounting profit − implicit costs. A firm can show an accounting profit yet make an economic loss.',
      terms: [['Opportunity cost', 'The value of the next best alternative given up when a resource is used in a particular way.'], ['Economic profit', 'Revenue minus explicit and implicit costs.']],
      v: vCropWork,
      vs: [vBakeryWork],
    },
    {
      h: '3. Short-run total costs',
      t: 3,
      b: '**TFC:** does not change with output; horizontal line; paid even at zero output.\n\n**TVC:** zero at zero output; rises first at a decreasing rate, then at an increasing rate.\n\n**TC = TFC + TVC:** same shape as TVC, starting at the TFC level; the vertical gap TC − TVC = TFC is constant.',
      terms: [['Fixed cost', 'Cost that does not vary with output in the short run.'], ['Variable cost', 'Cost that varies directly with output and is zero at zero output.']],
      v: vTotals,
      vs: [vFixedVariable],
    },
    {
      h: '4. Average and marginal costs',
      t: 3,
      b: '**AFC = TFC ÷ Q** (rectangular hyperbola). **AVC = TVC ÷ Q**. **AC = TC ÷ Q = AFC + AVC**. **MC = TCn − TCn−1 = TVCn − TVCn−1**; fixed cost does not affect MC.\n\nTo complete a schedule: from TC subtract TFC; from AVC multiply by Q; from MC add up successive values.',
      terms: [['Marginal cost', 'The addition to total cost from producing one more unit of output.'], ['Average cost', 'Total cost per unit of output; also called average total cost.']],
      v: vFormulas,
      vs: [vPickleSched, vBellSched, vAFC],
    },
    {
      h: '5. Relationships among MC, AVC and AC',
      t: 4,
      b: '- MC below an average → the average **falls**; MC equal → average at its **minimum**; MC above → average **rises**.\n- MC therefore cuts **AVC** and **AC** at their **lowest points**; MC reaches its own minimum **first**, then AVC, then AC.\n- AC − AVC = AFC, so the curves **approach** each other but **never meet**.\n- U-shapes in the short run come from the **law of variable proportions**.',
      terms: [['Law of variable proportions', 'With some factors fixed, adding a variable factor first raises and later lowers its marginal product, so costs first fall and then rise.']],
      v: vAverages,
      vs: [vRules, vMugSched],
    },
    {
      h: '6. Short-run and long-run cost curves (concepts only)',
      t: 5,
      b: 'In the **long run** all factors are variable, so **all costs are variable** and there is no AFC.\n\nEach plant size has its own **SAC**. The **LAC** shows the lowest average cost of each output when the best plant is chosen; it touches every SAC from below and is called the **envelope** or **planning curve**. It is **flatter** than any SAC and U-shaped because of **economies** and then **diseconomies of scale**. (Derivation of the curves is not required.)',
      terms: [['Envelope curve', 'The long-run average cost curve, which touches each short-run average cost curve from below.'], ['Economies of scale', 'Savings in average cost from a larger scale of production.']],
      v: vEnvelope,
      vs: [vSRLR],
    },
  ],
  tips: '**Common mistakes**\n- Adding all alternatives to find opportunity cost instead of taking the next best.\n- Leaving implicit costs out when asked for economic profit.\n- Starting the TC curve at the origin, or drawing TFC as rising.\n- Computing MC as TC ÷ Q, or subtracting the next total cost instead of the previous one.\n- Saying AFC becomes zero, or that AC and AVC meet.\n- Explaining the U-shape of the long-run AC by fixed costs.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, value or term.\n- 2 marks: definition with an example, or formula and answer.\n- 3 marks: working for several values, or three explained points.\n- 5 marks: parts answered in order, with completed schedules or described diagrams and reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Explicit cost**', 'An actual **payment** to outsiders for factors and inputs.', 'definition', 1],
  ['**Implicit cost**', 'The imputed value of the owner\'s **own** factors; not in the account books.', 'definition', 1],
  ['**Economic cost**', 'Explicit + implicit costs.', 'formula', 1],
  ['**Social cost**', 'Private cost + **external cost** borne by others.', 'formula', 1],
  ['Pali dyeing unit (imagined)', `₹${fmtIN(DYE.privateCost)} + ₹${fmtIN(DYE.damage)} = **₹${fmtIN(DYE_SOCIAL)}** social cost.`, 'example', 1],
  ['**Real cost**', 'The toil, risk and sacrifice of the owners of factors.', 'definition', 1],
  ['**Money cost**', 'Rupee spending on inputs and hired factors.', 'definition', 1],
  ['**Opportunity cost**', 'Value of the **next best alternative** given up.', 'definition', 2],
  ['A resource with no other use', 'Opportunity cost = **zero**.', 'fact', 2],
  ['Vidarbha farmer (imagined)', `Cotton chosen; next best soybean → opportunity cost **₹${fmtIN(CROP_OC_COTTON)}**.`, 'example', 2],
  ['**Economic profit**', 'Accounting profit − implicit costs.', 'formula', 2],
  ['Kozhikode bakery (imagined)', `Accounting ₹${fmtIN(BAKERY_ACC)} − implicit ₹${fmtIN(BAKERY_IMPLICIT)} = **₹${fmtIN(BAKERY_ECON)}**.`, 'example', 2],
  ['**Fixed cost**', 'Does not change with output; paid even at **zero** output.', 'definition', 3],
  ['**Variable cost**', 'Changes with output; **zero** at zero output.', 'definition', 3],
  ['Shape of TFC', 'A **horizontal** straight line.', 'fact', 3],
  ['Shape of TVC', 'Starts at the **origin**; rises first at a falling, then at a rising rate.', 'fact', 3],
  ['TC and TVC', 'TC = TFC + TVC; parallel curves, **TFC** apart.', 'concept', 3],
  ['**AFC**', 'TFC ÷ Q; a **rectangular hyperbola**; never zero.', 'formula', 3],
  ['**AVC** and **AC**', 'AVC = TVC ÷ Q; AC = TC ÷ Q = AFC + AVC.', 'formula', 3],
  ['**MC**', 'TCn − TCn−1 (= TVCn − TVCn−1).', 'formula', 3],
  ['Does fixed cost affect MC?', '**No**: only variable cost changes with one more unit.', 'fact', 3],
  ['Given AVC, find TVC', 'TVC = AVC × Q.', 'exam-tip', 3],
  ['Given MC, find TVC', 'Add the MCs of all units so far.', 'exam-tip', 3],
  ['MC below an average', 'The average **falls**.', 'concept', 4],
  ['MC above an average', 'The average **rises**.', 'concept', 4],
  ['Where MC cuts AVC and AC', 'At their **minimum** points.', 'fact', 4],
  ['Order of the minima', 'MC first, then AVC, then AC.', 'fact', 4],
  ['AC − AVC', 'Equals **AFC**: narrows as output rises; the curves never meet.', 'concept', 4],
  ['Long run', 'All factors variable; **all costs variable**; no AFC.', 'definition', 5],
  ['**LAC** as an envelope', 'Touches each SAC from below; flatter; U-shaped due to **scale economies and diseconomies**.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Concepts of Cost',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_explicit_rent', 'm_tfc_zero', 'm_mc_read', 'm_mc_cuts_avc', 'ar_mc_ac'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_fixed_variable', { attempt: 1, keys: ['s_explicit_implicit', 's_mc_avc'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_pickle_schedule', { attempt: 1, keys: ['s3_bakery_profit', 's3_ac_mc'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_schedule_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Concepts of Cost',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_implicit_own_shop', 'm_social_dye', 'm_oc_farmer', 'm_tfc_def', 'm_tc_parallel', 'm_afc_pt', 'm_ac_falls', 'm_gap_narrows', 'm_lac_envelope', 'm_lac_flatter', 'ar_social_private', 'ar_gap_meet'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_private_social', 's_acc_vs_econ_profit', { attempt: 1, keys: ['s_afc_never_zero', 's_sr_lr'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_bell_schedule', 's3_kite_schedule', 's3_money_real_economic', { attempt: 1, keys: ['s3_u_shape', 's3_envelope'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working or described diagrams.', items: ['l_relationship', { attempt: 1, keys: ['l_oc_full', 'l_curves_shapes'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch08 only (kinds of cost; opportunity cost and economic profit; short-run cost schedules and curves; relationships among MC, AVC and AC; short-run and long-run cost curves as concepts — derivation removed by ISC 2027)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs including tables, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every firm, person, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused',
    data: `figures computed in questions.mjs and asserted: Khurja mug unit TFC 120, TVC = Q³ − 12Q² + 60Q (AVC minimum 24 at Q = 6 where MC = AVC, MC minimum 12 at Q = 4, AC minimum near Q = ${r1(MUG_ACMIN_Q)}); Guntur pickle, Moradabad bell and Ahmedabad kite schedules; bakery economic profit ${BAKERY_ECON}; farmer opportunity cost ${CROP_OC_COTTON}; dyeing unit social cost ${DYE_SOCIAL}; SVG curves drawn from their equations`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
