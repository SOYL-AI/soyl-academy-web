// SVG diagrams for ISC 11 Biology ch12 Cell Cycle and Cell Division, drawn with the lib's S helpers (palette colours only):
// the cell-cycle wheel and DNA graph (computed from calc.mjs), a flow-cytometry histogram (plain and lettered A to C),
// five stages of mitosis in a cell with 2n = 6 (plain and lettered A to E), the five substages of prophase I
// (plain and lettered A to E) and an overview of meiosis in a cell with 2n = 4.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { CYCLE, CYCLE_H, BINS, N_FLOW } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = 'var(--diagram-muted)';
const badge = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const rad = (d) => (d * Math.PI) / 180;
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';

// ---------------------------------------------------------------- 1. the cell-cycle wheel (arc lengths computed from the durations)
function seg(cx, cy, R, r, a0, a1, fill) {
  const p = (rr, a) => [cx + rr * Math.cos(rad(a)), cy + rr * Math.sin(rad(a))];
  const [x0, y0] = p(R, a0);
  const [x1, y1] = p(R, a1);
  const [x2, y2] = p(r, a1);
  const [x3, y3] = p(r, a0);
  const big = a1 - a0 > 180 ? 1 : 0;
  return S.path(`M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 ${big} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} A${r} ${r} 0 ${big} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z`, { fill, fop: 0.4, w: 1.6 });
}
const cyc = (() => {
  let a = -90;
  const out = {};
  for (const [k, h] of Object.entries(CYCLE)) {
    const span = (h / CYCLE_H) * 360;
    out[k] = [a, a + span];
    a += span;
  }
  return out;
})();
const mid = (k) => (cyc[k][0] + cyc[k][1]) / 2;
export const CYCLE_SVG = svgDoc(
  540,
  250,
  `The cell cycle of a culture with a ${CYCLE_H}-hour cycle drawn as a wheel: G1 takes ${CYCLE.G1} hours, S ${CYCLE.S} hours, G2 ${CYCLE.G2} hours and M phase ${CYCLE.M} hour; interphase (G1, S and G2) is nearly the whole cycle; a cell can leave G1 for the resting G0 state`,
  [
    seg(130, 120, 100, 58, ...cyc.G1, 'var(--diagram-blue)'), seg(130, 120, 100, 58, ...cyc.S, 'var(--diagram-green)'), seg(130, 120, 100, 58, ...cyc.G2, 'var(--diagram-yellow)'), seg(130, 120, 100, 58, ...cyc.M, 'var(--diagram-red)'),
    ...['G1', 'S', 'G2'].map((k) => S.text(130 + 79 * Math.cos(rad(mid(k))), 120 + 79 * Math.sin(rad(mid(k))) + 4, k, { a: 'middle', size: 13, w: 'bold' })),
    S.lead(130 + 100 * Math.cos(rad(mid('M'))), 120 + 100 * Math.sin(rad(mid('M'))), 150, 8), lab(154, 14, 'M', { size: 13, w: 'bold' }),
    lab(130, 118, `${CYCLE_H} hours`, { a: 'middle', size: 13, w: 'bold' }), lab(130, 134, 'one cycle', { a: 'middle', size: 10, c: muted }),
    lab(268, 40, `G1 (${CYCLE.G1} h): growth; organelles and proteins made`, { size: 11 }),
    lab(268, 64, `S (${CYCLE.S} h): DNA replicated; chromatids formed`, { size: 11 }),
    lab(268, 88, `G2 (${CYCLE.G2} h): growth; spindle proteins made`, { size: 11 }),
    lab(268, 112, `M (${CYCLE.M} h): mitosis and cytokinesis`, { size: 11 }),
    S.arrow(188, 188, 262, 206, { w: 1.5, size: 7 }),
    S.rect(266, 192, 240, 40, { rx: 6, fill: 'var(--diagram-fill)', sw: 1.2 }),
    lab(386, 210, 'G0: resting or differentiated cells', { a: 'middle', size: 11, w: 'bold' }), lab(386, 224, 'leave from G1; some may re-enter', { a: 'middle', size: 10, c: muted }),
    lab(268, 154, 'Interphase = G1 + S + G2 (97.5 percent of the cycle)', { size: 10, c: muted }),
  ].join(''),
);

// ---------------------------------------------------------------- 2. DNA per nucleus through two cycles (computed)
const gx = (t) => 60 + t * 10;
const gy = (c) => 190 - (c - 1) * 55;
const dnaPath = () => {
  const pts = [];
  for (let k = 0; k < 2; k++) {
    const t0 = k * CYCLE_H;
    pts.push([t0, 2], [t0 + CYCLE.G1, 2], [t0 + CYCLE.G1 + CYCLE.S, 4], [t0 + CYCLE_H, 4]);
  }
  pts.push([2 * CYCLE_H, 2]);
  const d = [];
  pts.forEach(([t, c], i) => {
    d.push(`${i === 0 ? 'M' : 'L'}${gx(t)} ${gy(c)}`);
    if (i % 4 === 3 && i < pts.length - 1) d.push(`L${gx(t)} ${gy(2)}`);
  });
  return d.join(' ');
};
export const DNAGRAPH = svgDoc(
  500,
  250,
  'Graph of the DNA amount in one nucleus over two cell cycles: constant at 2C in G1, rising from 2C to 4C during S phase, constant at 4C in G2 and mitosis, and falling back to 2C when the cell divides; the chromosome number stays at 2n except for a brief doubling at anaphase',
  [
    S.line(60, 190, 480, 190, { w: 1.5 }), S.line(60, 190, 60, 40, { w: 1.5 }),
    ...[[1, '1C'], [2, '2C'], [3, '3C'], [4, '4C']].map(([c, t]) => S.text(54, gy(c) + 4, t, { a: 'end', size: 10 }) + S.line(60, gy(c), 480, gy(c), { w: 0.5, c: muted, dash: '2 4' })),
    ...[0, 10, 20, 30, 40].map((t) => S.text(gx(t), 206, String(t), { a: 'middle', size: 10 })),
    S.path(dnaPath(), { w: 2.8, c: BLUE }),
    ...[0, 1].flatMap((k) => {
      const t0 = k * CYCLE_H;
      const band = (a, b, f, n) => S.rect(gx(a), 214, gx(b) - gx(a), 16, { fill: f, fop: 0.4, sw: 1 }) + (b - a > 2 ? S.text((gx(a) + gx(b)) / 2, 226, n, { a: 'middle', size: 10 }) : '');
      return [band(t0, t0 + CYCLE.G1, 'var(--diagram-blue)', 'G1'), band(t0 + CYCLE.G1, t0 + CYCLE.G1 + CYCLE.S, 'var(--diagram-green)', 'S'), band(t0 + CYCLE.G1 + CYCLE.S, t0 + CYCLE_H - CYCLE.M, 'var(--diagram-yellow)', 'G2'), band(t0 + CYCLE_H - CYCLE.M, t0 + CYCLE_H, 'var(--diagram-red)', 'M')];
    }),
    S.text(270, 242, 'Time (hours)', { a: 'middle', size: 11 }),
    S.text(64, 24, 'DNA per nucleus', { size: 11 }),
    lab(gx(1.5), gy(3) - 6, 'S phase:', { size: 10, c: muted }), lab(gx(1.5), gy(3) + 7, 'DNA doubles', { size: 10, c: muted }),
    lab(gx(CYCLE_H) + 6, gy(3), 'cell divides', { size: 10, c: muted }),
  ].join(''),
);

// ---------------------------------------------------------------- 3. flow-cytometry histogram (plain and lettered)
const fx = (c) => 70 + ((c - 1.6) / 2.8) * 360;
const fy = (n) => 200 - (n / 1000) * 150;
function histogram(lettered) {
  const bars = BINS.map(([c, n]) => S.rect(fx(c) - 16, fy(n), 32, 200 - fy(n), { fill: c === 2 ? 'var(--diagram-blue)' : c === 4 ? 'var(--diagram-yellow)' : 'var(--diagram-green)', fop: 0.4, sw: 1.2 }));
  const parts = [
    S.line(60, 200, 450, 200, { w: 1.5 }), S.line(60, 200, 60, 40, { w: 1.5 }),
    ...[0, 500, 1000].map((n) => S.text(54, fy(n) + 4, String(n), { a: 'end', size: 10 }) + S.line(60, fy(n), 450, fy(n), { w: 0.5, c: muted, dash: '2 4' })),
    ...[2, 3, 4].map((c) => S.text(fx(c), 216, `${c}C`, { a: 'middle', size: 11 })),
    ...bars,
    S.text(255, 238, 'DNA content per cell', { a: 'middle', size: 11 }), S.text(64, 30, `Number of cells (of ${N_FLOW})`, { size: 11 }),
  ];
  if (!lettered) {
    parts.push(lab(fx(2), fy(900) - 8, 'G1', { a: 'middle', w: 'bold' }), lab(fx(3.2), fy(175) - 8, 'S', { a: 'middle', w: 'bold' }), lab(fx(4), fy(400) - 8, 'G2 and M', { a: 'middle', w: 'bold' }));
    return svgDoc(480, 250, `Histogram of the DNA content of ${N_FLOW} cells from a culture: a tall peak at 2C (G1 cells), a low plateau between 2C and 4C (cells in S phase) and a smaller peak at 4C (G2 and mitotic cells)`, parts.join(''));
  }
  parts.push(badge(fx(2), fy(900) - 14, 'A'), badge(fx(3.2), fy(175) - 14, 'B'), badge(fx(4), fy(400) - 14, 'C'));
  return svgDoc(480, 250, `Histogram of the DNA content of ${N_FLOW} cells with three regions marked: A the tall peak at 2C, B the low plateau between 2C and 4C and C the smaller peak at 4C`, parts.join(''));
}
export const FLOW_SVG = histogram(false);
export const FLOW_L = histogram(true);

// ---------------------------------------------------------------- chromosome helpers (cell with 2n = 6: long, medium and short pairs)
const rot = (x, y, a, inner) => `<g transform="rotate(${a} ${x} ${y})">${inner}</g>`;
const xchrom = (x, y, L, c1, c2 = c1, a = 0) => rot(x, y, a, S.line(x - 4, y - L / 2, x + 4, y + L / 2, { c: c1, w: 3.5, cap: 'round' }) + S.line(x + 4, y - L / 2, x - 4, y + L / 2, { c: c2, w: 3.5, cap: 'round' }) + S.circle(x, y, 2.5, { fill: 'var(--diagram-fill)', sw: 1 }));
const vchrom = (x, y, L, c, dir) => S.path(`M${x + dir * L * 0.55} ${y - L * 0.32} L${x} ${y} L${x + dir * L * 0.55} ${y + L * 0.32}`, { c, w: 3, cap: 'round', join: 'round' });
const LEN = [38, 38, 28, 28, 20, 20];
const COL = [BLUE, RED, BLUE, RED, BLUE, RED];
const cellOutline = (cx, cy, r) => S.circle(cx, cy, r, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 });

const mitStage = {
  interphase: (cx, cy) => [cellOutline(cx, cy, 42), S.circle(cx, cy, 26, { sw: 1.4 }), S.circle(cx + 6, cy - 4, 6, { fill: 'var(--diagram-brown)', fop: 0.4, sw: 1 }), S.path(`M${cx - 16} ${cy + 6} q8 -12 14 0 t14 0`, { c: BLUE, w: 1.2 }), S.path(`M${cx - 14} ${cy + 14} q8 -10 14 0 t12 0`, { c: RED, w: 1.2 })].join(''),
  prophase: (cx, cy) => [cellOutline(cx, cy, 42), S.circle(cx, cy, 28, { sw: 1.2, dash: '3 3' }), ...[[-12, -10, 20], [10, -12, -40], [-6, 6, 65], [14, 8, 10], [-16, 14, -15], [2, 18, 50]].map(([dx, dy, a], i) => xchrom(cx + dx, cy + dy, LEN[i] * 0.6, COL[i], COL[i], a)), S.circle(cx - 36, cy, 2.5, { fill: 'currentColor', sw: 0 }), S.circle(cx + 36, cy, 2.5, { fill: 'currentColor', sw: 0 })].join(''),
  metaphase: (cx, cy) => [cellOutline(cx, cy, 42), ...[-34, 34].flatMap((dx) => [-24, -14, 0, 14, 24].map((dy) => S.line(cx + dx, cy, cx + (dy / 24) * 3, cy + dy, { w: 0.7, c: muted }))), ...[-30, -18, -6, 6, 18, 30].map((dy, i) => xchrom(cx, cy + dy, LEN[i] * 0.45, COL[i], COL[i], 90)), S.circle(cx - 38, cy, 2.5, { fill: 'currentColor', sw: 0 }), S.circle(cx + 38, cy, 2.5, { fill: 'currentColor', sw: 0 })].join(''),
  anaphase: (cx, cy) => [S.ellipse(cx, cy, 46, 38, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 }), ...[-30, -18, -6, 6, 18, 30].flatMap((dy, i) => [vchrom(cx - 12, cy + dy * 0.9, LEN[i] * 0.6, COL[i], 1), vchrom(cx + 12, cy + dy * 0.9, LEN[i] * 0.6, COL[i], -1)]), S.line(cx - 40, cy, cx - 14, cy, { w: 0.6, c: muted }), S.line(cx + 40, cy, cx + 14, cy, { w: 0.6, c: muted })].join(''),
  telophase: (cx, cy) => [S.path(`M${cx - 46} ${cy} C${cx - 46} ${cy - 40} ${cx - 6} ${cy - 40} ${cx - 4} ${cy - 10} L${cx - 4} ${cy + 10} C${cx - 6} ${cy + 40} ${cx - 46} ${cy + 40} ${cx - 46} ${cy} Z`, { fill: 'var(--diagram-fill)', fop: 0.5 }), S.path(`M${cx + 46} ${cy} C${cx + 46} ${cy - 40} ${cx + 6} ${cy - 40} ${cx + 4} ${cy - 10} L${cx + 4} ${cy + 10} C${cx + 6} ${cy + 40} ${cx + 46} ${cy + 40} ${cx + 46} ${cy} Z`, { fill: 'var(--diagram-fill)', fop: 0.5 }), S.circle(cx - 24, cy, 17, { sw: 1.3 }), S.circle(cx + 24, cy, 17, { sw: 1.3 }), ...[-8, 0, 8].flatMap((dy, i) => [S.line(cx - 28, cy + dy, cx - 20, cy + dy, { c: COL[i], w: 2.2, cap: 'round' }), S.line(cx + 20, cy + dy, cx + 28, cy + dy, { c: COL[i], w: 2.2, cap: 'round' })])].join(''),
};
const MIT_NAMES = { interphase: 'Interphase', prophase: 'Prophase', metaphase: 'Metaphase', anaphase: 'Anaphase', telophase: 'Telophase' };
function mitosis(order, lettered) {
  const parts = order.map((k, i) => {
    const cx = 56 + i * 106;
    return mitStage[k](cx, 82) + (lettered ? badge(cx, 150, 'ABCDE'[i]) : lab(cx, 154, MIT_NAMES[k], { a: 'middle', size: 11, w: 'bold' }));
  });
  parts.push(lab(270, 18, 'A cell with six chromosomes (2n = 6); blue and red mark the two members of each pair', { a: 'middle', size: 10, c: muted }));
  const label = lettered
    ? 'Five cells with six chromosomes drawn in a scrambled order and marked A to E: A has six V-shaped chromatids moving to each pole, B has a round nucleus with a nucleolus, C has two new nuclei at the ends of a constricting cell, D has six double chromosomes lined up in the middle and E has six condensed double chromosomes scattered in a cell without a nuclear envelope'
    : 'The stages of mitosis in a cell with six chromosomes: interphase with a nucleus, prophase with condensed double chromosomes and a breaking envelope, metaphase with the chromosomes on the equator attached to spindle fibres, anaphase with chromatids moving to the poles, and telophase with two new nuclei and a constricting cell';
  return svgDoc(540, 172, label, parts.join(''));
}
export const MITOSIS = mitosis(['interphase', 'prophase', 'metaphase', 'anaphase', 'telophase'], false);
export const MITOSIS_L = mitosis(['anaphase', 'interphase', 'telophase', 'metaphase', 'prophase'], true);

// ---------------------------------------------------------------- 4. substages of prophase I (plain and lettered)
const bv = (d, c, w = 1.6) => S.path(d, { c, w, cap: 'round' });
const pro = {
  leptotene: (cx, cy) => [bv(`M${cx - 42} ${cy - 20} C${cx - 20} ${cy - 40} ${cx + 4} ${cy} ${cx + 42} ${cy - 22}`, BLUE, 1.4), bv(`M${cx - 42} ${cy + 22} C${cx - 20} ${cy + 4} ${cx + 4} ${cy + 40} ${cx + 42} ${cy + 20}`, RED, 1.4)].join(''),
  zygotene: (cx, cy) => [bv(`M${cx - 42} ${cy - 3} L${cx - 2} ${cy - 3} C${cx + 10} ${cy - 3} ${cx + 24} ${cy - 22} ${cx + 42} ${cy - 28}`, BLUE, 1.6), bv(`M${cx - 42} ${cy + 3} L${cx - 2} ${cy + 3} C${cx + 10} ${cy + 3} ${cx + 24} ${cy + 22} ${cx + 42} ${cy + 28}`, RED, 1.6), ...[-36, -28, -20, -12, -4].map((x) => S.line(cx + x, cy - 3, cx + x, cy + 3, { w: 0.8, c: muted }))].join(''),
  pachytene: (cx, cy) => [bv(`M${cx - 42} ${cy - 8} L${cx - 10} ${cy - 8} L${cx + 10} ${cy - 2} L${cx + 42} ${cy - 2}`, BLUE, 3), bv(`M${cx - 42} ${cy - 2} L${cx - 10} ${cy - 2} L${cx + 10} ${cy - 8} L${cx + 42} ${cy - 8}`, BLUE, 3), bv(`M${cx - 42} ${cy + 4} L${cx - 10} ${cy + 4} L${cx + 10} ${cy + 10} L${cx + 42} ${cy + 10}`, RED, 3), bv(`M${cx - 42} ${cy + 10} L${cx - 10} ${cy + 10} L${cx + 10} ${cy + 4} L${cx + 42} ${cy + 4}`, RED, 3), S.circle(cx, cy + 1, 5, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1.2 })].join(''),
  diplotene: (cx, cy) => [bv(`M${cx - 42} ${cy} C${cx - 36} ${cy - 30} ${cx - 20} ${cy - 30} ${cx - 14} ${cy} C${cx - 8} ${cy - 30} ${cx + 8} ${cy - 30} ${cx + 16} ${cy} C${cx + 22} ${cy - 30} ${cx + 36} ${cy - 30} ${cx + 42} ${cy}`, BLUE, 2.6), bv(`M${cx - 42} ${cy} C${cx - 36} ${cy + 30} ${cx - 20} ${cy + 30} ${cx - 14} ${cy} C${cx - 8} ${cy + 30} ${cx + 8} ${cy + 30} ${cx + 16} ${cy} C${cx + 22} ${cy + 30} ${cx + 36} ${cy + 30} ${cx + 42} ${cy}`, RED, 2.6), ...[-14, 16].map((x) => S.line(cx + x - 5, cy - 5, cx + x + 5, cy + 5, { w: 1.5 }) + S.line(cx + x - 5, cy + 5, cx + x + 5, cy - 5, { w: 1.5 }))].join(''),
  diakinesis: (cx, cy) => [S.ellipse(cx - 12, cy, 20, 12, { c: BLUE, sw: 3.2 }), S.ellipse(cx + 12, cy, 20, 12, { c: RED, sw: 3.2 }), ...[-32, 32].map((x) => S.line(cx + x - 4, cy - 4, cx + x + 4, cy + 4, { w: 1.4 }) + S.line(cx + x - 4, cy + 4, cx + x + 4, cy - 4, { w: 1.4 }))].join(''),
};
const PRO_NAMES = { leptotene: 'Leptotene', zygotene: 'Zygotene', pachytene: 'Pachytene', diplotene: 'Diplotene', diakinesis: 'Diakinesis' };
const PRO_NOTE = { leptotene: 'thin threads', zygotene: 'pairing begins', pachytene: 'crossing over', diplotene: 'chiasmata seen', diakinesis: 'most condensed' };
function prophase1(order, lettered) {
  const parts = order.map((k, i) => {
    const cx = 56 + i * 106;
    return pro[k](cx, 70) + (lettered ? badge(cx, 138, 'ABCDE'[i]) : lab(cx, 130, PRO_NAMES[k], { a: 'middle', size: 11, w: 'bold' }) + lab(cx, 144, PRO_NOTE[k], { a: 'middle', size: 10, c: muted }));
  });
  parts.push(...[1, 2, 3, 4].map((i) => S.line(3 + i * 106, 24, 3 + i * 106, 154, { c: muted, w: 0.8, dash: '2 4' })));
  const label = lettered
    ? 'Five stages of prophase I for one pair of homologous chromosomes drawn in a scrambled order and marked A to E: A shows four thick paired chromatids with a crossing over, B shows two thin separate threads, C shows a compact ring-shaped bivalent with terminal chiasmata, D shows two threads paired along half of their length and E shows two homologues separating but held at two X-shaped chiasmata'
    : 'The five substages of prophase I in order: leptotene with thin separate threads, zygotene with pairing of homologues, pachytene with paired thick chromosomes and crossing over, diplotene with homologues separating but held at chiasmata, and diakinesis with the most condensed bivalents and terminal chiasmata';
  return svgDoc(540, 160, label, parts.join(''));
}
export const PROPHASE = prophase1(['leptotene', 'zygotene', 'pachytene', 'diplotene', 'diakinesis'], false);
export const PROPHASE_L = prophase1(['pachytene', 'leptotene', 'diakinesis', 'zygotene', 'diplotene'], true);

// ---------------------------------------------------------------- 5. meiosis overview with 2n = 4
const xc = (x, y, L, c1, c2) => xchrom(x, y, L, c1, c2, 0);
export const MEIOSIS_SVG = svgDoc(
  540,
  290,
  'Meiosis in a cell with four chromosomes (2n = 4): the parent cell after S phase has two pairs of homologous chromosomes, each of two chromatids; in meiosis I the homologous chromosomes separate, giving two cells with two chromosomes each (still of two chromatids, one chromosome showing exchange of segments by crossing over); in meiosis II the sister chromatids separate, giving four cells each with two single chromatids',
  [
    S.circle(270, 52, 38, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 }),
    xc(254, 44, 32, BLUE, BLUE), xc(262, 64, 22, BLUE, BLUE), xc(278, 44, 32, RED, RED), xc(286, 64, 22, RED, BLUE),
    lab(270, 102, 'Parent cell: 2n = 4, after S phase', { a: 'middle', size: 11, w: 'bold' }),
    S.arrow(240, 112, 176, 126, { w: 1.5, size: 7 }), S.arrow(300, 112, 364, 126, { w: 1.5, size: 7 }),
    lab(8, 118, 'Meiosis I', { size: 12, w: 'bold', c: 'var(--diagram-accent)' }), lab(8, 132, 'homologues', { size: 10, c: muted }), lab(8, 144, 'separate', { size: 10, c: muted }),
    S.circle(170, 158, 30, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 }), xc(160, 156, 32, BLUE, BLUE), xc(180, 160, 22, BLUE, RED),
    S.circle(370, 158, 30, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 }), xc(360, 156, 32, RED, RED), xc(380, 160, 22, RED, BLUE),
    lab(270, 164, 'two cells, n = 2', { a: 'middle', size: 10, c: muted }),
    ...[[170, 82], [370, 82]].flatMap(([x]) => [S.arrow(x - 18, 192, x - 46, 218, { w: 1.5, size: 7 }), S.arrow(x + 18, 192, x + 46, 218, { w: 1.5, size: 7 })]),
    lab(8, 206, 'Meiosis II', { size: 12, w: 'bold', c: 'var(--diagram-accent)' }), lab(8, 220, 'chromatids', { size: 10, c: muted }), lab(8, 232, 'separate', { size: 10, c: muted }),
    ...[[124, BLUE, BLUE], [216, BLUE, RED], [324, RED, BLUE], [416, RED, RED]].flatMap(([x, c1, c2], i) => [
      S.circle(x, 248, 24, { fill: 'var(--diagram-fill)', fop: 0.5, sw: 1.5 }),
      S.line(x - 8, 238, x - 8, 258, { c: c1, w: 3.2, cap: 'round' }), S.line(x + 8, 242, x + 8, 256, { c: i % 2 ? c2 : c1, w: 3.2, cap: 'round' }),
    ]),
    lab(270, 284, 'four cells, n = 2, each chromosome a single chromatid', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

export const ALL = { CYCLE_SVG, DNAGRAPH, FLOW_SVG, FLOW_L, MITOSIS, MITOSIS_L, PROPHASE, PROPHASE_L, MEIOSIS_SVG };
