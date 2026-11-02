// ch09 Biomolecules — arithmetic used by decks, SVGs and questions (asserted below).
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);
/** Bonds (and water molecules released) when n monomers join in one unbranched chain. */
export const bondsInChain = (n) => n - 1;
/** Bonds in several chains, given their lengths. */
export const bondsInChains = (lengths) => lengths.reduce((s, n) => s + n - 1, 0);
/** Mass of a linear peptide from residue masses (daltons): sum minus 18 per water released. */
export const WATER = 18;
export const peptideMass = (masses) => masses.reduce((s, m) => s + m, 0) - WATER * (masses.length - 1);
/** Dry mass after removing water (percent of fresh mass). */
export const dryMass = (fresh, waterPct, dp = 1) => round(fresh * (1 - waterPct / 100), dp);
/** Carbonic anhydrase: molecules per second with the enzyme versus per hour without it. */
export const CA = { withPerSecond: 600000, withoutPerHour: 200 };
export const caFactor = () => (CA.withPerSecond * 3600) / CA.withoutPerHour;
/** Uncatalysed reaction rate doubling for every 10 degree rise. */
export const rateAfter = (rate, dT) => round(rate * 2 ** (dT / 10), 3);
/** Average rate from two readings (product, time). */
export const avgRate = ([p1, t1], [p2, t2], dp = 2) => round((p2 - p1) / (t2 - t1), dp);
/** Hydrogen bonds in a DNA segment: two per A–T pair, three per G–C pair. */
export const hBonds = (at, gc) => 2 * at + 3 * gc;
/** B-DNA: 10 base pairs per turn, 3.4 nm per turn. */
export const DNA = { bpPerTurn: 10, pitchNm: 3.4 };
export const turns = (bp) => bp / DNA.bpPerTurn;
export const lengthNm = (bp, dp = 1) => round((bp * DNA.pitchNm) / DNA.bpPerTurn, dp);
/** Saturation curve used for the substrate graph (shape only). */
export const velocity = (S, Vmax = 1, K = 1) => (Vmax * S) / (K + S);
/** Bell curve used for temperature and pH graphs (shape only). */
export const bell = (x, opt, width) => Math.exp(-(((x - opt) / width) ** 2));

const eq = (a, b, what) => {
  if (Math.abs(a - b) > 1e-9) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};
eq(bondsInChain(51), 50, 'peptide bonds');
eq(bondsInChain(400), 399, 'water from starch chain');
eq(bondsInChains([141, 141, 146, 146]), 570, 'haemoglobin-like protein');
eq(peptideMass([75, 75, 75]), 189, 'triglycine');
eq(peptideMass([89, 89]), 160, 'dialanine');
eq(caFactor(), 10800000, 'carbonic anhydrase');
eq(round(caFactor() / 1e6, 1), 10.8, 'carbonic anhydrase in millions');
eq(rateAfter(3, 20), 12, 'rate doubling');
eq(rateAfter(8, -10), 4, 'rate halving');
eq(avgRate([2.4, 4], [6, 10]), 0.6, 'average rate');
eq(avgRate([0, 0], [18, 5]), 3.6, 'initial rate');
eq(hBonds(6, 4), 24, 'hydrogen bonds');
eq(hBonds(3, 7), 27, 'hydrogen bonds GC-rich');
eq(turns(150), 15, 'turns');
eq(lengthNm(150), 51, 'length');
eq(dryMass(50, 78), 11, 'dry mass');
eq(dryMass(40, 85), 6, 'dry mass example');
eq(round(18.5 / 0.03, 0), 617, 'carbon enrichment');
eq(pct(40 - 30, 40, 0), 25, 'inhibition');
