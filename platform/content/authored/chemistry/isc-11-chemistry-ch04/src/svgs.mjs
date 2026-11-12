// ISC 11 Chemistry ch04 Bohr's Model, Atomic Spectra and Dual Nature: hand-drawn SVGs (allow-listed elements, palette colours only;
// geometry and data computed in JS, self-checked).
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const A = 'var(--diagram-accent)';
const M = 'var(--diagram-muted)';
const F = 'var(--diagram-fill)';
const RH = 1.097e7; // m^-1
const lamNm = (n1, n2) => 1e9 / (RH * (1 / n1 ** 2 - 1 / n2 ** 2));
const colourOf = (nm) => (nm < 450 ? A : nm < 495 ? B : nm < 570 ? G : nm < 620 ? Y : R);

// ---------------------------------------------------------------- 1. Types of spectra
const BALMER = [3, 4, 5, 6].map((n) => lamNm(2, n)); // 656.3, 486.1, 434.1, 410.2 nm
chk(near(BALMER[0], 656.3, 0.002) && near(BALMER[1], 486.2, 0.002) && near(BALMER[2], 434.1, 0.002) && near(BALMER[3], 410.3, 0.002), `Balmer lines from the Rydberg formula: ${BALMER.map((x) => x.toFixed(1)).join(', ')} nm`);
export const SPECTRA = (() => {
  const out = [];
  const x0 = 150;
  const w = 360;
  const X = (nm) => x0 + ((nm - 400) / 300) * w;
  const rows = [
    { y: 34, name: 'Continuous', sub: 'hot filament' },
    { y: 84, name: 'Line emission', sub: 'excited H atoms' },
    { y: 134, name: 'Line absorption', sub: 'light through cool H' },
    { y: 184, name: 'Band emission', sub: 'excited molecules' },
  ];
  const h = 30;
  const edges = [400, 450, 495, 570, 620, 700];
  const cols = [A, B, G, Y, R];
  const rainbow = (y) => cols.forEach((c, i) => out.push(S.rect(X(edges[i]), y, X(edges[i + 1]) - X(edges[i]), h, { fill: c, fop: 0.55, c, sw: 0.5 })));
  const dark = (y) => out.push(S.rect(x0, y, w, h, { fill: M, fop: 0.9, c: M, sw: 0.5 }));
  rows.forEach((r) => {
    out.push(lab(6, r.y + 13, r.name, { w: 'bold', size: 11 }));
    out.push(small(6, r.y + 26, r.sub, { c: M }));
  });
  // continuous
  rainbow(rows[0].y);
  // line emission
  dark(rows[1].y);
  for (const nm of BALMER) out.push(S.line(X(nm), rows[1].y, X(nm), rows[1].y + h, { c: colourOf(nm), w: 2.5 }));
  // line absorption
  rainbow(rows[2].y);
  for (const nm of BALMER) out.push(S.line(X(nm), rows[2].y, X(nm), rows[2].y + h, { c: 'currentColor', w: 2.5 }));
  // band emission: three bands of closely spaced lines with a sharp edge ("band head") on one side
  dark(rows[3].y);
  const bands = [[430, 462], [520, 556], [590, 634]];
  let nLines = 0;
  for (const [a, b] of bands)
    for (let k = 0; k < 14; k++) {
      const nm = a + (b - a) * (1 - (1 - k / 13) ** 2);
      out.push(S.line(X(nm), rows[3].y, X(nm), rows[3].y + h, { c: colourOf(nm), w: 1.6 }));
      nLines++;
    }
  for (const nm of [400, 500, 600, 700]) {
    out.push(S.line(X(nm), 218, X(nm), 223));
    out.push(small(X(nm), 235, String(nm), { a: 'middle' }));
  }
  out.push(small(x0 + w / 2, 250, 'Wavelength (nm)', { a: 'middle' }));
  chk(BALMER.every((nm) => nm > 400 && nm < 700) && nLines === 42, 'spectra: four Balmer lines inside 400–700 nm (same positions in emission and absorption), 3 bands of 14 lines');
  return svgDoc(
    520,
    258,
    'Four kinds of spectrum on a wavelength scale from 400 to 700 nanometres. A continuous spectrum shows every colour from violet to red. The line emission spectrum of hydrogen is four bright lines on a dark background at 410, 434, 486 and 656 nanometres. The line absorption spectrum of hydrogen is the continuous spectrum with dark lines at exactly the same four wavelengths. A band emission spectrum from molecules shows groups of closely spaced lines forming bands with a sharp edge on one side.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 2. Bohr orbits of H and He+
const rBohr = (n, Z) => (52.9 * n * n) / Z; // pm
chk(near(rBohr(1, 1), 52.9, 1e-9) && near(rBohr(4, 1), 846.4, 1e-9) && near(rBohr(3, 2), 238.05, 1e-9), 'Bohr radii 52.9 n^2 / Z: H n=4 846.4 pm, He+ n=3 238.05 pm');
export const ORBITS = (() => {
  const out = [];
  const k = 0.15; // px per pm
  const cy = 162;
  const panels = [
    { cx: 130, Z: 1, name: 'Hydrogen, Z = 1' },
    { cx: 390, Z: 2, name: 'He⁺, Z = 2' },
  ];
  const angs = [0.7, 2.3, 4.1, 5.5];
  for (const p of panels) {
    out.push(lab(p.cx, 16, p.name, { a: 'middle', w: 'bold' }));
    out.push(S.circle(p.cx, cy, 3.5, { fill: R, c: R }));
    const vals = [];
    for (let n = 1; n <= 4; n++) {
      const rr = rBohr(n, p.Z) * k;
      vals.push(rBohr(n, p.Z));
      out.push(S.circle(p.cx, cy, rr, { c: M, sw: 1.2 }));
      if (n === 2) out.push(S.circle(p.cx + rr * Math.cos(angs[n - 1]), cy + rr * Math.sin(angs[n - 1]), 4, { fill: B, fop: 0.9, c: B, sw: 1 }));
      if (n >= 2) out.push(small(p.cx, cy - rr - 3, `n = ${n}`, { a: 'middle' }));
    }
    out.push(small(p.cx, cy + 156, `r = ${vals.map((v) => (v < 100 ? (Math.round(v * 10 + 1e-6) / 10).toFixed(1) : v.toFixed(0))).join(', ')} pm`, { a: 'middle' }));
  }
  out.push(small(260, cy + 172, 'Innermost circle: n = 1. Blue dot: the single electron, shown here in n = 2.', { a: 'middle', c: M }));
  chk(near(rBohr(2, 2), rBohr(2, 1) / 2, 1e-9) && near(rBohr(4, 1) * k, 126.96, 1e-4), 'orbits: He+ radius is half the hydrogen radius for each n; n=4 circle (127 px) fits the panel');
  chk(cy - 4 * 52.9 * 4 * k - 12 > 20, 'orbits: outer label sits below the panel heading');
  return svgDoc(
    520,
    348,
    'Bohr orbits drawn to scale for hydrogen and for the He plus ion, for n equal to 1 to 4. The radius grows as n squared: 52.9, 212, 476 and 846 picometres for hydrogen. For He plus, whose nucleus has charge 2, every orbit has half the radius of the hydrogen orbit with the same n: 26.5, 106, 238 and 423 picometres.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 3. Energy levels and series
const En = (n) => -2.18 / n ** 2; // x 10^-18 J
const dE = (n1, n2) => 2.18 * (1 / n1 ** 2 - 1 / n2 ** 2); // x 10^-18 J
export const LEVELS = (() => {
  const out = [];
  const yTop = 34;
  const sc = 200;
  const yOf = (n) => yTop + sc * (1 / n ** 2) * (2.18 / 2.18);
  out.push(S.line(52, yTop, 280, yTop, { dash: '5 4', c: M }));
  out.push(small(46, yTop + 4, 'n = ∞', { a: 'end' }));
  out.push(small(286, yTop + 4, 'E = 0', { c: M }));
  for (let n = 1; n <= 6; n++) {
    out.push(S.line(60, yOf(n), 270, yOf(n), { w: 2 }));
    if (n <= 3) out.push(small(54, yOf(n) + 4, `n = ${n}`, { a: 'end' }));
  }
  for (let n = 1; n <= 4; n++) out.push(small(286, yOf(n) + 4, `${En(n).toFixed(n === 1 ? 2 : 3)}`, { c: M }));
  out.push(small(286, yTop - 10, 'energies in 10⁻¹⁸ J', { c: M }));
  out.push(small(54, yOf(5) + 7, 'n ≥ 4', { a: 'end' }));
  const series = [
    { name: 'Lyman', to: 1, from: [2, 3, 4], x0: 82, c: B },
    { name: 'Balmer', to: 2, from: [3, 4, 5], x0: 154, c: R },
    { name: 'Paschen', to: 3, from: [4, 5], x0: 226, c: BR },
  ];
  for (const s of series) s.from.forEach((n, i) => out.push(S.arrow(s.x0 + i * 16, yOf(n), s.x0 + i * 16, yOf(s.to) - 1, { c: s.c, w: 1.8, size: 7 })));
  const Lg = 346;
  const row = (y, c, t1, t2, t3) => S.line(Lg, y - 4, Lg + 14, y - 4, { c, w: 3 }) + lab(Lg + 20, y, t1, { size: 10, w: 'bold' }) + lab(Lg + 20, y + 13, t2, { size: 10 }) + (t3 ? lab(Lg + 20, y + 26, t3, { size: 10 }) : '');
  out.push(row(100, B, 'Lyman: n → 1', 'ultraviolet', `2 → 1: ${lamNm(1, 2).toFixed(1)} nm`));
  out.push(row(156, R, 'Balmer: n → 2', 'visible', `3 → 2: ${lamNm(2, 3).toFixed(1)} nm`));
  out.push(row(212, BR, 'Paschen: n → 3', 'infrared', `4 → 3: ${lamNm(3, 4).toFixed(0)} nm`));
  out.push(small(150, 262, 'Drawn to scale: levels crowd together as n grows', { a: 'middle' }));
  // checks: Bohr energies against Rydberg wavelengths
  const hc = 6.626e-34 * 3.0e8;
  const viaE = (n1, n2) => (hc / (dE(n1, n2) * 1e-18)) * 1e9;
  chk(near(viaE(1, 2), lamNm(1, 2), 0.005) && near(viaE(2, 3), lamNm(2, 3), 0.005) && near(viaE(3, 4), lamNm(3, 4), 0.005), 'level differences 2.18(1/n1^2 - 1/n2^2) agree with the Rydberg wavelengths within 0.5%');
  chk(yOf(1) < 250 && yOf(4) - yOf(5) > 4 && lamNm(1, 2) < 400 && lamNm(2, 3) > 400 && lamNm(2, 3) < 700 && lamNm(3, 4) > 700, 'levels fit; Lyman in UV, Balmer visible, Paschen infrared');
  return svgDoc(
    520,
    272,
    'Energy-level diagram of hydrogen drawn to scale, with energy equal to minus 2.18 times ten to the minus 18 joule divided by n squared. Arrows ending on n equal to 1 form the Lyman series in the ultraviolet, arrows ending on n equal to 2 form the Balmer series in the visible region, and arrows ending on n equal to 3 form the Paschen series in the infrared. The wavelengths of the first line of each series are 121.5, 656.3 and 1875 nanometres.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 4. Standing waves round the orbit (de Broglie)
export const WAVES = (() => {
  const out = [];
  const Rr = 52;
  const a = 8;
  const cy = 90;
  const ring = (cx, n, c) => {
    let d = '';
    const N = 240;
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * 2 * Math.PI;
      const rr = Rr + a * Math.cos(n * t);
      d += `${i ? ' L' : 'M'} ${(cx + rr * Math.cos(t)).toFixed(1)} ${(cy + rr * Math.sin(t)).toFixed(1)}`;
    }
    out.push(S.path(d, { c, w: 2 }));
    out.push(S.circle(cx, cy, Rr, { c: M, sw: 1, dash: '3 3' }));
    out.push(S.circle(cx, cy, 3, { fill: R, c: R }));
  };
  ring(130, 3, B);
  ring(390, 3.5, R);
  const r0 = (n) => Rr + a * Math.cos(n * 0);
  const rEnd = (n) => Rr + a * Math.cos(n * 2 * Math.PI);
  out.push(S.circle(390 + r0(3.5), cy, 4, { c: R, sw: 1.5 }));
  out.push(S.circle(390 + rEnd(3.5), cy, 4, { c: R, sw: 1.5 }));
  out.push(lab(130, 170, 'Whole number of wavelengths', { a: 'middle', w: 'bold', size: 11 }));
  out.push(small(130, 184, '2πr = 3λ: the wave joins up and', { a: 'middle' }));
  out.push(small(130, 197, 'survives, so this orbit is allowed', { a: 'middle' }));
  out.push(lab(390, 170, 'Fraction of a wavelength', { a: 'middle', w: 'bold', size: 11 }));
  out.push(small(390, 184, '2πr = 3.5λ: the wave does not join', { a: 'middle' }));
  out.push(small(390, 197, 'up and cancels itself: not allowed', { a: 'middle' }));
  chk(near(r0(3), rEnd(3), 1e-9) && Math.abs(r0(3.5) - rEnd(3.5)) > 15, 'standing wave closes for n = 3 and mismatches by 2a = 16 px for n = 3.5');
  return svgDoc(
    520,
    206,
    'Electron waves round an orbit. On the left a wave with exactly three wavelengths round the circle joins up with itself, so it is a standing wave and the orbit is allowed. On the right a wave with three and a half wavelengths does not join up at its ends, so it would cancel itself out and such an orbit is not allowed. This links de Broglie waves with Bohr quantisation: circumference equals a whole number of wavelengths.',
    out.join(''),
  );
})();
