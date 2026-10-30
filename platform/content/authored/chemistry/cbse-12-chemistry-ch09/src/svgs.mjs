// Hand-drawn SVG schematics for ch09 Amines (allow-listed elements, palette colours only).
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

// 1. Pyramidal structure of trimethylamine.
export const PYRAMID = svgDoc(
  320,
  170,
  'The nitrogen atom of an amine is sp³ hybridised and pyramidal. Three groups (here three methyl groups) are bonded to nitrogen and a lone pair occupies the fourth position, at the top. The C–N–C angle is about 108 degrees, a little less than the tetrahedral angle because the lone pair repels the bonds.',
  [
    atom(160, 80, 'N', 'var(--diagram-blue)', 15, 11),
    S.ellipse(160, 40, 10, 18, { fill: 'var(--diagram-accent)', fop: 0.35, sw: 1, c: 'var(--diagram-accent)' }),
    lab(160, 44, '··', { a: 'middle', size: 13 }),
    lab(184, 30, 'lone pair', { size: 10, c: 'var(--diagram-accent)' }),
    S.line(150, 92, 100, 128, { w: 2 }),
    S.line(170, 92, 220, 128, { w: 2 }),
    S.line(160, 95, 160, 140, { w: 2, dash: '4 3' }),
    atom(92, 134, 'CH₃', 'var(--diagram-fill)', 16, 10),
    atom(228, 134, 'CH₃', 'var(--diagram-fill)', 16, 10),
    atom(160, 148, 'CH₃', 'var(--diagram-fill)', 16, 10),
    S.path('M128 112 Q160 124 192 112', { w: 1, c: 'var(--diagram-accent)' }),
    lab(160, 116, '108°', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    lab(40, 70, 'pyramidal', { a: 'middle', size: 10 }),
    lab(40, 84, 'sp³ nitrogen', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Resonance in aniline: lone pair delocalised into the ring.
export const ANILINE = svgDoc(
  360,
  170,
  'Resonance in aniline. Left: the normal structure with a lone pair on the nitrogen of the NH2 group. Centre: the lone pair has formed a C=N double bond, giving nitrogen a positive charge and an ortho carbon a negative charge. Right: the same with the negative charge on the para carbon. Because the lone pair is partly shared with the ring, it is less available to accept a proton, so aniline is a weaker base than ammonia, and the ortho and para positions are rich in electrons.',
  (() => {
    const a = ring(60, 100, [1, 3, 5]);
    const b = ring(180, 100, [2, 4]);
    const c = ring(300, 100, [1, 4]);
    const nh2 = (p) => S.line(p[0], p[1], p[0], p[1] - 24, { w: 1.5 }) + lab(p[0], p[1] - 30, 'NH₂', { a: 'middle', w: 'bold', c: 'var(--diagram-blue)' }) + lab(p[0] - 9, p[1] - 42, '··', { a: 'middle', size: 13 });
    const nh2p = (p) => S.line(p[0] - 2.5, p[1], p[0] - 2.5, p[1] - 24, { w: 1.5 }) + S.line(p[0] + 2.5, p[1], p[0] + 2.5, p[1] - 24, { w: 1.5 }) + lab(p[0], p[1] - 30, 'NH₂⁺', { a: 'middle', w: 'bold', c: 'var(--diagram-blue)' });
    return [
      a.svg, nh2(a.pts[0]),
      S.arrow(98, 100, 132, 100, { size: 5 }), S.arrow(132, 100, 98, 100, { size: 5 }),
      b.svg, nh2p(b.pts[0]),
      lab(b.pts[1][0] + 6, b.pts[1][1] + 2, '−', { size: 14, w: 'bold', c: 'var(--diagram-red)' }),
      S.arrow(218, 100, 252, 100, { size: 5 }), S.arrow(252, 100, 218, 100, { size: 5 }),
      c.svg, nh2p(c.pts[0]),
      lab(c.pts[3][0], c.pts[3][1] + 18, '−', { a: 'middle', size: 14, w: 'bold', c: 'var(--diagram-red)' }),
      lab(60, 160, 'lone pair on N', { a: 'middle', size: 10 }),
      lab(180, 160, 'charge at ortho C', { a: 'middle', size: 10 }),
      lab(300, 160, 'charge at para C', { a: 'middle', size: 10 }),
    ].join('');
  })(),
);
