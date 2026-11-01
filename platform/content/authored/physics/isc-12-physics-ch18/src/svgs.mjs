// ISC ch18 diagrams: Hertz's spark-gap observation, Lenard's photoelectric apparatus (with potential divider and
// reversing key), the energy picture of Einstein's equation drawn to scale for worked example 2 (magnesium, 225 nm), the
// Davisson–Germer apparatus, the Davisson–Germer polar intensity curves (qualitative), and electron diffraction rings.
// Physics helpers (constants as stated in the decks: h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m/s,
// mₑ = 9.1 × 10⁻³¹ kg) are exported for the decks and the question bank. SELF_CHECKS are read by build.mjs.
// The photocell drawing is adapted from the author's CBSE 12 Physics ch11 code (copied, not imported); the other figures
// are new.
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

// ================================================================ physics
export const H = 6.6e-34; // Planck constant, J s (value used throughout this chapter)
export const QE = 1.6e-19; // C
export const CL = 3e8; // m/s
export const ME = 9.1e-31; // kg
export const MP = 1.67e-27; // kg
/** hc/e in eV nm with these constants: 1237.5. */
export const HC = (H * CL) / QE / 1e-9;
/** Photon energy in eV for a wavelength in nm. */
export const photonEV = (lamNm) => HC / lamNm;
/** Frequency in Hz for a wavelength in nm. */
export const freqOf = (lamNm) => CL / (lamNm * 1e-9);
/** Threshold frequency (Hz) and threshold wavelength (nm) for a work function in eV. */
export const thresholdF = (phiEV) => (phiEV * QE) / H;
export const thresholdLam = (phiEV) => HC / phiEV;
/** Speed (m/s) of an electron with kinetic energy K (eV). */
export const speedOf = (K) => Math.sqrt((2 * K * QE) / ME);
/** de Broglie wavelength (m) of an electron accelerated from rest through V volts. */
export const lamElectron = (V) => H / Math.sqrt(2 * ME * QE * V);
/** Kinetic energy (eV) of an electron of de Broglie wavelength lam (m). */
export const keForLam = (lam) => H ** 2 / (2 * ME * lam ** 2) / QE;
check(close(HC, 1237.5) && close(lamElectron(1) * 1e9, 1.2231, 1e-4), `constants: hc/e = ${HC} eV nm; electron λ√V = ${(lamElectron(1) * 1e9).toFixed(4)} nm V^½`);

// ================================================================ t01 Hertz's observation
export const HERTZ = (() => {
  const w = 420;
  const h = 220;
  const gy = 72; // transmitter gap height
  const rx = 330; // receiver loop centre
  const ry = 104;
  const rr = 44;
  let s = '';
  // induction coil and transmitter
  s += S.rect(22, 150, 126, 40, { fill: FILL, sw: 1.4 }) + lab(85, 175, 'induction coil', { a: 'middle', size: 10 });
  s += S.path(`M46 150 L46 ${gy} L80 ${gy}`) + S.circle(85, gy, 5, { fill: FILL }) + S.path(`M124 150 L124 ${gy} L112 ${gy}`) + S.circle(107, gy, 5, { fill: FILL });
  s += S.path(`M90 ${gy} l3 -5 l3 9 l3 -9 l3 7`, { c: ACC, w: 1.6 });
  s += lab(96, 40, 'transmitter spark', { a: 'middle', size: 10, c: ACC }) + lab(96, 53, '(rich in ultraviolet)', { a: 'middle', size: 10, c: ACC });
  // receiver loop with a small gap on its left
  const g1 = rad(170);
  const g2 = rad(190);
  const p1 = [rx + rr * Math.cos(g1), ry - rr * Math.sin(g1)];
  const p2 = [rx + rr * Math.cos(g2), ry - rr * Math.sin(g2)];
  s += S.path(`M${f1(p1[0])} ${f1(p1[1])} A${rr} ${rr} 0 1 1 ${f1(p2[0])} ${f1(p2[1])}`, { w: 1.8 });
  s += S.circle(p1[0], p1[1], 3.5, { fill: FILL }) + S.circle(p2[0], p2[1], 3.5, { fill: FILL });
  s += S.path(`M${f1(p1[0] - 6)} ${f1(p1[1] + 3)} l4 3 l-5 3 l4 3`, { c: ACC, w: 1.4 });
  s += lab(rx, ry + rr + 18, 'receiver loop', { a: 'middle', size: 10 }) + lab(rx - rr - 4, ry + 30, 'receiver gap', { a: 'end', size: 10 });
  // ultraviolet light from the transmitter spark towards the receiver gap
  const gx = rx - rr; // gap x
  const rays = [[112, gy - 4, gx - 10, ry - 8], [112, gy + 2, gx - 10, ry], [112, gy + 8, gx - 10, ry + 8]];
  for (const [x1, y1, x2, y2] of rays) s += S.arrow(x1, y1, x2, y2, { c: RAY, w: 1.3, size: 6, dash: '5 3' });
  // removable glass sheet
  const sx = 200;
  s += S.rect(sx, 44, 7, 96, { c: BLUE, sw: 1.2, fill: BLUE, fop: 0.2 }) + lab(sx + 3, 154, 'glass sheet', { a: 'middle', size: 10, c: BLUE }) + lab(sx + 3, 167, '(stops ultraviolet)', { a: 'middle', size: 10, c: BLUE });
  s += lab(w / 2, 206, 'Glass in place: receiver sparks shorter. Quartz sheet: no change.', { a: 'middle', size: 10 });
  const yAt = (x1, y1, x2, y2, x) => y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
  check(rays.every(([x1, y1, x2, y2]) => x1 < sx && x2 > sx + 7 && yAt(x1, y1, x2, y2, sx) > 44 && yAt(x1, y1, x2, y2, sx) < 140), 'Hertz: every ultraviolet ray from the transmitter spark to the receiver gap passes through the glass sheet');
  return svgDoc(w, h, 'Hertz’s observation: an induction coil drives a spark across a transmitter gap; ultraviolet light from that spark falls on the small gap of a receiver loop; a glass sheet placed in the path stops the ultraviolet and the receiver sparks become shorter, while a quartz sheet makes no difference', s);
})();

// ================================================================ t01 Lenard's apparatus (adapted from CBSE 12 Physics ch11)
const meter = (x, y, ch) => S.circle(x, y, 13, { sw: 1.6, fill: FILL }) + S.text(x, y + 4, ch, { a: 'middle', size: 11, w: 'bold' });
const cell = (x, y) => S.line(x - 4, y - 11, x - 4, y + 11, { w: 2 }) + S.line(x + 4, y - 6, x + 4, y + 6, { w: 3.5 });
export const LENARD = (() => {
  const w = 440;
  const h = 300;
  const Cx = 120;
  const Ax = 320;
  let s = S.ellipse(220, 95, 150, 62, { fill: FILL, fop: 0.5 }) + S.text(220, 172, 'evacuated glass bulb', { a: 'middle', size: 10 });
  s += S.rect(136, 33, 44, 8, { c: BLUE, sw: 1.2, fill: BLUE, fop: 0.25 }) + S.text(186, 40, 'quartz window', { size: 10 });
  s += S.line(Cx, 62, Cx, 128, { w: 4 }) + S.text(Cx - 8, 70, 'C', { a: 'end', w: 'bold' }) + S.text(Cx - 8, 140, 'emitter', { a: 'end', size: 10 });
  s += S.line(Ax, 62, Ax, 128, { w: 4 }) + S.text(Ax + 8, 70, 'A', { w: 'bold' }) + S.text(Ax + 8, 140, 'collector', { size: 10 });
  const light = [[160, 4, Cx + 4, 80], [175, 4, Cx + 4, 97], [190, 4, Cx + 4, 114]];
  for (const [x1, y1, x2, y2] of light) s += S.arrow(x1, y1, x2, y2, { c: RAY, w: 1.4, size: 6 });
  s += S.text(204, 14, 'monochromatic light, frequency f', { size: 10, c: RAY });
  const eDir = [];
  for (const y of [84, 102, 120]) {
    s += S.circle(Cx + 40, y, 3, { c: BLUE, fill: BLUE }) + S.arrow(Cx + 46, y, Ax - 46, y, { c: BLUE, w: 1.2, size: 5 });
    eDir.push(Ax - 46 - (Cx + 46));
  }
  s += S.text(220, 78, 'photoelectrons', { a: 'middle', size: 10, c: BLUE });
  // potential divider: rheostat wire across the battery; the slider sets the collector potential
  const rL = 160;
  const rR = 290;
  const ry = 240;
  const slider = 252;
  s += S.line(Cx, 128, Cx, ry) + S.line(Cx, ry, rL, ry);
  s += S.line(rL, ry, rR, ry, { w: 4 }) + S.text(rL + 6, ry + 16, 'rheostat (potential divider)', { size: 10 });
  s += S.line(rL, ry, rL, 276) + S.line(rL, 276, 200, 276) + cell(204, 276) + cell(220, 276) + S.line(224, 276, 252, 276);
  s += S.rect(252, 269, 22, 14, { fill: FILL, sw: 1.2 }) + S.text(263, 280, 'RK', { a: 'middle', size: 10 }) + S.line(274, 276, rR, 276) + S.line(rR, 276, rR, ry);
  s += S.text(w - 6, 294, 'RK: reversing key (changes the sign of V)', { a: 'end', size: 10 });
  s += S.line(Ax, 128, Ax, 165) + meter(Ax, 178, 'μA') + S.line(Ax, 191, Ax, 205) + S.line(Ax, 205, slider, 205) + S.arrow(slider, 205, slider, ry - 3, { size: 6 });
  s += S.line(Cx, 214, 172, 214) + meter(185, 214, 'V') + S.line(198, 214, slider, 214, { dash: '3 3' });
  const xAt = (x1, y1, x2, y2, y) => x1 + ((x2 - x1) * (y - y1)) / (y2 - y1);
  check(eDir.every((d) => d > 0) && slider > rL && slider < rR && light.every(([x1, y1, x2, y2]) => xAt(x1, y1, x2, y2, 37) > 136 && xAt(x1, y1, x2, y2, 37) < 180), 'Lenard: the light passes through the quartz window; photoelectron arrows point from the emitter C to the collector A; the slider lies on the rheostat');
  return svgDoc(w, h, 'Lenard’s photoelectric apparatus: monochromatic light enters an evacuated bulb through a quartz window and falls on the emitter plate C; photoelectrons travel to the collector plate A; a battery across a rheostat with a sliding contact and a reversing key sets the potential V of A relative to C, read on a voltmeter, and a microammeter measures the photocurrent', s);
})();

// ================================================================ t02 energy picture of Einstein's equation (worked example 2)
export const WELL_DATA = { phi: 3.7, lam: 225, deeper: 0.8 };
export const WELL = (() => {
  const { phi, lam, deeper } = WELL_DATA;
  const E = photonEV(lam);
  const K = E - phi;
  const k = 30; // px per eV
  const w = 420;
  const h = 252;
  const y0 = 212; // top filled level
  const yv = y0 - phi * k; // vacuum level (electron at rest outside)
  const xe = 150;
  const xd = 70;
  let s = '';
  s += S.rect(28, y0, 170, h - 12 - y0, { fill: FILL, sw: 1.2 }) + lab(134, h - 18, 'metal (filled levels)', { a: 'middle', size: 10 });
  s += S.line(28, y0, 198, y0, { w: 2 });
  s += S.line(28, yv, 404, yv, { c: MUT, dash: '5 4' }) + lab(404, yv + 14, 'at rest just outside', { a: 'end', size: 10, c: MUT });
  // work function bracket
  s += S.arrow(240, y0, 240, yv + 1, { c: ACC, size: 6 }) + S.arrow(240, yv, 240, y0 - 1, { c: ACC, size: 6 }) + lab(248, (y0 + yv) / 2 + 4, `W₀ = ${phi} eV`, { c: ACC });
  // photon absorbed by the topmost electron
  const yTop = y0 - E * k;
  s += S.circle(xe, y0, 4, { fill: BLUE, c: BLUE }) + S.arrow(xe, y0 - 4, xe, yTop, { c: RAY, w: 1.6, size: 7 }) + lab(xe + 6, 150, `photon absorbed:`, { size: 10, c: RAY }) + lab(xe + 6, 164, `hf = ${E.toFixed(1)} eV`, { c: RAY });
  s += S.arrow(xe + 2, yTop, 280, yTop, { c: BLUE, w: 1.4, size: 6 }) + lab(215, yTop - 6, 'leaves the metal', { a: 'middle', size: 10, c: BLUE });
  // K_max bracket
  s += S.arrow(290, yv, 290, yTop + 1, { c: GRN, size: 6 }) + S.arrow(290, yTop, 290, yv - 1, { c: GRN, size: 6 }) + lab(298, (yv + yTop) / 2 + 4, `K_max = ${K.toFixed(1)} eV`, { c: GRN });
  // a deeper electron
  const yd = y0 + deeper * k;
  const ydTop = yd - E * k;
  const Kd = (yv - ydTop) / k;
  s += S.circle(xd, yd, 4, { fill: BLUE, c: BLUE }) + S.arrow(xd, yd - 4, xd, ydTop, { c: RAY, w: 1.2, size: 6, dash: '4 3' });
  s += lab(xd, ydTop - 8, `deeper: K = ${Kd.toFixed(1)} eV`, { a: 'middle', size: 10 });
  check(close((yv - yTop) / k, 1.8, 1e-9) && close(K, 1.8, 1e-9) && close(Kd, K - deeper, 1e-9) && Kd < K, `energy picture to scale (${k} px per eV): hf = ${E} eV, W₀ = ${phi} eV, drawn K_max = ${((yv - yTop) / k).toFixed(3)} eV; deeper electron ${Kd.toFixed(2)} eV < K_max`);
  return svgDoc(w, h, 'Energy picture of Einstein’s photoelectric equation, drawn to scale for 225 nanometre light on magnesium: an electron at the top of the filled levels absorbs a photon of 5.5 electronvolts, uses 3.7 electronvolts, the work function, to reach the energy of an electron at rest outside the metal, and leaves with the maximum kinetic energy of 1.8 electronvolts; an electron 0.8 electronvolt deeper leaves with only 1.0 electronvolt', s);
})();

// ================================================================ t05 Davisson–Germer apparatus (qualitative)
export const DG_DATA = { V: 54, phi: 50 };
export const DG_APP = (() => {
  const w = 420;
  const h = 262;
  const cx = 210;
  const cy = 224; // crystal surface
  const R = 132;
  let s = S.rect(8, 6, w - 16, h - 12, { c: MUT, sw: 1, dash: '6 4' }) + lab(16, 22, 'vacuum chamber', { size: 10, c: MUT });
  // crystal
  s += S.rect(cx - 45, cy, 90, 18, { fill: FILL, sw: 1.4 }) + lab(cx - 52, cy + 14, 'nickel crystal', { a: 'end', size: 10 });
  // electron gun
  s += S.rect(cx - 16, 16, 32, 42, { fill: FILL, sw: 1.4 }) + S.path(`M${cx - 9} 30 l3 -6 l3 6 l3 -6 l3 6 l3 -6`, { c: ACC, w: 1.4 });
  s += S.line(cx - 22, 66, cx - 4, 66, { w: 2.5 }) + S.line(cx + 4, 66, cx + 22, 66, { w: 2.5 });
  s += lab(cx - 24, 30, 'heated filament', { a: 'end', size: 10 }) + lab(cx - 26, 70, 'anode (accelerating', { a: 'end', size: 10 }) + lab(cx - 26, 83, 'potential V)', { a: 'end', size: 10 });
  s += lab(cx + 22, 34, 'electron gun', { size: 10 });
  s += S.arrow(cx, 70, cx, cy - 2, { c: BLUE, w: 2, size: 7 }) + lab(cx - 6, 150, 'electron beam', { a: 'end', size: 10, c: BLUE });
  // detector arc and detector
  const at = (a, r) => [cx + r * Math.sin(rad(a)), cy - r * Math.cos(rad(a))];
  const a0 = at(18, R);
  const a1 = at(88, R);
  s += S.path(`M${f1(a0[0])} ${f1(a0[1])} A${R} ${R} 0 0 1 ${f1(a1[0])} ${f1(a1[1])}`, { c: MUT, w: 1, dash: '4 4' });
  const [dx, dy] = at(DG_DATA.phi, R);
  s += S.circle(dx, dy, 9, { fill: FILL, sw: 1.5 }) + lab(dx + 14, dy - 4, 'movable detector', { size: 10 }) + lab(dx + 14, dy + 9, '(collector)', { size: 10 });
  const [ex, ey] = at(DG_DATA.phi, R - 11);
  s += S.arrow(cx, cy - 1, ex, ey, { c: BLUE, w: 1.6, size: 7 });
  // scattering angle
  const r0 = 40;
  const [qx, qy] = at(DG_DATA.phi, r0);
  s += S.path(`M${cx} ${cy - r0} A${r0} ${r0} 0 0 1 ${f1(qx)} ${f1(qy)}`, { c: GRN, w: 1.4 }) + lab(cx + 20, cy - r0 - 6, 'φ', { it: true, c: GRN });
  s += lab(w - 14, h - 22, 'scattering angle φ, measured', { a: 'end', size: 10, c: GRN }) + lab(w - 14, h - 10, 'from the incident beam', { a: 'end', size: 10, c: GRN });
  const measured = deg(Math.atan2(dx - cx, cy - dy));
  check(close(measured, DG_DATA.phi, 1e-9), `Davisson–Germer apparatus: detector drawn at φ = ${measured.toFixed(2)}° from the incident beam, on the detector arc of radius ${R}`);
  return svgDoc(w, h, 'Davisson–Germer apparatus inside a vacuum chamber: an electron gun with a heated filament and an anode at accelerating potential V sends a narrow beam of electrons straight down onto a nickel crystal; a movable detector on an arc around the crystal counts the electrons scattered at an angle phi to the incident beam', s);
})();

// ================================================================ t05 Davisson–Germer polar curves (qualitative)
export const DG_CURVES = [
  { V: 44, peak: 58, amp: 0.16 },
  { V: 54, peak: 50, amp: 0.55 },
  { V: 64, peak: 44, amp: 0.22 },
];
export const dgIntensity = ({ peak, amp }, a) => 0.62 - 0.0022 * a + amp * Math.exp(-(((a - peak) / 6) ** 2));
export const DG_POLAR = (() => {
  const w = 420;
  const h = 214;
  const R = 112;
  const oy = 186;
  let s = '';
  const peaks = [];
  DG_CURVES.forEach((cv, i) => {
    const ox = 18 + i * 136;
    s += S.line(ox, oy, ox, oy - R - 8, { c: MUT, w: 1 }) + S.line(ox, oy, ox + R + 6, oy, { c: MUT, w: 1 });
    const [rx, ry] = [ox + R * 0.95 * Math.sin(rad(50)), oy - R * 0.95 * Math.cos(rad(50))];
    s += S.line(ox, oy, rx, ry, { c: MUT, w: 1, dash: '3 3' });
    let d = '';
    let best = { a: 0, r: 0 };
    for (let a = 0; a <= 90; a += 1) {
      const r = R * dgIntensity(cv, a);
      if (r > best.r && a > 20) best = { a, r };
      d += `${a ? 'L' : 'M'}${f1(ox + r * Math.sin(rad(a)))} ${f1(oy - r * Math.cos(rad(a)))} `;
    }
    s += S.path(d.trim(), { c: cv.V === 54 ? RAY : BLUE, w: cv.V === 54 ? 2 : 1.4 });
    s += lab(ox + 40, 20, `${cv.V} V`, { w: 'bold', c: cv.V === 54 ? RAY : 'currentColor' });
    peaks.push(best);
  });
  s += lab(w / 2, h - 6, 'Distance from each corner ∝ number of electrons scattered at that angle; dashed line: 50°', { a: 'middle', size: 10 });
  const bump = (cv) => dgIntensity(cv, cv.peak) - (0.62 - 0.0022 * cv.peak);
  check(peaks[1].a === 50 && bump(DG_CURVES[1]) > bump(DG_CURVES[0]) && bump(DG_CURVES[1]) > bump(DG_CURVES[2]), `Davisson–Germer curves: the 54 V curve peaks at ${peaks[1].a}° and its spur is the largest of the three (${DG_CURVES.map((c) => bump(c).toFixed(2)).join(', ')})`);
  return svgDoc(w, h, 'Polar graphs of the number of scattered electrons against scattering angle for accelerating potentials of 44, 54 and 64 volts: a spur appears in each, and it is sharpest for 54 volts, at a scattering angle of about 50 degrees', s);
})();

// ================================================================ t05 electron diffraction rings (qualitative)
export const RINGS = (() => {
  const w = 420;
  const h = 214;
  const fx = 118; // foil
  const sx = 250; // screen
  const cy = 100;
  const L = sx - fx;
  const angles = [12, 21]; // cone half-angles (exaggerated)
  let s = '';
  s += S.arrow(18, cy, fx - 4, cy, { c: BLUE, w: 2, size: 7 }) + lab(20, cy - 10, 'electron beam', { size: 10, c: BLUE });
  s += S.rect(fx, cy - 34, 4, 68, { fill: FILL, sw: 1.2 }) + lab(fx + 2, cy + 50, 'thin foil', { a: 'middle', size: 10 });
  s += S.line(sx, 20, sx, 180, { w: 2.5 }) + lab(sx, 196, 'screen (side view)', { a: 'middle', size: 10 });
  const radii = angles.map((a) => L * Math.tan(rad(a)));
  for (const r of radii) {
    s += S.line(fx + 4, cy, sx, cy - r, { c: RAY, w: 1.1 }) + S.line(fx + 4, cy, sx, cy + r, { c: RAY, w: 1.1 });
  }
  s += S.line(fx + 4, cy, sx, cy, { c: BLUE, w: 1.2, dash: '4 3' });
  const cx = 344;
  for (const r of radii) s += S.circle(cx, cy, r, { c: RAY, sw: 2.2 });
  s += S.circle(cx, cy, 4, { fill: BLUE, c: BLUE }) + lab(cx, 196, 'screen, front view', { a: 'middle', size: 10 });
  s += lab(cx, 14, 'concentric rings', { a: 'middle', size: 10, c: RAY });
  check(radii.every((r, i) => close(r, L * Math.tan(rad(angles[i])))) && radii[0] < radii[1] && cx - radii[1] > sx + 4, `electron diffraction: front-view ring radii ${radii.map((r) => r.toFixed(1)).join(' and ')} px equal L tan θ of the side-view cones`);
  return svgDoc(w, h, 'Electron diffraction: a beam of electrons passes through a thin metal foil; diffracted electrons travel along cones and strike a screen, which seen from the front shows a central spot surrounded by concentric rings', s);
})();

export const ALL = { HERTZ, LENARD, WELL, DG_APP, DG_POLAR, RINGS };
