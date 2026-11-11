// ISC 11 Chemistry ch03 Subatomic Particles and Early Atomic Models: hand-drawn SVGs (allow-listed elements, palette colours only;
// geometry and data computed in JS, self-checked).
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const vtext = (x, y, s, o = {}) => S.text(x, y, s, { size: 11, a: 'middle', ...o }).replace('<text ', `<text transform="rotate(-90 ${x} ${y})" `);
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const M = 'var(--diagram-muted)';
const F = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. Discharge tube: cathode rays and anode rays
export const DISCHARGE = (() => {
  const out = [];
  const tube = (y0) => S.rect(70, y0, 380, 60, { rx: 14, fill: F, fop: 0.3 });
  const TUBE = { x1: 70, x2: 450 };
  // (a) cathode rays
  const ya = 30;
  out.push(lab(6, 16, '(a) Cathode rays', { w: 'bold' }));
  out.push(tube(ya));
  out.push(S.rect(92, ya + 10, 6, 40, { fill: R, c: R }));
  out.push(S.rect(247, ya + 10, 6, 40, { fill: B, c: B }));
  out.push(S.rect(438, ya + 4, 8, 52, { fill: G, fop: 0.7, c: G }));
  out.push(S.rect(436, ya + 22, 12, 16, { fill: M, c: M, sw: 1 }));
  out.push(S.rect(326, ya + 22, 8, 16, { fill: BR, c: BR }));
  const rays = [ya + 14, ya + 22, ya + 30, ya + 38, ya + 46];
  const rayEnd = (y) => (y >= ya + 22 && y <= ya + 38 ? 326 : 434);
  for (const y of rays) out.push(S.arrow(100, y, rayEnd(y) - (rayEnd(y) === 326 ? 1 : 0), y, { c: R, w: 1.4, size: 6 }));
  out.push(S.rect(196, ya - 12, 8, 12, { sw: 1.2 }));
  out.push(lab(212, ya - 3, 'to vacuum pump (very low pressure)', { size: 10 }));
  out.push(lab(95, ya + 78, 'cathode (−)', { a: 'middle' }));
  out.push(S.lead(95, ya + 62, 95, ya + 68));
  out.push(lab(250, ya + 78, 'anode (+)', { a: 'middle' }));
  out.push(lab(330, ya + 78, 'metal cross', { a: 'middle', size: 10 }));
  out.push(S.lead(330, ya + 40, 330, ya + 68));
  out.push(lab(444, ya + 78, 'ZnS screen', { a: 'end', size: 10 }));
  out.push(small(444, ya + 91, 'with shadow of the cross', { a: 'end', c: M }));
  // high-voltage supply
  const yw = ya + 112;
  out.push(S.line(95, ya + 50, 95, yw, { w: 1.2 }));
  out.push(S.line(95, yw, 130, yw, { w: 1.2 }));
  out.push(S.rect(130, yw - 12, 100, 24, { rx: 3, fill: F, fop: 0.5 }));
  out.push(small(180, yw + 4, 'high voltage', { a: 'middle' }));
  out.push(S.line(230, yw, 250, yw, { w: 1.2 }));
  out.push(S.line(250, yw, 250, ya + 50, { w: 1.2 }));
  // (b) anode rays
  const yb = 205;
  out.push(lab(6, yb - 14, '(b) Anode rays (canal rays)', { w: 'bold' }));
  out.push(tube(yb));
  out.push(S.rect(92, yb + 10, 6, 40, { fill: B, c: B }));
  out.push(S.rect(247, yb + 10, 6, 14, { fill: R, c: R }));
  out.push(S.rect(247, yb + 36, 6, 14, { fill: R, c: R }));
  out.push(S.rect(438, yb + 4, 8, 52, { fill: G, fop: 0.5, c: G }));
  out.push(S.rect(436, yb + 24, 12, 12, { fill: Y, c: Y, sw: 1 }));
  for (const y of [yb + 16, yb + 44]) out.push(S.arrow(100, y, 245, y, { c: B, w: 1.4, size: 6 }));
  for (const y of [yb + 26, yb + 30, yb + 34]) out.push(S.arrow(100, y, y === yb + 30 ? 434 : 434, y, { c: B, w: 1.4, size: 6 }));
  out.push(lab(95, yb + 78, 'anode (+)', { a: 'middle' }));
  out.push(lab(250, yb + 78, 'perforated cathode (−)', { a: 'middle' }));
  out.push(S.lead(250, yb + 52, 250, yb + 66));
  out.push(small(444, yb + 78, 'bright spot', { a: 'end', c: M }));
  out.push(small(70, yb + 96, 'Gas atoms lose electrons: atom → positive ion + electron.', { c: M }));
  out.push(small(70, yb + 109, 'Positive ions move towards the cathode; some pass through its holes.', { c: M }));
  // checks
  chk(rays.filter((y) => rayEnd(y) === 326).length === 3 && rays.filter((y) => rayEnd(y) === 434).length === 2, 'discharge: 3 cathode rays stopped by the cross, 2 reach the screen');
  chk(rays.every((y) => y > ya && y < ya + 60) && 100 > TUBE.x1 && 438 < TUBE.x2, 'discharge: every ray lies inside the tube');
  return svgDoc(
    540,
    335,
    'Discharge tube at very low pressure with a high voltage. In part (a), cathode rays leave the cathode, travel in straight lines to the anode side and a zinc sulfide screen, and a metal cross in their path casts a sharp shadow, so the rays travel in straight lines. In part (b), the cathode has holes and the tube contains gas; positive ions made in the gas travel towards the cathode and the ones passing through the holes form anode rays that make a bright spot on the screen.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 2. Alpha scattering: apparatus and trajectories near one nucleus
function trajectory(b, k, startX = -4000, dt = 0.4) {
  // Repulsive 1/r^2 force on a unit-mass particle of unit speed; nucleus at the origin; b = impact parameter (positive above).
  let x = startX;
  let y = -b;
  let vx = 1;
  let vy = 0;
  const pts = [];
  const acc = (px, py) => {
    const r2 = px * px + py * py;
    const r = Math.sqrt(r2);
    return [(k * px) / (r2 * r), (k * py) / (r2 * r)];
  };
  let [ax, ay] = acc(x, y);
  for (let i = 0; i < 40000; i++) {
    x += vx * dt + 0.5 * ax * dt * dt;
    y += vy * dt + 0.5 * ay * dt * dt;
    const [nax, nay] = acc(x, y);
    vx += 0.5 * (ax + nax) * dt;
    vy += 0.5 * (ay + nay) * dt;
    ax = nax;
    ay = nay;
    if (i % 5 === 0) pts.push([x, y]);
    if (Math.hypot(x, y) > 6000) break;
  }
  const angle = (Math.atan2(-vy, vx) * 180) / Math.PI; // screen y is down; positive = deflected upward
  return { pts, deflection: Math.abs(angle), vx, vy };
}
export const SCATTER = (() => {
  const out = [];
  // (a) apparatus
  out.push(lab(6, 16, '(a) The apparatus', { w: 'bold' }));
  const fx = 150;
  const fy = 130;
  out.push(S.rect(14, fy - 16, 44, 32, { rx: 3, fill: F, fop: 0.6 }));
  out.push(small(36, fy + 3, 'α source', { a: 'middle' }));
  out.push(S.rect(82, fy - 34, 7, 26, { fill: M, c: M }));
  out.push(S.rect(82, fy + 8, 7, 26, { fill: M, c: M }));
  out.push(small(86, fy + 48, 'lead slits', { a: 'middle' }));
  out.push(S.rect(fx - 3, fy - 62, 6, 124, { fill: Y, fop: 0.7, c: Y, sw: 1 }));
  out.push(small(fx, fy + 78, 'thin gold foil', { a: 'middle' }));
  // circular screen (arc of radius 108 about the foil) from -125 to +125 degrees
  const Rs = 108;
  const arcPt = (deg) => [fx + Rs * Math.cos((deg * Math.PI) / 180), fy - Rs * Math.sin((deg * Math.PI) / 180)];
  const [sx1, sy1] = arcPt(-125);
  const [sx2, sy2] = arcPt(125);
  out.push(S.path(`M ${sx1} ${sy1} A ${Rs} ${Rs} 0 1 0 ${sx2} ${sy2}`, { c: G, w: 4, op: 0.7 }));
  out.push(small(fx, 252, 'ZnS screen (circular)', { a: 'middle', c: G }));
  out.push(S.arrow(58, fy, fx - 5, fy, { c: B, w: 1.4, size: 6 }));
  out.push(S.arrow(fx + 4, fy, arcPt(0)[0] - 1, fy, { c: B, w: 1.4, size: 6 }));
  out.push(S.arrow(fx + 4, fy - 6, arcPt(12)[0], arcPt(12)[1], { c: B, w: 1.2, size: 6 }));
  out.push(S.arrow(fx + 4, fy + 10, arcPt(-5)[0], arcPt(-5)[1], { c: B, w: 1.2, size: 6 }));
  out.push(S.arrow(fx - 4, fy - 4, arcPt(150)[0] + 8, arcPt(150)[1] + 2, { c: R, w: 1.2, size: 6, dash: '4 3' }));
  out.push(small(fx + 8, fy + 34, 'most go straight'));
  out.push(small(fx + 14, fy - 50, 'few deflected', { c: B }));
  out.push(small(70, fy - 70, 'very few turn back', { c: R }));
  // (b) trajectories near one nucleus
  const nx = 440;
  const ny = 130;
  out.push(lab(290, 16, '(b) Near one nucleus (not to scale)', { w: 'bold' }));
  const k = 10;
  const list = [
    { b: 4, up: true },
    { b: 16, up: true },
    { b: 40, up: true },
    { b: 25, up: false },
    { b: 70, up: false },
    { b: 92, up: false },
  ];
  const results = [];
  for (const { b, up } of list) {
    const { pts, deflection } = trajectory(b, k);
    const drawn = pts.map(([px, py]) => [nx + px, ny + (up ? py : -py)]);
    results.push({ b, deflection });
    // drawn points arrive in order; stop at first exit after entering
    const seg = [];
    let entered = false;
    for (const [X, Yp] of drawn) {
      const ok = X >= 292 && X <= 548 && Yp >= 26 && Yp <= 238;
      if (ok) {
        entered = true;
        seg.push([X, Yp]);
      } else if (entered) break;
    }
    if (seg.length > 2) {
      const d = 'M ' + seg.map(([X, Yp]) => `${X.toFixed(1)} ${Yp.toFixed(1)}`).join(' L ');
      out.push(S.path(d, { c: b < 10 ? R : B, w: 1.4 }));
      const [x2, y2] = seg[seg.length - 1];
      const [x1, y1] = seg[seg.length - 3];
      out.push(S.head(x2, y2, Math.atan2(y2 - y1, x2 - x1), { c: b < 10 ? R : B, size: 6 }));
    }
  }
  out.push(S.circle(nx, ny, 4, { fill: R, c: R }));
  out.push(small(nx + 8, ny + 15, 'nucleus (+)', { c: R }));
  out.push(small(296, 256, 'closer approach: bigger deflection', { c: M }));
  // checks (Rutherford: tan(theta/2) = k / b for v = 1)
  const fmt = results.map((r) => `${r.b}px:${r.deflection.toFixed(0)}°`).join(' ');
  chk(results.every((r) => Math.abs(r.deflection - (2 * Math.atan(k / r.b) * 180) / Math.PI) < 3), `Coulomb-repulsion paths match 2 atan(k/b): ${fmt}`);
  chk(results[0].deflection > 120 && results[1].deflection > results[2].deflection && results[2].deflection > results[5].deflection, 'deflection falls as the impact parameter grows; the closest path turns back');
  return svgDoc(
    560,
    262,
    'Rutherford alpha-particle scattering. In part (a), alpha particles from a source pass through lead slits and hit a thin gold foil surrounded by a zinc sulfide screen. Most go straight on, a few are deflected and very few turn back. In part (b), paths are drawn near one positive nucleus: alpha particles passing far from the nucleus are barely deflected, ones passing closer are deflected more, and a nearly head-on alpha particle is turned back.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 3. Thomson and Rutherford models
export const MODELS = (() => {
  const out = [];
  const cx1 = 130;
  const cx2 = 390;
  const cy = 95;
  // Thomson
  out.push(S.circle(cx1, cy, 68, { fill: R, fop: 0.22, c: R }));
  const th = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * 2 * Math.PI) / 6 + 0.3;
    const rr = i % 2 ? 22 : 42;
    th.push([cx1 + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  for (const [x, y] of th) {
    out.push(S.circle(x, y, 6, { fill: B, fop: 0.85, c: B, sw: 1 }));
    out.push(S.text(x, y + 4, '−', { a: 'middle', size: 11, c: 'currentColor', w: 'bold' }));
  }
  out.push(lab(cx1, cy - 52, '+', { a: 'middle', size: 14, c: R, w: 'bold' }));
  out.push(lab(cx1 + 52, cy + 6, '+', { a: 'middle', size: 14, c: R, w: 'bold' }));
  out.push(lab(cx1 - 54, cy + 12, '+', { a: 'middle', size: 14, c: R, w: 'bold' }));
  out.push(lab(cx1, 188, 'Thomson (1904)', { a: 'middle', w: 'bold' }));
  out.push(lab(cx1, 203, 'positive sphere, electrons embedded', { a: 'middle', size: 10 }));
  out.push(lab(cx1, 217, 'like seeds in a watermelon', { a: 'middle', size: 10 }));
  // Rutherford
  out.push(S.circle(cx2, cy, 80, { c: M, dash: '4 4', sw: 1 }));
  out.push(S.circle(cx2, cy, 30, { c: M, sw: 1 }));
  out.push(S.circle(cx2, cy, 58, { c: M, sw: 1 }));
  out.push(S.circle(cx2, cy, 4.5, { fill: R, c: R }));
  const ru = [];
  for (const [rr, a] of [[30, 0.9], [58, 2.6], [58, 5.1], [30, 4.0]]) ru.push([cx2 + rr * Math.cos(a), cy + rr * Math.sin(a), rr]);
  for (const [x, y] of ru) {
    out.push(S.circle(x, y, 5, { fill: B, fop: 0.85, c: B, sw: 1 }));
    out.push(S.text(x, y + 4, '−', { a: 'middle', size: 11, c: 'currentColor', w: 'bold' }));
  }
  out.push(small(cx2 + 8, cy - 8, 'nucleus', { c: R }));
  out.push(lab(cx2, 188, 'Rutherford (1911)', { a: 'middle', w: 'bold' }));
  out.push(lab(cx2, 203, 'tiny dense positive nucleus,', { a: 'middle', size: 10 }));
  out.push(lab(cx2, 217, 'electrons far outside, mostly empty space', { a: 'middle', size: 10 }));
  chk(th.every(([x, y]) => Math.hypot(x - cx1, y - cy) < 68 - 6), 'Thomson: all six electrons lie inside the positive sphere');
  chk(ru.every(([x, y, rr]) => near(Math.hypot(x - cx2, y - cy), rr, 0.001) && rr > 4.5 + 5), 'Rutherford: electrons on their orbits, well outside the nucleus');
  return svgDoc(
    520,
    228,
    'Two early models of the atom. Thomson: a positively charged sphere with negatively charged electrons embedded in it. Rutherford: a very small, dense, positively charged nucleus at the centre with electrons moving around it at large distances, so most of the atom is empty space.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 4. Black-body radiation: Planck curves and the classical prediction
const hP = 6.626e-34;
const cL = 2.998e8;
const kB = 1.381e-23;
const planck = (lam, T) => (2 * hP * cL * cL) / (lam ** 5 * (Math.exp((hP * cL) / (lam * kB * T)) - 1));
const rayleigh = (lam, T) => (2 * cL * kB * T) / lam ** 4;
export const BLACKBODY = (() => {
  const out = [];
  const x0 = 64;
  const x1 = 490;
  const yb = 226;
  const yt = 30;
  const lmin = 0.2e-6;
  const lmax = 3.0e-6;
  const X = (l) => x0 + ((l - lmin) / (lmax - lmin)) * (x1 - x0);
  const ref = planck(2.898e-3 / 5000, 5000);
  const Yp = (v) => yb - (v / ref) * (yb - yt) * 0.9;
  out.push(S.line(x0, yb, x1, yb));
  out.push(S.line(x0, yb, x0, yt - 6));
  for (const um of [0.5, 1, 1.5, 2, 2.5, 3]) {
    out.push(S.line(X(um * 1e-6), yb, X(um * 1e-6), yb + 4));
    out.push(small(X(um * 1e-6), yb + 16, String(um), { a: 'middle' }));
  }
  out.push(lab((x0 + x1) / 2, yb + 34, 'Wavelength (μm)', { a: 'middle' }));
  out.push(vtext(24, (yb + yt) / 2, 'Intensity of radiation (arbitrary units)'));
  const curves = [
    { T: 3000, c: BR },
    { T: 4000, c: B },
    { T: 5000, c: R },
  ];
  const peaks = [];
  for (const { T, c } of curves) {
    let d = '';
    let best = [0, 0];
    for (let l = 0.2e-6; l <= 3.0e-6; l += 0.02e-6) {
      const v = planck(l, T);
      if (v > best[1]) best = [l, v];
      d += `${d ? ' L' : 'M'} ${X(l).toFixed(1)} ${Yp(v).toFixed(1)}`;
    }
    out.push(S.path(d, { c, w: 2 }));
    peaks.push({ T, lam: best[0] });
    out.push(lab(X(best[0]) + (T === 5000 ? -4 : 6), Yp(best[1]) - 6, `${T} K`, { c, w: 'bold', a: T === 5000 ? 'end' : 'start' }));
  }
  // classical (Rayleigh-Jeans) curve for 5000 K, drawn only while below the top of the plot
  let dc = '';
  let started = false;
  let above = true;
  for (let l = 0.2e-6; l <= 3.0e-6; l += 0.02e-6) {
    const v = rayleigh(l, 5000);
    if (Yp(v) < yt - 2) continue;
    if (!started) {
      dc += `M ${X(l).toFixed(1)} ${yt - 2}`;
      started = true;
    }
    dc += ` L ${X(l).toFixed(1)} ${Yp(v).toFixed(1)}`;
    if (planck(l, 5000) > v) above = false;
  }
  out.push(S.path(dc, { c: 'currentColor', w: 1.5, dash: '5 4' }));
  out.push(lab(X(1.75e-6), yt + 12, 'Dashed: wave theory (5000 K)', { size: 10 }));
  out.push(lab(X(1.75e-6), yt + 25, 'intensity would rise without limit', { size: 10 }));
  out.push(lab(X(1.75e-6), yt + 38, 'at short wavelengths', { size: 10 }));
  out.push(lab(X(1.75e-6), yt + 70, 'Solid: Planck (quantum theory)', { size: 10 }));
  out.push(lab(X(1.75e-6), yt + 83, 'curves fall at short wavelengths', { size: 10 }));
  chk(peaks.every((p) => near(p.lam, 2.898e-3 / p.T, 0.04)), `black-body peaks follow Wien: ${peaks.map((p) => `${p.T} K ${(p.lam * 1e6).toFixed(2)} um`).join(', ')}`);
  chk(peaks[0].lam > peaks[1].lam && peaks[1].lam > peaks[2].lam, 'black-body: the peak moves to shorter wavelength as T rises');
  chk(above, 'the classical curve lies above the Planck curve everywhere it is drawn');
  return svgDoc(
    520,
    268,
    'Graph of intensity of black-body radiation against wavelength for 3000, 4000 and 5000 kelvin. Each curve rises to a peak and falls at shorter wavelengths, and the peak moves to a shorter wavelength as the temperature rises. A dashed line shows the intensity predicted by the classical wave theory, which keeps rising towards short wavelengths and does not match the experimental curves; Planck explained the curves by assuming energy is emitted in quanta.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 5. Photoelectric effect: kinetic energy against frequency
export const PHOTO = (() => {
  const out = [];
  const x0 = 74;
  const x1 = 490;
  const yb = 220;
  const yt = 34;
  const nuMax = 12; // x 10^14 Hz
  const keMax = 5.5; // x 10^-19 J
  const X = (n) => x0 + (n / nuMax) * (x1 - x0);
  const Yk = (k) => yb - (k / keMax) * (yb - yt);
  out.push(S.line(x0, yb, x1, yb));
  out.push(S.line(x0, yb, x0, yt - 4));
  for (let n = 0; n <= 12; n += 2) {
    out.push(S.line(X(n), yb, X(n), yb + 4));
    out.push(small(X(n), yb + 16, String(n), { a: 'middle' }));
  }
  for (let k = 0; k <= 5; k++) {
    out.push(S.line(x0 - 4, Yk(k), x0, Yk(k)));
    out.push(small(x0 - 8, Yk(k) + 4, String(k), { a: 'end' }));
  }
  out.push(lab((x0 + x1) / 2, yb + 36, 'Frequency of light (× 10¹⁴ Hz)', { a: 'middle' }));
  out.push(vtext(24, (yb + yt) / 2, 'Kinetic energy (× 10⁻¹⁹ J)'));
  const slope = (hP * 1e14) / 1e-19; // KE per 10^14 Hz in units of 1e-19 J
  const metals = [
    { nu0: 4.5, c: B, name: 'Metal P' },
    { nu0: 6.5, c: R, name: 'Metal Q' },
  ];
  for (const m of metals) {
    out.push(S.line(X(0.0), yb, X(m.nu0), yb, { c: m.c, w: 2.2, dash: '2 3' }));
    const topNu = nuMax;
    const topKe = slope * (topNu - m.nu0);
    out.push(S.line(X(m.nu0), yb, X(topNu), Yk(topKe), { c: m.c, w: 2.2 }));
    out.push(S.circle(X(m.nu0), yb, 3, { fill: m.c, c: m.c }));
    out.push(S.line(X(m.nu0), yb + 4, X(m.nu0), yb - 14, { c: m.c, w: 1, dash: '3 3' }));
    out.push(small(X(m.nu0), yb - 18, `threshold ${m.nu0}`, { a: 'middle', c: m.c }));
    out.push(lab(X(topNu) + 2, Yk(topKe) + (m.name === 'Metal Q' ? 34 : -8), m.name, { a: 'end', c: m.c, size: 11, w: 'bold' }));
  }
  out.push(small(X(0.2), yb - 8, 'no electrons below threshold', { c: M }));
  out.push(small(X(0.4), Yk(4.9), 'Slope of each line = h', { c: M }));
  out.push(small(X(0.4), Yk(4.5), '= 6.63 × 10⁻³⁴ J s', { c: M }));
  chk(near(slope, 0.6626, 0.001), `slope of KE (1e-19 J) per 1e14 Hz equals h: ${slope.toFixed(4)}`);
  chk(metals.every((m) => slope * (nuMax - m.nu0) < keMax), 'both lines end inside the plot');
  return svgDoc(
    520,
    262,
    'Graph of maximum kinetic energy of photoelectrons against frequency of light for two metals P and Q. Below its threshold frequency each metal emits no electrons. Above the threshold the kinetic energy rises along a straight line. The lines for the two metals are parallel with the same slope, equal to Planck constant, and differ only in threshold frequency: 4.5 and 6.5 times ten to the fourteen hertz.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 6. Electromagnetic spectrum
export const SPECTRUM = (() => {
  const out = [];
  const bands = [
    { n: 'Radio', w: 'above 0.1 m', c: M },
    { n: 'Microwave', w: '1 mm to 0.1 m', c: BR },
    { n: 'Infrared', w: '700 nm to 1 mm', c: R },
    { n: 'Visible', w: '400 to 700 nm', c: G },
    { n: 'Ultraviolet', w: '10 to 400 nm', c: 'var(--diagram-accent)' },
    { n: 'X-rays', w: '0.01 to 10 nm', c: B },
    { n: 'Gamma rays', w: 'below 0.01 nm', c: Y },
  ];
  const x0 = 20;
  const bw = 70;
  bands.forEach((b, i) => {
    const x = x0 + i * bw;
    out.push(S.rect(x, 50, bw - 4, 46, { fill: b.c, fop: 0.35, c: b.c, rx: 3 }));
    out.push(lab(x + (bw - 4) / 2, 70, b.n, { a: 'middle', size: 10, w: 'bold' }));
    const parts = b.w.includes(' to ') ? b.w.split(' to ') : [b.w];
    parts.forEach((p, j) => out.push(small(x + (bw - 4) / 2, 112 + j * 12, j ? 'to ' + p : p, { a: 'middle' })));
  });
  // visible strip detail
  const vis = [R, Y, G, B, 'var(--diagram-accent)'];
  vis.forEach((c, i) => out.push(S.rect(x0 + 3 * bw + 6 + i * 11.5, 76, 11.5, 14, { fill: c, c, sw: 0.5 })));
  out.push(S.arrow(20, 20, 500, 20, { w: 1.6 }));
  out.push(lab(260, 14, 'frequency and photon energy increase (E = hν)', { a: 'middle', size: 10 }));
  out.push(S.arrow(500, 148, 20, 148, { w: 1.6 }));
  out.push(lab(260, 142, 'wavelength increases (c = νλ)', { a: 'middle', size: 10, dy: 0 }));
  out.push(lab(260, 168, 'Red to violet inside the visible band: wavelength falls, energy per photon rises.', { a: 'middle', size: 10, c: M }));
  chk(bands.length === 7 && vis.length === 5, 'spectrum: seven regions in order of increasing frequency, five visible colours');
  return svgDoc(
    520,
    180,
    'Electromagnetic spectrum from radio waves on the left to gamma rays on the right: radio, microwave, infrared, visible, ultraviolet, X-rays and gamma rays, with wavelength ranges. Frequency and energy of a photon increase to the right, and wavelength increases to the left. The visible band runs from red to violet.',
    out.join(''),
  );
})();
