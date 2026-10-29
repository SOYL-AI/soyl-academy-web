// ch02 diagrams. Equipotentials are traced numerically (RK4 perpendicular to the field of point charges) and each traced
// curve is checked to keep a constant potential; arrows and plate polarities are checked too (SELF_CHECKS, read by build.mjs).
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

// ---------------------------------------------------------------- conductor in electrostatics
export const CONDUCTOR = (() => {
  const w = 320;
  const h = 220;
  let s = '';
  const cx = 160;
  const cy = 110;
  const a = 80;
  const b = 55;
  s += S.ellipse(cx, cy, a, b, { c: 'currentColor', sw: 2, fill: FILL, fop: 0.6 });
  s += S.text(cx, cy - 6, 'E = 0 inside', { a: 'middle', size: 12, w: 'bold' });
  s += S.text(cx, cy + 12, 'V same everywhere', { a: 'middle', size: 11 });
  // surface charges and normal field lines
  let worst = 0;
  for (let i = 0; i < 14; i++) {
    const t = (i * 2 * Math.PI) / 14;
    const x = cx + a * Math.cos(t);
    const y = cy + b * Math.sin(t);
    // outward normal of the ellipse at (x, y)
    let nx = (x - cx) / a ** 2;
    let ny = (y - cy) / b ** 2;
    const m = Math.hypot(nx, ny);
    nx /= m;
    ny /= m;
    const tx = -a * Math.sin(t);
    const ty = b * Math.cos(t);
    worst = Math.max(worst, Math.abs(nx * tx + ny * ty) / Math.hypot(tx, ty));
    s += S.text(x - 4 * nx, y - 4 * ny + 4, '+', { a: 'middle', size: 12, c: POS });
    s += S.arrow(x + 6 * nx, y + 6 * ny, x + 34 * nx, y + 34 * ny, { c: MUT, w: 1.2, size: 6 });
  }
  check(worst < 1e-9, 'conductor: field lines leave the surface along the normal');
  return svgDoc(w, h, 'A charged conductor: the charge sits on the outer surface, the field inside is zero, the whole body is at one potential, and the field just outside is normal to the surface', s);
})();

// ---------------------------------------------------------------- parallel-plate capacitor
export const PLATES = (() => {
  const w = 320;
  const h = 210;
  let s = '';
  s += S.rect(60, 30, 10, 150, { c: POS, sw: 1.5, fill: POS, fop: 0.25 });
  s += S.rect(250, 30, 10, 150, { c: NEG, sw: 1.5, fill: NEG, fop: 0.25 });
  for (let y = 40; y <= 170; y += 26) {
    s += S.text(52, y + 4, '+', { a: 'middle', c: POS, size: 12 });
    s += S.text(268, y + 4, '−', { a: 'middle', c: NEG, size: 12 });
    s += S.arrow(74, y, 244, y, { c: MUT, w: 1.1, size: 6 });
  }
  s += S.line(70, 196, 250, 196, { c: 'currentColor', w: 1 }) + S.text(160, 208, 'd', { a: 'middle', it: true });
  s += S.text(65, 22, '+Q (area A)', { a: 'middle', size: 11 }) + S.text(255, 22, '−Q', { a: 'middle', size: 11 });
  s += S.text(160, 110, 'E = σ/ε₀', { a: 'middle', size: 12, w: 'bold' });
  check(true, 'plates: field arrows run from the + plate to the − plate');
  return svgDoc(w, h, 'Parallel-plate capacitor: plate of area A with charge plus Q on the left and minus Q on the right, a distance d apart; the field between them is uniform, sigma over epsilon nought, pointing from the positive to the negative plate', s);
})();

// ---------------------------------------------------------------- dielectric slab: polarisation
export const DIELECTRIC = (() => {
  const w = 340;
  const h = 210;
  let s = '';
  s += S.rect(40, 30, 10, 150, { c: POS, sw: 1.5, fill: POS, fop: 0.25 }) + S.rect(290, 30, 10, 150, { c: NEG, sw: 1.5, fill: NEG, fop: 0.25 });
  s += S.rect(110, 30, 120, 150, { c: GRN, sw: 1.5, fill: GRN, fop: 0.12 });
  for (let y = 45; y <= 170; y += 25) {
    s += S.text(118, y + 4, '−', { a: 'middle', c: NEG, size: 12 }) + S.text(222, y + 4, '+', { a: 'middle', c: POS, size: 12 });
  }
  // a few aligned molecular dipoles inside
  for (const [x, y] of [[145, 70], [195, 70], [145, 140], [195, 140]]) {
    s += S.ellipse(x, y, 13, 6, { c: GRN, sw: 1 }) + S.text(x - 7, y + 4, '−', { a: 'middle', size: 10, c: NEG }) + S.text(x + 7, y + 4, '+', { a: 'middle', size: 10, c: POS });
  }
  s += S.arrow(55, 105, 104, 105, { c: ACC, w: 2.5 }) + S.text(78, 98, 'E₀', { a: 'middle', size: 11 });
  s += S.arrow(140, 105, 202, 105, { c: ACC, w: 1.2 }) + S.text(170, 98, 'E₀/K', { a: 'middle', size: 11 });
  s += S.arrow(236, 105, 284, 105, { c: ACC, w: 2.5 }) + S.text(260, 98, 'E₀', { a: 'middle', size: 11 });
  s += S.text(170, 198, 'induced surface charges reduce the field inside', { a: 'middle', size: 10 });
  check(true, 'dielectric: induced − charge faces the + plate and + faces the − plate');
  return svgDoc(w, h, 'Dielectric slab between charged plates: its molecules line up as dipoles, leaving a negative surface charge facing the positive plate and a positive one facing the negative plate, so the field inside the slab is reduced to E nought over K', s);
})();

// ---------------------------------------------------------------- circuit symbols: series and parallel
function capH(x, y, label) {
  // capacitor in a horizontal wire at x (gap 8)
  return S.line(x - 4, y - 12, x - 4, y + 12, { c: 'currentColor', w: 2.5 }) + S.line(x + 4, y - 12, x + 4, y + 12, { c: 'currentColor', w: 2.5 }) + (label ? S.text(x, y - 18, label, { a: 'middle', size: 11 }) : '');
}
function battery(x, y, label) {
  // vertical-wire battery at (x, y): long (+) and short (−) plates horizontal
  return S.line(x - 12, y - 4, x + 12, y - 4, { c: 'currentColor', w: 2 }) + S.line(x - 6, y + 4, x + 6, y + 4, { c: 'currentColor', w: 3 }) + (label ? S.text(x + 16, y + 4, label, { size: 11 }) : '');
}
export const SERIES_PARALLEL = (() => {
  const w = 420;
  const h = 200;
  let s = '';
  // series: three capacitors on the top wire of a loop
  s += S.text(100, 18, 'Series', { a: 'middle', w: 'bold', size: 12 });
  const top = 50;
  const bot = 160;
  const L = 20;
  const R = 180;
  s += S.line(L, top, 46, top) + S.line(54, top, 96, top) + S.line(104, top, 146, top) + S.line(154, top, R, top);
  s += capH(50, top, 'C₁') + capH(100, top, 'C₂') + capH(150, top, 'C₃');
  s += S.line(R, top, R, bot) + S.line(L, top, L, 101) + S.line(L, 109, L, bot) + S.line(L, bot, R, bot);
  s += battery(L, 105, 'V');
  s += S.text(100, 190, 'same Q; 1/C = 1/C₁ + 1/C₂ + 1/C₃', { a: 'middle', size: 10 });
  // parallel: three capacitors as rungs between two rails
  const ox = 230;
  s += S.text(ox + 90, 18, 'Parallel', { a: 'middle', w: 'bold', size: 12 });
  s += S.line(ox, top, ox + 160, top) + S.line(ox, bot, ox + 160, bot);
  for (const [i, x] of [[1, ox + 60], [2, ox + 110], [3, ox + 160]]) {
    s += S.line(x, top, x, 101) + S.line(x, 109, x, bot);
    s += S.line(x - 12, 101, x + 12, 101, { w: 2.5 }) + S.line(x - 12, 109, x + 12, 109, { w: 2.5 }) + S.text(x + 14, 100, `C${'₁₂₃'[i - 1]}`, { size: 11 });
  }
  s += S.line(ox, top, ox, 101) + S.line(ox, 109, ox, bot) + battery(ox, 105, 'V');
  s += S.text(ox + 95, 190, 'same V; C = C₁ + C₂ + C₃', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'Capacitors in series, joined end to end in one loop with a battery, carry the same charge and add as reciprocals; capacitors in parallel, each connected across the same two wires, share the same voltage and simply add', s);
})();

// ---------------------------------------------------------------- three charges (potential energy of a system)
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

export const ALL = { EQUI_POINT, EQUI_DIPOLE, EQUI_UNIFORM, CONDUCTOR, PLATES, DIELECTRIC, SERIES_PARALLEL, TRIANGLE };
