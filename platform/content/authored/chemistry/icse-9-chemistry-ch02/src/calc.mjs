// Computed values for ICSE 9 Chemistry ch02 Chemical Equations and Relative Masses.
// Atomic masses are the ICSE values given in the stems: H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 63.5, Zn 65.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
export const AM = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5, Zn: 65 };

/** Atom counts of a formula such as Al2(SO4)3 or ZnSO4.7H2O (a dot starts a water-of-crystallisation part with its multiplier). */
export function atoms(formula) {
  const out = {};
  for (const piece of formula.split('.')) {
    const m = /^(\d+)?(.*)$/.exec(piece);
    const mult = m[1] ? Number(m[1]) : 1;
    const stack = [{}];
    for (const [, t, d] of m[2].matchAll(/([A-Z][a-z]?|\(|\))(\d*)/g)) {
      const n = d ? Number(d) : 1;
      if (t === '(') stack.push({});
      else if (t === ')') {
        const top = stack.pop();
        for (const [k, v] of Object.entries(top)) stack[stack.length - 1][k] = (stack[stack.length - 1][k] ?? 0) + v * n;
      } else stack[stack.length - 1][t] = (stack[stack.length - 1][t] ?? 0) + n;
    }
    for (const [k, v] of Object.entries(stack[0])) out[k] = (out[k] ?? 0) + v * mult;
  }
  return out;
}
/** Relative molecular (formula) mass. */
export const rmm = (formula) => Object.entries(atoms(formula)).reduce((s, [k, v]) => s + AM[k] * v, 0);
/** Percentage by mass of an element (symbol) in a formula, unrounded. */
export const pctEl = (formula, el) => ((atoms(formula)[el] ?? 0) * AM[el] * 100) / rmm(formula);
/** Percentage of water of crystallisation in a hydrate such as FeSO4.7H2O. */
export function pctWater(formula) {
  const [, w] = formula.split('.');
  return (rmm(w) * 100) / rmm(formula);
}
export const pct = (x, dp = 1) => round(x, dp);

// ---------------------------------------------------------------- relative molecular masses
export const M = {};
for (const f of ['H2O', 'CO2', 'NH3', 'H2SO4', 'HCl', 'Al2(SO4)3', 'Ca(OH)2', 'MgSO4', 'Fe2O3', 'Al2O3', 'MgCl2', 'ZnSO4', 'FeSO4', 'Na2SO4', 'CaCO3', 'CaCl2', 'ZnCl2', 'ZnSO4.7H2O', 'FeSO4.7H2O', 'Na2SO4.10H2O', 'O2', 'H2', 'Mg', 'MgO', 'Zn', 'NaOH', 'HNO3', 'Cu(NO3)2', 'NO2', 'Mg(OH)2', 'KCl', 'K2SO4', 'CO', 'Fe', 'Al', 'CuSO4', 'Na2CO3', 'KOH', 'Zn(OH)2', 'NaCl', 'N2', 'CuO', 'Cu', 'H2S', 'SO2', 'Fe3O4', 'Mg3N2', 'AlCl3', 'ZnS', 'CuCl2', 'CH4', 'C2H6', 'C2H5OH', 'CaO']) M[f] = rmm(f);
eq(M.H2O, 18, 'H2O');
eq(M.CO2, 44, 'CO2');
eq(M.NH3, 17, 'NH3');
eq(M.H2SO4, 98, 'H2SO4');
eq(M.HCl, 36.5, 'HCl');
eq(M['Al2(SO4)3'], 342, 'Al2(SO4)3');
eq(M['Ca(OH)2'], 74, 'Ca(OH)2');
eq(M.MgSO4, 120, 'MgSO4');
eq(M.Fe2O3, 160, 'Fe2O3');
eq(M.Al2O3, 102, 'Al2O3');
eq(M.MgCl2, 95, 'MgCl2');
eq(M.ZnSO4, 161, 'ZnSO4');
eq(M.FeSO4, 152, 'FeSO4');
eq(M.Na2SO4, 142, 'Na2SO4');
eq(M['ZnSO4.7H2O'], 287, 'ZnSO4.7H2O');
eq(M['FeSO4.7H2O'], 278, 'FeSO4.7H2O');
eq(M['Na2SO4.10H2O'], 322, 'Na2SO4.10H2O');
eq(M.CaCO3, 100, 'CaCO3');
eq(M.CaCl2, 111, 'CaCl2');
eq(M['Cu(NO3)2'], 187.5, 'Cu(NO3)2');
eq(M.HNO3, 63, 'HNO3');
eq(M.NO2, 46, 'NO2');
eq(M.ZnCl2, 136, 'ZnCl2');
eq(M.CuSO4, 159.5, 'CuSO4');
eq(M.Na2CO3, 106, 'Na2CO3');
eq(M.Fe3O4, 232, 'Fe3O4');
eq(M.Mg3N2, 100, 'Mg3N2');
eq(M.AlCl3, 133.5, 'AlCl3');
eq(M.CH4, 16, 'CH4');
eq(M.C2H6, 30, 'C2H6');
eq(M.CuO, 79.5, 'CuO');
eq(M['Mg(OH)2'], 58, 'Mg(OH)2');
eq(M.K2SO4, 174, 'K2SO4');
eq(M.CaO, 56, 'CaO');
eq(M.SO2, 64, 'SO2');
eq(M.H2S, 34, 'H2S');

// ---------------------------------------------------------------- percentage composition
export const P = {
  MgSO4: { Mg: pct(pctEl('MgSO4', 'Mg')), S: pct(pctEl('MgSO4', 'S')), O: pct(pctEl('MgSO4', 'O')) },
  Fe2O3: { Fe: pct(pctEl('Fe2O3', 'Fe')), O: pct(pctEl('Fe2O3', 'O')) },
  Al2O3: { Al: pct(pctEl('Al2O3', 'Al')), O: pct(pctEl('Al2O3', 'O')) },
  MgCl2: { Mg: pct(pctEl('MgCl2', 'Mg')), Cl: pct(pctEl('MgCl2', 'Cl')) },
  Ca_OH_2: { Ca: pct(pctEl('Ca(OH)2', 'Ca')), O: pct(pctEl('Ca(OH)2', 'O')), H: pct(pctEl('Ca(OH)2', 'H')) },
  H2O: { H: pct(pctEl('H2O', 'H')), O: pct(pctEl('H2O', 'O')) },
  CO2: { C: pct(pctEl('CO2', 'C')), O: pct(pctEl('CO2', 'O')) },
  Al2SO43: { Al: pct(pctEl('Al2(SO4)3', 'Al')), S: pct(pctEl('Al2(SO4)3', 'S')), O: pct(pctEl('Al2(SO4)3', 'O')) },
  C2H6: { C: pct(pctEl('C2H6', 'C')), H: pct(pctEl('C2H6', 'H')) },
  K2SO4: { K: pct(pctEl('K2SO4', 'K')), S: pct(pctEl('K2SO4', 'S')), O: pct(pctEl('K2SO4', 'O')) },
  CaCl2: { Ca: pct(pctEl('CaCl2', 'Ca')), Cl: pct(pctEl('CaCl2', 'Cl')) },
  Mg3N2: { Mg: pct(pctEl('Mg3N2', 'Mg')), N: pct(pctEl('Mg3N2', 'N')) },
};
eq(P.MgSO4, { Mg: 20, S: 26.7, O: 53.3 }, 'MgSO4 composition');
eq(P.Fe2O3, { Fe: 70, O: 30 }, 'Fe2O3 composition');
eq(P.Al2O3, { Al: 52.9, O: 47.1 }, 'Al2O3 composition');
eq(P.MgCl2, { Mg: 25.3, Cl: 74.7 }, 'MgCl2 composition');
eq(P.Ca_OH_2, { Ca: 54.1, O: 43.2, H: 2.7 }, 'Ca(OH)2 composition');
eq(P.H2O, { H: 11.1, O: 88.9 }, 'H2O composition');
eq(P.CO2, { C: 27.3, O: 72.7 }, 'CO2 composition');
eq(P.Al2SO43, { Al: 15.8, S: 28.1, O: 56.1 }, 'Al2(SO4)3 composition');
eq(P.C2H6, { C: 80, H: 20 }, 'C2H6 composition');
eq(P.K2SO4, { K: 44.8, S: 18.4, O: 36.8 }, 'K2SO4 composition');
eq(P.CaCl2, { Ca: 36.0, Cl: 64.0 }, 'CaCl2 composition');
eq(P.Mg3N2, { Mg: 72, N: 28 }, 'Mg3N2 composition');

// Hydrates: percentage of water of crystallisation
export const W = {
  Fe: pct(pctWater('FeSO4.7H2O')),
  Zn: pct(pctWater('ZnSO4.7H2O')),
  Na: pct(pctWater('Na2SO4.10H2O')),
};
eq(W, { Fe: 45.3, Zn: 43.9, Na: 55.9 }, 'water percentages of hydrates');
eq([rmm('H2O') * 7, rmm('H2O') * 10], [126, 180], 'water masses in the hydrates');
eq(M['ZnSO4.7H2O'] - M.ZnSO4, 126, 'water part of zinc sulphate crystals');
eq(M['FeSO4.7H2O'] - M.FeSO4, 126, 'water part of iron(II) sulphate crystals');
eq(M['Na2SO4.10H2O'] - M.Na2SO4, 180, 'water part of sodium sulphate crystals');

// ---------------------------------------------------------------- masses from percentages and proportions
export const massOf = (sampleMass, partRmm, wholeRmm) => (sampleMass * partRmm) / wholeRmm;
// 5.74 g of zinc sulphate crystals
export const ZN_SAMPLE = 5.74;
export const ZN_WATER = round(massOf(ZN_SAMPLE, 126, M['ZnSO4.7H2O']), 2);
export const ZN_RESIDUE = round(ZN_SAMPLE - ZN_WATER, 2);
eq(ZN_WATER, 2.52, 'water driven from 5.74 g of ZnSO4.7H2O');
eq(ZN_RESIDUE, 3.22, 'anhydrous zinc sulphate left');
eq(round(massOf(ZN_SAMPLE, M.ZnSO4, M['ZnSO4.7H2O']), 2), 3.22, 'anhydrous mass by direct proportion');
// 161 g of Glauber's salt
export const NA_SAMPLE = 161;
export const NA_WATER = massOf(NA_SAMPLE, 180, M['Na2SO4.10H2O']);
eq(NA_WATER, 90, 'water in 161 g of Na2SO4.10H2O');
export const NA_ANHYD = NA_SAMPLE - NA_WATER;
eq(NA_ANHYD, 71, 'anhydrous sodium sulphate in 161 g of crystals');
// 204 g of aluminium oxide
export const AL_SAMPLE = 204;
export const AL_MASS = massOf(AL_SAMPLE, 54, M.Al2O3);
eq(AL_MASS, 108, 'aluminium in 204 g of Al2O3');
eq(AL_SAMPLE - AL_MASS, 96, 'oxygen in 204 g of Al2O3');
// 400 g of iron(III) oxide
export const FE_SAMPLE = 400;
export const FE_MASS = massOf(FE_SAMPLE, 112, M.Fe2O3);
eq(FE_MASS, 280, 'iron in 400 g of Fe2O3');
eq(FE_SAMPLE - FE_MASS, 120, 'oxygen in 400 g of Fe2O3');
// 60 g of magnesium sulphate
export const MG_SAMPLE = 300;
export const MG_MASS = massOf(MG_SAMPLE, 24, M.MgSO4);
eq(MG_MASS, 60, 'magnesium in 300 g of MgSO4');
// calcium hydroxide: calcium in 148 g
eq(massOf(148, 40, M['Ca(OH)2']), 80, 'calcium in 148 g of Ca(OH)2');
// water in 18 g of crystals? sodium sulphate 64.4 g
eq(round(massOf(64.4, 180, 322), 6), 36, 'water in 64.4 g of Na2SO4.10H2O');
eq(round(massOf(55.6, 126, 278), 6), 25.2, 'water in 55.6 g of FeSO4.7H2O');

// ---------------------------------------------------------------- atom-mass comparisons
export const X_OVER_O = 3.5;
export const X_RAM = eq(X_OVER_O * AM.O, 56, 'element 3.5 times as heavy as oxygen');
export const MOL_OVER_C12TWELFTH = 95;
eq(M.MgCl2 / 1, 95, 'MgCl2 compared with one-twelfth of carbon-12');
eq(M.CO2 / 12, 3.6666666666666665, 'CO2 compared with carbon-12 atom');
eq(round(M.CO2 / AM.C, 2), 3.67, 'CO2 compared with a carbon atom');
eq(M.Fe2O3 / M.H2O, 8.88888888888889, 'Fe2O3 compared with water');
eq(AM.Mg / AM.C, 2, 'magnesium atom compared with carbon atom');
eq(AM.S / AM.O, 2, 'sulphur atom compared with oxygen atom');
eq(AM.Cl / AM.H, 35.5, 'chlorine atom compared with hydrogen atom');
eq(M['Al2(SO4)3'] / M.H2SO4, 3.489795918367347, 'Al2(SO4)3 compared with H2SO4');
eq(round(M.CO2 / M.H2O, 2), 2.44, 'CO2 compared with water');
eq(M.O2 / M.H2, 16, 'oxygen molecule compared with hydrogen molecule');

// ---------------------------------------------------------------- equations: relative-mass bookkeeping
const side = (parts) => parts.reduce((s, [n, f]) => s + n * M[f], 0);
export const EQ = {
  zn: { r: [[1, 'Zn'], [1, 'H2SO4']], p: [[1, 'ZnSO4'], [1, 'H2']] },
  caco3: { r: [[1, 'CaCO3'], [2, 'HCl']], p: [[1, 'CaCl2'], [1, 'H2O'], [1, 'CO2']] },
  mg: { r: [[2, 'Mg'], [1, 'O2']], p: [[2, 'MgO']] },
  cu: { r: [[1, 'Cu'], [4, 'HNO3']], p: [[1, 'Cu(NO3)2'], [2, 'NO2'], [2, 'H2O']] },
  al: { r: [[4, 'Al'], [3, 'O2']], p: [[2, 'Al2O3']] },
  fe: { r: [[1, 'Fe2O3'], [3, 'CO']], p: [[2, 'Fe'], [3, 'CO2']] },
  h2s: { r: [[2, 'H2S'], [3, 'O2']], p: [[2, 'SO2'], [2, 'H2O']] },
  mgn: { r: [[3, 'Mg'], [1, 'N2']], p: [[1, 'Mg3N2']] },
};
export const SUMS = Object.fromEntries(Object.entries(EQ).map(([k, e]) => [k, [side(e.r), side(e.p)]]));
for (const [k, [a, b]] of Object.entries(SUMS)) eq(a, b, `mass conserved in equation ${k}`);
eq(SUMS.zn, [163, 163], 'Zn + H2SO4 masses');
eq(SUMS.caco3, [173, 173], 'CaCO3 + 2HCl masses');
eq(SUMS.mg, [80, 80], '2Mg + O2 masses');
eq(SUMS.cu, [315.5, 315.5], 'Cu + 4HNO3 masses');
eq(SUMS.al, [204, 204], '4Al + 3O2 masses');
eq(SUMS.fe, [244, 244], 'Fe2O3 + 3CO masses');
eq(SUMS.h2s, [164, 164], '2H2S + 3O2 masses');
eq(SUMS.mgn, [100, 100], '3Mg + N2 masses');
eq(side(EQ.fe.r.slice(1)), 84, 'three CO');
eq(side([[3, 'Mg']]), 72, 'three Mg');
eq(side([[2, 'Mg']]), 48, 'two Mg');
eq(side([[1, 'O2']]), 32, 'one O2');
eq(side([[3, 'O2']]), 96, 'three O2');
eq(side([[4, 'Al']]), 108, 'four Al');
eq(side([[2, 'HCl']]), 73, 'two HCl');
eq(side([[4, 'HNO3']]), 252, 'four HNO3');
eq(side([[2, 'NO2']]), 92, 'two NO2');
eq(side([[2, 'H2O']]), 36, 'two H2O');
eq(side([[2, 'Fe']]), 112, 'two Fe');
eq(side([[3, 'CO2']]), 132, 'three CO2');

// Atom-count bookkeeping used in a table: ammonium dichromate (NH4)2Cr2O7 -> N2 + Cr2O3 + 4H2O
export const DICHROMATE = { left: { N: 2, H: 8, Cr: 2, O: 7 }, right: { N: 2, H: 4 * 2, Cr: 2, O: 3 + 4 } };
eq(DICHROMATE.left, DICHROMATE.right, 'dichromate atoms balance (as sets of counts)');
// Rust-type bookkeeping for balancing steps
eq(atoms('Ca3(PO4)2'), { Ca: 3, P: 2, O: 8 }, 'atoms in calcium phosphate');
eq(atoms('Al2(SO4)3'), { Al: 2, S: 3, O: 12 }, 'atoms in aluminium sulphate');

// ---------------------------------------------------------------- a balancing solver (smallest whole-number coefficients)
export function balance(left, right) {
  const all = [...left, ...right];
  const A = all.map(atoms);
  const els = [...new Set(A.flatMap((a) => Object.keys(a)))];
  const n = all.length;
  const cur = Array(n).fill(1);
  let best = null;
  const rec = (i) => {
    if (i === n) {
      for (const e of els) {
        let l = 0;
        let r = 0;
        for (let k = 0; k < n; k++) (k < left.length ? (l += cur[k] * (A[k][e] ?? 0)) : (r += cur[k] * (A[k][e] ?? 0)));
        if (l !== r) return;
      }
      const s = cur.reduce((a, b) => a + b, 0);
      if (!best || s < best.s) best = { s, c: [...cur] };
      return;
    }
    for (let v = 1; v <= 8; v++) {
      cur[i] = v;
      rec(i + 1);
    }
  };
  rec(0);
  return best.c;
}
eq(balance(['Al', 'O2'], ['Al2O3']), [4, 3, 2], 'Al + O2');
eq(balance(['Mg', 'N2'], ['Mg3N2']), [3, 1, 1], 'Mg + N2');
eq(balance(['H2S', 'O2'], ['SO2', 'H2O']), [2, 3, 2, 2], 'H2S + O2');
eq(balance(['Fe2O3', 'CO'], ['Fe', 'CO2']), [1, 3, 2, 3], 'Fe2O3 + CO');
eq(balance(['C2H4', 'O2'], ['CO2', 'H2O']), [1, 3, 2, 2], 'C2H4 + O2');
eq(balance(['Na', 'H2O'], ['NaOH', 'H2']), [2, 2, 2, 1], 'Na + H2O');
eq(balance(['Al', 'HCl'], ['AlCl3', 'H2']), [2, 6, 2, 3], 'Al + HCl');
eq(balance(['Fe', 'O2'], ['Fe2O3']), [4, 3, 2], 'Fe + O2');
eq(balance(['NH3', 'O2'], ['N2', 'H2O']), [4, 3, 2, 6], 'NH3 + O2');
eq(balance(['Na', 'O2'], ['Na2O']), [4, 1, 2], 'Na + O2');
eq(balance(['Al(OH)3', 'H2SO4'], ['Al2(SO4)3', 'H2O']), [2, 3, 1, 6], 'Al(OH)3 + H2SO4');
eq(balance(['C2H5OH', 'O2'], ['CO2', 'H2O']), [1, 3, 2, 3], 'C2H5OH + O2');
eq(balance(['KOH', 'H3PO4'], ['K3PO4', 'H2O']), [3, 1, 1, 3], 'KOH + H3PO4');
eq(balance(['Ca(OH)2', 'H3PO4'], ['Ca3(PO4)2', 'H2O']), [3, 2, 1, 6], 'Ca(OH)2 + H3PO4');
eq(balance(['Na2CO3', 'HCl'], ['NaCl', 'H2O', 'CO2']), [1, 2, 2, 1, 1], 'Na2CO3 + HCl');
eq(balance(['Zn', 'HCl'], ['ZnCl2', 'H2']), [1, 2, 1, 1], 'Zn + HCl');
eq(balance(['(NH4)2CO3'], ['NH3', 'H2O', 'CO2']), [1, 2, 1, 1], 'ammonium carbonate');
eq(balance(['Mg', 'HNO3'], ['Mg(NO3)2', 'H2']), [1, 2, 1, 1], 'Mg + HNO3');
eq(balance(['Mg', 'O2'], ['MgO']), [2, 1, 2], 'Mg + O2');
eq(balance(['(NH4)2Cr2O7'], ['N2', 'Cr2O3', 'H2O']), [1, 1, 1, 4], 'dichromate (H2O coefficient found by solver is 4)');
eq(balance(['Cu', 'HNO3'], ['Cu(NO3)2', 'NO2', 'H2O']), [1, 4, 1, 2, 2], 'Cu + HNO3');
eq(balance(['CaCO3', 'HCl'], ['CaCl2', 'H2O', 'CO2']), [1, 2, 1, 1, 1], 'CaCO3 + HCl');
export const sumCoef = (l, r) => balance(l, r).reduce((a, b) => a + b, 0);
eq(sumCoef(['C2H4', 'O2'], ['CO2', 'H2O']), 8, 'sum of coefficients for ethene burning');
eq(sumCoef(['C2H5OH', 'O2'], ['CO2', 'H2O']), 9, 'sum of coefficients for ethanol burning');
// extra masses and compositions
for (const f of ['CaCl2.6H2O', 'Mg(OH)2', 'CuSO4']) M[f] = rmm(f);
eq(M['CaCl2.6H2O'], 219, 'CaCl2.6H2O');
export const P2 = { MgOH2: { Mg: pct(pctEl('Mg(OH)2', 'Mg')), O: pct(pctEl('Mg(OH)2', 'O')), H: pct(pctEl('Mg(OH)2', 'H')) }, CH4: pct(pctEl('CH4', 'H')), NH3: pct(pctEl('NH3', 'H')), C2H6H: pct(pctEl('C2H6', 'H')) };
eq(P2.MgOH2, { Mg: 41.4, O: 55.2, H: 3.4 }, 'Mg(OH)2 composition');
eq([P2.CH4, P2.NH3, P2.C2H6H], [25, 17.6, 20], 'hydrogen percentages');
eq(pct(pctEl('Fe2O3', 'O')), 30, 'oxygen in Fe2O3');
eq(pct(pctEl('CaCl2', 'Ca')), 36, 'calcium in CaCl2');
eq(pct(pctEl('Al2O3', 'O')), 47.1, 'oxygen in Al2O3');
eq(pct(pctEl('MgO', 'O')), 40, 'oxygen in MgO');
eq(pct(pctEl('Fe2O3', 'O')) < pct(pctEl('H2O', 'O')), true, 'water has more oxygen than iron(III) oxide');
// a hydrate that loses mass on heating: 25.0 g -> 16.0 g
export const HYD_BEFORE = 25;
export const HYD_AFTER = 16;
export const HYD_WATER = eq(HYD_BEFORE - HYD_AFTER, 9, 'mass of water lost');
export const HYD_PCT = eq(pct((HYD_WATER * 100) / HYD_BEFORE), 36, 'percentage of water lost');
export const CL_PCT_MGCL2 = P.MgCl2.Cl;
export const BIGGER = eq(M.H2SO4 > M.H2O, true, 'sulphuric acid is heavier than water');
// calcium chloride crystals CaCl2.6H2O
export const CA_SAMPLE = 54.75;
export const CA_PCT_WATER = eq(pct(pctWater('CaCl2.6H2O')), 49.3, 'water percentage in CaCl2.6H2O');
export const CA_WATER = eq(round(massOf(CA_SAMPLE, 108, M['CaCl2.6H2O']), 6), 27, 'water in 54.75 g of CaCl2.6H2O');
