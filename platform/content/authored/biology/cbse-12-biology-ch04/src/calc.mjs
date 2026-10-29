// Independent Punnett engine for ch04: every ratio, count and probability in the chapter is computed here.
// A genotype is a string of allele pairs, e.g. 'Tt', 'RrYy'; each gene is two characters.
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

/** Recombination frequency (%) from counts of parental and recombinant offspring. */
export const recombination = (recombinant, total) => Math.round((recombinant / total) * 1000) / 10;

/** Polygenic: number of phenotype classes with k additive genes = 2k + 1; fraction of the darkest class in an F2 = (1/4)^k. */
export const polyClasses = (k) => 2 * k + 1;
export const polyExtreme = (k) => (1 / 4) ** k;
