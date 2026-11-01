// ISC 12 Economics, ch12 Equilibrium Output, Multiplier and Problems of Demand — question bank. Every economy, town,
// person and figure is imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused
// (D-036). Every number in a stem, key or worked solution is computed here and asserted, so they cannot drift apart.
// Model: two-sector economy (unless a stem adds government), C = a + bY, autonomous investment I, AD = C + I, AS = Y.
// Equilibrium Y = (a + I) ÷ (1 − b); multiplier k = 1 ÷ (1 − MPC) = 1 ÷ MPS; ΔY = k × ΔI. A gap is measured at the
// full-employment output Yf: inflationary gap = AD(Yf) − Yf when AD(Yf) > Yf; deflationary gap = Yf − AD(Yf) otherwise.
// Monetary measures are given as directions only (raise or cut a rate or ratio); no current RBI values are stated.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const r3 = (x) => Math.round(x * 1000) / 1000;
const fmtIN = (n) => r3(n).toLocaleString('en-IN');
const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- income-determination engine
/** Equilibrium income for C = a + bY and investment I (plus any other autonomous spending folded into I). */
export const eqY = (a, b, I) => r3((a + I) / (1 - b));
/** Investment multiplier from the MPC. */
export const kOf = (b) => r3(1 / (1 - b));
/** Aggregate demand at income Y. */
export const AD = (a, b, I) => (Y) => r3(a + b * Y + I);
/** Saving at income Y. */
export const SAV = (a, b) => (Y) => r3(-a + (1 - b) * Y);
/** Gap at full-employment output Yf: positive = inflationary, negative = deflationary. */
export const gapAt = (a, b, I, Yf) => r3(AD(a, b, I)(Yf) - Yf);

// ---------------------------------------------------------------- shared imagined economies (all asserted)
// (1) Tarangpur (imagined, ₹ crore): C = 60 + 0.8Y, I = 40.
export const T = { a: 60, b: 0.8, I: 40 };
export const T_AD = AD(T.a, T.b, T.I);
export const T_S = SAV(T.a, T.b);
export const T_Y = eqY(T.a, T.b, T.I);
export const T_K = kOf(T.b);
export const T_BE = r3(T.a / (1 - T.b));
assert(T_Y === 500 && T_K === 5 && T_BE === 300, 'tarangpur basics');
assert(T_AD(T_Y) === T_Y && T_S(T_Y) === T.I, 'tarangpur equilibrium both ways');
assert(T_AD(400) === 420 && T_AD(600) === 580 && T_S(400) === 20 && T_S(600) === 60, 'tarangpur off-equilibrium');
export const T_YS = [0, 100, 200, 300, 400, 500, 600, 700];
export const T_ROWS = T_YS.map((Y) => ({ Y, C: r3(T.a + T.b * Y), S: T_S(Y), I: T.I, AD: T_AD(Y) }));
assert(T_ROWS.find((r) => r.AD === r.Y).Y === 500, 'schedule equilibrium');
// Investment rises by 20: new equilibrium 600.
export const T_DI = 20;
export const T_Y2 = eqY(T.a, T.b, T.I + T_DI);
assert(T_Y2 === 600 && r3(T_Y2 - T_Y) === r3(T_K * T_DI), 'tarangpur multiplier');

// (2) Hiranagar (imagined, ₹ crore): C = 50 + 0.6Y, I = 70; equilibrium 300, k = 2.5.
export const H = { a: 50, b: 0.6, I: 70 };
export const H_AD = AD(H.a, H.b, H.I);
export const H_Y = eqY(H.a, H.b, H.I);
export const H_K = kOf(H.b);
assert(H_Y === 300 && H_K === 2.5, 'hiranagar basics');
// Deficient demand when Yf = 400: AD(400) = 360, gap 40, needed extra spending 40 → ΔY = 100.
export const H_YF_DEF = 400;
export const H_GAP_DEF = -gapAt(H.a, H.b, H.I, H_YF_DEF);
assert(H_AD(H_YF_DEF) === 360 && H_GAP_DEF === 40 && r3(H_K * H_GAP_DEF) === H_YF_DEF - H_Y, 'hiranagar deflationary gap');
// Excess demand when Yf = 250: AD(250) = 270, gap 20; cut spending by 20 → ΔY = −50.
export const H_YF_INF = 250;
export const H_GAP_INF = gapAt(H.a, H.b, H.I, H_YF_INF);
assert(H_AD(H_YF_INF) === 270 && H_GAP_INF === 20 && r3(H_K * H_GAP_INF) === H_Y - H_YF_INF, 'hiranagar inflationary gap');

// (3) Multiplier rounds: ΔI = 100 in an economy with MPC 0.8.
export const RND = { dI: 100, b: 0.8 };
export const ROUNDS = Array.from({ length: 6 }, (_, i) => r3(RND.dI * RND.b ** i));
assert(ROUNDS.join() === '100,80,64,51.2,40.96,32.768', 'rounds');
export const ROUNDS_TOTAL = r3(RND.dI * kOf(RND.b));
assert(ROUNDS_TOTAL === 500 && r3(ROUNDS.reduce((s, x) => s + x, 0)) === 368.928, 'rounds total');

export const tarangpurTable = (ys = T_YS) => md(T_ROWS.filter((r) => ys.includes(r.Y)).map((r) => [String(r.Y), String(r.C), String(r.I)]), ['Income Y (₹ crore)', 'Consumption C', 'Investment I']);

// ================================================================ t01 Equilibrium output: AD = AS and S = I
Q('m_eq_condition', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the imagined two-sector economy of Tarangpur, which condition must hold at the equilibrium level of income?',
  opts: ['Planned aggregate demand equals aggregate supply (planned spending equals output)', 'Consumption equals income', 'Investment equals consumption', 'Saving is zero'],
  sol: 'Output settles where what households and firms plan to spend equals what is produced, AD = AS. C = Y is the break-even point of the consumption function; it is not the equilibrium unless investment is zero.',
}));
Q('m_si_condition', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A student of an imagined Shillong college studies equilibrium income by the leakage–injection method. In a two-sector economy the condition she uses is',
  opts: ['planned saving equals planned investment', 'saving equals consumption', 'investment equals income', 'saving equals income'],
  sol: 'In a two-sector economy AD = C + I and AS = C + S, so AD = AS is the same as planned S = planned I.',
}));
Q('m_unplanned_stock_rise', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Shops in the imagined town of Tarangpur find unsold goods piling up beyond the stocks they had planned. This tells us that at the current output',
  opts: ['aggregate demand is less than aggregate supply, so output will fall', 'aggregate demand exceeds aggregate supply, so output will rise', 'the economy is at equilibrium', 'planned investment exceeds planned saving'],
  sol: 'Unplanned piling up of stocks means buyers are taking less than is produced: AD < AS (planned S > planned I). Firms respond by cutting production, so income falls towards equilibrium.',
}));
Q('m_unplanned_stock_fall', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Traders in an imagined Bhopal wholesale market find their stocks running down faster than planned at the present level of output. What happens next in the economy?',
  opts: ['Firms raise production, so income and employment rise', 'Firms cut production, so income falls', 'Prices and output stay unchanged', 'Planned saving rises above planned investment'],
  sol: 'Stocks running down unexpectedly means AD > AS. Firms expand output to rebuild stocks, so income rises until AD = AS.',
}));
Q('m_tarangpur_eq', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `In the imagined economy of Tarangpur, C = ${T.a} + ${T.b}Y and investment is ₹${T.I} crore. What is its equilibrium income?`,
  opts: [`₹${T_Y} crore`, `₹${T_BE} crore`, `₹${T.a + T.I} crore`, `₹${T_Y + 100} crore`],
  sol: `Y = (a + I) ÷ (1 − b) = (${T.a} + ${T.I}) ÷ ${r3(1 - T.b)} = ${T_Y}. ₹${T_BE} crore is the break-even income where C = Y, and ₹${T.a + T.I} crore is only autonomous spending.`,
}));
Q('m_ad_above_45', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On an income–expenditure diagram of an imagined island economy, at an income to the left of equilibrium the aggregate demand curve lies above the forty-five degree line. This means',
  opts: ['planned spending exceeds output, so output tends to rise', 'output exceeds planned spending, so output tends to fall', 'saving exceeds investment', 'the economy is at full employment'],
  sol: 'Every point on the forty-five degree line has spending equal to output. Where AD lies above it, planned spending is greater than output, so firms expand production.',
}));
Q('ar_45_line', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'On an income–expenditure diagram, the aggregate supply curve is drawn as a forty-five degree line through the origin.',
  r: 'Aggregate supply is the value of output, which equals income, so every point on the line is equidistant from the two axes.',
  sol: 'Both are true, and R explains A: since AS = Y, plotting AS against Y on equal scales traces the line where the vertical and horizontal distances are equal, the forty-five degree line.',
}));
Q('ar_s_gt_i', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'When planned saving exceeds planned investment, national income tends to fall.',
  r: 'When planned saving exceeds planned investment, firms find their stocks running down below the planned level.',
  sol: 'A is true: saving above investment means AD < AS, so output and income fall. R is false: stocks pile up above the planned level (they would run down if investment exceeded saving).',
}));
Q('tf_be_eq', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `True or false? In the imagined economy of Tarangpur (C = ${T.a} + ${T.b}Y, I = ${T.I}), equilibrium income is the income at which consumption equals income.`,
  sol: `False. C = Y at the break-even income of ₹${T_BE} crore, where saving is zero. Equilibrium needs C + I = Y, which happens at ₹${T_Y} crore, where saving equals investment of ${T.I}.`,
}));
Q('fb_si', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In a two-sector economy, equilibrium income is reached where planned saving equals planned ___.',
  acc: [['investment']],
  sol: 'S = I: saving is the leakage and investment the injection; equilibrium is where they are equal.',
}));
Q('n_tarangpur_y', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: eqY(40, 0.75, 60), unit: '₹ crore',
  stem: 'An imagined coastal economy of Kanakpur has C = 40 + 0.75Y and planned investment of ₹60 crore. Find its equilibrium income (in ₹ crore).',
  sol: `Y = (40 + 60) ÷ (1 − 0.75) = 100 ÷ 0.25 = ${eqY(40, 0.75, 60)}.`,
}));
assert(eqY(40, 0.75, 60) === 400, 'kanakpur');
Q('n_saving_at_eq', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: T_S(T_Y), unit: '₹ crore',
  stem: `In the imagined economy of Tarangpur (C = ${T.a} + ${T.b}Y), equilibrium income is ₹${T_Y} crore. What is planned saving at this income (in ₹ crore)?`,
  sol: `S = −${T.a} + ${r3(1 - T.b)} × ${T_Y} = ${T_S(T_Y)}, equal to investment of ${T.I}, as it must be at equilibrium.`,
}));
Q('ord_adjust_up', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps by which the imagined economy of Tarangpur moves to equilibrium when its output is below the equilibrium level.',
  items: [
    'Planned spending is greater than current output',
    'Stocks of goods run down below the planned level',
    'Firms increase production and hire more workers',
    'Income rises until planned spending equals output',
  ],
  sol: 'Excess demand comes first, it shows up as falling stocks, firms respond by producing more, and income rises until AD = AS.',
}));
Q('s_two_approaches', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two approaches to determining equilibrium income in a two-sector economy, giving the condition used in each, as a study note for an imagined Patna coaching class.',
  model: '1. The **aggregate demand–aggregate supply approach**: equilibrium where **AD = AS**, that is, planned C + I equals output.\n2. The **saving–investment approach**: equilibrium where **planned S = planned I**, leakages equal injections.',
  sol: 'Name each approach with its condition.',
  scheme: [['AD = AS approach', 1], ['S = I approach', 1]],
}));
Q('s_why_ad_as_same', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Show why the conditions AD = AS and S = I give the same equilibrium income in the imagined two-sector economy of Tarangpur.',
  model: 'Aggregate demand is **C + I** and aggregate supply, the income earned, is spent or saved: **C + S**. Setting **C + I = C + S** and cancelling C leaves **I = S**. So the two conditions describe the **same income**.',
  sol: 'AD = C + I and AS = C + S; cancel C.',
  scheme: [['AD = C + I and AS = C + S', 1], ['Cancelling C gives S = I', 1]],
}));
Q('s3_tarangpur_schedule', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `The table below shows consumption and investment in the imagined economy of Tarangpur. Calculate aggregate demand at each income and find equilibrium income.\n\n${tarangpurTable([300, 400, 500, 600])}`,
  model: `**AD = C + I:** ${T_ROWS.filter((r) => [300, 400, 500, 600].includes(r.Y)).map((r) => `${r.C} + ${r.I} = **${r.AD}**`).join('; ')}. Equilibrium is where **AD = Y**: at **₹${T_Y} crore**, AD is also ${T_AD(T_Y)}. Below it AD exceeds output (420 at 400) and above it AD falls short (580 at 600).`,
  sol: 'Add C and I; find AD = Y.',
  scheme: [['AD column', 1], ['Equilibrium at 500', 1], ['Reason using AD and output', 1]],
}));
Q('s3_si_adjust', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `In the imagined economy of Tarangpur, at an income of ₹600 crore planned saving is ₹${T_S(600)} crore while planned investment is ₹${T.I} crore. Explain how income adjusts and where it settles.`,
  model: `Saving (${T_S(600)}) is **greater** than investment (${T.I}), so the **leakage exceeds the injection**: planned spending (${T_AD(600)}) is **less than output** (600). Unsold goods **pile up**, so firms **cut output** and income falls. As income falls, saving falls too, until **S = I = ${T.I}** at **₹${T_Y} crore**.`,
  sol: 'S > I: AD < AS, stocks pile up, output falls to S = I.',
  scheme: [['S > I means AD < AS', 1], ['Stocks pile up, output cut', 1], ['Settles at 500 where S = I', 1]],
}));
Q('l_eq_both', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `The imagined economy of Tarangpur has the consumption function C = ${T.a} + ${T.b}Y and planned investment of ₹${T.I} crore.\n\n(a) Find equilibrium income by the AD = AS approach and check it by the S = I approach. [3]\n(b) Describe the adjustment if the economy were producing ₹400 crore. [2]`,
  model: `(a) **AD = ${T.a} + ${T.b}Y + ${T.I} = ${T.a + T.I} + ${T.b}Y**. Setting AD = Y: Y − ${T.b}Y = ${T.a + T.I}, so ${r3(1 - T.b)}Y = ${T.a + T.I} and **Y = ${T_Y}**. Check: **S = −${T.a} + ${r3(1 - T.b)}Y**; at Y = ${T_Y}, S = −${T.a} + ${r3((1 - T.b) * T_Y)} = **${T_S(T_Y)} = I**. Both approaches give ₹${T_Y} crore.\n(b) At an output of 400, planned spending is **${T_AD(400)}**, more than output by **20**. Stocks **run down** unexpectedly, so firms **raise output and employment**. Income rises until it reaches **₹${T_Y} crore**, where spending and output are equal again.`,
  sol: 'Solve AD = Y; check S = I; adjustment from excess demand.',
  scheme: [['AD written and set equal to Y', 1], ['Y = 500', 1], ['S = I check', 1], ['AD 420 > 400 identified', 1], ['Adjustment: stocks fall, output rises to 500', 1]],
}));

// ================================================================ t02 Investment multiplier
Q('m_k_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A planning officer in an imagined Odisha district explains the investment multiplier. It is the ratio of',
  opts: ['the change in income to the change in investment that caused it', 'the change in investment to the change in income', 'total income to total investment', 'the change in saving to the change in income'],
  sol: 'k = ΔY ÷ ΔI: how many times income rises for a given rise in investment. ΔS ÷ ΔY is the MPS.',
}));
Q('m_k_from_mpc', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Households in an imagined Kerala fishing economy spend nine-tenths of every extra rupee they earn. The value of the investment multiplier is',
  opts: ['10', '9', '0.9', '1.1'],
  sol: `MPC = 0.9, so k = 1 ÷ (1 − 0.9) = 1 ÷ 0.1 = ${kOf(0.9)}.`,
}));
assert(kOf(0.9) === 10, 'k 0.9');
Q('m_k_range', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An economics club in an imagined Indore school debates the possible values of the multiplier. Which statement about its range is correct?',
  opts: ['It is 1 when MPC is zero and grows without limit as MPC approaches 1', 'It lies between 0 and 1', 'It is always equal to the MPC', 'It falls as the MPC rises'],
  sol: 'k = 1 ÷ (1 − MPC). With MPC = 0, k = 1 (no extra rounds of spending); as MPC rises towards 1, (1 − MPC) shrinks and k becomes very large.',
}));
Q('m_k_mps_link', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In an imagined hill economy, the multiplier is 4. Its marginal propensity to save must be',
  opts: ['0.25', '0.75', '4', '0.4'],
  sol: 'k = 1 ÷ MPS, so MPS = 1 ÷ 4 = 0.25 (and MPC = 0.75).',
}));
Q('m_dy_from_di', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A new cement plant raises investment in the imagined economy of Tarangpur (MPC ${T.b}) by ₹${T_DI} crore. By how much will equilibrium income rise?`,
  opts: [`₹${r3(T_K * T_DI)} crore`, `₹${T_DI} crore`, `₹${r3(T.b * T_DI)} crore`, `₹${r3(T_DI / T_K)} crore`],
  sol: `k = 1 ÷ (1 − ${T.b}) = ${T_K}; ΔY = k × ΔI = ${T_K} × ${T_DI} = ${r3(T_K * T_DI)}. Income rises from ${T_Y} to ${T_Y2}.`,
}));
Q('m_backward', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Private investment in an imagined Tiruchi engineering cluster falls by ₹50 crore, and the regional MPC is 0.6. What happens to the region\'s income?',
  opts: ['It falls by ₹125 crore', 'It falls by ₹50 crore', 'It falls by ₹30 crore', 'It does not change, since the multiplier works only upwards'],
  sol: `The multiplier works in both directions. k = 1 ÷ 0.4 = ${kOf(0.6)}; ΔY = ${kOf(0.6)} × (−50) = ${r3(kOf(0.6) * -50)}.`,
}));
assert(kOf(0.6) === 2.5 && r3(kOf(0.6) * -50) === -125, 'backward');
Q('ar_k_mpc', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'The higher the marginal propensity to consume of a community, the larger its investment multiplier.',
  r: 'With a higher MPC, a larger share of each round of extra income is spent and becomes someone else\'s income.',
  sol: 'Both are true, and R explains A: each round of spending passes a larger fraction on as income, so the sum of all the rounds, k = 1 ÷ (1 − MPC), is bigger.',
}));
Q('ar_k_lt1', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'The investment multiplier can be less than one when people save most of their extra income.',
  r: 'The multiplier equals the marginal propensity to save.',
  sol: 'Both are false. Even if all extra income is saved (MPS = 1), k = 1 ÷ 1 = 1; it never falls below one. And k is the reciprocal of the MPS, not the MPS itself.',
}));
Q('tf_k_both_ways', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If investment in an imagined Assam tea district falls, the multiplier makes the district\'s income fall by more than the fall in investment.',
  sol: 'True. The multiplier works backward too: the first fall in income cuts spending, which cuts other incomes in turn, so income falls by k times the fall in investment.',
}));
Q('fb_k_formula', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The investment multiplier equals 1 divided by the marginal propensity to ___.',
  acc: [['save', 'saving']],
  sol: 'k = 1 ÷ MPS = 1 ÷ (1 − MPC): one divided by the marginal propensity to save.',
}));
Q('n_dy_cold', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: r3(kOf(0.9) * 60), unit: '₹ crore',
  stem: 'Cold-storage chains invest an extra ₹60 crore in an imagined Punjab economy where the MPC is 0.9. Find the total rise in income (in ₹ crore).',
  sol: `k = 1 ÷ (1 − 0.9) = ${kOf(0.9)}; ΔY = ${kOf(0.9)} × 60 = ${r3(kOf(0.9) * 60)}.`,
}));
Q('n_di_needed', num({
  t: 2, d: 3, c: 'application', marks: 1, value: r3(800 / (1 / 0.2)), unit: '₹ crore',
  stem: 'An imagined state planning board wants income to rise by ₹800 crore. The marginal propensity to save in the state is 0.2. How much extra investment is needed (in ₹ crore)?',
  sol: `k = 1 ÷ 0.2 = ${r3(1 / 0.2)}; ΔI = ΔY ÷ k = 800 ÷ ${r3(1 / 0.2)} = ${r3(800 / 5)}.`,
}));
assert(r3(800 / 5) === 160, 'di needed');
Q('n_round3', num({
  t: 2, d: 3, c: 'understanding', marks: 1, value: ROUNDS[2], unit: '₹ crore',
  stem: `A new metro project adds ₹${RND.dI} crore of investment in an imagined city economy with MPC ${RND.b}. How much extra income is created in the third round of spending (in ₹ crore)?`,
  sol: `Round 1 = ${ROUNDS[0]}; round 2 = ${RND.b} × ${ROUNDS[0]} = ${ROUNDS[1]}; round 3 = ${RND.b} × ${ROUNDS[1]} = ${ROUNDS[2]}.`,
}));
Q('mt_mpc_k', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each MPC of an imagined district economy with the value of its investment multiplier.',
  pairs: [
    ['MPC 0.5', `k = ${kOf(0.5)}`],
    ['MPC 0.75', `k = ${kOf(0.75)}`],
    ['MPC 0.8', `k = ${kOf(0.8)}`],
    ['MPC 0', `k = ${kOf(0)}`],
  ],
  sol: 'k = 1 ÷ (1 − MPC): 1 ÷ 0.5 = 2; 1 ÷ 0.25 = 4; 1 ÷ 0.2 = 5; 1 ÷ 1 = 1.',
}));
assert(kOf(0.5) === 2 && kOf(0.75) === 4 && kOf(0.8) === 5 && kOf(0) === 1, 'match k');
Q('s_k_meaning', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the meaning of the investment multiplier with an imagined example of a new textile park.',
  model: 'The **investment multiplier (k)** is the number of times **income rises** for a given **rise in investment**: **k = ΔY ÷ ΔI**. If a new textile park adds ₹10 crore of investment and income rises by ₹40 crore, **k = 4**.',
  sol: 'Definition with formula and an example.',
  scheme: [['Meaning with k = ΔY ÷ ΔI', 1], ['Example', 1]],
}));
Q('s_k_mps', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why the multiplier of an imagined thrifty farming community with a high marginal propensity to save is small.',
  model: 'k = **1 ÷ MPS**. When the community **saves a large share** of each extra rupee, **less** of it is passed on as spending, so each **round of new income is smaller** and the **total rise in income** is small; a high MPS means a **low k**.',
  sol: 'Leakage into saving cuts the later rounds.',
  scheme: [['k = 1 ÷ MPS', 1], ['High saving leaks spending, smaller rounds', 1]],
}));
Q('s3_rounds', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `A new metro project adds ₹${RND.dI} crore of investment in an imagined city economy with MPC ${RND.b}. Show the first three rounds of income generation and find the final rise in income.`,
  model: `**Round 1:** the ₹${ROUNDS[0]} crore becomes income of workers and suppliers. **Round 2:** they spend ${RND.b} × ${ROUNDS[0]} = **${ROUNDS[1]}**, which becomes others\' income. **Round 3:** ${RND.b} × ${ROUNDS[1]} = **${ROUNDS[2]}**. The rounds keep shrinking; their sum is **k × ΔI = ${kOf(RND.b)} × ${RND.dI} = ₹${ROUNDS_TOTAL} crore**.`,
  sol: 'Rounds of MPC times the previous income; total by the formula.',
  scheme: [['Rounds 1 and 2', 1], ['Round 3', 1], ['Total 500 by k × ΔI', 1]],
}));
Q('s3_k_range', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A student in an imagined Ranchi school claims that the multiplier can take any value from 0 to infinity. Assess her claim, explaining the minimum and maximum values.',
  model: 'She is **partly wrong**. Since k = 1 ÷ (1 − MPC) and MPC lies between 0 and 1: when **MPC = 0**, all extra income is saved and **k = 1**, its **minimum**, so it is never below one. As **MPC approaches 1**, the denominator approaches zero and **k becomes very large** (approaching infinity). So k ranges from **1 to infinity**, not from 0.',
  sol: 'Range of k from the range of MPC.',
  scheme: [['Minimum 1 when MPC = 0', 1], ['Approaches infinity as MPC approaches 1', 1], ['Conclusion on the claim', 1]],
}));
Q('l_k_mechanism', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `An imagined state government awards ₹${RND.dI} crore of road contracts in a region where the MPC is ${RND.b}.\n\n(a) Explain, round by round, how income in the region grows, and find the final rise. [3]\n(b) What would the final rise be if the MPC were 0.5? Explain the difference. [2]`,
  model: `(a) **Round 1:** the ₹${ROUNDS[0]} crore is paid as wages and to suppliers; their income rises by ${ROUNDS[0]}. **Round 2:** they spend ${RND.b} of it, **${ROUNDS[1]}**, which becomes the income of shopkeepers and farmers. **Round 3:** these spend ${RND.b} × ${ROUNDS[1]} = **${ROUNDS[2]}**, and so on, each round smaller. The total is **k × ΔI = 1 ÷ (1 − ${RND.b}) × ${RND.dI} = ₹${ROUNDS_TOTAL} crore**.\n(b) With **MPC 0.5**, k = 1 ÷ 0.5 = **${kOf(0.5)}**, so income rises by only **₹${r3(kOf(0.5) * RND.dI)} crore**. More of each rupee is **saved**, so less is passed on in each round and the chain dies out sooner.`,
  sol: 'Rounds with MPC; total by k; compare k at MPC 0.5.',
  scheme: [['Round 1 and 2 explained', 1], ['Shrinking rounds continued', 1], ['Total 500', 1], ['k = 2 and rise of 200', 1], ['Reason: more saving, smaller rounds', 1]],
}));
assert(r3(kOf(0.5) * RND.dI) === 200, 'k 0.5 total');

// ================================================================ t03 Full employment and involuntary unemployment
Q('m_full_emp', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A labour officer in an imagined Kanpur district says the economy is at full employment. This means that',
  opts: ['everyone able and willing to work at the prevailing wage rate has a job', 'every person in the district, including children and the retired, is working', 'nobody at all is unemployed, even between jobs', 'the wage rate is at its highest possible level'],
  sol: 'Full employment means no involuntary unemployment: all who are able and willing to work at the current wage find work. Some frictional or voluntary unemployment can still exist.',
}));
Q('m_involuntary', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of these imagined workers of a Surat diamond town is involuntarily unemployed?',
  opts: ['Ramesh, a polisher willing to work at the going wage, who cannot find any work', 'Asha, who has chosen to stay at home to study for a year', 'Vikram, who is between two jobs while he shifts to a new workshop', 'Neha, who refuses work unless she is paid twice the going wage'],
  sol: 'Involuntary unemployment means being willing to work at the prevailing wage but unable to find work, as with Ramesh. Asha and Neha are voluntarily out of work, and Vikram is frictionally unemployed.',
}));
Q('m_eq_below_fe', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'According to Keynesian theory, why can the imagined economy of Hiranagar settle at an equilibrium with many people out of work?',
  opts: ['Equilibrium is fixed by aggregate demand, which may be too low to employ everyone', 'Equilibrium always occurs at full employment', 'Wages always fall at once to remove unemployment', 'Saving is always equal to income'],
  sol: 'Equilibrium income is where AD = AS. If planned spending is low, this can happen below full-employment output, with involuntary unemployment (an underemployment equilibrium).',
}));
Q('tf_frictional', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An imagined Pune economy can be at full employment even though some engineers are between jobs.',
  sol: 'True. Full employment rules out involuntary unemployment only; short spells between jobs (frictional unemployment) can coexist with it.',
}));
Q('s_fe_meaning', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define full employment and involuntary unemployment, as they would appear in an imagined Bihar labour report.',
  model: '**Full employment**: all who are **able and willing to work at the prevailing wage** have jobs; only frictional or voluntary idleness remains. **Involuntary unemployment**: people **willing to work at the going wage** who **cannot find work**.',
  sol: 'Two definitions built on the prevailing wage.',
  scheme: [['Full employment', 1], ['Involuntary unemployment', 1]],
}));
Q('s3_underemp_eq', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `The imagined economy of Hiranagar is in equilibrium at an income of ₹${H_Y} crore, while full employment needs an output of ₹${H_YF_DEF} crore. Explain why it can stay at ₹${H_Y} crore and what this means for workers.`,
  model: `Equilibrium is decided by **aggregate demand**: at ₹${H_Y} crore planned spending **equals** output, so firms have **no reason to expand**, even though output is below ₹${H_YF_DEF} crore. The economy can **stay** there. Workers who are **willing to work at the going wage** cannot find jobs: there is **involuntary unemployment** (an underemployment equilibrium).`,
  sol: 'AD-determined equilibrium below full employment.',
  scheme: [['Equilibrium set by AD = AS', 1], ['No pressure to expand', 1], ['Involuntary unemployment results', 1]],
}));

// ================================================================ t04 Excess and deficient demand
Q('m_infl_gap_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'An imagined Reserve Bank research note uses the term inflationary gap. It means the amount by which',
  opts: ['aggregate demand exceeds aggregate supply at full-employment output', 'aggregate supply exceeds aggregate demand at full-employment output', 'prices rise in a year', 'investment exceeds consumption'],
  sol: 'An inflationary gap is excess demand measured at the full-employment level of output.',
}));
Q('m_defl_gap_effect', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Spending falls short of full-employment output in an imagined Ludhiana manufacturing economy. Which is the most likely result?',
  opts: ['Output and employment fall, and involuntary unemployment appears', 'Prices rise sharply with no change in output', 'Output rises above full employment', 'Wages rise because workers are scarce'],
  sol: 'Deficient demand leaves goods unsold, so firms cut output and jobs: involuntary unemployment. Prices may fall or stop rising; they do not rise sharply.',
}));
Q('m_excess_effect', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined island economy is already at full employment when festive spending pushes aggregate demand higher. What happens mainly?',
  opts: ['The general price level rises, because output cannot increase further', 'Output and employment rise sharply', 'Unemployment rises', 'Unplanned stocks pile up'],
  sol: 'At full employment there are no idle resources, so extra demand cannot raise real output; it bids up prices (inflation).',
}));
Q('m_hira_defl', mcq({
  t: 4, d: 3, c: 'application',
  stem: `In the imagined economy of Hiranagar, AD = ${H.a + H.I} + ${H.b}Y and full-employment output is ₹${H_YF_DEF} crore. What is the gap at full employment?`,
  opts: [`A deflationary gap of ₹${H_GAP_DEF} crore`, `An inflationary gap of ₹${H_GAP_DEF} crore`, `A deflationary gap of ₹${H_YF_DEF - H_Y} crore`, 'No gap, because the economy is in equilibrium'],
  sol: `AD at ${H_YF_DEF} = ${H.a + H.I} + ${H.b} × ${H_YF_DEF} = ${H_AD(H_YF_DEF)}, which is ${H_GAP_DEF} short of ${H_YF_DEF}: a deflationary gap of ${H_GAP_DEF}. The fall in income below full employment (${H_YF_DEF - H_Y}) is the gap times the multiplier, not the gap itself.`,
}));
Q('m_excess_cause', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Which change would most likely create excess demand in an imagined economy that is already at full employment?',
  opts: ['A large rise in government spending financed by borrowing from the central bank', 'A rise in the marginal propensity to save', 'A fall in exports', 'A cut in private investment'],
  sol: 'Extra government spending financed by new money adds to AD. A higher MPS, lower exports and lower investment all reduce AD.',
}));
Q('ar_defl_unemp', ar({
  t: 4, d: 2, c: 'analysis', key: 'a',
  a: 'Deficient demand leads to involuntary unemployment.',
  r: 'When aggregate demand falls short of full-employment output, firms cut production and need fewer workers.',
  sol: 'Both are true, and R explains A: lower planned spending makes firms produce less, so some workers willing to work at the going wage lose or do not find jobs.',
}));
Q('ar_infl_output', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'An inflationary gap at full employment raises the general price level.',
  r: 'At full employment, extra demand is met by a matching rise in real output.',
  sol: 'A is true: excess demand at full employment pushes up prices. R is false: at full employment resources are already in use, so real output cannot rise to meet the extra demand; that is why prices rise.',
}));
Q('fb_gap_level', fb({
  t: 4, d: 2, c: 'understanding',
  stem: 'Both the inflationary and the deflationary gap are measured at the ___ level of output.',
  acc: [['full employment', 'full-employment']],
  sol: 'Both gaps are measured at the full employment level of output, as the difference between AD and that output.',
}));
Q('n_hira_infl', num({
  t: 4, d: 3, c: 'application', marks: 1, value: H_GAP_INF, unit: '₹ crore',
  stem: `In the imagined economy of Hiranagar, C = ${H.a} + ${H.b}Y and investment is ₹${H.I} crore. If full-employment output is only ₹${H_YF_INF} crore, find the inflationary gap (in ₹ crore).`,
  sol: `AD at ${H_YF_INF} = ${H.a} + ${H.b} × ${H_YF_INF} + ${H.I} = ${H_AD(H_YF_INF)}; gap = ${H_AD(H_YF_INF)} − ${H_YF_INF} = ${H_GAP_INF}.`,
}));
Q('s_gaps_compare', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between excess demand and deficient demand in the context of an imagined state economy, with one effect of each.',
  model: '**Excess demand**: AD **exceeds** AS at full employment (inflationary gap); its main effect is a **rise in prices**. **Deficient demand**: AD **falls short** of AS at full employment (deflationary gap); it causes a **fall in output and employment**.',
  sol: 'Definitions at full employment plus one effect each.',
  scheme: [['Excess demand with effect', 1], ['Deficient demand with effect', 1]],
}));
Q('s_defl_causes', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two possible causes of deficient demand in an imagined export-dependent coastal economy.',
  model: '1. A **fall in exports** when buyers abroad cut their orders, which lowers foreign demand.\n2. A **fall in private investment** as firms grow pessimistic about future sales (or a rise in households\' **saving**).',
  sol: 'Any two falls in components of AD.',
  scheme: [['First cause', 1], ['Second cause', 1]],
}));
Q('s3_hira_gap', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The imagined economy of Hiranagar has C = ${H.a} + ${H.b}Y and investment of ₹${H.I} crore. Full-employment output is ₹${H_YF_DEF} crore. Identify the gap at full employment, calculate it and state its effect.`,
  model: `**AD at ${H_YF_DEF}** = ${H.a} + ${H.b} × ${H_YF_DEF} + ${H.I} = **${H_AD(H_YF_DEF)}**, which is **less** than ${H_YF_DEF}. So there is a **deflationary gap of ₹${H_GAP_DEF} crore**. Income settles at only **₹${H_Y} crore**, below full employment, so **output and employment are lower** and there is involuntary unemployment.`,
  sol: 'Compute AD at Yf; compare.',
  scheme: [['AD at 400 = 360', 1], ['Deflationary gap of 40', 1], ['Effect on output and employment', 1]],
}));
Q('s3_infl_effects', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three effects of excess demand in an imagined economy that is already at full employment.',
  model: '1. **Rise in the general price level**: output cannot expand, so the extra demand bids up prices.\n2. **No rise in real output or employment**: resources are already fully used, so the gain is only in money terms.\n3. **Fall in the real value of fixed incomes and savings**: pensioners and savers can buy less, while borrowers gain.',
  sol: 'Price rise, no real gain, redistribution.',
  scheme: [['Price level rises', 1], ['No rise in output or jobs', 1], ['A third effect (fixed incomes or savings)', 1]],
}));
Q('l_two_gaps', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The imagined economy of Hiranagar has AD = ${H.a + H.I} + ${H.b}Y.\n\n(a) If full-employment output is ₹${H_YF_DEF} crore, find the gap and describe it on a diagram. [3]\n(b) If instead full-employment output were ₹${H_YF_INF} crore, find the gap and state its main effect. [2]`,
  model: `(a) **AD at ${H_YF_DEF}** = ${H.a + H.I} + ${r3(H.b * H_YF_DEF)} = **${H_AD(H_YF_DEF)}**, below ${H_YF_DEF}: a **deflationary gap of ₹${H_GAP_DEF} crore**. On the income–expenditure diagram, draw the forty-five degree line and the flatter AD line; at the **full-employment output** on the x-axis, the vertical distance from the **forty-five degree line down to AD** is the gap. AD cuts the forty-five degree line at **₹${H_Y} crore**, below full employment.\n(b) **AD at ${H_YF_INF}** = ${H.a + H.I} + ${r3(H.b * H_YF_INF)} = **${H_AD(H_YF_INF)}**, above ${H_YF_INF}: an **inflationary gap of ₹${H_GAP_INF} crore**. Output cannot rise beyond full employment, so the main effect is a **rise in prices**.`,
  sol: 'AD at each Yf; compare with Yf; diagram and effect.',
  scheme: [['AD at 400 computed', 1], ['Deflationary gap 40', 1], ['Diagram described with gap marked', 1], ['Inflationary gap 20', 1], ['Effect: prices rise', 1]],
}));

// ================================================================ t05 Measures to correct excess and deficient demand
Q('m_fiscal_excess', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined state government wants to reduce excess demand in its economy using fiscal policy. Which step suits this aim?',
  opts: ['Cut its own spending and raise taxes', 'Raise its own spending on public works', 'Cut income-tax rates', 'Pay larger subsidies to households'],
  sol: 'Less government spending lowers AD directly, and higher taxes cut disposable income and consumption. The other three raise AD.',
}));
Q('m_repo_deficient', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Facing deficient demand in an imagined economy, its central bank changes the repo rate. Which direction suits the aim, and why?',
  opts: ['A cut, because cheaper funds for banks lower loan rates and encourage borrowing and spending', 'A rise, because dearer credit encourages investment', 'A cut, because it makes banks lend less', 'A rise, because it raises the money supply'],
  sol: 'Lowering the repo rate makes it cheaper for banks to borrow from the central bank, so loan rates fall, credit expands and spending rises. A higher repo rate would do the opposite.',
}));
Q('m_crr_excess', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'To control excess demand, the central bank of an imagined economy raises the cash reserve ratio. How does this help?',
  opts: ['Banks must keep more cash with the central bank, so they have less to lend', 'Banks can lend more of their deposits', 'The government spends more', 'Taxes on consumers are cut'],
  sol: 'A higher CRR locks up more of banks\' deposits, reducing their lending power and so the money supply and spending.',
}));
Q('m_omo_sell', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'The central bank of an imagined economy sells government securities in the open market. In which situation is this the right move?',
  opts: ['Excess demand, because buyers pay with bank money, which reduces banks\' lending capacity', 'Deficient demand, because it puts more money in the hands of the public', 'Deficient demand, because it lowers interest rates', 'Any situation, because it has no effect on credit'],
  sol: 'Selling securities draws money out of the banking system, so banks can lend less and spending falls: a measure against excess demand.',
}));
Q('m_margin', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Banks in an imagined economy are told to raise the margin on loans against stocks of a scarce commodity. This qualitative measure is meant to',
  opts: ['reduce credit for buying and hoarding that commodity', 'increase total credit in the economy', 'raise government revenue', 'raise the repo rate'],
  sol: 'A higher margin requirement means a borrower gets a smaller loan against the same security, discouraging speculative borrowing for the commodity.',
}));
Q('tf_tax_cut_excess', tf({
  t: 5, d: 2, c: 'application', ans: false,
  stem: 'True or false? Cutting income-tax rates is a suitable fiscal measure for an imagined economy suffering from excess demand.',
  sol: 'False. Lower taxes raise disposable income and consumption, adding to AD; it suits deficient demand, not excess demand.',
}));
Q('ord_repo_chain', ord({
  t: 5, d: 3, c: 'analysis', marks: 1,
  stem: 'Arrange the chain by which a cut in the repo rate helps an imagined economy facing deficient demand.',
  items: [
    'Banks can borrow from the central bank more cheaply',
    'Banks lower their lending rates',
    'Firms and households borrow and spend more',
    'Aggregate demand and output rise',
  ],
  sol: 'Cheaper funds for banks lead to lower loan rates, which raise borrowing and spending, which lifts AD and output.',
}));
Q('s_fiscal_deficient', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest two fiscal measures that an imagined state government could take to reduce deficient demand, with a reason for each.',
  model: '1. **Raise government spending** on public works such as roads and irrigation: it adds directly to AD and creates incomes.\n2. **Cut taxes**: households have more disposable income, so consumption rises.',
  sol: 'Higher spending, lower taxes, with reasons.',
  scheme: [['First measure with reason', 1], ['Second measure with reason', 1]],
}));
Q('s_monetary_excess', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest two quantitative monetary measures the central bank of an imagined economy could use against excess demand, stating the direction of each.',
  model: '1. **Raise the repo rate** (or bank rate): banks pay more for funds, loan rates rise, borrowing and spending fall.\n2. **Raise the CRR** (or **sell securities** in open market operations): banks have less money to lend, so credit contracts.',
  sol: 'Two quantitative tools with the right direction.',
  scheme: [['First measure with direction', 1], ['Second measure with direction', 1]],
}));
Q('s3_qual_measures', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three qualitative (selective) credit measures a central bank might use against excess demand for a few scarce goods in an imagined economy.',
  model: '1. **Margin requirements**: raise the margin on loans against those goods, so borrowers get less credit for hoarding them.\n2. **Credit rationing**: limit the total credit banks may give for particular purposes or sectors.\n3. **Moral suasion**: persuade banks, through advice and meetings, to go slow on such lending (backed by **direct action** against banks that ignore the advice).',
  sol: 'Margin, rationing, moral suasion or direct action.',
  scheme: [['Margin requirements', 1], ['Credit rationing', 1], ['Moral suasion or direct action', 1]],
}));
Q('s3_hira_close', short({
  t: 5, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: `The imagined economy of Hiranagar faces a deflationary gap of ₹${H_GAP_DEF} crore with a multiplier of ${H_K}. A minister proposes extra government spending of ₹${H_YF_DEF - H_Y} crore to close the gap. Evaluate the proposal.`,
  model: `The proposal **overshoots**. With k = ${H_K}, extra spending of only **₹${H_GAP_DEF} crore** raises income by ${H_K} × ${H_GAP_DEF} = **${r3(H_K * H_GAP_DEF)}**, from ${H_Y} to full employment at ${H_YF_DEF}. Spending ₹${H_YF_DEF - H_Y} crore would raise income by ${r3(H_K * (H_YF_DEF - H_Y))} in principle, pushing AD **beyond** full employment and creating **inflationary pressure**. The right amount is the **gap itself**.`,
  sol: 'The gap, not the income shortfall, is the extra spending needed.',
  scheme: [['Extra spending needed is the gap of 40', 1], ['Shows 2.5 × 40 = 100 closes it', 1], ['Overshoot leads to excess demand', 1]],
}));
assert(r3(H_K * (H_YF_DEF - H_Y)) === 250, 'overshoot');
Q('l_measures_excess', long({
  t: [4, 5], d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'An imagined economy at full employment sees prices rising fast after a burst of festival spending financed by easy bank credit.\n\n(a) Identify the problem and explain how it arose. [2]\n(b) Suggest three measures, at least one fiscal and one monetary, and explain how each works. [3]',
  model: '(a) This is **excess demand**: AD is **greater than** full-employment output, an **inflationary gap**. Easy credit let households and traders **spend more** than the economy can produce at full employment, so the extra demand bids up **prices**.\n(b) 1. **Fiscal: raise taxes or cut government spending**, which reduces disposable income or public demand and lowers AD.\n2. **Monetary: raise the repo rate** or bank rate, so banks charge more for loans and borrowing falls.\n3. **Monetary: raise the CRR** or sell government securities, which cuts banks\' lending capacity; a selective step such as a **higher margin** on loans against stocks can also curb hoarding.',
  sol: 'Identify excess demand; three correctly directed measures.',
  scheme: [['Excess demand identified', 1], ['Cause explained', 1], ['Fiscal measure', 1], ['Monetary measure 1', 1], ['Monetary or selective measure 2', 1]],
}));
Q('l_measures_deficient', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Factories in an imagined economy are running below capacity and many workers who want jobs cannot find them.\n\n(a) Identify the problem and describe it on a diagram. [2]\n(b) Recommend three measures to correct it and justify each, commenting on which is likely to act fastest. [3]',
  model: '(a) This is **deficient demand**: AD **falls short** of full-employment output, a **deflationary gap**. On the income–expenditure diagram, AD cuts the forty-five degree line **to the left** of full-employment output; at full employment, the vertical gap between the forty-five degree line and AD is the deflationary gap.\n(b) 1. **More government spending** on public works: it adds to AD at once and, through the multiplier, raises income by more than the spending.\n2. **Tax cuts**: households keep more income and spend more.\n3. **Cheaper credit**: cut the repo rate and CRR, or buy securities, so banks lend more. Direct public spending usually works **fastest**, because firms may not borrow even when credit is cheap if they expect weak sales.',
  sol: 'Deficient demand; diagram; three measures with a judgement.',
  scheme: [['Problem identified', 1], ['Diagram described', 1], ['Spending measure with multiplier', 1], ['Tax or monetary measure', 1], ['Judgement on speed', 1]],
}));

// ================================================================ ISC paper-style items (4-mark, 8-mark) for the bank
Q('q4_kanakpur_eq', short({
  t: [1, 2], d: 3, c: 'application', marks: 4, wl: S4,
  stem: 'Answer both parts about an imagined coastal economy of Kanakpur where C = 40 + 0.75Y and planned investment is ₹60 crore. [2 + 2]\n\n(i) Find equilibrium income and show that saving equals investment there.\n(ii) If investment rises to ₹90 crore, find the new equilibrium income using the multiplier.',
  model: `(i) Y = (40 + 60) ÷ 0.25 = **${eqY(40, 0.75, 60)}**. Saving S = −40 + 0.25Y = −40 + ${r3(0.25 * 400)} = **${r3(-40 + 0.25 * 400)}**, equal to investment of 60.\n(ii) k = 1 ÷ 0.25 = **${kOf(0.75)}**. ΔI = 30, so ΔY = ${kOf(0.75)} × 30 = **${r3(kOf(0.75) * 30)}**, and the new income is **₹${r3(400 + kOf(0.75) * 30)} crore** (check: (40 + 90) ÷ 0.25 = ${eqY(40, 0.75, 90)}).`,
  sol: 'Equilibrium formula, saving check, multiplier.',
  scheme: [['(i) Y = 400', 1], ['(i) S = 60 = I', 1], ['(ii) k = 4 and ΔY = 120', 1], ['(ii) New Y = 520', 1]],
}));
assert(eqY(40, 0.75, 90) === 520 && r3(-40 + 0.25 * 400) === 60, 'kanakpur 4');
Q('q4_gap_measures', short({
  t: [4, 5], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts about an imagined economy where aggregate demand at the full-employment output exceeds that output. [2 + 2]\n\n(i) Name this situation and state its effect on output and prices.\n(ii) Suggest one fiscal and one monetary measure to correct it.',
  model: '(i) It is **excess demand**, also called an **inflationary gap**. The economy is already at full employment, so there are no idle workers or machines and **real output cannot rise**; the extra spending only bids up the **general price level**, and money incomes lose purchasing power.\n(ii) **Fiscal**: the government can **raise taxes** or **cut its own spending**, which leaves less money to spend and lowers AD. **Monetary**: the central bank can **raise the repo rate** or the **CRR**, so loans become dearer and scarcer, borrowing falls and spending is curbed.',
  sol: 'Name and effect; one measure of each kind.',
  scheme: [['(i) Excess demand named', 1], ['(i) Prices rise, output does not', 1], ['(ii) Fiscal measure', 1], ['(ii) Monetary measure', 1]],
}));
Q('q4_fe_unemp', short({
  t: 3, d: 2, c: 'understanding', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) Explain full employment as an imagined Jharkhand labour department would use the term.\n(ii) Using a worker who wants a job at the going wage but cannot find one, explain involuntary unemployment and why Keynes thought it could last.',
  model: '(i) **Full employment** is the situation in which **everyone able and willing to work at the prevailing wage** has a job. It does **not** mean zero unemployment: people **changing jobs** (frictional) or **choosing not to work** may still be idle.\n(ii) A worker who **accepts the going wage** but **finds no job** is **involuntarily unemployed**. Keynes argued that output is set by **aggregate demand**; if planned spending is low, the economy settles at an **equilibrium below full employment**, so such unemployment can **persist**.',
  sol: 'Definition with what it excludes; involuntary unemployment and the Keynesian reason.',
  scheme: [['(i) Full employment defined', 1], ['(i) Frictional or voluntary idleness allowed', 1], ['(ii) Involuntary unemployment explained', 1], ['(ii) Persists because AD sets equilibrium', 1]],
}));
Q('l8_tarangpur', long({
  t: [1, 2], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) The imagined economy of Tarangpur has C = ${T.a} + ${T.b}Y and planned investment of ₹${T.I} crore. Find equilibrium income by both approaches and describe a diagram showing it.\n(ii) Investment rises by ₹${T_DI} crore. Find the new equilibrium income, and explain the working of the multiplier behind the change.`,
  model: `(i) **AD = AS**: ${T.a} + ${T.b}Y + ${T.I} = Y, so ${r3(1 - T.b)}Y = ${T.a + T.I} and **Y = ${T_Y}**. **S = I**: −${T.a} + ${r3(1 - T.b)}Y = ${T.I}, which also gives **Y = ${T_Y}**. Diagram: income on the x-axis and spending on the y-axis; a forty-five degree line for AS; the **AD line** starting at ${T.a + T.I} with slope ${T.b}, cutting the forty-five degree line at **E (${T_Y}, ${T_Y})**. Below the axis, the saving line (from −${T.a}) meets the horizontal investment line at the **same income**.\n(ii) k = 1 ÷ (1 − ${T.b}) = **${T_K}**; ΔY = ${T_K} × ${T_DI} = **${r3(T_K * T_DI)}**; new income **₹${T_Y2} crore**. The extra ₹${T_DI} crore is paid out as **income** to workers and suppliers; they spend **${T.b}** of it, which becomes others\' income, who again spend ${T.b} of that. These **shrinking rounds** add up to ${T_K} times the first injection, because **${r3(1 - T.b)}** of each round leaks into saving.`,
  sol: 'Both approaches; diagram; multiplier and rounds.',
  scheme: [['(i) AD = AS gives 500', 1], ['(i) S = I gives 500', 1], ['(i) Diagram: AD, 45° line, E', 1], ['(i) Saving–investment panel', 1], ['(ii) k = 5', 1], ['(ii) New Y = 600', 1], ['(ii) Rounds of spending explained', 1], ['(ii) Leakage into saving limits the total', 1]],
}));
Q('l8_gaps_policy', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) In the imagined economy of Hiranagar, AD = ${H.a + H.I} + ${H.b}Y and full-employment output is ₹${H_YF_DEF} crore. Find the gap, explain its effects and show how much extra spending would close it.\n(ii) Compare fiscal and monetary measures as cures for such a gap, and recommend a mix for Hiranagar.`,
  model: `(i) **AD at ${H_YF_DEF}** = ${H.a + H.I} + ${r3(H.b * H_YF_DEF)} = **${H_AD(H_YF_DEF)}**: a **deflationary gap of ₹${H_GAP_DEF} crore**. Income settles at **₹${H_Y} crore**, so output and employment are below full employment and willing workers stay jobless. With **k = ${H_K}**, extra spending of **₹${H_GAP_DEF} crore** raises income by ${H_K} × ${H_GAP_DEF} = **${r3(H_K * H_GAP_DEF)}**, exactly to ₹${H_YF_DEF} crore.\n(ii) **Fiscal measures** (more public spending, lower taxes) act on demand **directly**; public works add to AD at once, though they may take time to approve and can raise the **deficit**. **Monetary measures** (cutting the repo rate and CRR, buying securities) make **credit cheaper**, but firms may still not borrow if they expect **weak sales**, so they work **indirectly**. For Hiranagar, a **mix** suits best: **₹${H_GAP_DEF} crore of extra public spending** to lift demand quickly, backed by **easier credit** to support private investment as confidence returns.`,
  sol: 'Gap, effects, needed spending; comparison and recommended mix.',
  scheme: [['(i) AD at 400 = 360', 1], ['(i) Deflationary gap 40 and its effects', 1], ['(i) Extra spending of 40 with k = 2.5', 1], ['(i) Check: 2.5 × 40 = 100', 1], ['(ii) Fiscal measures: direct effect', 1], ['(ii) Monetary measures: indirect effect', 1], ['(ii) A limitation of each', 1], ['(ii) Reasoned mix recommended', 1]],
}));

// ================================================================ case-based
Q('cb_tarangpur_stocks', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined report from the economy of Tarangpur and answer the questions that follow. *(Written by SOYL for practice; the economy and figures are imagined.)*',
  passage: `**Monthly bulletin of an imagined chamber of commerce, Tarangpur (₹ crore)**\n\nHouseholds in Tarangpur spend according to C = ${T.a} + ${T.b}Y, and firms plan to invest ₹${T.I} crore. This quarter the economy produced goods worth ₹600 crore, and warehouse managers reported unsold stocks building up beyond plan. A port company has now announced a new ₹${T_DI} crore jetty.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: T_AD(600), unit: '₹ crore', stem: 'What was planned spending (aggregate demand) at the output of ₹600 crore?', sol: `AD = ${T.a} + ${T.b} × 600 + ${T.I} = ${T_AD(600)}.` })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Why were unsold stocks building up?', model: `Planned spending (**${T_AD(600)}**) was **less than output** (600), so ₹20 crore of goods went unsold: **AD < AS**.`, sol: 'AD below output.', scheme: [['AD < AS explained', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the equilibrium income before the jetty and after it, and explain the difference.', model: `Before: (${T.a} + ${T.I}) ÷ ${r3(1 - T.b)} = **${T_Y}**. After: k = ${T_K}, so income rises by ${T_K} × ${T_DI} = ${r3(T_K * T_DI)} to **${T_Y2}**. The jetty spending is **multiplied** through rounds of spending.`, sol: 'Equilibrium formula and multiplier.', scheme: [['Before 500, after 600', 1], ['Multiplier explanation', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how output in Tarangpur will adjust from ₹600 crore before the jetty is built.', model: `With stocks piling up, firms **cut production** and jobs. As income falls, saving falls too, until planned spending equals output at **₹${T_Y} crore**, where **S = I = ${T.I}**.`, sol: 'Output falls to S = I.', scheme: [['Firms cut output', 1], ['Settles at 500 with S = I', 1]] }),
    ]),
  ],
}));
Q('cb_hira_jobs', caseQ({
  t: [3, 4, 5], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the imagined newspaper report on the economy of Hiranagar and answer the questions that follow. *(Written by SOYL for practice; the economy and figures are imagined.)*',
  passage: `**"Jobs scarce as factories idle" — an imagined Hiranagar daily**\n\nEconomists estimate that Hiranagar needs output of ₹${H_YF_DEF} crore to employ everyone who wants work at today's wages, but planned spending is only AD = ${H.a + H.I} + ${H.b}Y. Many young graduates say they would take any job at the going wage but cannot find one. The finance minister is weighing a public-housing programme; the central bank is considering a cut in its policy rate.`,
  parts: [
    child('a', num({ t: 4, d: 3, c: 'application', marks: 1, value: H_GAP_DEF, unit: '₹ crore', stem: 'Calculate the deflationary gap.', sol: `AD at ${H_YF_DEF} = ${H_AD(H_YF_DEF)}; gap = ${H_YF_DEF} − ${H_AD(H_YF_DEF)} = ${H_GAP_DEF}.` })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'What kind of unemployment do the young graduates face?', model: '**Involuntary unemployment**: they are willing to work at the going wage but find no jobs.', sol: 'Willing at the going wage, no work.', scheme: [['Involuntary unemployment', 1]] })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate which of the two proposals is likely to close the gap faster.', model: `The **public-housing programme** adds to AD **directly**: ₹${H_GAP_DEF} crore of spending would, with k = ${H_K}, raise income by ${r3(H_K * H_GAP_DEF)} to full employment. A **policy-rate cut** works only if firms and households choose to **borrow more**, which may be slow when sales are weak. So the programme is likely faster.`, sol: 'Direct fiscal effect versus indirect monetary effect.', scheme: [['Fiscal effect with figures', 1], ['Judgement on the rate cut', 1]] }), [
      short({ t: 5, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Explain how a cut in the central bank\'s policy rate could help Hiranagar.', model: 'Banks borrow from the central bank **more cheaply** and **lower their loan rates**. Firms and households **borrow and spend more**, so **aggregate demand rises** towards full-employment output.', sol: 'Rate-cut transmission.', scheme: [['Cheaper credit', 1], ['More spending raises AD', 1]] }),
    ]),
  ],
}));
Q('cb_festival_prices', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined account from a town economy during a festival season and answer the questions that follow. *(Written by SOYL for practice; the town is imagined.)*',
  passage: '**Notes from an imagined Ujjain traders\' association**\n\nAll the town\'s workshops are running at full capacity and every worker who wants a job has one. In the festival season, families have taken large easy loans and spending has jumped. Shopkeepers report that they cannot get more goods from suppliers, and prices of clothes, sweets and gold have climbed week after week.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Identify the problem described.', model: '**Excess demand** at full employment: an **inflationary gap**.', sol: 'AD above full-employment output.', scheme: [['Excess demand / inflationary gap', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Why have prices risen instead of output?', model: 'The town is at **full employment**: workshops cannot produce more, so extra demand **bids up prices**.', sol: 'No spare capacity.', scheme: [['Full employment: output cannot rise', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Suggest two monetary measures the central bank could take, and explain one.', model: '1. **Raise the repo rate**, so banks charge more on loans and families borrow less.\n2. **Raise the CRR** (or a higher margin on gold loans), cutting banks\' lending capacity.', sol: 'Two contractionary monetary measures.', scheme: [['First measure explained', 1], ['Second measure', 1]] }), [
      short({ t: 5, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two fiscal measures the government could take, and explain one.', model: '1. **Raise taxes**, leaving families less disposable income to spend.\n2. **Postpone or cut public spending** on non-urgent projects, which lowers aggregate demand.', sol: 'Two contractionary fiscal measures.', scheme: [['First measure explained', 1], ['Second measure', 1]] }),
    ]),
  ],
}));
