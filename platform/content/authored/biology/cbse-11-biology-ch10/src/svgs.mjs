// SVG diagrams for ch10 Cell Cycle and Cell Division (allow-listed elements, palette colours only). Schematics, not to scale.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { PHASES } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const rot = (a, x, y, inner) => `<g transform="rotate(${a} ${x} ${y})">${inner}</g>`;
/** A duplicated chromosome: two sister chromatids side by side joined at the centromere; optional tip colour (crossing over). */
const chromatid = (x, y, L, c, tip) => {
  if (!tip) return S.rect(x, y - L / 2, 5, L, { rx: 2.5, fill: c, fop: 0.6, sw: 0.8 });
  const t = L * 0.3;
  return S.rect(x, y - L / 2, 5, L - t, { rx: 2.5, fill: c, fop: 0.6, sw: 0.8 }) + S.rect(x, y + L / 2 - t, 5, t, { rx: 2.5, fill: tip, fop: 0.6, sw: 0.8 });
};
const dup = (x, y, L, c, tip) => chromatid(x - 6, y, L, c, tip) + chromatid(x + 1, y, L, c) + S.circle(x, y, 2.4, { fill: 'currentColor', sw: 0 });
const single = (x, y, L, c, tip) => chromatid(x - 2.5, y, L, c, tip) + S.circle(x, y, 2, { fill: 'currentColor', sw: 0 });
const aster = (x, y) => S.circle(x, y, 2.5, { fill: 'currentColor', sw: 0 }) + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
  const a = (k / 8) * Math.PI * 2;
  return S.line(x + 4 * Math.cos(a), y + 4 * Math.sin(a), x + 9 * Math.cos(a), y + 9 * Math.sin(a), { w: 0.8 });
}).join('');
const fibre = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { c: 'var(--diagram-muted)', w: 0.7 });
const cell = (x, y, r) => S.circle(x, y, r, { fill: 'var(--diagram-yellow)', fop: 0.1, sw: 1.5 });
const chromatin = (x, y) => S.path(`M${x - 8} ${y - 3} C${x - 4} ${y - 9} ${x} ${y + 5} ${x + 4} ${y - 2} C${x + 7} ${y - 7} ${x + 9} ${y + 4} ${x + 6} ${y + 6}`, { w: 1, c: BLUE }) + S.path(`M${x - 7} ${y + 5} C${x - 2} ${y + 9} ${x + 1} ${y + 1} ${x + 5} ${y + 8}`, { w: 1, c: RED });
const V = (x, y, arm, dir, c) => S.path(`M${x + dir * arm} ${y - arm * 0.6} L${x} ${y} L${x + dir * arm} ${y + arm * 0.6}`, { w: 4.5, c, op: 0.6, cap: 'round', join: 'round' }) + S.circle(x, y, 2, { fill: 'currentColor', sw: 0 });

// 1. The cell cycle
const arc = (cx, cy, r1, r2, a0, a1) => {
  const p = (r, a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${p(r2, a0)} A${r2} ${r2} 0 ${large} 1 ${p(r2, a1)} L${p(r1, a1)} A${r1} ${r1} 0 ${large} 0 ${p(r1, a0)} Z`;
};
const total = PHASES.reduce((s, [, h]) => s + h, 0);
let acc = -Math.PI / 2;
const SECT = PHASES.map(([name, h]) => {
  const a0 = acc;
  const a1 = acc + (h / total) * Math.PI * 2;
  acc = a1;
  return { name, a0, a1, mid: (a0 + a1) / 2 };
});
const CC = { x: 140, y: 136, r1: 56, r2: 100 };
const SECT_C = { G1: 'var(--diagram-green)', S: BLUE, G2: 'var(--diagram-yellow)', M: RED };
const SECT_L = { G1: 'G₁', S: 'S', G2: 'G₂', M: 'M' };
export const CYCLE = svgDoc(
  460,
  280,
  'The cell cycle drawn as a ring (phase lengths illustrative): interphase, more than 95 percent of the cycle, has a G1 phase of growth, an S phase of DNA replication and a G2 phase of preparation for division; the short M phase includes karyokinesis and cytokinesis. Cells that stop dividing leave G1 for the quiescent stage G0, from which they can return when needed',
  [
    ...SECT.map((s) => S.path(arc(CC.x, CC.y, CC.r1, CC.r2, s.a0, s.a1), { fill: SECT_C[s.name], fop: 0.35, w: 1.4 })),
    ...SECT.filter((s) => s.name !== 'M').map((s) => S.text(CC.x + 78 * Math.cos(s.mid), CC.y + 78 * Math.sin(s.mid) + 6, SECT_L[s.name], { a: 'middle', size: 16, w: 'bold' })),
    S.path(`M${(CC.x + 108 * Math.cos(SECT[0].a0)).toFixed(1)} ${(CC.y + 108 * Math.sin(SECT[0].a0)).toFixed(1)} A108 108 0 1 1 ${(CC.x + 108 * Math.cos(SECT[2].a1)).toFixed(1)} ${(CC.y + 108 * Math.sin(SECT[2].a1)).toFixed(1)}`, { w: 1.2, c: 'var(--diagram-muted)', dash: '4 3' }),
    S.text(CC.x, CC.y - 4, 'One', { a: 'middle', size: 11 }), S.text(CC.x, CC.y + 10, 'cell cycle', { a: 'middle', size: 11 }),
    lab(30, 22, 'M phase', { c: RED, w: 'bold' }), S.lead(70, 26, CC.x + 80 * Math.cos(SECT[3].mid), CC.y + 80 * Math.sin(SECT[3].mid)),
    S.circle(300, 54, 20, { fill: 'var(--diagram-muted)', fop: 0.2, sw: 1.2 }), S.text(300, 59, 'G₀', { a: 'middle', size: 14, w: 'bold' }),
    S.arrow(CC.x + 100 * Math.cos(-0.75), CC.y + 100 * Math.sin(-0.75), 282, 62, { w: 1.3, size: 6 }),
    S.arrow(286, 72, CC.x + 104 * Math.cos(-0.45), CC.y + 104 * Math.sin(-0.45), { w: 1.3, size: 6, dash: '3 2' }),
    lab(326, 50, 'Quiescent stage:', { size: 10 }), lab(326, 63, 'active, not dividing', { size: 10 }),
    lab(270, 120, 'G₁: growth, no DNA', { size: 10, c: 'var(--diagram-green)' }), lab(270, 133, 'replication', { size: 10, c: 'var(--diagram-green)' }),
    lab(270, 156, 'S: DNA replicated,', { size: 10, c: BLUE }), lab(270, 169, '2C becomes 4C', { size: 10, c: BLUE }),
    lab(270, 192, 'G₂: proteins made for', { size: 10 }), lab(270, 205, 'mitosis; growth goes on', { size: 10 }),
    lab(270, 228, 'M: karyokinesis then', { size: 10, c: RED }), lab(270, 241, 'cytokinesis', { size: 10, c: RED }),
    lab(26, 266, 'Dashed arc: interphase (G₁, S, G₂), over 95 percent of the cycle', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. DNA content per nucleus through the cycle
const DX = (h) => 60 + h * 15;
const bounds = PHASES.reduce((a, [, h]) => [...a, a[a.length - 1] + h], [0]);
export const DNA_CONTENT = svgDoc(
  520,
  240,
  'Graph of DNA content per nucleus through one cell cycle (phase lengths illustrative): 2C during G1, rising steadily to 4C during S phase, staying at 4C through G2 and mitosis, and falling back to 2C in each daughter cell when the cell divides; the chromosome number stays 2n throughout',
  [
    S.arrow(60, 180, 60, 30, { size: 6 }), S.arrow(56, 180, 500, 180, { size: 6 }),
    S.line(56, 150, 64, 150), S.line(56, 70, 64, 70),
    lab(50, 154, '2C', { a: 'end' }), lab(50, 74, '4C', { a: 'end' }),
    S.path(`M60 150 L${DX(bounds[1])} 150 L${DX(bounds[2])} 70 L${DX(bounds[4])} 70 L${DX(bounds[4])} 150 L${DX(bounds[4]) + 30} 150`, { w: 2.6, c: BLUE }),
    ...bounds.slice(1, 4).map((b) => S.line(DX(b), 40, DX(b), 180, { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' })),
    ...PHASES.map(([n], i) => lab((DX(bounds[i]) + DX(bounds[i + 1])) / 2, 196, SECT_L[n], { a: 'middle', size: 12, w: 'bold' })),
    lab(66, 26, 'DNA content per nucleus', { size: 10 }), lab(500, 212, 'Time through one cycle', { size: 10, a: 'end' }),
    lab(DX(bounds[4]) + 4, 112, 'cell divides:', { size: 10 }), lab(DX(bounds[4]) + 4, 125, 'each daughter 2C', { size: 10 }),
    lab(DX(15), 60, 'replication', { size: 10, a: 'middle', c: BLUE }),
    lab(260, 234, 'Chromosome number stays 2n until the cell divides', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Stages of mitosis (2n = 4: a long and a short pair; blue and red are homologues)
const MX = [56, 150, 244, 338, 432];
const MY = 84;
const prophase = (cx, cy) => cell(cx, cy, 42) + S.circle(cx, cy, 27, { c: 'var(--diagram-muted)', sw: 1.2, dash: '4 3' }) +
  rot(20, cx - 10, cy - 10, dup(cx - 10, cy - 10, 16, BLUE)) + rot(-30, cx + 10, cy - 8, dup(cx + 10, cy - 8, 16, RED)) +
  rot(70, cx - 8, cy + 12, dup(cx - 8, cy + 12, 10, RED)) + rot(-10, cx + 12, cy + 12, dup(cx + 12, cy + 12, 10, BLUE)) +
  aster(cx - 36, cy - 12) + aster(cx + 36, cy + 12);
const metaphase = (cx, cy) => {
  const ys = [[-27, 14, BLUE], [-9, 9, RED], [9, 14, RED], [27, 9, BLUE]];
  return cell(cx, cy, 42) + aster(cx - 36, cy) + aster(cx + 36, cy) + ys.map(([dy]) => fibre(cx - 33, cy, cx - 3, cy + dy) + fibre(cx + 33, cy, cx + 3, cy + dy)).join('') + ys.map(([dy, L, c]) => dup(cx, cy + dy, L, c)).join('') + S.line(cx, cy - 38, cx, cy + 38, { c: 'var(--diagram-accent)', w: 0.8, dash: '2 3' });
};
const anaphase = (cx, cy) => {
  const ys = [[-21, 9, BLUE], [-7, 6, RED], [7, 9, RED], [21, 6, BLUE]];
  return cell(cx, cy, 42) + aster(cx - 36, cy) + aster(cx + 36, cy) + ys.map(([dy]) => fibre(cx - 33, cy, cx - 18, cy + dy) + fibre(cx + 33, cy, cx + 18, cy + dy)).join('') + ys.map(([dy, arm, c]) => V(cx - 18, cy + dy, arm, 1, c) + V(cx + 18, cy + dy, arm, -1, c)).join('');
};
const telophase = (cx, cy) => S.path(`M${cx} ${cy - 36} C${cx - 8} ${cy - 46} ${cx - 46} ${cy - 40} ${cx - 46} ${cy} C${cx - 46} ${cy + 40} ${cx - 8} ${cy + 46} ${cx} ${cy + 36} C${cx + 8} ${cy + 46} ${cx + 46} ${cy + 40} ${cx + 46} ${cy} C${cx + 46} ${cy - 40} ${cx + 8} ${cy - 46} ${cx} ${cy - 36} Z`, { fill: 'var(--diagram-yellow)', fop: 0.1, w: 1.5 }) +
  [-1, 1].map((s) => S.circle(cx + s * 24, cy, 15, { c: 'var(--diagram-muted)', sw: 1.2, dash: '3 2' }) + chromatin(cx + s * 24, cy) + S.circle(cx + s * 24 + 6, cy - 6, 2.5, { fill: 'var(--diagram-muted)', sw: 0 })).join('');
const cytokinesis = (cx, cy) => [-1, 1].map((s) => cell(cx + s * 23, cy, 22) + S.circle(cx + s * 23, cy, 11, { c: 'var(--diagram-muted)', sw: 1.2 }) + chromatin(cx + s * 23, cy)).join('');
const MLAB = [['Prophase', 'Chromosomes', 'condense'], ['Metaphase', 'Chromosomes on', 'the plate'], ['Anaphase', 'Sister chromatids', 'pulled apart'], ['Telophase', 'Nuclear envelopes', 'reform at poles'], ['Cytokinesis', 'Cytoplasm divides:', 'two cells']];
const MSTAGES = [prophase, metaphase, anaphase, telophase, cytokinesis];
/** order: stage indices left to right; lettered: show A to E instead of the stage names. */
const mitosisSvg = (order, lettered) => svgDoc(
  480,
  lettered ? 160 : 190,
  lettered
    ? 'Five stages of mitosis and cytokinesis in an animal cell with four chromosomes, drawn in scrambled order and labelled A to E; blue and red mark homologous chromosomes, and the dotted line in one cell is the metaphase plate'
    : 'Stages of mitosis in an animal cell with four chromosomes (a long and a short pair; blue and red mark homologous chromosomes). Prophase: chromosomes condense into two chromatids joined at the centromere, the nuclear envelope breaks down and asters move to opposite poles. Metaphase: chromosomes line up on the metaphase plate with spindle fibres from both poles attached to the kinetochores. Anaphase: centromeres split and sister chromatids move to opposite poles, centromere first. Telophase: chromosomes decondense and nuclear envelopes reform at each pole. Cytokinesis: the cytoplasm divides to give two identical daughter cells',
  [
    ...order.map((k, i) => MSTAGES[k](MX[i], MY)),
    ...(lettered
      ? order.map((k, i) => lab(MX[i], 146, 'ABCDE'[i], { a: 'middle', size: 15, w: 'bold' }))
      : order.flatMap((k, i) => [lab(MX[i], 146, MLAB[k][0], { a: 'middle', w: 'bold' }), lab(MX[i], 161, MLAB[k][1], { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), lab(MX[i], 174, MLAB[k][2], { a: 'middle', size: 10, c: 'var(--diagram-muted)' })])),
    lab(240, 20, 'Blue and red: homologous chromosomes; dotted line: metaphase plate', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
export const MITOSIS = mitosisSvg([0, 1, 2, 3, 4], false);
/** Lettered, scrambled: A telophase, B metaphase, C cytokinesis, D prophase, E anaphase. */
export const MITOSIS_LETTERED = mitosisSvg([3, 1, 4, 0, 2], true);

// 4. Cytokinesis in animal and plant cells
export const CYTOKINESIS = svgDoc(
  460,
  210,
  'Cytokinesis. Left, an animal cell: a furrow appears in the plasma membrane and deepens until it meets in the centre, dividing the cytoplasm in two. Right, a plant cell inside its rigid wall: a cell plate begins in the centre and grows outwards until it meets the existing side walls; it represents the middle lamella between the two new cells',
  [
    S.path('M30 104 C30 52 100 42 120 72 Q130 86 140 72 C160 42 230 52 230 104 C230 156 160 166 140 136 Q130 122 120 136 C100 166 30 156 30 104 Z', { fill: 'var(--diagram-yellow)', fop: 0.12, w: 1.8 }),
    S.circle(78, 104, 18, { c: 'var(--diagram-muted)', sw: 1.2 }), chromatin(78, 104), S.circle(182, 104, 18, { c: 'var(--diagram-muted)', sw: 1.2 }), chromatin(182, 104),
    S.arrow(130, 36, 130, 66, { c: 'var(--diagram-accent)', w: 1.6, size: 6 }), S.arrow(130, 172, 130, 142, { c: 'var(--diagram-accent)', w: 1.6, size: 6 }),
    lab(130, 22, 'Furrow', { a: 'middle', c: 'var(--diagram-accent)' }),
    lab(130, 192, 'Animal cell: furrow from', { a: 'middle', size: 10, w: 'bold' }), lab(130, 205, 'the edge inwards', { a: 'middle', size: 10, w: 'bold' }),
    S.rect(260, 44, 180, 120, { fill: 'var(--diagram-green)', fop: 0.1, c: 'var(--diagram-brown)', sw: 4 }),
    S.circle(300, 104, 18, { c: 'var(--diagram-muted)', sw: 1.2 }), chromatin(300, 104), S.circle(400, 104, 18, { c: 'var(--diagram-muted)', sw: 1.2 }), chromatin(400, 104),
    ...[76, 86, 96, 106, 116, 126, 136].map((y) => S.circle(350, y, 3.4, { fill: 'var(--diagram-accent)', fop: 0.6, sw: 0.6 })),
    S.arrow(350, 70, 350, 50, { c: 'var(--diagram-accent)', w: 1.4, size: 5 }), S.arrow(350, 142, 350, 160, { c: 'var(--diagram-accent)', w: 1.4, size: 5 }),
    lab(350, 30, 'Cell plate', { a: 'middle', c: 'var(--diagram-accent)' }),
    lab(350, 192, 'Plant cell: plate from', { a: 'middle', size: 10, w: 'bold' }), lab(350, 205, 'the centre outwards', { a: 'middle', size: 10, w: 'bold' }),
    lab(262, 38, 'Wall', { size: 10, c: 'var(--diagram-brown)' }),
  ].join(''),
);

// 5. Prophase I substages (one homologous pair)
const PX = [50, 145, 240, 335, 430];
const PY = 80;
const nuc = (cx, cy, dashed) => S.circle(cx, cy, 38, { fill: 'var(--diagram-fill)', fop: 0.6, sw: 1.4, dash: dashed ? '4 3' : undefined });
const wavy = (x0, y0, x1, y1, c, w = 1.6) => {
  const mx = (x0 + x1) / 2;
  return S.path(`M${x0} ${y0} C${mx - 8} ${y0 + 14} ${mx + 8} ${(y0 + y1) / 2} ${mx} ${(y0 + y1) / 2} S${x1 + 6} ${y1 - 14} ${x1} ${y1}`, { w, c });
};
const lepto = (cx, cy) => nuc(cx, cy) + wavy(cx - 22, cy - 28, cx - 8, cy + 28, BLUE) + wavy(cx + 8, cy - 28, cx + 22, cy + 28, RED) + S.circle(cx + 22, cy - 6, 4, { fill: 'var(--diagram-muted)', sw: 0 });
const zygo = (cx, cy) => nuc(cx, cy) + S.path(`M${cx - 3} ${cy - 28} L${cx - 3} ${cy} C${cx - 3} ${cy + 12} ${cx - 14} ${cy + 18} ${cx - 16} ${cy + 28}`, { w: 2, c: BLUE }) + S.path(`M${cx + 3} ${cy - 28} L${cx + 3} ${cy} C${cx + 3} ${cy + 12} ${cx + 14} ${cy + 18} ${cx + 16} ${cy + 28}`, { w: 2, c: RED }) +
  [-24, -18, -12, -6, 0].map((dy) => S.line(cx - 3, cy + dy, cx + 3, cy + dy, { w: 0.8, c: 'var(--diagram-muted)' })).join('');
const pachy = (cx, cy) => nuc(cx, cy) + S.line(cx - 9, cy - 26, cx - 9, cy + 26, { w: 3.5, c: BLUE, cap: 'round' }) + S.line(cx - 3, cy - 26, cx - 3, cy + 6, { w: 3.5, c: BLUE, cap: 'round' }) + S.line(cx - 3, cy + 6, cx - 3, cy + 26, { w: 3.5, c: RED, cap: 'round' }) +
  S.line(cx + 3, cy - 26, cx + 3, cy + 6, { w: 3.5, c: RED, cap: 'round' }) + S.line(cx + 3, cy + 6, cx + 3, cy + 26, { w: 3.5, c: BLUE, cap: 'round' }) + S.line(cx + 9, cy - 26, cx + 9, cy + 26, { w: 3.5, c: RED, cap: 'round' }) + S.circle(cx, cy + 6, 3.5, { fill: 'var(--diagram-accent)', sw: 0 });
const diplo = (cx, cy) => nuc(cx, cy) + S.path(`M${cx - 20} ${cy - 26} Q${cx - 6} ${cy - 6} ${cx - 2} ${cy + 6} Q${cx - 6} ${cy + 16} ${cx - 14} ${cy + 26}`, { w: 3, c: BLUE }) + S.path(`M${cx - 14} ${cy - 26} Q${cx - 2} ${cy - 8} ${cx + 2} ${cy + 6} Q${cx + 6} ${cy + 16} ${cx + 14} ${cy + 26}`, { w: 3, c: BLUE }) +
  S.path(`M${cx + 20} ${cy - 26} Q${cx + 6} ${cy - 6} ${cx + 2} ${cy + 6} Q${cx + 6} ${cy + 16} ${cx + 20} ${cy + 26}`, { w: 3, c: RED }) + S.path(`M${cx + 14} ${cy - 26} Q${cx + 2} ${cy - 8} ${cx - 2} ${cy + 6} Q${cx - 6} ${cy + 16} ${cx - 20} ${cy + 26}`, { w: 3, c: RED }) + S.circle(cx, cy + 6, 4, { c: 'var(--diagram-accent)', sw: 1.4 });
const diaki = (cx, cy) => nuc(cx, cy, true) + S.path(`M${cx - 16} ${cy - 16} L${cx - 3} ${cy + 16}`, { w: 4.5, c: BLUE, cap: 'round' }) + S.path(`M${cx - 10} ${cy - 18} L${cx - 1} ${cy + 16}`, { w: 4.5, c: BLUE, cap: 'round' }) +
  S.path(`M${cx + 16} ${cy - 16} L${cx + 3} ${cy + 16}`, { w: 4.5, c: RED, cap: 'round' }) + S.path(`M${cx + 10} ${cy - 18} L${cx + 1} ${cy + 16}`, { w: 4.5, c: RED, cap: 'round' }) + S.circle(cx, cy + 18, 4, { c: 'var(--diagram-accent)', sw: 1.4 });
const PLAB = [['Leptotene', 'Chromosomes', 'become visible'], ['Zygotene', 'Synapsis:', 'homologues pair'], ['Pachytene', 'Tetrad; crossing', 'over at nodules'], ['Diplotene', 'Homologues part', 'but chiasmata stay'], ['Diakinesis', 'Chiasmata at ends;', 'envelope gone']];
const PLAB3 = ['', '', '', '', ''];
const PSTAGES = [lepto, zygo, pachy, diplo, diaki];
const prophaseSvg = (order, lettered) => svgDoc(
  480,
  lettered ? 160 : 190,
  lettered
    ? 'Five substages of prophase I of meiosis for one pair of homologous chromosomes (blue and red), drawn in scrambled order and labelled A to E; the accent ring marks a crossover site'
    : 'The five substages of prophase I of meiosis, shown for one pair of homologous chromosomes (blue and red). Leptotene: chromosomes condense and become visible. Zygotene: homologous chromosomes pair (synapsis) with a synaptonemal complex between them. Pachytene: the bivalent appears as a tetrad of four chromatids, and crossing over between non-sister chromatids occurs at a recombination nodule. Diplotene: the synaptonemal complex dissolves and homologues separate except at the crossover sites, the X-shaped chiasmata. Diakinesis: chiasmata terminalise, chromosomes are fully condensed and the nuclear envelope breaks down',
  [
    ...order.map((k, i) => PSTAGES[k](PX[i], PY)),
    ...(lettered
      ? order.map((k, i) => lab(PX[i], 142, 'ABCDE'[i], { a: 'middle', size: 15, w: 'bold' }))
      : order.flatMap((k, i) => {
        const [x, y, z] = PLAB[k];
        return [lab(PX[i], 138, x, { a: 'middle', w: 'bold' }), lab(PX[i], 153, y, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), lab(PX[i], 166, z, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), ...(PLAB3[k] ? [lab(PX[i], 179, PLAB3[k], { a: 'middle', size: 10, c: 'var(--diagram-muted)' })] : [])];
      })),
    lab(240, 20, 'One homologous pair (blue and red); accent ring: crossover site', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
export const PROPHASE_I = prophaseSvg([0, 1, 2, 3, 4], false);
/** Lettered, scrambled: A diplotene, B leptotene, C diakinesis, D pachytene, E zygotene. */
export const PROPHASE_I_LETTERED = prophaseSvg([3, 0, 4, 2, 1], true);

// 6. Meiosis I and II after prophase I (2n = 4; crossing over shown as swapped tips)
const R1 = 80;
const R2 = 236;
const C3 = [80, 240, 400];
const metaI = (cx, cy) => cell(cx, cy, 50) + aster(cx - 46, cy) + aster(cx + 46, cy) +
  [[-18, 20, BLUE, RED, RED, BLUE], [20, 12, RED, null, BLUE, null]].map(([dy, L, cl, tl, cr, tr]) => fibre(cx - 43, cy, cx - 9, cy + dy) + fibre(cx + 43, cy, cx + 9, cy + dy) + dup(cx - 8, cy + dy, L, cl, tl) + dup(cx + 8, cy + dy, L, cr, tr)).join('') +
  S.line(cx, cy - 46, cx, cy + 46, { c: 'var(--diagram-accent)', w: 0.8, dash: '2 3' });
const anaI = (cx, cy) => cell(cx, cy, 50) + aster(cx - 46, cy) + aster(cx + 46, cy) +
  fibre(cx - 43, cy, cx - 28, cy - 16) + fibre(cx - 43, cy, cx - 28, cy + 18) + fibre(cx + 43, cy, cx + 28, cy - 16) + fibre(cx + 43, cy, cx + 28, cy + 18) +
  dup(cx - 26, cy - 16, 20, BLUE, RED) + dup(cx - 26, cy + 18, 12, RED) + dup(cx + 26, cy - 16, 20, RED, BLUE) + dup(cx + 26, cy + 18, 12, BLUE);
const teloI = (cx, cy) => [[-1, BLUE, RED, RED], [1, RED, BLUE, BLUE]].map(([s, c1, t1, c2]) => cell(cx + s * 31, cy, 29) + S.circle(cx + s * 31, cy, 19, { c: 'var(--diagram-muted)', sw: 1, dash: '3 2' }) + dup(cx + s * 31 - 6, cy - 2, 18, c1, t1) + dup(cx + s * 31 + 8, cy + 2, 11, c2)).join('');
const metaII = (cx, cy) => [[-1, BLUE, RED, RED], [1, RED, BLUE, BLUE]].map(([s, c1, t1, c2]) => {
  const x = cx + s * 38;
  return cell(x, cy, 34) + aster(x - 30, cy) + aster(x + 30, cy) + fibre(x - 27, cy, x - 3, cy - 10) + fibre(x + 27, cy, x + 3, cy - 10) + fibre(x - 27, cy, x - 3, cy + 14) + fibre(x + 27, cy, x + 3, cy + 14) + dup(x, cy - 10, 16, c1, t1) + dup(x, cy + 14, 10, c2);
}).join('');
const anaII = (cx, cy) => [[-1, BLUE, RED, RED], [1, RED, BLUE, BLUE]].map(([s, c1, t1, c2]) => {
  const x = cx + s * 38;
  return cell(x, cy, 34) + aster(x - 30, cy) + aster(x + 30, cy) + V(x - 13, cy - 8, 7, 1, c1) + V(x + 13, cy - 8, 7, -1, t1 === RED ? c1 : c1) + V(x - 13, cy + 12, 5, 1, c2) + V(x + 13, cy + 12, 5, -1, c2);
}).join('');
const teloII = (cx, cy) => [[-24, -24, BLUE, null], [24, -24, BLUE, RED], [-24, 24, RED, BLUE], [24, 24, RED, null]].map(([dx, dy, c, tip], i) => cell(cx + dx, cy + dy, 22) + single(cx + dx - 6, cy + dy, 16, c, tip) + single(cx + dx + 7, cy + dy, 10, i < 2 ? RED : BLUE)).join('');
const MEI = [['Metaphase I', 'Bivalents on the equator'], ['Anaphase I', 'Homologues separate;'], ['Telophase I', 'Dyad of cells'], ['Metaphase II', 'Chromosomes on the plate'], ['Anaphase II', 'Centromeres split; sister'], ['Telophase II', 'Tetrad: four haploid cells']];
const MEI2 = ['', 'chromatids stay joined', '', 'in each cell', 'chromatids separate', ''];
export const MEIOSIS = svgDoc(
  480,
  354,
  'Meiosis after prophase I in a cell with four chromosomes (2n = 4; a long and a short pair, blue and red homologues; tips of swapped colour show where crossing over occurred). Metaphase I: bivalents line up on the equator, homologues attached to opposite poles. Anaphase I: homologous chromosomes separate while sister chromatids stay joined at the centromere. Telophase I: two cells (a dyad), each with one chromosome of each pair. Metaphase II: in each cell chromosomes align and spindle fibres attach to the kinetochores of sister chromatids. Anaphase II: centromeres split and sister chromatids move apart. Telophase II: four haploid cells (a tetrad)',
  [
    metaI(C3[0], R1), anaI(C3[1], R1), teloI(C3[2], R1),
    metaII(C3[0], R2), anaII(C3[1], R2), teloII(C3[2], R2),
    ...MEI.map(([a, b], i) => {
      const x = C3[i % 3];
      const y = (i < 3 ? R1 : R2) + 62;
      return lab(x, y, a, { a: 'middle', w: 'bold' }) + lab(x, y + 14, b, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }) + (MEI2[i] ? lab(x, y + 27, MEI2[i], { a: 'middle', size: 10, c: 'var(--diagram-muted)' }) : '');
    }),
    lab(240, 348, 'Meiosis I halves the chromosome number; meiosis II separates sister chromatids', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

export const ALL = { CYCLE, DNA_CONTENT, MITOSIS, MITOSIS_LETTERED, CYTOKINESIS, PROPHASE_I, PROPHASE_I_LETTERED, MEIOSIS };
