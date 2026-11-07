// SVG diagrams for ICSE 9 Physics ch04 Gravitation: the attracting pair (plain and lettered A-E), a strobe picture of a
// freely falling ball with distances from s = 1/2 g t^2, and a spring balance marked in kgf and newton. Geometry is
// computed in JS; palette colours only; every font size is at least 10.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { FALL_T, FALL_S, FALL_V, SB_M, SB_N, KGF } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 12, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. two bodies attracting each other
function pair(lettered) {
  const y = 96;
  const x1 = 110;
  const x2 = 370;
  const r1 = 28;
  const r2 = 19;
  const arrow = 72;
  const p = [];
  p.push(S.line(x1 + r1, y, x2 - r2, y, { c: MUT, w: 1, dash: '4 3' }));
  p.push(S.circle(x1, y, r1, { fill: BLUE, c: BLUE, fop: 0.3, sw: 2 }), S.circle(x2, y, r2, { fill: GREEN, c: GREEN, fop: 0.3, sw: 2 }));
  // equal and opposite forces, each pointing at the other body
  p.push(S.arrow(x1 + r1, y, x1 + r1 + arrow, y, { c: RED, w: 2.5, size: 9 }), S.arrow(x2 - r2, y, x2 - r2 - arrow, y, { c: RED, w: 2.5, size: 9 }));
  // distance between centres
  const yd = 156;
  p.push(S.line(x1, y + r1 + 4, x1, yd + 6, { c: MUT, w: 1, dash: '3 3' }), S.line(x2, y + r2 + 4, x2, yd + 6, { c: MUT, w: 1, dash: '3 3' }));
  p.push(S.arrow(x1 + 8, yd, x2 - 8, yd, { w: 1.2, size: 6 }), S.arrow(x2 - 8, yd, x1 + 8, yd, { w: 1.2, size: 6 }));
  if (lettered) {
    p.push(lab(x1, y - r1 - 12, 'A', { a: 'middle', size: 16, w: 'bold' }), lab(x2, y - r2 - 12, 'B', { a: 'middle', size: 16, w: 'bold' }));
    p.push(lab(x1 + r1 + arrow / 2, y - 12, 'C', { a: 'middle', size: 16, w: 'bold', c: RED }), lab(x2 - r2 - arrow / 2, y - 12, 'D', { a: 'middle', size: 16, w: 'bold', c: RED }));
    p.push(lab((x1 + x2) / 2, yd + 22, 'E', { a: 'middle', size: 16, w: 'bold' }));
  } else {
    p.push(lab(x1, y + 4, 'm₁', { a: 'middle', w: 'bold' }), lab(x2, y + 4, 'm₂', { a: 'middle', w: 'bold' }));
    p.push(lab(x1 + r1 + arrow / 2, y - 12, 'F', { a: 'middle', size: 14, w: 'bold', c: RED }), lab(x2 - r2 - arrow / 2, y - 12, 'F', { a: 'middle', size: 14, w: 'bold', c: RED }));
    p.push(lab((x1 + x2) / 2, yd - 8, 'r (between the centres)', { a: 'middle' }));
  }
  const label = lettered
    ? 'Two spherical bodies A and B with a red arrow C on A pointing towards B and a red arrow D on B pointing towards A, both of the same length, and a double-headed line E showing the distance between their centres'
    : 'Two spherical bodies of masses m1 and m2 attract each other with equal and opposite forces F along the line joining their centres, a distance r apart';
  return svgDoc(480, 200, label, p.join(''));
}
export const PAIR = pair(false);
export const PAIR_LETTERED = pair(true);

// ---------------------------------------------------------------- 2. strobe picture of a freely falling ball
export const STROBE = (() => {
  const px = 5; // pixels per metre
  const y0 = 24;
  const x = 150;
  const p = [];
  const yy = FALL_S.map((s) => y0 + s * px);
  // ruler
  p.push(S.line(70, y0, 70, yy[3], { w: 1.5 }));
  FALL_S.forEach((s, i) => {
    p.push(S.line(64, yy[i], 76, yy[i], { w: 1.5 }), lab(58, yy[i] + 4, `${s} m`, { a: 'end', size: 11 }));
    p.push(S.line(76, yy[i], x - 11, yy[i], { c: MUT, w: 1, dash: '3 3' }));
    p.push(S.circle(x, yy[i], 9, { fill: i === 0 ? FILL : BLUE, c: BLUE, fop: i === 0 ? 1 : 0.4, sw: 1.8 }));
    p.push(lab(x + 20, yy[i] + 4, `t = ${FALL_T[i]} s, speed ${FALL_V[i]} m s⁻¹`, { size: 11 }));
  });
  p.push(S.arrow(300, y0 + 20, 300, y0 + 120, { c: RED, w: 2.5, size: 9 }), lab(312, y0 + 70, 'g', { size: 14, w: 'bold', c: RED }));
  p.push(lab(300, y0 + 140, 'steady pull', { a: 'middle', size: 11, c: RED }), lab(300, y0 + 154, 'of the Earth', { a: 'middle', size: 11, c: RED }));
  return svgDoc(380, 280, 'Strobe picture of a ball dropped from rest. The ball is shown at times of 0, 1, 2 and 3 seconds, after falling 0, 5, 20 and 45 metres, with speeds of 0, 10, 20 and 30 metres per second. The gaps between successive positions grow because the speed keeps increasing', p.join(''));
})();

// ---------------------------------------------------------------- 3. spring balance in kgf and newton
export const SPRING = (() => {
  const top = 40;
  const len = 150; // pixels for the full scale of 10 kgf
  const kgfMax = 10;
  const yk = (k) => top + (k / kgfMax) * len;
  const yN = (n) => top + (n / (kgfMax * KGF)) * len;
  const p = [];
  p.push(S.path(`M 190 8 a 10 10 0 1 1 0.1 0`, { w: 2 }), S.line(190, 26, 190, top - 8, { w: 2 }));
  p.push(S.rect(150, top - 8, 80, len + 26, { fill: FILL, rx: 6, sw: 2 }));
  for (let k = 0; k <= kgfMax; k++) {
    const major = k % 2 === 0;
    p.push(S.line(150, yk(k), 150 + (major ? 14 : 8), yk(k), { w: 1.2 }));
    if (major) p.push(lab(144, yk(k) + 4, String(k), { a: 'end', size: 11 }));
  }
  for (let n = 0; n <= 90; n += 10) {
    const major = n % 20 === 0;
    p.push(S.line(230, yN(n), 230 - (major ? 14 : 8), yN(n), { w: 1.2, c: GREEN }));
    if (major) p.push(lab(236, yN(n) + 4, String(n), { size: 11, c: GREEN }));
  }
  p.push(lab(112, top - 14, 'kgf', { a: 'end', size: 12, w: 'bold' }), lab(258, top - 14, 'N', { size: 12, w: 'bold', c: GREEN }));
  const yp = yk(SB_M);
  p.push(S.line(160, yp, 220, yp, { c: RED, w: 2.5 }), S.head(220, yp, 0, { c: RED, size: 8 }));
  p.push(S.line(190, top + len + 18, 190, top + len + 44, { w: 2 }));
  p.push(S.rect(165, top + len + 44, 50, 36, { fill: BLUE, c: BLUE, fop: 0.35, sw: 2 }), lab(190, top + len + 67, `${SB_M} kg`, { a: 'middle', size: 12, w: 'bold' }));
  p.push(lab(300, yp - 6, `pointer at ${SB_M} kgf`, { size: 12, c: RED }), lab(300, yp + 10, `which is ${SB_N} N`, { size: 12, c: RED }));
  p.push(S.line(236, yp, 296, yp, { c: RED, w: 1, dash: '3 3' }));
  return svgDoc(440, 290, `A spring balance with a ${SB_M} kilogram body hanging from it. The pointer stands at ${SB_M} kilogram force on the left scale and at ${SB_N} newton on the right scale`, p.join(''));
})();
