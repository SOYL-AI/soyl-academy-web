// Hand-drawn SVG schematics for ch01 Cell (allow-listed elements, palette colours only). All schematic, not to scale.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const B = 'var(--diagram-blue)';
const G = 'var(--diagram-green)';
const R = 'var(--diagram-red)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const A = 'var(--diagram-accent)';
const M = 'var(--diagram-muted)';

/** Label with a leader line. side 'L' puts the text right-aligned at the left margin, 'R' left-aligned at the right margin. */
function callouts(items, xL, xR) {
  let out = '';
  const ys = { L: [], R: [] };
  for (const [side, y, text, tx, ty] of items) {
    ys[side].push(y);
    if (side === 'L') out += lab(xL, y, text, { a: 'end' }) + S.lead(xL + 4, y - 4, tx, ty);
    else out += lab(xR, y, text, {}) + S.lead(xR - 4, y - 4, tx, ty);
  }
  return { out, ys };
}
function spacingOk(ys, gap = 15) {
  for (const side of ['L', 'R']) {
    const a = [...ys[side]].sort((p, q) => p - q);
    for (let i = 1; i < a.length; i++) if (a[i] - a[i - 1] < gap) return false;
  }
  return true;
}
/** Inside-ellipse test (fraction of the radius). */
const inside = (x, y, e, f = 0.88) => ((x - e.cx) / e.rx) ** 2 + ((y - e.cy) / e.ry) ** 2 <= f * f;

// ---------------------------------------------------------------- 1. plant cell
const PW = { x: 150, y: 40, w: 270, h: 290 }; // outer boundary of the cell wall
const PV = { cx: 285, cy: 185, rx: 62, ry: 88 }; // central vacuole
const pNuc = { cx: 190, cy: 165, r: 26 };
const pChl = [[240, 72], [318, 70], [384, 92], [388, 205], [222, 300], [330, 304]];
const pMit = [[386, 150], [290, 300]];
function chloroplast(x, y) {
  return S.ellipse(x, y, 17, 9, { fill: G, fop: 0.5, c: G }) + S.line(x - 10, y, x + 10, y, { c: G, w: 1 });
}
function mito(x, y, rot = 0) {
  return `<g transform="rotate(${rot} ${x} ${y})">` + S.ellipse(x, y, 13, 7, { fill: R, fop: 0.3, c: R }) + S.path(`M${x - 8} ${y} q2 -4 4 0 q2 4 4 0 q2 -4 4 0`, { c: R, w: 1 }) + '</g>';
}
function golgi(x, y) {
  return [0, 6, 12, 18].map((d) => S.path(`M${x - 18 + d / 3} ${y + d} q18 -9 36 0`, { c: Y, w: 3 })).join('');
}
function nucleus(cx, cy, r) {
  return S.circle(cx, cy, r, { fill: A, fop: 0.18, c: A, sw: 2 }) + S.circle(cx - r * 0.2, cy - r * 0.1, r * 0.3, { fill: A, fop: 0.55, c: A, sw: 1 }) + S.circle(cx + r * 0.9, cy - r * 0.4, 1.8, { fill: A, c: 'none' }) + S.circle(cx + r * 0.6, cy + r * 0.75, 1.8, { fill: A, c: 'none' });
}
const pAllInside = pChl.every(([x, y]) => x - 17 > PW.x + 8 && x + 17 < PW.x + PW.w - 8 && y - 9 > PW.y + 8 && y + 9 < PW.y + PW.h - 8) && pMit.every(([x, y]) => x > PW.x + 8 && x < PW.x + PW.w - 8 && y > PW.y + 8 && y < PW.y + PW.h - 8);
chk(pAllInside, 'plant cell: every chloroplast and mitochondrion lies inside the cell wall');
chk(pChl.every(([x, y]) => !inside(x, y, PV, 1.12)), 'plant cell: no chloroplast overlaps the central vacuole');
chk(pNuc.cx + pNuc.r < PV.cx - PV.rx - 4, 'plant cell: the nucleus is pushed to the side of the vacuole');
const pc = callouts(
  [
    ['L', 94, 'Cell membrane', PW.x + 7, 116],
    ['L', 126, 'Cytoplasm', 165, 215],
    ['L', 158, 'Nucleus', pNuc.cx - pNuc.r, 158],
    ['L', 262, 'Rough ER', 186, 245],
    ['R', 62, 'Chloroplast', 330, 66],
    ['R', 118, 'Mitochondrion', 399, 148],
    ['R', 186, 'Large central vacuole', PV.cx + PV.rx - 6, 186],
    ['R', 262, 'Golgi apparatus', 372, 258],
    ['R', 312, 'Cell wall (cellulose, outside the membrane)', PW.x + PW.w, 312],
  ],
  140,
  438,
);
chk(spacingOk(pc.ys), 'plant cell: labels on each side are at least 15 px apart');
export const PLANT_CELL = svgDoc(
  600,
  360,
  'Schematic labelled plant cell, not to scale. A rigid cell wall surrounds the cell membrane. Inside are a nucleus pushed to one side, a large central vacuole, green chloroplasts, mitochondria, rough endoplasmic reticulum and a Golgi apparatus in the cytoplasm.',
  [
    S.rect(PW.x, PW.y, PW.w, PW.h, { c: BR, sw: 6, rx: 16 }),
    S.rect(PW.x + 6, PW.y + 6, PW.w - 12, PW.h - 12, { c: A, sw: 1.5, rx: 12, fill: G, fop: 0.07 }),
    S.ellipse(PV.cx, PV.cy, PV.rx, PV.ry, { fill: B, fop: 0.22, c: B, sw: 1.5 }),
    lab(PV.cx, PV.cy + 4, 'cell sap', { a: 'middle', c: B, size: 10 }),
    nucleus(pNuc.cx, pNuc.cy, pNuc.r),
    pChl.map(([x, y]) => chloroplast(x, y)).join(''),
    pMit.map(([x, y], i) => mito(x, y, i ? 0 : 60)).join(''),
    S.path('M166 232 q10 -8 20 0 t20 0 t20 0', { c: M, w: 2 }),
    S.path('M166 246 q10 -8 20 0 t20 0 t20 0', { c: M, w: 2 }),
    [[172, 230], [190, 232], [208, 229], [226, 232], [172, 244], [190, 246], [208, 243]].map(([x, y]) => S.circle(x, y - 5, 1.6, { fill: M, c: 'none' })).join(''),
    golgi(372, 252),
    pc.out,
    lab(300, 352, 'Schematic, not to scale', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 2. animal cell
const AE = { cx: 300, cy: 190, rx: 150, ry: 140 };
const aNuc = { cx: 290, cy: 180, r: 40 };
const aMit = [[200, 130, 30], [395, 150, -40], [220, 270, 10]];
const aLys = [[395, 236], [350, 290]];
const aVac = [[210, 195], [375, 110]];
chk([aNuc, ...aMit.map(([x, y]) => ({ cx: x, cy: y, r: 14 })), ...aLys.map(([x, y]) => ({ cx: x, cy: y, r: 8 }))].every((o) => inside(o.cx, o.cy, AE, 0.9)), 'animal cell: every organelle lies inside the cell membrane');
const ac = callouts(
  [
    ['L', 50, 'Cell membrane', 180, 85],
    ['L', 100, 'Mitochondrion', 188, 128],
    ['L', 160, 'Vacuole (small)', 198, 196],
    ['L', 250, 'Cytoplasm', 168, 235],
    ['L', 300, 'Mitochondrion', 207, 274],
    ['R', 50, 'Vacuole (small)', 380, 108],
    ['R', 100, 'Nucleus', 326, 160],
    ['R', 150, 'Nucleolus', 296, 176],
    ['R', 212, 'Lysosome', 398, 233],
    ['R', 268, 'Golgi apparatus', 345, 244],
    ['R', 318, 'Rough ER', 292, 244],
  ],
  150,
  470,
);
chk(spacingOk(ac.ys), 'animal cell: labels on each side are at least 15 px apart');
export const ANIMAL_CELL = svgDoc(
  620,
  370,
  'Schematic labelled animal cell, not to scale. A thin cell membrane, with no cell wall, surrounds the cytoplasm. Inside are a central nucleus with a nucleolus, mitochondria, rough endoplasmic reticulum, a Golgi apparatus, lysosomes and small vacuoles.',
  [
    S.ellipse(AE.cx, AE.cy, AE.rx, AE.ry, { c: A, sw: 3, fill: Y, fop: 0.06 }),
    nucleus(aNuc.cx, aNuc.cy, aNuc.r),
    aMit.map(([x, y, rot]) => mito(x, y, rot)).join(''),
    aLys.map(([x, y]) => S.circle(x, y, 8, { fill: Y, fop: 0.5, c: Y, sw: 1.5 })).join(''),
    aVac.map(([x, y]) => S.circle(x, y, 10, { fill: B, fop: 0.2, c: B, sw: 1.5 })).join(''),
    S.path('M262 232 q10 -8 20 0 t20 0 t20 0 t20 0', { c: M, w: 2 }),
    S.path('M262 246 q10 -8 20 0 t20 0 t20 0 t20 0', { c: M, w: 2 }),
    [[268, 227], [288, 229], [308, 226], [328, 229], [268, 241], [288, 243], [308, 240]].map(([x, y]) => S.circle(x, y, 1.6, { fill: M, c: 'none' })).join(''),
    golgi(340, 244),
    ac.out,
    lab(310, 364, 'Schematic, not to scale', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 3. prokaryotic against eukaryotic
const bact = { x: 30, y: 120, w: 250, h: 84 };
function dots(pts, c = M) {
  return pts.map(([x, y]) => S.circle(x, y, 2, { fill: c, c: 'none' })).join('');
}
const prokDots = [[60, 140], [75, 188], [108, 192], [180, 140], [205, 190], [240, 150], [250, 180], [90, 138]];
chk(prokDots.every(([x, y]) => x > bact.x && x < bact.x + bact.w && y > bact.y && y < bact.y + bact.h), 'prokaryote: every ribosome dot lies inside the cell');
const eE = { cx: 500, cy: 160, rx: 105, ry: 100 };
const eNuc = { cx: 495, cy: 150, r: 38 };
chk(inside(eNuc.cx, eNuc.cy, eE, 0.7), 'eukaryote: the nucleus lies inside the cell membrane');
export const PRO_EUK = svgDoc(
  720,
  330,
  'Schematic comparison, not to scale. Left, a prokaryotic cell such as a bacterium: a cell wall and membrane, a nucleoid of circular DNA with no nuclear membrane, ribosomes, and a flagellum. Right, a eukaryotic cell: a true nucleus surrounded by a nuclear membrane, plus mitochondria, endoplasmic reticulum and a Golgi apparatus. A bacterium is usually about ten times smaller across.',
  [
    lab(155, 28, 'Prokaryotic cell (bacterium)', { a: 'middle', w: 'bold', size: 12 }),
    lab(470, 28, 'Eukaryotic cell (animal)', { a: 'middle', w: 'bold', size: 12 }),
    S.rect(bact.x - 6, bact.y - 6, bact.w + 12, bact.h + 12, { c: BR, sw: 1.5, rx: 42, dash: '4 3' }),
    S.rect(bact.x, bact.y, bact.w, bact.h, { c: BR, sw: 4, rx: 38 }),
    S.rect(bact.x + 5, bact.y + 5, bact.w - 10, bact.h - 10, { c: A, sw: 1.5, rx: 33, fill: Y, fop: 0.06 }),
    S.path('M120 150 q15 -22 35 -8 q22 14 8 34 q-14 18 -34 6 q-22 -12 -9 -32', { c: A, w: 2.5, fill: A, fop: 0.15 }),
    S.circle(215, 160, 7, { c: A, sw: 1.5 }),
    dots(prokDots),
    S.path('M280 162 q12 -14 24 0 t24 0 t24 0', { c: M, w: 2.5 }),
    S.lead(50, 66, 54, 116),
    lab(30, 62, 'Capsule (outer layer)', { a: 'start' }),
    lab(30, 245, 'Cell wall', {}),
    S.lead(60, 238, 66, 206),
    lab(110, 262, 'Cell membrane', {}),
    S.lead(140, 255, 150, 202),
    lab(110, 92, 'Nucleoid: circular DNA,', { a: 'start' }),
    lab(110, 105, 'no nuclear membrane', { a: 'start' }),
    S.lead(150, 109, 142, 146),
    lab(245, 245, 'Ribosomes (dots)', {}),
    S.lead(270, 238, 244, 188),
    lab(300, 120, 'Flagellum', {}),
    S.lead(320, 126, 318, 154),
    lab(215, 140, 'Plasmid', { a: 'middle', size: 10 }),
    '<g transform="translate(-30 0)">',
    S.ellipse(eE.cx, eE.cy, eE.rx, eE.ry, { c: A, sw: 3, fill: Y, fop: 0.06 }),
    nucleus(eNuc.cx, eNuc.cy, eNuc.r),
    S.circle(eNuc.cx, eNuc.cy, eNuc.r + 5, { c: A, sw: 1, dash: '3 3' }),
    mito(430, 180, 20),
    mito(570, 205, -30),
    S.path('M455 225 q10 -8 20 0 t20 0 t20 0', { c: M, w: 2 }),
    golgi(560, 120),
    lab(395, 62, 'Cell membrane', { a: 'end' }),
    S.lead(399, 60, 430, 110),
    lab(395, 270, 'Mitochondrion', { a: 'end' }),
    S.lead(399, 268, 432, 187),
    lab(610, 62, 'Nuclear membrane', {}),
    S.lead(606, 66, 534, 128),
    lab(610, 250, 'Endoplasmic reticulum', {}),
    S.lead(606, 246, 515, 226),
    lab(500, 300, 'Nucleus (with nuclear membrane)', { a: 'middle' }),
    S.lead(500, 288, 495, 190),
    '</g>',
    lab(360, 322, 'Schematic, not to scale: a bacterium is usually about 1 to 5 micrometres long, an animal cell about 10 to 100.', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 4. osmosis set-up (thistle funnel in a beaker)
// Volume of water that enters the funnel = rise in the stem x stem area. Beaker level falls by volume / beaker area.
const stemArea = 0.5; // cm2 (illustrative)
const waterIn = 1.5; // cm3 (illustrative)
const rise = waterIn / stemArea; // cm of stem
const beakerArea = 30; // cm2
const drop = waterIn / beakerArea;
chk(near(rise, 3.0) && near(drop, 0.05, 0.01), 'osmosis set-up: 1.5 cm3 entering a 0.5 cm2 stem raises the level 3.0 cm; a 30 cm2 beaker falls only 0.05 cm');
const pxPerCm = 12;
function osmosisPanel(x0, title, riseCm) {
  const bx = x0 + 10;
  const by = 100;
  const bw = 210;
  const bh = 190;
  const stemX = x0 + 115;
  const levelY0 = by + 55;
  const levelY = levelY0 - riseCm * pxPerCm;
  let o = lab(x0 + 115, 22, title, { a: 'middle', w: 'bold', size: 12 });
  o += S.rect(bx, by + 30, bw, bh - 30, { c: 'currentColor', sw: 2, fill: B, fop: 0.18 });
  // funnel bulb (trapezoid) with the membrane across its mouth, and the stem going up
  o += S.path(`M${stemX - 6} ${levelY - 40} L${stemX - 6} ${by + 100} L${stemX - 46} ${by + 150} L${stemX + 46} ${by + 150} L${stemX + 6} ${by + 100} L${stemX + 6} ${levelY - 40}`, { c: 'currentColor', sw: 2, fill: Y, fop: 0 });
  o += S.path(`M${stemX - 6} ${levelY} L${stemX - 6} ${by + 100} L${stemX - 46} ${by + 150} L${stemX + 46} ${by + 150} L${stemX + 6} ${by + 100} L${stemX + 6} ${levelY} Z`, { c: 'none', sw: 0, fill: BR, fop: 0.3 });
  o += S.line(stemX - 46, by + 150, stemX + 46, by + 150, { c: A, w: 3, dash: '5 3' });
  // sugar particles (brown) in the funnel, water particles (blue) everywhere
  const sugar = [[-30, 138], [-12, 140], [8, 138], [28, 140], [-20, 122], [2, 124], [22, 122], [-6, 108], [8, 98]];
  o += sugar.map(([dx, y]) => S.circle(stemX + dx, by + y - (riseCm ? 0 : 0), 4.5, { fill: BR, c: 'none' })).join('');
  const water = [[-70, 175], [-45, 168], [-20, 176], [20, 175], [48, 169], [75, 176], [-80, 160], [80, 158], [0, 164]];
  o += water.map(([dx, y]) => S.circle(stemX + dx, by + y, 2.5, { fill: B, c: 'none' })).join('');
  // water-level mark in the stem
  o += S.line(stemX - 16, levelY, stemX + 16, levelY, { c: R, w: 2 });
  o += lab(stemX + 22, levelY + 4, riseCm ? 'level has risen' : 'level mark', { size: 10, c: R });
  o += S.line(bx - 10, by + 30 + (riseCm ? drop : 0), bx, by + 30 + (riseCm ? drop : 0), { c: M, w: 1 });
  return { o, levelY };
}
const p1 = osmosisPanel(0, 'Start', 0);
const p2 = osmosisPanel(300, 'After some hours', rise);
chk(p2.levelY < p1.levelY - 30 && p2.levelY > 20, 'osmosis set-up: the level mark in the stem is higher after some hours and still inside the picture');
export const OSMOSIS = svgDoc(
  600,
  330,
  'Osmosis set-up, schematic. A funnel with its mouth covered by a selectively permeable membrane holds sugar solution and stands in a beaker of water. Left, at the start, the level in the stem is at a mark. Right, after some hours, water molecules have passed through the membrane into the funnel, so the level in the stem is higher. Sugar molecules are too big to pass out.',
  [
    p1.o,
    p2.o,
    S.arrow(425, 275, 425, 245, { c: B, w: 2.5, size: 8 }),
    lab(130, 318, 'Membrane: water passes, sugar does not', { a: 'middle', size: 10, c: A }),
    lab(432, 266, 'water enters', { a: 'start', size: 10, c: B }),
    S.circle(486, 318, 4, { fill: BR, c: 'none' }),
    lab(494, 322, 'sugar', { size: 10 }),
    S.circle(540, 318, 3, { fill: B, c: 'none' }),
    lab(548, 322, 'water', { size: 10 }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. plant cell in three solutions
const cellBox = 110;
const gaps = { hypo: 3, iso: 12, hyper: 34 };
const areaOf = (g) => (cellBox - 2 * g) ** 2;
chk(areaOf(gaps.hypo) > areaOf(gaps.iso) && areaOf(gaps.iso) > areaOf(gaps.hyper), 'plasmolysis picture: the protoplast gets smaller from pure water to strong solution');
function stateCell(x0, g, title, sub, arrow) {
  const y0 = 70;
  return (
    lab(x0 + cellBox / 2 + 10, 30, title, { a: 'middle', w: 'bold' }) +
    lab(x0 + cellBox / 2 + 10, 46, sub, { a: 'middle', size: 10, c: M }) +
    S.rect(x0 + 10, y0, cellBox, cellBox, { c: BR, sw: 5, rx: 6 }) +
    S.rect(x0 + 10 + g, y0 + g, cellBox - 2 * g, cellBox - 2 * g, { c: A, sw: 1.5, rx: 10, fill: B, fop: 0.2 }) +
    S.circle(x0 + 10 + cellBox / 2 + 8, y0 + cellBox / 2 - 8, 9, { c: A, sw: 1.5, fill: A, fop: 0.2 }) +
    arrow
  );
}
const inArrows = (x0) => S.arrow(x0 - 4, 125, x0 + 14, 125, { c: B, w: 2, size: 6 }) + S.arrow(x0 + 146, 125, x0 + 128, 125, { c: B, w: 2, size: 6 });
const outArrows = (x0) => S.arrow(x0 + 20, 125, x0 + 2, 125, { c: R, w: 2, size: 6 }) + S.arrow(x0 + 120, 125, x0 + 138, 125, { c: R, w: 2, size: 6 });
export const PLASMOLYSIS = svgDoc(
  620,
  270,
  'Plant cell in three solutions, schematic. In pure water or a weaker solution (hypotonic) water enters, the vacuole swells and the cell becomes turgid, pressing on the cell wall. In a solution of equal strength (isotonic) there is no net movement and the cell is firm but not swollen. In a stronger solution (hypertonic) water leaves, the protoplast shrinks away from the cell wall and the cell is plasmolysed.',
  [
    stateCell(10, gaps.hypo, 'Weaker outside', 'hypotonic solution', inArrows(10)),
    stateCell(210, gaps.iso, 'Equal outside', 'isotonic solution', ''),
    stateCell(410, gaps.hyper, 'Stronger outside', 'hypertonic solution', outArrows(410)),
    lab(75, 205, 'Endosmosis: water enters', { a: 'middle', size: 10, c: B }),
    lab(75, 219, 'Cell is turgid', { a: 'middle', size: 10 }),
    lab(275, 205, 'No net movement', { a: 'middle', size: 10 }),
    lab(275, 219, 'Cell is firm', { a: 'middle', size: 10 }),
    lab(475, 205, 'Exosmosis: water leaves', { a: 'middle', size: 10, c: R }),
    lab(475, 219, 'Plasmolysis: membrane pulls', { a: 'middle', size: 10 }),
    lab(475, 232, 'away, leaving a gap', { a: 'middle', size: 10 }),
  ].join(''),
);

// ---------------------------------------------------------------- 6. mitosis against meiosis: chromosome-number flow
const parent = { long: 2, short: 2 }; // 2n = 4 in the schematic
const nPar = parent.long + parent.short;
const mitosisDaughters = { cells: 2, per: nPar };
const meiosisProducts = { cells: 4, per: nPar / 2 };
chk(mitosisDaughters.per === 4 && mitosisDaughters.cells === 2, 'mitosis: one cell with 4 chromosomes gives 2 cells with 4 each');
chk(meiosisProducts.per === 2 && meiosisProducts.cells === 4, 'meiosis: one cell with 4 chromosomes gives 4 cells with 2 each');
chk(46 / 2 === 23 && meiosisProducts.cells * 23 === 92, 'meiosis: a human cell with 46 chromosomes gives 4 cells with 23 each');
/** A cell circle with chromosomes drawn as short rods; each rod may be doubled (two chromatids). */
function cellWith(cx, cy, r, { long, short }, doubled = false) {
  let o = S.circle(cx, cy, r, { c: A, sw: 2, fill: Y, fop: 0.06 });
  const rods = [];
  for (let i = 0; i < long; i++) rods.push(['L', B]);
  for (let i = 0; i < short; i++) rods.push(['S', G]);
  rods.forEach(([k, c], i) => {
    const len = k === 'L' ? 15 : 9;
    const ang = (i / rods.length) * Math.PI * 2 + 0.6;
    const px = cx + Math.cos(ang) * r * 0.45;
    const py = cy + Math.sin(ang) * r * 0.45;
    if (doubled) {
      o += S.line(px - 2, py - len / 2, px - 2, py + len / 2, { c, w: 2.5, cap: 'round' }) + S.line(px + 2, py - len / 2, px + 2, py + len / 2, { c, w: 2.5, cap: 'round' });
    } else o += S.line(px, py - len / 2, px, py + len / 2, { c, w: 3.5, cap: 'round' });
  });
  return o;
}
const r1 = 28;
const r2 = 22;
const mitoY = [190, 300];
export const MITOSIS_MEIOSIS = svgDoc(
  700,
  400,
  'Chromosome numbers in mitosis and meiosis, schematic. Both start with one parent cell with four chromosomes. In mitosis one division makes two identical cells with four chromosomes each, for growth and repair. In meiosis two divisions make four cells with two chromosomes each, the gametes. For a human cell, 46 chromosomes become two cells with 46 by mitosis, and four cells with 23 by meiosis.',
  [
    lab(140, 24, 'Mitosis: growth and repair', { a: 'middle', w: 'bold', size: 12 }),
    lab(500, 24, 'Meiosis: making gametes', { a: 'middle', w: 'bold', size: 12 }),
    S.line(330, 12, 330, 330, { c: M, w: 1, dash: '3 4' }),
    // mitosis column
    cellWith(140, 70, r1, parent),
    lab(140, 118, 'Parent cell: 4 chromosomes', { a: 'middle', size: 10 }),
    S.arrow(140, 124, 140, 150, { size: 7 }),
    lab(150, 142, 'DNA copied, then 1 division', { a: 'start', size: 10, c: A }),
    cellWith(85, 190, r2, parent),
    cellWith(195, 190, r2, parent),
    lab(140, 232, '2 cells, 4 chromosomes each', { a: 'middle', size: 10 }),
    lab(140, 250, 'Identical to the parent cell', { a: 'middle', size: 10, c: M }),
    // meiosis column
    cellWith(500, 70, r1, parent),
    lab(500, 118, 'Parent cell: 4 chromosomes', { a: 'middle', size: 10 }),
    S.arrow(500, 124, 500, 150, { size: 7 }),
    lab(510, 142, 'DNA copied, then 2 divisions', { a: 'start', size: 10, c: A }),
    cellWith(445, 190, r2, { long: 1, short: 1 }, true),
    cellWith(555, 190, r2, { long: 1, short: 1 }, true),
    lab(500, 168, 'after the 1st division', { a: 'middle', size: 10, c: M }),
    S.arrow(445, 214, 420, 262, { size: 6 }),
    S.arrow(445, 214, 470, 262, { size: 6 }),
    S.arrow(555, 214, 530, 262, { size: 6 }),
    S.arrow(555, 214, 580, 262, { size: 6 }),
    [420, 470, 530, 580].map((x) => cellWith(x, 286, 18, { long: 1, short: 1 })).join(''),
    lab(500, 324, '4 cells, 2 chromosomes each (half)', { a: 'middle', size: 10 }),
    lab(500, 342, 'Gametes: sperm or egg cells', { a: 'middle', size: 10, c: M }),
    // bottom human line
    S.line(20, 360, 640, 360, { c: M, w: 1 }),
    lab(140, 382, 'Human: 46 to two cells of 46', { a: 'middle', size: 11 }),
    lab(500, 382, 'Human: 46 to four cells of 23', { a: 'middle', size: 11 }),
    lab(140, 276, 'Blue rods: long chromosomes; green rods: short ones', { a: 'middle', size: 10, c: M }),
  ].join(''),
);
void mitoY;
