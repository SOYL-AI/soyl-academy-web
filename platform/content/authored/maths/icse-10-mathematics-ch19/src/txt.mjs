// Worked-line printers for ch19: each returns the LaTeX of one calculation, "formula with numbers = result", where the
// result is computed exactly by mens.mjs from the same givens (pi = 22/7 unless a different value p is passed).
// The chapter lint (math.arithmetic) and the build's re-solve checks then confirm every "=".
import { fr, pv, n, PI, cyl, cone, sph, hem, sqrtFr, must } from './mens.mjs';

const P = '\\dfrac{22}{7}';
const f = (x) => fr(x);
const p2 = (x) => `${n(x)}^2`;
const p3 = (x) => `${n(x)}^3`;
const par = (s) => `(${s})`;

/** Units written once after the result: u('cm', 2) -> "cm$^2$" for text after a closing dollar. */
export const U = { cm2: 'cm$^2$', cm3: 'cm$^3$', m2: 'm$^2$', m3: 'm$^3$', cm: 'cm', m: 'm', mm: 'mm', L: 'litres', kg: 'kg', g: 'g' };
/** A quantity in running text: "$1540$ cm$^3$". */
export const q = (x, u) => `$${typeof x === 'string' ? x : n(x)}$ ${u}`;

export const L = {
  slant: (r, h) => { const l = cone.l(f(r), f(h)); return `l = \\sqrt{r^2 + h^2} = \\sqrt{${p2(f(r))} + ${p2(f(h))}} = \\sqrt{${n(f(r).mul(r).add(f(h).mul(h)))}} = ${n(l)}`; },
  slantS: (r, h) => { const l = cone.l(f(r), f(h)); return `l = \\sqrt{${p2(f(r))} + ${p2(f(h))}} = \\sqrt{${n(f(r).mul(r).add(f(h).mul(h)))}} = ${n(l)}`; },
  cylCSA: (r, h, p = PI) => `2 \\times ${P} \\times ${n(r)} \\times ${n(h)} = ${n(pv(cyl.csa(f(r), f(h)), p))}`,
  cylTSA: (r, h) => `2 \\times ${P} \\times ${n(r)} \\times ${par(`${n(r)} + ${n(h)}`)} = ${n(pv(cyl.tsa(f(r), f(h))))}`,
  cylV: (r, h) => `${P} \\times ${p2(f(r))} \\times ${n(h)} = ${n(pv(cyl.vol(f(r), f(h))))}`,
  hollowV: (R, r, h) => `${P} \\times ${n(h)} \\times ${par(`${p2(f(R))} - ${p2(f(r))}`)} = ${n(pv(cyl.hvol(f(R), f(r), f(h))))}`,
  coneCSA: (r, l) => `${P} \\times ${n(r)} \\times ${n(l)} = ${n(pv(cone.csa(f(r), f(l))))}`,
  coneTSA: (r, l) => `${P} \\times ${n(r)} \\times ${par(`${n(r)} + ${n(l)}`)} = ${n(pv(cone.tsa(f(r), f(l))))}`,
  coneV: (r, h) => `\\dfrac{1}{3} \\times ${P} \\times ${p2(f(r))} \\times ${n(h)} = ${n(pv(cone.vol(f(r), f(h))))}`,
  sphS: (r) => `4 \\times ${P} \\times ${p2(f(r))} = ${n(pv(sph.sa(f(r))))}`,
  sphV: (r) => `\\dfrac{4}{3} \\times ${P} \\times ${p3(f(r))} = ${n(pv(sph.vol(f(r))))}`,
  shellV: (R, r) => `\\dfrac{4}{3} \\times ${P} \\times ${par(`${p3(f(R))} - ${p3(f(r))}`)} = ${n(pv(sph.shell(f(R), f(r))))}`,
  hemCSA: (r) => `2 \\times ${P} \\times ${p2(f(r))} = ${n(pv(hem.csa(f(r))))}`,
  hemTSA: (r) => `3 \\times ${P} \\times ${p2(f(r))} = ${n(pv(hem.tsa(f(r))))}`,
  hemV: (r) => `\\dfrac{2}{3} \\times ${P} \\times ${p3(f(r))} = ${n(pv(hem.vol(f(r))))}`,
  hemShell: (R, r) => `\\dfrac{2}{3} \\times ${P} \\times ${par(`${p3(f(R))} - ${p3(f(r))}`)} = ${n(pv(hem.shell(f(R), f(r))))}`,
};
must(L.cylV(7, 15) === '\\dfrac{22}{7} \\times 7^2 \\times 15 = 2310', 'printer cylV');
must(L.coneV(10.5, 14) === '\\dfrac{1}{3} \\times \\dfrac{22}{7} \\times 10.5^2 \\times 14 = 1617', 'printer coneV');

import { piTex } from './mens.mjs';
const rw = String.raw;

// ---------------------------------------------------------------- numbers in words (narration is read by text-to-speech)
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function intWords(k) {
  if (k < 20) return ONES[k];
  if (k < 100) return TENS[Math.floor(k / 10)] + (k % 10 ? ` ${ONES[k % 10]}` : '');
  if (k < 1000) return `${ONES[Math.floor(k / 100)]} hundred${k % 100 ? ` and ${intWords(k % 100)}` : ''}`;
  if (k < 1000000) return `${intWords(Math.floor(k / 1000))} thousand${k % 1000 ? (k % 1000 < 100 ? ' and ' : ' ') + intWords(k % 1000) : ''}`;
  throw new Error(`number too large to say: ${k}`);
}
/** An exact value (Fr, or a number or string written as a decimal) as words: say(10.5) is "ten point five". */
export function say(x) {
  const s = typeof x === 'string' ? x : typeof x === 'number' ? String(x) : n(x);
  const [i, d] = s.split('.');
  return intWords(Number(i)) + (d ? ` point ${[...d].map((c) => ONES[Number(c)]).join(' ')}` : '');
}
must(say(10.5) === 'ten point five' && say(1540) === 'one thousand five hundred and forty' && say(2310) === 'two thousand three hundred and ten' && say(0.05) === 'zero point zero five' && say(20) === 'twenty', 'say');
/** Symbolic-pi lines: "formula with numbers = k pi" (the coefficient is computed exactly). */
export const S = {
  cylV: (r, h) => rw`\pi \times ${p2(f(r))} \times ${n(h)} = ${piTex(cyl.vol(f(r), f(h)))}`,
  cylTSA: (r, h) => rw`2\pi \times ${n(r)} \times ${par(`${n(r)} + ${n(h)}`)} = ${piTex(cyl.tsa(f(r), f(h)))}`,
  sphV: (r) => rw`\dfrac{4}{3} \times \pi \times ${p3(f(r))} = ${piTex(sph.vol(f(r)))}`,
  sphS: (r) => rw`4 \times \pi \times ${p2(f(r))} = ${piTex(sph.sa(f(r)))}`,
  shellV: (R, r) => rw`\dfrac{4}{3} \times \pi \times ${par(`${p3(f(R))} - ${p3(f(r))}`)} = ${piTex(sph.shell(f(R), f(r)))}`,
  coneCSA: (r, l) => rw`\pi \times ${n(r)} \times ${n(l)} = ${piTex(cone.csa(f(r), f(l)))}`,
};

