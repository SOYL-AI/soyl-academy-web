// ISC 11 ch05 diagrams, all drawn from computed forces with self-checks (every drawn arrow is read back from its pixel
// coordinates and compared with the physics): an action-reaction pair on two skaters, an impulse (force-time area),
// gun recoil momenta, a block on a smooth table joined to a hanging mass, an Atwood machine, two blocks in contact, a lift
// in three states, a block on a smooth incline, a lamp on two strings with its force triangle, and a ladder against a smooth wall.
import { svgDoc, S, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, atwood, tableHang, liftN, lamp, ladder, solveLin } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const d1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
const d2 = (n) => (Math.round(n * 100) / 100).toFixed(2);
const d3 = (n) => (Math.round(n * 1000) / 1000).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const T = (x, y, s, o = {}) => S.text(x, y, s, { size: 10, ...o });

/** Force arrow from (x, y), components (fx right, fy up) in newtons at `s` px per newton; records the drawn pixel vector. */
function fa(rec, name, x, y, fx, fy, s, { c = 'currentColor', w = 2, size = 7, dash } = {}) {
  const x2 = x + s * fx;
  const y2 = y - s * fy;
  rec[name] = { x1: x, y1: y, x2, y2 };
  return S.arrow(x, y, x2, y2, { c, w, size, dash });
}
/** Force read back from a recorded arrow, in newtons (fx right, fy up). */
const rd = (rec, name, s) => [(rec[name].x2 - rec[name].x1) / s, (rec[name].y1 - rec[name].y2) / s];

// ---------------------------------------------------------------- PAIR: two skaters push off each other
export const PAIR_DATA = { mA: 40, mB: 50, F: 50, ca: 145, cb: 240, y: 65, s: 1, as: 40 };
export const PAIR = (() => {
  const { mA, mB, F, ca, cb, y, s, as } = PAIR_DATA;
  const w = 420;
  const h = 190;
  const rec = {};
  let sv = S.line(40, 100, 380, 100, { w: 2 });
  sv += S.rect(100, 40, 90, 60, { fill: FILL, c: MUT, sw: 1.2 }) + S.rect(190, 40, 100, 60, { fill: FILL, c: MUT, sw: 1.2 });
  sv += T(145, 92, `A: ${mA} kg`, { a: 'middle' }) + T(240, 92, `B: ${mB} kg`, { a: 'middle' });
  sv += fa(rec, 'FonA', ca, y, -F, 0, s, { c: RED, w: 2.4 });
  sv += fa(rec, 'FonB', cb, y, F, 0, s, { c: BLUE, w: 2.4 });
  sv += S.circle(ca, y, 2.6, { c: RED, fill: RED }) + S.circle(cb, y, 2.6, { c: BLUE, fill: BLUE });
  sv += T(ca - 50, 36, `force of B on A: ${F} N`, { a: 'start', c: RED });
  sv += T(cb + 50, 36, `force of A on B: ${F} N`, { a: 'end', c: BLUE });
  const aA = F / mA;
  const aB = F / mB;
  sv += fa(rec, 'aA', ca, 125, -aA, 0, as, { c: ACC, w: 2 });
  sv += fa(rec, 'aB', cb, 125, aB, 0, as, { c: ACC, w: 2 });
  sv += T(ca - 50, 147, `a = ${d2(aA)} m s⁻² to the left`, { a: 'start', c: ACC });
  sv += T(cb + 50, 161, `a = ${d2(aB)} m s⁻² to the right`, { a: 'end', c: ACC });
  sv += T(210, 181, 'equal and opposite forces, on different bodies; the lighter skater accelerates more', { a: 'middle' });
  const [fA] = rd(rec, 'FonA', s);
  const [fB] = rd(rec, 'FonB', s);
  const [xa] = rd(rec, 'aA', as);
  const [xb] = rd(rec, 'aB', as);
  check(near(fA, -fB, 1e-9) && near(Math.abs(fA), 50, 1e-9) && near(mA * Math.abs(xa), F, 1e-9) && near(mB * Math.abs(xb), F, 1e-9) && xa < 0 && xb > 0, `pair: the two drawn forces are ${F} N each, equal and opposite; m·a = ${mA} × ${d2(aA)} = ${mB} × ${d2(aB)} = ${F} N from the drawn acceleration arrows`);
  return svgDoc(w, h, 'Two skaters A of mass 40 kilograms and B of mass 50 kilograms in contact on smooth ice. A pushes B with a force of 50 newtons to the right and B pushes A with an equal force of 50 newtons to the left. The accelerations are 1.25 metres per second squared for A and 1 metre per second squared for B', sv);
})();

// ---------------------------------------------------------------- IMPULSE: force-time pulse of a bat on a ball
export const IMP_DATA = { m: 0.15, u: 20, v: 30, dt: 0.005, ox: 60, oy: 175, sx: 37500, sy: 0.04 };
export const IMPULSE = (() => {
  const { m, u, v, dt, ox, oy, sx, sy } = IMP_DATA;
  const w = 420;
  const h = 228;
  const J = m * (v + u);
  const Fmax = (2 * J) / dt;
  const Favg = J / dt;
  const x1 = ox + sx * dt;
  const xp = ox + (sx * dt) / 2;
  const yp = oy - sy * Fmax;
  const yav = oy - sy * Favg;
  let sv = S.arrow(ox, oy, ox + 305, oy, { w: 1.5, size: 6 }) + S.arrow(ox, oy, ox, 24, { w: 1.5, size: 6 });
  sv += T(ox + 305, oy + 14, 't (s)', { a: 'end' }) + T(ox - 6, 22, 'F (N)', { a: 'end' });
  sv += S.path(`M${f1(ox)} ${f1(oy)} L${f1(xp)} ${f1(yp)} L${f1(x1)} ${f1(oy)} Z`, { c: BLUE, w: 2, fill: FILL });
  sv += S.rect(ox, yav, x1 - ox, oy - yav, { c: ACC, sw: 1.6, dash: '5 3' });
  sv += S.line(ox, yp, xp, yp, { c: MUT, w: 1, dash: '3 3' }) + S.line(x1, oy, x1, oy + 5, { w: 1.2 });
  sv += T(ox - 6, yp + 4, `${Fmax} N`, { a: 'end' }) + T(ox - 6, yav + 4, `${Favg} N`, { a: 'end', c: ACC });
  sv += T(x1, oy + 16, `${dt} s`, { a: 'middle' });
  sv += T(xp + 8, yp - 6, `F max = ${Fmax} N`, { c: BLUE, w: 'bold' });
  sv += T(x1 + 12, 100, `area under the curve = impulse`, { c: BLUE });
  sv += T(x1 + 12, 114, `= ½ × ${Fmax} × ${dt} = ${J} N s`, { c: BLUE });
  sv += T(x1 + 12, 134, `dashed rectangle: the average`, { c: ACC });
  sv += T(x1 + 12, 148, `force ${Favg} N, same area`, { c: ACC });
  sv += T(ox, 207, `ball ${m} kg: ${u} m s⁻¹ in, ${v} m s⁻¹ out the other way`, { a: 'start' }) + T(ox, 221, `change in momentum = ${m} × (${v} + ${u}) = ${d1(m * (v + u))} kg m s⁻¹`, { a: 'start' });
  const area = (0.5 * (x1 - ox) * (oy - yp)) / (sx * sy);
  const areaRect = ((x1 - ox) * (oy - yav)) / (sx * sy);
  check(near(area, J, 1e-9) && near(areaRect, J, 1e-9) && near(J, m * v - m * -u, 1e-9) && near(J, 7.5, 1e-9) && near((x1 - ox) / sx, dt, 1e-9) && near((oy - yp) / sy, 3000, 1e-9), `impulse: triangle area read from the pixels = ${d3(area)} N s = rectangle area ${d3(areaRect)} N s = Δp = ${m} × (${v} + ${u}) = ${J}; F max ${Fmax} N, F avg ${Favg} N over ${dt} s`);
  return svgDoc(w, h, 'Graph of force against time for a bat striking a 0.15 kilogram ball: the force rises linearly to 3000 newtons and falls back to zero in 0.005 seconds. The area of the triangle is the impulse of 7.5 newton seconds, equal to the area of the dashed rectangle at the average force of 1500 newtons', sv);
})();

// ---------------------------------------------------------------- RECOIL: gun and bullet momenta
export const RECOIL_DATA = { M: 4, m: 0.02, v: 400, s: 18 };
export const RECOIL = (() => {
  const { M, m, v, s } = RECOIL_DATA;
  const w = 420;
  const h = 215;
  const p = m * v;
  const V = p / M;
  const rec = {};
  let sv = T(10, 16, 'Before firing: gun and bullet at rest, total momentum 0', { w: 'bold' });
  sv += S.rect(160, 28, 100, 20, { fill: FILL, c: MUT, sw: 1.2 }) + S.circle(232, 38, 4, { c: BLUE, fill: BLUE });
  sv += T(10, 88, 'After firing:', { w: 'bold' });
  sv += S.rect(110, 98, 100, 20, { fill: FILL, c: MUT, sw: 1.2 }) + S.circle(300, 108, 4, { c: BLUE, fill: BLUE });
  sv += S.arrow(105, 108, 105 - 30, 108, { c: RED, w: 1.6, size: 6 }) + S.arrow(308, 108, 338, 108, { c: BLUE, w: 1.6, size: 6 });
  sv += T(100, 126, `V = ${V} m s⁻¹`, { a: 'end', c: RED }) + T(340, 126, `v = ${v} m s⁻¹`, { a: 'end', c: BLUE });
  sv += T(210, 142, `${M} kg gun`, { a: 'middle' });
  const ox = 210;
  const y = 170;
  sv += fa(rec, 'pg', ox, y, -p, 0, s, { c: RED, w: 3 });
  sv += fa(rec, 'pb', ox, y, p, 0, s, { c: BLUE, w: 3 });
  sv += T(ox - 4, y - 8, `gun: ${p} kg m s⁻¹`, { a: 'end', c: RED }) + T(ox + 4, y - 8, `bullet: ${p} kg m s⁻¹`, { c: BLUE });
  sv += T(ox, y + 22, `momenta ${p} and ${p} kg m s⁻¹, equal and opposite: total after = 0 = total before`, { a: 'middle' });
  const [pg] = rd(rec, 'pg', s);
  const [pb] = rd(rec, 'pb', s);
  check(near(pb, p, 1e-9) && near(pg, -p, 1e-9) && near(pg + pb + 0, 0, 1e-9) && near(M * V, m * v, 1e-9) && near(p, 8, 1e-9) && near(V, 2, 1e-9), `recoil: bullet momentum ${m} × ${v} = ${p} kg m/s drawn ${d1(s * p)} px right; gun momentum ${M} × ${V} = ${p} drawn the same length left; drawn sum = ${d3(pg + pb)}`);
  return svgDoc(w, h, 'A gun of mass 4 kilograms fires a bullet of mass 0.02 kilograms at 400 metres per second. After firing, the bullet moves to the right with momentum 8 kilogram metres per second and the gun recoils to the left at 2 metres per second with the same momentum of 8, shown by two equal arrows pointing in opposite directions', sv);
})();

// ---------------------------------------------------------------- TABLEHANG: 3 kg on a smooth table, 2 kg hanging
export const TABLE_DATA = { m1: 3, m2: 2, s: 2, cx1: 262, cx2: 378, cy: 100 };
export const TABLEHANG = (() => {
  const { m1, m2, s, cx1, cx2, cy } = TABLE_DATA;
  const w = 420;
  const h = 200;
  const { a, T: Tn } = tableHang(m1, m2);
  const N = m1 * g;
  const W2 = m2 * g;
  const rec = {};
  let sv = S.line(10, 100, 146, 100, { w: 2 }) + S.rect(10, 100, 136, 10, { fill: FILL, c: MUT, sw: 1 });
  sv += S.circle(150, 94, 9, { c: MUT, sw: 1.5 });
  sv += S.rect(60, 70, 40, 30, { fill: FILL, c: MUT, sw: 1.4 }) + T(80, 89, `${m1} kg`, { a: 'middle' });
  sv += S.line(100, 85, 150, 85, { c: GRN, w: 1.5 }) + S.path('M150 85 A9 9 0 0 1 159 94', { c: GRN, w: 1.5 }) + S.line(159, 94, 159, 140, { c: GRN, w: 1.5 });
  sv += S.rect(144, 140, 30, 26, { fill: FILL, c: MUT, sw: 1.4 }) + T(159, 157, `${m2} kg`, { a: 'middle' });
  sv += T(10, 28, 'smooth table, light string,', {}) + T(10, 42, 'smooth pulley', {});
  sv += T(10, 188, `a = ${d2(a)} m s⁻²`, { c: ACC, w: 'bold' }) + T(100, 188, `T = ${d1(Tn)} N`, { c: GRN, w: 'bold' });
  // FBD of the block on the table
  sv += T(cx1, 18, `Forces on ${m1} kg`, { a: 'middle', w: 'bold' }) + T(cx2, 18, `Forces on ${m2} kg`, { a: 'middle', w: 'bold' });
  sv += fa(rec, 'N1', cx1, cy, 0, N, s, { c: BLUE }) + fa(rec, 'W1', cx1, cy, 0, -N, s, { c: RED }) + fa(rec, 'T1', cx1, cy, Tn, 0, s, { c: GRN });
  sv += S.circle(cx1, cy, 3, { c: 'currentColor', fill: 'currentColor' });
  sv += T(cx1 + 6, cy - s * N + 4, `N = ${d1(N)} N`, { c: BLUE }) + T(cx1 + 6, cy + s * N + 4, `W = ${d1(N)} N`, { c: RED }) + T(cx1 + s * Tn + 6, cy + 4, `T = ${d1(Tn)} N`, { c: GRN });
  sv += fa(rec, 'T2', cx2, cy, 0, Tn, s, { c: GRN }) + fa(rec, 'W2', cx2, cy, 0, -W2, s, { c: RED });
  sv += S.circle(cx2, cy, 3, { c: 'currentColor', fill: 'currentColor' });
  sv += T(cx2 - 6, cy - s * Tn + 4, `T = ${d1(Tn)} N`, { a: 'end', c: GRN }) + T(cx2 - 6, cy + s * W2 + 4, `W = ${d1(W2)} N`, { a: 'end', c: RED });
  const [, n1] = rd(rec, 'N1', s);
  const [, w1] = rd(rec, 'W1', s);
  const [t1] = rd(rec, 'T1', s);
  const [, t2] = rd(rec, 'T2', s);
  const [, w2] = rd(rec, 'W2', s);
  check(Math.abs(n1 + w1) < 1e-9 && near(t1, m1 * a, 1e-9) && near(t2 + w2, -m2 * a, 1e-9) && near(t1, t2, 1e-9) && near(a, (m2 * g) / (m1 + m2), 1e-9) && near(a, 3.92, 1e-9), `tablehang: drawn forces give ${m1} kg: net ${d3(t1)} N = ${m1} × ${d2(a)}; ${m2} kg: ${d3(-(t2 + w2))} N down = ${m2} × ${d2(a)}; one tension ${d1(Tn)} N on both; N = W = ${d1(N)} N`);
  return svgDoc(w, h, 'A 3 kilogram block on a smooth table is joined by a light string over a smooth pulley to a 2 kilogram block hanging at the edge. Free-body diagrams show the 3 kilogram block with weight and normal reaction of 29.4 newtons and tension 11.8 newtons, and the 2 kilogram block with weight 19.6 newtons down and tension 11.8 newtons up. The acceleration is 3.92 metres per second squared', sv);
})();

// ---------------------------------------------------------------- ATWOOD: 5 kg and 3 kg over a pulley
export const ATWOOD_DATA = { m1: 5, m2: 3, s: 1.2, cx1: 240, cx2: 340, cy: 105 };
export const ATWOODSVG = (() => {
  const { m1, m2, s, cx1, cx2, cy } = ATWOOD_DATA;
  const w = 420;
  const h = 210;
  const { a, T: Tn } = atwood(m1, m2);
  const W1 = m1 * g;
  const W2 = m2 * g;
  const rec = {};
  let sv = S.line(60, 14, 160, 14, { w: 2 }) + S.line(110, 14, 110, 26, { w: 1.5 }) + S.circle(110, 42, 16, { c: MUT, sw: 1.6 });
  sv += S.line(94, 42, 94, 112, { c: GRN, w: 1.5 }) + S.line(126, 42, 126, 78, { c: GRN, w: 1.5 });
  sv += S.rect(79, 112, 30, 30, { fill: FILL, c: MUT, sw: 1.4 }) + T(94, 131, `${m1} kg`, { a: 'middle' });
  sv += S.rect(114, 78, 24, 24, { fill: FILL, c: MUT, sw: 1.4 }) + T(126, 94, `${m2} kg`, { a: 'middle' });
  sv += S.arrow(60, 100, 60, 128, { c: ACC, w: 2, size: 6 }) + S.arrow(160, 128, 160, 100, { c: ACC, w: 2, size: 6 });
  sv += T(54, 118, 'a', { a: 'end', c: ACC, w: 'bold' }) + T(166, 118, 'a', { c: ACC, w: 'bold' });
  sv += T(10, 168, `a = ${d2(a)} m s⁻²`, { c: ACC, w: 'bold' }) + T(10, 184, `T = ${d2(Tn)} N`, { c: GRN, w: 'bold' });
  sv += T(cx1, 18, `Forces on ${m1} kg`, { a: 'middle', w: 'bold' }) + T(cx2, 18, `Forces on ${m2} kg`, { a: 'middle', w: 'bold' });
  sv += fa(rec, 'T1', cx1, cy, 0, Tn, s, { c: GRN }) + fa(rec, 'W1', cx1, cy, 0, -W1, s, { c: RED });
  sv += fa(rec, 'T2', cx2, cy, 0, Tn, s, { c: GRN }) + fa(rec, 'W2', cx2, cy, 0, -W2, s, { c: RED });
  sv += S.circle(cx1, cy, 3, { c: 'currentColor', fill: 'currentColor' }) + S.circle(cx2, cy, 3, { c: 'currentColor', fill: 'currentColor' });
  sv += T(cx1 + 6, cy - s * Tn + 4, `T = ${d2(Tn)} N`, { c: GRN }) + T(cx1 + 6, cy + s * W1 + 4, `W = ${d1(W1)} N`, { c: RED });
  sv += T(cx2 + 6, cy - s * Tn + 4, `T = ${d2(Tn)} N`, { c: GRN }) + T(cx2 - 6, cy + s * W2 + 4, `W = ${d1(W2)} N`, { a: 'end', c: RED });
  sv += T(cx1, 185, `net ${d2(W1 - Tn)} N down = ${m1} × ${d2(a)}`, { a: 'middle', c: ACC }) + T(cx2 + 10, 201, `net ${d2(Tn - W2)} N up = ${m2} × ${d2(a)}`, { a: 'middle', c: ACC });
  const [, t1] = rd(rec, 'T1', s);
  const [, w1] = rd(rec, 'W1', s);
  const [, t2] = rd(rec, 'T2', s);
  const [, w2] = rd(rec, 'W2', s);
  const lin = solveLin([[m1, 1], [m2, -1]], [m1 * g, -m2 * g]); // unknowns (a, T): m1 a + T = m1 g; m2 a - T = -m2 g
  check(near(-(t1 + w1), m1 * a, 1e-9) && near(t2 + w2, m2 * a, 1e-9) && near(t1, t2, 1e-9) && near(lin[0], a, 1e-9) && near(lin[1], Tn, 1e-9) && near(a, 2.45, 1e-9) && Tn > W2 && Tn < W1, `atwood: drawn forces give ${m1} kg: net ${d3(-(t1 + w1))} N down = ${m1} × ${d2(a)}; ${m2} kg: net ${d3(t2 + w2)} N up = ${m2} × ${d2(a)}; T = ${d2(Tn)} N lies between ${d1(W2)} N and ${d1(W1)} N (linear solve agrees)`);
  return svgDoc(w, h, 'An Atwood machine with a 5 kilogram and a 3 kilogram mass on a string over a smooth pulley. The heavier mass moves down and the lighter up, each with acceleration 2.45 metres per second squared. Free-body diagrams show tension 36.75 newtons up on both masses, weight 49 newtons on the 5 kilogram mass and weight 29.4 newtons on the 3 kilogram mass', sv);
})();

// ---------------------------------------------------------------- CONTACT: 4 kg pushing 2 kg
export const CONTACT_DATA = { m1: 4, m2: 2, F: 18, s: 4 };
export const CONTACT = (() => {
  const { m1, m2, F, s } = CONTACT_DATA;
  const w = 420;
  const h = 200;
  const a = F / (m1 + m2);
  const Fc = m2 * a;
  const rec = {};
  let sv = S.line(20, 82, 400, 82, { w: 2 });
  sv += S.rect(100, 42, 70, 40, { fill: FILL, c: MUT, sw: 1.4 }) + S.rect(170, 52, 50, 30, { fill: FILL, c: MUT, sw: 1.4 });
  sv += T(135, 66, `A  ${m1} kg`, { a: 'middle' }) + T(195, 71, `B  ${m2} kg`, { a: 'middle' });
  sv += S.arrow(20, 62, 100, 62, { c: ACC, w: 3, size: 8 }) + T(24, 52, `F = ${F} N`, { c: ACC, w: 'bold' });
  sv += S.arrow(250, 62, 300, 62, { c: GRN, w: 1.8, size: 6 }) + T(310, 66, `a = ${d2(a)} m s⁻²`, { c: GRN, w: 'bold' });
  sv += T(135, 112, 'Horizontal forces on A', { a: 'middle', w: 'bold' }) + T(330, 112, 'Horizontal forces on B', { a: 'middle', w: 'bold' });
  const ax = 135;
  const bx = 330;
  const y = 150;
  sv += fa(rec, 'F', ax, y, F, 0, s, { c: ACC }) + fa(rec, 'Ba', ax, y, -Fc, 0, s, { c: BLUE });
  sv += fa(rec, 'Ab', bx, y, Fc, 0, s, { c: BLUE });
  sv += S.circle(ax, y, 3, { c: 'currentColor', fill: 'currentColor' }) + S.circle(bx, y, 3, { c: 'currentColor', fill: 'currentColor' });
  sv += T(ax + s * F / 2, y - 8, `F = ${F} N`, { a: 'middle', c: ACC }) + T(ax - s * Fc / 2, y - 8, `${Fc} N`, { a: 'middle', c: BLUE });
  sv += T(bx + s * Fc / 2, y - 8, `${Fc} N`, { a: 'middle', c: BLUE });
  sv += T(ax, 176, `net ${F - Fc} N = ${m1} × ${a}`, { a: 'middle' }) + T(bx, 176, `net ${Fc} N = ${m2} × ${a}`, { a: 'middle' });
  sv += T(210, 194, 'the contact force on B and on A are a third-law pair: equal and opposite', { a: 'middle' });
  const [f1x] = rd(rec, 'F', s);
  const [cA] = rd(rec, 'Ba', s);
  const [cB] = rd(rec, 'Ab', s);
  check(near(f1x + cA, m1 * a, 1e-9) && near(cB, m2 * a, 1e-9) && near(cA, -cB, 1e-9) && near(a, 3, 1e-9) && near(Fc, 6, 1e-9) && near(Fc, (F * m2) / (m1 + m2), 1e-9), `contact: drawn forces give A net ${d3(f1x + cA)} N = ${m1} × ${a}, B net ${d3(cB)} N = ${m2} × ${a}; contact pair ${d3(cB)} N each way = F m2/(m1+m2)`);
  return svgDoc(w, h, 'A force of 18 newtons pushes a 4 kilogram block A which is in contact with a 2 kilogram block B on a smooth floor. Both move with acceleration 3 metres per second squared. A has the 18 newton force to the right and a 6 newton contact force from B to the left; B has a 6 newton contact force from A to the right', sv);
})();

// ---------------------------------------------------------------- LIFT: apparent weight in three states
export const LIFT_DATA = { m: 60, a: 1.5, s: 0.12 };
export const LIFTSVG = (() => {
  const { m, a, s } = LIFT_DATA;
  const w = 420;
  const h = 225;
  const W = m * g;
  const cases = [
    { cx: 72, a: a, label: `accelerating up at ${a} m s⁻²`, word: 'up' },
    { cx: 210, a: 0, label: 'at rest or constant velocity', word: 'none' },
    { cx: 348, a: -a, label: `accelerating down at ${a} m s⁻²`, word: 'down' },
  ];
  let sv = '';
  const cy = 100;
  const ok = [];
  for (const c of cases) {
    const rec = {};
    const N = liftN(m, c.a);
    sv += S.rect(c.cx - 55, 10, 110, 175, { c: MUT, sw: 1.6 });
    sv += fa(rec, 'N', c.cx, cy, 0, N, s, { c: BLUE, w: 2.4 }) + fa(rec, 'W', c.cx, cy, 0, -W, s, { c: RED, w: 2.4 });
    sv += S.circle(c.cx, cy, 3.4, { c: 'currentColor', fill: 'currentColor' });
    sv += T(c.cx + 6, cy - s * N + 6, `N = ${Math.round(N)} N`, { c: BLUE }) + T(c.cx + 6, cy + s * W - 2, `W = ${Math.round(W)} N`, { c: RED });
    sv += T(c.cx, 203, c.label, { a: 'middle' });
    sv += T(c.cx, 218, `N − W = ${(Math.round(N - W) > 0 ? '+' : '') + String(Math.round(N - W)).replace('-', '−')} N`, { a: 'middle', c: ACC, w: 'bold' });
    const [, ny] = rd(rec, 'N', s);
    const [, wy] = rd(rec, 'W', s);
    ok.push({ net: ny + wy, N: ny, expect: m * c.a });
  }
  check(ok.every((o) => near(o.net, o.expect, 1e-9) || (Math.abs(o.net) < 1e-9 && o.expect === 0)) && ok[0].N > W && near(ok[1].N, W, 1e-9) && ok[2].N < W && near(ok[0].N, 678, 1e-9) && near(ok[2].N, 498, 1e-9), `lift: drawn N − W = +${Math.round(ok[0].net)}, 0, ${Math.round(ok[2].net)} N = m a for a = +${a}, 0, −${a} m/s²; N = ${Math.round(ok[0].N)}, ${Math.round(ok[1].N)}, ${Math.round(ok[2].N)} N for ${m} kg`);
  return svgDoc(w, h, 'A 60 kilogram person in a lift in three states. Accelerating up at 1.5 metres per second squared the floor pushes with 678 newtons, more than the weight of 588 newtons. At rest or at constant velocity the push equals the weight, 588 newtons. Accelerating down at 1.5 metres per second squared the push is 498 newtons, less than the weight', sv);
})();

// ---------------------------------------------------------------- INCLINE: block on a smooth plane
export const INC_DATA = { m: 6, th: 30, s: 1.5, base: 250, x0: 20, y0: 200, d: 150, bw: 48, bh: 28 };
export const INCLINE = (() => {
  const { m, th, s, base, x0, y0, d, bw, bh } = INC_DATA;
  const w = 420;
  const h = 230;
  const c = Math.cos(rad(th));
  const sn = Math.sin(rad(th));
  const W = m * g;
  const N = W * c;
  const along = W * sn;
  const u = [c, -sn];
  const nrm = [-sn, -c];
  const apex = [x0 + base, y0 - base * Math.tan(rad(th))];
  let sv = S.path(`M${x0} ${y0} L${f1(apex[0])} ${f1(apex[1])} L${f1(apex[0])} ${y0} Z`, { c: 'currentColor', w: 1.8, fill: FILL });
  const corner = (dd, hh) => [x0 + dd * u[0] + hh * nrm[0], y0 + dd * u[1] + hh * nrm[1]];
  const pts = [corner(d - bw / 2, 0), corner(d + bw / 2, 0), corner(d + bw / 2, bh), corner(d - bw / 2, bh)];
  sv += S.path(`M${pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L')} Z`, { c: MUT, w: 1.6, fill: 'none' });
  const C = corner(d, bh / 2);
  const rec = {};
  rec.W = { x1: C[0], y1: C[1], x2: C[0], y2: C[1] + s * W };
  rec.N = { x1: C[0], y1: C[1], x2: C[0] + s * N * nrm[0], y2: C[1] + s * N * nrm[1] };
  const dn = [-c, sn];
  const into = [sn, c];
  sv += S.arrow(C[0], C[1], C[0] + s * along * dn[0], C[1] + s * along * dn[1], { c: ACC, w: 1.4, size: 6, dash: '4 3' });
  sv += S.arrow(C[0], C[1], C[0] + s * N * into[0], C[1] + s * N * into[1], { c: MUT, w: 1.2, size: 6, dash: '4 3' });
  sv += S.arrow(rec.W.x1, rec.W.y1, rec.W.x2, rec.W.y2, { c: RED, w: 2.2, size: 7 });
  sv += S.arrow(rec.N.x1, rec.N.y1, rec.N.x2, rec.N.y2, { c: BLUE, w: 2.2, size: 7 });
  sv += S.circle(C[0], C[1], 3, { c: 'currentColor', fill: 'currentColor' });
  sv += T(rec.W.x2 + 4, rec.W.y2 + 13, `W = mg = ${d1(W)} N`, { a: 'start', c: RED });
  sv += T(rec.N.x2 - 4, rec.N.y2 - 4, `N = ${d1(N)} N`, { a: 'end', c: BLUE });
  sv += T(C[0] + s * along * dn[0] - 4, C[1] + s * along * dn[1] + 14, `mg sin ${th}° = ${d1(along)} N`, { a: 'end', c: ACC });
  sv += T(C[0] + s * N * into[0] + 6, C[1] + s * N * into[1] + 2, `mg cos ${th}°`, { c: MUT }) + T(C[0] + s * N * into[0] + 6, C[1] + s * N * into[1] + 15, `= ${d1(N)} N`, { c: MUT });
  sv += S.path(`M${x0 + 44} ${y0} A44 44 0 0 0 ${f1(x0 + 44 * c)} ${f1(y0 - 44 * sn)}`, { c: RED, w: 1.3 }) + T(x0 + 50, y0 - 6, `${th}°`, { c: RED });
  sv += T(232, 14, `smooth plane, block of ${m} kg`) + T(232, 28, `a = g sin ${th}° = ${d1(g * sn)} m s⁻² down the slope`, {}) + T(232, 42, 'forces on the block: W and N only', {});
  const Wv = [(rec.W.x2 - rec.W.x1) / s, (rec.W.y2 - rec.W.y1) / s];
  const Nv = [(rec.N.x2 - rec.N.x1) / s, (rec.N.y2 - rec.N.y1) / s];
  const net = [Wv[0] + Nv[0], Wv[1] + Nv[1]];
  const mag = Math.hypot(net[0], net[1]);
  const okDir = near(net[0] / mag, dn[0], 1e-9) && near(net[1] / mag, dn[1], 1e-9);
  const angWN = deg(Math.acos((Wv[0] * Nv[0] + Wv[1] * Nv[1]) / (Math.hypot(...Wv) * Math.hypot(...Nv))));
  check(okDir && near(mag, m * g * sn, 1e-9) && near(mag / m, 4.9, 1e-9) && near(Math.hypot(...Nv), W * c, 1e-9) && near(180 - angWN, th, 1e-9), `incline: the drawn W + N = ${d3(mag)} N along the slope = ${m} × ${d1(mag / m)}; |N| = ${d1(Math.hypot(...Nv))} N = W cos ${th}°; angle between W and the normal line = ${d1(180 - angWN)}°`);
  return svgDoc(w, h, 'A 6 kilogram block on a smooth plane inclined at 30 degrees. Only two forces act on it: the weight of 58.8 newtons straight down and the normal reaction of 50.9 newtons perpendicular to the plane. The weight is resolved into 29.4 newtons along the slope and 50.9 newtons into the plane, so the block accelerates down the slope at 4.9 metres per second squared', sv);
})();

// ---------------------------------------------------------------- TRIANGLE: a lamp on two strings and its force triangle
export const LAMP_DATA = { W: 60, alpha: 35, beta: 50, s: 1.4, ox: 140, oy: 110, ceil: 20, tx: 300, ty: 50 };
export const LAMPSVG = (() => {
  const { W, alpha, beta, s, ox, oy, ceil, tx, ty } = LAMP_DATA;
  const w = 420;
  const h = 215;
  const { T1, T2 } = lamp(W, alpha, beta);
  const ca = Math.cos(rad(alpha));
  const sa = Math.sin(rad(alpha));
  const cb = Math.cos(rad(beta));
  const sb = Math.sin(rad(beta));
  const rec = {};
  const rise = oy - ceil;
  const eL = [ox - rise / Math.tan(rad(alpha)), ceil];
  const eR = [ox + rise / Math.tan(rad(beta)), ceil];
  let sv = S.line(eL[0] - 8, ceil, eR[0] + 8, ceil, { w: 2.4 });
  sv += S.line(ox, oy, eL[0], eL[1], { c: MUT, w: 1, dash: '4 3' }) + S.line(ox, oy, eR[0], eR[1], { c: MUT, w: 1, dash: '4 3' });
  sv += fa(rec, 'T1', ox, oy, -T1 * ca, T1 * sa, s, { c: GRN }) + fa(rec, 'T2', ox, oy, T2 * cb, T2 * sb, s, { c: BLUE }) + fa(rec, 'W', ox, oy, 0, -W, s, { c: RED });
  sv += S.circle(ox, oy, 4, { c: 'currentColor', fill: 'currentColor' }) + S.rect(ox - 12, oy + s * W + 2, 24, 14, { fill: FILL, c: MUT, sw: 1.2 });
  sv += T(ox - 52, oy - 6, 'T1', { c: GRN, w: 'bold', a: 'end' }) + T(ox + 52, oy - 20, 'T2', { c: BLUE, w: 'bold' }) + T(ox + 6, oy + s * W - 6, `W = ${W} N`, { c: RED, w: 'bold' });
  sv += S.path(`M${f1(eL[0] + 20)} ${ceil} A20 20 0 0 1 ${f1(eL[0] + 20 * ca)} ${f1(ceil + 20 * sa)}`, { c: GRN, w: 1.2 }) + T(eL[0] + 26, ceil + 20, `${alpha}°`, { c: GRN });
  sv += S.path(`M${f1(eR[0] - 20)} ${ceil} A20 20 0 0 0 ${f1(eR[0] - 20 * cb)} ${f1(ceil + 20 * sb)}`, { c: BLUE, w: 1.2 }) + T(eR[0] - 24, ceil + 28, `${beta}°`, { c: BLUE, a: 'end' });
  sv += T(10, 150, 'Forces at the knot O,', {}) + T(10, 164, 'drawn to scale:', {}) + T(10, 178, `T1 = ${d1(T1)} N`, {}) + T(10, 192, `T2 = ${d1(T2)} N`, {});
  // the triangle: W, then T2, then T1 closes it
  const P0 = [tx, ty];
  const P1 = [tx, ty + s * W];
  const P2 = [P1[0] + s * T2 * cb, P1[1] - s * T2 * sb];
  const P3 = [P2[0] - s * T1 * ca, P2[1] - s * T1 * sa];
  sv += T(tx - 60, 20, 'Triangle of forces', { w: 'bold' });
  sv += S.arrow(P0[0], P0[1], P1[0], P1[1], { c: RED, w: 2.2, size: 7 }) + S.arrow(P1[0], P1[1], P2[0], P2[1], { c: BLUE, w: 2.2, size: 7 }) + S.arrow(P2[0], P2[1], P3[0], P3[1], { c: GRN, w: 2.2, size: 7 });
  sv += T(tx - 8, ty + (s * W) / 2 + 4, `W = ${W} N`, { a: 'end', c: RED }) + T(P2[0] + 6, (P1[1] + P2[1]) / 2 + 14, `T2 = ${d1(T2)} N`, { c: BLUE }) + T(P2[0] + 6, (P2[1] + P3[1]) / 2 - 4, `T1 = ${d1(T1)} N`, { c: GRN });
  sv += T(tx - 60, 205, 'W, T2, T1 head to tail close the triangle', {});
  const close = Math.hypot(P3[0] - P0[0], P3[1] - P0[1]);
  const sides = [Math.hypot(P1[0] - P0[0], P1[1] - P0[1]), Math.hypot(P2[0] - P1[0], P2[1] - P1[1]), Math.hypot(P3[0] - P2[0], P3[1] - P2[1])];
  const [a1, b1, c1] = sides; // W, T2, T1
  const A = Math.acos((b1 * b1 + c1 * c1 - a1 * a1) / (2 * b1 * c1)); // opposite W
  const B = Math.acos((a1 * a1 + c1 * c1 - b1 * b1) / (2 * a1 * c1)); // opposite T2
  const C = Math.acos((a1 * a1 + b1 * b1 - c1 * c1) / (2 * a1 * b1)); // opposite T1
  const lami = [a1 / Math.sin(A), b1 / Math.sin(B), c1 / Math.sin(C)];
  const net = ['T1', 'T2', 'W'].reduce((acc, k) => [acc[0] + (rec[k].x2 - rec[k].x1) / s, acc[1] + (rec[k].y1 - rec[k].y2) / s], [0, 0]);
  const okLen = near(a1, s * W, 1e-9) && near(b1, s * T2, 1e-9) && near(c1, s * T1, 1e-9);
  check(close < 0.05 && okLen && Math.hypot(net[0], net[1]) < 1e-9 && near(lami[0], lami[1], 1e-6) && near(lami[1], lami[2], 1e-6) && near(deg(A) + deg(B) + deg(C), 180, 1e-9) && near(deg(A), alpha + beta, 1e-6), `lamp: forces at O sum to ${d3(Math.hypot(net[0], net[1]))} N; triangle closes (gap ${close.toFixed(3)} px); sides ${d1(a1)}, ${d1(b1)}, ${d1(c1)} px = ${s} × ${W}, ${d1(T2)}, ${d1(T1)}; sine rule: side/sin(opposite angle) = ${d1(lami[0] / s)} N for all three (Lami); angle opposite W = ${d1(deg(A))}° = ${alpha}° + ${beta}°`);
  return svgDoc(w, h, 'A lamp of weight 60 newtons hangs from a knot supported by two strings at 35 degrees and 50 degrees to the horizontal ceiling. The tensions are 38.7 newtons and 49.3 newtons. On the right the three forces drawn head to tail form a closed triangle, with the weight, then the second tension, then the first tension', sv);
})();

// ---------------------------------------------------------------- LADDER: against a smooth wall
export const LADDER_DATA = { L: 6, th: 50, m: 20, pxm: 36, sf: 0.32, x0: 60, floorY: 200 };
export const LADDERSVG = (() => {
  const { L, th, m, pxm, sf, x0, floorY } = LADDER_DATA;
  const w = 420;
  const h = 235;
  const { Nw, Nf, Ff } = ladder(L, th, m);
  const W = m * g;
  const c = Math.cos(rad(th));
  const sn = Math.sin(rad(th));
  const foot = [x0, floorY];
  const top = [x0 + L * pxm * c, floorY - L * pxm * sn];
  const mid = [x0 + (L / 2) * pxm * c, floorY - (L / 2) * pxm * sn];
  const Q = [mid[0], top[1]];
  const rec = {};
  let sv = S.line(x0 - 20, floorY, top[0] + 40, floorY, { w: 2.4 });
  sv += S.rect(top[0], 14, 14, floorY - 14, { fill: FILL, c: MUT, sw: 1.2 });
  sv += S.line(foot[0], foot[1], top[0], top[1], { w: 4 });
  sv += S.line(mid[0], mid[1], Q[0], Q[1], { c: MUT, w: 1, dash: '4 3' }) + S.line(top[0], top[1], Q[0], Q[1], { c: MUT, w: 1, dash: '4 3' });
  sv += S.line(foot[0], foot[1], Q[0], Q[1], { c: MUT, w: 1, dash: '4 3' });
  sv += fa(rec, 'Nw', top[0], top[1], -Nw, 0, sf, { c: BLUE }) + fa(rec, 'W', mid[0], mid[1], 0, -W, sf, { c: RED });
  sv += fa(rec, 'Nf', foot[0], foot[1], 0, Nf, sf, { c: BLUE }) + fa(rec, 'Ff', foot[0], foot[1], Ff, 0, sf, { c: GRN });
  sv += S.circle(Q[0], Q[1], 3.4, { c: ACC, fill: ACC }) + S.circle(mid[0], mid[1], 2.6, { c: 'currentColor', fill: 'currentColor' });
  sv += S.path(`M${foot[0] + 38} ${floorY} A38 38 0 0 0 ${f1(foot[0] + 38 * c)} ${f1(floorY - 38 * sn)}`, { c: RED, w: 1.3 }) + T(foot[0] + 44, floorY - 6, `${th}°`, { c: RED });
  sv += T(top[0] - 4, top[1] - 9, `N wall = ${d1(Nw)} N`, { a: 'end', c: BLUE });
  sv += T(mid[0] + 8, mid[1] + 6 * 0 + sf * W, `W = ${d1(W)} N`, { c: RED }) + T(foot[0] - 6, foot[1] - sf * Nf + 2, 'N floor', { a: 'end', c: BLUE }) + T(foot[0] - 6, foot[1] - sf * Nf + 14, `${d1(Nf)} N`, { a: 'end', c: BLUE });
  sv += T(foot[0] + sf * Ff + 6, foot[1] - 4 + 16, `F floor = ${d1(Ff)} N`, { c: GRN }) + T(Q[0] + 8, Q[1] + 16, 'Q', { c: ACC, w: 'bold' });
  sv += T(top[0] + 28, 36, 'smooth wall', {}) + T(top[0] + 28, 52, `ladder ${L} m, ${m} kg`, {}) + T(top[0] + 28, 68, `angle with floor ${th}°`, {});
  sv += T(top[0] + 28, 96, 'The three forces meet', {}) + T(top[0] + 28, 110, 'at Q, above the middle', {}) + T(top[0] + 28, 124, 'of the ladder.', {});
  sv += T(top[0] + 28, 150, `N wall = (W/2) cot ${th}°`, { c: BLUE }) + T(top[0] + 28, 164, `F floor = N wall`, { c: GRN });
  const [nwx] = rd(rec, 'Nw', sf);
  const [ffx] = rd(rec, 'Ff', sf);
  const [, nfy] = rd(rec, 'Nf', sf);
  const [, wy] = rd(rec, 'W', sf);
  // torque about the foot from the drawn arrows: wall force acts at the top (height L sin th), the weight at horizontal distance (L/2) cos th
  const torque = Math.abs(nwx) * ((floorY - top[1]) / pxm) - Math.abs(wy) * ((mid[0] - foot[0]) / pxm);
  const slope = (floorY - Q[1]) / (Q[0] - foot[0]);
  check(near(nwx + ffx, 0, 1e-9) && near(nfy + wy, 0, 1e-9) && Math.abs(torque) < 1e-9 && near(slope, 2 * Math.tan(rad(th)), 1e-9) && near(slope, nfy / ffx, 1e-9) && near(Nw, (W / 2) / Math.tan(rad(th)), 1e-9) && near(Math.hypot(top[0] - foot[0], top[1] - foot[1]), L * pxm, 1e-9), `ladder: drawn forces balance (horizontal ${d3(nwx + ffx)} N, vertical ${d3(nfy + wy)} N); torque about the foot from the arrows = ${d3(torque)} N m; foot-to-Q slope ${d3(slope)} = 2 tan ${th}° = N floor / F floor; ladder length ${L} m at ${pxm} px/m`);
  return svgDoc(w, h, 'A uniform ladder of length 6 metres and mass 20 kilograms leans against a smooth vertical wall at 50 degrees to the floor. The forces are the weight of 196 newtons down at the middle, the wall reaction of 82.2 newtons horizontal at the top, and at the foot a normal reaction of 196 newtons up and a horizontal force of 82.2 newtons towards the wall. The lines of action of the weight, the wall reaction and the floor reaction meet at one point Q above the middle of the ladder', sv);
})();

export const ALL = { PAIR, IMPULSE, RECOIL, TABLEHANG, ATWOODSVG, CONTACT, LIFTSVG, INCLINE, LAMPSVG, LADDERSVG };
