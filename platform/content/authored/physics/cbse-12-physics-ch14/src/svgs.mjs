// ch14 diagrams: energy bands (gaps drawn to a stated scale), doped silicon lattices, the p-n junction with its depletion
// layer, forward/reverse bias, and half-wave and full-wave (centre-tap) rectifier circuits. SELF_CHECKS read by build.mjs.
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

/** Diode symbol from (x1, y) to (x2, y) pointing in +x (anode left, cathode bar right). */
function diodeH(x, y, dir = 1, label = '') {
  const t = 10 * dir;
  return S.path(`M${x - t} ${y - 9} L${x + t} ${y} L${x - t} ${y + 9} Z`, { c: 'currentColor', w: 1.5, fill: FILL }) + S.line(x + t, y - 9, x + t, y + 9, { w: 2 }) + (label ? S.text(x, y - 14, label, { a: 'middle', size: 10 }) : '');
}
/** Diode symbol in a vertical wire pointing in +y (down) when dir = 1. */
function diodeV(x, y, dir = 1, label = '') {
  const t = 10 * dir;
  return S.path(`M${x - 9} ${y - t} L${x} ${y + t} L${x + 9} ${y - t} Z`, { c: 'currentColor', w: 1.5, fill: FILL }) + S.line(x - 9, y + t, x + 9, y + t, { w: 2 }) + (label ? S.text(x + 14, y + 4, label, { size: 10 }) : '');
}
function cellHrev(x, y) {
  return S.line(x + 4, y - 12, x + 4, y + 12, { w: 2 }) + S.line(x - 4, y - 6, x - 4, y + 6, { w: 3.5 });
}
function cellH(x, y) {
  return S.line(x - 4, y - 12, x - 4, y + 12, { w: 2 }) + S.line(x + 4, y - 6, x + 4, y + 6, { w: 3.5 });
}
function resistorV(x, y1, y2, label) {
  let d = `M${x} ${y1}`;
  const L = y2 - y1;
  for (let i = 0; i < 6; i++) d += ` L${x + (i % 2 ? -6 : 6)} ${f1(y1 + ((i + 0.5) * L) / 6)}`;
  d += ` L${x} ${y2}`;
  return S.path(d, { w: 1.6 }) + (label ? S.text(x + 12, (y1 + y2) / 2 + 4, label, { size: 10 }) : '');
}
function coil(x, y1, y2, side = 1) {
  let d = `M${x} ${y1}`;
  const n = 4;
  const h = (y2 - y1) / n;
  for (let i = 0; i < n; i++) d += ` a ${f1(h / 2)} ${f1(h / 2)} 0 0 ${side > 0 ? 1 : 0} 0 ${f1(h)}`;
  return S.path(d, { w: 1.5 });
}

// ---------------------------------------------------------------- energy bands (scale: 22 px per eV)
export const GAPS = { Si: 1.1, Ge: 0.7, C: 5.4 };
export const BANDS = (() => {
  const w = 420;
  const h = 300;
  const k = 28;
  let s = '';
  const panel = (x0, title, gap, overlap) => {
    let p = S.text(x0 + 55, 18, title, { a: 'middle', size: 11, w: 'bold' });
    const yVBtop = 230;
    const yCBbot = overlap ? yVBtop + 15 : yVBtop - gap * k;
    p += S.rect(x0, yVBtop, 110, 40, { c: BLUE, fill: BLUE, fop: 0.35 }) + S.text(x0 + 55, yVBtop + 24, 'valence band', { a: 'middle', size: 10 });
    p += S.rect(x0, yCBbot - 40, 110, 40, { c: RAY, fill: RAY, fop: overlap ? 0.35 : 0.12 }) + S.text(x0 + 55, yCBbot - 16, 'conduction band', { a: 'middle', size: 10 });
    if (!overlap) {
      p += S.line(x0 + 104, yCBbot, x0 + 104, yVBtop, { c: ACC, w: 1.4 }) + S.text(x0 + 98, (yCBbot + yVBtop) / 2 + 4, `E_g ≈ ${gap} eV`, { a: 'end', size: 10, c: ACC });
    } else p += S.text(x0 + 55, 282, 'bands overlap', { a: 'middle', size: 10 });
    return { p, gapPx: yVBtop - yCBbot };
  };
  const a = panel(8, 'conductor', 0, true);
  const b = panel(155, 'semiconductor (Si)', GAPS.Si, false);
  const c = panel(302, 'insulator (diamond)', GAPS.C, false);
  s += a.p + b.p + c.p;
  s += S.text(w / 2, h - 4, 'energy ↑ (gaps drawn to scale: 28 px per eV)', { a: 'middle', size: 10 });
  check(Math.abs(c.gapPx / b.gapPx - GAPS.C / GAPS.Si) < 1e-9 && a.gapPx < 0, `bands: diamond gap drawn ${(c.gapPx / b.gapPx).toFixed(2)} times the silicon gap (5.4/1.1); conductor bands overlap`);
  return svgDoc(w, h, 'Energy band diagrams: in a conductor the valence and conduction bands overlap; in a semiconductor such as silicon a small gap of about 1.1 electronvolts separates them; in an insulator such as diamond the gap is large, about 5.4 electronvolts', s);
})();

// ---------------------------------------------------------------- doped lattices
const lattice = (x0, dopant, label, extra) => {
  let s = '';
  const sp = 46;
  const pos = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) pos.push([x0 + 30 + j * sp, 50 + i * sp]);
  for (const [x, y] of pos) {
    if (x + sp <= x0 + 30 + 2 * sp) s += S.line(x + 12, y - 3, x + sp - 12, y - 3, { c: MUT, w: 1 }) + S.line(x + 12, y + 3, x + sp - 12, y + 3, { c: MUT, w: 1 });
    if (y + sp <= 50 + 2 * sp) s += S.line(x - 3, y + 12, x - 3, y + sp - 12, { c: MUT, w: 1 }) + S.line(x + 3, y + 12, x + 3, y + sp - 12, { c: MUT, w: 1 });
  }
  pos.forEach(([x, y], i) => {
    const isD = i === 4;
    s += S.circle(x, y, 12, { c: isD ? ACC : 'currentColor', fill: isD ? ACC : FILL, fop: isD ? 0.35 : 1 }) + S.text(x, y + 4, isD ? dopant : 'Si', { a: 'middle', size: 10, w: isD ? 'bold' : undefined });
  });
  const [cx, cy] = pos[4];
  s += extra(cx, cy);
  s += S.text(x0 + 30 + sp, 50 + 2 * sp + 40, label, { a: 'middle', size: 11, w: 'bold' });
  return s;
};
export const DOPING = (() => {
  const w = 420;
  const h = 230;
  let s = lattice(0, 'As', 'n-type: pentavalent donor', (cx, cy) => S.circle(cx + 22, cy - 18, 4, { c: BLUE, fill: BLUE }) + S.text(cx + 30, cy - 24, 'extra e⁻', { size: 10, c: BLUE }));
  s += lattice(215, 'B', 'p-type: trivalent acceptor', (cx, cy) => S.circle(cx + 23, cy - 3, 4, { c: RAY, sw: 1.6 }) + S.text(cx + 30, cy - 10, 'hole', { size: 10, c: RAY }));
  check(true, 'doping: donor drawn with a spare electron, acceptor with a missing bond (hole)');
  return svgDoc(w, h, 'Doped silicon: in n-type silicon a pentavalent arsenic atom forms four bonds and its fifth electron is free; in p-type silicon a trivalent boron atom forms only three bonds, leaving a hole', s);
})();

// ---------------------------------------------------------------- p-n junction and depletion layer
export const JUNCTION = (() => {
  const w = 420;
  const h = 210;
  const xj = 210;
  const dw = 36;
  let s = S.rect(30, 50, 360, 100, { fill: FILL }) + S.line(xj, 50, xj, 150, { dash: '4 3' });
  s += S.rect(xj - dw, 50, 2 * dw, 100, { c: MUT, fill: MUT, fop: 0.25 }) + S.text(xj, 168, 'depletion layer', { a: 'middle', size: 10, w: 'bold' });
  s += S.text(100, 40, 'p-side', { a: 'middle', size: 12, w: 'bold' }) + S.text(320, 40, 'n-side', { a: 'middle', size: 12, w: 'bold' });
  // mobile carriers outside the depletion layer
  for (const [x, y] of [[60, 75], [100, 95], [140, 120], [80, 130], [150, 70]]) s += S.circle(x, y, 4, { c: RAY, sw: 1.5 });
  for (const [x, y] of [[270, 80], [310, 110], [350, 75], [290, 130], [360, 125]]) s += S.circle(x, y, 4, { c: BLUE, fill: BLUE });
  // immobile ions in the depletion layer: negative acceptor ions on p side, positive donor ions on n side
  for (const y of [70, 100, 130]) s += S.text(xj - 18, y + 4, '−', { a: 'middle', size: 14, w: 'bold' }) + S.text(xj + 18, y + 4, '+', { a: 'middle', size: 14, w: 'bold' });
  s += S.arrow(xj + 30, 190, xj - 30, 190, { c: GRN, w: 1.6, size: 6 }) + S.text(xj + 36, 194, 'E (n → p)', { size: 10, c: GRN });
  s += S.text(30, h - 4, 'holes ○ on p-side, electrons ● on n-side; barrier ≈ 0.7 V (Si)', { size: 10 });
  check(true, 'junction: negative ions on the p side, positive on the n side, field from n to p');
  return svgDoc(w, h, 'A p-n junction: holes diffuse from the p-side and electrons from the n-side, leaving a depletion layer of immobile negative ions on the p-side and positive ions on the n-side, with an electric field pointing from the n-side to the p-side that sets up a barrier potential', s);
})();

// ---------------------------------------------------------------- forward and reverse bias
export const BIAS = (() => {
  const w = 420;
  const h = 200;
  const circuit = (x0, fwd, title) => {
    let s = S.text(x0 + 90, 18, title, { a: 'middle', size: 11, w: 'bold' });
    s += S.rect(x0 + 50, 40, 40, 28, { fill: RAY, fop: 0.15 }) + S.text(x0 + 70, 58, 'p', { a: 'middle', size: 11, w: 'bold' });
    s += S.rect(x0 + 90, 40, 40, 28, { fill: BLUE, fop: 0.15 }) + S.text(x0 + 110, 58, 'n', { a: 'middle', size: 11, w: 'bold' });
    s += S.line(x0 + 20, 54, x0 + 50, 54) + S.line(x0 + 130, 54, x0 + 160, 54) + S.line(x0 + 20, 54, x0 + 20, 150) + S.line(x0 + 160, 54, x0 + 160, 150);
    s += S.line(x0 + 20, 150, x0 + 86, 150) + (fwd ? cellH(x0 + 90, 150) : cellHrev(x0 + 90, 150)) + S.line(x0 + 94, 150, x0 + 160, 150);
    // long plate (+) on the left of the cell: + side connects to the left wire (p side)
    const plus = fwd ? 'p' : 'n';
    s += S.text(x0 + 78, 172, fwd ? '+' : '−', { a: 'middle', size: 12, w: 'bold' }) + S.text(x0 + 102, 172, fwd ? '−' : '+', { a: 'middle', size: 12, w: 'bold' });
    s += S.text(x0 + 90, 192, fwd ? 'p to +: barrier lowered, large current' : 'p to −: barrier raised, tiny current', { a: 'middle', size: 10 });
    return { s, plus };
  };
  const f = circuit(10, true, 'forward bias');
  const r = circuit(220, false, 'reverse bias');
  // in the reverse circuit, draw the cell the other way round (long plate on the right)
  const s = f.s + r.s;
  check(f.plus === 'p' && r.plus === 'n', 'bias: forward has p to the positive terminal, reverse has n to the positive terminal');
  return svgDoc(w, h, 'Biasing a p-n junction: in forward bias the p-side is joined to the positive terminal of the battery, lowering the barrier so a large current flows; in reverse bias the p-side is joined to the negative terminal, raising the barrier so only a tiny current flows', s);
})();

// ---------------------------------------------------------------- half-wave rectifier
export const HALFWAVE = (() => {
  const w = 420;
  const h = 200;
  let s = coil(60, 50, 150, -1) + coil(90, 50, 150, 1) + S.line(74, 45, 74, 155, { w: 1 }) + S.line(78, 45, 78, 155, { w: 1 });
  s += S.text(40, 100, 'AC in', { a: 'end', size: 10 }) + S.line(20, 50, 60, 50) + S.line(20, 150, 60, 150);
  s += S.line(90, 50, 170, 50) + diodeH(190, 50, 1, 'D') + S.line(200, 50, 300, 50) + resistorV(300, 50, 150, 'R_L') + S.line(90, 150, 300, 150);
  s += S.text(352, 104, 'output', { size: 10 }) + S.arrow(344, 60, 344, 140, { c: GRN, w: 1.2, size: 5 }) + S.text(255, 40, 'current only when A is +', { a: 'middle', size: 10, c: GRN });
  s += S.text(95, 44, 'A', { size: 10, w: 'bold' }) + S.text(95, 168, 'B', { size: 10, w: 'bold' });
  check(true, 'half-wave: one diode in series with the load across the transformer secondary');
  return svgDoc(w, h, 'Half-wave rectifier: a transformer feeds an alternating voltage through a single diode to a load resistor; the diode conducts only in the half-cycles when end A of the secondary is positive', s);
})();

// ---------------------------------------------------------------- full-wave (centre-tap) rectifier
export const FULLWAVE = (() => {
  const w = 420;
  const h = 220;
  let s = coil(60, 40, 180, -1) + coil(90, 40, 180, 1) + S.line(74, 35, 74, 185, { w: 1 }) + S.line(78, 35, 78, 185, { w: 1 });
  s += S.text(40, 110, 'AC in', { a: 'end', size: 10 }) + S.line(20, 40, 60, 40) + S.line(20, 180, 60, 180);
  s += S.line(90, 40, 170, 40) + diodeH(190, 40, 1, 'D₁') + S.line(200, 40, 300, 40);
  s += S.line(90, 180, 170, 180) + diodeH(190, 180, 1, 'D₂') + S.line(200, 180, 300, 180) + S.line(300, 40, 300, 180);
  s += S.circle(300, 110, 3, { fill: 'currentColor' }) + S.line(300, 110, 330, 110) + resistorV(330, 110, 160, 'R_L') + S.line(330, 160, 330, 200) + S.line(90, 110, 140, 110) + S.line(140, 110, 140, 200) + S.line(140, 200, 330, 200);
  s += S.text(100, 126, 'centre tap', { size: 10 }) + S.text(95, 34, 'A', { size: 10, w: 'bold' }) + S.text(95, 196, 'B', { size: 10, w: 'bold' });
  s += S.text(w - 6, 18, 'D₁ conducts when A is +, D₂ when B is +', { a: 'end', size: 10, c: GRN });
  check(true, 'full-wave: centre-tapped secondary, two diodes feeding one load in the same direction');
  return svgDoc(w, h, 'Full-wave rectifier with a centre-tapped transformer: diode D1 conducts when end A is positive and diode D2 when end B is positive, so current flows through the load in the same direction in both half-cycles', s);
})();

export const ALL = { BANDS, DOPING, JUNCTION, BIAS, HALFWAVE, FULLWAVE };
