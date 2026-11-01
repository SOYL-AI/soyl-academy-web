// Build ISC 12 Economics ch12 Equilibrium Output, Multiplier and Problems of Demand. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch12/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch12', 'economics-commerce');
const {
  r3, T, T_AD, T_S, T_Y, T_K, T_BE, T_ROWS, T_DI, T_Y2, H, H_AD, H_Y, H_K, H_YF_DEF, H_GAP_DEF, H_YF_INF, H_GAP_INF,
  RND, ROUNDS, ROUNDS_TOTAL, kOf,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures
function frame({ x1, y0 = 0, y1, xLabel, yLabel, w = 500, h = 400 }) {
  const s = new Svg(w, h);
  const c = s.chart({ x1, y0, y1, left: 70, top: 34, width: w - 160, height: h - 100, xLabel, yLabel });
  return { s, c };
}

// (1) AD = AS: forty-five degree line, consumption line and AD line for Tarangpur; E at (500, 500).
const vADAS = (() => {
  const { s, c } = frame({ x1: 800, y1: 800, xLabel: 'Income Y (₹ crore)', yLabel: 'Spending (₹ crore)' });
  c.seg([0, 0], [800, 800], { sw: 2 });
  c.fn((y) => T.a + T.b * y, 0, 800, { color: 'muted', sw: 2, dash: true });
  c.fn(T_AD, 0, 800, { color: 'accent', sw: 2.8 });
  c.dot([T_Y, T_Y], 'accent');
  c.drop([T_Y, T_Y]);
  c.xTick(T_Y, String(T_Y)).yTick(T_Y, String(T_Y)).yTick(T.a + T.I, String(T.a + T.I));
  c.label([T_Y, T_Y], 'E', { dx: -14, dy: -12, bold: true });
  c.label([800, 800], 'AS (45°)', { anchor: 'end', dx: -4, dy: -14, size: 12, bold: true });
  c.label([800, T_AD(800)], 'AD = C + I', { anchor: 'end', dx: -4, dy: 16, color: 'accent', size: 12, bold: true });
  c.label([800, T.a + T.b * 800], 'C', { anchor: 'start', dx: 4, color: 'muted', size: 12, bold: true });
  assert(T_AD(800) === 740 && T.a + T.b * 800 === 700, 'adas end points');
  return s.visual(
    `Income–expenditure diagram of the imagined economy of Tarangpur: the forty-five degree line shows aggregate supply; the consumption line starts at ${T.a} and rises with slope ${T.b}; the aggregate demand line, consumption plus investment of ${T.I}, starts at ${T.a + T.I} and runs parallel to it. Aggregate demand cuts the forty-five degree line at E, where income is ${T_Y} crore rupees`,
    'Imagined economy, ₹ crore: C = 60 + 0.8Y, I = 40; equilibrium where AD meets the 45° line.',
  );
})();

// (2) S = I: saving line from −60 meets investment at 40 when Y = 500.
const vSI = (() => {
  const { s, c } = frame({ x1: 800, y0: -80, y1: 120, xLabel: 'Income Y (₹ crore)', yLabel: 'Saving, investment (₹ crore)' });
  c.seg([0, 0], [800, 0], { color: 'muted', sw: 1.2 });
  c.fn(T_S, 0, 800, { color: 'accent', sw: 2.8 });
  c.seg([0, T.I], [800, T.I], { color: 'blue', sw: 2.6 });
  c.dot([T_Y, T.I], 'accent').dot([T_BE, 0], 'muted');
  c.seg([T_Y, T.I], [T_Y, -80], { color: 'muted', sw: 1.2, dash: true });
  c.label([T_Y, T.I], 'E', { dx: -12, dy: -12, bold: true });
  c.label([T_Y, -80], String(T_Y), { dy: -10, dx: 16, size: 12 });
  c.label([T_BE, 0], `B (${T_BE})`, { dy: 14, size: 12 });
  c.label([800, T_S(800)], 'S', { anchor: 'end', dx: -6, dy: -12, color: 'accent', bold: true });
  c.label([800, T.I], `I = ${T.I}`, { anchor: 'end', dx: -6, dy: 14, color: 'blue', bold: true });
  c.yTick(T.I, String(T.I)).yTick(-T.a, String(-T.a));
  assert(T_S(800) === 100 && T_S(0) === -60 && T_S(T_BE) === 0, 'saving line');
  return s.visual(
    `Saving–investment diagram of the imagined economy of Tarangpur: the saving line starts at minus ${T.a}, crosses zero at the break-even income of ${T_BE} and rises with slope ${r3(1 - T.b)}; investment is a horizontal line at ${T.I}. They meet at E, where income is ${T_Y} crore rupees; to the left investment exceeds saving and income rises, to the right saving exceeds investment and income falls`,
    'Same economy: S = −60 + 0.2Y meets I = 40 at the same income, 500.',
  );
})();

// (3) Multiplier rounds as bars.
const vRounds = (() => {
  const s = new Svg(500, 380);
  const c = s.chart({ x1: 7, y1: 110, left: 70, top: 34, width: 340, height: 280, xLabel: 'Round', yLabel: 'Extra income (₹ crore)' });
  ROUNDS.forEach((v, i) => {
    const x = i + 1;
    const x0 = c.X(x - 0.35), x1 = c.X(x + 0.35);
    s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: 'fill', color: 'accent', sw: 1.4, rx: 2 });
    c.label([x, v], String(r3(v)), { dy: -10, size: 11 });
    c.xTick(x, String(x));
  });
  return s.visual(
    `Bar chart of the first six rounds of extra income after investment of ${RND.dI} crore rupees in an imagined city economy with a marginal propensity to consume of ${RND.b}: ${ROUNDS.join(', ')}; each bar is ${RND.b} times the one before, and all the rounds together add up to ${ROUNDS_TOTAL}`,
    `Imagined figures: rounds shrink by the MPC; total = k × ΔI = ${kOf(RND.b)} × ${RND.dI} = ${ROUNDS_TOTAL}.`,
  );
})();

// (4) Shift of AD with ΔI = 20: E1 (500) to E2 (600).
const vShift = (() => {
  const { s, c } = frame({ x1: 800, y1: 800, xLabel: 'Income Y (₹ crore)', yLabel: 'Spending (₹ crore)' });
  const AD2 = (y) => r3(T.a + T.I + T_DI + T.b * y);
  c.seg([0, 0], [800, 800], { sw: 2 });
  c.fn(T_AD, 0, 800, { color: 'accent', sw: 2.6 });
  c.fn(AD2, 0, 800, { color: 'green', sw: 2.6 });
  c.dot([T_Y, T_Y], 'accent').dot([T_Y2, T_Y2], 'green');
  c.drop([T_Y, T_Y]).drop([T_Y2, T_Y2]);
  c.xTick(T_Y, String(T_Y)).xTick(T_Y2, String(T_Y2));
  c.label([T_Y, T_Y], 'E1', { dx: 16, dy: 12, bold: true });
  c.label([T_Y2, T_Y2], 'E2', { dx: -16, dy: -12, bold: true });
  c.label([800, T_AD(800)], 'AD1', { anchor: 'start', dx: 4, dy: 6, color: 'accent', size: 12, bold: true });
  c.label([800, AD2(800)], 'AD2', { anchor: 'start', dx: 4, dy: -6, color: 'green', size: 12, bold: true });
  assert(AD2(T_Y2) === T_Y2, 'ad2 equilibrium');
  return s.visual(
    `Diagram of a rise in investment of ${T_DI} crore rupees in the imagined economy of Tarangpur: the aggregate demand line shifts up by ${T_DI} from AD1 to AD2, and equilibrium moves along the forty-five degree line from E1 at ${T_Y} to E2 at ${T_Y2}, a rise in income of ${T_Y2 - T_Y}, five times the rise in investment`,
    'ΔI = 20 shifts AD up by 20; ΔY = k × ΔI = 5 × 20 = 100.',
  );
})();

// (5) Deflationary gap: Hiranagar, Yf = 400.
function gapFigure(Yf, kind) {
  const { s, c } = frame({ x1: 500, y1: 500, xLabel: 'Income Y (₹ crore)', yLabel: 'Spending (₹ crore)' });
  c.seg([0, 0], [500, 500], { sw: 2 });
  c.fn(H_AD, 0, 500, { color: 'accent', sw: 2.8 });
  c.dot([H_Y, H_Y], 'accent').dot([Yf, Yf]).dot([Yf, H_AD(Yf)], 'accent');
  c.seg([Yf, 0], [Yf, Math.max(Yf, H_AD(Yf))], { color: 'muted', sw: 1.2, dash: true });
  c.seg([Yf, Yf], [Yf, H_AD(Yf)], { color: 'red', sw: 3.2 });
  c.xTick(H_Y, String(H_Y)).xTick(Yf, `Yf ${Yf}`);
  c.label([H_Y, H_Y], 'E', { dx: kind === 'def' ? -14 : 14, dy: kind === 'def' ? -12 : 12, bold: true });
  c.label([Yf, (Yf + H_AD(Yf)) / 2], kind === 'def' ? `Deflationary gap ${H_GAP_DEF}` : `Inflationary gap ${H_GAP_INF}`, { anchor: kind === 'def' ? 'start' : 'end', dx: kind === 'def' ? 8 : -8, color: 'red', size: 12, bold: true });
  c.label([500, 500], 'AS (45°)', { anchor: 'end', dx: -4, dy: -14, size: 12, bold: true });
  c.label([500, H_AD(500)], 'AD', { anchor: 'start', dx: 4, color: 'accent', size: 12, bold: true });
  return { s };
}
const vDefl = (() => {
  const { s } = gapFigure(H_YF_DEF, 'def');
  return s.visual(
    `Deflationary gap in the imagined economy of Hiranagar: aggregate demand ${H.a + H.I} plus ${H.b} Y cuts the forty-five degree line at E, an income of ${H_Y}. At the full-employment output of ${H_YF_DEF}, aggregate demand is only ${H_AD(H_YF_DEF)}, so the vertical gap of ${H_GAP_DEF} between the forty-five degree line and aggregate demand is the deflationary gap`,
    `Imagined economy, ₹ crore: AD = ${H.a + H.I} + ${H.b}Y; gap measured at full employment.`,
  );
})();
const vInfl = (() => {
  const { s } = gapFigure(H_YF_INF, 'inf');
  return s.visual(
    `Inflationary gap in the imagined economy of Hiranagar if full-employment output were only ${H_YF_INF}: aggregate demand at that output is ${H_AD(H_YF_INF)}, above the forty-five degree line by ${H_GAP_INF}, which is the inflationary gap; the equilibrium E at ${H_Y} lies beyond full employment, so the excess shows up as rising prices`,
    `Same AD, Yf = ${H_YF_INF}: AD exceeds output at full employment by ${H_GAP_INF}.`,
  );
})();

// ---------------------------------------------------------------- tables and flows
const vSched = table(
  ['Y', 'C', 'S', 'I', 'AD = C + I', 'Output will…'],
  T_ROWS.map((r) => [String(r.Y), String(r.C), String(r.S), String(r.I), String(r.AD), r.AD > r.Y ? 'rise' : r.AD < r.Y ? 'fall' : 'stay (equilibrium)']),
  `Schedule of the imagined economy of Tarangpur for incomes 0 to 700: consumption ${T_ROWS.map((r) => r.C).join(', ')}; saving ${T_ROWS.map((r) => r.S).join(', ')}; investment ${T.I} throughout; aggregate demand ${T_ROWS.map((r) => r.AD).join(', ')}. Aggregate demand equals income only at ${T_Y}, where saving also equals investment`,
  'Imagined figures, ₹ crore.',
);
const vApproach = table(
  ['Approach', 'Condition', 'Why it holds'],
  [['AD = AS', 'C + I = Y', 'Planned spending buys exactly what is produced'], ['S = I', 'Planned saving = planned investment', 'The leakage from spending is matched by the injection']],
  'Table of the two approaches to equilibrium income: aggregate demand equal to aggregate supply, where planned spending buys all output; and saving equal to investment, where the leakage from spending is matched by the injection',
  'AD = C + I and AS = C + S, so both conditions pick the same income.',
);
const vAdjust = flow('LR', ['AD > AS (I > S)', 'Stocks run down', 'Firms raise output', 'Income rises to AD = AS'], 'Flow of adjustment when aggregate demand exceeds aggregate supply: stocks run down, firms raise output, and income rises to equilibrium', 'Below equilibrium');
const vAdjustDown = flow('LR', ['AD < AS (S > I)', 'Unsold stocks pile up', 'Firms cut output', 'Income falls to AD = AS'], 'Flow of adjustment when aggregate demand is less than aggregate supply: unsold stocks pile up, firms cut output, and income falls to equilibrium', 'Above equilibrium');
const vKTable = table(
  ['MPC', 'MPS', 'k = 1 ÷ MPS'],
  [0, 0.5, 0.75, 0.8, 0.9].map((b) => [String(b), String(r3(1 - b)), String(kOf(b))]),
  `Table of the multiplier for marginal propensities to consume of 0, 0.5, 0.75, 0.8 and 0.9: the multipliers are ${[0, 0.5, 0.75, 0.8, 0.9].map(kOf).join(', ')}; the multiplier rises as the marginal propensity to consume rises`,
  'The higher the MPC, the larger the multiplier; k is never below 1.',
);
const vRoundTable = table(
  ['Round', 'Extra income (₹ crore)', 'How it arises'],
  [['1', String(ROUNDS[0]), 'Paid out by the project'], ['2', String(ROUNDS[1]), `${RND.b} of round 1 spent`], ['3', String(ROUNDS[2]), `${RND.b} of round 2 spent`], ['4', String(ROUNDS[3]), `${RND.b} of round 3 spent`], ['All rounds', String(ROUNDS_TOTAL), `k × ΔI = ${kOf(RND.b)} × ${RND.dI}`]],
  `Table of multiplier rounds after investment of ${RND.dI} crore rupees with a marginal propensity to consume of ${RND.b}: rounds of ${ROUNDS.slice(0, 4).join(', ')} and so on, adding up to ${ROUNDS_TOTAL}`,
  'Imagined figures.',
);
const vKSteps = flow('LR', ['Investment rises', 'Incomes of workers and suppliers rise', 'MPC share spent', 'Others\' incomes rise', 'Rounds shrink by the MPC', 'Total ΔY = k × ΔI'], 'Flow of the multiplier process: investment raises the incomes of workers and suppliers, a share equal to the marginal propensity to consume is spent and becomes others\' income, the rounds shrink, and the total rise in income is the multiplier times the rise in investment', 'How the multiplier works');
const vFE = table(
  ['Term', 'Meaning', 'Example (imagined)'],
  [
    ['Full employment', 'All able and willing to work at the going wage have jobs', 'A town where any willing worker finds work at the going wage'],
    ['Involuntary unemployment', 'Willing to work at the going wage but cannot find work', 'A trained welder who would accept the going wage, with no openings'],
    ['Frictional unemployment', 'Short spells between jobs', 'A nurse moving to a new hospital next month'],
    ['Voluntary unemployment', 'Not willing to work at the going wage', 'Someone who chooses to wait for a far higher wage'],
  ],
  'Table of employment terms: full employment, where all who are able and willing to work at the going wage have jobs; involuntary unemployment, where people willing to work at the going wage cannot find work; frictional unemployment between jobs; and voluntary unemployment of those unwilling to work at the going wage',
);
const vUnderEq = flow('LR', ['Low planned spending', 'AD meets AS below full-employment output', 'No pressure on firms to expand', 'Involuntary unemployment persists'], 'Flow of an underemployment equilibrium: low planned spending makes aggregate demand meet aggregate supply below full-employment output, firms have no reason to expand, and involuntary unemployment persists', 'Keynes: equilibrium need not be at full employment');
const vGapTable = table(
  ['Full-employment output Yf', 'AD at Yf', 'Gap', 'Kind'],
  [[String(H_YF_DEF), String(H_AD(H_YF_DEF)), String(H_GAP_DEF), 'Deflationary (AD < Yf)'], [String(H_YF_INF), String(H_AD(H_YF_INF)), String(H_GAP_INF), 'Inflationary (AD > Yf)']],
  `Table for the imagined economy of Hiranagar with aggregate demand ${H.a + H.I} plus ${H.b} Y: at a full-employment output of ${H_YF_DEF}, aggregate demand is ${H_AD(H_YF_DEF)}, a deflationary gap of ${H_GAP_DEF}; at ${H_YF_INF}, aggregate demand is ${H_AD(H_YF_INF)}, an inflationary gap of ${H_GAP_INF}`,
  'Imagined figures, ₹ crore. Gaps are measured at full employment.',
);
const vCauses = table(
  ['', 'Excess demand', 'Deficient demand'],
  [
    ['Causes', 'More public spending, easy credit, higher exports, lower saving', 'Lower investment, lower exports, higher saving, tighter credit'],
    ['Effect on output', 'Cannot rise beyond full employment', 'Falls below full employment'],
    ['Effect on prices', 'Rise', 'Stay low or fall'],
    ['Effect on jobs', 'No new jobs', 'Involuntary unemployment'],
  ],
  'Table comparing excess and deficient demand: causes such as more public spending or easy credit against lower investment or exports; effects on output, prices and jobs',
);
const vMeasures = table(
  ['Instrument', 'Against excess demand', 'Against deficient demand'],
  [
    ['Government spending', 'Cut', 'Raise'],
    ['Taxes', 'Raise', 'Cut'],
    ['Repo rate / bank rate', 'Raise', 'Cut'],
    ['CRR and SLR', 'Raise', 'Cut'],
    ['Open market operations', 'Sell securities', 'Buy securities'],
    ['Margin requirements', 'Raise', 'Lower'],
  ],
  'Table of corrective measures: against excess demand, cut government spending, raise taxes, raise the repo rate, the reserve ratios and margins, and sell securities; against deficient demand, do the opposite',
  'Directions only; no current policy values are stated.',
);
const vRepoChain = flow('LR', ['Repo rate cut', 'Banks\' funds cheaper', 'Lower loan rates', 'More borrowing and spending', 'AD rises'], 'Flow of a repo rate cut: banks get funds more cheaply, lower their loan rates, households and firms borrow and spend more, and aggregate demand rises', 'Monetary transmission (deficient demand)');
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Equilibrium', 'AD = AS, or S = I'], ['Off equilibrium', 'Unplanned stock changes push output back'], ['Multiplier', 'k = 1 ÷ (1 − MPC) = 1 ÷ MPS'], ['Change in income', 'ΔY = k × ΔI'], ['Range of k', 'From 1 upwards; larger when MPC is higher']],
  'Summary table of Part 1: equilibrium where aggregate demand equals aggregate supply or saving equals investment; unplanned changes in stocks push output back; the multiplier is one over the marginal propensity to save; income changes by the multiplier times the change in investment',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Full employment', 'No involuntary unemployment'], ['Underemployment equilibrium', 'AD can settle below full employment'], ['Inflationary gap', 'AD > output at full employment: prices rise'], ['Deflationary gap', 'AD < output at full employment: jobs lost'], ['Cures', 'Fiscal and monetary tools, in opposite directions for each gap']],
  'Summary table of Part 2: full employment, underemployment equilibrium, inflationary and deflationary gaps, and fiscal and monetary cures',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Equilibrium Output, Multiplier and Problems of Demand — Part 1: Equilibrium and the Multiplier',
  goals: [
    'Find equilibrium income by the AD = AS and S = I approaches, from a schedule and a diagram',
    'Explain how output adjusts when planned spending and output differ',
    'Calculate the investment multiplier and the change in income, and explain its working round by round',
  ],
  slides: [
    sl('title', 'Equilibrium Output and the Multiplier', {
      b: 'Part 1 — how **equilibrium income** is fixed, how the economy **adjusts**, and how a change in investment is **multiplied** into a bigger change in income.',
      v: flow('LR', ['AD and AS', 'Two approaches', 'Adjustment', 'Multiplier', 'Rounds of spending'], 'Route map of Part 1: aggregate demand and supply, the two approaches to equilibrium, adjustment, the multiplier and its rounds of spending', 'Part 1 at a glance'),
      n: 'An economy produces goods, and households and firms plan to buy them. When planned buying matches production, output settles. In this part we find that settling point, called equilibrium income, in two ways. Then we see how a single new investment can raise income by several times its own size, through rounds of spending.',
    }),
    sl('concept', 'Equilibrium: planned spending equals output', {
      b: 'In a two-sector economy **AD = C + I** and **AS = Y** (the value of output). **Equilibrium income** is the income at which **AD = AS**.',
      v: vApproach,
      n: 'Aggregate demand is the total that households plan to consume plus what firms plan to invest. Aggregate supply is the value of what is produced, which equals the income earned. Income is in equilibrium when these two are equal. Because income is either spent or saved, the same point is where planned saving equals planned investment.',
    }),
    sl('example', 'Worked example 1: a schedule for Tarangpur', {
      b: `Imagined economy, ₹ crore: **C = ${T.a} + ${T.b}Y**, **I = ${T.I}**. Find the income where AD = Y.`,
      bl: ['Step 1 — AD = C + I at each income.', 'Step 2 — Compare AD with Y.', `Step 3 — AD = Y at **${T_Y}**; check S = I there.`],
      v: vSched,
      n: `Work down the schedule. At an income of four hundred, consumption is three hundred and eighty, so aggregate demand is four hundred and twenty, more than output. At six hundred, demand is only five hundred and eighty, less than output. Only at five hundred does demand equal income, and saving there is forty, matching investment.`,
    }),
    sl('diagram', 'The AD = AS diagram', {
      b: 'AS is the **forty-five degree line** (spending = income). AD starts at autonomous spending and is **flatter** (slope = MPC). Equilibrium is at **E**.',
      v: vADAS,
      n: 'On this diagram every point of the forty-five degree line has spending equal to income, so it represents aggregate supply. The aggregate demand line starts at one hundred, the autonomous spending, and rises more slowly, with slope equal to the marginal propensity to consume. Where it cuts the forty-five degree line, at five hundred, the economy is in equilibrium.',
    }),
    sl('check', 'Quick check: stocks running down', {
      b: 'Traders find stocks running down faster than planned. What happens next?',
      chk: 'm_unplanned_stock_fall',
      n: 'If goods are flying off the shelves faster than planned, is spending above or below output? How will firms react?',
    }),
    sl('diagram', 'The saving = investment diagram', {
      b: `Saving starts **below zero** (−${T.a}) and rises with slope MPS. It meets the **investment line** at the **same income**, ${T_Y}.`,
      v: vSI,
      n: 'The second approach looks at leakages and injections. Saving is money not spent, a leakage. Investment is spending added by firms, an injection. Saving starts negative at low incomes, crosses zero at the break-even income of three hundred, and meets investment of forty at an income of five hundred, the same equilibrium as before.',
    }),
    sl('concept', 'Below equilibrium: output rises', {
      b: 'If **AD > AS** (**I > S**), buyers take more than is produced. **Stocks fall** below plan, so firms **produce more**.',
      v: vAdjust,
      n: 'Suppose output is below equilibrium. Planned spending is greater than what is being produced, so shops and warehouses find their stocks shrinking unexpectedly. Firms respond by producing more and hiring more workers. Income rises, and it keeps rising until planned spending equals output again.',
    }),
    sl('concept', 'Above equilibrium: output falls', {
      b: 'If **AD < AS** (**S > I**), part of output is **unsold**. Stocks **pile up** beyond plan, so firms **cut production**.',
      v: vAdjustDown,
      n: 'Now suppose output is above equilibrium. Planned spending falls short of production, so unsold goods pile up beyond what firms planned to hold. Firms cut production and jobs. As income falls, saving falls too, until saving once more equals investment at equilibrium.',
    }),
    sl('check', 'Quick check: reading the diagram', {
      b: 'To the left of equilibrium, AD lies **above** the forty-five degree line. This means…',
      chk: 'm_ad_above_45',
      n: 'Remember that any point on the forty-five degree line has spending equal to output.',
    }),
    sl('concept', 'The investment multiplier', {
      b: '**k = ΔY ÷ ΔI**. A rise in investment raises income by **k times** as much. **k = 1 ÷ (1 − MPC) = 1 ÷ MPS**.',
      v: vKTable,
      n: 'The investment multiplier tells us how many times income rises for a given rise in investment. It depends on how much of any extra income people spend. If they spend nothing extra, the multiplier is one. If they spend most of it, the multiplier is large. That is why it equals one divided by the marginal propensity to save.',
    }),
    sl('check', 'Quick check: from the multiplier to the MPS', {
      b: 'An imagined hill economy has a multiplier of 4. Its MPS must be…',
      chk: 'm_k_mps_link',
      n: 'The multiplier is one divided by the marginal propensity to save. Turn that round.',
    }),
    sl('example', 'Worked example 2: rounds of extra income', {
      b: `A metro project adds **₹${RND.dI} crore** of investment; **MPC = ${RND.b}**.`,
      bl: [`Round 1: ${ROUNDS[0]} paid as wages and to suppliers.`, `Round 2: ${RND.b} × ${ROUNDS[0]} = ${ROUNDS[1]} spent, becoming others' income.`, `Round 3: ${ROUNDS[2]}; and so on.`, `Total: ${kOf(RND.b)} × ${RND.dI} = **${ROUNDS_TOTAL}**.`],
      v: vRoundTable,
      n: 'Follow the money. The project pays one hundred crore to workers and suppliers. They spend eighty per cent of it, eighty crore, which becomes income for shopkeepers and farmers. They in turn spend eighty per cent of that, sixty-four crore, and so on. The rounds get smaller, and together they add up to five hundred crore.',
    }),
    sl('diagram', 'The rounds shrink by the MPC', {
      v: vRounds,
      n: 'Here are the first six rounds as bars. Each bar is four-fifths of the one before, because one-fifth of every round leaks into saving. The bars never quite disappear, but they become tiny. Adding all of them gives five times the original hundred crore, which is the multiplier at work.',
    }),
    sl('check', 'Quick check: the third round', {
      b: 'What extra income is created in the **third** round in the metro example?',
      chk: 'n_round3',
      n: 'Multiply the first round by the marginal propensity to consume, and then again.',
    }),
    sl('example', 'Worked example 3: a new jetty in Tarangpur', {
      b: `Investment rises by **₹${T_DI} crore**. With **k = ${T_K}**, income rises by ${T_K} × ${T_DI} = **${r3(T_K * T_DI)}**, from ${T_Y} to **${T_Y2}**.`,
      v: vShift,
      n: 'In Tarangpur, a port company invests an extra twenty crore. The aggregate demand line shifts up by twenty, from AD one to AD two. The new equilibrium is at six hundred, one hundred higher. Twenty crore of new investment has raised income by one hundred crore, five times as much, because the multiplier is five.',
    }),
    sl('concept', 'The multiplier works both ways', {
      b: 'A **fall** in investment lowers income by **k times** the fall. The range of k is **1 to infinity**: 1 when MPC = 0, very large as MPC nears 1.',
      v: vKSteps,
      n: 'The same chain works in reverse. If investment falls, workers and suppliers lose income, spend less, and others lose income too. So income falls by the multiplier times the fall in investment. The multiplier is never below one, and it grows larger the closer the marginal propensity to consume comes to one.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Equilibrium income is where aggregate demand equals aggregate supply, or equivalently where saving equals investment. Unplanned changes in stocks push output towards that point. A change in investment changes income by the multiplier times as much, and the multiplier is one over the marginal propensity to save.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **both** conditions: AD = AS and S = I; show they give the same income.',
        'On diagrams, label the **forty-five degree line**, the **AD** line and the point **E** with its income.',
        'Do not confuse **break-even income** (C = Y) with **equilibrium** (C + I = Y).',
        'For the multiplier, write **k = 1 ÷ (1 − MPC)** and then **ΔY = k × ΔI**, with units.',
        'Explain adjustment through **unplanned changes in stocks**.',
      ],
      v: vApproach,
      n: 'Examiners reward complete answers. Give both conditions for equilibrium and show they agree. Label every line on your diagram and the equilibrium income. Do not mix up the break-even point of the consumption function with equilibrium. Write the multiplier formula before using it. And always explain adjustment through stocks that are larger or smaller than planned.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Equilibrium Output, Multiplier and Problems of Demand — Part 2: Full Employment and Problems of Demand',
  goals: [
    'Explain full employment and involuntary unemployment',
    'Show inflationary and deflationary gaps on a diagram and calculate them',
    'Explain the causes and effects of excess and deficient demand, and suggest fiscal and monetary measures',
  ],
  slides: [
    sl('title', 'Full Employment and Problems of Demand', {
      b: 'Part 2 — **full employment**, why equilibrium can fall **short** of it, **excess** and **deficient** demand, and the **measures** that correct them.',
      v: flow('LR', ['Full employment', 'Underemployment equilibrium', 'Deflationary gap', 'Inflationary gap', 'Fiscal and monetary cures'], 'Route map of Part 2: full employment, underemployment equilibrium, deflationary gap, inflationary gap, and fiscal and monetary cures', 'Part 2 at a glance'),
      n: 'Equilibrium income is not always the income a country wants. It may leave willing workers without jobs, or it may push prices up. In this part we compare equilibrium with full employment, measure the gap between them, and see how governments and central banks can close it.',
    }),
    sl('concept', 'Full employment', {
      b: '**Full employment**: all who are **able and willing to work at the prevailing wage** have work. It allows some **frictional** and **voluntary** idleness.',
      v: vFE,
      n: 'Full employment does not mean that every single person is working. It means that everyone who is able and willing to work at the going wage has a job. People moving between jobs, or choosing not to work at that wage, may still be idle. Involuntary unemployment, people who would work at the going wage but find no job, is what full employment rules out.',
    }),
    sl('concept', 'Equilibrium below full employment', {
      b: 'Keynes: equilibrium is fixed by **AD**. If planned spending is low, AD = AS **below** full-employment output: an **underemployment equilibrium**.',
      v: vUnderEq,
      n: 'Keynes argued that nothing guarantees equilibrium at full employment. Equilibrium is wherever planned spending equals output. If households and firms plan to spend too little, output settles at a level that employs fewer people than want work. Firms have no reason to expand, so involuntary unemployment can last.',
    }),
    sl('check', 'Quick check: excess demand at full employment', {
      b: 'An imagined economy at full employment sees demand jump. What happens mainly?',
      chk: 'm_excess_effect',
      n: 'If there are no idle workers or machines, can output rise? What else can give?',
    }),
    sl('diagram', 'Deficient demand: the deflationary gap', {
      b: `**Deflationary gap** = full-employment output − AD at that output. Hiranagar: **${H_YF_DEF} − ${H_AD(H_YF_DEF)} = ${H_GAP_DEF}**.`,
      v: vDefl,
      n: 'Here aggregate demand in Hiranagar cuts the forty-five degree line at three hundred, but full employment needs four hundred. At four hundred, planned spending is only three hundred and sixty. The shortfall of forty, measured at full employment, is the deflationary gap. It leaves output and jobs below their full-employment level.',
    }),
    sl('example', 'Worked example 1: measuring the gap in Hiranagar', {
      b: `AD = ${H.a + H.I} + ${H.b}Y; full-employment output **${H_YF_DEF}**.`,
      bl: [`Step 1 — AD at ${H_YF_DEF} = ${H.a + H.I} + ${H.b} × ${H_YF_DEF} = ${H_AD(H_YF_DEF)}.`, `Step 2 — Compare with ${H_YF_DEF}: AD is ${H_GAP_DEF} short.`, `Step 3 — Deflationary gap = ${H_GAP_DEF}; equilibrium is ${H_Y}, below full employment.`],
      v: vGapTable,
      n: 'Always measure the gap at the full-employment output, not at equilibrium. Put four hundred into the aggregate demand equation: one hundred and twenty plus two hundred and forty gives three hundred and sixty. That is forty short of four hundred, so the deflationary gap is forty crore.',
    }),
    sl('check', 'Quick check: effect of deficient demand', {
      b: 'Spending falls short of full-employment output. The most likely result is…',
      chk: 'm_defl_gap_effect',
      n: 'When goods go unsold, what do firms do about production and workers?',
    }),
    sl('diagram', 'Excess demand: the inflationary gap', {
      b: `**Inflationary gap** = AD at full employment − full-employment output. If Yf were ${H_YF_INF}: **${H_AD(H_YF_INF)} − ${H_YF_INF} = ${H_GAP_INF}**.`,
      v: vInfl,
      n: 'Suppose instead that full employment were reached at only two hundred and fifty. Planned spending at that output is two hundred and seventy, twenty more than can be produced. That excess, measured at full employment, is the inflationary gap. Since output cannot rise further, the extra demand pushes up prices.',
    }),
    sl('two-column', 'Causes and effects of the two gaps', {
      cols: [
        '**Excess demand** (inflationary gap)\n\n- Causes: more public spending, easy credit, higher exports, lower saving.\n- Effects: prices rise; no extra output or jobs.',
        '**Deficient demand** (deflationary gap)\n\n- Causes: lower investment or exports, more saving, tight credit.\n- Effects: output and jobs fall; involuntary unemployment.',
      ],
      v: vCauses,
      n: 'Excess demand comes from spending growing faster than capacity, for example through easy credit or large public spending. Its main effect is rising prices. Deficient demand comes from spending falling, for example when investment or exports drop. Its main effect is lost output and jobs.',
    }),
    sl('concept', 'Fiscal measures', {
      b: '**Fiscal policy** uses **government spending** and **taxes**. Against **excess** demand: spend less, tax more. Against **deficient** demand: spend more, tax less.',
      v: vMeasures,
      n: 'The government can change aggregate demand through its own budget. To cool excess demand, it can cut its spending and raise taxes, so people have less to spend. To lift deficient demand, it can spend more on public works and cut taxes. Public spending also works through the multiplier.',
    }),
    sl('concept', 'Monetary measures', {
      b: 'The **central bank** changes the **cost and availability of credit**: repo rate and bank rate, **CRR** and **SLR**, **open market operations**, and selective tools such as **margin requirements**.',
      v: vRepoChain,
      n: 'The central bank works through credit. Raising the repo rate or the reserve ratios, or selling securities, makes bank credit dearer and scarcer, which cools excess demand. Cutting them, or buying securities, makes credit cheaper and more plentiful, which helps when demand is deficient. Selective tools like margins target lending for particular goods.',
    }),
    sl('check', 'Quick check: the CRR', {
      b: 'To control excess demand, the central bank raises the CRR. How does this help?',
      chk: 'm_crr_excess',
      n: 'If banks must keep more of their deposits as cash with the central bank, what happens to their lending?',
    }),
    sl('example', 'Worked example 2: how much spending closes the gap?', {
      b: `Hiranagar: deflationary gap **${H_GAP_DEF}**, **k = ${H_K}**. Extra spending of **${H_GAP_DEF}** raises income by ${H_K} × ${H_GAP_DEF} = **${r3(H_K * H_GAP_DEF)}**, from ${H_Y} to **${H_YF_DEF}**.`,
      bl: ['The extra spending needed equals the **gap**, not the shortfall in income.', 'Spending the whole shortfall (100) would overshoot full employment and cause excess demand.'],
      v: flow('LR', [`Gap ${H_GAP_DEF}`, `Extra spending ${H_GAP_DEF}`, `Multiplier ${H_K}`, `Income +${r3(H_K * H_GAP_DEF)}`, `Full employment ${H_YF_DEF}`], 'Flow showing that extra spending of 40 crore rupees in Hiranagar, multiplied by 2.5, raises income by 100 to the full-employment level of 400', 'Closing the gap'),
      n: 'A common error is to think the government must add the whole shortfall in income, one hundred crore. But the multiplier is two and a half. Adding just forty crore of spending raises income by one hundred, exactly to full employment. Adding a hundred would overshoot and create excess demand.',
    }),
    sl('check', 'Quick check: a fiscal error', {
      b: 'True or false? Cutting income-tax rates suits an economy with excess demand.',
      chk: 'tf_tax_cut_excess',
      n: 'Ask whether a tax cut raises or lowers spending.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Full employment means no involuntary unemployment, but equilibrium can settle below it. An inflationary gap is excess demand at full employment and raises prices; a deflationary gap is deficient demand and costs jobs. Fiscal and monetary tools correct each gap when used in the right direction.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Measure gaps **at full-employment output**, not at equilibrium.',
        'On the gap diagram, mark **Yf**, the forty-five degree line and AD, and shade the **vertical** gap.',
        'For measures, always give the **direction** (raise or cut) and **how** it changes AD.',
        'Excess demand raises **prices**, not output; deficient demand cuts **output and jobs**.',
        'Do not quote current policy rates; explain the mechanism.',
      ],
      v: vMeasures,
      n: 'Measure every gap at the full-employment output. Draw the gap as a vertical distance at that output. When you suggest a measure, state whether it is raised or cut and how that changes aggregate demand. Remember which gap affects prices and which affects jobs. And explain how a tool works rather than quoting a current rate.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Equilibrium Output, Multiplier and Problems of Demand — Notes',
  sections: [
    {
      h: '1. Equilibrium income: AD = AS',
      t: 1,
      b: `- **AD = C + I** (two sectors); **AS = Y**, shown by the forty-five degree line.\n- Equilibrium: **AD = AS**. With C = a + bY and investment I, **Y = (a + I) ÷ (1 − b)**.\n- Imagined Tarangpur: C = ${T.a} + ${T.b}Y, I = ${T.I}, so Y = ${T.a + T.I} ÷ ${r3(1 - T.b)} = **${T_Y}**.\n- Break-even income (C = Y) is **${T_BE}**, a different point: there saving is zero, but investment is ${T.I}.`,
      terms: [['Equilibrium income', 'The income at which planned aggregate demand equals aggregate supply.'], ['Forty-five degree line', 'The line on which spending equals income; it represents aggregate supply.']],
      v: vADAS,
      vs: [vSched],
    },
    {
      h: '2. Equilibrium income: S = I, and adjustment',
      t: 1,
      b: '- AS = C + S and AD = C + I, so **AD = AS** is the same as **planned S = planned I**.\n- **AD > AS (I > S)**: stocks fall below plan, firms expand, income rises.\n- **AD < AS (S > I)**: unsold stocks build up, firms cut back, income falls.\n- The adjustment stops only at equilibrium.',
      terms: [['Leakage', 'Income not passed on as spending, such as saving.'], ['Injection', 'Spending added from outside consumption, such as investment.'], ['Unplanned inventory change', 'A rise or fall in stocks that firms did not intend; the signal that output is not at equilibrium.']],
      v: vSI,
      vs: [vAdjust, vAdjustDown],
    },
    {
      h: '3. The investment multiplier',
      t: 2,
      b: `- **k = ΔY ÷ ΔI = 1 ÷ (1 − MPC) = 1 ÷ MPS**.\n- **Working**: new investment becomes income; a share (the MPC) is spent and becomes others' income; rounds shrink by the MPC; their sum is k × ΔI.\n- Imagined metro project: ΔI = ${RND.dI}, MPC = ${RND.b}: rounds ${ROUNDS.slice(0, 4).join(', ')}…, total **${ROUNDS_TOTAL}**.\n- **Range**: k = 1 when MPC = 0; k grows without limit as MPC approaches 1. It works **backwards** too.\n- Tarangpur: ΔI = ${T_DI} raises income from ${T_Y} to **${T_Y2}**.`,
      terms: [['Investment multiplier', 'The number of times income changes for a given change in investment.'], ['Marginal propensity to save', 'The share of extra income that is saved; the multiplier is its reciprocal.']],
      v: vRounds,
      vs: [vKTable, vShift],
    },
    {
      h: '4. Full employment and involuntary unemployment',
      t: 3,
      b: '- **Full employment**: no involuntary unemployment; frictional and voluntary idleness can remain.\n- **Involuntary unemployment**: willing to work at the prevailing wage, but no work available.\n- In Keynesian theory equilibrium depends on **effective demand**, so the economy can rest at an **underemployment equilibrium** with output below its full-employment level.',
      terms: [['Full employment', 'A state in which all who are able and willing to work at the going wage are employed.'], ['Involuntary unemployment', 'Unemployment of people willing to work at the going wage who cannot find jobs.'], ['Underemployment equilibrium', 'An equilibrium in which output is below the full-employment level.']],
      v: vFE,
      vs: [vUnderEq],
    },
    {
      h: '5. Excess and deficient demand',
      t: 4,
      b: `- **Inflationary gap** (excess demand) = AD at full-employment output − that output. Main effect: **prices rise**, since output cannot.\n- **Deflationary gap** (deficient demand) = full-employment output − AD there. Effects: **output and employment fall**, involuntary unemployment.\n- Imagined Hiranagar, AD = ${H.a + H.I} + ${H.b}Y: with Yf = ${H_YF_DEF}, gap = **${H_GAP_DEF}** (deflationary); with Yf = ${H_YF_INF}, gap = **${H_GAP_INF}** (inflationary).\n- To close a deflationary gap, extra spending equal to the **gap** is enough: k × gap = ${H_K} × ${H_GAP_DEF} = ${r3(H_K * H_GAP_DEF)}.`,
      terms: [['Inflationary gap', 'The excess of aggregate demand over output at full employment.'], ['Deflationary gap', 'The shortfall of aggregate demand below output at full employment.']],
      v: vDefl,
      vs: [vInfl, vGapTable, vCauses],
    },
    {
      h: '6. Measures to correct excess and deficient demand',
      t: 5,
      b: '- **Fiscal**: government spending and taxes (and public borrowing). Excess demand: spend less, tax more. Deficient demand: spend more, tax less.\n- **Monetary (quantitative)**: repo and bank rate, CRR and SLR, open market operations. Excess demand: raise rates and ratios, sell securities. Deficient demand: the reverse.\n- **Monetary (qualitative)**: margin requirements, credit rationing, moral suasion, direct action — aimed at particular uses of credit.\n- Fiscal steps change AD **directly**; monetary steps work **through borrowing**, which may respond slowly when expectations are weak.',
      terms: [['Fiscal policy', 'Changes in government spending and taxation to influence aggregate demand.'], ['Monetary policy', 'Changes in the cost and availability of credit by the central bank.'], ['Repo rate', 'The rate at which the central bank lends short-term funds to commercial banks.']],
      v: vMeasures,
      vs: [vRepoChain],
    },
  ],
  tips: '**Common mistakes**\n- Calling the break-even income (C = Y) the equilibrium income.\n- Measuring a gap at the equilibrium income instead of at full-employment output.\n- Saying the multiplier can be less than one.\n- Suggesting a tax cut or a repo cut for excess demand.\n- Saying excess demand at full employment raises output.\n\n**How marks are usually awarded**\n- 1 mark: one correct choice or a precise term.\n- 2 marks: a definition with an example, or two short points.\n- 3 marks: three steps of a calculation or three distinct points.\n- 5 marks: parts with working, a described diagram and reasons.\n\nAll economies and figures in SOYL practice are imagined; state units (₹ crore) in every answer.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Equilibrium income**', 'Where planned **AD = AS** (C + I = Y).', 'definition', 1],
  ['Equilibrium by leakages and injections', 'Planned **S = I**.', 'concept', 1],
  ['Why AD = AS and S = I agree', 'AD = C + I and AS = C + S; cancel C.', 'concept', 1],
  ['Equilibrium formula', 'Y = (a + I) ÷ (1 − b) for C = a + bY.', 'formula', 1],
  ['Tarangpur (imagined)', `C = ${T.a} + ${T.b}Y, I = ${T.I}: Y = **${T_Y}**.`, 'example', 1],
  ['Break-even vs equilibrium', `Break-even: C = Y (${T_BE} in Tarangpur). Equilibrium: C + I = Y (${T_Y}).`, 'exam-tip', 1],
  ['Stocks run down unexpectedly', 'AD > AS: output **rises**.', 'concept', 1],
  ['Stocks pile up unexpectedly', 'AD < AS: output **falls**.', 'concept', 1],
  ['The forty-five degree line', 'Spending = income: it represents **AS**.', 'fact', 1],
  ['**Investment multiplier**', '**k = ΔY ÷ ΔI**.', 'definition', 2],
  ['Multiplier formula', 'k = 1 ÷ (1 − MPC) = **1 ÷ MPS**.', 'formula', 2],
  ['MPC 0.8', 'k = **5**.', 'example', 2],
  ['MPC 0.75', 'k = **4**.', 'example', 2],
  ['Smallest possible multiplier', '**1**, when MPC = 0.', 'fact', 2],
  ['Multiplier as MPC nears 1', 'Becomes **very large**.', 'fact', 2],
  ['Rounds of spending', 'Each round = MPC × previous round; total = k × ΔI.', 'concept', 2],
  ['Metro project (imagined)', `ΔI ${RND.dI}, MPC ${RND.b}: rounds ${ROUNDS.slice(0, 3).join(', ')}…; total **${ROUNDS_TOTAL}**.`, 'example', 2],
  ['Does the multiplier work backwards?', '**Yes**: a fall in I cuts Y by k × ΔI.', 'concept', 2],
  ['**Full employment**', 'All able and **willing** to work at the going wage have jobs.', 'definition', 3],
  ['**Involuntary unemployment**', 'Willing to work at the going wage, but no job.', 'definition', 3],
  ['Underemployment equilibrium', 'AD = AS **below** full-employment output.', 'concept', 3],
  ['**Inflationary gap**', 'AD − output, measured **at full employment** (AD higher).', 'definition', 4],
  ['**Deflationary gap**', 'Output − AD, measured **at full employment** (AD lower).', 'definition', 4],
  ['Main effect of excess demand', '**Prices rise**; output cannot.', 'fact', 4],
  ['Main effect of deficient demand', '**Output and jobs fall**.', 'fact', 4],
  ['Hiranagar (imagined), Yf 400', `AD at 400 = ${H_AD(H_YF_DEF)}: deflationary gap **${H_GAP_DEF}**.`, 'example', 4],
  ['Spending needed to close a deflationary gap', 'Equal to the **gap** (the multiplier does the rest).', 'exam-tip', 4],
  ['Fiscal cure for excess demand', 'Cut government spending; **raise taxes**.', 'concept', 5],
  ['Monetary cure for deficient demand', '**Cut** repo rate and CRR; **buy** securities.', 'concept', 5],
  ['Qualitative credit tools', 'Margin requirements, credit rationing, moral suasion, direct action.', 'fact', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Equilibrium Output, Multiplier and Problems of Demand',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_eq_condition', 'm_k_from_mpc', 'm_full_emp', 'm_fiscal_excess', 'ar_k_mpc'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_two_approaches', { attempt: 1, keys: ['s_k_meaning', 's_gaps_compare'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_tarangpur_schedule', { attempt: 1, keys: ['s3_rounds', 's3_hira_gap'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_eq_both'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Equilibrium Output, Multiplier and Problems of Demand',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_unplanned_stock_rise', 'm_tarangpur_eq', 'm_k_range', 'm_dy_from_di', 'm_involuntary', 'm_eq_below_fe', 'm_infl_gap_meaning', 'm_hira_defl', 'm_repo_deficient', 'm_omo_sell', 'ar_s_gt_i', 'ar_defl_unemp'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_why_ad_as_same', 's_fe_meaning', { attempt: 1, keys: ['s_fiscal_deficient', 's_monetary_excess'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_si_adjust', 's3_k_range', 's3_infl_effects', { attempt: 1, keys: ['s3_qual_measures', 's3_hira_close'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working or described diagrams.', items: ['l_k_mechanism', { attempt: 1, keys: ['l_two_gaps', 'l_measures_deficient'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch12 only (equilibrium by AD = AS and S = I; investment multiplier; full employment and involuntary unemployment; excess and deficient demand; fiscal and monetary measures)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every economy, person, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused; set-ups differ from SOYL CBSE 12 Economics ch03',
    data: `figures computed in questions.mjs and asserted: Tarangpur C = ${T.a} + ${T.b}Y, I = ${T.I}: Y = ${T_Y}, k = ${T_K}, break-even ${T_BE}, ΔI ${T_DI} gives ${T_Y2}; Hiranagar AD = ${H.a + H.I} + ${H.b}Y: Y = ${H_Y}, k = ${H_K}, deflationary gap ${H_GAP_DEF} at Yf ${H_YF_DEF}, inflationary gap ${H_GAP_INF} at Yf ${H_YF_INF}; metro rounds ${ROUNDS.join(', ')}, total ${ROUNDS_TOTAL}`,
    facts: 'policy tools given as directions only (repo and bank rate, CRR, SLR, open market operations, margin requirements); no current rates or statistics',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
