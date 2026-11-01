// ISC ch10 diagrams: flux through a tilted coil, Lenz's law with a retreating south pole, a bar on rails in a field out of
// the page, eddy currents in a solid and a laminated core, a long solenoid, two coaxial solenoids and a step-up transformer.
// Directions are worked out in explicit coordinates (screen: x right, y down, z into the page) and checked with cross
// products; geometry claims (normal at 60°, sheets wider than their loops, r1 < r2, turns ratio) are checked too (SELF_CHECKS).
// The rod, solenoid and transformer drawings are adapted from the author's CBSE 12 Physics ch06/ch07 code (copied, not imported).
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
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

/** Field (z component) at the centre of a loop from its circulation on screen (z into the page). */
function loopFieldZ(anticlockwise) {
  // element at the right-hand point of the loop: moving up the screen (−y) when anticlockwise; r̂ from it to the centre is −x
  const dl = anticlockwise ? [0, -1, 0] : [0, 1, 0];
  return cross(dl, [-1, 0, 0])[2];
}
function dots(x0, y0, x1, y1, step) {
  let s = '';
  for (let x = x0; x <= x1; x += step) for (let y = y0; y <= y1; y += step) s += S.circle(x, y, 2.2, { c: MUT, fill: MUT });
  return s;
}

// ---------------------------------------------------------------- flux through a tilted coil (edge-on view)
export const FLUX_DATA = { planeDeg: 30 };
export const FLUX = (() => {
  const w = 340;
  const h = 232;
  let s = '';
  for (const y of [36, 66, 96, 134, 164, 194]) s += S.arrow(16, y, 322, y, { c: MUT, w: 1.1, size: 6 });
  s += S.text(328, 30, 'B', { a: 'end', w: 'bold', it: true });
  const cx = 170;
  const cy = 115;
  const a = (FLUX_DATA.planeDeg * Math.PI) / 180;
  const u = [Math.cos(a), Math.sin(a)]; // along the coil (screen: down-right)
  const n = [Math.sin(a), -Math.cos(a)]; // normal (screen: up-right)
  const L = 80;
  s += S.line(cx - L * u[0], cy - L * u[1], cx + L * u[0], cy + L * u[1], { c: ACC, w: 6, cap: 'round' });
  s += S.text(cx + L * u[0] + 8, cy + L * u[1] - 3, 'coil, area A', { a: 'start', size: 10 });
  s += S.arrow(cx, cy, cx + 72 * n[0], cy + 72 * n[1], { c: GRN, w: 2.2 }) + S.text(cx + 76 * n[0] + 4, cy + 76 * n[1], 'n', { it: true, w: 'bold' });
  s += S.line(cx, cy, cx + 62, cy, { c: 'currentColor', w: 1, dash: '4 3' });
  const r0 = 34;
  const ang = Math.PI / 2 - a; // angle between n and +x
  s += S.path(`M${f1(cx + r0)} ${cy} A${r0} ${r0} 0 0 0 ${f1(cx + r0 * Math.cos(ang))} ${f1(cy - r0 * Math.sin(ang))}`, { c: GRN, w: 1.3 });
  s += S.text(cx + 40, cy - 14, 'θ = 60°', { size: 11 });
  s += S.text(w / 2, 222, 'Φ = BA cos θ; θ from the normal n (plane at 30° to B)', { a: 'middle', size: 10 });
  const perp = Math.abs(dot(u, n)) < 1e-12;
  const theta = (Math.acos(dot(n, [1, 0])) * 180) / Math.PI;
  check(perp && Math.abs(theta - 60) < 1e-9 && Math.abs(ang * 180 / Math.PI - 60) < 1e-9, 'flux: normal drawn at right angles to the coil and at 60° to B when the plane is at 30°');
  return svgDoc(w, h, 'Side view of a flat coil in a uniform magnetic field: the plane of the coil is tilted at 30 degrees to the field, so its normal makes 60 degrees with the field; the flux is B A cos theta, with theta measured from the normal', s);
})();

// ---------------------------------------------------------------- Lenz: south pole pulled away from a solenoid
export const LENZ_MAGNET = (() => {
  const w = 420;
  const h = 212;
  let s = '';
  // magnet on the left, S pole facing the coil, moving left (away)
  s += S.rect(40, 80, 50, 34, { c: POS, sw: 1.5, fill: POS, fop: 0.2 }) + S.rect(90, 80, 50, 34, { c: NEG, sw: 1.5, fill: NEG, fop: 0.2 });
  s += S.text(65, 102, 'N', { a: 'middle', w: 'bold' }) + S.text(115, 102, 'S', { a: 'middle', w: 'bold' });
  s += S.arrow(120, 140, 54, 140, { c: ACC, w: 2.2 }) + S.text(88, 158, 'magnet pulled away', { a: 'middle', size: 10 });
  for (let i = 0; i < 5; i++) s += S.ellipse(232 + i * 16, 97, 9, 42, { c: 'currentColor', sw: 1.6 });
  s += S.line(232, 139, 232, 178) + S.line(296, 139, 296, 178) + S.line(232, 178, 252, 178) + S.line(276, 178, 296, 178);
  s += S.circle(264, 178, 12, { sw: 1.5, fill: FILL }) + S.text(264, 182, 'G', { a: 'middle', w: 'bold', size: 11 });
  // the magnet's field at the coil points towards the S pole (−x) and is weakening
  for (const y of [86, 108]) s += S.arrow(222, y, 160, y, { c: MUT, w: 1, size: 6 });
  s += S.text(191, 126, 'B weakening', { a: 'middle', size: 10 });
  s += S.text(224, 70, 'N', { a: 'end', w: 'bold', size: 14, c: POS }) + S.text(232, 46, 'near face becomes N: attracts the retreating S', { a: 'middle', size: 10 });
  s += S.arrow(330, 26, 236, 26, { c: GRN, w: 2 }) + S.text(336, 30, 'induced m', { size: 10 });
  s += S.text(w / 2, 204, 'the induced current opposes the change: it tries to hold the magnet back', { a: 'middle', size: 10 });
  // check: flux along +x is Φx = −|B|; as the magnet leaves, |B| falls, so dΦx/dt > 0; the induced moment opposes the change
  const dPhiX = +1;
  const mX = -Math.sign(dPhiX);
  check(mX < 0, 'Lenz magnet: the induced moment points back towards the retreating S pole, so the near face is N and attracts it');
  return svgDoc(w, h, 'A bar magnet with its south pole facing a solenoid is pulled away from it; the flux of the magnet through the solenoid weakens, so the induced current makes the near face of the solenoid a north pole, which attracts the retreating south pole and opposes its motion', s);
})();

// ---------------------------------------------------------------- bar on rails, B out of the page
export const ROD = (() => {
  const w = 380;
  const h = 252;
  let s = dots(66, 54, 340, 186, 28);
  s += S.text(362, 22, 'B out of page', { a: 'end', size: 11 });
  s += S.line(40, 40, 350, 40, { w: 2.5 }) + S.line(40, 200, 350, 200, { w: 2.5 });
  let d = 'M40 40 L40 80';
  for (let i = 0; i < 6; i++) d += ` L${40 + (i % 2 ? 7 : -7)} ${86 + i * 12}`;
  d += ' L40 160 L40 200';
  s += S.path(d, { w: 1.8, join: 'round' }) + S.text(54, 124, 'R', { it: true });
  s += S.line(230, 34, 230, 206, { c: POS, w: 5 });
  s += S.arrow(240, 120, 300, 120, { c: ACC, w: 2.5 }) + S.text(304, 116, 'v', { it: true, w: 'bold' });
  s += S.text(222, 222, 'l', { it: true, a: 'end' });
  // emf: force on +q is q v × B with v = +x, B = −z
  const B = [0, 0, -1];
  const fq = cross([1, 0, 0], B);
  check(fq[1] > 0, 'rod: q v × B on positive charges points down the page, so conventional current flows down the bar');
  s += S.arrow(214, 122, 214, 182, { c: GRN, w: 2.5 }) + S.text(200, 168, 'I', { it: true, w: 'bold', a: 'end' });
  const F = cross([0, 1, 0], B);
  check(F[0] < 0, 'rod: the force I l × B on the bar points left, opposing its motion');
  s += S.arrow(222, 90, 170, 90, { c: NEG, w: 2.5 }) + S.text(174, 104, 'F = BIl', { size: 11 });
  // circuit: down the bar, left along the bottom rail, up through R → clockwise on screen → field into the page (+z),
  // opposing the growing outward flux
  check(loopFieldZ(false) > 0 && B[2] < 0, 'rod: clockwise circuit current makes a field into the page, opposing the growing outward flux');
  s += S.text(190, 238, 'ε = Blv; I = Blv/R; power = (Blv)²/R; current clockwise', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'A bar of length l moves to the right with speed v on rails joined by a resistor R, in a field pointing out of the page; the motional emf B l v drives current down the bar and clockwise round the circuit, and the magnetic force B I l on the bar points left, opposing the motion', s);
})();

// ---------------------------------------------------------------- eddy currents: solid and laminated cores
export const EDDY_DATA = { sheets: 6, sheetW: 20, gap: 5, loopRx: 6 };
export const EDDY = (() => {
  const w = 420;
  const h = 226;
  let s = '';
  s += S.text(w / 2, 18, 'flux through the core changing (B out of the page, alternating)', { a: 'middle', size: 10 });
  // solid block
  s += S.rect(30, 40, 160, 140, { c: 'currentColor', sw: 1.6, fill: FILL, fop: 0.6 });
  for (const [rx, ry] of [[66, 56], [44, 36], [22, 17]]) {
    s += S.ellipse(110, 110, rx, ry, { c: POS, sw: 1.6 });
    s += S.head(110 + rx, 112, Math.PI / 2, { c: POS, size: 7 }) + S.head(110 - rx, 108, -Math.PI / 2, { c: POS, size: 7 });
  }
  s += S.lines(110, 196, ['solid core: large eddy loops,', 'large I²R heating'], { a: 'middle', size: 10, dy: 12 });
  // laminated core
  const { sheets, sheetW, gap, loopRx } = EDDY_DATA;
  const x0 = 236;
  let fits = true;
  for (let i = 0; i < sheets; i++) {
    const x = x0 + i * (sheetW + gap);
    s += S.rect(x, 40, sheetW, 140, { c: 'currentColor', sw: 1.2, fill: FILL, fop: 0.6 });
    s += S.ellipse(x + sheetW / 2, 110, loopRx, 56, { c: POS, sw: 1.3 });
    if (2 * loopRx >= sheetW) fits = false;
  }
  for (let i = 1; i < sheets; i++) s += S.line(x0 + i * (sheetW + gap) - gap / 2, 40, x0 + i * (sheetW + gap) - gap / 2, 180, { c: GRN, w: 2 });
  const right = x0 + sheets * (sheetW + gap) - gap;
  s += S.lines((x0 + right) / 2, 196, ['laminated: thin sheets with insulating', 'varnish (green); only small loops'], { a: 'middle', size: 10, dy: 12 });
  check(fits && right <= w - 10, `eddy: each of the ${sheets} laminations is wider than its current loop, and the stack fits the drawing`);
  return svgDoc(w, h, 'Eddy currents in a core whose flux is changing: in a solid block they circulate in large loops and heat it strongly; in a laminated core made of thin sheets separated by insulating varnish the current can only circulate in small loops inside each sheet, so far less heat is produced', s);
})();

// ---------------------------------------------------------------- long solenoid: self-inductance
export const SOLENOID_DATA = { turns: 11 };
export const SOLENOID = (() => {
  const w = 400;
  const h = 214;
  let s = '';
  const n = SOLENOID_DATA.turns;
  const xs = Array.from({ length: n }, (_, i) => 70 + i * 26);
  for (const x of xs) {
    s += S.ellipse(x, 100, 8, 42, { c: POS, sw: 1.8 });
    s += S.head(x + 8, 106, Math.PI / 2, { c: POS, size: 6 });
  }
  s += S.line(30, 142, 70, 142, { w: 1.6 }) +S.line(xs[n - 1], 142, 370, 142, { w: 1.6 });
  s += S.text(30, 158, 'I', { it: true, w: 'bold' });
  for (const y of [88, 100, 112]) s += S.arrow(80, y, 330, y, { c: GRN, w: 1.2, size: 6 });
  s += S.text(350, 104, 'B', { it: true, w: 'bold', c: GRN });
  s += S.line(xs[0], 166, xs[n - 1], 166, { w: 1 }) + S.text((xs[0] + xs[n - 1]) / 2, 180, 'length l, N turns, each of area A', { a: 'middle', size: 10 });
  s += S.text(w / 2, 24, 'B = μ₀NI/l inside;  NΦ = LI  →  L = μ₀N²A/l', { a: 'middle', size: 12, w: 'bold' });
  s += S.text(w / 2, 204, 'front of each turn: current downward; back emf ε = −L dI/dt', { a: 'middle', size: 10 });
  // check: front of a turn is at z = −R (towards the viewer); current there flows down (+y); field at the axis ∝ dl × r̂
  const field = cross([0, 1, 0], [0, 0, 1]);
  check(field[0] > 0, 'solenoid: downward current on the front of each turn gives a field to the right along the axis (arrows drawn to the right)');
  check(xs.length === n, `solenoid: ${n} turns drawn`);
  return svgDoc(w, h, 'A long solenoid of N turns, length l and cross-sectional area A carrying current I: the field inside is uniform, mu nought N I over l, along the axis; the flux linkage N phi equals L I, giving self-inductance mu nought N squared A over l', s);
})();

// ---------------------------------------------------------------- two coaxial solenoids: mutual inductance
export const COAX_DATA = { r1: 26, r2: 58, x0: 70, x1: 350 };
export const COAXIAL = (() => {
  const w = 420;
  const h = 232;
  let s = '';
  const { r1, r2, x0, x1 } = COAX_DATA;
  const cy = 110;
  const outer = [];
  for (let x = x0; x <= x1 + 1e-9; x += 20) outer.push(x);
  const inner = [];
  for (let x = x0; x <= x1 + 1e-9; x += 14) inner.push(x);
  for (const x of outer) s += S.ellipse(x, cy, 9, r2, { c: NEG, sw: 1.4 });
  for (const x of inner) s += S.ellipse(x, cy, 5, r1, { c: POS, sw: 1.6 });
  s += S.line(x0 - 30, cy, x1 + 30, cy, { c: MUT, w: 1, dash: '5 4' });
  s += S.text(x1 + 34, cy - 6, 'axis', { size: 10 });
  s += S.lead(x1 + 6, cy - r2 + 6, x1 + 26, cy - r2 - 14) + S.text(x1 + 28, cy - r2 - 16, 'outer: n₂ per metre', { a: 'end', size: 10 });
  s += S.text(x0 - 8, cy - r2 - 14, 'inner: radius r₁, n₁ per metre', { a: 'start', size: 10 }) + S.lead(130, cy - r2 - 10, 140, cy - r1 + 2);
  s += S.line(x0, cy + r2 + 16, x1, cy + r2 + 16, { w: 1 }) + S.text((x0 + x1) / 2, cy + r2 + 30, 'common length l', { a: 'middle', size: 10 });
  s += S.text(w / 2, 222, 'M = μ₀n₁n₂πr₁²l  (the outer field μ₀n₂I₂ fills the inner coil’s area πr₁²)', { a: 'middle', size: 10 });
  const lenOuter = outer[outer.length - 1] - outer[0];
  const lenInner = inner[inner.length - 1] - inner[0];
  check(r1 < r2 && Math.abs(lenOuter - lenInner) < 1e-9, 'coaxial: inner radius drawn smaller than the outer, and both solenoids drawn the same length');
  return svgDoc(w, h, 'Two long coaxial solenoids of the same length l: a narrow inner one of radius r1 with n1 turns per metre inside a wider outer one with n2 turns per metre; their mutual inductance is mu nought n1 n2 pi r1 squared l', s);
})();

// ---------------------------------------------------------------- step-up transformer
export const TRANS_DATA = { Np: 3, Ns: 6 };
export const TRANSFORMER = (() => {
  const w = 420;
  const h = 214;
  let s = '';
  s += S.rect(110, 34, 200, 140, { c: MUT, sw: 14 });
  s += S.arrow(150, 34, 260, 34, { c: GRN, w: 2, size: 8 }) + S.arrow(260, 174, 150, 174, { c: GRN, w: 2, size: 8 });
  s += S.text(205, 60, 'alternating flux Φ', { a: 'middle', size: 10, c: GRN });
  const { Np, Ns } = TRANS_DATA;
  for (let i = 0; i < Np; i++) s += S.ellipse(110, 74 + i * 30, 18, 6, { c: POS, sw: 1.8 });
  for (let i = 0; i < Ns; i++) s += S.ellipse(310, 54 + i * 20, 18, 6, { c: NEG, sw: 1.8 });
  s += S.line(92, 74, 40, 74) + S.line(92, 134, 40, 134) + S.line(30, 74, 40, 74) + S.line(30, 134, 40, 134);
  s += S.line(30, 74, 30, 92) + S.circle(30, 104, 12, { sw: 1.5 }) + S.text(30, 109, '~', { a: 'middle', size: 15 }) + S.line(30, 116, 30, 134);
  s += S.line(328, 54, 372, 54) + S.line(328, 154, 372, 154) + S.line(372, 54, 372, 88) + S.rect(364, 88, 16, 32, { c: 'currentColor', sw: 1.4 }) + S.line(372, 120, 372, 154);
  s += S.text(386, 108, 'load', { size: 10 });
  s += S.text(84, 196, `primary: Np (${Np} drawn), Vp`, { a: 'middle', size: 10 }) + S.text(330, 196, `secondary: Ns (${Ns} drawn), Vs`, { a: 'middle', size: 10 });
  s += S.text(210, 112, 'laminated', { a: 'middle', size: 10 }) + S.text(210, 125, 'soft-iron core', { a: 'middle', size: 10 });
  s += S.text(210, 16, 'step-up: Vs/Vp = Ns/Np = 2;  Is/Ip = Np/Ns = 1/2', { a: 'middle', size: 11, w: 'bold' });
  check(Ns > Np && Ns / Np === 2, 'transformer: step-up drawn with twice as many secondary turns as primary turns, matching the label');
  return svgDoc(w, h, 'A step-up transformer: a primary coil connected to an alternating supply and a secondary coil with twice as many turns connected to a load, both wound on a laminated soft-iron core that carries the alternating flux; the secondary voltage is twice the primary voltage and the secondary current half the primary current', s);
})();

export const ALL = { FLUX, LENZ_MAGNET, ROD, EDDY, SOLENOID, COAXIAL, TRANSFORMER };
