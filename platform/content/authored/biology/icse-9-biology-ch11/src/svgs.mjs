// SVG diagrams for ICSE 9 Biology ch11 Skeleton: Movement and Locomotion. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. the human skeleton from the front (named, with axial and appendicular colours; or lettered A-E in one colour)
function skeleton(lettered) {
  const p = [];
  const ax = lettered ? MUTED : BLUE; // axial colour
  const ap = lettered ? MUTED : GREEN; // appendicular colour
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  const mir = (x) => 440 - x;
  const bar = (x1, y1, x2, y2, w, c) => S.line(x1, y1, x2, y2, { c, w, cap: 'round' });
  // skull and jaw
  p.push(S.ellipse(220, 48, 30, 34, { c: ax, fill: ax, fop: 0.18, sw: 2 }));
  p.push(S.path('M200 68 C204 90 236 90 240 68', { c: ax, w: 2 }));
  p.push(S.circle(209, 44, 4.5, { c: ax, sw: 1.4 }), S.circle(231, 44, 4.5, { c: ax, sw: 1.4 }));
  // vertebral column and sacrum
  for (let i = 0; i < 18; i++) p.push(S.rect(209, 94 + i * 10, 22, 8, { c: ax, fill: ax, fop: 0.25, sw: 1.2, rx: 2 }));
  p.push(S.path('M208 276 L232 276 L226 312 L214 312 Z', { c: ax, w: 1.6, fill: ax, fop: 0.25 }));
  // ribs (arcs on both sides) and sternum
  for (let i = 0; i < 7; i++) {
    const y = 108 + i * 13;
    p.push(S.path(`M209 ${y} C170 ${y - 6} 158 ${y + 14} 214 ${y + 22}`, { c: ax, w: 1.8 }));
    p.push(S.path(`M231 ${y} C270 ${y - 6} 282 ${y + 14} 226 ${y + 22}`, { c: ax, w: 1.8 }));
  }
  p.push(S.rect(214, 104, 12, 84, { c: ax, fill: ax, fop: 0.3, sw: 1.6, rx: 3 }));
  // shoulder girdle: clavicle and scapula
  for (const m of [false, true]) {
    const x = (v) => (m ? mir(v) : v);
    p.push(bar(x(212), 98, x(150), 104, 5, ap));
    p.push(S.path(`M${x(146)} 106 L${x(172)} 112 L${x(152)} 150 Z`, { c: ap, w: 1.6, fill: ap, fop: 0.2 }));
    // upper limb: humerus, radius and ulna, hand
    p.push(bar(x(144), 112, x(126), 200, 8, ap));
    p.push(bar(x(124), 204, x(106), 284, 5, ap), bar(x(132), 204, x(116), 286, 5, ap));
    p.push(S.path(`M${x(100)} 290 C${x(98)} 312 ${x(122)} 312 ${x(120)} 290 Z`, { c: ap, w: 1.6, fill: ap, fop: 0.2 }));
    // pelvic girdle and lower limb: hip bone, femur, tibia and fibula, foot
    p.push(S.ellipse(x(190), 294, 26, 24, { c: ap, fill: ap, fop: 0.2, sw: 1.8 }));
    p.push(bar(x(196), 316, x(186), 414, 10, ap));
    p.push(bar(x(184), 420, x(182), 524, 6, ap), bar(x(194), 420, x(196), 524, 4, ap));
    p.push(S.ellipse(x(188), 536, 24, 8, { c: ap, fill: ap, fop: 0.2, sw: 1.6 }));
    p.push(S.circle(x(188), 418, 7, { c: ap, fill: FILL, fop: 1, sw: 1.4 }));
  }
  if (!lettered) {
    // right-hand labels (body's left side shown on the viewer's right)
    p.push(S.text(336, 52, 'Skull', o), S.lead(332, 50, 252, 50));
    p.push(S.text(336, 120, 'Ribs', o), S.lead(332, 118, 278, 122));
    p.push(S.text(336, 160, 'Sternum', o), S.lead(332, 158, 228, 158));
    p.push(S.text(336, 232, 'Vertebral column', o), S.lead(332, 230, 232, 230));
    p.push(S.text(336, 340, 'Pelvic girdle (hip bones)', o), S.lead(332, 338, 270, 306));
    p.push(S.text(336, 376, 'Femur', o), S.lead(332, 374, 254, 374));
    p.push(S.text(336, 480, 'Tibia and fibula', o), S.lead(332, 478, 258, 480));
    // left-hand labels
    p.push(S.text(96, 84, 'Clavicle', { a: 'end', ...o }), S.lead(100, 82, 168, 100));
    p.push(S.text(96, 140, 'Scapula', { a: 'end', ...o }), S.lead(100, 138, 152, 134));
    p.push(S.text(96, 190, 'Humerus', { a: 'end', ...o }), S.lead(100, 188, 130, 184));
    p.push(S.text(96, 240, 'Radius and ulna', { a: 'end', ...o }), S.lead(100, 238, 112, 240));
    // legend
    p.push(S.rect(20, 504, 14, 10, { c: ax, fill: ax, fop: 0.3, sw: 1.4 }), S.text(40, 513, 'Axial skeleton', { size: 11 }));
    p.push(S.rect(20, 524, 14, 10, { c: ap, fill: ap, fop: 0.3, sw: 1.4 }), S.text(40, 533, 'Appendicular skeleton', { size: 11 }));
  } else {
    p.push(S.text(336, 52, 'A', o), S.lead(332, 48, 252, 50));
    p.push(S.text(336, 130, 'B', o), S.lead(332, 126, 278, 122));
    p.push(S.text(336, 232, 'C', o), S.lead(332, 228, 232, 230));
    p.push(S.text(336, 340, 'D', o), S.lead(332, 336, 270, 306));
    p.push(S.text(336, 376, 'E', o), S.lead(332, 372, 254, 374));
  }
  const name = lettered
    ? 'The human skeleton from the front, drawn in one colour, with parts lettered: A the bony case of the head, B the curved bones round the chest, C the stack of small bones down the back, D the bone ring at the hips, E the long bone of the thigh'
    : 'The human skeleton from the front: the axial skeleton (skull, ribs, sternum and vertebral column) in blue and the appendicular skeleton (clavicle, scapula, humerus, radius and ulna, hip bones, femur, tibia and fibula) in green';
  return svgDoc(500, 556, name, p.join(''));
}
export const SKELETON = skeleton(false);
export const SKELETON_LETTERED = skeleton(true);

// ---------------------------------------------------------------- 2. four freely movable joints (named with locations, or lettered A-D)
function joints(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  // ball and socket (centre 80)
  p.push(bar(80, 112, 80, 176, BROWN));
  p.push(S.circle(80, 96, 20, { c: BROWN, fill: YEL, fop: 0.4, sw: 2 }));
  p.push(S.path('M50 104 C42 46 118 46 110 104', { c: BROWN, w: 5 }));
  p.push(bar(80, 52, 80, 14, BROWN));
  p.push(S.path('M30 120 C14 96 22 66 44 54', { c: RED, w: 1.8 }), S.head(44, 54, -0.5, { c: RED, size: 7 }));
  p.push(S.path('M130 120 C146 96 138 66 116 54', { c: RED, w: 1.8 }), S.head(116, 54, -2.6, { c: RED, size: 7 }));
  // hinge (centre 240)
  p.push(bar(240, 16, 240, 98, BROWN));
  p.push(bar(240, 98, 300, 140, BROWN));
  p.push(S.circle(240, 98, 8, { c: BROWN, fill: YEL, fop: 0.5, sw: 2 }));
  p.push(S.path('M262 86 C282 98 286 118 280 134', { c: RED, w: 1.8, dash: '4 3' }), S.head(280, 134, 1.3, { c: RED, size: 7 }));
  // pivot (centre 400)
  p.push(bar(400, 40, 400, 176, BROWN));
  p.push(S.rect(392, 52, 16, 48, { c: BROWN, fill: YEL, fop: 0.35, sw: 1.6 }));
  p.push(S.ellipse(400, 86, 30, 12, { c: BROWN, sw: 3.5 }));
  p.push(S.path('M366 70 C380 54 420 54 434 70', { c: RED, w: 1.8 }), S.head(434, 70, 0.9, { c: RED, size: 7 }));
  // gliding (centre 560)
  p.push(S.rect(516, 78, 90, 16, { c: BROWN, fill: YEL, fop: 0.35, sw: 2, rx: 3 }));
  p.push(S.rect(516, 98, 90, 16, { c: BROWN, fill: YEL, fop: 0.35, sw: 2, rx: 3 }));
  p.push(S.line(516, 96, 606, 96, { c: MUTED, w: 1, dash: '3 3' }));
  p.push(S.arrow(520, 62, 600, 62, { c: RED, size: 7 }), S.arrow(606, 132, 526, 132, { c: RED, size: 7 }));
  if (!lettered) {
    p.push(S.text(80, 196, 'Ball and socket', { a: 'middle', size: 13, w: 'bold' }), S.text(80, 212, 'shoulder, hip', { a: 'middle', size: 12 }));
    p.push(S.text(240, 196, 'Hinge', { a: 'middle', size: 13, w: 'bold' }), S.text(240, 212, 'elbow, knee, finger', { a: 'middle', size: 12 }));
    p.push(S.text(400, 196, 'Pivot', { a: 'middle', size: 13, w: 'bold' }), S.text(400, 212, 'atlas on axis (neck)', { a: 'middle', size: 12 }));
    p.push(S.text(560, 196, 'Gliding', { a: 'middle', size: 13, w: 'bold' }), S.text(560, 212, 'wrist, ankle', { a: 'middle', size: 12 }));
  } else {
    p.push(S.text(80, 206, 'A', { a: 'middle', ...o }), S.text(240, 206, 'B', { a: 'middle', ...o }), S.text(400, 206, 'C', { a: 'middle', ...o }), S.text(560, 206, 'D', { a: 'middle', ...o }));
  }
  const name = lettered
    ? 'Four freely movable joints, lettered: A a rounded end of one bone fitting into a cup of the other with curved arrows in all directions, B two bones joined by a pin with an arrow swinging in one plane, C a peg of one bone turning inside a ring of the other with a turning arrow, D two flat surfaces with arrows sliding in opposite directions'
    : 'Four freely movable joints: ball and socket (shoulder, hip) with curved arrows in all directions; hinge (elbow, knee, finger) with an arrow swinging in one plane; pivot (atlas on axis in the neck) with a turning arrow; gliding (wrist, ankle) with arrows sliding in opposite directions';
  return svgDoc(640, 224, name, p.join(''));
  function bar(x1, y1, x2, y2, c) {
    return S.line(x1, y1, x2, y2, { c, w: 8, cap: 'round' });
  }
}
export const JOINTS = joints(false);
export const JOINTS_LETTERED = joints(true);

// ---------------------------------------------------------------- 3. the vertebral column in five regions (named with counts, or lettered A-E)
function column(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  let y = 20;
  const region = (n, w, h, gap, c, op) => {
    const top = y;
    for (let i = 0; i < n; i++) {
      p.push(S.rect(200 - w / 2, y, w, h, { c, fill: c, fop: op, sw: 1.4, rx: 3 }));
      y += h + gap;
    }
    return [top, y - gap];
  };
  const cer = region(7, 22, 10, 3, BLUE, 0.25);
  y += 4;
  const tho = region(12, 28, 12, 3, GREEN, 0.25);
  // rib stubs on the thoracic vertebrae
  for (let i = 0; i < 12; i++) {
    const yy = tho[0] + i * 15 + 6;
    p.push(S.line(214, yy, 238, yy + 6, { c: GREEN, w: 1.4 }), S.line(186, yy, 162, yy + 6, { c: GREEN, w: 1.4 }));
  }
  y += 4;
  const lum = region(5, 36, 16, 4, YEL, 0.3);
  y += 4;
  const sa = y;
  p.push(S.path(`M180 ${sa} L220 ${sa} L212 ${sa + 52} L188 ${sa + 52} Z`, { c: BROWN, w: 1.6, fill: BROWN, fop: 0.25 }));
  const co = sa + 56;
  p.push(S.path(`M190 ${co} L210 ${co} L204 ${co + 22} L196 ${co + 22} Z`, { c: RED, w: 1.6, fill: RED, fop: 0.25 }));
  const mid = (r) => (r[0] + r[1]) / 2;
  if (!lettered) {
    p.push(S.text(280, mid(cer) + 4, 'Cervical: 7 (neck)', o), S.lead(276, mid(cer), 214, mid(cer)));
    p.push(S.text(280, mid(tho) + 4, 'Thoracic: 12 (with ribs)', o), S.lead(276, mid(tho), 244, mid(tho)));
    p.push(S.text(280, mid(lum) + 4, 'Lumbar: 5 (lower back)', o), S.lead(276, mid(lum), 222, mid(lum)));
    p.push(S.text(280, sa + 32, 'Sacrum: 5 fused', o), S.lead(276, sa + 28, 220, sa + 28));
    p.push(S.text(280, co + 14, 'Coccyx: 4 fused', o), S.lead(276, co + 10, 208, co + 10));
  } else {
    p.push(S.text(280, mid(cer) + 5, 'A', o), S.lead(274, mid(cer), 214, mid(cer)));
    p.push(S.text(280, mid(tho) + 5, 'B', o), S.lead(274, mid(tho), 244, mid(tho)));
    p.push(S.text(280, mid(lum) + 5, 'C', o), S.lead(274, mid(lum), 222, mid(lum)));
    p.push(S.text(280, sa + 34, 'D', o), S.lead(274, sa + 28, 220, sa + 28));
    p.push(S.text(280, co + 16, 'E', o), S.lead(274, co + 10, 208, co + 10));
  }
  const name = lettered
    ? 'The vertebral column in five regions from the top, lettered: A the seven small vertebrae in the neck, B the twelve vertebrae that carry ribs, C the five large vertebrae of the lower back, D the triangular bone formed by fused vertebrae, E the small tail bone at the end'
    : 'The vertebral column in five regions from the top: seven cervical vertebrae in the neck, twelve thoracic vertebrae with ribs, five lumbar vertebrae, the sacrum of five fused vertebrae and the coccyx of four fused vertebrae';
  return svgDoc(460, 496, name, p.join(''));
}
export const COLUMN = column(false);
export const COLUMN_LETTERED = column(true);
