// SVG diagrams for ICSE 10 Biology ch09 Excretory System. All new drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f = (n) => Math.round(n * 10) / 10;
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YELLOW = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const tube = (d, w, col) => S.path(d, { c: col, w, cap: 'round', join: 'round' }) + S.path(d, { c: FILL, w: w - 3, cap: 'round', join: 'round' }) + S.path(d, { c: col, w: w - 3, op: 0.3, cap: 'round', join: 'round' });

/** Bean-shaped kidney outline centred at (cx, cy); hilum on the right (side = 1) or on the left (side = -1). */
function bean(cx, cy, h, w, side) {
  const s = side;
  return `M${cx} ${cy - h} C${f(cx - s * w)} ${cy - h} ${f(cx - s * w * 1.1)} ${cy + h} ${cx} ${cy + h} C${f(cx + s * w * 0.6)} ${cy + h} ${f(cx + s * w * 0.75)} ${f(cy + h * 0.4)} ${f(cx + s * w * 0.42)} ${f(cy + h * 0.15)} Q${f(cx + s * w * 0.3)} ${cy} ${f(cx + s * w * 0.42)} ${f(cy - h * 0.15)} C${f(cx + s * w * 0.75)} ${f(cy - h * 0.4)} ${f(cx + s * w * 0.6)} ${cy - h} ${cx} ${cy - h} Z`;
}

// ---------------------------------------------------------------- 1. the urinary system
export const URINARY = (() => {
  const p = [];
  // renal artery to the right kidney passes behind the vena cava, so draw it first
  p.push(S.line(262, 158, 168, 162, { c: RED, w: 4 }));
  p.push(tube('M235 20 L235 286', 14, BLUE), tube('M265 20 L265 286', 14, RED));
  for (const [cx, cy, side] of [[140, 165, 1], [360, 150, -1]]) p.push(S.path(bean(cx, cy, 58, 46, side), { c: BROWN, fill: BROWN, fop: 0.35, w: 1.6 }));
  // left kidney (viewer's right): artery from aorta, vein to vena cava (in front)
  p.push(S.line(272, 144, 334, 144, { c: RED, w: 4 }), S.line(334, 158, 228, 158, { c: BLUE, w: 4 }));
  p.push(S.line(167, 176, 228, 174, { c: BLUE, w: 4 }));
  // ureters and bladder
  p.push(S.path('M338 168 C320 220 300 260 272 300', { c: YELLOW, w: 4 }), S.path('M163 186 C180 230 200 262 228 300', { c: YELLOW, w: 4 }));
  p.push(S.ellipse(250, 322, 40, 28, { c: YELLOW, fill: YELLOW, fop: 0.35, sw: 1.6 }), S.line(250, 350, 250, 384, { c: YELLOW, w: 4 }));
  const L = (x1, y1, x2, y2, tx, ty, s, a = 'start') => p.push(S.lead(x1, y1, x2, y2), lab(tx, ty, s, { a }));
  L(110, 140, 70, 110, 66, 108, 'Right kidney', 'end');
  L(195, 162, 160, 230, 156, 240, 'Renal artery', 'end');
  L(205, 175, 175, 268, 171, 272, 'Renal vein', 'end');
  L(178, 210, 120, 300, 116, 304, 'Ureter', 'end');
  L(214, 328, 140, 340, 136, 344, 'Urinary bladder', 'end');
  L(250, 375, 200, 392, 196, 396, 'Urethra', 'end');
  L(270, 40, 330, 40, 334, 44, 'Aorta');
  L(240, 70, 330, 70, 334, 74, 'Inferior vena cava');
  L(380, 120, 420, 96, 424, 96, 'Left kidney');
  return svgDoc(520, 400, 'The human urinary system seen from the front. Two bean-shaped kidneys lie on either side of the inferior vena cava and the aorta. Each kidney receives a renal artery from the aorta and returns blood by a renal vein to the inferior vena cava. A ureter runs from each kidney down to the urinary bladder, which empties through the urethra', p.join(''));
})();

// ---------------------------------------------------------------- 2. longitudinal section of the kidney (named and lettered)
function kidney(lettered) {
  const p = [];
  const cx = 235, cy = 180, rx = 105, ry = 140;
  const E = (a, k = 1) => [cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a)];
  const deg = (d) => (d * Math.PI) / 180;
  const [x1, y1] = E(deg(-50));
  const [x2, y2] = E(deg(50));
  const hx = 288; // deepest point of the hilum notch
  const outline = `M${f(x1)} ${f(y1)} A${rx} ${ry} 0 1 0 ${f(x2)} ${f(y2)} Q${2 * hx - (x1 + x2) / 2} ${cy} ${f(x1)} ${f(y1)} Z`;
  p.push(S.path(outline, { c: BROWN, fill: BROWN, fop: 0.32, w: 2.2 }));
  // renal pyramids (medulla) pointing towards the pelvis
  const centre = [hx - 10, cy];
  const apices = [];
  for (const d of [122, 148, 174, 200, 226]) {
    const [bx1, by1] = E(deg(d - 10), 0.8);
    const [bx2, by2] = E(deg(d + 10), 0.8);
    const [mx, my] = E(deg(d), 0.8);
    const ax = centre[0] + (mx - centre[0]) * 0.45, ay = centre[1] + (my - centre[1]) * 0.45;
    apices.push([ax, ay]);
    p.push(S.path(`M${f(bx1)} ${f(by1)} L${f(bx2)} ${f(by2)} L${f(ax)} ${f(ay)} Z`, { c: RED, fill: RED, fop: 0.35, w: 1.2 }));
    for (let i = 1; i < 4; i++) p.push(S.line(bx1 + ((bx2 - bx1) * i) / 4, by1 + ((by2 - by1) * i) / 4, ax, ay, { c: RED, w: 0.6 }));
  }
  // pelvis: a funnel whose cups receive the pyramid tips and which narrows into the ureter at the hilum
  const cups = apices.map(([x, y]) => [x + 3, y]);
  const pelvis = `M${f(cups[0][0])} ${f(cups[0][1] - 6)} ${cups.map(([x, y]) => `L${f(x)} ${f(y)}`).join(' ')} L${f(cups[4][0])} ${f(cups[4][1] + 6)} Q${hx - 18} ${cy + 30} ${hx} ${cy + 22} L${hx} ${cy + 2} Q${hx - 18} ${cy - 26} ${f(cups[0][0])} ${f(cups[0][1] - 6)} Z`;
  p.push(S.path(pelvis, { c: YELLOW, fill: YELLOW, fop: 0.5, w: 1.4, join: 'round' }));
  p.push(tube(`M${hx - 4} ${cy + 12} C${hx + 24} ${cy + 20} ${hx + 34} ${cy + 90} ${hx + 40} ${cy + 165}`, 12, YELLOW));
  // renal artery and vein at the hilum, above the ureter
  p.push(S.line(hx + 110, cy - 50, hx - 16, cy - 34, { c: RED, w: 5 }), S.line(hx - 16, cy - 16, hx + 110, cy - 14, { c: BLUE, w: 5 }));
  const L = lettered
    ? { cortex: ['A'], medulla: ['B'], pelvis: ['C'], ureter: ['D'], artery: ['E'] }
    : { cortex: ['Cortex'], medulla: ['Medulla', '(renal pyramids)'], pelvis: ['Pelvis'], ureter: ['Ureter'], artery: ['Renal artery'], vein: ['Renal vein'], capsule: ['Capsule'] };
  const o = lettered ? { size: 14, w: 'bold' } : { size: 11 };
  const put = (x1_, y1_, x2_, y2_, tx, ty, s, a = 'start') => p.push(S.lead(x1_, y1_, x2_, y2_), S.lines(tx, ty, s, { a, ...o }));
  put(150, 100, 104, 70, 100, 70, L.cortex, 'end');
  put(170, 186, 104, 196, 100, 200, L.medulla, 'end');
  put(hx - 30, cy + 8, hx + 120, cy + 40, hx + 124, cy + 44, L.pelvis);
  put(hx + 38, cy + 140, hx + 120, cy + 140, hx + 124, cy + 144, L.ureter);
  put(hx + 70, cy - 45, hx + 120, cy - 70, hx + 124, cy - 66, L.artery);
  if (!lettered) {
    put(hx + 80, cy - 14, hx + 120, cy + 4, hx + 124, cy + 8, L.vein);
    put(190, 52, 150, 26, 146, 26, L.capsule, 'end');
  }
  const label = lettered
    ? 'Longitudinal section of a kidney with five parts lettered: A, the outer region just inside the edge; B, one of the striped cone-shaped regions in the middle zone; C, the funnel-shaped cavity collecting from the tips of the cones; D, the tube leaving the kidney downwards; E, the upper blood vessel entering at the notch'
    : 'Longitudinal section of a kidney. A thin capsule covers it. The outer cortex surrounds the inner medulla, which is made of cone-shaped renal pyramids. The tips of the pyramids open into the funnel-shaped pelvis, which narrows into the ureter at the notch (hilum). The renal artery enters and the renal vein leaves at the hilum';
  return svgDoc(560, 360, label, p.join(''));
}
export const KIDNEY = kidney(false);
export const KIDNEY_LETTERED = kidney(true);

// ---------------------------------------------------------------- 3. a nephron with its blood supply (named and lettered)
function nephron(lettered) {
  const p = [];
  p.push(S.rect(150, 20, 400, 190, { fill: BROWN, fop: 0.1, sw: 0 }), S.rect(150, 210, 400, 200, { fill: RED, fop: 0.07, sw: 0 }));
  p.push(S.line(150, 210, 550, 210, { c: MUTED, w: 1, dash: '5 4' }));
  p.push(lab(540, 36, 'Cortex', { a: 'end', c: MUTED }), lab(540, 226, 'Medulla', { a: 'end', c: MUTED }));
  // arterioles and glomerulus
  p.push(S.path('M160 40 L232 84', { c: RED, w: 7, cap: 'round' }), S.path('M246 82 L300 40 L330 40', { c: RED, w: 3.5, cap: 'round', join: 'round' }));
  for (const [dx, dy] of [[-6, -4], [5, -6], [8, 5], [-4, 7], [0, 0], [-9, 3], [4, 10]]) p.push(S.circle(240 + dx, 96 + dy, 6, { c: RED, sw: 1.6 }));
  // Bowman's capsule: a double-walled cup around the glomerulus
  p.push(S.path('M218 82 A26 26 0 1 0 262 82', { c: YELLOW, w: 2.2 }), S.path('M224 86 A19 19 0 1 0 256 86', { c: YELLOW, w: 1.2 }));
  // proximal convoluted tubule
  let d = 'M258 116';
  for (let i = 0; i <= 12; i++) d += ` L${f(270 + i * 8)} ${f(126 + 12 * Math.sin(i * 1.3))}`;
  d += ' L372 150 L372 380 Q387 400 402 380 L402 170';
  p.push(S.path(d, { c: YELLOW, w: 5, join: 'round', cap: 'round' }));
  // distal convoluted tubule to the collecting duct
  let d2 = 'M402 170';
  for (let i = 0; i <= 8; i++) d2 += ` L${f(410 + i * 8)} ${f(150 + 10 * Math.sin(i * 1.4))}`;
  d2 += ' L486 120';
  p.push(S.path(d2, { c: YELLOW, w: 5, join: 'round', cap: 'round' }));
  p.push(tube('M496 50 L496 400', 12, YELLOW));
  // capillaries round the tubule (from the efferent arteriole) draining to a venule
  p.push(S.path('M330 40 Q350 60 352 110 L352 300 Q352 320 340 330', { c: RED, w: 1.5, dash: '1 0' }));
  p.push(S.path('M340 330 Q330 336 310 336 L200 336 L170 336', { c: BLUE, w: 3 }), S.head(164, 336, Math.PI, { c: BLUE, size: 8 }));
  for (let y = 150; y <= 300; y += 30) p.push(S.path(`M352 ${y} Q362 ${y + 8} 352 ${y + 16}`, { c: RED, w: 1.2 }));
  const o = lettered ? { size: 14, w: 'bold' } : {};
  const put = (x1, y1, x2, y2, tx, ty, s, a = 'end') => p.push(S.lead(x1, y1, x2, y2), lab(tx, ty, s, { a, ...o }));
  if (lettered) {
    put(222, 112, 140, 150, 136, 154, 'A');
    put(236, 96, 140, 100, 136, 104, 'B');
    put(300, 126, 330, 180, 326, 196, 'C', 'middle');
    put(386, 392, 386, 404, 386, 416, 'D', 'middle');
    put(502, 300, 530, 300, 534, 304, 'E', 'start');
  } else {
    put(170, 46, 140, 46, 136, 50, 'Afferent arteriole (wider)');
    put(300, 40, 312, 18, 316, 18, 'Efferent arteriole (narrower)', 'start');
    put(236, 96, 140, 100, 136, 104, 'Glomerulus');
    put(222, 112, 140, 150, 136, 154, "Bowman's capsule");
    put(300, 126, 316, 176, 312, 196, 'Proximal convoluted tubule', 'end');
    put(386, 392, 300, 392, 296, 396, 'Loop of Henle');
    put(440, 142, 440, 98, 440, 78, 'Distal convoluted', 'middle');
    p.push(lab(440, 91, 'tubule', { a: 'middle' }));
    put(502, 300, 530, 300, 534, 304, 'Collecting', 'start');
    p.push(lab(534, 317, 'duct'));
    put(352, 260, 300, 260, 296, 264, 'Capillaries round the tubule');
    put(200, 336, 140, 336, 136, 340, 'To the renal vein');
  }
  const label = lettered
    ? 'A nephron with its blood supply, five parts lettered: A, the double-walled cup at the start of the tubule; B, the knot of capillaries inside the cup; C, the coiled tube leaving the cup; D, the U-shaped part dipping into the medulla; E, the wide straight tube that several tubules empty into'
    : "A nephron with its blood supply. A wide afferent arteriole enters a knot of capillaries, the glomerulus, inside the double-walled Bowman's capsule in the cortex; a narrower efferent arteriole leaves it and forms capillaries round the tubule, which drain towards the renal vein. From the capsule run the proximal convoluted tubule, the U-shaped loop of Henle dipping into the medulla, the distal convoluted tubule and the collecting duct";
  return svgDoc(600, 425, label, p.join(''));
}
export const NEPHRON = nephron(false);
export const NEPHRON_LETTERED = nephron(true);

// ---------------------------------------------------------------- 4. the Malpighian capsule and ultrafiltration
export const MALPIGHIAN = (() => {
  const p = ['<g transform="translate(120 0)">'];
  // capsule walls: outer and inner layers of the cup, opening at the top
  p.push(S.path('M170 70 A95 95 0 1 0 290 70', { c: YELLOW, w: 3, fill: YELLOW, fop: 0.08 }));
  p.push(S.path('M190 82 A72 72 0 1 0 270 82', { c: YELLOW, w: 2 }));
  // glomerulus
  for (const [dx, dy] of [[-30, 0], [0, -20], [28, -4], [-14, 30], [20, 28], [0, 8], [-34, 26], [36, 22]]) p.push(S.circle(230 + dx, 140 + dy, 16, { c: RED, sw: 2.2, fill: RED, fop: 0.12 }));
  // arterioles at the top
  p.push(S.path('M120 20 L205 100', { c: RED, w: 12, cap: 'round' }), S.path('M255 100 L330 20', { c: RED, w: 6, cap: 'round' }));
  p.push(S.arrow(140, 40, 175, 72, { c: FILL, size: 9 }), S.arrow(280, 70, 312, 36, { c: FILL, size: 7 }));
  // tubule leaving at the bottom right
  p.push(tube('M292 210 C320 240 360 240 400 246 L460 250', 14, YELLOW));
  // filtration arrows into the capsular space
  for (const [x1, y1, x2, y2] of [[192, 128, 170, 120], [212, 184, 200, 206], [262, 180, 278, 202], [270, 128, 292, 118]]) p.push(S.arrow(x1, y1, x2, y2, { c: BLUE, size: 6, w: 1.5 }));
  p.push(S.lead(130, 30, 60, 30), lab(56, 34, 'Afferent arteriole (wide)', { a: 'end' }));
  p.push(S.lead(320, 30, 380, 30), lab(384, 34, 'Efferent arteriole (narrow)'));
  p.push(S.lead(230, 140, 380, 90), lab(384, 94, 'Glomerulus: blood under high pressure'));
  p.push(S.lead(146, 160, 60, 180), lab(56, 184, "Bowman's capsule", { a: 'end' }));
  p.push(S.lead(174, 150, 60, 140), lab(56, 144, 'Capsular space (filtrate)', { a: 'end' }));
  p.push(S.lead(430, 248, 440, 274), lab(384, 288, 'To the proximal tubule'));
  p.push(lab(20, 262, 'Filtered: water, glucose, amino acids, salts, urea.', { c: BLUE }), lab(20, 276, 'Kept in the blood: blood cells, plasma proteins.', { c: RED }));
  p.push('</g>');
  return svgDoc(720, 296, "The Malpighian capsule. A wide afferent arteriole brings blood into the glomerulus, a knot of capillaries inside the double-walled Bowman's capsule, and a narrower efferent arteriole carries it away, so the pressure in the glomerulus is high. Water, glucose, amino acids, salts and urea are filtered into the capsular space and pass on to the proximal tubule; blood cells and plasma proteins stay in the blood", p.join(''));
})();
