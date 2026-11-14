// ch24 Aromatic Hydrocarbons: Benzene — SVGs. Molecules are drawn from an atoms-and-bonds model (molkit.mjs); every molecular formula is computed
// from the drawing, geometry and data are computed and checked, and reaction schemes are atom-counted from the formulae shown.
import { svgDoc, S } from './lib.mjs';
import { drawMol, formula, skel, mol, bounds, lab, ring, hexagon } from './molkit.mjs';

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
const cs = (t, x, y, o = {}) => lab(x, y, t, { a: 'middle', size: 10, ...o });
const atomsOf = (f) => {
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
  return stack[0];
};
const side = (list) => {
  const o = {};
  for (const [c, f] of list) for (const [e, n] of Object.entries(atomsOf(f))) o[e] = (o[e] || 0) + c * n;
  return JSON.stringify(Object.entries(o).sort());
};
const bal = (left, right, what) => chk(side(left) === side(right), `${what} balances`);
const grp = (label, cnt) => ({ group: true, label, cnt });
const P = (c) => `var(--diagram-${c})`;
void P;

// standard data
export const BENZENE = { CC: 139, CH: 109, CCsingle: 154, CCdouble: 134, ANGLE: 120 }; // pm, degrees
export const HYD = { cyclohexene: -120, benzene: -208 }; // enthalpies of hydrogenation to cyclohexane, kJ mol-1
export const NITR = { toluene: { o: 58, m: 4, p: 38 }, nitrobenzene: { o: 6, m: 93, p: 1 } }; // % isomers (approximate literature values)

// ---------------------------------------------------------------- 1. Kekule structures and the resonance hybrid
export const KEKULE = (() => {
  const k1 = ring(0, 0, 30, 6, [], { dbl: [0, 2, 4] });
  const k2 = ring(0, 0, 30, 6, [], { dbl: [1, 3, 5] });
  const hy = ring(0, 0, 30, 6, [], { dbl: [] });
  hy.A.forEach((a) => (a.H = 1));
  must(k1, 'C6H6', 'Kekulé structure I');
  must(k2, 'C6H6', 'Kekulé structure II');
  const a0 = k1.A[0];
  const a1 = k1.A[1];
  const a5 = k1.A[5];
  const ang = (Math.acos(((a1.x - a0.x) * (a5.x - a0.x) + (a1.y - a0.y) * (a5.y - a0.y)) / (Math.hypot(a1.x - a0.x, a1.y - a0.y) * Math.hypot(a5.x - a0.x, a5.y - a0.y))) * 180) / Math.PI;
  chk(Math.abs(ang - BENZENE.ANGLE) < 1e-6, `regular hexagon: C–C–C angle computed as ${ang.toFixed(1)} degrees (120)`);
  chk(BENZENE.CCdouble < BENZENE.CC && BENZENE.CC < BENZENE.CCsingle, 'bond lengths: C=C 134 pm < benzene C–C 139 pm < C–C 154 pm');
  const body = [cs('Benzene, C₆H₆: two Kekulé structures and the resonance hybrid', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  body.push(at(k1, 65, 78), at(k2, 195, 78));
  body.push(S.arrow(104, 78, 156, 78, { w: 1.4 }), S.arrow(156, 78, 104, 78, { w: 1.4 }));
  body.push(cs('Kekulé I', 65, 126, { w: 'bold' }), cs('Kekulé II', 195, 126, { w: 'bold' }));
  body.push(cs('two Kekulé structures differ only', 130, 142, { c: MUTED }), cs('in the positions of the double bonds', 130, 155, { c: MUTED }));
  body.push(S.arrow(235, 78, 290, 78, { w: 1.8 }));
  body.push(cs('resonance', 262, 66));
  body.push(at(hy, 360, 78), S.circle(360, 78, 18, { c: GREEN, sw: 2 }));
  body.push(cs('resonance hybrid', 360, 126, { w: 'bold', c: GREEN }), cs('six delocalised π electrons', 360, 140, { c: GREEN }));
  // bond length bars
  const px = 0.9;
  const y0 = 176;
  const rows = [['C–C single (e.g. ethane)', BENZENE.CCsingle, MUTED], ['C–C in benzene', BENZENE.CC, GREEN], ['C=C double (e.g. ethene)', BENZENE.CCdouble, BLUE]];
  rows.forEach(([name, L, c], i) => {
    const y = y0 + i * 20;
    body.push(lab(14, y + 4, name, { size: 10 }));
    body.push(S.rect(150, y - 6, L * px, 12, { c, fill: c, fop: 0.3, sw: 1.2 }));
    body.push(lab(150 + L * px + 6, y + 4, `${L} pm`, { size: 10, w: 'bold', c }));
  });
  body.push(cs('All six C–C bonds of benzene are equal (139 pm), between a single and a double bond.', 235, 250));
  body.push(cs('Neither Kekulé structure is real; the hybrid is more stable than either.', 235, 264));
  return svgDoc(470, 274, 'Two Kekule structures of benzene with the double bonds in different positions joined by a double-headed arrow, and the resonance hybrid drawn as a hexagon with a circle. A bar chart compares the benzene carbon-carbon bond length of 139 picometres with 154 for a single bond and 134 for a double bond.', body.join(''));
})();

// ---------------------------------------------------------------- 2. orbitals: the pi cloud above and below the ring
export const ORBITALS = (() => {
  const R = 72;
  const sq = 0.34; // vertical squash for the side view
  const cx = 150;
  const cy = 120;
  const ang = [0, 60, 120, 180, 240, 300];
  const vert = ang.map((a) => [cx + R * Math.cos((a * Math.PI) / 180), cy + R * sq * Math.sin((a * Math.PI) / 180)]);
  chk(vert.length === 6, 'six ring carbons, each with one unhybridised p orbital');
  const piElectrons = 6;
  chk(piElectrons === 4 * 1 + 2, 'six π electrons: Hückel number 4n + 2 with n = 1');
  const body = [cs('The π electrons of benzene form two ring-shaped clouds', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  const ringCloud = (y) => S.path(`M${cx - R} ${y} A${R} ${R * sq} 0 1 0 ${cx + R} ${y} A${R} ${R * sq} 0 1 0 ${cx - R} ${y}`, { c: GREEN, w: 14, op: 0.28 });
  body.push(ringCloud(cy - 38), ringCloud(cy + 38));
  vert.forEach(([x, y], i) => {
    body.push(S.line(x, y, vert[(i + 1) % 6][0], vert[(i + 1) % 6][1], { w: 1.8 }));
  });
  vert.forEach(([x, y]) => {
    body.push(S.ellipse(x, y - 28, 6, 22, { c: GREEN, fill: 'var(--diagram-green)', fop: 0.18, sw: 1 }));
    body.push(S.ellipse(x, y + 28, 6, 22, { c: GREEN, fill: 'var(--diagram-green)', fop: 0.18, sw: 1 }));
    body.push(S.circle(x, y, 2.6, { c: BLUE, fill: 'var(--diagram-blue)', sw: 0.8 }));
  });
  body.push(cs('π cloud above the ring plane', cx, 30, { c: GREEN }));
  body.push(cs('π cloud below the ring plane', cx, 206, { c: GREEN }));
  body.push(...[
    lab(280, 56, 'Each carbon is sp² hybridised:', { size: 11, w: 'bold' }),
    lab(280, 74, '• three σ bonds in one plane (120°)', { size: 10 }),
    lab(280, 90, '• one p orbital perpendicular to it', { size: 10 }),
    lab(280, 114, 'Six p orbitals overlap sideways all', { size: 10 }),
    lab(280, 128, 'round the ring: six π electrons are', { size: 10 }),
    lab(280, 142, 'delocalised over all six carbons.', { size: 10 }),
    lab(280, 166, 'σ bonds: 6 C–C + 6 C–H = 12', { size: 10, c: RED }),
    lab(280, 180, 'π electrons: 6 (4n + 2, n = 1)', { size: 10, c: RED }),
  ]);
  return svgDoc(470, 220, 'Side view of benzene: a hexagonal sigma framework in the plane of the ring with six perpendicular p orbitals whose sideways overlap forms two ring-shaped pi electron clouds, one above and one below the plane, holding six delocalised pi electrons.', body.join(''));
})();

// ---------------------------------------------------------------- 3. resonance energy from hydrogenation enthalpies
export const ENERGY = (() => {
  const triene = 3 * HYD.cyclohexene; // -360
  const RE = HYD.benzene - triene; // +152 (benzene is this much more stable)
  chk(triene === -360 && HYD.benzene === -208 && RE === 152, 'resonance energy = (−208) − (3 × −120) = +152 kJ/mol stabilisation');
  const k = 0.5;
  const yTop = 60;
  const yBz = yTop + RE * k;
  const yCh = yTop - triene * k;
  chk(Math.abs((yCh - yBz) - 208 * k) < 1e-9, 'diagram heights: benzene to cyclohexane drop is 208 kJ/mol in the scale used');
  const body = [cs('Hydrogenation enthalpies show the extra stability of benzene', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  body.push(S.line(30, yTop, 150, yTop, { w: 2.4, c: RED }));
  body.push(cs('cyclohexa-1,3,5-triene (hypothetical,', 150, yTop - 22), cs('three isolated C=C bonds)', 150, yTop - 10));
  body.push(S.line(190, yBz, 310, yBz, { w: 2.4, c: GREEN }));
  body.push(cs('benzene (real)', 250, yBz - 8, { w: 'bold' }));
  body.push(S.line(30, yCh, 450, yCh, { w: 2.4 }));
  body.push(cs('cyclohexane (reference level of the products)', 340, yCh + 16, { w: 'bold' }));
  body.push(S.arrow(70, yTop + 4, 70, yCh - 4, { w: 1.4, c: MUTED }));
  body.push(lab(78, yBz + 40, '−360 kJ mol⁻¹', { size: 11, w: 'bold', c: MUTED }), lab(78, yBz + 54, '3 × (−120), expected', { size: 10, c: MUTED }));
  body.push(S.arrow(250, yBz + 4, 250, yCh - 4, { w: 1.4, c: GREEN }));
  body.push(lab(258, yBz + 54, '−208 kJ mol⁻¹', { size: 11, w: 'bold', c: GREEN }), lab(258, yBz + 68, '(observed)', { size: 10, c: GREEN }));
  body.push(S.arrow(165, yTop + 4, 165, yBz - 4, { w: 1.8, c: RED }));
  body.push(S.arrow(165, yBz - 4, 165, yTop + 4, { w: 1.8, c: RED }));
  body.push(lab(174, (yTop + yBz) / 2 + 4, `${RE} kJ mol⁻¹`, { size: 11, w: 'bold', c: RED }));
  body.push(cs('resonance (delocalisation) energy about 150 kJ mol⁻¹', 235, yCh + 40, { c: RED, w: 'bold' }));
  body.push(cs('Benzene releases 152 kJ mol⁻¹ less heat than three separate C=C bonds would, so it is more stable.', 235, yCh + 56));
  return svgDoc(470, yCh + 66, 'Enthalpy level diagram: hypothetical cyclohexa-1,3,5-triene would release 360 kilojoules per mole on hydrogenation to cyclohexane, but benzene releases only 208, so benzene lies 152 kilojoules per mole lower in energy; this is the resonance energy.', body.join(''));
})();

// ---------------------------------------------------------------- 4. mechanism of nitration with the arenium ion
export const MECH = (() => {
  bal([[1, 'HNO3'], [2, 'H2SO4']], [[1, 'NO2'], [1, 'H3O'], [2, 'HSO4']], 'HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-');
  bal([[1, 'C6H6'], [1, 'NO2']], [[1, 'C6H6NO2']], 'benzene + NO2+ -> arenium ion C6H6NO2+');
  bal([[1, 'C6H6NO2']], [[1, 'C6H5NO2'], [1, 'H']], 'arenium ion -> nitrobenzene + H+');
  const rad = 24;
  const benz = ring(0, 0, rad, 6, [], { dbl: [0, 2, 4] });
  must(benz, 'C6H6', 'benzene');
  const nb = ring(0, 0, rad, 6, [[0, grp('NO₂', { N: 1, O: 2 })]], { dbl: [0, 2, 4] });
  must(nb, 'C6H5NO2', 'nitrobenzene');
  const sp3 = (cx, cy, r) => lab(cx - 17, cy - r - 14, 'H', { a: 'middle', size: 11 }) + lab(cx + 19, cy - r - 14, 'NO₂', { a: 'middle', size: 11 }) + S.line(cx, cy - r, cx - 12, cy - r - 11, { w: 1.2 }) + S.line(cx, cy - r, cx + 12, cy - r - 11, { w: 1.2 });
  const arenium = (cx, cy) => {
    const v = hexagon(cx, cy, rad);
    const out = [];
    v.forEach((p, i) => out.push(S.line(p.x, p.y, v[(i + 1) % 6].x, v[(i + 1) % 6].y, { w: 1.6 })));
    const r2 = rad * 0.62;
    const a1 = ((-90 + 60) * Math.PI) / 180;
    const a5 = ((-90 + 300) * Math.PI) / 180;
    out.push(S.path(`M${cx + r2 * Math.cos(a1)} ${cy + r2 * Math.sin(a1)} A${r2} ${r2} 0 1 1 ${cx + r2 * Math.cos(a5)} ${cy + r2 * Math.sin(a5)}`, { c: RED, w: 1.4, dash: '3 2' }));
    out.push(lab(cx, cy + 5, '+', { a: 'middle', size: 14, c: RED, w: 'bold' }));
    return out.join('') + sp3(cx, cy, rad);
  };
  // resonance forms: + on vertex k (1, 3, 5 = ortho, para, ortho to the sp3 carbon 0); the two C=C bonds sit on the other four sp2 carbons
  const forms = [
    { k: 1, dbl: [[2, 3], [4, 5]] },
    { k: 3, dbl: [[1, 2], [4, 5]] },
    { k: 5, dbl: [[1, 2], [3, 4]] },
  ];
  chk(forms.map((f) => f.k).join() === '1,3,5', 'the + of the arenium ion lies on the carbons ortho (C-2, C-6) and para (C-4) to the sp3 carbon');
  chk(forms.every((f) => new Set([f.k, ...f.dbl.flat()]).size === 5), 'each resonance form has one + carbon and two C=C bonds on the other four sp2 carbons');
  const body = [cs('Nitration of benzene: electrophilic substitution through an arenium ion', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  body.push(lab(12, 36, 'Step 0  The electrophile is made:', { size: 11, w: 'bold', c: GREEN }));
  body.push(lab(12, 56, 'HNO₃  +  2H₂SO₄  →  NO₂⁺  +  H₃O⁺  +  2HSO₄⁻', { size: 13 }));
  body.push(lab(12, 84, 'Step 1 (slow)  π electrons attack NO₂⁺; aromaticity is lost', { size: 11, w: 'bold', c: GREEN }));
  body.push(drawMol(benz, { ox: 54, oy: 136 }));
  body.push(lab(98, 142, '+  NO₂⁺', { size: 13 }));
  body.push(S.path('M62 114 Q100 90 148 118', { c: RED, w: 1.5 }) + S.head(148, 118, Math.atan2(118 - 90, 148 - 100), { size: 7, c: RED }));
  body.push(S.arrow(176, 136, 232, 136, { w: 1.8 }));
  body.push(arenium(290, 140));
  body.push(cs('arenium ion (σ complex)', 290, 182, { w: 'bold', c: RED }));
  body.push(lab(340, 128, 'sp³ carbon bears', { size: 10 }), lab(340, 142, 'H and NO₂; the +', { size: 10 }), lab(340, 156, 'is spread over', { size: 10 }), lab(340, 170, 'five carbons', { size: 10 }));
  body.push(lab(12, 208, 'Resonance forms of the arenium ion (the + sits on C-2, C-4 or C-6):', { size: 10, w: 'bold' }));
  forms.forEach(({ k, dbl }, i) => {
    const cx = 60 + i * 80;
    const cy = 262;
    const r = 18;
    const v = hexagon(cx, cy, r);
    v.forEach((p, j) => body.push(S.line(p.x, p.y, v[(j + 1) % 6].x, v[(j + 1) % 6].y, { w: 1.5 })));
    dbl.forEach(([a, b]) => {
      const f = 0.78;
      const q = (p) => [cx + (p.x - cx) * f, cy + (p.y - cy) * f];
      const [x1, y1] = q(v[a]);
      const [x2, y2] = q(v[b]);
      body.push(S.line(x1, y1, x2, y2, { w: 1.3 }));
    });
    body.push(sp3(cx, cy, r));
    const dx = k === 3 ? 0 : k === 1 ? 14 : -14;
    const dy = k === 3 ? 16 : 0;
    body.push(lab(v[k].x + dx, v[k].y + dy + 4, '+', { a: 'middle', size: 13, c: RED, w: 'bold' }));
  });
  body.push(lab(290, 244, 'The positive charge is delocalised', { size: 10 }), lab(290, 258, 'over three carbons, which makes', { size: 10 }), lab(290, 272, 'the ion a reasonable intermediate.', { size: 10 }));
  body.push(lab(12, 318, 'Step 2 (fast)  loss of H⁺ from the sp³ carbon restores the aromatic ring', { size: 11, w: 'bold', c: GREEN }));
  body.push(drawMol(nb, { ox: 70, oy: 380 }));
  body.push(lab(124, 386, '+  H⁺', { size: 13 }));
  body.push(cs('nitrobenzene', 70, 424, { w: 'bold' }));
  body.push(lab(200, 372, 'The H⁺ joins HSO₄⁻ to regenerate H₂SO₄,', { size: 10 }), lab(200, 386, 'so sulphuric acid is a catalyst overall.', { size: 10 }));
  return svgDoc(470, 436, 'Mechanism of nitration of benzene: concentrated nitric and sulfuric acids make the nitronium ion NO2+; in the slow step the pi electrons of benzene attack NO2+ to give the arenium ion, a carbocation with the positive charge spread over carbons 2, 4 and 6; in the fast step loss of a proton restores the ring and gives nitrobenzene.', body.join(''));
})();

// ---------------------------------------------------------------- 5. the five electrophilic substitutions at a glance
export const HUB = (() => {
  const rad = 18;
  const o = { dbl: [0, 2, 4], start: 0 };
  const chloro = ring(0, 0, rad, 6, [[0, 'Cl']], o);
  const nitro = ring(0, 0, rad, 6, [[0, grp('NO₂', { N: 1, O: 2 })]], o);
  const sulph = ring(0, 0, rad, 6, [[0, grp('SO₃H', { S: 1, O: 3, H: 1 })]], o);
  const tol = ring(0, 0, rad, 6, [[0, { el: 'C', show: true }]], o);
  const acet = ring(0, 0, rad, 6, [[0, grp('COCH₃', { C: 2, H: 3, O: 1 })]], o);
  const benz = ring(0, 0, 22, 6, [], { dbl: [0, 2, 4] });
  must(chloro, 'C6H5Cl', 'chlorobenzene');
  must(nitro, 'C6H5NO2', 'nitrobenzene');
  must(sulph, 'C6H6O3S', 'benzenesulphonic acid');
  must(tol, 'C7H8', 'methylbenzene');
  must(acet, 'C8H8O', 'phenylethanone (acetophenone)');
  bal([[1, 'C6H6'], [1, 'CH3Cl']], [[1, 'C7H8'], [1, 'HCl']], 'benzene + CH3Cl -> C7H8 + HCl');
  bal([[1, 'C6H6'], [1, 'CH3COCl']], [[1, 'C8H8O'], [1, 'HCl']], 'benzene + CH3COCl -> C8H8O + HCl');
  bal([[1, 'C6H6'], [1, 'Cl2']], [[1, 'C6H5Cl'], [1, 'HCl']], 'benzene + Cl2 -> C6H5Cl + HCl');
  bal([[1, 'C6H6'], [1, 'HNO3']], [[1, 'C6H5NO2'], [1, 'H2O']], 'benzene + HNO3 -> C6H5NO2 + H2O');
  bal([[1, 'C6H6'], [1, 'H2SO4']], [[1, 'C6H6O3S'], [1, 'H2O']], 'benzene + H2SO4 -> C6H5SO3H + H2O');
  const items = [
    [chloro, 'chlorobenzene', 'halogenation', 'Cl₂, FeCl₃ (in the dark)'],
    [nitro, 'nitrobenzene', 'nitration', 'conc. HNO₃, conc. H₂SO₄, 330 K'],
    [sulph, 'benzenesulphonic acid', 'sulphonation', 'conc. H₂SO₄ or oleum'],
    [tol, 'methylbenzene', 'Friedel–Crafts alkylation', 'CH₃Cl, anhydrous AlCl₃'],
    [acet, 'phenylethanone', 'Friedel–Crafts acylation', 'CH₃COCl, anhydrous AlCl₃'],
  ];
  const body = [cs('Benzene: five electrophilic substitutions (each replaces one H)', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  const by = 177;
  body.push(drawMol(benz, { ox: 50, oy: by }), cs('benzene', 50, by + 44, { w: 'bold' }));
  items.forEach(([m, name, kind, reag], i) => {
    const y = 56 + i * 62;
    body.push(drawMol(m, { ox: 215, oy: y }));
    body.push(S.arrow(88, by + (y - by) * 0.18, 180, y, { w: 1.4 }));
    body.push(lab(292, y - 6, name, { size: 11, w: 'bold' }));
    body.push(lab(292, y + 8, kind, { size: 10, c: GREEN }));
    body.push(lab(292, y + 21, reag, { size: 10, c: MUTED }));
  });
  return svgDoc(470, 340, 'Benzene on the left with five arrows to its substitution products: chlorobenzene by halogenation with chlorine and iron(III) chloride, nitrobenzene by nitration with concentrated nitric and sulfuric acids, benzenesulfonic acid by sulfonation, methylbenzene by Friedel-Crafts alkylation with chloromethane and aluminium chloride, and phenylethanone by Friedel-Crafts acylation with ethanoyl chloride and aluminium chloride.', body.join(''));
})();

// ---------------------------------------------------------------- 6. directing effects: product distributions
export const DIRECT = (() => {
  const sum = (o) => o.o + o.m + o.p;
  chk(sum(NITR.toluene) === 100 && sum(NITR.nitrobenzene) === 100, 'nitration isomer percentages each add up to 100');
  chk(NITR.toluene.m < 10 && NITR.nitrobenzene.m > 90, 'toluene: mainly ortho + para; nitrobenzene: mainly meta');
  const stat = { o: 40, m: 40, p: 20 }; // purely statistical (2 : 2 : 1)
  chk(stat.o + stat.m + stat.p === 100, 'statistical distribution 2 : 2 : 1 = 40 : 40 : 20');
  const body = [cs('Where does the second group go? Nitration of C₆H₅–Y', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  const panels = [
    ['Y = CH₃ (toluene): o, p directing', NITR.toluene, 12, GREEN],
    ['Y = NO₂ (nitrobenzene): m directing', NITR.nitrobenzene, 246, RED],
  ];
  const base = 190;
  const k = 1.15;
  panels.forEach(([title, d, x0, c]) => {
    body.push(lab(x0 + 105, 40, title, { a: 'middle', size: 11, w: 'bold', c }));
    body.push(S.line(x0, base, x0 + 212, base, { w: 1.3 }));
    ['o', 'm', 'p'].forEach((key, i) => {
      const x = x0 + 18 + i * 66;
      const h = d[key] * k;
      body.push(S.rect(x, base - h, 44, h, { c, fill: c, fop: 0.28, sw: 1.4 }));
      body.push(cs(`${d[key]} %`, x + 22, base - h - 5, { w: 'bold' }));
      body.push(cs(['ortho', 'meta', 'para'][i], x + 22, base + 14));
      // statistical marker
      const sy = base - stat[key] * k;
      body.push(S.line(x - 4, sy, x + 48, sy, { c: MUTED, w: 1.2, dash: '3 3' }));
    });
  });
  body.push(cs('Dashed lines: purely statistical distribution (40 : 40 : 20) if the group had no directing effect.', 235, 222, { c: MUTED }));
  body.push(cs('CH₃ donates electrons (+I, hyperconjugation): the arenium ion for o or p attack puts + next to C–CH₃.', 235, 240));
  body.push(cs('NO₂ withdraws electrons (−I, −M): o or p attack puts + next to the N⁺ of NO₂, so meta attack is less bad.', 235, 254));
  return svgDoc(470, 264, 'Two bar charts of the approximate isomer distribution on nitration: toluene gives 58 percent ortho, 4 percent meta and 38 percent para; nitrobenzene gives 6 percent ortho, 93 percent meta and 1 percent para. Dashed lines mark the statistical 40, 40, 20 split.', body.join(''));
})();

// ---------------------------------------------------------------- 7. addition and other reactions of benzene
export const ADDITION = (() => {
  const rad = 18;
  const benz = ring(0, 0, 22, 6, [], { dbl: [0, 2, 4] });
  const chx = ring(0, 0, rad, 6, [], { dbl: [] });
  const bhc = ring(0, 0, rad, 6, [0, 1, 2, 3, 4, 5].map((k) => [k, 'Cl']), { dbl: [] });
  // glyoxal, O=CH–CH=O, drawn s-trans
  const gly = mol([{ x: 0, y: 0 }, { x: 26, y: 0 }, { x: -13, y: -22.5, el: 'O' }, { x: 39, y: 22.5, el: 'O' }], [[0, 1, 1], [0, 2, 2], [1, 3, 2]]);
  // biphenyl: two hexagons joined by a C–C single bond
  const Rr = 16;
  const hx = (cx, cy) => Array.from({ length: 6 }, (_, k) => ({ x: cx + Rr * Math.cos((60 * k * Math.PI) / 180), y: cy + Rr * Math.sin((60 * k * Math.PI) / 180) }));
  const atoms = [...hx(0, 0), ...hx(2 * Rr + 22, 0)];
  const bonds = [];
  for (let k = 0; k < 6; k++) {
    bonds.push([k, (k + 1) % 6, k % 2 === 1 ? 2 : 1]);
    bonds.push([6 + k, 6 + ((k + 1) % 6), k % 2 === 1 ? 2 : 1]);
  }
  bonds.push([0, 9, 1]);
  const bph = mol(atoms, bonds);
  must(benz, 'C6H6', 'benzene');
  must(chx, 'C6H12', 'cyclohexane');
  must(bhc, 'C6H6Cl6', 'hexachlorocyclohexane (BHC)');
  must(gly, 'C2H2O2', 'glyoxal');
  must(bph, 'C12H10', 'biphenyl');
  bal([[1, 'C6H6'], [3, 'H2']], [[1, 'C6H12']], 'C6H6 + 3H2 -> C6H12');
  bal([[1, 'C6H6'], [3, 'Cl2']], [[1, 'C6H6Cl6']], 'C6H6 + 3Cl2 -> C6H6Cl6');
  bal([[2, 'C6H6']], [[1, 'C12H10'], [1, 'H2']], '2 C6H6 -> C12H10 + H2');
  bal([[1, 'C6H6O9'], [3, 'Zn'], [3, 'H2O']], [[3, 'C2H2O2'], [3, 'Zn(OH)2']], 'triozonide + 3Zn + 3H2O -> 3 glyoxal + 3Zn(OH)2');
  bal([[1, 'C6H6'], [3, 'O3']], [[1, 'C6H6O9']], 'C6H6 + 3O3 -> triozonide C6H6O9');
  const body = [cs('Addition and other reactions of benzene (needing forcing conditions)', 235, 14, { size: 12, w: 'bold', c: BLUE })];
  body.push(at(benz, 48, 190), cs('benzene', 48, 228, { w: 'bold' }));
  const rows = [
    [chx, 'cyclohexane', 'H₂, Ni, 473 K', 'addition of three H₂', 58, 0],
    [bhc, 'hexachlorocyclohexane', 'Cl₂, UV light, no catalyst', 'BHC: addition of three Cl₂', 150, 0],
    [gly, 'glyoxal (3 molecules)', 'O₃, then Zn and H₂O', 'ozonolysis', 252, 0],
    [bph, 'biphenyl', 'red-hot tube (pyrolysis)', '2 C₆H₆ → C₁₂H₁₀ + H₂', 330, 0],
  ];
  rows.forEach(([m, name, reag, note, y]) => {
    body.push(S.arrow(84, 190 + (y - 190) * 0.15, 150, y, { w: 1.4 }));
    body.push(at(m, 215, y));
    body.push(lab(285, y - 8, name, { size: 11, w: 'bold' }));
    body.push(lab(285, y + 6, reag, { size: 10, c: MUTED }));
    body.push(lab(285, y + 20, note, { size: 10, c: GREEN }));
  });
  return svgDoc(470, 366, 'Benzene reacts with hydrogen and nickel at 473 kelvin to give cyclohexane, with chlorine in ultraviolet light to give hexachlorocyclohexane, with ozone and then zinc and water to give three molecules of glyoxal, and on pyrolysis in a red-hot tube to give biphenyl and hydrogen.', body.join(''));
})();
