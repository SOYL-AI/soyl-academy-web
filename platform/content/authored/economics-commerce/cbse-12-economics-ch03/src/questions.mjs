// CBSE 12 Economics, ch03 Determination of Income and Employment — question bank. Every scenario,
// schedule and economy is imagined by SOYL; no NCERT exercise, boxed example or board/sample-paper
// item is reused. Every number in a key or worked solution is computed here, so stems, keys and
// solutions cannot drift apart.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [100, 120];

/** Round away floating-point noise (0.8 is not exact in binary). */
export const r3 = (x) => Math.round(x * 1000) / 1000;
/** Indian digit grouping. */
export const f = (n) => r3(n).toLocaleString('en-IN');
/** Equilibrium income of a two-sector economy: Y = (autonomous consumption + investment) / (1 − MPC). */
export const eqY = (a, b, I) => r3((a + I) / (1 - b));
export const K = (b) => r3(1 / (1 - b));

// ================================================================ t01 Aggregate demand and its components
Q('m_ad_two', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In a two-sector economy (households and firms only), aggregate demand is the sum of',
  opts: ['planned consumption and planned investment expenditure', 'consumption and saving', 'consumption, investment, government spending and net exports', 'saving and investment'],
  sol: 'With no government and no foreign sector, the only planned spending on final goods comes from households (consumption) and firms (investment). Consumption plus saving is aggregate supply, not demand; the four-component form applies to an open economy with a government.',
}));
Q('m_exante', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Ex-ante investment refers to',
  opts: [
    'the investment that firms plan to make during a period',
    'the investment actually made, including unplanned changes in stock',
    'the depreciation of fixed capital during the year',
    'the purchase of shares and bonds by households',
  ],
  sol: '"Ex-ante" means planned or intended. Actual investment including unintended inventory change is ex-post investment. Depreciation is wear and tear, and buying shares is a financial transaction, not investment in the macroeconomic sense.',
}));
Q('m_autonomous_inv', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the short-run income determination model, investment is treated as **autonomous**. This means investment',
  opts: [
    'does not change when the level of income changes',
    'rises in the same proportion as income',
    'is always equal to saving at every level of income',
    'is decided by households, not by firms',
  ],
  sol: 'Autonomous investment is fixed by factors other than current income (expectations, interest rates, technology), so its curve is a horizontal line against income. It is not proportional to income, it equals saving only at equilibrium, and investment decisions are made by firms.',
}));
Q('m_as_eq', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In a two-sector economy, aggregate supply at any level of income can be written as',
  opts: ['consumption + saving', 'consumption + investment', 'investment + saving', 'consumption − saving'],
  sol: 'Aggregate supply is the value of output, which equals the income generated (Y). Income is either consumed or saved, so AS = C + S. C + I is aggregate demand.',
}));
Q('tf_ad_planned', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Aggregate demand refers to the total **planned** expenditure on final goods and services in an economy during a period.',
  sol: 'Aggregate demand is an ex-ante concept: it is what buyers intend to spend at each level of income, not what was actually spent.',
}));
Q('fb_as', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In a two-sector economy, aggregate supply = consumption + ___.',
  acc: [['saving', 'savings']],
  sol: 'Income received is either consumed or saved, so aggregate supply (equal to income) = consumption + saving.',
}));
{
  const a = 80, b = 0.6, I = 40, Y = 500;
  const C = r3(a + b * Y);
  Q('n_ad', num({
    t: [1, 2], d: 2, c: 'application', value: r3(C + I), unit: '₹ crore', marks: 1,
    stem: `An imagined two-sector economy has the consumption function C = ${a} + ${b}Y and autonomous investment of ₹${I} crore. What is aggregate demand when income is ₹${Y} crore (in ₹ crore)?`,
    sol: `Step 1: C = ${a} + ${b} × ${Y} = ${C}.\nStep 2: AD = C + I = ${C} + ${I} = ${r3(C + I)}. So AD is ₹${f(C + I)} crore.`,
  }));
}
Q('s_exante_post', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between ex-ante investment and ex-post investment.',
  model: '1. **Ex-ante** investment is the investment firms **plan** to make in a period, decided before the period begins.\n2. **Ex-post** investment is the **actual** investment at the end of the period; it includes **unplanned** changes in inventories, for example unsold goods piling up.',
  sol: 'One point on each: planned versus actual, with the unplanned inventory change as the source of difference.',
  scheme: [['Ex-ante: planned investment', 1], ['Ex-post: actual investment including unplanned inventory change', 1]],
}));
Q('s_ad_components', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State the components of aggregate demand in (i) a two-sector economy and (ii) an open economy with a government.',
  model: '(i) Two-sector economy: **AD = C + I**, planned household consumption plus planned investment by firms.\n(ii) Open economy with a government: **AD = C + I + G + (X − M)**, adding government expenditure and net exports (exports minus imports).',
  sol: 'Write both expressions and name each component.',
  scheme: [['Two-sector: C + I named', 1], ['Four-sector: C + I + G + (X − M) named', 1]],
}));

// ================================================================ t02 Propensity to consume and save
Q('m_mpc_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Marginal propensity to consume (MPC) is the ratio of',
  opts: ['change in consumption to change in income', 'total consumption to total income', 'change in saving to change in income', 'total saving to total consumption'],
  sol: 'MPC = ΔC ÷ ΔY. Total consumption ÷ total income is the APC, and ΔS ÷ ΔY is the MPS.',
}));
Q('m_apc_gt1', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The average propensity to consume (APC) is **greater than one** when',
  opts: [
    'consumption is more than income, so households dissave',
    'saving is positive and rising',
    'income is above the break-even level',
    'the MPC is equal to the MPS',
  ],
  sol: 'APC = C ÷ Y exceeds 1 only when C > Y, which happens at low incomes below the break-even point, financed by past savings or borrowing (dissaving). Above break-even, saving is positive and APC is less than 1.',
}));
Q('m_mpc_range', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the usual Keynesian consumption function, the value of MPC',
  opts: ['lies between 0 and 1', 'is always greater than 1', 'is always equal to the APC', 'is negative'],
  sol: 'When income rises, people consume part of the increase and save the rest, so 0 < MPC < 1. MPC equals APC only in the special case of no autonomous consumption, and a negative MPC would mean consumption falls as income rises.',
}));
{
  const y0 = 800, y1 = 1000, c0 = 680, c1 = 840;
  const mpc = r3((c1 - c0) / (y1 - y0));
  Q('m_mps_calc', mcq({
    t: 2, d: 2, c: 'application',
    stem: `When a household's income rises from ₹${f(y0)} to ₹${f(y1)} a week, its consumption rises from ₹${c0} to ₹${c1}. Its marginal propensity to **save** is`,
    opts: [String(r3(1 - mpc)), String(mpc), String(r3((c1 - c0) / y1)), String(r3((y1 - y0) / (c1 - c0) / 5))],
    sol: `ΔC = ${c1} − ${c0} = ${c1 - c0}; ΔY = ${y1} − ${y0} = ${y1 - y0}; MPC = ${c1 - c0} ÷ ${y1 - y0} = ${mpc}. MPS = 1 − MPC = ${r3(1 - mpc)}. The value ${mpc} is the MPC, not the MPS.`,
  }));
}
{
  const a = 60, b = 0.8;
  const be = r3(a / (1 - b));
  Q('m_breakeven', mcq({
    t: 2, d: 3, c: 'application',
    stem: `For the consumption function C = ${a} + ${b}Y (₹ crore), the break-even level of income (where saving is zero) is`,
    opts: [`₹${be} crore`, `₹${r3(a / b)} crore`, `₹${r3(a * b)} crore`, `₹${r3(be * b)} crore`],
    sol: `At break-even C = Y, so Y = ${a} + ${b}Y, giving ${r3(1 - b)}Y = ${a} and Y = ${a} ÷ ${r3(1 - b)} = ${be}. Saving there is −${a} + ${r3(1 - b)} × ${be} = 0.`,
  }));
}
Q('ar_mpc_mps', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'The sum of MPC and MPS is always equal to one.',
  r: 'Any increase in income is either spent on consumption or saved.',
  sol: 'Both are true and R explains A: since ΔY = ΔC + ΔS, dividing by ΔY gives MPC + MPS = 1.',
}));
Q('ar_apc_mpc', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'APC can be greater than one at very low levels of income.',
  r: 'MPC is less than one in the Keynesian consumption function.',
  sol: 'Both are true, but R does not explain A. APC exceeds one because autonomous consumption makes C larger than Y at low incomes (dissaving); the fact that MPC is below one is about changes in consumption, not about the C ÷ Y ratio.',
}));
{
  const Y = 2000, C = 1700;
  Q('n_aps', num({
    t: 2, d: 2, c: 'understanding', value: r3((Y - C) / Y), marks: 1,
    stem: `An imagined household earns ₹${f(Y)} a month and spends ₹${f(C)} on consumption. Calculate its average propensity to save (APS).`,
    sol: `Step 1: S = Y − C = ${f(Y)} − ${f(C)} = ${Y - C}.\nStep 2: APS = S ÷ Y = ${Y - C} ÷ ${Y} = ${r3((Y - C) / Y)}.`,
  }));
}
{
  const mps = 0.25, dY = 400;
  Q('n_dc', num({
    t: 2, d: 2, c: 'understanding', value: r3((1 - mps) * dY), unit: '₹ crore', marks: 1,
    stem: `In an imagined economy MPS = ${mps}. If national income rises by ₹${dY} crore, by how much does consumption rise (in ₹ crore)?`,
    sol: `Step 1: MPC = 1 − MPS = 1 − ${mps} = ${r3(1 - mps)}.\nStep 2: ΔC = MPC × ΔY = ${r3(1 - mps)} × ${dY} = ${r3((1 - mps) * dY)}. So consumption rises by ₹${r3((1 - mps) * dY)} crore.`,
  }));
}
Q('mt_prop', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each propensity with the ratio that measures it.',
  pairs: [
    ['Average propensity to consume', 'C ÷ Y'],
    ['Marginal propensity to consume', 'ΔC ÷ ΔY'],
    ['Average propensity to save', 'S ÷ Y'],
    ['Marginal propensity to save', 'ΔS ÷ ΔY'],
  ],
  sol: '"Average" uses total values (C or S over Y); "marginal" uses changes (ΔC or ΔS over ΔY).',
}));
Q('tf_apc_fall', tf({
  t: 2, d: 3, c: 'analysis', ans: true,
  stem: 'True or false? For a consumption function C = 50 + 0.8Y, the APC falls as income rises.',
  sol: 'APC = 50 ÷ Y + 0.8. As Y rises, 50 ÷ Y gets smaller, so APC falls towards 0.8 (the MPC), although it never goes below it.',
}));
Q('s_apc_mpc', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Can the APC be greater than one? Can the MPC be greater than one? Give a reason for each answer.',
  model: '1. **APC can exceed one**: at very low incomes, consumption (because of autonomous consumption) is more than income, so C ÷ Y > 1 and households dissave.\n2. **MPC cannot exceed one** in the usual model: of any extra rupee of income, people cannot normally spend more than the whole rupee, so ΔC ≤ ΔY.',
  sol: 'Two separate judgements, each with the reason.',
  scheme: [['APC can be > 1, with reason (C > Y at low income)', 1], ['MPC is not > 1, with reason (ΔC cannot exceed ΔY)', 1]],
}));
{
  const Ys = [0, 250, 500, 750, 1000];
  const Cs = Ys.map((y) => r3(50 + 0.8 * y));
  const Ss = Ys.map((y, i) => r3(y - Cs[i]));
  Q('s3_schedule', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `The consumption schedule of an imagined economy is given (₹ crore).\n\n| Income (Y) | ${Ys.join(' | ')} |\n|---|${Ys.map(() => '---').join('|')}|\n| Consumption (C) | ${Cs.join(' | ')} |\n\nCalculate (i) the MPC, (ii) the saving at each level of income, and (iii) the APS at an income of ₹${f(Ys[4])} crore.`,
    model: `(i) Each time Y rises by 250, C rises by ${r3(Cs[1] - Cs[0])}, so **MPC = ${r3(Cs[1] - Cs[0])} ÷ 250 = ${r3((Cs[1] - Cs[0]) / 250)}**.\n(ii) S = Y − C: **${Ss.join(', ')}** (saving is zero at the break-even income of ₹250 crore).\n(iii) **APS = ${Ss[4]} ÷ ${Ys[4]} = ${r3(Ss[4] / Ys[4])}**.`,
    sol: 'Use the changes for MPC, subtract C from Y for saving, and divide total saving by total income for APS.',
    scheme: [['MPC with working', 1], ['Saving at all five income levels', 1], ['APS at the highest income', 1]],
  }));
}

// ================================================================ t03 Equilibrium output and the multiplier
Q('m_eq_cond', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In the two-sector model, the equilibrium level of income is determined where',
  opts: ['aggregate demand equals aggregate supply', 'consumption equals income', 'saving is zero', 'investment equals consumption'],
  sol: 'Income is in equilibrium when planned spending (AD) equals the value of output (AS); equivalently, planned saving equals planned investment. Consumption equals income at the break-even point, where saving is zero, which is not in general the equilibrium.',
}));
{
  const a = 50, b = 0.8, I = 70;
  const Y = eqY(a, b, I);
  Q('m_eq_calc', mcq({
    t: 3, d: 3, c: 'application',
    stem: `In an imagined economy C = ${a} + ${b}Y and investment is ₹${I} crore. The equilibrium level of income is`,
    opts: [`₹${f(Y)} crore`, `₹${f(r3((a + I) / b))} crore`, `₹${f(r3(a / (1 - b)))} crore`, `₹${f(r3(I / (1 - b)))} crore`],
    sol: `At equilibrium Y = C + I, so Y = ${a} + ${b}Y + ${I}, giving ${r3(1 - b)}Y = ${a + I} and Y = ${a + I} ÷ ${r3(1 - b)} = ${Y}. The value ${f(r3(a / (1 - b)))} is only the break-even income.`,
  }));
}
Q('m_k_mps', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'If the marginal propensity to save is 0.2, the value of the investment multiplier is',
  opts: ['5', '0.2', '1.25', '4'],
  sol: `K = 1 ÷ MPS = 1 ÷ 0.2 = ${r3(1 / 0.2)}. The value 1.25 would be 1 ÷ MPC, a common slip.`,
}));
Q('m_k_range', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The **minimum** possible value of the investment multiplier is 1. This occurs when',
  opts: ['MPC = 0, so the whole of any extra income is saved', 'MPC = 1, so the whole of any extra income is spent', 'MPS = 0', 'APC = APS'],
  sol: 'K = 1 ÷ (1 − MPC). With MPC = 0 (MPS = 1), K = 1: income rises only by the investment itself, with no further rounds of spending. MPC = 1 (MPS = 0) makes K infinitely large.',
}));
{
  const k = 4, dI = 250;
  Q('m_di', mcq({
    t: 3, d: 2, c: 'understanding',
    stem: `The investment multiplier in an imagined economy is ${k}. If investment rises by ₹${dI} crore, national income rises by`,
    opts: [`₹${f(k * dI)} crore`, `₹${f(dI / k)} crore`, `₹${f(dI + k)} crore`, `₹${f(dI)} crore`],
    sol: `ΔY = K × ΔI = ${k} × ${dI} = ${k * dI}, so income rises by ₹${f(k * dI)} crore.`,
  }));
}
Q('m_above_eq', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Suppose firms produce more than the equilibrium output, so that planned aggregate demand is **less** than aggregate supply. What happens next?',
  opts: [
    'Unsold stocks pile up beyond what firms planned, so firms cut production until AD = AS',
    'Stocks run down below the desired level, so firms raise production',
    'Prices rise sharply and output stays unchanged',
    'Households increase saving until saving equals consumption',
  ],
  sol: 'If AD < AS, part of output remains unsold, so inventories rise above the desired level (unplanned investment). Firms respond by reducing output and employment, and income falls back to the equilibrium level. Stocks fall below the desired level only when AD exceeds AS.',
}));
Q('ar_k_mpc', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'The higher the MPC, the larger is the value of the investment multiplier.',
  r: 'The MPS is the reciprocal of the APS.',
  sol: 'A is true: K = 1 ÷ (1 − MPC), so a higher MPC means a smaller denominator and a bigger multiplier. R is false: MPS + MPC = 1; the MPS is not the reciprocal of the APS.',
}));
Q('ar_s_i', ar({
  t: 3, d: 4, c: 'analysis', key: 'b',
  a: 'At the equilibrium level of income, planned saving equals planned investment.',
  r: 'Actual (ex-post) saving is always equal to actual (ex-post) investment.',
  sol: 'Both are true, but R does not explain A. A is about plans and holds only at equilibrium; R is an accounting identity that holds at every income level because unplanned inventory changes absorb the difference.',
}));
{
  const a = 120, b = 0.6, I = 80;
  const Y = eqY(a, b, I);
  Q('n_eq', num({
    t: 3, d: 3, c: 'application', value: Y, unit: '₹ crore', marks: 2,
    stem: `An imagined two-sector economy has the consumption function C = ${a} + ${b}Y and autonomous investment of ₹${I} crore. Find the equilibrium level of income (in ₹ crore).`,
    sol: `Step 1: Equilibrium: Y = C + I = ${a} + ${b}Y + ${I}.\nStep 2: Y − ${b}Y = ${a + I}, so ${r3(1 - b)}Y = ${a + I}.\nStep 3: Y = ${a + I} ÷ ${r3(1 - b)} = ${Y}. Equilibrium income is ₹${f(Y)} crore.`,
    scheme: [['Equilibrium condition Y = C + I set up', 1], [`Y = ₹${f(Y)} crore`, 1]],
  }));
}
{
  const dI = 300, dY = 1200;
  const k = dY / dI;
  Q('n_mpc_from_k', num({
    t: 3, d: 3, c: 'application', value: r3(1 - 1 / k), marks: 2,
    stem: `An increase of ₹${dI} crore in investment in an imagined economy raises its income by ₹${f(dY)} crore. Calculate the marginal propensity to consume.`,
    sol: `Step 1: K = ΔY ÷ ΔI = ${dY} ÷ ${dI} = ${k}.\nStep 2: K = 1 ÷ (1 − MPC), so 1 − MPC = 1 ÷ ${k} = ${r3(1 / k)}.\nStep 3: MPC = 1 − ${r3(1 / k)} = ${r3(1 - 1 / k)}.`,
    scheme: [['Multiplier from the data', 1], [`MPC = ${r3(1 - 1 / k)}`, 1]],
  }));
}
{
  const mpc = 0.9, dY = 2000;
  const k = K(mpc);
  Q('n_di_needed', num({
    t: 3, d: 3, c: 'application', value: r3(dY / k), unit: '₹ crore', marks: 1,
    stem: `In an imagined economy MPC = ${mpc}. By how much must investment rise to raise income by ₹${f(dY)} crore (in ₹ crore)?`,
    sol: `Step 1: K = 1 ÷ (1 − ${mpc}) = ${k}.\nStep 2: ΔI = ΔY ÷ K = ${dY} ÷ ${k} = ${r3(dY / k)}. So investment must rise by ₹${r3(dY / k)} crore.`,
  }));
}
Q('ord_multiplier', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the stages of the multiplier process after a rise in investment, in the correct order.',
  items: [
    'Firms spend more on building a new factory',
    'Workers and suppliers who build it receive extra income',
    'They spend a part of this extra income (in proportion to the MPC) on consumer goods',
    'The sellers of those goods earn extra income and spend a part of it in turn',
    'Total income rises by a multiple of the original investment',
  ],
  sol: 'Investment spending becomes someone\'s income; a fraction (the MPC) of each new income is re-spent; the rounds get smaller, and their sum is K times the original investment.',
}));
Q('fb_k', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Investment multiplier (K) = 1 ÷ ___ (name the propensity).',
  acc: [['MPS', 'marginal propensity to save', '1 − MPC', '1 - MPC']],
  sol: 'K = 1 ÷ MPS, which is the same as 1 ÷ (1 − MPC).',
}));
Q('s_k_mpc', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the relationship between the marginal propensity to consume and the investment multiplier.',
  model: '1. They are **directly related**: K = 1 ÷ (1 − MPC).\n2. A **higher MPC** means a larger part of each round of extra income is **re-spent**, so the rounds of income are bigger and the multiplier is **larger**; for example MPC 0.75 gives K = 4, while MPC 0.5 gives K = 2.',
  sol: 'State the formula and the direction of the relation, with an illustration.',
  scheme: [['Direct relation with the formula', 1], ['Reason (re-spending) or a numerical illustration', 1]],
}));
{
  const a = 40, b = 0.75, I = 60;
  const Y = eqY(a, b, I), S = r3(-a + (1 - b) * Y);
  Q('s_eq_si', short({
    t: 3, d: 3, c: 'application', marks: 2,
    stem: `For an imagined economy, the saving function is S = −${a} + ${r3(1 - b)}Y and investment is ₹${I} crore. Find the equilibrium level of income using the saving–investment approach.`,
    model: `At equilibrium **S = I**: −${a} + ${r3(1 - b)}Y = ${I}, so ${r3(1 - b)}Y = ${a + I} and **Y = ${a + I} ÷ ${r3(1 - b)} = ₹${f(Y)} crore**. Check: S = −${a} + ${r3(1 - b)} × ${Y} = ${S} = I.`,
    sol: 'Set planned saving equal to planned investment and solve for Y.',
    scheme: [['Condition S = I set up', 1], [`Y = ₹${f(Y)} crore`, 1]],
  }));
}
{
  const a = 200, b = 0.75, I = 100;
  const Y = eqY(a, b, I), C = r3(a + b * Y), S = r3(Y - C);
  Q('s3_eq_calc', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `In an imagined economy, C = ${a} + ${b}Y and investment is ₹${I} crore. Calculate (i) the equilibrium level of income, (ii) consumption at equilibrium, and (iii) saving at equilibrium.`,
    model: `(i) Y = C + I: Y = ${a} + ${b}Y + ${I}, so ${r3(1 - b)}Y = ${a + I} and **Y = ₹${f(Y)} crore**.\n(ii) C = ${a} + ${b} × ${f(Y)} = **₹${f(C)} crore**.\n(iii) S = Y − C = ${f(Y)} − ${f(C)} = **₹${S} crore**, which equals investment, as it must at equilibrium.`,
    sol: 'Solve Y = C + I, substitute Y into the consumption function, and subtract.',
    scheme: [['Equilibrium income', 1], ['Consumption at equilibrium', 1], ['Saving at equilibrium (equal to I)', 1]],
  }));
}
Q('s3_unplanned', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain what happens in an economy if planned aggregate demand is **greater** than aggregate supply.',
  model: '1. Buyers plan to purchase **more than firms are producing**, so firms meet the extra demand from their **stocks**.\n2. Inventories fall **below the desired level** (unplanned disinvestment), a signal to firms that demand is strong.\n3. Firms **raise output and employ more** factors, so income rises; this continues until AD equals AS at the equilibrium level of income.',
  sol: 'Three linked steps: excess demand, stocks fall below plan, output and income rise to equilibrium.',
  scheme: [['Demand exceeds output', 1], ['Unplanned fall in inventories', 1], ['Output, employment and income rise until AD = AS', 1]],
}));
{
  const b = 0.8, dI = 100, k = K(b);
  const rounds = [dI];
  for (let i = 1; i < 4; i++) rounds.push(r3(rounds[i - 1] * b));
  Q('l_multiplier', long({
    t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
    stem: `Explain the working of the investment multiplier with the help of a numerical example (take MPC = ${b} and an increase in investment of ₹${dI} crore).`,
    model: `1. **Meaning:** the multiplier K is the ratio of the change in income to the change in investment, K = ΔY ÷ ΔI = 1 ÷ (1 − MPC).\n2. **Round 1:** investment of ₹${dI} crore becomes the **income** of workers and suppliers: ΔY = ${dI}.\n3. **Round 2:** they spend ${b} of it, ₹${rounds[1]} crore, which becomes others\' income; **round 3:** ₹${rounds[2]} crore; **round 4:** ₹${rounds[3]} crore, and so on.\n4. The rounds get **smaller** because a part (MPS = ${r3(1 - b)}) is saved each time.\n5. **Total:** K = 1 ÷ ${r3(1 - b)} = ${k}, so ΔY = ${k} × ${dI} = **₹${f(k * dI)} crore**: income rises by a multiple of investment.`,
    sol: 'Definition, the first three or four rounds of spending, why they shrink, and the final total from K.',
    scheme: [['Meaning and formula of K', 1], ['First round: investment becomes income', 1], ['Later rounds through the MPC', 1], ['Leakage into saving makes rounds smaller', 1], ['Correct total increase in income', 1]],
  }));
}
Q('l_eq_si', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the determination of the equilibrium level of income using the saving–investment approach. What happens if planned saving exceeds planned investment? (Describe the diagram in words.)',
  model: '1. **Diagram:** income on the x-axis; the **saving curve** slopes upward from below the origin (negative saving at low income); the **investment curve** is a horizontal line (autonomous investment).\n2. **Equilibrium:** where the curves cut, **planned S = planned I**; this fixes the equilibrium income.\n3. **S > I** (income above equilibrium): households withdraw more from spending than firms inject, so **AD < AS**.\n4. Unsold goods pile up (**unplanned** inventory rise), so firms **cut output and employment**.\n5. Income **falls**, and saving falls with it, until **S = I** again at the equilibrium income; if S < I, the opposite happens.',
  sol: 'Describe both curves, the equilibrium condition, and the adjustment when S > I (and briefly S < I).',
  scheme: [['Saving and investment curves described', 1], ['Equilibrium at S = I', 1], ['S > I means AD < AS', 1], ['Unplanned inventories and output cut', 1], ['Income falls back to equilibrium', 1]],
}));
{
  const a = 150, b = 0.8, I = 250, dI = 50;
  const Y = eqY(a, b, I), k = K(b), Y2 = r3(Y + k * dI), S2 = r3(-a + (1 - b) * Y2);
  Q('l_eq_num', long({
    t: 3, d: 4, c: 'application', marks: 5,
    stem: `An imagined economy has C = ${a} + ${b}Y and autonomous investment of ₹${I} crore.\n(a) Find the equilibrium level of income.\n(b) Investment now rises by ₹${dI} crore. Find the investment multiplier, the change in income and the new equilibrium income.\n(c) Show that planned saving equals planned investment at the new equilibrium.`,
    model: `(a) Y = ${a} + ${b}Y + ${I}; ${r3(1 - b)}Y = ${a + I}; **Y = ₹${f(Y)} crore**.\n(b) **K** = 1 ÷ (1 − ${b}) = **${k}**; **ΔY** = ${k} × ${dI} = **₹${f(k * dI)} crore**; new **Y = ${f(Y)} + ${f(k * dI)} = ₹${f(Y2)} crore**.\n(c) S = −${a} + ${r3(1 - b)} × ${f(Y2)} = **${S2}**, and new I = ${I} + ${dI} = **${I + dI}**, so **S = I**.`,
    sol: 'Solve for Y, use K for the change, then substitute the new income into the saving function.',
    scheme: [['Initial equilibrium income', 1], ['Multiplier', 1], ['Change in income', 1], ['New equilibrium income', 1], ['S = I verified at the new equilibrium', 1]],
  }));
}

// ================================================================ t04 Full employment and involuntary unemployment
Q('m_full_emp', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In macroeconomics, **full employment** refers to a situation in which',
  opts: [
    'everyone who is able and willing to work at the prevailing wage rate gets work',
    'every person in the country, including children and the retired, has a job',
    'there is no unemployment of any kind, not even while people change jobs',
    'all workers are employed by the government',
  ],
  sol: 'Full employment means there is no involuntary unemployment: those able and willing to work at the going wage find work. Some frictional unemployment (people between jobs) and voluntary unemployment can still exist; it does not mean every person works.',
}));
Q('m_invol', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Rafiq, a trained welder in an imagined industrial town, is ready to work at the wage being paid in the town, but no factory has a vacancy for him. Rafiq is',
  opts: ['involuntarily unemployed', 'voluntarily unemployed', 'disguisedly unemployed', 'fully employed'],
  sol: 'He is able and willing to work at the prevailing wage but cannot find work, which is the definition of involuntary unemployment. Voluntary unemployment would mean he refuses work at that wage; disguised unemployment means more people work on a task than it needs.',
}));
Q('m_voluntary', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Which of the following persons is **voluntarily** unemployed?',
  opts: [
    'An engineer who turns down jobs at the going salary because she wants a much higher pay',
    'A mill worker who lost his job when the mill closed and has been searching for work for months',
    'A graduate who applies everywhere at the going wage but gets no offer',
    'A farm labourer who finds no work after the harvest season ends',
  ],
  sol: 'Voluntary unemployment means a person chooses not to work at the prevailing wage. The other three want work at the going wage but cannot get it, so they are involuntarily unemployed.',
}));
Q('tf_fe_zero', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Full employment means that the unemployment rate in the economy is exactly zero.',
  sol: 'Even at full employment some people are between jobs (frictional) or choose not to work at the going wage (voluntary). Full employment only rules out involuntary unemployment.',
}));
Q('s_invol', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by involuntary unemployment? Give an example.',
  model: '1. **Involuntary unemployment** exists when people who are **able and willing to work at the prevailing wage** cannot find work.\n2. **Example:** a trained driver in an imagined town who would accept the going wage but finds no vacancy because demand for transport has fallen.',
  sol: 'Definition with the key phrase "willing to work at the prevailing wage", plus a fitting example.',
  scheme: [['Definition', 1], ['Suitable example', 1]],
}));
Q('s3_below_fe', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'In the Keynesian short-run model, why can an economy settle at an equilibrium with involuntary unemployment?',
  model: '1. In the short run, with **prices fixed** and spare capacity, output is set by **aggregate demand**, not by the number of workers available.\n2. Equilibrium is wherever **AD = AS**; nothing forces this to be the **full-employment** output.\n3. If AD is too low, firms produce only what they can sell and hire fewer workers, so some people willing to work at the going wage stay **involuntarily unemployed**, and the economy can remain there until demand rises.',
  sol: 'Link output to demand, note that equilibrium need not be at full employment, and explain the resulting unemployment.',
  scheme: [['Output determined by AD in the short run', 1], ['Equilibrium need not be at full employment', 1], ['Low AD leaves involuntary unemployment', 1]],
}));

// ================================================================ t05 Excess and deficient demand
Q('m_def_dem', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Deficient demand refers to a situation in which',
  opts: [
    'aggregate demand falls short of aggregate supply at the full-employment level of output',
    'aggregate demand exceeds aggregate supply at the full-employment level of output',
    'saving is equal to investment',
    'the economy is producing beyond its full-employment output',
    ],
  sol: 'Deficient demand is a shortfall of AD below the AS of the full-employment output; the gap between them is the deflationary gap. AD greater than full-employment AS is excess demand.',
}));
Q('m_inflgap', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The inflationary gap measures',
  opts: [
    'the amount by which aggregate demand exceeds aggregate supply at full employment',
    'the amount by which aggregate supply exceeds aggregate demand at full employment',
    'the rise in the general price level over a year',
    'the difference between ex-post saving and ex-post investment',
  ],
  sol: 'An inflationary gap is the excess of AD over the AS corresponding to full employment. Since output cannot rise further, the excess shows up as rising prices. The reverse shortfall is the deflationary gap.',
}));
Q('m_measure_def', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which measure by the central bank would help correct a situation of **deficient** demand?',
  opts: ['Lowering the repo rate', 'Raising the cash reserve ratio', 'Selling government securities in the open market', 'Raising the margin requirement on loans'],
  sol: 'A lower repo rate makes borrowing cheaper for banks and, through them, for firms and households, so credit, investment and AD rise. The other three reduce the money that banks can lend and are used against excess demand.',
}));
Q('m_measure_exc', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'To reduce **excess** demand, the central bank is most likely to',
  opts: ['raise the cash reserve ratio', 'lower the bank rate', 'buy government securities in the open market', 'lower the statutory liquidity ratio'],
  sol: 'A higher CRR forces banks to keep a larger share of deposits with the central bank, so they can lend less; credit and AD fall. The other three increase the lending capacity of banks.',
}));
Q('m_omo', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Under open market operations, when the central bank **sells** government securities to banks and the public, the most likely effect is',
  opts: [
    'a fall in the money available for lending, which reduces aggregate demand',
    'a rise in the reserves of banks, which raises aggregate demand',
    'no change in money supply because securities are not money',
    'a fall in the repo rate',
  ],
  sol: 'Buyers pay for the securities from their bank balances, so money flows to the central bank and bank reserves fall. Banks can lend less, credit becomes scarcer, and AD falls; this is a tool against excess demand.',
}));
Q('m_def_effect', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which is a likely effect of deficient demand in an economy?',
  opts: [
    'Output and employment fall, and involuntary unemployment appears',
    'Prices rise sharply while output stays at full employment',
    'Firms find their stocks running out and expand output',
    'Saving rises above investment permanently',
  ],
  sol: 'When AD falls short of full-employment output, unsold stocks pile up, firms cut output and jobs, and involuntary unemployment results; prices may also tend to fall. A sharp price rise at full employment is the effect of excess demand.',
}));
Q('m_margin', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'A bank lends against gold as security. The central bank raises the margin requirement from 25 per cent to 40 per cent. On gold worth ₹1,00,000, the largest loan a borrower can now get is',
  opts: ['₹60,000, down from ₹75,000', '₹75,000, up from ₹60,000', '₹40,000, down from ₹75,000', '₹1,00,000, unchanged'],
  sol: `The margin is the part of the security's value that cannot be lent. Before: 1,00,000 × (1 − 0.25) = ${f(100000 * 0.75)}. After: 1,00,000 × (1 − 0.4) = ${f(100000 * 0.6)}. Less credit per rupee of security reduces AD, so this is a measure against excess demand.`,
}));
Q('ar_excess_fe', ar({
  t: 5, d: 3, c: 'analysis', key: 'd',
  a: 'Excess demand at full employment leads to a rise in real output in the short run.',
  r: 'At full employment there are no idle resources available to increase production.',
  sol: 'A is false: at full employment output cannot rise because there are no idle resources, so excess demand raises prices (inflation), not real output. R is true.',
}));
Q('ar_repo', ar({
  t: 5, d: 2, c: 'analysis', key: 'a',
  a: 'Raising the repo rate is a measure to correct excess demand.',
  r: 'A higher repo rate makes borrowing costlier for commercial banks, which then raise their lending rates and reduce credit.',
  sol: 'Both are true and R explains A: costlier borrowing reduces credit-financed spending, so aggregate demand falls.',
}));
{
  const yf = 1000, adf = 1150;
  Q('n_gap', num({
    t: 5, d: 2, c: 'understanding', value: adf - yf, unit: '₹ crore', marks: 1,
    stem: `The full-employment output of an imagined economy is ₹${f(yf)} crore. At that level of output, planned aggregate demand is ₹${f(adf)} crore. Find the size of the inflationary gap (in ₹ crore).`,
    sol: `Step 1: Inflationary gap = AD − AS at full employment.\nStep 2: ${f(adf)} − ${f(yf)} = ${adf - yf}. The gap is ₹${adf - yf} crore.`,
  }));
}
{
  const yf = 1000, ye = 800, mpc = 0.8;
  const k = K(mpc), need = r3((yf - ye) / k);
  Q('n_close_gap', num({
    t: [5, 3], d: 4, c: 'application', value: need, unit: '₹ crore', marks: 2,
    stem: `An imagined economy is in equilibrium at ₹${f(ye)} crore, while its full-employment output is ₹${f(yf)} crore. Its MPC is ${mpc}. By how much must autonomous investment rise to bring the economy to full employment (in ₹ crore)?`,
    sol: `Step 1: Required ΔY = ${f(yf)} − ${ye} = ${yf - ye}.\nStep 2: K = 1 ÷ (1 − ${mpc}) = ${k}.\nStep 3: ΔI = ΔY ÷ K = ${yf - ye} ÷ ${k} = ${need}. Investment must rise by ₹${need} crore.`,
    scheme: [['Required change in income and the multiplier', 1], [`ΔI = ₹${need} crore`, 1]],
  }));
}
Q('mt_measures', match({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: 'Match each policy step with the problem it is meant to correct.',
  pairs: [
    ['The central bank buys government securities in the open market', 'Deficient demand: raises bank reserves and credit'],
    ['The government raises income tax rates', 'Excess demand: lowers disposable income and consumption'],
    ['The government increases spending on rural roads', 'Deficient demand: adds directly to aggregate demand'],
    ['The central bank raises the statutory liquidity ratio', 'Excess demand: banks keep more liquid assets and lend less'],
  ],
  sol: 'Steps that add to spending or credit fight deficient demand; steps that take away disposable income or lending capacity fight excess demand.',
}));
Q('s_def_effects', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two effects of deficient demand on an economy.',
  model: '1. **Output and employment fall**: unsold stocks pile up, firms cut production and lay off workers, creating **involuntary unemployment**.\n2. **Prices tend to fall** (or rise more slowly), and lower incomes reduce investment further, which can deepen the slowdown.',
  sol: 'Any two correct effects, each with a brief reason.',
  scheme: [['First effect with reason', 1], ['Second effect with reason', 1]],
}));
Q('s_fiscal_excess', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest two fiscal measures the government can use to correct excess demand.',
  model: '1. **Reduce government expenditure** (for example, postpone non-urgent building projects), which directly lowers AD.\n2. **Raise taxes**: higher income and wealth taxes reduce **disposable income**, so households consume less and AD falls.',
  sol: 'Two measures from the budget side (spending, taxes, borrowing), each linked to a fall in AD.',
  scheme: [['First fiscal measure and how it cuts AD', 1], ['Second fiscal measure and how it cuts AD', 1]],
}));
Q('s3_monetary', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain any three monetary measures that a central bank such as the RBI can take to correct deficient demand.',
  model: '1. **Lower the repo (or bank) rate:** banks borrow more cheaply and cut their lending rates, so firms and households borrow and spend more.\n2. **Lower the CRR or SLR:** banks keep less of their deposits idle and can **lend more**.\n3. **Buy government securities** (open market operations): money flows into banks, raising their **reserves** and capacity to lend; lowering **margin requirements** works similarly.',
  sol: 'Three distinct instruments, each with the direction of change and how it raises credit and AD.',
  scheme: [['First measure with effect on credit', 1], ['Second measure with effect on credit', 1], ['Third measure with effect on credit', 1]],
}));
Q('s3_gap_diagram', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'With the help of a diagram described in words, explain the meaning of an inflationary gap.',
  model: '1. **Diagram:** income on the x-axis, AD and AS on the y-axis; the **45° line** is AS; Y_F marks the full-employment output.\n2. The **AD curve cuts the 45° line beyond Y_F**, so at Y_F, AD stands **above** AS; the vertical distance between them at Y_F is the **inflationary gap**.\n3. Output cannot rise beyond Y_F, so the excess demand only **pushes up prices**.',
  sol: 'Describe the axes and curves, locate the gap at full-employment output, and state its effect.',
  scheme: [['Axes, 45° line and full-employment output', 1], ['Gap identified as AD above AS at Y_F', 1], ['Effect: prices rise, not output', 1]],
}));
Q('l_def', long({
  t: 5, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'What is deficient demand? Explain its effects on output, employment and prices, and describe in words how it is shown on a diagram.',
  model: '1. **Meaning:** AD is **less than AS at the full-employment level** of output; the shortfall is the **deflationary gap**.\n2. **Diagram:** with the 45° line as AS, the AD curve cuts it **before** full-employment output Y_F; at Y_F, AD lies **below** the 45° line by the gap.\n3. **Output:** unsold stocks rise, so firms **cut production**; equilibrium settles below Y_F.\n4. **Employment:** fewer workers are hired, so **involuntary unemployment** appears.\n5. **Prices:** weak demand makes prices **fall or rise slowly**; falling incomes may lower investment further.',
  sol: 'Definition, the diagram in words, then the three effects with reasons.',
  scheme: [['Meaning (AD < AS at full employment)', 1], ['Diagram described', 1], ['Effect on output', 1], ['Effect on employment', 1], ['Effect on prices', 1]],
}));
Q('l_measures', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'An imagined economy is facing excess demand. Explain two fiscal and three monetary measures that could correct it, and comment on why the two kinds of measures are often used together.',
  model: '1. **Fiscal: cut government spending** on non-essential projects, which lowers AD directly.\n2. **Fiscal: raise taxes**, which reduces disposable income and consumption.\n3. **Monetary: raise the repo rate**, making credit costlier, so borrowing-financed spending falls.\n4. **Monetary: raise the CRR or SLR, or sell securities** in the open market, which reduces banks\' capacity to lend.\n5. **Comment:** monetary steps act quickly through credit but work slowly on spending; fiscal steps act directly on demand but take time to pass through the budget. **Together** they reduce AD faster and more reliably.',
  sol: 'Two fiscal and three monetary measures, each with its effect on AD, and a reasoned comment on combining them.',
  scheme: [['First fiscal measure', 1], ['Second fiscal measure', 1], ['First monetary measure', 1], ['Second and third monetary measures', 1], ['Reasoned comment on using both', 1]],
}));
Q('l_gaps_compare', long({
  t: 5, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Distinguish between excess demand and deficient demand on any five bases.',
  model: '1. **Meaning:** excess demand: AD > AS at full employment; deficient demand: AD < AS at full employment.\n2. **Gap:** excess demand creates an **inflationary** gap; deficient demand a **deflationary** gap.\n3. **Output:** excess demand cannot raise output beyond full employment; deficient demand makes output **fall** below it.\n4. **Employment:** with excess demand there is full employment; deficient demand causes **involuntary unemployment**.\n5. **Prices and policy:** excess demand **raises prices** and calls for contractionary measures; deficient demand tends to lower prices and calls for **expansionary** measures.',
  sol: 'Five distinct bases, each stating both situations.',
  scheme: [['Meaning', 1], ['Type of gap', 1], ['Effect on output', 1], ['Effect on employment', 1], ['Effect on prices or the policy needed', 1]],
}));

// ================================================================ case-based
{
  const inv = 600, mpc = 0.8, mpc2 = 0.6;
  const k = K(mpc), k2 = K(mpc2);
  Q('cb_harbour', caseQ({
    t: 3, d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the case and answer the questions that follow. *(Imagined state and figures, written by SOYL for practice.)*',
    passage: `**A new fishing harbour for Sagarpur (imagined coastal state)**\n\nThe state government of Sagarpur and two private firms together plan to invest ₹${inv} crore in a modern fishing harbour with cold storage. A household survey in the state finds that, on average, families spend 80 paise of every extra rupee they earn and save the rest. Local traders expect that the boatbuilders, cement suppliers and construction workers who are paid for the project will spend much of their earnings in nearby markets, and that those shopkeepers will in turn spend part of what they earn.`,
    parts: [
      child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: k, stem: 'What is the value of the investment multiplier in Sagarpur?', sol: `Step 1: MPC = 0.8.\nStep 2: K = 1 ÷ (1 − 0.8) = ${k}.` })),
      child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: r3(k * inv), unit: '₹ crore', stem: 'By how much will the income of the state finally rise because of the project (in ₹ crore)?', sol: `Step 1: ΔY = K × ΔI.\nStep 2: ${k} × ${inv} = ${f(k * inv)}. Income rises by ₹${f(k * inv)} crore.` })),
      child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the traders\' expectation, explain why the total rise in income is larger than the investment itself.', model: `The ₹${inv} crore becomes **income** for boatbuilders, suppliers and workers. They **re-spend 80 per cent** of it in local markets, which becomes the income of shopkeepers, who again spend 80 per cent, and so on. These **successive rounds** of spending add up to ${k} times the investment.`, sol: 'Investment becomes income; a fraction is re-spent in every round; the rounds add up to K times ΔI.', scheme: [['Investment becomes income of factor owners', 1], ['Successive rounds of re-spending through the MPC', 1]] }), [
        short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): If families spent only 60 paise of every extra rupee, what would the total rise in income be? What does this show?`, model: `MPC = ${mpc2}, so K = 1 ÷ ${r3(1 - mpc2)} = **${k2}** and ΔY = ${k2} × ${inv} = **₹${f(k2 * inv)} crore**. A **lower MPC gives a smaller multiplier**, because more of each round leaks into saving.`, sol: 'Recompute K and ΔY, then state the relation between MPC and K.', scheme: [[`ΔY = ₹${f(k2 * inv)} crore with working`, 1], ['Lower MPC means smaller multiplier', 1]] }),
      ]),
    ],
  }));
}
{
  const a = 60, b = 0.7, I = 120;
  const Ys = [200, 400, 600, 800, 1000];
  const Cs = Ys.map((y) => r3(a + b * y));
  const ADs = Cs.map((c) => r3(c + I));
  const Ye = eqY(a, b, I);
  const i800 = Ys.indexOf(800), ie = Ys.indexOf(Ye);
  Q('cb_schedule', caseQ({
    t: [3, 2], d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Study the schedule and answer the questions that follow. *(Imagined economy, written by SOYL for practice; figures in ₹ crore.)*',
    passage: `**Income, consumption and investment plans of the imagined economy of Pratapgarh Valley**\n\n| Income (Y) | ${Ys.join(' | ')} |\n|---|${Ys.map(() => '---').join('|')}|\n| Planned consumption (C) | ${Cs.join(' | ')} |\n| Planned investment (I) | ${Ys.map(() => I).join(' | ')} |`,
    parts: [
      child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: Ye, unit: '₹ crore', stem: 'At what level of income is the economy in equilibrium (in ₹ crore)?', sol: `Step 1: AD = C + I at each income: ${ADs.join(', ')}.\nStep 2: AD equals Y only at Y = ${Ye} (C ${Cs[ie]} + I ${I} = ${ADs[ie]}). Equilibrium income is ₹${Ye} crore.` })),
      child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: b, stem: 'Calculate the marginal propensity to consume from the schedule.', sol: `Step 1: ΔC = ${Cs[1]} − ${Cs[0]} = ${r3(Cs[1] - Cs[0])}; ΔY = 200.\nStep 2: MPC = ${r3(Cs[1] - Cs[0])} ÷ 200 = ${b}.` })),
      child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Suppose output is ₹800 crore. Explain what will happen to output, using figures from the schedule.', model: `At Y = 800, AD = ${Cs[i800]} + ${I} = **${ADs[i800]}**, which is **less than output** of 800 by ${r3(800 - ADs[i800])}. Unsold goods worth ₹${r3(800 - ADs[i800])} crore pile up as **unplanned inventory**, so firms **cut output** until income falls to ₹${Ye} crore.`, sol: 'Compute AD at 800, compare with output, and state the adjustment.', scheme: [['AD at Y = 800 compared with output', 1], ['Unplanned stocks and fall in output towards equilibrium', 1]] }), [
        short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Show that planned saving equals planned investment at the equilibrium income.', model: `At Y = ${Ye}, C = ${Cs[ie]}, so **S = ${Ye} − ${Cs[ie]} = ${r3(Ye - Cs[ie])}**, which equals planned **I = ${I}**. Hence S = I at equilibrium.`, sol: 'Saving is income minus consumption at the equilibrium income; compare with investment.', scheme: [['Saving at equilibrium computed', 1], ['Shown equal to investment', 1]] }),
      ]),
    ],
  }));
}
{
  const a = 200, b = 0.75, I = 250, yf = 2000;
  const Ye = eqY(a, b, I), adf = r3(a + b * yf + I), k = K(b);
  Q('cb_gap', caseQ({
    t: [5, 3], d: 4, c: 'analysis', origin: 'soyl-original',
    stem: 'Read the case and answer the questions that follow. *(Imagined country and figures, written by SOYL for practice.)*',
    passage: `**A slowdown in Varunpur (imagined country)**\n\nVarunpur's planners estimate that the country can produce goods and services worth ₹${f(yf)} crore a year when all who are willing to work at current wages have jobs. Its households follow the consumption function C = ${a} + ${b}Y, and firms plan autonomous investment of ₹${I} crore. Factory owners report rising stocks of unsold goods, and the employment exchange reports more registered job-seekers than a year ago.`,
    parts: [
      child('a', num({ t: 3, d: 3, c: 'application', marks: 1, value: Ye, unit: '₹ crore', stem: 'Find the equilibrium level of income in Varunpur (in ₹ crore).', sol: `Step 1: Y = ${a} + ${b}Y + ${I}, so ${r3(1 - b)}Y = ${a + I}.\nStep 2: Y = ${a + I} ÷ ${r3(1 - b)} = ${f(Ye)}. Equilibrium income is ₹${f(Ye)} crore.` })),
      child('b', num({ t: 5, d: 3, c: 'application', marks: 1, value: r3(yf - adf), unit: '₹ crore', stem: 'Calculate the deficient demand (deflationary gap) at the full-employment level of output (in ₹ crore).', sol: `Step 1: AD at Y = ${f(yf)}: ${a} + ${b} × ${f(yf)} + ${I} = ${f(adf)}.\nStep 2: Gap = ${f(yf)} − ${f(adf)} = ${r3(yf - adf)}. Deficient demand is ₹${r3(yf - adf)} crore.` })),
      child('c', short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Suggest one fiscal and one monetary measure to remove this deficient demand.', model: '**Fiscal:** raise government spending on public works (or cut taxes) to add to AD directly.\n**Monetary:** lower the repo rate or the CRR so that banks lend more cheaply and investment and consumption rise.', sol: 'One measure from each side, each raising AD.', scheme: [['A suitable fiscal measure', 1], ['A suitable monetary measure', 1]] }), [
        short({ t: [5, 3], d: 4, c: 'application', marks: 2, stem: '**Or** (ii): By how much must investment rise to reach full-employment output? Use the multiplier.', model: `Required ΔY = ${f(yf)} − ${f(Ye)} = **${r3(yf - Ye)}**; K = 1 ÷ (1 − ${b}) = **${k}**; ΔI = ${r3(yf - Ye)} ÷ ${k} = **₹${r3((yf - Ye) / k)} crore**, the same as the deficient demand.`, sol: 'Find the income gap, divide by K, and compare with the gap in part (b).', scheme: [['Income gap and multiplier', 1], [`ΔI = ₹${r3((yf - Ye) / k)} crore`, 1]] }),
      ]),
    ],
  }));
}
