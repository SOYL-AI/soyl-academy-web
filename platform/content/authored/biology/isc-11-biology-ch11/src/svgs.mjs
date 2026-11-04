// SVG diagrams for ISC 11 Biology ch11 Biomolecules, drawn with the lib's S helpers (palette colours only): three amino acids,
// the zwitterion, the four levels of protein structure (plain and lettered A to D), enzyme curves computed in calc.mjs (plain and
// lettered A to F), competitive inhibition, a triglyceride with saturated and unsaturated chains, and the three disaccharides.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { TEMP, PH, act, phAct, rate, KIN } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = 'var(--diagram-muted)';
const badge = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });

// ---------------------------------------------------------------- 1. amino acid structures (neutral form) and the zwitterion
function aa(cx, cy, { r, amino = 'H₂N', carboxyl = 'COOH', size = 14 }) {
  return [
    S.line(cx - 12, cy, cx - 40, cy), S.line(cx + 12, cy, cx + 30, cy), S.line(cx, cy - 12, cx, cy - 30), S.line(cx, cy + 12, cx, cy + 30),
    S.text(cx, cy + 5, 'C', { a: 'middle', size, w: 'bold' }),
    S.text(cx - 44, cy + 5, amino, { a: 'end', size, c: 'var(--diagram-blue)', w: 'bold' }),
    S.text(cx + 34, cy + 5, carboxyl, { size, c: 'var(--diagram-red)', w: 'bold' }),
    S.text(cx, cy - 34, 'H', { a: 'middle', size }),
    S.text(cx, cy + 46, r, { a: 'middle', size, c: 'var(--diagram-green)', w: 'bold' }),
  ].join('');
}
export const AMINO = svgDoc(
  540,
  210,
  'Structures of three amino acids drawn around the central alpha carbon, each with an amino group, a carboxyl group, a hydrogen atom and an R group: glycine has R as a hydrogen atom, alanine has a methyl group, and serine has a hydroxymethyl group',
  [
    aa(100, 100, { r: 'H' }), aa(280, 100, { r: 'CH₃' }), aa(450, 100, { r: 'CH₂OH' }),
    lab(100, 20, 'Glycine', { a: 'middle', size: 13, w: 'bold' }), lab(280, 20, 'Alanine', { a: 'middle', size: 13, w: 'bold' }), lab(450, 20, 'Serine', { a: 'middle', size: 13, w: 'bold' }),
    lab(100, 192, 'R = H', { a: 'middle', c: muted }), lab(280, 192, 'R = methyl', { a: 'middle', c: muted }), lab(450, 192, 'R = hydroxymethyl', { a: 'middle', c: muted }),
  ].join(''),
);
export const ZWITTER = svgDoc(
  540,
  210,
  'The general amino acid and its zwitterion: the neutral form has an NH2 group and a COOH group; in water the carboxyl group gives a proton to the amino group, giving a zwitterion with NH3 plus and COO minus on the same molecule and no net charge',
  [
    aa(110, 100, { r: 'R' }),
    lab(110, 20, 'Amino acid (neutral form)', { a: 'middle', size: 12, w: 'bold' }),
    S.arrow(215, 100, 300, 100, { w: 2, size: 8 }), lab(257, 88, 'in water', { a: 'middle', size: 11, c: muted }),
    aa(410, 100, { r: 'R', amino: 'H₃N⁺', carboxyl: 'COO⁻' }),
    lab(410, 20, 'Zwitterion', { a: 'middle', size: 12, w: 'bold' }),
    lab(410, 192, 'one positive and one negative charge; net charge nil', { a: 'middle', c: muted, size: 10 }),
    lab(110, 192, 'amino group, carboxyl group, R group', { a: 'middle', c: muted, size: 10 }),
  ].join(''),
);

// ---------------------------------------------------------------- 2. four levels of protein structure (plain and lettered)
const PW = 130;
const panels = {
  primary: (x0) => {
    const beads = Array.from({ length: 6 }, (_, i) => [x0 + 14 + i * 20, 100]);
    return [...beads.slice(1).map(([x, y], i) => S.line(beads[i][0], y, x, y, { w: 2 })), ...beads.map(([x, y], i) => S.circle(x, y, 8, { fill: i % 2 ? 'var(--diagram-blue)' : 'var(--diagram-green)', fop: 0.45, sw: 1.4 })), lab(x0 + 65, 128, 'chain of amino acids', { a: 'middle', size: 10, c: muted })].join('');
  },
  secondary: (x0) => [...Array.from({ length: 5 }, (_, i) => S.ellipse(x0 + 22 + i * 21, 100, 8, 24, { c: 'var(--diagram-green)', sw: 2.2 })), S.line(x0 + 10, 76, x0 + 120, 76, { c: muted, w: 1, dash: '3 3' }), lab(x0 + 65, 142, 'helix: hydrogen bonds', { a: 'middle', size: 10, c: muted })].join(''),
  tertiary: (x0) => [
    S.path(`M${x0 + 14} 128 C${x0 + 4} 84 ${x0 + 40} 70 ${x0 + 44} 100 S${x0 + 30} 140 ${x0 + 58} 132 S${x0 + 66} 70 ${x0 + 88} 74 S${x0 + 122} 100 ${x0 + 96} 116 S${x0 + 70} 112 ${x0 + 80} 96`, { c: 'var(--diagram-blue)', w: 3 }),
    S.line(x0 + 44, 104, x0 + 80, 96, { c: 'var(--diagram-red)', w: 1.5, dash: '3 2' }),
    lab(x0 + 65, 158, 'folded chain with bonds', { a: 'middle', size: 10, c: muted }),
  ].join(''),
  quaternary: (x0) => [
    S.circle(x0 + 38, 78, 20, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.6 }), S.circle(x0 + 88, 78, 20, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.6 }),
    S.circle(x0 + 38, 124, 20, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.6 }), S.circle(x0 + 88, 124, 20, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.6 }),
    lab(x0 + 65, 158, 'several chains together', { a: 'middle', size: 10, c: muted }),
  ].join(''),
};
const NAMES = { primary: 'Primary', secondary: 'Secondary', tertiary: 'Tertiary', quaternary: 'Quaternary' };
function protein(order, lettered) {
  const parts = order.map((k, i) => panels[k](14 + i * 132) + (lettered ? badge(14 + i * 132 + 65, 30, 'ABCD'[i]) : lab(14 + i * 132 + 65, 34, `${NAMES[k]} structure`, { a: 'middle', size: 12, w: 'bold' })));
  parts.push(...[1, 2, 3].map((i) => S.line(8 + i * 132, 50, 8 + i * 132, 170, { c: muted, w: 0.8, dash: '2 4' })));
  const label = lettered
    ? 'Four levels of protein structure drawn in a scrambled order and marked A to D: A is a folded chain with a dashed bond between two parts, B is a straight chain of beads, C is four folded chains together, D is a coiled helix'
    : 'Four levels of protein structure: primary is a chain of amino acids, secondary is a helix: hydrogen bonds, tertiary is the folded chain held by bonds such as disulphide bridges, and quaternary is several folded chains together';
  return svgDoc(540, 190, label, parts.join(''));
}
export const PROTEIN = protein(['primary', 'secondary', 'tertiary', 'quaternary'], false);
export const PROTEIN_L = protein(['tertiary', 'primary', 'quaternary', 'secondary'], true);

// ---------------------------------------------------------------- 3. enzyme curves (computed): temperature, pH, substrate with an inhibitor
const BASE = 190;
const H = 120;
function axes(x0, xs, ticks, title, xlabel) {
  return [
    S.line(x0, BASE, x0 + 150, BASE, { w: 1.4 }), S.line(x0, BASE, x0, BASE - H - 6, { w: 1.4 }),
    ...ticks.map(([v, t]) => S.line(x0 + xs(v), BASE, x0 + xs(v), BASE + 4, { w: 1 }) + S.text(x0 + xs(v), BASE + 16, t, { a: 'middle', size: 10 })),
    lab(x0 + 75, BASE + 32, xlabel, { a: 'middle', size: 10, c: muted }),
    lab(x0 + 75, 22, title, { a: 'middle', size: 12, w: 'bold' }),
  ].join('');
}
const curve = (x0, xs, ys, xsamples, f, c, dash) => S.path('M' + xsamples.map((x) => `${(x0 + xs(x)).toFixed(1)} ${(BASE - ys(f(x))).toFixed(1)}`).join(' L'), { c, w: 2.4, dash });
const range = (a, b, st) => Array.from({ length: Math.round((b - a) / st) + 1 }, (_, i) => a + i * st);
function enzymes(lettered) {
  const tx = (t) => (t / 60) * 150;
  const ty = (v) => (v / 100) * H;
  const px = (p) => (p / 12) * 150;
  const sx = (s) => (s / 200) * 150;
  const sy = (v) => (v / KIN.vmax) * H;
  const t = (name, l, x, y) => (lettered ? badge(x, y, l) : lab(x, y + 4, name, { a: 'middle', size: 10 }));
  const x1 = 28;
  const x2 = 214;
  const x3 = 400;
  return svgDoc(
    560,
    240,
    lettered
      ? 'Three graphs of enzyme activity with the curves marked A to F: temperature, with A peaking at a low temperature and B at body temperature; pH, with C peaking at acid pH and D at alkaline pH; and substrate concentration, with E reaching a higher rate than F at every concentration while both approach the same maximum'
      : 'Three graphs of enzyme activity: against temperature, curves for a polar-fish enzyme with a low optimum and a human enzyme with an optimum near body temperature, both falling sharply above the optimum; against pH, curves for pepsin with an acid optimum and trypsin with an alkaline optimum; and against substrate concentration, a curve that levels off, with a lower curve in the presence of a competitive inhibitor approaching the same maximum',
    [
      axes(x1, tx, [[0, '0'], [20, '20'], [40, '40'], [60, '60']], 'Temperature', 'temperature (°C)'),
      curve(x1, tx, ty, range(0, 60, 1), (v) => act('fish', v), 'var(--diagram-blue)'),
      curve(x1, tx, ty, range(0, 60, 1), (v) => act('human', v), 'var(--diagram-red)'),
      t('Fish', 'A', x1 + tx(15), 58), t('Human', 'B', x1 + tx(37), 58),
      axes(x2, px, [[0, '0'], [4, '4'], [8, '8'], [12, '12']], 'pH', 'pH'),
      curve(x2, px, ty, range(0, 12, 0.2), (v) => phAct('pepsin', v), 'var(--diagram-green)'),
      curve(x2, px, ty, range(0, 12, 0.2), (v) => phAct('trypsin', v), 'var(--diagram-brown)'),
      t('Pepsin', 'C', x2 + px(2), 58), t('Trypsin', 'D', x2 + px(8), 58),
      axes(x3, sx, [[0, '0'], [50, '50'], [100, '100'], [200, '200']], 'Substrate', 'substrate concentration'),
      curve(x3, sx, sy, range(0, 200, 4), (v) => rate(v), 'var(--diagram-green)'),
      curve(x3, sx, sy, range(0, 200, 4), (v) => rate(v, true), 'var(--diagram-red)', '5 3'),
      t('No inhibitor', 'E', x3 + sx(120), BASE - sy(rate(120)) - 12), t('With inhibitor', 'F', x3 + sx(150), BASE - sy(rate(150, true)) + 22),
      lab(x1 - 8, 18, 'Activity', { size: 10, c: muted }),
    ].join(''),
  );
}
export const ENZYMES = enzymes(false);
export const ENZYMES_L = enzymes(true);

// ---------------------------------------------------------------- 4. competitive inhibition
const enz = (x, y) => S.path(`M${x} ${y + 70} L${x} ${y} L${x + 22} ${y} L${x + 22} ${y + 24} L${x + 52} ${y + 24} L${x + 52} ${y} L${x + 74} ${y} L${x + 74} ${y + 70} Z`, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'currentColor', w: 1.6 });
const sub = (x, y, f = 'var(--diagram-green)') => S.rect(x, y, 30, 24, { rx: 2, fill: f, fop: 0.55, sw: 1.4 });
const inh = (x, y) => S.path(`M${x} ${y} L${x + 30} ${y} L${x + 30} ${y + 14} L${x + 22} ${y + 24} L${x + 8} ${y + 24} L${x} ${y + 14} Z`, { fill: 'var(--diagram-red)', fop: 0.5, c: 'currentColor', w: 1.4 });
export const INHIBITION = svgDoc(
  540,
  210,
  'Competitive inhibition in three panels: first the substrate fits the active site of the enzyme and a product forms; second an inhibitor of similar shape occupies the active site so no product forms; third, at a high concentration, many substrate molecules compete successfully and displace the inhibitor',
  [
    lab(86, 20, '1  Substrate binds', { a: 'middle', size: 12, w: 'bold' }), enz(50, 70), sub(72, 70), lab(86, 170, 'enzyme–substrate complex', { a: 'middle', size: 10, c: muted }), lab(86, 184, 'product formed', { a: 'middle', size: 10, c: muted }),
    lab(270, 20, '2  Inhibitor binds', { a: 'middle', size: 12, w: 'bold' }), enz(234, 70), inh(256, 70), lab(270, 170, 'enzyme–inhibitor complex', { a: 'middle', size: 10, c: muted }), lab(270, 184, 'no product; active site blocked', { a: 'middle', size: 10, c: muted }),
    lab(454, 20, '3  Much substrate', { a: 'middle', size: 12, w: 'bold' }), enz(418, 70), sub(440, 70),
    sub(404, 40), sub(480, 40), sub(500, 90), inh(400, 130), sub(494, 128), sub(440, 150),
    lab(454, 184, 'substrate outcompetes the inhibitor', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. triglyceride with saturated and unsaturated chains
const zig = (x0, y, n, step, amp) => 'M' + Array.from({ length: n + 1 }, (_, i) => `${x0 + i * step} ${y + (i % 2 ? -amp : amp)}`).join(' L');
export const TRIGLYCERIDE = svgDoc(
  540,
  250,
  'A triglyceride: glycerol joined by three ester bonds to three fatty acid chains; two chains are saturated and straight, and the third is unsaturated with a cis double bond that bends the chain',
  [
    S.line(52, 60, 52, 180, { w: 2.5 }),
    lab(52, 46, 'Glycerol', { a: 'middle', w: 'bold' }),
    ...[60, 120, 180].map((y, i) => S.line(52, y, 90, y, { w: 2 }) + S.circle(100, y, 10, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.4 }) + S.text(100, y + 4, 'O', { a: 'middle', size: 10 }) + S.line(110, y, 130, y, { w: 2 }) + (i < 2 ? S.path(zig(130, y, 14, 22, 8), { w: 2, c: 'var(--diagram-brown)' }) : '')),
    S.path(`${zig(130, 180, 6, 22, 8)} L284 172 L298 160 L312 152 L326 160 L340 152 L354 160 L368 152 L382 160`, { w: 2, c: 'var(--diagram-brown)' }),
    S.line(262, 176, 270, 160, { w: 1.5, c: 'var(--diagram-red)' }), S.line(268, 178, 276, 162, { w: 1.5, c: 'var(--diagram-red)' }),
    S.lead(100, 66, 100, 34), lab(104, 32, 'Ester bond', { size: 10 }),
    lab(440, 64, 'Saturated chain', { size: 10 }), lab(440, 76, 'no double bonds', { size: 10, c: muted }),
    lab(440, 124, 'Saturated chain', { size: 10 }),
    lab(396, 200, 'Unsaturated chain', { size: 10 }), lab(396, 212, 'cis double bond bends it', { size: 10, c: muted }),
    S.lead(268, 160, 252, 148), lab(176, 146, 'cis double bond', { size: 10, w: 'bold', c: 'var(--diagram-red)' }),
    lab(52, 242, 'Glycerol + 3 fatty acids → triglyceride + 3 water', { size: 11 }),
  ].join(''),
);

// ---------------------------------------------------------------- 6. disaccharides from monosaccharides
const poly = (pts, c) => `<polygon points="${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" fill="${c}" fill-opacity="0.35" stroke="currentColor" stroke-width="1.5"/>`;
const hex = (cx, cy, r, c) => poly(Array.from({ length: 6 }, (_, i) => [cx + r * Math.cos((Math.PI / 3) * i + Math.PI / 6), cy + r * Math.sin((Math.PI / 3) * i + Math.PI / 6)]), c);
const pent = (cx, cy, r, c) => poly(Array.from({ length: 5 }, (_, i) => [cx + r * Math.cos((2 * Math.PI * i) / 5 - Math.PI / 2), cy + r * Math.sin((2 * Math.PI * i) / 5 - Math.PI / 2)]), c);
const ring = (kind, cx, cy) => (kind === 'F' ? pent(cx, cy, 17, 'var(--diagram-yellow)') : hex(cx, cy, 17, kind === 'G' ? 'var(--diagram-blue)' : 'var(--diagram-green)'));
const NAME = { G: 'glucose', L: 'galactose', F: 'fructose' };
const row = (y, a, b, name, note) => [
  ring(a, 50, y), lab(50, y + 34, NAME[a], { a: 'middle', size: 10 }), lab(84, y + 4, '+', { a: 'middle', size: 14 }), ring(b, 118, y), lab(118, y + 34, NAME[b], { a: 'middle', size: 10 }),
  S.arrow(152, y, 192, y, { w: 1.6, size: 7 }),
  ring(a, 236, y), S.line(253, y, 262, y, { w: 1.6 }), lab(268, y + 4, 'O', { a: 'middle', size: 11, c: 'var(--diagram-red)', w: 'bold' }), S.line(274, y, 283, y, { w: 1.6 }), ring(b, 300, y),
  lab(334, y + 4, '+  H₂O', { size: 12 }), lab(402, y - 2, name, { size: 13, w: 'bold' }), lab(402, y + 14, note, { size: 10, c: muted }),
].join('');
export const DISACCHARIDES = svgDoc(
  540,
  230,
  'Three disaccharides formed by joining two monosaccharides with a glycosidic bond and the loss of one water molecule: maltose from glucose and glucose, lactose from glucose and galactose, and sucrose from glucose and fructose',
  [row(40, 'G', 'G', 'Maltose', 'malt sugar'), row(110, 'G', 'L', 'Lactose', 'milk sugar'), row(180, 'G', 'F', 'Sucrose', 'cane sugar')].join(''),
);

export const ALL = { AMINO, ZWITTER, PROTEIN, PROTEIN_L, ENZYMES, ENZYMES_L, INHIBITION, TRIGLYCERIDE, DISACCHARIDES };
void TEMP;
void PH;
