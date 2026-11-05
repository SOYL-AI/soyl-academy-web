// Computed values for ICSE 9 Chemistry ch11 Oxidation and Reduction.
// Every full equation is atom-balanced; every half-change is balanced for atoms AND charge (electrons carry -1); every
// electron count and every combination of half-changes used in a stem, answer or table is computed here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

/** Atom counts of a formula such as Cu(NO3)2 or MnCl2 (no charges). */
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
// A term is [coefficient, formula, charge]; the electron is ['e', 0 atoms, -1]. Formulas carry no charge text.
const side = (parts) => {
  const out = {};
  let q = 0;
  for (const [n, f, c = 0] of parts) {
    q += n * c;
    if (f === 'e') continue;
    for (const [k, v] of Object.entries(atoms(f))) out[k] = (out[k] ?? 0) + n * v;
  }
  return { atoms: Object.fromEntries(Object.entries(out).sort()), charge: q };
};
/** Throws unless atoms and charge balance. */
export function balanced(name, left, right) {
  eq(side(left), side(right), `equation ${name}`);
  return true;
}
const E = (n) => [n, 'e', -1];

// ---------------------------------------------------------------- full equations (molecular)
export const EQS = {
  mgO2: [[[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]],
  mgCo2: [[[2, 'Mg'], [1, 'CO2']], [[2, 'MgO'], [1, 'C']]],
  pboH2: [[[1, 'PbO'], [1, 'H2']], [[1, 'Pb'], [1, 'H2O']]],
  mnO2Hcl: [[[1, 'MnO2'], [4, 'HCl']], [[1, 'MnCl2'], [2, 'H2O'], [1, 'Cl2']]],
  cl2H2s: [[[1, 'Cl2'], [1, 'H2S']], [[2, 'HCl'], [1, 'S']]],
  h2sO2: [[[2, 'H2S'], [1, 'O2']], [[2, 'S'], [2, 'H2O']]],
  coO2: [[[2, 'CO'], [1, 'O2']], [[2, 'CO2']]],
  h2O2: [[[2, 'H2'], [1, 'O2']], [[2, 'H2O']]],
  znCuo: [[[1, 'Zn'], [1, 'CuO']], [[1, 'ZnO'], [1, 'Cu']]],
  naCl2: [[[2, 'Na'], [1, 'Cl2']], [[2, 'NaCl']]],
  naO2: [[[4, 'Na'], [1, 'O2']], [[2, 'Na2O']]],
  kiCl2: [[[2, 'KI'], [1, 'Cl2']], [[2, 'KCl'], [1, 'I2']]],
  kiBr2: [[[2, 'KI'], [1, 'Br2']], [[2, 'KBr'], [1, 'I2']]],
  fecl2: [[[2, 'FeCl2'], [1, 'Cl2']], [[2, 'FeCl3']]],
  mgCuso4: [[[1, 'Mg'], [1, 'CuSO4']], [[1, 'MgSO4'], [1, 'Cu']]],
  znH2so4: [[[1, 'Zn'], [1, 'H2SO4']], [[1, 'ZnSO4'], [1, 'H2']]],
  mgCuo: [[[1, 'Mg'], [1, 'CuO']], [[1, 'MgO'], [1, 'Cu']]],
  agcl: [[[1, 'AgNO3'], [1, 'NaCl']], [[1, 'AgCl'], [1, 'NaNO3']]],
  neut: [[[1, 'HCl'], [1, 'NaOH']], [[1, 'NaCl'], [1, 'H2O']]],
  caco3: [[[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']]],
  caoH2o: [[[1, 'CaO'], [1, 'H2O']], [[1, 'Ca(OH)2']]],
  ba: [[[1, 'BaCl2'], [1, 'Na2SO4']], [[1, 'BaSO4'], [2, 'NaCl']]],
  c: [[[1, 'C'], [1, 'O2']], [[1, 'CO2']]],
  cuoCo: [[[1, 'CuO'], [1, 'CO']], [[1, 'Cu'], [1, 'CO2']]],
};
for (const [k, [l, r]] of Object.entries(EQS)) balanced(k, l.map(([n, f]) => [n, f, 0]), r.map(([n, f]) => [n, f, 0]));
eq(Object.keys(EQS).length, 24, 'number of molecular equations checked');

// ---------------------------------------------------------------- half-changes (atoms and charge)
// [left terms, right terms]; ions as [coefficient, formula, charge]
export const HALF = {
  na: [[[1, 'Na', 0]], [[1, 'Na', 1], E(1)]],
  mg: [[[1, 'Mg', 0]], [[1, 'Mg', 2], E(2)]],
  al: [[[1, 'Al', 0]], [[1, 'Al', 3], E(3)]],
  zn: [[[1, 'Zn', 0]], [[1, 'Zn', 2], E(2)]],
  fe2: [[[1, 'Fe', 0]], [[1, 'Fe', 2], E(2)]],
  fe2fe3: [[[1, 'Fe', 2]], [[1, 'Fe', 3], E(1)]],
  cl: [[[2, 'Cl', -1]], [[1, 'Cl2', 0], E(2)]],
  i: [[[2, 'I', -1]], [[1, 'I2', 0], E(2)]],
  s: [[[1, 'S', -2]], [[1, 'S', 0], E(2)]],
  cl2: [[[1, 'Cl2', 0], E(2)], [[2, 'Cl', -1]]],
  br2: [[[1, 'Br2', 0], E(2)], [[2, 'Br', -1]]],
  i2: [[[1, 'I2', 0], E(2)], [[2, 'I', -1]]],
  cu: [[[1, 'Cu', 2], E(2)], [[1, 'Cu', 0]]],
  ag: [[[1, 'Ag', 1], E(1)], [[1, 'Ag', 0]]],
  pb: [[[1, 'Pb', 2], E(2)], [[1, 'Pb', 0]]],
  fe3fe2: [[[1, 'Fe', 3], E(1)], [[1, 'Fe', 2]]],
  feFe: [[[1, 'Fe', 2], E(2)], [[1, 'Fe', 0]]],
  o: [[[1, 'O', 0], E(2)], [[1, 'O', -2]]],
  o2: [[[1, 'O2', 0], E(4)], [[2, 'O', -2]]],
  h: [[[2, 'H', 1], E(2)], [[1, 'H2', 0]]],
};
for (const [k, [l, r]] of Object.entries(HALF)) balanced(`half ${k}`, l, r);
eq(Object.keys(HALF).length, 20, 'number of half-changes checked');

// ---------------------------------------------------------------- ionic equations from two half-changes
/** Combine an oxidation half (electrons on the right) and a reduction half (electrons on the left). */
export function combine(ox, red) {
  const eOx = ox[1].find((t) => t[1] === 'e')[0];
  const eRed = red[0].find((t) => t[1] === 'e')[0];
  const lcm = (a, b) => (a * b) / (() => { let x = a; let y = b; while (y) [x, y] = [y, x % y]; return x; })();
  const L = lcm(eOx, eRed);
  const fOx = L / eOx;
  const fRed = L / eRed;
  const noE = (ts) => ts.filter((t) => t[1] !== 'e');
  const left = [...noE(ox[0]).map(([n, f, c]) => [n * fOx, f, c]), ...noE(red[0]).map(([n, f, c]) => [n * fRed, f, c])];
  const right = [...noE(ox[1]).map(([n, f, c]) => [n * fOx, f, c]), ...noE(red[1]).map(([n, f, c]) => [n * fRed, f, c])];
  balanced('combined', left, right);
  return { fOx, fRed, electrons: L, left, right };
}
export const MG_FE = combine(HALF.mg, HALF.feFe);
eq([MG_FE.fOx, MG_FE.fRed, MG_FE.electrons], [1, 1, 2], 'Mg + Fe2+: factors and electrons');
export const AL_FE = combine(HALF.al, HALF.feFe);
eq([AL_FE.fOx, AL_FE.fRed, AL_FE.electrons], [2, 3, 6], 'Al + Fe2+: factors and electrons');
eq(AL_FE.left, [[2, 'Al', 0], [3, 'Fe', 2]], 'Al + Fe2+: left side');
eq(AL_FE.right, [[2, 'Al', 3], [3, 'Fe', 0]], 'Al + Fe2+: right side');
export const NA_CL = combine(HALF.na, HALF.cl2);
eq([NA_CL.fOx, NA_CL.fRed, NA_CL.electrons], [2, 1, 2], 'Na + Cl2: factors and electrons');
export const FE_CL = combine(HALF.fe2fe3, HALF.cl2);
eq([FE_CL.fOx, FE_CL.fRed, FE_CL.electrons], [2, 1, 2], 'Fe2+ + Cl2: factors and electrons');
export const MG_CU = combine(HALF.mg, HALF.cu);
eq([MG_CU.fOx, MG_CU.fRed, MG_CU.electrons], [1, 1, 2], 'Mg + Cu2+: factors and electrons');
export const ZN_AG = combine(HALF.zn, HALF.ag);
eq([ZN_AG.fOx, ZN_AG.fRed, ZN_AG.electrons], [1, 2, 2], 'Zn + 2Ag+: factors and electrons');
export const AL_CU = combine(HALF.al, HALF.cu);
eq([AL_CU.fOx, AL_CU.fRed, AL_CU.electrons], [2, 3, 6], 'Al + Cu2+: factors and electrons');
export const KI_CL = combine(HALF.i, HALF.cl2);
eq([KI_CL.fOx, KI_CL.fRed, KI_CL.electrons], [1, 1, 2], 'I- + Cl2: factors and electrons');

// ---------------------------------------------------------------- electron counts used in stems and answers
export const AL5 = eq(5 * 3, 15, 'electrons lost by 5 Al atoms forming Al3+');
export const NA4 = eq(4 * 1, 4, 'electrons transferred when 4 Na atoms react with chlorine');
export const MG12 = 12;
export const CU_REDUCED_BY_12MG = eq((MG12 * 2) / 2, 12, 'Cu2+ ions reduced by 12 Mg atoms');
export const O2_6 = eq(6 * 4, 24, 'electrons gained by 6 oxygen molecules forming O2-');
export const AL4 = eq(4 * 3, 12, 'electrons lost by 4 Al atoms');
export const FE_FROM_AL4 = eq((4 * 3) / 2, 6, 'Fe2+ ions reduced by 4 Al atoms');
export const CL2_FOR_10FE2 = eq(10 / 2, 5, 'chlorine molecules needed for 10 Fe2+ ions');
export const ELECTRONS_9ZN = eq(9 * 2, 18, 'electrons lost by 9 Zn atoms');
export const AG_FROM_9ZN = eq(9 * 2, 18, 'Ag+ ions reduced by 9 Zn atoms (2 per Zn)');

// ---------------------------------------------------------------- electron arrangements
export const CONFIG = { Na: [2, 8, 1], 'Na+': [2, 8], Cl: [2, 8, 7], 'Cl-': [2, 8, 8], Mg: [2, 8, 2], 'Mg2+': [2, 8], O: [2, 6], 'O2-': [2, 8], Al: [2, 8, 3], 'Al3+': [2, 8] };
const sum = (a) => a.reduce((x, y) => x + y, 0);
eq([sum(CONFIG.Na) - 1, sum(CONFIG['Na+'])], [10, 10], 'Na loses one electron');
eq([sum(CONFIG.Cl) + 1, sum(CONFIG['Cl-'])], [18, 18], 'Cl gains one electron');
eq([sum(CONFIG.Mg) - 2, sum(CONFIG['Mg2+'])], [10, 10], 'Mg loses two electrons');
eq([sum(CONFIG.O) + 2, sum(CONFIG['O2-'])], [10, 10], 'O gains two electrons');
eq([sum(CONFIG.Al) - 3, sum(CONFIG['Al3+'])], [10, 10], 'Al loses three electrons');
eq([sum(CONFIG.Na), sum(CONFIG.Cl), sum(CONFIG.Mg), sum(CONFIG.Al)], [11, 17, 12, 13], 'atomic numbers from the configurations');
