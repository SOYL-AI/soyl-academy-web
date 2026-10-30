// Hand-drawn SVG schematics for ISC 12 Chemistry ch03–ch04 electrochemistry (from the CBSE 12 ch02 set; allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const liquid = (x, y, w, h, c = 'var(--diagram-fill)', fop) => S.rect(x, y, w, h, { fill: c, sw: 0, ...(fop !== undefined ? { fop } : {}) });
const beaker = (x, y, w, h) => S.path(`M${x} ${y} V${y + h} H${x + w} V${y}`, { w: 2 });

// 1. Daniell cell with salt bridge and voltmeter.
export const DANIELL = svgDoc(
  360,
  246,
  'Daniell cell: a zinc rod dips into zinc sulfate solution in the left beaker and a copper rod into blue copper sulfate solution in the right beaker. A salt bridge joins the two solutions. Wires from the rods meet at a voltmeter; electrons flow through the wire from zinc to copper. Zinc is the anode (negative) and copper is the cathode (positive).',
  [
    liquid(31, 120, 108, 69),
    liquid(221, 120, 108, 69, 'var(--diagram-blue)', 0.3),
    beaker(30, 90, 110, 100),
    beaker(220, 90, 110, 100),
    S.rect(74, 64, 14, 112, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.rect(272, 64, 14, 112, { fill: 'var(--diagram-brown)', sw: 1 }),
    S.path('M118 150 V74 H242 V150', { w: 10, c: 'var(--diagram-muted)', cap: 'butt' }),
    S.path('M81 64 V30 H164', { w: 1.5 }),
    S.path('M196 30 H279 V64', { w: 1.5 }),
    S.circle(180, 30, 16, { fill: 'var(--diagram-fill)' }),
    S.text(180, 35, 'V', { a: 'middle', size: 13, w: 'bold' }),
    S.arrow(100, 16, 150, 16, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    S.arrow(210, 16, 260, 16, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    lab(180, 12, 'electrons', { a: 'middle', c: 'var(--diagram-accent)', size: 10 }),
    lab(180, 66, 'Salt bridge', { a: 'middle' }),
    lab(85, 208, 'Zinc anode (−)', { a: 'middle', w: 'bold' }),
    lab(85, 222, 'zinc sulfate solution', { a: 'middle', size: 10 }),
    lab(275, 208, 'Copper cathode (+)', { a: 'middle', w: 'bold' }),
    lab(275, 222, 'copper sulfate solution', { a: 'middle', size: 10 }),
    lab(85, 236, 'oxidation', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    lab(275, 236, 'reduction', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 2. Standard hydrogen electrode.
export const SHE = svgDoc(
  300,
  230,
  'Standard hydrogen electrode: a platinum foil coated with platinum black hangs inside a glass tube dipping into an acid solution with hydrogen ion concentration 1 mol per litre. Hydrogen gas at 1 bar is bubbled in at the top and escapes as bubbles around the foil. A wire from the foil leads out.',
  [
    liquid(61, 110, 158, 79),
    beaker(60, 70, 160, 120),
    S.path('M118 30 V150 M162 30 V150', { w: 1.5 }),
    S.path('M118 30 H162', { w: 1.5 }),
    S.rect(130, 120, 20, 34, { fill: 'currentColor', sw: 0 }),
    S.line(140, 20, 140, 120, { w: 1.5 }),
    S.path('M162 50 H200', { w: 1.5 }),
    S.arrow(240, 50, 166, 50, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    ...[[124, 162], [156, 166], [114, 172], [166, 176], [128, 178]].map(([x, y]) => S.circle(x, y, 3, { sw: 1 })),
    lab(244, 46, 'H₂ gas', { c: 'var(--diagram-accent)' }),
    lab(244, 60, 'at 1 bar', { c: 'var(--diagram-accent)' }),
    lab(146, 14, 'to the circuit', { size: 10 }),
    lab(226, 128, 'Pt foil with', { size: 10 }),
    lab(226, 140, 'Pt black', { size: 10 }),
    S.lead(224, 134, 150, 137),
    lab(140, 210, 'Acid solution, [H⁺] = 1 mol per litre, 298 K', { a: 'middle' }),
    lab(64, 184, 'H₂ bubbles', { size: 10 }),
  ].join(''),
);

// 3. Electrolytic cell.
export const ELECTROLYSIS = svgDoc(
  340,
  230,
  'Electrolytic cell: a battery drives current through an electrolyte. The electrode joined to the negative terminal is the cathode, where cations gain electrons (reduction). The electrode joined to the positive terminal is the anode, where anions lose electrons (oxidation). Cations move towards the cathode and anions towards the anode.',
  [
    liquid(61, 100, 218, 89),
    beaker(60, 70, 220, 120),
    S.rect(100, 60, 14, 116, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.rect(226, 60, 14, 116, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.path('M107 60 V30 H160', { w: 1.5 }),
    S.path('M180 30 H233 V60', { w: 1.5 }),
    S.line(160, 24, 160, 36, { w: 4 }),
    S.line(180, 18, 180, 42, { w: 2 }),
    lab(150, 14, '−', { a: 'middle', size: 14, w: 'bold' }),
    lab(190, 14, '+', { a: 'middle', size: 14, w: 'bold' }),
    lab(170, 56, 'Battery', { a: 'middle' }),
    S.arrow(190, 130, 124, 130, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    lab(156, 124, 'cations', { a: 'middle', c: 'var(--diagram-accent)', size: 10 }),
    S.arrow(150, 160, 216, 160, { c: 'var(--diagram-blue)', w: 2, size: 6 }),
    lab(183, 154, 'anions', { a: 'middle', c: 'var(--diagram-blue)', size: 10 }),
    lab(107, 208, 'Cathode (−)', { a: 'middle', w: 'bold' }),
    lab(107, 222, 'reduction', { a: 'middle', size: 10 }),
    lab(233, 208, 'Anode (+)', { a: 'middle', w: 'bold' }),
    lab(233, 222, 'oxidation', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Hydrogen–oxygen fuel cell.
export const FUELCELL = svgDoc(
  360,
  230,
  'Hydrogen–oxygen fuel cell: hydrogen enters on the left and oxygen on the right, each through a porous carbon electrode with a catalyst, into a hot concentrated alkali electrolyte between them. Water forms and leaves at the bottom. An external circuit with a lamp joins the two electrodes; electrons flow from the hydrogen side to the oxygen side.',
  [
    S.rect(40, 70, 280, 120, { sw: 2 }),
    liquid(126, 71, 108, 118, 'var(--diagram-blue)', 0.2),
    S.rect(112, 70, 14, 120, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.rect(234, 70, 14, 120, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.arrow(4, 110, 60, 110, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    S.arrow(356, 110, 300, 110, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    S.arrow(180, 186, 180, 220, { c: 'var(--diagram-blue)', w: 2, size: 6 }),
    S.path('M119 70 V34 H166', { w: 1.5 }),
    S.path('M194 34 H241 V70', { w: 1.5 }),
    S.circle(180, 34, 13, { fill: 'var(--diagram-yellow)', fop: 0.6 }),
    S.path('M171 25 L189 43 M189 25 L171 43', { w: 1 }),
    S.arrow(130, 22, 160, 22, { c: 'var(--diagram-accent)', size: 5 }),
    lab(130, 14, 'electrons', { size: 10, c: 'var(--diagram-accent)' }),
    lab(4, 100, 'H₂ in'),
    lab(356, 100, 'O₂ in', { a: 'end' }),
    lab(190, 216, 'water out'),
    lab(76, 146, 'Anode', { a: 'middle', size: 10 }),
    lab(76, 158, 'H₂ oxidised', { a: 'middle', size: 10 }),
    lab(284, 146, 'Cathode', { a: 'middle', size: 10 }),
    lab(284, 158, 'O₂ reduced', { a: 'middle', size: 10 }),
    lab(180, 124, 'hot concentrated', { a: 'middle', size: 10 }),
    lab(180, 136, 'alkali electrolyte', { a: 'middle', size: 10 }),
  ].join(''),
);

// 5. Rusting under a water drop.
export const RUST = svgDoc(
  360,
  210,
  'Rusting of iron under a drop of water: the iron surface under the middle of the drop, where little oxygen reaches, acts as the anode and iron dissolves as iron(II) ions. Electrons travel through the metal to the edge of the drop, where oxygen from the air is reduced. Iron ions and oxygen meet near the edge and rust forms there.',
  [
    S.rect(10, 130, 340, 34, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.path('M60 130 C80 60 280 60 300 130 Z', { fill: 'var(--diagram-blue)', fop: 0.25, w: 1.5 }),
    S.arrow(40, 70, 70, 112, { c: 'var(--diagram-accent)', w: 1.5, size: 6 }),
    S.arrow(320, 70, 290, 112, { c: 'var(--diagram-accent)', w: 1.5, size: 6 }),
    lab(20, 62, 'O₂ from air', { c: 'var(--diagram-accent)', size: 10 }),
    lab(340, 62, 'O₂ from air', { a: 'end', c: 'var(--diagram-accent)', size: 10 }),
    S.arrow(160, 150, 90, 150, { w: 1.5, size: 6 }),
    S.arrow(200, 150, 270, 150, { w: 1.5, size: 6 }),
    lab(180, 154, 'e⁻', { a: 'middle', size: 11 }),
    S.rect(160, 124, 40, 6, { fill: 'var(--diagram-red)', sw: 0 }),
    lab(180, 108, 'Anode: Fe → Fe²⁺ + 2e⁻', { a: 'middle', size: 10 }),
    S.rect(66, 122, 22, 8, { fill: 'var(--diagram-brown)', sw: 0 }),
    S.rect(272, 122, 22, 8, { fill: 'var(--diagram-brown)', sw: 0 }),
    lab(20, 184, 'Cathode (edge of drop): O₂ + 4H⁺ + 4e⁻ → 2H₂O', { size: 10 }),
    lab(20, 198, 'Rust (brown) forms near the edge, where Fe²⁺ meets O₂', { size: 10 }),
    lab(340, 152, 'Iron', { a: 'end', size: 10 }),
  ].join(''),
);
