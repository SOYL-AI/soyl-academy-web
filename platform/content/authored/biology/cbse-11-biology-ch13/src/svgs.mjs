// SVG diagrams for ch13 Plant Growth and Development (allow-listed elements, palette colours only).
// The sigmoid curve is drawn from the data in calc.mjs; the coleoptile experiment also has a lettered (A–E) version.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { DAYS, HEIGHT, EXPT_ORDER, geo } from './calc.mjs';

const g = (dx, dy, body) => `<g transform="translate(${dx} ${dy})">${body}</g>`;
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';

// ---------------------------------------------------------------- 1. sigmoid growth curve
const X0 = 70;
const Y0 = 300;
const PX = 12.5; // px per day
const PY = 6.5; // px per cm
const sx = (d) => X0 + d * PX;
const sy = (h) => Y0 - h * PY;
/** Smooth path through points (Catmull-Rom to cubic Bezier). */
function smooth(pts) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
const axes = (x0, y0, x1, y1) => S.arrow(x0, y0, x1, y0, { size: 6 }) + S.arrow(x0, y0, x0, y1, { size: 6 });
export const SIGMOID = svgDoc(
  560,
  370,
  `Growth curve of a seedling plotted as height in centimetres against time in days, S-shaped. Heights at days ${DAYS.join(', ')} are ${HEIGHT.join(', ')} centimetres. The curve rises slowly in the lag phase up to about day ten, rises steeply in the log or exponential phase between about days ten and twenty five, with the fastest growth between days fifteen and twenty, then flattens in the stationary phase after about day twenty five`,
  [
    S.rect(sx(0), 56, sx(10) - sx(0), Y0 - 56, { fill: YEL, fop: 0.12, sw: 0 }),
    S.rect(sx(10), 56, sx(25) - sx(10), Y0 - 56, { fill: GREEN, fop: 0.12, sw: 0 }),
    S.rect(sx(25), 56, sx(36) - sx(25), Y0 - 56, { fill: BLUE, fop: 0.1, sw: 0 }),
    S.line(sx(10), 56, sx(10), Y0, { c: MUT, w: 1, dash: '4 3' }),
    S.line(sx(25), 56, sx(25), Y0, { c: MUT, w: 1, dash: '4 3' }),
    axes(X0, Y0, 530, 56),
    ...DAYS.map((d) => S.line(sx(d), Y0, sx(d), Y0 + 5, { w: 1 }) + lab(sx(d), Y0 + 18, String(d), { a: 'middle', size: 10 })),
    ...[0, 10, 20, 30, 40].map((h) => S.line(X0 - 5, sy(h), X0, sy(h), { w: 1 }) + lab(X0 - 9, sy(h) + 4, String(h), { a: 'end', size: 10 })),
    S.path(smooth(DAYS.map((d, i) => [sx(d), sy(HEIGHT[i])])), { c: GREEN, w: 3 }),
    ...DAYS.map((d, i) => S.circle(sx(d), sy(HEIGHT[i]), 4, { fill: GREEN, c: GREEN, sw: 1 })),
    lab(sx(5), 32, 'Lag phase', { a: 'middle', w: 'bold' }),
    lab(sx(17.5), 32, 'Log (exponential) phase', { a: 'middle', w: 'bold' }),
    lab(sx(30.5), 32, 'Stationary phase', { a: 'middle', w: 'bold' }),
    lab(sx(5), 47, 'slow growth', { a: 'middle', size: 10 }),
    lab(sx(17.5), 47, 'fastest growth', { a: 'middle', size: 10 }),
    lab(sx(30.5), 47, 'growth levels off', { a: 'middle', size: 10 }),
    lab(300, 352, 'Time (days)', { a: 'middle' }),
    S.text(20, 180, 'Height (cm)', { size: 11, a: 'middle' }).replace('<text ', '<text transform="rotate(-90 20 180)" '),
  ].join(''),
);

// ---------------------------------------------------------------- 2. arithmetic and geometric growth
const dot = (x, y, filled) => S.circle(x, y, 9, { fill: filled ? GREEN : 'none', fop: filled ? 0.55 : undefined, c: GREEN, sw: 2 });
const link = (x1, y1, x2, y2) => S.line(x1, y1 + 9, x2, y2 - 9, { c: MUT, w: 1.2 });
const gx0 = 70;
const curve = (f, x0, x1, xs, ys) => S.path(Array.from({ length: 41 }, (_, i) => { const t = i / 40; return `${i ? 'L' : 'M'}${(x0 + (x1 - x0) * t).toFixed(1)} ${(ys(f(t))).toFixed(1)}`; }).join(' '), { c: GREEN, w: 2.5 });
export const GROWTHTYPES = svgDoc(
  600,
  400,
  'Two patterns of growth. Arithmetic growth: at each division only one daughter cell keeps dividing while the other differentiates and matures, so the number of dividing cells stays the same and a graph of length against time is a straight line, length equals starting length plus rate times time. Geometric growth: both daughter cells keep dividing, so the number of dividing cells doubles each round, and the graph of size against time is an exponential curve, size equals starting size times e to the power of rate times time, which is first slow and then very fast',
  [
    lab(150, 22, 'Arithmetic growth', { a: 'middle', w: 'bold' }),
    lab(450, 22, 'Geometric growth', { a: 'middle', w: 'bold' }),
    // arithmetic lineage
    dot(120, 50, false), link(120, 50, 90, 100), link(120, 50, 150, 100), dot(90, 100, false), dot(150, 100, true),
    link(90, 100, 60, 150), link(90, 100, 120, 150), dot(60, 150, false), dot(120, 150, true),
    link(60, 150, 30, 200), link(60, 150, 90, 200), dot(30, 200, false), dot(90, 200, true),
    // geometric lineage
    dot(450, 50, false),
    ...[[450, 50, 410, 100], [450, 50, 490, 100]].map(([a, b, c, d]) => link(a, b, c, d)), dot(410, 100, false), dot(490, 100, false),
    ...[[410, 100, 390, 150], [410, 100, 430, 150], [490, 100, 470, 150], [490, 100, 510, 150]].map(([a, b, c, d]) => link(a, b, c, d)),
    ...[390, 430, 470, 510].map((x) => dot(x, 150, false)),
    ...[[390, 380], [390, 400], [430, 420], [430, 440], [470, 460], [470, 480], [510, 500], [510, 520]].map(([a, b]) => link(a, 150, b, 200)),
    ...[380, 400, 420, 440, 460, 480, 500, 520].map((x) => dot(x, 200, false)),
    S.rect(212, 42, 14, 10, { fill: GREEN, fop: 0.55, c: GREEN, sw: 1.5 }), lab(232, 51, 'differentiated', { size: 10 }),
    S.circle(219, 66, 6, { c: GREEN, sw: 2 }), lab(232, 70, 'still dividing', { size: 10 }),
    // graphs
    S.arrow(gx0, 350, 250, 350, { size: 6 }), S.arrow(gx0, 350, gx0, 245, { size: 6 }),
    S.path(`M${gx0} 330 L240 265`, { c: GREEN, w: 2.5 }),
    lab(150, 372, 'time', { a: 'middle', size: 10 }), lab(gx0 - 6, 296, 'size', { a: 'end', size: 10 }),
    lab(150, 392, 'straight line', { a: 'middle', size: 10 }),
    S.arrow(370, 350, 550, 350, { size: 6 }), S.arrow(370, 350, 370, 245, { size: 6 }),
    curve((t) => geo(1, 3.2, t), 372, 540, null, (v) => 350 - ((v - 1) / (geo(1, 3.2, 1) - 1)) * 95),
    lab(450, 372, 'time', { a: 'middle', size: 10 }), lab(364, 296, 'size', { a: 'end', size: 10 }),
    lab(450, 392, 'slow, then very fast', { a: 'middle', size: 10 }),
  ].join(''),
);
void ACC;
void RED;

// ---------------------------------------------------------------- 3. coleoptile experiments; named and lettered
const colTip = (x, y) => S.ellipse(x, y, 9, 7, { fill: GREEN, fop: 0.55, c: GREEN, sw: 1.5 });
function panel(kind, cx) {
  const body = (d, w = 18) => S.path(d, { c: GREEN, w, cap: 'round', op: 0.55 });
  const light = [140, 175, 210].map((y) => S.arrow(cx - 58, y, cx - 40, y, { c: YEL, size: 6, w: 2 })).join('');
  switch (kind) {
    case 'intact':
      return light + body(`M${cx} 250 L${cx} 205 Q${cx} 165 ${cx - 30} 138`) + colTip(cx - 33, 134);
    case 'cap':
      return light + body(`M${cx} 250 L${cx} 135`) + colTip(cx, 128) + S.rect(cx - 13, 112, 26, 24, { fill: BROWN, fop: 0.85, c: BROWN, sw: 1 });
    case 'removed':
      return light + body(`M${cx} 250 L${cx} 160`) + S.line(cx - 12, 148, cx + 12, 148, { c: RED, w: 1.5, dash: '3 2' });
    case 'base':
      return light + body(`M${cx} 250 L${cx} 205 Q${cx} 165 ${cx - 30} 138`) + colTip(cx - 33, 134) + S.rect(cx - 14, 205, 28, 45, { fill: BROWN, fop: 0.85, c: BROWN, sw: 1 });
    case 'agar':
      return body(`M${cx} 250 L${cx} 205 Q${cx} 172 ${cx + 26} 150`) + S.rect(cx + 6, 134, 22, 14, { fill: YEL, fop: 0.5, c: BROWN, sw: 1.5 });
    default:
      return '';
  }
}
const NAMED_ORDER = ['intact', 'cap', 'removed', 'base', 'agar'];
const CAPTION = {
  intact: ['Tip intact,', 'light from one side:', 'bends towards light'],
  cap: ['Tip covered', 'with an opaque cap:', 'no bending'],
  removed: ['Tip cut off:', 'no bending'],
  base: ['Base covered, tip', 'exposed: bends', 'towards light'],
  agar: ['In the dark, agar block', 'from tips on one side of', 'a cut stump: bends away'],
};
function exptDoc(named) {
  const order = named ? NAMED_ORDER : EXPT_ORDER;
  const out = [];
  order.forEach((k, i) => {
    const cx = 62 + i * 124;
    out.push(panel(k, cx));
    out.push(S.line(cx - 40, 252, cx + 40, 252, { c: BROWN, w: 3 }));
    if (named) CAPTION[k].forEach((t, j) => out.push(lab(cx, 276 + j * 13, t, { a: 'middle', size: 10 })));
    else out.push(lab(cx, 290, 'ABCDE'[i], { a: 'middle', w: 'bold', size: 16 }));
  });
  out.push(lab(310, 25, named ? 'Experiments on the bending of oat coleoptiles' : 'Five coleoptile experiments', { a: 'middle', w: 'bold' }), lab(310, 42, 'Yellow arrows: light. Brown: opaque cover or soil line. Dashed red: cut.', { a: 'middle', size: 10 }));
  return svgDoc(
    640,
    280,
    named
      ? 'Five coleoptile experiments. A coleoptile with its tip intact, lit from one side, bends towards the light. With an opaque cap on the tip it does not bend. With the tip cut off it does not bend. With an opaque sheath over the base but the tip uncovered it bends towards the light, so the tip perceives the light and a signal moves down. In Went\'s experiment, in the dark, an agar block that had stood under tips is placed on one side of a decapitated coleoptile, which bends away from that side, showing a chemical substance, auxin, causes the growth'
      : 'Five coleoptile experiments labelled A to E. A: tip cut off, lit from one side. B: tip intact, lit from one side. C: in the dark, an agar block placed on one side of a decapitated coleoptile. D: an opaque sheath over the base, tip exposed, lit from one side. E: an opaque cap over the tip, lit from one side',
    g(0, -50, out.slice(0, -2).join('')) + out.slice(-2).join(''),
  );
}
export const EXPT = exptDoc(true);
export const EXPT_LETTERED = exptDoc(false);

export const ALL = { SIGMOID, GROWTHTYPES, EXPT, EXPT_LETTERED };
