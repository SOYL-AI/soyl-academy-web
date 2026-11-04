// ISC 11 Biology ch11 Biomolecules: every number used in a stem, answer, table, graph or slide is computed here and asserted with
// eq(). Original settings: formula masses of sugars, amino acids and fats from atomic masses; peptide masses and counts;
// hydrolysis of sucrose by mass; enzyme rates from a Michaelis-type model with and without a competitive inhibitor; and
// temperature and pH activity curves for a human, a polar-fish, a stomach and a gut enzyme.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);

// ---------------------------------------------------------------- formula masses (whole-number atomic masses)
const AT = { C: 12, H: 1, N: 14, O: 16, S: 32 };
export const mass = (f) => Object.entries(f).reduce((s, [el, n]) => s + AT[el] * n, 0);
export const WATER = mass({ H: 2, O: 1 });
eq(WATER, 18, 'water');
export const SUGAR = { glucose: { C: 6, H: 12, O: 6 }, fructose: { C: 6, H: 12, O: 6 }, galactose: { C: 6, H: 12, O: 6 }, ribose: { C: 5, H: 10, O: 5 }, deoxyribose: { C: 5, H: 10, O: 4 } };
export const M = Object.fromEntries(Object.entries(SUGAR).map(([k, f]) => [k, mass(f)]));
eq(M, { glucose: 180, fructose: 180, galactose: 180, ribose: 150, deoxyribose: 134 }, 'monosaccharide masses');
/** A disaccharide is two monosaccharides minus one water. */
export const disacc = (a, b) => M[a] + M[b] - WATER;
export const D = { maltose: disacc('glucose', 'glucose'), lactose: disacc('glucose', 'galactose'), sucrose: disacc('glucose', 'fructose') };
eq(D, { maltose: 342, lactose: 342, sucrose: 342 }, 'disaccharide masses');
eq(M.ribose - M.deoxyribose, 16, 'deoxyribose lacks one oxygen atom');
/** Hydrolysis of g grams of sucrose: water used and monosaccharide produced (grams). */
export const hydrolyse = (g) => {
  const mol = g / D.sucrose;
  return { mol, water: round(mol * WATER, 2), sugars: round(mol * 2 * M.glucose, 2), each: round(mol * M.glucose, 2) };
};
eq(hydrolyse(171), { mol: 0.5, water: 9, sugars: 180, each: 90 }, 'hydrolysis of 171 g of sucrose');
/** Polysaccharide chain of n glucose units: n units minus (n - 1) waters. */
export const polyMass = (n) => n * M.glucose - (n - 1) * WATER;
eq(polyMass(10), 1638, 'decaglucose chain mass');

// ---------------------------------------------------------------- amino acids and peptides
export const AA = {
  glycine: { f: { C: 2, H: 5, N: 1, O: 2 }, r: 'H', cls: 'neutral' },
  alanine: { f: { C: 3, H: 7, N: 1, O: 2 }, r: 'CH3', cls: 'neutral' },
  serine: { f: { C: 3, H: 7, N: 1, O: 3 }, r: 'CH2OH', cls: 'neutral' },
  cysteine: { f: { C: 3, H: 7, N: 1, O: 2, S: 1 }, r: 'CH2SH', cls: 'sulphur-containing' },
};
export const AM = Object.fromEntries(Object.entries(AA).map(([k, a]) => [k, mass(a.f)]));
eq(AM, { glycine: 75, alanine: 89, serine: 105, cysteine: 121 }, 'amino-acid masses');
/** Mass of an unbranched peptide made of the named residues: sum minus one water per peptide bond. */
export const peptide = (names) => names.reduce((s, n) => s + AM[n], 0) - (names.length - 1) * WATER;
export const TRI = ['glycine', 'alanine', 'serine'];
eq(peptide(TRI), 233, 'Gly-Ala-Ser mass');
export const PENTA = ['serine', 'glycine', 'cysteine', 'alanine', 'cysteine'];
eq(peptide(PENTA), 439, 'Ser-Gly-Cys-Ala-Cys mass');
export const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
eq(fact(3), 6, 'orders of three different residues');
eq(fact(4), 24, 'orders of four different residues');
eq(20 ** 2, 400, 'dipeptides from twenty amino acids');
eq(20 ** 3, 8000, 'tripeptides from twenty amino acids');
eq(3 ** 3, 27, 'tripeptides from three amino acids with repeats');
/** Peptide bonds in a protein of `residues` amino acids arranged in `chains` unbranched chains. */
export const bonds = (residues, chains) => residues - chains;
eq(bonds(280, 4), 276, 'peptide bonds in 280 residues in 4 chains');
eq(bonds(36, 1), 35, 'peptide bonds in a 36-residue chain');
eq(bonds(PENTA.length, 1), 4, 'peptide bonds in the pentapeptide');

// ---------------------------------------------------------------- lipids
export const FA = { palmitic: { C: 16, H: 32, O: 2, dbl: 0 }, stearic: { C: 18, H: 36, O: 2, dbl: 0 }, oleic: { C: 18, H: 34, O: 2, dbl: 1 }, linoleic: { C: 18, H: 32, O: 2, dbl: 2 } };
export const FAM = Object.fromEntries(Object.entries(FA).map(([k, f]) => [k, mass({ C: f.C, H: f.H, O: f.O })]));
eq(FAM, { palmitic: 256, stearic: 284, oleic: 282, linoleic: 280 }, 'fatty-acid masses');
export const GLYCEROL = mass({ C: 3, H: 8, O: 3 });
eq(GLYCEROL, 92, 'glycerol');
/** Triglyceride from glycerol and three fatty acids: three waters lost. */
export const triglyceride = (...acids) => GLYCEROL + acids.reduce((s, a) => s + FAM[a], 0) - 3 * WATER;
eq(triglyceride('palmitic', 'palmitic', 'palmitic'), 806, 'tripalmitin');
eq(triglyceride('oleic', 'oleic', 'oleic'), 884, 'triolein');
eq(triglyceride('stearic', 'oleic', 'palmitic'), 860, 'mixed fat');
/** Each double bond removes two hydrogen atoms from a C18 acid. */
eq(FA.stearic.H - FA.oleic.H, 2, 'one double bond: two fewer hydrogens');
eq(FA.stearic.H - FA.linoleic.H, 4, 'two double bonds: four fewer hydrogens');
export const ENERGY = { fat: 9, carbohydrate: 4, protein: 4 }; // kcal per gram (approximate)
export const kcal = (kind, g) => ENERGY[kind] * g;
eq(kcal('fat', 20), 180, 'energy in 20 g of fat');
eq(kcal('carbohydrate', 20), 80, 'energy in 20 g of carbohydrate');
eq(kcal('fat', 20) / kcal('carbohydrate', 20), 2.25, 'fat gives more than twice the energy of carbohydrate');

// ---------------------------------------------------------------- enzyme kinetics: v = Vmax S / (Km + S); competitive inhibitor raises Km only
export const KIN = { vmax: 80, km: 10, kmInh: 20 };
export const rate = (s, inhibited = false) => round((KIN.vmax * s) / ((inhibited ? KIN.kmInh : KIN.km) + s), 1);
export const KS = [5, 10, 20, 50, 100, 200];
export const KT = KS.map((s) => ({ s, free: rate(s), inh: rate(s, true) }));
eq(KT.map((k) => k.free), [26.7, 40, 53.3, 66.7, 72.7, 76.2], 'rates without inhibitor');
eq(KT.map((k) => k.inh), [16, 26.7, 40, 57.1, 66.7, 72.7], 'rates with competitive inhibitor');
eq(rate(KIN.km), KIN.vmax / 2, 'half Vmax at S = Km');
eq(rate(KIN.kmInh, true), KIN.vmax / 2, 'half Vmax at S = apparent Km with inhibitor');
eq(rate(30), 60, 'rate at S = 30');
eq(rate(1000), 79.2, 'rate near Vmax');
eq(rate(1000, true), 78.4, 'inhibited rate near Vmax');
/** How much faster is the uninhibited reaction at a given S, as a ratio. */
export const ratio = (s) => round(rate(s) / rate(s, true), 2);
eq(ratio(10), 1.5, 'inhibition at S = Km');
eq(ratio(200), 1.05, 'inhibition at high S');

// ---------------------------------------------------------------- activity curves (percent of the maximum), bell shaped
export const bell = (x, opt, wUp, wDown) => Math.round(100 * Math.exp(-(((x - opt) / (x < opt ? wUp : wDown)) ** 2)));
export const TEMP = { human: { opt: 37, up: 20, down: 6 }, fish: { opt: 15, up: 10, down: 4 } };
export const act = (e, t) => bell(t, TEMP[e].opt, TEMP[e].up, TEMP[e].down);
export const TT = [5, 10, 15, 20, 25, 30, 37, 45, 55];
export const TCURVE = { human: TT.map((t) => act('human', t)), fish: TT.map((t) => act('fish', t)) };
eq(TCURVE.human, [8, 16, 30, 49, 70, 88, 100, 17, 0], 'human enzyme temperature curve');
eq(TCURVE.fish, [37, 78, 100, 21, 0, 0, 0, 0, 0], 'polar-fish enzyme temperature curve');
export const PH = { pepsin: { opt: 2, w: 1 }, trypsin: { opt: 8, w: 1.2 } };
export const phAct = (e, p) => bell(p, PH[e].opt, PH[e].w, PH[e].w);
export const PP = [1, 2, 3, 4, 6, 7, 8, 9, 10];
export const PCURVE = { pepsin: PP.map((p) => phAct('pepsin', p)), trypsin: PP.map((p) => phAct('trypsin', p)) };
eq(PCURVE.pepsin, [37, 100, 37, 2, 0, 0, 0, 0, 0], 'pepsin pH curve');
eq(PCURVE.trypsin, [0, 0, 0, 0, 6, 50, 100, 50, 6], 'trypsin pH curve');

// ---------------------------------------------------------------- sample sizes for dietary examples
export const LYS = { cereal: 3, pulse: 7 }; // grams of lysine per 100 g protein (illustrative)
eq(LYS.pulse - LYS.cereal, 4, 'lysine difference');
eq(pct(LYS.cereal, LYS.pulse, 0), 43, 'cereal lysine as a share of pulse lysine');

/** Percentage by which the inhibitor lowers the rate at substrate s, worked in tenths so that 33.25 rounds up to 33.3. */
export const dropPct = (s) => {
  const t10 = (x) => Math.round(x * 10);
  return Math.round(((t10(rate(s)) - t10(rate(s, true))) * 1000) / t10(rate(s))) / 10;
};
eq(dropPct(10), 33.3, 'inhibitor lowers the rate at S = 10 by one third');
