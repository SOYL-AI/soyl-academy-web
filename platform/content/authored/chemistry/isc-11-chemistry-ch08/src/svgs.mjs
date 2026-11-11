// ISC 11 Chemistry ch08 Covalent Bonding, VSEPR and Hybridisation: hand-drawn SVGs (allow-listed elements, palette colours only;
// geometry and data computed in JS, self-checked). VSEPR and lobe drawings use a computed view in which no atom, lone pair or
// lobe hides behind the central atom or another one (as in the CBSE 11 chapter 4 drawings).
import { svgDoc, S, near } from './lib.mjs';
import { BOND, resultant, ionicPotential, RAD, SPECIES } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const M = 'var(--diagram-muted)';
const BR = 'var(--diagram-brown)';
const deg = (r) => (r * 180) / Math.PI;

// ================================================================ Lewis structures from coordinates
const dot = (x, y, col = 'currentColor') => S.circle(x, y, 1.9, { fill: col, c: col, sw: 0.3 });
const pairAt = (x, y, perp, col) => dot(x + 2.7 * Math.cos(perp), y + 2.7 * Math.sin(perp), col) + dot(x - 2.7 * Math.cos(perp), y - 2.7 * Math.sin(perp), col);
const angDiff = (a, b) => {
  let d = Math.abs(a - b) % (2 * Math.PI);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return d;
};
/** Directions for n lone pairs: greedy, each as far as possible from the bonds and from the pairs already placed. */
function lpAngles(bondAng, n) {
  const placed = [...bondAng];
  const out = [];
  for (let k = 0; k < n; k++) {
    let best = null;
    for (let d = 0; d < 360; d += 5) {
      const a = (d * Math.PI) / 180;
      const m = placed.length ? Math.min(...placed.map((p) => angDiff(a, p))) : Math.PI;
      if (!best || m > best.m + 1e-9) best = { a, m };
    }
    placed.push(best.a);
    out.push(best.a);
  }
  return out;
}
/**
 * atoms: [{ s, x, y, lp, fc?, col? }], bonds: [[i, j, order]]; style 'dots' (shared pairs as dots) or 'line'.
 * Returns the drawing and, for each atom, the electrons in its shell (2 x bond order + 2 x lone pairs).
 */
function lewis(ox, oy, atoms, bonds, { style = 'dots' } = {}) {
  const out = [];
  const pos = atoms.map((a) => ({ ...a, X: ox + a.x, Y: oy + a.y, r: a.s.length > 1 ? 13 : 9 }));
  const bAng = atoms.map(() => []);
  const shell = atoms.map(() => 0);
  let shared = 0;
  bonds.forEach(([i, j, k]) => {
    const A = pos[i];
    const Bp = pos[j];
    const dx = Bp.X - A.X;
    const dy = Bp.Y - A.Y;
    const L = Math.hypot(dx, dy);
    const a = Math.atan2(dy, dx);
    bAng[i].push(a);
    bAng[j].push(a + Math.PI);
    shell[i] += 2 * k;
    shell[j] += 2 * k;
    shared += k;
    const s0 = A.r + 2;
    const s1 = L - Bp.r - 2;
    if (style === 'dots') {
      for (let t = 0; t < k; t++) {
        const f = s0 + ((t + 0.5) * (s1 - s0)) / k;
        out.push(pairAt(A.X + f * Math.cos(a), A.Y + f * Math.sin(a), a + Math.PI / 2, G));
      }
    } else {
      for (let t = 0; t < k; t++) {
        const off = (t - (k - 1) / 2) * 5;
        const nx = -Math.sin(a) * off;
        const ny = Math.cos(a) * off;
        out.push(S.line(A.X + s0 * Math.cos(a) + nx, A.Y + s0 * Math.sin(a) + ny, A.X + s1 * Math.cos(a) + nx, A.Y + s1 * Math.sin(a) + ny, { w: 1.8 }));
      }
    }
  });
  let lps = 0;
  pos.forEach((a, i) => {
    out.push(S.text(a.X, a.Y + 5, a.s, { a: 'middle', size: 13, w: 'bold', c: a.col ?? 'currentColor' }));
    const n = a.lp ?? 0;
    lpAngles(bAng[i], n).forEach((t) => out.push(pairAt(a.X + (a.r + 6) * Math.cos(t), a.Y + (a.r + 6) * Math.sin(t), t + Math.PI / 2, 'currentColor')));
    shell[i] += 2 * n;
    lps += n;
    if (a.fc) out.push(S.text(a.X + a.r + 1, a.Y - a.r + 1, a.fc, { size: 11, w: 'bold', c: a.fc.includes('+') ? B : R }));
  });
  return { svg: out.join(''), shell, shared, lps };
}
const octetOK = (atoms, shell) => atoms.every((a, i) => shell[i] === (a.s === 'H' ? 2 : 8));
const VAL = { H: 1, C: 4, N: 5, O: 6 };
const electronsTotal = (atoms, shared, lps) => 2 * shared + 2 * lps;

// ---------------------------------------------------------------- 1. Lewis structures: CH4, NH3, H2O, CO2
export const LEWIS_A = (() => {
  const out = [];
  const L = 44;
  const mols = [
    { n: 'CH₄', cx: 90, cy: 70, atoms: [{ s: 'C', x: 0, y: 0 }, { s: 'H', x: -L, y: 0 }, { s: 'H', x: L, y: 0 }, { s: 'H', x: 0, y: -L }, { s: 'H', x: 0, y: L }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], note: '4 shared pairs, no lone pairs' },
    { n: 'NH₃', cx: 270, cy: 70, atoms: [{ s: 'N', x: 0, y: 0, lp: 1 }, { s: 'H', x: -L, y: 0 }, { s: 'H', x: L, y: 0 }, { s: 'H', x: 0, y: L }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], note: '3 shared pairs, 1 lone pair on N' },
    { n: 'H₂O', cx: 450, cy: 70, atoms: [{ s: 'O', x: 0, y: 0, lp: 2 }, { s: 'H', x: -L, y: 0 }, { s: 'H', x: L, y: 0 }], bonds: [[0, 1, 1], [0, 2, 1]], note: '2 shared pairs, 2 lone pairs on O' },
    { n: 'CO₂', cx: 160, cy: 196, atoms: [{ s: 'C', x: 0, y: 0 }, { s: 'O', x: -64, y: 0, lp: 2 }, { s: 'O', x: 64, y: 0, lp: 2 }], bonds: [[0, 1, 2], [0, 2, 2]], note: '4 shared pairs (two double bonds), 4 lone pairs' },
  ];
  const valence = { 'CH₄': 8, 'NH₃': 8, 'H₂O': 8, 'CO₂': 16 };
  mols.forEach((m) => {
    const r = lewis(m.cx, m.cy, m.atoms, m.bonds);
    out.push(r.svg);
    out.push(lab(m.cx, m.cy + (m.n === 'CO₂' ? 52 : 74), m.n, { a: 'middle', w: 'bold', size: 12 }));
    out.push(small(m.cx, m.cy + (m.n === 'CO₂' ? 66 : 88), m.note, { a: 'middle', c: M }));
    chk(octetOK(m.atoms, r.shell), `Lewis ${m.n}: every atom has 8 electrons (H has 2)`);
    chk(electronsTotal(m.atoms, r.shared, r.lps) === valence[m.n], `Lewis ${m.n}: ${valence[m.n]} valence electrons in all (${r.shared} shared pairs + ${r.lps} lone pairs)`);
  });
  out.push(S.circle(340, 196, 2.5, { fill: G, c: G, sw: 0.3 }), small(348, 200, 'green: pair shared by two atoms'));
  out.push(S.circle(340, 218, 2.5, { fill: 'currentColor', c: 'currentColor', sw: 0.3 }), small(348, 222, 'black: lone pair on one atom'));
  out.push(small(340, 244, 'Octets: 8 electrons round each atom (H: 2).', { c: M }));
  return svgDoc(540, 272, 'Electron-dot (Lewis) structures of methane with four shared pairs, ammonia with three shared pairs and one lone pair on nitrogen, water with two shared pairs and two lone pairs on oxygen, and carbon dioxide with two double bonds, each shown as two shared pairs, and two lone pairs on each oxygen. Every atom has an octet and hydrogen has a duplet.', out.join(''));
})();

// ---------------------------------------------------------------- 2. Lewis structures: ethane, ethene, ethyne
export const LEWIS_B = (() => {
  const out = [];
  const h = 40;
  const cc = 54;
  const s2 = Math.SQRT1_2 * h;
  const mols = [
    { n: 'ethane C₂H₆', cx: 90, atoms: [{ s: 'C', x: -cc / 2, y: 0 }, { s: 'C', x: cc / 2, y: 0 }, { s: 'H', x: -cc / 2 - h, y: 0 }, { s: 'H', x: -cc / 2, y: -h }, { s: 'H', x: -cc / 2, y: h }, { s: 'H', x: cc / 2 + h, y: 0 }, { s: 'H', x: cc / 2, y: -h }, { s: 'H', x: cc / 2, y: h }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1]], e: 14, note: '7 shared pairs' },
    { n: 'ethene C₂H₄', cx: 270, atoms: [{ s: 'C', x: -cc / 2, y: 0 }, { s: 'C', x: cc / 2, y: 0 }, { s: 'H', x: -cc / 2 - s2, y: -s2 }, { s: 'H', x: -cc / 2 - s2, y: s2 }, { s: 'H', x: cc / 2 + s2, y: -s2 }, { s: 'H', x: cc / 2 + s2, y: s2 }], bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]], e: 12, note: '6 shared pairs (C=C: 2)' },
    { n: 'ethyne C₂H₂', cx: 450, atoms: [{ s: 'C', x: -cc / 2, y: 0 }, { s: 'C', x: cc / 2, y: 0 }, { s: 'H', x: -cc / 2 - h, y: 0 }, { s: 'H', x: cc / 2 + h, y: 0 }], bonds: [[0, 1, 3], [0, 2, 1], [1, 3, 1]], e: 10, note: '5 shared pairs (C≡C: 3)' },
  ];
  mols.forEach((m) => {
    const r = lewis(m.cx, 66, m.atoms, m.bonds);
    out.push(r.svg);
    out.push(lab(m.cx, 134, m.n, { a: 'middle', w: 'bold' }));
    out.push(small(m.cx, 148, m.note, { a: 'middle', c: M }));
    chk(octetOK(m.atoms, r.shell) && electronsTotal(m.atoms, r.shared, r.lps) === m.e, `Lewis ${m.n}: octets satisfied, ${m.e} valence electrons = ${r.shared} shared pairs`);
  });
  return svgDoc(540, 160, 'Electron-dot structures of ethane with one carbon-carbon shared pair and six carbon-hydrogen pairs, ethene with a double bond of two shared pairs between the carbons, and ethyne with a triple bond of three shared pairs between the carbons. Every carbon has eight electrons and every hydrogen two.', out.join(''));
})();

// ---------------------------------------------------------------- 3. H2, O2, N2
export const LEWIS_C = (() => {
  const out = [];
  const mols = [
    { n: 'H₂', cx: 80, atoms: [{ s: 'H', x: -32, y: 0 }, { s: 'H', x: 32, y: 0 }], bonds: [[0, 1, 1]], e: 2, note: 'single bond: 1 σ' },
    { n: 'O₂', cx: 260, atoms: [{ s: 'O', x: -38, y: 0, lp: 2 }, { s: 'O', x: 38, y: 0, lp: 2 }], bonds: [[0, 1, 2]], e: 12, note: 'double bond: 1 σ + 1 π' },
    { n: 'N₂', cx: 440, atoms: [{ s: 'N', x: -40, y: 0, lp: 1 }, { s: 'N', x: 40, y: 0, lp: 1 }], bonds: [[0, 1, 3]], e: 10, note: 'triple bond: 1 σ + 2 π' },
  ];
  mols.forEach((m) => {
    const r = lewis(m.cx, 58, m.atoms, m.bonds);
    out.push(r.svg);
    out.push(lab(m.cx, 108, m.n, { a: 'middle', w: 'bold', size: 12 }));
    out.push(small(m.cx, 122, m.note, { a: 'middle', c: M }));
    chk(octetOK(m.atoms, r.shell) && electronsTotal(m.atoms, r.shared, r.lps) === m.e, `Lewis ${m.n}: ${m.e} valence electrons, octets (duplets for H) satisfied`);
  });
  chk(BOND['H–H'].order === 1 && BOND['O=O'].order === 2 && BOND['N≡N'].order === 3, 'bond orders 1, 2, 3 for H₂, O₂, N₂');
  return svgDoc(540, 134, 'Lewis structures of hydrogen with one shared pair, oxygen with two shared pairs and two lone pairs on each atom, and nitrogen with three shared pairs and one lone pair on each atom. The bonds are single, double and triple, made of 1 sigma, 1 sigma and 1 pi, and 1 sigma and 2 pi bonds.', out.join(''));
})();

// ================================================================ sigma and pi overlap
const blue = { fill: B, fop: 0.45, sw: 1, c: B };
const red = { fill: R, fop: 0.45, sw: 1, c: R };
export const SIGMA_PI = (() => {
  const out = [];
  const axis = (cx, cy, w) => S.line(cx - w, cy, cx + w, cy, { c: M, w: 0.8, dash: '3 3' });
  // H2: s-s
  let cx = 80;
  let cy = 62;
  out.push(S.circle(cx - 14, cy, 24, blue), S.circle(cx + 14, cy, 24, blue), axis(cx, cy, 52));
  out.push(lab(cx, 120, 'H₂: s–s overlap', { a: 'middle', w: 'bold' }), small(cx, 134, 'one σ bond', { a: 'middle' }));
  const w1 = 2 * 24 - 28;
  // O2: sigma head-on p-p + pi sideways p-p
  cx = 260;
  out.push(axis(cx, cy, 78));
  out.push(S.ellipse(cx - 20, cy, 21, 10, blue), S.ellipse(cx + 20, cy, 21, 10, red));
  out.push(S.ellipse(cx - 9, cy - 26, 11, 14, blue), S.ellipse(cx - 9, cy + 26, 11, 14, red), S.ellipse(cx + 9, cy - 26, 11, 14, blue), S.ellipse(cx + 9, cy + 26, 11, 14, red));
  out.push(lab(cx, 120, 'O₂: p–p head-on, p–p sideways', { a: 'middle', w: 'bold' }), small(cx, 134, 'one σ bond and one π bond', { a: 'middle' }));
  // N2: sigma + 2 pi (second pi drawn dashed, in the plane of the page)
  cx = 440;
  out.push(axis(cx, cy, 70));
  out.push(S.ellipse(cx - 20, cy, 20, 8, red), S.ellipse(cx + 20, cy, 20, 8, blue));
  out.push(S.ellipse(cx - 8, cy - 24, 10, 13, blue), S.ellipse(cx - 8, cy + 24, 10, 13, red), S.ellipse(cx + 8, cy - 24, 10, 13, blue), S.ellipse(cx + 8, cy + 24, 10, 13, red));
  out.push(S.ellipse(cx, cy, 36, 20, { c: G, sw: 1.3, dash: '4 3' }));
  out.push(lab(cx, 120, 'N₂: σ + two π', { a: 'middle', w: 'bold' }), small(cx, 134, 'second π (dashed): in front and behind', { a: 'middle' }));
  out.push(small(8, 152, 'Dashed grey line: internuclear axis. σ overlap lies along it; π overlap lies above and below it.', { c: M }));
  chk(w1 > 0, 'σ(s–s) overlap width positive');
  chk(BOND['H–H'].order === 1 && BOND['O=O'].order - 1 === 1 && BOND['N≡N'].order - 1 === 2, 'σ and π counts: H₂ 1σ; O₂ 1σ + 1π; N₂ 1σ + 2π');
  return svgDoc(540, 162, 'Orbital overlap in three diatomic molecules. In hydrogen two s orbitals overlap end to end to form one sigma bond. In oxygen two p orbitals overlap head-on along the axis to form a sigma bond, and two parallel p orbitals overlap sideways above and below the axis to form a pi bond. In nitrogen there is one sigma bond and two pi bonds at right angles, one above and below the axis and one in front of and behind it.', out.join(''));
})();

// ---------------------------------------------------------------- 4. Potential energy curve of H2 (Morse)
const D0 = BOND['H–H'].enth;
const r0 = BOND['H–H'].len;
const aM = 0.0185; // pm^-1
const Ecurve = (r) => D0 * ((1 - Math.exp(-aM * (r - r0))) ** 2 - 1);
export const BONDCURVE = (() => {
  const out = [];
  const x0 = 70;
  const y0 = 24;
  const W = 400;
  const Hh = 190;
  const rMin = 36;
  const rMax = 300;
  const Emax = 300;
  const Emin = -480;
  const X = (r) => x0 + ((r - rMin) / (rMax - rMin)) * W;
  const Yv = (E) => y0 + ((Emax - E) / (Emax - Emin)) * Hh;
  out.push(S.line(x0, y0, x0, y0 + Hh, { w: 1.5 }), S.line(x0, Yv(0), x0 + W, Yv(0), { w: 1.5 }));
  let d = '';
  let minE = Infinity;
  let minR = 0;
  for (let r = rMin; r <= rMax; r += 2) {
    const E = Math.min(Emax, Ecurve(r));
    if (E < minE) {
      minE = E;
      minR = r;
    }
    d += `${r === rMin ? 'M' : ' L'} ${X(r).toFixed(1)} ${Yv(E).toFixed(1)}`;
  }
  out.push(S.path(d, { c: B, w: 2.4 }));
  out.push(S.line(X(r0), Yv(0), X(r0), Yv(-D0), { c: M, w: 1, dash: '4 3' }));
  out.push(S.line(x0, Yv(-D0), X(r0), Yv(-D0), { c: M, w: 1, dash: '4 3' }));
  out.push(S.circle(X(r0), Yv(-D0), 4, { fill: R, c: R }));
  out.push(lab(X(r0) + 8, Yv(-D0) + 16, `bond length ${r0} pm`, { w: 'bold' }));
  out.push(S.arrow(x0 + 4, Yv(0) + 2, x0 + 4, Yv(-D0) - 1, { c: G, w: 1.8, size: 7 }));
  out.push(small(X(150), Yv(-370), `bond enthalpy ${D0} kJ mol⁻¹`, { c: G, w: 'bold' }));
  out.push(small(X(150), Yv(-370) + 12, "(depth of the well, shown by the green arrow)", { c: G }));
  for (const r of [50, 100, 150, 200, 250, 300]) {
    out.push(S.line(X(r), Yv(0) - 3, X(r), Yv(0) + 3));
  }
  for (const r of [100, 200, 300]) out.push(small(X(r), y0 + Hh + 14, String(r), { a: 'middle' }));
  out.push(small(x0 + W / 2, y0 + Hh + 28, 'distance between the nuclei (pm)', { a: 'middle' }));
  out.push(small(x0 - 8, Yv(0) + 4, '0', { a: 'end' }), small(x0 - 8, Yv(-D0) + 4, `−${D0}`, { a: 'end' }));
  out.push(lab(10, y0 + 8, 'Energy', { w: 'bold' }));
  out.push(small(x0 + 14, Yv(240), 'repulsion', { c: R }));
  out.push(small(X(220), Yv(-170), 'attraction wins', { c: M, a: 'middle' }));
  out.push(small(X(262), Yv(0) - 8, 'atoms far apart', { c: M, a: 'middle' }));
  chk(Math.abs(minR - r0) <= 2 && near(minE, -D0, 0.01), `H₂ curve: minimum ${minE.toFixed(0)} kJ/mol at ${minR} pm (bond length ${r0} pm, enthalpy ${D0})`);
  chk(Ecurve(rMax) > -0.05 * D0 && Ecurve(rMin) > 0, 'H₂ curve: levels off to zero at large r');
  return svgDoc(520, 262, 'Potential energy of two hydrogen atoms against the distance between their nuclei. The energy falls to a minimum of minus 436 kilojoules per mole at 74 picometres, the bond length; the depth of the well is the bond enthalpy. At shorter distances repulsion makes the energy rise steeply, and at large distances the energy returns to zero.', out.join(''));
})();

// ---------------------------------------------------------------- 5. Bond dipoles and molecular dipole moments
export const DIPOLE = (() => {
  const out = [];
  const arrow = (x1, y1, x2, y2, col, w = 3) => S.arrow(x1, y1, x2, y2, { c: col, w, size: 8 });
  const sym = (x, y, s) => lab(x, y + 5, s, { a: 'middle', w: 'bold', size: 14 });
  const bondDipole = (A, Bp, ra, rb, col = R) => {
    const dx = Bp[0] - A[0];
    const dy = Bp[1] - A[1];
    const L = Math.hypot(dx, dy);
    const ux = dx / L;
    const uy = dy / L;
    return S.line(A[0] + ux * ra, A[1] + uy * ra, Bp[0] - ux * rb, Bp[1] - uy * rb, { c: M, w: 1, dash: '3 3' }) +
      arrow(A[0] + ux * (ra + 3), A[1] + uy * (ra + 3) - 11 * Math.abs(ux) * 0 - 0, Bp[0] - ux * (rb + 2), Bp[1] - uy * (rb + 2), col, 2.4);
  };
  // CO2 (linear)
  let cx = 90;
  const cy = 64;
  const co = [[cx - 56, cy], [cx, cy], [cx + 56, cy]];
  out.push(bondDipole(co[1], co[0], 11, 11), bondDipole(co[1], co[2], 11, 11));
  co.forEach((p, i) => out.push(sym(p[0], p[1], i === 1 ? 'C' : 'O')));
  out.push(lab(cx, 124, 'CO₂ (linear)', { a: 'middle', w: 'bold' }), small(cx, 138, 'dipoles cancel: μ = 0', { a: 'middle' }));
  const vCO = [(co[0][0] - co[1][0]) / 56, (co[2][0] - co[1][0]) / 56];
  chk(Math.abs(vCO[0] + vCO[1]) < 1e-9, 'CO₂: two equal bond dipoles at 180° cancel');
  // H2O (bent, 104.5 degrees)
  cx = 270;
  const half = (104.5 / 2) * Math.PI / 180;
  const O = [cx, 40];
  const Hs = [[cx - 48 * Math.sin(half), 40 + 48 * Math.cos(half)], [cx + 48 * Math.sin(half), 40 + 48 * Math.cos(half)]];
  out.push(bondDipole(Hs[0], O, 11, 11), bondDipole(Hs[1], O, 11, 11));
  out.push(sym(O[0], O[1], 'O'), sym(Hs[0][0], Hs[0][1], 'H'), sym(Hs[1][0], Hs[1][1], 'H'));
  out.push(arrow(cx, 100, cx, 62, G, 3.4));
  const mu = resultant(1.51, 104.5);
  out.push(small(cx + 10, 90, `resultant ${mu.toFixed(2)} D`, { c: G, w: 'bold' }));
  out.push(lab(cx, 124, 'H₂O (bent, 104.5°)', { a: 'middle', w: 'bold' }), small(cx, 138, 'dipoles add: μ ≠ 0', { a: 'middle' }));
  chk(near(mu, 1.85, 0.01), `H₂O: two O–H bond moments of 1.51 D at 104.5° give ${mu.toFixed(2)} D`);
  // BF3 (trigonal planar)
  cx = 450;
  const Bc = [cx, 64];
  const th = [-90, 30, 150].map((t) => (t * Math.PI) / 180);
  const Fs = th.map((t) => [Bc[0] + 52 * Math.cos(t), Bc[1] + 52 * Math.sin(t)]);
  Fs.forEach((f) => out.push(bondDipole(Bc, f, 11, 11)));
  out.push(sym(Bc[0], Bc[1], 'B'));
  Fs.forEach((f) => out.push(sym(f[0], f[1], 'F')));
  out.push(lab(cx, 140, 'BF₃ (trigonal planar)', { a: 'middle', w: 'bold' }), small(cx, 154, 'three dipoles at 120° cancel: μ = 0', { a: 'middle' }));
  const sx = th.reduce((s, t) => s + Math.cos(t), 0);
  const sy = th.reduce((s, t) => s + Math.sin(t), 0);
  chk(Math.hypot(sx, sy) < 1e-9, 'BF₃: three equal bond dipoles at 120° cancel');
  out.push(small(8, 176, 'Red arrows point to the more electronegative atom (bond dipoles); the green arrow is the resultant.', { c: M }));
  return svgDoc(540, 186, 'Bond dipoles and molecular dipole moments. In carbon dioxide the two polar C to O bonds point in opposite directions along a straight line and cancel, so the molecule is non-polar. In water the two O to H bond dipoles at 104.5 degrees add to give a resultant of about 1.85 debye. In boron trifluoride three equal B to F bond dipoles at 120 degrees cancel, so the molecule is non-polar.', out.join(''));
})();

// ---------------------------------------------------------------- 6. Octet deviations
export const OCTET = (() => {
  const out = [];
  const defs = [
    { n: 'BeCl₂', note: '4 electrons round Be', note2: 'incomplete octet', cx: 72, ang: [180, 0], c: 'Be', x: 'Cl', e: 4 },
    { n: 'BF₃', note: '6 electrons round B', note2: 'incomplete octet', cx: 214, ang: [-90, 30, 150], c: 'B', x: 'F', e: 6 },
    { n: 'PCl₅', note: '10 electrons round P', note2: 'expanded octet', cx: 360, ang: [-90, -18, 54, 126, 198], c: 'P', x: 'Cl', e: 10 },
    { n: 'SF₆', note: '12 electrons round S', note2: 'expanded octet', cx: 506, ang: [0, 60, 120, 180, 240, 300], c: 'S', x: 'F', e: 12 },
  ];
  defs.forEach((d) => {
    const dist = 46;
    const atoms = [{ s: d.c, x: 0, y: 0 }, ...d.ang.map((a) => ({ s: d.x, x: dist * Math.cos((a * Math.PI) / 180), y: dist * Math.sin((a * Math.PI) / 180), lp: 3 }))];
    const bonds = d.ang.map((_, i) => [0, i + 1, 1]);
    const r = lewis(d.cx, 76, atoms, bonds, { style: 'line' });
    out.push(r.svg);
    out.push(lab(d.cx, 152, d.n, { a: 'middle', w: 'bold', size: 12 }));
    out.push(small(d.cx, 166, d.note, { a: 'middle', c: M }));
    out.push(small(d.cx, 179, d.note2, { a: 'middle', c: M }));
    chk(r.shell[0] === d.e && atoms.slice(1).every((_, i) => r.shell[i + 1] === 8), `${d.n}: ${r.shell[0]} electrons round the central atom, each halogen has 8`);
  });
  return svgDoc(580, 188, 'Lewis structures with bond lines and lone pairs showing deviations from the octet rule. In BeCl2 the beryllium atom has only four electrons and in BF3 the boron atom has six: incomplete octets. In PCl5 the phosphorus atom has ten electrons and in SF6 the sulfur atom has twelve: expanded octets. Every halogen atom has eight electrons.', out.join(''));
})();

// ---------------------------------------------------------------- 7. Fajan's rules
export const FAJAN = (() => {
  const out = [];
  const k = 0.24; // px per pm
  const Ra = 181 * k;
  const cases = [
    { n: 'LiCl', c: 'Li⁺', z: 1, r: RAD['Li+'], cx: 20 },
    { n: 'NaCl', c: 'Na⁺', z: 1, r: RAD['Na+'], cx: 200 },
    { n: 'AlCl₃', c: 'Al³⁺', z: 3, r: RAD['Al3+'], cx: 380 },
  ];
  const yc = 62;
  const shifts = [];
  cases.forEach((cs) => {
    const rc = cs.r * k;
    const xc = cs.cx + 28 + rc;
    const xa = xc + rc + Ra;
    const zr = ionicPotential(cs.z, cs.r);
    const s = Math.min(0.45 * Ra, 900 * zr);
    shifts.push(s);
    out.push(S.circle(xa, yc, Ra, { c: M, sw: 1, dash: '4 3' }));
    out.push(S.ellipse(xa - s / 2, yc, Ra + s / 2, Ra * (1 - 0.1 * s / Ra), { fill: R, fop: 0.3, c: R, sw: 1.5 }));
    out.push(S.circle(xc, yc, rc, { fill: B, fop: 0.5, c: B, sw: 1.5 }));
    out.push(lab(xc, yc + 4, cs.c, { a: 'middle', w: 'bold', size: rc < 16 ? 10 : 11 }));
    out.push(lab(xa + 4, yc + 4, 'Cl⁻', { a: 'middle', w: 'bold' }));
    out.push(lab(cs.cx + 86, 128, cs.n, { a: 'middle', w: 'bold', size: 12 }));
    out.push(small(cs.cx + 86, 142, `z/r = ${(zr * 1000).toFixed(1)} × 10⁻³ pm⁻¹`, { a: 'middle' }));
  });
  out.push(small(110, 160, 'more ionic', { a: 'middle', c: M }));
  out.push(small(290, 160, '→ cloud pulled further →', { a: 'middle', c: M }));
  out.push(small(470, 160, 'more covalent', { a: 'middle', c: M }));
  out.push(small(8, 180, 'Dashed circle: undistorted Cl⁻ cloud. Red: cloud pulled towards the cation. Radii (pm): Li⁺ 76, Na⁺ 102, Al³⁺ 53.5, Cl⁻ 181.', { c: M }));
  const zrs = cases.map((c) => ionicPotential(c.z, c.r));
  chk(zrs[0] > zrs[1] && zrs[2] > zrs[0] && shifts[0] > shifts[1] && shifts[2] > shifts[0], `Fajan: z/r Li⁺ ${zrs[0].toFixed(4)} > Na⁺ ${zrs[1].toFixed(4)}; Al³⁺ ${zrs[2].toFixed(4)} highest; distortion drawn in the same order`);
  return svgDoc(540, 190, 'Polarisation of the chloride ion by three cations drawn to scale in picometres. The small lithium ion pulls the electron cloud of chloride a little more than the larger sodium ion does, so lithium chloride has more covalent character than sodium chloride. The very small and highly charged aluminium ion distorts the cloud most, so aluminium chloride is largely covalent.', out.join(''));
})();

// ================================================================ VSEPR and lobe drawings from vectors
const nrm = (v) => {
  const m = Math.hypot(...v);
  return v.map((x) => x / m);
};
const dotp = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const degAng = (a, b) => (Math.acos(Math.max(-1, Math.min(1, dotp(a, b)))) * 180) / Math.PI;
const TET = [[0, 1, 0], [0.943, -0.333, 0], [-0.471, -0.333, 0.816], [-0.471, -0.333, -0.816]].map(nrm);
const TRIG = [[1, 0, 0], [-0.5, 0.866, 0], [-0.5, -0.866, 0]];
const TBP = [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-0.5, 0, 0.866], [-0.5, 0, -0.866]]; // 0 and 1 axial
const OCT = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const LIN = [[1, 0, 0], [-1, 0, 0]];
const anglesOf = (vs) => {
  const set = new Set();
  for (let i = 0; i < vs.length; i++) for (let j = i + 1; j < vs.length; j++) set.add(Math.round(degAng(vs[i], vs[j])));
  return [...set].sort((a, b) => a - b);
};
const rot = (v, yaw, tilt) => {
  const [x0, y0, z0] = v;
  const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
  const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);
  return [x1, y0 * Math.cos(tilt) + z1 * Math.sin(tilt), -y0 * Math.sin(tilt) + z1 * Math.cos(tilt)];
};
/** Smallest turn from the textbook view that keeps every ligand, lone pair and the central atom clear of each other. */
const MARGIN = 7;
function bestView(vecs, lps, s, ra = 15, rl = 12.5) {
  let best = null;
  for (let yd = -60; yd <= 60; yd += 5)
    for (let td = 0; td <= 35; td += 5) {
      const yaw = (yd * Math.PI) / 180;
      const tilt = (td * Math.PI) / 180;
      const pts = vecs.map((v, i) => {
        const r = rot(v, yaw, tilt);
        const kk = lps.includes(i) ? 0.62 : 1;
        return { x: s * kk * r[0], y: s * kk * r[1], lp: lps.includes(i) };
      });
      let m = Infinity;
      for (const p of pts) m = Math.min(m, Math.hypot(p.x, p.y) - (p.lp ? rl : ra));
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) m = Math.min(m, Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y) - (pts[i].lp || pts[j].lp ? rl - 1 : ra - 1));
      const score = m >= MARGIN ? 1000 - Math.abs(yd) - td : m;
      if (!best || score > best.score + 1e-9) best = { m, yaw, tilt, score };
    }
  return best;
}
function shape(cx, cy, s, vecs, lps, title, sub) {
  const out = [];
  const view = bestView(vecs, lps, s);
  const P = (v, kk = 1) => {
    const r = rot(v, view.yaw, view.tilt);
    return [cx + s * kk * r[0], cy - s * kk * r[1], r[2]];
  };
  const bonds = vecs.filter((_, i) => !lps.includes(i));
  const items = vecs.map((v, i) => ({ lp: lps.includes(i), p: P(v, lps.includes(i) ? 0.62 : 1) })).sort((a, b) => a.p[2] - b.p[2]);
  for (const it of items) if (!it.lp) out.push(S.line(cx, cy, it.p[0], it.p[1], { w: 2, dash: it.p[2] < -0.3 ? '4 3' : undefined }));
  const front = [];
  for (const it of items) {
    const el = it.lp ? S.ellipse(it.p[0], it.p[1], 7, 4.5, { fill: Y, fop: 0.7, sw: 1 }) : S.circle(it.p[0], it.p[1], 7, { fill: G, fop: 0.6 });
    (it.p[2] < 0 ? out : front).push(el);
  }
  out.push(S.circle(cx, cy, 8, { fill: B, fop: 0.6 }));
  out.push(...front);
  out.push(lab(cx, cy + s + 24, title, { a: 'middle', size: 11, w: 'bold' }));
  out.push(small(cx, cy + s + 38, sub, { a: 'middle' }));
  chk(view.m >= 0, `VSEPR drawing ${title}: every atom and lone pair is clear of the central atom and of each other (margin ${view.m.toFixed(1)} px)`);
  return { svg: out.join(''), bonds };
}
const legend = (x, y) =>
  S.circle(x, y, 6, { fill: B, fop: 0.6 }) + small(x + 10, y + 4, 'central atom') +
  S.circle(x + 100, y, 6, { fill: G, fop: 0.6 }) + small(x + 110, y + 4, 'bonded atom') +
  S.ellipse(x + 205, y, 7, 4.5, { fill: Y, fop: 0.7, sw: 1 }) + small(x + 216, y + 4, 'lone pair');

const IDEAL = [
  ['AB₂', 'linear, 180°', LIN, [], [180]],
  ['AB₃', 'trigonal planar, 120°', TRIG, [], [120]],
  ['AB₄', 'tetrahedral, 109.5°', TET, [], [109]],
  ['AB₅', 'trigonal bipyramidal', TBP, [], [90, 120, 180]],
  ['AB₆', 'octahedral, 90°', OCT, [], [90, 180]],
];
export const VSEPR_IDEAL = (() => {
  const body = [];
  IDEAL.forEach(([t, sub, vs, lp, want], i) => {
    const cx = i < 3 ? 62 + i * 118 : 120 + (i - 3) * 118;
    const cy = i < 3 ? 52 : 168;
    const sh = shape(cx, cy, 34, vs, lp, t, sub);
    body.push(sh.svg);
    const got = anglesOf(sh.bonds);
    chk(JSON.stringify(got) === JSON.stringify(want), `VSEPR ideal ${t}: bond angles ${got.join(', ')}`);
  });
  body.push(legend(40, 278));
  return svgDoc(360, 292, 'Five ideal VSEPR shapes with no lone pairs on the central atom: AB2 linear with 180 degrees, AB3 trigonal planar with 120 degrees, AB4 tetrahedral with 109.5 degrees, AB5 trigonal bipyramidal with 90 and 120 degrees, and AB6 octahedral with 90 degrees.', body.join(''));
})();

const LP1 = [
  ['NH₃', 'trigonal pyramidal, 107°', TET, [0], SPECIES.NH3],
  ['H₂O', 'bent, 104.5°', TET, [0, 1], SPECIES.H2O],
  ['SO₂', 'bent, about 119°', TRIG, [0], SPECIES.SO2],
];
export const VSEPR_LP1 = (() => {
  const body = [];
  LP1.forEach(([t, sub, vs, lp, sp], i) => {
    const sh = shape(62 + i * 118, 52, 34, vs, lp, t, sub);
    body.push(sh.svg);
    chk(sh.bonds.length === sp.bp && lp.length === sp.lp, `VSEPR ${t}: ${sh.bonds.length} bond pairs and ${lp.length} lone pair(s) match the electron count`);
  });
  body.push(legend(40, 134));
  return svgDoc(360, 148, 'Three shapes derived from a tetrahedral or trigonal planar arrangement of electron pairs: ammonia is trigonal pyramidal with one lone pair, water is bent with two lone pairs, and sulfur dioxide is bent with one lone pair on a trigonal planar arrangement.', body.join(''));
})();

const LP2 = [
  ['SF₄', 'see-saw', TBP, [2], SPECIES.SF4, [90, 120, 180]],
  ['ClF₃', 'T-shaped', TBP, [3, 4], SPECIES.ClF3, [90, 180]],
  ['XeF₂', 'linear', TBP, [2, 3, 4], SPECIES.XeF2, [180]],
  ['BrF₅', 'square pyramidal', OCT, [2], SPECIES.BrF5, [90, 180]],
  ['XeF₄', 'square planar', OCT, [2, 3], SPECIES.XeF4, [90, 180]],
];
export const VSEPR_LP2 = (() => {
  const body = [];
  LP2.forEach(([t, sub, vs, lp, sp, want], i) => {
    const cx = i < 3 ? 62 + i * 118 : 120 + (i - 3) * 118;
    const sh = shape(cx, i < 3 ? 52 : 168, 34, vs, lp, t, sub);
    body.push(sh.svg);
    const got = anglesOf(sh.bonds);
    chk(JSON.stringify(got) === JSON.stringify(want) && sh.bonds.length === sp.bp && lp.length === sp.lp, `VSEPR ${t}: ${sh.bonds.length} bond pairs, ${lp.length} lone pairs, angles ${got.join(', ')} (${sp.shape})`);
  });
  body.push(legend(40, 278));
  return svgDoc(360, 292, 'Five shapes derived from the trigonal bipyramid and the octahedron by placing lone pairs: sulfur tetrafluoride see-saw with one equatorial lone pair, chlorine trifluoride T-shaped with two equatorial lone pairs, xenon difluoride linear with three equatorial lone pairs, bromine pentafluoride square pyramidal with one lone pair, and xenon tetrafluoride square planar with two lone pairs opposite each other.', body.join(''));
})();

// ---------------------------------------------------------------- hybrid orbital lobes
function lobe(cx, cy, p, col) {
  // teardrop from the centre to p = [x, y]; width fixed
  const dx = p[0] - cx;
  const dy = p[1] - cy;
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  const nx = -uy;
  const ny = ux;
  const w = Math.min(10, 0.34 * L);
  const c1 = [cx + ux * L * 0.45 + nx * w, cy + uy * L * 0.45 + ny * w];
  const c2 = [cx + ux * L * 0.45 - nx * w, cy + uy * L * 0.45 - ny * w];
  const q = (a) => `${a[0].toFixed(1)} ${a[1].toFixed(1)}`;
  return `<path d="M ${q([cx, cy])} Q ${q(c1)} ${q(p)} Q ${q(c2)} ${q([cx, cy])} Z" fill="${col}" fill-opacity="0.5" stroke="${col}" stroke-width="1.2"/>`;
}
const HYB = [
  ['sp', '2 lobes, 180°', LIN, 'BeCl₂'],
  ['sp²', '3 lobes, 120°', TRIG, 'BF₃'],
  ['sp³', '4 lobes, 109.5°', TET, 'CH₄'],
  ['sp³d', '5 lobes, 90° and 120°', TBP, 'PCl₅'],
  ['sp³d²', '6 lobes, 90°', OCT, 'SF₆'],
];
export const HYB_LOBES = (() => {
  const body = [];
  HYB.forEach(([t, sub, vs, ex], i) => {
    const cx = i < 3 ? 62 + i * 118 : 120 + (i - 3) * 118;
    const cy = i < 3 ? 52 : 168;
    const s = 34;
    const view = bestView(vs, [], s, 14, 14);
    const items = vs.map((v) => ({ p: rot(v, view.yaw, view.tilt) })).sort((a, b) => a.p[2] - b.p[2]);
    items.forEach((it) => body.push(lobe(cx, cy, [cx + s * it.p[0], cy - s * it.p[1]], it.p[2] < -0.3 ? Y : B)));
    body.push(S.circle(cx, cy, 3, { fill: 'currentColor', c: 'currentColor' }));
    body.push(lab(cx, cy + s + 24, t, { a: 'middle', w: 'bold', size: 12 }));
    body.push(small(cx, cy + s + 38, `${sub}: ${ex}`, { a: 'middle' }));
    chk(JSON.stringify(anglesOf(vs)) === JSON.stringify(IDEAL[i][4]), `hybrid lobes ${t}: inter-lobe angles ${anglesOf(vs).join(', ')}`);
  });
  body.push(S.rect(36, 268, 12, 8, { fill: B, fop: 0.5, c: B, sw: 1 }), small(54, 276, 'lobe towards the viewer'));
  body.push(S.rect(190, 268, 12, 8, { fill: Y, fop: 0.5, c: Y, sw: 1 }), small(208, 276, 'lobe pointing away'));
  return svgDoc(360, 288, 'The large lobes of the five sets of hybrid orbitals: two sp lobes at 180 degrees, three sp2 lobes at 120 degrees in a plane, four sp3 lobes at 109.5 degrees pointing to the corners of a tetrahedron, five sp3d lobes in a trigonal bipyramid, and six sp3d2 lobes along the axes of an octahedron.', body.join(''));
})();

// ---------------------------------------------------------------- promotion and hybridisation boxes
const boxRow = (x, y, spec, sz = 17) => {
  let o = '';
  spec.forEach((b, i) => {
    const bx = x + i * (sz + 2);
    o += S.rect(bx, y, sz, sz, { c: b.hyb ? B : b.dim ? M : 'currentColor', sw: b.hyb ? 1.6 : 1.1, fill: b.hyb ? B : 'none', fop: b.hyb ? 0.15 : undefined });
    if (b.e >= 1) o += S.text(bx + (b.e === 2 ? 5 : sz / 2), y + 13, '↑', { a: 'middle', size: 12, c: B });
    if (b.e === 2) o += S.text(bx + sz - 5, y + 13, '↓', { a: 'middle', size: 12, c: R });
  });
  return o;
};
export const HYB_BOXES = (() => {
  const out = [];
  const rows = [
    { el: 'Be', hy: 'sp', n: 2, ground: [2, 0, 0, 0], exc: [1, 1, 0, 0], hybN: 2, sp: '2s 2p 2p 2p', ne: 2 },
    { el: 'B', hy: 'sp²', n: 3, ground: [2, 1, 0, 0], exc: [1, 1, 1, 0], hybN: 3, sp: '2s 2p 2p 2p', ne: 3 },
    { el: 'C', hy: 'sp³', n: 4, ground: [2, 1, 1, 0], exc: [1, 1, 1, 1], hybN: 4, sp: '2s 2p 2p 2p', ne: 4 },
    { el: 'P', hy: 'sp³d', n: 5, ground: [2, 1, 1, 1, 0], exc: [1, 1, 1, 1, 1], hybN: 5, sp: '3s 3p 3p 3p 3d', ne: 5 },
    { el: 'S', hy: 'sp³d²', n: 6, ground: [2, 2, 1, 1, 0, 0], exc: [1, 1, 1, 1, 1, 1], hybN: 6, sp: '3s 3p 3p 3p 3d 3d', ne: 6 },
  ];
  out.push(lab(140, 14, 'Ground state', { a: 'middle', w: 'bold' }), lab(290, 14, 'Promoted (excited)', { a: 'middle', w: 'bold' }), lab(440, 14, 'Hybridised', { a: 'middle', w: 'bold' }));
  rows.forEach((r, i) => {
    const y = 28 + i * 40;
    const cnt = r.ground.length;
    const totalW = cnt * 19;
    out.push(lab(6, y + 14, `${r.el} → ${r.hy}`, { w: 'bold' }));
    out.push(boxRow(84, y, r.ground.map((e) => ({ e }))));
    out.push(S.arrow(84 + totalW + 4, y + 9, 84 + totalW + 22, y + 9, { w: 1.4, size: 6 }));
    out.push(boxRow(234, y, r.exc.map((e) => ({ e }))));
    out.push(S.arrow(234 + totalW + 4, y + 9, 234 + totalW + 22, y + 9, { w: 1.4, size: 6 }));
    const hy = Array.from({ length: cnt }, (_, k) => (k < r.hybN ? { e: 1, hyb: true } : { e: 0, dim: true }));
    out.push(boxRow(384, y, hy));
    const eg = r.ground.reduce((s, x) => s + x, 0);
    const ee = r.exc.reduce((s, x) => s + x, 0);
    chk(eg === r.ne && ee === r.ne && hy.filter((b) => b.hyb).length === r.n, `${r.el}: ${r.ne} valence electrons in every state; ${r.n} equivalent ${r.hy} orbitals each with one electron`);
  });
  out.push(small(6, 236, 'Blue boxes: equivalent hybrid orbitals (one electron each, used for σ bonds).', { c: M }));
  out.push(small(6, 249, 'Grey boxes: unhybridised orbitals, empty here. P and S use 3d orbitals (expanded octets).', { c: M }));
  return svgDoc(540, 260, 'Box diagrams of promotion and hybridisation. Beryllium promotes one 2s electron to 2p and forms two sp hybrid orbitals. Boron forms three sp2 orbitals, carbon four sp3 orbitals, phosphorus five sp3d orbitals using a 3d orbital, and sulfur six sp3d2 orbitals using two 3d orbitals. Each hybrid orbital holds one electron.', out.join(''));
})();
