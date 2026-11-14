// ISC 11 Chemistry ch15 Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product: hand-drawn SVGs
// (allow-listed elements, palette colours only; geometry and data computed in JS from data.mjs and self-checked).
import { svgDoc, S, near } from './lib.mjs';
import { ACID_SET, SALTS, BUF, SOL_SET, AGCL_NACL, KSP, KA, hh, pK } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const RD = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const M = 'var(--diagram-muted)';
const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);
const expo = (x) => {
  const e = Math.floor(Math.log10(x));
  const m = x / 10 ** e;
  const sup = String(e).replace('-', '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  return `${m.toFixed(1)}×10${sup}`;
};

// ================================================================ 1. common ion effect on the pH of ethanoic acid
export const CI_PH = (() => {
  const out = [];
  const ox = 70;
  const oy = 30;
  const W = 440;
  const H = 170;
  const ymax = 7;
  const Yp = (v) => oy + H - (v / ymax) * H;
  out.push(S.arrow(ox, oy + H, ox + W + 10, oy + H, { w: 1.5, size: 7 }), S.arrow(ox, oy + H, ox, oy - 12, { w: 1.5, size: 7 }));
  [0, 1, 2, 3, 4, 5, 6, 7].forEach((t) => out.push(S.line(ox - 4, Yp(t), ox, Yp(t)), small(ox - 8, Yp(t) + 4, String(t), { a: 'end' })));
  out.push(lab(ox - 40, oy - 16, 'pH', { a: 'start', w: 'bold' }));
  const bars = [
    { t: 'ethanoic acid 0.10 M', t2: 'alone', v: ACID_SET.pH0, c: RD },
    { t: '+ sodium ethanoate', t2: '0.10 M', v: ACID_SET.pH1, c: B },
    { t: '+ sodium ethanoate', t2: '0.50 M', v: ACID_SET.pH2, c: G },
  ];
  bars.forEach((b, i) => {
    const x = ox + 40 + i * 140;
    out.push(S.rect(x, Yp(b.v), 80, (b.v / ymax) * H, { c: b.c, fill: b.c, fop: 0.3, sw: 1.5 }));
    out.push(lab(x + 40, Yp(b.v) - 6, f2(b.v), { a: 'middle', w: 'bold' }));
    out.push(small(x + 40, oy + H + 16, b.t, { a: 'middle' }), small(x + 40, oy + H + 29, b.t2, { a: 'middle', c: M }));
  });
  out.push(small(ox + 252, 24, 'more common ion, lower [H⁺], higher pH', { a: 'start', c: M }));
  chk(near(ACID_SET.pH0, 2.87, 0.005), `acid alone pH ${f2(ACID_SET.pH0)} is 2.87`);
  chk(near(ACID_SET.pH1, 4.74, 0.005), `with 0.10 M salt pH ${f2(ACID_SET.pH1)} is 4.74`);
  chk(ACID_SET.pH0 < ACID_SET.pH1 && ACID_SET.pH1 < ACID_SET.pH2, 'pH rises as the common-ion salt increases');
  return svgDoc(570, 250, 'Bar chart of the pH of 0.10 molar ethanoic acid alone, with 0.10 molar and with 0.50 molar sodium ethanoate added: the pH rises from about 2.9 to 4.7 to 5.4 because the common ion suppresses ionisation.', out.join(''));
})();

// ================================================================ 2. pH scale with the salt solutions
export const PH_SCALE = (() => {
  const out = [];
  const ox = 40;
  const W = 500;
  const y0 = 108;
  const X = (v) => ox + (v / 14) * W;
  out.push(S.rect(ox, y0 - 12, X(7) - ox, 24, { c: RD, fill: RD, fop: 0.15, sw: 0.5 }), S.rect(X(7), y0 - 12, ox + W - X(7), 24, { c: B, fill: B, fop: 0.15, sw: 0.5 }));
  for (let t = 0; t <= 14; t += 1) out.push(S.line(X(t), y0 + 12, X(t), y0 + 18), small(X(t), y0 + 31, String(t), { a: 'middle' }));
  out.push(lab(X(3.5), y0 + 4, 'acidic', { a: 'middle', c: RD, w: 'bold' }), lab(X(10.5), y0 + 4, 'basic', { a: 'middle', c: B, w: 'bold' }));
  out.push(lab(ox, y0 + 50, 'pH at 298 K', { a: 'start', c: M }));
  const marks = [
    { v: SALTS[0].pH, t: 'NH₄Cl 0.10 M', k: 'strong acid, weak base', up: true, c: RD },
    { v: SALTS[1].pH, t: 'NaCl, CH₃COONH₄', k: 'neutral (WA-WB, Ka = Kb)', up: false, c: M },
    { v: SALTS[2].pH, t: 'CH₃COONa 0.10 M', k: 'weak acid, strong base', up: true, c: B },
    { v: SALTS[4].pH, t: 'NH₄CN', k: 'Ka(HCN) < Kb(NH₃)', up: false, c: B },
  ];
  marks.forEach((m) => {
    const x = X(m.v);
    const yy = m.up ? y0 - 12 : y0 + 36;
    const yt = m.up ? y0 - 52 : y0 + 74;
    out.push(S.line(x, yy, x, m.up ? yt + 6 : yt - 14, { c: m.c, w: 1.5 }), S.circle(x, y0, 4, { c: m.c, fill: m.c }));
    out.push(lab(x, m.up ? yt - 8 : yt + 2, m.t, { a: 'middle', c: m.c, w: 'bold' }), small(x, m.up ? yt + 4 : yt + 15, `pH ${f2(m.v)}`, { a: 'middle' }));
  });
  chk(near(SALTS[0].pH, 5.13, 0.003), `NH4Cl 0.10 M pH ${f2(SALTS[0].pH)} is 5.13`);
  chk(near(SALTS[2].pH, 8.87, 0.003), `CH3COONa 0.10 M pH ${f2(SALTS[2].pH)} is 8.87`);
  chk(near(SALTS[3].pH, 7.0, 0.001), 'ammonium ethanoate (Ka = Kb) is neutral');
  chk(SALTS[4].pH > 7 && SALTS[0].pH < 7, 'NH4CN basic, NH4Cl acidic');
  return svgDoc(570, 210, 'A pH scale from 0 to 14 marking ammonium chloride at about 5.1, sodium chloride and ammonium ethanoate at 7, sodium ethanoate at about 8.9 and ammonium cyanide at about 9.3.', out.join(''));
})();

// ================================================================ 3. buffer curve: pH against the fraction of acid converted to salt
export const BUFFER_CURVE = (() => {
  const out = [];
  const ox = 70;
  const oy = 30;
  const W = 420;
  const H = 180;
  const pLo = BUF.pKa - 2;
  const pHi = BUF.pKa + 2;
  const X = (f) => ox + f * W;
  const Yp = (p) => oy + H - ((p - pLo) / (pHi - pLo)) * H;
  // buffer region f in [1/11, 10/11]
  const fa = 1 / 11;
  const fb = 10 / 11;
  out.push(S.rect(X(fa), Yp(BUF.pKa + 1), X(fb) - X(fa), Yp(BUF.pKa - 1) - Yp(BUF.pKa + 1), { c: G, fill: G, fop: 0.15, sw: 0.5 }));
  out.push(S.arrow(ox, oy + H, ox + W + 12, oy + H, { w: 1.5, size: 7 }), S.arrow(ox, oy + H, ox, oy - 12, { w: 1.5, size: 7 }));
  [0, 0.25, 0.5, 0.75, 1].forEach((t) => out.push(S.line(X(t), oy + H, X(t), oy + H + 4), small(X(t), oy + H + 16, String(t), { a: 'middle' })));
  [-2, -1, 0, 1, 2].forEach((d) => out.push(S.line(ox - 4, Yp(BUF.pKa + d), ox, Yp(BUF.pKa + d)), small(ox - 7, Yp(BUF.pKa + d) + 4, f1(BUF.pKa + d), { a: 'end' })));
  out.push(lab(ox + W / 2, oy + H + 34, 'fraction of the acid present as salt, [salt]/([salt] + [acid])', { a: 'middle' }), lab(ox - 36, oy - 18, 'pH', { a: 'start', w: 'bold' }));
  const pts = [];
  for (let i = 1; i < 100; i++) {
    const f = i / 100;
    pts.push([X(f), Yp(hh(BUF.pKa, f, 1 - f))]);
  }
  out.push(S.path(`M ${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L ')}`, { c: B, w: 2.5 }));
  out.push(S.circle(X(0.5), Yp(BUF.pKa), 4, { c: RD, fill: RD }));
  out.push(lab(X(0.5) + 10, Yp(BUF.pKa) + 18, `pH = pKa = ${f2(BUF.pKa)}`, { a: 'start', c: RD }));
  out.push(lab(X(0.5), Yp(BUF.pKa + 1) - 6, 'effective buffer range: pKa ± 1', { a: 'middle', c: G, w: 'bold' }));
  chk(near(hh(BUF.pKa, 0.5, 0.5), BUF.pKa, 1e-9), 'pH = pKa at equal salt and acid');
  chk(near(hh(BUF.pKa, fb, 1 - fb), BUF.pKa + 1, 1e-9), 'ratio 10 gives pKa + 1');
  chk(near(hh(BUF.pKa, fa, 1 - fa), BUF.pKa - 1, 1e-9), 'ratio 0.1 gives pKa - 1');
  return svgDoc(570, 262, 'Henderson curve for an ethanoic acid and sodium ethanoate buffer: pH against the fraction of the acid present as salt. The curve is flattest, and the buffer most effective, around the half way point where pH equals pKa, over the range pKa minus 1 to pKa plus 1.', out.join(''));
})();

// ================================================================ 4. molar solubility of five salts from their Ksp (log scale)
export const KSP_BARS = (() => {
  const out = [];
  const ox = 150;
  const W = 330;
  const lo = -6;
  const hi = -2;
  const X = (v) => ox + ((Math.log10(v) - lo) / (hi - lo)) * W;
  const rows = [
    { n: 'AgCl (AB)', k: KSP.AgCl, s: SOL_SET.AgCl, c: B },
    { n: 'BaSO₄ (AB)', k: KSP.BaSO4, s: SOL_SET.BaSO4, c: B },
    { n: 'CaF₂ (AB₂)', k: KSP.CaF2, s: SOL_SET.CaF2, c: G },
    { n: 'Mg(OH)₂ (AB₂)', k: KSP.MgOH2, s: SOL_SET.MgOH2, c: G },
    { n: 'PbI₂ (AB₂)', k: KSP.PbI2, s: SOL_SET.PbI2, c: G },
  ];
  rows.forEach((r, i) => {
    const y = 34 + i * 34;
    out.push(lab(ox - 8, y + 14, r.n, { a: 'end', w: 'bold' }));
    out.push(S.rect(ox, y, X(r.s) - ox, 20, { c: r.c, fill: r.c, fop: 0.3, sw: 1.5 }));
    out.push(small(X(r.s) + 6, y + 10, `s = ${expo(r.s)}`, { c: 'currentColor' }), small(X(r.s) + 6, y + 21, `Ksp ${expo(r.k)}`, { c: M }));
  });
  [-6, -5, -4, -3, -2].forEach((e) => {
    const x = ox + ((e - lo) / (hi - lo)) * W;
    out.push(S.line(x, 206, x, 212), small(x, 224, `10${String(e).replace('-', '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`, { a: 'middle' }));
  });
  out.push(S.line(ox, 206, ox + W, 206), lab(ox + W / 2, 242, 'molar solubility s, mol L⁻¹ (log scale)', { a: 'middle' }));
  chk(near(SOL_SET.AgCl, 1.34e-5, 0.01), 'AgCl s 1.34e-5');
  chk(near(SOL_SET.PbI2, 1.21e-3, 0.01), 'PbI2 s 1.21e-3');
  chk(KSP.CaF2 < KSP.AgCl && SOL_SET.CaF2 > SOL_SET.AgCl, 'CaF2 has the smaller Ksp but the larger s than AgCl: AB2 and AB cannot be ranked by Ksp alone');
  return svgDoc(570, 256, 'Horizontal bars on a log scale of molar solubility for silver chloride, barium sulfate, calcium fluoride, magnesium hydroxide and lead iodide, each labelled with its Ksp. Calcium fluoride has a smaller Ksp than silver chloride but a larger solubility, because it is an AB2 salt.', out.join(''));
})();

// ================================================================ 5. common-ion lowering of the solubility of AgCl
export const AGCL_COMMON = (() => {
  const out = [];
  const ox = 70;
  const oy = 30;
  const W = 440;
  const H = 170;
  const lo = -9;
  const hi = -4;
  const Yp = (v) => oy + H - ((Math.log10(v) - lo) / (hi - lo)) * H;
  out.push(S.arrow(ox, oy + H, ox + W + 10, oy + H, { w: 1.5, size: 7 }), S.arrow(ox, oy + H, ox, oy - 12, { w: 1.5, size: 7 }));
  [-9, -8, -7, -6, -5, -4].forEach((e) => {
    const y = oy + H - ((e - lo) / (hi - lo)) * H;
    out.push(S.line(ox - 4, y, ox, y), small(ox - 7, y + 4, `10${String(e).replace('-', '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`, { a: 'end' }));
  });
  out.push(lab(ox - 52, oy - 16, 'solubility of AgCl, mol L⁻¹ (log scale)', { a: 'start', w: 'bold' }));
  AGCL_NACL.forEach((b, i) => {
    const x = ox + 25 + i * 105;
    const top = Yp(b.s);
    out.push(S.rect(x, top, 70, oy + H - top, { c: i === 0 ? B : G, fill: i === 0 ? B : G, fop: 0.3, sw: 1.5 }));
    out.push(lab(x + 35, top - 6, expo(b.s), { a: 'middle', w: 'bold' }));
    out.push(small(x + 35, oy + H + 16, i === 0 ? 'pure water' : `NaCl ${b.c} M`, { a: 'middle' }));
  });
  chk(near(AGCL_NACL[3].s, 1.8e-9, 0.005), 'AgCl in 0.1 M NaCl: 1.8e-9');
  chk(AGCL_NACL.every((b, i, a) => i === 0 || b.s < a[i - 1].s), 'solubility falls as [Cl-] rises');
  return svgDoc(570, 250, 'Bar chart on a log scale of the solubility of silver chloride in pure water and in 0.001, 0.01 and 0.1 molar sodium chloride: it falls from about 1.3 times 10 to the minus 5 to 1.8 times 10 to the minus 9 mol per litre because of the common chloride ion.', out.join(''));
})();

// ================================================================ 6. ionic product against Ksp
export const QSP_LINE = (() => {
  const out = [];
  const x0 = 50;
  const x1 = 520;
  const xm = 285;
  const y = 100;
  out.push(S.arrow(x0, y, x1, y, { w: 2.5, size: 9 }));
  out.push(S.rect(x0, y - 24, xm - x0, 24, { c: B, fill: B, fop: 0.18, sw: 0.5 }), S.rect(xm, y - 24, x1 - xm - 6, 24, { c: RD, fill: RD, fop: 0.18, sw: 0.5 }));
  out.push(S.line(xm, y - 36, xm, y + 14, { c: 'currentColor', w: 2.5 }));
  out.push(lab(xm, y + 70, 'Qsp = Ksp', { a: 'middle', w: 'bold' }), small(xm, y + 84, 'saturated: just at equilibrium', { a: 'middle', c: M }));
  out.push(lab((x0 + xm) / 2, y - 8, 'Qsp < Ksp', { a: 'middle', c: B, w: 'bold' }), lab((xm + x1) / 2, y - 8, 'Qsp > Ksp', { a: 'middle', c: RD, w: 'bold' }));
  out.push(small((x0 + xm) / 2 - 20, y + 32, 'unsaturated: no precipitate;', { a: 'middle' }), small((x0 + xm) / 2 - 20, y + 46, 'more solid can dissolve', { a: 'middle' }));
  out.push(small((xm + x1) / 2 + 20, y + 32, 'supersaturated: precipitation', { a: 'middle' }), small((xm + x1) / 2 + 20, y + 46, 'until Qsp falls to Ksp', { a: 'middle' }));
  out.push(lab(x1, y + 16, 'ionic product', { a: 'end', c: M }));
  chk(xm > x0 && xm < x1, 'Ksp marker lies between the two regions');
  return svgDoc(570, 190, 'A number line of the ionic product Qsp with the solubility product Ksp marked: below Ksp the solution is unsaturated, at Ksp it is saturated, above Ksp precipitation occurs.', out.join(''));
})();
