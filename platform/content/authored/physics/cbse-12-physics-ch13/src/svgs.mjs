// ch13 diagrams: nuclei drawn to scale with R = R₀A^(1/3); a fission event (n + U-235 → Ba-141 + Kr-92 + 3n, nucleon and
// charge numbers checked); D–T fusion (balance checked). SELF_CHECKS read by build.mjs.
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';

export const R0 = 1.2; // fm
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- nuclear sizes to scale
export const SIZES = (() => {
  const w = 420;
  const h = 190;
  const k = 8; // px per fm
  const list = [['⁴He', 4], ['¹²C', 12], ['⁵⁶Fe', 56], ['²³⁸U', 238]];
  let x = 30;
  let s = '';
  const rs = [];
  for (const [name, A] of list) {
    const R = R0 * Math.cbrt(A);
    rs.push(R);
    const rp = R * k;
    x += rp;
    s += S.circle(x, 95, rp, { c: ACC, fill: ACC, fop: 0.25 }) + S.text(x, 95 + rp + 16, name, { a: 'middle', size: 11, w: 'bold' }) + S.text(x, 95 + rp + 30, `R ≈ ${R.toFixed(1)} fm`, { a: 'middle', size: 10 });
    x += rp + 22;
  }
  s += S.text(w - 6, 18, 'R = R₀A^(1/3), R₀ = 1.2 fm (to scale)', { a: 'end', size: 11, w: 'bold' });
  check(Math.abs(rs[3] / rs[0] - Math.cbrt(238 / 4)) < 1e-12 && x < w + 10, `nuclear sizes: R(U-238)/R(He-4) = ${(rs[3] / rs[0]).toFixed(2)} = (238/4)^(1/3), drawn within the frame`);
  return svgDoc(w, h, 'Nuclei of helium-4, carbon-12, iron-56 and uranium-238 drawn to scale using R equals R0 times A to the one third: the uranium nucleus is only about four times wider than the helium nucleus although it has about sixty times as many nucleons', s);
})();

// ---------------------------------------------------------------- fission event
export const FISSION_EQ = { A: [1, 235, 141, 92, 1], Z: [0, 92, 56, 36, 0], nOut: 3 };
export const FISSION = (() => {
  const w = 420;
  const h = 200;
  const nuc = (x, y, r, label, c = ACC) => S.circle(x, y, r, { c, fill: c, fop: 0.3 }) + S.text(x, y + 4, label, { a: 'middle', size: 11, w: 'bold' });
  const neutron = (x, y) => S.circle(x, y, 5, { c: MUT, fill: MUT, fop: 0.8 }) + S.text(x, y - 9, 'n', { a: 'middle', size: 10 });
  let s = neutron(24, 100) + S.arrow(32, 100, 70, 100, { c: MUT, w: 1.4, size: 6 });
  s += nuc(105, 100, 30, '²³⁵U');
  s += S.arrow(140, 100, 170, 100, { w: 1.6, size: 7 });
  s += S.path('M178 100 q 10 -14 20 0 q 10 14 20 0', { c: RAY, w: 1.4 }) + S.text(198, 82, '²³⁶U*', { a: 'middle', size: 10 });
  s += S.arrow(222, 100, 250, 100, { w: 1.6, size: 7 });
  s += nuc(295, 55, 26, '¹⁴¹Ba', BLUE) + nuc(295, 148, 22, '⁹²Kr', GRN);
  for (const [x, y] of [[372, 70], [384, 100], [372, 130]]) s += neutron(x, y) + S.arrow(330, 100, x - 7, y, { c: MUT, w: 1.1, size: 5 });
  s += S.text(w - 6, h - 8, '≈ 200 MeV released per fission', { a: 'end', size: 11, w: 'bold', c: RAY });
  const { A, Z, nOut } = FISSION_EQ;
  const okA = A[0] + A[1] === A[2] + A[3] + nOut * A[4];
  const okZ = Z[0] + Z[1] === Z[2] + Z[3] + nOut * Z[4];
  check(okA && okZ, `fission: nucleon number 1 + 235 = 141 + 92 + 3 and charge 92 = 56 + 36 balance`);
  return svgDoc(w, h, 'Nuclear fission: a slow neutron is absorbed by uranium-235, forming excited uranium-236, which splits into barium-141 and krypton-92 and releases three neutrons and about 200 megaelectronvolts of energy', s);
})();

// ---------------------------------------------------------------- D–T fusion
export const FUSION = (() => {
  const w = 420;
  const h = 170;
  const ball = (x, y, c, t) => S.circle(x, y, 7, { c, fill: c, fop: 0.7 }) + (t ? S.text(x, y + 4, t, { a: 'middle', size: 10, w: 'bold' }) : '');
  let s = '';
  // deuteron (1p 1n) and triton (1p 2n)
  s += ball(40, 70, RAY, '+') + ball(54, 70, MUT) + S.text(47, 98, '²H', { a: 'middle', size: 11, w: 'bold' });
  s += ball(40, 130, RAY, '+') + ball(54, 130, MUT) + ball(47, 118, MUT) + S.text(47, 156, '³H', { a: 'middle', size: 11, w: 'bold' });
  s += S.arrow(70, 74, 140, 96, { w: 1.4, size: 6 }) + S.arrow(70, 126, 140, 104, { w: 1.4, size: 6 });
  s += S.text(105, 70, 'high temperature', { a: 'middle', size: 10 }) + S.text(118, 152, '(overcome repulsion)', { a: 'middle', size: 10 });
  s += S.arrow(160, 100, 220, 100, { w: 1.6, size: 7 });
  s += ball(250, 92, RAY, '+') + ball(264, 92, RAY, '+') + ball(250, 106, MUT) + ball(264, 106, MUT) + S.text(257, 132, '⁴He', { a: 'middle', size: 11, w: 'bold' });
  s += ball(330, 100, MUT) + S.arrow(338, 100, 380, 100, { c: MUT, w: 1.3, size: 6 }) + S.text(330, 84, 'n', { a: 'middle', size: 10 });
  s += S.text(w - 6, 22, '²H + ³H → ⁴He + n + 17.6 MeV', { a: 'end', size: 11, w: 'bold', c: RAY });
  const okA = 2 + 3 === 4 + 1;
  const okZ = 1 + 1 === 2 + 0;
  check(okA && okZ, 'fusion: 2 + 3 = 4 + 1 nucleons and 1 + 1 = 2 charges balance');
  return svgDoc(w, h, 'Nuclear fusion: a deuterium nucleus and a tritium nucleus, forced together at very high temperature, fuse into a helium-4 nucleus and a neutron, releasing about 17.6 megaelectronvolts', s);
})();

export const ALL = { SIZES, FISSION, FUSION };
