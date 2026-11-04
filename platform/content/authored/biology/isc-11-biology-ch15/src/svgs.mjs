// SVG diagrams for ISC 11 Biology ch15 Plant Growth and Development. The growth curve comes from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { height, LOG, LAG_END, LOG_END, DAYS, HEIGHTS, MAXRATE, AUX, magnification } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const leaf = (x, y, dx, dy) => S.path(`M${x} ${y} q ${dx / 2} ${-6} ${dx} ${dy} q ${-dx / 2} ${8} ${-dx} ${-dy} Z`, { fill: 'var(--diagram-green)', fop: 0.6, w: 1 });
const cot = (x, y) => S.ellipse(x, y, 11, 6, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.2 });

// ---------------------------------------------------------------- 1. Types of germination (labelled and lettered)
function germ(letters) {
  const title = (cx, name, letter) => (letters ? tag(cx, 232, letter) : lab(cx, 234, name, { a: 'middle', w: 'bold' }));
  const note = (x, y, s, o) => (letters ? '' : sm(x, y, s, o));
  return [
    // soil under panels 1 and 2
    S.rect(10, 112, 300, 80, { fill: 'var(--diagram-brown)', fop: 0.18, sw: 0 }), S.line(10, 112, 310, 112, { c: 'var(--diagram-brown)', w: 1.5 }),
    // panel 1: epigeal
    S.path('M80 112 L80 178 M80 150 L62 168 M80 156 L98 172', { w: 1.8, c: 'var(--diagram-brown)' }),
    S.path('M80 112 L80 62', { w: 5, c: 'var(--diagram-green)', cap: 'round' }),
    cot(66, 56), cot(94, 56), S.path('M80 62 L80 38', { w: 2, c: 'var(--diagram-green)' }), leaf(80, 40, 12, -10), leaf(80, 40, -12, -10),
    note(88, 98, 'Hypocotyl elongates', { c: 'var(--diagram-muted)' }), note(110, 52, 'Cotyledons above', { c: 'var(--diagram-muted)' }), note(110, 64, 'the soil', { c: 'var(--diagram-muted)' }),
    title(80, 'Epigeal (castor, bean)', 'P'),
    // panel 2: hypogeal
    S.path('M230 140 L230 184 M230 160 L214 176 M230 164 L246 178', { w: 1.8, c: 'var(--diagram-brown)' }),
    S.ellipse(230, 134, 15, 9, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.2 }),
    S.path('M230 126 L230 60', { w: 3, c: 'var(--diagram-green)', cap: 'round' }), leaf(230, 70, 16, -10), leaf(230, 56, -16, -10), leaf(230, 48, 14, -8),
    note(250, 150, 'Cotyledons stay', { c: 'var(--diagram-muted)' }), note(250, 162, 'in the soil', { c: 'var(--diagram-muted)' }), note(254, 46, 'Epicotyl elongates', { c: 'var(--diagram-muted)' }),
    title(230, 'Hypogeal (pea, maize)', 'Q'),
    // panel 3: viviparous
    S.path('M330 22 L440 22', { w: 5, c: 'var(--diagram-brown)', cap: 'round' }),
    S.ellipse(385, 36, 12, 12, { fill: 'var(--diagram-green)', fop: 0.4, sw: 1.5 }),
    S.path('M381 46 L385 118 L389 46 Z', { fill: 'var(--diagram-green)', fop: 0.5, w: 1.5 }),
    leaf(385, 28, 10, -8), leaf(385, 28, -10, -8),
    S.rect(320, 172, 130, 40, { fill: 'var(--diagram-brown)', fop: 0.25, sw: 0 }), S.line(320, 172, 450, 172, { c: 'var(--diagram-brown)', w: 1.5 }),
    S.path('M385 118 L385 150', { w: 1, c: 'var(--diagram-muted)', dash: '3 3' }),
    note(376, 92, 'Radicle grows', { c: 'var(--diagram-muted)', a: 'end' }), note(376, 104, 'on the parent', { c: 'var(--diagram-muted)', a: 'end' }),
    note(326, 200, 'Falls and roots in mud', { c: 'var(--diagram-muted)' }),
    title(385, 'Viviparous (Rhizophora)', 'R'),
  ].join('');
}
export const GERM = svgDoc(
  460,
  244,
  'Three types of seed germination. Epigeal: the hypocotyl elongates and pushes the cotyledons above the soil, as in castor and bean. Hypogeal: the epicotyl elongates and the cotyledons stay below the soil, as in pea and maize. Viviparous: in a mangrove such as Rhizophora the seed germinates inside the fruit while it is still on the parent plant, and the long radicle grows before the seedling drops into the mud',
  germ(false),
);
export const GERM_Q = svgDoc(
  460,
  244,
  'Three unlabelled seedlings marked P, Q and R. In P the seed leaves are lifted above the soil on an elongated stem below them. In Q the seed stays below the soil and the shoot above it grows from the seed. In R a long root has grown from a fruit that is still hanging on a branch',
  germ(true),
);

// ---------------------------------------------------------------- 2. Zones of a growing root (labelled and lettered)
function root(letters) {
  const label = (y, name, letter, tx, ty) => (letters ? tag(250, y - 4, letter) + S.lead(241, y - 4, tx, ty) : lab(214, y, name) + S.lead(210, y - 4, tx, ty));
  const cells = (y0, y1, h, w, c) => {
    const out = [];
    for (let y = y0; y + h <= y1 + 0.1; y += h) for (let x = 104; x + w <= 156.1; x += w) out.push(S.rect(x, y, w, h, { sw: 0.6, c, fill: 'none' }));
    return out.join('');
  };
  const hairs = Array.from({ length: 6 }, (_, i) => S.line(100, 32 + i * 12, 88, 28 + i * 12, { w: 1, c: 'var(--diagram-muted)' }) + S.line(160, 32 + i * 12, 172, 28 + i * 12, { w: 1, c: 'var(--diagram-muted)' })).join('');
  return [
    S.rect(100, 20, 60, 190, { fill: 'var(--diagram-green)', fop: 0.08, sw: 1.5 }),
    S.rect(100, 20, 60, 90, { fill: 'var(--diagram-green)', fop: 0.18, sw: 0 }),
    S.rect(100, 110, 60, 56, { fill: 'var(--diagram-yellow)', fop: 0.22, sw: 0 }),
    S.rect(100, 166, 60, 30, { fill: 'var(--diagram-red)', fop: 0.15, sw: 0 }),
    cells(110, 166, 14, 15, 'var(--diagram-muted)'), cells(166, 196, 6, 7.5, 'var(--diagram-muted)'),
    S.rect(124, 20, 12, 90, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1 }),
    hairs,
    S.path('M100 196 C100 226 160 226 160 196 Z', { fill: 'var(--diagram-brown)', fop: 0.3, w: 1.5 }),
    S.line(100, 110, 160, 110, { dash: '3 3', w: 1 }), S.line(100, 166, 160, 166, { dash: '3 3', w: 1 }), S.line(100, 196, 160, 196, { dash: '3 3', w: 1 }),
    label(64, 'Zone of maturation', 'D', 164, 64),
    letters ? '' : sm(214, 76, '(differentiation, root hairs)', { c: 'var(--diagram-muted)' }),
    label(144, 'Zone of elongation', 'C', 160, 140),
    label(184, 'Zone of cell division', 'B', 160, 182),
    label(222, 'Root cap', 'A', 150, 214),
    letters ? '' : sm(214, 196, '(meristematic zone)', { c: 'var(--diagram-muted)' }),
  ].join('');
}
export const ROOT = svgDoc(
  460,
  240,
  'Zones of a growing root tip from the tip upwards: the root cap protects the tip; just above it is the zone of cell division (meristematic zone) of small, dense, dividing cells; above that is the zone of elongation, where cells take up water and enlarge; and above that the zone of maturation, where cells differentiate and root hairs form',
  root(false),
);
export const ROOT_Q = svgDoc(
  460,
  240,
  'An unlabelled root tip with four regions marked A to D from the tip upwards: A the protective cap at the very tip, B a short region of small dividing cells, C a region of long enlarging cells, and D the uppermost region with root hairs and differentiated tissues',
  root(true),
);

// ---------------------------------------------------------------- 3. Sigmoid growth curve (computed)
const GX = (d) => 60 + (d * 380) / 20;
const GY = (h) => 200 - (h * 160) / 60;
const pts = Array.from({ length: 81 }, (_, i) => i / 4).map((d) => `${GX(d).toFixed(1)} ${GY(height(d)).toFixed(1)}`);
export const SIGMOID = svgDoc(
  460,
  250,
  `Sigmoid growth curve of a shoot, drawn from a model with a final height of ${LOG.K} centimetres: a slow lag phase up to day ${LAG_END}, a rapid log (exponential) phase from day ${LAG_END} to day ${LOG_END}, with the fastest growth, about ${MAXRATE} centimetres a day, at day ${LOG.t0}, and a stationary phase after day ${LOG_END} as growth slows and stops`,
  [
    S.rect(GX(0), 40, GX(LAG_END) - GX(0), 160, { fill: 'var(--diagram-yellow)', fop: 0.18, sw: 0 }),
    S.rect(GX(LAG_END), 40, GX(LOG_END) - GX(LAG_END), 160, { fill: 'var(--diagram-green)', fop: 0.14, sw: 0 }),
    S.rect(GX(LOG_END), 40, GX(20) - GX(LOG_END), 160, { fill: 'var(--diagram-blue)', fop: 0.14, sw: 0 }),
    S.line(60, 200, 440, 200, { w: 1.5 }), S.line(60, 200, 60, 40, { w: 1.5 }),
    ...[0, 10, 20, 30, 40, 50, 60].map((h) => sm(54, GY(h) + 4, String(h), { a: 'end' }) + S.line(60, GY(h), 440, GY(h), { w: 0.4, c: 'var(--diagram-muted)', dash: '2 4' })),
    ...DAYS.filter((d) => d % 4 === 0).map((d) => sm(GX(d), 214, String(d), { a: 'middle' })),
    S.path('M' + pts.join(' L'), { w: 2.8, c: 'var(--diagram-accent)' }),
    S.circle(GX(LOG.t0), GY(height(LOG.t0)), 4, { fill: 'currentColor', sw: 0 }),
    sm(GX(LOG.t0) + 8, GY(height(LOG.t0)) + 14, 'fastest growth', {}),
    sm((GX(0) + GX(LAG_END)) / 2, 56, 'Lag', { a: 'middle', w: 'bold' }),
    sm((GX(LAG_END) + GX(LOG_END)) / 2, 56, 'Log (exponential)', { a: 'middle', w: 'bold' }),
    sm((GX(LOG_END) + GX(20)) / 2, 56, 'Stationary', { a: 'middle', w: 'bold' }),
    S.text(250, 236, 'Time (days)', { a: 'middle', size: 11 }),
    S.text(66, 30, 'Height of shoot (cm)', { size: 11 }),
    ...(HEIGHTS.length ? [] : []),
  ].join(''),
);

// ---------------------------------------------------------------- 4. Arc auxanometer (schematic, not to scale)
const AC = { x: 200, y: 130 };
const pol = (ang, rad) => [AC.x + rad * Math.cos((ang * Math.PI) / 180), AC.y - rad * Math.sin((ang * Math.PI) / 180)];
const ticks = [30, 40, 50, 60, 70, 80].map((a) => {
  const [x1, y1] = pol(a, 100), [x2, y2] = pol(a, 107);
  return S.line(x1, y1, x2, y2, { w: 1 });
}).join('');
const [px, py] = pol(52, 98);
const [ax1, ay1] = pol(80, 100), [ax2, ay2] = pol(30, 100);
export const AUXANO = svgDoc(
  460,
  262,
  `Arc auxanometer: a thread from the tip of a growing shoot passes over a small pulley and carries a weight. The pulley turns as the shoot grows, and a long pointer fixed to the pulley sweeps over an arc scale, so a small growth shows as a large pointer movement. Actual growth equals the pointer movement multiplied by the pulley radius and divided by the pointer length; here the pointer length is ${AUX.R} centimetres and the pulley radius ${AUX.r} centimetres, a magnification of ${magnification} times`,
  [
    S.rect(34, 220, 72, 30, { rx: 3, fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.5 }),
    S.path('M70 220 L70 134', { w: 4, c: 'var(--diagram-green)', cap: 'round' }), leaf(70, 150, 18, -8), leaf(70, 170, -18, -8),
    S.line(70, 130, 188, 130, { w: 1, c: 'var(--diagram-muted)' }),
    S.circle(AC.x, AC.y, 12, { fill: 'var(--diagram-fill)', sw: 1.5 }), S.circle(AC.x, AC.y, 2, { fill: 'currentColor', sw: 0 }),
    S.path(`M188 130 C188 118 212 118 212 130`, { w: 1, c: 'var(--diagram-muted)' }),
    S.line(212, 130, 212, 196, { w: 1, c: 'var(--diagram-muted)' }), S.rect(203, 196, 18, 18, { fill: 'var(--diagram-accent)', fop: 0.4, sw: 1.2 }),
    S.path(`M${ax1.toFixed(1)} ${ay1.toFixed(1)} A100 100 0 0 1 ${ax2.toFixed(1)} ${ay2.toFixed(1)}`, { w: 1.5 }),
    ticks,
    S.line(AC.x, AC.y, px, py, { w: 2.5, c: 'var(--diagram-red)' }),
    lab(54, 122, 'Growing shoot', { c: 'var(--diagram-green)', w: 'bold' }),
    lab(106, 150, 'Thread', {}), S.lead(130, 146, 130, 132),
    lab(150, 98, 'Pulley', {}), S.lead(176, 102, 192, 122),
    lab(270, 44, 'Pointer', { c: 'var(--diagram-red)', w: 'bold' }), S.lead(268, 48, px - 3, py - 6),
    lab(320, 96, 'Arc scale', { w: 'bold' }), S.lead(318, 94, pol(34, 104)[0], pol(34, 104)[1]),
    lab(228, 212, 'Weight', {}),
    sm(122, 246, `Not to scale: pointer length ${AUX.R} cm, pulley radius ${AUX.r} cm`, { c: 'var(--diagram-muted)' }),
    sm(240, 232, `Actual growth = pointer movement ÷ ${magnification}`, { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. Went's experiment on oat (Avena) coleoptiles
export const WENT = svgDoc(
  460,
  250,
  'Went’s experiment with oat coleoptiles. Panel 1: the tip of a coleoptile is cut off and placed on an agar block, and auxin diffuses from the tip into the agar. Panel 2: the agar block is placed to one side on the cut top of a coleoptile whose tip has been removed. Panel 3: the coleoptile bends away from the side that carries the block, because the cells below the block elongate more, and the angle of curvature depends on the amount of auxin in the block',
  [
    // panel 1
    S.ellipse(80, 82, 8, 16, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1.2 }),
    S.rect(58, 100, 44, 16, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }),
    S.arrow(80, 118, 80, 140, { c: 'var(--diagram-red)', w: 1.5, size: 6 }), sm(86, 136, 'auxin', { c: 'var(--diagram-red)' }),
    sm(80, 174, 'Tip placed on', { a: 'middle' }), sm(80, 187, 'an agar block', { a: 'middle' }),
    // panel 2
    S.path('M230 214 L230 118', { w: 18, c: 'var(--diagram-green)', op: 0.55, cap: 'butt' }),
    S.rect(206, 100, 24, 18, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.2 }),
    sm(230, 94, 'agar block (one side)', { a: 'middle' }),
    S.arrow(218, 122, 218, 150, { c: 'var(--diagram-red)', w: 1.5, size: 6 }),
    sm(230, 232, 'Tip removed; block on', { a: 'middle' }), sm(230, 245, 'one side of the cut end', { a: 'middle' }),
    // panel 3
    S.path('M380 214 L380 150 C380 118 402 108 414 84', { w: 18, c: 'var(--diagram-green)', op: 0.55, cap: 'butt' }),
    S.path('M380 214 L380 100', { w: 1, c: 'var(--diagram-muted)', dash: '3 3' }),
    S.rect(366, 92, 24, 14, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.2 }), sm(340, 90, 'block', { a: 'end' }),
    sm(380, 232, 'Bends away from the', { a: 'middle' }), sm(380, 245, 'side with the block', { a: 'middle' }),
    lab(80, 22, '1', { a: 'middle', w: 'bold' }), lab(230, 22, '2', { a: 'middle', w: 'bold' }), lab(380, 22, '3', { a: 'middle', w: 'bold' }),
  ].join(''),
);

export const ALL = { GERM, GERM_Q, ROOT, ROOT_Q, SIGMOID, AUXANO, WENT };
