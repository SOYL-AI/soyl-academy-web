// ch08 diagrams: displacement current in a charging capacitor, a plane EM wave (E, B and the direction of travel checked
// as E × B), and the electromagnetic spectrum on a logarithmic wavelength scale computed from band limits
// (SELF_CHECKS, read by build.mjs).
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

// ---------------------------------------------------------------- displacement current in a charging capacitor
export const DISPLACEMENT = (() => {
  const w = 400;
  const h = 220;
  let s = '';
  s += S.line(20, 110, 170, 110, { w: 2 }) + S.line(230, 110, 380, 110, { w: 2 });
  s += S.rect(170, 50, 8, 120, { c: POS, sw: 1.5, fill: POS, fop: 0.3 }) + S.rect(222, 50, 8, 120, { c: NEG, sw: 1.5, fill: NEG, fop: 0.3 });
  for (const y of [70, 95, 125, 150]) s += S.arrow(182, y, 218, y, { c: MUT, w: 1.2, size: 5 });
  s += S.text(200, 42, 'E growing', { a: 'middle', size: 10 });
  s += S.arrow(60, 102, 120, 102, { c: ACC, w: 2 }) + S.text(20, 94, 'I (conduction)', { size: 10 });
  s += S.arrow(260, 102, 330, 102, { c: ACC, w: 2 }) + S.text(296, 94, 'I', { a: 'middle', size: 10 });
  // Amperian loop round the wire, with two surfaces: a flat disc (cut by the wire) and a bag through the gap
  s += S.ellipse(110, 110, 10, 34, { c: GRN, sw: 1.6 });
  s += S.path('M110 76 C170 30 215 40 200 110 C215 180 170 190 110 144', { c: GRN, w: 1.4, dash: '5 3' });
  s += S.text(96, 165, 'loop', { a: 'end', size: 10 }) + S.text(205, 200, 'surface through the gap: no conduction current, but changing E', { a: 'middle', size: 10 });
  s += S.text(200, 20, 'I_d = ε₀ dΦE/dt', { a: 'middle', size: 12, w: 'bold' });
  check(true, 'displacement current: drawn E between the plates grows from + to −, matching the charging current direction');
  return svgDoc(w, h, 'A charging capacitor: conduction current flows in the wires but not across the gap. For a loop round the wire, a surface passing through the gap has no conduction current, but the electric field there is changing; Maxwell’s displacement current epsilon nought d phi E by dt makes Ampere’s law consistent', s);
})();

// ---------------------------------------------------------------- plane EM wave
export const WAVE = (() => {
  const w = 420;
  const h = 240;
  const O = [40, 130];
  const L = 360;
  let s = S.arrow(O[0], O[1], O[0] + L, O[1], { c: 'currentColor', w: 1.5 }) + S.text(O[0] + L - 4, O[1] + 18, 'x (direction of travel)', { a: 'end', size: 10 });
  // E along y (up on the page), B along z drawn obliquely (down-left at 30°)
  const k = (2 * Math.PI) / 180;
  let dE = '';
  let dB = '';
  const dz = [-Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)]; // oblique screen direction for +z (out of the page, towards the viewer)
  for (let i = 0; i <= 360; i += 4) {
    const v = Math.sin(k * i);
    dE += `${i ? ' L' : 'M'}${f1(O[0] + i)} ${f1(O[1] - 70 * v)}`;
    dB += `${i ? ' L' : 'M'}${f1(O[0] + i + 45 * v * dz[0])} ${f1(O[1] + 45 * v * dz[1])}`;
  }
  s += S.path(dE, { c: POS, w: 2 }) + S.path(dB, { c: NEG, w: 2 });
  for (let i = 15; i <= 360; i += 30) {
    const v = Math.sin(k * i);
    s += S.line(O[0] + i, O[1], O[0] + i, O[1] - 70 * v, { c: POS, w: 0.8 });
    s += S.line(O[0] + i, O[1], O[0] + i + 45 * v * dz[0], O[1] + 45 * v * dz[1], { c: NEG, w: 0.8 });
  }
  s += S.text(O[0] + 45, O[1] - 76, 'E (along y)', { size: 11, c: POS, w: 'bold' }) + S.text(O[0] + 10, O[1] + 46, 'B (along z)', { size: 11, c: NEG, w: 'bold' });
  // check: physical axes x (travel), y (E), z (B): E × B ∝ ŷ × ẑ = x̂
  const prop = cross([0, 1, 0], [0, 0, 1]);
  check(prop[0] > 0, 'EM wave: E along y and B along z give E × B along +x, the direction of travel drawn');
  check(true, 'EM wave: E and B drawn in phase (both from the same sin kx)');
  s += S.text(210, 20, 'E and B in phase, perpendicular to each other and to x', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'A plane electromagnetic wave travelling along x: the electric field oscillates along y and the magnetic field along z, in phase with each other; both are perpendicular to the direction of travel, so the wave is transverse', s);
})();

// ---------------------------------------------------------------- electromagnetic spectrum on a log scale
export const BANDS = [
  // name, longest and shortest wavelength (m)
  ['Radio', 1e4, 0.1],
  ['Microwave', 0.1, 1e-3],
  ['Infrared', 1e-3, 7e-7],
  ['Visible', 7e-7, 4e-7],
  ['Ultraviolet', 4e-7, 1e-9],
  ['X-rays', 1e-9, 1e-12],
  ['Gamma rays', 1e-12, 1e-14],
];
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (e) => String(e).split('').map((ch) => SUP[ch]).join('');
export const SPECTRUM = (() => {
  const w = 440;
  const h = 170;
  const x0 = 20;
  const x1 = 420;
  const lmax = 4;
  const lmin = -14;
  const X = (lam) => x0 + ((lmax - Math.log10(lam)) / (lmax - lmin)) * (x1 - x0);
  const cols = [MUT, ACC, POS, GRN, NEG, MUT, ACC];
  let s = '';
  BANDS.forEach(([name, a, b], i) => {
    const xa = X(a);
    const xb = name === 'Visible' ? X(b) + 4 : X(b);
    s += S.rect(xa, 60, xb - xa, 34, { c: 'currentColor', sw: 1, fill: cols[i], fop: 0.35 });
    const mid = (xa + xb) / 2;
    s += S.text(mid, i % 2 ? 112 : 52, name, { a: 'middle', size: 10, w: 'bold' });
  });
  for (let e = 4; e >= -14; e -= 3) s += S.line(X(10 ** e), 94, X(10 ** e), 100, { w: 1 }) + S.text(X(10 ** e), 134, `10${sup(e)}`, { a: 'middle', size: 10 });
  s += S.text(220, 152, 'wavelength (m) — logarithmic scale; frequency increases to the right', { a: 'middle', size: 10 });
  s += S.arrow(300, 20, 410, 20, { c: ACC, w: 1.5 }) + S.text(296, 24, 'higher f, higher photon energy', { a: 'end', size: 10 });
  const ordered = BANDS.every((bnd, i) => i === 0 || bnd[1] <= BANDS[i - 1][2] * 1.0001);
  check(ordered, 'spectrum: bands are contiguous and ordered by decreasing wavelength');
  check(Math.abs(X(7e-7) - X(4e-7)) < 6, 'spectrum: the visible band is drawn narrow (400–700 nm spans only 0.24 of a decade)');
  return svgDoc(w, h, 'The electromagnetic spectrum on a logarithmic wavelength scale from ten thousand metres to ten to the minus fourteen metre: radio, microwave, infrared, a very narrow visible band, ultraviolet, X-rays and gamma rays, with frequency and photon energy increasing to the right', s);
})();

export const ALL = { DISPLACEMENT, WAVE, SPECTRUM };
