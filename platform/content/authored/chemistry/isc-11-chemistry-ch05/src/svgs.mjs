// ISC 11 Chemistry ch05 Quantum Mechanical Model and Electronic Configuration: hand-drawn SVGs (allow-listed elements, palette
// colours only; geometry and data computed in JS, self-checked).
import { svgDoc, S, near } from './lib.mjs';
import { ORDER, ORDER_NAMES, radialInfo, Rfun, Pfun, config, total, unpaired, cap, orbitalsIn, LETTER, nodes, shortU } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const A = 'var(--diagram-accent)';
const M = 'var(--diagram-muted)';
const F = 'var(--diagram-fill)';

// deterministic generator
const rng = (seed) => {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
};
const f1 = (x) => (Math.round(x * 10) / 10).toFixed(1);

// ---------------------------------------------------------------- 1. Probability density of the 1s electron
// Radial distribution of 1s (a0 = 1): P(r) = 4 r^2 exp(-2r); cumulative probability inside r: 1 - exp(-2r)(1 + 2r + 2r^2).
const cum1s = (r) => 1 - Math.exp(-2 * r) * (1 + 2 * r + 2 * r * r);
const r90 = (() => {
  let lo = 0;
  let hi = 10;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (cum1s(mid) < 0.9) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
})();
export const R90 = r90;
chk(near(r90, 2.67, 0.005), `1s: 90% of the electron probability lies inside r = ${r90.toFixed(2)} a0 (boundary surface)`);
export const DENSITY = (() => {
  const out = [];
  const cx = 105;
  const cy = 128;
  const k = 22; // px per a0
  const next = rng(11);
  // inverse CDF table
  const grid = [];
  for (let r = 0; r <= 9; r += 0.002) grid.push([r, cum1s(r)]);
  const inv = (u) => grid.find(([, c]) => c >= u)[0];
  const N = 300;
  let inside = 0;
  out.push(lab(105, 18, 'Dot picture of a 1s electron', { a: 'middle', w: 'bold' }));
  out.push(S.circle(cx, cy, r90 * k, { c: R, sw: 1.5, dash: '5 4' }));
  for (let i = 0; i < N; i++) {
    const r = inv(next());
    const z = 2 * next() - 1;
    const phi = 2 * Math.PI * next();
    const s = Math.sqrt(1 - z * z);
    if (r < r90) inside++;
    out.push(S.circle(cx + r * k * s * Math.cos(phi), cy + r * k * s * Math.sin(phi), 1.4, { fill: B, fop: 0.6, c: B, sw: 0.4 }));
  }
  out.push(S.circle(cx, cy, 2.5, { fill: 'currentColor', c: 'currentColor' }));
  out.push(small(6, 214, 'Each dot is one snapshot of the electron.', { c: M }));
  out.push(small(6, 228, 'Red circle: holds 90% of the probability.', { c: M }));
  chk(inside / N > 0.86 && inside / N < 0.94, `dot picture: ${inside} of ${N} dots lie inside the 90% boundary radius (${((inside / N) * 100).toFixed(1)}%)`);
  // right panel: psi^2 and radial probability against r
  const x0 = 290;
  const y0 = 40;
  const w = 215;
  const h = 150;
  const X = (r) => x0 + (r / 5) * w;
  const Yf = (v) => y0 + h - v * h;
  out.push(lab(x0 + w / 2, 18, 'Density and radial probability', { a: 'middle', w: 'bold' }));
  out.push(S.line(x0, y0, x0, y0 + h, { w: 1.5 }));
  out.push(S.line(x0, y0 + h, x0 + w, y0 + h, { w: 1.5 }));
  for (let r = 0; r <= 5; r++) {
    out.push(S.line(X(r), y0 + h, X(r), y0 + h + 4));
    out.push(small(X(r), y0 + h + 16, String(r), { a: 'middle' }));
  }
  out.push(small(x0 + w / 2, y0 + h + 31, 'Distance from the nucleus, r / a₀', { a: 'middle' }));
  const pk = 4 * Math.exp(-2); // max of 4 r^2 exp(-2r) at r = 1
  const rel1 = (r) => Math.exp(-2 * r);
  const rel2 = (r) => (4 * r * r * Math.exp(-2 * r)) / pk;
  let d1 = '';
  let d2 = '';
  for (let i = 0; i <= 100; i++) {
    const r = (i / 100) * 5;
    d1 += `${i ? 'L' : 'M'}${X(r).toFixed(1)} ${Yf(rel1(r)).toFixed(1)} `;
    d2 += `${i ? 'L' : 'M'}${X(r).toFixed(1)} ${Yf(rel2(r)).toFixed(1)} `;
  }
  out.push(S.path(d1, { c: B, w: 2 }));
  out.push(S.path(d2, { c: R, w: 2 }));
  out.push(S.line(X(r90), y0, X(r90), y0 + h, { c: M, w: 1, dash: '3 3' }));
  out.push(small(X(r90) + 4, y0 + 8, '90% inside', { c: M }));
  out.push(lab(X(1.45), y0 + 112, 'ψ²', { c: B, w: 'bold' }));out.push(lab(X(1.45), y0 + 125, 'density', { c: B, w: 'bold' }));
  out.push(lab(X(3.1), y0 + 45, 'radial', { c: R, w: 'bold' }));out.push(lab(X(3.1), y0 + 58, 'probability', { c: R, w: 'bold' }));out.push(lab(X(3.1), y0 + 71, '4πr²ψ²', { c: R, w: 'bold' }));
  let mono = true;
  for (let i = 1; i <= 100; i++) if (rel1((i / 100) * 5) >= rel1(((i - 1) / 100) * 5)) mono = false;
  chk(mono && near(rel2(1), 1, 1e-9) && rel2(0.5) < 1 && rel2(2) < 1, 'curves: ψ² falls steadily from the nucleus; the radial probability 4πr²ψ² peaks at r = 1 a0');
  const info = radialInfo('1s');
  chk(near(info.integral, 1, 0.002) && near(info.rMax, 1, 0.01), `1s radial function normalised (integral ${info.integral.toFixed(4)}), most probable radius ${info.rMax.toFixed(2)} a0`);
  return svgDoc(
    530,
    240,
    'Probability picture of the 1s electron of hydrogen. On the left, three hundred dots show many snapshots of the electron position; they crowd near the nucleus and thin out with distance, and a dashed circle of radius 2.67 Bohr radii holds ninety percent of them. On the right the density psi squared falls steadily from the nucleus outward, while the radial probability, which includes the growing volume of each thin shell, is zero at the nucleus, peaks at one Bohr radius and then falls.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 2. Radial probability curves, six orbitals
const PANELS = [
  ['1s', 0, 0],
  ['2s', 0, 1],
  ['3s', 0, 2],
  ['2p', 1, 0],
  ['3p', 1, 1],
  ['3d', 1, 2],
];
export const RADIAL_INFO = {};
export const RADIAL = (() => {
  const out = [];
  const rmax = 24;
  const pw = 140;
  const ph = 82;
  PANELS.forEach(([name, row, col]) => {
    const x0 = 34 + col * 165;
    const y0 = 40 + row * 150;
    const n = Number(name[0]);
    const l = LETTER.indexOf(name[1]);
    const info = radialInfo(name);
    RADIAL_INFO[name] = info;
    const P = Pfun(name);
    const X = (r) => x0 + (r / rmax) * pw;
    const Yf = (p) => y0 + ph - (p / info.pMax) * ph * 0.95;
    out.push(S.line(x0, y0 + ph, x0 + pw, y0 + ph, { w: 1.2 }));
    out.push(S.line(x0, y0, x0, y0 + ph, { w: 1.2 }));
    let d = '';
    for (let i = 0; i <= 240; i++) {
      const r = (i / 240) * rmax;
      d += `${i ? 'L' : 'M'}${X(r).toFixed(1)} ${Yf(P(r)).toFixed(1)} `;
    }
    out.push(S.path(d, { c: B, w: 1.8 }));
    for (const rn of info.nodesAt) out.push(S.line(X(rn), y0 + 2, X(rn), y0 + ph, { c: R, w: 1.2, dash: '3 3' }));
    out.push(S.circle(X(info.rMax), Yf(info.pMax), 3, { fill: B, c: B }));
    const nd = nodes(n, l);
    out.push(lab(x0, y0 - 18, `${name}: ${nd.radial} radial node${nd.radial === 1 ? '' : 's'}`, { w: 'bold' }));
    out.push(small(x0, y0 - 6, info.nodesAt.length ? `at r = ${info.nodesAt.map((x) => f1(x)).join(', ')} a₀` : 'no node (other than r = 0)', { c: M }));
    chk(info.nodesAt.length === nd.radial, `radial curve ${name}: ${info.nodesAt.length} sign changes of R(r) = n − l − 1 = ${nd.radial}`);
    chk(near(info.integral, 1, 0.003), `radial curve ${name}: normalised (integral ${info.integral.toFixed(4)})`);
  });
  for (const col of [0, 1, 2]) {
    const x0 = 34 + col * 165;
    for (let t = 0; t <= 24; t += 6) {
      const x = x0 + (t / 24) * 140;
      out.push(S.line(x, 40 + 150 + 82, x, 40 + 150 + 86));
      out.push(small(x, 40 + 150 + 98, String(t), { a: 'middle' }));
    }
  }
  out.push(small(260, 304, 'Distance from the nucleus, r / a₀. Each curve is scaled to its own peak; the dot marks the most probable distance.', { a: 'middle', c: M }));
  const ri = RADIAL_INFO;
  chk(near(ri['1s'].rMax, 1.0, 0.01) && near(ri['2p'].rMax, 4.0, 0.01) && near(ri['3d'].rMax, 9.0, 0.01) && near(ri['3p'].rMax, 12.0, 0.01), `most probable r: 1s ${ri['1s'].rMax.toFixed(2)}, 2p ${ri['2p'].rMax.toFixed(2)}, 3p ${ri['3p'].rMax.toFixed(2)}, 3d ${ri['3d'].rMax.toFixed(2)} a0 (n² a0 for l = n − 1)`);
  chk(ri['2s'].nodesAt[0] > 1.99 && ri['2s'].nodesAt[0] < 2.01 && near(ri['3p'].nodesAt[0], 6, 0.005), `nodes: 2s at ${ri['2s'].nodesAt[0].toFixed(2)} a0, 3p at ${ri['3p'].nodesAt[0].toFixed(2)} a0, 3s at ${ri['3s'].nodesAt.map((x) => x.toFixed(2)).join(' and ')} a0`);
  chk(ri['2s'].peaks.length === 2 && ri['3s'].peaks.length === 3 && ri['3p'].peaks.length === 2 && ri['3d'].peaks.length === 1, 'peaks: 2s has 2, 3s has 3, 3p has 2, 3d has 1 (peaks = radial nodes + 1)');
  return svgDoc(
    530,
    312,
    'Radial probability curves for the 1s, 2s and 3s orbitals in the top row and the 2p, 3p and 3d orbitals in the bottom row, drawn against distance from the nucleus in Bohr radii. The 1s curve has one peak and no node. The 2s curve has one radial node at 2.0 Bohr radii and two peaks, and 3s has nodes at 1.9 and 7.1 and three peaks. The 2p curve has a single peak at 4, the 3p curve has one node at 6 and two peaks, and the 3d curve has a single peak at 9 and no radial node. The number of radial nodes is n minus l minus 1.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- shared drawing: lobes
function lobe(cx, cy, ang, len, wid, fill, fop = 0.45) {
  const rot = (x, y) => [cx + x * Math.cos(ang) - y * Math.sin(ang), cy + x * Math.sin(ang) + y * Math.cos(ang)];
  const p = (x, y) => rot(x, y).map((v) => v.toFixed(1)).join(' ');
  const d = `M ${p(0, 0)} C ${p(len * 0.25, -wid)} ${p(len * 0.85, -wid)} ${p(len, 0)} C ${p(len * 0.85, wid)} ${p(len * 0.25, wid)} ${p(0, 0)} Z`;
  return S.path(d, { fill, fop, c: fill, w: 1.5 });
}
const deg = (a) => (a * Math.PI) / 180;
const meanR = (n, l) => (3 * n * n - l * (l + 1)) / 2; // <r> in a0 for hydrogen-like orbitals

// ---------------------------------------------------------------- 3. s and p orbitals: size and orientation
export const ORB_SP = (() => {
  const out = [];
  const k = 4.6; // px per a0
  chk(meanR(1, 0) === 1.5 && meanR(2, 0) === 6 && meanR(3, 0) === 13.5 && meanR(2, 1) === 5 && meanR(3, 1) === 12.5, 'size: mean radius (3n² − l(l+1))/2 a0 gives 1.5, 6, 13.5 (s) and 5, 12.5 (2p, 3p)');
  // top-left: nested s orbitals
  const cx = 100;
  const cy = 84;
  out.push(lab(130, 14, 's orbitals: size grows with n', { a: 'middle', w: 'bold' }));
  [[3, 0.14], [2, 0.24], [1, 0.45]].forEach(([n, fop]) => out.push(S.circle(cx, cy, meanR(n, 0) * k, { fill: B, fop, c: B, sw: 1.3 })));
  [1, 2, 3].forEach((n) => out.push(small(cx + meanR(n, 0) * k + 3, cy + 4, `${n}s`, { c: 'currentColor', w: 'bold' })));
  out.push(S.circle(cx, cy, 2, { fill: 'currentColor', c: 'currentColor' }));
  // top-right: nested p orbitals along x
  const px = 395;
  out.push(lab(px - 10, 14, 'p orbitals: size grows with n', { a: 'middle', w: 'bold' }));
  [[3, 0.14], [2, 0.3]].forEach(([n, fop]) => {
    const L = meanR(n, 1) * k;
    out.push(lobe(px, cy, 0, L, L * 0.3, B, fop));
    out.push(lobe(px, cy, Math.PI, L, L * 0.3, R, fop));
    out.push(small(px + L + 2, cy - 8, `${n}p`, { w: 'bold' }));
  });
  out.push(S.line(px, cy - 38, px, cy + 38, { c: M, w: 1, dash: '3 3' }));
  out.push(small(px + 4, cy + 34, 'nodal plane', { c: M }));
  out.push(S.circle(px, cy, 2, { fill: 'currentColor', c: 'currentColor' }));
  // bottom row: px, py, pz
  const by = 238;
  const pairs = [
    { x: 90, name: 'px', ang: deg(-35), axis: 'x', plane: 'yz plane' },
    { x: 260, name: 'py', ang: 0, axis: 'y', plane: 'xz plane' },
    { x: 430, name: 'pz', ang: deg(-90), axis: 'z', plane: 'xy plane' },
  ];
  out.push(lab(260, 164, 'The three p orbitals of one shell point along the three axes', { a: 'middle', w: 'bold' }));
  for (const p of pairs) {
    const L = 42;
    out.push(lobe(p.x, by, p.ang, L, 15, B));
    out.push(lobe(p.x, by, p.ang + Math.PI, L, 15, R));
    // nodal plane as dashed line perpendicular to the lobe axis
    const pa = p.ang + Math.PI / 2;
    out.push(S.line(p.x - 46 * Math.cos(pa), by - 46 * Math.sin(pa), p.x + 46 * Math.cos(pa), by + 46 * Math.sin(pa), { c: M, w: 1, dash: '3 3' }));
    // axis arrow beyond the positive lobe
    out.push(S.arrow(p.x + (L + 4) * Math.cos(p.ang), by + (L + 4) * Math.sin(p.ang), p.x + (L + 24) * Math.cos(p.ang), by + (L + 24) * Math.sin(p.ang), { c: 'currentColor', w: 1.2, size: 6 }));
    out.push(lab(p.x + (L + 33) * Math.cos(p.ang) - 4, by + (L + 33) * Math.sin(p.ang) + 4, p.axis, { it: true }));
    out.push(S.circle(p.x, by, 2, { fill: 'currentColor', c: 'currentColor' }));
    out.push(lab(p.x, by + 62, p.name, { a: 'middle', w: 'bold' }));
    out.push(small(p.x, by + 75, `one nodal plane: ${p.plane}`, { a: 'middle', c: M }));
  }
  out.push(small(260, 330, 'Blue and red lobes: opposite signs of the wave function; the nucleus lies on the nodal plane.', { a: 'middle', c: M }));
  chk(nodes(2, 1).angular === 1 && pairs.length === 3, 'p orbitals: three orientations (ml = −1, 0, +1), each with l = 1 angular node (one nodal plane)');
  return svgDoc(
    520,
    340,
    'Size and orientation of s and p orbitals. Top left: spherical 1s, 2s and 3s orbitals drawn as nested circles of growing radius. Top right: dumbbell-shaped 2p and 3p orbitals with the larger 3p orbital enclosing the 2p, both separated by a nodal plane through the nucleus. Bottom: the three p orbitals, p x, p y and p z, each a pair of lobes of opposite sign along one axis with one nodal plane perpendicular to that axis.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 4. d orbitals
export const ORB_D = (() => {
  const out = [];
  const cy = 98;
  const L = 38;
  const W = 12;
  const items = [
    { name: 'dxy', ax: ['x', 'y'], kind: 'diag', sign: [1, -1, 1, -1], nod: 'planes xz and yz' },
    { name: 'dyz', ax: ['y', 'z'], kind: 'diag', sign: [1, -1, 1, -1], nod: 'planes xy and xz' },
    { name: 'dxz', ax: ['x', 'z'], kind: 'diag', sign: [1, -1, 1, -1], nod: 'planes xy and yz' },
    { name: 'dx²−y²', ax: ['x', 'y'], kind: 'axial', sign: [1, -1, 1, -1], nod: 'planes at 45° to x and y' },
    { name: 'dz²', ax: ['y', 'z'], kind: 'z2', nod: 'two nodal cones' },
  ];
  const cone = (Math.acos(1 / Math.sqrt(3)) * 180) / Math.PI;
  chk(near(cone, 54.74, 0.001), `d_z²: nodal cones at ${cone.toFixed(2)}° from the z axis`);
  items.forEach((it, i) => {
    const cx = 56 + i * 104;
    const dashed = (a, len) => S.line(cx - len * Math.cos(a), cy - len * Math.sin(a), cx + len * Math.cos(a), cy + len * Math.sin(a), { c: M, w: 1, dash: '3 3' });
    if (it.kind === 'diag') {
      [45, 135, 225, 315].forEach((a, j) => out.push(lobe(cx, cy, deg(a), L, W, it.sign[j] > 0 ? B : R)));
      out.push(dashed(0, 46));
      out.push(dashed(deg(90), 46));
    } else if (it.kind === 'axial') {
      [0, 90, 180, 270].forEach((a, j) => out.push(lobe(cx, cy, deg(a), L, W, it.sign[j] > 0 ? B : R)));
      out.push(dashed(deg(45), 46));
      out.push(dashed(deg(-45), 46));
    } else {
      out.push(lobe(cx, cy, deg(-90), 44, W, B));
      out.push(lobe(cx, cy, deg(90), 44, W, B));
      out.push(S.ellipse(cx, cy, 24, 7, { fill: R, fop: 0.35, c: R }));
      const t = deg(90 - cone);
      out.push(dashed(t, 46));
      out.push(dashed(-t, 46));
    }
    out.push(S.circle(cx, cy, 2, { fill: 'currentColor', c: 'currentColor' }));
    out.push(small(cx + 49, cy + 4, it.ax[0], { it: true }));
    out.push(small(cx - 3, cy - 50, it.ax[1], { it: true }));
    out.push(lab(cx, 168, it.name, { a: 'middle', w: 'bold' }));
    out.push(small(cx, 182, it.nod, { a: 'middle', c: M }));
  });
  out.push(lab(260, 14, 'The five 3d orbitals: l = 2, so two angular nodes each', { a: 'middle', w: 'bold' }));
  out.push(small(260, 208, 'Each drawing is a cross-section in the plane of the two axes named.', { a: 'middle', c: M }));
  out.push(small(260, 222, 'Dashed lines: nodal planes (or cones) through the nucleus. Blue and red: opposite signs of the wave function.', { a: 'middle', c: M }));
  chk(items.length === 5 && items.length === orbitalsIn(2), 'd orbitals: five (ml = −2 … +2), each with l = 2 angular nodes');
  return svgDoc(
    530,
    232,
    'The five d orbitals in cross-section. The d xy, d yz and d xz orbitals each have four lobes lying between the axes, with two nodal planes along the axes. The d x squared minus y squared orbital has four lobes along the x and y axes, with nodal planes at forty-five degrees. The d z squared orbital has two lobes along the z axis and a ring in the xy plane, with two nodal cones at 54.7 degrees to the z axis. Every d orbital has two angular nodes.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 5. Shells, subshells and orbitals
export const SHELLS = (() => {
  const out = [];
  const bw = 15;
  const gap = 2;
  const sg = 12;
  let orbs = 0;
  let els = 0;
  out.push(lab(6, 14, 'Shell', { w: 'bold' }));
  out.push(lab(95, 14, 'Subshells and their orbitals (one box = one orbital, holds 2 electrons)', { w: 'bold', size: 10 }));
  for (let n = 1; n <= 4; n++) {
    const y = 28 + (n - 1) * 52;
    out.push(lab(6, y + 14, `n = ${n}`, { w: 'bold' }));
    out.push(small(6, y + 28, ['K', 'L', 'M', 'N'][n - 1] + ' shell', { c: M }));
    let x = 95;
    let count = 0;
    for (let l = 0; l < n; l++) {
      const nb = orbitalsIn(l);
      for (let b = 0; b < nb; b++) {
        out.push(S.rect(x + b * (bw + gap), y, bw, bw, { c: 'currentColor', sw: 1.2, fill: [B, G, Y, R][l], fop: 0.4 }));
        count++;
      }
      out.push(small(x + (nb * (bw + gap) - gap) / 2, y + 28, `${n}${LETTER[l]}`, { a: 'middle', w: 'bold' }));
      x += nb * (bw + gap) + sg;
    }
    out.push(small(x + 4, y + 11, `${count} orbital${count === 1 ? '' : 's'}, ${2 * count} electrons`, { c: 'currentColor' }));
    chk(count === n * n, `shell n = ${n}: ${count} orbitals = n² = ${n * n}`);
    orbs += count;
    els += 2 * count;
  }
  chk(orbs === 30 && els === 60, `first four shells: ${orbs} orbitals, ${els} electrons`);
  return svgDoc(
    540,
    232,
    'Boxes for the orbitals of the first four shells. Shell n equals 1 has one s orbital. Shell 2 has an s orbital and three p orbitals, four in all. Shell 3 has one s, three p and five d orbitals, nine in all. Shell 4 has one s, three p, five d and seven f orbitals, sixteen in all. Each shell has n squared orbitals and can hold two n squared electrons: 2, 8, 18 and 32.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 6. Aufbau order, the (n + l) diagram
export const AUFBAU = (() => {
  const out = [];
  const std = '1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p'.split(' ');
  const shown = ORDER.slice(0, 19);
  chk(shown.map((s) => s.name).join(' ') === std.join(' '), 'Aufbau order from (n + l), ties by lower n, matches the standard sequence of 19 subshells');
  const colX = (l) => 128 + l * 78;
  const rowY = (n) => 36 + (n - 1) * 40;
  const cell = { w: 58, h: 26 };
  const ctr = (s) => [colX(s.l) + cell.w / 2, rowY(s.n) + cell.h / 2];
  const idx = new Map(shown.map((s, i) => [s.name, i + 1]));
  ['s (l = 0)', 'p (l = 1)', 'd (l = 2)', 'f (l = 3)'].forEach((t, l) => out.push(small(colX(l) + cell.w / 2, 24, t, { a: 'middle', w: 'bold' })));
  for (let n = 1; n <= 7; n++) out.push(lab(20, rowY(n) + 18, `n = ${n}`, { w: 'bold' }));
  // arrows through cells with the same n + l (behind the cells)
  const groups = new Map();
  for (const s of shown) groups.set(s.nl, [...(groups.get(s.nl) ?? []), s]);
  const palette = [B, R, G, A, Y];
  [...groups.entries()].forEach(([nl, g], gi) => {
    for (let i = 0; i + 1 < g.length; i++) {
      const [x1, y1] = ctr(g[i]);
      const [x2, y2] = ctr(g[i + 1]);
      out.push(S.line(x1, y1, x2, y2, { c: palette[gi % 5], w: 2 }));
      out.push(S.midHead(x1, y1, x2, y2, { c: palette[gi % 5], size: 9 }));
    }
    chk(g.every((s, i) => i === 0 || (s.n > g[i - 1].n && s.l < g[i - 1].l)), `n + l = ${nl}: ${g.map((s) => s.name).join(', ')} in order of rising n (falling l)`);
  });
  for (const s of shown) {
    out.push(S.rect(colX(s.l), rowY(s.n), cell.w, cell.h, { c: 'currentColor', sw: 1.2, fill: F, rx: 4 }));
    out.push(lab(colX(s.l) + 8, rowY(s.n) + 18, s.name, { w: 'bold' }));
    out.push(small(colX(s.l) + cell.w - 6, rowY(s.n) + 18, String(idx.get(s.name)), { a: 'end', c: M }));
  }
  out.push(small(20, 328, 'Number in a box: order of filling (1 to 19).', { c: M }));
  out.push(small(20, 342, 'Arrows join subshells with the same n + l; the one with lower n fills first.', { c: M }));
  out.push(lab(20, 362, shown.slice(0, 10).map((s) => s.name).join(' < ') + ' <', { size: 11, w: 'bold' }));
  out.push(lab(20, 378, shown.slice(10).map((s) => s.name).join(' < '), { size: 11, w: 'bold' }));
  return svgDoc(
    470,
    388,
    'Diagram for the order of filling of subshells. Rows are shells n equals 1 to 7 and columns are s, p, d and f subshells, each box numbered in order of filling. Coloured arrows join subshells with the same value of n plus l, running from the lower shell to the higher one. The order is 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 7. Orbital boxes for atoms and ions
function boxCells(nb, ne) {
  const cells = Array.from({ length: nb }, () => ({ up: false, down: false }));
  for (let e = 0; e < ne; e++) {
    if (e < nb) cells[e].up = true;
    else cells[e - nb].down = true;
  }
  return cells;
}
export const BOXES = (() => {
  const out = [];
  const rows = [
    { name: 'P', z: 15, q: 0, subs: ['3s', '3p'] },
    { name: 'Fe', z: 26, q: 0, subs: ['3d', '4s'] },
    { name: 'Fe³⁺', z: 26, q: 3, subs: ['3d', '4s'] },
    { name: 'Cr', z: 24, q: 0, subs: ['3d', '4s'] },
    { name: 'Cu', z: 29, q: 0, subs: ['3d', '4s'] },
  ];
  rows.forEach((row, ri) => {
    const y = 16 + ri * 52;
    const occ = config(row.z, row.q);
    const get = (nm) => (occ.find(([s]) => s === nm) ?? [nm, 0])[1];
    out.push(lab(6, y + 17, `${row.name} (Z = ${row.z})`, { w: 'bold' }));
    let shownE = 0;
    let x = 140;
    const coreE = row.z - row.q - row.subs.reduce((a, s) => a + get(s), 0);
    out.push(lab(100, y + 17, coreE === 10 ? '[Ne]' : '[Ar]', { size: 11 }));
    chk(coreE === 10 || coreE === 18, `box diagram ${row.name}: core has ${coreE} electrons`);
    let drawn = 0;
    for (const nm of row.subs) {
      const nb = orbitalsIn(LETTER.indexOf(nm[1]));
      const cells = boxCells(nb, get(nm));
      cells.forEach((c, i) => {
        const bx = x + i * 24;
        out.push(S.rect(bx, y, 22, 24, { sw: 1.4 }));
        if (c.up) out.push(S.arrow(bx + 7, y + 20, bx + 7, y + 5, { size: 5, w: 1.5, c: B }));
        if (c.down) out.push(S.arrow(bx + 15, y + 5, bx + 15, y + 20, { size: 5, w: 1.5, c: R }));
        drawn += (c.up ? 1 : 0) + (c.down ? 1 : 0);
      });
      out.push(small(x + (nb * 24 - 2) / 2, y + 38, nm, { a: 'middle' }));
      x += nb * 24 + 16;
      shownE += get(nm);
    }
    const un = unpaired(occ);
    out.push(lab(x + 4, y + 17, `${un} unpaired`, { size: 11 }));
    chk(coreE + drawn === row.z - row.q, `box diagram ${row.name}: ${coreE + drawn} electrons drawn = Z − charge, ${un} unpaired`);
  });
  out.push(small(270, 284, 'Up and down arrows: opposite spins. Fill each box of a subshell singly first (Hund); two per box at most (Pauli).', { a: 'middle', c: M }));
  return svgDoc(
    540,
    294,
    'Orbital box diagrams. Phosphorus: neon core, 3s paired, and three singly filled 3p boxes, three unpaired electrons. Iron: argon core, 3d six with four unpaired electrons and 4s paired. The Fe three plus ion: 3d five, all five unpaired, and an empty 4s. Chromium: 3d five and 4s one, six unpaired electrons. Copper: 3d ten full and 4s one, one unpaired electron.',
    out.join(''),
  );
})();
void total;
void cap;
void shortU;
void Rfun;
void Y;
