// ch06 diagrams, all drawn from the numbers in data.mjs, each with a self-check that the geometry says what the caption says:
// CM2 (two masses balance about their centre of mass), LSHAPE (centre of mass of a bent wire), SLED (centre of mass stays put),
// TORQUE (moment arm), LINEL (angular momentum of a particle on a straight line), SPIN (angular momentum conserved),
// BEAM (plank on two supports), BRACKET (hinged bar and cable), TOPPLE (plumb line from the centre of gravity), MOIBARS (I = c M R^2).
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, dec, rod, el, sd, tq, ln, st, pl, br, tp, MOI, pd, po } from './data.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const t3 = (x) => String(Number(x.toPrecision(3)));
const n2 = (x) => String(Number(x.toPrecision(2)));

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const cross = (ax, ay, bx, by) => ax * by - ay * bx;

// ---------------------------------------------------------------- CM2: two masses on a light rod balance at the centre of mass
export const CM2 = (() => {
  const w = 420;
  const h = 214;
  const x0 = 50;
  const sc = 400; // px per metre
  const ay = 96;
  const px = (x) => x0 + sc * x;
  const rr = (m) => 5 + 1.5 * m;
  const wsc = 0.8; // px per newton
  let s = S.line(px(0), ay, px(rod.L), ay, { w: 3 });
  // fulcrum under the centre of mass
  s += S.path(`M${f1(px(rod.x))} ${ay + 2} L${f1(px(rod.x) - 11)} ${ay + 24} L${f1(px(rod.x) + 11)} ${ay + 24} Z`, { fill: FILL });
  s += S.circle(px(0), ay, rr(rod.m1), { c: BLUE, fill: BLUE, fop: 0.3 }) + S.circle(px(rod.L), ay, rr(rod.m2), { c: BLUE, fill: BLUE, fop: 0.3 });
  s += S.text(px(0), ay + 4, '2', { a: 'middle', size: 11, w: 'bold' }) + S.text(px(rod.L), ay + 4, '6', { a: 'middle', size: 11, w: 'bold' });
  s += S.arrow(px(0), ay + rr(rod.m1), px(0), ay + rr(rod.m1) + wsc * rod.w1, { c: GRN, size: 6 });
  s += S.arrow(px(rod.L), ay + rr(rod.m2), px(rod.L), ay + rr(rod.m2) + wsc * rod.w2, { c: GRN, size: 6 });
  s += S.text(px(0) + 8, ay + rr(rod.m1) + 28, `${dec(rod.w1, 3)} N`, { size: 10, c: GRN });
  s += S.text(px(rod.L) - 8, ay + rr(rod.m2) + 40, `${dec(rod.w2, 3)} N`, { a: 'end', size: 10, c: GRN });
  s += S.circle(px(rod.x), ay, 3.5, { c: RED, fill: RED });
  s += S.text(px(rod.x), ay - 10, 'CM', { a: 'middle', size: 11, w: 'bold', c: RED });
  s += S.text(px(0), ay - 24, 'masses in kg', { a: 'start', size: 10, c: MUT });
  // dimension lines
  const dy = 40;
  s += S.arrow(px(0), dy, px(rod.x), dy, { c: MUT, w: 1, size: 5 }) + S.arrow(px(rod.x), dy, px(0), dy, { c: MUT, w: 1, size: 5 });
  s += S.arrow(px(rod.x), dy, px(rod.L), dy, { c: MUT, w: 1, size: 5 }) + S.arrow(px(rod.L), dy, px(rod.x), dy, { c: MUT, w: 1, size: 5 });
  s += S.text((px(0) + px(rod.x)) / 2, dy - 5, `${dec(rod.d1, 2)} m`, { a: 'middle', size: 10 }) + S.text((px(rod.x) + px(rod.L)) / 2, dy - 5, `${dec(rod.d2, 2)} m`, { a: 'middle', size: 10 });
  s += S.text(w / 2, 172, `x_cm = (${dec(rod.m1, 2)} × 0 + ${dec(rod.m2, 2)} × ${dec(rod.L, 2)}) / ${dec(rod.M, 2)} = ${dec(rod.x, 2)} m from the lighter mass`, { a: 'middle', size: 10 });
  s += S.text(w / 2, 188, `moments of the weights about the CM: ${dec(rod.w1, 3)} × ${dec(rod.d1, 2)} = ${dec(rod.w2, 3)} × ${dec(rod.d2, 2)} = ${dec(rod.mom1, 3)} N m`, { a: 'middle', size: 10 });
  s += S.text(w / 2, 204, 'The rod is light, so only the two weights matter.', { a: 'middle', size: 10, c: MUT });
  const sum = rod.m1 * (px(0) - px(rod.x)) + rod.m2 * (px(rod.L) - px(rod.x));
  check(near(px(rod.x), x0 + sc * 0.6, 1e-9) && Math.abs(sum) < 1e-9 && near(rod.mom1, rod.mom2, 1e-9) && near(rod.d1 / rod.d2, rod.m2 / rod.m1, 1e-9), `cm2: CM drawn at ${dec(rod.x, 2)} m; sum of m (x − x_cm) = 0 in drawn units; moments ${dec(rod.mom1, 3)} = ${dec(rod.mom2, 3)} N m; distances inversely as the masses`);
  return svgDoc(w, h, 'Two masses of 2 kilograms and 6 kilograms at the ends of a light rod 0.80 metres long balance on a support placed 0.60 metres from the lighter mass: the centre of mass lies nearer the heavier mass, and the moments of the two weights about it are equal', s);
})();

// ---------------------------------------------------------------- LSHAPE: centre of mass of a uniform wire bent into an L
export const LSHAPE = (() => {
  const w = 420;
  const h = 226;
  const sc = 300;
  const ox = 56;
  const oy = 190;
  const P = (x, y) => [ox + sc * x, oy - sc * y];
  const [cx, cy] = P(el.X, el.Y);
  const [m1x, m1y] = P(el.a / 2, 0);
  const [m2x, m2y] = P(0, el.b / 2);
  let s = S.line(...P(0, 0), ...P(el.a, 0), { w: 4, c: BLUE }) + S.line(...P(0, 0), ...P(0, el.b), { w: 4, c: BLUE });
  s += S.line(cx, oy, cx, cy, { c: MUT, w: 1, dash: '3 3' }) + S.line(ox, cy, cx, cy, { c: MUT, w: 1, dash: '3 3' });
  s += S.line(m1x, m1y, m2x, m2y, { c: GRN, w: 1, dash: '5 3' });
  s += S.circle(m1x, m1y, 3.5, { c: GRN, fill: GRN }) + S.circle(m2x, m2y, 3.5, { c: GRN, fill: GRN });
  s += S.line(cx - 5, cy - 5, cx + 5, cy + 5, { c: RED, w: 2 }) + S.line(cx - 5, cy + 5, cx + 5, cy - 5, { c: RED, w: 2 });
  s += S.text(cx + 9, cy - 6, 'CM', { size: 11, w: 'bold', c: RED });
  s += S.text(...P(el.a / 2, 0).map((v, i) => (i ? v + 17 : v)), `${dec(el.a, 2)} m`, { a: 'middle', size: 10 });
  s += S.text(ox - 8, oy - sc * el.b + 12, `${dec(el.b, 2)} m`, { a: 'end', size: 10 });
  s += S.text(cx, oy + 14, `${n2(el.X)}`, { a: 'middle', size: 10 }) + S.text(ox - 8, cy + 4, `${n2(el.Y)}`, { a: 'end', size: 10 });
  s += S.lines(ox + sc * el.a + 24, 62, ['arm 1: length 0.60 m, midpoint', '(0.30, 0); arm 2: length 0.40 m,', 'midpoint (0, 0.20). A uniform wire:', 'mass is proportional to length.', '', `X = 0.60 × 0.30 / 1.00 = ${dec(el.X, 2)} m`, `Y = 0.40 × 0.20 / 1.00 = ${n2(el.Y)} m`, '', 'The CM lies on the green line', 'but not on the wire itself.'], { size: 10, dy: 14 });
  // checks: CM is the mass-weighted mean of the two midpoints; it lies on the segment joining them, off the wire
  const wx = (el.a * m1x + el.b * m2x) / (el.a + el.b);
  const wy = (el.a * m1y + el.b * m2y) / (el.a + el.b);
  const onSeg = Math.abs(cross(m2x - m1x, m2y - m1y, cx - m1x, cy - m1y)) < 1e-6;
  const offWire = cx - ox > 1 && oy - cy > 1;
  check(near(wx, cx, 1e-9) && near(wy, cy, 1e-9) && onSeg && offWire && near(el.X, 0.18, 1e-9) && near(el.Y, 0.08, 1e-9), `lshape: CM at (${dec(el.X, 2)}, ${dec(el.Y, 2)}) m is the length-weighted mean of the arm midpoints, lies on the segment joining them and off the wire`);
  return svgDoc(w, h, 'A uniform wire bent into an L with arms 0.60 metres and 0.40 metres: the centre of mass is at 0.18 metres and 0.08 metres from the corner, on the line joining the arm midpoints, and not on the wire itself', s);
})();

// ---------------------------------------------------------------- SLED: a child walks along a sledge on smooth ice; the CM stays put
export const SLED = (() => {
  const w = 420;
  const h = 214;
  const xg = 110;
  const sc = 100;
  const px = (x) => xg + sc * x;
  const rows = [
    { y: 52, shift: 0, childAt: 0, title: 'before: child at the left end' },
    { y: 128, shift: -sd.s, childAt: sd.L, title: 'after: child at the right end' },
  ];
  let s = '';
  const cmx = [];
  for (const r of rows) {
    const left = px(r.shift);
    s += S.text(8, r.y - 24, r.title, { size: 10, w: 'bold' });
    s += S.rect(left, r.y, sc * sd.L, 14, { c: BLUE, fill: BLUE, fop: 0.25 });
    const childX = left + sc * r.childAt;
    s += S.circle(childX, r.y - 9, 8, { c: GRN, fill: GRN, fop: 0.4 });
    s += S.circle(left + (sc * sd.L) / 2, r.y + 7, 2.5, { fill: 'currentColor' });
    cmx.push((sd.m * childX + sd.M * (left + (sc * sd.L) / 2)) / (sd.m + sd.M));
  }
  s += S.line(px(0), 36, px(0), 176, { c: MUT, w: 1, dash: '2 3' }) + S.text(px(0) + 4, 186, 'x = 0 (fixed to the ice)', { size: 10, c: MUT });
  s += S.line(cmx[0], 36, cmx[0], 160, { c: RED, w: 1.5, dash: '5 3' }) + S.text(cmx[0] + 5, 172, 'CM of child + sledge: does not move', { size: 10, c: RED });
  s += S.arrow(px(0), 164, px(-sd.s), 164, { c: RED, w: 1.5, size: 6 }) + S.text(px(-sd.s), 158, `sledge slid back ${dec(sd.s, 2)} m`, { size: 10, c: RED });
  s += S.text(w / 2, h - 6, `child ${dec(sd.m, 2)} kg, sledge ${dec(sd.M, 2)} kg, length ${dec(sd.L, 2)} m; child moves ${dec(sd.c, 2)} m over the ice`, { a: 'middle', size: 10 });
  const okCm = near(cmx[0], cmx[1], 1e-9) && near(cmx[0], px(sd.cm0), 1e-9);
  const okMom = near(sd.m * sd.c, sd.M * sd.s, 1e-9);
  check(okCm && okMom && near(sd.s, 0.6, 1e-9) && near(sd.c, 1.8, 1e-9), `sled: drawn CM before = after (${f1(cmx[0])} px); sledge slides ${dec(sd.s, 2)} m, child ${dec(sd.c, 2)} m; m_child × 1.80 = M_sledge × 0.60`);
  return svgDoc(w, h, 'A child of 30 kilograms walks from one end of a 90 kilogram sledge to the other on smooth ice: the sledge slides back 0.60 metres while the child moves 1.80 metres forward, and the centre of mass of the pair stays at the same place', s);
})();

// ---------------------------------------------------------------- TORQUE: moment arm of a force at an angle to the lever
export const TORQUE = (() => {
  const w = 420;
  const h = 232;
  const sc = 300;
  const Ox = 60;
  const Oy = 124;
  const Px = Ox + sc * tq.r;
  const Py = Oy;
  const th = tq.th * rad;
  const fx = Math.cos(th);
  const fy = -Math.sin(th); // up-right on the screen
  // foot of the perpendicular from O on to the line of action
  const tt = (Ox - Px) * fx + (Oy - Py) * fy;
  const Fx = Px + tt * fx;
  const Fy = Py + tt * fy;
  let s = S.line(Ox, Oy, Px, Py, { w: 4 }) + S.circle(Ox, Oy, 5, { fill: FILL }) + S.circle(Ox, Oy, 1.5, { fill: 'currentColor' });
  s += S.text(Ox - 8, Oy - 8, 'O', { a: 'end', size: 11, w: 'bold' });
  s += S.line(Fx, Fy, Px + 150 * fx, Py + 150 * fy, { c: MUT, w: 1, dash: '5 3' });
  s += S.arrow(Px, Py, Px + 100 * fx, Py + 100 * fy, { c: RED, w: 2.4, size: 8 });
  s += S.text(Px + 100 * fx + 6, Py + 100 * fy + 4, `F = ${tq.F} N`, { size: 11, c: RED, w: 'bold' });
  s += S.line(Px, Py, Px + 44, Py, { c: MUT, w: 1, dash: '3 3' });
  s += S.path(`M${f1(Px + 30)} ${f1(Py)} A30 30 0 0 0 ${f1(Px + 30 * fx)} ${f1(Py + 30 * fy)}`, { w: 1.2 });
  s += S.text(Px + 36, Py - 6, 'θ', { size: 11, it: true });
  s += S.line(Ox, Oy, Fx, Fy, { c: GRN, w: 2.4 });
  // right-angle mark at the foot
  const ux = (Ox - Fx) / Math.hypot(Ox - Fx, Oy - Fy);
  const uy = (Oy - Fy) / Math.hypot(Ox - Fx, Oy - Fy);
  s += S.path(`M${f1(Fx + 9 * ux)} ${f1(Fy + 9 * uy)} L${f1(Fx + 9 * ux + 9 * fx)} ${f1(Fy + 9 * uy + 9 * fy)} L${f1(Fx + 9 * fx)} ${f1(Fy + 9 * fy)}`, { w: 1 });
  s += S.text((Ox + Fx) / 2 - 8, (Oy + Fy) / 2 + 4, 'd', { a: 'end', size: 12, c: GRN, w: 'bold' });
  s += S.text((Ox + Px) / 2, Oy - 10, `r = ${dec(tq.r, 2)} m`, { a: 'middle', size: 10 });
  s += S.lines(Ox + 150, 160, [`θ = ${tq.th}° between r and F`, `d = r sin θ = ${dec(tq.r, 2)} × ${dec(Math.sin(th), 2)} = ${dec(tq.d, 2)} m`, `τ = F d = ${tq.F} × ${dec(tq.d, 2)} = ${dec(tq.tau, 3)} N m`, 'τ = r F sin θ (anticlockwise here)'], { size: 10, dy: 15 });
  s += S.text(w / 2, h - 6, 'd is measured from O at right angles to the line of action (dashed).', { a: 'middle', size: 10, c: MUT });
  // checks: perpendicular distance from the drawn geometry, torque three ways, direction (anticlockwise)
  const dPx = Math.abs(cross(Px - Ox, Py - Oy, fx, fy));
  const dFoot = Math.hypot(Fx - Ox, Fy - Oy);
  const dot = (Fx - Ox) * fx + (Fy - Oy) * fy;
  const tau3 = [tq.F * tq.d, tq.r * tq.F * Math.sin(th), tq.F * (dPx / sc)];
  const sign = cross(Px - Ox, -(Py - Oy), fx, -fy); // z-component with y up: positive = anticlockwise
  check(near(dPx / sc, tq.d, 1e-9) && near(dFoot / sc, tq.d, 1e-9) && Math.abs(dot) < 1e-9 && tau3.every((x) => near(x, 10, 1e-9)) && sign > 0, `torque: drawn perpendicular distance ${dec(dPx / sc, 3)} m (foot of the perpendicular at right angles to the line of action); τ = F d = r F sin θ = ${dec(tau3[0], 3)} N m; sense anticlockwise`);
  return svgDoc(w, h, 'A bar pivoted at O with a force of 40 newtons applied at its end, 0.50 metres from O, at 30 degrees to the bar: the moment arm d is the perpendicular distance from O to the line of action, 0.25 metres, so the torque is 10 newton metres', s);
})();

// ---------------------------------------------------------------- LINEL: angular momentum of a particle moving along a straight line
export const LINEL = (() => {
  const w = 420;
  const h = 212;
  const sc = 25;
  const Ox = 120;
  const Oy = 176;
  const ly = Oy - sc * ln.d;
  const xs = [-4, 0, 4];
  const names = ['A', 'B', 'C'];
  let s = S.line(40, ly, 270, ly, { c: MUT, w: 1, dash: '2 3' });
  s += S.circle(Ox, Oy, 4, { fill: 'currentColor' }) + S.text(Ox - 8, Oy + 14, 'O', { a: 'end', size: 11, w: 'bold' });
  const vals = [];
  xs.forEach((x, i) => {
    const px = Ox + sc * x;
    s += S.circle(px, ly, 6, { c: BLUE, fill: BLUE, fop: 0.35 });
    s += S.arrow(px + 8, ly, px + 8 + 38, ly, { c: GRN, w: 1.6, size: 6 });
    s += S.text(px, ly - 14, names[i], { a: 'middle', size: 11, w: 'bold' });
    s += S.line(Ox, Oy, px, ly, { c: i === 1 ? MUT : RED, w: 1, dash: '4 3' });
    const r = Math.hypot(px - Ox, ly - Oy) / sc;
    // |r x v| in physical units, v along +x
    const Lval = ln.m * Math.abs(cross((px - Ox) / sc, (ly - Oy) / sc, ln.v, 0));
    vals.push({ r, L: Lval });
  });
  s += S.text(Ox + 62, (ly + Oy) / 2 + 22, `r = ${dec(vals[2].r, 2)} m`, { size: 10, c: RED });
  s += S.text(Ox - 6, (ly + Oy) / 2 + 4, `d = ${dec(ln.d, 2)} m`, { a: 'end', size: 10, w: 'bold' });
  s += S.lines(Ox + 160, 44, [`m = ${dec(ln.m, 2)} kg`, `v = ${dec(ln.v, 2)} m s⁻¹`, `L = m v d`, `  = ${dec(ln.m, 2)} × ${dec(ln.v, 2)} × ${dec(ln.d, 2)}`, `  = ${dec(ln.L, 3)} kg m² s⁻¹`, 'the same at A, B and C'], { size: 10, dy: 15 });
  s += S.text(w / 2, h - 6, 'No force acts: v is constant, so L about O does not change.', { a: 'middle', size: 10, c: MUT });
  check(vals.every((x) => near(x.L, ln.L, 1e-9)) && near(vals[0].r, 5, 1e-9) && near(vals[1].r, 3, 1e-9) && near(vals[0].r * ln.m * ln.v * (ln.d / vals[0].r), ln.L, 1e-9), `linel: |r × m v| computed from the drawn positions A, B, C = ${vals.map((x) => dec(x.L, 3)).join(', ')} kg m² s⁻¹ (all m v d = ${dec(ln.L, 3)}); r = ${vals.map((x) => dec(x.r, 2)).join(', ')} m (3-4-5 triangle)`);
  return svgDoc(w, h, 'A particle of 0.5 kilograms moving at 8 metres per second along a straight line 3 metres from the point O, shown at three positions A, B and C: the distance r from O changes but r sin of the angle stays 3 metres, so the angular momentum m v d is 12 kilogram metre squared per second at every position', s);
})();

// ---------------------------------------------------------------- SPIN: pulling the weights in raises the angular speed, L is unchanged
export const SPIN = (() => {
  const w = 420;
  const h = 244;
  const sc = 60;
  const panels = [
    { cx: 105, r: st.r1, I: st.I1, om: st.w1, title: 'arms out' },
    { cx: 315, r: st.r2, I: st.I2, om: st.w2, title: 'weights pulled in' },
  ];
  let s = '';
  for (const p of panels) {
    const cy = 92;
    s += S.text(p.cx, 18, p.title, { a: 'middle', size: 11, w: 'bold' });
    s += S.line(p.cx - sc * p.r, cy, p.cx + sc * p.r, cy, { c: MUT, w: 1.5 });
    s += S.circle(p.cx, cy, 8, { c: BLUE, fill: BLUE, fop: 0.25 });
    s += S.circle(p.cx - sc * p.r, cy, 5, { c: GRN, fill: GRN, fop: 0.6 }) + S.circle(p.cx + sc * p.r, cy, 5, { c: GRN, fill: GRN, fop: 0.6 });
    // rotation arrow: anticlockwise arc of radius 66, 40 to 330 degrees, with a head
    const R = 66;
    const pts = [];
    for (let a = 40; a <= 330; a += 10) pts.push([p.cx + R * Math.cos(a * rad), cy - R * Math.sin(a * rad)]);
    s += S.path('M' + pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L'), { c: RED, w: 1.6 });
    const [lx, ly] = pts[pts.length - 1];
    const [mx, my] = pts[pts.length - 2];
    s += S.head(lx, ly, Math.atan2(ly - my, lx - mx), { size: 8, c: RED });
    s += S.text(p.cx + R + 6, cy - 40, 'ω', { size: 13, c: RED, it: true });
    s += S.lines(p.cx, 180, [`I = ${dec(st.I0, 2)} + 2(${dec(st.m, 2)})(${dec(p.r, 2)})² = ${t3(p.I)} kg m²`, `ω = ${dec(p.om, 3)} rad s⁻¹`, `L = I ω = ${t3(p.I * p.om)} kg m² s⁻¹`], { a: 'middle', size: 10, dy: 15 });
  }
  s += S.text(w / 2, 236, `Top view. No external torque, so L is the same in both pictures.`, { a: 'middle', size: 10, c: MUT });
  check(near(panels[0].I * panels[0].om, panels[1].I * panels[1].om, 1e-9) && panels[1].I < panels[0].I && panels[1].om > panels[0].om && near(panels[0].I, 2.52, 1e-9) && near(panels[1].I, 0.72, 1e-9), `spin: I ${dec(st.I1, 3)} → ${dec(st.I2, 3)} kg m², ω ${dec(st.w1, 3)} → ${dec(st.w2, 3)} rad s⁻¹, L = ${dec(st.L, 4)} kg m² s⁻¹ in both (I1 ω1 = I2 ω2)`);
  return svgDoc(w, h, 'Top view of a person on a rotating stool holding two weights: with the arms out the moment of inertia is 2.52 kilogram metre squared and the angular speed 3.0 radians per second; with the weights pulled in the moment of inertia falls to 0.72 and the angular speed rises to 10.5, so the angular momentum 7.56 is the same', s);
})();

// ---------------------------------------------------------------- BEAM: a plank on two supports
export const BEAM = (() => {
  const w = 420;
  const h = 232;
  const x0 = 50;
  const sc = 80;
  const px = (x) => x0 + sc * x;
  const ay = 100;
  const asc = 0.1; // px per newton
  let s = S.rect(px(0), ay, sc * pl.L, 8, { c: ACC, fill: ACC, fop: 0.3 });
  for (const x of [0, pl.L]) s += S.path(`M${f1(px(x))} ${ay + 8} L${f1(px(x) - 10)} ${ay + 28} L${f1(px(x) + 10)} ${ay + 28} Z`, { fill: FILL });
  // person
  s += S.circle(px(pl.xm), ay - 36, 6, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.line(px(pl.xm), ay - 30, px(pl.xm), ay - 6, { c: BLUE, w: 3 });
  s += S.arrow(px(pl.xm), ay + 8, px(pl.xm), ay + 8 + asc * pl.Wm, { c: GRN, size: 6 }) + S.text(px(pl.xm) + 6, ay + 8 + asc * pl.Wm - 2, `${dec(pl.Wm, 3)} N`, { size: 10, c: GRN });
  s += S.arrow(px(pl.L / 2), ay + 8, px(pl.L / 2), ay + 8 + asc * pl.Wp, { c: GRN, size: 6 }) + S.text(px(pl.L / 2) + 6, ay + 8 + asc * pl.Wp - 2, `${dec(pl.Wp, 3)} N`, { size: 10, c: GRN });
  s += S.arrow(px(0), ay + 28 + asc * pl.RL, px(0), ay + 28, { c: RED, size: 6 }) + S.text(px(0) + 8, ay + 28 + asc * pl.RL - 2, `R_L = ${dec(pl.RL, 4)} N`, { size: 10, c: RED });
  s += S.arrow(px(pl.L), ay + 28 + asc * pl.RR, px(pl.L), ay + 28, { c: RED, size: 6 }) + S.text(px(pl.L) - 8, ay + 28 + asc * pl.RR + 12, `R_R = ${dec(pl.RR, 4)} N`, { a: 'end', size: 10, c: RED });
  s += S.text(px(pl.L / 2), 22, `plank: ${dec(pl.L, 2)} m long, ${dec(pl.Mp, 2)} kg, uniform; the person stands ${dec(pl.xm, 2)} m from the left end`, { a: 'middle', size: 10 });
  s += S.text(w / 2, h - 8, `Moments about the left end: R_R × ${dec(pl.L, 2)} = ${dec(pl.Wp, 3)} × ${dec(pl.L / 2, 2)} + ${dec(pl.Wm, 3)} × ${dec(pl.xm, 2)}`, { a: 'middle', size: 10 });
  // checks: forces and moments balance about three different points
  const loads = [[pl.xm, -pl.Wm], [pl.L / 2, -pl.Wp], [0, pl.RL], [pl.L, pl.RR]];
  const net = loads.reduce((a, [, f]) => a + f, 0);
  const mom = (pt) => loads.reduce((a, [x, f]) => a + f * (x - pt), 0);
  check(Math.abs(net) < 1e-9 && [0, pl.L, pl.xm, 2.5].every((pt) => Math.abs(mom(pt)) < 1e-9) && near(pl.RR, 269.5, 1e-9) && near(pl.RL, 514.5, 1e-9), `beam: ΣF = ${net.toFixed(6)} N; Στ about the left end, right end, the person and x = 2.5 m all 0; R_L = ${dec(pl.RL, 4)} N, R_R = ${dec(pl.RR, 4)} N`);
  return svgDoc(w, h, 'A uniform plank of 30 kilograms resting on two supports at its ends with a 50 kilogram person standing one metre from the left end: the upward support forces are 514.5 newtons on the left and 269.5 newtons on the right, balancing the weights in both force and moment', s);
})();

// ---------------------------------------------------------------- BRACKET: bar hinged to a wall and held by a cable
export const BRACKET = (() => {
  const w = 420;
  const h = 236;
  const sc = 180;
  const wx = 44;
  const hy = 150;
  const th = br.th * rad;
  const ex = wx + sc * br.L;
  const wy = hy - sc * br.L * Math.tan(th);
  const fs = 0.8; // px per newton
  let s = S.line(wx, 14, wx, 214, { w: 5, c: MUT }) + S.text(wx - 8, 28, 'wall', { a: 'end', size: 10, c: MUT });
  s += S.line(wx, hy, ex, hy, { w: 5, c: ACC }) + S.circle(wx, hy, 5, { fill: FILL });
  s += S.line(ex, hy, wx, wy, { c: BLUE, w: 2 });
  s += S.circle(wx, wy, 3, { fill: 'currentColor' });
  // forces
  const tux = -Math.cos(th);
  const tuy = -Math.sin(th);
  s += S.arrow(ex, hy, ex + fs * br.T * tux, hy + fs * br.T * tuy, { c: RED, w: 2.4, size: 8 }) + S.text(ex - 50, hy - 36, `T = ${dec(br.T, 3)} N`, { size: 10, c: RED, w: 'bold' });
  s += S.arrow(ex, hy, ex, hy + fs * br.Wl, { c: GRN, size: 6 }) + S.text(ex + 6, hy + fs * br.Wl + 4, `${dec(br.Wl, 3)} N lamp`, { size: 10, c: GRN });
  s += S.arrow(wx + (sc * br.L) / 2, hy, wx + (sc * br.L) / 2, hy + fs * br.Wb, { c: GRN, size: 6 }) + S.text(wx + (sc * br.L) / 2 + 6, hy + fs * br.Wb + 4, `${dec(br.Wb, 3)} N bar`, { size: 10, c: GRN });
  s += S.arrow(wx, hy, wx, hy - fs * br.Hy, { c: RED, size: 6 }) + S.text(wx + 6, hy - fs * br.Hy - 2, `H_y = ${dec(br.Hy, 3)} N`, { size: 10, c: RED });
  s += S.arrow(wx, hy + 16, wx + fs * br.Hx, hy + 16, { c: RED, size: 6 }) + S.text(wx + 8, hy + 36, `H_x = ${dec(br.Hx, 3)} N`, { size: 10, c: RED });
  s += S.path(`M${f1(ex - 34)} ${f1(hy)} A34 34 0 0 1 ${f1(ex - 34 * Math.cos(th))} ${f1(hy - 34 * Math.sin(th))}`, { w: 1.2 });
  s += S.text(ex - 44, hy - 5, `${br.th}°`, { a: 'end', size: 10 });
  s += S.text(w / 2, h - 6, `bar ${dec(br.L, 2)} m, ${dec(br.M, 2)} kg; lamp ${dec(br.m, 2)} kg at the end; moments about the hinge give T`, { a: 'middle', size: 10 });
  // checks: force and torque balance on the drawn geometry (counter-clockwise positive, y up)
  const Fs = [
    { x: 0, fx: br.Hx, fy: br.Hy },
    { x: br.L, fx: br.T * tux, fy: -br.T * tuy },
    { x: br.L, fx: 0, fy: -br.Wl },
    { x: br.L / 2, fx: 0, fy: -br.Wb },
  ];
  const sx = Fs.reduce((a, f) => a + f.fx, 0);
  const sy = Fs.reduce((a, f) => a + f.fy, 0);
  const mom = (pt) => Fs.reduce((a, f) => a + f.fy * (f.x - pt), 0); // forces act on the bar axis so only the y components have a lever arm
  check(Math.abs(sx) < 1e-9 && Math.abs(sy) < 1e-9 && Math.abs(mom(0)) < 1e-9 && Math.abs(mom(br.L)) < 1e-9 && near(Math.atan2(hy - wy, ex - wx) / rad, br.th, 1e-9), `bracket: ΣFx = ${sx.toExponential(1)}, ΣFy = ${sy.toExponential(1)}, torque about the hinge and about the far end both 0; cable drawn at ${br.th}° to the bar; T = ${dec(br.T, 3)} N`);
  return svgDoc(w, h, 'A uniform bar of 4 kilograms hinged to a wall, with a 2 kilogram lamp at its far end, held horizontal by a cable at 30 degrees to the bar: the tension is 78.4 newtons, and the hinge pushes with 67.9 newtons horizontally and 19.6 newtons upward', s);
})();

// ---------------------------------------------------------------- TOPPLE: plumb line from the centre of gravity of a tilted almirah
export const TOPPLE = (() => {
  const w = 420;
  const h = 232;
  const sc = 60;
  const bp = sc * tp.b;
  const hp = sc * tp.h;
  const panels = [
    { ax: 52, ay: 196, a: tp.a1, title: `tilt ${tp.a1}°: stable` },
    { ax: 262, ay: 196, a: tp.a2, title: `tilt ${tp.a2}°: topples` },
  ];
  let s = '';
  const res = [];
  for (const p of panels) {
    const t = p.a * rad;
    const u = [Math.cos(t), -Math.sin(t)]; // along the sloping surface (rises to the right)
    const n = [-Math.sin(t), -Math.cos(t)]; // normal to the surface, pointing up
    const A = [p.ax, p.ay];
    const B = [A[0] + bp * u[0], A[1] + bp * u[1]];
    const C = [B[0] + hp * n[0], B[1] + hp * n[1]];
    const D = [A[0] + hp * n[0], A[1] + hp * n[1]];
    const CG = [A[0] + (bp / 2) * u[0] + (hp / 2) * n[0], A[1] + (bp / 2) * u[1] + (hp / 2) * n[1]];
    // plumb line meets the sloping surface at A + s u
    const sPx = (CG[0] - A[0]) / u[0];
    const foot = [A[0] + sPx * u[0], A[1] + sPx * u[1]];
    s += S.text(p.ax - 4, 16, p.title, { size: 11, w: 'bold' });
    s += S.line(A[0] - 36 * u[0], A[1] - 36 * u[1], B[0] + 70 * u[0], B[1] + 70 * u[1], { w: 2, c: MUT });
    s += S.path(`M${f1(A[0])} ${f1(A[1])} L${f1(B[0])} ${f1(B[1])} L${f1(C[0])} ${f1(C[1])} L${f1(D[0])} ${f1(D[1])} Z`, { c: BLUE, fill: BLUE, fop: 0.15 });
    s += S.line(A[0], A[1], B[0], B[1], { c: GRN, w: 3.5 });
    s += S.line(CG[0], CG[1], foot[0], foot[1], { c: RED, w: 1.4, dash: '4 3' });
    s += S.circle(CG[0], CG[1], 3.5, { c: RED, fill: RED }) + S.circle(foot[0], foot[1], 3, { c: RED, fill: 'currentColor' });
    s += S.text(CG[0] + 8, CG[1] - 4, 'CG', { size: 10, c: RED, w: 'bold' });
    res.push({ a: p.a, s: sPx, base: bp, inside: sPx >= 0 && sPx <= bp, formula: (bp / 2 - (hp / 2) * Math.tan(t)) });
  }
  s += S.text(w / 2, 224, `almirah ${dec(tp.b, 2)} m wide, ${dec(tp.h, 2)} m tall; it topples once tan θ > b/h, that is θ > ${dec(tp.crit, 3)}°`, { a: 'middle', size: 10 });
  check(res[0].inside && !res[1].inside && near(res[0].s, res[0].formula, 1e-9) && near(res[1].s, res[1].formula, 1e-9) && tp.a1 < tp.crit && tp.a2 > tp.crit && near(tp.crit, 18.43, 1e-3), `topple: plumb line from the CG meets the surface ${dec(res[0].s / sc, 3)} m from the lower edge at ${tp.a1}° (inside the ${dec(tp.b, 2)} m base) and ${dec(res[1].s / sc, 3)} m at ${tp.a2}° (outside); critical angle ${dec(tp.crit, 3)}° lies between`);
  return svgDoc(w, h, 'A tall uniform almirah standing on a tilting floor: at a tilt of 12 degrees the vertical line through its centre of gravity falls inside the base and it is stable, but at 25 degrees the line falls outside the base and it topples; the critical tilt is about 18 degrees', s);
})();

// ---------------------------------------------------------------- MOIBARS: I = c M R^2 for four bodies (axis through the centre)
export const MOIBARS = (() => {
  const w = 420;
  const h = 226;
  const bx = 76;
  const sc = 190;
  let s = '';
  const icons = [
    (cx, cy) => S.circle(cx, cy, 14, { w: 1, sw: 3.5 }),
    (cx, cy) => S.circle(cx, cy, 14, { sw: 1.5 }) + S.ellipse(cx, cy, 14, 5, { sw: 1, c: MUT }),
    (cx, cy) => S.circle(cx, cy, 14, { fill: FILL, sw: 1.5 }),
    (cx, cy) => S.circle(cx, cy, 14, { c: ACC, fill: ACC, fop: 0.35, sw: 1.5 }),
  ];
  const label = ['ring or hollow cylinder', 'hollow sphere', 'disc or solid cylinder', 'solid sphere'];
  const ftxt = ['M R²', '(2/3) M R²', '(1/2) M R²', '(2/5) M R²'];
  MOI.forEach((b, i) => {
    const y = 14 + i * 46;
    s += icons[i](36, y + 20);
    s += S.text(bx, y + 10, label[i], { size: 10, w: 'bold' });
    s += S.rect(bx, y + 16, sc * b.c, 16, { c: BLUE, fill: BLUE, fop: 0.3 });
    s += S.text(bx + sc * b.c + 6, y + 29, `I = ${ftxt[i]}`, { size: 10 });
  });
  s += S.text(w / 2, h - 6, 'Same M and R, axis through the centre; bar length ∝ I. Stated, not derived.', { a: 'middle', size: 10, c: MUT });
  const widths = MOI.map((b) => sc * b.c);
  const okOrder = widths.every((x, i) => i === 0 || x < widths[i - 1]);
  check(okOrder && near(widths[0] / widths[2], 2, 1e-9) && near(widths[3] / widths[0], 0.4, 1e-9) && near(MOI[1].c, 2 / 3, 1e-9), `moibars: bars proportional to the coefficients 1, 2/3, 1/2, 2/5 (ring : disc = 2 : 1 in drawn length; solid sphere = 0.4 of ring)`);
  return svgDoc(w, h, 'Bar chart of the moment of inertia of four bodies of the same mass and radius about an axis through the centre: a ring or hollow cylinder M R squared, a hollow sphere two thirds M R squared, a disc or solid cylinder half M R squared and a solid sphere two fifths M R squared', s);
})();

// ---------------------------------------------------------------- POLE: a carrying pole with two loads balances at the centre of mass
export const POLE = (() => {
  const w = 420;
  const h = 214;
  const x0 = 40;
  const sc = 220; // px per metre
  const px = (x) => x0 + sc * x;
  const ay = 70;
  // x measured from the heavier (18 kg) load on the left; the lighter 12 kg load is at x = L
  const bx = po.x;
  let s = S.line(px(0), ay, px(po.L), ay, { w: 3 }) + S.path(`M${f1(px(bx))} ${ay + 2} L${f1(px(bx) - 10)} ${ay + 22} L${f1(px(bx) + 10)} ${ay + 22} Z`, { fill: FILL });
  s += S.text(px(bx), ay + 38, 'shoulder', { a: 'middle', size: 10 });
  for (const [x, m, lab] of [[0, po.m2, `${dec(po.m2, 2)} kg`], [po.L, po.m1, `${dec(po.m1, 2)} kg`]]) {
    s += S.line(px(x), ay, px(x), ay + 30, { c: MUT, w: 1 });
    s += S.rect(px(x) - 14, ay + 30, 28, 24, { c: BLUE, fill: BLUE, fop: 0.25, rx: 3 });
    s += S.text(px(x), ay + 46, lab, { a: 'middle', size: 10 });
  }
  const dy = 24;
  s += S.arrow(px(0), dy, px(bx), dy, { c: MUT, w: 1, size: 5 }) + S.arrow(px(bx), dy, px(0), dy, { c: MUT, w: 1, size: 5 });
  s += S.arrow(px(bx), dy, px(po.L), dy, { c: MUT, w: 1, size: 5 }) + S.arrow(px(po.L), dy, px(bx), dy, { c: MUT, w: 1, size: 5 });
  s += S.text((px(0) + px(bx)) / 2, dy - 5, `${dec(bx, 2)} m`, { a: 'middle', size: 10 }) + S.text((px(bx) + px(po.L)) / 2, dy - 5, `${dec(po.L - bx, 2)} m`, { a: 'middle', size: 10 });
  s += S.lines(w / 2, 150, [`${dec(po.m2, 2)} kg × ${dec(bx, 2)} m = ${dec(po.m1, 2)} kg × ${dec(po.L - bx, 2)} m: equal moments about the shoulder`, `the shoulder carries (${dec(po.m1, 2)} + ${dec(po.m2, 2)}) × 9.8 = ${dec(po.N, 3)} N`], { a: 'middle', size: 10, dy: 16 });
  s += S.text(w / 2, 198, 'Light pole (its weight is neglected), balanced at the CM of the two loads.', { a: 'middle', size: 10, c: MUT });
  const m18 = po.m2 * 9.8 * bx;
  const m12 = po.m1 * 9.8 * (po.L - bx);
  check(near(m18, m12, 1e-9) && near(bx, 0.6, 1e-9) && near(bx / (po.L - bx), po.m1 / po.m2, 1e-9), `pole: balance point ${dec(bx, 2)} m from the 18 kg load; moments ${dec(m18, 4)} = ${dec(m12, 4)} N m; distances inversely as the loads`);
  return svgDoc(w, h, 'A light carrying pole 1.5 metres long with an 18 kilogram load at one end and a 12 kilogram load at the other balances on a shoulder 0.6 metres from the heavier load; the moments of the two weights about the shoulder are equal', s);
})();

export const ALL = { CM2, LSHAPE, SLED, TORQUE, LINEL, SPIN, BEAM, BRACKET, TOPPLE, MOIBARS, POLE };
void g;
void pd;
void t3;
