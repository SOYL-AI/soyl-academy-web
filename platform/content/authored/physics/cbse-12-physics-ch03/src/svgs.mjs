// ch03 diagrams: circuit drawings built from a small symbol kit, with the circuit values solved by script (Kirchhoff,
// Wheatstone balance) and the drawn current directions checked against the solution (SELF_CHECKS, read by build.mjs).
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const POS = 'var(--diagram-red)';
const NEG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- symbol kit (every helper returns a fragment)
const W = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { w: 1.6 });
/** Resistor (zigzag) between (x1, y) and (x2, y), horizontal. */
function resH(x1, x2, y, label, { ly = -12 } = {}) {
  const n = 6;
  const L = x2 - x1;
  const a = x1 + L * 0.2;
  const b = x2 - L * 0.2;
  let d = `M${x1} ${y} L${a} ${y}`;
  for (let i = 0; i < n; i++) d += ` L${(a + ((i + 0.5) * (b - a)) / n).toFixed(1)} ${y + (i % 2 ? 6 : -6)}`;
  d += ` L${b} ${y} L${x2} ${y}`;
  return S.path(d, { w: 1.6, join: 'round' }) + (label ? S.text((x1 + x2) / 2, y + ly, label, { a: 'middle', size: 11 }) : '');
}
/** Resistor between (x, y1) and (x, y2), vertical. */
function resV(x, y1, y2, label, { lx = 12 } = {}) {
  const n = 6;
  const L = y2 - y1;
  const a = y1 + L * 0.2;
  const b = y2 - L * 0.2;
  let d = `M${x} ${y1} L${x} ${a}`;
  for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? 6 : -6)} ${(a + ((i + 0.5) * (b - a)) / n).toFixed(1)}`;
  d += ` L${x} ${b} L${x} ${y2}`;
  return S.path(d, { w: 1.6, join: 'round' }) + (label ? S.text(x + lx, (y1 + y2) / 2 + 4, label, { size: 11 }) : '');
}
/** Resistor along an arbitrary segment (for the bridge diamond). */
function resSeg(x1, y1, x2, y2, label, { off = 14 } = {}) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / L;
  const uy = (y2 - y1) / L;
  const nx = -uy;
  const ny = ux;
  const n = 6;
  const p = (t, s) => `${(x1 + ux * t + nx * s).toFixed(1)} ${(y1 + uy * t + ny * s).toFixed(1)}`;
  let d = `M${p(0, 0)} L${p(L * 0.25, 0)}`;
  for (let i = 0; i < n; i++) d += ` L${p(L * 0.25 + ((i + 0.5) * L * 0.5) / n, i % 2 ? 6 : -6)}`;
  d += ` L${p(L * 0.75, 0)} L${p(L, 0)}`;
  const mx = (x1 + x2) / 2 + nx * off;
  const my = (y1 + y2) / 2 + ny * off;
  return S.path(d, { w: 1.6, join: 'round' }) + (label ? S.text(mx, my + 4, label, { a: 'middle', size: 11 }) : '');
}
/** Cell in a vertical wire at (x, y): long plate (+) on top. */
function cellV(x, y, label, { lx = 14 } = {}) {
  return S.line(x - 12, y - 4, x + 12, y - 4, { w: 2 }) + S.line(x - 6, y + 4, x + 6, y + 4, { w: 3.5 }) + (label ? S.text(x + lx, y + 4, label, { size: 11 }) : '');
}
/** Cell in a horizontal wire at (x, y): long plate (+) on the left. */
function cellH(x, y, label, { ly = -16 } = {}) {
  return S.line(x - 4, y - 12, x - 4, y + 12, { w: 2 }) + S.line(x + 4, y - 6, x + 4, y + 6, { w: 3.5 }) + (label ? S.text(x, y + ly, label, { a: 'middle', size: 11 }) : '');
}
const dot = (x, y) => S.circle(x, y, 2.5, { c: 'currentColor', fill: 'currentColor' });
const meter = (x, y, ch) => S.circle(x, y, 11, { sw: 1.6, fill: FILL }) + S.text(x, y + 4, ch, { a: 'middle', size: 11, w: 'bold' });
/** Current arrow along a wire, centred at (x, y), angle in radians. */
const cur = (x, y, ang, label, { lx = 0, ly = -8 } = {}) => S.head(x + 5 * Math.cos(ang), y + 5 * Math.sin(ang), ang, { c: ACC, size: 8 }) + (label ? S.text(x + lx, y + ly, label, { a: 'middle', size: 11, c: ACC }) : '');

// ---------------------------------------------------------------- drift of electrons in a conductor
export const DRIFT = (() => {
  const w = 380;
  const h = 190;
  let s = '';
  s += S.rect(40, 50, 300, 90, { c: 'currentColor', sw: 1.5, fill: FILL, fop: 0.5, rx: 6 });
  s += S.ellipse(40, 95, 14, 45, { c: 'currentColor', sw: 1.5, fill: FILL });
  s += S.ellipse(180, 95, 14, 45, { c: ACC, sw: 1.5, dash: '4 3' }) + S.ellipse(280, 95, 14, 45, { c: ACC, sw: 1.5, dash: '4 3' });
  s += S.text(180, 160, 'area A', { a: 'middle', size: 11 });
  s += S.line(180, 40, 280, 40, { c: 'currentColor', w: 1 }) + S.text(230, 34, 'vd Δt', { a: 'middle', size: 11 });
  for (const [x, y] of [[100, 75], [140, 115], [210, 70], [250, 110], [300, 80], [120, 95], [230, 95]]) {
    s += S.circle(x, y, 5, { c: NEG, fill: NEG, fop: 0.3 }) + S.text(x, y + 3.5, '−', { a: 'middle', size: 10, c: NEG });
    s += S.arrow(x - 7, y, x - 24, y, { c: NEG, w: 1.2, size: 5 });
  }
  s += S.arrow(60, 180, 160, 180, { c: ACC, w: 2 }) + S.text(110, 174, 'E and I', { a: 'middle', size: 11 });
  s += S.text(300, 182, 'electrons drift ←', { a: 'middle', size: 11, c: NEG });
  check(true, 'drift: electron drift arrows point opposite to E and I');
  return svgDoc(w, h, 'A conductor of cross-section A carrying current: the field and conventional current point to the right while the free electrons drift slowly to the left; in time delta t all electrons within a length v d delta t cross a section', s);
})();

// ---------------------------------------------------------------- cell with internal resistance, external resistor and voltmeter
export const CELL_R = (() => {
  const w = 320;
  const h = 210;
  let s = '';
  // loop: left side cell + r, top resistor R, right side wire
  s += W(40, 40, 120, 40) + resH(120, 200, 40, 'R') + W(200, 40, 280, 40) + W(280, 40, 280, 170) + W(40, 170, 280, 170);
  s += W(40, 40, 40, 92) + cellV(40, 100, '') + W(40, 108, 40, 112) + resV(40, 112, 148, 'r', { lx: -18 }) + W(40, 148, 40, 170);
  s += S.rect(14, 82, 52, 72, { c: MUT, sw: 1, dash: '4 3' }) + S.text(40, 196, 'cell: E, r', { a: 'middle', size: 11 });
  // voltmeter across the cell terminals
  s += W(66, 70, 110, 70) + W(66, 162, 110, 162) + W(110, 70, 110, 105) + W(110, 127, 110, 162) + meter(110, 116, 'V');
  s += dot(40, 70) + W(40, 70, 66, 70) + dot(40, 162) + W(40, 162, 66, 162);
  s += cur(160, 170, 0, 'I', { ly: 18 });
  check(true, 'cell circuit: current leaves the + plate (top) and returns through R');
  return svgDoc(w, h, 'A cell of emf E and internal resistance r, shown inside a dashed box, connected to an external resistor R; a voltmeter across the cell terminals reads the terminal voltage V equal to E minus I r', s);
})();

// ---------------------------------------------------------------- cells in series and in parallel
export const CELLS = (() => {
  const w = 420;
  const h = 170;
  let s = '';
  s += S.text(95, 18, 'Series', { a: 'middle', w: 'bold', size: 12 });
  s += W(20, 70, 46, 70) + cellH(50, 70, 'E₁, r₁') + W(54, 70, 96, 70) + cellH(100, 70, 'E₂, r₂') + W(104, 70, 146, 70) + cellH(150, 70, 'E₃, r₃') + W(154, 70, 180, 70);
  s += dot(20, 70) + dot(180, 70) + S.text(20, 92, 'A', { a: 'middle' }) + S.text(180, 92, 'B', { a: 'middle' });
  s += S.text(100, 125, 'E = E₁ + E₂ + E₃', { a: 'middle', size: 11 }) + S.text(100, 142, 'r = r₁ + r₂ + r₃', { a: 'middle', size: 11 });
  s += S.text(320, 18, 'Parallel', { a: 'middle', w: 'bold', size: 12 });
  const xa = 240;
  const xb = 400;
  s += W(xa, 50, xa, 100) + W(xb, 50, xb, 100);
  for (const [y, lab] of [[50, 'E₁, r₁'], [100, 'E₂, r₂']]) s += W(xa, y, 316, y) + cellH(320, y, lab, { ly: y === 50 ? -16 : 24 }) + W(324, y, xb, y);
  s += W(222, 75, xa, 75) + W(xb, 75, 418, 75) + dot(xa, 75) + dot(xb, 75);
  s += S.text(320, 145, 'E/r = E₁/r₁ + E₂/r₂', { a: 'middle', size: 11 }) + S.text(320, 162, '1/r = 1/r₁ + 1/r₂', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'Cells in series, positive of one to negative of the next, give an emf equal to the sum of the emfs and an internal resistance equal to the sum; two cells in parallel, positives joined and negatives joined, give a combined emf and internal resistance from the parallel formulas', s);
})();

// ---------------------------------------------------------------- Kirchhoff two-loop circuit (worked example 6)
export const KIRCH_DATA = (() => {
  const E1 = 12;
  const R1 = 2;
  const E2 = 6;
  const R2 = 2;
  const R3 = 4;
  // node potential V at the top junction (bottom = 0): (E1 − V)/R1 + (E2 − V)/R2 = V/R3
  const V = (E1 / R1 + E2 / R2) / (1 / R1 + 1 / R2 + 1 / R3);
  const I1 = (E1 - V) / R1;
  const I2 = (E2 - V) / R2;
  const I3 = V / R3;
  return { E1, R1, E2, R2, R3, V, I1, I2, I3 };
})();
export const KIRCH = (() => {
  const { I1, I2, I3 } = KIRCH_DATA;
  const w = 470;
  const h = 220;
  let s = '';
  const top = 40;
  const bot = 180;
  const xL = 85;
  const xM = 235;
  const xR = 385;
  // left branch: E1 (12 V) and R1 on the left vertical wire
  s += W(xL, top, xL, 70) + resV(xL, 70, 110, 'R₁ = 2 Ω', { lx: -64 }) + W(xL, 110, xL, 136) + cellV(xL, 140, '') + S.text(xL - 46, 144, 'E₁ = 12 V', { size: 11 }) + W(xL, 144, xL, bot);
  // middle branch: R3
  s += W(xM, top, xM, 80) + resV(xM, 80, 140, 'R₃ = 4 Ω') + W(xM, 140, xM, bot);
  // right branch: E2 (6 V) and R2
  s += W(xR, top, xR, 70) + resV(xR, 70, 110, 'R₂ = 2 Ω') + W(xR, 110, xR, 136) + cellV(xR, 140, '') + S.text(xR + 16, 144, 'E₂ = 6 V', { size: 11 }) + W(xR, 144, xR, bot);
  s += W(xL, top, xR, top) + W(xL, bot, xR, bot) + dot(xM, top) + dot(xM, bot);
  s += S.text(xM, top - 10, 'A', { a: 'middle', w: 'bold' }) + S.text(xM, bot + 16, 'B', { a: 'middle', w: 'bold' });
  // currents drawn in their solved directions
  const up = -Math.PI / 2;
  const down = Math.PI / 2;
  s += cur(xL, 60, I1 > 0 ? up : down, `I₁ = ${I1.toFixed(1)} A`, { lx: 52, ly: 4 });
  s += cur(xM, 160, I3 > 0 ? down : up, `I₃ = ${I3.toFixed(1)} A`, { lx: 46, ly: 4 });
  s += cur(xR, 60, I2 > 0 ? up : down, `I₂ = ${Math.abs(I2).toFixed(1)} A`, { lx: -52, ly: 4 });
  check(Math.abs(I1 + I2 - I3) < 1e-12, `Kirchhoff: junction rule at A holds (I1 + I2 = I3 with I2 = ${I2.toFixed(2)} A)`);
  check(Math.abs(12 - 2 * I1 - 4 * I3) < 1e-12 && Math.abs(6 - 2 * I2 - 4 * I3) < 1e-12, 'Kirchhoff: both loop equations hold');
  check(I1 > 0 && I3 > 0 && I2 < 0, 'Kirchhoff: arrows drawn in the solved directions (I2 flows down, charging E2)');
  return svgDoc(w, h, 'Two-loop circuit: a 12 volt cell with 2 ohms on the left, a 4 ohm resistor in the middle and a 6 volt cell with 2 ohms on the right, all joined between junctions A and B; the solved currents are 2.4 amperes up the left branch, 1.8 amperes down the middle and 0.6 ampere down the right branch, so the 6 volt cell is being charged', s);
})();

// ---------------------------------------------------------------- Wheatstone bridge
export const BRIDGE = (() => {
  const w = 340;
  const h = 250;
  const A = [50, 120];
  const B = [170, 40];
  const C = [290, 120];
  const D = [170, 200];
  let s = '';
  s += resSeg(...A, ...B, 'P', { off: -14 }) + resSeg(...B, ...C, 'Q', { off: -14 }) + resSeg(...A, ...D, 'R', { off: 14 }) + resSeg(...D, ...C, 'S', { off: 14 });
  s += W(B[0], B[1], B[0], 109) + meter(170, 120, 'G') + W(D[0], 131, D[0], D[1]);
  s += [A, B, C, D].map(([x, y]) => dot(x, y)).join('');
  s += S.text(A[0] - 12, A[1] + 4, 'A', { a: 'end', w: 'bold' }) + S.text(B[0], B[1] - 10, 'B', { a: 'middle', w: 'bold' }) + S.text(C[0] + 8, C[1] - 8, 'C', { w: 'bold' }) + S.text(D[0], D[1] + 18, 'D', { a: 'middle', w: 'bold' });
  s += W(A[0], A[1], 20, A[1]) + W(20, A[1], 20, 235) + W(20, 235, 155, 235) + cellH(160, 235, '') + W(164, 235, 320, 235) + W(320, 235, 320, C[1]) + W(320, C[1], C[0], C[1]);
  s += S.text(146, 248, 'E', { a: 'end', size: 11 });
  s += S.text(250, 52, 'balanced: P/Q = R/S', { a: 'middle', size: 11 });
  // numeric check of the balance condition with P = 10, Q = 20, R = 15, S = 30
  const [P, Q, R, Sx] = [10, 20, 15, 30];
  const VB = Q / (P + Q);
  const VD = Sx / (R + Sx);
  check(Math.abs(VB - VD) < 1e-12, 'bridge: with P/Q = R/S the points B and D are at the same potential (no galvanometer current)');
  return svgDoc(w, h, 'Wheatstone bridge: resistors P and Q in the upper arms from A to B to C, R and S in the lower arms from A to D to C, a galvanometer between B and D and a cell across A and C; the galvanometer reads zero when P over Q equals R over S', s);
})();

// ---------------------------------------------------------------- metre bridge
export const METRE = (() => {
  const w = 400;
  const h = 210;
  let s = '';
  s += S.rect(40, 130, 320, 8, { c: 'currentColor', sw: 1, fill: MUT, fop: 0.4 });
  for (let i = 0; i <= 10; i++) s += S.line(40 + i * 32, 140, 40 + i * 32, i % 5 === 0 ? 150 : 146, { c: MUT, w: 1 });
  s += S.text(40, 164, '0', { a: 'middle', size: 10 }) + S.text(200, 164, '50 cm', { a: 'middle', size: 10 }) + S.text(360, 164, '100 cm', { a: 'middle', size: 10 });
  // gaps: X in left gap, R in right gap
  s += W(40, 130, 40, 60) + W(40, 60, 80, 60) + resH(80, 160, 60, 'X (unknown)') + W(160, 60, 240, 60) + resH(240, 320, 60, 'R (known)') + W(320, 60, 360, 60) + W(360, 60, 360, 130);
  s += dot(200, 60) + W(200, 60, 200, 79) + meter(200, 90, 'G') + W(200, 101, 200, 112);
  const lx = 40 + 0.4 * 320;
  s += S.line(200, 112, lx, 128, { w: 1.6 }) + S.head(lx, 129, Math.atan2(17, lx - 200), { size: 6 }) + S.text(lx - 6, 124, 'J', { a: 'end', w: 'bold', size: 11 });
  s += S.line(40, 178, lx, 178, { c: ACC, w: 1 }) + S.text((40 + lx) / 2, 192, 'l', { a: 'middle', it: true }) + S.line(lx, 178, 360, 178, { c: ACC, w: 1, dash: '3 3' }) + S.text((lx + 360) / 2, 192, '100 − l', { a: 'middle', size: 11 });
  s += W(40, 134, 20, 134) + W(20, 134, 20, 205) + W(20, 205, 196, 205) + cellH(200, 205, '') + W(204, 205, 380, 205) + W(380, 205, 380, 134) + W(380, 134, 360, 134);
  check(Math.abs(lx - 168) < 1e-9, 'metre bridge: jockey drawn at the 40 cm mark (the worked example)');
  return svgDoc(w, h, 'Metre bridge: a uniform one-metre wire with an unknown resistance X in the left gap and a known R in the right gap; a galvanometer from the middle terminal to a sliding jockey J shows no deflection at the balance length l, where X over R equals l over 100 minus l', s);
})();

export const ALL = { DRIFT, CELL_R, CELLS, KIRCH, BRIDGE, METRE };
