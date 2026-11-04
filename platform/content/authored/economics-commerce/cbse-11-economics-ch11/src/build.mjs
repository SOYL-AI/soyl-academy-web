// Build CBSE 11 Economics ch11 The Theory of the Firm under Perfect Competition. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { check, rnd, elasticitySupply } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch11', 'economics-commerce');
const Qs = await import('./questions.mjs');
const { J, inr, WF, WF2, ON, DC, KP, E70, E80, E90, E100, E120, E140, E160, DCS, esDC, P70, P90, P40, MP, KA, KB, KC, MS, MS4, KD, MStax, MSsub, esKA, esKA2, esMS, esMS2, ESC } = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r2 = (x) => rnd(x, 2);
const pct = (a, b) => rnd(((b - a) / a) * 100, 2);

// ---------------------------------------------------------------- figures pinned (stated in prose)
check(WF.tr[6], 12000, 0, 'wheat TR of six quintals');
check(WF.ar[3], 2000, 0, 'wheat AR');
check(DC.tc[8], 980, 0, 'candle TC at 8 hundred');
check(DC.ac[8], 122.5, 6, 'candle AC at 8 hundred');
check(E140.tr[8], 1120, 0, 'candle TR at 8 hundred at price 140');
check(DC.avc[3], 83.33, 2, 'candle AVC at 3 hundred');
check(DC.ac[6], 120, 6, 'candle AC at 6 hundred');
check(E90.profit[5], -170, 6, 'candle profit at 5 hundred at price 90');
check(esMS, 7, 6, 'market elasticity');
check(MS[4] - MS4[4], -KD[4], 6, 'fourth kiln adds six');

// ---------------------------------------------------------------- SVG helpers
const mkPoly = (s) => (c, pts, o) => s.polyline(pts.map(([x, y]) => [c.X(x), c.Y(y)]), o);
const cq = DC.q.slice(1);

// ---------------------------------------------------------------- SVG 1: total revenue of a price taker
const vTR = (() => {
  const s = new Svg(640, 430);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 7, y0: 0, y1: 16000, left: 80, top: 30, width: 470, height: 320, xLabel: 'Quintals of wheat sold', yLabel: 'Total revenue (Rs)' });
  pl(c, WF2.q.map((q) => [q, WF2.tr[q]]), { color: 'blue', sw: 2.4, dash: true });
  pl(c, WF.q.map((q) => [q, WF.tr[q]]), { color: 'accent', sw: 2.8 });
  WF.q.slice(1).forEach((q) => c.dot([q, WF.tr[q]], 'accent'));
  [5000, 10000, 15000].forEach((y) => c.yTick(y, String(y)));
  WF.q.slice(1).forEach((q) => c.xTick(q, String(q)));
  c.label([6.1, WF.tr[6]], `TR at Rs ${WF.p}`, { color: 'accent', bold: true, anchor: 'start', size: 12 });
  c.label([6.1, WF2.tr[6]], `TR at Rs ${WF2.p}`, { color: 'blue', bold: true, anchor: 'start', size: 12 });
  return s.visual(
    `Graph of total revenue of Sukhdev's imagined wheat farm against quintals sold: a straight line from the origin to ${WF.tr[6]} rupees at ${WF.n} quintals when the price is ${WF.p} rupees, and a steeper straight line to ${WF2.tr[6]} rupees when the price is ${WF2.p} rupees`,
    `Imagined wheat farm. Total revenue at price ${WF.p}: ${J(WF.tr)}. At price ${WF2.p}: ${J(WF2.tr)}.`,
  );
})();

// ---------------------------------------------------------------- SVG 2: AR = MR is a horizontal line
const vARMR = (() => {
  const s = new Svg(640, 380);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 7, y0: 0, y1: 3500, left: 80, top: 30, width: 470, height: 290, xLabel: 'Quintals of wheat sold', yLabel: 'Price, AR and MR (Rs)' });
  pl(c, WF2.q.slice(1).map((q) => [q, WF2.ar[q]]), { color: 'blue', sw: 2.4, dash: true });
  pl(c, WF.q.slice(1).map((q) => [q, WF.ar[q]]), { color: 'accent', sw: 2.8 });
  WF.q.slice(1).forEach((q) => { c.dot([q, WF.ar[q]], 'accent'); c.xTick(q, String(q)); });
  c.yTick(WF.p, String(WF.p));
  c.yTick(WF2.p, String(WF2.p));
  c.yTick(1000, '1000');
  c.label([3.5, WF.p], `AR = MR = price = ${WF.p}`, { color: 'accent', bold: true, dy: 16, size: 12 });
  c.label([3.5, WF2.p], `AR = MR at price ${WF2.p}`, { color: 'blue', bold: true, dy: -14, size: 12 });
  return s.visual(
    `Graph with quintals of wheat on the horizontal axis and price on the vertical axis: for Sukhdev's imagined farm the average revenue and marginal revenue curves coincide in one horizontal line at the market price of ${WF.p} rupees, and a higher price of ${WF2.p} rupees gives a higher horizontal line`,
    `Imagined wheat farm. AR = ${J(WF.ar.slice(1))}; MR = ${J(WF.mr.slice(1))} (rupees) for 1 to ${WF.n} quintals.`,
  );
})();

// ---------------------------------------------------------------- SVG 3: producer's equilibrium MR = MC at price 140
const costCurves = (s, c, o = {}) => {
  const pl = mkPoly(s);
  pl(c, cq.map((q) => [q, DC.mc[q]]), { color: 'red', sw: 2.6 });
  pl(c, cq.map((q) => [q, DC.avc[q]]), { color: 'blue', sw: 2.6 });
  pl(c, cq.slice(1).map((q) => [q, DC.ac[q]]), { color: 'accent', sw: 2.6 });
  cq.forEach((q) => { c.dot([q, DC.mc[q]], 'red'); });
};
const vEq = (() => {
  const s = new Svg(640, 440);
  const c = s.chart({ x0: 0, x1: 12, y0: 0, y1: 240, left: 80, top: 30, width: 470, height: 340, xLabel: 'Hundred candles per day', yLabel: 'Rupees per hundred candles' });
  const q = E140.qStar;
  s.polygon([[c.X(0), c.Y(DC.ac[q])], [c.X(q), c.Y(DC.ac[q])], [c.X(q), c.Y(E140.P)], [c.X(0), c.Y(E140.P)]], { fill: 'green', fillOpacity: 0.22, stroke: false });
  costCurves(s, c);
  c.seg([0, E140.P], [12, E140.P], { color: 'green', sw: 2.4 });
  c.dot([q, E140.P], 'green');
  c.drop([q, E140.P]);
  c.label([q, E140.P], 'E', { bold: true, dx: 14, dy: -12 });
  c.label([q / 2, (DC.ac[q] + E140.P) / 2], 'Profit', { bold: true, size: 12 });
  [80, DC.ac[q], E140.P, 200].forEach((y) => c.yTick(y, String(y)));
  cq.forEach((x) => c.xTick(x, String(x)));
  c.label([9.5, E140.P + 12], `AR = MR = ${E140.P}`, { color: 'green', bold: true, anchor: 'start', size: 12 });
  c.label([9.2, DC.mc[9] + 14], 'MC', { color: 'red', bold: true, size: 12 });
  c.label([9.2, DC.ac[9] - 14], 'AC', { color: 'accent', bold: true, size: 12 });
  c.label([9.2, DC.avc[9] - 12], 'AVC', { color: 'blue', bold: true, size: 12 });
  return s.visual(
    `Graph of Diya Candles at a price of ${E140.P} rupees per hundred: the horizontal line of average revenue and marginal revenue cuts the rising marginal cost curve at the equilibrium point E at ${q} hundred candles, and the shaded rectangle between that price and the average cost of ${DC.ac[q]} is the profit of ${E140.best} rupees; the average cost and average variable cost curves are U-shaped`,
    `Imagined Diya Candles. MC: ${J(DC.mc.slice(1))}. At price ${E140.P}, MR = MC at ${q} hundred; AC there ${DC.ac[q]}; profit (${E140.P} − ${DC.ac[q]}) × ${q} = ${E140.best}. AC for 1 hundred (${DC.ac[1]}) lies above the scale.`,
  );
})();

// ---------------------------------------------------------------- SVG 4: shut-down point and break-even point
const vBE = (() => {
  const s = new Svg(640, 440);
  const c = s.chart({ x0: 0, x1: 12, y0: 0, y1: 240, left: 80, top: 30, width: 470, height: 340, xLabel: 'Hundred candles per day', yLabel: 'Rupees per hundred candles' });
  costCurves(s, c);
  const a = DC.acMeetQ;
  const v = DC.avcMeetQ;
  c.seg([0, DC.acLo], [12, DC.acLo], { color: 'accent', dash: true, sw: 1.4 });
  c.seg([0, DC.avcLo], [12, DC.avcLo], { color: 'blue', dash: true, sw: 1.4 });
  c.dot([a, DC.acLo], 'accent');
  c.dot([v, DC.avcLo], 'blue');
  c.drop([a, DC.acLo]);
  c.drop([v, DC.avcLo]);
  [DC.avcLo, DC.acLo, 200].forEach((y) => c.yTick(y, String(y)));
  cq.forEach((x) => c.xTick(x, String(x)));
  c.label([a - 0.2, DC.acLo + 34], 'Break-even point', { bold: true, anchor: 'end', size: 12 });
  c.label([a - 0.2, DC.acLo + 20], `MC = AC = ${DC.acLo}`, { anchor: 'end', size: 12 });
  c.label([10.6, DC.avcLo - 14], 'Shut-down point', { bold: true, anchor: 'end', size: 12 });
  c.label([10.6, DC.avcLo - 28], `MC = AVC = ${DC.avcLo}`, { anchor: 'end', size: 12 });
  c.label([9.2, DC.mc[9] + 14], 'MC', { color: 'red', bold: true, size: 12 });
  return s.visual(
    `Graph of Diya Candles: the marginal cost curve cuts the average cost curve at its lowest point, the break-even point at a price of ${DC.acLo} rupees and ${a} hundred candles, and cuts the average variable cost curve at its lowest point, the shut-down point at a price of ${DC.avcLo} rupees and ${v} hundred candles`,
    `Imagined Diya Candles. Minimum AC ${DC.acLo} at ${a} hundred (break-even price). Minimum AVC ${DC.avcLo} at ${v} hundred (shut-down price). AC for 1 hundred (${DC.ac[1]}) lies above the scale.`,
  );
})();

// ---------------------------------------------------------------- SVG 5: the firm's supply curve
const vSup = (() => {
  const s = new Svg(640, 420);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 11, y0: 0, y1: 200, left: 80, top: 30, width: 470, height: 320, xLabel: 'Hundred candles supplied per day', yLabel: 'Price (Rs per hundred)' });
  const v = DC.avcMeetQ;
  pl(c, cq.filter((q) => q <= v).map((q) => [q, DC.mc[q]]), { color: 'muted', sw: 2, dash: true });
  pl(c, cq.filter((q) => q >= v).map((q) => [q, DC.mc[q]]), { color: 'accent', sw: 3.2 });
  c.seg([0, 0], [0, DC.avcLo], { color: 'red', sw: 4 });
  c.seg([0, DC.avcLo], [v, DC.avcLo], { color: 'muted', dash: true, sw: 1.2 });
  DCS.forEach((x) => { c.dot([x.q, x.P], 'accent'); c.yTick(x.P, String(x.P)); c.xTick(x.q, String(x.q)); });
  c.label([0.3, 36], `No supply below ${DC.avcLo}`, { anchor: 'start', size: 12, color: 'red', bold: true });
  c.label([9.9, DC.mc[9] - 14], 'S = MC', { color: 'accent', bold: true, size: 12 });
  c.label([2.2, 120], 'MC below the shut-down point', { size: 12, muted: true, anchor: 'start' });
  return s.visual(
    `Graph of the supply curve of Diya Candles: price on the vertical axis and hundred candles on the horizontal axis; the supply curve is the rising part of the marginal cost curve from the shut-down price of ${DC.avcLo} rupees upwards, through the points ${DCS.map((x) => `${x.q} hundred at ${x.P} rupees`).join(', ')}, and nothing is supplied below ${DC.avcLo} rupees`,
    `Imagined Diya Candles. Supply schedule: price ${J(DCS.map((x) => x.P))}; quantity ${J(DCS.map((x) => x.q))}. Nothing is supplied at ${E70.P} or below.`,
  );
})();

// ---------------------------------------------------------------- SVG 6: market supply as a horizontal sum
const supPts = (xs, upto = 6) => {
  const pts = [];
  xs.slice(0, upto + 1).forEach((q, i) => { if (q > 0 || (xs[i + 1] > 0 && i + 1 <= upto)) pts.push([q, MP[i]]); });
  return pts;
};
const vMarket = (() => {
  const s = new Svg(640, 440);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 40, y0: 0, y1: 11000, left: 80, top: 30, width: 470, height: 340, xLabel: 'Thousand bricks per day', yLabel: 'Price (Rs per thousand bricks)' });
  const series = [['Anand Bricks', KA, 'blue', 2.2], ['Bhoomi Bricks', KB, 'green', 2.2], ['Chandra Bricks', KC, 'red', 2.2], ['Market supply', MS, 'accent', 3.2]];
  series.forEach(([, xs, col, sw]) => pl(c, supPts(xs), { color: col, sw }));
  const i = 4;
  c.seg([0, MP[i]], [MS[i], MP[i]], { color: 'muted', dash: true, sw: 1.2 });
  [KA[i], KB[i], MS[i]].forEach((q, k) => c.dot([q, MP[i]], ['blue', 'green', 'accent'][k]));
  [4000, 6000, 8000, 10000].forEach((y) => c.yTick(y, String(y)));
  [10, 20, 30].forEach((x) => c.xTick(x, String(x)));
  c.label([MS[i] + 0.8, MP[i] - 700], `At ${MP[i]}: ${KA[i]} + ${KB[i]} + ${KC[i]} = ${MS[i]}`, { anchor: 'start', size: 12, bold: true });
  series.forEach(([name, , col, sw], k) => {
    const y = 260 + k * 22;
    s.line(380, y, 410, y, { color: col, sw });
    s.text(418, y, name, { anchor: 'start', size: 12 });
  });
  return s.visual(
    `Graph of market supply of bricks in Dhanpur: three upward-sloping supply lines for Anand Bricks, Bhoomi Bricks and Chandra Bricks and a flatter market supply line, which is their horizontal sum; at ${MP[i]} rupees the kilns supply ${KA[i]}, ${KB[i]} and ${KC[i]} thousand bricks and the market supplies ${MS[i]} thousand`,
    `Imagined kilns. Price ${J(MP.slice(1, 7))}. Anand ${J(KA.slice(1, 7))}; Bhoomi ${J(KB.slice(1, 7))}; Chandra ${J(KC.slice(1, 7))}; market ${J(MS.slice(1, 7))}. At ${MP[i]}, Bhoomi and Chandra supply the same ${KB[i]}.`,
  );
})();

// ---------------------------------------------------------------- SVG 7: movement along and shift of the supply curve
const vShift = (() => {
  const s = new Svg(640, 440);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 40, y0: 0, y1: 11000, left: 80, top: 30, width: 470, height: 340, xLabel: 'Thousand bricks per day', yLabel: 'Price (Rs per thousand bricks)' });
  pl(c, supPts(MS), { color: 'accent', sw: 3 });
  pl(c, supPts(MStax), { color: 'red', sw: 3, dash: true });
  const a = 3;
  const b = 4;
  c.dot([MS[a], MP[a]], 'accent');
  c.dot([MS[b], MP[b]], 'accent');
  c.dot([MStax[b], MP[b]], 'red');
  s.arrow(c.X(MS[a]) + 14, c.Y(MP[a]) + 12, c.X(MS[b]) + 14, c.Y(MP[b]) + 12, { color: 'accent', sw: 2 });
  s.arrow(c.X(MS[b]) - 8, c.Y(MP[b]), c.X(MStax[b]) + 10, c.Y(MP[b]), { color: 'red', sw: 2 });
  [4000, 6000, 8000, 10000].forEach((y) => c.yTick(y, String(y)));
  [10, 20, 30].forEach((x) => c.xTick(x, String(x)));
  c.label([MS[6] + 0.8, MP[6]], 'S0 (no tax)', { anchor: 'start', color: 'accent', bold: true, size: 12 });
  c.label([MStax[6], MP[6] + 650], 'S1 (tax of Rs 1,000)', { color: 'red', bold: true, size: 12 });
  c.label([26, MP[3] - 600], 'Movement along S0', { anchor: 'start', color: 'accent', bold: true, size: 12 });
  c.label([1, MP[b] + 900], `Shift: ${MS[b]} to ${MStax[b]} at ${MP[b]}`, { anchor: 'start', color: 'red', bold: true, size: 12 });
  return s.visual(
    `Graph contrasting a movement with a shift: along the market supply line S0 of Dhanpur a rise in price from ${MP[a]} to ${MP[b]} rupees moves the point from ${MS[a]} to ${MS[b]} thousand bricks, while a tax of 1,000 rupees per thousand bricks shifts the whole line to the left to S1, so that at ${MP[b]} rupees the quantity supplied falls from ${MS[b]} to ${MStax[b]} thousand bricks`,
    `Imagined Dhanpur kilns. S0: ${J(MS.slice(1, 7))}. After a tax of Rs 1,000: ${J(MStax.slice(1, 7))} thousand bricks at ${J(MP.slice(1, 7))} rupees.`,
  );
})();

// ---------------------------------------------------------------- SVG 8: classes of elasticity of supply
const vEsc = (() => {
  const s = new Svg(680, 470);
  const spots = [[60, 65], [280, 65], [500, 65], [60, 290], [280, 290]];
  ESC.forEach((e, k) => {
    const [left, top] = spots[k];
    const c = s.chart({ x0: 0, x1: 160, y0: 0, y1: 300, left, top, width: 150, height: 130, xLabel: 'Quantity', yLabel: 'Price' });
    const col = ['accent', 'blue', 'green', 'red', 'accent'][k];
    if (e.cls === 'zero') c.seg([e.q0, 0], [e.q0, 300], { color: col, sw: 2.8 });
    else if (e.cls === 'infinite') c.seg([0, e.p0], [160, e.p0], { color: col, sw: 2.8 });
    else {
      const slope = (e.p1 - e.p0) / (e.q1 - e.q0);
      const f = (q) => e.p0 + slope * (q - e.q0);
      const qa = Math.max(0, e.q0 - e.p0 / slope);
      const qb = Math.min(160, e.q0 + (300 - e.p0) / slope);
      c.fn(f, qa, qb, { color: col, sw: 2.8 }, 12);
    }
    c.dot([e.q0, e.p0], col);
    if (e.cls !== 'zero' && e.cls !== 'infinite') c.dot([e.q1, e.p1], col);
    c.xTick(100, '100');
    c.yTick(200, '200');
    s.text(left + 75, top - 46, e.label, { bold: true, size: 13 });
    s.text(left + 75, top - 30, e.cls === 'infinite' ? 'es is infinite' : `es = ${rnd(e.es, 2)}`, { size: 12 });
  });
  return s.visual(
    'Five small graphs of supply curves with price on the vertical axis and quantity on the horizontal axis: an upward line with elasticity of supply greater than one, a straight line through the origin with elasticity equal to one, a steeper line with elasticity less than one, a vertical line with elasticity zero and a horizontal line with infinite elasticity',
    `Imagined supply cases: price Rs ${ESC[0].p0} to Rs ${ESC[0].p1}; quantity from ${ESC[0].q0} to ${ESC[0].q1} (es ${ESC[0].es}), ${ESC[1].q1} (es ${ESC[1].es}), ${ESC[2].q1} (es ${ESC[2].es}) or ${ESC[3].q1} (es ${ESC[3].es}); a horizontal line at Rs ${ESC[4].p0} for infinite elasticity.`,
  );
})();

// ---------------------------------------------------------------- flows and tables
const vRoute1 = flow('LR', ['Perfect competition', 'Price taker', 'Revenue: TR, AR, MR', 'Producer’s equilibrium: MR = MC'], 'Route map of part 1: perfect competition, price taker, revenue concepts, producer’s equilibrium', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Shut-down and break-even', 'Firm supply curve', 'Law and determinants of supply', 'Market supply', 'Elasticity of supply'], 'Route map of part 2: shut-down and break-even prices, the firm supply curve, the law and determinants of supply, market supply, elasticity of supply', 'Part 2 at a glance');
const tFeat = table(
  ['Feature', 'Meaning', 'Effect on the firm'],
  [
    ['Large number of buyers and sellers', 'Each seller supplies a very small share of the market', 'No single seller can influence the price'],
    ['Homogeneous product', 'Every seller’s product is identical in the eyes of buyers', 'A seller cannot charge more than the others'],
    ['Free entry and exit', 'Firms can join or leave the market without barriers', 'Above-normal profit attracts entry; losses drive firms out'],
    ['Perfect knowledge', 'Buyers and sellers know the price and the quality', 'No buyer pays, and no seller accepts, a different price'],
  ],
  'Table of the four features of perfect competition, with their meaning and their effect on the firm',
  'Features of perfect competition.',
);
const vPT = flow('LR', ['Many buyers and sellers, identical product', 'Market demand and supply fix one price', 'The firm accepts it: a price taker', 'It can sell any quantity at that price'], 'Flow showing how the features of perfect competition lead to a price taker that can sell any quantity at the market price', 'Why the firm is a price taker');
const tRevDef = table(
  ['Concept', 'Formula', 'Meaning'],
  [
    ['Total revenue (TR)', 'TR = p × q', 'All the money received from selling q units at price p'],
    ['Average revenue (AR)', 'AR = TR ÷ q', 'Revenue per unit sold; equals the price'],
    ['Marginal revenue (MR)', 'MR = ΔTR ÷ Δq', 'Addition to total revenue from selling one more unit'],
  ],
  'Table defining total revenue, average revenue and marginal revenue with their formulas',
  'Revenue concepts.',
);
const tWF = table(
  ['Quintals q', 'TR = p × q (Rs)', 'AR = TR ÷ q', 'MR = ΔTR ÷ Δq'],
  WF.q.slice(1).map((q) => [String(q), String(WF.tr[q]), String(WF.ar[q]), String(WF.mr[q])]),
  `Table of the imagined revenue of Sukhdev's wheat farm at ${WF.p} rupees a quintal: total revenue ${J(WF.tr.slice(1))}, average revenue and marginal revenue ${WF.p} at every quantity`,
  `Imagined wheat farm, Ratanpur, price Rs ${WF.p}.`,
);
const tEx1 = table(
  ['Quantity', 'Working', 'Value (Rs)'],
  [
    ['TR of 30 kg', `${ON.p} × 30`, `**${ON.tr[3]}**`],
    ['AR of 30 kg', `${ON.tr[3]} ÷ 30`, `**${ON.ar[3]}**`],
    ['MR of the 4th ten kg (per kg)', `(${ON.tr[4]} − ${ON.tr[3]}) ÷ 10`, `**${ON.mr[4] / 10}**`],
  ],
  `Worked table for Kamla's onion plot at ${ON.p} rupees a kilogram: total revenue of 30 kg ${ON.tr[3]}, average revenue ${ON.ar[3]}, marginal revenue ${ON.mr[4] / 10} per kilogram`,
  'Imagined onion plot.',
);
const vMRar = flow('LR', ['Price stays the same at every quantity', 'Each extra unit adds the price to total revenue', 'Marginal revenue equals price', 'Average revenue equals price too'], 'Flow from a constant price to marginal revenue and average revenue both equal to the price', 'Why AR = MR = price');
const vProfit = flow('LR', ['Marginal revenue equals the price', 'Find the output where marginal cost equals the price', 'Check that marginal cost is rising there', 'Profit is total revenue minus total cost'], 'Flow of the steps to find a profit-maximising output and the profit', 'Producer’s equilibrium');
const tDC = table(
  ['Hundred candles q', 'TVC', 'TC', 'MC', 'AVC', 'AC'],
  cq.map((q) => [String(q), String(DC.tvc[q]), String(DC.tc[q]), String(DC.mc[q]), String(r2(DC.avc[q])), String(r2(DC.ac[q]))]),
  `Table of the imagined costs of Diya Candles with total fixed cost ${DC.TFC}: total variable cost ${J(DC.tvc.slice(1))}, total cost ${J(DC.tc.slice(1))}, marginal cost ${J(DC.mc.slice(1))}`,
  `Imagined Diya Candles (Rs per day); total fixed cost ${DC.TFC}.`,
);
const tEq140 = table(
  ['q', 'TR at price 140', 'TC', 'Profit', 'MR', 'MC'],
  [5, 6, 7, 8, 9].map((q) => [String(q), String(E140.tr[q]), String(DC.tc[q]), String(E140.profit[q]), String(E140.P), q === 8 ? `**${DC.mc[q]}**` : String(DC.mc[q])]),
  `Table for Diya Candles at a price of ${E140.P}: marginal revenue ${E140.P} equals marginal cost ${DC.mc[8]} at ${E140.qStar} hundred candles, where profit is ${E140.best}; the ninth hundred adds ${DC.mc[9]} to cost, more than the price`,
  'Imagined Diya Candles at price Rs 140.',
);
const tFall = table(
  ['q', 'MC', 'MC compared with price 90', 'Profit at price 90'],
  [1, 2, 3, 4, 5, 6].map((q) => [String(q), String(DC.mc[q]), DC.mc[q] > E90.P ? 'above' : DC.mc[q] === E90.P ? '**equal**' : 'below', String(E90.profit[q])]),
  `Table for Diya Candles at a price of ${E90.P}: marginal cost equals ${E90.P} at 2 hundred candles but is falling there, profit at 2 hundred is ${E90.profit[2]} and is highest, ${E90.best}, at ${E90.qStar} hundred where marginal cost is rising`,
  'Imagined Diya Candles at price Rs 90.',
);
const tEx2 = table(
  ['Quantity at price 160', 'Working', 'Value (Rs)'],
  [
    ['Output where MC = price', `MC = ${DC.mc[9]} at ${E160.qStar}`, `**${E160.qStar}** hundred`],
    ['TR', `${E160.P} × ${E160.qStar}`, `**${E160.tr[9]}**`],
    ['TC', `${DC.TFC} + ${DC.tvc[9]}`, `**${DC.tc[9]}**`],
    ['Profit', `${E160.tr[9]} − ${DC.tc[9]}`, `**${E160.best}**`],
  ],
  `Worked table for Diya Candles at a price of ${E160.P}: output ${E160.qStar} hundred, total revenue ${E160.tr[9]}, total cost ${DC.tc[9]}, profit ${E160.best}`,
  'Imagined Diya Candles.',
);
const vOps = flow('LR', ['Is price at least minimum AVC?', 'Yes: produce where MR = MC', 'No: shut down; loss equals fixed cost', 'Is price at least minimum AC? Then profit is normal or more'], 'Flow of the short-run decision: compare price with minimum average variable cost, then produce or shut down, and compare with minimum average cost', 'Short-run decision of a price taker');
const tShut = table(
  ['Price', 'MC = price at q', 'Profit if it produces', 'Loss if it shuts down', 'Decision'],
  [E70, E80, E100].map((e) => [String(e.P), String(e.qStar), String(e.best), String(-DC.TFC), e.P < DC.avcLo ? 'Shut down' : e.P === DC.avcLo ? 'Indifferent' : 'Produce']),
  `Table of the short-run decision of Diya Candles with fixed cost ${DC.TFC}: at price ${E70.P} producing loses ${-E70.best}, so it shuts down; at ${E80.P} the loss equals the fixed cost; at ${E100.P} producing loses only ${-E100.best}, so it produces`,
  `Imagined Diya Candles; minimum AVC is ${DC.avcLo}.`,
);
const tBE = table(
  ['Price', 'Output', 'TR', 'TC', 'Profit', 'Position'],
  [E100, E120, E140].map((e) => [String(e.P), String(e.qStar), String(e.tr[e.qStar]), String(DC.tc[e.qStar]), String(e.best), e.best < 0 ? 'Loss, below break-even' : e.best === 0 ? '**Break-even: normal profit**' : 'Profit above normal']),
  `Table of Diya Candles at prices ${E100.P}, ${E120.P} and ${E140.P}: profit ${E100.best}, ${E120.best} and ${E140.best}, with zero profit at the break-even price ${DC.acLo}`,
  'Imagined Diya Candles.',
);
const tEx3pot = table(
  ['Price', 'MC = price at q', 'TR', 'TC', 'Profit', 'AVC at q'],
  [P70, P90].map((e) => [String(e.P), String(e.qStar), String(e.tr[e.qStar]), String(KP.tc[e.qStar]), String(e.best), String(r2(KP.avc[e.qStar]))]),
  `Worked table for Karigar Pottery with fixed cost ${KP.TFC}: at price ${P70.P} output ${P70.qStar} pots, profit ${P70.best}, average variable cost ${r2(KP.avc[5])} below the price so it continues; at ${P90.P} output ${P90.qStar}, profit ${P90.best}`,
  'Imagined Karigar Pottery.',
);
const tSupply = table(
  ['Price (Rs per hundred)', 'Output where MC = price', 'Quantity supplied'],
  [60, 70, ...DCS.map((x) => x.P)].map((P) => [String(P), P < DC.avcLo ? 'not produced (below minimum AVC)' : String(Qs.supplyAt(DC, P)), String(Qs.supplyAt(DC, P))]),
  `Table of the supply schedule of Diya Candles: nothing at prices below ${DC.avcLo}, then ${J(DCS.map((x) => x.q))} hundred candles at ${J(DCS.map((x) => x.P))} rupees`,
  'Imagined Diya Candles.',
);
const vLaw = flow('LR', ['Price of the good rises', 'Higher marginal cost is now covered', 'Producers supply more', 'Quantity supplied rises'], 'Flow from a rise in price to a higher quantity supplied, the law of supply', 'Law of supply');
const tDet = table(
  ['Determinant', 'Change', 'Effect on supply'],
  [
    ['Own price', 'Rises or falls', 'Movement along the same curve'],
    ['Technology', 'Improves', 'Shifts right: more at each price'],
    ['Input prices', 'Rise', 'Shifts left: cost per unit rises'],
    ['Unit tax', 'Imposed or raised', 'Shifts left; a subsidy shifts it right'],
    ['Prices of related goods', 'Price of an alternative product rises', 'Shifts left: resources move to the alternative'],
    ['Number of firms', 'New firms enter', 'Market supply shifts right'],
  ],
  'Table of determinants of supply: own price gives a movement; technology, input prices, taxes and subsidies, prices of related goods and the number of firms shift the curve',
  'Determinants of supply.',
);
const tMkt = table(
  ['Price (Rs per thousand)', 'Anand', 'Bhoomi', 'Chandra', 'Market'],
  MP.slice(1, 7).map((P, k) => [String(P), String(KA[k + 1]), String(KB[k + 1]), String(KC[k + 1]), `**${MS[k + 1]}**`]),
  `Table of the imagined supply of bricks in thousand bricks: Anand ${J(KA.slice(1, 7))}, Bhoomi ${J(KB.slice(1, 7))}, Chandra ${J(KC.slice(1, 7))}, market ${J(MS.slice(1, 7))} at ${J(MP.slice(1, 7))} rupees`,
  'Imagined kilns of Dhanpur; the market column is the horizontal sum.',
);
const tEx2m = table(
  ['Case at price 8000', 'Working', 'Supply (thousand bricks)'],
  [
    ['Three kilns', `${KA[4]} + ${KB[4]} + ${KC[4]}`, `**${MS[4]}**`],
    ['Fourth kiln enters', `${MS[4]} + ${KD[4]}`, `**${MS4[4]}**`],
    ['Tax of Rs 1,000 on three kilns', `supply at 7000: ${MS[3]}`, `**${MStax[4]}**`],
  ],
  `Worked table at ${MP[4]} rupees: three kilns supply ${MS[4]}, with a fourth kiln ${MS4[4]}, and after a tax of 1,000 rupees ${MStax[4]} thousand bricks`,
  'Imagined kilns of Dhanpur.',
);
const vEsF = flow('LR', ['Percentage change in quantity supplied', 'Divided by', 'Percentage change in price', 'Elasticity of supply, es'], 'Flow showing elasticity of supply as the percentage change in quantity supplied divided by the percentage change in price', 'es = % change in quantity ÷ % change in price');
const tEx3e = table(
  ['Step', 'Working', 'Value'],
  [
    ['% change in quantity', `(${KA[4]} − ${KA[2]}) ÷ ${KA[2]} × 100`, `**${pct(KA[2], KA[4])}**`],
    ['% change in price', `(${MP[4]} − ${MP[2]}) ÷ ${MP[2]} × 100`, `**${pct(MP[2], MP[4])}**`],
    ['Elasticity of supply', `${pct(KA[2], KA[4])} ÷ ${pct(MP[2], MP[4])}`, `**${esKA}**`],
  ],
  `Worked table for Anand Bricks between ${MP[2]} and ${MP[4]} rupees: quantity rises ${pct(KA[2], KA[4])} per cent, price rises ${pct(MP[2], MP[4])} per cent, elasticity of supply ${esKA}`,
  'Imagined Anand Bricks.',
);
const tClass = table(
  ['Class', 'Value of es', 'Supply curve', 'Meaning'],
  [
    ['Greater than one', 'es > 1', 'Upward-sloping: quantity responds strongly', 'Quantity changes by a larger percentage than price'],
    ['Equal to one', 'es = 1', 'Straight line through the origin', 'Quantity and price change by the same percentage'],
    ['Less than one', 'es < 1', 'Upward-sloping: quantity responds weakly', 'Quantity changes by a smaller percentage than price'],
    ['Zero', 'es = 0', 'Vertical line', 'Quantity does not change at all'],
    ['Infinite', 'es = ∞', 'Horizontal line', 'Any quantity at one price, none below it'],
  ],
  'Table of the five classes of elasticity of supply with the shape of the supply curve and the meaning of each',
  'Classes of elasticity of supply.',
);
const tSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Perfect competition', 'Many buyers and sellers, identical product, free entry and exit, perfect knowledge'],
    ['Price taker', 'Accepts the market price; can sell any quantity at it'],
    ['Revenue', 'TR = p × q (straight line from origin); AR = TR ÷ q = p; MR = ΔTR ÷ Δq = p'],
    ['Profit', 'Profit = TR − TC'],
    ['Equilibrium', 'MR (= price) = MC, with MC rising'],
  ],
  'Summary table of part 1: perfect competition, price taker, revenue concepts, profit and the equilibrium conditions',
);
const tSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Shut-down price', 'Minimum AVC in the short run'],
    ['Break-even price', 'Minimum AC: normal profit'],
    ['Firm supply curve', 'Rising part of MC above minimum AVC'],
    ['Law of supply', 'Own price up, quantity supplied up; a movement'],
    ['Shifts', 'Technology, input prices, taxes, related goods, number of firms'],
    ['Market supply', 'Horizontal sum of firm supplies'],
    ['es', '% change in quantity ÷ % change in price'],
  ],
  'Summary table of part 2: shut-down and break-even prices, firm supply, law of supply, shifts, market supply and elasticity of supply',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'The Theory of the Firm — Part 1: Revenue and Producer’s Equilibrium',
  goals: [
    'State the features of perfect competition and explain why a firm is a price taker',
    'Compute total, average and marginal revenue and draw their curves',
    'State the two conditions of producer’s equilibrium',
    'Find the profit-maximising output and the profit from a cost schedule',
  ],
  slides: [
    sl('title', 'A Firm in a Perfectly Competitive Market', {
      b: 'Part 1: **revenue** concepts and the firm’s **equilibrium** output.',
      v: vRoute1,
      n: 'In this part we study a firm that sells in a market with very many sellers. We find out why such a firm cannot choose its price, see how its revenue behaves, and learn how it decides the output that gives the largest profit.',
    }),
    sl('concept', 'Features of perfect competition', {
      b: 'A **perfectly competitive market** has many buyers and sellers, an identical product, free entry and exit and perfect knowledge.',
      v: tFeat,
      n: 'Perfect competition has four features. There are a large number of buyers and sellers, so each seller is tiny. The product is homogeneous, meaning identical. Firms may enter or leave freely. Buyers and sellers have perfect knowledge of the price and the quality. Together these features give the market a single price.',
    }),
    sl('concept', 'The firm is a price taker', {
      b: 'A **price taker** accepts the price fixed by the market and can sell any quantity at it.',
      v: vPT,
      n: 'In such a market, demand and supply of all buyers and sellers together fix one price. A single wheat farm supplies a tiny share, so it cannot change that price. If it asked for more, buyers would go elsewhere. If it asked for less, it would lose money. It therefore takes the price as given.',
    }),
    sl('concept', 'Total, average and marginal revenue', {
      b: '**TR = p × q**, **AR = TR ÷ q** and **MR = ΔTR ÷ Δq**.',
      v: tRevDef,
      n: 'Total revenue is the price multiplied by the quantity sold. Average revenue is total revenue divided by the quantity, so it is revenue per unit. Marginal revenue is the change in total revenue when one more unit is sold. We now compute all three for an imagined wheat farm.',
    }),
    sl('concept', 'Sukhdev’s wheat farm: the revenue schedule', {
      b: `The market price is ${inr(WF.p)} a quintal. Total revenue rises by the same amount for each quintal.`,
      v: tWF,
      n: `Sukhdev’s imagined farm in Ratanpur sells wheat at ${WF.p} rupees a quintal. With one quintal total revenue is ${WF.tr[1]}, with four it is ${WF.tr[4]}, and with six it is ${WF.tr[6]}. Average revenue and marginal revenue are ${WF.p} at every quantity.`,
    }),
    sl('concept', 'Total revenue curve', {
      b: 'TR is a **straight line from the origin**; its slope is the price, so a higher price gives a steeper line.',
      v: vTR,
      n: `The total revenue curve starts at the origin, because nothing is earned when nothing is sold. It rises by the same amount for each quintal, so it is a straight line. At a price of ${WF.p} rupees it reaches ${WF.tr[6]} rupees at six quintals. At a higher price of ${WF2.p} the line is steeper.`,
    }),
    sl('example', 'Worked example 1: revenue of an onion plot', {
      b: `Kamla’s onion plot sells at ${inr(ON.p)} a kilogram. Find TR, AR and MR.`,
      bl: [
        `Step 1 — TR of 30 kg = ${ON.p} × 30 = **${ON.tr[3]}**.`,
        `Step 2 — AR of 30 kg = ${ON.tr[3]} ÷ 30 = **${ON.ar[3]}**.`,
        `Step 3 — MR per kg = (${ON.tr[4]} − ${ON.tr[3]}) ÷ 10 = **${ON.mr[4] / 10}**.`,
      ],
      v: tEx1,
      n: `The imagined onion plot sells at ${ON.p} rupees a kilogram. For thirty kilograms total revenue is ${ON.p} times thirty, which is ${ON.tr[3]}. Dividing by thirty gives average revenue of ${ON.ar[3]}. Selling ten more kilograms raises revenue by ${ON.mr[4]}, so marginal revenue is ${ON.mr[4] / 10} per kilogram. All three equal the price.`,
    }),
    sl('check', 'Quick check: total revenue', {
      b: 'Compute the total revenue from 4 quintals.',
      chk: 'n_tr',
      n: 'Multiply the market price by the number of quintals sold. Do not add the cost, and remember that the price is the same for every quintal. Give your answer in rupees.',
    }),
    sl('concept', 'AR and MR are one horizontal line', {
      b: '**AR = MR = price** at every quantity, so the curve is a horizontal line at the market price.',
      v: vARMR,
      n: `Average revenue is the price. Marginal revenue is also the price, because every extra quintal is sold at the same price. The two curves therefore lie on top of each other as one horizontal line at ${WF.p} rupees. If the market price rises to ${WF2.p}, the line moves up.`,
    }),
    sl('concept', 'Why AR equals MR', {
      b: 'A constant price means each extra unit adds exactly the price to total revenue.',
      v: vMRar,
      n: 'The reason is simple. The firm sells every unit at one price. So the extra revenue from one more unit is that price, which is marginal revenue. The revenue per unit is also that price, which is average revenue. For a price taker the two cannot differ.',
    }),
    sl('check', 'Quick check: revenue and price', {
      b: 'True or false: marginal revenue of an onion plot is lower than its average revenue.',
      chk: 'tf_mr_lt_ar',
      n: 'Think about what happens to the price when the plot sells more. For a price taker the price is the same at every quantity. Compare the extra revenue from one more kilogram with the average revenue per kilogram, then decide whether the statement is true or false.',
    }),
    sl('concept', 'Profit and the equilibrium conditions', {
      b: '**Profit = TR − TC.** A producer is in equilibrium where **MR = MC** and **MC is rising**.',
      v: vProfit,
      n: 'Profit is total revenue minus total cost. A firm in perfect competition has marginal revenue equal to the price. It increases output as long as the extra unit adds more to revenue than to cost. It stops where marginal revenue equals marginal cost, provided that marginal cost is rising at that output.',
    }),
    sl('concept', 'Diya Candles: the cost schedule', {
      b: `Diya Candles has a fixed cost of ${inr(DC.TFC)} a day. Its marginal cost falls at first and then rises.`,
      v: tDC,
      n: `Diya Candles is an imagined candle maker. Its fixed cost is ${DC.TFC} rupees a day. Marginal cost is ${DC.mc[1]} for the first hundred candles, falls to ${DC.mc[3]} for the third, and then rises to ${DC.mc[9]} for the ninth. Average cost is lowest at ${DC.acLo} rupees.`,
    }),
    sl('concept', 'Finding the output at a price of 140', {
      b: `At price ${E140.P}, MR = ${E140.P}. MC reaches ${E140.P} at ${E140.qStar} hundred, and profit is largest there.`,
      v: tEq140,
      n: `Suppose the price is ${E140.P} rupees per hundred candles, so marginal revenue is ${E140.P}. Marginal cost equals ${E140.P} at ${E140.qStar} hundred candles, and it is rising. Profit is ${E140.best} rupees there. The ninth hundred would add ${DC.mc[9]} to cost, more than the price, so profit would fall.`,
    }),
    sl('check', 'Quick check: shape of AR', {
      b: 'Pick the shape of the average revenue curve.',
      chk: 'm_ar_curve',
      n: 'Average revenue is the price. Ask whether the price changes as the farm sells more. For a price taker it does not. Choose the shape of a curve that stays at the same height.',
    }),
    sl('concept', 'Why marginal cost must be rising', {
      b: 'At price 90, MC = 90 at 2 hundred but MC is **falling**. Profit is higher further on, at 5 hundred.',
      v: tFall,
      n: `At a price of ${E90.P}, marginal cost equals ${E90.P} at two hundred candles. But marginal cost is still falling there, so the next candles cost less than the price and add to profit. Profit at two hundred is ${E90.profit[2]}. It is highest, ${E90.best}, at five hundred, where marginal cost is rising.`,
    }),
    sl('example', 'Worked example 2: equilibrium at a price of 160', {
      b: 'Find the equilibrium output and profit of Diya Candles at price 160.',
      bl: [
        `Step 1 — MR = ${E160.P}; MC = ${DC.mc[9]} at **${E160.qStar}** hundred, and it is rising.`,
        `Step 2 — TR = ${E160.P} × ${E160.qStar} = **${E160.tr[9]}**; TC = ${DC.TFC} + ${DC.tvc[9]} = **${DC.tc[9]}**.`,
        `Step 3 — Profit = ${E160.tr[9]} − ${DC.tc[9]} = **${E160.best}**.`,
      ],
      v: tEx2,
      n: `At a price of ${E160.P} rupees, marginal revenue is ${E160.P}. Marginal cost reaches ${E160.P} at ${E160.qStar} hundred candles. Total revenue is ${E160.tr[9]}. Total cost is the fixed ${DC.TFC} plus variable ${DC.tvc[9]}, which is ${DC.tc[9]}. Profit is the difference, ${E160.best} rupees.`,
    }),
    sl('concept', 'The equilibrium diagram', {
      b: 'The AR = MR line cuts the rising MC curve at **E**. The shaded rectangle is profit: (price − AC) × output.',
      v: vEq,
      n: `On the graph the horizontal price line cuts the rising marginal cost curve at the point E, at ${E140.qStar} hundred candles. Average cost there is ${DC.ac[8]}. The shaded rectangle has height equal to price minus average cost and width equal to output. Its area is the profit, ${E140.best} rupees.`,
    }),
    sl('check', 'Quick check: equilibrium output', {
      b: 'Find the output at a price of 120.',
      chk: 'n_eqq',
      n: 'Set marginal revenue equal to the price. Then read the marginal cost column and find the output where it equals the price, on the part where marginal cost is rising. Give the output in hundreds of candles.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To recap. Perfect competition has many buyers and sellers, an identical product, free entry and exit and perfect knowledge. The firm is a price taker. Its total revenue is a straight line from the origin, and average and marginal revenue equal the price. It maximises profit where marginal revenue equals marginal cost and marginal cost is rising.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'List the **features** and link them to **price taker**.',
        'Write **TR = p × q**, **AR = TR ÷ q**, **MR = ΔTR ÷ Δq** before computing.',
        'Say that **AR = MR = price**: a horizontal line; TR is a straight line from the origin.',
        'State **both** conditions: **MR = MC** and **MC rising**.',
        'Show **Profit = TR − TC** with the figures.',
      ],
      n: 'Some tips. List the features of perfect competition and link them to the idea of a price taker. Write the formulas for the three revenue concepts before you compute. Remember that average and marginal revenue equal the price. State both conditions of equilibrium, and show the profit with figures.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'The Theory of the Firm — Part 2: Supply',
  goals: [
    'Explain the shut-down and break-even prices',
    'Derive the firm’s supply curve from marginal cost',
    'Explain the law of supply, its determinants, and movement versus shift',
    'Add firm supplies to get market supply and compute elasticity of supply',
  ],
  slides: [
    sl('title', 'From Costs to Supply', {
      b: 'Part 2: **shut-down**, **break-even**, the **supply curve** and **elasticity of supply**.',
      v: vRoute2,
      n: 'This part asks when a firm should keep producing and how much it will supply at each price. We find the shut-down price and the break-even price, build the supply curve of a firm, add firms to get market supply, and measure how strongly supply responds to price.',
    }),
    sl('concept', 'Short-run decision: produce or shut down', {
      b: 'Compare **price** with the minimum of **AVC**. Below it, close; at or above it, produce where MR = MC.',
      v: vOps,
      n: 'In the short run fixed cost has to be paid even if nothing is made. So the firm compares two losses. If the price is at least the lowest average variable cost, revenue covers variable cost, and the firm produces where marginal revenue equals marginal cost. If not, it is better to stop.',
    }),
    sl('concept', 'Shut-down price: Diya Candles', {
      b: `Minimum AVC is ${inr(DC.avcLo)}. At price ${E70.P} producing loses ${-E70.best}, more than the fixed cost ${DC.TFC}.`,
      v: tShut,
      n: `For Diya Candles the lowest average variable cost is ${DC.avcLo} rupees. At a price of ${E70.P}, producing loses ${-E70.best}, which is more than the fixed cost of ${DC.TFC}, so the firm stops. At ${E80.P} the two losses are equal. At ${E100.P}, producing loses only ${-E100.best}, so the firm keeps producing.`,
    }),
    sl('concept', 'Break-even price', {
      b: `Minimum AC is ${inr(DC.acLo)}. At this price TR = TC and the firm earns **normal profit**.`,
      v: tBE,
      n: `The break-even price is the lowest average cost, ${DC.acLo} rupees. At this price revenue just equals total cost, so profit is zero. This is normal profit, the minimum reward needed to keep the owner in business. Below it the firm makes a loss, and above it the firm earns more than normal profit.`,
    }),
    sl('concept', 'Shut-down point and break-even point', {
      b: 'MC cuts AVC at its minimum (**shut-down point**) and AC at its minimum (**break-even point**).',
      v: vBE,
      n: `On the graph, marginal cost cuts average variable cost at its lowest point. That is the shut-down point at ${DC.avcLo} rupees. It cuts average cost at its lowest point, the break-even point at ${DC.acLo} rupees. Between the two prices the firm makes a loss but still produces in the short run. In the long run it needs at least the break-even price.`,
    }),
    sl('example', 'Worked example 1: a pottery at two prices', {
      b: `Karigar Pottery has fixed cost ${inr(KP.TFC)}. Decide at prices of ${P70.P} and ${P90.P}.`,
      bl: [
        `Step 1 — At ${P70.P}: MC = ${P70.P} at ${P70.qStar} pots; profit = ${P70.tr[5]} − ${KP.tc[5]} = **${P70.best}**.`,
        `Step 2 — AVC at ${P70.qStar} pots = ${r2(KP.avc[5])}, below ${P70.P}, so the pottery continues.`,
        `Step 3 — At ${P90.P}: ${P90.qStar} pots; profit = ${P90.tr[6]} − ${KP.tc[6]} = **${P90.best}**.`,
      ],
      v: tEx3pot,
      n: `At a price of ${P70.P}, the pottery makes ${P70.qStar} pots and loses ${-P70.best}. Its average variable cost is ${r2(KP.avc[5])}, below the price, so it continues, because the loss is less than the fixed cost of ${KP.TFC}. At ${P90.P}, it makes ${P90.qStar} pots and earns a profit of ${P90.best}.`,
    }),
    sl('check', 'Quick check: shut-down price', {
      b: 'Find the lowest average variable cost.',
      chk: 'n_shut',
      n: 'Divide each total variable cost by its output to get average variable cost. Then pick the smallest value. That value is the shut-down price. Be careful to use only variable cost, not total cost.',
    }),
    sl('concept', 'Firm’s supply schedule', {
      b: `At each price the firm supplies where **MC = price**, provided price ≥ ${inr(DC.avcLo)}.`,
      v: tSupply,
      n: `A firm’s supply is the quantity it offers at each price. For Diya Candles nothing is supplied below ${DC.avcLo} rupees. At ${DCS[0].P} it supplies ${DCS[0].q} hundred, and the quantity rises with price, reaching ${DCS[4].q} hundred at ${DCS[4].P}. Each quantity is the output where marginal cost equals the price.`,
    }),
    sl('concept', 'Firm’s supply curve', {
      b: 'The supply curve is the **rising part of MC above the minimum AVC**.',
      v: vSup,
      n: `The solid curve is the supply curve of Diya Candles. It is the marginal cost curve from the shut-down price of ${DC.avcLo} rupees upwards. Below that price the firm supplies nothing. The curve slopes upwards, which shows that a higher price brings a larger quantity supplied.`,
    }),
    sl('concept', 'Law of supply', {
      b: 'Other things unchanged, a **rise in price** raises the **quantity supplied**.',
      v: vLaw,
      n: 'The law of supply says that, other things remaining the same, when the price of a good rises the quantity supplied rises, and when it falls the quantity supplied falls. The reason is that a higher price covers the higher marginal cost of extra output, so producing more becomes profitable.',
    }),
    sl('concept', 'Determinants of supply', {
      b: 'Own price moves the point; **technology, input prices, taxes, related goods and number of firms** shift the curve.',
      v: tDet,
      n: 'Besides its own price, supply depends on other things. Better technology and cheaper inputs raise supply at every price. A tax on each unit lowers it, and a subsidy raises it. If the price of an alternative product rises, producers move towards it and supply of this good falls. More firms in the market mean more supply.',
    }),
    sl('check', 'Quick check: effects on supply', {
      b: 'Match each event with its effect on the supply curve.',
      chk: 'mt_det',
      n: 'For each event, decide whether it changes the cost of producing bricks. A lower cost shifts supply to the right and a higher cost shifts it to the left. A change in the price of the good itself moves the point along the same curve. Match carefully.',
    }),
    sl('concept', 'Movement along and shift of the curve', {
      b: 'A change in **own price** moves along the curve; a change in **another determinant** shifts the whole curve.',
      v: vShift,
      n: `On this graph a rise in price from ${MP[3]} to ${MP[4]} rupees moves the point along the supply line, from ${MS[3]} to ${MS[4]} thousand bricks. A tax of one thousand rupees on each thousand bricks shifts the whole line to the left. At ${MP[4]} rupees the quantity supplied then falls from ${MS[4]} to ${MStax[4]}.`,
    }),
    sl('concept', 'Market supply from three kilns', {
      b: 'Market supply is the **horizontal sum** of the supplies of all firms at each price.',
      v: tMkt,
      n: `Three imagined kilns supply bricks in Dhanpur. At each price we add what the three supply. At ${MP[4]} rupees Anand supplies ${KA[4]}, Bhoomi ${KB[4]} and Chandra ${KC[4]}, so the market supplies ${MS[4]} thousand bricks. Market supply depends on the number of firms as well as on each firm’s supply.`,
    }),
    sl('concept', 'Market supply curve', {
      b: 'Adding the quantities at the **same price** gives the market curve.',
      v: vMarket,
      n: `On the graph the three thin lines are the kilns and the thick line is the market. At a price of ${MP[4]} rupees the quantities add up horizontally, ${KA[4]} plus ${KB[4]} plus ${KC[4]}, to ${MS[4]} thousand bricks. The market line is flatter than each kiln line, because it adds quantities at every price.`,
    }),
    sl('example', 'Worked example 2: more firms and a tax', {
      b: 'Find market supply at price 8000 with a fourth kiln and with a tax of Rs 1,000.',
      bl: [
        `Step 1 — Three kilns: ${KA[4]} + ${KB[4]} + ${KC[4]} = **${MS[4]}** thousand bricks.`,
        `Step 2 — A fourth kiln adds ${KD[4]}: ${MS[4]} + ${KD[4]} = **${MS4[4]}**, a rightward shift.`,
        `Step 3 — With a tax of Rs 1,000 sellers behave as at 7000: **${MStax[4]}**, a leftward shift.`,
      ],
      v: tEx2m,
      n: `At eight thousand rupees the three kilns supply ${MS[4]} thousand bricks. A fourth kiln of the same kind as Bhoomi adds ${KD[4]}, giving ${MS4[4]}, so the curve shifts right. A tax of one thousand rupees means sellers keep only seven thousand of the price, so they supply ${MStax[4]}, and the curve shifts left.`,
    }),
    sl('concept', 'Price elasticity of supply', {
      b: '**es = % change in quantity supplied ÷ % change in price.**',
      v: vEsF,
      n: 'Elasticity of supply tells us how strongly quantity supplied responds to a change in price. It is the percentage change in quantity supplied divided by the percentage change in price. A large value means that quantity is very responsive. A small value means that quantity responds little.',
    }),
    sl('example', 'Worked example 3: elasticity of Anand Bricks', {
      b: `Price rises from ${MP[2]} to ${MP[4]}; Anand supplies ${KA[2]} then ${KA[4]} thousand bricks.`,
      bl: [
        `Step 1 — % change in quantity = (${KA[4]} − ${KA[2]}) ÷ ${KA[2]} × 100 = **${pct(KA[2], KA[4])}**.`,
        `Step 2 — % change in price = (${MP[4]} − ${MP[2]}) ÷ ${MP[2]} × 100 = **${pct(MP[2], MP[4])}**.`,
        `Step 3 — es = ${pct(KA[2], KA[4])} ÷ ${pct(MP[2], MP[4])} = **${esKA}**, greater than one.`,
      ],
      v: tEx3e,
      n: `The quantity rises from ${KA[2]} to ${KA[4]}, which is ${pct(KA[2], KA[4])} per cent. The price rises from ${MP[2]} to ${MP[4]}, which is ${pct(MP[2], MP[4])} per cent. Dividing the first by the second gives an elasticity of supply of ${esKA}. Supply is elastic, because quantity changes by a larger percentage than price.`,
    }),
    sl('concept', 'Classes of elasticity of supply', {
      b: 'es is **greater than**, **equal to** or **less than one**; **zero** (vertical) or **infinite** (horizontal).',
      v: vEsc,
      n: `If quantity changes by a larger percentage than price, supply is elastic. If by the same percentage, it is unit elastic, and the line passes through the origin. If by a smaller percentage, it is inelastic. A vertical line has zero elasticity, and a horizontal line has infinite elasticity. The graph shows values of ${ESC[0].es}, ${ESC[1].es} and ${ESC[2].es}.`,
    }),
    sl('check', 'Quick check: elasticity of supply', {
      b: 'Find the elasticity of supply of Anand Bricks.',
      chk: 'n_es_kiln',
      n: 'Find the percentage change in quantity and the percentage change in price from the original values. Divide the first by the second. Use the original quantity and the original price as the base of each percentage.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To recap. A firm shuts down in the short run if the price is below minimum average variable cost. It breaks even at minimum average cost. Its supply curve is the rising part of marginal cost above the shut-down price. Market supply adds firm supplies. Elasticity of supply is the percentage change in quantity divided by the percentage change in price.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the **shut-down price** as minimum **AVC** and the **break-even price** as minimum **AC**.',
        'Say that **supply = MC above minimum AVC**.',
        'Separate **movement** (own price) from **shift** (other determinants).',
        'Add quantities **at the same price** for market supply.',
        'Compute **es** from **percentages of the original values**, then classify.',
      ],
      n: 'Some tips. Name the shut-down price as the minimum of average variable cost and the break-even price as the minimum of average cost. State that supply is marginal cost above the shut-down price. Keep movement and shift apart. Add quantities at the same price for market supply, and work out elasticity from percentages of the original values.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Theory of the Firm under Perfect Competition — Notes',
  sections: [
    {
      h: '1. Perfect competition and the price taker',
      t: 1,
      b: 'A **perfectly competitive market** has a large number of buyers and sellers, a homogeneous product, free entry and exit of firms and perfect knowledge. Because each firm supplies a tiny share and its product is identical to others, the firm cannot influence the market price: it is a **price taker** and can sell any quantity at that price.',
      terms: [
        ['Perfect competition', 'A market with a large number of buyers and sellers, a homogeneous product, free entry and exit and perfect knowledge.'],
        ['Price taker', 'A firm that has to accept the price fixed by the market and cannot change it by its own output.'],
        ['Homogeneous product', 'A product that buyers regard as identical whichever seller supplies it.'],
      ],
      v: tFeat,
      vs: [vPT],
    },
    {
      h: '2. Revenue: TR, AR and MR',
      t: 1,
      b: `**Total revenue** TR = p × q. **Average revenue** AR = TR ÷ q = p. **Marginal revenue** MR = ΔTR ÷ Δq.\n\nUnder perfect competition AR = MR = price, so each is a horizontal line at the market price, and TR is a straight line from the origin whose slope is the price. For the imagined wheat farm at Rs ${WF.p} a quintal, TR for 1 to 4 quintals is ${J(WF.tr.slice(1, 5))}.`,
      terms: [
        ['Total revenue', 'The total money received from selling a given quantity: price multiplied by quantity.'],
        ['Average revenue', 'Total revenue divided by the quantity sold: revenue per unit, equal to the price.'],
        ['Marginal revenue', 'The change in total revenue when one more unit is sold.'],
      ],
      v: vTR,
      vs: [tWF, vARMR],
    },
    {
      h: '3. Producer’s equilibrium: MR = MC',
      t: 2,
      b: `**Profit = TR − TC.** A firm that wants the largest profit chooses the output at which (1) **MR (= price) = MC** and (2) **MC is rising** (or at least not falling) at that output.\n\nFor imagined Diya Candles at a price of Rs ${E140.P} per hundred, MC = ${E140.P} at ${E140.qStar} hundred candles, TR = ${E140.tr[8]}, TC = ${DC.tc[8]} and profit = ${E140.best}. At a price of Rs ${E90.P}, MC = ${E90.P} also at 2 hundred, but MC is falling there, so the best output is ${E90.qStar} hundred.`,
      terms: [
        ['Profit', 'Total revenue minus total cost.'],
        ['Producer’s equilibrium', 'The output at which a firm maximises its profit: marginal revenue equals marginal cost and marginal cost is rising.'],
      ],
      v: vEq,
      vs: [tEq140, tFall],
    },
    {
      h: '4. Shut-down and break-even',
      t: 2,
      b: `**Short run:** the firm produces only if price ≥ the minimum of AVC, the **shut-down price** (Rs ${DC.avcLo} for Diya Candles). Below it, revenue does not cover variable cost and the loss is larger than the fixed cost.\n\n**Long run:** the price must be at least the minimum of AC, the **break-even price** (Rs ${DC.acLo}), where TR = TC and the firm earns **normal profit**. MC cuts AVC and AC at these minimum points.`,
      terms: [
        ['Shut-down price', 'The price equal to the minimum of average variable cost; below it a firm stops producing in the short run.'],
        ['Break-even price', 'The price equal to the minimum of average cost, at which total revenue equals total cost.'],
        ['Normal profit', 'The minimum reward needed to keep the entrepreneur in the business; it is counted as a cost, so total revenue equals total cost.'],
      ],
      v: vBE,
      vs: [tShut, tBE],
    },
    {
      h: '5. The firm’s supply curve and the law of supply',
      t: 3,
      b: `The **supply curve of a firm** in the short run is the **rising part of its MC curve above the minimum of AVC**. For Diya Candles the quantities supplied are ${J(DCS.map((x) => x.q))} hundred at prices of ${J(DCS.map((x) => x.P))} rupees, and nothing below ${DC.avcLo}.\n\n**Law of supply:** other things unchanged, when the price of a good rises, the quantity supplied rises, and falls when the price falls.`,
      terms: [
        ['Supply', 'The quantity of a good that producers are willing to offer for sale at each price.'],
        ['Law of supply', 'Other things unchanged, the quantity supplied of a good rises when its price rises and falls when its price falls.'],
        ['Supply schedule', 'A table showing the quantity supplied at each price.'],
      ],
      v: vSup,
      vs: [tSupply, vLaw],
    },
    {
      h: '6. Determinants, movement and shift',
      t: 3,
      b: 'Supply depends on the good’s **own price**, **technology**, **prices of inputs**, **unit taxes and subsidies**, **prices of related goods** and (for the market) the **number of firms**.\n\nA change in the own price causes a **movement along** the supply curve (expansion or contraction). A change in any other determinant **shifts** the curve: to the right for better technology, cheaper inputs, a subsidy or more firms; to the left for dearer inputs, a tax, or a rise in the price of an alternative product.',
      terms: [
        ['Movement along a supply curve', 'A change in quantity supplied caused only by a change in the price of the good itself.'],
        ['Shift of a supply curve', 'A change in the quantity supplied at every price, caused by a change in a determinant other than the good’s own price.'],
      ],
      v: tDet,
      vs: [vShift],
    },
    {
      h: '7. Market supply and elasticity of supply',
      t: 3,
      b: `**Market supply** is the horizontal sum of the supplies of all firms at each price; at Rs ${MP[4]} the imagined kilns supply ${KA[4]} + ${KB[4]} + ${KC[4]} = ${MS[4]} thousand bricks. It also depends on the number of firms.\n\n**Price elasticity of supply** es = (% change in quantity supplied) ÷ (% change in price), found with percentages of the original values. Classes: es > 1 (elastic), es = 1 (unit elastic), es < 1 (inelastic), es = 0 (vertical curve), es infinite (horizontal curve). For Anand Bricks between Rs ${MP[2]} and Rs ${MP[4]}, es = ${pct(KA[2], KA[4])} ÷ ${pct(MP[2], MP[4])} = ${esKA}.`,
      terms: [
        ['Market supply', 'The total quantity all firms together offer at each price: the horizontal sum of the individual supply curves.'],
        ['Price elasticity of supply', 'The percentage change in quantity supplied divided by the percentage change in price.'],
      ],
      v: vMarket,
      vs: [tMkt, vEsc, tClass],
    },
  ],
  tips: '- Give the **four features** of perfect competition and link them to **price taker**.\n- **TR = p × q**, **AR = TR ÷ q = p**, **MR = ΔTR ÷ Δq = p**: AR = MR is a horizontal line, TR a straight line from the origin.\n- Equilibrium needs **MR = MC** and **MC rising**; then **Profit = TR − TC**.\n- **Shut-down price** = minimum AVC (short run); **break-even price** = minimum AC (normal profit).\n- **Firm supply curve** = rising MC above minimum AVC; **market supply** = horizontal sum.\n- Separate a **movement** (own price) from a **shift** (other determinants).\n- **es** = % change in quantity ÷ % change in price; classify against one; never use the geometric method.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Perfect competition**', 'A market with a large number of buyers and sellers, a homogeneous product, free entry and exit and perfect knowledge.', 'definition', 1],
  ['Why does a large number of sellers matter?', 'Each seller supplies a tiny share, so no single seller can influence the price.', 'concept', 1],
  ['**Homogeneous product**', 'Buyers see every seller’s product as identical, so no seller can charge more.', 'definition', 1],
  ['**Price taker**', 'A firm that accepts the market price and can sell any quantity at it.', 'definition', 1],
  ['**Total revenue**', 'TR = p × q: price multiplied by quantity sold.', 'formula', 1],
  ['**Average revenue**', 'AR = TR ÷ q; equals the price.', 'formula', 1],
  ['**Marginal revenue**', 'MR = ΔTR ÷ Δq: the change in total revenue from one more unit.', 'formula', 1],
  ['Under perfect competition, AR and MR?', 'AR = MR = price: one horizontal line at the market price.', 'concept', 1],
  ['Shape of the **TR** curve of a price taker', 'A straight line from the origin; its slope is the price.', 'concept', 1],
  ['What happens to TR when the price rises?', 'The straight line from the origin becomes steeper.', 'concept', 1],
  ['**Profit**', 'Profit = TR − TC.', 'formula', 2],
  ['First condition of **producer’s equilibrium**', 'MR (= price) = MC.', 'concept', 2],
  ['Second condition of equilibrium', 'MC is rising (or not falling) at that output.', 'concept', 2],
  ['Why must MC be rising at equilibrium?', 'If MC were falling, one more unit would cost less than the price and add to profit.', 'concept', 2],
  ['**Shut-down price**', 'The minimum of AVC; the short-run firm produces only if the price is at least this.', 'definition', 2],
  ['Why close below minimum AVC?', 'Revenue does not cover variable cost, so the loss exceeds the fixed cost.', 'concept', 2],
  ['**Break-even price**', 'The minimum of AC; total revenue equals total cost.', 'definition', 2],
  ['**Normal profit**', 'The minimum reward that keeps the entrepreneur in business; counted as a cost, so TR = TC.', 'definition', 2],
  ['Long-run condition for a firm to stay', 'Price at least the minimum of average cost.', 'concept', 2],
  ['Firm’s **supply curve**', 'The rising part of MC above the minimum of AVC (short run).', 'definition', 3],
  ['**Law of supply**', 'Other things unchanged, a rise in price raises the quantity supplied.', 'definition', 3],
  ['**Market supply**', 'The horizontal sum of the supplies of all firms at each price.', 'definition', 3],
  ['Two things market supply depends on', 'Each firm’s supply and the number of firms.', 'concept', 3],
  ['What causes a **movement along** a supply curve?', 'A change in the price of the good itself.', 'concept', 3],
  ['What causes a **shift** of supply?', 'Technology, input prices, taxes or subsidies, prices of related goods, number of firms.', 'concept', 3],
  ['Better technology: effect on supply', 'Supply shifts right.', 'concept', 3],
  ['A unit tax: effect on supply', 'Supply shifts left; a subsidy shifts it right.', 'concept', 3],
  ['**Price elasticity of supply**', 'es = % change in quantity supplied ÷ % change in price.', 'formula', 3],
  ['es greater than one', 'Elastic supply: quantity changes by a larger percentage than price.', 'concept', 3],
  ['es equal to one, zero, infinite', 'Unit elastic (line through origin); zero (vertical line); infinite (horizontal line).', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — The Theory of the Firm under Perfect Competition',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_pt', 'm_loss_short', 'm_move', 'ar_mcfall'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_ar_mr', 's2_supply_curve', 's3_eq'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_eq', 'l_market'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the data and answer all parts. Part (c) has an internal choice.', items: ['cb_pottery'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — The Theory of the Firm under Perfect Competition',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_comp_feat', 'm_tr_shape', 'm_cond2', 'm_shut_price', 'm_breakeven', 'm_law', 'm_shift_tax', 'm_vertical', 'ar_ar_mr', 'ar_shut'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_features', 's2_shut', { attempt: 1, keys: ['s2_law', 's2_move_shift'] }, 's3_tr_curve', { attempt: 1, keys: ['s3_market', 's3_es'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_features_rev', { attempt: 1, keys: ['l_shut_be', 'l_supply'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_wheat', 'cb_kilns'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-11-economics-ch11 only (perfect competition, TR, AR and MR, producer’s equilibrium MR = MC, shut-down and break-even prices, firm and market supply, determinants, law of supply, elasticity of supply by the percentage method)',
    originality: 'every farm, candle maker, pottery, kiln, loom and onion plot is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'revenue, cost, profit, supply and elasticity schedules computed with stats.mjs and asserted: AR = MR = price, TR straight from the origin, profit maximum where price equals a rising MC (cross-checked by TR − TC over every output), shut-down price = minimum AVC, break-even price = minimum AC, firm supply = MC above minimum AVC, market supply = horizontal sum; every SVG is drawn from the same arrays',
    facts: 'only stable textbook definitions are stated: features of perfect competition, TR, AR, MR, profit, producer’s equilibrium, shut-down and break-even prices, normal profit, supply, law of supply, determinants, movement and shift, market supply, elasticity of supply by the percentage method',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
