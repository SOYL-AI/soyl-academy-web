// Hand-drawn SVG schematics for ch03 Classification of Elements and Periodicity in Properties.
// Geometry and data are computed here; SELF_CHECKS records what was asserted.
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);

// ---- shared data (textbook-standard values)
export const IE1 = { H: 1312, He: 2372, Li: 520, Be: 899, B: 801, C: 1086, N: 1402, O: 1314, F: 1681, Ne: 2081, Na: 496, Mg: 737, Al: 577, Si: 786, P: 1012, S: 999, Cl: 1256, Ar: 1520, K: 419, Ca: 590 };
export const SYM = Object.keys(IE1); // Z = index + 1
export const ISO = [['N³⁻', 7, 171], ['O²⁻', 8, 140], ['F⁻', 9, 133], ['Na⁺', 11, 102], ['Mg²⁺', 12, 72], ['Al³⁺', 13, 54]];
export const EGE = { F: -328, Cl: -349, Br: -325, I: -295, O: -141, S: -200, Se: -195, Te: -190 };

const lab = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });

// 1. Block layout of the periodic table (schematic coloured cells, not a reproduced table).
const COL = { s: 'var(--diagram-blue)', p: 'var(--diagram-green)', d: 'var(--diagram-yellow)', f: 'var(--diagram-red)' };
function layout() {
  const cells = [];
  const add = (col, row, b) => cells.push({ col, row, b });
  add(1, 1, 's');
  add(18, 1, 's'); // helium is placed in group 18 but is an s-block element
  for (let row = 2; row <= 7; row++) {
    add(1, row, 's');
    add(2, row, 's');
    if (row >= 4) for (let c = 3; c <= 12; c++) add(c, row, 'd');
    for (let c = 13; c <= 18; c++) add(c, row, 'p');
  }
  for (let row = 8; row <= 9; row++) for (let c = 3; c <= 16; c++) add(c, row, 'f'); // lanthanoids and actinoids, 14 each
  return cells;
}
const CELLS = layout();
const count = (b) => CELLS.filter((c) => c.b === b).length;
check(count('s') === 14, `block layout: ${count('s')} s-block cells (H, He and two per period for periods 2 to 7)`);
check(count('p') === 36, `block layout: ${count('p')} p-block cells (six in each of periods 2 to 7)`);
check(count('d') === 40, `block layout: ${count('d')} d-block cells (ten in each of periods 4 to 7)`);
check(count('f') === 28, `block layout: ${count('f')} f-block cells (fourteen lanthanoids and fourteen actinoids)`);
check(CELLS.length === 118, `block layout: ${CELLS.length} cells in total = 118 elements`);

export const BLOCKS = (() => {
  const x0 = 30;
  const y0 = 30;
  const w = 17;
  const gap = 1;
  const px = (c) => x0 + (c - 1) * (w + gap);
  const py = (r) => y0 + (r - 1) * (w + gap) + (r >= 8 ? 8 : 0);
  const body = [];
  for (const { col, row, b } of CELLS) body.push(S.rect(px(col), py(row), w, w, { c: 'var(--diagram-muted)', sw: 0.8, fill: COL[b], fop: 0.5 }));
  for (const g of [1, 2, 3, 12, 13, 18]) body.push(lab(px(g) + w / 2, 22, String(g), { a: 'middle' }));
  for (let r = 1; r <= 7; r++) body.push(lab(18, py(r) + 13, String(r), { a: 'middle' }));
  body.push(lab(2, 12, 'Group', {}));
  body.push(lab(px(1) + 20, 252, 'f-block: 4f and 5f filling (placed below the table)', { size: 10 }));
  const ly = 268;
  [['s', 14], ['p', 36], ['d', 40], ['f', 28]].forEach(([b, n], i) => {
    body.push(S.rect(30 + i * 85, ly, 12, 12, { c: 'var(--diagram-muted)', sw: 0.8, fill: COL[b], fop: 0.5 }));
    body.push(lab(46 + i * 85, ly + 10, `${b}-block (${n})`, {}));
  });
  return svgDoc(
    360,
    292,
    'Schematic block layout of the long form of the periodic table with eighteen groups and seven periods. The s-block is the first two groups plus helium, the d-block is groups three to twelve from period four, the p-block is groups thirteen to eighteen, and the f-block, fourteen lanthanoids and fourteen actinoids, is drawn below. The counts are fourteen, thirty-six, forty and twenty-eight cells.',
    body.join(''),
  );
})();

// 2. First ionisation enthalpy against atomic number, Z = 1 to 20.
export const IE_PLOT = (() => {
  const W = 380;
  const H = 250;
  const L = 48;
  const R = 12;
  const T = 24;
  const B = 44;
  const pw = W - L - R;
  const ph = H - T - B;
  const X = (z) => L + ((z - 1) / 19) * pw;
  const Y = (v) => T + ph - (v / 2500) * ph;
  const vals = SYM.map((s) => IE1[s]);
  const body = [];
  for (const v of [0, 500, 1000, 1500, 2000, 2500]) {
    body.push(S.line(L, Y(v), W - R, Y(v), { c: 'var(--diagram-muted)', w: 0.5, dash: v ? '3 3' : undefined }));
    body.push(lab(L - 6, Y(v) + 4, String(v), { a: 'end' }));
  }
  body.push(S.line(L, T, L, T + ph, { w: 1.5 }));
  body.push(lab(L - 36, T - 8, 'First ionisation enthalpy (kJ mol⁻¹)', {}));
  const pts = vals.map((v, i) => `${i ? 'L' : 'M'}${X(i + 1).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  body.push(S.path(pts, { c: 'var(--diagram-accent)', w: 1.5 }));
  const dips = [];
  vals.forEach((v, i) => {
    const dip = i > 0 && v < vals[i - 1];
    if (dip) dips.push(SYM[i]);
    body.push(S.circle(X(i + 1), Y(v), 3.2, { c: dip ? 'var(--diagram-red)' : 'var(--diagram-accent)', fill: dip ? 'var(--diagram-red)' : 'var(--diagram-accent)' }));
  });
  SYM.forEach((s, i) => body.push(lab(X(i + 1), T + ph + 14, s, { a: 'middle', size: 10 })));
  body.push(lab(L + pw / 2, H - 6, 'Element, in order of atomic number (red = lower than the element before it)', { a: 'middle' }));
  const peaks = SYM.filter((_, i) => i > 0 && i < 19 && vals[i] > vals[i - 1] && vals[i] > vals[i + 1]);
  check(JSON.stringify(dips) === JSON.stringify(['Li', 'B', 'O', 'Na', 'Al', 'S', 'K']), `IE plot: dips at ${dips.join(', ')} (B, O, Al, S are the anomalies; Li, Na and K start new periods)`);
  check(['Li', 'Na', 'K'].every((s) => IE1[s] === Math.min(...vals.slice(SYM.indexOf(s) - 1, SYM.indexOf(s) + 4))), 'IE plot: Li, Na and K are the lowest points of their periods');
  const per = { He: [0, 2], Ne: [2, 10], Ar: [10, 18] };
  check(Object.entries(per).every(([s, [a, b]]) => IE1[s] === Math.max(...vals.slice(a, b))), 'IE plot: He, Ne and Ar are the highest points of their periods');
  check(IE1.Be > IE1.B && IE1.N > IE1.O && IE1.Mg > IE1.Al && IE1.P > IE1.S, 'IE plot: Be > B, N > O, Mg > Al, P > S');
  check(peaks.includes('Be') && peaks.includes('N') && peaks.includes('Mg') && peaks.includes('P'), `IE plot: local maxima ${peaks.join(', ')}`);
  return svgDoc(
    W,
    H,
    'Line graph of first ionisation enthalpy against atomic number for the first twenty elements. The graph rises across each period with peaks at the noble gases helium, neon and argon, and falls sharply to a minimum at lithium, sodium and potassium. Small dips at boron, oxygen, aluminium and sulfur, marked in red, show that beryllium, nitrogen, magnesium and phosphorus have unusually high values.',
    body.join(''),
  );
})();

// 3. Radii of isoelectronic ions (ten electrons each).
export const ISO_BARS = (() => {
  const W = 360;
  const H = 230;
  const base = 175;
  const sc = 0.62;
  const bw = 38;
  const gap = 16;
  const body = [];
  ISO.forEach(([name, z, rad], i) => {
    const x = 24 + i * (bw + gap);
    const h = rad * sc;
    const anion = z < 10;
    body.push(S.rect(x, base - h, bw, h, { c: 'var(--diagram-muted)', sw: 1, fill: anion ? 'var(--diagram-red)' : 'var(--diagram-blue)', fop: 0.5 }));
    body.push(lab(x + bw / 2, base - h - 6, String(rad), { a: 'middle', w: 'bold' }));
    body.push(lab(x + bw / 2, base + 14, name, { a: 'middle', size: 11 }));
    body.push(lab(x + bw / 2, base + 28, `Z = ${z}`, { a: 'middle' }));
  });
  body.push(S.line(16, base, W - 8, base, { w: 1.5 }));
  body.push(lab(16, 18, 'Ionic radius (pm); every ion has ten electrons', { size: 11 }));
  body.push(lab(16, 208, 'More protons pull the same ten electrons in tighter, so the radius falls as Z rises.', { size: 10 }));
  const dec = ISO.every((x, i) => i === 0 || x[2] < ISO[i - 1][2]);
  check(dec, 'isoelectronic bars: radius decreases as atomic number increases (N³⁻ to Al³⁺)');
  const charge = { 'N³⁻': -3, 'O²⁻': -2, 'F⁻': -1, 'Na⁺': 1, 'Mg²⁺': 2, 'Al³⁺': 3 };
  check(ISO.every(([n, z]) => z - charge[n] === 10), 'isoelectronic bars: Z minus charge = 10 electrons for every species');
  return svgDoc(
    W,
    H,
    'Bar chart of the ionic radii of six species that each have ten electrons: nitride 171 pm, oxide 140 pm, fluoride 133 pm, sodium ion 102 pm, magnesium ion 72 pm and aluminium ion 54 pm. The radius falls steadily as the atomic number, and so the nuclear charge, rises.',
    body.join(''),
  );
})();

// 4. Electron gain enthalpy of group 17 and group 16 elements.
export const EGE_BARS = (() => {
  const W = 380;
  const H = 240;
  const top = 44;
  const sc = 0.45;
  const bw = 30;
  const gap = 14;
  const body = [];
  const groups = [['Group 17', ['F', 'Cl', 'Br', 'I'], 14], ['Group 16', ['O', 'S', 'Se', 'Te'], 14 + 4 * (bw + gap) + 14]];
  for (const [title, els, x0] of groups) {
    body.push(lab(x0, 20, title, { size: 11, w: 'bold' }));
    els.forEach((e, i) => {
      const x = x0 + i * (bw + gap);
      const h = -EGE[e] * sc;
      body.push(S.rect(x, top, bw, h, { c: 'var(--diagram-muted)', sw: 1, fill: e === 'Cl' || e === 'S' ? 'var(--diagram-green)' : 'var(--diagram-blue)', fop: 0.5 }));
      body.push(lab(x + bw / 2, top + h + 13, String(EGE[e]), { a: 'middle' }));
      body.push(lab(x + bw / 2, top - 6, e, { a: 'middle', size: 11, w: 'bold' }));
    });
  }
  body.push(S.line(8, top, W - 8, top, { w: 1.5 }));
  body.push(lab(8, 228, 'Electron gain enthalpy (kJ mol⁻¹): the longer the bar, the more energy is released.', { size: 10 }));
  check(EGE.Cl < EGE.F && EGE.S < EGE.O, 'electron gain enthalpy bars: Cl more negative than F and S more negative than O (small-atom repulsion)');
  check(EGE.Cl < EGE.F && EGE.F < EGE.Br && EGE.Br < EGE.I, `electron gain enthalpy bars: order Cl < F < Br < I (most to least energy released)`);
  return svgDoc(
    W,
    H,
    'Bar chart of electron gain enthalpies in kilojoules per mole. Group seventeen: fluorine minus 328, chlorine minus 349, bromine minus 325, iodine minus 295. Group sixteen: oxygen minus 141, sulfur minus 200, selenium minus 195, tellurium minus 190. In each group the second-period element releases less energy than the third-period element, so chlorine and sulfur have the largest bars.',
    body.join(''),
  );
})();
