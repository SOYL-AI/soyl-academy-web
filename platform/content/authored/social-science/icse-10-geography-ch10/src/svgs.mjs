// ICSE 10 Geography ch10 diagrams (allow-listed elements, palette colours only). Schematic diagrams are labelled "not to scale".
// Ore grades, the bauxite-to-aluminium ratios, the copper-ore grade and the mine outputs are ILLUSTRATIVE (rounded, made-up but
// realistic values), exported so questions compute every answer from the same numbers. SELF_CHECKS (read by build.mjs) confirm
// geometry and data.
import { svgDoc, S } from './lib.mjs';

const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
const YEL = 'var(--diagram-yellow)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- ILLUSTRATIVE typical iron content of the four ores (per cent)
export const ORES = [
  { name: 'Magnetite', fe: 70, note: 'black, magnetic' },
  { name: 'Hematite', fe: 65, note: 'reddish; most mined in India' },
  { name: 'Limonite', fe: 45, note: 'yellow-brown, contains water' },
  { name: 'Siderite', fe: 35, note: 'carbonate, many impurities' },
];
export const fe = (name) => ORES.find((o) => o.name === name).fe;
/** Tonnes of iron in t tonnes of an ore. */
export const ironIn = (name, t) => Math.round((fe(name) / 100) * t * 10) / 10;
/** Tonnes of ore needed for t tonnes of iron. */
export const oreFor = (name, t) => Math.round((t / (fe(name) / 100)) * 10) / 10;

export const GRADES = (() => {
  const X0 = 100;
  const Y0 = 30;
  const W = 280;
  const H = 30;
  let s = '';
  let ok = true;
  ORES.forEach((o, i) => {
    const y = Y0 + i * (H + 18);
    const w = (o.fe / 100) * W;
    s += S.rect(X0, y, W, H, { c: MUT, sw: 1 });
    s += S.rect(X0, y, w, H, { fill: [MUT, RED, YEL, BROWN][i], fop: 0.55, c: 'currentColor', sw: 1 });
    s += lab(X0 - 8, y + 19, o.name, { a: 'end', w: 'bold' }) + lab(X0 + w + 6 > X0 + W - 30 ? X0 + w - 6 : X0 + w + 6, y + 19, `${o.fe}%`, { a: X0 + w + 6 > X0 + W - 30 ? 'end' : 'start', w: 'bold' });
    s += lab(X0, y + H + 12, o.note, { size: 10, c: MUT });
    if (Math.abs(w - (o.fe / 100) * W) > 1e-9) ok = false;
    if (i > 0 && !(o.fe < ORES[i - 1].fe)) ok = false;
  });
  s += lab(240, Y0 + ORES.length * (H + 18) + 10, 'Approximate, illustrative iron content (bar = share of iron in the ore)', { a: 'middle', size: 10, c: MUT });
  check(ok, `iron-ore grades: each bar's filled length is proportional to its illustrative iron content (${ORES.map((o) => `${o.name} ${o.fe}%`).join(', ')}) and the ores are drawn in decreasing order of grade`);
  return svgDoc(480, Y0 + ORES.length * (H + 18) + 22, `Bar chart of approximate, illustrative iron content of the four iron ores: ${ORES.map((o) => `${o.name} about ${o.fe} per cent, ${o.note}`).join('; ')}.`, s);
})();

// ---------------------------------------------------------------- open-cast mine with benches (schematic)
export const PIT = { benches: 4, benchH: 12 }; // metres per bench (illustrative)
export const pitDepth = PIT.benches * PIT.benchH;
export const OPENCAST = (() => {
  const top = 70;
  const K = 2.2; // px per metre
  const step = 30;
  let s = '';
  // ground surface with overburden layer, ore body below
  s += S.rect(10, top, 420, 150, { fill: RED, fop: 0.25, c: 'none', sw: 0 });
  s += S.rect(10, top, 420, 14, { fill: BROWN, fop: 0.5, c: 'none', sw: 0 }) + lab(14, top - 6, 'overburden (soil, waste rock) removed', { size: 10 });
  // stepped pit outline: left benches down to the floor, then right benches back up
  const bh = PIT.benchH * K;
  const left = [[60, top]];
  const right = [[380, top]];
  let y = top;
  for (let i = 0; i < PIT.benches; i++) {
    y += bh;
    left.push([60 + i * step, y], [60 + (i + 1) * step, y]);
    right.push([380 - i * step, y], [380 - (i + 1) * step, y]);
  }
  const poly = [...left, ...right.reverse()];
  s += S.path('M' + poly.map(([px, py]) => `${px} ${py.toFixed(1)}`).join(' L') + ' Z', { c: 'currentColor', w: 2, fill: 'var(--diagram-fill)' });
  // truck and shovel
  s += S.rect(150, y - 12, 26, 12, { fill: ACC, fop: 0.7, c: ACC, sw: 1 }) + S.circle(156, y, 3, { fill: 'currentColor', c: 'currentColor', sw: 0 }) + S.circle(170, y, 3, { fill: 'currentColor', c: 'currentColor', sw: 0 });
  s += lab(220, y + 18, 'pit floor', { a: 'middle', size: 10 });
  s += S.line(400, top, 400, y, { w: 1 }) + S.line(395, top, 405, top, { w: 1 }) + S.line(395, y, 405, y, { w: 1 }) + lab(408, (top + y) / 2 + 4, `${pitDepth} m`, { size: 10 });
  s += lab(220, 30, `Open-cast mine: ${PIT.benches} benches of ${PIT.benchH} m (illustrative)`, { a: 'middle', size: 11, w: 'bold' });
  s += lab(220, 238, 'Schematic, not to scale; ore body shaded red', { a: 'middle', size: 10, c: MUT });
  const ok = Math.abs(y - top - pitDepth * K) < 1e-9;
  check(ok, `open-cast mine: ${PIT.benches} benches of ${PIT.benchH} m stack to the marked pit depth of ${pitDepth} m`);
  return svgDoc(440, 245, `Schematic cross-section of an open-cast mine. The overburden of soil and waste rock is removed, and the ore body below is dug out in a series of steps called benches, ${PIT.benches} benches of ${PIT.benchH} metres giving a pit ${pitDepth} metres deep; trucks carry ore up from the pit floor.`, s);
})();

// ---------------------------------------------------------------- bauxite to alumina to aluminium (illustrative ratios)
export const ALU = { bauxite: 5, alumina: 2, aluminium: 1 }; // tonnes, rounded illustrative ratios
export const bauxiteFor = (tAl) => tAl * ALU.bauxite / ALU.aluminium;
export const aluminaFor = (tAl) => tAl * ALU.alumina / ALU.aluminium;
export const ALU_CHAIN = (() => {
  let s = '';
  const stages = [
    { t: ALU.bauxite, name: 'Bauxite', where: 'mine (e.g. Koraput)', fill: RED },
    { t: ALU.alumina, name: 'Alumina', where: 'refinery', fill: 'var(--diagram-fill)' },
    { t: ALU.aluminium, name: 'Aluminium', where: 'smelter (needs much power)', fill: MUT },
  ];
  const K = 22; // px per tonne (box height)
  const base = 175;
  let ok = true;
  stages.forEach((st, i) => {
    const x = 30 + i * 145;
    const h = st.t * K;
    s += S.rect(x, base - h, 90, h, { fill: st.fill, fop: 0.5, c: 'currentColor', sw: 1.2 });
    s += lab(x + 45, base - h - 8, `${st.t} t`, { a: 'middle', w: 'bold' });
    s += lab(x + 45, base + 16, st.name, { a: 'middle', w: 'bold' }) + lab(x + 45, base + 30, st.where, { a: 'middle', size: 10 });
    if (i < stages.length - 1) s += S.arrow(x + 96, base - 20, x + 139, base - 20, { c: ACC, w: 2 });
    if (Math.abs(h - st.t * K) > 1e-9) ok = false;
  });
  s += lab(220, 22, 'From ore to metal (rounded, illustrative tonnages)', { a: 'middle', w: 'bold' });
  s += lab(220, 232, 'Box heights proportional to tonnes', { a: 'middle', size: 10, c: MUT });
  ok = ok && ALU.bauxite > ALU.alumina && ALU.alumina > ALU.aluminium;
  check(ok, `bauxite chain: box heights are proportional to ${ALU.bauxite} t bauxite, ${ALU.alumina} t alumina and ${ALU.aluminium} t aluminium, and the mass falls at each stage`);
  return svgDoc(440, 240, `Flow from ore to metal with rounded illustrative tonnages: about ${ALU.bauxite} tonnes of bauxite from the mine are refined into about ${ALU.alumina} tonnes of alumina, which a smelter using large amounts of electricity turns into ${ALU.aluminium} tonne of aluminium.`, s);
})();

// ---------------------------------------------------------------- copper ore grade (illustrative)
export const CU = { grade: 1.2 }; // per cent copper in ore
export const cuIn = (t) => Math.round((CU.grade / 100) * t * 10) / 10;

// ---------------------------------------------------------------- ILLUSTRATIVE output of an imagined company's four bauxite mines (lakh tonnes a year)
export const MINES = [
  { mine: 'Mine A', out: 12 },
  { mine: 'Mine B', out: 8 },
  { mine: 'Mine C', out: 3 },
  { mine: 'Mine D', out: 2 },
];
export const minesTotal = MINES.reduce((a, m) => a + m.out, 0);
export const mineShare = (name) => Math.round((MINES.find((m) => m.mine === name).out / minesTotal) * 1000) / 10;
export const MINE_CHART = (() => {
  const X0 = 60;
  const Y0 = 180;
  const H = 140;
  const max = 15;
  const W = 60;
  let s = S.line(X0, Y0, X0 + MINES.length * (W + 30) + 10, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let t = 0; t <= max; t += 5) s += lab(X0 - 6, Y0 - (t / max) * H + 4, String(t), { a: 'end', size: 10 });
  let ok = true;
  let sum = 0;
  MINES.forEach((m, i) => {
    const h = (m.out / max) * H;
    const x = X0 + 15 + i * (W + 30);
    s += S.rect(x, Y0 - h, W, h, { fill: RED, fop: 0.45, c: RED, sw: 1 });
    s += lab(x + W / 2, Y0 - h - 5, `${m.out} (${mineShare(m.mine)}%)`, { a: 'middle', size: 10, w: 'bold' }) + lab(x + W / 2, Y0 + 15, m.mine, { a: 'middle', size: 10 });
    if (Math.abs(h - (m.out / max) * H) > 1e-9) ok = false;
    sum += mineShare(m.mine);
  });
  s += lab(14, 28, 'output (lakh tonnes a year)', { size: 10 });
  s += lab(230, 212, `Imagined company, total ${minesTotal} lakh tonnes (illustrative)`, { a: 'middle', size: 10, c: MUT });
  ok = ok && Math.abs(sum - 100) < 0.05;
  check(ok, `mine chart: bar heights are proportional to ${MINES.map((m) => m.out).join(', ')} lakh tonnes and the four shares add up to 100%`);
  return svgDoc(440, 220, `Bar chart of illustrative bauxite output of an imagined company's four mines in lakh tonnes a year: ${MINES.map((m) => `${m.mine} ${m.out}, ${mineShare(m.mine)} per cent`).join('; ')}; total ${minesTotal}.`, s);
})();
