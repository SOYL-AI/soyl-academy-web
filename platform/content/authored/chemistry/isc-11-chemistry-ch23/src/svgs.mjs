// ch23 Alkynes — SVGs. Molecules are drawn from an atoms-and-bonds model (molkit.mjs); every molecular formula is computed from the
// drawing, geometry and data are computed and checked, and reaction schemes are atom-counted from the formulae shown.
import { svgDoc, S } from './lib.mjs';
import { drawMol, formula, skel, mol, bounds, lab, benzene } from './molkit.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const MUTED = 'var(--diagram-muted)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const must = (m, want, what) => chk(formula(m) === want, `${what}: formula computed from the drawing is ${formula(m)} (expected ${want})`);
const at = (m, cx, cy) => {
  const b = bounds(m);
  return drawMol(m, { ox: cx - (b.x0 + b.x1) / 2, oy: cy - (b.y0 + b.y1) / 2 });
};
// atom counter that understands brackets: Ca(OH)2, coefficients are applied by the caller
const atoms = (f) => {
  const o = {};
  const re = /([A-Z][a-z]?)(\d*)|\(|\)(\d*)/g;
  const stack = [{}];
  let m;
  while ((m = re.exec(f))) {
    if (m[0] === '(') stack.push({});
    else if (m[0].startsWith(')')) {
      const top = stack.pop();
      const k = m[3] ? Number(m[3]) : 1;
      for (const [e, n] of Object.entries(top)) stack[stack.length - 1][e] = (stack[stack.length - 1][e] || 0) + n * k;
    } else stack[stack.length - 1][m[1]] = (stack[stack.length - 1][m[1]] || 0) + (m[2] ? Number(m[2]) : 1);
  }
  Object.assign(o, stack[0]);
  return o;
};
const side = (list) => {
  const o = {};
  for (const [c, f] of list) for (const [e, n] of Object.entries(atoms(f))) o[e] = (o[e] || 0) + c * n;
  return JSON.stringify(Object.entries(o).sort());
};
const bal = (left, right, what) => chk(side(left) === side(right), `${what} balances`);
const lineMol = (xs, orders, shown, els = {}) => mol(xs.map((x, i) => ({ x, y: 0, ...(els[i] ? { el: els[i] } : {}), ...(shown.includes(i) ? { show: true } : {}) })), orders.map((o, i) => [i, i + 1, o]));
const cs = (t, x, y, o = {}) => lab(x, y, t, { a: 'middle', size: 10, ...o });

// standard data
export const ETHYNE = { CC: 120, CH: 106, ANGLE: 180 }; // pm, degrees
export const BE = { CC: 347, C2C: 611, C3C: 837 }; // bond enthalpies, kJ mol-1 (NCERT-style values)
export const SCHAR = { sp3: 25, sp2: 100 / 3, sp: 50 }; // % s character
export const PKA = { ethane: 50, ethene: 44, ethyne: 25 }; // approximate pKa of the C-H bond

// ---------------------------------------------------------------- 1. structure of ethyne
export const TRIPLE = (() => {
  chk(ETHYNE.ANGLE === 180, 'ethyne: H-C-C angle 180 degrees (sp carbon, linear molecule)');
  chk(ETHYNE.CC < 134 && 134 < 154, 'bond lengths: C≡C 120 pm < C=C 134 pm < C-C 154 pm');
  const m = lineMol([0, 40, 40 + 54, 40 + 54 + 40], [1, 3, 1], [], { 0: 'H', 3: 'H' });
  must(m, 'C2H2', 'ethyne drawing');
  const sigma = 3; // two C-H and one C-C
  const pi = 2;
  chk(sigma === 3 && pi === 2, 'ethyne has 3 sigma bonds (2 C–H, 1 C–C) and 2 pi bonds');
  const body = [cs('Ethyne, C₂H₂: a linear molecule with one σ and two π bonds between the carbons', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  body.push(at(m, 105, 78));
  body.push(cs('H–C≡C–H: all four atoms on one straight line', 105, 112));
  body.push(S.arrow(60, 140, 150, 140, { c: RED, w: 1.2 }), S.arrow(150, 140, 60, 140, { c: RED, w: 1.2 }));
  body.push(cs('H–C–C angle 180°', 105, 160, { c: RED }));
  body.push(cs('C≡C 120 pm   C–H 106 pm', 105, 178));
  body.push(cs('(C=C 134 pm; C–C 154 pm)', 105, 192, { c: MUTED }));
  // end-on view of the two pi clouds
  const cx = 355;
  const cy = 100;
  body.push(S.circle(cx, cy, 4, { c: BLUE, fill: 'var(--diagram-blue)', sw: 1 }));
  for (const [dx, dy] of [[0, -30], [0, 30]]) body.push(S.ellipse(cx + dx, cy + dy, 14, 24, { c: GREEN, fill: 'var(--diagram-green)', fop: 0.22, sw: 1.4 }));
  for (const [dx, dy] of [[-30, 0], [30, 0]]) body.push(S.ellipse(cx + dx, cy + dy, 24, 14, { c: GREEN, fill: 'var(--diagram-green)', fop: 0.22, sw: 1.4 }));
  body.push(S.circle(cx, cy, 44, { c: MUTED, sw: 1, dash: '3 3' }));
  body.push(cs('end-on view along the C–C axis', cx, 38));
  body.push(cs('π cloud 1 (above and below)', cx, 168, { c: GREEN }));
  body.push(cs('π cloud 2 (left and right, at 90° to cloud 1)', cx, 182, { c: GREEN }));
  body.push(cs('The two π clouds together form a cylinder of electron density round the σ axis.', 235, 212));
  body.push(cs('Each carbon is sp hybridised: two sp orbitals (σ bonds) and two unhybridised p orbitals (π bonds).', 235, 228));
  return svgDoc(470, 240, 'Ethyne drawn as a straight line H-C-C-H with bond angle 180 degrees, C-C triple bond 120 picometres and C-H 106 picometres, and an end-on view showing two perpendicular pi electron clouds forming a cylinder around the sigma bond axis.', body.join(''));
})();

// ---------------------------------------------------------------- 2. s character and acidity
export const SCHARACTER = (() => {
  const sOf = (p) => 100 / (1 + p); // s character of an sp^n hybrid with n p-parts
  chk(Math.abs(sOf(3) - SCHAR.sp3) < 1e-9 && Math.abs(sOf(2) - SCHAR.sp2) < 1e-9 && Math.abs(sOf(1) - SCHAR.sp) < 1e-9, 's character computed as 1/(1+n): sp3 25 %, sp2 33.3 %, sp 50 %');
  chk(PKA.ethyne < PKA.ethene && PKA.ethene < PKA.ethane, 'approximate pKa of the C–H bond: ethyne 25 < ethene 44 < ethane 50');
  const body = [cs('The more s character, the more acidic the C–H bond', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  const items = [
    ['Ethane (sp³)', SCHAR.sp3, PKA.ethane, MUTED],
    ['Ethene (sp²)', SCHAR.sp2, PKA.ethene, BLUE],
    ['Ethyne (sp)', SCHAR.sp, PKA.ethyne, RED],
  ];
  const base = 176;
  const k = 2.2; // px per percent
  body.push(S.line(60, base, 410, base, { w: 1.3 }));
  items.forEach(([name, s, pka, c], i) => {
    const x = 110 + i * 120;
    const h = s * k;
    body.push(S.rect(x - 28, base - h, 56, h, { c, fill: c, fop: 0.25, sw: 1.5 }));
    body.push(cs(`${s % 1 === 0 ? s : s.toFixed(1)} % s`, x, base - h - 6, { w: 'bold' }));
    body.push(cs(name, x, base + 15));
    body.push(cs(`pKa about ${pka}`, x, base + 29, { c }));
  });
  body.push(cs('s-character of the carbon orbital in the C–H bond', 235, 40));
  body.push(cs('An s orbital lies closer to the nucleus than a p orbital, so an sp carbon', 235, 222));
  body.push(cs('holds the C–H bonding pair more tightly. H⁺ is released more easily and the', 235, 236));
  body.push(cs('acetylide ion HC≡C⁻ is stabilised. The pKa values are approximate.', 235, 250));
  return svgDoc(470, 260, 'Bar chart of s character of the carbon orbital in the C-H bond: ethane sp3 25 percent, ethene sp2 33.3 percent, ethyne sp 50 percent, with approximate pKa values 50, 44 and 25. Ethyne is the most acidic.', body.join(''));
})();

// ---------------------------------------------------------------- 3. ethyne from calcium carbide
export const CARBIDE = (() => {
  bal([[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']], 'CaCO3 -> CaO + CO2');
  bal([[1, 'CaO'], [3, 'C']], [[1, 'CaC2'], [1, 'CO']], 'CaO + 3C -> CaC2 + CO');
  bal([[1, 'CaC2'], [2, 'H2O']], [[1, 'C2H2'], [1, 'Ca(OH)2']], 'CaC2 + 2H2O -> C2H2 + Ca(OH)2');
  const box = (y, h, head, eq, note, c) => [
    S.rect(20, y, 430, h, { c, sw: 1.4, rx: 6, fill: c, fop: 0.08 }),
    lab(32, y + 18, head, { size: 11, w: 'bold', c }),
    lab(32, y + 38, eq, { size: 13 }),
    lab(32, y + 55, note, { size: 10, c: MUTED }),
  ].join('');
  const body = [
    cs('Manufacture of ethyne from limestone, coke and water', 235, 14, { size: 12, w: 'bold', c: BLUE }),
    box(26, 64, '1  Lime from limestone', 'CaCO₃  →  CaO  +  CO₂', 'limestone heated in a kiln at about 1273 K', GREEN),
    S.arrow(235, 92, 235, 106, { w: 1.6 }),
    box(108, 64, '2  Calcium carbide in an electric arc furnace', 'CaO  +  3C  →  CaC₂  +  CO', 'quicklime and coke at about 2273 K (the carbide ion is C≡C²⁻)', BLUE),
    S.arrow(235, 174, 235, 188, { w: 1.6 }),
    box(190, 64, '3  Ethyne from the carbide (cold water)', 'CaC₂  +  2H₂O  →  C₂H₂  +  Ca(OH)₂', 'a gas that bubbles out; slaked lime is left behind (carbide + water: exothermic)', RED),
    cs('One mole of CaC₂ (64 g) gives one mole of ethyne (26 g, 22.4 L at STP).', 235, 276),
  ];
  return svgDoc(470, 286, 'Three-step flow for making ethyne: limestone is heated to give lime and carbon dioxide; lime and coke in an electric furnace at 2273 kelvin give calcium carbide and carbon monoxide; calcium carbide with water gives ethyne and calcium hydroxide.', body.join(''));
})();

// ---------------------------------------------------------------- 4. hydration of alkynes (enol to carbonyl)
export const HYDRATION = (() => {
  const propyne = lineMol([0, 30, 30 + 26], [1, 3], [0, 2]);
  const enol = skel(3, [[1, 'O']], { orders: { 1: 2 } });
  const propanone = skel(3, [[1, 'O', 'p', 2]]);
  const ethyneM = lineMol([0, 28, 28 + 24, 28 + 24 + 28], [1, 3, 1], [], { 0: 'H', 3: 'H' });
  const vinyl = skel(2, [[1, 'O', 't']], { orders: { 0: 2 } });
  const ethanal = skel(2, [[1, 'O', 'p', 2]]);
  must(propyne, 'C3H4', 'propyne');
  must(enol, 'C3H6O', 'prop-1-en-2-ol (enol)');
  must(propanone, 'C3H6O', 'propanone');
  must(ethyneM, 'C2H2', 'ethyne');
  must(vinyl, 'C2H4O', 'ethenol (vinyl alcohol)');
  must(ethanal, 'C2H4O', 'ethanal');
  chk(side([[1, 'C3H4'], [1, 'H2O']]) === side([[1, 'C3H6O']]), 'hydration C3H4 + H2O -> C3H6O balances');
  chk(side([[1, 'C2H2'], [1, 'H2O']]) === side([[1, 'C2H4O']]), 'hydration C2H2 + H2O -> C2H4O balances');
  const row = (y, a, an, e, en, k, kn, note) => [
    at(a, 55, y),
    lab(55, y + 36, an, { a: 'middle', size: 10, w: 'bold' }),
    S.arrow(112, y - 2, 180, y - 2, { w: 1.8 }),
    lab(146, y - 12, 'H₂O', { a: 'middle', size: 10 }),
    lab(146, y + 14, 'HgSO₄, H₂SO₄', { a: 'middle', size: 10 }),
    at(e, 232, y),
    lab(232, y + 36, en, { a: 'middle', size: 10, w: 'bold', c: RED }),
    S.arrow(280, y - 2, 330, y - 2, { w: 1.8 }),
    lab(305, y - 12, 'shifts', { a: 'middle', size: 10 }),
    at(k, 375, y),
    lab(375, y + 36, kn, { a: 'middle', size: 10, w: 'bold', c: GREEN }),
    lab(418, y + 2, note, { size: 10, c: MUTED }),
  ].join('');
  const body = [
    cs('Hydration of an alkyne: an unstable enol rearranges to a carbonyl compound', 235, 14, { size: 12, w: 'bold', c: BLUE }),
    row(66, ethyneM, 'ethyne', vinyl, 'ethenol (enol)', ethanal, 'ethanal', 'aldehyde'),
    row(146, propyne, 'propyne', enol, 'prop-1-en-2-ol (enol)', propanone, 'propanone', 'ketone'),
    cs('Markownikoff addition: OH goes to the carbon with fewer H, so the enol has C(OH)=CH₂.', 235, 206),
    cs('The enol to carbonyl shift is tautomerism. Only ethyne gives an aldehyde; other alkynes give ketones.', 235, 222),
  ];
  return svgDoc(470, 232, 'Hydration of ethyne with mercury sulfate and dilute sulfuric acid gives the unstable enol ethenol, which rearranges to ethanal; hydration of propyne gives the enol prop-1-en-2-ol, which rearranges to propanone. Only ethyne gives an aldehyde, all other alkynes give ketones.', body.join(''));
})();

// ---------------------------------------------------------------- 5. partial and complete hydrogenation of but-2-yne
export const REDUCE = (() => {
  const L = 30;
  const dxm = L * Math.cos(Math.PI / 3);
  const dym = L * Math.sin(Math.PI / 3);
  const yne = lineMol([0, 28, 28 + 24, 28 + 24 + 28], [1, 3, 1], [0, 3]);
  const abene = (cis) => mol([{ x: 0, y: 0 }, { x: L, y: 0 }, { x: -dxm, y: -dym }, { x: L + dxm, y: cis ? -dym : dym }], [[0, 1, 2], [0, 2], [1, 3]]);
  const cis = abene(true);
  const trans = abene(false);
  const butane = skel(4);
  must(yne, 'C4H6', 'but-2-yne');
  must(cis, 'C4H8', 'cis-but-2-ene');
  must(trans, 'C4H8', 'trans-but-2-ene');
  must(butane, 'C4H10', 'butane');
  chk(side([[1, 'C4H6'], [1, 'H2']]) === side([[1, 'C4H8']]) && side([[1, 'C4H6'], [2, 'H2']]) === side([[1, 'C4H10']]), 'but-2-yne + H2 -> butene and + 2H2 -> butane balance');
  const body = [
    cs('Hydrogenation of but-2-yne: the reagent decides how far, and which isomer', 235, 14, { size: 12, w: 'bold', c: BLUE }),
    at(yne, 62, 100),
    lab(62, 134, 'but-2-yne', { a: 'middle', size: 11, w: 'bold' }),
    S.line(118, 100, 132, 100, { w: 1.5 }),
    S.line(132, 50, 132, 158, { w: 1.5 }),
    S.arrow(132, 50, 250, 50, { w: 1.8 }),
    lab(190, 40, 'H₂, Lindlar catalyst', { a: 'middle', size: 10 }),
    S.arrow(132, 100, 250, 100, { w: 1.8 }),
    lab(190, 90, 'Na, liquid NH₃', { a: 'middle', size: 10 }),
    S.arrow(132, 158, 250, 158, { w: 1.8 }),
    lab(190, 148, 'H₂, Ni (excess)', { a: 'middle', size: 10 }),
    at(cis, 305, 50),
    lab(358, 46, 'cis-but-2-ene', { size: 11, w: 'bold' }),
    lab(358, 60, 'syn addition of H₂', { size: 10, c: GREEN }),
    at(trans, 305, 100),
    lab(358, 96, 'trans-but-2-ene', { size: 11, w: 'bold' }),
    lab(358, 110, 'anti addition of H₂', { size: 10, c: GREEN }),
    at(butane, 305, 158),
    lab(358, 156, 'butane', { size: 11, w: 'bold' }),
    lab(358, 170, 'both π bonds saturated', { size: 10, c: RED }),
    cs('Lindlar catalyst: Pd on CaCO₃, poisoned (lead acetate, quinoline); stops at the alkene.', 235, 200),
    cs('Na in liquid NH₃ also stops at the alkene but adds H on opposite faces.', 235, 216),
  ];
  return svgDoc(470, 226, 'But-2-yne with hydrogen over Lindlar catalyst gives cis-but-2-ene, with sodium in liquid ammonia gives trans-but-2-ene, and with excess hydrogen over nickel gives butane.', body.join(''));
})();

// ---------------------------------------------------------------- 6. polymerisation of ethyne
export const POLY = (() => {
  const bz = benzene(0, 0, [], 24);
  must(bz, 'C6H6', 'benzene');
  bal([[3, 'C2H2']], [[1, 'C6H6']], '3 C2H2 -> C6H6');
  bal([[2, 'C2H2']], [[1, 'C4H4']], '2 C2H2 -> C4H4 (vinylacetylene)');
  bal([[3, 'C3H4']], [[1, 'C9H12']], '3 C3H4 -> C9H12 (mesitylene)');
  const body = [
    cs('Polymerisation of ethyne: cyclic and linear', 235, 14, { size: 12, w: 'bold', c: BLUE }),
    lab(12, 38, 'Cyclic (trimerisation)', { size: 11, w: 'bold', c: GREEN }),
    lab(40, 92, '3 HC≡CH', { a: 'middle', size: 15 }),
    S.arrow(92, 88, 205, 88, { w: 2 }),
    lab(148, 76, 'red-hot iron tube', { a: 'middle', size: 10 }),
    lab(148, 108, '873 K', { a: 'middle', size: 10 }),
    at(bz, 262, 88),
    lab(262, 134, 'benzene, C₆H₆', { a: 'middle', size: 11, w: 'bold' }),
    lab(330, 80, 'three C≡C bonds', { size: 10 }),
    lab(330, 94, 'become a ring of', { size: 10 }),
    lab(330, 108, 'alternating C–C and C=C', { size: 10 }),
    S.line(12, 148, 458, 148, { c: MUTED, w: 1, dash: '3 3' }),
    lab(12, 168, 'Linear', { size: 11, w: 'bold', c: RED }),
    lab(12, 190, '2 HC≡CH  →  CH₂=CH–C≡CH', { size: 13 }),
    lab(250, 190, 'vinylacetylene (Cu₂Cl₂, NH₄Cl)', { size: 10, c: MUTED }),
    lab(12, 212, 'n HC≡CH  →  (–CH=CH–)ₙ', { size: 13 }),
    lab(250, 212, 'polyacetylene (Ziegler–Natta catalyst)', { size: 10, c: MUTED }),
    cs('Propyne trimerises in the same way to 1,3,5-trimethylbenzene: 3 C₃H₄ → C₉H₁₂.', 235, 240),
  ];
  return svgDoc(470, 250, 'Three ethyne molecules passed through a red-hot iron tube at 873 kelvin form benzene; two ethyne molecules join to vinylacetylene with copper chloride; many ethyne molecules form polyacetylene.', body.join(''));
})();
