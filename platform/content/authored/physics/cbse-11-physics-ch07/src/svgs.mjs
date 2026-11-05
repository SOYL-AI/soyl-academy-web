// ch07 diagrams, all drawn from numbers with self-checks: Kepler's law of areas on an ellipse, three masses and the force on one
// of them, g above and below the surface of the Earth, Newton's cannon (launch speeds from computed orbits) and a circular orbit.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { GMg, RE, g, orbit2d, pull } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const f2 = (n) => (Math.round(n * 100) / 100).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const shoelace = (pts) => Math.abs(pts.reduce((s, [x, y], i) => s + (x * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * y), 0)) / 2;

// ---------------------------------------------------------------- KEPLER: equal areas in equal times (e = 0.7)
export const KEPLER_DATA = { a: 150, e: 0.7, dM: 0.5 };
export const KEPLER = (() => {
  const { a, e, dM } = KEPLER_DATA;
  const b = a * Math.sqrt(1 - e * e);
  const c = a * e;
  const w = 420;
  const h = 285;
  const cx = 165;
  const cy = 135;
  const solveE = (M) => {
    let E = M;
    for (let i = 0; i < 60; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    return E;
  };
  // positions relative to the focus (the Sun) at the origin, perihelion on +x; screen y is flipped
  const pos = (M) => {
    const E = solveE(M);
    return [a * Math.cos(E) - c, b * Math.sin(E)];
  };
  const scr = ([x, y]) => [cx + c + x, cy - y];
  let s = '';
  let d = '';
  for (let k = 0; k <= 120; k++) {
    const E = (2 * Math.PI * k) / 120;
    const [px, py] = scr([a * Math.cos(E) - c, b * Math.sin(E)]);
    d += `${k ? ' L' : 'M'}${f1(px)} ${f1(py)}`;
  }
  s += S.path(d + ' Z', { w: 1.6 });
  const wedge = (M0, col) => {
    const pts = [[0, 0]];
    for (let k = 0; k <= 40; k++) pts.push(pos(M0 - dM / 2 + (dM * k) / 40));
    s += S.path('M' + pts.map((p) => scr(p).map(f1).join(' ')).join(' L') + ' Z', { c: col, fill: col, fop: 0.3, w: 1 });
    return shoelace(pts);
  };
  const A1 = wedge(0, BLUE);
  const A2 = wedge(Math.PI, RED);
  const [sx, sy] = scr([0, 0]);
  s += S.line(cx - a, cy, cx + a, cy, { c: MUT, w: 0.8, dash: '3 3' });
  s += S.circle(sx, sy, 6, { c: ACC, fill: ACC });
  s += S.text(sx - 6, sy + 20, 'Sun (focus)', { a: 'end', size: 10, w: 'bold' });
  const pp = scr(pos(0));
  const ap = scr(pos(Math.PI));
  s += S.circle(pp[0], pp[1], 3.5, { fill: 'currentColor' }) + S.circle(ap[0], ap[1], 3.5, { fill: 'currentColor' });
  s += S.text(pp[0] + 8, pp[1] - 8, 'perihelion:', { size: 10 }) + S.text(pp[0] + 8, pp[1] + 5, 'nearest, fastest', { size: 10, w: 'bold' });
  s += S.text(ap[0] + 8, ap[1] - 31, 'aphelion:', { size: 10 }) + S.text(ap[0] + 8, ap[1] - 19, 'farthest, slowest', { size: 10, w: 'bold' });
  s += S.text(w - 6, 20, 'Both shaded wedges are swept', { a: 'end', size: 10 }) + S.text(w - 6, 33, 'in the same time interval:', { a: 'end', size: 10 });
  s += S.text(w - 6, 48, `A₁ = ${f1(A1)} px², A₂ = ${f1(A2)} px²`, { a: 'end', size: 10, w: 'bold' });
  const rp = Math.hypot(...pos(0));
  const ra = Math.hypot(...pos(Math.PI));
  s += S.text(w - 6, h - 24,`perihelion distance ${f1(rp)} px, aphelion distance ${f1(ra)} px`, { a: 'end', size: 10 });
  s += S.text(w - 6, h - 12, `v(perihelion) : v(aphelion) = ${f2(ra / rp)} : 1  (e = ${e})`, { a: 'end', size: 10 });
  const area = (a * b * dM) / 2; // exact area swept in the mean-anomaly interval dM
  check(near(A1, A2, 0.002) && near(A1, area, 0.002), `kepler: the two drawn wedges have equal area (${f1(A1)} and ${f1(A2)} px²) = (a b / 2) ΔM = ${f1(area)} px² for equal time intervals`);
  check(near(ra / rp, (1 + e) / (1 - e), 1e-9) && near(rp, a * (1 - e), 1e-9) && near((ra + rp) / 2, a, 1e-9), `kepler: Sun at the focus: perihelion ${f1(rp)} px = a(1−e), aphelion ${f1(ra)} px = a(1+e), mean ${f1(a)} px = semi-major axis; speed ratio ${f2(ra / rp)}`);
  return svgDoc(w, h, 'An elliptical orbit of eccentricity 0.7 with the Sun at one focus. Two shaded wedges, one at perihelion and one at aphelion, are swept in equal times and have equal areas, so the planet moves fastest at perihelion and slowest at aphelion', s);
})();

// ---------------------------------------------------------------- SUPER: forces on a 4.0 kg mass from 2.0 kg and 3.0 kg masses at right angles
export const SUP = (() => {
  const mA = 4.0;
  const mB = 2.0;
  const mC = 3.0;
  const rB = 0.3;
  const rC = 0.4;
  const FB = pull(mA, mB, rB);
  const FC = pull(mA, mC, rC);
  return { mA, mB, mC, rB, rC, FB, FC, F: Math.hypot(FB, FC), ang: (Math.atan2(FC, FB) * 180) / Math.PI };
})();
export const SUPER = (() => {
  const { mA, mB, mC, rB, rC, FB, FC, F, ang } = SUP;
  const w = 420;
  const h = 250;
  const sc = 400; // px per m
  const ox = 110;
  const oy = 215;
  const A = [ox, oy];
  const B = [ox + sc * rB, oy];
  const C = [ox, oy - sc * rC];
  const fs = 17 / 1e-9; // px per newton
  let s = S.line(A[0], A[1], B[0], B[1], { c: MUT, w: 1, dash: '4 3' }) + S.line(A[0], A[1], C[0], C[1], { c: MUT, w: 1, dash: '4 3' }) + S.line(B[0], B[1], C[0], C[1], { c: MUT, w: 1, dash: '4 3' });
  s += S.circle(A[0], A[1], 11, { c: BLUE, fill: BLUE, fop: 0.4 }) + S.circle(B[0], B[1], 8, { c: BLUE, fill: BLUE, fop: 0.25 }) + S.circle(C[0], C[1], 9.5, { c: BLUE, fill: BLUE, fop: 0.3 });
  s += S.text(A[0] - 16, A[1] + 18, `A  ${mA} kg`, { a: 'end', size: 10, w: 'bold' }) + S.text(B[0] + 12, B[1] + 4, `B  ${mB} kg`, { size: 10, w: 'bold' }) + S.text(C[0] + 14, C[1] + 4, `C  ${mC} kg`, { size: 10, w: 'bold' });
  s += S.text((A[0] + B[0]) / 2, A[1] + 22, `AB = ${rB} m`, { a: 'middle', size: 10, c: MUT }) + S.text(A[0] - 8, (A[1] + C[1]) / 2 - 40, `AC = ${rC} m`, { a: 'end', size: 10, c: MUT });
  const e1 = [A[0] + FB * fs, A[1]];
  const e2 = [A[0], A[1] - FC * fs];
  const e3 = [A[0] + FB * fs, A[1] - FC * fs];
  s += S.arrow(A[0], A[1], e1[0], e1[1], { c: GRN, w: 2.2 }) + S.arrow(A[0], A[1], e2[0], e2[1], { c: GRN, w: 2.2 }) + S.arrow(A[0], A[1], e3[0], e3[1], { c: RED, w: 2.6 });
  s += S.line(e1[0], e1[1], e3[0], e3[1], { c: MUT, w: 0.8, dash: '2 3' }) + S.line(e2[0], e2[1], e3[0], e3[1], { c: MUT, w: 0.8, dash: '2 3' });
  s += S.text(e1[0], A[1] - 8, `F_AB = ${(FB / 1e-9).toFixed(2)} nN`, { a: 'end', size: 10, c: GRN });
  s += S.text(A[0] - 8, e2[1] - 6, `F_AC = ${(FC / 1e-9).toFixed(2)} nN`, { a: 'end', size: 10, c: GRN });
  s += S.text(e3[0] + 8, e3[1] + 4, `net F = ${(F / 1e-9).toFixed(2)} nN`, { size: 10, c: RED, w: 'bold' });
  s += S.lines(w - 6, 24, ['Force on A = vector sum of the', 'pulls of B and C (superposition).', `Angle of the net force from AB: ${ang.toFixed(1)}°`, 'Arrows: 17 px per nanonewton.'], { a: 'end', size: 10, dy: 14 });
  const drawn = Math.hypot(e3[0] - A[0], e3[1] - A[1]) / fs;
  const angD = (Math.atan2(A[1] - e3[1], e3[0] - A[0]) * 180) / Math.PI;
  check(near(drawn, F, 1e-9) && near(angD, ang, 1e-9) && near(FB / FC, mB / rB ** 2 / (mC / rC ** 2), 1e-9), `super: drawn resultant ${(drawn / 1e-9).toFixed(3)} nN at ${angD.toFixed(2)}° equals the vector sum of F_AB ${(FB / 1e-9).toFixed(3)} nN and F_AC ${(FC / 1e-9).toFixed(3)} nN; arrows in the ratio of m/r²`);
  check(near(B[0] - A[0], rB * sc, 1e-9) && near(A[1] - C[1], rC * sc, 1e-9) && near(Math.hypot(C[0] - B[0], C[1] - B[1]), 0.5 * sc, 1e-9), 'super: masses placed at 0.30 m and 0.40 m on perpendicular lines (3–4–5 triangle, BC = 0.50 m) at 400 px per metre');
  return svgDoc(w, h, 'A 4.0 kilogram mass A with a 2.0 kilogram mass B 0.30 metres to its right and a 3.0 kilogram mass C 0.40 metres above it. The pull of B and the pull of C on A are drawn at right angles and their vector sum is the net gravitational force on A', s);
})();

// ---------------------------------------------------------------- EARTHG: g at height R above the surface and at depth R/2
export const EARTHG_DATA = { R: 70, h: 70, d: 35 };
export const EARTHG = (() => {
  const { R, h: hh, d } = EARTHG_DATA;
  const w = 420;
  const h = 250;
  const cx = 100;
  const cy = 135;
  let s = S.circle(cx, cy, R, { c: BLUE, fill: BLUE, fop: 0.15, sw: 1.8 }) + S.circle(cx, cy, R - d, { c: RED, fill: RED, fop: 0.12, sw: 1.2, dash: '4 3' });
  s += S.circle(cx, cy, 2.5, { fill: 'currentColor' }) + S.text(cx - 6, cy + 4, 'O', { a: 'end', size: 10 });
  s += S.line(cx, cy, cx + R + hh, cy, { c: MUT, w: 0.8, dash: '3 3' });
  const Pa = [cx + R + hh, cy];
  const Pd = [cx, cy + d];
  const Ps = [cx, cy - R];
  s += S.circle(Ps[0], Ps[1], 3.5, { fill: 'currentColor' }) + S.text(Ps[0] + 8, Ps[1] - 4, 'surface: g', { size: 10, w: 'bold' });
  s += S.circle(Pa[0], Pa[1], 3.5, { fill: 'currentColor' }) + S.text(Pa[0] - 4, Pa[1] + 16, 'height h = R', { a: 'end', size: 10, w: 'bold' });
  s += S.circle(Pd[0], Pd[1], 3.5, { fill: 'currentColor' }) + S.line(Pd[0], Pd[1] + 3, Pd[0], cy + R + 8, { c: MUT, w: 0.8 }) + S.text(Pd[0], cy + R + 20, 'depth d = R/2', { a: 'middle', size: 10, w: 'bold' });
  s += S.arrow(cx + R, cy - 18, Pa[0], cy - 18, { c: GRN, w: 1.2, size: 5 }) + S.arrow(Pa[0], cy - 18, cx + R, cy - 18, { c: GRN, w: 1.2, size: 5 });
  s += S.text(cx + R + hh / 2, cy - 24, 'h', { a: 'middle', size: 10, c: GRN });
  s += S.text(cx + R + 40, cy + 48, 'dashed sphere of radius R − d:', { size: 10 }) + S.text(cx + R + 40, cy + 61, 'only the mass inside it', { size: 10 }) + S.text(cx + R + 40, cy + 74, 'pulls a body at depth d', { size: 10 });
  s += S.lead(cx + (R - d) * 0.7, cy + (R - d) * 0.7, cx + R + 36, cy + 44);
  const ga = g * (R / (R + hh)) ** 2;
  const gd = g * (1 - d / R);
  s += S.lines(w - 6, 24, ['Height h:  g′ = g R² / (R + h)²', `h = R:  g′ = g/4 = ${f2(g / 4)} m s⁻²`, 'Depth d:  g′ = g (1 − d/R)', `d = R/2:  g′ = g/2 = ${f2(g / 2)} m s⁻²`, 'At the centre:  g′ = 0'], { a: 'end', size: 10, dy: 14 });
  check(near(ga, g / 4, 1e-9) && near(Pa[0] - cx, 2 * R, 1e-9) && near(gd, g / 2, 1e-9) && near(R - d, R / 2, 1e-9) && near(Pd[1] - cy, d, 1e-9), `earthg: point at height R is drawn 2R from O (g′ = g/4 = ${f2(ga)} m s⁻²); point at depth R/2 lies at distance R/2 from O on the dashed sphere radius R/2 (g′ = g/2 = ${f2(gd)} m s⁻²)`);
  return svgDoc(w, h, 'A cross-section of the Earth with centre O. One point is at a height equal to the radius above the surface, where g is a quarter of its surface value. Another is at a depth of half the radius, where g is half the surface value and only the mass inside the dashed inner sphere attracts it', s);
})();

// ---------------------------------------------------------------- CANNON: launches from a high tower (GM = 1, R = 1, launch at 1.3 R); computed orbits
export const CANNON_DATA = { px: 48, cx: 128, cy: 105, r0: 1.3, mult: [0.6, 0.8, 1.0, 1.2, Math.SQRT2] };
export const CANNON = (() => {
  const { px, cx, cy, r0, mult } = CANNON_DATA;
  const w = 420;
  const h = 312;
  const vc0 = Math.sqrt(1 / r0); // circular speed at the launch radius
  let s = S.circle(cx, cy, px, { c: BLUE, fill: BLUE, fop: 0.2, sw: 1.8 });
  const cols = [MUT, MUT, GRN, ACC, RED];
  const tags = ['v = 0.6 v_c and 0.8 v_c: fall back to the ground', 'v = v_c: circular orbit', `v = 1.2 v_c: ellipse, farthest point ${(r0 * 1.44 / 0.56).toFixed(1)} R`, 'v = √2 v_c: escapes (parabola)'];
  const tEnd = [14, 14, 9.4, 22.4, 14];
  const res = [];
  const to = (p) => [cx + px * p.x, cy - px * p.y];
  mult.forEach((m, i) => {
    const tr = orbit2d({ gm: 1, x: 0, y: r0, vx: m * vc0, vy: 0 }, tEnd[i], 0.002, { every: 25, stopR: i < 2 ? 1 : 0 });
    const shown = i === 4 ? tr.filter((p) => to(p)[0] < w - 8 && to(p)[1] > 6 && to(p)[1] < h - 36) : tr;
    s += S.path('M' + shown.map((p) => to(p).map(f1).join(' ')).join(' L'), { c: cols[i], w: i === 2 || i === 4 ? 2 : 1.4, dash: i < 2 ? '4 3' : undefined });
    res.push({ m, tr });
  });
  s += S.circle(cx, cy - px * r0, 3.5, { fill: 'currentColor' });
  s += S.text(cx, cy - px * r0 - 8, 'launch from a tower, speed horizontal', { a: 'middle', size: 10 });
  s += S.lines(w - 6, 14, tags, { a: 'end', size: 10, dy: 14 });
  s += S.text(w - 6, h - 20, 'Units: GM = 1, planet radius R = 1; the tower is drawn at 0.3 R.', { a: 'end', size: 10 });
  s += S.text(w - 6, h - 6, 'v_c = circular speed at the launch height (about 7.9 km/s for the Earth).', { a: 'end', size: 10 });
  const last = (k) => res[k].tr.at(-1);
  const rs = res[2].tr.map((p) => Math.hypot(p.x, p.y));
  const dev = Math.max(...rs.map((r) => Math.abs(r - r0)));
  const rmax = Math.max(...res[3].tr.map((p) => Math.hypot(p.x, p.y)));
  const rform = (r0 * 1.44) / (2 - 1.44);
  const en = res[4].tr.map((p) => 0.5 * (p.vx * p.vx + p.vy * p.vy) - 1 / Math.hypot(p.x, p.y));
  const enMax = Math.max(...en.map(Math.abs));
  const far = Math.hypot(last(4).x, last(4).y);
  const okFall = [0, 1].every((k) => Math.hypot(last(k).x, last(k).y) <= 1 && res[k].tr.length > 3);
  check(dev < 5e-3 && near(rmax, rform, 0.01) && enMax < 2e-3 && far > 6 && okFall, `cannon: v = v_c stays on r = ${r0} within ${(dev * 100).toFixed(2)}%; v = 1.2 v_c reaches r = ${rmax.toFixed(3)} (formula r₀v²/(2 − v²) = ${rform.toFixed(3)}); v = √2 v_c keeps E = 0 (max |E| ${enMax.toExponential(1)}) and leaves to r = ${far.toFixed(1)}; the two slower launches reach the ground (r ≤ 1)`);
  return svgDoc(w, h, 'Newton cannon: a projectile launched horizontally from a high tower on a planet. Slow launches fall back to the ground, a launch at the circular speed goes round on a circle, a faster launch follows an ellipse and a launch at root two times the circular speed escapes on a parabola', s);
})();

// ---------------------------------------------------------------- ORBIT: a satellite at height h = R (r = 2R)
export const ORBIT_DATA = { R: 50, h: 50 };
export const ORBIT = (() => {
  const { R, h: hh } = ORBIT_DATA;
  const w = 420;
  const h = 250;
  const cx = 120;
  const cy = 130;
  const r = R + hh;
  const rOrb = RE * (1 + hh / R);
  const v = Math.sqrt(GMg / rOrb);
  const T = (2 * Math.PI * rOrb) / v;
  let s = S.circle(cx, cy, R, { c: BLUE, fill: BLUE, fop: 0.2, sw: 1.8 }) + S.circle(cx, cy, r, { c: MUT, w: 1.2, dash: '5 4' });
  const sat = [cx, cy - r];
  s += S.rect(sat[0] - 8, sat[1] - 5, 16, 10, { c: ACC, fill: ACC, fop: 0.5, rx: 1.5 }) + S.line(sat[0] - 8, sat[1], sat[0] - 20, sat[1], { w: 1.2 }) + S.line(sat[0] + 8, sat[1], sat[0] + 20, sat[1], { w: 1.2 });
  s += S.arrow(sat[0] + 22, sat[1], sat[0] + 78, sat[1], { c: GRN, w: 2.2 }) + S.text(sat[0] + 82, sat[1] + 4, 'v (tangent)', { size: 10, c: GRN });
  s += S.arrow(sat[0], sat[1] + 8, sat[0], sat[1] + 40, { c: RED, w: 2.2 }) + S.text(sat[0] + 6, sat[1] + 34, 'F (towards O)', { size: 10, c: RED });
  s += S.circle(cx, cy, 2.5, { fill: 'currentColor' }) + S.text(cx + 6, cy + 14, 'O', { size: 10 });
  const q = Math.SQRT1_2;
  s += S.line(cx, cy, cx - R * q, cy + R * q, { w: 1 }) + S.text(cx - R * q - 4, cy + R * q + 12, 'R', { a: 'end', size: 10, w: 'bold' });
  s += S.line(cx + R * q, cy + R * q, cx + r * q, cy + r * q, { c: GRN, w: 2 }) + S.text(cx + r * q + 6, cy + r * q + 10, 'h = R', { size: 10, c: GRN, w: 'bold' });
  s += S.text(cx, h - 6, 'orbit radius r = R + h = 2R', { a: 'middle', size: 10 });
  s += S.lines(w - 6, 150, ['Given: g = 9.8 m s⁻², R = 6.4 × 10⁶ m', `r = 2R = ${(rOrb / 1e6).toFixed(1)} × 10⁶ m`, `v = √(g R² / r) = ${(v / 1e3).toFixed(1)} km s⁻¹`, `T = 2π r / v = ${(T / 3600).toFixed(2)} h`], { a: 'end', size: 10, dy: 14 });
  check(near(r / R, 2, 1e-9) && near(v, 5600, 1e-9) && near(T, 2 * Math.PI * Math.sqrt(rOrb ** 3 / GMg), 1e-9) && near(Math.hypot(sat[0] - cx, sat[1] - cy), r, 1e-9), `orbit: orbit circle drawn at 2R, satellite on it with F towards O and v along the tangent; v = ${(v / 1e3).toFixed(3)} km/s = √(gR/2) = 5.600 km/s and T = ${(T / 3600).toFixed(3)} h agree with T = 2π√(r³/gR²)`);
  return svgDoc(w, h, 'A satellite in a circular orbit at a height equal to the Earth radius, so the orbit radius is twice the Earth radius. The gravitational force on the satellite points to the centre of the Earth and its velocity is along the tangent, perpendicular to the force', s);
})();

export const ALL = { KEPLER, SUPER, EARTHG, CANNON, ORBIT };
