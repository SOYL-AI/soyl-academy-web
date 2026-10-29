// ch01 diagrams. Field lines are traced numerically (RK4 along the unit field vector of point charges), and every
// arrowhead placed on a field line is checked against the computed field direction (SELF_CHECKS, read by build.mjs).
import { svgDoc, S } from './lib.mjs';

const POS = 'var(--diagram-red)';
const NEG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

/** A charge drawn as a circle with + or − inside. */
function charge(x, y, sign, { rr = 11, label, lx = 0, ly = 22 } = {}) {
  const c = sign > 0 ? POS : NEG;
  let s = S.circle(x, y, rr, { c, sw: 1.5, fill: c, fop: 0.18 });
  s += S.line(x - rr * 0.5, y, x + rr * 0.5, y, { c, w: 2 });
  if (sign > 0) s += S.line(x, y - rr * 0.5, x, y + rr * 0.5, { c, w: 2 });
  if (label) s += S.text(x + lx, y + ly, label, { a: 'middle', size: 11 });
  return s;
}

// ---------------------------------------------------------------- field-line tracer
function field(charges, x, y) {
  let ex = 0;
  let ey = 0;
  for (const c of charges) {
    const dx = x - c.x;
    const dy = y - c.y;
    const r2 = dx * dx + dy * dy;
    const r3 = r2 * Math.sqrt(r2);
    ex += (c.q * dx) / r3;
    ey += (c.q * dy) / r3;
  }
  return [ex, ey];
}
function unitField(charges, x, y, dir) {
  const [ex, ey] = field(charges, x, y);
  const m = Math.hypot(ex, ey) || 1;
  return [(dir * ex) / m, (dir * ey) / m];
}
/** Traces field lines; returns polylines (each from + towards −, i.e. along E). */
function trace(charges, { w, h, perUnit = 8, step = 1.5, rStop = 12, offset = 0.5, maxSteps = 1600 }) {
  const lines = [];
  const sources = charges.some((c) => c.q > 0) ? charges.filter((c) => c.q > 0) : charges.filter((c) => c.q < 0);
  const dir = sources[0].q > 0 ? 1 : -1;
  for (const src of sources) {
    const n = Math.round(perUnit * Math.abs(src.q));
    for (let i = 0; i < n; i++) {
      const a = ((i + offset) * 2 * Math.PI) / n + (src.rot ?? 0);
      let x = src.x + (rStop + 1) * Math.cos(a);
      let y = src.y + (rStop + 1) * Math.sin(a);
      const pts = [[x, y]];
      for (let k = 0; k < maxSteps; k++) {
        const k1 = unitField(charges, x, y, dir);
        const k2 = unitField(charges, x + (step / 2) * k1[0], y + (step / 2) * k1[1], dir);
        const k3 = unitField(charges, x + (step / 2) * k2[0], y + (step / 2) * k2[1], dir);
        const k4 = unitField(charges, x + step * k3[0], y + step * k3[1], dir);
        x += (step / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
        y += (step / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
        pts.push([x, y]);
        const sink = charges.find((c) => c !== src && Math.sign(c.q) !== Math.sign(src.q) && Math.hypot(x - c.x, y - c.y) < rStop);
        if (sink) break;
        if (x < -20 || y < -20 || x > w + 20 || y > h + 20) break;
      }
      lines.push(dir > 0 ? pts : pts.reverse());
    }
  }
  return lines;
}
function linePath(pts) {
  return 'M' + pts.filter((_, i) => i % 4 === 0 || i === pts.length - 1).map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L');
}
/** Draws traced lines with one arrowhead each (checked against the field). */
function drawLines(charges, lines, { w, h, at = 0.45, name }) {
  let s = '';
  let checked = 0;
  for (const pts of lines) {
    s += S.path(linePath(pts), { c: MUT, w: 1.2 });
    // arrow at a visible point
    let idx = Math.floor(pts.length * at);
    const inView = (p) => p[0] > 8 && p[1] > 8 && p[0] < w - 8 && p[1] < h - 8;
    while (idx < pts.length - 2 && !inView(pts[idx])) idx++;
    if (idx >= pts.length - 2 || !inView(pts[idx])) continue;
    const [x1, y1] = pts[idx];
    const [x2, y2] = pts[idx + 2];
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const [ex, ey] = field(charges, x1, y1);
    const dot = Math.cos(ang) * ex + Math.sin(ang) * ey;
    if (dot <= 0) check(false, `${name}: arrow against the field at ${f1(x1)},${f1(y1)}`);
    checked++;
    s += S.head(x2, y2, ang, { size: 7, c: ACC });
  }
  check(checked > 0, `${name}: ${checked} field-line arrows point along E`);
  return s;
}

function fieldLines(charges, { w, h, label, perUnit, labels = [], extra = '' }) {
  const lines = trace(charges, { w, h, perUnit });
  const body = `<g>${drawLines(charges, lines, { w, h, name: label.slice(0, 40) })}</g>${charges.map((c, i) => charge(c.x, c.y, c.q, { label: labels[i] })).join('')}${extra}`;
  return svgDoc(w, h, label, body);
}

export const LINES_POS = fieldLines([{ x: 120, y: 120, q: 1 }], { w: 240, h: 240, perUnit: 12, label: 'Field lines of an isolated positive charge: straight radial lines pointing outwards, closer together near the charge', labels: ['+q'] });
export const LINES_NEG = fieldLines([{ x: 120, y: 120, q: -1 }], { w: 240, h: 240, perUnit: 12, label: 'Field lines of an isolated negative charge: straight radial lines pointing inwards towards the charge', labels: ['−q'] });
export const LINES_DIPOLE = fieldLines(
  [
    { x: 130, y: 130, q: 1 },
    { x: 230, y: 130, q: -1 },
  ],
  { w: 360, h: 260, perUnit: 14, label: 'Field lines of an electric dipole: lines leave the positive charge, curve round and end on the negative charge; between the charges the field points from + to −', labels: ['+q', '−q'] },
);
// Checks specific to the dipole: at the midpoint the field points from + to − (to the right); on the perpendicular bisector far out it points left (opposite p).
{
  const ch = [
    { x: 130, y: 130, q: 1 },
    { x: 230, y: 130, q: -1 },
  ];
  const [mx] = field(ch, 180, 130);
  check(mx > 0, 'dipole: field at the midpoint points from + to −');
  // here +q is on the left, so p (from −q to +q) points to the left (−x)
  const [bx, by] = field(ch, 180, 20);
  check(bx > 0 && Math.abs(by) < 1e-9, 'dipole: field on the equatorial line is antiparallel to p');
  const [ax] = field(ch, 330, 130);
  check(ax < 0, 'dipole: field on the axis beyond −q is along p');
}
export const LINES_LIKE = fieldLines(
  [
    { x: 130, y: 130, q: 1 },
    { x: 230, y: 130, q: 1 },
  ],
  { w: 360, h: 260, perUnit: 12, label: 'Field lines of two equal positive charges: lines from each charge bend away from the other; midway between them is a neutral point where no line passes', labels: ['+q', '+q'], extra: S.circle(180, 130, 3, { c: ACC, fill: ACC }) + S.text(180, 150, 'N (E = 0)', { a: 'middle', size: 10 }) },
);
{
  const [nx, ny] = field([{ x: 130, y: 130, q: 1 }, { x: 230, y: 130, q: 1 }], 180, 130);
  check(Math.hypot(nx, ny) < 1e-12, 'two like charges: field is zero at the midpoint (neutral point)');
}

// ---------------------------------------------------------------- Coulomb force directions
export const FORCES = (() => {
  const w = 360;
  const h = 170;
  let s = '';
  s += S.text(10, 20, 'Like charges repel', { w: 'bold' });
  s += charge(110, 55, 1, { label: 'q₁' }) + charge(250, 55, 1, { label: 'q₂' });
  s += S.arrow(97, 55, 50, 55, { c: ACC, w: 2 }) + S.arrow(263, 55, 310, 55, { c: ACC, w: 2 });
  s += S.text(55, 47, 'F on q₁', { size: 11 }) + S.text(285, 47, 'F on q₂', { size: 11 });
  s += S.text(10, 110, 'Unlike charges attract', { w: 'bold' });
  s += charge(110, 145, 1, { label: 'q₁', ly: -16 }) + charge(250, 145, -1, { label: 'q₂', ly: -16 });
  s += S.arrow(123, 145, 170, 145, { c: ACC, w: 2 }) + S.arrow(237, 145, 190, 145, { c: ACC, w: 2 });
  s += S.text(128, 168, 'F on q₁', { size: 10 }) + S.text(232, 168, 'F on q₂', { a: 'end', size: 10 });
  s += S.text(180, 50, 'r', { a: 'middle', it: true }) + S.line(125, 55, 235, 55, { c: MUT, w: 1, dash: '3 3' });
  return svgDoc(w, h, 'Coulomb forces: two like charges push each other apart along the line joining them; two unlike charges pull each other together; the forces on the two charges are equal and opposite', s);
})();

// ---------------------------------------------------------------- superposition (worked example numbers)
/** q0 = +1 μC at O; q1 = +4 μC 0.30 m above O; q2 = −3 μC 0.30 m to the right of O. */
export const SUPER_DATA = (() => {
  const k = 9e9;
  const F1 = (k * 4e-6 * 1e-6) / 0.3 ** 2; // repulsion, pushes q0 downwards
  const F2 = (k * 3e-6 * 1e-6) / 0.3 ** 2; // attraction, pulls q0 to the right
  const F = Math.hypot(F1, F2);
  const angle = (Math.atan2(F1, F2) * 180) / Math.PI; // below +x
  return { F1, F2, F, angle };
})();
export const SUPER = (() => {
  const { F1, F2 } = SUPER_DATA;
  const w = 340;
  const h = 260;
  const O = [110, 110];
  const sc = 300; // px per newton
  let s = '';
  s += S.line(O[0], O[1], O[0], 20, { c: MUT, w: 1, dash: '3 3' }) + S.line(O[0], O[1], 250, O[1], { c: MUT, w: 1, dash: '3 3' });
  s += S.text(O[0] - 8, 68, '0.30 m', { a: 'end', size: 10 }) + S.text(180, O[1] - 8, '0.30 m', { a: 'middle', size: 10 });
  s += charge(O[0], 20, 1, { label: 'q₁ = +4 μC', lx: 52, ly: 4 });
  s += charge(250, O[1], -1, { label: 'q₂ = −3 μC', ly: -16 });
  s += charge(O[0], O[1], 1, { label: 'q₀ = +1 μC', lx: -48, ly: 4 });
  const p1 = [O[0], O[1] + F1 * sc];
  const p2 = [O[0] + F2 * sc, O[1]];
  const pr = [O[0] + F2 * sc, O[1] + F1 * sc];
  s += S.line(p1[0], p1[1], pr[0], pr[1], { c: MUT, w: 1, dash: '4 3' }) + S.line(p2[0], p2[1], pr[0], pr[1], { c: MUT, w: 1, dash: '4 3' });
  s += S.arrow(O[0], O[1] + 12, p1[0], p1[1], { c: POS, w: 2 }) + S.text(p1[0] - 6, p1[1] - 4, 'F₁ = 0.40 N', { a: 'end', size: 11 });
  s += S.arrow(O[0] + 12, O[1], p2[0], p2[1], { c: NEG, w: 2 }) + S.text(p2[0] - 4, p2[1] + 16, 'F₂ = 0.30 N', { a: 'end', size: 11 });
  s += S.arrow(O[0] + 7, O[1] + 9, pr[0], pr[1], { c: ACC, w: 2.5 }) + S.text(pr[0] + 6, pr[1] + 4, 'F = 0.50 N', { size: 11, w: 'bold' });
  // geometry self-check: resultant arrow direction matches the computed angle
  const ang = (Math.atan2(pr[1] - O[1], pr[0] - O[0]) * 180) / Math.PI;
  check(Math.abs(ang - SUPER_DATA.angle) < 0.01, `superposition: resultant drawn at ${ang.toFixed(1)}° below +x (computed ${SUPER_DATA.angle.toFixed(1)}°)`);
  return svgDoc(w, h, 'Superposition: charge q0 at the corner feels a downward repulsion of 0.40 newton from q1 above it and a rightward attraction of 0.30 newton towards q2; the resultant is 0.50 newton at about 53 degrees below the line to q2', s);
})();

// ---------------------------------------------------------------- dipole geometry (axial and equatorial points)
export const DIPOLE_GEOM = (() => {
  const w = 380;
  const h = 250;
  const A = [90, 170];
  const B = [170, 170];
  const Oc = [130, 170];
  const P = [320, 170];
  const Q = [130, 55];
  let s = '';
  s += S.line(30, 170, 365, 170, { c: MUT, w: 1, dash: '4 3' }) + S.line(130, 230, 130, 20, { c: MUT, w: 1, dash: '4 3' });
  s += charge(A[0], A[1], -1, { label: '−q (A)', ly: 26 }) + charge(B[0], B[1], 1, { label: '+q (B)', ly: 26 });
  s += S.arrow(100, 200, 160, 200, { c: ACC, w: 2 }) + S.text(130, 215, 'p', { a: 'middle', w: 'bold', it: true });
  s += S.text(110, 160, '2a', { a: 'middle', size: 10 });
  // axial point P: E from +q (away, to the right, longer) and from −q (towards, to the left, shorter)
  s += S.circle(P[0], P[1], 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(P[0], P[1] + 20, 'P (axis)', { a: 'middle', size: 11 });
  s += S.arrow(P[0], P[1] - 8, P[0] + 46, P[1] - 8, { c: POS, w: 2 }) + S.text(P[0] + 30, P[1] - 14, 'E₊', { size: 11 });
  s += S.arrow(P[0], P[1] + 6, P[0] - 30, P[1] + 6, { c: NEG, w: 2 }) + S.text(P[0] - 40, P[1] + 22, 'E₋', { size: 11 });
  s += S.text(225, 160, 'r', { a: 'middle', it: true });
  // equatorial point Q: E+ points away from B, E− points towards A; resultant parallel to −p
  const away = [Q[0] - B[0], Q[1] - B[1]];
  const towards = [A[0] - Q[0], A[1] - Q[1]];
  const L = 55;
  const n1 = Math.hypot(...away);
  const n2 = Math.hypot(...towards);
  const e1 = [Q[0] + (L * away[0]) / n1, Q[1] + (L * away[1]) / n1];
  const e2 = [Q[0] + (L * towards[0]) / n2, Q[1] + (L * towards[1]) / n2];
  const res = [Q[0] + (e1[0] - Q[0]) + (e2[0] - Q[0]), Q[1] + (e1[1] - Q[1]) + (e2[1] - Q[1])];
  check(Math.abs(res[1] - Q[1]) < 1e-9 && res[0] < Q[0], 'dipole geometry: resultant at the equatorial point is antiparallel to p');
  s += S.line(A[0], A[1], Q[0], Q[1], { c: MUT, w: 1 }) + S.line(B[0], B[1], Q[0], Q[1], { c: MUT, w: 1 });
  s += S.circle(Q[0], Q[1], 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(Q[0] + 8, Q[1] - 8, 'Q (equatorial)', { size: 11 });
  s += S.arrow(Q[0], Q[1], e1[0], e1[1], { c: POS, w: 2 }) + S.text(e1[0] - 6, e1[1] - 4, 'E₊', { a: 'end', size: 11 });
  s += S.arrow(Q[0], Q[1], e2[0], e2[1], { c: NEG, w: 2 }) + S.text(e2[0] - 6, e2[1] + 12, 'E₋', { a: 'end', size: 11 });
  s += S.arrow(Q[0], Q[1], res[0], res[1], { c: ACC, w: 2.5 }) + S.text(res[0] - 4, res[1] - 6, 'E', { a: 'end', size: 12, w: 'bold' });
  return svgDoc(w, h, 'Electric dipole of charges minus q at A and plus q at B, separation 2a, dipole moment p from minus to plus. At P on the axis the field of plus q is stronger, so the net field is along p. At Q on the equatorial line the two fields add to a resultant antiparallel to p', s);
})();

// ---------------------------------------------------------------- torque on a dipole in a uniform field
export const TORQUE = (() => {
  const w = 360;
  const h = 220;
  let s = '';
  for (let y = 30; y <= 190; y += 40) s += S.arrow(15, y, 345, y, { c: MUT, w: 1, size: 6 });
  s += S.text(340, 20, 'E', { a: 'end', w: 'bold', it: true });
  const C = [180, 110];
  const th = (35 * Math.PI) / 180;
  const a = 60;
  const plus = [C[0] + a * Math.cos(th), C[1] - a * Math.sin(th)];
  const minus = [C[0] - a * Math.cos(th), C[1] + a * Math.sin(th)];
  s += S.line(minus[0], minus[1], plus[0], plus[1], { c: 'currentColor', w: 2 });
  s += charge(plus[0], plus[1], 1) + charge(minus[0], minus[1], -1);
  s += S.arrow(plus[0] + 12, plus[1], plus[0] + 70, plus[1], { c: POS, w: 2.5 }) + S.text(plus[0] + 40, plus[1] - 8, '+qE', { size: 11 });
  s += S.arrow(minus[0] - 12, minus[1], minus[0] - 70, minus[1], { c: NEG, w: 2.5 }) + S.text(minus[0] - 40, minus[1] + 18, '−qE', { a: 'middle', size: 11 });
  s += S.line(C[0], C[1], C[0] + 90, C[1], { c: MUT, w: 1, dash: '3 3' });
  s += S.path(`M${f1(C[0] + 32)} ${f1(C[1])} A32 32 0 0 0 ${f1(C[0] + 32 * Math.cos(th))} ${f1(C[1] - 32 * Math.sin(th))}`, { c: ACC, w: 1.2 });
  s += S.text(C[0] + 40, C[1] - 8, 'θ', { size: 12, it: true });
  // torque turns p towards E (clockwise on screen here)
  s += S.path(`M${f1(C[0] - 20)} ${f1(C[1] - 30)} A36 36 0 0 1 ${f1(C[0] + 22)} ${f1(C[1] - 28)}`, { c: ACC, w: 1.5 });
  s += S.head(C[0] + 22, C[1] - 28, 0.55, { c: ACC });
  s += S.text(C[0] - 30, C[1] - 52, 'τ turns p towards E', { a: 'middle', size: 11 });
  s += S.arrow(C[0] - 0.55 * a * Math.cos(th), C[1] + 0.55 * a * Math.sin(th) + 22, C[0] + 0.55 * a * Math.cos(th), C[1] - 0.55 * a * Math.sin(th) + 22, { c: ACC, w: 2 }) + S.text(C[0] + 40, C[1] + 22, 'p', { it: true, w: 'bold' });
  // check: torque on +q about C (r × F) has the clockwise sense on screen (positive z in screen coordinates means clockwise)
  const rx = plus[0] - C[0];
  const ry = plus[1] - C[1];
  const tz = rx * 0 - ry * 1; // F = (+1, 0) on +q; z = rx*Fy - ry*Fx
  check(tz > 0, 'torque diagram: the force on +q turns the dipole clockwise on screen, towards E');
  return svgDoc(w, h, 'Dipole at angle theta to a uniform field: the force plus q E on the positive charge and minus q E on the negative charge are equal and opposite, so the net force is zero, but they form a couple whose torque p E sine theta turns the dipole to line up with the field', s);
})();

// ---------------------------------------------------------------- flux through a plane area
export const FLUX = (() => {
  const w = 340;
  const h = 210;
  let s = '';
  for (let y = 40; y <= 180; y += 28) s += S.arrow(15, y, 320, y, { c: MUT, w: 1, size: 6 });
  s += S.text(318, 28, 'E', { a: 'end', w: 'bold', it: true });
  // tilted plate seen edge-on, normal at angle θ to E
  const C = [170, 110];
  const th = (40 * Math.PI) / 180;
  const half = 70;
  const ux = Math.sin(th);
  const uy = Math.cos(th);
  s += S.line(C[0] - half * ux, C[1] - half * uy, C[0] + half * ux, C[1] + half * uy, { c: ACC, w: 5 });
  const nx = Math.cos(th);
  const ny = -Math.sin(th);
  s += S.arrow(C[0], C[1], C[0] + 75 * nx, C[1] + 75 * ny, { c: ACC, w: 2 }) + S.text(C[0] + 80 * nx, C[1] + 80 * ny - 4, 'ΔS', { size: 12, w: 'bold' });
  s += S.path(`M${f1(C[0] + 34)} ${f1(C[1])} A34 34 0 0 0 ${f1(C[0] + 34 * nx)} ${f1(C[1] + 34 * ny)}`, { c: 'currentColor', w: 1.2 });
  s += S.text(C[0] + 42, C[1] - 6, 'θ', { it: true });
  check(Math.abs(nx * ux + ny * uy) < 1e-12, 'flux diagram: area vector is normal to the plate');
  return svgDoc(w, h, 'Flux through a flat area in a uniform field: the area vector Delta S is normal to the plate and makes angle theta with E, so the flux is E Delta S cos theta', s);
})();

// ---------------------------------------------------------------- Gauss's law: closed surface
export const GAUSS = (() => {
  const w = 340;
  const h = 210;
  let s = '';
  s += S.path('M70 105 C70 40 160 25 220 45 C290 65 300 140 250 170 C200 200 90 185 70 105 Z', { c: ACC, w: 2, fill: FILL, fop: 0.5, dash: '6 4' });
  s += charge(140, 90, 1, { label: 'q₁' }) + charge(220, 130, -1, { label: 'q₂' }) + charge(310, 40, 1, { label: 'q₃ (outside)', lx: -10, ly: 26 });
  s += S.text(110, 160, 'closed surface S', { size: 11 });
  return svgDoc(w, h, 'A closed surface encloses charges q1 and q2 while q3 lies outside; the total flux through the surface is (q1 plus q2) divided by epsilon nought, and q3 contributes no net flux although it changes the field on the surface', s);
})();

// ---------------------------------------------------------------- Gaussian surfaces for the three applications
export const GAUSS_APPS = (() => {
  const w = 420;
  const h = 210;
  let s = '';
  // wire with cylinder
  s += S.text(65, 18, 'Long wire', { a: 'middle', w: 'bold', size: 11 });
  s += S.line(65, 30, 65, 190, { c: POS, w: 3 });
  s += S.ellipse(65, 70, 35, 9, { c: ACC, w: 1.5 }) + S.ellipse(65, 160, 35, 9, { c: ACC, dash: '4 3' });
  s += S.line(30, 70, 30, 160, { c: ACC }) + S.line(100, 70, 100, 160, { c: ACC });
  s += S.arrow(100, 115, 128, 115, { c: 'currentColor', w: 1.5, size: 6 }) + S.arrow(30, 115, 6, 115, { c: 'currentColor', w: 1.5, size: 6 });
  s += S.text(65, 205, 'radius r, length l', { a: 'middle', size: 10 });
  // sheet with pillbox
  s += S.text(210, 18, 'Plane sheet', { a: 'middle', w: 'bold', size: 11 });
  s += S.path('M185 40 L235 25 L235 175 L185 190 Z', { c: POS, w: 1.5, fill: POS, fop: 0.15 });
  s += S.rect(170, 92, 80, 26, { c: ACC, sw: 1.5, dash: '4 3' });
  s += S.arrow(250, 105, 280, 105, { c: 'currentColor', w: 1.5, size: 6 }) + S.arrow(170, 105, 142, 105, { c: 'currentColor', w: 1.5, size: 6 });
  s += S.text(210, 205, 'flux only through the end faces', { a: 'middle', size: 10 });
  // shell with two spheres
  s += S.text(350, 18, 'Thin shell', { a: 'middle', w: 'bold', size: 11 });
  s += S.circle(350, 110, 40, { c: POS, sw: 3 });
  s += S.circle(350, 110, 62, { c: ACC, dash: '4 3' }) + S.circle(350, 110, 22, { c: NEG, dash: '3 3' });
  s += S.text(350, 114, 'q_in = 0', { a: 'middle', size: 10 });
  s += S.text(350, 190, 'r > R: E = kq/r²', { a: 'middle', size: 10 });
  s += S.text(350, 204, 'r < R: E = 0', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'Gaussian surfaces: a coaxial cylinder round a long charged wire with flux only through its curved side; a pillbox through a plane sheet with flux only through its two flat ends; concentric spheres outside and inside a charged thin shell', s);
})();

// ---------------------------------------------------------------- continuous distribution
export const CONTINUOUS = (() => {
  const w = 340;
  const h = 190;
  let s = '';
  s += S.path('M30 150 C90 120 150 135 210 110 C250 95 280 100 310 80', { c: POS, w: 4 });
  s += S.rect(146, 123, 16, 12, { c: ACC, sw: 1.5, fill: ACC, fop: 0.3 });
  s += S.text(154, 152, 'dq = λ dl', { a: 'middle', size: 11 });
  const P = [205, 62];
  s += S.circle(P[0], P[1], 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(P[0] + 8, P[1] + 4, 'P', { w: 'bold' });
  s += S.line(154, 128, P[0], P[1], { c: MUT, w: 1, dash: '4 3' }) + S.text(170, 95, 'r', { it: true });
  const dx = P[0] - 154;
  const dy = P[1] - 128;
  const n = Math.hypot(dx, dy);
  s += S.arrow(P[0], P[1], P[0] + (40 * dx) / n, P[1] + (40 * dy) / n, { c: ACC, w: 2 }) + S.text(P[0] + (40 * dx) / n + 8, P[1] + (40 * dy) / n + 8, 'dE', { size: 11 });
  return svgDoc(w, h, 'A continuous line of charge split into small pieces dq equal to lambda dl; each piece gives a small field dE at P along the line from the piece to P, and the total field is the vector sum (integral) of all the dE', s);
})();

export const ALL = { LINES_POS, LINES_NEG, LINES_DIPOLE, LINES_LIKE, FORCES, SUPER, DIPOLE_GEOM, TORQUE, FLUX, GAUSS, GAUSS_APPS, CONTINUOUS };
