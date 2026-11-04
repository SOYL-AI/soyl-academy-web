// Shared data and pure functions for ch07 Structure of an Atom: the first 20 elements (symbol, name, atomic number,
// common mass number as used in school books), electron distribution by the 2, 8, 8 rule, valency, particle counts
// for atoms and ions, and the weighted average atomic mass.

export const ELEMENTS = [
  ['H', 'Hydrogen', 1, 1],
  ['He', 'Helium', 2, 4],
  ['Li', 'Lithium', 3, 7],
  ['Be', 'Beryllium', 4, 9],
  ['B', 'Boron', 5, 11],
  ['C', 'Carbon', 6, 12],
  ['N', 'Nitrogen', 7, 14],
  ['O', 'Oxygen', 8, 16],
  ['F', 'Fluorine', 9, 19],
  ['Ne', 'Neon', 10, 20],
  ['Na', 'Sodium', 11, 23],
  ['Mg', 'Magnesium', 12, 24],
  ['Al', 'Aluminium', 13, 27],
  ['Si', 'Silicon', 14, 28],
  ['P', 'Phosphorus', 15, 31],
  ['S', 'Sulphur', 16, 32],
  ['Cl', 'Chlorine', 17, 35],
  ['Ar', 'Argon', 18, 40],
  ['K', 'Potassium', 19, 39],
  ['Ca', 'Calcium', 20, 40],
].map(([sym, name, z, a]) => ({ sym, name, z, a }));

export const bySym = (s) => ELEMENTS.find((e) => e.sym === s);
export const byZ = (z) => ELEMENTS.find((e) => e.z === z);

/** Electron distribution by shells for Z up to 20: K holds 2, L holds 8, M holds 8 (first 20 elements), the rest goes to N. */
export function shells(z) {
  const cap = [2, 8, 8, 8];
  const out = [];
  let left = z;
  for (const c of cap) {
    if (left <= 0) break;
    const k = Math.min(c, left);
    out.push(k);
    left -= k;
  }
  if (left !== 0) throw new Error(`Z ${z} too large for the 2, 8, 8 rule`);
  return out;
}
export const dist = (z) => shells(z).join(', ');
export const outer = (z) => shells(z).at(-1);
/** Valency: a full outer shell (duplet for K only, octet otherwise) gives 0; up to 4 outer electrons gives that number; 5 to 7 gives 8 minus it. */
export function valency(z) {
  const s = shells(z);
  const o = s.at(-1);
  if ((s.length === 1 && o === 2) || o === 8) return 0;
  return o <= 4 ? o : 8 - o;
}

/** Particle counts for a species with atomic number z, mass number a and charge q (+ve cation, -ve anion). */
export const count = (z, a, q = 0) => ({ p: z, n: a - z, e: z - q });
export const total = (c) => c.p + c.n + c.e;

/** Average atomic mass from [mass number, percentage] pairs. */
export const avgMass = (pairs) => pairs.reduce((s, [m, pct]) => s + (m * pct) / 100, 0);
