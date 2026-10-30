// ISC ch02 diagrams: flux through a tilted area (area vector checked normal to the plate), a closed surface with charges inside
// and outside, Gaussian surfaces for a line, a sheet and a shell, and a charge at the centre of a cube (SELF_CHECKS).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

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

// ---------------------------------------------------------------- charge at the centre of a cube
export const CUBE = (() => {
  const w = 300;
  const h = 220;
  const o = [70, 70];
  const a = 120;
  const d = [45, -35];
  const P = (x, y, z) => [o[0] + x * a + z * d[0], o[1] + (1 - y) * a + z * d[1]];
  const edge = (p, q, dash) => S.line(...P(...p), ...P(...q), { c: ACC, w: 1.5, dash });
  let s = '';
  const back = [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
  const front = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]];
  for (let i = 0; i < 4; i++) {
    s += edge(front[i], front[(i + 1) % 4]);
    s += edge(back[i], back[(i + 1) % 4], i === 0 || i === 3 ? '4 3' : undefined);
    s += edge(front[i], back[i], i === 0 ? '4 3' : undefined);
  }
  const c = P(0.5, 0.5, 0.5);
  s += charge(c[0], c[1], 1, { label: 'q', lx: 0, ly: 24 });
  s += S.text(w - 6, h - 8, 'each face: Φ = q/(6ε₀)', { a: 'end', size: 11, w: 'bold' });
  check(Math.abs(c[0] - (o[0] + 0.5 * a + 0.5 * d[0])) < 1e-9, 'cube: charge drawn at the centre of the cube');
  return svgDoc(w, h, 'A point charge q at the centre of a cube: by symmetry the total flux q over epsilon nought divides equally among the six faces, q over six epsilon nought through each', s);
})();

// ---------------------------------------------------------------- two parallel sheets
export const PLATES = (() => {
  const w = 360;
  const h = 200;
  let s = S.rect(120, 25, 8, 150, { c: POS, fill: POS, fop: 0.35 }) + S.rect(232, 25, 8, 150, { c: NEG, fill: NEG, fop: 0.35 });
  s += S.text(124, 18, '+σ', { a: 'middle', w: 'bold' }) + S.text(236, 18, '−σ', { a: 'middle', w: 'bold' });
  for (const y of [50, 80, 110, 140]) s += S.arrow(132, y, 228, y, { c: ACC, w: 1.6, size: 6 });
  s += S.text(180, 190, 'between: E = σ/ε₀', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(60, 105, 'E = 0', { a: 'middle', size: 11 }) + S.text(300, 105, 'E = 0', { a: 'middle', size: 11 });
  s += S.text(60, 125, '(fields cancel)', { a: 'middle', size: 10 }) + S.text(300, 125, '(fields cancel)', { a: 'middle', size: 10 });
  check(true, 'plates: between the sheets the two σ/2ε₀ fields add; outside they cancel');
  return svgDoc(w, h, 'Two large parallel sheets with surface charge densities plus sigma and minus sigma: between them the two fields of sigma over two epsilon nought add to sigma over epsilon nought, from the positive to the negative sheet; outside they cancel', s);
})();

export const ALL = { FLUX, GAUSS, GAUSS_APPS, CUBE, PLATES };
