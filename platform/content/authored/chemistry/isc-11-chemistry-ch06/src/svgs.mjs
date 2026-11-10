// ISC 11 Chemistry ch06 Classification of Elements and Periodicity in Properties: hand-drawn SVGs (allow-listed elements,
// palette colours only; geometry and data computed in JS, self-checked).
import { svgDoc, S } from './lib.mjs';
import { SYMBOLS, cellOf, locate, METALLOIDS, IE1, RADIUS, IONIC, EGE, EN, P2, P3, G1, OXIDES3, near } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const A = 'var(--diagram-accent)';
const M = 'var(--diagram-muted)';
const F = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. Long-form periodic table with symbols
export const TABLE = (() => {
  const out = [];
  const cw = 25;
  const ch = 22;
  const x0 = 48;
  const y0 = 28;
  const px = (c) => x0 + (c - 1) * cw;
  const py = (r) => y0 + (r - 1) * ch + (r >= 8 ? 12 : 0);
  const colour = { s: B, p: G, d: Y, f: R };
  const count = { s: 0, p: 0, d: 0, f: 0 };
  const seen = new Set();
  let bad = 0;
  for (let z = 1; z <= 118; z++) {
    const c = cellOf(z);
    count[c.block]++;
    const key = `${c.col},${c.row}`;
    if (seen.has(key)) bad++;
    seen.add(key);
    // group and period from the electronic configuration agree with the layout, except in the f-block region
    const inF = (z >= 57 && z <= 71) || (z >= 89 && z <= 103);
    if (!inF) {
      const loc = locate(z);
      if (loc.group !== c.col || loc.period !== c.row || loc.block !== c.block) bad++;
    }
    const sym = SYMBOLS[z - 1];
    const meta = METALLOIDS.includes(sym);
    out.push(S.rect(px(c.col), py(c.row), cw - 1, ch - 1, { c: meta ? 'currentColor' : M, sw: meta ? 2 : 0.7, fill: colour[c.block], fop: 0.45 }));
    out.push(small(px(c.col) + (cw - 1) / 2, py(c.row) + 14, sym, { a: 'middle' }));
  }
  chk(bad === 0, 'table: 118 distinct cells; group and period from the electronic configuration match the layout for every non-f-block element');
  chk(count.s === 14 && count.p === 36 && count.d === 40 && count.f === 28, `table: ${count.s} s-block, ${count.p} p-block, ${count.d} d-block, ${count.f} f-block elements`);
  for (let g = 1; g <= 18; g++) out.push(small(px(g) + (cw - 1) / 2, y0 - 6, String(g), { a: 'middle', w: 'bold' }));
  for (let p = 1; p <= 7; p++) out.push(small(x0 - 8, py(p) + 14, String(p), { a: 'end', w: 'bold' }));
  out.push(small(x0 - 8, y0 - 14, 'Period', { a: 'end', c: M }));
  out.push(small(px(1), y0 - 18, 'Group', { c: M }));
  out.push(small(x0 - 8, py(8) + 14, '4f', { a: 'end', c: M }));
  out.push(small(x0 - 8, py(9) + 14, '5f', { a: 'end', c: M }));
  const ly = py(9) + ch + 14;
  [['s-block (14)', B], ['p-block (36)', G], ['d-block (40)', Y], ['f-block (28)', R]].forEach(([t, c], i) => {
    out.push(S.rect(x0 + i * 112, ly, 12, 12, { c: M, sw: 0.7, fill: c, fop: 0.45 }));
    out.push(small(x0 + i * 112 + 17, ly + 10, t));
  });
  out.push(S.rect(x0, ly + 20, 12, 12, { c: 'currentColor', sw: 2, fill: F }));
  out.push(small(x0 + 17, ly + 30, 'Bold outline: metalloids (B, Si, Ge, As, Sb, Te).'));
  out.push(small(x0 + 17, ly + 44, 'La and Ac sit in group 3; Ce–Lu and Th–Lr form the two f-block rows.'));
  return svgDoc(
    508,
    ly + 56,
    'The long form of the periodic table with eighteen groups and seven periods, symbols shown for all 118 elements and colours for the blocks. The s-block is groups one and two and helium, the p-block is groups thirteen to eighteen, the d-block is groups three to twelve, and the fourteen lanthanoids and fourteen actinoids from cerium to lutetium and thorium to lawrencium form the f-block rows below. The metalloids boron, silicon, germanium, arsenic, antimony and tellurium have a bold outline.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 2. Atomic radii across period 3 and down group 1
export const RADII = (() => {
  const out = [];
  const k = 0.5; // px per pm
  const base = 190;
  const bw = 26;
  const panels = [
    { x: 14, title: 'Across period 3', els: P3.slice(0, 7), colour: B },
    { x: 282, title: 'Down group 1', els: G1, colour: R },
  ];
  for (const p of panels) {
    out.push(lab(p.x, 18, p.title, { w: 'bold' }));
    p.els.forEach((e, i) => {
      const v = RADIUS[e];
      const x = p.x + 6 + i * (bw + 8);
      out.push(S.rect(x, base - v * k, bw, v * k, { c: M, sw: 0.8, fill: p.colour, fop: 0.5 }));
      out.push(small(x + bw / 2, base - v * k - 4, String(v), { a: 'middle', w: 'bold' }));
      out.push(small(x + bw / 2, base + 14, e, { a: 'middle' }));
    });
    out.push(S.line(p.x, base, p.x + p.els.length * (bw + 8) + 6, base, { w: 1.5 }));
  }
  out.push(small(14, 222, 'Atomic radius in pm (metallic radius for metals, covalent radius for non-metals).', { c: M }));
  out.push(small(14, 236, 'Left: nuclear charge rises, shielding stays the same. Right: a new shell is added each period.', { c: M }));
  const dec = P3.slice(0, 6).every((e, i) => RADIUS[P3[i + 1]] < RADIUS[e]);
  const inc = G1.every((e, i) => i === 0 || RADIUS[e] > RADIUS[G1[i - 1]]);
  chk(dec, 'radii: atomic radius falls steadily from Na (186) to Cl (99) across period 3');
  chk(inc, 'radii: atomic radius rises steadily from Li (152) to Cs (262) down group 1');
  chk(262 * k + 22 < base, 'radii: tallest bar fits above the heading');
  return svgDoc(
    520,
    246,
    'Two bar charts of atomic radius in picometres. Across period 3 the radius falls from 186 for sodium, 160, 143, 117, 110, 104 to 99 for chlorine. Down group 1 the radius rises from 152 for lithium, 186 for sodium, 231 for potassium, 244 for rubidium to 262 for caesium.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 3. Nuclear charge, shielding and effective nuclear charge (simplified)
export const ZEFF = (() => {
  const out = [];
  const zs = [11, 12, 13, 14, 15, 16, 17];
  const names = P3.slice(0, 7);
  const k = 8; // px per unit of charge
  const base = 190;
  const bw = 40;
  out.push(lab(10, 16, 'Period 3: nuclear charge Z and the shielding of the ten inner electrons', { w: 'bold' }));
  zs.forEach((z, i) => {
    const x = 36 + i * (bw + 16);
    out.push(S.rect(x, base - 10 * k, bw, 10 * k, { c: M, sw: 0.8, fill: M, fop: 0.35 }));
    out.push(S.rect(x, base - z * k, bw, (z - 10) * k, { c: A, sw: 0.8, fill: A, fop: 0.55 }));
    out.push(small(x + bw / 2, base - z * k - 5, `Z = ${z}`, { a: 'middle', w: 'bold' }));
    out.push(small(x + bw / 2, base - 10 * k - (z - 10) * k / 2 + 4, `${z - 10}`, { a: 'middle', w: 'bold' }));
    out.push(small(x + bw / 2, base + 14, names[i], { a: 'middle' }));
  });
  out.push(S.rect(36, 218, 12, 12, { c: M, sw: 0.8, fill: M, fop: 0.35 }));
  out.push(small(52, 228, 'Ten inner electrons (1s, 2s, 2p) shield the valence electrons'));
  out.push(S.rect(36, 236, 12, 12, { c: A, sw: 0.8, fill: A, fop: 0.55 }));
  out.push(small(52, 246, 'Effective nuclear charge felt by a valence electron, roughly Z − 10'));
  chk(zs.every((z, i) => z - 10 === i + 1), 'Zeff: simplified estimate Z − 10 rises 1, 2, … 7 from Na to Cl while the shell stays n = 3');
  chk(11 * k + 8 < base && 17 * k < base - 24, 'Zeff: tallest column fits');
  return svgDoc(
    470,
    256,
    'Stacked columns for the elements sodium to chlorine. Each column has a grey lower part of height ten for the ten inner electrons that shield the valence electron, and a coloured upper part for the effective nuclear charge, a simplified estimate equal to the atomic number minus ten, which rises from 1 for sodium to 7 for chlorine, so the valence electrons are pulled in more strongly and the atoms shrink across the period.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 4. Atom and ion radii drawn to scale
export const ATOMION = (() => {
  const out = [];
  const k = 0.28; // px per pm
  const pairs = [
    { x: 0, y: 0, atom: 'Na', ion: 'Na⁺', col: B, ra: RADIUS.Na, ri: IONIC['Na⁺'] },
    { x: 1, y: 0, atom: 'Mg', ion: 'Mg²⁺', col: B, ra: RADIUS.Mg, ri: IONIC['Mg²⁺'] },
    { x: 0, y: 1, atom: 'Cl', ion: 'Cl⁻', col: R, ra: RADIUS.Cl, ri: IONIC['Cl⁻'] },
    { x: 1, y: 1, atom: 'S', ion: 'S²⁻', col: R, ra: RADIUS.S, ri: IONIC['S²⁻'] },
  ];
  for (const p of pairs) {
    const ox = 10 + p.x * 262;
    const oy = 4 + p.y * 168;
    const cy = oy + 78;
    const cxa = ox + 64;
    const cxi = ox + 184;
    out.push(S.circle(cxa, cy, p.ra * k, { c: M, sw: 1.5, dash: '4 3' }));
    out.push(S.circle(cxa, cy, 2, { fill: 'currentColor', c: 'currentColor' }));
    out.push(S.circle(cxi, cy, p.ri * k, { c: p.col, sw: 1.5, fill: p.col, fop: 0.3 }));
    out.push(S.circle(cxi, cy, 2, { fill: 'currentColor', c: 'currentColor' }));
    out.push(S.arrow(cxa + p.ra * k + 6, cy, cxi - p.ri * k - 6, cy, { c: 'currentColor', w: 1.2, size: 6 }));
    out.push(lab(cxa, oy + 150, `${p.atom} ${p.ra} pm`, { a: 'middle' }));
    out.push(lab(cxi, oy + 150, `${p.ion} ${p.ri} pm`, { a: 'middle', w: 'bold' }));
    out.push(small(ox + 124, oy + 14, `${p.atom} ${p.col === B ? 'loses' : 'gains'} ${p.ion.endsWith('²⁺') || p.ion.endsWith('²⁻') ? 'two electrons' : 'an electron'}`, { a: 'middle', c: M }));
  }
  chk(pairs.filter((p) => p.col === B).every((p) => p.ri < p.ra) && pairs.filter((p) => p.col === R).every((p) => p.ri > p.ra), 'atom and ion: cations Na⁺ and Mg²⁺ smaller than the atoms; anions Cl⁻ and S²⁻ larger than the atoms');
  chk(Math.max(...pairs.map((p) => Math.max(p.ra, p.ri))) * k < 70, 'atom and ion: all circles fit inside their panels');
  return svgDoc(
    540,
    340,
    'Circles drawn to scale comparing atoms with their ions. The sodium atom of radius 186 picometres shrinks to the sodium ion of 102, and the magnesium atom of 160 shrinks to the magnesium ion of 72. The chlorine atom of 99 grows to the chloride ion of 181, and the sulfur atom of 104 grows to the sulfide ion of 184. Cations are smaller than their atoms and anions are larger.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 5. Isoelectronic ions with ten electrons
const ISO10 = [['N³⁻', 7, -3], ['O²⁻', 8, -2], ['F⁻', 9, -1], ['Na⁺', 11, 1], ['Mg²⁺', 12, 2], ['Al³⁺', 13, 3]];
export const ISOEL = (() => {
  const out = [];
  const k = 0.27;
  const cy = 98;
  out.push(lab(8, 16, 'Ten electrons in every species: 1s² 2s² 2p⁶', { w: 'bold' }));
  let x = 12;
  const radii = [];
  ISO10.forEach(([nm, z, q]) => {
    const rad = IONIC[nm];
    radii.push(rad);
    const rr = rad * k;
    const cx = x + rr;
    out.push(S.circle(cx, cy, rr, { c: q < 0 ? R : B, sw: 1.5, fill: q < 0 ? R : B, fop: 0.3 }));
    out.push(S.circle(cx, cy, 2, { fill: 'currentColor', c: 'currentColor' }));
    out.push(lab(cx, 168, nm, { a: 'middle', w: 'bold' }));
    out.push(small(cx, 182, `${rad} pm`, { a: 'middle' }));
    out.push(small(cx, 196, `Z = ${z}`, { a: 'middle', c: M }));
    x += 2 * rr + 12;
  });
  out.push(small(8, 220, 'Same electrons, more protons: the pull on the electron cloud grows and the radius falls from N³⁻ to Al³⁺.', { c: M }));
  chk(radii.every((v, i) => i === 0 || v < radii[i - 1]), 'isoelectronic ions: radius falls steadily as Z rises, N³⁻ 171 to Al³⁺ 54');
  chk(ISO10.every(([, z, q]) => z - q === 10), 'isoelectronic ions: Z minus charge = 10 electrons for all six');
  chk(x < 520, `isoelectronic ions: row fits (${Math.round(x)} px)`);
  return svgDoc(
    520,
    230,
    'Six ions that each have ten electrons drawn to scale: nitride 171 picometres with nuclear charge 7, oxide 140 with 8, fluoride 133 with 9, sodium ion 102 with 11, magnesium ion 72 with 12 and aluminium ion 54 with 13. With the same number of electrons, the larger the nuclear charge the smaller the ion.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 6. First ionisation enthalpy across periods 2 and 3
export const IE_PERIOD = (() => {
  const out = [];
  const W = 520;
  const L = 52;
  const T = 30;
  const pw = W - L - 20;
  const ph = 200;
  const X = (i) => L + 14 + (i / 7) * (pw - 28);
  const Yf = (v) => T + ph - (v / 2200) * ph;
  const cats = ['1', '2', '13', '14', '15', '16', '17', '18'];
  for (const v of [0, 500, 1000, 1500, 2000]) {
    out.push(S.line(L, Yf(v), W - 20, Yf(v), { c: M, w: 0.5, dash: v ? '3 3' : undefined }));
    out.push(small(L - 6, Yf(v) + 4, String(v), { a: 'end' }));
  }
  out.push(S.line(L, T, L, T + ph, { w: 1.5 }));
  out.push(lab(6, 18, 'First ionisation enthalpy (kJ mol⁻¹)', { w: 'bold' }));
  cats.forEach((c, i) => out.push(small(X(i), T + ph + 15, c, { a: 'middle' })));
  out.push(small(L + pw / 2, T + ph + 34, 'Group number', { a: 'middle' }));
  const series = [
    { els: P2, col: B, name: 'Period 2 (Li to Ne)' },
    { els: P3, col: G, name: 'Period 3 (Na to Ar)' },
  ];
  const dips = [];
  for (const s of series) {
    const vals = s.els.map((e) => IE1[e]);
    out.push(S.path(vals.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Yf(v).toFixed(1)}`).join(' '), { c: s.col, w: 2 }));
    vals.forEach((v, i) => {
      const dip = i > 0 && i < 7 && v < vals[i - 1];
      if (dip) dips.push(s.els[i]);
      out.push(S.circle(X(i), Yf(v), dip ? 4.5 : 3, { c: dip ? R : s.col, fill: dip ? R : s.col }));
    });
  }
  out.push(small(62, 44, 'Red dips: B below Be and O below N (period 2);', { c: R, w: 'bold' }));
  out.push(small(62, 58, 'Al below Mg and S below P (period 3).', { c: R, w: 'bold' }));
  out.push(S.line(300, 38, 316, 38, { c: B, w: 2 }));
  out.push(small(320, 42, series[0].name));
  out.push(S.line(300, 54, 316, 54, { c: G, w: 2 }));
  out.push(small(320, 58, series[1].name));
  out.push(S.circle(308, 70, 4, { c: R, fill: R }));
  out.push(small(320, 74, 'Dip below the previous element'));
  chk(JSON.stringify(dips) === JSON.stringify(['B', 'O', 'Al', 'S']), `ionisation enthalpy plot: dips at ${dips.join(', ')} (B < Be, O < N, Al < Mg, S < P)`);
  chk(P2.every((e, i) => IE1[P3[i]] < IE1[e]) , 'ionisation enthalpy plot: every period-3 value lies below its period-2 partner (larger atoms)');
  chk(IE1.Ne === Math.max(...P2.map((e) => IE1[e])) && IE1.Ar === Math.max(...P3.map((e) => IE1[e])), 'ionisation enthalpy plot: noble gases Ne and Ar are the highest of their periods');
  return svgDoc(
    W,
    T + ph + 44,
    'Line graph of first ionisation enthalpy against group number for period 2 and period 3. Both lines rise across the period from group 1 to the noble gas in group 18, with two dips marked in red in each: boron below beryllium and oxygen below nitrogen in period 2, aluminium below magnesium and sulfur below phosphorus in period 3. Every period 3 value is lower than the period 2 value above it.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 7. Electron gain enthalpy
export const EGE_BARS = (() => {
  const out = [];
  const rows = ['Cl', 'F', 'Br', 'I', 'S', 'Se', 'Te', 'O', 'Li', 'Na', 'K', 'He', 'Ar', 'Ne'];
  const grp = { Cl: 17, F: 17, Br: 17, I: 17, S: 16, Se: 16, Te: 16, O: 16, Li: 1, Na: 1, K: 1, He: 18, Ar: 18, Ne: 18 };
  const col = { 17: B, 16: G, 1: Y, 18: R };
  const zeroX = 362;
  const k = 0.8;
  const y0 = 36;
  const rh = 18;
  out.push(lab(8, 16, 'Electron gain enthalpy (kJ mol⁻¹): negative means energy is released', { w: 'bold' }));
  out.push(S.line(zeroX, y0 - 8, zeroX, y0 + rows.length * rh, { w: 1.5 }));
  rows.forEach((e, i) => {
    const v = EGE[e];
    const y = y0 + i * rh + 8;
    out.push(lab(8, y + 4, e, { w: 'bold' }));
    out.push(S.line(zeroX, y, zeroX + v * k, y, { c: col[grp[e]], w: 5, cap: 'round' }));
    out.push(small(v < 0 ? zeroX + v * k - 6 : zeroX + v * k + 6, y + 4, (v > 0 ? '+' : '−') + Math.abs(v), { a: v < 0 ? 'end' : 'start' }));
  });
  const ly = y0 + rows.length * rh + 14;
  [['Group 17', B], ['Group 16', G], ['Group 1', Y], ['Noble gases', R]].forEach(([t, c], i) => {
    out.push(S.rect(8 + i * 108, ly, 12, 12, { c: M, sw: 0.7, fill: c, fop: 0.7 }));
    out.push(small(24 + i * 108, ly + 10, t));
  });
  const neg = rows.filter((e) => EGE[e] < 0).sort((a, b) => EGE[a] - EGE[b]);
  chk(neg[0] === 'Cl' && EGE.Cl < EGE.F && EGE.S < EGE.O && EGE.F < EGE.Br, 'electron gain enthalpy: Cl is the most negative; Cl < F and S < O (small second-period atoms repel the added electron)');
  chk(['He', 'Ne', 'Ar'].every((e) => EGE[e] > 0) && ['Li', 'Na', 'K'].every((e) => EGE[e] < 0 && EGE[e] > -100), 'electron gain enthalpy: noble gases positive; group 1 small negative values');
  return svgDoc(
    512,
    ly + 26,
    'Horizontal bars of electron gain enthalpy in kilojoules per mole. Group 17: chlorine minus 349, fluorine minus 328, bromine minus 325, iodine minus 295. Group 16: sulfur minus 200, selenium minus 195, tellurium minus 190, oxygen minus 141. Group 1: lithium minus 60, sodium minus 53, potassium minus 48. The noble gases helium plus 48, argon plus 96 and neon plus 116 are positive. Chlorine releases the most energy.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 8. Oxides of period 3
export const OXIDES = (() => {
  const out = [];
  const bw = 66;
  const gap = 5;
  const x0 = 8;
  const cols = [B, B, G, Y, Y, R, R];
  const fops = [0.6, 0.4, 0.45, 0.3, 0.4, 0.45, 0.65];
  const dEN = [];
  OXIDES3.forEach(([e, f, nature], i) => {
    const x = x0 + i * (bw + gap);
    out.push(S.rect(x, 36, bw, 108, { c: M, sw: 1, fill: cols[i], fop: fops[i], rx: 4 }));
    out.push(lab(x + bw / 2, 56, e, { a: 'middle', w: 'bold' }));
    out.push(lab(x + bw / 2, 76, f, { a: 'middle' }));
    const words = nature.split(' ');
    const lines = words.length === 3 ? [`${words[0]} ${words[1]}`, words[2]] : words.length === 2 ? [words[0], words[1]] : [nature];
    lines.forEach((t, j) => out.push(small(x + bw / 2, 100 + j * 13, t, { a: 'middle' })));
    const d = Math.round((3.5 - EN[e]) * 10) / 10;
    dEN.push(d);
    out.push(small(x + bw / 2, 136, `ΔEN ${d.toFixed(1)}`, { a: 'middle', c: M }));
  });
  out.push(lab(8, 16, 'Oxides of the period 3 elements', { w: 'bold' }));
  out.push(S.arrow(8, 166, 500, 166, { c: 'currentColor', w: 1.5, size: 7 }));
  out.push(small(8, 184, 'Basic character falls and acidic character rises; the bond to oxygen changes from ionic to covalent.', { c: M }));
  out.push(small(8, 198, 'ΔEN = 3.5 minus the electronegativity of the element (Pauling).', { c: M }));
  chk(dEN.every((d, i) => i === 0 || d < dEN[i - 1]), `oxides: ΔEN with oxygen falls steadily ${dEN.join(', ')}`);
  chk(OXIDES3.length === 7 && x0 + 7 * (bw + gap) < 520, 'oxides: seven boxes fit the width');
  return svgDoc(
    520,
    208,
    'Seven boxes for the oxides of sodium to chlorine: Na2O strongly basic, MgO basic, Al2O3 amphoteric, SiO2 weakly acidic, P4O10 acidic, SO3 strongly acidic and Cl2O7 very strongly acidic. An arrow underneath shows basic character falling and acidic character rising from left to right, as the electronegativity difference with oxygen falls from 2.6 to 0.5 and the bond changes from ionic to covalent.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 9. Diagonal relationship
export const DIAGONAL = (() => {
  const out = [];
  const els = [['Li', 'Be', 'B', 'C'], ['Na', 'Mg', 'Al', 'Si']];
  const grp = ['1', '2', '13', '14'];
  const cw = 78;
  const ch = 52;
  const x0 = 84;
  const y0 = 40;
  const ctr = (r, c) => [x0 + c * (cw + 14) + cw / 2, y0 + r * (ch + 28) + ch / 2];
  grp.forEach((g, c) => out.push(small(ctr(0, c)[0], 28, `Group ${g}`, { a: 'middle', w: 'bold' })));
  out.push(lab(8, ctr(0, 0)[1] + 4, 'Period 2', { w: 'bold' }));
  out.push(lab(8, ctr(1, 0)[1] + 4, 'Period 3', { w: 'bold' }));
  const pairs = [[0, 0, 1, 1, B], [0, 1, 1, 2, G], [0, 2, 1, 3, R]];
  for (const [r1, c1, r2, c2, col] of pairs) {
    const [xa, ya] = ctr(r1, c1);
    const [xb, yb] = ctr(r2, c2);
    out.push(S.line(xa, ya, xb, yb, { c: col, w: 3 }));
  }
  els.forEach((row, r) => row.forEach((e, c) => {
    const [cx, cy] = ctr(r, c);
    out.push(S.rect(cx - cw / 2, cy - ch / 2, cw, ch, { c: 'currentColor', sw: 1.2, fill: F, rx: 5 }));
    out.push(lab(cx, cy - 2, e, { a: 'middle', w: 'bold', size: 15 }));
    out.push(small(cx, cy + 14, `EN ${EN[e].toFixed(1)}`, { a: 'middle', c: M }));
  }));
  const names = [['Li – Mg', B, 'EN 1.0 and 1.2'], ['Be – Al', G, 'EN 1.5 and 1.5'], ['B – Si', R, 'EN 2.0 and 1.8']];
  names.forEach(([t, col, d], i) => {
    out.push(S.line(20 + i * 150, 196, 40 + i * 150, 196, { c: col, w: 3 }));
    out.push(lab(46 + i * 150, 200, t, { w: 'bold' }));
    out.push(small(46 + i * 150, 214, d, { c: M }));
  });
  const diff = (a, b) => Math.abs(EN[a] - EN[b]);
  chk(diff('Li', 'Mg') <= 0.2 && diff('Be', 'Al') === 0 && diff('B', 'Si') <= 0.2, 'diagonal relationship: Li–Mg, Be–Al and B–Si differ in electronegativity by 0.2 or less');
  chk(near(EN.Li, 1.0) && near(EN.Mg, 1.2) && near(EN.Be, 1.5) && near(EN.Al, 1.5), 'diagonal relationship: EN values as in the Pauling scale');
  return svgDoc(
    480,
    228,
    'Part of the periodic table showing lithium, beryllium, boron and carbon in period 2 above sodium, magnesium, aluminium and silicon in period 3. Diagonal lines join lithium with magnesium, beryllium with aluminium, and boron with silicon, each pair having nearly equal electronegativity: 1.0 and 1.2, 1.5 and 1.5, and 2.0 and 1.8. These pairs show the diagonal relationship.',
    out.join(''),
  );
})();
void Y;
void A;
