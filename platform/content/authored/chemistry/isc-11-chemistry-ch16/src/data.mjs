// Shared computed data for ISC 11 Chemistry ch16 Redox Reactions (decks, notes, questions, SVGs).
// Atomic masses: H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35.5, K 39, Cr 52, Mn 55, Fe 56, Cu 63.5.
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-12, Math.abs(b) * rel);

// ---- equation checker: atoms AND charge, for the mhchem-style strings used in \ce{} (charge as ^2+, ^3-, or a trailing + or -)
const ELEM = /([A-Z][a-z]?)(\d*)/y;
function parseFormula(f) {
  const stack = [{}];
  let i = 0;
  while (i < f.length) {
    const c = f[i];
    if (c === '(') { stack.push({}); i++; continue; }
    if (c === ')') {
      i++;
      let num = '';
      while (/\d/.test(f[i] ?? '')) num += f[i++];
      const g = stack.pop();
      const top = stack[stack.length - 1];
      for (const [k, v] of Object.entries(g)) top[k] = (top[k] ?? 0) + v * (num ? Number(num) : 1);
      continue;
    }
    ELEM.lastIndex = i;
    const m = ELEM.exec(f);
    if (!m) throw new Error(`cannot parse ${f}`);
    const top = stack[stack.length - 1];
    top[m[1]] = (top[m[1]] ?? 0) + (m[2] ? Number(m[2]) : 1);
    i += m[0].length;
  }
  return stack[0];
}
/** Parses one species such as "5Fe^2+", "MnO4-", "8H+", "e-", "Cr2O7^2-", "H2O". Returns { n, atoms, charge }. */
export function species(sp) {
  let t = sp.trim();
  const mc = /^(\d*)(.*)$/.exec(t);
  const n = mc[1] ? Number(mc[1]) : 1;
  t = mc[2];
  let charge = 0;
  let m = /\^(\d*)([+-])$/.exec(t);
  if (m) {
    charge = (m[1] ? Number(m[1]) : 1) * (m[2] === '+' ? 1 : -1);
    t = t.slice(0, m.index);
  } else if ((m = /([+-])$/.exec(t))) {
    charge = m[1] === '+' ? 1 : -1;
    t = t.slice(0, m.index);
  }
  const atoms = t === 'e' ? {} : parseFormula(t);
  return { n, atoms, charge };
}
function side(s) {
  const atoms = {};
  let charge = 0;
  for (const sp of s.split(' + ')) {
    const x = species(sp);
    for (const [k, v] of Object.entries(x.atoms)) atoms[k] = (atoms[k] ?? 0) + v * x.n;
    charge += x.charge * x.n;
  }
  return { atoms, charge };
}
/** Checks atoms and charge of "L -> R"; returns true or a message. */
export function checkEq(eq) {
  const [l, rr] = eq.split(' -> ');
  const L = side(l);
  const R = side(rr);
  for (const k of new Set([...Object.keys(L.atoms), ...Object.keys(R.atoms)])) if ((L.atoms[k] ?? 0) !== (R.atoms[k] ?? 0)) return `atoms of ${k} differ in ${eq}`;
  if (L.charge !== R.charge) return `charge ${L.charge} vs ${R.charge} in ${eq}`;
  return true;
}
/** Throws unless the equation balances in atoms and charge. */
export function bal(eq) {
  const r = checkEq(eq);
  if (r !== true) throw new Error(r);
  return eq;
}

// ---- oxidation numbers: x for the unknown atom from the known ones, total charge and atom count
/** others: [[count, oxidation number], ...]; returns the oxidation number of the element occurring `count` times. */
export const solveON = (charge, others, count = 1) => (charge - others.reduce((s, [n, on]) => s + n * on, 0)) / count;
const sgn = (x) => (x > 0 ? `+${x}` : x < 0 ? `−${Math.abs(x)}` : '0');
export const sg = (x) => (Number.isInteger(x) ? sgn(x) : sgn(Number(x.toFixed(2))));

export const ON = {
  K2Cr2O7: { Cr: solveON(0, [[2, +1], [7, -2]], 2) },
  S2O3: { S: solveON(-2, [[3, -2]], 2) },
  MnO4: { Mn: solveON(-1, [[4, -2]]) },
  MnO4_2: { Mn: solveON(-2, [[4, -2]]) },
  Na2S4O6: { S: solveON(0, [[2, +1], [6, -2]], 4) },
  Fe3O4: { Fe: solveON(0, [[4, -2]], 3) },
  H2O2: { O: solveON(0, [[2, +1]], 2) },
  OF2: { O: solveON(0, [[2, -1]]) },
  CaH2: { H: solveON(0, [[1, +2]], 2) },
  HNO3: { N: solveON(0, [[1, +1], [3, -2]]) },
  NH4: { N: solveON(+1, [[4, +1]]) },
  H3PO4: { P: solveON(0, [[3, +1], [4, -2]]) },
  CrO4: { Cr: solveON(-2, [[4, -2]]) },
  Cr2O7: { Cr: solveON(-2, [[7, -2]], 2) },
  ClO3: { Cl: solveON(-1, [[3, -2]]) },
  ClO4: { Cl: solveON(-1, [[4, -2]]) },
  ClO2: { Cl: solveON(-1, [[2, -2]]) },
  ClO: { Cl: solveON(-1, [[1, -2]]) },
  H2SO4: { S: solveON(0, [[2, +1], [4, -2]]) },
  SO3_2: { S: solveON(-2, [[3, -2]]) },
  SO4_2: { S: solveON(-2, [[4, -2]]) },
  Mn2O7: { Mn: solveON(0, [[7, -2]], 2) },
  NaNO2: { N: solveON(0, [[1, +1], [2, -2]]) },
  KIO3: { I: solveON(0, [[1, +1], [3, -2]]) },
  CH3OH: { C: solveON(0, [[4, +1], [1, -2]]) },
  HCHO: { C: solveON(0, [[2, +1], [1, -2]]) },
};

// ---- balanced equations (atoms and charge asserted at load)
export const EQ = {
  MnFe: bal('MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 4H2O + 5Fe^3+'),
  CrFe: bal('Cr2O7^2- + 14H+ + 6Fe^2+ -> 2Cr^3+ + 7H2O + 6Fe^3+'),
  CuNO3: bal('3Cu + 2NO3- + 8H+ -> 3Cu^2+ + 2NO + 4H2O'),
  S2O3Cl2: bal('S2O3^2- + 4Cl2 + 5H2O -> 2SO4^2- + 8Cl- + 10H+'),
  MnI: bal('2MnO4- + 6I- + 4H2O -> 2MnO2 + 3I2 + 8OH-'),
  CrO2H2O2: bal('2CrO2- + 3H2O2 + 2OH- -> 2CrO4^2- + 4H2O'),
  Cl2cold: bal('Cl2 + 2OH- -> Cl- + ClO- + H2O'),
  Cl2hot: bal('3Cl2 + 6OH- -> 5Cl- + ClO3- + 3H2O'),
  MgO: bal('2Mg + O2 -> 2MgO'),
  KClO3: bal('2KClO3 -> 2KCl + 3O2'),
  ClKI: bal('Cl2 + 2KI -> 2KCl + I2'),
  NaCl2: bal('2Na + Cl2 -> 2NaCl'),
  ZnH: bal('Zn + 2H+ -> Zn^2+ + H2'),
  HgO: bal('2HgO -> 2Hg + O2'),
  N2O2: bal('N2 + O2 -> 2NO'),
  FeCuSO4: bal('Fe + Cu^2+ -> Fe^2+ + Cu'),
  Fe2O3CO: bal('Fe2O3 + 3CO -> 2Fe + 3CO2'),
  // half-reactions
  hMn: bal('MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O'),
  hFe: bal('Fe^2+ -> Fe^3+ + e-'),
  hCr: bal('Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O'),
  hCrO2: bal('CrO2- + 4OH- -> CrO4^2- + 2H2O + 3e-'),
  hH2O2: bal('H2O2 + 2e- -> 2OH-'),
  hMnB: bal('MnO4- + 2H2O + 3e- -> MnO2 + 4OH-'),
  hI: bal('2I- -> I2 + 2e-'),
  hCu: bal('Cu -> Cu^2+ + 2e-'),
  hNO3: bal('NO3- + 4H+ + 3e- -> NO + 2H2O'),
  hClO: bal('ClO- + H2O + 2e- -> Cl- + 2OH-'),
  ClOI: bal('ClO- + 2I- + H2O -> Cl- + I2 + 2OH-'),
  FeH2O2: bal('2Fe^2+ + H2O2 + 2H+ -> 2Fe^3+ + 2H2O'),
  H2O2Cl2: bal('H2O2 + Cl2 -> 2HCl + O2'),
  CuDisp: bal('2Cu^+ -> Cu^2+ + Cu'),
  MnO2HCl: bal('MnO2 + 4HCl -> MnCl2 + Cl2 + 2H2O'),
  ClNaBr: bal('Cl2 + 2NaBr -> 2NaCl + Br2'),
  Thermite: bal('2Al + Fe2O3 -> Al2O3 + 2Fe'),
  CaH2: bal('CaH2 + 2H2O -> Ca(OH)2 + 2H2'),
  H2SCl2: bal('H2S + Cl2 -> 2HCl + S'),
  MgCO2: bal('2Mg + CO2 -> 2MgO + C'),
  PbI: bal('Pb(NO3)2 + 2KI -> PbI2 + 2KNO3'),
  FeI: bal('2Fe^3+ + 2I- -> 2Fe^2+ + I2'),
  CuAg: bal('Cu + 2Ag^+ -> Cu^2+ + 2Ag'),
  CH4: bal('CH4 + 2O2 -> CO2 + 2H2O'),
  N2H2: bal('N2 + 3H2 -> 2NH3'),
  hS2: bal('S^2- -> S + 2e-'),
  BaSO4: bal('BaCl2 + Na2SO4 -> BaSO4 + 2NaCl'),
  // written items
  KBr: bal('2K + Br2 -> 2KBr'),
  CuOH2: bal('CuO + H2 -> Cu + H2O'),
  FeSn: bal('2Fe^3+ + Sn^2+ -> 2Fe^2+ + Sn^4+'),
  Neut: bal('HNO3 + KOH -> KNO3 + H2O'),
  hMnB2: bal('MnO4- + 2H2O + 3e- -> MnO2 + 4OH-'),
  PCl: bal('PCl3 + Cl2 -> PCl5'),
  NaNO3: bal('2NaNO3 -> 2NaNO2 + O2'),
  Cu2: bal('Cu + 2Ag^+ -> Cu^2+ + 2Ag'),
  MgCO2b: bal('2Mg + CO2 -> 2MgO + C'),
  ZnNH4: bal('4Zn + NO3- + 10H+ -> 4Zn^2+ + NH4+ + 3H2O'),
  CrI: bal('Cr2O7^2- + 14H+ + 6I- -> 2Cr^3+ + 7H2O + 3I2'),
  hOxal: bal('C2O4^2- + 4OH- -> 2CO3^2- + 2H2O + 2e-'),
  OxalMn: bal('3C2O4^2- + 2MnO4- + 4OH- -> 6CO3^2- + 2MnO2 + 2H2O'),
  CrOH3: bal('2Cr(OH)3 + ClO3- + 4OH- -> 2CrO4^2- + Cl- + 5H2O'),
  OxalAcid: bal('5C2O4^2- + 2MnO4- + 16H+ -> 10CO2 + 2Mn^2+ + 8H2O'),
  hOxA: bal('C2O4^2- -> 2CO2 + 2e-'),
  MnH2O2: bal('2MnO4- + 5H2O2 + 6H+ -> 2Mn^2+ + 5O2 + 8H2O'),
  H2O2disp: bal('2H2O2 -> 2H2O + O2'),
  HNO2: bal('3HNO2 -> HNO3 + 2NO + H2O'),
  CaOH2: bal('CaO + H2O -> Ca(OH)2'),
  Thio: bal('2Na2S2O3 + I2 -> Na2S4O6 + 2NaI'),
  hAl: bal('Al + 4OH- -> AlO2- + 2H2O + 3e-'),
  hNO3b: bal('NO3- + 6H2O + 8e- -> NH3 + 9OH-'),
  AlNO3: bal('8Al + 5OH- + 3NO3- + 2H2O -> 8AlO2- + 3NH3'),
  CaCO3: bal('CaCO3 -> CaO + CO2'),
  CuS2: bal('Cu + 2H2SO4 -> CuSO4 + SO2 + 2H2O'),
  FeO: bal('2Fe + O2 -> 2FeO'),
};
