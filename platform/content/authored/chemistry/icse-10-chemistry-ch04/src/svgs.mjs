// Hand-drawn SVG schematics for ICSE 10 Chemistry ch04 Analytical Chemistry (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

/** A test tube of width w with its mouth at (x, top) and straight walls down to `bottom`, round end below. */
function tube(x, top, bottom, w, { liquid = null, liquidTop = null, ppt = null, pptTop = null, speckle = false, lop = 0.22 } = {}) {
  const mid = x + w / 2;
  const round = bottom + w * 0.55;
  const out = [];
  if (liquid) out.push(S.path(`M ${x + 2} ${liquidTop} L ${x + 2} ${bottom} Q ${mid} ${round - 3} ${x + w - 2} ${bottom} L ${x + w - 2} ${liquidTop} Z`, { c: 'none', w: 0, fill: liquid, fop: lop }));
  if (ppt) out.push(S.path(`M ${x + 2} ${pptTop} L ${x + 2} ${bottom} Q ${mid} ${round - 3} ${x + w - 2} ${bottom} L ${x + w - 2} ${pptTop} Z`, { c: 'none', w: 0, fill: ppt, fop: 0.65 }));
  if (speckle) {
    for (const [dx, dy] of [[8, 6], [18, 12], [30, 7], [12, 20], [26, 22], [20, 30], [34, 16]]) if (x + dx < x + w - 3) out.push(S.circle(x + dx, pptTop + dy, 2.2, { sw: 1 }));
  }
  if (liquidTop !== null) out.push(S.line(x + 2, liquidTop, x + w - 2, liquidTop, { w: 1, c: 'var(--diagram-muted)' }));
  out.push(S.path(`M ${x} ${top} L ${x} ${bottom} Q ${mid} ${round} ${x + w} ${bottom} L ${x + w} ${top}`, { w: 1.6 }));
  out.push(S.line(x - 4, top, x + w + 4, top, { w: 1.6 }));
  return out.join('');
}

// 1. A few drops of sodium hydroxide added to five salt solutions: colour of each precipitate, and what excess alkali does.
const NAOH_ROW = [
  { ion: 'Fe²⁺', sol: 'var(--diagram-green)', ppt: 'var(--diagram-green)', name: ['dirty green', 'Fe(OH)₂'], excess: 'stays' },
  { ion: 'Fe³⁺', sol: 'var(--diagram-yellow)', ppt: 'var(--diagram-brown)', name: ['reddish brown', 'Fe(OH)₃'], excess: 'stays' },
  { ion: 'Cu²⁺', sol: 'var(--diagram-blue)', ppt: 'var(--diagram-blue)', name: ['pale blue', 'Cu(OH)₂'], excess: 'stays' },
  { ion: 'Zn²⁺', sol: null, ppt: null, name: ['white, gelatinous', 'Zn(OH)₂'], excess: 'dissolves' },
  { ion: 'Pb²⁺', sol: null, ppt: null, name: ['white, chalky', 'Pb(OH)₂'], excess: 'dissolves' },
];
export const NAOH_TUBES = svgDoc(
  560,
  330,
  'Five test tubes, each holding a salt solution to which a few drops of sodium hydroxide solution have been added. Iron two ions, in a pale green solution, give a dirty green precipitate of iron(II) hydroxide. Iron three ions, in a yellowish-brown solution, give a reddish-brown precipitate of iron(III) hydroxide. Copper two ions, in a blue solution, give a pale blue precipitate of copper(II) hydroxide. Zinc ions give a white gelatinous precipitate and lead ions a white chalky precipitate, both from colourless solutions. A row underneath shows that with excess sodium hydroxide the first three precipitates stay, while the zinc and lead hydroxides dissolve.',
  [
    lab(280, 22, 'A few drops of sodium hydroxide solution added', { a: 'middle', size: 12, w: 'bold' }),
    ...NAOH_ROW.map((t, i) => {
      const x = 40 + i * 104;
      const mid = x + 22;
      return [
        tube(x, 46, 196, 44, { liquid: t.sol ?? 'var(--diagram-muted)', liquidTop: 110, ppt: t.ppt, pptTop: 172, speckle: !t.ppt }),
        lab(mid, 252, t.ion, { a: 'middle', size: 13, w: 'bold' }),
        lab(mid, 268, t.name[0], { a: 'middle', size: 10 }),
        lab(mid, 282, t.name[1], { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
        lab(mid, 318, t.excess, { a: 'middle', size: 11, w: 'bold', c: t.excess === 'dissolves' ? 'var(--diagram-green)' : 'var(--diagram-red)' }),
      ].join('');
    }),
    S.line(20, 296, 540, 296, { w: 1, c: 'var(--diagram-muted)', dash: '4 3' }),
    lab(8, 310, 'In excess:', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Copper and zinc ions with ammonium hydroxide: a few drops, then excess.
function stageRow(top, title, stages) {
  const xs = [80, 260, 440];
  return [
    lab(16, top - 16, title, { size: 12, w: 'bold' }),
    ...stages.map((s, i) => tube(xs[i], top, top + 110, 40, { liquid: s.liquid, liquidTop: top + 40, ppt: s.ppt, pptTop: top + 88, speckle: s.speckle, lop: s.lop })),
    ...stages.map((s, i) => S.lines(xs[i] + 20, top + 152, s.caption, { a: 'middle', size: 10, dy: 12 })),
    S.arrow(132, top + 64, 248, top + 64, { c: 'var(--diagram-accent)' }),
    S.arrow(312, top + 64, 428, top + 64, { c: 'var(--diagram-accent)' }),
    S.lines(190, top + 42, ['a few drops', 'of NH₄OH'], { a: 'middle', size: 10, dy: 12, c: 'var(--diagram-accent)' }),
    S.lines(370, top + 42, ['excess', 'NH₄OH'], { a: 'middle', size: 10, dy: 12, c: 'var(--diagram-accent)' }),
  ].join('');
}
export const NH4OH_STAGES = svgDoc(
  540,
  430,
  'Two rows of three test tubes showing ammonium hydroxide added first a little and then in excess. Top row, copper two ions: a blue solution gives a pale blue precipitate of copper(II) hydroxide, which dissolves in excess to form a deep, inky blue solution of tetraamminecopper(II) sulphate. Bottom row, zinc ions: a colourless solution gives a white gelatinous precipitate of zinc hydroxide, which dissolves in excess to form a colourless solution of tetraamminezinc(II) sulphate.',
  [
    stageRow(48, 'Copper(II) sulphate solution', [
      { liquid: 'var(--diagram-blue)', caption: ['blue', 'solution'] },
      { liquid: 'var(--diagram-blue)', ppt: 'var(--diagram-blue)', caption: ['pale blue', 'precipitate, Cu(OH)₂'] },
      { liquid: 'var(--diagram-blue)', lop: 0.6, caption: ['deep (inky) blue', 'solution'] },
    ]),
    stageRow(258, 'Zinc sulphate solution', [
      { liquid: 'var(--diagram-muted)', caption: ['colourless', 'solution'] },
      { liquid: 'var(--diagram-muted)', ppt: null, speckle: true, caption: ['white gelatinous', 'precipitate, Zn(OH)₂'] },
      { liquid: 'var(--diagram-muted)', caption: ['colourless', 'solution'] },
    ]),
  ].join(''),
);
