// Computed values for ICSE 9 Chemistry ch10 Hydrogen: Position, Sources and Preparation.
// Every equation used in the chapter is atom-balanced here (and charge-balanced where salts are written as ions);
// every count used in a stem, model answer or table is computed here and asserted with eq().
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

/** Atom counts of a formula such as Zn(OH)2 or Na2ZnO2. */
export function atoms(formula) {
  const stack = [{}];
  for (const [, t, d] of formula.matchAll(/([A-Z][a-z]?|\(|\))(\d*)/g)) {
    const n = d ? Number(d) : 1;
    if (t === '(') stack.push({});
    else if (t === ')') {
      const top = stack.pop();
      for (const [k, v] of Object.entries(top)) stack[stack.length - 1][k] = (stack[stack.length - 1][k] ?? 0) + v * n;
    } else stack[stack.length - 1][t] = (stack[stack.length - 1][t] ?? 0) + n;
  }
  return stack[0];
}
const side = (parts) => {
  const out = {};
  for (const [n, f] of parts) for (const [k, v] of Object.entries(atoms(f))) out[k] = (out[k] ?? 0) + n * v;
  return Object.fromEntries(Object.entries(out).sort());
};
/** Throws unless the equation (arrays of [coefficient, formula]) balances. */
export function balanced(name, left, right) {
  eq(side(left), side(right), `equation ${name}`);
  return true;
}
const total = (parts) => Object.values(side(parts)).reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- equations used in the chapter
export const EQS = {
  // cold water
  naH2o: [[[2, 'Na'], [2, 'H2O']], [[2, 'NaOH'], [1, 'H2']]],
  kH2o: [[[2, 'K'], [2, 'H2O']], [[2, 'KOH'], [1, 'H2']]],
  caH2o: [[[1, 'Ca'], [2, 'H2O']], [[1, 'Ca(OH)2'], [1, 'H2']]],
  // hot water and steam
  mgHot: [[[1, 'Mg'], [2, 'H2O']], [[1, 'Mg(OH)2'], [1, 'H2']]],
  mgSteam: [[[1, 'Mg'], [1, 'H2O']], [[1, 'MgO'], [1, 'H2']]],
  alSteam: [[[2, 'Al'], [3, 'H2O']], [[1, 'Al2O3'], [3, 'H2']]],
  znSteam: [[[1, 'Zn'], [1, 'H2O']], [[1, 'ZnO'], [1, 'H2']]],
  feSteam: [[[3, 'Fe'], [4, 'H2O']], [[1, 'Fe3O4'], [4, 'H2']]],
  cSteam: [[[1, 'C'], [1, 'H2O']], [[1, 'CO'], [1, 'H2']]],
  // dilute acids
  mgHcl: [[[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]],
  mgH2so4: [[[1, 'Mg'], [1, 'H2SO4']], [[1, 'MgSO4'], [1, 'H2']]],
  alHcl: [[[2, 'Al'], [6, 'HCl']], [[2, 'AlCl3'], [3, 'H2']]],
  alH2so4: [[[2, 'Al'], [3, 'H2SO4']], [[1, 'Al2(SO4)3'], [3, 'H2']]],
  znHcl: [[[1, 'Zn'], [2, 'HCl']], [[1, 'ZnCl2'], [1, 'H2']]],
  znH2so4: [[[1, 'Zn'], [1, 'H2SO4']], [[1, 'ZnSO4'], [1, 'H2']]],
  feHcl: [[[1, 'Fe'], [2, 'HCl']], [[1, 'FeCl2'], [1, 'H2']]],
  feH2so4: [[[1, 'Fe'], [1, 'H2SO4']], [[1, 'FeSO4'], [1, 'H2']]],
  // alkalis (salts written as sodium or potassium aluminate, zincate and plumbite)
  znNaoh: [[[1, 'Zn'], [2, 'NaOH']], [[1, 'Na2ZnO2'], [1, 'H2']]],
  znKoh: [[[1, 'Zn'], [2, 'KOH']], [[1, 'K2ZnO2'], [1, 'H2']]],
  alNaoh: [[[2, 'Al'], [2, 'NaOH'], [2, 'H2O']], [[2, 'NaAlO2'], [3, 'H2']]],
  alKoh: [[[2, 'Al'], [2, 'KOH'], [2, 'H2O']], [[2, 'KAlO2'], [3, 'H2']]],
  pbNaoh: [[[1, 'Pb'], [2, 'NaOH']], [[1, 'Na2PbO2'], [1, 'H2']]],
  pbKoh: [[[1, 'Pb'], [2, 'KOH']], [[1, 'K2PbO2'], [1, 'H2']]],
  // Bosch process
  shift: [[[1, 'CO'], [1, 'H2O']], [[1, 'CO2'], [1, 'H2']]],
  co2Koh: [[[1, 'CO2'], [2, 'KOH']], [[1, 'K2CO3'], [1, 'H2O']]],
  // chemistry of the position of hydrogen
  h2o: [[[2, 'H2'], [1, 'O2']], [[2, 'H2O']]],
  na2o: [[[4, 'Na'], [1, 'O2']], [[2, 'Na2O']]],
  nah: [[[2, 'Na'], [1, 'H2']], [[2, 'NaH']]],
  cah2: [[[1, 'Ca'], [1, 'H2']], [[1, 'CaH2']]],
  hcl: [[[1, 'H2'], [1, 'Cl2']], [[2, 'HCl']]],
  nacl: [[[2, 'Na'], [1, 'Cl2']], [[2, 'NaCl']]],
  // not used for hydrogen: copper and dilute acid, etc. are NOT written; nitric acid is described in words
};
for (const [k, [l, r]] of Object.entries(EQS)) balanced(k, l, r);
eq(Object.keys(EQS).length, 31, 'number of equations checked');

// Salts written in the alkali equations are neutral: sodium/potassium +1 each, zincate/plumbite -2, aluminate -1.
const CH = { Na: 1, K: 1, ZnO2: -2, PbO2: -2, AlO2: -1 };
eq(2 * CH.Na + CH.ZnO2, 0, 'sodium zincate is neutral');
eq(2 * CH.K + CH.ZnO2, 0, 'potassium zincate is neutral');
eq(2 * CH.Na + CH.PbO2, 0, 'sodium plumbite is neutral');
eq(CH.Na + CH.AlO2, 0, 'sodium aluminate is neutral');

// ---------------------------------------------------------------- the metals, in order of reactivity, with the lowest-temperature reagent that gives hydrogen
export const SERIES = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Au'];
export const rank = (m) => SERIES.indexOf(m);
export const NAME = { K: 'potassium', Na: 'sodium', Ca: 'calcium', Mg: 'magnesium', Al: 'aluminium', Zn: 'zinc', Fe: 'iron', Pb: 'lead', Cu: 'copper', Hg: 'mercury', Ag: 'silver', Au: 'gold' };
/** Weakest condition at which the metal gives hydrogen with water (the activity series decides it). */
export const WATER = { K: 'cold water', Na: 'cold water', Ca: 'cold water', Mg: 'hot water', Al: 'steam', Zn: 'steam', Fe: 'red-hot iron with steam' };
eq(Object.keys(WATER), SERIES.slice(0, 7), 'water reactions follow the series down to iron');
eq(SERIES.slice(0, 7).every((m, i, a) => i === 0 || rank(a[i - 1]) < rank(m)), true, 'series order');
/** A metal gives hydrogen with a dilute acid (HCl or H2SO4) only if it lies above hydrogen. */
export const givesH2WithAcid = (m) => rank(m) < rank('H');
eq(['Mg', 'Al', 'Zn', 'Fe', 'Pb', 'Cu', 'Ag'].map(givesH2WithAcid), [true, true, true, true, true, false, false], 'above or below hydrogen');
eq(rank('Zn') > rank('Mg') && rank('Zn') < rank('Fe'), true, 'zinc is between magnesium and iron');

// ---------------------------------------------------------------- counting from equations
// (1) steam over red-hot iron: 3Fe + 4H2O -> Fe3O4 + 4H2
export const STEAM20 = 20;
export const FE_FOR_20 = eq((STEAM20 * 3) / 4, 15, 'iron atoms that react with 20 steam molecules');
eq(STEAM20, STEAM20 / 4 * 4, 'hydrogen molecules equal steam molecules in the iron reaction');
export const H2_FROM_FE_12 = eq((12 * 4) / 3, 16, 'hydrogen molecules from 12 iron atoms');
export const FE3O4_FROM_20 = eq(STEAM20 / 4, 5, 'Fe3O4 units from 20 steam molecules');
// (2) aluminium with dilute hydrochloric acid: 2Al + 6HCl -> 2AlCl3 + 3H2
export const HCL_18 = 18;
export const H2_FROM_18HCL = eq((HCL_18 * 3) / 6, 9, 'hydrogen molecules from 18 HCl');
// (3) aluminium with sodium hydroxide: 2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2
export const H2_FROM_12AL = eq((12 * 3) / 2, 18, 'hydrogen molecules from 12 Al atoms');
// (4) zinc with sodium hydroxide: 1 H2 per zinc atom
export const NAOH_FOR_9ZN = eq(9 * 2, 18, 'NaOH units for 9 Zn atoms');
// (5) Bosch process: 30 carbon atoms with steam, then the shift reaction
export const C_ATOMS = 30;
export const H2_WATERGAS = eq(C_ATOMS * 1, 30, 'hydrogen molecules in water gas from 30 C');
export const CO_WATERGAS = eq(C_ATOMS * 1, 30, 'carbon monoxide molecules in water gas from 30 C');
export const H2_AFTER_SHIFT = eq(H2_WATERGAS + CO_WATERGAS * 1, 60, 'hydrogen molecules after the shift if all CO reacts');
export const CO2_AFTER_SHIFT = eq(CO_WATERGAS * 1, 30, 'carbon dioxide molecules after the shift');
eq(total([[1, 'CO'], [1, 'H2O']]), total([[1, 'CO2'], [1, 'H2']]), 'atom totals in the shift reaction');
// (5b) if only 80 percent of the carbon monoxide changes over: 24 of 30
export const CO_CHANGED = eq(30 * 0.8, 24, 'carbon monoxide molecules changed if 80 percent react');
export const H2_PARTIAL = eq(30 + 24, 54, 'hydrogen molecules after a partial shift');
export const CO_LEFT = eq(30 - 24, 6, 'carbon monoxide molecules left');
// (6) steam over heated zinc: one H2 per Zn; 25 zinc atoms
export const H2_FROM_25ZN = eq(25 * 1, 25, 'hydrogen from 25 Zn atoms in steam');

// ---------------------------------------------------------------- electrons in the first shells (position of hydrogen)
export const CONFIG = { H: [1], He: [2], Li: [2, 1], Na: [2, 8, 1], K: [2, 8, 8, 1], F: [2, 7], Cl: [2, 8, 7] };
const valence = (e) => CONFIG[e][CONFIG[e].length - 1];
eq([valence('H'), valence('Li'), valence('Na'), valence('K')], [1, 1, 1, 1], 'valence electrons of group 1 and hydrogen');
eq([valence('F'), valence('Cl')], [7, 7], 'valence electrons of the halogens');
eq(CONFIG.H[0] + 1, CONFIG.He[0], 'hydrogen needs one electron to reach the helium duplet');
eq(8 - valence('Cl'), 1, 'chlorine needs one electron to complete its octet');
eq(CONFIG.Na.reduce((a, b) => a + b, 0), 11, 'electrons in a sodium atom');
eq(CONFIG.Cl.reduce((a, b) => a + b, 0), 17, 'electrons in a chlorine atom');

// (7) extra counts used in the question bank
export const C45 = 45;
export const H2_FROM_C45 = eq(C45 * 2, 90, 'hydrogen molecules from 45 carbon atoms after both stages');
export const CO2_FROM_C45 = eq(C45, 45, 'carbon dioxide molecules from 45 carbon atoms after both stages');
