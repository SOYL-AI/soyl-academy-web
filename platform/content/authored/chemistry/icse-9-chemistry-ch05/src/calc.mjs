// Computed values for ICSE 9 Chemistry ch05 Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents.
// Atomic masses used (stated in each stem): H 1, C 12, O 16, Na 23, S 32, Fe 56, Cu 63.5. Every derived number is computed here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
export const A = { H: 1, C: 12, O: 16, Na: 23, S: 32, Fe: 56, Cu: 63.5 };
export const H2O = eq(2 * A.H + A.O, 18, 'Mr of water');

// Relative molecular masses of the anhydrous salts and the hydrates (n molecules of water of crystallisation).
export const FESO4 = eq(A.Fe + A.S + 4 * A.O, 152, 'Mr FeSO4');
export const FESO4_7 = eq(FESO4 + 7 * H2O, 278, 'Mr FeSO4.7H2O');
export const NA2CO3 = eq(2 * A.Na + A.C + 3 * A.O, 106, 'Mr Na2CO3');
export const NA2CO3_10 = eq(NA2CO3 + 10 * H2O, 286, 'Mr Na2CO3.10H2O');
export const NA2CO3_1 = eq(NA2CO3 + H2O, 124, 'Mr Na2CO3.H2O');
export const NA2SO4 = eq(2 * A.Na + A.S + 4 * A.O, 142, 'Mr Na2SO4');
export const NA2SO4_10 = eq(NA2SO4 + 10 * H2O, 322, 'Mr Na2SO4.10H2O');
export const CUSO4 = eq(A.Cu + A.S + 4 * A.O, 159.5, 'Mr CuSO4');
export const CUSO4_5 = eq(CUSO4 + 5 * H2O, 249.5, 'Mr CuSO4.5H2O');

// Percentage of water of crystallisation
export const pctWater = (n, mrHydrate) => round(((n * H2O) / mrHydrate) * 100, 1);
export const P_FE = eq(pctWater(7, FESO4_7), 45.3, '% water FeSO4.7H2O');
export const P_NA2CO3 = eq(pctWater(10, NA2CO3_10), 62.9, '% water Na2CO3.10H2O');
export const P_NA2SO4 = eq(pctWater(10, NA2SO4_10), 55.9, '% water Na2SO4.10H2O');
export const P_CU = eq(pctWater(5, CUSO4_5), 36.1, '% water CuSO4.5H2O');
export const W_FE = eq(7 * H2O, 126, 'water in FeSO4.7H2O');
export const W_NA2CO3 = eq(10 * H2O, 180, 'water in Na2CO3.10H2O');
export const W_CU = eq(5 * H2O, 90, 'water in CuSO4.5H2O');
export const W_NA2SO4 = eq(10 * H2O, 180, 'water in Na2SO4.10H2O');

// Heating FeSO4.7H2O: 5.56 g of crystals
export const FE_MASS = 5.56;
export const FE_ANH = eq(round((FE_MASS / FESO4_7) * FESO4, 2), 3.04, 'anhydrous FeSO4 from 5.56 g');
export const FE_LOSS = eq(round(FE_MASS - FE_ANH, 2), 2.52, 'water lost from 5.56 g FeSO4.7H2O');
eq(round((FE_MASS / FESO4_7) * W_FE, 2), FE_LOSS, 'water lost two ways agree');

// Heating Na2SO4.10H2O: 16.1 g of crystals
export const NS_MASS = 16.1;
export const NS_ANH = eq(round((NS_MASS / NA2SO4_10) * NA2SO4, 1), 7.1, 'anhydrous Na2SO4 from 16.1 g');
export const NS_LOSS = eq(round(NS_MASS - NS_ANH, 1), 9, 'water lost from 16.1 g Na2SO4.10H2O');

// Heating CuSO4.5H2O: 4.99 g of crystals
export const CU_MASS = 4.99;
export const CU_ANH = eq(round((CU_MASS / CUSO4_5) * CUSO4, 2), 3.19, 'anhydrous CuSO4 from 4.99 g');
export const CU_LOSS = eq(round(CU_MASS - CU_ANH, 2), 1.8, 'water lost from 4.99 g CuSO4.5H2O');

// Mass of crystals needed for 7.6 g of anhydrous FeSO4
export const FE_NEED_ANH = 7.6;
export const FE_NEED = eq(round((FE_NEED_ANH / FESO4) * FESO4_7, 1), 13.9, 'FeSO4.7H2O needed for 7.6 g anhydrous');

// Water in 100 g of washing soda crystals; in 143 g
export const WS_100 = eq(round((W_NA2CO3 / NA2CO3_10) * 100, 1), 62.9, 'water in 100 g washing soda');
export const WS_MASS = 14.3;
export const WS_WATER = eq(round((WS_MASS / NA2CO3_10) * W_NA2CO3, 1), 9, 'water in 14.3 g washing soda');
export const WS_ANH = eq(round(WS_MASS - WS_WATER, 1), 5.3, 'anhydrous sodium carbonate from 14.3 g');

// Efflorescence of washing soda to the monohydrate: 28.6 g of crystals
export const EF_MASS = 28.6;
export const EF_LEFT = eq(round((EF_MASS / NA2CO3_10) * NA2CO3_1, 1), 12.4, 'monohydrate from 28.6 g washing soda');
export const EF_LOST = eq(round(EF_MASS - EF_LEFT, 1), 16.2, 'water lost by efflorescence of 28.6 g');
export const EF_PCT = eq(round((EF_LOST / EF_MASS) * 100, 1), 56.6, '% mass lost in efflorescence');
export const EF_SMALL = 2.86;
export const EF_SMALL_LEFT = eq(round((EF_SMALL / NA2CO3_10) * NA2CO3_1, 2), 1.24, 'monohydrate from 2.86 g');
export const EF_SMALL_LOST = eq(round(EF_SMALL - EF_SMALL_LEFT, 2), 1.62, 'water lost from 2.86 g');

// Deliquescence: 5 g of a solid becomes 8 g of liquid
export const DQ_START = 5;
export const DQ_END = 8;
export const DQ_GAIN = eq(DQ_END - DQ_START, 3, 'water absorbed');
export const DQ_PCT = eq(round((DQ_GAIN / DQ_START) * 100, 0), 60, 'percentage increase of mass');

// Hygroscopic: 100 g of concentrated sulphuric acid left open gains mass
export const ACID_START = 100;
export const ACID_END = 109;
export const ACID_GAIN = eq(ACID_END - ACID_START, 9, 'water absorbed by acid');
export const ACID_PCT = eq(round((ACID_GAIN / ACID_START) * 100, 0), 9, 'percentage gain of the acid');

// Quicklime and sugar: C12H22O11 loses 11 H2O (atoms conserved)
export const SUGAR_C = 12;
export const SUGAR_H = 22;
export const SUGAR_O = 11;
eq([SUGAR_H, SUGAR_O], [11 * 2, 11 * 1], 'H and O in sugar are in the ratio of water (2 to 1)');
export const SUGAR_MR = eq(12 * A.C + 22 * A.H + 11 * A.O, 342, 'Mr of sucrose');
export const SUGAR_WATER = eq(11 * H2O, 198, 'water removed from sucrose');
export const SUGAR_C_MASS = eq(SUGAR_MR - SUGAR_WATER, 144, 'carbon left from sucrose (mass in u)');
eq(12 * A.C, SUGAR_C_MASS, 'carbon check');

// Atom balance notes for hand checks (these equations contain no bond characters; the pipeline checks them):
//   CuSO4.5H2O -> CuSO4 + 5H2O ; FeSO4.7H2O -> FeSO4 + 7H2O ; Na2CO3.10H2O -> Na2CO3 + 10H2O ;
//   Na2CO3.10H2O -> Na2CO3.H2O + 9H2O ; CaO + H2O -> Ca(OH)2 ; 2NH3 + H2SO4 -> (NH4)2SO4 ; C12H22O11 -> 12C + 11H2O
