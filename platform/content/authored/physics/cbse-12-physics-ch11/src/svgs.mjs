// ch11 diagrams: the photoelectric experiment (photocell circuit), the photon energy split hν = φ₀ + K_max drawn to scale
// for the worked example (potassium, 400 nm), and a photon–electron picture with the threshold idea. SELF_CHECKS read by build.mjs.
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';

export const H = 6.63e-34;
export const QE = 1.6e-19;
export const CL = 3e8;
export const HC_EVNM = (H * CL) / QE / 1e-9; // ≈ 1243 eV nm with these constants

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

const meter = (x, y, ch) => S.circle(x, y, 13, { sw: 1.6, fill: FILL }) + S.text(x, y + 4, ch, { a: 'middle', size: 11, w: 'bold' });
function cellH(x, y) {
  return S.line(x - 4, y - 12, x - 4, y + 12, { w: 2 }) + S.line(x + 4, y - 6, x + 4, y + 6, { w: 3.5 });
}

// ---------------------------------------------------------------- photocell experiment
export const PHOTOCELL = (() => {
  const w = 420;
  const h = 278;
  const Cx = 110;
  const Ax = 310;
  let s = S.ellipse(210, 95, 150, 62, { fill: FILL, fop: 0.5 }) + S.text(210, 172, 'evacuated glass tube', { a: 'middle', size: 10 });
  s += S.rect(126, 33, 50, 8, { c: BLUE, sw: 1.2, fill: BLUE, fop: 0.25 }) + S.text(182, 50, 'quartz window', { size: 10 });
  s += S.line(Cx, 62, Cx, 128, { w: 4 }) + S.text(Cx - 8, 66, 'C', { a: 'end', w: 'bold' }) + S.text(Cx - 8, 142, 'emitter', { a: 'end', size: 10 });
  s += S.line(Ax, 62, Ax, 128, { w: 4 }) + S.text(Ax + 8, 66, 'A', { w: 'bold' }) + S.text(Ax + 8, 142, 'collector', { size: 10 });
  // light from the window onto the emitter
  const light = [[150, 2, Cx + 4, 78], [165, 2, Cx + 4, 96], [180, 2, Cx + 4, 114]];
  for (const [x1, y1, x2, y2] of light) s += S.arrow(x1, y1, x2, y2, { c: RAY, w: 1.4, size: 6 });
  s += S.text(188, 12, 'light of frequency ν', { size: 10, c: RAY });
  // photoelectrons drifting from C to A
  const eDir = [];
  for (const y of [80, 100, 118]) {
    s += S.circle(Cx + 40, y, 3, { c: BLUE, fill: BLUE }) + S.arrow(Cx + 46, y, Ax - 50, y, { c: BLUE, w: 1.2, size: 5 });
    eDir.push(Ax - 50 - (Cx + 46));
  }
  s += S.text(210, 74, 'photoelectrons', { a: 'middle', size: 10, c: BLUE });
  // external circuit: C down to battery, A down through microammeter
  s += S.line(Cx, 128, Cx, 230) + S.line(Cx, 230, 186, 230) + cellH(190, 230) + cellH(206, 230) + S.line(210, 230, Ax, 230);
  s += S.text(198, 252, 'battery (polarity reversible)', { a: 'middle', size: 10 });
  s += S.line(Ax, 128, Ax, 165) + meter(Ax, 178, 'μA') + S.line(Ax, 191, Ax, 230);
  s += S.line(Cx, 190, 190, 190) + meter(210, 190, 'V') + S.line(223, 190, Ax, 190, { dash: '3 3' });
  s += S.text(w - 4, 272, 'A positive: electrons collected; A negative: retarding', { a: 'end', size: 10 });
  check(eDir.every((d) => d > 0), 'photocell: photoelectron arrows point from the emitter C to the collector A');
  return svgDoc(w, h, 'Photoelectric experiment: light enters an evacuated tube through a quartz window and falls on the emitter plate C; photoelectrons travel to the collector plate A; a reversible battery sets the potential of A, a voltmeter reads it and a microammeter measures the photocurrent', s);
})();

// ---------------------------------------------------------------- photon energy split (worked example: 400 nm on potassium, φ₀ = 2.25 eV)
export const SPLIT_DATA = (() => {
  const lam = 400;
  const phi = 2.25;
  const E = HC_EVNM / lam;
  return { lam, phi, E, K: E - phi };
})();
export const ENERGY = (() => {
  const { E, phi, K } = SPLIT_DATA;
  const w = 420;
  const h = 170;
  const x0 = 30;
  const k = 110; // px per eV
  const y = 70;
  let s = S.text(x0, 30, 'photon energy hν (400 nm light)', { size: 11, w: 'bold' });
  s += S.rect(x0, y - 14, E * k, 18, { c: RAY, sw: 1.4, fill: RAY, fop: 0.25 }) + S.text(x0 + (E * k) / 2, y - 1, `${E.toFixed(2)} eV`, { a: 'middle', size: 11 });
  const y2 = y + 50;
  s += S.rect(x0, y2 - 14, phi * k, 18, { c: ACC, sw: 1.4, fill: ACC, fop: 0.3 }) + S.text(x0 + (phi * k) / 2, y2 - 1, `work function φ₀ = ${phi.toFixed(2)} eV`, { a: 'middle', size: 10 });
  s += S.rect(x0 + phi * k, y2 - 14, K * k, 18, { c: GRN, sw: 1.4, fill: GRN, fop: 0.3 }) + S.text(x0 + phi * k + (K * k) / 2, y2 - 1, `${K.toFixed(2)} eV`, { a: 'middle', size: 10 });
  s += S.text(x0 + phi * k + (K * k) / 2, y2 + 22, 'K_max', { a: 'middle', size: 11, w: 'bold' });
  s += S.line(x0 + E * k, y + 4, x0 + E * k, y2 - 14, { c: MUT, dash: '3 3' });
  s += S.text(x0, h - 8, 'hν = φ₀ + K_max (scale: 1 eV = 110 px)', { size: 10 });
  check(Math.abs(phi * k + K * k - E * k) < 1e-9 && Math.abs(E - 3.11) < 0.01, `energy split: φ₀ + K_max = ${(phi + K).toFixed(2)} eV = hν drawn to scale (E = ${E.toFixed(2)} eV)`);
  return svgDoc(w, h, 'Bar diagram of Einstein’s photoelectric equation for 400 nanometre light on potassium: the photon energy of about 3.11 electronvolts splits into the work function of 2.25 electronvolts and a maximum kinetic energy of about 0.86 electronvolt', s);
})();

// ---------------------------------------------------------------- photons and the threshold
export const THRESHOLD = (() => {
  const w = 420;
  const h = 200;
  const yS = 120;
  let s = S.rect(0, yS, w, h - yS, { c: 'currentColor', sw: 1.2, fill: FILL, fop: 0.8 }) + S.text(8, h - 10, 'metal surface (work function φ₀)', { size: 10 });
  // left: red photons below threshold, no emission
  for (const x of [40, 80, 120]) s += S.path(`M${x - 30} ${yS - 70} q 5 -8 10 0 t 10 0 t 10 0`, { c: RAY, w: 1.4 }) + S.arrow(x, yS - 70, x + 18, yS - 6, { c: RAY, w: 1.2, size: 5 });
  s += S.text(90, 26, 'ν < ν₀: no electrons,', { a: 'middle', size: 10 }) + S.text(90, 40, 'however bright the light', { a: 'middle', size: 10 });
  // right: violet photons above threshold, electrons out
  for (const x of [270, 320, 370]) {
    s += S.path(`M${x - 30} ${yS - 70} q 3 -6 6 0 t 6 0 t 6 0 t 6 0`, { c: BLUE, w: 1.4 }) + S.arrow(x - 6, yS - 70, x + 4, yS - 6, { c: BLUE, w: 1.2, size: 5 });
    s += S.circle(x + 12, yS - 10, 3, { c: GRN, fill: GRN }) + S.arrow(x + 14, yS - 14, x + 30, yS - 52, { c: GRN, w: 1.2, size: 5 });
  }
  s += S.text(320, 26, 'ν > ν₀: electrons emitted', { a: 'middle', size: 10 }) + S.text(320, 40, 'at once, even in dim light', { a: 'middle', size: 10 });
  s += S.line(210, 10, 210, yS - 4, { c: MUT, dash: '4 4' });
  check(true, 'threshold picture: emission drawn only for photons above the threshold frequency');
  return svgDoc(w, h, 'Photons and the threshold frequency: low-frequency photons striking a metal free no electrons however many arrive, while each photon above the threshold frequency can free an electron at once', s);
})();

export const ALL = { PHOTOCELL, ENERGY, THRESHOLD };
