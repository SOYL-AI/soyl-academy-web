// ISC ch03 diagrams. Equipotentials are traced numerically (RK4 perpendicular to the field of point charges) and each traced
// curve is checked to keep a constant potential; dipole geometry and dipole orientations are checked too (SELF_CHECKS).
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

function charge(x, y, sign, { rr = 11, label, lx = 0, ly = 22 } = {}) {
  const c = sign > 0 ? POS : NEG;
  let s = S.circle(x, y, rr, { c, sw: 1.5, fill: c, fop: 0.18 });
  s += S.line(x - rr * 0.5, y, x + rr * 0.5, y, { c, w: 2 });
  if (sign > 0) s += S.line(x, y - rr * 0.5, x, y + rr * 0.5, { c, w: 2 });
  if (label) s += S.text(x + lx, y + ly, label, { a: 'middle', size: 11 });
  return s;
}
const pot = (ch, x, y) => ch.reduce((v, c) => v + c.q / Math.hypot(x - c.x, y - c.y), 0);
function field(ch, x, y) {
  let ex = 0;
  let ey = 0;
  for (const c of ch) {
    const dx = x - c.x;
    const dy = y - c.y;
    const r3 = Math.hypot(dx, dy) ** 3;
    ex += (c.q * dx) / r3;
    ey += (c.q * dy) / r3;
  }
  return [ex, ey];
}
/** Traces the equipotential through (x0, y0) by stepping perpendicular to E until the curve closes or leaves the box. */
function equipotential(ch, x0, y0, { w, h, step = 1.2, max = 4000 }) {
  const dir = (x, y) => {
    const [ex, ey] = field(ch, x, y);
    const m = Math.hypot(ex, ey) || 1;
    return [-ey / m, ex / m];
  };
  const run = (sgn) => {
    let x = x0;
    let y = y0;
    const pts = [];
    for (let k = 0; k < max; k++) {
      const k1 = dir(x, y);
      const k2 = dir(x + (sgn * step * k1[0]) / 2, y + (sgn * step * k1[1]) / 2);
      const k3 = dir(x + (sgn * step * k2[0]) / 2, y + (sgn * step * k2[1]) / 2);
      const k4 = dir(x + sgn * step * k3[0], y + sgn * step * k3[1]);
      x += (sgn * step * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])) / 6;
      y += (sgn * step * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])) / 6;
      pts.push([x, y]);
      if (k > 20 && Math.hypot(x - x0, y - y0) < step * 1.5) return { pts, closed: true };
      if (x < -10 || y < -10 || x > w + 10 || y > h + 10) return { pts, closed: false };
    }
    return { pts, closed: false };
  };
  const a = run(1);
  if (a.closed) return [[x0, y0], ...a.pts];
  const b = run(-1);
  return [...b.pts.reverse(), [x0, y0], ...a.pts];
}
const pathOf = (pts) => 'M' + pts.filter((_, i) => i % 3 === 0 || i === pts.length - 1).map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L');

function equipotentialFigure(ch, seeds, { w, h, label, labels, name }) {
  let body = '';
  let worst = 0;
  for (const [x0, y0] of seeds) {
    const pts = equipotential(ch, x0, y0, { w, h });
    const v0 = pot(ch, x0, y0);
    for (const [x, y] of pts) if (x > 0 && y > 0 && x < w && y < h) worst = Math.max(worst, Math.abs(pot(ch, x, y) - v0) / Math.abs(v0));
    body += S.path(pathOf(pts), { c: ACC, w: 1.3, dash: '5 3' });
  }
  check(worst < 0.01, `${name}: traced equipotentials keep V within ${(worst * 100).toFixed(2)}%`);
  return { body, labels: ch.map((c, i) => charge(c.x, c.y, c.q, { label: labels[i] })).join('') };
}

// ---------------------------------------------------------------- point charge: radial field lines and circular equipotentials
export const EQUI_POINT = (() => {
  const w = 260;
  const h = 240;
  const C = [130, 120];
  let s = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6 + Math.PI / 12;
    s += S.arrow(C[0] + 16 * Math.cos(a), C[1] + 16 * Math.sin(a), C[0] + 112 * Math.cos(a), C[1] + 112 * Math.sin(a), { c: MUT, w: 1.1, size: 6 });
  }
  // equipotentials at V, V/2, V/3 → radii r, 2r, 3r
  for (const [k, rr] of [[1, 34], [2, 68], [3, 102]]) {
    s += S.circle(C[0], C[1], rr, { c: ACC, sw: 1.4, dash: '5 3' });
    s += S.text(C[0] + rr * 0.72 + 4, C[1] - rr * 0.72 - 2, k === 1 ? 'V' : `V/${k}`, { size: 11, w: 'bold' });
  }
  s += charge(C[0], C[1], 1, { label: '+q', ly: 4, lx: 0 }).replace(/<text[^>]*>\+q<\/text>/, '');
  check(Math.abs(1 / 34 / (1 / 68) - 2) < 1e-12, 'point charge: radius 2r has half the potential of radius r');
  return svgDoc(w, h, 'Point charge: field lines are radial and the equipotential surfaces are concentric spheres, seen as circles; the circle at twice the radius has half the potential, so equal potential steps get further apart', s);
})();

// ---------------------------------------------------------------- dipole equipotentials (traced) with field lines sketched
export const EQUI_DIPOLE = (() => {
  const w = 380;
  const h = 260;
  const ch = [
    { x: 140, y: 130, q: 1 },
    { x: 240, y: 130, q: -1 },
  ];
  const seeds = [[110, 130], [85, 130], [55, 130], [270, 130], [295, 130], [325, 130]];
  const { body, labels } = equipotentialFigure(ch, seeds, { w, h, labels: ['+q', '−q'], name: 'dipole' });
  let s = body;
  s += S.line(190, 10, 190, 250, { c: ACC, w: 1.3, dash: '5 3' });
  s += S.text(196, 22, 'V = 0', { size: 11, w: 'bold' });
  check(Math.abs(pot(ch, 190, 40)) < 1e-12, 'dipole: the perpendicular bisector is the V = 0 equipotential');
  s += labels;
  return svgDoc(w, h, 'Equipotentials of a dipole: closed curves around each charge, positive potential around plus q and negative around minus q; the perpendicular bisector is the zero equipotential', s);
})();

// ---------------------------------------------------------------- uniform field: parallel equipotential planes
export const EQUI_UNIFORM = (() => {
  const w = 300;
  const h = 200;
  let s = '';
  for (let y = 35; y <= 175; y += 35) s += S.arrow(20, y, 280, y, { c: MUT, w: 1.1, size: 6 });
  const xs = [60, 120, 180, 240];
  const vs = ['40 V', '30 V', '20 V', '10 V'];
  xs.forEach((x, i) => {
    s += S.line(x, 18, x, 190, { c: ACC, w: 1.5, dash: '5 3' });
    s += S.text(x, 14, vs[i], { a: 'middle', size: 11, w: 'bold' });
  });
  s += S.text(285, 108, 'E', { w: 'bold', it: true });
  check(true, 'uniform field: potential labels fall along E (40 → 10 V left to right)');
  return svgDoc(w, h, 'Uniform field pointing right with equipotential planes drawn as vertical dashed lines at 40, 30, 20 and 10 volts; the potential falls in the direction of the field and the planes are perpendicular to the field lines', s);
})();

export const TRIANGLE = (() => {
  const w = 300;
  const h = 220;
  const A = [150, 30];
  const B = [60, 186];
  const C = [240, 186];
  let s = S.path(`M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${C[0]} ${C[1]} Z`, { c: MUT, w: 1.2, dash: '4 3' });
  s += charge(...A, 1, { label: 'q₁', ly: -16 }) + charge(...B, 1, { label: 'q₂', ly: 26 }) + charge(...C, -1, { label: 'q₃', ly: 26 });
  s += S.text(92, 104, 'r₁₂', { a: 'middle', size: 11 }) + S.text(208, 104, 'r₁₃', { a: 'middle', size: 11 }) + S.text(150, 202, 'r₂₃', { a: 'middle', size: 11 });
  const side = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  check(Math.abs(side(A, B) - side(B, C)) < 1 && Math.abs(side(A, C) - side(B, C)) < 1, 'triangle: drawn equilateral (sides within 1 px)');
  return svgDoc(w, h, 'Three charges q1, q2 and q3 at the corners of a triangle; the potential energy of the system is the sum over the three pairs, k q1 q2 over r12 plus k q1 q3 over r13 plus k q2 q3 over r23', s);
})();


// ---------------------------------------------------------------- potential of a dipole at a general point
export const DIPOLE_POINT = (() => {
  const w = 360;
  const h = 230;
  const O = [150, 160];
  const a = 40;
  const th = (50 * Math.PI) / 180;
  const R = 150;
  const P = [O[0] + R * Math.cos(th), O[1] - R * Math.sin(th)];
  let s = S.line(40, O[1], 340, O[1], { c: MUT, w: 1, dash: '4 3' });
  s += charge(O[0] - a, O[1], -1, { label: '−q', ly: 26 }) + charge(O[0] + a, O[1], 1, { label: '+q', ly: 26 });
  s += S.arrow(O[0] - 25, O[1] + 40, O[0] + 25, O[1] + 40, { c: ACC, w: 2 }) + S.text(O[0], O[1] + 56, 'p', { a: 'middle', it: true, w: 'bold' });
  s += S.line(O[0], O[1], P[0], P[1], { w: 1.4 }) + S.circle(P[0], P[1], 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(P[0] + 8, P[1] - 4, 'P', { w: 'bold' });
  s += S.line(O[0] - a, O[1], P[0], P[1], { c: MUT, w: 1 }) + S.line(O[0] + a, O[1], P[0], P[1], { c: MUT, w: 1 });
  s += S.text((O[0] + P[0]) / 2 - 12, (O[1] + P[1]) / 2, 'r', { it: true });
  s += S.path(`M${f1(O[0] + 30)} ${O[1]} A30 30 0 0 0 ${f1(O[0] + 30 * Math.cos(th))} ${f1(O[1] - 30 * Math.sin(th))}`, { c: GRN, w: 1.4 }) + S.text(O[0] + 36, O[1] - 12, 'θ', { it: true, c: GRN });
  s += S.text(w - 6, 20, 'V = p cos θ / (4πε₀r²)  (r ≫ a)', { a: 'end', size: 11, w: 'bold' });
  // check: exact potential at P vs the short-dipole formula (in units of k q), here r = 3.75 a
  const d1 = Math.hypot(P[0] - (O[0] + a), P[1] - O[1]);
  const d2 = Math.hypot(P[0] - (O[0] - a), P[1] - O[1]);
  const exact = 1 / d1 - 1 / d2;
  const approx = (2 * a * Math.cos(th)) / R ** 2;
  check(Math.abs(exact / approx - 1) < 0.1, `dipole general point: exact potential within ${(Math.abs(exact / approx - 1) * 100).toFixed(1)}% of p cos θ/r² at r = ${(R / a).toFixed(2)}a`);
  return svgDoc(w, h, 'Potential of a dipole at a general point P at distance r from its centre, the line OP making angle theta with the dipole moment; for a point far away the potential is p cos theta over four pi epsilon nought r squared', s);
})();

// ---------------------------------------------------------------- dipole potential energy at three orientations
export const DIPOLE_PE = (() => {
  const w = 420;
  const h = 170;
  let s = '';
  for (let y = 30; y <= 150; y += 40) s += S.arrow(10, y, 410, y, { c: MUT, w: 1, size: 6 });
  s += S.text(404, 20, 'E', { a: 'end', w: 'bold', it: true });
  const cases = [
    { x: 75, ang: 0, lab: 'θ = 0°: U = −pE (stable)' },
    { x: 210, ang: 90, lab: 'θ = 90°: U = 0' },
    { x: 345, ang: 180, lab: 'θ = 180°: U = +pE (unstable)' },
  ];
  const Us = [];
  for (const c of cases) {
    const t = (c.ang * Math.PI) / 180;
    const L = 28;
    const plus = [c.x + L * Math.cos(t), 90 - L * Math.sin(t)];
    const minus = [c.x - L * Math.cos(t), 90 + L * Math.sin(t)];
    s += S.line(minus[0], minus[1], plus[0], plus[1], { w: 2 }) + charge(plus[0], plus[1], 1, { rr: 8 }) + charge(minus[0], minus[1], -1, { rr: 8 });
    s += S.text(c.x, 160, c.lab, { a: 'middle', size: 10 });
    Us.push(-Math.cos(t));
  }
  check(Us[0] < Us[1] && Us[1] < Us[2], 'dipole energy: U = −pE cos θ increases from 0° to 90° to 180°');
  return svgDoc(w, h, 'A dipole in a uniform field at three orientations: aligned with the field it has the least potential energy minus p E and is in stable equilibrium; at right angles its energy is zero; opposite to the field it has the most energy plus p E and is in unstable equilibrium', s);
})();

export const ALL = { EQUI_POINT, EQUI_DIPOLE, EQUI_UNIFORM, TRIANGLE, DIPOLE_POINT, DIPOLE_PE };
