// Computed values for ICSE 9 Chemistry ch03 Chemical Changes and Reactions.
// Every equation used in the chapter is atom-balanced here; the activity series decides each displacement; temperature
// and volume data used in stems are computed here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

/** Atom counts of a formula such as Cu(NO3)2 or Ca(OH)2. */
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
// ---------------------------------------------------------------- equations used in the chapter
export const EQS = {
  feS: [[[1, 'Fe'], [1, 'S']], [[1, 'FeS']]],
  mgO: [[[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]],
  co2: [[[1, 'C'], [1, 'O2']], [[1, 'CO2']]],
  hcl: [[[1, 'H2'], [1, 'Cl2']], [[2, 'HCl']]],
  no: [[[1, 'N2'], [1, 'O2']], [[2, 'NO']]],
  caoH2o: [[[1, 'CaO'], [1, 'H2O']], [[1, 'Ca(OH)2']]],
  naCl: [[[2, 'Na'], [1, 'Cl2']], [[2, 'NaCl']]],
  h2o: [[[2, 'H2'], [1, 'O2']], [[2, 'H2O']]],
  alO: [[[4, 'Al'], [3, 'O2']], [[2, 'Al2O3']]],
  znS: [[[1, 'Zn'], [1, 'S']], [[1, 'ZnS']]],
  nh4cl: [[[1, 'NH3'], [1, 'HCl']], [[1, 'NH4Cl']]],
  caco3: [[[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']]],
  kclo3: [[[2, 'KClO3']], [[2, 'KCl'], [3, 'O2']]],
  cuco3: [[[1, 'CuCO3']], [[1, 'CuO'], [1, 'CO2']]],
  znco3: [[[1, 'ZnCO3']], [[1, 'ZnO'], [1, 'CO2']]],
  pbno3: [[[2, 'Pb(NO3)2']], [[2, 'PbO'], [4, 'NO2'], [1, 'O2']]],
  znno3: [[[2, 'Zn(NO3)2']], [[2, 'ZnO'], [4, 'NO2'], [1, 'O2']]],
  cuno3: [[[2, 'Cu(NO3)2']], [[2, 'CuO'], [4, 'NO2'], [1, 'O2']]],
  hgo: [[[2, 'HgO']], [[2, 'Hg'], [1, 'O2']]],
  nh4clHeat: [[[1, 'NH4Cl']], [[1, 'NH3'], [1, 'HCl']]],
  agcl: [[[2, 'AgCl']], [[2, 'Ag'], [1, 'Cl2']]],
  agbr: [[[2, 'AgBr']], [[2, 'Ag'], [1, 'Br2']]],
  h2oElec: [[[2, 'H2O']], [[2, 'H2'], [1, 'O2']]],
  pbbr2: [[[1, 'PbBr2']], [[1, 'Pb'], [1, 'Br2']]],
  nacl: [[[2, 'NaCl']], [[2, 'Na'], [1, 'Cl2']]],
  znCu: [[[1, 'Zn'], [1, 'CuSO4']], [[1, 'ZnSO4'], [1, 'Cu']]],
  feCu: [[[1, 'Fe'], [1, 'CuSO4']], [[1, 'FeSO4'], [1, 'Cu']]],
  cuAg: [[[1, 'Cu'], [2, 'AgNO3']], [[1, 'Cu(NO3)2'], [2, 'Ag']]],
  mgFe: [[[1, 'Mg'], [1, 'FeSO4']], [[1, 'MgSO4'], [1, 'Fe']]],
  znAg: [[[1, 'Zn'], [2, 'AgNO3']], [[1, 'Zn(NO3)2'], [2, 'Ag']]],
  znPb: [[[1, 'Zn'], [1, 'Pb(NO3)2']], [[1, 'Zn(NO3)2'], [1, 'Pb']]],
  alCu: [[[2, 'Al'], [3, 'CuSO4']], [[1, 'Al2(SO4)3'], [3, 'Cu']]],
  baso4: [[[1, 'Na2SO4'], [1, 'BaCl2']], [[1, 'BaSO4'], [2, 'NaCl']]],
  agcl2: [[[1, 'AgNO3'], [1, 'NaCl']], [[1, 'AgCl'], [1, 'NaNO3']]],
  pbi2: [[[1, 'Pb(NO3)2'], [2, 'KI']], [[1, 'PbI2'], [2, 'KNO3']]],
  neut: [[[1, 'HCl'], [1, 'NaOH']], [[1, 'NaCl'], [1, 'H2O']]],
  mgsKcl: [[[1, 'Mg'], [2, 'AgNO3']], [[1, 'Mg(NO3)2'], [2, 'Ag']]],
  caco3Hcl: [[[1, 'CaCO3'], [2, 'HCl']], [[1, 'CaCl2'], [1, 'H2O'], [1, 'CO2']]],
};
for (const [k, [l, r]] of Object.entries(EQS)) balanced(k, l, r);
eq(Object.keys(EQS).length, 38, 'number of equations checked');
// photosynthesis and respiration (glucose C6H12O6)
balanced('photosynthesis', [[6, 'CO2'], [6, 'H2O']], [[1, 'C6H12O6'], [6, 'O2']]);
balanced('respiration', [[1, 'C6H12O6'], [6, 'O2']], [[6, 'CO2'], [6, 'H2O']]);

// ---------------------------------------------------------------- activity series (most to least reactive)
export const SERIES = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Au'];
export const NAME = { K: 'potassium', Na: 'sodium', Ca: 'calcium', Mg: 'magnesium', Al: 'aluminium', Zn: 'zinc', Fe: 'iron', Pb: 'lead', Cu: 'copper', Hg: 'mercury', Ag: 'silver', Au: 'gold' };
export const rank = (m) => SERIES.indexOf(m);
/** True if metal `m` is more reactive than the metal `s` in the salt solution, so m displaces s. */
export const displaces = (m, s) => rank(m) < rank(s);
eq([displaces('Zn', 'Cu'), displaces('Fe', 'Cu'), displaces('Cu', 'Ag'), displaces('Mg', 'Fe'), displaces('Cu', 'Zn'), displaces('Ag', 'Cu'), displaces('Zn', 'Pb'), displaces('Al', 'Cu'), displaces('Fe', 'Zn'), displaces('Pb', 'Cu')], [true, true, true, true, false, false, true, true, false, true], 'displacement predictions');
eq(SERIES.slice(0, 4), ['K', 'Na', 'Ca', 'Mg'], 'top of the series');
eq(rank('Zn') < rank('Fe') && rank('Fe') < rank('Cu'), true, 'Zn > Fe > Cu');

// ---------------------------------------------------------------- electrolysis of acidified water: volumes
export const H2_VOL = 20;
export const O2_VOL = eq(H2_VOL / 2, 10, 'oxygen is half the volume of hydrogen');
eq(H2_VOL / O2_VOL, 2, 'hydrogen to oxygen volume ratio');
export const H2_VOL_30 = 30;
eq(H2_VOL_30 / 2, 15, 'oxygen for 30 cm3 of hydrogen');
eq(2 * 12, 24, 'hydrogen for 12 cm3 of oxygen');

// ---------------------------------------------------------------- temperature data (imagined; 50 cm3 of liquid in a polythene cup)
export const TEMPS = [
  { id: 'P', what: 'Quicklime is stirred into water', start: 28, end: 55 },
  { id: 'Q', what: 'Dilute hydrochloric acid is mixed with sodium hydroxide solution', start: 27, end: 33 },
  { id: 'R', what: 'Baking soda is stirred into citric acid solution', start: 28, end: 22 },
].map((t) => ({ ...t, dT: t.end - t.start, kind: t.end > t.start ? 'exothermic' : 'endothermic' }));
eq(TEMPS.map((t) => t.dT), [27, 6, -6], 'temperature changes');
eq(TEMPS.map((t) => t.kind), ['exothermic', 'exothermic', 'endothermic'], 'classification from temperature change');

// ---------------------------------------------------------------- iron nail in copper sulphate (timings imagined)
export const NAIL = [
  { min: 0, colour: 'blue' },
  { min: 10, colour: 'pale blue' },
  { min: 30, colour: 'pale green' },
];
// number of atoms/units in the displacement equations used for counting questions
eq(side([[1, 'Zn'], [1, 'CuSO4']]), { Cu: 1, O: 4, S: 1, Zn: 1 }, 'atoms on the left of zinc and copper sulphate');
eq(Object.values(side([[2, 'Pb(NO3)2']])).reduce((a, b) => a + b, 0), 18, 'atoms in two units of lead nitrate');
eq(Object.values(side([[2, 'Zn(NO3)2']])).reduce((a, b) => a + b, 0), 18, 'atoms in two units of zinc nitrate');
eq(side([[2, 'Zn(NO3)2']]), { N: 4, O: 12, Zn: 2 }, 'atoms in 2Zn(NO3)2');
eq(side([[2, 'ZnO'], [4, 'NO2'], [1, 'O2']]), { N: 4, O: 12, Zn: 2 }, 'atoms in the products of 2Zn(NO3)2');
