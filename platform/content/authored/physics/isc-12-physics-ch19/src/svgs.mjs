// ISC ch19 diagrams: the Geiger–Marsden arrangement in its vacuum chamber; alpha-particle paths past a gold nucleus computed
// by integrating the Coulomb repulsion; the classical collapse of a Rutherford atom; Bohr orbits drawn with r ∝ n² and
// speed arrows ∝ 1/n; the hydrogen energy-level diagram to scale (excitation, cascade, ionisation); a schematic
// level diagram with all five series; and a logarithmic wavelength strip of the five series.
// The physics helpers (closest approach, Bohr radius, speed and energies, Rydberg wavelengths) are used by the decks and
// the question bank; bohrR/bohrV/bohrE recompute the Bohr quantities from e, mₑ, h and 1/4πε₀ for independent re-solves.
// The Geiger–Marsden and trajectory code is adapted from the author's CBSE 12 Physics ch12 diagrams (copied, not imported);
// the other figures are new. SELF_CHECKS are read by build.mjs.
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const deg = (d) => (d * Math.PI) / 180;
const todeg = (x) => (x * 180) / Math.PI;
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

// ================================================================ constants and physics (values stated in the stems)
export const KC = 9e9; // 1/(4π ε₀), N m² C⁻²
export const QE = 1.6e-19; // C
export const ME = 9.1e-31; // kg
export const H = 6.6e-34; // J s (as in ch18)
export const CL = 3e8; // m/s
export const KE2 = KC * QE * QE; // k e², J m (= 1.44 MeV fm)
export const MEV = 1.6e-13; // J per MeV
export const A0 = 0.53e-10; // first Bohr radius, m
export const V1 = 2.2e6; // speed in the first orbit, m/s
export const E1 = 13.6; // ionisation energy of hydrogen, eV
export const RY = 1.097e7; // Rydberg constant, m⁻¹
export const HC = 1240; // eV nm (consistent with 13.6 eV and R to 1 part in 4000)
export const M_ALPHA = 6.64e-27; // kg

/** Distance of closest approach (m) of a projectile of charge q·e and kinetic energy K (MeV) aimed head-on at charge Z·e. */
export const closest = (KMeV, Z, q = 2) => (q * Z * KE2) / (KMeV * MEV);
/** Bohr model of hydrogen with the stated rounded constants. */
export const rn = (n) => A0 * n * n;
export const vn = (n) => V1 / n;
export const En = (n) => -E1 / (n * n);
export const Kn = (n) => E1 / (n * n);
export const Un = (n) => (-2 * E1) / (n * n);
/** Bohr quantities from first principles (independent of the rounded constants above). */
export const bohrR = (n, m = ME) => (n * n * H * H) / (4 * Math.PI ** 2 * KC * m * QE * QE);
export const bohrV = (n) => (2 * Math.PI * KC * QE * QE) / (n * H);
export const bohrE = (n, m = ME) => -KE2 / (2 * bohrR(n, m)) / QE;
/** Rydberg formula: 1/λ = R(1/n₁² − 1/n₂²); n₂ = Infinity gives the series limit. Wavelength in nm. */
export const invLam = (lo, hi) => RY * (1 / (lo * lo) - (hi === Infinity ? 0 : 1 / (hi * hi)));
export const lamNm = (lo, hi) => 1e9 / invLam(lo, hi);
/** Same wavelength from the energy levels: λ = hc/(E_hi − E_lo). */
export const lamFromE = (lo, hi) => HC / ((hi === Infinity ? 0 : En(hi)) - En(lo));
export const SERIES = [
  { name: 'Lyman', lo: 1, region: 'ultraviolet' },
  { name: 'Balmer', lo: 2, region: 'visible and near ultraviolet' },
  { name: 'Paschen', lo: 3, region: 'infrared' },
  { name: 'Brackett', lo: 4, region: 'infrared' },
  { name: 'Pfund', lo: 5, region: 'far infrared' },
];
/** Region by the band edges used in ch12 (UV < 400 nm, visible 400–700 nm, IR > 700 nm). */
export const region = (nm) => (nm < 400 ? 'ultraviolet' : nm <= 700 ? 'visible' : 'infrared');
export const nLines = (n) => (n * (n - 1)) / 2;

check(close(KE2 / MEV / 1e-15, 1.44, 1e-12), `k e² = ${(KE2 / MEV / 1e-15).toFixed(4)} MeV fm`);
check(close(bohrR(1), A0, 0.01) && close(bohrV(1), V1, 0.01) && close(-bohrE(1), E1, 0.01), `first-principles Bohr values r₁ = ${bohrR(1).toExponential(3)} m, v₁ = ${bohrV(1).toExponential(3)} m/s, E₁ = ${bohrE(1).toFixed(2)} eV agree with 0.53 Å, 2.2 × 10⁶ m/s, −13.6 eV to 1%`);
check([[1, 2], [2, 3], [3, 5], [4, 5], [2, Infinity]].every(([a, b]) => close(lamNm(a, b), lamFromE(a, b), 3e-4)), 'Rydberg wavelengths equal hc/ΔE with hc = 1240 eV nm to 3 parts in 10⁴');

// ================================================================ Geiger–Marsden arrangement
export const GEIGER = (() => {
  const w = 440;
  const h = 250;
  const fx = 250;
  const fy = 140;
  const R = 84;
  const th = 135;
  let s = S.rect(12, 30, 416, 196, { c: MUT, sw: 1.2, dash: '6 4', rx: 10 }) + lab(22, 46, 'evacuated chamber', { size: 10, c: MUT });
  s += S.line(410, 226, 410, 242, { c: MUT, w: 2 }) + lab(404, 244, 'to vacuum pump', { a: 'end', size: 10, c: MUT });
  s += S.rect(26, 115, 50, 50, { fill: MUT, fop: 0.35 }) + S.circle(51, 140, 6, { c: RAY, fill: RAY }) + lab(51, 182, 'α source in', { a: 'middle', size: 10 }) + lab(51, 195, 'lead block', { a: 'middle', size: 10 });
  s += S.rect(108, 118, 12, 16, { fill: MUT, fop: 0.6 }) + S.rect(108, 146, 12, 16, { fill: MUT, fop: 0.6 }) + lab(114, 110, 'slits', { a: 'middle', size: 10 });
  s += S.arrow(76, fy, fx - 4, fy, { c: RAY, w: 1.6, size: 6 }) + lab(176, 132, 'narrow α beam', { a: 'middle', size: 10, c: RAY });
  s += S.line(fx, 92, fx, 188, { c: ACC, w: 3 }) + lab(fx + 6, 208, 'very thin gold foil', { size: 10 });
  s += S.circle(fx, fy, R, { c: MUT, dash: '4 4' });
  // straight-through and back-scattered paths
  s += S.arrow(fx, fy, fx + R - 4, fy, { c: RAY, w: 1.2, size: 6, dash: '3 2' });
  const dx = fx + R * Math.cos(deg(-th));
  const dy = fy + R * Math.sin(deg(-th));
  s += S.arrow(fx, fy, dx, dy, { c: RAY, w: 1.4, size: 6 });
  s += S.rect(dx - 9, dy - 9, 18, 18, { c: BLUE, fill: BLUE, fop: 0.3 }) + lab(dx - 12, dy - 14, 'ZnS screen + microscope', { a: 'end', size: 10 });
  s += S.path(`M${f1(fx + 36)} ${fy} A36 36 0 0 0 ${f1(fx + 36 * Math.cos(deg(-th)))} ${f1(fy + 36 * Math.sin(deg(-th)))}`, { c: GRN, w: 1.4 }) + S.text(fx + 22, fy - 40, 'θ', { size: 12, w: 'bold', c: GRN });
  s += lab(fx + R + 6, fy + 4, 'θ ≈ 0: most α', { size: 10 });
  s += lab(w - 20, 62, 'detector moves round the foil', { a: 'end', size: 10 });
  check(close(Math.hypot(dx - fx, dy - fy), R) && dx < fx && dy < fy, `Geiger–Marsden: detector drawn on the circle round the foil at θ = ${th}° (back-scattering side)`);
  return svgDoc(w, h, 'Geiger–Marsden experiment in an evacuated chamber: alpha particles from a radioactive source in a lead block pass through narrow slits as a beam onto a thin gold foil; a zinc sulphide screen viewed through a microscope moves round the foil on a circle to count the particles scattered through each angle theta, here drawn at 135 degrees; most particles go straight through', s);
})();

// ================================================================ alpha trajectories (computed)
export const TRAJ_DATA = { d: 36, bs: [0.0001, 9, 22, 50, 100] };
export const TRAJ = (() => {
  const w = 440;
  const h = 250;
  const N = [300, 160];
  const { d, bs } = TRAJ_DATA;
  const Cc = d / 2; // with m = 1 and speed 1 at infinity: d = 2C
  const run = (b) => {
    const R0 = 20000;
    const v0 = Math.sqrt(1 - (2 * Cc) / R0);
    let y = -b / v0;
    let x = -Math.sqrt(R0 * R0 - y * y);
    let vx = v0;
    let vy = 0;
    const pts = [];
    let lastP = null;
    const acc = (px, py) => {
      const r2 = px * px + py * py;
      const rr = Math.sqrt(r2);
      return [(Cc * px) / (r2 * rr), (Cc * py) / (r2 * rr)];
    };
    let rmin = Infinity;
    for (let k = 0; k < 200000; k++) {
      const dt = Math.max(0.02, 0.005 * Math.hypot(x, y));
      const a1 = acc(x, y);
      const k1 = [vx, vy, a1[0], a1[1]];
      const a2 = acc(x + (dt / 2) * k1[0], y + (dt / 2) * k1[1]);
      const k2 = [vx + (dt / 2) * k1[2], vy + (dt / 2) * k1[3], a2[0], a2[1]];
      const a3 = acc(x + (dt / 2) * k2[0], y + (dt / 2) * k2[1]);
      const k3 = [vx + (dt / 2) * k2[2], vy + (dt / 2) * k2[3], a3[0], a3[1]];
      const a4 = acc(x + dt * k3[0], y + dt * k3[1]);
      const k4 = [vx + dt * k3[2], vy + dt * k3[3], a4[0], a4[1]];
      x += (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      y += (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      vx += (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
      vy += (dt / 6) * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]);
      rmin = Math.min(rmin, Math.hypot(x, y));
      if (Math.abs(x) < 330 && Math.abs(y) < 330 && (!lastP || Math.hypot(x - lastP[0], y - lastP[1]) > 4)) {
        lastP = [x, y];
        pts.push(lastP);
      }
      if (Math.hypot(x, y) > R0 && x * vx + y * vy > 0) break;
    }
    return { pts, theta: Math.abs(todeg(Math.atan2(-vy, vx))), rmin };
  };
  let s = S.circle(N[0], N[1], 5, { c: ACC, fill: ACC }) + lab(N[0] + 10, N[1] + 24, 'gold nucleus (+79e)', { size: 10 });
  const res = [];
  for (const b of bs) {
    const t = run(b);
    res.push({ b, ...t });
    const vis = t.pts.filter(([px, py]) => N[0] + px > -5 && N[0] + px < w + 5 && N[1] + py > -5 && N[1] + py < h + 5);
    s += S.path(vis.map(([px, py], i) => `${i ? 'L' : 'M'}${f1(N[0] + px)} ${f1(N[1] + py)}`).join(' '), { c: RAY, w: 1.4 });
    s += S.arrow(N[0] + vis[0][0], N[1] + vis[0][1], N[0] + vis[0][0] + 28, N[1] + vis[0][1], { c: RAY, w: 1.4, size: 6 });
    const last = vis[vis.length - 1];
    const prev = vis[vis.length - 3];
    s += S.arrow(N[0] + prev[0], N[1] + prev[1], N[0] + last[0], N[1] + last[1], { c: RAY, w: 1.4, size: 6 });
  }
  // closest approach of the head-on particle
  s += S.line(N[0] - d, N[1] + 12, N[0], N[1] + 12, { c: GRN, w: 1.2 }) + S.line(N[0] - d, N[1] + 7, N[0] - d, N[1] + 17, { c: GRN, w: 1.2 }) + lab(N[0] - d - 4, N[1] + 26, 'd (closest approach)', { a: 'end', size: 10, c: GRN });
  s += lab(8, 222, 'Same energy, different aim: the nearer the line of approach', { size: 11, w: 'bold' });
  s += lab(8, 238, 'to the nucleus, the larger the deflection', { size: 11, w: 'bold' });
  for (const t of res) {
    const pred = 2 * todeg(Math.atan(d / (2 * t.b)));
    check(Math.abs(t.theta - pred) < 1.0, `α path b = ${t.b < 1 ? 0 : t.b} px: computed deflection ${t.theta.toFixed(1)}° (Coulomb orbit check ${pred.toFixed(1)}°)`);
  }
  check(Math.abs(res[0].rmin - d) < 0.5, `head-on α turns back at r = ${res[0].rmin.toFixed(1)} px = d`);
  check(res.every((t, i) => i === 0 || t.theta < res[i - 1].theta), 'deflection falls as the line of approach moves away from the nucleus');
  return svgDoc(w, h, 'Computed paths of alpha particles of the same energy approaching a gold nucleus along parallel lines at different distances: the head-on particle slows, stops at the distance of closest approach d and returns; particles aimed close to the nucleus are deflected through large angles; those aimed far away are hardly deflected', s);
})();

// ================================================================ classical collapse of a Rutherford atom
export const SPIRAL = (() => {
  const w = 440;
  const h = 250;
  const c = [125, 125];
  const r0 = 100;
  const k = 0.11;
  const turns = 4;
  const pts = [];
  for (let t = 0; t <= turns * 2 * Math.PI + 1e-9; t += 0.1) {
    const rr = r0 * Math.exp(-k * t);
    pts.push([c[0] + rr * Math.cos(t), c[1] - rr * Math.sin(t), rr]);
  }
  let s = S.path(pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`).join(' '), { c: BLUE, w: 1.3, dash: '5 3' });
  s += S.circle(c[0], c[1], 6, { c: ACC, fill: ACC }) + lab(c[0] + 9, c[1] + 4, '+', { size: 12, w: 'bold' });
  s += S.circle(pts[0][0], pts[0][1], 4.5, { c: BLUE, fill: BLUE }) + lab(pts[0][0] - 4, pts[0][1] + 18, 'electron', { a: 'middle', size: 10 });
  // radiation leaving the accelerating electron
  for (const [i, ang] of [[18, 40], [45, 160]]) {
    const [x, y] = pts[i];
    let wv = `M${f1(x)} ${f1(y)}`;
    const ux = Math.cos(deg(ang));
    const uy = -Math.sin(deg(ang));
    for (let j = 1; j <= 8; j++) {
      const along = j * 4;
      const side = j % 2 ? 4 : -4;
      wv += ` L${f1(x + along * ux - side * uy)} ${f1(y + along * uy + side * ux)}`;
    }
    s += S.path(wv, { c: RAY, w: 1.2 });
  }
  s += lab(c[0] - 108, 18, 'radiates as it spirals in', { size: 10, c: RAY });
  const tx = 262;
  s += lab(tx, 40, 'Classical prediction', { size: 11, w: 'bold' }) + S.lines(tx, 58, ['• accelerated charge radiates', '• orbit shrinks, frequency rises', '• continuous spectrum', '• collapse in about 10⁻⁸ s'], { size: 10, dy: 15 });
  s += lab(tx, 140, 'What is observed', { size: 11, w: 'bold', c: GRN }) + S.lines(tx, 158, ['• atoms are stable', '• sharp line spectra', '• definite sizes, about 10⁻¹⁰ m'], { size: 10, dy: 15, c: GRN });
  const radii = pts.map((p) => p[2]);
  const freq = radii.map((rr) => rr ** -1.5);
  check(radii.every((rr, i) => i === 0 || rr < radii[i - 1]) && freq.every((f, i) => i === 0 || f > freq[i - 1]) && radii[radii.length - 1] < 0.1 * r0, `collapse spiral: radius falls from ${r0} to ${radii[radii.length - 1].toFixed(1)} px over ${turns} turns; orbital frequency ∝ r^(−3/2) rises throughout`);
  return svgDoc(w, h, 'Classical prediction for a Rutherford atom: the orbiting electron, being accelerated, radiates energy continuously and spirals into the nucleus, with its frequency of revolution rising, which would give a continuous spectrum and collapse in about ten to the minus eight seconds; observed atoms are stable and give sharp line spectra', s);
})();

// ================================================================ Bohr orbits (r ∝ n², v ∝ 1/n)
export const ORBITS = (() => {
  const w = 440;
  const h = 260;
  const c = [130, 130];
  const r1 = 7;
  const vk = 72;
  let s = S.circle(c[0], c[1], 4, { c: ACC, fill: ACC });
  const radii = [];
  const arrows = [];
  const at = { 1: 0, 2: -60, 3: -125, 4: -35 };
  for (const n of [1, 2, 3, 4]) {
    const rr = r1 * n * n;
    radii.push(rr);
    s += S.circle(c[0], c[1], rr, { c: BLUE, sw: 1.2 });
    if (n >= 2) {
      const a = deg(at[n]);
      const p = [c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)];
      const L = vk / n;
      const t = [Math.sin(a), -Math.cos(a)]; // tangent (anticlockwise on screen)
      arrows.push({ n, L, rr, p, t });
      s += S.circle(p[0], p[1], 3.5, { c: BLUE, fill: BLUE }) + S.arrow(p[0], p[1], p[0] + L * t[0], p[1] + L * t[1], { c: GRN, w: 1.5, size: 6 });
      s += lab(c[0] + rr * Math.cos(deg(55)) + 3, c[1] + rr * Math.sin(deg(55)) + 10, `n = ${n}`, { size: 10 });
    }
  }
  const tx = 280;
  s += lab(tx, 30, 'Bohr orbits of hydrogen', { size: 11, w: 'bold' });
  s += lab(tx, 48, 'rₙ = 0.53 n² Å (radii 1 : 4 : 9 : 16)', { size: 10 }) + lab(tx, 63, 'vₙ = 2.2 × 10⁶/n m s⁻¹ (green arrows)', { size: 10 }) + lab(tx, 78, 'L = nh/2π in each orbit', { size: 10 });
  s += lab(tx, 104, 'n', { size: 10, w: 'bold' }) + lab(tx + 30, 104, 'r (Å)', { size: 10, w: 'bold' }) + lab(tx + 90, 104, 'v (10⁶ m s⁻¹)', { size: 10, w: 'bold' });
  const rows = [1, 2, 3, 4].map((n) => [n, rn(n) * 1e10, vn(n) / 1e6]);
  rows.forEach(([n, rA, v], i) => {
    s += lab(tx, 122 + i * 17, String(n), { size: 10 }) + lab(tx + 30, 122 + i * 17, rA.toFixed(2), { size: 10 }) + lab(tx + 90, 122 + i * 17, v.toFixed(2), { size: 10 });
  });
  s += lab(tx, 205, 'innermost orbit n = 1; radii to scale;', { size: 10, c: MUT }) + lab(tx, 219, 'arrow lengths ∝ speed', { size: 10, c: MUT });
  check(radii[1] / radii[0] === 4 && radii[2] / radii[0] === 9 && radii[3] / radii[0] === 16, 'Bohr orbits drawn with r₁ : r₂ : r₃ : r₄ = 1 : 4 : 9 : 16');
  check(arrows.every((a) => close(a.L * a.n, vk) && Math.abs(a.t[0] * (a.p[0] - c[0]) + a.t[1] * (a.p[1] - c[1])) < 1e-9 && close(Math.hypot(a.p[0] - c[0], a.p[1] - c[1]), a.rr)), 'speed arrows tangent to their orbits with lengths in the ratio 1/2 : 1/3 : 1/4');
  check(close(rows[2][1], 4.77, 1e-6) && close(rows[3][2], 0.55, 1e-9), `table: r₃ = ${rows[2][1].toFixed(2)} Å, v₄ = ${rows[3][2].toFixed(2)} × 10⁶ m/s`);
  return svgDoc(w, h, 'Bohr orbits of hydrogen for n equals 1 to 4 drawn to scale, radii in the ratio 1 to 4 to 9 to 16; green arrows show the electron speed, which falls as 1 over n; a table lists radii 0.53, 2.12, 4.77 and 8.48 angstrom and speeds 2.2, 1.1, 0.73 and 0.55 million metres per second', s);
})();

// ================================================================ hydrogen energy levels to scale: excitation, cascade, ionisation
export const LEVELS = (() => {
  const w = 440;
  const h = 300;
  const y0 = 40; // E = 0
  const k = 17; // px per eV
  const yE = (E) => y0 - E * k;
  const x1 = 90;
  const x2 = 330;
  let s = S.rect(x1, 6, x2 - x1, y0 - 6, { c: 'none', sw: 0, fill: FILL }) + lab(x1 + 6, 22, 'E > 0: electron free (ionised)', { size: 10 });
  const ys = {};
  for (const n of [1, 2, 3, 4]) {
    const E = En(n);
    ys[n] = yE(E);
    s += S.line(x1, ys[n], x2, ys[n], { w: n === 1 ? 2.2 : 1.4 }) + lab(x1 - 6, ys[n] + 4, `n = ${n}`, { a: 'end', size: 10 });
    s += lab(x2 + 6, ys[n] + 4, `${E.toFixed(2)} eV`, { size: 10 });
  }
  s += S.line(x1, y0, x2, y0, { dash: '4 3' }) + lab(x1 - 6, y0 + 4, 'n = ∞', { a: 'end', size: 10 }) + lab(x2 + 6, y0 + 4, '0 eV', { size: 10 });
  s += lab(x2 + 6, ys[1] + 18, 'ground state', { size: 10, c: MUT });
  const arrows = [];
  const up = (x, lo, hi, c, label, ly) => {
    arrows.push({ x, from: ys[lo], to: hi === Infinity ? y0 : ys[hi], dE: (hi === Infinity ? 0 : En(hi)) - En(lo) });
    s += S.arrow(x, ys[lo], x, (hi === Infinity ? y0 : ys[hi]) + 1, { c, w: 1.6, size: 6 }) + lab(x + 5, ly, label, { size: 10, c });
  };
  const down = (x, hi, lo, c, label, ly) => {
    arrows.push({ x, from: ys[hi], to: ys[lo], dE: En(hi) - En(lo) });
    s += S.arrow(x, ys[hi], x, ys[lo] - 1, { c, w: 1.6, size: 6 }) + lab(x + 5, ly, label, { size: 10, c });
  };
  up(120, 1, Infinity, ACC, 'ionise', 150);
  s += lab(125, 164, '13.6 eV', { size: 10, c: ACC });
  up(200, 1, 3, BLUE, 'absorbs', 180);
  s += lab(205, 194, '12.09 eV', { size: 10, c: BLUE });
  down(262, 3, 2, RAY, '1.89 eV', 86);
  down(290, 2, 1, RAY, 'emits', 175);
  s += lab(295, 189, '10.2 eV', { size: 10, c: RAY });
  const gaps = [ys[1] - ys[2], ys[2] - ys[3]];
  check(close(gaps[0] / gaps[1], (13.6 * 0.75) / (13.6 * (1 / 4 - 1 / 9))) && close(ys[1] - y0, 13.6 * k), `levels to scale: E₂ − E₁ is ${(gaps[0] / gaps[1]).toFixed(2)} times E₃ − E₂`);
  check(arrows.every((a) => close(Math.abs(a.from - a.to), Math.abs(a.dE) * k)) && close(arrows[2].dE + arrows[3].dE, arrows[1].dE), 'arrow lengths equal the energy gaps; the cascade 3 → 2 → 1 gives back the 12.09 eV absorbed');
  return svgDoc(w, h, 'Energy-level diagram of hydrogen drawn to scale: n equals 1 at minus 13.6 electronvolts, n equals 2 at minus 3.40, n equals 3 at minus 1.51, n equals 4 at minus 0.85, and zero at n equals infinity, above which the electron is free; arrows show ionisation from the ground state with 13.6 electronvolts, absorption of 12.09 electronvolts raising the atom to n equals 3, and the cascade back down emitting 1.89 and 10.2 electronvolt photons', s);
})();

// ================================================================ schematic levels with the five series
export const SERIES_FIG = (() => {
  const w = 520;
  const h = 300;
  const Y = { 1: 268, 2: 196, 3: 154, 4: 122, 5: 98, 6: 80, [Infinity]: 34 };
  const x1 = 52;
  const x2 = 360;
  let s = '';
  for (const n of [1, 2, 3, 4, 5, 6]) s += S.line(x1, Y[n], x2, Y[n], { w: n === 1 ? 2 : 1.2 }) + lab(x1 - 6, Y[n] + 4, `n = ${n}`, { a: 'end', size: 10 });
  s += S.line(x1, Y[Infinity], x2, Y[Infinity], { dash: '4 3' }) + lab(x1 - 6, Y[Infinity] + 4, 'n = ∞', { a: 'end', size: 10 });
  s += lab(x2 + 8, 58, 'higher levels crowd', { size: 10, c: MUT }) + lab(x2 + 8, 72, 'together below n = ∞', { size: 10, c: MUT });
  const blocks = [
    { lo: 1, x: 66, c: BLUE },
    { lo: 2, x: 148, c: GRN },
    { lo: 3, x: 220, c: RAY },
    { lo: 4, x: 280, c: ACC },
    { lo: 5, x: 326, c: MUT },
  ];
  const drawn = [];
  for (const b of blocks) {
    const sr = SERIES.find((x) => x.lo === b.lo);
    let i = 0;
    for (const hi of [...[2, 3, 4, 5, 6].filter((n) => n > b.lo), Infinity]) {
      const x = b.x + i * 10;
      drawn.push({ lo: b.lo, hi, x, from: Y[hi], to: Y[b.lo] });
      s += S.arrow(x, Y[hi], x, Y[b.lo] - 1, { c: b.c, w: 1.3, size: 5, ...(hi === Infinity ? { dash: '3 2' } : {}) });
      i++;
    }
    s += lab(b.x - 2, Y[b.lo] + 14, sr.name, { size: 10, w: 'bold', c: b.c });
  }
  const tx = 372;
  s += lab(tx, 120, 'Series (ends on)', { size: 10, w: 'bold' });
  const short = ['UV', 'visible', 'IR', 'IR', 'far IR'];
  SERIES.forEach((sr, i) => {
    s += lab(tx, 138 + i * 15, `${sr.name}: n = ${sr.lo}, ${short[i]}`, { size: 10 });
  });
  s += lab(tx, 250, 'dashed: series limit', { size: 10, c: MUT }) + lab(tx, 264, 'not to scale', { size: 10, c: MUT });
  const order = [1, 2, 3, 4, 5, 6].map((n) => Y[n]);
  const gaps = order.slice(1).map((y, i) => order[i] - y);
  check(order.every((y, i) => i === 0 || y < order[i - 1]) && Y[Infinity] < Y[6] && gaps.every((g, i) => i === 0 || g < gaps[i - 1]), 'schematic levels: height rises with energy and the gaps shrink upwards, as on the true diagram');
  check(drawn.every((a) => a.from < a.to && a.to === Y[a.lo] && a.hi > a.lo) && drawn.length === 5 + 4 + 3 + 2 + 1 + 5, `${drawn.length} downward transitions, each ending on its series level`);
  return svgDoc(w, h, 'Schematic energy-level diagram of hydrogen, not to scale, with levels n equals 1 to 6 and infinity; downward arrows show the Lyman series ending on n equals 1, Balmer on n equals 2, Paschen on n equals 3, Brackett on n equals 4 and Pfund on n equals 5, each with a dashed arrow from infinity for its series limit; Lyman lines are ultraviolet, Balmer visible and near ultraviolet, Paschen and Brackett infrared, Pfund far infrared', s);
})();

// ================================================================ wavelength strip (logarithmic)
export const STRIP_DATA = { lmin: 80, lmax: 8000, x0: 70, x1: 450 };
export const STRIP = (() => {
  const w = 470;
  const h = 250;
  const { lmin, lmax, x0, x1 } = STRIP_DATA;
  const X = (nm) => x0 + ((x1 - x0) * Math.log10(nm / lmin)) / Math.log10(lmax / lmin);
  let s = S.rect(X(400), 30, X(700) - X(400), 168, { c: 'none', sw: 0, fill: GRN, fop: 0.12 }) + lab((X(400) + X(700)) / 2, 24, 'visible', { a: 'middle', size: 10, c: GRN });
  const rows = SERIES.map((sr, i) => ({ ...sr, y: 50 + i * 34 }));
  const lines = [];
  const cols = [BLUE, GRN, RAY, ACC, 'currentColor'];
  rows.forEach((sr, i) => {
    s += lab(x0 - 6, sr.y + 4, sr.name, { a: 'end', size: 10, w: 'bold' });
    s += S.line(x0, sr.y, x1, sr.y, { c: MUT, w: 0.8 });
    for (let hi = sr.lo + 1; hi <= sr.lo + 6; hi++) {
      const l = lamNm(sr.lo, hi);
      if (l > lmax) continue;
      lines.push({ lo: sr.lo, hi, l, x: X(l) });
      s += S.line(X(l), sr.y - 10, X(l), sr.y + 10, { c: cols[i], w: hi === sr.lo + 1 ? 2.2 : 1.3 });
    }
    const lim = lamNm(sr.lo, Infinity);
    lines.push({ lo: sr.lo, hi: Infinity, l: lim, x: X(lim) });
    s += S.line(X(lim), sr.y - 12, X(lim), sr.y + 12, { c: cols[i], w: 1.2, dash: '2 2' });
  });
  // axis
  const ay = 214;
  s += S.line(x0, ay, x1, ay, { w: 1.2 });
  for (const [v, t] of [[100, '100 nm'], [400, '400'], [700, '700'], [1000, '1 μm'], [2000, '2 μm'], [4000, '4 μm'], [8000, '8 μm']]) s += S.line(X(v), ay, X(v), ay + 5, { w: 1 }) + lab(X(v), ay + 17, t, { a: 'middle', size: 10 });
  s += lab((x0 + x1) / 2, 246, 'wavelength (logarithmic scale); thick line: first line, dashed: series limit', { a: 'middle', size: 10, c: MUT });
  const L = (lo, hi) => lines.find((x) => x.lo === lo && x.hi === hi);
  const balmerVisible = [3, 4, 5, 6].every((n) => region(lamNm(2, n)) === 'visible') && region(lamNm(2, 7)) === 'ultraviolet';
  const overlapPB = lamNm(4, Infinity) < lamNm(3, 4);
  const overlapBPf = lamNm(5, Infinity) < lamNm(4, 5);
  const gapLB = lamNm(1, 2) < lamNm(2, Infinity);
  check(lines.every((ln) => close(ln.x, X(ln.l)) && ln.x >= x0 && ln.x <= x1), `wavelength strip: ${lines.length} lines placed at log₁₀ λ`);
  check(balmerVisible && overlapPB && overlapBPf && gapLB && L(1, 2).x < L(2, Infinity).x, `strip: Balmer 3–6 → 2 visible, 7 → 2 at ${lamNm(2, 7).toFixed(0)} nm UV; Brackett limit ${lamNm(4, Infinity).toFixed(0)} nm < Paschen first ${lamNm(3, 4).toFixed(0)} nm; Pfund limit ${lamNm(5, Infinity).toFixed(0)} nm < Brackett first ${lamNm(4, 5).toFixed(0)} nm; Lyman ends ${lamNm(1, 2).toFixed(1)} nm below the Balmer limit ${lamNm(2, Infinity).toFixed(1)} nm`);
  return svgDoc(w, h, 'Wavelengths of the five hydrogen series on a logarithmic scale from 80 nanometres to 8 micrometres: Lyman from 91 to 122 nanometres in the ultraviolet; Balmer from 365 to 656 nanometres, its first four lines in the visible band; Paschen from 820 to 1875 nanometres; Brackett from 1.46 to 4.05 micrometres; Pfund from 2.28 to 7.46 micrometres; the Paschen, Brackett and Pfund ranges overlap in the infrared', s);
})();

export const ALL = { GEIGER, TRAJ, SPIRAL, ORBITS, LEVELS, SERIES_FIG, STRIP };
