// ISC 12 Economics, ch09 Revenue and Producer's Equilibrium — question bank. Every firm, town, person and figure is
// imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in
// a stem, key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Conventions: AR = TR ÷ Q (= price); MR = TRn − TRn−1 read from a schedule; MC = TCn − TCn−1. Producer's equilibrium:
// MR = MC with MC rising (MC cuts MR from below); when no output gives MR exactly equal to MC in a schedule, the firm
// produces up to the last unit for which MR ≥ MC. In a schedule where MR = MC exactly, profit is the same at that output
// and the one before it; the equilibrium is the output where MR = MC (the extra unit adds as much to revenue as to cost).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
const fmtIN = (n) => n.toLocaleString('en-IN');
const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
const diffs = (a) => a.slice(1).map((v, i) => v - a[i]);

// ---------------------------------------------------------------- revenue and cost engine
/** Revenue schedule from prices (AR) at outputs 1..n: TR, AR, MR (MR of unit 1 = TR1). */
export function revenue(prices) {
  const tr = [0, ...prices.map((p, i) => p * (i + 1))];
  const mr = diffs(tr);
  return prices.map((p, i) => ({ q: i + 1, ar: p, tr: tr[i + 1], mr: mr[i] }));
}
/** Profit table from TR (outputs 0..n, TR0 = 0) and TC (outputs 0..n). */
export function profits(tr, tc) {
  assert(tr.length === tc.length && tr[0] === 0, 'profit arrays');
  const mr = diffs(tr);
  const mc = diffs(tc);
  return tr.map((t, q) => ({ q, tr: t, tc: tc[q], profit: t - tc[q], mr: q ? mr[q - 1] : null, mc: q ? mc[q - 1] : null }));
}
/** Equilibrium by MR–MC: an output where MR = MC with MC rising, else the last unit with MR ≥ MC before MC exceeds MR for good. */
export function eqMRMC(rows) {
  const exact = rows.filter((r) => r.q > 0 && r.mr === r.mc && r.q + 1 < rows.length && rows[r.q + 1].mc > r.mc && rows[r.q + 1].mc > rows[r.q + 1].mr);
  if (exact.length) return exact[exact.length - 1].q;
  let best = 0;
  for (const r of rows) if (r.q > 0 && r.mr >= r.mc) best = r.q;
  return best;
}
/** Equilibrium by TR–TC: output(s) with the largest profit. */
export function eqTRTC(rows) {
  const max = Math.max(...rows.map((r) => r.profit));
  return { max, qs: rows.filter((r) => r.profit === max).map((r) => r.q) };
}

// ---------------------------------------------------------------- shared imagined data (all asserted)
// (1) Perfect competition: an imagined Alappuzha coir-rope maker sells any quantity at ₹40 a coil.
export const COIR = { p: 40, qs: [1, 2, 3, 4, 5] };
export const COIR_REV = revenue(COIR.qs.map(() => COIR.p));
assert(COIR_REV.map((r) => r.tr).join() === '40,80,120,160,200' && COIR_REV.every((r) => r.ar === 40 && r.mr === 40), 'coir');

// (2) Imperfect competition: an imagined Lucknow chikan-kurta workshop faces AR = 110 − 10Q (₹ hundred a kurta).
export const KURTA_AR = [100, 90, 80, 70, 60, 50, 40];
export const KURTA = revenue(KURTA_AR);
assert(KURTA.map((r) => r.tr).join() === '100,180,240,280,300,300,280', 'kurta tr');
assert(KURTA.map((r) => r.mr).join() === '100,80,60,40,20,0,-20', 'kurta mr');
export const KURTA_TRMAX_Q = KURTA.find((r) => r.mr === 0).q;
assert(KURTA_TRMAX_Q === 6 && KURTA[5].tr === 300 && KURTA[4].tr === 300, 'kurta tr max');
// Its cost: TC for 0..6 kurtas (₹ hundred).
export const KURTA_TC = [50, 110, 160, 200, 250, 320, 410];
export const KURTA_P = profits([0, ...KURTA.slice(0, 6).map((r) => r.tr)], KURTA_TC);
assert(KURTA_P.map((r) => r.profit).join() === '-50,-10,20,40,30,-20,-110', 'kurta profit');
assert(KURTA_P.slice(1).map((r) => r.mc).join() === '60,50,40,50,70,90', 'kurta mc');
export const KURTA_EQ = eqMRMC(KURTA_P);
assert(KURTA_EQ === 3 && eqTRTC(KURTA_P).qs.join() === '3' && eqTRTC(KURTA_P).max === 40, 'kurta eq');

// (3) Perfect competition with MR = MC exactly: an imagined Tiruppur T-shirt unit, price ₹30 a shirt (₹ hundred a batch).
export const TEE = { p: 30, tc: [40, 60, 75, 85, 100, 130, 170] };
export const TEE_P = profits(TEE.tc.map((_, q) => TEE.p * q), TEE.tc);
assert(TEE_P.slice(1).map((r) => r.mc).join() === '20,15,10,15,30,40', 'tee mc');
assert(TEE_P.map((r) => r.profit).join() === '-40,-30,-15,5,20,20,10', 'tee profit');
export const TEE_EQ = eqMRMC(TEE_P);
assert(TEE_EQ === 5 && eqTRTC(TEE_P).qs.join() === '4,5' && eqTRTC(TEE_P).max === 20, 'tee eq');

// (4) MR = MC at two outputs: an imagined Jodhpur leather-bag unit, price ₹25, TFC ₹10, MC 25, 18, 15, 20, 25, 32.
export const BAG = { p: 25, tfc: 10, mc: [25, 18, 15, 20, 25, 32] };
export const BAG_TC = BAG.mc.reduce((a, m) => [...a, a[a.length - 1] + m], [BAG.tfc]);
export const BAG_P = profits(BAG_TC.map((_, q) => BAG.p * q), BAG_TC);
assert(BAG_TC.join() === '10,35,53,68,88,113,145' && BAG_P.map((r) => r.profit).join() === '-10,-10,-3,7,12,12,5', 'bag');
export const BAG_EQ = eqMRMC(BAG_P);
assert(BAG_EQ === 5 && BAG_P[1].mr === BAG_P[1].mc && BAG_P[2].mc < BAG_P[1].mc, 'bag eq (first equality has MC falling)');

// (5) Continuous curves for diagrams. Imperfect competition: AR = 12 − Q, MR = 12 − 2Q, TR = 12Q − Q² (max 36 at Q = 6).
export const ARc = (q) => 12 - q;
export const MRc = (q) => 12 - 2 * q;
export const TRc = (q) => 12 * q - q * q;
assert(MRc(6) === 0 && TRc(6) === 36 && TRc(5) < 36 && TRc(7) < 36, 'continuous imperfect');
// Producer's equilibrium (perfect competition): P = 30, MC = (Q − 5)² + 14, TC = 40 + 14Q + ((Q − 5)³ + 125) ÷ 3.
export const Pc = 30;
export const MCc = (q) => (q - 5) ** 2 + 14;
export const TCc = (q) => 40 + 14 * q + ((q - 5) ** 3 + 125) / 3;
assert(MCc(1) === 30 && MCc(9) === 30 && TCc(0) === 40, 'continuous cost');
export const PROFITc = (q) => Pc * q - TCc(q);
assert(Math.abs(PROFITc(9) - 41) < 1e-9 && PROFITc(9) > PROFITc(8.9) && PROFITc(9) > PROFITc(9.1), 'profit max at 9');
assert(PROFITc(1) < PROFITc(0.9) && PROFITc(1) < PROFITc(1.1), 'profit min at 1');

export const coirTable = () => md(COIR_REV.map((r) => [String(r.q), String(r.ar)]), ['Coils sold', 'Price (₹)']);
export const kurtaArTable = () => md(KURTA.map((r) => [String(r.q), String(r.ar)]), ['Kurtas', 'AR (₹ hundred)']);
export const kurtaCostTable = () => md(KURTA_P.slice(1).map((r) => [String(r.q), String(KURTA_AR[r.q - 1]), String(r.tc)]), ['Kurtas', 'Price (₹ hundred)', 'TC (₹ hundred)']);
export const teeTable = () => md(TEE_P.map((r) => [String(r.q), String(r.tc)]), ['Batches', 'TC (₹ hundred)']);
export const bagTable = () => md(BAG.mc.map((m, i) => [String(i + 1), String(m)]), ['Bags', 'MC (₹)']);

// ================================================================ t01 TR, AR and MR: meaning and calculation
Q('m_ar_equals_price', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'An imagined Varanasi silk-saree weaver earns ₹48,000 by selling 6 sarees at one price. Her average revenue per saree is ₹8,000, which is the same as',
  opts: ['the price of a saree', 'her marginal revenue in every case', 'her profit per saree', 'her total revenue divided by her total cost'],
  sol: 'AR = TR ÷ Q = 48,000 ÷ 6 = 8,000. When every unit sells at the same price, revenue per unit is that price, so AR always equals price. MR need not equal AR, and profit per unit needs cost too.',
}));
Q('m_mr_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'For a seller of terracotta lamps at an imagined Bishnupur fair, marginal revenue is the',
  opts: ['change in total revenue from selling one more lamp', 'total revenue divided by the number of lamps sold', 'price of the last lamp minus its cost', 'revenue earned from the first lamp only'],
  sol: 'MR = TRn − TRn−1, the addition to total revenue from one more unit sold. TR ÷ Q is average revenue; price minus cost is a profit idea.',
}));
Q('m_tr_from_mr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A dhaba owner in an imagined Karnal highway town records the marginal revenue of his 1st, 2nd and 3rd thalis as ₹120, ₹110 and ₹100. His total revenue from 3 thalis is`,
  opts: ['₹330', '₹100', '₹110', '₹300'],
  sol: 'TR is the sum of the marginal revenues of all units sold: 120 + 110 + 100 = 330.',
}));
Q('m_negative_mr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When an imagined Kolkata sweet shop cuts the price of rosogolla to sell one more box, its total revenue falls. At that output its marginal revenue is',
  opts: ['negative', 'zero', 'positive but falling', 'equal to average revenue'],
  sol: 'MR is the change in TR. If TR falls when one more unit is sold, the change is negative, so MR is negative.',
}));
Q('m_ar_from_tr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The imagined Lucknow chikan workshop earns a total revenue of ₹${KURTA[4].tr} hundred by selling 5 kurtas. The price of a kurta at this output is`,
  opts: [`₹${KURTA[4].ar} hundred`, `₹${KURTA[4].mr} hundred`, `₹${KURTA[4].tr} hundred`, `₹${KURTA[4].tr * 5} hundred`],
  sol: `Price = AR = TR ÷ Q = ${KURTA[4].tr} ÷ 5 = ${KURTA[4].ar}. The MR of the 5th kurta is ${KURTA[4].mr}, a different idea.`,
}));
Q('ar_ar_price', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'The average revenue curve of a firm is also its demand curve.',
  r: 'Average revenue equals the price at which each quantity is sold, and the demand curve shows the price at which each quantity can be sold.',
  sol: 'Both are true, and R explains A: since AR = price at every output, plotting AR against quantity traces the price buyers will pay for each quantity, which is the demand curve facing the firm.',
}));
Q('tf_mr_sum', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Adding up the marginal revenues of all the units an imagined Kochi spice exporter sells gives its total revenue.',
  sol: 'Each MR is the addition to TR from one unit, so the sum of the MRs of units 1 to n equals TRn.',
}));
Q('fb_ar_formula', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Total revenue divided by the quantity sold gives ___ revenue, which is the same as price.',
  acc: [['average']],
  sol: 'Average revenue = TR ÷ Q, and it equals the price.',
}));
Q('n_tr_from_ar', num({
  t: 1, d: 1, c: 'understanding', marks: 1, value: 4 * 70, unit: '₹',
  stem: 'A cobbler in an imagined Agra lane sells 4 pairs of sandals at an average revenue of ₹70 a pair. Find his total revenue (in ₹).',
  sol: `TR = AR × Q = 70 × 4 = ${4 * 70}.`,
}));
Q('n_mr_from_tr', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: KURTA[3].mr, unit: '₹ hundred',
  stem: `The imagined Lucknow chikan workshop's total revenue rises from ₹${KURTA[2].tr} hundred with 3 kurtas to ₹${KURTA[3].tr} hundred with 4 kurtas. Find the marginal revenue of the 4th kurta (in ₹ hundred).`,
  sol: `MR4 = TR4 − TR3 = ${KURTA[3].tr} − ${KURTA[2].tr} = ${KURTA[3].mr}.`,
}));
Q('n_ar_bus', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: 2700 / 45, unit: '₹',
  stem: 'An imagined private bus on the Udaipur–Mount Abu route collects ₹2,700 from 45 passengers on a trip, all paying the same fare. What is the average revenue per passenger (in ₹)?',
  sol: `AR = TR ÷ Q = 2,700 ÷ 45 = ${2700 / 45}.`,
}));
Q('mt_revenue_terms', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each revenue idea for an imagined Mysuru agarbatti seller with how it is worked out.',
  pairs: [
    ['Total revenue', 'Price × quantity sold'],
    ['Average revenue', 'Total revenue ÷ quantity sold'],
    ['Marginal revenue', 'TRn − TRn−1'],
    ['Total revenue from marginal revenue', 'Sum of the marginal revenues of all units'],
  ],
  sol: 'TR = P × Q; AR = TR ÷ Q; MR = TRn − TRn−1; and TR is also the running sum of MRs.',
}));
Q('s_tr_ar_mr', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define total revenue and marginal revenue, using an imagined Puri seashell-craft stall as your example.',
  model: '**Total revenue** is the **whole amount received** from sales: if the stall sells 20 shell boxes at ₹50, TR is ₹1,000. **Marginal revenue** is the **addition to TR from selling one more box**, for example the change when the 21st box is sold.',
  sol: 'One definition with an example for each.',
  scheme: [['Total revenue with example', 1], ['Marginal revenue with example', 1]],
}));
Q('s_ar_price', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Show why average revenue is always equal to price, taking an imagined Shimla apple grower who sells Q boxes at a price P each.',
  model: 'Total revenue is **TR = P × Q**. Average revenue is **TR ÷ Q = (P × Q) ÷ Q = P**. So whatever the number of boxes, **revenue per box equals the price** at which they are sold.',
  sol: 'Algebraic link TR = P × Q, then divide by Q.',
  scheme: [['TR = P × Q', 1], ['AR = P shown', 1]],
}));
Q('s3_complete_kurta', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The prices at which an imagined Lucknow chikan workshop can sell its kurtas are shown below. Calculate total revenue and marginal revenue for 1 to 4 kurtas.\n\n${md(KURTA.slice(0, 4).map((r) => [String(r.q), String(r.ar)]), ['Kurtas', 'AR (₹ hundred)'])}`,
  model: `**TR = AR × Q:** ${KURTA.slice(0, 4).map((r) => `${r.ar} × ${r.q} = **${r.tr}**`).join('; ')}.\n**MR = TRn − TRn−1:** ${KURTA.slice(0, 4).map((r) => `**${r.mr}**`).join(', ')}. MR falls faster than AR because a lower price must be accepted on every kurta to sell one more.`,
  sol: 'TR from AR × Q, then MR from differences.',
  scheme: [['TR for 1 to 4 kurtas', 1], ['MR for 1 to 4 kurtas', 1], ['Correct working or remark on MR below AR', 1]],
}));
Q('s3_tr_mr_link', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined Kanpur leather-belt seller notices that his total revenue keeps rising but by smaller amounts each day he cuts prices. Explain what is happening to his marginal revenue at each stage as TR rises, stops rising and then falls.',
  model: '1. While **TR rises**, each extra belt adds something, so **MR is positive** (and here falling).\n2. Where **TR is at its maximum**, the last belt adds nothing, so **MR = 0**.\n3. If he cuts the price further and **TR falls**, the extra belt reduces revenue, so **MR is negative**.',
  sol: 'MR is the slope of TR: positive, zero, negative.',
  scheme: [['TR rising: MR positive', 1], ['TR maximum: MR zero', 1], ['TR falling: MR negative', 1]],
}));
Q('l_revenue_concepts', long({
  t: [1, 3], d: 3, c: 'application', marks: 5, wl: L5,
  stem: `An imagined Lucknow chikan workshop can sell kurtas at the prices below.\n\n${kurtaArTable()}\n\n(a) Calculate TR and MR for 1 to 7 kurtas. [3]\n(b) At what output is TR at its maximum, and what is MR there? Explain the link. [2]`,
  model: `(a) **TR:** ${KURTA.map((r) => r.tr).join(', ')}. **MR:** ${KURTA.map((r) => r.mr).join(', ')} (₹ hundred, for 1 to 7 kurtas), using TR = AR × Q and MR = TRn − TRn−1.\n(b) TR is at its **maximum of ${KURTA[KURTA_TRMAX_Q - 1].tr}** at **${KURTA_TRMAX_Q} kurtas** (it is also ${KURTA[4].tr} at 5), where **MR = 0**: the 6th kurta adds nothing. Beyond it **MR is negative** (${KURTA[6].mr}) and TR falls to ${KURTA[6].tr}. TR rises while MR is positive and stops rising when MR reaches zero.`,
  sol: 'Schedule first, then link TR maximum with MR = 0.',
  scheme: [['TR column', 1], ['MR column', 1], ['Correct working shown', 1], ['TR maximum at 6 with MR = 0', 1], ['Explanation of the TR–MR link', 1]],
}));

// ================================================================ t02 Revenue curves under perfect competition
Q('m_pc_ar_mr', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'An imagined Alappuzha coir-rope maker can sell any number of coils at the market price of ₹40. Her AR and MR curves are',
  opts: ['the same horizontal line at ₹40', 'two downward-sloping lines, MR below AR', 'a single upward-sloping line through the origin', 'two vertical lines'],
  sol: 'Price is fixed by the market, so every extra coil adds ₹40 (MR = 40) and revenue per coil is ₹40 (AR = 40): one horizontal line. A straight line through the origin is her TR curve.',
}));
Q('m_pc_tr_shape', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'For a price-taking wheat farmer in an imagined Hoshiarpur village, the total revenue curve is',
  opts: ['an upward-sloping straight line starting from the origin', 'an inverted U-shaped curve', 'a horizontal line at the market price', 'a downward-sloping straight line'],
  sol: 'With a constant price, TR = P × Q rises by the same amount for each unit, so TR is a straight line through the origin with slope equal to the price.',
}));
Q('m_pc_price_taker', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why does one of thousands of identical potato growers in an imagined Hooghly district face a horizontal average revenue curve?',
  opts: ['Its output is too small to change the market price, so it sells every unit at that price', 'It can raise its price without losing any buyers', 'It has to lower its price to sell every extra unit', 'The government fixes a different price for each grower'],
  sol: 'Each grower is a price taker: its supply is a tiny share of the market, so the industry fixes the price and the grower sells all it wants at that price. Raising the price would lose all buyers.',
}));
Q('m_pc_tr_slope', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `The total revenue line of an imagined Alappuzha coir-rope maker passes through (0, 0) and (5 coils, ₹${COIR_REV[4].tr}). The market price of a coil must be`,
  opts: [`₹${COIR.p}`, `₹${COIR_REV[4].tr}`, '₹5', `₹${COIR_REV[4].tr / 2}`],
  sol: `The slope of the TR line is the price: ${COIR_REV[4].tr} ÷ 5 = ${COIR.p}.`,
}));
Q('ar_pc_mr_equal', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'Under perfect competition, the marginal revenue of a firm equals its average revenue at every output.',
  r: 'Every extra unit is sold at the same market price, so it adds exactly that price to total revenue.',
  sol: 'Both are true, and R explains A: with a constant price, the addition to TR from each unit is the price (MR = P), and revenue per unit is also the price (AR = P).',
}));
Q('tf_pc_tr_rise', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A perfectly competitive bangle seller in an imagined Firozabad market will find that her total revenue reaches a maximum and then falls as she sells more.',
  sol: 'With a constant price, TR rises by the same amount for every extra unit, so it keeps rising in a straight line; it has no maximum. TR falls only when the price must be cut to sell more.',
}));
Q('s_pc_curves', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the TR, AR and MR curves of an imagined Hooghly potato grower who sells at a market price of ₹15 a kg.',
  model: '**AR and MR** are the **same horizontal line** at ₹15, because each kilogram fetches and adds ₹15. **TR** is a **straight line from the origin** rising by ₹15 for each extra kilogram.',
  sol: 'AR = MR horizontal; TR a ray from the origin.',
  scheme: [['AR = MR horizontal at the price', 1], ['TR straight line from the origin', 1]],
}));
Q('s_pc_why_flat', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why an imagined Alappuzha coir-rope maker who tried to sell above the market price of ₹40 would sell nothing at all.',
  model: 'Thousands of sellers offer **identical** coils at ₹40 and buyers have **full knowledge** of prices. If she asks more, buyers simply **switch to other sellers**, so her sales fall to **zero**: her demand is **perfectly elastic** at ₹40.',
  sol: 'Homogeneous product and many sellers make demand perfectly elastic.',
  scheme: [['Identical product, many sellers, full knowledge', 1], ['Buyers switch: perfectly elastic demand', 1]],
}));
Q('s3_coir_schedule', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Alappuzha coir-rope maker sells at the market price shown. Prepare her TR, AR and MR schedule for 1 to 5 coils and state the shape of each curve.\n\n${coirTable()}`,
  model: `**TR:** ${COIR_REV.map((r) => r.tr).join(', ')}; **AR:** ${COIR_REV.map((r) => r.ar).join(', ')}; **MR:** ${COIR_REV.map((r) => r.mr).join(', ')}. AR and MR form **one horizontal line at ₹${COIR.p}**, because she is a price taker and every coil both fetches and adds the same ₹${COIR.p}. TR is a **straight line from the origin** with slope ${COIR.p}; it rises by equal steps and never reaches a maximum.`,
  sol: 'Constant price gives constant AR and MR and a linear TR.',
  scheme: [['TR column', 1], ['AR and MR columns', 1], ['Shapes of the curves', 1]],
}));
Q('l_pc_curves', long({
  t: [2, 3], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare the revenue curves of (i) an imagined Hooghly potato grower selling at a market price and (ii) an imagined Lucknow chikan workshop that must lower its price to sell more kurtas.\n\n(a) Describe the AR and MR curves of each firm and give the reason. [3]\n(b) Describe the TR curve of each firm. [2]',
  model: '(a) (i) The potato grower is a **price taker**: AR = MR = price, a **single horizontal line**, because each kilogram adds the same price. (ii) The workshop faces a **downward-sloping AR** (its demand curve). To sell one more kurta it must cut the price on **all** kurtas, so **MR < AR** and the MR curve lies **below** AR (and falls twice as steeply when AR is a straight line).\n(b) (i) The grower\'s **TR is a straight line from the origin**, rising by the price for each unit. (ii) The workshop\'s **TR rises at a decreasing rate**, reaches a **maximum where MR = 0**, and then **falls** when MR becomes negative.',
  sol: 'Horizontal AR = MR versus downward AR with MR below; linear TR versus inverted-U TR.',
  scheme: [['Perfect competition: AR = MR horizontal', 1], ['Imperfect: AR slopes down, MR below', 1], ['Reason: price cut on all units', 1], ['TR straight line from origin', 1], ['TR rises, peaks at MR = 0, falls', 1]],
}));

// ================================================================ t03 Revenue curves under imperfect competition
Q('m_mr_below_ar', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'An imagined Jaipur blue-pottery studio must lower the price of all its vases to sell one more. As a result its marginal revenue is',
  opts: ['less than its average revenue', 'equal to its average revenue', 'greater than its average revenue', 'always zero'],
  sol: 'The extra vase brings in its price, but the price cut on all the earlier vases is a loss, so the addition to TR (MR) is less than the price (AR).',
}));
Q('m_tr_max_mr', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The total revenue of an imagined Kanchipuram silk seller is at its highest. At this output her marginal revenue is',
  opts: ['zero', 'equal to average revenue', 'at its maximum', 'equal to the price'],
  sol: 'TR stops rising where an extra unit adds nothing, that is, where MR = 0. Beyond it MR is negative and TR falls.',
}));
Q('m_linear_mr_slope', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A monopoly water-tanker supplier in an imagined hill town faces a straight-line AR curve. Its MR curve starts from the same point on the price axis and',
  opts: ['falls twice as steeply as AR', 'falls half as steeply as AR', 'is parallel to AR', 'is horizontal'],
  sol: 'With a straight-line AR = a − bQ, TR = aQ − bQ², so MR = a − 2bQ: same intercept, twice the slope. MR cuts the quantity axis halfway to where AR does.',
}));
Q('m_kurta_mr_neg', mcq({
  t: 3, d: 2, c: 'application',
  stem: `At what output does the marginal revenue of the imagined Lucknow chikan workshop first become negative, given its prices of ₹${KURTA_AR.join(', ')} hundred for 1 to 7 kurtas?`,
  opts: ['7 kurtas', '6 kurtas', '5 kurtas', '4 kurtas'],
  sol: `TR: ${KURTA.map((r) => r.tr).join(', ')}. MR: ${KURTA.map((r) => r.mr).join(', ')}. The first negative MR (${KURTA[6].mr}) is at the 7th kurta.`,
}));
Q('m_monopolistic_ar', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Many cafés in an imagined Pune college area sell slightly different cold coffees. The AR curve of one café is',
  opts: ['downward-sloping and fairly elastic', 'perfectly horizontal', 'vertical', 'upward-sloping'],
  sol: 'Each café\'s product is a little different, so it can raise its price and keep some buyers (AR slopes down), but close substitutes make demand fairly elastic.',
}));
Q('ar_mr_neg_tr', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'A firm facing a downward-sloping demand curve can have a negative marginal revenue.',
  r: 'Average revenue is always positive because the price of a good cannot be negative.',
  sol: 'Both are true, but R does not explain A. MR becomes negative when the loss from cutting the price on earlier units exceeds the price of the extra unit; that average revenue stays positive is true but does not explain why MR turns negative.',
}));
Q('fb_mr_zero', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'When a firm\'s total revenue is at its maximum, its marginal revenue is ___.',
  acc: [['zero', '0', 'nil']],
  sol: 'TR is highest where MR = zero.',
}));
Q('n_kurta_trmax', num({
  t: 3, d: 2, c: 'application', marks: 1, value: KURTA_TRMAX_Q, unit: 'kurtas',
  stem: `The imagined Lucknow chikan workshop can sell 1 to 7 kurtas at prices of ₹${KURTA_AR.join(', ')} hundred. Find the output at which its marginal revenue is zero.`,
  sol: `TR = ${KURTA.map((r) => r.tr).join(', ')}; MR = ${KURTA.map((r) => r.mr).join(', ')}; MR = 0 at ${KURTA_TRMAX_Q} kurtas.`,
}));
Q('s_why_mr_less', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Using an imagined Jaipur blue-pottery studio that cuts its vase price from ₹500 to ₹480 to sell a 5th vase, explain why marginal revenue is less than price.',
  model: `The 5th vase brings in **₹480**, but the price falls by ₹20 on the **4 earlier vases**, a loss of **₹80**. So MR = 480 − 80 = **₹${480 - 80}**, less than the price of ₹480. TR goes from 2,000 to 2,400.`,
  sol: 'Gain from the extra unit minus loss on earlier units.',
  scheme: [['Gain from the extra vase and loss on earlier vases', 1], ['MR = 400 < price 480', 1]],
}));
assert(5 * 480 - 4 * 500 === 400, 'vase mr');
Q('s_imperfect_curves', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the AR and MR curves of a sole cable-TV operator in an imagined small town who must lower his monthly fee to gain more subscribers.',
  model: 'Both curves **slope downward**: to gain subscribers he must **lower the fee**. **MR lies below AR** because the lower fee applies to **all** subscribers, so the extra revenue is less than the fee.',
  sol: 'Downward-sloping AR and MR, with MR below AR.',
  scheme: [['Both curves slope downward', 1], ['MR below AR, with the reason', 1]],
}));
Q('s3_tr_shape', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the shape of the total revenue curve of an imagined Kanchipuram silk seller who must lower her price to sell more sarees, relating each part to marginal revenue.',
  model: '1. At first TR **rises at a decreasing rate**, because **MR is positive but falling**.\n2. TR reaches its **highest point** where **MR = 0**.\n3. After that TR **falls**, because **MR is negative**. So the curve is an **inverted U**.',
  sol: 'Three stages of TR matched with MR.',
  scheme: [['Rising at a decreasing rate: MR positive, falling', 1], ['Maximum: MR zero', 1], ['Falling: MR negative', 1]],
}));
Q('s3_ar_mr_tanker', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined hill-town water-tanker monopolist faces AR = 12 − Q (price in ₹ hundred, Q in tankers a day). Write its TR and MR, and find the output at which TR is greatest.',
  model: `**TR = AR × Q = 12Q − Q²**. MR is the change in TR: **MR = 12 − 2Q** (same intercept, twice the slope of AR). TR is greatest where **MR = 0**, at **Q = 6** tankers, where TR = ${TRc(6)}.`,
  sol: 'TR from AR × Q; MR halves the quantity intercept; MR = 0 at Q = 6.',
  scheme: [['TR = 12Q − Q²', 1], ['MR = 12 − 2Q', 1], ['TR maximum at Q = 6 (TR = 36)', 1]],
}));
Q('l_imperfect_full', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'An imagined hill-town water-tanker monopolist faces AR = 12 − Q (₹ hundred).\n\n(a) Calculate AR, TR and MR at Q = 2, 6 and 8. [3]\n(b) Use the figures to explain why MR lies below AR and how TR behaves. [2]',
  model: `(a) **Q = 2:** AR = ${ARc(2)}, TR = ${TRc(2)}, MR = ${MRc(2)}. **Q = 6:** AR = ${ARc(6)}, TR = ${TRc(6)}, MR = ${MRc(6)}. **Q = 8:** AR = ${ARc(8)}, TR = ${TRc(8)}, MR = ${MRc(8)}. (TR = 12Q − Q², MR = 12 − 2Q.)\n(b) At every output **MR < AR** (${MRc(2)} < ${ARc(2)}, ${MRc(6)} < ${ARc(6)}), because the price must be cut on **all** tankers to sell one more. TR **rises** while MR is positive, **peaks at ${TRc(6)} when MR = 0** (Q = 6), and **falls** to ${TRc(8)} when MR turns negative.`,
  sol: 'Values from the equations, then the reasons.',
  scheme: [['Values at Q = 2', 1], ['Values at Q = 6', 1], ['Values at Q = 8', 1], ['MR below AR with reason', 1], ['TR rises, peaks at MR = 0, falls', 1]],
}));
assert(TRc(2) === 20 && MRc(2) === 8 && TRc(8) === 32 && MRc(8) === -4, 'tanker values');

// ================================================================ t04 Producer's equilibrium: TR–TC approach
Q('m_trtc_condition', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'By the TR–TC approach, an imagined Bhagalpur silk-yarn unit is in equilibrium at the output where',
  opts: ['the positive gap between total revenue and total cost is the largest', 'total revenue is at its maximum', 'total cost is at its minimum', 'total revenue equals total cost'],
  sol: 'Profit = TR − TC, so the profit-maximising output is where TR exceeds TC by the most. TR = TC is the break-even point, with zero profit.',
}));
Q('m_trtc_tee', mcq({
  t: 4, d: 2, c: 'application',
  stem: `An imagined Tiruppur T-shirt unit sells at ₹${TEE.p} hundred a batch. With its total costs of ₹${TEE.tc.join(', ')} hundred for 0 to 6 batches, its largest profit is`,
  opts: [`₹${eqTRTC(TEE_P).max} hundred`, `₹${TEE_P[6].profit} hundred`, `₹${TEE_P[3].profit} hundred`, `₹${TEE_P[6].tr} hundred`],
  sol: `Profit = 30Q − TC: ${TEE_P.map((r) => r.profit).join(', ')}. The largest is ${eqTRTC(TEE_P).max} (at 4 and 5 batches).`,
}));
Q('m_breakeven', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'On the TR–TC diagram of an imagined Kota coaching-notes printer, the points where the TR and TC curves cross show',
  opts: ['break-even outputs with zero profit', 'the profit-maximising output', 'the output of maximum total revenue', 'the shut-down output'],
  sol: 'Where TR = TC, profit is zero: these are break-even points. Profit is greatest where TR lies furthest above TC.',
}));
Q('m_parallel_slopes', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'At the output where the gap between TR and TC is greatest for an imagined Rajkot engineering firm, the slopes of the two curves are',
  opts: ['equal, so MR equals MC', 'such that TR is steeper, so MR is greater than MC', 'such that TC is steeper, so MC is greater than MR', 'both zero'],
  sol: 'The vertical gap stops widening where the curves are parallel. The slope of TR is MR and the slope of TC is MC, so at the largest gap MR = MC: both approaches give the same output.',
}));
Q('ar_trmax_not_profit', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'A firm does not necessarily maximise profit at the output where its total revenue is the highest.',
  r: 'Profit depends on total cost as well as total revenue, and costs keep rising with output.',
  sol: 'Both are true, and R explains A: at the TR maximum the extra cost of the last units still has to be paid, so the largest TR − TC gap usually lies at a smaller output.',
}));
Q('n_tee_profit', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: TEE_P[5].profit, unit: '₹ hundred',
  stem: `An imagined Tiruppur T-shirt unit sells 5 batches at ₹${TEE.p} hundred a batch and its total cost is ₹${TEE.tc[5]} hundred. Find its profit (in ₹ hundred).`,
  sol: `TR = 30 × 5 = ${TEE_P[5].tr}; profit = ${TEE_P[5].tr} − ${TEE.tc[5]} = ${TEE_P[5].profit}.`,
}));
Q('s_trtc_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the condition of producer\'s equilibrium under the TR–TC approach, illustrating it with an imagined Bhagalpur silk-yarn unit.',
  model: 'The unit is in equilibrium where **TR − TC (profit) is maximum**. If at 40 kg it earns ₹9,000 more than its cost and at every other output less, **40 kg** is its equilibrium output; it has **no reason to change** output.',
  sol: 'Maximum TR − TC with an example.',
  scheme: [['Maximum positive TR − TC', 1], ['Illustration', 1]],
}));
Q('s3_trtc_tee', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Tiruppur T-shirt unit sells at ₹${TEE.p} hundred a batch. Using the total costs below, find its equilibrium output by the TR–TC approach.\n\n${teeTable()}`,
  model: `**TR = 30Q:** ${TEE_P.map((r) => r.tr).join(', ')}. **Profit = TR − TC:** ${TEE_P.map((r) => r.profit).join(', ')}. Profit is greatest (**${eqTRTC(TEE_P).max}**) at **4 and 5 batches**; the unit produces **5 batches**, where the 5th batch adds as much to revenue (30) as to cost (30) and the next one would cut profit.`,
  sol: 'TR, profit, then the largest gap.',
  scheme: [['TR column', 1], ['Profit column', 1], ['Equilibrium at 5 batches with reason', 1]],
}));
Q('s3_trtc_diagram', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe the TR–TC diagram of an imagined Rajkot pump maker under perfect competition and show how the equilibrium output is found on it.',
  model: '1. **TR** is a straight line from the origin; **TC** starts above the origin (at **TFC**), first rising slowly and then steeply.\n2. TC lies above TR at small and large outputs (**losses**) and below it in between; the crossings are **break-even points**.\n3. Equilibrium is the output where **TR lies furthest above TC**, which is where a line parallel to TR **touches TC** (MR = MC).',
  sol: 'Shapes of TR and TC, break-even points, largest gap.',
  scheme: [['Shapes of TR and TC', 1], ['Losses and break-even points', 1], ['Largest gap identified as equilibrium', 1]],
}));
Q('l_trtc_full', long({
  t: [4, 5], d: 4, c: 'application', marks: 5, wl: L5,
  stem: `An imagined Lucknow chikan workshop can sell kurtas at the prices below, at the total costs shown.\n\n${kurtaCostTable()}\n\n(a) Calculate TR and profit for 1 to 6 kurtas and find the equilibrium output by the TR–TC approach. [3]\n(b) Confirm the answer with the MR–MC approach. [2]`,
  model: `(a) **TR:** ${KURTA_P.slice(1).map((r) => r.tr).join(', ')}. **Profit:** ${KURTA_P.slice(1).map((r) => r.profit).join(', ')} (₹ hundred). The largest profit, **${eqTRTC(KURTA_P).max}**, is at **${KURTA_EQ} kurtas**.\n(b) **MR:** ${KURTA_P.slice(1).map((r) => r.mr).join(', ')}; **MC:** ${KURTA_P.slice(1).map((r) => r.mc).join(', ')}. For the 3rd kurta **MR (${KURTA_P[3].mr}) > MC (${KURTA_P[3].mc})**, so producing it adds to profit; for the 4th **MR (${KURTA_P[4].mr}) < MC (${KURTA_P[4].mc})**, so it would cut profit. With **MC rising** and cutting MR from below between the 3rd and 4th kurtas, equilibrium is **${KURTA_EQ} kurtas**, matching (a).`,
  sol: 'Largest TR − TC, then MR ≥ MC up to the 3rd kurta.',
  scheme: [['TR column', 1], ['Profit column', 1], ['Equilibrium at 3 by TR–TC', 1], ['MR and MC compared unit by unit', 1], ['Same equilibrium by MR–MC', 1]],
}));

// ================================================================ t05 Producer's equilibrium: MR–MC approach
Q('m_mrmc_conditions', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'The two conditions for a producer\'s equilibrium under the MR–MC approach are',
  opts: ['MR = MC, and MC cuts MR from below (MC rising)', 'MR = MC, and MC is falling', 'AR = AC, and MC is constant', 'TR is maximum, and MC = 0'],
  sol: 'Profit is maximised where MR = MC and, beyond that output, MC exceeds MR; this needs MC to be rising (cutting MR from below).',
}));
Q('m_mr_gt_mc', mcq({
  t: 5, d: 2, c: 'analysis',
  stem: 'At its present output, the marginal revenue of an imagined Moradabad brass-lamp unit is ₹90 and its marginal cost is ₹70. To raise profit it should',
  opts: ['produce more, because the next unit adds more to revenue than to cost', 'produce less, because it is making a loss on the last unit', 'keep output unchanged, because it is in equilibrium', 'shut down at once'],
  sol: 'When MR > MC, an extra unit adds more to revenue than to cost, so profit rises with more output until MR = MC.',
}));
Q('m_bag_two_points', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: `An imagined Jodhpur leather-bag unit sells at ₹${BAG.p} a bag. Its marginal costs for bags 1 to 6 are ₹${BAG.mc.join(', ')}. Its equilibrium output is`,
  opts: [`${BAG_EQ} bags`, '1 bag', '3 bags', '6 bags'],
  sol: `MR = 25 equals MC at the 1st bag (MC falling from 25 to 18) and at the ${BAG_EQ}th bag (MC rising from 20 to 25 and then 32). Only the second meets both conditions, so ${BAG_EQ} bags. Profit at 1 bag is ${BAG_P[1].profit}; at ${BAG_EQ} bags it is ${BAG_P[BAG_EQ].profit}.`,
}));
Q('m_mc_falling_not_eq', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'An imagined Bareilly furniture maker finds that MR = MC at an output where MC is still falling. If he stops there,',
  opts: ['he gives up profit, because producing more adds more to revenue than to cost', 'his profit is the largest possible', 'his total revenue is the largest possible', 'his loss cannot be reduced'],
  sol: 'When MC is falling at MR = MC, the next units have MC below MR, so producing more raises profit. Profit is maximised only where MC rises above MR.',
}));
Q('m_pc_eq_price', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'A perfectly competitive Hooghly potato grower is in equilibrium. At her equilibrium output, marginal cost equals',
  opts: ['the market price', 'average fixed cost', 'zero', 'total revenue divided by total cost'],
  sol: 'Under perfect competition MR = AR = price, so the condition MR = MC becomes MC = price.',
}));
Q('ar_mc_rising', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'MR = MC is not by itself enough for a producer to be in equilibrium.',
  r: 'If MC is falling where it equals MR, producing more units would still add more to revenue than to cost.',
  sol: 'Both are true, and R explains A: at an MR = MC point with MC falling, MC goes below MR for the next units, so profit can still be raised. The second condition, MC rising, rules this out.',
}));
Q('ar_mr_zero_eq', ar({
  t: 5, d: 3, c: 'evaluation', key: 'd',
  a: 'A profit-maximising firm under imperfect competition always produces where its marginal revenue is zero.',
  r: 'A firm maximises profit where its total cost is at a minimum.',
  sol: 'Both are false. MR = 0 maximises total revenue, not profit; profit needs MR = MC, and MC is normally positive. Total cost rises with output, so it is lowest at zero output, which is not where profit is maximised.',
}));
Q('tf_mr_mc_loss', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If an imagined Siliguri tea packer produces a unit whose marginal cost exceeds its marginal revenue, its profit falls.',
  sol: 'That unit adds more to cost than to revenue, so total profit is reduced by the difference.',
}));
Q('n_bag_eq', num({
  t: 5, d: 3, c: 'application', marks: 1, value: BAG_EQ, unit: 'bags',
  stem: `An imagined Jodhpur leather-bag unit sells every bag at ₹${BAG.p}. Its marginal costs are given below. Find its equilibrium output.\n\n${bagTable()}`,
  sol: `MR = 25 throughout. MR = MC at the 1st bag (MC then falls) and at the ${BAG_EQ}th bag (MC then rises to 32). Equilibrium = ${BAG_EQ} bags.`,
}));
Q('ord_mrmc_steps', ord({
  t: 5, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps an imagined Surat textile trader should follow to find his equilibrium output from revenue and cost schedules by the MR–MC approach.',
  items: [
    'Work out MR and MC for each unit from the TR and TC columns',
    'Find the outputs where MR equals MC',
    'Check whether MC is rising (greater than MR for the next unit)',
    'Choose that output as the equilibrium',
  ],
  sol: 'MR and MC first, then the MR = MC outputs, then the second condition, then the choice.',
}));
Q('s_two_conditions', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two conditions of producer\'s equilibrium by the MR–MC approach for an imagined Moradabad brass-lamp unit, with one reason for each.',
  model: '1. **MR = MC**: if MR > MC more output adds profit; if MR < MC less output adds profit.\n2. **MC must be rising** (MC cuts MR from below), so that **after** that output **MC > MR** and further production lowers profit.',
  sol: 'Both conditions with reasons.',
  scheme: [['MR = MC with reason', 1], ['MC rising with reason', 1]],
}));
Q('s_mr_lt_mc', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined Kota coaching-notes printer is producing where MR = ₹6 and MC = ₹9 a booklet. Should it change its output? Explain.',
  model: 'Yes, it should **reduce output**. The last booklet adds **₹9 to cost** but only **₹6 to revenue**, so it **lowers profit by ₹3**. Cutting output until **MR = MC** (with MC rising) raises profit.',
  sol: 'MR < MC: produce less.',
  scheme: [['Reduce output', 1], ['Reason: last unit adds more to cost than revenue', 1]],
}));
Q('s3_mrmc_tee', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Tiruppur T-shirt unit sells at ₹${TEE.p} hundred a batch. From its total costs below, find its equilibrium output by the MR–MC approach.\n\n${teeTable()}`,
  model: `**MR = ${TEE.p}** for every batch. **MC:** ${TEE_P.slice(1).map((r) => r.mc).join(', ')}. MR = MC at the **${TEE_EQ}th batch** (MC = 30), and MC is **rising** there (15 → 30 → 40), so **${TEE_EQ} batches** is the equilibrium; the 6th batch would add 40 to cost but only 30 to revenue.`,
  sol: 'MC from TC; MR = MC = 30 with MC rising.',
  scheme: [['MC column', 1], ['MR = MC at 5 batches', 1], ['MC rising checked', 1]],
}));
Q('s3_two_crossings', short({
  t: 5, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: `The MC curve of an imagined Rajkot pump maker, MC = (Q − 5)² + 14, cuts its horizontal MR line at ₹${Pc} twice, at Q = 1 and Q = 9. Evaluate which point is the equilibrium.`,
  model: `At **Q = 1**, MC is **falling** (it falls to 14 at Q = 5), so for the next units **MC < MR**: producing more **adds profit**; this point is a profit **minimum**. At **Q = 9**, MC is **rising**: beyond it **MC > MR**, so more output cuts profit. **Q = 9** is the equilibrium, where profit is **${PROFITc(9)}** against ${(PROFITc(1)).toFixed(2)} at Q = 1.`,
  sol: 'Second-order condition decides between the two crossings.',
  scheme: [['Q = 1: MC falling, not equilibrium', 1], ['Q = 9: MC rising, equilibrium', 1], ['Profit comparison or reasoning', 1]],
}));
Q('l_mrmc_full', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `An imagined Jodhpur leather-bag unit sells every bag at ₹${BAG.p}; its fixed cost is ₹${BAG.tfc} and its marginal costs are shown.\n\n${bagTable()}\n\n(a) Identify the outputs where MR = MC and explain which is the equilibrium. [3]\n(b) Calculate the profit at each of these outputs to support your answer. [2]`,
  model: `(a) MR = AR = **25**. MR = MC at the **1st bag** and the **${BAG_EQ}th bag**. At the 1st bag MC is **falling** (25 → 18), so the next bags add more to revenue than to cost; it is **not** an equilibrium. At the ${BAG_EQ}th bag MC is **rising** (20 → 25 → 32), so the 6th bag would add 32 to cost but only 25 to revenue: **${BAG_EQ} bags** is the equilibrium.\n(b) TC = 10 + sum of MCs: ${BAG_TC.slice(1).join(', ')}; TR = 25Q. Profit at **1 bag = ${BAG_P[1].profit}**; at **${BAG_EQ} bags = ${BAG_P[BAG_EQ].profit}**, the highest in the schedule (profits ${BAG_P.slice(1).map((r) => r.profit).join(', ')}).`,
  sol: 'Two equalities; the second-order condition; profit check.',
  scheme: [['Both MR = MC outputs found', 1], ['1st bag rejected: MC falling', 1], ['5 bags accepted: MC rising', 1], ['TC and TR worked out', 1], ['Profit comparison', 1]],
}));
Q('l_mrmc_diagram', long({
  t: [2, 5], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'An imagined Rajkot pump maker sells at a market price of ₹30 (₹ thousand a pump) and its MC curve is U-shaped.\n\n(a) Describe a diagram showing its producer\'s equilibrium by the MR–MC approach, marking two points where MC = MR. [3]\n(b) Explain why only one of the points is the equilibrium. [2]',
  model: '(a) Output on the x-axis and revenue or cost on the y-axis. **AR = MR** is a **horizontal line at 30**. The **U-shaped MC** cuts it twice: at a small output **A**, while MC is **falling**, and at a larger output **B**, while MC is **rising**. Drop a line from **B** to the x-axis to show the **equilibrium output**.\n(b) At **A**, MC is falling, so for the units just after A **MC < MR** and producing them **adds profit**: A is not an equilibrium. At **B**, MC is rising, so beyond B **MC > MR** and more output **cuts profit**; both conditions hold, so **B** is the equilibrium.',
  sol: 'Horizontal MR, U-shaped MC, two crossings; second-order condition.',
  scheme: [['Axes and horizontal AR = MR', 1], ['U-shaped MC cutting twice', 1], ['Equilibrium output marked at B', 1], ['A rejected with reason', 1], ['B accepted with reason', 1]],
}));

// ================================================================ ISC paper-style items (4-mark, 8-mark) for the bank
Q('q4_tanker_revenue', short({
  t: [1, 3], d: 3, c: 'application', marks: 4, wl: S4,
  stem: 'Answer both parts about an imagined hill-town water-tanker monopolist facing AR = 12 − Q (₹ hundred). [2 + 2]\n\n(i) Calculate TR and MR when it sells 3 and 4 tankers a day.\n(ii) Explain, using your answers, why its MR is less than its AR.',
  model: `(i) TR = 12Q − Q²: **${TRc(3)}** at 3 and **${TRc(4)}** at 4; MR of the 4th tanker = ${TRc(4)} − ${TRc(3)} = **${TRc(4) - TRc(3)}** (the formula MR = 12 − 2Q gives the slope ${MRc(4)} at Q = 4).\n(ii) The 4th tanker sells at **${ARc(4)}**, but the price on the first three falls from ${ARc(3)} to ${ARc(4)}, a loss of **3**. So MR = ${ARc(4)} − 3 = **${ARc(4) - 3}**, below AR.`,
  sol: 'TR and MR from AR; gain minus loss.',
  scheme: [['(i) TR at 3 and 4', 1], ['(i) MR of the 4th tanker', 1], ['(ii) Price of the extra tanker', 1], ['(ii) Loss on earlier tankers, MR < AR', 1]],
}));
assert(TRc(3) === 27 && TRc(4) === 32 && TRc(4) - TRc(3) === 5 && ARc(4) - 3 === 5, 'tanker 4-mark');
Q('q4_pc_vs_imperfect', short({
  t: [2, 3], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) Compare the AR curve of an imagined Hooghly potato grower with that of the only sweet shop in an imagined small Odisha town.\n(ii) Explain why the TR curve of the grower has no maximum while the shop\'s does.',
  model: '(i) The grower is a **price taker**: her AR is a **horizontal line** at the market price. The sweet shop must **lower its price to sell more**, so its AR **slopes downward**.\n(ii) The grower\'s **MR equals the constant price**, always positive, so TR **keeps rising**. The shop\'s **MR falls** and becomes **zero and then negative**, so its TR **peaks where MR = 0** and then falls.',
  sol: 'Horizontal versus downward AR; MR sign explains TR.',
  scheme: [['(i) Horizontal AR for the grower', 1], ['(i) Downward AR for the shop', 1], ['(ii) Constant positive MR: TR keeps rising', 1], ['(ii) MR zero then negative: TR peaks', 1]],
}));
Q('q4_tee_equilibrium', short({
  t: [4, 5], d: 4, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about an imagined Tiruppur T-shirt unit that sells at ₹${TEE.p} hundred a batch. [2 + 2]\n\n${teeTable()}\n\n(i) Find the profit-maximising output by the TR–TC approach.\n(ii) Show that the MR–MC approach gives the same output.`,
  model: `(i) Profit = 30Q − TC: ${TEE_P.map((r) => r.profit).join(', ')}. The highest profit, **${eqTRTC(TEE_P).max}**, occurs at **4 and 5 batches**; the unit settles at **5**, since the 5th batch adds as much to revenue as to cost.\n(ii) MC: ${TEE_P.slice(1).map((r) => r.mc).join(', ')}. **MR = MC = 30 at the 5th batch**, and MC then **rises to 40**, above MR. So equilibrium is **5 batches** by both approaches.`,
  sol: 'Largest gap and MR = MC with MC rising.',
  scheme: [['(i) Profit column', 1], ['(i) Equilibrium at 5 batches', 1], ['(ii) MC column', 1], ['(ii) MR = MC with MC rising at 5', 1]],
}));
Q('l8_revenue_curves', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) An imagined Alappuzha coir-rope maker sells at ₹${COIR.p} a coil. Prepare her TR, AR and MR for 1 to 4 coils and describe the three curves.\n(ii) An imagined Lucknow chikan workshop can sell 1 to 7 kurtas at ₹${KURTA_AR.join(', ')} hundred. Calculate its TR and MR and explain the shape of its TR curve.`,
  model: `(i) **TR:** ${COIR_REV.slice(0, 4).map((r) => r.tr).join(', ')}; **AR = MR = ${COIR.p}** at every output. She is one of many sellers of an identical product, so she accepts the market price and can sell any quantity at it. AR and MR therefore form **one horizontal line** at ₹${COIR.p}. TR is a **straight line from the origin** with slope ${COIR.p}, because each coil adds the same price; it has no maximum.\n(ii) **TR:** ${KURTA.map((r) => r.tr).join(', ')}; **MR:** ${KURTA.map((r) => r.mr).join(', ')}. TR **rises at a decreasing rate** while MR is positive and falling, **peaks at ${KURTA[5].tr}** where **MR = 0** (6 kurtas), and **falls** when MR turns **negative** at the 7th kurta: an **inverted U**. The workshop must lower the price on all kurtas to sell one more, which is why MR lies below AR and keeps falling.`,
  sol: 'Perfect competition schedule and curves; imperfect competition schedule and TR shape.',
  scheme: [['(i) TR values', 1], ['(i) AR = MR values', 1], ['(i) Horizontal AR = MR', 1], ['(i) TR ray from origin', 1], ['(ii) TR values', 1], ['(ii) MR values', 1], ['(ii) TR peaks where MR = 0', 1], ['(ii) Falls when MR negative', 1]],
}));
Q('l8_equilibrium', long({
  t: [4, 5], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Using the Lucknow chikan workshop's prices and total costs below, find its equilibrium output by the MR–MC approach and state its profit.\n\n${kurtaCostTable()}\n\n(ii) Explain, with a described diagram, why the output where the gap between TR and TC is greatest is the same output where MR = MC.`,
  model: `(i) **MR:** ${KURTA_P.slice(1).map((r) => r.mr).join(', ')}; **MC:** ${KURTA_P.slice(1).map((r) => r.mc).join(', ')}. MR exceeds MC up to the **3rd kurta** (60 > 40) and falls below it at the 4th (40 < 50), with MC **rising**, so equilibrium is **${KURTA_EQ} kurtas**. Profit = ${KURTA_P[3].tr} − ${KURTA_P[3].tc} = **${KURTA_P[3].profit}** (₹ hundred), the highest in the schedule.\n(ii) Draw the inverted-U **TR** and the **TC** curve starting at TFC. The vertical gap TR − TC is profit. While **TR is steeper than TC** (MR > MC), the gap **widens**; once **TC is steeper** (MC > MR), it **narrows**. The gap is greatest where the **slopes are equal**, where a tangent to TC is **parallel** to the tangent to TR, that is where **MR = MC** with MC rising. So both approaches give the same output.`,
  sol: 'MR–MC from the schedule; slopes of TR and TC.',
  scheme: [['(i) MR column', 1], ['(i) MC column', 1], ['(i) Equilibrium at 3 with reason', 1], ['(i) Profit 40', 1], ['(ii) Diagram described', 1], ['(ii) Gap widens while MR > MC', 1], ['(ii) Gap narrows when MC > MR', 1], ['(ii) Greatest where slopes are equal: MR = MC', 1]],
}));

// ================================================================ case-based
Q('cb_coir_cooperative', caseQ({
  t: [1, 2], d: 2, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined account of an Alappuzha coir cooperative and answer the questions that follow. *(Written by SOYL for practice; the cooperative and figures are imagined.)*',
  passage: `**Notes from a meeting of an imagined coir-rope cooperative, Alappuzha**\n\nThe secretary reported that the wholesale market price of a coil had held at ₹${COIR.p} all season. Member Leela sold 5 coils a day; her neighbour Thomas sold 3. "If I ask ₹45," said Thomas, "the traders just walk to the next stall." The cooperative is asking whether members should each try to raise prices.`,
  parts: [
    child('a', num({ t: 1, d: 1, c: 'understanding', marks: 1, value: COIR_REV[4].tr, unit: '₹', stem: 'What is Leela\'s total revenue in a day?', sol: `TR = 40 × 5 = ${COIR_REV[4].tr}.` })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'What is the marginal revenue of Thomas\'s 3rd coil?', model: `**₹${COIR.p}**: under a constant price every coil adds the price to TR.`, sol: 'MR = price under perfect competition.', scheme: [['MR = 40', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate whether a member should raise her price above ₹40, using the shape of her AR curve.', model: 'She should **not**. Coils are **identical** and traders can buy from many sellers, so her AR curve is **horizontal (perfectly elastic)** at ₹40: any higher price makes her sales **fall to zero**, as Thomas found.', sol: 'Perfectly elastic AR: no gain from raising price.', scheme: [['Horizontal AR identified', 1], ['Reasoned conclusion', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Describe the TR, AR and MR curves of a member using the figures in the case.', model: `**AR = MR**: one **horizontal line at ₹${COIR.p}**. **TR**: a straight line from the origin rising by ₹${COIR.p} a coil (₹120 at 3 coils, ₹200 at 5).`, sol: 'AR = MR horizontal; TR a ray.', scheme: [['AR = MR horizontal at 40', 1], ['TR straight line with figures', 1]] }),
    ]),
  ],
}));
Q('cb_kurta_workshop', caseQ({
  t: [3, 4, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined planning notes of a Lucknow chikan workshop and answer the questions that follow. *(Imagined figures, written by SOYL for practice.)*',
  passage: `**Planning notes, an imagined chikan-kurta workshop in Lucknow (₹ hundred)**\n\n${kurtaCostTable()}\n\nThe owner, Ruksana, wants to "sell as many kurtas as the market will take before revenue stops growing". Her son, a commerce student, says she should instead look at what each extra kurta adds to revenue and to cost.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: KURTA_TRMAX_Q, unit: 'kurtas', stem: 'Up to what output does total revenue keep growing (where MR becomes zero)? Use the prices up to 6 kurtas.', sol: `TR: ${KURTA.slice(0, 6).map((r) => r.tr).join(', ')}; MR = 0 at the ${KURTA_TRMAX_Q}th kurta.` })),
    child('b', num({ t: 5, d: 3, c: 'application', marks: 1, value: KURTA_EQ, unit: 'kurtas', stem: 'What output does her son\'s rule (MR and MC) recommend?', sol: `MR: ${KURTA_P.slice(1).map((r) => r.mr).join(', ')}; MC: ${KURTA_P.slice(1).map((r) => r.mc).join(', ')}; MR ≥ MC up to the 3rd kurta, MR < MC from the 4th: ${KURTA_EQ}.` })),
    child('c', short({ t: [4, 5], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate Ruksana\'s plan against her son\'s, using the profits at their outputs.', model: `At **6 kurtas** (her plan) profit is **${KURTA_P[6].profit}**; at **${KURTA_EQ} kurtas** (his rule) it is **${KURTA_P[3].profit}**. Her plan maximises **revenue**, not profit: the last kurtas add **more to cost than to revenue**. The son\'s plan is better.`, sol: 'Compare profits at 6 and 3.', scheme: [['Profits at both outputs', 1], ['Judgement with reason', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the workshop should not make a 4th kurta.', model: `The 4th kurta adds **${KURTA_P[4].mr} to revenue** but **${KURTA_P[4].mc} to cost**, so it **lowers profit** by ${KURTA_P[4].mc - KURTA_P[4].mr}; profit falls from ${KURTA_P[3].profit} to ${KURTA_P[4].profit}.`, sol: 'MR < MC for the 4th kurta.', scheme: [['MR and MC of the 4th kurta', 1], ['Profit falls', 1]] }),
    ]),
  ],
}));
Q('cb_bag_unit', caseQ({
  t: 5, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined conversation in a Jodhpur leather-bag unit and answer the questions that follow. *(Imagined figures, written by SOYL for practice.)*',
  passage: `**An imagined leather-bag unit in Jodhpur**\n\nBags sell at a fixed market price of ₹${BAG.p}. The manager notes the cost of each extra bag: ₹${BAG.mc.join(', ')} for bags 1 to 6. "The very first bag already costs exactly what it sells for," he says, "so one bag a day must be our best output." The accountant disagrees.`,
  parts: [
    child('a', short({ t: 5, d: 2, c: 'understanding', marks: 1, stem: 'At which two outputs is MR equal to MC?', model: `At the **1st** and the **${BAG_EQ}th** bag (both ₹25).`, sol: 'MR = 25 = MC twice.', scheme: [['1st and 5th bags', 1]] })),
    child('b', num({ t: 5, d: 3, c: 'application', marks: 1, value: BAG_P[BAG_EQ].profit, unit: '₹', stem: `Given a fixed cost of ₹${BAG.tfc}, what is the profit at ${BAG_EQ} bags?`, sol: `TC = 10 + ${BAG.mc.slice(0, 5).join(' + ')} = ${BAG_TC[5]}; TR = 125; profit = ${BAG_P[5].profit}.` })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the manager\'s claim that one bag a day is the best output.', model: `He is **wrong**. At the 1st bag MC is **falling** (25 → 18), so the next bags add **more to revenue than to cost**; profit rises from ${BAG_P[1].profit} to **${BAG_P[BAG_EQ].profit}** at ${BAG_EQ} bags, where MC is **rising**.`, sol: 'Second-order condition rejects the first equality.', scheme: [['MC falling at 1 bag', 1], ['Better output with profit evidence', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the unit should not make a 6th bag.', model: `The 6th bag costs **₹32** extra but brings only **₹25**, so it **cuts profit by ₹7** (from ${BAG_P[5].profit} to ${BAG_P[6].profit}).`, sol: 'MC > MR for the 6th bag.', scheme: [['MC 32 against MR 25', 1], ['Profit falls by 7', 1]] }),
    ]),
  ],
}));
