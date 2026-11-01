// ICSE 10 Biology ch02 Genetics — Punnett engine copied from isc-12-biology-ch05/src/calc.mjs (same author); every ratio,
// count and probability in this chapter is computed here.
// Upper case = dominant, lower case = recessive (unless a gene is declared incomplete/co-dominant).

const pairs = (g) => Array.from({ length: g.length / 2 }, (_, i) => g.slice(2 * i, 2 * i + 2));

/** Gametes with probabilities (independent assortment of unlinked genes). */
export function gametes(g) {
  let out = [['', 1]];
  for (const p of pairs(g)) {
    const next = new Map();
    for (const [gam, pr] of out) for (const a of p) next.set(gam + a, (next.get(gam + a) ?? 0) + pr / 2);
    out = [...next.entries()];
  }
  return out;
}
/** Sorted allele pair: dominant (upper case) first, as conventionally written. */
const norm = (a, b) => (a <= b ? a + b : b + a);
/** Genotype distribution of a cross, keys in conventional order, values as probabilities. */
export function cross(g1, g2) {
  const res = new Map();
  for (const [x, px] of gametes(g1))
    for (const [y, py] of gametes(g2)) {
      let gt = '';
      for (let i = 0; i < x.length; i++) gt += norm(x[i], y[i]);
      res.set(gt, (res.get(gt) ?? 0) + px * py);
    }
  return res;
}
/** Phenotype per gene: 'D' dominant shown, 'r' recessive; for incomplete dominance returns the pair class. */
export function phenotype(gt, incomplete = []) {
  return pairs(gt)
    .map((p, i) => (incomplete.includes(i) ? (p[0] === p[1] ? (p[0] === p[0].toUpperCase() ? 'AA' : 'aa') : 'Aa') : p[0] === p[0].toUpperCase() || p[1] === p[1].toUpperCase() ? 'D' : 'r'))
    .join('');
}
export function phenoRatio(g1, g2, incomplete = []) {
  const m = new Map();
  for (const [gt, p] of cross(g1, g2)) {
    const ph = phenotype(gt, incomplete);
    m.set(ph, (m.get(ph) ?? 0) + p);
  }
  return m;
}
/** Express a probability map as smallest whole-number ratio, ordered by the given keys. */
export function ratio(map, keys) {
  const vals = keys.map((k) => map.get(k) ?? 0);
  const den = 64;
  const ints = vals.map((v) => Math.round(v * den));
  const g = ints.reduce((a, b) => gcd(a, b));
  return ints.map((v) => v / g);
}
function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}
/** Count of offspring expected in a sample of n for a given probability. */
export const expect = (p, n) => Math.round(p * n);

/** ABO: alleles IA, IB, i written as 'A', 'B', 'O' pairs, e.g. 'AO', 'AB', 'OO'. */
export function abo(g1, g2) {
  const out = new Map();
  for (const a of g1) for (const b of g2) {
    const s = [a, b].sort().join('');
    const blood = s === 'OO' ? 'O' : s === 'AB' ? 'AB' : s.includes('A') ? 'A' : 'B';
    out.set(blood, (out.get(blood) ?? 0) + 0.25);
  }
  return out;
}

/** X-linked recessive: mother 'XX' | 'XXh' (carrier) | 'XhXh', father 'XY' | 'XhY'. Returns probabilities by child class. */
export function xlinked(mother, father) {
  const m = mother === 'XX' ? ['X', 'X'] : mother === 'XXh' ? ['X', 'Xh'] : ['Xh', 'Xh'];
  const f = father === 'XY' ? ['X', 'Y'] : ['Xh', 'Y'];
  const out = { normalDaughter: 0, carrierDaughter: 0, affectedDaughter: 0, normalSon: 0, affectedSon: 0 };
  for (const a of m) for (const b of f) {
    const p = 0.25;
    if (b === 'Y') out[a === 'X' ? 'normalSon' : 'affectedSon'] += p;
    else {
      const h = [a, b].filter((x) => x === 'Xh').length;
      out[h === 0 ? 'normalDaughter' : h === 1 ? 'carrierDaughter' : 'affectedDaughter'] += p;
    }
  }
  return out;
}


// ---------------------------------------------------------------- ICSE 10 additions
/** Expected numbers in a sample for a ratio, e.g. split(800, [3, 1]) -> [600, 200]. */
export const split = (n, r) => {
  const t = r.reduce((a, b) => a + b, 0);
  return r.map((x) => (n * x) / t);
};
/** Probability as a percentage. */
export const pctOf = (p) => Math.round(p * 1000) / 10;

// Imagined counts used in the chapter.
export const MONO_N = 820; // F2 plants from violet x white
export const DI_N = 640; // F2 seeds of a dihybrid cross
export const TEST_N = 96; // offspring of a test cross

const m = phenoRatio('Vv', 'Vv');
export const MONO_R = ratio(m, ['D', 'r']); // [3, 1]
export const MONO_G = ratio(cross('Vv', 'Vv'), ['VV', 'Vv', 'vv']); // [1, 2, 1]
export const DI_R = ratio(phenoRatio('TtVv', 'TtVv'), ['DD', 'Dr', 'rD', 'rr']); // [9, 3, 3, 1]
export const MONO_SPLIT = split(MONO_N, MONO_R);
export const DI_SPLIT = split(DI_N, DI_R);
export const TEST_SPLIT = split(TEST_N, ratio(phenoRatio('Tt', 'tt'), ['D', 'r']));
export const HAEMO = xlinked('XXh', 'XY');
export const CB = xlinked('XX', 'XhY');

if (MONO_R.join() !== '3,1' || MONO_G.join() !== '1,2,1' || DI_R.join() !== '9,3,3,1' || MONO_SPLIT.join() !== '615,205' || DI_SPLIT.join() !== '360,120,120,40' || TEST_SPLIT.join() !== '48,48') throw new Error('calc ratios');
if (HAEMO.affectedSon !== 0.25 || HAEMO.carrierDaughter !== 0.25 || CB.carrierDaughter !== 0.5 || CB.normalSon !== 0.5) throw new Error('calc xlinked');
