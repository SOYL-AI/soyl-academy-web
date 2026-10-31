// ISC ch07 diagrams. Directions of fields and forces are computed as cross products in explicit coordinates and compared
// with the arrows drawn (SELF_CHECKS, read by build.mjs). Screen coordinates: x right, y down, z INTO the page
// (right-handed: x × y = z), so "into the page" is +z and "out of the page" is −z. The Oersted panel uses map coordinates
// (x east, y north, z up). BIOT, LOOP_AXIS, AMPERE, SOLENOID, CIRCLE, SELECTOR and PARALLEL are copied from
// cbse-12-physics-ch04/src/svgs.mjs (same physics); OERSTED, FORCE_DEF, FINITE, HELIX and ROD are new.
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

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
/** Out-of-page (dot) or into-page (cross) symbol in a circle. */
function outIn(x, y, out, c = ACC) {
  return S.circle(x, y, 8, { c, sw: 1.5 }) + (out ? S.circle(x, y, 2.2, { c, fill: c }) : S.line(x - 5, y - 5, x + 5, y + 5, { c, w: 1.3 }) + S.line(x - 5, y + 5, x + 5, y - 5, { c, w: 1.3 }));
}

// ---------------------------------------------------------------- Oersted's experiment (top view, north up the page)
export const OERSTED = (() => {
  const w = 380;
  const h = 220;
  let s = '';
  // map coordinates: x east, y north, z up (towards the viewer). The wire runs north–south ABOVE the compass.
  // Current northwards; the compass is below the wire, so r̂ (wire → compass) = −z. B ∝ I × r̂.
  const B = cross([0, 1, 0], [0, 0, -1]);
  check(B[0] < 0 && Math.abs(B[1]) < 1e-12, 'Oersted: with the current flowing north in a wire above the needle, B at the needle points west, so the N pole swings west (left), as drawn');
  const dev = (40 * Math.PI) / 180; // drawn deflection from north towards west
  const panel = (ox, on) => {
    let p = '';
    const cx = ox + 90;
    const cy = 110;
    p += S.circle(cx, cy, 52, { c: 'currentColor', sw: 1.5, fill: FILL, fop: 0.5 });
    p += S.text(cx + 8, cy - 56, 'N', { size: 11, w: 'bold' }) + S.text(cx - 60, cy + 4, 'W', { a: 'end', size: 11 }) + S.text(cx + 60, cy + 4, 'E', { size: 11 });
    const a = on ? dev : 0; // angle of the N pole from north, towards west
    const tip = [cx - 40 * Math.sin(a), cy - 40 * Math.cos(a)];
    const tail = [cx + 40 * Math.sin(a), cy + 40 * Math.cos(a)];
    const side = [6 * Math.cos(a), -6 * Math.sin(a)];
    p += S.path(`M${f1(tip[0])} ${f1(tip[1])} L${f1(cx + side[0])} ${f1(cy + side[1])} L${f1(cx - side[0])} ${f1(cy - side[1])} Z`, { c: POS, fill: POS, fop: 0.8, w: 1 });
    p += S.path(`M${f1(tail[0])} ${f1(tail[1])} L${f1(cx + side[0])} ${f1(cy + side[1])} L${f1(cx - side[0])} ${f1(cy - side[1])} Z`, { c: NEG, fill: NEG, fop: 0.5, w: 1 });
    // the wire, drawn over the compass (it is above it)
    p += S.line(cx, 30, cx, 190, { c: on ? ACC : MUT, w: 3 });
    if (on) p += S.arrow(cx, 182, cx, 150, { c: ACC, w: 3 }) + S.text(cx + 8, 182, 'I (north)', { size: 10 });
    p += S.text(cx, 210, on ? 'current on: N pole swings west' : 'no current: needle points north', { a: 'middle', size: 11 });
    return p;
  };
  s += panel(0, false) + panel(190, true);
  return svgDoc(w, h, 'Oersted’s experiment seen from above: a wire runs north–south just above a compass needle. With no current the needle points north; when a current flows north in the wire the north pole of the needle swings towards the west', s);
})();

// ---------------------------------------------------------------- defining B: F = q v × B
export const FORCE_DEF = (() => {
  const w = 320;
  const h = 210;
  let s = '';
  const O = [110, 140];
  const th = (35 * Math.PI) / 180;
  s += S.arrow(O[0], O[1], O[0] + 150, O[1], { c: POS, w: 2.4 }) + S.text(O[0] + 156, O[1] + 4, 'v', { it: true, w: 'bold' });
  const Bt = [O[0] + 140 * Math.cos(th), O[1] - 140 * Math.sin(th)];
  s += S.arrow(O[0], O[1], Bt[0], Bt[1], { c: NEG, w: 2.4 }) + S.text(Bt[0] + 6, Bt[1], 'B', { it: true, w: 'bold' });
  s += S.path(`M${O[0] + 45} ${O[1]} A45 45 0 0 0 ${f1(O[0] + 45 * Math.cos(th))} ${f1(O[1] - 45 * Math.sin(th))}`, { c: 'currentColor', w: 1 }) + S.text(O[0] + 52, O[1] - 10, 'θ', { it: true });
  // screen coordinates: v = +x, B = (cos θ, −sin θ, 0); v × B has z = −sin θ < 0 → out of the page for +q
  const F = cross([1, 0, 0], [Math.cos(th), -Math.sin(th), 0]);
  check(F[2] < 0 && Math.abs(F[0]) < 1e-12 && Math.abs(F[1]) < 1e-12, 'force definition: for +q with v to the right and B up-right in the page, F = q v × B points out of the page (dot), as drawn');
  s += charge(O[0], O[1], 1, '') + outIn(O[0] - 40, O[1] - 50, true) + S.text(O[0] - 54, O[1] - 66, 'F out of page', { size: 10 });
  s += S.text(160, 22, 'F = q v × B', { a: 'middle', size: 13, w: 'bold' });
  s += S.text(160, 40, 'F = qvB sin θ, at right angles to v and to B', { a: 'middle', size: 10 });
  s += S.text(160, 190, 'B = F / (qv sin θ); unit tesla (T)', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'Defining the magnetic field: a positive charge q moves to the right with velocity v, and the field B makes angle theta with v in the plane of the page; the force q v cross B, of size q v B sine theta, points out of the page, perpendicular to both v and B', s);
})();

// ---------------------------------------------------------------- Biot–Savart element (copied)
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
  const dB = cross([1, 0, 0], [P[0] - 135, P[1] - 170, 0]);
  check(dB[2] < 0, 'Biot–Savart: dl × r for a current to the right and P above the wire points out of the page (dot)');
  s += outIn(P[0] - 40, P[1] + 4, true) + S.text(P[0] - 52, P[1] + 8, 'dB out of page', { a: 'end', size: 10 });
  s += S.text(20, 24, 'dB = (μ₀/4π) I (dl × r) / r³', { size: 12, w: 'bold' });
  return svgDoc(w, h, 'Biot Savart law: a current element I d l on a wire and a point P at distance r, at angle theta to the element; the field d B at P is perpendicular to both d l and r, here out of the page, with size mu nought over four pi times I d l sine theta over r squared', s);
})();

// ---------------------------------------------------------------- circular coil: field on the axis (copied)
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
  check(Math.abs(a[1] + b[1]) < 1e-12 && a[0] > 0 && b[0] > 0, 'coil axis: the perpendicular parts of dB from opposite elements cancel and the axial parts add, along +x as drawn');
  s += S.circle(cx, cy - 80, 7, { c: POS, sw: 1.5, fill: FILL }) + S.circle(cx, cy - 80, 2, { c: POS, fill: POS });
  s += S.circle(cx, cy + 80, 7, { c: POS, sw: 1.5, fill: FILL }) + S.line(cx - 5, cy + 75, cx + 5, cy + 85, { c: POS, w: 1.2 }) + S.line(cx - 5, cy + 85, cx + 5, cy + 75, { c: POS, w: 1.2 });
  s += S.text(cx + 12, cy - 86, 'I out', { size: 10 }) + S.text(cx + 12, cy + 96, 'I in', { size: 10 });
  s += S.text(235, 222, 'B = μ₀NIR² / 2(R² + x²)^(3/2)', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'A circular coil of radius R carrying current I, seen edge on, and a point P on its axis at distance x; elements at opposite ends of a diameter give equal fields d B whose components across the axis cancel and whose components along the axis add', s);
})();

// ---------------------------------------------------------------- Ampere's law: straight wire, current out of the page (copied)
export const AMPERE = (() => {
  const w = 280;
  const h = 250;
  const C = [140, 125];
  let s = '';
  for (const rr of [35, 65, 95]) {
    s += S.circle(C[0], C[1], rr, { c: ACC, sw: 1.3, dash: rr === 65 ? null : '5 3' });
    s += S.head(C[0] + rr, C[1] - 4, -Math.PI / 2, { c: ACC, size: 8 });
  }
  const Bdir = cross([0, 0, -1], [1, 0, 0]);
  check(Bdir[1] < 0, 'Ampere: for current out of the page, B to the right of the wire points up (anticlockwise on screen), as drawn');
  s += S.circle(C[0], C[1], 9, { c: POS, sw: 2, fill: POS, fop: 0.2 }) + S.circle(C[0], C[1], 2.5, { c: POS, fill: POS });
  s += S.text(8, 16, 'I out of the page', { size: 10 });
  s += S.text(272, 16, 'Amperian loops', { a: 'end', size: 10 });
  s += S.text(140, 244, 'B·2πr = μ₀I, so B = μ₀I/2πr', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'A long straight wire carrying current out of the page: the field lines are concentric circles running anticlockwise as seen from the front; along a circular Amperian loop of radius r the field is tangential and of constant size', s);
})();

// ---------------------------------------------------------------- long solenoid (copied)
export const SOLENOID = (() => {
  const w = 400;
  const h = 200;
  let s = '';
  for (let i = 0; i < 12; i++) {
    const x = 80 + i * 20;
    s += S.circle(x, 55, 5, { c: POS, sw: 1.5 }) + S.circle(x, 55, 1.8, { c: POS, fill: POS });
    s += S.circle(x, 145, 5, { c: NEG, sw: 1.5 }) + S.line(x - 3.5, 141.5, x + 3.5, 148.5, { c: NEG, w: 1.2 }) + S.line(x - 3.5, 148.5, x + 3.5, 141.5, { c: NEG, w: 1.2 });
  }
  for (const y of [80, 124]) s += S.arrow(60, y, 340, y, { c: ACC, w: 1.6 });
  const B = cross([0, 0, -1], [0, 1, 0]);
  check(B[0] > 0, 'solenoid: upper turns with current out of the page give a field to the right inside, as drawn');
  s += S.path('M340 80 C390 60 390 20 200 20 C30 20 20 60 60 80', { c: MUT, w: 1.2, dash: '4 3' }) + S.path('M340 120 C390 140 390 180 200 180 C30 180 20 140 60 120', { c: MUT, w: 1.2, dash: '4 3' });
  s += S.text(200, 106, 'B = μ₀nI inside (n = N/L)', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(370, 104, 'N', { w: 'bold' }) + S.text(30, 104, 'S', { w: 'bold' });
  return svgDoc(w, h, 'Section through a long solenoid: current comes out of the page in the upper turns and goes in at the lower turns; inside, the field runs along the axis with size mu nought n I; outside it is weak, and the ends behave like the poles of a bar magnet', s);
})();

// ---------------------------------------------------------------- finite straight conductor (formula only)
export const FINITE_DATA = { a: 3, half: 4 }; // cm: worked example 4 (8.0 cm wire, P 3.0 cm from its midpoint)
export const FINITE = (() => {
  const w = 340;
  const h = 240;
  let s = '';
  const k = 22; // px per cm
  const X = 90;
  const O = [X, 115];
  const top = O[1] - FINITE_DATA.half * k;
  const bot = O[1] + FINITE_DATA.half * k;
  const P = [X + FINITE_DATA.a * k, O[1]];
  s += S.line(X, top, X, bot, { c: POS, w: 3 }) + S.arrow(X, bot - 10, X, top + 30, { c: POS, w: 3 }) + S.text(X - 10, top + 26, 'I', { a: 'end', it: true, w: 'bold' });
  s += S.line(O[0], O[1], P[0], P[1], { c: 'currentColor', w: 1.2, dash: '4 3' }) + S.text(O[0] + 16, O[1] - 6, 'a', { a: 'middle', it: true });
  s += S.line(P[0], P[1], X, top, { c: MUT, w: 1 }) + S.line(P[0], P[1], X, bot, { c: MUT, w: 1 });
  s += S.circle(P[0], P[1], 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(P[0] + 8, P[1] + 4, 'P', { w: 'bold' });
  // angles at P measured from the perpendicular PO to the lines to the two ends
  const al = Math.atan2(O[1] - top, P[0] - X);
  const be = Math.atan2(bot - O[1], P[0] - X);
  const arc = (r0, ang, up) => S.path(`M${f1(P[0] - r0)} ${P[1]} A${r0} ${r0} 0 0 ${up ? 1 : 0} ${f1(P[0] - r0 * Math.cos(ang))} ${f1(P[1] + (up ? -1 : 1) * r0 * Math.sin(ang))}`, { c: ACC, w: 1.2 });
  s += arc(26, al, true) + S.text(P[0] - 34, P[1] - 14, 'α', { a: 'middle', it: true, c: ACC });
  s += arc(34, be, false) + S.text(P[0] - 42, P[1] + 26, 'β', { a: 'middle', it: true, c: ACC });
  const sa = FINITE_DATA.half / Math.hypot(FINITE_DATA.half, FINITE_DATA.a);
  check(Math.abs(Math.sin(al) - sa) < 1e-9 && Math.abs(Math.sin(be) - sa) < 1e-9 && Math.abs(sa - 0.8) < 1e-9, 'finite wire: drawn to scale (8.0 cm wire, P 3.0 cm from the midpoint), sin α = sin β = 0.8');
  // field at P: current up the page (−y), P to the right (+x): (0,−1,0) × (1,0,0) = (0,0,1) → into the page
  const B = cross([0, -1, 0], [1, 0, 0]);
  check(B[2] > 0, 'finite wire: for current up the page, B at P on the right is into the page (cross), as drawn');
  s += outIn(P[0] + 40, P[1] - 40, false) + S.text(P[0] + 52, P[1] - 36, 'B', { w: 'bold' });
  s += S.text(w / 2, 226, 'B = (μ₀I / 4πa)(sin α + sin β)', { a: 'middle', size: 12, w: 'bold' });
  return svgDoc(w, h, 'A straight wire of finite length carrying current I upwards and a point P at perpendicular distance a from it; the ends of the wire subtend angles alpha and beta at P, measured from the perpendicular; the field at P is into the page, of size mu nought I over four pi a times sine alpha plus sine beta', s);
})();

// ---------------------------------------------------------------- circular motion in a uniform field (copied)
export const CIRCLE = (() => {
  const w = 320;
  const h = 260;
  const C = [160, 135];
  const R = 80;
  let s = fieldGrid(20, 20, 300, 240, 28, true);
  s += S.text(300, 14, 'B (into page)', { a: 'end', size: 11 });
  s += S.circle(C[0], C[1], R, { c: ACC, sw: 1.8, dash: '6 4' });
  const P = [C[0], C[1] + R];
  const F = cross([1, 0, 0], [0, 0, 1]);
  check(F[1] < 0 && Math.abs(F[0]) < 1e-12, 'circle: for +q moving right with B into the page, F = qv × B points up, towards the centre');
  s += charge(P[0], P[1], 1, '+q');
  s += S.arrow(P[0] + 12, P[1], P[0] + 60, P[1], { c: POS, w: 2.2 }) + S.text(P[0] + 64, P[1] + 4, 'v', { it: true, w: 'bold' });
  s += S.arrow(P[0], P[1] - 12, P[0], P[1] - 50, { c: ACC, w: 2.2 }) + S.text(P[0] + 6, P[1] - 40, 'F', { it: true, w: 'bold' });
  s += S.circle(C[0], C[1], 2.5, { c: 'currentColor', fill: 'currentColor' }) + S.line(C[0], C[1], C[0] + R * Math.cos(-0.6), C[1] + R * Math.sin(-0.6), { c: MUT, w: 1 }) + S.text(C[0] + 40, C[1] - 30, 'r', { it: true });
  s += S.head(C[0] + R, C[1] - 8, -Math.PI / 2, { c: ACC, size: 8 });
  s += S.text(160, 252, 'r = mv/qB; T = 2πm/qB, the same for every speed', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'A positive charge moving to the right in a uniform magnetic field directed into the page feels a force q v cross B towards the centre of a circle, so it goes round anticlockwise on a circle of radius m v over q B', s);
})();

// ---------------------------------------------------------------- helical path (side view; B along +x)
export const HELIX = (() => {
  const w = 380;
  const h = 200;
  let s = '';
  const y0 = 100;
  const amp = 42;
  const pitch = 100; // px
  const x0 = 40;
  const turns = 3;
  let d = `M${x0} ${y0}`;
  for (let i = 1; i <= turns * 60; i++) {
    const t = (i / 60) * 2 * Math.PI;
    d += ` L${f1(x0 + (pitch * t) / (2 * Math.PI))} ${f1(y0 - amp * Math.sin(t))}`;
  }
  s += S.path(d, { c: ACC, w: 1.8 });
  s += S.arrow(20, 180, 360, 180, { c: NEG, w: 2 }) + S.text(352, 172, 'B', { a: 'end', w: 'bold', it: true });
  s += S.line(x0 + pitch * 0.25, 30, x0 + pitch * 0.25, 46, { w: 1 }) + S.line(x0 + pitch * 1.25, 30, x0 + pitch * 1.25, 46, { w: 1 }) + S.line(x0 + pitch * 0.25, 38, x0 + pitch * 1.25, 38, { w: 1 });
  s += S.text(x0 + pitch * 0.75, 24, 'pitch p', { a: 'middle', size: 11 });
  s += S.line(x0 + pitch * 2.25, y0, x0 + pitch * 2.25, y0 - amp, { c: MUT, w: 1 }) + S.text(x0 + pitch * 2.25 + 6, y0 - amp / 2, 'r', { it: true });
  s += S.line(20, y0, 360, y0, { c: MUT, w: 1, dash: '4 3' });
  // the drawn crest-to-crest distance is one pitch
  const crest = (n) => x0 + pitch * (0.25 + n);
  check(Math.abs(crest(1) - crest(0) - pitch) < 1e-9, 'helix: the distance between successive crests drawn equals the pitch marked');
  s += S.text(190, 196, 'r = mv sin θ / qB;  p = v cos θ × 2πm/qB', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'Side view of a helical path: a charged particle entering a uniform magnetic field at an angle theta circles about the field direction with radius m v sine theta over q B while drifting along the field, advancing one pitch, v cos theta times the period, in each turn', s);
})();

// ---------------------------------------------------------------- velocity selector (copied)
export const SELECTOR = (() => {
  const w = 360;
  const h = 210;
  let s = '';
  s += S.rect(60, 30, 240, 8, { c: POS, sw: 1.2, fill: POS, fop: 0.3 }) + S.rect(60, 172, 240, 8, { c: NEG, sw: 1.2, fill: NEG, fop: 0.3 });
  s += S.text(305, 38, '+', { c: POS, size: 14 }) + S.text(305, 180, '−', { c: NEG, size: 14 });
  s += fieldGrid(80, 60, 290, 150, 30, true);
  for (const x of [100, 180, 260]) s += S.arrow(x, 44, x, 80, { c: MUT, w: 1, size: 5 });
  s += S.text(330, 70, 'E ↓', { size: 11 }) + S.text(330, 90, 'B ⊗', { size: 11 });
  const Fe = [0, 1, 0];
  const Fm = cross([1, 0, 0], [0, 0, 1]);
  check(Fm[1] < 0 && Fe[1] > 0, 'crossed fields: the electric force (down) and the magnetic force (up) on +q moving right are opposite');
  s += charge(40, 105, 1, '') + S.arrow(52, 105, 330, 105, { c: ACC, w: 1.6, dash: '6 4' });
  s += S.text(40, 128, '+q, v', { a: 'middle', size: 11 });
  s += S.arrow(150, 112, 150, 140, { c: POS, w: 2 }) + S.text(156, 140, 'qE', { size: 11 });
  s += S.arrow(150, 98, 150, 70, { c: ACC, w: 2 }) + S.text(156, 74, 'qvB', { size: 11 });
  s += S.text(200, 200, 'goes straight through when v = E/B', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Crossed electric and magnetic fields: a positive charge moving right between plates has an electric force q E downwards and a magnetic force q v B upwards from a field into the page; only charges with speed E over B go straight through', s);
})();

// ---------------------------------------------------------------- force on a straight conductor
export const ROD = (() => {
  const w = 320;
  const h = 230;
  let s = fieldGrid(30, 30, 290, 190, 32, true);
  s += S.text(300, 16, 'B into the page', { a: 'end', size: 11 });
  const X = 174; // between two columns of field symbols
  s += S.line(X, 30, X, 200, { c: POS, w: 4 }) + S.arrow(X, 150, X, 80, { c: POS, w: 4, size: 9 }) + S.text(X + 8, 112, 'I', { it: true, w: 'bold' });
  s += S.text(X + 10, 214, 'length l', { size: 10 });
  // I up the page = (0,−1,0), B into the page = (0,0,1): I l × B = (−1, 0, 0) → to the left
  const F = cross([0, -1, 0], [0, 0, 1]);
  check(F[0] < 0 && Math.abs(F[1]) < 1e-12, 'conductor: for current up the page in a field into the page, F = I l × B points to the left, as drawn');
  s += S.arrow(X - 8, 115, X - 90, 115, { c: ACC, w: 3 }) + S.text(X - 70, 106, 'F', { a: 'middle', w: 'bold' });
  s += S.text(160, 226, 'F = I l × B;  F = BIl sin θ', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'A straight conductor of length l carrying current I up the page in a uniform magnetic field directed into the page; the force I l cross B on it points to the left, perpendicular to both the wire and the field', s);
})();

// ---------------------------------------------------------------- parallel currents (copied)
export const PARALLEL = (() => {
  const w = 320;
  const h = 210;
  let s = '';
  s += S.line(90, 20, 90, 190, { c: POS, w: 3 }) + S.line(230, 20, 230, 190, { c: POS, w: 3 });
  s += S.arrow(90, 70, 90, 35, { c: POS, w: 3 }) + S.arrow(230, 70, 230, 35, { c: POS, w: 3 });
  s += S.text(76, 40, 'I₁', { a: 'end', w: 'bold' }) + S.text(244, 40, 'I₂', { w: 'bold' });
  const B1 = cross([0, -1, 0], [1, 0, 0]);
  const F2 = cross([0, -1, 0], B1);
  check(B1[2] > 0 && F2[0] < 0, 'parallel currents: B of wire 1 at wire 2 is into the page and the force on wire 2 points towards wire 1 (attraction)');
  s += S.line(222, 112, 238, 128, { c: ACC, w: 1.4 }) + S.line(222, 128, 238, 112, { c: ACC, w: 1.4 }) + S.text(244, 136, 'B₁', { size: 11 });
  s += S.arrow(226, 160, 180, 160, { c: ACC, w: 2.2 }) + S.text(190, 152, 'F', { w: 'bold' });
  s += S.arrow(94, 160, 140, 160, { c: ACC, w: 2.2 }) + S.text(126, 152, 'F', { w: 'bold' });
  s += S.line(90, 198, 230, 198, { c: 'currentColor', w: 1 }) + S.text(160, 194, 'r', { a: 'middle', it: true });
  s += S.text(160, 15, 'like currents attract; unlike repel', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Two long parallel wires a distance r apart carrying currents in the same direction: the field of wire 1 at wire 2 is into the page and the forces on the wires point towards each other, so they attract; with opposite currents they repel', s);
})();

export const ALL = { OERSTED, FORCE_DEF, BIOT, LOOP_AXIS, AMPERE, SOLENOID, FINITE, CIRCLE, HELIX, SELECTOR, ROD, PARALLEL };
void GRN;
