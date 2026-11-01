// Hand-drawn electron dot (Lewis) schematics for ICSE 10 Chemistry ch02 (allow-listed elements, palette colours only).
// Dots are electrons of one atom, crosses electrons of the other; a shared pair sits between the two symbols.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const dot = (x, y, c = 'var(--diagram-blue)') => S.circle(x, y, 2.2, { fill: c, sw: 0, c });
const cross = (x, y, c = 'var(--diagram-red)') => S.line(x - 2.5, y - 2.5, x + 2.5, y + 2.5, { c, w: 1.4 }) + S.line(x - 2.5, y + 2.5, x + 2.5, y - 2.5, { c, w: 1.4 });
const mark = (m, x, y) => (m === 'x' ? cross(x, y) : dot(x, y));
/** Symbol with electron marks on each side: sides = { t, r, b, l } strings of 'd' (dot) / 'x' (cross), up to two each. */
function lewis(cx, cy, sym, sides = {}, { size = 15, gap = 14 } = {}) {
  const out = [S.text(cx, cy + 5, sym, { a: 'middle', size, w: 'bold' })];
  const place = (str, fx) => [...(str || '')].map((m, i, a) => fx(m, a.length === 1 ? 0 : i === 0 ? -4 : 4));
  out.push(...place(sides.t, (m, o) => mark(m, cx + o, cy - gap)));
  out.push(...place(sides.b, (m, o) => mark(m, cx + o, cy + gap)));
  out.push(...place(sides.l, (m, o) => mark(m, cx - gap - 1, cy + o)));
  out.push(...place(sides.r, (m, o) => mark(m, cx + gap + 1, cy + o)));
  return out.join('');
}
const bracket = (x, y, w, h, charge) => S.path(`M${x + 5} ${y} L${x} ${y} L${x} ${y + h} L${x + 5} ${y + h}`, { w: 1.2 }) + S.path(`M${x + w - 5} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x + w - 5} ${y + h}`, { w: 1.2 }) + lab(x + w + 3, y + 8, charge, { size: 11, w: 'bold' });

// 1. Electron transfer: NaCl, MgCl2, CaO.
export const IONIC = svgDoc(
  460,
  260,
  'Electron dot diagrams for three ionic compounds. Top row: a sodium atom with one outer electron, shown as a cross, transfers it to a chlorine atom with seven outer electrons, shown as dots, giving a sodium ion with charge plus one and a chloride ion with a complete octet and charge minus one. Middle row: a magnesium atom gives one electron to each of two chlorine atoms, forming Mg two plus and two chloride ions. Bottom row: a calcium atom gives two electrons to an oxygen atom with six outer electrons, forming Ca two plus and an oxide ion with a complete octet and charge minus two.',
  [
    lewis(30, 40, 'Na', { r: 'x' }), lab(52, 45, '+', { size: 13 }), lewis(85, 40, 'Cl', { t: 'dd', r: 'dd', b: 'dd', l: 'd' }),
    S.arrow(115, 40, 165, 40), lab(140, 32, 'transfer', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    bracket(178, 25, 40, 30, '+'), S.text(198, 45, 'Na', { a: 'middle', size: 15, w: 'bold' }),
    bracket(250, 18, 64, 44, '−'), lewis(282, 40, 'Cl', { t: 'dd', r: 'dd', b: 'dd', l: 'xd' }),
    lab(360, 45, 'NaCl', { size: 12, w: 'bold' }),

    lewis(85, 120, 'Mg', { l: 'x', r: 'x' }), lewis(30, 120, 'Cl', { t: 'dd', l: 'dd', b: 'dd', r: 'd' }), lewis(140, 120, 'Cl', { t: 'dd', r: 'dd', b: 'dd', l: 'd' }),
    S.arrow(170, 120, 205, 120),
    bracket(212, 98, 64, 44, '−'), lewis(244, 120, 'Cl', { t: 'dd', l: 'dd', b: 'dd', r: 'dx' }),
    bracket(292, 105, 40, 30, '2+'), S.text(312, 125, 'Mg', { a: 'middle', size: 15, w: 'bold' }),
    bracket(350, 98, 64, 44, '−'), lewis(382, 120, 'Cl', { t: 'dd', r: 'dd', b: 'dd', l: 'xd' }),
    lab(395, 160, 'MgCl₂', { size: 12, w: 'bold' }),

    lewis(30, 210, 'Ca', { r: 'xx' }), lab(55, 215, '+', { size: 13 }), lewis(90, 210, 'O', { t: 'dd', r: 'dd', b: 'd', l: 'd' }),
    S.arrow(118, 210, 165, 210),
    bracket(178, 195, 40, 30, '2+'), S.text(198, 215, 'Ca', { a: 'middle', size: 15, w: 'bold' }),
    bracket(250, 188, 64, 44, '2−'), lewis(282, 210, 'O', { t: 'dd', r: 'dd', b: 'dx', l: 'dx' }),
    lab(360, 215, 'CaO', { size: 12, w: 'bold' }),
    lab(12, 252, '× electron of the metal   • electron of the non-metal', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Covalent molecules: Cl2, O2, N2, CH4.
export const COVALENT = svgDoc(
  460,
  200,
  'Electron dot diagrams for four covalent molecules. Chlorine shares one pair of electrons between two chlorine atoms, a single bond, and each atom keeps three lone pairs. Oxygen shares two pairs, a double bond, and each atom keeps two lone pairs. Nitrogen shares three pairs, a triple bond, and each atom keeps one lone pair. Methane has a carbon atom sharing one pair with each of four hydrogen atoms.',
  [
    lewis(30, 50, 'Cl', { t: 'dd', l: 'dd', b: 'dd', r: 'd' }), cross(52, 50), lewis(74, 50, 'Cl', { t: 'xx', r: 'xx', b: 'xx' }),
    lab(52, 90, 'Cl₂: single bond', { a: 'middle', size: 10 }),
    lewis(150, 50, 'O', { t: 'dd', l: 'dd' }), dot(167, 46), dot(167, 54), cross(175, 46), cross(175, 54), lewis(192, 50, 'O', { t: 'xx', r: 'xx' }),
    lab(171, 90, 'O₂: double bond', { a: 'middle', size: 10 }),
    lewis(265, 50, 'N', { l: 'dd' }), dot(282, 43), dot(282, 50), dot(282, 57), cross(290, 43), cross(290, 50), cross(290, 57), lewis(307, 50, 'N', { r: 'xx' }),
    lab(286, 90, 'N₂: triple bond', { a: 'middle', size: 10 }),
    S.text(400, 145, 'C', { a: 'middle', size: 15, w: 'bold' }),
    S.text(400, 105, 'H', { a: 'middle', size: 13 }), S.text(400, 192, 'H', { a: 'middle', size: 13 }), S.text(360, 145, 'H', { a: 'middle', size: 13 }), S.text(440, 145, 'H', { a: 'middle', size: 13 }),
    dot(397, 124), cross(403, 124), dot(397, 168), cross(403, 168), dot(380, 137), cross(380, 145), dot(420, 137), cross(420, 145),
    lab(400, 82, 'CH₄', { a: 'middle', size: 10 }),
    lab(12, 190, '• and × are electrons from the two different atoms', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Polar molecules and coordinate bonds: H2O, NH3, H3O+ and NH4+.
export const POLAR = svgDoc(
  460,
  220,
  'Electron dot diagrams. Water: oxygen shares one pair with each of two hydrogen atoms and keeps two lone pairs; oxygen carries a partial negative charge and each hydrogen a partial positive charge. Ammonia: nitrogen shares one pair with each of three hydrogen atoms and keeps one lone pair. Hydronium ion: a hydrogen ion with no electrons accepts one lone pair of the oxygen of water, giving H3O plus. Ammonium ion: a hydrogen ion accepts the lone pair of ammonia, giving NH4 plus; the donated pair forms a coordinate bond, shown by an arrow.',
  [
    lewis(60, 55, 'O', { t: 'dd', b: 'dd' }), S.text(18, 60, 'H', { a: 'middle', size: 13 }), S.text(102, 60, 'H', { a: 'middle', size: 13 }),
    dot(42, 51), cross(36, 59), dot(78, 51), cross(84, 59),
    lab(60, 26, 'δ−', { a: 'middle', size: 10, c: 'var(--diagram-red)' }), lab(18, 82, 'δ+', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }), lab(102, 82, 'δ+', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    lab(60, 105, 'H₂O', { a: 'middle', size: 10 }),
    lewis(200, 55, 'N', { t: 'dd' }), S.text(158, 60, 'H', { a: 'middle', size: 13 }), S.text(242, 60, 'H', { a: 'middle', size: 13 }), S.text(200, 100, 'H', { a: 'middle', size: 13 }),
    dot(182, 51), cross(176, 59), dot(218, 51), cross(224, 59), dot(196, 76), cross(204, 76),
    lab(200, 120, 'NH₃ (one lone pair)', { a: 'middle', size: 10 }),
    lab(20, 160, 'H₂O', { size: 12, w: 'bold' }), lab(52, 160, '+ H⁺ →', { size: 12 }),
    bracket(100, 140, 92, 32, '+'), S.text(146, 160, 'H—O—H', { a: 'middle', size: 13, w: 'bold' }), S.arrow(146, 170, 146, 196, { c: 'var(--diagram-accent)' }), S.text(146, 210, 'H', { a: 'middle', size: 13 }),
    lab(146, 135, 'H₃O⁺', { a: 'middle', size: 10 }),
    lab(250, 160, 'NH₃', { size: 12, w: 'bold' }), lab(282, 160, '+ H⁺ →', { size: 12 }),
    bracket(330, 140, 92, 32, '+'), S.text(376, 160, 'H—N—H', { a: 'middle', size: 13, w: 'bold' }), S.arrow(376, 170, 376, 196, { c: 'var(--diagram-accent)' }), S.text(376, 210, 'H', { a: 'middle', size: 13 }),
    S.line(376, 140, 376, 128, { w: 1.5 }), S.text(376, 124, 'H', { a: 'middle', size: 13 }),
    lab(430, 200, 'NH₄⁺', { size: 10 }),
    lab(250, 214, '→ coordinate bond (lone pair donated)', { size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);
