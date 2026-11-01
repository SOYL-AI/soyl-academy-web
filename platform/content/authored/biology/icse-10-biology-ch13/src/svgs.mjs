// SVG diagrams for ICSE 10 Biology ch13 Reproductive System. All new, simplified textbook-style line drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { CYCLE } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const mirror = (d, cx) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => `${Math.round((2 * cx - Number(x)) * 10) / 10} ${y}`);
const sperm = (x, y, { s = 1, c = 'currentColor' } = {}) =>
  S.ellipse(x, y, 5 * s, 3 * s, { fill: c, sw: 0 }) + S.path(`M${x - 5 * s} ${y} q-4 -4 -8 0 t-8 0 t-8 0`, { c, w: 1.2 });

// ---------------------------------------------------------------- 1. male reproductive system (front view, simplified)
function male(lettered) {
  const p = [];
  const cx = 220;
  // urinary bladder and ureters
  p.push(S.line(160, 18, 190, 50, { c: 'var(--diagram-muted)', w: 2 }), S.line(280, 18, 250, 50, { c: 'var(--diagram-muted)', w: 2 }));
  p.push(S.ellipse(cx, 72, 44, 34, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.4 }));
  // scrotum and testes
  p.push(S.path('M190 200 Q128 196 130 256 Q134 312 220 312 Q306 312 310 256 Q312 196 250 200', { fill: 'var(--diagram-fill)', fop: 1, w: 1.4 }));
  p.push(S.ellipse(172, 254, 18, 26, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.3 }), S.ellipse(268, 254, 18, 26, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.3 }));
  const epi = 'M156 236 Q146 254 158 276 Q164 284 170 280';
  p.push(S.path(epi, { c: 'var(--diagram-accent)', w: 5, cap: 'round' }), S.path(mirror(epi, cx), { c: 'var(--diagram-accent)', w: 5, cap: 'round' }));
  // vas deferens: from the epididymis, up and over the bladder to the urethra
  const vas = 'M162 282 Q140 280 140 248 L142 200 Q138 150 134 110 Q132 40 176 36 Q206 36 206 70 L206 100 Q206 120 214 132';
  p.push(S.path(vas, { c: 'var(--diagram-brown)', w: 2.2 }), S.path(mirror(vas, cx), { c: 'var(--diagram-brown)', w: 2.2 }));
  // seminal vesicles
  const sv = 'M168 84 Q156 100 168 118 Q176 126 184 116 Q190 100 178 86 Q172 80 168 84 Z';
  p.push(S.path(sv, { fill: 'var(--diagram-green)', fop: 0.45, w: 1.2 }), S.path(mirror(sv, cx), { fill: 'var(--diagram-green)', fop: 0.45, w: 1.2 }));
  p.push(S.line(182, 118, 214, 134, { c: 'var(--diagram-green)', w: 1.6 }), S.line(258, 118, 226, 134, { c: 'var(--diagram-green)', w: 1.6 }));
  // prostate round the urethra; Cowper's glands
  p.push(S.ellipse(cx, 134, 24, 14, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1.3 }));
  p.push(S.circle(204, 166, 6, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1 }), S.circle(236, 166, 6, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1 }));
  // penis (in front of the scrotum) with the urethra
  p.push(S.path('M208 176 L208 300 Q220 320 232 300 L232 176', { fill: 'var(--diagram-fill)', fop: 1, w: 1.4 }));
  p.push(S.line(cx, 106, cx, 312, { c: 'var(--diagram-red)', w: 2 }));
  const L = lettered ? { testis: 'A', epi: 'B', vas: 'C', sv: 'D', pro: 'E' } : { testis: 'Testis', epi: 'Epididymis', vas: 'Vas deferens', sv: 'Seminal vesicle', pro: 'Prostate gland' };
  const o = (isLetter) => (lettered && isLetter ? { size: 15, w: 'bold' } : {});
  const left = (x, y, ty, s, letter) => p.push(S.lead(x, y, 112, ty - 4), lab(108, ty, s, { a: 'end', ...o(letter) }));
  const right = (x, y, ty, s, letter) => p.push(S.lead(x, y, 330, ty - 4), lab(334, ty, s, o(letter)));
  left(178, 50, 40, 'Urinary bladder');
  left(134, 112, 112, L.vas, true);
  left(166, 98, 76, L.sv, true);
  left(150, 256, 228, L.epi, true);
  left(160, 270, 272, L.testis, true);
  left(150, 300, 318, 'Scrotum');
  right(240, 134, 132, L.pro, true);
  right(240, 166, 170, "Cowper's gland");
  right(222, 200, 208, 'Urethra');
  right(232, 298, 300, 'Penis');
  const label = lettered
    ? 'Simplified front view of the human male reproductive system with five parts lettered: A, an oval organ in the scrotum; B, a coiled tube along the outer side of A; C, a long tube running from B up and over the urinary bladder to the urethra; D, a lobed sac behind the bladder; E, a gland surrounding the urethra just below the bladder. The urinary bladder, Cowper\'s glands, urethra, penis and scrotum are named'
    : 'Simplified front view of the human male reproductive system: testes in the scrotum, the epididymis along each testis, the vas deferens running up and over the urinary bladder to the urethra, the seminal vesicles behind the bladder, the prostate gland round the urethra, two small Cowper\'s glands, and the urethra running through the penis';
  return svgDoc(440, 330, label, p.join(''));
}
export const MALE = male(false);
export const MALE_LETTERED = male(true);

// ---------------------------------------------------------------- 2. female reproductive system (front view, simplified)
function female(lettered) {
  const p = [];
  const cx = 230;
  p.push(S.path('M180 80 Q230 70 280 80 Q290 140 258 196 L250 214 L210 214 L202 196 Q170 140 180 80 Z', { fill: 'var(--diagram-red)', fop: 0.15, w: 1.5 }));
  p.push(S.path('M196 94 Q230 88 264 94 Q262 140 240 186 L220 186 Q198 140 196 94 Z', { fill: 'var(--diagram-fill)', fop: 1, w: 1, dash: '4 3' }));
  p.push(S.path('M210 214 L208 236 L252 236 L250 214', { w: 1.5 }));
  p.push(S.line(208, 236, 200, 318, { w: 1.5 }), S.line(252, 236, 260, 318, { w: 1.5 }), S.line(222, 236, 220, 318, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }), S.line(238, 236, 240, 318, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }));
  const tube = 'M184 90 Q150 66 118 80 Q94 92 90 118';
  p.push(S.path(tube, { w: 3 }), S.path(mirror(tube, cx), { w: 3 }));
  for (const [dx, dy] of [[-12, 8], [-8, 15], [0, 17], [8, 14]]) p.push(S.line(90, 118, 90 + dx, 118 + dy, { w: 1.4 }), S.line(370, 118, 370 - dx, 118 + dy, { w: 1.4 }));
  p.push(S.ellipse(110, 156, 22, 13, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.3 }), S.ellipse(350, 156, 22, 13, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.3 }));
  p.push(S.line(130, 152, 186, 122, { c: 'var(--diagram-muted)', w: 1 }), S.line(330, 152, 274, 122, { c: 'var(--diagram-muted)', w: 1 }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Ovary', 'Oviduct (fallopian tube)', 'Uterus', 'Cervix', 'Vagina'];
  const o = lettered ? { size: 15, w: 'bold' } : {};
  p.push(S.lead(100, 162, 64, 196), lab(60, 204, L[0], { a: 'end', ...o }));
  p.push(S.lead(140, 72, 104, 40), lab(lettered ? 100 : 20, 36, L[1], o));
  p.push(S.lead(270, 160, 396, 202), lab(400, 208, L[2], o));
  p.push(S.lead(252, 226, 396, 240), lab(400, 246, L[3], o));
  p.push(S.lead(256, 292, 396, 292), lab(400, 298, L[4], o));
  if (!lettered) p.push(S.lead(80, 128, 52, 110), lab(48, 106, 'Fimbriae', { a: 'end' }), S.lead(206, 150, 70, 290), lab(14, 304, 'Lining of uterus'));
  const label = lettered
    ? 'Simplified front view of the human female reproductive system with five parts lettered: A, an oval organ at each side; B, a tube with a fringed funnel near A, leading to the top of the central organ; C, the pear-shaped central organ with a thick muscular wall; D, the narrow neck at the lower end of C; E, the tube leading from D to the outside'
    : 'Simplified front view of the human female reproductive system: an ovary on each side, the oviduct (fallopian tube) with its fringed funnel (fimbriae) near each ovary leading to the top of the pear-shaped uterus, the lining of the uterus, the cervix at its narrow lower end, and the vagina leading to the outside';
  return svgDoc(480, 330, label, p.join(''));
}
export const FEMALE = female(false);
export const FEMALE_LETTERED = female(true);

// ---------------------------------------------------------------- 3. sperm and egg (not to scale)
export const GAMETES = (() => {
  const p = [];
  p.push(S.text(150, 24, 'Human sperm', { a: 'middle', size: 13, w: 'bold' }));
  p.push(S.ellipse(70, 120, 24, 14, { fill: 'var(--diagram-blue)', fop: 0.2, sw: 1.4 }));
  p.push(S.path('M62 106.5 Q44 108 46 120 Q44 132 62 133.5 Q52 120 62 106.5 Z', { fill: 'var(--diagram-accent)', fop: 0.55, w: 1 }));
  p.push(S.ellipse(76, 120, 12, 8, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 1 }));
  p.push(S.rect(96, 114, 44, 12, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.2 }));
  p.push(S.path('M98 120 L102 115 L106 125 L110 115 L114 125 L118 115 L122 125 L126 115 L130 125 L134 115 L138 120', { c: 'var(--diagram-green)', w: 1.2 }));
  p.push(S.path('M140 120 C160 100 175 140 195 120 S230 100 250 120 S285 140 300 120', { w: 1.6 }));
  p.push(S.lead(50, 112, 34, 76), lab(14, 70, 'Acrosome'));
  p.push(S.lead(76, 126, 66, 168), lab(40, 180, 'Nucleus (haploid)'));
  p.push(S.lead(118, 113, 128, 76), lab(100, 70, 'Middle piece (mitochondria)'));
  p.push(S.lead(250, 124, 250, 160), lab(236, 174, 'Tail'));
  p.push(S.lines(60, 214, ['Head = acrosome + nucleus'], { size: 10, c: 'var(--diagram-muted)' }));
  // egg
  const ex = 470, ey = 128;
  p.push(S.text(ex, 24, 'Human egg (ovum)', { a: 'middle', size: 13, w: 'bold' }));
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * 2 * Math.PI;
    p.push(S.circle(ex + 90 * Math.cos(a), ey + 90 * Math.sin(a), 9, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1 }));
  }
  p.push(S.circle(ex, ey, 78, { fill: 'var(--diagram-accent)', fop: 0.18, sw: 1.3 }), S.circle(ex, ey, 70, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  p.push(S.circle(ex - 10, ey - 6, 16, { fill: 'var(--diagram-blue)', fop: 0.4, sw: 1.2 }));
  p.push(S.lead(ex + 62, ey - 78, 590, 50), lab(596, 46, 'Follicle cells'));
  p.push(S.lead(ex + 74, ey + 20, 590, 150), lab(596, 154, 'Zona pellucida'));
  p.push(S.lead(ex + 30, ey + 30, 590, 196), lab(596, 200, 'Cytoplasm'));
  p.push(S.lead(ex - 10, ey - 6, 590, 100), lab(596, 104, 'Nucleus'), lab(596, 117, '(haploid)'));
  p.push(S.text(340, 244, 'Not to scale: the egg is many times wider than the sperm head.', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(690, 252, 'Left: a human sperm with a head made of a cap-like acrosome and a haploid nucleus, a middle piece packed with spirally arranged mitochondria, and a long tail. Right: a human egg, a large round cell with a haploid nucleus and cytoplasm, surrounded by a clear zona pellucida and a ring of follicle cells. Not to scale', p.join(''));
})();

// ---------------------------------------------------------------- 4. foetus in the uterus: placenta, cord, amnion
export const FOETUS = (() => {
  const p = [];
  const cx = 250, cy = 160;
  p.push(S.path('M232 296 L234 326 M268 296 L266 326', { w: 1.6 }));
  p.push(S.ellipse(cx, cy, 160, 140, { fill: 'var(--diagram-red)', fop: 0.15, sw: 1.6 }));
  p.push(S.ellipse(cx, cy + 4, 132, 114, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 }));
  p.push(S.ellipse(cx + 12, cy + 14, 104, 92, { fill: 'var(--diagram-blue)', fop: 0.13, sw: 1.3, dash: '5 3', c: 'var(--diagram-blue)' }));
  // placenta on the upper-left wall
  p.push(S.path('M126 112 Q150 60 214 50 Q206 70 196 80 Q160 92 140 122 Z', { fill: 'var(--diagram-brown)', fop: 0.5, w: 1.3 }));
  // foetus
  p.push(S.circle(272, 120, 30, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1.4 }));
  p.push(S.ellipse(262, 192, 36, 46, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1.4 }));
  p.push(S.path('M286 176 Q306 196 290 214', { w: 6, cap: 'round', c: 'var(--diagram-yellow)' }), S.path('M240 222 Q236 248 262 246 Q282 244 290 232', { w: 8, cap: 'round', c: 'var(--diagram-yellow)' }));
  // umbilical cord
  p.push(S.path('M176 86 C196 120 160 146 196 160 C220 170 214 196 236 196', { c: 'var(--diagram-red)', w: 4, cap: 'round' }));
  const L = (x, y, ty, s) => p.push(S.lead(x, y, 424, ty - 4), lab(428, ty, s));
  p.push(S.lead(150, 90, 64, 56), lab(60, 52, 'Placenta', { a: 'end' }));
  p.push(S.lead(186, 140, 64, 150), lab(60, 154, 'Umbilical', { a: 'end' }), lab(60, 167, 'cord', { a: 'end' }));
  L(400, 130, 60, 'Uterine wall');
  L(358, 120, 104, 'Amnion');
  L(330, 230, 220, 'Amniotic fluid');
  L(292, 120, 160, 'Foetus');
  L(268, 312, 300, 'Cervix');
  return svgDoc(540, 334, 'A foetus inside the uterus. The thick uterine wall surrounds a cavity; the foetus floats in amniotic fluid inside a membrane, the amnion. A disc-shaped placenta is attached to the upper wall of the uterus and joined to the foetus by the umbilical cord. The cervix closes the lower end of the uterus', p.join(''));
})();

// ---------------------------------------------------------------- 5. outline of a 28-day menstrual cycle
export const CYCLE_STRIP = (() => {
  const p = [];
  const W = 480 / CYCLE.length;
  const X = (d) => 40 + (d - 1) * W; // left edge of day d
  const band = (from, to, col, text) => {
    p.push(S.rect(X(from), 34, (to - from + 1) * W, 34, { fill: col, fop: 0.3, sw: 1 }));
    p.push(S.text(X(from) + ((to - from + 1) * W) / 2, 55, text, { a: 'middle', size: 11 }));
  };
  band(CYCLE.mensFrom, CYCLE.mensTo, 'var(--diagram-red)', 'Menstruation');
  band(CYCLE.repairFrom, CYCLE.repairTo, 'var(--diagram-yellow)', 'Repair of lining');
  band(CYCLE.ovulation, CYCLE.ovulation, 'var(--diagram-accent)', '');
  band(CYCLE.secretoryFrom, CYCLE.secretoryTo, 'var(--diagram-green)', 'Lining thick, ready for implantation');
  // thickness of the uterine lining
  const pts = [[1, 150], [3, 168], [5, 176], [9, 160], [14, 140], [20, 118], [26, 110], [27.5, 116], [28.9, 168]];
  const d = pts.map(([day, y], i) => `${i ? 'L' : 'M'}${Math.round((X(day) + W / 2) * 10) / 10} ${y}`).join(' ');
  p.push(S.path(`${d} L${X(28) + W} 186 L${X(1)} 186 Z`, { fill: 'var(--diagram-red)', fop: 0.15, w: 0 }));
  p.push(S.path(d, { c: 'var(--diagram-red)', w: 2 }));
  p.push(S.line(X(1), 186, X(28) + W, 186, { w: 1.2 }));
  p.push(lab(44, 92, 'Thickness of the uterine lining', { c: 'var(--diagram-red)' }));
  // ovulation marker
  const ox = X(CYCLE.ovulation) + W / 2;
  p.push(S.line(ox, 68, ox, 186, { dash: '4 3', c: 'var(--diagram-accent)', w: 1.2 }), S.circle(ox, 100, 6, { fill: 'var(--diagram-yellow)', fop: 0.8, sw: 1 }));
  p.push(lab(ox + 10, 104, `Ovulation (day ${CYCLE.ovulation})`, { c: 'var(--diagram-accent)' }));
  for (const day of [1, CYCLE.mensTo, CYCLE.ovulation, CYCLE.length]) p.push(S.line(X(day) + W / 2, 186, X(day) + W / 2, 192, { w: 1 }), S.text(X(day) + W / 2, 204, `Day ${day}`, { a: 'middle', size: 10 }));
  p.push(lab(X(CYCLE.repairFrom), 226, 'Oestrogen (from the growing follicle)', { size: 10, c: 'var(--diagram-muted)' }));
  p.push(lab(X(CYCLE.secretoryFrom) + 10, 242, 'Progesterone (from the corpus luteum)', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(560, 252, `Outline of a ${CYCLE.length}-day menstrual cycle. Days ${CYCLE.mensFrom} to ${CYCLE.mensTo}: menstruation, the lining of the uterus is shed. Days ${CYCLE.repairFrom} to ${CYCLE.repairTo}: oestrogen from the growing follicle rebuilds the lining. Day ${CYCLE.ovulation}: ovulation. Days ${CYCLE.secretoryFrom} to ${CYCLE.secretoryTo}: progesterone from the corpus luteum keeps the lining thick and ready for implantation; if there is no pregnancy it breaks down at the end of the cycle`, p.join(''));
})();

// ---------------------------------------------------------------- 6. identical and fraternal twins
export const TWINS_FIG = (() => {
  const p = [];
  const egg = (x, y) => S.circle(x, y, 20, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1.3 });
  const zyg = (x, y) => S.circle(x, y, 20, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.3 }) + S.circle(x, y, 5, { fill: 'currentColor', sw: 0 });
  const emb = (x, y, col) => S.circle(x, y, 17, { fill: col, fop: 0.3, sw: 1.3 }) + S.circle(x - 5, y - 4, 4, { fill: col, sw: 0 }) + S.circle(x + 5, y - 4, 4, { fill: col, sw: 0 }) + S.circle(x, y + 5, 4, { fill: col, sw: 0 });
  p.push(S.line(300, 16, 300, 250, { dash: '4 4', c: 'var(--diagram-muted)', w: 1 }));
  // identical
  p.push(S.text(150, 24, 'Identical (monozygotic) twins', { a: 'middle', size: 13, w: 'bold' }));
  p.push(egg(70, 72), sperm(44, 72));
  p.push(S.arrow(96, 72, 124, 72, { size: 7 }), zyg(146, 72), lab(170, 76, 'One zygote'));
  p.push(S.arrow(138, 94, 112, 128, { size: 7 }), S.arrow(154, 94, 180, 128, { size: 7 }));
  p.push(emb(104, 148, 'var(--diagram-blue)'), emb(188, 148, 'var(--diagram-blue)'));
  p.push(lab(30, 112, 'One egg +'), lab(30, 125, 'one sperm'));
  p.push(S.text(150, 194, 'The zygote splits into two embryos', { a: 'middle', size: 11 }));
  p.push(S.text(150, 212, 'Same genes, so always the same sex', { a: 'middle', size: 11, w: 'bold' }));
  // fraternal
  p.push(S.text(450, 24, 'Fraternal (dizygotic) twins', { a: 'middle', size: 13, w: 'bold' }));
  for (const [y, col] of [[62, 'var(--diagram-blue)'], [140, 'var(--diagram-red)']]) {
    p.push(egg(380, y), sperm(354, y), S.arrow(406, y, 434, y, { size: 7 }), zyg(456, y), S.arrow(480, y, 506, y, { size: 7 }), emb(528, y, col));
  }
  p.push(lab(318, 98, 'Two eggs +'), lab(318, 111, 'two sperms'), lab(430, 104, 'Two zygotes'));
  p.push(S.text(450, 194, 'Two separate fertilisations', { a: 'middle', size: 11 }));
  p.push(S.text(450, 212, 'Genes differ like siblings; may differ in sex', { a: 'middle', size: 11, w: 'bold' }));
  return svgDoc(600, 230, 'Left: identical twins, where one egg is fertilised by one sperm and the single zygote splits into two embryos with the same genes, so they are always of the same sex. Right: fraternal twins, where two eggs are fertilised by two sperms, giving two zygotes and two embryos whose genes differ like ordinary siblings, so they may differ in sex', p.join(''));
})();
