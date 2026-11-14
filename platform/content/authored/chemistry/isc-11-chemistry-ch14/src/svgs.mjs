// ch14 Ionic Equilibrium — SVGs with computed geometry: strong, weak and non-electrolyte particles, Lewis acid-base adduct,
// degree of ionisation against concentration (Ostwald), pKa ladder of phosphoric acid, titration curves with indicator ranges.
import { svgDoc, S } from './lib.mjs';
import { KA, KB, PHOS, alphaExact, log10, phSASB, phWASB, phWBSA } from './data.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const path = (f, a, b, n, X, Y) => 'M' + Array.from({ length: n + 1 }, (_, i) => { const t = a + ((b - a) * i) / n; return `${X(t).toFixed(1)} ${Y(f(t)).toFixed(1)}`; }).join(' L');

// 1. Strong, weak and non-electrolyte: particles in 80 positions, with a bulb for conductivity.
export const SPECIES = (() => {
  const N = 80, cols = 10, sp = 11;
  const alpha = alphaExact(KA.acetic, 0.1);
  const ionised = Math.round(N * alpha);
  chk(ionised === 1, `species: ${ionised} of ${N} ethanoic acid molecules ionised at 0.10 mol L⁻¹ (α = ${alpha.toFixed(4)})`);
  const panels = [
    { x: 8, title: 'Strong electrolyte', note: 'HCl: all molecules ionised', ions: N },
    { x: 146, title: 'Weak electrolyte', note: 'CH₃COOH: about 1 in 75 ionised', ions: ionised * 2 },
    { x: 284, title: 'Non-electrolyte', note: 'glucose: no ions', ions: 0 },
  ];
  const body = [];
  const bulb = (cx, level) => {
    const r = 11, y = 52;
    body.push(S.circle(cx, y, r, { fill: level > 0 ? 'var(--diagram-yellow)' : 'none', fop: level === 2 ? 0.9 : 0.35, c: 'currentColor', sw: 1.5 }));
    const rays = level === 2 ? 8 : level === 1 ? 3 : 0;
    for (let i = 0; i < rays; i++) {
      const a = level === 2 ? (i * Math.PI * 2) / 8 : -Math.PI / 2 + (i - 1) * 0.7;
      body.push(S.line(cx + Math.cos(a) * (r + 3), y + Math.sin(a) * (r + 3), cx + Math.cos(a) * (r + 9), y + Math.sin(a) * (r + 9), { c: 'var(--diagram-yellow)', w: 2 }));
    }
  };
  panels.forEach((p, k) => {
    const cx = p.x + (cols * sp) / 2 + 4;
    body.push(lab(cx, 16, p.title, { a: 'middle', w: 'bold', size: 11 }));
    bulb(cx, [2, 1, 0][k]);
    body.push(S.rect(p.x, 78, cols * sp + 8, (N / cols) * sp + 8, { c: 'var(--diagram-muted)', sw: 1, rx: 4 }));
    for (let i = 0; i < N; i++) {
      const x = p.x + 8 + (i % cols) * sp, y = 86 + Math.floor(i / cols) * sp;
      let kind = 'mol';
      if (k === 0) kind = i % 2 === 0 ? 'cat' : 'an';
      if (k === 1 && i >= 38 && i < 38 + p.ions) kind = i % 2 === 0 ? 'cat' : 'an';
      const col = kind === 'cat' ? 'var(--diagram-red)' : kind === 'an' ? 'var(--diagram-blue)' : 'var(--diagram-muted)';
      body.push(S.circle(x, y, 3.6, { fill: col, c: col, sw: 1, fop: kind === 'mol' ? 0.55 : 1 }));
    }
    body.push(lab(cx, 190, p.note, { a: 'middle', size: 10 }));
  });
  chk(panels.every((p) => p.x + cols * sp + 8 <= 412), 'species: all panels inside the viewBox');
  body.push(S.circle(30, 214, 3.6, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }), lab(38, 218, 'cation (H⁺)', { size: 10 }), S.circle(120, 214, 3.6, { fill: 'var(--diagram-blue)', c: 'var(--diagram-blue)' }), lab(128, 218, 'anion', { size: 10 }), S.circle(186, 214, 3.6, { fill: 'var(--diagram-muted)', c: 'var(--diagram-muted)', fop: 0.55 }), lab(194, 218, 'molecule', { size: 10 }), lab(414, 218, 'schematic', { a: 'end', size: 10 }));
  return svgDoc(420, 228, 'Three beakers drawn as boxes of 80 particles each, with a bulb above. Strong electrolyte: every particle is an ion, so the bulb is bright. Weak electrolyte: almost all particles are molecules with one ion pair, so the bulb is dim. Non-electrolyte: only molecules, no ions, so the bulb stays dark.', body.join(''));
})();

// 2. Lewis acid-base: NH3 donates a pair to BF3.
export const LEWIS = (() => {
  const nx = 80, ny = 82, bx = 290, by = 82;
  const arrowFrom = [nx + 12, 54], arrowTo = [bx - 22, 60];
  chk(arrowFrom[0] > nx && arrowTo[0] < bx && arrowTo[0] - arrowFrom[0] > 100, 'lewis: the arrow runs from the lone pair on N to the boron atom');
  chk(Math.hypot(bx - nx, by - ny) > 150, 'lewis: the two molecules are well separated');
  return svgDoc(420, 262, 'Ammonia donates its lone pair of electrons to boron trifluoride, which has an incomplete octet. Ammonia is the Lewis base and boron trifluoride the Lewis acid. The product has a coordinate bond from nitrogen to boron.', [
    // NH3
    lab(nx, ny + 5, 'N', { a: 'middle', size: 16, w: 'bold' }),
    S.line(nx - 6, ny + 12, nx - 28, ny + 36), S.line(nx, ny + 14, nx, ny + 44), S.line(nx + 6, ny + 12, nx + 28, ny + 36),
    lab(nx - 34, ny + 50, 'H', { a: 'middle', size: 13 }), lab(nx, ny + 58, 'H', { a: 'middle', size: 13 }), lab(nx + 34, ny + 50, 'H', { a: 'middle', size: 13 }),
    S.circle(nx - 3, 54, 2.6, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }), S.circle(nx + 5, 54, 2.6, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }),
    // BF3
    lab(bx, by + 5, 'B', { a: 'middle', size: 16, w: 'bold' }),
    S.line(bx, by - 12, bx, by - 36), S.line(bx - 8, by + 10, bx - 32, by + 34), S.line(bx + 8, by + 10, bx + 32, by + 34),
    lab(bx, by - 42, 'F', { a: 'middle', size: 13 }), lab(bx - 38, by + 48, 'F', { a: 'middle', size: 13 }), lab(bx + 38, by + 48, 'F', { a: 'middle', size: 13 }),
    S.arrow(arrowFrom[0], arrowFrom[1], arrowTo[0], arrowTo[1], { c: 'var(--diagram-red)', w: 2, size: 8 }),
    lab(185, 44, 'lone pair donated', { a: 'middle', size: 10, c: 'var(--diagram-red)', w: 'bold' }),
    lab(nx, 160, 'NH₃: Lewis base', { a: 'middle', size: 11, w: 'bold' }), lab(nx, 174, '(electron-pair donor)', { a: 'middle', size: 10 }),
    lab(bx, 160, 'BF₃: Lewis acid', { a: 'middle', size: 11, w: 'bold' }), lab(bx, 174, '(electron-pair acceptor, 6 electrons on B)', { a: 'middle', size: 10 }),
    S.arrow(185, 184, 185, 204, { size: 7 }),
    lab(185 + 10, 198, 'adduct', { size: 10 }),
    lab(130, 232, 'H₃N', { a: 'middle', size: 16, w: 'bold' }),
    S.arrow(152, 227, 212, 227, { c: 'var(--diagram-red)', w: 2.5, size: 8 }),
    lab(236, 232, 'BF₃', { a: 'middle', size: 16, w: 'bold' }),
    lab(182, 254, 'coordinate bond: both electrons from nitrogen', { a: 'middle', size: 10 }),
  ].join(''));
})();

// 3. Degree of ionisation against concentration (log axis), exact quadratic.
export const OSTWALD = (() => {
  const curves = [[KA.formic, 'var(--diagram-blue)', 'methanoic acid, Ka = 1.8 × 10⁻⁴'], [KA.acetic, 'var(--diagram-red)', 'ethanoic acid, Ka = 1.8 × 10⁻⁵']];
  const ox = 50, oy = 200, w = 300, h = 160;
  const X = (lc) => ox + ((lc + 4) / 4) * w; // lc = log10 C from -4 to 0
  const Y = (a) => oy - a * h;
  for (const [K] of curves) {
    const ok = [-4, -3, -2, -1, 0].every((lc) => { const C = 10 ** lc, a = alphaExact(K, C); return Math.abs((C * a * a) / (1 - a) - K) / K < 1e-9 && a > 0 && a < 1; });
    chk(ok, `ostwald: Ka = Cα²/(1 − α) holds at five concentrations for Ka = ${K}`);
  }
  chk([-4, -3, -2, -1].every((lc, i, arr) => i === 0 || alphaExact(KA.acetic, 10 ** lc) < alphaExact(KA.acetic, 10 ** arr[i - 1])), 'ostwald: α falls as the concentration rises');
  chk(alphaExact(KA.formic, 1e-4) > alphaExact(KA.acetic, 1e-4), 'ostwald: the stronger acid has the larger α at equal concentration');
  return svgDoc(420, 262, 'Degree of ionisation against concentration for methanoic acid and ethanoic acid on a logarithmic concentration axis from 0.0001 to 1 mole per litre. Both curves fall as the concentration rises, that is, alpha increases on dilution, and the acid with the larger Ka has the larger alpha at every concentration.', [
    S.arrow(ox, oy, ox + w + 14, oy, { size: 6 }),
    S.arrow(ox, oy, ox, 24, { size: 6 }),
    lab(8, 16, 'degree of ionisation α', { size: 10 }),
    ...[0, 0.25, 0.5, 0.75, 1].map((v) => lab(ox - 6, Y(v) + 4, String(v), { a: 'end', size: 10 })),
    ...[-4, -3, -2, -1, 0].map((lc) => S.line(X(lc), oy, X(lc), oy + 5) + lab(X(lc), oy + 18, lc === 0 ? '1' : lc === -1 ? '0.1' : `10⁻${Math.abs(lc)}`, { a: 'middle', size: 10 })),
    lab(ox + w / 2, oy + 36, 'concentration of the acid / mol L⁻¹', { a: 'middle', size: 10 }),
    ...curves.map(([K, c]) => S.path(path((lc) => alphaExact(K, 10 ** lc), -4, 0, 80, X, Y), { c, w: 2.5 })),
    S.line(X(-1), Y(0), X(-1), Y(0.3), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    ...curves.map(([K, c], i) => S.circle(X(-1), Y(alphaExact(K, 0.1)), 3.5, { fill: c, c })),
    ...curves.map(([, c, t], i) => S.line(ox + 96, 52 + i * 18, ox + 118, 52 + i * 18, { c, w: 2.5 }) + lab(ox + 124, 56 + i * 18, t, { size: 10 })),
    S.arrow(ox + w - 30, 118, ox + 110, 118, { c: 'var(--diagram-muted)', w: 1.5, size: 6 }),
    lab(ox + w / 2 + 40, 110, 'on dilution α increases', { a: 'middle', size: 10 }),
  ].join(''));
})();

// 4. pKa ladder for phosphoric acid.
export const PHOSPH = (() => {
  const pk = [PHOS.k1, PHOS.k2, PHOS.k3].map((k) => -log10(k));
  const ox = 30, w = 360, oy = 150;
  const X = (p) => ox + (p / 14) * w;
  chk(Math.abs(pk[0] - 2.12) < 0.01 && Math.abs(pk[1] - 7.21) < 0.01 && Math.abs(pk[2] - 12.32) < 0.01, `phosph: pKa values ${pk.map((p) => p.toFixed(2)).join(', ')}`);
  chk(PHOS.k1 / PHOS.k2 > 1e4 && PHOS.k2 / PHOS.k3 > 1e4, 'phosph: each step is more than 10⁴ times weaker than the one before');
  const items = [
    { p: pk[0], y: 58, a: 'start', x: 30, l1: 'H₃PO₄ ⇌ H₂PO₄⁻ + H⁺', l2: 'Ka1 = 7.5 × 10⁻³' },
    { p: pk[1], y: 100, a: 'middle', x: X(pk[1]), l1: 'H₂PO₄⁻ ⇌ HPO₄²⁻ + H⁺', l2: 'Ka2 = 6.2 × 10⁻⁸' },
    { p: pk[2], y: 58, a: 'end', x: 410, l1: 'HPO₄²⁻ ⇌ PO₄³⁻ + H⁺', l2: 'Ka3 = 4.8 × 10⁻¹³' },
  ];
  return svgDoc(420, 200, 'Axis of pKa from 0 to 14 with the three ionisation steps of phosphoric acid marked at 2.12, 7.21 and 12.32. The Ka values fall by a factor of more than ten thousand at each step, so each successive step is a much weaker acid.', [
    S.line(ox, oy, ox + w, oy, { w: 2 }),
    ...Array.from({ length: 15 }, (_, p) => S.line(X(p), oy, X(p), oy + 5) + lab(X(p), oy + 18, String(p), { a: 'middle', size: 10 })),
    lab(ox + w / 2, oy + 36, 'pKa  (larger pKa means a weaker acid)', { a: 'middle', size: 10 }),
    ...items.map((it) => S.line(X(it.p), it.y + 8, X(it.p), oy, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }) + S.circle(X(it.p), oy, 5, { fill: 'var(--diagram-accent)', c: 'var(--diagram-accent)' }) + lab(it.x, it.y - 8, it.l1, { a: it.a, size: 11, w: 'bold' }) + lab(it.x, it.y + 6, `${it.l2}  (pKa ${it.p.toFixed(2)})`, { a: it.a, size: 10 })),
  ].join(''));
})();

// 5. Titration curves with indicator ranges: 25.00 mL of 0.100 mol/L solution, 0.100 mol/L titrant, 0 to 50 mL.
export const TITR = (() => {
  const Va = 25, C = 0.1;
  const ox = 44, oy = 232, w = 250, h = 210;
  const X = (v) => ox + (v / 50) * w;
  const Y = (p) => oy - (p / 14) * h;
  const fSS = (v) => phSASB(C, Va, C, v);
  const fWA = (v) => phWASB(KA.acetic, C, Va, C, v);
  const fWB = (v) => phWBSA(KB.ammonia, C, Va, C, v);
  const eq = { ss: fSS(25), wa: fWA(25), wb: fWB(25) };
  chk(Math.abs(fSS(0) - 1) < 0.01 && Math.abs(eq.ss - 7) < 0.01, `titration: strong acid–strong base starts at pH ${fSS(0).toFixed(2)} and ends at ${eq.ss.toFixed(2)} at 25 mL`);
  chk(fSS(24.9) < 4.4 && fSS(25.1) > 9.6, `titration: the jump spans pH ${fSS(24.9).toFixed(2)} to ${fSS(25.1).toFixed(2)} for ±0.1 mL`);
  chk(Math.abs(fWA(0) - 2.87) < 0.02 && Math.abs(fWA(12.5) - 4.74) < 0.02, `titration: ethanoic acid starts at ${fWA(0).toFixed(2)} and is at ${fWA(12.5).toFixed(2)} (= pKa) at half-neutralisation`);
  chk(eq.wa > 8.5 && eq.wa < 9, `titration: weak acid–strong base equivalence pH ${eq.wa.toFixed(2)} (above 7)`);
  chk(eq.wb > 5 && eq.wb < 5.6, `titration: weak base–strong acid equivalence pH ${eq.wb.toFixed(2)} (below 7)`);
  chk(Math.abs(fWB(0) - 11.13) < 0.02, `titration: ammonia starts at pH ${fWB(0).toFixed(2)}`);
  const inds = [['methyl orange', 3.1, 4.4, 'var(--diagram-red)'], ['methyl red', 4.4, 6.2, 'var(--diagram-yellow)'], ['bromothymol blue', 6.0, 7.6, 'var(--diagram-green)'], ['phenolphthalein', 8.3, 10.0, 'var(--diagram-accent)']];
  const mids = inds.map(([, a, b]) => Y((a + b) / 2));
  chk(mids.slice(1).every((m, i) => mids[i] - m >= 14), 'titration: indicator labels are at least 14 px apart');
  const vol = [0, 5, 10, 15, 20, 22, 24, 24.5, 24.9, 25, 25.1, 25.5, 26, 28, 30, 35, 40, 50];
  const curve = (f) => 'M' + vol.flatMap((v, i) => (i === 0 ? [v] : [v])).map((v) => `${X(v).toFixed(1)} ${Y(f(v)).toFixed(1)}`).join(' L');
  const dense = (f) => 'M' + Array.from({ length: 101 }, (_, i) => { const v = i * 0.5; return `${X(v).toFixed(1)} ${Y(f(v)).toFixed(1)}`; }).join(' L');
  void curve;
  return svgDoc(420, 290, 'Titration curves of pH against the volume of titrant added for 25 millilitres of 0.1 molar solutions. Strong acid with strong base: pH rises from 1 through 7 at the equivalence point with a vertical rise from about 4 to 10. Ethanoic acid with strong base: starts near 2.9 and the equivalence point is near 8.7. Ammonia with hydrochloric acid: starts near 11.1 and the equivalence point is near 5.3. Bars at the right show the pH ranges of four indicators.', [
    S.arrow(ox, oy, ox + w + 12, oy, { size: 6 }),
    S.arrow(ox, oy, ox, 14, { size: 6 }),
    ...[0, 10, 20, 30, 40, 50].map((v) => S.line(X(v), oy, X(v), oy + 5) + lab(X(v), oy + 18, String(v), { a: 'middle', size: 10 })),
    lab(ox + w / 2, oy + 34, 'volume of titrant added / mL', { a: 'middle', size: 10 }),
    ...[0, 2, 4, 6, 7, 8, 10, 12, 14].map((p) => lab(ox - 6, Y(p) + 4, String(p), { a: 'end', size: 10 })),
    lab(6, 14, 'pH', { size: 10 }),
    S.line(X(25), Y(0), X(25), Y(11.5), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.line(ox, Y(7), ox + w, Y(7), { c: 'var(--diagram-muted)', w: 1, dash: '2 3' }),
    ...inds.map(([, a, b, c]) => S.rect(ox, Y(b), w, Y(a) - Y(b), { fill: c, fop: 0.13, c: 'none', sw: 0 })),
    S.path(dense(fSS), { c: 'currentColor', w: 2.5 }),
    S.path(dense(fWA), { c: 'var(--diagram-blue)', w: 2.5 }),
    S.path(dense(fWB), { c: 'var(--diagram-red)', w: 2.5 }),
    // legend in the empty upper-left region
    S.line(ox + 8, Y(13.8), ox + 28, Y(13.8), { c: 'currentColor', w: 2.5 }), lab(ox + 33, Y(13.8) + 4, 'HCl titrated with NaOH', { size: 10 }),
    S.line(ox + 8, Y(13.05), ox + 28, Y(13.05), { c: 'var(--diagram-blue)', w: 2.5 }), lab(ox + 33, Y(13.05) + 4, 'CH₃COOH titrated with NaOH', { size: 10 }),
    S.line(ox + 8, Y(12.3), ox + 28, Y(12.3), { c: 'var(--diagram-red)', w: 2.5 }), lab(ox + 33, Y(12.3) + 4, 'NH₃ titrated with HCl', { size: 10 }),
    lab(X(25) + 4, Y(0.6), 'equivalence', { size: 10 }),
    // indicator bars
    lab(ox + w + 24, 14, 'indicator ranges', { size: 10, w: 'bold' }),
    ...inds.map(([n, a, b, c]) => S.rect(ox + w + 24, Y(b), 9, Y(a) - Y(b), { fill: c, fop: 0.7, c: 'var(--diagram-muted)', sw: 1 }) + lab(ox + w + 38, Y((a + b) / 2) + 4, n, { size: 10 })),
  ].join(''));
})();
