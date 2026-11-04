// SVG diagrams for ISC 11 Biology ch13 Photosynthesis in Higher Plants. Curves, counts and cycle numbers come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { chlA, chlB, carot, sumAbs, ENG, CARB3, eq, calvin, argmax } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const box = (cx, cy, w, h, t, c = 'var(--diagram-fill)', o = {}) => S.rect(cx - w / 2, cy - h / 2, w, h, { rx: 4, fill: c, fop: o.fop ?? 0.5, sw: 1.2 }) + S.text(cx, cy + 4, t, { a: 'middle', size: o.size ?? 10 });

// ---------------------------------------------------------------- 1. Chloroplast (labelled and lettered)
function chloro(letters) {
  const stack = (x, y, n) => Array.from({ length: n }, (_, i) => S.rect(x, y + i * 9, 40, 6, { rx: 3, fill: 'var(--diagram-green)', fop: 0.55, sw: 1 })).join('');
  const label = (y, name, letter, tx, ty) => (letters ? tag(350, y - 4, letter) + S.lead(341, y - 4, tx, ty) : lab(338, y, name) + S.lead(336, y - 4, tx, ty));
  return [
    S.ellipse(165, 125, 150, 95, { fill: 'var(--diagram-green)', fop: 0.1, sw: 2.5 }),
    S.ellipse(165, 125, 141, 86, { sw: 1.5 }),
    stack(70, 92, 5), stack(140, 66, 4), stack(205, 108, 5), stack(105, 150, 4),
    S.line(110, 112, 140, 84, { w: 1, c: 'var(--diagram-green)' }),
    S.line(180, 84, 205, 125, { w: 1, c: 'var(--diagram-green)' }),
    S.line(95, 134, 118, 150, { w: 1, c: 'var(--diagram-green)' }),
    S.line(145, 180, 205, 150, { w: 1, c: 'var(--diagram-green)' }),
    label(36, 'Outer membrane', 'A', 282, 62),
    label(70, 'Inner membrane', 'B', 304, 96),
    label(104, 'Granum', 'C', 180, 76),
    letters ? '' : label(138, 'Thylakoid', 'T', 245, 116),
    label(172, 'Stroma lamella', 'D', 192, 118),
    label(206, 'Stroma', 'E', 275, 170),
  ].join('');
}
export const CHLORO = svgDoc(
  460,
  240,
  'Chloroplast: a double membrane (outer and inner membrane) encloses the fluid stroma; inside are stacks of flattened thylakoid discs called grana, joined to each other by stroma lamellae that run through the stroma',
  chloro(false),
);
export const CHLORO_Q = svgDoc(
  460,
  240,
  'An unlabelled chloroplast with five parts marked A to E: A the outer envelope membrane, B the inner envelope membrane, C a stack of flattened discs, D the connecting lamella between two stacks, and E the fluid-filled space around the stacks',
  chloro(true),
);

// ---------------------------------------------------------------- 2. Absorption and action spectra
const SX = (nm) => 60 + ((nm - 400) * 380) / 300;
const SY = (v) => 190 - v * 140;
const curve = (f) => 'M' + Array.from({ length: 61 }, (_, i) => 400 + i * 5).map((nm) => `${SX(nm).toFixed(1)} ${SY(f(nm)).toFixed(1)}`).join(' L');
export const SPECTRA = svgDoc(
  460,
  250,
  `Schematic absorption spectra of chlorophyll a, chlorophyll b and carotenoids between 400 and 700 nanometres, and the action spectrum of photosynthesis. Chlorophyll a absorbs most in the violet-blue (peak near ${argmax(chlA)} nanometres) and red regions; chlorophyll b and carotenoids add absorption at other blue wavelengths; all absorb green weakly. The action spectrum follows the combined absorption, with peaks in blue and red`,
  [
    S.line(60, 190, 440, 190), S.line(60, 190, 60, 40),
    ...[400, 450, 500, 550, 600, 650, 700].map((nm) => S.line(SX(nm), 190, SX(nm), 195, { w: 1 }) + sm(SX(nm), 207, String(nm), { a: 'middle' })),
    sm(250, 224, 'Wavelength (nm)', { a: 'middle' }),
    sm(66, 22, 'Absorption or rate of photosynthesis (relative)'),
    S.path(curve(chlA), { c: 'var(--diagram-blue)', w: 2 }),
    S.path(curve(chlB), { c: 'var(--diagram-green)', w: 2 }),
    S.path(curve(carot), { c: 'var(--diagram-yellow)', w: 2 }),
    S.path(curve(sumAbs), { c: 'var(--diagram-red)', w: 2.5, dash: '6 3' }),
    S.line(214, 56, 236, 56, { c: 'var(--diagram-blue)', w: 2 }), sm(241, 60, 'Chlorophyll a'),
    S.line(214, 72, 236, 72, { c: 'var(--diagram-green)', w: 2 }), sm(241, 76, 'Chlorophyll b'),
    S.line(214, 88, 236, 88, { c: 'var(--diagram-yellow)', w: 2 }), sm(241, 92, 'Carotenoids'),
    S.line(214, 104, 236, 104, { c: 'var(--diagram-red)', w: 2.5, dash: '6 3' }), sm(241, 108, 'Action spectrum'),
    sm(SX(430) + 6, SY(1) - 8, 'violet-blue', { a: 'middle', c: 'var(--diagram-muted)' }),
    sm(SX(550), SY(0.12) - 22, 'green', { a: 'middle', c: 'var(--diagram-muted)' }),
    sm(SX(662), SY(0.85) - 12, 'red', { a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// ---------------------------------------------------------------- 3. Engelmann's experiment (schematic)
const dots = (n, x0, x1, y0) => {
  const per = Math.ceil(Math.sqrt(n * ((x1 - x0) / 40)));
  return Array.from({ length: n }, (_, i) => S.circle(x0 + 6 + (i % per) * ((x1 - x0 - 12) / Math.max(per - 1, 1)), y0 + Math.floor(i / per) * 9, 2.4, { fill: 'currentColor', sw: 0 })).join('');
};
const BAND = [['Violet-blue', 40, 170, 'var(--diagram-blue)'], ['Green', 170, 290, 'var(--diagram-green)'], ['Red', 290, 420, 'var(--diagram-red)']];
const nDots = ENG.map(([, n]) => Math.round(n / 4));
export const ENGELMANN = svgDoc(
  460,
  240,
  `Engelmann's experiment: a prism splits light into a spectrum that falls on a filament of the green alga Cladophora lying in a drop of water with aerobic bacteria. The bacteria crowd (about ${nDots[0]} and ${nDots[2]} symbols) at the violet-blue and red regions, where the alga gives off most oxygen, and are few (${nDots[1]}) at the green region. This showed that photosynthesis is greatest in blue and red light`,
  [
    ...BAND.map(([n, a, b, c]) => S.rect(a, 36, b - a, 22, { fill: c, fop: 0.35, sw: 1 }) + sm((a + b) / 2, 52, n, { a: 'middle' })),
    lab(40, 26, 'Spectrum from a prism falls on the algal filament', { w: 'bold' }),
    ...Array.from({ length: 29 }, (_, i) => S.rect(40 + i * 13, 82, 13, 14, { rx: 4, fill: 'var(--diagram-green)', fop: 0.5, sw: 1 })),
    lab(40, 114, 'Cladophora filament', { c: 'var(--diagram-green)' }),
    dots(nDots[0], 40, 170, 130), dots(nDots[1], 170, 290, 130), dots(nDots[2], 290, 420, 130),
    ...BAND.map(([, a, b], i) => sm((a + b) / 2, 196, `${ENG[i][1]} bacteria`, { a: 'middle', c: 'var(--diagram-muted)' })),
    sm(230, 216, 'Dots = aerobic bacteria (one dot stands for about four); schematic', { a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// ---------------------------------------------------------------- 4. Z-scheme
const Z = { p680: [50, 205], p680x: [50, 62], pheo: [112, 74], pq: [162, 98], b6f: [212, 124], pc: [258, 152], p700: [304, 178], p700x: [304, 44], a0: [346, 56], fd: [384, 82], nr: [415, 116] };
const HW = { b6f: 27, nr: 27 };
const chain = (ks) => ks.slice(1).map((k, i) => { const a = Z[ks[i]], b = Z[k]; const ax = a[0] + (b[0] > a[0] ? (HW[ks[i]] ?? 23) : -(HW[ks[i]] ?? 23)), bx = b[0] - (HW[k] ?? 23); return S.arrow(ax, a[1], bx, b[1], { w: 1.5, size: 6 }); });
const zb = (k, t, w = 46) => box(Z[k][0], Z[k][1], w, 18, t, 'var(--diagram-fill)', { size: 10 });
export const ZSCHEME = svgDoc(
  460,
  262,
  'The Z-scheme of non-cyclic photophosphorylation drawn against energy level. Light excites photosystem II (P680) and its electrons pass down a chain of pheophytin, plastoquinone, the cytochrome b6-f complex and plastocyanin to photosystem I (P700), releasing energy that makes ATP; water splitting replaces the lost electrons and releases oxygen. Light then excites P700; electrons pass to ferredoxin and NADP reductase to form NADPH. A dashed loop from ferredoxin back to the cytochrome complex shows the cyclic pathway',
  [
    S.arrow(14, 240, 14, 28, { w: 1.5 }), sm(22, 26, 'Higher energy'), sm(22, 258, 'Lower energy'),
    S.arrow(50, 192, 50, 76, { c: 'var(--diagram-yellow)', w: 3 }), sm(58, 134, 'Light', { c: 'var(--diagram-yellow)' }),
    S.arrow(304, 166, 304, 58, { c: 'var(--diagram-yellow)', w: 3 }), sm(312, 112, 'Light', { c: 'var(--diagram-yellow)' }),
    zb('p680', 'P680'), zb('p680x', 'P680*'), zb('pheo', 'Pheo'), zb('pq', 'PQ'), zb('b6f', 'Cyt b6-f', 54), zb('pc', 'PC'), zb('p700', 'P700'), zb('p700x', 'P700*'), zb('a0', 'A0'), zb('fd', 'Fd'), zb('nr', 'NADP red.', 54),
    ...chain(['p680x', 'pheo', 'pq', 'b6f', 'pc', 'p700']),
    ...chain(['p700x', 'a0', 'fd', 'nr']),
    S.arrow(Z.nr[0], Z.nr[1] + 10, Z.nr[0], 158, { w: 1.5, size: 6 }), lab(Z.nr[0], 172, 'NADPH', { a: 'middle', w: 'bold' }),
    S.path(`M${Z.fd[0]} ${Z.fd[1] + 10} L${Z.fd[0]} 214 L${Z.b6f[0]} 214 L${Z.b6f[0]} ${Z.b6f[1] + 12}`, { c: 'var(--diagram-red)', w: 1.5, dash: '5 3' }),
    S.head(Z.b6f[0], Z.b6f[1] + 10, -Math.PI / 2, { size: 6, c: 'var(--diagram-red)' }),
    sm(222, 207, 'Cyclic: electrons return to b6-f', { c: 'var(--diagram-red)' }),
    sm(Z.b6f[0] - 8, Z.b6f[1] + 28, 'ATP made', { c: 'var(--diagram-accent)', a: 'end' }),
    S.arrow(50, 240, 50, 216, { w: 1.5, size: 6 }), sm(58, 238, 'Water splits: oxygen, H+ and electrons'),
  ].join(''),
);

// ---------------------------------------------------------------- 5. Chemiosmosis in the thylakoid membrane
export const CHEMIO = svgDoc(
  460,
  262,
  'Chemiosmosis across the thylakoid membrane: splitting of water at photosystem II and the carrying of protons by plastoquinone through the cytochrome b6-f complex pump protons into the lumen; NADP reductase on the stroma side removes protons while making NADPH. The proton gradient, high in the lumen and low in the stroma, drives protons out through the CF0 channel of ATP synthase, and the CF1 knob in the stroma makes ATP from ADP and phosphate',
  [
    S.rect(20, 30, 420, 80, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 0 }),
    S.rect(20, 130, 420, 100, { fill: 'var(--diagram-green)', fop: 0.1, sw: 0 }),
    S.rect(20, 110, 420, 20, { fill: 'var(--diagram-brown)', fop: 0.25, sw: 0 }),
    S.line(20, 110, 440, 110), S.line(20, 130, 440, 130),
    lab(24, 46, 'Thylakoid lumen: many H+ (low pH)', { w: 'bold', c: 'var(--diagram-blue)' }),
    lab(24, 224, 'Stroma: few H+ (higher pH)', { w: 'bold', c: 'var(--diagram-green)' }),
    // PSII
    box(70, 120, 56, 28, 'PS II', 'var(--diagram-green)', { fop: 0.4 }),
    S.arrow(70, 104, 70, 84, { c: 'var(--diagram-red)', w: 2, size: 6 }), sm(70, 76, 'H+ from water splitting', { a: 'middle' }),
    sm(70, 62, '(water gives oxygen + H+)', { a: 'middle', c: 'var(--diagram-muted)' }),
    // cyt b6f
    box(172, 120, 64, 28, 'Cyt b6-f', 'var(--diagram-yellow)', { fop: 0.4 }),
    S.arrow(216, 150, 216, 84, { c: 'var(--diagram-red)', w: 2.5, size: 7 }), sm(222, 76, 'PQ carries H+ up', { a: 'start' }),
    // PSI + NADP reductase
    box(262, 120, 56, 28, 'PS I', 'var(--diagram-green)', { fop: 0.4 }),
    box(262, 168, 74, 20, 'NADP reductase', 'var(--diagram-fill)', { size: 10 }),
    S.arrow(262, 188, 262, 204, { w: 1.5, size: 6 }), sm(268, 214, 'NADP+ + H+ → NADPH', { c: 'currentColor' }),
    // ATP synthase
    S.rect(346, 108, 36, 24, { fill: 'var(--diagram-accent)', fop: 0.3, sw: 1.2 }), sm(364, 124, 'CF0', { a: 'middle' }),
    S.circle(364, 150, 16, { fill: 'var(--diagram-accent)', fop: 0.3, sw: 1.2 }), sm(364, 154, 'CF1', { a: 'middle' }),
    S.arrow(364, 84, 364, 106, { c: 'var(--diagram-red)', w: 2.5, size: 7 }), sm(364, 76, 'H+ flows down', { a: 'middle' }), sm(364, 64, 'the gradient', { a: 'middle' }),
    sm(386, 172, 'ADP + Pi → ATP', { a: 'start' }),
    sm(386, 154, 'ATP synthase', { a: 'start', w: 'bold' }),
  ].join(''),
);

// ---------------------------------------------------------------- 6. Calvin cycle
const reduce = CARB3.pga;
const regen = CARB3.rubpOut;
eq(reduce + regen, calvin(3).atp, 'ATP in three turns');
export const CALVIN_SVG = svgDoc(
  460,
  280,
  `The Calvin cycle drawn for three turns. Carboxylation: ${CARB3.rubpIn} RuBP (five carbon) combine with ${CARB3.rubpIn} carbon dioxide under RuBisCO to give ${CARB3.pga} PGA (three carbon). Reduction: the ${CARB3.pga} PGA use ${reduce} ATP and ${reduce} NADPH to form ${CARB3.pga} G3P, of which ${CARB3.g3pExit} leaves to make sugar. Regeneration: the remaining ${CARB3.g3pKept} G3P use ${regen} ATP to regenerate ${CARB3.rubpOut} RuBP`,
  [
    box(90, 206, 120, 40, `${CARB3.rubpIn} RuBP (5 C)`, 'var(--diagram-yellow)', { fop: 0.3, size: 11 }),
    box(230, 50, 120, 40, `${CARB3.pga} PGA (3 C)`, 'var(--diagram-blue)', { fop: 0.25, size: 11 }),
    box(370, 206, 120, 40, `${CARB3.pga} G3P (3 C)`, 'var(--diagram-green)', { fop: 0.3, size: 11 }),
    S.arrow(110, 184, 196, 74, { w: 2 }),
    sm(10, 134, '1. Carboxylation', { w: 'bold' }), sm(10, 148, `+ ${CARB3.rubpIn} CO₂ (RuBisCO)`),
    S.arrow(266, 74, 352, 184, { w: 2 }),
    sm(340, 108, '2. Reduction', { w: 'bold' }), sm(318, 122, `uses ${reduce} ATP and ${reduce} NADPH`),
    S.arrow(310, 226, 150, 226, { w: 2 }),
    sm(200, 252, '3. Regeneration', { w: 'bold', a: 'middle' }), sm(200, 266, `${CARB3.g3pKept} G3P kept; uses ${regen} ATP`, { a: 'middle' }),
    S.arrow(396, 230, 396, 268, { w: 2, c: 'var(--diagram-accent)' }), sm(404, 254, `${CARB3.g3pExit} G3P out`, { c: 'var(--diagram-accent)' }),
    sm(404, 266, 'to sugar', { c: 'var(--diagram-accent)' }),
    sm(230, 14, 'Every turn fixes one CO₂; three turns give one G3P', { a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// ---------------------------------------------------------------- 7. C4 pathway (two cell types)
export const C4_SVG = svgDoc(
  460,
  270,
  'The C4 pathway across two cell types. In a mesophyll cell, PEP carboxylase fixes carbon dioxide on to PEP (three carbon) to give oxaloacetate (four carbon), which becomes malate. Malate moves through plasmodesmata into a bundle sheath cell, where it releases carbon dioxide and pyruvate. The released carbon dioxide enters the Calvin cycle under RuBisCO; pyruvate returns to the mesophyll cell, where PEP is regenerated using ATP',
  [
    S.rect(14, 30, 190, 226, { rx: 16, fill: 'var(--diagram-green)', fop: 0.12, sw: 1.5 }),
    S.rect(256, 30, 190, 226, { rx: 16, fill: 'var(--diagram-yellow)', fop: 0.15, sw: 1.5 }),
    lab(109, 24, 'Mesophyll cell', { a: 'middle', w: 'bold' }), lab(351, 24, 'Bundle sheath cell', { a: 'middle', w: 'bold' }),
    sm(109, 46, 'CO₂ from air', { a: 'middle' }),
    S.arrow(109, 50, 109, 66, { w: 1.5, size: 6 }),
    box(109, 84, 100, 22, 'PEP (3 C)', 'var(--diagram-fill)'),
    S.arrow(109, 95, 109, 122, { w: 1.5, size: 6 }), sm(114, 114, 'PEP carboxylase', { size: 10 }),
    box(109, 134, 100, 22, 'OAA (4 C)', 'var(--diagram-fill)'),
    S.arrow(109, 145, 109, 168, { w: 1.5, size: 6 }),
    box(109, 180, 100, 22, 'Malate (4 C)', 'var(--diagram-fill)'),
    S.arrow(160, 180, 300, 180, { w: 2, c: 'var(--diagram-accent)' }), sm(230, 174, 'malate', { a: 'middle', c: 'var(--diagram-accent)' }),
    box(351, 180, 100, 22, 'Malate (4 C)', 'var(--diagram-fill)'),
    S.arrow(351, 191, 351, 214, { w: 1.5, size: 6 }),
    box(351, 226, 124, 22, 'Pyruvate (3 C) + CO₂', 'var(--diagram-fill)'),
    S.arrow(289, 226, 171, 226, { w: 2, c: 'var(--diagram-accent)' }), sm(230, 240, 'pyruvate', { a: 'middle', c: 'var(--diagram-accent)' }),
    box(109, 226, 124, 22, 'Pyruvate → PEP (ATP)', 'var(--diagram-fill)'),
    S.line(413, 226, 424, 226, { w: 1.5, c: 'var(--diagram-red)' }) + S.line(424, 226, 424, 100, { w: 1.5, c: 'var(--diagram-red)' }) + S.arrow(424, 100, 407, 100, { w: 1.5, c: 'var(--diagram-red)', size: 6 }),
    sm(420, 150, 'CO₂ released', { c: 'var(--diagram-red)', a: 'end' }),
    box(351, 100, 110, 36, 'Calvin cycle (RuBisCO)', 'var(--diagram-blue)', { fop: 0.25 }),
    S.arrow(351, 82, 351, 64, { w: 1.5, size: 6 }), sm(358, 62, 'Sugar', { a: 'start' }),
  ].join(''),
);

// ---------------------------------------------------------------- 8. Kranz anatomy (transverse section of a C4 leaf, schematic)
const kranz = (cx, cy) => {
  const out = [];
  out.push(S.circle(cx, cy, 52, { fill: 'var(--diagram-yellow)', fop: 0.22, sw: 2 }));
  out.push(S.circle(cx, cy, 22, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.5 }));
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    out.push(S.ellipse(cx + 38 * Math.cos(a), cy + 38 * Math.sin(a), 6, 4, { fill: 'var(--diagram-green)', fop: 0.8, sw: 0 }));
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.26;
    out.push(S.ellipse(cx + 80 * Math.cos(a), cy + 80 * Math.sin(a), 22, 17, { fill: 'var(--diagram-green)', fop: 0.14, sw: 1.2 }));
    out.push(S.circle(cx + 80 * Math.cos(a), cy + 80 * Math.sin(a), 3, { fill: 'var(--diagram-green)', fop: 0.9, sw: 0 }));
  }
  return out.join('');
};
export const KRANZ = svgDoc(
  460,
  240,
  'Kranz anatomy of a C4 leaf in transverse section: a central vascular bundle is surrounded by a ring of large bundle sheath cells packed with chloroplasts, like a wreath; outside the ring lie smaller mesophyll cells. Carbon dioxide is first fixed in the mesophyll and the Calvin cycle runs in the bundle sheath',
  [
    kranz(130, 120),
    lab(300, 52, 'Mesophyll cell', { w: 'bold' }), S.lead(296, 49, 205, 66),
    lab(300, 100, 'Bundle sheath cell', { w: 'bold' }), sm(300, 113, '(large chloroplasts)'), S.lead(296, 98, 164, 106),
    lab(300, 150, 'Vascular bundle', { w: 'bold' }), sm(300, 163, '(xylem and phloem)'), S.lead(296, 148, 140, 124),
    lab(300, 205, 'Wreath (Kranz) of cells', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { CHLORO, CHLORO_Q, SPECTRA, ENGELMANN, ZSCHEME, CHEMIO, CALVIN_SVG, C4_SVG, KRANZ };
