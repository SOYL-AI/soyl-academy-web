// SVG diagrams for ICSE 9 Chemistry ch05: heating a hydrate in a test tube (named and lettered), crystals and liquids left in
// the open air, and drying a gas (concentrated sulphuric acid wash bottle; quicklime tower for ammonia).
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const BROWN = 'var(--diagram-brown)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. heating hydrated crystals in a test tube
function heat(lettered) {
  const p = [];
  const B = [380, 100]; // closed end (bottom)
  const M = [140, 150]; // mouth, slightly lower
  const dx = M[0] - B[0];
  const dy = M[1] - B[1];
  const len = Math.hypot(dx, dy);
  const d = [dx / len, dy / len];
  const n = [-d[1], d[0]];
  const r = 20;
  const pt = (t, s) => [B[0] + d[0] * len * t + n[0] * r * s, B[1] + d[1] * len * t + n[1] * r * s];
  const f = (a) => `${a[0].toFixed(1)} ${a[1].toFixed(1)}`;
  // stand rod and clamp
  p.push(S.line(70, 52, 70, 270, { c: MUTED, w: 4 }), S.rect(40, 270, 80, 10, { fill: FILL, sw: 1.5 }));
  const c = pt(0.55, -1);
  p.push(S.line(70, 60, c[0], 60, { c: MUTED, w: 4 }), S.line(c[0], 60, c[0], c[1] - 2, { c: MUTED, w: 4 }));
  // flame under the closed end
  p.push(S.path(`M${B[0] - 16} 168 Q${B[0] - 8} 146 ${B[0]} 126 Q${B[0] + 8} 146 ${B[0] + 16} 168 Z`, { c: RED, fill: YEL, fop: 0.7, w: 1.4 }));
  p.push(S.rect(B[0] - 20, 168, 40, 52, { fill: FILL, sw: 1.6 }), S.rect(B[0] - 28, 220, 56, 8, { fill: FILL, sw: 1.6 }));
  // test tube: two walls, closed round end, open mouth
  p.push(S.path(`M${f(pt(0, 1))} L${f(pt(1, 1))}`, { w: 2 }), S.path(`M${f(pt(0, -1))} L${f(pt(1, -1))}`, { w: 2 }));
  p.push(S.path(`M${f(pt(0, 1))} A${r} ${r} 0 0 1 ${f(pt(0, -1))}`, { w: 2 }));
  // crystals at the closed end
  for (const [t, s, sz] of [[0.02, 0.2, 8], [0.06, -0.5, 8], [0.1, 0.3, 8], [0.05, 0.75, 7], [0.14, -0.2, 8], [0.12, -0.75, 7]]) {
    const q = pt(t, s);
    p.push(S.rect(q[0] - sz / 2, q[1] - sz / 2, sz, sz, { fill: BLUE, fop: 0.45, sw: 1 }));
  }
  // water drops on the cooler upper wall near the mouth
  for (const [t, s] of [[0.66, -0.78], [0.74, -0.8], [0.82, -0.76], [0.9, -0.8]]) {
    const q = pt(t, s);
    p.push(S.circle(q[0], q[1], 3, { fill: BLUE, fop: 0.6, sw: 1 }));
  }
  // steam arrows out of the mouth
  const mo = pt(1, 0);
  p.push(S.arrow(mo[0] - 6, mo[1] + 2, mo[0] - 40, mo[1] + 8, { c: MUTED, w: 1.2, dash: '3 3' }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Hydrated crystals', 'Hard glass test tube, mouth slightly downwards', 'Clamp', 'Burner flame', 'Drops of water'];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  const cr = pt(0.08, 0.2);
  p.push(S.text(cr[0] + 6, 52, L[0], { a: 'middle', ...o }), S.lead(cr[0] + 6, 58, cr[0], cr[1] - 8));
  const tb = pt(0.4, 1);
  if (lettered) p.push(S.text(tb[0] + 22, 214, L[1], { a: 'start', ...o }));
  else p.push(S.lines(100, 210, ['Hard glass test tube,', 'mouth slightly downwards'], { size: 11, dy: 13 }));
  p.push(S.lead(lettered ? tb[0] + 22 : 190, lettered ? 206 : 200, tb[0] + 4, tb[1] + 6));
  p.push(S.text(c[0] - 30, 44, L[2], { a: 'end', ...o }), S.lead(c[0] - 28, 48, c[0] - 4, 60));
  p.push(S.text(B[0] + 40, 190, L[3], { a: 'start', ...o }), S.lead(B[0] + 38, 186, B[0] + 14, 164));
  const dr = pt(0.78, -0.8);
  p.push(S.text(dr[0] - 8, dr[1] - 48, L[4], { a: 'middle', ...o }), S.lead(dr[0] - 4, dr[1] - 40, dr[0], dr[1] - 6));
  const alt = lettered
    ? 'A hard glass test tube held in a clamp on a stand, with its mouth slightly lower than its closed end, heated by a burner flame D. Crystals A lie at the closed end, the test tube is B, the clamp is C, the flame is D and drops of water E collect on the cooler wall near the mouth.'
    : 'A hard glass test tube held in a clamp on a stand with its mouth slightly lower than its closed end. Hydrated crystals lie at the closed end, a burner flame heats it, and drops of water collect on the cooler wall near the mouth.';
  return svgDoc(520, 300, alt, p.join(''));
}
export const HEAT = heat(false);
export const HEAT_LETTERED = heat(true);

// ---------------------------------------------------------------- 2. left in the open air: three behaviours
export const AIR = (() => {
  const p = [];
  const dish = (cx, y) => p.push(S.path(`M${cx - 30} ${y} Q${cx} ${y + 28} ${cx + 30} ${y}`, { w: 2 }), S.line(cx - 32, y, cx + 32, y, { w: 2 }));
  const cols = [
    { x: 85, title: 'Washing soda crystals', kind: 'Efflorescent', col: BLUE, note: 'Crumble to white powder' },
    { x: 260, title: 'Ferric chloride', kind: 'Deliquescent', col: RED, note: 'Becomes a solution' },
    { x: 435, title: 'Concentrated acid', kind: 'Hygroscopic', col: YEL, note: 'Gains water, gets dilute' },
  ];
  cols.forEach((c, i) => {
    p.push(S.text(c.x, 22, c.title, { a: 'middle', size: 12, w: 'bold' }));
    p.push(S.text(c.x - 48, 50, 'Before', { a: 'middle', size: 11, c: MUTED }), S.text(c.x + 48, 50, 'After', { a: 'middle', size: 11, c: MUTED }));
    p.push(S.arrow(c.x - 10, 112, c.x + 10, 112, { w: 1.4, size: 6 }));
    const bx = c.x - 48;
    const ax = c.x + 48;
    if (i === 0) {
      dish(bx, 130);
      for (const [dx, dy] of [[-16, 114], [-4, 112], [8, 114], [-10, 102], [4, 100], [-22, 124]]) p.push(S.rect(bx + dx - 4, dy - 4, 9, 9, { fill: FILL, sw: 1.2 }));
      dish(ax, 130);
      for (let k = 0; k < 14; k++) p.push(S.circle(ax - 24 + k * 3.6 + ((k * 7) % 5), 127 - ((k * 5) % 7), 1.6, { fill: MUTED, sw: 0 }));
    } else if (i === 1) {
      dish(bx, 130);
      for (const [dx, dy] of [[-16, 114], [-4, 112], [8, 114], [-10, 102], [4, 100]]) p.push(S.rect(bx + dx - 4, dy - 4, 9, 9, { fill: BROWN, fop: 0.55, sw: 1.2 }));
      dish(ax, 130);
      p.push(S.path(`M${ax - 26} 131 Q${ax} 154 ${ax + 26} 131 Z`, { fill: BROWN, fop: 0.45, sw: 1 }));
    } else {
      for (const [x, lvl] of [[bx, 100], [ax, 82]]) {
        p.push(S.path(`M${x - 28} 66 L${x - 28} 130 L${x + 28} 130 L${x + 28} 66`, { w: 2 }), S.rect(x - 27, lvl, 54, 130 - lvl - 1, { fill: YEL, fop: 0.35, sw: 0 }), S.line(x - 28, lvl, x + 28, lvl, { c: YEL, w: 1.4 }));
      }
    }
    p.push(S.text(c.x, 176, c.kind, { a: 'middle', size: 13, w: 'bold', c: c.col }), S.text(c.x, 194, c.note, { a: 'middle', size: 11 }));
  });
  return svgDoc(520, 212, 'Three substances left in the open air. Washing soda crystals crumble to a white powder, which is efflorescence. Ferric chloride becomes a brown solution, which is deliquescence. Concentrated sulphuric acid takes in water vapour so its level rises and it becomes dilute, which is hygroscopic behaviour.', p.join(''));
})();

// ---------------------------------------------------------------- 3. drying a gas
export const DRYGAS = (() => {
  const p = [];
  // left: wash bottle with concentrated sulphuric acid
  p.push(S.text(130, 22, 'Wash bottle', { a: 'middle', size: 13, w: 'bold' }));
  p.push(S.rect(70, 100, 120, 130, { sw: 2 }), S.rect(71, 150, 118, 79, { fill: YEL, fop: 0.3, sw: 0 }), S.line(70, 150, 190, 150, { c: YEL, w: 1.4 }));
  p.push(S.path('M100 40 L100 205', { w: 2.4 }), S.path('M160 100 L160 52 L215 52', { w: 2.4 }));
  p.push(S.arrow(60, 40, 98, 40, { w: 1.4 }), S.circle(96, 214, 3, { sw: 1 }), S.circle(106, 208, 3, { sw: 1 }), S.circle(98, 196, 3, { sw: 1 }));
  p.push(S.arrow(190, 52, 232, 52, { w: 1.4 }));
  p.push(S.text(6, 30, 'Moist gas in', { size: 11 }), S.text(236, 48, 'Dry gas out', { size: 11 }));
  p.push(S.lines(130, 252, ['Concentrated', 'sulphuric acid'], { a: 'middle', size: 11, dy: 13 }), S.lead(130, 250, 130, 232));
  p.push(S.text(130, 282, 'For hydrogen, chlorine, hydrogen chloride', { a: 'middle', size: 10, c: MUTED }));
  // right: tower of quicklime for ammonia
  p.push(S.text(400, 22, 'Drying tower', { a: 'middle', size: 13, w: 'bold' }));
  p.push(S.rect(360, 70, 80, 150, { sw: 2 }));
  for (let r = 0; r < 6; r++) for (let k = 0; k < 4; k++) p.push(S.rect(366 + k * 18 + (r % 2) * 4, 76 + r * 24, 14, 14, { fill: FILL, sw: 1.2 }));
  p.push(S.path('M400 258 L400 220', { w: 2.4 }), S.arrow(400, 280, 400, 262, { w: 1.4 }), S.path('M400 70 L400 46', { w: 2.4 }), S.arrow(400, 52, 400, 36, { w: 1.4 }));
  p.push(S.text(414, 276, 'Moist ammonia in', { size: 11 }), S.text(414, 40, 'Dry ammonia out', { size: 11 }));
  p.push(S.lines(450, 120, ['Lumps of quicklime', '(calcium oxide)'], { size: 11, dy: 13 }), S.lead(448, 124, 438, 130));
  p.push(S.text(400, 296, 'Not conc. sulphuric acid: it reacts with ammonia', { a: 'middle', size: 10, c: MUTED }));
  return svgDoc(580, 308, 'Two ways of drying a gas. On the left a wash bottle holds concentrated sulphuric acid: moist gas bubbles in through a long tube and dry gas leaves by a short tube; this is used for hydrogen, chlorine and hydrogen chloride. On the right a tower packed with lumps of quicklime dries ammonia: moist ammonia enters at the bottom and dry ammonia leaves at the top. Concentrated sulphuric acid cannot be used for ammonia because it reacts with it.', p.join(''));
})();
