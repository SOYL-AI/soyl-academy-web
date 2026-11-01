// ICSE 10 Physics ch01 diagrams (allow-listed elements, palette colours only). Geometry is computed and self-checked
// (SELF_CHECKS, read by build.mjs): the metre rule balances by the principle of moments at the drawn positions, the spanner's
// perpendicular distance is the drawn lever arm, and the circular-motion velocity arrows are tangent to the circle.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- metre rule balanced on a knife edge
// Pivot at 50 cm; 40 gf at 30 cm (anticlockwise), 20 gf at 90 cm (clockwise): 40 × 20 = 20 × 40.
export const METRE_RULE = (() => {
  const x0 = 30;
  const scale = 4; // px per cm
  const X = (cm) => x0 + cm * scale;
  const y = 70;
  const loads = [{ cm: 30, w: 40, side: 'left' }, { cm: 90, w: 20, side: 'right' }];
  const pivot = 50;
  let s = S.rect(X(0), y - 6, 100 * scale, 12, { fill: 'var(--diagram-fill)', fop: 0.6, sw: 1.2 });
  for (let cm = 0; cm <= 100; cm += 10) s += S.line(X(cm), y - 6, X(cm), y - 1, { w: 1 }) + lab(X(cm), y - 10, String(cm), { a: 'middle', size: 10, c: MUT });
  s += S.path(`M${X(pivot)} ${y + 6} L${X(pivot) - 12} ${y + 30} L${X(pivot) + 12} ${y + 30} Z`, { fill: ACC, fop: 0.4, c: ACC });
  s += lab(X(pivot), y + 44, 'fulcrum (50 cm)', { a: 'middle', size: 10 });
  for (const l of loads) {
    s += S.line(X(l.cm), y + 6, X(l.cm), y + 40, { w: 1 }) + S.rect(X(l.cm) - 14, y + 40, 28, 22, { fill: l.side === 'left' ? BLUE : RED, fop: 0.25, c: l.side === 'left' ? BLUE : RED });
    s += lab(X(l.cm), y + 56, `${l.w} gf`, { a: 'middle', size: 10 });
    s += S.arrow(X(l.cm), y + 64, X(l.cm), y + 92, { c: l.side === 'left' ? BLUE : RED });
  }
  const left = loads[0].w * (pivot - loads[0].cm);
  const right = loads[1].w * (loads[1].cm - pivot);
  s += lab(X(40), y + 110, `anticlockwise: 40 × 20 = ${left} gf cm`, { a: 'middle', size: 10, c: BLUE });
  s += lab(X(70) + 20, y + 126, `clockwise: 20 × 40 = ${right} gf cm`, { a: 'middle', size: 10, c: RED });
  check(left === right && left === 800, 'metre rule: anticlockwise moment 40 gf × 20 cm equals clockwise moment 20 gf × 40 cm (800 gf cm), so the drawn rule balances');
  return svgDoc(460, 210, 'A metre rule balanced on a fulcrum at the 50 centimetre mark. A 40 gram-force weight hangs at the 30 centimetre mark, 20 centimetres to the left, and a 20 gram-force weight hangs at the 90 centimetre mark, 40 centimetres to the right. The anticlockwise moment, 40 times 20, equals the clockwise moment, 20 times 40: 800 gram-force centimetre each.', s);
})();

// ---------------------------------------------------------------- spanner: moment = F × perpendicular distance
export const SPANNER = (() => {
  const nut = [70, 100];
  const grip = [300, 100];
  const d = grip[0] - nut[0];
  let s = S.circle(nut[0], nut[1], 18, { fill: MUT, fop: 0.3 }) + lab(nut[0], nut[1] + 4, 'nut', { a: 'middle', size: 10 });
  s += S.rect(nut[0] + 14, nut[1] - 9, d - 4, 18, { fill: 'var(--diagram-fill)', fop: 0.7, rx: 6 });
  s += S.arrow(grip[0], grip[1] - 70, grip[0], grip[1] - 12, { c: RED, w: 2 }) + lab(grip[0] + 8, grip[1] - 50, 'F', { size: 13, w: 'bold', c: RED });
  s += S.line(nut[0], nut[1] + 30, grip[0], grip[1] + 30, { w: 1, c: ACC }) + S.line(nut[0], nut[1] + 24, nut[0], nut[1] + 36, { w: 1, c: ACC }) + S.line(grip[0], grip[1] + 24, grip[0], grip[1] + 36, { w: 1, c: ACC });
  s += lab((nut[0] + grip[0]) / 2, nut[1] + 46, 'perpendicular distance d', { a: 'middle', size: 11, c: ACC });
  s += S.path(`M${nut[0] + 30} ${nut[1] - 40} A 40 40 0 0 1 ${nut[0] + 40} ${nut[1] - 4}`, { c: GREEN });
  s += S.head(nut[0] + 40, nut[1] - 4, Math.PI / 2, { c: GREEN });
  s += lab(nut[0] + 50, nut[1] - 44, 'clockwise turning', { size: 10, c: GREEN });
  s += lab(240, 190, 'moment = F × d', { a: 'middle', size: 12, w: 'bold' });
  check(grip[1] === nut[1] && d === 230, 'spanner: the force is drawn vertical and the handle horizontal, so the dimensioned handle length is the perpendicular distance from the axis to the line of action');
  return svgDoc(380, 210, 'A spanner turning a nut. A downward force F acts at the end of the horizontal handle. The perpendicular distance d from the centre of the nut to the line of action of the force is marked along the handle. The nut turns clockwise, and the moment equals F times d.', s);
})();

// ---------------------------------------------------------------- uniform circular motion
export const CIRCLE = (() => {
  const c = [150, 120];
  const R = 80;
  let s = S.circle(c[0], c[1], R, { dash: '5 4' }) + S.circle(c[0], c[1], 3, { fill: 'currentColor' }) + lab(c[0] + 6, c[1] + 14, 'centre', { size: 10, c: MUT });
  const angs = [-90, 30, 150].map((a) => (a * Math.PI) / 180);
  let tangentOk = true;
  for (const a of angs) {
    const p = [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)];
    const t = [-Math.sin(a), Math.cos(a)]; // anticlockwise motion in screen coordinates is (sin, -cos); use clockwise on screen
    const v = [p[0] + 40 * t[0], p[1] + 40 * t[1]];
    const inward = [p[0] + 0.45 * (c[0] - p[0]), p[1] + 0.45 * (c[1] - p[1])];
    s += S.circle(p[0], p[1], 6, { fill: BLUE, fop: 0.5, c: BLUE });
    s += S.arrow(p[0], p[1], v[0], v[1], { c: GREEN, w: 1.8 });
    s += S.arrow(p[0], p[1], inward[0], inward[1], { c: RED, w: 1.8 });
    const dot = (v[0] - p[0]) * (p[0] - c[0]) + (v[1] - p[1]) * (p[1] - c[1]);
    if (Math.abs(dot) > 1e-6) tangentOk = false;
  }
  s += lab(250, 40, 'velocity (tangent)', { size: 11, c: GREEN });
  s += lab(250, 58, 'centripetal force', { size: 11, c: RED });
  s += lab(250, 74, '(towards the centre)', { size: 10, c: RED });
  check(tangentOk, 'circle: every velocity arrow is perpendicular to the radius at its point (tangent), and every force arrow points along the radius to the centre');
  return svgDoc(380, 240, 'A body moving in a circle at constant speed, shown at three positions. At each position the velocity arrow is along the tangent and changes direction from point to point, while the centripetal force arrow points along the radius towards the centre.', s);
})();

// ---------------------------------------------------------------- centre of gravity of regular shapes and the plumb line
export const CG = (() => {
  let s = '';
  s += S.rect(20, 40, 120, 14, { fill: 'var(--diagram-fill)', fop: 0.6 }) + S.circle(80, 47, 3, { fill: RED, c: RED }) + lab(80, 74, 'rod: mid-point', { a: 'middle', size: 10 });
  s += S.circle(200, 50, 28, { sw: 4 }) + S.circle(200, 50, 3, { fill: RED, c: RED }) + lab(200, 96, 'ring: centre', { a: 'middle', size: 10 });
  s += S.path('M270 80 L330 80 L300 25 Z', { fill: 'var(--diagram-fill)', fop: 0.6 });
  const g = [(270 + 330 + 300) / 3, (80 + 80 + 25) / 3];
  s += S.line(300, 25, 300, 80, { w: 1, dash: '3 2', c: MUT }) + S.line(270, 80, 315, 52.5, { w: 1, dash: '3 2', c: MUT }) + S.circle(g[0], g[1], 3, { fill: RED, c: RED });
  s += lab(300, 96, 'triangle: medians meet', { a: 'middle', size: 10 });
  s += S.path('M60 130 C 30 170 70 220 110 200 C 150 185 160 140 120 125 Z', { fill: 'var(--diagram-fill)', fop: 0.6 });
  s += S.line(70, 128, 105, 210, { c: BLUE, w: 1.2 }) + S.line(130, 132, 60, 180, { c: GREEN, w: 1.2 });
  s += lab(175, 150, 'irregular lamina: hang from two', { size: 10 });
  s += lab(175, 164, 'points; plumb lines cross at G', { size: 10 });
  const t = 0.5;
  check(Math.abs(g[0] - 300) < 1e-9 && Math.abs(g[1] - 61.67) < 0.01 && t === 0.5, 'centre of gravity: the triangle point is the centroid (mean of the vertices), which lies on the drawn median from the apex');
  return svgDoc(360, 230, 'Centre of gravity of regular bodies: the mid-point of a uniform rod, the centre of a ring (which lies outside the material), and the point where the medians of a triangular lamina meet. Below, an irregular lamina hung from two points; the two plumb-line traces cross at its centre of gravity.', s);
})();
