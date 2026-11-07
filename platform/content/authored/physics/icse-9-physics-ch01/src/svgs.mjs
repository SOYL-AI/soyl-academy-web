// SVG diagrams for ICSE 9 Physics ch01: pictorial Vernier callipers and screw gauge readings (with zero errors, main and
// vernier or circular scales drawn to scale), a measuring cylinder, the two instruments with their parts (named and lettered),
// the simple pendulum and l against T^2 graphs. Geometry is computed here and self-checked (SELF_CHECKS).
import { svgDoc, S } from './lib.mjs';
import { V, S_, vernierZero, sMm, vTenths } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f3 = (n) => Math.round(n * 1000) / 1000;

// ---------------------------------------------------------------- Vernier callipers scales (1 MSD = 1 mm, 10 VSD = 9 MSD)
function vernier(rd, { neg = false, hl = false, mark = false, alt } = {}) {
  const k = 14; // px per mm
  const z = neg ? -0.2 : vernierZero(rd);
  const s0 = neg ? -4 : 10 * Math.floor(rd.msr / 10) - 4;
  const win = 28;
  const X0 = 20;
  const x = (mm) => X0 + (mm - s0) * k;
  const p = [];
  p.push(lab(X0, 12, 'Main scale (cm)', { c: MUT }));
  p.push(S.rect(x(s0), 18, win * k, 32, { fill: FILL, fop: 0.5 }));
  for (let m = Math.max(0, Math.ceil(s0)); m <= Math.floor(s0 + win); m++) {
    p.push(S.line(x(m), 50, x(m), m % 10 === 0 ? 62 : m % 5 === 0 ? 58 : 55, { w: 1.2 }));
    if (m % 10 === 0) p.push(lab(x(m), 38, String(m / 10), { a: 'middle', size: 12, w: 'bold' }));
  }
  p.push(S.rect(x(z), 70, 9 * k, 32, { fill: FILL, fop: 0.5 }));
  for (let j = 0; j <= 10; j++) {
    p.push(S.line(x(z + 0.9 * j), 70, x(z + 0.9 * j), j % 5 === 0 ? 58 : 62, { w: 1.2 }));
    if (j % 2 === 0) p.push(lab(x(z + 0.9 * j), 95, String(j), { a: 'middle', size: 10 }));
  }
  p.push(lab(X0, 122, 'Vernier scale', { c: MUT }));
  if (hl) {
    p.push(S.line(x(z + 0.9 * rd.n), 50, x(z + 0.9 * rd.n), 70, { c: RED, w: 2.2 }));
    p.push(lab(x(z + 0.9 * rd.n), 136, `line ${rd.n} coincides`, { a: 'middle', c: RED, size: 11 }));
  }
  if (mark) {
    p.push(S.arrow(x(z), 138, x(z), 104, { c: GREEN, w: 1.5, size: 6 }));
    p.push(lab(x(z), 150, 'vernier zero', { a: 'middle', c: GREEN, size: 11 }));
  }
  const W = 2 * X0 + win * k;
  return svgDoc(W, hl || mark ? 160 : 132, alt, p.join(''));
}
const altV = (what, extra = '') => `A Vernier callipers scale drawn to scale: main scale in centimetres with millimetre marks above a vernier scale of ten divisions numbered 0 to 10. ${what}${extra}`;
export const VERN = {
  ex1: vernier(V.ex1, { hl: true, mark: true, alt: altV('The vernier zero lies just after the 23rd millimetre mark and the 4th vernier line coincides with a main-scale line.') }),
  ex1Plain: vernier(V.ex1, { alt: altV('Reading to be found.') }),
  exClosed: vernier(V.exClosed, { hl: true, alt: altV('Jaws closed: the vernier zero is 0.3 mm to the right of the main-scale zero and the 3rd vernier line coincides.') }),
  ex2: vernier(V.ex2, { alt: altV('A cylinder is held between the jaws. The vernier zero lies just after the 14th millimetre mark.') }),
  q1: vernier(V.q1, { alt: altV('The vernier zero lies between the 36th and 37th millimetre marks.') }),
  qMcq: vernier(V.qMcq, { alt: altV('The vernier zero lies between the 12th and 13th millimetre marks.') }),
  q2: vernier(V.q2, { alt: altV('The vernier zero lies between the 27th and 28th millimetre marks.') }),
  q2Closed: vernier(V.q2Closed, { alt: altV('Jaws closed: the vernier zero is slightly to the right of the main-scale zero.') }),
  longClosed: vernier(V.longClosed, { neg: true, alt: altV('Jaws closed: the vernier zero is slightly to the left of the main-scale zero.') }),
  longObs: vernier(V.longObs, { alt: altV('A metal cylinder is held between the jaws. The vernier zero lies between the 45th and 46th millimetre marks.') }),
  bob: vernier(V.bob, { alt: altV('The diameter of a pendulum bob is being measured. The vernier zero lies between the 30th and 31st millimetre marks.') }),
};
// lettered-line version for one question: the figure with the five lines of interest named A to E is not needed; the readings are the task.
check(vTenths(V.ex1) === 234 && V.ex1.msr * 10 + V.ex1.n === 234, 'Vernier example: 23 mm + 4 x 0.1 mm = 23.4 mm');

// ---------------------------------------------------------------- micrometre screw gauge: sleeve (linear scale) and thimble (circular scale)
function screw(rd, { closed = null, hl = false, alt } = {}) {
  const k = 36; // px per mm on the linear scale
  const X0 = 56;
  const d = 8; // px per circular-scale division
  const x = (mm) => X0 + mm * k;
  const edge = closed === 'neg' ? -(100 - rd.csr) * 0.01 : closed === 'pos' ? rd.csr * 0.01 : rd.msr + rd.csr * 0.01;
  const xe = x(edge);
  const yd = 75;
  const p = [];
  p.push(S.rect(X0 - 50, 58, xe - (X0 - 50), 34, { fill: FILL, fop: 0.5 }));
  p.push(S.line(X0 - 50, yd, xe + 34, yd, { w: 1.2 }));
  p.push(lab(X0 - 40, 14, 'Linear scale (mm)', { c: MUT }));
  p.push(S.rect(xe, 24, 120, 102, { fill: FILL, fop: 0.7 }));
  p.push(lab(xe + 50, 120, 'Circular scale', { c: MUT, size: 10 }));
  for (let m = 0; m <= 6; m++) {
    if (x(m) > xe + 0.01 && !(closed && m === 0)) break;
    p.push(S.line(x(m), yd, x(m), yd - 13, { w: 1.4 }));
    p.push(lab(closed ? x(m) - 6 : x(m), 52, String(m), { a: closed ? 'end' : 'middle', size: 12, w: 'bold' }));
  }
  for (let n = rd.csr - 5; n <= rd.csr + 5; n++) {
    const y = yd + (n - rd.csr) * d;
    const five = (((n % 100) + 100) % 100) % 5 === 0;
    p.push(S.line(xe, y, xe + (five ? 18 : 10), y, { w: five ? 1.4 : 1 }));
    if (five) p.push(lab(xe + 24, y + 4, String(((n % 100) + 100) % 100), { size: 11 }));
  }
  p.push(lab(X0 - 40, 136, 'datum line along the sleeve', { c: MUT, size: 10 }));
  if (hl) {
    p.push(S.line(xe, yd, xe + 18, yd, { c: RED, w: 2.4 }));
    p.push(lab(xe + 52, yd + 4, `← ${((rd.csr % 100) + 100) % 100}`, { c: RED, size: 12, w: 'bold' }));
  }
  return svgDoc(420, 142, alt, p.join(''));
}
const altS = (what) => `A micrometre screw gauge reading, with the linear scale in millimetres on the sleeve and the circular scale of 100 divisions on the thimble; the datum line runs along the sleeve. ${what}`;
export const SCREW = {
  ex1: screw(S_.ex1, { hl: true, alt: altS('The thimble edge lies just after the 5 mm mark and division 37 is on the datum line.') }),
  exClosed: screw(S_.exClosed, { closed: 'pos', alt: altS('Jaws closed: the thimble edge lies at the zero mark and division 6 is on the datum line.') }),
  ex2: screw(S_.ex2, { alt: altS('A wire is held between the jaws. The thimble edge lies just after the 2 mm mark.') }),
  q1: screw(S_.q1, { alt: altS('The thimble edge lies between the 1 mm and 2 mm marks.') }),
  qMcq: screw(S_.qMcq, { alt: altS('The thimble edge lies between the 3 mm and 4 mm marks.') }),
  q2: screw(S_.q2, { alt: altS('A wire is held between the jaws. No millimetre mark beyond the zero is visible.') }),
  q2Closed: screw(S_.q2Closed, { closed: 'neg', alt: altS('Jaws closed: the thimble edge lies at the zero mark and division 94 is on the datum line.') }),
  longClosed: screw(S_.longClosed, { closed: 'pos', alt: altS('Jaws closed: division 4 is on the datum line.') }),
  longObs: screw(S_.longObs, { alt: altS('A wire is held between the jaws. The thimble edge lies between the 1 mm and 2 mm marks.') }),
  shortClosed: screw(S_.shortClosed, { closed: 'neg', alt: altS('Jaws closed: division 97 is on the datum line.') }),
};
check(sMm(S_.ex1) === 5.37, 'screw gauge example: 5 mm + 37 x 0.01 mm = 5.37 mm, thimble edge drawn 0.37 mm beyond the 5 mm mark');

// ---------------------------------------------------------------- the two instruments with their parts (named and lettered)
function screwParts(lettered) {
  const p = [];
  p.push(S.path('M104 72 V34 H196 V62', { w: 7, c: MUT }));
  p.push(S.rect(92, 72, 28, 16, { fill: BLUE, c: BLUE, fop: 0.4 })); // anvil
  p.push(S.circle(130, 80, 9, { fill: GREEN, c: GREEN, fop: 0.4 })); // wire
  p.push(S.rect(140, 75, 62, 10, { fill: BLUE, c: BLUE, fop: 0.4 })); // spindle
  p.push(S.rect(172, 62, 112, 36, { fill: FILL, fop: 0.6 })); // sleeve
  for (let i = 0; i < 9; i++) p.push(S.line(180 + i * 11, 80, 180 + i * 11, 70, { w: 1.2 }));
  p.push(S.rect(250, 48, 96, 64, { fill: FILL, fop: 0.9, rx: 4 })); // thimble
  for (let i = 0; i < 9; i++) p.push(S.line(250, 54 + i * 7, 262, 54 + i * 7, { w: 1.1 }));
  p.push(S.rect(346, 64, 40, 32, { fill: RED, c: RED, fop: 0.3, rx: 6 })); // ratchet
  const L = (x, y, t, a = 'middle') => (lettered ? S.text(x, y, t.l, { a, size: 15, w: 'bold', c: RED }) : lab(x, y, t.n, { a }));
  p.push(L(106, 118, { l: 'A', n: 'Anvil' }), S.lead(106, 104, 106, 90));
  p.push(L(166, 126, { l: 'B', n: 'Spindle' }), S.lead(170, 112, 170, 86));
  p.push(L(226, 22, { l: 'C', n: 'Sleeve (linear scale)' }), S.lead(226, 28, 226, 62));
  p.push(L(298, 138, { l: 'D', n: 'Thimble (circular scale)' }), S.lead(298, 122, 298, 112));
  p.push(L(368, 118, { l: 'E', n: 'Ratchet' }), S.lead(368, 104, 368, 96));
  p.push(lab(130, 56, lettered ? 'wire' : 'wire', { a: 'middle', c: GREEN, size: 11 }), S.lead(130, 58, 130, 70));
  return svgDoc(420, 150, lettered ? 'A micrometre screw gauge with five parts lettered A to E: A at the fixed stud on the frame, B on the moving screw, C on the fixed barrel with the linear scale, D on the rotating barrel with the circular scale and E at the right-hand end' : 'A micrometre screw gauge with its parts named: anvil, spindle, sleeve with the linear scale, thimble with the circular scale and ratchet; a wire is held between the anvil and the spindle', p.join(''));
}
export const SCREW_PARTS = screwParts(false);
export const SCREW_PARTS_LETTERED = screwParts(true);

function vernierParts() {
  const p = [];
  const y = 40;
  p.push(S.rect(30, y, 330, 24, { fill: FILL, fop: 0.6 })); // main scale beam
  for (let i = 0; i <= 33; i++) p.push(S.line(30 + i * 10, y + 24, 30 + i * 10, y + (i % 5 === 0 ? 14 : 18), { w: 1 }));
  p.push(S.rect(30, y, 10, 100, { fill: BLUE, c: BLUE, fop: 0.35 })); // fixed jaw
  p.push(S.rect(130, y + 24, 80, 22, { fill: GREEN, c: GREEN, fop: 0.3 })); // vernier slider
  for (let i = 0; i <= 10; i++) p.push(S.line(132 + i * 7.2, y + 24, 132 + i * 7.2, y + 31, { w: 1 }));
  p.push(S.rect(120, y + 24, 12, 76, { fill: BLUE, c: BLUE, fop: 0.35 })); // movable jaw
  p.push(S.rect(40, y + 62, 80, 22, { fill: RED, c: RED, fop: 0.25, rx: 4 })); // object
  p.push(S.rect(176, y - 8, 18, 10, { fill: MUT, c: MUT, fop: 0.5 })); // locking screw
  p.push(lab(60, 22, 'Main scale', {}), S.lead(70, 26, 80, y + 4));
  p.push(lab(330, 128, 'Vernier scale', { a: 'end' }), S.lead(280, 118, 190, y + 40));
  p.push(lab(10, 170, 'Fixed jaw', {}), S.lead(34, 160, 34, y + 96));
  p.push(lab(150, 170, 'Movable jaw', {}), S.lead(150, 160, 128, y + 96));
  p.push(lab(226, 22, 'Locking screw', {}), S.lead(210, 26, 192, y - 6));
  p.push(lab(60, 112, 'Object', { c: RED }));
  return svgDoc(380, 184, 'Vernier callipers with the main scale along the beam, the fixed jaw on the left, the movable jaw carrying the vernier scale, a locking screw and an object held between the jaws', p.join(''));
}
export const VERNIER_PARTS = vernierParts();

// ---------------------------------------------------------------- measuring cylinder (LC 2 mL)
function cylinder(level, { alt }) {
  const k = 3; // px per mL
  const top = 20;
  const bot = top + 60 * k;
  const y = (v) => bot - v * k;
  const p = [];
  p.push(S.rect(110, top, 50, 60 * k, { w: 2 }));
  p.push(S.rect(110, y(level), 50, level * k, { fill: BLUE, c: BLUE, fop: 0.35, sw: 0 }));
  for (let v = 0; v <= 60; v += 2) {
    p.push(S.line(160, y(v), 160 - (v % 10 === 0 ? 14 : 8), y(v), { w: v % 10 === 0 ? 1.4 : 1 }));
    if (v % 10 === 0) p.push(lab(172, y(v) + 4, String(v), { size: 11 }));
  }
  p.push(lab(160, 14, 'mL', { a: 'end', c: MUT }));
  p.push(S.line(60, y(level), 110, y(level), { c: RED, w: 1.5, dash: '4 3' }));
  p.push(lab(56, y(level) + 4, 'water level', { a: 'end', c: RED, size: 11 }));
  return svgDoc(230, bot + 18, alt, p.join(''));
}
export const CYL = cylinder(46, { alt: 'A measuring cylinder marked from 0 to 60 mL with a small mark every 2 mL and numbers every 10 mL. The water level is on the 46 mL mark, 3 small divisions above the 40 mL mark' });

// ---------------------------------------------------------------- simple pendulum
export const PENDULUM = (() => {
  const O = [210, 22];
  const L = 170;
  const th = (18 * Math.PI) / 180;
  const pos = (a) => [O[0] + L * Math.sin(a), O[1] + L * Math.cos(a)];
  const [A, B, C] = [pos(0), pos(-th), pos(th)];
  const p = [];
  p.push(S.line(150, O[1], 270, O[1], { w: 4 }));
  p.push(S.line(O[0], O[1], A[0], A[1], { w: 1.4 }));
  p.push(S.line(O[0], O[1], B[0], B[1], { w: 1.2, c: MUT, dash: '4 3' }), S.line(O[0], O[1], C[0], C[1], { w: 1.2, c: MUT, dash: '4 3' }));
  for (const [q, c] of [[B, MUT], [C, MUT], [A, BLUE]]) p.push(S.circle(q[0], q[1], 12, { fill: c === BLUE ? BLUE : FILL, c, fop: 0.5 }));
  p.push(S.line(A[0], A[1] + 14, A[0], A[1] + 40, { c: MUT, w: 1, dash: '2 3' }));
  // effective length marker beside the string
  p.push(S.line(300, O[1], 300, A[1], { c: GREEN, w: 1.6 }), S.line(272, O[1], 306, O[1], { c: GREEN, w: 1, dash: '3 3' }), S.line(A[0] + 14, A[1], 306, A[1], { c: GREEN, w: 1, dash: '3 3' }));
  p.push(S.lines(310, (O[1] + A[1]) / 2 - 2, ['effective', 'length l'], { c: GREEN, size: 11 }));
  p.push(lab(O[0] + 6, O[1] - 8, 'O (point of suspension)', { size: 11 }));
  p.push(lab(A[0] - 20, A[1] + 4, 'A', { size: 13, w: 'bold', a: 'end' }), lab(B[0] - 20, B[1] + 4, 'B', { size: 13, w: 'bold', a: 'end' }), lab(C[0] + 20, C[1] + 4, 'C', { size: 13, w: 'bold' }));
  p.push(lab(A[0], A[1] + 56, 'mean position', { a: 'middle', c: MUT, size: 11 }));
  const span = Math.hypot(B[0] - O[0], B[1] - O[1]);
  check(Math.abs(span - L) < 1e-9 && Math.abs(B[1] - C[1]) < 1e-9 && Math.abs(A[0] - O[0]) < 1e-9, 'pendulum: both extreme positions are at the same height and at the same distance l from O as the mean position');
  return svgDoc(420, 270, 'A simple pendulum: a small heavy bob hangs by a thread from a rigid support at O. The effective length l is measured from O to the centre of the bob. The bob swings between extreme positions B and C through the mean position A; the path A to B to A to C to A is one complete oscillation', p.join(''));
})();

// ---------------------------------------------------------------- l against T^2 graph
function graph(data, { xMax = 5.5, yMax = 1.3, xStep = 0.5, yStep = 0.1, tri = null, alt }) {
  const L = 58;
  const R = 14;
  const T = 26;
  const B = 44;
  const W = 400;
  const H = 300;
  const pw = W - L - R;
  const ph = H - T - B;
  const x = (v) => L + (v / xMax) * pw;
  const y = (v) => T + ph - (v / yMax) * ph;
  const p = [];
  for (let v = 0; v <= xMax + 1e-9; v += xStep) {
    p.push(S.line(x(v), T, x(v), T + ph, { c: MUT, w: 0.5, dash: '2 3' }));
    if (Math.abs(v - Math.round(v)) < 1e-9) p.push(lab(x(v), T + ph + 15, String(Math.round(v)), { a: 'middle', size: 11 }));
  }
  for (let v = 0; v <= yMax + 1e-9; v += yStep) {
    p.push(S.line(L, y(v), L + pw, y(v), { c: MUT, w: 0.5, dash: '2 3' }));
    p.push(lab(L - 6, y(v) + 4, v.toFixed(1), { a: 'end', size: 11 }));
  }
  p.push(S.arrow(L, T + ph, L + pw + 6, T + ph, { w: 1.6, size: 6 }), S.arrow(L, T + ph, L, T - 8, { w: 1.6, size: 6 }));
  p.push(lab(L + pw / 2, H - 8, 'T² (s²)', { a: 'middle', size: 12, w: 'bold' }), lab(L + 4, 14, 'l (m)', { size: 12, w: 'bold' }));
  const xEnd = Math.min(xMax, yMax / data.slope);
  p.push(S.line(x(0), y(0), x(xEnd), y(data.slope * xEnd), { c: BLUE, w: 1.6 }));
  for (const [a, b] of data.pts) p.push(S.circle(x(a), y(b), 3.6, { fill: RED, c: RED }));
  if (tri) {
    const [P, Q] = tri;
    p.push(S.line(x(P[0]), y(P[1]), x(Q[0]), y(P[1]), { c: GREEN, w: 1.4, dash: '5 3' }), S.line(x(Q[0]), y(P[1]), x(Q[0]), y(Q[1]), { c: GREEN, w: 1.4, dash: '5 3' }));
    p.push(lab((x(P[0]) + x(Q[0])) / 2, y(P[1]) + 15, `ΔT² = ${f3(Q[0] - P[0])} s²`, { a: 'middle', c: GREEN, size: 11 }));
    p.push(lab(x(Q[0]) + 6, (y(P[1]) + y(Q[1])) / 2, `Δl = ${f3(Q[1] - P[1])} m`, { c: GREEN, size: 11 }));
  }
  return svgDoc(W, H, alt, p.join(''));
}
import { GRAPH_A, GRAPH_B } from './calc.mjs';
export const GRAPH_ALT_A = 'Graph of effective length l in metres on the vertical axis against T squared in seconds squared on the horizontal axis for a simple pendulum: five points lie on a straight line through the origin passing through (1.0, 0.25), (2.4, 0.60) and (4.0, 1.00)';
export const GRAPH_PLAIN_A = graph(GRAPH_A, { xMax: 5, yMax: 1.2, alt: GRAPH_ALT_A });
export const GRAPH_TRI_A = graph(GRAPH_A, { xMax: 5, yMax: 1.2, tri: [[1.6, 0.4], [4.0, 1.0]], alt: `${GRAPH_ALT_A}. A dashed right-angled triangle on the line has a horizontal side from 1.6 to 4.0 and a vertical side from 0.40 to 1.00` });
export const GRAPH_B_FIG = graph(GRAPH_B, { alt: 'Graph of effective length l in metres against T squared in seconds squared for a simple pendulum: four points lie on a straight line through the origin; the line passes through (2.5, 0.60) and (5.0, 1.20)' });
export const CYL2 = cylinder(34, { alt: 'A measuring cylinder marked from 0 to 60 mL with a small mark every 2 mL and numbers every 10 mL. The water level is 2 small divisions above the 30 mL mark' });
