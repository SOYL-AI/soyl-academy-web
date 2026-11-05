// ch10 Thermal Properties of Matter — two decks: Part 1 (t01–t02) temperature, thermal expansion, specific heat, calorimetry and
// change of state; Part 2 (t03–t04) conduction, convection, radiation and Newton's law of cooling. Every number and every curve
// is computed here from stated data.
import { sl, deck, table, svgV, plot, flow, r, dec, sig } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { CW, CICE, CSTEAM, LF, LV, ALPHA, C_METAL, DENSITY, R6, heatBetween, mixTemp, coolExact, seriesTwo } from './phys.mjs';
import * as G from './svgs.mjs';

const mn = (x) => String(x).replace('-', '−');

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { F: 113 };
ex1.C = ((ex1.F - 32) * 5) / 9;
ex1.K = ex1.C + 273.15;
ex1.minus40 = 32 / (1 - 1.8);
ex1.twice = 32 / (2 - 1.8); // F = 2C
ex1.twiceF = 2 * ex1.twice;

const ex2 = { L0: 60.0, T1: 10, T2: 42, a: ALPHA.steel };
ex2.dT = ex2.T2 - ex2.T1;
ex2.dL = ex2.a * ex2.L0 * ex2.dT; // m
ex2.dLmm = ex2.dL * 1000;
ex2.L = ex2.L0 + ex2.dL;

const ex3 = { d0: 5.0, T1: 20, T2: 220, a: ALPHA.aluminium };
ex3.dT = ex3.T2 - ex3.T1;
ex3.dd = ex3.a * ex3.d0 * ex3.dT;
ex3.d = ex3.d0 + ex3.dd;
ex3.A0 = (Math.PI * ex3.d0 ** 2) / 4;
ex3.frac = 2 * ex3.a * ex3.dT;
ex3.dA = ex3.frac * ex3.A0;
ex3.A = (Math.PI * ex3.d ** 2) / 4;

const ex4 = { m: 2.5, T1: 22, T2: 78, P: 1500 };
ex4.Q = ex4.m * CW * (ex4.T2 - ex4.T1);
ex4.t = ex4.Q / ex4.P;

const ex5 = { ms: 0.35, Ts: 98.0, mw: 0.5, Tw: 24.0, mc: 0.1, cc: C_METAL.aluminium, Tf: 29.5 };
ex5.Cw = ex5.mw * CW;
ex5.Cc = ex5.mc * ex5.cc;
ex5.gain = (ex5.Cw + ex5.Cc) * (ex5.Tf - ex5.Tw);
ex5.c = ex5.gain / (ex5.ms * (ex5.Ts - ex5.Tf));

const ex6 = { m: 0.25, T0: -20, T1: 120, P: 500 };
ex6.q1 = ex6.m * CICE * (0 - ex6.T0);
ex6.q2 = ex6.m * LF;
ex6.q3 = ex6.m * CW * 100;
ex6.q4 = ex6.m * LV;
ex6.q5 = ex6.m * CSTEAM * (ex6.T1 - 100);
ex6.q = ex6.q1 + ex6.q2 + ex6.q3 + ex6.q4 + ex6.q5;
ex6.t1 = ex6.q1 / ex6.P;
ex6.t2 = ex6.q2 / ex6.P;
ex6.t3 = ex6.q3 / ex6.P;
ex6.t4 = ex6.q4 / ex6.P;
ex6.t5 = ex6.q5 / ex6.P;
ex6.t = ex6.q / ex6.P;
ex6.knots = [[0, ex6.T0], [ex6.t1, 0], [ex6.t1 + ex6.t2, 0], [ex6.t1 + ex6.t2 + ex6.t3, 100], [ex6.t1 + ex6.t2 + ex6.t3 + ex6.t4, 100], [ex6.t, ex6.T1]];
ex6.qCheck = heatBetween(ex6.m, ex6.T0, ex6.T1);

const ex7 = { ms: 0.02, mw: 0.5, Tw: 15 };
ex7.T = (ex7.ms * LV + ex7.ms * CW * 100 + ex7.mw * CW * ex7.Tw) / (ex7.ms * CW + ex7.mw * CW);
ex7.Tnum = mixTemp([{ m: ex7.ms, T: 100.0000001 }, { m: ex7.mw, T: ex7.Tw }]).T;
ex7.lost = ex7.ms * LV + ex7.ms * CW * (100 - ex7.T);
ex7.gained = ex7.mw * CW * (ex7.T - ex7.Tw);

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const { Th: rTh, Tc: rTc, L: rL, A: rA, K: rK } = G.ROD_DATA;
const ex8 = { Th: rTh, Tc: rTc, L: rL, A: rA, K: rK };
ex8.dT = ex8.Th - ex8.Tc;
ex8.H = (ex8.K * ex8.A * ex8.dT) / ex8.L;
ex8.t = 600;
ex8.Q = ex8.H * ex8.t;
ex8.ice = ex8.Q / LF;

const sd = G.SLAB_DATA;
const ex9 = { Th: sd.Th, Tc: sd.Tc, K1: sd.brick.K, L1: sd.brick.L, K2: sd.ins.K, L2: sd.ins.L, A: sd.A };
ex9.R1 = ex9.L1 / ex9.K1;
ex9.R2 = ex9.L2 / ex9.K2;
ex9.q = (ex9.Th - ex9.Tc) / (ex9.R1 + ex9.R2);
ex9.H = ex9.q * ex9.A;
ex9.Ti = ex9.Th - ex9.q * ex9.R1;
ex9.d1 = ex9.q * ex9.R1;
ex9.d2 = ex9.q * ex9.R2;
ex9.num = seriesTwo({ K: ex9.K1, L: ex9.L1 }, { K: ex9.K2, L: ex9.L2 }, ex9.A, ex9.Th, ex9.Tc);

const ex10 = { T0: 24, T1: 80, t1: 5, T2: 62, Tt: 40 };
ex10.k = Math.log((ex10.T1 - ex10.T0) / (ex10.T2 - ex10.T0)) / ex10.t1;
ex10.tt = Math.log((ex10.T1 - ex10.T0) / (ex10.Tt - ex10.T0)) / ex10.k;
ex10.k6 = R6(ex10.k);

const ex11 = { T0: 26, Ta: 70, Tb: 62, Tc: 54, t1: 3.0 };
ex11.k = (ex11.Ta - ex11.Tb) / ex11.t1 / ((ex11.Ta + ex11.Tb) / 2 - ex11.T0);
ex11.t2 = (ex11.Tb - ex11.Tc) / (ex11.k * ((ex11.Tb + ex11.Tc) / 2 - ex11.T0));
ex11.kExact = Math.log((ex11.Ta - ex11.T0) / (ex11.Tb - ex11.T0)) / ex11.t1;
ex11.t2Exact = Math.log((ex11.Tb - ex11.T0) / (ex11.Tc - ex11.T0)) / ex11.kExact;

export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11 };
export const NUMCHECK = {
  ex10Num: coolExact(ex10.T1, ex10.T0, ex10.k, ex10.tt),
  ex6Num: ex6.qCheck,
};

// ---------------------------------------------------------------- visuals
export const V = {
  scales: svgV(G.SCALES, 'Celsius, Fahrenheit and Kelvin scales side by side with the ice point, the steam point and body temperature marked', 'The same temperature has three readings; the intervals are 100, 180 and 100 divisions.'),
  expan: svgV(G.EXPAN, 'Rods of steel, copper and aluminium heated by 100 kelvin lengthen by 1.2, 1.7 and 2.3 millimetres; extensions drawn 100 times too large', 'Same length, same temperature rise: a larger α gives a larger ΔL.'),
  bimetal: svgV(G.BIMETAL, 'A brass and steel strip is straight when cold and curls with the brass on the outside when heated', 'Brass expands more, so it ends up on the outside of the curve.'),
  pond: svgV(G.POND, 'A frozen pond: ice at 0 degrees Celsius on top, water layers at 0 to 4 degrees Celsius below with increasing density', 'The water at the bottom stays at 4 °C, where it is densest.'),
  rod: svgV(G.ROD, 'A lagged copper rod with ends at 100 and 28 degrees Celsius and the straight temperature profile along it', 'In steady state the temperature falls uniformly along the rod.'),
  slab: svgV(G.SLAB, 'Two slabs in series, brick and insulation, with the temperature profile and the interface temperature', 'The insulation takes almost all of the temperature drop.'),
  flask: svgV(G.FLASK, 'Cross-section of a vacuum flask showing the vacuum gap, silvered walls and cork parts', 'Vacuum stops conduction and convection; silvering reflects radiation.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotDensity = plot(
  {
    x: ax('temperature t (°C)', 0, 10),
    y: ax('density of water (kg m⁻³)', 999.6, 1000.05),
    series: [{ label: 'density of water at 1 atm (table values)', kind: 'line', points: DENSITY }],
    vlines: [{ x: 4, label: 'greatest density at about 4 °C', dashed: true }],
  },
  'Density of water against temperature from 0 to 10 degrees Celsius: it rises from 999.84 at 0 degrees to a maximum of 999.97 near 4 degrees and then falls again',
  'Between 0 °C and 4 °C water contracts when heated.',
);
export const plotHeat = plot(
  {
    x: ax('time t (s)', 0, 1600),
    y: ax('temperature T (°C)', -30, 130),
    series: [{ label: `${ex6.m} kg of ice at ${ex6.T0} °C heated at ${ex6.P} W`, kind: 'line', points: ex6.knots.map(([a, b]) => [sig(a, 6), b]) }],
    hlines: [{ y: 0, label: 'melting: 0 °C', dashed: true }, { y: 100, label: 'boiling: 100 °C', dashed: true }],
  },
  'Heating curve of 0.25 kilograms of ice at minus 20 degrees Celsius heated at 500 watts: a short slope to 0 degrees, a flat melting stage of 167 seconds, a slope to 100 degrees, a long flat boiling stage of 1130 seconds and a short slope to 120 degrees',
  'Flat parts are changes of state: heat goes into latent heat, not into temperature.',
);
const tea = { k: ex10.k6 };
export const plotCoolTea = plot(
  {
    x: ax('time t (min)', 0, 45),
    y: ax('temperature T (°C)', 0, 90),
    functions: [{ expr: `${ex10.T0} + ${ex10.T1 - ex10.T0}*exp(-${tea.k}*x)`, label: `T = ${ex10.T0} + ${ex10.T1 - ex10.T0} e^(−${dec(ex10.k, 3)} t)`, domain: [0, 45] }],
    hlines: [{ y: ex10.T0, label: `surroundings: ${ex10.T0} °C`, dashed: true }],
  },
  'Cooling curve of a cup of tea from 80 degrees Celsius in a room at 24 degrees Celsius: a falling curve that is steepest at the start and flattens towards 24 degrees',
  'Fast at first, then slower and slower: the curve never quite reaches room temperature.',
);
export const coolPair = { hot: { k: 0.1, T1: 80 }, foam: { k: 0.03, T1: 80 }, T0: 25 };
export const plotCool2 = plot(
  {
    x: ax('time t (min)', 0, 45),
    y: ax('temperature T (°C)', 0, 90),
    functions: [
      { expr: `${coolPair.T0} + ${coolPair.hot.T1 - coolPair.T0}*exp(-${coolPair.hot.k}*x)`, label: `bare metal mug, k = ${coolPair.hot.k} per min`, domain: [0, 45] },
      { expr: `${coolPair.T0} + ${coolPair.foam.T1 - coolPair.T0}*exp(-${coolPair.foam.k}*x)`, label: `foam-wrapped mug, k = ${coolPair.foam.k} per min`, domain: [0, 45] },
    ],
    hlines: [{ y: coolPair.T0, label: `room: ${coolPair.T0} °C`, dashed: true }],
  },
  'Two cooling curves for mugs of water starting at 80 degrees Celsius in a room at 25 degrees Celsius: the bare metal mug with a larger constant k falls quickly, the foam-wrapped mug falls slowly',
  'A larger k means faster cooling; both curves flatten towards the room temperature.',
);

// ---------------------------------------------------------------- tables and flow
const rows = (...a) => a;
const T_HT = table(
  ['', 'Temperature', 'Heat'],
  rows(
    ['What it is', 'How hot or cold a body is', 'Energy transferred because of a temperature difference'],
    ['Measured in', 'kelvin, °C, °F', 'joule (1 cal = 4.186 J)'],
    ['Instrument', 'Thermometer', 'Calorimeter'],
    ['Decides', 'Which way heat flows', 'How much energy is exchanged'],
  ),
  'Table comparing temperature and heat: meaning, units, instrument and role',
);
const fixedPts = [['Ice point', 0], ['Normal human body', 37], ['Steam point', 100], ['A very hot day in Delhi', ex1.C]];
const T_CONV = table(
  ['Situation', '°C', '°F', 'K'],
  fixedPts.map(([n, c]) => [n, dec(c, 3), dec(G.toF(c), 3), dec(G.toK(c), 5)]),
  'Table converting four temperatures between the Celsius, Fahrenheit and Kelvin scales',
);
const T_ALPHA = table(
  ['Material', 'α (10⁻⁵ K⁻¹)', 'ΔL for 1 m, 100 K (mm)'],
  Object.entries(ALPHA).map(([n, a]) => [n, dec(a * 1e5, 2), dec(a * 1 * 100 * 1000, 2)]),
  'Table of typical coefficients of linear expansion for steel, copper, aluminium and brass',
);
const T_EXP = table(
  ['Expansion', 'Formula', 'Coefficient', 'Relation'],
  rows(['Linear', 'ΔL = α L₀ ΔT', 'α', '—'], ['Area', 'ΔA = β A₀ ΔT', 'β', 'β = 2α'], ['Volume', 'ΔV = γ V₀ ΔT', 'γ', 'γ = 3α']),
  'Table of linear, area and volume expansion with their formulas and the relations between the coefficients',
);
const T_EX2 = table(
  ['Quantity', 'Value'],
  rows(['Original length', `${ex2.L0} m at ${ex2.T1} °C`], ['Temperature rise', `${ex2.dT} K`], ['α for steel', '1.2 × 10⁻⁵ K⁻¹'], ['Extension ΔL', `${dec(ex2.dLmm, 4)} mm`]),
  'Table of the data and result for a steel girder heated from 10 to 42 degrees Celsius',
);
const T_EX3 = table(
  ['Quantity', 'Before', 'After'],
  rows(['Hole diameter', `${ex3.d0} cm`, `${dec(ex3.d, 4)} cm`], ['Temperature', `${ex3.T1} °C`, `${ex3.T2} °C`], ['Fractional change of area', '—', `${dec(ex3.frac * 100, 3)} %`]),
  'Table showing a circular hole in an aluminium plate before and after heating',
);
const T_C = table(
  ['Substance', 'c (J kg⁻¹ K⁻¹)'],
  rows(['water', String(CW)], ['ice', String(CICE)], ['aluminium', String(C_METAL.aluminium)], ['iron', String(C_METAL.iron)], ['copper', String(C_METAL.copper)], ['lead', String(C_METAL.lead)]),
  'Table of typical specific heat capacities of water, ice and four metals',
);
const T_EX4 = table(
  ['Step', 'Result'],
  rows(['Mass and rise', `${ex4.m} kg, ${ex4.T2 - ex4.T1} K`], ['Heat needed', `${ex4.m} × ${CW} × ${ex4.T2 - ex4.T1} = ${ex4.Q} J`], ['Time at 1500 W', `${ex4.Q} ÷ ${ex4.P} = ${dec(ex4.t, 3)} s`]),
  'Table of the steps to find the heat and time to warm 2.5 kilograms of water in a bucket heater',
);
const F_CAL = flow(
  'LR',
  [['a', 'List every body and its m, c, initial T'], ['b', 'Unknown: final temperature or a c or a mass'], ['c', 'Heat lost by hotter = heat gained by cooler'], ['d', 'Write each heat as m c × (T difference)'], ['e', 'Solve; check T lies between the starting temperatures']],
  [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']],
  'Flow chart of the steps of a calorimetry problem from listing the bodies to checking the final temperature',
);
const T_L = table(
  ['Process', 'Name', 'Heat for 1 kg at the fixed temperature'],
  rows(['ice → water, 0 °C', 'fusion (melting)', `${sci1(LF)} J`], ['water → steam, 100 °C', 'vaporisation (boiling)', `${sci1(LV)} J`], ['solid → vapour', 'sublimation (camphor, naphthalene)', 'latent heat of sublimation']),
  'Table of the changes of state: melting, boiling and sublimation with the heat per kilogram for water',
);
function sci1(x) {
  const e = Math.floor(Math.log10(x));
  return `${dec(x / 10 ** e, 3)} × 10${[...String(e)].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)]).join('')}`;
}
const T_EX6 = table(
  ['Stage', 'Heat (J)', 'Time at 500 W (s)'],
  [
    ['ice −20 °C → 0 °C', ex6.q1, ex6.t1],
    ['melting at 0 °C', ex6.q2, ex6.t2],
    ['water 0 °C → 100 °C', ex6.q3, ex6.t3],
    ['boiling at 100 °C', ex6.q4, ex6.t4],
    ['steam 100 °C → 120 °C', ex6.q5, ex6.t5],
    ['whole process', ex6.q, ex6.t],
  ].map(([a, b, c]) => [a, String(Math.round(b)), dec(c, 4)]),
  'Table of the heat and time for each stage of heating 0.25 kilograms of ice at minus 20 degrees Celsius to steam at 120 degrees Celsius',
);
const T_EX7 = table(
  ['Heat lost by steam and condensed water', 'Heat gained by water'],
  rows([`${ex7.ms} × ${sci1(LV)} + ${ex7.ms} × ${CW} × (100 − T)`, `${ex7.mw} × ${CW} × (T − ${ex7.Tw})`], [`T ≈ ${dec(ex7.T, 4)} °C`, `heat exchanged ≈ ${dec(ex7.gained, 4)} J`]),
  'Table of the heat balance when 0.02 kilograms of steam is passed into 0.5 kilograms of water at 15 degrees Celsius',
);
const T_MODES = table(
  ['Mode', 'Needs a medium?', 'How energy moves', 'Example'],
  rows(
    ['Conduction', 'Yes (mainly solids)', 'Vibrating particles pass energy on; no bulk motion', 'Handle of a hot ladle'],
    ['Convection', 'Yes (fluids)', 'The heated fluid itself moves', 'Water heating in a pan'],
    ['Radiation', 'No', 'Electromagnetic waves', 'Sunlight; warmth of a bonfire'],
  ),
  'Table of the three modes of heat transfer: whether a medium is needed, how energy moves and an example',
);
const T_K = table(
  ['Material', 'K (W m⁻¹ K⁻¹)'],
  rows(['copper', '385'], ['aluminium', '205'], ['steel', '50'], ['glass', '0.8'], ['brick', '0.6'], ['insulating foam', '0.04'], ['air', '0.025']),
  'Table of typical thermal conductivities from copper down to air',
);
const T_CONV_EX = table(
  ['Type', 'Cause of the motion', 'Examples'],
  rows(['Natural convection', 'Hot fluid is less dense and rises; cooler fluid sinks', 'Water in a heated pan; land and sea breezes; a chimney draught'], ['Forced convection', 'A pump or fan drives the fluid', 'Car radiator and water pump; a fan-cooled computer; the blood circulation']),
  'Table of natural and forced convection with the cause of the fluid motion and examples',
);
const T_SURF = table(
  ['Surface', 'Absorbs radiation', 'Emits radiation (when hot)', 'Reflects'],
  rows(['Dull black', 'Most', 'Most', 'Least'], ['Dull white', 'Less', 'Less', 'More'], ['Shiny silver', 'Least', 'Least', 'Most']),
  'Table comparing how dull black, dull white and shiny silver surfaces absorb, emit and reflect thermal radiation',
);
const T_AVG = table(
  ['Quantity', 'Exact solution', 'Average-temperature form'],
  rows(['Law', 'dT/dt = −k (T − T₀)', '(T₁ − T₂)/t = k [(T₁ + T₂)/2 − T₀]'], ['Needs', 'integration', 'one division'], ['Good when', 'always (within the law)', 'T₁ − T₂ is small']),
  'Table comparing the exact exponential solution of Newton’s law of cooling with the average-temperature form',
);
const T_EX10 = table(
  ['Step', 'Result'],
  rows([`k from ${ex10.T1} → ${ex10.T2} °C in ${ex10.t1} min`, `ln(${ex10.T1 - ex10.T0}/${ex10.T2 - ex10.T0}) ÷ ${ex10.t1} = ${dec(ex10.k, 3)} per min`], [`Time to reach ${ex10.Tt} °C`, `ln(${ex10.T1 - ex10.T0}/${ex10.Tt - ex10.T0}) ÷ k = ${dec(ex10.tt, 3)} min`]),
  'Table of the steps to find the cooling constant of a cup of tea and the time it takes to reach 40 degrees Celsius',
);
const T_EX11 = table(
  ['Step', 'Result'],
  rows([`k from ${ex11.Ta} → ${ex11.Tb} °C in ${ex11.t1} min`, `${dec(ex11.k, 3)} per min`], [`Time for ${ex11.Tb} → ${ex11.Tc} °C`, `${dec(ex11.t2, 3)} min`], ['Exact exponential answer', `${dec(ex11.t2Exact, 3)} min`]),
  'Table of the average-temperature solution of a cooling problem and the exact exponential value',
);
export const TABLES = { T_HT, T_CONV, T_ALPHA, T_EXP, T_EX2, T_EX3, T_C, T_EX4, F_CAL, T_L, T_EX6, T_EX7, T_MODES, T_K, T_CONV_EX, T_SURF, T_AVG, T_EX10, T_EX11 };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Thermal Properties of Matter — Part 1: Temperature, expansion, specific heat and change of state',
  goals: [
    'Convert between temperature scales and calculate linear, area and volume expansion, including the anomalous expansion of water',
    'Use specific heat capacity and the principle of calorimetry to find final temperatures, specific heats and masses',
    'Calculate the heat for melting, boiling and a full heating curve, and for mixtures that include a change of state',
  ],
  slides: [
    sl('title', 'Thermal Properties of Matter', {
      b: 'Part 1 — how hot is it, how much does it expand, and how much heat does it take to warm a body or change its state?',
      v: V.scales,
      n: 'A steel girder that grows a little on a hot day, a kettle that takes minutes to boil and far longer to boil dry, a pond that freezes only at the top: all of these come from the thermal properties of matter. In this part we measure temperature, study expansion, and count the heat needed to warm things and to melt or boil them.',
    }),
    sl('concept', 'Heat and temperature', {
      b: 'Two different ideas that are often mixed up.',
      ul: [
        '**Temperature** tells how hot or cold a body is; it decides the direction in which heat will flow.',
        '**Heat** is energy that passes between bodies because of a temperature difference; its SI unit is the joule, and 1 cal = 4.186 J.',
        'Heat flows from the body at the higher temperature to the one at the lower temperature until both reach the same temperature.',
        'A body does not “contain heat”: it has internal energy, and heat is energy in transit.',
      ],
      v: T_HT,
      n: 'Temperature measures how hot a body is. Heat is the energy that moves from one body to another because their temperatures differ, and it is measured in joules. Heat always flows from the hotter body to the cooler one until the temperatures are equal. A body does not hold heat the way a bucket holds water; it has internal energy, and heat is that energy on the move.',
    }),
    sl('diagram', 'Temperature scales', {
      b: 'Fixed points: the ice point and the steam point of water at one atmosphere.',
      m: [r`\dfrac{t_C}{100} = \dfrac{t_F - 32}{180} = \dfrac{T - 273.15}{100}`, r`T = t_C + 273.15`],
      ul: [
        'Celsius: ice point 0 °C, steam point 100 °C. Fahrenheit: 32 °F and 212 °F. Kelvin: 273.15 K and 373.15 K.',
        'A change of 1 K equals a change of 1 °C and of 1.8 °F, because 100 divisions on one scale span the same interval as 180 on the other.',
        'Absolute zero, 0 K = −273.15 °C, is the lowest temperature that can be approached; the kelvin scale has no negative values.',
      ],
      v: V.scales,
      n: 'The three scales are laid side by side. The ice point and the steam point line up. Between them Celsius has one hundred divisions, Fahrenheit has one hundred and eighty, and Kelvin has one hundred. So a change of one kelvin equals a change of one degree Celsius and one point eight degrees Fahrenheit. The kelvin scale starts at absolute zero and has no negative values.',
    }),
    sl('example', 'Worked example 1: converting temperatures', {
      b: r`A weather bulletin for Delhi gives a maximum of $${ex1.F}\ ^\circ\text{F}$. (a) Find the temperature in °C and in K. (b) At what temperature does the Fahrenheit reading equal twice the Celsius reading?`,
      ul: [
        r`$t_C = \dfrac{5}{9}(t_F - 32) = \dfrac{5}{9}(${ex1.F} - 32) = ${ex1.C}$ °C.`,
        r`$T = t_C + 273.15 = ${ex1.C} + 273.15 = ${dec(ex1.K, 5)}$ K.`,
        r`(b) Put $t_F = 2t_C$ in $t_F = 1.8\,t_C + 32$: $2t_C - 1.8\,t_C = 32$, so $t_C = ${ex1.twice}$ °C and $t_F = ${ex1.twiceF}$ °F.`,
      ],
      v: T_CONV,
      n: 'Subtract thirty two from the Fahrenheit reading and multiply by five ninths. One hundred and thirteen degrees Fahrenheit is forty five degrees Celsius, which is three hundred and eighteen point one five kelvin. For the second part, set the Fahrenheit reading equal to twice the Celsius reading in the conversion formula. That gives a Celsius temperature of one hundred and sixty degrees, and three hundred and twenty degrees Fahrenheit.',
    }),
    sl('check', 'Quick check: a new scale', {
      b: 'Choose the correct value.',
      v: T_CONV,
      chk: 'xscale-num',
      n: 'Fit a straight line between the two fixed points of the new scale.',
    }),
    sl('concept', 'Thermal expansion: linear expansion', {
      b: 'Almost every solid gets longer when heated. For a small rise of temperature ΔT:',
      m: [r`\Delta L = \alpha\, L_0\, \Delta T`, r`\alpha = \dfrac{1}{L_0}\dfrac{\Delta L}{\Delta T}`],
      ul: [
        'α is the **coefficient of linear expansion**: the fractional change in length per kelvin. Its unit is K⁻¹ (or °C⁻¹).',
        'Reason: when heated, the atoms vibrate with larger amplitude about their mean positions and, because the interatomic force is not symmetric, the average spacing increases.',
        'α depends on the material; for a given rise, the metal with the larger α lengthens more.',
        r`New length $L = L_0(1 + \alpha\,\Delta T)$.`,
      ],
      v: V.expan,
      n: 'When a rod is heated, its length increases by an amount proportional to the original length and to the temperature rise. The constant of proportionality is the coefficient of linear expansion, alpha. It is the fractional change in length for one kelvin, and its unit is per kelvin. The atoms vibrate more and, because the forces between them are not symmetric, they settle slightly further apart. Aluminium has a larger alpha than steel, so it grows more.',
    }),
    sl('concept', 'Area and volume expansion', {
      b: 'Every linear dimension of a heated solid grows by the same fraction, so areas and volumes grow too.',
      m: [r`\Delta A = \beta A_0 \Delta T,\quad \beta = 2\alpha`, r`\Delta V = \gamma V_0 \Delta T,\quad \gamma = 3\alpha`],
      ul: [
        r`For a square plate $A = L^2 \to L_0^2(1 + \alpha\Delta T)^2 \approx A_0(1 + 2\alpha\Delta T)$, because $\alpha\Delta T \ll 1$; likewise $V = L^3$ gives $\gamma = 3\alpha$.`,
        'A hole in a plate expands exactly as a disc of the same material would: the plate stretches around it.',
        'Liquids have only a volume expansion coefficient γ; for mercury it is about 1.8 × 10⁻⁴ K⁻¹, much larger than for solids.',
      ],
      v: T_EXP,
      n: 'If every length grows by the same fraction, then areas grow by about twice that fraction and volumes by about three times it. So the coefficient of area expansion is two alpha and the coefficient of volume expansion is three alpha. This works because alpha times the temperature rise is tiny, so squared and cubed terms can be dropped. A hole in a plate grows exactly as a disc of the same material would.',
    }),
    sl('example', 'Worked example 2: a steel girder', {
      b: r`A steel girder of a bridge is $${ex2.L0}$ m long at $${ex2.T1}\ ^\circ\text{C}$. By how much does it lengthen when the temperature rises to $${ex2.T2}\ ^\circ\text{C}$? ($\alpha = 1.2 \times 10^{-5}\ \text{K}^{-1}$)`,
      ul: [
        r`$\Delta T = ${ex2.T2} - ${ex2.T1} = ${ex2.dT}$ K.`,
        r`$\Delta L = \alpha L_0 \Delta T = (1.2 \times 10^{-5})(${ex2.L0})(${ex2.dT}) = ${dec(ex2.dL, 4)}$ m $= ${dec(ex2.dLmm, 4)}$ mm.`,
        r`The girder becomes $${dec(ex2.L, 7)}$ m long; this is why bridges have expansion gaps and roller supports.`,
      ],
      v: T_EX2,
      n: 'The temperature rise is thirty two kelvin. Multiply alpha, the length and the rise: one point two times ten to the minus five, times sixty, times thirty two. The girder lengthens by about twenty three millimetres. That is small compared with sixty metres, but enough to buckle a bridge if the ends are fixed rigidly, so engineers leave gaps and use rollers.',
    }),
    sl('example', 'Worked example 3: a hole in an aluminium plate', {
      b: r`An aluminium plate has a circular hole of diameter $${ex3.d0}$ cm at $${ex3.T1}\ ^\circ\text{C}$. It is heated to $${ex3.T2}\ ^\circ\text{C}$. Find the new diameter and the fractional change of the hole’s area. ($\alpha = 2.3 \times 10^{-5}\ \text{K}^{-1}$)`,
      ul: [
        r`$\Delta T = ${ex3.dT}$ K; $\Delta d = \alpha d_0 \Delta T = (2.3 \times 10^{-5})(${ex3.d0})(${ex3.dT}) = ${dec(ex3.dd, 3)}$ cm.`,
        r`New diameter $= ${ex3.d0} + ${dec(ex3.dd, 3)} = ${dec(ex3.d, 4)}$ cm: the hole gets bigger.`,
        r`$\dfrac{\Delta A}{A_0} = 2\alpha\Delta T = 2(2.3 \times 10^{-5})(${ex3.dT}) = ${dec(ex3.frac, 3)}$, that is ${dec(ex3.frac * 100, 3)} %; $\Delta A \approx ${dec(ex3.dA, 3)}$ cm$^2$.`,
      ],
      v: T_EX3,
      n: 'The diameter of the hole behaves like any other length on the plate. It grows by twenty three thousandths of a centimetre, to five point zero two three centimetres. The area grows by twice alpha times the rise, which is a little under one percent. So heating a plate makes the hole bigger, not smaller.',
    }),
    sl('concept', 'Using expansion', {
      b: 'Differences in α are used, and allowed for, in many devices.',
      ul: [
        '**Bimetallic strip:** two metals bonded together; on heating, the metal with the larger α (brass, with steel) lies on the outside of the curve, so the strip bends. Used in thermostats and fire alarms.',
        '**Gaps and rollers:** railway tracks, bridges and long pipes are given room to expand.',
        '**Shrink fitting:** an iron tyre made slightly smaller than the wheel is heated, slipped on and allowed to cool and grip tightly.',
        '**Thermometers:** a liquid such as mercury expands much more than its glass tube, so it rises in the stem.',
      ],
      v: V.bimetal,
      n: 'A bimetallic strip joins two metals that expand by different amounts. When heated, the one with the larger coefficient becomes longer, so it ends up on the outside of the curve and the strip bends. Thermostats use this to switch a heater off. Engineers also leave gaps in rails and bridges, fit iron tyres onto wheels by heating them, and rely on mercury expanding more than glass in a thermometer.',
    }),
    sl('concept', 'Anomalous expansion of water', {
      b: 'Most liquids contract steadily as they cool. Water does not.',
      ul: [
        'From 0 °C to about 4 °C, water **contracts** when heated: its density rises.',
        'Water has its **greatest density, about 4 °C**; above that it expands like other liquids.',
        'The graph is built from table values of the density of water at one atmosphere.',
        'Ice at 0 °C is less dense than water, so ice floats.',
      ],
      v: plotDensity,
      n: 'Between zero and about four degrees Celsius, heating water makes it shrink, so its density rises. The density is greatest at about four degrees Celsius, then falls again as water expands normally. This is called the anomalous expansion of water. It makes ice float, and it has an important effect on lakes and ponds.',
    }),
    sl('diagram', 'Life under the ice', {
      b: 'In winter, a pond cools from the top.',
      ul: [
        'Surface water cooled towards 4 °C becomes denser and sinks, and warmer water rises: the whole pond cools to 4 °C.',
        'Below 4 °C the cooler water is **less** dense, so it stays on top and finally freezes at 0 °C.',
        'Ice floats and, being a poor conductor, insulates the water below; the bottom stays near 4 °C and fish survive.',
      ],
      v: V.pond,
      n: 'Think of a pond in a cold region. As the surface cools to four degrees, that water is denser than the water below and sinks. Once the whole pond is at four degrees, further cooling makes the surface water lighter, so it stays on top and freezes. The ice layer is a poor conductor, so the water underneath stays near four degrees and fish and plants survive the winter.',
    }),
    sl('check', 'Quick check: the frozen pond', {
      b: 'Choose the correct option.',
      v: V.pond,
      chk: 'pondtop-mcq',
      n: 'Remember where the densest water collects.',
    }),
    sl('concept', 'Specific heat capacity', {
      b: 'The heat needed to change the temperature of a body of mass m by ΔT, with no change of state:',
      m: [r`Q = m\,c\,\Delta T`, r`C = m\,c\quad(\text{heat capacity, J K}^{-1})`],
      ul: [
        '**Specific heat capacity** c: the heat needed to raise the temperature of 1 kg of the substance by 1 K. Unit: J kg⁻¹ K⁻¹.',
        'Water has an unusually large c (4200 J kg⁻¹ K⁻¹ here), so it warms and cools slowly: it is a good coolant and a good store of heat.',
        'ΔT is final minus initial; Q is positive when the body warms (heat absorbed) and negative when it cools (heat given out).',
      ],
      v: T_C,
      n: 'The heat needed to warm a body is its mass times its specific heat times the temperature rise. Specific heat capacity is the heat for one kilogram and one kelvin, in joules per kilogram per kelvin. Water has a very large value, so it takes a lot of heat to warm it and gives out a lot when it cools. That makes water an excellent coolant. Heat capacity is mass times specific heat, in joules per kelvin.',
    }),
    sl('example', 'Worked example 4: a bucket heater', {
      b: r`A bucket heater of power $${ex4.P}$ W warms $${ex4.m}$ kg of water from $${ex4.T1}\ ^\circ\text{C}$ to $${ex4.T2}\ ^\circ\text{C}$. Taking $c = ${CW}$ J kg$^{-1}$ K$^{-1}$ and no heat loss, find the heat needed and the time taken.`,
      ul: [
        r`$Q = mc\Delta T = ${ex4.m} \times ${CW} \times ${ex4.T2 - ex4.T1} = ${ex4.Q}$ J.`,
        r`$t = \dfrac{Q}{P} = \dfrac{${ex4.Q}}{${ex4.P}} = ${dec(ex4.t, 3)}$ s, about ${dec(ex4.t / 60, 3)} min.`,
      ],
      v: T_EX4,
      n: 'First the heat: two and a half kilograms times four thousand two hundred times a rise of fifty six kelvin is five hundred and eighty eight thousand joules. A heater of fifteen hundred watts supplies fifteen hundred joules every second, so the time is about three hundred and ninety two seconds, which is about six and a half minutes.',
    }),
    sl('concept', 'Calorimetry and the method of mixtures', {
      b: 'Calorimetry measures heat exchanged. In an insulated vessel, nothing is lost to the surroundings, so energy is conserved:',
      m: [r`\text{heat lost by hotter bodies} = \text{heat gained by cooler bodies}`],
      ul: [
        'Write each heat as m c × (difference of temperatures), the larger temperature minus the smaller for the hot body and the reverse for the cold body, so every term is positive.',
        'The vessel itself (the calorimeter) and the stirrer also gain heat: include their heat capacity m c if it is given.',
        'The final temperature must lie between the starting temperatures of the hottest and coolest bodies.',
      ],
      v: F_CAL,
      n: 'In a calorimetry problem the bodies exchange heat only with each other. So the heat lost by the hotter bodies equals the heat gained by the cooler ones. Write each heat as mass times specific heat times a positive temperature difference. Do not forget the vessel that holds the water: it warms up too. And always check that the final temperature lies between the starting temperatures.',
    }),
    sl('example', 'Worked example 5: specific heat of a metal', {
      b: r`A $${ex5.ms}$ kg metal sample at $${ex5.Ts}\ ^\circ\text{C}$ is dropped into $${ex5.mw}$ kg of water at $${ex5.Tw}\ ^\circ\text{C}$ held in an aluminium calorimeter of mass $${ex5.mc}$ kg ($c = ${ex5.cc}$ J kg$^{-1}$ K$^{-1}$). The final temperature is $${ex5.Tf}\ ^\circ\text{C}$. Find the specific heat of the metal ($c_\text{water} = ${CW}$).`,
      ul: [
        r`Heat gained $= (m_w c_w + m_c c_c)(T_f - T_w) = (${ex5.mw} \times ${CW} + ${ex5.mc} \times ${ex5.cc})(${ex5.Tf - ex5.Tw}) = ${ex5.Cw + ex5.Cc} \times ${ex5.Tf - ex5.Tw} = ${ex5.gain}$ J.`,
        r`Heat lost $= m_s c\,(T_s - T_f) = ${ex5.ms} \times c \times ${dec(ex5.Ts - ex5.Tf, 3)}$.`,
        r`Equating: $c = \dfrac{${ex5.gain}}{${ex5.ms} \times ${dec(ex5.Ts - ex5.Tf, 3)}} \approx ${dec(ex5.c, 4)}$ J kg$^{-1}$ K$^{-1}$.`,
      ],
      v: T_C,
      n: 'The water and the calorimeter together gain heat as they warm from twenty four to twenty nine point five degrees. Their combined heat capacity is twenty one hundred plus ninety joules per kelvin, so they gain twelve thousand and forty five joules. The metal loses the same amount while cooling by sixty eight point five degrees. Dividing gives a specific heat of about five hundred joules per kilogram per kelvin.',
    }),
    sl('concept', 'Change of state and latent heat', {
      b: 'During melting or boiling the temperature stays constant while heat is absorbed:',
      m: [r`Q = m\,L`, r`L_f = 3.34 \times 10^{5}\ \text{J kg}^{-1}\ (\text{ice}),\quad L_v = 2.26 \times 10^{6}\ \text{J kg}^{-1}\ (\text{water})`],
      ul: [
        '**Latent heat** L: the heat absorbed (or released) per kilogram during a change of state at constant temperature. It changes the arrangement of the particles, not their average kinetic energy.',
        'Fusion (melting) and vaporisation (boiling) absorb heat; freezing and condensation release the same amount.',
        '**Sublimation:** a solid changes directly to vapour (camphor, naphthalene, dry ice at normal pressure).',
        'Melting and boiling points depend on pressure: the boiling point rises when the pressure is raised, which is why a pressure cooker cooks faster.',
      ],
      v: T_L,
      n: 'During melting or boiling, the temperature does not change even though heat keeps flowing in. The heat per kilogram is the latent heat. For ice it is three point three four times ten to the five joules per kilogram, and for boiling water it is two point two six times ten to the six. Condensing steam gives back the same heat. Some solids, like camphor, change directly to vapour, which is called sublimation. Raising the pressure raises the boiling point, which is how a pressure cooker works.',
    }),
    sl('example', 'Worked example 6: from ice to steam', {
      b: r`A heater of $${ex6.P}$ W warms $${ex6.m}$ kg of ice from $${ex6.T0}\ ^\circ\text{C}$ until it is steam at $${ex6.T1}\ ^\circ\text{C}$, with no loss. Use $c_\text{ice} = ${CICE}$, $c_\text{water} = ${CW}$, $c_\text{steam} = ${CSTEAM}$ J kg$^{-1}$ K$^{-1}$, $L_f = 3.34 \times 10^5$ and $L_v = 2.26 \times 10^6$ J kg$^{-1}$. Find the heat for each stage and the time.`,
      ul: [
        r`Ice to 0 °C: $${ex6.m} \times ${CICE} \times ${-ex6.T0} = ${ex6.q1}$ J (${dec(ex6.t1, 3)} s). Melting: $${ex6.m} \times ${LF} = ${ex6.q2}$ J (${dec(ex6.t2, 4)} s).`,
        r`Water to 100 °C: $${ex6.m} \times ${CW} \times 100 = ${ex6.q3}$ J (${dec(ex6.t3, 4)} s). Boiling: $${ex6.m} \times ${LV} = ${ex6.q4}$ J (${dec(ex6.t4, 4)} s). Steam to 120 °C: $${ex6.m} \times ${CSTEAM} \times 20 = ${ex6.q5}$ J (${dec(ex6.t5, 3)} s).`,
        r`Total $Q = ${ex6.q}$ J, so $t = \dfrac{${ex6.q}}{${ex6.P}} = ${dec(ex6.t, 4)}$ s. Boiling alone takes ${dec((ex6.t4 / ex6.t) * 100, 3)} % of the time.`,
      ],
      v: plotHeat,
      n: 'The curve has five stages. Warming the ice takes only twenty one seconds. Melting it takes one hundred and sixty seven seconds with the temperature stuck at zero. Warming the water takes two hundred and ten seconds. Boiling takes eleven hundred and thirty seconds, by far the longest, because the latent heat of vaporisation is so large. Warming the steam takes twenty seconds. The whole process needs about fifteen hundred seconds.',
    }),
    sl('example', 'Worked example 7: steam into water', {
      b: r`Steam at $100\ ^\circ\text{C}$ of mass $${ex7.ms}$ kg is passed into $${ex7.mw}$ kg of water at $${ex7.Tw}\ ^\circ\text{C}$ in an insulated vessel (vessel’s heat capacity ignored). Find the final temperature.`,
      ul: [
        r`Heat lost by steam: $m_s L_v + m_s c_w(100 - T) = ${ex7.ms} \times ${LV} + ${ex7.ms} \times ${CW}(100 - T)$.`,
        r`Heat gained by water: $m_w c_w (T - ${ex7.Tw}) = ${ex7.mw} \times ${CW}(T - ${ex7.Tw})$.`,
        r`Equating and solving: $T = \dfrac{${ex7.ms * LV + ex7.ms * CW * 100 + ex7.mw * CW * ex7.Tw}}{${ex7.ms * CW + ex7.mw * CW}} \approx ${dec(ex7.T, 4)}$ °C.`,
      ],
      v: T_EX7,
      n: 'The steam does two jobs as it gives up heat: it condenses, releasing latent heat, and then the condensed water cools from one hundred degrees to the final temperature. All of that heat warms the half kilogram of water. Solving the balance gives a final temperature of about thirty nine degrees Celsius, even though only twenty grams of steam were used.',
    }),
    sl('check', 'Quick check: how much steam', {
      b: 'Compute the required mass.',
      v: T_L,
      chk: 'condense-num',
      n: 'Count the latent heat as well as the cooling of the condensed water.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        rows(
          ['Scales', 'T = t_C + 273.15; t_F = 1.8 t_C + 32'],
          ['Expansion', 'ΔL = αL₀ΔT; β = 2α; γ = 3α'],
          ['Water', 'Densest at about 4 °C; ice floats'],
          ['Specific heat', 'Q = m c ΔT; heat capacity = m c'],
          ['Calorimetry', 'Heat lost = heat gained (insulated)'],
          ['Latent heat', 'Q = m L at constant temperature'],
        ),
        'Summary table of temperature scales, expansion, water, specific heat, calorimetry and latent heat',
      ),
      n: 'To sum up. Kelvin temperature is Celsius plus two hundred and seventy three point one five. Heated solids expand by alpha times length times rise, with the area coefficient twice and the volume coefficient three times alpha. Water is densest at about four degrees. Heat for a temperature change is mass times specific heat times the rise, and for a change of state it is mass times latent heat. In an insulated vessel, heat lost equals heat gained.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Convert temperatures to the same scale before using a formula; a temperature difference in °C equals the same difference in K.',
        'For expansion say “for a small rise of temperature” and keep α in K⁻¹ with the same unit of length on both sides.',
        'In mixture problems write heat lost = heat gained, make every term positive, then check the final temperature lies between the starting ones.',
        'Do not forget latent heat: a plateau on a heating curve needs m L, not m c ΔT.',
      ],
      v: T_ALPHA,
      n: 'Convert all temperatures to one scale first; a temperature difference is the same in kelvin and in degrees Celsius. For expansion state that the rise is small. In mixture problems write heat lost equals heat gained, keep every term positive and check that the answer lies between the starting temperatures. And never forget latent heat when a change of state is involved.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Thermal Properties of Matter — Part 2: Heat transfer and Newton’s law of cooling',
  goals: [
    'Distinguish conduction, convection and radiation, and apply the thermal conductivity formula to single and composite slabs',
    'Explain everyday and engineering examples of the three modes of heat transfer, including the vacuum flask',
    'State and apply Newton’s law of cooling, with the exponential solution and the average-temperature form',
  ],
  slides: [
    sl('title', 'Heat transfer and cooling', {
      b: 'Part 2 — how heat travels, how well walls keep it out, and how a hot cup of tea cools.',
      v: V.slab,
      n: 'Why does the handle of a steel ladle get hot while a wooden spoon stays cool? Why is a cold storage wall made of layers? And how long will tea stay drinkable on a stall counter? In this part we study the three ways heat travels, put numbers on conduction through walls, and meet Newton’s law of cooling.',
    }),
    sl('concept', 'Three modes of heat transfer', {
      b: 'Heat travels from hot to cold in three ways, often together.',
      ul: [
        '**Conduction:** energy passes from particle to particle without the material moving.',
        '**Convection:** the heated fluid itself moves and carries energy with it.',
        '**Radiation:** energy travels as electromagnetic waves and needs no medium.',
      ],
      v: T_MODES,
      n: 'Conduction passes energy along from particle to particle with no overall movement of the material, mainly in solids. Convection carries energy because the hot fluid itself moves. Radiation travels as electromagnetic waves and needs no medium at all, which is how the Sun warms the Earth across empty space. In real situations more than one mode often acts at once.',
    }),
    sl('concept', 'Conduction and thermal conductivity', {
      b: 'In steady state, the heat current through a slab or lagged rod of length L and cross-section A, with end temperatures T₁ > T₂:',
      m: [r`H = \dfrac{Q}{t} = \dfrac{K A (T_1 - T_2)}{L}`, r`R = \dfrac{L}{K A}\quad\Rightarrow\quad H = \dfrac{T_1 - T_2}{R}`],
      ul: [
        '**Thermal conductivity** K: a property of the material; SI unit W m⁻¹ K⁻¹. Metals have large K; air, wool and foam have very small K.',
        '**Steady state:** the temperature at each point no longer changes; H is the same along the rod, and T falls uniformly (gradient (T₁ − T₂)/L).',
        'H increases with A and with the temperature difference, and falls as L increases.',
      ],
      v: V.rod,
      n: 'Heat current is the heat flowing per second. In steady state it equals the thermal conductivity times the area times the temperature difference, divided by the length. The conductivity is large for metals and tiny for air, wool and foam. In steady state the temperature falls along a straight line, as the diagram shows. The ratio of length to conductivity times area behaves like a resistance to the flow of heat.',
    }),
    sl('example', 'Worked example 8: a copper rod', {
      b: r`A lagged copper rod of length $${ex8.L}$ m and cross-section $4.0$ cm$^2$ has its ends at $${ex8.Th}\ ^\circ\text{C}$ and $${ex8.Tc}\ ^\circ\text{C}$. With $K = ${ex8.K}$ W m$^{-1}$ K$^{-1}$, find the heat current in steady state and the mass of ice at 0 °C that the heat flowing in 10 min would melt.`,
      ul: [
        r`$A = 4.0\ \text{cm}^2 = ${ex8.A}\ \text{m}^2$ and $T_1 - T_2 = ${ex8.dT}$ K.`,
        r`$H = \dfrac{KA(T_1 - T_2)}{L} = \dfrac{${ex8.K} \times ${ex8.A} \times ${ex8.dT}}{${ex8.L}} = ${dec(ex8.H, 4)}$ W.`,
        r`In $${ex8.t}$ s: $Q = Ht = ${dec(ex8.Q, 4)}$ J, which melts $m = \dfrac{Q}{L_f} = \dfrac{${dec(ex8.Q, 4)}}{${LF}} \approx ${dec(ex8.ice, 3)}$ kg (about ${dec(ex8.ice * 1000, 3)} g) of ice.`,
      ],
      v: T_K,
      n: 'Convert the area to square metres: four square centimetres is four times ten to the minus four. The heat current is the conductivity of three hundred and eighty five times that area times a difference of seventy two kelvin, divided by point eight metres. That comes to about fourteen watts. In ten minutes about eight thousand three hundred joules flow, enough to melt about twenty five grams of ice.',
    }),
    sl('concept', 'Slabs in series', {
      b: 'Two slabs of the same area A, in contact, with outer faces at T₁ and T₂. In steady state the same H flows through both:',
      m: [r`H = \dfrac{A\,(T_1 - T_2)}{L_1/K_1 + L_2/K_2}`, r`T_i = \dfrac{K_1 T_1 / L_1 + K_2 T_2 / L_2}{K_1 / L_1 + K_2 / L_2}`],
      ul: [
        'Set the two heat currents equal: K₁A(T₁ − T_i)/L₁ = K₂A(T_i − T₂)/L₂, and solve for the interface temperature T_i.',
        'The resistances add: R = R₁ + R₂; the temperature drop across each slab is proportional to its L/K.',
        'The layer with the smallest K/L (the best insulator) takes most of the temperature drop.',
      ],
      v: V.slab,
      n: 'When two slabs are stacked, the heat that goes through one must go through the other, so the heat current is the same. Equate the two expressions and solve for the temperature at the interface. The thermal resistances add up, and the temperature drop across each slab is proportional to its resistance. So the good insulator takes almost all of the drop, as the graph shows.',
    }),
    sl('example', 'Worked example 9: a cold-storage wall', {
      b: r`A wall of a cold store, area $${ex9.A}$ m$^2$, has a $${ex9.L1 * 100}$ cm brick layer ($K = ${ex9.K1}$) on the outside at $${ex9.Th}\ ^\circ\text{C}$ and a $${ex9.L2 * 100}$ cm insulation layer ($K = ${ex9.K2}$) inside at $${ex9.Tc}\ ^\circ\text{C}$ (K in W m$^{-1}$ K$^{-1}$). Find the heat current and the temperature of the interface.`,
      ul: [
        r`$\dfrac{L_1}{K_1} = \dfrac{${ex9.L1}}{${ex9.K1}} = ${dec(ex9.R1, 4)}$ and $\dfrac{L_2}{K_2} = \dfrac{${ex9.L2}}{${ex9.K2}} = ${ex9.R2}$ (m$^2$ K W$^{-1}$).`,
        r`$H = \dfrac{A(T_1 - T_2)}{L_1/K_1 + L_2/K_2} = \dfrac{${ex9.A} \times ${ex9.Th - ex9.Tc}}{${dec(ex9.R1 + ex9.R2, 5)}} = ${dec(ex9.H, 4)}$ W.`,
        r`Drop across the brick $= \dfrac{H}{A}\dfrac{L_1}{K_1} = ${dec(ex9.d1, 3)}$ K, so $T_i = ${ex9.Th} - ${dec(ex9.d1, 3)} = ${dec(ex9.Ti, 4)}$ °C; the insulation takes ${dec(ex9.d2, 4)} K.`,
      ],
      v: V.slab,
      n: 'The resistance per square metre of the brick is point one six seven and of the insulation is one. Their sum is about one point one six seven. Dividing the area times the thirty kelvin difference by this gives about three hundred and nine watts. The brick drops the temperature by only four point three kelvin, so the interface is at about thirty point seven degrees; the thin insulation does the real work.',
    }),
    sl('concept', 'Convection', {
      b: 'Heat is carried by the bulk motion of a fluid (liquid or gas).',
      ul: [
        '**Natural convection:** heated fluid expands, becomes less dense and rises while cooler, denser fluid sinks, setting up a convection current.',
        'That is why heaters are placed near the bottom of a tank of water, and why smoke rises up a chimney.',
        'Large-scale examples: land and sea breezes, monsoon winds and the circulation of the oceans.',
        '**Forced convection:** a pump or fan drives the fluid: a car’s cooling system, a fan on a processor.',
        'Convection cannot occur in solids, or in a vacuum.',
      ],
      v: T_CONV_EX,
      n: 'In natural convection a heated fluid expands, becomes less dense and rises, while cooler fluid sinks to take its place. That sets up a circulation, which is why a heater belongs at the bottom of a water tank. On a huge scale it drives breezes between land and sea, the monsoon winds and ocean currents. In forced convection a pump or a fan does the pushing. Solids and vacuum cannot have convection.',
    }),
    sl('concept', 'Thermal radiation', {
      b: 'Every body emits electromagnetic radiation because of its temperature; hotter bodies emit more.',
      ul: [
        'Radiation travels through vacuum at the speed of light; no medium is needed. Sunlight reaches the Earth this way.',
        'Surfaces differ: **dull black** surfaces are the best absorbers and also the best emitters; **shiny** surfaces reflect most and absorb and emit least.',
        'An ideal surface that absorbs all radiation falling on it is called a **black body**; it is also the best possible emitter.',
        'This is why we wear light clothes in summer, and why a black-painted tea kettle cools faster than a shiny one when hot.',
      ],
      v: T_SURF,
      n: 'All bodies radiate electromagnetic waves, and the hotter a body is, the more it radiates. The waves need no medium, so they cross empty space. Dull black surfaces are the best absorbers and also the best emitters. Shiny surfaces reflect most of the radiation falling on them, so they absorb and emit very little. An ideal surface that absorbs everything is called a black body.',
    }),
    sl('diagram', 'The vacuum flask', {
      b: 'A vacuum flask keeps a drink hot or cold by blocking all three modes.',
      ul: [
        'Double glass walls with a **vacuum** between them stop conduction and convection across the gap.',
        'The facing surfaces are **silvered**, so radiation is reflected back (and emits very little).',
        'The **cork** stopper and support are poor conductors, so little heat leaks through the neck and base.',
      ],
      v: V.flask,
      n: 'A vacuum flask attacks all three routes of heat loss. The vacuum between the double walls stops conduction and convection across the gap. The silvered surfaces reflect radiation back to where it came from. And the cork stopper and support, which are poor conductors, reduce the leakage at the neck and base. The same design keeps cold drinks cold.',
    }),
    sl('check', 'Quick check: conduction', {
      b: 'Choose the correct option.',
      v: T_K,
      chk: 'scalerod-mcq',
      n: 'Think how the heat current depends on the area and the length.',
    }),
    sl('concept', 'Newton’s law of cooling', {
      b: 'The rate at which a body loses heat to its surroundings is proportional to the excess of its temperature over that of the surroundings, when the excess is small.',
      m: [r`\dfrac{dT}{dt} = -k\,(T - T_0)`, r`T(t) = T_0 + (T_1 - T_0)\,e^{-kt}`],
      ul: [
        'T₀ is the temperature of the surroundings; k (unit s⁻¹ or min⁻¹) depends on the body’s surface area, surface and material, and on the surroundings.',
        'The excess temperature T − T₀ falls **exponentially**: fast at first, then slower; the body never quite reaches T₀.',
        'Holds well for a small excess (a few tens of kelvin) and for forced convection and radiation in a steady draught.',
      ],
      v: plotCoolTea,
      n: 'Newton found that the rate at which a body cools is proportional to how much hotter it is than its surroundings. As a differential equation, the rate of fall of temperature is minus k times the excess. Integrating gives an exponential: the excess falls by the same fraction in equal times. The curve is steep at the start and flattens, approaching room temperature but never quite reaching it.',
    }),
    sl('concept', 'The average-temperature form', {
      b: 'For a small fall of temperature from T₁ to T₂ in time t, replace the temperature on the right by its mean:',
      m: [r`\dfrac{T_1 - T_2}{t} = k\left[\dfrac{T_1 + T_2}{2} - T_0\right]`],
      ul: [
        'Use it when two readings give k, and then a second pair of readings is asked.',
        'It is accurate only when T₁ − T₂ is small compared with the excess; the exponential form is the exact solution of the law.',
        'Either form needs the same three things: the room temperature, the temperatures, and the times.',
      ],
      v: T_AVG,
      n: 'In many problems the temperature falls only a little. Then the rate of cooling can be taken as the fall divided by the time, and the excess can be taken as the average of the starting and finishing temperatures minus the room temperature. This gives a quick one step formula. The exponential solution is exact, and the two agree when the fall is small.',
    }),
    sl('example', 'Worked example 10: how long for tea to cool', {
      b: r`Tea at $${ex10.T1}\ ^\circ\text{C}$ cools to $${ex10.T2}\ ^\circ\text{C}$ in $${ex10.t1}$ min in a room at $${ex10.T0}\ ^\circ\text{C}$. Assuming Newton’s law of cooling, find $k$ and the time from the start for the tea to reach $${ex10.Tt}\ ^\circ\text{C}$.`,
      ul: [
        r`$T - T_0 = (T_1 - T_0)e^{-kt}$: $${ex10.T2 - ex10.T0} = ${ex10.T1 - ex10.T0}\,e^{-5k}$, so $k = \dfrac{1}{5}\ln\dfrac{${ex10.T1 - ex10.T0}}{${ex10.T2 - ex10.T0}} = ${dec(ex10.k, 3)}$ min$^{-1}$.`,
        r`For $${ex10.Tt}\ ^\circ\text{C}$: $t = \dfrac{1}{k}\ln\dfrac{${ex10.T1 - ex10.T0}}{${ex10.Tt - ex10.T0}} = \dfrac{\ln ${dec((ex10.T1 - ex10.T0) / (ex10.Tt - ex10.T0), 4)}}{${dec(ex10.k, 3)}} = ${dec(ex10.tt, 3)}$ min.`,
      ],
      v: plotCoolTea,
      n: 'The excess temperature starts at fifty six and falls to thirty eight in five minutes. So the cooling constant is the natural logarithm of fifty six over thirty eight, divided by five, about point zero seven eight per minute. To reach forty degrees the excess must fall from fifty six to sixteen, which takes the logarithm of three point five divided by k. That is about sixteen minutes.',
    }),
    sl('example', 'Worked example 11: the average-temperature method', {
      b: r`A cup of coffee cools from $${ex11.Ta}\ ^\circ\text{C}$ to $${ex11.Tb}\ ^\circ\text{C}$ in $${ex11.t1}$ min in surroundings at $${ex11.T0}\ ^\circ\text{C}$. How long will it take to cool from $${ex11.Tb}\ ^\circ\text{C}$ to $${ex11.Tc}\ ^\circ\text{C}$?`,
      ul: [
        r`First fall: $\dfrac{${ex11.Ta} - ${ex11.Tb}}{${ex11.t1}} = k\left[\dfrac{${ex11.Ta} + ${ex11.Tb}}{2} - ${ex11.T0}\right] = k \times ${(ex11.Ta + ex11.Tb) / 2 - ex11.T0}$, so $k = ${dec(ex11.k, 3)}$ min$^{-1}$.`,
        r`Second fall: $\dfrac{${ex11.Tb} - ${ex11.Tc}}{t} = k\left[\dfrac{${ex11.Tb} + ${ex11.Tc}}{2} - ${ex11.T0}\right] = k \times ${(ex11.Tb + ex11.Tc) / 2 - ex11.T0}$.`,
        r`$t = \dfrac{${ex11.Tb - ex11.Tc}}{${dec(ex11.k, 4)} \times ${(ex11.Tb + ex11.Tc) / 2 - ex11.T0}} = ${dec(ex11.t2, 3)}$ min. (The exact exponential gives ${dec(ex11.t2Exact, 3)} min.)`,
      ],
      v: T_EX11,
      n: 'In the first interval the cup falls eight degrees in three minutes while its average excess is forty, which gives the cooling constant. In the second interval the cup again falls eight degrees but its average excess is only thirty two, so it cools more slowly and takes longer, about three point seven five minutes. The exact exponential method gives almost the same answer.',
    }),
    sl('concept', 'Cooling curves and what changes k', {
      b: 'The same law describes mugs, plates, engines and cups of tea: only k changes.',
      ul: [
        'A larger k (large exposed area, a dull surface, a draught) means faster cooling; a smaller k (lagging, foam, a lid) means slower cooling.',
        'A body that is heated, in cooler surroundings, follows the mirror-image curve upwards to T₀.',
        'The rate of loss of heat is m c × |dT/dt| = m c k (T − T₀): it is largest when the body is hottest.',
        'Doubling the excess doubles the rate of cooling, for the same body.',
      ],
      v: plotCool2,
      n: 'Two mugs of water start at the same temperature in the same room. The bare metal mug has a large cooling constant and falls quickly. The foam wrapped mug has a small constant and falls slowly. Both curves flatten towards room temperature. The rate of loss of heat is mass times specific heat times k times the excess, so it is largest at the start and halves whenever the excess halves.',
    }),
    sl('check', 'Quick check: the cooling constant', {
      b: 'Find the constant.',
      v: plotCoolTea,
      chk: 'kfind-num',
      n: 'Take the natural logarithm of the ratio of the two excess temperatures and divide by the time.',
    }),
    sl('check', 'Quick check: a doubled excess', {
      b: 'Choose the correct option.',
      v: plotCool2,
      chk: 'rate-mcq',
      n: 'Think of how the rate depends on the excess temperature.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        rows(
          ['Conduction', 'H = K A (T₁ − T₂)/L; R = L/(K A)'],
          ['Series slabs', 'Same H; resistances add; interface from equal H'],
          ['Convection', 'Bulk motion of a fluid; needs a fluid'],
          ['Radiation', 'No medium; dull black best, shiny worst'],
          ['Newton’s law', 'dT/dt = −k(T − T₀); T = T₀ + (T₁ − T₀)e^(−kt)'],
          ['Quick form', '(T₁ − T₂)/t = k[(T₁ + T₂)/2 − T₀]'],
        ),
        'Summary table of conduction, series slabs, convection, radiation and Newton’s law of cooling',
      ),
      n: 'To sum up. Conduction through a slab gives a heat current of conductivity times area times temperature difference over length, and thermal resistances add for slabs in series. Convection needs a moving fluid, radiation needs no medium, and dark surfaces radiate and absorb best. Newton’s law says the rate of cooling is proportional to the excess temperature, which gives an exponential fall towards the room temperature.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Convert area to m² and length to m before using H = KA(T₁ − T₂)/L; state the steady-state condition.',
        'For slabs in series, equate the heat currents; the layer with the larger L/K takes the larger temperature drop.',
        'Quote the condition for Newton’s law (small excess) and use natural logarithms for the exponential form.',
        'In explanations name the mode of transfer, then say what carries the energy.',
      ],
      v: T_MODES,
      n: 'Convert area and length to metres before using the conduction formula, and mention that the flow is steady. For slabs in series equate the heat currents; the layer with the larger length over conductivity takes most of the temperature drop. For Newton’s law mention that the excess is small and use natural logarithms. In explanations name the mode of heat transfer and what carries the energy.',
    }),
  ],
});
void mn;
