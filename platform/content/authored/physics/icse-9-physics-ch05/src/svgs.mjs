// SVG diagrams for ICSE 9 Physics ch05 Pressure in Fluids: a brick on a sponge in three positions, jets from a tall
// vessel (trajectories from y = x^2 / 4d), vessels of different shape with one liquid level, and a closed vessel with two
// pistons (plain and lettered A-E). Geometry is computed in JS; palette colours only; every font size is at least 10.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { BRICK_W, BRICK_FACES, JET_H, JET_D, SPURT, VESSEL_P, VESSEL_H } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 12, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YEL = 'var(--diagram-yellow)';

// ---------------------------------------------------------------- 1. a brick on a sponge in three positions
export const BRICKS = (() => {
  const px = 4; // pixels per cm
  const top = 176; // top of the sponge
  const dims = [[20, 5], [20, 10], [10, 20]]; // front-view width and height of the brick in cm
  const xs = [95, 265, 425];
  const k = 0.01; // dent depth in pixels per pascal
  const p = [];
  dims.forEach(([w, h], i) => {
    const cx = xs[i];
    const dent = BRICK_FACES[i].p * k;
    const hw = (w * px) / 2;
    const bh = h * px;
    p.push(S.path(`M ${cx - 75} ${top} H ${cx - hw} V ${top + dent} H ${cx + hw} V ${top} H ${cx + 75} V ${top + 60} H ${cx - 75} Z`, { fill: YEL, c: MUT, fop: 0.35, sw: 1.5 }));
    p.push(S.rect(cx - hw, top + dent - bh, hw * 2, bh, { fill: BLUE, c: BLUE, fop: 0.3, sw: 2 }));
    p.push(lab(cx, top + dent - bh - 26, BRICK_FACES[i].name, { a: 'middle', w: 'bold' }), lab(cx, top + dent - bh - 10, `base ${BRICK_FACES[i].a} cm²`, { a: 'middle' }));
    p.push(lab(cx, top + 82, `p = ${BRICK_FACES[i].p} Pa`, { a: 'middle', w: 'bold', c: RED }));
  });
  p.push(lab(260, 18, `The same brick, weight ${BRICK_W} N, on a sponge`, { a: 'middle', c: MUT }));
  return svgDoc(520, 270, `The same brick of weight ${BRICK_W} newton on a sponge in three positions. Lying flat on a base of 200 square centimetres it presses with 1000 pascal and makes a shallow dent; on its long edge, base 100 square centimetres, 2000 pascal and a deeper dent; on its end, base 50 square centimetres, 4000 pascal and the deepest dent`, p.join(''));
})();

// ---------------------------------------------------------------- 2. jets from a tall vessel
export const JETS = (() => {
  const s = 2.4; // pixels per cm
  const x0 = 60;
  const x1 = 160;
  const yTop = 34;
  const ground = yTop + JET_H * s;
  const p = [];
  p.push(S.rect(x0, yTop, x1 - x0, JET_H * s, { fill: BLUE, c: 'currentColor', fop: 0.2, sw: 2 }));
  p.push(S.line(20, ground, 420, ground, { w: 2 }));
  p.push(S.line(x0 - 6, yTop, x0 - 18, yTop, { w: 1 }), S.line(x0 - 12, yTop, x0 - 12, yTop + JET_D[2] * s, { w: 1 }));
  JET_D.forEach((d, i) => {
    const yh = yTop + d * s;
    p.push(S.line(x0 - 18, yh, x0 - 6, yh, { w: 1 }), lab(x0 - 22, yh + 4, `${d} cm`, { a: 'end', size: 11 }));
    // trajectory: drop = x^2 / (4 d) in cm, so in pixels y = yh + xpx^2 / (4 d s)
    const range = 2 * Math.sqrt(d * (JET_H - d)) * s;
    const pts = [];
    for (let j = 0; j <= 40; j++) {
      const xr = (range * j) / 40;
      pts.push(`${(x1 + xr).toFixed(1)} ${(yh + (xr * xr) / (4 * d * s)).toFixed(1)}`);
    }
    const jc = [BLUE, GREEN, RED][i];
    p.push(S.path(`M ${pts.join(' L ')}`, { c: jc, w: 2.5 }), lab(x1 + range, ground + 16, String(i + 1), { a: "middle", size: 12, w: "bold", c: jc }));
    p.push(S.circle(x1, yh, 3, { fill: 'currentColor' }), lab(x1 - 10, yh + 4, String(i + 1), { a: 'end', size: 12, w: 'bold' }));
  });
  p.push(lab(x0 + 50, yTop - 8, 'water surface', { a: 'middle', size: 11 }));
  p.push(lab(300, yTop + 24, 'The deeper the hole,', { size: 12, c: MUT }), lab(300, yTop + 40, 'the faster the jet.', { size: 12, c: MUT }));
  return svgDoc(440, 240, `A tall vessel of water with three holes in its side at depths of 10, 20 and 30 centimetres, numbered 1, 2 and 3 from the top. The jet from each hole curves down to the table; the deeper holes give jets that start faster and land farther away, because the pressure of the liquid is greater at greater depth (${SPURT.join(', ')} pascal)`, p.join(''));
})();

// ---------------------------------------------------------------- 3. vessels of different shape, one liquid level
export const VESSELS = (() => {
  const yL = 60; // liquid level
  const yB = 170; // base
  const p = [];
  const shapes = [
    { cx: 130, pts: [[-30, 0], [30, 0], [30, 1], [-30, 1]], name: 'straight sides' },
    { cx: 290, pts: [[-22, 0], [22, 0], [58, 1], [-58, 1]], name: 'wider at the base' },
    { cx: 450, pts: [[-58, 0], [58, 0], [22, 1], [-22, 1]], name: 'wider at the top' },
  ];
  shapes.forEach(({ cx, pts, name }) => {
    const poly = pts.map(([dx, f]) => `${cx + dx},${yL + f * (yB - yL)}`).join(' ');
    p.push(`<polygon points="${poly}" fill="${BLUE}" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>`);
    p.push(S.line(cx - 70, yB + 2, cx + 70, yB + 2, { w: 3 }));
    p.push(lab(cx, yB + 22, name, { a: 'middle', size: 12 }), lab(cx, yB + 40, `base pressure ${VESSEL_P} Pa`, { a: 'middle', size: 12, w: 'bold', c: RED }));
  });
  p.push(S.line(14, yL, 520, yL, { c: MUT, w: 1, dash: '5 4' }));
  p.push(S.arrow(24, yL + 6, 24, yB - 2, { w: 1.2, size: 6 }), S.arrow(24, yB - 2, 24, yL + 6, { w: 1.2, size: 6 }), lab(30, (yL + yB) / 2 + 4, `h = ${VESSEL_H} m`, { size: 11 }));
  p.push(lab(265, 22, 'The same liquid to the same height h in three vessels', { a: 'middle', c: MUT }));
  return svgDoc(530, 225, `Three vessels of different shape (straight sides, wider at the base, wider at the top) filled with water to the same height of ${VESSEL_H} metre. The pressure at the base is ${VESSEL_P} pascal in each`, p.join(''));
})();

// ---------------------------------------------------------------- 4. closed vessel with two pistons (plain and lettered)
function pistons(lettered) {
  const p = [];
  const yL = 82;
  p.push(`<path d="M 60 ${yL} H 100 V 130 H 220 V ${yL} H 340 V 150 H 60 Z" fill="${BLUE}" fill-opacity="0.25" stroke="none"/>`);
  p.push(S.path('M 60 40 V 150 H 340 V 40', { w: 2.5 }), S.path('M 100 40 V 130 H 220 V 40', { w: 2.5 }));
  p.push(S.rect(62, yL - 8, 36, 8, { fill: FILL, sw: 2 }), S.rect(222, yL - 8, 116, 8, { fill: FILL, sw: 2 }));
  p.push(S.arrow(80, 34, 80, yL - 12, { c: RED, w: 3, size: 9 }), S.arrow(280, yL - 12, 280, 34, { c: GREEN, w: 3, size: 9 }));
  if (lettered) {
    p.push(lab(46, yL - 2, 'A', { a: 'end', size: 16, w: 'bold' }), lab(352, yL - 2, 'B', { size: 16, w: 'bold' }), lab(160, 108, 'C', { a: 'middle', size: 16, w: 'bold' }));
    p.push(lab(80, 24, 'D', { a: 'middle', size: 16, w: 'bold', c: RED }), lab(280, 24, 'E', { a: 'middle', size: 16, w: 'bold', c: GREEN }));
  } else {
    p.push(lab(46, yL - 2, 'area A₁', { a: 'end', size: 12 }), lab(352, yL - 2, 'area A₂', { size: 12 }), lab(160, 108, 'liquid', { a: 'middle', size: 12 }));
    p.push(lab(80, 24, 'F₁', { a: 'middle', size: 14, w: 'bold', c: RED }), lab(280, 24, 'F₂', { a: 'middle', size: 14, w: 'bold', c: GREEN }));
  }
  const label = lettered
    ? 'A closed vessel of liquid with a narrow cylinder on the left and a wide cylinder on the right joined at the bottom. A is the small piston, B the large piston, C the liquid, D the downward force pushing the small piston and E the upward force on the large piston'
    : 'A closed vessel of liquid with a small piston of area A1 pushed down by force F1 and a large piston of area A2 pushed up by force F2; the pressure in the liquid is the same everywhere';
  return svgDoc(400, 180, label, p.join(''));
}
export const PISTONS = pistons(false);
export const PISTONS_LETTERED = pistons(true);
