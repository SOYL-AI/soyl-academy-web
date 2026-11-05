// Computed values for ICSE 9 Chemistry ch13 Atmospheric and Environmental Chemistry.
// Atomic masses are the ICSE values given in the stems: H 1, C 12, N 14, O 16, S 32, Ca 40.
// All measurements, doses and case figures are IMAGINED and illustrative unless a note says "approximate textbook value".
// Every equation used in a slide, note or item is checked here for atom balance (and for conservation of mass).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
export const AM = { H: 1, C: 12, N: 14, O: 16, S: 32, Ca: 40 };

export function atoms(formula) {
  const out = {};
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
export const rmm = (f) => Object.entries(atoms(f)).reduce((s, [k, v]) => s + AM[k] * v, 0);
export const pctEl = (f, el) => round(((atoms(f)[el] ?? 0) * AM[el] * 100) / rmm(f), 1);

// ---------------------------------------------------------------- relative molecular masses
export const M = {};
for (const f of ['S', 'O2', 'SO2', 'SO3', 'H2O', 'H2SO3', 'H2SO4', 'N2', 'NO', 'NO2', 'HNO3', 'CO2', 'O3', 'CaCO3', 'CaSO4', 'CaO', 'C', 'CH4', 'N2O']) M[f] = rmm(f);
eq([M.SO2, M.SO3, M.H2SO3, M.H2SO4], [64, 80, 82, 98], 'oxides and acids of sulphur');
eq([M.NO, M.NO2, M.HNO3, M.N2O], [30, 46, 63, 44], 'oxides of nitrogen and nitric acid');
eq([M.CO2, M.O3, M.O2, M.CH4], [44, 48, 32, 16], 'CO2, O3, O2, CH4');
eq([M.CaCO3, M.CaSO4], [100, 136], 'marble and its sulphate');
export const P = {
  S_in_SO2: pctEl('SO2', 'S'),
  N_in_NO: pctEl('NO', 'N'),
  N_in_NO2: pctEl('NO2', 'N'),
  C_in_CO2: pctEl('CO2', 'C'),
  O_in_O3: pctEl('O3', 'O'),
  S_in_H2SO4: pctEl('H2SO4', 'S'),
};
eq(P, { S_in_SO2: 50, N_in_NO: 46.7, N_in_NO2: 30.4, C_in_CO2: 27.3, O_in_O3: 100, S_in_H2SO4: 32.7 }, 'percentage composition');

// ---------------------------------------------------------------- equations: atom balance and mass conservation
export const side = (parts) => parts.reduce((acc, [n, f]) => {
  for (const [k, v] of Object.entries(atoms(f))) acc[k] = (acc[k] ?? 0) + n * v;
  return acc;
}, {});
const norm = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
export const mass = (parts) => parts.reduce((s, [n, f]) => s + n * rmm(f), 0);
export const EQ = {
  burnS: { r: [[1, 'S'], [1, 'O2']], p: [[1, 'SO2']] },
  burnC: { r: [[1, 'C'], [1, 'O2']], p: [[1, 'CO2']] },
  so2water: { r: [[1, 'SO2'], [1, 'H2O']], p: [[1, 'H2SO3']] },
  so3form: { r: [[2, 'SO2'], [1, 'O2']], p: [[2, 'SO3']] },
  so3water: { r: [[1, 'SO3'], [1, 'H2O']], p: [[1, 'H2SO4']] },
  sulphurousOx: { r: [[2, 'H2SO3'], [1, 'O2']], p: [[2, 'H2SO4']] },
  noform: { r: [[1, 'N2'], [1, 'O2']], p: [[2, 'NO']] },
  no2form: { r: [[2, 'NO'], [1, 'O2']], p: [[2, 'NO2']] },
  nitric: { r: [[4, 'NO2'], [1, 'O2'], [2, 'H2O']], p: [[4, 'HNO3']] },
  nitricAlt: { r: [[3, 'NO2'], [1, 'H2O']], p: [[2, 'HNO3'], [1, 'NO']] },
  marbleS: { r: [[1, 'CaCO3'], [1, 'H2SO4']], p: [[1, 'CaSO4'], [1, 'H2O'], [1, 'CO2']] },
  marbleN: { r: [[1, 'CaCO3'], [2, 'HNO3']], p: [[1, 'Ca(NO3)2'], [1, 'H2O'], [1, 'CO2']] },
  cement: { r: [[1, 'CaCO3']], p: [[1, 'CaO'], [1, 'CO2']] },
  ozone1: { r: [[1, 'O2']], p: [[2, 'O']] },
  ozone2: { r: [[1, 'O'], [1, 'O2']], p: [[1, 'O3']] },
  ozoneAll: { r: [[3, 'O2']], p: [[2, 'O3']] },
};
for (const [k, e] of Object.entries(EQ)) eq(norm(side(e.r)), norm(side(e.p)), `atoms balance in ${k}`);
// calcium nitrate needs its own atom count (the parser handles brackets): Ca 1, N 2, O 6
eq(atoms('Ca(NO3)2'), { Ca: 1, N: 2, O: 6 }, 'atoms in Ca(NO3)2');
eq(norm(side(EQ.marbleN.r)), { C: 1, Ca: 1, H: 2, N: 2, O: 9 }, 'marble with nitric acid: atoms');
// mass conservation for the equations whose formulas are all in the mass table
AM.Ca = 40;
for (const k of ['burnS', 'burnC', 'so2water', 'so3form', 'so3water', 'sulphurousOx', 'noform', 'no2form', 'nitric', 'nitricAlt', 'marbleS', 'cement', 'ozone2', 'ozoneAll']) {
  eq(mass(EQ[k].r), mass(EQ[k].p), `mass conserved in ${k}`);
}
eq(mass(EQ.so3water.r), 98, 'sulphur trioxide with water totals 98');
eq(mass(EQ.nitric.p), 252, 'four nitric acid');
eq(M.O3 / M.O2, 1.5, 'an ozone molecule is one and a half times as heavy as an oxygen molecule');
eq(mass(EQ.ozoneAll.p), 96, 'two ozone');
eq(rmm('CaCO3') + 0, 100, 'CaCO3');
// the chain from sulphur: S -> SO2 -> SO3 -> H2SO4 keeps one sulphur atom each time
eq([atoms('SO2').S, atoms('SO3').S, atoms('H2SO4').S], [1, 1, 1], 'one sulphur atom all along the chain');
eq([atoms('NO').N, atoms('NO2').N, atoms('HNO3').N], [1, 1, 1], 'one nitrogen atom all along the chain');

// ---------------------------------------------------------------- imagined data for worked examples and items
// Roadside carbon dioxide (imagined): 400 ppm to 460 ppm
export const CITY = { before: 400, after: 460 };
export const CITY_RISE = eq(CITY.after - CITY.before, 60, 'city carbon dioxide rise in ppm');
export const CITY_PCT = eq(round((CITY_RISE / CITY.before) * 100, 1), 15, 'city carbon dioxide rise in per cent');
// Dissolved oxygen after a sewage discharge (imagined): 8.0 to 3.0 mg per litre
export const SEW = { before: 8, after: 3 };
export const SEW_FALL = eq(SEW.before - SEW.after, 5, 'fall in dissolved oxygen, mg per litre');
export const SEW_PCT = eq(round((SEW_FALL / SEW.before) * 100, 1), 62.5, 'per cent fall in dissolved oxygen');
export const FISH_MIN = 5; // approximate: many fish need at least about 5 mg per litre
export const SEW_BELOW = eq(FISH_MIN - SEW.after, 2, 'shortfall below the fish minimum');
// Oxygen in a pond (imagined): 6 mg per litre in 5000 litres
export const POND = { mgL: 6, litres: 5000 };
export const POND_MG = eq(POND.mgL * POND.litres, 30000, 'oxygen in the pond, mg');
export const POND_G = eq(POND_MG / 1000, 30, 'oxygen in the pond, g');
// A fish tank (imagined): 40 litres at 7.5 mg per litre
export const TANK = { mgL: 7.5, litres: 40 };
export const TANK_MG = eq(TANK.mgL * TANK.litres, 300, 'oxygen in the fish tank, mg');
// Commuting (imagined): a car gives 120 g of carbon dioxide per km; a bus 800 g per km carrying 40 people
export const CAR_G_KM = 120;
export const BUS = { g_km: 800, people: 40 };
export const BUS_PER = eq(BUS.g_km / BUS.people, 20, 'bus emission per passenger per km');
export const CAR_BUS_RATIO = eq(CAR_G_KM / BUS_PER, 6, 'a car passenger emits six times as much as a bus passenger');
export const COMMUTE = { km: 25, days: 30 };
export const COMMUTE_G = eq(CAR_G_KM * COMMUTE.km * COMMUTE.days, 90000, 'car commute carbon dioxide in a month, g');
export const COMMUTE_KG = eq(COMMUTE_G / 1000, 90, 'car commute carbon dioxide in a month, kg');
export const COMMUTE_BUS_KG = eq((BUS_PER * COMMUTE.km * COMMUTE.days) / 1000, 15, 'bus commute carbon dioxide in a month, kg');
export const COMMUTE_SAVED_KG = eq(COMMUTE_KG - COMMUTE_BUS_KG, 75, 'carbon dioxide saved in a month by switching to the bus, kg');
export const COMMUTE_SAVED_PCT = eq(round((COMMUTE_SAVED_KG / COMMUTE_KG) * 100, 1), 83.3, 'per cent saved by switching to the bus');
// Mercury in fish (imagined): 0.8 mg per kg found, limit 0.5 mg per kg
export const HG = { found: 0.8, limit: 0.5 };
export const HG_OVER = eq(round(HG.found - HG.limit, 1), 0.3, 'mercury above the limit, mg per kg');
export const HG_PCT = eq(round((HG_OVER / HG.limit) * 100, 0), 60, 'per cent above the limit');
export const HG_MEAL = { kg: 0.25 };
export const HG_MEAL_MG = eq(round(HG.found * HG_MEAL.kg, 2), 0.2, 'mercury in a 250 g portion, mg');
// Mercury along a food chain (imagined, mg per kg): plankton, small fish, large fish, bird
export const CHAIN = { plankton: 0.04, small: 0.5, large: 2, bird: 25 };
export const CHAIN_BIRD_X = eq(round(CHAIN.bird / CHAIN.plankton, 0), 625, 'bird to plankton concentration factor');
export const CHAIN_LARGE_X = eq(round(CHAIN.large / CHAIN.small, 0), 4, 'large fish to small fish concentration factor');
export const CHAIN_SMALL_X = eq(round(CHAIN.small / CHAIN.plankton, 1), 12.5, 'small fish to plankton concentration factor');
// Plastic waste in a town (imagined): 12 tonnes a day, 35 per cent collected for recycling
export const PLASTIC = { tonnes: 12, collectedPct: 35 };
export const PLASTIC_COLLECTED = eq(round((PLASTIC.tonnes * PLASTIC.collectedPct) / 100, 1), 4.2, 'plastic collected, tonnes');
export const PLASTIC_LOST = eq(round(PLASTIC.tonnes - PLASTIC_COLLECTED, 1), 7.8, 'plastic not collected, tonnes');
// Sewage: a lake with 20 outlets... skip; pesticide in a stream (imagined): 0.002 mg per litre in 5,000,000 litres
export const STREAM = { mgL: 0.002, litres: 5000000 };
export const STREAM_MG = eq(round(STREAM.mgL * STREAM.litres, 0), 10000, 'pesticide in the stream, mg');
export const STREAM_G = eq(STREAM_MG / 1000, 10, 'pesticide in the stream, g');
// Fertiliser nitrate (imagined): a farm adds 120 kg of nitrogen fertiliser; 25 per cent runs off into the lake
export const FARM = { kg: 120, runoffPct: 25 };
export const FARM_RUNOFF = eq((FARM.kg * FARM.runoffPct) / 100, 30, 'fertiliser lost by run-off, kg');
// Acid rain damage (imagined): a marble step loses 0.5 mm per year
export const MARBLE = { mmYear: 0.5, years: 40 };
export const MARBLE_LOSS = eq(MARBLE.mmYear * MARBLE.years, 20, 'marble lost in forty years, mm');

// ---------------------------------------------------------------- dissolved oxygen against temperature (approximate textbook values)
// Fresh water saturated with air at sea-level pressure, mg of oxygen per litre. Books quote slightly different values.
export const DO = [[0, 14.6], [10, 11.3], [20, 9.1], [30, 7.6], [40, 6.5]];
eq(DO.every((p, i) => i === 0 || p[1] < DO[i - 1][1]), true, 'dissolved oxygen falls as temperature rises');
export const DO_DROP_0_30 = eq(round(DO[0][1] - DO[3][1], 1), 7, 'fall in saturated dissolved oxygen between 0 and 30 degrees');
export const DO_DROP_PCT = eq(round((DO_DROP_0_30 / DO[0][1]) * 100, 0), 48, 'per cent fall between 0 and 30 degrees');
export const DO_20_30 = eq(round(DO[2][1] - DO[3][1], 1), 1.5, 'fall between 20 and 30 degrees');
export const DO_30_OK = eq(DO[3][1] > FISH_MIN, true, 'warm saturated water still holds more than the fish minimum');

// ---------------------------------------------------------------- values used inside question items
export const IT = {};
// a bus stand (imagined): 380 to 456 parts per million
IT.CITY2 = { before: 380, after: 456 };
IT.CITY2_RISE = eq(IT.CITY2.after - IT.CITY2.before, 76, 'bus stand carbon dioxide rise');
IT.CITY2_PCT = eq(round((IT.CITY2_RISE / IT.CITY2.before) * 100, 1), 20, 'bus stand per cent rise');
// saturated water at 30 degrees in a 5000 litre pond (approximate textbook value)
IT.POND30 = { mgL: DO[3][1], litres: 5000 };
IT.POND30_MG = eq(round(IT.POND30.mgL * IT.POND30.litres, 0), 38000, 'oxygen in the warm pond, mg');
IT.POND30_G = eq(IT.POND30_MG / 1000, 38, 'oxygen in the warm pond, g');
IT.POND0_G = eq(round((DO[0][1] * IT.POND30.litres) / 1000, 0), 73, 'oxygen in the same pond at 0 degrees, g');
IT.POND_LESS_G = eq(IT.POND0_G - IT.POND30_G, 35, 'extra oxygen a cold pond holds, g');
// skeletal equation to be balanced: NO2 + O2 + H2O -> HNO3 has coefficients 4, 1, 2, 4
IT.BAL = eq(EQ.nitric.r.map(([n]) => n).concat(EQ.nitric.p.map(([n]) => n)), [4, 1, 2, 4], 'coefficients of the nitric acid equation');
// per cent of the mercury in a 250 g portion relative to a limit of 0.5 mg per kg: portion allowance
IT.HG_ALLOW = eq(round(HG.limit * HG_MEAL.kg, 3), 0.125, 'mercury allowance in a 250 g portion at the limit, mg');
IT.HG_EXCESS = eq(round(HG_MEAL_MG - IT.HG_ALLOW, 3), 0.075, 'mercury above the allowance in the portion, mg');
// a town's sewage flow (imagined)
IT.CHAIN_ORDER = eq([CHAIN.plankton, CHAIN.small, CHAIN.large, CHAIN.bird].every((v, i, a) => i === 0 || v > a[i - 1]), true, 'mercury rises up the food chain');
