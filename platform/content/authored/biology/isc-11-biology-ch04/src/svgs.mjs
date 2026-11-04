// SVG diagrams for ISC 11 Biology ch04 Plant Kingdom: three graphic outlines of life cycles (Funaria, fern, Pinus), a brown
// alga, and a moss plant (named and lettered versions). Every diagram is drawn here with the S helpers.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const HAP = 'var(--diagram-blue)';
const DIP = 'var(--diagram-red)';

/** A rounded stage box with up to three lines of text; returns the box record used by link(). */
function box(cx, cy, w, h, lines, ploid) {
  const col = ploid === 'n' ? HAP : ploid === '2n' ? DIP : 'var(--diagram-muted)';
  const rec = { cx, cy, w, h };
  rec.svg =
    S.rect(cx - w / 2, cy - h / 2, w, h, { rx: 6, fill: col, fop: 0.18, sw: 1.2 }) +
    lines.map((t, i) => S.text(cx, cy - ((lines.length - 1) * 6.5) + i * 13 + 4, t, { a: 'middle', size: 10.5, w: i === 0 ? 'bold' : undefined })).join('');
  return rec;
}
/** Where the ray from the centre of a toward (tx, ty) leaves the box (plus a gap). */
function edge(a, tx, ty, gap = 3) {
  const dx = tx - a.cx;
  const dy = ty - a.cy;
  const k = Math.min(dx ? a.w / 2 / Math.abs(dx) : Infinity, dy ? a.h / 2 / Math.abs(dy) : Infinity);
  const len = Math.hypot(dx, dy);
  return [a.cx + dx * k + (dx / len) * gap, a.cy + dy * k + (dy / len) * gap];
}
function link(a, b, text, tx = 0, ty = 0, o = {}) {
  const [x1, y1] = edge(a, b.cx, b.cy);
  const [x2, y2] = edge(b, a.cx, a.cy);
  const mx = (x1 + x2) / 2 + tx;
  const my = (y1 + y2) / 2 + ty;
  return S.arrow(x1, y1, x2, y2, { size: 6, ...o }) + (text ? S.text(mx, my, text, { a: 'middle', size: 10, c: 'var(--diagram-accent)', w: 'bold' }) : '');
}
const legend = (x, y) =>
  S.rect(x, y - 9, 12, 10, { fill: HAP, fop: 0.18, sw: 1 }) + lab(x + 17, y, 'haploid (n)', { size: 10 }) + S.rect(x + 90, y - 9, 12, 10, { fill: DIP, fop: 0.18, sw: 1 }) + lab(x + 107, y, 'diploid (2n)', { size: 10 });

// 1. Graphic outline of the life cycle of Funaria
{
  const sp = box(70, 48, 104, 40, ['Spore', 'n'], 'n');
  const pr = box(235, 48, 112, 40, ['Protonema', 'creeping, n'], 'n');
  const lg = box(400, 48, 112, 40, ['Leafy gametophyte', 'n (dominant)'], 'n');
  const an = box(335, 135, 118, 40, ['Antheridium', 'antherozoids, n'], 'n');
  const ar = box(465, 135, 112, 40, ['Archegonium', 'egg, n'], 'n');
  const zy = box(400, 215, 104, 40, ['Zygote', '2n'], '2n');
  const spo = box(225, 238, 170, 44, ['Sporophyte', 'foot, seta, capsule', '2n, depends on gametophyte'], '2n');
  const smc = box(70, 172, 112, 40, ['Spore mother cells', '2n, in capsule'], '2n');
  var FUNARIA = svgDoc(
    540,
    290,
    'Graphic outline of the life cycle of Funaria: a haploid spore germinates into a creeping protonema, which grows into the dominant leafy gametophyte; antheridia and archegonia at the shoot tips make antherozoids and eggs; fertilisation gives a diploid zygote, which grows into the sporophyte of foot, seta and capsule that stays attached to and depends on the gametophyte; spore mother cells in the capsule divide by meiosis to give haploid spores',
    [
      sp.svg, pr.svg, lg.svg, an.svg, ar.svg, zy.svg, spo.svg, smc.svg,
      link(sp, pr), link(pr, lg), link(lg, an), link(lg, ar),
      link(an, zy, 'fertilisation', -48, 20), link(ar, zy), link(zy, spo), link(spo, smc), link(smc, sp, 'meiosis', 34, 0),
      legend(300, 282),
    ].join(''),
  );
}
export { FUNARIA };

// 2. Graphic outline of the life cycle of a fern (Dryopteris type)
{
  const sporo = box(80, 55, 124, 44, ['Fern plant', 'sporophyte, 2n', 'dominant, free-living'], '2n');
  const smc = box(250, 55, 118, 44, ['Spore mother cells', '2n, in sporangia', 'in sori under leaf'], '2n');
  const spo = box(415, 55, 104, 40, ['Spores', 'n, homosporous'], 'n');
  const pro = box(415, 150, 118, 44, ['Prothallus', 'n, small, heart-shaped', 'free-living gametophyte'], 'n');
  const gam = box(250, 160, 126, 44, ['Antheridia, archegonia', 'antherozoids and eggs', 'n, on the lower surface'], 'n');
  const zy = box(62, 160, 80, 40, ['Zygote', '2n'], '2n');
  var FERN = svgDoc(
    520,
    230,
    'Graphic outline of the life cycle of a fern: the large diploid sporophyte bears sporangia in sori under its leaves; spore mother cells divide by meiosis to give haploid spores; a spore germinates into a small heart-shaped free-living prothallus, the gametophyte, which bears antheridia and archegonia on its lower surface; antherozoids swim in water to the egg and the diploid zygote grows into a new sporophyte',
    [
      sporo.svg, smc.svg, spo.svg, pro.svg, gam.svg, zy.svg,
      link(sporo, smc), link(smc, spo, 'meiosis', 0, -8), link(spo, pro, 'germination', 42, 0), link(pro, gam), link(gam, zy, 'fertilisation', 0, -8), link(zy, sporo, 'grows', 28, 4),
      legend(140, 220),
    ].join(''),
  );
}
export { FERN };

// 3. Graphic outline of the life cycle of Pinus
{
  const tree = box(260, 28, 132, 36, ['Pine tree', 'sporophyte, 2n'], '2n');
  const mc = box(90, 80, 128, 40, ['Male cone', 'microsporangia, 2n'], '2n');
  const fc = box(430, 80, 128, 40, ['Female cone', 'ovules on scales, 2n'], '2n');
  const pmc = box(90, 140, 128, 38, ['Pollen mother cells', '2n'], '2n');
  const mmc = box(430, 140, 140, 38, ['Megaspore mother cell', '2n, in the ovule'], '2n');
  const pg = box(90, 200, 128, 40, ['Pollen grains', 'n, winged'], 'n');
  const mg = box(430, 200, 140, 40, ['Functional megaspore', 'n; three degenerate'], 'n');
  const fg = box(430, 258, 140, 40, ['Female gametophyte', 'n, with archegonia'], 'n');
  const mgam = box(90, 258, 128, 40, ['Pollen tube', 'two male gametes, n'], 'n');
  const zy = box(235, 258, 112, 40, ['Zygote → embryo', '2n, inside the seed'], '2n');
  var PINUS = svgDoc(
    520,
    300,
    'Graphic outline of the life cycle of Pinus: the dominant diploid tree bears male and female cones; pollen mother cells in the male cone divide by meiosis into winged haploid pollen grains, which are carried by wind to the female cone; the megaspore mother cell in the ovule divides by meiosis into four megaspores of which one functional megaspore grows into the female gametophyte with archegonia; the pollen tube delivers male gametes, and fertilisation gives a diploid zygote that becomes the embryo inside the naked seed',
    [
      tree.svg, mc.svg, fc.svg, pmc.svg, mmc.svg, pg.svg, mg.svg, fg.svg, mgam.svg, zy.svg,
      link(tree, mc), link(tree, fc), link(mc, pmc), link(fc, mmc), link(pmc, pg, 'meiosis', 26, 0), link(mmc, mg, 'meiosis', 36, 0),
      link(pg, mgam, 'pollination', 36, 0), link(mg, fg), link(mgam, zy), link(fg, zy, 'fertilisation', 0, -8),
    ].join(''),
  );
}
export { PINUS };

// 4. Brown alga (Fucus/Laminaria type) with its parts
export const ALGA = svgDoc(
  420,
  290,
  'A brown alga with a branched root-like holdfast anchored to a rock, a short stalk-like stipe, and a flat leaf-like frond with a midrib and small air bladders; the parts are labelled holdfast, stipe, midrib, air bladder and frond',
  [
    S.rect(120, 252, 160, 18, { fill: 'var(--diagram-muted)', fop: 0.3, sw: 1 }),
    lab(200, 266, 'rock', { a: 'middle', size: 10 }),
    S.path('M200 252 L170 236 M200 252 L200 232 M200 252 L230 236 M200 252 L185 240 M200 252 L216 240', { c: 'var(--diagram-brown)', w: 3 }),
    S.path('M200 236 C198 210 202 190 200 170', { c: 'var(--diagram-brown)', w: 5 }),
    S.path('M200 170 C140 140 140 70 200 30 C260 70 260 140 200 170 Z', { c: 'var(--diagram-brown)', fill: 'var(--diagram-brown)', fop: 0.3, w: 1.5 }),
    S.path('M200 170 L200 40', { c: 'var(--diagram-brown)', w: 2 }),
    ...[[178, 120], [184, 84], [222, 120], [216, 84], [172, 146], [228, 146]].map(([x, y]) => S.circle(x, y, 5, { fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1 })),
    S.lead(120, 244, 178, 244), lab(10, 248, 'Holdfast'),
    S.lead(104, 200, 198, 200), lab(10, 204, 'Stipe'),
    S.lead(104, 100, 198, 100), lab(10, 104, 'Midrib'),
    S.lead(300, 118, 236, 118), lab(304, 122, 'Air bladder'),
    S.lead(300, 60, 240, 60), lab(304, 64, 'Frond (lamina)'),
    lab(210, 20, 'Plant body: thallus, no true root, stem or leaf', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. Moss plant with attached sporophyte; named and lettered versions
function moss(named) {
  const L = (letter, name) => (named ? name : letter);
  const col = (x, y, a, name) => (named ? lab(x, y, name, { a }) : S.text(x, y, name, { a, size: 13, w: 'bold' }));
  return svgDoc(
    380,
    300,
    named
      ? 'A moss plant with the sporophyte attached to the leafy gametophyte: the capsule with its lid (operculum) and a cap (calyptra) lies on top of a long seta, whose foot is embedded in the tip of the leafy shoot; the leafy gametophyte bears small leaves and is anchored by rhizoids'
      : 'A moss plant with the sporophyte attached to the leafy gametophyte; five parts are marked with the letters A to E: A the capsule at the top, B the long stalk below it, C the leafy shoot, D the thread-like anchoring structures at the base, and E the cap on the capsule',
    [
      S.path('M190 262 L190 130', { c: 'var(--diagram-green)', w: 4 }),
      ...[[188, 230, -1], [192, 214, 1], [188, 198, -1], [192, 182, 1], [188, 166, -1], [192, 150, 1], [188, 134, -1]].map(([x, y, d]) => S.path(`M${x} ${y} q ${d * 26} -8 ${d * 34} -22 q ${-d * 20} 6 ${-d * 34} 22 Z`, { c: 'var(--diagram-green)', fill: 'var(--diagram-green)', fop: 0.35, w: 1.2 })),
      S.path('M190 130 L190 52', { c: 'var(--diagram-brown)', w: 2.2 }),
      S.path('M190 262 L170 284 M190 262 L190 288 M190 262 L212 284', { c: 'var(--diagram-brown)', w: 1.6 }),
      S.ellipse(190, 40, 13, 20, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1.4 }),
      S.path('M178 24 Q190 8 202 24 Z', { c: 'var(--diagram-brown)', fill: 'var(--diagram-brown)', fop: 0.5, w: 1.2 }),
      S.line(177, 31, 203, 31, { w: 1, c: 'var(--diagram-muted)' }),
      S.path('M186 130 L190 120 L194 130', { c: 'var(--diagram-brown)', w: 1.5 }),
      S.lead(204, 34, 270, 34), col(274, 38, 'start', L('A', 'Capsule')),
      S.lead(192, 90, 270, 90), col(274, 94, 'start', L('B', 'Seta')),
      S.lead(214, 190, 270, 190), col(274, 194, 'start', L('C', 'Leafy shoot')),
      S.lead(190, 288, 270, 280), col(274, 284, 'start', L('D', 'Rhizoids')),
      S.lead(190, 12, 270, 12), col(274, 16, 'start', L('E', 'Calyptra (cap)')),
      ...(named ? [S.lead(188, 124, 110, 124), col(106, 128, 'end', 'Foot (inside the tip)')] : []),
      lab(10, 272, 'Gametophyte: haploid', { size: 10, c: 'var(--diagram-muted)' }),
      lab(10, 285, 'Sporophyte: diploid', { size: 10, c: 'var(--diagram-muted)' }),
    ].join(''),
  );
}
export const MOSS_NAMED = moss(true);
export const MOSS_LETTERED = moss(false);

export const ALL = { FUNARIA, FERN, PINUS, ALGA, MOSS_NAMED, MOSS_LETTERED };
