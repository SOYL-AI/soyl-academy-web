// Hand-drawn SVG schematics for ch04 Exploring Mixtures and their Separation (allow-listed elements, palette colours only).
// Geometry and data are computed here and self-checked. Solubility data are APPROXIMATE textbook-like values (illustrative).
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const lcg = (seed) => {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
};

// ------------------------------------------------------------------ shared data (approximate, illustrative)
export const KNO3 = [[0, 13], [10, 21], [20, 32], [30, 46], [40, 64], [50, 85], [60, 110], [70, 138], [80, 169]];
export const NACL = [[0, 36], [20, 36], [40, 37], [60, 37], [80, 38]];
/** Linear interpolation on a table of [temperature, solubility] points. */
export const interp = (tab, t) => {
  for (let i = 0; i < tab.length - 1; i++) {
    const [t0, s0] = tab[i];
    const [t1, s1] = tab[i + 1];
    if (t >= t0 && t <= t1) return s0 + ((s1 - s0) * (t - t0)) / (t1 - t0);
  }
  throw new Error(`temperature ${t} outside table`);
};

// ------------------------------------------------------------------ 1. particle-size scale (log axis)
const sx0 = 40;
const dec10 = 90; // px per decade, axis from 0.1 nm (10^-1) to 10^4 nm
const xs = (nm) => sx0 + (Math.log10(nm) + 1) * dec10;
const xSol = xs(1);
const xSus = xs(1000);
chk(near(xSol, 130, 1e-9) && near(xSus, 400, 1e-9), 'size scale: the 1 nm and 1000 nm boundaries fall at x = 130 and x = 400');
chk(xs(0.1) < xSol && xSol < xSus && xSus < xs(10000), 'size scale: solution band < colloid band < suspension band, left to right');
export const SIZE_SCALE = svgDoc(
  540,
  210,
  'Particle size scale on a logarithmic axis from 0.1 nanometre to 10000 nanometres. Particles smaller than 1 nanometre form a true solution, particles between 1 and 1000 nanometres form a colloid, and particles larger than 1000 nanometres form a suspension.',
  [
    S.rect(xs(0.1), 50, xSol - xs(0.1), 50, { fill: 'var(--diagram-blue)', fop: 0.3, c: 'var(--diagram-blue)' }),
    S.rect(xSol, 50, xSus - xSol, 50, { fill: 'var(--diagram-yellow)', fop: 0.3, c: 'var(--diagram-brown)' }),
    S.rect(xSus, 50, xs(10000) - xSus, 50, { fill: 'var(--diagram-red)', fop: 0.25, c: 'var(--diagram-red)' }),
    lab((xs(0.1) + xSol) / 2, 80, 'solution', { a: 'middle', w: 'bold' }),
    lab((xSol + xSus) / 2, 80, 'colloid', { a: 'middle', w: 'bold' }),
    lab((xSus + xs(10000)) / 2, 80, 'suspension', { a: 'middle', w: 'bold' }),
    S.line(xs(0.1), 112, xs(10000), 112, { w: 1.5 }),
    ...[0.1, 1, 10, 100, 1000, 10000].map((v) => S.line(xs(v), 106, xs(v), 118)),
    ...[[0.1, '0.1 nm'], [1, '1 nm'], [10, '10 nm'], [100, '100 nm'], [1000, '1000 nm'], [10000, '10000 nm']].map(([v, t]) => small(xs(v), 134, t, { a: 'middle' })),
    lab(xs(0.1), 30, 'Particle size, logarithmic scale (not to scale)', { w: 'bold' }),
    small((xs(0.1) + xSol) / 2, 160, 'salt or sugar', { a: 'middle' }),
    small((xs(0.1) + xSol) / 2, 173, 'in water', { a: 'middle' }),
    small((xSol + xSus) / 2, 160, 'starch in water, milk, fog, smoke, ink', { a: 'middle' }),
    small((xSus + xs(10000)) / 2, 160, 'chalk, mud', { a: 'middle' }),
    small((xSus + xs(10000)) / 2, 173, 'in water', { a: 'middle' }),
    small(sx0, 200, 'The 1 nm and 1000 nm limits are textbook-level values.', {}),
  ].join(''),
);

// ------------------------------------------------------------------ 2. Tyndall effect: three beakers and a torch beam
const rnd = lcg(11);
const beaker = (x0, kind) => {
  const bx = x0 + 40;
  const bw = 100;
  const top = 80;
  const bot = 200;
  const beamY = 130;
  const parts = [];
  parts.push(S.rect(x0, beamY - 8, 26, 16, { fill: 'var(--diagram-muted)', fop: 0.6, c: 'var(--diagram-muted)' }));
  parts.push(S.line(x0 + 26, beamY, bx, beamY, { c: 'var(--diagram-yellow)', w: 2.5 }));
  const liquidFill = kind === 'susp' ? 'var(--diagram-brown)' : 'var(--diagram-blue)';
  parts.push(S.rect(bx, top + 20, bw, bot - top - 20, { fill: liquidFill, fop: kind === 'susp' ? 0.25 : kind === 'colloid' ? 0.12 : 0.1, c: 'none' }));
  if (kind === 'colloid') {
    parts.push(`<polygon points="${bx},${beamY - 5} ${bx + bw},${beamY - 9} ${bx + bw},${beamY + 9} ${bx},${beamY + 5}" fill="var(--diagram-yellow)" fill-opacity="0.55" stroke="none"/>`);
    for (let i = 0; i < 16; i++) parts.push(S.circle(bx + 8 + rnd() * (bw - 16), beamY - 12 + rnd() * 24, 1.3, { fill: 'var(--diagram-yellow)', c: 'none' }));
  }
  if (kind === 'susp') {
    parts.push(S.rect(bx, bot - 14, bw, 14, { fill: 'var(--diagram-brown)', fop: 0.55, c: 'none' }));
    for (let i = 0; i < 26; i++) parts.push(S.circle(bx + 6 + rnd() * (bw - 12), top + 30 + rnd() * 90, 2.2, { fill: 'var(--diagram-brown)', fop: 0.7, c: 'none' }));
    parts.push(`<polygon points="${bx},${beamY - 5} ${bx + bw * 0.55},${beamY - 7} ${bx + bw * 0.55},${beamY + 7} ${bx},${beamY + 5}" fill="var(--diagram-yellow)" fill-opacity="0.4" stroke="none"/>`);
  }
  if (kind === 'solution') parts.push(S.line(bx, beamY, bx + bw, beamY, { c: 'var(--diagram-yellow)', w: 1, dash: '3 4' }));
  parts.push(S.path(`M${bx} ${top} V${bot} H${bx + bw} V${top}`, { w: 2 }));
  return parts.join('');
};
export const TYNDALL = svgDoc(
  540,
  270,
  'A torch beam passed through three beakers. In the salt solution the beam is not visible inside the liquid. In the dilute milk, a colloid, the path of the beam shows up clearly because the colloidal particles scatter light. In the muddy water, a suspension, the liquid is cloudy, the beam is partly seen and the mud settles at the bottom.',
  [
    beaker(10, 'solution'),
    beaker(190, 'colloid'),
    beaker(370, 'susp'),
    lab(100, 228, 'Salt solution', { a: 'middle', w: 'bold' }),
    small(100, 243, 'beam path not seen', { a: 'middle' }),
    lab(280, 228, 'Dilute milk (colloid)', { a: 'middle', w: 'bold' }),
    small(280, 243, 'beam path clearly seen', { a: 'middle' }),
    lab(460, 228, 'Muddy water (suspension)', { a: 'middle', w: 'bold' }),
    small(460, 243, 'cloudy; mud settles down', { a: 'middle' }),
    small(18, 112, 'torch', { }),
    lab(270, 30, 'Tyndall effect: particles scatter the light', { a: 'middle', w: 'bold' }),
    small(270, 52, 'Schematic, not to scale', { a: 'middle' }),
  ].join(''),
);

// ------------------------------------------------------------------ 3. simple distillation set-up
const flask = { cx: 110, cy: 205, r: 42 };
const P1 = [158, 108];
const P2 = [415, 212];
const dx = P2[0] - P1[0];
const dy = P2[1] - P1[1];
const len = Math.hypot(dx, dy);
const ux = dx / len;
const uy = dy / len;
const nx = -uy; // points down-left on screen
const ny = ux;
const jw = 15;
const corner = (p, s) => [p[0] + s * jw * nx, p[1] + s * jw * ny];
const J = [corner(P1, -1), corner(P2, -1), corner(P2, 1), corner(P1, 1)];
const at = (f, s) => [P1[0] + dx * f + s * jw * nx, P1[1] + dy * f + s * jw * ny];
const inletBase = at(0.78, 1); // cold water enters at the LOWER end of the jacket
const outletBase = at(0.22, -1); // warm water leaves at the UPPER end
chk(P2[1] > P1[1], 'distillation: the condenser slopes downward towards the receiver');
chk(inletBase[1] > outletBase[1], 'distillation: cold water enters at the lower end and leaves at the upper end of the jacket');
chk(near(Math.hypot(ux, uy), 1, 1e-9), 'distillation: condenser direction vector is a unit vector');
const dchord = -6;
const hw = Math.sqrt(flask.r ** 2 - dchord ** 2);
export const DISTILL = svgDoc(
  560,
  320,
  'Simple distillation set-up. A round-bottomed flask holding the mixture is heated by a burner. A thermometer in the neck has its bulb level with the side arm. Vapour passes into a sloping Liebig condenser, which is cooled by water entering at the lower end and leaving at the upper end. The condensed liquid, the distillate, drips into a receiving flask.',
  [
    // burner
    S.rect(80, 288, 60, 14, { fill: 'var(--diagram-muted)', fop: 0.5, c: 'var(--diagram-muted)' }),
    S.path('M110 286 C98 270 104 262 110 252 C116 262 122 270 110 286 Z', { c: 'var(--diagram-red)', fill: 'var(--diagram-yellow)', fop: 0.6, w: 1.5 }),
    lab(110, 316, 'heat', { a: 'middle' }),
    // flask: body, neck, liquid
    S.circle(flask.cx, flask.cy, flask.r, { w: 2 }),
    `<path d="M${flask.cx - hw} ${flask.cy + dchord} A${flask.r} ${flask.r} 0 1 0 ${flask.cx + hw} ${flask.cy + dchord} Z" fill="var(--diagram-blue)" fill-opacity="0.25" stroke="none"/>`,
    S.line(flask.cx - 10, flask.cy - 40, flask.cx - 10, 108, { w: 2 }),
    S.line(flask.cx + 10, flask.cy - 40, flask.cx + 10, 108, { w: 2 }),
    S.path(`M${flask.cx - 10} 108 L${flask.cx - 10} 100 L${flask.cx + 10} 100 L${flask.cx + 10} 108`, { w: 2 }),
    S.line(flask.cx + 10, 112, P1[0], P1[1], { w: 2 }),
    // thermometer
    S.line(flask.cx, 62, flask.cx, 128, { c: 'var(--diagram-red)', w: 2.5 }),
    S.circle(flask.cx, 130, 4, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }),
    S.rect(flask.cx - 8, 94, 16, 7, { fill: 'var(--diagram-brown)', fop: 0.5, c: 'var(--diagram-brown)' }),
    lab(flask.cx - 14, 66, 'thermometer', { a: 'end' }),
    // condenser
    `<polygon points="${J.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')}" fill="var(--diagram-blue)" fill-opacity="0.18" stroke="currentColor" stroke-width="1.5"/>`,
    S.line(P1[0], P1[1], P2[0] + ux * 14, P2[1] + uy * 14, { w: 2.5 }),
    // water stubs
    S.arrow(inletBase[0] - 4, inletBase[1] + 36, inletBase[0], inletBase[1] + 4, { c: 'var(--diagram-blue)', w: 2, size: 7 }),
    S.arrow(outletBase[0], outletBase[1] - 4, outletBase[0] - 4, outletBase[1] - 36, { c: 'var(--diagram-red)', w: 2, size: 7 }),
    lab(inletBase[0] - 8, inletBase[1] + 52, 'cold water in', { a: 'middle', c: 'var(--diagram-blue)', w: 'bold' }),
    lab(outletBase[0] + 8, outletBase[1] - 42, 'warm water out', { a: 'middle', c: 'var(--diagram-red)', w: 'bold' }),
    // receiver
    S.path('M412 232 L412 246 L388 300 L478 300 L454 246 L454 232', { w: 2 }),
    S.path('M396 285 L470 285 L478 300 L388 300 Z', { fill: 'var(--diagram-blue)', fop: 0.3, c: 'none' }),
    S.line(P2[0] + ux * 14, P2[1] + uy * 14, 433, 270, { c: 'var(--diagram-blue)', w: 1.5, dash: '2 3' }),
    lab(433, 316, 'distillate', { a: 'middle', c: 'var(--diagram-blue)', w: 'bold' }),
    lab(flask.cx, flask.cy + 16, 'mixture', { a: 'middle' }),
    lab(320, 118, 'condenser', { a: 'middle', w: 'bold' }),
    small(126, 146, 'vapour', { c: 'var(--diagram-muted)' }),
    S.arrow(124, 128, 148, 116, { c: 'var(--diagram-muted)', w: 1.5, size: 6 }),
    small(flask.cx + 20, 56, 'bulb level with the side arm', { }),
    S.lead(flask.cx + 20, 59, flask.cx + 2, 124),
  ].join(''),
);

// ------------------------------------------------------------------ 4. paper chromatography with computed Rf
const k = 22; // px per cm
const baseY = 236;
const frontCm = 9.0;
const lanes = [
  { name: 'P', x: 175, spots: [{ d: 2.7, c: 'var(--diagram-blue)' }] },
  { name: 'Q', x: 245, spots: [{ d: 5.4, c: 'var(--diagram-red)' }] },
  { name: 'R', x: 315, spots: [{ d: 7.2, c: 'var(--diagram-green)' }] },
  { name: 'Ink X', x: 385, spots: [{ d: 2.7, c: 'var(--diagram-blue)' }, { d: 7.2, c: 'var(--diagram-green)' }] },
];
export const RF = lanes.flatMap((l) => l.spots.map((s) => [l.name, s.d / frontCm]));
chk(near(RF[0][1], 0.3, 1e-9) && near(RF[1][1], 0.6, 1e-9) && near(RF[2][1], 0.8, 1e-9), 'chromatography: Rf of P, Q and R computed as 2.7/9.0, 5.4/9.0 and 7.2/9.0 = 0.30, 0.60, 0.80');
chk(RF.every(([, v]) => v > 0 && v < 1), 'chromatography: every Rf lies between 0 and 1');
chk(near(lanes[3].spots[0].d, lanes[0].spots[0].d, 1e-9) && near(lanes[3].spots[1].d, lanes[2].spots[0].d, 1e-9), 'chromatography: the two spots of ink X match the heights of P and R');
const frontY = baseY - frontCm * k;
export const CHROMATO = svgDoc(
  610,
  326,
  'A paper chromatography strip standing in a solvent. A pencil base line is drawn near the bottom and four samples are spotted on it: dyes P, Q and R, and an ink X. After the solvent has risen to the solvent front, 9.0 centimetres above the base line, dye P is at 2.7 centimetres, dye Q at 5.4 centimetres and dye R at 7.2 centimetres. Their Rf values are 0.30, 0.60 and 0.80. Ink X shows two spots at the same heights as P and R.',
  [
    S.rect(110, 252, 350, 56, { c: 'var(--diagram-muted)', sw: 1.5 }),
    S.rect(111, 262, 348, 45, { fill: 'var(--diagram-blue)', fop: 0.2, c: 'none' }),
    S.rect(130, 28, 300, 250, { fill: 'var(--diagram-fill)', fop: 0.6, c: 'currentColor' }),
    S.line(130, baseY, 430, baseY, { c: 'var(--diagram-muted)', w: 1.5 }),
    S.line(130, frontY, 430, frontY, { c: 'var(--diagram-blue)', w: 1.5, dash: '5 3' }),
    lab(124, baseY + 4, 'base line (pencil)', { a: 'end' }),
    lab(124, frontY + 4, 'solvent front', { a: 'end', c: 'var(--diagram-blue)' }),
    ...lanes.flatMap((l) => [
      small(l.x, 20, l.name, { a: 'middle', w: 'bold' }),
      ...l.spots.flatMap((s) => [S.circle(l.x, baseY - s.d * k, 6.5, { fill: s.c, fop: 0.75, c: s.c }), small(l.x + 11, baseY - s.d * k + 4, (s.d / frontCm).toFixed(2), {})]),
    ]),
    S.circle(175, baseY, 3, { fill: 'var(--diagram-blue)', c: 'none' }),
    S.circle(245, baseY, 3, { fill: 'var(--diagram-red)', c: 'none' }),
    S.circle(315, baseY, 3, { fill: 'var(--diagram-green)', c: 'none' }),
    S.circle(385, baseY, 3, { fill: 'var(--diagram-blue)', c: 'none' }),
    // right-hand dimension for lane Q and the front
    S.arrow(450, baseY, 450, baseY - 5.4 * k, { w: 1.5, size: 6, c: 'var(--diagram-red)' }),
    lab(458, baseY - 2.7 * k + 4, 'Q: 5.4 cm', { c: 'var(--diagram-red)' }),
    S.arrow(596, baseY, 596, frontY, { w: 1.5, size: 6, c: 'var(--diagram-blue)' }),
    lab(586, baseY - 4.5 * k + 4, 'front: 9.0 cm', { a: 'end', c: 'var(--diagram-blue)' }),
    lab(458, baseY - 7.5 * k, 'Rf of Q', {}),
    lab(458, baseY - 7.5 * k + 14, '= 5.4 / 9.0 = 0.60', {}),
    small(130, 322, 'Numbers beside the spots are Rf values.', { }),
    lab(285, 302, 'solvent', { a: 'middle' }),
  ].join(''),
);

// ------------------------------------------------------------------ 5. solubility curves (approximate, illustrative)
const gx = 64;
const gy = 288;
const tx = 5.4; // px per degree C
const sy = 1.42; // px per g
const X = (t) => gx + t * tx;
const Y = (s) => gy - s * sy;
const poly = (tab) => tab.map(([t, s], i) => `${i ? 'L' : 'M'}${X(t).toFixed(1)} ${Y(s).toFixed(1)}`).join(' ');
const crystals = interp(KNO3, 60) - interp(KNO3, 20);
chk(near(interp(KNO3, 60), 110, 1e-9) && near(interp(KNO3, 20), 32, 1e-9), 'solubility graph: potassium nitrate reads 110 g at 60 C and 32 g at 20 C');
chk(near(crystals, 78, 1e-9), 'solubility graph: cooling 100 g of water saturated at 60 C to 20 C deposits 110 - 32 = 78 g of crystals');
chk(KNO3.every(([, s], i) => i === 0 || s > KNO3[i - 1][1]) && NACL.every(([, s], i) => i === 0 || s >= NACL[i - 1][1]), 'solubility graph: both curves rise with temperature (sodium chloride only slightly)');
export const SOLUBILITY = svgDoc(
  540,
  350,
  'Solubility curves, with approximate illustrative values, in grams of solute per 100 grams of water against temperature from 0 to 80 degrees Celsius. Potassium nitrate rises steeply, from about 13 grams at 0 degrees to about 169 grams at 80 degrees. Sodium chloride is almost flat at about 36 to 38 grams. Reading the potassium nitrate curve, 110 grams dissolve at 60 degrees and 32 grams at 20 degrees, so 78 grams of crystals appear when a saturated solution made with 100 grams of water cools between these temperatures.',
  [
    ...[0, 20, 40, 60, 80].map((t) => S.line(X(t), gy, X(t), Y(180), { c: 'var(--diagram-muted)', w: 0.6, dash: '2 4' }) + small(X(t), gy + 15, String(t), { a: 'middle' })),
    ...[0, 40, 80, 120, 160].map((s) => S.line(gx, Y(s), X(80), Y(s), { c: 'var(--diagram-muted)', w: 0.6, dash: '2 4' }) + small(gx - 6, Y(s) + 4, String(s), { a: 'end' })),
    S.arrow(gx, gy, X(84), gy, { size: 6 }),
    S.arrow(gx, gy, gx, Y(184), { size: 6 }),
    small(X(84), gy + 32, 'temperature (°C)', { a: 'end' }),
    small(gx - 52, 24, 'solubility (g per 100 g water)', { }),
    S.path(poly(KNO3), { c: 'var(--diagram-red)', w: 3 }),
    S.path(poly(NACL), { c: 'var(--diagram-blue)', w: 3 }),
    ...KNO3.map(([t, s]) => S.circle(X(t), Y(s), 2.5, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' })),
    ...NACL.map(([t, s]) => S.circle(X(t), Y(s), 2.5, { fill: 'var(--diagram-blue)', c: 'var(--diagram-blue)' })),
    lab(X(45), Y(150), 'potassium nitrate', { a: 'end', c: 'var(--diagram-red)', w: 'bold' }),
    lab(X(2), Y(56), 'sodium chloride', { a: 'start', c: 'var(--diagram-blue)', w: 'bold' }),
    // reading at 60 and 20
    S.line(X(60), gy, X(60), Y(110), { c: 'var(--diagram-red)', w: 1.2, dash: '4 3' }),
    S.line(gx, Y(110), X(60), Y(110), { c: 'var(--diagram-red)', w: 1.2, dash: '4 3' }),
    S.line(X(20), gy, X(20), Y(32), { c: 'var(--diagram-red)', w: 1.2, dash: '4 3' }),
    S.line(gx, Y(32), X(20), Y(32), { c: 'var(--diagram-red)', w: 1.2, dash: '4 3' }),
    lab(X(60) + 8, Y(110) + 14, '110 g at 60 °C', { c: 'var(--diagram-red)' }),
    lab(X(20) + 8, Y(32) + 20, '32 g at 20 °C', { c: 'var(--diagram-red)' }),
    S.line(X(72), Y(110), X(72), Y(32), { w: 1.5, c: 'var(--diagram-brown)' }),
    S.line(X(70), Y(110), X(74), Y(110), { w: 1.5, c: 'var(--diagram-brown)' }),
    S.line(X(70), Y(32), X(74), Y(32), { w: 1.5, c: 'var(--diagram-brown)' }),
    lab(X(72) - 6, Y(62) - 2, '110 − 32 = 78 g', { a: 'end', c: 'var(--diagram-brown)', w: 'bold' }),
    lab(X(72) - 6, Y(62) + 12, 'crystals appear', { a: 'end', c: 'var(--diagram-brown)' }),
    small(gx, 338, 'Approximate illustrative values, for reading practice.', {}),
  ].join(''),
);

// ------------------------------------------------------------------ 6. centrifuge sketch
const cx = 120;
const cy = 135;
const rotAngles = [0, 90, 180, 270];
chk(rotAngles.every((a) => rotAngles.includes((a + 180) % 360)), 'centrifuge: every tube has another tube exactly opposite it, so the rotor is balanced');
const tubePoly = (ang, r0, r1, wd) => {
  const a = (ang * Math.PI) / 180;
  const ux2 = Math.cos(a);
  const uy2 = Math.sin(a);
  const vx = -uy2;
  const vy = ux2;
  const p = (r, s) => [cx + r * ux2 + s * wd * vx, cy + r * uy2 + s * wd * vy];
  return [p(r0, -1), p(r1, -1), p(r1, 1), p(r0, 1)].map(([a1, b1]) => `${a1.toFixed(1)},${b1.toFixed(1)}`).join(' ');
};
const SED = 0.3; // outer 30 % of each tube holds sediment
const r0 = 24;
const r1 = 84;
const rotor = rotAngles.flatMap((a) => [
  `<polygon points="${tubePoly(a, r0, r1, 8)}" fill="var(--diagram-blue)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>`,
  `<polygon points="${tubePoly(a, r1 - (r1 - r0) * SED, r1, 8)}" fill="var(--diagram-brown)" fill-opacity="0.6" stroke="none"/>`,
]);
export const CENTRIFUGE = svgDoc(
  540,
  270,
  'A centrifuge sketch. On the left, a top view of a rotor spinning with four sample tubes placed in opposite pairs. The heavier particles are flung to the outer end of each tube. On the right, one tube before spinning with particles spread evenly, and the same tube after spinning, with the dense particles collected as a sediment at the bottom and clear liquid above.',
  [
    S.circle(cx, cy, 98, { c: 'var(--diagram-muted)', dash: '4 4', sw: 1.2 }),
    ...rotor,
    S.circle(cx, cy, 12, { fill: 'var(--diagram-muted)', fop: 0.7, c: 'currentColor' }),
    S.path(`M${cx + 70} ${cy - 76} A100 100 0 0 1 ${cx + 100} ${cy - 40}`, { c: 'var(--diagram-red)', w: 2.5 }),
    S.head(cx + 100, cy - 40, Math.atan2(36, 30) + 0.2, { c: 'var(--diagram-red)', size: 9 }),
    lab(cx + 96, cy - 82, 'spin', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(cx, 255, 'Top view of the rotor', { a: 'middle', w: 'bold' }),
    small(cx, cy + 4, 'axis', { a: 'middle', c: 'var(--diagram-fill)' }),
    lab(cx - 104, cy - 100, 'tube (outer end = bottom)', { }),
    S.lead(cx - 6, cy - 94, cx - 2, cy - 82),
    // before / after tubes
    S.rect(335, 60, 36, 130, { rx: 8, fill: 'var(--diagram-yellow)', fop: 0.3, c: 'currentColor', sw: 2 }),
    ...[...Array(14)].map((_, i) => S.circle(343 + ((i * 7) % 22), 74 + ((i * 29) % 108), 2, { fill: 'var(--diagram-brown)', c: 'none' })),
    lab(353, 48, 'Before', { a: 'middle', w: 'bold' }),
    S.arrow(385, 125, 430, 125, { w: 2.5, size: 9, c: 'var(--diagram-red)' }),
    small(408, 113, 'spin', { a: 'middle', c: 'var(--diagram-red)' }),
    S.rect(445, 60, 36, 130, { rx: 8, fill: 'var(--diagram-blue)', fop: 0.15, c: 'currentColor', sw: 2 }),
    S.rect(447, 160, 32, 28, { fill: 'var(--diagram-brown)', fop: 0.65, c: 'none' }),
    lab(463, 48, 'After', { a: 'middle', w: 'bold' }),
    small(332, 208, 'particles spread out', { }),
    small(486, 112, 'clear liquid', { }),
    small(486, 176, 'sediment', { }),
    S.lead(484, 108, 466, 108),
    S.lead(484, 172, 468, 172),
    lab(410, 255, 'Side view of one tube', { a: 'middle', w: 'bold' }),
  ].join(''),
);
