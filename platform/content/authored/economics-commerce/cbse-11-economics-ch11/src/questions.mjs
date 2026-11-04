// CBSE 11 Economics, ch11 The Theory of the Firm under Perfect Competition: question bank. Every farm, candle maker, pottery, kiln and
// stall is imagined and written for this chapter; no real statistics are used. Every revenue, cost, profit, supply and elasticity figure
// is computed from the imagined schedules with stats.mjs (marginal, average, elasticitySupply) or plain code. The laws that relate them
// are asserted on the discrete schedules (AR = MR = price, TR straight from the origin, profit maximum where price equals a rising
// marginal cost, shut-down price = minimum AVC, break-even price = minimum AC, firm supply = MC above minimum AVC, market supply = sum
// of firms), and every figure written in prose is pinned with check().
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { rnd, check, marginal, average, elasticitySupply } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const J = (a) => a.join(', ');
export const inr = (x) => `Rs ${x.toLocaleString('en-IN')}`;
const same = (a, b) => rnd(a - b, 9) === 0;
const r2 = (x) => rnd(x, 2);

// ---------------------------------------------------------------- revenue schedules (computed, asserted)
/** Revenue schedule of a price taker: selling price p, quantities qs[0..n] (qs[0] = 0). Index = position in qs. */
export function revenue(p, qs, what) {
  const tr = qs.map((q) => p * q);
  const mr = [null, ...marginal(tr)];
  const arr = average(tr, qs);
  for (let i = 1; i < qs.length; i++) {
    if (!same(arr[i], p)) throw new Error(`${what}: AR differs from price at ${qs[i]}`);
    if (!same(mr[i] / (qs[i] - qs[i - 1]), p)) throw new Error(`${what}: MR differs from price at ${qs[i]}`);
  }
  if (tr[0] !== 0) throw new Error(`${what}: TR does not start at the origin`);
  const slope = tr[1] / qs[1];
  qs.forEach((q, i) => { if (!same(tr[i], slope * q)) throw new Error(`${what}: TR is not a straight line through the origin`); });
  return { p, q: qs, n: qs.length - 1, tr, mr, ar: arr };
}
// 1. Sukhdev's wheat farm in the imagined village of Ratanpur: price Rs 2,000 a quintal; quintals sold.
export const WF = revenue(2000, [0, 1, 2, 3, 4, 5, 6], "Sukhdev's wheat farm");
export const WF2 = revenue(2500, [0, 1, 2, 3, 4, 5, 6], "Sukhdev's wheat farm at the higher price");
check(WF.tr[4], 8000, 0, 'wheat TR of four quintals');
check(WF.mr[5], 2000, 0, 'wheat MR of the fifth quintal');
check(WF2.tr[6], 15000, 0, 'wheat TR of six quintals at Rs 2,500');
// 2. Kamla's onion plot (imagined): price Rs 18 a kg; kilograms sold.
export const ON = revenue(18, [0, 10, 20, 30, 40], "Kamla's onion plot");
check(ON.tr[3], 540, 0, 'onion TR of 30 kg');
check(ON.mr[2], 180, 0, 'onion revenue added by the second ten kilograms');

// ---------------------------------------------------------------- cost schedules (computed, asserted)
/** Short-run cost schedule from total fixed cost TFC and total variable cost tvc[0..n] (tvc[0] = 0). */
export function costs(TFC, tvc, what, { avcTie = false, acTie = false } = {}) {
  const n = tvc.length - 1;
  const q = tvc.map((_, i) => i);
  const tc = tvc.map((v) => v + TFC);
  const mc = [null, ...marginal(tc)];
  const mcV = [null, ...marginal(tvc)];
  const avc = average(tvc, q);
  const ac = average(tc, q);
  for (let i = 1; i <= n; i++) if (!same(mc[i], mcV[i])) throw new Error(`${what}: MC from TC differs from MC from TVC at ${i}`);
  const cut = (avg, name) => {
    for (let i = 2; i <= n; i++) {
      const d = Math.sign(rnd(avg[i] - avg[i - 1], 9));
      const e = Math.sign(rnd(mc[i] - avg[i - 1], 9));
      if (d !== e) throw new Error(`${what}: ${name} and MC disagree at ${i}`);
    }
    const lo = Math.min(...avg.slice(1));
    return { lo, minAt: q.filter((i) => i >= 1 && same(avg[i], lo)), meet: q.filter((i) => i >= 2 && same(mc[i], avg[i - 1])) };
  };
  const a = cut(avc, 'AVC');
  const c = cut(ac, 'AC');
  if (avcTie && !a.meet.some((i) => same(mc[i], a.lo))) throw new Error(`${what}: MC does not equal minimum AVC`);
  if (acTie && !c.meet.some((i) => same(mc[i], c.lo))) throw new Error(`${what}: MC does not equal minimum AC`);
  return { n, q, TFC, tvc, tc, mc, avc, ac, avcLo: a.lo, avcMin: a.minAt, avcMeetQ: a.meet.find((i) => same(mc[i], a.lo)), acLo: c.lo, acMin: c.minAt, acMeetQ: c.meet.find((i) => same(mc[i], c.lo)) };
}

/** Profit-maximising output at a given price, with every check made on the discrete schedule. */
export function equilibrium(c, P, what) {
  const profit = c.q.map((i) => P * i - c.tc[i]);
  const tr = c.q.map((i) => P * i);
  // MR (= price) equals MC, with MC rising: the largest output whose marginal cost does not exceed the price.
  const qStar = Math.max(...c.q.filter((i) => i >= 1 && c.mc[i] <= P));
  if (qStar < c.n && !(c.mc[qStar + 1] > P)) throw new Error(`${what}: MC does not rise above the price after ${qStar}`);
  const best = profit[qStar];
  const exact = c.mc[qStar] === P;
  if (exact && qStar >= 2 && profit[qStar - 1] !== profit[qStar]) throw new Error(`${what}: the unit with MC = price should add nothing to profit`);
  const shut = P < c.avcLo;
  // At or above minimum AVC the MR = MC output has the largest profit of all positive outputs and loses no more than the fixed cost;
  // below it, the MR = MC output (still a local maximum) loses more than the fixed cost, so zero output is better.
  const bestPos = Math.max(...profit.slice(1));
  const maxAt = c.q.filter((i) => i >= 1 && profit[i] === bestPos);
  if (!shut && !maxAt.includes(qStar)) throw new Error(`${what}: profit is not maximum at the MR = MC output ${qStar} for price ${P}`);
  if (shut && !(best < -c.TFC)) throw new Error(`${what}: price ${P} is below minimum AVC but operating does not lose more than the fixed cost`);
  if (!shut && !(best >= -c.TFC)) throw new Error(`${what}: price ${P} is at least minimum AVC but operating loses more than the fixed cost`);
  return { P, profit, tr, qStar, best, maxAt, exact, shut, qOp: shut ? 0 : qStar, profitOp: shut ? -c.TFC : best, tcStar: c.tc[qStar], acStar: c.ac[qStar] };
}
/** Quantity a firm supplies at price P: the MR = MC output when P is at least minimum AVC, otherwise nothing. */
export const supplyAt = (c, P) => (P < c.avcLo ? 0 : equilibrium(c, P, 'supply').qStar);

// 3. Diya Candles (imagined): hundreds of candles a day; Rs per hundred candles. Rent and a salaried supervisor are fixed.
export const DC = costs(220, [0, 100, 190, 250, 320, 400, 500, 620, 760, 920], 'Diya Candles', { avcTie: true, acTie: true });
check(J(DC.tc) === '220, 320, 410, 470, 540, 620, 720, 840, 980, 1140' ? 1 : 0, 1, 0, 'candle TC column');
check(J(DC.mc.slice(1)) === '100, 90, 60, 70, 80, 100, 120, 140, 160' ? 1 : 0, 1, 0, 'candle MC column');
export const DCP = { low: 70, shut: 80, mid: 90, loss: 100, be: 120, win: 140, win2: 160 };
export const E70 = equilibrium(DC, 70, 'Diya at 70');
export const E80 = equilibrium(DC, 80, 'Diya at 80');
export const E90 = equilibrium(DC, 90, 'Diya at 90');
export const E100 = equilibrium(DC, 100, 'Diya at 100');
export const E120 = equilibrium(DC, 120, 'Diya at 120');
export const E140 = equilibrium(DC, 140, 'Diya at 140');
export const E160 = equilibrium(DC, 160, 'Diya at 160');
check(DC.avcLo, 80, 6, 'Diya minimum AVC (shut-down price)');
check(DC.acLo, 120, 6, 'Diya minimum AC (break-even price)');
check(DC.avcMeetQ, 5, 0, 'MC meets AVC at five hundred candles');
check(DC.acMeetQ, 7, 0, 'MC meets AC at seven hundred candles');
check(E70.qStar, 4, 0, 'MR = MC output at price 70');
check(E70.profitOp, -220, 6, 'shut-down loss equals fixed cost');
check(E70.best, -260, 6, 'loss from operating at price 70');
check(E80.best, -220, 6, 'loss at price 80 equals the fixed cost');
check(E90.qStar, 5, 0, 'output at price 90');
check(E90.best, -170, 6, 'loss at price 90');
check(E90.profit[2], -230, 6, 'profit at two hundred candles at price 90, where MC = 90 but MC falls');
check(E100.qStar, 6, 0, 'output at price 100');
check(E100.best, -120, 6, 'loss at price 100');
check(E120.qStar, 7, 0, 'output at price 120');
check(E120.best, 0, 6, 'profit at price 120 (break-even)');
check(E140.qStar, 8, 0, 'output at price 140');
check(E140.best, 140, 6, 'profit at price 140');
check(E160.qStar, 9, 0, 'output at price 160');
check(E160.best, 300, 6, 'profit at price 160');
export const DCS = [80, 100, 120, 140, 160].map((P) => ({ P, q: supplyAt(DC, P) }));
check(J(DCS.map((x) => x.q)) === '5, 6, 7, 8, 9' ? 1 : 0, 1, 0, 'candle supply schedule');
check(supplyAt(DC, 60), 0, 0, 'no supply below minimum AVC');
check(supplyAt(DC, 70), 0, 0, 'no supply at 70');
export const esDC = (i) => elasticitySupply(DCS[i].P, DCS[i].q, DCS[i + 1].P, DCS[i + 1].q);
check(esDC(1), 0.83, 2, 'Diya elasticity of supply between 100 and 120');
check(esDC(0), 0.8, 2, 'Diya elasticity between 80 and 100');
check(esDC(3), 0.88, 2, 'Diya elasticity between 140 and 160');

// 4. Karigar Pottery (imagined): pots a day; Rs per pot.
export const KP = costs(150, [0, 60, 110, 150, 200, 270, 360], 'Karigar Pottery', { avcTie: true });
export const P70 = equilibrium(KP, 70, 'Karigar at 70');
export const P90 = equilibrium(KP, 90, 'Karigar at 90');
export const P50 = equilibrium(KP, 50, 'Karigar at 50');
export const P40 = equilibrium(KP, 40, 'Karigar at 40');
check(KP.avcLo, 50, 6, 'pottery minimum AVC');
check(P90.qStar, 6, 0, 'pottery output at 90');
check(P90.best, 30, 6, 'pottery profit at 90');
check(P70.qStar, 5, 0, 'pottery output at 70');
check(P70.best, -70, 6, 'pottery loss at 70');
check(P40.best, -180, 6, 'pottery loss at 40 if it keeps producing');

// 5. Three imagined brick kilns of the village of Dhanpur: thousand bricks a day at a price per thousand bricks.
export const MP = [4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000];
export const KA = [0, 2, 4, 6, 8, 10, 12, 14];
export const KB = [0, 0, 2, 4, 6, 8, 10, 12];
export const KC = [0, 0, 0, 3, 6, 9, 12, 15];
export const MS = MP.map((_, i) => KA[i] + KB[i] + KC[i]);
export const KD = KB; // a fourth kiln, Dilip Bricks, with the same schedule as Bhoomi Bricks
export const MS4 = MP.map((_, i) => MS[i] + KD[i]);
const rising = (s, what) => s.forEach((x, i) => { if (i && x < s[i - 1]) throw new Error(`${what}: supply falls as price rises`); });
[KA, KB, KC, MS, MS4].forEach((s, i) => rising(s, `kiln series ${i}`));
const atP = (s, P) => { const i = MP.indexOf(P); return i < 0 ? (P < MP[0] ? 0 : NaN) : s[i]; };
/** Market supply after a per-unit tax t paid by sellers: at a price P sellers keep P - t, so they supply what they supplied at P - t. */
export const MStax = MP.map((P) => atP(MS, P - 1000));
export const MSsub = MP.map((P) => atP(MS, P + 1000));
check(J(MS) === '0, 2, 6, 13, 20, 27, 34, 41' ? 1 : 0, 1, 0, 'market supply column');
check(MS[4], 20, 0, 'market supply at 8000');
check(MS[3], 13, 0, 'market supply at 7000');
check(MS4[4], 26, 0, 'market supply at 8000 with the fourth kiln');
check(MStax[4], 13, 0, 'market supply at 8000 with a Rs 1,000 tax');
check(MSsub[4], 27, 0, 'market supply at 8000 with a Rs 1,000 subsidy');
export const esKA = rnd(elasticitySupply(6000, KA[2], 8000, KA[4]), 6);
export const esKA2 = rnd(elasticitySupply(8000, KA[4], 10000, KA[6]), 6);
export const esMS = rnd(elasticitySupply(6000, MS[2], 8000, MS[4]), 6);
export const esMS2 = rnd(elasticitySupply(8000, MS[4], 10000, MS[6]), 6);
check(esKA, 3, 6, 'Anand Bricks elasticity between 6000 and 8000');
check(esKA2, 2, 6, 'Anand Bricks elasticity between 8000 and 10000');
check(esMS, 7, 6, 'market elasticity between 6000 and 8000');
check(esMS2, 2.8, 6, 'market elasticity between 8000 and 10000');

// 6. Classes of elasticity of supply (price Rs 200 to Rs 240; quantity from 100 units).
export const esClass = (p0, q0, p1, q1) => {
  if (p1 === p0) return 'infinite';
  if (q1 === q0) return 'zero';
  const e = elasticitySupply(p0, q0, p1, q1);
  return same(e, 1) ? 'equal to one' : e > 1 ? 'greater than one' : 'less than one';
};
export const ESC = [
  { key: 'gt', label: 'Greater than one', p0: 200, q0: 100, p1: 240, q1: 130, cls: 'greater than one' },
  { key: 'eq', label: 'Equal to one', p0: 200, q0: 100, p1: 240, q1: 120, cls: 'equal to one' },
  { key: 'lt', label: 'Less than one', p0: 200, q0: 100, p1: 240, q1: 110, cls: 'less than one' },
  { key: 'zero', label: 'Zero', p0: 200, q0: 100, p1: 240, q1: 100, cls: 'zero' },
  { key: 'inf', label: 'Infinite', p0: 200, q0: 100, p1: 200, q1: 160, cls: 'infinite' },
];
ESC.forEach((e) => {
  if (esClass(e.p0, e.q0, e.p1, e.q1) !== e.cls) throw new Error(`elasticity class ${e.key} is wrong`);
  e.es = e.cls === 'infinite' ? Infinity : rnd(elasticitySupply(e.p0, e.q0, e.p1, e.q1), 6);
});
check(ESC[0].es, 1.5, 6, 'elasticity greater than one');
check(ESC[1].es, 1, 6, 'elasticity equal to one');
check(ESC[2].es, 0.5, 6, 'elasticity less than one');
check(ESC[3].es, 0, 6, 'zero elasticity');

// ---------------------------------------------------------------- shared text
const sKA = `Anand Bricks supplies ${J(KA.slice(1, 7))} thousand bricks at the prices ${J(MP.slice(1, 7))} rupees per thousand bricks`;
export const sMS = (s) => `the three kilns together supply ${J(s.slice(1, 7))} thousand bricks at ${J(MP.slice(1, 7))} rupees`;
export const sDCcost = `total fixed cost of ${inr(DC.TFC)} and total variable cost of ${J(DC.tvc.slice(1))} for 1 to ${DC.n} hundred candles`;
export const sDCmc = `${J(DC.mc.slice(1))} for 1 to ${DC.n} hundred candles`;
const pc = (x) => `${rnd(x * 100, 2)}`;
const pct = (a, b) => rnd(((b - a) / a) * 100, 2);

// ---------------------------------------------------------------- multiple-choice (opts[0] is correct)
// --- t01 revenue
Q('m_comp_feat', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of the following is NOT a feature of perfect competition, as seen in the imagined wheat market of Ratanpur?',
  opts: ['A few large sellers who can each fix the market price', 'A large number of buyers and sellers', 'Free entry into and exit from the market', 'Homogeneous product sold by every seller'],
  sol: 'In perfect competition no single seller is big enough to move the price, so the price is fixed by the market as a whole. The other three options are features: many buyers and sellers, a homogeneous product, and free entry and exit.',
}));
Q('m_pt', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Sukhdev sells wheat in the Ratanpur market at the going price and cannot sell more by charging less or sell any at all by charging more. Economists call such a firm',
  opts: ['a price taker', 'a price maker', 'a price leader', 'a price fixer'],
  sol: 'A firm that must accept the price set by the market is a price taker. A price maker or fixer chooses its own price, and a price leader sets a price that others follow, which needs market power.',
}));
Q('m_homog', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Because every wheat seller in the Ratanpur market offers grain of the same kind, a seller who asks for more than the going rate',
  opts: ['loses all his buyers to other sellers', 'keeps all his buyers because of his name', 'gains buyers who prefer the higher price', 'earns a rise in marginal revenue'],
  sol: 'With a homogeneous product buyers see no difference between sellers, so they go to someone charging the market price. Brand loyalty needs differences, and a higher price does not attract buyers.',
}));
Q('m_tr_shape', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On a graph with quantity of wheat sold on the horizontal axis and revenue in rupees on the vertical axis, the total revenue curve of a price-taking firm is',
  opts: ['an upward-sloping straight line starting at the origin', 'a horizontal straight line', 'a U-shaped curve', 'a straight line starting on the vertical axis'],
  sol: 'Total revenue is price times quantity with the price constant, so it rises by the same amount for each extra unit and is zero when nothing is sold. A horizontal line would describe a fixed cost and a U shape describes a per-unit cost.',
}));
Q('m_ar_curve', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The average revenue curve of Sukhdev’s wheat farm, drawn with quantity on the horizontal axis, is',
  opts: ['a horizontal line at the market price', 'a downward-sloping line', 'an upward-sloping line from the origin', 'a vertical line at the quantity sold'],
  sol: 'Average revenue is total revenue divided by quantity, which is the price, and the price is the same at every quantity for a price taker. The other shapes require the price to change with quantity.',
}));
Q('m_mr_calc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Total revenue of Sukhdev’s wheat farm rises from ${inr(WF.tr[4])} to ${inr(WF.tr[5])} when it sells a fifth quintal. The marginal revenue of that quintal is`,
  opts: [`${inr(WF.mr[5])}, which equals the market price`, `${inr(WF.tr[5])}, which equals total revenue`, `${inr(WF.tr[5] / 5)}, which is below the market price`, `${inr(WF.mr[5] / 2)}, which is half the market price`],
  sol: `Marginal revenue is the change in total revenue: ${WF.tr[5]} minus ${WF.tr[4]} is ${WF.mr[5]}, and for a price taker this equals the price. ${WF.tr[5]} is the total, and the other figures divide by a wrong number.`,
}));
Q('m_slope', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The price of wheat in Ratanpur rises from ${inr(WF.p)} to ${inr(WF2.p)} a quintal. The total revenue curve of Sukhdev’s farm will`,
  opts: ['remain a straight line from the origin but become steeper', 'become horizontal', 'remain the same, since quantity is unchanged', 'become a curve that bends upwards'],
  sol: `The slope of the total revenue line is the price, so a higher price makes it steeper; at 6 quintals total revenue rises from ${WF.tr[6]} to ${WF2.tr[6]}. It is still a straight line from the origin because the price is constant at each quantity.`,
}));
Q('m_entry', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Free entry and exit means that when the imagined brick kilns of Dhanpur are earning more than normal profit, new kilns',
  opts: ['enter the market, which pushes supply up and the price down', 'cannot enter, which keeps the price high', 'enter the market, which pushes the price up', 'leave the market, which lowers the number of sellers'],
  sol: 'High profit attracts new sellers when entry is free. Their output raises supply and pulls the price down until profit returns to normal. Entry cannot push the price up, and exit takes place when profit is below normal.',
}));
// --- t02 producer's equilibrium
Q('m_cond2', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Besides marginal revenue being equal to marginal cost, a producer maximises profit only if at that output marginal cost is',
  opts: ['rising, so that further output costs more than it earns', 'falling, so that further output costs less than it earns', 'zero, so that output is free', 'above average cost'],
  sol: 'If marginal cost were still falling, one more unit would cost less than the price received and add to profit, so output would not be at its best. The second condition is that marginal cost rises, or at least does not fall, at that output.',
}));
Q('m_eq_q', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Diya Candles, an imagined candle maker, has marginal cost of ${sDCmc}, in rupees per hundred candles. At a market price of ${inr(DCP.win)} per hundred, its profit-maximising output is`,
  opts: [`${E140.qStar} hundred candles, where marginal cost equals ${DCP.win}`, `${DC.mc.indexOf(Math.min(...DC.mc.slice(1)))} hundred candles, where marginal cost is lowest`, `${DC.acMeetQ} hundred candles, where average cost is lowest`, `${DC.n} hundred candles, the largest output in the schedule`],
  sol: `Marginal revenue equals the price, ${DCP.win}, and marginal cost reaches ${DCP.win} at ${E140.qStar} hundred candles on its rising part. Lowest marginal cost and lowest average cost are different points, and the largest output has marginal cost ${DC.mc[DC.n]}, above the price.`,
}));
Q('m_mc_fall', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `At a price of ${inr(DCP.mid)} per hundred candles, Diya Candles finds that its marginal cost is ${DCP.mid} at 2 hundred candles, where marginal cost is still falling. What should the firm do?`,
  opts: [`Expand to ${E90.qStar} hundred candles, because marginal cost is below the price beyond 2 hundred and rises to ${DC.mc[E90.qStar]}`, 'Stay at 2 hundred candles, because marginal revenue equals marginal cost there', 'Close down, because marginal cost is falling', 'Stay at 2 hundred candles, because average cost is lowest there'],
  sol: `Equality of marginal revenue and marginal cost is necessary but not sufficient: at 2 hundred the next candles cost less than ${DCP.mid}, so profit can still grow. Profit at 2 hundred is ${inr(E90.profit[2])} against ${inr(E90.best)} at ${E90.qStar} hundred, where the marginal cost is rising and nearest the price.`,
}));
Q('m_shut_price', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In the short run a firm in a perfectly competitive market covers its variable cost only if the price is at least',
  opts: ['the minimum of its average variable cost', 'the minimum of its average fixed cost', 'its total fixed cost', 'the maximum of its marginal revenue'],
  sol: 'The lowest price at which the firm is willing to produce in the short run is the minimum of its average variable cost, called the shut-down price. Fixed cost is paid whether or not it produces, and average fixed cost has no minimum.',
}));
Q('m_shutdown_logic', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `The market price of candles falls to ${inr(DCP.low)} per hundred. Marginal cost of Diya Candles equals ${DCP.low} at ${E70.qStar} hundred candles, but the minimum average variable cost is ${inr(DC.avcLo)}. In the short run the firm should`,
  opts: [`produce nothing, since operating loses ${inr(-E70.best)} against ${inr(DC.TFC)} if it shuts down`, `produce ${E70.qStar} hundred candles, because marginal revenue equals marginal cost`, 'produce where average cost is lowest', 'raise its price above the market price'],
  sol: `At ${E70.qStar} hundred candles the revenue is ${E70.tr[E70.qStar]} and total cost ${DC.tc[E70.qStar]}, so the loss is ${-E70.best}, larger than the fixed cost of ${DC.TFC} that is lost anyway when production stops. Equality of marginal revenue and cost does not decide when the price is below average variable cost, and a price taker cannot raise its price.`,
}));
Q('m_breakeven', mcq({
  t: 2, d: 3, c: 'application',
  stem: `From the cost schedule of Diya Candles (${sDCost()}), the break-even price per hundred candles, at which the firm just covers all its costs, is`,
  opts: [`${inr(DC.acLo)}, the lowest value of average cost`, `${inr(DC.avcLo)}, the lowest value of average variable cost`, `${inr(Math.min(...DC.mc.slice(1)))}, the lowest value of marginal cost`, `${inr(r2(DC.ac[DC.n]))}, the average cost of the largest output`],
  sol: `The break-even price is the minimum of average cost, here ${DC.acLo}: at ${DC.acMeetQ} hundred candles revenue ${E120.tr[7]} equals total cost ${DC.tc[7]}. ${DC.avcLo} is the shut-down price, ${Math.min(...DC.mc.slice(1))} is only the lowest marginal cost and ${r2(DC.ac[DC.n])} is not the minimum.`,
}));
function sDCost() { return `total cost of ${J(DC.tc)} rupees for 0, 1, 2 … ${DC.n} hundred candles`; }
Q('m_normal', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'When an imagined candle maker earns normal profit, its total revenue is',
  opts: ['equal to total cost, including the owner’s minimum reward', 'less than total variable cost', 'greater than total cost', 'equal to total fixed cost alone'],
  sol: 'Normal profit is the minimum reward that keeps the owner in the business and is counted as a cost, so earning it means revenue just equals total cost. Revenue above total cost is more than normal profit, and revenue below variable cost means closing down.',
}));
Q('m_loss_short', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `At a price of ${inr(DCP.loss)} per hundred, Diya Candles makes a loss of ${inr(-E100.best)} a day at its best output of ${E100.qStar} hundred candles. In the short run the firm should`,
  opts: [`keep producing, because the loss is smaller than the fixed cost of ${inr(DC.TFC)} it would lose by closing`, 'close down at once, because any loss means failure', `close down, because the price is below the break-even price of ${inr(DC.acLo)}`, `produce nothing, because the price is below average cost at ${E100.qStar} hundred candles`],
  sol: `The price ${DCP.loss} is above the minimum average variable cost ${DC.avcLo}, so revenue covers all variable cost and part of the fixed cost. Closing would lose the whole ${DC.TFC}, while producing loses only ${-E100.best}. A price below break-even does not force closure in the short run.`,
}));
Q('m_lr_rule', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the long run, an imagined candle maker whose price stays below the minimum of its average cost will',
  opts: ['leave the market, since it cannot cover all its costs', 'stay for ever, since fixed cost has to be paid', 'raise price to cover the loss', 'expand output without limit'],
  sol: 'In the long run no cost is fixed, so a firm that cannot cover its average cost makes a loss at every output and exits. A price taker cannot raise the price, and expanding output deepens the loss.',
}));
// --- t03 supply
Q('m_sup_curve', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the short run the supply curve of a firm under perfect competition is',
  opts: ['the rising part of its marginal cost curve above the minimum of average variable cost', 'its entire marginal cost curve, including the falling part', 'its average cost curve', 'its average revenue curve'],
  sol: 'At each price the firm supplies the output where marginal cost equals price, provided the price is at least the minimum average variable cost. The falling part of marginal cost is not profit-maximising, and average cost or revenue curves give no output for each price.',
}));
Q('m_law', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'According to the law of supply, other things remaining the same, when the price of a good rises, the quantity supplied',
  opts: ['rises', 'falls', 'stays the same', 'first falls and then stays the same'],
  sol: 'There is a direct relationship between the price of a good and the quantity supplied of it, other things unchanged, because a higher price makes supply more profitable.',
}));
Q('m_move', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The price of candles falls from ${inr(DCS[3].P)} to ${inr(DCS[2].P)} per hundred, and Diya Candles reduces output from ${DCS[3].q} to ${DCS[2].q} hundred. This is`,
  opts: ['a movement down along the supply curve, called a contraction of supply', 'a leftward shift of the supply curve', 'a rightward shift of the supply curve', 'an expansion of supply'],
  sol: 'When the good’s own price changes, the firm moves along its existing supply curve. A fall in price gives a contraction. A shift would need a change in some other determinant, such as cost or technology, and an expansion is a rise in quantity.',
}));
Q('m_shift_tax', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The village panchayat of Dhanpur imposes a tax of Rs 1,000 on each thousand bricks sold. At a price of ${inr(MP[4])} the three kilns would earlier supply ${MS[4]} thousand bricks. After the tax, the quantity supplied at that price is`,
  opts: [`${MStax[4]} thousand bricks, because supply shifts to the left`, `${MSsub[4]} thousand bricks, because supply shifts to the right`, `${MS[4]} thousand bricks, because the price is unchanged`, 'zero, because every kiln closes'],
  sol: `Sellers keep only the price less the tax, so at ${MP[4]} they behave as at ${MP[4] - 1000} before the tax and supply ${MStax[4]}, so the curve shifts left. ${MSsub[4]} is the quantity after a subsidy, and the unchanged price does not keep quantity unchanged.`,
}));
Q('m_tech', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A new furnace design lets the imagined kilns of Dhanpur make more bricks from the same coal. Other things unchanged, the supply curve of bricks',
  opts: ['shifts to the right, as more is supplied at each price', 'shifts to the left, as less is supplied at each price', 'does not move, since price is unchanged', 'becomes vertical'],
  sol: 'Better technology lowers the cost of each brick, so at each price sellers supply more and the curve shifts right. A leftward shift follows a rise in cost, and the price has not changed so there is no movement along the curve.',
}));
Q('m_market_sum', mcq({
  t: 3, d: 3, c: 'application',
  stem: `At ${inr(MP[3])} per thousand bricks, Anand Bricks supplies ${KA[3]} thousand bricks, Bhoomi Bricks ${KB[3]} thousand and Chandra Bricks ${KC[3]} thousand. The market supply at that price is`,
  opts: [`${MS[3]} thousand bricks, the horizontal sum`, `${r2(MS[3] / 3)} thousand bricks, the average`, `${Math.max(KA[3], KB[3], KC[3])} thousand bricks, the largest single supply`, `${KA[3] * KB[3] * KC[3]} thousand bricks, the product`],
  sol: `Market supply at a price adds up what every firm supplies at that price: ${KA[3]} + ${KB[3]} + ${KC[3]} = ${MS[3]}. An average, a maximum or a product has no meaning as the total offered by the market.`,
}));
Q('m_nfirms', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `A fourth kiln, Dilip Bricks, enters the Dhanpur market. At ${inr(MP[4])} it supplies ${KD[4]} thousand bricks, the same as Bhoomi Bricks. Market supply at that price changes from ${MS[4]} to`,
  opts: [`${MS4[4]} thousand bricks, a rightward shift of market supply`, `${MS[4] - KD[4]} thousand bricks, a leftward shift`, `${MS[4]} thousand bricks, with no shift`, `${KD[4]} thousand bricks, because only the new kiln counts`],
  sol: `Market supply depends on the number of firms. Adding a firm adds its quantity at every price: ${MS[4]} + ${KD[4]} = ${MS4[4]}, so the curve shifts right. Entry never reduces supply, and the old kilns keep supplying.`,
}));
Q('m_es_class', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Anand Bricks raises output from ${KA[2]} to ${KA[4]} thousand bricks when the price rises from ${inr(MP[2])} to ${inr(MP[4])} per thousand. Its supply is`,
  opts: [`elastic, with elasticity of supply ${esKA}, greater than one`, `inelastic, with elasticity of supply ${r2(1 / esKA)}, less than one`, `unitary elastic, with elasticity of supply 1`, 'perfectly inelastic, with elasticity of supply zero'],
  sol: `Quantity rises by ${pct(KA[2], KA[4])} per cent and price by ${pct(MP[2], MP[4])} per cent, so elasticity is ${pct(KA[2], KA[4])} divided by ${pct(MP[2], MP[4])}, which is ${esKA}. A value above one means quantity responds more than price. ${r2(1 / esKA)} inverts the ratio.`,
}));
Q('m_vertical', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The number of seats in a small imagined hall of Dhanpur is fixed at 500 whatever the price of a ticket. Its supply curve is a vertical line, and the elasticity of supply is',
  opts: ['zero', 'one', 'greater than one', 'infinite'],
  sol: 'A vertical curve means quantity does not change when price changes, so the percentage change in quantity is zero and so is the elasticity. Infinite elasticity belongs to a horizontal curve, and one to a line through the origin.',
}));
Q('m_related', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Farmers of Ratanpur can grow wheat or mustard on the same field. If the price of mustard rises sharply, the supply of wheat',
  opts: ['decreases, shifting the wheat supply curve to the left', 'increases, shifting the wheat supply curve to the right', 'does not change, since the price of wheat is the same', 'moves along the same curve downwards'],
  sol: 'A higher price of mustard makes mustard more attractive, so land and effort move out of wheat and less wheat is supplied at each wheat price. The wheat price has not changed, so the response is a shift and not a movement along the curve.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_ar_mr', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'For a price-taking wheat farm, marginal revenue equals the price.',
  r: 'Each additional quintal is sold at the same market price, so total revenue rises by exactly that price.',
  sol: 'Both are true and R explains A. Marginal revenue is the rise in total revenue from one more unit, and with an unchanged price this rise is just the price.',
}));
Q('ar_tr_line', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The average revenue curve of a price-taking firm is a horizontal line.',
  r: 'The total revenue curve of a price-taking firm is a straight line through the origin.',
  sol: 'Both are true, but R does not explain A. Both facts follow from the same cause, a constant price at every quantity; the straight-line total revenue does not make average revenue horizontal.',
}));
Q('ar_mcfall', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'A producer is not in equilibrium at an output where marginal revenue equals marginal cost if marginal cost is falling there.',
  r: 'Beyond that output a further unit adds more to revenue than to cost.',
  sol: 'Both are true and R explains A. With marginal cost still falling, the next unit costs less than the price it earns, so extra output raises profit and the producer has not reached the maximum.',
}));
Q('ar_shut', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In the short run a price-taking firm stops production when the price falls below the minimum of its average variable cost.',
  r: 'When a firm stops production in the short run, it no longer has to pay its fixed cost.',
  sol: 'A is true and R is false. Fixed cost has to be paid in the short run even at zero output; the firm stops because the price does not cover variable cost, so staying open would add to the loss.',
}));
Q('ar_es', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A vertical supply curve has infinite elasticity of supply.',
  r: 'On a vertical supply curve the quantity supplied does not change when the price changes.',
  sol: 'A is false and R is true. If quantity does not change, the percentage change in quantity is zero, so elasticity is zero. Infinite elasticity belongs to a horizontal supply curve.',
}));
Q('ar_tax', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A tax of a fixed amount on each unit sold shifts the supply curve of candle makers to the left.',
  r: 'The tax adds to the cost of supplying every unit, so less is supplied at each price.',
  sol: 'Both are true and R explains A. A unit tax is an added cost, so at any given price sellers keep less and offer fewer units.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_mr_lt_ar', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `For Kamla’s onion plot, which sells at ${inr(ON.p)} a kilogram however much it sells, marginal revenue is lower than average revenue at larger outputs.`,
  sol: `At every quantity the average revenue is ${ON.p} and the marginal revenue is ${ON.p}, so the two are equal throughout. A marginal revenue below average revenue needs a price that falls as more is sold.`,
}));
Q('tf_supply_rise', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'A rise in the price of candles shifts the supply curve of Diya Candles to the right.',
  sol: 'A change in the good’s own price causes a movement along the supply curve, an expansion of supply. A shift comes from other determinants such as cost, technology, taxes or the number of firms.',
}));
Q('fb_mr', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Marginal revenue is the change in total revenue when one more ___ is sold.',
  acc: [['unit']],
  sol: 'Marginal revenue is the addition to total revenue from selling one more unit.',
}));
Q('fb_sup', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'A fall in the price of bricks, with everything else unchanged, causes a ___ along the supply curve of the kiln.',
  acc: [['movement', 'contraction']],
  sol: 'The change in the good’s own price moves the point along the same curve; here it is a downward movement, a contraction of supply.',
}));
Q('mt_rev', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each revenue concept used for Kamla’s onion plot with its definition.',
  pairs: [
    ['Total revenue', 'Price multiplied by quantity sold'],
    ['Average revenue', 'Total revenue divided by quantity sold, equal to price'],
    ['Marginal revenue', 'Change in total revenue from selling one more unit'],
    ['Profit', 'Total revenue minus total cost'],
  ],
  sol: 'Total revenue is price times quantity, average revenue is revenue per unit, marginal revenue is the extra revenue from one more unit, and profit is the gap between revenue and cost.',
}));
Q('mt_det', match({
  t: 3, d: 3, c: 'application',
  stem: 'Match each event in the imagined brick market of Dhanpur with its effect on the supply curve of bricks.',
  pairs: [
    ['A new furnace lowers the cost of making bricks', 'Rightward shift because cost falls'],
    ['The price of coal used by the kilns rises', 'Leftward shift because input cost rises'],
    ['A tax is imposed on each thousand bricks', 'Leftward shift because a tax is added to cost'],
    ['The price of bricks itself falls', 'Downward movement along the same curve'],
  ],
  sol: 'Cost-lowering technology shifts supply right; a dearer input and a unit tax both raise cost and shift it left; the good’s own price only moves the point along the curve.',
}));
Q('ord_eq', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps by which Diya Candles finds its profit-maximising output from a cost schedule at a given market price.',
  items: [
    'Take marginal revenue equal to the market price',
    'Compute marginal cost from the total cost schedule',
    'Find the output at which marginal cost equals the price on its rising part',
    'Check that total revenue less total cost is largest at that output',
  ],
  sol: 'Marginal revenue is set equal to the price first, marginal cost is computed, the output where they are equal on the rising part is located, and the answer is verified with profit.',
}));
Q('ord_es', ord({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of finding the elasticity of supply of Anand Bricks when its price changes.',
  items: [
    'Find the change in quantity and in price',
    'Express each change as a percentage of the original value',
    'Divide the percentage change in quantity by the percentage change in price',
    'Compare the result with one to classify the supply',
  ],
  sol: 'Changes come first, then percentages of the original values, then their ratio, and finally the class by comparison with one.',
}));

// ---------------------------------------------------------------- numericals (values computed, never typed)
Q('n_tr', num({
  t: 1, d: 1, c: 'application', value: WF.tr[4], unit: 'Rs', tol: 0,
  stem: `Sukhdev’s wheat farm in the imagined village of Ratanpur sells wheat at the market price of ${inr(WF.p)} a quintal. Find its total revenue from selling 4 quintals.`,
  sol: `Total revenue = price × quantity = ${WF.p} × 4 = **Rs ${WF.tr[4]}**.`,
}));
Q('n_mr5', num({
  t: 1, d: 2, c: 'application', value: WF.mr[5], unit: 'Rs', tol: 0,
  stem: `The total revenue of Sukhdev’s farm is ${J(WF.tr)} (rupees) for 0, 1, 2 … ${WF.n} quintals sold. Find the marginal revenue of the 5th quintal.`,
  sol: `Marginal revenue = ${WF.tr[5]} − ${WF.tr[4]} = **Rs ${WF.mr[5]}**, the same as the price.`,
}));
Q('n_onion', num({
  t: 1, d: 2, c: 'application', value: ON.ar[3], unit: 'Rs per kg', tol: 0,
  stem: `Kamla’s imagined onion plot earns a total revenue of ${inr(ON.tr[3])} from selling 30 kg of onions. Find its average revenue per kilogram.`,
  sol: `Average revenue = total revenue ÷ quantity = ${ON.tr[3]} ÷ 30 = **Rs ${ON.ar[3]}** per kg, which is the market price.`,
}));
Q('n_eqq', num({
  t: 2, d: 3, c: 'application', value: E120.qStar, unit: 'hundred candles', tol: 0,
  stem: `The marginal cost of Diya Candles is ${sDCmc}, in rupees per hundred candles. If the market price is ${inr(DCP.be)} per hundred, find the output at which marginal revenue equals marginal cost on the rising part of marginal cost.`,
  sol: `Marginal revenue = price = ${DCP.be}. Marginal cost is ${DC.mc[E120.qStar]} at **${E120.qStar}** hundred candles, and it rises afterwards to ${DC.mc[E120.qStar + 1]}.`,
}));
Q('n_profit160', num({
  t: 2, d: 3, c: 'application', value: E160.best, unit: 'Rs', tol: 0,
  stem: `Diya Candles has a ${sDCcost}. The price rises to ${inr(DCP.win2)} per hundred and the firm produces ${E160.qStar} hundred candles. Find its profit per day.`,
  sol: `Total revenue = ${DCP.win2} × ${E160.qStar} = ${E160.tr[E160.qStar]}. Total cost = ${DC.TFC} + ${DC.tvc[E160.qStar]} = ${DC.tc[E160.qStar]}. Profit = ${E160.tr[E160.qStar]} − ${DC.tc[E160.qStar]} = **Rs ${E160.best}**.`,
}));
Q('n_loss100', num({
  t: 2, d: 4, c: 'application', value: E100.best, unit: 'Rs', tol: 0,
  stem: `Diya Candles has a ${sDCcost}. At a price of ${inr(DCP.loss)} per hundred it produces ${E100.qStar} hundred candles. Find its profit; give a loss with a minus sign.`,
  sol: `Total revenue = ${DCP.loss} × ${E100.qStar} = ${E100.tr[E100.qStar]}. Total cost = ${DC.TFC} + ${DC.tvc[E100.qStar]} = ${DC.tc[E100.qStar]}. Profit = ${E100.tr[E100.qStar]} − ${DC.tc[E100.qStar]} = **Rs ${E100.best}**, a loss smaller than the fixed cost.`,
}));
Q('n_shut', num({
  t: 2, d: 3, c: 'application', value: DC.avcLo, unit: 'Rs', tol: 0,
  stem: `Diya Candles has a total fixed cost of ${inr(DC.TFC)} and total variable cost of ${J(DC.tvc.slice(1, 6))} (rupees) for 1 to 5 hundred candles. Find its shut-down price per hundred candles, taking the lowest average variable cost among these outputs.`,
  sol: `Average variable cost = ${DC.tvc.slice(1, 6).map((v, i) => `${v} ÷ ${i + 1}`).join(', ')}, which is ${J(DC.avc.slice(1, 6).map(r2))}. The lowest is **Rs ${DC.avcLo}**, at ${DC.avcMin[0]} and ${DC.avcMin[1]} hundred candles, and it is the shut-down price.`,
}));
Q('n_be', num({
  t: 2, d: 4, c: 'application', value: DC.acLo, unit: 'Rs', tol: 0,
  stem: `The total cost of Diya Candles is ${J(DC.tc)} (rupees) for 0, 1, 2 … ${DC.n} hundred candles. Find the break-even price per hundred, the lowest value of average cost, taking outputs from 1 to 9 hundred.`,
  sol: `Average cost = total cost ÷ output: ${J(DC.ac.slice(1).map(r2))}. The lowest value is **Rs ${DC.acLo}**, at ${DC.acMin[0]} and ${DC.acMin[1]} hundred candles, the break-even price.`,
}));
Q('n_pot90', num({
  t: 2, d: 3, c: 'application', value: P90.best, unit: 'Rs', tol: 0,
  stem: `Karigar Pottery, an imagined pottery, has a total fixed cost of ${inr(KP.TFC)} a day and total variable cost of ${J(KP.tvc.slice(1))} (rupees) for 1 to ${KP.n} pots. The price of a pot is ${inr(90)}. Find its maximum profit per day; the marginal cost of the sixth pot is ${inr(KP.mc[6])}.`,
  sol: `At price ${P90.P} the output where marginal cost equals the price is ${P90.qStar} pots. Revenue = ${P90.P} × ${P90.qStar} = ${P90.tr[P90.qStar]}; total cost = ${KP.TFC} + ${KP.tvc[P90.qStar]} = ${KP.tc[P90.qStar]}. Profit = **Rs ${P90.best}**.`,
}));
Q('n_mkt', num({
  t: 3, d: 2, c: 'application', value: MS[4], unit: 'thousand bricks', tol: 0,
  stem: `At ${inr(MP[4])} per thousand bricks, Anand Bricks supplies ${KA[4]}, Bhoomi Bricks ${KB[4]} and Chandra Bricks ${KC[4]} thousand bricks a day. Find the market supply at that price.`,
  sol: `Market supply = ${KA[4]} + ${KB[4]} + ${KC[4]} = **${MS[4]}** thousand bricks.`,
}));
Q('n_es_kiln', num({
  t: 3, d: 3, c: 'application', value: esKA, unit: '', tol: 0,
  stem: `${sKA}. Find its elasticity of supply when the price rises from ${inr(MP[2])} to ${inr(MP[4])}.`,
  sol: `Percentage change in quantity = (${KA[4]} − ${KA[2]}) ÷ ${KA[2]} × 100 = ${pct(KA[2], KA[4])}. Percentage change in price = (${MP[4]} − ${MP[2]}) ÷ ${MP[2]} × 100 = ${pct(MP[2], MP[4])}. Elasticity of supply = ${pct(KA[2], KA[4])} ÷ ${pct(MP[2], MP[4])} = **${esKA}**.`,
}));
Q('n_es_firm', num({
  t: 3, d: 4, c: 'application', value: r2(esDC(1)), unit: '', tol: 0.01,
  stem: `Diya Candles supplies ${DCS[1].q} hundred candles at ${inr(DCS[1].P)} and ${DCS[2].q} hundred at ${inr(DCS[2].P)} per hundred. Find its elasticity of supply between these prices, correct to 2 decimal places.`,
  sol: `Percentage change in quantity = (${DCS[2].q} − ${DCS[1].q}) ÷ ${DCS[1].q} × 100 = ${pct(DCS[1].q, DCS[2].q)}. Percentage change in price = (${DCS[2].P} − ${DCS[1].P}) ÷ ${DCS[1].P} × 100 = ${pct(DCS[1].P, DCS[2].P)}. Elasticity = ${pct(DCS[1].q, DCS[2].q)} ÷ ${pct(DCS[1].P, DCS[2].P)} = **${r2(esDC(1))}**, so supply is inelastic.`,
}));

// ---------------------------------------------------------------- short answers, 2 marks
Q('s2_features', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any four features of a perfectly competitive market, taking the wheat market of Ratanpur as an imagined example.',
  model: 'Perfect competition has a large number of buyers and sellers, so no one influences the price. The product is homogeneous. Firms can enter and leave freely. Buyers and sellers have perfect knowledge of the price and the product.',
  sol: 'Any four features, half a mark each.',
  scheme: [['Two features correctly stated', 1], ['Two more features correctly stated', 1]],
}));
Q('s2_price_taker', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is a single wheat farm in a perfectly competitive market a price taker? Give two reasons.',
  model: 'The farm sells a tiny share of the market output, so a change in its own output does not change the price. The product is homogeneous, so buyers will not pay more to it than to others. It therefore accepts the market price.',
  sol: 'Small share and identical product.',
  scheme: [['Very small share of the market', 1], ['Homogeneous product, so no higher price is possible', 1]],
}));
Q('s2_ar_mr', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain why average revenue and marginal revenue are equal for Kamla’s onion plot, which sells at ${inr(ON.p)} a kilogram, using the figures for the first 20 kg.`,
  model: `Revenue is ${inr(ON.tr[2])} for 20 kg and ${inr(ON.tr[1])} for 10 kg. Average revenue is ${ON.tr[2]} ÷ 20 = ${ON.ar[2]}. Each extra kilogram adds the same price, so ${ON.mr[2]} ÷ 10 = ${ON.mr[2] / 10}, equal to average revenue.`,
  sol: 'AR equals price; MR equals price.',
  scheme: [['Average revenue computed and equal to price', 1], ['Marginal revenue computed and equal to average revenue, with reason', 1]],
}));
Q('s2_profit_cond', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two conditions that must hold at the output where a perfectly competitive firm maximises its profit.',
  model: 'First, marginal revenue, which equals the price, must be equal to marginal cost. Second, marginal cost must be rising at that output, or at least not falling, so that producing beyond it would add more to cost than to revenue.',
  sol: 'MR = MC, with MC rising.',
  scheme: [['Marginal revenue equals marginal cost', 1], ['Marginal cost rising at that output, with reason', 1]],
}));
Q('s2_shut', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What is the shut-down point of Diya Candles in the short run? State the price and say what the firm does below it.`,
  model: `The shut-down point is where the price equals the minimum of average variable cost, here ${inr(DC.avcLo)} per hundred candles. Below this price the revenue cannot even cover variable cost, so the firm stops production in the short run and loses only its fixed cost.`,
  sol: 'Minimum AVC, with consequence.',
  scheme: [['Shut-down price as the minimum average variable cost, with the figure', 1], ['Firm stops below it, loss limited to fixed cost', 1]],
}));
Q('s2_supply_curve', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the supply curve of a firm in perfect competition, and why does it start at the shut-down price?',
  model: 'The supply curve is the rising part of the marginal cost curve above the minimum of average variable cost. At each price the firm chooses the output where marginal cost equals price, and below the minimum average variable cost it would not produce at all.',
  sol: 'MC above minimum AVC.',
  scheme: [['Supply curve identified with marginal cost above the minimum of average variable cost', 1], ['Reason: below that price nothing is supplied', 1]],
}));
Q('s2_law', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the law of supply and give one reason why a rise in the price of bricks makes the kilns of Dhanpur supply more.',
  model: 'The law of supply says that, other things unchanged, the quantity supplied of a good rises when its price rises. At a higher price, the marginal cost of more bricks is covered, so supplying more raises profit and kilns expand output.',
  sol: 'Direct relation; profit motive.',
  scheme: [['Law stated with the condition other things unchanged', 1], ['Reason: a higher price covers the higher marginal cost', 1]],
}));
Q('s2_determinants', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name any four determinants of the supply of a good other than its own price and say what each does to supply when it changes in the favourable direction.',
  model: 'Technology: better technology raises supply. Input prices: a fall in input prices raises supply. Unit taxes: a tax lowers supply while a subsidy raises it. Prices of related goods: a rise in the price of a substitute good in production lowers supply.',
  sol: 'Four determinants with direction.',
  scheme: [['Two determinants with direction', 1], ['Two more determinants with direction', 1]],
}));
Q('s2_move_shift', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a movement along the supply curve of bricks from a shift of the supply curve, with the cause of each.',
  model: 'A movement along the curve is caused by a change in the price of the good itself, other things unchanged. A shift of the whole curve is caused by a change in another determinant, such as technology, input prices or a tax, and changes quantity at every price.',
  sol: 'Own price versus other determinants.',
  scheme: [['Movement caused by own price', 1], ['Shift caused by other determinants', 1]],
}));

// ---------------------------------------------------------------- short answers, 3 marks
Q('s3_tr_curve', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Sukhdev’s wheat farm sells at ${inr(WF.p)} a quintal. Draw up, in words, its total revenue for 1, 2 and 3 quintals and explain why the total revenue curve is a straight line through the origin.`,
  model: `Total revenue is ${J(WF.tr.slice(1, 4))} rupees for 1, 2 and 3 quintals. The curve starts at the origin since nothing is earned when nothing is sold. It rises by ${WF.mr[1]} for every quintal, as the price is constant, so the slope is constant and the curve is a straight line.`,
  sol: 'Figures; origin; constant slope equal to price.',
  scheme: [['Total revenue figures for 1, 2 and 3 quintals', 1], ['Starts at the origin', 1], ['Constant slope equal to the price', 1]],
}));
Q('s3_eq', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Diya Candles has a ${sDCcost}. Find its profit-maximising output at a price of ${inr(DCP.win)} per hundred and its profit there.`,
  model: `Marginal cost is ${sDCmc}. It equals ${DCP.win} at ${E140.qStar} hundred candles, on the rising part. Total revenue is ${DCP.win} × ${E140.qStar} = ${E140.tr[E140.qStar]}, total cost is ${DC.tc[E140.qStar]}, so profit is ${E140.tr[E140.qStar]} − ${DC.tc[E140.qStar]} = ${inr(E140.best)}.`,
  sol: `MC = price at ${E140.qStar}; profit ${E140.best}.`,
  scheme: [['Marginal cost schedule found', 1], ['Output where marginal cost equals the price', 1], ['Profit computed', 1]],
}));
Q('s3_breakeven', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `What is the break-even price of a firm? Show from the Diya Candles schedule that at the break-even price its profit is zero.`,
  model: `The break-even price is the minimum of average cost, where the firm earns just normal profit. For Diya Candles it is ${inr(DC.acLo)} per hundred, at ${E120.qStar} hundred candles. Revenue is ${DC.acLo} × ${E120.qStar} = ${E120.tr[E120.qStar]}, equal to total cost ${DC.tc[E120.qStar]}, so profit is ${E120.best}.`,
  sol: 'Minimum AC; revenue equals cost.',
  scheme: [['Break-even price defined as minimum average cost', 1], ['Figure for Diya Candles', 1], ['Revenue equals total cost, profit zero', 1]],
}));
Q('s3_market', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `${sKA}. Bhoomi Bricks supplies ${J(KB.slice(1, 7))} and Chandra Bricks ${J(KC.slice(1, 7))} at the same prices. Find the market supply at ${inr(MP[2])} and at ${inr(MP[4])} and state how it is obtained.`,
  model: `Market supply is the horizontal sum of the supplies of the firms at each price. At ${MP[2]} it is ${KA[2]} + ${KB[2]} + ${KC[2]} = ${MS[2]} thousand bricks. At ${MP[4]} it is ${KA[4]} + ${KB[4]} + ${KC[4]} = ${MS[4]} thousand bricks.`,
  sol: `${MS[2]} and ${MS[4]} thousand bricks.`,
  scheme: [['Horizontal summation stated', 1], [`Market supply at ${MP[2]}`, 1], [`Market supply at ${MP[4]}`, 1]],
}));
Q('s3_es', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Lakshmi Looms, an imagined handloom unit, raises its supply of dupattas from ${ESC[1].q0} to ${ESC[1].q1} a week when the price rises from ${inr(ESC[1].p0)} to ${inr(ESC[1].p1)} each. Find its elasticity of supply and say whether supply is elastic, unit elastic or inelastic.`,
  model: `Quantity rises by ${pct(ESC[1].q0, ESC[1].q1)} per cent and price by ${pct(ESC[1].p0, ESC[1].p1)} per cent. Elasticity of supply is the percentage change in quantity divided by the percentage change in price, which is ${pct(ESC[1].q0, ESC[1].q1)} ÷ ${pct(ESC[1].p0, ESC[1].p1)} = ${ESC[1].es}. As the elasticity equals one, supply is unit elastic: quantity changes by the same percentage as price.`,
  sol: `es = ${ESC[1].es}.`,
  scheme: [['Percentage change in quantity', 1], ['Percentage change in price and ratio', 1], ['Classification', 1]],
}));
Q('s3_tax', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `A tax of Rs 1,000 per thousand bricks is imposed on the kilns of Dhanpur, whose market supply is ${J(MS.slice(1, 7))} thousand bricks at ${J(MP.slice(1, 7))} rupees. Find the market supply at ${inr(MP[3])} and ${inr(MP[5])} after the tax and say how the curve moves.`,
  model: `At a price p sellers keep p − 1000, so they supply what they supplied at that lower price. At ${MP[3]} supply is ${MStax[3]} thousand bricks, and at ${MP[5]} it is ${MStax[5]} thousand bricks. Supply falls at each price, so the curve shifts to the left.`,
  sol: `${MStax[3]} and ${MStax[5]}, leftward shift.`,
  scheme: [['Reasoning: price net of tax', 1], ['Both quantities correct', 1], ['Leftward shift stated', 1]],
}));

// ---------------------------------------------------------------- long answers, 5 marks
Q('l_features_rev', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain how the features of perfect competition make a wheat farm a price taker, and show with Sukhdev’s farm, which sells at ${inr(WF.p)} a quintal, that total revenue is a straight line while average revenue and marginal revenue equal the price.`,
  model: `There are many buyers and sellers, the product is homogeneous and knowledge is perfect, so each farm sells at the market price and is a price taker. Total revenue is price × quantity: ${J(WF.tr.slice(1, 5))} rupees for 1 to 4 quintals, a straight line from the origin. Average revenue is ${WF.tr[4]} ÷ 4 = ${WF.ar[4]}. Marginal revenue is ${WF.tr[4]} − ${WF.tr[3]} = ${WF.mr[4]}. Both equal the price, so both are horizontal.`,
  sol: 'Features; TR; AR; MR.',
  scheme: [['Features leading to a price taker', 1.5], ['Total revenue formula and straight line', 1], ['Average revenue computed', 1], ['Marginal revenue computed and equality with price', 1.5]],
}));
Q('l_eq', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Explain producer’s equilibrium under perfect competition. Using the marginal cost of Diya Candles (${sDCmc}), find its equilibrium output and profit at a price of ${inr(DCP.win2)} per hundred, with total cost of ${inr(DC.tc[E160.qStar])} at that output.`,
  model: `A firm maximises profit where marginal revenue, which equals the price, is equal to marginal cost, and marginal cost is rising. Here marginal revenue is ${DCP.win2}. Marginal cost equals ${DCP.win2} at ${E160.qStar} hundred candles, and it is rising. Revenue is ${DCP.win2} × ${E160.qStar} = ${E160.tr[E160.qStar]}. Profit is ${E160.tr[E160.qStar]} − ${DC.tc[E160.qStar]} = ${inr(E160.best)}. Below ${E160.qStar} marginal cost is below the price, so more output adds profit.`,
  sol: 'Conditions; equilibrium output; profit.',
  scheme: [['Condition: marginal revenue equals marginal cost', 1], ['Condition: marginal cost rising', 1], ['Equilibrium output from the schedule', 1.5], ['Revenue, cost and profit', 1.5]],
}));
Q('l_shut_be', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Diya Candles has a total fixed cost of ${inr(DC.TFC)}, a minimum average variable cost of ${inr(DC.avcLo)} and a minimum average cost of ${inr(DC.acLo)}. Explain the shut-down and break-even prices and what the firm does at prices of ${inr(DCP.low)}, ${inr(DCP.loss)} and ${inr(DCP.be)}.`,
  model: `The shut-down price is the minimum average variable cost; below it the firm stops. At ${DCP.low} it loses ${-E70.best} by producing, more than the fixed cost ${DC.TFC}, so it stops. The break-even price is the minimum average cost. At ${DCP.loss}, between the two prices, it produces ${E100.qStar} hundred and loses ${-E100.best}, less than ${DC.TFC}. At ${DCP.be}, the break-even price, revenue equals total cost, so the firm earns zero profit, which is normal profit. Between ${DC.avcLo} and ${DC.acLo} a firm produces in the short run but cannot survive in the long run.`,
  sol: 'Definitions; three prices.',
  scheme: [['Shut-down price defined', 1], ['Break-even price defined', 1], ['Decision at the low price with figures', 1], ['Decision at the middle price with figures', 1], ['Zero profit at the break-even price', 1]],
}));
Q('l_supply', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Derive the short-run supply schedule of Diya Candles from its marginal cost (${sDCmc}) and minimum average variable cost of ${inr(DC.avcLo)}, for prices of ${J(DCS.map((x) => x.P))} rupees, and describe the shape of the supply curve.`,
  model: `At each price the firm supplies the output where marginal cost equals price, provided the price is at least ${DC.avcLo}. The supply is ${J(DCS.map((x) => x.q))} hundred candles at ${J(DCS.map((x) => x.P))} rupees. Below ${DC.avcLo} it supplies nothing. The supply curve is the rising part of the marginal cost curve above the minimum average variable cost, so it slopes upwards, showing the law of supply.`,
  sol: 'Rule; schedule; shape.',
  scheme: [['Rule: marginal cost equals price above the shut-down price', 1.5], ['Schedule with quantities', 1.5], ['Nothing supplied below the shut-down price', 1], ['Upward slope, law of supply', 1]],
}));
Q('l_market', long({
  t: 3, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Explain how market supply is obtained from firm supply, using the Dhanpur kilns (${sMS(MS)}). Then show how it changes if a fourth kiln with the supply of Bhoomi Bricks enters, and name two other causes of a shift of supply.`,
  model: `Market supply is the horizontal sum of firm supplies at each price. For the three kilns it is ${J(MS.slice(1, 7))} thousand bricks at ${J(MP.slice(1, 7))} rupees. With the fourth kiln the supply at ${MP[4]} rises from ${MS[4]} to ${MS4[4]}, so the curve shifts right, since market supply depends on the number of firms. Other causes are a change in technology and a tax.`,
  sol: 'Summation; entry; other causes.',
  scheme: [['Horizontal summation explained', 1], ['Market supply figures', 1.5], ['Fourth kiln figure and shift', 1.5], ['Two other determinants', 1]],
}));
Q('l_es', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Define price elasticity of supply and find it for Anand Bricks between ${inr(MP[2])} and ${inr(MP[4])} (quantities ${KA[2]} and ${KA[4]} thousand bricks). Name the classes of elasticity of supply by their values.`,
  model: `Price elasticity of supply is the percentage change in quantity supplied divided by the percentage change in price. Quantity rises by ${pct(KA[2], KA[4])} per cent and price by ${pct(MP[2], MP[4])} per cent, so it is ${esKA}, greater than one. The classes are greater than one (elastic), equal to one (unit elastic), less than one (inelastic), zero (a vertical curve) and infinite (a horizontal curve). Here quantity responds more than price does.`,
  sol: 'Definition; computation; classes.',
  scheme: [['Definition', 1], ['Percentage changes', 1.5], ['Elasticity and class', 1], ['All five classes named', 1.5]],
}));

// ---------------------------------------------------------------- case-based (imagined passages)
Q('cb_wheat', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined wheat sales of Sukhdev’s farm, Ratanpur**\n\nThere are hundreds of wheat farms in Ratanpur, all selling the same kind of grain. The market price is ${inr(WF.p)} a quintal and no farm can change it. Sukhdev’s total revenue is ${J(WF.tr.slice(1))} (rupees) for 1 to ${WF.n} quintals sold.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What name is given to a firm such as Sukhdev’s that must accept the market price?', model: 'A **price taker**.', sol: 'Price taker.', scheme: [['Price taker named', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Find the marginal revenue of the 3rd quintal.', model: `${WF.tr[3]} − ${WF.tr[2]} = **Rs ${WF.mr[3]}**.`, sol: `MR ${WF.mr[3]}.`, scheme: [['Correct marginal revenue', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Show that average revenue equals marginal revenue for Sukhdev’s farm and state the shape of each curve.', model: `Average revenue is ${WF.tr[6]} ÷ 6 = ${WF.ar[6]} and marginal revenue is ${WF.mr[6]}, so both equal the price. Each curve is a horizontal line at ${inr(WF.p)}.`, sol: 'AR = MR = price; horizontal.', scheme: [['Both values computed and equal', 1], ['Horizontal line stated', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The price rises to Rs 2,500. Find the total revenue from 6 quintals and say how the total revenue curve changes.', model: `Total revenue is ${WF2.p} × 6 = ${inr(WF2.tr[6])}, against ${inr(WF.tr[6])}. The curve remains a straight line from the origin but becomes steeper.`, sol: 'Steeper straight line.', scheme: [['Total revenue at the new price', 1], ['Change in the curve', 1]] }),
    ]),
  ],
}));
Q('cb_candle', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined daily costs of Diya Candles**\n\nDiya Candles sells at the market price of ${inr(DCP.win)} per hundred candles. Its total cost is ${J(DC.tc)} (rupees) for 0, 1, 2 … ${DC.n} hundred candles a day.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the marginal cost of the 7th hundred candles.', model: `${DC.tc[7]} − ${DC.tc[6]} = **Rs ${DC.mc[7]}**.`, sol: `MC ${DC.mc[7]}.`, scheme: [['Correct marginal cost', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the total revenue from 8 hundred candles.', model: `${DCP.win} × ${E140.qStar} = **Rs ${E140.tr[8]}**.`, sol: `TR ${E140.tr[8]}.`, scheme: [['Correct total revenue', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Find the profit at 8 hundred candles and show that it is the output where marginal revenue equals marginal cost.', model: `Profit is ${E140.tr[8]} − ${DC.tc[8]} = ${inr(E140.best)}. The marginal cost of the 8th hundred is ${DC.mc[8]}, equal to the price, which is marginal revenue, and it is rising.`, sol: 'Profit; MR = MC.', scheme: [['Profit', 1], ['Marginal revenue equals marginal cost with rising cost', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the firm does not produce 9 hundred candles at this price.', model: `The marginal cost of the 9th hundred is ${DC.mc[9]}, above the price ${DCP.win}, so it adds ${DC.mc[9] - DCP.win} more to cost than to revenue and profit falls from ${E140.best} to ${E140.profit[9]}.`, sol: 'MC above price.', scheme: [['Marginal cost above price', 1], ['Profit falls, with figures', 1]] }),
    ]),
  ],
}));
Q('cb_pottery', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined costs of Karigar Pottery**\n\nKarigar Pottery pays rent and a permanent helper, a total fixed cost of ${inr(KP.TFC)} a day. Its total variable cost is ${J(KP.tvc.slice(1))} (rupees) for 1 to ${KP.n} pots. A glut of pots has pulled the price down to ${inr(P40.P)} a pot.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the lowest average variable cost of the pottery.', model: `The averages are ${J(KP.avc.slice(1).map(r2))}, so the lowest is **Rs ${KP.avcLo}**.`, sol: `Minimum AVC ${KP.avcLo}.`, scheme: [['Correct minimum average variable cost', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Find the total cost of making 3 pots, where the marginal cost equals ${inr(P40.P)}.`, model: `${KP.TFC} + ${KP.tvc[3]} = **Rs ${KP.tc[3]}**.`, sol: `TC ${KP.tc[3]}.`, scheme: [['Correct total cost', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): At the price of Rs 40, should the pottery produce or shut down in the short run? Support the answer with the loss in each case.', model: `At ${P40.P} the price is below the minimum average variable cost ${KP.avcLo}. Producing 3 pots loses ${KP.tc[3] - P40.P * 3} while shutting down loses the fixed cost ${KP.TFC}, so it should shut down.`, sol: 'Shut down; loss 180 against 150.', scheme: [['Price compared with minimum average variable cost', 1], ['Losses compared', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): If the price recovers to Rs 90, find the profit per day and say what has happened to the decision.', model: `At ${P90.P} the pottery makes ${P90.qStar} pots and earns profit ${inr(P90.best)}, above zero. The price is above its minimum average variable cost, so it produces.`, sol: 'Profit 30; produces.', scheme: [['Profit computed', 1], ['Decision explained', 1]] }),
    ]),
  ],
}));
Q('cb_kilns', caseQ({
  t: 3, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined brick supply in Dhanpur**\n\nThree kilns supply bricks in Dhanpur. At ${J(MP.slice(1, 7))} rupees per thousand bricks, Anand Bricks supplies ${J(KA.slice(1, 7))}, Bhoomi Bricks ${J(KB.slice(1, 7))} and Chandra Bricks ${J(KC.slice(1, 7))} thousand bricks a day.`,
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: `Find the market supply at ${inr(MP[3])}.`, model: `${KA[3]} + ${KB[3]} + ${KC[3]} = **${MS[3]}** thousand bricks.`, sol: `${MS[3]}.`, scheme: [['Correct market supply', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Find the elasticity of supply of the market between ${inr(MP[2])} and ${inr(MP[4])}.`, model: `Quantity rises ${MS[2]} to ${MS[4]}, ${pct(MS[2], MS[4])} per cent; price rises ${pct(MP[2], MP[4])} per cent; elasticity = **${esMS}**.`, sol: `es ${esMS}.`, scheme: [['Correct elasticity', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): Dilip Bricks enters with the supply of Bhoomi Bricks. Find the new market supply at ${inr(MP[4])} and name the kind of change in supply.`, model: `New supply is ${MS[4]} + ${KD[4]} = ${MS4[4]} thousand bricks at ${MP[4]}. Supply has shifted to the right because the number of firms has increased.`, sol: 'Rightward shift.', scheme: [['New market supply', 1], ['Rightward shift with reason', 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The price rises from ${inr(MP[3])} to ${inr(MP[4])}. State what happens to the quantity supplied and whether this is a shift or a movement.`, model: `Quantity supplied rises from ${MS[3]} to ${MS[4]} thousand bricks. It is a movement along the supply curve, an expansion of supply, since it is caused by the price of the good itself.`, sol: 'Movement; expansion.', scheme: [['Quantities', 1], ['Movement and reason', 1]] }),
    ]),
  ],
}));
