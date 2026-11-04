// Hand-drawn SVG schematics for ch11 Diversity (allow-listed elements, palette colours only). All schematic, not to scale
// unless a scale is drawn. Geometry is computed here and checked in SELF_CHECKS.
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const B = 'var(--diagram-blue)';
const G = 'var(--diagram-green)';
const R = 'var(--diagram-red)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const A = 'var(--diagram-accent)';
const M = 'var(--diagram-muted)';

// Rough text-width test (sans-serif): about 0.56 em per character, 0.62 for bold.
const textW = (s, size = 11, bold = false) => s.length * size * (bold ? 0.62 : 0.56);
function fits(label, items, w) {
  const bad = items.filter(([s, size, bold]) => textW(s, size, bold) > w - 8);
  chk(bad.length === 0, `${label}: every line fits its box${bad.length ? ` (too wide: ${bad.map((b) => b[0]).join(' | ')})` : ''}`);
}
function overlaps(a, b) {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}
function noOverlap(label, boxes) {
  let bad = 0;
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) if (overlaps(boxes[i], boxes[j])) bad++;
  chk(bad === 0, `${label}: no two boxes overlap`);
}

// ---------------------------------------------------------------- 1. five kingdoms
const kingdoms = [
  { name: 'Monera', c: BR, cell: ['Prokaryotic'], body: ['Single cell'], food: ['Own food or', 'ready-made food'], ex: ['Bacteria,', 'cyanobacteria'] },
  { name: 'Protista', c: Y, cell: ['Eukaryotic'], body: ['Single cell'], food: ['Own food or', 'ingests food'], ex: ['Amoeba, Euglena,', 'Paramecium'] },
  { name: 'Fungi', c: R, cell: ['Eukaryotic;', 'chitin cell wall'], body: ['Mostly threads;', 'yeast is one cell'], food: ['Absorbs ready-', 'made food'], ex: ['Mushroom, bread', 'mould, yeast'] },
  { name: 'Plantae', c: G, cell: ['Eukaryotic;', 'cellulose wall'], body: ['Many cells'], food: ['Makes own food', 'by photosynthesis'], ex: ['Moss, fern, pine,', 'mango'] },
  { name: 'Animalia', c: B, cell: ['Eukaryotic;', 'no cell wall'], body: ['Many cells'], food: ['Eats other', 'organisms'], ex: ['Hydra, fish,', 'bird, human'] },
];
const kW = 140;
const kGap = 10;
const kX0 = 10;
const kBoxes = [];
const kLines = [];
function kingdomCard(k, i) {
  const x = kX0 + i * (kW + kGap);
  kBoxes.push({ x, y: 14, w: kW, h: 282 });
  kLines.push([k.name, 13, true]);
  let o = S.rect(x, 14, kW, 282, { c: k.c, sw: 2, fill: k.c, fop: 0.1, rx: 8 }) + lab(x + kW / 2, 38, k.name, { a: 'middle', w: 'bold', size: 13 });
  let y = 62;
  for (const [label, arr] of [['CELL TYPE', k.cell], ['BODY', k.body], ['FOOD', k.food], ['EXAMPLES', k.ex]]) {
    o += lab(x + 8, y, label, { size: 10, c: M, w: 'bold' });
    arr.forEach((s, j) => {
      kLines.push([s, 11, false]);
      o += lab(x + 8, y + 15 + j * 14, s, { size: 11, it: label === 'EXAMPLES' && false });
    });
    y += 62;
  }
  return o;
}
fits('kingdoms', kLines, kW);
noOverlap('kingdoms', kBoxes);
chk(kingdoms.length === 5, 'kingdoms: five cards are drawn');
const kRight = kX0 + 5 * kW + 4 * kGap;
chk(kRight <= 760, `kingdoms: the cards end at x ${kRight}, inside the 760 px width`);
export const KINGDOMS = svgDoc(
  760,
  350,
  'Chart of the five kingdoms of Whittaker. Monera has prokaryotic single cells that make their own food or take ready-made food, such as bacteria and cyanobacteria. Protista has eukaryotic single cells, such as Amoeba, Euglena and Paramecium. Fungi are eukaryotic with a chitin cell wall, mostly made of threads, and absorb ready-made food, such as mushroom, bread mould and yeast. Plantae are eukaryotic many-celled organisms with a cellulose cell wall that make food by photosynthesis. Animalia are eukaryotic many-celled organisms with no cell wall that eat other organisms. Monera are prokaryotes and the other four kingdoms are eukaryotes. Schematic.',
  [
    kingdoms.map(kingdomCard).join(''),
    S.line(kX0 + 4, 314, kX0 + kW - 4, 314, { c: BR, w: 3 }),
    lab(kX0 + kW / 2, 334, 'Prokaryotes', { a: 'middle', c: BR, w: 'bold' }),
    S.line(kX0 + kW + kGap + 4, 314, kRight - 4, 314, { c: A, w: 3 }),
    lab((kX0 + kW + kGap + kRight) / 2, 334, 'Eukaryotes', { a: 'middle', c: A, w: 'bold' }),
  ].join(''),
);

// ---------------------------------------------------------------- 2. plant divisions
const pBoxes = [];
const pLines = [];
function pbox(id, x, y, w, h, c, lines) {
  pBoxes.push({ id, x, y, w, h });
  lines.forEach(([s, size, bold]) => pLines.push([s, size ?? 11, bold, w]));
  let o = S.rect(x, y, w, h, { c, sw: 2, fill: c, fop: 0.1, rx: 6 });
  lines.forEach(([s, size, bold], i) => {
    o += lab(x + w / 2, y + 18 + i * 15, s, { a: 'middle', w: bold ? 'bold' : undefined, size: size ?? 11, c: bold ? 'currentColor' : 'currentColor' });
  });
  return o;
}
const dW = 140;
const dX = [10, 160, 310, 460, 610];
const l2y = 170;
const l2h = 78;
const topBox = { x: 290, y: 8, w: 180, h: 34 };
let planOut = pbox('plantae', topBox.x, topBox.y, topBox.w, topBox.h, G, [['Plantae', 13, true]]);
// level 1 group labels
const crypt = { x: 10, y: 84, w: 440, h: 34 };
const phan = { x: 460, y: 84, w: 290, h: 34 };
planOut += pbox('crypt', crypt.x, crypt.y, crypt.w, crypt.h, BR, [['Cryptogams: no flowers, no seeds', 11, true]]);
planOut += pbox('phan', phan.x, phan.y, phan.w, phan.h, A, [['Phanerogams: make seeds', 11, true]]);
const divs = [
  ['thal', 'Thallophyta', ['No root, stem or leaf', 'Spirogyra (alga)'], B],
  ['bryo', 'Bryophyta', ['No vascular tissue', 'Moss, liverwort'], G],
  ['ptero', 'Pteridophyta', ['Vascular; no seeds', 'Fern'], G],
  ['gym', 'Gymnosperms', ['Naked seeds', 'Pine, deodar'], Y],
  ['ang', 'Angiosperms', ['Seeds inside fruits', 'Mango, wheat'], R],
];
divs.forEach(([id, name, ls, c], i) => {
  planOut += pbox(id, dX[i], l2y, dW, l2h, c, [[name, 11, true], [ls[0], 10], [ls[1], 10]]);
});
// connectors
const cx = (b) => b.x + b.w / 2;
planOut += S.line(cx(topBox), topBox.y + topBox.h, cx(topBox), 62, { w: 1.5 });
planOut += S.line(cx(crypt), 62, cx(phan), 62, { w: 1.5 });
planOut += S.line(cx(crypt), 62, cx(crypt), crypt.y, { w: 1.5 });
planOut += S.line(cx(phan), 62, cx(phan), phan.y, { w: 1.5 });
// cryptogams -> three divisions
planOut += S.line(cx(crypt), crypt.y + crypt.h, cx(crypt), 144, { w: 1.5 });
planOut += S.line(dX[0] + dW / 2, 144, dX[2] + dW / 2, 144, { w: 1.5 });
for (const i of [0, 1, 2]) planOut += S.arrow(dX[i] + dW / 2, 144, dX[i] + dW / 2, l2y, { w: 1.5, size: 6 });
// phanerogams -> two divisions
planOut += S.line(cx(phan), phan.y + phan.h, cx(phan), 144, { w: 1.5 });
planOut += S.line(dX[3] + dW / 2, 144, dX[4] + dW / 2, 144, { w: 1.5 });
for (const i of [3, 4]) planOut += S.arrow(dX[i] + dW / 2, 144, dX[i] + dW / 2, l2y, { w: 1.5, size: 6 });
// angiosperms -> monocot, dicot
const mono = { x: 450, y: 296, w: 150, h: 92 };
const dico = { x: 610, y: 296, w: 150, h: 92 };
planOut += pbox('mono', mono.x, mono.y, mono.w, mono.h, R, [['Monocots', 11, true], ['One seed leaf', 10], ['Parallel veins', 10], ['Wheat, banana', 10]]);
planOut += pbox('dico', dico.x, dico.y, dico.w, dico.h, R, [['Dicots', 11, true], ['Two seed leaves', 10], ['Net-like veins', 10], ['Gram, neem', 10]]);
planOut += S.line(680, l2y + l2h, 680, 276, { w: 1.5 });
planOut += S.line(cx(mono), 276, cx(dico), 276, { w: 1.5 });
planOut += S.arrow(cx(mono), 276, cx(mono), mono.y, { w: 1.5, size: 6 });
planOut += S.arrow(cx(dico), 276, cx(dico), dico.y, { w: 1.5, size: 6 });
planOut += lab(10, 380, 'Reads left to right: more complex bodies, then seeds,', { size: 10, c: M }) + lab(10, 393, 'then seeds enclosed in a fruit. Schematic.', { size: 10, c: M });
chk(pLines.filter(([s, size, bold, w]) => textW(s, size, bold) > w - 8).length === 0, 'plant divisions: every line fits its box' + pLines.filter(([s, size, bold, w]) => textW(s, size, bold) > w - 8).map((x) => ' (' + x[0] + ')').join(''));
// the wide boxes (crypt, phan, plantae) hold one line only
noOverlap('plant divisions', pBoxes);
chk(divs.length === 5, 'plant divisions: five divisions drawn, three cryptogam and two phanerogam');
chk(mono.x + mono.w <= dico.x && dico.x + dico.w <= 770, 'plant divisions: monocot and dicot boxes sit side by side inside the width');
export const PLANT_DIVISIONS = svgDoc(
  770,
  404,
  'Flow chart of the plant kingdom. Plantae splits into cryptogams, which have no flowers or seeds, and phanerogams, which make seeds. Cryptogams are Thallophyta, with no root, stem or leaf, such as the alga Spirogyra; Bryophyta, with no vascular tissue, such as moss and liverwort; and Pteridophyta, with vascular tissue but no seeds, such as ferns. Phanerogams are gymnosperms, with naked seeds, such as pine and deodar, and angiosperms, with seeds inside fruits. Angiosperms are divided into monocots, with one seed leaf and parallel veins, such as wheat and banana, and dicots, with two seed leaves and net-like veins, such as gram and neem. Schematic.',
  planOut,
);

// ---------------------------------------------------------------- 3. animal classification tree
const aBoxes = [];
const aLines = [];
function abox(id, x, y, w, h, c, lines) {
  aBoxes.push({ id, x, y, w, h });
  lines.forEach(([s, size, bold]) => aLines.push([s, size ?? 10, bold, w]));
  let o = S.rect(x, y, w, h, { c, sw: 1.8, fill: c, fop: 0.1, rx: 5 });
  lines.forEach(([s, size, bold], i) => {
    o += lab(x + w / 2, y + 15 + i * 14, s, { a: 'middle', w: bold ? 'bold' : undefined, size: size ?? 10 });
  });
  return o;
}
const phyla = [
  ['Porifera', 'Pores in the body', 'Sponge'],
  ['Cnidaria', 'Stinging cells', 'Hydra, jellyfish'],
  ['Platyhelminthes', 'Flat body', 'Tapeworm'],
  ['Nematoda', 'Round body', 'Roundworm'],
  ['Annelida', 'Ringed segments', 'Earthworm'],
  ['Arthropoda', 'Jointed legs', 'Cockroach'],
  ['Mollusca', 'Soft body, shell', 'Snail'],
  ['Echinodermata', 'Spiny skin', 'Starfish'],
];
const pW = 112;
const pH = 62;
let aOut = abox('animalia', 290, 6, 180, 30, B, [['Animalia', 13, true]]);
aOut += abox('nonchord', 10, 66, 4 * pW + 3 * 8, 30, BR, [['Invertebrates: no backbone (non-chordates)', 11, true]]);
aOut += abox('chord', 500, 66, 250, 30, A, [['Chordata: has a notochord', 11, true]]);
aOut += S.line(380, 36, 380, 52, { w: 1.5 }) + S.line(10 + (4 * pW + 24) / 2, 52, 625, 52, { w: 1.5 });
aOut += S.arrow(10 + (4 * pW + 24) / 2, 52, 10 + (4 * pW + 24) / 2, 66, { w: 1.5, size: 6 }) + S.arrow(625, 52, 625, 66, { w: 1.5, size: 6 });
phyla.forEach(([n, f, e], i) => {
  const x = 10 + (i % 4) * (pW + 8);
  const y = 112 + Math.floor(i / 4) * (pH + 10);
  aOut += abox(`ph${i}`, x, y, pW, pH, BR, [[n, 10, true], [f, 10], [e, 10]]);
});
aOut += S.line(10 + (4 * pW + 24) / 2, 96, 10 + (4 * pW + 24) / 2, 108, { w: 1.5 });
const verts = [
  ['Pisces', 'Fish: gills and fins', 'rohu, shark'],
  ['Amphibia', 'Moist skin; water and land', 'frog, toad'],
  ['Reptilia', 'Dry scaly skin', 'lizard, snake'],
  ['Aves', 'Feathers and wings', 'crow, peacock'],
  ['Mammalia', 'Hair and milk glands', 'cow, bat, human'],
];
const vH = 44;
verts.forEach(([n, f, e], i) => {
  aOut += abox(`v${i}`, 500, 112 + i * (vH + 6), 250, vH, A, [[`${n}: ${e}`, 10, true], [f, 10]]);
});
aOut += S.line(488, 104, 488, 112 + 4 * (vH + 6) + vH / 2, { w: 1.5 });
aOut += S.line(488, 104, 625, 104, { w: 1.5 }) + S.line(625, 96, 625, 104, { w: 1.5 });
verts.forEach((_, i) => {
  aOut += S.arrow(488, 112 + i * (vH + 6) + vH / 2, 500, 112 + i * (vH + 6) + vH / 2, { w: 1.5, size: 6 });
});
aOut += lab(500, 112 + 5 * (vH + 6) + 14, 'Vertebrates: five classes of Chordata', { size: 10, c: M });
aOut += lab(10, 290, 'Sponges to starfish are invertebrates. Schematic, not to scale.', { size: 10, c: M });
chk(aLines.filter(([s, size, bold, w]) => textW(s, size, bold) > w - 8).length === 0, `animal tree: every line fits its box${aLines.filter(([s, size, bold, w]) => textW(s, size, bold) > w - 8).map((x) => ` (${x[0]})`).join('')}`);
noOverlap('animal tree', aBoxes);
chk(phyla.length === 8 && verts.length === 5, 'animal tree: eight non-chordate phyla and five vertebrate classes are drawn');
export const ANIMAL_TREE = svgDoc(
  760,
  396,
  'Classification tree of the animal kingdom. Animalia splits into invertebrates, which have no backbone, and Chordata, which have a notochord. The invertebrate phyla are Porifera, such as sponges; Cnidaria, such as Hydra and jellyfish, with stinging cells; Platyhelminthes, flatworms such as tapeworm; Nematoda, roundworms; Annelida, ringed worms such as the earthworm; Arthropoda, with jointed legs, such as the cockroach; Mollusca, with a soft body and usually a shell, such as the snail; and Echinodermata, with spiny skin, such as the starfish. The vertebrates, a group of chordates, have five classes: Pisces or fish, Amphibia such as frogs, Reptilia such as lizards and snakes, Aves or birds, and Mammalia such as cows, bats and humans. Schematic, not to scale.',
  aOut,
);

// ---------------------------------------------------------------- 4. virus schematic and scale
const vx = 150;
const vy = 150;
const vr = 62;
const hexPts = Array.from({ length: 6 }, (_, k) => [vx + vr * Math.cos((Math.PI / 3) * k + Math.PI / 6), vy + vr * Math.sin((Math.PI / 3) * k + Math.PI / 6)]);
const sideLens = hexPts.map((p, i) => Math.hypot(p[0] - hexPts[(i + 1) % 6][0], p[1] - hexPts[(i + 1) % 6][1]));
chk(sideLens.every((s) => Math.abs(s - vr) < 0.01), `virus: the capsid hexagon is regular (every side is ${vr} px)`);
const hexPath = `M${hexPts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L')} Z`;
let spikes = '';
for (let k = 0; k < 12; k++) {
  const a = (Math.PI / 6) * k;
  const rx = vx + (vr + 2) * Math.cos(a);
  const ry = vy + (vr + 2) * Math.sin(a);
  const hx = hexPts[0];
  void hx;
  const x2 = vx + (vr + 20) * Math.cos(a);
  const y2 = vy + (vr + 20) * Math.sin(a);
  spikes += S.line(rx, ry, x2, y2, { c: R, w: 2 }) + S.circle(x2, y2, 3, { c: R, sw: 1.5, fill: R, fop: 0.5 });
}
// scale: 1 px = 10 nm, so 100 nm = 10 px and 2000 nm = 200 px
const pxPerNm = 0.1;
const virusNm = 100;
const bactNm = 2000;
const virusPx = virusNm * pxPerNm;
const bactPx = bactNm * pxPerNm;
chk(Math.abs(bactPx / virusPx - 20) < 1e-9, `virus scale: a 2000 nm bacterium is drawn ${bactPx} px and a 100 nm virus ${virusPx} px, so the bacterium is 20 times longer`);
const sx = 330;
export const VIRUS = svgDoc(
  700,
  330,
  'Schematic of a virus and a size comparison. A virus has a protein coat called the capsid, with spike proteins on the outside, and genetic material, either DNA or RNA, inside. It has no cytoplasm, no organelles and no cell membrane, so it is acellular. A scale bar shows that a typical virus of about 100 nanometres is about 20 times smaller than a bacterium of about 2000 nanometres. Schematic, not to scale for the left drawing; the right drawing is to scale.',
  [
    S.path(hexPath, { c: B, w: 5, fill: B, fop: 0.12, join: 'round' }),
    hexPts.map((p) => S.line(vx, vy, p[0], p[1], { c: B, w: 1, dash: '3 3' })).join(''),
    S.path(`M${vx - 28} ${vy} q10 -26 22 -6 q10 20 22 -2 q12 -20 18 8 q-8 30 -30 22 q-20 -6 -32 -16`, { c: A, w: 3, cap: 'round' }),
    spikes,
    lab(vx, 28, 'A virus (schematic)', { a: 'middle', w: 'bold', size: 12 }),
    lab(vx + 62, 244, 'Capsid: protein coat', { a: 'start', c: B }),
    S.lead(vx + 66, 231, vx + 27, vy + 46),
    lab(20, 272, 'Genetic material: DNA or RNA', { a: 'start', c: A }),
    S.lead(110, 264, vx - 18, vy + 14),
    lab(vx + 112, 62, 'Spike proteins', { a: 'start', c: R }),
    S.lead(vx + 110, 66, vx + 80, 96),
    lab(vx, 296, 'No cytoplasm, no organelles: acellular', { a: 'middle', size: 10, c: M }),
    // scale panel
    lab(sx + 175, 28, 'Size on one scale', { a: 'middle', w: 'bold', size: 12 }),
    S.rect(sx, 90, bactPx, 40, { c: BR, sw: 2, rx: 20, fill: BR, fop: 0.15 }),
    S.circle(sx + 20, 110, 5, { c: A, sw: 1.5, fill: A, fop: 0.4 }),
    lab(sx, 78, 'Bacterium: about 2000 nm (2 micrometres)', { size: 11 }),
    S.circle(sx + virusPx / 2, 190, virusPx / 2, { c: B, sw: 2, fill: B, fop: 0.3 }),
    lab(sx + virusPx + 10, 194, 'Virus: about 100 nm', { size: 11 }),
    S.line(sx, 235, sx + bactPx, 235, { c: 'currentColor', w: 2 }) + S.line(sx, 229, sx, 241, { w: 2 }) + S.line(sx + bactPx, 229, sx + bactPx, 241, { w: 2 }),
    lab(sx + bactPx / 2, 260, 'Scale bar: 2000 nm. The bacterium is about 20 times longer.', { a: 'middle', size: 10 }),
    lab(sx + bactPx / 2, 276, 'Viruses range from about 20 nm to 300 nm.', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. food web and ecological roles
const nodeW = 110;
const nodeH = 40;
const colX = [10, 145, 280, 415, 550];
const rowY = [60, 150, 240];
const nodes = {
  grass: { x: colX[0], y: rowY[0], t: 'Grass', role: 'P' },
  mango: { x: colX[0], y: rowY[2], t: 'Mango tree', role: 'P' },
  hopper: { x: colX[1], y: rowY[0], t: 'Grasshopper', role: 'H' },
  goat: { x: colX[1], y: rowY[1], t: 'Goat', role: 'H' },
  parrot: { x: colX[1], y: rowY[2], t: 'Parrot', role: 'H' },
  frog: { x: colX[2], y: rowY[0], t: 'Frog', role: 'C' },
  leopard: { x: colX[2], y: rowY[1], t: 'Leopard', role: 'C' },
  snake: { x: colX[3], y: rowY[0], t: 'Snake', role: 'C' },
  eagle: { x: colX[4], y: rowY[1], t: 'Eagle', role: 'C' },
};
const roleCol = { P: G, H: Y, C: R };
const links = [
  ['grass', 'hopper'], ['grass', 'goat'], ['mango', 'goat'], ['mango', 'parrot'],
  ['hopper', 'frog'], ['goat', 'leopard'], ['frog', 'snake'], ['snake', 'eagle'], ['parrot', 'eagle'],
];
const ids = Object.keys(nodes);
chk(links.every(([a, b]) => nodes[a] && nodes[b]), 'food web: every arrow joins two drawn organisms');
chk(ids.filter((id) => nodes[id].role !== 'P').every((id) => links.some(([, b]) => b === id)), 'food web: every consumer has an arrow coming in from its food');
chk(ids.filter((id) => !['leopard', 'eagle'].includes(id)).every((id) => links.some(([a]) => a === id)), 'food web: every organism except the two top carnivores is eaten by another');
chk(ids.filter((id) => nodes[id].role === 'P').length === 2 && ids.filter((id) => nodes[id].role === 'H').length === 3 && ids.filter((id) => nodes[id].role === 'C').length === 4, 'food web: 2 producers, 3 herbivores and 4 carnivores');
const nodeBoxes = ids.map((id) => ({ id, x: nodes[id].x, y: nodes[id].y, w: nodeW, h: nodeH }));
noOverlap('food web', nodeBoxes);
chk(ids.every((id) => textW(nodes[id].t, 11, true) <= nodeW - 8), 'food web: every name fits its box');
const edgePt = (a, b) => {
  const A1 = nodes[a];
  const B1 = nodes[b];
  const ac = [A1.x + nodeW / 2, A1.y + nodeH / 2];
  const bc = [B1.x + nodeW / 2, B1.y + nodeH / 2];
  const dx = bc[0] - ac[0];
  const dy = bc[1] - ac[1];
  const sc = (w, h) => Math.min(Math.abs(dx) > 1e-9 ? w / 2 / Math.abs(dx) : Infinity, Math.abs(dy) > 1e-9 ? h / 2 / Math.abs(dy) : Infinity);
  const s1 = sc(nodeW, nodeH);
  const s2 = sc(nodeW + 6, nodeH + 6);
  return [ac[0] + dx * s1, ac[1] + dy * s1, bc[0] - dx * s2, bc[1] - dy * s2];
};
const barY = 312;
const decomp = { x: 10, y: barY, w: 650, h: 44 };
let webOut = '';
[['Producers', colX[0]], ['Herbivores', colX[1]], ['Carnivores', colX[2]], ['Carnivores', colX[3]]].forEach(([t, x]) => {
  webOut += lab(x + nodeW / 2, 30, t, { a: 'middle', size: 10, c: M, w: 'bold' });
});
webOut += lab(colX[4] + nodeW / 2, 30, 'Top carnivore', { a: 'middle', size: 10, c: M, w: 'bold' });
for (const id of ids) {
  const n = nodes[id];
  webOut += S.rect(n.x, n.y, nodeW, nodeH, { c: roleCol[n.role], sw: 2, fill: roleCol[n.role], fop: 0.15, rx: 6 }) + lab(n.x + nodeW / 2, n.y + 25, n.t, { a: 'middle', w: 'bold' });
}
for (const [a, b] of links) {
  const [x1, y1, x2, y2] = edgePt(a, b);
  webOut += S.arrow(x1, y1, x2, y2, { c: 'currentColor', w: 1.5, size: 7 });
}
// decomposer bar and dashed arrows from organisms whose column below is free
webOut += S.rect(decomp.x, decomp.y, decomp.w, decomp.h, { c: BR, sw: 2, fill: BR, fop: 0.15, rx: 6 });
webOut += lab(decomp.x + decomp.w / 2, decomp.y + 19, 'Decomposers: bacteria and fungi', { a: 'middle', w: 'bold' });
webOut += lab(decomp.x + decomp.w / 2, decomp.y + 35, 'break down dead plants, dead animals and wastes', { a: 'middle', size: 10 });
const dashFrom = [['mango', colX[0] + nodeW / 2], ['parrot', colX[1] + nodeW / 2], ['leopard', colX[2] + nodeW / 2], ['snake', colX[3] + nodeW / 2], ['eagle', colX[4] + nodeW / 2]];
for (const [id, x] of dashFrom) {
  webOut += S.arrow(x, nodes[id].y + nodeH, x, barY, { c: BR, w: 1.5, dash: '4 3', size: 6 });
}
// a vertical dashed line may not cross another organism box
const crossing = dashFrom.filter(([id, x]) => nodeBoxes.some((b) => b.id !== id && x > b.x && x < b.x + b.w && b.y > nodes[id].y));
chk(crossing.length === 0, 'food web: no dashed decomposer arrow crosses an organism box');
webOut += lab(670, 90, 'Solid arrow:', { size: 10, c: M, w: 'bold' }) + lab(670, 104, 'food goes to', { size: 10, c: M }) + lab(670, 118, 'the eater', { size: 10, c: M });
webOut += lab(670, 140, 'Dashed arrow:', { size: 10, c: M, w: 'bold' }) + lab(670, 154, 'dead remains', { size: 10, c: M }) + lab(670, 168, 'go to decomposers', { size: 10, c: M });
webOut += lab(10, 378, 'Sunlight energy enters through the producers. Schematic.', { size: 10, c: M });
export const FOOD_WEB = svgDoc(
  800,
  390,
  'Food web showing ecological roles. Producers are grass and a mango tree, which make food by photosynthesis. Herbivores are the grasshopper, which eats grass; the goat, which eats grass and mango leaves; and the parrot, which eats mango fruit. Carnivores are the frog, which eats the grasshopper; the leopard, which eats the goat; the snake, which eats the frog; and the eagle, which eats the snake and the parrot. Decomposers, bacteria and fungi, along the bottom, break down dead plants, dead animals and wastes from all of these. Schematic.',
  webOut,
);
