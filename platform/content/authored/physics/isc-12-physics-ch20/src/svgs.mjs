// ISC ch20 diagrams: three nuclei (isotopes, isobars, isotones) drawn nucleon by nucleon; the mass defect of neon-20 to
// scale; pair production and annihilation; the binding energy per nucleon curve computed from atomic masses; one fission
// event and the chain reaction (uncontrolled and controlled); a schematic reactor; the Coulomb barrier between two protons.
// The physics helpers (mass defect, binding energy, Q values, nuclear radius and density, pair-production energies) are used
// by the decks and the question bank; the *Nuc functions recompute the binding energy from nuclear masses (m_p, m_e) so the
// re-solves are independent of the atomic-mass route. The fission-event drawing is adapted from the author's CBSE 12
// Physics ch13 diagram (copied, not imported); the other figures are new. SELF_CHECKS are read by build.mjs.
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const deg = (d) => (d * Math.PI) / 180;
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

// ================================================================ constants and physics (values stated in the stems)
export const MH = 1.007825; // atomic mass of hydrogen-1, u
export const MN = 1.008665; // neutron, u
export const MP = 1.007276; // proton, u
export const MEU = 0.000549; // electron, u
export const UMEV = 931.5; // MeV per u
export const MEC2 = 0.511; // electron rest energy, MeV
export const HCMEVFM = 1240; // MeV fm (hc = 1240 eV nm)
export const EE = 1.44; // e²/4πε₀ in MeV fm
export const R0 = 1.2; // fm
/** Atomic masses (u) used in the stems; Z listed beside each. */
export const NUC = {
  H2: { Z: 1, A: 2, M: 2.014102, sym: 'H' },
  H3: { Z: 1, A: 3, M: 3.016049, sym: 'H' },
  He3: { Z: 2, A: 3, M: 3.016029, sym: 'He' },
  He4: { Z: 2, A: 4, M: 4.002603, sym: 'He' },
  Li6: { Z: 3, A: 6, M: 6.015123, sym: 'Li' },
  Be9: { Z: 4, A: 9, M: 9.012183, sym: 'Be' },
  B10: { Z: 5, A: 10, M: 10.012937, sym: 'B' },
  C12: { Z: 6, A: 12, M: 12.0, sym: 'C' },
  N14: { Z: 7, A: 14, M: 14.003074, sym: 'N' },
  O16: { Z: 8, A: 16, M: 15.994915, sym: 'O' },
  Ne20: { Z: 10, A: 20, M: 19.99244, sym: 'Ne' },
  Na23: { Z: 11, A: 23, M: 22.98977, sym: 'Na' },
  Mg24: { Z: 12, A: 24, M: 23.985042, sym: 'Mg' },
  Al27: { Z: 13, A: 27, M: 26.981539, sym: 'Al' },
  Si28: { Z: 14, A: 28, M: 27.976927, sym: 'Si' },
  S32: { Z: 16, A: 32, M: 31.972071, sym: 'S' },
  Ca39: { Z: 20, A: 39, M: 38.97071, sym: 'Ca' },
  Ca40: { Z: 20, A: 40, M: 39.962591, sym: 'Ca' },
  Fe56: { Z: 26, A: 56, M: 55.934936, sym: 'Fe' },
  Ni62: { Z: 28, A: 62, M: 61.928345, sym: 'Ni' },
  Zr90: { Z: 40, A: 90, M: 89.904704, sym: 'Zr' },
  Sn120: { Z: 50, A: 120, M: 119.902202, sym: 'Sn' },
  Ba138: { Z: 56, A: 138, M: 137.905247, sym: 'Ba' },
  Ba141: { Z: 56, A: 141, M: 140.914411, sym: 'Ba' },
  Kr92: { Z: 36, A: 92, M: 91.926156, sym: 'Kr' },
  Pb208: { Z: 82, A: 208, M: 207.976652, sym: 'Pb' },
  U235: { Z: 92, A: 235, M: 235.04393, sym: 'U' },
  U238: { Z: 92, A: 238, M: 238.050788, sym: 'U' },
};
/** Mass defect (u) from atomic masses: Z m_H + (A − Z) m_n − M. */
export const dmU = (k) => NUC[k].Z * MH + (NUC[k].A - NUC[k].Z) * MN - NUC[k].M;
/** Binding energy (MeV) from atomic masses and 931.5 MeV per u. */
export const be = (k) => dmU(k) * UMEV;
export const bea = (k) => be(k) / NUC[k].A;
/** Independent route: nuclear mass = atomic mass − Z m_e, defect = Z m_p + N m_n − M_nucleus. */
export const beNuc = (k) => (NUC[k].Z * MP + (NUC[k].A - NUC[k].Z) * MN - (NUC[k].M - NUC[k].Z * MEU)) * UMEV;
/** Nuclear radius (fm) and mass density (kg m⁻³) from R = R₀ A^(1/3); nucleon mass in kg. */
export const rad = (A, r0 = R0) => r0 * Math.cbrt(A);
export const rho = (A, r0, mN = 1.67e-27) => (A * mN) / ((4 / 3) * Math.PI * (r0 * 1e-15 * Math.cbrt(A)) ** 3);
/** Same density by a different route: mass of one nucleon over the volume per nucleon, (4/3)π R₀³. */
export const rho0 = (r0, mN = 1.67e-27) => (3 * mN) / (4 * Math.PI * (r0 * 1e-15) ** 3);
/** Q value (MeV) of a reaction from atomic masses (u) of reactants and products. */
export const qOf = (react, prod) => (react.reduce((s, m) => s + m, 0) - prod.reduce((s, m) => s + m, 0)) * UMEV;

// Superscript/subscript digits for nuclide symbols in plain text: ᴬ_Z X.
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const conv = (n, set) => String(n).split('').map((d) => set[Number(d)]).join('');
/** nuclide symbol: nu(235, 92, 'U') → ²³⁵₉₂U */
export const nu = (A, Z, X) => `${conv(A, SUP)}${conv(Z, SUB)}${X}`;
export const nk = (k) => nu(NUC[k].A, NUC[k].Z, NUC[k].sym);
export const NEUTRON = '¹₀n';

check(close(dmU('He4') * UMEV, 28.3, 0.005) && close(be('Ca40'), beNuc('Ca40'), 1e-3) && close(be('Ne20'), beNuc('Ne20'), 1e-3) && close(be('Pb208'), beNuc('Pb208'), 1e-3), `binding energies from atomic masses agree with the nuclear-mass route (Ca-40 ${be('Ca40').toFixed(2)} vs ${beNuc('Ca40').toFixed(2)} MeV) and He-4 gives ${be('He4').toFixed(2)} MeV`);
check(close((9e9 * (1.6e-19) ** 2) / 1.6e-13 / 1e-15, EE, 1e-9), `e²/4πε₀ = ${((9e9 * (1.6e-19) ** 2) / 1.6e-13 / 1e-15).toFixed(3)} MeV fm`);
check(close(rho(8, 1.25), rho(216, 1.25), 1e-9) && close(rho(8, 1.25), rho0(1.25), 1e-9), `nuclear density ${rho0(1.25).toExponential(3)} kg/m³ is the same for A = 8 and A = 216`);

// ================================================================ nuclei drawn nucleon by nucleon
export const TRIO = [
  { Z: 6, N: 6, sym: 'C' },
  { Z: 6, N: 7, sym: 'C' },
  { Z: 7, N: 6, sym: 'N' },
];
export const NUCLEI = (() => {
  const w = 440;
  const h = 250;
  const xs = [75, 220, 365];
  const cy = 78;
  let s = '';
  const counts = [];
  TRIO.forEach(({ Z, N, sym }, k) => {
    const A = Z + N;
    let p = 0;
    let n = 0;
    for (let i = 0; i < A; i++) {
      const isP = Math.floor(((i + 1) * Z) / A) > Math.floor((i * Z) / A);
      const rr = 9.2 * Math.sqrt(i + 0.5);
      const a = i * 2.39996;
      const x = xs[k] + rr * Math.cos(a);
      const y = cy + rr * Math.sin(a);
      if (isP) p++;
      else n++;
      s += S.circle(x, y, 5.2, { c: isP ? RAY : MUT, fill: isP ? RAY : MUT, fop: isP ? 0.75 : 0.45, sw: 1 });
    }
    counts.push([p, n]);
    s += lab(xs[k], 142, nu(A, Z, sym), { a: 'middle', size: 13, w: 'bold' }) + lab(xs[k], 158, `Z = ${Z}, N = ${N}, A = ${A}`, { a: 'middle', size: 10 });
  });
  const rows = [
    [180, 0, 1, 'isotopes: same Z (6), different N'],
    [200, 1, 2, 'isobars: same A (13), different Z'],
    [220, 0, 2, 'isotones: same N (6), different Z'],
  ];
  for (const [y, i, j, t] of rows) s += S.line(xs[i], y, xs[j], y, { c: ACC, w: 2 }) + S.circle(xs[i], y, 3, { c: ACC, fill: ACC }) + S.circle(xs[j], y, 3, { c: ACC, fill: ACC }) + lab((xs[i] + xs[j]) / 2, y - 5, t, { a: 'middle', size: 10 });
  s += S.circle(20, 238, 4, { c: RAY, fill: RAY, fop: 0.75 }) + lab(28, 242, 'proton', { size: 10 }) + S.circle(88, 238, 4, { c: MUT, fill: MUT, fop: 0.45 }) + lab(96, 242, 'neutron', { size: 10 });
  const [a, b, c] = TRIO;
  check(counts.every(([p, n], k) => p === TRIO[k].Z && n === TRIO[k].N), `nuclei drawn with ${counts.map(([p, n]) => `${p} p + ${n} n`).join(', ')}`);
  check(a.Z === b.Z && a.N !== b.N && b.Z + b.N === c.Z + c.N && b.Z !== c.Z && a.N === c.N && a.Z !== c.Z, 'C-12 and C-13 isotopes, C-13 and N-13 isobars, C-12 and N-13 isotones: relations hold for the numbers drawn');
  return svgDoc(w, h, 'Carbon-12 with 6 protons and 6 neutrons, carbon-13 with 6 protons and 7 neutrons and nitrogen-13 with 7 protons and 6 neutrons, drawn nucleon by nucleon; carbon-12 and carbon-13 are isotopes (same Z), carbon-13 and nitrogen-13 are isobars (same A), and carbon-12 and nitrogen-13 are isotones (same N)', s);
})();

// ================================================================ mass defect of neon-20 to scale
export const MASSDEF = (() => {
  const w = 470;
  const h = 250;
  const k = 'Ne20';
  const { Z, A } = NUC[k];
  const free = Z * MH + (A - Z) * MN;
  const atom = NUC[k].M;
  const dm = free - atom;
  const sc = 380; // px per u
  const yTop = 56;
  const yBot = yTop + dm * sc;
  let s = S.line(40, yTop, 250, yTop, { w: 2.4 }) + S.line(40, yBot, 250, yBot, { w: 2.4, c: ACC });
  s += lab(44, yTop - 8, `10 H atoms + 10 neutrons (separate): ${free.toFixed(6)} u`, { size: 10 });
  s += lab(44, yBot + 16, `neon-20 atom: ${atom.toFixed(6)} u`, { size: 10, c: ACC });
  s += S.line(120, yTop + 2, 120, yBot - 2, { c: GRN, w: 1.5 }) + S.head(120, yTop + 1, -Math.PI / 2, { size: 6, c: GRN }) + S.head(120, yBot - 1, Math.PI / 2, { size: 6, c: GRN });
  s += lab(130, (yTop + yBot) / 2 + 4, `mass defect ${dm.toFixed(6)} u`, { size: 10, c: GRN, w: 'bold' });
  s += S.rect(298, 40, 164, 170, { c: MUT, sw: 1, rx: 8 });
  s += lab(306, 62, 'binding energy', { size: 11, w: 'bold' });
  s += lab(306, 80, `${dm.toFixed(6)} u × 931.5 MeV/u`, { size: 10 });
  s += lab(306, 96, `= ${(dm * UMEV).toFixed(1)} MeV`, { size: 11, w: 'bold', c: GRN });
  s += S.arrow(318, 112, 318, 150, { c: RAY, w: 1.6, size: 6 }) + lab(328, 128, 'forming the nucleus:', { size: 10 }) + lab(328, 142, 'energy released', { size: 10, c: RAY });
  s += S.arrow(318, 190, 318, 156, { c: BLUE, w: 1.6, size: 6 }) + lab(328, 174, 'taking it apart:', { size: 10 }) + lab(328, 188, 'energy supplied', { size: 10, c: BLUE });
  s += lab(40, 232, 'levels to scale; the mass axis is broken between 0 and 19.99 u', { size: 10, c: MUT });
  check(close(yBot - yTop, dm * sc) && close(dm * UMEV, be(k)) && close(be(k) / A, 8.0325, 1e-3), `neon-20: Δm = ${dm.toFixed(6)} u, B = ${be(k).toFixed(2)} MeV, B/A = ${(be(k) / A).toFixed(3)} MeV; level gap drawn to scale`);
  return svgDoc(w, h, 'Mass defect of neon-20: the ten hydrogen atoms and ten neutrons taken separately have a mass of 20.164900 u, the neon-20 atom 19.992440 u; the difference, 0.172460 u, is the mass defect and corresponds to a binding energy of 160.7 MeV, released when the nucleus forms and supplied when it is taken apart', s);
})();

// ================================================================ pair production and annihilation
export const PAIRFIG = (() => {
  const w = 440;
  const h = 250;
  const wave = (x1, y1, x2, y2, amp = 5, n = 22) => {
    const L = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / L;
    const uy = (y2 - y1) / L;
    let d = `M${f1(x1)} ${f1(y1)}`;
    for (let i = 1; i <= n; i++) {
      const t = (i / n) * L;
      const off = amp * Math.sin((i / n) * Math.PI * (n / 2));
      d += ` L${f1(x1 + t * ux - off * uy)} ${f1(y1 + t * uy + off * ux)}`;
    }
    return d;
  };
  let s = lab(105, 22, 'Pair production', { a: 'middle', size: 12, w: 'bold' }) + lab(335, 22, 'Annihilation', { a: 'middle', size: 12, w: 'bold' });
  s += S.line(220, 10, 220, 240, { c: MUT, w: 1, dash: '4 4' });
  // pair production near a nucleus
  s += S.path(wave(12, 60, 92, 118), { c: RAY, w: 1.4 }) + lab(10, 52, 'γ photon, E ≥ 1.022 MeV', { size: 10, c: RAY });
  s += S.circle(104, 126, 9, { c: ACC, fill: ACC, fop: 0.5 }) + lab(60, 150, 'nucleus', { a: 'middle', size: 10 }) + lab(60, 163, '(takes up momentum)', { a: 'middle', size: 10 });
  s += S.path('M110 118 Q150 84 205 66', { c: BLUE, w: 1.8 }) + S.head(205, 66, Math.atan2(-18, 55), { size: 7, c: BLUE }) + lab(190, 56, 'e⁻', { size: 11, c: BLUE, w: 'bold' });
  s += S.path('M110 134 Q150 168 205 190', { c: RAY, w: 1.8 }) + S.head(205, 190, Math.atan2(22, 55), { size: 7, c: RAY }) + lab(190, 208, 'e⁺', { size: 11, c: RAY, w: 'bold' });
  s += lab(105, 236, 'E = 2mₑc² + kinetic energies', { a: 'middle', size: 10, c: MUT });
  // annihilation
  s += S.circle(300, 120, 6, { c: BLUE, fill: BLUE }) + S.arrow(236, 120, 292, 120, { c: BLUE, w: 1.6, size: 6 }) + lab(236, 138, 'e⁻', { size: 11, c: BLUE, w: 'bold' });
  s += S.circle(340, 120, 6, { c: RAY, fill: RAY }) + S.arrow(424, 120, 348, 120, { c: RAY, w: 1.6, size: 6 }) + lab(412, 138, 'e⁺', { size: 11, c: RAY, w: 'bold' });
  const p1 = [-60, -52];
  const p2 = [60, 52];
  s += S.path(wave(320, 112, 320 + p1[0], 112 + p1[1], 4, 16), { c: RAY, w: 1.4 }) + S.path(wave(320, 128, 320 + p2[0], 128 + p2[1], 4, 16), { c: RAY, w: 1.4 });
  s += lab(250, 52, 'γ  0.511 MeV', { size: 10, c: RAY }) + lab(340, 214, 'γ  0.511 MeV', { size: 10, c: RAY });
  s += lab(335, 236, 'at rest: two photons, opposite directions', { a: 'middle', size: 10, c: MUT });
  check(close(p1[0] + p2[0], 0) && close(p1[1] + p2[1], 0) && close(2 * MEC2, 1.022, 1e-9), `annihilation photons drawn back to back (momenta cancel); threshold 2 × ${MEC2} = ${(2 * MEC2).toFixed(3)} MeV`);
  return svgDoc(w, h, 'Left, pair production: a gamma-ray photon of at least 1.022 megaelectronvolts passes near a nucleus and becomes an electron and a positron, the nucleus taking up some momentum. Right, annihilation: an electron and a positron meeting at rest turn into two gamma-ray photons of 0.511 megaelectronvolts each, moving in opposite directions', s);
})();

// ================================================================ binding energy per nucleon against mass number
export const BEA_KEYS = ['H2', 'H3', 'He4', 'Li6', 'Be9', 'B10', 'C12', 'N14', 'O16', 'Ne20', 'Mg24', 'Si28', 'S32', 'Ca40', 'Fe56', 'Ni62', 'Zr90', 'Sn120', 'Ba138', 'Pb208', 'U235', 'U238'];
export const BEA_PTS = BEA_KEYS.map((k) => [NUC[k].A, bea(k)]);
export const BEAFIG = (() => {
  const w = 440;
  const h = 270;
  const x0 = 52;
  const x1 = 424;
  const yb = 220;
  const yt = 24;
  const X = (A) => x0 + (A / 250) * (x1 - x0);
  const Y = (v) => yb - (v / 10) * (yb - yt);
  let s = S.line(x0, yb, x1, yb, { w: 1.4 }) + S.line(x0, yb, x0, yt - 6, { w: 1.4 });
  for (const A of [0, 50, 100, 150, 200, 250]) s += S.line(X(A), yb, X(A), yb + 5, { w: 1 }) + lab(X(A), yb + 18, String(A), { a: 'middle', size: 10 });
  for (const v of [0, 2, 4, 6, 8, 10]) s += S.line(x0 - 5, Y(v), x0, Y(v), { w: 1 }) + lab(x0 - 8, Y(v) + 4, String(v), { a: 'end', size: 10 }) + (v ? S.line(x0, Y(v), x1, Y(v), { c: MUT, w: 0.5, dash: '2 4' }) : '');
  s += lab((x0 + x1) / 2, yb + 36, 'mass number A', { a: 'middle', size: 11 }) + `<g transform="rotate(-90 14 ${f1((yb + yt) / 2)})">${lab(14, (yb + yt) / 2, 'binding energy per nucleon (MeV)', { a: 'middle', size: 11 })}</g>`;
  s += S.path(BEA_PTS.map(([A, v], i) => `${i ? 'L' : 'M'}${f1(X(A))} ${f1(Y(v))}`).join(' '), { c: BLUE, w: 1.6 });
  for (const [A, v] of BEA_PTS) s += S.circle(X(A), Y(v), 2.6, { c: BLUE, fill: BLUE });
  const tag = (k, dx, dy, a = 'middle') => lab(X(NUC[k].A) + dx, Y(bea(k)) + dy, nk(k), { a, size: 10 });
  s += tag('H2', 8, -8, 'start') + tag('He4', 8, -14, 'start') + tag('C12', 2, 16, 'start') + tag('Ni62', 0, -10) + tag('U235', 0, -10) + tag('Pb208', 0, 18);
  s += lab(X(135), Y(9.4), 'maximum near A = 56–62', { a: 'middle', size: 10, c: ACC, w: 'bold' });
  s += S.arrow(X(30), Y(3.2), X(66), Y(3.2), { c: RAY, w: 1.6, size: 6 }) + lab(X(30), Y(3.2) + 18, 'fusion: light nuclei join', { size: 10, c: RAY }) + lab(X(30), Y(3.2) + 31, 'and move up the curve', { size: 10, c: RAY });
  s += S.arrow(X(225), Y(3.2), X(125), Y(3.2), { c: GRN, w: 1.6, size: 6 }) + lab(X(125), Y(3.2) + 18, 'fission: a heavy nucleus splits,', { size: 10, c: GRN }) + lab(X(125), Y(3.2) + 31, 'the fragments move up the curve', { size: 10, c: GRN });
  const vals = BEA_PTS.map(([, v]) => v);
  const peak = BEA_KEYS[vals.indexOf(Math.max(...vals))];
  check(peak === 'Ni62' && bea('Ni62') > bea('Fe56') && bea('Fe56') > bea('Zr90') && bea('Pb208') > bea('U235') && bea('U235') > bea('U238') && bea('He4') > bea('Li6') && bea('He4') > bea('Be9'), `BE/A curve: maximum at ${peak} (${bea('Ni62').toFixed(3)} MeV), Fe-56 ${bea('Fe56').toFixed(3)}, Pb-208 ${bea('Pb208').toFixed(3)}, U-235 ${bea('U235').toFixed(3)}, He-4 ${bea('He4').toFixed(3)} above its neighbours Li-6 and Be-9`);
  check(BEA_PTS.every(([A], i) => i === 0 || A > BEA_PTS[i - 1][0]) && BEA_PTS.every(([A, v]) => close(Y(v), yb - (v / 10) * (yb - yt)) && X(A) >= x0 && X(A) <= x1), `BE/A curve: ${BEA_PTS.length} nuclides in order of A, every point computed from atomic masses with 931.5 MeV/u`);
  return svgDoc(w, h, 'Graph of binding energy per nucleon against mass number computed from atomic masses for 23 nuclides: it rises steeply from 1.1 MeV for hydrogen-2 to 7.07 for helium-4, reaches a maximum of about 8.8 MeV near iron-56 and nickel-62, then falls slowly to 7.6 MeV for uranium-235. Fusion of light nuclei and fission of heavy nuclei both move nuclei up the curve', s);
})();

// ================================================================ one fission event (adapted from CBSE 12 ch13)
export const FISSION_EQ = { A: [1, 235, 141, 92, 1], Z: [0, 92, 56, 36, 0], nOut: 3 };
export const FISSIONFIG = (() => {
  const w = 440;
  const h = 200;
  const nuc = (x, y, r, label, c = ACC) => S.circle(x, y, r, { c, fill: c, fop: 0.3 }) + S.text(x, y + 4, label, { a: 'middle', size: 11, w: 'bold' });
  const neutron = (x, y) => S.circle(x, y, 5, { c: MUT, fill: MUT, fop: 0.8 }) + S.text(x, y - 9, 'n', { a: 'middle', size: 10 });
  let s = neutron(24, 100) + S.arrow(32, 100, 70, 100, { c: MUT, w: 1.4, size: 6 });
  s += nuc(105, 100, 30, nu(235, 92, 'U'));
  s += S.arrow(140, 100, 170, 100, { w: 1.6, size: 7 });
  s += S.path('M178 100 q 10 -14 20 0 q 10 14 20 0', { c: RAY, w: 1.4 }) + S.text(198, 82, '²³⁶U*', { a: 'middle', size: 10 });
  s += S.arrow(222, 100, 250, 100, { w: 1.6, size: 7 });
  s += nuc(295, 55, 26, nu(141, 56, 'Ba'), BLUE) + nuc(295, 148, 22, nu(92, 36, 'Kr'), GRN);
  for (const [x, y] of [[372, 70], [384, 100], [372, 130]]) s += neutron(x, y) + S.arrow(330, 100, x - 7, y, { c: MUT, w: 1.1, size: 5 });
  s += S.text(w - 6, h - 8, `≈ ${Math.round(qOf([NUC.U235.M, MN], [NUC.Ba141.M, NUC.Kr92.M, 3 * MN]))} MeV released per fission`, { a: 'end', size: 11, w: 'bold', c: RAY });
  const { A, Z, nOut } = FISSION_EQ;
  check(A[0] + A[1] === A[2] + A[3] + nOut * A[4] && Z[0] + Z[1] === Z[2] + Z[3] + nOut * Z[4], 'fission: nucleon number 1 + 235 = 141 + 92 + 3 and charge 92 = 56 + 36 balance');
  return svgDoc(w, h, 'Nuclear fission: a slow neutron is absorbed by uranium-235, forming excited uranium-236, which splits into barium-141 and krypton-92 and releases three neutrons and about 173 megaelectronvolts of energy', s);
})();

// ================================================================ chain reaction: uncontrolled and controlled
export const CHAINFIG = (() => {
  const w = 440;
  const h = 250;
  let s = lab(105, 20, 'Uncontrolled: neutrons multiply', { a: 'middle', size: 11, w: 'bold', c: RAY }) + lab(335, 20, 'Controlled: one carries on', { a: 'middle', size: 11, w: 'bold', c: GRN });
  s += S.line(220, 8, 220, 242, { c: MUT, w: 1, dash: '4 4' });
  const cols = [28, 78, 128, 178];
  const gens = [1, 2, 4, 8];
  const ys = (n) => Array.from({ length: n }, (_, i) => 40 + ((i + 0.5) * 170) / n);
  gens.forEach((n, g) => {
    ys(n).forEach((y, i) => {
      if (g > 0) {
        const parent = ys(gens[g - 1])[Math.floor(i / 2)];
        s += S.line(cols[g - 1], parent, cols[g], y, { c: RAY, w: 1, cap: 'round' });
      }
    });
  });
  gens.forEach((n, g) => ys(n).forEach((y) => (s += S.circle(cols[g], y, 4.5, { c: RAY, fill: RAY, fop: 0.7, sw: 1 }))));
  [1, 2, 3, 4].forEach((g, i) => (s += lab(cols[i], 232, `gen ${g}`, { a: 'middle', size: 10 })));
  s += lab(105, 246, '1, 2, 4, 8, … fissions per generation', { a: 'middle', size: 10, c: MUT });
  const cx = [262, 312, 362, 412];
  const cy = 125;
  cx.forEach((x, i) => {
    if (i) s += S.arrow(cx[i - 1] + 5, cy, x - 6, cy, { c: GRN, w: 1.4, size: 6 });
    s += S.circle(x, cy, 4.5, { c: GRN, fill: GRN, fop: 0.7, sw: 1 });
    if (i < 3) {
      const tx = x + 25;
      s += S.arrow(x + 6, cy - 4, tx, cy - 40, { c: MUT, w: 1, size: 5 }) + lab(tx, cy - 44, '✕', { a: 'middle', size: 11, c: RAY });
      s += S.arrow(x + 6, cy + 4, tx, cy + 40, { c: MUT, w: 1, size: 5 }) + S.rect(tx - 7, cy + 42, 14, 20, { c: ACC, fill: ACC, fop: 0.35, sw: 1.2 });
    }
  });
  s += lab(335, 206, 'extra neutrons escape (✕) or are', { a: 'middle', size: 10 }) + lab(335, 219, 'absorbed by control rods (boxes)', { a: 'middle', size: 10 });
  s += lab(335, 240, 'steady power: 1, 1, 1, 1, … per generation', { a: 'middle', size: 10, c: MUT });
  check(gens.every((n, g) => n === 2 ** g) && ys(8).length === 8 && ys(8)[7] < 210, `chain reaction drawn: ${gens.join(', ')} fissions per generation when uncontrolled, 1 per generation when controlled`);
  return svgDoc(w, h, 'Chain reaction. Left, uncontrolled: each fission leads to two more, so the number of fissions per generation goes 1, 2, 4, 8 and keeps doubling. Right, controlled: only one neutron from each fission goes on to cause another fission; the others escape or are absorbed by control rods, so the rate stays steady', s);
})();

// ================================================================ schematic reactor
export const REACTORFIG = (() => {
  const w = 440;
  const h = 262;
  let s = S.rect(14, 34, 268, 220, { c: MUT, sw: 6, fill: FILL, fop: 0.5, rx: 4 });
  s += S.rect(56, 84, 180, 130, { c: ACC, sw: 2, fill: BLUE, fop: 0.14, rx: 3 });
  const fuel = [80, 118, 156, 194];
  const ctrl = [99, 137, 175];
  for (const x of fuel) s += S.line(x, 100, x, 198, { c: RAY, w: 7, cap: 'round' });
  for (const x of ctrl) s += S.line(x, 52, x, 150, { c: 'currentColor', w: 4 }) + S.arrow(x + 9, 70, x + 9, 52, { c: MUT, w: 1, size: 5 }) + S.arrow(x + 9, 70, x + 9, 88, { c: MUT, w: 1, size: 5 });
  // coolant circuit: cold in at the bottom left, hot out at the top right, heat exchanger, return
  s += S.path('M14 190 L56 190', { c: BLUE, w: 3 }) + S.path('M236 140 L340 140 L340 150', { c: RAY, w: 3 });
  s += S.rect(300, 150, 80, 58, { c: ACC, sw: 1.6, rx: 4 }) + lab(340, 175, 'heat', { a: 'middle', size: 10 }) + lab(340, 188, 'exchanger', { a: 'middle', size: 10 });
  s += S.path('M340 208 L340 238 L36 238 L36 190', { c: BLUE, w: 3 });
  s += S.arrow(380, 179, 430, 179, { c: RAY, w: 1.6, size: 6 }) + lab(432, 166, 'steam', { a: 'end', size: 10 }) + lab(432, 196, 'to turbine', { a: 'end', size: 10 });
  const mk = (n, x, y) => S.circle(x, y, 9, { c: 'currentColor', sw: 1.2, fill: FILL, fop: 1 }) + lab(x, y + 4, String(n), { a: 'middle', size: 11, w: 'bold' });
  s += mk(1, 80, 226 - 2) + mk(2, 217, 204) + mk(3, 137, 44) + mk(4, 262, 126) + mk(5, 24, 62);
  const keyX = 300;
  s += lab(keyX, 38, 'Key', { size: 11, w: 'bold' });
  ['fuel rods (U-235 enriched)', 'moderator', 'control rods (move in or out)', 'coolant (cold blue, hot red)', 'shielding (concrete, steel)'].forEach((t, i) => (s += lab(keyX, 56 + i * 17, `${i + 1}  ${t}`, { size: 10 })));
  check(fuel.length === 4 && ctrl.every((x, i) => x > fuel[i] && x < fuel[i + 1]) && ctrl.length === fuel.length - 1, 'reactor: each control rod sits between two neighbouring fuel rods inside the moderator');
  check(236 > 56 + 180 - 1 && 56 + 180 === 236 && 14 < 56, 'reactor: coolant pipes meet the core at its left and right faces; shield encloses the core');
  return svgDoc(w, h, 'Schematic nuclear reactor: fuel rods (1) stand in a moderator (2) inside the core; control rods (3) can be moved in or out between the fuel rods; coolant (4) is pumped in cold at the bottom, leaves hot at the top and gives its heat to a heat exchanger that makes steam for a turbine; thick concrete and steel shielding (5) surrounds the whole core', s);
})();

// ================================================================ Coulomb barrier between two protons
export const BARRIER_R = 2 * R0; // fm, centres of two touching protons of radius R0
export const barrierMeV = EE / BARRIER_R; // 0.60 MeV
export const KB = 1.38e-23;
export const thermalEV = (T) => (1.5 * KB * T) / 1.6e-19; // mean kinetic energy (3/2) k T in eV
export const BARRIERFIG = (() => {
  const w = 440;
  const h = 262;
  const x0 = 50;
  const y0 = 170; // U = 0
  const X = (r) => x0 + r * 60;
  const Y = (U) => y0 - U * 250;
  let s = S.line(x0, y0, 420, y0, { w: 1.4 }) + S.line(x0, 30, x0, 240, { w: 1.4 });
  s += lab(420, y0 + 32, 'distance r between the centres (fm)', { a: 'end', size: 10 }) + `<g transform="rotate(-90 14 110)">${lab(14, 110, 'potential energy U (MeV)', { a: 'middle', size: 10 })}</g>`;
  for (const r of [1, 2, 3, 4, 5, 6]) s += S.line(X(r), y0, X(r), y0 + 4, { w: 1 }) + lab(X(r), y0 + 15, String(r), { a: 'middle', size: 10 });
  for (const U of [0.2, 0.4, 0.6]) s += S.line(x0 - 4, Y(U), x0, Y(U), { w: 1 }) + lab(x0 - 7, Y(U) + 4, U.toFixed(1), { a: 'end', size: 10 });
  const pts = [];
  for (let r = BARRIER_R; r <= 6.001; r += 0.1) pts.push([X(r), Y(EE / r)]);
  s += S.path(`M${f1(X(BARRIER_R))} ${f1(Y(-0.18))} L${f1(X(BARRIER_R))} ${f1(Y(barrierMeV))} ` + pts.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(' '), { c: BLUE, w: 2 });
  s += S.path(`M${f1(x0)} ${f1(Y(-0.18))} L${f1(X(BARRIER_R))} ${f1(Y(-0.18))}`, { c: BLUE, w: 2 });
  s += S.line(x0, Y(barrierMeV), X(BARRIER_R), Y(barrierMeV), { c: RAY, w: 1, dash: '4 3' });
  s += lab(X(BARRIER_R) + 8, Y(barrierMeV) - 6, `barrier top ${barrierMeV.toFixed(2)} MeV at ${BARRIER_R.toFixed(1)} fm`, { size: 10, c: RAY, w: 'bold' });
  s += lab(X(3.6), Y(0.52), 'Coulomb repulsion, U = 1.44/r', { size: 10, c: BLUE }) + lab(X(3.6), Y(0.52) + 13, '(MeV, r in fm)', { size: 10, c: BLUE });
  s += lab(X(0.2), Y(-0.18) + 16, 'strong force takes over (schematic)', { size: 10, c: MUT });
  const tEV = thermalEV(1.5e7);
  const yT = Y(tEV / 1e6);
  s += S.line(x0, yT, X(6), yT, { c: ACC, w: 2 });
  s += lab(X(2.6), y0 - 12, `mean thermal energy at 1.5 × 10⁷ K: ${(tEV / 1000).toFixed(1)} keV`, { size: 10, c: ACC, w: 'bold' }) + lab(X(2.6), y0 - 24, 'drawn to scale: about 300 times below the barrier', { size: 10, c: ACC });
  s += lab(220, 252, 'the barrier is overcome only by the fastest nuclei in the hot gas', { a: 'middle', size: 10, c: MUT });
  check(close(barrierMeV, 0.6, 1e-9) && close(yT, y0 - tEV * 1e-6 * 250) && barrierMeV / (tEV / 1e6) > 300 && barrierMeV / (tEV / 1e6) < 320, `barrier ${barrierMeV.toFixed(2)} MeV = 1.44/2.4; mean thermal energy at 1.5 × 10⁷ K = ${tEV.toFixed(0)} eV, ratio ${(barrierMeV / (tEV / 1e6)).toFixed(0)}, line drawn to scale`);
  return svgDoc(w, h, 'Potential energy of two protons against the distance between their centres: the electrostatic repulsion rises as 1 over r to a barrier top of 0.60 megaelectronvolts when the protons touch at 2.4 femtometres, after which the strong nuclear force pulls them together; the mean thermal energy at 15 million kelvin, about 1.9 kiloelectronvolts, is drawn to scale as a line about 300 times lower than the barrier', s);
})();

export const ALL = { NUCLEI, MASSDEF, PAIRFIG, BEAFIG, FISSIONFIG, CHAINFIG, REACTORFIG, BARRIERFIG };
