// SVG diagrams for ICSE 9 Biology ch09 Nutrition: Food and Balanced Diet. All drawn with the S helpers and palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';
import { BREAKFAST, PLATE } from './calc.mjs';

/** Label with a muted leader. side 'l' text ends at (x, y); 'r' starts at (x, y); 'c' centred above target; 'b' centred below target. */
function label(parts, text, x, y, tx, ty, side, o = {}) {
  const gap = side === 'l' ? 4 : side === 'r' ? -4 : 0;
  parts.push(S.lead(x + gap, y - (side === 'c' ? -4 : side === 'b' ? 14 : 4), tx, ty));
  parts.push(S.text(x, y, text, { a: side === 'l' ? 'end' : side === 'r' ? 'start' : 'middle', size: o.size ?? 11, w: o.w }));
}
const head = (parts, x, y, t) => parts.push(S.text(x, y, t, { a: 'middle', size: 12, w: 'bold' }));

// ---------------------------------------------------------------- 1. energy from a breakfast (bar chart from calc.mjs)
export const MEAL = (() => {
  const p = [];
  const x0 = 90;
  const base = 230;
  const top = 50;
  const max = BREAKFAST.kj.carbohydrate;
  p.push(S.line(x0, top - 10, x0, base, { w: 1.5 }), S.line(x0, base, 520, base, { w: 1.5 }));
  const bars = [['Carbohydrate', BREAKFAST.carbohydrate, BREAKFAST.kj.carbohydrate, 'var(--diagram-yellow)'], ['Protein', BREAKFAST.protein, BREAKFAST.kj.protein, 'var(--diagram-red)'], ['Fat', BREAKFAST.fat, BREAKFAST.kj.fat, 'var(--diagram-brown)']];
  bars.forEach(([name, g, kj, col], i) => {
    const h = ((base - top) * kj) / max;
    const x = x0 + 36 + i * 130;
    p.push(S.rect(x, base - h, 70, h, { fill: col, fop: 0.35, sw: 1.6 }));
    p.push(S.text(x + 35, base - h - 6, `${kj} kJ`, { a: 'middle', size: 12, w: 'bold' }));
    p.push(S.text(x + 35, base + 16, name, { a: 'middle', size: 12 }));
    p.push(S.text(x + 35, base + 30, `${g} g`, { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  });
  p.push(S.text(36, 140, 'Energy', { a: 'middle', size: 12, w: 'bold' }), S.text(36, 154, '(kilojoules)', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  p.push(S.text(305, 22, `Energy from a breakfast: ${BREAKFAST.total} kJ in all`, { a: 'middle', size: 12, w: 'bold' }));
  return svgDoc(640, 262, `A bar chart of the energy from a breakfast: carbohydrate ${BREAKFAST.kj.carbohydrate} kilojoules from ${BREAKFAST.carbohydrate} grams, protein ${BREAKFAST.kj.protein} kilojoules from ${BREAKFAST.protein} grams and fat ${BREAKFAST.kj.fat} kilojoules from ${BREAKFAST.fat} grams`, p.join(''));
})();

// ---------------------------------------------------------------- 2. a plate model of a balanced diet (named and lettered)
function plate(lettered) {
  const p = [];
  const cx = 190;
  const cy = 150;
  const R = 122;
  const parts = [
    ['A', PLATE.cereals, 'var(--diagram-yellow)', 'Cereals, millets, bread', 'energy'],
    ['B', PLATE.protein, 'var(--diagram-red)', 'Pulses, eggs, fish, meat', 'proteins for growth and repair'],
    ['C', PLATE.vegfruit, 'var(--diagram-green)', 'Vegetables and fruits', 'vitamins, minerals, roughage'],
    ['D', PLATE.milk, 'var(--diagram-blue)', 'Milk, curd, cheese', 'calcium and protein'],
    ['E', PLATE.oil, 'var(--diagram-brown)', 'Oil, ghee, nuts', 'fats, in small amount'],
  ];
  let a0 = -Math.PI / 2;
  parts.forEach(([letter, share, col, name, role], i) => {
    const a1 = a0 + (share / 100) * 2 * Math.PI;
    const pt = (a, rr) => [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
    const [x1, y1] = pt(a0, R);
    const [x2, y2] = pt(a1, R);
    p.push(S.path(`M${cx} ${cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 ${share > 50 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`, { fill: col, fop: 0.35, w: 2, join: 'round' }));
    const mid = (a0 + a1) / 2;
    const [lx, ly] = pt(mid, share < 15 ? R * 0.8 : R * 0.58);
    if (lettered) p.push(S.text(lx, ly + 6, letter, { a: 'middle', size: 18, w: 'bold' }));
    else p.push(S.text(lx, ly + 4, `${share}%`, { a: 'middle', size: share < 15 ? 10 : 13, w: 'bold' }));
    if (!lettered) {
      p.push(S.rect(370, 34 + i * 50, 14, 14, { fill: col, fop: 0.45, sw: 1.4 }));
      p.push(S.text(392, 46 + i * 50, name, { size: 12, w: 'bold' }), S.text(392, 61 + i * 50, role, { size: 11, c: 'var(--diagram-muted)' }));
    }
    a0 = a1;
  });
  p.push(S.circle(cx, cy, R, { sw: 2.2 }));
  if (!lettered) p.push(S.text(370, 292, 'Plus plenty of water', { size: 12, w: 'bold' }));
  else p.push(S.text(cx, 292, 'A plate of five food groups', { a: 'middle', size: 12, c: 'var(--diagram-muted)' }));
  const name = lettered
    ? 'A circular plate divided into five sectors lettered A to E: A is the largest sector, B is a fifth of the plate, C is a quarter of the plate, D is a small sector and E is the smallest sector'
    : 'A plate model of a balanced diet: cereals and millets forty parts, pulses eggs and fish twenty parts, vegetables and fruits twenty five parts, milk and milk products ten parts and oil, ghee and nuts five parts, with plenty of water';
  return svgDoc(640, 304, name, p.join(''));
}
export const PLATE_NAMED = plate(false);
export const PLATE_LETTERED = plate(true);

// ---------------------------------------------------------------- 3. two children: kwashiorkor and marasmus
export const CHILDREN = (() => {
  const p = [];
  head(p, 150, 22, 'Kwashiorkor');
  head(p, 470, 22, 'Marasmus');
  const limbs = (cx, w) => {
    p.push(S.line(cx - 20, 112, cx - 44, 172, { c: 'var(--diagram-brown)', w, cap: 'round' }), S.line(cx + 20, 112, cx + 44, 172, { c: 'var(--diagram-brown)', w, cap: 'round' }));
    p.push(S.line(cx - 10, 196, cx - 20, 256, { c: 'var(--diagram-brown)', w, cap: 'round' }), S.line(cx + 10, 196, cx + 20, 256, { c: 'var(--diagram-brown)', w, cap: 'round' }));
  };
  // kwashiorkor: round puffy face, thin limbs, swollen belly
  limbs(150, 4);
  p.push(S.ellipse(150, 138, 20, 28, { fill: 'var(--diagram-yellow)', fop: 0.25, sw: 1.8 }));
  p.push(S.ellipse(150, 176, 38, 30, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 2 }));
  p.push(S.circle(150, 82, 22, { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 2 }));
  p.push(S.path('M130 70 C140 56 160 56 170 70', { c: 'var(--diagram-muted)', w: 1.4, dash: '3 3' }));
  p.push(S.circle(143, 82, 2, { fill: 'var(--diagram-brown)', sw: 0 }), S.circle(157, 82, 2, { fill: 'var(--diagram-brown)', sw: 0 }), S.path('M144 92 Q150 96 156 92', { w: 1.2 }));
  label(p, 'Round, puffy face', 215, 62, 170, 76, 'r');
  label(p, 'Pale, thin hair', 96, 50, 133, 66, 'l');
  label(p, 'Swollen belly', 215, 180, 188, 178, 'r');
  label(p, 'Thin arms and legs', 215, 232, 170, 226, 'r');
  p.push(S.text(150, 282, 'Lack of protein', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  // marasmus: shrunken face, ribs, very thin body
  limbs(470, 3);
  p.push(S.ellipse(470, 150, 16, 46, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 1.8 }));
  for (const y of [124, 136, 148, 160]) p.push(S.path(`M458 ${y} Q470 ${y + 6} 482 ${y}`, { c: 'var(--diagram-muted)', w: 1.2 }));
  p.push(S.ellipse(470, 82, 16, 20, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 2 }));
  p.push(S.circle(464, 80, 2, { fill: 'var(--diagram-brown)', sw: 0 }), S.circle(476, 80, 2, { fill: 'var(--diagram-brown)', sw: 0 }));
  p.push(S.path('M462 90 Q470 86 478 90', { w: 1.2 }), S.path('M458 74 L463 76 M482 74 L477 76', { c: 'var(--diagram-muted)', w: 1 }));
  label(p, 'Old-looking face', 520, 62, 486, 76, 'r');
  label(p, 'Ribs show', 520, 134, 484, 136, 'r');
  label(p, 'Wasted limbs', 520, 232, 492, 226, 'r');
  p.push(S.text(470, 282, 'Lack of food: energy and protein', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 294, 'Two undernourished children: a child with kwashiorkor who has a round puffy face, pale thin hair, a swollen belly and thin arms and legs, and a child with marasmus who has a shrunken old-looking face, visible ribs and very thin wasted limbs', p.join(''));
})();

// ---------------------------------------------------------------- 4. where the minerals are needed
export const BODYMAP = (() => {
  const p = [];
  const cx = 320;
  p.push(S.circle(cx, 50, 24, { fill: 'var(--diagram-fill)', sw: 2 }));
  p.push(S.rect(cx - 7, 72, 14, 14, { fill: 'var(--diagram-fill)', sw: 1.6 }));
  p.push(S.rect(cx - 32, 86, 64, 120, { fill: 'var(--diagram-fill)', sw: 2, rx: 14 }));
  p.push(S.line(cx - 32, 96, cx - 66, 170, { w: 9, c: 'var(--diagram-muted)', cap: 'round' }), S.line(cx + 32, 96, cx + 66, 170, { w: 9, c: 'var(--diagram-muted)', cap: 'round' }));
  p.push(S.line(cx - 14, 206, cx - 20, 296, { w: 11, c: 'var(--diagram-muted)', cap: 'round' }), S.line(cx + 14, 206, cx + 20, 296, { w: 11, c: 'var(--diagram-muted)', cap: 'round' }));
  // thyroid
  p.push(S.ellipse(cx, 84, 15, 7, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1.6 }));
  // teeth
  p.push(S.rect(cx - 10, 58, 20, 6, { fill: 'var(--diagram-fill)', sw: 1.4, rx: 2 }));
  // heart and blood
  p.push(S.circle(cx + 12, 122, 12, { fill: 'var(--diagram-red)', fop: 0.45, sw: 1.8 }));
  // bones in the leg
  p.push(S.line(cx - 15, 218, cx - 19, 288, { w: 4, c: 'var(--diagram-brown)', cap: 'round' }), S.line(cx + 15, 218, cx + 19, 288, { w: 4, c: 'var(--diagram-brown)', cap: 'round' }));
  // nerve in the arm
  p.push(S.line(cx + 34, 100, cx + 62, 164, { w: 2, c: 'var(--diagram-accent)', dash: '4 3' }));
  label(p, 'Iodine: thyroid gland makes thyroxine', 240, 70, 306, 84, 'l');
  label(p, 'Iron: haemoglobin of blood', 420, 112, 336, 120, 'r');
  label(p, 'Sodium: nerves and muscles', 420, 160, 378, 150, 'r');
  label(p, 'Calcium: teeth', 240, 48, 310, 60, 'l');
  label(p, 'Calcium: bones', 240, 250, 300, 252, 'l');
  return svgDoc(640, 310, 'An outline of the human body showing where four minerals are mainly needed: iodine in the thyroid gland of the neck, iron in the haemoglobin of the blood, sodium in nerves and muscles, and calcium in the teeth and bones', p.join(''));
})();
