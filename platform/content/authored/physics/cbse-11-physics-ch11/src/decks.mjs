// ch11 Thermodynamics — two decks: Part 1 (t01–t02) thermal equilibrium, heat, work, internal energy, the first law,
// work as an area and the specific heats of a gas; Part 2 (t03–t04) thermodynamic processes, cycles, the second law,
// reversibility, heat engines and refrigerators. Every number and every graph is computed here from stated data.
import { sl, deck, table, flow, svgV, plot, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, GAMMA_MONO, integ, R6 } from './phys.mjs';
import * as G from './svgs.mjs';

const n2 = (x) => dec(x, 2);
const n3 = (x) => dec(x, 3);
const n4 = (x) => dec(x, 4);

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { m: 1200, kmh: 72, C: 8000 }; // a car brought to rest by its brakes; C = heat capacity of the brake assembly in J/K
ex1.v = ex1.kmh / 3.6;
ex1.KE = 0.5 * ex1.m * ex1.v ** 2;
ex1.dT = ex1.KE / ex1.C;

const cases = [
  { Q: 500, W: 200, what: 'heated while it pushes the piston out: warms up' },
  { Q: -300, W: 0, what: 'cooled in a rigid vessel: cools down' },
  { Q: 0, W: -250, what: 'compressed in an insulated cylinder: warms up' },
  { Q: 400, W: -100, what: 'heated while being compressed: warms up a lot' },
].map((c) => ({ ...c, dU: c.Q - c.W }));

const ex3 = { P1: G.PVPATHS_DATA.A[1], V1: G.PVPATHS_DATA.A[0], P2: G.PVPATHS_DATA.B[1], V2: G.PVPATHS_DATA.B[0] }; // kPa, L
ex3.dV = ex3.V2 - ex3.V1;
ex3.Wa = ex3.P1 * ex3.dV;
ex3.Wb = ex3.P2 * ex3.dV;
ex3.Wc = ((ex3.P1 + ex3.P2) / 2) * ex3.dV;
ex3.dU = 1.5 * (ex3.P2 * ex3.V2 - ex3.P1 * ex3.V1); // monatomic ideal gas: dU = (3/2) d(PV)
ex3.Qa = ex3.dU + ex3.Wa;
ex3.Qb = ex3.dU + ex3.Wb;
ex3.Qc = ex3.dU + ex3.Wc;
ex3.Tr = (ex3.P2 * ex3.V2) / (ex3.P1 * ex3.V1);

const ex4 = { n: 2.0, dT: 40 };
ex4.Cv = 1.5 * R;
ex4.Cp = 2.5 * R;
ex4.QV = ex4.n * ex4.Cv * ex4.dT;
ex4.QP = ex4.n * ex4.Cp * ex4.dT;
ex4.W = ex4.n * R * ex4.dT;
ex4.dU = ex4.QP - ex4.W;
ex4.gam = ex4.Cp / ex4.Cv;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex5 = { n: 0.5, T: 300, P1: 200, ratio: 3 }; // isothermal expansion; P in kPa, V in L
ex5.nRT = ex5.n * R * ex5.T; // J = kPa L
ex5.V1 = ex5.nRT / ex5.P1;
ex5.V2 = ex5.ratio * ex5.V1;
ex5.P2 = ex5.P1 / ex5.ratio;
ex5.W = ex5.nRT * Math.log(ex5.ratio);

const ex6 = { n: 1.0, T1: 300, P1: 100, gamma: GAMMA_MONO, ratio: 2 }; // adiabatic compression to half the volume
ex6.V1 = (ex6.n * R * ex6.T1) / ex6.P1;
ex6.V2 = ex6.V1 / ex6.ratio;
ex6.T2 = ex6.T1 * ex6.ratio ** (ex6.gamma - 1);
ex6.P2 = ex6.P1 * ex6.ratio ** ex6.gamma;
ex6.W = (ex6.n * R * (ex6.T1 - ex6.T2)) / (ex6.gamma - 1); // done BY the gas (negative: work is done ON it)
ex6.dU = ex6.n * 1.5 * R * (ex6.T2 - ex6.T1);
ex6.K = ex6.P1 * ex6.V1 ** ex6.gamma;

const [cA, cB, cC, cD] = [G.CYCLE_DATA.A, G.CYCLE_DATA.B, G.CYCLE_DATA.C, G.CYCLE_DATA.D];
const ex7 = { QAB: 1.5 * (cB[0] * cB[1] - cA[0] * cA[1]), QBC: 2.5 * cB[1] * (cC[0] - cB[0]), QCD: 1.5 * (cD[0] * cD[1] - cC[0] * cC[1]), QDA: 2.5 * cA[1] * (cA[0] - cD[0]) };
ex7.Qin = ex7.QAB + ex7.QBC;
ex7.Qout = -(ex7.QCD + ex7.QDA);
ex7.W = (cB[1] - cA[1]) * (cC[0] - cB[0]);
ex7.eta = ex7.W / ex7.Qin;

const { engine: eg, fridge: fg } = G.ENG_DATA;
const ex8 = { Q1: eg.Q1, Q2: eg.Q2, W: eg.W, eta: eg.W / eg.Q1, fQ2: fg.Q2, fW: fg.W, fQ1: fg.Q1, cop: fg.Q2 / fg.W, power: (fg.W * 1e6) / 3600 };

export const EX = { ex1, cases, ex3, ex4, ex5, ex6, ex7, ex8 };
export const NUMCHECK = {
  strokeStraight: integ((v) => ex3.P1 + ((ex3.P2 - ex3.P1) * (v - ex3.V1)) / ex3.dV, ex3.V1, ex3.V2),
  isoNumeric: integ((v) => ex5.nRT / v, ex5.V1, ex5.V2),
  adiNumeric: integ((v) => ex6.P1 * (ex6.V1 / v) ** ex6.gamma, ex6.V1, ex6.V2),
};

// ---------------------------------------------------------------- visuals
export const V = {
  zero: svgV(G.ZERO, 'Two blocks each touching a thermometer that reads 45 degrees Celsius, so the two blocks are in thermal equilibrium with each other', 'Equal to a third body: equal to each other.'),
  paths: svgV(G.PVPATHS, 'Three paths from the same start to the same end on a P-V diagram with shaded areas of 900, 600 and 750 joules', 'The work depends on the path; the end states are the same.'),
  isoad: svgV(G.ISOAD, 'An isotherm and a steeper adiabat on a P-V diagram from the same starting state, with the area under each shaded', 'The adiabat is steeper and ends lower: less area, less work.'),
  four: svgV(G.FOUR, 'Four P-V diagrams from the same starting state: isobaric, isochoric, isothermal and adiabatic expansions', 'Isobaric, isochoric, isothermal and adiabatic paths from one state.'),
  cycle: svgV(G.CYCLE, 'A rectangular cycle on a P-V diagram run clockwise, whose enclosed area is the net work of 800 joules', 'Clockwise loop: net work out; the area is the net work.'),
  engfridge: svgV(G.ENGFRIDGE, 'Energy flow in a heat engine and in a refrigerator with arrow widths proportional to energy', 'Engine: heat in, work out, heat rejected. Refrigerator: work in, heat pumped up.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotCpCv = plot(
  {
    x: ax('temperature rise ΔT (K)', 0, 50),
    y: ax('heat absorbed Q (J)', 0, 2200),
    functions: [
      { expr: `${R6(ex4.n * ex4.Cp)}*x`, label: `constant pressure: Q = n Cp ΔT, slope ${n4(ex4.n * ex4.Cp)} J/K`, domain: [0, 50] },
      { expr: `${R6(ex4.n * ex4.Cv)}*x`, label: `constant volume: Q = n Cv ΔT, slope ${n4(ex4.n * ex4.Cv)} J/K`, domain: [0, 50] },
    ],
  },
  'Graph of heat absorbed against temperature rise for 2 moles of a monatomic gas: the constant pressure line is steeper than the constant volume line, so more heat is needed at constant pressure for the same rise in temperature',
  'The same ΔT needs more heat at constant pressure: the extra part is the work done by the gas.',
);
const K1 = G.ISOAD_DATA.P1 * G.ISOAD_DATA.V1 ** G.ISOAD_DATA.gamma;
const iso1 = G.ISOAD_DATA.P1 * G.ISOAD_DATA.V1;
const adiEnd = G.ISOAD_DATA.P1 * (G.ISOAD_DATA.V1 / G.ISOAD_DATA.V2) ** G.ISOAD_DATA.gamma;
export const plotIsoAd = plot(
  {
    x: ax('volume V (L)', 1.5, 5),
    y: ax('pressure P (kPa)', 0, 450),
    functions: [
      { expr: `${iso1}/x`, label: `isotherm P V = ${iso1} J`, domain: [2, 4.6] },
      { expr: `${R6(K1)}/x^${R6(G.ISOAD_DATA.gamma)}`, label: `adiabat P V^γ = const (γ = 5/3)`, domain: [2, 4.6] },
      { expr: `${R6(adiEnd * G.ISOAD_DATA.V2)}/x`, label: `isotherm through the adiabat's end (P V = ${n3(adiEnd * G.ISOAD_DATA.V2)} J)`, domain: [2, 4.6] },
    ],
  },
  'P-V graph from a state at 2 litres and 400 kilopascals: an isotherm and a steeper adiabat that crosses to a lower isotherm, so the temperature falls during an adiabatic expansion',
  'The adiabat crosses from one isotherm to a cooler one: expansion without heat input cools the gas.',
);
export const plotIso = plot(
  {
    x: ax('volume V (L)', 4, 21),
    y: ax('pressure P (kPa)', 0, 250),
    functions: [{ expr: `${R6(ex5.nRT)}/x`, label: `isotherm at 300 K: P V = ${n4(ex5.nRT)} J`, domain: [ex5.V1, ex5.V2] }],
    vlines: [{ x: R6(ex5.V1), label: `V₁ = ${n3(ex5.V1)} L`, dashed: true }, { x: R6(ex5.V2), label: `V₂ = ${n3(ex5.V2)} L`, dashed: true }],
  },
  'Isotherm at 300 kelvin for half a mole of ideal gas between 6.24 litres and 18.7 litres, with the area under the curve equal to the work done by the gas',
  'The area under this curve between V₁ and V₂ is the work done by the gas.',
);
export const plotAdi = plot(
  {
    x: ax('volume V (L)', 10, 28),
    y: ax('pressure P (kPa)', 0, 350),
    functions: [
      { expr: `${R6(ex6.K)}/x^${R6(ex6.gamma)}`, label: 'adiabat (rapid compression, Q = 0)', domain: [ex6.V2, ex6.V1] },
      { expr: `${R6(ex6.n * R * ex6.T1)}/x`, label: 'isotherm through the start (300 K)', domain: [ex6.V2, ex6.V1] },
    ],
    vlines: [{ x: R6(ex6.V2), label: `V₂ = ${n3(ex6.V2)} L`, dashed: true }, { x: R6(ex6.V1), label: `V₁ = ${n3(ex6.V1)} L`, dashed: true }],
  },
  'P-V graph for one mole of a monatomic gas compressed adiabatically from 24.9 litres to half that volume: the adiabat rises more steeply than the isotherm through the starting state',
  'Compressed to half the volume, the pressure more than triples, not just doubles.',
);
export const plotCycle = plot(
  {
    x: ax('volume V (L)', 0, 8),
    y: ax('pressure P (kPa)', 0, 350),
    series: [{ label: 'cycle ABCDA (clockwise)', kind: 'line', points: [cA, cB, cC, cD, cA] }],
  },
  'P-V graph of a rectangular cycle: heated at constant volume, expanded at constant pressure, cooled at constant volume and compressed at constant pressure, enclosing 800 joules of net work',
  'The enclosed area is the net work: 200 kPa × 4 L = 800 J.',
);
export const plotEff = plot(
  {
    x: ax('heat rejected ÷ heat absorbed, Q₂/Q₁', 0, 1),
    y: ax('efficiency η', 0, 1.1),
    functions: [{ expr: '1-x', label: 'η = 1 − Q₂/Q₁', domain: [0, 1] }],
    hlines: [{ y: 1, label: 'η = 1: forbidden by the Kelvin–Planck statement', dashed: true }],
  },
  'Straight-line graph of engine efficiency against the ratio of heat rejected to heat absorbed: efficiency falls from 1 to 0 as the ratio rises, and efficiency 1 would need zero heat rejection, which is not possible',
  'η reaches 1 only if no heat at all is rejected; the second law forbids it.',
);

// ---------------------------------------------------------------- tables
const T_WALLS = table(
  ['Wall between two systems', 'Heat can cross?', 'What happens'],
  [
    ['Adiabatic wall (thick foam, a vacuum flask)', 'No', 'Each system keeps its own temperature'],
    ['Diathermic wall (thin copper sheet)', 'Yes', 'Heat flows until the two reach one common temperature: thermal equilibrium'],
  ],
  'Table comparing adiabatic and diathermic walls and what happens to the temperatures of the systems they separate',
);
const T_HWU = table(
  ['', 'Heat Q', 'Work W', 'Internal energy U'],
  [
    ['What it is', 'Energy transferred because of a temperature difference', 'Energy transferred by a force acting through a displacement', 'Energy of the random motion and mutual interaction of the molecules (centre of mass at rest)'],
    ['A property of the system?', 'No: it is energy in transit', 'No: it is energy in transit', 'Yes: a state function'],
    ['Depends on the path?', 'Yes', 'Yes', 'No: only on the initial and final states'],
    ['SI unit', 'joule (J)', 'joule (J)', 'joule (J)'],
  ],
  'Table comparing heat, work and internal energy: what each is, whether it is a property of the system and whether it depends on the path',
);
const T_SIGN = table(
  ['Quantity', 'Positive when', 'Negative when'],
  [
    ['Q (heat)', 'heat flows into the system', 'heat flows out of the system'],
    ['W (work done by the gas)', 'the gas expands and pushes on its surroundings', 'the gas is compressed: work is done on it'],
    ['ΔU = Q − W', 'internal energy rises (an ideal gas warms up)', 'internal energy falls (an ideal gas cools)'],
  ],
  'Table of the sign convention used in the first law: heat into the system, work done by the system and change in internal energy',
);
const T_CASES = table(
  ['Q (J)', 'W by the gas (J)', 'ΔU = Q − W (J)', 'The gas is'],
  cases.map((c) => [`${c.Q > 0 ? '+' : ''}${c.Q}`, `${c.W > 0 ? '+' : ''}${c.W}`, `${c.dU > 0 ? '+' : ''}${c.dU}`, c.what]),
  'Table of four cases of heat and work for a gas with the change in internal energy worked out from the first law',
);
const T_GASES = table(
  ['Gas (data from kinetic theory)', 'Cv (J mol⁻¹ K⁻¹)', 'Cp = Cv + R (J mol⁻¹ K⁻¹)', 'γ = Cp/Cv'],
  [
    ['Monatomic (helium, argon): Cv = 3R/2', n4(1.5 * R), n4(2.5 * R), n3(5 / 3)],
    ['Diatomic (nitrogen, oxygen) at room temperature: Cv = 5R/2', n4(2.5 * R), n4(3.5 * R), n3(7 / 5)],
  ],
  'Table of molar heat capacities at constant volume and constant pressure and the ratio gamma for monatomic and diatomic gases, using R equal to 8.314 joule per mole per kelvin',
);
const T_PROC = table(
  ['Process', 'Condition', 'Work by gas W', 'ΔU', 'Heat Q'],
  [
    ['Isochoric', 'V constant', '0', 'n Cv ΔT', 'n Cv ΔT = ΔU'],
    ['Isobaric', 'P constant', 'P ΔV = n R ΔT', 'n Cv ΔT', 'n Cp ΔT'],
    ['Isothermal (ideal gas)', 'T constant, P V constant', 'n R T ln(V₂/V₁)', '0', 'Q = W'],
    ['Adiabatic', 'Q = 0, P V^γ constant', '(P₁V₁ − P₂V₂)/(γ − 1) = n Cv (T₁ − T₂)', 'n Cv ΔT = −W', '0'],
    ['Cyclic', 'back to the start state', 'area enclosed by the loop', '0', 'Q = W (net)'],
  ],
  'Summary table of isochoric, isobaric, isothermal, adiabatic and cyclic processes: condition, work done by the gas, change in internal energy and heat',
);
const T_IB = table(
  ['Process', 'Work done by the gas', 'Heat absorbed', 'Why'],
  [
    ['Isochoric (V constant)', 'W = 0: no volume change', 'Q = n Cv ΔT', 'all the heat goes into internal energy'],
    ['Isobaric (P constant)', 'W = P ΔV = n R ΔT', 'Q = n Cp ΔT', 'part of the heat does the work P ΔV, the rest raises U'],
  ],
  'Table comparing an isochoric and an isobaric process: work done by the gas, heat absorbed and the reason',
);
const T_STMT = table(
  ['Statement', 'What it says cannot happen', 'In plain words'],
  [
    ['Kelvin–Planck', 'A cyclic device taking heat from one reservoir and converting all of it into work, with no other effect', 'Some heat must always be rejected: no engine is 100% efficient'],
    ['Clausius', 'A cyclic device whose only result is to move heat from a colder body to a hotter one', 'A refrigerator needs work: heat does not flow uphill by itself'],
  ],
  'Table of the Kelvin-Planck and Clausius statements of the second law of thermodynamics and what each forbids',
);
const T_REV = table(
  ['Process', 'Reversible or irreversible?', 'Reason'],
  [
    ['A gas rushes into an evacuated chamber', 'Irreversible', 'The gas never collects itself back into one chamber'],
    ['Heat flows from a hot spoon to cold tea', 'Irreversible', 'Heat flow across a finite temperature gap is one-way'],
    ['A sliding block is stopped by friction', 'Irreversible', 'Work turns into heat that cannot turn fully back into work'],
    ['A gas expands very slowly, with no friction, in contact with a reservoir', 'Reversible (ideal limit)', 'Every stage is in equilibrium; a tiny change reverses it'],
  ],
  'Table of four processes labelled reversible or irreversible, each with the reason',
);
const T_ER = table(
  ['', 'Heat engine', 'Refrigerator'],
  [
    ['Purpose', 'Turn heat into work', 'Remove heat from a cold space'],
    ['Heat flows', 'Q₁ in from the hot reservoir, Q₂ out to the cold one', 'Q₂ in from the cold space, Q₁ out to the hot surroundings'],
    ['Work', 'W out; W = Q₁ − Q₂', 'W in; W = Q₁ − Q₂'],
    ['Measure of performance', 'efficiency η = W/Q₁ = 1 − Q₂/Q₁', 'coefficient of performance COP = Q₂/W = Q₂/(Q₁ − Q₂)'],
    ['Limit', 'η is always less than 1', 'COP can be more than 1'],
  ],
  'Table comparing a heat engine and a refrigerator: purpose, heat flows, work and the measure of performance',
);

export const TABLES = { T_WALLS, T_HWU, T_SIGN, T_CASES, T_GASES, T_PROC, T_IB, T_STMT, T_REV, T_ER };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Thermodynamics — Part 1: Equilibrium, heat, work, the first law and specific heats',
  goals: [
    'State the zeroth law and use it to define temperature; distinguish heat, work and internal energy',
    'Apply the first law ΔU = Q − W with a clear sign convention, and find work as the area under a P–V graph',
    'Use Cp and Cv for a gas and show why Cp − Cv = R',
  ],
  slides: [
    sl('title', 'Thermodynamics', {
      b: 'Part 1 — when is a body at one temperature, how energy moves as heat and work, and how the first law keeps the books.',
      v: V.zero,
      n: 'A pressure cooker whistles, a bicycle pump warms up, a refrigerator hums. Thermodynamics is the science of how energy moves between a system and its surroundings as heat and work. In this part we define temperature through thermal equilibrium, meet internal energy, state the first law, and see why a gas needs more heat to warm up at constant pressure than at constant volume.',
    }),
    sl('concept', 'Thermal equilibrium', {
      b: 'A **system** is the part of the world we study; everything else is its **surroundings**.',
      ul: [
        'Two systems are in **thermal equilibrium** when, placed in contact, no net heat flows between them: their state variables stop changing.',
        'An **adiabatic wall** blocks heat; a **diathermic wall** lets heat through.',
        'Separated by an adiabatic wall, two systems can be at different temperatures and stay so.',
        'Joined by a diathermic wall, they settle at a **common temperature**: that is what thermal equilibrium means.',
      ],
      v: T_WALLS,
      n: 'A system is the part of the universe we are studying. Two systems in contact are in thermal equilibrium when no net heat flows between them any more. A thick foam wall, called adiabatic, stops heat. A thin copper sheet, called diathermic, lets heat pass until both systems settle at one common temperature.',
    }),
    sl('diagram', 'The zeroth law and temperature', {
      b: 'Two blocks, A and B, are each placed against a thermometer C and give the same reading.',
      ul: [
        '**Zeroth law:** if A is in thermal equilibrium with C, and B is in thermal equilibrium with C, then A and B are in thermal equilibrium with each other.',
        '**Temperature** is the property that has the same value for all systems in thermal equilibrium: it is what makes a thermometer possible.',
        'A thermometer is simply the third body C: its reading says whether two blocks would exchange heat.',
        'Heat flows spontaneously from the body at higher temperature to the body at lower temperature.',
      ],
      v: V.zero,
      n: 'Place a copper block and an aluminium block against the same thermometer. If both give the same reading, the zeroth law says the two blocks are in thermal equilibrium with each other, even though they never touched. Temperature is the property that is equal for bodies in thermal equilibrium, and the thermometer is the third body that lets us compare them.',
    }),
    sl('two-column', 'Heat, work and internal energy', {
      b: 'Energy crosses the boundary of a system in two ways, and the system stores it as internal energy.',
      cols: [
        '**Heat Q**\n- Energy transferred by a temperature difference\n- Flows in as the cup of tea cools\n- Not "contained" in a body',
        '**Work W**\n- Energy transferred by a force moving its point of application\n- A gas pushing a piston, a brake pad rubbing\n- Also not stored in a body',
      ],
      v: T_HWU,
      n: 'Heat is energy that moves because of a temperature difference. Work is energy that moves because a force acts through a displacement, for example a gas pushing a piston. Neither is stored in a body. What a body does store is internal energy, the energy of the random motion and the interactions of its molecules. That depends only on the state, not on how the state was reached.',
    }),
    sl('example', 'Worked example 1: braking turns work into internal energy', {
      b: r`A ${ex1.m} kg car moving at ${ex1.kmh} km h$^{-1}$ is brought to rest by its brakes. The brake assembly has a total heat capacity of $${ex1.C / 1000}$ kJ K$^{-1}$ and takes in all the energy. Find the rise in its temperature.`,
      ul: [
        r`$v = ${ex1.kmh}$ km h$^{-1}$ $= ${ex1.v}$ m s$^{-1}$; kinetic energy $= \tfrac{1}{2}mv^2 = \tfrac{1}{2} \times ${ex1.m} \times ${ex1.v ** 2} = ${ex1.KE}$ J.`,
        'Friction does work on the brakes; no heat flows in, yet the brakes warm up: their **internal energy rises**.',
        r`$\Delta T = \dfrac{\Delta U}{C} = \dfrac{${ex1.KE}}{${ex1.C}} = ${ex1.dT}$ K.`,
      ],
      v: flow('LR', [['a', 'Kinetic energy of the car'], ['b', 'Friction does work on the brakes'], ['c', 'Internal energy of the brakes rises']], [['a', 'b'], ['b', 'c']], 'Flow diagram: kinetic energy of the car, friction work on the brakes, rise in the internal energy of the brakes', 'Work can change internal energy with no heat flow.'),
      n: `The car has kinetic energy of ${ex1.KE} joules. Friction between pads and discs does work on the brakes, and no heat flows in at all, yet the brakes warm up. Their internal energy rises by ${ex1.KE} joules. Divide by the heat capacity of eight thousand joules per kelvin and the temperature rise is ${ex1.dT} kelvin.`,
    }),
    sl('check', 'Quick check: internal energy', {
      b: 'Fill in the blank.',
      v: T_HWU,
      chk: 'internal-fill',
      n: 'Recall which quantity belongs to the state of the system rather than to the process.',
    }),
    sl('concept', 'The first law of thermodynamics', {
      b: r`Energy is conserved. For a system: $\Delta U = Q - W$, where $W$ is the work done **by** the system.`,
      m: [r`\Delta U = Q - W`],
      ul: [
        'Heat **added** to the system is positive; work done **by** the system is positive.',
        'For compression, W is negative (work is done on the gas), so ΔU is larger than Q.',
        'The first law ties together three energy changes; it does not say which way a process can go (that is the second law).',
        'Some books write ΔU = Q + W with W as work done on the system; the physics is identical.',
      ],
      v: T_SIGN,
      n: 'The first law is energy conservation. The change in internal energy equals the heat added to the system minus the work done by the system. We count heat into the system as positive and work done by the system as positive. When a gas is compressed, the work done by it is negative, so the internal energy rises by more than the heat added. Some books use the opposite sign for work, but the physics is the same.',
    }),
    sl('example', 'Worked example 2: four cases of the first law', {
      b: 'For a gas, find ΔU in each case and say what happens to its temperature (take an ideal gas, so U rises with T).',
      ul: cases.map((c, i) => r`Case ${i + 1}: $Q = ${c.Q > 0 ? '+' : ''}${c.Q}$ J, $W = ${c.W > 0 ? '+' : ''}${c.W}$ J gives $\Delta U = ${c.Q} - (${c.W}) = ${c.dU > 0 ? '+' : ''}${c.dU}$ J: ${c.what}.`),
      v: T_CASES,
      n: 'Apply delta U equals Q minus W to each case. Heating the gas by five hundred joules while it does two hundred joules of work leaves three hundred joules in the gas. Cooling it by three hundred joules with no work removes three hundred. Compressing it with two hundred and fifty joules of work, and no heat flow, adds two hundred and fifty. Heating while compressing adds five hundred.',
    }),
    sl('concept', 'Work done by a gas: the area under the P–V graph', {
      b: r`When a gas pushes a piston of area $A$ through $dx$ at pressure $P$, the work is $P A\,dx = P\,dV$.`,
      m: [r`W = \int_{V_1}^{V_2} P\,dV`],
      ul: [
        r`At **constant pressure**: $W = P(V_2 - V_1) = P\,\Delta V$.`,
        'In general W is the **area under the curve** on a P–V diagram: positive for expansion, negative for compression.',
        'The area depends on the **path**, not just on the end points, so W is not a state function.',
        'Unit bookkeeping: 1 kPa × 1 L = 1 J, because 10³ Pa × 10⁻³ m³ = 1 J.',
      ],
      v: V.paths,
      n: 'A gas pushing a piston does work equal to pressure times the change in volume. If the pressure changes along the way, the work is the area under the curve on a pressure volume graph. Expansion gives a positive area, compression a negative one. Notice that three different paths between the same two states enclose three different areas, so work depends on the path.',
    }),
    sl('check', 'Quick check: reading an area', {
      b: 'Choose the correct option.',
      v: V.paths,
      chk: 'pvarea-mcq',
      n: 'Look at which way the volume changes along the path.',
    }),
    sl('example', 'Worked example 3: same states, three paths', {
      b: r`A fixed amount of monatomic ideal gas goes from A ($${ex3.V1}$ L, $${ex3.P1}$ kPa) to B ($${ex3.V2}$ L, $${ex3.P2}$ kPa) by the three paths in the figure. For a monatomic ideal gas $\Delta U = \tfrac{3}{2}\,\Delta(PV)$ (data). Find W and Q for each path.`,
      ul: [
        r`Path a: $W = P_1 \Delta V = ${ex3.P1} \times ${ex3.dV} = ${ex3.Wa}$ J. Path b: $W = P_2 \Delta V = ${ex3.P2} \times ${ex3.dV} = ${ex3.Wb}$ J. Path c: trapezoid, $W = \tfrac{${ex3.P1} + ${ex3.P2}}{2} \times ${ex3.dV} = ${ex3.Wc}$ J.`,
        r`$\Delta U = \tfrac{3}{2}(P_2V_2 - P_1V_1) = \tfrac{3}{2}(${ex3.P2 * ex3.V2} - ${ex3.P1 * ex3.V1}) = ${ex3.dU}$ J: **the same on every path**.`,
        r`$Q = \Delta U + W$: path a $= ${ex3.Qa}$ J, path b $= ${ex3.Qb}$ J, path c $= ${ex3.Qc}$ J.`,
        'W and Q change with the path; ΔU does not.',
      ],
      v: V.paths,
      n: `The gas goes from two litres at three hundred kilopascals to five litres at two hundred kilopascals. The three areas give ${ex3.Wa}, ${ex3.Wb} and ${ex3.Wc} joules. The change in internal energy depends only on the end states, and comes to ${ex3.dU} joules. So the heat absorbed is ${ex3.Qa}, ${ex3.Qb} and ${ex3.Qc} joules on the three paths. Work and heat depend on the path; internal energy does not.`,
    }),
    sl('concept', 'Specific heat capacities of a gas', {
      b: 'A gas can be heated at constant volume or at constant pressure, and the heat needed for the same rise in temperature differs.',
      ul: [
        r`**Molar heat capacity at constant volume** $C_v$: $Q = n C_v \Delta T$ with $V$ fixed.`,
        r`**Molar heat capacity at constant pressure** $C_p$: $Q = n C_p \Delta T$ with $P$ fixed.`,
        'At constant pressure the gas also does work P ΔV, so it needs more heat: **Cp is greater than Cv**.',
        r`Ratio $\gamma = C_p / C_v$; for a monatomic gas $C_v = \tfrac{3}{2}R$, for a diatomic gas $\tfrac{5}{2}R$ (values taken from kinetic theory, next chapter).`,
      ],
      v: plotCpCv,
      n: 'The same temperature rise costs more heat at constant pressure than at constant volume, so the constant pressure line is steeper. At constant volume the gas does no work, so all the heat raises the internal energy. At constant pressure the gas also expands and does work, so it needs extra heat. The ratio of the two heat capacities is called gamma.',
    }),
    sl('concept', 'Why Cp − Cv = R', {
      b: r`Heat $n$ moles at constant pressure by $\Delta T$ and apply the first law.`,
      m: [r`Q = n C_p \Delta T = \Delta U + P\,\Delta V`, r`\Delta U = n C_v \Delta T, \qquad P\,\Delta V = n R\,\Delta T`, r`C_p - C_v = R`],
      ul: [
        'ΔU for an ideal gas depends only on ΔT, so it is n Cv ΔT for any process between the same two temperatures.',
        'The ideal gas law PV = nRT gives P ΔV = nR ΔT at constant pressure.',
        'Numerically R = 8.314 J mol⁻¹ K⁻¹, so Cp is always 8.314 J mol⁻¹ K⁻¹ more than Cv.',
      ],
      v: T_GASES,
      n: 'Heat a gas at constant pressure. By the first law the heat equals the change in internal energy plus the work. For an ideal gas the change in internal energy is n times Cv times delta T. The work is pressure times change in volume, which the gas law turns into n R delta T. Dividing by n and delta T, the molar heat capacity at constant pressure minus that at constant volume equals R.',
    }),
    sl('example', 'Worked example 4: heating a monatomic gas', {
      b: r`${n2(ex4.n)} mol of a monatomic ideal gas ($C_v = \tfrac{3}{2}R$, $R = 8.314$ J mol$^{-1}$ K$^{-1}$) is heated through $${ex4.dT}$ K at constant pressure. Find the heat absorbed, the work done by the gas and the rise in internal energy.`,
      ul: [
        r`$C_p = C_v + R = \tfrac{5}{2}R = ${n4(ex4.Cp)}$ J mol$^{-1}$ K$^{-1}$.`,
        r`$Q = nC_p\Delta T = ${n2(ex4.n)} \times ${n4(ex4.Cp)} \times ${ex4.dT} \approx ${n4(ex4.QP)}$ J.`,
        r`$W = P\Delta V = nR\Delta T = ${n2(ex4.n)} \times 8.314 \times ${ex4.dT} \approx ${n4(ex4.W)}$ J.`,
        r`$\Delta U = Q - W \approx ${n4(ex4.dU)}$ J $= nC_v\Delta T$. The gas keeps $\dfrac{C_v}{C_p} = \dfrac{3}{5}$ of the heat; the rest does work.`,
      ],
      v: T_GASES,
      n: `Take two moles of monatomic gas and heat it by forty kelvin at constant pressure. The molar heat capacity at constant pressure is five halves R, about ${n4(ex4.Cp)} joules per mole per kelvin. The heat absorbed is about ${n4(ex4.QP)} joules. The work done by the gas is n R delta T, about ${n4(ex4.W)} joules. The rest, about ${n4(ex4.dU)} joules, raises the internal energy: three fifths of the heat.`,
    }),
    sl('check', 'Quick check: heat at constant pressure', {
      b: 'Compute the heat absorbed.',
      v: plotCpCv,
      chk: 'cpheat-num',
      n: 'Use Cp equals Cv plus R, then multiply by the number of moles and the temperature rise.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Zeroth law', 'Equilibrium with a third body means equilibrium with each other: temperature is well defined'],
          ['Heat, work, internal energy', 'Heat and work are energy in transit and path dependent; U is a state function'],
          ['First law', 'ΔU = Q − W (W done by the system)'],
          ['Work by a gas', 'W = ∫P dV = area under the P–V curve; W = PΔV at constant pressure'],
          ['Specific heats', 'Q = nCvΔT (V constant), Q = nCpΔT (P constant); Cp − Cv = R'],
        ],
        'Summary table of the zeroth law, heat, work and internal energy, the first law, work as an area and the specific heats of a gas',
      ),
      n: 'To sum up. Temperature is defined by thermal equilibrium and the zeroth law. Heat and work are energy in transit and depend on the path, while internal energy is a property of the state. The first law says the change in internal energy is the heat added minus the work done by the system. Work is the area under the pressure volume curve. And the two molar heat capacities of a gas differ by R.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State your sign convention for W before using ΔU = Q − W.',
        'Never say a body "contains heat": heat is energy in transit; internal energy is what a body has.',
        'For an area on a P–V graph, use kPa × L = J and check the sign from the direction of the volume change.',
        'Write Cp − Cv = R with its derivation: first law at constant pressure plus PV = nRT.',
      ],
      v: T_SIGN,
      n: 'State your sign convention before using the first law. Never say a body contains heat; say it has internal energy. When finding work from a graph, check the units and the direction of the volume change. And when asked for Cp minus Cv equals R, give the short derivation from the first law and the gas law.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Thermodynamics — Part 2: Processes, cycles, the second law, engines and refrigerators',
  goals: [
    'Describe and analyse isothermal, adiabatic, isochoric, isobaric and cyclic processes of an ideal gas',
    'State the Kelvin–Planck and Clausius statements and distinguish reversible from irreversible processes',
    'Find the efficiency of a heat engine and the coefficient of performance of a refrigerator',
  ],
  slides: [
    sl('title', 'Processes, cycles and the second law', {
      b: 'Part 2 — the ways a gas can change, why a cycle can do work, and why no engine is perfect.',
      v: V.four,
      n: 'A gas can be taken from one state to another in many ways. We can hold the temperature, the pressure or the volume fixed, or cut off all heat flow. In this part we meet those four basic processes, see how a cycle turns heat into work, and then learn the second law, which sets limits that the first law alone does not.',
    }),
    sl('concept', 'Quasi-static processes', {
      b: 'A **quasi-static** process is so slow that the system is in equilibrium at every stage.',
      ul: [
        'The state variables P, V and T are defined at every instant, so the path can be drawn as a curve on a P–V diagram.',
        'It is an idealisation: real processes are fast enough that the gas is briefly out of equilibrium.',
        'Slow expansion with the pressure always equal to the outside pressure is quasi-static; a sudden burst is not.',
        'We treat every P–V curve in this chapter as quasi-static; for a fast stroke this is an idealisation that assumes the gas stays uniform.',
      ],
      v: V.four,
      n: 'A quasi static process happens so slowly that the gas is in equilibrium at every stage. Only then do pressure, volume and temperature have definite values all along the way, and only then can we draw the path as a curve on a pressure volume diagram. Real processes are approximations to this ideal.',
    }),
    sl('concept', 'Isochoric and isobaric processes', {
      b: 'Keep the volume fixed, or keep the pressure fixed.',
      ul: [
        '**Isochoric** (V constant): a vertical line on the P–V diagram, W = 0, so Q = ΔU = n Cv ΔT.',
        '**Isobaric** (P constant): a horizontal line, W = P ΔV = n R ΔT, and Q = n Cp ΔT.',
        'Heating a gas in a sealed rigid cylinder is isochoric; letting a gas push a free piston against steady atmospheric pressure is isobaric.',
        'In both, ΔU = n Cv ΔT for an ideal gas.',
      ],
      v: T_IB,
      n: 'In an isochoric process the volume is fixed, so no work is done and all the heat raises the internal energy. In an isobaric process the pressure is fixed, so the work is pressure times the change in volume, and the heat is n times Cp times delta T. In both cases the change in internal energy of an ideal gas is n Cv delta T.',
    }),
    sl('concept', 'Isothermal expansion of an ideal gas', {
      b: r`Temperature constant: $PV = nRT$ = constant, a hyperbola on the P–V diagram.`,
      m: [r`W = \int_{V_1}^{V_2} \dfrac{nRT}{V}\,dV = nRT \ln\dfrac{V_2}{V_1}`],
      ul: [
        'The internal energy of an ideal gas depends only on T, so ΔU = 0.',
        'The first law then gives **Q = W**: all the heat absorbed is turned into work.',
        'This does not break the second law: the gas ends up at a larger volume, so this is not the sole result of a cycle.',
        'It needs a reservoir at fixed temperature, and the process must be slow.',
      ],
      v: plotIsoAd,
      n: 'In an isothermal process of an ideal gas the temperature does not change, so the pressure times the volume stays constant. The work is n R T times the natural logarithm of the volume ratio. Since the internal energy depends only on temperature, it does not change, so every joule of heat absorbed becomes work. That is allowed because the gas ends at a larger volume and nothing is cycled.',
    }),
    sl('example', 'Worked example 5: isothermal expansion', {
      b: r`${n2(ex5.n)} mol of an ideal gas at $${ex5.T}$ K and $${ex5.P1}$ kPa expands isothermally to ${ex5.ratio} times its volume. Find the work done by the gas and the heat absorbed ($R = 8.314$ J mol$^{-1}$ K$^{-1}$).`,
      ul: [
        r`$nRT = ${n2(ex5.n)} \times 8.314 \times ${ex5.T} \approx ${n4(ex5.nRT)}$ J, so $V_1 = \dfrac{nRT}{P_1} \approx ${n3(ex5.V1)}$ L and $V_2 = ${ex5.ratio}V_1 \approx ${n3(ex5.V2)}$ L.`,
        r`$W = nRT\ln\dfrac{V_2}{V_1} = ${n4(ex5.nRT)} \times \ln ${ex5.ratio} \approx ${n4(ex5.W)}$ J.`,
        r`$\Delta U = 0$, so $Q = W \approx ${n4(ex5.W)}$ J absorbed from the surroundings.`,
        r`Final pressure $P_2 = P_1/${ex5.ratio} \approx ${n3(ex5.P2)}$ kPa.`,
      ],
      v: plotIso,
      n: `For half a mole at three hundred kelvin, n R T is about ${n4(ex5.nRT)} joules. The gas expands to three times its volume, and the work is that number times the natural log of three, about ${n4(ex5.W)} joules. The internal energy is unchanged, so the gas absorbs the same ${n4(ex5.W)} joules as heat from the surroundings. The final pressure is a third of the initial one.`,
    }),
    sl('check', 'Quick check: isothermal work', {
      b: 'Compute the work done.',
      v: plotIso,
      chk: 'isoth-num',
      n: 'Use n R T times the natural logarithm of the volume ratio.',
    }),
    sl('concept', 'Adiabatic process: no heat in or out', {
      b: r`Q = 0, so $\Delta U = -W$. The gas follows $PV^{\gamma} = \text{constant}$.`,
      m: [r`PV^{\gamma} = \text{const}, \qquad TV^{\gamma-1} = \text{const}`, r`W = \dfrac{P_1V_1 - P_2V_2}{\gamma - 1} = nC_v(T_1 - T_2)`],
      ul: [
        'Rapid processes and well-insulated ones are nearly adiabatic: a pump compressing air, sound waves, the sudden release of a gas.',
        'Compression raises the temperature (work done on the gas goes into internal energy); expansion cools the gas.',
        'On a P–V diagram the adiabat is **steeper** than the isotherm through the same point, by the factor γ.',
        'So from the same state to the same final volume, an adiabatic expansion does **less work** than an isothermal one.',
      ],
      v: V.isoad,
      n: 'In an adiabatic process no heat is exchanged, so the work done on the gas goes entirely into its internal energy. The gas obeys pressure times volume to the power gamma equals a constant. Compression heats it and expansion cools it. On the diagram the adiabat is steeper than the isotherm through the same point, so an adiabatic expansion between the same volumes does less work.',
    }),
    sl('example', 'Worked example 6: compressing a gas adiabatically', {
      b: r`${n2(ex6.n)} mol of a monatomic ideal gas ($\gamma = \tfrac{5}{3}$, $C_v = \tfrac{3}{2}R$) at $${ex6.T1}$ K and $${ex6.P1}$ kPa is compressed adiabatically to half its volume. Find the final temperature, the final pressure and the work done by the gas.`,
      ul: [
        r`$V_1 = \dfrac{nRT_1}{P_1} \approx ${n3(ex6.V1)}$ L, $V_2 \approx ${n3(ex6.V2)}$ L.`,
        r`$T_2 = T_1\left(\dfrac{V_1}{V_2}\right)^{\gamma - 1} = ${ex6.T1} \times 2^{2/3} \approx ${n4(ex6.T2)}$ K.`,
        r`$P_2 = P_1 \left(\dfrac{V_1}{V_2}\right)^{\gamma} = ${ex6.P1} \times 2^{5/3} \approx ${n4(ex6.P2)}$ kPa: **more than double** the starting pressure, because the gas also warms up.`,
        r`$W = nC_v(T_1 - T_2) = ${n2(ex6.n)} \times 12.47 \times (${ex6.T1} - ${n4(ex6.T2)}) \approx ${n4(ex6.W)}$ J. Negative: ${n4(-ex6.W)} J of work is done **on** the gas, and $\Delta U = +${n4(ex6.dU)}$ J.`,
      ],
      v: plotAdi,
      n: `Compress one mole of monatomic gas to half its volume with no heat flow. The temperature rises as the volume ratio to the power two thirds, to about ${n4(ex6.T2)} kelvin. The pressure rises by the volume ratio to the power five thirds, about three point one eight times the starting pressure. The work done by the gas is about minus ${n4(-ex6.W)} joules, so that much work was done on it, and its internal energy rises by the same amount.`,
    }),
    sl('check', 'Quick check: matching processes', {
      b: 'Match each process with what the first law says about it.',
      v: T_PROC,
      chk: 'proc-match',
      n: 'For each process, ask which of the three quantities in the first law is zero.',
    }),
    sl('concept', 'Cyclic processes', {
      b: 'In a **cyclic process** the system returns to its initial state after a sequence of steps.',
      ul: [
        'State variables return to their start values, so **ΔU = 0** over a full cycle and **Q = W** (net).',
        'The net work is the **area enclosed** by the loop on the P–V diagram.',
        'A **clockwise** loop gives positive net work (a heat engine); an **anticlockwise** loop gives negative net work (a refrigerator).',
        'Heat is absorbed on some steps and rejected on others; net heat Q = Qin − Qout.',
      ],
      v: V.cycle,
      n: 'In a cyclic process the system comes back to its starting state. The internal energy therefore returns to its starting value, so the net heat equals the net work. On a pressure volume diagram the net work is the enclosed area. Run the loop clockwise and the net work is positive, as in an engine. Run it anticlockwise and the net work is negative, as in a refrigerator.',
    }),
    sl('example', 'Worked example 7: a rectangular cycle as an engine', {
      b: r`A monatomic ideal gas ($C_v = \tfrac{3}{2}R$) is taken round the cycle A→B→C→D→A of the figure. Find the net work, the heat absorbed, the heat rejected and the efficiency of this engine.`,
      ul: [
        r`Net work $=$ area $= (300 - 100) \times (6 - 2) = ${ex7.W}$ J.`,
        r`AB (isochoric, heating): $Q = \tfrac{3}{2}\Delta(PV) = \tfrac{3}{2}(${cB[0] * cB[1]} - ${cA[0] * cA[1]}) = ${ex7.QAB}$ J. BC (isobaric, expansion): $Q = \tfrac{5}{2}P\Delta V = \tfrac{5}{2} \times ${cB[1]} \times ${cC[0] - cB[0]} = ${ex7.QBC}$ J.`,
        r`Heat absorbed $Q_1 = ${ex7.QAB} + ${ex7.QBC} = ${ex7.Qin}$ J.`,
        r`CD: $Q = ${ex7.QCD}$ J; DA: $Q = ${ex7.QDA}$ J, so heat rejected $Q_2 = ${ex7.Qout}$ J. Check: $Q_1 - Q_2 = ${ex7.Qin - ex7.Qout} = W$.`,
        r`Efficiency $\eta = \dfrac{W}{Q_1} = \dfrac{${ex7.W}}{${ex7.Qin}} \approx ${n3(ex7.eta * 100)}\%$.`,
      ],
      v: plotCycle,
      n: `The net work is the area of the rectangle, ${ex7.W} joules. Heat is absorbed on the heating step at constant volume, ${ex7.QAB} joules, and on the expansion at constant pressure, ${ex7.QBC} joules, a total of ${ex7.Qin} joules. The other two steps reject ${ex7.Qout} joules. The difference is the work, as it must be, and the efficiency is work over heat absorbed, about ${n3(ex7.eta * 100)} percent.`,
    }),
    sl('concept', 'The second law: two statements', {
      b: 'The first law only counts energy. It allows a stone to cool the ground and jump up; nature never does this. The **second law** gives the direction.',
      ul: [
        '**Kelvin–Planck:** no cyclic device can take heat from a single reservoir and convert **all** of it into work with no other effect.',
        '**Clausius:** no cyclic device can have, as its only result, the transfer of heat from a colder body to a hotter one.',
        'The two are equivalent: breaking one lets you break the other.',
        'Result: every engine rejects some heat, and every refrigerator needs work.',
      ],
      v: T_STMT,
      n: 'The first law says energy is conserved but does not forbid a stone from cooling the ground and leaping into the air. The second law rules such things out. The Kelvin Planck statement says no cyclic device can turn all the heat from one reservoir into work. The Clausius statement says heat cannot flow from cold to hot as the only result. The two statements are equivalent.',
    }),
    sl('concept', 'Reversible and irreversible processes', {
      b: 'A process is **reversible** if it can be retraced exactly, leaving no change in the system or its surroundings.',
      ul: [
        'It must be quasi-static and free of friction, turbulence and heat flow across a finite temperature difference.',
        'Almost every natural process is **irreversible**: free expansion, friction, heat flow across a gap, mixing, dissolving.',
        'Reversible processes are ideal limits that real processes only approach.',
        'The second law says irreversible processes are one-way: a cup of coffee cools, but never heats itself from the room.',
      ],
      v: T_REV,
      n: 'A reversible process can be retraced exactly. That needs it to be quasi static and free of friction and of heat flow across a finite temperature difference. Real processes such as free expansion, friction, mixing and heat flowing from hot to cold are irreversible. Reversible processes are ideal limits that we approach but never quite reach.',
    }),
    sl('concept', 'Heat engines and refrigerators', {
      b: 'An **engine** takes heat Q₁ from a hot reservoir, converts part to work W and rejects Q₂ to a cold reservoir. A **refrigerator** runs the other way.',
      m: [r`\eta = \dfrac{W}{Q_1} = 1 - \dfrac{Q_2}{Q_1}`, r`\text{COP} = \dfrac{Q_2}{W} = \dfrac{Q_2}{Q_1 - Q_2}`],
      ul: [
        'Cyclic operation: ΔU = 0, so W = Q₁ − Q₂ for both devices.',
        'Efficiency η is always below 1 (Kelvin–Planck); the coefficient of performance COP can be above 1.',
        'A refrigerator hands the kitchen more heat (Q₁) than it removes from the food (Q₂): Q₁ = Q₂ + W.',
      ],
      v: V.engfridge,
      n: 'A heat engine takes heat from a hot reservoir, turns part of it into work and rejects the rest to a cold reservoir. Its efficiency is the work divided by the heat absorbed, which is one minus the ratio of heat rejected to heat absorbed. A refrigerator takes heat from a cold space using work and gives a larger amount of heat to the surroundings. Its coefficient of performance is the heat removed divided by the work supplied.',
    }),
    sl('example', 'Worked example 8: an engine and a refrigerator', {
      b: r`(a) An engine absorbs $${ex8.Q1}$ kJ and rejects $${ex8.Q2}$ kJ per cycle. (b) A refrigerator removes $${ex8.fQ2}$ MJ per hour from its cold space while the compressor supplies $${ex8.fW}$ MJ. Find the efficiency, the COP, the heat released to the room and the compressor's average power.`,
      ul: [
        r`(a) $W = Q_1 - Q_2 = ${ex8.Q1} - ${ex8.Q2} = ${R6(ex8.W)}$ kJ; $\eta = \dfrac{W}{Q_1} = \dfrac{${R6(ex8.W)}}{${ex8.Q1}} = ${R6(ex8.eta)} = ${R6(ex8.eta * 100)}\%$.`,
        r`(b) $\text{COP} = \dfrac{Q_2}{W} = \dfrac{${ex8.fQ2}}{${ex8.fW}} = ${ex8.cop}$.`,
        r`Heat released to the room $Q_1 = Q_2 + W = ${ex8.fQ2} + ${ex8.fW} = ${R6(ex8.fQ1)}$ MJ per hour.`,
        r`Average power $= \dfrac{${ex8.fW} \times 10^6}{3600} = ${ex8.power}$ W.`,
      ],
      v: plotEff,
      n: `The engine does ${R6(ex8.W)} kilojoules of work out of ${ex8.Q1} kilojoules absorbed, so its efficiency is ${R6(ex8.eta * 100)} percent. The refrigerator removes one point eight megajoules for every zero point four five of work, a coefficient of performance of ${ex8.cop}. It releases two point two five megajoules to the room each hour. Zero point four five megajoules in an hour is a compressor power of ${ex8.power} watts.`,
    }),
    sl('check', 'Quick check: engine efficiency', {
      b: 'Compute the efficiency.',
      v: plotEff,
      chk: 'eff-num',
      n: 'Work is heat absorbed minus heat rejected; then divide by the heat absorbed.',
    }),
    sl('two-column', 'Engine and refrigerator side by side', {
      b: 'Same cycle idea, opposite direction.',
      cols: [
        '**Heat engine**\n- Clockwise loop on P–V\n- Q₁ in, W out, Q₂ out\n- η = W/Q₁ < 1',
        '**Refrigerator**\n- Anticlockwise loop on P–V\n- Q₂ in, W in, Q₁ out\n- COP = Q₂/W, can exceed 1',
      ],
      v: T_ER,
      n: 'An engine runs its loop clockwise and a refrigerator anticlockwise. In the engine, heat goes in at the hot side, work comes out and some heat is rejected. In the refrigerator, work goes in, heat is taken from the cold space and a larger amount is given to the surroundings. The efficiency of an engine is always below one, but the coefficient of performance of a refrigerator can be larger than one.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: T_PROC,
      n: 'To sum up. In an isochoric process no work is done. In an isobaric process the work is pressure times the change in volume. In an isothermal process of an ideal gas the internal energy is constant and heat equals work. In an adiabatic process there is no heat and pressure times volume to the power gamma is constant. In a cycle the net work is the enclosed area and the internal energy returns to its start. The second law limits engines and refrigerators.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Name the process and write which of Q, W, ΔU is zero before calculating.',
        'Use PV^γ = const or TV^(γ−1) = const for adiabats and PV = const for isotherms; never mix them.',
        'For efficiency and COP, write W = Q₁ − Q₂ first, then substitute; keep Q₁ and Q₂ as magnitudes.',
        'In an answer on the second law quote both statements, and give an example of an irreversible process.',
      ],
      v: plotEff,
      n: 'Name the process first, and write down which of heat, work and internal energy change is zero. Use pressure times volume to the power gamma for adiabats and pressure times volume for isotherms. For engines and refrigerators begin with work equals heat in minus heat out, using magnitudes. In theory answers, quote both statements of the second law and give an irreversible example.',
    }),
  ],
});
