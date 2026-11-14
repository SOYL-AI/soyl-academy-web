// ch17 Introduction, Classification and IUPAC Nomenclature of Organic Compounds — SVGs. Every molecule is drawn from an
// atoms-and-bonds model (molkit.mjs), so the molecular formula of each drawing, and the parent-chain length of each named
// alkane, is computed from the picture and checked against the name printed under it.
import { svgDoc, S } from './lib.mjs';
import { drawMol, formula, skel, ring, benzene, longestChain, bounds, lab } from './molkit.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const sub = (f) => f.replace(/\d+/g, (d) => d.split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[Number(c)]).join(''));

const NO2 = { group: true, label: 'NO₂', cnt: { N: 1, O: 2 } };
const CHO = { group: true, label: 'CHO', cnt: { C: 1, H: 1, O: 1 } };
const COOH = { group: true, label: 'COOH', cnt: { C: 1, H: 1, O: 2 } };

/** Draws molecule m centred on (cx, cy); returns the fragment. */
function at(m, cx, cy, o = {}) {
  const b = bounds(m);
  return drawMol(m, { ox: cx - (b.x0 + b.x1) / 2, oy: cy - (b.y0 + b.y1) / 2, ...o });
}
/** Bottom of the molecule when centred at cy. */
const half = (m) => {
  const b = bounds(m);
  return (b.y1 - b.y0) / 2;
};
/** Red locants 1..n beside the chain carbons of a zigzag (low atoms get the number below, high atoms above). */
const chainNums = (m, n, ox, oy, flip = []) => Array.from({ length: n }, (_, i) => S.text(m.A[i].x + ox, m.A[i].y + oy + ((i % 2 === 0) !== flip.includes(i) ? 17 : -9), String(i + 1), { size: 10, a: 'middle', c: 'var(--diagram-red)' })).join('');
const must = (m, want, what) => chk(formula(m) === want, `${what}: formula computed from the drawing is ${formula(m)} (expected ${want})`);

// ---------------------------------------------------------------- 1. carbon skeletons of C5
export const VERSATILE = (() => {
  const items = [
    { m: skel(5), name: 'pentane', note: 'straight chain', f: 'C5H12' },
    { m: skel(4, [[1, 'C']]), name: '2-methylbutane', note: 'branched chain', f: 'C5H12' },
    { m: ring(0, 0, 22.1, 5), name: 'cyclopentane', note: 'closed ring', f: 'C5H10' },
    { m: skel(5, [], { orders: { 0: 2 } }), name: 'pent-1-ene', note: 'double bond', f: 'C5H10' },
    { m: skel(5, [], { orders: { 0: 3 } }), name: 'pent-1-yne', note: 'triple bond', f: 'C5H8' },
  ];
  const xs = [80, 230, 380, 120, 300];
  const ys = [62, 62, 62, 160, 160];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    body.push(at(it.m, xs[i], ys[i]));
    body.push(lab(xs[i], ys[i] + 38, it.name, { a: 'middle', w: 'bold' }));
    body.push(lab(xs[i], ys[i] + 52, `${sub(it.f)}: ${it.note}`, { a: 'middle', size: 10 }));
  });
  body.push(lab(235, 238, 'Only carbon and hydrogen, yet five different shapes: each carbon always has four bonds.', { a: 'middle', size: 10 }));
  return svgDoc(470, 250, 'Five carbon skeletons built from five carbon atoms: pentane (straight chain), 2-methylbutane (branched chain), cyclopentane (ring), pent-1-ene (double bond) and pent-1-yne (triple bond). Every carbon atom has four bonds.', body.join(''));
})();

// ---------------------------------------------------------------- 2. ring types
export const RINGS = (() => {
  const items = [
    { m: ring(0, 0, 26, 6), f: 'C6H12', name: 'cyclohexane', k1: 'alicyclic', k2: 'homocyclic' },
    { m: benzene(0, 0), f: 'C6H6', name: 'benzene', k1: 'aromatic', k2: 'homocyclic' },
    { m: ring(0, 0, 26, 6, [], { dbl: [0, 2, 4], ringEls: { 0: 'N' } }), f: 'C5H5N', name: 'pyridine', k1: 'aromatic', k2: 'heterocyclic (N)' },
    { m: ring(0, 0, 22.1, 5, [], { ringEls: { 0: 'O' } }), f: 'C4H8O', name: 'tetrahydrofuran', k1: 'alicyclic', k2: 'heterocyclic (O)' },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    const x = 60 + i * 115;
    body.push(at(it.m, x, 52));
    body.push(lab(x, 108, it.name, { a: 'middle', w: 'bold', size: 11 }));
    body.push(lab(x, 123, sub(it.f), { a: 'middle', size: 10 }));
    body.push(lab(x, 139, it.k1, { a: 'middle', size: 10, c: 'var(--diagram-blue)' }));
    body.push(lab(x, 153, it.k2, { a: 'middle', size: 10, c: 'var(--diagram-red)' }));
  });
  body.push(lab(230, 178, 'Heterocyclic: the ring contains an atom other than carbon (here N or O).', { a: 'middle', size: 10 }));
  return svgDoc(470, 190, 'Four ring compounds: cyclohexane (alicyclic, homocyclic), benzene (aromatic, homocyclic), pyridine (aromatic, heterocyclic with nitrogen) and tetrahydrofuran (alicyclic, heterocyclic with oxygen).', body.join(''));
})();

// ---------------------------------------------------------------- 3. classification tree
export const TREE = (() => {
  const box = (cx, y, w, t, c = 'currentColor', t2) => {
    const out = [S.rect(cx - w / 2, y, w, t2 ? 36 : 26, { c, sw: 1.4, rx: 4 }), lab(cx, y + 17, t, { a: 'middle', size: 11 })];
    if (t2) out[1] = lab(cx, y + 15, t, { a: 'middle', size: 11 }) + lab(cx, y + 28, t2, { a: 'middle', size: 10 });
    return out.join('');
  };
  const ln = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { c: 'var(--diagram-muted)', w: 1.2 });
  const body = [
    box(235, 8, 150, 'Organic compounds'),
    ln(235, 34, 235, 44), ln(100, 44, 345, 44), ln(100, 44, 100, 56), ln(345, 44, 345, 56),
    box(100, 56, 150, 'Open chain', 'var(--diagram-green)', 'acyclic or aliphatic'),
    box(345, 56, 160, 'Closed chain', 'var(--diagram-blue)', 'cyclic'),
    ln(345, 92, 345, 104), ln(230, 104, 460, 104), ln(230, 104, 230, 116), ln(460, 104, 460, 116),
    box(230, 116, 130, 'Homocyclic', 'var(--diagram-blue)', 'carbon atoms only'),
    box(400, 116, 130, 'Heterocyclic', 'var(--diagram-red)', 'N, O or S in ring'),
    ln(230, 152, 230, 164), ln(165, 164, 295, 164), ln(165, 164, 165, 176), ln(295, 164, 295, 176),
    box(165, 176, 100, 'Alicyclic'),
    box(295, 176, 100, 'Aromatic'),
    lab(100, 114, 'straight or branched;', { a: 'middle', size: 10 }),
    lab(100, 128, 'saturated or unsaturated', { a: 'middle', size: 10 }),
    lab(100, 142, 'e.g. butane, ethene', { a: 'middle', size: 10 }),
    lab(165, 222, 'e.g. cyclohexane', { a: 'middle', size: 10 }),
    lab(295, 222, 'e.g. benzene', { a: 'middle', size: 10 }),
    lab(400, 170, 'e.g. pyridine, THF', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 232, 'Classification tree of organic compounds: open chain (acyclic) compounds and closed chain (cyclic) compounds; cyclic compounds are homocyclic (alicyclic or aromatic) or heterocyclic (containing nitrogen, oxygen or sulphur in the ring).', body.join(''));
})();

// ---------------------------------------------------------------- 4. functional groups on two-carbon molecules
export const FGS = (() => {
  const items = [
    { m: skel(2, [[1, 'O', 't']]), f: 'C2H6O', name: 'ethanol', g: '–OH  alcohol' },
    { m: skel(2, [[1, 'O', 'p', 2]]), f: 'C2H4O', name: 'ethanal', g: '–CHO  aldehyde' },
    { m: skel(3, [[1, 'O', 'p', 2]]), f: 'C3H6O', name: 'propanone', g: '>C=O  ketone' },
    { m: skel(2, [[1, 'O', 'p', 2], [1, 'O', 't']]), f: 'C2H4O2', name: 'ethanoic acid', g: '–COOH  carboxylic acid' },
    { m: skel(2, [[1, 'O', 'p', 2], [1, 'N', 't']]), f: 'C2H5NO', name: 'ethanamide', g: '–CONH₂  amide' },
    { m: skel(2, [[1, 'Cl', 't']]), f: 'C2H5Cl', name: 'chloroethane', g: '–Cl  halo (halide)' },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    const x = 78 + (i % 3) * 155;
    const y = i < 3 ? 52 : 160;
    body.push(at(it.m, x, y));
    body.push(lab(x, y + 44, it.name, { a: 'middle', w: 'bold' }));
    body.push(lab(x, y + 58, it.g, { a: 'middle', size: 10, c: 'var(--diagram-red)' }));
  });
  return svgDoc(470, 232, 'Six compounds with different functional groups: ethanol (hydroxyl, alcohol), ethanal (aldehyde), propanone (ketone), ethanoic acid (carboxylic acid), ethanamide (amide) and chloroethane (halogen).', body.join(''));
})();

// ---------------------------------------------------------------- 5. vanillin, several groups in one molecule
export const VANILLIN = (() => {
  const m = benzene(0, 0, [
    [0, CHO],
    [2, ['O', 'C']],
    [3, 'O'],
  ]);
  must(m, 'C8H8O3', 'vanillin');
  const b = bounds(m);
  const cx = 235;
  const cy = 98;
  const ox = cx - (b.x0 + b.x1) / 2;
  const oy = cy - (b.y0 + b.y1) / 2;
  const A = (i) => ({ x: m.A[i].x + ox, y: m.A[i].y + oy });
  const cho = A(6);
  const eth = A(7);
  const oh = A(9);
  const body = [
    drawMol(m, { ox, oy }),
    S.lead(cho.x + 20, cho.y, 330, cho.y),
    lab(334, cho.y + 4, 'aldehyde  –CHO', { size: 11 }),
    S.lead(eth.x + 10, eth.y, 330, eth.y),
    lab(334, eth.y + 4, 'ether  –OCH₃', { size: 11 }),
    S.lead(oh.x - 16, oh.y, 140, oh.y),
    lab(136, oh.y + 4, 'phenol  –OH (on the ring)', { a: 'end', size: 11 }),
    lab(cx, 196, 'Vanillin, C₈H₈O₃: three functional groups on one benzene ring', { a: 'middle', size: 11, w: 'bold' }),
  ];
  return svgDoc(470, 208, 'Structure of vanillin: a benzene ring carrying an aldehyde group, a methoxy ether group and a hydroxyl group. Molecular formula C8H8O3.', body.join(''));
})();

// ---------------------------------------------------------------- 6. parts of an IUPAC name
export const ANATOMY = (() => {
  const m = skel(7, [[1, 'C'], [3, ['C', 'C']]], { x0: 20, y0: 86 });
  must(m, 'C10H22', '4-ethyl-2-methylheptane');
  chk(longestChain(m) === 7, `anatomy: longest chain computed from the drawing is ${longestChain(m)} carbons (heptane)`);
  const body = [
    drawMol(m, { ox: 10, oy: 40 }),
    chainNums(m, 7, 10, 40, [1, 3]),
    lab(235, 14, '4-ethyl-2-methylheptane', { a: 'middle', w: 'bold', size: 13 }),
    lab(40, 172, 'Red numbers are locants: positions along the longest chain.', { size: 10, c: 'var(--diagram-red)' }),
    lab(40, 188, 'Prefix: substituents in alphabetical order (ethyl before methyl), each with its locant', { size: 10 }),
    lab(40, 202, 'Word root: hept = 7 carbons in the longest chain.  Primary suffix: ane = all single bonds', { size: 10 }),
    lab(40, 216, 'Numbering from the left gives locants 2, 4; from the right 4, 6. The lower set wins.', { size: 10 }),
  ];
  return svgDoc(470, 226, 'The skeleton of 4-ethyl-2-methylheptane. The longest chain has seven carbons numbered from the left, with a methyl group on carbon 2 and an ethyl group on carbon 4. The name is built from prefix, word root and primary suffix.', body.join(''));
})();

// ---------------------------------------------------------------- 7. eight named compounds
export const NAMED8 = (() => {
  const items = [
    { m: skel(4, [[1, 'O']]), f: 'C4H10O', name: 'butan-2-ol' },
    { m: skel(4, [[0, 'O', 'h', 2], [1, 'C']]), f: 'C5H10O', name: '2-methylbutanal' },
    { m: skel(4, [[1, 'O', 'p', 2]]), f: 'C4H8O', name: 'butan-2-one' },
    { m: skel(4, [[0, 'O', 'p', 2], [0, 'O', 'h'], [2, 'C']]), f: 'C5H10O2', name: '3-methylbutanoic acid' },
    { m: skel(3, [[0, 'O', 'p', 2], [0, 'N', 'h']]), f: 'C3H7NO', name: 'propanamide' },
    { m: skel(3, [[2, 'N', 't', 3]]), f: 'C3H5N', name: 'propanenitrile' },
    { m: skel(4, [[1, 'Cl']]), f: 'C4H9Cl', name: '2-chlorobutane' },
    { m: skel(4, [], { chainEls: { 1: 'O' } }), f: 'C3H8O', name: 'methoxyethane' },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    const x = 62 + (i % 4) * 115;
    const y = i < 4 ? 46 : 148;
    body.push(at(it.m, x, y));
    body.push(lab(x, y + 38, it.name, { a: 'middle', size: 10, w: 'bold' }));
  });
  return svgDoc(470, 204, 'Eight bond-line structures with their IUPAC names: butan-2-ol, 2-methylbutanal, butan-2-one, 3-methylbutanoic acid, propanamide, propanenitrile, 2-chlorobutane and methoxyethane.', body.join(''));
})();

// ---------------------------------------------------------------- 8. alicyclic compounds
export const ALICYC = (() => {
  const items = [
    { m: ring(0, 0, 22.1, 5, [[0, ['C', 'C']], [1, 'C']]), n: 5, f: 'C8H16', name: '1-ethyl-2-methylcyclopentane', marks: [[0, '1'], [1, '2']] },
    { m: ring(0, 0, 26, 6, [[2, 'C']], { dbl: [0] }), n: 6, f: 'C7H12', name: '3-methylcyclohexene', marks: [[0, '1'], [1, '2'], [2, '3']] },
    { m: ring(0, 0, 26, 6, [[0, 'O'], [1, 'C']]), n: 6, f: 'C7H14O', name: '2-methylcyclohexan-1-ol', marks: [[0, '1'], [1, '2']] },
    { m: ring(0, 0, 18.4, 4, [[0, ['C', 'C']]], { start: -135 }), n: 4, f: 'C6H12', name: 'ethylcyclobutane', marks: [] },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    const x = 120 + (i % 2) * 230;
    const y = i < 2 ? 62 : 200;
    const b = bounds(it.m);
    const ox = x - (b.x0 + b.x1) / 2;
    const oy = y - (b.y0 + b.y1) / 2;
    body.push(drawMol(it.m, { ox, oy }));
    const cx0 = it.m.A.slice(0, it.n).reduce((t, q) => t + q.x, 0) / it.n;
    const cy0 = it.m.A.slice(0, it.n).reduce((t, q) => t + q.y, 0) / it.n;
    for (const [k, t] of it.marks) {
      const a = it.m.A[k];
      const dx = cx0 - a.x;
      const dy = cy0 - a.y;
      const L = Math.hypot(dx, dy);
      body.push(S.text(a.x + ox + (dx / L) * 11, a.y + oy + (dy / L) * 11 + 4, t, { size: 10, a: 'middle', c: 'var(--diagram-red)' }));
    }
    body.push(lab(x, y + 60, it.name, { a: 'middle', size: 11, w: 'bold' }));
    body.push(lab(x, y + 74, sub(it.f), { a: 'middle', size: 10 }));
  });
  body.push(lab(235, 296, 'Number the ring from the principal group or the double bond; then give the substituents', { a: 'middle', size: 10 }));
  body.push(lab(235, 310, 'the lowest locants. In the first ring ethyl takes locant 1: e comes before m alphabetically.', { a: 'middle', size: 10 }));
  return svgDoc(470, 320, 'Four alicyclic compounds with ring numbering: 1-ethyl-2-methylcyclopentane, 3-methylcyclohexene, 2-methylcyclohexan-1-ol and ethylcyclobutane.', body.join(''));
})();

// ---------------------------------------------------------------- 9. monosubstituted benzenes
export const BENZ = (() => {
  const items = [
    { m: benzene(0, 0, [[0, 'C']]), f: 'C7H8', name: 'methylbenzene', common: 'common name: toluene' },
    { m: benzene(0, 0, [[0, 'O']]), f: 'C6H6O', name: 'phenol', common: 'also: hydroxybenzene' },
    { m: benzene(0, 0, [[0, 'N']]), f: 'C6H7N', name: 'aniline', common: 'also: benzenamine' },
    { m: benzene(0, 0, [[0, CHO]]), f: 'C7H6O', name: 'benzaldehyde', common: 'also: benzenecarbaldehyde' },
    { m: benzene(0, 0, [[0, COOH]]), f: 'C7H6O2', name: 'benzoic acid', common: 'also: benzenecarboxylic acid' },
    { m: benzene(0, 0, [[0, NO2]]), f: 'C6H5NO2', name: 'nitrobenzene', common: 'no common name needed' },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    const x = 78 + (i % 3) * 155;
    const y = i < 3 ? 56 : 186;
    body.push(at(it.m, x, y));
    body.push(lab(x, y + 50, it.name, { a: 'middle', w: 'bold' }));
    body.push(lab(x, y + 64, it.common, { a: 'middle', size: 10 }));
  });
  return svgDoc(470, 268, 'Six monosubstituted benzenes: methylbenzene (toluene), phenol, aniline, benzaldehyde, benzoic acid and nitrobenzene, each with its common name and its systematic name.', body.join(''));
})();

// ---------------------------------------------------------------- 10. disubstituted benzenes
export const DISUB = (() => {
  const items = [
    { m: benzene(0, 0, [[0, 'C'], [1, 'C']]), f: 'C8H10', name: '1,2-dimethylbenzene', pos: 'ortho (o-xylene)', marks: [[0, '1'], [1, '2']] },
    { m: benzene(0, 0, [[0, 'Cl'], [2, NO2]]), f: 'C6H4ClNO2', name: '1-chloro-3-nitrobenzene', pos: 'meta', marks: [[0, '1'], [2, '3']] },
    { m: benzene(0, 0, [[0, 'O'], [3, NO2]]), f: 'C6H5NO3', name: '4-nitrophenol', pos: 'para', marks: [[0, '1'], [3, '4']] },
  ];
  const body = [];
  items.forEach((it, i) => {
    must(it.m, it.f, it.name);
    const x = 78 + i * 155;
    const y = 74;
    const b = bounds(it.m);
    const ox = x - (b.x0 + b.x1) / 2;
    const oy = y - (b.y0 + b.y1) / 2;
    body.push(drawMol(it.m, { ox, oy }));
    for (const [k, t] of it.marks) {
      const a = it.m.A[k];
      const dx = 0 - a.x;
      const dy = 0 - a.y;
      const L = Math.hypot(dx, dy);
      body.push(S.text(a.x + ox + (dx / L) * 11, a.y + oy + (dy / L) * 11 + 4, t, { size: 10, a: 'middle', c: 'var(--diagram-red)' }));
    }
    body.push(lab(x, 150, it.name, { a: 'middle', w: 'bold', size: 10 }));
    body.push(lab(x, 165, it.pos, { a: 'middle', size: 10 }));
  });
  body.push(lab(235, 190, 'Positions: 1,2 = ortho, 1,3 = meta, 1,4 = para.  Number from the principal group (phenol)', { a: 'middle', size: 10 }));
  body.push(lab(235, 204, 'or, with no principal group, so that the alphabetical-first substituent gets locant 1.', { a: 'middle', size: 10 }));
  return svgDoc(470, 214, 'Three disubstituted benzenes with locants: 1,2-dimethylbenzene (ortho), 1-chloro-3-nitrobenzene (meta) and 4-nitrophenol (para).', body.join(''));
})();

// ---------------------------------------------------------------- 11. writing a structure from a name
export const REVERSE = (() => {
  const s1 = skel(6, [], { x0: 0, y0: 40 });
  const s2 = skel(6, [], { x0: 0, y0: 40, orders: { 1: 2 } });
  const s3 = skel(6, [[4, 'C']], { x0: 0, y0: 40, orders: { 1: 2 } });
  must(s1, 'C6H14', 'step 1 hexane');
  must(s2, 'C6H12', 'step 2 hex-2-ene');
  must(s3, 'C7H14', 'step 3 5-methylhex-2-ene');
  chk(longestChain(s3) === 6, 'reverse: longest chain in the finished structure is 6 carbons (hexene)');
  const body = [];
  [[s1, 'Step 1: hex = six carbons, ane = single bonds', 0], [s2, 'Step 2: 2-ene = double bond from C2 to C3', 1], [s3, 'Step 3: 5-methyl = CH₃ on C5', 2]].forEach(([m, t, k]) => {
    const ox = 12;
    const oy = 20 + k * 78;
    body.push(drawMol(m, { ox, oy }));
    body.push(chainNums(m, 6, ox, oy, k === 2 ? [4] : []));
    body.push(lab(170, 30 + k * 78, t, { size: 11, w: k === 2 ? 'bold' : 'normal' }));
  });
  body.push(lab(170, 244, '5-methylhex-2-ene, C₇H₁₄: CH₃CH=CHCH₂CH(CH₃)CH₃', { size: 11, c: 'var(--diagram-accent)' }));
  return svgDoc(470, 256, 'Writing a structure from the name 5-methylhex-2-ene in three steps: draw and number six carbon atoms, place a double bond between carbons 2 and 3, and attach a methyl group to carbon 5.', body.join(''));
})();

// ---------------------------------------------------------------- 12. worked example: 2,3,5-trimethylhexane
export const EX1 = (() => {
  const m = skel(6, [[1, 'C'], [2, 'C'], [4, 'C']], { x0: 0, y0: 30 });
  must(m, 'C9H20', '2,3,5-trimethylhexane');
  chk(longestChain(m) === 6, `trimethylhexane: longest chain computed from the drawing is ${longestChain(m)} carbons (hexane)`);
  const ox = 20;
  const oy = 10;
  const body = [
    drawMol(m, { ox, oy }),
    chainNums(m, 6, ox, oy, [1, 2, 4]),
    lab(190, 60, 'Left to right: methyl groups on 2, 3, 5', { size: 11 }),
    lab(190, 78, 'Right to left: methyl groups on 2, 4, 5', { size: 11 }),
    lab(190, 100, 'First point of difference: 3 < 4, so number from the left', { size: 10, c: 'var(--diagram-red)' }),
    lab(190, 122, '2,3,5-trimethylhexane, C₉H₂₀', { size: 12, w: 'bold' }),
  ];
  return svgDoc(470, 150, 'Skeleton of 2,3,5-trimethylhexane: a six carbon chain numbered from the left with methyl groups on carbons 2, 3 and 5. Numbering from the right would give 2, 4, 5, which is higher at the first point of difference.', body.join(''));
})();

// ---------------------------------------------------------------- 13. worked example: two polyfunctional compounds
export const EX2 = (() => {
  const a = skel(5, [[0, 'O', 'p', 2], [0, 'O', 'h'], [3, 'O']], { x0: 0, y0: 30 });
  const b = skel(4, [[0, 'O', 'h']], { x0: 0, y0: 30, orders: { 2: 2 } });
  must(a, 'C5H10O3', '4-hydroxypentanoic acid');
  must(b, 'C4H8O', 'but-3-en-1-ol');
  const body = [
    drawMol(a, { ox: 40, oy: 30 }),
    chainNums(a, 5, 40, 30, [0, 3]),
    lab(40, 130, '4-hydroxypentanoic acid', { size: 11, w: 'bold' }),
    lab(40, 146, 'acid group is C-1; OH is a hydroxy prefix on C-4', { size: 10 }),
    drawMol(b, { ox: 290, oy: 30 }),
    chainNums(b, 4, 290, 30),
    lab(270, 130, 'but-3-en-1-ol', { size: 11, w: 'bold' }),
    lab(270, 146, 'OH outranks C=C: OH on C-1,', { size: 10 }),
    lab(270, 160, 'double bond starts at C-3', { size: 10 }),
  ];
  return svgDoc(470, 172, 'Two structures with their numbering: 4-hydroxypentanoic acid with the carboxyl carbon as carbon 1 and a hydroxyl group on carbon 4, and but-3-en-1-ol with the hydroxyl on carbon 1 and the double bond between carbons 3 and 4.', body.join(''));
})();
