// Hand-drawn SVG schematics for ISC 12 Chemistry ch14–ch15 (from the CBSE 12 ch07 set; allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
function atom(x, y, label, fill = 'var(--diagram-fill)', r = 12, size = 10) {
  return S.circle(x, y, r, { fill }) + S.text(x, y + 4, label, { a: 'middle', size });
}
function ring(cx, cy, doubles) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push([cx + 28 * Math.cos(a), cy + 28 * Math.sin(a)]);
  }
  const out = [];
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % 6];
    out.push(S.line(x1, y1, x2, y2, { w: 1.5 }));
    if (doubles.includes(i)) {
      const mx = cx + ((x1 + x2 - 2 * cx) * 0.82) / 2;
      const my = cy + ((y1 + y2 - 2 * cy) * 0.82) / 2;
      const dx = (x2 - x1) * 0.32;
      const dy = (y2 - y1) * 0.32;
      out.push(S.line(mx - dx, my - dy, mx + dx, my + dy, { w: 1.5 }));
    }
  }
  return { svg: out.join(''), pts };
}

// 1. Bond angles at oxygen.
export const ANGLES = svgDoc(
  340,
  160,
  'Left: methanol, with the C–O–H bond angle of about 108.9 degrees, slightly less than the tetrahedral angle because of the two lone pairs on oxygen. Right: methoxymethane, with the C–O–C bond angle of about 111.7 degrees, larger because the two bulky methyl groups repel each other.',
  [
    atom(85, 60, 'O', 'var(--diagram-red)', 14, 11),
    S.line(73, 68, 45, 100, { w: 2 }),
    S.line(97, 68, 125, 100, { w: 2 }),
    atom(38, 108, 'CH₃', 'var(--diagram-fill)', 16, 10),
    atom(130, 106, 'H', 'var(--diagram-fill)', 10, 10),
    S.path('M66 82 Q85 96 104 82', { w: 1, c: 'var(--diagram-accent)' }),
    lab(85, 118, '108.9°', { a: 'middle', c: 'var(--diagram-accent)', size: 10 }),
    lab(85, 36, '··', { a: 'middle', size: 14 }),
    lab(85, 150, 'Methanol', { a: 'middle', w: 'bold' }),
    atom(255, 60, 'O', 'var(--diagram-red)', 14, 11),
    S.line(243, 68, 213, 100, { w: 2 }),
    S.line(267, 68, 297, 100, { w: 2 }),
    atom(206, 108, 'CH₃', 'var(--diagram-fill)', 16, 10),
    atom(304, 108, 'CH₃', 'var(--diagram-fill)', 16, 10),
    S.path('M236 82 Q255 97 274 82', { w: 1, c: 'var(--diagram-accent)' }),
    lab(255, 118, '111.7°', { a: 'middle', c: 'var(--diagram-accent)', size: 10 }),
    lab(255, 36, '··', { a: 'middle', size: 14 }),
    lab(255, 150, 'Methoxymethane', { a: 'middle', w: 'bold' }),
  ].join(''),
);

// 2. Hydrogen bonding in alcohols.
function rOH(x, y) {
  return [
    S.line(x - 14, y - 6, x - 6, y - 2, { w: 2 }),
    atom(x - 24, y - 10, 'R', 'var(--diagram-fill)', 11, 10),
    atom(x, y, 'O', 'var(--diagram-red)', 10, 10),
    S.line(x + 8, y + 5, x + 16, y + 10, { w: 2 }),
    atom(x + 22, y + 13, 'H', 'var(--diagram-fill)', 8, 10),
  ].join('');
}
export const HBOND = svgDoc(
  360,
  150,
  'Three alcohol molecules, each R–O–H, linked in a chain: the hydrogen of one O–H group is attracted to an oxygen lone pair of the next molecule by a hydrogen bond, drawn as a dotted line. These attractions must be broken when the alcohol boils, so alcohols boil far higher than ethers or alkanes of similar mass.',
  [
    rOH(60, 50),
    rOH(160, 85),
    rOH(260, 50),
    S.line(90, 64, 150, 82, { w: 2, dash: '3 3', c: 'var(--diagram-accent)' }),
    S.line(190, 98, 250, 54, { w: 2, dash: '3 3', c: 'var(--diagram-accent)' }),
    lab(118, 92, 'H-bond', { size: 10, c: 'var(--diagram-accent)' }),
    lab(222, 92, 'H-bond', { size: 10, c: 'var(--diagram-accent)' }),
    lab(180, 140, 'Alcohol molecules held together by hydrogen bonds', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Resonance in the phenoxide ion.
export const PHENOXIDE = svgDoc(
  360,
  170,
  'Three resonance structures of the phenoxide ion. Left: the negative charge on oxygen. Centre: a carbon–oxygen double bond with the negative charge on a ring carbon ortho to oxygen. Right: a carbon–oxygen double bond with the negative charge on the carbon para to oxygen. Spreading the charge over the ring stabilises phenoxide, which is why phenol is more acidic than an alcohol.',
  (() => {
    const a = ring(60, 100, [1, 3, 5]);
    const b = ring(180, 100, [2, 4]);
    const c = ring(300, 100, [1, 4]);
    const oSingle = (p) => S.line(p[0], p[1], p[0], p[1] - 24, { w: 1.5 }) + lab(p[0], p[1] - 30, 'O⁻', { a: 'middle', w: 'bold', c: 'var(--diagram-red)' });
    const oDouble = (p) => S.line(p[0] - 2.5, p[1], p[0] - 2.5, p[1] - 24, { w: 1.5 }) + S.line(p[0] + 2.5, p[1], p[0] + 2.5, p[1] - 24, { w: 1.5 }) + lab(p[0], p[1] - 30, 'O', { a: 'middle', w: 'bold', c: 'var(--diagram-red)' });
    return [
      a.svg, oSingle(a.pts[0]),
      S.arrow(98, 100, 132, 100, { size: 5 }), S.arrow(132, 100, 98, 100, { size: 5 }),
      b.svg, oDouble(b.pts[0]),
      lab(b.pts[1][0] + 6, b.pts[1][1] + 2, '−', { size: 14, w: 'bold', c: 'var(--diagram-blue)' }),
      S.arrow(218, 100, 252, 100, { size: 5 }), S.arrow(252, 100, 218, 100, { size: 5 }),
      c.svg, oDouble(c.pts[0]),
      lab(c.pts[3][0], c.pts[3][1] + 18, '−', { a: 'middle', size: 14, w: 'bold', c: 'var(--diagram-blue)' }),
      lab(60, 160, 'charge on O', { a: 'middle', size: 10 }),
      lab(180, 160, 'charge at ortho C', { a: 'middle', size: 10 }),
      lab(300, 160, 'charge at para C', { a: 'middle', size: 10 }),
    ].join('');
  })(),
);
