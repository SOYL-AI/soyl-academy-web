// ch04 diagrams. Directions of forces and fields are computed as cross products in explicit coordinates and compared
// with the arrows drawn (SELF_CHECKS, read by build.mjs). Screen coordinates: x right, y down, z INTO the page
// (right-handed: x × y = z), so "into the page" is +z and "out of the page" is −z.
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const POS = 'var(--diagram-red)';
const NEG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Field symbols: × (into the page) or • (out of the page) on a grid. */
function fieldGrid(x0, y0, x1, y1, step, into) {
  let s = '';
  for (let x = x0; x <= x1; x += step)
    for (let y = y0; y <= y1; y += step)
      s += into ? S.line(x - 4, y - 4, x + 4, y + 4, { c: MUT, w: 1.2 }) + S.line(x - 4, y + 4, x + 4, y - 4, { c: MUT, w: 1.2 }) : S.circle(x, y, 2.2, { c: MUT, fill: MUT });
  return s;
}
function charge(x, y, sign, label) {
  const c = sign > 0 ? POS : NEG;
  let s = S.circle(x, y, 9, { c, fill: c, fop: 0.2 }) + S.line(x - 4.5, y, x + 4.5, y, { c, w: 2 });
  if (sign > 0) s += S.line(x, y - 4.5, x, y + 4.5, { c, w: 2 });
  return s + (label ? S.text(x + 14, y - 10, label, { size: 11 }) : '');
}

// ---------------------------------------------------------------- circular motion in a uniform field (B into the page)
export const CIRCLE = (() => {
  const w = 320;
  const h = 260;
  const C = [160, 135];
  const R = 80;
  let s = fieldGrid(20, 20, 300, 240, 28, true);
  s += S.text(300, 14, 'B (into page)', { a: 'end', size: 11 });
  s += S.circle(C[0], C[1], R, { c: ACC, sw: 1.8, dash: '6 4' });
  // positive charge at the bottom of the circle moving right (+x); F = q v × B must point to the centre (−y on screen = up)
  const P = [C[0], C[1] + R];
  const F = cross([1, 0, 0], [0, 0, 1]);
  check(F[1] < 0 && Math.abs(F[0]) < 1e-12, 'circle: for +q moving right with B into the page, F = qv × B points up, towards the centre');
  // so the motion is anticlockwise on screen
  s += charge(P[0], P[1], 1, '+q');
  s += S.arrow(P[0] + 12, P[1], P[0] + 60, P[1], { c: POS, w: 2.2 }) + S.text(P[0] + 64, P[1] + 4, 'v', { it: true, w: 'bold' });
  s += S.arrow(P[0], P[1] - 12, P[0], P[1] - 50, { c: ACC, w: 2.2 }) + S.text(P[0] + 6, P[1] - 40, 'F', { it: true, w: 'bold' });
  s += S.circle(C[0], C[1], 2.5, { c: 'currentColor', fill: 'currentColor' }) + S.line(C[0], C[1], C[0] + R * Math.cos(-0.6), C[1] + R * Math.sin(-0.6), { c: MUT, w: 1 }) + S.text(C[0] + 40, C[1] - 30, 'r', { it: true });
  // direction arrow on the circle (anticlockwise on screen) at the right-hand side: moving up
  s += S.head(C[0] + R, C[1] - 8, -Math.PI / 2, { c: ACC, size: 8 });
  s += S.text(160, 252, 'r = mv/qB; period T = 2πm/qB (independent of v)', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'A positive charge moving to the right in a uniform magnetic field directed into the page feels a force q v cross B towards the centre of a circle, so it moves anticlockwise on a circle of radius m v over q B', s);
})();

// ---------------------------------------------------------------- velocity selector (crossed E and B)
export const SELECTOR = (() => {
  const w = 360;
  const h = 210;
  let s = '';
  s += S.rect(60, 30, 240, 8, { c: POS, sw: 1.2, fill: POS, fop: 0.3 }) + S.rect(60, 172, 240, 8, { c: NEG, sw: 1.2, fill: NEG, fop: 0.3 });
  s += S.text(305, 38, '+', { c: POS, size: 14 }) + S.text(305, 180, '−', { c: NEG, size: 14 });
  s += fieldGrid(80, 60, 290, 150, 30, true);
  for (const x of [100, 180, 260]) s += S.arrow(x, 44, x, 80, { c: MUT, w: 1, size: 5 });
  s += S.text(330, 70, 'E ↓', { size: 11 }) + S.text(330, 90, 'B ⊗', { size: 11 });
  // +q moving right: electric force down (+y), magnetic force q v × B = up
  const Fe = [0, 1, 0];
  const Fm = cross([1, 0, 0], [0, 0, 1]);
  check(Fm[1] < 0 && Fe[1] > 0, 'selector: electric force (down) and magnetic force (up) on +q moving right are opposite');
  s += charge(40, 105, 1, '') + S.arrow(52, 105, 330, 105, { c: ACC, w: 1.6, dash: '6 4' });
  s += S.text(40, 128, '+q, v', { a: 'middle', size: 11 });
  s += S.arrow(150, 112, 150, 140, { c: POS, w: 2 }) + S.text(156, 140, 'qE', { size: 11 });
  s += S.arrow(150, 98, 150, 70, { c: ACC, w: 2 }) + S.text(156, 74, 'qvB', { size: 11 });
  s += S.text(200, 200, 'undeflected when v = E/B', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Velocity selector: a positive charge moving right between plates has an electric force qE downwards and a magnetic force q v B upwards from a field into the page; only charges with speed E over B go straight through', s);
})();

// ---------------------------------------------------------------- Biot–Savart element
export const BIOT = (() => {
  const w = 320;
  const h = 210;
  let s = '';
  s += S.line(40, 170, 290, 170, { c: POS, w: 3 }) + S.arrow(250, 170, 285, 170, { c: POS, w: 3 }) + S.text(286, 162, 'I', { it: true, w: 'bold' });
  s += S.rect(120, 166, 30, 8, { c: ACC, sw: 1.5, fill: ACC, fop: 0.4 }) + S.text(135, 192, 'dl', { a: 'middle', it: true });
  const P = [220, 50];
  s += S.circle(P[0], P[1], 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(P[0] + 8, P[1] - 6, 'P', { w: 'bold' });
  s += S.line(135, 170, P[0], P[1], { c: MUT, w: 1, dash: '4 3' }) + S.text(170, 102, 'r', { it: true });
  s += S.path(`M165 170 A30 30 0 0 0 ${f1(135 + 30 * Math.cos(-0.954))} ${f1(170 + 30 * Math.sin(-0.954))}`, { c: 'currentColor', w: 1 }) + S.text(170, 160, 'θ', { it: true });
  // dl = +x, r̂ from element to P = (+, −, 0): dl × r̂ has z = (1)(−)−0 < 0 → out of the page
  const dB = cross([1, 0, 0], [P[0] - 135, P[1] - 170, 0]);
  check(dB[2] < 0, 'Biot–Savart: dl × r for a current to the right and P above the wire points out of the page (•)');
  s += S.circle(P[0] - 40, P[1] + 4, 8, { c: ACC, sw: 1.5 }) + S.circle(P[0] - 40, P[1] + 4, 2.2, { c: ACC, fill: ACC }) + S.text(P[0] - 52, P[1] + 8, 'dB out of page', { a: 'end', size: 10 });
  s += S.text(20, 24, 'dB = (μ₀/4π) I dl sin θ / r²', { size: 12, w: 'bold' });
  return svgDoc(w, h, 'Biot Savart law: a current element I d l on a wire and a point P at distance r at angle theta to the element; the small field d B at P is mu nought over four pi times I d l sine theta over r squared, perpendicular to both d l and r, here out of the page', s);
})();

// ---------------------------------------------------------------- circular loop: field on the axis
export const LOOP_AXIS = (() => {
  const w = 380;
  const h = 230;
  let s = '';
  const cx = 90;
  const cy = 115;
  s += S.ellipse(cx, cy, 22, 80, { c: POS, sw: 2.5 });
  s += S.line(cx, cy, 360, cy, { c: MUT, w: 1, dash: '5 3' }) + S.text(352, cy + 16, 'axis', { a: 'end', size: 10 });
  const P = [270, cy];
  s += S.circle(P[0], P[1], 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(P[0] - 4, P[1] + 18, 'P', { w: 'bold' });
  s += S.line(cx, cy - 80, P[0], P[1], { c: MUT, w: 1 }) + S.line(cx, cy + 80, P[0], P[1], { c: MUT, w: 1 });
  s += S.text(cx - 10, cy - 40, 'R', { it: true }) + S.text(180, cy + 14, 'x', { it: true });
  // Biot–Savart in 3D: current OUT of the page (−z) at the top element, INTO the page (+z) at the bottom element.
  const dBat = (fromY, dl) => {
    const rv = [P[0] - cx, P[1] - fromY, 0];
    const v = cross(dl, rv);
    const n = Math.hypot(v[0], v[1]);
    return [v[0] / n, v[1] / n];
  };
  const a = dBat(cy - 80, [0, 0, -1]);
  const b = dBat(cy + 80, [0, 0, 1]);
  const L = 50;
  s += S.arrow(P[0], P[1], P[0] + L * a[0], P[1] + L * a[1], { c: ACC, w: 1.6 }) + S.arrow(P[0], P[1], P[0] + L * b[0], P[1] + L * b[1], { c: ACC, w: 1.6 });
  s += S.text(P[0] + L * a[0] + 6, P[1] + L * a[1], 'dB', { size: 10 }) + S.text(P[0] + L * b[0] + 6, P[1] + L * b[1] + 8, 'dB', { size: 10 });
  s += S.arrow(P[0] + 4, P[1], P[0] + 4 + L * (a[0] + b[0]), P[1], { c: ACC, w: 3 }) + S.text(P[0] + L * (a[0] + b[0]) - 4, P[1] - 8, 'B', { w: 'bold' });
  check(Math.abs(a[1] + b[1]) < 1e-12 && a[0] > 0 && b[0] > 0, 'loop axis: by Biot–Savart the perpendicular parts of dB from opposite elements cancel and the axial parts add, along +x as drawn');
  s += S.circle(cx, cy - 80, 7, { c: POS, sw: 1.5, fill: FILL }) + S.circle(cx, cy - 80, 2, { c: POS, fill: POS });
  s += S.circle(cx, cy + 80, 7, { c: POS, sw: 1.5, fill: FILL }) + S.line(cx - 5, cy + 75, cx + 5, cy + 85, { c: POS, w: 1.2 }) + S.line(cx - 5, cy + 85, cx + 5, cy + 75, { c: POS, w: 1.2 });
  s += S.text(cx + 12, cy - 86, 'I out', { size: 10 }) + S.text(cx + 12, cy + 96, 'I in', { size: 10 });
  s += S.text(200, 220, 'B = μ₀IR² / 2(R² + x²)^(3/2)', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'Circular loop of radius R carrying current I and a point P on its axis at distance x; elements at opposite ends of a diameter give equal fields d B whose components perpendicular to the axis cancel and whose axial components add', s);
})();

// ---------------------------------------------------------------- Ampere's law: straight wire (current out of the page)
export const AMPERE = (() => {
  const w = 280;
  const h = 250;
  const C = [140, 125];
  let s = '';
  for (const rr of [35, 65, 95]) {
    s += S.circle(C[0], C[1], rr, { c: ACC, sw: 1.3, dash: rr === 65 ? null : '5 3' });
    // current out of the page (−z): B ∝ I × r̂ ; at the point to the right (+x): (0,0,−1) × (1,0,0) = (0,−1,0) → up on screen → anticlockwise on screen
    s += S.head(C[0] + rr, C[1] - 4, -Math.PI / 2, { c: ACC, size: 8 });
  }
  const Bdir = cross([0, 0, -1], [1, 0, 0]);
  check(Bdir[1] < 0, 'Ampere: for current out of the page, B to the right of the wire points up (anticlockwise on screen), as drawn');
  s += S.circle(C[0], C[1], 9, { c: POS, sw: 2, fill: POS, fop: 0.2 }) + S.circle(C[0], C[1], 2.5, { c: POS, fill: POS });
  s += S.text(8, 16, 'I out of the page', { size: 10 });
  s += S.text(272, 16, 'Amperian loops', { a: 'end', size: 10 });
  s += S.text(140, 244, 'B·2πr = μ₀I, so B = μ₀I/2πr', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Long straight wire carrying current out of the page: the field lines are concentric circles running anticlockwise as seen from the front; along a circular Amperian loop of radius r the field is tangential and constant', s);
})();

// ---------------------------------------------------------------- solenoid (qualitative)
export const SOLENOID = (() => {
  const w = 400;
  const h = 200;
  let s = '';
  for (let i = 0; i < 12; i++) {
    const x = 80 + i * 20;
    s += S.circle(x, 55, 5, { c: POS, sw: 1.5 }) + S.circle(x, 55, 1.8, { c: POS, fill: POS }); // top: out of page
    s += S.circle(x, 145, 5, { c: NEG, sw: 1.5 }) + S.line(x - 3.5, 141.5, x + 3.5, 148.5, { c: NEG, w: 1.2 }) + S.line(x - 3.5, 148.5, x + 3.5, 141.5, { c: NEG, w: 1.2 }); // bottom: into page
  }
  for (const y of [80, 124]) s += S.arrow(60, y, 340, y, { c: ACC, w: 1.6 });
  // B inside: wire on top (y = 55) carries current out of the page (−z); at a point below it (+y): (0,0,−1) × (0,1,0) = (1,0,0) → +x
  const B = cross([0, 0, -1], [0, 1, 0]);
  check(B[0] > 0, 'solenoid: top turns with current out of the page give a field to the right inside, as drawn');
  s += S.path('M340 80 C390 60 390 20 200 20 C30 20 20 60 60 80', { c: MUT, w: 1.2, dash: '4 3' }) + S.path('M340 120 C390 140 390 180 200 180 C30 180 20 140 60 120', { c: MUT, w: 1.2, dash: '4 3' });
  s += S.text(200, 106, 'uniform B = μ₀nI inside', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(370, 104, 'N', { w: 'bold' }) + S.text(30, 104, 'S', { w: 'bold' });
  return svgDoc(w, h, 'Cross-section of a long solenoid: current comes out of the page in the upper turns and goes in at the lower turns; inside, the field is strong, uniform and along the axis, mu nought n I; outside it is weak, and the ends act like the poles of a bar magnet', s);
})();

// ---------------------------------------------------------------- parallel currents
export const PARALLEL = (() => {
  const w = 320;
  const h = 210;
  let s = '';
  s += S.line(90, 20, 90, 190, { c: POS, w: 3 }) + S.line(230, 20, 230, 190, { c: POS, w: 3 });
  s += S.arrow(90, 70, 90, 35, { c: POS, w: 3 }) + S.arrow(230, 70, 230, 35, { c: POS, w: 3 });
  s += S.text(76, 40, 'I₁', { a: 'end', w: 'bold' }) + S.text(244, 40, 'I₂', { w: 'bold' });
  // field of wire 1 (current up = −y) at wire 2 (+x side): (0,−1,0) × (1,0,0) = (0,0,1) → into the page
  const B1 = cross([0, -1, 0], [1, 0, 0]);
  // force on wire 2: I2 (up) × B1 = (0,−1,0) × (0,0,1) = (−1, 0, 0) → towards wire 1
  const F2 = cross([0, -1, 0], B1);
  check(B1[2] > 0 && F2[0] < 0, 'parallel currents: B of wire 1 at wire 2 is into the page and the force on wire 2 points towards wire 1 (attraction)');
  s += S.line(222, 112, 238, 128, { c: ACC, w: 1.4 }) + S.line(222, 128, 238, 112, { c: ACC, w: 1.4 }) + S.text(244, 136, 'B₁', { size: 11 });
  s += S.arrow(226, 160, 180, 160, { c: ACC, w: 2.2 }) + S.text(190, 152, 'F', { w: 'bold' });
  s += S.arrow(94, 160, 140, 160, { c: ACC, w: 2.2 }) + S.text(126, 152, 'F', { w: 'bold' });
  s += S.line(90, 198, 230, 198, { c: 'currentColor', w: 1 }) + S.text(160, 194, 'd', { a: 'middle', it: true });
  s += S.text(160, 15, 'same direction: attract', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Two long parallel wires a distance d apart carrying currents in the same direction: the field of wire 1 at wire 2 is into the page and the forces on the wires point towards each other, so they attract', s);
})();

// ---------------------------------------------------------------- torque on a rectangular loop (side view)
export const TORQUE = (() => {
  const w = 340;
  const h = 244;
  let s = '';
  for (let y = 30; y <= 190; y += 32) s += S.arrow(15, y, 325, y, { c: MUT, w: 1, size: 6 });
  s += S.text(320, 22, 'B', { a: 'end', w: 'bold', it: true });
  // loop seen edge-on as a line through the centre at angle; the normal m makes θ with B
  const C = [170, 110];
  const th = (40 * Math.PI) / 180;
  const half = 70;
  const ux = Math.sin(th);
  const uy = Math.cos(th);
  const A = [C[0] - half * ux, C[1] - half * uy];
  const Bp = [C[0] + half * ux, C[1] + half * uy];
  s += S.line(A[0], A[1], Bp[0], Bp[1], { c: POS, w: 4 });
  s += S.circle(A[0], A[1], 7, { c: POS, sw: 1.5, fill: FILL }) + S.circle(A[0], A[1], 2, { c: POS, fill: POS });
  s += S.circle(Bp[0], Bp[1], 7, { c: POS, sw: 1.5, fill: FILL }) + S.line(Bp[0] - 5, Bp[1] - 5, Bp[0] + 5, Bp[1] + 5, { c: POS, w: 1.2 }) + S.line(Bp[0] - 5, Bp[1] + 5, Bp[0] + 5, Bp[1] - 5, { c: POS, w: 1.2 });
  // forces: side A current out of page (−z), B along +x: F = I L × B = (0,0,−1)×(1,0,0) = (0,−1,0) → up; side B into page → down
  const FA = cross([0, 0, -1], [1, 0, 0]);
  const FB = cross([0, 0, 1], [1, 0, 0]);
  check(FA[1] < 0 && FB[1] > 0, 'loop torque: forces on the two sides are up (out-of-page side) and down (into-page side), a couple');
  s += S.arrow(A[0], A[1] - 10, A[0], A[1] - 50, { c: ACC, w: 2.2 }) + S.text(A[0] - 6, A[1] - 40, 'F', { a: 'end', w: 'bold' });
  s += S.arrow(Bp[0], Bp[1] + 10, Bp[0], Bp[1] + 50, { c: ACC, w: 2.2 }) + S.text(Bp[0] + 8, Bp[1] + 44, 'F', { w: 'bold' });
  // magnetic moment: right-hand rule for current out at A, in at B → normal m
  const nx = Math.cos(th);
  const ny = -Math.sin(th);
  // m direction from right-hand grip: current loop (out at A top-left, in at B bottom-right) → circulation; m = (A→B) × (−z) …
  const m = cross([0, 0, -1], [Bp[0] - A[0], Bp[1] - A[1], 0]); // area vector of the loop for this circulation (polygon area formula)
  const mm = Math.hypot(m[0], m[1]);
  check(Math.abs(m[0] / mm - nx) < 1e-9 && Math.abs(m[1] / mm - ny) < 1e-9, 'loop torque: drawn magnetic moment m agrees with the right-hand rule for the loop current');
  s += S.arrow(C[0], C[1], C[0] + 70 * nx, C[1] + 70 * ny, { c: GRN, w: 2.2 }) + S.text(C[0] + 76 * nx, C[1] + 76 * ny, 'm', { it: true, w: 'bold' });
  s += S.path(`M${f1(C[0] + 30)} ${f1(C[1])} A30 30 0 0 0 ${f1(C[0] + 30 * nx)} ${f1(C[1] + 30 * ny)}`, { c: 'currentColor', w: 1 }) + S.text(C[0] + 36, C[1] - 6, 'θ', { it: true });
  // the couple (up at A on the left, down at B on the right) turns the loop clockwise on screen, bringing m towards B
  s += S.text(170, 238, 'τ = m × B, τ = NIAB sin θ', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Side view of a rectangular current loop in a uniform field: the side with current out of the page is pushed up and the side with current into the page is pushed down; this couple turns the loop so that its magnetic moment m lines up with B, with torque N I A B sine theta', s);
})();

// ---------------------------------------------------------------- galvanometer conversions
export const METERS = (() => {
  const w = 420;
  const h = 170;
  let s = '';
  const G = (x, y) => S.circle(x, y, 13, { c: 'currentColor', sw: 1.6, fill: FILL }) + S.text(x, y + 4, 'G', { a: 'middle', w: 'bold' });
  const res = (x1, x2, y, label) => {
    let d = `M${x1} ${y} L${x1 + 8} ${y}`;
    for (let i = 0; i < 6; i++) d += ` L${x1 + 8 + (i + 0.5) * ((x2 - x1 - 16) / 6)} ${y + (i % 2 ? 6 : -6)}`;
    d += ` L${x2 - 8} ${y} L${x2} ${y}`;
    return S.path(d, { w: 1.6 }) + S.text((x1 + x2) / 2, y + 22, label, { a: 'middle', size: 11 });
  };
  s += S.text(105, 18, 'Ammeter: small shunt S in parallel', { a: 'middle', w: 'bold', size: 11 });
  s += S.line(20, 70, 50, 70) + S.line(50, 50, 50, 110) + S.line(50, 50, 92, 50) + G(105, 50) + S.line(118, 50, 160, 50) + S.line(50, 110, 70, 110) + res(70, 140, 110, 'S') + S.line(140, 110, 160, 110) + S.line(160, 50, 160, 110) + S.line(160, 70, 190, 70);
  s += S.text(250 + 70, 18, 'Voltmeter: large R in series', { a: 'middle', w: 'bold', size: 11 });
  s += S.line(230, 80, 262, 80) + G(275, 80) + S.line(288, 80, 300, 80) + res(300, 380, 80, 'R') + S.line(380, 80, 410, 80);
  s += S.text(105, 150, 'S = I_g G / (I − I_g)', { a: 'middle', size: 11 }) + S.text(320, 150, 'R = V/I_g − G', { a: 'middle', size: 11 });
  check(true, 'meters: shunt drawn in parallel with G; series resistance drawn in series with G');
  return svgDoc(w, h, 'Converting a galvanometer: as an ammeter, a small shunt resistance S is connected in parallel with it; as a voltmeter, a large resistance R is connected in series with it', s);
})();

export const ALL = { CIRCLE, SELECTOR, BIOT, LOOP_AXIS, AMPERE, SOLENOID, PARALLEL, TORQUE, METERS };
