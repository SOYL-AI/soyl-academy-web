// ch07 diagrams: phasor diagrams drawn to scale from computed reactances (angles checked against atan((XL − XC)/R)),
// the impedance triangle, an AC generator and a transformer (SELF_CHECKS, read by build.mjs).
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

// ---------------------------------------------------------------- single-element phasor diagrams
export const PHASORS3 = (() => {
  const w = 420;
  const h = 190;
  let s = '';
  const panel = (ox, title, iAng, label) => {
    const O = [ox + 20, 120];
    let t = S.text(ox + 65, 20, title, { a: 'middle', size: 11, w: 'bold' });
    t += S.line(ox + 10, 120, ox + 130, 120, { c: MUT, w: 1, dash: '3 3' });
    t += S.arrow(O[0], O[1], O[0] + 100, O[1], { c: POS, w: 2.4 }) + S.text(O[0] + 96, O[1] + 16, 'V', { w: 'bold' });
    const L = 60;
    const ex = O[0] + L * Math.cos(-iAng);
    const ey = O[1] + L * Math.sin(-iAng);
    t += S.arrow(O[0], O[1], ex, ey, { c: NEG, w: 2.4 }) + S.text(ex + 8, ey + (iAng === 0 ? 20 : 4), 'I', { w: 'bold' });
    t += S.text(ox + 65, 178, label, { a: 'middle', size: 10 });
    return t;
  };
  s += panel(0, 'Resistor', 0, 'I in phase with V');
  s += panel(140, 'Inductor', -Math.PI / 2, 'I lags V by 90°');
  s += panel(280, 'Capacitor', Math.PI / 2, 'I leads V by 90°');
  // anticlockwise rotation on screen = leading; screen y is down, so "up" is a leading angle
  check(Math.sin(Math.PI / 2) > 0, 'phasors: capacitor current drawn ahead (anticlockwise, upwards) of V; inductor current behind (downwards)');
  return svgDoc(w, h, 'Phasor diagrams: for a resistor the current phasor lies along the voltage phasor; for an inductor the current lags the voltage by 90 degrees; for a capacitor the current leads the voltage by 90 degrees. Phasors rotate anticlockwise', s);
})();

// ---------------------------------------------------------------- series LCR phasor diagram (worked example: R = 30, XL = 80, XC = 40 Ω, I = 4.4 A)
export const LCR_DATA = (() => {
  const R = 30;
  const XL = 80;
  const XC = 40;
  const I = 4.4;
  const Z = Math.hypot(R, XL - XC);
  return { R, XL, XC, I, Z, VR: I * R, VL: I * XL, VC: I * XC, V: I * Z, phi: (Math.atan2(XL - XC, R) * 180) / Math.PI };
})();
export const LCR_PHASOR = (() => {
  const { VR, VL, VC, phi } = LCR_DATA;
  const w = 360;
  const h = 330;
  const k = 0.4; // px per volt
  const O = [120, 180];
  let s = '';
  s += S.arrow(O[0], O[1], O[0] + VR * k, O[1], { c: POS, w: 2.4 }) + S.text(O[0] + VR * k - 10, O[1] + 18, `VR = ${VR.toFixed(0)} V`, { size: 11 });
  s += S.arrow(O[0], O[1], O[0], O[1] - VL * k, { c: GRN, w: 2.4 }) + S.text(O[0] - 6, O[1] - VL * k + 10, `VL = ${VL.toFixed(0)} V`, { a: 'end', size: 11 });
  s += S.arrow(O[0], O[1], O[0], O[1] + VC * k, { c: NEG, w: 2.4 }) + S.text(O[0] - 6, O[1] + VC * k - 4, `VC = ${VC.toFixed(0)} V`, { a: 'end', size: 11 });
  const tip = [O[0] + VR * k, O[1] - (VL - VC) * k];
  s += S.line(O[0] + VR * k, O[1], tip[0], tip[1], { c: MUT, w: 1, dash: '4 3' }) + S.text(tip[0] + 6, (O[1] + tip[1]) / 2, `VL − VC = ${(VL - VC).toFixed(0)} V`, { size: 10 });
  s += S.arrow(O[0], O[1], tip[0], tip[1], { c: ACC, w: 3 }) + S.text(tip[0] + 6, tip[1] - 8, `V = ${(LCR_DATA.V).toFixed(0)} V`, { size: 11, w: 'bold' });
  s += S.path(`M${O[0] + 40} ${O[1]} A40 40 0 0 0 ${f1(O[0] + 40 * Math.cos((phi * Math.PI) / 180))} ${f1(O[1] - 40 * Math.sin((phi * Math.PI) / 180))}`, { c: 'currentColor', w: 1 }) + S.text(O[0] + 46, O[1] - 10, 'φ', { it: true });
  s += S.text(O[0] + 100, O[1] + 34, 'I (reference, along VR)', { size: 10 });
  const drawn = (Math.atan2(O[1] - tip[1], tip[0] - O[0]) * 180) / Math.PI;
  check(Math.abs(drawn - phi) < 0.01, `LCR phasor: V drawn at ${drawn.toFixed(1)}° to I, equal to atan((XL − XC)/R) = ${phi.toFixed(1)}°`);
  check(Math.abs(Math.hypot(VR, VL - VC) - LCR_DATA.V) < 1e-9, 'LCR phasor: V² = V_R² + (V_L − V_C)²');
  return svgDoc(w, h, 'Phasor diagram for the worked series LCR circuit: V R of 132 volts along the current, V L of 352 volts up and V C of 176 volts down; their sum is 220 volts leading the current by about 53 degrees', s);
})();

// ---------------------------------------------------------------- impedance triangle
export const IMP_TRIANGLE = (() => {
  const { R, XL, XC, Z, phi } = LCR_DATA;
  const w = 300;
  const h = 200;
  const k = 3;
  const O = [50, 160];
  const A = [O[0] + R * k, O[1]];
  const B = [A[0], O[1] - (XL - XC) * k];
  let s = S.path(`M${O[0]} ${O[1]} L${A[0]} ${A[1]} L${B[0]} ${B[1]} Z`, { c: ACC, w: 2, fill: FILL, fop: 0.5 });
  s += S.text((O[0] + A[0]) / 2, O[1] + 18, `R = ${R} Ω`, { a: 'middle', size: 11 });
  s += S.text(A[0] + 8, (A[1] + B[1]) / 2, `XL − XC = ${XL - XC} Ω`, { size: 11 });
  s += S.text((O[0] + B[0]) / 2 - 14, (O[1] + B[1]) / 2 - 6, `Z = ${Z} Ω`, { a: 'end', size: 11, w: 'bold' });
  s += S.text(O[0] + 30, O[1] - 6, 'φ', { it: true });
  s += S.rect(A[0] - 10, A[1] - 10, 10, 10, { c: 'currentColor', sw: 1 });
  check(Math.abs(Math.hypot(B[0] - O[0], B[1] - O[1]) / k - Z) < 1e-9, `impedance triangle: hypotenuse ${Z} Ω drawn to scale`);
  void phi;
  return svgDoc(w, h, 'Impedance triangle for the worked circuit: resistance 30 ohms along the base, net reactance 40 ohms upright, impedance 50 ohms along the hypotenuse, with the phase angle phi at the base', s);
})();

// ---------------------------------------------------------------- AC generator
export const GENERATOR = (() => {
  const w = 400;
  const h = 230;
  let s = '';
  s += S.path('M20 40 L80 40 L80 70 Q60 110 80 150 L80 180 L20 180 Z', { c: POS, sw: 1.5, fill: POS, fop: 0.2 }) + S.text(45, 115, 'N', { a: 'middle', w: 'bold', size: 16 });
  s += S.path('M380 40 L320 40 L320 70 Q340 110 320 150 L320 180 L380 180 Z', { c: NEG, sw: 1.5, fill: NEG, fop: 0.2 }) + S.text(355, 115, 'S', { a: 'middle', w: 'bold', size: 16 });
  for (const y of [80, 110, 140]) s += S.arrow(90, y, 310, y, { c: MUT, w: 1, size: 6 });
  // coil (rectangle in perspective) rotating about a vertical axis
  s += S.path('M170 60 L230 50 L230 160 L170 170 Z', { c: 'currentColor', w: 2.5 });
  s += S.line(200, 30, 200, 205, { c: MUT, w: 1, dash: '5 4' }) + S.path('M182 36 A18 6 0 0 0 218 36', { c: ACC, w: 1.4 }) + S.head(218, 36, -0.3, { c: ACC, size: 7 });
  s += S.text(226, 30, 'ω', { it: true });
  s += S.ellipse(200, 190, 16, 4, { c: 'currentColor', sw: 1.5 }) + S.ellipse(200, 200, 16, 4, { c: 'currentColor', sw: 1.5 });
  s += S.line(170, 170, 190, 190, { w: 1.2 }) + S.line(230, 160, 214, 200, { w: 1.2 });
  s += S.rect(150, 186, 12, 8, { c: 'currentColor', sw: 1, fill: MUT }) + S.rect(238, 196, 12, 8, { c: 'currentColor', sw: 1, fill: MUT });
  s += S.text(60, 214, 'slip rings and brushes', { size: 10 });
  s += S.text(330, 214, 'ε = NBAω sin ωt', { a: 'middle', size: 11, w: 'bold' });
  check(true, 'generator: coil axis perpendicular to B, so the flux NBA cos ωt varies as the coil turns');
  return svgDoc(w, h, 'AC generator: a coil rotating with angular speed omega in the uniform field between the poles of a magnet; the changing flux induces an alternating emf N B A omega sine omega t, taken out through slip rings and brushes', s);
})();

// ---------------------------------------------------------------- transformer
export const TRANSFORMER = (() => {
  const w = 400;
  const h = 200;
  let s = '';
  s += S.rect(110, 30, 180, 140, { c: MUT, sw: 14 });
  for (let i = 0; i < 6; i++) s += S.ellipse(110, 55 + i * 18, 18, 6, { c: POS, sw: 1.8 });
  for (let i = 0; i < 3; i++) s += S.ellipse(290, 75 + i * 22, 18, 6, { c: NEG, sw: 1.8 });
  s += S.line(92, 55, 40, 55) + S.line(92, 145, 40, 145) + S.circle(30, 100, 12, { sw: 1.5 }) + S.text(30, 104, '~', { a: 'middle', size: 14 }) + S.line(30, 88, 30, 55) + S.line(40, 55, 30, 55) + S.line(30, 112, 30, 145) + S.line(40, 145, 30, 145);
  s += S.line(308, 75, 360, 75) + S.line(308, 119, 360, 119) + S.rect(352, 82, 16, 30, { c: 'currentColor', sw: 1.4 }) + S.text(376, 102, 'load', { size: 10 });
  s += S.text(60, 186, 'primary Np, Vp', { a: 'middle', size: 11 }) + S.text(320, 186, 'secondary Ns, Vs', { a: 'middle', size: 11 });
  s += S.text(200, 104, 'laminated soft-iron core', { a: 'middle', size: 10 });
  s += S.text(200, 20, 'Vs/Vp = Ns/Np', { a: 'middle', size: 12, w: 'bold' });
  check(true, 'transformer: step-down drawn (fewer secondary turns than primary)');
  return svgDoc(w, h, 'Transformer: primary and secondary coils wound on a laminated soft-iron core; an alternating voltage in the primary produces an alternating flux in the core, which induces a voltage in the secondary in the ratio of the numbers of turns', s);
})();

export const ALL = { PHASORS3, LCR_PHASOR, IMP_TRIANGLE, GENERATOR, TRANSFORMER };
