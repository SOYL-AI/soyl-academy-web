// ch22 Alkenes — SVGs. Molecules are drawn from an atoms-and-bonds model (molkit.mjs); every molecular formula is computed from the
// drawing, bond-angle geometry is computed and checked, and reaction schemes are atom-counted from the drawn structures.
import { svgDoc, S } from './lib.mjs';
import { drawMol, formula, skel, mol, bounds, lab } from './molkit.mjs';

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
const atoms = (f) => {
  const o = {};
  for (const [, el, n] of f.matchAll(/([A-Z][a-z]?)(\d*)/g)) o[el] = (o[el] || 0) + (n ? Number(n) : 1);
  return o;
};
const total = (fs) => {
  const o = {};
  for (const f of fs) for (const [el, n] of Object.entries(atoms(f))) o[el] = (o[el] || 0) + n;
  return JSON.stringify(Object.entries(o).sort());
};
const curve = (x1, y1, cx, cy, x2, y2, c = RED) => S.path(`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, { c, w: 1.5 }) + S.head(x2, y2, Math.atan2(y2 - cy, x2 - cx), { size: 7, c });

// bond data for ethene (standard values)
export const ETHENE = { CC: 134, CH: 108, HCH: 117, HCC: 121.5 }; // pm, degrees

// ---------------------------------------------------------------- 1. sigma and pi bonds in ethene
export const SIGMAPI = (() => {
  chk(Math.abs(ETHENE.HCH + 2 * ETHENE.HCC - 360) < 1e-9, 'ethene: H–C–H 117° + 2 × H–C=C 121.5° = 360° (planar sp2 carbon)');
  const rad = (d) => (d * Math.PI) / 180;
  const body = [lab(235, 14, 'Ethene, C₂H₄: a planar molecule with one σ and one π bond between the carbons', { a: 'middle', size: 12, w: 'bold', c: BLUE })];
  // left panel: top view (plane of the page)
  const cx1 = 70;
  const cx2 = 150;
  const cy = 110;
  body.push(S.line(cx1, cy - 2.5, cx2, cy - 2.5, { w: 1.8 }), S.line(cx1, cy + 2.5, cx2, cy + 2.5, { w: 1.8 }));
  const L = 40;
  const hPos = (cx, left) => [1, -1].map((s) => {
    const a = rad(121.5) * s;
    const ux = left ? Math.cos(a) : -Math.cos(a);
    return [cx + L * ux, cy - L * Math.sin(a)];
  });
  for (const [cx, left] of [[cx1, true], [cx2, false]]) {
    for (const [hx, hy] of hPos(cx, left)) {
      body.push(S.line(cx, cy, hx, hy, { w: 1.6 }));
      body.push(lab(hx + (left ? -9 : 9), hy + 4, 'H', { a: 'middle', size: 11 }));
    }
    body.push(lab(cx, cy + 17, 'C', { a: 'middle', size: 11, c: BLUE }));
  }
  body.push(lab(110, cy + 34, 'C=C 134 pm', { a: 'middle', size: 10, c: RED }));
  body.push(lab(14, 62, 'C–H 108 pm', { size: 10 }));
  body.push(lab(14, 160, 'H–C–H 117°', { size: 10 }));
  body.push(lab(150, 160, 'H–C=C 121.5°', { size: 10 }));
  body.push(lab(110, 38, 'view from above: all six atoms lie in one plane', { a: 'middle', size: 10 }));
  // right panel: side view with the pi cloud
  const px1 = 320;
  const px2 = 395;
  const py = 112;
  body.push(S.line(px1, py, px2, py, { w: 2.2 }));
  body.push(S.ellipse((px1 + px2) / 2, py - 30, 46, 17, { c: GREEN, fill: 'var(--diagram-green)', fop: 0.22, sw: 1.4 }));
  body.push(S.ellipse((px1 + px2) / 2, py + 30, 46, 17, { c: GREEN, fill: 'var(--diagram-green)', fop: 0.22, sw: 1.4 }));
  body.push(S.circle(px1, py, 4, { c: BLUE, fill: 'var(--diagram-blue)', sw: 1 }), S.circle(px2, py, 4, { c: BLUE, fill: 'var(--diagram-blue)', sw: 1 }));
  body.push(lab((px1 + px2) / 2, py - 54, 'π cloud above the plane', { a: 'middle', size: 10, c: GREEN }));
  body.push(lab((px1 + px2) / 2, py + 66, 'π cloud below the plane', { a: 'middle', size: 10, c: GREEN }));
  body.push(lab((px1 + px2) / 2, py - 5, 'σ', { a: 'middle', size: 11, w: 'bold' }));
  body.push(lab(357, 40, 'side view', { a: 'middle', size: 10 }));
  body.push(lab(235, 214, 'σ bond: head-on overlap of sp² orbitals. π bond: sideways overlap of unhybridised p orbitals.', { a: 'middle', size: 10 }));
  body.push(lab(235, 230, 'The π bond is weaker and exposed, so alkenes are reactive; it also stops rotation about C=C.', { a: 'middle', size: 10 }));
  return svgDoc(470, 240, 'Ethene: top view showing the planar sigma framework with H-C-H angle 117 degrees, H-C=C angle 121.5 degrees, C=C 134 picometres and C-H 108 picometres, and side view showing the pi electron cloud above and below the plane of the molecule.', body.join(''));
})();

// ---------------------------------------------------------------- 2. the four alkenes C4H8
const BPC4 = { but1: -6.3, cis: 3.7, trans: 0.9, iso: -6.9 }; // boiling points, degrees C (standard)
export const ISOMERS = (() => {
  const L = 30;
  const dxm = L * Math.cos(Math.PI / 3);
  const dym = L * Math.sin(Math.PI / 3);
  const abene = (cis) => mol([{ x: 0, y: 0 }, { x: L, y: 0 }, { x: -dxm, y: -dym }, { x: L + dxm, y: cis ? -dym : dym }], [[0, 1, 2], [0, 2], [1, 3]]);
  const but1 = skel(4, [], { orders: { 0: 2 } });
  const cis = abene(true);
  const trans = abene(false);
  const iso = mol([{ x: 0, y: 0 }, { x: L, y: 0 }, { x: -dxm, y: -dym }, { x: -dxm, y: dym }], [[0, 1, 2], [0, 2], [0, 3]]);
  const items = [
    [but1, 'but-1-ene', BPC4.but1, ['no cis–trans', 'two H on C-1']],
    [cis, 'cis-but-2-ene', BPC4.cis, ['CH₃ groups', 'on the same side']],
    [trans, 'trans-but-2-ene', BPC4.trans, ['CH₃ groups', 'on opposite sides']],
    [iso, '2-methylpropene', BPC4.iso, ['no cis–trans', 'two CH₃ on C-2']],
  ];
  items.forEach(([m, name]) => must(m, 'C4H8', name));
  chk(BPC4.cis > BPC4.trans, 'cis-but-2-ene boils higher than trans-but-2-ene (3.7 and 0.9 degrees C)');
  const body = [lab(235, 14, 'The four alkenes of formula C₄H₈', { a: 'middle', size: 12, w: 'bold', c: BLUE })];
  items.forEach(([m, name, bp, note], i) => {
    const x = 60 + i * 117;
    body.push(at(m, x, 66));
    body.push(lab(x, 118, name, { a: 'middle', size: 10, w: 'bold' }));
    body.push(lab(x, 132, `bp ${bp.toFixed(1).replace('-', '−')} °C`, { a: 'middle', size: 10, c: RED }));
    body.push(lab(x, 146, note[0], { a: 'middle', size: 10 }), lab(x, 159, note[1], { a: 'middle', size: 10 }));
  });
  body.push(lab(235, 182, 'Three structural isomers; but-2-ene also has cis and trans forms, so four stereoisomers in all.', { a: 'middle', size: 10 }));
  return svgDoc(470, 196, 'The four alkenes with formula C4H8: but-1-ene, cis-but-2-ene, trans-but-2-ene and 2-methylpropene, with their boiling points. Only but-2-ene shows cis-trans isomerism.', body.join(''));
})();

// ---------------------------------------------------------------- 3. Saytzeff rule: 2-bromobutane with alcoholic KOH
export const SAYTZEFF = (() => {
  const rea = skel(4, [[1, 'Br']]);
  const major = skel(4, [], { orders: { 1: 2 } });
  const minor = skel(4, [], { orders: { 0: 2 } });
  must(rea, 'C4H9Br', '2-bromobutane');
  must(major, 'C4H8', 'but-2-ene');
  must(minor, 'C4H8', 'but-1-ene');
  chk(total(['C4H9Br']) === total(['C4H8', 'HBr']), 'dehydrohalogenation: C4H9Br -> C4H8 + HBr balances');
  const body = [
    lab(235, 14, "Saytzeff's rule: the more substituted alkene predominates", { a: 'middle', size: 12, w: 'bold', c: BLUE }),
    at(rea, 62, 80),
    lab(62, 128, '2-bromobutane', { a: 'middle', size: 11, w: 'bold' }),
    S.arrow(110, 56, 220, 40, { w: 2.2 }),
    S.arrow(110, 100, 220, 124, { w: 1.2 }),
    lab(160, 34, 'alcoholic KOH, heat', { a: 'middle', size: 10 }),
    lab(160, 146, '– HBr', { a: 'middle', size: 10 }),
    at(major, 300, 42),
    lab(366, 38, 'but-2-ene', { size: 11, w: 'bold' }),
    lab(366, 52, 'major, about 80%', { size: 10, c: GREEN }),
    lab(366, 66, '2 alkyl groups', { size: 10 }),
    at(minor, 300, 124),
    lab(366, 120, 'but-1-ene', { size: 11, w: 'bold' }),
    lab(366, 134, 'minor, about 20%', { size: 10, c: RED }),
    lab(366, 148, '1 alkyl group', { size: 10 }),
    lab(235, 176, 'H is lost from the β-carbon with fewer hydrogens (C-3 rather than C-1), giving the more stable alkene.', { a: 'middle', size: 10 }),
    lab(235, 192, 'Stability of alkenes: R₂C=CR₂ > R₂C=CHR > RCH=CHR > RCH=CH₂ > CH₂=CH₂', { a: 'middle', size: 10 }),
    lab(235, 206, '(the more alkyl groups on the C=C, the more stable the alkene).', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 214, "Dehydrohalogenation of 2-bromobutane with alcoholic potassium hydroxide gives mainly but-2-ene, about 80 percent, and a little but-1-ene, about 20 percent, as predicted by Saytzeff's rule.", body.join(''));
})();

// ---------------------------------------------------------------- 4. mechanism of electrophilic addition of HBr to propene
export const MECH = (() => {
  const propene = skel(3, [], { orders: { 1: 2 } });
  const cation = skel(3);
  const product = skel(3, [[1, 'Br']]);
  must(propene, 'C3H6', 'propene');
  must(product, 'C3H7Br', '2-bromopropane');
  chk(total(['C3H6', 'HBr']) === total(['C3H7Br']), 'overall: C3H6 + HBr -> C3H7Br balances');
  const body = [
    lab(235, 14, 'Electrophilic addition of HBr to propene (no peroxide)', { a: 'middle', size: 12, w: 'bold', c: BLUE }),
    lab(10, 38, 'Step 1 (slow): the π electrons attack H⁺ of H–Br, giving a carbocation', { size: 11, w: 'bold', c: GREEN }),
    at(propene, 66, 92),
    lab(122, 98, '+', { a: 'middle', size: 14 }),
    lab(172, 98, 'H', { a: 'middle', size: 14 }),
    lab(183, 98, '–', { a: 'middle', size: 14 }),
    lab(200, 98, 'Br', { a: 'middle', size: 14 }),
    curve(80, 84, 125, 40, 168, 88),
    curve(183, 90, 198, 58, 204, 84),
    S.arrow(236, 94, 290, 94, { w: 1.8 }),
    at(cation, 345, 96),
    lab(345, 80, '+', { a: 'middle', size: 15, c: RED, w: 'bold' }),
    lab(417, 98, '+  Br⁻', { a: 'middle', size: 14 }),
    lab(345, 132, 'secondary carbocation', { a: 'middle', size: 10, c: RED }),
    lab(10, 156, 'Step 2 (fast): the bromide ion attacks the positive carbon', { size: 11, w: 'bold', c: GREEN }),
    at(cation, 66, 206),
    lab(66, 190, '+', { a: 'middle', size: 15, c: RED, w: 'bold' }),
    lab(150, 212, 'Br⁻', { a: 'middle', size: 14 }),
    curve(138, 204, 112, 178, 76, 192),
    S.arrow(190, 206, 250, 206, { w: 1.8 }),
    at(product, 320, 206),
    lab(320, 244, '2-bromopropane (major product)', { a: 'middle', size: 11, w: 'bold' }),
    lab(235, 266, 'H⁺ adds to C-1, which already has more hydrogens, so the positive charge', { a: 'middle', size: 10 }),
    lab(235, 280, 'sits on C-2 (a secondary carbocation, more stable than a primary one).', { a: 'middle', size: 10 }),
    lab(235, 296, "Markownikoff's rule: the negative part of HX goes to the carbon with fewer hydrogens.", { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 306, 'Mechanism of electrophilic addition of hydrogen bromide to propene: in step 1 the pi electrons of C=C attack the hydrogen of H-Br, giving a secondary carbocation and a bromide ion; in step 2 the bromide ion attacks the carbocation to give 2-bromopropane.', body.join(''));
})();

// ---------------------------------------------------------------- 5. peroxide effect (free-radical addition of HBr)
const HX = { HCl: 431, HBr: 366, HI: 299 }; // bond enthalpies, kJ mol-1 (standard)
export const PEROX = (() => {
  chk(HX.HI < HX.HBr && HX.HBr < HX.HCl, 'H–X bond enthalpies: HI 299 < HBr 366 < HCl 431 kJ/mol');
  chk(total(['C3H6', 'HBr']) === total(['C3H7Br']), 'anti-Markownikoff product 1-bromopropane: C3H6 + HBr -> C3H7Br balances');
  const body = [
    lab(235, 14, 'Peroxide effect: free-radical addition of HBr to propene', { a: 'middle', size: 12, w: 'bold', c: BLUE }),
    lab(12, 36, '1  Initiation', { size: 12, w: 'bold', c: BLUE }),
    lab(130, 36, '(a peroxide ROOR splits into radicals)', { size: 10 }),
    lab(12, 58, 'RO–OR  →  2RO•', { size: 13 }),
    lab(200, 58, 'RO•  +  H–Br  →  ROH  +  Br•', { size: 13 }),
    S.line(12, 70, 458, 70, { c: MUTED, w: 1, dash: '3 3' }),
    lab(12, 90, '2  Propagation', { size: 12, w: 'bold', c: GREEN }),
    lab(130, 90, '(Br• adds first, to the carbon with more hydrogens)', { size: 10 }),
    lab(12, 114, 'CH₃CH=CH₂  +  Br•  →  CH₃–C•H–CH₂Br', { size: 13 }),
    lab(12, 130, 'secondary radical (more stable than the primary radical CH₃CH(Br)–C•H₂)', { size: 10, c: MUTED }),
    lab(12, 154, 'CH₃–C•H–CH₂Br  +  H–Br  →  CH₃CH₂CH₂Br  +  Br•', { size: 13 }),
    lab(12, 170, '1-bromopropane: anti-Markownikoff product; Br• is regenerated', { size: 10, c: MUTED }),
    S.line(12, 182, 458, 182, { c: MUTED, w: 1, dash: '3 3' }),
    lab(12, 202, '3  Termination', { size: 12, w: 'bold', c: RED }),
    lab(130, 202, '(two radicals combine, e.g. Br• + Br• → Br₂)', { size: 10 }),
    lab(12, 226, 'Why only HBr?  H–Cl 431 kJ mol⁻¹ is too strong for the radical to remove H easily;', { size: 10 }),
    lab(12, 240, 'H–I 299 kJ mol⁻¹: I• is too unreactive to add to C=C. H–Br (366 kJ mol⁻¹) suits both steps.', { size: 10 }),
  ];
  return svgDoc(470, 250, 'Free-radical mechanism of the peroxide effect: a peroxide generates bromine radicals from HBr; the bromine radical adds to the terminal carbon of propene to give a secondary radical, which takes a hydrogen from HBr to give 1-bromopropane and regenerate the bromine radical.', body.join(''));
})();

// ---------------------------------------------------------------- 6. ozonolysis: product prediction
export const OZONO = (() => {
  const alk = skel(4, [[1, 'C']], { orders: { 1: 2 } });
  const ketone = skel(3, [[1, 'O', 'p', 2]]);
  const ald = skel(2, [[1, 'O', 'p', 2]]);
  must(alk, 'C5H10', '2-methylbut-2-ene');
  must(ketone, 'C3H6O', 'propanone');
  must(ald, 'C2H4O', 'ethanal');
  chk(total(['C5H10', 'O2']) === total(['C3H6O', 'C2H4O']), 'ozonolysis: alkene C5H10 plus two O atoms gives C3H6O + C2H4O (carbon and hydrogen conserved)');
  const body = [
    lab(235, 14, 'Ozonolysis: the C=C bond is cut and each carbon becomes C=O', { a: 'middle', size: 12, w: 'bold', c: BLUE }),
    at(alk, 70, 86),
    S.line(76, 52, 76, 112, { c: RED, w: 1.4, dash: '4 3' }),
    lab(70, 132, '2-methylbut-2-ene', { a: 'middle', size: 11, w: 'bold' }),
    S.arrow(130, 84, 210, 84, { w: 2 }),
    lab(170, 66, '(i) O₃', { a: 'middle', size: 10 }),
    lab(170, 78, '(ii) Zn, H₂O', { a: 'middle', size: 10 }),
    at(ketone, 270, 80),
    lab(270, 132, 'propanone', { a: 'middle', size: 11, w: 'bold' }),
    lab(330, 90, '+', { a: 'middle', size: 16 }),
    at(ald, 380, 80),
    lab(380, 132, 'ethanal', { a: 'middle', size: 11, w: 'bold' }),
    lab(235, 162, 'Each carbon of the C=C bond is joined to oxygen by a double bond:', { a: 'middle', size: 10 }),
    lab(235, 178, '=CH₂ gives methanal (HCHO)   =CHR gives an aldehyde RCHO   =CR₂ gives a ketone R₂C=O', { a: 'middle', size: 10, c: GREEN }),
    lab(235, 194, 'To find the alkene, join the two carbonyl carbons by C=C, removing both oxygen atoms.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 204, 'Ozonolysis of 2-methylbut-2-ene with ozone followed by zinc and water gives propanone and ethanal; the dashed line marks where the double bond is cut and each carbon becomes a carbonyl carbon.', body.join(''));
})();
