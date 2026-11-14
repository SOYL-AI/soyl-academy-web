// ch18 Isomerism — SVGs. Molecules are drawn from an atoms-and-bonds model (molkit.mjs): every molecular formula is computed from
// the drawing, chiral carbons are found by comparing the four ligands, and every isomer count quoted in the chapter is recomputed
// by a small enumerator (isokit.mjs). Optical, polarimeter and Nicol geometry is computed in JS and checked.
import { svgDoc, S } from './lib.mjs';
import { drawMol, formula, skel, mol, bounds, lab } from './molkit.mjs';
import { skeletons, alcohols, ethers, alkenes, chiralCount, hasGeometric } from './isokit.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const sub = (f) => f.replace(/\d+/g, (d) => d.split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[Number(c)]).join(''));
const must = (m, want, what) => chk(formula(m) === want, `${what}: formula computed from the drawing is ${formula(m)} (expected ${want})`);
const MUTED = 'var(--diagram-muted)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';

/** Draws molecule m centred on (cx, cy). */
function at(m, cx, cy) {
  const b = bounds(m);
  return drawMol(m, { ox: cx - (b.x0 + b.x1) / 2, oy: cy - (b.y0 + b.y1) / 2 });
}

// ---------------------------------------------------------------- isomer counts asserted from the enumerator
const alk = [1, 2, 3, 4, 5, 6, 7, 8, 10].map((n) => skeletons(n).length);
chk(alk.join(',') === '1,1,1,2,3,5,9,18,75', `enumerator: numbers of alkane chain isomers for C1-C8 and C10 are ${alk.join(', ')}`);
const al4 = alcohols(4);
const et4 = ethers(4);
chk(al4.length === 4 && et4.length === 3, `enumerator: C4H10O has ${al4.length} alcohols and ${et4.length} ethers, ${al4.length + et4.length} structural isomers`);
chk(al4.filter((t) => chiralCount(t) > 0).length === 1 && et4.every((t) => chiralCount(t) === 0), 'enumerator: of the C4H10O isomers only butan-2-ol has a chiral carbon, so 8 stereoisomers in all');
const al5 = alcohols(5);
const et5 = ethers(5);
chk(al5.length === 8 && et5.length === 6, `enumerator: C5H12O has ${al5.length} alcohols and ${et5.length} ethers`);
chk(al5.length + al5.filter((t) => chiralCount(t) > 0).length === 11, `enumerator: the ${al5.length} alcohols C5H12O give ${al5.length + al5.filter((t) => chiralCount(t) > 0).length} stereoisomers`);
const ak4 = alkenes(4);
const ak5 = alkenes(5);
chk(ak4.length === 3 && ak4.filter(hasGeometric).length === 1, `enumerator: C4H8 has ${ak4.length} alkenes, ${ak4.filter(hasGeometric).length} with cis-trans isomerism (4 stereoisomers)`);
chk(ak5.length === 5 && ak5.filter(hasGeometric).length === 1, `enumerator: C5H10 has ${ak5.length} alkenes, ${ak5.filter(hasGeometric).length} with cis-trans isomerism (6 stereoisomers)`);

// ---------------------------------------------------------------- 1. four kinds of structural isomerism
export const STRUCT4 = (() => {
  const cols = [
    { head: 'Chain', a: { m: skel(4), name: 'butane', f: 'C4H10' }, b: { m: skel(3, [[1, 'C']]), name: '2-methylpropane', f: 'C4H10' } },
    { head: 'Position', a: { m: skel(4, [[0, 'O', 'h']]), name: 'butan-1-ol', f: 'C4H10O' }, b: { m: skel(4, [[1, 'O']]), name: 'butan-2-ol', f: 'C4H10O' } },
    { head: 'Functional', a: { m: skel(2, [[1, 'O', 't']]), name: 'ethanol', f: 'C2H6O' }, b: { m: skel(3, [], { chainEls: { 1: 'O' } }), name: 'methoxymethane', f: 'C2H6O' } },
    { head: 'Metamerism', a: { m: skel(5, [], { chainEls: { 2: 'O' } }), name: 'ethoxyethane', f: 'C4H10O' }, b: { m: skel(5, [], { chainEls: { 1: 'O' } }), name: '1-methoxypropane', f: 'C4H10O' } },
  ];
  const body = [];
  cols.forEach((c, i) => {
    const x = 60 + i * 115;
    must(c.a.m, c.a.f, `${c.head}: ${c.a.name}`);
    must(c.b.m, c.b.f, `${c.head}: ${c.b.name}`);
    chk(c.a.f === c.b.f, `${c.head}: both isomers have formula ${c.a.f}`);
    body.push(lab(x, 16, c.head, { a: 'middle', w: 'bold', size: 12, c: BLUE }));
    body.push(at(c.a.m, x, 62));
    body.push(lab(x, 104, c.a.name, { a: 'middle', size: 10, w: 'bold' }));
    body.push(S.line(x - 40, 114, x + 40, 114, { c: MUTED, w: 1, dash: '3 3' }));
    body.push(at(c.b.m, x, 164));
    body.push(lab(x, 206, c.b.name, { a: 'middle', size: 10, w: 'bold' }));
    body.push(lab(x, 222, sub(c.a.f), { a: 'middle', size: 10 }));
  });
  return svgDoc(470, 232, 'Four kinds of structural isomerism: chain isomers butane and 2-methylpropane; position isomers butan-1-ol and butan-2-ol; functional isomers ethanol and methoxymethane; metamers ethoxyethane and 1-methoxypropane. Each pair has one molecular formula.', body.join(''));
})();

// ---------------------------------------------------------------- 2. all seven isomers of C4H10O
export const ISO7 = (() => {
  const tbut = mol([{ x: 0, y: 0 }, { x: -26, y: 0 }, { x: 26, y: 0 }, { x: 0, y: -26 }, { x: 0, y: 26, el: 'O' }], [[0, 1], [0, 2], [0, 3], [0, 4]]);
  const items = [
    { m: skel(4, [[0, 'O', 'h']]), name: 'butan-1-ol', k: 'alcohol' },
    { m: skel(4, [[1, 'O']]), name: 'butan-2-ol', k: 'alcohol' },
    { m: skel(3, [[1, 'C'], [0, 'O', 'h']]), name: '2-methylpropan-1-ol', k: 'alcohol' },
    { m: tbut, name: '2-methylpropan-2-ol', k: 'alcohol' },
    { m: skel(5, [], { chainEls: { 1: 'O' } }), name: '1-methoxypropane', k: 'ether' },
    { m: skel(5, [], { chainEls: { 2: 'O' } }), name: 'ethoxyethane', k: 'ether' },
    { m: skel(4, [[2, 'C']], { chainEls: { 1: 'O' } }), name: '2-methoxypropane', k: 'ether' },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, 'C4H10O', it.name);
    const row = i < 4 ? 0 : 1;
    const col = i < 4 ? i : i - 4;
    const x = i < 4 ? 58 + col * 118 : 120 + col * 115;
    const y = row === 0 ? 56 : 160;
    body.push(at(it.m, x, y));
    body.push(lab(x, y + 42, it.name, { a: 'middle', size: 10, w: 'bold' }));
  });
  body.push(lab(235, 14, 'Alcohols: 4 (chain and position isomers of each other)', { a: 'middle', size: 11, c: BLUE }));
  body.push(lab(235, 118, 'Ethers: 3 (functional isomers of the alcohols; metamers of each other)', { a: 'middle', size: 11, c: GREEN }));
  body.push(lab(235, 226, '4 + 3 = 7 structural isomers of C₄H₁₀O (butan-2-ol also has a mirror-image pair)', { a: 'middle', size: 10 }));
  return svgDoc(470, 236, 'All seven structural isomers of C4H10O: four alcohols (butan-1-ol, butan-2-ol, 2-methylpropan-1-ol, 2-methylpropan-2-ol) and three ethers (1-methoxypropane, ethoxyethane, 2-methoxypropane).', body.join(''));
})();

// ---------------------------------------------------------------- 3. keto-enol tautomerism
export const TAUTO = (() => {
  const keto = skel(3, [[1, 'O', 'p', 2]]);
  const enol = skel(3, [[1, 'O']], { orders: { 0: 2 } });
  must(keto, 'C3H6O', 'keto form (propanone)');
  must(enol, 'C3H6O', 'enol form (prop-1-en-2-ol)');
  const body = [
    at(keto, 78, 70),
    at(enol, 392, 70),
    S.arrow(160, 62, 300, 62, { c: 'currentColor', w: 1.6 }),
    S.arrow(300, 80, 160, 80, { c: 'currentColor', w: 1.6 }),
    lab(230, 52, 'H shifts from C to O', { a: 'middle', size: 10 }),
    lab(230, 100, 'equilibrium', { a: 'middle', size: 10 }),
    lab(78, 128, 'keto form: propanone', { a: 'middle', size: 11, w: 'bold' }),
    lab(78, 144, 'CH₃COCH₃ (C=O, C–H)', { a: 'middle', size: 10 }),
    lab(392, 128, 'enol form: prop-1-en-2-ol', { a: 'middle', size: 11, w: 'bold' }),
    lab(392, 144, 'CH₂=C(OH)CH₃ (C=C, O–H)', { a: 'middle', size: 10 }),
    lab(235, 176, 'Same molecular formula C₃H₆O; only the position of one hydrogen and a double bond differ.', { a: 'middle', size: 10, c: RED }),
    lab(235, 192, 'For propanone the keto form is overwhelmingly the more stable and predominates.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 202, 'Keto-enol tautomerism: propanone (keto form) and prop-1-en-2-ol (enol form) interconvert by the shift of a hydrogen atom from carbon to oxygen, with a double bond moving from C=O to C=C. The keto form predominates.', body.join(''));
})();

// ---------------------------------------------------------------- 4. geometrical isomerism: conditions
export const GEOM = (() => {
  const L = 30;
  const dxm = L * Math.cos(Math.PI / 3);
  const dym = L * Math.sin(Math.PI / 3);
  const abene = (cis) => mol([{ x: 0, y: 0 }, { x: L, y: 0 }, { x: -dxm, y: -dym }, { x: L + dxm, y: cis ? -dym : dym }], [[0, 1, 2], [0, 2], [1, 3]]);
  const cis = abene(true);
  const trans = abene(false);
  const but1 = skel(4, [], { orders: { 0: 2 } });
  const mp = mol([{ x: 0, y: 0 }, { x: L, y: 0 }, { x: -dxm, y: -dym }, { x: -dxm, y: dym }], [[0, 1, 2], [0, 2], [0, 3]]);
  must(cis, 'C4H8', 'cis-but-2-ene');
  must(trans, 'C4H8', 'trans-but-2-ene');
  must(but1, 'C4H8', 'but-1-ene');
  must(mp, 'C4H8', '2-methylpropene');
  const T = (el) => ({ el, edges: [[0, 1], [1, 2], [2, 3]] });
  chk(hasGeometric(T(['C', 'D', 'D', 'C'])), 'geometrical: but-2-ene has two different groups on each doubly bonded carbon');
  chk(!hasGeometric(T(['D', 'D', 'C', 'C'])), 'geometrical: but-1-ene has two identical H atoms on C-1, so no cis-trans isomerism');
  chk(!hasGeometric({ el: ['C', 'D', 'D', 'C'], edges: [[0, 1], [1, 2], [1, 3]] }), 'geometrical: 2-methylpropene has two identical methyl groups on C-2, so no cis-trans isomerism');
  const body = [
    lab(119, 14, 'Show cis-trans isomerism', { a: 'middle', w: 'bold', size: 12, c: GREEN }),
    at(cis, 62, 64),
    at(trans, 176, 64),
    lab(62, 110, 'cis-but-2-ene', { a: 'middle', size: 10, w: 'bold' }),
    lab(176, 110, 'trans-but-2-ene', { a: 'middle', size: 10, w: 'bold' }),
    lab(62, 124, 'CH₃ groups same side', { a: 'middle', size: 10 }),
    lab(176, 124, 'CH₃ groups opposite sides', { a: 'middle', size: 10 }),
    lab(360, 14, 'Do not show it', { a: 'middle', w: 'bold', size: 12, c: RED }),
    at(but1, 318, 66),
    at(mp, 420, 66),
    lab(318, 110, 'but-1-ene', { a: 'middle', size: 10, w: 'bold' }),
    lab(420, 110, '2-methylpropene', { a: 'middle', size: 10, w: 'bold' }),
    lab(318, 124, 'two H on C-1', { a: 'middle', size: 10 }),
    lab(420, 124, 'two CH₃ on C-2', { a: 'middle', size: 10 }),
    S.line(254, 24, 254, 130, { c: MUTED, w: 1, dash: '4 3' }),
    lab(235, 156, 'Condition: each doubly bonded carbon carries two different groups (rotation about C=C is restricted).', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 168, 'Geometrical isomerism: cis and trans but-2-ene (each alkene carbon bears two different groups) shown beside but-1-ene and 2-methylpropene, which cannot show it because one doubly bonded carbon carries two identical atoms or groups.', body.join(''));
})();

// ---------------------------------------------------------------- 5. syn and anti aldoximes
export const OXIME = (() => {
  const L = 34;
  const dxm = L * Math.cos(Math.PI / 3);
  const dym = L * Math.sin(Math.PI / 3);
  const ox = (syn) =>
    mol(
      [
        { x: 0, y: 0, show: true },
        { x: L, y: 0, el: 'N' },
        { x: -dxm, y: -dym, group: true, label: 'CH₃', cnt: { C: 1, H: 3 } },
        { x: -dxm, y: dym, el: 'H' },
        { x: L + dxm, y: syn ? dym : -dym, el: 'O' },
      ],
      [[0, 1, 2], [0, 2], [0, 3], [1, 4]],
    );
  const syn = ox(true);
  const anti = ox(false);
  must(syn, 'C2H5NO', 'syn-ethanal oxime');
  must(anti, 'C2H5NO', 'anti-ethanal oxime');
  // syn: H (on C) and OH (on N) on the same side of the C=N bond
  const sameSide = (m) => Math.sign(m.A[3].y - m.A[0].y) === Math.sign(m.A[4].y - m.A[1].y);
  chk(sameSide(syn) && !sameSide(anti), 'oximes: in the syn drawing H and OH lie on the same side of C=N, in the anti drawing on opposite sides');
  const body = [
    at(syn, 100, 70),
    at(anti, 340, 70),
    lab(100, 128, 'syn-ethanal oxime', { a: 'middle', size: 11, w: 'bold' }),
    lab(100, 143, 'H and OH on the same side', { a: 'middle', size: 10 }),
    lab(340, 128, 'anti-ethanal oxime', { a: 'middle', size: 11, w: 'bold' }),
    lab(340, 143, 'H and OH on opposite sides', { a: 'middle', size: 10 }),
    lab(220, 170, 'CH₃CH=NOH, C₂H₅NO: restricted rotation about C=N (nitrogen carries a lone pair)', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 182, 'Syn and anti forms of ethanal oxime, CH3CH=NOH. In the syn form the hydrogen on carbon and the hydroxyl group on nitrogen lie on the same side of the C=N double bond; in the anti form they lie on opposite sides.', body.join(''));
})();

// ---------------------------------------------------------------- 6. Nicol prism
export const NICOL = (() => {
  const x0 = 70;
  const x1 = 290;
  const yT = 50;
  const yB = 130;
  const d1 = { x: 130, y: yB };
  const d2 = { x: 230, y: yT };
  const entry = { x: x0, y: 90 };
  // o-ray: from the entry point to the cement layer, then reflected
  const dir = (a, b) => {
    const l = Math.hypot(b.x - a.x, b.y - a.y);
    return { x: (b.x - a.x) / l, y: (b.y - a.y) / l };
  };
  const line = { a: d1, d: dir(d1, d2) };
  const inter = (p, v) => {
    // intersection of the ray p + t v with the cement line d1 + s u
    const u = line.d;
    const den = v.x * u.y - v.y * u.x;
    const t = ((d1.x - p.x) * u.y - (d1.y - p.y) * u.x) / den;
    return { x: p.x + t * v.x, y: p.y + t * v.y };
  };
  const vo = dir(entry, { x: 170, y: 72 });
  const hit = inter(entry, vo);
  const u = line.d;
  const nrm = { x: -u.y, y: u.x };
  const dot = vo.x * nrm.x + vo.y * nrm.y;
  const vr = { x: vo.x - 2 * dot * nrm.x, y: vo.y - 2 * dot * nrm.y };
  const tTop = (yT - hit.y) / vr.y;
  const top = { x: hit.x + tTop * vr.x, y: yT };
  chk(hit.x > d1.x && hit.x < d2.x && hit.y > yT && hit.y < yB, 'Nicol: the ordinary ray meets the cement layer inside the crystal');
  chk(vr.y < 0 && top.x > hit.x && top.x < x1, 'Nicol: the ordinary ray is reflected towards the blackened top face inside the crystal');
  const eEnd = { x: x1, y: 98 };
  const body = [
    S.rect(x0, yT, x1 - x0, yB - yT, { c: 'currentColor', sw: 1.6, fill: 'var(--diagram-fill)', fop: 0.5 }),
    S.line(d1.x, d1.y, d2.x, d2.y, { c: 'var(--diagram-brown)', w: 3 }),
    // blackened face
    ...Array.from({ length: 12 }, (_, k) => S.line(150 + k * 14, yT, 156 + k * 14, yT - 8, { c: MUTED, w: 1.2 })),
    S.arrow(8, entry.y, x0, entry.y, { c: 'currentColor', w: 1.6 }),
    S.arrow(entry.x, entry.y, hit.x, hit.y, { c: BLUE, w: 1.6, size: 6 }),
    S.arrow(hit.x, hit.y, top.x, top.y, { c: BLUE, w: 1.6, size: 6, dash: '4 3' }),
    S.arrow(entry.x, entry.y, eEnd.x + 40, eEnd.y + 6, { c: RED, w: 1.8, size: 7 }),
    lab(4, 82, 'unpolarised', { size: 10 }),
    lab(4, 118, 'light', { size: 10 }),
    lab(x0 + 6, yB + 16, 'calcite crystal cut along the diagonal and', { size: 10 }),
    lab(x0 + 6, yB + 30, 'cemented with Canada balsam (brown line)', { size: 10, c: 'var(--diagram-brown)' }),
    lab(150, yT - 14, 'blackened face absorbs the o-ray', { size: 10, c: MUTED }),
    lab(100, 74, 'o-ray', { size: 10, c: BLUE }),
    lab(330, 116, 'e-ray emerges', { size: 10, c: RED }),
    lab(330, 130, 'plane polarised', { size: 10, c: RED }),
  ];
  return svgDoc(470, 172, 'Nicol prism: unpolarised light entering a calcite crystal splits into an ordinary ray and an extraordinary ray. The ordinary ray is totally reflected at the Canada balsam layer and absorbed by the blackened face; only the extraordinary ray emerges, as plane polarised light.', body.join(''));
})();

// ---------------------------------------------------------------- 7. polarimeter
export const POLARIMETER = (() => {
  const alpha = 25; // degrees, clockwise (dextrorotatory) for the drawing
  const vib = (cx, cy, deg, c = 'currentColor') => {
    const r = 11;
    const a = (deg * Math.PI) / 180;
    const dx = r * Math.sin(a);
    const dy = -r * Math.cos(a);
    return S.circle(cx, cy, 14, { c: MUTED, sw: 1 }) + S.line(cx - dx, cy - dy, cx + dx, cy + dy, { c, w: 2 }) + S.head(cx + dx, cy + dy, Math.atan2(dy, dx), { size: 5, c }) + S.head(cx - dx, cy - dy, Math.atan2(-dy, -dx), { size: 5, c });
  };
  const randomVib = (cx, cy) => S.circle(cx, cy, 14, { c: MUTED, sw: 1 }) + [0, 45, 90, 135].map((d) => { const a = (d * Math.PI) / 180; return S.line(cx - 11 * Math.sin(a), cy + 11 * Math.cos(a), cx + 11 * Math.sin(a), cy - 11 * Math.cos(a), { w: 1.3 }); }).join('');
  const y = 82;
  const body = [
    S.circle(34, y, 14, { c: 'var(--diagram-yellow)', fill: 'var(--diagram-yellow)', fop: 0.4 }),
    lab(34, y + 34, 'sodium lamp', { a: 'middle', size: 10 }),
    lab(34, y + 46, '(589 nm)', { a: 'middle', size: 10 }),
    S.arrow(50, y, 80, y, { w: 1.4, size: 6 }),
    randomVib(62, y - 34),
    lab(62, y - 56, 'all planes', { a: 'middle', size: 10 }),
    S.rect(86, y - 24, 22, 48, { sw: 1.6, fill: 'var(--diagram-fill)', fop: 0.6 }),
    lab(97, y + 40, 'polariser', { a: 'middle', size: 10 }),
    lab(97, y + 52, '(Nicol)', { a: 'middle', size: 10 }),
    S.arrow(108, y, 150, y, { w: 1.4, size: 6 }),
    vib(129, y - 34, 0, RED),
    lab(129, y - 56, 'one plane', { a: 'middle', size: 10 }),
    S.rect(150, y - 16, 140, 32, { sw: 1.6, fill: 'var(--diagram-blue)', fop: 0.18 }),
    lab(220, y + 4, 'solution of length l (dm)', { a: 'middle', size: 10 }),
    lab(220, y + 40, 'optically active solution,', { a: 'middle', size: 10 }),
    lab(220, y + 52, 'concentration c (g mL⁻¹)', { a: 'middle', size: 10 }),
    S.arrow(290, y, 330, y, { w: 1.4, size: 6 }),
    vib(311, y - 34, alpha, RED),
    lab(311, y - 56, `plane turned by α`, { a: 'middle', size: 10 }),
    S.rect(330, y - 24, 22, 48, { sw: 1.6, fill: 'var(--diagram-fill)', fop: 0.6 }),
    lab(341, y + 40, 'analyser', { a: 'middle', size: 10 }),
    lab(341, y + 52, '(turned to restore', { a: 'middle', size: 10 }),
    lab(341, y + 64, 'full brightness)', { a: 'middle', size: 10 }),
    S.arrow(352, y, 392, y, { w: 1.4, size: 6 }),
    S.ellipse(408, y, 12, 8, { sw: 1.5 }),
    S.circle(408, y, 3, { fill: 'currentColor', sw: 0.5 }),
    lab(414, y + 28, 'eye / detector', { a: 'middle', size: 10 }),
    lab(235, 164, 'Angle of rotation α = the angle through which the analyser is turned, read on the circular scale.', { a: 'middle', size: 10, c: RED }),
  ];
  chk(alpha > 0 && alpha < 90, `polarimeter: the plane in the drawing is turned clockwise by ${alpha} degrees, a dextrorotatory sample`);
  return svgDoc(470, 176, 'Polarimeter: light from a sodium lamp passes through a polarising Nicol prism, then a tube holding an optically active solution that turns the plane of polarisation by an angle alpha, then an analysing Nicol prism that is rotated to find alpha on a circular scale.', body.join(''));
})();

// ---------------------------------------------------------------- 8. chiral carbons
/** Branch string of the group hanging from atom v (seen from p) for a drawn molecule; used to decide whether a carbon is chiral. */
function chiralAtoms(m) {
  const adj = m.A.map(() => []);
  for (const [i, j, o = 1] of m.bonds) {
    adj[i].push([j, o]);
    adj[j].push([i, o]);
  }
  const br = (v, p, path) => {
    const a = m.A[v];
    const kids = adj[v].filter(([w]) => w !== p && !path.has(w)).map(([w, o]) => `${o}${br(w, v, new Set([...path, v]))}`).sort();
    return `${a.label ?? a.el}${a.H ?? 0}(${kids.join(',')})`;
  };
  const out = [];
  m.A.forEach((a, i) => {
    if (a.el !== 'C' || a.group || adj[i].some(([, o]) => o > 1)) return;
    const L = adj[i].map(([w]) => br(w, i, new Set([i])));
    for (let k = 0; k < a.H; k++) L.push('H');
    if (L.length === 4 && new Set(L).size === 4) out.push(i);
  });
  return out;
}
export const CHIRAL = (() => {
  const items = [
    { m: skel(4, [[1, 'O']]), f: 'C4H10O', name: 'butan-2-ol', want: 1, star: 18 },
    { m: skel(3, [[1, 'O']]), f: 'C3H8O', name: 'propan-2-ol', want: 0 },
    { m: skel(3, [[1, 'N'], [2, 'O', 'p', 2], [2, 'O', 't']]), f: 'C3H7NO2', name: '2-aminopropanoic acid', want: 1, star: 18 },
    { m: skel(6, [[2, 'C']]), f: 'C7H16', name: '3-methylhexane', want: 1, star: -8 },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    const ca = chiralAtoms(it.m);
    chk(ca.length === it.want, `chirality: ${it.name} has ${ca.length} chiral carbon(s) (expected ${it.want}), found by comparing the four groups on each carbon`);
    const x = 118 + (i % 2) * 235;
    const y = i < 2 ? 62 : 172;
    const b = bounds(it.m);
    const ox = x - (b.x0 + b.x1) / 2;
    const oy = y - (b.y0 + b.y1) / 2;
    body.push(drawMol(it.m, { ox, oy }));
    for (const k of ca) body.push(S.text(it.m.A[k].x + ox, it.m.A[k].y + oy + it.star + (it.star > 0 ? 6 : 0), '*', { size: 20, c: RED, a: 'middle', w: 'bold' }));
    body.push(lab(x, y + 48, it.name, { a: 'middle', size: 11, w: 'bold' }));
    body.push(lab(x, y + 62, ca.length ? `chiral carbon (*): ${ca.length}` : 'no chiral carbon, optically inactive', { a: 'middle', size: 10, c: ca.length ? RED : MUTED }));
  });
  return svgDoc(470, 252, 'Chiral carbons marked with a red asterisk: butan-2-ol, 2-aminopropanoic acid and 3-methylhexane each have one carbon bonded to four different groups; propan-2-ol has none because two of the groups on its middle carbon are identical methyl groups.', body.join(''));
})();

// ---------------------------------------------------------------- 9. lactic acid enantiomers
export const LACTIC = (() => {
  const cy = 86;
  const cxm = 235;
  const build = (cx, flip) => {
    const s = flip ? -1 : 1;
    return mol(
      [
        { x: cx, y: cy, show: true },
        { x: cx - s * 36, y: cy + 22, group: true, label: 'CH₃', cnt: { C: 1, H: 3 } },
        { x: cx + s * 36, y: cy + 22, group: true, label: 'COOH', cnt: { C: 1, H: 1, O: 2 } },
        { x: cx - s * 14, y: cy - 34, el: 'O' },
        { x: cx + s * 18, y: cy - 32, el: 'H' },
      ],
      [[0, 1], [0, 2], [0, 3, 1, 'w'], [0, 4, 1, 'd']],
    );
  };
  const a = build(cxm - 90, false);
  const b = build(cxm + 90, true);
  must(a, 'C3H6O3', 'lactic acid, drawing 1');
  must(b, 'C3H6O3', 'lactic acid, drawing 2');
  chk(a.A.every((p, i) => Math.abs(2 * cxm - p.x - b.A[i].x) < 1e-9 && Math.abs(p.y - b.A[i].y) < 1e-9), 'lactic acid: the second drawing is the exact reflection of the first in the vertical mirror plane');
  chk(chiralAtoms(a).length === 1, 'lactic acid: exactly one chiral carbon (C-2, bonded to CH3, COOH, OH and H)');
  const body = [
    drawMol(a),
    drawMol(b),
    S.line(cxm, 22, cxm, 140, { c: MUTED, w: 1.2, dash: '5 4' }),
    lab(cxm, 16, 'mirror plane', { a: 'middle', size: 10 }),
    lab(cxm - 90, 40, 'enantiomer A', { a: 'middle', size: 11, w: 'bold' }),
    lab(cxm + 90, 40, 'enantiomer B', { a: 'middle', size: 11, w: 'bold' }),
    lab(cxm, 160, 'Mirror images of 2-hydroxypropanoic acid (lactic acid), C₃H₆O₃: they cannot be superimposed.', { a: 'middle', size: 10 }),
    lab(cxm, 176, 'One rotates the plane clockwise (d or +), the other anticlockwise (l or −), by equal angles.', { a: 'middle', size: 10, c: RED }),
  ];
  return svgDoc(470, 186, 'The two mirror image forms of lactic acid drawn with wedge and dash bonds around the central chiral carbon, which carries CH3, COOH, OH and H. They are related as an object and its mirror image and cannot be superimposed; one is dextrorotatory and the other laevorotatory.', body.join(''));
})();

// ---------------------------------------------------------------- 10. Fischer projections of tartaric acid
const flipSide = (s) => (s === 'L' ? 'R' : 'L');
const mirrorV = (f) => f.map(flipSide); // reflection in a vertical plane swaps left and right
const rot180 = (f) => [flipSide(f[1]), flipSide(f[0])]; // turning the projection through 180 degrees in its plane
const same = (a, b) => a[0] === b[0] && a[1] === b[1];
const superimposable = (a, b) => same(a, b) || same(rot180(a), b);
export const FISCHER = (() => {
  const A = ['R', 'L']; // OH on the right at C-2, on the left at C-3
  const B = mirrorV(A);
  const M = ['R', 'R']; // both OH on the same side
  chk(!superimposable(A, B), 'tartaric acid: the two forms with OH groups on opposite sides are mirror images that cannot be superimposed (an enantiomeric pair, d and l)');
  chk(superimposable(M, mirrorV(M)), 'tartaric acid: the form with both OH groups on the same side is identical with its mirror image (meso, achiral)');
  chk(!superimposable(M, A) && !superimposable(M, B), 'tartaric acid: the meso form differs from both d and l, so there are 3 stereoisomers');
  const proj = (cx, f, title, sub1, sub2, meso) => {
    const y2 = 70;
    const y3 = 106;
    const out = [S.line(cx, 44, cx, 134, { w: 1.6 })];
    out.push(lab(cx, 40, 'COOH', { a: 'middle', size: 11 }));
    out.push(lab(cx, 150, 'COOH', { a: 'middle', size: 11 }));
    [[y2, f[0]], [y3, f[1]]].forEach(([y, side]) => {
      out.push(S.line(cx - 20, y, cx + 20, y, { w: 1.6 }));
      const oh = side === 'R' ? cx + 36 : cx - 36;
      const h = side === 'R' ? cx - 28 : cx + 28;
      out.push(lab(oh, y + 4, 'OH', { a: 'middle', size: 11 }));
      out.push(lab(h, y + 4, 'H', { a: 'middle', size: 11 }));
    });
    if (meso) out.push(S.line(cx - 52, 88, cx + 52, 88, { c: RED, w: 1.2, dash: '5 3' }));
    out.push(lab(cx, 18, title, { a: 'middle', size: 11, w: 'bold' }));
    out.push(lab(cx, 168, sub1, { a: 'middle', size: 10 }));
    out.push(lab(cx, 182, sub2, { a: 'middle', size: 10, c: meso ? RED : 'currentColor' }));
    return out.join('');
  };
  const body = [
    proj(70, A, 'Enantiomer 1', 'OH on opposite sides', 'optically active', false),
    proj(235, B, 'Enantiomer 2', 'mirror image of 1', 'optically active', false),
    proj(400, M, 'meso form', 'OH on the same side', 'internal plane: inactive', true),
    S.line(152, 28, 152, 160, { c: MUTED, w: 1, dash: '4 3' }),
    lab(152, 22, 'mirror', { a: 'middle', size: 10 }),
    lab(235, 202, 'One of the enantiomers is d-(+)-tartaric acid, the other l-(−)-tartaric acid.', { a: 'middle', size: 10 }),
    lab(235, 218, 'HOOC–CH(OH)–CH(OH)–COOH (C₄H₆O₆): two chiral carbons, three stereoisomers.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 228, 'Fischer projections of tartaric acid: two enantiomers with the hydroxyl groups on opposite sides, which are mirror images and optically active, and the meso form with both hydroxyl groups on the same side and a horizontal internal plane of symmetry, which is optically inactive.', body.join(''));
})();

// ---------------------------------------------------------------- 11. external and internal compensation
export const COMPENSATE = (() => {
  const arc = (cx, cy, r, a1, a2, c) => {
    const p = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
    const [x1, y1] = p(a1);
    const [x2, y2] = p(a2);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    const sweep = a2 > a1 ? 1 : 0;
    const ang = a2 > a1 ? ((a2 + 90) * Math.PI) / 180 : ((a2 - 90) * Math.PI) / 180;
    return S.path(`M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}`, { c, w: 2 }) + S.head(x2, y2, ang, { size: 7, c });
  };
  const body = [
    lab(120, 16, 'External compensation', { a: 'middle', w: 'bold', size: 12, c: BLUE }),
    lab(120, 30, 'racemic mixture, (±) or dl', { a: 'middle', size: 10 }),
    S.rect(26, 40, 62, 62, { sw: 1.4, c: MUTED }),
    S.rect(152, 40, 62, 62, { sw: 1.4, c: MUTED }),
    lab(57, 58, 'd molecules', { a: 'middle', size: 10 }),
    lab(183, 58, 'l molecules', { a: 'middle', size: 10 }),
    arc(57, 80, 12, 200, 340, RED),
    arc(183, 80, 12, 340, 200, BLUE),
    lab(57, 116, '+α (clockwise)', { a: 'middle', size: 10, c: RED }),
    lab(183, 116, '−α (anticlockwise)', { a: 'middle', size: 10, c: BLUE }),
    lab(120, 74, '+', { a: 'middle', size: 16 }),
    lab(120, 138, 'equal numbers of separate molecules:', { a: 'middle', size: 10 }),
    lab(120, 152, 'rotations cancel, net rotation 0', { a: 'middle', size: 10, w: 'bold' }),
    lab(350, 16, 'Internal compensation', { a: 'middle', w: 'bold', size: 12, c: GREEN }),
    lab(350, 30, 'meso form (one molecule)', { a: 'middle', size: 10 }),
    S.rect(290, 40, 120, 62, { sw: 1.4, c: MUTED }),
    S.line(290, 71, 410, 71, { c: RED, w: 1.2, dash: '5 3' }),
    lab(370, 58, 'upper half', { a: 'middle', size: 10 }),
    arc(322, 58, 9, 200, 340, RED),
    lab(370, 93, 'lower half', { a: 'middle', size: 10 }),
    arc(322, 93, 9, 340, 200, BLUE),
    lab(350, 116, 'plane of symmetry in the molecule', { a: 'middle', size: 10 }),
    lab(350, 138, 'rotation of one half cancelled by the other:', { a: 'middle', size: 10 }),
    lab(350, 152, 'net rotation 0, cannot be separated', { a: 'middle', size: 10, w: 'bold' }),
  ];
  return svgDoc(470, 162, 'External and internal compensation. In a racemic mixture the clockwise rotation of d molecules is cancelled by the anticlockwise rotation of an equal number of separate l molecules. In a meso compound one half of the molecule rotates the plane one way and the other half rotates it the opposite way, so each single molecule is inactive.', body.join(''));
})();
