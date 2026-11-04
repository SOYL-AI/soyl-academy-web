// SVG diagrams for ICSE 9 Biology ch01 The Cell: A Unit of Life. All drawn with the S helpers and palette colours only.
import { svgDoc, S } from './lib.mjs';

const f = (n) => Math.round(n * 10) / 10;
const dot = (x, y, r = 1.8, c = 'currentColor') => S.circle(x, y, r, { fill: c, sw: 0 });
/** Label with a muted leader. side 'l' text ends at (x, y); 'r' text starts at (x, y); 'c' centred. */
function label(parts, text, x, y, tx, ty, side, o = {}) {
  const size = o.size ?? 11;
  const gap = side === 'l' ? 4 : side === 'r' ? -4 : 0;
  parts.push(S.lead(x + gap, y - (side === 'c' ? -4 : side === 'b' ? 14 : 4), tx, ty));
  parts.push(S.text(x, y, text, { a: side === 'l' ? 'end' : side === 'r' ? 'start' : 'middle', size, w: o.w }));
}
const mito = (cx, cy, rx, ry) => {
  const p = [S.ellipse(cx, cy, rx, ry, { fill: 'var(--diagram-red)', fop: 0.18, sw: 1.5 }), S.ellipse(cx, cy, rx - 3, ry - 3, { sw: 0.8, c: 'var(--diagram-muted)' })];
  let d = `M${f(cx - rx + 6)} ${f(cy)}`;
  for (let i = 0; i < 5; i++) {
    const x = cx - rx + 8 + i * ((rx * 2 - 16) / 5);
    d += ` L${f(x)} ${f(cy - ry + 4)} L${f(x + 3)} ${f(cy + 1)} L${f(x + 5)} ${f(cy + ry - 4)}`;
  }
  p.push(S.path(d, { w: 1, c: 'var(--diagram-red)' }));
  return p.join('');
};
const rer = (x, y, w, n, gap = 9) => {
  const p = [];
  for (let i = 0; i < n; i++) {
    const yy = y + i * gap;
    p.push(S.path(`M${x} ${yy} Q${f(x + w / 4)} ${yy - 4} ${f(x + w / 2)} ${yy} T${x + w} ${yy}`, { w: 2.2, c: 'var(--diagram-blue)' }));
    for (let k = 0; k < 6; k++) p.push(dot(x + 6 + k * ((w - 12) / 5), yy - 3.2, 1.5));
  }
  return p.join('');
};
const golgi = (x, y, w, n, gap = 8) => {
  const p = [];
  for (let i = 0; i < n; i++) p.push(S.path(`M${x + i * 2} ${y + i * gap} Q${f(x + w / 2)} ${y + i * gap - 9} ${x + w - i * 2} ${y + i * gap}`, { w: 3, c: 'var(--diagram-yellow)', cap: 'round' }));
  p.push(S.circle(x - 8, y + 6, 3, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }), S.circle(x + w + 8, y + n * gap - 8, 3, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }));
  return p.join('');
};
const nucleus = (cx, cy, r) => S.circle(cx, cy, r, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 1.8 }) + S.circle(cx + 7, cy - 2, r * 0.28, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 1 });

// ---------------------------------------------------------------- 1. generalised animal cell
export const ANIMAL = (() => {
  const p = [];
  p.push(S.ellipse(330, 165, 165, 120, { fill: 'var(--diagram-fill)', fop: 0.6, sw: 2 }));
  p.push(nucleus(320, 150, 40));
  p.push(mito(255, 92, 20, 9), mito(405, 222, 20, 9));
  p.push(rer(205, 200, 70, 3));
  p.push(golgi(385, 150, 62, 4));
  p.push(S.line(406, 108, 428, 108, { w: 4, cap: 'round' }), S.line(417, 98, 417, 118, { w: 4, cap: 'round' }));
  p.push(S.circle(350, 246, 8, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }));
  p.push(S.circle(215, 135, 9, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  for (const [x, y] of [[360, 205], [295, 218], [290, 242], [265, 160]]) p.push(dot(x, y));
  label(p, 'Cell membrane', 150, 168, 167, 165, 'l');
  label(p, 'Small vacuole', 150, 126, 206, 134, 'l');
  label(p, 'Mitochondrion', 150, 90, 235, 92, 'l');
  label(p, 'Rough ER', 150, 218, 205, 208, 'l');
  label(p, 'Ribosomes (dots)', 150, 262, 289, 241, 'l');
  label(p, 'Cytoplasm', 150, 190, 232, 232, 'l');
  label(p, 'Centrosome', 508, 98, 429, 106, 'r');
  label(p, 'Nucleus', 508, 138, 360, 145, 'r');
  label(p, 'Golgi body', 508, 186, 447, 176, 'r');
  label(p, 'Lysosome', 508, 246, 358, 246, 'r');
  label(p, 'Nucleolus', 330, 26, 326, 144, 'c');
  return svgDoc(640, 290, 'A generalised animal cell: a cell membrane surrounds the cytoplasm, which holds a nucleus with a nucleolus, mitochondria, rough endoplasmic reticulum with ribosomes, a Golgi body, a lysosome, small vacuoles and a centrosome', p.join(''));
})();

// ---------------------------------------------------------------- 2. generalised plant cell (named and lettered)
function plantCell(lettered) {
  const p = [];
  const N = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Cell wall', 'Large central vacuole', 'Chloroplast', 'Nucleus', 'Cell membrane'];
  const lab = (i, x, y, tx, ty, side) => label(p, N[i], x, y, tx, ty, side, lettered ? { size: 14, w: 'bold' } : {});
  p.push(S.rect(170, 52, 330, 216, { rx: 16, sw: 5 }));
  p.push(S.rect(178, 60, 314, 200, { rx: 12, sw: 1.4, c: 'var(--diagram-red)' }));
  p.push(S.rect(215, 85, 190, 150, { rx: 40, fill: 'var(--diagram-blue)', fop: 0.15, sw: 1.2, dash: '4 3' }));
  p.push(nucleus(440, 150, 26));
  for (const [x, y] of [[200, 110], [200, 160], [215, 215], [300, 250], [380, 250], [330, 72], [250, 72]]) {
    p.push(S.ellipse(x, y, 12, 6.5, { fill: 'var(--diagram-green)', fop: 0.45, sw: 1.2 }));
    p.push(S.line(x - 6, y, x + 6, y, { c: 'var(--diagram-green)', w: 1 }));
  }
  p.push(mito(445, 220, 14, 7));
  lab(0, 150, 50, 171, 60, 'l');
  lab(4, 150, 92, 179, 80, 'l');
  lab(1, 150, 182, 230, 170, 'l');
  lab(2, 150, 236, 205, 214, 'l');
  lab(3, 530, 130, 466, 144, 'r');
  if (!lettered) {
    label(p, 'Cytoplasm', 530, 90, 425, 100, 'r');
    label(p, 'Mitochondrion', 530, 235, 459, 222, 'r');
  }
  const name = lettered
    ? 'A plant cell with parts lettered A to E: A, the thick outer boundary; B, the large central sac of sap; C, a green oval body on the edge; D, the round body on the right with a dark dot; E, the thin line just inside the boundary'
    : 'A generalised plant cell: a cell wall outside a cell membrane, a large central vacuole pushing the nucleus to the side, chloroplasts in the cytoplasm and a mitochondrion';
  return svgDoc(640, 290, name, p.join(''));
}
export const PLANT = plantCell(false);
export const PLANT_LETTERED = plantCell(true);

// ---------------------------------------------------------------- 3. a bacterium (prokaryotic cell)
export const BACTERIUM = (() => {
  const p = [];
  p.push(S.rect(150, 90, 300, 110, { rx: 55, sw: 4 }));
  p.push(S.rect(157, 97, 286, 96, { rx: 48, sw: 1.3, c: 'var(--diagram-red)', fill: 'var(--diagram-fill)', fop: 0.5 }));
  p.push(S.path('M255 125 C270 108 300 112 305 130 C312 148 285 158 270 150 C250 145 262 128 280 132 C296 136 292 150 278 146', { w: 2, c: 'var(--diagram-blue)' }));
  p.push(S.circle(350, 160, 12, { sw: 1.4, c: 'var(--diagram-blue)' }));
  for (const [x, y] of [[195, 130], [215, 160], [230, 118], [340, 120], [385, 140], [400, 165], [365, 182], [225, 182]]) p.push(dot(x, y, 2.2));
  p.push(S.path('M450 145 C470 120 490 170 510 145 C530 120 550 170 570 145', { w: 2, c: 'var(--diagram-brown)' }));
  label(p, 'Cell wall', 120, 60, 165, 96, 'l');
  label(p, 'Cell membrane', 120, 232, 168, 190, 'l');
  label(p, 'Nucleoid: naked DNA, no nuclear membrane', 300, 66, 288, 118, 'c');
  label(p, 'Plasmid', 380, 232, 352, 173, 'b');
  label(p, 'Ribosomes', 100, 148, 193, 133, 'l');
  label(p, 'Flagellum', 560, 195, 530, 150, 'b');
  label(p, 'Cytoplasm', 480, 232, 405, 176, 'b');
  return svgDoc(640, 250, 'A bacterium, a prokaryotic cell: a cell wall and cell membrane enclose cytoplasm with ribosomes, a nucleoid of naked DNA with no nuclear membrane, a small ring-shaped plasmid and a whip-like flagellum', p.join(''));
})();

// ---------------------------------------------------------------- 4. three plastids
export const PLASTIDS = (() => {
  const p = [];
  const head = (x, t) => p.push(S.text(x, 24, t, { a: 'middle', size: 12, w: 'bold' }));
  head(105, 'Chloroplast'); head(320, 'Chromoplast'); head(535, 'Leucoplast');
  // chloroplast: ellipse with grana stacks
  p.push(S.ellipse(105, 110, 80, 50, { fill: 'var(--diagram-green)', fop: 0.2, sw: 2 }));
  for (const [x, y] of [[60, 95], [95, 120], [125, 90], [140, 125], [75, 128]]) for (let k = 0; k < 4; k++) p.push(S.rect(x, y + k * 4, 22, 3, { fill: 'var(--diagram-green)', fop: 0.8, sw: 0.6 }));
  // chromoplast: irregular body with coloured droplets
  p.push(S.path('M255 95 C270 60 330 62 355 75 C390 92 385 135 350 150 C320 168 270 160 258 135 C250 120 250 105 255 95 Z', { fill: 'var(--diagram-red)', fop: 0.15, sw: 2 }));
  for (const [x, y, c] of [[290, 95, 'var(--diagram-red)'], [320, 85, 'var(--diagram-yellow)'], [345, 110, 'var(--diagram-red)'], [300, 128, 'var(--diagram-yellow)'], [330, 135, 'var(--diagram-red)']]) p.push(S.circle(x, y, 8, { fill: c, fop: 0.6, sw: 1 }));
  // leucoplast: pale body with starch grains
  p.push(S.ellipse(535, 110, 70, 46, { fill: 'var(--diagram-fill)', fop: 0.8, sw: 2 }));
  for (const [x, y, rr] of [[510, 100, 14], [545, 95, 11], [560, 125, 14], [515, 130, 10]]) p.push(S.circle(x, y, rr, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2, c: 'var(--diagram-muted)' }));
  p.push(S.lines(105, 198, ['Green pigment chlorophyll', 'Photosynthesis'], { a: 'middle', size: 11 }));
  p.push(S.lines(320, 198, ['Red, orange or yellow pigments', 'Colours flowers and fruits'], { a: 'middle', size: 11 }));
  p.push(S.lines(535, 198, ['Colourless', 'Stores starch, oil or protein'], { a: 'middle', size: 11 }));
  p.push(S.text(105, 176, 'stack of discs = granum', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.text(535, 176, 'starch grains', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 230, 'Three kinds of plastid: a green chloroplast with stacks of discs called grana for photosynthesis; a chromoplast holding red and yellow pigment droplets that colour flowers and fruits; and a colourless leucoplast with starch grains that stores food', p.join(''));
})();

// ---------------------------------------------------------------- 5. mitochondrion, rough ER and Golgi body
export const ORGANELLES = (() => {
  const p = [];
  const head = (x, t) => p.push(S.text(x, 22, t, { a: 'middle', size: 12, w: 'bold' }));
  head(110, 'Mitochondrion'); head(330, 'Rough ER'); head(540, 'Golgi body');
  p.push(mito(110, 100, 78, 40));
  p.push(rer(270, 70, 120, 5, 13));
  p.push(golgi(500, 70, 80, 5, 12));
  p.push(S.circle(485, 150, 5, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }), S.circle(590, 80, 5, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }));
  p.push(S.lines(110, 165, ['Outer membrane;', 'inner membrane folded', 'into cristae'], { a: 'middle', size: 11, dy: 13 }));
  p.push(S.lines(330, 165, ['Ribosomes on the surface;', 'flat sacs joined to', 'the nuclear envelope'], { a: 'middle', size: 11 }));
  p.push(S.lines(540, 165, ['Stack of flat sacs;', 'vesicles bud off'], { a: 'middle', size: 11 }));
  p.push(S.lines(110, 220, ['Releases energy from food', 'in respiration'], { a: 'middle', size: 11 }));
  p.push(S.lines(330, 220, ['Makes and carries proteins'], { a: 'middle', size: 11 }));
  p.push(S.lines(540, 220, ['Modifies, packs and sends out'], { a: 'middle', size: 11 }));
  return svgDoc(640, 250, 'Three organelles: a mitochondrion with a smooth outer membrane and an inner membrane folded into cristae; rough endoplasmic reticulum, flat sacs studded with ribosomes; and a Golgi body, a stack of curved sacs with vesicles budding off', p.join(''));
})();
