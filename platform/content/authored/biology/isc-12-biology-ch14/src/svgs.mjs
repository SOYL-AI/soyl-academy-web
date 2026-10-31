// SVG diagrams for ISC 12 Biology ch14. ECORI, GEL, PBR, PCR and BIOREACTOR are copied from cbse-12-biology-ch09/src/svgs.mjs
// (same author; the EcoRI duplex and gel sample sizes differ); BLUEWHITE (colony colours computed) is new for ISC.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { complement, migration, pcr } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. EcoRI cut and sticky ends (computed strands)
const TOP = 'TAGAATTCGC';
const BOT = complement(TOP);
const cell = 26;
const strand = (x0, y, s, hl) => Array.from(s).map((b, i) => S.rect(x0 + i * cell, y, cell, 24, { fill: hl(i) ? 'var(--diagram-accent)' : 'var(--diagram-fill)', fop: hl(i) ? 0.25 : 1, sw: 1 }) + S.text(x0 + i * cell + cell / 2, y + 16, b, { a: 'middle', size: 12, w: 'bold' })).join('');
const site = (i) => i >= 2 && i <= 7;
export const ECORI = svgDoc(
  460,
  250,
  `EcoRI recognises the palindromic sequence GAATTC, which reads the same 5 prime to 3 prime on both strands. In the duplex ${TOP} over ${BOT}, it cuts the top strand between G and A and the bottom strand between A and G, a little away from the centre, leaving single-stranded overhanging ends AATT called sticky ends`,
  [
    S.text(10, 18, 'Before cutting', { size: 12, w: 'bold' }),
    S.text(10, 44, "5′", { size: 11 }), strand(30, 30, TOP, site), S.text(30 + TOP.length * cell + 4, 44, "3′", { size: 11 }),
    S.text(10, 70, "3′", { size: 11 }), strand(30, 56, BOT, site), S.text(30 + TOP.length * cell + 4, 70, "5′", { size: 11 }),
    S.path(`M${30 + 3 * cell} 26 L${30 + 3 * cell} 54 L${30 + 7 * cell} 54 L${30 + 7 * cell} 84`, { w: 2, c: 'var(--diagram-red)', dash: '4 3' }),
    lab(320, 50, 'Cut sites (EcoRI)', { c: 'var(--diagram-red)' }),
    S.text(10, 116, 'After cutting: sticky ends', { size: 12, w: 'bold' }),
    strand(30, 128, TOP.slice(0, 3), () => false), strand(30, 154, BOT.slice(0, 7), () => false),
    strand(270, 128, TOP.slice(3), () => false), strand(270 + 4 * cell, 154, BOT.slice(7), () => false),
    S.lead(30 + 5 * cell, 196, 30 + 5 * cell, 180),
    lab(60, 210, 'Overhang: single-stranded', { size: 10 }),
    lab(60, 222, 'sticky end (AATT)', { size: 10 }),
    S.lead(270 + 2 * cell, 196, 270 + 2 * cell, 152),
    lab(250, 210, 'Complementary sticky end', { size: 10 }),
    lab(250, 222, 'pairs with the other', { size: 10 }),
    S.text(230, 244, 'The site is palindromic: GAATTC reads the same 5′→3′ on both strands', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Gel electrophoresis (computed migration)
const LADDER = [5000, 2000, 1000, 500, 200, 100];
const SAMPLE = [4000, 600, 150];
const gy = (bp) => 40 + migration(bp) * 0.9;
export const GEL = svgDoc(
  440,
  250,
  `Agarose gel electrophoresis: DNA is loaded in wells at the negative (cathode) end and moves towards the positive (anode) end; smaller fragments move farther. A ladder lane has fragments of ${LADDER.join(', ')} base pairs; a sample lane shows fragments of about ${SAMPLE.join(', ')} base pairs, positioned between the matching ladder bands`,
  [
    S.rect(100, 30, 200, 200, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.rect(130, 34, 40, 8, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 }),
    S.rect(230, 34, 40, 8, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 }),
    ...LADDER.map((bp) => S.rect(130, gy(bp), 40, 4, { fill: 'var(--diagram-accent)', sw: 0 }) + S.text(96, gy(bp) + 5, `${bp}`, { a: 'end', size: 10 })),
    ...SAMPLE.map((bp) => S.rect(230, gy(bp), 40, 4, { fill: 'var(--diagram-accent)', sw: 0 })),
    S.text(150, 24, 'Ladder', { a: 'middle', size: 11 }), S.text(250, 24, 'Sample', { a: 'middle', size: 11 }),
    S.text(320, 40, '− (cathode): wells', { size: 11 }),
    S.text(320, 228, '+ (anode)', { size: 11 }),
    S.arrow(380, 60, 380, 200, { c: 'var(--diagram-blue)' }),
    lab(386, 130, 'DNA', { size: 10, c: 'var(--diagram-blue)' }), lab(386, 142, 'moves', { size: 10, c: 'var(--diagram-blue)' }),
    S.text(20, 246, 'Size (bp)', { size: 10 }),
  ].join(''),
);

// 3. pBR322 map (schematic)
const CX = 180;
const CY = 140;
const R = 80;
const arcPath = (a1, a2, rr) => {
  const p = (a) => [CX + rr * Math.cos((a * Math.PI) / 180), CY + rr * Math.sin((a * Math.PI) / 180)];
  const [x1, y1] = p(a1);
  const [x2, y2] = p(a2);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${rr} ${rr} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};
const mark = (a, text, anchorRight) => {
  const x = CX + R * Math.cos((a * Math.PI) / 180);
  const y = CY + R * Math.sin((a * Math.PI) / 180);
  const lx = CX + (R + 50) * Math.cos((a * Math.PI) / 180);
  const ly = CY + (R + 40) * Math.sin((a * Math.PI) / 180);
  return S.circle(x, y, 3, { fill: 'currentColor', sw: 0 }) + S.lead(x, y, lx, ly) + S.text(lx + (anchorRight ? 4 : -4), ly + 4, text, { a: anchorRight ? 'start' : 'end', size: 10 });
};
export const PBR = svgDoc(
  420,
  280,
  'Map of the cloning vector pBR322, a circular plasmid: an origin of replication (ori), a rop gene, an ampicillin-resistance gene (ampR) and a tetracycline-resistance gene (tetR); recognition sites include EcoRI, HindIII, BamHI and SalI (BamHI and SalI lie within tetR) and PvuI and PstI (within ampR)',
  [
    S.circle(CX, CY, R, { sw: 3 }),
    S.path(arcPath(-80, 20, R), { w: 10, c: 'var(--diagram-green)', fop: 0.6 }),
    S.path(arcPath(120, 200, R), { w: 10, c: 'var(--diagram-blue)' }),
    S.path(arcPath(60, 85, R), { w: 10, c: 'var(--diagram-yellow)' }),
    S.path(arcPath(95, 110, R), { w: 10, c: 'var(--diagram-muted)' }),
    S.text(CX, CY - 4, 'pBR322', { a: 'middle', size: 12, w: 'bold' }),
    S.text(CX, CY + 12, '(about 4.4 kb)', { a: 'middle', size: 10 }),
    S.text(CX + 52, CY - 22, 'tetR', { a: 'middle', size: 11, c: 'var(--diagram-green)', w: 'bold' }),
    S.text(CX - 52, CY + 6, 'ampR', { a: 'middle', size: 11, c: 'var(--diagram-blue)', w: 'bold' }),
    S.text(CX + 30, CY + 54, 'ori', { a: 'middle', size: 11, w: 'bold' }),
    S.text(CX - 6, CY + 66, 'rop', { a: 'middle', size: 10 }),
    mark(-90, 'EcoRI', true), mark(-70, 'HindIII', true), mark(-35, 'BamHI', true), mark(0, 'SalI', true),
    mark(150, 'PvuI', false), mark(180, 'PstI', false),
    lab(300, 250, 'Sites in tetR: BamHI, SalI', { size: 10 }),
    lab(300, 264, 'Sites in ampR: PvuI, PstI', { size: 10 }),
  ].join(''),
);

// 4. PCR steps and doubling (computed)
export const PCR = svgDoc(
  460,
  230,
  `The polymerase chain reaction: each cycle has three steps — denaturation at high temperature separates the strands, annealing lets primers bind, and extension by a heat-stable DNA polymerase (Taq) copies each strand — so the number of copies doubles every cycle; starting from one molecule there are ${pcr(1)}, ${pcr(2)}, ${pcr(3)}, ${pcr(4)} and ${pcr(5)} copies after cycles one to five, and about ${pcr(30).toExponential(2)} after thirty cycles`,
  [
    ...[['1. Denaturation', 'strands separate', 'var(--diagram-red)'], ['2. Annealing', 'primers bind', 'var(--diagram-blue)'], ['3. Extension', 'Taq polymerase copies', 'var(--diagram-green)']].map(([t, d, c], i) => S.rect(10 + i * 145, 20, 130, 48, { rx: 8, fill: c, fop: 0.2, sw: 1.2 }) + S.text(75 + i * 145, 40, t, { a: 'middle', size: 11, w: 'bold' }) + S.text(75 + i * 145, 56, d, { a: 'middle', size: 10 })),
    S.arrow(140, 44, 154, 44, { size: 6 }), S.arrow(285, 44, 299, 44, { size: 6 }),
    S.path('M375 68 C375 90 75 90 75 72', { w: 1.2, dash: '4 3' }), S.head(75, 70, -1.6, { size: 6 }),
    lab(180, 98, 'Repeat: copies double each cycle', { size: 10 }),
    S.line(40, 210, 420, 210, { w: 1 }),
    ...[1, 2, 3, 4, 5].map((n, i) => {
      const h = pcr(n) * 2.8;
      return S.rect(60 + i * 70, 210 - h, 40, h, { fill: 'var(--diagram-accent)', fop: 0.35, sw: 1 }) + S.text(80 + i * 70, 205 - h, String(pcr(n)), { a: 'middle', size: 10 }) + S.text(80 + i * 70, 224, `Cycle ${n}`, { a: 'middle', size: 10 });
    }),
  ].join(''),
);

// 5. Stirred-tank bioreactor
export const BIOREACTOR = svgDoc(
  420,
  260,
  'A stirred-tank bioreactor: a cylindrical vessel with a curved base and a motor-driven agitator that mixes the contents and distributes oxygen; sterile air is bubbled in through a sparger at the bottom; it has a foam-control system, a temperature-control jacket, pH control, and sampling ports to withdraw small volumes',
  [
    S.path('M120 40 L120 200 C120 236 260 236 260 200 L260 40 Z', { fill: 'var(--diagram-blue)', fop: 0.12, w: 2 }),
    S.path('M110 50 L110 200 C110 248 270 248 270 200 L270 50', { w: 1.5, dash: '5 3', c: 'var(--diagram-red)' }),
    S.rect(170, 10, 40, 22, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 1.2 }),
    S.line(190, 32, 190, 200, { w: 3 }),
    ...[110, 180].map((y) => S.rect(160, y - 4, 60, 8, { fill: 'currentColor', sw: 0 })),
    S.path('M60 226 L190 226 L190 214', { w: 2.5, c: 'var(--diagram-blue)' }),
    S.line(150, 214, 230, 214, { w: 3, c: 'var(--diagram-blue)' }),
    ...[[160, 196], [180, 170], [205, 186], [220, 150], [170, 140]].map(([x, y]) => S.circle(x, y, 3, { sw: 1, c: 'var(--diagram-blue)' })),
    S.path('M260 70 L320 70', { w: 2 }),
    lab(214, 24, 'Motor'),
    lab(10, 110, 'Flat-bladed', { size: 10 }), lab(10, 122, 'impeller (agitator)', { size: 10 }), S.lead(100, 116, 160, 110),
    lab(10, 236, 'Sterile air in (sparger)', { size: 10 }),
    lab(290, 58, 'Foam breaker,', { size: 10 }), lab(290, 70, 'exhaust', { size: 10 }),
    lab(290, 130, 'Temperature-control', { size: 10, c: 'var(--diagram-red)' }), lab(290, 142, 'jacket', { size: 10, c: 'var(--diagram-red)' }), S.lead(288, 136, 270, 136),
    lab(290, 190, 'pH probe and', { size: 10 }), lab(290, 202, 'sampling port', { size: 10 }), S.lead(288, 196, 258, 190),
    S.text(190, 256, 'Culture medium with microbes or cells', { a: 'middle', size: 10 }),
  ].join(''),
);


// ---------------------------------------------------------------- new for ISC ch14
// 6. Blue-white selection (colony colours computed)
export const COLONIES = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180, rr = 14 + 5.6 * Math.sqrt(i * 3);
  return [Math.round(110 + rr * Math.cos(a)), Math.round(115 + rr * Math.sin(a)), i % 4 === 1 ? 'white' : 'blue'];
});
export const WHITE = COLONIES.filter(([, , c]) => c === 'white').length;
export const BLUE = COLONIES.length - WHITE;
export const BLUEWHITE = svgDoc(
  460,
  240,
  `Blue-white selection on a plate containing a chromogenic substrate: ${BLUE} blue colonies carry vectors with an intact lacZ gene, whose beta-galactosidase gives blue colour; ${WHITE} white colonies carry recombinant vectors in which the foreign DNA has been inserted into lacZ, inactivating it (insertional inactivation), so they are picked as recombinants`,
  [
    S.circle(110, 115, 92, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    ...COLONIES.map(([x, y, c]) => S.circle(x, y, 7, { fill: c === 'white' ? 'var(--diagram-fill)' : 'var(--diagram-blue)', fop: c === 'white' ? 1 : 0.7, sw: 1.2 })),
    S.text(110, 226, 'Plate with substrate for β-galactosidase', { a: 'middle', size: 10 }),
    S.circle(240, 50, 8, { fill: 'var(--diagram-blue)', fop: 0.7, sw: 1.2 }),
    lab(256, 46, `Blue (${BLUE}): no insert`, { size: 10, w: 'bold' }),
    lab(256, 60, 'lacZ intact → β-galactosidase', { size: 10 }),
    S.circle(240, 100, 8, { fill: 'var(--diagram-fill)', sw: 1.2 }),
    lab(256, 96, `White (${WHITE}): recombinant`, { size: 10, w: 'bold' }),
    lab(256, 110, 'insert inside lacZ → no enzyme', { size: 10 }),
    lab(240, 150, 'Insertional inactivation lets us', { size: 10, c: 'var(--diagram-accent)' }),
    lab(240, 164, 'pick recombinants by colour alone', { size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

export const ALL = { ECORI, GEL, PBR, PCR, BIOREACTOR, BLUEWHITE };
