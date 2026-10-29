// ch06 diagrams. Induced-current directions are found from Lenz's law in explicit coordinates (screen: x right, y down,
// z into the page) and checked with cross products: the induced loop current's own field must oppose the change of flux,
// and the force on a sliding rod must oppose its motion (SELF_CHECKS, read by build.mjs).
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

function grid(x0, y0, x1, y1, step, into) {
  let s = '';
  for (let x = x0; x <= x1; x += step)
    for (let y = y0; y <= y1; y += step)
      s += into ? S.line(x - 4, y - 4, x + 4, y + 4, { c: MUT, w: 1.1 }) + S.line(x - 4, y + 4, x + 4, y - 4, { c: MUT, w: 1.1 }) : S.circle(x, y, 2.2, { c: MUT, fill: MUT });
  return s;
}

/** Field (z component) at the centre of a loop from its circulation: anticlockwise on screen gives −z (out of page). */
function loopFieldZ(anticlockwise) {
  // element at the right-hand point moving "up" (−y) for anticlockwise-on-screen; r̂ from element to centre = −x
  const dl = anticlockwise ? [0, -1, 0] : [0, 1, 0];
  return cross(dl, [-1, 0, 0])[2];
}

// ---------------------------------------------------------------- Lenz's law on a loop: B into the page and increasing
export const LENZ_LOOP = (() => {
  const w = 320;
  const h = 230;
  let s = grid(30, 30, 290, 200, 26, true);
  s += S.text(300, 18, 'B into page, increasing', { a: 'end', size: 11 });
  s += S.circle(160, 115, 70, { c: POS, sw: 3 });
  // flux into the page (+z) increasing → induced field must be out of the page (−z) → anticlockwise on screen
  const zAnti = loopFieldZ(true);
  check(zAnti < 0, 'Lenz loop: an anticlockwise (on screen) current makes a field out of the page, opposing the growing inward flux');
  // anticlockwise arrows on screen
  s += S.head(230, 108, -Math.PI / 2, { c: ACC, size: 10 }) + S.head(90, 122, Math.PI / 2, { c: ACC, size: 10 });
  s += S.head(153, 45, Math.PI, { c: ACC, size: 10 }) + S.head(167, 185, 0, { c: ACC, size: 10 });
  s += S.text(160, 120, 'induced I', { a: 'middle', size: 12, w: 'bold' });
  s += S.text(160, 222, 'its own field points out of the page, opposing the increase', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'A loop in a magnetic field directed into the page that is growing stronger: the induced current flows anticlockwise, so that its own field points out of the page and opposes the increase in flux', s);
})();

// ---------------------------------------------------------------- magnet approaching a coil (side view)
export const MAGNET_COIL = (() => {
  const w = 400;
  const h = 200;
  let s = '';
  // magnet moving right towards the coil, N pole facing the coil
  s += S.rect(30, 80, 50, 34, { c: NEG, sw: 1.5, fill: NEG, fop: 0.2 }) + S.rect(80, 80, 50, 34, { c: POS, sw: 1.5, fill: POS, fop: 0.2 });
  s += S.text(55, 102, 'S', { a: 'middle', w: 'bold' }) + S.text(105, 102, 'N', { a: 'middle', w: 'bold' });
  s += S.arrow(60, 140, 120, 140, { c: ACC, w: 2.2 }) + S.text(90, 158, 'magnet moves in', { a: 'middle', size: 10 });
  // coil drawn as ellipses (front halves)
  for (let i = 0; i < 5; i++) s += S.ellipse(220 + i * 16, 97, 9, 42, { c: 'currentColor', sw: 1.6 });
  s += S.line(220, 139, 220, 175) + S.line(284, 139, 284, 175) + S.line(220, 175, 236, 175) + S.line(268, 175, 284, 175);
  s += S.circle(252, 175, 12, { sw: 1.5, fill: FILL }) + S.text(252, 179, 'G', { a: 'middle', w: 'bold', size: 11 });
  s += S.text(212, 72, 'N', { a: 'end', w: 'bold', size: 14, c: POS }) + S.text(204, 52, 'near face becomes N', { a: 'end', size: 10 });
  // check: the flux through the coil towards +x (field from the magnet's N pole points into the coil, +x) is increasing,
  // so the induced moment must point −x, i.e. the coil's left face is a N pole (field leaves the coil to the left).
  const fluxChange = +1; // B along +x increasing
  const inducedMomentX = -Math.sign(fluxChange);
  check(inducedMomentX < 0, 'magnet and coil: induced moment points back towards the magnet, so the near face is a N pole and repels it');
  s += S.arrow(300, 30, 210, 30, { c: GRN, w: 2 }) + S.text(306, 34, 'induced m', { size: 10 });
  return svgDoc(w, h, 'A bar magnet moved with its north pole towards a coil connected to a galvanometer: the induced current makes the near face of the coil a north pole, which repels the approaching magnet, as Lenz’s law requires', s);
})();

// ---------------------------------------------------------------- sliding rod on rails (B into the page)
export const ROD = (() => {
  const w = 380;
  const h = 240;
  let s = grid(60, 50, 340, 190, 28, true);
  s += S.text(360, 22, 'B into page', { a: 'end', size: 11 });
  s += S.line(40, 40, 350, 40, { w: 2.5 }) + S.line(40, 200, 350, 200, { w: 2.5 });
  // resistor at the left end
  let d = 'M40 40 L40 80';
  for (let i = 0; i < 6; i++) d += ` L${40 + (i % 2 ? 7 : -7)} ${86 + i * 12}`;
  d += ' L40 160 L40 200';
  s += S.path(d, { w: 1.8, join: 'round' }) + S.text(54, 124, 'R', { it: true });
  s += S.line(230, 34, 230, 206, { c: POS, w: 5 });
  s += S.arrow(240, 120, 300, 120, { c: ACC, w: 2.5 }) + S.text(304, 116, 'v', { it: true, w: 'bold' });
  s += S.text(222, 222, 'l', { it: true, a: 'end' });
  // EMF direction in the rod: force on +q is q v × B
  const fq = cross([1, 0, 0], [0, 0, 1]);
  check(fq[1] < 0, 'rod: q v × B on positive charges in the rod points up the page, so conventional current flows up the rod');
  s += S.arrow(230, 170, 230, 70, { c: GRN, w: 2.5 }) + S.text(242, 84, 'I', { it: true, w: 'bold' });
  // force on the rod: I L × B with L up
  const F = cross([0, -1, 0], [0, 0, 1]);
  check(F[0] < 0, 'rod: the force I l × B on the rod points left, opposing its motion (Lenz)');
  s += S.arrow(222, 150, 170, 150, { c: NEG, w: 2.5 }) + S.text(176, 142, 'F = IlB', { size: 11 });
  s += S.text(190, 236, 'ε = Blv; current anticlockwise round the circuit', { a: 'middle', size: 10 });
  // the circuit current: up the rod, left along the top rail, down through R → anticlockwise on screen
  return svgDoc(w, h, 'A rod of length l slides to the right with speed v on rails in a field into the page; the motional emf B l v drives current up the rod and round the circuit through R, and the magnetic force I l B on the rod points to the left, opposing the motion', s);
})();

// ---------------------------------------------------------------- self-inductance (back emf)
export const SELF = (() => {
  const w = 360;
  const h = 170;
  let s = '';
  let d = 'M60 90';
  for (let i = 0; i < 8; i++) d += ` C${70 + i * 28} 40 ${86 + i * 28} 40 ${88 + i * 28} 90`;
  s += S.path(d, { c: POS, w: 2.2 });
  s += S.line(20, 90, 60, 90, { w: 1.8 }) + S.line(284, 90, 340, 90, { w: 1.8 });
  s += S.arrow(26, 110, 70, 110, { c: ACC, w: 2 }) + S.text(48, 128, 'I increasing', { a: 'middle', size: 10 });
  s += S.arrow(300, 140, 60, 140, { c: NEG, w: 2 }) + S.text(180, 160, 'induced emf opposes the increase (back emf)', { a: 'middle', size: 10 });
  s += S.text(180, 24, 'ε = −L dI/dt', { a: 'middle', size: 13, w: 'bold' });
  check(true, 'self-inductance: back emf arrow drawn opposite to the increasing current');
  return svgDoc(w, h, 'A coil carrying a current that is increasing: the changing flux through its own turns induces an emf that opposes the change, so it acts against the growing current; this back emf is minus L dI by dt', s);
})();

// ---------------------------------------------------------------- mutual inductance: two coaxial coils
export const MUTUAL = (() => {
  const w = 400;
  const h = 200;
  let s = '';
  for (let i = 0; i < 5; i++) s += S.ellipse(80 + i * 14, 95, 8, 40, { c: POS, sw: 1.6 });
  for (let i = 0; i < 6; i++) s += S.ellipse(250 + i * 14, 95, 8, 40, { c: NEG, sw: 1.6 });
  s += S.text(108, 40, 'primary (1)', { a: 'middle', size: 11 }) + S.text(285, 40, 'secondary (2)', { a: 'middle', size: 11 });
  s += S.line(80, 135, 80, 175) + S.line(136, 135, 136, 175) + S.line(80, 175, 98, 175) + S.line(118, 175, 136, 175);
  s += S.line(98, 165, 98, 185, { w: 2 }) + S.line(104, 170, 104, 180, { w: 3 }) + S.line(104, 175, 108, 175) + S.circle(112, 175, 3) + S.line(114, 175, 118, 171);
  s += S.text(100, 197, 'cell and switch', { a: 'middle', size: 10 });
  s += S.line(250, 135, 250, 175) + S.line(320, 135, 320, 175) + S.line(250, 175, 273, 175) + S.line(297, 175, 320, 175);
  s += S.circle(285, 175, 12, { sw: 1.5, fill: FILL }) + S.text(285, 179, 'G', { a: 'middle', w: 'bold', size: 11 });
  for (const y of [80, 95, 110]) s += S.arrow(150, y, 240, y, { c: MUT, w: 1, size: 6 });
  s += S.text(195, 150, 'flux of coil 1 links coil 2', { a: 'middle', size: 10 });
  s += S.text(200, 22, 'N₂Φ₂ = M I₁,   ε₂ = −M dI₁/dt', { a: 'middle', size: 12, w: 'bold' });
  check(true, 'mutual: galvanometer drawn in the secondary only; the primary has the cell and switch');
  return svgDoc(w, h, 'Two coaxial coils: switching the current in the primary on or off changes the flux linked with the secondary, and the galvanometer in the secondary shows a momentary induced current', s);
})();

export const ALL = { LENZ_LOOP, MAGNET_COIL, ROD, SELF, MUTUAL };
