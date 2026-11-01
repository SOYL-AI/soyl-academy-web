// SVG diagrams for ICSE 10 Biology ch04 Transpiration. All new, schematic drawings; chart values come from calc.mjs.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { POT, WEIGHT } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const mirror = (d, cx) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => `${Math.round((2 * cx - Number(x)) * 10) / 10} ${y}`);

// ---------------------------------------------------------------- 1. stomatal apparatus, open and closed (named and lettered)
function stoma(lettered) {
  const p = [];
  const panel = (cx, cy, open) => {
    p.push(S.rect(cx - 110, cy - 80, 220, 160, { rx: 6, fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
    for (const d of [`M${cx - 110} ${cy - 20} L${cx - 54} ${cy - 30}`, `M${cx - 110} ${cy + 30} L${cx - 54} ${cy + 26}`, `M${cx - 60} ${cy - 80} L${cx - 30} ${cy - 52}`, `M${cx - 50} ${cy + 80} L${cx - 26} ${cy + 54}`, `M${cx - 84} ${cy - 80} L${cx - 84} ${cy - 24}`, `M${cx - 84} ${cy + 80} L${cx - 84} ${cy + 30}`]) {
      p.push(S.path(d, { c: 'var(--diagram-muted)', w: 1 }), S.path(mirror(d, cx), { c: 'var(--diagram-muted)', w: 1 }));
    }
    const inner = open ? 22 : 0;
    const e = open ? 4 : 1;
    const g = `M${cx - e} ${cy - 54} Q${cx - 50} ${cy - 52} ${cx - 50} ${cy} Q${cx - 50} ${cy + 52} ${cx - e} ${cy + 54} Q${cx - inner - e} ${cy} ${cx - e} ${cy - 54} Z`;
    p.push(S.path(g, { fill: 'var(--diagram-green)', fop: 0.25, w: 1.4 }), S.path(mirror(g, cx), { fill: 'var(--diagram-green)', fop: 0.25, w: 1.4 }));
    const wall = `M${cx - e} ${cy - 54} Q${cx - inner - e} ${cy} ${cx - e} ${cy + 54}`;
    p.push(S.path(wall, { w: 4, c: 'var(--diagram-brown)' }), S.path(mirror(wall, cx), { w: 4, c: 'var(--diagram-brown)' }));
    for (const [dx, dy] of [[-36, -26], [-40, 4], [-34, 30], [-24, -40]]) p.push(S.ellipse(cx + dx, cy + dy, 5, 3, { fill: 'var(--diagram-green)', sw: 0.6 }), S.ellipse(cx - dx, cy + dy, 5, 3, { fill: 'var(--diagram-green)', sw: 0.6 }));
    p.push(S.circle(cx - 30, cy + 12, 4, { fill: 'var(--diagram-muted)', sw: 0.6 }), S.circle(cx + 30, cy + 12, 4, { fill: 'var(--diagram-muted)', sw: 0.6 }));
  };
  const A = 230, B = 480, Y = 140;
  panel(A, Y, true);
  panel(B, Y, false);
  p.push(S.text(A, 22, 'Stoma open (light)', { a: 'middle', size: 12, w: 'bold' }), S.text(B, 22, 'Stoma closed (dark)', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.text(A, 242, 'K+ ions enter the guard cells; water follows;', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), S.text(A, 255, 'guard cells turgid and curved apart', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.text(B, 242, 'K+ ions leave; water follows them out;', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), S.text(B, 255, 'guard cells flaccid and straight', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Guard cell', 'Stomatal pore', 'Chloroplast', 'Thick inner wall', 'Epidermal cell'];
  const o = lettered ? { size: 15, w: 'bold' } : {};
  const left = (x, y, ty, s) => p.push(S.lead(x, y, 108, ty - 4), lab(104, ty, s, { a: 'end', ...o }));
  left(A - 80, Y - 50, 80, L[4]);
  left(A - 14, Y - 26, 112, L[3]);
  left(A - 44, Y + 2, 150, L[0]);
  left(A - 34, Y + 30, 190, L[2]);
  p.push(S.lead(A, Y - 24, A + 16, 52), lab(A + 20, 54, L[1], o));
  const label = lettered
    ? 'Surface view of a stoma, open in light (left) and closed in dark (right). In the open stoma: A, one of two bean-shaped cells around the opening; B, the opening between them; C, a small green body inside A; D, the thickened wall of A facing the opening; E, one of the irregular cells surrounding A. Captions: in light potassium ions and water enter, the cells become turgid and curve apart; in dark they leave, the cells become flaccid and straight'
    : 'Surface view of a stoma, open in light (left) and closed in dark (right). Two bean-shaped guard cells with chloroplasts and a thick inner wall surround the stomatal pore, among irregular epidermal cells. In light potassium ions and water enter the guard cells, which become turgid and curve apart; in dark they leave and the guard cells become flaccid and straight, closing the pore';
  return svgDoc(600, 266, label, p.join(''));
}
export const STOMA = stoma(false);
export const STOMA_LETTERED = stoma(true);

// ---------------------------------------------------------------- 2. Ganong's potometer
export const POTOMETER = (() => {
  const p = [];
  // leafy shoot through a cork
  p.push(S.line(90, 96, 90, 30, { c: 'var(--diagram-green)', w: 3 }));
  for (const [x, y, s] of [[72, 40, -1], [108, 52, 1], [72, 66, -1], [108, 78, 1]]) p.push(S.ellipse(x, y, 16, 6, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 }), S.line(90, y + 2, x - s * 6, y, { c: 'var(--diagram-green)', w: 1.2 }));
  p.push(S.rect(78, 96, 24, 14, { rx: 2, fill: 'var(--diagram-brown)', fop: 0.6, sw: 1 }));
  // main vertical tube and horizontal tube
  p.push(S.path('M80 110 L80 214 L520 214 L520 226 L68 226 L68 110', { w: 0 }));
  p.push(S.rect(80, 110, 20, 104, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.4 }));
  p.push(S.rect(80, 204, 190, 14, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.4 }));
  // reservoir with stopcock
  p.push(S.path('M188 50 L232 50 L214 104 L206 104 Z', { fill: 'var(--diagram-blue)', fop: 0.25, w: 1.4 }), S.rect(206, 104, 8, 100, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.2 }));
  p.push(S.rect(196, 140, 28, 10, { rx: 3, fill: 'var(--diagram-fill)', fop: 1, sw: 1.3 }));
  // graduated capillary
  p.push(S.rect(270, 207, 250, 8, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.2 }));
  for (let x = 280; x <= 510; x += 10) p.push(S.line(x, 199, x, x % 50 === 0 ? 193 : 196, { w: 0.8 }));
  p.push(S.ellipse(400, 211, 9, 3.5, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  p.push(S.arrow(392, 182, 352, 182, { c: 'var(--diagram-red)', size: 7 }));
  // bent end into a beaker
  p.push(S.path('M520 211 L540 211 L540 270', { c: 'var(--diagram-blue)', w: 3 }));
  p.push(S.path('M512 236 L512 290 L572 290 L572 236', { w: 1.4 }), S.rect(513, 252, 58, 37, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 0 }));
  // labels
  p.push(S.lead(110, 46, 140, 30), lab(144, 30, 'Leafy shoot'));
  p.push(S.lead(102, 104, 110, 126), lab(112, 132, 'Airtight cork'), lab(112, 145, '(Vaseline seal)'));
  p.push(S.lead(232, 56, 262, 56), lab(266, 60, 'Reservoir'));
  p.push(S.lead(224, 145, 262, 145), lab(266, 149, 'Stopcock (closed during reading)'));
  p.push(S.lead(408, 211, 430, 166), lab(424, 160, 'Air bubble'));
  p.push(lab(398, 186, 'Bubble moves towards the shoot', { c: 'var(--diagram-red)' }));
  p.push(S.lead(330, 216, 330, 246), lab(250, 258, 'Graduated capillary tube'));
  p.push(lab(512, 304, 'Beaker of water'));
  return svgDoc(600, 312, "Ganong's potometer. A leafy shoot is fixed by an airtight cork into a water-filled tube, which joins a horizontal graduated capillary tube whose far end dips into a beaker of water. A reservoir with a stopcock refills the apparatus. As the shoot takes up water, an air bubble in the capillary moves towards the shoot; the distance it moves in a given time measures the rate of water uptake", p.join(''));
})();

// ---------------------------------------------------------------- 3. bell jar experiment
export const BELLJAR = (() => {
  const p = [];
  const jar = (cx, plant, title) => {
    p.push(S.line(cx - 110, 262, cx + 110, 262, { w: 3, c: 'var(--diagram-muted)' }));
    p.push(S.path(`M${cx - 90} 262 L${cx - 90} 110 Q${cx - 90} 40 ${cx} 40 Q${cx + 90} 40 ${cx + 90} 110 L${cx + 90} 262`, { w: 1.6 }));
    p.push(S.circle(cx, 34, 6, { w: 1.4 }));
    p.push(S.path(`M${cx - 30} 212 L${cx + 30} 212 L${cx + 22} 258 L${cx - 22} 258 Z`, { fill: 'var(--diagram-brown)', fop: 0.4, w: 1.3 }));
    p.push(S.path(`M${cx - 34} 208 Q${cx} 196 ${cx + 34} 208 L${cx + 26} 260 L${cx - 26} 260 Z`, { fill: 'var(--diagram-fill)', fop: 0.5, w: 1, dash: '3 2' }));
    if (plant) {
      p.push(S.line(cx, 206, cx, 120, { c: 'var(--diagram-green)', w: 3 }));
      for (const [dx, y] of [[-24, 130], [24, 144], [-24, 160], [24, 176], [-22, 190]]) p.push(S.ellipse(cx + dx, y, 20, 7, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 }));
      for (const [x, y] of [[cx - 80, 100], [cx - 84, 140], [cx - 82, 180], [cx + 80, 96], [cx + 84, 132], [cx + 82, 170], [cx - 60, 64], [cx + 58, 62], [cx - 84, 218], [cx + 84, 210]]) p.push(S.circle(x, y, 3.5, { fill: 'var(--diagram-blue)', fop: 0.7, sw: 0 }));
    }
    p.push(S.text(cx, 288, title, { a: 'middle', size: 12, w: 'bold' }));
  };
  jar(130, true, 'A: potted leafy plant');
  jar(410, false, 'B: control, pot without a plant');
  p.push(S.lead(214, 132, 228, 112), lab(232, 104, 'Drops of'), lab(232, 117, 'water'));
  p.push(S.lead(170, 222, 228, 222), lab(232, 218, 'Pot covered'), lab(232, 231, 'with polythene'));
  p.push(S.lead(496, 90, 520, 70), lab(500, 62, 'Bell jar'));
  p.push(S.lead(500, 262, 520, 248), lab(504, 242, 'Glass plate'));
  return svgDoc(560, 298, 'Bell jar experiment. A: a potted leafy plant with its pot and soil covered in polythene, under a bell jar on a glass plate; after a few hours drops of water appear on the inner wall of the jar. B: a control set-up with a covered pot but no plant; no drops appear', p.join(''));
})();

// ---------------------------------------------------------------- 4. cobalt chloride paper on a dorsiventral leaf
export const COBALT_FIG = (() => {
  const p = [];
  p.push(S.rect(110, 70, 320, 8, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  p.push(S.rect(200, 78, 140, 7, { fill: 'var(--diagram-blue)', fop: 0.8, sw: 0.8 }));
  p.push(S.path('M90 98 Q270 82 450 98 L450 112 Q270 128 90 112 Z', { fill: 'var(--diagram-green)', fop: 0.45, w: 1.4 }));
  p.push(S.rect(200, 120, 140, 7, { fill: 'var(--diagram-red)', fop: 0.45, sw: 0.8 }));
  p.push(S.rect(110, 127, 320, 8, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  for (const x of [118, 400]) p.push(S.rect(x, 62, 22, 82, { rx: 3, w: 0, fill: 'var(--diagram-muted)', fop: 0.3, sw: 1 }));
  p.push(S.lead(330, 70, 380, 40), lab(384, 36, 'Glass slide'));
  p.push(S.lead(270, 80, 270, 40), lab(150, 30, 'Cobalt chloride paper on the upper'), lab(150, 44, 'surface: stays blue much longer'));
  p.push(S.lead(440, 104, 470, 104), lab(474, 100, 'Leaf'), lab(474, 113, '(dorsiventral)'));
  p.push(S.lead(270, 126, 270, 168), lab(150, 182, 'Cobalt chloride paper on the lower surface:'), lab(150, 196, 'turns pink first (more stomata)'));
  p.push(S.lead(129, 144, 100, 170), lab(40, 182, 'Clip'));
  p.push(lab(110, 226, 'Dry cobalt chloride paper is blue; it turns pink when it absorbs water vapour.', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(560, 236, 'Cobalt chloride paper experiment. A dorsiventral leaf, still on the plant, has a strip of dry blue cobalt chloride paper on its upper and lower surfaces, each covered by a glass slide and held by clips. The paper on the lower surface turns pink first because the lower surface has more stomata; the paper on the upper surface stays blue much longer', p.join(''));
})();

// ---------------------------------------------------------------- 5. loss-of-weight experiment
export const WEIGHT_FIG = (() => {
  const p = [];
  const flask = (cx, leafy, reading, title) => {
    p.push(S.rect(cx - 70, 236, 140, 18, { rx: 3, fill: 'var(--diagram-fill)', fop: 1, sw: 1.3 }), S.rect(cx - 28, 240, 56, 12, { rx: 2, sw: 1 }), S.text(cx, 250, reading, { a: 'middle', size: 10, w: 'bold' }));
    p.push(S.path(`M${cx - 14} 120 L${cx - 14} 160 L${cx - 52} 230 L${cx + 52} 230 L${cx + 14} 160 L${cx + 14} 120`, { w: 1.5 }));
    p.push(S.path(`M${cx - 26} 182 L${cx - 52} 230 L${cx + 52} 230 L${cx + 26} 182 Z`, { fill: 'var(--diagram-blue)', fop: 0.3, w: 0 }));
    p.push(S.path(`M${cx - 26} 174 L${cx + 26} 174 L${cx + 30} 182 L${cx - 30} 182 Z`, { fill: 'var(--diagram-yellow)', fop: 0.7, w: 0 }));
    p.push(S.line(cx, 222, cx, 50, { c: 'var(--diagram-green)', w: 3 }));
    if (leafy) for (const [dx, y] of [[-22, 60], [22, 74], [-22, 88], [22, 102]]) p.push(S.ellipse(cx + dx, y, 18, 7, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 }));
    else for (const y of [60, 74, 88, 102]) p.push(S.circle(cx + (y % 28 ? 4 : -4), y, 2.5, { fill: 'var(--diagram-green)', sw: 0 }));
    p.push(S.text(cx, 278, title, { a: 'middle', size: 12, w: 'bold' }));
  };
  flask(130, true, `${WEIGHT.leafy.end.toFixed(1)} g`, 'A: leafy shoot');
  flask(390, false, `${WEIGHT.leafless.end.toFixed(1)} g`, 'B: leaves removed');
  p.push(S.lead(156, 178, 230, 160), lab(234, 156, 'Layer of oil'), lab(234, 169, '(stops evaporation)'));
  p.push(S.lead(170, 214, 230, 206), lab(234, 210, 'Water'));
  p.push(S.lead(200, 245, 230, 262), lab(234, 266, 'Balance'));
  p.push(lab(10, 18, `Readings after ${WEIGHT.hours} hours (both were weighed at 9 a.m.)`, { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(520, 290, `Loss-of-weight experiment. Two flasks of water each have a layer of oil on the water and stand on balances. Flask A holds a leafy shoot and flask B a shoot with its leaves removed. After ${WEIGHT.hours} hours A has lost far more weight (${WEIGHT.leafy.end.toFixed(1)} grams shown) than B (${WEIGHT.leafless.end.toFixed(1)} grams shown), showing that water is lost mainly through the leaves`, p.join(''));
})();

// ---------------------------------------------------------------- 6. potometer readings under four conditions
export const POT_CHART = (() => {
  const p = [];
  const x = (v) => 260 + v * 80;
  for (let v = 0; v <= 3; v += 0.5) p.push(S.line(x(v), 16, x(v), 166, { c: 'var(--diagram-muted)', w: 0.5 }), S.text(x(v), 182, String(v), { a: 'middle', size: 10 }));
  POT.rows.forEach((r, i) => {
    const y = 22 + i * 36;
    p.push(S.rect(x(0), y, x(r.rate) - x(0), 24, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.1 }));
    p.push(S.text(254, y + 16, r.cond, { a: 'end', size: 11 }), S.text(x(r.rate) + 5, y + 16, String(r.rate), { size: 10 }));
  });
  p.push(S.line(x(0), 16, x(0), 166, { w: 1.2 }), S.text(x(1.5), 200, 'Bubble movement (mm per minute)', { a: 'middle', size: 11 }));
  return svgDoc(530, 208, `Bar chart of potometer readings in millimetres per minute: ${POT.rows.map((r) => `${r.cond}, ${r.rate}`).join('; ')}`, p.join(''));
})();
