// Hand-drawn SVG schematics for ch10 s- and p-Block Elements. All geometry is computed here from the stated data.
// DATA holds the NCERT-style values used in the SVGs, decks, notes and questions (one source of truth).
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);

export const DATA = {
  g1: {
    els: ['Li', 'Na', 'K', 'Rb', 'Cs'],
    z: [3, 11, 19, 37, 55],
    rAtom: [152, 186, 227, 248, 265], // metallic radius / pm
    rIon: [76, 102, 138, 152, 167], // M+ / pm
    ie1: [520, 496, 419, 403, 376], // kJ/mol
    hyd: [-506, -406, -330, -310, -276], // hydration enthalpy of M+ / kJ/mol
    flame: ['crimson red', 'golden yellow', 'violet', 'red-violet', 'blue'],
  },
  g2: {
    els: ['Be', 'Mg', 'Ca', 'Sr', 'Ba'],
    rAtom: [111, 160, 197, 215, 222],
    rIon: [31, 72, 100, 118, 135], // M2+
    ie1: [899, 737, 590, 549, 503],
    ie2: [1757, 1450, 1145, 1064, 965],
    hyd: [-2494, -1921, -1577, -1443, -1305],
    flame: ['none', 'none', 'brick red', 'crimson', 'apple green'],
  },
  g13: {
    els: ['B', 'Al', 'Ga', 'In', 'Tl'],
    rAtom: [85, 143, 135, 167, 170],
    rIon: [27, 53.5, 62, 80, 88.5], // M3+
    ie1: [801, 577, 579, 558, 589],
    ie2: [2427, 1816, 1979, 1820, 1971],
    ie3: [3659, 2744, 2963, 2704, 2878],
    en: [2.0, 1.5, 1.6, 1.7, 1.8],
  },
  g14: {
    els: ['C', 'Si', 'Ge', 'Sn', 'Pb'],
    rCov: [77, 118, 122, 140, 146],
    ie1: [1086, 786, 761, 708, 715],
    en: [2.5, 1.8, 1.8, 1.8, 1.9],
    mm: ['C–C', 'Si–Si', 'Ge–Ge', 'Sn–Sn'],
    mmH: [348, 297, 260, 240], // homonuclear single-bond enthalpy / kJ mol-1
  },
};
const D = DATA;
const inc = (a) => a.every((v, i) => i === 0 || v > a[i - 1]);
const dcr = (a) => a.every((v, i) => i === 0 || v < a[i - 1]);

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

/** One line-plot panel: element symbols on x, values on y. */
function panel({ x0, y0, w, h, title, els, series, ymin, ymax, ticks }) {
  const n = els.length;
  const X = (i) => x0 + (w * (i + 0.5)) / n;
  const Y = (v) => y0 + h - ((v - ymin) / (ymax - ymin)) * h;
  const out = [lab(x0 - 30, y0 - 40, title, { w: 'bold', size: 12 })];
  series.forEach((s, k) => out.push(lab(x0 - 30 + k * 130, y0 - 22, `● ${s.name}`, { size: 11, c: s.c })));
  for (const t of ticks) {
    out.push(S.line(x0, Y(t), x0 + w, Y(t), { c: 'var(--diagram-muted)', w: 0.6, dash: '3 4' }), S.line(x0 - 3, Y(t), x0, Y(t)), lab(x0 - 6, Y(t) + 4, String(t), { a: 'end', size: 10 }));
  }
  out.push(S.line(x0, y0 + h, x0 + w, y0 + h), S.line(x0, y0, x0, y0 + h));
  for (const s of series) {
    out.push(S.path(s.vals.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' '), { c: s.c, w: 2 }));
    s.vals.forEach((v, i) => out.push(S.circle(X(i), Y(v), 3.5, { fill: s.c, c: s.c }), lab(X(i), Y(v) + (s.dy ?? -8), String(v), { a: 'middle', size: 10 })));
  }
  els.forEach((e, i) => out.push(lab(X(i), y0 + h + 16, e, { a: 'middle', w: 'bold' })));
  return out.join('');
}

function trendSvg(label, grp, radSeries, rad, ieSeries, ie) {
  const body = [
    panel({ x0: 48, y0: 62, w: 220, h: 150, title: `${grp}: radius down the group`, els: radSeries.els, series: radSeries.series, ...rad }),
    panel({ x0: 345, y0: 62, w: 205, h: 150, title: `${grp}: first ionisation enthalpy`, els: ieSeries.els, series: ieSeries.series, ...ie }),
    lab(48, 250, 'Radius / pm', { size: 10 }),
    lab(345, 250, 'Ionisation enthalpy / kJ mol⁻¹', { size: 10 }),
  ].join('');
  return svgDoc(580, 262, label, body);
}

// ---------------------------------------------------------------- 1. Group 1 trends
export const G1TREND = (() => {
  chk(inc(D.g1.rAtom) && inc(D.g1.rIon), 'group 1 atomic and M+ radii increase from Li to Cs');
  chk(dcr(D.g1.ie1), 'group 1 first ionisation enthalpy decreases from Li to Cs');
  chk(D.g1.rIon.every((v, i) => v < D.g1.rAtom[i]), 'each M+ ion is smaller than its atom (group 1)');
  return trendSvg(
    'Two line plots for group 1. Left: the metallic radius rises from 152 picometres for lithium to 265 for caesium and the M plus ionic radius from 76 to 167. Right: the first ionisation enthalpy falls from 520 kilojoules per mole for lithium to 376 for caesium.',
    'Group 1',
    { els: D.g1.els, series: [{ name: 'atom', vals: D.g1.rAtom, c: 'var(--diagram-blue)', dy: -8 }, { name: 'M⁺ ion', vals: D.g1.rIon, c: 'var(--diagram-red)', dy: 16 }] },
    { ymin: 50, ymax: 300, ticks: [100, 200, 300] },
    { els: D.g1.els, series: [{ name: 'IE₁', vals: D.g1.ie1, c: 'var(--diagram-green)', dy: -8 }] },
    { ymin: 300, ymax: 600, ticks: [300, 400, 500, 600] },
  );
})();

// ---------------------------------------------------------------- 2. Group 13 trends
export const G13TREND = (() => {
  const a = D.g13.rAtom;
  chk(a[2] < a[1], `Ga (${a[2]} pm) is smaller than Al (${a[1]} pm): d-block contraction breaks the trend`);
  chk(D.g13.ie1[2] > D.g13.ie1[1] && D.g13.ie1[4] > D.g13.ie1[3], 'IE1 rises from Al to Ga and from In to Tl (irregular, unlike group 1)');
  chk(inc(D.g13.rIon), 'M3+ radii increase down group 13');
  return trendSvg(
    'Two line plots for group 13. Left: atomic radius 85, 143, 135, 167 and 170 picometres for boron, aluminium, gallium, indium and thallium, with gallium smaller than aluminium, and the M three plus radius rising from 27 to 88.5. Right: the first ionisation enthalpy 801, 577, 579, 558 and 589 kilojoules per mole, which falls from boron to aluminium but is irregular afterwards.',
    'Group 13',
    { els: D.g13.els, series: [{ name: 'atom', vals: a, c: 'var(--diagram-blue)', dy: -8 }, { name: 'M³⁺ ion', vals: D.g13.rIon, c: 'var(--diagram-red)', dy: 16 }] },
    { ymin: 0, ymax: 200, ticks: [0, 50, 100, 150, 200] },
    { els: D.g13.els, series: [{ name: 'IE₁', vals: D.g13.ie1, c: 'var(--diagram-green)', dy: -8 }] },
    { ymin: 500, ymax: 850, ticks: [500, 600, 700, 800] },
  );
})();

// ---------------------------------------------------------------- bar chart helper
function bars({ x0, y0, w, h, items, max, c, ticksEvery }) {
  const n = items.length;
  const bw = Math.min(46, (w / n) * 0.6);
  const out = [S.line(x0, y0 + h, x0 + w, y0 + h), S.line(x0, y0, x0, y0 + h)];
  for (let t = 0; t <= max; t += ticksEvery) out.push(S.line(x0, y0 + h - (t / max) * h, x0 + w, y0 + h - (t / max) * h, { c: 'var(--diagram-muted)', w: 0.6, dash: '3 4' }), lab(x0 - 5, y0 + h - (t / max) * h + 4, String(t), { a: 'end', size: 10 }));
  items.forEach((it, i) => {
    const cx = x0 + (w * (i + 0.5)) / n;
    const bh = (it.v / max) * h;
    out.push(S.rect(cx - bw / 2, y0 + h - bh, bw, bh, { fill: c, fop: 0.35, c }), lab(cx, y0 + h - bh - 5, it.top, { a: 'middle', size: 11, w: 'bold' }), lab(cx, y0 + h + 15, it.l1, { a: 'middle', size: 11, w: 'bold' }));
    if (it.l2) out.push(lab(cx, y0 + h + 29, it.l2, { a: 'middle', size: 10 }));
  });
  return out.join('');
}

// ---------------------------------------------------------------- 3. Hydration enthalpy
export const HYDRATION = (() => {
  const mag = D.g1.hyd.map((v) => -v);
  chk(dcr(mag), 'magnitude of hydration enthalpy falls from Li+ to Cs+');
  chk(inc(D.g1.rIon), 'while the bare-ion radius rises from Li+ to Cs+');
  const items = D.g1.els.map((e, i) => ({ v: mag[i], top: `−${mag[i]}`, l1: `${e}⁺`, l2: `${D.g1.rIon[i]} pm` }));
  const body = [
    lab(30, 22, 'Hydration enthalpy of the alkali metal ions (magnitude)', { w: 'bold', size: 12 }),
    lab(30, 40, 'kJ mol⁻¹ released when the gaseous ion is hydrated; ionic radius below each bar', { size: 10 }),
    bars({ x0: 60, y0: 60, w: 440, h: 150, items, max: 600, c: 'var(--diagram-accent)', ticksEvery: 100 }),
    S.arrow(180, 252, 420, 252, { c: 'var(--diagram-muted)' }),
    lab(300, 270, 'bigger ion, smaller charge density, weaker hydration', { a: 'middle', size: 10 }),
  ].join('');
  return svgDoc(540, 282, 'Bar chart of the hydration enthalpies of the alkali metal ions: lithium 506, sodium 406, potassium 330, rubidium 310 and caesium 276 kilojoules per mole released, falling as the ionic radius grows from 76 to 167 picometres.', body);
})();

// ---------------------------------------------------------------- 4. Catenation
export const CATENATION = (() => {
  chk(dcr(D.g14.mmH), 'homonuclear single-bond enthalpy falls from C–C to Sn–Sn');
  const items = D.g14.mm.map((m, i) => ({ v: D.g14.mmH[i], top: String(D.g14.mmH[i]), l1: m }));
  const body = [
    lab(30, 22, 'Why carbon catenates best: single-bond enthalpy within group 14', { w: 'bold', size: 12 }),
    lab(30, 40, 'kJ mol⁻¹ needed to break one mole of the E–E bond', { size: 10 }),
    bars({ x0: 60, y0: 58, w: 380, h: 140, items, max: 400, c: 'var(--diagram-green)', ticksEvery: 100 }),
    lab(250, 238, 'Strong C–C bonds, and C–H (414) and C–O (358) of similar strength, make long chains stable.', { a: 'middle', size: 10 }),
  ].join('');
  return svgDoc(500, 250, 'Bar chart of the homonuclear single-bond enthalpies in group 14: C–C 348, Si–Si 297, Ge–Ge 260 and Sn–Sn 240 kilojoules per mole, decreasing down the group, which explains why carbon forms the longest stable chains.', body);
})();

// ---------------------------------------------------------------- 5. Diagonal relationship
export const DIAGONAL = (() => {
  const top = ['Li', 'Be', 'B', 'C'];
  const bot = ['Na', 'Mg', 'Al', 'Si'];
  const cw = 52;
  const ch = 46;
  const x0 = 30;
  const y0 = 60;
  const out = [lab(x0, 22, 'Diagonal relationship (periods 2 and 3)', { w: 'bold', size: 12 }), lab(x0, 40, 'Group', { size: 10 })];
  ['1', '2', '13', '14'].forEach((g, i) => out.push(lab(x0 + 54 + i * cw + (cw - 6) / 2, 40, g, { a: 'middle', size: 11, w: 'bold' })));
  const cx = (i) => x0 + 54 + i * cw;
  top.forEach((e, i) => out.push(S.rect(cx(i), y0, cw - 6, ch, { fill: 'var(--diagram-fill)', c: 'var(--diagram-blue)' }), lab(cx(i) + (cw - 6) / 2, y0 + 29, e, { a: 'middle', size: 15, w: 'bold' })));
  bot.forEach((e, i) => out.push(S.rect(cx(i), y0 + ch + 30, cw - 6, ch, { fill: 'var(--diagram-fill)', c: 'var(--diagram-green)' }), lab(cx(i) + (cw - 6) / 2, y0 + ch + 59, e, { a: 'middle', size: 15, w: 'bold' })));
  out.push(lab(x0, y0 + 29, 'Period 2', { size: 10 }), lab(x0, y0 + ch + 59, 'Period 3', { size: 10 }));
  const pairs = [[0, 1, 'var(--diagram-red)'], [1, 2, 'var(--diagram-red)'], [2, 3, 'var(--diagram-red)']];
  for (const [i, j, c] of pairs) out.push(S.arrow(cx(i) + (cw - 6) * 0.7, y0 + ch, cx(j) + (cw - 6) * 0.3, y0 + ch + 30, { c, w: 2, size: 8 }));
  // data panel
  const rLi = D.g1.rIon[0];
  const rNa = D.g1.rIon[1];
  const rMg = D.g2.rIon[1];
  const qBe = 2 / D.g2.rIon[0];
  const qAl = 3 / D.g13.rIon[1];
  const qMg = 2 / D.g2.rIon[1];
  chk(Math.abs(rLi - rMg) < Math.abs(rLi - rNa), `Li+ (${rLi} pm) is closer in size to Mg2+ (${rMg} pm) than to Na+ (${rNa} pm)`);
  chk(Math.abs(qBe - qAl) < Math.abs(qBe - qMg), `charge/radius: Be2+ ${qBe.toFixed(4)} is nearer to Al3+ ${qAl.toFixed(4)} than to Mg2+ ${qMg.toFixed(4)}`);
  const px = 300;
  out.push(
    lab(px, 62, 'Li and Mg: similar ionic sizes', { w: 'bold' }),
    lab(px, 78, `Li⁺ ${rLi} pm, Mg²⁺ ${rMg} pm (Na⁺ ${rNa} pm)`, { size: 11 }),
    lab(px, 112, 'Be and Al: similar charge per radius', { w: 'bold' }),
    lab(px, 128, `Be²⁺ 2/${D.g2.rIon[0]} = ${qBe.toFixed(3)} e/pm`, { size: 11 }),
    lab(px, 143, `Al³⁺ 3/${D.g13.rIon[1]} = ${qAl.toFixed(3)} e/pm`, { size: 11 }),
    lab(px, 158, `(Mg²⁺ 2/${rMg} = ${qMg.toFixed(3)} e/pm)`, { size: 11 }),
    lab(px, 192, 'Across a period size falls and charge rises;', { size: 10 }),
    lab(px, 206, 'down a group size rises. Moving diagonally,', { size: 10 }),
    lab(px, 220, 'the two effects roughly cancel.', { size: 10 }),
  );
  chk(rLi > 0 && rMg > 0 && rNa > 0, 'diagonal data values positive');
  return svgDoc(560, 236, 'Fragment of the periodic table with lithium, beryllium, boron and carbon in period 2 above sodium, magnesium, aluminium and silicon in period 3. Red arrows run diagonally from each period 2 element to the next period 3 element: lithium to magnesium, beryllium to aluminium and boron to silicon. Data panel: the Li plus ionic radius of 76 picometres is close to Mg two plus at 72, and the charge per radius of Be two plus, 0.065, is close to that of Al three plus, 0.056.', out.join(''));
})();
