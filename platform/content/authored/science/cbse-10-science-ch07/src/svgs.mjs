// Hand-drawn SVG schematics for ch07 How do Organisms Reproduce? (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-10-science-ch06/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const nuc = (x, y, r = 6) => S.circle(x, y, r, { fill: 'var(--diagram-muted)', sw: 1 });
const cellFill = { fill: 'var(--diagram-fill)', w: 1.5 };

// 1. Binary fission in Amoeba
export const FISSION = svgDoc(
  340,
  160,
  'Binary fission in Amoeba in four stages: the parent cell, the nucleus dividing into two, the cytoplasm pinching in the middle, and two daughter cells',
  [
    S.path('M20 70 C18 52 34 44 46 48 C58 40 72 52 68 64 C78 72 70 90 56 88 C46 98 28 94 26 84 C16 82 14 74 20 70 Z', cellFill),
    nuc(45, 68, 7),
    S.ellipse(125, 70, 31, 22, { fill: 'var(--diagram-fill)' }),
    nuc(114, 70, 6),
    nuc(136, 70, 6),
    S.line(120, 70, 130, 70, { w: 2, c: 'var(--diagram-muted)' }),
    S.path('M180 70 C180 52 200 50 206 60 C208 64 212 64 214 60 C220 50 240 52 240 70 C240 88 220 90 214 80 C212 76 208 76 206 80 C200 90 180 88 180 70 Z', cellFill),
    nuc(194, 70, 6),
    nuc(226, 70, 6),
    S.ellipse(282, 70, 16, 15, { fill: 'var(--diagram-fill)' }),
    nuc(282, 70, 5),
    S.ellipse(318, 70, 16, 15, { fill: 'var(--diagram-fill)' }),
    nuc(318, 70, 5),
    S.arrow(74, 70, 90, 70),
    S.arrow(160, 70, 176, 70),
    S.arrow(246, 70, 262, 70),
    lab(45, 22, 'Nucleus', { a: 'middle' }),
    S.lead(45, 26, 45, 61),
    lab(45, 122, 'Parent cell', { a: 'middle' }),
    lab(125, 122, 'Nucleus', { a: 'middle' }),
    lab(125, 135, 'divides', { a: 'middle' }),
    lab(210, 122, 'Cytoplasm', { a: 'middle' }),
    lab(210, 135, 'divides', { a: 'middle' }),
    lab(300, 122, 'Two daughter', { a: 'middle' }),
    lab(300, 135, 'cells', { a: 'middle' }),
  ].join(''),
);

// 2. Multiple fission in Plasmodium
const ring = (cx, cy, rr, n, f) => Array.from({ length: n }, (_, i) => f(cx + rr * Math.cos((2 * Math.PI * i) / n), cy + rr * Math.sin((2 * Math.PI * i) / n), i)).join('');
export const MULTIPLE = svgDoc(
  340,
  150,
  'Multiple fission in Plasmodium: a single cell forms a protective cyst, its nucleus divides many times inside, and the cyst bursts to release many daughter cells',
  [
    S.circle(48, 62, 22, { fill: 'var(--diagram-fill)' }),
    nuc(48, 62, 6),
    S.circle(165, 62, 36, { sw: 3.5 }),
    S.circle(165, 62, 32, { fill: 'var(--diagram-fill)', sw: 1 }),
    ring(165, 62, 18, 8, (x, y) => nuc(x, y, 4)),
    nuc(165, 62, 4),
    S.path('M262 34 A30 30 0 0 1 300 34 M306 44 A30 30 0 0 1 306 82 M296 92 A30 30 0 0 1 266 92 M256 82 A30 30 0 0 1 256 44', { sw: 3.5, w: 3.5 }),
    ring(282, 63, 14, 5, (x, y) => S.circle(x, y, 5, { fill: 'var(--diagram-fill)', sw: 1 }) + S.circle(x, y, 1.6, { fill: 'currentColor', sw: 0 })),
    ring(282, 63, 40, 7, (x, y) => S.circle(x, y, 5, { fill: 'var(--diagram-fill)', sw: 1 }) + S.circle(x, y, 1.6, { fill: 'currentColor', sw: 0 })),
    S.arrow(76, 62, 122, 62),
    S.arrow(206, 62, 232, 62),
    lab(48, 122, 'Single cell', { a: 'middle' }),
    lab(165, 122, 'Cyst wall forms; nucleus', { a: 'middle' }),
    lab(165, 135, 'divides many times', { a: 'middle' }),
    lab(290, 128, 'Cyst bursts: many', { a: 'middle' }),
    lab(290, 141, 'daughter cells', { a: 'middle' }),
  ].join(''),
);

// 3. Budding in Hydra
const hydra = (x, base, k = 1) => {
  const top = base - 108 * k;
  const w = 9 * k;
  return [
    S.path(`M${x - w} ${base} C${x - w - 2 * k} ${base - 30 * k} ${x - w - k} ${top + 40 * k} ${x - w + 1} ${top} L${x + w - 1} ${top} C${x + w + k} ${top + 40 * k} ${x + w + 2 * k} ${base - 30 * k} ${x + w} ${base} Z`, { fill: 'var(--diagram-green)', fop: 0.3 }),
    S.path(`M${x - 6 * k} ${top} Q${x - 22 * k} ${top - 10 * k} ${x - 30 * k} ${top - 36 * k} M${x - 2 * k} ${top} Q${x - 8 * k} ${top - 20 * k} ${x - 12 * k} ${top - 44 * k} M${x + 2 * k} ${top} Q${x + 8 * k} ${top - 20 * k} ${x + 12 * k} ${top - 44 * k} M${x + 6 * k} ${top} Q${x + 22 * k} ${top - 10 * k} ${x + 30 * k} ${top - 36 * k}`, { w: 1.5 }),
  ].join('');
};
export const BUDDING = svgDoc(
  340,
  214,
  'Budding in Hydra: a small bud grows out from the side of the parent, develops its own tentacles, and finally separates as a new, independent Hydra',
  [
    hydra(50, 184),
    S.ellipse(61, 142, 6, 8, { fill: 'var(--diagram-green)', fop: 0.5 }),
    hydra(160, 184),
    S.path('M168 146 L190 124 L196 130 L170 156 Z', { fill: 'var(--diagram-green)', fop: 0.5, w: 1.2 }),
    S.path('M191 125 Q192 114 198 108 M194 128 Q204 122 210 120', { w: 1.2 }),
    hydra(255, 184),
    hydra(312, 184, 0.6),
    S.arrow(86, 134, 110, 134),
    S.arrow(206, 134, 224, 134),
    lab(4, 12, 'Tentacles'),
    S.lead(24, 16, 26, 36),
    lab(80, 174, 'Bud', { c: 'var(--diagram-accent)' }),
    S.lead(78, 168, 66, 148),
    lab(50, 206, 'Bud forms', { a: 'middle' }),
    lab(160, 206, 'Bud grows tentacles', { a: 'middle' }),
    lab(284, 206, 'New Hydra separates', { a: 'middle' }),
  ].join(''),
);

// 4. Regeneration in Planaria
const worm = (x, y, k = 1, cuts = false) => {
  const p = (dx, dy) => `${(x + dx * k).toFixed(1)} ${(y + dy * k).toFixed(1)}`;
  return [
    S.path(`M${p(0, 0)} C${p(12, 4)} ${p(20, 12)} ${p(16, 22)} C${p(14, 26)} ${p(10, 28)} ${p(10, 34)} L${p(12, 132)} C${p(12, 146)} ${p(6, 154)} ${p(0, 156)} C${p(-6, 154)} ${p(-12, 146)} ${p(-12, 132)} L${p(-10, 34)} C${p(-10, 28)} ${p(-14, 26)} ${p(-16, 22)} C${p(-20, 12)} ${p(-12, 4)} ${p(0, 0)} Z`, { fill: 'var(--diagram-brown)', fop: 0.3 }),
    S.circle(x - 5 * k, y + 16 * k, 2.4 * k, { fill: 'currentColor', sw: 0 }),
    S.circle(x + 5 * k, y + 16 * k, 2.4 * k, { fill: 'currentColor', sw: 0 }),
    cuts ? S.line(x - 30, y + 52, x + 30, y + 52, { dash: '5 3', c: 'var(--diagram-accent)', w: 2 }) + S.line(x - 30, y + 102, x + 30, y + 102, { dash: '5 3', c: 'var(--diagram-accent)', w: 2 }) : '',
  ].join('');
};
export const REGEN = svgDoc(
  330,
  200,
  'Regeneration in Planaria: a flatworm cut into three pieces, and each piece regrowing its missing parts to form a complete worm',
  [
    worm(60, 14, 1, true),
    lab(96, 70, 'Cut', { c: 'var(--diagram-accent)' }),
    lab(96, 120, 'Cut', { c: 'var(--diagram-accent)' }),
    S.arrow(124, 96, 156, 96),
    worm(190, 40, 0.65),
    worm(245, 40, 0.65),
    worm(300, 40, 0.65),
    lab(60, 192, 'Planaria cut in three', { a: 'middle' }),
    lab(245, 160, 'Each piece regrows', { a: 'middle' }),
    lab(245, 173, 'into a complete worm', { a: 'middle' }),
  ].join(''),
);

// 5. Spore formation in Rhizopus
const sporangium = (x, top, burst = false) => {
  const out = [S.line(x, 150, x, top + 13, { w: 1.5 })];
  if (!burst) {
    out.push(S.circle(x, top, 13, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 1.2 }));
    for (const [dx, dy] of [[-5, -4], [3, -6], [6, 2], [-2, 4], [-7, 4], [1, -1]]) out.push(S.circle(x + dx, top + dy, 1.8, { fill: 'currentColor', sw: 0 }));
  } else {
    out.push(S.path(`M${x - 12} ${top + 6} A13 13 0 0 1 ${x - 4} ${top - 12} M${x + 5} ${top - 12} A13 13 0 0 1 ${x + 12} ${top + 6}`, { w: 1.2 }));
    for (const [dx, dy] of [[-18, -18], [-6, -26], [8, -24], [20, -14], [26, -2], [-24, -4], [14, -34], [-14, -34]]) out.push(S.circle(x + dx, top + dy, 1.8, { fill: 'currentColor', sw: 0 }));
  }
  return out.join('');
};
export const RHIZOPUS = svgDoc(
  320,
  200,
  'Spore formation in bread mould (Rhizopus): thread-like hyphae spread over the bread, upright stalks carry round sporangia full of spores, and a ripe sporangium bursts to release spores',
  [
    S.rect(10, 152, 300, 34, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1 }),
    S.path('M14 150 C40 144 60 154 90 148 C120 142 150 154 180 148 C210 142 240 154 270 148 C285 146 296 150 306 148', { w: 1.5 }),
    S.path('M70 151 L64 162 M70 151 L76 162 M140 151 L134 162 M140 151 L146 162 M210 151 L204 162 M210 151 L216 162 M268 151 L262 162 M268 151 L274 162', { w: 1 }),
    sporangium(70, 76),
    sporangium(140, 62),
    sporangium(210, 84),
    sporangium(268, 70, true),
    lab(14, 26, 'Sporangium full of spores'),
    S.lead(60, 30, 66, 63),
    lab(316, 26, 'Spores released', { a: 'end' }),
    lab(316, 128, 'Hyphae', { a: 'end' }),
    S.lead(290, 132, 284, 148),
    lab(160, 176, 'Bread (food source)', { a: 'middle' }),
  ].join(''),
);

// 6. Bryophyllum leaf with buds
const leafPts = Array.from({ length: 12 }, (_, i) => {
  const t = (2 * Math.PI * i) / 12;
  return [150 + 118 * Math.cos(t), 86 + 52 * Math.sin(t), t];
});
const scallop = leafPts
  .map(([x, y], i) => {
    const [x2, y2, t2] = leafPts[(i + 1) % 12];
    const tm = leafPts[i][2] + Math.PI / 12;
    const cx = 150 + 136 * Math.cos(tm);
    const cy = 86 + 62 * Math.sin(tm);
    void t2;
    return `${i === 0 ? `M${x.toFixed(1)} ${y.toFixed(1)} ` : ''}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  })
  .join(' ');
const plantlet = ([x, y, t]) => {
  const ux = Math.cos(t);
  const uy = Math.sin(t) * 0.9;
  const bx = x + 8 * ux;
  const by = y + 8 * uy;
  return [
    S.ellipse(bx + 5 * ux - 4 * uy, by + 5 * uy + 4 * ux, 5, 3, { fill: 'var(--diagram-green)', fop: 0.7, sw: 0.8 }),
    S.ellipse(bx + 5 * ux + 4 * uy, by + 5 * uy - 4 * ux, 5, 3, { fill: 'var(--diagram-green)', fop: 0.7, sw: 0.8 }),
    S.line(x, y, bx + 3 * ux, by + 3 * uy, { w: 1 }),
    S.path(`M${x.toFixed(1)} ${y.toFixed(1)} l${(-4 * uy + 3 * ux).toFixed(1)} ${(4 * ux + 3 * uy).toFixed(1)} M${x.toFixed(1)} ${y.toFixed(1)} l${(4 * uy + 3 * ux).toFixed(1)} ${(-4 * ux + 3 * uy).toFixed(1)}`, { w: 0.8, c: 'var(--diagram-brown)' }),
  ].join('');
};
export const BRYO = svgDoc(
  320,
  190,
  'A Bryophyllum leaf with small buds in the notches along its margin; each bud has tiny leaves and roots and can grow into a new plant',
  [
    S.path(`${scallop} Z`, { fill: 'var(--diagram-green)', fop: 0.25 }),
    S.line(40, 86, 262, 86, { w: 1.2, c: 'var(--diagram-green)' }),
    S.line(10, 86, 32, 86, { w: 2.5, c: 'var(--diagram-green)' }),
    ...[1, 3, 5, 7, 9, 11].map((i) => plantlet(leafPts[i])),
    lab(316, 176, 'New plant growing from a notch', { a: 'end' }),
    S.lead(262, 166, 262, 124),
    lab(10, 176, 'Leaf of Bryophyllum'),
    S.lead(52, 166, 80, 118),
    lab(160, 14, 'Buds with tiny leaves and roots', { a: 'middle', c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 7. Flower, longitudinal section
const mirror = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => `${320 - Number(x)} ${y}`);
const petalL = 'M142 204 C102 192 66 134 72 80 C96 90 124 134 146 196 Z';
const sepalL = 'M140 210 C122 206 108 192 102 176 C118 182 134 194 144 206 Z';
const stamenL1 = 'M146 204 C140 170 130 140 124 112';
const stamenL2 = 'M151 204 C148 176 142 150 138 128';
export const FLOWER = svgDoc(
  320,
  280,
  'Longitudinal section of a flower: green sepals at the base, coloured petals, stamens each made of a filament and an anther, and the central pistil made of the stigma, style and swollen ovary containing ovules',
  [
    S.line(160, 276, 160, 216, { w: 3, c: 'var(--diagram-green)' }),
    S.path(petalL, { fill: 'var(--diagram-red)', fop: 0.25 }),
    S.path(mirror(petalL), { fill: 'var(--diagram-red)', fop: 0.25 }),
    S.path(sepalL, { fill: 'var(--diagram-green)', fop: 0.6 }),
    S.path(mirror(sepalL), { fill: 'var(--diagram-green)', fop: 0.6 }),
    S.ellipse(160, 212, 26, 8, { fill: 'var(--diagram-green)', fop: 0.4 }),
    S.path(stamenL1, { w: 1.5 }),
    S.path(mirror(stamenL1), { w: 1.5 }),
    S.path(stamenL2, { w: 1.5 }),
    S.path(mirror(stamenL2), { w: 1.5 }),
    S.ellipse(123, 104, 5, 9, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.ellipse(197, 104, 5, 9, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.ellipse(137, 120, 5, 9, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.ellipse(183, 120, 5, 9, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.ellipse(160, 184, 20, 24, { fill: 'var(--diagram-fill)' }),
    S.line(160, 164, 160, 204, { w: 1, c: 'var(--diagram-muted)' }),
    ...[[152, 176], [168, 176], [152, 192], [168, 192]].map(([x, y]) => S.ellipse(x, y, 4, 5, { fill: 'var(--diagram-yellow)', sw: 1 })),
    S.path('M156 161 L156 90 M164 161 L164 90', { w: 1.5 }),
    S.path('M150 90 C150 78 170 78 170 90 Z', { fill: 'var(--diagram-accent)', fop: 0.5, w: 1.5 }),
    lab(6, 86, 'Stigma'),
    S.lead(44, 84, 150, 86),
    lab(6, 140, 'Style'),
    S.lead(34, 137, 156, 140),
    lab(6, 176, 'Ovule'),
    S.lead(38, 173, 148, 176),
    lab(6, 206, 'Ovary'),
    S.lead(38, 203, 141, 196),
    lab(6, 240, 'Sepal'),
    S.lead(36, 236, 110, 186),
    lab(314, 40, 'Petal', { a: 'end' }),
    S.lead(286, 44, 246, 86),
    lab(314, 100, 'Anther', { a: 'end' }),
    S.lead(276, 98, 203, 104),
    lab(314, 160, 'Filament', { a: 'end' }),
    S.lead(266, 157, 187, 157),
    lab(314, 236, 'Stalk (pedicel)', { a: 'end' }),
    S.lead(228, 240, 162, 246),
  ].join(''),
);

// 8. Pollen tube to the ovule
export const POLLEN_TUBE = svgDoc(
  320,
  280,
  'Germination of a pollen grain on the stigma: a pollen tube grows down through the style into the ovary and reaches the ovule, carrying the male germ cell to the female germ cell',
  [
    S.ellipse(160, 222, 54, 46, { fill: 'var(--diagram-fill)' }),
    S.path('M150 182 L150 44 M170 182 L170 44', { w: 1.5 }),
    S.path('M138 44 C134 26 150 20 160 30 C170 20 186 26 182 44 Z', { fill: 'var(--diagram-accent)', fop: 0.3, w: 1.5 }),
    S.ellipse(160, 230, 18, 26, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1.2 }),
    S.ellipse(160, 230, 9, 16, { sw: 1 }),
    S.circle(160, 220, 4.5, { fill: 'var(--diagram-red)', sw: 0 }),
    S.circle(146, 22, 5, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.circle(174, 20, 5, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.circle(158, 30, 5, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.path('M158 35 C154 62 162 100 158 140 C155 170 161 190 160 206', { w: 2, c: 'var(--diagram-accent)' }),
    S.circle(160, 199, 2, { fill: 'var(--diagram-blue)', sw: 0 }),
    S.circle(159, 193, 2, { fill: 'var(--diagram-blue)', sw: 0 }),
    lab(316, 18, 'Pollen grains on the stigma', { a: 'end' }),
    S.lead(240, 22, 180, 22),
    lab(6, 40, 'Stigma'),
    S.lead(42, 37, 137, 38),
    lab(316, 110, 'Pollen tube', { a: 'end', c: 'var(--diagram-accent)' }),
    S.lead(256, 107, 161, 110),
    lab(6, 110, 'Style'),
    S.lead(34, 107, 149, 110),
    lab(316, 180, 'Male germ cells', { a: 'end', c: 'var(--diagram-blue)' }),
    S.lead(232, 178, 163, 194),
    lab(6, 200, 'Ovary'),
    S.lead(38, 197, 108, 210),
    lab(316, 240, 'Ovule', { a: 'end' }),
    S.lead(282, 237, 178, 236),
    lab(316, 262, 'Female germ cell (egg)', { a: 'end', c: 'var(--diagram-red)' }),
    S.lead(198, 258, 163, 223),
  ].join(''),
);

// 9. Germinating seed
export const SEED = svgDoc(
  320,
  200,
  'A germinating seed: the two cotyledons store food, the plumule grows upwards into the shoot and the radicle grows downwards into the root',
  [
    S.rect(10, 120, 300, 70, { fill: 'var(--diagram-brown)', fop: 0.2, sw: 0 }),
    S.line(10, 120, 310, 120, { w: 1.2, c: 'var(--diagram-brown)' }),
    S.path('M160 108 C130 106 118 92 124 78 C130 66 150 66 156 80 Z', { fill: 'var(--diagram-yellow)', fop: 0.5 }),
    S.path('M160 108 C190 106 202 92 196 78 C190 66 170 66 164 80 Z', { fill: 'var(--diagram-yellow)', fop: 0.5 }),
    S.path('M160 100 C160 80 162 56 160 36', { w: 2.5, c: 'var(--diagram-green)' }),
    S.ellipse(150, 32, 10, 4, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }),
    S.ellipse(170, 30, 10, 4, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }),
    S.path('M160 104 C158 130 162 154 158 182', { w: 2.5, c: 'var(--diagram-brown)' }),
    S.path('M160 140 L150 148 M160 152 L170 160 M159 166 L150 174', { w: 1, c: 'var(--diagram-brown)' }),
    lab(6, 30, 'Plumule (future shoot)', { c: 'var(--diagram-green)' }),
    S.lead(128, 27, 139, 30),
    lab(6, 80, 'Cotyledons'),
    lab(6, 93, '(stored food)'),
    S.lead(70, 84, 124, 86),
    lab(316, 160, 'Radicle (future root)', { a: 'end' }),
    S.lead(194, 157, 164, 150),
    lab(6, 136, 'Soil', { c: 'var(--diagram-brown)' }),
  ].join(''),
);

// 10. Male reproductive system (front view, schematic)
const vasL = 'M110 202 C94 176 90 128 102 98 C110 76 128 72 138 80 C146 86 149 96 152 104';
export const MALE = svgDoc(
  320,
  290,
  'Human male reproductive system, front view: two testes in the scrotum, a vas deferens from each testis running up to join the urethra below the urinary bladder, with the seminal vesicles and prostate gland adding fluid, and the urethra passing through the penis',
  [
    S.ellipse(160, 58, 34, 28, { fill: 'var(--diagram-yellow)', fop: 0.25 }),
    S.path('M128 96 C116 92 114 74 122 70 C128 76 134 88 136 98 Z', { fill: 'var(--diagram-muted)', fop: 0.5, w: 1 }),
    S.path(mirror('M128 96 C116 92 114 74 122 70 C128 76 134 88 136 98 Z'), { fill: 'var(--diagram-muted)', fop: 0.5, w: 1 }),
    S.ellipse(160, 104, 16, 10, { fill: 'var(--diagram-muted)', fop: 0.6 }),
    S.ellipse(110, 226, 28, 32, { c: 'var(--diagram-muted)' }),
    S.ellipse(210, 226, 28, 32, { c: 'var(--diagram-muted)' }),
    S.ellipse(110, 228, 15, 20, { fill: 'var(--diagram-fill)' }),
    S.ellipse(210, 228, 15, 20, { fill: 'var(--diagram-fill)' }),
    S.path(vasL, { w: 2, c: 'var(--diagram-blue)' }),
    S.path(mirror(vasL), { w: 2, c: 'var(--diagram-blue)' }),
    S.rect(149, 124, 22, 118, { rx: 10, fill: 'var(--diagram-fill)' }),
    S.line(160, 86, 160, 240, { w: 2, c: 'var(--diagram-accent)' }),
    lab(6, 48, 'Urinary bladder'),
    S.lead(90, 52, 127, 56),
    lab(6, 140, 'Vas deferens', { c: 'var(--diagram-blue)' }),
    S.lead(72, 137, 92, 137),
    lab(6, 232, 'Testis'),
    S.lead(42, 229, 95, 228),
    lab(6, 272, 'Scrotum'),
    S.lead(50, 268, 92, 252),
    lab(314, 76, 'Seminal vesicle', { a: 'end' }),
    S.lead(232, 79, 196, 84),
    lab(314, 106, 'Prostate gland', { a: 'end' }),
    S.lead(238, 103, 176, 104),
    lab(314, 150, 'Penis', { a: 'end' }),
    S.lead(282, 147, 172, 150),
    lab(314, 186, 'Urethra', { a: 'end', c: 'var(--diagram-accent)' }),
    S.lead(270, 183, 162, 183),
  ].join(''),
);

// 11. Female reproductive system (front view, schematic)
const tubeL = 'M122 70 C98 58 72 50 56 62 C48 70 48 82 54 90';
export const FEMALE = svgDoc(
  320,
  250,
  'Human female reproductive system, front view: two ovaries, an oviduct (fallopian tube) from near each ovary leading to the uterus, the narrow cervix at the lower end of the uterus, and the vagina',
  [
    S.path('M118 70 C118 52 202 52 202 70 C202 110 180 140 172 158 L148 158 C140 140 118 110 118 70 Z', { fill: 'var(--diagram-red)', fop: 0.2 }),
    S.path('M140 76 L180 76 L162 130 L158 130 Z', { c: 'var(--diagram-red)', w: 1 }),
    S.rect(148, 158, 24, 14, { fill: 'var(--diagram-red)', fop: 0.35 }),
    S.path('M150 172 L150 236 M170 172 L170 236', { w: 1.5 }),
    S.path(tubeL, { w: 3, c: 'var(--diagram-red)' }),
    S.path(mirror(tubeL), { w: 3, c: 'var(--diagram-red)' }),
    S.path('M54 90 l-8 6 M54 90 l-2 9 M54 90 l5 8', { w: 1.2, c: 'var(--diagram-red)' }),
    S.path('M266 90 l8 6 M266 90 l2 9 M266 90 l-5 8', { w: 1.2, c: 'var(--diagram-red)' }),
    S.ellipse(70, 112, 17, 10, { fill: 'var(--diagram-fill)' }),
    S.ellipse(250, 112, 17, 10, { fill: 'var(--diagram-fill)' }),
    lab(6, 26, 'Oviduct (fallopian tube)'),
    S.lead(60, 30, 84, 52),
    lab(6, 150, 'Ovary'),
    S.lead(34, 146, 62, 120),
    lab(314, 90, 'Uterus', { a: 'end' }),
    S.lead(276, 87, 200, 90),
    lab(314, 168, 'Cervix', { a: 'end' }),
    S.lead(276, 165, 173, 165),
    lab(314, 214, 'Vagina', { a: 'end' }),
    S.lead(276, 211, 171, 211),
  ].join(''),
);

// 12. Embryo, placenta and umbilical cord in the uterus
export const PLACENTA = svgDoc(
  340,
  262,
  'Embryo developing in the uterus: it floats in a fluid-filled sac and is joined by the umbilical cord to the placenta, a disc embedded in the uterine wall through which food and oxygen pass in and wastes pass out',
  [
    S.ellipse(140, 130, 112, 100, { fill: 'var(--diagram-red)', fop: 0.25 }),
    S.ellipse(140, 134, 96, 84, { fill: 'var(--diagram-fill)' }),
    S.path('M176 52 C202 50 232 66 238 92 C226 92 210 80 194 72 C184 66 176 60 176 52 Z', { fill: 'var(--diagram-red)', fop: 0.6, w: 1.5 }),
    S.path('M208 82 C194 100 202 112 184 120 C168 126 172 140 156 146', { w: 3, c: 'var(--diagram-blue)' }),
    S.circle(116, 112, 24, { fill: 'var(--diagram-yellow)', fop: 0.35 }),
    S.ellipse(140, 160, 30, 38, { fill: 'var(--diagram-yellow)', fop: 0.35 }),
    S.path('M120 178 C110 188 112 200 124 202 M156 186 C166 196 162 206 150 206 M130 140 C120 148 116 156 120 164', { w: 1.5 }),
    lab(6, 18, 'Uterine wall'),
    S.lead(46, 22, 66, 66),
    lab(336, 30, 'Placenta', { a: 'end' }),
    S.lead(290, 34, 222, 72),
    lab(336, 140, 'Umbilical cord', { a: 'end', c: 'var(--diagram-blue)' }),
    S.lead(256, 137, 190, 117),
    lab(336, 204, 'Embryo', { a: 'end' }),
    S.lead(294, 201, 170, 172),
    lab(6, 256, 'Fluid-filled sac around the embryo'),
    S.lead(110, 247, 112, 212),
  ].join(''),
);

export const ALL = { FISSION, MULTIPLE, BUDDING, REGEN, RHIZOPUS, BRYO, FLOWER, POLLEN_TUBE, SEED, MALE, FEMALE, PLACENTA };
