// ISC 11 ch04 diagrams, all drawn from numbers with self-checks: a strobe picture of a projectile with its two velocity
// components, the terms (angle, height, range), ranges at complementary angles, the velocity vector along the path,
// a horizontal launch from a height, and a launched ball beside a dropped one.
import { svgDoc, S, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, proj, pos } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const d1 = (n) => (Math.round(n * 10) / 10).toFixed(1);

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

/** Parabola samples as screen points: x px = ox + s x, y px = gy - s y. */
function pathD(u, th, ox, gy, s, tEnd, n = 60) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const t = (tEnd * i) / n;
    const [x, y] = pos(u, th, t);
    d += `${i ? ' L' : 'M'}${f1(ox + s * x)} ${f1(gy - s * y)}`;
  }
  return d;
}
const ground = (x1, x2, y) => S.line(x1, y, x2, y, { w: 2 });

// ---------------------------------------------------------------- TWOMOT: strobe of u = 39.2 m/s at 30 degrees, one picture per second
export const TWOMOT_DATA = { u: 39.2, th: 30, ox: 36, gy: 165, s: 2.4, vs: 1.2 };
export const TWOMOT = (() => {
  const { u, th, ox, gy, s, vs } = TWOMOT_DATA;
  const w = 420;
  const h = 205;
  const { ux, uy, T, H, R } = proj(u, th);
  let sv = ground(ox - 10, ox + s * R + 22, gy);
  sv += S.path(pathD(u, th, ox, gy, s, T), { c: MUT, w: 1.2, dash: '4 3' });
  const dots = [];
  const vyLen = [];
  for (let t = 0; t <= 4; t++) {
    const [x, y] = pos(u, th, t);
    const px = ox + s * x;
    const py = gy - s * y;
    const vy = uy - g * t;
    dots.push([px, py]);
    sv += S.line(px, py, px, gy, { c: MUT, w: 0.8, dash: '2 3' });
    sv += S.text(t === 4 ? px - 6 : px, gy + 14, `t = ${t} s`, { a: t === 4 ? 'end' : 'middle', size: 10 });
    sv += S.arrow(px, py, px + vs * ux, py, { c: GRN, w: 1.6, size: 6 });
    if (Math.abs(vy) > 1e-9) sv += S.arrow(px, py, px, py - vs * vy, { c: RED, w: 1.6, size: 6 });
    vyLen.push(vs * vy);
    sv += S.arrow(px, py, px + vs * ux, py - vs * vy, { c: ACC, w: 1.8, size: 6 });
    sv += S.circle(px, py, 3.2, { c: BLUE, fill: BLUE });
  }
  const dyd = 188;
  sv += S.arrow(dots[0][0], dyd, dots[1][0], dyd, { c: GRN, w: 1.2, size: 5 }) + S.arrow(dots[1][0], dyd, dots[0][0], dyd, { c: GRN, w: 1.2, size: 5 });
  sv += S.text((dots[0][0] + dots[1][0]) / 2, dyd + 11, `${d1(ux)} m every second`, { a: 'middle', size: 10, c: GRN });
  sv += S.text(10, 16, 'Horizontal velocity (green): the same at every instant', { size: 10, c: GRN });
  sv += S.text(10, 31, 'Vertical velocity (red): falls by 9.8 m s⁻¹ every second', { size: 10, c: RED });
  sv += S.text(10, 46, 'Resultant velocity (orange): tangent to the path', { size: 10, c: ACC });
  const gaps = dots.slice(1).map((p, i) => p[0] - dots[i][0]);
  const okSpace = gaps.every((q) => near(q, s * ux, 1e-6));
  const okTop = near((gy - dots[2][1]) / s, H, 1e-9) && near((dots[4][0] - ox) / s, R, 1e-9) && near(dots[4][1], gy, 1e-9) && near((dots[2][0] - ox) / s, R / 2, 1e-9);
  const okVy = vyLen.every((q, i) => i === 0 || near(vyLen[i - 1] - q, vs * g, 1e-9)) && Math.abs(vyLen[2]) < 1e-9 && near(vyLen[4], -vyLen[0], 1e-9);
  check(okSpace && okTop && okVy, `twomot: dots one second apart are ${d1(ux)} m apart horizontally (equal gaps); top at t = 2 s is ${d1(H)} m high and half of the ${d1(R)} m range; red arrows shrink by ${d1(g)} m/s per second, zero at the top`);
  return svgDoc(w, h, 'Strobe picture of a ball thrown at 39.2 metres per second at 30 degrees to the horizontal, one picture each second for 4 seconds. The horizontal velocity arrow is the same length every time, the vertical arrow shrinks to zero at the top at 2 seconds and then points down, and the resultant arrow lies along the path', sv);
})();

// ---------------------------------------------------------------- TERMS: u = 39.2 m/s at 45 degrees
export const TERMS_DATA = { u: 39.2, th: 45, ox: 28, gy: 180, s: 2.2 };
export const TERMS = (() => {
  const { u, th, ox, gy, s } = TERMS_DATA;
  const w = 420;
  const h = 230;
  const { T, H, R } = proj(u, th);
  let sv = ground(ox - 12, ox + s * R + 16, gy);
  sv += S.path(pathD(u, th, ox, gy, s, T, 80), { c: BLUE, w: 2.2 });
  const L = 62;
  sv += S.arrow(ox, gy, ox + L * Math.cos(rad(th)), gy - L * Math.sin(rad(th)), { c: ACC, w: 2, size: 7 });
  sv += S.text(ox + L * Math.cos(rad(th)) - 14, gy - L * Math.sin(rad(th)) - 4, 'u', { size: 12, w: 'bold', c: ACC });
  sv += S.path(`M${f1(ox + 36)} ${gy} A36 36 0 0 0 ${f1(ox + 36 * Math.cos(rad(th)))} ${f1(gy - 36 * Math.sin(rad(th)))}`, { c: RED, w: 1.4 });
  sv += S.text(ox + 40, gy - 8, 'θ = 45°', { size: 10, c: RED });
  const ax = ox + (s * R) / 2;
  const ay = gy - s * H;
  sv += S.line(ax, ay, ax, gy, { c: MUT, w: 1, dash: '4 3' });
  sv += S.circle(ax, ay, 3.5, { c: BLUE, fill: BLUE });
  sv += S.arrow(ax + 10, ay + 4, ax + 10, gy, { c: GRN, w: 1.3, size: 5 }) + S.arrow(ax + 10, gy - 4, ax + 10, ay, { c: GRN, w: 1.3, size: 5 });
  sv += S.text(ax + 16, (ay + gy) / 2 + 4, `H = ${d1(H)} m`, { size: 10, c: GRN, w: 'bold' });
  sv += S.text(ax, ay - 8, 'highest point', { a: 'middle', size: 10 });
  const ry = gy + 22;
  sv += S.arrow(ox, ry, ox + s * R, ry, { c: GRN, w: 1.3, size: 5 }) + S.arrow(ox + s * R, ry, ox, ry, { c: GRN, w: 1.3, size: 5 });
  sv += S.lead(ox, gy + 3, ox, ry + 4) + S.lead(ox + s * R, gy + 3, ox + s * R, ry + 4);
  sv += S.text(ox + (s * R) / 2, ry + 14, `R = ${d1(R)} m (horizontal range)`, { a: 'middle', size: 10, c: GRN, w: 'bold' });
  sv += S.text(w - 8, 24, `u = ${d1(u)} m s⁻¹, θ = angle of projection`, { a: 'end', size: 10 });
  sv += S.text(w - 8, 39, `time of flight T = ${(Math.round(T * 100) / 100).toFixed(2)} s`, { a: 'end', size: 10 });
  sv += S.text(w - 8, 54, 'launch and landing on the same level', { a: 'end', size: 10 });
  // slope of the drawn path at the launch point is tan 45 degrees
  const p0 = pos(u, th, 0);
  const p1 = pos(u, th, 1e-3);
  const okSlope = near((p1[1] - p0[1]) / (p1[0] - p0[0]), Math.tan(rad(th)), 1e-3);
  const okDim = near((gy - ay) / s, H, 1e-9) && near(H / R, Math.tan(rad(th)) / 4, 1e-9) && near(H, 39.2, 1e-9) && near(R, 156.8, 1e-9) && near(T, (2 * u * Math.sin(rad(th))) / g, 1e-9);
  check(okSlope && okDim, `terms: u = ${u} m/s at ${th}° gives H = ${d1(H)} m, R = ${d1(R)} m, T = ${(Math.round(T * 100) / 100).toFixed(2)} s; apex at half the range; H/R = tan θ / 4 = 1/4; launch slope tan ${th}° = 1`);
  return svgDoc(w, h, 'A projectile launched at 39.2 metres per second at 45 degrees follows a parabola. The angle of projection theta is marked at the launch point, the maximum height is 39.2 metres at the highest point, the horizontal range is 156.8 metres, and the time of flight is 5.66 seconds', sv);
})();

// ---------------------------------------------------------------- COMPLEMENT: 30, 45 and 60 degrees at the same speed
export const COMP_DATA = { u: 39.2, angles: [30, 45, 60], ox: 24, gy: 188, s: 2.3 };
export const COMPLEMENT = (() => {
  const { u, angles, ox, gy, s } = COMP_DATA;
  const w = 420;
  const h = 230;
  const cols = [BLUE, ACC, RED];
  let sv = ground(ox - 10, ox + s * 160 + 14, gy);
  const info = angles.map((th) => proj(u, th));
  angles.forEach((th, i) => {
    sv += S.path(pathD(u, th, ox, gy, s, info[i].T, 80), { c: cols[i], w: 2 });
    sv += S.circle(ox + s * info[i].R, gy, 3, { c: cols[i], fill: cols[i] });
    sv += S.circle(ox + (s * info[i].R) / 2, gy - s * info[i].H, 2.6, { c: cols[i], fill: cols[i] });
  });
  sv += S.text(ox + s * info[0].R - 6, gy + 14, `${d1(info[0].R)} m`, { a: 'middle', size: 10, c: BLUE });
  sv += S.text(ox + s * info[1].R + 6, gy + 14, `${d1(info[1].R)} m`, { a: 'middle', size: 10, c: ACC });
  sv += S.text(ox + s * info[0].R - 62, gy + 29, '30° and 60°: equal ranges', { size: 10 });
  const lx = 252;
  angles.forEach((th, i) => {
    sv += S.line(lx, 18 + 15 * i - 4, lx + 18, 18 + 15 * i - 4, { c: cols[i], w: 2.4 });
    sv += S.text(lx + 24, 18 + 15 * i, `${th}°: H = ${d1(info[i].H)} m, T = ${d1(info[i].T)} s`, { size: 10 });
  });
  sv += S.text(lx, 18 + 15 * 3 + 2, `same speed u = ${u} m s⁻¹`, { size: 10, c: MUT });
  const okEq = near(info[0].R, info[2].R, 1e-9) && info[1].R > info[0].R && near(info[1].R, (u * u) / g, 1e-9);
  const okH = near(info[2].H / info[0].H, 3, 1e-9) && near(info[1].H * 2, info[0].H + info[2].H, 1e-9);
  check(okEq && okH, `complement: R(30°) = R(60°) = ${d1(info[0].R)} m, R(45°) = u²/g = ${d1(info[1].R)} m is the largest; H(60°)/H(30°) = 3 (H = ${angles.map((_, i) => d1(info[i].H)).join(', ')} m)`);
  return svgDoc(w, h, 'Three paths of a ball thrown at the same speed of 39.2 metres per second at 30, 45 and 60 degrees. The 30 degree and 60 degree paths land at the same point 135.8 metres away, the 45 degree path lands furthest at 156.8 metres, and the steeper the throw the higher the path', sv);
})();

// ---------------------------------------------------------------- VELDIR: velocity vectors along the path of the strobe ball
export const VEL_DATA = { u: 39.2, th: 30, ox: 24, gy: 168, s: 2.4, vs: 1.6, t3: 3 };
export const VELDIR = (() => {
  const { u, th, ox, gy, s, vs, t3 } = VEL_DATA;
  const w = 420;
  const h = 200;
  const { ux, uy, T, R } = proj(u, th);
  let sv = ground(ox - 10, ox + s * R + 20, gy);
  sv += S.path(pathD(u, th, ox, gy, s, T, 80), { c: MUT, w: 1.4 });
  const mark = (t, k) => {
    const [x, y] = pos(u, th, t);
    const px = ox + s * x;
    const py = gy - s * y;
    const vy = uy - g * t;
    sv += S.arrow(px, py, px + vs * ux, py - vs * vy, { c: ACC, w: 2.2, size: 7 });
    sv += S.circle(px, py, 3.2, { c: BLUE, fill: BLUE });
    sv += vy >= 0 ? S.text(px + vs * ux + 4, py - vs * vy - 3, String(k), { size: 11, w: 'bold', c: ACC }) : S.text(px - 6, py + 16, String(k), { a: 'end', size: 11, w: 'bold', c: ACC });
    return { px, py, vx: ux, vy };
  };
  const a1 = mark(0, 1);
  const a2 = mark(uy / g, 2);
  const a3 = mark(t3, 3);
  sv += S.line(a3.px, a3.py, a3.px + vs * a3.vx, a3.py, { c: GRN, w: 1.3, dash: '4 3' });
  sv += S.line(a3.px + vs * a3.vx, a3.py, a3.px + vs * a3.vx, a3.py - vs * a3.vy, { c: RED, w: 1.3, dash: '4 3' });
  sv += S.text(a3.px + (vs * a3.vx) / 2, a3.py - 5, 'vx', { a: 'middle', size: 10, c: GRN, w: 'bold' });
  sv += S.text(a3.px + vs * a3.vx + 5, a3.py + 4, 'vy', { size: 10, c: RED, w: 'bold' });
  const v3 = Math.hypot(a3.vx, a3.vy);
  const al = (Math.atan2(-a3.vy, a3.vx) * 180) / Math.PI;
  sv += S.text(10, 16, `1  t = 0: v = ${d1(u)} m s⁻¹ at ${th}° above the horizontal`, { size: 10 });
  sv += S.text(10, 31, `2  t = ${d1(uy / g)} s (highest point): v = ${d1(ux)} m s⁻¹, horizontal (vy = 0)`, { size: 10 });
  sv += S.text(10, 46, `3  t = ${t3} s: vx = ${d1(ux)}, vy = −${d1(Math.abs(a3.vy))} m s⁻¹, v = ${d1(v3)} m s⁻¹ at ${d1(Math.abs(al))}° below the horizontal`, { size: 10 });
  // arrows are tangent to the path (slope from neighbouring path points) and their lengths are |v| times the scale
  const slopeAt = (t) => {
    const p = pos(u, th, t - 1e-4);
    const q = pos(u, th, t + 1e-4);
    return (q[1] - p[1]) / (q[0] - p[0]);
  };
  const okTan = [[a1, 0], [a2, uy / g], [a3, t3]].every(([a, t]) => near(a.vy / a.vx, slopeAt(t), 1e-3) || (Math.abs(a.vy) < 1e-9 && Math.abs(slopeAt(t)) < 1e-6));
  const okLen = near(Math.hypot(vs * a1.vx, vs * a1.vy), vs * u, 1e-9) && Math.abs(a2.vy) < 1e-9 && near(v3, Math.sqrt(ux * ux + (uy - g * t3) ** 2), 1e-9);
  const okAng = Math.abs(al - 16.1) < 0.1;
  check(okTan && okLen && okAng, `veldir: arrows at t = 0, ${d1(uy / g)} and ${t3} s are tangent to the path; |v| = ${d1(u)}, ${d1(ux)}, ${d1(v3)} m/s; direction at t = 3 s is ${d1(al)}° below the horizontal`);
  return svgDoc(w, h, 'Velocity arrows along the path of a ball thrown at 39.2 metres per second at 30 degrees: at launch the arrow points 30 degrees above the horizontal, at the highest point it is horizontal, and at 3 seconds it points 16.1 degrees below the horizontal with its horizontal and vertical components dashed', sv);
})();

// ---------------------------------------------------------------- HORIZ: thrown horizontally at 20 m/s from a height of 19.6 m
export const HORIZ_DATA = { u: 20, h: 19.6, ox: 98, top: 46, s: 6.6, vs: 1.5 };
export const HORIZ = (() => {
  const { u, h: hh, ox, top, s, vs } = HORIZ_DATA;
  const w = 420;
  const h = 225;
  const T = Math.sqrt((2 * hh) / g);
  const R = u * T;
  const gy = top + s * hh;
  const xy = (t) => [ox + s * u * t, top + s * 0.5 * g * t * t];
  let sv = ground(ox - 70, ox + s * R + 40, gy);
  sv += S.rect(ox - 70, top, 70, gy - top, { fill: FILL, c: MUT, sw: 1.2 });
  sv += S.text(ox - 35, top + 44, 'cliff', { a: 'middle', size: 10 });
  let d = '';
  for (let i = 0; i <= 60; i++) {
    const [px, py] = xy((T * i) / 60);
    d += `${i ? ' L' : 'M'}${f1(px)} ${f1(py)}`;
  }
  sv += S.path(d, { c: BLUE, w: 2.2 });
  const [lx, ly] = xy(0);
  const [ex, ey] = xy(T);
  sv += S.arrow(lx, ly, lx + vs * u, ly, { c: GRN, w: 2, size: 7 });
  sv += S.text(lx + 4, ly - 8, `u = ${u} m s⁻¹ (horizontal)`, { size: 10, c: GRN, w: 'bold' });
  sv += S.circle(lx, ly, 3.2, { c: BLUE, fill: BLUE });
  const vy = g * T;
  const v = Math.hypot(u, vy);
  sv += S.arrow(ex, ey, ex + vs * u, ey, { c: GRN, w: 1.4, size: 6 });
  sv += S.arrow(ex, ey, ex, ey + vs * vy, { c: RED, w: 1.4, size: 6 });
  sv += S.arrow(ex, ey, ex + vs * u, ey + vs * vy, { c: ACC, w: 2.2, size: 7 });
  sv += S.circle(ex, ey, 3.2, { c: BLUE, fill: BLUE });
  sv += S.text(ex - 6, ey + 14, `vy = ${d1(vy)}`, { a: 'end', size: 10, c: RED });
  sv += S.text(ex + vs * u - 4, ey + vs * vy + 14, `v = ${d1(v)}`, { a: 'end', size: 10, c: ACC, w: 'bold' });
  const hx = ox - 12;
  sv += S.arrow(hx, top + 4, hx, gy, { c: MUT, w: 1.2, size: 5 }) + S.arrow(hx, gy - 4, hx, top, { c: MUT, w: 1.2, size: 5 });
  sv += S.text(hx - 6, (top + gy) / 2 + 4, `h = ${hh} m`, { a: 'end', size: 10, w: 'bold' });
  const ry = gy + 20;
  sv += S.arrow(ox, ry, ox + s * R, ry, { c: GRN, w: 1.3, size: 5 }) + S.arrow(ox + s * R, ry, ox, ry, { c: GRN, w: 1.3, size: 5 });
  sv += S.text(ox + (s * R) / 2, ry + 14, `R = u T = ${d1(R)} m`, { a: 'middle', size: 10, c: GRN, w: 'bold' });
  sv += S.text(w - 8, 11, `T = √(2h/g) = ${d1(T)} s`, { a: 'end', size: 10 });
  const ang = (Math.atan2(vy, u) * 180) / Math.PI;
  sv += S.text(w - 8, 24, `at landing: v = ${d1(v)} m s⁻¹, ${d1(ang)}° below horizontal`, { a: 'end', size: 10 });
  const okPos = near((ex - ox) / s, R, 1e-9) && near((ey - top) / s, hh, 1e-9) && near(R, 40, 1e-9) && near(T, 2, 1e-9);
  const mid = xy(T / 2);
  const okMid = near((mid[0] - ox) / s, (u * T) / 2, 1e-9) && near((mid[1] - top) / s, 0.25 * hh, 1e-9);
  const okV = near(v, Math.sqrt(u * u + 2 * g * hh), 1e-9) && near(vy, 19.6, 1e-9) && Math.abs(ang - 44.4) < 0.05;
  check(okPos && okMid && okV, `horiz: launch at h = ${hh} m, u = ${u} m/s: T = ${d1(T)} s, R = ${d1(R)} m drawn at ${s} px per metre; a quarter of the drop in half the time; landing v = ${d1(v)} m/s at ${d1(ang)}°`);
  return svgDoc(w, h, 'A ball thrown horizontally at 20 metres per second from the top of a 19.6 metre cliff follows half a parabola and lands 40 metres from the base after 2 seconds. At landing its horizontal velocity is 20 metres per second, its vertical velocity is 19.6 metres per second downward, and the resultant speed is 28 metres per second at 44.4 degrees below the horizontal', sv);
})();

// ---------------------------------------------------------------- STROBE: horizontal launch beside a dropped ball (same data)
export const STROBE_DATA = { u: 20, h: 19.6, ox: 78, top: 30, s: 6.2, n: 4 };
export const STROBE = (() => {
  const { u, h: hh, ox, top, s, n } = STROBE_DATA;
  const w = 420;
  const h = 182;
  const T = Math.sqrt((2 * hh) / g);
  const gy = top + s * hh;
  let sv = ground(ox - 40, ox + s * u * T + 30, gy);
  const thrown = [];
  const dropped = [];
  let d = '';
  for (let i = 0; i <= 60; i++) {
    const t = (T * i) / 60;
    d += `${i ? ' L' : 'M'}${f1(ox + s * u * t)} ${f1(top + s * 0.5 * g * t * t)}`;
  }
  sv += S.path(d, { c: MUT, w: 1, dash: '4 3' });
  for (let i = 0; i <= n; i++) {
    const t = (T * i) / n;
    const y = top + s * 0.5 * g * t * t;
    const xt = ox + s * u * t;
    thrown.push([xt, y]);
    dropped.push([ox, y]);
    sv += S.line(ox, y, xt, y, { c: MUT, w: 0.9, dash: '2 3' });
    sv += S.circle(xt, y, 3.4, { c: BLUE, fill: BLUE });
    sv += S.circle(ox, y, 3.4, { c: RED, fill: RED });
    sv += S.text(i === 0 ? ox : xt, y - 8, `${(Math.round(t * 100) / 100).toString()} s`, { a: 'middle', size: 10 });
  }
  sv += S.text(w - 8, 14, 'blue: thrown horizontally at 20 m s⁻¹', { a: 'end', size: 10, c: BLUE });
  sv += S.text(w - 8, 28, 'red: dropped from rest at the same moment', { a: 'end', size: 10, c: RED });
  sv += S.text(ox + (s * u * T) / 2 + 20, gy + 16, 'Same height at every instant: the horizontal motion does not affect the fall.', { a: 'middle', size: 10 });
  const okEq = thrown.every((p, i) => near(p[1], dropped[i][1], 1e-9));
  const okX = thrown.every((p, i) => i === 0 || near(p[0] - thrown[i - 1][0], s * u * (T / n), 1e-9)) && dropped.every((p) => p[0] === ox);
  const okGround = near(thrown[n][1], gy, 1e-9) && near(thrown[2][1] - top, s * 0.25 * hh, 1e-9);
  check(okEq && okX && okGround, `strobe: thrown and dropped balls at equal heights at all ${n + 1} instants; thrown ball moves ${d1(u * (T / n))} m horizontally every ${d1(T / n)} s; both land at T = ${d1(T)} s`);
  return svgDoc(w, h, 'Strobe picture of one ball thrown horizontally at 20 metres per second and another dropped from rest at the same moment from the same height of 19.6 metres, with a picture every half second. The two balls are always at the same height, joined by horizontal dashed lines, and both reach the ground after 2 seconds', sv);
})();

export const ALL = { TWOMOT, TERMS, COMPLEMENT, VELDIR, HORIZ, STROBE };
