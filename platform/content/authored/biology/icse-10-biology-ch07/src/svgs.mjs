// SVG diagrams for ICSE 10 Biology ch07 Circulatory System: Blood and Lymph. All new drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f = (n) => Math.round(n * 10) / 10;
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const YELLOW = 'var(--diagram-yellow)';
const GREEN = 'var(--diagram-green)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const ACCENT = 'var(--diagram-accent)';

/** Deterministic scatter of n points inside radius rr (golden-angle spiral). */
const scatter = (cx, cy, rr, n) => Array.from({ length: n }, (_, i) => {
  const a = i * 2.39996;
  const d = rr * Math.sqrt((i + 0.5) / n);
  return [cx + d * Math.cos(a), cy + d * Math.sin(a)];
});

// ---------------------------------------------------------------- blood cells
const CELL = {
  rbc(cx, cy) {
    return S.circle(cx, cy, 24, { c: RED, fill: RED, fop: 0.45, sw: 1.2 }) + S.circle(cx, cy, 10, { c: RED, fill: FILL, fop: 0.55, sw: 0 }) +
      S.path(`M${cx - 26} ${cy + 44} Q${cx - 26} ${cy + 33} ${cx - 13} ${cy + 35} Q${cx} ${cy + 40} ${cx + 13} ${cy + 35} Q${cx + 26} ${cy + 33} ${cx + 26} ${cy + 44} Q${cx + 26} ${cy + 55} ${cx + 13} ${cy + 53} Q${cx} ${cy + 48} ${cx - 13} ${cy + 53} Q${cx - 26} ${cy + 55} ${cx - 26} ${cy + 44} Z`, { c: RED, fill: RED, fop: 0.45, w: 1.2 });
  },
  neutrophil(cx, cy) {
    return S.circle(cx, cy, 27, { fill: FILL, fop: 1, sw: 1.2 }) + scatter(cx, cy, 23, 40).map(([x, y]) => S.circle(x, y, 0.9, { fill: MUTED, sw: 0 })).join('') +
      S.path(`M${cx - 13} ${cy - 3} L${cx} ${cy + 7} L${cx + 13} ${cy - 3}`, { c: BLUE, w: 2.5 }) +
      [[-13, -3], [0, 7], [13, -3], [3, -11]].map(([dx, dy]) => S.ellipse(cx + dx, cy + dy, 6.5, 5.5, { c: BLUE, fill: BLUE, fop: 0.7, sw: 1 })).join('');
  },
  eosinophil(cx, cy) {
    return S.circle(cx, cy, 27, { fill: FILL, fop: 1, sw: 1.2 }) + scatter(cx, cy, 22, 26).map(([x, y]) => S.circle(x, y, 2, { fill: RED, fop: 0.75, sw: 0 })).join('') +
      S.ellipse(cx - 9, cy - 4, 8.5, 7, { c: BLUE, fill: BLUE, fop: 0.75, sw: 1 }) + S.ellipse(cx + 9, cy - 4, 8.5, 7, { c: BLUE, fill: BLUE, fop: 0.75, sw: 1 });
  },
  basophil(cx, cy) {
    return S.circle(cx, cy, 25, { fill: FILL, fop: 1, sw: 1.2 }) + S.path(`M${cx - 12} ${cy - 8} Q${cx} ${cy - 16} ${cx + 4} ${cy - 2} Q${cx + 8} ${cy + 12} ${cx + 14} ${cy + 6}`, { c: BLUE, w: 7, op: 0.6, cap: 'round' }) +
      scatter(cx, cy, 20, 18).map(([x, y]) => S.circle(x, y, 2.2, { fill: 'currentColor', fop: 0.8, sw: 0 })).join('');
  },
  lymphocyte(cx, cy) {
    return S.circle(cx, cy, 19, { fill: FILL, fop: 1, sw: 1.2 }) + S.circle(cx + 1, cy, 15, { c: BLUE, fill: BLUE, fop: 0.75, sw: 1 });
  },
  monocyte(cx, cy) {
    return S.circle(cx, cy, 31, { fill: FILL, fop: 1, sw: 1.2 }) +
      S.path(`M${cx - 16} ${cy - 12} Q${cx} ${cy - 22} ${cx + 16} ${cy - 12} Q${cx + 24} ${cy} ${cx + 16} ${cy + 12} Q${cx + 4} ${cy + 18} ${cx} ${cy + 5} Q${cx - 4} ${cy + 18} ${cx - 16} ${cy + 12} Q${cx - 24} ${cy} ${cx - 16} ${cy - 12} Z`, { c: BLUE, fill: BLUE, fop: 0.6, w: 1 });
  },
  platelets(cx, cy) {
    return [[-14, -8, 5, 3.5], [6, -12, 4, 3], [14, 4, 5, 3], [-6, 8, 4.5, 3.5], [-18, 10, 3.5, 2.5], [2, -1, 3, 2.5]].map(([dx, dy, rx, ry]) => S.ellipse(cx + dx, cy + dy, rx, ry, { c: ACCENT, fill: ACCENT, fop: 0.55, sw: 1 })).join('');
  },
};

export const BLOOD_CELLS = (() => {
  const p = [];
  const items = [
    ['rbc', 75, 70, ['Red blood cell', '(face and side view)', 'no nucleus']],
    ['neutrophil', 215, 80, ['Neutrophil', 'nucleus of 3 to 5 lobes,', 'fine granules']],
    ['eosinophil', 355, 80, ['Eosinophil', 'two-lobed nucleus,', 'red granules']],
    ['basophil', 495, 80, ['Basophil', 'S-shaped nucleus,', 'dark granules']],
    ['lymphocyte', 145, 225, ['Lymphocyte', 'large round nucleus']],
    ['monocyte', 300, 225, ['Monocyte (largest)', 'kidney-shaped nucleus']],
    ['platelets', 455, 225, ['Platelets', 'cell fragments, no nucleus']],
  ];
  for (const [k, x, y, ls] of items) {
    p.push(CELL[k](x, y));
    const ty = k === 'rbc' ? y + 72 : y + (k === 'monocyte' ? 46 : 42);
    ls.forEach((s, i) => p.push(S.text(x, ty + i * 13, s, { a: 'middle', size: 11, w: i === 0 ? 'bold' : undefined })));
  }
  p.push(lab(150, 22, 'Granulocytes (granular cytoplasm, lobed nucleus)', { c: MUTED }));
  p.push(lab(14, 229, 'Agranulocytes', { c: MUTED }));
  return svgDoc(570, 300, 'Blood cells as seen in a stained smear. Red blood cell: a biconcave disc with no nucleus, paler at the centre, shown face-on and from the side. White cells: neutrophil with a nucleus of three to five lobes and fine granules; eosinophil with a two-lobed nucleus and red granules; basophil with an S-shaped nucleus and dark granules; lymphocyte with a large round nucleus filling the cell; monocyte, the largest, with a kidney-shaped nucleus. Platelets: small fragments with no nucleus', p.join(''));
})();

export const BLOOD_CELLS_LETTERED = (() => {
  const p = [];
  const items = [['rbc', 60, 'A'], ['neutrophil', 175, 'B'], ['lymphocyte', 285, 'C'], ['monocyte', 400, 'D'], ['platelets', 515, 'E']];
  for (const [k, x, L] of items) {
    p.push(CELL[k](x, 70));
    p.push(S.text(x, 160, L, { a: 'middle', size: 15, w: 'bold' }));
  }
  return svgDoc(580, 175, 'Five kinds of blood components drawn from a stained smear, lettered A to E. A: a disc with a pale centre and no nucleus, shown face-on and from the side. B: a cell with a nucleus of several lobes and fine granules. C: a small cell almost filled by a large round nucleus. D: the largest cell, with a kidney-shaped nucleus. E: a group of tiny fragments with no nucleus', p.join(''));
})();

// ---------------------------------------------------------------- 2. why a red cell is efficient
export const RBC = (() => {
  const p = [];
  p.push(S.circle(100, 90, 64, { c: RED, fill: RED, fop: 0.45, sw: 1.5 }), S.circle(100, 90, 26, { c: RED, fill: FILL, fop: 0.55, sw: 0 }));
  p.push(S.text(100, 172, 'Face view', { a: 'middle', size: 11, w: 'bold' }));
  p.push(S.path('M30 215 Q30 190 62 194 Q100 204 138 194 Q170 190 170 215 Q170 240 138 236 Q100 226 62 236 Q30 240 30 215 Z', { c: RED, fill: RED, fop: 0.45, w: 1.5 }));
  p.push(S.text(100, 262, 'Side view: biconcave', { a: 'middle', size: 11, w: 'bold' }));
  for (const [x1, y1, x2, y2] of [[30, 30, 52, 50], [176, 40, 154, 58], [100, 6, 100, 22]]) p.push(S.arrow(x1, y1, x2, y2, { c: BLUE, size: 6, w: 1.5 }));
  p.push(lab(4, 24, 'oxygen', { c: BLUE }));
  const notes = [
    [92, 'No nucleus:', 'more room for haemoglobin', 130, 80],
    [142, 'No mitochondria:', 'does not use the oxygen it carries', 150, 120],
    [192, 'Biconcave disc:', 'large surface for gas exchange', 168, 210],
    [228, 'Thin centre:', 'oxygen diffuses only a short way', 120, 220],
  ];
  for (const [y, a, b, lx, ly] of notes) p.push(S.lead(lx, ly, 238, y - 4), lab(242, y, a, { w: 'bold' }), lab(242, y + 13, b));
  // inset: squeezing through a capillary
  p.push(S.line(410, 30, 560, 30, { c: RED, w: 1.5 }), S.line(410, 52, 560, 52, { c: RED, w: 1.5 }));
  p.push(S.ellipse(485, 41, 26, 8, { c: RED, fill: RED, fop: 0.45, w: 1.2 }));
  p.push(lab(410, 72, 'Flexible: bends to pass'), lab(410, 85, 'through narrow capillaries'));
  return svgDoc(570, 272, 'A mammalian red blood cell, enlarged. Face view: a round disc, paler at the centre, with no nucleus. Side view: a biconcave disc, thin at the centre. Labels: no nucleus, so more room for haemoglobin; no mitochondria, so it does not use the oxygen it carries; biconcave shape gives a large surface for gas exchange; the thin centre means oxygen diffuses only a short way. An inset shows the cell bending to pass through a narrow capillary', p.join(''));
})();

// ---------------------------------------------------------------- 3. a blood clot
export const CLOT = (() => {
  const p = [];
  p.push(S.circle(150, 130, 112, { c: MUTED, sw: 1, dash: '4 3' }));
  for (const [x, y] of [[70, 80], [120, 150], [180, 95], [210, 170], [95, 190], [160, 210], [200, 60], [60, 130]])
    p.push(S.circle(x, y, 13, { c: RED, fill: RED, fop: 0.45, sw: 1 }), S.circle(x, y, 5, { c: RED, fill: FILL, fop: 0.5, sw: 0 }));
  for (const [x, y] of [[135, 105], [100, 120], [175, 135], [140, 180]]) p.push(S.ellipse(x, y, 4, 3, { c: ACCENT, fill: ACCENT, fop: 0.6, sw: 1 }));
  const threads = [[48, 60, 250, 190], [60, 210, 240, 70], [40, 130, 262, 120], [110, 26, 190, 236], [70, 30, 230, 220], [200, 30, 90, 236], [30, 170, 220, 30]];
  for (const [x1, y1, x2, y2] of threads) p.push(S.path(`M${x1} ${y1} Q${f((x1 + x2) / 2 + 12)} ${f((y1 + y2) / 2 - 10)} ${x2} ${y2}`, { c: YELLOW, w: 2.2 }));
  p.push(S.lead(232, 92, 300, 70), lab(304, 66, 'Fibrin threads', { w: 'bold' }), lab(304, 79, 'an insoluble mesh'));
  p.push(S.lead(222, 170, 300, 150), lab(304, 146, 'Trapped red blood cells', { w: 'bold' }));
  p.push(S.lead(180, 136, 300, 210), lab(304, 206, 'Platelets', { w: 'bold' }), lab(304, 219, 'release thromboplastin'));
  return svgDoc(470, 262, 'A blood clot seen under a microscope: a mesh of yellow fibrin threads crossing in all directions, with red blood cells and a few platelets trapped in it. Labels: fibrin threads, an insoluble mesh; trapped red blood cells; platelets, which release thromboplastin', p.join(''));
})();

// ---------------------------------------------------------------- 4. tissue fluid and lymph
export const LYMPH = (() => {
  const p = [];
  p.push(S.rect(40, 115, 420, 95, { c: BLUE, fill: BLUE, fop: 0.1, sw: 0 }));
  // capillary from arteriole (left) to venule (right)
  p.push(S.path('M20 70 L460 70', { c: RED, w: 1.5 }), S.path('M20 98 L460 98', { c: BLUE, w: 1.5 }));
  p.push(S.rect(20, 70, 140, 28, { c: RED, fill: RED, fop: 0.2, sw: 0 }), S.rect(320, 70, 140, 28, { c: BLUE, fill: BLUE, fop: 0.2, sw: 0 }));
  p.push(lab(20, 60, 'Arterial end', { w: 'bold', c: RED }), lab(360, 60, 'Venous end', { w: 'bold', c: BLUE }), lab(190, 60, 'Blood capillary', { c: MUTED }));
  for (const x of [60, 100, 140]) p.push(S.arrow(x, 100, x, 126, { c: RED, size: 6 }));
  for (const x of [340, 380, 420]) p.push(S.arrow(x, 126, x, 102, { c: BLUE, size: 6 }));
  // tissue cells
  for (let i = 0; i < 6; i++) p.push(S.rect(60 + i * 62, 140, 46, 34, { rx: 6, fill: GREEN, fop: 0.18, sw: 1 }), S.circle(83 + i * 62, 157, 5, { fill: GREEN, fop: 0.6, sw: 0 }));
  p.push(lab(150, 206, 'Tissue fluid bathes the cells', { c: BLUE }));
  // lymph capillary with blind end, to a vessel with a valve and a node
  p.push(S.path('M230 190 Q230 182 238 182 L470 182', { c: YELLOW, w: 1.5 }), S.path('M230 190 Q230 198 238 198 L470 198', { c: YELLOW, w: 1.5 }));
  p.push(S.path('M470 182 L500 182 L500 160', { c: YELLOW, w: 1.5 }), S.path('M470 198 L516 198 L516 160', { c: YELLOW, w: 1.5 }));
  p.push(S.path('M500 176 L508 168 L516 176', { c: YELLOW, w: 1.5 }));
  p.push(S.path('M488 150 Q490 118 508 116 Q528 118 530 150 Q520 160 508 156 Q496 160 488 150 Z', { c: YELLOW, fill: YELLOW, fop: 0.3, w: 1.5 }));
  p.push(S.arrow(400, 190, 440, 190, { c: YELLOW, size: 6 }));
  p.push(S.lead(232, 202, 232, 236), lab(150, 248, 'Lymph capillary (closed end)'));
  p.push(S.lead(510, 200, 500, 226), lab(460, 240, 'Lymph vessel'), lab(460, 253, 'with a valve'));
  p.push(S.lead(530, 136, 548, 112), lab(500, 104, 'Lymph node'));
  p.push(lab(20, 28, 'Plasma filters out at the arterial end; most returns at the venous end; the extra drains as lymph', { c: MUTED }));
  return svgDoc(570, 272, 'Tissue fluid and lymph. A blood capillary runs from its arterial end on the left to its venous end on the right. At the arterial end, fluid filters out of the capillary into the spaces around the body cells, forming tissue fluid. At the venous end most of this fluid returns to the capillary. The extra fluid enters a lymph capillary with a closed end, becoming lymph, which flows into a lymph vessel with a valve and on to a lymph node', p.join(''));
})();

// ---------------------------------------------------------------- 5. a blood-grouping slide test
export const TYPING = (() => {
  const p = [];
  const cols = [210, 320];
  const rows = [['P', [true, false]], ['Q', [true, true]], ['R', [false, false]], ['S', [false, true]]];
  p.push(S.text(cols[0], 26, 'Anti-A serum', { a: 'middle', size: 12, w: 'bold' }), S.text(cols[1], 26, 'Anti-B serum', { a: 'middle', size: 12, w: 'bold' }));
  const drop = (cx, cy, clumped) => {
    const out = [S.circle(cx, cy, 24, { c: MUTED, fill: RED, fop: 0.1, sw: 1 })];
    if (clumped) for (const [dx, dy] of [[-9, -8], [8, -6], [-4, 9], [10, 9]]) out.push(...scatter(cx + dx, cy + dy, 4.5, 7).map(([x, y]) => S.circle(x, y, 1.8, { fill: RED, sw: 0 })));
    else out.push(...scatter(cx, cy, 19, 34).map(([x, y]) => S.circle(x, y, 1.6, { fill: RED, sw: 0 })));
    return out.join('');
  };
  rows.forEach(([name, res], i) => {
    const y = 70 + i * 62;
    p.push(S.text(60, y + 4, `Person ${name}`, { a: 'middle', size: 12, w: 'bold' }));
    res.forEach((c, j) => p.push(drop(cols[j], y, c)));
  });
  p.push(drop(450, 90, false), lab(410, 130, 'Evenly spread:'), lab(410, 143, 'no clumping'));
  p.push(drop(450, 200, true), lab(410, 240, 'Clumped:'), lab(410, 253, 'agglutination'));
  p.push(S.rect(390, 50, 140, 215, { rx: 6, c: MUTED, sw: 1, dash: '4 3' }), lab(400, 44, 'Key', { w: 'bold' }));
  return svgDoc(550, 312, 'A blood-grouping slide. Drops of blood from four people, P, Q, R and S, are mixed with anti-A serum and with anti-B serum. Person P: clumped with anti-A, evenly spread with anti-B. Person Q: clumped with both. Person R: evenly spread with both. Person S: evenly spread with anti-A, clumped with anti-B. A key shows evenly spread cells as no clumping and clustered cells as agglutination', p.join(''));
})();
