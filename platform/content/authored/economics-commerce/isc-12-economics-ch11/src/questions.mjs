// ISC 12 Economics, ch11 Aggregate Demand, Consumption and Saving — question bank. Every economy, household, town and
// figure is imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every
// number in a stem, key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Conventions: C = c̄ + bY with 0 < b < 1; S = Y − C = −c̄ + (1 − b)Y; APC = C ÷ Y, APS = S ÷ Y, MPC = ΔC ÷ ΔY,
// MPS = ΔS ÷ ΔY; APC + APS = 1 and MPC + MPS = 1; break-even income is where C = Y (S = 0). AD = C + I + G + (X − M).
// Equilibrium income and the multiplier belong to ch12 and are not taught here.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
const rd = (x) => Math.round(x * 1e6) / 1e6;
const fmtIN = (n) => n.toLocaleString('en-IN');
const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
const diffs = (a) => a.slice(1).map((v, i) => rd(v - a[i]));

// ---------------------------------------------------------------- shared imagined data (all asserted)
// (1) The deck economy: an imagined economy of "Neelgiri Pradesh" with C = 90 + 0.7Y (₹ crore).
export const CBAR = 90;
export const B = 0.7;
export const cons = (y) => rd(CBAR + B * y);
export const sav = (y) => rd(y - cons(y));
export const BE = rd(CBAR / (1 - B));
assert(BE === 300 && cons(300) === 300 && sav(300) === 0, 'break-even 300');
export const NP_Y = [0, 100, 200, 300, 400, 500, 600];
export const NP = NP_Y.map((y) => ({ y, c: cons(y), s: sav(y), apc: y ? rd(cons(y) / y) : null, aps: y ? rd(sav(y) / y) : null }));
assert(NP.map((r) => r.c).join() === '90,160,230,300,370,440,510', 'np c');
assert(NP.map((r) => r.s).join() === '-90,-60,-30,0,30,60,90', 'np s');
assert(NP[6].apc === 0.85 && NP[6].aps === 0.15 && NP[1].apc === 1.6, 'np apc');
for (const r of NP.slice(1)) assert(rd(r.apc + r.aps) === 1, 'apc + aps = 1');
export const npTable = () => md(NP.map((r) => [String(r.y), String(r.c), String(r.s), r.apc === null ? '—' : String(r.apc), r.aps === null ? '—' : String(r.aps)]), ['Y', 'C', 'S', 'APC', 'APS']);

// (2) An imagined Bhopal household's monthly schedule (₹ thousand) with MPC 0.8 and break-even at 30.
export const HH = { y: [20, 30, 40, 50], c: [22, 30, 38, 46] };
export const HH_S = HH.y.map((y, i) => y - HH.c[i]);
export const HH_MPC = diffs(HH.c).map((dc, i) => rd(dc / (HH.y[i + 1] - HH.y[i])));
assert(HH_S.join() === '-2,0,2,4' && HH_MPC.every((m) => m === 0.8), 'household');
export const HH_APC = HH.y.map((y, i) => rd(HH.c[i] / y));
assert(HH_APC.join() === '1.1,1,0.95,0.92', 'household apc');
export const hhTable = () => md(HH.y.map((y, i) => [String(y), String(HH.c[i])]), ['Income (₹ thousand)', 'Consumption (₹ thousand)']);

// (3) An imagined Sundarban fishing village whose MPC falls as income rises (₹ lakh a year).
export const VIL = { y: [100, 200, 300, 400], c: [120, 200, 270, 330] };
export const VIL_MPC = diffs(VIL.c).map((dc) => rd(dc / 100));
export const VIL_APC = VIL.y.map((y, i) => rd(VIL.c[i] / y));
export const VIL_S = VIL.y.map((y, i) => y - VIL.c[i]);
export const VIL_MPS = VIL_MPC.map((m) => rd(1 - m));
assert(VIL_MPC.join() === '0.8,0.7,0.6' && VIL_APC.join() === '1.2,1,0.9,0.825', 'village');
assert(VIL_S.join() === '-20,0,30,70' && VIL_MPS.join() === '0.2,0.3,0.4', 'village saving');
export const vilTable = () => md(VIL.y.map((y, i) => [String(y), String(VIL.c[i])]), ['Income (₹ lakh)', 'Consumption (₹ lakh)']);

// (4) Aggregate demand of an imagined state economy, "Navkhand" (₹ crore).
export const NAV = { c: 820, i: 260, g: 180, x: 140, m: 160 };
export const NAV_AD = NAV.c + NAV.i + NAV.g + (NAV.x - NAV.m);
assert(NAV_AD === 1240, 'navkhand ad');

// (5) Ex ante vs ex post: an imagined Ludhiana hosiery cluster plans investment of 150 but stocks pile up by 25.
export const HOS = { plannedI: 150, unplannedStock: 25 };
export const HOS_REAL = HOS.plannedI + HOS.unplannedStock;
assert(HOS_REAL === 175, 'hosiery');

// Small single-use figures (each asserted where used).
const N_APC = { y: 800, c: 680 };
const N_MPC = { y1: 500, y2: 700, c1: 420, c2: 570 };
assert(rd(N_APC.c / N_APC.y) === 0.85 && rd((N_MPC.c2 - N_MPC.c1) / (N_MPC.y2 - N_MPC.y1)) === 0.75, 'small figures');

// ================================================================ t01 Ex ante and ex post; effective demand
Q('m_exante_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'At the start of a year, the owners of an imagined Coimbatore pump factory decide to spend ₹40 crore on new lathes. In macroeconomics this intended figure is called',
  opts: ['ex ante (planned) investment', 'ex post (realised) investment', 'induced consumption', 'autonomous saving'],
  sol: 'A figure that firms or households intend or plan before the period begins is ex ante. Ex post is what actually happens by the end of the period.',
}));
Q('m_expost_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'When the accounts of an imagined Ranchi furniture market are closed at the end of the year, the investment actually recorded there is its',
  opts: ['ex post investment', 'ex ante investment', 'effective demand', 'marginal propensity to invest'],
  sol: 'Investment measured after the period, as it actually turned out, is ex post (realised) investment. Planned figures are ex ante.',
}));
Q('m_unplanned_stock', mcq({
  t: 1, d: 2, c: 'application',
  stem: `An imagined Ludhiana hosiery cluster planned investment of ₹${HOS.plannedI} crore, but weak winter sales left an extra ₹${HOS.unplannedStock} crore of unsold sweaters in its godowns. Its ex post investment is`,
  opts: [`₹${HOS_REAL} crore`, `₹${HOS.plannedI} crore`, `₹${HOS.plannedI - HOS.unplannedStock} crore`, `₹${HOS.unplannedStock} crore`],
  sol: `Unsold goods added to stock count as (unplanned) investment, so realised investment = planned ${HOS.plannedI} + unplanned ${HOS.unplannedStock} = ${HOS_REAL}.`,
}));
Q('m_effective_demand', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the Keynesian sense, effective demand in an imagined economy of small towns along the Konkan coast is the level of aggregate demand that',
  opts: ['equals aggregate supply, so it decides the actual level of output and employment', 'exceeds aggregate supply at full employment', 'consists only of household consumption', 'is planned by the government in its budget'],
  sol: 'Effective demand is the point where aggregate demand equals aggregate supply; that level of demand is actually realised and fixes output and employment. It need not be at full employment.',
}));
Q('m_expost_equal', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A statistician studying an imagined economy finds that in last year\'s final accounts saving and investment were exactly equal, even though households had planned to save far more than firms planned to invest. This is best explained by the fact that',
  opts: ['realised (ex post) saving and investment are always equal because unplanned stock changes absorb the gap', 'planned (ex ante) saving and investment are always equal', 'the government forced firms to invest more', 'households must have spent all their income'],
  sol: 'Ex post, saving and investment are always equal: the excess saving shows up as unsold goods, which raise realised investment by the same amount. Ex ante they can differ.',
}));
Q('ar_expost', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'In an imagined island economy, realised saving and realised investment for last year turn out equal although planned saving exceeded planned investment.',
  r: 'Goods that were produced but not sold are added to stocks and counted as unplanned investment.',
  sol: 'Both are true and R explains A: the shortfall in planned spending leaves unsold output, and this unplanned addition to stock raises realised investment until it equals realised saving.',
}));
Q('tf_exante_equal', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In an imagined economy of tea estates, the saving that households plan for next year must always equal the investment that firms plan for next year.',
  sol: 'Planned (ex ante) saving and investment are made by different people for different reasons, so they can differ. Only realised (ex post) saving and investment are always equal.',
}));
Q('fb_effective', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The level of aggregate demand at which it becomes equal to aggregate supply is called ___ demand.',
  acc: [['effective']],
  sol: 'That level of aggregate demand is called effective demand, because it is actually realised in output and employment.',
}));
Q('s_exante_expost', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between ex ante and ex post consumption, using the shopping of an imagined Guwahati family as your example.',
  model: '**Ex ante** consumption is what the family **plans** to spend, say ₹30,000 for the coming month. **Ex post** consumption is what it **actually** spent once the month is over, say ₹33,000 after an unexpected wedding gift.',
  sol: 'Planned versus realised, each with an example.',
  scheme: [['Ex ante: planned, with example', 1], ['Ex post: actual, with example', 1]],
}));
Q('s_effective_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by effective demand? Why does an imagined district of handloom villages not automatically produce at full employment?',
  model: '**Effective demand** is the level of aggregate demand that **equals aggregate supply**; it fixes actual output and jobs. Since it is set by **what buyers plan to spend**, it can settle **below** the full-employment output, leaving some weavers without work.',
  sol: 'Meaning, then the link to employment.',
  scheme: [['Meaning: AD = AS', 1], ['Can settle below full employment', 1]],
}));
Q('s3_hosiery', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The hosiery cluster in imagined Ludhiana planned investment of ₹${HOS.plannedI} crore for the year, but ₹${HOS.unplannedStock} crore of sweaters stayed unsold. (a) Find realised investment. (b) Explain why unsold goods count as investment, and what the cluster is likely to do next year.`,
  model: `(a) Realised investment = ${HOS.plannedI} + ${HOS.unplannedStock} = **₹${HOS_REAL} crore**.\n(b) Investment includes **additions to stock**; unsold sweaters are goods produced but not consumed, so they add to **inventory**. Because this stock was **not planned**, firms are likely to **cut production** next year.`,
  sol: 'Planned plus unplanned investment; firms respond by cutting output.',
  scheme: [['Realised investment 175', 1], ['Unsold goods are additions to stock', 1], ['Likely response: cut output', 1]],
}));
Q('s3_plans_differ', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why planned saving and planned investment in an imagined economy can be unequal, while realised saving and realised investment are always equal.',
  model: '1. **Planned** saving is decided by **households** (income, thrift), planned investment by **firms** (expected profit, interest), so the two plans need not match.\n2. If planned saving exceeds planned investment, **some output is not bought** and piles up as **stock**.\n3. This **unplanned stock** counts as investment, so **realised** investment rises to equal realised saving.',
  sol: 'Different deciders, then unplanned stock changes.',
  scheme: [['Different people and motives', 1], ['Mismatch shows up as stock change', 1], ['Unplanned stock makes realised values equal', 1]],
}));
Q('l_exante_full', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Answer the following about an imagined economy of small towns in Bundelkhand. [2 + 3]\n\n(a) Distinguish between ex ante and ex post saving, with an example of each.\n(b) Suppose households there plan to save ₹50 crore but firms plan to invest only ₹40 crore. Explain what happens to stocks, why realised saving and investment are still equal, and how firms are likely to react.',
  model: '(a) **Ex ante saving** is the saving households **plan** at the start of a period (₹50 crore in the case). **Ex post saving** is what they **actually** saved at its end.\n(b) Planned spending falls short of output by **₹10 crore**, so goods worth ₹10 crore **remain unsold** and **stocks rise**. This **unplanned inventory** counts as investment, so realised investment becomes 40 + 10 = **₹50 crore**, equal to realised saving. Firms find stocks piling up, so they **cut output and employment** in the next period.',
  sol: 'Definitions, then the stock adjustment and the firms\' response.',
  scheme: [['Ex ante saving with example', 1], ['Ex post saving with example', 1], ['Unsold goods of 10 raise stocks', 1], ['Realised investment 50 = realised saving', 1], ['Firms cut output', 1]],
}));

// ================================================================ t02 Aggregate demand and its components; aggregate supply
Q('m_ad_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Aggregate demand in an imagined open economy with a government means the total',
  opts: ['planned spending on final goods and services in the economy during a period', 'value of goods actually produced during a period', 'money supply held by households', 'income earned by the factors of production'],
  sol: 'Aggregate demand is total planned (ex ante) expenditure on final goods and services. The value of output produced is aggregate supply.',
}));
Q('m_ad_formula', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which expression gives aggregate demand in an imagined economy that trades with other countries and has a government?',
  opts: ['C + I + G + (X − M)', 'C + I + G + X + M', 'C + S + T', 'C + I − G'],
  sol: 'AD adds household consumption, investment, government purchases and net exports (exports minus imports).',
}));
Q('m_as_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'From the income side, aggregate supply of an imagined two-sector economy can be written as',
  opts: ['C + S, because income is either consumed or saved', 'C + I, because output is either consumed or invested', 'S + I, because both are equal ex post', 'C − S, because saving is a leakage'],
  sol: 'Aggregate supply is the value of output, which equals the income generated; income is either consumed or saved, so AS = C + S.',
}));
Q('m_imports_ad', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Families in an imagined economy start buying more imported smartphones and fewer phones assembled at home, while their total spending stays the same. Aggregate demand for that economy\'s output will',
  opts: ['fall, because imports are subtracted from spending', 'rise, because total spending is unchanged', 'stay the same, because imports are part of consumption', 'rise, because imports add to the government\'s customs revenue'],
  sol: 'Spending on imports goes to output produced abroad, so it is subtracted in AD = C + I + G + (X − M). A switch towards imports lowers AD for domestic output.',
}));
Q('m_ad_component_identify', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A state government in imagined Navkhand buys new ambulances for its district hospitals. In aggregate demand this purchase is part of',
  opts: ['government expenditure (G)', 'private consumption (C)', 'net exports (X − M)', 'household saving (S)'],
  sol: 'Purchases of goods and services by the government are government expenditure, the G component of AD.',
}));
Q('ar_net_exports', ar({
  t: 2, d: 2, c: 'analysis', key: 'c',
  a: 'If an imagined economy\'s imports exceed its exports, the net-exports component of its aggregate demand is negative.',
  r: 'Imports add to the demand for goods produced within the economy.',
  sol: 'A is true: X − M < 0 when M > X. R is false: imports are spending on goods produced abroad, so they reduce demand for domestic output, which is why they are subtracted.',
}));
Q('fb_as_identity', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Since income is either consumed or saved, aggregate supply in a two-sector economy can be written as C + ___.',
  acc: [['S', 'saving']],
  sol: 'Aggregate supply = C + S: consumption plus saving.',
}));
Q('n_navkhand_ad', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: NAV_AD, unit: '₹ crore',
  stem: `In the imagined state economy of Navkhand (₹ crore), planned consumption is ${NAV.c}, planned investment ${NAV.i}, government purchases ${NAV.g}, exports ${NAV.x} and imports ${NAV.m}. Find its aggregate demand (in ₹ crore).`,
  sol: `AD = C + I + G + (X − M) = ${NAV.c} + ${NAV.i} + ${NAV.g} + (${NAV.x} − ${NAV.m}) = ${NAV_AD}.`,
}));
Q('mt_ad_parts', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each spending decision in an imagined coastal economy with the component of aggregate demand it belongs to.',
  pairs: [
    ['A fishing family buys a new refrigerator', 'Private consumption (C)'],
    ['A seafood exporter builds a cold-storage plant', 'Investment (I)'],
    ['The state builds a new fish-landing jetty', 'Government expenditure (G)'],
    ['A hotel chain abroad buys frozen prawns from the coast', 'Exports (X)'],
  ],
  sol: 'Household purchases are C; new plant by firms is I; public works are G; sales to buyers abroad are X.',
}));
Q('s_ad_components', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the four components of aggregate demand in an open economy with a government, giving one imagined Indian example of any two.',
  model: '**C** (household consumption), **I** (investment), **G** (government expenditure) and **(X − M)** (net exports). Examples: a Jaipur family buying a scooter is **C**; a Pune firm installing a new robot arm is **I**.',
  sol: 'All four components; any two examples.',
  scheme: [['Four components named', 1], ['Two correct examples', 1]],
}));
Q('s_ad_as_differ', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between aggregate demand and aggregate supply for an imagined district economy.',
  model: '**Aggregate demand** is the total **planned spending** on final goods and services (C + I + G + X − M). **Aggregate supply** is the total **value of output** produced, which equals the **income** generated (C + S in two sectors).',
  sol: 'Spending side versus output/income side.',
  scheme: [['Aggregate demand: planned spending', 1], ['Aggregate supply: output = income', 1]],
}));
Q('s3_navkhand_change', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `In imagined Navkhand (₹ crore), C = ${NAV.c}, I = ${NAV.i}, G = ${NAV.g}, X = ${NAV.x} and M = ${NAV.m}. (a) Calculate aggregate demand. (b) If imports rise by 40 while everything else stays the same, find the new aggregate demand and explain the change.`,
  model: `(a) AD = ${NAV.c} + ${NAV.i} + ${NAV.g} + (${NAV.x} − ${NAV.m}) = **${NAV_AD}**.\n(b) Net exports fall to ${NAV.x} − ${NAV.m + 40} = ${NAV.x - NAV.m - 40}, so AD = **${NAV_AD - 40}**. More of the spending now goes to **goods produced abroad**, so demand for **Navkhand's own output falls** by 40.`,
  sol: 'AD formula, then the effect of higher imports.',
  scheme: [['AD = 1240', 1], ['New AD = 1200', 1], ['Reason: imports leak out of domestic demand', 1]],
}));
Q('s3_why_components', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why each of the following is treated as it is in measuring the aggregate demand of an imagined economy: (a) investment by firms, (b) government purchases, (c) imports.',
  model: '(a) **Investment** is spending on **new capital goods and stocks**, so it is **added**. (b) **Government purchases** of goods and services also buy current output, so they are **added**. (c) **Imports** are spending on output **produced abroad**; they are already inside C, I and G, so they are **subtracted**.',
  sol: 'Each component with the reason for its sign.',
  scheme: [['Investment added, with reason', 1], ['Government purchases added, with reason', 1], ['Imports subtracted, with reason', 1]],
}));
Q('l_ad_as_full', long({
  t: [2, 1], d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Answer the following about the imagined state economy of Navkhand (₹ crore): C = ${NAV.c}, I = ${NAV.i}, G = ${NAV.g}, X = ${NAV.x}, M = ${NAV.m}. [3 + 2]\n\n(a) Explain the components of aggregate demand and calculate Navkhand\'s aggregate demand.\n(b) If the value of output (aggregate supply) this year is ₹1,300 crore, state what will happen to unplanned stocks, and why.`,
  model: `(a) Aggregate demand is the total **planned spending** on the final output of Navkhand. **C** is households\' spending on consumer goods and services; **I** is firms\' spending on new machines, buildings and additions to stock; **G** is the government\'s purchases of goods and services; **X − M** is exports minus imports, since imports buy output made outside Navkhand. AD = ${NAV.c} + ${NAV.i} + ${NAV.g} + (${NAV.x} − ${NAV.m}) = **₹${fmtIN(NAV_AD)} crore**; net exports are negative (−20).\n(b) Output of ₹1,300 crore exceeds planned spending of ₹${fmtIN(NAV_AD)} crore by **₹60 crore**. Goods worth 60 therefore remain **unsold** and **unplanned stocks rise** by 60, which raises realised investment above planned investment. Holding unwanted stock, firms are likely to **reduce output and employment** in the next period.`,
  sol: 'Components and AD, then AS above AD.',
  scheme: [['Components explained', 1], ['Net exports negative', 1], ['AD = 1240', 1], ['Stocks rise by 60', 1], ['Reason or firms\' response', 1]],
}));

// ================================================================ t03 Propensity to consume; consumption function
Q('m_apc_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'For an imagined Bhopal household, the average propensity to consume is',
  opts: ['consumption divided by income', 'the change in consumption divided by the change in income', 'saving divided by income', 'income divided by consumption'],
  sol: 'APC = C ÷ Y, the share of income that is consumed. ΔC ÷ ΔY is the MPC; S ÷ Y is the APS.',
}));
Q('m_mpc_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A Kanpur shopkeeper\'s monthly income rises and he spends part of the rise. The share of the extra income that he spends is his',
  opts: ['marginal propensity to consume', 'average propensity to consume', 'average propensity to save', 'autonomous consumption'],
  sol: 'MPC = ΔC ÷ ΔY: the fraction of additional income spent on consumption.',
}));
Q('m_mpc_range', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the Keynesian consumption function, the MPC of an imagined economy normally lies',
  opts: ['between 0 and 1', 'above 1', 'below 0', 'exactly at 1'],
  sol: 'When income rises, people spend some of the increase but not all of it, so 0 < MPC < 1.',
}));
Q('m_autonomous', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `In the consumption function C = ${CBAR} + ${B}Y of imagined Neelgiri Pradesh (₹ crore), the term ${CBAR} shows`,
  opts: ['consumption even when income is zero, financed from past savings or borrowing', 'the marginal propensity to consume', 'consumption at the break-even income', 'the saving of households at zero income'],
  sol: `The constant ${CBAR} is autonomous consumption: what people must consume even at zero income. ${B} is the MPC; saving at zero income is −${CBAR}.`,
}));
Q('m_apc_above_one', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `In the Bhopal household's schedule (₹ thousand), consumption is ${HH.c[0]} when income is ${HH.y[0]}. Its APC at this income is above 1, which means the family is`,
  opts: ['dissaving: spending more than its income from past savings or loans', 'saving a large part of its income', 'at the break-even point', 'showing an MPC above 1'],
  sol: `APC = ${HH.c[0]} ÷ ${HH.y[0]} = ${HH_APC[0]} > 1: consumption exceeds income, so saving is ${HH_S[0]} (dissaving). The MPC is still ${HH_MPC[0]}.`,
}));
Q('m_apc_falls', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `For Neelgiri Pradesh with C = ${CBAR} + ${B}Y, what happens to the APC as income rises from 100 to 600?`,
  opts: [`It falls from ${NP[1].apc} towards ${B} but always stays above the MPC`, `It stays constant at ${B}`, 'It rises because consumption rises', `It falls below ${B} at high incomes`],
  sol: `APC = ${CBAR} ÷ Y + ${B}: ${NP[1].apc} at 100 and ${NP[6].apc} at 600. As Y grows, ${CBAR} ÷ Y shrinks, so APC falls towards ${B} but never reaches it.`,
}));
Q('m_breakeven_point', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'On a diagram of an imagined economy\'s consumption curve drawn with a 45° line, the point where the two meet shows the income at which',
  opts: ['consumption equals income and saving is zero', 'consumption is zero', 'saving is at its maximum', 'investment equals consumption'],
  sol: 'Every point on the 45° line has C = Y. Where the consumption curve meets it, C = Y and S = 0: the break-even point.',
}));
Q('ar_mpc_less_one', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'When the income of households in an imagined economy rises by ₹100 crore, their consumption rises by less than ₹100 crore.',
  r: 'People usually save a part of any increase in their income.',
  sol: 'Both are true and R explains A: because part of the extra income is saved, consumption rises by less than income, so MPC < 1.',
}));
Q('tf_apc_mpc', tf({
  t: 3, d: 3, c: 'analysis', ans: true,
  stem: `True or false? For the linear consumption function C = ${CBAR} + ${B}Y of imagined Neelgiri Pradesh, the APC is greater than the MPC at every positive income.`,
  sol: `APC = ${B} + ${CBAR} ÷ Y, and ${CBAR} ÷ Y > 0 for every positive income, so APC > MPC = ${B}.`,
}));
Q('n_apc_calc', num({
  t: 3, d: 1, c: 'understanding', marks: 1, value: 0.85, unit: null,
  stem: `An imagined Mangaluru cashew-processing family earns ₹${N_APC.y} hundred a month and spends ₹${N_APC.c} hundred. Calculate its average propensity to consume.`,
  sol: `APC = C ÷ Y = ${N_APC.c} ÷ ${N_APC.y} = 0.85.`,
}));
Q('n_mpc_calc', num({
  t: 3, d: 2, c: 'application', marks: 1, value: 0.75, unit: null,
  stem: `When the income of an imagined Nashik grape-growers' cooperative rises from ₹${N_MPC.y1} lakh to ₹${N_MPC.y2} lakh, its members' consumption rises from ₹${N_MPC.c1} lakh to ₹${N_MPC.c2} lakh. Find the MPC.`,
  sol: `MPC = ΔC ÷ ΔY = (${N_MPC.c2} − ${N_MPC.c1}) ÷ (${N_MPC.y2} − ${N_MPC.y1}) = 150 ÷ 200 = 0.75.`,
}));
Q('n_cons_value', num({
  t: 3, d: 2, c: 'application', marks: 1, value: 180, unit: '₹ crore',
  stem: 'In an imagined hill economy, autonomous consumption is ₹30 crore and the MPC is 0.6. Find consumption when income is ₹250 crore (in ₹ crore).',
  sol: 'C = 30 + 0.6 × 250 = 30 + 150 = 180.',
}));
assert(30 + 0.6 * 250 === 180, 'n_cons_value');
Q('ord_apc_values', ord({
  t: 3, d: 2, c: 'application', marks: 1,
  stem: `For the Sundarban fishing village (₹ lakh) with consumption ${VIL.c.join(', ')} at incomes ${VIL.y.join(', ')}, arrange the incomes from the HIGHEST to the LOWEST average propensity to consume.`,
  items: VIL.y.map((y) => `Income ₹${y} lakh`),
  sol: `APC = C ÷ Y: ${VIL_APC.join(', ')}, which falls as income rises.`,
}));
Q('s_apc_mpc', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between APC and MPC, using the figures of an imagined Bhopal household whose monthly consumption rises from ₹30 thousand to ₹38 thousand when income rises from ₹30 thousand to ₹40 thousand.',
  model: `**APC** = C ÷ Y, the share of income consumed: at income 40 it is 38 ÷ 40 = **${HH_APC[2]}**. **MPC** = ΔC ÷ ΔY, the share of extra income consumed: 8 ÷ 10 = **${HH_MPC[1]}**.`,
  sol: 'Each ratio defined and worked out.',
  scheme: [['APC defined and computed', 1], ['MPC defined and computed', 1]],
}));
Q('s_mpc_why_below', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does the MPC of households in an imagined district town lie between zero and one? Give two reasons.',
  model: '1. When income rises people **spend some** of the increase, so MPC is **above zero**.\n2. They also **save some** of it for the future, so consumption rises by **less than** income and MPC is **below one**.',
  sol: 'Some spent, some saved.',
  scheme: [['Above zero: some is spent', 1], ['Below one: some is saved', 1]],
}));
Q('s3_household_schedule', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The table shows the monthly income and consumption of an imagined Bhopal household (₹ thousand).\n\n${hhTable()}\n\nCalculate the APC at each income and the MPC between successive incomes, and state the break-even income.`,
  model: `**APC = C ÷ Y** at each income: 22 ÷ 20, 30 ÷ 30, 38 ÷ 40 and 46 ÷ 50, giving **${HH_APC.join(', ')}**. **MPC = ΔC ÷ ΔY**: consumption rises by 8 for every rise of 10 in income, so the MPC is **${HH_MPC.join(', ')}**. The **break-even income is ₹30 thousand**, where consumption equals income (30 = 30), saving is zero and APC = 1; below it the family dissaves.`,
  sol: 'APC = C ÷ Y; MPC = ΔC ÷ ΔY; break-even where C = Y.',
  scheme: [['APC column', 1], ['MPC column', 1], ['Break-even income 30', 1]],
}));
Q('s3_village_mpc', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Study the income and consumption of an imagined Sundarban fishing village.\n\n${vilTable()}\n\nCalculate the MPC between successive incomes and comment on what the trend suggests about how the villagers use extra income.`,
  model: `**MPC = ΔC ÷ ΔY:** 80 ÷ 100, 70 ÷ 100 and 60 ÷ 100, that is **${VIL_MPC.join(', ')}**. The MPC **falls as income rises**. At low incomes almost every extra rupee goes on **necessities** such as food and boat repairs, but as families become better off they **save a larger share** of each extra rupee, so consumption rises by less and less.`,
  sol: 'MPC values, then interpretation.',
  scheme: [['MPC 0.8, 0.7, 0.6', 1], ['MPC falls as income rises', 1], ['Interpretation: larger share saved', 1]],
}));
Q('s3_consumption_curve', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe the consumption curve of imagined Neelgiri Pradesh, C = ${CBAR} + ${B}Y, drawn with a 45° line, and identify three of its features.`,
  model: `1. It starts at **${CBAR} on the vertical axis** (autonomous consumption), not at the origin.\n2. It slopes upward with **slope ${B} (the MPC)**, flatter than the 45° line.\n3. It cuts the 45° line at the **break-even income of ${BE}**: to the left C > Y (dissaving), to the right C < Y (saving).`,
  sol: 'Intercept, slope, break-even point.',
  scheme: [['Positive intercept', 1], ['Slope = MPC < 1', 1], ['Break-even at 300 with regions', 1]],
}));
Q('l_consumption_full', long({
  t: [3, 4], d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Answer the following about imagined Neelgiri Pradesh, where C = ${CBAR} + ${B}Y (₹ crore). [3 + 2]\n\n(a) Prepare a consumption and saving schedule for incomes 0, 200, 400 and 600, and find the APC and APS at 400 and 600.\n(b) Find the break-even income and explain what it shows.`,
  model: `(a) Putting each income into the function gives **C:** ${[0, 200, 400, 600].map(cons).join(', ')} at incomes 0, 200, 400 and 600. Saving is income minus consumption, **S = Y − C:** ${[0, 200, 400, 600].map(sav).join(', ')}. At 400, APC = ${cons(400)} ÷ 400 = **${NP[4].apc}** and APS = ${sav(400)} ÷ 400 = **${NP[4].aps}**; at 600, APC = ${cons(600)} ÷ 600 = **${NP[6].apc}** and APS = ${sav(600)} ÷ 600 = **${NP[6].aps}**. In each case APC + APS = 1.\n(b) The break-even income is where consumption equals income: ${CBAR} + ${B}Y = Y, so Y = ${CBAR} ÷ (1 − ${B}) = **${BE}**. Here saving is **zero** and **APC = 1**. Below ${BE} people **dissave**, spending more than their income from past savings; above it they **save** a part of their income.`,
  sol: 'Schedule from the function, ratios, then C = Y.',
  scheme: [['Consumption column', 1], ['Saving column', 1], ['APC and APS at 400 and 600', 1], ['Break-even income 300', 1], ['Meaning: S = 0, APC = 1, regions', 1]],
}));
Q('l_mpc_falling', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `A planner says that an imagined Sundarban fishing village "will spend 80 paise of every extra rupee it earns, whatever its income". Using the village schedule below, evaluate this claim. [3 + 2]\n\n${vilTable()}\n\n(a) Calculate the APC at each income and the MPC between successive incomes.\n(b) Evaluate the planner\'s claim and suggest what the trend means for a government trying to raise spending through extra income to villagers.`,
  model: `(a) **APC = C ÷ Y:** 120 ÷ 100, 200 ÷ 200, 270 ÷ 300 and 330 ÷ 400, giving **${VIL_APC.join(', ')}**. **MPC = ΔC ÷ ΔY:** consumption rises by 80, 70 and 60 for each rise of 100 in income, so the MPC is **${VIL_MPC.join(', ')}**.\n(b) The planner\'s claim holds **only at low incomes**, where the MPC is 0.8 between incomes of 100 and 200. The MPC **falls to 0.7 and then 0.6** at higher incomes, so the village spends a **smaller share** of each extra rupee as it becomes richer and saves the rest. A government that wants to raise spending should note that extra income given to **poorer** households raises consumption **more** than the same amount given to better-off ones.`,
  sol: 'Ratios, then a reasoned judgement.',
  scheme: [['APC values', 1], ['MPC values', 1], ['Correct working', 1], ['Claim true only at low incomes', 1], ['Policy implication', 1]],
}));

// ================================================================ t04 Propensity to save; the two identities
Q('m_aps_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The share of an imagined Surat diamond-polisher\'s income that she saves is her',
  opts: ['average propensity to save', 'marginal propensity to save', 'marginal propensity to consume', 'autonomous saving'],
  sol: 'APS = S ÷ Y, saving as a share of total income. MPS is the share of extra income saved.',
}));
Q('m_mps_from_mpc', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Households in an imagined Kerala backwater town spend 0.65 of every extra rupee they earn. Their marginal propensity to save is',
  opts: ['0.35', '0.65', '1.65', '0.53'],
  sol: 'MPC + MPS = 1, so MPS = 1 − 0.65 = 0.35.',
}));
assert(rd(1 - 0.65) === 0.35, 'mps from mpc');
Q('m_aps_negative', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In a year of crop failure, farm families in an imagined Marathwada village spend more than they earn. Their APS for that year is',
  opts: ['negative', 'zero', 'between 0 and 1', 'greater than 1'],
  sol: 'If C > Y, saving is negative, so APS = S ÷ Y is negative.',
}));
Q('m_saving_curve_start', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `The saving curve of imagined Neelgiri Pradesh, derived from C = ${CBAR} + ${B}Y, starts on the vertical axis at`,
  opts: [`−${CBAR}`, `${CBAR}`, '0', `${B}`],
  sol: `S = Y − C = −${CBAR} + ${rd(1 - B)}Y, so at Y = 0 saving is −${CBAR}.`,
}));
Q('m_mps_slope', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `On the saving curve of imagined Neelgiri Pradesh, income rises from 400 to 500 (₹ crore). By how much does saving rise, and what does that show?`,
  opts: [`By ${rd(sav(500) - sav(400))}, the MPS of ${rd(1 - B)} times the rise in income`, `By ${rd(cons(500) - cons(400))}, the MPC times the rise in income`, 'By 100, because all extra income is saved', `By ${CBAR}, the autonomous part`],
  sol: `ΔS = S(500) − S(400) = ${sav(500)} − ${sav(400)} = ${rd(sav(500) - sav(400))}, which is ${rd(1 - B)} × 100: the slope of the saving curve is the MPS.`,
}));
Q('m_both_identities', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In an imagined economy the APC is 0.9 and the MPC is 0.75. Which pair gives its APS and MPS?',
  opts: ['APS 0.1, MPS 0.25', 'APS 0.25, MPS 0.1', 'APS 0.9, MPS 0.75', 'APS 1.1, MPS 1.25'],
  sol: 'APS = 1 − APC = 0.1 and MPS = 1 − MPC = 0.25.',
}));
assert(rd(1 - 0.9) === 0.1 && rd(1 - 0.75) === 0.25, 'both identities');
Q('ar_mps_aps', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: `For the saving function S = −${CBAR} + ${rd(1 - B)}Y of imagined Neelgiri Pradesh, the APS is below the MPS at every positive income.`,
  r: 'The sum of MPC and MPS is always equal to one.',
  sol: `Both are true, but R does not explain A. A holds because APS = ${rd(1 - B)} − ${CBAR} ÷ Y is always below ${rd(1 - B)}; R is a separate identity about the marginal propensities.`,
}));
Q('ar_aps_one', ar({
  t: 4, d: 2, c: 'analysis', key: 'd',
  a: 'At the break-even income of an imagined economy, the APS equals one.',
  r: 'At the break-even income, households save all of their income.',
  sol: 'Both are false. At the break-even income C = Y, so saving is zero, APS = 0 and APC = 1; households consume all their income, not save it.',
}));
Q('tf_mpc_plus_mps', tf({
  t: 4, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? If an imagined Agra shoemaker saves 30 paise of every extra rupee she earns, she spends the other 70 paise, so her MPC and MPS add up to one.',
  sol: 'Every extra rupee is either consumed or saved, so ΔC + ΔS = ΔY and MPC + MPS = 1 (0.7 + 0.3).',
}));
Q('fb_aps_identity', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'Because income is either consumed or saved, APC + APS = ___.',
  acc: [['1', 'one']],
  sol: 'C + S = Y, so dividing by Y gives APC + APS = 1.',
}));
Q('n_mps_value', num({
  t: 4, d: 1, c: 'understanding', marks: 1, value: 0.2, unit: null,
  stem: 'When the income of an imagined Darjeeling tea-garden worker\'s family rises by ₹5,000 a month, its saving rises by ₹1,000. Find its MPS.',
  sol: 'MPS = ΔS ÷ ΔY = 1,000 ÷ 5,000 = 0.2.',
}));
Q('n_breakeven_calc', num({
  t: 4, d: 3, c: 'application', marks: 1, value: 200, unit: '₹ crore',
  stem: 'An imagined Chhattisgarh economy has the saving function S = −50 + 0.25Y (₹ crore). At what income is saving zero (in ₹ crore)?',
  sol: 'S = 0 when 0.25Y = 50, so Y = 50 ÷ 0.25 = 200.',
}));
assert(rd(50 / 0.25) === 200, 'breakeven calc');
Q('n_saving_at_income', num({
  t: 4, d: 2, c: 'application', marks: 1, value: 60, unit: '₹ crore',
  stem: 'With the saving function S = −40 + 0.25Y of an imagined Odisha coastal economy (₹ crore), find saving when income is ₹400 crore (in ₹ crore).',
  sol: 'S = −40 + 0.25 × 400 = −40 + 100 = 60.',
}));
assert(-40 + 0.25 * 400 === 60, 'saving at income');
Q('s_aps_mps', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between APS and MPS for an imagined Surat textile worker whose monthly saving rises from ₹2,000 to ₹3,000 when income rises from ₹20,000 to ₹25,000.',
  model: '**APS** = S ÷ Y, the share of income saved: 3,000 ÷ 25,000 = **0.12**. **MPS** = ΔS ÷ ΔY, the share of extra income saved: 1,000 ÷ 5,000 = **0.2**.',
  sol: 'Each ratio defined and worked out.',
  scheme: [['APS defined and computed', 1], ['MPS defined and computed', 1]],
}));
assert(rd(3000 / 25000) === 0.12 && rd(1000 / 5000) === 0.2, 's_aps_mps');
Q('s_identity_proof', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Show that MPC + MPS = 1, using the case of an imagined Madurai flower seller whose income rises by ₹1,000 a month.',
  model: 'An extra ₹1,000 is either **spent or saved**: if she spends ₹800 and saves ₹200, then ΔC + ΔS = ΔY. Dividing by ΔY: **800 ÷ 1,000 + 200 ÷ 1,000 = 1**, so MPC + MPS = 1.',
  sol: 'ΔY = ΔC + ΔS, then divide by ΔY.',
  scheme: [['ΔY = ΔC + ΔS', 1], ['Divide by ΔY to get the identity', 1]],
}));
Q('s3_fill_schedule', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Derive the saving schedule of the imagined Sundarban fishing village from its consumption schedule, and find its MPS between successive incomes.\n\n${vilTable()}`,
  model: `**Saving = Y − C** at each income: 100 − 120, 200 − 200, 300 − 270 and 400 − 330, giving **${VIL_S.join(', ')}** (₹ lakh). **MPS = ΔS ÷ ΔY:** saving rises by 20, 30 and 40 for each rise of 100 in income, so the MPS is **${VIL_MPS.join(', ')}**. Each value equals **1 − MPC** (${VIL_MPC.join(', ')}), as the identity MPC + MPS = 1 requires.`,
  sol: 'S = Y − C, then ΔS ÷ ΔY.',
  scheme: [['Saving column', 1], ['MPS values', 1], ['Link MPS = 1 − MPC', 1]],
}));
Q('s3_unknowns', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'In an imagined economy, income is ₹1,000 crore, saving is ₹150 crore and, when income rises to ₹1,200 crore, consumption rises to ₹1,010 crore. Find the APC at ₹1,000 crore, the MPC and the MPS.',
  model: 'At an income of 1,000, consumption is income minus saving: C = 1,000 − 150 = 850, so **APC = 850 ÷ 1,000 = 0.85**. When income rises to 1,200, consumption rises to 1,010, so ΔC = 1,010 − 850 = 160 and ΔY = 200. Hence **MPC = 160 ÷ 200 = 0.8**, and from MPC + MPS = 1, **MPS = 1 − 0.8 = 0.2**.',
  sol: 'C = Y − S; then ΔC ÷ ΔY and the identity.',
  scheme: [['APC 0.85', 1], ['MPC 0.8', 1], ['MPS 0.2', 1]],
}));
assert(rd(850 / 1000) === 0.85 && rd((1010 - 850) / 200) === 0.8, 's3_unknowns');
Q('l_saving_full', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Answer the following about imagined Neelgiri Pradesh, whose consumption function is C = ${CBAR} + ${B}Y (₹ crore). [2 + 3]\n\n(a) Derive its saving function and state the MPS.\n(b) Describe the saving curve drawn from this function: where it starts, its slope, where it cuts the income axis and what lies on either side.`,
  model: `(a) Saving is the part of income not consumed: S = Y − C = Y − (${CBAR} + ${B}Y) = **−${CBAR} + ${rd(1 - B)}Y**. The coefficient of Y is the **MPS = ${rd(1 - B)}**, which equals 1 − MPC, because each extra rupee is either spent (70 paise) or saved (30 paise).\n(b) Draw income on the horizontal axis and saving on the vertical axis. The saving curve starts at **−${CBAR}** on the vertical axis, showing dissaving of ${CBAR} at zero income. It is a straight line rising with **slope ${rd(1 - B)}**, the MPS. It cuts the income axis at the **break-even income of ${BE}**, where S = 0. To the **left** of this point saving is **negative**; to the **right** it is **positive** and keeps rising, reaching ${sav(600)} at an income of 600.`,
  sol: 'Saving function, then the curve described.',
  scheme: [['Saving function', 1], ['MPS 0.3', 1], ['Starts at −90', 1], ['Slope = MPS; cuts at 300', 1], ['Negative and positive regions', 1]],
}));

// ================================================================ ISC paper-style items for the bank (4 and 8 marks)
Q('q4_twin_households', short({
  t: [3, 4], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Two imagined households in Patna each earn ₹40,000 a month. The Sinhas spend ₹36,000 and the Ansaris ₹30,000. Next month both incomes rise by ₹10,000; the Sinhas spend ₹6,000 of the rise and the Ansaris ₹7,000. [2 + 2]\n\n(i) Calculate the APC (at ₹40,000) and the MPC of each household.\n(ii) Explain which household saves the larger share of its income now, and which would add more to consumption out of a further rise in income.',
  model: '(i) Sinhas: **APC = 36,000 ÷ 40,000 = 0.9** and **MPC = 6,000 ÷ 10,000 = 0.6**. Ansaris: **APC = 30,000 ÷ 40,000 = 0.75** and **MPC = 7,000 ÷ 10,000 = 0.7**.\n(ii) The **Ansaris** save the larger share of their present income: their **APS is 0.25**, against 0.1 for the Sinhas. But the Ansaris also have the **higher MPC (0.7)**, so out of a further rise in income they would add **more to consumption** than the Sinhas. A high average saving rate does not mean a low marginal one.',
  sol: 'APC and MPC, then compare APS and MPC.',
  scheme: [['(i) APCs', 1], ['(i) MPCs', 1], ['(ii) Ansaris save the larger share (APS)', 1], ['(ii) Higher MPC adds more to consumption', 1]],
}));
assert(rd(36000 / 40000) === 0.9 && rd(30000 / 40000) === 0.75 && rd(6000 / 10000) === 0.6 && rd(7000 / 10000) === 0.7, 'twin households');
Q('q4_navkhand_plans', short({
  t: [1, 2], d: 3, c: 'application', marks: 4, wl: S4,
  stem: `In the imagined state economy of Navkhand (₹ crore), planned spending is C = ${NAV.c}, I = ${NAV.i}, G = ${NAV.g}, X = ${NAV.x} and M = ${NAV.m}, while firms produce output worth ₹1,200 crore. [2 + 2]\n\n(i) Calculate aggregate demand and compare it with output.\n(ii) Explain what happens to stocks and to ex post investment, and how firms are likely to respond.`,
  model: `(i) AD = C + I + G + (X − M) = ${NAV.c} + ${NAV.i} + ${NAV.g} + (${NAV.x} − ${NAV.m}) = **${NAV_AD}**. This planned spending **exceeds output of 1,200 by 40**, so there is excess demand.\n(ii) Buyers want more than is being produced, so firms meet the extra demand by **selling from their stocks**. Stocks **fall by 40**, an unplanned fall in inventory, so ex post investment is **40 less** than planned investment. Seeing their stocks run down, firms are likely to **raise output and employment** in the next period.`,
  sol: 'AD versus output, then the stock adjustment.',
  scheme: [['(i) AD = 1240', 1], ['(i) Exceeds output by 40', 1], ['(ii) Stocks fall; ex post investment below plan', 1], ['(ii) Firms raise output', 1]],
}));
Q('q4_saving_curve', short({
  t: 4, d: 3, c: 'application', marks: 4, wl: S4,
  stem: 'An imagined Assam tea-growing economy has the consumption function C = 60 + 0.8Y (₹ crore). [2 + 2]\n\n(i) Derive its saving function and find the break-even income.\n(ii) Find saving and the APS at an income of ₹500 crore.',
  model: '(i) Saving is income minus consumption: S = Y − C = Y − (60 + 0.8Y) = **−60 + 0.2Y**, so the MPS is 0.2. The break-even income is where saving is zero: 0.2Y = 60, so Y = 60 ÷ 0.2 = **300**. At this income consumption also equals income (60 + 0.8 × 300 = 300).\n(ii) At an income of 500, S = −60 + 0.2 × 500 = −60 + 100 = **40**. The APS is saving divided by income: **APS = 40 ÷ 500 = 0.08**, so the APC is 0.92.',
  sol: 'Saving function, S = 0, then S and APS at 500.',
  scheme: [['(i) Saving function', 1], ['(i) Break-even 300', 1], ['(ii) Saving 40', 1], ['(ii) APS 0.08', 1]],
}));
assert(rd(60 / 0.2) === 300 && rd(-60 + 0.2 * 500) === 40 && rd(40 / 500) === 0.08, 'q4 saving curve');
Q('l8_propensities', long({
  t: [3, 4], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts about the imagined Sundarban fishing village. [4 + 4]\n\n${vilTable()}\n\n(i) Derive the saving schedule, and calculate the APC, APS, MPC and MPS, showing that APC + APS = 1 and MPC + MPS = 1.\n(ii) Explain, with a described diagram of the consumption curve and the 45° line, why the village's APC is above 1 at the lowest income and how the break-even income can be read from the diagram.`,
  model: `(i) **S:** ${VIL_S.join(', ')}. **APC:** ${VIL_APC.join(', ')}; **APS:** ${VIL_APC.map((a) => rd(1 - a)).join(', ')} (each pair adds to 1). **MPC:** ${VIL_MPC.join(', ')}; **MPS:** ${VIL_MPS.join(', ')} (each pair adds to 1).\n(ii) Draw income on the horizontal axis and consumption on the vertical; the **45° line** shows C = Y. The consumption curve starts **above the origin** and is **flatter** than the 45° line. At income **100** it lies **above** the 45° line (C = 120 > 100), so **APC = 1.2**: the village **dissaves** 20. The curve **meets** the 45° line at income **200**, the **break-even income**, where C = Y, S = 0 and APC = 1; beyond it the curve lies below the line and the village saves.`,
  sol: 'Schedules and identities, then the diagram.',
  scheme: [['(i) Saving schedule', 1], ['(i) APC and APS adding to 1', 1], ['(i) MPC values', 1], ['(i) MPS adding to 1', 1], ['(ii) Diagram with 45° line described', 1], ['(ii) Curve above line at 100: APC 1.2', 1], ['(ii) Break-even at 200 where curve meets the line', 1], ['(ii) Saving beyond break-even', 1]],
}));
assert(VIL_APC.every((a, i) => rd(a + VIL_S[i] / VIL.y[i]) === 1) && VIL_MPC.every((m, i) => rd(m + VIL_MPS[i]) === 1), 'l8 identities');
Q('l8_effective_demand', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: 'Answer both parts about an imagined economy where households plan to save ₹120 crore and firms plan to invest ₹100 crore. [4 + 4]\n\n(i) Explain the meaning of ex ante and ex post saving and investment, and show how the two plans are brought to equality ex post.\n(ii) "Effective demand always ensures full employment." Evaluate this statement using the idea of aggregate demand and aggregate supply.',
  model: '(i) **Ex ante** values are **planned** at the start of the period; **ex post** values are **realised** at its end. Here planned saving exceeds planned investment by **₹20 crore**, so spending on output falls short by 20 and goods worth **20 remain unsold**. These add to **stocks** as **unplanned investment**, so realised investment = 100 + 20 = **120**, equal to realised saving.\n(ii) The statement is **not correct**. **Effective demand** is the level of aggregate demand at which it **equals aggregate supply**; it fixes actual output and employment. But it depends on **planned spending**, which may be **too low** to buy the output of a fully employed workforce. The economy can then settle at an equilibrium with **involuntary unemployment**. Full employment is only **one possible** position of effective demand.',
  sol: 'Ex ante/ex post with the stock adjustment; then evaluate.',
  scheme: [['(i) Meanings of ex ante and ex post', 1], ['(i) Excess planned saving of 20', 1], ['(i) Unsold goods become unplanned investment', 1], ['(i) Realised values equal at 120', 1], ['(ii) Meaning of effective demand', 1], ['(ii) Depends on planned spending', 1], ['(ii) May be below full employment', 1], ['(ii) Reasoned conclusion', 1]],
}));

// ================================================================ case-based
Q('cb_hosiery_cluster', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined minutes of a Ludhiana hosiery traders\' association and answer the questions that follow. *(Written by SOYL for practice; the association and figures are imagined.)*',
  passage: `**Minutes of a meeting of an imagined hosiery traders' association, Ludhiana**\n\nThe secretary reported that members had planned to invest ₹${HOS.plannedI} crore this year in knitting machines and yarn stocks. A mild winter meant that sweaters worth ₹${HOS.unplannedStock} crore were still lying in godowns in March. One member argued that "the extra stock is not investment, because nobody chose to buy it". Another said that buyers from the Gulf had cut their orders, so the cluster's exports had fallen.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: HOS_REAL, unit: '₹ crore', stem: 'What is the cluster\'s realised (ex post) investment for the year?', sol: `Realised investment = ${HOS.plannedI} + ${HOS.unplannedStock} = ${HOS_REAL}.` })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which component of aggregate demand fell when the Gulf buyers cut their orders?', model: '**Exports (X)**, so net exports (X − M) fell.', sol: 'Sales to buyers abroad are exports.', scheme: [['Exports / net exports', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the member\'s claim that the extra stock is not investment.', model: 'The claim is **wrong**. Investment includes **additions to stock**, whether planned or not. The unsold sweaters are output that was **produced but not consumed**, so they count as **unplanned investment**; they also signal that firms should **cut output**.', sol: 'Unplanned inventory is part of realised investment.', scheme: [['Claim rejected with the stock rule', 1], ['Unplanned investment and its signal', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Distinguish the planned and realised investment of the cluster, using the figures in the minutes.', model: `**Planned (ex ante)** investment was **₹${HOS.plannedI} crore**, decided at the start of the year. **Realised (ex post)** investment was **₹${HOS_REAL} crore**, because unsold sweaters worth ₹${HOS.unplannedStock} crore were added to stock.`, sol: 'Planned versus realised with figures.', scheme: [['Planned 150', 1], ['Realised 175 with reason', 1]] }),
    ]),
  ],
}));
Q('cb_bhopal_budget', caseQ({
  t: [3, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined family budget notes from Bhopal and answer the questions that follow. *(Written by SOYL for practice; the family and figures are imagined.)*',
  passage: `**From the notebook of an imagined Bhopal family (₹ thousand a month)**\n\n${hhTable()}\n\nWhen the father lost overtime work, income fell to ₹20 thousand and the family used its savings to keep spending ₹22 thousand. "Once our income is back to ₹50 thousand," says the mother, "we will save ₹4 thousand a month again."`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'understanding', marks: 1, value: HH_MPC[0], unit: null, stem: 'What is the family\'s MPC?', sol: `MPC = ΔC ÷ ΔY = 8 ÷ 10 = ${HH_MPC[0]} between every pair of incomes.` })),
    child('b', num({ t: 4, d: 2, c: 'application', marks: 1, value: 0.08, unit: null, stem: 'What will its APS be at an income of ₹50 thousand?', sol: 'APS = S ÷ Y = 4 ÷ 50 = 0.08.' })),
    child('c', short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the family\'s position at an income of ₹20 thousand in terms of APC and saving.', model: `APC = 22 ÷ 20 = **${HH_APC[0]}**, above 1: consumption **exceeds income**, so saving is **−2 (dissaving)**, financed from **past savings**.`, sol: 'APC above 1 means dissaving.', scheme: [['APC 1.1', 1], ['Dissaving of 2 from past savings', 1]] }), [
      short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Find the family\'s break-even income and explain what it means.', model: '**₹30 thousand**: here consumption **equals** income (30 = 30), so **saving is zero** and **APC = 1**.', sol: 'Break-even where C = Y.', scheme: [['Break-even 30', 1], ['Meaning: S = 0, APC = 1', 1]] }),
    ]),
  ],
}));
assert(rd(4 / 50) === 0.08, 'cb bhopal aps');
Q('cb_neelgiri_bulletin', caseQ({
  t: [3, 4], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined planning bulletin of Neelgiri Pradesh and answer the questions that follow. *(Written by SOYL for practice; the economy and figures are imagined.)*',
  passage: `**Planning bulletin of an imagined state, Neelgiri Pradesh (₹ crore)**\n\nResearchers estimate that households consume ₹${CBAR} crore even in a year with no income and spend 70 paise of every extra rupee earned. Last year the state's income was ₹500 crore. A minister proposes a scheme that would raise income to ₹600 crore and says "people will save every rupee of the rise".`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: cons(500), unit: '₹ crore', stem: 'What was consumption last year (in ₹ crore)?', sol: `C = ${CBAR} + ${B} × 500 = ${cons(500)}.` })),
    child('b', num({ t: 4, d: 2, c: 'application', marks: 1, value: sav(600), unit: '₹ crore', stem: 'What will saving be at an income of ₹600 crore (in ₹ crore)?', sol: `S = 600 − (${CBAR} + ${B} × 600) = 600 − ${cons(600)} = ${sav(600)}.` })),
    child('c', short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the minister\'s claim that people will save every rupee of the rise.', model: `The claim is **wrong**. With an **MPC of ${B}**, people spend 70 paise of each extra rupee and save only **30 paise (MPS ${rd(1 - B)})**. Saving rises from ${sav(500)} to ${sav(600)}, by **${rd(sav(600) - sav(500))}**, not by 100.`, sol: 'Use MPS = 0.3 on the rise of 100.', scheme: [['MPS 0.3, not 1', 1], ['Saving rises by 30 only', 1]] }), [
      short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Show that APC + APS = 1 at an income of ₹600 crore.', model: `APC = ${cons(600)} ÷ 600 = **${NP[6].apc}**; APS = ${sav(600)} ÷ 600 = **${NP[6].aps}**; ${NP[6].apc} + ${NP[6].aps} = **1**, because income is either consumed or saved.`, sol: 'Compute both and add.', scheme: [['APC and APS at 600', 1], ['Sum 1 with reason', 1]] }),
    ]),
  ],
}));
assert(rd(sav(600) - sav(500)) === 30 && cons(500) === 440 && sav(600) === 90, 'neelgiri case');
