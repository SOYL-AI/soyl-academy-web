// SVG diagrams for ICSE 10 Biology ch10 Nervous System. All new drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f = (n) => Math.round(n * 10) / 10;
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YELLOW = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';

// ---------------------------------------------------------------- 1. a motor neuron (named and lettered)
function neuron(lettered) {
  const p = [];
  // dendrites branching from the cell body
  const dend = [[-1.2, 60], [-0.6, 64], [0, 58], [0.6, 62], [1.2, 60], [2.6, 56], [3.3, 60], [-2.5, 56]];
  for (const [a, len] of dend) {
    const x1 = 110 + 30 * Math.cos(a + Math.PI), y1 = 110 + 30 * Math.sin(a + Math.PI);
    const x2 = 110 + len * Math.cos(a + Math.PI), y2 = 110 + len * Math.sin(a + Math.PI);
    p.push(S.line(x1, y1, x2, y2, { c: BLUE, w: 2.2, cap: 'round' }));
    for (const s of [-0.5, 0.5]) p.push(S.line(x2, y2, x2 + 14 * Math.cos(a + Math.PI + s), y2 + 14 * Math.sin(a + Math.PI + s), { c: BLUE, w: 1.4, cap: 'round' }));
  }
  p.push(S.path('M84 92 Q110 72 136 92 Q150 110 136 128 Q110 148 84 128 Q70 110 84 92 Z', { c: BLUE, fill: BLUE, fop: 0.2, w: 1.8 }));
  p.push(S.circle(110, 110, 11, { c: BLUE, fill: BLUE, fop: 0.6, sw: 1.2 }), S.circle(112, 108, 3, { fill: FILL, sw: 0 }));
  for (const [x, y] of [[94, 100], [126, 98], [96, 122], [126, 122], [110, 92], [110, 128]]) p.push(S.circle(x, y, 1.8, { fill: BLUE, fop: 0.9, sw: 0 }));
  // axon with myelin sheath and nodes of Ranvier
  p.push(S.line(146, 110, 520, 110, { c: BLUE, w: 2.2 }));
  for (let i = 0; i < 6; i++) p.push(S.rect(170 + i * 56, 101, 48, 18, { rx: 8, c: YELLOW, fill: YELLOW, fop: 0.45, sw: 1.2 }));
  // axon endings with knobs
  for (const [dx, dy] of [[40, -34], [48, -10], [46, 14], [36, 36]]) {
    p.push(S.path(`M520 110 Q${520 + dx * 0.5} ${110 + dy * 0.3} ${520 + dx} ${110 + dy}`, { c: BLUE, w: 1.8 }));
    p.push(S.circle(523 + dx, 110 + dy, 4.5, { c: BLUE, fill: BLUE, fop: 0.5, sw: 1 }));
  }
  p.push(S.arrow(250, 160, 400, 160, { c: RED, size: 8 }), lab(254, 178, 'direction of the impulse', { c: RED }));
  const o = lettered ? { size: 14, w: 'bold' } : {};
  const put = (x1, y1, x2, y2, tx, ty, s, a = 'middle') => p.push(S.lead(x1, y1, x2, y2), lab(tx, ty, s, { a, ...o }));
  if (lettered) {
    put(64, 64, 52, 36, 48, 30, 'A');
    put(130, 120, 150, 168, 154, 184, 'B');
    put(336, 110, 336, 66, 336, 58, 'C');
    put(250, 102, 250, 66, 250, 58, 'D');
    put(566, 120, 590, 160, 594, 176, 'E');
  } else {
    put(64, 64, 52, 36, 48, 30, 'Dendrites');
    put(130, 120, 150, 168, 150, 184, 'Cell body (cyton)');
    put(110, 110, 70, 196, 70, 208, 'Nucleus');
    put(336, 110, 336, 66, 336, 58, 'Axon');
    put(250, 102, 250, 66, 250, 58, 'Myelin sheath');
    put(418, 112, 440, 66, 452, 58, 'Node of Ranvier');
    put(566, 120, 590, 160, 612, 176, 'Axon endings', 'end');
  }
  const label = lettered
    ? 'A nerve cell with five parts lettered: A, the short branching fibres on the left; B, the rounded part containing the nucleus; C, the single long fibre; D, the fatty segments wrapping that fibre; E, the branched endings with small knobs on the right. An arrow shows the impulse travelling from left to right'
    : 'A neuron (nerve cell). Short branched dendrites carry impulses towards the cell body (cyton), which contains the nucleus and granules. A single long axon carries impulses away from it; the axon is covered by a fatty myelin sheath interrupted at the nodes of Ranvier, and ends in branched axon endings with small knobs. An arrow shows the direction of the impulse';
  return svgDoc(620, 215, label, p.join(''));
}
export const NEURON = neuron(false);
export const NEURON_LETTERED = neuron(true);

// ---------------------------------------------------------------- 2. the brain in section (named and lettered)
function brain(lettered) {
  const p = [];
  p.push('<g transform="translate(70 0)">');
  // cerebrum
  const cer = 'M120 232 C88 150 140 58 282 50 C420 44 506 118 486 206 C478 240 446 252 412 248 C380 244 360 236 340 232 L240 238 C190 242 140 246 120 232 Z';
  p.push(S.path(cer, { c: RED, fill: RED, fop: 0.14, w: 1.8 }));
  for (const d of ['M150 120 Q170 100 160 80', 'M200 70 Q215 95 240 76', 'M270 62 Q282 92 305 62', 'M340 62 Q352 92 372 70', 'M410 86 Q420 110 446 104', 'M462 150 Q440 160 470 186', 'M140 180 Q165 170 150 150', 'M190 110 Q215 125 230 105', 'M320 100 Q340 125 360 104', 'M400 140 Q420 150 430 130']) p.push(S.path(d, { c: RED, w: 1, op: 0.6 }));
  // corpus callosum
  p.push(S.path('M200 172 Q290 120 390 168', { c: BROWN, w: 7, op: 0.4, cap: 'round' }));
  // brainstem: midbrain, pons, medulla, spinal cord
  p.push(S.path('M286 214 L346 214 Q364 248 356 300 L352 380 L320 380 L318 300 Q300 250 286 214 Z', { c: BROWN, fill: BROWN, fop: 0.25, w: 1.5 }));
  p.push(S.ellipse(322, 272, 26, 22, { c: BROWN, fill: BROWN, fop: 0.35, sw: 1.5 }));
  p.push(S.line(318, 336, 354, 336, { c: MUTED, w: 1, dash: '3 2' }));
  // thalamus, hypothalamus, pituitary
  p.push(S.ellipse(304, 196, 32, 18, { c: YELLOW, fill: YELLOW, fop: 0.55, sw: 1.4 }));
  p.push(S.ellipse(264, 226, 22, 11, { c: GREEN, fill: GREEN, fop: 0.45, sw: 1.4 }), S.line(258, 236, 252, 252, { w: 1.5 }), S.circle(250, 260, 8, { c: GREEN, fill: GREEN, fop: 0.25, sw: 1.2 }));
  // cerebellum with its branching white matter
  p.push(S.path('M372 252 C380 238 450 232 488 250 C512 266 506 316 470 324 C430 332 386 318 372 290 Z', { c: RED, fill: RED, fop: 0.2, w: 1.8 }));
  p.push(S.path('M386 286 L430 282 M430 282 L456 262 M430 282 L462 292 M430 282 L452 312 M410 284 L420 264 M410 284 L414 306', { c: BROWN, w: 2, op: 0.6 }));
  const o = lettered ? { size: 14, w: 'bold' } : {};
  const put = (x1, y1, x2, y2, tx, ty, s, a = 'start') => p.push(S.lead(x1, y1, x2, y2), lab(tx, ty, s, { a, ...o }));
  if (lettered) {
    put(200, 90, 120, 34, 116, 34, 'A', 'end');
    put(322, 192, 540, 150, 544, 154, 'B');
    put(264, 226, 120, 262, 116, 266, 'C', 'end');
    put(470, 300, 540, 300, 544, 304, 'D');
    put(336, 320, 220, 330, 216, 334, 'E', 'end');
  } else {
    put(200, 90, 120, 34, 116, 34, 'Cerebrum', 'end');
    put(250, 150, 120, 120, 116, 120, 'Corpus callosum', 'end');
    put(322, 192, 540, 150, 544, 154, 'Thalamus');
    put(264, 226, 120, 230, 116, 234, 'Hypothalamus', 'end');
    put(246, 262, 120, 268, 116, 272, 'Pituitary gland', 'end');
    put(310, 276, 200, 302, 196, 306, 'Pons', 'end');
    put(336, 320, 200, 334, 196, 338, 'Medulla oblongata', 'end');
    put(336, 366, 200, 370, 196, 374, 'Spinal cord', 'end');
    put(470, 300, 540, 300, 544, 304, 'Cerebellum');
  }
  p.push('</g>');
  const label = lettered
    ? 'Vertical section of the human brain, front on the left, with five parts lettered: A, the large folded upper part; B, the oval mass deep in the centre; C, the small region just below B, from which a gland hangs; D, the rounded part at the back below the large upper part, with branching white lines inside; E, the lowest part of the brain stem, which continues as the spinal cord'
    : 'Vertical section of the human brain, front on the left. The large, folded cerebrum covers the top, its two halves joined by the corpus callosum. Deep in the centre is the thalamus, with the hypothalamus below it and the pituitary gland hanging from the hypothalamus. The brain stem runs down through the pons and the medulla oblongata into the spinal cord. The cerebellum lies at the back, below the cerebrum';
  return svgDoc(680, 390, label, p.join(''));
}
export const BRAIN = brain(false);
export const BRAIN_LETTERED = brain(true);

// ---------------------------------------------------------------- 3. reflex arc through the spinal cord (named and lettered)
function arc(lettered) {
  const p = [];
  const cx = 470, cy = 160;
  // spinal cord: white matter outside, butterfly of grey matter inside
  p.push(S.ellipse(cx, cy, 92, 76, { c: MUTED, fill: FILL, fop: 1, sw: 1.6 }));
  const grey = `M${cx} ${cy - 18} C${cx - 10} ${cy - 30} ${cx - 34} ${cy - 66} ${cx - 44} ${cy - 54} C${cx - 52} ${cy - 40} ${cx - 30} ${cy - 22} ${cx - 34} ${cy - 6} C${cx - 64} ${cy + 10} ${cx - 64} ${cy + 46} ${cx - 40} ${cy + 46} C${cx - 22} ${cy + 46} ${cx - 10} ${cy + 22} ${cx} ${cy + 18} C${cx + 10} ${cy + 22} ${cx + 22} ${cy + 46} ${cx + 40} ${cy + 46} C${cx + 64} ${cy + 46} ${cx + 64} ${cy + 10} ${cx + 34} ${cy - 6} C${cx + 30} ${cy - 22} ${cx + 52} ${cy - 40} ${cx + 44} ${cy - 54} C${cx + 34} ${cy - 66} ${cx + 10} ${cy - 30} ${cx} ${cy - 18} Z`;
  p.push(S.path(grey, { c: MUTED, fill: MUTED, fop: 0.35, w: 1.2 }));
  p.push(S.circle(cx, cy, 5, { c: MUTED, fill: FILL, fop: 1, sw: 1 }));
  // receptor in the skin of a finger touching a hot plate, and the effector muscle
  p.push(S.rect(20, 40, 90, 12, { rx: 3, c: RED, fill: RED, fop: 0.35, sw: 1 }), lab(22, 32, 'hot plate', { c: RED }));
  p.push(S.path('M60 52 Q62 84 96 92 L130 92', { c: BROWN, w: 14, op: 0.25, cap: 'round' }));
  p.push(S.circle(66, 62, 5, { c: BLUE, fill: BLUE, fop: 0.6, sw: 1 }));
  p.push(S.ellipse(150, 262, 60, 22, { c: RED, fill: RED, fop: 0.3, sw: 1.5 }));
  // sensory neuron: receptor → dorsal root ganglion → dorsal horn
  p.push(S.path(`M66 62 Q120 120 250 104 L${cx - 120} 100`, { c: BLUE, w: 2.4 }));
  p.push(S.ellipse(cx - 108, 100, 16, 10, { c: BLUE, fill: BLUE, fop: 0.2, sw: 1.2 }), S.circle(cx - 108, 100, 4.5, { c: BLUE, fill: BLUE, fop: 0.7, sw: 0 }));
  p.push(S.path(`M${cx - 92} 100 Q${cx - 60} 102 ${cx - 36} ${cy - 46} L${cx - 22} ${cy - 22}`, { c: BLUE, w: 2.4 }));
  // relay neuron inside the grey matter
  p.push(S.path(`M${cx - 20} ${cy - 18} Q${cx - 6} ${cy + 4} ${cx - 26} ${cy + 26}`, { c: GREEN, w: 2.6 }), S.circle(cx - 12, cy + 2, 4, { c: GREEN, fill: GREEN, fop: 0.8, sw: 0 }));
  // motor neuron: ventral horn → ventral root → muscle
  p.push(S.circle(cx - 36, cy + 32, 6, { c: RED, fill: RED, fop: 0.7, sw: 0 }));
  p.push(S.path(`M${cx - 40} ${cy + 36} Q${cx - 80} ${cy + 70} ${cx - 130} ${cy + 66} L250 226 Q200 240 190 252`, { c: RED, w: 2.4 }));
  for (const [x1, y1, x2, y2, c] of [[150, 112, 180, 108, BLUE], [cx - 70, 104, cx - 54, 112, BLUE], [300, 223, 270, 226, RED]]) p.push(S.arrow(x1, y1, x2, y2, { c, size: 7, w: 2 }));
  const o = lettered ? { size: 14, w: 'bold' } : {};
  const put = (x1, y1, x2, y2, tx, ty, s, a = 'start') => p.push(S.lead(x1, y1, x2, y2), lab(tx, ty, s, { a, ...o }));
  if (lettered) {
    put(66, 66, 40, 120, 36, 134, 'A', 'middle');
    put(220, 106, 220, 70, 220, 62, 'B', 'middle');
    put(cx - 14, cy + 6, cx + 120, cy + 20, cx + 124, cy + 24, 'C');
    put(320, 214, 330, 264, 330, 282, 'D', 'middle');
    put(150, 262, 150, 300, 150, 318, 'E', 'middle');
  } else {
    put(66, 66, 40, 120, 8, 134, 'Receptor (in skin)', 'start');
    put(220, 106, 220, 70, 220, 62, 'Sensory neuron', 'middle');
    put(cx - 108, 92, cx - 108, 40, cx - 108, 32, 'Dorsal root ganglion', 'middle');
    put(cx - 14, cy + 6, cx + 120, cy + 20, cx + 124, cy + 24, 'Relay neuron');
    put(cx + 40, cy - 40, cx + 120, cy - 60, cx + 124, cy - 56, 'Grey matter');
    put(cx + 80, cy + 30, cx + 120, cy + 60, cx + 124, cy + 64, 'White matter');
    put(cx + 4, cy, cx + 120, cy - 14, cx + 124, cy - 10, 'Central canal');
    put(320, 214, 330, 264, 330, 282, 'Motor neuron', 'middle');
    put(150, 262, 150, 300, 150, 318, 'Effector (muscle)', 'middle');
  }
  const label = lettered
    ? 'A reflex arc through a section of the spinal cord, five parts lettered: A, the sense ending in the skin of a finger touching a hot plate; B, the nerve cell carrying the message towards the spinal cord; C, the short nerve cell inside the grey matter; D, the nerve cell carrying the message out of the spinal cord; E, the arm muscle that pulls the hand away'
    : 'A reflex arc. A receptor in the skin of a finger touching a hot plate starts an impulse in a sensory neuron, which passes through the dorsal root ganglion into the grey matter of the spinal cord. A relay neuron in the grey matter passes it to a motor neuron, which carries it out to the effector, an arm muscle that pulls the hand away. The spinal cord section shows grey matter shaped like a butterfly round the central canal, surrounded by white matter';
  return svgDoc(660, 330, label, p.join(''));
}
export const ARC = arc(false);
export const ARC_LETTERED = arc(true);

// ---------------------------------------------------------------- 4. grey and white matter in the brain and spinal cord
export const GREYWHITE = (() => {
  const p = [];
  p.push(S.text(130, 22, 'Cerebrum (section)', { a: 'middle', size: 12, w: 'bold' }), S.text(400, 22, 'Spinal cord (T.S.)', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.path('M30 170 C30 70 230 70 230 170 Z', { c: MUTED, fill: MUTED, fop: 0.45, w: 1.4 }));
  p.push(S.path('M50 170 C50 92 210 92 210 170 Z', { c: MUTED, fill: FILL, fop: 1, w: 1 }));
  p.push(S.lead(130, 84, 130, 50), lab(136, 50, 'grey matter outside (cortex)'));
  p.push(S.lead(130, 140, 130, 196), lab(130, 208, 'white matter inside', { a: 'middle' }));
  const cx = 400, cy = 110;
  p.push(S.ellipse(cx, cy, 70, 56, { c: MUTED, fill: FILL, fop: 1, sw: 1.4 }));
  p.push(S.path(`M${cx} ${cy - 12} C${cx - 8} ${cy - 22} ${cx - 26} ${cy - 48} ${cx - 34} ${cy - 40} C${cx - 40} ${cy - 30} ${cx - 22} ${cy - 16} ${cx - 26} ${cy - 4} C${cx - 48} ${cy + 8} ${cx - 48} ${cy + 34} ${cx - 30} ${cy + 34} C${cx - 16} ${cy + 34} ${cx - 8} ${cy + 16} ${cx} ${cy + 12} C${cx + 8} ${cy + 16} ${cx + 16} ${cy + 34} ${cx + 30} ${cy + 34} C${cx + 48} ${cy + 34} ${cx + 48} ${cy + 8} ${cx + 26} ${cy - 4} C${cx + 22} ${cy - 16} ${cx + 40} ${cy - 30} ${cx + 34} ${cy - 40} C${cx + 26} ${cy - 48} ${cx + 8} ${cy - 22} ${cx} ${cy - 12} Z`, { c: MUTED, fill: MUTED, fop: 0.45, w: 1 }));
  p.push(S.circle(cx, cy, 4, { c: MUTED, fill: FILL, fop: 1, sw: 1 }));
  p.push(S.lead(cx + 30, cy + 20, cx + 30, cy + 86), lab(cx + 30, cy + 98, 'grey matter inside', { a: 'middle' }));
  p.push(S.lead(cx - 62, cy + 20, cx - 100, cy + 86), lab(cx - 100, cy + 98, 'white matter outside', { a: 'middle' }));
  p.push(lab(20, 236, 'Grey matter: cell bodies of neurons. White matter: nerve fibres with white myelin sheaths.', { c: MUTED }));
  return svgDoc(520, 246, 'Grey and white matter. In a section of the cerebrum, grey matter forms the outer layer (cortex) and white matter lies inside. In a transverse section of the spinal cord the arrangement is reversed: white matter lies outside and grey matter, shaped like a butterfly round the central canal, lies inside. Grey matter is made of cell bodies; white matter of nerve fibres with myelin sheaths', p.join(''));
})();
