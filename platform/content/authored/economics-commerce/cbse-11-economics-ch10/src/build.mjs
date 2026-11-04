// Build CBSE 11 Economics ch10 Production and Costs. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { check } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch10', 'economics-commerce');
const Qs = await import('./questions.mjs');
const { J, inr, HF, BK, PR, PRmp, CH, GB, JM, chGap2, chGap8, mcMinQ } = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const Ls = (s) => s.L.slice(1);

// ---------------------------------------------------------------- figures pinned
check(HF.mp[5], 8, 0, 'Hariyali MP of the fifth worker');
check(HF.ap[5], 9.6, 6, 'Hariyali AP of five workers');
check(HF.tp[3] - HF.tp[2], HF.mp[3], 6, 'MP by subtraction');
check(CH.tc[7], 4550, 0, 'workshop total cost of seven chairs');
check(CH.ac[6], 650, 0, 'workshop AC at six chairs');
check(CH.avc[4], CH.avc[5], 6, 'AVC equal at four and five chairs');
check(chGap2, 420, 6, 'gap at two chairs');
check(chGap8, 105, 6, 'gap at eight chairs');
check(GB.tfc[3], 360, 0, 'bakery fixed cost');

// ---------------------------------------------------------------- SVG helpers
function mkPoly(s) {
  return (c, pts, o) => s.polyline(pts.map(([x, y]) => [c.X(x), c.Y(y)]), o);
}

// ---------------------------------------------------------------- SVG: TP above, AP and MP below
const vTPAPMP = (() => {
  const s = new Svg(640, 650);
  const pl = mkPoly(s);
  const c1 = s.chart({ x0: 0, x1: 11, y0: 0, y1: 64, left: 70, top: 30, width: 480, height: 230, yLabel: 'Total product (quintals)' });
  pl(c1, HF.L.map((l) => [l, HF.tp[l]]), { color: 'accent', sw: 2.8 });
  HF.L.slice(1).forEach((l) => c1.dot([l, HF.tp[l]], 'accent'));
  c1.yTick(20, '20');
  c1.yTick(40, '40');
  c1.yTick(HF.tpMax, String(HF.tpMax));
  c1.label([3.2, 50], 'TP', { color: 'accent', bold: true });
  const c2 = s.chart({ x0: 0, x1: 11, y0: -6, y1: 16, left: 70, top: 345, width: 480, height: 230, xLabel: 'Workers', yLabel: 'AP and MP (quintals)' });
  c2.xTick(0, '0');
  c2.seg([0, 0], [11, 0], { dash: true, color: 'muted', sw: 1.2 });
  pl(c2, Ls(HF).map((l) => [l, HF.ap[l]]), { color: 'blue', sw: 2.6 });
  pl(c2, Ls(HF).map((l) => [l, HF.mp[l]]), { color: 'red', sw: 2.6 });
  Ls(HF).forEach((l) => { c2.dot([l, HF.ap[l]], 'blue'); c2.dot([l, HF.mp[l]], 'red'); });
  [4, 8, 12, 16].forEach((y) => c2.yTick(y, String(y)));
  c2.yTick(0, '0');
  c2.yTick(-4, '-4');
  Ls(HF).forEach((l) => c2.xTick(l, String(l)));
  s.line(c1.X(HF.n - 2), c1.Y(HF.tpMax), c2.X(HF.n - 2), c2.Y(0), { dash: true, color: 'muted', sw: 1.2 });
  c2.label([1.0, 14.3], 'MP', { color: 'red', bold: true, dx: -4 });
  c2.label([9.2, 6.4], 'AP', { color: 'blue', bold: true });
  c2.label([HF.apMaxAt, HF.apMax], 'MP = AP', { dy: -16, dx: 30, size: 12 });
  return s.visual(
    `Two stacked graphs of Hariyali Farm against the number of workers: above, the total product curve rises to ${HF.tpMax} quintals at ${HF.tpMaxAt} workers and ${HF.tpMaxAt + 1} workers and then falls; below, the marginal product curve rises to ${HF.mpMax} at ${HF.k1} workers, falls, reaches zero at ${HF.n - 2} workers and turns negative, while the average product curve rises to ${HF.apMax} at ${HF.apMaxAt} workers, where the marginal product meets it, and then falls`,
    `Imagined Hariyali Farm. Total product: ${J(HF.tp)}. Marginal product: ${J(HF.mp.slice(1))}. Average product: ${J(HF.ap.slice(1))}.`,
  );
})();

// ---------------------------------------------------------------- SVG: phases
const vPhases = (() => {
  const s = new Svg(640, 420);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 11, y0: -6, y1: 16, left: 70, top: 60, width: 480, height: 270, xLabel: 'Workers', yLabel: 'AP and MP (quintals)' });
  const edge1 = HF.k1 + 0.5;
  const edge2 = HF.ph.ii[HF.ph.ii.length - 1] + 0.5;
  const band = (a, b, col) => s.rect(c.X(a), c.Y(16), c.X(b) - c.X(a), c.Y(-6) - c.Y(16), { fill: col, fillOpacity: 0.12, stroke: false, rx: 0 });
  band(0, edge1, 'green');
  band(edge1, edge2, 'accent');
  band(edge2, 11, 'red');
  c.xTick(0, '0');
  c.seg([0, 0], [11, 0], { dash: true, color: 'muted', sw: 1.2 });
  pl(c, Ls(HF).map((l) => [l, HF.ap[l]]), { color: 'blue', sw: 2.6 });
  pl(c, Ls(HF).map((l) => [l, HF.mp[l]]), { color: 'red', sw: 2.6 });
  Ls(HF).forEach((l) => { c.dot([l, HF.ap[l]], 'blue'); c.dot([l, HF.mp[l]], 'red'); c.xTick(l, String(l)); });
  c.seg([edge1, -6], [edge1, 16], { dash: true, color: 'muted', sw: 1.2 });
  c.seg([edge2, -6], [edge2, 16], { dash: true, color: 'muted', sw: 1.2 });
  [4, 8, 12, 16].forEach((y) => c.yTick(y, String(y)));
  c.yTick(0, '0');
  c.yTick(-4, '-4');
  s.text(c.X(edge1 / 2), 76, 'Phase I', { bold: true, size: 13 });
  s.text(c.X(edge1 / 2), 94, 'Increasing', { size: 12 });
  s.text(c.X(edge1 / 2), 110, 'returns', { size: 12 });
  s.text(c.X((edge1 + edge2) / 2), 76, 'Phase II', { bold: true, size: 13 });
  s.text(c.X((edge1 + edge2) / 2), 94, 'Diminishing returns', { size: 12 });
  s.text(c.X((edge2 + 11) / 2), 76, 'Phase III', { bold: true, size: 13 });
  s.text(c.X((edge2 + 11) / 2), 94, 'Negative', { size: 12 });
  s.text(c.X((edge2 + 11) / 2), 110, 'returns', { size: 12 });
  c.label([1.0, 14.3], 'MP', { color: 'red', bold: true, dx: -4 });
  c.label([9.0, 7.0], 'AP', { color: 'blue', bold: true });
  return s.visual(
    `Graph of average product and marginal product of Hariyali Farm against workers, divided into three shaded phases: phase I up to ${HF.k1} workers where marginal product rises, phase II from ${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]} workers where marginal product falls but is not negative, and phase III from ${HF.ph.iii[0]} workers where marginal product is negative`,
    `Imagined Hariyali Farm. Phase I: workers 1 to ${HF.k1}. Phase II: workers ${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]}. Phase III: workers ${HF.ph.iii[0]} to ${HF.n}.`,
  );
})();

// ---------------------------------------------------------------- SVG: TFC, TVC, TC
const vCost1 = (() => {
  const s = new Svg(640, 450);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 9, y0: 0, y1: 5800, left: 80, top: 30, width: 470, height: 340, xLabel: 'Chairs per week', yLabel: 'Cost (Rs)' });
  const q = CH.q;
  pl(c, q.map((i) => [i, CH.tfc[i]]), { color: 'muted', sw: 2.8 });
  pl(c, q.map((i) => [i, CH.tvc[i]]), { color: 'blue', sw: 2.8 });
  pl(c, q.map((i) => [i, CH.tc[i]]), { color: 'accent', sw: 2.8 });
  q.slice(1).forEach((i) => { c.dot([i, CH.tvc[i]], 'blue'); c.dot([i, CH.tc[i]], 'accent'); });
  c.yTick(CH.TFC, String(CH.TFC));
  c.yTick(2000, '2000');
  c.yTick(4000, '4000');
  q.slice(1).forEach((i) => c.xTick(i, String(i)));
  c.label([8, CH.tc[8]], 'TC', { color: 'accent', bold: true, dx: 26 });
  c.label([8, CH.tvc[8]], 'TVC', { color: 'blue', bold: true, dx: 30 });
  c.label([8, CH.TFC], 'TFC', { bold: true, dx: 30, dy: -4, muted: true });
  c.seg([5, CH.tvc[5]], [5, CH.tc[5]], { sw: 2.2 });
  c.label([5, (CH.tvc[5] + CH.tc[5]) / 2], `gap = ${CH.TFC}`, { dx: 12, anchor: 'start', size: 12 });
  return s.visual(
    `Graph of the imagined Karwan chair workshop: total fixed cost is a horizontal line at ${CH.TFC} rupees, total variable cost starts at the origin and rises, and total cost starts at ${CH.TFC} on the vertical axis and runs above total variable cost by the same ${CH.TFC} at every output`,
    `Imagined Karwan workshop. TFC ${CH.TFC} at every output. TVC: ${J(CH.tvc)}. TC: ${J(CH.tc)}.`,
  );
})();

// ---------------------------------------------------------------- SVG: AFC, AVC, AC, MC
const vCost2 = (() => {
  const s = new Svg(640, 480);
  const pl = mkPoly(s);
  const c = s.chart({ x0: 0, x1: 9, y0: 0, y1: 1600, left: 80, top: 30, width: 470, height: 370, xLabel: 'Chairs per week', yLabel: 'Cost per chair (Rs)' });
  const q = CH.q.slice(1);
  pl(c, q.map((i) => [i, CH.afc[i]]), { color: 'muted', sw: 2.6 });
  pl(c, q.map((i) => [i, CH.avc[i]]), { color: 'blue', sw: 2.6 });
  pl(c, q.map((i) => [i, CH.ac[i]]), { color: 'accent', sw: 2.6 });
  pl(c, q.map((i) => [i, CH.mc[i]]), { color: 'red', sw: 2.6 });
  q.forEach((i) => { c.dot([i, CH.avc[i]], 'blue'); c.dot([i, CH.ac[i]], 'accent'); c.dot([i, CH.mc[i]], 'red'); });
  const aq = CH.avcMeet.filter((i) => i >= 2)[0];
  const cq = CH.acMeet.filter((i) => i >= 2)[0];
  c.seg([aq, CH.avc[aq]], [aq, 940], { dash: true, color: 'muted', sw: 1.2 });
  c.seg([cq, CH.ac[cq]], [cq, 1180], { dash: true, color: 'muted', sw: 1.2 });
  c.label([aq, 1020], 'AVC minimum', { size: 12, bold: true });
  c.label([aq, 960], `MC = AVC = ${CH.avc[aq]}`, { size: 12 });
  c.label([cq, 1260], 'AC minimum', { size: 12, bold: true });
  c.label([cq, 1200], `MC = AC = ${CH.ac[cq]}`, { size: 12 });
  c.yTick(500, '500');
  c.yTick(1000, '1000');
  c.yTick(1500, '1500');
  q.forEach((i) => c.xTick(i, String(i)));
  c.label([8, CH.mc[8]], 'MC', { color: 'red', bold: true, dx: 22 });
  c.label([8, CH.ac[8]], 'AC', { color: 'accent', bold: true, dx: 22, dy: 6 });
  c.label([8, CH.avc[8]], 'AVC', { color: 'blue', bold: true, dx: 26, dy: 8 });
  c.label([8, CH.afc[8]], 'AFC', { muted: true, bold: true, dx: 26, dy: -10 });
  return s.visual(
    `Graph of per-chair costs of the imagined Karwan workshop: average fixed cost falls throughout, while average variable cost, average cost and marginal cost are U-shaped; marginal cost cuts average variable cost at its minimum of ${CH.avcLo} rupees at ${CH.avcMeet.filter((i) => i >= 2)[0]} chairs and cuts average cost at its minimum of ${CH.acLo} rupees at ${CH.acMeet.filter((i) => i >= 2)[0]} chairs`,
    `Imagined Karwan workshop. AFC: ${J(CH.afc.slice(1))}. AVC: ${J(CH.avc.slice(1))}. AC: ${J(CH.ac.slice(1))}. MC: ${J(CH.mc.slice(1))}.`,
  );
})();

// ---------------------------------------------------------------- flows and tables, deck 1
const vRoute1 = flow('LR', ['Production function', 'Short run and long run', 'Total, average and marginal product', 'Law of variable proportions'], 'Route map of part 1: production function, short run and long run, total, average and marginal product, law of variable proportions', 'Part 1 at a glance');
const vPF = flow('LR', ['Inputs: labour, land, capital, materials', 'Production function q = f(L, K)', 'Maximum output of wheat'], 'Flow from inputs through the production function to the maximum output', 'The production function');
const tSRLR = table(
  ['Period', 'Factors', 'Imagined example'],
  [
    ['Short run', 'At least one factor is fixed', 'Hariyali Farm: 4 hectares cannot be enlarged this season; workers can be added'],
    ['Long run', 'All factors can be varied', 'The farm buys more land and machines over several years'],
  ],
  'Table comparing the short run, in which at least one factor is fixed, with the long run, in which all factors can be varied, with imagined Hariyali Farm examples',
  'Short run and long run.',
);
const tHFtp = table(
  ['Workers', 'Total product (quintals)'],
  HF.L.map((l) => [String(l), String(HF.tp[l])]),
  `Table of the imagined total product of Hariyali Farm: ${J(HF.tp)} quintals for 0 to ${HF.n} workers`,
  'Imagined Hariyali Farm, 4 hectares fixed.',
);
const phaseOf = (s, l) => (s.ph.i.includes(l) ? 'I' : s.ph.ii.includes(l) ? 'II' : 'III');
const tHFfull = table(
  ['Workers', 'TP', 'MP', 'AP', 'Phase'],
  Ls(HF).map((l) => [String(l), String(HF.tp[l]), String(HF.mp[l]), String(HF.ap[l]), phaseOf(HF, l)]),
  `Table of total, marginal and average product of Hariyali Farm for 1 to ${HF.n} workers with the phase of each`,
  'TP, MP = ΔTP ÷ ΔL and AP = TP ÷ L.',
);
const tEx1 = table(
  ['Quantity', 'Working', 'Value (quintals)'],
  [
    ['MP of the 5th worker', `${HF.tp[5]} − ${HF.tp[4]}`, `**${HF.mp[5]}**`],
    ['AP of 5 workers', `${HF.tp[5]} ÷ 5`, `**${HF.ap[5]}**`],
    ['MP of the 6th worker', `${HF.tp[6]} − ${HF.tp[5]}`, `**${HF.mp[6]}**`],
    ['AP of 6 workers', `${HF.tp[6]} ÷ 6`, `**${HF.ap[6]}**`],
  ],
  `Worked table: marginal product of the 5th worker ${HF.mp[5]} and average product of 5 workers ${HF.ap[5]}; marginal product of the 6th worker ${HF.mp[6]} and average product of 6 workers ${HF.ap[6]}`,
  'Imagined Hariyali Farm.',
);
const vLVP = flow('LR', ['Phase I: marginal product rises', 'Phase II: marginal product falls, stays positive', 'Phase III: marginal product negative, total product falls'], 'Flow of the three phases of the law of variable proportions: increasing returns, diminishing returns and negative returns', 'Law of variable proportions');
const rowsFor = (s, ls) => ls.map((l) => [String(l), String(s.tp[l]), String(s.mp[l]), String(s.ap[l])]);
const tPh1 = table(['Workers', 'TP', 'MP', 'AP'], rowsFor(HF, HF.ph.i), `Table of phase I of Hariyali Farm, workers 1 to ${HF.k1}: marginal product ${J(HF.ph.i.map((l) => HF.mp[l]))} rises`, 'Phase I: marginal product rises.');
const tPh2 = table(['Workers', 'TP', 'MP', 'AP'], rowsFor(HF, HF.ph.ii), `Table of phase II of Hariyali Farm, workers ${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]}: marginal product ${J(HF.ph.ii.map((l) => HF.mp[l]))} falls but is not negative`, 'Phase II: marginal product falls, stays at or above zero.');
const tPh3 = table(['Workers', 'TP', 'MP', 'AP'], rowsFor(HF, HF.ph.iii), `Table of phase III of Hariyali Farm, workers ${HF.ph.iii[0]} to ${HF.n}: marginal product ${J(HF.ph.iii.map((l) => HF.mp[l]))} is negative and total product falls`, 'Phase III: marginal product negative.');
const vWhy = flow('LR', ['Few workers: land under-used', 'Tasks divided: marginal product rises', 'Land fully used: each worker has less land', 'Overcrowding: workers hinder one another'], 'Flow of reasons for the phases: land under-used, division of tasks, land fully used, overcrowding', 'Reasons for the phases');
const tAPMP = table(
  ['Workers', 'MP', 'AP', 'MP compared with AP', 'AP moves'],
  [2, 3, 4, 5, 6].map((l) => [String(l), String(HF.mp[l]), String(HF.ap[l]), HF.mp[l] > HF.ap[l] ? 'MP above AP' : HF.mp[l] === HF.ap[l] ? '**MP equals AP**' : 'MP below AP', HF.ap[l] > HF.ap[l - 1] ? 'Rises' : HF.ap[l] === HF.ap[l - 1] ? '**Highest**' : 'Falls']),
  `Table comparing marginal and average product of Hariyali Farm for 2 to 6 workers: average product rises while marginal product is above it, is highest at ${HF.apMaxAt} workers where they are equal, and falls after`,
  'Imagined Hariyali Farm.',
);
const tBK = table(
  ['Bakers', 'TP', 'MP', 'AP', 'Phase'],
  Ls(BK).map((l) => [String(l), String(BK.tp[l]), String(BK.mp[l]), String(BK.ap[l]), phaseOf(BK, l)]),
  `Table of total, marginal and average product of Meena's bakery for 1 to ${BK.n} bakers, with the phase of each; average product is highest at ${BK.apMaxAt} bakers where marginal product equals it`,
  "Imagined Meena's bakery, one oven fixed; dozens of loaves per day.",
);
const tSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Production function', 'Technical relation between inputs and maximum output'],
    ['Short run, long run', 'At least one factor fixed; all factors variable'],
    ['TP, AP, MP', 'AP = TP ÷ L; MP = ΔTP ÷ ΔL'],
    ['Phases', 'MP rises; MP falls but is positive; MP negative'],
    ['AP and MP', 'MP above AP: AP rises; equal at the top of AP; below: AP falls'],
    ['TP maximum', 'Where MP is zero'],
  ],
  'Summary table of part 1: production function, short and long run, TP AP and MP, phases, relation of AP and MP, maximum of TP',
);

// ---------------------------------------------------------------- flows and tables, deck 2
const vRoute2 = flow('LR', ['Fixed and variable cost', 'Total cost', 'Marginal cost', 'Average costs', 'Shapes and relations'], 'Route map of part 2: fixed and variable cost, total cost, marginal cost, average costs, shapes and relations', 'Part 2 at a glance');
const tCostTypes = table(
  ['Cost', 'Meaning', 'Imagined example (Karwan workshop)'],
  [
    ['Total fixed cost (TFC)', 'Does not change with output in the short run', 'Rent of the shed, salaries of permanent staff'],
    ['Total variable cost (TVC)', 'Changes with output; zero at zero output', 'Wood, glue, wages of casual workers'],
  ],
  'Table of total fixed cost and total variable cost with imagined examples from the Karwan chair workshop',
  'Fixed and variable costs.',
);
const vTC = flow('LR', ['Total fixed cost', 'plus total variable cost', 'equals total cost'], 'Flow from total fixed cost plus total variable cost to total cost', 'TC = TFC + TVC');
const tCHs = table(
  ['Chairs q', 'TFC', 'TVC', 'TC'],
  CH.q.map((i) => [String(i), String(CH.tfc[i]), String(CH.tvc[i]), String(CH.tc[i])]),
  `Table of the imagined weekly total costs of the Karwan workshop for 0 to ${CH.n} chairs: total fixed cost ${CH.TFC}, total variable cost ${J(CH.tvc)}, total cost ${J(CH.tc)}`,
  'Imagined Karwan workshop (Rs per week).',
);
const tEx2c = table(
  ['Quantity', 'Working', 'Value (Rs)'],
  [
    ['TC of 5 chairs', `${CH.TFC} + ${CH.tvc[5]}`, `**${CH.tc[5]}**`],
    ['TC of 7 chairs', `${CH.TFC} + ${CH.tvc[7]}`, `**${CH.tc[7]}**`],
    ['MC of the 6th chair', `${CH.tc[6]} − ${CH.tc[5]}`, `**${CH.mc[6]}**`],
  ],
  `Worked table: total cost of 5 chairs ${CH.tc[5]}, total cost of 7 chairs ${CH.tc[7]}, marginal cost of the 6th chair ${CH.mc[6]}`,
  'Imagined Karwan workshop.',
);
const tMC = table(
  ['Chairs q', 'TC', 'ΔTC', 'MC = ΔTC ÷ Δq'],
  CH.q.slice(1).map((i) => [String(i), String(CH.tc[i]), String(CH.tc[i] - CH.tc[i - 1]), `**${CH.mc[i]}**`]),
  `Table of marginal cost of the Karwan workshop: ${J(CH.mc.slice(1))} for 1 to ${CH.n} chairs, lowest at ${mcMinQ} chairs`,
  'Imagined Karwan workshop.',
);
const tAvg = table(
  ['q', 'AFC', 'AVC', 'AC'],
  CH.q.slice(1).map((i) => [String(i), String(CH.afc[i]), String(CH.avc[i]), String(CH.ac[i])]),
  `Table of average fixed, average variable and average cost of the Karwan workshop for 1 to ${CH.n} chairs`,
  'AFC = TFC ÷ q, AVC = TVC ÷ q, AC = TC ÷ q.',
);
const tAFC = table(
  ['Chairs q', 'TFC', 'AFC = TFC ÷ q', 'AFC × q'],
  CH.q.slice(1).map((i) => [String(i), String(CH.TFC), String(CH.afc[i]), String(CH.afc[i] * i)]),
  `Table showing that average fixed cost of the Karwan workshop falls from ${CH.afc[1]} to ${CH.afc[8]} while average fixed cost times output is always ${CH.TFC}, which is a rectangular hyperbola`,
  'Rectangular hyperbola: AFC × q is constant.',
);
const tEx2d = table(
  ['Quantity at 6 chairs', 'Working', 'Value (Rs)'],
  [
    ['AFC', `${CH.TFC} ÷ 6`, `**${CH.afc[6]}**`],
    ['AVC', `${CH.tvc[6]} ÷ 6`, `**${CH.avc[6]}**`],
    ['AC (as AFC + AVC)', `${CH.afc[6]} + ${CH.avc[6]}`, `**${CH.ac[6]}**`],
    ['AC (as TC ÷ q)', `${CH.tc[6]} ÷ 6`, `**${CH.ac[6]}**`],
  ],
  `Worked table at 6 chairs: average fixed cost ${CH.afc[6]}, average variable cost ${CH.avc[6]}, average cost ${CH.ac[6]} found in two ways`,
  'Imagined Karwan workshop.',
);
const dir = (a, i, mc) => (a[i] < a[i - 1] ? 'falls' : a[i] === a[i - 1] ? 'unchanged' : 'rises');
const tMCavc = table(
  ['q', 'MC', 'AVC of q − 1', 'MC compared', 'AVC at q'],
  [2, 3, 4, 5, 6].map((i) => [String(i), String(CH.mc[i]), String(CH.avc[i - 1]), CH.mc[i] < CH.avc[i - 1] ? 'below' : CH.mc[i] === CH.avc[i - 1] ? '**equal**' : 'above', `${CH.avc[i]} (${dir(CH.avc, i)})`]),
  `Table comparing marginal cost with average variable cost of the Karwan workshop for 2 to 6 chairs: average variable cost falls while marginal cost is below it, is unchanged at ${CH.avcMeet.filter((i) => i >= 2)[0]} chairs where marginal cost equals it, and rises after`,
  'MC below AVC: AVC falls; MC above AVC: AVC rises.',
);
const tMCac = table(
  ['q', 'MC', 'AC of q − 1', 'MC compared', 'AC at q'],
  [4, 5, 6, 7, 8].map((i) => [String(i), String(CH.mc[i]), String(CH.ac[i - 1]), CH.mc[i] < CH.ac[i - 1] ? 'below' : CH.mc[i] === CH.ac[i - 1] ? '**equal**' : 'above', `${CH.ac[i]} (${dir(CH.ac, i)})`]),
  `Table comparing marginal cost with average cost of the Karwan workshop for 4 to 8 chairs: average cost falls while marginal cost is below it, is unchanged at ${CH.acMeet.filter((i) => i >= 2)[0]} chairs where marginal cost equals it, and rises after`,
  'MC below AC: AC falls; MC above AC: AC rises.',
);
const tGap = table(
  ['Chairs q', 'AC', 'AVC', 'AC − AVC', 'AFC'],
  [2, 4, 6, 8].map((i) => [String(i), String(CH.ac[i]), String(CH.avc[i]), String(CH.ac[i] - CH.avc[i]), String(CH.afc[i])]),
  `Table showing that the gap between average cost and average variable cost equals average fixed cost and narrows from ${chGap2} at 2 chairs to ${chGap8} at 8 chairs`,
  'The gap AC − AVC is AFC, and it narrows.',
);
const vUshape = flow('LR', ['Few workers: marginal product rises', 'Marginal cost falls', 'Many workers: marginal product falls', 'Marginal cost rises: U shape'], 'Flow from rising marginal product and falling marginal cost to falling marginal product and rising marginal cost, giving a U shape', 'Why the cost curves are U-shaped');
const tEx3 = table(
  ['q', 'TFC', 'TVC', 'TC', 'AVC', 'AC', 'MC'],
  [1, 2, 3, 4].map((i) => [String(i), String(GB.TFC), String(GB.tvc[i]), i === 3 ? '**?**' : String(GB.tc[i]), i === 2 ? '**?**' : String(GB.avc[i]), i === 4 ? '**?**' : String(GB.ac[i]), i === 3 ? '**?**' : String(GB.mc[i])]),
  `Incomplete cost schedule of Gulmohar Bakery for 1 to 4 cakes: total cost at 3 cakes, average variable cost at 2 cakes, average cost at 4 cakes and marginal cost at 3 cakes are missing`,
  'Imagined Gulmohar Bakery (Rs per day). Find the starred values.',
);
const tEx3a = table(
  ['Missing value', 'Working', 'Answer (Rs)'],
  [
    ['TC at 3 cakes', `${GB.TFC} + ${GB.tvc[3]}`, `**${GB.tc[3]}**`],
    ['AVC at 2 cakes', `${GB.tvc[2]} ÷ 2`, `**${GB.avc[2]}**`],
    ['AC at 4 cakes', `${GB.tc[4]} ÷ 4`, `**${GB.ac[4]}**`],
    ['MC at 3 cakes', `${GB.tvc[3]} − ${GB.tvc[2]}`, `**${GB.mc[3]}**`],
  ],
  `Answers: total cost at 3 cakes ${GB.tc[3]}, average variable cost at 2 cakes ${GB.avc[2]}, average cost at 4 cakes ${GB.ac[4]}, marginal cost at 3 cakes ${GB.mc[3]}`,
  'Imagined Gulmohar Bakery.',
);
const tSum2 = table(
  ['Idea', 'Remember'],
  [
    ['TC', 'TC = TFC + TVC; TFC is horizontal, TVC starts at the origin'],
    ['MC', 'ΔTC ÷ Δq = ΔTVC ÷ Δq'],
    ['AFC', 'TFC ÷ q: falls throughout, rectangular hyperbola'],
    ['AVC and AC', 'U-shaped; AC = AFC + AVC'],
    ['MC cuts', 'AVC and AC at their minimum points'],
    ['Gap', 'AC − AVC = AFC, and it narrows as output rises'],
  ],
  'Summary table of part 2: total cost, marginal cost, average fixed cost, average variable cost and average cost, where marginal cost cuts them, and the gap between average cost and average variable cost',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Production and Costs — Part 1: Production Function and Returns to a Factor',
  goals: [
    'Define the production function, the short run and the long run',
    'Compute total, average and marginal product from a schedule',
    'Explain the three phases of the law of variable proportions',
    'Relate average product and marginal product',
  ],
  slides: [
    sl('title', 'Production: Inputs and Output', {
      b: 'Part 1 — how **output** changes when a **variable factor** is added to fixed factors.',
      v: vRoute1,
      n: 'A firm turns inputs into output. This part explains the technical link between them. We separate the short run from the long run, compute total, average and marginal product from a schedule of an imagined farm, and study how output responds when more workers are added to a fixed amount of land.',
    }),
    sl('concept', 'The production function', {
      b: 'A **production function** is the technical relationship between the physical inputs used and the **maximum** output they can give. It is written q = f(L, K).',
      v: vPF,
      n: 'A production function states how much output can be had from given inputs. It looks only at physical quantities, such as workers, land and seed, and gives the largest output that those inputs can produce with the known technique. For a farm it links the quantity of wheat to the quantities of labour and land.',
    }),
    sl('concept', 'Short run and long run', {
      b: 'In the **short run** at least one factor is fixed; in the **long run** all factors can be varied.',
      v: tSRLR,
      n: 'The short run is a period in which at least one factor cannot be changed. On Hariyali Farm the land is fixed for the season, so the farm can only change the number of workers. The long run is a period long enough to change every factor, including land and machines. Returns to a factor are studied in the short run.',
    }),
    sl('concept', 'Hariyali Farm: total product', {
      b: '**Total product (TP)** is the total output made with a given quantity of the variable factor. Land is fixed at 4 hectares; workers vary.',
      v: tHFtp,
      n: `The imagined Hariyali Farm of Sarangpur has four hectares of land and hires different numbers of workers. With one worker it makes ${HF.tp[1]} quintals of wheat, with two workers ${HF.tp[2]}, and with ten workers ${HF.tp[10]}. Total product is the whole output at each number of workers.`,
    }),
    sl('concept', 'Average product and marginal product', {
      b: '**AP = TP ÷ L**, output per worker. **MP = ΔTP ÷ ΔL**, the addition to total product made by one more worker.',
      v: tHFfull,
      n: 'Average product is total product divided by the number of workers. Marginal product is the change in total product when one more worker is hired. The table shows both for the farm. The last column names the phase, which we explain shortly. Notice that marginal product rises at first, then falls, and finally becomes negative.',
    }),
    sl('example', 'Worked example 1: MP and AP', {
      b: 'Find the marginal and average product of the 5th and 6th workers of Hariyali Farm.',
      bl: [
        `Step 1 — MP of the 5th worker = ${HF.tp[5]} − ${HF.tp[4]} = **${HF.mp[5]}** quintals.`,
        `Step 2 — AP of 5 workers = ${HF.tp[5]} ÷ 5 = **${HF.ap[5]}** quintals.`,
        `Step 3 — MP of the 6th worker = **${HF.mp[6]}** and AP of 6 workers = **${HF.ap[6]}**.`,
      ],
      v: tEx1,
      n: `To find marginal product, subtract the earlier total from the new total. With five workers the farm makes ${HF.tp[5]} quintals and with four it makes ${HF.tp[4]}, so the fifth worker adds ${HF.mp[5]}. To find average product, divide total product by the workers: ${HF.tp[5]} divided by five is ${HF.ap[5]}.`,
    }),
    sl('check', 'Quick check: first phase', {
      b: 'Name the phase for the first three workers.',
      chk: 'm_phase1',
      n: 'Look at the marginal product of the first three workers. Is it rising, falling, or negative? The phase is named after what the marginal product does, not after what total product does. Choose the option that matches the behaviour of the marginal product.',
    }),
    sl('concept', 'Drawing the product curves', {
      b: 'TP rises, flattens at its maximum and then falls. MP rises, falls and cuts the horizontal axis where TP is highest. AP rises and then falls.',
      v: vTPAPMP,
      n: `The upper graph is the total product curve of the farm. It rises, reaches its peak of ${HF.tpMax} quintals, and then falls. The lower graph shows marginal and average product. Marginal product rises to ${HF.mpMax}, then falls, becomes zero where total product is highest, and turns negative. Average product rises, reaches ${HF.apMax}, and then falls.`,
    }),
    sl('concept', 'The law of variable proportions', {
      b: 'When a variable factor is added to fixed factors, output first rises at an **increasing rate**, then at a **diminishing rate**, and may finally **fall**.',
      v: vLVP,
      n: 'The law of variable proportions describes what happens when more of one factor is combined with fixed amounts of the others. First the marginal product rises, which is increasing returns. Then it falls but stays positive, which is diminishing returns. In the last phase it turns negative, and total product falls. This is called negative returns.',
    }),
    sl('concept', 'Phase I: increasing returns', {
      b: `Marginal product **rises** with each worker. On the farm, workers 1 to ${HF.k1} add ${J(HF.ph.i.map((l) => HF.mp[l]))} quintals.`,
      v: tPh1,
      n: `In the first phase, each new worker adds more than the one before. The first three workers of the farm add ${J(HF.ph.i.map((l) => HF.mp[l]))} quintals. The fixed land is under-used when few workers are present, and extra workers allow tasks to be divided so that the land is used better.`,
    }),
    sl('concept', 'Phase II: diminishing returns', {
      b: `Marginal product **falls but stays at or above zero**. Workers ${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]} add ${J(HF.ph.ii.map((l) => HF.mp[l]))} quintals. TP still rises, until MP is zero.`,
      v: tPh2,
      n: `In the second phase, marginal product falls but is not yet negative. Workers four to eight add ${J(HF.ph.ii.map((l) => HF.mp[l]))} quintals. Total product still rises, or stays the same at the end, because the extra worker adds little. Each worker now has less land to work with than the one before.`,
    }),
    sl('concept', 'Phase III: negative returns', {
      b: `Marginal product is **negative**, so TP **falls**. The ${HF.ph.iii[0]}th and ${HF.ph.iii[1]}th workers add ${J(HF.ph.iii.map((l) => HF.mp[l]))} quintals.`,
      v: tPh3,
      n: `In the third phase, an extra worker reduces output. The ninth worker changes total product by ${HF.mp[9]} quintals and the tenth by ${HF.mp[10]}. Workers crowd the fixed land and get in one another's way. A producer who has to pay wages would not want to employ workers in this phase.`,
    }),
    sl('check', 'Quick check: order of the phases', {
      b: 'Arrange the phases as workers are added.',
      chk: 'ord_phases',
      n: 'Think about what happens to marginal product as workers are added one by one. It first rises. Then it falls while still positive. Then it reaches zero where total product is highest. Finally it turns negative. Put the four stages in that order.',
    }),
    sl('concept', 'The three phases on a graph', {
      b: 'Phase I ends where MP is highest. Phase II ends where MP is zero. Phase III has negative MP.',
      v: vPhases,
      n: `On the graph, the first dashed line marks the end of increasing returns, after ${HF.k1} workers, where marginal product is highest. The second dashed line marks the end of diminishing returns, at ${HF.ph.ii[HF.ph.ii.length - 1]} workers, where marginal product is zero and total product is highest. To the right of it, marginal product is below the horizontal axis.`,
    }),
    sl('concept', 'Why the phases occur', {
      b: 'Phases arise because the **fixed factor** is first under-used and later crowded.',
      v: vWhy,
      n: 'With few workers the land is under-used, so each new worker makes better use of it and tasks can be divided. When the land is fully used, each new worker has less land than the one before, so marginal product falls. With too many workers they hinder one another, and marginal product becomes negative.',
    }),
    sl('concept', 'Average product and marginal product together', {
      b: `While **MP > AP**, AP rises. When **MP = AP**, AP is at its maximum. While **MP < AP**, AP falls.`,
      v: tAPMP,
      n: `Compare the two columns. The marginal product of the third worker, ${HF.mp[3]}, is above the average of ${HF.ap[3]}, so the average has risen. At four workers they are equal at ${HF.ap[4]}, which is the highest average. At five workers marginal product ${HF.mp[5]} is below the average, so the average falls. Marginal product is the cause of the movement of the average.`,
    }),
    sl('example', "Worked example 2: Meena's bakery", {
      b: `Meena's bakery has one oven. Find the phases and where AP is highest.`,
      bl: [
        `Step 1 — MP = ${J(BK.mp.slice(1))}; AP = ${J(BK.ap.slice(1))}.`,
        `Step 2 — MP rises up to the ${BK.k1}rd baker: **phase I**. It falls, staying positive, for bakers ${BK.ph.ii[0]} to ${BK.ph.ii[BK.ph.ii.length - 1]}: **phase II**.`,
        `Step 3 — Baker ${BK.ph.iii[0]} has MP ${BK.mp[7]}: **phase III**. AP is highest, ${BK.apMax}, at ${BK.apMaxAt} bakers, where MP = AP.`,
      ],
      v: tBK,
      n: `To find the phases, look at the marginal product column. It rises for the first three bakers, so that is the first phase. It then falls but stays positive for bakers four, five and six, which is the second phase. The seventh baker has a negative marginal product, so total product falls. Average product is highest at four bakers, where it equals marginal product.`,
    }),
    sl('check', 'Quick check: negative marginal product', {
      b: 'True or false: can total product be positive when marginal product is negative?',
      chk: 'tf_mp_neg',
      n: 'Marginal product is the change in total product. If it is negative, total product has fallen, but the fall may start from a high level. Think about whether a total can remain above zero after a decrease. Then decide whether the statement is true or false.',
    }),
    sl('check', 'Quick check: average product', {
      b: 'Compute the average product of 6 workers.',
      chk: 'n_hf_ap6',
      n: 'Look at the total product for six workers in the table. Divide it by the number of workers. Do not use the change in total product, because that gives the marginal product. Enter your answer in quintals.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To recap. A production function links physical inputs with maximum output. In the short run at least one factor is fixed. Average product is total product divided by workers, and marginal product is the change in total product. Marginal product rises, falls, and then turns negative, giving three phases. It meets average product at the top of the average, and is zero where total product is highest.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define **production function**, **short run** and **long run** in standard words.',
        'Show **MP = ΔTP ÷ ΔL** and **AP = TP ÷ L** with the working.',
        'Name each phase by the behaviour of **marginal product**, with figures.',
        'State that **MP = 0** where **TP is maximum**.',
        'Say that **MP above AP** raises AP, and **MP equals AP** at the top of AP.',
      ],
      n: 'Some tips. Define the production function, the short run and the long run precisely. Show the formulas for average and marginal product with every step of the working. Name each phase by what marginal product does, and quote figures. Remember that total product is highest where marginal product is zero, and that marginal product meets average product at the top of the average.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Production and Costs — Part 2: Short-Run Costs',
  goals: [
    'Define total fixed, total variable and total cost',
    'Compute marginal, average fixed, average variable and average cost from a schedule',
    'Describe the shapes of the cost curves',
    'Explain where marginal cost cuts the average cost curves',
  ],
  slides: [
    sl('title', 'Short-Run Costs', {
      b: 'Part 2 — **fixed** and **variable** costs, and the cost curves of a workshop.',
      v: vRoute2,
      n: 'A firm must pay for its inputs, and these payments are its costs. In this part we separate fixed from variable costs, build total cost, and compute marginal and average costs from the schedule of an imagined chair workshop. We then study the shapes of the curves and how they are related.',
    }),
    sl('concept', 'Fixed and variable costs', {
      b: 'In the short run, **fixed costs** stay the same at every output; **variable costs** change with output and are zero when nothing is produced.',
      v: tCostTypes,
      n: 'Fixed costs are those that do not change with output in the short run, for example the rent of the shed and the salaries of permanent staff. They have to be paid even when no chair is made. Variable costs change with output, for example wood, glue and the wages of casual workers. They are zero when the workshop produces nothing.',
    }),
    sl('concept', 'Total cost', {
      b: '**Total cost = total fixed cost + total variable cost.** Total cost rises with output because variable cost rises.',
      v: vTC,
      n: 'Total cost is the sum of total fixed cost and total variable cost. Because fixed cost does not change, total cost changes only when variable cost changes. At zero output total cost is equal to the fixed cost. As output grows, total cost grows, and it never falls.',
    }),
    sl('concept', 'Karwan workshop: the schedule', {
      b: `The workshop pays ${inr(CH.TFC)} a week as fixed cost. Its total variable cost depends on the chairs made.`,
      v: tCHs,
      n: `The imagined Karwan workshop pays ${CH.TFC} rupees a week as fixed cost, whatever it makes. The total variable cost is zero at zero chairs, ${CH.tvc[1]} rupees for one chair, and ${CH.tvc[8]} rupees for eight chairs. Adding the two gives total cost, which is ${CH.tc[0]} rupees even when nothing is produced.`,
    }),
    sl('concept', 'The three total cost curves', {
      b: 'TFC is **horizontal**; TVC **starts at the origin**; TC **starts at TFC** and lies a constant distance above TVC.',
      v: vCost1,
      n: `The fixed cost curve is a horizontal line. The variable cost curve starts at the origin, since nothing is spent on variable inputs at zero output, and rises. The total cost curve starts at the fixed cost on the vertical axis and is always ${CH.TFC} rupees above the variable cost curve, so the two curves are parallel.`,
    }),
    sl('example', 'Worked example 1: total and marginal cost', {
      b: 'Find the total cost of 5 and 7 chairs and the marginal cost of the 6th chair.',
      bl: [
        `Step 1 — TC of 5 chairs = ${CH.TFC} + ${CH.tvc[5]} = **${CH.tc[5]}**.`,
        `Step 2 — TC of 7 chairs = ${CH.TFC} + ${CH.tvc[7]} = **${CH.tc[7]}**.`,
        `Step 3 — MC of the 6th chair = ${CH.tc[6]} − ${CH.tc[5]} = **${CH.mc[6]}**.`,
      ],
      v: tEx2c,
      n: `Total cost is fixed cost plus variable cost. For five chairs it is ${CH.TFC} plus ${CH.tvc[5]}, which is ${CH.tc[5]}. For seven chairs it is ${CH.tc[7]}. Marginal cost of the sixth chair is the rise in total cost when output goes from five to six chairs, which is ${CH.mc[6]} rupees.`,
    }),
    sl('check', 'Quick check: fixed cost curve', {
      b: 'Pick the shape of the total fixed cost curve.',
      chk: 'm_tfc_curve',
      n: 'Ask whether total fixed cost changes when output changes. If a cost is the same at every output, its curve has no slope. Choose the option that describes a curve with no slope.',
    }),
    sl('concept', 'Marginal cost', {
      b: '**MC = ΔTC ÷ Δq = ΔTVC ÷ Δq**: the addition to total cost from one more unit.',
      v: tMC,
      n: `Marginal cost is the extra cost of one more unit. It can be found from total cost or from total variable cost, because the fixed part does not change. In the table, it falls from ${CH.mc[1]} for the first chair to ${CH.mc[mcMinQ]} for the third, and then rises to ${CH.mc[8]} for the eighth chair.`,
    }),
    sl('concept', 'Average costs', {
      b: '**AFC = TFC ÷ q**, **AVC = TVC ÷ q**, **AC = TC ÷ q = AFC + AVC**.',
      v: tAvg,
      n: `Average costs are costs per chair. Average fixed cost is fixed cost divided by output. Average variable cost is variable cost divided by output. Average cost is total cost divided by output, and it is the sum of the first two. Average fixed cost falls all the way, while average variable cost and average cost first fall and then rise.`,
    }),
    sl('concept', 'Average fixed cost: a rectangular hyperbola', {
      b: 'AFC **falls throughout** but never reaches zero; **AFC × q = TFC** at every output.',
      v: tAFC,
      n: `The same fixed cost is spread over more chairs, so the cost per chair keeps falling. It never reaches zero, because a positive fixed cost divided by any output is positive. Average fixed cost multiplied by output is always ${CH.TFC} rupees, which is why the curve is called a rectangular hyperbola.`,
    }),
    sl('example', 'Worked example 2: averages at 6 chairs', {
      b: 'Find AFC, AVC and AC for 6 chairs.',
      bl: [
        `Step 1 — AFC = ${CH.TFC} ÷ 6 = **${CH.afc[6]}**.`,
        `Step 2 — AVC = ${CH.tvc[6]} ÷ 6 = **${CH.avc[6]}**.`,
        `Step 3 — AC = ${CH.afc[6]} + ${CH.avc[6]} = **${CH.ac[6]}**, also ${CH.tc[6]} ÷ 6.`,
      ],
      v: tEx2d,
      n: `At six chairs, average fixed cost is ${CH.TFC} divided by six, which is ${CH.afc[6]}. Average variable cost is ${CH.tvc[6]} divided by six, which is ${CH.avc[6]}. Adding them gives average cost of ${CH.ac[6]}. The same figure comes from dividing total cost ${CH.tc[6]} by six, so the two methods agree.`,
    }),
    sl('check', 'Quick check: total cost', {
      b: 'Complete the equation for total cost.',
      chk: 'fb_tc',
      n: 'Total cost has two parts. One part does not change with output. Name the other part, the one that changes with output, to complete the equation.',
    }),
    sl('concept', 'The four per-unit curves', {
      b: 'AFC falls throughout. AVC, AC and MC are **U-shaped**, and MC cuts AVC and AC at their **minimum points**.',
      v: vCost2,
      n: `On the graph, average fixed cost falls all the way. Average variable cost, average cost and marginal cost fall and then rise, forming a U. Marginal cost cuts average variable cost at its lowest point, ${CH.avcLo} rupees, and cuts average cost at its lowest point, ${CH.acLo} rupees. Average cost reaches its lowest point at a larger output.`,
    }),
    sl('concept', 'Marginal cost and average variable cost', {
      b: 'AVC **falls** while MC is **below** it, is lowest where **MC = AVC**, and **rises** while MC is above it.',
      v: tMCavc,
      n: `Compare marginal cost with the earlier average variable cost. For three and four chairs marginal cost is below it, so the average falls. At five chairs marginal cost equals the average of ${CH.avc[4]}, so it is unchanged, and this is the lowest value. Afterwards marginal cost is above the average and pulls it up.`,
    }),
    sl('concept', 'Marginal cost and average cost', {
      b: 'AC **falls** while MC is **below** it, is lowest where **MC = AC**, and **rises** while MC is above it.',
      v: tMCac,
      n: `The same rule holds for average cost. Up to six chairs marginal cost is below the earlier average cost, so average cost falls. At seven chairs marginal cost equals ${CH.ac[6]}, so average cost stays at its lowest value. At eight chairs marginal cost is above it and average cost rises. Marginal cost cuts average cost at its minimum.`,
    }),
    sl('concept', 'The gap between AC and AVC', {
      b: '**AC − AVC = AFC**. The gap **narrows** as output rises, because AFC falls, but it never becomes zero.',
      v: tGap,
      n: `Average cost minus average variable cost is average fixed cost. At two chairs the gap is ${chGap2} rupees, at four chairs it is ${CH.afc[4]}, and at eight chairs it is ${chGap8}. The two curves therefore come closer as output rises, but they never meet, since average fixed cost is never zero.`,
    }),
    sl('check', 'Quick check: types of cost', {
      b: 'Match imagined costs with their types.',
      chk: 'mt_cost',
      n: 'For each cost, ask whether it has to be paid even when no chair is made. If it does, it is a fixed cost. If it grows with the number of chairs, it is a variable cost. Match each cost to its type.',
    }),
    sl('concept', 'Why the cost curves are U-shaped', {
      b: 'The U shape is the law of variable proportions seen from the cost side: rising MP lowers cost per unit, falling MP raises it.',
      v: vUshape,
      n: 'When marginal product of the variable factor rises, each extra unit of output needs less input, so marginal cost falls. When marginal product falls, each extra unit needs more input, so marginal cost rises. The marginal cost curve is therefore U-shaped, and the average costs follow, with average variable cost and average cost also forming a U.',
    }),
    sl('example', 'Worked example 3: filling in missing values', {
      b: 'Gulmohar Bakery has TFC of 360. Find the starred values.',
      bl: [
        `Step 1 — TC at 3 cakes = ${GB.TFC} + ${GB.tvc[3]} = **${GB.tc[3]}**.`,
        `Step 2 — AVC at 2 cakes = ${GB.tvc[2]} ÷ 2 = **${GB.avc[2]}**; AC at 4 cakes = ${GB.tc[4]} ÷ 4 = **${GB.ac[4]}**.`,
        `Step 3 — MC at 3 cakes = ${GB.tvc[3]} − ${GB.tvc[2]} = **${GB.mc[3]}**.`,
      ],
      v: tEx3,
      n: `Start with the quantities that need only addition or subtraction. Total cost at three cakes is fixed cost plus variable cost, which is ${GB.tc[3]}. Marginal cost of the third cake is the change in variable cost, ${GB.mc[3]}. Then divide. Average variable cost at two cakes is ${GB.avc[2]}, and average cost at four cakes is ${GB.ac[4]}.`,
    }),
    sl('check', 'Quick check: average variable cost', {
      b: 'Compute the average variable cost of 7 chairs.',
      chk: 'n_ch_avc7',
      n: 'Average variable cost is variable cost per chair. Read the total variable cost of seven chairs and divide it by seven. Do not include the fixed cost, which belongs to average cost. Give your answer in rupees.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To recap. Total cost is total fixed cost plus total variable cost. Marginal cost is the change in total cost for one more unit. Average fixed cost falls throughout, while average variable cost, average cost and marginal cost are U-shaped. Marginal cost cuts average variable cost and average cost at their lowest points. The gap between average cost and average variable cost is average fixed cost, and it narrows.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **TC = TFC + TVC** and **AC = AFC + AVC** before computing.',
        'Find **MC** as the change in **TC** (or **TVC**) for one more unit.',
        'Draw the curves with **MC cutting AVC and AC at their minimum points**.',
        'Remember that **AFC falls throughout** and **never touches the axis**.',
        'State that the gap **AC − AVC is AFC**.',
      ],
      n: 'Some tips. Write the formulas for total cost and average cost before computing. Find marginal cost as the change in total cost for one more unit. When you draw the curves, make marginal cost cut the average variable cost and average cost curves at their lowest points. Remember that average fixed cost falls throughout, and that the gap between average cost and average variable cost is average fixed cost.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Production and Costs — Notes',
  sections: [
    {
      h: '1. Production function, short run and long run',
      t: 1,
      b: 'A **production function** is the technical relationship between the physical quantities of inputs and the **maximum** physical output that can be produced with them: q = f(L, K), where L is labour and K stands for the other factor, such as land or capital.\n\nIn the **short run** at least one factor is fixed, so output can be changed only by changing the variable factors. In the **long run** all factors can be varied.',
      terms: [
        ['Production function', 'The technical relationship between inputs used and the maximum output that can be obtained from them.'],
        ['Short run', 'A period in which at least one factor of production cannot be changed.'],
        ['Long run', 'A period long enough for all factors of production to be changed.'],
      ],
      v: vPF,
      vs: [tSRLR],
    },
    {
      h: '2. Total, average and marginal product',
      t: 1,
      b: `**Total product (TP)** is the total output at a given quantity of the variable factor. **Average product (AP)** is TP ÷ L. **Marginal product (MP)** is the change in TP when one more unit of the variable factor is used: MP = ΔTP ÷ ΔL.\n\nOn the imagined Hariyali Farm (4 hectares fixed) the third worker takes TP from ${HF.tp[2]} to ${HF.tp[3]} quintals, so MP is ${HF.mp[3]}, while AP of three workers is ${HF.ap[3]}.`,
      terms: [
        ['Total product', 'The total quantity of output produced with a given quantity of the variable factor.'],
        ['Average product', 'Total product divided by the quantity of the variable factor used: output per unit of the factor.'],
        ['Marginal product', 'The change in total product when one more unit of the variable factor is employed.'],
      ],
      v: tHFfull,
    },
    {
      h: '3. Law of variable proportions',
      t: 1,
      b: `When more and more of a variable factor is combined with fixed factors, the marginal product first rises, then falls, and at last becomes negative.\n\n- **Phase I, increasing returns:** MP rises (workers 1 to ${HF.k1} of the farm).\n- **Phase II, diminishing returns:** MP falls but is not negative (workers ${HF.ph.ii[0]} to ${HF.ph.ii[HF.ph.ii.length - 1]}); TP still rises or stays at its maximum.\n- **Phase III, negative returns:** MP is negative and TP falls (workers ${HF.ph.iii[0]} to ${HF.n}).`,
      terms: [
        ['Law of variable proportions', 'As more of a variable factor is added to fixed factors, marginal product first rises, then falls and may become negative.'],
        ['Increasing returns to a factor', 'The phase in which the marginal product of the variable factor rises.'],
        ['Diminishing returns to a factor', 'The phase in which marginal product falls but remains non-negative.'],
        ['Negative returns to a factor', 'The phase in which marginal product is negative and total product falls.'],
      ],
      v: vLVP,
      vs: [vTPAPMP],
    },
    {
      h: '4. Why the phases occur, and AP–MP relation',
      t: 1,
      b: 'In phase I the fixed factor is under-used and extra workers allow division of work, so MP rises. In phase II the fixed factor is fully used and each worker has less of it. In phase III the fixed factor is crowded.\n\n**AP and MP:** while MP is above AP, AP rises; where MP equals AP, AP is at its maximum; while MP is below AP, AP falls. **TP is at its maximum where MP is zero.** The MP curve cuts the AP curve at the top of the AP curve.',
      terms: [
        ['Fixed factor', 'A factor whose quantity cannot be changed in the short run.'],
      ],
      v: vPhases,
      vs: [tAPMP, tBK],
    },
    {
      h: '5. Fixed, variable and total cost',
      t: 2,
      b: `In the short run, **total fixed cost (TFC)** does not change with output (rent, salaries of permanent staff) and is paid even at zero output. **Total variable cost (TVC)** changes with output (raw materials, wages of casual labour) and is zero at zero output.\n\n**TC = TFC + TVC.** On a graph, TFC is a horizontal line, TVC starts at the origin and TC starts at TFC and lies ${inr(CH.TFC)} above TVC at the imagined Karwan workshop.`,
      terms: [
        ['Total fixed cost', 'Cost that does not change with the level of output in the short run.'],
        ['Total variable cost', 'Cost that changes with the level of output and is zero when output is zero.'],
        ['Total cost', 'The sum of total fixed cost and total variable cost at a given output.'],
      ],
      v: vCost1,
      vs: [tCHs],
    },
    {
      h: '6. Marginal and average costs',
      t: 2,
      b: '**Marginal cost:** MC = ΔTC ÷ Δq = ΔTVC ÷ Δq, the addition to total cost from one more unit.\n\n**Average fixed cost:** AFC = TFC ÷ q. **Average variable cost:** AVC = TVC ÷ q. **Average cost:** AC = TC ÷ q = AFC + AVC.\n\nAFC falls throughout and is a rectangular hyperbola; AVC, AC and MC are U-shaped.',
      terms: [
        ['Marginal cost', 'The addition to total cost when one more unit of output is produced.'],
        ['Average fixed cost', 'Total fixed cost divided by output.'],
        ['Average variable cost', 'Total variable cost divided by output.'],
        ['Average cost', 'Total cost divided by output; the sum of average fixed cost and average variable cost.'],
      ],
      v: tMC,
      vs: [tAvg, tAFC],
    },
    {
      h: '7. Shapes and relations of the cost curves',
      t: 2,
      b: `The MC curve cuts the AVC curve and the AC curve at their **minimum points**: an average falls while MC is below it and rises while MC is above it. The AC curve reaches its minimum at a larger output than AVC, since AFC is still falling. The vertical gap between AC and AVC is AFC; it narrows as output rises (${inr(chGap2)} at 2 chairs, ${inr(chGap8)} at 8 chairs) but never becomes zero.\n\nThe U shape arises from the law of variable proportions: rising MP lowers cost per unit and falling MP raises it.`,
      v: vCost2,
      vs: [tMCavc, tMCac, tGap],
    },
  ],
  tips: '- Define **production function**, **short run**, **long run**, and each cost and product in standard words.\n- Write the formula first: **AP = TP ÷ L**, **MP = ΔTP ÷ ΔL**, **TC = TFC + TVC**, **MC = ΔTC ÷ Δq**, **AC = AFC + AVC**.\n- Name phases by the behaviour of **MP**, and say that **TP is maximum where MP is zero**.\n- **MP cuts AP at the top of AP**; **MC cuts AVC and AC at their minima**.\n- **AFC falls throughout**; the gap **AC − AVC is AFC**.\n- Draw curves from a schedule and label axes, units and the minimum points.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Production function**', 'The technical relationship between inputs used and the maximum output that can be obtained.', 'definition', 1],
  ['Form of the **production function**', 'q = f(L, K): output depends on labour and the other factor.', 'formula', 1],
  ['**Short run**', 'A period in which at least one factor of production is fixed.', 'definition', 1],
  ['**Long run**', 'A period in which all factors of production can be varied.', 'definition', 1],
  ['**Total product**', 'The total output at a given quantity of the variable factor.', 'definition', 1],
  ['**Average product**', 'Total product divided by the number of units of the variable factor: AP = TP ÷ L.', 'formula', 1],
  ['**Marginal product**', 'Change in total product when one more unit of the variable factor is used: MP = ΔTP ÷ ΔL.', 'formula', 1],
  ['**Law of variable proportions**', 'With fixed factors, marginal product of a variable factor first rises, then falls, and may become negative.', 'definition', 1],
  ['**Phase I**', 'Increasing returns: marginal product rises.', 'concept', 1],
  ['**Phase II**', 'Diminishing returns: marginal product falls but is not negative.', 'concept', 1],
  ['**Phase III**', 'Negative returns: marginal product is negative and total product falls.', 'concept', 1],
  ['Why does MP **rise** in phase I?', 'The fixed factor is under-used and extra workers allow division of work.', 'concept', 1],
  ['Why does MP **fall** in phase II?', 'Each added unit of the variable factor has less of the fixed factor to work with.', 'concept', 1],
  ['When is **TP maximum**?', 'Where marginal product is zero.', 'concept', 1],
  ['When does **AP rise**?', 'While marginal product is above average product.', 'concept', 1],
  ['What happens where **MP = AP**?', 'Average product is at its maximum; the MP curve cuts the AP curve there.', 'concept', 1],
  ['**Fixed cost**', 'Cost that does not change with output in the short run (rent, salaries of permanent staff).', 'definition', 2],
  ['**Variable cost**', 'Cost that changes with output and is zero at zero output (raw materials, casual wages).', 'definition', 2],
  ['**Total cost**', 'TC = TFC + TVC.', 'formula', 2],
  ['Shape of **TFC**', 'A horizontal straight line.', 'concept', 2],
  ['Shape of **TVC**', 'Starts at the origin and rises with output.', 'concept', 2],
  ['Where does **TC** start?', 'At the level of TFC on the vertical axis, parallel to TVC.', 'concept', 2],
  ['**Marginal cost**', 'MC = ΔTC ÷ Δq = ΔTVC ÷ Δq: the addition to total cost from one more unit.', 'formula', 2],
  ['**Average fixed cost**', 'AFC = TFC ÷ q; falls throughout, a rectangular hyperbola.', 'formula', 2],
  ['**Average variable cost**', 'AVC = TVC ÷ q; U-shaped.', 'formula', 2],
  ['**Average cost**', 'AC = TC ÷ q = AFC + AVC; U-shaped.', 'formula', 2],
  ['Why is **AFC × q** constant?', 'AFC × q = TFC, which does not change with output.', 'concept', 2],
  ['Where does **MC** cut **AVC**?', 'At the minimum point of AVC.', 'concept', 2],
  ['Where does **MC** cut **AC**?', 'At the minimum point of AC.', 'concept', 2],
  ['What is the **gap** between AC and AVC?', 'AFC; it narrows as output rises but never becomes zero.', 'concept', 2],
  ['Why are cost curves **U-shaped**?', 'Law of variable proportions: rising MP lowers cost per unit, falling MP raises it.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Production and Costs',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_sr', 'm_incr_reason', 'm_afc_shape', 'ar_mc_avc'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_ap_mp', 's2_fixed_var', 's3_mcavc'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_lvp', 'l_uni'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the data and answer all parts. Part (c) has an internal choice.', items: ['cb_hariyali'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Production and Costs',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_lr', 'm_mp_def', 'm_phase3', 'm_ap_max', 'm_tp_max', 'm_dim_reason', 'm_mc_def', 'm_gap', 'ar_negative', 'ar_u_afc'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_sr_lr', 's2_dim_reason', { attempt: 1, keys: ['s2_mc_def', 's2_tc_rel'] }, 's3_phase1', { attempt: 1, keys: ['s3_gb_missing', 's3_fv_dist'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_apmp', { attempt: 1, keys: ['l_fvt', 'l_pr'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_karwan', 'cb_gulmohar'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-11-economics-ch10 only (production function, short and long run, TP, AP and MP, law of variable proportions, short-run costs: TFC, TVC, TC, AFC, AVC, AC, MC)',
    originality: 'every farm, workshop, bakery, press and jam works is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all product and cost schedules computed with stats.mjs (marginal, average) and asserted: MP above AP while AP rises, MP equal to AP at the top of AP, TP maximum where MP is zero, TC = TFC + TVC, MC cuts AVC and AC at their minima, AFC falls throughout; every SVG is drawn from the same arrays',
    facts: 'only stable textbook definitions are stated: production function, short and long run, TP, AP, MP, the three phases of the law of variable proportions, TFC, TVC, TC, MC, AFC, AVC, AC and the relations among them',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
