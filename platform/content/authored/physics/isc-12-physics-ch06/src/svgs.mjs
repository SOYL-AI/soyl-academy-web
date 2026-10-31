// ISC ch06 diagrams: a cell on load, mixed grouping, two unequal cells in parallel, a two-loop Kirchhoff circuit, the
// Wheatstone and metre bridges, and the potentiometer in three set-ups (principle, comparing emfs, internal resistance).
// The symbol kit and the bridge drawings are copied (not imported) from cbse-12-physics-ch03/src/svgs.mjs; every circuit
// is solved here and the drawn currents, polarities and balance lengths are checked against the solution (SELF_CHECKS).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

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
/** Cell in a horizontal wire at (x, y): long plate (+) on the LEFT, at x − 4. */
function cellH(x, y, label, { ly = -16 } = {}) {
  return S.line(x - 4, y - 12, x - 4, y + 12, { w: 2 }) + S.line(x + 4, y - 6, x + 4, y + 6, { w: 3.5 }) + (label ? S.text(x, y + ly, label, { a: 'middle', size: 11 }) : '');
}
const dot = (x, y) => S.circle(x, y, 2.5, { c: 'currentColor', fill: 'currentColor' });
const meter = (x, y, ch) => S.circle(x, y, 11, { sw: 1.6, fill: FILL }) + S.text(x, y + 4, ch, { a: 'middle', size: 11, w: 'bold' });
/** Plug key between (x1, y) and (x2, y): two studs and, if closed, a bar across. */
const key = (x1, x2, y, label, closed = true) =>
  S.circle(x1, y, 3, { sw: 1.4 }) + S.circle(x2, y, 3, { sw: 1.4 }) + (closed ? S.line(x1 + 3, y - 5, x2 - 3, y - 5, { w: 2.5 }) : '') + (label ? S.text((x1 + x2) / 2, y - 10, label, { a: 'middle', size: 11 }) : '');
/** Current arrow along a wire, centred at (x, y), angle in radians. */
const cur = (x, y, ang, label, { lx = 0, ly = -8 } = {}) => S.head(x + 5 * Math.cos(ang), y + 5 * Math.sin(ang), ang, { c: ACC, size: 8 }) + (label ? S.text(x + lx, y + ly, label, { a: 'middle', size: 11, c: ACC }) : '');
const RIGHT = 0;
const LEFT = Math.PI;
const UP = -Math.PI / 2;
const DOWN = Math.PI / 2;

// ---------------------------------------------------------------- cell with internal resistance on load (worked example 1)
export const LOAD_DATA = (() => {
  const E = 4.5;
  const r = 0.3;
  const R = 2.7;
  const I = E / (R + r);
  return { E, r, R, I, V: E - I * r, lost: I * r };
})();
export const CELL_LOAD = (() => {
  const { E, r, R, I, V } = LOAD_DATA;
  const w = 320;
  const h = 210;
  let s = '';
  s += W(40, 40, 120, 40) + resH(120, 200, 40, 'R') + W(200, 40, 280, 40) + W(280, 40, 280, 170) + W(40, 170, 280, 170);
  s += W(40, 40, 40, 92) + cellV(40, 100, '') + W(40, 108, 40, 112) + resV(40, 112, 148, 'r', { lx: -18 }) + W(40, 148, 40, 170);
  s += S.rect(14, 82, 52, 72, { c: MUT, sw: 1, dash: '4 3' }) + S.text(40, 196, 'cell: E, r', { a: 'middle', size: 11 });
  s += W(66, 70, 110, 70) + W(66, 162, 110, 162) + W(110, 70, 110, 105) + W(110, 127, 110, 162) + meter(110, 116, 'V');
  s += dot(40, 70) + W(40, 70, 66, 70) + dot(40, 162) + W(40, 162, 66, 162);
  // the + plate (long, on top) drives current up the cell, along the top through R and back along the bottom
  s += cur(160, 170, LEFT, 'I', { ly: 18 }) + cur(80, 40, RIGHT, 'I');
  s += S.text(200, 110, 'V = E − Ir', { a: 'middle', size: 12, w: 'bold' });
  check(close(I * (R + r), E) && close(V, I * R), `cell on load: E = I(R + r) and V = IR hold (I = ${I} A, V = ${V.toFixed(2)} V)`);
  return svgDoc(w, h, 'A cell of emf E and internal resistance r, shown inside a dashed box, drives a current I through an external resistor R; a voltmeter across the cell terminals reads the terminal potential difference V, equal to E minus I r', s);
})();

// ---------------------------------------------------------------- mixed grouping (worked example 2)
export const GROUP_DATA = (() => {
  const N = 12;
  const E = 1.5;
  const r = 0.6;
  const R = 1.8;
  const rows = [];
  for (let m = 1; m <= N; m++) if (N % m === 0) {
    const n = N / m;
    rows.push({ m, n, I: (n * E) / (R + (n * r) / m) });
  }
  const best = rows.reduce((a, b) => (b.I > a.I ? b : a));
  return { N, E, r, R, rows, best };
})();
export const GROUPS = (() => {
  const { rows, best, R, r } = GROUP_DATA;
  const w = 380;
  const h = 220;
  let s = '';
  const xL = 60;
  const xR = 300;
  const ys = [55, 115];
  const cx = [130, 180, 230];
  const plusSides = [];
  for (const y of ys) {
    s += W(xL, y, cx[0] - 4, y);
    cx.forEach((x, i) => {
      s += cellH(x, y, i === 1 && y === ys[0] ? 'E, r' : '', { ly: -16 });
      plusSides.push(x - 4 < x + 4);
      s += W(x + 4, y, i < cx.length - 1 ? cx[i + 1] - 4 : xR, y);
    });
    s += dot(xL, y) + dot(xR, y);
  }
  s += W(xL, ys[0], xL, ys[1]) + W(xR, ys[0], xR, ys[1]);
  s += S.text(180, 22, 'm rows in parallel, n cells in series in each row', { a: 'middle', size: 11 });
  // external circuit from the + rail (left) through R to the − rail (right)
  s += W(xL, 85, 30, 85) + W(30, 85, 30, 180) + W(30, 180, 140, 180) + resH(140, 220, 180, 'R', { ly: -12 }) + W(220, 180, 340, 180) + W(340, 180, 340, 85) + W(340, 85, xR, 85);
  s += cur(90, 180, RIGHT, 'I', { ly: -8 });
  s += S.text(xL - 6, 48, '+', { a: 'end', size: 12, w: 'bold' }) + S.text(xR + 6, 48, '−', { size: 12, w: 'bold' });
  s += S.text(190, 210, 'I = nE / (R + nr/m), largest when R = nr/m', { a: 'middle', size: 11 });
  check(plusSides.every(Boolean), 'grouping: every cell has its long (+) plate towards the left rail, so the rows aid one another');
  check(best.m === 2 && best.n === 6 && close(R, (best.n * r) / best.m), `grouping: of the ${rows.length} arrangements of 12 cells, the largest current (${best.I.toFixed(2)} A) is for 2 rows of 6, where R = nr/m`);
  return svgDoc(w, h, 'Mixed grouping of identical cells: m rows connected in parallel between two rails, each row having n cells in series with their positive plates towards the left rail; the rails drive a current I through an external resistance R, which is largest when R equals n r over m', s);
})();

// ---------------------------------------------------------------- two unequal cells in parallel (worked example 3)
export const UNEQ_DATA = (() => {
  const E1 = 2.0;
  const r1 = 0.4;
  const E2 = 1.5;
  const r2 = 0.6;
  const R = 1.56;
  const Eeq = (E1 * r2 + E2 * r1) / (r1 + r2);
  const req = (r1 * r2) / (r1 + r2);
  const I = Eeq / (R + req);
  const V = I * R;
  return { E1, r1, E2, r2, R, Eeq, req, I, V, I1: (E1 - V) / r1, I2: (E2 - V) / r2 };
})();
export const UNEQUAL = (() => {
  const { I, I1, I2, Eeq, req } = UNEQ_DATA;
  const w = 380;
  const h = 220;
  let s = '';
  const xX = 60;
  const xY = 300;
  const y1 = 50;
  const y2 = 115;
  for (const [y, lab, rl] of [[y1, 'E₁ = 2.0 V', 'r₁ = 0.4 Ω'], [y2, 'E₂ = 1.5 V', 'r₂ = 0.6 Ω']]) {
    s += W(xX, y, 116, y) + cellH(120, y, lab) + W(124, y, 170, y) + resH(170, 240, y, rl, { ly: 20 }) + W(240, y, xY, y);
  }
  s += W(xX, y1, xX, y2) + W(xY, y1, xY, y2) + dot(xX, 82) + dot(xY, 82);
  s += S.text(xX - 6, 74, 'X', { a: 'end', w: 'bold' }) + S.text(xY + 6, 74, 'Y', { w: 'bold' });
  s += W(xX, 82, 30, 82) + W(30, 82, 30, 180) + W(30, 180, 140, 180) + resH(140, 220, 180, 'R = 1.56 Ω', { ly: -12 }) + W(220, 180, 350, 180) + W(350, 180, 350, 82) + W(350, 82, xY, 82);
  // currents in their solved directions: a discharging cell drives current out of its + plate (towards X)
  s += cur(270, y1, I1 > 0 ? LEFT : RIGHT, `I₁ = ${I1.toFixed(1)} A`, { ly: -10 });
  s += cur(270, y2, I2 > 0 ? LEFT : RIGHT, `${Math.abs(I2).toFixed(1)} A`, { ly: -10 });
  s += cur(80, 180, RIGHT, `I = ${I.toFixed(1)} A`, { ly: 16 });
  s += S.text(190, 210, 'the 1.5 V cell is being charged', { a: 'middle', size: 11 });
  check(close(I1 + I2, I), 'unequal cells: junction rule at X holds (I1 + I2 = I)');
  check(I1 > 0 && I2 < 0, 'unequal cells: arrows drawn in the solved directions (the 1.5 V cell takes current in at its + plate)');
  check(close(Eeq, 1.8) && close(req, 0.24), 'unequal cells: Eeq = 1.8 V and req = 0.24 ohm');
  return svgDoc(w, h, 'Two cells in parallel with positive plates joined at X: a 2.0 volt cell with 0.4 ohm and a 1.5 volt cell with 0.6 ohm, feeding a 1.56 ohm load between X and Y; the load current is 1.0 ampere, the 2.0 volt cell supplies 1.1 amperes and 0.1 ampere is pushed backwards through the 1.5 volt cell, which is being charged', s);
})();

// ---------------------------------------------------------------- Kirchhoff two-loop circuit (worked example 4)
export const KIRCH_DATA = (() => {
  const E1 = 10;
  const R1 = 2;
  const E2 = 8;
  const R2 = 4;
  const R3 = 4;
  // node potential V at the top junction A (bottom B = 0): (E1 − V)/R1 + (E2 − V)/R2 = V/R3
  const V = (E1 / R1 + E2 / R2) / (1 / R1 + 1 / R2 + 1 / R3);
  return { E1, R1, E2, R2, R3, V, I1: (E1 - V) / R1, I2: (E2 - V) / R2, I3: V / R3 };
})();
export const KIRCH = (() => {
  const { E1, R1, E2, R2, R3, I1, I2, I3 } = KIRCH_DATA;
  const w = 470;
  const h = 220;
  let s = '';
  const top = 40;
  const bot = 180;
  const xL = 85;
  const xM = 235;
  const xR = 385;
  s += W(xL, top, xL, 70) + resV(xL, 70, 110, 'R₁ = 2 Ω', { lx: -64 }) + W(xL, 110, xL, 136) + cellV(xL, 140, '') + S.text(xL - 18, 144, 'E₁ = 10 V', { a: 'end', size: 11 }) + W(xL, 144, xL, bot);
  s += W(xM, top, xM, 80) + resV(xM, 80, 140, 'R₃ = 4 Ω') + W(xM, 140, xM, bot);
  s += W(xR, top, xR, 70) + resV(xR, 70, 110, 'R₂ = 4 Ω') + W(xR, 110, xR, 136) + cellV(xR, 140, '') + S.text(xR + 16, 144, 'E₂ = 8 V', { size: 11 }) + W(xR, 144, xR, bot);
  s += W(xL, top, xR, top) + W(xL, bot, xR, bot) + dot(xM, top) + dot(xM, bot);
  s += S.text(xM, top - 10, 'A', { a: 'middle', w: 'bold' }) + S.text(xM, bot + 16, 'B', { a: 'middle', w: 'bold' });
  s += cur(xL, 60, I1 > 0 ? UP : DOWN, `I₁ = ${I1.toFixed(2)} A`, { lx: 56, ly: 4 });
  s += cur(xM, 160, I3 > 0 ? DOWN : UP, `I₃ = ${I3.toFixed(2)} A`, { lx: 50, ly: 4 });
  s += cur(xR, 60, I2 > 0 ? UP : DOWN, `I₂ = ${I2.toFixed(2)} A`, { lx: -56, ly: 4 });
  check(close(I1 + I2, I3), `Kirchhoff: junction rule at A holds (I1 + I2 = I3 = ${I3} A)`);
  check(close(E1 - R1 * I1 - R3 * I3, 0) && close(E2 - R2 * I2 - R3 * I3, 0), 'Kirchhoff: both loop equations hold');
  check(I1 > 0 && I2 > 0 && I3 > 0, 'Kirchhoff: arrows drawn in the solved directions (both cells discharge, I3 flows down)');
  return svgDoc(w, h, 'Two-loop circuit: a 10 volt cell with 2 ohms on the left, a 4 ohm resistor in the middle and an 8 volt cell with 4 ohms on the right, joined between junctions A and B with both positive plates towards A; the solved currents are 1.5 amperes up the left branch, 0.25 ampere up the right branch and 1.75 amperes down the middle', s);
})();

// ---------------------------------------------------------------- Wheatstone bridge
export const BRIDGE_DATA = { P: 12, Q: 18, R: 8, S: 12 };
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
  const { P, Q, R, S: Sx } = BRIDGE_DATA;
  check(close(Q / (P + Q), Sx / (R + Sx)), 'bridge: with P = 12, Q = 18, R = 8, S = 12 ohm the points B and D are at the same potential');
  return svgDoc(w, h, 'Wheatstone bridge: resistors P and Q in the upper arms from A to B to C, R and S in the lower arms from A to D to C, a galvanometer between B and D and a cell across A and C; the galvanometer reads zero when P over Q equals R over S', s);
})();

// ---------------------------------------------------------------- metre bridge (worked example 5: X = 11.0 ohm at 55.0 cm)
export const METRE_DATA = { R: 9, l: 55 };
METRE_DATA.X = (METRE_DATA.R * METRE_DATA.l) / (100 - METRE_DATA.l);
export const METRE = (() => {
  const w = 400;
  const h = 210;
  let s = '';
  s += S.rect(40, 130, 320, 8, { c: 'currentColor', sw: 1, fill: MUT, fop: 0.4 });
  for (let i = 0; i <= 10; i++) s += S.line(40 + i * 32, 140, 40 + i * 32, i % 5 === 0 ? 150 : 146, { c: MUT, w: 1 });
  s += S.text(40, 164, '0', { a: 'middle', size: 10 }) + S.text(200, 164, '50 cm', { a: 'middle', size: 10 }) + S.text(360, 164, '100 cm', { a: 'middle', size: 10 });
  s += W(40, 130, 40, 60) + W(40, 60, 80, 60) + resH(80, 160, 60, 'X (unknown)') + W(160, 60, 240, 60) + resH(240, 320, 60, 'R = 9.0 Ω') + W(320, 60, 360, 60) + W(360, 60, 360, 130);
  s += dot(200, 60) + W(200, 60, 200, 79) + meter(200, 90, 'G') + W(200, 101, 200, 112);
  const lx = 40 + (METRE_DATA.l / 100) * 320;
  s += S.line(200, 112, lx, 128, { w: 1.6 }) + S.head(lx, 129, Math.atan2(17, lx - 200), { size: 6 }) + S.text(lx + 6, 124, 'J', { w: 'bold', size: 11 });
  s += S.line(40, 178, lx, 178, { c: ACC, w: 1 }) + S.text((40 + lx) / 2, 192, 'l = 55.0 cm', { a: 'middle', size: 11 }) + S.line(lx, 178, 360, 178, { c: ACC, w: 1, dash: '3 3' }) + S.text((lx + 360) / 2, 192, '100 − l', { a: 'middle', size: 11 });
  s += W(40, 134, 20, 134) + W(20, 134, 20, 205) + W(20, 205, 196, 205) + cellH(200, 205, '') + W(204, 205, 380, 205) + W(380, 205, 380, 134) + W(380, 134, 360, 134);
  check(close(lx, 216) && close(METRE_DATA.X, 11), 'metre bridge: jockey drawn at the 55.0 cm mark, giving X = 11.0 ohm');
  return svgDoc(w, h, 'Metre bridge: a uniform one-metre wire with an unknown resistance X in the left gap and a known 9 ohm resistance in the right gap; a galvanometer from the middle terminal to a sliding jockey J shows no deflection at the balance length l = 55 centimetres, where X over R equals l over 100 minus l', s);
})();

// ---------------------------------------------------------------- potentiometer (worked examples 6–8, one instrument)
export const POT_DATA = (() => {
  const E0 = 2.0; // driver accumulator, negligible internal resistance
  const Rw = 8.0; // wire resistance
  const L = 4.0; // wire length, m
  const Rh = 2.0; // rheostat
  const I = E0 / (Rw + Rh);
  const Vw = I * Rw;
  const k = Vw / L;
  return { E0, Rw, L, Rh, I, Vw, k, daniell: 1.08, unknownL: 3.6, cellL1: 3.0, cellL2: 2.5, shunt: 9.0 };
})();
const PX = 80; // px per metre of wire
const XA = 40;
function potBase(lBal, lLabel) {
  let s = '';
  s += S.rect(XA, 127, POT_DATA.L * PX, 6, { c: 'currentColor', sw: 1, fill: MUT, fop: 0.4 });
  for (let i = 0; i <= POT_DATA.L; i++) s += S.line(XA + i * PX, 135, XA + i * PX, 141, { c: MUT, w: 1 }) + S.text(XA + i * PX + (i === 0 ? 8 : 0), 151, i === POT_DATA.L ? '4 m' : String(i), { a: 'middle', size: 10 });
  s += S.text(XA - 6, 124, 'A', { a: 'end', w: 'bold' }) + S.text(XA + POT_DATA.L * PX + 6, 124, 'B', { w: 'bold' });
  // primary (driver) circuit: + plate of the driver towards A
  const xB = XA + POT_DATA.L * PX;
  s += W(XA, 127, XA, 40) + W(XA, 40, 106, 40) + cellH(110, 40, 'E₀ = 2 V') + W(114, 40, 165, 40) + key(168, 192, 40, 'K') + W(195, 40, 240, 40) + resH(240, 310, 40, 'Rh', { ly: -12 }) + W(310, 40, xB, 40) + W(xB, 40, xB, 127);
  s += cur(70, 40, LEFT, 'I', { ly: -8 }) + cur(XA + 0.5 * PX, 130, RIGHT, '');
  const jx = XA + lBal * PX;
  s += S.line(XA, 112, jx, 112, { c: ACC, w: 1 }) + S.line(jx, 106, jx, 118, { c: ACC, w: 1 }) + S.text((XA + jx) / 2, 106, lLabel, { a: 'middle', size: 11, c: ACC });
  return { s, jx };
}
/** Jockey: a wire from the galvanometer at (gx, y) along to x = jx, then up to the potentiometer wire. */
const jockey = (gx, y, jx) => W(gx, y, jx, y) + W(jx, y, jx, 150) + S.line(jx, 150, jx, 140, { w: 1.6 }) + S.head(jx, 135, UP, { size: 6 }) + S.text(jx + 8, 160, 'J', { w: 'bold', size: 11 });
const potChecks = (tag, plusTowardsA, emf, l) => {
  check(plusTowardsA, `potentiometer (${tag}): the driver and the test cell both have their + plates joined towards A`);
  check(emf < POT_DATA.Vw && close(emf / POT_DATA.k, l), `potentiometer (${tag}): emf ${emf.toFixed(2)} V is below the ${POT_DATA.Vw} V across the wire and balances at l = emf/k = ${l} m as drawn`);
};
export const POT = (() => {
  const { daniell, k } = POT_DATA;
  const l = daniell / k;
  const { s: base, jx } = potBase(l, 'l = 2.7 m');
  let s = base;
  s += W(XA, 127, XA, 195) + W(XA, 195, 136, 195) + cellH(140, 195, 'E = 1.08 V', { ly: 22 }) + W(144, 195, 198, 195) + meter(210, 195, 'G') + jockey(221, 195, jx);
  potChecks('principle', true, daniell, 2.7);
  check(close(k, 0.4) && close(POT_DATA.I, 0.2), 'potentiometer: I = 0.2 A, potential gradient k = 0.40 V per metre');
  return svgDoc(400, 225, 'Potentiometer: a 4 metre uniform wire AB carries a steady current from a 2 volt driver cell through a key and a rheostat; a cell of emf 1.08 volts, with its positive terminal joined to A, is connected through a galvanometer to a jockey, and the galvanometer reads zero at a balancing length of 2.7 metres from A', s);
})();
export const POT_COMPARE = (() => {
  const { k, unknownL } = POT_DATA;
  const { s: base, jx } = potBase(unknownL, 'l₂ = 3.6 m');
  let s = base;
  // two cells, + plates towards A, to the studs of a two-way key; the common stud goes through G to the jockey
  s += W(XA, 127, XA, 215) + W(XA, 175, 96, 175) + cellH(100, 175, 'E₁', { ly: -14 }) + W(104, 175, 150, 175) + S.circle(154, 175, 3, { sw: 1.4 }) + S.text(154, 166, '1', { a: 'middle', size: 10 });
  s += W(XA, 215, 96, 215) + cellH(100, 215, 'E₂', { ly: -14 }) + W(104, 215, 150, 215) + S.circle(154, 215, 3, { sw: 1.4 }) + S.text(154, 230, '2', { a: 'middle', size: 10 });
  s += S.circle(184, 195, 3, { sw: 1.4 }) + S.line(181, 193, 157, 213, { w: 2.5 }) + W(187, 195, 199, 195) + meter(210, 195, 'G') + jockey(221, 195, jx);
  s += S.text(240, 222, 'two-way key on 2', { size: 10 });
  potChecks('comparing emfs', true, unknownL * k, unknownL);
  return svgDoc(400, 240, 'Potentiometer for comparing emfs: two cells E1 and E2, each with its positive terminal joined to A, go to the studs of a two-way key whose common stud leads through a galvanometer to the jockey; with the key on cell 2 the balancing length is 3.6 metres, and the ratio of the emfs equals the ratio of their balancing lengths', s);
})();
export const POT_INTERNAL = (() => {
  const { k, cellL1, cellL2, shunt } = POT_DATA;
  const { s: base, jx } = potBase(cellL2, 'l₂ = 2.5 m');
  let s = base;
  s += W(XA, 127, XA, 185) + W(XA, 185, 116, 185) + cellH(120, 185, 'E, r', { ly: -14 }) + W(124, 185, 198, 185) + meter(210, 185, 'G') + jockey(221, 185, jx);
  // resistance box R and key K2 across the cell
  s += dot(70, 185) + dot(170, 185) + W(70, 185, 70, 220) + W(70, 220, 80, 220) + resH(80, 128, 220, 'R = 9 Ω', { ly: 18 }) + W(128, 220, 138, 220) + key(141, 162, 220, '') + S.text(152, 238, 'K₂ closed', { a: 'middle', size: 10 }) + W(165, 220, 170, 220) + W(170, 220, 170, 185);
  const E = cellL1 * k;
  const r = (shunt * (cellL1 - cellL2)) / cellL2;
  const I = (cellL2 * k) / shunt;
  potChecks('internal resistance', true, cellL2 * k, cellL2);
  check(close(E - I * r, cellL2 * k), `potentiometer (internal resistance): E = ${E.toFixed(2)} V, r = ${r} ohm reproduces the terminal p.d. measured at l2`);
  return svgDoc(400, 250, 'Potentiometer for the internal resistance of a cell: the cell, positive terminal towards A, is connected through a galvanometer to the jockey, and a resistance box R of 9 ohms with a key K2 is joined across the cell; with K2 closed the balancing length falls from 3.0 metres to 2.5 metres', s);
})();

export const ALL = { CELL_LOAD, GROUPS, UNEQUAL, KIRCH, BRIDGE, METRE, POT, POT_COMPARE, POT_INTERNAL };
