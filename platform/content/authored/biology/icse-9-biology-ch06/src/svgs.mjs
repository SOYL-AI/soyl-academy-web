// SVG diagrams for ICSE 9 Biology ch06 Respiration in Plants. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';

// ---------------------------------------------------------------- 1. where respiration happens in a cell (named and lettered A-E)
function cell(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  p.push(S.rect(150, 44, 380, 200, { rx: 40, fill: 'var(--diagram-fill)', fop: 1, sw: 2 }));
  // mitochondrion
  p.push(S.ellipse(420, 146, 80, 48, { fill: YEL, fop: 0.25, sw: 2 }));
  p.push(S.path('M366 146 Q380 120 394 146 T422 146 T450 146 T478 146', { c: BROWN, w: 1.4 }));
  // glycolysis box in the cytoplasm
  p.push(S.rect(198, 98, 96, 50, { rx: 8, fill: GREEN, fop: 0.2, sw: 1.6 }));
  if (!lettered) p.push(S.text(246, 128, 'Glycolysis', { a: 'middle', size: 12, w: 'bold' }));
  // glucose in, pyruvate across, oxygen in, products out
  p.push(S.text(70, 108, 'Glucose', { a: 'middle', size: 11 }), S.arrow(24, 122, 196, 122, { size: 7 }));
  p.push(S.arrow(296, 122, 344, 134, { size: 7 }));
  p.push(S.arrow(420, 26, 420, 96, { c: BLUE, size: 7 }));
  p.push(S.arrow(502, 146, 560, 146, { size: 7 }));
  if (!lettered) p.push(S.lines(566, 130, ['Carbon', 'dioxide,', 'water and', 'energy'], { size: 11, dy: 13 }));
  if (!lettered) {
    p.push(S.text(420, 126, 'Krebs cycle', { a: 'middle', size: 11, w: 'bold' }));
    p.push(S.text(312, 100, 'Pyruvate', { a: 'middle', size: 11 }));
    p.push(S.text(432, 20, 'Oxygen', { size: 11 }));
    p.push(S.text(160, 62, 'Cytoplasm', { size: 11 }));
    p.push(S.text(420, 218, 'Mitochondrion', { a: 'middle', size: 11 }), S.lead(420, 205, 420, 192));
  } else {
    p.push(S.text(172, 70, 'A', o));
    p.push(S.text(316, 100, 'C', { a: 'middle', ...o }));
    p.push(S.text(436, 20, 'E', o));
    p.push(S.text(420, 224, 'B', { a: 'middle', ...o }), S.lead(420, 210, 420, 192));
    p.push(S.text(572, 152, 'D', o));
  }
  // anaerobic branch
  p.push(S.arrow(246, 150, 246, 198, { c: RED, dash: '4 3', size: 6 }));
  p.push(S.lines(160, 214, ['Without oxygen: alcohol,', 'carbon dioxide, little energy'], { size: 10, dy: 12, c: MUTED }));
  const name = lettered
    ? 'A plant cell showing where respiration happens, with parts lettered: A the jelly-like fluid of the cell where glucose is first broken down, B the oval structure with folded inner membranes, C the three-carbon substance passing from the fluid into that structure, D the products leaving the cell, E the gas entering that structure; a dashed arrow shows the route when there is no oxygen'
    : 'A plant cell showing respiration: glucose enters and is broken down in the cytoplasm by glycolysis to pyruvate; pyruvate enters the mitochondrion, where, with oxygen, the Krebs cycle releases carbon dioxide, water and energy; a dashed arrow shows that without oxygen the products are alcohol, carbon dioxide and a little energy';
  return svgDoc(660, 250, name, p.join(''));
}
export const CELL = cell(false);
export const CELL_LETTERED = cell(true);

// ---------------------------------------------------------------- 2. carbon dioxide from germinating seeds (with or without the results)
function co2(results) {
  const p = [];
  const flask = (cx, live, name) => {
    p.push(S.rect(cx - 16, 62, 32, 12, { fill: BROWN, fop: 0.5, sw: 1.4 }));
    p.push(S.path(`M${cx - 14} 74 L${cx - 14} 112 L${cx - 66} 222 L${cx + 66} 222 L${cx + 14} 112 L${cx + 14} 74`, { w: 2 }));
    for (const [dx, dy] of [[-30, 208], [-12, 211], [8, 209], [26, 207], [-20, 196], [0, 198], [18, 195]]) p.push(S.ellipse(cx + dx, dy, 6, 4, { fill: live ? GREEN : BROWN, fop: 0.7, sw: 1 }));
    // delivery tube into a test tube of lime water
    const tx = cx + 120;
    p.push(S.path(`M${cx} 58 L${cx} 40 L${tx} 40 L${tx} 214`, { w: 2.2 }));
    p.push(S.rect(tx - 24, 150, 48, 90, { rx: 8, sw: 1.8 }));
    p.push(S.rect(tx - 22, 190, 44, 48, { fill: results && live ? MUTED : BLUE, fop: results && live ? 0.5 : 0.18, sw: 0 }));
    p.push(S.text(cx, 268, name[0], { a: 'middle', size: 12, w: 'bold' }), S.text(cx, 282, name[1], { a: 'middle', size: 11 }));
    if (results) p.push(S.text(tx, 256 + 0, live ? 'Turns milky' : 'Stays clear', { a: 'middle', size: 11, c: live ? RED : GREEN }));
    return tx;
  };
  const t1 = flask(110, true, ['Flask X', 'Soaked seeds']);
  flask(400, false, ['Flask Y', 'Soaked seeds, boiled and cooled']);
  p.push(S.text(70, 58, 'Cork', { a: 'end', size: 11 }), S.lead(74, 56, 94, 66));
  p.push(S.text(170, 30, 'Delivery tube', { a: 'middle', size: 11 }));
  p.push(S.text(t1 + 30, 178, 'Lime water', { size: 11 }), S.lead(t1 + 28, 176, t1 + 18, 198));
  return svgDoc(600, 292, results
    ? 'Two flasks, each with a cork and a delivery tube dipping into lime water. Flask X holds soaked germinating seeds and its lime water turns milky; flask Y holds boiled seeds and its lime water stays clear'
    : 'Two flasks, each with a cork and a delivery tube dipping into a test tube of lime water. Flask X holds soaked seeds; flask Y holds soaked seeds that were boiled and cooled', p.join(''));
}
export const CO2_SET = co2(true);
export const CO2_SET_BLIND = co2(false);

// ---------------------------------------------------------------- 3. heat from germinating seeds in two vacuum flasks
export const THERMOS = (() => {
  const p = [];
  const flask = (cx, name, live) => {
    p.push(S.rect(cx - 46, 74, 92, 150, { rx: 14, sw: 2 }));
    p.push(S.rect(cx - 38, 82, 76, 134, { rx: 10, c: MUTED, sw: 1, dash: '3 3' }));
    p.push(S.rect(cx - 34, 140, 68, 74, { rx: 6, fill: live ? GREEN : BROWN, fop: 0.22, sw: 0 }));
    for (const [dx, dy] of [[-20, 156], [0, 160], [20, 156], [-10, 178], [12, 180], [-22, 198], [2, 200], [22, 198]]) p.push(S.ellipse(cx + dx, dy, 7, 4.5, { fill: live ? GREEN : BROWN, fop: 0.7, sw: 1 }));
    p.push(S.rect(cx - 24, 54, 48, 28, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.4 }));
    p.push(S.line(cx, 16, cx, 168, { w: 2 }), S.circle(cx, 172, 6, { fill: RED, fop: 0.7, sw: 1.4 }));
    p.push(S.text(cx, 250, name[0], { a: 'middle', size: 12, w: 'bold' }), S.text(cx, 264, name[1], { a: 'middle', size: 11 }));
  };
  flask(120, ['Flask A', 'Soaked germinating seeds'], true);
  flask(440, ['Flask B', 'Soaked seeds, boiled and cooled'], false);
  p.push(S.text(186, 66, 'Cotton wool', { size: 11 }), S.lead(182, 62, 146, 66));
  p.push(S.text(186, 30, 'Thermometer', { size: 11 }), S.lead(182, 28, 124, 34));
  p.push(S.text(186, 232, 'Vacuum flask', { size: 11 }), S.lead(182, 228, 164, 218));
  return svgDoc(580, 274, 'Two vacuum flasks, each closed with cotton wool and holding a thermometer whose bulb lies among the seeds. Flask A holds soaked germinating seeds; flask B holds soaked seeds that were boiled and cooled', p.join(''));
})();
