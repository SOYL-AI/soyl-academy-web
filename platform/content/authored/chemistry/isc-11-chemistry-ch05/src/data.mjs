// ISC 11 Chemistry ch05 Quantum Mechanical Model and Electronic Configuration: shared data and helpers, so every number
// in the decks, notes and questions is computed once (Aufbau order, configurations of atoms and ions, nodes, quantum numbers).
export const LETTER = 'spdf';
export const cap = (l) => 2 * (2 * l + 1);
export const orbitalsIn = (l) => 2 * l + 1;

/** All subshells up to n = 7 in order of increasing (n + l), ties by lower n (the Aufbau order). */
export const ORDER = (() => {
  const all = [];
  for (let n = 1; n <= 7; n++) for (let l = 0; l <= Math.min(n - 1, 3); l++) all.push({ n, l, name: `${n}${LETTER[l]}`, nl: n + l });
  return all.sort((a, b) => a.nl - b.nl || a.n - b.n);
})();
export const ORDER_NAMES = ORDER.map((s) => s.name);
const subOf = (name) => ({ n: Number(name[0]), l: LETTER.indexOf(name[1]), name });

/** Ground-state occupation as [[name, electrons]…] in order of increasing n then l (textbook style, 3d before 4s). */
const EXC = { 24: { '3d': 5, '4s': 1 }, 29: { '3d': 10, '4s': 1 } }; // Cr and Cu (half-filled and filled d)
function fillNeutral(z, useExc = true) {
  let left = z;
  const occ = {};
  for (const s of ORDER) {
    if (left <= 0) break;
    const k = Math.min(left, cap(s.l));
    occ[s.name] = k;
    left -= k;
  }
  if (useExc && EXC[z]) Object.assign(occ, EXC[z]);
  return occ;
}
const display = (occ) =>
  Object.entries(occ)
    .filter(([, k]) => k > 0)
    .sort((a, b) => Number(a[0][0]) - Number(b[0][0]) || LETTER.indexOf(a[0][1]) - LETTER.indexOf(b[0][1]));
/** config(z, charge): ground-state configuration of the atom (charge 0) or ion. Cations lose electrons from the highest n
 * first (then highest l); anions add electrons by the Aufbau order (main-group anions only). */
export function config(z, charge = 0) {
  if (charge <= 0) return display(fillNeutral(z - charge, charge === 0));
  const occ = { ...fillNeutral(z) };
  for (let i = 0; i < charge; i++) {
    const top = Object.entries(occ)
      .filter(([, k]) => k > 0)
      .map(([nm]) => subOf(nm))
      .sort((a, b) => b.n - a.n || b.l - a.l)[0];
    occ[top.name]--;
  }
  return display(occ);
}
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((d) => SUP[d]).join('');
export const fmtU = (occ) => occ.map(([s, k]) => `${s}${sup(k)}`).join(' ');
export const fmtL = (occ) => occ.map(([s, k]) => `${s}^{${k}}`).join('\\,');
export const total = (occ) => occ.reduce((a, [, k]) => a + k, 0);
export const cfgU = (z, q = 0) => fmtU(config(z, q));
export const cfgL = (z, q = 0) => fmtL(config(z, q));
/** Noble-gas core shorthand for atoms and ions, e.g. [Ar] 3d⁶ 4s². */
const CORES = [[2, 'He', ['1s']], [10, 'Ne', ['1s', '2s', '2p']], [18, 'Ar', ['1s', '2s', '2p', '3s', '3p']], [36, 'Kr', ['1s', '2s', '2p', '3s', '3p', '3d', '4s', '4p']]];
export function shortU(z, q = 0) {
  const occ = config(z, q);
  const ne = z - q;
  const core = [...CORES].reverse().find(([cz, , subs]) => cz <= ne && subs.every((s) => occ.some(([nm, k]) => nm === s && k === cap(LETTER.indexOf(s[1])))));
  if (!core) return fmtU(occ);
  const rest = occ.filter(([nm]) => !core[2].includes(nm));
  return `[${core[1]}] ${fmtU(rest)}`.trim();
}
/** Unpaired electrons by Hund's rule: each subshell fills its boxes singly first. */
export function unpaired(occ) {
  return occ.reduce((a, [nm, k]) => {
    const boxes = orbitalsIn(LETTER.indexOf(nm[1]));
    return a + (k <= boxes ? k : 2 * boxes - k);
  }, 0);
}
export const unp = (z, q = 0) => unpaired(config(z, q));
export const countL = (z, q, l) => config(z, q).filter(([nm]) => LETTER.indexOf(nm[1]) === l).reduce((a, [, k]) => a + k, 0);
export const inSub = (z, q, name) => (config(z, q).find(([nm]) => nm === name) ?? [name, 0])[1];

// ---- quantum numbers and nodes
export const nodes = (n, l) => ({ radial: n - l - 1, angular: l, total: n - 1 });
export const orbitalsInShell = (n) => n * n;
export const electronsInShell = (n) => 2 * n * n;
export const lValues = (n) => Array.from({ length: n }, (_, l) => l);
export const mlValues = (l) => Array.from({ length: 2 * l + 1 }, (_, i) => i - l);
export const validSet = (n, l, ml, ms) => Number.isInteger(n) && n >= 1 && Number.isInteger(l) && l >= 0 && l <= n - 1 && Number.isInteger(ml) && Math.abs(ml) <= l && (ms === 0.5 || ms === -0.5);
export const nlOf = (name) => Number(name[0]) + LETTER.indexOf(name[1]);
/** Orders subshell names by the (n + l) rule, ties by lower n. */
export const byEnergy = (names) => [...names].sort((a, b) => nlOf(a) - nlOf(b) || Number(a[0]) - Number(b[0]));
export const NAMES = { 1: 'K', 2: 'L', 3: 'M', 4: 'N' };

// ---- hydrogen-like radial functions (Z = 1, r in units of a0); P(r) = r^2 R^2
const R = {
  '1s': (r) => 2 * Math.exp(-r),
  '2s': (r) => (1 / (2 * Math.SQRT2)) * (2 - r) * Math.exp(-r / 2),
  '2p': (r) => (1 / (2 * Math.sqrt(6))) * r * Math.exp(-r / 2),
  '3s': (r) => (2 / (81 * Math.sqrt(3))) * (27 - 18 * r + 2 * r * r) * Math.exp(-r / 3),
  '3p': (r) => (8 / (27 * Math.sqrt(6))) * r * (1 - r / 6) * Math.exp(-r / 3),
  '3d': (r) => (4 / (81 * Math.sqrt(30))) * r * r * Math.exp(-r / 3),
};
export const Rfun = (name) => R[name];
export const Pfun = (name) => (r) => r * r * R[name](r) ** 2;
export function radialInfo(name, rmax = 40, step = 0.005) {
  const f = R[name];
  const P = Pfun(name);
  let nodesAt = [];
  let prev = f(step);
  let integral = 0;
  let best = { r: 0, p: 0 };
  let peaks = [];
  let pPrev2 = 0;
  let pPrev = 0;
  for (let r = step; r <= rmax; r += step) {
    const v = f(r);
    if (prev * v < 0) nodesAt.push(r - step / 2);
    prev = v;
    const p = P(r);
    integral += p * step;
    if (p > best.p) best = { r, p };
    if (pPrev > pPrev2 && pPrev > p && pPrev > 1e-4) peaks.push(r - step);
    pPrev2 = pPrev;
    pPrev = p;
  }
  return { nodesAt, integral, rMax: best.r, pMax: best.p, peaks };
}
