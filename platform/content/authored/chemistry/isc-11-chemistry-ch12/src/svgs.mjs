// ISC 11 Chemistry ch12 Entropy, Free Energy and Spontaneity: hand-drawn SVGs (allow-listed elements, palette colours only;
// geometry and data computed in JS from data.mjs and self-checked).
import { svgDoc, S } from './lib.mjs';
import { TRANS, dsTrans, RX, R, RT2303, logK, near, f0, f1, f2, sg } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const Rd = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const M = 'var(--diagram-muted)';
const BR = 'var(--diagram-brown)';
const rng = (seed) => {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
};

// ---------------------------------------------------------------- 1. Spontaneous changes: gas expansion and heat flow
export const SPONT = (() => {
  const out = [];
  const N = 14;
  const rand = rng(1112);
  // (a) before: all particles in left bulb; after: spread over both
  const bulb = (x, y, w, h) => S.rect(x, y, w, h, { rx: 10, c: 'currentColor', sw: 2 });
  const drawGas = (x, y, w, h, n, seed, xmax) => {
    const rr = rng(seed);
    const pts = [];
    for (let i = 0; i < n; i++) pts.push([x + 8 + rr() * (xmax - x - 16), y + 8 + rr() * (h - 16)]);
    return pts;
  };
  const row = (oy, spread, label) => {
    out.push(bulb(30, oy, 80, 60), bulb(130, oy, 80, 60), S.line(110, oy + 30, 130, oy + 30, { w: 3, c: M }));
    const pts = spread ? [...drawGas(30, oy, 80, 60, 7, 41, 110), ...drawGas(130, oy, 80, 60, 7, 43, 210)] : drawGas(30, oy, 80, 60, N, 45, 110);
    pts.forEach(([px, py]) => out.push(S.circle(px, py, 3, { fill: B, c: B, sw: 0.5 })));
    out.push(lab(120, oy + 78, label, { a: 'middle' }));
    return pts;
  };
  const before = row(26, false, 'before: gas in the left bulb');
  const after = row(130, true, 'after: gas in both bulbs');
  const leftOnly = before.every(([px]) => px < 110);
  const leftCount = after.filter(([px]) => px < 120).length;
  chk(leftOnly && before.length === N && after.length === N && leftCount === 7, `gas expansion: ${N} particles all left before; 7 left and 7 right after`);
  out.push(S.arrow(120, 108, 120, 124, { w: 2, c: G }));
  out.push(lab(128, 120, 'spontaneous (the tap is opened)', { c: G, w: 'bold' }));
  out.push(small(30, 258, 'The reverse never happens by itself, yet energy is conserved both ways.', { c: M }));
  // (b) heat flow
  out.push(S.rect(290, 40, 90, 70, { fill: Rd, fop: 0.35, c: Rd, sw: 2 }), S.rect(420, 40, 90, 70, { fill: B, fop: 0.3, c: B, sw: 2 }));
  out.push(lab(335, 80, '400 K', { a: 'middle', w: 'bold' }), lab(465, 80, '300 K', { a: 'middle', w: 'bold' }));
  out.push(S.arrow(384, 75, 416, 75, { c: G, w: 2.5 }), lab(400, 130, 'heat flows from hot to cold', { a: 'middle', c: G, w: 'bold' }));
  out.push(S.rect(290, 150, 90, 70, { fill: Rd, fop: 0.2, c: Rd, sw: 2, dash: '4 3' }), S.rect(420, 150, 90, 70, { fill: B, fop: 0.5, c: B, sw: 2, dash: '4 3' }));
  out.push(lab(335, 190, 'hotter', { a: 'middle' }), lab(465, 190, 'colder', { a: 'middle' }));
  out.push(S.arrow(416, 185, 384, 185, { c: Rd, w: 2.5, dash: '5 3' }), lab(400, 236, 'never without outside work', { a: 'middle', c: Rd, w: 'bold' }));
  return svgDoc(540, 266, 'Two spontaneous changes. A gas initially in the left of two connected bulbs spreads over both when the tap is opened, and it never collects in one bulb again by itself. Heat flows from a hot block at 400 kelvin to a cold block at 300 kelvin, and the reverse flow, which would also conserve energy, does not occur unaided.', out.join(''));
})();

// ---------------------------------------------------------------- 2. Entropy of water against temperature
export const ENTROPY_T = (() => {
  const dsF = dsTrans('iceFus');
  const dsV = dsTrans('waterVap');
  const S273 = 41.3; // S of ice at its melting point (J K⁻¹ mol⁻¹)
  const cpL = 75.3;
  const cpG = 33.6;
  const sIce = (T) => S273 * (T / 273.15) ** 1.5; // schematic rise from 0 K (S = 0)
  const sWat = (T) => S273 + dsF + cpL * Math.log(T / 273.15);
  const sSteam = (T) => sWat(373.15) + dsV + cpG * Math.log(T / 373.15);
  const ox = 60;
  const oy = 230;
  const X = (T) => ox + T * 0.9;
  const Yv = (s) => oy - s * 0.88;
  const pts = [];
  for (let T = 0; T <= 273.15; T += 13.6575) pts.push([T, sIce(T)]);
  pts.push([273.15, S273], [273.15, S273 + dsF]);
  for (let T = 273.15; T <= 373.15; T += 10) pts.push([T, sWat(T)]);
  pts.push([373.15, sWat(373.15)], [373.15, sWat(373.15) + dsV]);
  for (let T = 373.15; T <= 450; T += 12.8) pts.push([T, sSteam(T)]);
  chk(sIce(0) === 0, 'entropy–T: S = 0 at 0 K (third law)');
  chk(near(sWat(273.15) - S273, dsF, 1e-9) && near(sSteam(373.15) - sWat(373.15), dsV, 1e-9), `entropy–T: jumps equal ΔH/T: ${dsF.toFixed(1)} on melting and ${dsV.toFixed(1)} on boiling`);
  chk(near(sWat(298.15), 69.9, 0.01), `entropy–T: S of liquid water at 298 K = ${sWat(298.15).toFixed(1)} ≈ 69.9 J K⁻¹ mol⁻¹`);
  const out = [S.arrow(ox, oy, 500, oy, { size: 7 }), S.arrow(ox, oy, ox, 12, { size: 7 })];
  out.push(S.path('M' + pts.map(([T, s]) => `${X(T).toFixed(1)} ${Yv(s).toFixed(1)}`).join(' L'), { c: Rd, w: 3, join: 'round' }));
  [273.15, 373.15].forEach((T) => out.push(S.line(X(T), oy, X(T), Yv(sSteam(T > 300 ? 373.15 : 273.15)) + 0, { c: M, w: 0.8, dash: '3 4' }), S.line(X(T), oy, X(T), oy + 5), small(X(T), oy + 17, f0(T), { a: 'middle' })));
  out.push(S.line(ox, oy, ox, oy + 5), small(ox, oy + 17, '0', { a: 'middle' }), lab(500, oy - 8, 'T / K', { a: 'end' }));
  out.push(lab(ox + 8, 28, 'S / J K⁻¹ mol⁻¹', { size: 11 }));
  out.push(lab(X(40), Yv(60), 'ice', { w: 'bold' }), lab(X(318), Yv(52), 'water', { w: 'bold' }), lab(X(405), Yv(213), 'steam', { w: 'bold' }));
  out.push(lab(X(273.15) - 10, Yv(S273 + dsF / 2) + 4, `melting +${f1(dsF)}`, { a: 'end', c: B, w: 'bold' }));
  out.push(lab(X(373.15) + 8, Yv(sWat(373.15) + dsV / 2) + 4, `boiling +${f1(dsV)}`, { c: B, w: 'bold' }));
  out.push(small(ox + 6, 268, 'S = 0 at 0 K for a perfect crystal. Jumps = ΔH / T. Shape below 273 K is schematic.', { c: M }));
  return svgDoc(540, 280, 'Entropy of one mole of water against temperature. Entropy is zero at absolute zero for the perfect crystal, rises smoothly as ice warms, jumps by 22.0 joules per kelvin per mole on melting at 273 kelvin, rises again as the liquid warms, jumps by 109.1 on boiling at 373 kelvin, and is highest for steam.', out.join(''));
})();

// ---------------------------------------------------------------- 3. Entropy of the universe: ice melting at 283 K and 263 K
export const UNIVERSE = (() => {
  const dsSys = dsTrans('iceFus');
  const cases = [283, 263].map((T) => {
    const surr = -(TRANS.iceFus.H * 1000) / T;
    return { T, sys: dsSys, surr, tot: dsSys + surr };
  });
  chk(cases[0].tot > 0 && cases[1].tot < 0, `universe bars: total ΔS ${cases[0].tot.toFixed(2)} at 283 K (melts) and ${cases[1].tot.toFixed(2)} at 263 K (does not)`);
  const oy = 130;
  const k = 3.4; // px per J K⁻¹
  const out = [S.line(40, oy, 520, oy, { w: 1.5 })];
  out.push(lab(10, oy + 4, '0', { size: 10 }));
  cases.forEach((c, i) => {
    const x0 = 80 + i * 240;
    [['ΔS system', c.sys, B], ['ΔS surroundings', c.surr, Rd], ['ΔS total', c.tot, c.tot > 0 ? G : BR]].forEach(([n, v, col], j) => {
      const x = x0 + j * 62;
      const h = Math.abs(v) * k;
      const y = v >= 0 ? oy - h : oy;
      out.push(S.rect(x, y, 44, Math.max(h, 1.5), { fill: col, fop: 0.55, c: col, sw: 1.3 }));
      out.push(lab(x + 22, v >= 0 ? y - 5 : y + h + 13, sg(v, 1), { a: 'middle', w: 'bold', size: 11 }));
      out.push(small(x + 22, 244 + (j % 2) * 12, n, { a: 'middle' }));
    });
    out.push(lab(x0 + 90, 18, `Ice melting at ${c.T} K`, { a: 'middle', w: 'bold', c: c.tot > 0 ? G : BR }));
    out.push(small(x0 + 90, 32, c.tot > 0 ? 'ΔS total > 0: spontaneous' : 'ΔS total < 0: does not occur', { a: 'middle', c: M }));
  });
  out.push(small(10, 272, 'J K⁻¹ per mole: ΔS system = +22.0 (6010 / 273.15); ΔS surroundings = −6010 / T.', { c: M }));
  return svgDoc(540, 282, 'Bar chart of entropy changes in J per kelvin per mole for melting ice. At 283 kelvin the system gains 22.0, the surroundings lose 21.2 and the total is plus 0.8, so ice melts. At 263 kelvin the surroundings lose 22.9, the total is minus 0.8, so melting does not occur.', out.join(''));
})();

// ---------------------------------------------------------------- 4. ΔG against T for two reactions
export const GIBBS_T = (() => {
  const a = RX.N2O4;
  const b = RX.NO;
  const T0 = 200;
  const T1 = 900;
  const ox = 70;
  const oy0 = 130; // zero line
  const X = (T) => ox + ((T - T0) / (T1 - T0)) * 420;
  const Yg = (g) => oy0 - g * 1.1;
  const line = (r) => [dG(r.h, r.s, T0), dG(r.h, r.s, T1)];
  function dG(h, s, T) {
    return h - (T * s) / 1000;
  }
  chk(near(dG(a.h, a.s, a.Tc), 0, 1) || Math.abs(dG(a.h, a.s, a.Tc)) < 1e-6, `ΔG–T: N₂O₄ line crosses zero at ${a.Tc.toFixed(0)} K`);
  chk(Math.abs(dG(b.h, b.s, b.Tc)) < 1e-6 && b.Tc > 700, `ΔG–T: 2NO + O₂ line crosses zero at ${b.Tc.toFixed(0)} K`);
  const out = [S.arrow(ox, oy0, 510, oy0, { size: 7 }), S.line(ox, 10, ox, 250, { w: 1.5 })];
  [-100, -50, 0, 50].forEach((g) => out.push(S.line(ox - 4, Yg(g), ox, Yg(g)), small(ox - 8, Yg(g) + 4, String(g), { a: 'end' })));
  [300, 500, 600, 800].forEach((T) => out.push(S.line(X(T), oy0 - 3, X(T), oy0 + 3), small(X(T), oy0 + 15, String(T), { a: 'middle', c: M })));
  out.push(lab(10, 20, 'ΔG / kJ mol⁻¹'), lab(500, oy0 + 32, 'T / K', { a: 'end' }));
  const [a0, a1] = line(a);
  const [b0, b1] = line(b);
  out.push(S.line(X(T0), Yg(a0), X(T1), Yg(a1), { c: Rd, w: 2.8 }), S.line(X(T0), Yg(b0), X(T1), Yg(b1), { c: B, w: 2.8 }));
  out.push(S.circle(X(a.Tc), Yg(0), 4, { fill: Rd, c: Rd, sw: 1 }), S.circle(X(b.Tc), Yg(0), 4, { fill: B, c: B, sw: 1 }));
  out.push(lab(X(a.Tc) - 6, Yg(0) + 34, `${f0(a.Tc)} K`, { a: 'end', c: Rd, w: 'bold' }), lab(X(b.Tc) + 2, Yg(0) - 12, `${f0(b.Tc)} K`, { c: B, w: 'bold' }));
  out.push(lab(180, 36, `red: N₂O₄ → 2NO₂, ΔH ${sg(a.h)}, ΔS ${sg(a.s)}`, { c: Rd, w: 'bold' }), lab(180, 54, `blue: 2NO + O₂ → 2NO₂, ΔH ${sg(b.h)}, ΔS ${sg(b.s)}`, { c: B, w: 'bold' }));
  out.push(small(ox + 6, 262, 'ΔH in kJ mol⁻¹, ΔS in J K⁻¹ mol⁻¹. Spontaneous where the line lies below zero.', { c: M }));
  return svgDoc(540, 272, 'Gibbs energy change against temperature for two reactions. For dinitrogen tetroxide splitting into nitrogen dioxide, with positive enthalpy and entropy changes, the line falls and crosses zero at 325 kelvin, so it is spontaneous above that temperature. For nitric oxide and oxygen forming nitrogen dioxide, with negative enthalpy and entropy changes, the line rises and crosses zero at 780 kelvin, so it is spontaneous below that temperature.', out.join(''));
})();

// ---------------------------------------------------------------- 5. log K against ΔG°
export const G_LOGK = (() => {
  const T = 298;
  const k = RT2303(T);
  const ox = 290;
  const oy = 130;
  const X = (g) => ox + g * 5;
  const Yl = (l) => oy - l * 16;
  const pts = [
    { g: 27.07, label: 'ethanoic acid ionising', c: Rd },
    { g: RX.N2O4.g298, label: 'N₂O₄ → 2NO₂', c: BR },
    { g: -28.5, label: 'ΔG° = −28.5', c: G },
  ];
  chk(near(logK(0), 0, 1) || logK(0) === 0 || Math.abs(logK(0)) < 1e-12, 'log K = 0 when ΔG° = 0 (K = 1)');
  chk(near(logK(-28.5), 4.995, 0.001) && near(logK(27.07), -4.745, 0.002), `log K: ${logK(-28.5).toFixed(3)} at −28.5 kJ and ${logK(27.07).toFixed(3)} at +27.07 kJ`);
  const out = [S.arrow(ox - 220, oy, ox + 225, oy, { size: 7 }), S.line(ox, 20, ox, 240, { w: 1.5 })];
  [-6, -3, 3, 6].forEach((l) => out.push(S.line(ox - 4, Yl(l), ox, Yl(l)), small(ox - 8, Yl(l) + 4, String(l), { a: 'end' })));
  [-40, -20, 20, 40].forEach((g) => out.push(S.line(X(g), oy - 3, X(g), oy + 3), small(X(g), oy + 16, String(g), { a: 'middle' })));
  out.push(lab(ox + 6, 30, 'log K'), lab(ox + 225, oy + 30, 'ΔG° / kJ mol⁻¹', { a: 'end' }));
  out.push(S.line(X(-40), Yl(logK(-40, T)), X(40), Yl(logK(40, T)), { c: B, w: 2.6 }));
  pts.forEach((p, i) => {
    const l = logK(p.g, T);
    out.push(S.circle(X(p.g), Yl(l), 5, { fill: p.c, c: p.c, sw: 1 }));
    out.push(S.line(X(p.g), Yl(l), X(p.g), oy, { c: p.c, w: 1, dash: '3 3' }));
    const right = i !== 2;
    out.push(lab(i === 0 ? X(p.g) : X(p.g) + 10, i === 0 ? Yl(l) + 22 : i === 2 ? Yl(l) - 10 : Yl(l) - 24, `log K = ${logK(p.g, T).toFixed(2)}`, { a: i === 0 ? 'middle' : 'start', c: p.c, w: 'bold' }));
  });
  out.push(small(10, 266, 'log K = −ΔG° / (2.303 R T), with 2.303 R T = 5.706 kJ mol⁻¹ at 298 K.', { c: M }));
  out.push(small(330, 50, 'K > 1 where ΔG° < 0', { c: G }), small(330, 64, 'K < 1 where ΔG° > 0', { c: Rd }));
  out.push(small(10, 196, `green: ΔG° = −28.5 kJ, log K = ${logK(-28.5, T).toFixed(3)}, K ≈ ${(10 ** logK(-28.5, T) / 1e4).toFixed(1)} × 10⁴`, { c: G }), small(10, 210, `red: ΔG° = +27.07 kJ (ethanoic acid), K ≈ ${(10 ** logK(27.07, T) * 1e5).toFixed(1)} × 10⁻⁵`, { c: Rd }), small(10, 224, `brown: N₂O₄ → 2NO₂, ΔG° = ${sg(RX.N2O4.g298, 2)} kJ, K ≈ ${(10 ** logK(RX.N2O4.g298, T)).toFixed(2)}`, { c: BR }));
  return svgDoc(540, 272, 'Graph of log K against the standard Gibbs energy change at 298 kelvin: a straight line of negative slope through the origin. A negative standard Gibbs energy of minus 28.5 kilojoules gives log K of 4.995, a positive 27.07 for ionisation of ethanoic acid gives log K of minus 4.74, and zero gives K equal to one.', out.join(''));
})();
