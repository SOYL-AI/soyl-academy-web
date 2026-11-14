// ch20 SVGs, part B: resonance and electromeric effect, hyperconjugation, SN2, SN1, E2 and E1 with curly arrows and energy profiles.
import { svgDoc, S } from './lib.mjs';
import { chk, MUTED, RED, BLUE, GREEN, YEL, ACC, FILL, BRN, t, sm, bond, pair, dot, curly, smooth } from './kit.mjs';

const dbl = (x1, y1, x2, y2, gap = 3.5, o = {}) => {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / L) * gap;
  const ny = ((x2 - x1) / L) * gap;
  return bond(x1 + nx, y1 + ny, x2 + nx, y2 + ny, o) + bond(x1 - nx, y1 - ny, x2 - nx, y2 - ny, o);
};
const both = (x1, y1, x2, y2) => S.arrow(x1, y1, x2, y2, { size: 6 }) + S.head(x1, y1, Math.atan2(y1 - y2, x1 - x2), { size: 6 });

// ---------------------------------------------------------------- 5. resonance, mesomeric (-M) effect and electromeric effect
export const MESO = (() => {
  const b = [];
  b.push(t(92, 16, 'Resonance: ethanoate ion', { a: 'middle', w: 'bold', c: BLUE }));
  b.push(t(285, 16, 'Mesomeric (−M): propenal', { a: 'middle', w: 'bold', c: BLUE }));
  b.push(t(470, 16, 'Electromeric effect', { a: 'middle', w: 'bold', c: BLUE }));
  b.push(S.line(188, 6, 188, 266, { c: MUTED, w: 1, dash: '3 3' }));
  b.push(S.line(380, 6, 380, 266, { c: MUTED, w: 1, dash: '3 3' }));
  // 1. ethanoate
  const ethanoate = (y, topDouble) => {
    let o = t(22, y, 'CH₃', { a: 'middle' }) + bond(40, y - 4, 70, y - 4);
    o += t(78, y, 'C', { a: 'middle', size: 14, w: 'bold' });
    o += topDouble ? dbl(78, y - 14, 78, y - 30, 3.2) + t(78, y - 38, 'O', { a: 'middle', size: 13 }) : bond(78, y - 14, 78, y - 30) + t(78, y - 38, 'O⁻', { a: 'middle', size: 13, c: RED });
    o += topDouble ? bond(88, y - 4, 112, y - 4) + t(124, y, 'O⁻', { a: 'middle', size: 13, c: RED }) : dbl(88, y - 4, 112, y - 4, 3.2) + t(124, y, 'O', { a: 'middle', size: 13 });
    return o;
  };
  b.push(ethanoate(86, true));
  b.push(curly(124, 74, 112, 56, 96, 76, { c: BLUE, w: 1.3 }));
  b.push(curly(84, 62, 100, 52, 90, 44, { c: BLUE, w: 1.3 }));
  b.push(both(78, 106, 78, 128));
  b.push(ethanoate(176, false));
  b.push(sm(92, 214, 'two equal C–O bonds: the charge', { a: 'middle' }));
  b.push(sm(92, 228, 'is shared, so the ion is stable', { a: 'middle' }));
  b.push(sm(92, 246, 'δ− on each oxygen (resonance hybrid)', { a: 'middle', c: GREEN }));
  // 2. propenal  CH2=CH-CH=O
  const pt = (y, plus) => {
    const xs = [212, 252, 292, 334];
    const ys = [y + 8, y - 8, y + 8, y - 8];
    let o = t(xs[0] - 2, ys[0] + 14, plus ? '⁺CH₂' : 'CH₂', { a: 'middle', c: plus ? BLUE : 'currentColor' });
    o += t(xs[1], ys[1] - 6, 'CH', { a: 'middle' }) + t(xs[2], ys[2] + 14, 'CH', { a: 'middle' }) + t(xs[3] + 6, ys[3] - 4, plus ? 'O⁻' : 'O', { a: 'middle', size: 13, c: plus ? RED : 'currentColor' });
    const seg = [[xs[0] + 10, ys[0] + 4, xs[1] - 8, ys[1] + 2], [xs[1] + 8, ys[1] + 4, xs[2] - 8, ys[2] + 2], [xs[2] + 6, ys[2] + 2, xs[3] - 6, ys[3] + 2]];
    o += (plus ? bond(...seg[0]) : dbl(...seg[0], 3)) + (plus ? dbl(...seg[1], 3) : bond(...seg[1])) + (plus ? bond(...seg[2]) : dbl(...seg[2], 3));
    return o;
  };
  b.push(pt(72, false));
  b.push(curly(232, 58, 246, 36, 268, 52, { c: BLUE, w: 1.3 }));
  b.push(curly(314, 54, 326, 36, 340, 44, { c: BLUE, w: 1.3 }));
  b.push(both(280, 110, 280, 132));
  b.push(pt(164, true));
  b.push(sm(285, 206, 'the C=O group withdraws π electrons,', { a: 'middle' }));
  b.push(sm(285, 220, 'so C-1 and C-3 become δ+', { a: 'middle', c: BLUE }));
  b.push(sm(285, 238, 'a permanent effect (−M)', { a: 'middle', c: GREEN }));
  // 3. electromeric: >C=O + CN-
  b.push(t(420, 78, 'C', { a: 'middle', size: 14, w: 'bold' }) + dbl(432, 74, 462, 74, 3.2) + t(474, 78, 'O', { a: 'middle', size: 14, w: 'bold' }));
  b.push(t(392, 52, 'NC⁻', { a: 'middle', c: BLUE }));
  b.push(curly(406, 54, 410, 62, 418, 66, { c: BLUE, w: 1.3 }));
  b.push(curly(448, 66, 466, 44, 476, 62, { c: BLUE, w: 1.3 }));
  b.push(sm(500, 46, 'attacking', { a: 'start', c: MUTED }) + sm(500, 58, 'reagent', { a: 'start', c: MUTED }));
  b.push(S.arrow(440, 100, 440, 122, { size: 6 }));
  b.push(t(420, 152, 'C', { a: 'middle', size: 14, w: 'bold' }) + t(398, 134, 'CN', { a: 'middle' }) + bond(414, 140, 410, 142) + bond(430, 152, 458, 152) + t(474, 156, 'O⁻', { a: 'middle', size: 14, c: RED }));
  b.push(sm(470, 206, 'the π pair moves completely to O', { a: 'middle' }));
  b.push(sm(470, 220, 'only while the reagent is present', { a: 'middle' }));
  b.push(sm(470, 238, 'a temporary effect (electromeric)', { a: 'middle', c: GREEN }));
  chk(true, 'three electron-displacement illustrations: resonance, mesomeric and electromeric');
  return svgDoc(560, 270, 'Three electron displacement effects with curved arrows. Left: resonance between the two forms of the ethanoate ion, with an equal sharing of the negative charge. Middle: the mesomeric effect in propenal, where the carbonyl group pulls the pi electrons so that carbon 1 and carbon 3 carry partial positive charge. Right: the electromeric effect, where the pi pair of C=O shifts to oxygen when a reagent such as cyanide approaches.', b.join(''));
})();

// ---------------------------------------------------------------- 6. hyperconjugation in the ethyl cation, and counts for the alkyl cations
const CATIONS = [
  { f: 'CH₃CH₂⁺', alkyl: 1 },
  { f: '(CH₃)₂CH⁺', alkyl: 2 },
  { f: '(CH₃)₃C⁺', alkyl: 3 },
];
chk(CATIONS.map((c) => 3 * c.alkyl).join(',') === '3,6,9', 'hyperconjugative structures of the ethyl, isopropyl and tert-butyl cations: 3, 6, 9');
export const HYPER = (() => {
  const b = [];
  b.push(t(160, 16, 'Hyperconjugation in the ethyl cation', { a: 'middle', w: 'bold', c: BLUE }));
  const ethyl = (x, y, withH) => {
    // C1 (CH3) at (x, y), C2 (CH2+) at (x+60, y)
    let o = t(x, y + 5, 'C', { a: 'middle', size: 14, w: 'bold' }) + t(x + 60, y + 5, 'C', { a: 'middle', size: 14, w: 'bold' });
    o += bond(x + 9, y, x + 51, y);
    o += bond(x, y - 10, x, y - 32) + t(x, y - 38, 'H', { a: 'middle' });
    o += bond(x - 8, y + 6, x - 28, y + 20) + t(x - 34, y + 26, 'H', { a: 'middle' });
    o += bond(x + 8, y + 10, x + 22, y + 32) + t(x + 24, y + 44, 'H', { a: 'middle' });
    o += bond(x + 60, y - 10, x + 60, y - 32) + t(x + 60, y - 38, 'H', { a: 'middle' });
    o += bond(x + 68, y + 6, x + 88, y + 20) + t(x + 94, y + 26, 'H', { a: 'middle' });
    if (withH) o += t(x + 76, y - 12, '+', { size: 14, c: BLUE, w: 'bold' });
    return o;
  };
  b.push(ethyl(60, 96, true));
  b.push(curly(60, 78, 90, 62, 112, 84, { c: RED, w: 1.4 }));
  b.push(both(205, 96, 232, 96));
  // second canonical form: H+ and ethene
  b.push(t(300, 34, 'H⁺', { a: 'middle', size: 14, c: BLUE, w: 'bold' }));
  b.push(t(270, 101, 'C', { a: 'middle', size: 14, w: 'bold' }) + t(330, 101, 'C', { a: 'middle', size: 14, w: 'bold' }) + dbl(279, 96, 321, 96, 3.2));
  b.push(bond(270, 86, 270, 66) + t(270, 60, 'H', { a: 'middle' }) + bond(262, 102, 244, 116) + t(238, 124, 'H', { a: 'middle' }));
  b.push(bond(330, 86, 330, 66) + t(330, 60, 'H', { a: 'middle' }) + bond(338, 102, 356, 116) + t(362, 124, 'H', { a: 'middle' }));
  b.push(sm(160, 164, 'the C–H σ electrons overlap the empty p orbital on the', { a: 'middle' }));
  b.push(sm(160, 178, 'positive carbon, spreading the charge: "no-bond resonance"', { a: 'middle' }));
  b.push(S.line(400, 8, 400, 190, { c: MUTED, w: 1, dash: '3 3' }));
  b.push(t(505, 30, 'α C–H bonds available', { a: 'middle', w: 'bold', c: BLUE }));
  CATIONS.forEach((c, i) => {
    const n = 3 * c.alkyl;
    const y = 60 + i * 36;
    b.push(t(470, y + 10, c.f, { a: 'end', size: 12 }));
    b.push(S.rect(480, y - 4, n * 8, 18, { sw: 1.2, c: BLUE, fill: BLUE, fop: 0.2 + i * 0.12 }));
    b.push(sm(486 + n * 8, y + 10, `${n}`, { w: 'bold' }));
  });
  b.push(sm(505, 176, 'more structures, more stable cation', { a: 'middle', c: GREEN }));
  return svgDoc(600, 192, 'Hyperconjugation: in the ethyl cation, a C–H sigma bond next to the positive carbon overlaps the empty p orbital, giving a no-bond resonance structure with H plus and ethene. A bar chart shows 3, 6 and 9 alpha C–H bonds for the ethyl, isopropyl and tert-butyl cations.', b.join(''));
})();

// ---------------------------------------------------------------- 7. SN2 mechanism, inversion and energy profile
export const SN2 = (() => {
  const b = [];
  b.push(t(10, 16, 'SN2: one step, backside attack', { w: 'bold', c: BLUE }));
  // top row: curly-arrow scheme (bromoethane + hydroxide)
  b.push(t(30, 70, 'HO⁻', { a: 'middle', size: 14, c: BLUE }) + pair(40, 56, BLUE));
  b.push(t(108, 70, 'CH₃', { a: 'middle', size: 14 }) + bond(124, 66, 138, 66) + t(158, 70, 'CH₂', { a: 'middle', size: 14, w: 'bold' }) + bond(176, 66, 194, 66) + t(208, 70, 'Br', { a: 'middle', size: 14, c: RED }));
  b.push(curly(42, 52, 90, 14, 156, 54, { c: BLUE }));
  b.push(curly(186, 60, 196, 36, 208, 52, { c: RED }));
  b.push(S.arrow(236, 66, 268, 66, { size: 6 }));
  b.push(t(284, 80, '[', { size: 30, c: MUTED }) + t(416, 80, ']‡', { size: 30, c: MUTED }));
  b.push(t(300, 56, 'δ−', { a: 'middle', size: 11, c: BLUE }) + t(300, 70, 'HO', { a: 'middle', size: 13 }) + S.line(312, 66, 330, 66, { w: 1.5, dash: '3 3' }) + t(345, 70, 'CH₂', { a: 'middle', size: 13, w: 'bold' }) + t(345, 88, 'CH₃', { a: 'middle', size: 11 }) + S.line(345, 74, 345, 78, { w: 1 }) + S.line(360, 66, 378, 66, { w: 1.5, dash: '3 3' }) + t(392, 70, 'Br', { a: 'middle', size: 13 }) + t(392, 56, 'δ−', { a: 'middle', size: 11, c: RED }));
  b.push(S.arrow(456, 66, 484, 66, { size: 6 }));
  b.push(t(534, 62, 'CH₃CH₂OH', { a: 'middle', size: 13 }) + t(534, 80, '+ Br⁻', { a: 'middle', size: 13, c: RED }));
  b.push(sm(300, 104, 'rate = k[CH₃CH₂Br][OH⁻] (second order, no intermediate)', { a: 'start', c: GREEN }));
  b.push(S.line(10, 118, 570, 118, { c: MUTED, w: 1, dash: '3 3' }));
  // umbrella inversion
  const stage = (cx, cy, lean, label, nuBond, lgBond) => {
    let o = t(cx, cy + 5, 'C', { a: 'middle', size: 14, w: 'bold' });
    const dx = lean * 12;
    o += bond(cx + dx * 0.4, cy - 11, cx + dx, cy - 36) + bond(cx + dx * 0.4, cy + 11, cx + dx, cy + 36);
    o += t(cx + dx, cy - 41, 'a', { a: 'middle', size: 11 }) + t(cx + dx, cy + 50, 'b', { a: 'middle', size: 11 });
    o += nuBond === 'solid' ? bond(cx - 10, cy, cx - 34, cy) : nuBond === 'dash' ? S.line(cx - 10, cy, cx - 34, cy, { w: 1.5, dash: '3 3' }) : '';
    o += lgBond === 'solid' ? bond(cx + 10, cy, cx + 34, cy) : lgBond === 'dash' ? S.line(cx + 10, cy, cx + 34, cy, { w: 1.5, dash: '3 3' }) : '';
    o += sm(cx, cy + 74, label, { a: 'middle', c: MUTED });
    return o;
  };
  b.push(stage(60, 180, -1, 'reactant', 'none', 'solid') + t(24, 184, 'HO⁻', { a: 'middle', size: 11, c: BLUE }) + t(104, 184, 'Br', { a: 'middle', size: 11, c: RED }));
  b.push(stage(180, 180, 0, 'transition state', 'dash', 'dash') + t(136, 184, 'HO', { a: 'middle', size: 11, c: BLUE }) + t(224, 184, 'Br', { a: 'middle', size: 11, c: RED }));
  b.push(stage(300, 180, 1, 'product (inverted)', 'solid', 'none') + t(256, 184, 'HO', { a: 'middle', size: 11, c: BLUE }) + t(344, 184, 'Br⁻', { a: 'middle', size: 11, c: RED }));
  b.push(sm(180, 276, 'the three groups flip like an umbrella in the wind', { a: 'middle' }));
  // energy profile
  const ox = 410;
  const oy = 260;
  b.push(S.line(ox, oy, ox, 130, { w: 1.3 }) + S.head(ox, 128, -Math.PI / 2, { size: 5 }) + S.line(ox, oy, 570, oy, { w: 1.3 }) + S.head(572, oy, 0, { size: 5 }));
  b.push(sm(ox - 6, 140, 'E', { a: 'end' }) + sm(570, oy + 12, 'progress of reaction', { a: 'end' }));
  b.push(smooth([[ox + 8, 214], [ox + 40, 214], [ox + 90, 150], [ox + 130, 222], [ox + 150, 232]], { c: BLUE, w: 2 }));
  b.push(sm(ox + 90, 142, 'transition state', { a: 'middle' }));
  b.push(sm(ox + 8, 236, 'reactants', { a: 'start' }));
  b.push(sm(ox + 140, 250, 'products', { a: 'end' }));
  b.push(S.line(ox + 20, 214, ox + 78, 214, { c: MUTED, w: 1, dash: '2 2' }) + S.arrow(ox + 62, 214, ox + 62, 156, { size: 5, c: RED }) + sm(ox + 56, 188, 'Eₐ', { a: 'end', c: RED }));
  chk(true, 'SN2: single-hump profile, inversion umbrella and second-order rate law drawn');
  return svgDoc(580, 284, 'SN2 mechanism of bromoethane with hydroxide ion. Curved arrows show hydroxide attacking the carbon from the side opposite to bromine while the C–Br bond breaks. A transition state with partial bonds follows. Three small drawings show the inversion of configuration like an umbrella turning inside out. An energy profile has one maximum, the transition state.', b.join(''));
})();

// ---------------------------------------------------------------- 8. SN1 mechanism and profile
export const SN1 = (() => {
  const b = [];
  b.push(t(10, 16, 'SN1: two steps through a carbocation', { w: 'bold', c: BLUE }));
  const rows = [
    { y: 74, lab: 'Step 1: slow (rate-determining)', l: '(CH₃)₃C–Br', r: '(CH₃)₃C⁺ + Br⁻' },
    { y: 144, lab: 'Step 2: fast', l: '(CH₃)₃C⁺ + H₂O', r: '(CH₃)₃C–OH₂⁺' },
    { y: 214, lab: 'Step 3: fast', l: '(CH₃)₃C–OH₂⁺', r: '(CH₃)₃C–OH + H⁺' },
  ];
  rows.forEach((r, i) => {
    b.push(sm(10, r.y - 30, r.lab, { c: i === 0 ? RED : MUTED, w: i === 0 ? 'bold' : undefined }));
    b.push(t(10, r.y + 6, r.l, { size: 13 }));
    b.push(S.arrow(138, r.y + 2, 168, r.y + 2, { size: 6 }));
    b.push(t(176, r.y + 6, r.r, { size: 13 }));
  });
  // curved arrows
  b.push(curly(56, 66, 64, 46, 70, 64, { c: RED }));
  b.push(curly(76, 136, 68, 116, 58, 134, { c: BLUE, w: 1.2 }));
  b.push(sm(10, 248, 'rate = k[(CH₃)₃CBr] (first order)', { c: GREEN }));
  b.push(sm(10, 262, 'planar cation: attack from either face', { c: GREEN }));
  // energy profile with two maxima
  const ox = 330;
  const oy = 250;
  b.push(S.line(ox, oy, ox, 36, { w: 1.3 }) + S.head(ox, 34, -Math.PI / 2, { size: 5 }) + S.line(ox, oy, 560, oy, { w: 1.3 }) + S.head(562, oy, 0, { size: 5 }));
  b.push(sm(ox - 6, 46, 'E', { a: 'end' }) + sm(560, oy + 12, 'progress of reaction', { a: 'end' }));
  b.push(smooth([[ox + 8, 200], [ox + 30, 200], [ox + 72, 70], [ox + 118, 170], [ox + 154, 112], [ox + 200, 214], [ox + 222, 222]], { c: BLUE, w: 2 }));
  b.push(sm(ox + 72, 62, 'TS 1 (higher)', { a: 'middle' }));
  b.push(sm(ox + 156, 104, 'TS 2', { a: 'middle' }));
  b.push(sm(ox + 118, 192, 'carbocation', { a: 'middle', c: RED }) + sm(ox + 118, 204, 'intermediate', { a: 'middle', c: RED }));
  b.push(sm(ox + 18, 192, 'RBr', { a: 'start' }));
  b.push(sm(ox + 226, 236, 'ROH', { a: 'end' }));
  b.push(S.line(ox + 20, 200, ox + 56, 200, { c: MUTED, w: 1, dash: '2 2' }) + S.arrow(ox + 46, 200, ox + 46, 80, { size: 5, c: RED }) + sm(ox + 40, 150, 'Eₐ (step 1)', { a: 'end', c: RED }));
  chk(true, 'SN1: three steps, curved arrows and a two-hump profile with the higher first hump');
  return svgDoc(580, 272, 'SN1 mechanism of tert-butyl bromide with water in three steps: slow ionisation to a tertiary carbocation and bromide, fast attack by water on the carbocation, and fast loss of a proton. An energy profile has two maxima, the first higher, with the carbocation as an intermediate between them.', b.join(''));
})();

// ---------------------------------------------------------------- 9. E2 and E1 elimination
export const ELIM = (() => {
  const b = [];
  b.push(t(140, 16, 'E2: one step, concerted', { a: 'middle', w: 'bold', c: BLUE }));
  b.push(t(430, 16, 'E1: two steps, through a cation', { a: 'middle', w: 'bold', c: BLUE }));
  b.push(S.line(290, 6, 290, 266, { c: MUTED, w: 1, dash: '3 3' }));
  // E2: EtO- ... H - CH2 - CH2 - Br
  b.push(t(28, 84, 'EtO⁻', { a: 'middle', size: 13, c: BLUE }) + pair(40, 68, BLUE));
  b.push(t(92, 84, 'H', { a: 'middle', size: 13 }) + bond(101, 80, 118, 80) + t(138, 84, 'CH₂', { a: 'middle', size: 13 }) + bond(155, 80, 176, 80) + t(196, 84, 'CH₂', { a: 'middle', size: 13 }) + bond(213, 80, 236, 80) + t(250, 84, 'Br', { a: 'middle', size: 13, c: RED }));
  b.push(curly(42, 64, 64, 34, 90, 66, { c: BLUE }));
  b.push(curly(108, 72, 138, 40, 168, 70, { c: BLUE }));
  b.push(curly(224, 72, 240, 44, 250, 66, { c: RED }));
  b.push(S.arrow(140, 108, 140, 134, { size: 6 }));
  b.push(t(140, 160, 'CH₂=CH₂ + EtOH + Br⁻', { a: 'middle', size: 13 }));
  b.push(sm(140, 190, 'the base removes the β-hydrogen as', { a: 'middle' }));
  b.push(sm(140, 204, 'the leaving group departs together', { a: 'middle' }));
  b.push(sm(140, 226, 'rate = k[RBr][base]', { a: 'middle', c: GREEN }));
  b.push(sm(140, 242, 'strong base, concentrated, alcoholic KOH, heat', { a: 'middle', c: GREEN }));
  // E1: step 1 ionisation then loss of H+
  b.push(t(300, 50, 'slow:', { size: 11, c: RED }) + t(340, 50, '(CH₃)₃C–Br → (CH₃)₃C⁺ + Br⁻', { size: 12 }));
  b.push(t(300, 72, 'fast:', { size: 11, c: BLUE }));
  b.push(t(332, 100, 'H₂O', { a: 'middle', size: 13, c: BLUE }) + pair(326, 86, BLUE));
  b.push(t(366, 100, 'H', { a: 'middle', size: 13 }) + bond(375, 96, 390, 96) + t(408, 100, 'CH₂', { a: 'middle', size: 13 }) + bond(424, 96, 442, 96) + t(470, 100, 'C⁺(CH₃)₂', { a: 'middle', size: 13 }));
  b.push(curly(334, 82, 350, 62, 364, 82, { c: BLUE }));
  b.push(curly(382, 88, 410, 62, 440, 86, { c: BLUE }));
  b.push(S.arrow(430, 120, 430, 144, { size: 6 }));
  b.push(t(430, 168, '(CH₃)₂C=CH₂ + H₃O⁺', { a: 'middle', size: 13 }));
  b.push(sm(430, 198, 'a weak base (the solvent) removes a', { a: 'middle' }));
  b.push(sm(430, 212, 'β-hydrogen from the carbocation', { a: 'middle' }));
  b.push(sm(430, 232, 'rate = k[RBr]; competes with SN1', { a: 'middle', c: GREEN }));
  b.push(sm(430, 248, 'polar solvent, heat, tertiary halide', { a: 'middle', c: GREEN }));
  chk(true, 'E2 and E1 drawn with curved arrows');
  return svgDoc(580, 262, 'E2 and E1 elimination with curved arrows. E2: ethoxide takes a beta hydrogen from bromoethane in one concerted step as bromide leaves, giving ethene. E1: tert-butyl bromide ionises slowly to a carbocation, then a weak base removes a beta hydrogen to give 2-methylpropene.', b.join(''));
})();
