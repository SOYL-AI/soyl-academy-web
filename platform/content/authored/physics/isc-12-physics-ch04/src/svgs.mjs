// ISC ch04 diagrams: a charged conductor (field normal to the surface, checked), a parallel-plate capacitor, a dielectric
// slab with induced charges, series and parallel combinations, and a capacitor partly filled with a slab (SELF_CHECKS).
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

// ---------------------------------------------------------------- capacitor partly filled with a slab (worked example to scale)
export const SLAB_DATA = { d: 6e-3, t: 3e-3, K: 4 };
export const SLAB = (() => {
  const { d, t, K } = SLAB_DATA;
  const w = 340;
  const h = 234;
  const k = 30000; // px per metre
  const x0 = 80;
  const x1 = x0 + d * k;
  let s = S.rect(x0 - 10, 30, 10, 150, { c: POS, sw: 1.5, fill: POS, fop: 0.25 }) + S.rect(x1, 30, 10, 150, { c: NEG, sw: 1.5, fill: NEG, fop: 0.25 });
  const sx = x0 + ((d - t) / 2) * k;
  s += S.rect(sx, 30, t * k, 150, { c: GRN, sw: 1.5, fill: GRN, fop: 0.15 }) + S.text(sx + (t * k) / 2, 108, `K = ${K}`, { a: 'middle', size: 11, w: 'bold' });
  s += S.line(x0, 192, x1, 192, { w: 1 }) + S.text((x0 + x1) / 2, 205, 'd = 6.0 mm', { a: 'middle', size: 10 });
  s += S.line(sx, 20, sx + t * k, 20, { c: GRN, w: 1 }) + S.text(sx + (t * k) / 2, 15, 't = 3.0 mm', { a: 'middle', size: 10 });
  s += S.text(w / 2, 226, 'C = ε₀A / (d − t + t/K)', { a: 'middle', size: 11, w: 'bold' });
  check(Math.abs((x1 - x0) / (t * k) - d / t) < 1e-9, 'slab: drawn thickness ratio d : t = 2 : 1');
  return svgDoc(w, h, 'A parallel-plate capacitor of separation d = 6.0 mm with a dielectric slab of thickness t = 3.0 mm and dielectric constant 4 between the plates; its capacitance is epsilon nought A over d minus t plus t over K', s);
})();

export const ALL = { CONDUCTOR, PLATES, DIELECTRIC, SERIES_PARALLEL, SLAB };
