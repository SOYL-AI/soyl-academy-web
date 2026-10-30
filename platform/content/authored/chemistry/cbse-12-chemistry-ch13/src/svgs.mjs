// Hand-drawn SVG schematics for ch13 Polymers (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const bead = (x, y, c = 'var(--diagram-blue)') => S.circle(x, y, 4, { fill: c, c, sw: 1 });
const chain = (pts, c) => S.path('M' + pts.map(([x, y]) => `${x} ${y}`).join(' L'), { w: 1.5, c }) + pts.map(([x, y]) => bead(x, y, c)).join('');

// 1. Linear, branched and cross-linked polymers.
const lin = (y0) => Array.from({ length: 8 }, (_, i) => [20 + i * 12, y0 + (i % 2 ? 6 : 0)]);
export const STRUCTURES = svgDoc(
  360,
  200,
  'Three panels of polymer chains drawn as beads on strings. Left, linear: long separate chains lying side by side and packing closely. Middle, branched: a main chain with short side chains sticking out, so the chains cannot pack closely. Right, cross-linked: chains joined to each other at many points by bonds, forming a three-dimensional network.',
  [
    chain(lin(40)), chain(lin(70)), chain(lin(100)), chain(lin(130)),
    lab(64, 175, 'Linear', { a: 'middle', w: 'bold' }),
    lab(64, 190, '(HDPE, PVC)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    chain([[135, 90], [147, 84], [159, 90], [171, 84], [183, 90], [195, 84], [207, 90], [219, 84]]),
    chain([[159, 90], [155, 104], [161, 117]], 'var(--diagram-green)'),
    chain([[183, 90], [189, 76], [183, 62], [189, 49]], 'var(--diagram-green)'),
    chain([[207, 90], [203, 104], [209, 117], [203, 130]], 'var(--diagram-green)'),
    chain([[147, 84], [143, 70], [149, 57]], 'var(--diagram-green)'),
    lab(177, 175, 'Branched', { a: 'middle', w: 'bold' }),
    lab(177, 190, '(LDPE)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    chain([[250, 50], [264, 56], [278, 50], [292, 56], [306, 50], [320, 56], [334, 50]]),
    chain([[250, 100], [264, 106], [278, 100], [292, 106], [306, 100], [320, 106], [334, 100]]),
    chain([[250, 145], [264, 151], [278, 145], [292, 151], [306, 145], [320, 151], [334, 145]]),
    ...[[264, 56, 264, 106], [306, 50, 306, 100], [278, 100, 278, 145], [320, 106, 320, 151]].map(([a, b, c, d]) => S.line(a, b, c, d, { w: 2, c: 'var(--diagram-red)' })),
    lab(292, 175, 'Cross-linked', { a: 'middle', w: 'bold' }),
    lab(292, 190, '(Bakelite, melamine)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Vulcanisation: sulfur bridges between polyisoprene chains.
export const VULCAN = svgDoc(
  340,
  170,
  'Two long rubber chains drawn side by side. Before vulcanisation they are separate and can slide past each other. After heating with sulfur, short sulfur bridges, shown as S–S links, join the chains at intervals, so the rubber becomes harder, less sticky and springs back after stretching.',
  [
    lab(80, 18, 'Natural rubber', { a: 'middle', w: 'bold' }),
    S.path('M20 50 C40 40 60 60 80 50 C100 40 120 60 140 50', { w: 2, c: 'var(--diagram-brown)' }),
    S.path('M20 90 C40 80 60 100 80 90 C100 80 120 100 140 90', { w: 2, c: 'var(--diagram-brown)' }),
    lab(80, 125, 'chains slide past each other', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.arrow(150, 70, 186, 70, { size: 6 }),
    lab(168, 60, 'S, heat', { a: 'middle', size: 10 }),
    lab(260, 18, 'Vulcanised rubber', { a: 'middle', w: 'bold' }),
    S.path('M200 50 C220 40 240 60 260 50 C280 40 300 60 320 50', { w: 2, c: 'var(--diagram-brown)' }),
    S.path('M200 90 C220 80 240 100 260 90 C280 80 300 100 320 90', { w: 2, c: 'var(--diagram-brown)' }),
    ...[220, 260, 300].map((x) => S.line(x, 52, x, 88, { w: 2, c: 'var(--diagram-yellow)' }) + S.text(x + 4, 74, 'S–S', { size: 10, c: 'var(--diagram-accent)' })),
    lab(260, 125, 'sulfur cross-links', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(170, 158, 'Cross-links make rubber harder, tougher and more elastic', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);
