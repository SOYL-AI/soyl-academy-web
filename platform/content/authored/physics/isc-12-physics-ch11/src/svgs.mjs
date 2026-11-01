// ISC ch11 diagrams: a sinusoidal current with its peak, rms and half-cycle mean drawn at the computed heights, rotating
// phasors with their projections, R, L and C with their phasor diagrams (adapted from cbse-12-physics-ch07/src/svgs.mjs),
// a series LCR circuit, its phasor diagram and impedance triangle drawn to scale from worked example 3, the active and
// wattless components of a lagging current, a lamp run through a resistor and through a choke, the four quarter-cycle
// states of an LC circuit, and the AC generator (construction, copied and extended from the CBSE chapter, and an end-on
// view for the theory). Screen coordinates: x right, y down. Every direction, ratio and value drawn is computed here
// and compared with the drawing (SELF_CHECKS, read by build.mjs).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const POS = 'var(--diagram-red)';
const NEG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const DEG = Math.PI / 180;

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const pathOf = (pts) => 'M' + pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L');

// ---------------------------------------------------------------- symbol kit (every helper returns a fragment)
const W = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { w: 1.6 });
/** Resistor (zigzag) between (x1, y) and (x2, y). */
function resH(x1, x2, y, label, { ly = -12 } = {}) {
  const n = 6;
  const a = x1 + (x2 - x1) * 0.2;
  const b = x2 - (x2 - x1) * 0.2;
  let d = `M${x1} ${y} L${a} ${y}`;
  for (let i = 0; i < n; i++) d += ` L${(a + ((i + 0.5) * (b - a)) / n).toFixed(1)} ${y + (i % 2 ? 6 : -6)}`;
  d += ` L${b} ${y} L${x2} ${y}`;
  return S.path(d, { w: 1.6, join: 'round' }) + (label ? S.text((x1 + x2) / 2, y + ly, label, { a: 'middle', size: 11 }) : '');
}
/** Inductor (humps above the wire) between (x1, y) and (x2, y); `core` adds two lines for an iron core. */
function coilH(x1, x2, y, label, { ly = -14, n = 4, core = false } = {}) {
  const r = (x2 - x1) / (2 * n);
  let d = `M${x1} ${y}`;
  for (let i = 0; i < n; i++) d += ` A${f1(r)} ${f1(r)} 0 0 1 ${f1(x1 + 2 * r * (i + 1))} ${y}`;
  let s = S.path(d, { w: 1.6 });
  if (core) s += S.line(x1, y - r - 5, x2, y - r - 5, { w: 1.2 }) + S.line(x1, y - r - 8, x2, y - r - 8, { w: 1.2 });
  return s + (label ? S.text((x1 + x2) / 2, y + ly - (core ? 8 : 0), label, { a: 'middle', size: 11 }) : '');
}
/** Capacitor in a horizontal wire: plates at x − 4 and x + 4. */
function capH(x, y, label, { ly = -18 } = {}) {
  return S.line(x - 4, y - 12, x - 4, y + 12, { w: 2.2 }) + S.line(x + 4, y - 12, x + 4, y + 12, { w: 2.2 }) + (label ? S.text(x, y + ly, label, { a: 'middle', size: 11 }) : '');
}
/** AC source: a circle of radius 13 with a sine squiggle. */
function source(x, y) {
  return S.circle(x, y, 13, { sw: 1.6, fill: FILL }) + S.path(`M${x - 8} ${y} Q${x - 4} ${y - 9} ${x} ${y} Q${x + 4} ${y + 9} ${x + 8} ${y}`, { w: 1.4 });
}
/** Lamp: a circle of radius 10 with a cross. */
function lamp(x, y) {
  const k = 7;
  return S.circle(x, y, 10, { sw: 1.6, fill: FILL }) + S.line(x - k, y - k, x + k, y + k, { w: 1.3 }) + S.line(x - k, y + k, x + k, y - k, { w: 1.3 });
}
/** ⊙ (out of the page) or ⊗ (into the page) of radius r. */
function dirSym(x, y, out, { c = 'currentColor', r = 7 } = {}) {
  let s = S.circle(x, y, r, { c, sw: 1.5, fill: FILL });
  if (out) s += S.circle(x, y, 2, { c, fill: c });
  else s += S.line(x - r * 0.7, y - r * 0.7, x + r * 0.7, y + r * 0.7, { c, w: 1.3 }) + S.line(x - r * 0.7, y + r * 0.7, x + r * 0.7, y - r * 0.7, { c, w: 1.3 });
  return s;
}
/** Screen angle (degrees, anticlockwise positive) of the arrow from p to q. */
const screenAngle = (p, q) => Math.atan2(p[1] - q[1], q[0] - p[0]) / DEG;

// ---------------------------------------------------------------- 1. a sinusoidal current: peak, rms, half-cycle mean, period
export const WAVE = (() => {
  const w = 420;
  const h = 262;
  const x0 = 40;
  const y0 = 125;
  const A = 95;
  const P = 320;
  const X = (t) => x0 + t * P;
  const Y = (v) => y0 - A * v;
  const curve = (t0, t1, n) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const t = t0 + ((t1 - t0) * i) / n;
      return [X(t), Y(Math.sin(2 * Math.PI * t))];
    });
  let s = '';
  s += S.path(`${pathOf(curve(0, 0.5, 60))} L${f1(X(0.5))} ${y0} Z`, { c: 'none', fill: ACC, fop: 0.16 });
  s += S.arrow(x0 - 10, y0, 412, y0, { w: 1.2 }) + S.text(410, y0 + 16, 't', { a: 'end', it: true, w: 'bold' });
  s += S.arrow(x0, 226, x0, 10, { w: 1.2 }) + S.text(x0 + 8, 16, 'i', { it: true, w: 'bold' });
  s += S.path(pathOf(curve(0, 1, 160)), { c: ACC, w: 2.4 });
  const peakY = Y(1);
  const rmsY = Y(1 / Math.SQRT2);
  const meanY = Y(2 / Math.PI);
  s += S.line(x0, peakY, 410, peakY, { c: MUT, w: 1, dash: '4 3' }) + S.text(410, peakY - 5, 'peak I₀', { a: 'end', size: 11 });
  s += S.line(x0, rmsY, 410, rmsY, { c: GRN, w: 1.6, dash: '6 3' }) + S.text(410, rmsY - 5, 'rms: I₀/√2 ≈ 0.707 I₀', { a: 'end', size: 11, c: GRN });
  s += S.line(x0, meanY, 410, meanY, { c: POS, w: 1.6, dash: '2 3' }) + S.text(410, meanY + 15, 'half-cycle mean: 2I₀/π ≈ 0.637 I₀', { a: 'end', size: 11, c: POS });
  s += S.text(X(0.25), 100, 'area = mean', { a: 'middle', size: 10 }) + S.text(X(0.25), 112, '× T/2', { a: 'middle', size: 10 });
  s += S.arrow(X(0.5), 242, X(0), 242, { w: 1.2, size: 6 }) + S.arrow(X(0.5), 242, X(1), 242, { w: 1.2, size: 6 }) + S.text(X(0.5), 257, 'one period T = 1/f', { a: 'middle', size: 11 });
  // the drawn heights against a numerical average of the drawn curve
  const N = 4000;
  let m = 0;
  let sq = 0;
  let full = 0;
  for (let i = 0; i < N; i++) {
    const v = Math.sin((2 * Math.PI * (i + 0.5)) / N);
    if (i < N / 2) m += v;
    sq += v * v;
    full += v;
  }
  m /= N / 2;
  const rms = Math.sqrt(sq / N);
  check(close((y0 - meanY) / A, m, 1e-4), `wave: half-cycle mean line drawn at ${((y0 - meanY) / A).toFixed(4)} of the peak; numerical mean of the drawn half cycle ${m.toFixed(4)} (2/π)`);
  check(close((y0 - rmsY) / A, rms, 1e-6), `wave: rms line drawn at ${rms.toFixed(4)} of the peak, the square root of the mean of sin² over the cycle (1/√2)`);
  check(Math.abs(full / N) < 1e-9 && rmsY < meanY, 'wave: the full-cycle mean is zero, and the rms line lies above the half-cycle mean line');
  return svgDoc(w, h, 'One cycle of a sinusoidal current i against time t, with its peak I nought, its rms value I nought over root 2 (about 0.707 of the peak) and its half-cycle mean value 2 I nought over pi (about 0.637 of the peak) marked by horizontal lines; the shaded area under the first half cycle equals the mean times half the period', s);
})();

// ---------------------------------------------------------------- 2. rotating phasors and their projections (phase difference)
export const PHASE_DATA = { wtDeg: 60, phiDeg: 40, V0: 70, I0: 46 };
export const PHASOR_WAVE = (() => {
  const { wtDeg, phiDeg, V0, I0 } = PHASE_DATA;
  const w = 430;
  const h = 232;
  const C = [95, 118];
  const tip = (len, a) => [C[0] + len * Math.cos(a * DEG), C[1] - len * Math.sin(a * DEG)];
  const tV = tip(V0, wtDeg);
  const tI = tip(I0, wtDeg - phiDeg);
  let s = '';
  s += S.line(C[0] - 82, C[1], C[0] + 82, C[1], { c: MUT, w: 1 }) + S.line(C[0], C[1] + 82, C[0], C[1] - 82, { c: MUT, w: 1 });
  s += S.circle(C[0], C[1], V0, { c: MUT, sw: 1, dash: '3 3' });
  s += S.arrow(C[0], C[1], tV[0], tV[1], { c: POS, w: 2.4 }) + S.text(tV[0] + 4, tV[1] - 6, 'V₀', { w: 'bold', c: POS });
  s += S.arrow(C[0], C[1], tI[0], tI[1], { c: NEG, w: 2.4 }) + S.text(tI[0] + 6, tI[1] + 12, 'I₀', { w: 'bold', c: NEG });
  const arc = (r, a0, a1) => `M${f1(C[0] + r * Math.cos(a0 * DEG))} ${f1(C[1] - r * Math.sin(a0 * DEG))} A${r} ${r} 0 0 0 ${f1(C[0] + r * Math.cos(a1 * DEG))} ${f1(C[1] - r * Math.sin(a1 * DEG))}`;
  s += S.path(arc(18, 0, wtDeg), { w: 1 }) + S.text(C[0] + 16, C[1] + 15, 'ωt', { it: true, size: 11 });
  s += S.path(arc(34, wtDeg - phiDeg, wtDeg), { c: NEG, w: 1 }) + S.text(C[0] + 44 * Math.cos((wtDeg - phiDeg / 2) * DEG) - 3, C[1] - 44 * Math.sin((wtDeg - phiDeg / 2) * DEG) + 4, 'φ', { it: true, size: 12, c: NEG });
  // rotation sense: anticlockwise arc beyond the circle
  const a0 = 105;
  const a1 = 140;
  s += S.path(arc(80, a0, a1), { c: ACC, w: 1.6 });
  const end = [C[0] + 80 * Math.cos(a1 * DEG), C[1] - 80 * Math.sin(a1 * DEG)];
  s += S.head(end[0], end[1], Math.atan2(-Math.cos(a1 * DEG), -Math.sin(a1 * DEG)), { c: ACC, size: 8 }) + S.text(C[0] - 52, C[1] - 74, 'ω', { it: true, c: ACC });
  // waveforms against ωt (0 to 360°) on the right
  const gx0 = 205;
  const gw = 215;
  const GX = (a) => gx0 + (gw * a) / 360;
  const v = (a) => V0 * Math.sin(a * DEG);
  const i = (a) => I0 * Math.sin((a - phiDeg) * DEG);
  const wave = (fn) => pathOf(Array.from({ length: 121 }, (_, k) => [GX(3 * k), C[1] - fn(3 * k)]));
  s += S.arrow(gx0 - 4, C[1], 426, C[1], { w: 1.1, size: 6 }) + S.text(424, C[1] + 16, 'ωt', { a: 'end', it: true, size: 11 });
  s += S.path(wave(v), { c: POS, w: 2 }) + S.path(wave(i), { c: NEG, w: 2 });
  const xm = GX(wtDeg);
  s += S.line(xm, C[1] - 80, xm, C[1] + 80, { c: MUT, w: 1, dash: '3 3' });
  s += S.line(tV[0], tV[1], xm, C[1] - v(wtDeg), { c: POS, w: 1, dash: '2 3' }) + S.line(tI[0], tI[1], xm, C[1] - i(wtDeg), { c: NEG, w: 1, dash: '2 3' });
  s += S.circle(xm, C[1] - v(wtDeg), 3, { c: POS, fill: POS }) + S.circle(xm, C[1] - i(wtDeg), 3, { c: NEG, fill: NEG });
  s += S.text(gx0, 212, 'v = V₀ sin ωt', { size: 11, c: POS }) + S.text(gx0, 227, 'i = I₀ sin(ωt − φ): lags by φ', { size: 11, c: NEG });
  s += S.text(C[0], 224, 'phasors turn anticlockwise', { a: 'middle', size: 10 });
  check(close(tV[1], C[1] - v(wtDeg)) && close(tI[1], C[1] - i(wtDeg)), 'phasors: the vertical projection of each rotating phasor equals the value of its waveform at the marked instant');
  const lag = screenAngle(C, tV) - screenAngle(C, tI);
  check(close(lag, phiDeg, 1e-6), `phasors: the current phasor is drawn ${lag.toFixed(1)}° clockwise of (behind) the voltage phasor, so i lags v by φ`);
  return svgDoc(w, h, 'Left: voltage and current phasors of lengths V nought and I nought rotating anticlockwise with angular speed omega; the current phasor is an angle phi behind the voltage phasor. Right: the waveforms v equals V nought sine omega t and i equals I nought sine of omega t minus phi; at the marked instant each waveform value equals the vertical projection of its phasor', s);
})();

// ---------------------------------------------------------------- 3. R, L and C alone: phasor diagrams
export const ELEMENTS = (() => {
  const w = 430;
  const h = 214;
  let s = '';
  const got = [];
  const panel = (ox, kind) => {
    const O = [ox + 32, 118];
    let t = S.text(ox + 72, 16, { R: 'Resistor', L: 'Inductor', C: 'Capacitor' }[kind], { a: 'middle', size: 11, w: 'bold' });
    t += W(ox + 18, 40, ox + 50, 40) + W(ox + 94, 40, ox + 126, 40);
    if (kind === 'R') t += resH(ox + 50, ox + 94, 40, '');
    if (kind === 'L') t += coilH(ox + 50, ox + 94, 40, '', { n: 4 });
    if (kind === 'C') t += W(ox + 50, 40, ox + 68, 40) + capH(ox + 72, 40, '') + W(ox + 76, 40, ox + 94, 40);
    t += S.line(ox + 10, O[1], ox + 136, O[1], { c: MUT, w: 1, dash: '3 3' });
    t += S.arrow(O[0], O[1], O[0] + 90, O[1], { c: POS, w: 3 }) + S.text(O[0] + 86, O[1] + 16, 'V', { w: 'bold', c: POS });
    const ang = { R: 0, L: -90, C: 90 }[kind];
    const L = 48;
    const tipI = [O[0] + L * Math.cos(ang * DEG), O[1] - L * Math.sin(ang * DEG)];
    t += S.arrow(O[0], O[1], tipI[0], tipI[1], { c: NEG, w: 2 }) + S.text(tipI[0] + 8, tipI[1] + (ang === 0 ? -8 : ang > 0 ? 8 : 0), 'I', { w: 'bold', c: NEG });
    got.push(Math.round(screenAngle(O, tipI) - screenAngle(O, [O[0] + 90, O[1]])));
    t += S.text(ox + 72, 192, { R: 'i in phase with v', L: 'i lags v by 90°', C: 'i leads v by 90°' }[kind], { a: 'middle', size: 10 });
    t += S.text(ox + 72, 207, { R: 'opposition R', L: 'X_L = ωL', C: 'X_C = 1/ωC' }[kind], { a: 'middle', size: 11, w: 'bold' });
    return t;
  };
  s += panel(0, 'R') + panel(143, 'L') + panel(286, 'C');
  check(got.join(',') === '0,-90,90', `elements: current phasor drawn at ${got.join('°, ')}° to the voltage phasor for R, L and C (in phase, lagging, leading; phasors turn anticlockwise)`);
  return svgDoc(w, h, 'Phasor diagrams for a resistor, an inductor and a capacitor, each alone on an AC supply: for the resistor the current phasor lies along the voltage phasor; for the inductor it is 90 degrees behind (the current lags); for the capacitor it is 90 degrees ahead (the current leads). The oppositions are R, X L equals omega L and X C equals 1 over omega C', s);
})();

// ---------------------------------------------------------------- 4–6. worked example 3: series LCR circuit, phasors, impedance triangle
export const LCR_DATA = (() => {
  const R = 48;
  const XL = 70;
  const XC = 50;
  const V = 130;
  const Z = Math.hypot(R, XL - XC);
  const I = V / Z;
  return { R, XL, XC, V, Z, I, VR: I * R, VL: I * XL, VC: I * XC, phi: Math.atan2(XL - XC, R) / DEG };
})();
export const LCR_CIRCUIT = (() => {
  const { R, XL, XC, V, I, VR, VL, VC } = LCR_DATA;
  const w = 420;
  const h = 212;
  let s = '';
  s += W(40, 64, 70, 64) + resH(70, 150, 64, `R = ${R} Ω`, { ly: 26 }) + W(150, 64, 180, 64) + coilH(180, 260, 64, `X_L = ${XL} Ω`, { ly: 26 }) + W(260, 64, 306, 64) + capH(310, 64, `X_C = ${XC} Ω`, { ly: 30 }) + W(314, 64, 380, 64);
  s += W(380, 64, 380, 170) + W(40, 64, 40, 170) + W(40, 170, 197, 170) + W(223, 170, 380, 170) + source(210, 170);
  s += S.text(210, 200, `${V} V rms supply`, { a: 'middle', size: 11 });
  s += S.head(60, 64, 0, { c: ACC, size: 8 }) + S.text(56, 52, `I = ${I.toFixed(1)} A`, { a: 'middle', size: 11, c: ACC });
  s += S.text(110, 34, `V_R = ${VR.toFixed(0)} V`, { a: 'middle', size: 11, w: 'bold' }) + S.text(220, 34, `V_L = ${VL.toFixed(0)} V`, { a: 'middle', size: 11, w: 'bold' }) + S.text(320, 34, `V_C = ${VC.toFixed(0)} V`, { a: 'middle', size: 11, w: 'bold' });
  s += S.text(210, 126, `arithmetic sum ${(VR + VL + VC).toFixed(0)} V ≠ ${V} V`, { a: 'middle', size: 11 }) + S.text(210, 142, 'the voltages add as phasors', { a: 'middle', size: 11 });
  check(close(Math.hypot(VR, VL - VC), V) && close(I, 2.5) && VR + VL + VC > V, `LCR circuit: V_R = ${VR}, V_L = ${VL}, V_C = ${VC} V add as phasors to ${V} V (not to ${VR + VL + VC} V); I = V/Z = ${I} A`);
  return svgDoc(w, h, 'A series LCR circuit on a 130 volt rms supply: a 48 ohm resistor, an inductor of reactance 70 ohms and a capacitor of reactance 50 ohms carry the same current of 2.5 amperes; the voltages across them, 120, 175 and 125 volts, add up to more than 130 volts because they must be added as phasors', s);
})();
export const LCR_PHASOR = (() => {
  const { VR, VL, VC, V, phi } = LCR_DATA;
  const w = 380;
  const h = 300;
  const k = 0.8;
  const O = [110, 170];
  let s = '';
  s += S.arrow(O[0], O[1], O[0] + VR * k, O[1], { c: POS, w: 2.4 }) + S.text(O[0] + VR * k, O[1] + 18, `V_R = ${VR.toFixed(0)} V`, { a: 'middle', size: 11 });
  s += S.arrow(O[0], O[1], O[0], O[1] - VL * k, { c: GRN, w: 2.4 }) + S.text(O[0] - 6, O[1] - VL * k + 10, `V_L = ${VL.toFixed(0)} V`, { a: 'end', size: 11 });
  s += S.arrow(O[0], O[1], O[0], O[1] + VC * k, { c: NEG, w: 2.4 }) + S.text(O[0] - 6, O[1] + VC * k - 4, `V_C = ${VC.toFixed(0)} V`, { a: 'end', size: 11 });
  const tipV = [O[0] + VR * k, O[1] - (VL - VC) * k];
  s += S.line(O[0] + VR * k, O[1], tipV[0], tipV[1], { c: MUT, w: 1.2, dash: '4 3' }) + S.text(tipV[0] + 6, (O[1] + tipV[1]) / 2 + 6, `V_L − V_C = ${(VL - VC).toFixed(0)} V`, { size: 10 });
  s += S.arrow(O[0], O[1], tipV[0], tipV[1], { c: ACC, w: 3 }) + S.text(tipV[0] + 6, tipV[1] - 8, `V = ${V} V`, { size: 11, w: 'bold' });
  s += S.path(`M${O[0] + 40} ${O[1]} A40 40 0 0 0 ${f1(O[0] + 40 * Math.cos(phi * DEG))} ${f1(O[1] - 40 * Math.sin(phi * DEG))}`, { w: 1 }) + S.text(O[0] + 46, O[1] - 6, 'φ', { it: true });
  s += S.text(O[0] + 10, O[1] + 36, 'I along V_R (reference)', { size: 10 });
  const drawn = screenAngle(O, tipV);
  check(close(drawn, phi, 1e-6), `LCR phasor: V drawn at ${drawn.toFixed(2)}° ahead of I, equal to tan⁻¹((X_L − X_C)/R) = ${phi.toFixed(2)}°`);
  check(close(Math.hypot(tipV[0] - O[0], tipV[1] - O[1]) / k, V, 1e-9), `LCR phasor: the resultant is drawn ${V} V long to the same scale as V_R, V_L and V_C`);
  return svgDoc(w, h, 'Phasor diagram of worked example 3, drawn to scale with the current as reference: V R of 120 volts along the current, V L of 175 volts upwards and V C of 125 volts downwards; their resultant, 130 volts, leads the current by about 22.6 degrees', s);
})();
export const IMP_TRIANGLE = (() => {
  const { R, XL, XC, Z, phi } = LCR_DATA;
  const w = 380;
  const h = 200;
  const k = 4;
  const O = [40, 165];
  const A = [O[0] + R * k, O[1]];
  const B = [A[0], O[1] - (XL - XC) * k];
  let s = S.path(`M${O[0]} ${O[1]} L${A[0]} ${A[1]} L${B[0]} ${B[1]} Z`, { c: ACC, w: 2, fill: FILL, fop: 0.5 });
  s += S.rect(A[0] - 10, A[1] - 10, 10, 10, { sw: 1 });
  s += S.text((O[0] + A[0]) / 2, O[1] + 18, `R = ${R} Ω`, { a: 'middle', size: 11 });
  s += S.text(A[0] + 8, (A[1] + B[1]) / 2 + 4, `X_L − X_C = ${XL - XC} Ω`, { size: 11 });
  s += S.text((O[0] + B[0]) / 2 - 6, (O[1] + B[1]) / 2 - 12, `Z = ${Z} Ω`, { a: 'end', size: 11, w: 'bold' });
  s += S.path(`M${O[0] + 36} ${O[1]} A36 36 0 0 0 ${f1(O[0] + 36 * Math.cos(phi * DEG))} ${f1(O[1] - 36 * Math.sin(phi * DEG))}`, { w: 1 }) + S.text(O[0] + 42, O[1] - 5, 'φ', { it: true });
  s += S.text(20, 24, 'Z = √(R² + (X_L − X_C)²)', { size: 11, w: 'bold' }) + S.text(20, 41, 'tan φ = (X_L − X_C)/R,  cos φ = R/Z', { size: 11 });
  check(close(Math.hypot(B[0] - O[0], B[1] - O[1]) / k, Z, 1e-9) && Z === 52, `impedance triangle: hypotenuse drawn ${Z} Ω to scale`);
  check(close(screenAngle(O, B), phi, 1e-6) && close(Math.cos(phi * DEG), R / Z, 1e-12), `impedance triangle: angle at the base ${phi.toFixed(2)}°, with cos φ = R/Z = ${(R / Z).toFixed(3)}`);
  return svgDoc(w, h, 'Impedance triangle of worked example 3: resistance 48 ohms along the base, net reactance 20 ohms upright, impedance 52 ohms along the hypotenuse, and the phase angle phi at the base, with tan phi equal to net reactance over R and cos phi equal to R over Z', s);
})();

// ---------------------------------------------------------------- 7. active and wattless components (worked example 4)
export const WATT_DATA = (() => {
  const V = 230;
  const I = 4;
  const pf = 0.8;
  const phi = Math.acos(pf) / DEG;
  return { V, I, pf, phi, active: I * pf, wattless: I * Math.sin(Math.acos(pf)), P: V * I * pf };
})();
export const WATTLESS = (() => {
  const { I, phi, active, wattless, P } = WATT_DATA;
  const w = 400;
  const h = 214;
  const O = [50, 80];
  const k = 30; // px per ampere
  const tipI = [O[0] + I * k * Math.cos(phi * DEG), O[1] + I * k * Math.sin(phi * DEG)];
  let s = '';
  s += S.arrow(O[0], O[1], 300, O[1], { c: POS, w: 2 }) + S.text(306, O[1] + 4, 'V', { w: 'bold', c: POS });
  s += S.arrow(O[0], O[1], O[0] + active * k, O[1], { c: GRN, w: 3.4 });
  s += S.arrow(O[0], O[1], O[0], O[1] + wattless * k, { c: ACC, w: 2.6 });
  s += S.line(O[0] + active * k, O[1], tipI[0], tipI[1], { c: MUT, w: 1, dash: '3 3' }) + S.line(O[0], O[1] + wattless * k, tipI[0], tipI[1], { c: MUT, w: 1, dash: '3 3' });
  s += S.arrow(O[0], O[1], tipI[0], tipI[1], { c: NEG, w: 2.4 }) + S.text(tipI[0] + 8, tipI[1] + 4, `I = ${I.toFixed(1)} A`, { size: 11, w: 'bold', c: NEG });
  s += S.path(`M${O[0] + 34} ${O[1]} A34 34 0 0 1 ${f1(O[0] + 34 * Math.cos(phi * DEG))} ${f1(O[1] + 34 * Math.sin(phi * DEG))}`, { w: 1 }) + S.text(O[0] + 40, O[1] + 20, 'φ', { it: true });
  s += S.text(O[0] + 4, O[1] - 10, `I cos φ = ${active.toFixed(1)} A: active`, { size: 11, c: GRN });
  s += S.text(20, O[1] + wattless * k + 20, `I sin φ = ${wattless.toFixed(1)} A: wattless`, { size: 11, c: ACC });
  s += S.text(390, 150, `P = VI cos φ = ${P.toFixed(0)} W`, { a: 'end', size: 12, w: 'bold' }) + S.text(390, 168, 'the wattless part does no', { a: 'end', size: 11 }) + S.text(390, 183, 'work over a cycle', { a: 'end', size: 11 });
  const comps = [(tipI[0] - O[0]) / k, (tipI[1] - O[1]) / k];
  check(close(comps[0], active, 1e-9) && close(comps[1], wattless, 1e-9) && close(Math.hypot(active, wattless), I, 1e-12), `wattless: I = ${I} A resolved into ${active.toFixed(2)} A along V and ${wattless.toFixed(2)} A at right angles to it (lagging, drawn below V)`);
  check(close(P, 736, 1e-9), 'wattless: P = V × (I cos φ) = 230 × 3.2 = 736 W');
  return svgDoc(w, h, 'Phasor diagram of a lagging current of 4.0 amperes at angle phi behind the voltage, resolved into an active component I cos phi of 3.2 amperes along the voltage and a wattless component I sin phi of 2.4 amperes at right angles to it; only the active part carries the power, 736 watts at 230 volts', s);
})();

// ---------------------------------------------------------------- 8. a lamp run through a resistor and through a choke (worked example 5)
export const CHOKE_DATA = (() => {
  const Vs = 230;
  const Vl = 100;
  const I = 4;
  const f = 50;
  const Rl = Vl / I;
  const Rs = (Vs - Vl) / I;
  const Z = Vs / I;
  const XL = Math.sqrt(Z * Z - Rl * Rl);
  return { Vs, Vl, I, f, Rl, Rs, wasted: I * I * Rs, Z, XL, L: XL / (2 * Math.PI * f), VL: I * XL };
})();
export const CHOKE = (() => {
  const { Rs, wasted, L, VL, Vs, Vl } = CHOKE_DATA;
  const w = 440;
  const h = 222;
  let s = '';
  const panel = (ox, kind) => {
    let t = S.text(ox + 105, 18, kind === 'R' ? '(a) series resistor' : '(b) series choke', { a: 'middle', size: 12, w: 'bold' });
    t += W(ox + 20, 60, ox + 50, 60) + lamp(ox + 60, 60) + W(ox + 70, 60, ox + 112, 60);
    t += kind === 'R' ? resH(ox + 112, ox + 172, 60, '') : coilH(ox + 112, ox + 172, 60, '', { n: 4, core: true });
    t += W(ox + 172, 60, ox + 195, 60) + W(ox + 195, 60, ox + 195, 140) + W(ox + 20, 60, ox + 20, 140) + W(ox + 20, 140, ox + 94, 140) + W(ox + 120, 140, ox + 195, 140) + source(ox + 107, 140);
    t += S.text(ox + 60, 88, 'lamp', { a: 'middle', size: 10 });
    t += S.text(ox + 105, 176, kind === 'R' ? `R = ${Rs} Ω` : `L ≈ ${L.toFixed(3)} H`, { a: 'middle', size: 11 });
    t += S.text(ox + 105, 193, kind === 'R' ? `wastes ${wasted.toFixed(0)} W as heat` : 'wastes almost nothing', { a: 'middle', size: 11, w: 'bold', c: kind === 'R' ? POS : GRN });
    return t;
  };
  s += panel(0, 'R') + panel(225, 'L');
  s += S.text(220, 216, `lamp ${Vl} V, 4.0 A in both; mains ${Vs} V, 50 Hz`, { a: 'middle', size: 11 });
  check(close(Rs, 32.5) && close(wasted, 520), 'choke: the series resistor needs 130 V/4.0 A = 32.5 Ω and turns 520 W into heat');
  check(close(Math.hypot(Vl, VL), Vs, 1e-9) && close(L, 0.16482, 1e-4), `choke: lamp voltage ${Vl} V and choke voltage ${VL.toFixed(1)} V add as phasors (at right angles) to ${Vs} V; L = ${L.toFixed(4)} H`);
  return svgDoc(w, h, 'Two ways of running a 100 volt, 4 ampere lamp from 230 volt, 50 hertz mains: in series with a 32.5 ohm resistor, which wastes 520 watts as heat, or in series with a choke of about 0.165 henry on an iron core, which wastes almost nothing', s);
})();

// ---------------------------------------------------------------- 9. LC oscillations: the four quarter-cycle states
export const LC_OSC = (() => {
  const w = 420;
  const h = 336;
  let s = '';
  const q = (t) => Math.cos(2 * Math.PI * t); // charge on the top plate (units of q0)
  const iRight = (t) => Math.sin(2 * Math.PI * t); // current along the top wire, rightwards (units of q0 ω)
  let ok = 0;
  const titles = ['t = 0', 't = T/4', 't = T/2', 't = 3T/4'];
  [0, 1, 2, 3].forEach((k) => {
    const t = k / 4;
    const ox = (k % 2) * 212;
    const oy = Math.floor(k / 2) * 158;
    const qt = Math.round(q(t) * 1e9) / 1e9;
    const it = Math.round(iRight(t) * 1e9) / 1e9;
    let p = S.rect(ox + 4, oy + 4, 200, 146, { c: MUT, sw: 1, rx: 6 });
    p += S.text(ox + 104, oy + 20, titles[k], { a: 'middle', size: 12, w: 'bold' });
    const xc = ox + 50;
    const xl = ox + 158;
    p += W(xc, oy + 42, xl, oy + 42) + W(xc, oy + 122, xl, oy + 122);
    p += W(xc, oy + 42, xc, oy + 76) + S.line(xc - 16, oy + 76, xc + 16, oy + 76, { w: 2.4 }) + S.line(xc - 16, oy + 86, xc + 16, oy + 86, { w: 2.4 }) + W(xc, oy + 86, xc, oy + 122);
    // vertical coil on the right: humps to the right
    const n = 4;
    const r = 7;
    let d = `M${xl} ${oy + 42} L${xl} ${oy + 54}`;
    for (let j = 0; j < n; j++) d += ` A${r} ${r} 0 0 1 ${xl} ${oy + 54 + 2 * r * (j + 1)}`;
    d += ` L${xl} ${oy + 122}`;
    p += S.path(d, { w: 1.6 });
    p += S.text(xc - 24, oy + 85, 'C', { a: 'end', size: 11, it: true }) + S.text(xl + 18, oy + 86, 'L', { size: 11, it: true });
    if (qt !== 0) {
      const top = qt > 0 ? '+' : '−';
      const bot = qt > 0 ? '−' : '+';
      p += S.text(xc + 22, oy + 72, `${top}q₀`, { size: 11, w: 'bold', c: qt > 0 ? POS : NEG }) + S.text(xc + 22, oy + 98, `${bot}q₀`, { size: 11, w: 'bold', c: qt > 0 ? NEG : POS });
      p += S.text(ox + 104, oy + 140, 'energy all electric, in C', { a: 'middle', size: 10 });
    }
    if (it !== 0) {
      const ang = it > 0 ? 0 : Math.PI;
      p += S.head(ox + 104 + 6 * Math.cos(ang), oy + 42, ang, { c: ACC, size: 9 }) + S.text(ox + 104, oy + 36, 'i greatest', { a: 'middle', size: 10, c: ACC });
      p += S.text(ox + 104, oy + 140, 'energy all magnetic, in L', { a: 'middle', size: 10 });
    }
    // the current leaving the top plate along the top wire is −dq/dt
    const dt = 1e-6;
    const outflow = -(q(t + dt) - q(t - dt)) / (2 * dt) / (2 * Math.PI);
    if (close(outflow, it, 1e-6) && close(qt * qt + it * it, 1, 1e-9)) ok++;
    s += p;
  });
  s += S.text(210, 330, 'charge and current swap every quarter period; resistance makes them die away', { a: 'middle', size: 10 });
  check(ok === 4, `LC: in all ${ok} drawn states the top-wire current equals the rate at which the top plate loses charge, and q² + i² stays constant (energy only changes form)`);
  return svgDoc(w, h, 'Four snapshots of an LC circuit a quarter period apart: at t equals 0 the capacitor is fully charged, top plate positive, no current, all the energy electric; at a quarter period the capacitor is uncharged and the current, flowing clockwise, is greatest, all the energy magnetic; at half a period the capacitor is charged the other way; at three quarters of a period the current is greatest in the opposite direction', s);
})();

// ---------------------------------------------------------------- 10. AC generator: construction (adapted from the CBSE drawing)
export const GENERATOR = (() => {
  const w = 420;
  const h = 250;
  let s = '';
  s += S.path('M20 40 L80 40 L80 70 Q60 105 80 140 L80 170 L20 170 Z', { c: POS, sw: 1.5, fill: POS, fop: 0.2 }) + S.text(45, 110, 'N', { a: 'middle', w: 'bold', size: 16 });
  s += S.path('M400 40 L340 40 L340 70 Q360 105 340 140 L340 170 L400 170 Z', { c: NEG, sw: 1.5, fill: NEG, fop: 0.2 }) + S.text(375, 110, 'S', { a: 'middle', w: 'bold', size: 16 });
  const fieldYs = [78, 105, 132];
  for (const y of fieldYs) s += S.arrow(88, y, 332, y, { c: MUT, w: 1, size: 6 });
  s += S.text(326, 70, 'B', { a: 'end', w: 'bold', it: true });
  // coil in perspective, turning about a vertical axis
  const coil = [[180, 60], [240, 50], [240, 150], [180, 160]];
  s += S.path(`M${coil.map(([x, y]) => `${x} ${y}`).join(' L')} Z`, { c: 'currentColor', w: 2.6 });
  s += S.line(210, 30, 210, 196, { c: MUT, w: 1, dash: '5 4' }) + S.path('M192 36 A18 6 0 0 0 228 36', { c: ACC, w: 1.4 }) + S.head(228, 36, -0.3, { c: ACC, size: 7 }) + S.text(234, 32, 'ω', { it: true, c: ACC });
  s += S.text(246, 46, 'armature coil', { size: 11 });
  s += S.ellipse(210, 182, 16, 4, { sw: 1.5 }) + S.ellipse(210, 194, 16, 4, { sw: 1.5 });
  s += S.line(180, 160, 196, 180, { w: 1.2 }) + S.line(240, 150, 224, 192, { w: 1.2 });
  s += S.rect(184, 176, 10, 9, { sw: 1, fill: MUT }) + S.rect(226, 188, 10, 9, { sw: 1, fill: MUT });
  s += W(184, 180, 120, 180) + W(120, 180, 120, 226) + W(120, 226, 160, 226) + resH(160, 260, 226, '') + W(260, 226, 300, 226) + W(300, 226, 300, 192) + W(300, 192, 236, 192);
  s += S.text(126, 172, 'brushes', { size: 10 }) + S.text(250, 184, 'slip rings', { size: 10 }) + S.text(210, 246, 'external load', { a: 'middle', size: 10 });
  s += S.text(410, 20, 'e = NBAω sin ωt', { a: 'end', size: 12, w: 'bold' });
  // axis vertical, field horizontal; the coil's long sides are parallel to the axis
  const axis = [0, 1];
  const field = [1, 0];
  check(axis[0] * field[0] + axis[1] * field[1] === 0 && coil[1][0] === coil[2][0], 'generator: the rotation axis (vertical) is perpendicular to B (horizontal), so the flux through the turning coil changes; the long sides of the coil lie along the axis');
  return svgDoc(w, h, 'AC generator: a rectangular armature coil turns with angular speed omega about a vertical axis in the uniform horizontal field between the north and south poles of a field magnet; its ends go to two slip rings on the axle, and carbon brushes pressing on the rings take the alternating emf N B A omega sine omega t to an external load', s);
})();

// ---------------------------------------------------------------- 11. AC generator: end-on view for the theory
export const GEN_DATA = { thetaDeg: 50 };
export const GEN_THEORY = (() => {
  const w = 410;
  const h = 240;
  const C = [122, 122];
  const Rr = 72;
  const th = GEN_DATA.thetaDeg;
  let s = '';
  for (let y = 30; y <= 214; y += 46) s += S.arrow(14, y, 236, y, { c: MUT, w: 1, size: 6 });
  s += S.text(232, 22, 'B', { a: 'end', w: 'bold', it: true });
  // maths coordinates (x right, y up, z out of the page): coil line at α = θ − 90°, normal n at θ from B (along x)
  const al = th - 90;
  const side = (a) => [Math.cos(a * DEG), Math.sin(a * DEG)];
  const scr = ([x, y], r = Rr) => [C[0] + r * x, C[1] - r * y];
  const s1 = side(al);
  const s2 = side(al + 180);
  const p1 = scr(s1);
  const p2 = scr(s2);
  s += S.line(p1[0], p1[1], p2[0], p2[1], { c: ACC, w: 4 });
  s += S.line(C[0], C[1], C[0] + 100, C[1], { c: MUT, w: 1, dash: '4 3' });
  const nT = scr(side(th), 62);
  s += S.arrow(C[0], C[1], nT[0], nT[1], { c: GRN, w: 2.2 }) + S.text(nT[0] + 4, nT[1] - 4, 'n', { it: true, w: 'bold', c: GRN });
  s += S.path(`M${C[0] + 30} ${C[1]} A30 30 0 0 0 ${f1(C[0] + 30 * Math.cos(th * DEG))} ${f1(C[1] - 30 * Math.sin(th * DEG))}`, { w: 1 }) + S.text(C[0] + 36, C[1] - 12, 'θ = ωt', { it: true, size: 11 });
  // emf direction in each side from v × B, with v = ω ẑ × r (anticlockwise rotation)
  const emfZ = ([x, y]) => {
    const v = [-y, x]; // v = ω ẑ × r, per unit ωr
    return -v[1]; // (v × x̂)_z = v_x·0 − v_y·1
  };
  const z1 = emfZ(s1);
  const z2 = emfZ(s2);
  s += dirSym(p1[0], p1[1], z1 > 0, { c: z1 > 0 ? POS : NEG, r: 8 }) + dirSym(p2[0], p2[1], z2 > 0, { c: z2 > 0 ? POS : NEG, r: 8 });
  // rotation sense
  const a0 = 200;
  const a1 = 240;
  const R2 = 96;
  s += S.path(`M${f1(C[0] + R2 * Math.cos(a0 * DEG))} ${f1(C[1] - R2 * Math.sin(a0 * DEG))} A${R2} ${R2} 0 0 0 ${f1(C[0] + R2 * Math.cos(a1 * DEG))} ${f1(C[1] - R2 * Math.sin(a1 * DEG))}`, { c: ACC, w: 1.6 });
  const e = [C[0] + R2 * Math.cos(a1 * DEG), C[1] - R2 * Math.sin(a1 * DEG)];
  s += S.head(e[0], e[1], Math.atan2(-Math.cos(a1 * DEG), -Math.sin(a1 * DEG)), { c: ACC, size: 8 }) + S.text(C[0] - 92, C[1] + 66, 'ω', { it: true, c: ACC });
  const lines = [
    ['coil seen edge-on', 'bold'],
    ['Φ = NBA cos ωt', ''],
    ['e = −dΦ/dt = NBAω sin ωt', ''],
    ['e = 0 when the plane ⟂ B', ''],
    ['e = e₀ = NBAω when', ''],
    ['the plane is along B', ''],
  ];
  lines.forEach(([t, wgt], i) => (s += S.text(250, 52 + i * 19, t, { size: 11, w: wgt || undefined })));
  s += S.text(250, 190, '⊙ out of, ⊗ into the page', { size: 10 });
  // checks: induced emf of the two sides opposite (they add round the loop); its size ∝ sin θ; flux ∝ cos θ
  const emfSize = Math.abs(z1) + Math.abs(z2);
  check(z1 * z2 < 0 && close(emfSize, 2 * Math.sin(th * DEG), 1e-12), `generator theory: the two sides carry opposite emfs (v × B), which add round the coil to 2 sin θ = ${emfSize.toFixed(3)} (units of BLωr): e ∝ sin ωt`);
  const nUnit = side(th);
  check(close(nUnit[0], Math.cos(th * DEG)) && close(s1[0] * nUnit[0] + s1[1] * nUnit[1], 0, 1e-12), `generator theory: the normal is drawn perpendicular to the coil at θ = ${th}° to B, so Φ = NBA cos θ`);
  return svgDoc(w, h, 'End-on view of a generator coil turning anticlockwise in a uniform field B pointing right: its normal n makes angle theta equal to omega t with B, so the flux is N B A cos omega t; the two sides of the coil, moving across the field, carry induced emfs in opposite directions (out of and into the page) that add round the coil to give N B A omega sine omega t', s);
})();

export const ALL = { WAVE, PHASOR_WAVE, ELEMENTS, LCR_CIRCUIT, LCR_PHASOR, IMP_TRIANGLE, WATTLESS, CHOKE, LC_OSC, GENERATOR, GEN_THEORY };
