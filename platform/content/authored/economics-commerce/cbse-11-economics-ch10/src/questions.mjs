// CBSE 11 Economics, ch10 Production and Costs: question bank. Every farm, workshop, bakery and press is imagined and written for
// this chapter; no real statistics are used. Every schedule value (TP, AP, MP, TFC, TVC, TC, AFC, AVC, AC, MC) is computed from the
// imagined schedules with stats.mjs (marginal, average) or plain code, the laws that relate them are asserted on the discrete
// schedules, and every figure written in prose is pinned with check().
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, marginal, average, cumulative } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const J = (a) => a.join(', ');
export const inr = (x) => `Rs ${x.toLocaleString('en-IN')}`;
const same = (a, b) => rnd(a - b, 9) === 0;

// ---------------------------------------------------------------- production schedules (computed, asserted)
/** Product schedule from total product tp[0..n] (tp[0] = 0 at zero workers). mp[l] and ap[l] belong to l workers (index 0 unused). */
export function prod(tp, what) {
  const n = tp.length - 1;
  const L = tp.map((_, i) => i);
  const mp = [null, ...marginal(tp)];
  const ap = average(tp, L);
  // 1. MP above AP while AP rises, MP equal to AP when AP is flat at its top, MP below AP while AP falls.
  for (let l = 2; l <= n; l++) {
    const d = rnd(ap[l] - ap[l - 1], 9);
    if (d > 0 && !(mp[l] > ap[l])) throw new Error(`${what}: AP rises at ${l} but MP is not above AP`);
    if (d === 0 && !same(mp[l], ap[l])) throw new Error(`${what}: AP flat at ${l} but MP differs from AP`);
    if (d < 0 && !(mp[l] < ap[l])) throw new Error(`${what}: AP falls at ${l} but MP is not below AP`);
  }
  // 2. At the largest AP, MP equals AP.
  const apMax = Math.max(...ap.slice(1));
  const apMaxAt = L.filter((l) => l >= 2 && same(ap[l], apMax) && same(mp[l], ap[l]));
  if (!apMaxAt.length) throw new Error(`${what}: MP never equals AP at the maximum of AP`);
  // 3. TP is largest where MP reaches zero or turns negative; MP is not positive afterwards.
  const tpMax = Math.max(...tp);
  const tpMaxAt = tp.indexOf(tpMax);
  for (let l = tpMaxAt + 1; l <= n; l++) if (!(mp[l] <= 0)) throw new Error(`${what}: MP positive after TP maximum`);
  for (let l = 1; l <= tpMaxAt; l++) if (!(mp[l] >= 0)) throw new Error(`${what}: MP negative before TP maximum`);
  // 4. Phases.
  const mpMax = Math.max(...mp.slice(1));
  const k1 = mp.indexOf(mpMax);
  const last2 = L.filter((l) => l >= 1 && mp[l] >= 0).pop();
  const i = L.filter((l) => l >= 1 && l <= k1);
  const ii = L.filter((l) => l > k1 && l <= last2);
  const iii = L.filter((l) => l > last2);
  i.forEach((l) => { if (l > 1 && !(mp[l] > mp[l - 1])) throw new Error(`${what}: MP not rising in phase I at ${l}`); });
  ii.forEach((l) => { if (!(mp[l] < mp[l - 1] && mp[l] >= 0)) throw new Error(`${what}: MP not falling and non-negative in phase II at ${l}`); });
  iii.forEach((l) => { if (!(mp[l] < 0 && tp[l] < tp[l - 1])) throw new Error(`${what}: phase III needs negative MP and falling TP at ${l}`); });
  return { n, L, tp, mp, ap, apMax, apMaxAt: apMaxAt[0], tpMax, tpMaxAt, mpMax, k1, ph: { i, ii, iii } };
}

// 1. Hariyali Farm (imagined, village of Sarangpur): 4 hectares of land fixed, workers vary; wheat in quintals per season.
export const HF = prod([0, 6, 16, 30, 40, 48, 54, 56, 56, 54, 50], 'Hariyali Farm');
check(J(HF.mp.slice(1)) === '6, 10, 14, 10, 8, 6, 2, 0, -2, -4' ? 1 : 0, 1, 0, 'Hariyali MP column');
check(J(HF.ap.slice(1)) === '6, 8, 10, 10, 9.6, 9, 8, 7, 6, 5' ? 1 : 0, 1, 0, 'Hariyali AP column');
check(HF.apMax, 10, 6, 'Hariyali maximum AP');
check(HF.apMaxAt, 4, 0, 'Hariyali workers at which MP equals AP');
check(HF.tpMax, 56, 6, 'Hariyali maximum TP');
check(HF.mp[8], 0, 6, 'Hariyali MP of the eighth worker');
check(HF.mpMax, 14, 6, 'Hariyali maximum MP');
check(HF.k1, 3, 0, 'Hariyali last worker of phase I');
check(J(HF.ph.ii) === '4, 5, 6, 7, 8' ? 1 : 0, 1, 0, 'Hariyali phase II workers');
check(J(HF.ph.iii) === '9, 10' ? 1 : 0, 1, 0, 'Hariyali phase III workers');
export const hfRows = (a, b) => HF.L.slice(a, b + 1);

// 2. Meena's bakery (imagined): one oven fixed, bakers vary; loaves in dozens per day.
export const BK = prod([0, 8, 20, 36, 48, 55, 60, 56], "Meena's bakery");
check(J(BK.mp.slice(1)) === '8, 12, 16, 12, 7, 5, -4' ? 1 : 0, 1, 0, 'bakery MP column');
check(J(BK.ap.slice(1)) === '8, 10, 12, 12, 11, 10, 8' ? 1 : 0, 1, 0, 'bakery AP column');
check(BK.tpMax, 60, 6, 'bakery maximum TP');
check(BK.tpMaxAt, 6, 0, 'bakery bakers at maximum TP');
check(J(BK.ph.ii) === '4, 5, 6' ? 1 : 0, 1, 0, 'bakery phase II bakers');

// 3. Inkwell Press (imagined): one printing machine fixed, operators vary; thousand sheets per shift. Given by MP.
export const PRmp = [5, 9, 13, 9, 6, 2, 0, -3];
export const PR = prod([0, ...cumulative(PRmp)], 'Inkwell Press');
check(J(PR.tp) === '0, 5, 14, 27, 36, 42, 44, 44, 41' ? 1 : 0, 1, 0, 'Inkwell TP column');
check(J(PR.ap.slice(1, 5)) === '5, 7, 9, 9' ? 1 : 0, 1, 0, 'Inkwell AP of the first four operators');
check(PR.apMaxAt, 4, 0, 'Inkwell operators at which MP equals AP');
check(J(PR.ph.iii) === '8' ? 1 : 0, 1, 0, 'Inkwell phase III');

// ---------------------------------------------------------------- cost schedules (computed, asserted)
/** Cost schedule from total fixed cost and total variable cost tvc[0..n] (tvc[0] = 0). All columns indexed by output q. */
export function costs(TFC, tvc, what, { avcTie = false, acTie = false } = {}) {
  const n = tvc.length - 1;
  const q = tvc.map((_, i) => i);
  const tfc = tvc.map(() => TFC);
  const tc = tvc.map((v) => v + TFC);
  const mc = [null, ...marginal(tc)];
  const mcV = [null, ...marginal(tvc)];
  const afc = average(tfc, q);
  const avc = average(tvc, q);
  const ac = average(tc, q);
  for (let i = 0; i <= n; i++) {
    if (tc[i] !== tfc[i] + tvc[i]) throw new Error(`${what}: TC is not TFC plus TVC at ${i}`);
    if (i >= 1) {
      if (!same(mc[i], mcV[i])) throw new Error(`${what}: MC from TC differs from MC from TVC at ${i}`);
      if (!same(ac[i], afc[i] + avc[i])) throw new Error(`${what}: AC is not AFC plus AVC at ${i}`);
    }
  }
  for (let i = 2; i <= n; i++) if (!(afc[i] < afc[i - 1])) throw new Error(`${what}: AFC does not fall at ${i}`);
  // Discrete form of "MC cuts the average at its minimum": an average falls, stays or rises according as MC is below, equal to or above it.
  const cut = (avg, name) => {
    for (let i = 2; i <= n; i++) {
      const d = Math.sign(rnd(avg[i] - avg[i - 1], 9));
      const e = Math.sign(rnd(mc[i] - avg[i - 1], 9));
      if (d !== e) throw new Error(`${what}: ${name} and MC disagree at ${i}`);
    }
    const lo = Math.min(...avg.slice(1));
    const minAt = q.filter((i) => i >= 1 && same(avg[i], lo));
    const meet = q.filter((i) => i >= 1 && same(mc[i], avg[i]));
    return { lo, minAt, meet };
  };
  const avcCut = cut(avc, 'AVC');
  const acCut = cut(ac, 'AC');
  if (avcTie && !avcCut.meet.some((i) => i >= 2 && avcCut.minAt.includes(i))) throw new Error(`${what}: MC does not equal AVC at its minimum`);
  if (acTie && !acCut.meet.some((i) => i >= 2 && acCut.minAt.includes(i))) throw new Error(`${what}: MC does not equal AC at its minimum`);
  // AC reaches its minimum at a larger output than AVC (the falling AFC keeps AC falling longer).
  if (Math.min(...acCut.minAt) < Math.min(...avcCut.minAt)) throw new Error(`${what}: AC minimum before AVC minimum`);
  return { n, q, TFC, tfc, tvc, tc, mc, afc, avc, ac, avcLo: avcCut.lo, avcMin: avcCut.minAt, avcMeet: avcCut.meet, acLo: acCut.lo, acMin: acCut.minAt, acMeet: acCut.meet };
}

// 4. Karwan chair workshop (imagined): rent and permanent staff fixed; wood and casual labour variable; chairs per week.
export const CH = costs(840, [0, 700, 1200, 1560, 2000, 2500, 3060, 3710, 4520], 'chair workshop', { avcTie: true, acTie: true });
check(J(CH.tc) === '840, 1540, 2040, 2400, 2840, 3340, 3900, 4550, 5360' ? 1 : 0, 1, 0, 'workshop TC column');
check(J(CH.mc.slice(1)) === '700, 500, 360, 440, 500, 560, 650, 810' ? 1 : 0, 1, 0, 'workshop MC column');
check(J(CH.afc.slice(1)) === '840, 420, 280, 210, 168, 140, 120, 105' ? 1 : 0, 1, 0, 'workshop AFC column');
check(J(CH.avc.slice(1)) === '700, 600, 520, 500, 500, 510, 530, 565' ? 1 : 0, 1, 0, 'workshop AVC column');
check(J(CH.ac.slice(1)) === '1540, 1020, 800, 710, 668, 650, 650, 670' ? 1 : 0, 1, 0, 'workshop AC column');
check(CH.avcLo, 500, 6, 'workshop minimum AVC');
check(CH.acLo, 650, 6, 'workshop minimum AC');
check(J(CH.avcMeet.filter((i) => i >= 2)) === '5' ? 1 : 0, 1, 0, 'MC meets AVC at five chairs');
check(J(CH.acMeet.filter((i) => i >= 2)) === '7' ? 1 : 0, 1, 0, 'MC meets AC at seven chairs');
export const mcMinQ = CH.mc.indexOf(Math.min(...CH.mc.slice(1)));
check(mcMinQ, 3, 0, 'MC lowest at three chairs');
check(CH.mc[mcMinQ], 360, 6, 'lowest MC');
export const chGap2 = CH.ac[2] - CH.avc[2];
export const chGap8 = CH.ac[8] - CH.avc[8];
check(chGap2, CH.afc[2], 6, 'AC minus AVC at two chairs is AFC');
check(chGap8, CH.afc[8], 6, 'AC minus AVC at eight chairs is AFC');
export const chRect = (q) => CH.afc[q] * q;
check(chRect(4), 840, 6, 'AFC times output is TFC (rectangular hyperbola)');

// 5. Gulmohar Bakery (imagined): oven rent and one salaried cook fixed; cakes per day.
export const GB = costs(360, [0, 180, 320, 450, 620, 820, 1080], 'Gulmohar Bakery');
check(J(GB.mc.slice(1)) === '180, 140, 130, 170, 200, 260' ? 1 : 0, 1, 0, 'Gulmohar MC column');
check(J(GB.avc.slice(1)) === '180, 160, 150, 155, 164, 180' ? 1 : 0, 1, 0, 'Gulmohar AVC column');
check(J(GB.afc.slice(1)) === '360, 180, 120, 90, 72, 60' ? 1 : 0, 1, 0, 'Gulmohar AFC column');
check(J(GB.ac.slice(1)) === '540, 340, 270, 245, 236, 240' ? 1 : 0, 1, 0, 'Gulmohar AC column');
check(GB.acLo, 236, 6, 'Gulmohar minimum AC');
check(GB.avcLo, 150, 6, 'Gulmohar minimum AVC');

// 6. Kesari Jam Works (imagined): given by total cost; hundred jars per day.
export const JM_TC = [900, 1400, 1800, 2100, 2500, 3000];
export const JM = costs(JM_TC[0], JM_TC.map((t) => t - JM_TC[0]), 'Kesari Jam Works', { avcTie: true });
check(J(JM.tvc) === '0, 500, 900, 1200, 1600, 2100' ? 1 : 0, 1, 0, 'Jam TVC column');
check(J(JM.mc.slice(1)) === '500, 400, 300, 400, 500' ? 1 : 0, 1, 0, 'Jam MC column');
check(J(JM.avc.slice(1)) === '500, 450, 400, 400, 420' ? 1 : 0, 1, 0, 'Jam AVC column');
check(J(JM.ac.slice(1)) === '1400, 900, 700, 625, 600' ? 1 : 0, 1, 0, 'Jam AC column');

const tpText = (s) => `${J(s.tp)} quintals of wheat for 0, 1, 2 … ${s.n} workers`;
const tvcText = (c, unit) => `${unit} for 1 to ${c.n} units: ${J(c.tvc.slice(1))}`;
export const sHF = `total product of ${tpText(HF)}`;
export const sCH = `total variable cost (Rs) for 1 to ${CH.n} chairs of ${J(CH.tvc.slice(1))}, with total fixed cost of ${inr(CH.TFC)}`;

// ---------------------------------------------------------------- multiple-choice (opts[0] is correct)
Q('m_pf', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The imagined Hariyali Farm turns land, workers, seed and water into wheat. The technical relation that gives the largest wheat output for each combination of these inputs is called the',
  opts: ['production function', 'cost function', 'demand function', 'budget line'],
  sol: 'A production function links physical inputs with the maximum physical output they can yield. A cost function links output with money cost, a demand function links price with quantity bought, and a budget line shows what a consumer can afford.',
}));
Q('m_sr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Hariyali Farm has 4 hectares of land that cannot be enlarged this season, but it can hire as many workers as it likes. Economists describe this period of production as',
  opts: ['the short run, because at least one factor is fixed', 'the long run, because workers can be varied', 'the long run, because land is fixed', 'the short run, because all factors can be varied'],
  sol: 'Because one input, the land, is stuck at its present size, the farm is in the short run. The long run needs every input to be adjustable, so a fixed amount of land rules it out, and varying workers alone does not make the period long.',
}));
Q('m_lr', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Karwan chair workshop plans five years ahead and can build a bigger shed, buy new machines and hire more staff. This planning period is the',
  opts: ['long run, in which all factors are variable', 'short run, in which all factors are variable', 'short run, in which all factors are fixed', 'long run, in which all factors are fixed'],
  sol: 'In the long run the firm can change every input, including the size of the plant. No period is one in which all factors are fixed, and the short run always has at least one fixed factor.',
}));
Q('m_mp_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: "At Meena's bakery the total product rises from 20 to 36 dozen loaves when the third baker is hired. The 16 dozen loaves is the third baker's",
  opts: ['marginal product', 'average product', 'total product', 'fixed product'],
  sol: 'Marginal product is the change in total product when one more unit of the variable factor is used. Average product divides total product by the number of workers, and total product is the whole output, so neither is a change.',
}));
Q('m_phase1', mcq({
  t: 1, d: 2, c: 'application',
  stem: `On Hariyali Farm the marginal product of the first three workers is ${J(HF.mp.slice(1, 4))} quintals. For these workers the farm is experiencing`,
  opts: ['increasing returns to a factor, because marginal product rises', 'diminishing returns, because total product is small', 'negative returns, because the workers are few', 'constant returns, because every worker adds output'],
  sol: 'Increasing returns to a factor means that marginal product rises as more of the variable factor is added. Total product still rises under every phase except the last, so a small total says nothing, and negative returns need a negative marginal product.',
}));
Q('m_phase2', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Using the Hariyali Farm schedule of ${sHF}, the farm is in the phase of diminishing returns when it employs`,
  opts: [`${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]} workers`, `1 to ${HF.k1} workers`, `${HF.ph.iii[0]} to ${HF.n} workers`, 'exactly the one worker with the highest average product'],
  sol: `Diminishing returns are the stretch where marginal product falls but is not yet negative: workers ${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]}. The first ${HF.k1} workers have a rising marginal product, and from worker ${HF.ph.iii[0]} the marginal product is negative.`,
}));
Q('m_phase3', mcq({
  t: 1, d: 2, c: 'application',
  stem: `At Hariyali Farm the ${HF.ph.iii[0]}th worker is hired and total product falls from ${HF.tp[8]} to ${HF.tp[9]} quintals. This shows`,
  opts: ['negative returns, because marginal product is below zero', 'increasing returns, because workers are more numerous', 'diminishing returns, because marginal product is positive', 'a fall in the fixed factor, because land shrinks'],
  sol: `Total product falls only when marginal product is negative, which is the phase of negative returns. Here the marginal product is ${HF.mp[9]}. Diminishing returns have a positive marginal product, and land is fixed in the short run, so it cannot shrink.`,
}));
Q('m_ap_rise', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'On the imagined farm of Nirmala in Dhanpur, the average product of labour rises when a new worker is added. This must mean that the new worker’s',
  opts: ['marginal product is greater than the existing average product', 'marginal product is zero', 'marginal product is less than the existing average product', 'total product is at its maximum'],
  sol: 'An average rises only when the extra item is above it, as a high mark raises a class average. If the marginal product were lower, the average would fall; if zero, it would fall; and total product keeps rising while the average product is rising.',
}));
Q('m_ap_max', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'At the point where the average product curve of a firm reaches its highest value, the marginal product',
  opts: ['equals the average product', 'is greater than the average product', 'is zero', 'is at its highest value'],
  sol: 'The marginal curve rises through the average curve from above and meets it at the top of the average curve. Before that point marginal product is above average; after it, below. Marginal product is zero much later, where total product peaks, and its own peak comes earlier.',
}));
Q('m_tp_max', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The total product curve of Inkwell Press reaches its highest level when the marginal product',
  opts: ['becomes zero', 'is at its maximum', 'equals average product', 'is rising fastest'],
  sol: 'Total product stops rising when an extra operator adds nothing, so its peak coincides with zero marginal product. The maximum of marginal product marks only the end of increasing returns, where total product still rises, and equality with average product happens where average product peaks.',
}));
Q('m_incr_reason', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'When the first few workers join Hariyali Farm, marginal product rises. The most suitable reason is that',
  opts: ['the fixed land is under-used at first and workers can specialise', 'land becomes more fertile when workers are added', 'each worker is paid a higher wage', 'workers have to share too little land'],
  sol: 'With too few workers the fixed factor is not fully used, and extra hands allow division of tasks and better use of the land. Soil fertility and wages do not explain output, and sharing too little land is the cause of the opposite phase.',
}));
Q('m_dim_reason', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: "After the sixth baker joins Meena's bakery, each extra baker adds less to output than the one before. The main reason is that",
  opts: ['the fixed oven and space are shared among more and more bakers', 'bakers become lazy as wages rise', 'flour is not available', 'the oven grows smaller with time'],
  sol: 'Diminishing returns arise because the variable factor is added to a fixed factor, so each extra unit has less of the fixed factor to work with. Laziness, shortage of flour and a shrinking oven are not part of the law.',
}));
Q('m_negative_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In Meena's bakery a seventh baker is added and output changes from ${BK.tp[6]} to ${BK.tp[7]} dozen loaves. The marginal product of the seventh baker is`,
  opts: [`${BK.mp[7]} dozen loaves, a case of negative returns`, `${BK.tp[7]} dozen loaves, a case of average product`, `${Math.abs(BK.mp[7])} dozen loaves, a case of increasing returns`, `0 dozen loaves, a case of the maximum total product`],
  sol: `The marginal product is the change in total product, ${BK.tp[7]} minus ${BK.tp[6]}, which is ${BK.mp[7]}. A negative value means total product has fallen. ${BK.tp[7]} is the total, not the marginal, and ${Math.abs(BK.mp[7])} drops the sign.`,
}));
Q('m_fixed', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following is a fixed cost for the imagined Karwan chair workshop?',
  opts: ['The monthly rent of the shed', 'The cost of wood for each chair', 'The wages of casual workers paid by the chair', 'The glue and varnish used on each chair'],
  sol: 'A fixed cost does not change with output, and rent is paid even when no chair is made. Wood, casual wages and varnish all rise with the number of chairs, so they are variable costs.',
}));
Q('m_variable', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following is a variable cost for the imagined Gulmohar Bakery?',
  opts: ['Flour and sugar used for the cakes', 'The salary of the permanent head cook', 'The yearly licence fee', 'The rent of the shop'],
  sol: 'Variable costs move with output: more cakes need more flour and sugar. The permanent cook’s salary, the licence fee and the rent stay the same whatever the number of cakes baked.',
}));
Q('m_tfc_curve', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On a graph with output of chairs on the horizontal axis and cost in rupees on the vertical axis, the total fixed cost curve of the Karwan workshop is',
  opts: ['a horizontal straight line', 'a line sloping upwards from the origin', 'a U-shaped curve', 'a line sloping downwards'],
  sol: `Total fixed cost is the same at every level of output, so its curve is horizontal at a height of ${inr(CH.TFC)}. A line rising from the origin describes a cost that grows with output, a U shape fits per-unit costs and a falling line fits average fixed cost.`,
}));
Q('m_tvc_origin', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The total variable cost curve of the Kesari Jam Works starts from the origin because',
  opts: ['no variable cost is incurred when nothing is produced', 'fixed costs are zero in the short run', 'marginal cost is zero at the start', 'average cost is zero at zero output'],
  sol: 'Variable costs arise only when inputs are used for production, so they are zero at zero output. Fixed costs still exist in the short run, and marginal and average cost are not defined at zero output in the usual way.',
}));
Q('m_tc_gap', mcq({
  t: 2, d: 3, c: 'application',
  stem: `On the Karwan workshop graph the total cost curve lies above the total variable cost curve. At every output the vertical gap between them is`,
  opts: [`${inr(CH.TFC)}, the total fixed cost`, 'the marginal cost at that output', 'the average variable cost at that output', 'zero at the origin and growing after it'],
  sol: `Total cost is total fixed cost plus total variable cost, so the gap is always the fixed cost, here ${inr(CH.TFC)}, whatever the output. The two curves are parallel, so the gap does not grow, and it does not shrink to zero.`,
}));
Q('m_afc_shape', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Karwan workshop divides its fixed cost of ${inr(CH.TFC)} by the number of chairs made. The resulting average fixed cost curve`,
  opts: ['falls throughout and is a rectangular hyperbola', 'first falls and then rises', 'is a horizontal line', 'rises throughout'],
  sol: 'Average fixed cost is a constant divided by a growing output, so it keeps falling but never reaches zero, and output multiplied by it is always equal to total fixed cost, which makes a rectangular hyperbola. It does not rise, because the fixed cost does not grow.',
}));
Q('m_mc_def', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Marginal cost of a firm is best defined as the',
  opts: ['change in total cost when one more unit of output is produced', 'total cost divided by the number of units produced', 'total variable cost divided by output', 'cost incurred even when nothing is produced'],
  sol: 'Marginal cost is the extra cost of one more unit, the change in total cost divided by the change in output. Dividing total cost by output gives average cost, dividing variable cost by output gives average variable cost, and a cost met at zero output is a fixed cost.',
}));
Q('m_mc_cut_avc', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'The marginal cost curve of the imagined Kesari Jam Works cuts its average variable cost curve',
  opts: ['at the lowest point of the average variable cost curve', 'at the highest point of the curve', 'at the point where output is zero', 'never; the two curves are parallel'],
  sol: 'Marginal cost lies below average variable cost while the average falls and above it while the average rises, so it crosses at the lowest point. The curves are not parallel, they intersect, and nothing is produced at zero output so no crossing happens there.',
}));
Q('m_gap', mcq({
  t: 2, d: 3, c: 'application',
  stem: `At the Karwan workshop the difference between average cost and average variable cost is ${inr(chGap2)} at 2 chairs and ${inr(chGap8)} at 8 chairs. This gap is`,
  opts: ['average fixed cost, which becomes smaller as output rises', 'marginal cost, which becomes smaller as output rises', 'total fixed cost, which stays unchanged', 'average variable cost, which becomes larger as output rises'],
  sol: `Average cost is average fixed cost plus average variable cost, so what is left after subtracting the variable part is the average fixed cost. It falls from ${inr(chGap2)} to ${inr(chGap8)}. Total fixed cost does not change but is not a per-unit figure, and marginal cost is a different concept.`,
}));
Q('m_u_reason', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'The average variable cost curve of a workshop is U-shaped mainly because of',
  opts: ['increasing and then diminishing returns to the variable factor', 'a steady fall of fixed cost with output', 'a rise in the price of the product', 'a fall in the number of workers'],
  sol: 'When marginal product rises, each unit needs less input, so cost per unit falls; when marginal product falls, cost per unit rises. This is the law of variable proportions seen from the cost side. A falling fixed cost shapes average fixed cost, and the product price has no role in cost curves.',
}));
Q('m_ac_falls', mcq({
  t: 2, d: 3, c: 'application',
  stem: `At Gulmohar Bakery the average cost of 4 cakes is ${inr(GB.ac[4])}. The fifth cake has a marginal cost of ${inr(GB.mc[5])}, which is below ${inr(GB.ac[4])}. After the fifth cake the average cost will`,
  opts: [`fall to ${inr(GB.ac[5])}`, `rise above ${inr(GB.ac[4])}`, `stay at ${inr(GB.ac[4])}`, `become ${inr(GB.mc[5])}`],
  sol: `The extra cake costs less than the average, so the average is pulled down: total cost of 5 cakes is ${inr(GB.tc[5])}, and ${inr(GB.tc[5])} divided by 5 is ${inr(GB.ac[5])}. A rise would need a marginal cost above the average, and the new average does not equal the marginal cost.`,
}));
Q('m_mc_cuts_ac', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `In the Karwan schedule average cost is ${inr(CH.ac[6])} at 6 chairs and the marginal cost of the 7th chair is ${inr(CH.mc[7])}. What follows for the 7th chair?`,
  opts: ['Average cost stays at its lowest value, because marginal cost equals average cost', 'Average cost rises, because marginal cost is above average cost', 'Average cost falls, because marginal cost is below average cost', 'Average fixed cost rises, because output has grown'],
  sol: `The marginal cost of the 7th chair, ${inr(CH.mc[7])}, equals the earlier average, so the average does not move: ${inr(CH.tc[7])} divided by 7 is ${inr(CH.ac[7])}, the same as before. Marginal cost is neither above nor below it, and average fixed cost always falls with output.`,
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_negative', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `Total product of Hariyali Farm falls when the ${HF.ph.iii[0]}th worker is added.`,
  r: `The marginal product of the ${HF.ph.iii[0]}th worker is negative.`,
  sol: 'Both are true and R explains A. The change in total product when a worker is added is that worker’s marginal product, so a negative marginal product means a smaller total.',
}));
Q('ar_u_afc', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The average variable cost curve of a workshop is U-shaped.',
  r: 'The average fixed cost curve falls throughout as output rises.',
  sol: 'Both statements are true, but the fall in average fixed cost does not explain the U shape of average variable cost. That shape comes from increasing and then diminishing returns to the variable factor.',
}));
Q('ar_mc_avc', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The marginal cost curve cuts the average variable cost curve at the minimum point of the latter.',
  r: 'Average variable cost falls while marginal cost is below it and rises while marginal cost is above it.',
  sol: 'Both are true and R explains A. The marginal cost curve changes from below to above the average at the point where the average stops falling and starts rising, which is the minimum.',
}));
Q('ar_short_run', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: 'In the short run Karwan workshop can vary the quantity of every input it uses.',
  r: 'In the short run at least one factor of production is fixed.',
  sol: 'A is false and R is true. If at least one factor is fixed, not every input can be varied; the ability to vary all inputs describes the long run.',
}));
Q('ar_tp_fall', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The total product curve of Inkwell Press can slope downward after some number of operators.',
  r: 'Marginal product can never be negative.',
  sol: 'A is true and R is false. Marginal product becomes negative when an extra operator reduces output, and then the total product curve slopes downward.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_mp_neg', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: `In Meena's bakery the seventh baker has a negative marginal product (${BK.mp[7]}) while total product (${BK.tp[7]} dozen loaves) is still positive.`,
  sol: 'Negative marginal product only means that total product has fallen; the total can remain positive.',
}));
Q('tf_tc_fall', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'Total cost of the Kesari Jam Works can fall when it produces one more jar of jam.',
  sol: 'Producing more needs more variable inputs, so total variable cost rises, and total cost does too. Marginal cost is therefore positive and total cost never falls as output rises.',
}));
Q('fb_tc', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Total cost is the sum of total fixed cost and total ___ cost.',
  acc: [['variable']],
  sol: 'Total cost equals total fixed cost plus total variable cost.',
}));
Q('fb_mp', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The marginal product of labour is the change in ___ product divided by the change in the number of workers.',
  acc: [['total']],
  sol: 'Marginal product is the change in total product per extra worker.',
}));
Q('mt_cost', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each imagined cost of Karwan chair workshop with its type.',
  pairs: [
    ['Rent of the shed', 'Fixed cost'],
    ['Salary of the permanent manager', 'Fixed cost, paid whatever the output'],
    ['Wood for the chairs', 'Variable cost'],
    ['Wages of casual workers hired by the day', 'Variable cost, changes with output'],
  ],
  sol: 'Rent and the permanent salary are paid whatever the output, so they are fixed; wood and casual wages move with output, so they are variable.',
}));
Q('mt_curve', match({
  t: 2, d: 3, c: 'understanding',
  stem: 'Match each curve of a firm with its shape.',
  pairs: [
    ['Total fixed cost', 'Horizontal straight line'],
    ['Average fixed cost', 'Falling curve, a rectangular hyperbola'],
    ['Average variable cost', 'U-shaped curve'],
    ['Marginal product of labour', 'Rises, then falls and may turn negative'],
  ],
  sol: 'Fixed cost is the same at all outputs, per-unit fixed cost keeps falling, per-unit variable cost falls and then rises, and marginal product follows the three phases.',
}));
Q('ord_phases', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'As more and more workers are added to the fixed 4 hectares of Hariyali Farm, arrange the phases in the order in which they occur.',
  items: [
    'Marginal product rises: increasing returns',
    'Marginal product falls but stays positive: diminishing returns',
    'Marginal product is zero and total product is at its peak',
    'Marginal product is negative: negative returns',
  ],
  sol: 'Marginal product first rises, then falls while still positive, then reaches zero at the peak of total product and finally turns negative.',
}));
Q('ord_cost', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of finding the average cost of the 5th cake at the imagined Gulmohar Bakery from its total variable cost.',
  items: [
    'Read the total variable cost of 5 cakes',
    'Add the total fixed cost to get total cost',
    'Divide the total cost by 5 cakes',
    'Check that average cost equals average fixed cost plus average variable cost',
  ],
  sol: 'Total cost is found first, then divided by the output, and the result is checked against the sum of the two per-unit costs.',
}));

// ---------------------------------------------------------------- numericals (values computed, never typed)
Q('n_hf_mp3', num({
  t: 1, d: 1, c: 'application', value: HF.mp[3], unit: 'quintals', tol: 0,
  stem: `Hariyali Farm in the imagined village of Sarangpur has ${sHF}. Find the marginal product of the 3rd worker.`,
  sol: `Marginal product = change in total product = ${HF.tp[3]} − ${HF.tp[2]} = **${HF.mp[3]}** quintals.`,
}));
Q('n_hf_ap6', num({
  t: 1, d: 1, c: 'application', value: HF.ap[6], unit: 'quintals', tol: 0,
  stem: `Using the Hariyali Farm schedule (${sHF}), find the average product when 6 workers are employed.`,
  sol: `Average product = total product ÷ workers = ${HF.tp[6]} ÷ 6 = **${HF.ap[6]}** quintals.`,
}));
Q('n_hf_mp9', num({
  t: 1, d: 2, c: 'application', value: HF.mp[9], unit: 'quintals', tol: 0,
  stem: `On Hariyali Farm (${sHF}), what is the marginal product of the 9th worker? Give the sign.`,
  sol: `Marginal product = ${HF.tp[9]} − ${HF.tp[8]} = **${HF.mp[9]}** quintals; the negative sign shows that total product falls.`,
}));
Q('n_pr_tp', num({
  t: 1, d: 3, c: 'application', value: PR.tp[6], unit: 'thousand sheets', tol: 0,
  stem: `The imagined Inkwell Press has one printing machine. The marginal products of its 1st to 8th operators are ${J(PRmp)} thousand sheets per shift. Find the total product when 6 operators work.`,
  sol: `Total product is the sum of the marginal products of the first 6 operators: ${PRmp.slice(0, 6).join(' + ')} = **${PR.tp[6]}** thousand sheets.`,
}));
Q('n_pr_zero', num({
  t: 1, d: 3, c: 'application', value: PR.mp.indexOf(0), unit: 'operators', tol: 0,
  stem: `The marginal products of the 1st to 8th operators of Inkwell Press are ${J(PRmp)} thousand sheets. For how many operators is total product at its highest, with the marginal product equal to zero?`,
  sol: `The marginal product of the operator numbered ${PR.mp.indexOf(0)} is 0, and total product stops rising there (${PR.tp[6]} to ${PR.tp[7]}). The answer is **${PR.mp.indexOf(0)}** operators.`,
}));
Q('n_bk_ap', num({
  t: 1, d: 3, c: 'application', value: BK.ap[5], unit: 'dozen loaves', tol: 0,
  stem: `Meena's bakery has total product of ${J(BK.tp)} dozen loaves for 0, 1, 2 … ${BK.n} bakers. Find the average product with 5 bakers.`,
  sol: `Average product = ${BK.tp[5]} ÷ 5 = **${BK.ap[5]}** dozen loaves.`,
}));
Q('n_ch_tc5', num({
  t: 2, d: 2, c: 'application', value: CH.tc[5], unit: 'Rs', tol: 0,
  stem: `Karwan chair workshop has a ${sCH}. Its total variable cost for 5 chairs is ${inr(CH.tvc[5])}. Find the total cost of making 5 chairs.`,
  sol: `Total cost = total fixed cost + total variable cost = ${CH.TFC} + ${CH.tvc[5]} = **Rs ${CH.tc[5]}**.`,
}));
Q('n_ch_afc6', num({
  t: 2, d: 2, c: 'application', value: CH.afc[6], unit: 'Rs', tol: 0,
  stem: `The Karwan workshop pays a fixed cost of ${inr(CH.TFC)} a week. Find its average fixed cost per chair when it makes 6 chairs a week.`,
  sol: `Average fixed cost = total fixed cost ÷ output = ${CH.TFC} ÷ 6 = **Rs ${CH.afc[6]}**.`,
}));
Q('n_ch_avc7', num({
  t: 2, d: 3, c: 'application', value: CH.avc[7], unit: 'Rs', tol: 0,
  stem: `The total variable cost of making 7 chairs at the Karwan workshop is ${inr(CH.tvc[7])}. Find the average variable cost per chair.`,
  sol: `Average variable cost = ${CH.tvc[7]} ÷ 7 = **Rs ${CH.avc[7]}**.`,
}));
Q('n_ch_mc6', num({
  t: 2, d: 3, c: 'application', value: CH.mc[6], unit: 'Rs', tol: 0,
  stem: `When Karwan workshop raises output from 5 to 6 chairs, total variable cost rises from ${inr(CH.tvc[5])} to ${inr(CH.tvc[6])}. Find the marginal cost of the 6th chair.`,
  sol: `Marginal cost = change in total variable cost ÷ change in output = (${CH.tvc[6]} − ${CH.tvc[5]}) ÷ 1 = **Rs ${CH.mc[6]}**. Fixed cost does not change, so using total cost gives the same value.`,
}));
Q('n_gb_ac5', num({
  t: 2, d: 3, c: 'application', value: GB.ac[5], unit: 'Rs', tol: 0,
  stem: `Gulmohar Bakery has a total fixed cost of ${inr(GB.TFC)} a day. Its average fixed cost for 5 cakes is ${inr(GB.afc[5])} and its average variable cost is ${inr(GB.avc[5])}. Find its average cost per cake.`,
  sol: `Average cost = average fixed cost + average variable cost = ${GB.afc[5]} + ${GB.avc[5]} = **Rs ${GB.ac[5]}**. As a check, total cost ${GB.tc[5]} ÷ 5 gives the same value.`,
}));
Q('n_jm_mc4', num({
  t: 2, d: 3, c: 'application', value: JM.mc[4], unit: 'Rs', tol: 0,
  stem: `The imagined Kesari Jam Works has a total cost of ${inr(JM_TC[3])} for 3 hundred jars and ${inr(JM_TC[4])} for 4 hundred jars. Find the marginal cost of the fourth hundred jars.`,
  sol: `Marginal cost = change in total cost = ${JM_TC[4]} − ${JM_TC[3]} = **Rs ${JM.mc[4]}**.`,
}));
Q('n_jm_ac3', num({
  t: 2, d: 3, c: 'application', value: JM.ac[3], unit: 'Rs', tol: 0,
  stem: `Kesari Jam Works has a total cost of ${J(JM_TC)} (rupees) for 0, 1, 2 … ${JM_TC.length - 1} hundred jars a day. Find the average cost of 3 hundred jars.`,
  sol: `Average cost = total cost ÷ output = ${JM_TC[3]} ÷ 3 = **Rs ${JM.ac[3]}**.`,
}));
Q('n_jm_tvc4', num({
  t: 2, d: 4, c: 'application', value: JM.tvc[4], unit: 'Rs', tol: 0,
  stem: `The imagined Kesari Jam Works has a total cost of ${J(JM_TC)} (rupees) for 0, 1, 2 … ${JM_TC.length - 1} hundred jars a day. Find the total variable cost of 4 hundred jars.`,
  sol: `At zero output total cost is ${JM_TC[0]}, which is the total fixed cost. Total variable cost = ${JM_TC[4]} − ${JM_TC[0]} = **Rs ${JM.tvc[4]}**.`,
}));
Q('n_miss_tbl', num({
  t: 2, d: 4, c: 'application', value: CH.avc[6], unit: 'Rs', tol: 0,
  stem: `Part of the weekly cost schedule of the Karwan workshop (rupees) is shown. Find the missing average variable cost of making 6 chairs.\n\n| Chairs | TVC | AVC | AFC | AC |\n|---|---|---|---|---|\n| 4 | ${CH.tvc[4]} | ${CH.avc[4]} | ${CH.afc[4]} | ${CH.ac[4]} |\n| 6 | ${CH.tvc[6]} | ? | ${CH.afc[6]} | ${CH.ac[6]} |`,
  sol: `Average cost = average fixed cost + average variable cost, so average variable cost = ${CH.ac[6]} − ${CH.afc[6]} = **Rs ${CH.avc[6]}**. As a check, ${CH.tvc[6]} ÷ 6 gives the same value.`,
}));

// ---------------------------------------------------------------- short answers, 2 marks
Q('s2_pf', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define the production function and write it for a firm that uses labour and land to make wheat.',
  model: 'A production function is the technical relationship between the physical inputs used and the maximum output that can be obtained from them. For the wheat firm it can be written as q = f(L, K), where q is wheat, L is labour and K stands for land and other capital.',
  sol: 'Definition and the form q = f(L, K).',
  scheme: [['Production function defined', 1], ['Written as q = f(L, K) with the symbols explained', 1]],
}));
Q('s2_sr_lr', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish the short run from the long run in production, with one example from the imagined Karwan chair workshop.',
  model: 'In the short run at least one factor, such as the size of the shed, cannot be changed, so output is changed only by varying other inputs like labour and wood. In the long run all factors, including the shed and the machines, can be varied.',
  sol: 'Short run: one fixed factor; long run: all variable.',
  scheme: [['Short run: at least one fixed factor', 1], ['Long run: all factors variable, with an example', 1]],
}));
Q('s2_ap_mp', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Write the formulae for average product and marginal product of labour and state how they differ.',
  model: 'Average product equals total product over the number of workers, so it is output per worker. Marginal product equals the change in total product over the change in workers, that is, the addition made by one more worker. Average product describes workers on the whole, marginal product describes the last worker.',
  sol: 'AP and MP formulae with the contrast.',
  scheme: [['Average product formula', 1], ['Marginal product formula and the difference', 1]],
}));
Q('s2_phase3', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does total product of Inkwell Press fall when too many operators are employed on its single machine?',
  model: 'Too many operators crowd the single machine, get in one another’s way and lose time waiting. The extra operator therefore reduces output instead of adding to it, so marginal product becomes negative and total product falls.',
  sol: 'Crowding of the fixed machine gives negative marginal product.',
  scheme: [['Overcrowding of the fixed factor', 1], ['Negative marginal product, so total product falls', 1]],
}));
Q('s2_fixed_var', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are fixed and variable costs? Give one imagined example of each from Gulmohar Bakery.',
  model: 'Fixed costs are costs that do not change with output in the short run, such as the rent of the shop. Variable costs change with output, such as the cost of flour, which rises as more cakes are baked.',
  sol: 'Definitions with examples.',
  scheme: [['Fixed cost defined with an example', 1], ['Variable cost defined with an example', 1]],
}));
Q('s2_mc_def', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define marginal cost and explain why it can be found from either total cost or total variable cost.',
  model: 'Marginal cost is the addition to total cost when one more unit of output is produced. Total cost is fixed cost plus variable cost and the fixed part does not change with output, so the change in total cost always equals the change in total variable cost.',
  sol: 'Marginal cost definition; fixed cost does not change.',
  scheme: [['Marginal cost defined', 1], ['Fixed cost constant, so the two changes are equal', 1]],
}));
Q('s2_afc', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does the average fixed cost of the Karwan workshop fall as it makes more chairs, and why can it never become zero?',
  model: 'Average fixed cost is total fixed cost divided by the number of chairs. The fixed cost stays the same while output grows, so each chair carries a smaller share. It cannot be zero, because a positive fixed cost divided by any output is still positive.',
  sol: 'Constant total divided by growing output.',
  scheme: [['Fixed cost spread over more chairs', 1], ['Never zero because the total is positive', 1]],
}));
Q('s2_tc_rel', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Show that total cost, total fixed cost and total variable cost are related by an equation, using the Kesari Jam Works at 4 hundred jars.',
  model: `Total cost equals total fixed cost plus total variable cost. At 4 hundred jars total fixed cost is ${inr(JM.TFC)} and total variable cost is ${inr(JM.tvc[4])}, so total cost is ${inr(JM.tc[4])}, which matches the schedule.`,
  sol: `${JM.TFC} + ${JM.tvc[4]} = ${JM.tc[4]}.`,
  scheme: [['Relation stated', 1], ['Values substituted correctly', 1]],
}));
Q('s2_dim_reason', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give the reason why marginal product of workers on Hariyali Farm begins to fall after the third worker.',
  model: 'Land is fixed. After the third worker the farm no longer has idle land, so each additional worker has less land to work on than the earlier ones and adds less to output. This is the law of diminishing returns to a factor.',
  sol: 'Fixed land shared among more workers.',
  scheme: [['Fixed land no longer under-used', 1], ['Each worker adds less: diminishing returns', 1]],
}));
Q('s2_gap', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Explain, with figures from the Karwan schedule, why the gap between average cost and average variable cost narrows as output rises from 2 to 8 chairs.`,
  model: `The gap is average fixed cost. It falls from ${inr(CH.afc[2])} at 2 chairs to ${inr(CH.afc[8])} at 8 chairs because the same total fixed cost is shared over more chairs, so the two curves move closer but never meet.`,
  sol: `${CH.ac[2]} − ${CH.avc[2]} = ${CH.afc[2]} and ${CH.ac[8]} − ${CH.avc[8]} = ${CH.afc[8]}.`,
  scheme: [['Gap identified as average fixed cost', 1], ['Fall shown with figures and reason', 1]],
}));

// ---------------------------------------------------------------- short answers, 3 marks
Q('s3_phase1', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain the phase of increasing returns to a factor, using the first ${HF.k1} workers of Hariyali Farm, and give one reason for it.`,
  model: `Increasing returns means that marginal product rises as workers are added. On the farm it rises from ${HF.mp[1]} to ${HF.mp[2]} to ${HF.mp[3]} quintals for the first three workers. The reason is that the fixed land is under-used at first, and more workers allow tasks to be divided and the land to be used better.`,
  sol: 'Rising marginal product, with figures and the reason.',
  scheme: [['Marginal product rises, defined', 1], ['Figures from the schedule', 1], ['Reason: fixed factor under-used, division of tasks', 1]],
}));
Q('s3_apmp', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `Using the Hariyali Farm schedule (${sHF}), explain the relation between average product and marginal product: compare them for the 3rd and 5th workers.`,
  model: `For the 3rd worker the marginal product ${HF.mp[3]} is above the average ${HF.ap[3]}, so the average has risen from ${HF.ap[2]}. At the 4th worker both equal ${HF.ap[4]}, the highest average. For the 5th worker the marginal product ${HF.mp[5]} is below the average ${HF.ap[5]}, which has fallen below ${HF.ap[4]}.`,
  sol: 'MP above AP: AP rises; equal at the top; below: AP falls.',
  scheme: [['MP above AP while AP rises (3rd worker)', 1], ['MP equals AP at the top of AP (4th worker)', 1], ['MP below AP while AP falls (5th worker)', 1]],
}));
Q('s3_mcavc', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain, with the imagined Kesari Jam Works in mind, why the marginal cost curve cuts the average variable cost curve at its lowest point.',
  model: `Average variable cost falls whenever the marginal cost of an extra unit is below it, because the cheaper unit pulls the average down. It rises whenever marginal cost is above it. At the jam works marginal cost ${JM.mc[4]} equals average variable cost ${JM.avc[4]} at 4 hundred jars, the lowest average. So the curve crosses at the minimum.`,
  sol: 'Below pulls down, above pushes up, crossing at the minimum.',
  scheme: [['Marginal below average: average falls', 1], ['Marginal above average: average rises', 1], ['Crossing at the minimum, with the figure', 1]],
}));
Q('s3_gb_missing', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Gulmohar Bakery has a total fixed cost of ${inr(GB.TFC)} a day. Its total variable cost of 4 cakes is ${inr(GB.tvc[4])}. Find its total cost, average fixed cost and average variable cost for 4 cakes. Then say whether average cost is rising or falling at 4 cakes compared with 3 cakes, whose average cost is ${inr(GB.ac[3])}.`,
  model: `Total cost is ${GB.TFC} plus ${GB.tvc[4]}, which is ${inr(GB.tc[4])}. Average fixed cost is ${GB.TFC} divided by 4, which is ${inr(GB.afc[4])}, and average variable cost is ${GB.tvc[4]} divided by 4, which is ${inr(GB.avc[4])}. Average cost is ${inr(GB.ac[4])}, below ${inr(GB.ac[3])}, so it is falling.`,
  sol: `TC ${GB.tc[4]}; AFC ${GB.afc[4]}; AVC ${GB.avc[4]}; AC ${GB.ac[4]} < ${GB.ac[3]}.`,
  scheme: [['Total cost', 1], ['Average fixed cost and average variable cost', 1], ['Average cost compared with 3 cakes', 1]],
}));
Q('s3_mc_calc', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `A potter in the imagined village of Kumbhar Pur has total variable cost of ${inr(GB.tvc[2])} for 2 pots and ${inr(GB.tvc[3])} for 3 pots, with total fixed cost of ${inr(GB.TFC)}. Find the marginal cost of the 3rd pot and the average cost of 3 pots, and say which is lower.`,
  model: `Marginal cost of the third pot is ${GB.tvc[3]} minus ${GB.tvc[2]}, which is ${inr(GB.mc[3])}. Total cost of 3 pots is ${GB.TFC} plus ${GB.tvc[3]}, which is ${inr(GB.tc[3])}, so average cost is ${inr(GB.tc[3])} divided by 3, which is ${inr(GB.ac[3])}. Marginal cost is lower.`,
  sol: `MC ${GB.mc[3]}; AC ${GB.ac[3]}; MC lower.`,
  scheme: [['Marginal cost of the 3rd pot', 1], ['Average cost of 3 pots', 1], ['Comparison stated', 1]],
}));
Q('s3_fv_dist', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish total fixed cost from total variable cost on three points, with imagined examples from a tailoring shop.',
  model: 'Fixed cost is incurred even at zero output, while variable cost is zero at zero output. Fixed cost stays the same as output changes, while variable cost rises with output. Fixed cost, such as the rent of the shop, forms a horizontal line on a graph, while variable cost, such as cloth and thread, forms a curve rising from the origin.',
  sol: 'Zero output, change with output, shape.',
  scheme: [['Cost at zero output', 1], ['Change with output', 1], ['Examples and shape', 1]],
}));

// ---------------------------------------------------------------- long answers, 5 marks
Q('l_lvp', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `State the law of variable proportions and describe its three phases for Hariyali Farm, whose marginal product is ${J(HF.mp.slice(1))} quintals for the 1st to ${HF.n}th worker.`,
  model: `The law says that when a variable factor is added to fixed factors, output first rises at an increasing rate, then at a diminishing rate, and may finally fall. On the farm, workers 1 to ${HF.k1} give increasing returns as marginal product rises to ${HF.mpMax}. Workers ${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]} give diminishing returns, with marginal product falling to ${HF.mp[8]}. From worker ${HF.ph.iii[0]} marginal product is negative and total product falls.`,
  sol: 'Law stated; three phases with figures.',
  scheme: [['Law stated', 1], ['Increasing returns with figures', 1.5], ['Diminishing returns with figures', 1.5], ['Negative returns with figures', 1]],
}));
Q('l_apmp', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: "Explain the shapes of the average product and marginal product curves and the relationship between them, using Meena's bakery in your answer.",
  model: `Both curves rise at first and then fall, so each is inverted U-shaped. Marginal product peaks first, at ${BK.mpMax} dozen loaves for the third baker. While marginal product is above average product, the average rises. At the fourth baker both are ${BK.ap[4]}, the top of the average curve, so the marginal curve cuts the average curve there. Afterwards marginal product is below the average, which falls. Marginal product can fall below zero, as for the seventh baker, but average product stays positive.`,
  sol: 'Shapes, peak order, crossing, negative marginal product.',
  scheme: [['Shapes of both curves', 1], ['Marginal above average, average rising', 1.5], ['Equality at the top of average product', 1], ['Marginal below average, average falling', 1], ['Marginal product can be negative, average cannot', 0.5]],
}));
Q('l_fvt', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the total fixed cost, total variable cost and total cost curves of the Karwan workshop, whose fixed cost is ${inr(CH.TFC)} a week.`,
  model: `Total fixed cost is a horizontal line at ${inr(CH.TFC)}, since it does not change with output. Total variable cost starts at the origin, because nothing is spent on wood and casual labour when no chair is made, and rises with output. Total cost is the sum of the two, so it starts at ${inr(CH.TFC)} on the vertical axis and runs parallel to the variable cost curve, always ${inr(CH.TFC)} above it.`,
  sol: 'Shapes and relation of the three curves.',
  scheme: [['Total fixed cost: horizontal, with reason', 1.5], ['Total variable cost: from the origin, rising', 1.5], ['Total cost: starts at fixed cost, parallel to variable cost', 2]],
}));
Q('l_uni', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the shapes of the average fixed cost, average variable cost, average cost and marginal cost curves, and where the marginal cost curve meets the other two.',
  model: 'Average fixed cost falls throughout, because the fixed cost is spread over more units. Average variable cost, average cost and marginal cost are U-shaped, because returns to the variable factor first increase and then diminish. Marginal cost cuts average variable cost and average cost at their lowest points, being below each while it falls and above it while it rises. Average cost is the sum of average fixed and average variable cost, so its minimum comes at a larger output than the minimum of average variable cost.',
  sol: 'Four shapes and the minima.',
  scheme: [['Average fixed cost falls throughout', 1], ['U shape of the other three with the reason', 1.5], ['Marginal cost cuts average variable cost at its minimum', 1], ['Marginal cost cuts average cost at its minimum', 1], ['Average cost minimum comes later', 0.5]],
}));
Q('l_fill', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Gulmohar Bakery has a total fixed cost of ${inr(GB.TFC)}. Its total variable cost for 1 to 6 cakes is ${J(GB.tvc.slice(1))}. Find the total cost, marginal cost and average cost at 3 cakes and at 6 cakes, and state whether average cost has risen or fallen between them.`,
  model: `At 3 cakes total cost is ${GB.TFC} plus ${GB.tvc[3]}, which is ${inr(GB.tc[3])}, and average cost is ${inr(GB.ac[3])}. Marginal cost is ${GB.tvc[3]} minus ${GB.tvc[2]}, which is ${inr(GB.mc[3])}. At 6 cakes total cost is ${inr(GB.tc[6])}, marginal cost is ${inr(GB.mc[6])} and average cost is ${inr(GB.ac[6])}. Average cost has fallen from ${GB.ac[3]} to ${GB.ac[6]}, although it was lower still at 5 cakes, at ${GB.ac[5]}, because the marginal cost of the 6th cake, ${GB.mc[6]}, is above the average cost of 5 cakes. Each figure follows from the schedule.`,
  sol: 'Computations at 3 and 6 cakes, then comparison.',
  scheme: [['Total cost at 3 and 6 cakes', 1], ['Marginal cost at 3 and 6 cakes', 1.5], ['Average cost at 3 and 6 cakes', 1.5], ['Comparison stated', 1]],
}));
Q('l_pr', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Inkwell Press has marginal products ${J(PRmp)} thousand sheets for its 1st to 8th operators. Find total product and average product for the first 4 operators, and identify the three phases by operators.`,
  model: `Total product for 1 to 4 operators is ${J(PR.tp.slice(1, 5))} thousand sheets, and average product is ${J(PR.ap.slice(1, 5))}. Marginal product rises up to the 3rd operator, which is the phase of increasing returns. From the 4th to the 7th operator it falls but stays at or above zero, giving diminishing returns. The 8th operator has a negative marginal product, so total product falls: negative returns.`,
  sol: 'Cumulative TP, AP, then phases.',
  scheme: [['Total product for 4 operators', 1.5], ['Average product for 4 operators', 1], ['Increasing returns identified', 0.5], ['Diminishing returns identified', 1], ['Negative returns identified', 1]],
}));

// ---------------------------------------------------------------- case-based (imagined passages)
Q('cb_hariyali', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined wheat output of Hariyali Farm, Sarangpur**\n\nThe farm has 4 hectares of land, which cannot be increased this season. The number of workers is varied, and ${sHF}.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the marginal product of the 5th worker.', model: `${HF.tp[5]} − ${HF.tp[4]} = **${HF.mp[5]}** quintals.`, sol: `MP ${HF.mp[5]}.`, scheme: [['Correct marginal product', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'For how many workers does the farm get the highest total product, and what is that total?', model: `The highest total is **${HF.tpMax} quintals**, reached with ${HF.tpMaxAt} workers and again at 8 workers, where the marginal product is zero.`, sol: `Highest total ${HF.tpMax}.`, scheme: [['Highest total product with workers', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): The farm owner hires a 9th worker. Using the schedule, explain whether this is advisable and name the phase.', model: `The 9th worker has marginal product ${HF.mp[9]}, so total product falls from ${HF.tp[8]} to ${HF.tp[9]}. Hiring is not advisable, since output falls while a wage is paid. This is the phase of negative returns.`, sol: 'Negative marginal product.', scheme: [['Marginal product of the 9th worker and fall in total product', 1], ['Phase named with advice', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the marginal product of workers falls after the 3rd worker although the farm still makes more wheat with each new worker up to the 7th.', model: 'After the third worker the fixed land is fully used. Each new worker has less land to work on, so the addition to output becomes smaller. Total product still rises while marginal product is positive, which is diminishing returns.', sol: 'Diminishing returns on fixed land.', scheme: [['Fixed land shared among more workers', 1], ['Marginal product falls while staying positive', 1]] }),
    ]),
  ],
}));
Q('cb_karwan', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined weekly costs of the Karwan chair workshop**\n\nThe workshop pays rent for its shed and salaries of permanent staff, together ${inr(CH.TFC)} a week. Its wood and casual labour make the total variable cost, which is ${inr(CH.tvc[4])} for 4 chairs and ${inr(CH.tvc[5])} for 5 chairs.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the total cost of 5 chairs.', model: `${CH.TFC} + ${CH.tvc[5]} = **Rs ${CH.tc[5]}**.`, sol: `TC ${CH.tc[5]}.`, scheme: [['Correct total cost', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the marginal cost of the 5th chair.', model: `${CH.tvc[5]} − ${CH.tvc[4]} = **Rs ${CH.mc[5]}**.`, sol: `MC ${CH.mc[5]}.`, scheme: [['Correct marginal cost', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Find the average variable cost at 4 and at 5 chairs, and say what it shows about the marginal cost of the 5th chair.', model: `Average variable cost is ${CH.tvc[4]} ÷ 4 = ${CH.avc[4]} at 4 chairs and ${CH.tvc[5]} ÷ 5 = ${CH.avc[5]} at 5 chairs. It stays the same, because the marginal cost of the 5th chair, ${CH.mc[5]}, equals the average. This is where marginal cost cuts average variable cost at its lowest point.`, sol: 'AVC unchanged; MC equals AVC at the minimum.', scheme: [['Both averages computed', 1], ['Link with marginal cost at the minimum', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Find the average fixed cost at 4 and at 5 chairs and explain the change.', model: `Average fixed cost is ${CH.TFC} ÷ 4 = ${CH.afc[4]} at 4 chairs and ${CH.TFC} ÷ 5 = ${CH.afc[5]} at 5 chairs. It falls because the same fixed cost is shared among more chairs.`, sol: 'AFC falls: same total, more units.', scheme: [['Both values computed', 1], ['Reason for the fall', 1]] }),
    ]),
  ],
}));
Q('cb_gulmohar', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined cost schedule of Gulmohar Bakery**\n\nThe bakery has a total fixed cost of ${inr(GB.TFC)} a day. Its total variable cost is ${J(GB.tvc.slice(1))} (rupees) for 1 to ${GB.n} cakes.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the marginal cost of the 4th cake.', model: `${GB.tvc[4]} − ${GB.tvc[3]} = **Rs ${GB.mc[4]}**.`, sol: `MC ${GB.mc[4]}.`, scheme: [['Correct marginal cost', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the average cost of 4 cakes.', model: `Total cost ${GB.TFC} + ${GB.tvc[4]} = ${GB.tc[4]}; ${GB.tc[4]} ÷ 4 = **Rs ${GB.ac[4]}**.`, sol: `AC ${GB.ac[4]}.`, scheme: [['Correct average cost', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): At which number of cakes is average variable cost lowest, and what is the marginal cost there compared with it?', model: `Average variable cost is lowest at 3 cakes, ${inr(GB.avc[3])}. The marginal cost of the 3rd cake is ${inr(GB.mc[3])}, below the average, which is why average variable cost is still falling there. It rises from the 4th cake, whose marginal cost ${inr(GB.mc[4])} is above it.`, sol: 'Lowest at 3 cakes; MC below then above.', scheme: [['Lowest average variable cost located', 1], ['Marginal cost compared', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): At which output does average cost reach its lowest value, and why does it do so later than average variable cost?', model: `Average cost is lowest at 5 cakes, ${inr(GB.ac[5])}, and then rises to ${inr(GB.ac[6])}. Average fixed cost is still falling when average variable cost starts to rise, so the sum keeps falling for longer.`, sol: 'AC lowest at 5 cakes; AFC keeps falling.', scheme: [['Lowest average cost located', 1], ['Reason: average fixed cost still falling', 1]] }),
    ]),
  ],
}));
Q('cb_inkwell', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined shifts of Inkwell Press**\n\nInkwell Press has a single printing machine, which is its fixed factor. As operators are added, the marginal product of the 1st to 8th operators is ${J(PRmp)} thousand sheets per shift.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the total product when 3 operators work.', model: `${PRmp[0]} + ${PRmp[1]} + ${PRmp[2]} = **${PR.tp[3]}** thousand sheets.`, sol: `TP ${PR.tp[3]}.`, scheme: [['Correct total product', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Find the average product of 4 operators.', model: `${PR.tp[4]} ÷ 4 = **${PR.ap[4]}** thousand sheets.`, sol: `AP ${PR.ap[4]}.`, scheme: [['Correct average product', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Show that marginal product equals average product at 4 operators and explain why this happens at the top of the average product curve.', model: `The marginal product of the 4th operator is ${PRmp[3]}, which equals the average product ${PR.ap[4]}, the same as for 3 operators. The average product was rising while marginal product was above it, and begins to fall once marginal product goes below it, so the two meet at the top.`, sol: 'MP equals AP at the top of AP.', scheme: [['Equality shown with figures', 1], ['Explanation of the meeting point', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the phase for operators 4 to 7 and for the 8th operator, with a reason for each.', model: 'Operators 4 to 7 are in diminishing returns, because marginal product falls but stays at or above zero. The 8th operator is in negative returns, because the marginal product is below zero and total product falls.', sol: 'Diminishing returns, then negative returns.', scheme: [['Diminishing returns for 4 to 7 with reason', 1], ['Negative returns for the 8th with reason', 1]] }),
    ]),
  ],
}));
