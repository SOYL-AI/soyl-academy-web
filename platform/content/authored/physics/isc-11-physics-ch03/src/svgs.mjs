// ISC 11 ch03 diagrams, all drawn from numbers with self-checks: position and displacement vectors, i-j-k axes in 3D,
// multiplication by a real number, the parallelogram and triangle laws, the derivation of R and α, the two diagonals
// (sum and difference), resolution into components, the dot product as work and the cross product (area and torque).
import { svgDoc, S, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { rad, deg, Vec, resultant2 } from './phys.mjs';

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

/** Pixel position of a physical 2D vector w from pixel origin (ox, oy): y is flipped; k is pixels per unit. */
const pt = (ox, oy, k, w) => [ox + k * w[0], oy - k * w[1]];
/** Screen angle (degrees, counter-clockwise from +x) of the pixel segment (x1, y1) to (x2, y2). */
const ang = (x1, y1, x2, y2) => deg(Math.atan2(-(y2 - y1), x2 - x1));
/** Small arc (as a path) of radius rr about (cx, cy) from screen-angle a1 to a2 (degrees, counter-clockwise positive). */
function arc(cx, cy, rr, a1, a2) {
  const p1 = [cx + rr * Math.cos(rad(a1)), cy - rr * Math.sin(rad(a1))];
  const p2 = [cx + rr * Math.cos(rad(a2)), cy - rr * Math.sin(rad(a2))];
  const sweep = a2 > a1 ? 0 : 1;
  return `M${f1(p1[0])} ${f1(p1[1])} A${f1(rr)} ${f1(rr)} 0 0 ${sweep} ${f1(p2[0])} ${f1(p2[1])}`;
}

// ---------------------------------------------------------------- POS: position and displacement vectors (36 px per metre)
export const POS_DATA = { P: [2, 1], Q: [6, 4], k: 36, ox: 36, oy: 196 };
export const POS = (() => {
  const { P, Q, k, ox, oy } = POS_DATA;
  const w = 420;
  const h = 226;
  const D = Vec.sub(Q, P);
  const [px, py] = pt(ox, oy, k, P);
  const [qx, qy] = pt(ox, oy, k, Q);
  let s = S.arrow(ox - 10, oy, ox + 8 * k, oy, { c: MUT, w: 1.2, size: 6 }) + S.arrow(ox, oy + 10, ox, oy - 5.2 * k, { c: MUT, w: 1.2, size: 6 });
  s += S.text(ox + 8 * k, oy + 14, 'x (m)', { a: 'end', size: 10 }) + S.text(ox + 8, oy - 5.2 * k + 6, 'y (m)', { size: 10 });
  for (let x = 1; x <= 7; x++) s += S.line(ox + x * k, oy - 3, ox + x * k, oy + 3, { c: MUT, w: 1 }) + S.text(ox + x * k, oy + 14, String(x), { a: 'middle', size: 10 });
  for (let y = 1; y <= 5; y++) s += S.line(ox - 3, oy - y * k, ox + 3, oy - y * k, { c: MUT, w: 1 }) + S.text(ox - 8, oy - y * k + 4, String(y), { a: 'end', size: 10 });
  s += S.arrow(ox, oy, px, py, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, qx, qy, { c: GRN, w: 2.4 }) + S.arrow(px, py, qx, qy, { c: RED, w: 2.8, size: 9 });
  s += S.circle(px, py, 3.5, { c: BLUE, fill: BLUE }) + S.circle(qx, qy, 3.5, { c: GRN, fill: GRN });
  s += S.text(px + 6, py + 16, 'P', { size: 11, w: 'bold' }) + S.text(qx + 6, qy - 6, 'Q', { size: 11, w: 'bold' }) + S.text(ox - 8, oy + 14, 'O', { a: 'end', size: 11, w: 'bold' });
  s += S.text((ox + px) / 2 + 2, (oy + py) / 2 + 16, 'r₁', { size: 11, w: 'bold', c: BLUE });
  s += S.text((ox + qx) / 2 - 6, (oy + qy) / 2 - 6, 'r₂', { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.text((px + qx) / 2 + 8, (py + qy) / 2 + 6, 'Δr', { size: 11, w: 'bold', c: RED });
  s += S.lines(ox + 7.6 * k - 6, 56, ['r₁ = (2, 1) m', 'r₂ = (6, 4) m', 'Δr = r₂ − r₁', '   = (4, 3) m', '|Δr| = 5 m'], { size: 10, dy: 14, a: 'start' });
  s += S.text(w / 2, h - 3, 'Position vectors start at the origin O; the displacement joins P to Q. Scale: 1 m = 36 px.', { a: 'middle', size: 10 });
  const okD = near((qx - px) / k, D[0], 1e-9) && near((py - qy) / k, D[1], 1e-9) && near(Math.hypot(qx - px, qy - py) / k, 5, 1e-9);
  const okS = near(Vec.mag(P), Math.hypot(1, 2), 1e-9) && near(ang(px, py, qx, qy), Vec.ang(D), 1e-9);
  check(okD && okS, `pos: P (2, 1) and Q (6, 4) at 36 px per metre; the drawn arrow P to Q = r₂ − r₁ = (${D.join(', ')}) m, length ${f1(Vec.mag(D))} m (3–4–5 triangle) at ${f1(Vec.ang(D))}° to the x-axis`);
  return svgDoc(w, h, 'Position vectors r one and r two drawn from the origin to the points P at 2, 1 and Q at 6, 4, and the displacement vector from P to Q, equal to r two minus r one, which is 4 metres along x and 3 metres along y, 5 metres long', s);
})();

// ---------------------------------------------------------------- AXES3D: i, j, k and A = 2 i + 3 j + 6 k (22 px per unit)
export const AXES3D_DATA = { A: [2, 3, 6], k: 22, ox: 150, oy: 190, sk: 0.42 };
export const AXES3D = (() => {
  const { A, k, ox, oy, sk } = AXES3D_DATA;
  const w = 420;
  const h = 250;
  // oblique projection: x points toward the viewer (down-left), y to the right, z up
  const P3 = ([x, y, z]) => [ox - sk * k * x + k * y, oy + sk * k * x - k * z];
  const O = P3([0, 0, 0]);
  const mag = Vec.mag(A);
  const lx = P3([3.6, 0, 0]);
  const ly = P3([0, 5.6, 0]);
  const lz = P3([0, 0, 7.6]);
  let s = S.arrow(...O, ...lx, { c: MUT, w: 1.2, size: 6 }) + S.arrow(...O, ...ly, { c: MUT, w: 1.2, size: 6 }) + S.arrow(...O, ...lz, { c: MUT, w: 1.2, size: 6 });
  s += S.text(lx[0] - 6, lx[1] + 4, 'x', { a: 'end', size: 11, w: 'bold' }) + S.text(ly[0] + 6, ly[1] + 4, 'y', { size: 11, w: 'bold' }) + S.text(lz[0] + 8, lz[1] + 6, 'z', { size: 11, w: 'bold' });
  // box edges (dashed)
  const c1 = P3([A[0], 0, 0]);
  const c2 = P3([A[0], A[1], 0]);
  const c3 = P3([0, A[1], 0]);
  const t0 = P3([0, 0, A[2]]);
  const t1 = P3([A[0], 0, A[2]]);
  const t3 = P3([0, A[1], A[2]]);
  const tip = P3(A);
  for (const [a, b] of [[c1, c2], [c3, c2], [c1, t1], [c2, tip], [c3, t3], [t0, t1], [t0, t3], [t1, tip], [t3, tip]]) s += S.line(a[0], a[1], b[0], b[1], { c: MUT, w: 1, dash: '4 3' });
  s += S.arrow(...O, ...tip, { c: RED, w: 2.8, size: 10 });
  // unit vectors at the origin (thick, one unit each)
  const ui = P3([1, 0, 0]);
  const uj = P3([0, 1, 0]);
  const uk = P3([0, 0, 1]);
  s += S.arrow(...O, ...ui, { c: BLUE, w: 2.6, size: 7 }) + S.arrow(...O, ...uj, { c: GRN, w: 2.6, size: 7 }) + S.arrow(...O, ...uk, { c: ACC, w: 2.6, size: 7 });
  s += S.text(ui[0] - 8, ui[1] + 12, 'î', { a: 'end', size: 12, w: 'bold', c: BLUE }) + S.text(uj[0] + 2, uj[1] + 14, 'ĵ', { a: 'middle', size: 12, w: 'bold', c: GRN }) + S.text(uk[0] - 7, uk[1] + 2, 'k̂', { a: 'end', size: 12, w: 'bold', c: ACC });
  s += S.text(tip[0] + 8, tip[1] - 4, 'A', { size: 12, w: 'bold', c: RED });
  s += S.circle(...O, 2.5, { fill: 'currentColor' }) + S.text(O[0] - 10, O[1] - 6, 'O', { a: 'end', size: 11, w: 'bold' });
  s += S.lines(274, 60, ['A = 2 î + 3 ĵ + 6 k̂', '|A| = √(2² + 3² + 6²)', '    = √49 = 7', 'Â = A/|A|', '  = (2î + 3ĵ + 6k̂)/7'], { size: 10, dy: 15 });
  s += S.text(w / 2, h - 4, 'Dashed box: edges 2, 3 and 6 along x, y and z. Unit vectors have length 1.', { a: 'middle', size: 10 });
  // the drawn tip must equal O + 2 e_x + 3 e_y + 6 e_z, with the unit vectors as drawn
  const ex = [ui[0] - O[0], ui[1] - O[1]];
  const ey = [uj[0] - O[0], uj[1] - O[1]];
  const ez = [uk[0] - O[0], uk[1] - O[1]];
  const okTip = near(tip[0] - O[0], 2 * ex[0] + 3 * ey[0] + 6 * ez[0], 1e-9) && near(tip[1] - O[1], 2 * ex[1] + 3 * ey[1] + 6 * ez[1], 1e-9);
  const okLen = near(Math.hypot(...ey), k, 1e-9) && near(Math.hypot(...ez), k, 1e-9) && near(Math.hypot(...ex), sk * k * Math.SQRT2, 1e-9);
  const okMag = mag === 7 && near(Math.sqrt(4 + 9 + 36), 7, 1e-12);
  check(okTip && okLen && okMag, `axes3d: A = 2 î + 3 ĵ + 6 k̂; drawn tip = 2 î + 3 ĵ + 6 k̂ in the projected unit vectors; |A| = ${mag} (2² + 3² + 6² = 49); î, ĵ, k̂ drawn one unit long (x foreshortened by the oblique projection)`);
  return svgDoc(w, h, 'Three-dimensional axes with unit vectors i-hat, j-hat and k-hat of length one along x, y and z, and a vector A equal to 2 i-hat plus 3 j-hat plus 6 k-hat inside a dashed box of edges 2, 3 and 6, of magnitude 7', s);
})();

// ---------------------------------------------------------------- SCALEV: multiplying a vector by a real number
export const SCALEV = (() => {
  const w = 420;
  const h = 242;
  const k = 36;
  const ox = 150;
  const oy = 130;
  const A = Vec.polar(3, 30);
  const cases = [[2, BLUE, '2A'], [1, 'currentColor', 'A'], [0.5, GRN, '½A'], [-1, RED, '−A']];
  let s = '';
  let ok = true;
  const lens = [];
  const al = Math.hypot(...A) * k;
  for (const [n, c, label] of cases) {
    const v = Vec.scale(A, n);
    const [x, y] = pt(ox, oy, k, v);
    s += S.arrow(ox, oy, x, y, { c, w: n === 1 ? 2.4 : 2, size: 8 });
    const dpx = [x - ox, oy - y];
    ok = ok && near(Math.hypot(...dpx), Math.abs(n) * al, 1e-9) && (n > 0 ? near(Math.atan2(dpx[1], dpx[0]), rad(30), 1e-9) : near(Math.atan2(-dpx[1], -dpx[0]), rad(30), 1e-9));
    lens.push(Vec.mag(v));
    if (n === 2) s += S.text(x - 4, y - 8, `${label}: 6 units`, { size: 11, c, a: 'end', w: 'bold' });
    else if (n === 1) s += S.text(x + 8, y + 14, `${label}: 3 units`, { size: 11, w: 'bold' });
    else if (n === 0.5) s += S.text(x + 6, y + 18, `${label}: 1.5 units`, { size: 11, c, w: 'bold' });
    else s += S.text(x - 4, y + 16, `${label}: 3 units, opposite`, { size: 11, c, a: 'start', w: 'bold' });
  }
  s += S.text(w / 2, h - 19, 'λA has magnitude |λ| A; it points along A if λ > 0 and opposite to A if λ < 0.', { a: 'middle', size: 10 }) + S.text(w / 2, h - 6, 'Scale: 1 unit = 36 px.', { a: 'middle', size: 10 });
  check(ok && near(lens[0], 6, 1e-9) && near(lens[2], 1.5, 1e-9) && near(lens[3], 3, 1e-9), 'scalev: 2A is 6 units, ½A 1.5 units, −A 3 units; angles checked (same direction for λ > 0, opposite for λ < 0)');
  return svgDoc(w, h, 'A vector A of 3 units drawn with 2A twice as long in the same direction, half of A in the same direction, and minus A of the same length pointing the opposite way', s);
})();

// ---------------------------------------------------------------- VADD: parallelogram and triangle laws (30 px per unit)
export const VADD_DATA = { A: 5, B: 4, theta: 60, k: 30, ox: 34, oy: 172 };
export const VADD = (() => {
  const { A, B, theta, k, ox, oy } = VADD_DATA;
  const w = 420;
  const h = 250;
  const rs = resultant2(A, B, theta);
  const va = [A, 0];
  const vb = Vec.polar(B, theta);
  const vr = Vec.add(va, vb);
  const P = (v) => pt(ox, oy, k, v);
  const [ax, ay] = P(va);
  const [bx, by] = P(vb);
  const [rx, ry] = P(vr);
  let s = S.line(ax, ay, rx, ry, { c: MUT, w: 1.2, dash: '5 4' }) + S.line(bx, by, rx, ry, { c: MUT, w: 1.2, dash: '5 4' });
  s += S.arrow(ox, oy, ax, ay, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, bx, by, { c: GRN, w: 2.4 }) + S.arrow(ox, oy, rx, ry, { c: RED, w: 2.8, size: 10 });
  s += S.text((ox + ax) / 2, oy + 16, `A = ${A}`, { a: 'middle', size: 11, w: 'bold', c: BLUE });
  s += S.text((ox + bx) / 2 - 8, (oy + by) / 2 - 2, `B = ${B}`, { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.text((ox + rx) / 2 - 6, (oy + ry) / 2 - 12, `R = ${f2(rs.R)}`, { a: 'end', size: 11, w: 'bold', c: RED });
  s += S.text((ax + rx) / 2 + 8, (ay + ry) / 2 + 4, 'B (copy)', { size: 10, c: GRN }) + S.text((bx + rx) / 2, by - 6, 'A (copy)', { a: 'middle', size: 10, c: BLUE });
  s += S.path(arc(ox, oy, 26, 0, theta), { c: ACC, w: 1.2 }) + S.text(ox + 40 * Math.cos(rad(46)) - 4, oy - 40 * Math.sin(rad(46)) + 4, 'θ', { size: 11, c: ACC });
  s += S.path(arc(ox, oy, 60, 0, rs.alpha), { c: RED, w: 1.2 }) + S.text(ox + 64, oy - 6, `α = ${f1(rs.alpha)}°`, { size: 10, c: RED });
  s += S.lines(rx + 26, 70, ['R² = A² + B²', '   + 2AB cos θ', `   = ${f1(rs.R ** 2)}`, `R = ${f2(rs.R)}`], { size: 10, dy: 14 });
  s += S.text(w / 2, h - 20, 'Tail to tail: R is the diagonal of the parallelogram. Tail to head: the dashed copy of B', { a: 'middle', size: 10 }) + S.text(w / 2, h - 7, 'starts at the tip of A and gives the same R. A = 5, B = 4, θ = 60°. Scale: 1 unit = 30 px.', { a: 'middle', size: 10 });
  const dpx = [rx - ox, oy - ry];
  const okVec = near(dpx[0] / k, vr[0], 1e-9) && near(dpx[1] / k, vr[1], 1e-9);
  const okLen = near(Math.hypot(...dpx) / k, rs.R, 1e-9) && near(rs.R, rs.Rc, 1e-9) && near(rs.R ** 2, 61, 1e-9);
  const okAng = near(ang(ox, oy, rx, ry), rs.alpha, 1e-9) && near(rs.alpha, rs.alphac, 1e-9);
  const okPar = near(rx - ax, bx - ox, 1e-9) && near(ry - ay, by - oy, 1e-9);
  check(okVec && okLen && okAng && okPar, `vadd: A = ${A}, B = ${B} at ${theta}°; drawn diagonal = A + B (${f2(rs.R)} units at ${f1(rs.alpha)}° to A); the dashed sides are parallel copies (parallelogram closes); R² = ${f1(rs.R ** 2)}`);
  return svgDoc(w, h, 'Two vectors A of magnitude 5 and B of magnitude 4 drawn from one point at 60 degrees; the resultant R is the diagonal of the parallelogram, about 7.81 units long and 26.3 degrees from A; the dashed copy of B placed at the tip of A shows the triangle law', s);
})();

// ---------------------------------------------------------------- DERIV: derivation of R and α (30 px per unit)
export const DERIV = (() => {
  const { A, B, theta, k } = VADD_DATA;
  const ox = 30;
  const oy = 176;
  const w = 420;
  const h = 244;
  const rs = resultant2(A, B, theta);
  const P = pt(ox, oy, k, [A, 0]);
  const N = pt(ox, oy, k, [A + B * Math.cos(rad(theta)), 0]);
  const R = pt(ox, oy, k, [A + B * Math.cos(rad(theta)), B * Math.sin(rad(theta))]);
  let s = S.line(P[0], P[1], N[0], N[1], { c: MUT, w: 1.2, dash: '5 4' }) + S.line(R[0], R[1], N[0], N[1], { c: MUT, w: 1.4, dash: '5 4' });
  s += S.arrow(ox, oy, P[0], P[1], { c: BLUE, w: 2.4 }) + S.arrow(P[0], P[1], R[0], R[1], { c: GRN, w: 2.4 }) + S.arrow(ox, oy, R[0], R[1], { c: RED, w: 2.8, size: 10 });
  s += S.path(`M${f1(N[0] - 9)} ${f1(N[1])} L${f1(N[0] - 9)} ${f1(N[1] - 9)} L${f1(N[0])} ${f1(N[1] - 9)}`, { c: MUT, w: 1 });
  s += S.text(ox - 4, oy + 14, 'O', { a: 'end', size: 11, w: 'bold' }) + S.text(P[0] - 2, P[1] + 15, 'P', { a: 'middle', size: 11, w: 'bold' }) + S.text(N[0] + 4, N[1] + 15, 'N', { size: 11, w: 'bold' }) + S.text(R[0] + 6, R[1] - 2, 'S', { size: 11, w: 'bold' });
  s += S.text((ox + P[0]) / 2, oy + 16, 'OP = A', { a: 'middle', size: 11, w: 'bold', c: BLUE });
  s += S.text((P[0] + R[0]) / 2 - 6, (P[1] + R[1]) / 2 - 4, 'PS = B', { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.text((ox + R[0]) / 2 - 8, (oy + R[1]) / 2 - 8, 'OS = R', { a: 'end', size: 11, w: 'bold', c: RED });
  s += S.text((P[0] + N[0]) / 2 + 6, oy + 30, 'PN = B cos θ', { a: 'middle', size: 10 });
  s += S.text(N[0] + 8, (N[1] + R[1]) / 2 + 4, 'SN = B sin θ', { size: 10 });
  s += S.path(arc(P[0], P[1], 22, 0, theta), { c: ACC, w: 1.2 }) + S.text(P[0] + 26, P[1] - 6, 'θ', { size: 11, c: ACC });
  s += S.path(arc(ox, oy, 54, 0, rs.alpha), { c: RED, w: 1.2 }) + S.text(ox + 58, oy - 6, 'α', { size: 11, c: RED });
  s += S.lines(30, 28, ['In the right-angled triangle ONS:', 'ON = A + B cos θ,  SN = B sin θ'], { size: 10, dy: 14 });
  s += S.text(w / 2, h - 3, 'A = 5, B = 4, θ = 60°: ON = 7, SN = 3.46, OS = √61 = 7.81. Scale: 1 unit = 30 px.', { a: 'middle', size: 10 });
  const on = (N[0] - ox) / k;
  const sn = (N[1] - R[1]) / k;
  const okG = near(on, A + B * Math.cos(rad(theta)), 1e-9) && near(sn, B * Math.sin(rad(theta)), 1e-9) && near(on, 7, 1e-9);
  const okR = near(Math.hypot(on, sn), rs.R, 1e-9) && near(Math.hypot(R[0] - ox, oy - R[1]) / k, rs.R, 1e-9);
  const okA = near(Math.atan2(sn, on), rad(rs.alpha), 1e-9) && near(Math.hypot(R[0] - P[0], R[1] - P[1]) / k, B, 1e-9) && near(ang(P[0], P[1], R[0], R[1]), theta, 1e-9);
  check(okG && okR && okA, `deriv: P at A = ${A}; S = P + B at ${theta}°; N on OP produced gives PN = B cos θ = ${f1(B * Math.cos(rad(theta)))}, SN = B sin θ = ${f2(sn)}; ON = ${on}, OS = √(ON² + SN²) = ${f2(rs.R)}; tan α = SN/ON = ${f2(sn / on)}, α = ${f1(rs.alpha)}°`);
  return svgDoc(w, h, 'Derivation of the resultant: OP is vector A, PS is vector B at angle theta to OP produced, and OS is the resultant R. A perpendicular SN from S to OP produced gives PN equal to B cos theta and SN equal to B sin theta; alpha is the angle of OS with OP', s);
})();

// ---------------------------------------------------------------- VSUB: the two diagonals (30 px per unit)
export const VSUB = (() => {
  const { A, B, theta, k } = VADD_DATA;
  const ox = 34;
  const oy = 176;
  const w = 420;
  const h = 250;
  const va = [A, 0];
  const vb = Vec.polar(B, theta);
  const sum = Vec.add(va, vb);
  const dv = Vec.sub(va, vb);
  const P = (v) => pt(ox, oy, k, v);
  const [ax, ay] = P(va);
  const [bx, by] = P(vb);
  const [rx, ry] = P(sum);
  let s = S.line(ax, ay, rx, ry, { c: MUT, w: 1.2, dash: '5 4' }) + S.line(bx, by, rx, ry, { c: MUT, w: 1.2, dash: '5 4' });
  s += S.arrow(ox, oy, ax, ay, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, bx, by, { c: GRN, w: 2.4 });
  s += S.arrow(ox, oy, rx, ry, { c: RED, w: 2.6, size: 10 }) + S.arrow(bx, by, ax, ay, { c: ACC, w: 2.6, size: 9 });
  s += S.text((ox + ax) / 2, oy + 16, 'A', { a: 'middle', size: 11, w: 'bold', c: BLUE }) + S.text((ox + bx) / 2 - 8, (oy + by) / 2, 'B', { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.text(ox + 0.8 * (rx - ox) - 4, oy + 0.8 * (ry - oy) - 10, 'A + B', { a: 'end', size: 11, w: 'bold', c: RED });
  s += S.text(bx + 0.2 * (ax - bx) + 12, by + 0.2 * (ay - by) + 2, 'A − B', { a: 'start', size: 11, w: 'bold', c: ACC });
  s += S.path(arc(ox, oy, 26, 0, theta), { c: MUT, w: 1.2 }) + S.text(ox + 40 * Math.cos(rad(46)) - 4, oy - 40 * Math.sin(rad(46)) + 4, 'θ', { size: 11 });
  s += S.lines(rx + 26, 100, ['|A + B|² = 61', '|A − B|² = 21', 'sum of squares', '= 82 = 2(A² + B²)'], { size: 10, dy: 14 });
  s += S.text(w / 2, h - 20, 'One diagonal of the parallelogram is A + B; the other, from the tip of B to the tip of A,', { a: 'middle', size: 10 }) + S.text(w / 2, h - 7, 'is A − B. A = 5, B = 4, θ = 60°. Scale: 1 unit = 30 px.', { a: 'middle', size: 10 });
  const d1 = [(rx - ox) / k, (oy - ry) / k];
  const d2 = [(ax - bx) / k, (by - ay) / k];
  const okS = near(d1[0], sum[0], 1e-9) && near(d1[1], sum[1], 1e-9);
  const okD = near(d2[0], dv[0], 1e-9) && near(d2[1], dv[1], 1e-9);
  const m1 = Vec.mag(d1) ** 2;
  const m2 = Vec.mag(d2) ** 2;
  const okM = near(m1, A * A + B * B + 2 * A * B * Math.cos(rad(theta)), 1e-9) && near(m2, A * A + B * B - 2 * A * B * Math.cos(rad(theta)), 1e-9) && near(m1, 61, 1e-9) && near(m2, 21, 1e-9) && near(m1 + m2, 2 * (A * A + B * B), 1e-9);
  check(okS && okD && okM, `vsub: diagonals drawn as A + B (|·|² = ${f1(m1)}) and A − B from the tip of B to the tip of A (|·|² = ${f1(m2)}); their squares add to 2(A² + B²) = ${f1(m1 + m2)}`);
  return svgDoc(w, h, 'A parallelogram on vectors A of 5 units and B of 4 units at 60 degrees: the long diagonal from the common tail is A plus B and the short diagonal from the tip of B to the tip of A is A minus B; their squared lengths are 61 and 21', s);
})();

// ---------------------------------------------------------------- RESOLVE: components of a force (11 px per newton)
export const RESOLVE_DATA = { Fx: 20, Fy: 15, k: 10 };
export const RESOLVE = (() => {
  const { Fx, Fy, k } = RESOLVE_DATA;
  const w = 420;
  const h = 236;
  const ox = 80;
  const oy = 196;
  const F = [Fx, Fy];
  const mag = Vec.mag(F);
  const th = Vec.ang(F);
  const [tx, ty] = pt(ox, oy, k, F);
  let s = S.arrow(ox - 14, oy, ox + Fx * k + 40, oy, { c: MUT, w: 1.2, size: 6 }) + S.arrow(ox, oy + 12, ox, oy - Fy * k - 26, { c: MUT, w: 1.2, size: 6 });
  s += S.text(ox + Fx * k + 40, oy + 14, 'x', { a: 'end', size: 10 }) + S.text(ox + 8, oy - Fy * k - 22, 'y', { size: 10 });
  s += S.line(tx, ty, tx, oy, { c: BLUE, w: 2, dash: '5 3' }) + S.line(ox, oy, tx, oy, { c: GRN, w: 2.4 }) + S.line(ox, ty, tx, ty, { c: MUT, w: 1, dash: '3 3' });
  s += S.arrow(ox, oy, ox, ty, { c: BLUE, w: 2.4, size: 6 });
  s += S.arrow(ox, oy, tx, ty, { c: RED, w: 2.8, size: 10 });
  s += S.text((ox + tx) / 2, oy + 16, `Fx = F cos θ = ${Fx} N`, { a: 'middle', size: 11, c: GRN, w: 'bold' }) + S.text(ox - 6, (oy + ty) / 2 + 4, `Fy = ${Fy} N`, { a: 'end', size: 11, c: BLUE, w: 'bold' });
  s += S.text((ox + tx) / 2 - 10, (oy + ty) / 2 - 10, `F = ${mag} N`, { a: 'end', size: 11, c: RED, w: 'bold' });
  s += S.path(arc(ox, oy, 38, 0, th), { c: ACC, w: 1.2 }) + S.text(ox + 42, oy - 6, `θ = ${f1(th)}°`, { size: 10, c: ACC });
  s += S.lines(tx + 36, 40, ['Fx = F cos θ', 'Fy = F sin θ', 'F² = Fx² + Fy²', `   = ${Fx * Fx} + ${Fy * Fy} = ${mag * mag}`, 'tan θ = Fy/Fx', `      = ${f2(Fy / Fx)}`], { size: 10, dy: 15 });
  s += S.text(w / 2, h - 3, 'Scale: 1 N = 10 px. A 3–4–5 triangle: Fx = 20 N, Fy = 15 N, F = 25 N.', { a: 'middle', size: 10 });
  const okC = near((tx - ox) / k, mag * Math.cos(rad(th)), 1e-9) && near((oy - ty) / k, mag * Math.sin(rad(th)), 1e-9) && near(mag, 25, 1e-9);
  const okP = near(Math.hypot(tx - ox, oy - ty) / k, 25, 1e-9) && near(Math.atan2(Fy, Fx), Math.atan(0.75), 1e-12);
  check(okC && okP && near(th, 36.87, 1e-4), `resolve: F = ${mag} N drawn with Fx = ${Fx} N and Fy = ${Fy} N (3–4–5 triangle), θ = ${f1(th)}°; components recovered from F cos θ and F sin θ; drawn length ${mag} N at 10 px per newton`);
  return svgDoc(w, h, 'A force F of 25 newtons at about 36.9 degrees above the x-axis resolved into a horizontal component of 20 newtons and a vertical component of 15 newtons, completing a rectangle, with the angle theta marked at the origin', s);
})();

// ---------------------------------------------------------------- DOT: work as a dot product
export const DOT_DATA = { F: [6, 8], s: [6, 0], k: 26, ox: 50, oy: 170 };
export const DOT = (() => {
  const { F, s: S6, k, ox, oy } = DOT_DATA;
  const w = 420;
  const h = 246;
  const dot = Vec.dot(F, S6);
  const mag = Vec.mag(F);
  const th = deg(Math.acos(dot / (mag * Vec.mag(S6))));
  const kF = 18; // pixels per newton for the force arrow
  const [sx] = pt(ox, oy, k, S6);
  const fx = ox + kF * F[0];
  const fy = oy - kF * F[1];
  let s = S.line(ox - 10, oy, sx + 40, oy, { c: MUT, w: 1.2 });
  s += S.rect(ox - 20, oy - 16, 40, 16, { fill: FILL, sw: 1.2 }) + S.text(ox - 24, oy - 22, 'trolley', { size: 10 });
  s += S.arrow(ox, oy + 32, sx, oy + 32, { c: BLUE, w: 2.4 }) + S.text((ox + sx) / 2, oy + 48, 's = 6 m (along the floor)', { a: 'middle', size: 10, c: BLUE, w: 'bold' });
  s += S.arrow(ox, oy, fx, fy, { c: RED, w: 2.6, size: 9 }) + S.text(fx + 6, fy + 4, 'F = 10 N', { size: 11, c: RED, w: 'bold' });
  s += S.line(fx, fy, fx, oy, { c: MUT, w: 1.2, dash: '4 3' });
  s += S.line(ox, oy - 5, fx, oy - 5, { c: GRN, w: 3.4 }) + S.text((ox + fx) / 2, oy + 15, 'F cos θ = 6 N', { a: 'middle', size: 10, c: GRN, w: 'bold' });
  s += S.path(arc(ox, oy, 30, 0, th), { c: ACC, w: 1.2 }) + S.text(ox + 36, oy - 18, 'θ', { size: 11, c: ACC });
  s += S.lines(246, 44, ['W = F·s = F s cos θ', '  = 10 × 6 × 0.6', '  = 36 J', 'W = (F cos θ) × s', 'only the part of F along s', 'does work'], { size: 10, dy: 15 });
  s += S.text(w / 2, h - 3, 'cos θ = 0.6 (θ ≈ 53.1°). The 8 N component at right angles to s does no work.', { a: 'middle', size: 10 });
  const okD = near((fx - ox) / kF, F[0], 1e-9) && near((oy - fy) / kF, F[1], 1e-9) && near(Math.hypot(fx - ox, oy - fy) / kF, 10, 1e-9);
  const okW = near(dot, 36, 1e-9) && near(mag * Vec.mag(S6) * Math.cos(rad(th)), 36, 1e-9) && near(((fx - ox) / kF) * ((sx - ox) / k), 36, 1e-9);
  check(okD && okW && near(th, 53.13, 1e-3), `dot: F = (6, 8) N of magnitude 10 N, s = 6 m along x; θ = ${f1(th)}°; drawn projection of F on s = ${(fx - ox) / kF} N; W = F·s = 6 × 6 + 8 × 0 = ${dot} J = F s cos θ`);
  return svgDoc(w, h, 'A trolley pulled along a floor by a force F of 10 newtons at about 53 degrees to the displacement s of 6 metres; the component of F along s is 6 newtons so the work done is 36 joules, and the 8 newton component at right angles does no work', s);
})();

// ---------------------------------------------------------------- CROSS: parallelogram area and torque
export const CROSS_DATA = { A: [5, 0], B: [2, 4], k: 17 };
export const CROSS = (() => {
  const { A, B, k } = CROSS_DATA;
  const w = 420;
  const h = 244;
  const cross = Vec.cross2(A, B);
  const th = deg(Math.acos(Vec.dot(A, B) / (Vec.mag(A) * Vec.mag(B))));
  let s = '';
  // left panel: parallelogram
  let ox = 18;
  const oy = 160;
  const [ax, ay] = pt(ox, oy, k, A);
  const [bx, by] = pt(ox, oy, k, B);
  const [cx, cy] = pt(ox, oy, k, Vec.add(A, B));
  s += S.path(`M${f1(ox)} ${f1(oy)} L${f1(ax)} ${f1(ay)} L${f1(cx)} ${f1(cy)} L${f1(bx)} ${f1(by)} Z`, { c: GRN, fill: GRN, fop: 0.16, w: 1 });
  s += S.line(bx, by, bx, oy, { c: MUT, w: 1.2, dash: '4 3' }) + S.text(bx + 4, (by + oy) / 2 + 4, 'height 4', { size: 10 });
  s += S.arrow(ox, oy, ax, ay, { c: BLUE, w: 2.4 }) + S.arrow(ox, oy, bx, by, { c: GRN, w: 2.4 });
  s += S.text(ax - 4, ay + 15, 'A = 5', { a: 'end', size: 11, w: 'bold', c: BLUE }) + S.text(bx - 6, by - 4, 'B', { size: 11, w: 'bold', c: GRN, a: 'end' });
  s += S.path(arc(ox, oy, 24, 0, th), { c: ACC, w: 1.2 }) + S.text(ox + 28, oy - 6, 'θ', { size: 11, c: ACC });
  s += S.circle(ox + 120, oy + 38, 8, { c: RED, sw: 1.6 }) + S.circle(ox + 120, oy + 38, 2, { c: RED, fill: RED }) + S.text(ox + 134, oy + 42, 'A × B out of page', { size: 10, c: RED });
  s += S.text(100, 22, 'Area of the parallelogram', { a: 'middle', size: 11, w: 'bold' });
  s += S.lines(ox, 40, ['|A × B| = A B sin θ', '= base × height = 5 × 4 = 20'], { size: 10, dy: 14 });
  const shoelace = (pts) => Math.abs(pts.reduce((sum, p, i) => sum + (p[0] * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * p[1]), 0)) / 2;
  const areaPx = shoelace([[ox, oy], [ax, ay], [cx, cy], [bx, by]]);
  const okArea = near(areaPx / (k * k), Math.abs(cross), 1e-9) && near(Vec.mag(A) * Vec.mag(B) * Math.sin(rad(th)), Math.abs(cross), 1e-9) && cross === 20;
  // right panel: torque of a force on a spanner (r = 0.4 m along x, F = 30 N at 30° to r)
  ox = 236;
  const kr = 150; // pixels per metre
  const kf = 2.6; // pixels per newton
  const r = [0.4, 0];
  const Fv = Vec.polar(30, 30);
  const [tx, ty] = pt(ox, oy, kr, r);
  const fx2 = tx + kf * Fv[0];
  const fy2 = ty - kf * Fv[1];
  s += S.circle(ox, oy, 7, { c: 'currentColor', sw: 1.6 }) + S.line(ox, oy, tx, ty, { c: 'currentColor', w: 5 });
  s += S.arrow(ox, oy + 16, tx, oy + 16, { c: BLUE, w: 2, size: 7 }) + S.text((ox + tx) / 2, oy + 30, 'r = 0.4 m', { a: 'middle', size: 10, c: BLUE, w: 'bold' });
  s += S.arrow(tx, ty, fx2, fy2, { c: RED, w: 2.6, size: 9 }) + S.text(fx2 + 4, fy2 + 4, 'F = 30 N', { size: 11, c: RED, w: 'bold' });
  s += S.line(tx, ty, fx2, ty, { c: MUT, w: 1, dash: '3 3' }) + S.path(arc(tx, ty, 28, 0, 30), { c: ACC, w: 1.2 }) + S.text(tx + 32, ty - 2, '30°', { size: 10, c: ACC });
  s += S.circle(ox, oy - 46, 8, { c: RED, sw: 1.6 }) + S.circle(ox, oy - 46, 2, { c: RED, fill: RED }) + S.text(ox + 14, oy - 42, 'τ = r × F: out of page', { size: 10, c: RED });
  s += S.text(300, 22, 'Torque on a spanner', { a: 'middle', size: 11, w: 'bold' });
  s += S.lines(ox - 20, 40, ['τ = r F sin θ', '  = 0.4 × 30 × 0.5 = 6 N m'], { size: 10, dy: 14 });
  const tau = Vec.cross2(r, Fv);
  const okTau = near(tau, 6, 1e-9) && near(Vec.cross2([(tx - ox) / kr, 0], [(fx2 - tx) / kf, (ty - fy2) / kf]), 6, 1e-9) && near(0.4 * 30 * Math.sin(rad(30)), 6, 1e-9) && tau > 0;
  s += S.text(w / 2, h - 4, 'Scales: left 1 unit = 17 px; right 1 m = 150 px, 1 N = 2.6 px. Anticlockwise gives +z.', { a: 'middle', size: 10 });
  check(okArea && okTau && near(th, 63.43, 1e-3), `cross: B = (2, 4) with A = (5, 0): parallelogram area from drawn points (shoelace) = ${Math.abs(cross)} = A_x B_y − A_y B_x = A B sin θ (θ = ${f1(th)}°); spanner r = 0.4 m, F = 30 N at 30°: τ = ${tau} N m from components and from r F sin θ; both products point out of the page (+z)`);
  return svgDoc(w, h, 'Left: the magnitude of the cross product of A, 5 units along x, and B, 4 units high at an angle, equals the area of the parallelogram on them, 20. Right: a force of 30 newtons at 30 degrees to a spanner of 0.4 metres gives a torque of 6 newton metres, directed out of the page', s);
})();

export const ALL = { POS, AXES3D, SCALEV, VADD, DERIV, VSUB, RESOLVE, DOT, CROSS };
