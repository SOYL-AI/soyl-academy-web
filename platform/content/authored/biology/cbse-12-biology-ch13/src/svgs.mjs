// SVG diagrams for ch13 Biodiversity and Conservation (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { speciesFor, BIRDS } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Species–area relationship: arithmetic curve and log–log straight lines (computed)
const C = 10, Z = 0.15, Zc = 0.9;
const arith = () => {
  const pts = [];
  for (let a = 1; a <= 1000; a += 5) pts.push(`${pts.length ? 'L' : 'M'}${(30 + a * 0.17).toFixed(1)} ${(200 - (speciesFor(C, a, Z) - C) * 6).toFixed(1)}`);
  return pts.join(' ');
};
const lx = (la) => 260 + la * 55;
const ly = (ls) => 200 - (ls - 1) * 75;
export const SPECIESAREA = svgDoc(
  460,
  240,
  `Species–area relationship. Left: on ordinary axes, species richness S rises with explored area A but levels off, a rectangular hyperbola. Right: on logarithmic axes the relation becomes a straight line, log S = log C + Z log A; the slope Z is about 0.1 to 0.2 for most regions (drawn with Z = ${Z}), and much steeper, about 0.6 to 1.2, for very large areas such as whole continents (drawn with Z = ${Zc})`,
  [
    S.arrow(30, 205, 30, 30, { size: 6 }), S.arrow(25, 200, 210, 200, { size: 6 }),
    lab(34, 28, 'Species richness (S)', { size: 10 }), lab(206, 218, 'Area (A)', { size: 10, a: 'end' }),
    S.path(arith(), { c: 'var(--diagram-green)', w: 2.5 }),
    S.arrow(255, 205, 255, 30, { size: 6 }), S.arrow(250, 200, 450, 200, { size: 6 }),
    lab(259, 28, 'log S', { size: 10 }), lab(446, 218, 'log A', { size: 10, a: 'end' }),
    S.line(lx(0), ly(1), lx(3.3), ly(1 + Z * 3.3), { c: 'var(--diagram-blue)', w: 2.5 }),
    S.line(lx(0), ly(1), lx(2.1), ly(1 + Zc * 2.1), { c: 'var(--diagram-red)', w: 2.5 }),
    lab(446, 150, 'Z ≈ 0.1–0.2 (regions)', { size: 10, a: 'end', c: 'var(--diagram-blue)' }),
    lab(300, 48, 'Z ≈ 0.6–1.2 (continents)', { size: 10, c: 'var(--diagram-red)' }),
    lab(120, 236, 'Ordinary axes', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
    lab(350, 236, 'Log–log axes: log S = log C + Z log A', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Latitudinal gradient in bird species (bars computed from the counts)
const maxN = Math.max(...BIRDS.map((b) => b.n));
export const LATITUDE = svgDoc(
  460,
  240,
  `Latitudinal gradient in diversity: number of bird species ${BIRDS.map((b) => `${b.place} (${b.lat}) ${b.n}`).join(', ')}. Diversity generally decreases from the equator towards the poles`,
  [
    S.line(40, 190, 440, 190, { w: 1.5 }),
    ...BIRDS.map((b, i) => {
      const h = (b.n / maxN) * 140;
      const x = 60 + i * 95;
      const c = ['var(--diagram-green)', 'var(--diagram-green)', 'var(--diagram-blue)', 'var(--diagram-blue)'][i];
      return S.rect(x, 190 - h, 60, h, { fill: c, fop: 0.35, sw: 1 }) +
        S.text(x + 30, 184 - h, String(b.n), { a: 'middle', size: 11, w: 'bold' }) +
        S.text(x + 30, 206, b.place, { a: 'middle', size: 11 }) +
        S.text(x + 30, 220, b.lat, { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
    }),
    S.arrow(60, 233, 300, 233, { c: 'var(--diagram-muted)', w: 1.2, size: 6 }),
    lab(306, 237, 'towards the poles', { size: 10, c: 'var(--diagram-muted)' }),
    lab(40, 26, 'Number of bird species', { size: 10 }),
  ].join(''),
);

// 3. Share of described species
const bar = (y, parts, title) => {
  let x = 40;
  return S.text(40, y - 8, title, { size: 11, w: 'bold' }) + parts.map(([name, p, c]) => {
    const w = p * 3.8;
    const s = S.rect(x, y, w, 30, { fill: c, fop: 0.35, sw: 1 }) + S.text(x + w / 2, y + 19, name ? `${name} ${p}%` : `${p}%`, { a: 'middle', size: 10 });
    x += w;
    return s;
  }).join('');
};
export const SHARES = svgDoc(
  460,
  200,
  'Share of described species. Of all recorded species, more than 70 percent are animals and no more than 22 percent are plants (including algae, fungi, bryophytes, gymnosperms and angiosperms), the remainder being other groups. Among animals, insects are the most species-rich group, making up more than 70 percent: of every ten animals, seven are insects',
  [
    bar(40, [['Animals', 70, 'var(--diagram-red)'], ['Plants', 22, 'var(--diagram-green)'], ['', 8, 'var(--diagram-muted)']], 'All recorded species (about 1.5 million described)'),
    bar(120, [['Insects', 70, 'var(--diagram-yellow)'], ['Other animals', 30, 'var(--diagram-blue)']], 'Among animals'),
    lab(40, 180, 'Approximate shares: animals over 70, plants at most 22, insects over 70 of animals', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { SPECIESAREA, LATITUDE, SHARES };
