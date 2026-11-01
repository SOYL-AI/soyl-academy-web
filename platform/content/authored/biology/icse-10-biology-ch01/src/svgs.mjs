// SVG diagrams for ICSE 10 Biology ch01 Cell Cycle, Cell Division and Structure of Chromosomes. All new drawings.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const P = (cx, cy, rr, a) => [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
const f = (n) => Math.round(n * 10) / 10;
/** Pie sector from angle a0 to a1 (radians, clockwise from 12 o'clock when a0 = -PI/2). */
function sector(cx, cy, rr, a0, a1, o) {
  const [x0, y0] = P(cx, cy, rr, a0);
  const [x1, y1] = P(cx, cy, rr, a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return S.path(`M${cx} ${cy} L${f(x0)} ${f(y0)} A${rr} ${rr} 0 ${large} 1 ${f(x1)} ${f(y1)} Z`, o);
}

// ---------------------------------------------------------------- 1. the cell cycle
export const CYCLE = (() => {
  const cx = 170, cy = 150, rr = 110;
  const phases = [
    ['G1', 0.40, 'var(--diagram-green)', 'G1: cell grows, makes proteins'],
    ['S', 0.30, 'var(--diagram-blue)', 'S: DNA is copied'],
    ['G2', 0.20, 'var(--diagram-yellow)', 'G2: prepares for division'],
    ['M', 0.10, 'var(--diagram-red)', 'M: mitosis and cytokinesis'],
  ];
  let a = -Math.PI / 2;
  const parts = [];
  for (const [name, share, col] of phases) {
    const a1 = a + share * 2 * Math.PI;
    parts.push(sector(cx, cy, rr, a, a1, { fill: col, fop: 0.3, w: 1.5 }));
    const [tx, ty] = P(cx, cy, rr * 0.62, (a + a1) / 2);
    parts.push(S.text(tx, ty + 5, name, { a: 'middle', size: 15, w: 'bold' }));
    a = a1;
  }
  parts.push(S.circle(cx, cy, 34, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  parts.push(S.text(cx, cy - 2, 'Inter-', { a: 'middle', size: 10 }), S.text(cx, cy + 11, 'phase', { a: 'middle', size: 10 }));
  // direction arrow round the outside
  const ar0 = -Math.PI / 2 + 0.15, ar1 = -Math.PI / 2 + 1.2;
  const [ax0, ay0] = P(cx, cy, rr + 14, ar0);
  const [ax1, ay1] = P(cx, cy, rr + 14, ar1);
  parts.push(S.path(`M${f(ax0)} ${f(ay0)} A${rr + 14} ${rr + 14} 0 0 1 ${f(ax1)} ${f(ay1)}`, { w: 1.5 }));
  parts.push(S.head(ax1, ay1, ar1 + Math.PI / 2, { size: 8 }));
  phases.forEach(([, , col, text], i) => {
    parts.push(S.rect(310, 70 + i * 34, 14, 14, { fill: col, fop: 0.3, sw: 1 }));
    parts.push(lab(330, 82 + i * 34, text));
  });
  parts.push(lab(310, 220, 'Interphase = G1 + S + G2', { c: 'var(--diagram-muted)' }));
  parts.push(lab(310, 238, '(the longest part of the cycle)', { c: 'var(--diagram-muted)' }));
  return svgDoc(520, 280, 'The cell cycle drawn as a circle: G1 (growth), S (DNA copied) and G2 (preparation) together form interphase, the longest part; M (mitosis and cytokinesis) is the shortest part; the cycle runs clockwise', parts.join(''));
})();

// ---------------------------------------------------------------- 2. stages of mitosis (animal cell, 2n = 4)
const X = (x, y, h, col, ang = 0) => {
  // a duplicated chromosome: two chromatids joined at the centromere
  const dx = Math.sin(ang) * h, dy = Math.cos(ang) * h;
  return S.line(x - dx - 3, y - dy, x + dx - 3, y + dy, { c: col, w: 3.2, cap: 'round' }) + S.line(x - dx + 3, y - dy, x + dx + 3, y + dy, { c: col, w: 3.2, cap: 'round' }) + S.circle(x, y, 2.6, { fill: 'currentColor', sw: 0 });
};
const I = (x, y, h, col) => S.line(x, y - h, x, y + h, { c: col, w: 3.2, cap: 'round' });
export const MITOSIS = (() => {
  const W = 150, parts = [];
  const cell = (i, title) => {
    const cx = 80 + i * W;
    parts.push(S.circle(cx, 110, 60, { sw: 1.5 }));
    parts.push(S.text(cx, 200, title, { a: 'middle', size: 12, w: 'bold' }));
    return cx;
  };
  // Prophase: nuclear membrane fading (dashed), condensed chromosomes, centrioles moving apart
  let cx = cell(0, 'Prophase');
  parts.push(S.circle(cx, 110, 36, { dash: '4 3', sw: 1.2 }));
  parts.push(X(cx - 14, 98, 10, 'var(--diagram-red)', 0.5), X(cx + 12, 96, 13, 'var(--diagram-blue)', -0.3), X(cx - 8, 124, 13, 'var(--diagram-red)', -0.6), X(cx + 14, 124, 10, 'var(--diagram-blue)', 0.4));
  parts.push(S.circle(cx - 44, 80, 3, { fill: 'currentColor', sw: 0 }), S.circle(cx + 44, 140, 3, { fill: 'currentColor', sw: 0 }));
  // Metaphase: chromosomes on the equator, spindle fibres to poles
  cx = cell(1, 'Metaphase');
  for (const y of [86, 102, 118, 134]) parts.push(S.line(cx - 50, 110, cx - 4, y, { c: 'var(--diagram-muted)', w: 1 }), S.line(cx + 50, 110, cx + 4, y, { c: 'var(--diagram-muted)', w: 1 }));
  parts.push(X(cx, 86, 6, 'var(--diagram-red)', Math.PI / 2), X(cx, 102, 8, 'var(--diagram-blue)', Math.PI / 2), X(cx, 118, 8, 'var(--diagram-red)', Math.PI / 2), X(cx, 134, 6, 'var(--diagram-blue)', Math.PI / 2));
  parts.push(S.line(cx, 52, cx, 168, { dash: '3 3', c: 'var(--diagram-muted)', w: 1 }));
  // Anaphase: chromatids pulled to opposite poles
  cx = cell(2, 'Anaphase');
  for (const y of [90, 104, 116, 130]) {
    parts.push(S.line(cx - 50, 110, cx - 22, y, { c: 'var(--diagram-muted)', w: 1 }), S.line(cx + 50, 110, cx + 22, y, { c: 'var(--diagram-muted)', w: 1 }));
  }
  [[90, 'var(--diagram-red)'], [104, 'var(--diagram-blue)'], [116, 'var(--diagram-red)'], [130, 'var(--diagram-blue)']].forEach(([y, c]) => {
    parts.push(S.path(`M${cx - 30} ${y - 6} Q${cx - 20} ${y} ${cx - 30} ${y + 6}`, { c, w: 3, cap: 'round' }));
    parts.push(S.path(`M${cx + 30} ${y - 6} Q${cx + 20} ${y} ${cx + 30} ${y + 6}`, { c, w: 3, cap: 'round' }));
  });
  // Telophase: two nuclei re-forming, furrow starting
  cx = cell(3, 'Telophase');
  parts.push(S.circle(cx - 28, 110, 20, { dash: '4 3', sw: 1.2 }), S.circle(cx + 28, 110, 20, { dash: '4 3', sw: 1.2 }));
  parts.push(I(cx - 34, 104, 6, 'var(--diagram-red)'), I(cx - 22, 116, 6, 'var(--diagram-blue)'), I(cx - 30, 118, 5, 'var(--diagram-red)'), I(cx - 22, 100, 5, 'var(--diagram-blue)'));
  parts.push(I(cx + 22, 104, 6, 'var(--diagram-red)'), I(cx + 34, 116, 6, 'var(--diagram-blue)'), I(cx + 26, 118, 5, 'var(--diagram-red)'), I(cx + 34, 100, 5, 'var(--diagram-blue)'));
  parts.push(S.path(`M${cx - 6} 52 Q${cx} 60 ${cx + 6} 52`, { w: 1.5 }), S.path(`M${cx - 6} 168 Q${cx} 160 ${cx + 6} 168`, { w: 1.5 }));
  parts.push(lab(10, 226, 'Red and blue mark the chromosomes of the two homologous pairs (2n = 4).', { size: 10, c: 'var(--diagram-muted)' }), lab(10, 240, 'Dashed circles: nuclear membrane breaking down or re-forming.', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(610, 250, 'Four stages of mitosis in an animal cell with four chromosomes. Prophase: chromosomes condense into two chromatids each, the nuclear membrane breaks down and centrioles move apart. Metaphase: chromosomes line up on the equator attached to spindle fibres. Anaphase: sister chromatids separate and move to opposite poles. Telophase: nuclear membranes re-form around two groups of four chromosomes and the cell begins to divide', parts.join(''));
})();

// ---------------------------------------------------------------- 3. structure of a chromosome (named and lettered)
function chromosome(lettered) {
  const parts = [];
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Chromatid', 'Centromere', 'Gene', 'DNA double helix', 'Chromatin (DNA wound on proteins)'];
  // two chromatids: rounded bars pinched at the centromere
  const arm = (x) => S.path(`M${x} 40 Q${x - 12} 40 ${x - 12} 60 L${x - 12} 112 Q${x - 12} 124 ${x - 4} 130 Q${x - 12} 136 ${x - 12} 148 L${x - 12} 230 Q${x - 12} 250 ${x} 250 Q${x + 12} 250 ${x + 12} 230 L${x + 12} 148 Q${x + 12} 136 ${x + 4} 130 Q${x + 12} 124 ${x + 12} 112 L${x + 12} 60 Q${x + 12} 40 ${x} 40 Z`, { fill: 'var(--diagram-blue)', fop: 0.25, w: 1.5 });
  parts.push(arm(110), arm(140));
  parts.push(S.circle(125, 130, 7, { fill: 'currentColor', sw: 0 }));
  // a gene band on one chromatid
  parts.push(S.rect(98, 176, 24, 14, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1 }));
  // zoom: chromatin and DNA
  parts.push(S.line(122, 183, 236, 150, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }));
  parts.push(S.rect(236, 110, 200, 160, { rx: 8, sw: 1, dash: '4 3', c: 'var(--diagram-muted)' }));
  for (let i = 0; i < 4; i++) parts.push(S.circle(270 + i * 40, 150, 11, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1 }));
  parts.push(S.path('M248 150 C260 132 280 132 270 150 C262 166 300 166 310 150 C320 132 340 132 350 150 C358 166 380 166 390 150 C400 132 420 132 426 150', { w: 1.6 }));
  // double helix
  let d1 = 'M250 230', d2 = 'M250 230';
  for (let x = 250; x <= 424; x += 4) {
    const y1 = 230 + 16 * Math.sin((x - 250) / 14);
    const y2 = 230 - 16 * Math.sin((x - 250) / 14);
    d1 += ` L${x} ${f(y1)}`;
    d2 += ` L${x} ${f(y2)}`;
  }
  parts.push(S.path(d1, { c: 'var(--diagram-red)', w: 1.6 }), S.path(d2, { c: 'var(--diagram-blue)', w: 1.6 }));
  for (let x = 258; x < 424; x += 11) parts.push(S.line(x, 230 + 16 * Math.sin((x - 250) / 14), x, 230 - 16 * Math.sin((x - 250) / 14), { c: 'var(--diagram-muted)', w: 1 }));
  // labels with leaders
  const lbl = (i, x, y, tx, ty, anchor = 'start') => parts.push(S.lead(x, y, tx + (anchor === 'end' ? 4 : -4), ty - 4), S.text(tx, ty, L[i], { a: anchor, size: lettered ? 14 : 11, w: lettered ? 'bold' : undefined }));
  lbl(0, 98, 80, 60, 60, 'end');
  lbl(1, 118, 132, 60, 140, 'end');
  lbl(2, 98, 184, 60, 200, 'end');
  lbl(3, 330, 248, 330, 286, 'middle');
  lbl(4, 300, 140, 300, 104, 'middle');
  const label = lettered
    ? 'A metaphase chromosome made of two sister chromatids joined at a centromere, with a magnified box. Parts are lettered: A, one of the two chromatids; B, the constriction joining them; C, a coloured band on one chromatid; D, the twisted double strand in the lower half of the box; E, the beaded thread in the upper half of the box'
    : 'A metaphase chromosome made of two sister chromatids joined at the centromere. A gene is a band on one chromatid. A magnified box shows chromatin, DNA wound on protein beads, and the DNA double helix';
  return svgDoc(480, 300, label, parts.join(''));
}
export const CHROMOSOME = chromosome(false);
export const CHROMOSOME_LETTERED = chromosome(true);

// ---------------------------------------------------------------- 4. cytokinesis: animal furrow vs plant cell plate
export const CYTOKINESIS = (() => {
  const parts = [];
  parts.push(S.text(110, 20, 'Animal cell: furrowing', { a: 'middle', size: 12, w: 'bold' }), S.text(370, 20, 'Plant cell: cell plate', { a: 'middle', size: 12, w: 'bold' }));
  parts.push(S.path('M30 110 C30 50 100 40 110 75 C120 40 190 50 190 110 C190 170 120 180 110 145 C100 180 30 170 30 110 Z', { w: 1.6 }));
  parts.push(S.circle(70, 110, 16, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }), S.circle(150, 110, 16, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  parts.push(S.arrow(110, 50, 110, 70, { size: 7 }), S.arrow(110, 170, 110, 150, { size: 7 }));
    parts.push(S.rect(290, 50, 160, 120, { sw: 2.4 }), S.rect(296, 56, 148, 108, { sw: 0.8, c: 'var(--diagram-muted)' }));
  parts.push(S.circle(330, 110, 16, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }), S.circle(410, 110, 16, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  for (let y = 84; y <= 136; y += 8) parts.push(S.circle(370, y, 2.5, { fill: 'var(--diagram-green)', sw: 0 }));
  parts.push(S.arrow(362, 110, 344, 110, { size: 6, c: 'var(--diagram-green)' }), S.arrow(378, 110, 396, 110, { size: 6, c: 'var(--diagram-green)' }));
  parts.push(lab(300, 196, 'Vesicles join at the centre to form'), lab(300, 210, 'a cell plate that grows outwards'), lab(300, 224, '(a rigid wall cannot furrow)'));
  parts.push(lab(30, 196, 'A furrow deepens from outside'), lab(30, 210, 'inwards and pinches the cell'), lab(30, 224, 'into two'));
  return svgDoc(480, 240, 'Cytokinesis compared. Animal cell: the cell membrane forms a furrow that deepens from outside inwards and pinches the cell in two. Plant cell: vesicles collect at the centre to form a cell plate, which grows outwards to the side walls, because the rigid cell wall cannot furrow', parts.join(''));
})();

// ---------------------------------------------------------------- 5. crossing over between homologous chromosomes
export const CROSSOVER = (() => {
  const parts = [];
  const bar = (x, y0, y1, c) => S.line(x, y0, x, y1, { c, w: 7, cap: 'round' });
  // before
  parts.push(S.text(90, 20, 'Homologous pair', { a: 'middle', size: 12, w: 'bold' }));
  parts.push(bar(60, 40, 200, 'var(--diagram-red)'), bar(74, 40, 200, 'var(--diagram-red)'), bar(106, 40, 200, 'var(--diagram-blue)'), bar(120, 40, 200, 'var(--diagram-blue)'));
  parts.push(S.circle(67, 110, 4, { fill: 'currentColor', sw: 0 }), S.circle(113, 110, 4, { fill: 'currentColor', sw: 0 }));
  parts.push(lab(20, 228, 'from father'), lab(100, 228, 'from mother'));
  // crossing
  parts.push(S.arrow(150, 120, 196, 120, { size: 8 }));
  parts.push(S.text(300, 20, 'Chiasma: inner chromatids cross', { a: 'middle', size: 12, w: 'bold' }));
  parts.push(bar(250, 40, 200, 'var(--diagram-red)'), bar(350, 40, 200, 'var(--diagram-blue)'));
  parts.push(S.path('M280 40 L280 140 L320 180 L320 200', { c: 'var(--diagram-red)', w: 7, cap: 'round', join: 'round' }));
  parts.push(S.path('M320 40 L320 140 L280 180 L280 200', { c: 'var(--diagram-blue)', w: 7, cap: 'round', join: 'round' }));
  parts.push(S.circle(300, 160, 12, { dash: '3 3', sw: 1.2 }));
  parts.push(S.arrow(400, 120, 446, 120, { size: 8 }));
  // after
  parts.push(S.text(530, 20, 'After crossing over', { a: 'middle', size: 12, w: 'bold' }));
  parts.push(bar(490, 40, 200, 'var(--diagram-red)'), S.line(504, 40, 504, 150, { c: 'var(--diagram-red)', w: 7, cap: 'round' }), S.line(504, 156, 504, 200, { c: 'var(--diagram-blue)', w: 7, cap: 'round' }));
  parts.push(S.line(556, 40, 556, 150, { c: 'var(--diagram-blue)', w: 7, cap: 'round' }), S.line(556, 156, 556, 200, { c: 'var(--diagram-red)', w: 7, cap: 'round' }), bar(570, 40, 200, 'var(--diagram-blue)'));
  parts.push(lab(470, 226, 'Two chromatids now carry'), lab(470, 240, 'new combinations of genes'));
  return svgDoc(620, 250, 'Crossing over. Left: a homologous pair, one chromosome from the father (red) and one from the mother (blue), each of two chromatids. Middle: an inner red and an inner blue chromatid cross at a chiasma and exchange segments. Right: two chromatids now carry new combinations of red and blue segments', parts.join(''));
})();
