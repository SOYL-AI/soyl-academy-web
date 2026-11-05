// Computed values for ICSE 9 Chemistry ch01 Symbols, Valency, Radicals and Formulae.
// Valencies come from electron arrangements and every formula is built by the criss-cross rule here, then asserted.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// ---------------------------------------------------------------- valency from the electron arrangement
export const CONFIG = {
  H: [1], He: [2], Li: [2, 1], Be: [2, 2], B: [2, 3], C: [2, 4], N: [2, 5], O: [2, 6], F: [2, 7], Ne: [2, 8],
  Na: [2, 8, 1], Mg: [2, 8, 2], Al: [2, 8, 3], Si: [2, 8, 4], P: [2, 8, 5], S: [2, 8, 6], Cl: [2, 8, 7], Ar: [2, 8, 8],
  K: [2, 8, 8, 1], Ca: [2, 8, 8, 2],
};
/** Valency: electrons in the outer shell if there are 4 or fewer, otherwise 8 minus that number; a full outer shell gives 0. */
export function valency(sym) {
  const cfg = CONFIG[sym];
  const e = cfg[cfg.length - 1];
  const full = cfg.length === 1 ? e === 2 : e === 8;
  if (full) return 0;
  return e <= 4 ? e : 8 - e;
}
export const VAL = Object.fromEntries(Object.keys(CONFIG).map((s) => [s, valency(s)]));
eq([VAL.Na, VAL.Mg, VAL.Al, VAL.Si, VAL.P, VAL.S, VAL.Cl, VAL.Ar], [1, 2, 3, 4, 3, 2, 1, 0], 'valencies of period 3');
eq([VAL.Li, VAL.Be, VAL.B, VAL.C, VAL.N, VAL.O, VAL.F, VAL.Ne], [1, 2, 3, 4, 3, 2, 1, 0], 'valencies of period 2');
eq([VAL.H, VAL.He, VAL.K, VAL.Ca], [1, 0, 1, 2], 'valencies of H, He, K, Ca');
export const outer = (sym) => CONFIG[sym][CONFIG[sym].length - 1];
export const arrangement = (sym) => CONFIG[sym].join(', ');
eq(arrangement('P'), '2, 8, 5', 'phosphorus arrangement');
eq(arrangement('S'), '2, 8, 6', 'sulphur arrangement');
eq(CONFIG.Al.reduce((a, b) => a + b, 0), 13, 'electrons in aluminium');
eq(CONFIG.Cl.reduce((a, b) => a + b, 0), 17, 'electrons in chlorine');
eq(CONFIG.K.reduce((a, b) => a + b, 0), 19, 'electrons in potassium');
eq(CONFIG.Ca.reduce((a, b) => a + b, 0), 20, 'electrons in calcium');
eq(CONFIG.N.reduce((a, b) => a + b, 0), 7, 'electrons in nitrogen');

// Hydrides: the number of hydrogen atoms that combine with one atom is its valency (for C, N, O, Cl).
export const HYDRIDES = [
  { el: 'Cl', f: 'HCl', h: 1, name: 'hydrogen chloride' },
  { el: 'O', f: 'H2O', h: 2, name: 'water' },
  { el: 'N', f: 'NH3', h: 3, name: 'ammonia' },
  { el: 'C', f: 'CH4', h: 4, name: 'methane' },
];
for (const h of HYDRIDES) eq(h.h, VAL[h.el], `hydride of ${h.el}`);

// ---------------------------------------------------------------- radicals
// c = valency (charge size); poly = compound radical (a group of atoms)
export const POS = {
  Na: { n: 'sodium', s: 'Na', c: 1 }, K: { n: 'potassium', s: 'K', c: 1 }, Ag: { n: 'silver', s: 'Ag', c: 1 },
  NH4: { n: 'ammonium', s: 'NH4', c: 1, poly: true },
  Mg: { n: 'magnesium', s: 'Mg', c: 2 }, Ca: { n: 'calcium', s: 'Ca', c: 2 }, Zn: { n: 'zinc', s: 'Zn', c: 2 }, Ba: { n: 'barium', s: 'Ba', c: 2 },
  Cu: { n: 'copper(II)', s: 'Cu', c: 2 }, Fe2: { n: 'iron(II)', s: 'Fe', c: 2 }, Pb: { n: 'lead(II)', s: 'Pb', c: 2 },
  Al: { n: 'aluminium', s: 'Al', c: 3 }, Fe3: { n: 'iron(III)', s: 'Fe', c: 3 },
};
export const NEG = {
  Cl: { n: 'chloride', s: 'Cl', c: 1 }, Br: { n: 'bromide', s: 'Br', c: 1 }, I: { n: 'iodide', s: 'I', c: 1 },
  OH: { n: 'hydroxide', s: 'OH', c: 1, poly: true }, NO3: { n: 'nitrate', s: 'NO3', c: 1, poly: true }, HCO3: { n: 'hydrogencarbonate', s: 'HCO3', c: 1, poly: true },
  O: { n: 'oxide', s: 'O', c: 2 }, S: { n: 'sulphide', s: 'S', c: 2 },
  SO4: { n: 'sulphate', s: 'SO4', c: 2, poly: true }, SO3: { n: 'sulphite', s: 'SO3', c: 2, poly: true }, CO3: { n: 'carbonate', s: 'CO3', c: 2, poly: true },
  N: { n: 'nitride', s: 'N', c: 3 }, PO4: { n: 'phosphate', s: 'PO4', c: 3, poly: true },
};
const part = (r, n) => (n === 1 ? r.s : r.poly ? `(${r.s})${n}` : `${r.s}${n}`);
/** Criss-cross: the valency of each radical becomes the subscript of the other, after dividing by the common factor. */
export function formula(pk, nk) {
  const p = POS[pk];
  const n = NEG[nk];
  const g = gcd(p.c, n.c);
  const np = n.c / g;
  const nn = p.c / g;
  return { f: part(p, np) + part(n, nn), np, nn, raw: [n.c, p.c], name: `${p.n} ${n.n}` };
}
const F = (a, b) => formula(a, b);
// Asserted set of formulae used in the chapter.
eq(F('Al', 'O').f, 'Al2O3', 'aluminium oxide');
eq(F('Al', 'SO4').f, 'Al2(SO4)3', 'aluminium sulphate');
eq(F('Ca', 'PO4').f, 'Ca3(PO4)2', 'calcium phosphate');
eq(F('NH4', 'PO4').f, '(NH4)3PO4', 'ammonium phosphate');
eq(F('NH4', 'SO4').f, '(NH4)2SO4', 'ammonium sulphate');
eq(F('Mg', 'N').f, 'Mg3N2', 'magnesium nitride');
eq(F('Mg', 'OH').f, 'Mg(OH)2', 'magnesium hydroxide');
eq(F('Ca', 'CO3').f, 'CaCO3', 'calcium carbonate (reduced)');
eq(F('Ca', 'HCO3').f, 'Ca(HCO3)2', 'calcium hydrogencarbonate');
eq(F('Fe3', 'SO4').f, 'Fe2(SO4)3', 'iron(III) sulphate');
eq(F('Fe3', 'OH').f, 'Fe(OH)3', 'iron(III) hydroxide');
eq(F('Fe2', 'Cl').f, 'FeCl2', 'iron(II) chloride');
eq(F('Fe3', 'Cl').f, 'FeCl3', 'iron(III) chloride');
eq(F('Zn', 'NO3').f, 'Zn(NO3)2', 'zinc nitrate');
eq(F('Zn', 'S').f, 'ZnS', 'zinc sulphide (reduced)');
eq(F('Ba', 'SO4').f, 'BaSO4', 'barium sulphate (reduced)');
eq(F('K', 'SO4').f, 'K2SO4', 'potassium sulphate');
eq(F('Na', 'CO3').f, 'Na2CO3', 'sodium carbonate');
eq(F('Na', 'PO4').f, 'Na3PO4', 'sodium phosphate');
eq(F('Al', 'PO4').f, 'AlPO4', 'aluminium phosphate (reduced)');
eq(F('Al', 'Cl').f, 'AlCl3', 'aluminium chloride');
eq(F('Al', 'OH').f, 'Al(OH)3', 'aluminium hydroxide');
eq(F('Ag', 'S').f, 'Ag2S', 'silver sulphide');
eq(F('Ag', 'NO3').f, 'AgNO3', 'silver nitrate');
eq(F('Pb', 'NO3').f, 'Pb(NO3)2', 'lead(II) nitrate');
eq(F('Pb', 'Cl').f, 'PbCl2', 'lead(II) chloride');
eq(F('Cu', 'OH').f, 'Cu(OH)2', 'copper(II) hydroxide');
eq(F('Cu', 'SO4').f, 'CuSO4', 'copper(II) sulphate');
eq(F('Ca', 'Cl').f, 'CaCl2', 'calcium chloride');
eq(F('Ca', 'O').f, 'CaO', 'calcium oxide');
eq(F('Mg', 'O').f, 'MgO', 'magnesium oxide');
eq(F('K', 'S').f, 'K2S', 'potassium sulphide');
eq(F('Na', 'S').f, 'Na2S', 'sodium sulphide');
eq(F('NH4', 'Cl').f, 'NH4Cl', 'ammonium chloride');
eq(F('NH4', 'NO3').f, 'NH4NO3', 'ammonium nitrate');
eq(F('Zn', 'CO3').f, 'ZnCO3', 'zinc carbonate');
eq(F('K', 'N').f, 'K3N', 'potassium nitride');
eq(F('Ca', 'N').f, 'Ca3N2', 'calcium nitride');
eq(F('Al', 'N').f, 'AlN', 'aluminium nitride');
eq(F('Na', 'SO3').f, 'Na2SO3', 'sodium sulphite');
eq(F('Ba', 'Cl').f, 'BaCl2', 'barium chloride');
eq(F('Mg', 'NO3').f, 'Mg(NO3)2', 'magnesium nitrate');
eq(F('Ca', 'OH').f, 'Ca(OH)2', 'calcium hydroxide');
eq(F('Zn', 'SO4').f, 'ZnSO4', 'zinc sulphate');
eq(F('Al', 'NO3').f, 'Al(NO3)3', 'aluminium nitrate');
eq(F('Fe2', 'S').f, 'FeS', 'iron(II) sulphide');
eq(F('Fe3', 'O').f, 'Fe2O3', 'iron(III) oxide');
eq(F('Cu', 'Cl').f, 'CuCl2', 'copper(II) chloride');
eq(F('Cu', 'NO3').f, 'Cu(NO3)2', 'copper(II) nitrate');
eq(F('Mg', 'PO4').f, 'Mg3(PO4)2', 'magnesium phosphate');

/** Atoms of each kind in a formula such as Al2(SO4)3 (used to check counts quoted in answers). */
export function atoms(f) {
  const tok = [...f.matchAll(/([A-Z][a-z]?|\(|\))(\d*)/g)];
  const stack = [{}];
  for (const [, t, d] of tok) {
    const n = d ? Number(d) : 1;
    if (t === '(') stack.push({});
    else if (t === ')') {
      const top = stack.pop();
      for (const [k, v] of Object.entries(top)) stack[stack.length - 1][k] = (stack[stack.length - 1][k] ?? 0) + v * n;
    } else stack[stack.length - 1][t] = (stack[stack.length - 1][t] ?? 0) + n;
  }
  return stack[0];
}
eq(atoms('Al2(SO4)3'), { Al: 2, S: 3, O: 12 }, 'atoms in aluminium sulphate');
eq(atoms('Ca3(PO4)2'), { Ca: 3, P: 2, O: 8 }, 'atoms in calcium phosphate');
eq(atoms('(NH4)3PO4'), { N: 3, H: 12, P: 1, O: 4 }, 'atoms in ammonium phosphate');
eq(atoms('Fe2(SO4)3'), { Fe: 2, S: 3, O: 12 }, 'atoms in iron(III) sulphate');
eq(atoms('Ca(HCO3)2'), { Ca: 1, H: 2, C: 2, O: 6 }, 'atoms in calcium hydrogencarbonate');
export const total = (f) => Object.values(atoms(f)).reduce((a, b) => a + b, 0);
eq(total('Al2(SO4)3'), 17, 'total atoms in aluminium sulphate');
eq(total('Ca3(PO4)2'), 13, 'total atoms in calcium phosphate');
eq(total('(NH4)3PO4'), 20, 'total atoms in ammonium phosphate');
eq(total('Mg(OH)2'), 5, 'total atoms in magnesium hydroxide');

// Acid ionisation gives the valency of the acid radical: number of H+ lost.
export const ACIDS = [
  { acid: 'hydrochloric acid', f: 'HCl', h: 1, radical: 'chloride' },
  { acid: 'nitric acid', f: 'HNO3', h: 1, radical: 'nitrate' },
  { acid: 'sulphuric acid', f: 'H2SO4', h: 2, radical: 'sulphate' },
  { acid: 'carbonic acid', f: 'H2CO3', h: 2, radical: 'carbonate' },
  { acid: 'phosphoric acid', f: 'H3PO4', h: 3, radical: 'phosphate' },
];
eq(ACIDS.map((a) => a.h), [NEG.Cl.c, NEG.NO3.c, NEG.SO4.c, NEG.CO3.c, NEG.PO4.c], 'hydrogen lost by each acid equals the radical valency');

// Electron count of an ion: atomic number minus charge for a cation, plus charge for an anion.
export const Z = { Na: 11, Mg: 12, Al: 13, O: 8, N: 7, Cl: 17, S: 16, K: 19, Ca: 20 };
eq([Z.Mg - 2, Z.Al - 3, Z.O + 2, Z.Cl + 1, Z.Ca - 2, Z.N + 3], [10, 10, 10, 18, 18, 10], 'electrons in ions');

// ---------------------------------------------------------------- extra checks used by the question bank
eq(formula('Zn', 'PO4').f, 'Zn3(PO4)2', 'zinc phosphate');
eq(formula('Fe2', 'NO3').f, 'Fe(NO3)2', 'iron(II) nitrate');
eq(formula('NH4', 'CO3').f, '(NH4)2CO3', 'ammonium carbonate');
eq(formula('Mg', 'PO4').f, 'Mg3(PO4)2', 'magnesium phosphate');
eq(formula('Ca', 'HCO3').f, 'Ca(HCO3)2', 'calcium hydrogencarbonate');
export const TOT = Object.fromEntries(['Zn(NO3)2', 'Fe2(SO4)3', 'Zn3(PO4)2', 'NH4NO3', 'Mg3(PO4)2', 'Cu(OH)2', 'PbCl2', 'Ca(HCO3)2', '(NH4)2CO3'].map((f) => [f, total(f)]));
eq(TOT, { 'Zn(NO3)2': 9, 'Fe2(SO4)3': 17, 'Zn3(PO4)2': 13, NH4NO3: 9, 'Mg3(PO4)2': 13, 'Cu(OH)2': 5, PbCl2: 3, 'Ca(HCO3)2': 11, '(NH4)2CO3': 14 }, 'total atoms in formula units');
/** Criss-cross from valencies of two elements (a first), e.g. carbon and fluorine. */
export function binary(a, b) {
  const va = VAL[a];
  const vb = VAL[b];
  const g = gcd(va, vb);
  const na = vb / g;
  const nb = va / g;
  return `${a}${na > 1 ? na : ''}${b}${nb > 1 ? nb : ''}`;
}
eq(binary('C', 'F'), 'CF4', 'carbon and fluorine');
eq(binary('Al', 'O'), 'Al2O3', 'aluminium and oxygen from valencies');
eq(binary('Na', 'O'), 'Na2O', 'sodium and oxygen from valencies');
eq(binary('Al', 'N'), 'AlN', 'aluminium and nitrogen from valencies');
eq(binary('C', 'O'), 'CO2', 'carbon and oxygen from valencies');
eq(binary('Si', 'Cl'), 'SiCl4', 'silicon and chlorine from valencies');
eq(binary('Mg', 'Cl'), 'MgCl2', 'magnesium and chlorine from valencies');
eq(binary('Li', 'F'), 'LiF', 'lithium and fluorine');
// Unknown atoms A to D of the lettered diagram: A 2,8,3 ; B 2,6 ; C 2,8,1 ; D 2,4
export const UNK = { A: [2, 8, 3], B: [2, 6], C: [2, 8, 1], D: [2, 4] };
const uv = (c) => { const e = c[c.length - 1]; return e <= 4 ? e : 8 - e; };
export const UV = Object.fromEntries(Object.entries(UNK).map(([k, c]) => [k, uv(c)]));
eq(UV, { A: 3, B: 2, C: 1, D: 4 }, 'valencies of the unknown atoms');
eq(UNK.A.reduce((x, y) => x + y, 0), 13, 'electrons in atom A');
eq(UNK.B.reduce((x, y) => x + y, 0), 8, 'electrons in atom B');
