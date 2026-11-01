// SVG diagrams for ICSE 10 Biology ch02 Genetics. The Punnett-square helper follows isc-12-biology-ch05/src/svgs.mjs
// (same author); every square is filled from calc.mjs, and the traits, labels and other drawings are new.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { gametes, phenotype, MONO_R, MONO_G, DI_R } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sortGt = (a, b) => (a < b ? -1 : a > b ? 1 : 0); // ASCII: dominant (upper case) alleles first
const join2 = (x, y) => Array.from(x).map((c, i) => (c <= y[i] ? c + y[i] : y[i] + c)).join('');

function punnett({ p1, p2, cell = 46, x0 = 70, y0 = 56, fillFor, title, label, note = [], w, h }) {
  const rows = gametes(p1).map(([g]) => g).sort(sortGt);
  const cols = gametes(p2).map(([g]) => g).sort(sortGt);
  const parts = [S.text(x0 + (cols.length * cell) / 2, 18, title, { a: 'middle', size: 12, w: 'bold' })];
  parts.push(S.text(x0 + (cols.length * cell) / 2, 36, `Male gametes (${p2})`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  cols.forEach((g, j) => parts.push(S.text(x0 + j * cell + cell / 2, y0 - 6, g, { a: 'middle', size: 12, w: 'bold' })));
  rows.forEach((g, i) => parts.push(S.text(x0 - 8, y0 + i * cell + cell / 2 + 4, g, { a: 'end', size: 12, w: 'bold' })));
  parts.push(S.text(14, y0 + (rows.length * cell) / 2 - 6, 'Female', { size: 10, c: 'var(--diagram-muted)' }), S.text(14, y0 + (rows.length * cell) / 2 + 8, `(${p1})`, { size: 10, c: 'var(--diagram-muted)' }));
  rows.forEach((r, i) =>
    cols.forEach((c, j) => {
      const gt = join2(r, c);
      const [fill, fop] = fillFor(gt);
      parts.push(S.rect(x0 + j * cell, y0 + i * cell, cell, cell, { fill, fop, sw: 1 }));
      parts.push(S.text(x0 + j * cell + cell / 2, y0 + i * cell + cell / 2 + 4, gt, { a: 'middle', size: cell > 40 ? 12 : 10 }));
    }),
  );
  parts.push(...note);
  return svgDoc(w, h, label, parts.join(''));
}

// 1. Monohybrid F1 x F1 for flower colour (violet V dominant over white v)
export const MONO = punnett({
  p1: 'Vv', p2: 'Vv', cell: 58, x0: 96,
  title: 'F1 × F1: Vv × Vv (flower colour)',
  fillFor: (gt) => (phenotype(gt) === 'D' ? ['var(--diagram-blue)', 0.3] : ['var(--diagram-fill)', 1]),
  label: `Punnett square for two violet-flowered pea plants, each Vv. Gametes V and v from each parent. Offspring VV, Vv, Vv and vv: violet to white ${MONO_R.join(' to ')}; VV to Vv to vv ${MONO_G.join(' to ')}`,
  note: [
    S.rect(250, 70, 14, 12, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1 }), lab(270, 80, 'Violet flowers'),
    S.rect(250, 92, 14, 12, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 }), lab(270, 102, 'White flowers'),
    lab(250, 136, `Phenotypic ratio  ${MONO_R.join(' : ')}`), lab(250, 154, `Genotypic ratio  ${MONO_G.join(' : ')}`), lab(250, 172, '(VV : Vv : vv)'),
  ],
  w: 430, h: 190,
});

// 2. Dihybrid F1 x F1: height (T/t) and flower colour (V/v)
const diFill = { DD: ['var(--diagram-green)', 0.4], Dr: ['var(--diagram-yellow)', 0.4], rD: ['var(--diagram-blue)', 0.3], rr: ['var(--diagram-fill)', 1] };
export const DI = punnett({
  p1: 'TtVv', p2: 'TtVv', cell: 50, x0: 96,
  title: 'F1 × F1: TtVv × TtVv (height and flower colour)',
  fillFor: (gt) => diFill[phenotype(gt)],
  label: `Four-by-four Punnett square for two TtVv pea plants, giving 16 boxes: tall violet 9, tall white 3, dwarf violet 3, dwarf white 1 (ratio ${DI_R.join(' to ')})`,
  note: [
    ...[['DD', `Tall, violet  ${DI_R[0]}`], ['Dr', `Tall, white  ${DI_R[1]}`], ['rD', `Dwarf, violet  ${DI_R[2]}`], ['rr', `Dwarf, white  ${DI_R[3]}`]].flatMap(([k, t], i) => [S.rect(318, 80 + i * 26, 14, 12, { fill: diFill[k][0], fop: diFill[k][1], sw: 1 }), lab(338, 90 + i * 26, t)]),
    lab(318, 200, `Phenotypic ratio ${DI_R.join(' : ')}`, { w: 'bold' }),
  ],
  w: 480, h: 270,
});

// 3. Sex determination in humans
export const SEX = (() => {
  const parts = [];
  const box = (x, y, t, sub, fill) => {
    parts.push(S.rect(x - 46, y - 20, 92, 40, { rx: 6, fill, fop: 0.25, sw: 1.3 }));
    parts.push(S.text(x, y - 3, t, { a: 'middle', size: 13, w: 'bold' }), S.text(x, y + 13, sub, { a: 'middle', size: 10 }));
  };
  box(110, 40, '44 + XX', 'Mother', 'var(--diagram-red)');
  box(350, 40, '44 + XY', 'Father', 'var(--diagram-blue)');
  parts.push(lab(14, 104, 'Gametes', { c: 'var(--diagram-muted)' }));
  box(110, 104, '22 + X', 'all eggs', 'var(--diagram-red)');
  box(300, 104, '22 + X', 'sperm', 'var(--diagram-blue)');
  box(400, 104, '22 + Y', 'sperm', 'var(--diagram-blue)');
  parts.push(S.arrow(110, 62, 110, 82, { size: 6 }), S.arrow(350, 62, 304, 82, { size: 6 }), S.arrow(350, 62, 396, 82, { size: 6 }));
  box(170, 190, '44 + XX', 'Girl (1/2)', 'var(--diagram-red)');
  box(330, 190, '44 + XY', 'Boy (1/2)', 'var(--diagram-blue)');
  parts.push(S.arrow(120, 126, 160, 168, { size: 6 }), S.arrow(296, 126, 184, 168, { size: 6 }), S.arrow(124, 126, 316, 168, { size: 6 }), S.arrow(400, 126, 340, 168, { size: 6 }));
  parts.push(lab(14, 232, 'The egg always carries X; the sperm carries X or Y, so the father’s gamete decides the sex.', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(470, 245, 'Sex determination in humans: the mother (44 + XX) makes eggs that all carry 22 + X; the father (44 + XY) makes two kinds of sperm, 22 + X and 22 + Y in equal numbers. An X sperm with an egg gives a girl (44 + XX); a Y sperm gives a boy (44 + XY); each has a chance of one half', parts.join(''));
})();

// 4. Haemophilia: carrier mother x normal father (named and lettered versions)
function haemo(lettered) {
  const parts = [];
  const cellX = (x, y, gt, text, kind, letter) => {
    const fill = kind === 'aff' ? 'var(--diagram-red)' : kind === 'car' ? 'var(--diagram-yellow)' : 'var(--diagram-fill)';
    parts.push(S.rect(x, y, 104, 50, { fill, fop: kind === 'normal' ? 1 : 0.3, sw: 1 }));
    parts.push(S.text(x + 52, y + 22, gt, { a: 'middle', size: 13, w: 'bold' }));
    parts.push(S.text(x + 52, y + 40, lettered ? letter : text, { a: 'middle', size: lettered && letter.length === 1 ? 13 : 10, w: lettered && letter.length === 1 ? 'bold' : undefined }));
  };
  parts.push(S.text(250, 18, lettered ? 'A cross for an X-linked disorder' : 'Haemophilia: carrier mother × normal father', { a: 'middle', size: 12, w: 'bold' }));
  parts.push(S.text(70, 46, lettered ? 'A: mother' : 'Mother (carrier)', { a: 'middle', size: 11 }), S.text(70, 62, 'XᴴXʰ', { a: 'middle', size: 13, w: 'bold' }));
  parts.push(S.text(420, 46, lettered ? 'B: father' : 'Father (normal)', { a: 'middle', size: 11 }), S.text(420, 62, 'XᴴY', { a: 'middle', size: 13, w: 'bold' }));
  parts.push(S.text(190, 92, 'Xᴴ', { a: 'middle', size: 12, w: 'bold' }), S.text(300, 92, 'Y', { a: 'middle', size: 12, w: 'bold' }));
  parts.push(S.text(126, 128, 'Xᴴ', { a: 'end', size: 12, w: 'bold' }), S.text(126, 178, 'Xʰ', { a: 'end', size: 12, w: 'bold' }));
  cellX(138, 102, 'XᴴXᴴ', 'normal daughter', 'normal', 'normal daughter');
  cellX(248, 102, 'XᴴY', 'normal son', 'normal', 'E');
  cellX(138, 152, 'XᴴXʰ', 'carrier daughter', 'car', 'C');
  cellX(248, 152, 'XʰY', 'haemophilic son', 'aff', 'D');
  parts.push(lab(370, 130, lettered ? 'Xʰ: allele of the' : 'Xʰ carries the faulty', { size: 10 }), lab(370, 144, lettered ? 'disorder' : 'clotting allele', { size: 10 }));
  parts.push(lab(20, 228, lettered ? 'Letters A–E mark the parents and three of the children.' : 'Each child: 1/4 normal daughter, 1/4 carrier daughter, 1/4 normal son, 1/4 haemophilic son.', { size: 10, c: 'var(--diagram-muted)' }));
  const label = lettered
    ? 'A Punnett square for an X-linked recessive disorder. A is the mother, XH Xh; B is the father, XH Y. Their children: a daughter XH XH (unlettered), C a daughter XH Xh, D a son Xh Y, E a son XH Y'
    : 'Punnett square for haemophilia: carrier mother XH Xh and normal father XH Y. Children: normal daughter XH XH, carrier daughter XH Xh, normal son XH Y and haemophilic son Xh Y, each with a chance of one quarter';
  return svgDoc(500, 240, label, parts.join(''));
}
export const HAEMO_SVG = haemo(false);
export const HAEMO_LETTERED = haemo(true);

// 5. Mendel's monohybrid experiment as generations
export const MENDEL = (() => {
  const parts = [];
  const flower = (x, y, violet, t) => {
    for (let k = 0; k < 5; k++) {
      const a = (k * 2 * Math.PI) / 5 - Math.PI / 2;
      parts.push(S.circle(x + 11 * Math.cos(a), y + 11 * Math.sin(a), 8, { fill: violet ? 'var(--diagram-blue)' : 'var(--diagram-fill)', fop: violet ? 0.45 : 1, sw: 1 }));
    }
    parts.push(S.circle(x, y, 5, { fill: 'var(--diagram-yellow)', fop: 0.8, sw: 0.8 }));
    parts.push(S.text(x, y + 36, t, { a: 'middle', size: 11 }));
  };
  parts.push(lab(10, 46, 'P', { w: 'bold', size: 13 }), lab(10, 136, 'F1', { w: 'bold', size: 13 }), lab(10, 226, 'F2', { w: 'bold', size: 13 }));
  flower(120, 40, true, 'Violet VV'); parts.push(S.text(210, 44, '×', { a: 'middle', size: 18 })); flower(300, 40, false, 'White vv');
  parts.push(S.arrow(210, 84, 210, 112, { size: 6 }));
  flower(210, 130, true, 'All violet Vv'); parts.push(lab(260, 134, '(selfed)', { c: 'var(--diagram-muted)' }));
  parts.push(S.arrow(210, 174, 210, 202, { size: 6 }));
  flower(110, 220, true, 'VV'); flower(190, 220, true, 'Vv'); flower(270, 220, true, 'Vv'); flower(350, 220, false, 'vv');
  parts.push(lab(110, 280, `3 violet : 1 white   (1 VV : 2 Vv : 1 vv)`, { w: 'bold' }));
  return svgDoc(440, 295, 'Mendel-style monohybrid cross. Parents: violet-flowered VV crossed with white-flowered vv. F1: all violet, Vv. F1 plants are self-pollinated. F2: VV violet, Vv violet, Vv violet and vv white, three violet to one white; genotypes one VV to two Vv to one vv', parts.join(''));
})();
