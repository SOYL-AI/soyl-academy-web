// SVG diagrams for ICSE 9 Biology ch02 Tissues. All drawn with the S helpers and palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const f = (n) => Math.round(n * 10) / 10;
const dot = (x, y, r = 1.8, c = 'currentColor') => S.circle(x, y, r, { fill: c, sw: 0 });
/** Label with a muted leader. side 'l' text ends at (x, y); 'r' starts at (x, y); 'c' centred above target; 'b' centred below target. */
function label(parts, text, x, y, tx, ty, side, o = {}) {
  const gap = side === 'l' ? 4 : side === 'r' ? -4 : 0;
  parts.push(S.lead(x + gap, y - (side === 'c' ? -4 : side === 'b' ? 14 : 4), tx, ty));
  parts.push(S.text(x, y, text, { a: side === 'l' ? 'end' : side === 'r' ? 'start' : 'middle', size: o.size ?? 11, w: o.w }));
}
const hex = (cx, cy, r, o) => {
  const pts = [0, 1, 2, 3, 4, 5].map((i) => [cx + r * Math.cos(Math.PI / 6 + (i * Math.PI) / 3), cy + r * Math.sin(Math.PI / 6 + (i * Math.PI) / 3)]);
  return S.path(`M${pts.map(([a, b]) => `${f(a)} ${f(b)}`).join(' L')} Z`, o);
};
const head = (parts, x, y, t) => parts.push(S.text(x, y, t, { a: 'middle', size: 12, w: 'bold' }));

// ---------------------------------------------------------------- 1. where the meristems lie
export const MERISTEMS = (() => {
  const p = [];
  p.push(S.line(60, 170, 460, 170, { c: 'var(--diagram-brown)', w: 2, dash: '6 4' }));
  p.push(S.text(70, 187, 'soil level', { size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.rect(243, 40, 14, 130, { fill: 'var(--diagram-green)', fop: 0.2, sw: 1.5 }));
  for (const [y, side] of [[60, -1], [105, 1], [145, -1]]) p.push(S.path(`M${250 + side * 7} ${y} Q${250 + side * 40} ${y - 25} ${250 + side * 62} ${y - 6} Q${250 + side * 40} ${y + 8} ${250 + side * 7} ${y}`, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.2 }));
  p.push(S.circle(250, 42, 9, { fill: 'var(--diagram-red)', fop: 0.45, sw: 1.5 }));
  p.push(S.ellipse(250, 84, 12, 5, { fill: 'var(--diagram-blue)', fop: 0.45, sw: 1.5 }));
  p.push(S.line(246, 110, 246, 168, { c: 'var(--diagram-yellow)', w: 2.4, dash: '4 3' }), S.line(254, 110, 254, 168, { c: 'var(--diagram-yellow)', w: 2.4, dash: '4 3' }));
  p.push(S.line(250, 170, 250, 262, { c: 'var(--diagram-brown)', w: 5, cap: 'round' }));
  p.push(S.path('M250 195 Q225 205 205 235', { c: 'var(--diagram-brown)', w: 2.5 }), S.path('M250 205 Q275 215 296 240', { c: 'var(--diagram-brown)', w: 2.5 }));
  p.push(S.circle(250, 264, 8, { fill: 'var(--diagram-red)', fop: 0.45, sw: 1.5 }));
  label(p, 'Apical meristem of the shoot', 400, 44, 260, 42, 'r');
  label(p, 'Intercalary meristem (base of an internode)', 400, 90, 262, 85, 'r');
  label(p, 'Lateral meristem (cambium): increases girth', 400, 150, 256, 140, 'r');
  label(p, 'Apical meristem of the root', 400, 268, 259, 265, 'r');
  p.push(S.text(70, 60, 'Red: apical', { size: 10, c: 'var(--diagram-red)' }), S.text(70, 75, 'Blue: intercalary', { size: 10, c: 'var(--diagram-blue)' }), S.text(70, 90, 'Yellow: lateral', { size: 10, c: 'var(--diagram-yellow)' }));
  return svgDoc(640, 285, 'A young plant showing three kinds of meristem: apical meristems at the shoot tip and the root tip, an intercalary meristem at the base of an internode, and a lateral meristem, the cambium, running along the stem and root', p.join(''));
})();

// ---------------------------------------------------------------- 2. simple permanent tissues
export const SIMPLE = (() => {
  const p = [];
  head(p, 110, 22, 'Parenchyma'); head(p, 320, 22, 'Collenchyma'); head(p, 530, 22, 'Sclerenchyma');
  const grid = (cx, cy, r) => [[cx, cy], ...[0, 1, 2, 3, 4, 5].map((i) => [cx + r * 1.73 * Math.cos((i * Math.PI) / 3), cy + r * 1.73 * Math.sin((i * Math.PI) / 3)])];
  for (const [x, y] of grid(110, 100, 22)) { p.push(S.circle(x, y, 20, { fill: 'var(--diagram-green)', fop: 0.12, sw: 1.2 })); p.push(S.circle(x + 3, y, 4, { fill: 'var(--diagram-green)', fop: 0.5, sw: 0.8 })); }
  for (const [x, y] of grid(320, 100, 20)) {
    p.push(hex(x, y, 20, { fill: 'var(--diagram-yellow)', fop: 0.08, w: 1 }));
    for (let i = 0; i < 6; i++) p.push(S.circle(x + 20 * Math.cos(Math.PI / 6 + (i * Math.PI) / 3), y + 20 * Math.sin(Math.PI / 6 + (i * Math.PI) / 3), 4, { fill: 'var(--diagram-yellow)', fop: 0.85, sw: 0 }));
    p.push(S.circle(x, y, 7, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 }));
  }
  for (const [x, y] of grid(530, 100, 20)) { p.push(hex(x, y, 20, { fill: 'var(--diagram-brown)', fop: 0.25, w: 4 })); p.push(S.circle(x, y, 4, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 })); }
  p.push(S.lines(110, 180, ['Living; thin walls;', 'gaps between cells'], { a: 'middle' }), S.lines(320, 180, ['Living; corners of the', 'wall thickened'], { a: 'middle' }), S.lines(530, 180, ['Dead; thick lignified wall;', 'very narrow cavity'], { a: 'middle' }));
  p.push(S.lines(110, 212, ['Storage, photosynthesis'], { a: 'middle', c: 'var(--diagram-muted)' }), S.lines(320, 212, ['Flexible support'], { a: 'middle', c: 'var(--diagram-muted)' }), S.lines(530, 212, ['Strength and hardness'], { a: 'middle', c: 'var(--diagram-muted)' }));
  return svgDoc(640, 225, 'Cross-sections of three simple permanent tissues: parenchyma, rounded thin-walled living cells with spaces between them; collenchyma, living cells with thickened corners; sclerenchyma, dead cells with very thick walls and a narrow cavity', p.join(''));
})();

// ---------------------------------------------------------------- 3. xylem and phloem in long section
export const VASCULAR = (() => {
  const p = [];
  head(p, 130, 22, 'Xylem'); head(p, 440, 22, 'Phloem');
  // vessel
  for (const x of [70, 140]) {
    p.push(S.rect(x, 40, 40, 190, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.8 }));
    for (let y = 52; y < 230; y += 14) p.push(S.line(x, y, x + 40, y + 4, { w: 2.4, c: 'var(--diagram-brown)' }));
  }
  p.push(S.path('M215 40 L230 100 L230 170 L215 230 L200 170 L200 100 Z', { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 }));
  for (let y = 70; y < 215; y += 16) p.push(S.line(205, y, 225, y + 3, { w: 1.8, c: 'var(--diagram-brown)' }));
  p.push(S.text(130, 252, 'Vessels: wide, dead tubes with open ends', { a: 'middle', size: 11 }), S.text(130, 267, 'Water and minerals travel upwards', { a: 'middle', size: 11 }));
  // phloem
  for (const [i, y] of [[0, 40], [1, 112], [2, 184]]) {
    p.push(S.rect(380, y, 44, 66, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 }));
    p.push(S.line(380, y + 66, 424, y + 66, { w: 3, c: 'var(--diagram-green)' }));
    for (let k = 0; k < 4; k++) p.push(dot(386 + k * 11, y + 66, 1.8, 'var(--diagram-fill)'));
    p.push(S.line(392, y + 10, 410, y + 10, { w: 1, c: 'var(--diagram-muted)', dash: '2 2' }), S.line(392, y + 30, 412, y + 30, { w: 1, c: 'var(--diagram-muted)', dash: '2 2' }));
    void i;
    p.push(S.rect(354, y + 6, 20, 54, { fill: 'var(--diagram-yellow)', fop: 0.25, sw: 1.3 }));
    p.push(S.circle(364, y + 33, 6, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 1 }));
  }
  label(p, 'Sieve tube: living, no nucleus', 450, 80, 424, 72, 'r', { size: 11 });
  label(p, 'Sieve plate', 450, 150, 424, 178, 'r');
  label(p, 'Companion cell', 346, 56, 355, 62, 'l');
  p.push(S.text(440, 270, 'Food travels up and down', { a: 'middle', size: 11 }));
  return svgDoc(660, 280, 'Xylem and phloem in long section: xylem vessels, wide hollow dead tubes with thickened walls, carry water and minerals upwards; phloem sieve tubes, living tubes with sieve plates and no nucleus, each with a companion cell that has a nucleus, carry food up and down', p.join(''));
})();

// ---------------------------------------------------------------- 4. epithelial tissues
export const EPITHELIA = (() => {
  const p = [];
  const xs = [90, 240, 390, 540];
  ['Squamous', 'Cuboidal', 'Columnar', 'Ciliated columnar'].forEach((t, i) => head(p, xs[i], 22, t));
  const base = 170;
  xs.forEach((x) => p.push(S.line(x - 62, base, x + 62, base, { w: 3, c: 'var(--diagram-brown)' })));
  // squamous: flat cells
  for (let k = 0; k < 4; k++) { p.push(S.rect(30 + k * 31, base - 16, 31, 14, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 1.2 })); p.push(S.ellipse(45 + k * 31, base - 9, 8, 3.5, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 0.8 })); }
  // cuboidal
  for (let k = 0; k < 4; k++) { p.push(S.rect(182 + k * 31, base - 31, 31, 29, { fill: 'var(--diagram-green)', fop: 0.12, sw: 1.2 })); p.push(S.circle(197 + k * 31, base - 16, 7, { fill: 'var(--diagram-green)', fop: 0.5, sw: 0.8 })); }
  // columnar
  for (let k = 0; k < 4; k++) { p.push(S.rect(332 + k * 31, base - 62, 31, 60, { fill: 'var(--diagram-yellow)', fop: 0.12, sw: 1.2 })); p.push(S.ellipse(347 + k * 31, base - 12, 6, 9, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 0.8 })); }
  // ciliated
  for (let k = 0; k < 4; k++) {
    p.push(S.rect(482 + k * 31, base - 62, 31, 60, { fill: 'var(--diagram-red)', fop: 0.1, sw: 1.2 }));
    p.push(S.ellipse(497 + k * 31, base - 14, 6, 9, { fill: 'var(--diagram-red)', fop: 0.5, sw: 0.8 }));
    for (let c = 0; c < 3; c++) p.push(S.line(488 + k * 31 + c * 9, base - 62, 488 + k * 31 + c * 9, base - 76, { w: 1.2, c: 'var(--diagram-red)' }));
  }
  p.push(S.text(90, 195, 'Thin and flat', { a: 'middle' }), S.text(90, 210, 'Lining of air sacs, mouth', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.text(240, 195, 'Cube-shaped', { a: 'middle' }), S.text(240, 210, 'Kidney tubules, glands', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.text(390, 195, 'Tall, with basal nuclei', { a: 'middle' }), S.text(390, 210, 'Lining of the intestine', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.text(540, 195, 'Cilia on the free surface', { a: 'middle' }), S.text(540, 210, 'Lining of the windpipe', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 225, 'Four types of epithelial tissue resting on a basement layer: squamous, thin flat cells; cuboidal, cube-shaped cells; columnar, tall cells with nuclei near the base; and ciliated columnar, tall cells with cilia on the free surface', p.join(''));
})();

// ---------------------------------------------------------------- 5. connective tissues
export const CONNECTIVE = (() => {
  const p = [];
  const xs = [80, 240, 400, 560];
  ['Areolar', 'Cartilage', 'Bone', 'Adipose'].forEach((t, i) => head(p, xs[i], 22, t));
  // areolar: criss-cross fibres and cells
  p.push(S.rect(20, 40, 120, 110, { sw: 1, c: 'var(--diagram-muted)', rx: 6 }));
  for (const [a, b, c2, d] of [[26, 60, 134, 100], [26, 130, 134, 70], [40, 44, 120, 146], [30, 100, 134, 140], [60, 46, 134, 86]]) p.push(S.line(a, b, c2, d, { w: 1.2, c: 'var(--diagram-red)' }));
  for (const [x, y] of [[60, 70], [100, 110], [70, 128]]) p.push(S.ellipse(x, y, 9, 6, { fill: 'var(--diagram-blue)', fop: 0.4, sw: 1 }));
  // cartilage: cells in lacunae within matrix
  p.push(S.rect(180, 40, 120, 110, { sw: 1, c: 'var(--diagram-muted)', rx: 6, fill: 'var(--diagram-blue)', fop: 0.08 }));
  for (const [x, y] of [[210, 65], [255, 60], [225, 100], [270, 105], [212, 132], [260, 135]]) { p.push(S.circle(x, y, 12, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 })); p.push(S.circle(x, y, 5, { fill: 'var(--diagram-blue)', fop: 0.6, sw: 0.8 })); }
  // bone: concentric rings round a canal
  p.push(S.rect(340, 40, 120, 110, { sw: 1, c: 'var(--diagram-muted)', rx: 6, fill: 'var(--diagram-brown)', fop: 0.1 }));
  for (const rr of [10, 22, 34]) p.push(S.circle(400, 95, rr, { sw: 2, c: 'var(--diagram-brown)' }));
  p.push(S.circle(400, 95, 5, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 }));
  for (const [x, y] of [[400, 80], [415, 95], [385, 105], [400, 118]]) p.push(dot(x, y, 2, 'var(--diagram-brown)'));
  // adipose: big fat cells with peripheral nuclei
  p.push(S.rect(500, 40, 120, 110, { sw: 1, c: 'var(--diagram-muted)', rx: 6 }));
  for (const [x, y] of [[535, 70], [585, 72], [530, 118], [580, 120]]) { p.push(S.circle(x, y, 22, { fill: 'var(--diagram-yellow)', fop: 0.18, sw: 1.4 })); p.push(S.ellipse(x - 17, y - 8, 4, 2.5, { fill: 'var(--diagram-blue)', fop: 0.8, sw: 0 })); }
  p.push(S.lines(80, 172, ['Fibres and cells;', 'binds and fills'], { a: 'middle' }), S.lines(240, 172, ['Cells in spaces; flexible;', 'ear, nose'], { a: 'middle' }), S.lines(400, 172, ['Hard matrix of salts;', 'support'], { a: 'middle' }), S.lines(560, 172, ['Fat stored; cushions;', 'insulates'], { a: 'middle' }));
  return svgDoc(640, 205, 'Four connective tissues: areolar tissue with criss-cross fibres and scattered cells; cartilage with cells lying in spaces in a firm matrix; bone with hard rings of matrix around a central canal; and adipose tissue of large fat-filled cells with nuclei pushed to the edge', p.join(''));
})();

// ---------------------------------------------------------------- 6. muscle tissues
export const MUSCLES = (() => {
  const p = [];
  head(p, 110, 22, 'Striated (skeletal)'); head(p, 320, 22, 'Unstriated (smooth)'); head(p, 530, 22, 'Cardiac');
  // striated: long cylinder with stripes and edge nuclei
  p.push(S.rect(60, 40, 100, 120, { fill: 'var(--diagram-red)', fop: 0.12, sw: 1.5, rx: 8 }));
  for (let y = 48; y < 156; y += 8) p.push(S.line(62, y, 158, y, { w: 1.2, c: 'var(--diagram-red)' }));
  for (const y of [60, 90, 130]) p.push(S.ellipse(66, y, 4, 6, { fill: 'var(--diagram-blue)', fop: 0.8, sw: 0 }));
  // smooth: spindle cells
  for (const [x, y] of [[270, 70], [310, 100], [350, 130]]) { p.push(S.path(`M${x - 40} ${y} Q${x} ${y - 22} ${x + 40} ${y} Q${x} ${y + 22} ${x - 40} ${y} Z`, { fill: 'var(--diagram-green)', fop: 0.2, sw: 1.5 })); p.push(S.ellipse(x, y, 10, 5, { fill: 'var(--diagram-blue)', fop: 0.6, sw: 0 })); }
  // cardiac: branched cells with intercalated discs
  p.push(S.path('M470 60 L530 60 L560 40 L600 40 L600 70 L560 80 L530 100 L470 100 Z', { fill: 'var(--diagram-red)', fop: 0.12, sw: 1.5 }));
  p.push(S.path('M470 100 L530 100 L560 80 L600 70 L600 120 L550 140 L500 140 L470 130 Z', { fill: 'var(--diagram-red)', fop: 0.12, sw: 1.5 }));
  for (let x = 478; x < 596; x += 9) { p.push(S.line(x, 62, x, 98, { w: 0.9, c: 'var(--diagram-red)' })); p.push(S.line(x, 104, x, 134, { w: 0.9, c: 'var(--diagram-red)' })); }
  p.push(S.line(470, 100, 530, 100, { w: 3, c: 'var(--diagram-muted)' }));
  p.push(S.ellipse(520, 80, 8, 6, { fill: 'var(--diagram-blue)', fop: 0.8, sw: 0 }), S.ellipse(550, 120, 8, 6, { fill: 'var(--diagram-blue)', fop: 0.8, sw: 0 }));
  p.push(S.lines(110, 182, ['Striped; many nuclei;', 'voluntary'], { a: 'middle' }), S.lines(320, 182, ['No stripes; one nucleus;', 'involuntary'], { a: 'middle' }), S.lines(530, 182, ['Striped and branched;', 'involuntary'], { a: 'middle' }));
  p.push(S.text(560, 160, 'Intercalated disc', { size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.lead(556, 156, 520, 101));
  return svgDoc(640, 215, 'Three muscle tissues: striated skeletal muscle, long cylindrical fibres with stripes and many nuclei; unstriated smooth muscle, spindle-shaped cells with one nucleus and no stripes; and cardiac muscle, striped branched cells joined by dark intercalated discs', p.join(''));
})();

// ---------------------------------------------------------------- 7. a neuron (named and lettered)
function neuron(lettered) {
  const p = [];
  const N = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Dendrites', 'Cell body', 'Nucleus', 'Axon', 'Axon terminals'];
  const lab = (i, x, y, tx, ty, side) => label(p, N[i], x, y, tx, ty, side, lettered ? { size: 14, w: 'bold' } : {});
  // dendrites
  for (const [x2, y2] of [[40, 50], [30, 105], [45, 165], [90, 30]]) {
    p.push(S.path(`M135 ${y2 < 100 ? 100 : 110} L${x2 + 20} ${y2 + (y2 < 100 ? 12 : -10)} L${x2} ${y2}`, { w: 2, c: 'var(--diagram-brown)' }));
    p.push(S.line(x2 + 20, y2 + (y2 < 100 ? 12 : -10), x2 + 4, y2 + (y2 < 100 ? 22 : -22), { w: 1.4, c: 'var(--diagram-brown)' }));
  }
  p.push(S.path('M110 60 L130 100', { w: 2, c: 'var(--diagram-brown)' }));
  // cell body and nucleus
  p.push(S.path('M120 100 Q135 70 170 80 Q205 90 200 120 Q195 150 160 150 Q120 150 120 100 Z', { fill: 'var(--diagram-green)', fop: 0.2, sw: 2 }));
  p.push(S.circle(160, 115, 17, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.5 }), S.circle(164, 115, 5, { fill: 'var(--diagram-blue)', fop: 0.6, sw: 0 }));
  // axon with myelin
  p.push(S.line(200, 115, 520, 115, { w: 3, c: 'var(--diagram-brown)' }));
  for (let x = 225; x < 480; x += 62) p.push(S.rect(x, 105, 50, 20, { rx: 9, fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.3 }));
  // terminals
  for (const [x2, y2] of [[600, 70], [610, 110], [600, 155]]) { p.push(S.path(`M520 115 L${x2 - 30} ${y2}  L${x2} ${y2}`, { w: 2, c: 'var(--diagram-brown)' })); p.push(S.circle(x2 + 6, y2, 6, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1.2 })); }
  lab(0, 100, 24, 75, 40, 'c');
  lab(1, 150, 190, 160, 148, 'b');
  lab(2, 205, 190, 170, 126, 'b');
  lab(3, 330, 190, 320, 117, 'b');
  lab(4, 580, 190, 604, 160, 'b');
  if (!lettered) label(p, 'Myelin sheath', 400, 65, 410, 106, 'c');
  const name = lettered
    ? 'A neuron with parts lettered A to E: A, the branched fibres at the left end; B, the swollen region with the nucleus; C, the round body inside B; D, the long fibre running to the right; E, the small branches at the right end'
    : 'A neuron: dendrites branch from the cell body, which contains the nucleus; a long axon wrapped in segments of myelin sheath carries impulses to the axon terminals';
  return svgDoc(660, 205, name, p.join(''));
}
export const NEURON = neuron(false);
export const NEURON_LETTERED = neuron(true);
