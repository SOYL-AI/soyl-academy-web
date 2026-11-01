// Build ISC 12 Economics ch11 Aggregate Demand, Consumption and Saving. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch11/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch11', 'economics-commerce');
const {
  CBAR, B, cons, sav, BE, NP, HH, HH_S, HH_MPC, HH_APC, VIL, VIL_MPC, VIL_APC, VIL_S, VIL_MPS, NAV, NAV_AD, HOS, HOS_REAL,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };
const rd = (x) => Math.round(x * 1e6) / 1e6;
const MPS = rd(1 - B);

// ---------------------------------------------------------------- SVG figures
function frame(xMax, yMax, xLabel, yLabel, w = 500, h = 390) {
  const s = new Svg(w, h);
  const c = s.chart({ x1: xMax, y1: yMax, left: 70, top: 34, width: w - 160, height: h - 104, xLabel, yLabel });
  return { s, c };
}

// Consumption curve C = 90 + 0.7Y with the 45° line; break-even B at (300, 300).
const vCons = (() => {
  const { s, c } = frame(600, 600, 'Income (Y)', 'Consumption (C)');
  c.fn((y) => y, 0, 580, { color: 'muted', dash: true, sw: 1.6 });
  c.fn(cons, 0, 580, { color: 'accent', sw: 2.8 });
  c.dot([BE, BE], 'accent').drop([BE, BE]);
  c.xTick(BE, String(BE)).yTick(CBAR, String(CBAR)).yTick(BE, String(BE));
  c.label([580, 580], '45° line', { anchor: 'end', dx: -4, dy: -14, size: 12 });
  c.label([580, cons(580)], 'C', { anchor: 'start', dx: 8, color: 'accent', bold: true });
  c.label([BE, BE], 'B', { anchor: 'end', dx: -10, dy: -10, bold: true });
  c.label([120, 330], 'Dissaving: C above Y', { size: 12, muted: true });
  c.label([470, 200], 'Saving: C below Y', { size: 12, muted: true });
  assert(cons(120) > 120 && cons(470) < 470, 'regions');
  return s.visual(
    `Consumption curve of an imagined state, Neelgiri Pradesh, consumption equals ${CBAR} plus ${B} times income, drawn with a dashed 45-degree line. The curve starts at ${CBAR} on the vertical axis, is flatter than the 45-degree line and meets it at B, where income is ${BE}. To the left of B consumption is above income (dissaving); to the right it is below income (saving)`,
    `Imagined figures, ₹ crore: autonomous consumption ${CBAR}, slope (MPC) ${B}, break-even income ${BE}.`,
  );
})();

// Saving curve S = −90 + 0.3Y, drawn with the income axis at S = 0.
function savingFrame(xmax, ymin, ymax) {
  const s = new Svg(500, 380);
  const left = 70, top = 34, width = 340, height = 290;
  const X = (x) => left + (x / xmax) * width;
  const Y = (y) => top + height - ((y - ymin) / (ymax - ymin)) * height;
  s.arrow(X(0), Y(0), X(xmax) + 14, Y(0), { sw: 1.6 });
  s.line(X(0), top + height, X(0), Y(0), { sw: 1.6 });
  s.arrow(X(0), Y(0), X(0), top - 10, { sw: 1.6 });
  s.text(X(0) - 10, Y(0) + 14, 'O', { size: 13 });
  s.text(X(xmax) + 10, Y(0) + 24, 'Income (Y)', { anchor: 'end', size: 13 });
  s.text(X(0) + 8, top - 12, 'Saving (S)', { anchor: 'start', size: 13 });
  const fn = (g, a, b, o) => { const pts = []; for (let i = 0; i <= 40; i++) { const x = a + ((b - a) * i) / 40; pts.push([X(x), Y(g(x))]); } s.polyline(pts, o); };
  return { s, X, Y, fn };
}
const vSav = (() => {
  const { s, X, Y, fn } = savingFrame(600, -120, 120);
  fn(sav, 0, 580, { color: 'blue', sw: 2.8 });
  s.dot(X(BE), Y(0), 4, 'blue');
  s.text(X(BE) - 8, Y(0) - 14, 'B', { anchor: 'end', size: 13, bold: true });
  s.line(X(0) - 5, Y(-CBAR), X(0), Y(-CBAR), { sw: 1.2 });
  s.text(X(0) - 8, Y(-CBAR), `−${CBAR}`, { anchor: 'end', size: 12 });
  s.text(X(BE), Y(0) + 16, String(BE), { size: 12 });
  s.text(X(580), Y(sav(580)) - 14, 'S', { anchor: 'end', size: 13, color: 'blue', bold: true });
  s.text(X(150), Y(-100), 'negative saving', { size: 12, muted: true });
  s.text(X(470), Y(100), 'positive saving', { size: 12, muted: true });
  assert(sav(150) < 0 && sav(470) > 0 && Math.abs(sav(580) - 84) < 1e-9, 'saving regions');
  return s.visual(
    `Saving curve of imagined Neelgiri Pradesh, saving equals minus ${CBAR} plus ${MPS} times income: it starts at minus ${CBAR} when income is zero, rises with slope ${MPS} (the MPS), crosses the income axis at B where income is ${BE}, and is positive beyond it`,
    'The saving curve mirrors the consumption curve: S = Y − C.',
  );
})();

// APC = 0.7 + 90 ÷ Y falling towards MPC = 0.7.
const apc = (y) => B + CBAR / y;
const vApc = (() => {
  const { s, c } = frame(600, 1.8, 'Income (Y)', 'APC, MPC');
  c.fn(apc, 60, 590, { color: 'accent', sw: 2.8 });
  c.seg([0, B], [590, B], { color: 'green', sw: 2.4, dash: true });
  c.dot([BE, 1], 'accent');
  c.seg([0, 1], [590, 1], { color: 'muted', sw: 1.2 });
  c.yTick(1, '1').yTick(B, String(B)).xTick(BE, String(BE));
  c.label([590, apc(590)], 'APC', { anchor: 'end', dx: -4, dy: -14, color: 'accent', bold: true });
  c.label([590, B], 'MPC', { anchor: 'end', dx: -4, dy: 16, color: 'green', bold: true });
  c.label([BE, 1], 'APC = 1 at break-even', { anchor: 'start', dx: 10, dy: -14, size: 12 });
  assert(Math.abs(apc(BE) - 1) < 1e-9 && apc(590) > B, 'apc');
  return s.visual(
    `APC and MPC of imagined Neelgiri Pradesh: the MPC is a flat dashed line at ${B}; the APC curve falls steeply at low incomes, equals 1 at the break-even income of ${BE}, and keeps falling towards ${B} as income rises without ever reaching it`,
    `APC = ${B} + ${CBAR} ÷ Y: always above the MPC for a straight consumption line with a positive intercept.`,
  );
})();

// ---------------------------------------------------------------- tables and flows
const vComponents = table(
  ['Component', 'Who spends', 'Imagined example'],
  [
    ['C — private consumption', 'Households', 'A Jaipur family buys a mixer-grinder'],
    ['I — investment', 'Firms', 'A Pune factory installs a new press and adds to its stock'],
    ['G — government expenditure', 'Government', 'A state buys ambulances for district hospitals'],
    ['X − M — net exports', 'Buyers abroad, less spending on foreign goods', 'Prawns sold to a hotel abroad, minus imported phones'],
  ],
  'Table of the four components of aggregate demand: private consumption by households, investment by firms, government expenditure, and net exports (exports minus imports), each with an imagined Indian example',
);
const vNavkhand = table(
  ['Component (₹ crore)', 'Navkhand'],
  [['C', String(NAV.c)], ['I', String(NAV.i)], ['G', String(NAV.g)], ['X', String(NAV.x)], ['M', String(NAV.m)], ['AD = C + I + G + (X − M)', `**${NAV_AD}**`]],
  `Table of planned spending in an imagined state economy, Navkhand: consumption ${NAV.c}, investment ${NAV.i}, government ${NAV.g}, exports ${NAV.x} and imports ${NAV.m} crore rupees, giving aggregate demand of ${NAV_AD}`,
  'Imagined figures. Net exports are negative here (140 − 160).',
);
const vAS = flow('LR', ['Value of output produced', 'equals income generated', 'income is consumed or saved', 'AS = C + S'], 'Flow showing that aggregate supply is the value of output, which equals the income generated, which is either consumed or saved, so aggregate supply equals consumption plus saving', 'Aggregate supply from the income side');
const vExAnte = table(
  ['', 'Ex ante (planned)', 'Ex post (realised)'],
  [['When measured', 'Before the period, as intentions', 'After the period, as outcomes'], ['Who decides', 'Households and firms separately', 'Recorded in the accounts'], ['Saving and investment', 'May be unequal', 'Always equal']],
  'Table comparing ex ante and ex post values: ex ante values are planned intentions made before a period by households and firms separately, and planned saving and investment may differ; ex post values are realised outcomes recorded after the period, and realised saving and investment are always equal',
);
const vHosiery = table(
  ['Item (₹ crore)', 'Ludhiana hosiery cluster'],
  [['Planned (ex ante) investment', String(HOS.plannedI)], ['Unsold sweaters added to stock', String(HOS.unplannedStock)], ['Realised (ex post) investment', `**${HOS_REAL}**`]],
  `Table for an imagined Ludhiana hosiery cluster: planned investment ${HOS.plannedI}, unsold sweaters added to stock ${HOS.unplannedStock}, so realised investment is ${HOS_REAL} crore rupees`,
  'Imagined figures.',
);
const vReconcile = flow('TB', ['Planned saving exceeds planned investment', 'Planned spending falls short of output', 'Unsold goods pile up as stock', 'Unplanned stock counts as investment', 'Realised saving equals realised investment', 'Firms cut output next period'], 'Flow showing how a gap between planned saving and planned investment is closed: planned spending falls short of output, unsold goods pile up, the unplanned stock counts as investment so realised saving equals realised investment, and firms then cut output', 'How the plans are reconciled');
const vEffective = flow('LR', ['Aggregate demand (planned spending)', 'meets aggregate supply', 'Effective demand', 'decides actual output and jobs', 'may be below full employment'], 'Flow showing that where aggregate demand meets aggregate supply is effective demand, which decides actual output and employment and may be below full employment', 'Effective demand');
const vAdAs = table(
  ['Aggregate demand', 'Aggregate supply'],
  [['Total planned spending', 'Total value of output'], ['C + I + G + (X − M)', 'C + S (two sectors)'], ['Spending side', 'Income side']],
  'Table contrasting aggregate demand, total planned spending equal to consumption, investment, government expenditure and net exports, with aggregate supply, the total value of output, equal to consumption plus saving in two sectors',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Ex ante / ex post', 'Planned values may differ; realised S = I always'], ['Unplanned stock', 'Closes the gap between plans'], ['Effective demand', 'AD = AS; fixes output, may leave unemployment'], ['Aggregate demand', 'C + I + G + (X − M)'], ['Aggregate supply', 'Value of output = C + S']],
  'Summary table of Part 1: ex ante and ex post values, unplanned stock changes, effective demand, the components of aggregate demand, and aggregate supply as consumption plus saving',
);
const vRatios = table(
  ['Ratio', 'Formula', 'Meaning'],
  [['APC', 'C ÷ Y', 'Share of income consumed'], ['MPC', 'ΔC ÷ ΔY', 'Share of extra income consumed'], ['APS', 'S ÷ Y', 'Share of income saved'], ['MPS', 'ΔS ÷ ΔY', 'Share of extra income saved']],
  'Table of the four propensities: average propensity to consume is consumption over income; marginal propensity to consume is change in consumption over change in income; average propensity to save is saving over income; marginal propensity to save is change in saving over change in income',
);
const vNP = table(
  ['Y', 'C', 'S', 'APC', 'APS'],
  NP.map((r) => [String(r.y), String(r.c), String(r.s), r.apc === null ? '—' : String(r.apc), r.aps === null ? '—' : String(r.aps)]),
  `Consumption and saving schedule of imagined Neelgiri Pradesh for incomes 0 to 600 crore rupees: consumption ${NP.map((r) => r.c).join(', ')}; saving ${NP.map((r) => r.s).join(', ')}; the average propensity to consume falls from 1.6 at income 100 to 0.85 at 600`,
  `Imagined figures, ₹ crore. C = ${CBAR} + ${B}Y; S = Y − C.`,
);
const vMpcRange = flow('LR', ['Income rises', 'Part is spent: MPC above 0', 'Part is saved: MPC below 1', '0 < MPC < 1'], 'Flow explaining why the marginal propensity to consume lies between zero and one: when income rises part of it is spent, so it is above zero, and part is saved, so it is below one', 'Why the MPC lies between 0 and 1');
const vHH = table(
  ['Income', 'Consumption', 'Saving', 'APC', 'MPC'],
  HH.y.map((y, i) => [String(y), String(HH.c[i]), String(HH_S[i]), String(HH_APC[i]), i ? String(HH_MPC[i - 1]) : '—']),
  `Monthly schedule of an imagined Bhopal household in thousand rupees: incomes ${HH.y.join(', ')} with consumption ${HH.c.join(', ')} and saving ${HH_S.join(', ')}; the average propensity to consume falls from 1.1 to 0.92 while the marginal propensity stays at 0.8`,
  'Imagined figures, ₹ thousand a month.',
);
const vIdentities = flow('LR', ['Y = C + S', 'Divide by Y: APC + APS = 1', 'ΔY = ΔC + ΔS', 'Divide by ΔY: MPC + MPS = 1'], 'Flow deriving the two identities: income equals consumption plus saving, so dividing by income gives average propensities adding to one; the change in income equals the change in consumption plus the change in saving, so dividing by the change in income gives marginal propensities adding to one', 'Two identities');
const vVillage = table(
  ['Income', 'Consumption', 'Saving', 'MPC', 'MPS'],
  VIL.y.map((y, i) => [String(y), String(VIL.c[i]), String(VIL_S[i]), i ? String(VIL_MPC[i - 1]) : '—', i ? String(VIL_MPS[i - 1]) : '—']),
  `Schedule of an imagined Sundarban fishing village in lakh rupees: incomes ${VIL.y.join(', ')}, consumption ${VIL.c.join(', ')}, saving ${VIL_S.join(', ')}; the marginal propensity to consume falls from 0.8 to 0.6 while the marginal propensity to save rises from 0.2 to 0.4`,
  'Imagined figures, ₹ lakh a year. MPC + MPS = 1 in every row.',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Consumption function', `C = c̄ + bY; c̄ autonomous, b = MPC`], ['APC and MPC', 'APC falls as Y rises; 0 < MPC < 1'], ['Break-even income', 'C = Y, S = 0, APC = 1'], ['Saving function', 'S = −c̄ + (1 − b)Y; slope = MPS'], ['Identities', 'APC + APS = 1; MPC + MPS = 1']],
  'Summary table of Part 2: the consumption function, the behaviour of the average and marginal propensities to consume, the break-even income, the saving function and the two identities',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Aggregate Demand, Consumption and Saving — Part 1: Plans, Outcomes and Aggregate Demand',
  goals: [
    'Distinguish ex ante (planned) from ex post (realised) values and explain why realised saving equals realised investment',
    'Explain the meaning of effective demand',
    'List the components of aggregate demand and calculate it; express aggregate supply as consumption plus saving',
  ],
  slides: [
    sl('title', 'Aggregate Demand, Consumption and Saving', {
      b: 'Part 1 — **planned** and **realised** values, **effective demand**, and the components of **aggregate demand** and **aggregate supply**.',
      v: flow('LR', ['Aggregate demand', 'Its components', 'Aggregate supply', 'Planned and realised values', 'Reconciling the plans', 'Effective demand'], 'Route map of Part 1: aggregate demand, its components, aggregate supply, planned and realised values, how plans are reconciled, and effective demand', 'Part 1 at a glance'),
      n: 'How much an economy produces depends on how much its people, firms, government and foreign buyers plan to spend. In this part we add up that planned spending as aggregate demand, compare it with the value of output, and see what happens when plans and outcomes differ.',
    }),
    sl('concept', 'Aggregate demand and its four parts', {
      b: '**Aggregate demand** is the total **planned** spending on final goods and services in an economy during a period.',
      v: vComponents,
      n: 'Aggregate demand is everything that buyers plan to spend on the final output of an economy. Households buy consumer goods, firms buy machines and add to stocks, the government buys services and equipment, and foreigners buy our exports. Spending on imports goes to output made abroad, so it is taken away.',
    }),
    sl('concept', 'The aggregate demand formula', {
      b: 'In an open economy with a government: **AD = C + I + G + (X − M)**. In a simple two-sector economy: AD = C + I.',
      v: flow('LR', ['Consumption C', 'plus investment I', 'plus government G', 'plus exports minus imports', 'equals aggregate demand'], 'Flow building aggregate demand as consumption plus investment plus government expenditure plus exports minus imports', 'Adding up planned spending'),
      n: 'Put the four parts together and you have the formula. Consumption, investment and government spending are added. Exports are added because foreigners buy our output. Imports are subtracted because that part of our spending buys output made elsewhere. With only households and firms, aggregate demand is simply consumption plus investment.',
    }),
    sl('check', 'Quick check: which component?', {
      b: 'A state government in imagined Navkhand buys new ambulances for its district hospitals. Which part of aggregate demand is this?',
      chk: 'm_ad_component_identify',
      n: 'Ask yourself who is doing the buying: households, firms, the government, or buyers abroad?',
    }),
    sl('example', 'Worked example 1: aggregate demand in Navkhand', {
      b: 'Find the aggregate demand of an imagined state economy from its planned spending.',
      bl: ['Step 1 — Add C, I and G.', 'Step 2 — Work out net exports: X − M.', 'Step 3 — Add the two results.'],
      v: vNavkhand,
      n: 'Consumption, investment and government spending add up to twelve hundred and sixty crore rupees. Exports are one hundred and forty and imports one hundred and sixty, so net exports are minus twenty. Adding them gives aggregate demand of twelve hundred and forty crore rupees.',
    }),
    sl('concept', 'Aggregate supply from the income side', {
      b: '**Aggregate supply** is the total **value of output** produced. Producing output generates an equal **income**, which is either **consumed** or **saved**: **AS = C + S**.',
      v: vAS,
      n: 'Aggregate supply is the value of everything produced in the period. Making that output creates exactly the same amount of income for the people who produced it. They either spend that income on consumption or save it. So, looked at from the income side, aggregate supply equals consumption plus saving.',
    }),
    sl('check', 'Quick check: aggregate supply', {
      b: 'From the income side, the aggregate supply of an imagined two-sector economy can be written as…',
      chk: 'm_as_meaning',
      n: 'What can people do with the income that production gives them?',
    }),
    sl('two-column', 'Planned versus realised values', {
      cols: [
        '**Ex ante (planned):** intentions made **before** a period, such as the investment a firm plans or the saving a family plans.',
        '**Ex post (realised):** what **actually** happened, read from the accounts **after** the period.',
      ],
      v: vExAnte,
      n: 'Economists use two Latin terms. Ex ante means planned: what households and firms intend at the start of a period. Ex post means realised: what actually happened, as recorded at the end. Planned saving and planned investment are made by different people, so they can differ. Realised saving and investment always turn out equal.',
    }),
    sl('example', 'Worked example 2: a hosiery cluster\'s investment', {
      b: `An imagined Ludhiana hosiery cluster planned to invest ₹${HOS.plannedI} crore. A mild winter left sweaters unsold. Find its realised investment.`,
      bl: ['Step 1 — Start from planned (ex ante) investment.', 'Step 2 — Add the value of goods left unsold: they are added to stock.', 'Step 3 — The total is realised (ex post) investment.'],
      v: vHosiery,
      n: 'The cluster meant to invest one hundred and fifty crore rupees. Because the winter was mild, twenty-five crore rupees of sweaters stayed in the godowns. Unsold goods are added to stock, and additions to stock are investment, even though nobody planned them. So realised investment is one hundred and seventy-five crore rupees.',
    }),
    sl('diagram', 'How unequal plans become equal outcomes', {
      b: 'Unplanned changes in **stock** close any gap between planned saving and planned investment.',
      v: vReconcile,
      n: 'Suppose households plan to save more than firms plan to invest. Then planned spending is less than output, and some goods are not sold. They pile up as stock, which counts as unplanned investment. Realised investment rises until it equals realised saving. Next period, firms holding unwanted stock cut their output.',
    }),
    sl('check', 'Quick check: why the accounts balance', {
      b: 'A statistician finds that last year\'s realised saving and investment were exactly equal, although households had planned to save much more than firms planned to invest. Why?',
      chk: 'm_expost_equal',
      n: 'Think about what happens to goods that are produced but not bought.',
    }),
    sl('concept', 'Effective demand', {
      b: '**Effective demand** is the level of aggregate demand at which **AD = AS**. It decides **actual output and employment**, and it can settle **below full employment**.',
      v: vEffective,
      n: 'Keynes used the phrase effective demand for the level of aggregate demand that actually matches aggregate supply. At that point firms sell what they produce, so it fixes output and the number of jobs. But nothing guarantees that this level is high enough to employ everyone who wants work.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'In an imagined economy of tea estates, the saving households plan for next year must always equal the investment firms plan. True or false?',
      chk: 'tf_exante_equal',
      n: 'Who makes each plan, and do they have to agree before the year starts?',
    }),
    sl('concept', 'Demand side and supply side', {
      v: vAdAs,
      n: 'Keep the two sides apart. Aggregate demand is about planned spending: consumption, investment, government purchases and net exports. Aggregate supply is about output, which equals the income people earn, divided between consumption and saving. When the two are equal we have effective demand.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Planned values can differ, but realised saving and investment are always equal, because unplanned stock changes close the gap. Effective demand is where aggregate demand equals aggregate supply. Aggregate demand is consumption plus investment plus government spending plus net exports; aggregate supply is consumption plus saving.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **AD = C + I + G + (X − M)** and remember **imports are subtracted**.',
        'In two sectors write **AS = C + S** and say why: income is consumed or saved.',
        'Define ex ante and ex post with **one example each**.',
        'Explain equality of **realised** S and I through **unplanned stock changes**.',
        'Effective demand: say **AD = AS** and that it **may be below full employment**.',
      ],
      n: 'State the aggregate demand formula and show that imports are taken away. Give the reason why aggregate supply equals consumption plus saving. Pair each definition of planned and realised values with a short example. When asked why realised saving equals realised investment, mention unsold stock. And never say effective demand guarantees full employment.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Aggregate Demand, Consumption and Saving — Part 2: Propensities to Consume and Save',
  goals: [
    'Calculate APC and MPC from income and consumption data and explain why the MPC lies between 0 and 1',
    'Describe the consumption function and its curve, including the break-even income',
    'Derive a saving schedule and use APC + APS = 1 and MPC + MPS = 1 to find unknown values',
  ],
  slides: [
    sl('title', 'Propensities to Consume and Save', {
      b: 'Part 2 — the **consumption function**, **APC** and **MPC**, the **saving function**, **APS** and **MPS**, and two identities.',
      v: flow('LR', ['Consumption function', 'Average and marginal propensity to consume', 'Break-even income', 'Saving function', 'Average and marginal propensity to save', 'Two identities'], 'Route map of Part 2: the consumption function, the average and marginal propensities to consume, the break-even income, the saving function, the average and marginal propensities to save, and the two identities', 'Part 2 at a glance'),
      n: 'Consumption is the largest part of aggregate demand, so we need to know how it changes with income. In this part we meet the consumption function, measure how much of income and of extra income is spent or saved, and use two simple identities to find missing values.',
    }),
    sl('concept', 'Four propensities', {
      b: '**Average** propensities compare totals; **marginal** propensities compare **changes**.',
      v: vRatios,
      n: 'There are four ratios. The average propensity to consume is the share of total income spent; the marginal propensity to consume is the share of extra income spent. The average and marginal propensities to save do the same for saving. Average means total over total; marginal means change over change.',
    }),
    sl('diagram', 'The consumption function', {
      b: `**C = c̄ + bY.** In imagined Neelgiri Pradesh, **C = ${CBAR} + ${B}Y** (₹ crore): **${CBAR}** is autonomous consumption and **${B}** is the MPC.`,
      v: vCons,
      n: 'This curve shows planned consumption at each level of income. Even with no income, people consume ninety crore rupees, financed from past savings or loans. Each extra rupee of income raises consumption by seventy paise, so the curve is flatter than the dashed forty-five degree line. The two meet at the break-even income of three hundred.',
    }),
    sl('check', 'Quick check: the share of extra income spent', {
      b: 'A Kanpur shopkeeper\'s income rises and he spends part of the rise. The share of the extra income he spends is his…',
      chk: 'm_mpc_meaning',
      n: 'Is the question about all of his income, or only the extra part?',
    }),
    sl('example', 'Worked example 1: a consumption and saving schedule', {
      b: `Build the schedule of imagined Neelgiri Pradesh from **C = ${CBAR} + ${B}Y**.`,
      bl: ['Step 1 — C at each income from the function.', 'Step 2 — S = Y − C.', 'Step 3 — APC = C ÷ Y and APS = S ÷ Y; check they add to 1.'],
      v: vNP,
      n: 'Put each income into the function: at one hundred, consumption is one hundred and sixty; at six hundred, it is five hundred and ten. Saving is income minus consumption, negative below three hundred and positive above it. Dividing by income gives the average propensities, and at every income the two add up to exactly one.',
    }),
    sl('diagram', 'Average and marginal propensity to consume', {
      b: `The **MPC stays at ${B}**; the **APC falls** as income rises, equals **1 at break-even** and stays **above the MPC**.`,
      v: vApc,
      n: 'Here the two propensities are drawn against income. The marginal propensity is a flat line at zero point seven, because each extra rupee always adds seventy paise to consumption. The average propensity starts very high, falls to one at the break-even income and keeps falling towards zero point seven, without ever reaching it.',
    }),
    sl('check', 'Quick check: where the curve meets the 45° line', {
      b: 'On a diagram of an imagined economy\'s consumption curve drawn with a 45° line, the point where the two meet shows the income at which…',
      chk: 'm_breakeven_point',
      n: 'Every point on the forty-five degree line has the same value on both axes. What does that mean for consumption and income?',
    }),
    sl('concept', 'Why the marginal propensity lies between 0 and 1', {
      b: 'When income rises, people **spend some** of it and **save some** of it.',
      v: vMpcRange,
      n: 'Think of what you would do with an unexpected rise in pocket money. You would spend some of it, so the marginal propensity to consume is above zero. You would probably keep some aside too, so it is below one. That is why, in the Keynesian view, it lies between zero and one.',
    }),
    sl('example', 'Worked example 2: a household\'s propensities', {
      b: 'Find the APC at each income and the MPC between incomes for an imagined Bhopal household.',
      bl: ['Step 1 — APC = C ÷ Y at each income.', 'Step 2 — MPC = ΔC ÷ ΔY between incomes.', 'Step 3 — Break-even where C = Y.'],
      v: vHH,
      n: 'At twenty thousand rupees the family spends twenty-two thousand, so its average propensity is one point one and it dissaves. Each rise of ten thousand in income raises spending by eight thousand, so the marginal propensity is zero point eight throughout. At thirty thousand, spending equals income: the break-even point.',
    }),
    sl('concept', 'Average and marginal propensity to save', {
      b: '**APS = S ÷ Y** (can be **negative** below break-even). **MPS = ΔS ÷ ΔY**, the slope of the saving curve.',
      v: table(['Income (₹ crore)', 'S', 'APS'], NP.slice(1).map((r) => [String(r.y), String(r.s), String(r.aps)]), `Table of saving and the average propensity to save in imagined Neelgiri Pradesh: saving ${NP.slice(1).map((r) => r.s).join(', ')} at incomes 100 to 600, so the average propensity to save rises from minus 0.6 to 0.15`, 'Imagined figures, ₹ crore.'),
      n: 'The average propensity to save is saving divided by income. At low incomes saving is negative, so this ratio is negative too. It rises as income grows. The marginal propensity to save is the extra saving from extra income; here it is zero point three, the slope of the saving curve.',
    }),
    sl('diagram', 'The saving function', {
      b: `**S = Y − C = −${CBAR} + ${MPS}Y.** It starts at **−${CBAR}**, rises with slope **${MPS}** and crosses the income axis at **${BE}**.`,
      v: vSav,
      n: 'Subtract the consumption function from income and you get the saving function. At zero income people dissave ninety crore rupees, so the curve starts below the axis. It rises by thirty paise for each extra rupee of income and crosses the income axis at three hundred, the break-even income. Beyond it saving is positive.',
    }),
    sl('check', 'Quick check: where the saving curve starts', {
      b: `The saving curve of imagined Neelgiri Pradesh, derived from C = ${CBAR} + ${B}Y, starts on the vertical axis at…`,
      chk: 'm_saving_curve_start',
      n: 'If income is zero but people still consume ninety, what is their saving?',
    }),
    sl('concept', 'Two identities', {
      b: '**APC + APS = 1** and **MPC + MPS = 1**, because every rupee of income, or of extra income, is either consumed or saved.',
      v: vIdentities,
      n: 'Income is always split between consumption and saving. Divide both sides by income and the two average propensities add up to one. The same is true of any change in income, so the two marginal propensities also add up to one. Use these to find a missing value quickly.',
    }),
    sl('example', 'Worked example 3: a village whose MPC falls', {
      b: 'Derive saving and the MPC and MPS of an imagined Sundarban fishing village.',
      bl: ['Step 1 — S = Y − C at each income.', 'Step 2 — MPC = ΔC ÷ ΔY and MPS = ΔS ÷ ΔY.', 'Step 3 — Check MPC + MPS = 1 and read the trend.'],
      v: vVillage,
      n: 'Subtracting consumption from income gives saving of minus twenty, zero, thirty and seventy lakh rupees. Each rise of one hundred lakh in income raises spending by eighty, then seventy, then sixty, so the marginal propensity to consume falls while the marginal propensity to save rises. Each pair adds to one.',
    }),
    sl('check', 'Quick check: the slope of the saving curve', {
      b: 'On the saving curve of imagined Neelgiri Pradesh, income rises from 400 to 500. By how much does saving rise, and what does that show?',
      chk: 'm_mps_slope',
      n: 'Work out saving at both incomes and compare the rise with the rise in income.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The consumption function has an autonomous part and a slope equal to the marginal propensity to consume, which lies between zero and one. The average propensity falls as income rises and equals one at break-even. The saving function mirrors it, with slope equal to the marginal propensity to save, and the propensities pair up to one.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **formula** before each ratio: APC = C ÷ Y, MPC = ΔC ÷ ΔY.',
        'Use **changes** for marginal and **totals** for average propensities.',
        'Break-even income: **C = Y**, so **S = 0** and **APC = 1**.',
        'Draw the consumption curve from **c̄ on the vertical axis**, flatter than the 45° line.',
        'Use **APC + APS = 1** and **MPC + MPS = 1** to find missing values.',
      ],
      n: 'Write each formula before using it, so method marks are secure. Do not mix totals and changes. Remember that break-even means consumption equals income and saving is zero. Start the consumption curve above the origin and the saving curve below it. And use the two identities to save time in numerical questions.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Aggregate Demand, Consumption and Saving — notes',
  sections: [
    {
      h: '1. Ex ante and ex post values',
      t: 1,
      b: '- **Ex ante (planned):** what households and firms **intend** before a period: planned consumption, saving, investment.\n- **Ex post (realised):** what **actually** happened, recorded after the period.\n- Planned saving (households) and planned investment (firms) are decided by **different people** for different reasons, so they **may differ**.\n- Realised saving and investment are **always equal**: any gap shows up as an **unplanned change in stock**, which is counted in realised investment.\n- If planned saving > planned investment: goods remain **unsold**, stocks **rise**, firms later **cut output**. If planned saving < planned investment: stocks **fall**, firms later **raise output**.',
      terms: [['Ex ante', 'Planned or intended value of a variable, before the period.'], ['Ex post', 'Realised or actual value of a variable, after the period.'], ['Unplanned inventory', 'An addition to or fall in stock that firms did not intend.']],
      v: vExAnte,
      vs: [vHosiery, vReconcile],
    },
    {
      h: '2. Effective demand',
      t: 1,
      b: '**Effective demand** is the level of aggregate demand at which it becomes **equal to aggregate supply**. At this level, planned spending is exactly enough to buy the output produced, so it **decides actual output and employment**.\n\nIn Keynes\'s view effective demand need **not** be at full employment: if planned spending is low, the economy can settle where some people who want work cannot find it (the idea of **involuntary unemployment**, taken further in the next chapter).',
      terms: [['Effective demand', 'The level of aggregate demand that equals aggregate supply and so fixes output and employment.']],
      v: vEffective,
    },
    {
      h: '3. Aggregate demand and aggregate supply',
      t: 2,
      b: '- **Aggregate demand (AD):** total **planned** spending on final goods and services in a period.\n- Open economy with government: **AD = C + I + G + (X − M)**; two sectors: AD = C + I.\n- **C** households\' consumption; **I** firms\' investment (new capital and stock); **G** government purchases; **X − M** net exports (imports subtracted because they buy foreign output).\n- **Aggregate supply (AS):** total **value of output** produced, equal to the income generated. From the income side, in two sectors, **AS = C + S**.',
      terms: [['Aggregate demand', 'Total planned expenditure on final goods and services in an economy during a period.'], ['Aggregate supply', 'Total value of goods and services produced in an economy during a period.'], ['Net exports', 'Exports minus imports.']],
      v: vComponents,
      vs: [vNavkhand, vAS, vAdAs],
    },
    {
      h: '4. The consumption function; APC and MPC',
      t: 3,
      b: `- **Consumption function:** C = f(Y); in straight-line form **C = c̄ + bY**, where **c̄** (autonomous consumption) is consumption at zero income and **b** is the MPC.\n- **APC = C ÷ Y**; it can exceed 1 at low incomes (dissaving) and **falls** as income rises.\n- **MPC = ΔC ÷ ΔY**; normally **0 < MPC < 1** because part of extra income is saved.\n- **Break-even income:** where **C = Y** (the curve meets the 45° line): S = 0 and APC = 1. For C = c̄ + bY it is **c̄ ÷ (1 − b)**; in imagined Neelgiri Pradesh, ${CBAR} ÷ ${MPS} = **${BE}**.\n- For a straight-line function with c̄ > 0, **APC > MPC** at every positive income.`,
      terms: [['Autonomous consumption', 'Consumption that does not depend on income; it takes place even at zero income.'], ['Average propensity to consume', 'Consumption as a share of income, C ÷ Y.'], ['Marginal propensity to consume', 'The share of extra income spent on consumption, ΔC ÷ ΔY.'], ['Break-even income', 'The income at which consumption equals income and saving is zero.']],
      v: vCons,
      vs: [vApc, vNP, vHH],
    },
    {
      h: '5. The saving function; APS and MPS',
      t: 4,
      b: `- **Saving function:** S = Y − C = **−c̄ + (1 − b)Y**; it starts at **−c̄** and has slope **(1 − b) = MPS**.\n- **APS = S ÷ Y**; it is **negative** below break-even income, zero at it, positive above it.\n- **MPS = ΔS ÷ ΔY**; for Neelgiri Pradesh **${MPS}**.\n- The saving curve **cuts the income axis** at the break-even income, the same income at which the consumption curve meets the 45° line.`,
      terms: [['Average propensity to save', 'Saving as a share of income, S ÷ Y.'], ['Marginal propensity to save', 'The share of extra income saved, ΔS ÷ ΔY.'], ['Dissaving', 'Consumption above income, financed from past savings or borrowing.']],
      v: vSav,
    },
    {
      h: '6. The two identities and working with schedules',
      t: [3, 4],
      b: '- Since Y = C + S: **APC + APS = 1**.\n- Since ΔY = ΔC + ΔS: **MPC + MPS = 1**.\n- To complete a schedule: **S = Y − C**; then the four ratios, writing each formula; check both identities.\n- A falling MPC (rising MPS) as income rises shows that better-off households save a **larger share** of extra income.',
      terms: [['APC + APS = 1', 'Average propensities to consume and save add up to one.'], ['MPC + MPS = 1', 'Marginal propensities to consume and save add up to one.']],
      v: vIdentities,
      vs: [vVillage, vMpcRange],
    },
  ],
  tips: '**Common mistakes**\n- Adding imports in AD instead of subtracting them.\n- Using totals for the MPC or changes for the APC.\n- Saying the MPC can be above 1, or that the APC equals the MPC for C = c̄ + bY.\n- Starting the consumption curve at the origin, or the saving curve at zero.\n- Writing that ex ante saving always equals ex ante investment.\n- Saying effective demand means full employment.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, value or term.\n- 2 marks: a definition with an example, or a value with working.\n- 3 marks: a short schedule completed, or three linked points.\n- 5 marks: parts answered in order with schedules, described diagrams and reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Ex ante**', 'Planned or intended value, before the period.', 'definition', 1],
  ['**Ex post**', 'Realised or actual value, after the period.', 'definition', 1],
  ['Are planned S and I always equal?', '**No.** Only realised S and I are always equal.', 'concept', 1],
  ['What makes realised S equal realised I?', '**Unplanned changes in stock**, counted as investment.', 'concept', 1],
  ['Hosiery cluster (imagined)', `Planned I ${HOS.plannedI} + unsold stock ${HOS.unplannedStock} = realised I **${HOS_REAL}**.`, 'example', 1],
  ['**Effective demand**', 'The level of AD at which **AD = AS**; fixes output and jobs.', 'definition', 1],
  ['Does effective demand ensure full employment?', '**No** — it may settle below full employment.', 'exam-tip', 1],
  ['**Aggregate demand**', 'Total planned spending: **C + I + G + (X − M)**.', 'formula', 2],
  ['Why are imports subtracted in AD?', 'They are spending on output **produced abroad**.', 'concept', 2],
  ['**Aggregate supply** (two sectors)', 'Value of output = income = **C + S**.', 'formula', 2],
  ['Navkhand (imagined) AD', `${NAV.c} + ${NAV.i} + ${NAV.g} + (${NAV.x} − ${NAV.m}) = **${NAV_AD}**.`, 'example', 2],
  ['A firm adds to its stock of raw cotton', 'Part of **investment (I)**.', 'example', 2],
  ['**Consumption function**', 'C = c̄ + bY; c̄ autonomous, b = MPC.', 'formula', 3],
  ['**Autonomous consumption**', 'Consumption at **zero income**, from past savings or loans.', 'definition', 3],
  ['**APC**', 'C ÷ Y — share of income consumed.', 'formula', 3],
  ['**MPC**', 'ΔC ÷ ΔY — share of extra income consumed.', 'formula', 3],
  ['Range of the MPC', '**0 < MPC < 1**.', 'fact', 3],
  ['APC above 1 means…', '**Dissaving**: consumption exceeds income.', 'concept', 3],
  ['APC as income rises', `**Falls** towards the MPC (for C = c̄ + bY, always above it).`, 'concept', 3],
  ['**Break-even income**', 'C = Y, S = 0, APC = 1.', 'definition', 3],
  ['Break-even income of C = c̄ + bY', '**c̄ ÷ (1 − b)**.', 'formula', 3],
  ['Neelgiri Pradesh (imagined)', `C = ${CBAR} + ${B}Y; break-even **${BE}**; APC at 600 = **${NP[6].apc}**.`, 'example', 3],
  ['**APS**', 'S ÷ Y — share of income saved (negative below break-even).', 'formula', 4],
  ['**MPS**', 'ΔS ÷ ΔY — slope of the saving curve.', 'formula', 4],
  ['**Saving function**', 'S = −c̄ + (1 − b)Y.', 'formula', 4],
  ['Where does the saving curve start?', 'At **−c̄** on the vertical axis.', 'fact', 4],
  ['Two identities', '**APC + APS = 1** and **MPC + MPS = 1**.', 'formula', 4],
  ['MPC 0.65 → MPS?', '**0.35**.', 'example', 4],
  ['Sundarban village (imagined)', `MPC ${VIL_MPC.join(', ')}; MPS ${VIL_MPS.join(', ')}.`, 'example', 4],
  ['Totals or changes?', 'Average propensities use **totals**; marginal ones use **changes**.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Aggregate Demand, Consumption and Saving',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_exante_meaning', 'm_ad_formula', 'm_mpc_range', 'm_aps_negative', 'ar_mpc_less_one'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_ad_components', { attempt: 1, keys: ['s_apc_mpc', 's_aps_mps'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_household_schedule', { attempt: 1, keys: ['s3_hosiery', 's3_fill_schedule'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_consumption_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Aggregate Demand, Consumption and Saving',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_expost_meaning', 'm_unplanned_stock', 'm_effective_demand', 'm_ad_meaning', 'm_imports_ad', 'm_apc_meaning', 'm_autonomous', 'm_apc_above_one', 'm_mps_from_mpc', 'm_both_identities', 'ar_expost', 'ar_aps_one'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_exante_expost', 's_ad_as_differ', { attempt: 1, keys: ['s_mpc_why_below', 's_identity_proof'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_plans_differ', 's3_navkhand_change', 's3_consumption_curve', { attempt: 1, keys: ['s3_village_mpc', 's3_unknowns'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working or described diagrams.', items: ['l_saving_full', { attempt: 1, keys: ['l_exante_full', 'l_ad_as_full'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-economics-ch11 only (ex ante and ex post, effective demand; aggregate demand and aggregate supply; APC, MPC and the consumption function; APS, MPS and the two identities); equilibrium income and the multiplier are left to ch12',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs and very short items, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every economy, household, figure and case written for this chapter (imagined); set-ups differ from the CBSE 12 Economics ch03 bank; no textbook, specimen or past-paper item reused',
    data: `figures computed in questions.mjs and asserted: Neelgiri Pradesh C = ${CBAR} + ${B}Y (break-even ${BE}; APC ${NP.slice(1).map((r) => r.apc).join(', ')}); Bhopal household incomes ${HH.y.join(', ')} with consumption ${HH.c.join(', ')} (MPC ${HH_MPC[0]}); Sundarban village MPC ${VIL_MPC.join(', ')}; Navkhand AD ${NAV_AD}; Ludhiana realised investment ${HOS_REAL}; SVG curves drawn from these equations`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
