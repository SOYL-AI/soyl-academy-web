// Hand-drawn SVG schematics for ch15 Evolution (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-10-science-ch06/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Natural selection: grasshoppers on dry grass, before and after several generations of bird predation
const hopper = (x, y, c) =>
  S.ellipse(x, y, 10, 4.5, { fill: `var(--diagram-${c})`, sw: 0.8 }) +
  S.line(x - 4, y + 3, x - 9, y + 9, { w: 1 }) + S.line(x + 2, y + 3, x + 7, y + 10, { w: 1 }) + S.line(x + 8, y - 2, x + 13, y - 6, { w: 1 });
const SPOTS = [[30, 58], [70, 52], [110, 60], [138, 50], [40, 88], [80, 96], [120, 86], [50, 118], [95, 124], [134, 114], [26, 134], [72, 136]];
function panel(x0, title, colours) {
  return [
    S.rect(x0, 34, 150, 120, { fill: 'var(--diagram-brown)', fop: 0.18, sw: 1 }),
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => S.path(`M${x0 + 8 + i * 18} 154 l4 -9 l4 9`, { c: 'var(--diagram-brown)', w: 1 })),
    lab(x0 + 75, 24, title, { a: 'middle', w: 'bold' }),
    ...SPOTS.map(([dx, dy], i) => hopper(x0 + dx, dy, colours[i])),
  ].join('');
}
export const GRASS = svgDoc(
  340,
  200,
  'Natural selection in grasshoppers on dry brown grass: in the first generation half are green and half brown; birds easily spot and eat the green ones, so after several generations most grasshoppers are brown',
  [
    panel(8, 'First generation', ['green', 'brown', 'green', 'brown', 'brown', 'green', 'green', 'brown', 'green', 'brown', 'brown', 'green']),
    panel(182, 'Several generations later', ['brown', 'brown', 'green', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'green', 'brown', 'brown']),
    S.arrow(160, 94, 180, 94, { w: 2, c: 'var(--diagram-accent)' }),
    lab(170, 176, 'Birds spot green grasshoppers on brown grass more easily,', { a: 'middle' }),
    lab(170, 191, 'so brown ones survive, breed and become common', { a: 'middle' }),
  ].join(''),
);

// 2. Speciation by geographical isolation
const blob = (cx, cy, cols) => cols.map((c, i) => S.circle(cx + (i % 4) * 13 - 19, cy + Math.floor(i / 4) * 12 - 6, 5, { fill: `var(--diagram-${c})`, sw: 0.8 })).join('');
const river = (y1, y2) => S.path(`M170 ${y1} C 160 ${y1 + (y2 - y1) * 0.33} 180 ${y1 + (y2 - y1) * 0.66} 170 ${y2}`, { c: 'var(--diagram-blue)', w: 14, op: 0.45 });
export const SPECIATION = svgDoc(
  340,
  262,
  'Speciation by geographical isolation: one interbreeding population is split by a new river; with no gene flow between the two parts, genetic drift and natural selection make them more and more different until they can no longer interbreed and have become two species',
  [
    lab(170, 16, '1. One population: members interbreed freely', { a: 'middle', w: 'bold' }),
    blob(170, 38, ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']),
    S.arrow(170, 56, 170, 74, { w: 1.5 }),
    lab(170, 88, '2. A river splits it: gene flow stops', { a: 'middle', w: 'bold' }),
    river(96, 150),
    blob(92, 120, ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']),
    blob(250, 120, ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']),
    S.arrow(92, 138, 92, 158, { w: 1.5 }),
    S.arrow(250, 138, 250, 158, { w: 1.5 }),
    lab(170, 172, '3. Drift and selection change each part', { a: 'middle', w: 'bold' }),
    river(178, 232),
    blob(92, 204, ['green', 'yellow', 'yellow', 'yellow', 'yellow', 'green', 'yellow', 'yellow']),
    blob(250, 204, ['brown', 'brown', 'green', 'brown', 'brown', 'brown', 'brown', 'brown']),
    lab(170, 252, '4. Too different to interbreed: two species', { a: 'middle', w: 'bold', c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 3. Family tree of vertebrates (a cladogram: branches meet at shared ancestors)
function phylogeny() {
  const tipX = 236;
  const tips = { fish: 30, frog: 62, lizard: 94, bird: 126, mouse: 158, chimp: 190, human: 222 };
  const node = (x, a, b) => ({ x, y: (a.y + b.y) / 2, kids: [a, b] });
  const tip = (k) => ({ x: tipX, y: tips[k], name: k });
  const hc = node(206, tip('chimp'), tip('human'));
  const mam = node(170, tip('mouse'), hc);
  const rept = node(186, tip('lizard'), tip('bird'));
  const amn = node(136, rept, mam);
  const tet = node(98, tip('frog'), amn);
  const root = node(58, tip('fish'), tet);
  const parts = [];
  const draw = (n) => {
    if (!n.kids) return;
    const [a, b] = n.kids;
    parts.push(S.line(n.x, a.y, n.x, b.y, { w: 2 }));
    for (const k of n.kids) {
      parts.push(S.line(n.x, k.y, k.x, k.y, { w: 2 }));
      draw(k);
    }
  };
  parts.push(S.line(30, root.y, root.x, root.y, { w: 2 }));
  draw(root);
  const names = { fish: 'Fish', frog: 'Frog', lizard: 'Lizard', bird: 'Bird', mouse: 'Mouse', chimp: 'Chimpanzee', human: 'Human' };
  for (const [k, y] of Object.entries(tips)) parts.push(lab(tipX + 6, y + 4, names[k], { w: 'bold' }));
  const dot = (x, y) => S.circle(x, y, 3.5, { fill: 'var(--diagram-accent)', sw: 0 });
  parts.push(dot(44, root.y), lab(4, root.y - 8, 'Backbone', { size: 10, c: 'var(--diagram-accent)' }));
  parts.push(dot(78, tet.y), lab(4, tet.y + 4, 'Four limbs', { size: 10, c: 'var(--diagram-accent)' }));
  parts.push(dot(153, mam.y), lab(150, mam.y + 18, 'Hair, milk', { a: 'end', size: 10, c: 'var(--diagram-accent)' }));
  parts.push(lab(160, 14, 'Branch points = shared ancestors', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(
    330,
    236,
    'A family tree of vertebrates: fish branch off first, then frogs; lizards and birds share a more recent ancestor; mice, chimpanzees and humans are mammals, and chimpanzees and humans share the most recent common ancestor; features such as a backbone, four limbs, and hair and milk mark the branches where they first appeared',
    parts.join(''),
  );
}
export const PHYLOGENY = phylogeny();

// 4. Homologous forelimbs: same bones, different jobs
const BONE = { upper: 'var(--diagram-blue)', fore: 'var(--diagram-green)', wrist: 'var(--diagram-yellow)', digit: 'var(--diagram-brown)' };
function limb(x, { upper, fore, wrist, digits, spread, digitLen, flipper }) {
  const p = [];
  const y0 = 46;
  const y1 = y0 + upper;
  p.push(S.line(x, y0, x, y1, { c: BONE.upper, w: 6, cap: 'round' }));
  const y2 = y1 + 6 + fore;
  p.push(S.line(x - 3, y1 + 6, x - 5, y2, { c: BONE.fore, w: 3.5, cap: 'round' }));
  p.push(S.line(x + 3, y1 + 6, x + 5, y2, { c: BONE.fore, w: 3.5, cap: 'round' }));
  const yw = y2 + 7;
  for (let i = 0; i < wrist; i++) p.push(S.circle(x - (wrist - 1) * 3.5 + i * 7, yw, 3.2, { fill: BONE.wrist, sw: 0.8 }));
  const yd = yw + 6;
  for (let i = 0; i < digits; i++) {
    const off = (i - (digits - 1) / 2) * spread;
    p.push(S.line(x + off * 0.6, yd, x + off, yd + digitLen, { c: BONE.digit, w: 2.4, cap: 'round' }));
  }
  if (flipper) p.push(S.path(`M${x - 12} ${y0 + 4} C ${x - 26} ${y1 + 40}, ${x - 22} ${yd + digitLen}, ${x} ${yd + digitLen + 10} C ${x + 22} ${yd + digitLen}, ${x + 26} ${y1 + 40}, ${x + 12} ${y0 + 4}`, { c: 'var(--diagram-muted)', w: 1.2, dash: '4 3' }));
  return p.join('');
}
export const FORELIMBS = svgDoc(
  340,
  262,
  'Homologous organs: the forelimbs of a human, a cat, a whale and a bird have the same basic bones, one upper arm bone, two forearm bones, a group of wrist bones and finger bones, but they are shaped for grasping, walking, swimming and flying',
  [
    limb(45, { upper: 52, fore: 46, wrist: 3, digits: 5, spread: 7, digitLen: 30 }),
    limb(125, { upper: 44, fore: 40, wrist: 3, digits: 5, spread: 5, digitLen: 16 }),
    limb(205, { upper: 18, fore: 18, wrist: 3, digits: 5, spread: 6, digitLen: 72, flipper: true }),
    limb(285, { upper: 46, fore: 56, wrist: 2, digits: 3, spread: 4, digitLen: 22 }),
    lab(45, 26, 'Human', { a: 'middle', w: 'bold' }),
    lab(125, 26, 'Cat', { a: 'middle', w: 'bold' }),
    lab(205, 26, 'Whale', { a: 'middle', w: 'bold' }),
    lab(285, 26, 'Bird', { a: 'middle', w: 'bold' }),
    lab(45, 38, 'grasping', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(125, 38, 'walking', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(205, 38, 'swimming', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(285, 38, 'flying', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.rect(8, 224, 10, 10, { fill: BONE.upper, sw: 0 }), lab(22, 233, 'Upper arm bone'),
    S.rect(120, 224, 10, 10, { fill: BONE.fore, sw: 0 }), lab(134, 233, 'Two forearm bones'),
    S.rect(8, 242, 10, 10, { fill: BONE.wrist, sw: 0 }), lab(22, 251, 'Wrist bones'),
    S.rect(120, 242, 10, 10, { fill: BONE.digit, sw: 0 }), lab(134, 251, 'Finger bones'),
    lab(170, 210, 'Same plan of bones, different jobs', { a: 'middle', c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 5. Analogous wings: same job, different structure
export const WINGS = svgDoc(
  340,
  196,
  'Analogous organs: the wings of an insect, a bird and a bat all help in flight, but an insect wing is a thin sheet with veins and no bones, a bird wing has feathers on its arm and hand bones, and a bat wing is skin stretched between very long finger bones',
  [
    // insect
    S.path('M20 90 C 40 50, 90 44, 104 60 C 92 84, 52 100, 20 90 Z', { fill: 'var(--diagram-fill)', w: 1.2 }),
    S.path('M22 89 C 50 72, 80 62, 102 60 M30 88 C 52 80, 72 76, 88 74 M40 92 C 58 86, 70 86, 80 84', { c: 'var(--diagram-muted)', w: 1 }),
    // bird
    S.line(126, 66, 168, 74, { c: BONE.upper, w: 5, cap: 'round' }),
    S.line(170, 74, 206, 62, { c: BONE.fore, w: 3.5, cap: 'round' }),
    S.line(208, 62, 226, 66, { c: BONE.digit, w: 2.4, cap: 'round' }),
    ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => S.line(140 + i * 10, 72 - (i > 4 ? (i - 4) * 2 : 0), 132 + i * 11, 104 + (i < 5 ? i * 2 : 8 - (i - 5) * 3), { c: 'var(--diagram-muted)', w: 2.2, cap: 'round' })),
    // bat
    S.path('M244 70 L268 64 L330 40 L318 92 L300 104 L280 108 L260 98 Z', { fill: 'var(--diagram-brown)', fop: 0.18, w: 1 }),
    S.line(244, 70, 262, 66, { c: BONE.upper, w: 5, cap: 'round' }),
    S.line(262, 66, 280, 60, { c: BONE.fore, w: 3.5, cap: 'round' }),
    S.line(280, 60, 330, 40, { c: BONE.digit, w: 2.2, cap: 'round' }),
    S.line(280, 60, 318, 92, { c: BONE.digit, w: 2.2, cap: 'round' }),
    S.line(280, 60, 300, 104, { c: BONE.digit, w: 2.2, cap: 'round' }),
    lab(62, 24, 'Insect', { a: 'middle', w: 'bold' }),
    lab(176, 24, 'Bird', { a: 'middle', w: 'bold' }),
    lab(288, 24, 'Bat', { a: 'middle', w: 'bold' }),
    S.lines(62, 128, ['Thin sheet', 'with veins;', 'no bones'], { a: 'middle', size: 10 }),
    S.lines(176, 128, ['Feathers on', 'arm and', 'hand bones'], { a: 'middle', size: 10 }),
    S.lines(288, 128, ['Skin stretched', 'between long', 'finger bones'], { a: 'middle', size: 10 }),
    lab(170, 186, 'Same job (flying), different design and origin', { a: 'middle', c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 6. Fossils in rock layers: deeper is older
const LAYERS = [
  [30, 52, 'var(--diagram-brown)', 0.12, 'Soil'],
  [52, 96, 'var(--diagram-yellow)', 0.18, 'A: mammal bone'],
  [96, 140, 'var(--diagram-muted)', 0.25, 'B: fish'],
  [140, 184, 'var(--diagram-yellow)', 0.32, 'C: ammonite'],
  [184, 228, 'var(--diagram-brown)', 0.3, 'D: trilobite'],
];
export const STRATA = svgDoc(
  330,
  244,
  'Fossils in layers of sedimentary rock: a mammal bone in the top layer A, a fish skeleton in layer B, a coiled ammonite shell in layer C and a trilobite in the deepest layer D; deeper layers were laid down earlier, so their fossils are older',
  [
    ...LAYERS.map(([y1, y2, c, op, name]) => S.rect(56, y1, 176, y2 - y1, { fill: c, fop: op, sw: 0.8 }) + lab(238, (y1 + y2) / 2 + 4, name, { size: 10 })),
    // mammal bone
    S.line(118, 74, 164, 74, { w: 4, cap: 'round' }), S.circle(116, 70, 4, { fill: 'currentColor', sw: 0 }), S.circle(116, 78, 4, { fill: 'currentColor', sw: 0 }), S.circle(166, 70, 4, { fill: 'currentColor', sw: 0 }), S.circle(166, 78, 4, { fill: 'currentColor', sw: 0 }),
    // fish skeleton
    S.line(104, 118, 170, 118, { w: 2 }), S.path('M170 118 L182 110 L182 126 Z', { w: 1.5 }), S.circle(98, 118, 6, { w: 1.5 }),
    ...[0, 1, 2, 3, 4, 5].map((i) => S.line(112 + i * 10, 108, 112 + i * 10, 128, { w: 1.2 })),
    // ammonite
    S.circle(144, 162, 15, { w: 1.6 }), S.circle(146, 160, 9, { w: 1.3 }), S.circle(147, 159, 4, { w: 1.2 }),
    // trilobite
    S.ellipse(144, 206, 22, 13, { w: 1.6 }), S.line(132, 194, 132, 218, { w: 1 }), S.line(156, 194, 156, 218, { w: 1 }),
    ...[0, 1, 2, 3].map((i) => S.line(124, 199 + i * 5, 164, 199 + i * 5, { w: 0.8 })),
    S.arrow(30, 56, 30, 222, { w: 2.5, c: 'var(--diagram-accent)' }),
    lab(30, 238, 'Older', { a: 'middle', size: 10, w: 'bold', c: 'var(--diagram-accent)' }),
    lab(30, 46, 'Younger', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    lab(165, 20, 'Illustrative rock layers: deeper = laid down earlier', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 7. Humans and chimpanzees share an ancestor
export const APES = svgDoc(
  330,
  214,
  'Family tree of gorillas, chimpanzees and humans: chimpanzees and humans branch from a shared ancestor that lived several million years ago, and that ancestor shares an older ancestor with gorillas; humans did not evolve from chimpanzees',
  [
    S.line(40, 78, 110, 78, { w: 2.5 }),
    S.line(110, 40, 110, 116, { w: 2.5 }),
    S.line(110, 40, 236, 40, { w: 2.5 }),
    S.line(110, 116, 184, 116, { w: 2.5 }),
    S.line(184, 92, 184, 140, { w: 2.5 }),
    S.line(184, 92, 236, 92, { w: 2.5 }),
    S.line(184, 140, 236, 140, { w: 2.5 }),
    lab(242, 44, 'Gorilla', { w: 'bold' }),
    lab(242, 96, 'Chimpanzee', { w: 'bold' }),
    lab(242, 144, 'Human', { w: 'bold' }),
    S.circle(184, 116, 6, { fill: 'var(--diagram-accent)', sw: 0 }),
    S.circle(110, 78, 5, { fill: 'var(--diagram-muted)', sw: 0 }),
    S.lines(184, 160, ['Shared ancestor of chimpanzees', 'and humans (several million years ago)'], { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    lab(62, 58, 'Older shared', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(62, 70, 'ancestor', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(165, 204, 'Today’s species are cousins on separate branches', { a: 'middle', w: 'bold' }),
    lab(6, 14, 'Time runs from left to right; tips are living species', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { GRASS, SPECIATION, PHYLOGENY, FORELIMBS, WINGS, STRATA, APES };
