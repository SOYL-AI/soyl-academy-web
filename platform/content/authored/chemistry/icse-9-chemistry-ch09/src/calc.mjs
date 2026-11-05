// Computed values for ICSE 9 Chemistry ch09 The Periodic Table.
// Dobereiner triads (mean masses), Newlands' octaves (counting along the ordered list), Mendeleev's anomalies, group and period
// from electronic configuration, period lengths, and trend data for groups 1, 17 and 18. Every number used is computed here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const r2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- Dobereiner triads: [symbol, name, atomic mass]
export const TRIADS = {
  LiNaK: [['Li', 'lithium', 7], ['Na', 'sodium', 23], ['K', 'potassium', 39]],
  CaSrBa: [['Ca', 'calcium', 40], ['Sr', 'strontium', 88], ['Ba', 'barium', 137]],
  ClBrI: [['Cl', 'chlorine', 35.5], ['Br', 'bromine', 80], ['I', 'iodine', 127]],
  SSeTe: [['S', 'sulphur', 32], ['Se', 'selenium', 79], ['Te', 'tellurium', 128]],
  BeMgCa: [['Be', 'beryllium', 9], ['Mg', 'magnesium', 24], ['Ca', 'calcium', 40]],
  CNO: [['C', 'carbon', 12], ['N', 'nitrogen', 14], ['O', 'oxygen', 16]],
};
export const mean = (t) => (TRIADS[t][0][2] + TRIADS[t][2][2]) / 2;
export const gap = (t) => r2(Math.abs(mean(t) - TRIADS[t][1][2]));
eq([mean('LiNaK'), mean('CaSrBa'), mean('ClBrI'), mean('SSeTe'), mean('BeMgCa'), mean('CNO')], [23, 88.5, 81.25, 80, 24.5, 14], 'mean masses of the triads');
eq([gap('LiNaK'), gap('CaSrBa'), gap('ClBrI'), gap('SSeTe'), gap('BeMgCa')], [0, 0.5, 1.25, 1, 0.5], 'differences from the middle element');
// the numbers alone do not make a triad: C, N and O fit the mean but their properties differ
eq(gap('CNO'), 0, 'C, N, O fit the arithmetic');

// ---------------------------------------------------------------- Newlands: elements in order of increasing atomic mass (noble gases unknown)
export const NEW = ['H', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca'];
/** The eighth element counting the given element as the first. */
export const eighth = (sym) => NEW[NEW.indexOf(sym) + 7];
eq([eighth('Li'), eighth('Be'), eighth('Na'), eighth('F'), eighth('Mg'), eighth('B'), eighth('N')], ['Na', 'Mg', 'K', 'Cl', 'Ca', 'Al', 'P'], 'eighth elements');
eq(NEW.length, 17, 'elements in the arrangement up to calcium');
// columns of the 7-column grid starting with lithium: Li..F, Na..Cl, K Ca
export const GRID = [NEW.slice(1, 8), NEW.slice(8, 15), NEW.slice(15, 17)];
eq(GRID.map((r) => r.length), [7, 7, 2], 'rows of the Newlands grid');
eq([GRID[0][0], GRID[1][0], GRID[2][0]], ['Li', 'Na', 'K'], 'first column');
eq([GRID[0][6], GRID[1][6]], ['F', 'Cl'], 'last column');

// ---------------------------------------------------------------- Mendeleev and Moseley: pairs that are out of order of atomic mass
export const ANOM = [
  { first: 'Te', second: 'I', m1: 127.6, m2: 126.9, z1: 52, z2: 53 },
  { first: 'Ar', second: 'K', m1: 39.9, m2: 39.1, z1: 18, z2: 19 },
  { first: 'Co', second: 'Ni', m1: 58.9, m2: 58.7, z1: 27, z2: 28 },
];
for (const a of ANOM) {
  eq(a.m1 > a.m2, true, `${a.first} is heavier than ${a.second}`);
  eq(a.z1 < a.z2, true, `${a.first} has the smaller atomic number`);
}
export const TE_I = r2(ANOM[0].m1 - ANOM[0].m2);
eq(TE_I, 0.7, 'difference in mass of Te and I');
eq(r2(ANOM[1].m1 - ANOM[1].m2), 0.8, 'difference in mass of Ar and K');

// ---------------------------------------------------------------- modern table: period lengths, group and period of the first 20 elements
export const PERIODS = [2, 8, 8, 18, 18, 32, 32];
eq(PERIODS.reduce((a, b) => a + b, 0), 118, 'elements in the seven periods');
eq(PERIODS.slice(0, 3).reduce((a, b) => a + b, 0), 18, 'elements in the first three periods');
eq(PERIODS.slice(0, 5).reduce((a, b) => a + b, 0), 54, 'elements in the first five periods');
eq(PERIODS.slice(0, 4).reduce((a, b) => a + b, 0), 36, 'elements in the first four periods');
export const SYM = { H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10, Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18, K: 19, Ca: 20 };
export const NAME = { H: 'hydrogen', He: 'helium', Li: 'lithium', Be: 'beryllium', B: 'boron', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Ne: 'neon', Na: 'sodium', Mg: 'magnesium', Al: 'aluminium', Si: 'silicon', P: 'phosphorus', S: 'sulphur', Cl: 'chlorine', Ar: 'argon', K: 'potassium', Ca: 'calcium' };
export const cfgOf = (z) => {
  const out = [];
  let left = z;
  for (const m of [2, 8, 8, 2]) {
    if (left <= 0) break;
    const t = Math.min(m, left);
    out.push(t);
    left -= t;
  }
  return out;
};
export const cfg = (z) => cfgOf(z).join(', ');
/** Period = number of shells; group = outer electrons for 1 and 2, 10 + outer electrons for 3 to 8 (18 for helium). */
export function place(z) {
  const c = cfgOf(z);
  const v = c.at(-1);
  const period = c.length;
  let group;
  if (z === 2) group = 18;
  else if (v <= 2) group = v;
  else group = 10 + v;
  return { period, group, valence: v };
}
const P = (s) => place(SYM[s]);
eq([P('H'), P('He')], [{ period: 1, group: 1, valence: 1 }, { period: 1, group: 18, valence: 2 }], 'H and He');
eq(['Li', 'Na', 'K'].map((s) => [P(s).period, P(s).group]), [[2, 1], [3, 1], [4, 1]], 'group 1');
eq(['Be', 'Mg', 'Ca'].map((s) => [P(s).period, P(s).group]), [[2, 2], [3, 2], [4, 2]], 'group 2');
eq(['F', 'Cl'].map((s) => [P(s).period, P(s).group]), [[2, 17], [3, 17]], 'group 17');
eq(['He', 'Ne', 'Ar'].map((s) => [P(s).period, P(s).group]), [[1, 18], [2, 18], [3, 18]], 'group 18');
eq([P('B'), P('Al'), P('Si'), P('P'), P('S')].map((p) => [p.period, p.group]), [[2, 13], [3, 13], [3, 14], [3, 15], [3, 16]], 'p-block samples');
eq(Object.keys(SYM).filter((s) => P(s).period === 3), ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'], 'third period');
eq(Object.keys(SYM).filter((s) => P(s).group === 1 && s !== 'H'), ['Li', 'Na', 'K'], 'alkali metals among the first 20');
eq(Object.keys(SYM).filter((s) => P(s).group === 17), ['F', 'Cl'], 'halogens among the first 20');
eq(Object.keys(SYM).filter((s) => P(s).group === 18), ['He', 'Ne', 'Ar'], 'noble gases among the first 20');
// transition elements: groups 3 to 12 (ten groups) from period 4
eq(12 - 3 + 1, 10, 'ten transition groups');
// inner transition elements: 14 in the lanthanide row and 14 in the actinide row
eq(14 + 14, 28, 'inner transition elements');
// the 18 columns: 2 + 10 + 6
eq([2, 10, 6].reduce((a, b) => a + b, 0), 18, 'groups');

// ---------------------------------------------------------------- trend data (approximate values in degrees Celsius)
export const MP = [['Lithium', 181], ['Sodium', 98], ['Potassium', 63], ['Rubidium', 39], ['Caesium', 28]];
eq(MP.every((v, i) => i === 0 || v[1] < MP[i - 1][1]), true, 'melting points of alkali metals fall down the group');
eq(MP[1][1] - MP[2][1], 35, 'sodium minus potassium melting point');
eq(MP[0][1] - MP[2][1], 118, 'lithium minus potassium melting point');
export const BP = [['Fluorine', -188], ['Chlorine', -34], ['Bromine', 59], ['Iodine', 184]];
eq(BP.every((v, i) => i === 0 || v[1] > BP[i - 1][1]), true, 'boiling points of halogens rise down the group');
eq(BP[2][1] - BP[1][1], 93, 'bromine minus chlorine boiling point');
eq(BP[3][1] - BP[0][1], 372, 'iodine minus fluorine boiling point');
// room temperature 25 C: gas if the boiling point is below 25; liquid if melting point below and boiling above 25; else solid
export const MP_HAL = { Chlorine: -101, Bromine: -7, Iodine: 114, Fluorine: -220 };
export const stateAt25 = (n) => (BP.find((b) => b[0] === n)[1] < 25 ? 'gas' : MP_HAL[n] < 25 ? 'liquid' : 'solid');
eq(['Fluorine', 'Chlorine', 'Bromine', 'Iodine'].map(stateAt25), ['gas', 'gas', 'liquid', 'solid'], 'states of the halogens at room temperature');
export const NOBLE = [['Helium', -269], ['Neon', -246], ['Argon', -186], ['Krypton', -153], ['Xenon', -108]];
eq(NOBLE.every((v, i) => i === 0 || v[1] > NOBLE[i - 1][1]), true, 'boiling points of noble gases rise down the group');
eq(NOBLE[2][1] - NOBLE[1][1], 60, 'argon minus neon boiling point');
