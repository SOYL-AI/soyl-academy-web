// Hand-drawn SVG schematics for ch02 Structure of Atom (allow-listed elements, palette colours only; geometry computed in JS).
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const RH = 1.097e7; // Rydberg constant, m^-1
const lam = (nLow, nHigh) => 1e9 / (RH * (1 / nLow ** 2 - 1 / nHigh ** 2)); // nm

// ---------------------------------------------------------------- 1. Rutherford alpha-scattering
chk(near(lam(1, 2), 121.5, 0.003) && near(lam(2, 3), 656.3, 0.002) && near(lam(2, 4), 486.2, 0.002) && near(lam(3, 4), 1875, 0.003), 'Rydberg wavelengths: 121.5, 656.3, 486.2 and 1875 nm');
export const SCATTER = (() => {
  const nx = 250, ny = 105; // nucleus
  const out = [];
  // foil: two columns of atoms drawn as small circles
  for (const x of [236, 250, 264]) for (let y = 20; y <= 190; y += 17) out.push(S.circle(x, y, 3, { c: 'var(--diagram-muted)', sw: 1 }));
  out.push(S.circle(nx, ny, 3.5, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }));
  out.push(lab(nx + 8, ny - 8, 'nucleus', { size: 10, c: 'var(--diagram-red)' }));
  // source and beam
  out.push(S.rect(18, 92, 40, 26, { fill: 'var(--diagram-fill)', fop: 0.6, rx: 3 }));
  out.push(lab(38, 109, 'α source', { a: 'middle', size: 10 }));
  const al = 'var(--diagram-blue)';
  // paths: straight through (several), small deflection, large deflection, rebound
  for (const y of [40, 70, 140, 170]) out.push(S.arrow(60, y, 420, y, { c: al, w: 1.5, size: 7 }));
  out.push(S.path(`M 60 ${ny - 22} L 236 ${ny - 22} Q 262 ${ny - 22} 300 ${ny - 52}`, { c: al, w: 1.5 }));
  out.push(S.head(300, ny - 52, -0.8, { c: al, size: 7 }));
  out.push(S.path(`M 60 ${ny + 12} L 230 ${ny + 12} Q 262 ${ny + 12} 282 ${ny + 60}`, { c: al, w: 1.5 }));
  out.push(S.head(282, ny + 60, 1.2, { c: al, size: 7 }));
  out.push(S.path(`M 60 ${ny - 5} L 215 ${ny - 5} Q 246 ${ny - 5} 238 ${ny - 30}`, { c: al, w: 1.5 }));
  out.push(S.path(`M 238 ${ny - 30} Q 232 ${ny - 55} 160 ${ny - 74}`, { c: al, w: 1.5, dash: '4 3' }));
  out.push(S.head(160, ny - 74, Math.PI + 0.3, { c: al, size: 7 }));
  out.push(lab(430, 158, 'most pass straight through', { size: 10, a: 'end' }));
  out.push(lab(325, 52, 'a few small deflections', { size: 10 }));
  out.push(lab(178, 38, 'very few rebound', { size: 10, c: 'var(--diagram-red)' }));
  out.push(lab(250, 207, 'thin gold foil', { a: 'middle', size: 10 }));
  out.push(S.lead(250, 195, 250, 200));
  return svgDoc(
    440,
    215,
    'Rutherford alpha-particle scattering. Alpha particles from a source travel towards a thin gold foil. Most pass straight through, which shows the atom is mostly empty space. A few are deflected through small angles and very few rebound almost the way they came, which shows a small, dense, positively charged nucleus at the centre of the atom.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 2. Hydrogen energy levels and spectral series
const E1 = -2.18; // x 10^-18 J
const En = (n) => E1 / n ** 2;
const y0 = 34;
const kpx = 110;
const yOf = (n) => y0 + kpx * Math.abs(En(n));
chk(near(En(2), -0.545, 1e-9) && near(En(3), -0.2422, 0.001) && near(En(4), -0.1363, 0.001), 'Bohr energies -2.18/n^2: n=2 -0.545, n=3 -0.242, n=4 -0.136 (x 1e-18 J)');
chk(yOf(1) < 290 && yOf(3) - yOf(4) > 10, 'energy-level diagram fits and labels for n = 3 and 4 do not overlap');
export const ENERGY = (() => {
  const out = [];
  out.push(S.line(46, y0, 290, y0, { dash: '5 4', c: 'var(--diagram-muted)' }));
  out.push(lab(54, y0 + 4, 'n = ∞', { a: 'end', size: 10 }));
  out.push(lab(296, y0 + 4, 'E = 0 (electron free)', { size: 10 }));
  for (let n = 1; n <= 6; n++) {
    const y = yOf(n);
    out.push(S.line(60, y, 280, y, { w: 2 }));
    if (n <= 4) {
      out.push(lab(54, y + 4, `n = ${n}`, { a: 'end', size: 10 }));
      out.push(lab(296, y + 4, `E = ${En(n).toFixed(n === 1 ? 2 : n === 2 ? 3 : 3)} × 10⁻¹⁸ J`, { size: 10 }));
    }
  }
  const series = [
    { name: 'Lyman', to: 1, from: [4, 3, 2], x0: 78, c: 'var(--diagram-blue)' },
    { name: 'Balmer', to: 2, from: [5, 4, 3], x0: 150, c: 'var(--diagram-red)' },
    { name: 'Paschen', to: 3, from: [5, 4], x0: 222, c: 'var(--diagram-brown)' },
  ];
  for (const s of series) s.from.forEach((n, i) => out.push(S.arrow(s.x0 + i * 20, yOf(n), s.x0 + i * 20, yOf(s.to) - 1, { c: s.c, w: 1.6, size: 7 })));
  const Lg = 300;
  const row = (y, c, t1, t2) => S.line(Lg, y - 4, Lg + 14, y - 4, { c, w: 3 }) + lab(Lg + 20, y, t1, { size: 10, w: 'bold' }) + lab(Lg + 20, y + 13, t2, { size: 10 });
  out.push(row(150, 'var(--diagram-blue)', 'Lyman: n → 1, ultraviolet', `2 → 1: ${lam(1, 2).toFixed(1)} nm`));
  out.push(row(195, 'var(--diagram-red)', 'Balmer: n → 2, visible', `3 → 2: ${lam(2, 3).toFixed(1)} nm`) + lab(Lg + 20, 221, `4 → 2: ${lam(2, 4).toFixed(1)} nm`, { size: 10 }));
  out.push(row(240, 'var(--diagram-brown)', 'Paschen: n → 3, infrared', `4 → 3: ${lam(3, 4).toFixed(0)} nm`));
  out.push(lab(170, 296, 'Energies drawn to scale: levels crowd together as n increases', { a: 'middle', size: 10 }));
  return svgDoc(
    470,
    305,
    'Energy-level diagram of the hydrogen atom drawn to scale, with energies minus 2.18 times ten to the minus 18 joule divided by n squared. Levels n equals 1 to 6 crowd closer together towards zero energy. Arrows show transitions: Lyman series ending on n equals 1 in the ultraviolet, Balmer series ending on n equals 2 in the visible, and Paschen series ending on n equals 3 in the infrared. Example wavelengths from the Rydberg formula are given.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 3. Orbital shapes with nodes
function lobe(cx, cy, ang, len, wid, fill) {
  const rot = (x, y) => [cx + x * Math.cos(ang) - y * Math.sin(ang), cy + x * Math.sin(ang) + y * Math.cos(ang)];
  const p = (x, y) => rot(x, y).map((v) => v.toFixed(1)).join(' ');
  const d = `M ${p(0, 0)} C ${p(len * 0.25, -wid)} ${p(len * 0.85, -wid)} ${p(len, 0)} C ${p(len * 0.85, wid)} ${p(len * 0.25, wid)} ${p(0, 0)} Z`;
  return S.path(d, { fill, fop: 0.45, c: fill, w: 1.5 });
}
const nodes = (n, l) => ({ radial: n - l - 1, angular: l, total: n - 1 });
const NODE_CHECK = [['1s', 1, 0, 0, 0], ['2s', 2, 0, 1, 0], ['2p', 2, 1, 0, 1], ['3d', 3, 2, 0, 2]];
for (const [name, n, l, rad, ang] of NODE_CHECK) {
  const nd = nodes(n, l);
  chk(nd.radial === rad && nd.angular === ang && nd.total === n - 1, `${name}: ${rad} radial + ${ang} angular nodes = ${n - 1}`);
}
export const ORBITALS = (() => {
  const out = [];
  const B = 'var(--diagram-blue)';
  const R = 'var(--diagram-red)';
  const yc = 85;
  // 1s
  out.push(S.circle(55, yc, 30, { fill: B, fop: 0.35, c: B }));
  out.push(S.circle(55, yc, 2.5, { fill: 'currentColor', c: 'currentColor' }));
  // 2s with radial node
  out.push(S.circle(155, yc, 34, { fill: B, fop: 0.3, c: B }));
  out.push(S.circle(155, yc, 17, { fill: 'var(--diagram-fill)', fop: 1, c: 'currentColor', dash: '3 3', sw: 1.2 }));
  out.push(S.circle(155, yc, 9, { fill: B, fop: 0.45, c: B }));
  // 2p_x
  out.push(lobe(255, yc, 0, 38, 15, B));
  out.push(lobe(255, yc, Math.PI, 38, 15, R));
  out.push(S.line(255, yc - 40, 255, yc + 40, { dash: '3 3', w: 1.2, c: 'var(--diagram-muted)' }));
  out.push(lab(222, yc - 20, '+', { size: 14, w: 'bold', c: B }));
  out.push(lab(288, yc - 20, '−', { size: 14, w: 'bold', c: R }));
  // 3d_xy: four lobes at 45 degrees
  [45, 135, 225, 315].forEach((a, i) => out.push(lobe(355, yc, (a * Math.PI) / 180, 34, 12, i % 2 ? R : B)));
  out.push(S.line(325, yc, 385, yc, { dash: '3 3', w: 1, c: 'var(--diagram-muted)' }));
  out.push(S.line(355, yc - 30, 355, yc + 30, { dash: '3 3', w: 1, c: 'var(--diagram-muted)' }));
  // 3d_z2: two lobes along z and a ring
  out.push(lobe(445, yc, -Math.PI / 2, 40, 12, B));
  out.push(lobe(445, yc, Math.PI / 2, 40, 12, B));
  out.push(S.ellipse(445, yc, 24, 7, { fill: R, fop: 0.35, c: R }));
  const names = [
    [55, '1s', 'spherical', '0 nodes'],
    [155, '2s', 'spherical', '1 radial node'],
    [255, '2p', 'dumbbell', '1 nodal plane'],
    [355, '3d (xy)', 'four lobes', '2 nodal planes'],
    [445, '3d (z²)', 'two lobes + ring', '2 nodal cones'],
  ];
  for (const [x, nm, shape, nd] of names) {
    out.push(lab(x, 148, nm, { a: 'middle', w: 'bold' }));
    out.push(lab(x, 162, shape, { a: 'middle', size: 10 }));
    out.push(lab(x, 175, nd, { a: 'middle', size: 10 }));
  }
  out.push(lab(250, 198, 'Blue and red lobes: opposite signs of the wave function. Radial nodes = n − l − 1; angular nodes = l.', { a: 'middle', size: 10 }));
  return svgDoc(
    500,
    208,
    'Shapes of atomic orbitals. The 1s orbital is a sphere with no nodes. The 2s orbital is a larger sphere with one spherical radial node. The 2p orbital is a dumbbell with two lobes of opposite sign separated by a nodal plane through the nucleus. The 3d xy orbital has four lobes between the axes, and the 3d z squared orbital has two lobes along the z axis and a ring in the xy plane; each d orbital has two angular nodes.',
    out.join(''),
  );
})();

// ---------------------------------------------------------------- 4. Orbital box diagrams
function boxesFor(capacityBoxes, electrons) {
  // Hund's rule: one electron in every box (up) before any pairing (down added)
  const cells = Array.from({ length: capacityBoxes }, () => ({ up: false, down: false }));
  for (let e = 0; e < electrons; e++) {
    if (e < capacityBoxes) cells[e].up = true;
    else cells[e - capacityBoxes].down = true;
  }
  return cells;
}
function drawBoxes(x, y, cells, label) {
  let out = '';
  cells.forEach((cell, i) => {
    const bx = x + i * 24;
    out += S.rect(bx, y, 22, 24, { sw: 1.5 });
    if (cell.up) out += S.arrow(bx + 7, y + 20, bx + 7, y + 5, { size: 5, w: 1.5, c: 'var(--diagram-blue)' });
    if (cell.down) out += S.arrow(bx + 15, y + 5, bx + 15, y + 20, { size: 5, w: 1.5, c: 'var(--diagram-red)' });
  });
  out += lab(x + (cells.length * 24 - 2) / 2, y + 39, label, { a: 'middle', size: 10 });
  const used = cells.reduce((s, c) => s + (c.up ? 1 : 0) + (c.down ? 1 : 0), 0);
  return { svg: out, used };
}
export const BOXES = (() => {
  const out = [];
  const rows = [
    { name: 'N (Z = 7)', z: 7, shells: [['1s', 1, 2], ['2s', 1, 2], ['2p', 3, 3]], tail: '1s² 2s² 2p³' },
    { name: 'O (Z = 8)', z: 8, shells: [['1s', 1, 2], ['2s', 1, 2], ['2p', 3, 4]], tail: '1s² 2s² 2p⁴' },
    { name: 'Cr (Z = 24)', z: 24, shells: [['[Ar]', 0, 18], ['3d', 5, 5], ['4s', 1, 1]], tail: '[Ar] 3d⁵ 4s¹ (half-filled)' },
    { name: 'Cu (Z = 29)', z: 29, shells: [['[Ar]', 0, 18], ['3d', 5, 10], ['4s', 1, 1]], tail: '[Ar] 3d¹⁰ 4s¹ (filled)' },
  ];
  rows.forEach((row, ri) => {
    const y = 14 + ri * 58;
    out.push(lab(6, y + 17, row.name, { w: 'bold', size: 11 }));
    let x = 100;
    let total = 0;
    for (const [nm, nb, ne] of row.shells) {
      if (nb === 0) {
        out.push(lab(x, y + 17, nm, { size: 11 }));
        total += ne;
        x += 40;
        continue;
      }
      const cells = boxesFor(nb, ne);
      const d = drawBoxes(x, y, cells, nm);
      out.push(d.svg);
      total += d.used;
      x += nb * 24 + 14;
    }
    out.push(lab(x + 6, y + 17, row.tail, { size: 10 }));
    chk(total === row.z, `box diagram ${row.name}: ${total} electrons drawn`);
  });
  out.push(lab(250, 252, 'Up arrow and down arrow: opposite spins. Hund: fill each box of a subshell singly first. Pauli: at most two per box.', { a: 'middle', size: 10 }));
  return svgDoc(
    520,
    262,
    'Orbital box diagrams. Nitrogen has 1s squared 2s squared and 2p three, with three unpaired electrons in the three 2p boxes. Oxygen is 2p four, with one box paired and two unpaired. Chromium is argon core 3d five 4s one, with all six outer electrons unpaired. Copper is argon core 3d ten 4s one, with a filled 3d subshell and one unpaired 4s electron. Each box holds at most two electrons of opposite spin, and boxes of a subshell are filled singly first.',
    out.join(''),
  );
})();
