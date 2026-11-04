// ISC 11 Biology ch14 Respiration in Plants — every number in a stem, answer, table or slide is computed here and asserted.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws when a computed value does not match the expected one. */
export const eq = (v, e, what) => {
  if (!(v === e || (typeof v === 'number' && typeof e === 'number' && Math.abs(v - e) < 1e-9))) throw new Error(`calc: ${what}: got ${v}, expected ${e}`);
  return v;
};

// ---------------------------------------------------------------- balanced equations (atoms are counted, not typed)
/** Atom counts of a simple formula such as C6H12O6. */
export function atoms(f) {
  const out = {};
  for (const [, el, n] of f.matchAll(/([A-Z][a-z]?)(\d*)/g)) out[el] = (out[el] ?? 0) + (n ? Number(n) : 1);
  return out;
}
const side = (terms) => terms.reduce((m, [k, f]) => { for (const [el, n] of Object.entries(atoms(f))) m[el] = (m[el] ?? 0) + k * n; return m; }, {});
/** Throws unless the equation balances; returns the equation. */
export function balance(lhs, rhs, what) {
  const a = side(lhs), b = side(rhs);
  for (const el of new Set([...Object.keys(a), ...Object.keys(b)])) if ((a[el] ?? 0) !== (b[el] ?? 0)) throw new Error(`calc: ${what} does not balance for ${el}: ${a[el] ?? 0} vs ${b[el] ?? 0}`);
  return { lhs, rhs };
}
/** Respiratory quotient = CO2 evolved / O2 consumed. */
export const rq = (co2, o2) => co2 / o2;
const coef = (eqn, f, sideName) => eqn[sideName].find(([, g]) => g === f)[0];
export function eqRq(eqn) {
  return rq(coef(eqn, 'CO2', 'rhs'), coef(eqn, 'O2', 'lhs'));
}

export const EQ = {
  glucose: balance([[1, 'C6H12O6'], [6, 'O2']], [[6, 'CO2'], [6, 'H2O']], 'glucose'),
  palmitic: balance([[1, 'C16H32O2'], [23, 'O2']], [[16, 'CO2'], [16, 'H2O']], 'palmitic acid'),
  stearic: balance([[1, 'C18H36O2'], [26, 'O2']], [[18, 'CO2'], [18, 'H2O']], 'stearic acid'),
  tripalmitin: balance([[2, 'C51H98O6'], [145, 'O2']], [[102, 'CO2'], [98, 'H2O']], 'tripalmitin'),
  succinic: balance([[2, 'C4H6O4'], [7, 'O2']], [[8, 'CO2'], [6, 'H2O']], 'succinic acid'),
  tartaric: balance([[2, 'C4H6O6'], [5, 'O2']], [[8, 'CO2'], [6, 'H2O']], 'tartaric acid'),
  oxalic: balance([[2, 'C2H2O4'], [1, 'O2']], [[4, 'CO2'], [2, 'H2O']], 'oxalic acid'),
  alcoholic: balance([[1, 'C6H12O6']], [[2, 'C2H6O'], [2, 'CO2']], 'alcoholic fermentation'),
  lactic: balance([[1, 'C6H12O6']], [[2, 'C3H6O3']], 'lactic fermentation'),
};
export const RQ = {
  glucose: eqRq(EQ.glucose),
  palmitic: round(eqRq(EQ.palmitic), 2),
  stearic: round(eqRq(EQ.stearic), 2),
  tripalmitin: round(eqRq(EQ.tripalmitin), 2),
  succinic: round(eqRq(EQ.succinic), 2),
  tartaric: round(eqRq(EQ.tartaric), 2),
  oxalic: eqRq(EQ.oxalic),
};
eq(RQ.glucose, 1, 'RQ of glucose');
eq(RQ.palmitic, 0.7, 'RQ of palmitic acid');
eq(RQ.stearic, 0.69, 'RQ of stearic acid');
eq(RQ.tripalmitin, 0.7, 'RQ of tripalmitin');
eq(RQ.succinic, 1.14, 'RQ of succinic acid');
eq(RQ.tartaric, 1.6, 'RQ of tartaric acid');
eq(RQ.oxalic, 4, 'RQ of oxalic acid');
/** Respirometer: volume of oxygen consumed for a given RQ and CO2 volume. */
export const o2Used = (co2, quotient) => round(co2 / quotient);
eq(o2Used(98, 0.7), 140, 'O2 used by fat-rich seeds');
export const SEED = { o2: 150, co2: 120 };
export const SEED_RQ = round(rq(SEED.co2, SEED.o2), 2);
eq(SEED_RQ, 0.8, 'RQ of the germinating seeds');

// ---------------------------------------------------------------- molar masses (C 12, H 1, O 16)
export const MM = { glucose: 180, ethanol: 46, co2: 44, lactic: 90 };
eq(6 * 12 + 12 + 6 * 16, MM.glucose, 'glucose M');
eq(2 * 12 + 6 + 16, MM.ethanol, 'ethanol M');
eq(12 + 32, MM.co2, 'CO2 M');
eq(3 * 12 + 6 + 3 * 16, MM.lactic, 'lactic acid M');
export const fermMass = (gGlucose) => {
  const mol = gGlucose / MM.glucose;
  return { mol, ethanol: mol * 2 * MM.ethanol, co2: mol * 2 * MM.co2, lactic: mol * 2 * MM.lactic };
};
export const FERM90 = fermMass(90);
eq(FERM90.ethanol, 46, 'ethanol from 90 g glucose');
eq(FERM90.co2, 44, 'CO2 from 90 g glucose');
eq(FERM90.lactic, 90, 'lactic acid from 90 g glucose');

// ---------------------------------------------------------------- bookkeeping of one glucose
export const GLY = { gross: 4, used: 2, net: 4 - 2, nadh: 2, pyruvate: 2 };
eq(GLY.net, 2, 'net ATP of glycolysis');
export const LINK = { perPyruvate: { nadh: 1, co2: 1, acetylCoA: 1 } };
export const KREBS1 = { nadh: 3, fadh2: 1, atp: 1, co2: 2 }; // per acetyl CoA
export const mul = (o, n) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v * n]));
export const LINK2 = mul(LINK.perPyruvate, 2);
export const KREBS2 = mul(KREBS1, 2);
eq(LINK2.nadh, 2, 'link NADH per glucose');
eq(LINK2.co2, 2, 'link CO2 per glucose');
eq(KREBS2.nadh, 6, 'Krebs NADH per glucose');
eq(KREBS2.fadh2, 2, 'Krebs FADH2 per glucose');
eq(KREBS2.atp, 2, 'Krebs ATP per glucose');
eq(KREBS2.co2, 4, 'Krebs CO2 per glucose');
export const TOTAL = {
  nadh: GLY.nadh + LINK2.nadh + KREBS2.nadh,
  fadh2: KREBS2.fadh2,
  substrateAtp: GLY.net + KREBS2.atp,
  co2: LINK2.co2 + KREBS2.co2,
};
eq(TOTAL.nadh, 10, 'NADH per glucose');
eq(TOTAL.co2, 6, 'CO2 per glucose');
eq(TOTAL.substrateAtp, 4, 'substrate-level ATP per glucose');
/** Carbon check: 6 C glucose -> 2 pyruvate (3 C) -> 2 acetyl CoA (2 C) + 2 CO2 -> 4 CO2. */
eq(6, GLY.pyruvate * 3, 'carbon in pyruvate');
eq(GLY.pyruvate * 3, 2 * 2 + LINK2.co2, 'carbon after the link reaction');
eq(2 * 2, KREBS2.co2, 'carbon released in the Krebs cycle');

// ATP per reduced carrier: textbook values 3 and 2; current estimates 2.5 and 1.5
export const yieldATP = (nadhATP, fadh2ATP) => {
  const g = { sub: GLY.net, nadh: GLY.nadh * nadhATP };
  const l = { nadh: LINK2.nadh * nadhATP };
  const k = { sub: KREBS2.atp, nadh: KREBS2.nadh * nadhATP, fadh2: KREBS2.fadh2 * fadh2ATP };
  return { g, l, k, glycolysis: g.sub + g.nadh, link: l.nadh, krebs: k.sub + k.nadh + k.fadh2, total: g.sub + g.nadh + l.nadh + k.sub + k.nadh + k.fadh2, ets: (TOTAL.nadh * nadhATP) + TOTAL.fadh2 * fadh2ATP };
};
export const Y = yieldATP(3, 2);
eq(Y.glycolysis, 8, 'ATP from glycolysis stage');
eq(Y.link, 6, 'ATP from link stage');
eq(Y.krebs, 24, 'ATP from Krebs stage');
eq(Y.total, 38, 'textbook ATP yield');
eq(Y.ets, 34, 'ATP from ETS (oxidative)');
export const Y2 = yieldATP(2.5, 1.5);
eq(Y2.total, 32, 'current ATP yield');
export const NO_FAD = Y.total - Y.k.fadh2;
eq(NO_FAD, 34, 'ATP if no FADH2 contributed');
export const FERM_ATP = 2;
export const FOLD = Y.total / FERM_ATP;
eq(FOLD, 19, 'aerobic yield as a multiple of fermentation');
export const EN = { glucose: 686, atp: 7.3 }; // kcal per mole
export const effAerobic = round(((Y.total * EN.atp) / EN.glucose) * 100, 1);
export const effFerm = round(((FERM_ATP * EN.atp) / EN.glucose) * 100, 1);
eq(effAerobic, 40.4, 'aerobic efficiency');
eq(effFerm, 2.1, 'fermentation efficiency');
