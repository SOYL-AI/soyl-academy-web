// Shared data and pure functions for ch08 Atoms and Molecules: atomic masses (as given for this chapter), a formula parser,
// molecular / formula unit masses, and the criss-cross method.

/** Atomic masses in u, as supplied for this chapter. */
export const AM = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40 };

/** Counts atoms in a formula such as "Al2(SO4)3" or "C2H5OH" (no hydrates, no charges). Returns { Al: 2, S: 3, O: 12 }. */
export function atoms(formula) {
  let i = 0;
  const parseGroup = () => {
    const out = {};
    while (i < formula.length && formula[i] !== ')') {
      let part;
      if (formula[i] === '(') {
        i++;
        part = parseGroup();
        i++; // ')'
      } else {
        const m = /^[A-Z][a-z]?/.exec(formula.slice(i));
        if (!m) throw new Error(`bad formula ${formula} at ${i}`);
        i += m[0].length;
        part = { [m[0]]: 1 };
      }
      const n = /^\d+/.exec(formula.slice(i));
      const k = n ? Number(n[0]) : 1;
      if (n) i += n[0].length;
      for (const [el, c] of Object.entries(part)) out[el] = (out[el] ?? 0) + c * k;
    }
    return out;
  };
  const res = parseGroup();
  if (i !== formula.length) throw new Error(`bad formula ${formula}`);
  return res;
}
/** Molecular mass or formula unit mass in u. */
export function mass(formula) {
  let total = 0;
  for (const [el, n] of Object.entries(atoms(formula))) {
    if (!(el in AM)) throw new Error(`no atomic mass for ${el}`);
    total += AM[el] * n;
  }
  return total;
}
export const natoms = (formula) => Object.values(atoms(formula)).reduce((a, b) => a + b, 0);

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
/**
 * Criss-cross method. cation and anion are { sym, val, poly } where `sym` is the text of the formula
 * (for example "Al" or "SO4"), `val` is the size of the charge and `poly` marks a polyatomic ion.
 * Returns { formula, c, a } where c and a are the final subscripts.
 */
export function crisscross(cation, anion) {
  let c = anion.val;
  let a = cation.val;
  const g = gcd(c, a);
  c /= g;
  a /= g;
  const part = (ion, n) => (n === 1 ? ion.sym : ion.poly ? `(${ion.sym})${n}` : `${ion.sym}${n}`);
  return { formula: part(cation, c) + part(anion, a), c, a, g };
}

// Ions used in this chapter (valency = size of the charge).
export const ION = {
  Na: { sym: 'Na', val: 1, name: 'sodium', ch: '+' },
  K: { sym: 'K', val: 1, name: 'potassium', ch: '+' },
  NH4: { sym: 'NH4', val: 1, name: 'ammonium', ch: '+', poly: true },
  Mg: { sym: 'Mg', val: 2, name: 'magnesium', ch: '+' },
  Ca: { sym: 'Ca', val: 2, name: 'calcium', ch: '+' },
  Al: { sym: 'Al', val: 3, name: 'aluminium', ch: '+' },
  Cl: { sym: 'Cl', val: 1, name: 'chloride', ch: '-' },
  OH: { sym: 'OH', val: 1, name: 'hydroxide', ch: '-', poly: true },
  NO3: { sym: 'NO3', val: 1, name: 'nitrate', ch: '-', poly: true },
  HCO3: { sym: 'HCO3', val: 1, name: 'hydrogencarbonate', ch: '-', poly: true },
  O: { sym: 'O', val: 2, name: 'oxide', ch: '-' },
  CO3: { sym: 'CO3', val: 2, name: 'carbonate', ch: '-', poly: true },
  SO4: { sym: 'SO4', val: 2, name: 'sulphate', ch: '-', poly: true },
};
