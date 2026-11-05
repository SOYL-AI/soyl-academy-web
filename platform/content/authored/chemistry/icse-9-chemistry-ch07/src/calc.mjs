// Computed values for ICSE 9 Chemistry ch07 Atomic Structure.
// Element data for the first 20 elements, electronic configurations (shell filling 2, 8, 8, 2), numbers of protons, neutrons
// and electrons for atoms and ions, isotope data for hydrogen, carbon and chlorine. Every number in a stem, answer, table or
// slide is computed or asserted here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

// ---------------------------------------------------------------- the first 20 elements: [Z, symbol, name, common mass number]
export const EL = [
  [1, 'H', 'hydrogen', 1], [2, 'He', 'helium', 4], [3, 'Li', 'lithium', 7], [4, 'Be', 'beryllium', 9], [5, 'B', 'boron', 11],
  [6, 'C', 'carbon', 12], [7, 'N', 'nitrogen', 14], [8, 'O', 'oxygen', 16], [9, 'F', 'fluorine', 19], [10, 'Ne', 'neon', 20],
  [11, 'Na', 'sodium', 23], [12, 'Mg', 'magnesium', 24], [13, 'Al', 'aluminium', 27], [14, 'Si', 'silicon', 28], [15, 'P', 'phosphorus', 31],
  [16, 'S', 'sulphur', 32], [17, 'Cl', 'chlorine', 35], [18, 'Ar', 'argon', 40], [19, 'K', 'potassium', 39], [20, 'Ca', 'calcium', 40],
].map(([z, sym, name, a]) => ({ z, sym, name, a }));
export const bySym = (s) => EL.find((e) => e.sym === s);
export const byZ = (z) => EL.find((e) => e.z === z);

/** Shell capacity by the 2n^2 rule. */
export const cap = (n) => 2 * n * n;
eq([cap(1), cap(2), cap(3), cap(4)], [2, 8, 18, 32], '2n^2 capacities');

/** Electron distribution of the first 20 elements: K holds 2, L holds 8, M holds 8 until calcium, N takes the rest. */
export function config(z) {
  const shells = [];
  let left = z;
  for (const max of [2, 8, 8, 2]) {
    if (left <= 0) break;
    const take = Math.min(max, left);
    shells.push(take);
    left -= take;
  }
  return shells;
}
export const cfg = (z) => config(z).join(', ');
export const valence = (z) => config(z).at(-1);
export const shellsOf = (z) => config(z).length;
/** Valency from the outer shell: lose up to 3, gain the rest of the octet (duplet for hydrogen and helium). */
export function valency(z) {
  const v = valence(z);
  if (z === 2 || v === 8) return 0;
  if (z === 1) return 1;
  return v <= 4 ? v : 8 - v;
}
eq(EL.map((e) => cfg(e.z)), ['1', '2', '2, 1', '2, 2', '2, 3', '2, 4', '2, 5', '2, 6', '2, 7', '2, 8', '2, 8, 1', '2, 8, 2', '2, 8, 3', '2, 8, 4', '2, 8, 5', '2, 8, 6', '2, 8, 7', '2, 8, 8', '2, 8, 8, 1', '2, 8, 8, 2'], 'configurations of the first 20 elements');
eq(EL.map((e) => valence(e.z)), [1, 2, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2], 'outer-shell electrons');
eq(EL.map((e) => valency(e.z)), [1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2], 'valencies');
eq(EL.map((e) => e.z), Array.from({ length: 20 }, (_, i) => i + 1), 'atomic numbers 1 to 20');

// ---------------------------------------------------------------- protons, neutrons, electrons
export const protons = (e) => e.z;
export const neutrons = (e, a = e.a) => a - e.z;
/** Electrons of an ion with charge `q` (positive = cation). */
export const electrons = (e, q = 0) => e.z - q;
export const P = bySym('P');
eq([protons(P), neutrons(P), electrons(P)], [15, 16, 15], 'phosphorus-31');
export const CA = bySym('Ca');
eq([protons(CA), neutrons(CA), electrons(CA, 2)], [20, 20, 18], 'calcium-40 ion Ca 2+');
export const S = bySym('S');
eq([neutrons(S), electrons(S, -2), electrons(S)], [16, 18, 16], 'sulphur-32 and S 2-');
export const AL = bySym('Al');
eq([neutrons(AL), cfg(AL.z), electrons(AL, 3)], [14, '2, 8, 3', 10], 'aluminium-27');
export const NA = bySym('Na');
eq([neutrons(NA), electrons(NA, 1)], [12, 10], 'sodium-23 and Na +');
export const F = bySym('F');
eq([neutrons(F), electrons(F, -1)], [10, 10], 'fluorine-19 and F -');
export const K = bySym('K');
eq([neutrons(K), cfg(K.z), electrons(K, 1)], [20, '2, 8, 8, 1', 18], 'potassium-39');
export const MG = bySym('Mg');
eq([neutrons(MG), electrons(MG, 2)], [12, 10], 'magnesium-24 and Mg 2+');
export const O = bySym('O');
eq([neutrons(O), electrons(O, -2)], [8, 10], 'oxygen-16 and O 2-');
export const LI = bySym('Li');
eq([neutrons(LI), electrons(LI, 1)], [4, 2], 'lithium-7 and Li +');
export const SI = bySym('Si');
eq([neutrons(SI), shellsOf(SI.z), valence(SI.z)], [14, 3, 4], 'silicon-28');
export const BE = bySym('Be');
eq([neutrons(BE), cfg(BE.z)], [5, '2, 2'], 'beryllium-9');
export const N = bySym('N');
eq([neutrons(N), cfg(N.z)], [7, '2, 5'], 'nitrogen-14');
// mass number from protons and neutrons
eq(11 + 12, 23, 'an atom with 11 protons and 12 neutrons has mass number 23');
eq(protons(byZ(16)), 16, 'an atom with configuration 2, 8, 6 has 16 protons');
eq(config(16), [2, 8, 6], 'configuration of atomic number 16');
eq(45 - 21, 24, 'scandium-like: mass number 45 with 21 protons has 24 neutrons');
eq(13 + 14, 27, 'an atom with 13 protons and 14 neutrons has mass number 27');

// ---------------------------------------------------------------- isotopes
export const ISO = {
  H: [{ name: 'protium', a: 1, p: 1, n: 0 }, { name: 'deuterium', a: 2, p: 1, n: 1 }, { name: 'tritium', a: 3, p: 1, n: 2 }],
  C: [{ name: 'carbon-12', a: 12, p: 6, n: 6 }, { name: 'carbon-13', a: 13, p: 6, n: 7 }, { name: 'carbon-14', a: 14, p: 6, n: 8 }],
  Cl: [{ name: 'chlorine-35', a: 35, p: 17, n: 18 }, { name: 'chlorine-37', a: 37, p: 17, n: 20 }],
};
for (const list of Object.values(ISO)) for (const i of list) eq(i.a - i.p, i.n, `neutrons of ${i.name}`);
eq(ISO.H.map((i) => i.n), [0, 1, 2], 'neutrons in the isotopes of hydrogen');
eq(ISO.C.map((i) => i.n), [6, 7, 8], 'neutrons in the isotopes of carbon');
eq(ISO.Cl.map((i) => i.n), [18, 20], 'neutrons in the isotopes of chlorine');
// chlorine occurs as chlorine-35 and chlorine-37 in the ratio 3 : 1; the average gives 35.5
export const CL_RATIO = [3, 1];
export const CL_AVG = (CL_RATIO[0] * 35 + CL_RATIO[1] * 37) / (CL_RATIO[0] + CL_RATIO[1]);
eq(CL_AVG, 35.5, 'average atomic mass of chlorine from the 3 : 1 mixture');
export const CL_SAMPLE = 400;
eq([(CL_SAMPLE * 3) / 4, (CL_SAMPLE * 1) / 4], [300, 100], 'atoms of chlorine-35 and chlorine-37 in 400 atoms');
// a hypothetical sample of 80 atoms in the ratio 3 : 1 -> 60 and 20
eq([(80 * 3) / 4, 80 / 4], [60, 20], 'atoms in a sample of 80 chlorine atoms');
// hydrogen: protium, deuterium, tritium all have one electron and one proton
eq(ISO.H.map((i) => i.p), [1, 1, 1], 'isotopes of hydrogen share one proton');
// relative mass of 1 electron is about 1/1840 of a proton: 1840 electrons weigh about as much as one proton
eq(1840 * (1 / 1840), 1, 'about 1840 electrons equal one proton in mass');

// ---------------------------------------------------------------- an imagined gold foil experiment: counts of alpha particles
export const SCATTER = { total: 20000, straight: 19980, deflected: 19, rebound: 1 };
eq(SCATTER.straight + SCATTER.deflected + SCATTER.rebound, SCATTER.total, 'scattering counts add to 20000');
eq((SCATTER.straight / SCATTER.total) * 100, 99.9, 'percentage that passed straight');
eq(SCATTER.total / SCATTER.rebound, 20000, 'one in 20000 rebounds');
