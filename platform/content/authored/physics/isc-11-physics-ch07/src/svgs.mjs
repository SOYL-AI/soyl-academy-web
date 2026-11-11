// ISC 11 ch07 diagrams, all drawn from numbers with self-checks: angular displacement and v = r omega, the velocity triangle for the
// centripetal acceleration, three examples of what supplies the centripetal force, a car on a level curve, a banked road with its force
// triangle, the raised outer rail of a railway track, and a ball on a string in a vertical circle (top and bottom).
import { svgDoc, S, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const d1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
const d2 = (n) => (Math.round(n * 100) / 100).toFixed(2);
const d3 = (n) => (Math.round(n * 1000) / 1000).toFixed(3);
const d0 = (n) => String(Math.round(n));
const mag = (v) => Math.hypot(v[0], v[1]);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
/** Point at math angle `a` degrees (anticlockwise, y up on screen) on a circle. */
const onC = (cx, cy, R, a) => [cx + R * Math.cos(rad(a)), cy - R * Math.sin(rad(a))];
/** Anticlockwise arc (as seen on screen) from math angle a1 to a2 degrees. */
const arc = (cx, cy, R, a1, a2, o = {}) => {
  const p1 = onC(cx, cy, R, a1);
  const p2 = onC(cx, cy, R, a2);
  return S.path(`M${f1(p1[0])} ${f1(p1[1])} A${R} ${R} 0 ${Math.abs(a2 - a1) > 180 ? 1 : 0} 0 ${f1(p2[0])} ${f1(p2[1])}`, { c: 'currentColor', w: 1.2, ...o });
};
const vec = (x, y, dx, dy, o = {}) => (mag([dx, dy]) < 1e-9 ? '' : S.arrow(x, y, x + dx, y + dy, { w: 2.2, size: 7, ...o }));
const pd = (pts) => `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')}`;

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- ANG: angular displacement, v = r omega
export const ANG_DATA = { r: 2.0, th: 0.9, t: 0.6, R: 90, kv: 20 };
ANG_DATA.s = ANG_DATA.r * ANG_DATA.th;
ANG_DATA.w = ANG_DATA.th / ANG_DATA.t;
ANG_DATA.v = ANG_DATA.r * ANG_DATA.w;
ANG_DATA.ac = ANG_DATA.w * ANG_DATA.w * ANG_DATA.r;
export const ANG = (() => {
  const { r, th, t, R, kv, s: arcLen, w: omega, v, ac } = ANG_DATA;
  const cx = 118;
  const cy = 134;
  const phi = deg(th);
  const A = onC(cx, cy, R, 0);
  const B = onC(cx, cy, R, phi);
  let s = S.circle(cx, cy, R, { c: MUT, w: 1, dash: '4 3' });
  s += S.line(cx, cy, A[0], A[1], { c: MUT, w: 1.3, dash: '5 3' });
  s += S.line(cx, cy, B[0], B[1], { w: 1.8 });
  s += arc(cx, cy, R, 0, phi, { c: ACC, w: 3.2 });
  s += arc(cx, cy, 34, 0, phi, { w: 1.3 });
  s += S.circle(cx, cy, 2.5, { fill: 'currentColor' });
  s += S.circle(A[0], A[1], 3.5, { fill: 'currentColor' }) + S.circle(B[0], B[1], 4.5, { c: BLUE, fill: BLUE });
  const vv = [-Math.sin(rad(phi)) * kv * v, -Math.cos(rad(phi)) * kv * v];
  s += vec(B[0], B[1], ...vv, { c: BLUE });
  s += S.text(cx - 9, cy + 15, 'O', { size: 11, w: 'bold' });
  s += S.text(A[0] + 8, A[1] + 4, 'A', { size: 11, w: 'bold' });
  s += S.text(B[0] + 8, B[1] - 6, 'B', { size: 11, w: 'bold' });
  s += S.text(cx + 40, cy - 8, 'θ', { size: 13, w: 'bold' });
  s += S.text(cx + 0.5 * R * Math.cos(rad(phi)) - 14, cy - 0.5 * R * Math.sin(rad(phi)) - 4, 'r', { size: 12, w: 'bold', it: true });
  s += S.text(A[0] - 6, A[1] - 52, `arc s`, { size: 11, c: ACC, w: 'bold' });
  s += S.text(B[0] + vv[0] - 4, B[1] + vv[1] - 6, 'v', { a: 'end', size: 12, c: BLUE, w: 'bold', it: true });
  s += S.lines(262, 40, ['Angular displacement θ (rad)', `r = ${d1(r)} m, θ = ${d1(th)} rad in t = ${d1(t)} s`], { size: 11, dy: 15, w: 'bold' });
  s += S.lines(262, 82, [`s = rθ = ${d1(r)} × ${d1(th)} = ${d1(arcLen)} m`, `ω = θ/t = ${d1(omega)} rad s⁻¹`, `v = rω = ${d1(v)} m s⁻¹ (tangent)`, `a = ω²r = ${d1(ac)} m s⁻² (to O)`], { size: 11, dy: 18 });
  s += S.lines(262, 172, ['v is perpendicular to the', 'radius OB. For θ = 1 rad,', 'the arc equals the radius.'], { size: 10, dy: 13, c: MUT });
  // checks
  const dA = Math.hypot(A[0] - cx, A[1] - cy);
  const dB = Math.hypot(B[0] - cx, B[1] - cy);
  const ang = Math.atan2(A[1] - cy, A[0] - cx) - Math.atan2(B[1] - cy, B[0] - cx);
  check(near(dA, R, 1e-9) && near(dB, R, 1e-9) && near(ang, th, 1e-9) && near(arcLen, r * th, 1e-12), `ang: A and B lie on the circle (radius ${R} px), angle AOB drawn ${d3(ang)} rad = θ; arc s = rθ = ${d1(arcLen)} m for r = ${d1(r)} m`);
  const rB = [B[0] - cx, B[1] - cy];
  check(Math.abs(dot(vv, rB)) / (mag(vv) * mag(rB)) < 1e-9 && cross([rB[0], -rB[1]], [vv[0], -vv[1]]) > 0 && near(mag(vv) / kv, omega * r, 1e-9), `ang: v drawn perpendicular to OB and anticlockwise (θ increasing); |v| = ${d1(mag(vv) / kv)} m/s = rω with ω = θ/t = ${d1(omega)} rad/s`);
  return svgDoc(430, 236, `A particle moves along a circle of radius ${d1(r)} metres from A to B, turning through an angle of ${d1(th)} radians in ${d1(t)} seconds. The arc AB is ${d1(arcLen)} metres, equal to r times theta. The angular speed is ${d1(omega)} radians per second and the velocity at B, ${d1(v)} metres per second, is perpendicular to the radius OB, along the tangent`, s);
})();

// ---------------------------------------------------------------- VTRI: velocity triangle for the centripetal acceleration
export const VTRI_DATA = { v: 5, dth: 50, k: 8, R: 80 };
VTRI_DATA.dv = 2 * VTRI_DATA.v * Math.sin(rad(VTRI_DATA.dth / 2));
export const VTRI = (() => {
  const { v, dth, k, R, dv } = VTRI_DATA;
  const cx = 105;
  const cy = 150;
  const a1 = 90 - dth / 2;
  const a2 = 90 + dth / 2;
  const P = onC(cx, cy, R, a1);
  const Q = onC(cx, cy, R, a2);
  const tan = (a) => [-Math.sin(rad(a)) * k * v, -Math.cos(rad(a)) * k * v]; // anticlockwise tangent, screen coordinates
  const v1 = tan(a1);
  const v2 = tan(a2);
  const dV = [v2[0] - v1[0], v2[1] - v1[1]];
  let s = S.circle(cx, cy, R, { c: MUT, w: 1, dash: '4 3' });
  s += S.line(cx, cy, P[0], P[1], { c: MUT, w: 1.2, dash: '5 3' }) + S.line(cx, cy, Q[0], Q[1], { c: MUT, w: 1.2, dash: '5 3' });
  s += S.line(P[0], P[1], Q[0], Q[1], { c: MUT, w: 1, dash: '2 3' });
  s += S.circle(cx, cy, 2.5, { fill: 'currentColor' });
  s += S.circle(P[0], P[1], 3.5, { fill: 'currentColor' }) + S.circle(Q[0], Q[1], 3.5, { fill: 'currentColor' });
  s += vec(P[0], P[1], ...v1, { c: BLUE }) + vec(Q[0], Q[1], ...v2, { c: BLUE });
  const M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
  s += vec(M[0], M[1], ...dV, { c: RED });
  s += arc(cx, cy, 26, a1, a2, {});
  s += S.text(cx + 22, cy - 20, 'Δθ', { size: 11, w: 'bold' });
  s += S.text(cx - 9, cy + 15, 'O', { size: 11, w: 'bold' });
  s += S.text(P[0] + 8, P[1] + 2, 'P', { size: 11, w: 'bold' });
  s += S.text(Q[0] - 14, Q[1] + 14, 'Q', { size: 11, w: 'bold' });
  s += S.text(P[0] + v1[0] * 0.5, P[1] + v1[1] - 8, 'v₁', { a: 'middle', size: 12, c: BLUE, w: 'bold', it: true });
  s += S.text(Q[0] + v2[0] - 2, Q[1] + v2[1] + 4, 'v₂', { a: 'end', size: 12, c: BLUE, w: 'bold', it: true });
  s += S.text(M[0] - 6, M[1] + dV[1] * 0.55, 'Δv', { a: 'end', size: 12, c: RED, w: 'bold', it: true });
  s += S.text(10, 16, 'Positions P and Q, speed v at both', { size: 11, w: 'bold' });
  s += S.text(10, 32, 'Δv points towards the centre O', { size: 10, c: RED, w: 'bold' });
  // triangle
  const T0 = [350, 120];
  const A = [T0[0] + v1[0], T0[1] + v1[1]];
  const B = [T0[0] + v2[0], T0[1] + v2[1]];
  s += vec(T0[0], T0[1], ...v1, { c: BLUE }) + vec(T0[0], T0[1], ...v2, { c: BLUE });
  s += vec(A[0], A[1], B[0] - A[0], B[1] - A[1], { c: RED });
  s += arc(T0[0], T0[1], 30, 180 - dth / 2, 180 + dth / 2, {});
  s += S.text(T0[0] - 6, T0[1] + 38 - 14, 'Δθ', { a: 'end', size: 11, w: 'bold' });
  s += S.text(A[0] - 6, A[1] - 8, 'v₁', { a: 'end', size: 12, c: BLUE, w: 'bold', it: true });
  s += S.text(B[0] - 6, B[1] + 14, 'v₂', { a: 'end', size: 12, c: BLUE, w: 'bold', it: true });
  s += S.text(A[0] - 26, (A[1] + B[1]) / 2 + 4, 'Δv', { a: 'end', size: 12, c: RED, w: 'bold', it: true });
  s += S.text(232, 16, 'Same vectors, tails together', { size: 11, w: 'bold' });
  s += S.lines(232, 190, [`|Δv| = 2v sin(Δθ/2) = ${d2(dv)} m s⁻¹`, `(v = ${v} m s⁻¹, Δθ = ${dth}°)`, 'Small Δθ: |Δv| ≈ vΔθ, along PO'], { size: 10, dy: 14 });
  // checks
  const isOnC = [P, Q].every((p) => near(Math.hypot(p[0] - cx, p[1] - cy), R, 1e-9));
  const angBetween = Math.acos(dot(v1, v2) / (mag(v1) * mag(v2)));
  check(isOnC && near(mag(v1), mag(v2), 1e-9) && near(mag(v1) / k, v, 1e-9) && near(deg(angBetween), dth, 1e-9), `vtri: P and Q on the circle, |v₁| = |v₂| = ${d1(mag(v1) / k)} m/s, the angle between v₁ and v₂ is ${d1(deg(angBetween))}° = Δθ (the angle POQ)`);
  const toO = [cx - M[0], cy - M[1]];
  check(Math.abs(cross(dV, toO)) / (mag(dV) * mag(toO)) < 1e-9 && dot(dV, toO) > 0 && near(mag(dV) / k, dv, 1e-9) && near(dv, 2 * v * Math.sin(rad(dth / 2)), 1e-12), `vtri: Δv = v₂ − v₁ points from the chord midpoint towards O, |Δv| = ${d2(mag(dV) / k)} m/s = 2v sin(Δθ/2)`);
  const closure = [A[0] + (B[0] - A[0]) - B[0], A[1] + (B[1] - A[1]) - B[1]];
  const closed = near(mag([T0[0] + v1[0] + dV[0] - B[0], T0[1] + v1[1] + dV[1] - B[1]]), 0, 1) || mag([T0[0] + v1[0] + dV[0] - B[0], T0[1] + v1[1] + dV[1] - B[1]]) < 1e-9;
  check(closed && mag(closure) < 1e-9, 'vtri: in the triangle v₁ + Δv = v₂ closes exactly');
  return svgDoc(430, 236, `Left, a particle moving anticlockwise on a circle with the same speed ${v} metres per second at points P and Q, with its velocity vectors v1 and v2 along the tangents, and the change of velocity delta v drawn at the middle of the chord pointing towards the centre O. Right, the same two velocity vectors drawn with their tails together; delta v joins their tips and the angle between them equals the angle POQ of ${dth} degrees`, s);
})();

// ---------------------------------------------------------------- WHO: what supplies the centripetal force
export const WHO = (() => {
  const w = 430;
  const h = 196;
  const ang = 40;
  const Rr = 48;
  const L = 34;
  let s = '';
  const rows = [];
  const names = [['Stone on a string', 'Tension T', 'of the string'], ['Coin on a turntable', 'Friction f', 'of the turntable'], ['Satellite in orbit', 'Gravity F', 'of the Earth']];
  names.forEach(([title, what, who], i) => {
    const cx = 72 + i * 143;
    const cy = 98;
    const B = onC(cx, cy, Rr, ang);
    const inward = [(cx - B[0]) / Rr, (cy - B[1]) / Rr];
    s += S.text(cx, 18, title, { a: 'middle', size: 11, w: 'bold' });
    s += S.circle(cx, cy, Rr, { c: MUT, w: 1, dash: '4 3' });
    if (i === 0) s += S.line(cx, cy, B[0], B[1], { c: MUT, w: 1.3 }) + S.circle(cx, cy, 3, { fill: 'currentColor' });
    if (i === 1) s += S.circle(cx, cy, 66,{ c: 'currentColor', fill: FILL, fop: 0.5, w: 1.3 }) + S.circle(cx, cy, 2.5, { fill: 'currentColor' });
    if (i === 2) s += S.circle(cx, cy, 13, { c: BLUE, fill: BLUE, fop: 0.3, w: 1.3 });
    const rr = i === 2 ? 6 : 5;
    s += S.circle(B[0], B[1], rr, { c: i === 2 ? 'currentColor' : BLUE, fill: i === 2 ? 'currentColor' : BLUE, fop: i === 2 ? 0.6 : 0.4 });
    const fv = [inward[0] * L, inward[1] * L];
    s += vec(B[0], B[1], ...fv, { c: RED });
    const vv = [-Math.sin(rad(ang)) * 30, -Math.cos(rad(ang)) * 30];
    s += S.arrow(B[0], B[1], B[0] + vv[0], B[1] + vv[1], { c: MUT, w: 1.3, size: 5 });
    s += S.text(B[0] + vv[0] - 3, B[1] + vv[1] - 4, 'v', { a: 'end', size: 10, c: MUT, it: true });
    s += S.text(B[0] + fv[0] * 0.55 + 10, B[1] + fv[1] * 0.55 + 14, i === 0 ? 'T' : i === 1 ? 'f' : 'F', { size: 11, c: RED, w: 'bold', it: true });
    s += S.text(cx, 174, `${what} ${who}`, { a: 'middle', size: 10, c: RED, w: 'bold' });
    rows.push({ B, fv, vv, c: [cx, cy], inward });
  });
  s += S.text(w / 2, 190, 'In each case the force towards the centre is the centripetal force.', { a: 'middle', size: 10 });
  const ok = rows.every((q) => Math.abs(cross(q.fv, q.inward)) < 1e-9 && dot(q.fv, q.inward) > 0 && near(mag(q.fv), L, 1e-9) && Math.abs(dot(q.vv, q.inward)) < 1e-9);
  check(ok, `who: in all three panels the force arrow (${L} px) points along the line from the body to the centre and the velocity arrow is perpendicular to it`);
  return svgDoc(w, h, 'Three examples of centripetal force. A stone whirled on a string: the tension of the string points to the centre. A coin riding on a turntable: friction from the turntable points to the centre. A satellite in orbit: the pull of gravity from the Earth points to the centre. In each case the velocity is along the tangent, perpendicular to the force', s);
})();

// ---------------------------------------------------------------- LEVEL: a car on a level curve
export const LEVEL_DATA = { m: 1200, r: 60, mu: 0.6, k: 0.0062 };
LEVEL_DATA.W = LEVEL_DATA.m * g;
LEVEL_DATA.f = LEVEL_DATA.mu * LEVEL_DATA.W;
LEVEL_DATA.v = Math.sqrt(LEVEL_DATA.mu * LEVEL_DATA.r * g);
export const LEVEL = (() => {
  const { m, r, mu, k, W, f, v } = LEVEL_DATA;
  const gy = 176;
  let s = S.text(14, 16, 'Car on a level curve: friction supplies the centripetal force', { size: 11, w: 'bold' });
  s += S.text(14, 31, `m = ${m} kg, r = ${r} m, μ = ${d2(mu)}. At the limit f = μN = mv²/r.`, { size: 10 });
  s += S.line(14, gy, 416, gy, { w: 2 });
  s += S.rect(150, 118, 112, 40, { c: BLUE, fill: BLUE, fop: 0.2, rx: 6 });
  s += S.circle(176, gy - 10, 10, { c: 'currentColor', fill: FILL, fop: 0.8 }) + S.circle(236, gy - 10, 10, { c: 'currentColor', fill: FILL, fop: 0.8 });
  const C = [206, 138];
  s += S.circle(C[0], C[1], 3, { fill: 'currentColor' });
  const Nv = [0, -k * W];
  const Wv = [0, k * W];
  const fv = [-k * f, 0];
  s += vec(C[0], C[1], ...Nv, { c: GRN }) + vec(C[0], C[1], ...Wv, { c: RED }) + vec(C[0], C[1], ...fv, { c: ACC });
  s += S.text(C[0] + 9, C[1] + Nv[1] + 12, `N = mg = ${d0(W)} N`, { size: 10, c: GRN, w: 'bold' });
  s += S.text(C[0] + 9, C[1] + Wv[1] - 2, `W = mg = ${d0(W)} N`, { size: 10, c: RED, w: 'bold' });
  s += S.text(146, C[1] + 4, `f = ${d0(f)} N`, { a: 'end', size: 10, c: ACC, w: 'bold' });
  s += S.arrow(150, 76, 20, 76, { c: MUT, w: 1.3, size: 6 });
  s += S.text(22, 70, 'towards the centre of the curve', { size: 10, c: MUT });
  s += S.text(416, 228,`v_max = √(μrg) = ${d1(v)} m s⁻¹`, { a: 'end', size: 11, w: 'bold' });
  check(near(-Nv[1], Wv[1], 1e-12) && near(f, mu * W, 1e-12) && near(f, (m * v * v) / r, 1e-9) && near(-fv[0] / -Nv[1], mu, 1e-9), `level: N = mg = ${d0(W)} N drawn equal to W; f = μN = ${d0(f)} N and also = mv²/r with v = ${d2(v)} m/s (drawn ratio f/N = ${d2(-fv[0] / -Nv[1])})`);
  return svgDoc(430, 234, `A car of ${m} kilograms taking a level curve of radius ${r} metres. Drawn from its centre: the normal reaction ${d0(W)} newtons up, the weight ${d0(W)} newtons down, and the friction ${d0(f)} newtons horizontally towards the centre of the curve, which is the centripetal force. At the limit, v squared over r equals mu g and the greatest speed is ${d1(v)} metres per second`, s);
})();

// ---------------------------------------------------------------- BANK: banked road cross-section and force triangle
export const BANK_DATA = { m: 800, v: 20, r: 100, k: 0.0085, L: 230 };
BANK_DATA.th = deg(Math.atan((BANK_DATA.v * BANK_DATA.v) / (BANK_DATA.r * g)));
BANK_DATA.W = BANK_DATA.m * g;
BANK_DATA.N = BANK_DATA.W / Math.cos(rad(BANK_DATA.th));
BANK_DATA.Fc = (BANK_DATA.m * BANK_DATA.v * BANK_DATA.v) / BANK_DATA.r;
export const BANK = (() => {
  const { m, v, r, k, L, th, W, N, Fc } = BANK_DATA;
  const t = rad(th);
  const A = [18, 212];
  const Bp = [A[0] + L * Math.cos(t), A[1] - L * Math.sin(t)];
  let s = S.text(14, 16, 'Banked road: the horizontal part of N is the centripetal force', { size: 11, w: 'bold' });
  s += S.path(`M${f1(A[0])} ${f1(A[1])} L${f1(Bp[0])} ${f1(Bp[1])} L${f1(Bp[0])} ${A[1]} Z`, { c: 'currentColor', fill: FILL, fop: 0.5, w: 1.5 });
  s += arc(A[0], A[1], 60, 0, th, {});
  s += S.text(A[0] + 56, A[1] + 17, `θ = ${d1(th)}°`, { size: 11, w: 'bold' });
  const u = [Math.cos(t), -Math.sin(t)]; // up the road, screen coordinates
  const nrm = [-Math.sin(t), -Math.cos(t)]; // out of the road
  const base = [A[0] + 125 * u[0], A[1] + 125 * u[1]];
  const corner = (a, b) => [base[0] + a * u[0] + b * nrm[0], base[1] + a * u[1] + b * nrm[1]];
  const pts = [corner(-30, 0), corner(30, 0), corner(30, 30), corner(-30, 30)];
  s += S.path(`${pd(pts)} Z`, { c: BLUE, fill: BLUE, fop: 0.25 });
  const C = corner(0, 15);
  s += S.circle(C[0], C[1], 3, { fill: 'currentColor' });
  const Wv = [0, k * W];
  const Nv = [k * N * nrm[0], k * N * nrm[1]];
  const Fv = [-k * Fc, 0];
  s += vec(C[0], C[1], ...Wv, { c: RED }) + vec(C[0], C[1], ...Nv, { c: GRN }) + vec(C[0], C[1], ...Fv, { c: 'currentColor', dash: '5 3', w: 1.8 });
  s += S.text(C[0] + 8, C[1] + Wv[1] * 0.75, `W = mg`, { size: 10, c: RED, w: 'bold' });
  s += S.text(C[0] + Nv[0] - 6, C[1] + Nv[1] + 2, 'N', { a: 'end', size: 12, c: GRN, w: 'bold', it: true });
  s += S.text(C[0] + Fv[0] - 4, C[1] + Fv[1] + 14, 'mv²/r', { a: 'end', size: 10, w: 'bold' });
  s += S.arrow(120, 238, 60, 238, { c: MUT, w: 1.3, size: 6 });
  s += S.text(124, 242, 'centre of the curve', { size: 10, c: MUT });
  // force triangle
  const k2 = 0.0155;
  const S0 = [398, 52];
  const P1 = [S0[0], S0[1] + k2 * W];
  const Nt = [k2 * N * nrm[0], k2 * N * nrm[1]];
  const P2 = [P1[0] + Nt[0], P1[1] + Nt[1]];
  s += vec(S0[0], S0[1], 0, k2 * W, { c: RED });
  s += vec(P1[0], P1[1], Nt[0], Nt[1], { c: GRN });
  // resultant W + N, drawn from the tail of W to the head of N: horizontal, towards the centre (screen left)
  s += vec(S0[0], S0[1], P2[0] - S0[0], P2[1] - S0[1], { c: 'currentColor', dash: '5 3', w: 1.8 });
  s += arc(P1[0], P1[1], 30, 90, 90 + th, {});
  s += S.text(P1[0] - 14, P1[1] - 16, 'θ', { a: 'end', size: 11, w: 'bold' });
  s += S.text(S0[0] + 5, (S0[1] + P1[1]) / 2, 'W', { size: 11, c: RED, w: 'bold', it: true });
  s += S.text((P1[0] + P2[0]) / 2 - 8, (P1[1] + P2[1]) / 2 + 4, 'N', { a: 'end', size: 12, c: GRN, w: 'bold', it: true });
  s += S.text((S0[0] + P2[0]) / 2, S0[1] - 7, 'mv²/r', { a: 'middle', size: 10, w: 'bold' });
  s += S.text(14, 31, `m = ${m} kg, v = ${v} m s⁻¹, r = ${r} m: tan θ = ${d3(Math.tan(t))}, θ = ${d1(th)}°, N = ${d0(N)} N`, { size: 10 });
  s += S.lines(246, 196, ['N cos θ = mg', 'N sin θ = mv²/r', 'tan θ = v²/(rg)'], { size: 11, dy: 16, w: 'bold' });
  // checks
  const roadAng = Math.atan2(A[1] - Bp[1], Bp[0] - A[0]);
  check(near(roadAng, t, 1e-9) && near(Math.tan(t), (v * v) / (r * g), 1e-9) && Math.abs(dot(Nv, u)) / mag(Nv) < 1e-9, `bank: road drawn at ${d1(deg(roadAng))}° with tan θ = ${d3(Math.tan(t))} = v²/(rg); N drawn perpendicular to the road`);
  const lowOnRoad = [pts[0], pts[1]].every((p) => Math.abs(cross([p[0] - A[0], p[1] - A[1]], u)) < 1e-9);
  check(lowOnRoad && near(-Nv[1], k * W, 1e-9) && near(-Nv[0], k * Fc, 1e-9) && near(Fc, m * v * v / r, 1e-12), `bank: the car rests on the road; N cos θ = ${d0(-Nv[1] / k)} N = mg and N sin θ = ${d0(-Nv[0] / k)} N = mv²/r = ${d0(Fc)} N`);
  const closed = mag([P2[0] - S0[0], P2[1] - S0[1]]) / k2;
  const angTri = Math.atan2(Math.abs(P2[0] - P1[0]), Math.abs(P2[1] - P1[1]));
  check(near(closed, Fc, 1e-9) && near(angTri, t, 1e-9) && near(Fc / W, Math.tan(t), 1e-9) && Math.abs(P2[1] - S0[1]) < 1e-9 && P2[0] - S0[0] < 0, `bank: resultant W + N drawn from the tail of W to the head of N, pointing towards the centre (left); triangle on a horizontal side of ${d0(closed)} N; the angle between N and the vertical is ${d1(deg(angTri))}° and (mv²/r)/(mg) = tan θ = ${d3(Fc / W)}`);
  return svgDoc(430, 250, `Left, a ${m} kilogram car on a road banked at ${d1(th)} degrees, with the weight straight down, the normal reaction perpendicular to the road tilted towards the centre of the curve, and a dashed horizontal arrow for the net force m v squared over r. Right, the force triangle: weight, normal reaction and their horizontal resultant, with N cos theta equal to m g and N sin theta equal to m v squared over r, so tan theta is v squared over r g`, s);
})();

// ---------------------------------------------------------------- RAIL: raised outer rail
export const RAIL_DATA = { l: 1.676, v: 20, r: 500, Lpx: 300 };
RAIL_DATA.th = deg(Math.atan((RAIL_DATA.v * RAIL_DATA.v) / (RAIL_DATA.r * g)));
RAIL_DATA.h = RAIL_DATA.l * Math.sin(rad(RAIL_DATA.th));
export const RAIL = (() => {
  const { l, v, r, Lpx, th, h } = RAIL_DATA;
  const t = rad(th);
  const A = [36, 92];
  const Bp = [A[0] + Lpx * Math.cos(t), A[1] - Lpx * Math.sin(t)];
  const u = [Math.cos(t), -Math.sin(t)];
  const nrm = [-Math.sin(t), -Math.cos(t)];
  let s = S.text(14, 16, 'Banking a railway track: the outer rail is raised', { size: 11, w: 'bold' });
  s += S.line(A[0], A[1], Bp[0], Bp[1], { w: 3 });
  const rail = (P) => {
    const q = [[-8, 0], [8, 0], [8, 16], [-8, 16]].map(([a, b]) => [P[0] + a * u[0] + b * nrm[0], P[1] + a * u[1] + b * nrm[1]]);
    return S.path(`${pd(q)} Z`, { c: BLUE, fill: BLUE, fop: 0.35, w: 1.4 });
  };
  s += rail(A) + rail(Bp);
  s += S.line(A[0], A[1], Bp[0] + 20, A[1], { c: MUT, w: 1, dash: '5 3' });
  s += S.line(Bp[0] + 14, A[1], Bp[0] + 14, Bp[1], { c: ACC, w: 1.5 });
  s += S.line(Bp[0] + 10, Bp[1], Bp[0] + 18, Bp[1], { c: ACC, w: 1.5 }) + S.line(Bp[0] + 10, A[1], Bp[0] + 18, A[1], { c: ACC, w: 1.5 });
  s += S.text(Bp[0] + 22, (A[1] + Bp[1]) / 2 + 4, `h = ${d3(h)} m`, { size: 10, c: ACC, w: 'bold' });
  s += arc(A[0], A[1], 100, 0, th, {});
  s += S.text(A[0] + 108, A[1] + 14, 'θ', { size: 12, w: 'bold' });
  s += S.text(A[0], A[1] + 38, 'inner rail', { a: 'middle', size: 10 });
  s += S.text(Bp[0], A[1] + 38, 'outer rail', { a: 'middle', size: 10 });
  s += S.text((A[0] + Bp[0]) / 2, A[1] + 30, `gauge l = ${l} m (along the sleeper)`, { a: 'middle', size: 10, c: MUT });
  s += S.arrow(130, 52, 70, 52, { c: MUT, w: 1.3, size: 6 });
  s += S.text(134, 56, 'centre of the curve', { size: 10, c: MUT });
  s += S.lines(14, 150, [`v = ${v} m s⁻¹, r = ${r} m: tan θ = v²/(rg) = ${d3(Math.tan(t))}, θ = ${d2(th)}°`, `h = l sin θ = ${d3(h)} m = ${d0(h * 1000)} mm; l tan θ = l v²/(rg) = ${d3(l * (v * v) / (r * g))} m (drawn to scale)`], { size: 10, dy: 14 });
  const hpx = A[1] - Bp[1];
  check(near(hpx, Lpx * Math.sin(t), 1e-9) && near(hpx / Lpx, Math.sin(t), 1e-9) && near(h, l * Math.sin(t), 1e-12), `rail: sleeper ${Lpx} px for gauge ${l} m; outer rail ${d1(hpx)} px higher = ${Lpx} sin θ, so h/l = sin θ = ${d3(hpx / Lpx)} and h = ${d3(h)} m`);
  check(near(Math.tan(t), (v * v) / (r * g), 1e-12) && near(deg(Math.atan2(A[1] - Bp[1], Bp[0] - A[0])), th, 1e-9) && near(h, l * (v * v) / (r * g), 0.01), `rail: θ = ${d2(th)}° from tan θ = v²/(rg) = ${d3(Math.tan(t))}; the approximation h ≈ l v²/(rg) = ${d3(l * (v * v) / (r * g))} m agrees with l sin θ within 1 %`);
  return svgDoc(430, 182, `Cross-section of a curved railway track, drawn to scale. The outer rail on the right is raised by ${d3(h)} metres above the inner rail on the left, over a gauge of ${l} metres measured along the sleeper, so the track is banked at ${d2(th)} degrees, which is the angle for a speed of ${v} metres per second on a curve of radius ${r} metres`, s);
})();

// ---------------------------------------------------------------- VERT: ball on a string in a vertical circle
export const VERT_DATA = { m: 0.5, r: 0.9, k: 2.4, kv: 12, R: 80 };
VERT_DATA.W = VERT_DATA.m * g;
VERT_DATA.vTop = Math.sqrt(g * VERT_DATA.r);
VERT_DATA.vBot = Math.sqrt(5 * g * VERT_DATA.r);
VERT_DATA.Tbot = (VERT_DATA.m * VERT_DATA.vBot ** 2) / VERT_DATA.r + VERT_DATA.W;
export const VERT = (() => {
  const { m, r, k, kv, R, W, vTop, vBot, Tbot } = VERT_DATA;
  const cx = 115;
  const cy = 132;
  const top = [cx, cy - R];
  const bot = [cx, cy + R];
  let s = S.text(14, 16, `Ball on a string: m = ${d1(m)} kg, r = ${d1(r)} m, mg = ${d1(W)} N`, { size: 11, w: 'bold' });
  s += S.circle(cx, cy, R, { c: MUT, w: 1, dash: '4 3' });
  s += S.line(cx, cy, top[0], top[1], { c: MUT, w: 1.3 }) + S.line(cx, cy, bot[0], bot[1], { c: MUT, w: 1.3 });
  s += S.circle(cx, cy, 3, { fill: 'currentColor' });
  s += S.circle(top[0], top[1], 6, { c: BLUE, fill: BLUE, fop: 0.4 }) + S.circle(bot[0], bot[1], 6, { c: BLUE, fill: BLUE, fop: 0.4 });
  const Wv = [0, k * W];
  s += vec(top[0], top[1], ...Wv, { c: RED }) + vec(bot[0], bot[1], ...Wv, { c: RED });
  const Tv = [0, -k * Tbot];
  s += vec(bot[0], bot[1], ...Tv, { c: ACC });
  const vt = [-kv * vTop, 0];
  const vb = [kv * vBot, 0];
  s += S.arrow(top[0], top[1] - 12, top[0] + vt[0], top[1] - 12, { c: BLUE, w: 2, size: 6 });
  s += S.arrow(bot[0], bot[1] + 20, bot[0] + vb[0], bot[1] + 20, { c: BLUE, w: 2, size: 6 });
  s += S.text(top[0] + vt[0] - 4, top[1] - 8, `v = ${d2(vTop)} m s⁻¹`, { a: 'end', size: 10, c: BLUE, w: 'bold' });
  s += S.text(top[0] + 8, top[1] + Wv[1] + 2, 'mg', { size: 11, c: RED, w: 'bold' });
  s += S.text(top[0] + 10, top[1] + 38, 'T = 0', { size: 10, c: ACC, w: 'bold' });
  s += S.text(bot[0] - 7, bot[1] + Tv[1] * 0.55, `T = ${d1(Tbot)} N`, { a: 'end', size: 10, c: ACC, w: 'bold' });
  s += S.text(bot[0] - 8, bot[1] + Wv[1] + 2, 'mg', { a: 'end', size: 11, c: RED, w: 'bold' });
  s += S.text(bot[0] + vb[0] + 4, bot[1] + 24,`v = ${d2(vBot)} m s⁻¹`, { size: 10, c: BLUE, w: 'bold' });
  s += S.lines(248, 56, ['Top, least speed:', 'mg = mv²/r, T = 0', `v = √(gr) = ${d2(vTop)} m s⁻¹`], { size: 11, dy: 16, w: 'bold' });
  s += S.lines(248, 124, ['Bottom, to reach that top:', `v² = gr + 4gr, v = √(5gr)`, `= ${d2(vBot)} m s⁻¹`, 'T − mg = mv²/r', `T = 6mg = ${d1(Tbot)} N`], { size: 11, dy: 16, w: 'bold' });
  // checks
  check(near(m * vTop * vTop / r, W, 1e-12) && near(vBot * vBot, vTop * vTop + 4 * g * r, 1e-12) && near(vBot, Math.sqrt(5) * vTop, 1e-12), `vert: at the top mv²/r = ${d2(m * vTop * vTop / r)} N = mg (T = 0), v_top = √(gr) = ${d2(vTop)} m/s; v_bottom² = v_top² + 4gr, v_bottom = √5 × v_top = ${d2(vBot)} m/s`);
  const net = (-Tv[1] - Wv[1]) / k;
  check(near(Tbot, 6 * W, 1e-12) && near(net, m * vBot * vBot / r, 1e-9) && near(-Tv[1] / Wv[1], 6, 1e-12), `vert: bottom T = ${d1(-Tv[1] / k)} N = 6 × ${d1(W)} N drawn 6 times as long as W; T − mg = ${d1(net)} N = mv²/r`);
  return svgDoc(430, 250, `A ${d1(m)} kilogram ball on a string of ${d1(r)} metres whirled in a vertical circle with the least possible speeds. At the top the speed is ${d2(vTop)} metres per second, the tension is zero and the weight of ${d1(W)} newtons alone supplies the centripetal force. At the bottom the speed is ${d2(vBot)} metres per second and the tension is ${d1(Tbot)} newtons, six times the weight, pointing up towards the centre`, s);
})();

export const ALL = { ANG, VTRI, WHO, LEVEL, BANK, RAIL, VERT };
