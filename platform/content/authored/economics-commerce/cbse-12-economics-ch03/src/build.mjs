// Build CBSE 12 Economics ch03 Determination of Income and Employment. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch03', 'economics-commerce');
const { r3, f, eqY, K } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- the deck economy (imagined, ₹ crore)
// C = 100 + 0.75Y, I = 50: break-even 400, equilibrium 600, K = 4; ΔI = 20 gives ΔY = 80.
const A = 100, B = 0.75, I0 = 50, DI = 20;
const BE = r3(A / (1 - B));
const YE = eqY(A, B, I0);
const KK = K(B);
const YE2 = r3(YE + KK * DI);
const cons = (y) => A + B * y;
const sav = (y) => -A + (1 - B) * y;
// Gap economy: AD = 240 + 0.5Y (C = 180 + 0.5Y, I = 60), equilibrium 480.
const GA = 180, GB = 0.5, GI = 60;
const GYE = eqY(GA, GB, GI);
const gAD = (y) => GA + GB * y + GI;
const YF_EX = 360; // full employment below equilibrium → excess demand
const YF_DEF = 600; // full employment above equilibrium → deficient demand
const GAP_EX = r3(gAD(YF_EX) - YF_EX);
const GAP_DEF = r3(YF_DEF - gAD(YF_DEF));
const GK = K(GB);
if (YE !== 600 || BE !== 400 || KK !== 4 || YE2 !== 680 || GYE !== 480 || GAP_EX !== 60 || GAP_DEF !== 60 || GK !== 2) throw new Error('deck economy numbers changed: update the narration');

// ---------------------------------------------------------------- SVG figures
/** 45° figure: equal data ranges on both axes and a square plot area. */
function square(max, xLabel, yLabel) {
  const s = new Svg(470, 410);
  const c = s.chart({ x1: max, y1: max, left: 70, top: 34, width: 320, height: 320, xLabel, yLabel });
  return { s, c };
}
/** Saving/investment figure: the income axis is drawn at zero, so negative saving shows below it. */
function savingFrame(xmax, ymin, ymax) {
  const s = new Svg(470, 350);
  const left = 70, top = 34, width = 320, height = 270;
  const X = (x) => left + (x / xmax) * width;
  const Y = (y) => top + height - ((y - ymin) / (ymax - ymin)) * height;
  s.arrow(X(0), Y(0), X(xmax) + 14, Y(0), { sw: 1.6 });
  s.line(X(0), top + height, X(0), Y(0), { sw: 1.6 });
  s.arrow(X(0), Y(0), X(0), top - 10, { sw: 1.6 });
  s.text(X(0) - 10, Y(0) + 14, 'O', { size: 13 });
  s.text(X(xmax) + 10, Y(0) + 22, 'Income (Y)', { anchor: 'end', size: 13 });
  s.text(X(0) + 8, top - 12, 'S, I', { anchor: 'start', size: 13 });
  const fn = (g, a, b, o) => { const pts = []; for (let i = 0; i <= 40; i++) { const x = a + ((b - a) * i) / 40; pts.push([X(x), Y(g(x))]); } s.polyline(pts, o); };
  return { s, X, Y, fn };
}

const vConsumption = (() => {
  const { s, c } = square(800, 'Income (Y)', 'Consumption (C)');
  c.fn((x) => x, 0, 780, { color: 'muted', dash: true, sw: 1.6 }).label([780, 780], '45° line (C = Y)', { anchor: 'end', dx: -6, dy: -12, size: 12 });
  c.fn(cons, 0, 780, { color: 'accent', sw: 2.6 }).label([780, cons(780)], 'C = 100 + 0.75Y', { anchor: 'end', dx: 0, dy: 18, size: 13, color: 'accent' });
  c.drop([BE, BE]).dot([BE, BE], 'accent').label([BE, BE], 'B (break-even)', { anchor: 'start', dx: 10, dy: 16, size: 12 });
  c.xTick(BE, String(BE)).yTick(A, '100').yTick(BE, String(BE));
  c.label([150, 330], 'C > Y: dissaving', { size: 12, muted: true });
  c.label([620, 430], 'C < Y: saving', { size: 12, muted: true });
  return s.visual(
    `Consumption curve C = 100 + 0.75Y starting at 100 on the vertical axis, with a dashed 45-degree line. They cross at B, income ${BE}, the break-even point; to the left consumption exceeds income (dissaving), to the right income exceeds consumption (saving)`,
    'Imagined economy, ₹ crore. Autonomous consumption 100; slope (MPC) 0.75.',
  );
})();

const vSaving = (() => {
  const { s, X, Y, fn } = savingFrame(800, -140, 200);
  fn(sav, 0, 780, { color: 'accent', sw: 2.6 });
  s.text(X(780), Y(sav(780)) - 14, 'S = −100 + 0.25Y', { anchor: 'end', size: 13, color: 'accent' });
  s.dot(X(BE), Y(0), 4, 'accent');
  s.text(X(BE), Y(0) - 14, `B (Y = ${BE}, S = 0)`, { size: 12 });
  s.line(X(0) - 5, Y(-A), X(0), Y(-A), { sw: 1.2 });
  s.text(X(0) - 8, Y(-A), '−100', { anchor: 'end', size: 12 });
  s.text(X(170), Y(-95), 'negative saving', { size: 12, muted: true });
  s.text(X(620), Y(150), 'positive saving', { size: 12, muted: true });
  return s.visual(
    `Saving curve S = −100 + 0.25Y: it starts at minus 100 when income is zero, rises with slope 0.25 (the MPS), crosses the income axis at B where income is ${BE}, and is positive beyond it`,
    'The saving curve is the mirror of the consumption curve: S = Y − C.',
  );
})();

const vADAS = (() => {
  const { s, c } = square(800, 'Income, output (Y)', 'AD, AS');
  c.fn((x) => x, 0, 780, { sw: 2 }).label([760, 760], 'AS (45° line)', { anchor: 'end', dx: -10, dy: -12, size: 12 });
  c.fn(cons, 0, 780, { color: 'muted', dash: true, sw: 1.6 }).label([780, cons(780)], 'C', { anchor: 'start', dx: 6, size: 12, muted: true });
  c.fn((x) => cons(x) + I0, 0, 780, { color: 'accent', sw: 2.6 }).label([780, cons(780) + I0], 'AD = C + I', { anchor: 'start', dx: 6, dy: -4, size: 12, color: 'accent' });
  c.drop([YE, YE]).dot([YE, YE], 'accent').label([YE, YE], 'E', { dx: -12, dy: -12, bold: true });
  c.xTick(YE, String(YE)).yTick(A + I0, '150').yTick(A, '100');
  c.label([120, 330], 'AD > AS', { size: 12, muted: true }).label([700, 520], 'AD < AS', { size: 12, muted: true });
  return s.visual(
    `AD–AS diagram: the 45-degree line is aggregate supply; the consumption line starts at 100 and the AD line (C plus investment of 50) starts at 150 and runs parallel to it. AD cuts the 45-degree line at E, where income is ${YE}; to the left AD exceeds AS, to the right AD falls short of AS`,
    'Imagined economy, ₹ crore: C = 100 + 0.75Y, I = 50.',
  );
})();

const vSI = (() => {
  const { s, X, Y, fn } = savingFrame(800, -140, 200);
  fn(sav, 0, 780, { color: 'accent', sw: 2.6 });
  s.text(X(780), Y(sav(780)) - 14, 'S', { anchor: 'end', size: 13, color: 'accent' });
  s.line(X(0), Y(I0), X(780), Y(I0), { color: 'blue', sw: 2.4 });
  s.text(X(780), Y(I0) + 14, 'I = 50', { anchor: 'end', size: 13, color: 'blue' });
  s.line(X(YE), Y(I0), X(YE), Y(0), { sw: 1.2, dash: true, color: 'muted' });
  s.dot(X(YE), Y(I0), 4, 'accent');
  s.text(X(YE) - 12, Y(I0) - 14, 'E', { bold: true });
  s.text(X(YE), Y(0) + 16, String(YE), { size: 12 });
  s.text(X(300), Y(110), 'I > S: income rises', { size: 12, muted: true });
  s.text(X(560), Y(-95), 'S > I: income falls', { size: 12, muted: true });
  return s.visual(
    `Saving–investment diagram: the saving curve rises from minus 100; investment is a horizontal line at 50. They meet at E, where income is ${YE}; to the left investment exceeds saving and income rises, to the right saving exceeds investment and income falls`,
    'Same economy: planned S = planned I at Y = 600.',
  );
})();

const vMultiplier = (() => {
  const { s, c } = square(800, 'Income (Y)', 'AD, AS');
  c.fn((x) => x, 0, 780, { sw: 2 }).label([770, 770], 'AS', { anchor: 'end', dx: -10, dy: -10, size: 12 });
  c.fn((x) => cons(x) + I0, 0, 780, { color: 'muted', sw: 2 }).label([780, cons(780) + I0], 'AD₁', { anchor: 'start', dx: 6, dy: 8, size: 12 });
  c.fn((x) => cons(x) + I0 + DI, 0, 780, { color: 'accent', sw: 2.6 }).label([780, cons(780) + I0 + DI], 'AD₂', { anchor: 'start', dx: 6, dy: -8, size: 12, color: 'accent' }).label([40, 700], 'AD₂ = AD₁ + ΔI (ΔI = 20)', { anchor: 'start', size: 12, color: 'accent' });
  c.drop([YE, YE]).drop([YE2, YE2]).dot([YE, YE]).dot([YE2, YE2], 'accent');
  c.label([YE, YE], 'E₁', { dx: -14, dy: -10, bold: true }).label([YE2, YE2], 'E₂', { dx: -14, dy: -12, bold: true });
  c.xTick(YE, String(YE)).xTick(YE2, String(YE2));
  c.label([(YE + YE2) / 2, 60], `ΔY = ${YE2 - YE}`, { size: 12, color: 'accent' });
  return s.visual(
    `Multiplier diagram: AD shifts up by 20 from AD1 to AD2. Equilibrium moves along the 45-degree line from E1 at income ${YE} to E2 at income ${YE2}, so income rises by ${YE2 - YE}, four times the rise in investment`,
    `ΔI = ${DI}, K = ${KK}, ΔY = ${KK} × ${DI} = ${YE2 - YE}.`,
  );
})();

function gapFigure(yf, kind) {
  const { s, c } = square(700, 'Income, output (Y)', 'AD, AS');
  c.fn((x) => x, 0, 680, { sw: 2 }).label([680, 680], 'AS', { anchor: 'end', dx: -10, dy: -10, size: 12 });
  c.fn(gAD, 0, 680, { color: 'accent', sw: 2.6 }).label([680, gAD(680)], 'AD', { anchor: 'start', dx: 6, size: 12, color: 'accent' });
  const top = Math.max(yf, gAD(yf)), bot = Math.min(yf, gAD(yf));
  c.seg([yf, 0], [yf, bot], { dash: true, color: 'muted', sw: 1.2 });
  c.seg([yf, bot], [yf, top], { color: 'red', sw: 3.2 });
  c.dot([yf, yf]).dot([yf, gAD(yf)], 'accent');
  c.label([yf, yf], 'F', { dx: 12, dy: kind === 'excess' ? 10 : -10, bold: true });
  c.label([yf, gAD(yf)], kind === 'excess' ? 'G' : 'H', { dx: 12, dy: kind === 'excess' ? -8 : 10, bold: true });
  c.xTick(yf, 'Y_F').xTick(GYE, String(GYE));
  c.dot([GYE, GYE], 'muted');
  c.label([GYE, GYE], 'E', { dx: -12, dy: -10 });
  c.label([20, 640], kind === 'excess' ? `FG = inflationary gap = ${GAP_EX}` : `FH = deflationary gap = ${GAP_DEF}`, { anchor: 'start', size: 12, color: 'red' });
  return s;
}
const vExcess = gapFigure(YF_EX, 'excess').visual(
  `Excess demand diagram: full-employment output Y_F is ${YF_EX}. At Y_F, the AD line (point G, ${gAD(YF_EX)}) lies above the 45-degree AS line (point F, ${YF_EX}); the vertical distance FG of ${GAP_EX} is the inflationary gap. AD cuts AS only at ${GYE}, beyond what the economy can produce`,
  `Imagined economy: AD = 240 + 0.5Y, full employment at ${YF_EX} (₹ crore).`,
);
const vDeficient = gapFigure(YF_DEF, 'deficient').visual(
  `Deficient demand diagram: full-employment output Y_F is ${YF_DEF}. At Y_F, the AD line (point H, ${gAD(YF_DEF)}) lies below the 45-degree AS line (point F, ${YF_DEF}); the vertical distance FH of ${GAP_DEF} is the deflationary gap. AD cuts AS at ${GYE}, short of full employment`,
  `Same AD = 240 + 0.5Y, but full employment at ${YF_DEF} (₹ crore).`,
);

// ---------------------------------------------------------------- tables and flows
const schedYs = [0, 200, 400, 600, 800];
const vSchedule = table(
  ['Income Y', 'Consumption C', 'Saving S', 'APC = C ÷ Y', 'MPC = ΔC ÷ ΔY'],
  schedYs.map((y, i) => [String(y), String(cons(y)), String(sav(y)), y ? String(r3(cons(y) / y)) : '—', i ? String(r3((cons(y) - cons(schedYs[i - 1])) / (y - schedYs[i - 1]))) : '—']),
  'Schedule for C = 100 + 0.75Y at incomes 0 to 800: consumption 100, 250, 400, 550, 700; saving minus 100, minus 50, 0, 50, 100; APC falls from 1.25 to 0.875 while MPC stays 0.75',
  'Imagined economy, ₹ crore. APC falls as income rises; MPC is constant for a straight-line consumption function.',
);
const vWE1 = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. MPC', `(${cons(600)} − ${cons(400)}) ÷ (600 − 400)`, String(B)],
    ['2. MPS', `1 − ${B}`, String(r3(1 - B))],
    ['3. APC at Y = 600', `${cons(600)} ÷ 600`, String(r3(cons(600) / 600))],
    ['4. APS at Y = 600', `${sav(600)} ÷ 600 (check: 1 − APC)`, String(r3(sav(600) / 600))],
  ],
  `Worked example table: MPC equals 150 divided by 200, which is 0.75; MPS is 0.25; at income 600 the APC is ${r3(cons(600) / 600)} and the APS is ${r3(sav(600) / 600)}`,
);
const vWE2 = table(
  ['Step', 'Working', 'Result (₹ crore)'],
  [
    ['1. Condition', 'Y = C + I', '—'],
    ['2. Substitute', `Y = ${A} + ${B}Y + ${I0}`, '—'],
    ['3. Solve', `${r3(1 - B)}Y = ${A + I0}`, `Y = ${YE}`],
    ['4. Check by S = I', `S = −${A} + ${r3(1 - B)} × ${YE}`, `S = ${sav(YE)} = I`],
  ],
  `Worked example table: setting Y equal to C plus I gives 0.25Y equal to 150, so equilibrium income is ${YE}; saving at that income is ${sav(YE)}, equal to investment`,
);
const rounds = [DI];
for (let i = 1; i < 4; i++) rounds.push(r3(rounds[i - 1] * B));
const vRounds = table(
  ['Round', 'Extra income (₹ crore)', 'Re-spent (MPC 0.75)', 'Saved (MPS 0.25)'],
  [
    ...rounds.map((x, i) => [String(i + 1), String(x), String(r3(x * B)), String(r3(x * (1 - B)))]),
    ['…', '…', '…', '…'],
    ['**Total**', `**${f(KK * DI)}**`, `**${f(KK * DI * B)}**`, `**${f(KK * DI * (1 - B))} = ΔI**`],
  ],
  `Rounds of the multiplier for an extra investment of 20 with MPC 0.75: extra incomes of 20, 15, 11.25, 8.44 and so on, adding up to 80; total saving generated is 20, equal to the extra investment`,
  'Each round is 0.75 of the one before; the rounds add up to K × ΔI.',
);
const vWE3 = table(
  ['Question', 'Working', 'Answer'],
  [
    ['Multiplier', `K = 1 ÷ (1 − ${B})`, String(KK)],
    ['Rise in income', `ΔY = ${KK} × ${DI}`, `${KK * DI}`],
    ['New equilibrium', `${YE} + ${KK * DI}`, `${YE2}`],
    ['Check', `AD at ${YE2}: ${A} + ${B} × ${YE2} + ${I0 + DI}`, `${r3(cons(YE2) + I0 + DI)} = ${YE2}`],
  ],
  `Worked example table: the multiplier is 4, so a rise in investment of 20 raises income by 80, from ${YE} to ${YE2}; aggregate demand at ${YE2} equals ${YE2}`,
);
const vAssume = table(
  ['Assumption', 'What it means here'],
  [
    ['Two-sector economy', 'Only households and firms: AD = C + I'],
    ['Short run, prices fixed', 'Output responds to demand; prices do not change'],
    ['Spare capacity', 'Firms can raise output if demand rises (until full employment)'],
    ['Autonomous investment', 'Planned investment does not depend on income'],
  ],
  'Table of the assumptions: a two-sector economy, short run with fixed prices, spare capacity, and autonomous investment',
);
const vComponents = table(
  ['Economy', 'Aggregate demand', 'Aggregate supply'],
  [
    ['Two-sector (households, firms)', 'C + I', 'C + S (= Y)'],
    ['Open, with government', 'C + I + G + (X − M)', 'value of output (= Y)'],
  ],
  'Table: in a two-sector economy AD is C plus I and AS is C plus S; in an open economy with a government, AD is C plus I plus G plus net exports',
);
const vASflow = flow('LR', ['Firms produce output worth Y', 'Output creates income Y for households', 'Income is consumed (C) or saved (S)', 'AS = Y = C + S'], 'Flow: output worth Y creates income Y, which is either consumed or saved, so aggregate supply equals C plus S', 'Why AS = C + S');
const vAdjust = table(
  ['Situation', 'Stocks (inventories)', 'Firms respond', 'Income'],
  [
    ['AD > AS', 'Fall below the planned level', 'Raise output and hire more', 'Rises towards E'],
    ['AD = AS', 'As planned', 'No change', 'Equilibrium'],
    ['AD < AS', 'Pile up above the planned level', 'Cut output and jobs', 'Falls towards E'],
  ],
  'Table of adjustment: when AD exceeds AS, stocks fall and firms raise output; when AD equals AS there is no change; when AD is below AS, stocks pile up and firms cut output',
);
const vRoute1 = flow('LR', ['Aggregate demand and supply', 'Consumption and saving', 'Equilibrium income', 'The multiplier'], 'Route map of Part 1: aggregate demand and supply, consumption and saving, equilibrium income, the multiplier', 'Part 1 at a glance');
const vSummary1 = table(
  ['Idea', 'Key relation'],
  [
    ['Aggregate demand', 'AD = C + I (planned)'],
    ['Aggregate supply', 'AS = C + S = Y'],
    ['Propensities', 'APC + APS = 1; MPC + MPS = 1'],
    ['Equilibrium', 'AD = AS, or planned S = planned I'],
    ['Equilibrium income', 'Y = (c̄ + I) ÷ (1 − MPC)'],
    ['Multiplier', 'K = ΔY ÷ ΔI = 1 ÷ MPS'],
  ],
  'Summary table of Part 1: AD equals C plus I; AS equals C plus S; APC plus APS and MPC plus MPS each equal 1; equilibrium where AD equals AS or saving equals investment; equilibrium income formula; multiplier equals 1 divided by MPS',
);
const vRoute2 = flow('LR', ['Full employment', 'Involuntary unemployment', 'Excess demand', 'Deficient demand', 'Fiscal and monetary measures'], 'Route map of Part 2: full employment, involuntary unemployment, excess demand, deficient demand, and fiscal and monetary measures', 'Part 2 at a glance');
const vFullEmp = table(
  ['Full employment means', 'It does not mean'],
  [
    ['Everyone able and willing to work at the going wage has work', 'Every person in the country has a job'],
    ['No involuntary unemployment', 'Zero unemployment: people between jobs or choosing not to work still exist'],
    ['Output is at its maximum with existing resources', 'Output can be raised further just by raising demand'],
  ],
  'Two-column table: full employment means everyone willing to work at the going wage has work, no involuntary unemployment and maximum output; it does not mean every person has a job or that unemployment is zero',
);
const vExcessFlow = flow('TB', ['AD exceeds AS at full employment', 'Output cannot rise: no idle resources', 'Buyers compete for limited goods', 'Prices rise: inflation'], 'Flow: excess demand at full employment cannot raise output, so buyers compete for limited goods and prices rise', 'Effects of excess demand');
const vDefFlow = flow('TB', ['AD falls short of AS at full employment', 'Unsold stocks pile up', 'Firms cut output and jobs', 'Involuntary unemployment; prices tend to fall'], 'Flow: deficient demand leads to unsold stocks, cuts in output and jobs, involuntary unemployment and falling prices', 'Effects of deficient demand');
const vWEgap1 = table(
  ['Step', 'Working (₹ crore)', 'Result'],
  [
    ['1. AD at full employment', `${GA} + ${GB} × ${YF_EX} + ${GI}`, String(gAD(YF_EX))],
    ['2. AS at full employment', 'output Y_F', String(YF_EX)],
    ['3. Gap', `${gAD(YF_EX)} − ${YF_EX}`, `${GAP_EX}: inflationary`],
    ['4. Meaning', 'output is stuck at Y_F', 'prices rise'],
  ],
  `Worked example table: AD at the full-employment output of ${YF_EX} is ${gAD(YF_EX)}, so excess demand, the inflationary gap, is ${GAP_EX}`,
);
const vWEgap2 = table(
  ['Step', 'Working (₹ crore)', 'Result'],
  [
    ['1. AD at full employment', `${GA} + ${GB} × ${YF_DEF} + ${GI}`, String(gAD(YF_DEF))],
    ['2. Deflationary gap', `${YF_DEF} − ${gAD(YF_DEF)}`, String(GAP_DEF)],
    ['3. Income shortfall', `${YF_DEF} − ${GYE}`, String(YF_DEF - GYE)],
    ['4. Extra spending needed', `${YF_DEF - GYE} ÷ K, K = 1 ÷ (1 − ${GB}) = ${GK}`, `${r3((YF_DEF - GYE) / GK)} (equals the gap)`],
  ],
  `Worked example table: AD at the full-employment output of ${YF_DEF} is ${gAD(YF_DEF)}, a deflationary gap of ${GAP_DEF}; income falls short by ${YF_DEF - GYE}, and with a multiplier of 2 extra spending of ${GAP_DEF} closes it`,
);
const vFiscal = table(
  ['Fiscal tool', 'Excess demand', 'Deficient demand'],
  [
    ['Government expenditure', 'Cut', 'Raise (e.g. public works)'],
    ['Taxes', 'Raise', 'Cut'],
    ['Public borrowing from the public', 'Raise (absorbs spending power)', 'Reduce'],
  ],
  'Table of fiscal tools: for excess demand cut government spending, raise taxes and raise public borrowing; for deficient demand do the opposite',
);
const vMonetary = table(
  ['Monetary tool', 'Excess demand', 'Deficient demand'],
  [
    ['Repo rate / bank rate', 'Raise', 'Lower'],
    ['Cash reserve ratio (CRR)', 'Raise', 'Lower'],
    ['Statutory liquidity ratio (SLR)', 'Raise', 'Lower'],
    ['Open market operations', 'Sell securities', 'Buy securities'],
    ['Margin requirement', 'Raise', 'Lower'],
  ],
  'Table of monetary tools: against excess demand raise the repo or bank rate, CRR, SLR and margin requirements and sell securities; against deficient demand lower them and buy securities',
);
const vWEpolicy = table(
  ['Report (imagined economies)', 'Problem', 'One fiscal step', 'One monetary step'],
  [
    ['Prices rising fast; factories at full capacity', 'Excess demand', 'Postpone new government buildings', 'Raise the repo rate'],
    ['Rising unsold stocks; layoffs', 'Deficient demand', 'More spending on rural roads', 'Lower the CRR'],
  ],
  'Worked example table: rising prices with full capacity show excess demand, met by cutting government building and raising the repo rate; rising stocks and layoffs show deficient demand, met by more spending on roads and a lower CRR',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Full employment', 'No involuntary unemployment'],
    ['Involuntary unemployment', 'Willing to work at the going wage, but no job'],
    ['Excess demand', 'AD > AS at Y_F: inflationary gap; prices rise'],
    ['Deficient demand', 'AD < AS at Y_F: deflationary gap; output, jobs fall'],
    ['Fiscal measures', 'Government spending, taxes, borrowing'],
    ['Monetary measures', 'Repo/bank rate, CRR, SLR, OMO, margins'],
  ],
  'Summary table of Part 2: full employment, involuntary unemployment, excess demand with an inflationary gap, deficient demand with a deflationary gap, fiscal measures and monetary measures',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Determination of Income and Employment — Part 1: Aggregate Demand, Propensities and the Multiplier',
  goals: [
    'Identify the components of aggregate demand and aggregate supply, and distinguish ex-ante from ex-post values',
    'Calculate APC, MPC, APS and MPS and read consumption and saving curves',
    'Find equilibrium income by the AD = AS and saving = investment approaches',
    'Explain the investment multiplier and use K = 1 ÷ (1 − MPC)',
  ],
  slides: [
    sl('title', 'Determination of Income and Employment', {
      b: 'Part 1 — **aggregate demand**, **consumption and saving**, **equilibrium income** and the **multiplier**.',
      v: vRoute1,
      n: 'Namaste! Why does an economy sometimes produce less than it could, leaving willing workers without jobs? In this chapter we follow a simple short-run model of the economy. We begin with aggregate demand, look at how households divide income between spending and saving, find the level of income at which the economy settles, and see how one rupee of new investment can raise income by several rupees.',
    }),
    sl('concept', 'The short-run model and its assumptions', {
      b: 'We study a **short-run** model in which **demand decides output**.',
      v: vAssume,
      n: 'To keep the model simple, we make four assumptions. There are only two sectors, households and firms. We look at the short run, in which prices stay fixed. Firms have spare capacity, so they can produce more if buyers want more. And investment is autonomous, meaning firms decide it for reasons other than current income. Under these assumptions, the level of output is decided by how much people plan to buy.',
    }),
    sl('concept', 'Aggregate demand and its components', {
      b: '**Aggregate demand (AD)** is the total **planned** expenditure on final goods and services in an economy during a period.',
      bl: ['**C**: planned consumption by households', '**I**: planned investment by firms', 'With a government and foreign trade: add **G** and **(X − M)**'],
      v: vComponents,
      n: 'Aggregate demand is the total planned spending on final goods and services. In our two-sector economy it has two parts: consumption by households and investment by firms. In a fuller model we would add government spending and net exports, that is, exports minus imports. Notice the word planned. Aggregate demand is about what buyers intend to spend at each level of income, not what they finally spent.',
    }),
    sl('two-column', 'Ex-ante and ex-post', {
      cols: [
        '**Ex-ante (planned)**\n\n- What households and firms **intend** to spend or save\n- Decided before the period\n- Aggregate demand is ex-ante',
        '**Ex-post (actual)**\n\n- What **actually** happened\n- Measured after the period\n- Includes **unplanned** changes in stocks',
      ],
      n: 'Economists separate plans from outcomes. Ex-ante means planned: what firms intend to invest and households intend to consume or save. Ex-post means actual: what really happened by the end of the year. The two can differ. If buyers purchase less than expected, unsold goods pile up in warehouses. These unplanned stocks are counted as actual investment, even though no firm planned them.',
    }),
    sl('check', 'Quick check: autonomous investment', {
      b: 'What does it mean to call investment **autonomous**?',
      chk: 'm_autonomous_inv',
      n: 'Think about what autonomous investment depends on, and what it does not depend on.',
    }),
    sl('concept', 'Aggregate supply', {
      b: '**Aggregate supply (AS)** is the value of output, which equals the **income** it generates: **AS = Y = C + S**.',
      v: vASflow,
      n: 'Aggregate supply is the value of all goods and services firms produce. Producing this output creates an equal amount of income for households, as wages, rent, interest and profit. Households either consume this income or save it. So aggregate supply can be written as consumption plus saving, and it equals national income. On a diagram, we show aggregate supply as the forty-five degree line.',
    }),
    sl('diagram', 'The consumption function', {
      b: 'C = c̄ + bY: **c̄** is autonomous consumption, **b** is the MPC.',
      v: vConsumption,
      n: 'Consumption depends on income. Even at zero income, people must eat, so there is some autonomous consumption, here 100 crore rupees, financed by past savings or borrowing. As income rises, consumption rises, but by less than income. Here it rises by 75 paise for every extra rupee. The consumption line meets the forty-five degree line at B, the break-even point, where consumption equals income at 400 crore.',
    }),
    sl('concept', 'Average and marginal propensity to consume', {
      bl: ['**APC** = C ÷ Y: the share of total income consumed', '**MPC** = ΔC ÷ ΔY: the share of **extra** income consumed', '0 < MPC < 1; APC can be **more than 1** below break-even', 'APC **falls** as income rises; MPC stays constant on a straight line'],
      v: vSchedule,
      n: 'Two ratios describe consumption. The average propensity to consume is total consumption divided by total income. The marginal propensity to consume is the change in consumption divided by the change in income. In this schedule, the marginal propensity stays at 0.75 throughout, but the average propensity falls from 1.25 to below 0.9. Below the break-even income, average propensity is more than one, because households dissave.',
    }),
    sl('diagram', 'The saving function', {
      b: 'S = Y − C = −c̄ + (1 − b)Y. **APS** = S ÷ Y; **MPS** = ΔS ÷ ΔY.',
      bl: ['APC + APS = 1', 'MPC + MPS = 1'],
      v: vSaving,
      n: 'Whatever is not consumed is saved. So the saving curve starts at minus 100, because at zero income households use up 100 crore of past savings. It rises with a slope of 0.25, which is the marginal propensity to save, and crosses the income axis at the break-even point. Because income is either consumed or saved, the average propensities add up to one, and so do the marginal propensities.',
    }),
    sl('example', 'Worked example 1: the four propensities', {
      b: 'Using the schedule for C = 100 + 0.75Y, find MPC, MPS, APC and APS at an income of ₹600 crore.',
      bl: ['Use **changes** for marginal propensities and **totals** for average ones.', 'Check: APC + APS = 1 and MPC + MPS = 1.'],
      v: vWE1,
      n: 'Let us find all four propensities. Between incomes of 400 and 600, consumption rises by 150 while income rises by 200, so the marginal propensity to consume is 0.75 and the marginal propensity to save is 0.25. At an income of 600, consumption is 550, so the average propensity to consume is about 0.92, and the average propensity to save is about 0.08. The two pairs each add up to one.',
    }),
    sl('check', 'Quick check: MPS', {
      b: 'Calculate the marginal propensity to save from the change in income and consumption.',
      chk: 'm_mps_calc',
      n: 'First find the marginal propensity to consume from the changes, then subtract it from one.',
    }),
    sl('diagram', 'Equilibrium: AD = AS', {
      b: 'Income is in equilibrium where planned spending equals output: **AD = AS**.',
      v: vADAS,
      n: 'Now we put demand and supply together. The AD line is the consumption line raised by the investment of 50 crore. Aggregate supply is the forty-five degree line. They cross at E, where income is 600 crore. Only here do buyers plan to buy exactly what firms produce. To the left, demand is more than output; to the right, output is more than demand.',
    }),
    sl('concept', 'How the economy moves to equilibrium', {
      v: vAdjust,
      n: 'What if output is not at the equilibrium level? If demand is more than supply, firms sell from their stocks, which fall below the level they planned. They respond by producing more and hiring more workers, so income rises. If demand is less than supply, unsold goods pile up beyond plan, and firms cut output and jobs, so income falls. Either way, the economy moves towards the equilibrium point.',
    }),
    sl('diagram', 'Equilibrium: saving = investment', {
      b: 'An equivalent condition: **planned S = planned I**.',
      v: vSI,
      n: 'There is a second way to see equilibrium. Saving is money withdrawn from the spending stream; investment is spending injected into it. Equilibrium is where planned saving equals planned investment, here at the same income of 600 crore. To the left, investment exceeds saving, so demand exceeds output and income rises. To the right, saving exceeds investment and income falls. Both approaches give the same answer.',
    }),
    sl('example', 'Worked example 2: equilibrium income', {
      b: 'C = 100 + 0.75Y and I = 50 (₹ crore). Find equilibrium income and check it with S = I.',
      bl: ['Set **Y = C + I** and solve for Y.', 'Shortcut: **Y = (c̄ + I) ÷ (1 − MPC)**.', 'Always check with the other approach.'],
      v: vWE2,
      n: 'Let us solve it. At equilibrium, income equals consumption plus investment. So Y equals 100 plus 0.75 Y plus 50. Taking the income terms together, a quarter of Y equals 150, so Y is 600 crore rupees. Check it: saving at 600 is minus 100 plus a quarter of 600, which is 50, exactly equal to investment. Both methods agree.',
    }),
    sl('check', 'Quick check: equilibrium', {
      b: 'Find the equilibrium income for a new consumption function and investment.',
      chk: 'm_eq_calc',
      n: 'Set income equal to consumption plus investment, and solve. Be careful not to stop at the break-even income.',
    }),
    sl('concept', 'The investment multiplier', {
      b: '**K = ΔY ÷ ΔI = 1 ÷ (1 − MPC) = 1 ÷ MPS**',
      bl: ['Spending by one person is **income** for another.', 'Each round, a fraction (MPC) is **re-spent**; the rest leaks into saving.', 'Minimum K = 1 (MPC = 0); K grows as MPC rises.'],
      v: vRounds,
      n: 'Suppose firms invest 20 crore more. That money becomes the income of workers and suppliers. They spend three quarters of it, 15 crore, which becomes someone else’s income. Those people spend three quarters again, and so on. The rounds get smaller because a part is saved each time. Added together, income rises by 80 crore, four times the investment. That factor of four is the investment multiplier.',
    }),
    sl('diagram', 'The multiplier on the diagram', {
      v: vMultiplier,
      n: 'On the diagram, the extra investment shifts the AD line up by 20 crore. The new AD line cuts the forty-five degree line at a higher point. Income rises from 600 to 680 crore, an increase of 80, which is four times the shift. The flatter the slope of AD, that is the lower the marginal propensity to consume, the smaller this jump would be.',
    }),
    sl('example', 'Worked example 3: using the multiplier', {
      b: 'In the same economy, investment rises by ₹20 crore. Find K, the rise in income and the new equilibrium.',
      bl: ['K from the MPC', 'ΔY = K × ΔI', 'Check that AD = Y at the new income'],
      v: vWE3,
      n: 'With a marginal propensity to consume of 0.75, the multiplier is one divided by 0.25, which is four. So a rise in investment of 20 crore raises income by 80 crore, from 600 to 680. To check, work out aggregate demand at 680: 100 plus three quarters of 680 plus the new investment of 70 gives exactly 680. Demand equals output, so this is the new equilibrium.',
    }),
    sl('check', 'Quick check: the multiplier', {
      b: 'Use the multiplier to find the rise in income.',
      chk: 'm_di',
      n: 'Multiply the change in investment by the multiplier.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Here is Part 1 in brief. Aggregate demand is planned consumption plus planned investment; aggregate supply is consumption plus saving, which equals income. The average propensities add up to one, and so do the marginal ones. Income settles where aggregate demand equals aggregate supply, or where planned saving equals planned investment. And any change in investment changes income by the multiplier, one divided by the marginal propensity to save.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      bl: [
        'Write the **formula first**, then substitute, then the answer with **₹ crore**: marks are given for each step.',
        'Do not confuse **break-even** income (C = Y) with **equilibrium** income (AD = AS).',
        '**K = 1 ÷ MPS**, not 1 ÷ MPC; check that K ≥ 1.',
        'APC can be more than 1; MPC cannot (in the usual model).',
        'In diagrams, label the **axes**, the **45° line**, the curves and the equilibrium point **E**.',
        'Explain adjustment through **unplanned inventories**, not through prices (prices are fixed).',
      ],
      n: 'Some tips. In numericals, write the formula, substitute the figures and give the answer with its unit, because marks are given step by step. Do not mix up break-even income with equilibrium income. Remember that the multiplier is one divided by the marginal propensity to save. In diagrams, label every axis, curve and point. And when you explain how the economy reaches equilibrium, talk about unplanned stocks, not prices.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Determination of Income and Employment — Part 2: Full Employment, Excess and Deficient Demand',
  goals: [
    'Explain full employment, and distinguish voluntary and involuntary unemployment',
    'Explain excess demand and deficient demand with diagrams, and measure inflationary and deflationary gaps',
    'Suggest fiscal and monetary measures to correct excess and deficient demand',
  ],
  slides: [
    sl('title', 'Full employment and demand gaps', {
      b: 'Part 2 — **full employment**, **involuntary unemployment**, **excess** and **deficient demand**, and how policy corrects them.',
      v: vRoute2,
      n: 'In Part 1 we found the level of income at which an economy settles. But is that level good enough? In this part we compare the equilibrium with full employment. If demand is too high, prices rise; if it is too low, output and jobs are lost. We will measure these gaps and see how the government and the central bank can correct them.',
    }),
    sl('concept', 'Full employment', {
      b: '**Full employment**: everyone **able and willing to work at the prevailing wage** gets work.',
      v: vFullEmp,
      n: 'Full employment does not mean that every single person has a job. Some people are moving between jobs, and some choose not to work at the wage on offer. Full employment means that everyone who is able and willing to work at the prevailing wage finds work. At that point the economy is producing the most it can with its existing resources and technology.',
    }),
    sl('two-column', 'Voluntary and involuntary unemployment', {
      cols: [
        '**Voluntary unemployment**\n\n- A person **chooses** not to work at the going wage\n- e.g. waiting for a better-paid offer\n- Exists even at full employment',
        '**Involuntary unemployment**\n\n- A person is **willing to work at the going wage** but finds no job\n- Caused by too little demand\n- Absent at full employment',
      ],
      n: 'Unemployment comes in two kinds. Voluntary unemployment is a choice: someone turns down work at the going wage, perhaps hoping for a better offer. Involuntary unemployment is not a choice: the person would gladly work at the going wage, but there is no vacancy. Keynes argued that involuntary unemployment can last when aggregate demand is too low. It is this kind that policy tries to remove.',
    }),
    sl('check', 'Quick check: full employment', {
      b: 'Which statement describes full employment?',
      chk: 'm_full_emp',
      n: 'Look for the phrase about being willing to work at the prevailing wage.',
    }),
    sl('diagram', 'Equilibrium need not be at full employment', {
      b: 'In the short run, output is set by **AD**. Nothing forces AD = AS to happen at **full-employment output (Y_F)**.',
      v: vDeficient,
      n: 'Here is the key insight. In our short-run model, output is whatever buyers demand. The economy settles where aggregate demand meets the forty-five degree line, here at 480 crore. But full-employment output is 600 crore. So the economy can rest at an equilibrium with spare machines and involuntary unemployment, and nothing in the model pushes it up to full employment by itself.',
    }),
    sl('diagram', 'Excess demand', {
      b: '**Excess demand**: AD **exceeds** AS at the full-employment level of output. The excess is the **inflationary gap**.',
      v: vExcess,
      n: 'Now take the opposite case. Suppose full-employment output is only 360 crore, but at that output buyers plan to spend 420 crore. Aggregate demand is more than the economy can supply. The vertical distance between the two lines at full-employment output, 60 crore, is called the inflationary gap. Firms cannot produce more, because every willing worker already has a job.',
    }),
    sl('concept', 'Effects of excess demand', {
      v: vExcessFlow,
      bl: ['**Output**: unchanged (already at full employment)', '**Employment**: unchanged', '**Prices**: rise, which is inflation'],
      n: 'What does excess demand do? Since there are no idle resources, real output and employment cannot rise. Buyers compete for a fixed quantity of goods, so prices go up. That is why the gap is called inflationary. The money value of output rises, but the real quantity of goods does not. People with fixed incomes find that their money buys less.',
    }),
    sl('example', 'Worked example 1: measuring an inflationary gap', {
      b: 'An imagined economy has AD = 240 + 0.5Y (₹ crore) and full-employment output of ₹360 crore. Measure the gap.',
      bl: ['Find AD **at full-employment output**, not at equilibrium.', 'Gap = AD − AS at Y_F.'],
      v: vWEgap1,
      n: 'Let us measure the gap. Work out aggregate demand at the full-employment output of 360. That is 240 plus half of 360, which is 420. Aggregate supply at full employment is 360. So demand exceeds supply by 60 crore, an inflationary gap. Remember, always measure the gap at full-employment output, not at the equilibrium point.',
    }),
    sl('check', 'Quick check: deficient demand', {
      b: 'Which situation is called deficient demand?',
      chk: 'm_def_dem',
      n: 'Compare aggregate demand with aggregate supply at the full-employment level of output.',
    }),
    sl('concept', 'Deficient demand and its effects', {
      b: '**Deficient demand**: AD **falls short** of AS at full-employment output. The shortfall is the **deflationary gap**.',
      v: vDefFlow,
      n: 'Deficient demand is the opposite problem. At full-employment output, buyers plan to spend less than the value of that output. The shortfall is the deflationary gap. Unsold goods pile up, firms cut production and lay off workers, and involuntary unemployment appears. Prices tend to fall or rise more slowly. Lower incomes can also make firms invest less, which deepens the slowdown.',
    }),
    sl('example', 'Worked example 2: a deflationary gap', {
      b: 'Same AD = 240 + 0.5Y, but full-employment output is ₹600 crore. Find the gap and the extra spending needed.',
      bl: ['Gap = AS − AD at Y_F', 'Extra spending = income shortfall ÷ K'],
      v: vWEgap2,
      n: 'This time full-employment output is 600. Aggregate demand at 600 is 240 plus 300, which is 540. So demand falls short by 60 crore, a deflationary gap. Income is stuck at 480, which is 120 short of full employment. With a marginal propensity of one half, the multiplier is two, so extra spending of 60 crore would close the gap. Notice that this equals the gap itself.',
    }),
    sl('concept', 'Fiscal measures', {
      b: '**Fiscal policy** uses the government budget: **spending, taxes and borrowing**.',
      v: vFiscal,
      n: 'The government can act through its budget. To fight excess demand, it can cut its own spending, raise taxes so that people have less to spend, and borrow more from the public to absorb spending power. To fight deficient demand, it does the opposite: it spends more, for example on public works, and lowers taxes. Each step changes aggregate demand directly.',
    }),
    sl('concept', 'Monetary measures', {
      b: '**Monetary policy** by the central bank (the RBI in India) works through the **cost and availability of credit**.',
      v: vMonetary,
      n: 'The central bank acts on credit. Raising the repo rate or bank rate makes borrowing costlier. Raising the cash reserve ratio or the statutory liquidity ratio leaves banks less to lend. Selling government securities drains reserves from banks. Raising the margin requirement reduces the loan given against each rupee of security. All of these fight excess demand; reversing them fights deficient demand.',
    }),
    sl('check', 'Quick check: choosing a measure', {
      b: 'Which central bank step would help when demand is deficient?',
      chk: 'm_measure_def',
      n: 'Choose the step that makes credit cheaper or easier to get.',
    }),
    sl('example', 'Worked example 3: diagnose and prescribe', {
      b: 'Two imagined economies send reports. Name the problem and suggest one fiscal and one monetary step for each.',
      bl: ['Diagnose from **prices**, **stocks** and **jobs**.', 'Then pick steps that move AD in the right direction.'],
      v: vWEpolicy,
      n: 'Practise the full answer. In the first economy, prices rise fast while factories run at full capacity: a sign of excess demand. Suitable steps are to postpone new government buildings and to raise the repo rate. In the second, unsold stocks rise and workers are laid off: deficient demand. More spending on rural roads and a lower cash reserve ratio would raise demand.',
    }),
    sl('check', 'Quick check: margin requirement', {
      b: 'Work out the effect of a higher margin requirement on a loan against gold.',
      chk: 'm_margin',
      n: 'The margin is the part of the security’s value that the bank will not lend.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'Here is Part 2 in brief. Full employment means no involuntary unemployment. In the short run, the economy can settle below full employment. When demand exceeds supply at full-employment output, there is an inflationary gap and prices rise. When demand falls short, there is a deflationary gap, and output and jobs fall. The government corrects these with fiscal measures, and the central bank with monetary measures.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      bl: [
        'Define excess or deficient demand **at the full-employment level** of output; this phrase carries the mark.',
        'Excess demand raises **prices**, not real output.',
        'Name the measure **and its direction** (raise or lower) **and** how it changes AD.',
        'Keep fiscal (government budget) and monetary (central bank) measures separate.',
        'In gap diagrams, mark **Y_F** and show the gap as a **vertical** distance at Y_F.',
      ],
      n: 'Final tips. When you define excess or deficient demand, always say at the full-employment level of output, because examiners look for it. Remember that excess demand raises prices, not real output. When you suggest a measure, give its direction and explain how it changes aggregate demand. Keep budget measures and central bank measures apart. In diagrams, show the gap as a vertical distance at full-employment output.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Determination of Income and Employment — Notes',
  sections: [
    {
      h: '1. Aggregate demand and aggregate supply',
      t: 1,
      b: 'The model is **short-run**: prices are fixed, firms have spare capacity, and output is set by **planned spending**.\n\n- **Aggregate demand (AD):** total **planned** (ex-ante) expenditure on final goods and services. Two-sector economy: **AD = C + I**; open economy with a government: **AD = C + I + G + (X − M)**.\n- **Aggregate supply (AS):** the value of output, equal to national income: **AS = Y = C + S**; shown by the **45° line**.\n- **Ex-ante vs ex-post:** planned versus actual values. Actual investment includes **unplanned** changes in inventories, so ex-post saving always equals ex-post investment.\n- **Autonomous investment:** planned investment that does not change with income (a horizontal line).',
      terms: [
        ['Aggregate demand', 'Total planned spending on final goods and services in an economy in a period.'],
        ['Aggregate supply', 'The value of all final goods and services produced; it equals national income.'],
        ['Ex-ante', 'Planned or intended (before the period).'],
        ['Ex-post', 'Actual or realised (after the period).'],
      ],
      v: vComponents,
      vs: [vASflow],
    },
    {
      h: '2. Propensity to consume and save',
      t: 2,
      b: '**Consumption function:** C = c̄ + bY, where **c̄** (autonomous consumption) > 0 and **b** = MPC.\n\n- **APC** = C ÷ Y; **MPC** = ΔC ÷ ΔY, with 0 < MPC < 1.\n- **Saving function:** S = Y − C = −c̄ + (1 − b)Y; **APS** = S ÷ Y; **MPS** = ΔS ÷ ΔY.\n- **APC + APS = 1** and **MPC + MPS = 1**, because income is either consumed or saved.\n- **Break-even point:** C = Y and S = 0; for C = 100 + 0.75Y it is at Y = 100 ÷ 0.25 = 400.\n- Below break-even, C > Y: **APC > 1** and saving is negative (dissaving). APC **falls** as income rises; MPC is constant for a straight-line function. APC can exceed 1; MPC cannot (in the usual model).',
      terms: [
        ['Autonomous consumption', 'Consumption at zero income, financed by past savings or borrowing.'],
        ['MPC', 'The fraction of an increase in income that is spent on consumption.'],
        ['MPS', 'The fraction of an increase in income that is saved; MPS = 1 − MPC.'],
        ['Break-even point', 'The income at which consumption equals income and saving is zero.'],
      ],
      v: vConsumption,
      vs: [vSaving, vSchedule],
    },
    {
      h: '3. Equilibrium income',
      t: 3,
      b: '**Two equivalent conditions:**\n\n1. **AD = AS** (C + I = Y): AD cuts the 45° line at E.\n2. **Planned S = planned I**: the saving curve cuts the investment line.\n\n**Formula:** Y = (c̄ + I) ÷ (1 − MPC). Example: C = 100 + 0.75Y, I = 50 gives Y = 150 ÷ 0.25 = **600**; at 600, S = −100 + 150 = 50 = I.\n\n**Adjustment:** if AD > AS, stocks fall below plan and firms raise output; if AD < AS, stocks pile up and firms cut output. Prices do not move (fixed in the short run); **quantities** adjust.\n\n**Do not confuse** the break-even income (C = Y, here 400) with equilibrium income (AD = Y, here 600).',
      terms: [
        ['Equilibrium income', 'The income at which planned aggregate demand equals aggregate supply.'],
        ['Unplanned inventory', 'Change in stocks that firms did not intend; it signals AD ≠ AS.'],
      ],
      v: vADAS,
      vs: [vSI, vAdjust],
    },
    {
      h: '4. The investment multiplier',
      t: 3,
      b: '**K = ΔY ÷ ΔI = 1 ÷ (1 − MPC) = 1 ÷ MPS.**\n\n- Spending by one person is income for another; each round a fraction (the **MPC**) is re-spent and the rest is saved, so the rounds shrink and add up to K × ΔI.\n- MPC 0.75 → K = 4; MPC 0.8 → K = 5; MPC 0.5 → K = 2.\n- **Range:** K = 1 when MPC = 0; K grows without limit as MPC approaches 1. A higher MPC means a larger multiplier.\n- **Diagram:** the AD line shifts up by ΔI; equilibrium income rises by K × ΔI (in the deck economy, 20 × 4 = 80, from 600 to 680).\n- At the new equilibrium, the extra saving generated equals the extra investment.',
      terms: [
        ['Investment multiplier', 'The ratio of the change in income to the change in investment that caused it.'],
      ],
      v: vMultiplier,
      vs: [vRounds],
    },
    {
      h: '5. Full employment and involuntary unemployment',
      t: 4,
      b: '- **Full employment:** all who are **able and willing to work at the prevailing wage** have work. Output is at its maximum with existing resources. Some voluntary and frictional unemployment remains.\n- **Involuntary unemployment:** people willing to work at the prevailing wage cannot find work.\n- **Voluntary unemployment:** people choose not to work at the prevailing wage.\n- **Keynesian point:** in the short run, output is set by AD, so the equilibrium can lie **below** full-employment output (Y_F), with involuntary unemployment that does not disappear by itself.',
      terms: [
        ['Full employment', 'A situation with no involuntary unemployment.'],
        ['Involuntary unemployment', 'Unemployment of people willing to work at the prevailing wage rate.'],
      ],
      v: vFullEmp,
    },
    {
      h: '6. Excess and deficient demand, and how to correct them',
      t: 5,
      b: '**Excess demand:** AD > AS at full-employment output; the excess is the **inflationary gap**. Output and employment cannot rise, so **prices rise**.\n\n**Deficient demand:** AD < AS at full-employment output; the shortfall is the **deflationary gap**. Stocks pile up, **output and employment fall**, involuntary unemployment appears, prices tend to fall.\n\n**Measuring:** find AD at Y_F and compare with Y_F. For AD = 240 + 0.5Y: with Y_F = 360, AD = 420, inflationary gap 60; with Y_F = 600, AD = 540, deflationary gap 60, and extra spending of (600 − 480) ÷ 2 = 60 closes it.\n\n**Fiscal measures** (budget): government spending, taxes, public borrowing. Against excess demand: cut spending, raise taxes, borrow more from the public; against deficient demand, the reverse.\n\n**Monetary measures** (central bank; in India the RBI, whose policy repo rate is set by its Monetary Policy Committee): repo rate and bank rate, CRR, SLR, open market operations, margin requirements. Against excess demand: raise the rates and ratios, **sell** securities, raise margins; against deficient demand, the reverse.',
      terms: [
        ['Inflationary gap', 'The excess of AD over AS at the full-employment level of output.'],
        ['Deflationary gap', 'The shortfall of AD below AS at the full-employment level of output.'],
        ['Repo rate', 'The rate at which the central bank lends to commercial banks for short periods against government securities.'],
        ['Margin requirement', 'The part of a security\'s value that a bank may not lend against.'],
      ],
      v: vExcess,
      vs: [vDeficient, vFiscal, vMonetary],
    },
  ],
  tips: '**Common mistakes**\n- Writing K = 1 ÷ MPC (it is 1 ÷ MPS).\n- Giving the break-even income when the question asks for equilibrium income.\n- Defining excess or deficient demand without "**at the full-employment level of output**".\n- Saying excess demand raises output: at full employment it raises **prices**.\n- Measuring the gap at the equilibrium point instead of at Y_F.\n- Mixing up fiscal measures (government budget) and monetary measures (central bank).\n- Explaining the move to equilibrium through price changes: in this model **stocks and output** adjust.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or value.\n- 3–4 mark numericals: formula, substitution, answer with unit (₹ crore), each carrying marks.\n- Diagrams: correctly labelled axes, curves, 45° line, equilibrium point and gap.\n- 5 marks: five distinct points (about 120 words), or a full worked numerical with checks.\n\n**Data in SOYL practice** are imagined; your board paper will give its own figures.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Aggregate demand** (two-sector)', 'Total **planned** spending on final goods: **AD = C + I**.', 'definition', 1],
  ['AD in an open economy with a government', '**C + I + G + (X − M)**.', 'formula', 1],
  ['**Aggregate supply**', 'Value of output = national income: **AS = Y = C + S** (the 45° line).', 'definition', 1],
  ['**Ex-ante** vs **ex-post**', 'Planned (intended) vs actual (realised) values.', 'concept', 1],
  ['**Autonomous investment**', 'Planned investment that does **not change with income**: a horizontal line.', 'definition', 1],
  ['**Consumption function**', 'C = c̄ + bY: autonomous consumption plus MPC × income.', 'formula', 2],
  ['**APC** and **MPC**', 'APC = C ÷ Y; MPC = ΔC ÷ ΔY.', 'formula', 2],
  ['**APS** and **MPS**', 'APS = S ÷ Y; MPS = ΔS ÷ ΔY.', 'formula', 2],
  ['Two identities of propensities', '**APC + APS = 1**; **MPC + MPS = 1**.', 'formula', 2],
  ['Can **APC** exceed 1?', '**Yes**, below the break-even income, when C > Y (dissaving).', 'concept', 2],
  ['Can **MPC** exceed 1?', '**No** (usual model): extra consumption cannot exceed extra income.', 'concept', 2],
  ['**Break-even point**', 'Income where **C = Y** and **S = 0**; for C = 60 + 0.8Y it is 300.', 'definition', 2],
  ['Saving function from C = c̄ + bY', 'S = −c̄ + (1 − b)Y.', 'formula', 2],
  ['What happens to APC as income rises?', 'It **falls** (towards the MPC); MPC stays constant on a straight line.', 'concept', 2],
  ['**Equilibrium income**: two conditions', '**AD = AS**, or **planned S = planned I**.', 'concept', 3],
  ['Equilibrium income formula', '**Y = (c̄ + I) ÷ (1 − MPC)**.', 'formula', 3],
  ['C = 100 + 0.75Y, I = 50: equilibrium?', 'Y = 150 ÷ 0.25 = **600**.', 'example', 3],
  ['If **AD < AS**', 'Unplanned stocks pile up → firms **cut output** → income falls to equilibrium.', 'concept', 3],
  ['**Investment multiplier**', '**K = ΔY ÷ ΔI = 1 ÷ (1 − MPC) = 1 ÷ MPS**.', 'formula', 3],
  ['MPC = 0.8: K and ΔY for ΔI = 100', 'K = **5**; ΔY = **500**.', 'example', 3],
  ['Minimum value of K', '**1**, when MPC = 0 (MPS = 1).', 'fact', 3],
  ['Why do multiplier rounds shrink?', 'Part of each round\'s extra income is **saved** (leakage).', 'concept', 3],
  ['**Full employment**', 'All **able and willing to work at the prevailing wage** have work.', 'definition', 4],
  ['**Involuntary unemployment**', 'Willing to work at the going wage, but **no job** is available.', 'definition', 4],
  ['Does full employment mean zero unemployment?', '**No**: voluntary and frictional unemployment remain.', 'exam-tip', 4],
  ['**Excess demand**', 'AD **>** AS **at full-employment output**; gap = **inflationary gap**.', 'definition', 5],
  ['**Deficient demand**', 'AD **<** AS **at full-employment output**; gap = **deflationary gap**.', 'definition', 5],
  ['Effect of excess demand', '**Prices rise**; output and employment unchanged.', 'concept', 5],
  ['Effect of deficient demand', 'Output and employment **fall**; involuntary unemployment; prices tend to fall.', 'concept', 5],
  ['Fiscal measures against excess demand', 'Cut government spending; raise taxes; more public borrowing.', 'concept', 5],
  ['Monetary measures against excess demand', 'Raise repo/bank rate, CRR, SLR, margins; **sell** securities (OMO).', 'concept', 5],
  ['Monetary measures against deficient demand', 'Lower repo/bank rate, CRR, SLR, margins; **buy** securities (OMO).', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Determination of Income and Employment',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_mpc_range', 'm_eq_cond', 'm_inflgap', 'ar_mpc_mps'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words. Show working in numericals.', items: ['s_ad_components', 's_k_mpc', 's3_unplanned'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_multiplier', 'l_def'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_harbour'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Determination of Income and Employment',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_exante', 'm_apc_gt1', 'm_breakeven', 'm_k_mps', 'm_above_eq', 'm_invol', 'm_measure_exc', 'm_omo', 'ar_apc_mpc', 'ar_excess_fe'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_exante_post', 's_invol', { attempt: 1, keys: ['s_def_effects', 's_fiscal_excess'] }, 's3_schedule', { attempt: 1, keys: ['s3_monetary', 's3_gap_diagram'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l_eq_num', { attempt: 1, keys: ['l_eq_si', 'l_measures'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_schedule', 'cb_gap'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-economics-ch03 only (aggregate demand and supply; propensities; equilibrium and the investment multiplier; full employment and involuntary unemployment; excess and deficient demand with fiscal and monetary measures)',
    originality: 'every economy, schedule and case written for this chapter (imagined places and figures); no NCERT exercise, boxed example or board/sample-paper item reused',
    data: `all numericals computed by the build: deck economy C = 100 + 0.75Y, I = 50 → break-even ${BE}, equilibrium ${YE}, K ${KK}, ΔI ${DI} → ${YE2}; gap economy AD = 240 + 0.5Y → equilibrium ${GYE}, inflationary gap ${GAP_EX} at Y_F ${YF_EX}, deflationary gap ${GAP_DEF} at Y_F ${YF_DEF}; SVG curves plotted from the same equations`,
    facts: 'standard Keynesian short-run model (fixed prices, two sectors, autonomous investment); RBI instruments named as in the syllabus; no Indian statistics used',
    gate: 'schema, pipeline lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
