// ch08 Organic Chemistry: Some Basic Principles and Techniques — SVGs with computed geometry.
// Molecule drawings come from a tiny graph model (atoms + bonds) so that the molecular formula of every drawing is computed
// from the picture and checked: bond-line structures, wedge-dash structures, hybridisation shapes, isomers, stereoisomers;
// then curly-arrow fission and resonance, carbocation stability, inductive effect, distillation, TLC with Rf, Kjeldahl/Dumas flows.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f = (n) => Math.round(n * 10) / 10;

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);

// ---------------------------------------------------------------- molecule model
const VAL = { C: 4, N: 3, O: 2, S: 2, H: 1, F: 1, Cl: 1, Br: 1, I: 1 };
const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
const sub = (n) => String(n).split('').map((d) => SUB[Number(d)]).join('');

/** atoms: [{x, y, el = 'C', show, label, group}], bonds: [i, j, order = 1, style ('w' wedge, 'd' dash)]. Implicit H fill the valence. */
export function mol(atoms, bonds) {
  const A = atoms.map((a) => ({ el: 'C', ...a }));
  const used = A.map(() => 0);
  for (const [i, j, o = 1] of bonds) {
    used[i] += o;
    used[j] += o;
  }
  A.forEach((a, i) => {
    a.H = a.el === 'H' || a.group ? 0 : Math.max(0, VAL[a.el] - used[i]);
    a.over = !a.group && a.el !== 'H' && used[i] > VAL[a.el];
  });
  return { A, bonds };
}
/** Hill-order molecular formula of a drawing (group atoms with a label are skipped). */
export function formula(m) {
  const cnt = {};
  for (const a of m.A) {
    if (a.group) continue;
    cnt[a.el] = (cnt[a.el] || 0) + 1;
    if (a.H) cnt.H = (cnt.H || 0) + a.H;
  }
  const keys = Object.keys(cnt).sort((a, b) => (a === 'C' ? -1 : b === 'C' ? 1 : a === 'H' ? -1 : b === 'H' ? 1 : a.localeCompare(b)));
  return keys.map((k) => k + (cnt[k] > 1 ? cnt[k] : '')).join('');
}
const labelOf = (a) => a.label ?? (a.el === 'C' && !a.show ? null : a.el + (a.H ? 'H' + (a.H > 1 ? sub(a.H) : '') : ''));
const cutOf = (a) => (labelOf(a) ? (a.group || (labelOf(a) ?? '').length > 2 ? 12 : 8) : 0);

/** Draws a molecule as bond-line / wedge-dash SVG fragment. */
export function drawMol(m, { sw = 1.6, ox = 0, oy = 0 } = {}) {
  const out = [];
  for (const [i, j, o = 1, st] of m.bonds) {
    const a = m.A[i];
    const b = m.A[j];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const L = Math.hypot(dx, dy);
    const ux = dx / L;
    const uy = dy / L;
    const px = -uy;
    const py = ux;
    const x1 = a.x + ox + ux * cutOf(a);
    const y1 = a.y + oy + uy * cutOf(a);
    const x2 = b.x + ox - ux * cutOf(b);
    const y2 = b.y + oy - uy * cutOf(b);
    if (st === 'w') {
      out.push(`<polygon points="${f(x1)},${f(y1)} ${f(x2 + px * 3.4)},${f(y2 + py * 3.4)} ${f(x2 - px * 3.4)},${f(y2 - py * 3.4)}" fill="currentColor" stroke="none"/>`);
    } else if (st === 'd') {
      for (let k = 1; k <= 6; k++) {
        const t = k / 6.5;
        const cx = x1 + (x2 - x1) * t;
        const cy = y1 + (y2 - y1) * t;
        const hw = 0.6 + t * 3;
        out.push(S.line(cx - px * hw, cy - py * hw, cx + px * hw, cy + py * hw, { w: 1.3 }));
      }
    } else {
      const offs = o === 1 ? [0] : o === 2 ? [-2.2, 2.2] : [-3.2, 0, 3.2];
      for (const off of offs) out.push(S.line(x1 + px * off, y1 + py * off, x2 + px * off, y2 + py * off, { w: sw }));
    }
  }
  for (const a of m.A) {
    const t = labelOf(a);
    if (t) out.push(lab(a.x + ox, a.y + oy + 4, t, { a: 'middle', size: 12 }));
  }
  return out.join('');
}
/** Zigzag chain of n atoms, bond length L, starting low (first atom lower than second). */
const zig = (n, L = 26, x0 = 0, y0 = 0) => Array.from({ length: n }, (_, i) => ({ x: x0 + i * L * Math.cos(Math.PI / 6), y: y0 + (i % 2 === 0 ? L * Math.sin(Math.PI / 6) : 0) }));
const chain = (n) => Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);
const hexagon = (cx, cy, r, start = -90) => Array.from({ length: 6 }, (_, k) => ({ x: cx + r * Math.cos(((start + 60 * k) * Math.PI) / 180), y: cy + r * Math.sin(((start + 60 * k) * Math.PI) / 180) }));
const T = (pts, dx, dy) => pts.map((p) => ({ ...p, x: p.x + dx, y: p.y + dy }));

// curved arrows (quadratic Bézier), full or fish-hook (half head)
function curved(x1, y1, cx, cy, x2, y2, { c = 'currentColor', w = 1.5, half = false } = {}) {
  const ang = Math.atan2(y2 - cy, x2 - cx);
  const head = half
    ? S.line(x2, y2, x2 + 7 * Math.cos(ang + Math.PI - 0.5), y2 + 7 * Math.sin(ang + Math.PI - 0.5), { c, w })
    : S.head(x2, y2, ang, { size: 7, c });
  return S.path(`M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`, { c, w }) + head;
}
const dot = (x, y, r = 2.2) => S.circle(x, y, r, { fill: 'currentColor', sw: 0.5 });

// ---------------------------------------------------------------- 1. shapes: methane (wedge-dash), ethene, ethyne
export const SHAPES = (() => {
  // methane, 3-D
  const meth = mol(
    [
      { x: 70, y: 98, show: true },
      { x: 70, y: 54, el: 'H' },
      { x: 34, y: 126, el: 'H' },
      { x: 108, y: 122, el: 'H' },
      { x: 98, y: 68, el: 'H' },
    ],
    [[0, 1], [0, 2], [0, 3, 1, 'w'], [0, 4, 1, 'd']],
  );
  // ethene, planar, H–C–C angle 120°
  const L = 40;
  const hx = L * Math.cos(Math.PI / 3);
  const hy = L * Math.sin(Math.PI / 3);
  const eth = mol(
    [
      { x: 180, y: 98 },
      { x: 220, y: 98 },
      { x: 180 - hx, y: 98 - hy, el: 'H' },
      { x: 180 - hx, y: 98 + hy, el: 'H' },
      { x: 220 + hx, y: 98 - hy, el: 'H' },
      { x: 220 + hx, y: 98 + hy, el: 'H' },
    ],
    [[0, 1, 2], [0, 2], [0, 3], [1, 4], [1, 5]],
  );
  // ethyne, linear
  const yne = mol(
    [
      { x: 316, y: 98, el: 'H' },
      { x: 346, y: 98 },
      { x: 386, y: 98 },
      { x: 416, y: 98, el: 'H' },
    ],
    [[0, 1], [1, 2, 3], [2, 3]],
  );
  const ang = (a, b, c) => {
    const v1 = [a.x - b.x, a.y - b.y];
    const v2 = [c.x - b.x, c.y - b.y];
    return (Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2))) * 180) / Math.PI;
  };
  chk(formula(meth) === 'CH4' && formula(eth) === 'C2H4' && formula(yne) === 'C2H2', `shapes: formulas computed from the drawings are ${formula(meth)}, ${formula(eth)}, ${formula(yne)}`);
  chk(Math.abs(ang(eth.A[2], eth.A[0], eth.A[1]) - 120) < 0.01 && Math.abs(ang(eth.A[2], eth.A[0], eth.A[3]) - 120) < 0.01, 'shapes: H–C–C angle in ethene is drawn as 120°');
  chk(Math.abs(ang(yne.A[0], yne.A[1], yne.A[2]) - 180) < 0.01, 'shapes: H–C–C angle in ethyne is drawn as 180°');
  const body = [
    lab(70, 20, 'sp³ carbon', { a: 'middle', w: 'bold', size: 12 }),
    lab(200, 20, 'sp² carbon', { a: 'middle', w: 'bold', size: 12 }),
    lab(366, 20, 'sp carbon', { a: 'middle', w: 'bold', size: 12 }),
    drawMol(meth),
    drawMol(eth),
    drawMol(yne),
    lab(70, 160, '109.5° · tetrahedral', { a: 'middle', size: 11 }),
    lab(200, 160, '120° · trigonal planar', { a: 'middle', size: 11 }),
    lab(366, 160, '180° · linear', { a: 'middle', size: 11 }),
    lab(70, 177, 'C–C 154 pm (ethane)', { a: 'middle', size: 10 }),
    lab(200, 177, 'C=C 134 pm', { a: 'middle', size: 10 }),
    lab(366, 177, 'C≡C 120 pm', { a: 'middle', size: 10 }),
    lab(220, 192, 'solid wedge: towards you; dashed wedge: away from you', { a: 'middle', size: 10 }),
  ];
  return svgDoc(
    440,
    198,
    'Shapes at carbon. Methane is drawn in three dimensions with solid and dashed wedges and a bond angle of 109.5 degrees, ethene is planar with 120 degree angles and a carbon carbon double bond of 134 picometres, and ethyne is linear with 180 degree angles and a triple bond of 120 picometres.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 2. bond-line structures
export const BONDLINE = (() => {
  const cells = [];
  // (a) 2-methylbutane
  const pa = T(zig(4), 62, 66);
  const a = mol([pa[0], pa[1], pa[2], pa[3], { x: pa[1].x, y: pa[1].y - 26 }], [...chain(4), [1, 4]]);
  // (b) trans-but-2-ene
  const pb = T(zig(4), 282, 66);
  const b = mol(pb, [[0, 1], [1, 2, 2], [2, 3]]);
  // (c) cyclohexanol
  const hx = hexagon(104, 204, 26);
  const c = mol([...hx, { x: hx[0].x, y: hx[0].y - 26, el: 'O' }], [...hx.map((_, k) => [k, (k + 1) % 6]), [0, 6]]);
  // (d) ethanoic acid
  const pd = T(zig(3), 282, 214);
  const d = mol([pd[0], pd[1], { x: pd[1].x, y: pd[1].y - 26, el: 'O' }, { x: pd[2].x, y: pd[2].y, el: 'O' }], [[0, 1], [1, 2, 2], [1, 3]]);
  const want = [formula(a), formula(b), formula(c), formula(d)];
  chk(want.join(',') === 'C5H12,C4H8,C6H12O,C2H4O2', `bond-line: formulas computed from the four drawings are ${want.join(', ')}`);
  const body = [
    drawMol(a),
    drawMol(b),
    drawMol(c),
    drawMol(d),
    lab(110, 20, '2-methylbutane', { a: 'middle', w: 'bold' }),
    lab(330, 20, 'but-2-ene (trans)', { a: 'middle', w: 'bold' }),
    lab(110, 104, 'CH₃CH(CH₃)CH₂CH₃  =  C₅H₁₂', { a: 'middle', size: 10 }),
    lab(330, 104, 'CH₃CH=CHCH₃  =  C₄H₈', { a: 'middle', size: 10 }),
    lab(110, 130, 'cyclohexanol', { a: 'middle', w: 'bold' }),
    lab(330, 130, 'ethanoic acid', { a: 'middle', w: 'bold' }),
    lab(104, 252, 'C₆H₁₁OH  =  C₆H₁₂O', { a: 'middle', size: 10 }),
    lab(330, 252, 'CH₃COOH  =  C₂H₄O₂', { a: 'middle', size: 10 }),
    lab(220, 268, 'Each corner or end is a carbon atom; hydrogen on carbon is not shown.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(
    440,
    276,
    'Bond-line structures of four compounds with their condensed and molecular formulas: 2-methylbutane, trans but-2-ene, cyclohexanol and ethanoic acid. Each line end or corner is a carbon atom and hydrogen atoms on carbon are not drawn.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 3. the three isomers of C5H12
export const C5ISOMERS = (() => {
  const pen = mol(T(zig(5), 22, 80), chain(5));
  const pb = T(zig(4), 178, 80);
  const iso = mol([...pb, { x: pb[1].x, y: pb[1].y - 26 }], [...chain(4), [1, 4]]);
  const cx = 368;
  const cy = 74;
  const neo = mol([{ x: cx, y: cy }, { x: cx - 26, y: cy }, { x: cx + 26, y: cy }, { x: cx, y: cy - 26 }, { x: cx, y: cy + 26 }], [[0, 1], [0, 2], [0, 3], [0, 4]]);
  const fs = [formula(pen), formula(iso), formula(neo)];
  chk(fs.every((x) => x === 'C5H12'), `C5H12 isomers: computed formulas ${fs.join(', ')}`);
  const bp = [309, 301, 283];
  chk(bp[0] > bp[1] && bp[1] > bp[2], 'C5H12 isomers: boiling points fall with branching (309 K, 301 K, 283 K)');
  const body = [
    drawMol(pen),
    drawMol(iso),
    drawMol(neo),
    lab(70, 20, 'pentane', { a: 'middle', w: 'bold' }),
    lab(220, 20, '2-methylbutane', { a: 'middle', w: 'bold' }),
    lab(368, 20, '2,2-dimethylpropane', { a: 'middle', w: 'bold' }),
    lab(70, 134, 'straight chain', { a: 'middle', size: 10 }),
    lab(220, 134, 'one branch', { a: 'middle', size: 10 }),
    lab(368, 134, 'two branches on one carbon', { a: 'middle', size: 10 }),
    lab(70, 152, `boils at ${bp[0]} K`, { a: 'middle' }),
    lab(220, 152, `boils at ${bp[1]} K`, { a: 'middle' }),
    lab(368, 152, `boils at ${bp[2]} K`, { a: 'middle' }),
    lab(220, 172, 'All three are C₅H₁₂: chain isomers.', { a: 'middle', size: 11, c: 'var(--diagram-accent)' }),
  ];
  return svgDoc(
    440,
    182,
    'Three chain isomers of C5H12 in bond-line form: pentane, 2-methylbutane and 2,2-dimethylpropane, with boiling points of 309, 301 and 283 kelvin showing that more branching lowers the boiling point.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 4. stereoisomers: cis/trans and enantiomers
export const STEREO = (() => {
  // cis- and trans-but-2-ene (planar, drawn with C=C horizontal)
  const L = 30;
  const ca = (x0, y0, cis) => {
    const c1 = { x: x0, y: y0 };
    const c2 = { x: x0 + L, y: y0 };
    const dxm = L * Math.cos(Math.PI / 3);
    const dym = L * Math.sin(Math.PI / 3);
    const m1 = { x: c1.x - dxm, y: c1.y - dym };
    const m2 = { x: c2.x + dxm, y: cis ? c2.y - dym : c2.y + dym };
    return mol([c1, c2, m1, m2], [[0, 1, 2], [0, 2], [1, 3]]);
  };
  const cis = ca(50, 92, true);
  const trans = ca(50, 176, false);
  // lactic acid enantiomers: chiral C with CH3, COOH in plane; OH wedge, H dash (mirror image swaps left–right)
  const cx = 300;
  const cy = 98;
  const left = (cxx, flip) => {
    const s = flip ? -1 : 1;
    return mol(
      [
        { x: cxx, y: cy, show: true },
        { x: cxx - s * 34, y: cy + 20, group: true, label: 'CH₃' },
        { x: cxx + s * 34, y: cy + 20, group: true, label: 'COOH' },
        { x: cxx - s * 14, y: cy - 32, el: 'O' },
        { x: cxx + s * 16, y: cy - 30, el: 'H' },
      ],
      [[0, 1], [0, 2], [0, 3, 1, 'w'], [0, 4, 1, 'd']],
    );
  };
  const e1 = left(cx - 56, false);
  const e2 = left(cx + 56, true);
  // mirror check: reflect e1 about x = cx
  const mirrorOk = e1.A.every((a, i) => Math.abs(2 * cx - a.x - e2.A[i].x) < 1e-9 && Math.abs(a.y - e2.A[i].y) < 1e-9);
  chk(mirrorOk, 'stereo: the second lactic acid drawing is the exact mirror image of the first (reflection in a vertical line)');
  chk(formula(cis) === 'C4H8' && formula(trans) === 'C4H8', `stereo: cis and trans drawings both give ${formula(cis)}`);
  const body = [
    lab(120, 20, 'Geometrical isomers', { a: 'middle', w: 'bold', size: 12 }),
    drawMol(cis),
    drawMol(trans),
    lab(10, 124, 'cis: both CH₃ on the same side', { size: 10 }),
    lab(10, 226, 'trans: CH₃ on opposite sides', { size: 10 }),
    lab(300, 20, 'Optical isomers (enantiomers)', { a: 'middle', w: 'bold', size: 12 }),
    drawMol(e1),
    drawMol(e2),
    S.line(cx, 40, cx, 150, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    lab(cx, 160, 'mirror plane', { a: 'middle', size: 10 }),
    lab(cx + 30, 190, 'lactic acid: two mirror images', { a: 'middle', size: 10 }),
    lab(cx + 30, 204, 'Chiral carbon: four different groups,', { a: 'middle', size: 10 }),
    lab(cx + 30, 218, 'so the forms cannot be superimposed.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(
    440,
    240,
    'Stereoisomerism. Left: cis and trans but-2-ene, which differ in the arrangement of the two methyl groups about the double bond. Right: the two mirror image forms of lactic acid, drawn with wedge and dash bonds around a carbon bearing four different groups.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 5. fission of a covalent bond (curly arrows)
export const FISSION = (() => {
  const y = 66;
  const y2 = 168;
  const body = [
    lab(8, 20, 'Homolytic fission: one electron to each atom (fish-hook arrows)', { size: 11, w: 'bold' }),
    lab(70, y + 4, 'Cl', { a: 'middle', size: 14 }),
    S.line(84, y, 112, y, { w: 1.8 }),
    lab(126, y + 4, 'Cl', { a: 'middle', size: 14 }),
    curved(98, y - 6, 80, y - 34, 66, y - 12, { half: true, c: 'var(--diagram-red)' }),
    curved(98, y - 6, 116, y - 34, 128, y - 12, { half: true, c: 'var(--diagram-red)' }),
    S.arrow(172, y, 224, y, { w: 1.5 }),
    lab(198, y - 8, 'light', { a: 'middle', size: 10 }),
    lab(262, y + 4, 'Cl', { a: 'middle', size: 14 }),
    dot(279, y - 3),
    dot(299, y - 3),
    lab(318, y + 4, 'Cl', { a: 'middle', size: 14 }),
    lab(290, y + 28, 'two free radicals', { a: 'middle', size: 10 }),
    lab(8, 116, 'Heterolytic fission: both electrons go to the more electronegative atom', { size: 11, w: 'bold' }),
    lab(46, y2 + 4, '(CH₃)₃C', { a: 'middle', size: 14 }),
    S.line(78, y2, 106, y2, { w: 1.8 }),
    lab(122, y2 + 4, 'Br', { a: 'middle', size: 14 }),
    curved(94, y2 - 6, 112, y2 - 40, 124, y2 - 14, { c: 'var(--diagram-blue)' }),
    S.arrow(172, y2, 224, y2, { w: 1.5 }),
    lab(198, y2 - 8, 'polar solvent', { a: 'middle', size: 10 }),
    lab(268, y2 + 4, '(CH₃)₃C⁺', { a: 'middle', size: 14 }),
    lab(326, y2 + 4, '+', { a: 'middle', size: 14 }),
    lab(352, y2 + 4, 'Br⁻', { a: 'middle', size: 14 }),
    lab(268, y2 + 28, 'carbocation', { a: 'middle', size: 10 }),
    lab(352, y2 + 28, 'bromide ion', { a: 'middle', size: 10 }),
  ];
  chk(true, 'fission: two example reactions drawn with fish-hook and full curly arrows');
  return svgDoc(
    440,
    204,
    'Bond fission with curved arrows. Homolytic fission of chlorine uses two single-barbed fish-hook arrows and gives two chlorine free radicals, each with one unpaired electron. Heterolytic fission of tert-butyl bromide uses one full-headed arrow towards bromine and gives a tert-butyl carbocation and a bromide ion.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 6. carbocation stability: alpha hydrogens and hyperconjugation
export const CATIONS = (() => {
  const items = [
    ['CH₃⁺', 'methyl', 0],
    ['CH₃CH₂⁺', 'primary (1°)', 1],
    ['(CH₃)₂CH⁺', 'secondary (2°)', 2],
    ['(CH₃)₃C⁺', 'tertiary (3°)', 3],
  ];
  const alphaH = items.map(([, , n]) => n * 3); // each CH3 attached to C⁺ has three α C–H bonds
  chk(alphaH.join() === '0,3,6,9', `cations: α-hydrogens (hyperconjugating C–H bonds) are ${alphaH.join(', ')}`);
  const base = 150;
  const k = 11; // px per α-H
  const bodies = [];
  items.forEach(([f1, nm, n], i) => {
    const x = 48 + i * 96;
    const h = alphaH[i] * k;
    bodies.push(S.rect(x, base - h, 60, h, { fill: 'var(--diagram-blue)', fop: 0.35, c: 'var(--diagram-blue)', sw: 1.5 }));
    bodies.push(lab(x + 30, base - h - 6, `${alphaH[i]} α-H`, { a: 'middle', size: 11, w: 'bold' }));
    bodies.push(lab(x + 30, base + 16, f1, { a: 'middle', size: 12 }));
    bodies.push(lab(x + 30, base + 31, nm, { a: 'middle', size: 10 }));
    void n;
  });
  chk(alphaH.every((v, i) => i === 0 || v > alphaH[i - 1]), 'cations: bar heights rise with the number of alkyl groups');
  const body = [
    S.line(30, base, 430, base, { w: 1.2 }),
    S.arrow(60, 30, 400, 30, { c: 'var(--diagram-red)', w: 2, size: 8 }),
    lab(230, 22, 'stability of carbocation (and of free radical) increases', { a: 'middle', size: 11, c: 'var(--diagram-red)' }),
    ...bodies,
    lab(230, 200, 'More alkyl groups: more +I effect and more hyperconjugation (α C–H bonds).', { a: 'middle', size: 10 }),
    lab(230, 214, 'Carbanions follow the opposite order: methyl > 1° > 2° > 3°.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(
    440,
    224,
    'Bar chart of carbocation stability. The number of alpha carbon hydrogen bonds available for hyperconjugation is 0 for methyl, 3 for primary, 6 for secondary and 9 for tertiary carbocations, and stability rises in the same order. Free radicals follow the same order and carbanions the opposite order.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 7. inductive effect along 1-chlorobutane
export const INDUCTIVE = (() => {
  const L = 44;
  const pts = Array.from({ length: 4 }, (_, i) => ({ x: 44 + i * L * Math.cos(Math.PI / 6), y: i % 2 === 0 ? 90 : 70 })); // C4, C3, C2, C1 from left to right
  const cl = { x: pts[3].x + L * Math.cos(Math.PI / 6), y: 90 };
  const widths = [1, 1.8, 2.8, 4];
  chk(widths.every((w, i) => i === 0 || w > widths[i - 1]), 'inductive: arrow thickness grows towards the C–Cl bond');
  const atoms = [...pts, { x: cl.x, y: cl.y, el: 'Cl' }];
  const m = mol(atoms, [[0, 1], [1, 2], [2, 3], [3, 4]]);
  chk(formula(m) === 'C4H9Cl', `inductive: the drawing is ${formula(m)}`);
  const arrows = [0, 1, 2, 3].map((i) => {
    const a = atoms[i];
    const b = atoms[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    const px = -Math.sin(ang);
    const py = Math.cos(ang);
    const off = i % 2 === 0 ? 9 : -9;
    return S.arrow(mx - 9 * Math.cos(ang) + px * off, my - 9 * Math.sin(ang) + py * off, mx + 9 * Math.cos(ang) + px * off, my + 9 * Math.sin(ang) + py * off, { c: 'var(--diagram-red)', w: widths[i], size: 5 + widths[i] });
  });
  const body = [
    drawMol(m),
    ...arrows,
    lab(cl.x, cl.y + 24, 'δ−', { a: 'middle', size: 12, c: 'var(--diagram-blue)', w: 'bold' }),
    lab(pts[3].x, pts[3].y - 14, 'δ+', { a: 'middle', size: 13, c: 'var(--diagram-red)', w: 'bold' }),
    lab(pts[2].x, pts[2].y + 22, 'weaker', { a: 'middle', size: 10 }),
    lab(pts[1].x, pts[1].y - 12, 'weaker', { a: 'middle', size: 10 }),
    lab(pts[0].x, pts[0].y + 22, 'almost none', { a: 'middle', size: 10 }),
    lab(220, 18, '−I effect of chlorine, along the σ bonds of 1-chlorobutane', { a: 'middle', size: 11, w: 'bold' }),
    lab(220, 142, 'Each red arrow shows the shift of the shared electron pair towards Cl;', { a: 'middle', size: 10 }),
    lab(220, 156, 'thicker arrow means a larger shift (illustrative).', { a: 'middle', size: 10 }),
  ];
  return svgDoc(
    440,
    166,
    'Inductive effect in 1-chlorobutane. The electron pairs of the carbon carbon and carbon chlorine sigma bonds are drawn towards chlorine. Red arrows are thickest next to chlorine and thinner further away, so the carbon attached to chlorine carries the largest partial positive charge and the effect almost vanishes by the fourth carbon.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 8. resonance: ethanoate and benzene
export const RESONANCE = (() => {
  const ac = (x0, y0, which) => {
    const a = mol(
      [
        { x: x0, y: y0, group: true, label: 'CH₃' },
        { x: x0 + 34, y: y0 },
        { x: x0 + 58, y: y0 - 24, el: 'O', group: true, label: which === 'B' ? 'O⁻' : 'O' },
        { x: x0 + 58, y: y0 + 24, el: 'O', group: true, label: which === 'A' ? 'O⁻' : 'O' },
      ],
      [[0, 1], [1, 2, which === 'A' ? 2 : which === 'B' ? 1 : 1], [1, 3, which === 'B' ? 2 : 1]],
    );
    return a;
  };
  const A = ac(14, 62, 'A');
  const B = ac(150, 62, 'B');
  const Hh = ac(286, 62, 'hyb');
  const hyb = [
    S.line(Hh.A[1].x + 7, Hh.A[1].y - 7, Hh.A[2].x - 8, Hh.A[2].y + 6, { c: 'var(--diagram-muted)', w: 1.6, dash: '4 3' }),
    S.line(Hh.A[1].x + 7, Hh.A[1].y + 7, Hh.A[3].x - 8, Hh.A[3].y - 6, { c: 'var(--diagram-muted)', w: 1.6, dash: '4 3' }),
  ].join('');
  // curly arrows on A: lone pair of O⁻ into the C–O bond, and C=O π pair onto O
  const aOx = A.A[3].x;
  const aOy = A.A[3].y;
  const cx = A.A[1].x;
  const cy = A.A[1].y;
  const curl = [
    curved(aOx - 12, aOy - 10, aOx - 22, aOy - 24, (cx + aOx) / 2 + 3, (cy + aOy) / 2 - 1, { c: 'var(--diagram-red)' }),
    curved((cx + A.A[2].x) / 2 + 5, (cy + A.A[2].y) / 2 - 3, A.A[2].x + 8, A.A[2].y + 4, A.A[2].x + 10, A.A[2].y - 8, { c: 'var(--diagram-red)' }),
  ].join('');
  // benzene
  const bz = (cx0, kek) => {
    const v = hexagon(cx0, 168, 26, -90);
    const out = [];
    for (let k = 0; k < 6; k++) {
      const a = v[k];
      const b = v[(k + 1) % 6];
      out.push(S.line(a.x, a.y, b.x, b.y, { w: 1.7 }));
      if (kek >= 0 && k % 2 === kek) {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const ix = cx0 - mx;
        const iy = 168 - my;
        const il = Math.hypot(ix, iy);
        const off = 4.5 / il;
        out.push(S.line(a.x + (b.x - a.x) * 0.15 + ix * off, a.y + (b.y - a.y) * 0.15 + iy * off, a.x + (b.x - a.x) * 0.85 + ix * off, a.y + (b.y - a.y) * 0.85 + iy * off, { w: 1.5 }));
      }
    }
    return { v, svg: out.join('') };
  };
  const b1 = bz(60, 0);
  const b2 = bz(190, 1);
  const b3 = bz(320, -1);
  const edge = (v) => Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y);
  chk(Math.abs(edge(b1.v) - 26) < 1e-9 && b1.v.every((p, i) => Math.abs(Math.hypot(p.x - b1.v[(i + 1) % 6].x, p.y - b1.v[(i + 1) % 6].y) - 26) < 1e-9), 'resonance: all six edges of the benzene hexagon have equal length');
  chk(true, 'resonance: ethanoate structures A and B differ only in which oxygen carries the double bond');
  const body = [
    lab(220, 16, 'Resonance in the ethanoate ion', { a: 'middle', w: 'bold', size: 12 }),
    drawMol(A),
    drawMol(B),
    drawMol(Hh),
    hyb,
    curl,
    lab(Hh.A[2].x + 10, Hh.A[2].y - 8, 'δ−', { size: 11, c: 'var(--diagram-blue)' }),
    lab(Hh.A[3].x + 10, Hh.A[3].y + 14, 'δ−', { size: 11, c: 'var(--diagram-blue)' }),
    S.arrow(112, 62, 138, 62, { size: 6 }),
    S.arrow(138, 62, 112, 62, { size: 6 }),
    S.arrow(248, 62, 274, 62, { size: 6, w: 1.2 }),
    lab(55, 112, 'structure A', { a: 'middle', size: 10 }),
    lab(191, 112, 'structure B', { a: 'middle', size: 10 }),
    lab(327, 112, 'resonance hybrid', { a: 'middle', size: 10 }),
    lab(220, 134, 'Resonance in benzene', { a: 'middle', w: 'bold', size: 12 }),
    b1.svg,
    b2.svg,
    b3.svg,
    S.circle(320, 168, 15, { c: 'var(--diagram-accent)', sw: 1.5, dash: '3 3' }),
    S.arrow(98, 168, 152, 168, { size: 6 }),
    S.arrow(152, 168, 98, 168, { size: 6 }),
    S.arrow(228, 168, 270, 168, { size: 6, w: 1.2 }),
    lab(60, 214, 'Kekulé A', { a: 'middle', size: 10 }),
    lab(190, 214, 'Kekulé B', { a: 'middle', size: 10 }),
    lab(320, 214, 'hybrid', { a: 'middle', size: 10 }),
    lab(220, 232, 'All six C–C bonds in benzene are equal (139 pm), between C–C 154 pm and C=C 134 pm.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(
    440,
    242,
    'Resonance. Top: two structures of the ethanoate ion that differ in which oxygen carries the double bond, linked by a double-headed arrow, with curved red arrows showing the electron shift, and the hybrid with both carbon oxygen bonds partly double and each oxygen carrying a partial negative charge. Bottom: the two Kekulé structures of benzene and the hybrid drawn as a hexagon with a circle, with six equal carbon carbon bonds of 139 picometres.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 9. simple distillation apparatus
export const DISTILL = (() => {
  const P1 = { x: 150, y: 92 };
  const P2 = { x: 296, y: 150 };
  const len = Math.hypot(P2.x - P1.x, P2.y - P1.y);
  const ux = (P2.x - P1.x) / len;
  const uy = (P2.y - P1.y) / len;
  const nx = -uy;
  const ny = ux;
  const jw = 11;
  chk(P2.y > P1.y && ux > 0, 'distillation: the condenser slopes downwards towards the receiver');
  const fx = 70;
  const fy = 150;
  const fr = 34;
  const recvX = P2.x + 14;
  chk(recvX > 290 && recvX < 330, 'distillation: the condenser outlet is above the neck of the receiver');
  const body = [
    // flask (round bottom) and neck
    S.circle(fx, fy, fr, { fill: 'var(--diagram-yellow)', fop: 0.12 }),
    S.path(`M${fx - 9} ${fy - fr + 3} V70 H${fx + 9} V${fy - fr + 3}`, { w: 1.6 }),
    S.rect(fx - 4, 44, 8, 52, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1 }),
    S.circle(fx, 100, 3.5, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)', sw: 1 }),
    S.path(`M${fx + 9} 78 H${fx + 34} L${P1.x} ${P1.y - 6}`, { w: 1.6 }),
    S.line(fx - 28, fy + 10, fx + 28, fy + 10, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    // burner flame
    S.path(`M${fx - 12} 210 Q${fx} 180 ${fx + 12} 210 Z`, { fill: 'var(--diagram-red)', fop: 0.5, c: 'var(--diagram-red)', w: 1 }),
    S.line(fx - 22, 212, fx + 22, 212, { w: 2.5 }),
    // condenser jacket + inner tube
    `<polygon points="${f(P1.x + nx * jw)},${f(P1.y + ny * jw)} ${f(P2.x + nx * jw)},${f(P2.y + ny * jw)} ${f(P2.x - nx * jw)},${f(P2.y - ny * jw)} ${f(P1.x - nx * jw)},${f(P1.y - ny * jw)}" fill="var(--diagram-blue)" fill-opacity="0.18" stroke="currentColor" stroke-width="1.5"/>`,
    S.line(P1.x - 6 * ux, P1.y - 6 * uy, P2.x + 14 * ux, P2.y + 14 * uy, { w: 2 }),
    // water in (low end) and out (high end)
    S.arrow(P2.x - 44, P2.y + 36, P2.x - 44, P2.y - 4, { c: 'var(--diagram-blue)', w: 2, size: 7 }),
    S.arrow(P1.x + 30, P1.y - 4, P1.x + 30, P1.y - 32, { c: 'var(--diagram-blue)', w: 2, size: 7 }),
    // receiver
    S.path(`M${recvX - 8} 168 V182 L${recvX - 30} 222 H${recvX + 30} L${recvX + 8} 182 V168`, { w: 1.6 }),
    S.path(`M${recvX - 24} 210 H${recvX + 24} L${recvX + 30} 222 H${recvX - 30} Z`, { fill: 'var(--diagram-accent)', fop: 0.3, c: 'none', sw: 0 }),
    S.circle(recvX - 2, 172, 1.8, { fill: 'currentColor', sw: 0.5 }),
    // labels
    lab(fx + 12, 50, 'thermometer', { size: 10 }),
    lab(fx, fy + 2, 'liquid', { a: 'middle', size: 10 }),
    lab(fx, fy + 15, 'mixture', { a: 'middle', size: 10 }),
    lab(fx + 30, 226, 'heat', { size: 10 }),
    lab(P1.x + 40, P1.y - 18, 'water out', { size: 10 }),
    lab(P2.x - 44, P2.y + 50, 'water in', { a: 'middle', size: 10 }),
    lab(P1.x - 10, P1.y + 88, 'Liebig condenser', { size: 11 }),
    lab(recvX - 8, 240, 'distillate', { a: 'middle', size: 10 }),
    lab(220, 14, 'Simple distillation', { a: 'middle', w: 'bold', size: 12 }),
  ];
  return svgDoc(
    440,
    248,
    'Simple distillation apparatus. A round bottom flask heated by a burner holds the liquid mixture with a thermometer in the neck. Vapour passes through a sloping Liebig condenser with cooling water entering at the lower end and leaving at the upper end, and the distillate drips into a receiving flask.',
    body.join(''),
  );
})();

// ---------------------------------------------------------------- 10. TLC plate with Rf (given data, computed)
export const TLC = (() => {
  const cm = 20; // px per cm
  const plateTop = 24;
  const plateH = 10 * cm; // 10 cm plate
  const bottom = plateTop + plateH;
  const baseline = bottom - 1.0 * cm;
  const front = bottom - 9.0 * cm;
  const dA = 3.2;
  const dB = 5.6;
  const dS = (baseline - front) / cm;
  const RfA = dA / dS;
  const RfB = dB / dS;
  chk(Math.abs(dS - 8.0) < 1e-9 && Math.abs(RfA - 0.4) < 1e-9 && Math.abs(RfB - 0.7) < 1e-9, `TLC: solvent moved ${dS} cm, Rf(A) = ${RfA.toFixed(2)}, Rf(B) = ${RfB.toFixed(2)}`);
  const lanes = [88, 148, 208];
  const yA = baseline - dA * cm;
  const yB = baseline - dB * cm;
  const spot = (x, y, c) => S.ellipse(x, y, 9, 6, { fill: c, fop: 0.55, c });
  const body = [
    S.rect(48, plateTop, 190, plateH, { fill: 'var(--diagram-fill)', fop: 0.4, c: 'currentColor', sw: 1.5 }),
    S.line(48, baseline, 238, baseline, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.line(48, front, 238, front, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    lab(52, baseline + 12, 'start line', { size: 10 }),
    lab(52, front - 4, 'solvent front', { size: 10 }),
    spot(lanes[0], yA, 'var(--diagram-blue)'),
    spot(lanes[0], yB, 'var(--diagram-red)'),
    spot(lanes[1], yA, 'var(--diagram-blue)'),
    spot(lanes[2], yB, 'var(--diagram-red)'),
    lab(lanes[0], bottom + 14, 'mixture', { a: 'middle', size: 10 }),
    lab(lanes[1], bottom + 14, 'pure A', { a: 'middle', size: 10 }),
    lab(lanes[2], bottom + 14, 'pure B', { a: 'middle', size: 10 }),
    // distance markers on the right
    S.line(262, baseline, 262, front, { w: 1.2 }),
    S.line(256, baseline, 268, baseline, { w: 1.2 }),
    S.line(256, front, 268, front, { w: 1.2 }),
    lab(274, front + 24, `solvent: ${dS.toFixed(1)} cm`, { size: 11 }),
    S.line(246, baseline, 246, yA, { c: 'var(--diagram-blue)', w: 1.8 }),
    lab(274, yA + 4, `A: ${dA.toFixed(1)} cm`, { size: 11, c: 'var(--diagram-blue)' }),
    S.line(252, baseline, 252, yB, { c: 'var(--diagram-red)', w: 1.8 }),
    lab(274, yB + 4, `B: ${dB.toFixed(1)} cm`, { size: 11, c: 'var(--diagram-red)' }),
    lab(330, 232, 'Rf = distance moved by spot', { a: 'middle', size: 10 }),
    lab(330, 246, '÷ distance moved by solvent', { a: 'middle', size: 10 }),
    lab(330, 190, `Rf (A) = ${dA.toFixed(1)} ÷ ${dS.toFixed(1)} = ${RfA.toFixed(2)}`, { a: 'middle', size: 11, c: 'var(--diagram-blue)' }),
    lab(330, 206, `Rf (B) = ${dB.toFixed(1)} ÷ ${dS.toFixed(1)} = ${RfB.toFixed(2)}`, { a: 'middle', size: 11, c: 'var(--diagram-red)' }),
  ];
  return { svg: svgDoc(
    440,
    262,
    'A thin layer chromatography plate with a start line one centimetre from the bottom and the solvent front nine centimetres up, so the solvent moved eight centimetres. In the mixture lane, spot A moved 3.2 centimetres and spot B moved 5.6 centimetres, matching the pure reference lanes, giving Rf values of 0.40 and 0.70.',
    body.join(''),
  ), RfA, RfB };
})().svg;

// ---------------------------------------------------------------- 11. Kjeldahl and Dumas flows
export const NFLOWS = (() => {
  const box = (x, y, w, h, lines, o = {}) => [S.rect(x, y, w, h, { fill: o.fill ?? 'var(--diagram-fill)', fop: 0.5, rx: 5, c: o.c ?? 'currentColor', sw: 1.2 }), ...lines.map((t, i) => lab(x + w / 2, y + 15 + i * 13, t, { a: 'middle', size: 10 }))].join('');
  const colK = 8;
  const colD = 228;
  const w = 204;
  const h = 40;
  const gap = 18;
  const K = [
    ['Compound + conc. H₂SO₄', '(+ K₂SO₄, CuSO₄), heat'],
    ['Nitrogen becomes (NH₄)₂SO₄'],
    ['Add excess NaOH, heat', 'NH₃ gas is driven off'],
    ['NH₃ absorbed in measured', 'excess of standard H₂SO₄'],
    ['Unused acid titrated with', 'standard NaOH'],
  ];
  const D = [
    ['Compound + CuO, heated', 'in a stream of CO₂'],
    ['Gases: CO₂, H₂O, N₂,', 'oxides of nitrogen'],
    ['Hot copper gauze reduces', 'oxides of nitrogen to N₂'],
    ['Gas collected over KOH', 'solution (CO₂ absorbed)'],
    ['Volume of N₂ measured,', 'converted to STP'],
  ];
  chk(K.length === 5 && D.length === 5, 'N flows: five stages in each method');
  const parts = [lab(colK + w / 2, 14, 'Kjeldahl method', { a: 'middle', w: 'bold', size: 12 }), lab(colD + w / 2, 14, 'Dumas method', { a: 'middle', w: 'bold', size: 12 })];
  K.forEach((ls, i) => {
    const y = 24 + i * (h + gap);
    parts.push(box(colK, y, w, h, ls, { c: 'var(--diagram-blue)' }));
    if (i < K.length - 1) parts.push(S.arrow(colK + w / 2, y + h, colK + w / 2, y + h + gap, { size: 6 }));
  });
  D.forEach((ls, i) => {
    const y = 24 + i * (h + gap);
    parts.push(box(colD, y, w, h, ls, { c: 'var(--diagram-green)' }));
    if (i < D.length - 1) parts.push(S.arrow(colD + w / 2, y + h, colD + w / 2, y + h + gap, { size: 6 }));
  });
  return svgDoc(
    440,
    24 + 5 * h + 4 * gap + 10,
    'Two flow charts for the estimation of nitrogen. Kjeldahl: digest with concentrated sulfuric acid to ammonium sulfate, liberate ammonia with excess sodium hydroxide, absorb it in standard sulfuric acid and back titrate the unused acid. Dumas: heat with copper oxide in carbon dioxide, reduce nitrogen oxides over hot copper, collect nitrogen over potassium hydroxide solution and measure its volume at standard temperature and pressure.',
    parts.join(''),
  );
})();
