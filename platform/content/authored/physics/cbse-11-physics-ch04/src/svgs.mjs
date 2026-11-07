// ch04 diagrams, all drawn from computed forces with self-checks (each free-body diagram's drawn vectors are summed and compared
// with m a): contact pair of blocks, block at rest on a rough slope, blocks joined over a pulley, lift readings, lamp on two
// ropes with its force triangle, recoil momenta, level and banked road, and uniform circular motion.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, solveLin, bankLimit, tablePulley } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const v1 = (x) => (Math.round(x * 10) / 10).toString();
const v2 = (x) => (Math.round(x * 100) / 100).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
/** Arrow from (x, y) by the vector (dx, dy). */
const vec = (x, y, dx, dy, o = {}) => S.arrow(x, y, x + dx, y + dy, o);
const sum = (vs) => vs.reduce((a, [x, y]) => [a[0] + x, a[1] + y], [0, 0]);
const mag = ([x, y]) => Math.hypot(x, y);

// ---------------------------------------------------------------- PAIR: two blocks in contact on a smooth floor (third law and second law together)
export const PAIR_DATA = { mA: 3, mB: 5, P: 24, k: 2 }; // kg, kg, N; k px per newton
PAIR_DATA.a = PAIR_DATA.P / (PAIR_DATA.mA + PAIR_DATA.mB);
PAIR_DATA.F = PAIR_DATA.mB * PAIR_DATA.a; // force of A on B
export const PAIR = (() => {
  const { mA, mB, P, k, a, F } = PAIR_DATA;
  const w = 420;
  const h = 250;
  let s = S.text(10, 16, 'A hand pushes block A, which pushes block B (smooth floor)', { size: 11, w: 'bold' });
  const y0 = 56;
  s += S.rect(120, y0, 70, 40, { c: BLUE, fill: BLUE, fop: 0.22 }) + S.text(155, y0 + 25, `A  ${mA} kg`, { a: 'middle', size: 11 });
  s += S.rect(190, y0, 90, 40, { c: GRN, fill: GRN, fop: 0.22 }) + S.text(235, y0 + 25, `B  ${mB} kg`, { a: 'middle', size: 11 });
  s += S.line(100, y0 + 40, 300, y0 + 40, { c: MUT, w: 1.5 });
  s += S.arrow(60, y0 + 20, 118, y0 + 20, { c: ACC, w: 2.2 }) + S.text(60, y0 + 8, `P = ${P} N`, { size: 11, c: ACC, w: 'bold' });
  s += S.text(300, y0 + 22, `a = ${a} m s⁻²`, { size: 11 });
  s += S.text(10, 134, 'Free-body diagrams (horizontal forces only; weight and normal reaction balance)', { size: 10 });
  const ax = 110;
  const ay = 184;
  const vA = [[k * P, 0], [-k * F, 0]];
  s += S.circle(ax, ay, 4, { fill: 'currentColor' }) + vec(ax, ay, vA[0][0], 0, { c: ACC, w: 2.2 }) + vec(ax, ay, vA[1][0], 0, { c: RED, w: 2.2 });
  s += S.text(ax + vA[0][0] / 2, ay - 8, `P = ${P} N`, { a: 'middle', size: 10, c: ACC }) + S.text(ax + vA[1][0] / 2, ay + 18, `F(B on A) = ${F} N`, { a: 'middle', size: 10, c: RED });
  s += S.text(ax, ay + 50, `On A: net = ${P} − ${F} = ${P - F} N = ${mA} × ${a}`, { a: 'middle', size: 10, w: 'bold' });
  const bx = 330;
  const vB = [[k * F, 0]];
  s += S.circle(bx, ay, 4, { fill: 'currentColor' }) + vec(bx, ay, vB[0][0], 0, { c: GRN, w: 2.2 });
  s += S.text(bx + vB[0][0] / 2, ay - 8, `F(A on B) = ${F} N`, { a: 'middle', size: 10, c: GRN });
  s += S.text(bx, ay + 50, `On B: net = ${F} N = ${mB} × ${a}`, { a: 'middle', size: 10, w: 'bold' });
  s += S.text(w / 2, h - 18, 'F(B on A) and F(A on B) are equal and opposite but act on different bodies.', { a: 'middle', size: 10 }) + S.text(w / 2, h - 5, 'Scale: 2 px per newton.', { a: 'middle', size: 10 });
  const okPair = near(mag(vA[1]), mag(vB[0]), 1e-9) && vA[1][0] < 0 && vB[0][0] > 0;
  const okNet = near(sum(vA)[0] / k, mA * a, 1e-9) && near(sum(vB)[0] / k, mB * a, 1e-9) && near(a, 3, 1e-12) && near(F, 15, 1e-12);
  check(okPair, `pair: the drawn reaction arrows on A and B are equal (${F} N) and opposite, on different bodies`);
  check(okNet, `pair: drawn net force on A = ${P - F} N = ${mA} a and on B = ${F} N = ${mB} a with a = ${a} m s⁻²`);
  return svgDoc(w, h, 'Two blocks of 3 and 5 kilograms in contact on a smooth floor, pushed by a 24 newton force on the 3 kilogram block: both accelerate at 3 metres per second squared, and the blocks push each other with equal and opposite forces of 15 newtons on different bodies', s);
})();

// ---------------------------------------------------------------- INCL: block at rest on a rough incline
export const INCL_DATA = { m: 4, theta: 30, k: 2 };
INCL_DATA.W = INCL_DATA.m * g;
INCL_DATA.N = INCL_DATA.W * Math.cos(rad(INCL_DATA.theta));
INCL_DATA.f = INCL_DATA.W * Math.sin(rad(INCL_DATA.theta));
export const INCL = (() => {
  const { theta, k, W, N, f, m } = INCL_DATA;
  const t = rad(theta);
  const w = 420;
  const h = 290;
  const Ax = 30;
  const Ay = 264;
  const L = 330;
  const Bx = Ax + L * Math.cos(t);
  const By = Ay - L * Math.sin(t);
  let s = S.path(`M${f1(Ax)} ${Ay} L${f1(Bx)} ${f1(By)} L${f1(Bx)} ${Ay} Z`, { c: 'currentColor', fill: FILL, fop: 0.5, w: 1.5 });
  s += S.path(`M${f1(Ax + 46)} ${Ay} A46 46 0 0 0 ${f1(Ax + 46 * Math.cos(t))} ${f1(Ay - 46 * Math.sin(t))}`, { c: 'currentColor', w: 1 });
  s += S.text(Ax + 52, Ay - 6, `θ = ${theta}°`, { size: 11, w: 'bold' });
  const along = [Math.cos(t), -Math.sin(t)]; // up the slope (screen)
  const nrm = [-Math.sin(t), -Math.cos(t)]; // out of the slope
  const sC = 200;
  const half = 24;
  const hh = 15;
  const base = [Ax + sC * along[0], Ay + sC * along[1]];
  const corner = (u, n) => [base[0] + u * along[0] + n * nrm[0], base[1] + u * along[1] + n * nrm[1]];
  const pts = [corner(-half, 0), corner(half, 0), corner(half, 2 * hh), corner(-half, 2 * hh)];
  s += S.path(`M${pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L')} Z`, { c: BLUE, fill: BLUE, fop: 0.25 });
  const C = corner(0, hh);
  s += S.circle(C[0], C[1], 3, { fill: 'currentColor' });
  const Wv = [0, k * W];
  const Nv = [k * N * nrm[0], k * N * nrm[1]];
  const fv = [k * f * along[0], k * f * along[1]];
  const Wd = [-k * f * along[0], -k * f * along[1]];
  const Wn = [-k * N * nrm[0], -k * N * nrm[1]];
  s += S.line(C[0], C[1], C[0] + Wd[0], C[1] + Wd[1], { c: RED, w: 1, dash: '4 3' }) + S.line(C[0], C[1], C[0] + Wn[0], C[1] + Wn[1], { c: RED, w: 1, dash: '4 3' });
  s += vec(C[0], C[1], Wv[0], Wv[1], { c: RED, w: 2.2 }) + vec(C[0], C[1], Nv[0], Nv[1], { c: GRN, w: 2.2 }) + vec(C[0], C[1], fv[0], fv[1], { c: ACC, w: 2.2 });
  s += S.text(C[0] + 8, C[1] + Wv[1] - 2, `W = mg = ${v1(W)} N`, { size: 10, c: RED, w: 'bold' });
  s += S.text(C[0] + Nv[0] - 6, C[1] + Nv[1] - 4, `N = ${v1(N)} N`, { a: 'end', size: 10, c: GRN, w: 'bold' });
  s += S.text(C[0] + fv[0] + 8, C[1] + fv[1] + 2, `f = ${v1(f)} N`, { size: 10, c: ACC, w: 'bold' });
  s += S.text(Ax + 8, 18, `Block of ${m} kg at rest: mg sin θ = f and mg cos θ = N`, { size: 11, w: 'bold' });
  s += S.text(Ax + 8, 34, 'Dashed lines: the two components of the weight. Scale: 2 px per newton.', { size: 10 });
  const net = sum([Wv, Nv, fv]);
  check(mag(net) / k < 1e-9, `incl: drawn weight, normal reaction and friction sum to zero (net ${mag(net).toExponential(1)} px) for a ${m} kg block at rest on ${theta}°`);
  const okAng = near(Math.atan2(Math.abs(Nv[0]), Math.abs(Nv[1])), t, 1e-9) && near(f / N, Math.tan(t), 1e-9) && near(f, 19.6, 1e-9) && near(N, 33.948, 1e-4);
  check(okAng, `incl: normal reaction drawn ${theta}° from the vertical; f/N = tan θ = ${v2(f / N)} (needs μs at least 0.58); f = ${v1(f)} N, N = ${v1(N)} N`);
  return svgDoc(w, h, 'A block of 4 kilograms at rest on a rough slope of 30 degrees with three forces drawn from its centre: weight 39.2 newtons straight down, normal reaction 33.9 newtons perpendicular to the slope, and friction 19.6 newtons up the slope, which balance exactly', s);
})();

// ---------------------------------------------------------------- PULLEY: block on a smooth table joined over a pulley to a hanging block
export const PULLEY_DATA = { m1: 3, m2: 2, k: 4 };
Object.assign(PULLEY_DATA, tablePulley(PULLEY_DATA.m1, PULLEY_DATA.m2, 0));
export const PULLEY = (() => {
  const { m1, m2, k, a, T } = PULLEY_DATA;
  const w = 420;
  const h = 270;
  const ty = 80;
  let s = S.rect(20, ty, 230, 18, { c: 'currentColor', fill: FILL, fop: 0.6 });
  s += S.circle(262, ty - 2, 13, { c: 'currentColor', fill: FILL, fop: 0.6 });
  const b1x = 100;
  s += S.rect(b1x, ty - 34, 50, 34, { c: BLUE, fill: BLUE, fop: 0.25 }) + S.text(b1x + 5, ty - 5, `${m1} kg`, { size: 11 });
  s += S.line(b1x + 50, ty - 17, 262, ty - 17, { w: 1.2 });
  const b2y = 130;
  s += S.line(275, ty - 2, 275, b2y, { w: 1.2 }) + S.rect(255, b2y, 40, 40, { c: GRN, fill: GRN, fop: 0.25 }) + S.text(302, b2y + 16, `${m2} kg`, { size: 11 });
  const c1 = [b1x + 25, ty - 17];
  const T1 = [k * T, 0];
  s += S.circle(c1[0], c1[1], 3, { fill: 'currentColor' }) + vec(c1[0], c1[1], T1[0], 0, { c: ACC, w: 2.2 });
  s += S.text(c1[0] + 8, ty - 40, `T = ${v2(T)} N`, { size: 10, c: ACC, w: 'bold' });
  const c2 = [275, b2y + 20];
  const Tv = [0, -k * T];
  const Wv = [0, k * m2 * g];
  s += S.circle(c2[0], c2[1], 3, { fill: 'currentColor' }) + vec(c2[0], c2[1], 0, Tv[1], { c: ACC, w: 2.2 }) + vec(c2[0], c2[1], 0, Wv[1], { c: RED, w: 2.2 });
  s += S.text(c2[0] + 24, c2[1] - 40, `T = ${v2(T)} N`, { size: 10, c: ACC, w: 'bold' });
  s += S.text(c2[0] + 10, c2[1] + Wv[1] - 6, `W = ${v2(m2 * g)} N`, { size: 10, c: RED, w: 'bold' });
  s += S.text(302, b2y + 32, 'moves down', { size: 10 }) + S.text(20, 124, `a = m₂ g/(m₁ + m₂) = ${v2(a)} m s⁻²`, { size: 11, w: 'bold' });
  s += S.text(20, 142, `T = m₁ a = ${v2(T)} N`, { size: 11 });
  s += S.text(20, 160, `Block 2: m₂ g − T = ${v2(m2 * g)} − ${v2(T)} = ${v2(m2 * g - T)} N = m₂ a`, { size: 10 });
  s += S.text(w / 2, h - 6, 'Light string and smooth pulley: the tension is the same on both sides. Scale: 4 px per newton.', { a: 'middle', size: 10 });
  const okA = near(sum([Tv, Wv])[1] / k, m2 * a, 1e-9) && near(T1[0] / k, m1 * a, 1e-9);
  check(okA, `pulley: drawn net force on the ${m2} kg block = ${v2(m2 * g - T)} N = m₂ a and on the ${m1} kg block = ${v2(T)} N = m₁ a, with a = ${v2(a)} m s⁻²`);
  check(near(a, 3.92, 1e-12) && near(T, 11.76, 1e-12), `pulley: a = ${v2(a)} m s⁻², T = ${v2(T)} N`);
  return svgDoc(w, h, 'A 3 kilogram block on a smooth table joined by a string over a pulley to a 2 kilogram block hanging from the edge: the string tension of 11.76 newtons pulls the table block forward and the hanging block up, while its weight of 19.6 newtons pulls it down, giving both an acceleration of 3.92 metres per second squared', s);
})();

// ---------------------------------------------------------------- LIFT: apparent weight in a lift
export const LIFT_DATA = { m: 60, a: 1.5, k: 0.08 };
LIFT_DATA.W = LIFT_DATA.m * g;
LIFT_DATA.cases = [
  { name: 'accelerating up', a: LIFT_DATA.a, N: LIFT_DATA.m * (g + LIFT_DATA.a) },
  { name: 'steady speed', a: 0, N: LIFT_DATA.m * g },
  { name: 'accelerating down', a: -LIFT_DATA.a, N: LIFT_DATA.m * (g - LIFT_DATA.a) },
];
export const LIFT = (() => {
  const { m, k, W, cases } = LIFT_DATA;
  const w = 420;
  const h = 262;
  let s = '';
  const results = [];
  const mn = (x) => String(Math.round(x)).replace('-', '−');
  cases.forEach((c, i) => {
    const cx = 70 + i * 140;
    s += S.rect(cx - 55, 36, 110, 130, { c: 'currentColor', fill: FILL, fop: 0.4, sw: 1.5 });
    s += S.text(cx, 26, c.name, { a: 'middle', size: 11, w: 'bold' });
    s += S.circle(cx, 66, 8, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.line(cx, 74, cx, 112, { c: BLUE, w: 3 }) + S.line(cx, 112, cx - 8, 150, { c: BLUE, w: 3 }) + S.line(cx, 112, cx + 8, 150, { c: BLUE, w: 3 });
    const c0 = [cx, 96];
    const Nv = [0, -k * c.N];
    const Wv = [0, k * W];
    s += S.circle(c0[0], c0[1], 3, { fill: 'currentColor' }) + vec(c0[0] + 16, c0[1], 0, Nv[1], { c: GRN, w: 2.2 }) + vec(c0[0] - 16, c0[1], 0, Wv[1], { c: RED, w: 2.2 });
    s += S.text(c0[0] + 22, c0[1] + Nv[1] + 8, 'N', { size: 11, c: GRN, w: 'bold' }) + S.text(c0[0] - 22, c0[1] + Wv[1] - 6, 'mg', { a: 'end', size: 11, c: RED, w: 'bold' });
    s += S.text(cx, 182, `a = ${c.a === 0 ? '0' : `${c.a > 0 ? '↑' : '↓'} ${Math.abs(c.a)} m s⁻²`}`, { a: 'middle', size: 10 });
    s += S.text(cx, 196, `N = ${Math.round(c.N)} N`, { a: 'middle', size: 10, c: GRN, w: 'bold' }) + S.text(cx, 210, `mg = ${Math.round(W)} N`, { a: 'middle', size: 10, c: RED, w: 'bold' });
    s += S.text(cx, 224, `N − mg = ${mn(c.N - W)} N`, { a: 'middle', size: 10, w: 'bold' });
    results.push({ netPx: -(Nv[1] + Wv[1]), want: m * c.a * k });
  });
  s += S.text(w / 2, h - 8, `${m} kg person on a weighing scale; the scale reads N. Scale: 0.08 px per newton.`, { a: 'middle', size: 10 });
  check(results.every((q) => Math.abs(q.netPx - q.want) < 1e-9), `lift: drawn N − mg equals m a in all three cases (${cases.map((c) => Math.round(c.N)).join(', ')} N for mg = ${Math.round(W)} N)`);
  check(cases[0].N > W && near(cases[1].N, W, 1e-12) && cases[2].N < W, 'lift: reading above mg when the acceleration is up, equal at steady speed, below mg when it is down');
  return svgDoc(w, h, 'Three lifts with a 60 kilogram person on a weighing scale: accelerating up at 1.5 metres per second squared the scale reads 678 newtons, at steady speed 588 newtons, accelerating down at 1.5 the scale reads 498 newtons, because the net force is the scale reading minus the weight', s);
})();

// ---------------------------------------------------------------- ROPES: a lamp on two ropes and the force triangle
export const ROPES_DATA = { m: 5, a1: 37, a2: 53, k: 2 };
{
  const { m, a1, a2 } = ROPES_DATA;
  const W = m * g;
  const [T1, T2] = solveLin([[-Math.cos(rad(a1)), Math.cos(rad(a2))], [Math.sin(rad(a1)), Math.sin(rad(a2))]], [0, W]);
  Object.assign(ROPES_DATA, { W, T1, T2 });
}
export const ROPES = (() => {
  const { m, a1, a2, k, W, T1, T2 } = ROPES_DATA;
  const w = 420;
  const h = 262;
  const t1 = rad(a1);
  const t2 = rad(a2);
  const O = [150, 118];
  let s = S.line(10, 30, 250, 30, { w: 3 }) + S.text(130, 18, 'ceiling', { a: 'middle', size: 10 });
  const lenL = (O[1] - 30) / Math.sin(t1);
  const lenR = (O[1] - 30) / Math.sin(t2);
  const L = [O[0] - lenL * Math.cos(t1), 30];
  const Rr = [O[0] + lenR * Math.cos(t2), 30];
  s += S.line(O[0], O[1], L[0], L[1], { w: 1.8 }) + S.line(O[0], O[1], Rr[0], Rr[1], { w: 1.8 });
  s += S.line(O[0], O[1], O[0], O[1] + 30, { w: 1.8 }) + S.circle(O[0], O[1] + 42, 12, { c: ACC, fill: ACC, fop: 0.3 }) + S.text(O[0] + 18, O[1] + 46, `lamp ${m} kg`, { size: 10 });
  s += S.circle(O[0], O[1], 3, { fill: 'currentColor' });
  s += S.text(L[0] + 52, 48, `${a1}°`, { size: 10, w: 'bold' }) + S.text(Rr[0] - 30, 52, `${a2}°`, { a: 'end', size: 10, w: 'bold' });
  s += S.text(O[0] - 60, O[1] + 104, `T₁ = ${v2(T1)} N   T₂ = ${v2(T2)} N`, { size: 10 }) + S.text(O[0] - 60, O[1] + 118, `W = ${v2(W)} N`, { size: 10 });
  const A = [330, 70];
  const Wv = [0, k * W];
  const T1v = [-k * T1 * Math.cos(t1), -k * T1 * Math.sin(t1)];
  const T2v = [k * T2 * Math.cos(t2), -k * T2 * Math.sin(t2)];
  const B = [A[0] + Wv[0], A[1] + Wv[1]];
  const Cc = [B[0] + T1v[0], B[1] + T1v[1]];
  s += S.arrow(A[0], A[1], B[0], B[1], { c: RED, w: 2.2 }) + S.arrow(B[0], B[1], Cc[0], Cc[1], { c: BLUE, w: 2.2 }) + S.arrow(Cc[0], Cc[1], Cc[0] + T2v[0], Cc[1] + T2v[1], { c: GRN, w: 2.2 });
  s += S.text(A[0] + 8, (A[1] + B[1]) / 2, 'W', { size: 11, c: RED, w: 'bold' }) + S.text((B[0] + Cc[0]) / 2 - 8, (B[1] + Cc[1]) / 2 + 14, 'T₁', { a: 'end', size: 11, c: BLUE, w: 'bold' }) + S.text(Cc[0] + T2v[0] / 2 - 8, Cc[1] + T2v[1] / 2 - 4, 'T₂', { a: 'end', size: 11, c: GRN, w: 'bold' });
  s += S.text(330, 20, 'Force triangle', { a: 'middle', size: 11, w: 'bold' }) + S.text(330, 36, 'closes: W + T₁ + T₂ = 0', { a: 'middle', size: 10 });
  s += S.text(w / 2, h - 5, 'Equilibrium of the knot: the three forces add to zero. Scale: 2 px per newton.', { a: 'middle', size: 10 });
  const closure = [Cc[0] + T2v[0] - A[0], Cc[1] + T2v[1] - A[1]];
  check(mag(closure) < 1e-9, `ropes: the drawn force triangle closes (gap ${mag(closure).toExponential(1)} px): T₁ = ${v2(T1)} N, T₂ = ${v2(T2)} N for W = ${v2(W)} N`);
  const horiz = T1 * Math.cos(t1) - T2 * Math.cos(t2);
  const vert = T1 * Math.sin(t1) + T2 * Math.sin(t2) - W;
  check(Math.abs(horiz) < 1e-9 && Math.abs(vert) < 1e-9 && near(T1, W * Math.sin(t1), 1e-9) && near(T2, W * Math.sin(t2), 1e-9), 'ropes: horizontal and vertical components of T₁ and T₂ balance (the ropes are at right angles, so T₁ = W sin 37° and T₂ = W sin 53°)');
  return svgDoc(w, h, 'A 5 kilogram lamp hung from a knot by two ropes at 37 and 53 degrees to the ceiling, with the force triangle of the weight and the two tensions drawn tip to tail, closing on itself, so the knot is in equilibrium with tensions of 29.5 and 39.1 newtons', s);
})();

// ---------------------------------------------------------------- RECOIL: momentum of rifle and bullet
export const RECOIL_DATA = { M: 3.6, m: 0.012, v: 600, k: 10 };
RECOIL_DATA.p = RECOIL_DATA.m * RECOIL_DATA.v;
RECOIL_DATA.V = RECOIL_DATA.p / RECOIL_DATA.M;
export const RECOIL = (() => {
  const { M, m, v, k, p, V } = RECOIL_DATA;
  const w = 420;
  const h = 230;
  let s = S.text(10, 18, 'Before firing: rifle and bullet at rest, total momentum 0', { size: 11, w: 'bold' });
  s += S.rect(150, 34, 90, 16, { c: BLUE, fill: BLUE, fop: 0.25, rx: 3 }) + S.circle(160, 42, 3, { c: RED, fill: RED });
  s += S.text(10, 100, 'After firing: equal and opposite momenta', { size: 11, w: 'bold' });
  const y = 140;
  s += S.rect(150, y - 8, 90, 16, { c: BLUE, fill: BLUE, fop: 0.25, rx: 3 }) + S.circle(258, y, 3, { c: RED, fill: RED });
  const pr = [-k * (M * V), 0];
  const pb = [k * (m * v), 0];
  s += S.arrow(150, y + 22, 150 + pr[0], y + 22, { c: BLUE, w: 2.4 }) + S.arrow(264, y + 22, 264 + pb[0], y + 22, { c: RED, w: 2.4 });
  s += S.lines(100, y + 44, ['rifle: M V', `= ${M} × ${V} = ${v1(M * V)} kg m s⁻¹`], { a: 'middle', size: 10, c: BLUE, w: 'bold', dy: 13 }) + S.lines(318, y + 44, ['bullet: m v', `= ${m} × ${v} = ${v1(m * v)} kg m s⁻¹`], { a: 'middle', size: 10, c: RED, w: 'bold', dy: 13 });
  s += S.text(150, y - 16, `V = ${V} m s⁻¹ backward`, { a: 'end', size: 10 }) + S.text(264, y - 14, `v = ${v} m s⁻¹`, { size: 10 });
  s += S.text(w / 2, h - 18, 'Momentum arrows are drawn to scale: 10 px per kg m s⁻¹.', { a: 'middle', size: 10 }) + S.text(w / 2, h - 5, 'The speeds are not to scale: 600 m s⁻¹ against 2.0 m s⁻¹.', { a: 'middle', size: 10 });
  check(near(Math.abs(pr[0]), pb[0], 1e-9) && near(pr[0] + pb[0], 0, 1e-9) && near(V, 2, 1e-12) && near(p, 7.2, 1e-12), `recoil: momenta ${v1(M * V)} and ${v1(m * v)} kg m s⁻¹ drawn equal and opposite (sum ${v1(pr[0] + pb[0])}); V = ${V} m s⁻¹`);
  return svgDoc(w, h, 'A rifle of 3.6 kilograms firing a 12 gram bullet at 600 metres per second: before firing everything is at rest with zero total momentum; after firing the bullet has 7.2 kilogram metres per second forward and the rifle has the same momentum backward, so the recoil speed is 2.0 metres per second', s);
})();

// ---------------------------------------------------------------- ROAD: level circular road (top view) and banked road (cross-section)
export const ROAD_DATA = { m: 1000, r: 100, theta: 15, mu: 0.3, k: 0.006, mu0: 0.5, r0: 50 };
{
  const { m, r, theta, mu, mu0, r0 } = ROAD_DATA;
  const t = rad(theta);
  const N = (m * g) / (Math.cos(t) - mu * Math.sin(t));
  Object.assign(ROAD_DATA, { N, f: mu * N, vmax: bankLimit(theta, mu, r, 'max'), fLevel: mu0 * m * g, vLevel: Math.sqrt(mu0 * g * r0) });
}
export const ROAD = (() => {
  const { m, r, theta, mu, k, N, f, vmax, mu0, r0, fLevel, vLevel } = ROAD_DATA;
  const t = rad(theta);
  const w = 420;
  const h = 262;
  const cx = 78;
  const cy = 130;
  const R = 62;
  let s = S.text(10, 16, 'Level road (top view)', { size: 11, w: 'bold' }) + S.text(222, 16, `Banked road, ${theta}° (cross-section)`, { size: 11, w: 'bold' });
  s += S.circle(cx, cy, R, { c: MUT, sw: 12, fill: 'none' }) + S.circle(cx, cy, R, { c: 'currentColor', sw: 1.2, dash: '5 4' });
  s += S.circle(cx, cy, 3, { fill: 'currentColor' }) + S.text(cx + 6, cy + 14, 'centre', { size: 10 });
  const carx = cx + R;
  s += S.rect(carx - 7, cy - 11, 14, 22, { c: BLUE, fill: BLUE, fop: 0.35, rx: 2 });
  const fLen = 54;
  s += S.arrow(carx, cy, carx - fLen, cy, { c: ACC, w: 2.4 });
  s += S.text(cx + 14, cy - 10, `f = ${Math.round(fLevel)} N`, { a: 'middle', size: 10, c: ACC, w: 'bold' });
  s += S.text(cx, cy + R + 28, `m = ${m} kg, r = ${r0} m, μ = ${mu0}`, { a: 'middle', size: 10 }) + S.text(cx, cy + R + 43, `f = m v²/r gives v = ${v1(vLevel)} m s⁻¹`, { a: 'middle', size: 10, w: 'bold' });
  const Bx = 215;
  const By = 165;
  const Lr = 170;
  const rightX = Bx + Lr * Math.cos(t);
  const rightY = By - Lr * Math.sin(t);
  s += S.path(`M${Bx} ${By} L${f1(rightX)} ${f1(rightY)} L${f1(rightX)} ${By} Z`, { c: 'currentColor', fill: FILL, fop: 0.5 });
  s += S.text(165, 205, `centre of the curve: to the left; r = ${r} m`, { size: 10 }) + S.text(165, 219, `μ = ${mu}: friction acts down the slope`, { size: 10 }) + S.text(165, 233, `v max = ${v1(vmax)} m s⁻¹`, { size: 10, w: 'bold' });
  const along = [Math.cos(t), -Math.sin(t)];
  const nrm = [-Math.sin(t), -Math.cos(t)];
  const corner = (u, n) => [Bx + 95 * along[0] + u * along[0] + n * nrm[0], By + 95 * along[1] + u * along[1] + n * nrm[1]];
  const box = [corner(-20, 0), corner(20, 0), corner(20, 22), corner(-20, 22)];
  s += S.path(`M${box.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L')} Z`, { c: BLUE, fill: BLUE, fop: 0.3 });
  const C0 = corner(0, 11);
  const Wv = [0, k * m * g];
  const Nv = [k * N * nrm[0], k * N * nrm[1]];
  const fv = [-k * f * along[0], -k * f * along[1]]; // down the slope: the car is about to skid outwards
  s += S.circle(C0[0], C0[1], 3, { fill: 'currentColor' }) + vec(C0[0], C0[1], Wv[0], Wv[1], { c: RED, w: 2.2 }) + vec(C0[0], C0[1], Nv[0], Nv[1], { c: GRN, w: 2.2 }) + vec(C0[0], C0[1], fv[0], fv[1], { c: ACC, w: 2.2 });
  const net = sum([Wv, Nv, fv]);
  const need = (m * vmax ** 2) / r;
  s += S.arrow(C0[0] - 28, C0[1] - 44, C0[0] - 28 + net[0], C0[1] - 44, { c: 'currentColor', w: 1.6, dash: '4 3' });
  s += S.lines(C0[0] - 70, C0[1] - 52, ['net = m v²/r', `= ${Math.round(need)} N`], { a: 'end', size: 10, w: 'bold', dy: 12 });
  s += S.text(C0[0] + 8, C0[1] + Wv[1] - 2, `mg = ${Math.round(m * g)} N`, { size: 10, c: RED }) + S.text(C0[0] + Nv[0] - 4, C0[1] + Nv[1] - 4, `N = ${Math.round(N)} N`, { a: 'end', size: 10, c: GRN }) + S.text(C0[0] + fv[0] - 4, C0[1] + fv[1] + 14, `f = μ N = ${Math.round(f)} N`, { a: 'end', size: 10, c: ACC });
    s += S.text(w / 2, h - 4, 'Scale: 0.006 px per newton; the dashed arrow is the net horizontal force toward the centre.', { a: 'middle', size: 10 });
  const okNet = Math.abs(net[1]) / k < 1e-6 && near(-net[0] / k, need, 1e-9);
  check(okNet, `road: on the banked road the drawn weight, N and f leave no vertical force and a horizontal net ${Math.round(need)} N = m v²/r for v = ${v1(vmax)} m s⁻¹ (m = ${m} kg, r = ${r} m)`);
  check(near(fLevel, (m * vLevel ** 2) / r0, 1e-9) && near(f, mu * N, 1e-12) && near(Math.atan2(-Nv[0], -Nv[1]), t, 1e-9), `road: level road friction μ m g = ${Math.round(fLevel)} N = m v²/r at v = ${v1(vLevel)} m s⁻¹; banked: N drawn ${theta}° from the vertical, f = μ N`);
  return svgDoc(w, h, 'Left, a car on a level circular road seen from above: friction between tyres and road points to the centre and supplies the centripetal force. Right, a car on a road banked at 15 degrees with its weight, normal reaction and friction down the slope, whose resultant is horizontal and points to the centre of the curve', s);
})();

// ---------------------------------------------------------------- CIRC: uniform circular motion, velocity and acceleration
export const CIRC_DATA = { r: 0.8, v: 5, R: 70, kv: 8, ka: 1.2 };
CIRC_DATA.a = CIRC_DATA.v ** 2 / CIRC_DATA.r;
export const CIRC = (() => {
  const { r, v, R, kv, ka, a } = CIRC_DATA;
  const w = 420;
  const h = 230;
  const cx = 130;
  const cy = 112;
  let s = S.circle(cx, cy, R, { c: MUT, sw: 1.2, dash: '4 3' }) + S.circle(cx, cy, 3, { fill: 'currentColor' });
  s += S.text(cx - 14, cy + 14, 'O', { size: 11, w: 'bold' });
  let okDot = true;
  let okLen = true;
  const senses = [];
  for (const ang of [0, 90, 180, 270]) {
    const th = rad(ang);
    const P = [cx + R * Math.cos(th), cy - R * Math.sin(th)];
    const tv = [-Math.sin(th) * kv * v, -Math.cos(th) * kv * v]; // anticlockwise on screen
    const av = [((cx - P[0]) / R) * ka * a, ((cy - P[1]) / R) * ka * a];
    s += S.circle(P[0], P[1], 5, { c: BLUE, fill: BLUE, fop: 0.4 }) + vec(P[0], P[1], tv[0], tv[1], { c: GRN, w: 2 }) + vec(P[0], P[1], av[0], av[1], { c: RED, w: 2 });
    okDot = okDot && Math.abs(tv[0] * av[0] + tv[1] * av[1]) < 1e-9;
    const turn = (P[0] - cx) * tv[1] - (P[1] - cy) * tv[0];
    senses.push(Math.sign(Math.round(turn)));
    okLen = okLen && near(mag(tv) / kv, v, 1e-9) && near(mag(av) / ka, a, 1e-9);
  }
  s += S.line(cx, cy, cx + R, cy, { c: 'currentColor', w: 1 }) + S.text(cx + R / 2 + 8, cy + 14, 'r', { a: 'middle', size: 11, w: 'bold' });
  s += S.rect(262, 36, 12, 3, { c: GRN, fill: GRN }) + S.text(280, 42, 'velocity v (tangent)', { size: 10 }) + S.rect(262, 54, 12, 3, { c: RED, fill: RED }) + S.text(280, 60, 'acceleration a (to the centre)', { size: 10 });
  s += S.lines(262, 100, [`r = ${r} m, v = ${v} m s⁻¹`, `a = v²/r = ${a} m s⁻²`, 'speed constant,', 'velocity changes direction', 'a is at right angles to v'], { size: 11, dy: 16 });
  s += S.text(w / 2, h - 4, 'Equal-length v arrows and equal-length a arrows: uniform circular motion.', { a: 'middle', size: 10 });
  check(okDot && senses.every((x) => x === senses[0] && x !== 0), 'circ: at all four positions the drawn velocity (tangent) and acceleration (to the centre) are perpendicular, and all four velocities turn the same way round the circle');
  check(okLen && near(a, 31.25, 1e-12), `circ: drawn |v| = ${v} m s⁻¹ and |a| = v²/r = ${a} m s⁻² are the same at all four positions`);
  return svgDoc(w, h, 'A stone moving in a circle of radius 0.8 metres at a steady 5 metres per second, shown at four positions: the velocity arrows are tangents of equal length and the acceleration arrows all point to the centre with equal length 31.25 metres per second squared, always at right angles to the velocity', s);
})();

export const ALL = { PAIR, INCL, PULLEY, LIFT, ROPES, RECOIL, ROAD, CIRC };
