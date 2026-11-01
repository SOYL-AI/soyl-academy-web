// SVG diagrams for ICSE 10 Biology ch12 Endocrine System. All new drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { SUGAR, NORMAL } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- 1. location of the endocrine glands (named and lettered)
function glands(lettered) {
  const p = [];
  // body outline
  p.push(S.ellipse(150, 62, 38, 44, { sw: 1.5 }));
  p.push(S.ellipse(150, 50, 27, 24, { c: 'var(--diagram-muted)', sw: 1, dash: '3 3' }));
  p.push(S.line(138, 104, 136, 136), S.line(162, 104, 164, 136));
  p.push(S.path('M136 136 L84 150 Q74 154 74 168 L72 330 Q150 350 228 330 L226 168 Q226 154 216 150 L164 136', { w: 1.5 }));
  p.push(S.line(150, 106, 150, 176, { c: 'var(--diagram-muted)', w: 3 }));
  // pituitary at the base of the brain
  p.push(S.circle(150, 79, 5, { fill: 'var(--diagram-red)', sw: 1 }));
  // thyroid: two lobes joined by an isthmus
  p.push(S.ellipse(142, 124, 6, 11, { fill: 'var(--diagram-accent)', fop: 0.5, sw: 1 }), S.ellipse(158, 124, 6, 11, { fill: 'var(--diagram-accent)', fop: 0.5, sw: 1 }), S.rect(146, 124, 8, 5, { fill: 'var(--diagram-accent)', fop: 0.5, sw: 0.8 }));
  // pancreas: long leaf-like gland behind the stomach
  p.push(S.path('M110 210 Q128 196 160 199 Q186 201 200 194 Q204 205 188 212 Q160 218 130 219 Q112 221 110 210 Z', { fill: 'var(--diagram-yellow)', fop: 0.45, w: 1.2 }));
  // kidneys with an adrenal cap on each
  p.push(S.ellipse(122, 264, 13, 22, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.2 }), S.ellipse(178, 264, 13, 22, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.2 }));
  p.push(S.path('M110 244 L122 229 L134 244 Z', { fill: 'var(--diagram-green)', fop: 0.6, w: 1 }), S.path('M166 244 L178 229 L190 244 Z', { fill: 'var(--diagram-green)', fop: 0.6, w: 1 }));
  // testes
  p.push(S.path('M128 346 Q130 382 150 380 Q170 382 172 346', { w: 1.2 }));
  p.push(S.ellipse(141, 362, 8, 11, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1 }), S.ellipse(159, 362, 8, 11, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1 }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Pituitary (base of brain)', 'Thyroid (in the neck)', 'Adrenal (cap on each kidney)', 'Pancreas (behind the stomach)', 'Testis (male gonad)'];
  const o = lettered ? { size: 15, w: 'bold' } : {};
  const lbl = (i, x, y, ty) => p.push(S.lead(x, y, 256, ty - 4), lab(262, ty, L[i], o));
  lbl(0, 155, 79, 70);
  lbl(1, 164, 124, 124);
  lbl(3, 202, 200, 196);
  lbl(2, 186, 236, 236);
  lbl(4, 167, 362, 366);
  p.push(S.lead(191, 270, 256, 280), lab(262, 284, 'Kidney', { c: 'var(--diagram-muted)' }));
  const label = lettered
    ? 'Outline of a human male body with five glands lettered: A, a pea-sized gland at the base of the brain; B, a two-lobed gland in the neck; C, a cap-shaped gland on top of each kidney; D, a long leaf-shaped gland behind the stomach; E, a gland in the scrotum'
    : 'Outline of a human male body showing the pituitary at the base of the brain, the two-lobed thyroid in the neck, the long pancreas behind the stomach, an adrenal gland capping each kidney, and the testes';
  return svgDoc(470, 400, label, p.join(''));
}
export const GLANDS = glands(false);
export const GLANDS_LETTERED = glands(true);

// ---------------------------------------------------------------- 2. TSH–thyroxine feedback loop
export const FEEDBACK = (() => {
  const p = [];
  const box = (y, t1, t2, col) => {
    p.push(S.rect(170, y, 200, 46, { rx: 8, fill: col, fop: 0.18, sw: 1.4 }));
    p.push(S.text(270, y + 19, t1, { a: 'middle', size: 13, w: 'bold' }), S.text(270, y + 36, t2, { a: 'middle', size: 11 }));
  };
  box(20, 'Pituitary (anterior lobe)', 'releases TSH', 'var(--diagram-blue)');
  box(140, 'Thyroid gland', 'releases thyroxine', 'var(--diagram-accent)');
  box(260, 'Body cells', 'rate of metabolism set', 'var(--diagram-green)');
  p.push(S.arrow(270, 66, 270, 138, { size: 8 }), lab(280, 106, 'TSH in blood', { w: 'bold' }));
  p.push(S.arrow(270, 186, 270, 258, { size: 8 }), lab(280, 226, 'Thyroxine in blood', { w: 'bold' }));
  // feedback branches
  p.push(S.path('M270 222 L140 222 L140 43 L168 43', { c: 'var(--diagram-green)', w: 1.8, dash: '6 4' }), S.head(169, 43, 0, { c: 'var(--diagram-green)', size: 8 }));
  p.push(S.path('M270 232 L420 232 L420 43 L372 43', { c: 'var(--diagram-red)', w: 1.8, dash: '6 4' }), S.head(371, 43, Math.PI, { c: 'var(--diagram-red)', size: 8 }));
  p.push(S.lines(10, 120, ['Too little', 'thyroxine:', 'more TSH', 'released (+)'], { size: 11, c: 'var(--diagram-green)', dy: 14 }));
  p.push(S.lines(430, 120, ['Too much', 'thyroxine:', 'less TSH', 'released (−)'], { size: 11, c: 'var(--diagram-red)', dy: 14 }));
  p.push(S.text(270, 330, 'The level of thyroxine controls how much TSH the pituitary releases', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(540, 342, 'Feedback loop: the anterior pituitary releases TSH, which makes the thyroid release thyroxine, which sets the rate of metabolism in body cells. A green branch shows that too little thyroxine makes the pituitary release more TSH; a red branch shows that too much thyroxine makes it release less TSH', p.join(''));
})();

// ---------------------------------------------------------------- 3. pancreas: exocrine acini and an endocrine islet
export const PANCREAS = (() => {
  const p = [];
  // duodenum and pancreas
  p.push(S.path('M52 40 Q18 130 56 196 Q86 236 128 214', { c: 'var(--diagram-muted)', w: 14, cap: 'round' }));
  p.push(S.path('M74 150 Q100 122 150 120 Q200 114 232 104 Q242 116 228 128 Q190 142 150 152 Q110 164 74 150 Z', { fill: 'var(--diagram-yellow)', fop: 0.35, w: 1.4 }));
  p.push(S.path('M226 117 Q180 128 150 136 Q110 146 66 148', { c: 'var(--diagram-accent)', w: 1.6 }));
  p.push(lab(20, 250, 'Duodenum'), S.lead(46, 240, 46, 210));
  p.push(lab(120, 92, 'Pancreas'), lab(100, 186, 'Pancreatic duct', { c: 'var(--diagram-accent)' }), S.lead(150, 176, 160, 138));
  // zoom box
  p.push(S.line(184, 132, 268, 60, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }), S.line(184, 132, 268, 250, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }));
  p.push(S.rect(268, 30, 252, 228, { rx: 8, c: 'var(--diagram-muted)', sw: 1, dash: '4 3' }));
  // acinus: ring of enzyme-making cells round a tiny duct
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * 2 * Math.PI;
    p.push(S.circle(330 + 22 * Math.cos(a), 120 + 22 * Math.sin(a), 11, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }));
  }
  p.push(S.line(330, 120, 330, 52, { c: 'var(--diagram-accent)', w: 2.2 }), S.head(330, 48, -Math.PI / 2, { c: 'var(--diagram-accent)', size: 7 }));
  p.push(lab(338, 58, 'to duct: enzymes', { size: 10 }));
  p.push(lab(290, 166, 'Acinus (exocrine)', { w: 'bold' }));
  // islet with alpha and beta cells beside a capillary
  p.push(S.circle(440, 176, 36, { dash: '4 3', sw: 1.2 }));
  const cells = [[426, 160, 'b'], [446, 156, 'b'], [460, 172, 'a'], [430, 180, 'b'], [450, 190, 'b'], [418, 196, 'a'], [438, 200, 'b'], [462, 194, 'b'], [414, 172, 'b']];
  for (const [x, y, t] of cells) p.push(S.circle(x, y, 7, { fill: t === 'a' ? 'var(--diagram-red)' : 'var(--diagram-blue)', fop: 0.55, sw: 0.8 }));
  p.push(S.path('M396 236 Q440 214 512 230', { c: 'var(--diagram-red)', w: 4, cap: 'round' }));
  p.push(lab(390, 122, 'Islet of Langerhans', { w: 'bold' }), lab(390, 136, '(endocrine)', { w: 'bold' }));
  p.push(lab(398, 252, 'Blood capillary', { size: 10 }));
  // legend
  p.push(S.circle(278, 280, 6, { fill: 'var(--diagram-blue)', fop: 0.55, sw: 0.8 }), lab(290, 284, 'Beta cell: insulin'));
  p.push(S.circle(408, 280, 6, { fill: 'var(--diagram-red)', fop: 0.55, sw: 0.8 }), lab(420, 284, 'Alpha cell: glucagon'));
  return svgDoc(530, 296, 'The pancreas lies in the loop of the duodenum with a pancreatic duct running along it. A magnified box shows an acinus, a ring of cells sending enzymes into a duct (exocrine part), and an islet of Langerhans, a cluster of alpha cells (glucagon) and beta cells (insulin) beside a blood capillary that carries the hormones away (endocrine part)', p.join(''));
})();

// ---------------------------------------------------------------- 4. blood sugar after a sweet drink (imagined data from calc.mjs)
export const GLUCOSE = (() => {
  const p = [];
  const x = (h) => 100 + h * 140;
  const y = (v) => 250 - ((v - 50) * 210) / 250;
  p.push(S.rect(x(0) - 30, y(NORMAL.high), 340, y(NORMAL.low) - y(NORMAL.high), { fill: 'var(--diagram-green)', fop: 0.15, sw: 0 }));
  p.push(lab(x(2) + 34, y(100) + 4, 'normal', { size: 10, c: 'var(--diagram-green)' }), lab(x(2) + 34, y(100) + 16, 'band', { size: 10, c: 'var(--diagram-green)' }));
  for (let v = 50; v <= 300; v += 50) p.push(S.line(70, y(v), 410, y(v), { c: 'var(--diagram-muted)', w: 0.5 }), S.text(64, y(v) + 4, String(v), { a: 'end', size: 10 }));
  p.push(S.line(70, 250, 410, 250, { w: 1.2 }), S.line(70, 250, 70, 34, { w: 1.2 }));
  SUGAR.hours.forEach((h) => p.push(S.text(x(h), 268, `${h} h`, { a: 'middle', size: 11 })));
  p.push(S.text(240, 290, 'Time after the sweet drink', { a: 'middle', size: 11 }));
  p.push(S.text(14, 24, 'Blood sugar (mg per 100 mL)', { size: 11 }));
  const series = (vals, col) => {
    p.push(S.path(vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${Math.round(y(v) * 10) / 10}`).join(' '), { c: col, w: 2.2 }));
    vals.forEach((v, i) => p.push(S.circle(x(i), y(v), 4, { fill: col, sw: 0 }), S.text(x(i), y(v) - 9, String(v), { a: 'middle', size: 10, c: col })));
  };
  series(SUGAR.ravi, 'var(--diagram-blue)');
  series(SUGAR.meena, 'var(--diagram-red)');
  p.push(S.line(300, 36, 318, 36, { c: 'var(--diagram-red)', w: 2.2 }), lab(322, 40, 'Meena'), S.line(370, 36, 388, 36, { c: 'var(--diagram-blue)', w: 2.2 }), lab(392, 40, 'Ravi'));
  return svgDoc(470, 300, `Line graph of blood sugar after a sweet drink. Ravi: ${SUGAR.ravi.join(', ')} at 0, 1 and 2 hours, back near the normal band of ${NORMAL.low} to ${NORMAL.high}. Meena: ${SUGAR.meena.join(', ')}, staying far above the band`, p.join(''));
})();
