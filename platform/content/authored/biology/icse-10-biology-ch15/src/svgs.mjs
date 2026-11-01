// SVG diagrams for ICSE 10 Biology ch15 Human Evolution. All new, schematic drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { ANCESTORS, CC } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- 1. skulls of an early ancestor and a modern human (side view)
function skulls(lettered) {
  const p = [];
  // early ancestor (schematic, facing left)
  p.push(S.path('M232 176 Q242 130 214 100 Q186 80 140 84 Q112 86 96 104 L84 112 Q70 116 72 126 Q66 138 62 150 Q52 160 50 176 L52 186 Q50 200 60 210 Q76 220 120 218 Q160 216 176 204 Q184 192 186 178 Q210 182 232 176 Z', { fill: 'var(--diagram-yellow)', fop: 0.2, w: 1.6 }));
  p.push(S.path('M74 118 Q92 108 112 114', { w: 4, cap: 'round', c: 'var(--diagram-brown)' }));
  p.push(S.circle(100, 134, 11, { sw: 1.2 }), S.path('M64 152 Q74 156 78 146', { w: 1.2 }));
  p.push(S.line(52, 186, 120, 186, { w: 1 }), S.path('M60 186 L63 200 L67 186', { fill: 'var(--diagram-fill)', fop: 1, w: 1.2 }));
  p.push(S.ellipse(196, 150, 9, 6, { sw: 1 }));
  // modern human
  const dx = 300;
  p.push(S.path(`M${dx + 232} 176 Q${dx + 250} 110 ${dx + 210} 62 Q${dx + 170} 26 ${dx + 120} 36 Q${dx + 84} 46 ${dx + 80} 84 L${dx + 78} 112 Q${dx + 72} 118 ${dx + 76} 126 Q${dx + 70} 138 ${dx + 68} 150 Q${dx + 64} 160 ${dx + 72} 168 L${dx + 74} 182 Q${dx + 70} 196 ${dx + 66} 206 Q${dx + 74} 220 ${dx + 120} 218 Q${dx + 160} 216 ${dx + 176} 204 Q${dx + 184} 192 ${dx + 186} 178 Q${dx + 210} 182 ${dx + 232} 176 Z`, { fill: 'var(--diagram-blue)', fop: 0.15, w: 1.6 }));
  p.push(S.path(`M${dx + 78} 118 Q${dx + 90} 114 ${dx + 104} 116`, { w: 2, cap: 'round', c: 'var(--diagram-brown)' }));
  p.push(S.circle(dx + 100, 134, 11, { sw: 1.2 }), S.path(`M${dx + 70} 152 Q${dx + 78} 156 ${dx + 82} 146`, { w: 1.2 }));
  p.push(S.line(dx + 74, 182, dx + 120, 182, { w: 1 }), S.path(`M${dx + 78} 182 L${dx + 80} 189 L${dx + 82} 182`, { w: 1 }));
  p.push(S.ellipse(dx + 196, 150, 9, 6, { sw: 1 }));
  p.push(S.text(140, 254, 'Early ancestor (Australopithecus)', { a: 'middle', size: 12, w: 'bold' }), S.text(dx + 150, 254, 'Modern human', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.text(140, 270, `braincase about ${CC.aus} cubic cm`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), S.text(dx + 150, 270, `braincase about ${CC.mod} cubic cm`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  const L = (x, y, tx, ty, s, a = 'start') => p.push(S.lead(x, y, tx + (a === 'end' ? 4 : -4), ty - 4), S.text(tx, ty, s, { a, ...o }));
  if (lettered) {
    L(80, 112, 40, 70, 'A', 'end');
    L(dx + 160, 40, dx + 186, 20, 'B');
    L(dx + 68, 204, dx + 30, 230, 'C', 'end');
    L(64, 196, 30, 230, 'D', 'end');
    L(52, 168, 22, 150, 'E', 'end');
  } else {
    L(80, 112, 70, 64, 'Heavy brow ridge', 'end');
    L(130, 86, 150, 40, 'Low, sloping forehead');
    L(64, 196, 30, 238, 'Large canine', 'end');
    L(52, 168, 40, 160, 'Jaws', 'end'), p.push(S.text(36, 173, 'project', { a: 'end', size: 11 }));
    L(100, 216, 110, 238, 'No chin');
    L(dx + 160, 40, dx + 186, 20, 'High, rounded braincase');
    L(dx + 80, 90, dx + 28, 84, 'Steep forehead', 'end');
    L(dx + 90, 115, dx + 28, 112, 'Small brow ridge', 'end');
    L(dx + 68, 204, dx + 30, 230, 'Chin', 'end');
    L(dx + 74, 160, dx + 28, 160, 'Flat face', 'end');
  }
  const label = lettered
    ? 'Side views of two skulls, both facing left. Left, an early ancestor (Australopithecus) with a braincase of about 500 cubic centimetres; A marks the thick bony ridge above the eye socket, D a long pointed tooth, and E the forward-jutting jaws. Right, a modern human with a braincase of about 1400 cubic centimetres; B marks the high, rounded braincase and C the bony point at the front of the lower jaw'
    : 'Side views of two skulls, both facing left. The early ancestor (Australopithecus) has a low braincase of about 500 cubic centimetres, a low sloping forehead, a heavy brow ridge, forward-jutting jaws, large canines and no chin. The modern human has a high, rounded braincase of about 1400 cubic centimetres, a steep forehead, a small brow ridge, a flat face, small canines and a chin';
  return svgDoc(720, 280, label, `<g transform="translate(80 0)">${p.join('')}</g>`);
}
export const SKULLS = skulls(false);
export const SKULLS_LETTERED = skulls(true);

// ---------------------------------------------------------------- 2. approximate cranial capacities
export const CRANIAL = (() => {
  const p = [];
  const x = (v) => 200 + v * 0.17;
  for (let v = 0; v <= 1800; v += 300) p.push(S.line(x(v), 20, x(v), 216, { c: 'var(--diagram-muted)', w: 0.5 }), S.text(x(v), 232, String(v), { a: 'middle', size: 10 }));
  ANCESTORS.forEach((a, i) => {
    const y = 28 + i * 31;
    p.push(S.rect(x(0), y, x(a.cc) - x(0), 20, { fill: a.key === 'mod' ? 'var(--diagram-blue)' : 'var(--diagram-green)', fop: 0.35, sw: 1.1 }));
    p.push(S.text(194, y + 14, a.name.replace(' (Homo sapiens sapiens)', ''), { a: 'end', size: 11 }), S.text(x(a.cc) + 5, y + 14, String(a.cc), { size: 10 }));
  });
  p.push(S.line(x(0), 20, x(0), 216, { w: 1.2 }));
  p.push(S.text(x(900), 250, 'Approximate cranial capacity (cubic centimetres)', { a: 'middle', size: 11 }));
  return svgDoc(530, 258, `Bar chart of approximate cranial capacities in cubic centimetres: ${ANCESTORS.map((a) => `${a.name} ${a.cc}`).join(', ')}. Brain size rose from the earliest ancestor to Cro-Magnon man`, p.join(''));
})();

// ---------------------------------------------------------------- 3. giraffe neck: Lamarck's and Darwin's explanations
export const GIRAFFE = (() => {
  const p = [];
  const g = (x, y, neck, { dead = false, col = 'var(--diagram-yellow)' } = {}) => {
    const out = [];
    out.push(S.ellipse(x, y, 20, 9, { fill: col, fop: 0.5, sw: 1.2 }));
    for (const dx of [-14, -6, 6, 14]) out.push(S.line(x + dx, y + 7, x + dx, y + 34, { w: 1.6 }));
    const hx = x + 14 + neck * 0.25, hy = y - 4 - neck;
    out.push(S.line(x + 14, y - 4, hx, hy, { w: 4, cap: 'round', c: col }), S.line(x + 14, y - 4, hx, hy, { w: 1, c: 'currentColor' }));
    out.push(S.ellipse(hx + 6, hy, 8, 4, { fill: col, fop: 0.7, sw: 1 }));
    if (dead) out.push(S.line(x - 24, y - 20, x + 26, y + 30, { c: 'var(--diagram-red)', w: 2.4 }), S.line(x + 26, y - 20, x - 24, y + 30, { c: 'var(--diagram-red)', w: 2.4 }));
    return out.join('');
  };
  const leaves = (x, y) => S.circle(x, y, 14, { fill: 'var(--diagram-green)', fop: 0.4, sw: 1 }) + S.line(x, y + 14, x, y + 34, { c: 'var(--diagram-brown)', w: 3 });
  p.push(S.text(14, 22, "Lamarck: use and inheritance of acquired characters", { size: 12, w: 'bold' }));
  p.push(leaves(96, 44), g(60, 112, 26), S.arrow(76, 72, 82, 56, { c: 'var(--diagram-accent)', size: 6 }));
  p.push(S.arrow(130, 100, 170, 100, { size: 7 }));
  p.push(leaves(256, 44), g(220, 112, 52));
  p.push(S.arrow(290, 100, 330, 100, { size: 7 }));
  p.push(g(380, 112, 52), S.ellipse(450, 132, 12, 6, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }), S.line(458, 128, 466, 104, { w: 2.5, c: 'var(--diagram-yellow)' }));
  p.push(lab(20, 168, 'Stretches its neck for leaves'), lab(186, 168, 'Neck lengthens by use'), lab(350, 168, 'Young inherit the longer neck'));
  p.push(S.line(10, 182, 630, 182, { c: 'var(--diagram-muted)', w: 1, dash: '4 4' }));
  p.push(S.text(14, 204, 'Darwin: variation and natural selection', { size: 12, w: 'bold' }));
  p.push(g(44, 290, 22), g(100, 290, 38), g(156, 290, 52));
  p.push(S.arrow(196, 280, 230, 280, { size: 7 }));
  p.push(leaves(400, 224), g(262, 290, 22, { dead: true }), g(318, 290, 38, { dead: true }), g(374, 290, 52));
  p.push(S.arrow(414, 280, 448, 280, { size: 7 }));
  p.push(g(490, 290, 52), g(560, 290, 50));
  p.push(lab(30, 340, 'Necks vary at birth'), lab(250, 340, 'Food high up: short necks starve'), lab(476, 340, 'Long-necked young increase'));
  return svgDoc(640, 350, "Two explanations of the giraffe's long neck. Top, Lamarck: a giraffe stretches its neck to reach leaves, the neck lengthens by use, and its young inherit the longer neck. Bottom, Darwin: giraffes are born with necks of different lengths; when food is only high up, short-necked giraffes starve; long-necked giraffes survive, breed and become common", p.join(''));
})();

// ---------------------------------------------------------------- 4. peppered moths on pale and sooty bark
export const MOTHS = (() => {
  const p = [];
  const moth = (x, y, dark) => {
    const fill = dark ? 'currentColor' : 'var(--diagram-fill)';
    return S.path(`M${x} ${y} Q${x - 16} ${y - 12} ${x - 20} ${y} Q${x - 12} ${y + 10} ${x} ${y} Z`, { fill, fop: 1, w: 1 }) + S.path(`M${x} ${y} Q${x + 16} ${y - 12} ${x + 20} ${y} Q${x + 12} ${y + 10} ${x} ${y} Z`, { fill, fop: 1, w: 1 }) + S.line(x, y - 6, x, y + 6, { w: 2 });
  };
  // pale trunk with lichen
  p.push(S.rect(70, 40, 110, 200, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.4 }));
  for (const [x, y, rx] of [[92, 70, 12], [150, 100, 14], [100, 150, 10], [160, 190, 12], [84, 214, 9], [130, 60, 8]]) p.push(S.ellipse(x, y, rx, rx * 0.6, { fill: 'var(--diagram-green)', fop: 0.3, sw: 0 }));
  p.push(moth(110, 110, false), moth(140, 180, true));
  // sooty trunk
  p.push(S.rect(330, 40, 110, 200, { fill: 'var(--diagram-brown)', fop: 0.85, sw: 1.4 }));
  p.push(moth(370, 110, true), moth(400, 180, false));
  p.push(S.text(125, 28, 'Clean area: pale, lichen-covered bark', { a: 'middle', size: 12, w: 'bold' }), S.text(385, 28, 'Industrial area: soot-darkened bark', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.lead(126, 114, 190, 120), lab(194, 118, 'Light form'), lab(194, 131, 'hidden'));
  p.push(S.lead(156, 182, 190, 186), lab(194, 184, 'Dark form'), lab(194, 197, 'easily seen'));
  p.push(S.lead(386, 114, 450, 120), lab(454, 118, 'Dark form'), lab(454, 131, 'hidden'));
  p.push(S.lead(416, 182, 450, 186), lab(454, 184, 'Light form'), lab(454, 197, 'easily seen'));
  p.push(S.text(125, 262, 'Birds eat more dark moths: light form common', { a: 'middle', size: 11 }), S.text(385, 262, 'Birds eat more light moths: dark form common', { a: 'middle', size: 11 }));
  return svgDoc(540, 276, 'Peppered moths on two tree trunks. Left, a pale trunk covered with lichen in a clean area: the light form is hidden and the dark form is easily seen, so birds eat more dark moths and the light form is common. Right, a soot-darkened trunk in an industrial area: the dark form is hidden and the light form is easily seen, so birds eat more light moths and the dark form becomes common', p.join(''));
})();
