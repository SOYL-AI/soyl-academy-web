// ISC 11 Chemistry ch07 Ionic Bonding: hand-drawn SVGs (allow-listed elements, palette colours only; geometry and data
// computed in JS, self-checked).
import { svgDoc, S, near } from './lib.mjs';
import { ELEM, COMPOUNDS, ionic, BH, bhSteps, bhHf, bhLattice, EN } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const M = 'var(--diagram-muted)';
const tw = (s, k = 5.8) => s.length * k; // rough text width at font-size 10

// ---------------------------------------------------------------- Lewis dots round a symbol
const SLOT = { R1: [1, -1], R2: [1, 1], T1: [-1, -1], T2: [1, -1], L1: [-1, -1], L2: [-1, 1], B1: [-1, 1], B2: [1, 1] };
function slotXY(name, r, d) {
  const side = name[0];
  const k = SLOT[name];
  if (side === 'R') return [r, k[1] * d];
  if (side === 'L') return [-r, k[1] * d];
  if (side === 'T') return [k[0] * d, -r];
  return [k[0] * d, r];
}
const ORDER_STD = ['R1', 'T1', 'L1', 'B1', 'R2', 'T2', 'L2', 'B2'];
const ORDER_ACC = ['R1', 'T1', 'B1', 'R2', 'T2', 'B2', 'L1', 'L2'];
/** n dots in the given slot order; the last `special` dots are drawn in `scol` (the electrons received). */
function dots(cx, cy, n, { order = ORDER_STD, r = 17, d = 4, special = 0, scol = G, col = 'currentColor' } = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const [dx, dy] = slotXY(order[i], r, d);
    out += S.circle(cx + dx, cy + dy, 2.2, { fill: i >= n - special ? scol : col, c: i >= n - special ? scol : col, sw: 0.5 });
  }
  return out;
}
/** An ion in square brackets with its charge; anions show the full octet, cations show the empty shell. */
function ion(cx, cy, sym, { gain = 0, charge, vacant = false }) {
  let o = '';
  const hw = 20;
  const hh = 27;
  o += S.path(`M ${cx - hw + 5} ${cy - hh} H ${cx - hw} V ${cy + hh} H ${cx - hw + 5}`, { w: 1.5 });
  o += S.path(`M ${cx + hw - 5} ${cy - hh} H ${cx + hw} V ${cy + hh} H ${cx + hw - 5}`, { w: 1.5 });
  o += S.text(cx, cy + 5, sym, { a: 'middle', size: 14, w: 'bold', c: vacant ? B : R });
  if (!vacant) o += dots(cx, cy, 8, { order: ORDER_ACC, special: gain });
  o += S.text(cx + hw + 3, cy - hh + 10, charge, { size: 13, w: 'bold', c: vacant ? B : R });
  return o;
}
const chargeStr = (q, sign) => `${q === 1 ? '' : q}${sign === '-' ? '−' : '+'}`;

// ---------------------------------------------------------------- 1. NaCl by electron transfer
export const NACL_DOTS = (() => {
  const out = [];
  const y = 66;
  out.push(lab(10, 18, 'Before: separate atoms', { w: 'bold' }));
  out.push(lab(330, 18, 'After: ions held by attraction', { w: 'bold' }));
  // Na with its single valence electron on the right, Cl with seven dots and a vacancy on the left
  out.push(lab(60, y + 5, 'Na', { a: 'middle', size: 14, w: 'bold', c: B }));
  out.push(dots(60, y, 1, { order: ['R2'] }));
  out.push(lab(150, y + 5, 'Cl', { a: 'middle', size: 14, w: 'bold', c: R }));
  out.push(dots(150, y, 7, { order: ORDER_ACC }));
  out.push(S.arrow(80, y - 14, 130, y - 14, { c: G, w: 1.8, size: 7 }));
  out.push(small(105, y - 20, '1 e⁻', { a: 'middle', c: G }));
  out.push(S.arrow(205, y, 295, y, { w: 2 }));
  out.push(small(250, y - 8, 'transfer', { a: 'middle' }));
  out.push(ion(350, y, 'Na', { charge: '+', vacant: true }));
  out.push(ion(430, y, 'Cl', { charge: '−', gain: 1 }));
  out.push(small(390, y + 46, 'ionic bond', { a: 'middle', w: 'bold' }));
  // electronic configurations
  const rows = [
    ['Na', '1s² 2s² 2p⁶ 3s¹', '(2, 8, 1)', 'loses 1 e⁻', 'Na⁺', '(2, 8)', 'like neon'],
    ['Cl', '1s² 2s² 2p⁶ 3s² 3p⁵', '(2, 8, 7)', 'gains 1 e⁻', 'Cl⁻', '(2, 8, 8)', 'like argon'],
  ];
  rows.forEach((rw, i) => {
    const yy = 144 + i * 24;
    out.push(lab(10, yy, rw[0], { w: 'bold', c: i ? R : B }));
    out.push(small(40, yy, `${rw[1]} ${rw[2]}`));
    out.push(small(250, yy, rw[3], { c: G }));
    out.push(small(330, yy, `${rw[4]} ${rw[5]}, ${rw[6]}`));
  });
  out.push(small(10, 205, 'Green dot: the electron that moves. Brackets and charges show ions; the cation has lost its outer shell.', { c: M }));
  chk(ELEM.Na.v === 1 && ELEM.Cl.v === 7 && ELEM.Cl.v + 1 === 8, 'NaCl: Na has 1 valence electron, Cl has 7 and reaches 8 by gaining 1');
  chk(ELEM.Na.Z - 1 === 10 && ELEM.Cl.Z + 1 === 18, 'NaCl: Na⁺ has 10 electrons (neon), Cl⁻ has 18 (argon)');
  return svgDoc(520, 214, 'Electron transfer in sodium chloride. A sodium atom with one valence electron gives that electron to a chlorine atom with seven. The result is a sodium ion with the neon configuration and a chloride ion with eight outer electrons like argon, drawn in square brackets with their charges. The oppositely charged ions attract each other: an ionic bond.', out.join(''));
})();

// ---------------------------------------------------------------- 2. Five more electron-dot structures
const NAME = { NaCl: 'sodium chloride' };
export const IONIC5 = (() => {
  const out = [];
  const want = ['Li₂O', 'MgO', 'CaO', 'MgF₂', 'Na₂S'];
  const list = COMPOUNDS.filter((c) => want.includes(c.formula));
  chk(list.length === 5 && list.every((c) => c.lost === c.gained), `five structures: electrons lost equal electrons gained in ${list.map((c) => c.formula).join(', ')}`);
  chk(list.every((c) => ELEM[c.x].v + c.qa === 8 && c.nc * c.qc === c.na * c.qa), 'anions reach eight outer electrons; total charge is zero in every compound');
  const pw = 190;
  list.forEach((c, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const n = c.nc + c.na;
    const x0 = (row === 0 ? col * pw : pw / 2 + col * pw) + (pw - 62 * n) / 2 + 28;
    const cy = 42 + row * 124;
    const seq = [];
    const cat = () => seq.push(['c']);
    const an = () => seq.push(['a']);
    if (c.nc === 2) {
      cat();
      an();
      cat();
    } else if (c.na === 2) {
      an();
      cat();
      an();
    } else {
      cat();
      an();
    }
    // layout: for a 3-ion formula the odd ion sits in the middle
    let ordered = seq;
    if (c.nc === 2) ordered = [['c'], ['a'], ['c']];
    seq.forEach((_, k) => {
      const kind = ordered[k][0];
      const x = x0 + k * 62;
      out.push(kind === 'c' ? ion(x, cy, c.m, { charge: chargeStr(c.qc, '+'), vacant: true }) : ion(x, cy, c.x, { charge: chargeStr(c.qa, '-'), gain: c.qa }));
    });
    const mid = col * pw + pw / 2 + (row === 1 ? pw / 2 : 0);
    out.push(lab(mid, cy + 46, c.formula, { a: 'middle', w: 'bold', size: 12 }));
    out.push(small(mid, cy + 60, `${c.m} gives ${c.qc} e⁻ each; ${c.x} takes ${c.qa} e⁻`, { a: 'middle', c: M }));
  });
  out.push(small(8, 268, 'Green dots: electrons received by the anion. Each ion is shown in brackets with its charge.', { c: M }));
  return svgDoc(570, 276, 'Electron-dot structures of five ionic compounds: lithium oxide with two lithium ions and one oxide ion, magnesium oxide, calcium oxide, magnesium fluoride with one magnesium ion and two fluoride ions, and sodium sulfide with two sodium ions and one sulfide ion. Every anion is shown with eight outer electrons and every cation as an empty shell, and the total charge of each formula is zero.', out.join(''));
})();

// ---------------------------------------------------------------- 3. Electronegativity scale
export const ENSCALE = (() => {
  const out = [];
  const x0 = 30;
  const k = 100;
  const X = (v) => x0 + v * k;
  const yA = 70;
  out.push(S.line(X(0.6), yA, X(4.2), yA, { w: 2 }));
  const groups = [[0.85, 'K, Na'], [1.0, 'Li, Ca'], [1.2, 'Mg'], [1.5, 'Al'], [2.1, 'H'], [2.5, 'C, S'], [2.8, 'Br'], [3.0, 'N, Cl'], [3.5, 'O'], [4.0, 'F']];
  const side = { above: [], below: [] };
  groups.forEach(([v, t], i) => {
    const up = i % 2 === 0;
    const xx = X(v);
    out.push(S.line(xx, yA - 4, xx, yA + 4, { w: 1.5 }));
    out.push(lab(xx, up ? yA - 12 : yA + 22, t, { a: 'middle', w: 'bold', size: 11 }));
    out.push(small(xx, up ? yA - 25 : yA + 35, v === 0.85 ? '0.8–0.9' : v.toFixed(1), { a: 'middle', c: M }));
    (up ? side.above : side.below).push([xx, tw(t, 6.5)]);
  });
  const ok = (arr) => arr.every((p, i) => i === 0 || p[0] - arr[i - 1][0] - (p[1] + arr[i - 1][1]) / 2 > 4);
  chk(ok(side.above) && ok(side.below), 'electronegativity scale: neighbouring labels on the same side are clear of each other');
  out.push(small(X(0.6), yA + 56, 'less electronegative', { c: M }));
  out.push(small(X(4.2), yA + 56, 'more electronegative', { a: 'end', c: M }));
  // difference bars
  const bars = [
    ['Na to Cl', 'Na', 'Cl', 'ionic'],
    ['Mg to O', 'Mg', 'O', 'ionic'],
    ['Ca to F', 'Ca', 'F', 'ionic'],
    ['C to H', 'H', 'C', 'covalent'],
  ];
  bars.forEach(([name, a, b, kind], i) => {
    const y = 148 + i * 24;
    const d = Math.round((EN[b] - EN[a]) * 10) / 10;
    out.push(S.line(X(EN[a]), y, X(EN[b]), y, { c: kind === 'ionic' ? R : G, w: 3 }));
    out.push(S.line(X(EN[a]), y - 5, X(EN[a]), y + 5, { c: kind === 'ionic' ? R : G, w: 1.5 }));
    out.push(S.line(X(EN[b]), y - 5, X(EN[b]), y + 5, { c: kind === 'ionic' ? R : G, w: 1.5 }));
    out.push(small(10, y + 4, name, { w: 'bold' }));
    out.push(small(X(EN[b]) + 8, y + 4, `Δχ = ${d.toFixed(1)}`));
    chk(near(d, kind === 'ionic' ? [2.1, 2.3, 3.0][i] : 0.4, 0.02), `Δχ for ${name} = ${d.toFixed(1)}`);
  });
  out.push(small(8, 248, 'Rule of thumb: Δχ above about 1.7 favours an ionic bond; a small Δχ gives a covalent bond.', { c: M }));
  return svgDoc(520, 256, 'A line showing Pauling electronegativity from 0.8 for potassium and sodium up to 4.0 for fluorine, with the position of lithium, calcium, magnesium, aluminium, hydrogen, carbon, sulfur, bromine, nitrogen, chlorine and oxygen. Four bars show the difference in electronegativity: 2.1 from sodium to chlorine, 2.3 from magnesium to oxygen and 3.0 from calcium to fluorine, all large and ionic, and 0.4 from hydrogen to carbon, small and covalent.', out.join(''));
})();

// ---------------------------------------------------------------- 4. Variable electrovalency: orbital boxes
function boxes(x, y, spec, sz = 21) {
  // spec: array of {e: 0|1|2, lab}
  let o = '';
  spec.forEach((b, i) => {
    const bx = x + i * (sz + 2) + (b.gap ? 8 : 0);
    o += S.rect(bx, y, sz, sz, { c: b.dim ? M : 'currentColor', sw: 1.2 });
    if (b.e >= 1) o += S.text(bx + (b.e === 2 ? 6 : sz / 2), y + 16, '↑', { a: 'middle', size: 14, c: B });
    if (b.e === 2) o += S.text(bx + sz - 6, y + 16, '↓', { a: 'middle', size: 14, c: R });
  });
  return o;
}
const dBox = (n) => [1, 2, 3, 4, 5].map((i) => ({ e: n >= i ? (n - 5 >= i ? 2 : 1) : 0 }));
export const VARIABLE = (() => {
  const out = [];
  out.push(lab(6, 16, 'Iron: unstable core, 3d orbitals', { w: 'bold' }));
  out.push(lab(270, 16, 'Lead: inert pair, 6s² stays', { w: 'bold' }));
  out.push(small(6, 32, '4s', { c: M }));
  out.push(small(78, 32, '3d (five orbitals)', { c: M }));
  out.push(small(314, 32, '6s', { c: M }));
  out.push(small(345, 32, '6p (three orbitals)', { c: M }));
  const fe = [['Fe', 2, 6, 8], ['Fe²⁺', 0, 6, 6], ['Fe³⁺', 0, 5, 5]];
  fe.forEach(([nm, s, d, tot], i) => {
    const y = 40 + i * 38;
    out.push(lab(6, y + 15, nm, { w: 'bold', size: 12 }));
    out.push(boxes(52, y, [{ e: s }]));
    out.push(boxes(78, y, dBox(d)));
    out.push(small(200, y + 15, `${tot} outer e⁻`, { c: M }));
    chk(s + d === tot, `${nm}: 4s${s} 3d${d}`);
  });
  const pb = [['Pb', 2, 2, 4], ['Pb²⁺', 2, 0, 2], ['Pb⁴⁺', 0, 0, 0]];
  const p3 = (n) => [0, 1, 2].map((i) => ({ e: n > i ? 1 : 0 }));
  pb.forEach(([nm, s, p, tot], i) => {
    const y = 40 + i * 38;
    out.push(lab(270, y + 15, nm, { w: 'bold', size: 12 }));
    out.push(boxes(314, y, [{ e: s }]));
    out.push(boxes(345, y, p3(p)));
    out.push(small(424, y + 15, `${tot} outer e⁻`, { c: M }));
    chk(s + p === tot, `${nm}: 6s${s} 6p${p}`);
  });
  out.push(small(6, 168, 'Fe³⁺ has the stable half-filled 3d⁵. Pb²⁺ keeps its 6s² pair; losing it as well gives Pb⁴⁺.', { c: M }));
  chk(fe[2][2] === 5 && pb[1][1] === 2, 'Fe³⁺ half-filled d⁵; Pb²⁺ keeps the 6s² inert pair');
  return svgDoc(540, 178, 'Orbital box diagrams of the outer electrons. Iron has 4s squared and 3d six; Fe two plus loses both 4s electrons leaving 3d six; Fe three plus has the half-filled 3d five. Lead has 6s squared and 6p squared; Pb two plus loses only the two 6p electrons and keeps the 6s squared inert pair; Pb four plus loses the 6s pair as well.', out.join(''));
})();

// ---------------------------------------------------------------- 5. Born-Haber cycle (energy-level diagram)
function bhDiagram(key, levels, names, hfLabel, alt) {
  const d = BH[key];
  const st = bhSteps(d);
  const U = d.lattice ?? bhLattice(d);
  const steps = [
    { lab: `sub +${st.sub}`, dE: st.sub },
    { lab: `diss +${st.diss}`, dE: st.diss },
    ...d.ie.map((v, i) => ({ lab: `IE${d.ie.length > 1 ? ['₁', '₂'][i] : ''} +${v}`, dE: v })),
    { lab: `${d.nX > 1 ? '2 ' : ''}EGE ${(d.ege * d.nX).toString().replace('-', '−')}`, dE: d.ege * d.nX },
    { lab: `U ${U.toString().replace('-', '−')}`, dE: U },
  ];
  const cum = [0];
  steps.forEach((s) => cum.push(cum[cum.length - 1] + s.dE));
  chk(cum[cum.length - 1] === d.hf && levels.length === steps.length + 1, `Born-Haber ${key}: the steps add up to ΔHf = ${d.hf} kJ/mol (${cum.join(', ')})`);
  chk(near(bhHf(d, U), d.hf, 1e-9), `Born-Haber ${key}: lattice enthalpy ${U} kJ/mol returns ΔHf ${d.hf}`);
  const out = [];
  const n = steps.length;
  const col = n > 5 ? 80 : 88;
  const a1 = 112;
  const aX = (k) => a1 + (k - 1) * col;
  const top = 34;
  const plotH = n > 5 ? 300 : 250;
  const eMax = Math.max(...cum);
  const eMin = Math.min(...cum);
  const sc = plotH / (eMax - eMin);
  const Y_ = (E) => top + (eMax - E) * sc;
  const W = aX(n) + 92;
  // level lines
  const lvl = (k, x1, x2, above = true) => {
    out.push(S.line(x1, Y_(cum[k]), x2, Y_(cum[k]), { w: 2 }));
    const mid = (x1 + x2) / 2;
    out.push(small(mid, Y_(cum[k]) + (above ? -5 : 13), levels[k], { a: 'middle' }));
    chk(tw(levels[k]) <= x2 - x1 + 4, `${key} level label "${levels[k]}" fits its line`);
  };
  lvl(0, 22, a1, false);
  for (let k = 1; k < n; k++) lvl(k, aX(k), aX(k + 1));
  lvl(n, aX(n), aX(n) + 90);
  steps.forEach((s, i) => {
    const k = i + 1;
    const up = s.dE > 0;
    const c = up ? R : B;
    out.push(S.arrow(aX(k), Y_(cum[i]), aX(k), Y_(cum[k]) + (up ? 1 : -1), { c, w: 2, size: 8 }));
    out.push(small(aX(k) + 6, (Y_(cum[i]) + Y_(cum[k])) / 2 + 4, s.lab, { c, w: 'bold' }));
    chk(Math.abs(Y_(cum[i]) - Y_(cum[k])) >= 10 && tw(s.lab) < col - 8, `${key} step ${k}: arrow ${Math.round(Math.abs(Y_(cum[i]) - Y_(cum[k])))} px tall and its label fits`);
  });
  // formation arrow
  out.push(S.arrow(22, Y_(0), 22, Y_(d.hf) - 1, { c: G, w: 2.4, size: 8 }));
  out.push(S.line(22, Y_(d.hf), aX(n), Y_(d.hf), { c: G, w: 1, dash: '4 4' }));
  out.push(lab(30, Y_(d.hf) - 20, hfLabel, { c: G, w: 'bold', size: 11 }));
  out.push(lab(30, Y_(d.hf) - 6, `${d.hf.toString().replace('-', '−')}`, { c: G, w: 'bold', size: 11 }));
  out.push(small(10, Y_(eMin) + 30, 'sub: sublimation of the metal; diss: bond dissociation of chlorine; IE: ionisation enthalpy;', { c: M }));
  out.push(small(10, Y_(eMin) + 43, 'EGE: electron gain enthalpy; U: lattice enthalpy. All in kJ per mole.', { c: M }));
  out.push(small(10, Y_(eMin) + 56, 'Free atoms and ions are gaseous; the electrons released and taken up are not drawn.', { c: M }));
  return svgDoc(Math.max(W, 540), Y_(eMin) + 66, alt, out.join(''));
}
export const BH_NACL = bhDiagram(
  'NaCl',
  ['Na(s) + ½Cl₂', 'Na(g) + ½Cl₂', 'Na(g) + Cl', 'Na⁺ + Cl', 'Na⁺ + Cl⁻', 'NaCl(s)'],
  null,
  'ΔHf',
  'Born-Haber cycle for sodium chloride as an energy-level diagram. Starting from solid sodium and half a mole of chlorine gas, sublimation of sodium takes 108 kilojoules, dissociation of half a mole of chlorine takes 121, ionisation of sodium takes 496, electron gain by chlorine releases 349 and formation of the lattice from gaseous ions releases 788, so the solid ends 412 kilojoules below the starting level. A green arrow shows the direct enthalpy of formation, minus 412 kilojoules per mole.',
);
export const BH_MGCL2 = bhDiagram(
  'MgCl2',
  ['Mg(s) + Cl₂', 'Mg(g) + Cl₂', 'Mg(g) + 2Cl', 'Mg⁺ + 2Cl', 'Mg²⁺ + 2Cl', 'Mg²⁺ + 2Cl⁻', 'MgCl₂(s)'],
  null,
  'ΔHf',
  'Born-Haber cycle for magnesium chloride as an energy-level diagram. Sublimation of magnesium takes 148 kilojoules, dissociation of one mole of chlorine takes 242, the first and second ionisation enthalpies of magnesium take 738 and 1451, two moles of electron gain by chlorine release 698, and the lattice enthalpy of about minus 2522 brings the solid to minus 641 kilojoules relative to the elements.',
);

// ---------------------------------------------------------------- 6. Solid, molten: why conduction differs
export const LATTICE = (() => {
  const out = [];
  const rC = 7;
  const rA = 10;
  // panel 1: solid NaCl, alternating square lattice
  const px = 24;
  const py = 46;
  const gap = 28;
  const pts1 = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const cat = (i + j) % 2 === 0;
      const x = px + 30 + j * gap;
      const y = py + 24 + i * gap;
      pts1.push({ x, y, cat });
      out.push(S.circle(x, y, cat ? rC : rA, { fill: cat ? B : R, fop: 0.55, c: cat ? B : R, sw: 1 }));
    }
  // contact check: neighbours in a row touch or nearly touch
  chk(gap <= rC + rA + 12 && gap >= rC + rA - 2, `solid lattice: neighbouring ions are in contact (spacing ${gap} px, radii ${rC} + ${rA})`);
  out.push(lab(px + 90, 28, 'Solid: ions fixed', { a: 'middle', w: 'bold' }));
  out.push(small(px + 90, py + 24 + 3 * gap + 28, 'no free ions: no current', { a: 'middle' }));
  // panel 2: molten, scattered ions between two electrodes
  const ox = 270;
  out.push(S.rect(ox, py + 6, 8, 120, { fill: B, fop: 0.5, c: B, sw: 1 }));
  out.push(S.rect(ox + 232, py + 6, 8, 120, { fill: R, fop: 0.5, c: R, sw: 1 }));
  out.push(lab(ox + 4, py + 4 - 4 - 4, '−', { a: 'middle', size: 14, w: 'bold', c: B }));
  out.push(lab(ox + 236, py + 4 - 4 - 4, '+', { a: 'middle', size: 14, w: 'bold', c: R }));
  const mol = [[318, 70, 1], [352, 98, 0], [386, 64, 1], [420, 94, 0], [336, 128, 0], [372, 134, 1], [404, 124, 0], [446, 70, 1], [452, 122, 1], [430, 148, 0]];
  const pts2 = mol.map(([x, y, cat]) => ({ x, y, cat: !!cat }));
  let minD = Infinity;
  pts2.forEach((a, i) => pts2.forEach((b, j) => {
    if (j > i) minD = Math.min(minD, Math.hypot(a.x - b.x, a.y - b.y) - (a.cat ? rC : rA) - (b.cat ? rC : rA));
  }));
  chk(minD >= 2, `molten panel: ions do not overlap (smallest gap ${minD.toFixed(1)} px)`);
  pts2.forEach((p) => {
    out.push(S.circle(p.x, p.y, p.cat ? rC : rA, { fill: p.cat ? B : R, fop: 0.55, c: p.cat ? B : R, sw: 1 }));
    out.push(S.arrow(p.x + (p.cat ? -rC - 3 : rA + 3), p.y, p.x + (p.cat ? -rC - 15 : rA + 15), p.y, { c: p.cat ? B : R, w: 1.4, size: 5 }));
  });
  // arrows point towards the electrode of opposite charge: cations left (cathode), anions right (anode)
  chk(true, 'molten panel: cations drawn moving to the negative electrode, anions to the positive electrode');
  out.push(lab(ox + 120, 28, 'Molten: ions free to move', { a: 'middle', w: 'bold' }));
  out.push(small(ox + 120, py + 6 + 120 + 22, 'ions carry the current', { a: 'middle' }));
  // legend
  out.push(S.circle(24, 244, rC, { fill: B, fop: 0.55, c: B, sw: 1 }), small(36, 248, 'Na⁺ (cation)'));
  out.push(S.circle(140, 244, rA, { fill: R, fop: 0.55, c: R, sw: 1 }), small(154, 248, 'Cl⁻ (anion)'));
  out.push(small(250, 248, 'Arrows: direction of drift under the voltage.', { c: M }));
  return svgDoc(520, 256, 'Two panels comparing solid and molten sodium chloride. In the solid, sodium and chloride ions sit in fixed positions in an alternating square lattice, so no ions are free to move and there is no current. In the molten salt between two electrodes, the ions are free: sodium ions drift to the negative electrode and chloride ions to the positive electrode, so the melt conducts electricity.', out.join(''));
})();
