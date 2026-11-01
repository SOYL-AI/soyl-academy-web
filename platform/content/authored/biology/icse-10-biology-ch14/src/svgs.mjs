// SVG diagrams for ICSE 10 Biology ch14 Population. All new drawings; chart values come from calc.mjs.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { WORLD, INDIA, STAGES } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => Math.round(n * 10) / 10;

// ---------------------------------------------------------------- 1. world population milestones (J-shaped curve)
export const WORLD_FIG = (() => {
  const p = [];
  const x = (yr) => 70 + ((yr - 1800) * 400) / 230;
  const y = (b) => 260 - (b * 230) / 9;
  for (let b = 0; b <= 9; b++) p.push(S.line(70, y(b), 470, y(b), { c: 'var(--diagram-muted)', w: 0.5 }), S.text(62, y(b) + 4, String(b), { a: 'end', size: 10 }));
  for (let yr = 1800; yr <= 2025; yr += 50) p.push(S.text(x(yr), 276, String(yr), { a: 'middle', size: 10 }), S.line(x(yr), 260, x(yr), 265, { w: 1 }));
  p.push(S.line(70, 260, 470, 260, { w: 1.2 }), S.line(70, 260, 70, 22, { w: 1.2 }));
  p.push(S.path(WORLD.map(([yr, b], i) => `${i ? 'L' : 'M'}${f1(x(yr))} ${f1(y(b))}`).join(' '), { c: 'var(--diagram-red)', w: 2.2 }));
  WORLD.forEach(([yr, b], i) => p.push(S.circle(x(yr), y(b), 3.5, { fill: 'var(--diagram-red)', sw: 0 }), i ? S.text(x(yr) - 7, y(b) - 5, String(yr), { a: 'end', size: 10, c: 'var(--diagram-muted)' }) : S.text(x(yr) + 6, y(b) - 7, String(yr), { size: 10, c: 'var(--diagram-muted)' })));
  p.push(lab(14, 16, 'World population (billions)'), S.text(270, 296, 'Year', { a: 'middle', size: 11 }));
  return svgDoc(490, 302, `J-shaped curve of world population. Approximate UN milestones: ${WORLD.map(([yr, b]) => `${b} billion in ${yr}`).join(', ')}. Each extra billion has taken less time than the one before`, p.join(''));
})();

// ---------------------------------------------------------------- 2. Census of India populations (crore)
export const INDIA_FIG = (() => {
  const p = [];
  const y = (v) => 260 - v * 1.6;
  for (let v = 0; v <= 140; v += 20) p.push(S.line(70, y(v), 480, y(v), { c: 'var(--diagram-muted)', w: 0.5 }), S.text(62, y(v) + 4, String(v), { a: 'end', size: 10 }));
  INDIA.forEach(([yr, v], i) => {
    const bx = 84 + i * 56;
    p.push(S.rect(bx, y(v), 38, 260 - y(v), { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.2 }));
    p.push(S.text(bx + 19, y(v) - 5, String(v), { a: 'middle', size: 10 }), S.text(bx + 19, 276, String(yr), { a: 'middle', size: 10 }));
  });
  p.push(S.line(70, 260, 480, 260, { w: 1.2 }), S.line(70, 260, 70, 22, { w: 1.2 }));
  p.push(lab(14, 16, 'Population of India (crore), Census figures'), S.text(275, 296, 'Census year', { a: 'middle', size: 11 }));
  return svgDoc(490, 302, `Bar chart of the population of India at each Census, in crore: ${INDIA.map(([yr, v]) => `${yr}, ${v}`).join('; ')}. Every bar is taller than the one before, and the rise grows larger each decade`, p.join(''));
})();

// ---------------------------------------------------------------- 3. schematic: birth rate and death rate through four stages
export const STAGES_FIG = (() => {
  const p = [];
  const X0 = 60, W = 110;
  const y = (v) => 240 - v * 5;
  const mid = (i) => X0 + W * i + W / 2;
  for (let v = 0; v <= 40; v += 10) p.push(S.line(X0, y(v), X0 + 4 * W, y(v), { c: 'var(--diagram-muted)', w: 0.5 }), S.text(X0 - 8, y(v) + 4, String(v), { a: 'end', size: 10 }));
  const br = STAGES.map((s, i) => [mid(i), y(s.br)]);
  const dr = STAGES.map((s, i) => [mid(i), y(s.dr)]);
  p.push(S.path(`M${br.map(([a, b]) => `${a} ${b}`).join(' L')} L${[...dr].reverse().map(([a, b]) => `${a} ${b}`).join(' L')} Z`, { fill: 'var(--diagram-green)', fop: 0.2, w: 0 }));
  p.push(S.path(`M${br.map(([a, b]) => `${a} ${b}`).join(' L')}`, { c: 'var(--diagram-red)', w: 2.4 }), S.path(`M${dr.map(([a, b]) => `${a} ${b}`).join(' L')}`, { c: 'var(--diagram-blue)', w: 2.4 }));
  STAGES.forEach((s, i) => {
    p.push(S.circle(mid(i), y(s.br), 3.5, { fill: 'var(--diagram-red)', sw: 0 }), S.circle(mid(i), y(s.dr), 3.5, { fill: 'var(--diagram-blue)', sw: 0 }));
    p.push(S.text(mid(i), 258, s.name, { a: 'middle', size: 11, w: 'bold' }));
    if (i < 3) p.push(S.line(X0 + W * (i + 1), 30, X0 + W * (i + 1), 240, { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }));
  });
  p.push(S.line(X0, 240, X0 + 4 * W, 240, { w: 1.2 }), S.line(X0, 240, X0, 26, { w: 1.2 }));
  p.push(lab(14, 18, 'Rate per 1000 people per year'));
  p.push(S.line(300, 14, 318, 14, { c: 'var(--diagram-red)', w: 2.4 }), lab(322, 18, 'Birth rate'), S.line(392, 14, 410, 14, { c: 'var(--diagram-blue)', w: 2.4 }), lab(414, 18, 'Death rate'));
  p.push(S.text(mid(1), y(28), 'widest gap:', { a: 'middle', size: 10, c: 'var(--diagram-green)' }), S.text(mid(1), y(28) + 12, 'fastest growth', { a: 'middle', size: 10, c: 'var(--diagram-green)' }));
  p.push(S.text(260, 276, 'Schematic: illustrative rates, not data for a particular country', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(520, 284, `Schematic graph of birth rate and death rate through four stages. ${STAGES.map((s) => `${s.name}: birth rate ${s.br}, death rate ${s.dr}`).join('; ')} per 1000. The shaded gap between the lines, the growth, is widest in stage 2, when the death rate has fallen but the birth rate is still high`, p.join(''));
})();

// ---------------------------------------------------------------- 4. vasectomy and tubectomy (named and lettered)
function surgery(lettered) {
  const p = [];
  const tie = (x, y, h = true) => (h ? S.line(x - 7, y, x + 7, y, { w: 3, c: 'var(--diagram-red)', cap: 'round' }) : S.line(x, y - 7, x, y + 7, { w: 3, c: 'var(--diagram-red)', cap: 'round' }));
  // male
  p.push(S.text(120, 22, 'Vasectomy', { a: 'middle', size: 13, w: 'bold' }));
  p.push(S.ellipse(96, 210, 22, 30, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.3 }));
  p.push(S.path('M80 190 Q72 210 82 232 Q88 242 96 240', { c: 'var(--diagram-accent)', w: 5, cap: 'round' }));
  p.push(S.path('M98 242 Q130 240 132 206 L132 150', { c: 'var(--diagram-brown)', w: 2.4 }), S.path('M132 118 L132 56', { c: 'var(--diagram-brown)', w: 2.4 }));
  p.push(tie(132, 150), tie(132, 118));
  p.push(S.arrow(132, 56, 132, 38, { c: 'var(--diagram-brown)', size: 7 }), lab(142, 44, 'to urethra', { c: 'var(--diagram-muted)' }));
  // female
  p.push(S.text(410, 22, 'Tubectomy', { a: 'middle', size: 13, w: 'bold' }));
  p.push(S.path('M380 110 Q410 102 440 110 Q448 160 426 200 L394 200 Q372 160 380 110 Z', { fill: 'var(--diagram-red)', fop: 0.15, w: 1.5 }));
  p.push(S.path('M330 110 Q312 118 306 140', { w: 2.4 }), S.path('M383 116 Q362 100 350 104', { w: 2.4 }));
  p.push(S.path('M437 116 Q458 100 470 104', { w: 2.4 }), S.path('M490 110 Q508 118 514 140', { w: 2.4 }));
  p.push(tie(350, 104, false), tie(330, 110, false), tie(470, 104, false), tie(490, 110, false));
  p.push(S.ellipse(318, 166, 18, 11, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }), S.ellipse(502, 166, 18, 11, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }));
  p.push(S.path('M400 200 L398 240 M420 200 L422 240', { w: 1.4 }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Vas deferens: cut and tied', 'Testis', 'Oviduct: cut and tied', 'Ovary', 'Uterus'];
  const o = lettered ? { size: 15, w: 'bold' } : {};
  p.push(S.lead(140, 134, 176, 134), lettered ? lab(180, 139, L[0], o) : S.lines(180, 132, ['Vas deferens:', 'cut and tied'], { size: 11 }));
  p.push(S.lead(74, 214, 40, 214), lab(36, 218, L[1], { a: 'end', ...o }));
  p.push(S.lead(340, 104, 316, 74), lab(lettered ? 306 : 250, 68, L[2], o));
  p.push(S.lead(318, 177, 318, 220), lab(318, 234, L[3], { a: 'middle', ...o }));
  p.push(S.lead(436, 160, 480, 220), lab(484, 234, L[4], o));
  p.push(lab(10, 274, 'Red bars: tied ends; the gap is the short piece of tube removed.', { size: 10, c: 'var(--diagram-muted)' }));
  const label = lettered
    ? 'Two simplified diagrams. Left, vasectomy: a testis with its coiled tube, and a duct leading up towards the urethra with a short gap between two tied ends; the gap is lettered A and the testis B. Right, tubectomy: the uterus with a tube on each side leading to an oval organ; each tube has a gap between tied ends, lettered C; the oval organ is lettered D and the uterus E'
    : 'Two simplified diagrams. Left, vasectomy: the vas deferens leading from the testis towards the urethra has a short piece removed and both ends tied. Right, tubectomy: each oviduct between the ovary and the uterus has a short piece removed and both ends tied';
  return svgDoc(540, 282, label, p.join(''));
}
export const SURGERY = surgery(false);
export const SURGERY_LETTERED = surgery(true);
