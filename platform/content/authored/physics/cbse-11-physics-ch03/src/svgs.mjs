// ch03 diagrams, all drawn from numbers with self-checks: vector addition (parallelogram and triangle), subtraction,
// multiplication by a real number, resolution into components, dot and cross products,
// a projectile to scale, horizontal projection against free fall, uniform circular motion and the change of velocity.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, Vec, resultant2, proj } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const f2 = (n) => (Math.round(n * 100) / 100).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

/** Pixel position of a physical vector w from pixel origin (ox, oy): y is flipped; k is pixels per unit. */
const pt = (ox, oy, k, w) => [ox + k * w[0], oy - k * w[1]];
const ang = (x1, y1, x2, y2) => deg(Math.atan2(-(y2 - y1), x2 - x1));

/** Small arc (as a path) of radius r about (cx, cy) from screen-angle a1 to a2 (degrees, counter-clockwise positive). */
function arc(cx, cy, r, a1, a2) {
  const p1 = [cx + r * Math.cos(rad(a1)), cy - r * Math.sin(rad(a1))];
  const p2 = [cx + r * Math.cos(rad(a2)), cy - r * Math.sin(rad(a2))];
  const sweep = a2 > a1 ? 0 : 1;
  return `M${f1(p1[0])} ${f1(p1[1])} A${f1(r)} ${f1(r)} 0 0 ${sweep} ${f1(p2[0])} ${f1(p2[1])}`;
}

// ---------------------------------------------------------------- VADD: parallelogram and triangle laws (30 px per unit)
export const VADD_DATA = { A: 6, B: 4, theta: 60, k: 30, ox: 34, oy: 172 };
export const VADD = (() => {
  const { A, B, theta, k, ox, oy } = VADD_DATA;
  const w = 420;
  const h = 262;
  const rs = resultant2(A, B, theta);
  const va = [A, 0];
  const vb = Vec.polar(B, theta);
  const vr = Vec.add(va, vb);
  const P = (v) => pt(ox, oy, k, v);
  const [ax, ay] = P(va);
  const [bx, by] = P(vb);
  const [rx, ry] = P(vr);
  let s = S.line(ox - 8, oy, ox + 236, oy, { c: MUT, w: 0.8, dash: '3 4' });
  // parallelogram sides (dashed) and the diagonal
  s += S.line(ax, ay, rx, ry, { c: MUT, w: 1.2, dash: '5 4' }) + S.line(bx, by, rx, ry, { c: MUT, w: 1.2, dash: '5 4' });
  s += S.arrow(ox, oy, ax, ay, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, bx, by, { c: GRN, w: 2.4 }) + S.arrow(ox, oy, rx, ry, { c: RED, w: 2.8, size: 10 });
  s += S.text((ox + ax) / 2, oy + 16, `A = ${A}`, { a: 'middle', size: 11, w: 'bold', c: BLUE });
  s += S.text((ox + bx) / 2 - 8, (oy + by) / 2 - 4, `B = ${B}`, { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.text((ox + rx) / 2 + 2, (oy + ry) / 2 - 10, `R = ${f2(rs.R)}`, { a: 'middle', size: 11, w: 'bold', c: RED });
  s += S.text((ax + rx) / 2 + 8, (ay + ry) / 2 + 4, 'B (copy)', { size: 10, c: GRN }) + S.text((bx + rx) / 2, by - 6, 'A (copy)', { a: 'middle', size: 10, c: BLUE });
  s += S.path(arc(ox, oy, 26, 0, theta), { c: ACC, w: 1.2 }) + S.text(ox - 6, oy + 30, `θ = ${theta}° between A and B`, { size: 10, c: ACC, a: 'start' });
  s += S.path(arc(ox, oy, 62, 0, rs.alpha), { c: RED, w: 1.2 }) + S.text(ox + 66, oy - 12, `α = ${f1(rs.alpha)}°`, { size: 10, c: RED });
  s += S.lines(ox + 296, 100, ['R² = A² + B²', '    + 2AB cos θ', `   = ${A * A} + ${B * B} + ${f2(2 * A * B * Math.cos(rad(theta)))}`, `   = ${f1(rs.R ** 2)}`, `R = ${f2(rs.R)}`, 'tan α = B sin θ', '       /(A + B cos θ)', `α = ${f1(rs.alpha)}°`], { size: 10, dy: 14 });
  s += S.text(w / 2, h - 20, 'Tail to tail: the diagonal of the parallelogram. Tail to head: the dashed', { a: 'middle', size: 10 }) + S.text(w / 2, h - 7, 'copy of B starts at the tip of A, giving the same R. Scale: 1 unit = 30 px.', { a: 'middle', size: 10 });
  // self-checks: drawn diagonal = A + B in pixels; length and angle agree with the law of cosines
  const dpx = [rx - ox, oy - ry];
  const okVec = near(dpx[0] / k, vr[0], 1e-9) && near(dpx[1] / k, vr[1], 1e-9);
  const okLen = near(Math.hypot(...dpx) / k, rs.R, 1e-9) && near(rs.R, rs.Rc, 1e-9);
  const okAng = near(ang(ox, oy, rx, ry), rs.alpha, 1e-9) && near(rs.alpha, rs.alphac, 1e-9);
  const okPar = near(rx - ax, bx - ox, 1e-9) && near(ry - ay, by - oy, 1e-9);
  check(okVec && okLen && okAng && okPar, `vadd: A = ${A}, B = ${B} at ${theta}°; drawn diagonal = A + B (${f2(rs.R)} units at ${f1(rs.alpha)}° to A); the dashed sides are parallel copies (parallelogram closes); R² = ${f1(rs.R ** 2)}`);
  return svgDoc(w, h, `Two vectors A of magnitude 6 and B of magnitude 4 drawn from one point at 60 degrees; the resultant R is the diagonal of the parallelogram, about 8.72 units long and 23.4 degrees from A; the dashed copy of B placed at the tip of A shows the triangle law`, s);
})();

// ---------------------------------------------------------------- VSUB: A − B = A + (−B)
export const VSUB = (() => {
  const { A, B, theta, k } = VADD_DATA;
  const ox = 44;
  const oy = 108;
  const w = 420;
  const h = 262;
  const va = [A, 0];
  const vb = Vec.polar(B, theta);
  const dv = Vec.sub(va, vb);
  const P = (v) => pt(ox, oy, k, v);
  const [ax, ay] = P(va);
  const [bx, by] = P(vb);
  const [dx, dy] = P(dv);
  let s = S.arrow(ox, oy, ax, ay, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, bx, by, { c: GRN, w: 2.4 });
  s += S.arrow(ax, ay, dx, dy, { c: GRN, w: 2, dash: '5 4' }) + S.arrow(ox, oy, dx, dy, { c: RED, w: 2.8, size: 10 });
  s += S.arrow(bx, by, ax, ay, { c: RED, w: 1.4, dash: '2 4', size: 6 });
  s += S.text((ox + ax) / 2, oy - 8, `A = ${A}`, { a: 'middle', size: 11, w: 'bold', c: BLUE });
  s += S.text((ox + bx) / 2 - 8, (oy + by) / 2, `B = ${B}`, { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.text((ax + dx) / 2 + 8, (ay + dy) / 2 + 4, '−B', { size: 11, w: 'bold', c: GRN });
  s += S.text((ox + dx) / 2 - 8, (oy + dy) / 2 + 12, `A − B = ${f2(Vec.mag(dv))}`, { a: 'end', size: 11, w: 'bold', c: RED });
  s += S.text((bx + ax) / 2 + 24, (by + ay) / 2 - 2, 'same vector A − B', { size: 10, c: RED });
  s += S.lines(ox + 232, 150, [`|A − B|² = A² + B² − 2AB cos θ`, `= ${A * A} + ${B * B} − ${f2(2 * A * B * Math.cos(rad(theta)))} = ${f1(Vec.mag(dv) ** 2)}`, `|A − B| = ${f2(Vec.mag(dv))}`], { size: 10, dy: 15 });
  s += S.text(w / 2, h - 5, 'A − B is A plus the reversed B; it also joins the tip of B to the tip of A. Scale: 1 unit = 30 px.', { a: 'middle', size: 10 });
  const okSub = near((dx - ox) / k, A - vb[0], 1e-9) && near((oy - dy) / k, -vb[1], 1e-9);
  const okJoin = near(ax - bx, dx - ox, 1e-9) && near(ay - by, dy - oy, 1e-9); // vector from tip of B to tip of A equals A − B
  const okMag = near(Vec.mag(dv) ** 2, A * A + B * B - 2 * A * B * Math.cos(rad(theta)), 1e-9);
  check(okSub && okJoin && okMag, `vsub: A − B drawn as A + (−B) and as the join from the tip of B to the tip of A (same arrow); |A − B|² = ${f1(Vec.mag(dv) ** 2)} = A² + B² − 2AB cos θ`);
  return svgDoc(w, h, 'Subtraction of vectors: A of magnitude 6 and B of magnitude 4 at 60 degrees; A minus B is drawn from the origin as A plus the reversed B, and the same arrow also joins the tip of B to the tip of A; its magnitude is the square root of 28, about 5.29', s);
})();

// ---------------------------------------------------------------- SCALEV: multiplying a vector by a real number
export const SCALEV = (() => {
  const w = 420;
  const h = 210;
  const k = 36;
  const ox = 170;
  const oy = 112;
  const A = Vec.polar(3, 25);
  const cases = [[2, BLUE, '2A', 'end'], [1, 'currentColor', 'A', 'start'], [0.5, GRN, '½A', 'start'], [-1, RED, '−A', 'start']];
  let s = '';
  let ok = true;
  const lens = [];
  for (const [n, c, label] of cases) {
    const v = Vec.scale(A, n);
    const [x, y] = pt(ox, oy, k, v);
    s += S.arrow(ox, oy, x, y, { c, w: n === 1 ? 2.4 : 2, size: 8 });
    const dpx = [x - ox, oy - y];
    ok = ok && near(Math.hypot(...dpx), Math.abs(n) * Math.hypot(...pt(0, 0, k, A).map((q, i) => (i ? -q : q))), 1e-9) && (n > 0 ? near(Math.atan2(dpx[1], dpx[0]), rad(25), 1e-9) : near(Math.atan2(-dpx[1], -dpx[0]), rad(25), 1e-9));
    lens.push(Vec.mag(v));
    if (n === 2) s += S.text(x - 2, y - 8, `${label} = 6 units`, { size: 11, c, a: 'end', w: 'bold' });
    else if (n === 1) s += S.text(x + 6, y + 16, `${label} = 3 units`, { size: 11, w: 'bold' });
    else if (n === 0.5) s += S.text(x - 4, y - 8, `${label} = 1.5 units`, { size: 11, c, a: 'end', w: 'bold' });
    else s += S.text(x - 4, y + 16, `${label} = 3 units, opposite`, { size: 11, c, a: 'start', w: 'bold' });
  }
  s += S.text(w / 2, h - 20, 'λA has magnitude |λ| A and the direction of A if λ > 0,', { a: 'middle', size: 10 }) + S.text(w / 2, h - 7, 'the opposite direction if λ < 0. Scale: 1 unit = 36 px.', { a: 'middle', size: 10 });
  check(ok && near(lens[0], 6, 1e-9) && near(lens[2], 1.5, 1e-9) && near(lens[3], 3, 1e-9), 'scalev: 2A is 6 units, ½A 1.5 units, −A 3 units; angles checked (same direction for λ > 0, opposite for λ < 0)');
  return svgDoc(w, h, 'A vector A of 3 units drawn with 2A twice as long in the same direction, half of A in the same direction, and minus A of the same length pointing the opposite way', s);
})();

// ---------------------------------------------------------------- RESOLVE: components and unit vectors (22 px per unit)
export const RESOLVE_DATA = { Ax: 8, Ay: 6, k: 22 };
export const RESOLVE = (() => {
  const { Ax, Ay, k } = RESOLVE_DATA;
  const w = 420;
  const h = 228;
  const ox = 46;
  const oy = 190;
  const A = [Ax, Ay];
  const mag = Vec.mag(A);
  const th = Vec.ang(A);
  const [tx, ty] = pt(ox, oy, k, A);
  let s = S.arrow(ox - 14, oy, ox + Ax * k + 40, oy, { c: MUT, w: 1.2, size: 6 }) + S.arrow(ox, oy + 12, ox, oy - Ay * k - 30, { c: MUT, w: 1.2, size: 6 });
  s += S.text(ox + Ax * k + 40, oy + 14, 'x', { a: 'end', size: 10 }) + S.text(ox + 8, oy - Ay * k - 28, 'y', { size: 10 });
  s += S.line(tx, ty, tx, oy, { c: BLUE, w: 2, dash: '5 3' }) + S.line(ox, oy, tx, oy, { c: GRN, w: 2.4 });
  s += S.arrow(ox, oy, tx, ty, { c: RED, w: 2.8, size: 10 });
  s += S.arrow(ox, oy + 22, ox + k, oy + 22, { w: 2, size: 6 }) + S.arrow(ox - 22, oy, ox - 22, oy - k, { w: 2, size: 6 });
  s += S.text(ox + k / 2, oy + 36, 'î', { a: 'middle', size: 12, w: 'bold' }) + S.text(ox - 28, oy - k / 2 + 4, 'ĵ', { a: 'end', size: 12, w: 'bold' });
  s += S.text((ox + tx) / 2, oy + 16, `A_x = ${Ax} î`, { a: 'middle', size: 11, c: GRN, w: 'bold' }) + S.text(tx + 8, (oy + ty) / 2 + 4, `A_y = ${Ay} ĵ`, { size: 11, c: BLUE, w: 'bold' });
  s += S.text((ox + tx) / 2 - 12, (oy + ty) / 2 - 8, `A = ${mag}`, { a: 'end', size: 11, c: RED, w: 'bold' });
  s += S.path(arc(ox, oy, 36, 0, th), { c: ACC, w: 1.2 }) + S.text(ox + 40, oy - 8, `θ = ${f1(th)}°`, { size: 10, c: ACC });
  s += S.lines(tx + 46, 38, ['A = A_x î + A_y ĵ', `A_x = A cos θ = ${Ax}`, `A_y = A sin θ = ${Ay}`, `A = √(${Ax}² + ${Ay}²) = ${mag}`, `tan θ = ${Ay}/${Ax}`], { size: 10, dy: 15 });
  s += S.text(w / 2, h - 3, 'Scale: 1 unit = 22 px.', { a: 'middle', size: 10 });
  const okC = near((tx - ox) / k, mag * Math.cos(rad(th)), 1e-9) && near((oy - ty) / k, mag * Math.sin(rad(th)), 1e-9) && near(mag, 10, 1e-9);
  const okPy = near(Math.hypot(tx - ox, oy - ty) / k, 10, 1e-9) && near(Math.hypot(tx - ox, 0) ** 2 + Math.hypot(0, oy - ty) ** 2, (mag * k) ** 2, 1e-9);
  check(okC && okPy && near(th, 36.87, 1e-4), `resolve: A = ${Ax} î + ${Ay} ĵ drawn to scale, |A| = ${mag} (3-4-5 triangle scaled by 2), θ = ${f1(th)}°; components recovered from A cos θ and A sin θ`);
  return svgDoc(w, h, 'A vector A of magnitude 10 at about 36.9 degrees above the x-axis resolved into a horizontal component of 8 units along i-hat and a vertical component of 6 units along j-hat, with the unit vectors i-hat and j-hat drawn at the origin', s);
})();

// ---------------------------------------------------------------- DOTCROSS: projection and parallelogram area (20 px per unit)
export const DOTCROSS_DATA = { A: [6, 0], B: [3, 4], k: 18 };
export const DOTCROSS = (() => {
  const { A, B, k } = DOTCROSS_DATA;
  const w = 420;
  const h = 232;
  const dot = Vec.dot(A, B);
  const cross = Vec.cross2(A, B);
  const th = deg(Math.acos(dot / (Vec.mag(A) * Vec.mag(B))));
  let s = '';
  // left panel: projection of B on A
  let ox = 22;
  const oy = 170;
  let [ax, ay] = pt(ox, oy, k, A);
  let [bx, by] = pt(ox, oy, k, B);
  s += S.line(bx, by, bx, oy, { c: MUT, w: 1.2, dash: '4 3' });
  s += S.line(ox, oy + 8, ox + k * B[0], oy + 8, { c: RED, w: 3 });
  s += S.arrow(ox, oy, ax, ay, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, bx, by, { c: GRN, w: 2.4 });
  s += S.text(ax + 4, ay + 4, 'A', { size: 11, w: 'bold', c: BLUE }) + S.text(bx - 6, by - 4, 'B', { size: 11, w: 'bold', c: GRN, a: 'end' });
  s += S.path(arc(ox, oy, 24, 0, th), { c: ACC, w: 1.2 }) + S.text(ox + 28, oy - 6, 'θ', { size: 11, c: ACC });
  s += S.text(ox + (k * B[0]) / 2, oy + 24, 'B cos θ = 3', { a: 'middle', size: 10, c: RED });
  s += S.text(100, 24, 'Dot product', { a: 'middle', size: 12, w: 'bold' });
  s += S.lines(ox, 42, ['A·B = A (B cos θ)', `= ${Vec.mag(A)} × ${f1(Vec.mag(B) * Math.cos(rad(th)))} = ${dot}`, 'a scalar'], { size: 10, dy: 14 });
  const projPx = bx - ox;
  const okDot = near(projPx / k, Vec.mag(B) * Math.cos(rad(th)), 1e-9) && near(Vec.mag(A) * (projPx / k), dot, 1e-9) && dot === A[0] * B[0] + A[1] * B[1];
  // right panel: parallelogram area
  ox = 232;
  [ax, ay] = pt(ox, oy, k, A);
  [bx, by] = pt(ox, oy, k, B);
  const [cx, cy] = pt(ox, oy, k, Vec.add(A, B));
  s += S.path(`M${f1(ox)} ${f1(oy)} L${f1(ax)} ${f1(ay)} L${f1(cx)} ${f1(cy)} L${f1(bx)} ${f1(by)} Z`, { c: GRN, fill: GRN, fop: 0.16, w: 1 });
  s += S.line(bx, by, bx, oy, { c: MUT, w: 1.2, dash: '4 3' }) + S.text(bx + 5, (by + oy) / 2 + 3, 'B sin θ = 4', { a: 'start', size: 10, c: MUT });
  s += S.arrow(ox, oy, ax, ay, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, bx, by, { c: GRN, w: 2.4 });
  s += S.text(ax + 4, ay + 4, 'A', { size: 11, w: 'bold', c: BLUE }) + S.text(bx - 6, by - 4, 'B', { size: 11, w: 'bold', c: GRN, a: 'end' });
  s += S.circle(ox + 8, oy + 26, 8, { c: RED, w: 1.6 }) + S.circle(ox + 8, oy + 26, 2, { c: RED, fill: RED });
  s += S.text(ox + 22, oy + 30, 'A × B: out of the page', { size: 10, c: RED });
  s += S.text(310, 24, 'Cross product', { a: 'middle', size: 12, w: 'bold' });
  s += S.lines(ox, 42, ['|A × B| = A B sin θ', `= ${Vec.mag(A)} × ${f1(Vec.mag(B) * Math.sin(rad(th)))} = ${Math.abs(cross)}`, '= area of the parallelogram'], { size: 10, dy: 14 });
  const shoelace = (pts) => Math.abs(pts.reduce((sum, p, i) => sum + (p[0] * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * p[1]), 0)) / 2;
  const areaPx = shoelace([[ox, oy], [ax, ay], [cx, cy], [bx, by]]);
  const okArea = near(areaPx / (k * k), Math.abs(cross), 1e-9) && near(Vec.mag(A) * Vec.mag(B) * Math.sin(rad(th)), Math.abs(cross), 1e-9) && cross > 0;
  s += S.text(w / 2, h - 4, 'Scale: 1 unit = 18 px. A = 6 along x, B = (3, 4) of length 5, so θ ≈ 53.1°.', { a: 'middle', size: 10 });
  check(okDot && okArea && near(th, 53.13, 1e-3), `dotcross: B has component 3 along A so A·B = 6 × 3 = ${dot} = A_x B_x + A_y B_y; parallelogram area (shoelace on drawn points) = ${Math.abs(cross)} = A_x B_y − A_y B_x = A B sin θ; A × B has +z sense (out of the page)`);
  return svgDoc(w, h, 'Left: the dot product of A, 6 units along the x-axis, and B of length 5 at 53 degrees equals A times the projection of B on A, 6 times 3 equals 18. Right: the magnitude of the cross product equals the area of the parallelogram on A and B, 24, and its direction is out of the page', s);
})();

// ---------------------------------------------------------------- PROJ: a projectile to scale (u = 39.2 m/s at 30°, g = 9.8)
export const PROJ_DATA = { u: 39.2, theta: 30, k: 2.4, ox: 30, oy: 150 };
export const PROJ = (() => {
  const { u, theta, k, ox, oy } = PROJ_DATA;
  const w = 420;
  const h = 218;
  const p = proj(u, theta);
  p.tTop = Math.round(p.tTop * 1e6) / 1e6;
  p.T = Math.round(p.T * 1e6) / 1e6;
  const x = (t) => p.ux * t;
  const y = (t) => p.uy * t - 0.5 * g * t * t;
  let s = S.line(ox - 10, oy, ox + k * p.R + 20, oy, { c: MUT, w: 1.2 });
  let d = '';
  const n = 60;
  for (let i = 0; i <= n; i++) d += `${i ? ' L' : 'M'}${f1(ox + k * x((p.T * i) / n))} ${f1(oy - k * y((p.T * i) / n))}`;
  s += S.path(d, { c: RED, w: 2 });
  const vs = 1.0; // px per m/s for the velocity arrows
  const pts = [];
  for (let t = 0; t <= 4; t++) {
    const px = ox + k * x(t);
    const py = oy - k * y(t);
    pts.push([px, py, t]);
    s += S.circle(px, py, 3, { c: 'currentColor', fill: 'currentColor' });
    const vy = p.uy - g * t;
    s += S.arrow(px, py, px + vs * p.ux, py, { c: GRN, w: 1.3, size: 5 });
    if (Math.abs(vy) > 0.01) s += S.arrow(px, py, px, py - vs * vy, { c: BLUE, w: 1.3, size: 5 });
    s += S.text(px, oy + 32, `${t} s`, { a: 'middle', size: 10 });
  }
  s += S.text(ox + k * p.R / 2, oy - k * p.H - 26, `top: t = ${p.tTop} s, H = ${f1(p.H)} m`, { a: 'middle', size: 10, w: 'bold' });
  s += S.line(ox + (k * p.R) / 2, oy - k * p.H, ox + (k * p.R) / 2, oy, { c: MUT, w: 1, dash: '3 3' });
  s += S.text(ox + k * p.R, oy + 48, `range R = ${f1(p.R)} m, T = ${p.T} s`, { a: 'end', size: 10, w: 'bold' });
  s += S.text(ox + 4, oy + 48, 'u = 39.2 m s⁻¹ at 30°', { size: 10 });
  s += S.text(w - 6, 14, 'green: horizontal velocity (constant)', { a: 'end', size: 10, c: GRN }) + S.text(w - 6, 27, 'blue: vertical velocity (changes by 9.8 m s⁻¹ each second)', { a: 'end', size: 10, c: BLUE });
  s += S.text(w - 6, h - 4, 'Scale: 2.4 px per metre; arrows 1 px per m s⁻¹.', { a: 'end', size: 10 });
  // self-checks
  const th = rad(theta);
  const eqY = (xx) => xx * Math.tan(th) - (g * xx * xx) / (2 * u * u * Math.cos(th) ** 2);
  const okPath = pts.every(([px, py, t]) => near(oy - py, k * eqY(x(t)), 1e-9) || Math.abs(oy - py - k * eqY(x(t))) < 1e-9);
  const apexX = ox + (k * p.R) / 2;
  const okApex = near(pts[2][0], apexX, 1e-9) && near(oy - pts[2][1], k * p.H, 1e-9) && near(p.H, 19.6, 1e-9) && near(p.T, 4, 1e-9);
  const okSym = near(oy - pts[1][1], oy - pts[3][1], 1e-9) && Math.abs(oy - pts[4][1]) < 1e-9 && Math.abs(oy - pts[0][1]) < 1e-9;
  check(okPath && okApex && okSym, `proj: points at t = 0–4 s satisfy y = x tan θ − g x²/(2u² cos² θ); apex at t = ${p.tTop} s, x = R/2, H = ${f1(p.H)} m; heights symmetric about the top; lands at R = ${f1(p.R)} m after ${p.T} s`);
  return svgDoc(w, h, 'A projectile launched at 39.2 metres per second at 30 degrees above the horizontal, drawn to scale: a parabola rising 19.6 metres in 2 seconds and landing 135.8 metres away after 4 seconds; the horizontal velocity arrow stays the same while the vertical one shrinks to zero at the top and then points down', s);
})();

// ---------------------------------------------------------------- HORIZ: horizontal projection against free fall (1.6 px per metre)
export const HORIZ_DATA = { u: 20, T: 4, k: 1.6, ox: 70, oy: 24 };
export const HORIZ = (() => {
  const { u, T, k, ox, oy } = HORIZ_DATA;
  const w = 420;
  const h = 206;
  const H = 0.5 * g * T * T;
  const ground = oy + k * H;
  let s = S.rect(10, oy, ox - 10, ground - oy + 14, { c: MUT, fill: FILL, w: 1 }) + S.line(0, ground, w, ground, { c: 'currentColor', w: 1.4 });
  s += S.text(40, oy + 100, 'cliff', { a: 'middle', size: 10 });
  const rows = [];
  let d = '';
  for (let i = 0; i <= 40; i++) {
    const t = (T * i) / 40;
    d += `${i ? ' L' : 'M'}${f1(ox + k * u * t)} ${f1(oy + k * 0.5 * g * t * t)}`;
  }
  s += S.path(d, { c: RED, w: 1.6, dash: '4 3' });
  for (let t = 0; t <= T; t++) {
    const y = oy + k * 0.5 * g * t * t;
    const xp = ox + k * u * t;
    rows.push({ t, y, xp, yDrop: y });
    s += S.line(ox, y, xp, y, { c: MUT, w: 0.8, dash: '2 3' });
    s += S.circle(ox, y, 4, { c: BLUE, fill: BLUE, fop: 0.4 }) + S.circle(xp, y, 4, { c: RED, fill: RED, fop: 0.4 });
    if (t > 0) s += S.text(ox - 8, y + (t === T ? -4 : 4), `${f1(0.5 * g * t * t)} m`, { a: 'end', size: 10 });
  }
  s += S.text(ox - 8, oy - 8, 'blue: dropped', { size: 10, c: BLUE }) + S.text(ox + 80, oy - 8, 'red: thrown horizontally, 20 m s⁻¹', { size: 10, c: RED });
  const vyEnd = g * T;
  const ex = ox + k * u * T;
  s += S.arrow(ex, ground, ex + u, ground, { c: GRN, w: 1.6, size: 6 }) + S.arrow(ex, ground, ex, ground + vyEnd * 0.45, { c: BLUE, w: 1.6, size: 6 });
  s += S.lines(ex + 40, oy + 20, ['Equal times, equal drops:', 'both balls are at the same', 'height at every second.', `Range = ${u} × ${T} = ${u * T} m`, `v at impact: ${u} across,`, `${f1(vyEnd)} down → ${f1(Math.hypot(u, vyEnd))} m s⁻¹`], { size: 10, dy: 13.5 });
  s += S.text(w - 6, h - 4, 'Scale: 1.6 px per metre; one picture per second; h = 78.4 m, g = 9.8 m s⁻².', { a: 'end', size: 10 });
  const okSame = rows.every((r) => near(r.y, r.yDrop, 1e-9));
  const okRatio = rows.slice(1).every((r) => near((r.y - oy) / (rows[1].y - oy), r.t * r.t, 1e-9));
  const okX = rows.every((r, i) => near(r.xp - ox, k * u * i, 1e-9)) && near(ground - oy, k * H, 1e-9) && near(H, 78.4, 1e-9);
  const ang2 = deg(Math.atan2(vyEnd, u));
  check(okSame && okRatio && okX && near(ang2, 62.97, 1e-3), `horiz: dropped and thrown balls at equal heights each second (drops 1:4:9:16 × 4.9 m); horizontal steps ${u} m per second; range ${u * T} m; impact speed ${f1(Math.hypot(u, vyEnd))} m s⁻¹ at ${f1(ang2)}° below the horizontal`);
  return svgDoc(w, h, 'A ball thrown horizontally at 20 metres per second from a 78.4 metre cliff beside a ball dropped from rest: the two are at the same height at each second, the thrown ball moving 20 metres further across each second, landing 80 metres away after 4 seconds', s);
})();

// ---------------------------------------------------------------- CIRC: uniform circular motion (r = 5 m, v = 4 m/s)
export const CIRC_DATA = { r: 5, v: 4, kr: 16, kv: 10, ka: 12.5, cx: 130, cy: 112 };
export const CIRC = (() => {
  const { r, v, kr, kv, ka, cx, cy } = CIRC_DATA;
  const w = 420;
  const h = 230;
  const a = (v * v) / r;
  const R = r * kr;
  let s = S.circle(cx, cy, R, { c: MUT, w: 1.4 }) + S.circle(cx, cy, 2.5, { c: 'currentColor', fill: 'currentColor' }) + S.text(cx + 5, cy + 14, 'O', { size: 10 });
  let ok = true;
  for (const phi of [45, 135, 225, 315]) {
    const px = cx + R * Math.cos(rad(phi));
    const py = cy - R * Math.sin(rad(phi));
    const t = [-Math.sin(rad(phi)), Math.cos(rad(phi))]; // tangent (counter-clockwise)
    const vx = px + kv * v * t[0];
    const vy = py - kv * v * t[1];
    const ex = px - ka * a * Math.cos(rad(phi));
    const ey = py + ka * a * Math.sin(rad(phi));
    s += S.line(cx, cy, px, py, { c: MUT, w: 0.8, dash: '3 3' }) + S.circle(px, py, 4, { c: 'currentColor', fill: 'currentColor' });
    s += S.arrow(px, py, vx, vy, { c: BLUE, w: 2, size: 7 }) + S.arrow(px, py, ex, ey, { c: RED, w: 2, size: 7 });
    const vdx = vx - px;
    const vdy = py - vy;
    const rdx = px - cx;
    const rdy = cy - py;
    ok = ok && Math.abs(vdx * rdx + vdy * rdy) < 1e-6 && near(Math.hypot(ex - px, ey - py), ka * a, 1e-9) && near(Math.hypot(vdx, vdy), kv * v, 1e-9);
    ok = ok && near((ex - px) / (cx - px), (ka * a) / R, 1e-9);
  }
  s += S.text(cx + R * 0.7 + 18, cy - R * 0.7 - 14, 'v (tangent)', { size: 10, c: BLUE }) + S.text(6, 14, 'a (to the centre)', { size: 10, c: RED });
  s += S.lines(268, 52, [`r = ${r} m, v = ${v} m s⁻¹ (constant)`, `ω = v/r = ${v / r} rad s⁻¹`, `T = 2πr/v = ${f2((2 * Math.PI * r) / v)} s`, `a = v²/r = ${a} m s⁻²`, `a = ω² r = ${f2((v / r) ** 2)} × ${r} = ${a} m s⁻²`], { size: 10, dy: 15 });
  s += S.lines(268, 150, ['Speed is constant but the', 'direction changes, so v', 'changes: a ≠ 0, and a ⟂ v.'], { size: 10, dy: 13 });
  s += S.text(w - 6, h - 4, 'Scale: 16 px per m; velocity arrows 10 px per m s⁻¹; acceleration arrows 12.5 px per m s⁻².', { a: 'end', size: 10 });
  check(ok && near(a, 3.2, 1e-9) && near((v / r) ** 2 * r, a, 1e-9) && near(ka * a, 40, 1e-9), `circ: at four points the velocity arrow is tangent (perpendicular to the radius, ${kv * v} px = ${v} m s⁻¹) and the acceleration arrow points to the centre (${ka * a} px = ${a} m s⁻² = v²/r = ω²r)`);
  return svgDoc(w, h, 'Uniform circular motion with radius 5 metres and speed 4 metres per second: at four points the velocity is tangent to the circle and the acceleration points to the centre with magnitude 3.2 metres per second squared', s);
})();

// ---------------------------------------------------------------- DELTAV: change of velocity between two nearby points
export const DELTAV_DATA = { v: 4, dth: 40, k: 14 };
export const DELTAV = (() => {
  const { v, dth, k } = DELTAV_DATA;
  const w = 420;
  const h = 232;
  const cx = 100;
  const cy = 126;
  const R = 78;
  const a1 = 90 - dth / 2 + 0; // screen angle of P1 on the circle (from +x, counter-clockwise)
  const a2 = a1 + dth;
  const pos = (aa) => [cx + R * Math.cos(rad(aa)), cy - R * Math.sin(rad(aa))];
  const tang = (aa) => [-Math.sin(rad(aa)), Math.cos(rad(aa))];
  const [p1x, p1y] = pos(a1 - dth * 0 - 0);
  const [p2x, p2y] = pos(a2);
  let s = S.path(arc(cx, cy, R, 20, 160), { c: MUT, w: 1.4 }) + S.circle(cx, cy, 2.5, { c: 'currentColor', fill: 'currentColor' }) + S.text(cx + 5, cy + 14, 'O', { size: 10 });
  s += S.line(cx, cy, p1x, p1y, { c: MUT, w: 0.8, dash: '3 3' }) + S.line(cx, cy, p2x, p2y, { c: MUT, w: 0.8, dash: '3 3' });
  s += S.path(arc(cx, cy, 30, a1, a2), { c: ACC, w: 1.2 }) + S.text(cx - 2, cy - 34, 'Δθ', { a: 'middle', size: 10, c: ACC });
  const t1 = tang(a1);
  const t2 = tang(a2);
  s += S.circle(p1x, p1y, 3.5, { fill: 'currentColor' }) + S.circle(p2x, p2y, 3.5, { fill: 'currentColor' });
  s += S.arrow(p1x, p1y, p1x + k * v * t1[0], p1y - k * v * t1[1], { c: BLUE, w: 2, size: 7 }) + S.arrow(p2x, p2y, p2x + k * v * t2[0], p2y - k * v * t2[1], { c: GRN, w: 2, size: 7 });
  s += S.text(p1x - 6, p1y + 14, 'P₁', { a: 'end', size: 10 }) + S.text(p2x + 6, p2y + 14, 'P₂', { size: 10 });
  // right panel: v1, v2 from a common tail and Δv
  const ox = 372;
  const oy = 112;
  const kk = 18; // right panel: 18 px per m s⁻¹
  const v1 = [v * t1[0], v * t1[1]];
  const v2 = [v * t2[0], v * t2[1]];
  const dv = Vec.sub(v2, v1);
  const [e1x, e1y] = pt(ox, oy, kk, v1);
  const [e2x, e2y] = pt(ox, oy, kk, v2);
  s += S.arrow(ox, oy, e1x, e1y, { c: BLUE, w: 2.2, size: 7 }) + S.arrow(ox, oy, e2x, e2y, { c: GRN, w: 2.2, size: 7 });
  s += S.arrow(e1x, e1y, e2x, e2y, { c: RED, w: 2.6, size: 8 });
  s += S.text(ox + 8, oy + 46, 'common tail', { a: 'end', size: 10 }) + S.lead(ox - 12, oy + 38, ox - 1, oy + 4);
  s += S.text((ox + e1x) / 2, (oy + e1y) / 2 - 8, 'v₁', { a: 'middle', size: 11, c: BLUE, w: 'bold' }) + S.text((ox + e2x) / 2, (oy + e2y) / 2 + 18, 'v₂', { a: 'middle', size: 11, c: GRN, w: 'bold' });
  s += S.text(e1x - 8, oy + 4, 'Δv', { a: 'end', size: 11, c: RED, w: 'bold' });
  s += S.path(arc(ox, oy, 22, 180 - dth / 2, 180 + dth / 2), { c: ACC, w: 1.2 });
  s += S.text(w / 2, 175, 'v₁ and v₂ drawn from one point; Δv = v₂ − v₁ joins their tips.', { a: 'middle', size: 10 });
  s += S.lines(24, 192, [`|Δv| = 2v sin(Δθ/2) = 2 × ${v} × sin ${dth / 2}° = ${f2(Vec.mag(dv))} m s⁻¹`, `Δt = rΔθ/v, so |Δv|/Δt = ${f2(Math.sin(rad(dth / 2)) / rad(dth / 2))} × v²/r here, and exactly v²/r as Δθ → 0.`], { size: 10, dy: 13 });
  s += S.text(w / 2, h - 4, 'Scale: left arrows 14 px per m s⁻¹, right arrows 18 px per m s⁻¹.', { a: 'middle', size: 10 });
  // checks: |Δv| = 2 v sin(Δθ/2); Δv anti-parallel to the radius at the mid-angle (toward O); isosceles triangle apex angle Δθ
  const mid = a1 + dth / 2;
  const radial = [Math.cos(rad(mid)), Math.sin(rad(mid))];
  const okLen = near(Vec.mag(dv), 2 * v * Math.sin(rad(dth / 2)), 1e-9) && near(Math.hypot(e2x - e1x, e2y - e1y) / kk, Vec.mag(dv), 1e-9);
  const okDir = near(Vec.dot(dv, radial) / Vec.mag(dv), -1, 1e-9);
  const cosApex = Vec.dot(v1, v2) / (Vec.mag(v1) * Vec.mag(v2));
  check(okLen && okDir && near(deg(Math.acos(cosApex)), dth, 1e-9), `deltav: |v₁| = |v₂| = ${v}; angle between them = Δθ = ${dth}°; |Δv| = 2v sin(Δθ/2) = ${f2(Vec.mag(dv))} m s⁻¹ and Δv points exactly towards O from the mid-point of the arc`);
  return svgDoc(w, h, 'The change of velocity in uniform circular motion: the velocity vectors at two points of a circle separated by an angle are drawn from a common tail; their difference is a short vector across the tips that points towards the centre, with length twice v times sine of half the angle', s);
})();

export const ALL = { VADD, VSUB, SCALEV, RESOLVE, DOTCROSS, PROJ, HORIZ, CIRC, DELTAV };
