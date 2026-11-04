// Shared data and helpers for ch03 (used by decks and questions so every number is computed once).
export const ROOTS = ['nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn'];
/** IUPAC systematic name and three-letter symbol for Z >= 100. */
export function nomen(z) {
  const roots = String(z).split('').map((d) => ROOTS[Number(d)]);
  let name = roots.join('') + 'ium';
  name = name.replace(/iium$/, 'ium');
  const sym = roots.map((x, i) => (i === 0 ? x[0].toUpperCase() : x[0])).join('');
  return { name, sym, roots };
}
/** Inverse: systematic name to Z. */
export function fromName(name) {
  let s = name.replace(/ium$/, '');
  const out = [];
  while (s.length) {
    const root = [...ROOTS].sort((a, b) => b.length - a.length).find((rt) => s.startsWith(rt));
    if (!root) throw new Error(`bad name ${name}`);
    out.push(ROOTS.indexOf(root));
    s = s.slice(root.length);
  }
  return Number(out.join(''));
}

// ---- configuration, block, period, group (Aufbau; exceptions such as Cr and Cu are not used in this chapter)
const ORDER = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
const CAP = { s: 2, p: 6, d: 10, f: 14 };
export function locate(z) {
  let left = z;
  const occ = [];
  for (const sub of ORDER) {
    if (left <= 0) break;
    const n = Math.min(left, CAP[sub[1]]);
    occ.push([sub, n]);
    left -= n;
  }
  const [last, ne] = occ[occ.length - 1];
  const block = last[1];
  const period = Math.max(...occ.filter(([s]) => s[1] === 's').map(([s]) => Number(s[0])));
  let group = null;
  if (block === 's') group = z === 2 ? 18 : ne;
  else if (block === 'p') group = 12 + ne;
  else if (block === 'd') group = ne + 2;
  const config = occ.map(([s, n]) => `${s}${n}`).join(' ');
  return { z, block, period, group, config, occ };
}
/** Atomic number from period and group (long form, group 3 as Sc/Y/La/Ac, f-block excluded). */
export function zFrom(period, group) {
  if (period === 1) return group === 1 ? 1 : 2;
  const before = { 2: 2, 3: 10, 4: 18, 5: 36, 6: 54, 7: 86 }[period];
  if (period <= 3) return before + (group <= 2 ? group : group - 10);
  if (period <= 5) return before + group;
  return before + (group <= 2 ? group : 14 + group);
}
export const fmtConfig = (z) => {
  const { occ } = locate(z);
  const sup = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const s = (n) => String(n).split('').map((d) => sup[d]).join('');
  return occ.map(([sub, n]) => `${sub}${s(n)}`).join(' ');
};
/** Noble-gas core shorthand, e.g. [Ar] 3d⁶ 4s². Subshells listed in order of n for the valence part. */
export function shorthand(z) {
  const cores = [[2, 'He'], [10, 'Ne'], [18, 'Ar'], [36, 'Kr'], [54, 'Xe'], [86, 'Rn']];
  const core = [...cores].reverse().find(([cz]) => cz < z);
  const sup = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const s = (n) => String(n).split('').map((d) => sup[d]).join('');
  const { occ } = locate(z);
  const cz = core ? core[0] : 0;
  let acc = 0;
  const rest = [];
  for (const [sub, n] of occ) {
    if (acc >= cz) rest.push([sub, n]);
    acc += n;
  }
  // order valence part by n then l (textbook style 3d before 4s)
  rest.sort((a, b) => Number(a[0][0]) - Number(b[0][0]) || 'spdf'.indexOf(a[0][1]) - 'spdf'.indexOf(b[0][1]));
  return `${core ? `[${core[1]}] ` : ''}${rest.map(([sub, n]) => `${sub}${s(n)}`).join(' ')}`;
}
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---- Dobereiner triads (relative atomic masses, rounded as in textbooks)
export const TRIADS = [
  { els: ['Li', 'Na', 'K'], m: [6.9, 23.0, 39.1] },
  { els: ['Ca', 'Sr', 'Ba'], m: [40.1, 87.6, 137.3] },
  { els: ['Cl', 'Br', 'I'], m: [35.5, 79.9, 126.9] },
];
export const avgOuter = (t) => (t.m[0] + t.m[2]) / 2;
