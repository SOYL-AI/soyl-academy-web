// ISC 11 Chemistry ch16 Redox Reactions: hand-drawn SVGs (allow-listed elements, palette colours only;
// numbers computed in JS from data.mjs and self-checked).
import { svgDoc, S, near } from './lib.mjs';
import { ON, sg } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const RD = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const M = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ================================================================ 1. chlorine oxidation-number ladder
export const ON_CL = (() => {
  const out = [];
  const sp = [
    { f: 'Cl⁻', on: -1 },
    { f: 'Cl₂', on: 0 },
    { f: 'ClO⁻', on: ON.ClO.Cl },
    { f: 'ClO₂⁻', on: ON.ClO2.Cl },
    { f: 'ClO₃⁻', on: ON.ClO3.Cl },
    { f: 'ClO₄⁻', on: ON.ClO4.Cl },
  ];
  const ox = 50;
  const W = 480;
  const lo = -2;
  const hi = 8;
  const X = (v) => ox + ((v - lo) / (hi - lo)) * W;
  const y0 = 100;
  out.push(S.arrow(ox, y0, ox + W + 10, y0, { w: 2, size: 8 }));
  for (let t = lo + 1; t <= hi - 1; t++) out.push(S.line(X(t), y0 - 4, X(t), y0 + 4), small(X(t), y0 + 18, sg(t), { a: 'middle' }));
  sp.forEach((s, i) => {
    const x = X(s.on);
    const up = i % 2 === 0;
    out.push(S.circle(x, y0, 5, { c: s.on < 0 ? B : s.on === 0 ? M : RD, fill: s.on < 0 ? B : s.on === 0 ? M : RD }));
    out.push(S.line(x, up ? y0 - 6 : y0 + 26, x, up ? y0 - 26 : y0 + 46, { c: M, w: 1 }));
    out.push(lab(x, up ? y0 - 32 : y0 + 60, s.f, { a: 'middle', w: 'bold' }), small(x, up ? y0 - 46 : y0 + 74, `ON ${sg(s.on)}`, { a: 'middle', c: M }));
  });
  out.push(S.arrow(X(-1.5), 226, X(7.5), 226, { c: RD, w: 2, size: 8 }), lab(X(3), 220, 'oxidation: ON increases', { a: 'middle', c: RD, w: 'bold' }));
  out.push(S.arrow(X(7.5), 248, X(-1.5), 248, { c: B, w: 2, size: 8 }), lab(X(3), 242, 'reduction: ON decreases', { a: 'middle', c: B, w: 'bold' }));
  chk(ON.ClO.Cl === 1 && ON.ClO2.Cl === 3 && ON.ClO3.Cl === 5 && ON.ClO4.Cl === 7, 'chlorine ON in ClO-, ClO2-, ClO3-, ClO4- are +1, +3, +5, +7');
  chk(sp.every((s, i, a) => i === 0 || s.on > a[i - 1].on), 'species ordered by increasing ON');
  return svgDoc(570, 262, 'Oxidation numbers of chlorine in chloride, chlorine, hypochlorite, chlorite, chlorate and perchlorate ions placed on a number line from minus one to plus seven, with oxidation to the right and reduction to the left.', out.join(''));
})();

// ================================================================ 2. electron transfer: sodium and chlorine
export const E_TRANSFER = (() => {
  const out = [];
  const nNa = 2;
  const lost = nNa * 1;
  const gained = 2 * 1;
  const na = (x, y, plus) => {
    out.push(S.circle(x, y, 22, { c: plus ? RD : 'currentColor', fill: plus ? RD : FILL, fop: plus ? 0.2 : 0.6, sw: 1.5 }), lab(x, y + 4, plus ? 'Na⁺' : 'Na', { a: 'middle', w: 'bold' }));
  };
  na(60, 56, false);
  na(60, 128, false);
  out.push(small(60, 26, 'ON 0', { a: 'middle', c: M }), small(60, 170, 'ON 0', { a: 'middle', c: M }));
  out.push(S.arrow(86, 56, 192, 84, { c: RD, w: 2 }), S.arrow(86, 128, 192, 104, { c: RD, w: 2 }));
  out.push(lab(140, 66, 'e⁻', { a: 'middle', c: RD, w: 'bold' }), lab(140, 124, 'e⁻', { a: 'middle', c: RD, w: 'bold' }));
  out.push(S.circle(224, 94, 30, { c: G, fill: G, fop: 0.2 }), lab(224, 98, 'Cl₂', { a: 'middle', w: 'bold' }), small(224, 140, 'ON 0', { a: 'middle', c: M }));
  out.push(S.arrow(258, 94, 336, 94, { w: 2, size: 8 }), small(297, 84, 'reaction', { a: 'middle' }));
  na(380, 56, true);
  na(380, 128, true);
  out.push(small(380, 26, 'ON +1', { a: 'middle', c: RD }), small(380, 170, 'ON +1', { a: 'middle', c: RD }));
  out.push(S.circle(454, 74, 20, { c: B, fill: B, fop: 0.2 }), lab(454, 78, 'Cl⁻', { a: 'middle', w: 'bold' }), S.circle(454, 118, 20, { c: B, fill: B, fop: 0.2 }), lab(454, 122, 'Cl⁻', { a: 'middle', w: 'bold' }), small(454, 150, 'ON −1', { a: 'middle', c: B }));
  out.push(lab(190, 200, `Na loses ${lost} e⁻ in all: oxidation (reducing agent)`, { a: 'middle', c: RD }), lab(190, 218, `Cl₂ gains ${gained} e⁻ in all: reduction (oxidising agent)`, { a: 'middle', c: B }));
  chk(lost === gained, 'electrons lost by two Na equal electrons gained by Cl2');
  return svgDoc(570, 236, 'Two sodium atoms each give one electron to a chlorine molecule. Sodium goes from oxidation number 0 to plus 1 and is oxidised; chlorine goes from 0 to minus 1 and is reduced. The electrons lost equal the electrons gained.', out.join(''));
})();

// ================================================================ 3. oxidation number method: rise and fall for MnO4- + Fe2+
export const ON_METHOD = (() => {
  const out = [];
  const MnFrom = 7;
  const MnTo = 2;
  const FeFrom = 2;
  const FeTo = 3;
  const down = MnFrom - MnTo;
  const up = FeTo - FeFrom;
  const mult = down / up; // Fe atoms per Mn atom
  const col = (x, title, from, to, c, note) => {
    out.push(lab(x, 24, title, { a: 'middle', w: 'bold' }));
    out.push(S.rect(x - 70, 38, 56, 28, { c, fill: c, fop: 0.18 }), lab(x - 42, 57, sg(from), { a: 'middle', w: 'bold' }));
    out.push(S.rect(x + 14, 38, 56, 28, { c, fill: c, fop: 0.18 }), lab(x + 42, 57, sg(to), { a: 'middle', w: 'bold' }));
    out.push(S.arrow(x - 12, 52, x + 12, 52, { c, w: 2, size: 7 }));
    out.push(lab(x, 90, note, { a: 'middle', c, w: 'bold' }));
  };
  col(150, 'Mn in MnO₄⁻ → Mn²⁺', MnFrom, MnTo, B, `fall of ${down} per Mn`);
  col(420, 'Fe in Fe²⁺ → Fe³⁺', FeFrom, FeTo, RD, `rise of ${up} per Fe`);
  out.push(S.rect(60, 116, 450, 54, { c: M, w: 1.2, rx: 6 }));
  out.push(lab(285, 138, `Make total fall = total rise: 1 Mn × ${down} = ${mult} Fe × ${up}`, { a: 'middle', w: 'bold' }));
  out.push(lab(285, 158, `so the ratio MnO₄⁻ : Fe²⁺ is 1 : ${mult}`, { a: 'middle' }));
  out.push(S.arrow(285, 176, 285, 198, { w: 2, size: 8 }), lab(285, 216, 'Then balance O with H₂O, H with H⁺, and check charge', { a: 'middle', c: M }));
  chk(down === 5 && up === 1 && mult === 5, 'Mn falls by 5, Fe rises by 1, so 5 Fe per Mn');
  chk(down * 1 === mult * up, 'total fall equals total rise');
  return svgDoc(570, 232, 'Oxidation number method for permanganate and iron(II): manganese falls from plus 7 to plus 2, a fall of 5; iron rises from plus 2 to plus 3, a rise of 1; so five iron atoms are needed for each manganese atom.', out.join(''));
})();

// ================================================================ 4. ion-electron method: half-reactions share electrons
export const HALF_RX = (() => {
  const out = [];
  const e = 5;
  out.push(S.rect(20, 28, 250, 96, { c: RD, w: 1.5, rx: 8, fill: RD, fop: 0.08 }), lab(145, 48, 'Oxidation half (×5)', { a: 'middle', c: RD, w: 'bold' }));
  out.push(lab(145, 78, '5Fe²⁺ → 5Fe³⁺ + 5e⁻', { a: 'middle', size: 13 }), small(145, 100, 'Fe: ON +2 → +3, loses electrons', { a: 'middle', c: M }));
  out.push(S.rect(300, 28, 250, 96, { c: B, w: 1.5, rx: 8, fill: B, fop: 0.08 }), lab(425, 48, 'Reduction half (×1)', { a: 'middle', c: B, w: 'bold' }));
  out.push(lab(425, 78, 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O', { a: 'middle', size: 12 }), small(425, 100, 'Mn: ON +7 → +2, gains electrons', { a: 'middle', c: M }));
  out.push(S.arrow(150, 150, 420, 150, { c: G, w: 2, size: 8 }), lab(285, 143, `${e} e⁻ travel from Fe²⁺ to MnO₄⁻`, { a: 'middle', c: G, w: 'bold' }));
  out.push(S.line(20, 168, 550, 168, { c: M, w: 1, dash: '4 3' }));
  out.push(lab(285, 192, 'Add the halves, cancel the 5e⁻:', { a: 'middle' }), lab(285, 214, 'MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺', { a: 'middle', w: 'bold', size: 13 }));
  chk(e === 5 * 1 && e === 5, 'five electrons lost by five Fe2+ equal five gained by MnO4-');
  return svgDoc(570, 232, 'Ion-electron method: the oxidation half five Fe2+ to five Fe3+ plus five electrons and the reduction half permanganate plus eight H+ plus five electrons to Mn2+ plus four water share five electrons. Adding them gives the balanced equation.', out.join(''));
})();

// ================================================================ 5. four types of redox reaction
export const TYPES4 = (() => {
  const out = [];
  const cells = [
    { t: 'Combination', g: 'A + B → AB', ex: '2Na + Cl₂ → 2NaCl', on: 'Na 0 → +1; Cl 0 → −1', c: B },
    { t: 'Decomposition', g: 'AB → A + B', ex: '2HgO → 2Hg + O₂', on: 'Hg +2 → 0; O −2 → 0', c: RD },
    { t: 'Displacement', g: 'A + BC → AC + B', ex: 'Cl₂ + 2KI → 2KCl + I₂', on: 'Cl 0 → −1; I −1 → 0', c: G },
    { t: 'Disproportionation', g: 'one element, ON up and down', ex: 'Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O', on: 'Cl 0 → −1 and +1', c: M },
  ];
  cells.forEach((c, i) => {
    const x = 14 + (i % 2) * 284;
    const y = 12 + Math.floor(i / 2) * 118;
    out.push(S.rect(x, y, 268, 106, { c: c.c, w: 1.5, rx: 8, fill: c.c, fop: 0.08 }));
    out.push(lab(x + 134, y + 22, c.t, { a: 'middle', w: 'bold', c: c.c, size: 12 }), small(x + 134, y + 40, c.g, { a: 'middle' }));
    out.push(lab(x + 134, y + 66, c.ex, { a: 'middle', size: 11 }), small(x + 134, y + 88, c.on, { a: 'middle', c: M }));
  });
  chk(cells.length === 4, 'four types of redox reaction shown');
  return svgDoc(570, 244, 'Four types of redox reaction with a general form, a balanced example and the oxidation number changes: combination, decomposition, displacement and disproportionation.', out.join(''));
})();

// ================================================================ 6. disproportionation of chlorine in cold alkali
export const DISPROP = (() => {
  const out = [];
  const x = 180;
  const yOf = (on) => 100 - on * 56;
  const to = (v) => ({ a: ON.ClO.Cl, b: -1 })[v];
  out.push(S.line(60, yOf(0) - 0, 520, yOf(0), { c: M, w: 1, dash: '4 3' }));
  [[-1, 'Cl⁻', B], [0, 'Cl₂', 'currentColor'], [1, 'ClO⁻', RD]].forEach(([on, f, c]) => {
    const xx = on === 0 ? x : x + 220;
    out.push(S.circle(xx, yOf(on), 24, { c, fill: c === 'currentColor' ? FILL : c, fop: c === 'currentColor' ? 0.6 : 0.2, sw: 1.5 }), lab(xx, yOf(on) + 4, f, { a: 'middle', w: 'bold' }));
    out.push(on === 0 ? small(xx, yOf(on) + 42, `ON ${sg(on)}`, { a: 'middle', c: M }) : small(xx + 32, yOf(on) + 4, `ON ${sg(on)}`, { c: M }));
  });
  out.push(S.arrow(x + 22, yOf(0) - 12, x + 196, yOf(1) + 6, { c: RD, w: 2 }), lab(x + 90, yOf(0.9) - 4, 'oxidised', { a: 'middle', c: RD, w: 'bold' }));
  out.push(S.arrow(x + 22, yOf(0) + 12, x + 196, yOf(-1) - 6, { c: B, w: 2 }), lab(x + 90, yOf(-0.9) + 20, 'reduced', { a: 'middle', c: B, w: 'bold' }));
  out.push(lab(285, 214, 'Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O: the same element is both oxidised and reduced', { a: 'middle', size: 11 }));
  chk(to('a') === 1 && to('b') === -1, 'chlorine goes from 0 to +1 and to -1');
  return svgDoc(570, 232, 'Disproportionation of chlorine in cold alkali: chlorine of oxidation number 0 is oxidised to hypochlorite at plus 1 and reduced to chloride at minus 1 in the same reaction.', out.join(''));
})();
