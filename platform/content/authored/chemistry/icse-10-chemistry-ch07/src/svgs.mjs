// Hand-drawn SVG schematics for ICSE 10 Chemistry ch07 Electrolysis (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

/** Battery symbol centred at (cx, y): long thin plate = positive, short thick plate = negative. plusLeft puts + on the left. */
function bat(cx, y, plusLeft = true) {
  const xp = plusLeft ? cx - 6 : cx + 6;
  const xn = plusLeft ? cx + 6 : cx - 6;
  return (
    S.line(xp, y - 13, xp, y + 13, { w: 1.5 }) +
    S.line(xn, y - 7, xn, y + 7, { w: 3.5 }) +
    S.text(xp + (plusLeft ? -9 : 9), y - 14, '+', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-red)' }) +
    S.text(xn + (plusLeft ? 9 : -9), y - 14, '−', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-blue)' })
  );
}
const beaker = (x1, y1, x2, y2) => S.path(`M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2} L ${x2} ${y1}`, { w: 1.8 });
const liquid = (x, y, w, h, colour = 'var(--diagram-blue)', fop = 0.14) => S.rect(x, y, w, h, { fill: colour, fop, c: 'none', sw: 0 });
const bubbles = (x, y) => [[0, 0], [5, -12], [-3, -24], [4, -36]].map(([dx, dy]) => S.circle(x + dx, y + dy, 3, { sw: 1 })).join('');

// 1. Migration of ions in an electrolytic cell.
export const ION_MIGRATION = svgDoc(
  480,
  270,
  'An electrolytic cell. A battery at the top is joined by wires to two electrodes dipping into an electrolyte in a beaker. The electrode joined to the positive terminal is the anode, on the left; the electrode joined to the negative terminal is the cathode, on the right. Positive ions, cations, move through the liquid towards the cathode, where they gain electrons (reduction). Negative ions, anions, move towards the anode, where they lose electrons (oxidation). Electrons flow through the outer wire from the anode to the battery and from the battery to the cathode.',
  [
    bat(240, 34, true),
    S.path('M 234 34 L 150 34 L 150 76', { w: 1.5 }),
    S.path('M 246 34 L 330 34 L 330 76', { w: 1.5 }),
    S.arrow(180, 24, 214, 24, { c: 'var(--diagram-accent)', size: 6 }),
    S.arrow(266, 24, 300, 24, { c: 'var(--diagram-accent)', size: 6 }),
    lab(240, 12, 'electron flow in the wire', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    beaker(90, 96, 390, 246),
    liquid(92, 118, 296, 126),
    S.rect(140, 76, 20, 150, { fill: 'var(--diagram-muted)', fop: 0.35, sw: 1.5 }),
    S.rect(320, 76, 20, 150, { fill: 'var(--diagram-muted)', fop: 0.35, sw: 1.5 }),
    // cations to the cathode
    ...[[205, 145], [240, 172]].map(([x, y]) => S.circle(x, y, 9, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1.2 }) + S.text(x, y + 4, '+', { a: 'middle', size: 12, w: 'bold' }) + S.arrow(x + 12, y, x + 44, y, { c: 'var(--diagram-red)', size: 6 })),
    // anions to the anode
    ...[[275, 205], [250, 228]].map(([x, y]) => S.circle(x, y, 9, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.2 }) + S.text(x, y + 4, '−', { a: 'middle', size: 12, w: 'bold' }) + S.arrow(x - 12, y, x - 44, y, { c: 'var(--diagram-blue)', size: 6 })),
    S.lines(8, 120, ['ANODE (+)', 'anions lose', 'electrons:', 'oxidation'], { size: 10, dy: 12, c: 'var(--diagram-blue)' }),
    S.lines(398, 120, ['CATHODE (−)', 'cations gain', 'electrons:', 'reduction'], { size: 10, dy: 12, c: 'var(--diagram-red)' }),
    lab(240, 262, 'electrolyte: ions free to move', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Electrolysis of molten lead bromide in a silica crucible.
export const PBBR2_CELL = svgDoc(
  500,
  310,
  'Electrolysis of molten lead bromide. Lead bromide is heated strongly in a silica crucible until it melts. Two graphite rods dip into the melt: the anode, joined to the positive terminal of the battery, and the cathode, joined to the negative terminal. Reddish-brown bromine vapour rises from the anode. Silvery grey molten lead forms at the cathode and, being dense, collects at the bottom of the crucible. A burner flame below keeps the lead bromide molten.',
  [
    bat(240, 30, true),
    S.path('M 234 30 L 202 30 L 202 66', { w: 1.5 }),
    S.path('M 246 30 L 278 30 L 278 66', { w: 1.5 }),
    // crucible and melt
    S.path('M 165 168 L 177 242 L 303 242 L 315 168 Z', { fill: 'var(--diagram-accent)', fop: 0.25, c: 'none', w: 0 }),
    S.path('M 158 140 L 175 250 L 305 250 L 322 140', { w: 2 }),
    // graphite rods
    S.rect(195, 66, 14, 160, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1.5 }),
    S.rect(271, 66, 14, 160, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1.5 }),
    // bromine vapour near the anode
    ...[0, 1, 2].map((i) => S.path(`M ${188 - i * 10} ${160 - i * 4} q -6 -10 0 -20 q 6 -10 0 -20`, { c: 'var(--diagram-red)', w: 2 })),
    // lead at the bottom near the cathode
    S.ellipse(268, 238, 30, 5, { fill: 'var(--diagram-muted)', fop: 0.8, sw: 1 }),
    // burner
    S.path('M 240 290 Q 230 276 240 262 Q 250 276 240 290', { c: 'var(--diagram-red)', fill: 'var(--diagram-red)', fop: 0.3 }),
    S.rect(232, 290, 16, 18, { sw: 1.5 }),
    // labels
    S.lines(8, 78, ['graphite', 'anode (+)'], { size: 10, dy: 12 }),
    S.lead(60, 84, 195, 96),
    S.lines(8, 120, ['reddish-brown', 'bromine vapour'], { size: 10, dy: 12, c: 'var(--diagram-red)' }),
    S.lead(92, 126, 170, 128),
    S.lines(392, 78, ['graphite', 'cathode (−)'], { size: 10, dy: 12 }),
    S.lead(390, 84, 285, 96),
    S.lines(330, 180, ['molten lead bromide', '(Pb²⁺ and Br⁻ ions)'], { size: 10, dy: 12 }),
    S.lead(328, 184, 300, 200),
    S.lines(330, 226, ['silvery grey molten', 'lead collects below'], { size: 10, dy: 12, c: 'var(--diagram-muted)' }),
    S.lead(328, 230, 298, 238),
    S.lines(40, 230, ['silica', 'crucible'], { size: 10, dy: 12 }),
    S.lead(86, 234, 170, 226),
    lab(258, 284, 'heat', { size: 10, c: 'var(--diagram-red)' }),
  ].join(''),
);

// 3. Voltameter for acidified water with platinum electrodes.
export const VOLTAMETER = svgDoc(
  440,
  350,
  'A voltameter for the electrolysis of acidified water. A glass vessel holds water with a little dilute sulphuric acid. Two platinum electrodes enter through the base, each covered by an inverted test tube full of the liquid. The electrode on the left is the cathode, joined to the negative terminal of the battery below; hydrogen collects in its tube. The electrode on the right is the anode, joined to the positive terminal; oxygen collects in its tube. The volume of hydrogen is twice the volume of oxygen.',
  [
    beaker(50, 150, 390, 300),
    liquid(52, 170, 336, 128),
    // left tube (cathode, hydrogen: 2 volumes)
    S.path('M 110 252 L 110 60 Q 110 42 130 42 Q 150 42 150 60 L 150 252', { w: 1.6 }),
    liquid(111, 160, 38, 92),
    S.line(111, 160, 149, 160, { c: 'var(--diagram-blue)', w: 1 }),
    // right tube (anode, oxygen: 1 volume)
    S.path('M 290 252 L 290 60 Q 290 42 310 42 Q 330 42 330 60 L 330 252', { w: 1.6 }),
    liquid(291, 101, 38, 151),
    S.line(291, 101, 329, 101, { c: 'var(--diagram-blue)', w: 1 }),
    // platinum electrodes and bubbles
    S.rect(124, 222, 12, 26, { fill: 'var(--diagram-muted)', fop: 0.6, sw: 1.2 }),
    S.rect(304, 222, 12, 26, { fill: 'var(--diagram-muted)', fop: 0.6, sw: 1.2 }),
    bubbles(130, 212),
    bubbles(310, 212),
    // wiring through the base to the battery
    S.path('M 130 248 L 130 330 L 210 330', { w: 1.5 }),
    S.path('M 230 330 L 310 330 L 310 248', { w: 1.5 }),
    bat(220, 330, false),
    // labels
    S.lines(8, 74, ['hydrogen', '2 volumes'], { size: 11, dy: 13, c: 'var(--diagram-green)', w: 'bold' }),
    S.lead(66, 92, 110, 100),
    S.lines(342, 64, ['oxygen', '1 volume'], { size: 11, dy: 13, c: 'var(--diagram-red)', w: 'bold' }),
    S.lead(340, 78, 330, 72),
    lab(130, 282, 'cathode (−)', { a: 'middle', size: 10 }),
    lab(310, 282, 'anode (+)', { a: 'middle', size: 10 }),
    lab(220, 196, 'water + a little', { a: 'middle', size: 10 }),
    lab(220, 210, 'dilute sulphuric acid', { a: 'middle', size: 10 }),
    lab(220, 252, 'platinum electrodes', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Copper(II) sulphate solution with copper electrodes (A) and with platinum electrodes (B).
const cuCell = (x0, anodeW, fop) =>
  bat(x0 + 100, 30, true) +
  S.path(`M ${x0 + 94} 30 L ${x0 + 58} 30 L ${x0 + 58} 62`, { w: 1.5 }) +
  S.path(`M ${x0 + 106} 30 L ${x0 + 142} 30 L ${x0 + 142} 62`, { w: 1.5 }) +
  beaker(x0, 86, x0 + 200, 236) +
  liquid(x0 + 2, 104, 196, 130, 'var(--diagram-blue)', fop) +
  S.rect(x0 + 58 - anodeW / 2, 62, anodeW, 150, { fill: 'var(--diagram-accent)', fop: anodeW > 10 ? 0.45 : 0.1, sw: 1.4 }) +
  S.rect(x0 + 133, 62, 18, 150, { fill: 'var(--diagram-accent)', fop: 0.45, sw: 1.4 }) +
  S.rect(x0 + 129, 130, 26, 82, { fill: 'var(--diagram-accent)', fop: 0.7, c: 'var(--diagram-accent)', sw: 1 });
export const CUSO4_CELLS = svgDoc(
  520,
  330,
  'Two cells of blue copper(II) sulphate solution. Cell A has copper electrodes: copper dissolves from the anode, which becomes thinner, copper is deposited on the cathode, which becomes thicker, and the blue colour of the solution stays the same. Cell B has platinum electrodes: bubbles of oxygen form at the platinum anode, copper is deposited on the cathode, and the blue colour fades as copper ions are removed, leaving sulphuric acid in the solution.',
  [
    cuCell(30, 12, 0.4),
    cuCell(290, 6, 0.12),
    bubbles(348, 200),
    lab(130, 256, 'A: copper electrodes', { a: 'middle', size: 12, w: 'bold' }),
    S.lines(30, 274, ['anode (+) dissolves: Cu → Cu²⁺ + 2e⁻', 'cathode (−) gains copper', 'blue colour stays the same'], { size: 10, dy: 14 }),
    lab(390, 256, 'B: platinum electrodes', { a: 'middle', size: 12, w: 'bold' }),
    S.lines(290, 274, ['oxygen bubbles at the anode (+)', 'cathode (−) gains copper', 'blue fades; solution turns acidic'], { size: 10, dy: 14 }),
  ].join(''),
);

// 5. Nickel-plating a brass tap.
export const NICKEL_PLATE = svgDoc(
  480,
  290,
  'Nickel-plating a brass tap. The tap, cleaned, is hung in a solution of nickel sulphate and joined to the negative terminal of the battery, so it is the cathode. A plate of pure nickel, joined to the positive terminal, is the anode. Nickel ions move to the tap and are deposited on it as nickel metal; the nickel anode dissolves to replace them, so the concentration of nickel ions stays the same.',
  [
    bat(240, 30, true),
    S.path('M 234 30 L 140 30 L 140 70', { w: 1.5 }),
    S.path('M 246 30 L 330 30 L 330 74', { w: 1.5 }),
    beaker(70, 90, 410, 250),
    liquid(72, 110, 336, 138, 'var(--diagram-green)', 0.16),
    S.rect(126, 70, 28, 156, { fill: 'var(--diagram-muted)', fop: 0.45, sw: 1.5 }),
    // tap: body, spout and handle
    S.path('M 300 120 L 360 120 L 360 150 L 340 150 L 340 190 L 322 190 L 322 150 L 300 150 Z', { fill: 'var(--diagram-accent)', fop: 0.4, sw: 1.5 }),
    S.rect(312, 104, 36, 10, { fill: 'var(--diagram-accent)', fop: 0.4, sw: 1.2 }),
    S.line(330, 74, 330, 104, { w: 1.5 }),
    S.path('M 298 118 L 362 118 L 362 152 L 342 152 L 342 192 L 320 192 L 320 152 L 298 152 Z', { c: 'var(--diagram-green)', w: 1.2, dash: '3 2' }),
    ...[[190, 150], [220, 180], [250, 160]].map(([x, y]) => S.text(x, y, 'Ni²⁺', { a: 'middle', size: 11, c: 'var(--diagram-green)' }) + S.arrow(x + 16, y - 4, x + 44, y - 4, { c: 'var(--diagram-green)', size: 5 })),
    S.lines(8, 80, ['nickel', 'anode (+)'], { size: 10, dy: 12 }),
    S.lead(60, 86, 126, 96),
    S.lines(372, 70, ['brass tap', 'cathode (−)'], { size: 10, dy: 12 }),
    S.lead(372, 76, 352, 120),
    S.lines(370, 200, ['thin, even', 'nickel coat'], { size: 10, dy: 12, c: 'var(--diagram-green)' }),
    lab(240, 236, 'nickel sulphate solution (Ni²⁺ ions)', { a: 'middle', size: 11 }),
    lab(240, 274, 'anode: Ni → Ni²⁺ + 2e⁻     cathode: Ni²⁺ + 2e⁻ → Ni', { a: 'middle', size: 11 }),
  ].join(''),
);

// 6. Electrorefining of copper.
export const REFINE_CU = svgDoc(
  480,
  300,
  'Electrorefining of copper. A thick block of impure copper is the anode, joined to the positive terminal; a thin sheet of pure copper is the cathode, joined to the negative terminal. The electrolyte is copper(II) sulphate solution acidified with dilute sulphuric acid. Copper dissolves from the anode as copper ions, which move to the cathode and are deposited as pure copper. More reactive impurities such as zinc and iron dissolve and stay in the solution; less reactive ones such as silver and gold fall below the anode as anode mud.',
  [
    bat(240, 30, true),
    S.path('M 234 30 L 140 30 L 140 66', { w: 1.5 }),
    S.path('M 246 30 L 338 30 L 338 66', { w: 1.5 }),
    beaker(70, 86, 410, 256),
    liquid(72, 106, 336, 148, 'var(--diagram-blue)', 0.3),
    S.rect(116, 66, 48, 150, { fill: 'var(--diagram-accent)', fop: 0.35, sw: 1.6 }),
    S.rect(332, 66, 12, 150, { fill: 'var(--diagram-accent)', fop: 0.6, sw: 1.4 }),
    ...[[200, 140], [235, 170], [270, 145], [250, 200]].map(([x, y]) => S.text(x, y, 'Cu²⁺', { a: 'middle', size: 11 }) + S.arrow(x + 17, y - 4, x + 42, y - 4, { c: 'var(--diagram-blue)', size: 5 })),
    ...[[110, 248], [122, 244], [134, 249], [146, 245], [158, 248], [170, 244]].map(([x, y]) => S.circle(x, y, 3, { fill: 'var(--diagram-muted)', fop: 0.8, sw: 0.8 })),
    S.lines(8, 70, ['impure', 'copper', 'anode (+)'], { size: 10, dy: 12 }),
    S.lead(52, 82, 116, 96),
    S.lines(360, 64, ['pure copper', 'cathode (−)'], { size: 10, dy: 12 }),
    S.lead(358, 70, 344, 92),
    S.lines(8, 270, ['anode mud', '(silver, gold)'], { size: 10, dy: 12, c: 'var(--diagram-muted)' }),
    S.lead(70, 268, 112, 248),
    S.lines(256, 230, ['acidified copper(II) sulphate', 'Zn²⁺, Fe²⁺ stay in solution'], { a: 'middle', size: 10, dy: 12 }),
    lab(240, 292, 'anode: Cu → Cu²⁺ + 2e⁻     cathode: Cu²⁺ + 2e⁻ → Cu', { a: 'middle', size: 11 }),
  ].join(''),
);
