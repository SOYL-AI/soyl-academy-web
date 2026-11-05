// Orbit-structure (shell) diagrams for ICSE 9 Chemistry ch08 Chemical Bonding: electron transfer in NaCl, MgCl2 and CaO,
// shared pairs in H2, Cl2, HCl, O2, N2, H2O, NH3, CH4 and CCl4, and radicals from bond breaking. Electrons of one atom are
// blue dots and electrons of the other atom are red crosses. Drawn with the S helpers, palette colours only.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { config } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED });
const G = 8; // gap between shells
const R0 = (sym) => (sym === 'H' ? 9 : 11); // nucleus radius
const shellR = (sym, k) => R0(sym) + G * k; // radius of shell k (1 = K)
const rad = (deg) => (deg * Math.PI) / 180;
const dot = (x, y) => S.circle(x, y, 2.3, { fill: BLUE, c: BLUE, sw: 0.6 });
const cross = (x, y) => S.line(x - 2.7, y - 2.7, x + 2.7, y + 2.7, { c: RED, w: 1.5 }) + S.line(x - 2.7, y + 2.7, x + 2.7, y - 2.7, { c: RED, w: 1.5 });
const mark = (m, x, y) => (m === 'x' ? cross(x, y) : dot(x, y));
const polar = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];

/** Nucleus with its symbol. */
const nucleus = (cx, cy, sym) => S.circle(cx, cy, R0(sym), { fill: 'var(--diagram-fill)', c: 'currentColor', sw: 1.4 }) + S.text(cx, cy + 3.6, sym, { a: 'middle', size: 10, w: 'bold' });

/** Shells and electrons of one atom or ion: marks[k] is a string of 'd' and 'x', one per electron of shell k+1. */
function shells(cx, cy, sym, marks, { rot = -90 } = {}) {
  const out = [];
  marks.forEach((str, k) => {
    const rr = shellR(sym, k + 1);
    out.push(S.circle(cx, cy, rr, { c: MUTED, sw: 1.1 }));
    const n = str.length;
    for (let i = 0; i < n; i++) {
      const [x, y] = polar(cx, cy, rr, rot + k * 19 + (360 / n) * i);
      out.push(mark(str[i], x, y));
    }
  });
  out.push(nucleus(cx, cy, sym));
  return out.join('');
}
const full = (counts, m) => counts.map((n) => m.repeat(n));
const bracket = (cx, cy, rr, charge) => {
  const x1 = cx - rr - 6;
  const x2 = cx + rr + 6;
  const y1 = cy - rr - 4;
  const y2 = cy + rr + 4;
  return S.path(`M${x1 + 5} ${y1} L${x1} ${y1} L${x1} ${y2} L${x1 + 5} ${y2}`, { w: 1.3 }) + S.path(`M${x2 - 5} ${y1} L${x2} ${y1} L${x2} ${y2} L${x2 - 5} ${y2}`, { w: 1.3 }) + S.text(x2 + 3, y1 + 8, charge, { size: 13, w: 'bold' });
};

// ---------------------------------------------------------------- ionic: electron transfer
const outerMarks = (sym, own) => full(config(sym), own);
function ionic(kind, lettered) {
  const p = [];
  if (kind === 'nacl') {
    const y = 66;
    p.push(shells(50, y, 'Na', outerMarks('Na', 'x')), lab(88, y + 4, '+', { size: 14, a: 'middle' }), shells(130, y, 'Cl', outerMarks('Cl', 'd')));
    p.push(S.arrow(185, y, 238, y, { w: 1.8 }));
    p.push(shells(292, y, 'Na', ['xx', 'xxxxxxxx']), bracket(292, y, shellR('Na', 2), '+'));
    p.push(shells(378, y, 'Cl', ['dd', 'dddddddd', 'ddddddd'].map((s, i) => (i === 2 ? s + 'x' : s))), bracket(378, y, shellR('Cl', 3), '−'));
    if (lettered) {
      p.push(L(30, 30, 'A'), S.lead(42, 28, 56, 40));
      p.push(L(112, 30, 'B'), S.lead(124, 28, 134, 40));
      p.push(L(262, 22, 'C'), S.lead(272, 26, 286, 42));
      p.push(L(402, 22, 'D'), S.lead(402, 28, 398, 40));
      p.push(L(424, 100, 'E'), S.lead(420, 96, 392, 86));
      p.push(lab(10, 130, 'Electrons of the sodium atom: crosses.  Electrons of the chlorine atom: dots.', { size: 10, c: MUTED }));
      return svgDoc(460, 140, 'Orbit structure diagram for the formation of an electrovalent compound with parts lettered A to E: two atoms on the left, an arrow, and two ions in brackets on the right', p.join(''));
    }
    p.push(lab(50, 122, 'Sodium atom', { a: 'middle' }), lab(50, 136, '2, 8, 1', { a: 'middle' }), lab(130, 122, 'Chlorine atom', { a: 'middle' }), lab(130, 136, '2, 8, 7', { a: 'middle' }));
    p.push(lab(292, 122, 'Sodium ion', { a: 'middle' }), lab(292, 136, '2, 8', { a: 'middle' }), lab(378, 122, 'Chloride ion', { a: 'middle' }), lab(378, 136, '2, 8, 8', { a: 'middle' }));
    p.push(lab(212, 52, 'one electron', { a: 'middle', size: 10, c: MUTED }), lab(212, 84, 'transferred', { a: 'middle', size: 10, c: MUTED }));
    p.push(lab(10, 160, 'Crosses: electrons of the sodium atom.  Dots: electrons of the chlorine atom.', { size: 10, c: MUTED }));
    return svgDoc(460, 170, 'Formation of sodium chloride. A sodium atom with 2, 8, 1 electrons gives one electron to a chlorine atom with 2, 8, 7 electrons, forming a sodium ion with 2, 8 and a chloride ion with 2, 8, 8 held together by electrostatic attraction', p.join(''));
  }
  if (kind === 'mgcl2') {
    const y = 66;
    p.push(shells(42, y, 'Cl', outerMarks('Cl', 'd')), shells(112, y, 'Mg', outerMarks('Mg', 'x')), shells(182, y, 'Cl', outerMarks('Cl', 'd')));
    p.push(S.arrow(232, y, 280, y, { w: 1.8 }));
    p.push(shells(334, y, 'Cl', ['dd', 'dddddddd', 'dddddddx']), bracket(334, y, shellR('Cl', 3), '−'));
    p.push(shells(428, y, 'Mg', ['xx', 'xxxxxxxx']), bracket(428, y, shellR('Mg', 2), '2+'));
    p.push(shells(520, y, 'Cl', ['dd', 'dddddddd', 'dddddddx']), bracket(520, y, shellR('Cl', 3), '−'));
    p.push(lab(42, 122, 'Cl atom', { a: 'middle' }), lab(112, 122, 'Mg atom', { a: 'middle' }), lab(182, 122, 'Cl atom', { a: 'middle' }));
    p.push(lab(42, 136, '2, 8, 7', { a: 'middle' }), lab(112, 136, '2, 8, 2', { a: 'middle' }), lab(182, 136, '2, 8, 7', { a: 'middle' }));
    p.push(lab(334, 122, 'Cl⁻ ion', { a: 'middle' }), lab(428, 122, 'Mg²⁺ ion', { a: 'middle' }), lab(520, 122, 'Cl⁻ ion', { a: 'middle' }));
    p.push(lab(334, 136, '2, 8, 8', { a: 'middle' }), lab(428, 136, '2, 8', { a: 'middle' }), lab(520, 136, '2, 8, 8', { a: 'middle' }));
    p.push(lab(10, 160, 'Crosses: electrons of the magnesium atom.  Dots: electrons of the chlorine atoms.', { size: 10, c: MUTED }));
    return svgDoc(580, 170, 'Formation of magnesium chloride. A magnesium atom with 2, 8, 2 electrons gives one electron to each of two chlorine atoms, forming a magnesium ion with 2, 8 and two chloride ions with 2, 8, 8', p.join(''));
  }
  // calcium oxide
  const y = 70;
  p.push(shells(52, y, 'Ca', outerMarks('Ca', 'x')), lab(110, y + 4, '+', { size: 14, a: 'middle' }), shells(160, y, 'O', outerMarks('O', 'd')));
  p.push(S.arrow(208, y, 262, y, { w: 1.8 }));
  p.push(shells(322, y, 'Ca', ['xx', 'xxxxxxxx', 'xxxxxxxx']), bracket(322, y, shellR('Ca', 3), '2+'));
  p.push(shells(414, y, 'O', ['dd', 'dddddd' + 'xx']), bracket(414, y, shellR('O', 2), '2−'));
  p.push(lab(52, 128, 'Calcium atom', { a: 'middle' }), lab(52, 142, '2, 8, 8, 2', { a: 'middle' }), lab(160, 128, 'Oxygen atom', { a: 'middle' }), lab(160, 142, '2, 6', { a: 'middle' }));
  p.push(lab(322, 128, 'Calcium ion', { a: 'middle' }), lab(322, 142, '2, 8, 8', { a: 'middle' }), lab(414, 128, 'Oxide ion', { a: 'middle' }), lab(414, 142, '2, 8', { a: 'middle' }));
  p.push(lab(235, 56, 'two electrons', { a: 'middle', size: 10, c: MUTED }), lab(235, 90, 'transferred', { a: 'middle', size: 10, c: MUTED }));
  p.push(lab(10, 166, 'Crosses: electrons of the calcium atom.  Dots: electrons of the oxygen atom.', { size: 10, c: MUTED }));
  return svgDoc(470, 176, 'Formation of calcium oxide. A calcium atom with 2, 8, 8, 2 electrons gives two electrons to an oxygen atom with 2, 6 electrons, forming a calcium ion with 2, 8, 8 and an oxide ion with 2, 8', p.join(''));
}
export const NACL = ionic('nacl', false);
export const NACL_LETTERED = ionic('nacl', true);
export const MGCL2 = ionic('mgcl2', false);
export const CAO = ionic('cao', false);

// ---------------------------------------------------------------- covalent: shared pairs
/**
 * Molecule engine. atoms: { sym, x, y, own: 'd'|'x', lone: [angles] or 'auto' }. bonds: [i, j, order].
 * Shared electrons sit where the outer shells overlap; inner and unshared electrons sit on their own shells.
 */
function molecule(atoms, bonds, { lettered = null } = {}) {
  const p = [];
  const info = atoms.map((a) => {
    const counts = config(a.sym);
    return { ...a, counts, R: shellR(a.sym, counts.length), shared: 0, dirs: [] };
  });
  for (const [i, j, o] of bonds) {
    info[i].shared += o;
    info[j].shared += o;
    info[i].dirs.push((Math.atan2(info[j].y - info[i].y, info[j].x - info[i].x) * 180) / Math.PI);
    info[j].dirs.push((Math.atan2(info[i].y - info[j].y, info[i].x - info[j].x) * 180) / Math.PI);
  }
  // shells and unshared electrons
  for (const a of info) {
    counts: {
      a.counts.forEach((n, k) => {
        const rr = shellR(a.sym, k + 1);
        p.push(S.circle(a.x, a.y, rr, { c: MUTED, sw: 1.1 }));
        if (k < a.counts.length - 1) for (let t = 0; t < n; t++) {
          const [x, y] = polar(a.x, a.y, rr, -90 + k * 19 + (360 / n) * t);
          p.push(mark(a.own, x, y));
        }
      });
    }
    const loneN = a.counts.at(-1) - a.shared;
    if (loneN > 0) {
      // free arcs between the bond windows
      const W = 34;
      const dirs = a.dirs.map((d) => ((d % 360) + 360) % 360).sort((u, v) => u - v);
      let arcs = [];
      if (dirs.length === 0) arcs = [[0, 360]];
      else dirs.forEach((d, i) => {
        const nxt = i === dirs.length - 1 ? dirs[0] + 360 : dirs[i + 1];
        const lo = d + W;
        const hi = nxt - W;
        if (hi - lo > 36) arcs.push([lo, hi]);
      });
      const total = arcs.reduce((s, [lo, hi]) => s + (hi - lo), 0);
      const groups = Math.ceil(loneN / 2);
      const at = (frac) => {
        let t = frac * total;
        for (const [lo, hi] of arcs) {
          if (t <= hi - lo) return lo + t;
          t -= hi - lo;
        }
        return arcs[0][0];
      };
      let left = loneN;
      for (let g = 0; g < groups; g++) {
        const c = at((g + 0.5) / groups);
        const n = Math.min(2, left);
        left -= n;
        const offs = n === 2 ? [-6, 6] : [0];
        for (const o of offs) {
          const [x, y] = polar(a.x, a.y, a.R, c + o);
          p.push(mark(a.own, x, y));
        }
      }
    }
  }
  // shared electrons
  for (const [i, j, o] of bonds) {
    const A = info[i];
    const B = info[j];
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const d = Math.hypot(dx, dy);
    const ux = dx / d;
    const uy = dy / d;
    const a = (d * d + A.R * A.R - B.R * B.R) / (2 * d);
    const h = Math.sqrt(Math.max(0, A.R * A.R - a * a));
    const mx = A.x + ux * a;
    const my = A.y + uy * a;
    const px = -uy;
    const py = ux;
    const n = 2 * o;
    if (o === 1) {
      p.push(mark(A.own, mx + px * h, my + py * h), mark(B.own, mx - px * h, my - py * h));
    } else {
      const step = o === 2 ? 7 : 6.2;
      for (let k = 0; k < n; k++) {
        const off = (k - (n - 1) / 2) * step;
        p.push(mark(k % 2 === 0 ? A.own : B.own, mx + px * off, my + py * off));
      }
    }
  }
  for (const a of info) p.push(nucleus(a.x, a.y, a.sym));
  return p.join('');
}
const D = (sym, x, y, own, extra = {}) => ({ sym, x, y, own, ...extra });
/** Position at distance `dist` from (x, y) at angle `deg`. */
const at = (x, y, dist, deg) => polar(x, y, dist, deg);
const dist = (a, b, ov) => shellR(a, config(a).length) + shellR(b, config(b).length) - ov;

const cap = (x, y, s, o) => S.text(x, y, s, { a: 'middle', size: 12, w: 'bold', ...o });
const NOTE = (y) => lab(10, y, 'Dots and crosses show electrons of the two different atoms.', { size: 10, c: MUTED });

export const COV_SINGLE = (() => {
  const p = [];
  // H2, Cl2, HCl
  const y = 62;
  const dH = dist('H', 'H', 7);
  p.push(molecule([D('H', 62 - dH / 2, y, 'd'), D('H', 62 + dH / 2, y, 'x')], [[0, 1, 1]]));
  const dC = dist('Cl', 'Cl', 9);
  p.push(molecule([D('Cl', 190 - dC / 2, y, 'd'), D('Cl', 190 + dC / 2, y, 'x')], [[0, 1, 1]]));
  const dHC = dist('H', 'Cl', 8);
  p.push(molecule([D('H', 360 - dHC / 2 - 8, y, 'x'), D('Cl', 360 + dHC / 2 - 8, y, 'd')], [[0, 1, 1]]));
  p.push(cap(62, 124, 'H₂'), cap(190, 124, 'Cl₂'), cap(364, 124, 'HCl'));
  p.push(lab(62, 140, 'H–H', { a: 'middle' }), lab(190, 140, 'Cl–Cl', { a: 'middle' }), lab(364, 140, 'H–Cl', { a: 'middle' }));
  p.push(NOTE(162));
  return svgDoc(460, 170, 'Orbit structures of hydrogen, chlorine and hydrogen chloride molecules. Hydrogen has one shared pair, chlorine has one shared pair with three lone pairs on each atom, and hydrogen chloride has one shared pair with three lone pairs on chlorine', p.join(''));
})();

export const COV_MULTI = (() => {
  const p = [];
  const y = 60;
  const dO = dist('O', 'O', 16);
  p.push(molecule([D('O', 90 - dO / 2, y, 'd'), D('O', 90 + dO / 2, y, 'x')], [[0, 1, 2]]));
  const dN = dist('N', 'N', 22);
  p.push(molecule([D('N', 260 - dN / 2, y, 'd'), D('N', 260 + dN / 2, y, 'x')], [[0, 1, 3]]));
  p.push(cap(90, 118, 'O₂'), cap(260, 118, 'N₂'));
  p.push(lab(90, 134, 'O=O: double bond, 2 shared pairs', { a: 'middle' }), lab(260, 134, 'N≡N: triple bond, 3 shared pairs', { a: 'middle' }));
  p.push(NOTE(156));
  return svgDoc(380, 164, 'Orbit structures of oxygen and nitrogen molecules. Oxygen has two shared pairs, a double bond, and two lone pairs on each atom. Nitrogen has three shared pairs, a triple bond, and one lone pair on each atom', p.join(''));
})();

function waterAmmonia(lettered) {
  const p = [];
  // water: oxygen at the top, two hydrogen atoms below
  const dOH = dist('O', 'H', 8);
  const oy = 52;
  const [h1x, h1y] = at(90, oy, dOH, 90 - 52);
  const [h2x, h2y] = at(90, oy, dOH, 90 + 52);
  p.push(molecule([D('O', 90, oy, 'd'), D('H', h1x, h1y, 'x'), D('H', h2x, h2y, 'x')], [[0, 1, 1], [0, 2, 1]]));
  // ammonia: nitrogen with three hydrogen atoms
  const dNH = dist('N', 'H', 8);
  const nx = 285;
  const ny = 56;
  const [a1x, a1y] = at(nx, ny, dNH, 180);
  const [a2x, a2y] = at(nx, ny, dNH, 0);
  const [a3x, a3y] = at(nx, ny, dNH, 90);
  p.push(molecule([D('N', nx, ny, 'd'), D('H', a1x, a1y, 'x'), D('H', a2x, a2y, 'x'), D('H', a3x, a3y, 'x')], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]));
  if (lettered) {
    // lettered ammonia: A nitrogen atom, B hydrogen atom, C shared pair, D lone pair, E outer shell of nitrogen
    p.length = 0;
    const lx = 150;
    const ly = 80;
    p.push(molecule([D('N', lx, ly, 'd'), D('H', lx - dNH, ly, 'x'), D('H', lx + dNH, ly, 'x'), D('H', lx, ly + dNH, 'x')], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]));
    const R = shellR('N', 2);
    p.push(L(20, 36, 'A'), S.lead(34, 36, lx - 5, ly - 3));
    p.push(L(20, 150, 'B'), S.lead(34, 146, lx - dNH - 4, ly + 4));
    p.push(L(20, 100, 'C'), S.lead(34, 98, lx - R + 3, ly - 12));
    p.push(L(276, 36, 'D'), S.lead(272, 36, lx + 6, ly - R + 2));
    p.push(L(276, 130, 'E'), S.lead(272, 126, lx + R * 0.7, ly + R * 0.7));
    p.push(lab(10, 190, 'Dots: nitrogen electrons.  Crosses: hydrogen electrons.', { size: 10, c: MUTED }));
    return svgDoc(300, 200, 'Orbit structure of a molecule with five parts lettered A to E: a central atom with three hydrogen atoms attached by shared pairs, and one pair of electrons not shared', p.join(''));
  }
  p.push(cap(90, 138, 'H₂O'), cap(285, 144, 'NH₃'));
  p.push(lab(90, 154, 'O: 2 shared pairs, 2 lone pairs', { a: 'middle' }), lab(285, 160, 'N: 3 shared pairs, 1 lone pair', { a: 'middle' }));
  p.push(NOTE(184));
  return svgDoc(420, 192, 'Orbit structures of water and ammonia molecules. Oxygen shares one pair with each of two hydrogen atoms and keeps two lone pairs. Nitrogen shares one pair with each of three hydrogen atoms and keeps one lone pair', p.join(''));
}
export const COV_WATER = waterAmmonia(false);
export const COV_AMMONIA_LETTERED = waterAmmonia(true);

export const COV_METHANE = (() => {
  const p = [];
  // methane
  const dCH = dist('C', 'H', 8);
  const mx = 100;
  const my = 82;
  const hs = [0, 90, 180, 270].map((a) => at(mx, my, dCH, a));
  p.push(molecule([D('C', mx, my, 'd'), ...hs.map(([x, y]) => D('H', x, y, 'x'))], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]]));
  // carbon tetrachloride
  const dCC = dist('C', 'Cl', 9);
  const cx = 290;
  const cy = 98;
  const cls = [0, 90, 180, 270].map((a) => at(cx, cy, dCC, a));
  p.push(molecule([D('C', cx, cy, 'd'), ...cls.map(([x, y]) => D('Cl', x, y, 'x'))], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]]));
  p.push(cap(100, 172, 'CH₄'), cap(290, 208, 'CCl₄'));
  p.push(lab(100, 188, '4 shared pairs', { a: 'middle' }), lab(100, 202, 'no lone pair on C', { a: 'middle' }), lab(290, 224, '4 shared pairs, 3 lone pairs on each Cl', { a: 'middle' }));
  p.push(NOTE(246));
  return svgDoc(400, 254, 'Orbit structures of methane and carbon tetrachloride molecules. In methane, carbon shares one pair with each of four hydrogen atoms. In carbon tetrachloride, carbon shares one pair with each of four chlorine atoms, and each chlorine keeps three lone pairs', p.join(''));
})();

// ---------------------------------------------------------------- radicals
export const RADICALS = (() => {
  const p = [];
  // H2 -> 2 H.   (top)        Cl2 -> 2 Cl.   (bottom)
  const dH = dist('H', 'H', 7);
  p.push(molecule([D('H', 62 - dH / 2, 56, 'd'), D('H', 62 + dH / 2, 56, 'x')], [[0, 1, 1]]));
  p.push(S.arrow(120, 56, 170, 56, { w: 1.8 }), lab(145, 46, 'light', { a: 'middle', size: 10, c: MUTED }));
  p.push(shells(214, 56, 'H', ['d']), lab(236, 60, '+', { a: 'middle', size: 14 }), shells(262, 56, 'H', ['x']));
  p.push(lab(214, 90, 'H•', { a: 'middle', w: 'bold' }), lab(262, 90, 'H•', { a: 'middle', w: 'bold' }));
  p.push(lab(300, 52, 'two hydrogen radicals,', { size: 10 }), lab(300, 66, 'one unpaired electron each', { size: 10 }));
  const dC = dist('Cl', 'Cl', 9);
  p.push(molecule([D('Cl', 70 - dC / 2, 168, 'd'), D('Cl', 70 + dC / 2, 168, 'x')], [[0, 1, 1]]));
  p.push(S.arrow(152, 168, 196, 168, { w: 1.8 }), lab(174, 158, 'light', { a: 'middle', size: 10, c: MUTED }));
  p.push(shells(240, 168, 'Cl', ['dd', 'dddddddd', 'ddddddd'], { rot: -90 }), lab(294, 172, '+', { a: 'middle', size: 14 }), shells(344, 168, 'Cl', ['xx', 'xxxxxxxx', 'xxxxxxx']));
  p.push(lab(240, 214, 'Cl•', { a: 'middle', w: 'bold' }), lab(344, 214, 'Cl•', { a: 'middle', w: 'bold' }));
  p.push(lab(384, 168, 'two chlorine', { size: 10 }), lab(384, 182, 'radicals', { size: 10 }));
  p.push(lab(10, 238, 'The shared pair splits: each atom keeps one of the two electrons.', { size: 10, c: MUTED }));
  return svgDoc(470, 246, 'Formation of radicals. A hydrogen molecule splits into two hydrogen radicals, and a chlorine molecule splits into two chlorine radicals, when the shared pair is broken so that each atom keeps one electron', p.join(''));
})();
