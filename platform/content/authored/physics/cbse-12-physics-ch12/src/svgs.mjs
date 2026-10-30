// ch12 diagrams: the Geiger–Marsden arrangement; alpha-particle paths past a nucleus computed by integrating the Coulomb
// repulsion (each deflection checked against tan(θ/2) = d/2b); Bohr orbits drawn with r ∝ n²; and the hydrogen energy-level
// diagram drawn to scale with the Lyman, Balmer and Paschen series. SELF_CHECKS read by build.mjs.
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const deg = (d) => (d * Math.PI) / 180;
const todeg = (x) => (x * 180) / Math.PI;

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- Geiger–Marsden arrangement
export const GEIGER = (() => {
  const w = 420;
  const h = 240;
  const fx = 230;
  const fy = 120;
  let s = S.rect(20, 95, 50, 50, { fill: MUT, fop: 0.35 }) + S.circle(45, 120, 6, { c: RAY, fill: RAY }) + S.text(45, 162, 'lead box', { a: 'middle', size: 10 }) + S.text(45, 176, 'with source', { a: 'middle', size: 10 });
  s += S.rect(100, 100, 12, 16, { fill: MUT, fop: 0.6 }) + S.rect(100, 124, 12, 16, { fill: MUT, fop: 0.6 }) + S.text(106, 92, 'collimator', { a: 'middle', size: 10 });
  s += S.arrow(70, 120, fx - 4, 120, { c: RAY, w: 1.6, size: 6 }) + S.text(150, 112, 'α beam', { a: 'middle', size: 10, c: RAY });
  s += S.line(fx, 70, fx, 170, { c: ACC, w: 3 }) + S.text(fx, 62, 'thin gold foil', { a: 'middle', size: 10 });
  // detector circle and positions
  s += S.circle(fx, fy, 90, { c: MUT, dash: '4 4' });
  const th = 50;
  const dx = fx + 90 * Math.cos(deg(-th));
  const dy = fy + 90 * Math.sin(deg(-th));
  s += S.arrow(fx, fy, dx, dy, { c: RAY, w: 1.4, size: 6 });
  s += S.rect(dx - 9, dy - 9, 18, 18, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.text(dx + 14, dy - 4, 'ZnS screen +', { size: 10 }) + S.text(dx + 14, dy + 9, 'microscope', { size: 10 });
  s += S.path(`M${f1(fx + 40)} ${fy} A40 40 0 0 0 ${f1(fx + 40 * Math.cos(deg(-th)))} ${f1(fy + 40 * Math.sin(deg(-th)))}`, { c: GRN, w: 1.4 }) + S.text(fx + 46, fy - 14, 'θ', { size: 12, w: 'bold', c: GRN });
  s += S.text(w - 6, h - 8, 'detector turns round the foil to count α at each θ', { a: 'end', size: 10 });
  check(Math.abs(Math.hypot(dx - fx, dy - fy) - 90) < 1e-9, 'Geiger–Marsden: detector drawn on the circle round the foil at θ = 50°');
  return svgDoc(w, h, 'Geiger–Marsden experiment: alpha particles from a source in a lead box pass through a collimator to a thin gold foil; a zinc sulphide screen with a microscope moves round the foil to count the particles scattered through each angle theta', s);
})();

// ---------------------------------------------------------------- alpha trajectories (computed)
export const TRAJ = (() => {
  const w = 420;
  const h = 240;
  const N = [250, 200]; // nucleus position
  const d = 34; // distance of closest approach for a head-on collision (px)
  const Cc = d / 2; // with m = 1, v₀ = 1: d = 2C/v₀²
  const run = (b) => {
    // start far away (r = 20 000 px) with total energy ½ (speed 1 at infinity) and angular momentum b
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
      if (Math.abs(x) < 320 && Math.abs(y) < 320 && (!lastP || Math.hypot(x - lastP[0], y - lastP[1]) > 3)) {
        lastP = [x, y];
        pts.push(lastP);
      }
      if (Math.hypot(x, y) > R0 && x * vx + y * vy > 0) break;
    }
    const theta = todeg(Math.atan2(-vy, vx)); // deflection measured from the incident direction (+x), upward positive on screen
    return { pts, theta: Math.abs(theta), rmin };
  };
  let s = S.circle(N[0], N[1], 5, { c: ACC, fill: ACC }) + S.text(N[0] + 8, N[1] + 18, 'nucleus (+Ze)', { size: 10 });
  const res = [];
  for (const b of [0.0001, 8, 20, 45, 90]) {
    const t = run(b);
    res.push({ b, ...t });
    const vis = t.pts.filter(([px, py]) => N[0] + px > -5 && N[0] + px < w + 5 && N[1] + py > -5 && N[1] + py < h + 5);
    const dpath = vis.map(([px, py], i) => `${i ? 'L' : 'M'}${f1(N[0] + px)} ${f1(N[1] + py)}`).join(' ');
    s += S.path(dpath, { c: RAY, w: 1.4 });
    s += S.arrow(N[0] + vis[0][0], N[1] + vis[0][1], N[0] + vis[0][0] + 30, N[1] + vis[0][1], { c: RAY, w: 1.4, size: 6 });
    const last = vis[vis.length - 1];
    const prev = vis[vis.length - 3];
    s += S.arrow(N[0] + prev[0], N[1] + prev[1], N[0] + last[0], N[1] + last[1], { c: RAY, w: 1.4, size: 6 });
  }
  s += S.text(8, 18, 'α particles: smaller impact parameter b → larger deflection θ', { size: 11, w: 'bold' });
  s += S.text(8, h - 10, 'head-on: turns back at the distance of closest approach', { size: 10 });
  for (const t of res) {
    const pred = 2 * todeg(Math.atan(d / (2 * t.b)));
    check(Math.abs(t.theta - pred) < 1.0, `α path b = ${t.b < 1 ? 0 : t.b} px: computed deflection ${t.theta.toFixed(1)}° vs tan(θ/2) = d/2b → ${pred.toFixed(1)}°`);
  }
  check(Math.abs(res[0].rmin - d) < 0.5, `head-on α turns back at r = ${res[0].rmin.toFixed(1)} px = d`);
  return svgDoc(w, h, 'Paths of alpha particles approaching a gold nucleus with different impact parameters, computed from the Coulomb repulsion: a head-on particle stops and turns back, close ones are deflected through large angles and distant ones are hardly deflected', s);
})();

// ---------------------------------------------------------------- Bohr orbits (r ∝ n²)
export const ORBITS = (() => {
  const w = 420;
  const h = 260;
  const c = [150, 130];
  const r1 = 12;
  let s = S.circle(c[0], c[1], 5, { c: ACC, fill: ACC }) + S.text(c[0] + 4, c[1] + 18, '+', { size: 10 });
  const radii = [];
  for (const n of [1, 2, 3]) {
    const rr = r1 * n * n;
    radii.push(rr);
    s += S.circle(c[0], c[1], rr, { c: BLUE, sw: 1.3 }) + S.text(c[0] + rr * Math.cos(deg(-35)) + 4, c[1] + rr * Math.sin(deg(-35)) - 4, `n = ${n}`, { size: 10 });
  }
  // electron jumps 3 → 2 and emits a photon
  const p3 = [c[0] + radii[2] * Math.cos(deg(30)), c[1] + radii[2] * Math.sin(deg(30))];
  const p2 = [c[0] + radii[1] * Math.cos(deg(30)), c[1] + radii[1] * Math.sin(deg(30))];
  s += S.circle(p3[0], p3[1], 4, { c: GRN, fill: GRN }) + S.arrow(p3[0], p3[1], p2[0] + 2, p2[1] + 1, { c: GRN, w: 1.5, size: 6 });
  let wave = `M${f1(p3[0] + 6)} ${f1(p3[1] + 8)}`;
  for (let k = 0; k < 6; k++) wave += ` q 4 ${k % 2 ? 6 : -6} 8 6`;
  s += S.path(wave, { c: RAY, w: 1.4 }) + S.text(p3[0] + 10, p3[1] + 52, 'photon hν = E₃ − E₂', { size: 10, c: RAY });
  s += S.text(w - 6, 30, 'radii in the ratio 1 : 4 : 9', { a: 'end', size: 11, w: 'bold' }) + S.text(w - 6, 48, 'L = nh/2π in each orbit', { a: 'end', size: 11 });
  check(radii[1] / radii[0] === 4 && radii[2] / radii[0] === 9, 'Bohr orbits drawn with r₁ : r₂ : r₃ = 1 : 4 : 9');
  return svgDoc(w, h, 'Bohr orbits of hydrogen drawn to scale with radii in the ratio one to four to nine; an electron jumping from the third orbit to the second emits a photon whose energy equals the difference of the two energy levels', s);
})();

// ---------------------------------------------------------------- hydrogen energy levels (to scale) with series
export const LEVELS = (() => {
  const w = 420;
  const h = 300;
  const y0 = 24; // E = 0
  const k = 19; // px per eV
  const yE = (E) => y0 - E * k;
  const x1 = 70;
  const x2 = 400;
  let s = '';
  const levels = [];
  for (const n of [1, 2, 3, 4]) {
    const E = -13.6 / (n * n);
    levels.push(yE(E));
    s += S.line(x1, yE(E), x2, yE(E), { w: n === 1 ? 2 : 1.4 }) + S.text(x1 - 6, yE(E) + 4, `n = ${n}`, { a: 'end', size: 10 });
    s += S.text(x2, yE(E) - 4, `${E.toFixed(2)} eV`, { a: 'end', size: 10 });
  }
  s += S.line(x1, y0, x2, y0, { dash: '4 3' }) + S.text(x1 - 6, y0 + 4, 'n = ∞', { a: 'end', size: 10 }) + S.text(x2, y0 - 4, '0 eV', { a: 'end', size: 10 });
  const series = [
    { name: 'Lyman (UV)', lo: 1, xs: 100, c: BLUE },
    { name: 'Balmer (visible)', lo: 2, xs: 210, c: GRN },
    { name: 'Paschen (IR)', lo: 3, xs: 320, c: RAY },
  ];
  for (const sr of series) {
    let i = 0;
    for (let hi = sr.lo + 1; hi <= 4; hi++) {
      const x = sr.xs + i * 12;
      s += S.arrow(x, yE(-13.6 / (hi * hi)), x, yE(-13.6 / (sr.lo * sr.lo)) - 1, { c: sr.c, w: 1.3, size: 5 });
      i++;
    }
    s += S.text(sr.xs + 14, yE(-13.6 / (sr.lo * sr.lo)) + 14, sr.name, { size: 10, w: 'bold', c: sr.c });
  }
  const gaps = [levels[0] - levels[1], levels[1] - levels[2]];
  check(Math.abs(gaps[0] / gaps[1] - (13.6 * 0.75) / (13.6 * (1 / 4 - 1 / 9))) < 1e-9 && Math.abs(levels[0] - yE(-13.6)) < 1e-9, `hydrogen levels drawn to scale: E₂ − E₁ = 10.2 eV is ${(gaps[0] / gaps[1]).toFixed(2)} times E₃ − E₂ = 1.89 eV`);
  return svgDoc(w, h, 'Energy-level diagram of hydrogen drawn to scale, from minus 13.6 electronvolts at n equals 1 up to zero at infinity, with downward transitions to n equals 1 forming the ultraviolet Lyman series, to n equals 2 the visible Balmer series, and to n equals 3 the infrared Paschen series', s);
})();

export const ALL = { GEIGER, TRAJ, ORBITS, LEVELS };
